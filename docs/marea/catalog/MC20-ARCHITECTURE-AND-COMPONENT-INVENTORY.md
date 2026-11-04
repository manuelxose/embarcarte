# MC-20 — Architecture and component inventory

## 1. Placement

```text
src/app/marea-catalog/            MC-20 catalogue module (never imported by the public app)
  catalog-page.ts                 one locale-aware page shell for the three families
  components/catalog-heading.ts   section heading with a stable id
  content/                        typed bilingual contracts (shared, nav, hub, ais)
  data/catalog.generated.ts       generated MC-16 projection (do not edit by hand)
  data/catalog-domain.ts          canonical → MC-17 presentation adapter
  models/catalog-identity.ts      frozen family identity + six preview routes
  models/catalog-view.ts          heading id and frozen section constants
  sections/                       eleven section components (hero + ten numbered sections)
preview/landing/                  isolated loopback SSR preview (MC-18 host, extended)
  catalog-preview.ts              preview host: noindex metadata only
  app.routes.ts                   six internal catalogue routes
  app.routes.server.ts            six Server-rendered routes + 404 fallback
  server.ts                       Host allowlist, loopback bind, noindex, CSP
scripts/
  build-mc20-catalog-data.mjs     deterministic projection generator (`--check`)
  check-mc20-catalog.mjs          40-check validator with evidence record
  check-mc20-catalog.test.mjs     20 unit and adversarial tests
  mc20-catalog-guards.mjs         pure guards shared by validator and tests
e2e/catalog/catalog.spec.ts       35 Playwright checks
playwright.catalog.config.ts      isolated E2E configuration (port 4302)
```

## 2. Data flow

1. `build-mc20-catalog-data.mjs` reads MC-16/MC-15/MC-14/MC-05, asserts invariants and emits
   `catalog.generated.ts` plus two JSON datasets.
2. `catalog-domain.ts` maps canonical codes to MC-17 presentation contracts:
   readiness summary, edition summaries, family cards, restrictions and the fail-closed
   commercial presentation.
3. `content/*` supplies only editorial copy, evidence class and source references. No identity,
   readiness, edition, bundle or commercial state is authored there.
4. `catalog-page.ts` renders the three families through one component tree; sections read the
   canonical record and the content contract.
5. `preview/landing/catalog-preview.ts` adds non-indexable metadata and renders the page. No
   public route, canonical, hreflang, social card or JSON-LD is emitted.

## 3. Section inventory (frozen order)

| # | Selector | Content | Canonical source |
| - | --- | --- | --- |
| 00 | `marea-catalog-hero` | title, lead, mandatory notice, highlights, status badges | MC-05 identity + MC-16 status |
| 01 | `marea-catalog-overview` | identity definition list, route, gate count, overview notes | MC-16 + MC-15 |
| 02 | `marea-catalog-capabilities` | capability cards with evidence class and refs | MC-05 final functionality/integration |
| 03 | `marea-catalog-specifications` | 11 readiness rows, interface table, compatibility notice | MC-16 readiness + MC-05 integration |
| 04 | `marea-catalog-composition` | hardware, software, included, excluded | MC-05 included/optional items |
| 05 | `marea-catalog-editions` | canonical feature matrix + edition cards + note | MC-16 editions + MC-17 card |
| 06 | `marea-catalog-limitations` | limitation/prohibition cards + compatibility notice | MC-05 restrictions, MC-02, MC-11 |
| 07 | `marea-catalog-ecosystem` | bundle relationships + cross-family cards | MC-16 bundle composition |
| 08 | `marea-catalog-readiness` | derived readiness panel, facts, fail-closed CTA | MC-16 readiness + MC-14 gates |
| 09 | `marea-catalog-documentation` | document status + canonical provenance | MC-05/MC-11/MC-14/MC-15 documents |
| 10 | `marea-catalog-closing` | governance state + MC-21 boundary | MC-14/MC-16 + registry |

## 4. MC-17 reuse (no fork)

Reused MC-17 components:
`marea-spec-table`, `marea-definition-list`, `marea-feature-comparison`, `marea-readiness-panel`,
`marea-edition-card`, `marea-family-card`, `marea-compatibility-notice`,
`marea-documentation-panel`, `marea-commercial-cta`, `marea-status-badge`, `marea-notice`,
`marea-surface`, `marea-grid`, `marea-text`, `marea-container`, `marea-responsive-nav`,
`marea-theme`, `marea-section-heading`.

Only one new presentation component is introduced (`marea-catalog-heading`, a labelled wrapper),
and it contains no design token, colour or typography definition of its own.

Two additional components come from the MC-18 landing module: `marea-landing-section` and
`marea-landing-sheet-index` provide the editorial section frame and sheet index. The catalogue
therefore depends on `src/app/marea-landing` as a read-only, unmodified module; that module is
byte-identical to the MC-18 base and is covered by the MC-18 regression suites. Cross-family cards
use `MAREA_FIXTURE_FAMILIES`, the MC-17 fixture generated from canonical MC-16 data, so no second
product-text source is introduced.

The design system directory is byte-identical to the MC-18 base (`git diff --name-only 3490c0f -- src/app/marea-design-system` is empty); the validator enforces it.

## 5. Hardening

- Loopback bind `127.0.0.1`; Host allowlist; `X-Robots-Tag: noindex, nofollow, noarchive`;
  `Cache-Control: no-store`; CSP with `form-action 'none'`; no analytics, no cookie, no form.
- The six routes render per request (`RenderMode.Server`); nothing is prerendered.
- The production import graph contains zero catalogue modules (validator check MC20-29) and the
  production bundle contains zero catalogue identifiers (MC20-30).
