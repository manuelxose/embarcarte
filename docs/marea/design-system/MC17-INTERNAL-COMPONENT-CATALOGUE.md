# MC-17 D16 — Internal component catalogue

| Field | Value |
|---|---|
| Deliverable | D16 `MC17-INTERNAL-COMPONENT-CATALOGUE.md` |
| Milestone | MC-17/36 — MAREA internal design system |
| Date | 2026-11-03 |
| Owner | programme-docs |
| Status | `INTERNAL_ONLY` — not published, not indexed, not deployed |
| Catalogue URL | `http://127.0.0.1:4301` (loopback only) |
| `MC16_VERDICT` | `PARTIAL` (unchanged) |

## 1. What the catalogue is

The catalogue is a Storybook-equivalent internal showcase for the MC-17 design system. It
renders the **real Angular components** inside the real `MareaTheme` host. It is not a mock
gallery, not a screenshot deck and not a second implementation.

It is implemented as a separate Angular application project:

| Item | Value |
|---|---|
| Angular project name | `marea-design-system-catalogue` |
| Source root | `preview/` |
| Entry | `preview/main.ts` |
| HTML shell | `preview/index.html` |
| Global styles | `preview/catalogue.css` plus `src/app/marea-design-system/tokens/generated/marea-tokens.generated.css` only |
| TypeScript config | `preview/tsconfig.json` |
| Output | `dist/marea-ds-catalogue` (`browser/` for static serving) |
| Default build configuration | `development` |
| Assets | `[]` (no public asset copied) |
| Production SSR | none |

The shell component is `CatalogueApp` in `preview/catalogue/app/catalogue.ts`. It wraps
all galleries in one `<marea-theme>` and exposes two control groups: four visual modes and
two locales.

## 2. Exact local execution boundary

Run from the repository root:

| Command | What it does | Network boundary |
|---|---|---|
| `npm run build:design-system-preview` | `ng build marea-design-system-catalogue` → `dist/marea-ds-catalogue/browser` | local build only |
| `npm run preview:design-system` | `ng serve marea-design-system-catalogue --port 4301` | dev server on port 4301 |
| `npm run serve:design-system-preview` | `node scripts/marea-ds-preview-server.mjs` → static server at `http://127.0.0.1:4301` | binds `127.0.0.1` only |
| `npm run test:design-system:visual` | `playwright test -c playwright.design-system.config.ts` | Chromium against `127.0.0.1:4301` |

The Playwright config starts the static server itself (`webServer.command` =
`node scripts/marea-ds-preview-server.mjs`, `reuseExistingServer: true`). Its prerequisites
are the build command above; the helper `assertCatalogueBuilt()` fails with an explicit
message if `dist/marea-ds-catalogue/browser/index.html` is missing.

Port 4301 is the only port in the design-system scripts. `MAREA_DS_PREVIEW_PORT` can
override it for the static server, but the committed Playwright `baseURL` uses 4301.

## 3. Why the isolation is real

| Claim | Evidence |
|---|---|
| Separate Angular project | `angular.json` has a second project `marea-design-system-catalogue` with `root: "preview"` |
| Separate output | `outputPath: "dist/marea-ds-catalogue"`, not `dist/embarcarte` |
| Own HTML shell | `index: "preview/index.html"`, `<meta name="robots" content="noindex, nofollow">` |
| Not in the production build | `npm run build` is `ng build embarcarte`; it does not name the catalogue project |
| Own global styles | catalogue uses `preview/catalogue.css` plus the generated token CSS; the production project still uses only `src/styles.scss` |
| No route | the catalogue has no router; `src/app/app.routes.ts` contains no `marea` match (`MC17-29`) |
| No sitemap / indexation | `preview/index.html` is `noindex, nofollow`; the catalogue is never served by `src/server.ts` |
| No public asset | `public/` is byte-identical to the baseline and contains no MAREA-named file (`MC17-11`) |
| No production SSR | the catalogue project has no `server` entry and no `ssr` option |
| No production import | `src/main.ts`, `src/main.server.ts`, `src/app/app.routes.ts`, `src/app/core/seo.service.ts` and `src/server.ts` contain no `marea` reference (`MC17-08`) |
| No production bundle leakage | `MC17-09` scans `dist/embarcarte/browser` when present; otherwise it records the static-only limitation |

The static preview server also normalises requested paths under
`dist/marea-ds-catalogue/browser` and rejects traversal outside it.

## 4. What each catalogue section shows

The shell has five sections, in this order. Each is a real Angular gallery component.

