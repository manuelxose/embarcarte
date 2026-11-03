# MC-17 — Design-system architecture (D02)

| Field | Value |
|---|---|
| Deliverable | D02 `MC17-DESIGN-SYSTEM-ARCHITECTURE.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Status | `INTERNAL_PROPOSED` — architecture description, not an approval |
| Adoption | `NOT_ADOPTED`; public use `NO_GO` |
| Production import | none; the design system is absent from the production entry points and bundle |
| Registry authority | `docs/marea/design-system/data/component-registry.json` (49 entries) |

## 1. What the design system is

MC-17 is an **internal, isolated Angular design system** plus a **separate internal
catalogue application**. It renders synthetic specimens of the MAREA presentation
contract. It is not the public website, it is not a brand adoption, it publishes no
route and it exposes no purchase path. The architectural goal is to make the
contract executable and reviewable without changing the live site.

The measured implementation at authoring time:

| Measure | Value | Source |
|---|---:|---|
| TypeScript files under `src/app/marea-design-system/` | 56 | directory walk |
| TypeScript lines in that tree | 6,425 | line count |
| Registered entries | 49 (48 components + 1 directive) | `component-registry.json` |
| Visual modes | 4 | `mode-contracts.json` |
| Colour roles per mode | 33 (132 colour rows) | `color-roles.json` |
| Token ids / provenance rows | 163 / 262 | `token-source-map.json` |
| Typography roles / families | 13 / 2 | `typography-roles.json` |
| Bilingual copy keys | 138 | `core/i18n.ts`; `MC17-25` |
| Synthetic entities | 9 families, 26 editions, 6 bundles, 11 readiness dimensions, 12 entitlement definitions | generated fixtures |

No count above is a public-availability claim. The registry is the machine-readable
authority; this document cites it rather than replacing it.

## 2. Two visual contexts

The token contract separates a **corporate web** context from a **marine
instrumentation** context. They share one component implementation; only the
custom-property values, `color-scheme` and context attribute change.

| Mode | Context | `color-scheme` | Intended reading | Status |
|---|---|---|---|---|
| `web-light` | corporate | light | Corporate web components on the existing light baseline | `EXISTING_MEASURED_BASELINE` |
| `instrument-day` | instrument | light | Bridge daylight, software specimen only | `INTERNAL_PROPOSED` |
| `instrument-sunlight` | instrument | light | High-ambient-light specimen; glare not validated | `INTERNAL_PROPOSED` |
| `instrument-night` | instrument | dark | Watchkeeping specimen; night vision not validated | `INTERNAL_PROPOSED` |

The mode is selected by the nearest `<marea-theme [mode]="…">` host. The host writes
`data-marea-mode` and derives `data-marea-context` (`instrument` when the mode starts
with `instrument-`, otherwise `corporate`). There is no `:root`, `html` or `body`
override in the generated CSS, so importing the system cannot restyle a page unless
its content is wrapped in the host.

## 3. Package and project boundaries

```text
src/app/marea-design-system/          internal library tree (not imported by production)
  core/          types.ts, i18n.ts, ids.ts
  data/          commerce-presentation.adapter.ts, fixtures/marea-fixtures.generated.ts
  theme/         marea-theme.ts
  tokens/        marea-design-tokens.source.json + generated/{css,ts}
  components/    foundation/16, structured/12, commerce/12, instrument/8 registry entries

preview/                              Angular project marea-design-system-catalogue
  index.html, main.ts, tsconfig.json, catalogue.css
  catalogue/app/  catalogue.ts, component-doc.ts, registry.generated.ts
  catalogue/app/galleries/  foundation, structured, commerce, instrument, adversarial
