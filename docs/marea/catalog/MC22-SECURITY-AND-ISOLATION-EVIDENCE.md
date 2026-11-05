# MC-22 — Security and isolation evidence (batch 3: DISPLAY, PILOT, FLEET)

Milestone: MC-22/36. Branch `feature/marea-mc22-display-pilot-fleet-catalog`, HEAD
`1dc9aa0d85d418709cfaccd41fe1f2335462c672`. This document records the isolation contract
and the executed proof for the nine-family internal catalogue. It is not a security
certification and clears no legal gate.

## 1. Scope of this milestone (E/F hardening)

The validator, guards, adversarial suite, Playwright suite, `package.json` scripts and this
evidence document were hardened. The generator, projection, identity and content files were
produced by the C/D milestone and are out of this task's write scope.

## 2. Isolation invariants (mechanism → file → proving check)

| # | Invariant | Mechanism | File | Proof |
| --- | --- | --- | --- | --- |
| I-1 | Catalogue renders only under an internal namespace | `CATALOG_PREVIEW_NAMESPACE = 'internal/catalog'` | `src/app/marea-catalog/models/catalog-identity.ts` | MC20-23 / MC21-10: 18 routes, all under `internal/catalog` or `en/internal/catalog` |
| I-2 | Fail-closed identity flags | every identity hard-codes `routeStatus: PROPOSED_INTERNAL_NOT_DEPLOYABLE`, `publicRouteRegistered:false`, `publicationAuthorized:false`, `indexationAuthorized:false`, `sitemapEligible:false` | same file | MC20-24 / MC21-09 |
| I-3 | Never prerendered | every preview route `renderMode: 'Server'` | `catalog-identity.ts`, `preview/landing/app.routes.server.ts` | MC20-23 / MC21-10 |
| I-4 | No production route or entry reaches the catalogue | no import from `src/main.ts` / `app.routes*` / `server.ts` | `src/app/app.routes.ts`, `src/server.ts` | MC20-29 / MC21-09 (86 production modules, 0 reach) |
| I-5 | No catalogue bytes in the public bundle | separate Angular project `marea-landing-preview` | `angular.json` | `npm run build` + bundle grep (168 files, 0 identifiers) |
| I-6 | Loopback-only preview host | `127.0.0.1` bind, Host allowlist | `preview/landing/server.ts` | MC20-25 / MC21-10 |
| I-7 | Non-indexable responses | `X-Robots-Tag: noindex,nofollow,noarchive` | `preview/landing/server.ts` | Playwright metadata assertions |
| I-8 | No form, storage or lead capture | CSP `form-action 'none'`; fail-closed commercial adapter | `data/catalog-domain.ts` | MC20-26; E2E form count = 0 |
| I-9 | Sitemap/robots untouched | no catalogue path emitted | `src/server.ts`, `public/` | MC20-35; 0 references |

## 3. Executed proof (measured, not narrated)

All commands were run on this checkout and their real exit codes are recorded.

| Command | Result |
| --- | --- |
| `node scripts/build-mc20-catalog-data.mjs --check` | exit 0 — "MC-20 catalogue data is up to date (3 generated files)" |
| `npm run test:mc22` (validator) | exit 0 — **57/57 PASS** |
| `npm run test:mc22:unit` | exit 0 — **55 tests, 55 pass, 0 fail** (39 prior + 16 new adversarial) |
| `npm run test:mc22:e2e` | exit 0 — **84 passed** (18 routes × SSR/parity/axe/keyboard/responsive) |
| `npm run build` | exit 0 — 168 browser files (47 `.js`), 96 prerendered public routes |
| `npm run format:check` | exit 0 — "All matched files use Prettier code style!" |

### 3.1 Bundle-grep markers (production contamination = 0)

Over `dist/embarcarte/browser/*.js` (47 files), each of the following markers matched **0**
files:

`internal/catalog`, `data-marea-catalog`, `marea-catalog-page`, `WEATHER-STANDARD`,
`SENSE-WIND`, `WATCH-CORE`, `DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL`, `PILOT-COASTAL`,
`PILOT-SAIL`, `PILOT-PRO`, `FLEET-START`, `FLEET-BUSINESS`, `FLEET-ENTERPRISE`,
`mareaFamilyDisplay`, `mareaFamilyPilot`, `mareaFamilyFleet`.

### 3.2 Public route table and sitemap (unchanged)

- `src/app/app.routes.ts`, `src/app/app.routes.server.ts`: 0 references to `internal/catalog`,
  `marea-catalog`, `marea/display`, `marea/pilot` or `marea/fleet` (MC21-09, MC20-28).
