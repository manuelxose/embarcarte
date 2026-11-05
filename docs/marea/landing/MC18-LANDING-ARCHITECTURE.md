# MC-18 — Landing architecture (D02)

| Field       | Value                                                                                                           |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| Deliverable | D02 `MC18-LANDING-ARCHITECTURE.md`                                                                              |
| Milestone   | MC-18/36 — internal MAREA corporate landing (EMBARCARTE)                                                        |
| Owner       | docs-a (documentation owner, documents group A)                                                                 |
| Date        | 2026-11-03                                                                                                      |
| Status      | `INTERNAL_IMPLEMENTED` — architecture observed in the working tree and typechecked; **not a milestone verdict** |
| Publication | `NOT_AUTHORIZED`                                                                                                |

This document describes the real component architecture of the MC-18 landing: the shell, the
ten sections, the shared content contract, the generated domain adapter, the models, the
isolated SSR preview application and why no production import exists. All paths below were
read in this worktree on 2026-11-03.

## 1. Architectural summary

- **One Angular component tree**, locale-aware, rendered at two preview paths
  (`/marea` ES, `/en/marea` EN). There is no duplicated ES/EN page.
- **One content source** (`LANDING_CONTENT`) with typed bilingual blocks and provenance;
  **no second copy source** for English.
- **One domain projection** generated from the canonical MC-16 datasets, consumed through the
  verified MC-17 presentation adapter; the landing adds no product data of its own.
- **One isolated SSR preview application** (`marea-landing-preview`, source `preview/landing`,
  output `dist/marea-landing-preview`, loopback `127.0.0.1:4302`).
- **Zero production reachability**: no production entry point, route file, style, public
  asset or sitemap entry references the landing (see section 8 and D14).

## 2. File map (real paths)

### 2.1 Landing implementation — `src/app/marea-landing/`

| File                                    | Role                                                                                                                                                                                                                                         |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `landing.ts`                            | `MareaLanding` shell component: `marea-theme mode="web-light"` host, skip link, internal banner, header, `<main>` with the ten section components in frozen order, footer. Exposes `locale` input; sets `MareaI18n.locale` in `ngOnChanges`. |
| `components/internal-banner.ts`         | `MareaLandingInternalBanner` — persistent internal/provisional classification banner (`data-landing-internal-banner`), never conditionally removed.                                                                                          |
| `components/landing-header.ts`          | `MareaLandingHeader` — wordmark with "proposed brand, not adopted", in-page navigation, ES↔EN preview switch.                                                                                                                                |
| `components/landing-footer.ts`          | `MareaLandingFooter` — classification, recorded status facts, no-publication gate line, planned identity line. No form, no contact, no commercial action.                                                                                    |
| `components/landing-section.ts`         | `MareaLandingSectionFrame` — semantic `<section>` frame owning anchor id, accessible name and rhythm; content projected.                                                                                                                     |
| `components/landing-sheet-index.ts`     | `MareaLandingSheetIndex` — decorative numbered "sheet" index (01…10) in document order.                                                                                                                                                      |
| `content/content.types.ts`              | Bilingual content contract: `ContentBlock`, `LandingSectionId`, fixed `PUBLICATION_STATUS = 'INTERNAL_DRAFT_NOT_APPROVED'`, `APPROVAL_STATUS = 'NOT_APPROVED'`, section shapes.                                                              |
| `content/content.ts`                    | Locale accessors (`localizedText`, `blockText`), frozen `SECTION_ANCHORS` and `SECTION_ORDER`.                                                                                                                                               |
| `content/evidence.ts`                   | Closed evidence registry referenced by content blocks.                                                                                                                                                                                       |
| `content/landing-content.ts`            | The single bilingual content source (174 blocks → 348 locale records), navigation and brand copy.                                                                                                                                            |
| `data/domain.generated.ts`              | Generated canonical projection of 9 families / 26 editions / 6 bundles / 11 readiness dimensions and recorded status facts.                                                                                                                  |
| `data/landing-domain.ts`                | Adapter: family/bundle summaries from the MC-17 fixtures, fail-closed commercial presentation, derived readiness summary, status facts.                                                                                                      |
| `models/page-identity.ts`               | Frozen route identity from MC-15 (`mareaOverview` / `ENT-HUB-MAREA` / `HUB_OVERVIEW`, preview paths), production route files that must not receive it, preview route table.                                                                  |
| `models/publication-gates.ts`           | Typed publication gate model, 13 MC-14 release gate ids, fail-closed evaluator, recorded MC-18 evaluation.                                                                                                                                   |
| `models/seo.ts`                         | SEO planning contract: candidate title/description/canonical/hreflang/OG/Twitter and a `LANDING_RELEASE_AUTHORIZATION = null` lock. Emits nothing live.                                                                                      |
| `sections/section-hero.ts`              | Section 01 hero.                                                                                                                                                                                                                             |
| `sections/section-ecosystem.ts`         | Section 02 five-layer ecosystem.                                                                                                                                                                                                             |
| `sections/section-families.ts`          | Section 03 nine families.                                                                                                                                                                                                                    |
| `sections/section-architecture.ts`      | Section 04 conceptual dependency diagram.                                                                                                                                                                                                    |
| `sections/section-bundles.ts`           | Section 05 six solution concepts.                                                                                                                                                                                                            |
| `sections/section-software-hardware.ts` | Section 06 software/hardware principles.                                                                                                                                                                                                     |
| `sections/section-professionals.ts`     | Section 07 professional segments.                                                                                                                                                                                                            |
| `sections/section-documentation.ts`     | Section 08 documentation index.                                                                                                                                                                                                              |
| `sections/section-availability.ts`      | Section 09 readiness, recorded facts, disabled CTA explanation.                                                                                                                                                                              |
| `sections/section-closing.ts`           | Section 10 closing statements and restriction.                                                                                                                                                                                               |

