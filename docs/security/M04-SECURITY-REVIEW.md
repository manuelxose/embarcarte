# M04 — Production security review

Scope: authentication, authorization, web security, payments, sensitive data and the
deployment boundary after M03 (`6e13d75`). Date: 2026-10-30. No production system was
contacted; all dynamic evidence comes from the built server and temporary SQLite databases.

## 1. Result

**No known Critical or High findings remain open in the M04 scope.** Two Medium residual
risks are documented, plus Low accepted trade-offs. This is not a claim that the application
has been penetration-tested or that production infrastructure is secure.

## 2. Findings

| # | Severity | Finding | Evidence | Remediation | Verification |
| --- | --- | --- | --- | --- | --- |
| S1 | High (fixed) | Password change left other sessions alive | Two cookies from the same user both returned `/api/auth/me` after the change | `revokeOtherSessions()` deletes all rows except the current token hash | `test:commerce`: current cookie 200, second cookie `null`, old password 401, new password 200 |
| S2 | High (fixed) | Upload trusted `Content-Type`; arbitrary content could be stored/served as an image | `POST /api/admin/uploads` with `image/png` and non-PNG bytes returned 201 before the fix | JPEG/PNG/WebP signature check before `writeFileSync` | Fake PNG 400; real PNG 201 and GET 200 |
| S3 | High (fixed) | Abandoned Stripe Checkout reserved stock forever | Only `checkout.session.completed` was handled | `checkout.session.expired` cancels the matching pending order and restores stock in a transaction | Signed expired event → order `cancelado`, stock restored |
| S4 | High (fixed) | No application security headers | Response headers had no CSP/HSTS/nosniff/frame/referrer policy | Global middleware in `src/server.ts`; HSTS only with `NODE_ENV=production` | `test:i18n` asserts headers on public/private/health responses |
| S5 | Medium (open) | CSP allows inline scripts (`script-src 'self' 'unsafe-inline'`) | Angular SSR emits inline event-replay/bootstrap scripts and the async critical-CSS `onload` handler | Documented compatibility exception; all other directives are restrictive | Manual header review; no claim of strict CSP |
| S6 | Medium (open) | Rate limiting is per-process memory | `Map` in `src/server/api.ts` | Pruned every 10 minutes; sufficient for one container | Code review; no multi-replica claim |
| S7 | Low (accepted) | Registration reveals whether an email exists (`409 email_taken`) | `/api/auth/register` | Rate-limited; explicit UX trade-off. Login timing no longer reveals existence | Dummy scrypt hash makes the unknown-email path do the same work |
| S8 | Low (accepted) | CSRF relies on `Origin` (when present) plus `SameSite=Lax` | API middleware | No token store; cross-site form posts are blocked by SameSite; JSON APIs are not simple requests | Code review; no token claim |
| S9 | Low (open) | A Stripe session-creation failure leaves a pending order with reserved stock | `createCheckoutSession` catch returns `paymentError` | Admin cancellation restores stock; no automatic reconciliation job | Documented in operations; not tested against a live Stripe outage |
| S10 | Low (fixed) | Mail fallback logged full customer/order bodies without SMTP | `sendMail` console output | Masked recipient + subject only | Code review; test output no longer contains order text |

## 3. Authentication and session review

- Passwords: `scrypt` with a random 16-byte salt and 64-byte hash, constant-time compare.
- Login: always performs scrypt (dummy hash when the email is unknown); generic
  `invalid_credentials` response.
- Sessions: 32 random bytes, stored as SHA-256 hash, 30-day expiry, `HttpOnly`,
  `SameSite=Lax`, `Secure` when `NODE_ENV=production`, path `/`.
- Logout deletes the server row and clears the cookie.
- Password change revokes all other sessions.
- Brute force: 10 attempts / 10 minutes per IP for login and registration, 10 / 10 minutes
  for password change, 20 / 10 minutes for orders, 5 / 10 minutes for contact.
- Account enumeration: registration still distinguishes an existing address; accepted as a
  UX decision and rate-limited.
- `ensureAdmin` resets the configured admin password at startup. This is intentional but
  means the environment variable is operationally sensitive; it is documented in the
  release runbook.

## 4. Authorization review

The server, not the Angular guard, is the boundary:

