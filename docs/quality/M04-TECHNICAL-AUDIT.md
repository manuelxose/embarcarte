# M04 — Final architecture and technical-debt audit

Baseline: `feature/i18n-commerce-seo` at `6e13d75` (M03 PASS, PR #3 open). Audit date:
2026-10-30. Branch: `feature/m04-production-hardening`.

## 1. Method and measured surface

The audit used the Graphify index first, then read the files the graph pointed at. The
application was built and exercised against a temporary SQLite database, not inspected
only statically.

| Metric | Value |
| --- | --- |
| Angular/TypeScript source files | 85 (`src/**/*.ts,scss`) |
| TypeScript lines | 7,243 |
| Prerendered routes | 96 |
| Build result | PASS, initial 474.07 kB raw / 132.80 kB transfer |
| `tsc --noEmit --noUnusedLocals --noUnusedParameters` | PASS, no unused symbols |
| Existing suites before M04 | `test:i18n` PASS, `test:commerce` PASS |
| Runtime stack | Angular 21 standalone, SSR, Express 5, SQLite (`node:sqlite`) |

The public routes, locale strategy, cart/order identifiers, server-authoritative pricing and
stock, authentication model, dictionary keys, slugs and design language were treated as
contracts and were not redesigned.

## 2. Findings and dispositions

Severity is production-impact based: Critical = exploitable/data loss, High = security,
financial or user-visible correctness, Medium = operational/quality risk, Low = polish.

| # | Severity | Finding | Evidence | Disposition |
| --- | --- | --- | --- | --- |
| 1 | High | Product detail hydration replaced the SSR subtree because the client signal started `null`; mobile CLS reached **1.318** and LCP **3.62 s** | Playwright layout-shift sources, `APP-SHOP-DETAIL` child replacement at 3.43 s / 3.66 s | **Fixed**: SSR product is transferred through `TransferState` and read synchronously in the component; final mobile CLS **0.00025**, LCP **0.496 s** |
| 2 | High | Private `RenderMode.Client` routes returned the Spanish `index.csr.html` shell under `/en/...`, with no `noindex` on the initial response | Direct `GET /en/cart`, `/en/login`, `/en/account`, `/en/account/orders/1` | **Fixed**: server serves a localized CSR shell with `lang`, `X-Robots-Tag: noindex, nofollow`, `Cache-Control: no-store` |
| 3 | High | No application-level CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, framing or permissions headers; only the reverse proxy set some of them | Response headers before M04 | **Fixed** in `src/server.ts`; reverse-proxy headers remain as defense in depth |
| 4 | High | Changing a password did not invalidate other sessions of the account | Two live cookies remained valid after `PUT /api/account/password` | **Fixed**: `revokeOtherSessions()` removes all sessions except the current one; asserted |
| 5 | High | Product image upload trusted the declared `Content-Type`; arbitrary bytes could be stored as `.jpg/.png/.webp` | No signature check in `POST /api/admin/uploads` | **Fixed**: JPEG/PNG/WebP magic-byte validation; fake PNG rejected, real PNG accepted and served |
| 6 | High | An abandoned Stripe Checkout kept stock reserved indefinitely; no `checkout.session.expired` handling | Only `checkout.session.completed` was processed | **Fixed**: expired events cancel the matching pending order and restore stock inside a transaction; asserted |
| 7 | Medium | Without SMTP, `sendMail` logged the full order/contact body, including customer name, email, phone and address | `[mail] SMTP no configurado ... ${text}` | **Fixed**: only a masked recipient and subject are logged |
| 8 | Medium | The rate-limit map grew for every IP that ever made a request | `Map<string, number[]>` without eviction | **Fixed**: periodic pruning every 10 minutes, unref'd timer |
| 9 | Medium | Login did no password hash work when the email did not exist, exposing a timing oracle for account existence | `if (!row || !(await verifyPassword(...)))` short-circuit | **Fixed**: a fixed dummy scrypt hash is always verified; a `409 email_taken` registration response remains as an explicit UX trade-off |
| 10 | Medium | A signed but malformed JSON webhook body produced a 500 and an unhandled parse error | `JSON.parse` without guard | **Fixed**: 400 with no body logged |
| 11 | Medium | No readiness check tied to SQLite and no structured request/error log | `/healthz` returned `{ok:true}` only | **Fixed**: `/readyz` runs `SELECT 1`; JSON request logs with request id, method, path, status and duration; structured API/SSR errors |
| 12 | Medium | Automated accessibility scan found serious colour-contrast failures on muted copy, card labels, footer text and primary buttons | Axe WCAG 2.2 AA run over 7 public pages | **Fixed**: token/contrast changes; final axe run has 0 serious/critical findings |
| 13 | Low | At 360 px the header overflowed by 8–9 px | `documentElement.scrollWidth = 369` at `innerWidth = 360` | **Fixed**: compact header rules at ≤480 px; all tested pages now equal the viewport width |
| 14 | Low | Mobile menu could not be closed with `Escape` | Keyboard test | **Fixed**: `keydown.escape` closes the disclosure; focus stays on the toggle |
| 15 | Low | M03 had no validation workflow, SEO crawl gate, browser regression suite or backup test | Only `Build & deploy` existed | **Fixed**: `ci.yml`; `test:seo`, `test:e2e`, `test:backup`; deploy workflow now runs the same gates |

No Circular imports were introduced. The build's import graph remains
`core → {core,i18n}`, `features/layout → core/shared`, and `i18n → core/i18n` only.
`tsc` with unused-symbol checks is clean, so no dead imports were left in the touched files.

## 3. Architecture decisions retained

- **Locale remains a function of the URL.** No cookie, no browser storage, no second source
  of truth. This is what makes SSR and hydration agree and prevents cross-request leakage.
- **Private pages remain client-rendered.** M04 corrects the shell, not the authentication
  model. Rendering account data in SSR would require request-scoped session injection and
  cache isolation that is not justified by a language attribute.
- **The product detail is server-rendered and now hydration-stable.** The SSR product is
  serialized with `TransferState`; the browser skips the duplicate request.
- **`/admin` stays Spanish-only.** No business requirement for an English back office has
  been recorded; a URL-independent admin locale would reintroduce a second locale source.
- **Translated slugs are not migrated in M04.** See
  [the SEO audit](../seo/M04-INTERNATIONAL-SEO-AUDIT.md) §6.
- **No new runtime dependency was added.** `@playwright/test` and `@axe-core/playwright` are
  development-only; the production dependency tree is unchanged.

## 4. Residual technical debt

| Item | Impact | Owner decision needed |
| --- | --- | --- |
| CSP keeps `script-src 'unsafe-inline'` because Angular SSR emits inline event-replay/bootstrap scripts and the async critical-CSS `onload` handler | Medium; CSP still blocks external script origins, `object-src`, framing and base-uri abuse | A nonce-based build pipeline would be a separate change |
| Rate limiting is in-process memory, not shared across replicas | Low today (single container); would break under horizontal scaling | Add a shared store only if the deployment scales out |
| Admin UI is Spanish-only | Accepted M03 decision | Revisit only with a business requirement |
| Slugs are language-independent | Accepted; avoids a risky migration | Separate SEO project with crawl/redirect plan |
| No external metrics/tracing or paging | Operational visibility is log/health based | Add only with a real monitoring budget |
| Branch protection and production environment approval are not configured on GitHub | Release governance gap | Repository owner must enable them; see the delivery report |

## 5. Verification commands

```bash
npm run build
npm run test:i18n
npm run test:commerce
npm run test:seo
npm run test:e2e
npm run test:backup
npm run test:performance   # measurement, not a pass/fail CI gate
```

Final results are recorded in
[M04-PRODUCTION-READINESS-DELIVERY.md](../roadmap/M04-PRODUCTION-READINESS-DELIVERY.md).
