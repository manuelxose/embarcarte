# M04 — Production readiness delivery

Milestone: **Prompt 4 of 4**. Branch `feature/m04-production-hardening`, based on M03 head
`6e13d75` because PR #3 was still open and the M03 branch was the latest validated state.
Status: **Engineering PASS / Production release NO-GO** — see §14.

## 1. Executive summary

M04 did not redesign Embarcarte. It closed the highest-impact correctness, security and
release risks that M03 left open, and replaced unverified claims with executable gates.

The material outcomes:

- **Private English pages now declare the right language in their first response.** The
  server serves a localized CSR shell for `/en/cart`, `/en/login`, `/en/account` and
  `/en/account/orders/:id`, with `noindex` at HTTP level, no session data and no cache.
- **The product page hydration defect is fixed.** M03's product detail looked correct but
  replaced its SSR subtree on hydration: mobile CLS **1.318 → 0.00072** and LCP
  **3,620 ms → 408 ms** in the same lab profile.
- **Security hardening:** application security headers/CSP/HSTS, session revocation on
  password change, upload magic-byte validation, checkout-expiry stock recovery, timing-safe
  unknown-email login, bounded rate-limit memory, structured logs without PII, and masked
  mail fallback.
- **Release gates exist:** a PR CI workflow now runs formatting, build, i18n, commerce, SEO,
  backup/restore and 14 Playwright browser tests; the deploy workflow runs the same gates
  before building an immutable image and no longer triggers on pull requests.
- **Operations are documented and partly proven:** an isolated backup/restore was executed
  and verified; the release image built and ran; the production backup, approval and
  alerting controls remain unverified and are declared blockers.

No production deploy, merge or secret change was performed.

## 2. Architecture

The M01–M03 architecture is intact: standalone Angular 21, SSR/prerender, URL-derived
locale, typed dictionaries, Express + SQLite, server-authoritative commerce.

M04 changes:

| Area | Change |
| --- | --- |
| Product detail | SSR product is serialized through `TransferState` and read synchronously on the client; hydration no longer removes/recreates the product subtree |
| Private routes | `src/server.ts` serves a localized `index.csr.html` variant before Angular; `lang`, title/description (English), `X-Robots-Tag` and `no-store` |
| Security headers | One middleware sets CSP, nosniff, frame denial, referrer, permissions and production HSTS |
| Operations | `/readyz`; structured request/API/SSR logs; request ids; asset log noise filtered |
| Payments | Expired Checkout sessions cancel the pending order and restore stock transactionally |
| CI | New `ci.yml`; `deploy.yml` gated and PR-trigger removed |
| Testability | Playwright + axe dev dependencies, isolated server fixture, temporary SQLite |

`tsc --noEmit --noUnusedLocals --noUnusedParameters` is clean. No unused imports, dead
files, circular imports or new runtime dependencies were introduced. `docs/quality` records
the full findings table.

## 3. Internationalization

Measured after M04:

| Metric | Value |
| --- | --- |
| Dictionary keys | 223 in `es`, 223 in `en`, 1:1 compile-enforced |
| Prerendered routes | 96 |
| Locale leakage in the tested 96-route crawl | 0 |
| Private route initial `lang` | correct for `/en/...` (new) |
| Product-copy fallback | per field, `lang="es"` only on product-derived nodes |
| Language switch | preserves path identity, query and fragment; cart, session and order id survive |
| Admin | Spanish-only, documented decision |

The new browser suite switches ES→EN→ES on home, technology detail, guide detail, shop,
product detail, cart with items, account and order detail, asserting URL, language, product/
order identity, totals and session.

## 4. Security

Full detail: [M04-SECURITY-REVIEW.md](../security/M04-SECURITY-REVIEW.md).

**No known Critical or High findings remain open in scope.** Fixed High/Medium items:
session revocation, upload spoofing, checkout stock leak, missing security headers,
customer-data logging, rate-limit memory growth, login timing, malformed webhook handling,
missing readiness/logging, contrast failures.

Residual risks: CSP still permits inline scripts for Angular's event-replay/bootstrap and
the critical-CSS `onload` handler; rate limiting is per process; a Stripe outage after order
creation still needs manual reconciliation; registration reveals an existing email; external
alerting and branch protection are absent.

