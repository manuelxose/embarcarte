# MC-17 — Angular component architecture (D08)

| Field | Value |
|---|---|
| Deliverable | D08 `MC17-ANGULAR-COMPONENT-ARCHITECTURE.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Framework | Angular 21.2.x, standalone APIs, signals |
| Scope | The isolated design-system tree and its internal catalogue. **Not** the production application |
| Registry | `docs/marea/design-system/data/component-registry.json` (49 entries, authority) |

## 1. Actual directory tree

```text
src/app/marea-design-system/
  core/
    types.ts            presentation contracts (190 lines)
    i18n.ts             bilingual copy + locale signal (271 lines)
    ids.ts              deterministic DOM ids (18 lines)
  data/
    commerce-presentation.adapter.ts    fail-closed commercial adapter (105 lines)
    fixtures/marea-fixtures.generated.ts generated synthetic fixtures
  theme/
    marea-theme.ts      <marea-theme> host: mode, context, lang
  tokens/
    marea-design-tokens.source.json     authored token source (682 lines)
    generated/
      marea-tokens.generated.css        generated custom properties (297 lines)
      marea-tokens.generated.ts         generated ids, css-var map, breakpoints
  components/
    foundation/         16 components + marea-icon-paths.ts (glyph data)
    structured/         12 components
    commerce/           12 components
    instrument/          8 components

preview/                       (Angular project marea-design-system-catalogue)
  index.html, main.ts, tsconfig.json, catalogue.css
  catalogue/app/
    catalogue.ts, component-doc.ts, registry.generated.ts
    galleries/{foundation,structured,commerce,instrument,adversarial}.gallery.ts
