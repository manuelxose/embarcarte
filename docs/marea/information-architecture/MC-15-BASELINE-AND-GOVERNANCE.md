# MC-15 — Baseline and governance

Status: INTERNAL_PLANNING_ONLY
Publication: NOT_AUTHORIZED
Live SEO migration: NOT_AUTHORIZED
Deployment: NOT_AUTHORIZED
MC16_STARTED: false

## 1. Purpose and boundary

MC-15/36 defines and validates the internal bilingual information architecture,
route registry, URL-preservation rules, redirect plan, canonical/hreflang policy,
indexation contract, structured-data governance, bilingual metadata contract,
navigation graph and publication gates for EMBARCARTE and the proposed MAREA
portfolio.

This milestone **does not**:

- publish, deploy or merge anything;
- change live routes, redirects, sitemap, robots.txt, metadata, checkout, prices,
  product data or customer-facing copy;
- submit a sitemap to any search engine;
- contact customers, providers or partners;
- authorize MAREA public brand use, product sale or commercial claims;
- start MC-16.

A route defined in this package is a planning record, not a working URL. A route
marked `routeDefined: true` is not `implementationReady`, `publicationAuthorized`,
`indexationAuthorized` or `commerciallyTransactable`.

## 2. Verified predecessor (git preflight)

Preflight performed on 2026-11-02 before any MC-15 authoring:

| Check | Result |
|---|---|
| Working branch at preflight | `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Expected MC-14 HEAD | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Local HEAD | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Remote HEAD (`git ls-remote origin`) | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Merge base with predecessor remote | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Working tree | clean (`git status --porcelain` empty) |
| PR #21 state | OPEN, draft, MERGEABLE, `mergedAt: null` |
| PR #21 head | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| PR #21 base | `feature/marea-mc13-financial-model-cashflow-break-even` |
| MC-14 frozen audited candidate | `7f31db83797f9423bbd9d0b60764f8db22fe8bbf` |
| MC-15 branch | `feature/marea-mc15-bilingual-ia-seo-migration`, created from verified MC-14 HEAD |
| MC-15 base SHA | `e0be1e457456a401a529e1912770e07ed9a863e4` |

No reset, force-push, rebase or history rewrite was performed. No unexpected
commits were found between the frozen audited candidate and the MC-14 HEAD; the
intervening commits are documentation/record commits (`2626853`, `e0be1e4`).

Predecessor status is frozen and must not be modified:

```text
MC14_VERDICT = PARTIAL
MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE = PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE
MC14_EXTERNAL_LEGAL_CLEARANCE = NOT_GRANTED
MC14_CERTIFICATION_APPROVAL = NONE
MC14_COMMERCIAL_CLAIMS_PUBLICATION = NOT_AUTHORIZED
```

## 3. Inherited commercial restrictions (non-negotiable)

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
CUSTOMER_WTP_VALIDATED = false
CUSTOMER_EVIDENCE = NONE
PILOT_SAFETY_GATE = BLOCKED
AIS_TRANSMISSION_OFFERED = false
FLEET_DEFAULT_HARDWARE = false
CE_MARKING_CLAIM = PROHIBITED
NMEA2000_CERTIFIED = false
TESTED_COMPATIBILITY_ROWS = 0
MC14_COMMERCIAL_CLAIMS_PUBLICATION = NOT_AUTHORIZED
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
```

These restrictions bind every proposed page title, meta description, navigation
entry, breadcrumb, JSON-LD node, sitemap membership, redirect decision and CTA.

## 4. Verified current architecture (baseline for non-regression)

- Angular 21 SSR with prerender and hydration.
- 21 typed semantic `RouteId`s in `src/app/core/i18n/locale-routes.ts`.
- Spanish public URLs unprefixed; English public URLs under `/en`.
- One shared component per page for both locales; no duplicate ES/EN components.
- `localizedUrl()`, `matchRoute()` and `alternateUrl()` resolve URLs from the
  registry; `pageSeo()` derives canonical, alternates and home-only `x-default`.
- `SeoService` manages title, description, robots, canonical, Open Graph, Twitter,
  hreflang, language and JSON-LD.
- The SSR server generates `/sitemap.xml` from prerendered output plus active shop
  products and excludes private surfaces.
- Private routes (`/carrito`, `/acceso`, `/cuenta`, order detail, `/admin`) are
  `noindex` and excluded from the sitemap.
- Legacy redirects are preserved: `/open-marine`, `/productos`, `/productos/:slug`
  (301 to `/tecnologia` equivalents).
- 12 prerendered RouteIds × 2 locales = 24 URLs; 6 technology details × 2 = 12;
  30 guide details × 2 = 60; therefore 96 prerendered sitemap URLs, plus
  `/tienda` and `/en/shop` = 98 without shop products.
- The inherited SEO test seeds 2 active shop products, one with complete English
  text, producing 3 product URLs, so the inherited test observation of **101**
  sitemap URLs is exactly `96 + 2 + 3`. It is a local-fixture observation, not a
  production count and not Google indexation evidence.

Any difference in the future must be explained by dynamic data, prerender output
or actual content; `101` must never be hardcoded as a production expectation.

## 5. Evidence policy

Allowed evidence classes:

- `REPOSITORY_VERIFIED` — inspected in this working tree at the frozen base.
- `LOCAL_SSR_VERIFIED` — observed from an isolated local SSR run with disposable
  data.