### 2.2 Isolated preview — `preview/landing/`

| File                   | Role                                                                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `main.ts`              | Browser bootstrap of `PreviewShell` with `previewConfig`.                                                                                                                               |
| `main.server.ts`       | Server bootstrap exporting a `BootstrapContext` bootstrap function.                                                                                                                     |
| `preview-shell.ts`     | Root shell rendering only `<router-outlet />`; landing and locale are route-scoped.                                                                                                     |
| `app.routes.ts`        | Preview routes: `''` and `marea` → ES, `en/marea` → EN, `**` → preview 404.                                                                                                             |
| `app.routes.server.ts` | `RenderMode.Server` per request for both locales and for the 404 route.                                                                                                                 |
| `app.config.ts`        | `provideRouter` + `provideClientHydration`; no HTTP, auth or external service.                                                                                                          |
| `app.config.server.ts` | `provideServerRendering(withRoutes(serverRoutes))` merged over the preview config.                                                                                                      |
| `landing-preview.ts`   | Preview host: reads route data locale, sets title, `<html lang>`, robots/meta and `data-marea-preview`, then renders `<marea-landing>`. Emits no canonical/hreflang/OG/Twitter/JSON-LD. |
| `preview-not-found.ts` | Bilingual preview 404.                                                                                                                                                                  |
| `server.ts`            | Express + `AngularNodeAppEngine`; loopback binding, Host allow-list, security headers, `X-Robots-Tag`, `/__preview/health`, 404 fallback.                                               |
| `styles.css`           | Preview-only global baseline, internal classification strip, reduced-motion rule.                                                                                                       |
| `index.html`           | Preview document: `<base href="/">`, `lang="es-ES"`, noindex, `data-marea-preview`.                                                                                                     |
| `tsconfig.json`        | Preview TypeScript config (extends `../tsconfig.json`; includes landing + design-system sources).                                                                                       |

### 2.3 Build configuration and verification