```

Measured size of the design-system tree: **56 TypeScript files, 6 336 lines**, plus
2 generated/authoring files (`.css`, `.json`). There is no `src/app/marea-design-system/*.module.ts`
and no lazy route for it.

## 2. Framework conventions actually used

| Convention | Evidence |
|---|---|
| Standalone components only | **0 `NgModule`** occurrences in the tree; **0 `standalone:`** flags — components rely on the Angular 21 standalone default and declare only their own `imports` |
| `OnPush` everywhere | **48** `ChangeDetectionStrategy.OnPush` declarations = every templated component (49 registry entries minus the `mareaInput` directive) |
| Signals for state | `input()`, `input.required()` (50 occurrences), `output()`, `computed()`, `signal()`, `viewChildren()`. No `@Input`/`@Output` decorators, no RxJS subject, no store |
| Inline templates and styles | **0 `templateUrl`**, **0 `styleUrl`**; **48** inline `template:` and **48** inline `styles:` blocks. No separate `.html`/`.scss` component files |
| Host metadata on the host element | 48 components declare `data-marea-component` in `host`; `<marea-theme>` declares `data-marea-theme` instead. `class`, `attr.*` and handler bindings are also done in `host` |
| Native elements first | Attribute selectors on real elements: `button[marea-button]`, `a[marea-link]`, `span[marea-status-badge]`, `hr[marea-divider]`, `[marea-text]`, `input[mareaInput], select[mareaInput], textarea[mareaInput]` |
| No effects | **0** `effect()` calls; no code writes signals during template rendering |

No component uses `ChangeDetectorRef`, `NgZone`, `afterNextRender`, `platformBrowser`
or any DOM global. There is no shared mutable store beyond two root-provided
services (`MareaI18n`, `MareaIds`) and the stateless `mareaInput` directive.

## 3. Token delivery

| Fact | Detail |
|---|---|
| Where tokens live | `tokens/generated/marea-tokens.generated.css`, generated from `tokens/marea-design-tokens.source.json` |
| Selector scope | `marea-theme { … }` plus `marea-theme[data-marea-mode='…']` — **no `:root`, no `html`, no `body`** |
| How the catalogue loads them | `angular.json` → project `marea-design-system-catalogue` → `styles: ["preview/catalogue.css", "src/app/marea-design-system/tokens/generated/marea-tokens.generated.css"]` |
| How production loads them | It does not. Production `styles` is still exactly `["src/styles.scss"]` (check `MC17-07` PASS) |
| Runtime-only properties | `--marea-grid-min`, `--marea-stack-gap`, `--marea-inline-gap` are set by component `style` bindings, and the validator whitelists them explicitly |
| Header of the generated file | "Scoped to `<marea-theme>` only: no :root overrides, no production CSS side effects." |

Consequence: importing the design system into any page cannot restyle that page
unless the content is wrapped in `<marea-theme>`. This is the mechanism that lets
the design system live in the same repository as the live site without touching it.

## 4. Theme host contract

`theme/marea-theme.ts` is the outermost contract of every specimen:

| Aspect | Contract |
|---|---|
| Selector | `marea-theme` |
| Inputs | `mode: MareaMode = 'web-light'`, `locale: MareaLocale = 'es'` |
| Host attributes | `data-marea-theme` (marker), `[attr.data-marea-mode]`, `[attr.data-marea-context]`, `[attr.lang]` |
| Derived context | `instrument` if the mode starts with `instrument-`, otherwise `corporate` (computed signal) |
| Locale propagation | `ngOnChanges` sets `i18n.locale` **before children render**, so server markup and hydration agree |
| Rendering | `<ng-content />` only — no routing, no data fetching, no global state, no layout wrapper beyond `display:block` and inherited body typography |
| Accessibility | host gets `lang`, so a Spanish fragment inside an English document is marked; `:host:focus { outline: none }` applies to the container only, never to an interactive child |

## 5. Typed contracts between domain and presentation

`core/types.ts` is the only boundary through which MC-16 concepts enter the design
system. It is deliberately narrower than the MC-16 datasets:

| Group | Types |
|---|---|
| Locale / mode / context | `MareaLocale`, `MareaMode`, `MareaContext` |
| Status | `MareaTone` (6 tones), `MareaDefinitionStatus` (3), `MareaCtaState` (5), `MareaReadinessStatus` (4), `MareaDataStatus` (5), `MareaFreshnessState` (4), `MareaConnectivityState` (4), `MareaSensorState` (5), `MareaInclusion` (6), `MareaDocumentationStatus` (2) |
| Restrictions | `MareaRestrictionKind` (8 gate-derived categories) |
| Entities | `MareaFamilySummary`, `MareaEditionSummary`, `MareaReadinessSummary` + `MareaReadinessDimension`, `MareaBundleSummary` + `MareaBundleLine`/`MareaBundleExclusion`, `MareaEntitlement`, `MareaDocumentationItem` |
| Commercial | `MareaCommercialInput`, `MareaCommercialPresentation`, `MareaBlockedSignal` |
| Instrument | `MareaInstrumentReadout`, `MareaTelemetryItem` |
| Hygiene | `MareaFixtureClass = 'SYNTHETIC_INTERNAL_FIXTURE'` |

Structural guarantee, stated in the file header and enforced by checks: **no price
amount, stock quantity, customer/vessel identifier or certification flag is
representable** through this contract. `MareaCommercialPresentation` fixes
`purchaseActionAllowed`, `cartAllowed`, `priceVisible` and `availabilityVisible` to
`false` as literal types, so a component cannot even type-check a price field.

## 6. SSR-safe patterns

| Risk | How it is avoided | Verified by |
|---|---|---|
| `window` / `document` access | **0 occurrences** in the design-system tree; no `localStorage`, `sessionStorage`, `navigator` | scan of `src/app/marea-design-system/**/*.ts` |
| Non-deterministic ids | `MareaIds` is a root-provided counter (`marea-<prefix>-<n>`); no `Math.random`, no `Date.now`, no UUID | `core/ids.ts`; scan shows 0 `Math.random`/`Date.now` |
| Locale APIs differing server/client | `formatAge()` formats `mm:ss` with string padding, no `Intl` at render time; number formatting is a data-layer responsibility | `core/i18n.ts` `formatAge` |
| Timers / async in render | **0** `setTimeout`, `setInterval`, `fetch`, `navigator` in the tree; no asynchronous work is performed by any component | scan |
| Writing state during render | no `effect()`; the only signal write is `MareaTheme.ngOnChanges` setting the document locale | `theme/marea-theme.ts` |
| Hydration of ARIA relationships | ids come from a deterministic counter in component construction order, so `aria-describedby`/`aria-labelledby` match between server and client for the same component order | `ids.ts`; `marea-button`, `marea-form-field` |
| Hydration-sensitive timestamps | no component reads the clock; `ageSeconds` is an input supplied by the caller | `marea-freshness`, `marea-numeric-readout` |

**Known inconsistency (recorded, not hidden):** `marea-form-field` does not use
`MareaIds`. It keeps a module-level counter (`let per-render `MareaIds` counter (a process-wide module counter was found during review and replaced; the current implementation injects `MareaIds`). On a long-running SSR process that counter is shared across
requests, so ids in a later request differ from what a fresh client counter would
produce. The design system is not part of the production build today, so this is a
latent defect rather than an observed hydration error; it is listed in D09 §10 and
must be fixed before any SSR use.