- `/api/admin/**` uses `requireAdmin`; a customer receives 403, an anonymous caller 401.
- `/api/orders` and `/api/orders/:id` use `requireUser`; the detail query compares
  `user_id` or admin role and returns 404 for a foreign order (not 403, so ids are not
  confirmed).
- Frontend guards only redirect; they do not protect data.
- Admin mutations (status, stock, products, messages, uploads) all require admin.
- Private pages are not rendered with session data: the CSR shell is static and the API is
  called by the browser.

Verified with the commerce suite: unauthenticated 401, foreign order 404, customer admin
403, admin 200.

## 5. Web security review

| Control | State |
| --- | --- |
| SQL injection | All queries are parameterised; table names in backup scripts are fixed literals |
| XSS | Angular escapes interpolation; no `innerHTML`/`bypassSecurityTrust` in the reviewed app |
| CSRF | `Origin` vs `Host` check on state-changing requests; cookies `SameSite=Lax`; no cross-origin CORS |
| CORS | No `Access-Control-Allow-Origin` is emitted; the API is same-origin |
| Clickjacking | `X-Frame-Options: DENY` + `frame-ancestors 'none'` |
| MIME sniffing | `X-Content-Type-Options: nosniff` |
| Referrer | `strict-origin-when-cross-origin` |
| HSTS | App sends it in production; Caddy/nginx also send it |
| CSP | Enforced with `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action` limited to self + Stripe; inline scripts remain allowed (S5) |
| Input validation | Length caps, email regex, slug regex, integer price/stock, order quantity 1–99, terms and payment enums, image signature |
| Uploads | Random filename, extension derived from MIME allowlist, magic bytes, 8 MB cap |
| Rate limits | In-process map, pruned; see S6 |
| Error handling | API returns generic `server_error`, no stack or SQL; SSR error handler returns plain 500 |
| Logging | JSON method/path/status/duration and request id; no cookies, bodies, passwords or tokens |

## 6. Payment review

- Stripe is disabled unless both `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` exist.
- Checkout is created server-side from authoritative line items; the browser only sends
  `slug`, `qty` and an expected `price_cents`.
- A changed/tampered price is rejected with `409 price_changed`.
- Duplicate product lines are rejected; stock is checked and decremented inside
  `BEGIN IMMEDIATE`.
- Webhook signature: HMAC-SHA256 v1, 5-minute tolerance, constant-time compare.
- Payment confirmation only applies when `id`, `stripe_session_id` and `status='pendiente'`
  match; duplicate events are idempotent.
- Expired sessions cancel the order and restore stock.
- Bank-transfer orders remain `pendiente`, reserve stock, and admin cancellation restores it.
- No automated test contacts Stripe; the checkout URL test path is disabled.

Residual: if Stripe session creation fails after the order row exists, the order remains
pending with stock reserved (S9). This needs either an automatic cleanup job or an explicit
manual reconciliation step.

## 7. Sensitive data and repository hygiene

- `git ls-files` contains `deploy/.env.example` only; no `.env`, database, key or token.
- SQLite lives in `DATA_DIR` (`/app/data` in Docker); `/data` is gitignored and excluded from
  the Docker context.
- `orderWithItems` removes `stripe_session_id` before returning an order.
- `/api/auth/me`, `/api/orders`, `/api/account` and `/api/admin` are `no-store`.
- The CSR shell contains no session, user or order data.
- Mail failures no longer print message bodies.
- `X-Request-Id` is random per request and does not encode user data.

## 8. Open risks and required production evidence

| Risk | Status |
| --- | --- |
| Strict CSP without inline exceptions | **Open Medium**, requires nonce/hash build work |
| Distributed rate limiting | **Not applicable to one container**; required before scaling |
| Stripe outage reconciliation | **Open Low**, manual procedure |
| External alerting / paging | **Not configured**; logs and probes only |
| Branch protection / production approval | **Not configured** on GitHub (verified 404 / no protection rules) |
| Production backup and restore | **Not verified** against production; only isolated restore tested |
| Penetration test / DAST | **Not performed** |

A production GO must not be inferred from this document. The release decision and missing
evidence are in
[M04-PRODUCTION-READINESS-DELIVERY.md](../roadmap/M04-PRODUCTION-READINESS-DELIVERY.md).