| # | Section (visible heading) | Gallery file | What it shows |
|---:|---|---|---|
| 1 | Fundamentos | `preview/catalogue/app/galleries/foundation.gallery.ts` | Semantic typography roles (`MareaText`, `MareaSectionHeading`), fluid layout (`MareaContainer`, `MareaGrid`, `MareaStack`, `MareaInline`, `MareaSurface`, `MareaDivider`), buttons/links/icons, status badges and notices (including permission notice), form fields and inputs |
| 2 | Estructura e interacción | `preview/catalogue/app/galleries/structured.gallery.ts` | Tabs and tab panels, native accordion, native disclosure, specification table, definition list, responsive navigation, breadcrumb, status line, feature comparison, data quality and permission notice |
| 3 | Presentación comercial | `preview/catalogue/app/galleries/commerce.gallery.ts` | Readiness panel, family cards (NAV, PILOT, FLEET), edition cards (NAV-ESSENTIAL, PILOT-PRO, DISPLAY-LARGE-CONDITIONAL), bundle components (START, FLEET), COMPLETE exclusions, entitlement summary, compatibility notice, price/stock withheld blocks, all five CTA states, quote status and documentation panel |
| 4 | Instrumentación interna (demostración) | `preview/catalogue/app/galleries/instrument.gallery.ts` | Instrument tiles, numeric readouts, measurement labels, data freshness, sensor-unavailable states, instrument status, connectivity and telemetry list |
| 5 | Datos adversarios (fail-closed) | `preview/catalogue/app/galleries/adversarial.gallery.ts` | Hostile view models: purchase flags true, unknown `PURCHASE` state, price/stock withheld, hostile PILOT family card, 11-dimension readiness, and a CTA derivation table |

Section prose explicitly says the instrument specimens are synthetic and that no hardware,
night-vision, AIS-transmission or steering-control claim is made.

The shell also has a table of contents, a footer stating "Catálogo interno. Sin rutas
públicas, sin indexación, sin despliegue y sin aprobación de marca", and ES/EN and mode
controls implemented with real `MareaButton` controls and `aria-pressed`.

## 5. Real components, not copies

There are 49 registry entries: 48 component/directive classes under
`src/app/marea-design-system/components/` across four groups, plus the `MareaTheme` host.

| Group | Components |
|---|---:|
| `foundation` | 16 (plus `marea-icon-paths.ts` data) |
| `structured` | 12 |
| `commerce` | 12 |
| `instrument` | 8 |
| `theme` (`MareaTheme` host) | 1 |
| **Registry total** | **49** |

The galleries import these classes directly from `src/app/marea-design-system/...`; there is
no duplicated markup library. Every component carries a `data-marea-component` host marker
(except the theme), which the validator uses to verify registry entries against
implementation (`MC17-12`). `component-registry.json` is the machine-readable authority;
`registry.generated.ts` is derived from it.

The catalogue renders explicit synthetic fixtures from
`data/fixtures/marea-fixtures.generated.ts`; it does not read MC-16 JSON at runtime.

## 6. Mandatory internal/provisional banner

The catalogue must make its unpublished, provisional status visible at all times. The
shell renders a `marea-notice` with variant `internal`:

> **Estado interno y provisional** — Marca MAREA propuesta, no adoptada. Uso público NO_GO.
> Sin autorización de publicación, sin precio aprobado y sin stock verificado.

Above it, the header reads `MC-17/36 · catálogo interno · no publicado`. The copy keys
`internalOnlyBanner`, `provisionalBrand` and `demoData` exist for reuse in any isolated
surface. Removing the banner, hiding it, or rendering MAREA identity without it is a
contract violation.

`e2e/design-system/commerce.spec.ts` asserts the visible "Solo uso interno" text in ES and
"Internal use only" in EN; the catalogue shell itself renders its banner as Spanish prose,
so the ES assertion matches the shell and the EN assertion matches the copy dictionary
surfaces.

## 7. Visual evidence and screenshots

Screenshot and JSON evidence is produced by the Playwright suite, not committed by this
document:

| Artifact | Location | Presence at authoring time |
|---|---|---|
| Responsive screenshots (320/360/390/768/1024/1440) | `test-results/design-system/responsive-*.png` | absent (the responsive test writes them only after its assertions pass) |
| Visual baselines / diffs | Playwright snapshot output under the project's default snapshot directory | not present; the first run creates baselines and fails by design |
| axe results per mode | `test-results/design-system/axe-<mode>.json` | present for all four modes |
| axe summary | `docs/marea/design-system/evidence/axe-summary.json` | present |
| Playwright JSON report | `test-results/design-system/results.json` | absent; the reporter path is configured but the file was not produced |
| Failure artifacts | `test-results/<test-name>/` (`error-context.md`, `test-failed-1.png`, `trace.zip`) | present for four spec cases at authoring time |

The suite is `e2e/design-system/` with `accessibility.spec.ts`, `keyboard.spec.ts`,
`responsive.spec.ts`, `visual.spec.ts` and `commerce.spec.ts`. The config forces one
worker, Chromium only, locale `es` and disabled animations for visual snapshots.