- `angular.json` adds the additive project `marea-landing-preview` (root `preview/landing`,
  output `dist/marea-landing-preview`, browser `preview/landing/main.ts`, SSR entry
  `preview/landing/server.ts`, preview-only styles). The `embarcarte` and
  `marea-design-system-catalogue` projects are untouched (D14).
- `package.json` adds nine `*:landing*` scripts; dependencies are unchanged (D14).
- `scripts/build-marea-landing-data.mjs` generates the `docs/marea/landing/data/*.json`
  contracts; `scripts/check-marea-landing.mjs` is the 60-check validator.

## 3. Content contract

Defined by `content/content.types.ts`:

- `LandingSectionId` — the ten frozen ids (`hero`, `ecosystem`, `families`, `architecture`,
  `bundles`, `softwareHardware`, `professionals`, `documentation`, `availability`, `closing`).
- `ContentBlock` — `contentId`, `sectionId`, `sourceType`, `copyClass`, `evidenceIds`,
  `publicationStatus`, `approvalStatus`, bilingual `text`.
- Fixed literals `PUBLICATION_STATUS = 'INTERNAL_DRAFT_NOT_APPROVED'` and
  `APPROVAL_STATUS = 'NOT_APPROVED'`: no build flag, query parameter or environment variable
  can promote a block, because the type allows only the literal values.
- Source types: `INTERNAL_DOCUMENT`, `CANONICAL_DOMAIN_DATA`, `RELEASE_GATE_RECORD`,
  `AUTHORED_DRAFT`; copy classes: `INTERNAL_EVIDENCED`, `PROPOSED_INTENT`,
  `CONSTRAINT_STATEMENT`, `NAVIGATIONAL`.
- Section shapes add `LandingFamilyCopy` (summary + non-empty limitations),
  `LandingBundleCopy` (summary + non-empty constraints), architecture nodes/links
  (`CONCEPTUAL_DEPENDENCY` only), readiness dimension copy and brand/navigation entries.

The validator verifies bilingual parity, unique ids and resolved evidence
(`MC18-20`, `MC18-21`); the count is 174 blocks / 348 resolved records (D04).

## 4. Data flow

```text
canonical MC-16 datasets (docs/marea/commerce-data/data/*.json)
        │  node scripts/build-marea-landing-data.mjs
        ▼
docs/marea/landing/data/*.json  (contracts + provenance envelopes)
        │  generator (deterministic, --check mode)
        ▼
src/app/marea-landing/data/domain.generated.ts
        │
        ├── landing-domain.ts ── MC-17 fixtures (marea-fixtures.generated.ts)
        │                        + commerce-presentation.adapter.ts
        ▼
sections/*.ts  ── LANDING_CONTENT (src/app/marea-landing/content/landing-content.ts)
        ▼
landing.ts (shell)
        ▼
preview/landing/* (isolated SSR app)  ──  NOTHING in production imports this chain
```

Rules enforced by construction and by the validator:

- The landing **does not duplicate** the product database; `product-family-presentation.json`
  and `bundle-presentation.json` are read-only projections of canonical MC-16 data.
- `LANDING_COMMERCIAL_PRESENTATION` is derived through the MC-17 fail-closed adapter with
  `releaseGateOpen: false`, `buyCtaAllowed: false`, `cartAllowed: false`, `priceVisible:
false`, `availabilityVisible: false`, `ctaState: 'DISABLED'`. The adapter returns
  `purchaseActionAllowed=false`, `cartAllowed=false`, `priceVisible=false`,
  `availabilityVisible=false` even if an upstream flag says otherwise.
- Missing fixture/record returns `null` and the section must not invent a card; the validator
  rejects a missing family/bundle (`MC18-06`, `MC18-07`).

## 5. Locale flow — one `MareaI18n`

1. `preview/landing/landing-preview.ts` resolves the locale from route data
   (`data: { locale: 'es' | 'en' }`) and passes `[locale]` to `<marea-landing>`.
2. `MareaLanding.ngOnChanges()` writes that value into the design-system
   `MareaI18n.locale` signal **before** projected children render.