## 7. Imports boundary and production isolation

| Production file | Imports design system? |
|---|---|
| `src/main.ts` | No |
| `src/main.server.ts` | No |
| `src/app/app.routes.ts` | No (and contains no `marea` string at all) |
| `src/app/core/seo.service.ts` | No |
| `src/server.ts` | No |
| `src/styles.scss` | No (`marea` string absent; check `MC17-07`) |
| `src/app/layout/header/header.ts`, `footer/footer.ts` | No — untouched, byte-identical to baseline |
| `src/app/features/shop/**` (list, detail, cart, checkout) | No — untouched, byte-identical to baseline |

Recorded evidence: check `MC17-08` PASS — "5 production files free of
design-system imports"; check `MC17-28` PASS — "35 watched files unchanged vs
6d8287c…"; check `MC17-29` PASS — "23 proposed routes, none added to the Angular
router"; check `MC17-09` PASS — "168 build files scanned", no
`marea-design-system`/`marea-theme`/`MareaTheme`/`marea-ds-catalogue` string in the
production bundle.

## 8. Preview project isolation

| Aspect | Value |
|---|---|
| Project | `marea-design-system-catalogue` (`angular.json`) |
| Root / sourceRoot | `preview` / `preview` |
| Builder | `@angular/build:application`, **browser only, no SSR** |
| Entry | `preview/main.ts`, index `preview/index.html` |
| Output | `dist/marea-ds-catalogue` — structurally different from `dist/embarcarte` |
| Styles | `preview/catalogue.css` + generated token CSS only; **not** `src/styles.scss` |
| Assets | `[]` — no public asset, no image |
| Serve | `npm run preview:design-system` → `ng serve marea-design-system-catalogue --port 4301` |
| Build | `npm run build:design-system-preview` |
| Static server | `npm run serve:design-system-preview` → `node scripts/marea-ds-preview-server.mjs` |
| Routes | none — the catalogue is a single shell with galleries; it adds no public route |
| Guard | check `MC17-10` PASS: catalogue isolated at `preview/`, its own output path, does not reuse production styles, preview files not under `src/` |

## 9. Component inventory (49 entries)