Authorization was re-verified at API level: anonymous 401, foreign order 404, customer admin
403, admin 200. Payment tests never contact Stripe.

## 5. Commerce

- Products, prices and stock remain server-authoritative.
- Price tampering is rejected (`409 price_changed`); duplicate lines rejected.
- Stock decrement and order creation are one `BEGIN IMMEDIATE` transaction.
- Bank transfer stays `pendiente`, reserves stock, cancellation restores it.
- Stripe Checkout uses the localized success/cancel URL and `locale`.
- Webhook signature is HMAC-SHA256 with 5-minute tolerance; malformed signed JSON is 400;
  idempotent transitions; expired sessions cancel and restore stock.
- Cart state survives language switches; order line names are frozen at purchase time.
- Browser E2E covers add, quantity, remove, totals, checkout, confirmation, account history,
  order detail and ownership denial.

## 6. SEO

Full detail: [M04-INTERNATIONAL-SEO-AUDIT.md](../seo/M04-INTERNATIONAL-SEO-AUDIT.md).

`npm run test:seo` fetched every sitemap URL and verified:

- 101 URLs in the fixture: 98 static + 2 Spanish products + 1 translated English product.
- One self-referencing canonical per page; no cross-language canonical.
- Reciprocal `es`/`en` hreflang; every target is a sitemap `<loc>` and 200.
- `x-default` only on the two home entries, pointing at `/`.
- Sitemap XML structure, namespace, absolute URLs, deterministic order, product lastmod,
  no private/redirect/404/query URLs, Spanish-only product excluded from English.
- JSON-LD parses and uses only the expected types; Product offer/price/currency/availability
  match the server data.
- Private routes are `noindex` at HTTP and HTML level; unknown URLs are real 404s.

**Slug decision: keep the current language-independent slugs.** No migration in M04; see the
SEO audit §7 for the reasoning and the future conditions.

## 7. Performance

Full method and before/after:
[M04-PERFORMANCE-MEASUREMENTS.md](../quality/M04-PERFORMANCE-MEASUREMENTS.md).

Laboratory Chromium, mobile 390×844 at 4× CPU + 150 ms / 1.6 Mbps, cold cache:

| Page | LCP before | LCP after | CLS before | CLS after |
| --- | ---: | ---: | ---: | ---: |
| `/` | 1,700 ms | 1,424 ms | 0.00009 | 0.00009 |
| `/en/shop` | 400 ms | 392 ms | 0.0039 | 0.00020 |
| `/en/shop/e2e-hub` | **3,620 ms** | **408 ms** | **1.3181** | **0.00072** |

Desktop LCP is 124–224 ms in the same run. JS transfer is ~465 kB, CSS ~25 kB, fonts ~62 kB.
These are lab measurements, not field CrUX data; INP was **not** measured, only a one-click
lab proxy (16–32 ms). No performance claim is made for production users.

The fix is the `TransferState` initialization in `ShopDetail`; no visual redesign and no
functionality was removed.

## 8. Accessibility

Against WCAG 2.2 AA automated rules plus manual keyboard checks:

- Initial axe scan found serious colour-contrast failures across muted copy, cards, footer
  and primary buttons. Colour tokens and hardcoded text colours were corrected without
  changing layout or brand hue.
- Final axe scan of 7 public pages + authenticated account: **0 serious/critical**.
- Keyboard: skip link works; mobile menu opens/close with Enter/Escape and keeps focus on
  the toggle.
- Touch targets in the mobile cart/menu are ≥24×24 px.
- 360/390/768/1024/1440 px pages have no horizontal overflow.

Automated tests **cannot** establish full WCAG conformance; screen-reader and content
reviews remain manual. The login tablist lacks a full tabs pattern but passed the automated
rules; this is recorded as a low residual UX item.

## 9. CI/CD

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `CI` (`ci.yml`) | PR, push `main`, dispatch | `npm ci`, format check, build, i18n, commerce, SEO, backup, Playwright install + 14 E2E tests, `npm audit --omit=dev`, artifact on failure |
| `Build & deploy` (`deploy.yml`) | push `main`, dispatch only | repeats build + all gates incl. format/audit, builds/pushes sha-tagged image, deploys, checks container + public HTTPS `/healthz`, `/readyz`, `/en/shop`, `/sitemap.xml`; failure restores previous config/image |