- `public/` (robots.txt, sitemap): 0 `marea` references; MC20-35 passes.
- Reserved public paths `/marea/display`, `/marea/pilot`, `/marea/fleet` (+ `/en/...`) are not
  registered, not prerendered, and return 404 from the preview (Playwright).

### 3.3 Ten governance gates preserved verbatim

The ten governance statements are preserved verbatim in four places and proven by MC21-08,
MC20-36 and the unit suite's gate-weakening mutation:

`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `MAREA_PUBLIC_USE = NO_GO`,
`SOURCE_IP_CLEARANCE = NOT_CLEARED`, `LICENSING_RIGHTS_GRANTED = false`,
`PRICE_APPROVED = NONE`, `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`,
`PUBLICATION_AUTHORIZED = false`, `INDEXATION_AUTHORIZED = false`,
`PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`, `GATE-PRIVACY-DPA-DPIA = BLOCKED`.

## 4. Validator hardening (what changed)

- The family scope is now **derived from the projection** (`CATALOG_SCOPE_FAMILY_IDS`), never a
  hand list, and every family loop iterates all nine families. MC20-01 asserts set-equality with
  the canonical `product-families.json` (9 families, no missing, no extra, no duplicate); MC20-04
  asserts all 26 canonical editions are present (none dropped).
- MC22-01 cross-checks the canonical release gates (13, none `CLOSED`), the claims summary
  (`publicAuthorized === 0`) and the presence of all nine product definitions — closing the
  previously dead `canonical.gates`, `canonical.claims` and `allCanonicalDefinitions` loads.
- MC22-02/03 (DISPLAY), MC22-04/05 (PILOT), MC22-06/07 (FLEET) prove the batch-3 cautions against
  the source JSON (`product-definitions.batch-02/03.json`) **and** against the rendered content
  strings, independent of the generated projection.
- MC20-30 bundle-grep markers and MC20-34 public-route probes now cover DISPLAY/PILOT/FLEET
  edition ids and slugs.
- Renaming debt (recorded): MC21-02/03 titles were generalised from "SENSE/WATCH/WEATHER" to
  "every family"; MC20-15 and the pass messages were updated from "six" to "nine".

## 5. Guard hardening (`scripts/mc20-catalog-guards.mjs`)

New prohibited-claim families, all negation-aware (`NEGATABLE`) with the leading-particle fix in
`isNegatedClause` so "sin supervisión" (a claim) is rejected while "no opera sin supervisión"
(honest) is accepted:

- **DISPLAY** — `display-dimension`, `display-resolution`, `display-brightness`,
  `display-ingress`, `display-power` (plus the existing `ip-rating`).
- **PILOT** — `pilot-certified-autopilot`, `pilot-autonomous-navigation`, `pilot-unsupervised`,
  `pilot-safety-critical-reliability`, `pilot-regulatory-approval`, `pilot-helm-verified`.
- **FLEET** — `fleet-availability-percentage`, `fleet-guaranteed-availability`,
  `fleet-hardware-included`, `fleet-deployed-customer`, `fleet-service-contract`,
  `fleet-commercial-package`, `fleet-security-certification` (plus the existing `sla-claim`).

Corrections for honest batch-3 copy (no existing check weakened):
`sea-trial` now matches a completion claim only (and is negatable); `checkout` excludes the
disclaimed noun "checkout item"; `CLAUSE_NEGATION` gained `nunca`/`jamás`; `NEGATION_ES` gained
`ningún/ninguna/nadie/tampoco`; `LOCALE_INVARIANT` gained the mixed-case edition names
`PILOT (Coastal|Sail|Pro)`, `FLEET (Start|Business|Enterprise)`, `DISPLAY 7`, `DISPLAY Large` and
`Roles`. Provider-name leakage guards are unchanged (the eight MC-21 mandated providers remain
enforced by the unit suite).

## 6. Adversarial suite

16 new unit mutations are each proven rejected (55 tests total, 0 skipped, 0 weakened): invented
dimension, invented IP/environmental rating, invented resolution/brightness/power, invented SLA,
autonomous-navigation, unsupervised ("sin supervisión"), certified autopilot, guaranteed
reliability, regulatory approval, verified steering integration, named customer, included
hardware, security certification, commercial package, named supplier, weakened governance gate,
hardcoded six-family list, dropped first-row edition, missing batch-3 locale, plus negative
controls proving honest batch-3 negations remain accepted.

## 7. Limits of this evidence

- The Windows/Dsh environment confines nothing here by construction; isolation is achieved by the
  route table, project separation and reachability. A future accidental production import would be
  caught by the bundle-grep checks, not prevented at compile time.
- The claim guard is heuristic and rejects enumerated families plus tested variants, not every
  paraphrase. Residual risk R-06 remains.
- Manual WCAG 2.2 AA and assistive-technology review remain NOT_RUN (inherited debt).