3. `<marea-theme [locale]>` propagates the same locale; every section and component reads
   `inject(MareaI18n).locale()` (or the local computed `locale()` derived from it).
4. There is no second locale state, no `navigator.language` branch and no client-only locale
   switch. The header's ES/EN control links to the other **preview path** served by the same
   loopback server (`/marea` ↔ `/en/marea`).
5. Server and client resolve the same locale from the same route data, so SSR and hydration
   agree; the preview host also writes `<html lang="es-ES"|"en">`.

## 6. SSR and hydration design (summary; evidence in D08)

- The preview app uses `AngularNodeAppEngine` behind Express, with per-request
  `RenderMode.Server` for `/marea`, `/en/marea` and the 404 route.
- `PreviewShell` renders only the router outlet; `LandingPreview` owns title, meta, `lang` and
  the internal marker, so no document-level state is duplicated.
- `provideClientHydration()` is enabled; the landing tree uses no non-deterministic values
  (no `Math.random`, no `Date.now`, no `new Date`, no `window`/`document` in the landing
  folder — verified by source scan). Browser globals appear only in the preview host's
  `DOCUMENT` injection.
- Measured smoke probes are recorded in D08. The QA-owned hydration dataset
  `docs/marea/landing/data/ssr-hydration-evidence.json` was created during the authoring session
  (Chromium, loopback, development configuration) and validator `MC18-37` now passes; D08 cites
  its measured values without re-measuring them.

## 7. Isolation design

| Layer                | Control                                                                                                                                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Angular project      | Separate project `marea-landing-preview`; separate `tsconfig`, bootstrap, index, styles and server entry.                                                                                                                                                       |
| Network              | `server.ts` binds `127.0.0.1:4302`; `ALLOWED_HOSTS` rejects non-loopback `Host` headers with 403; `Cache-Control: no-store`; `Referrer-Policy: no-referrer`; `X-Frame-Options: DENY`; CSP with `form-action 'none'`, `connect-src 'self'`, `object-src 'none'`. |
| Indexation           | `X-Robots-Tag: noindex, nofollow, noarchive` on every response plus `<meta name="robots">` and `data-marea-preview="internal-not-published"`.                                                                                                                   |
| Data                 | No HTTP client, auth, cookie, analytics, form or telemetry import; no personal or vessel data.                                                                                                                                                                  |
| Publication metadata | No canonical, hreflang, Open Graph, Twitter card or JSON-LD is emitted; the SEO contract is planning-only with a `null` release authorisation.                                                                                                                  |
| Production           | Production entries, routes, `src/styles.scss`, `public/` and the MC-17 design system are unchanged against `6002c49` (D14).                                                                                                                                     |

The noindex header is defence in depth, **not** access control; the loopback binding is the
access boundary. No publicly hosted preview is authorised.

## 8. Why no production import exists

- Production entries are `src/main.ts`, `src/main.server.ts`, `src/app/app.routes.ts`,
  `src/server.ts` and `src/app/core/i18n/locale-routes.ts` (also listed in
  `data/preview-isolation.json`). A recursive source scan of `src/` excluding
  `src/app/marea-landing/**` and `src/app/marea-design-system/**` finds **no** reference to
  `marea-landing`.
- `src/app/marea-landing/models/page-identity.ts` declares the production route files that
  must never receive the proposed route and the preview-only `LANDING_ROUTE_TABLE`; only
  `preview/landing/` imports it.
- `angular.json` `embarcarte` project is byte-identical to the base (`JSON.stringify`
  comparison against `git show 6002c49:angular.json` → `true`), so the production build graph
  cannot reach `preview/landing` or `src/app/marea-landing`.
- Validator checks `MC18-28`, `MC18-29`, `MC18-30`, `MC18-31`, `MC18-32`, `MC18-33`,
  `MC18-38`, `MC18-47` and `MC18-60` cover route/table/sitemap/navigation/assets/bundle/
  external-service isolation; all passed in the final run (55/60; the 5 failures are pending
  artefacts from other authors: missing documents, performance/legacy/review datasets and the
  delivery record — see D08).