### 7.1 Recorded axe outcome

The committed `evidence/axe-summary.json` reports 0 violations for `web-light`,
`instrument-day` and `instrument-sunlight`, and **1 `color-contrast` violation for
`instrument-night`** (36 passes and 1 incomplete in that mode; the other modes have
0 incomplete). The failing nodes are in
`marea-component-doc` (the preview-only documentation block, `.name`, `.status`, `.purpose`,
definition-list and table text), not in a library component. The summary states
`conformanceClaim: "NONE..."`; it is not a WCAG claim.

The matching Playwright failure artifact is
`test-results/accessibility-all-four-vis-6661a-d-automated-WCAG-A-AA-rules-chromium/`.
Three other failure directories exist (status-badge text, CTA purchase/price copy,
price/stock amount). Their results are **not** treated as a clean gate here.

At authoring time no responsive screenshot or visual baseline was committed, so **no
screenshot is claimed as captured**. Evidence is reproducible with
`npm run build:design-system-preview` followed by `npm run test:design-system:visual` on a
machine with Chromium installed; a clean run is still required.

## 8. Catalogue documentation blocks

`MareaComponentDoc` renders the registry contract beside each specimen (purpose, selector,
modes, variants, inputs, outputs, keyboard/focus/ARIA contracts). It reads
`preview/catalogue/app/registry.generated.ts`, which is generated from
`docs/marea/design-system/data/component-registry.json` by
`scripts/build-marea-design-system-catalogue-data.mjs`.

At authoring time the registry dataset exists and the generated file contains
`REGISTRY_META.componentCount = 49` and a populated `COMPONENT_REGISTRY`. The validator run
records `MC17-12` PASS ("49 registry entries verified against implementation") and
`MC17-14` PASS ("49 components x 11 states"). The documentation blocks therefore render.

Recorded side effect: the `instrument-night` axe finding described in §7.1 is located
entirely in the `marea-component-doc` nodes, which render only when the registry is
populated. The failing styles belong to the preview-only documentation block, not to the
library token set.

## 9. What the catalogue does not do

- No production route, no link from the public site, no sitemap entry.
- No public asset, no MAREA logo in `public/`.
- No price, stock, cart, checkout or payment.
- No Product/Offer structured data, no analytics script, no third-party network call.
- No real customer, vessel or telemetry data.
- No deployment. The static server is loopback-only.

## 10. Verification map

| Check | Assertion |
|---|---|
| `MC17-10` | Catalogue is a separate non-production project at `preview/` with its own output |
| `MC17-11` | No MAREA asset in `public/`; public file set unchanged |
| `MC17-08` | Production entry points contain no design-system reference |
| `MC17-09` | Production build output contains no design-system/catalogue code when `dist/` exists |
| `MC17-27` | Preview and test scripts exist, and the Playwright config exists |
| `MC17-37` | All required design-system test artifacts exist |
| Playwright commerce spec | CTA has no control; no amount; no Product/Offer JSON-LD or microdata |
| Playwright accessibility spec | axe rules across four modes; visible internal banner in ES and EN |

Commands: `npm run test:design-system`, `npm run test:design-system:unit`,
`npm run test:design-system:visual`.

## 11. Known gaps

- **Instrument-night axe contrast finding is open** (§7.1). It is in the preview-only
  documentation block; it still blocks a clean accessibility gate.
- **The visual and responsive suites are not clean at authoring time.** Failure artifacts
  exist for four cases; no responsive screenshots or baselines are committed.
- **Chromium-only, Windows-specific** screenshots; Firefox/WebKit and macOS/Linux captures
  are not produced.
- **Catalogue prose is Spanish-only**, including demo documentation titles and the
  component-doc captions.
- **No independent review** of the catalogue (`MC17-INDEPENDENT-REVIEW.md` absent,
  PENDING).
- **No accessibility conformance claim**: axe is partial evidence, not an audit. The
  recorded summary explicitly says `conformanceClaim: NONE`.
- **No validator pass**: the recorded run is `FAIL` (see `evidence/validator-run.json`);
  three failures are missing-file errors for datasets added after the run and two are
  documentation/dataset completeness. None of this is a pass.

## 12. Source map

- `angular.json`, `package.json`
- `preview/index.html`, `preview/main.ts`, `preview/catalogue.css`, `preview/tsconfig.json`
- `preview/catalogue/app/{catalogue,component-doc,registry.generated}.ts`
- `preview/catalogue/app/galleries/*.gallery.ts`
- `scripts/marea-ds-preview-server.mjs`
- `playwright.design-system.config.ts`
- `e2e/design-system/*`
- `scripts/check-marea-design-system.mjs`

`MC16_VERDICT = PARTIAL` is preserved. The catalogue is internal-only; no publication,
deployment, indexation or brand adoption is claimed.
