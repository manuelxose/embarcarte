# MC-01 — Repository and architecture baseline (EMBARCARTE + OPEN-MARINE)

- **Date:** 2026-10-30 (Europe/Madrid). Git/GitHub facts observed 15:00–16:15 UTC.
- **Author:** Agent A — repository and architecture auditor (MC-01).
- **Milestone:** MC-01 "Agent foundation". This document is a **read-only audit record**, not a delivery or release approval.
- **Branch / base:** `feature/marea-mc01-agent-foundation` at `092ae74c904cc9aa04766ff565bacd422394fa45` (= `main` = `origin/main`).
- **Scope:** EMBARCARTE web application and repository; OPEN-MARINE modular architecture at `C:\Users\Admin\Documents\workspace\open-marine` (read-only, separate repo); existing `docs/` of both.
- **Out of scope:** source changes, dependency installation, builds, git write commands, deployments, credential inspection. None were performed by this agent.

## How to read this document

Every claim carries a label: **VERIFIED** (checked directly in this session), **PARTIAL** (partly checked / checked on a different revision or from a build artifact), **NOT VERIFIED** (documented but not re-executed), **BLOCKED** (external evidence or credential missing). Code existence is never treated as production readiness.

---

## 1. Verified Git state

### 1.1 Repository and branch

| Item | Value | Status |
| --- | --- | --- |
| Remote | `https://github.com/manuelxose/embarcarte.git` (`origin`) | VERIFIED (`git remote -v`) |
| Current branch | `feature/marea-mc01-agent-foundation` | VERIFIED (`git status --branch`) |
| HEAD | `092ae74c904cc9aa04766ff565bacd422394fa45` | VERIFIED (`git rev-parse HEAD`) |
| `main` and `origin/main` | both `092ae74…` (same SHA) | VERIFIED (`git rev-parse main origin/main`) |
| Commits on branch ahead of `main` | 0 (`git rev-list --count main..HEAD`) | VERIFIED |
| Uncommitted MC-01 work | Yes — working tree only; branch not yet advanced | VERIFIED (see §1.4) |

`092ae74` is the merge commit **"Merge pull request #5 from manuelxose/docs/marea-commercial-foundation"**; its parent `18000bd` is the merge of PR #6 (Google sign-in). So the MAREA commercial documentation reached `main` through PR #5, merged **after** PR #6.

### 1.2 Pull requests #1–#6 (verified with `gh pr list --state all`)

| PR | Title | State | Merged at (UTC) | Head branch |
| --- | --- | --- | --- | --- |
| #1 | feat(i18n): architecture and i18n foundation (M01) | MERGED | 2026-10-30 11:43:18 | `feature/i18n-architecture-foundation` |
| #2 | feat(i18n): multilingual UI consolidation and content architecture (M02) | MERGED | 2026-10-30 11:43:44 | `feature/i18n-multilingual-ui` |
| #3 | M03 — Multilingual commerce, customer experience and international SEO | MERGED | 2026-10-30 13:21:26 | `feature/i18n-commerce-seo` |
| #4 | M04 — Production hardening, security and release readiness | MERGED | 2026-10-30 13:22:45 | `feature/m04-production-hardening` |
| #5 | docs(MAREA): commercial baseline, nine-product portfolio and launch roadmap | MERGED | 2026-10-30 15:00:59 | `docs/marea-commercial-foundation` |
| #6 | Google sign-in and account creation | MERGED | 2026-10-30 15:00:27 | `feature/google-auth` |

Status: **VERIFIED** — all six MERGED (`gh` is authenticated as `manuelxose`). The `docs/marea/*.md` commercial baseline introduced by PR #5 is on `main`; it was added by commits `7529a3b`, `7fbf848`, `ae65ee1`, `57ed4d9` (verified with `git show --stat`).

### 1.3 Existing MAREA documentation on `main`

| File | Lines | Purpose | Status |
| --- | --- | ---: | --- |
| `docs/marea/M00-DISCOVERY-BASELINE.md` | 73 | Truth model, repo inventory, legal/regulatory blockers, M00 partial status | VERIFIED |
| `docs/marea/COMMERCIAL-PORTFOLIO.md` | 149 | Nine end-state products, editions, bundles, lifecycle labels, price hypotheses | VERIFIED |
| `docs/marea/MARKET-BENCHMARKS.md` | 34 | Source-anchored competitor prices (Orca, Digital Yacht, Raymarine, FLEET SaaS) | VERIFIED |
| `docs/marea/WEBSITE-AND-ROADMAP.md` | 139 | Proposed bilingual IA, page content contract, MC-00A…MC-18A gates, exclusions | VERIFIED |

Key standing truths from those documents (re-used in this baseline, not re-litigated): MAREA is a **proposed** brand, **not legally cleared**; every price is a **hypothesis**; no SKU is purchasable; no BOM, certification, sea trial, supplier quote or market-size claim exists.

### 1.4 Working tree at audit time

| Path | State | Owner / note |
| --- | --- | --- |
| `AGENTS.md` | modified (`+63/−1`) | MC-01 program rules added (Lead). Not written by Agent A. |
| `docs/marea/execution/` | untracked | New MC-01 execution docs (`AGENT-OPERATING-MODEL.md`, `MASTER-PROMPT-REGISTRY.md`, this file) |
| `.tmp-mc01/` | untracked **and not gitignored** | Skill-install temp workspace (task D). Risk: accidental commit — see §5.5 |
| `e2e/public.spec.ts` | reported `M` by git, **empty diff** | CRLF/LF working-copy artifact only (`git diff -- e2e/public.spec.ts` is empty). No content change. |

Agent A wrote exactly one file: `docs/marea/execution/MC-01-BASELINE.md`. No source file was modified, no git write command was run.

> **Post-review addendum (Lead, 2026-10-30):** the `.tmp-mc01/` hygiene risk above was closed in the
> MC-01 integration commit by adding `/.tmp-mc*/` to `.gitignore` and deleting the scratch tree
> before commit. The `e2e/public.spec.ts` empty-diff artefact was confirmed to be a CRLF-only
> working-copy effect (identical blob hash, no content change) and is not part of the commit.

### 1.5 CI / deploy state (GitHub Actions)