- Pull requests **cannot** trigger the deploy workflow; the PR trigger was removed.
- Actions are pinned to commit SHAs (resolved 2026-10-30).
- Workflow permissions: `contents: read`; build gets `packages: write`; deploy gets
  `packages: read`.
- SSH/SCP steps require `CONTABO_HOST_FINGERPRINT`; the registry token is passed with
  `envs`, not interpolated into the remote script.
- After deploy the workflow tests the public HTTPS path through Caddy/nginx; on failure it
  restores the previous config and image and rechecks `/readyz`.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities.
- Docker build from the lockfile: **PASS**; image smoke test: `/readyz` 200, `/en/cart`
  `lang="en"` + `noindex`, sitemap 200, CSP present.
- Branch protection on `main`: **not configured** (GitHub API 404).
- `production` environment: exists, but **no protection rules/required reviewers**, so the
  deploy is CI-gated but not human-gated.

## 10. Operations

- [BACKUP-RESTORE.md](../operations/BACKUP-RESTORE.md)
- [ROLLBACK.md](../operations/ROLLBACK.md)
- [RELEASE-RUNBOOK.md](../operations/RELEASE-RUNBOOK.md)
- [OBSERVABILITY.md](../operations/OBSERVABILITY.md)

Verified in isolation: consistent `VACUUM INTO` snapshot, manifest checksums, uploads copy,
restore into a new directory, `integrity_check`, `foreign_key_check`, row counts, order data
and image, and rejection of a one-byte-corrupted backup. Result: PASS.

Not verified: production volume backup, production restore timing, off-host retention,
external alert delivery, production rollback.

## 11. Testing — actual commands and results

Executed on 2026-10-30 from the M04 working tree after the final build:

```text
npm run format:check        PASS
npm run build               PASS — Prerendered 96 static routes
npm run test:i18n           PASS — lang, private shells, alternates, locale isolation
npm run test:commerce       PASS — catalogue, SEO, stock, cart, auth, ownership, webhook,
                                     password revocation, upload signatures, expired checkout
npm run test:seo            PASS — 101 sitemap URLs, canonical, hreflang, JSON-LD, noindex
npm run test:backup         PASS — isolated restore + corrupted-copy rejection
npx playwright test         PASS — 14/14 browser tests
npm audit --omit=dev --audit-level=high   PASS — 0 vulnerabilities
docker build                PASS — local image embarcarte:m04-local
docker run smoke            PASS — readiness, private lang/noindex, CSP, sitemap
```

Playwright coverage: bilingual public surface, language switch with query/fragment, mobile
menu, cart add/increase/remove/totals, checkout and order confirmation, account/history,
order identity, foreign-order denial, session expiry, empty catalogue, network/API failure,
a product 5xx that must not become a 404, price tampering, checkout failure, responsive
widths, touch targets, skip link, and axe scans.

Artifacts (`artifacts/`) are gitignored; no customer data is stored there.

## 12. Independent review

Two independent read-only reviewers inspected the actual diff and code, not the summary.
They found no Critical issue and eight High/Medium plus one Low defect that the
implementation pass had missed; all were fixed and the gates were rerun.

| # | Severity | Finding | Resolution |
| --- | --- | --- | --- |
| R1 | High | Admin order cancellation read `status` outside the transaction; two concurrent cancels could restore stock twice | Read + stock change + update moved inside `BEGIN IMMEDIATE`; concurrent-cancel regression added |
| R2 | High | Stripe Checkout creation failure left a pending order with stock reserved and no session that could expire | Cancel + restore stock, return 502; browser keeps the basket |
| R3 | High | Deploy SSH/SCP steps did not pin the host key, and the GHCR token was interpolated into the remote script | `CONTABO_HOST_FINGERPRINT` required on every step; token passed through `envs` |
| R4 | High | Deploy overwrote Caddy/nginx but smoke-tested only inside the web container; no automatic recovery | Public HTTPS smoke step added; failure step restores config and the previous image |
| R5 | Medium | `ensureAdmin` overwrote the admin password every boot and did not revoke sessions | Password only on creation; explicit `ADMIN_PASSWORD_RESET=true` rotates and clears sessions |
| R6 | Medium | A stale product response could render under the wrong URL; any 5xx was treated as a 404 | Response slug guard; only 404 sets `notFound`, other errors show a retryable message |
| R7 | Medium | Deploy omitted `format:check` and the production dependency audit | Both gates added to the deploy build |
| R8 | Medium | Backup test used a fixed port and only checked that an `uploads` directory existed | Dynamic free port, child error/exit checks, per-file size + SHA-256 verification |
| R9 | Low | Login did not map a 400 response to a specific message | 400 now maps to the correct invalid-login/register copy |

