# MC18 — Future Publication Integration Plan (D16)

| Field            | Value                                                                      |
| ---------------- | -------------------------------------------------------------------------- |
| Deliverable      | D16 — `MC18-FUTURE-PUBLICATION-INTEGRATION-PLAN.md`                        |
| Milestone        | MC-18/36 — EMBARCARTE / MAREA internal bilingual corporate landing         |
| Owner            | docs-b                                                                     |
| Date             | 2026-11-03                                                                 |
| Status           | INTERNAL_PROPOSED (planning only — **no step executed in MC-18**)          |
| Publication      | NOT_AUTHORIZED                                                             |
| Indexation       | DISABLED — `noindex, nofollow, noarchive`                                  |
| Repository state | HEAD `6002c49f898e755154c1b65c97781177719ce11c`, uncommitted MC-18 changes |

## 0. Non-execution statement

**No step in this document has been executed in MC-18.** The landing is not
registered, not emitted, not indexable and not hosted. This plan exists so a
future, explicitly authorized milestone can publish it without improvising around
the gates. Nothing here authorizes publication now; the current state remains
`MC18_PUBLICATION = NOT_AUTHORIZED`, `sitemapEligible = false`,
`indexationAuthorized = false` and `LANDING_RELEASE_AUTHORIZATION = null`.

## 1. Preconditions and facts that must change first

The plan is conditional on facts, not on code changes. Each fact below is
currently blocking and is registered in D17.

| #   | Fact that must change first                       | Current observed value                                                                                                                                                                 | Who must provide it                                     |
| --- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| F1  | MC-14 release gates                               | 13 gates, **0 closed**, 12 blocked, 1 evidence required; 24 required documents, 0 executed                                                                                             | Legal/commercial owners + independent audit             |
| F2  | Trademark legal clearance                         | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `MAREA_PUBLIC_USE = NO_GO`                                                                                                                  | Brand owner + counsel                                   |
| F3  | Source IP / licensing clearance                   | `SOURCE_IP_CLEARANCE = NOT_CLEARED`; licensing not cleared for NAV/AIS/WEATHER/FLEET                                                                                                   | Legal + data licensors                                  |
| F4  | Legal identity verification                       | legal identity not verified (gate `GATE-LEGAL-ENTITY` open)                                                                                                                            | Company legal owner                                     |
| F5  | Public copy approval                              | `publicCopyApproved = false`; all content blocks `INTERNAL_DRAFT_NOT_APPROVED` / `NOT_APPROVED`                                                                                        | Copy owner + legal                                      |
| F6  | Claims approval                                   | 42 claims catalogued, **0 public-authorized**, 30 mandatory prohibited categories; `publicationAuthorization: NONE`                                                                    | Claims owner + legal                                    |
| F7  | Privacy / DPA / DPIA                              | `privacyApproved = false`; gate `GATE-PRIVACY-DPA-DPIA` open                                                                                                                           | Privacy owner (especially before any lead/enquiry flow) |
| F8  | Commercial data / pricing                         | all products `NOT_FOR_SALE`, no approved price, `commercialDataApproved = false`; pricing/commercial availability must be defined _or_ the page must publish without commercial offers | Commercial owner                                        |
| F9  | Publication, indexation, deployment authorization | all `false`; `LANDING_RELEASE_AUTHORIZATION = null`                                                                                                                                    | Accountable release owner                               |
| F10 | Hardware conformity                               | no selected hardware, no conformity evidence, CE/NMEA claims prohibited, 0 tested compatibility rows                                                                                   | Hardware/compliance                                     |
| F11 | Deadlines / safety                                | PILOT safety gate `BLOCKED`                                                                                                                                                            | Safety owner                                            |

Publishing while any of F1–F11 is open would be a false public claim and is not
authorized. Lock 1 (gates) and Lock 2 (release authorization record) in D09 must
both open; neither is a code toggle.

## 2. Authorized sequence

The sequence is ordered: step _n+1_ cannot start until step _n_ has evidence and
an approval. Steps 1–2 are legal/organizational; steps 3–7 are engineering; step 8
is verification; step 9 is release.

### Step 1 — Legal and claims clearance (F1–F6, F10–F11)

- Close the 13 MC-14 release gates with real evidence; record the decisions in
  the legal-commercial evidence set.
- Obtain trademark clearance (`GRANTED`) and change `MAREA_PUBLIC_USE` from
  `NO_GO` only through a brand-owner + counsel approval.
- Approve public copy per locale; claims must move from internal-only to
  public-authorized one by one (`0/42` today).