| Item | Observation | Status |
| --- | --- | --- |
| `CI` on base `092ae74` | **success**, created 2026-10-30T15:01:02Z (runs format:check, build, test:i18n, test:commerce, test:seo, test:backup, Playwright, `npm audit`) | VERIFIED (`gh run list`) |
| `Build & deploy` on `092ae74` | **success**, 2026-10-30T15:01:02→15:09:08Z (run 41076784662): build job ran every gate incl. 15 E2E; deploy job pushed the SHA-tagged image, deployed over SSH, passed container `/healthz`/`/readyz`/`/`/`/en/shop`/`/sitemap.xml` checks and the **public HTTPS smoke** through Caddy/nginx | VERIFIED (`gh run view 41076784662 --json jobs`) |
| Public production surface | `https://embarcarte.com/` returned **HTTP 200** with the Spanish home page content | VERIFIED (`web_fetch`, 2026-10-30) |
| Deploy trigger | `push` to `main` and `workflow_dispatch` only (`deploy.yml:3-7`); PRs cannot deploy | VERIFIED |
| `production` environment | exists, `protection_rules: []`, `can_admins_bypass: true` | VERIFIED (`gh api repos/…/environments`) |
| `main` branch protection | **not protected** (HTTP 404, re-verified today) | VERIFIED |
| Release meaning | A **docs-only merge (PR #5) triggered a full automatic production deployment** that succeeded, with no human approval step | VERIFIED from workflow definition + run 41076784662 |

> Consequence: the repository's documented M04 "production release NO-GO" (§14) was still the correct *authorisation* posture, yet the pipeline operationally contradicts it — `main` is unprotected and a `main` push deploys automatically. The M04 statement "no production deployment, smoke test or rollback has been executed" (§14.6) is now partly stale: deploy **and** public smoke have since been executed successfully by the PR #5 merge; the **rollback step was never exercised** (skipped on success). Production recovery, backup and alerting remain unverified.

---

## 2. Existing architecture map (file paths)

Stack: Angular **21.2** standalone + SSR/prerender + hydration, single Express **5** server, SQLite via `node:sqlite`, TypeScript 5.9, Prettier, Playwright. Node `>=22` (`package.json:53-55`). Docker image `node:22-alpine` (`Dockerfile`).

| Layer | Paths | What actually exists |
| --- | --- | --- |
| Bootstrap / build | `angular.json` (`outputMode: server` L59, `ssr` L68, budgets L74-83), `src/main.ts`, `src/main.server.ts`, `src/app/app.config.ts`, `src/app/app.config.server.ts` | SSR build, prerender + server + client render modes, initial bundle budgets 500 kB warning / 1 MB error |
| HTTP server | `src/server.ts` | Express 5 app; security headers + CSP (L70-119), `/healthz` (L121-124), `/readyz` with `SELECT 1` (L126-134), `/api` mount (L136), `/uploads` static (L137), dynamic `sitemap.xml` (L183-215), hashed-asset caching (L220-232), localized CSR shell for private routes (L239-252), SSR handler (L257-264), generic 500 handler (L268-281), `ensureAdmin`/session purge at boot (L287-292) |
| Client routes | `src/app/app.routes.ts` | Every public path derived from the registry via `path(id, locale)` (L9-14); shared ES/EN components per page; `canMatch` guards for detail slugs; private `orderDetail` under `authGuard`; Spanish-only `/admin` tree (L104-117); legacy 301s `/open-marine`, `/productos`, `/productos/:slug` (L119-122); wildcard 404 (L124) |
| Render modes | `src/app/app.routes.server.ts` | 12 prerendered route ids × 2 locales = 24 static pages; detail params add 6 technology slugs ×2 and 30 guide slugs ×2 → **96 prerendered pages** (matches the existing build artifact); shop server-rendered per request; cart/login/account client-rendered; `/admin` client; legacy 301 server; `**` real 404 (L36-62) |
| Localization | `src/app/core/i18n/` — `locale.types.ts`, `locale.config.ts`, `locale-routes.ts`, `locale.service.ts`, `translation.service.ts`; dictionaries `src/app/i18n/{es,en,dictionary}.ts` | Locale is a function of the URL (`/…`→es, `/en/…`→en); `LOCALIZED_ROUTES` registry (21 `RouteId`s, `locale-routes.ts:39-63`); `matchRoute`/`alternateUrl` (L91-113); `LocaleService` reads `REQUEST` on server and router events in browser (`locale.service.ts:20-53`); typed dictionaries, **229 keys per locale** (counted; M04 recorded 223 — Google sign-in added keys) |
| SEO | `src/app/core/seo.service.ts`, `src/app/core/site.config.ts`, `src/server.ts` sitemap | Title/meta/OG/Twitter/JSON-LD, one canonical, conditional `hreflang`, `x-default` only on home; `pageSeo(id, locale, …)` derives everything from the registry (`seo.service.ts:129-135`); sitemap alternates emitted only when both locales are published (`src/server.ts:165-181`) |
| Commerce (client) | `src/app/features/shop/{shop-list,shop-detail,sample-detail,cart,product-text}.ts`, `src/app/core/{cart.service,models,sample-products,images}.ts`, `src/app/shared/ui/*` | Catalogue, product detail (SSR + `TransferState`), cart (root signal, browser storage), localized money/date via `formatPrice`/`formatDate`, sample products (noindex) |
| Commerce (server) | `src/server/api.ts` (728 lines), `src/server/db.ts` | Server-authoritative catalogue/price/stock; order creation; admin CRUD; see §2.1 |
| Auth | `src/server/auth.ts` (scrypt, sessions), `src/server/google.ts`, `src/app/core/auth.service.ts`, `src/app/core/guards.ts` | Email+password and Google Identity Services; opaque session cookie (`emb_session`), SHA-256-hashed token rows, 30-day expiry, HttpOnly/SameSite=Lax/Secure-in-prod; `requireUser`/`requireAdmin`; client guards only redirect |
| Payments | `src/server/stripe.ts`, webhook in `src/server/api.ts:105-133` | Optional Stripe Checkout (server-side amount authority) + bank transfer; HMAC-SHA256 webhook verification, 5-minute tolerance, idempotent `pendiente→pagado`, expiry restores stock |
| Mail | `src/server/mail.ts` | Optional SMTP (nodemailer); without SMTP only a masked recipient + subject is logged |
| Admin | `src/app/features/admin/*` (8 components), `src/server/api.ts:494-718` | Dashboard, orders (status, transactional cancel + stock restore), products + image upload (magic-byte validated), customers, contact messages. Spanish-only by documented decision |
| Assets | `public/` (icons, `og-image.png`, `robots.txt`, `site.webmanifest`), `src/app/core/images.ts` | No local photography: hero/section images are **remote Unsplash URLs** (`images.ts:5-13`); product images are uploaded through admin into `DATA_DIR/uploads` |
| Data | `src/server/db.ts` | Tables `users`, `sessions`, `products`, `orders`, `order_items`, `messages`; in-place column migrations; seed of 3 draft products (price 0, `active=0`); `transaction()` = `BEGIN IMMEDIATE` |
| Tests / tooling | `scripts/*.mjs`, `e2e/*.spec.ts`, `playwright.config.ts`, `.github/workflows/{ci,deploy}.yml` | See §4 |
| Deploy | `Dockerfile`, `deploy/{docker-compose.yml,Caddyfile,nginx/…,setup-server.sh,.env.example}`, `.github/workflows/deploy.yml` | Single container, `VOLUME /app/data`, healthcheck `/healthz`; Caddy or nginx; GHCR image tagged by SHA |

### 2.1 Server API surface (verified by reading `src/server/api.ts`)

| Method + path | Guard / limit | Notes |
| --- | --- | --- |
| `POST /api/stripe/webhook` | signature | raw body first (`api.ts:105`), no auth |
| `POST /api/auth/register`, `/login`, `/google` | rate limit 10 / 10 min / IP | Google token verified server-side, `email_verified` required |
| `POST /api/auth/logout` | cookie | deletes session row |
| `GET /api/auth/me` | cookie | `no-store` |
| `PUT /api/account`, `PUT /api/account/password` | `requireUser` | password change revokes other sessions |
| `GET /api/shop/products`, `/api/shop/products/:slug`, `/api/shop/config` | public | `PUBLIC_PRODUCT` projection, price/stock authoritative |
| `POST /api/orders` | `requireUser`, 20 / 10 min | re-reads products by slug, rejects `price_changed` (409), `out_of_stock`, duplicate lines; stock decrement inside `BEGIN IMMEDIATE`; optional Stripe session or bank transfer (`api.ts:336-431`) |
| `GET /api/orders`, `/api/orders/:id` | `requireUser` | ownership or admin; foreign order = 404 |
| `POST /api/contact` | 5 / 10 min + honeypot | stores message, optional SMTP |
| `/api/admin/**` | `requireAdmin` (mount `api.ts:494-496`) | stats, products CRUD, image upload (8 MB, magic bytes), orders status, customers, messages |

### 2.2 Facts that constrain MAREA reuse

- **No MAREA code exists**: `grep` for `marea` across `src/` returns **zero** matches. The technology catalogue is six *technical* modules (`src/app/features/technology/models/technology.ts:11-18`: navegador, cartografia, hub, piloto-automatico, simulacion, pasarela-sensores) — not the nine *commercial* MAREA products.
- Existing build artifact contains **96 prerendered `index.html`** pages (`dist/embarcarte/browser`, counted; build dated 2026-10-30 16:04, not produced by this agent). This matches the M04 record.
- Commerce is **single-SKU, no variants**: `products` has no editions, bundles, lifecycle/readiness, compatibility, recurring price, tax class or entitlement concept.
- Checkout computes `total = Σ(unit_cents × qty)` only — **no VAT calculation, no shipping cost, no invoice numbering, no guest checkout, no subscription billing** (`api.ts:336-431`).
- Legal identity is incomplete: `SITE.legal` (`taxId`, `address`, `registry`) is empty (`src/app/core/site.config.ts:20-26`); `SITE.name` is still "Embarcarte" and descriptions reference "Open Marine".
- No email verification, no password-reset flow, no admin audit log, no quote/enquiry entity beyond the free-text contact form (`api.ts:460`), no tenant/organisation model.

---

## 3. Reusable capabilities for MAREA

| Capability | Exact files / symbols | Why reusable for MAREA | Caveat |
| --- | --- | --- | --- |
| Typed localized route registry | `src/app/core/i18n/locale-routes.ts` (`LOCALIZED_ROUTES`, `RouteId`, `localizedUrl`, `matchRoute`, `alternateUrl`) | One declaration per public URL feeds routes, prerender params, SEO, sitemap and the language switcher. New `/marea/...`/`/en/marea/...` ids plug in without duplicating components | Must add ids explicitly and check collisions with `/tecnologia`, `/productos`, `/tienda` (legacy 301s) — the proposed map in `WEBSITE-AND-ROADMAP.md:16-37` is unreviewed for collisions |
| URL-derived locale + SSR safety | `src/app/core/i18n/locale.service.ts`, `locale.types.ts`, `translation.service.ts`, `src/server.ts:239-252` | No cookie/store; concurrent ES/EN renders cannot contaminate; private routes get a localized `noindex` shell | `TranslationService` keys are UI chrome only; product/editorial copy lives in content modules |
| Typed bilingual dictionaries | `src/app/i18n/{es,en,dictionary}.ts` | `en` typed as `Record<keyof typeof es, string>` → missing key is a compile error; `{placeholder}` interpolation | 229 keys today; MAREA product copy needs content modules, not dictionary keys |
| SEO contract | `src/app/core/seo.service.ts` (`SeoService`, `pageSeo`, `breadcrumb`), `src/server.ts` sitemap | Canonical/`hreflang`/`x-default`/JSON-LD/`noindex` derived from the registry; reciprocal-alternate test exists (`scripts/check-seo.mjs`) | Product schema must never emit hypothetical MAREA prices (`COMMERCIAL-PORTFOLIO.md:123-127`, `WEBSITE-AND-ROADMAP.md:55`) |
| Server-side commerce authority | `src/server/api.ts` order pipeline, `src/server/db.ts` `transaction()`, `data/embarcarte.sqlite` schema | Pattern for future MAREA quote/order flows: re-resolve price server-side, reject tampering, reserve stock transactionally | Amount model lacks tax/shipping/subscriptions; extending it is new work |
| Auth + roles | `src/server/auth.ts` (`hashPassword`, `createSession`, `currentUser`, `requireUser`, `requireAdmin`, `ensureAdmin`), `src/server/google.ts`, `src/app/core/{auth.service,guards}.ts` | Reusable for B2B (installer/partner) roles and customer-portal work | Only two roles; no email verification/reset; extend, do not rebuild |
| Security middleware | `src/server.ts:70-119` (CSP/HSTS/nosniff/frame/referrer/permissions, `X-Request-Id`), `src/server/api.ts:137-146` (Origin check) | Reusable baseline for any MAREA public surface | CSP keeps `'unsafe-inline'` (documented residual S5) |
| Payments abstraction | `src/server/stripe.ts` (+ webhook handler) | Hosted Checkout, no card data stored; bank transfer supported | Live Stripe never tested; recurring billing not implemented; MAREA subscriptions/DEPOSITS need a new design |
| Admin back office | `src/app/features/admin/*`, `src/server/api.ts:494-718` | Product/order/message operations, upload validation | Single-tenant, Spanish-only, no audit log; MAREA product content needs richer editing |
| Isolated E2E fixture | `scripts/e2e-server.mjs` (temp `DATA_DIR`, Stripe/SMTP disabled, admin + product seeding via API), `playwright.config.ts` | Ready-made pattern for MAREA browser tests without touching real data | Seeds Spanish+English product fixtures; MAREA needs its own fixtures |
| Quality scripts | `scripts/check-{commerce,i18n,seo,backup}.mjs` | Executable gates that assert real server behaviour, not documentation | See §4 for scope and gaps |
| Release plumbing | `.github/workflows/{ci,deploy}.yml`, `Dockerfile`, `deploy/*` | CI gates + immutable image + health-checked deploy with config rollback | Deploy is automatic on `main`; no approvals (§5.2) |
| Design tokens/UI shell | `src/styles.scss`, `src/app/layout/{header,footer,brand,language-switcher}`, `src/app/shared/ui/*` | Shared header/footer/language switcher can host a MAREA brand section | Brand switch is a legal decision, not a coding decision (MAREA not cleared) |

---

## 4. Test / quality / CI inventory

Executable scripts defined in `package.json:4-19`. There is **no `test` script** (older `AGENTS.md` said `npm test`; the file has since been corrected by the Lead).

| Command | File | What it verifies | Status |
| --- | --- | --- | --- |
| `npm run format:check` | Prettier over an explicit list: `e2e/`, `playwright.config.ts`, `scripts/{e2e-server,backup,restore,check-backup,check-performance,check-seo}.mjs` | Formatting of tests/scripts **only** — `scripts/check-commerce.mjs` and `scripts/check-i18n.mjs` are missing from the list and `src/**` is not covered by the gate | VERIFIED (scope read from `package.json:14-15`) |
| `npm run build` | Angular SSR/prerender | Production build, prerender params | PARTIAL — CI green on `092ae74`; not re-run here |
| `npm run test:i18n` | `scripts/check-i18n.mjs` | Locale detection, route round-trips, dictionary parity/placeholders, markup `lang`/`hreflang`, concurrent SSR isolation, security headers | PARTIAL — in CI on `092ae74`; not re-run |
| `npm run test:commerce` | `scripts/check-commerce.mjs` | Starts the built server on a temp SQLite: catalogue/translation gate, price/stock authority, `409 price_changed`, order ownership, auth 401/403/404, password-session revocation, upload magic bytes, Stripe webhook signature, checkout expiry stock restore, concurrent cancel | PARTIAL — in CI; not re-run |
| `npm run test:seo` | `scripts/check-seo.mjs` | Sitemap structure, canonical self-reference, reciprocal `hreflang`, `x-default`, JSON-LD, `noindex` private routes, real 404, legacy 301s | PARTIAL — in CI; not re-run |
| `npm run test:backup` | `scripts/check-backup.mjs` | Isolated backup → restore → integrity/FK/counts, checksum manifest, corrupted-copy rejection | PARTIAL — in CI; not re-run |
| `npm run test:e2e` | `e2e/{public,commerce,failure,accessibility,responsive}.spec.ts` + `scripts/e2e-server.mjs` | **15 tests in 5 files** (verified with `npx playwright test --list`): bilingual public surface, language switch with query/fragment, Google entry point, mobile menu, cart/checkout/order ownership, session expiry, API/network failures, axe accessibility, responsive overflow/touch targets | PARTIAL — `--list` verified 15; execution only in CI |
| `npm run test:performance` | `scripts/check-performance.mjs` | Lab Chromium measurement of LCP/CLS/long tasks, cold cache, mobile+desktop profiles, writes `artifacts/performance` | PARTIAL — script measures only; **it asserts no budget and is not a CI gate** (read the script: no threshold/exit logic) |
| `npm audit --omit=dev --audit-level=high` | `ci.yml:37-38`, `deploy.yml:40-41` | Production dependency vulnerabilities | VERIFIED (gate exists in CI); result for today's run not re-queried |
| CI `validate` job | `.github/workflows/ci.yml:17-45` | format → build → i18n → commerce → seo → backup → Playwright → audit; Playwright report artifact on failure | VERIFIED (green on `092ae74`) |
| Deploy workflow | `.github/workflows/deploy.yml` | Same gates, GHCR image, SSH deploy with host-key fingerprint, container + public HTTPS smoke, rollback of config/image on failure | VERIFIED as code; **not executed/validated by this agent** |

Coverage gaps worth knowing before claiming MAREA quality: no unit-test framework, no visual-regression tests, no link checker, no HTML validator, no dependency-license scan, no Lighthouse CI, `src/**` not covered by `format:check`, performance script not a gate, no `INP`/field metrics.

---

## 5. Problems discovered

No **pre-existing test failure** is observable on the base commit: `CI` is green on `092ae74`. Everything below is debt, inconsistency, governance risk or a readiness gap — not proof that the app fails.

### 5.1 Documentation drift (verified contradictions)

| # | Issue | Evidence |
| --- | --- | --- |
| D1 | `M04-SECURITY-REVIEW.md` §4 still claims `ensureAdmin` "resets the configured admin password at startup. This is intentional", contradicting its own S11 fix and the code | `docs/security/M04-SECURITY-REVIEW.md:57-59` vs `src/server/auth.ts:126-143` (password only on creation; `ADMIN_PASSWORD_RESET=true` rotates) |
| D2 | Same document's §7 "Residual" says a failed Stripe session creation leaves the order pending with stock reserved (S9), contradicting its S9 entry and the code | `docs/security/M04-SECURITY-REVIEW.md:111-113` vs S9 (line 25) and `src/server/api.ts:416-428` |
| D3 | `README.md` points to `src/app/core/catalog.ts`, which no longer exists (content moved to `src/app/features/technology/content/`) | `README.md:41`; file absent from `src/` listing |
| D4 | `docs/marea/M00-DISCOVERY-BASELINE.md` records `main` at `ed40ee9` (pre-#5/#6). The authoritative baseline is now `092ae74` | `docs/marea/M00-DISCOVERY-BASELINE.md:14` |
| D5 | M04 delivery report lists PR #4 as "open / merge not performed"; it is MERGED. Historical documents describe their own snapshot — read them as history, not current state | `docs/roadmap/M04-PRODUCTION-READINESS-DELIVERY.md:245-253` vs `gh pr list` |
| D6 | `AGENTS.md` briefly described `npm run test:performance` as "performance budgets"; the Lead corrected it during MC-01 to "measures; applies no thresholds and is not a CI gate", which matches the script | `scripts/check-performance.mjs` (no assertions) vs current `AGENTS.md` §"Comandos verificados (MC-01)" — resolved |

### 5.2 Open release blockers (carried from M04, re-verified where possible)

1. **`main` has no branch protection** — `gh api repos/manuelxose/embarcarte/branches/main/protection` → 404 (re-verified 2026-10-30). VERIFIED.
2. **`production` environment has no protection rules / reviewers** and admins can bypass — `gh api …/environments` shows `protection_rules: []`, `can_admins_bypass: true`. VERIFIED. Combined with `deploy.yml` triggering on `main` push, **any merged commit deploys automatically** — demonstrated by the docs-only PR #5 merge, which produced successful run 41076784662. VERIFIED.
3. **Deploy requires `CONTABO_HOST_FINGERPRINT`**, whose presence/rotation was never verified (no repository-secret access in this session). Successful deploy runs are consistent with it being set. NOT VERIFIED / BLOCKED by credential scope.
4. **Production backup and restore are unverified**; only an isolated restore was tested (`M04-PRODUCTION-READINESS-DELIVERY.md:266-284`, `docs/operations/BACKUP-RESTORE.md`). No off-host retention, no restore timing. NOT VERIFIED.
5. **No external alerting/paging, no metrics/tracing/log retention** — explicitly declared gaps (`docs/operations/OBSERVABILITY.md:46-54, 88-92`). VERIFIED as a documented gap.
6. **CSP still allows `script-src 'unsafe-inline'`** (Medium residual S5; `src/server.ts:78`). VERIFIED.
7. **Google OAuth JavaScript origins not yet added in Google Cloud** — production Google sign-in would return `origin_mismatch`; status **BLOCKED** in `M04-SECURITY-REVIEW.md:133`. VERIFIED as a documented blocker (external console action, cannot be fixed in code).
8. **Legal/commercial identity incomplete**: `SITE.legal` tax ID, address and registry are blank (`src/app/core/site.config.ts:21-26`); the legal pages and structured data cannot be legally complete. VERIFIED.
9. **MAREA trademark not cleared**; an existing marine-electronics business uses "Marea Marine" (`docs/marea/M00-DISCOVERY-BASELINE.md:44-52`, `MARKET-BENCHMARKS.md:27`). BLOCKED on external clearance.
10. **OPEN-MARINE has no licence granting reuse** (§7.4) — blocks commercial embedding/redistribution until resolved. BLOCKED.
11. **Rollback and production recovery are unexercised** — a deploy of `092ae74` did succeed (15:09Z, public smoke green), but the `Restaurar configuración e imagen anterior si falla el smoke` step was *skipped*, so rollback remains untested. PARTIAL.

### 5.3 MAREA-readiness gaps in the current product (code-level)

| Gap | Evidence | Impact |
| --- | --- | --- |
| Product model cannot express editions, bundles, compatibility, lifecycle/readiness, subscriptions or entitlements | `src/server/db.ts:36-49`, `admin-product-edit.ts` | MAREA product pages would need new data model + admin UI; today "active" is the only readiness flag |
| No quote / pre-registration / compatibility-request entity | only `POST /api/contact` (`api.ts:460`) + admin messages | WEBSITE-AND-ROADMAP requires qualified quote flows for HUB/PILOT/FLEET |
| No VAT, shipping, invoicing or recurring billing | `api.ts:367` (`total = Σ unit×qty`) | Cannot honestly sell VAT-inclusive hardware bundles or subscriptions |
| No guest checkout, no email verification, no password reset | `api.ts` route list | Weakens consumer purchase flow and account recovery |
| No installer/partner/B2B roles, no organisation/tenant model | `src/server/auth.ts` (`role: customer\|admin`) | Blocks FLEET and professional-channel milestones |
| No admin audit trail / export / deletion workflow | admin routes | Needed for GDPR operations and FLEET-grade guarantees |
| Remote Unsplash imagery, no local visual assets | `src/app/core/images.ts` | MAREA needs owned, labelled CONCEPT/REAL_PRODUCT assets (Agent C pipeline) |
| in-process rate limiting, SQLite single writer | `api.ts:41-63`, `db.ts` | Horizontal scaling not supported; acceptable for one container only |

### 5.4 Security posture summary

No Critical/High finding is open **within the M04 scope** per `docs/security/M04-SECURITY-REVIEW.md` §1; notable residuals: inline-script CSP (S5), per-process rate limit (S6), registration email enumeration (S7, accepted), CSRF relies on Origin+SameSite rather than tokens (S8). No penetration test, DAST, or production monitoring exists. **This is not a penetration-test or production-security clearance.**

### 5.5 Repository-hygiene risks

- `.tmp-mc01/` is untracked but **not** in `.gitignore` (verified with `git check-ignore`) → risk of committing third-party skill clones.
- `dist/`, `data/`, `artifacts/`, `graphify-out/` are correctly ignored (verified) although present locally.
- `graphify-out/graph.json` (735 nodes) is a local index; MC-01 doc changes make it slightly stale — the Lead should run `graphify update .` once at integration (Agent A did not, to avoid writing outside its assigned scope).
- Line-ending churn: `e2e/public.spec.ts` appears modified with an empty diff (CRLF artifact). Any commit should be reviewed with `git diff` rather than `git status` alone.

---

## 6. What MUST NOT be rewritten (and why)

| Must not rewrite | Why |
| --- | --- |
| `LOCALIZED_ROUTES` semantics and every already-published URL (`/tecnologia`, `/tienda`, `/guias`, `/cuenta`, …) | Indexed URLs and external links; M01–M04 deliberately kept Spanish unprefixed and language-independent slugs (`docs/architecture/ARCHITECTURE.md:33-41`, `docs/seo/M04-INTERNATIONAL-SEO-AUDIT.md:99-118`). New MAREA routes are **additions**, never renames |
| The URL-is-the-locale contract (no cookie/localStorage locale, no second source of truth) | It is what makes SSR/hydration agree and prevents cross-request locale leakage (`ARCHITECTURE.md:33-56`, `M04-TECHNICAL-AUDIT.md:60-72`) |
| Shared ES/EN component architecture (one component per page) | M02/M03 deleted English duplicates after paying a large duplication cost (`docs/architecture/M03-COMMERCE-AUDIT.md:37-49`); reintroducing parallel trees would repeat it |
| `SeoService`/`pageSeo` canonical+hreflang derivation and server sitemap reciprocity | Currently machine-tested (`scripts/check-seo.mjs`, `src/server.ts:165-181`); hand-written metadata was an M03 defect class |
| Server-authoritative commerce invariants (`price_changed`, transactional stock, ownership 404, webhook signature/idempotency/expiry, upload magic bytes) | Documented as contracts in `M03-COMMERCE-AUDIT.md:104-116` and hardened in M04; regressions are financial/security incidents |
| Session/auth model (scrypt, hashed tokens, HttpOnly/SameSite cookie, `requireUser`/`requireAdmin`, admin Spanish-only) | M04-hardened; `admin` l10n decision documented (`M03-COMMERCE-AUDIT.md:117-123`) |
| `src/server.ts` security-header middleware and private CSR shell | Fixes documented High findings; the shell keeps session data out of the first byte (`M04-SECURITY-REVIEW.md` §4-§6) |
| Angular 21 SSR + prerender + hydration architecture | Program rule (AGENTS.md §"Reglas del programa MAREA"); M04 measurements depend on it |
| Existing EMBARCARTE business identifiers (company, emails, `SITE.name`, Open Marine technology pages) | `docs/marea/WEBSITE-AND-ROADMAP.md:12-13`: existing experiences/delivery businesses and indexed identities must be preserved; MAREA is a proposed addition, not a replacement |
| Contract of the test gates' names/semantics | CI and the release runbook depend on them; extend coverage, don't rename silently |

Adding is allowed where the design anticipates it: new `RouteId`s + registry entries, new content modules, new tables/columns, new admin screens, new MAREA-only components under `src/app/features/`.

---

## 7. OPEN-MARINE — real modular architecture

Location `C:\Users\Admin\Documents\workspace\open-marine` (separate repo; **not modified**). Git: `main` clean, `## main...origin/main`, HEAD `403941b` ("chore: remove the old workflow tooling references"), remote `https://github.com/manuelxose/open-marine.git`.

### 7.1 Workspaces (root `package.json`, npm workspaces)

| Workspace | Package name / version | Nature (verified from layout) |
| --- | --- | --- |
| `marine-data-contract` | `@omi/marine-data-contract` 0.1.0 | Pure TS Signal K-derived contract: `paths.ts` (Signal K path constants), `types.ts` (`DataPoint<T>`, `SourceRef`, `normalizeTimestamp`, clock-drift clamp), `units.ts` (SI canonical: rad, m/s, m, V, A), `quality.ts` (`QualityFlag`/degradation), `simulation.ts`, `bench.ts`; vitest |
| `marine-sensor-gateway` | `marine-sensor-gateway` 0.1.0 | Adapters (GPS/AIS/IMU/wind/autopilot), publishers, `rpi/` systemd units; jest-style tests |
| `marine-simulation-platform` | `marine-simulation-platform` 1.0.0 | Scenario/simulation bench, API, persistence, runtime |
| `marine-instrumentation-ui` | `marine-instrumentation-ui` 0.0.0 | Angular **21.2.17** UI (maplibre-gl 5.16, uplot, ws, zone.js), Playwright + vitest, service worker; separate app and separate design system |
| `marine-autopilot-engine` | `marine-autopilot-engine` 0.1.0 | Control/safety/actuators/sensors/signalK state machine, simulator; `pico2/` UART microcontroller firmware + hardware scripts |
| `marine-chart-engine` | `marine-chart-engine` 0.1.0 | Chart catalogue/import/tile service (port 8088), MBTiles + legal S-57 conversion, EMODnet/Copernicus overlays |
| `marine-tile-server` | `marine-tile-server` 1.0.0 (**license `ISC`) | Tile serving service |
| `signalk-runtime` | (no `package.json`) | Docker Compose runtime for Signal K (port 3000) |

Runtime service map (root `README.md:5-13`): Signal K 3000, UI 4200/dev, autopilot engine 3990, test bench 4100, chart engine 8088. Raspberry layout documented with persistent data directories outside Git (`README.md:33-42`).

### 7.2 Real boundaries (as evidenced)

- The **data contract is the only shared package**; the UI consumes it (`@omi/marine-data-contract` in the UI manifest), gateway/publishers mirror Signal K paths.
- The **UI is a standalone Angular app** with its own router, state, service worker and design language — it is *not* a component library for EMBARCARTE. Sharing it would mean sharing an app and its dependency tree (maplibre etc.), not importing modules.
- **Chart engine** is an HTTP service with a documented API (`marine-chart-engine/README.md:59-88`) and an explicit refusal list: S-63/oeSENC/encrypted charts/DRM bypasses are **out of scope** (README:183-185), imports are restricted to legal local files, and the disclaimer states it is "not an ECDIS" (README:187).
- **Autopilot** is design + code (heartbeat watchdog, NC E-stop on GP13, PWM=0 safe state, bench-only motor tests; `marine-autopilot-engine/pico2/README.md`) — **no evidence of sea trials, conformity or commercial installation** in the repository.
- **Data-source rights are per provider** (`docs/marine-data-sources.md`, checked 2026-07-29): MeteoGalicia/AEMET terms need confirmation, Puertos del Estado requires attribution and warnings against third-party transfer, Copernicus Marine is EU service with DOIs, EMODnet CC BY 4.0, Open-Meteo attribution. The document itself says "confirm dataset terms before redistribution" and closes with unresolved 502/auth blockers.
- **CI** (`.github/workflows/ci.yml`): per-workspace build/test jobs on **Node 20**; no licence scan, no deploy. (EMBARCARTE pins Node `>=22`; Node-20/22 split is a cross-repo tooling mismatch to resolve in MC-12A.)

### 7.3 Reusable vs not reusable

| Item | Reusable? | Condition / caveat |
| --- | --- | --- |
| Signal K-based data contract (`paths`, `units`, `quality`, `DataPoint`, drift normalization) | **Yes — as a contract design** | Adopt the conventions/type shapes in MAREA; importing the package requires a licence decision first |
| Simulation bench / scenario model | Yes, as engineering evidence tooling | Needs an explicit licence and separation from customer-facing code |
| Chart-engine HTTP contract (catalog/jobs/tiles) | Yes, as a **service boundary** | Nautical chart/data redistribution rights unresolved; keep behind a documented interface, never assume in-app chart licensing |
| Autopilot safety architecture (independent watchdog, hard E-stop, manual takeover) | Yes, as **design input for safety boundaries (MC-12B)** | Must be independently verified; never presented as certified or sea-proven |
| Marine-instrumentation UI | **Not directly** | Separate Angular application, different state/design system, heavy map deps; reuse ideas/components only after a licence exists |
| Autopilot firmware/engine code as a product | **No (not yet)** | Safety-critical; no conformity/sea-trial evidence; regulatory exposure |
| Encrypted/commercial chart support | **No** | Explicitly out of scope by design |
| Any "certified/production-ready" claim about OPEN-MARINE components | **No** | Repository states design/documentation level; M00 records the same |

### 7.4 Licensing — BLOCKED

- Recursive search for `LICENSE*`/`COPYING*`/`NOTICE*` files (excluding `node_modules`) returns **nothing**.
- Only `marine-tile-server/package.json` declares `"license": "ISC"`; root `package.json` is `private: true` with **no licence field**, as are the other workspaces.
- Consequence: EMBARCARTE has **no explicit right** to embed, redistribute, sublicense or ship OPEN-MARINE code or derived devices. This is an MC-00B/MC-12A blocker, not a code blocker.

---

## 8. Dependencies and inputs needed for MC-02

MC-02 (nine product business definitions, bundles, compatibility) needs the following before any page can claim more than CONCEPT/DEFINED:

1. **Program decisions (Lead):** MAREA route namespace and `RouteId` naming, and confirmation that existing indexed URLs are untouched; acceptance of the registry-addition strategy in §3/§6.
2. **Content/data contract:** agree the normalized MAREA product record — identity, segment, editions, inclusions/exclusions, compatibility rules, lifecycle state (`CONCEPT`…`COMMERCIALLY AVAILABLE`), pricing *provenance*, related bundles, service entitlements, support links (`COMMERCIAL-PORTFOLIO.md:18-19`, `WEBSITE-AND-ROADMAP.md:54-55`). This must precede code: the current `products` table cannot hold it.
3. **Readiness/catalogue states:** `draft | quote | coming-soon | purchasable` as a first-class field so no unverified SKU can be ordered (`WEBSITE-AND-ROADMAP.md:48,78`).
4. **Quote/enquiry flow:** decision to extend contact + admin messages or add a dedicated quote entity (needed for HUB/AIS/PILOT/FLEET).
5. **Assets:** the manifest + labelling standard produced by Agent C (`docs/marea/assets/`). Every product page depends on it; no unlabelled render may be presented as real hardware.
6. **Agent/skill operating baseline:** Agent B's harness capability report and Agent D's `.agents/skills/` (quality gate, Angular commerce rules, asset production). MC-02 acceptance depends on the quality-gate skill being loadable.
7. **Legal inputs (BLOCKED):** MAREA trademark clearance, operator identity (`SITE.legal`), VAT/shipping/returns policy, Google Cloud origin change. Until then product pages stay non-transactional and legal pages stay knowingly incomplete.
8. **Rights inputs (BLOCKED):** OPEN-MARINE licence grant (§7.4) and chart/weather data redistribution rights (MC-00B) — required before any promise of "licensed charts", "forecast data included" or "offline regions".
9. **Business inputs (open per M00/MARKET-BENCHMARKS):** BOM/supplier quotes, channel margins, instalment/installation economics, primary customer interviews — no fabricated numbers.
10. **Engineering inputs for later milestones:** hardware/sea-trial evidence (MC-13-*), FLEET tenant model, subscriotion/entitlement billing design. MC-02 can define; only MC-13/MC-16 can certify.

Minimum safe MC-02 output: exact product definitions + bundle rules + explicit exclusions **and** an honest per-product lifecycle label, with no purchasable state and no published price claim.

---

## 9. Evidence table

| # | Claim | Status | Evidence (path / command) |
| --- | --- | --- | --- |
| 1 | Branch is `feature/marea-mc01-agent-foundation` at `092ae74` = `main` = `origin/main`, 0 commits ahead | VERIFIED | `git status --branch`, `git rev-parse HEAD main origin/main`, `git rev-list --count main..HEAD` |
| 2 | PRs #1–#6 are all MERGED | VERIFIED | `gh pr list --state all --limit 20 --json number,state,mergedAt,…` |
| 3 | `docs/marea/*.md` commercial baseline is on `main` via PR #5 | VERIFIED | `git show --stat 7529a3b 7fbf848 ae65ee1 57ed4d9`; files present under `docs/marea/` |
| 4 | CI green on base commit `092ae74` | VERIFIED | `gh run list --workflow ci.yml --json headSha,conclusion` (success, run created 15:01:02Z) |
| 5 | `main` branch protection absent | VERIFIED | `gh api repos/manuelxose/embarcarte/branches/main/protection` → 404 |
| 6 | `production` environment has no approval rules; main push auto-deploys | VERIFIED | `gh api repos/…/environments`; `.github/workflows/deploy.yml:3-7,60-151` |
| 7 | A docs-only `main` push auto-deployed `092ae74` to production and succeeded end-to-end (all gates, image push, SSH deploy, container checks, public HTTPS smoke) | VERIFIED | `gh run view 41076784662 --json jobs` — build success 15:08:13Z, deploy success 15:09:07Z, `Smoke test público` success; rollback step skipped |
| 7b | `https://embarcarte.com/` is live and returns the Spanish home page (HTTP 200) | VERIFIED | `web_fetch https://embarcarte.com/` (2026-10-30) |
| 8 | Angular 21.2 / SSR / Express 5 / `node:sqlite` / Node ≥22 | VERIFIED | `package.json:21-56`, `Dockerfile`, `src/server.ts`, `src/server/db.ts:6` |
| 9 | 21 typed `RouteId`s; all public URLs derived from one registry | VERIFIED | `src/app/core/i18n/locale-routes.ts:3-63`, `src/app/app.routes.ts:9-14`, `app.routes.server.ts:10` |
| 10 | Render strategy: prerender static, server shop, client private/admin, real 404, legacy 301 | VERIFIED | `src/app/app.routes.server.ts:13-62` |
| 11 | 96 prerendered pages in the existing build artifact | PARTIAL (artifact, not rebuilt here) | `Get-ChildItem dist/embarcarte/browser -Recurse -Filter index.html` → 96; build timestamp 2026-10-30 16:04 |
| 12 | Locale is URL-derived, no cookie/store; SSR request-scoped | VERIFIED | `src/app/core/i18n/locale.service.ts:20-53`, `locale.types.ts`, `ARCHITECTURE.md:33-56` |
| 13 | 229 dictionary keys in ES and EN (1:1) | VERIFIED | `Select-String src/app/i18n/{es,en}.ts -Pattern "^\s+'[^']+'"` → 229 / 229 |
| 14 | SEO: one canonical, reciprocal hreflang, x-default only on home, sitemap-gated alternates | VERIFIED | `src/app/core/seo.service.ts:70-135`, `src/server.ts:165-215` |
| 15 | Security headers/CSP/HSTS/nosniff/frame/referrer emitted app-wide | VERIFIED | `src/server.ts:69-119` |
| 16 | Server-authoritative pricing, transactional stock, ownership 404s | VERIFIED | `src/server/api.ts:336-456`, `src/server/db.ts:98-108` |
| 17 | Stripe optional; webhook HMAC + 5-min tolerance + idempotent completion + expiry stock restore | VERIFIED | `src/server/stripe.ts:48-62`, `src/server/api.ts:105-133` |
| 18 | No VAT/shipping/invoice/subscription/entitlement anywhere in commerce | VERIFIED (absence) | `src/server/api.ts:367` total computation; grep for `tax|VAT|subscription|entitlement` in `src/**/*.ts` → no domain matches |
| 19 | Auth: scrypt, hashed session tokens, HttpOnly cookie, requireUser/requireAdmin, session revocation | VERIFIED | `src/server/auth.ts:21-147`, `docs/security/M04-SECURITY-REVIEW.md` §4-§5 |
| 20 | Google sign-in merged; production JS origins still BLOCKED | VERIFIED (code) / BLOCKED (console) | PR #6 merged; `src/server/google.ts`, `site.config.ts:19`, `M04-SECURITY-REVIEW.md:133` |
| 21 | 15 Playwright tests in 5 files | VERIFIED | `npx playwright test --list` → "Total: 15 tests in 5 files" |
| 22 | Check scripts exist and run against the built server/temp SQLite | VERIFIED (existence/scope) / PARTIAL (CI execution) | `scripts/check-{commerce,i18n,seo,backup}.mjs`, `scripts/e2e-server.mjs`, `package.json:8-13` |
| 23 | `npm test` is not defined | VERIFIED | `package.json:4-19` |
| 24 | `test:performance` measures but asserts no budget and is not in CI | VERIFIED | `scripts/check-performance.mjs` (no thresholds/exit logic); `ci.yml` step list |
| 25 | Legal identity fields are empty | VERIFIED | `src/app/core/site.config.ts:20-26` |
| 26 | M04 documented NO-GO blockers still apply, except that deploy + public smoke have since been executed successfully | VERIFIED (re-checked where external) | `docs/roadmap/M04-PRODUCTION-READINESS-DELIVERY.md:255-284`, `docs/security/M04-SECURITY-REVIEW.md:126-141`, `OBSERVABILITY.md:46-54`; deploy run 41076784662 |
| 27 | Documentation drift items D1–D6 | VERIFIED | Cited paths/lines in §5.1 |
| 28 | No MAREA code/routes exist in the app | VERIFIED (absence) | `grep -i marea src/` → 0 matches |
| 29 | OPEN-MARINE: 7 workspaces + `signalk-runtime`, root `README.md` service map | VERIFIED | `open-marine/package.json` workspaces; `open-marine/README.md:5-13` |
| 30 | OPEN-MARINE data contract is Signal K-derived and SI-normalized with quality flags | VERIFIED | `open-marine/marine-data-contract/src/{paths,types,units,quality}.ts` |
| 31 | Chart engine explicitly excludes S-63/oeSENC/encrypted charts and disclaims ECDIS | VERIFIED | `open-marine/marine-chart-engine/README.md:183-187` |
| 32 | Weather/chart data rights are per-provider and partly unresolved | VERIFIED (documented) | `open-marine/docs/marine-data-sources.md:6-19,32-34` |
| 33 | OPEN-MARINE has no LICENSE file; only `marine-tile-server` declares ISC | VERIFIED (absence) | recursive `LICENSE*` search excluding `node_modules` → none; module `package.json` licence fields |
| 34 | OPEN-MARINE CI uses Node 20, EMBARCARTE requires ≥22 | VERIFIED | `open-marine/.github/workflows/ci.yml`, `embarcarte/package.json:53-55` |
| 35 | No sea-trial/certification evidence for autopilot or AIS hardware | NOT VERIFIED / absent | `marine-autopilot-engine/pico2/README.md` (design+bench only); `docs/marea/M00-DISCOVERY-BASELINE.md:29-35` |
| 36 | The MAREA site map in `WEBSITE-AND-ROADMAP.md` is collision-checked against live routes | NOT VERIFIED | Proposed only; `/profesionales`, `/instaladores`, `/soporte`, `/marea/*` do not exist in `LOCALIZED_ROUTES` |
| 37 | Production readiness of the web application | NOT VERIFIED / declared NO-GO | `M04-PRODUCTION-READINESS-DELIVERY.md:266-284` |

### Bottom line for MC-01

- The repository is a **coherent, working Angular 21 SSR commerce site with an unusually strong executable test/seo/security baseline**, and it is the correct foundation for MAREA.
- It is **not** a MAREA implementation: no MAREA route, model, content or asset exists yet.
- It is **not production-cleared**: a production deployment did succeed (deploy + public smoke, 2026-10-30 15:09Z), but the *authorisation and recovery* controls are absent — no branch protection, no environment approvals, untested rollback/backup, no monitoring, incomplete legal identity — and the pipeline deploys automatically from an unprotected `main`.
- OPEN-MARINE is a **technical reference with real architectural boundaries but no licence grant and no product-level evidence**; reuse requires legal work before code work.