Verified clean by the reviewers: webhook signature/raw-body ordering, idempotent completion
and expiry, upload magic bytes and admin gate, session revocation, private CSR shell and
security headers, sitemap `hreflang` gating, TransferState hydration, and the CI
permission/pinning model.

## 13. Git delivery

| Item | Value |
| --- | --- |
| Base | `feature/i18n-commerce-seo` at `6e13d75` (M03 open, stacked) |
| Branch | `feature/m04-production-hardening` |
| Commits | `085447d` (implementation), `787ed44` (route reuse + login heading), `3ca11f3` (measurements/logs), `1830211` (independent-review fixes), `aa52a3c` (delivery record), plus documentation-only follow-ups |
| Pull request | https://github.com/manuelxose/embarcarte/pull/4 |
| CI | `CI / Build, test and verify` **green** on `085447d`, `3ca11f3` and `aa52a3c`; code is unchanged by later documentation commits |
| Merge | **not performed** |
| Deploy | **not performed** |

## 14. Release decision

### Engineering milestone: **PASS**

All prior functionality is preserved, the 96 prerendered routes still build, the SSR locale
defect is corrected, no known Critical/High security finding remains open in scope, the
commerce/authorization/payment tests pass, browser E2E passes, SEO and sitemap integrity
pass, accessibility high-impact issues are fixed, performance regressions are resolved, CI
validates PRs and the deploy workflow is gated by those checks, backup/restore is documented
and tested in isolation, and the release runbook is complete.

### Production release readiness: **NO-GO**

The code is ready for a release candidate, but the production gate is blocked by missing
real-world evidence and controls:

1. `main` branch protection is **not configured** (verified 404).
2. The `production` GitHub environment has **no approval rules**; a main push deploys
   automatically after CI.
3. `CONTABO_HOST_FINGERPRINT` is now required by the workflow but its presence was not
   verified without repository secret access.
4. No production backup or restore has been verified; only an isolated restore was tested.
5. No external alerting/paging exists; an operator would not be notified of an outage.
6. No production deployment, smoke test or rollback has been executed.
7. CSP still allows inline scripts; this is a documented Medium residual risk.
8. No DAST/penetration test, no field Core Web Vitals, no Search Console crawl, no legal/
   analytics consent sign-off.

A separate, explicit **GO** is required after those controls and evidence exist. Engineering
PASS is not proof that production recovery has been tested.

## 15. Acceptance criteria checklist

| Criterion | Status |
| --- | --- |
| M01–M03 functionality preserved | ✅ 96 routes, existing suites |
| SSR locale issue corrected safely | ✅ localized private shell, no session data |
| No known Critical/High security findings | ✅ in M04 scope |
| Authentication/authorization tests | ✅ |
| Payment integration tests | ✅ no live Stripe |
| Cart/order consistency | ✅ |
| Full bilingual navigation | ✅ 14 E2E |
| Browser E2E | ✅ 14/14 |
| Public URLs valid | ✅ 96 + shop |
| SEO canonical/hreflang | ✅ |
| Sitemap integrity | ✅ 101 fixture URLs |
| No private indexing | ✅ HTTP noindex |
| Responsive UI | ✅ 360–1440 |
| High-impact accessibility | ✅ axe 0 serious/critical + keyboard |
| Performance measured, regressions resolved | ✅ lab |
| CI validates PRs | ✅ `ci.yml` |
| Deployment gated | ⚠️ CI-gated, not human-gated |
| Backup/restore documented | ✅ |
| Recovery tested in isolation | ✅ |
| Health checks verified | ✅ local + Docker |
| Release runbook | ✅ |
| Independent review | ✅ (see §12) |
| Full regression suite | ✅ |
| No production deployment | ✅ |
| M04 PR opened | ✅ PR #4 open |
