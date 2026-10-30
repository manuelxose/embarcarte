# Observability

M04 adds lightweight, dependency-free visibility suitable for the current single-container
deployment. It does **not** add external metrics, tracing or paging.

## 1. What the application emits

### Request log

Every non-asset request and every failed request produces one JSON line on stdout:

```json
{"level":"info","event":"http_request","request_id":"…","method":"GET","path":"/en/shop","status":200,"duration_ms":18.4}
```

- `request_id` is a random UUID, also returned as `X-Request-Id`.
- No query string, cookies, body, user id, email, order content or authorization header is
  logged.
- Hashed JS/CSS/images/fonts are skipped when successful to keep the log useful.
- Reverse proxies collect stdout through the Docker logging driver.

### Structured errors

- API exceptions: `{"level":"error","event":"api_error","message":"…"}` with a generic
  `{error:"server_error"}` response.
- SSR/Express exceptions: `{"level":"error","event":"request_error","method":"…","path":"…","message":"…"}`.
- Mail failures: recipient is masked (`b***@example.test`); message body is never logged.
- Stripe webhook failures return 400; no payload is logged.

### Health and readiness

| Endpoint | Semantics | Response |
| --- | --- | --- |
| `GET /healthz` | Process liveness only; does not touch SQLite | `200 {"ok":true,"uptime_s":…}` |
| `GET /readyz` | Runs `SELECT 1` against SQLite | `200 {"ok":true,"checks":{"database":"ok"}}` or `503` |

The Docker `HEALTHCHECK` uses `/healthz`. A load balancer or uptime monitor should use
`/readyz` so a database failure removes the instance from rotation.

### Startup

The server runs `ensureAdmin()` and `purgeExpiredSessions()` before listening. A failure
throws and the process exits non-zero; Docker `restart: unless-stopped` restarts it. Session
purge repeats every 6 hours (unref'd).

## 2. What is not implemented

- No Prometheus/MetRICS endpoint, no OpenTelemetry tracing, no APM.
- No external alert delivery (email, PagerDuty, Slack, UptimeRobot, etc.).
- No log aggregation or retention policy beyond the Docker logging driver.
- No browser RUM/Core Web Vitals field collection.
- No synthetic checkout monitor (deliberately: no live payment operations).

These are explicit gaps, not claims of production monitoring.

## 3. Actionable alert conditions

Configure these in the hosting/monitoring layer (not in this repository):

| Condition | Suggested threshold | First check |
| --- | --- | --- |
| Readiness failing | `/readyz` non-200 for 2 consecutive probes | Database path, disk, permissions, volume mount |
| Service down | `/healthz` non-200 for 2 probes | Container status, startup log, port 4000 |
| Elevated 5xx | >1% of requests or >5 in 5 minutes | `request_error`/`api_error` lines, recent deploy |
| Checkout failures | any 5xx on `POST /api/orders` or a rise in `paymentError` | Stripe keys/status, API logs, stock state |
| Webhook failures | any sustained 400 on `/api/stripe/webhook` | `STRIPE_WEBHOOK_SECRET`, clock skew, Stripe dashboard |
| Mail failure | repeated `[mail] error` lines | SMTP host/credentials, provider status |
| Database write failure | `SQLITE_BUSY`/`SQLITE_FULL`/`api_error` | Disk, WAL size, concurrent writers |
| Container restart loop | >2 restarts in 10 minutes | `docker compose logs --tail=200 web` |
| Backup age | >26 hours since last verified backup | Backup job, off-host copy |
| Disk usage | >80% on the data volume | `df -h`, upload growth, WAL |

## 4. Operator triage

```bash
cd /opt/embarcarte
docker compose ps
docker compose logs --tail=200 web
docker compose exec -T web wget -qO- http://127.0.0.1:4000/healthz
docker compose exec -T web wget -qO- http://127.0.0.1:4000/readyz
curl -sS -o /dev/null -w '%{http_code}\n' https://embarcarte.com/en/shop
```

Use the `X-Request-Id` from a user report to find the matching log line. Do not paste logs
containing customer data into public issues; the application avoids logging it, but proxy or
platform logs may differ.

## 5. Production status

Logging and probes are **implemented and exercised locally**. External alerting, log
retention, dashboards and on-call routing are **not configured**. A production GO cannot
claim that an operator would be paged for an outage.
