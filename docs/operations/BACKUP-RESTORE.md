# Backup and restore

Scope: the SQLite database and product uploads used by Embarcarte. No production command in
this document has been executed against production during M04.

## 1. What is persistent

| Data | Path in the container | Path default outside Docker | Persistence |
| --- | --- | --- | --- |
| SQLite database | `/app/data/embarcarte.sqlite` (+ `-wal`, `-shm`) | `$DATA_DIR/embarcarte.sqlite` | Docker volume `app_data` mounted at `/app/data` |
| Uploaded images | `/app/data/uploads` | `$DATA_DIR/uploads` | Same volume |
| Deployment config | `/opt/embarcarte/{docker-compose.yml,Caddyfile,nginx}` | host | Copied by the deploy workflow; previous copies get a `.bak-<stamp>` suffix |
| Application image | GHCR `ghcr.io/manuelxose/embarcarte:<git-sha>` | — | Registry |
| Secrets | `/opt/embarcarte/.env` | host | **Not** in Git and **not** in the database backup; must be backed up separately by the operator |

The SQLite schema is created/upgraded additively at startup (`CREATE TABLE IF NOT EXISTS`,
`ALTER TABLE ADD COLUMN` for the four English product fields). There is no destructive
migration step in the current code.

## 2. Backup procedure

The backup tooling is included in the runtime image (`scripts/backup.mjs`). It:

1. opens the source database read-only;
2. runs `PRAGMA integrity_check`;
3. takes a consistent snapshot with `VACUUM INTO` (safe with WAL);
4. copies `uploads/`;
5. writes `manifest.json` with the database SHA-256, byte size, table counts and the
   SHA-256 of every uploaded file.

It refuses to write into an existing directory and never modifies the source.

### Host with Docker Compose (recommended)

```bash
cd /opt/embarcarte
stamp=$(date -u +%Y%m%dT%H%M%SZ)
mkdir -p backups
# Snapshot inside the container, copy to the host, then remove the container copy.
docker compose exec -T web node scripts/backup.mjs \
  --data-dir /app/data --out "/tmp/backup-$stamp"
docker compose cp "web:/tmp/backup-$stamp" "./backups/backup-$stamp"
docker compose exec -T web rm -rf "/tmp/backup-$stamp"
sha256sum "./backups/backup-$stamp/manifest.json"
```

Run this **before** every release and on the chosen schedule. A daily schedule is the
minimum RPO assumption below; no cron/systemd timer is configured by this repository.

### Local / staging

```bash
DATA_DIR=/srv/embarcarte/data
node scripts/backup.mjs --data-dir "$DATA_DIR" --out "/srv/embarcarte/backups/$(date -u +%Y%m%dT%H%M%SZ)"
```

## 3. Restore procedure (isolated first)

Never restore directly over a live database. Restore into an empty directory, verify it,
then plan a maintenance window.

```bash
# 1. Copy the backup into a scratch location.
# 2. Restore into a new, empty target. The script refuses an existing target.
node scripts/restore.mjs \
  --backup /srv/embarcarte/backups/backup-20261030T120000Z \
  --target /srv/embarcarte/restore-check

# 3. The script verifies:
#    - every file checksum in manifest.json
#    - PRAGMA integrity_check
#    - PRAGMA foreign_key_check (must be empty)
#    - row counts per table match the manifest
# 4. It writes restore-verification.json with verified=true.
```

To restore into the running container, stop the application, move the current `data`
directory aside (do not delete it), copy the verified database/uploads into place, start the
application, then run the smoke checks. This is a production change and needs an explicit
GO.

## 4. What has actually been verified

`npm run test:backup` starts a real server with a temporary database, registers a customer,
creates a product and an order, uploads a valid PNG, stops the server, takes a backup,
restores it into a new directory and verifies:

- `PRAGMA integrity_check = ok`;
- zero foreign-key violations;
- row counts equal the manifest;
- the order total and line item survive;
- the uploaded image is present;
- a copy with one database byte flipped is rejected by the checksum before a target is
  created.

Result on 2026-10-30: **PASS**.

This proves the tooling and the SQLite/volume model in isolation. It does **not** prove that
the production volume is backed up, that the production host has enough disk, or that a
restore can be completed inside the production maintenance window.

## 5. RPO / RTO assumptions

| Metric | Assumption | Status |
| --- | --- | --- |
| RPO | 24 hours if the operator runs one backup per day; 0 since last manual backup otherwise | **Not enforced**; no timer configured |
| Backup gate | `npm run test:backup` uses a temporary DB, a dynamic port and verifies every restored upload by size and SHA-256 | **PASS** in isolation |
| RTO (application) | 30–60 minutes: rebuild/pull the pinned image, restore the volume, smoke test | **Estimated**, not exercised on production |
| RTO (full host) | Several hours: provision host, DNS/TLS, secrets, volume restore | **Unverified**; depends on the provider |
| Backup retention | Operator decision; keep at least 7 daily and 4 weekly | **Not configured** |
| Off-host copy | Required; a backup on the same volume is not a disaster recovery copy | **Not configured** |

Production recovery must be marked **PENDING** until a real restore is performed on an
isolated copy of the production data and the timings are recorded.

## 6. Verification checklist before a production GO

- [ ] A backup exists outside the production host.
- [ ] Its manifest checksum verifies.
- [ ] It restores into an isolated environment with `verified: true`.
- [ ] The restored app starts, `/readyz` is 200 and a sample product/order is readable.
- [ ] The restore duration fits the agreed maintenance window.
- [ ] The backup includes uploads and the operator has a separate copy of `.env`.