## 9. Component reuse (MC-17, not forked)

From `docs/marea/landing/data/design-system-dependencies.json` (18 direct imports, all under
`src/app/marea-design-system/`):

| Module                                           | Selector / type                  | Used by                                  |
| ------------------------------------------------ | -------------------------------- | ---------------------------------------- |
| `theme/marea-theme.ts`                           | `marea-theme`                    | shell                                    |
| `components/foundation/marea-container.ts`       | `marea-container`                | section frame, footer                    |
| `components/foundation/marea-notice.ts`          | `marea-notice`                   | banner + nine sections                   |
| `components/foundation/marea-section-heading.ts` | `marea-section-heading`          | nine sections                            |
| `components/foundation/marea-stack.ts`           | `marea-stack`                    | footer                                   |
| `components/foundation/marea-status-badge.ts`    | `span[marea-status-badge]`       | hero, bundles, availability              |
| `components/foundation/marea-surface.ts`         | `marea-surface`                  | hero + seven sections                    |
| `components/foundation/marea-text.ts`            | `[marea-text]`                   | all components/sections                  |
| `components/structured/marea-responsive-nav.ts`  | `marea-responsive-nav`           | header                                   |
| `components/commerce/marea-family-card.ts`       | `marea-family-card`              | families                                 |
| `components/commerce/marea-bundle-components.ts` | `marea-bundle-components`        | bundles                                  |
| `components/commerce/marea-bundle-exclusions.ts` | `marea-bundle-exclusions`        | bundles                                  |
| `components/commerce/marea-readiness-panel.ts`   | `marea-readiness-panel`          | availability                             |
| `components/commerce/marea-commercial-cta.ts`    | `marea-commercial-cta`           | availability (disabled, no control)      |
| `core/i18n.ts`                                   | `MareaI18n` / `injectMareaI18n`  | all                                      |
| `core/types.ts`                                  | types                            | header, content, domain, shell, sections |
| `data/commerce-presentation.adapter.ts`          | `deriveCommercialPresentation`   | domain adapter                           |
| `data/fixtures/marea-fixtures.generated.ts`      | `MAREA_FIXTURE_FAMILIES/BUNDLES` | domain adapter                           |

`parallelComponentLibrary: false` in the dependency dataset. The four non-component modules
(`core/i18n`, `core/types`, adapter, fixtures) are explicitly allowed as pure data/type
contracts by the validator (`MC18-35`).

## 10. Known limitations / non-claims

- This is an implementation description, not an independent audit and not a milestone
  verdict. It does not assert PASS.
- The implementation is **uncommitted**; the described state is the 2026-11-03 working tree.
  A transient generator drift in `MC18-41` was observed while another author was editing
  sections/components; it is resolved in the final validator run (`MC18-41` PASS).
- Hydration evidence is QA-owned and now present (`docs/marea/landing/data/ssr-hydration-evidence.json`); D08 cites its measured values. No docs-a hydration measurement is claimed here.
- Accessibility, responsive, visual-regression and performance evidence datasets were arriving
  during authoring; their evidence documents (D10–D12) were still missing, so this document
  makes no axe, contrast, layout or performance claim.
- The content is internal draft. Every sentence is
  `INTERNAL_DRAFT_NOT_APPROVED` / `NOT_APPROVED`; nothing is approved public copy.
- `package.json`'s `format`/`format:check` no longer references the nonexistent
  `scripts/marea-landing-evidence.mjs` (Lead correction). `npm run format:check` still exits 1
  on 10 real files in the implementation/preview/scripts scope, all owned by other authors;
  docs-a's seven documents pass `prettier --check`. No implementation file was reformatted here.
- No canonical, hreflang, Open Graph, Twitter, JSON-LD, sitemap or public route exists for the
  landing. Any future publication requires the gates in D07 plus external approvals.