| # | Component | Selector | Layer |
|---:|---|---|---|
| 1 | `marea-theme` | `marea-theme` | theme |
| 2 | `marea-text` | `[marea-text]` | foundation |
| 3 | `marea-section-heading` | `marea-section-heading` | foundation |
| 4 | `marea-container` | `marea-container` | foundation |
| 5 | `marea-grid` | `marea-grid` | foundation |
| 6 | `marea-stack` | `marea-stack` | foundation |
| 7 | `marea-inline` | `marea-inline` | foundation |
| 8 | `marea-divider` | `hr[marea-divider]` | foundation |
| 9 | `marea-surface` | `marea-surface` | foundation |
| 10 | `marea-icon` | `marea-icon` | foundation |
| 11 | `marea-button` | `button[marea-button]` | foundation |
| 12 | `marea-link` | `a[marea-link]` | foundation |
| 13 | `marea-status-badge` | `span[marea-status-badge]` | foundation |
| 14 | `marea-notice` | `marea-notice` | foundation |
| 15 | `marea-state-panel` | `marea-state-panel` | foundation |
| 16 | `marea-form-field` | `marea-form-field` | foundation |
| 17 | `marea-input` *(directive)* | `input[mareaInput], select[mareaInput], textarea[mareaInput]` | foundation |
| 18 | `marea-tabs` | `marea-tabs` | structured |
| 19 | `marea-tab-panel` | `marea-tab-panel` | structured |
| 20 | `marea-accordion` | `marea-accordion` | structured |
| 21 | `marea-disclosure` | `marea-disclosure` | structured |
| 22 | `marea-spec-table` | `marea-spec-table` | structured |
| 23 | `marea-definition-list` | `marea-definition-list` | structured |
| 24 | `marea-responsive-nav` | `marea-responsive-nav` | structured |
| 25 | `marea-breadcrumb` | `marea-breadcrumb` | structured |
| 26 | `marea-status-display` | `marea-status-display` | structured |
| 27 | `marea-feature-comparison` | `marea-feature-comparison` | structured |
| 28 | `marea-data-quality` | `marea-data-quality` | structured |
| 29 | `marea-permission-notice` | `marea-permission-notice` | structured |
| 30 | `marea-readiness-panel` | `marea-readiness-panel` | commerce |
| 31 | `marea-family-card` | `marea-family-card` | commerce |
| 32 | `marea-edition-card` | `marea-edition-card` | commerce |
| 33 | `marea-bundle-components` | `marea-bundle-components` | commerce |
| 34 | `marea-bundle-exclusions` | `marea-bundle-exclusions` | commerce |
| 35 | `marea-entitlement-summary` | `marea-entitlement-summary` | commerce |
| 36 | `marea-compatibility-notice` | `marea-compatibility-notice` | commerce |
| 37 | `marea-price-unavailable` | `marea-price-unavailable` | commerce |
| 38 | `marea-stock-unavailable` | `marea-stock-unavailable` | commerce |
| 39 | `marea-commercial-cta` | `marea-commercial-cta` | commerce |
| 40 | `marea-quote-status` | `marea-quote-status` | commerce |
| 41 | `marea-documentation-panel` | `marea-documentation-panel` | commerce |
| 42 | `marea-numeric-readout` | `marea-numeric-readout` | instrument |
| 43 | `marea-measurement` | `marea-measurement` | instrument |
| 44 | `marea-freshness` | `marea-freshness` | instrument |
| 45 | `marea-sensor-unavailable` | `marea-sensor-unavailable` | instrument |
| 46 | `marea-instrument-status` | `marea-instrument-status` | instrument |
| 47 | `marea-connectivity` | `marea-connectivity` | instrument |
| 48 | `marea-instrument-tile` | `marea-instrument-tile` | instrument |
| 49 | `marea-telemetry-list` | `marea-telemetry-list` | instrument |

Exact counts: **49 total = 1 theme + 16 foundation + 12 structured + 12 commerce +
8 instrument**. Implementation kinds: 48 `angular-component`, 1
`angular-directive`. All 49 carry status `INTERNAL_READY`. 131 inputs and 3
outputs are declared across the registry (`activated`, `activeIdChange`,
`openedChange`). Check `MC17-12` PASS verifies that every registry entry exists at
its declared path, exports the declared class, contains the declared selector and
`data-marea-component` marker, and declares every listed input/output.

## 10. What this architecture does not establish

- No production integration is proven or authorised: the design system is not
  imported by any route, so "works in the site" is an untested claim.
- No SSR/hydration test of the design system was run in this milestone
  (`e2e/design-system/ssr-contract.spec.ts` exists; it was not executed here).
- No performance measurement: no bundle-size budget for the catalogue is enforced
  beyond Angular's defaults in the production configuration.
- No dependency-injection scoping analysis beyond the three root services.
- The `per-render `MareaIds` counter (a process-wide module counter was found during review and replaced; the current implementation injects `MareaIds`).

Source references: `src/app/marea-design-system/**`,
`preview/**`, `angular.json`, `package.json`,
`docs/marea/design-system/data/{component-registry,component-states,token-source-map}.json`,
`scripts/check-marea-design-system.mjs` (checks MC17-07…MC17-12),
`docs/marea/design-system/evidence/validator-run.json`.
