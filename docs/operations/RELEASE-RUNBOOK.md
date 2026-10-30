# Release runbook

Status: **prepared, not executed in M04**. No production deployment was performed. A
production release requires a separate explicit GO, verified backup and the missing
governance controls listed in §7.

## 1. Release unit

- One Git commit on `main`.
- One immutable image: `ghcr.io/manuelxose/embarcarte:<40-char-git-sha>`.
- One Compose file and reverse-proxy config from the same commit.
- Database is forward-compatible: M04 adds no table and no destructive migration.

`latest` is a convenience tag only. Deploy by digest or by the commit SHA, never by a
mutable local build.

## 2. Preconditions

- [ ] M03 is merged or the M04 stacked PR is merged into the intended base with authorization.
- [ ] `CI / Build, test and verify` is green on the exact commit.
- [ ] Deploy workflow's own validation job is green (it repeats build, i18n, commerce, SEO,
      backup and E2E).
- [ ] Working tree is clean; the image was built by CI from that commit, not from a laptop.
- [ ] A verified backup exists outside the production host (see BACKUP-RESTORE.md).
- [ ] The previous image digest is recorded for rollback.
- [ ] `.env` is present on the host and was not modified by the release.
- [ ] `CONTABO_HOST_FINGERPRINT` is configured as a repository secret; the deploy fails
      closed if it is missing.
- [ ] `ADMIN_PASSWORD` is the first-boot value; a routine restart no longer overwrites the
      admin password. Use `ADMIN_PASSWORD_RESET=true` only for an intentional rotation.
- [ ] Maintenance window and customer communication (if any) are agreed.
- [ ] Production approval rules exist for the `production` environment. **Currently they do
      not** (verified: no protection rules), so this item is a blocker.

## 3. Build and artifact verification

The deploy workflow:

1. checks out the commit;
2. runs `npm ci`, `npm run build`, `test:i18n`, `test:commerce`, `test:seo`, `test:backup`,
   Playwright install and `test:e2e`;
3. builds and pushes the image tagged with `github.sha` and `latest`;
4. deploys only on `refs/heads/main`.

Record from the workflow summary:

```text
commit:        <sha>
image:         ghcr.io/manuelxose/embarcarte:<sha>
image digest:  sha256:<digest>
CI run:        <url>
```

Optionally verify locally:

```bash
docker pull ghcr.io/manuelxose/embarcarte:<sha>
docker image inspect ghcr.io/manuelxose/embarcarte:<sha> --format '{{index .RepoDigests 0}}'
```

## 4. Backup before release

```bash
cd /opt/embarcarte
stamp=$(date -u +%Y%m%dT%H%M%SZ)
docker compose exec -T web node scripts/backup.mjs --data-dir /app/data --out "/tmp/backup-$stamp"
docker compose cp "web:/tmp/backup-$stamp" "./backups/backup-$stamp"
docker compose exec -T web rm -rf "/tmp/backup-$stamp"
node scripts/restore.mjs --backup "./backups/backup-$stamp" --target "/tmp/restore-$stamp"
```

The restore verification must print `verified=true`. If it does not, stop.

## 5. Deploy

Use the workflow, not an ad-hoc SSH command:

1. Trigger `Build & deploy` on `main` (push or `workflow_dispatch`).
2. Approve the `production` environment **if** approval rules are configured.
3. Confirm the build job passed all gates before the deploy job starts.
4. The deploy job copies `docker-compose.yml`, `Caddyfile` and `nginx/`, pulls
   `WEB_IMAGE=<sha>`, restarts the stack and runs `/healthz`, `/readyz`, `/`, `/en/shop` and
   `/sitemap.xml`.

If any check fails, the workflow fails. Do not "fix forward" by editing files on the server;
roll back and diagnose.

## 6. Post-deploy smoke tests

```bash
curl -fsS https://embarcarte.com/healthz
curl -fsS https://embarcarte.com/readyz
curl -fsS -o /dev/null -w '%{http_code}\n' https://embarcarte.com/
curl -fsS -o /dev/null -w '%{http_code}\n' https://embarcarte.com/en
curl -fsS -o /dev/null -w '%{http_code}\n' https://embarcarte.com/tienda
curl -fsS -o /dev/null -w '%{http_code}\n' https://embarcarte.com/en/shop
curl -fsS https://embarcarte.com/sitemap.xml | head -n 5
curl -fsSI https://embarcarte.com/en/cart | grep -i 'x-robots-tag\|content-security-policy'
```

Then, in a browser:

- Spanish home and English home render with the right `lang`.
- Language switcher keeps the page, query and fragment.
- Shop lists products; an add-to-cart and basket quantity change work.
- Login works; account order history opens.
- Private pages are `noindex` and set no session cookie in the shell.
- No console error or 5xx in the server log.

Do **not** place a live card payment in a smoke test. Use bank transfer for checkout smoke
tests, or stop after the basket.

## 7. Rollback

See [ROLLBACK.md](./ROLLBACK.md). Application rollback is the default. Database rollback is
a last resort with data loss.

## 8. Known blockers for production GO

| Gate | Status | Evidence |
| --- | --- | --- |
| Branch protection on `main` | **BLOCKED** | GitHub API returns `Branch not protected` (404) |
| `CONTABO_HOST_FINGERPRINT` secret | **UNVERIFIED** | Required by the workflow; presence not checked without repository secret access |
| Production environment approval | **BLOCKED** | `production` environment has no protection rules |
| Production backup verified | **BLOCKED** | Only isolated backup/restore tested |
| Production restore rehearsed | **BLOCKED** | No production access used |
| External alerting | **BLOCKED** | No alert transport configured |
| Strict CSP without inline scripts | **CONDITIONAL** | `script-src` still allows inline scripts |
| Dependency and image scan | **PARTIAL** | `npm audit --omit=dev` clean; no registry image scan configured |
| Legal/analytics consent sign-off | **PENDING** | Outside engineering |

A release cannot be marked GO while any BLOCKED row remains.

## 9. Post-release record

Record: commit, image digest, CI run, backup path/checksum, deploy start/end, smoke results,
rollback digest, incidents and follow-ups. Store it with the release, not only in chat.