- `PUBLIC_OBSERVATION` — read-only public observation; performed on 2026-11-03
  for the sitemap and three representative URLs.
- `SEARCH_CONSOLE_VERIFIED` — real Search Console access now exists: property
  `sc-domain:embarcarte.com`, permission `siteFullUser`, service account
  `guiatv-gsc@guia-tv-8fe3c.iam.gserviceaccount.com`. The addendum captured 24 URL
  inspections and the sitemap status on 2026-11-02. It is a **partial sample**, not
  a full census.
- `ASSUMED` / `UNKNOWN` — explicitly labelled.

Search-engine indexation is `SEARCH_CONSOLE_VERIFIED_PARTIAL`: 16 of 24 inspected
URLs are confirmed indexed, 2 are excluded by noindex, 5 are not recognized and 1
public/indexable URL (`/traslados`) is not indexed. No full coverage count is
claimed, no URL may be labelled `GOOGLE_INDEXED`, and no indexation count may be
invented. Earlier `INDEXATION_UNVERIFIED` statements in this package apply only to
the URLs outside the inspected sample and are superseded by the
`MC15-SEARCH-CONSOLE-EVIDENCE.md` addendum where they conflict.

## 6. Agent execution model

| Role | Responsibility | Write scope |
|---|---|---|
| Lead | git, integration freeze, validator, manifest, report, delivery record | scripts, manifest, D01, D21, D22, execution docs |
| Agent A (`route-architect`) | current route/URL inventory, evidence, preservation | D02, D03, current-* data |
| Agent C/E (`ia-content`) | IA, proposed registry, slugs, metadata, link graph | D04–D06, D11, D12, proposed/slug/metadata/link data |
| Agent B (`seo-migration`) | redirects, canonical/hreflang, indexation, structured data, migration/risk | D07–D10, D15, D16 |
| Agent D (`legal-governance`) | gates, findings remediation, MC-16 handoff | D13, D14, D17 |
| Agent G (`auditor`) | independent audit, mutations, re-verification | D20, review-findings |

Only the Lead performs Git writes. Writers have disjoint file scopes. The Lead
freezes the implementation before assigning the independent auditor. The auditor
does not author the implementation and must independently reconstruct the route
inventory, collisions, redirect invariants, bilingual parity and finding coverage.

## 7. Quality gates for this milestone

Required locally executed checks:

```text
npm run test:ia-seo
npm run test:ia-seo:unit
npm run test:i18n
npm run test:commerce
npm run test:seo
npm run test:backup
npm run test:legal-commercial
npm run test:legal-commercial:unit
npm run test:financial
npm run test:financial:unit
npm run test:economics
npm run test:economics:unit
npm run test:hardware
npm run test:hardware:unit
npm run test:products
npm run test:products:unit
npm run test:bundles
npm run test:bundles:unit
npm run test:brand
npm run test:brand:unit
npm run test:market
npm run test:market:unit
npm run test:customer-research
npm run test:customer-research:unit
npm run test:customer-recovery
npm run test:customer-recovery:unit
npm run format:check
npm run build
npm run test:e2e
npm audit --omit=dev --audit-level=high
git diff --check
```

Results are reported as executed, environment-blocked or not executed; a blocked
or unexecuted gate is never reported as PASS. If `node --test` child-process
spawning is blocked by the Windows harness with `EPERM`, the documented
`--test-isolation=none` alternative is used and disclosed.

The independent auditor runs the validator and its own mutations; CI success is
not proof that any validator ran in CI.

## 8. Inherited residual debt (preserved, not hidden)

MC-13 residual debt remains open:

- F-05 — financial contract/check-ID mapping.
- F-11 — stress-case per-unit metric semantics.
- F-14 — CI missing the financial gate.

MC-14’s four INFORMATIONAL website findings (WEB-031…WEB-034) remain
`NOT_REMEDIATED`. The 34 MC-14 website findings are all `NOT_REMEDIATED`; MC-15
adds a separate planning classification (`PLANNED_NOT_REMEDIATED`) without
closing any finding. A remediation plan is not a remediation.

## 9. Deliverable map

| ID | Deliverable | Owner |
|---|---|---|
| D01 | Baseline and governance | Lead |
| D02 | Current URL and route inventory | route-architect |
| D03 | Existing URL preservation policy | route-architect |
| D04 | Bilingual information architecture | ia-content |
| D05 | Proposed route registry | ia-content |
| D06 | Slug and entity identity governance | ia-content |
| D07 | Redirect and migration map | seo-migration |
| D08 | Canonical and hreflang policy | seo-migration |
| D09 | Sitemap, robots and indexation contract | seo-migration |
| D10 | Structured-data governance | seo-migration |
| D11 | Bilingual SEO metadata contract | ia-content |
| D12 | Navigation, breadcrumb and link graph | ia-content |
| D13 | Legal and commercial publication gates | legal-governance |
| D14 | Website findings remediation plan | legal-governance |
| D15 | Phased SEO migration plan | seo-migration |
| D16 | SEO risk and rollback plan | seo-migration |
| D17 | MC-16 handoff | legal-governance |
| D18 | Machine-readable contracts | authors + Lead manifest |
| D19 | Deterministic validator and adversarial tests | Lead |
| D20 | Independent review | auditor |
| D21 | Spanish executive report | Lead |
| D22 | Final delivery record | Lead |
