# Rollback

Three different operations are often called "rollback". They have different risk and are
not interchangeable.

## 1. Application rollback (preferred)

The image is immutable and tagged with the Git commit. A rollback means running the previous
image tag with the same database and configuration.

```bash
cd /opt/embarcarte
# Pick the previously verified commit (the value recorded before the release).
export WEB_IMAGE=ghcr.io/manuelxose/embarcarte:<previous-sha>
docker compose pull
docker compose up -d --remove-orphans
docker compose exec -T web wget -qO- http://127.0.0.1:4000/readyz
docker compose exec -T web wget -qO /dev/null http://127.0.0.1:4000/en/shop
docker compose ps
```

Characteristics:

- Database schema changes in M04 are additive (`ALTER TABLE ... ADD COLUMN` only); the
  previous application ignores columns it does not know.
- Orders and sessions written by the newer version remain readable by the older version
  because the table shapes are compatible.
- No data is deleted.
- This is the first rollback to attempt for a bad deploy.

Verification required: previous image digest exists in GHCR, `/readyz` is 200, home and shop
return 200, and a known order is still readable. **Not exercised on production in M04.**

## 2. Database rollback

Only if the application rollback cannot restore compatibility (for example a future
destructive migration). This loses every write made after the backup.

```bash
# Stop writers first. Keep the current data directory; do not delete it.
cd /opt/embarcarte
docker compose stop web
mv data data.before-rollback-$(date -u +%Y%m%dT%H%M%SZ)
# Restore into a new directory and verify with scripts/restore.mjs before swapping.
docker compose start web
```

Do **not** restore a backup made before the incident over the live directory without an
explicit GO and a verified copy of the current data. The database rollback is a last resort,
not the normal release rollback.

## 3. Full-system recovery

Rebuild the host, restore the Docker volume and `.env` from independent copies, pull the
pinned image, start the stack, restore DNS/TLS, then run the smoke tests. This depends on
provider snapshots, DNS, the reverse proxy and secrets, none of which are exercised by this
repository. Treat the RTO as an estimate until a game day is executed.

## 4. Decision table

| Symptom | Action |
| --- | --- |
| 5xx after deploy, database healthy | Application rollback |
| New version cannot read old data / schema incompatible | Stop, restore isolated backup, verify, then swap |
| Host or volume lost | Full-system recovery |
| Single bad product/order row | Fix through admin/API; do not roll back the whole database |
| Payment webhook bug | Disable card path (unset Stripe keys), keep bank transfer, roll back image, reconcile orders manually |

## 5. Post-rollback checks

- `/healthz` and `/readyz` are 200.
- `/`, `/en`, `/en/shop`, `/sitemap.xml` return 200.
- A test login works; an existing customer can see an order.
- No duplicate stock decrement or double-cancel was introduced.
- The incident, image digests, backup used and data-loss window are recorded.

## 6. Production status

Application rollback is documented but **not verified on production**. Database and
full-system recovery are **not verified on production**. The isolated backup/restore test
proves the tooling, not the production environment.