```

Two Angular projects are declared in `angular.json`:

| Project | Root | Build | Output | SSR | Global styles |
|---|---|---|---|---|---|
| `embarcarte` | repository root | `@angular/build:application` | `dist/embarcarte` | `src/main.server.ts` + `src/server.ts` | exactly `["src/styles.scss"]` |
| `marea-design-system-catalogue` | `preview` | `@angular/build:application` (browser only) | `dist/marea-ds-catalogue` | none | `preview/catalogue.css` + generated token CSS |

The catalogue is a real Angular application, not a mock gallery: its galleries import
the same component classes the library exports. It is `noindex, nofollow`, loopback
served and never referenced by `src/server.ts`.

## 4. Token pipeline

The single source of truth is
`src/app/marea-design-system/tokens/marea-design-tokens.source.json`
(contract `MC17-DESIGN-TOKENS`, `INTERNAL_PROPOSED` / `NOT_ADOPTED` / `NO_GO`).
`scripts/build-marea-design-tokens.mjs` validates it and emits deterministic outputs:

| Output | Kind | Consumer |
|---|---|---|
| `tokens/generated/marea-tokens.generated.css` | scoped custom properties (`marea-theme` + 3 instrument attribute blocks) | catalogue global styles |
| `tokens/generated/marea-tokens.generated.ts` | token ids, CSS-var map, breakpoints | TypeScript consumers and tests |
| `data/token-source-map.json` | 262 provenance rows | audit / dataset index |
| `data/color-roles.json` | 33 roles × 4 modes, contrast pairs, status semantics | contrast audit |
| `data/mode-contracts.json` | selector and mode contract | documentation and tests |
| `data/typography-roles.json` | 13 roles, 2 families, numeric contract | typography contract |
| `data/layout-tokens.json` | space, size, grid, radius, border, elevation, opacity, focus, motion, breakpoint, zIndex, icon | layout contract |

Determinism rules enforced by the generator: no timestamps, no environment data,
stable source ordering, and a `--check` mode that compares committed bytes with a
fresh render. The validator runs `--check` for tokens, fixtures and the legacy
baseline as check `MC17-05`; all three reported current in the recorded run.

The generator also rejects a changed governance state, unsupported status values,
unnamespaced CSS variables and unresolved provenance ids. Token references in
components are checked separately by `MC17-06` (recorded: 180 references resolved
against 182 definitions).

## 5. Component layers

The registry declares 49 entries: 1 theme host, 16 foundation entries
(15 components + the `mareaInput` directive), 12 structured, 12 commerce and
8 instrument. Implementation kinds are **48 `angular-component` + 1
`angular-directive`**; all 49 are `INTERNAL_READY`; 131 inputs and 3 outputs are
declared. The directive is deliberately an attribute on native elements
(`input[mareaInput]`, `select[mareaInput]`, `textarea[mareaInput]`), so labels,
autocomplete and validation semantics stay native; the visible error is rendered by
`marea-form-field`, never by colour alone.

| Layer | Entries | Examples | Role |
|---|---:|---|---|
| theme | 1 | `marea-theme` | scopes tokens, mode, context and locale; renders projected content only |
| foundation | 16 | text, heading, container, grid, stack, inline, divider, surface, icon, button, link, status badge, notice, state panel, form field, input directive | semantics, layout and primitives |
| structured | 12 | tabs, tab panel, accordion, disclosure, spec table, definition list, responsive nav, breadcrumb, status display, feature comparison, data quality, permission notice | navigation and information structure |
| commerce | 12 | readiness panel, family/edition cards, bundle components/exclusions, entitlements, compatibility notice, price/stock withheld, CTA, quote status, documentation panel | truthful presentation of MC-16 data; no transaction |
| instrument | 8 | numeric readout, measurement, freshness, sensor unavailable, instrument status, connectivity, tile, telemetry list | synthetic marine instrumentation specimens |

All templated components use `ChangeDetectionStrategy.OnPush` (48 declarations; the
directive is the exception). There is no `NgModule`, no `templateUrl`/`styleUrl`, no
`effect()`, no timer, no data fetch and no store. State enters through signal inputs.

The eleven required states (`DEFAULT`, `HOVER`, `FOCUS_VISIBLE`, `PRESSED`,
`DISABLED`, `LOADING`, `EMPTY`, `ERROR`, `WARNING`, `READ_ONLY`, `BLOCKED`) are
declared for every entry in `component-states.json`; 386 entries are explicit
`NOT_APPLICABLE` with a reason rather than a manufactured variant.

## 6. Data layer

`core/types.ts` is the only boundary through which MC-16 concepts enter presentation.
It is deliberately narrower than the MC-16 datasets:

- Entity summaries: family, edition, readiness (dimensions + overall + blocked gate
  ids), bundle (lines, optional lines, contract-only and ineligible exclusions),
  entitlement and documentation item.
- Enumerations: locale, mode, context, tone, definition status, CTA state, readiness,
  restriction kind, data status, freshness, connectivity, sensor state, inclusion,
  documentation status.
- Commercial guard types: `MareaCommercialInput`, `MareaCommercialPresentation`,
  `MareaBlockedSignal`.
- Instrument readouts: pre-formatted value, unit, label, precision note, freshness,
  age and a mandatory `demo: true`.
- Hygiene: `MareaFixtureClass = 'SYNTHETIC_INTERNAL_FIXTURE'`.

**No price amount, price currency, stock quantity, availability count, customer id,
vessel id or checkout URL is representable.** The commercial presentation interface
fixes `purchaseActionAllowed`, `cartAllowed`, `priceVisible` and
`availabilityVisible` to `false`; the adapter in
`data/commerce-presentation.adapter.ts` also fails closed at runtime.

Fixtures are generated by `scripts/build-marea-design-system-fixtures.mjs` from the
authoritative MC-16 JSON (`product-families`, `product-editions`,
`bundle-compositions`, `readiness-dimensions`, `entitlement-definitions`). The
generator asserts the 9/26/6 counts, maps restrictions from safety/licensing state,
marks every fixture `SYNTHETIC_INTERNAL_FIXTURE`, and refuses to emit if a forbidden
commercial or personal field leaks. `--check` verifies the committed module.

The fail-closed adapter is a **presentation guard, not the authoritative commercial
evaluator**: `deriveCommercialPresentation()` always returns purchase, cart, price
and availability off, inverts unauthorised upstream signals into `blockedSignals`,
deduplicates restrictions, and resolves malformed CTA states to `NOT_AVAILABLE`.
`deriveCtaState()` follows the documented precedence (installation/contract or
quotation → `QUOTE_ONLY`; conditional → `COMING_SOON`; informational →
`REQUEST_INFORMATION`; defined → `DISABLED`; otherwise `NOT_AVAILABLE`).

## 7. Catalogue layer

The catalogue (`preview/`) renders the real components inside a real
`<marea-theme>`. It has five gallery sections (foundation, structured, commerce,
instrument, adversarial), a component-documentation block generated from the
registry, four mode controls and two locale controls. `registry.generated.ts` and
`component-states.json` are generated from `component-registry.json` by
`scripts/build-marea-design-system-catalogue-data.mjs`; the registry remains the
authority.

The adversarial gallery renders hostile inputs (purchase flags true, unknown CTA
state, withheld price/stock, hostile PILOT card, 11-dimension readiness, derivation
table) so the fail-closed behaviour is visible, not merely asserted.

Commands: `npm run build:design-system-preview` (build),
`npm run preview:design-system` (dev server on 4301),
`npm run serve:design-system-preview` (static loopback server).

## 8. Isolation guarantees

Isolation is structural, not a feature flag:

| Guarantee | Mechanism | Verified by |
|---|---|---|
| Not imported by production | none of `src/main.ts`, `src/main.server.ts`, `src/app/app.routes.ts`, `src/app/core/seo.service.ts`, `src/server.ts` contains a `marea` reference | `MC17-08` PASS |
| Not present in the production bundle | `dist/embarcarte/browser` scanned; no design-system or catalogue identifier | `MC17-09` PASS — 168 files scanned |
| No global style leak | generated CSS scoped to `marea-theme`; production `styles` still exactly `["src/styles.scss"]`; no legacy token mutation | `MC17-07` PASS |
| Separate project and output | `marea-design-system-catalogue` at `preview/`, output `dist/marea-ds-catalogue` | `MC17-10` PASS |
| No public asset | `public/` byte-identical to the 15-file baseline; zero MAREA-named assets | `MC17-11` PASS |
| No route | 23 proposed routes remain out of the Angular router | `MC17-29` PASS |
| No metadata change | `src/index.html`, robots, manifest, OG image and favicon unchanged | `MC17-30` PASS |
| No structured commerce data | no JSON-LD, Product/Offer, `priceCurrency` or rating markup | `MC17-31` PASS |
| Working tree baseline | 35 watched public files unchanged vs MC-16 commit `6d8287c…` | `MC17-28` PASS |

The legacy baseline is generated from the Git object database, not the working tree,
so a later edit cannot make the baseline agree with itself. `MC17-28` re-hashes the
working tree against it.

## 9. SSR and hydration strategy

The design system is **not rendered through the production SSR server** in this
milestone; the catalogue is browser-only by design. The architecture is nonetheless
written to be SSR-safe if a future milestone imports it:

| Risk | Design rule | Current evidence |
|---|---|---|
| Global CSS mutation | custom properties only on `marea-theme`; no `:root`/`html`/`body` | generated CSS; `MC17-07` |
| Browser globals in render | no `window`, `document`, `localStorage`, `sessionStorage`, `matchMedia`, `navigator` in the library tree | `ssr-contract.spec.ts`; source scan returns 0 |
| Non-deterministic ids | `MareaIds` root service emits `marea-<prefix>-<n>` in construction order; no randomness or clock | 9 component files + `core/ids.ts`; source scan 0 for `Math.random`/`Date.now`/`new Date` |
| Locale mismatch server/client | `MareaTheme.ngOnChanges` sets the document locale before children render; no `Intl` at render time | `theme/marea-theme.ts`, `core/i18n.ts` |
| Post-render effects | 0 `effect()`, 0 `afterNextRender`, 0 timers | source scan |
| Hydration ARIA mismatch | deterministic counters for `aria-labelledby`/`aria-describedby` | `MareaIds`; `marea-form-field` now injects it |

Correction to an earlier record: D08 §6 documented a module-level `fieldSequence`
counter in `marea-form-field` as an open SSR defect. The current file injects
`MareaIds` and a source search finds **0** `fieldSequence` occurrences, so that
specific defect is no longer present in the working tree. This correction is not a
hydration test: no browser/server hydration run of the design system has been made.

## 10. Dependency policy

MC-17 adds no runtime dependency for the design system. The library imports Angular
packages already used by the application (`@angular/core`, `@angular/common`) and
local type-only modules. Fonts are the existing `@fontsource-variable/manrope` and
`@fontsource-variable/dm-sans` packages, declared once by the consuming project.
The automated audit uses `@playwright/test` and `@axe-core/playwright` from
`devDependencies`; no network service, analytics script or third-party runtime is
loaded by the catalogue.

Policy for future work: a new dependency needs an explicit justification, a supply
review and a recorded decision; it must not be added merely to make a specimen
render.

## 11. Explicit non-goals

- No public route, page, link, sitemap entry or indexation.
- No restyling of the live website; no adoption of the MAREA identity.
- No price, stock, cart, checkout, payment, subscription or entitlement grant.
- No Product/Offer structured data or commercial availability claim.
- No trademark, certification, hardware or night-vision claim.
- No accessibility conformance claim; automated and scripted evidence is partial.
- No cross-browser, real-device or field-performance guarantee.
- No SSR rendering of the design system in production and no hydration proof.

## 12. How a future milestone imports the system

The import contract is recorded in D19 and is summarised here:

1. Add `src/app/marea-design-system/tokens/generated/marea-tokens.generated.css`
   exactly once to the consuming Angular project's `styles` array. Do **not** import
   it into `src/styles.scss` during MC-17.
2. Wrap the consuming surface in `<marea-theme [mode]="…" [locale]="…">`. Components
   inherit custom properties from the nearest host; nothing is inherited from the
   document root.
3. Import standalone component classes directly from
   `src/app/marea-design-system/...`; do not copy component markup.
4. Import the two font packages once in the consumer's global styles.
5. Treat the registry as the API authority and re-run
   `npm run test:design-system` after any token, registry or component change.
6. A production integration is a new milestone decision: it requires a validator
   policy update (the current `MC17-07`/`MC17-08` checks deliberately forbid it),
   accessibility review and an authorised publication path.

## 13. Verification and limits of this document

Commands that produced the cited evidence:

```text
node scripts/check-marea-design-system.mjs
node --test --test-isolation=none scripts/check-marea-design-system.test.mjs scripts/check-marea-design-system-adversarial.test.mjs
npx ng build marea-design-system-catalogue
npx ng build embarcarte
npx playwright test -c playwright.design-system.config.ts
```

At `4a9043b` the validator records **PASS, 38/38**
(`evidence/validator-run.json`). The earlier 36/38 and 37/38 observations were
missing deliverables/datasets (`MC17-35`, `MC17-36`) owned by other authors, not
architecture failures; they are historical and retained in D01 §7. This document
does not convert that state into a milestone PASS, because the third-round
independent verdict is still pending. It also does not claim that the design system
works inside the live site: no route imports it, so that integration is untested.

Source references: `src/app/marea-design-system/**`, `preview/**`, `angular.json`,
`package.json`, `docs/marea/design-system/data/*.json`,
`docs/marea/design-system/evidence/validator-run.json`,
`docs/marea/design-system/MC17-MC18-HANDOFF.md`,
`docs/marea/design-system/MC17-ANGULAR-COMPONENT-ARCHITECTURE.md`.
