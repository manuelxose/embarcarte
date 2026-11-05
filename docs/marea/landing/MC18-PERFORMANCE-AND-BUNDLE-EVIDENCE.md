# MC-18 — Performance and bundle evidence (D12)

| Field | Value |
|---|---|
| Deliverable | D12 `MC18-PERFORMANCE-AND-BUNDLE-EVIDENCE.md` |
| Milestone | MC-18/36 — EMBARCARTE / MAREA internal corporate landing |
| Date | 2026-11-03 |
| Owner | MC-18 QA (Agent F) |
| Scope | Isolated preview build `dist/marea-landing-preview` + public production build `dist/embarcarte` |
| Browser / platform | Chromium 156.0.8078.4, Windows `win32`, loopback server |
| Evidence | [`performance-evidence.json`](data/performance-evidence.json), [`legacy-baseline.json`](data/legacy-baseline.json) |
| Protocol | Lab, **1 local run**, no throttling, **no field data**, no thresholds asserted |

No Core Web Vitals or performance budget claim is made. The preview build used
for the landing measurements is a **development build** (optimization disabled,
source maps emitted); its JS/CSS sizes are not a production budget.

## 1. Commands

```text
npm run build:landing:preview        # exit 0, 0 prerendered routes, 6.3 s
npx playwright test -c playwright.landing.config.ts
                                      # 44 passed / 44, exit 0
node e2e/landing/measure-production.mjs
                                      # exit 0; runs npm run build + probes
```

`measure-production.mjs` runs the public `npm run build`, starts the preview SSR
server on port 4397 and the **public** production server on port 4398 with a
temporary `DATA_DIR`, then stops both and removes the temporary directory.

## 2. Preview build (isolated landing, development configuration)

| Metric | ES | EN |
|---|---|---|
| SSR HTML bytes (raw response) | 316,049 | 313,958 |
| DOM elements after hydration | 1,847 | 1,846 |
| DOM nodes (TreeWalker, all node types) | 2,941 | 2,939 |
| Rendered body text characters | 27,610 | 26,180 |
| Layout-shift entries / CLS | 0 / 0 | 0 / 0 |
| TTFB (loopback) | 58.9 ms | 78.1 ms |
| `responseEnd` | 79.0 ms | 128.1 ms |
| `domContentLoadedEventEnd` | 229.5 ms | 308.9 ms |
| `loadEventEnd` | 233.1 ms | 312.9 ms |
| Open mobile nav (in-page, 2 rAF) | 32.5 ms | 20.9 ms |
| Scroll to `#familias` (in-page, 2 rAF) | 31.9 ms | 22.9 ms |

Asset sizes and actual HTTP transfer from the loopback preview (no compression
configured; `content-encoding` is absent, so transfer = raw):

| Asset | Raw / transfer bytes | SHA-256 |
|---|---|---|
| `browser/styles.css` | 11,586 | `905fe8dbc12d7c365ff560a1d8ec5d925c380efdd6a3e71730ea3cf4b5148046` |
| `browser/main.js` | 1,851,809 | `54a8274d03f6c69efd6b1ca5e7ce1198352101ba1173200c2318cfece3645f22` |

Distribution totals for `dist/marea-landing-preview`: **59 files / 19,377,195
bytes** (browser 38 / 5,003,088; server 19 / 14,274,268; source maps
12,033,881). The large JS is explained by the development configuration
(unminified + source maps); no production landing bundle exists by design.

## 3. Public production build and isolation

`npm run build` (public `embarcarte` project): **exit 0**, 18,286 ms,
96 prerendered routes. Output `dist/embarcarte`:

| Measurement | Value |
|---|---|
| Total dist | 330 files / 7,866,000 bytes |
| Browser output | 168 files / 3,032,050 bytes |
| Server output | 160 files / 4,653,149 bytes |
| Entry `main-RFVWCSHZ.js` | 12,870 bytes |
| Entry `styles-4YSTMKXD.css` | 25,415 bytes |
| Public build styles (`angular.json`) | `["src/styles.scss"]` only |

Binary scan of **all 330 files / 7,866,000 bytes** in `dist/embarcarte` for the
exact identifiers `marea-landing`, `data-marea-landing`,
`marea-landing-preview`, `MareaLanding`:

| Identifier | Occurrences | Files |
|---|---|---|
| `marea-landing` | 0 | — |
| `data-marea-landing` | 0 | — |
| `marea-landing-preview` | 0 | — |
| `MareaLanding` | 0 | — |

`data.productionIsolation = {landingIdentifiersFound: 0, publicRoutesActivated: 0,
productionStyles: ["src/styles.scss"], productionMareaStatus: 404, buildExitCode: 0}`.

Isolated production server probe (port 4398, temporary `DATA_DIR`):

| Route | Status |
|---|---|
| `GET /marea` | **404** |
| `GET /en/marea` | **404** |

The 404 body is the public not-found page; neither preview route is served by the
public application. The temporary server and data directory were removed after
the probe.

## 4. Public-site non-regression

Command and exact output:

```text
$ git diff --name-only 6002c49 -- src/app src/server.ts src/styles.scss public angular.json playwright.config.ts
angular.json
playwright.config.ts
```

Exit 0. `publicRouteOrStyleChanges: []` — no public route, public SSR entry,
public stylesheet or `public/` asset changed. The two tracked changes are
isolation-only: `angular.json` adds the isolated `marea-landing-preview` project
(68 insertions, 0 deletions) and `playwright.config.ts` adds `**/landing/**` to
`testIgnore` so the internal suite never runs from the public config.
`data.watchedPathsUnchanged = true` with that interpretation is recorded in
[`legacy-baseline.json`](data/legacy-baseline.json). The full public e2e suite is
**not** run by this dataset; inherited public gates remain the Lead's
responsibility.

## 5. Protocol limits and caveats

- Single local run, no repeat statistics, no CPU/network throttling, no mobile
  device, no field/RUM data. Numbers are descriptive only.
- Transfer bytes were measured over loopback **without compression**; the real
  CDN/brotli transfer would be smaller. Angular's own build report estimated the
  public initial transfer at ~133.6 kB, but that estimate is not used as a
  measured result here.
- The landing preview is a development build; do not read 1.85 MB JS as a
  production landing bundle.
- Timings include Playwright/loopback and two animation-frame waits; the
  interaction numbers are not a benchmark.
- CLS is observed with `PerformanceObserver` during one load; it is not a field
  Core Web Vitals metric.
- Production sizes were measured on this machine from a local build; they are
  not a deployment guarantee, and the build emitted pre-existing CommonJS
  optimization warnings unrelated to MC-18.
- The production build was executed under `measure-production.mjs` after the
  landing preview build; no concurrent build should run while measuring (the
  first pre-final attempt hit a transient cache-lock failure and a clean rerun
  exited 0).

## 6. Reproduction

```text
npm run build:landing:preview
npx playwright test -c playwright.landing.config.ts
node e2e/landing/measure-production.mjs
npx prettier --check e2e/landing playwright.landing.config.ts
```

See D10 (`MC18-ACCESSIBILITY-VALIDATION.md`) for axe/keyboard/reduced-motion
evidence and D11 (`MC18-RESPONSIVE-AND-VISUAL-EVIDENCE.md`) for responsive and
screenshot evidence.