- Resolve the inherited MC-14 brand policy conflict
  (`MC14-BRAND-CONFLICT-01`) with an explicit supersession record.

### Step 2 — Privacy and commercial model (F7–F8)

- DPA/DPIA for the landing: even without forms, analytics/hosting choices matter;
  if any contact/lead flow is planned, it needs consent, lawful basis, retention
  and a processor list **before** implementation.
- Define the commercial model: publish without prices (informational) or obtain
  approved prices/availability. Do not publish unapproved prices as offers.

### Step 3 — Route registration (production)

Register the proposed route in the production application, preserving the typed
localization architecture and one component per page:

| File                                 | Change                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/app.routes.ts`              | add the typed ES/EN routes for `mareaOverview` (single `MareaLanding` component, locale from route data)                                                |
| `src/app/core/i18n/locale-routes.ts` | register the localized route metadata (`LOCALIZED_ROUTES`) so hreflang/canonical generation sees both locales                                           |
| `src/app/app.routes.server.ts`       | choose `RenderMode.Server` or prerender for both paths; justify SSR/hydration                                                                           |
| `src/server.ts`                      | only if route-dependent serialization/sitemap generation needs it                                                                                       |
| `src/app/marea-landing/**`           | keep one bilingual component tree; remove the preview-only host wrapper from the production path (the landing component is already locale-input driven) |

Gate: route collision test must still report `NO_COLLISION`; the 21 existing
public route ids must be preserved; no existing indexed URL may change.
`PRODUCTION_ROUTE_FILES` guards exactly the four real route surfaces —
`src/app/app.routes.ts`, `src/app/app.routes.server.ts`,
`src/app/core/i18n/locale-routes.ts` and `src/server.ts` — and no static sitemap
path. The MC-18 changed-file allowlist includes `playwright.config.ts` as an
allowed exact path: its `testIgnore: ['**/design-system/**', '**/landing/**']`
keeps the inherited public e2e composition separate from the landing suite
(`playwright.landing.config.ts`).

### Step 4 — Production build integration

- Ensure the production `embarcarte` build includes the landing component graph
  and does **not** include `preview/landing/`.
- Remove/retire the preview-only assets only when the production path is proven;
  keep the isolated preview for internal inspection until release.
- Verify the production bundle does not regress the existing site's budgets and
  that no landing code is reachable from the current production routes before
  authorization (today the count is zero landing bytes).

### Step 5 — Metadata emission (two-lock activation)

- Create a real `ReleaseAuthorization` record (`scope: PUBLICATION`,
  `authorizedBy`, `authorizedAt`, `legalClearanceReference`) and replace the
  `null` constant in `models/seo.ts` through a reviewed change with tests.
- Keep the activation gate set at **all 12** publication gates plus the
  authorization record (it was hardened during MC-18; do not reintroduce a
  subset).
- Emit canonical + reciprocal `hreflang` (ES `es-ES`, EN `en`, `x-default` ES)
  from a reviewed production metadata service; emit title/description; change
  robots policy to `index,follow`.
- Open Graph/Twitter: emit only after copy approval; the planned OG image is
  `null`, so an image requires a new asset review (honest concept vs product
  labelling).
- Structured data: re-review from scratch. MC-18 sets `product`, `offer`,
  `aggregateRating`, `review`, `breadcrumbList`, `organization` and
  `anyJsonLdEmitted` to `false`; do not reuse the planning flags as authorization.

Gate: `evaluateSeoActivation` returns all `true` only with the real authorization
record; tests must prove single-boolean activation remains impossible.

### Step 6 — Sitemap and robots

- Add both locale URLs to the production sitemap (the sitemap is generated by the
  production SSR app; there is no static `public/sitemap.xml` in this repository,
  and `PRODUCTION_ROUTE_FILES` guards the four real route files including
  `src/server.ts`).
- Include reciprocal alternates and exactly one `x-default` (ES), consistent with
  the planned group.
- Update `public/robots.txt` only if required; keep private/account/admin paths
  disallowed and never list a noindex URL in the sitemap.
- Validate: sitemap XML namespace/format, every alternate is itself a sitemap
  `loc`, no noindex-while-sitemapped URL, no private URL.

### Step 7 — Search Console / launch operations

- Submit the sitemap, verify ownership, record the submitted URL count
  (the MC-15 policy records `INDEXATION_UNVERIFIED`: no Search Console access
  exists today, so no indexation count is claimed).
- Set up monitoring for 404/5xx, canonical consistency and hreflang errors.
- Prepare a redirect/removal plan in case of rollback.

### Step 8 — QA gates

Run and record at minimum:

| Gate                                | Command / evidence                                                                                                                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript                          | `npx tsc -p tsconfig.app.json --noEmit`                                                                                            |
| Build                               | `npm run build` (production SSR) and `npm run build:landing:preview` for the internal preview                                      |
| Unit                                | `npm run test:landing:unit`                                                                                                        |
| Landing validator                   | `npm run test:landing` (must be green, not 55/60)                                                                                  |
| e2e / axe                           | `npm run test:landing:e2e` + the existing e2e suites                                                                               |
| i18n                                | `npm run test:i18n` (locale parity + localized routes)                                                                             |
| SEO                                 | `npm run test:seo` (canonical, reciprocal hreflang, JSON-LD policy, sitemap, private noindex)                                      |
| Commerce non-regression             | `npm run test:commerce`, `npm run test:commerce-data` (server-authoritative pricing/stock untouched)                               |
| Security/privacy                    | D15 controls still hold; privacy approval evidenced                                                                                |
| Accessibility/responsive/visual/SSR | QA evidence datasets present; D10-D12 narrative documents, performance evidence, legacy baseline and review findings still PENDING |

### Step 9 — Release and rollback

- Merge only after the independent audit issues its verdict and the release
  authorization exists.
- Deploy through the existing production deployment path; no preview hosting.
- Rollback plan: revert the route registration and metadata emission, restore
  `noindex` and the `null` authorization, remove the sitemap entries, redeploy the
  previous commit; keep gate records unchanged and document the incident.
- Post-release: verify canonical/hreflang/indexability and monitor Search Console;
  no price/order flow is enabled unless a separate commerce authorization exists.

## 3. Rollback detail

| Trigger                                       | Rollback action                                                                                     |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Wrong canonical / hreflang in production      | Revert metadata service + route registration; allowlist/canonical hotfix; resubmit sitemap          |
| Accidental indexation before authorization    | Restore `noindex` meta + `X-Robots-Tag`, remove sitemap entries, request removal via Search Console |
| Legal claim issue                             | Revert the offending copy to the internal draft, redeploy, open finding                             |
| Price/availability displayed without approval | Revert to the informational no-price presentation; disable any commerce CTA                         |
| Security issue in preview/production          | Stop the preview process, rotate any exposed secret (none exists in the landing), revert the commit |

## 4. What is explicitly NOT done in MC-18

- No route registration, no production build integration, no metadata emission,
  no sitemap/robots change, no Search Console action, no release authorization
  record, no deployment, no publication.
- No segment pages, no enquiry flows, no lead capture, no installer registration
  (MC-19 scope; `MC19_STARTED = false`).
- The current source already lives under `src/app/marea-landing/`, but that is an
  implementation location, not a mounted public route; nothing in MC-18 mounts
  it.

## 5. Observed evidence of the blocked starting point

| Fact                   | Observed on 2026-11-03                                                |
| ---------------------- | --------------------------------------------------------------------- |
| HEAD                   | `6002c49f898e755154c1b65c97781177719ce11c`                            |
| Publication gates      | `publishable: false`; 10 blocking `GATE-*` ids recorded               |
| SEO activation         | all emission flags `false`; `authorization: null`                     |
| Release gates          | 13 gates / 0 closed / 24 documents / 0 executed                       |
| Claims                 | 42 catalogued / 0 public-authorized                                   |
| Production route files | unchanged; no MAREA reference (MC18-28 PASS)                          |
| Sitemap                | no static sitemap file; no MAREA entry added (MC18-29 PASS)           |
| Production bundle      | zero landing bytes (MC18-33 PASS)                                     |
| Preview                | loopback only, noindex; HTTP probe verified                           |
| Tests                  | `tsc` exit 0; unit 45/45; validator 55/60 (pending artefacts), exit 1 |

## 6. Known limitations / non-claims

- This is a **plan**, not an executed integration. It does not authorize anything.
- It does not define final public copy, prices, legal identity, claims wording or
  privacy text; those are external approvals, not engineering tasks.
- It does not promise that all gates can be closed; several may remain blocked
  indefinitely.
- It does not include a public-hosting or deployment design for the preview; the
  preview must never be publicly hosted.
- The exact production sitemap implementation is owned by the production SEO
  code; this plan states requirements, not a verified implementation.
- The QA commands listed are the repository's verified commands; they are not a
  guarantee that the future release will pass them.
- The validator is currently 55/60; the plan requires a green run before release.
- No independent audit has reviewed this plan; the final milestone verdict
  belongs to the independent auditor. This document does not claim MC18 PASS and
  does not record merge, deployment or publication.
