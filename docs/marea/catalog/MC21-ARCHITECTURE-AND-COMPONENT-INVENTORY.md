# MC-21 — Architecture and component inventory

## 1. Placement (one tree, six families)

```text
src/app/marea-catalog/            shared six-family catalogue module (never imported by the public app)
  catalog-page.ts                 one locale-aware page shell for six families
  components/catalog-heading.ts   section heading with a stable id
  content/                        typed bilingual contracts (shared, nav, hub, ais, sense, watch, weather)
  data/catalog.generated.ts       generated MC-16 projection (do not edit by hand)
  data/catalog-domain.ts          canonical → MC-17 presentation adapter
  models/catalog-identity.ts      frozen family identity + 12 preview routes
  models/catalog-view.ts          heading id and frozen section constants
  sections/                       eleven section components (hero + ten numbered sections)
preview/landing/                  isolated loopback SSR preview (MC-18 host, extended)
  catalog-preview.ts              preview host: noindex metadata only
  app.routes.ts / .server.ts      twelve internal catalogue routes (derived from CATALOG_PREVIEW_ROUTES)
  server.ts                       Host allowlist, loopback bind, noindex, CSP
scripts/
  build-mc20-catalog-data.mjs     deterministic projection generator (`--check`)
  check-mc20-catalog.mjs          50-check validator (MC20-01..40 + MC21-01..10)
  check-mc20-catalog.test.mjs     33 unit and adversarial tests
  mc20-catalog-guards.mjs         pure guards (claim/provenance/parity/reach/scope/provider)
e2e/catalog/catalog.spec.ts       60 Playwright checks (12 routes)
playwright.catalog.config.ts      isolated E2E configuration (port 4302)
```

## 2. Data flow

1. `build-mc20-catalog-data.mjs` reads MC-16/MC-15/MC-14 + product-definition batches 01/02/03,
   asserts invariants and emits `catalog.generated.ts` plus two JSON datasets.
2. `catalog-domain.ts` maps canonical codes to MC-17 presentation contracts (readiness summary,
   edition summaries, family cards, fail-closed commercial presentation).
3. `content/*` supplies only editorial copy, evidence class and source references. No identity,
   readiness, edition, bundle or commercial state is authored there.
4. `catalog-page.ts` renders the six families through one component tree.
5. `preview/landing/catalog-preview.ts` adds non-indexable metadata; no public route, canonical,
   hreflang, social card or JSON-LD is emitted.

## 3. Section inventory (frozen order)

| # | Selector | Canonical source |
| - | --- | --- |
| 00 | `marea-catalog-hero` | MC-05/06/07 identity + MC-16 status |
| 01 | `marea-catalog-overview` | MC-16 + MC-15 |
| 02 | `marea-catalog-capabilities` | final functionality/integration |
| 03 | `marea-catalog-specifications` | MC-16 readiness + integration |
| 04 | `marea-catalog-composition` | included/optional items |
| 05 | `marea-catalog-editions` | MC-16 editions + MC-17 card |
| 06 | `marea-catalog-limitations` | restrictions, MC-02, MC-11 |
| 07 | `marea-catalog-ecosystem` | MC-16 bundle composition |
| 08 | `marea-catalog-readiness` | MC-16 readiness + MC-14 gates |
| 09 | `marea-catalog-documentation` | documents + provenance |
| 10 | `marea-catalog-closing` | governance + next milestone |

## 4. MC-17 reuse (no fork)

Reused MC-17 components: `marea-spec-table`, `marea-definition-list`, `marea-feature-comparison`,
`marea-readiness-panel`, `marea-edition-card`, `marea-family-card`, `marea-compatibility-notice`,
`marea-documentation-panel`, `marea-commercial-cta`, `marea-status-badge`, `marea-notice`,
`marea-surface`, `marea-grid`, `marea-text`, `marea-container`, `marea-responsive-nav`,
`marea-theme`, `marea-section-heading`, plus `marea-landing-section`/`marea-landing-sheet-index`
from the MC-18 landing. One new presentation component (`marea-catalog-heading`) holds no design
token of its own. The design-system directory is byte-identical to the base (`MC20-21` asserts it);
cross-family cards read `MAREA_FIXTURE_FAMILIES` (MC-17 fixture generated from canonical MC-16 data).

## 5. Wiring points (six-family extension)

- Generator `SCOPE_FAMILY_IDS` = NAV, HUB, AIS, SENSE, WATCH, WEATHER; multi-batch reads; edition
  bound relaxed for SENSE (8).
- `content/index.ts` `CATALOG_CONTENT` map extended to six; `content/shared.ts` `familyNav` and
  `statusVocabulary` (`HARDWARE_SERVICE`, `HARDWARE_MODULE`, `HARDWARE_KIT`, `NOT_VERIFIED`,
  `LOCAL_ALARM_INDEPENDENT`, `LOCAL_SAFETY_INDEPENDENT`) extended.
- `models/catalog-identity.ts` `CATALOG_IDENTITIES` extended to six; `CATALOG_PREVIEW_ROUTES`
  auto-derives 12 routes.
- `catalog-view.ts` `CATALOG_PAGE_FAMILIES` extended to six.
- `preview/landing/catalog-preview.ts` fallback family updated; `server.ts` log string updated.
- `e2e/catalog/catalog.spec.ts` `FAMILIES` extended to six; health endpoint asserts 12 paths.

## 6. Hardening

- Loopback bind `127.0.0.1`; Host allowlist; `X-Robots-Tag: noindex, nofollow, noarchive`;
  `Cache-Control: no-store`; CSP with `form-action 'none'`; no analytics, no cookie, no form.
- Twelve routes render per request (`RenderMode.Server`); nothing is prerendered.
- The production import graph contains zero catalogue modules and the production bundle contains
  zero catalogue identifiers (`MC20-29/30`; e2e and bundle grep re-verified).
