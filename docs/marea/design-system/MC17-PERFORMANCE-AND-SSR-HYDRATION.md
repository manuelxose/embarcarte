# MC-17 — Performance and SSR/hydration (D14)

| Field | Value |
|---|---|
| Deliverable | D14 `MC17-PERFORMANCE-AND-SSR-HYDRATION.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Measurement command | `npm run test:performance` → `node scripts/check-performance.mjs` |
| Measurement result | **exit 0**, 6 measurements written to `artifacts/performance/m04-performance.json` |
| Nature | Laboratory measurement, not CrUX/field data and not a CI gate |
| Design-system bundle contribution | **0 attributable bytes** (no import path exists) |

## 1. What was measured and what was not

`npm run test:performance` measures the **existing production application** served by
`dist/embarcarte/server/server.mjs` in an isolated test server. It does not measure
the design-system catalogue, because the catalogue is a development build served on
a different port and the production app does not import the design system.

The script launches Playwright Chromium, disables the network cache through CDP, and
measures three public paths:

| Path | Device profile |
|---|---|
| `/` | desktop 1440×900, unthrottled |
| `/en/shop` | desktop 1440×900, unthrottled |
| `/en/shop/e2e-hub` | desktop 1440×900, unthrottled |
| the same three paths | mobile 390×844, 4× CPU, 150 ms latency, 1.6 Mbps down, mobile UA |

It collects TTFB, DOMContentLoaded, load, FCP, LCP (with element), CLS, long tasks,
transfer bytes by resource type, DOM node count, language-switch wall time and the
largest observed interaction duration. The run records **no thresholds and no
pass/fail**: `check-performance.mjs` exits 0 when the measurement completes.

## 2. Actual measured values

Source: `artifacts/performance/m04-performance.json`, measured
`2026-11-03T02:11:59.677Z`. Values below are the raw report values (floating-point
values are shown to a readable precision; the JSON keeps full precision).

### Desktop — 1440×900, unthrottled

| Path | TTFB ms | FCP ms | LCP ms | LCP element | CLS | Long tasks (ms) | JS bytes | CSS bytes | DOM nodes | Language switch ms |
|---|---:|---:|---:|---|---:|---|---:|---:|---:|---:|
| `/` | 193.80 | 352 | 360 | `div.home-hero-image` | 0.001804 | 1 (56) | 467,403 | 25,715 | 231 | 68 |
| `/en/shop` | 169.70 | 356 | 356 | `h1.display h-xl` | 0.000677 | 1 (57) | 467,056 | 25,715 | 322 | 68 |
| `/en/shop/e2e-hub` | 47.30 | 184 | 184 | `h1.display h-md` | 0.000730 | 1 (57) | 468,599 | 25,715 | 173 | 67 |

### Mobile — 390×844, 4× CPU, 150 ms latency, 1.6 Mbps down

| Path | TTFB ms | FCP ms | LCP ms | LCP element | CLS | Long tasks (ms) | JS bytes | CSS bytes | DOM nodes | Observed interaction ms | Language switch ms |
|---|---:|---:|---:|---|---:|---|---:|---:|---:|---:|---:|
| `/` | 5.10 | 368 | 1,392 | `div.home-hero-image` | 0.000091 | 2 (653) | 467,403 | 25,715 | 231 | 56 | 442 |
| `/en/shop` | 58.40 | 324 | 744 | `h1.display h-xl` | 0.000197 | 4 (826) | 467,056 | 25,715 | 322 | 64 | 425 |
| `/en/shop/e2e-hub` | 37.50 | 308 | 704 | `p.price` | 0.000253 | 3 (870) | 468,599 | 25,715 | 173 | 56 | 387 |

Other measured fields are retained in the JSON: `wall_ms` (6,902–7,609 ms mobile,
3,327–3,517 ms desktop, including a deliberate 2.5 s settle), image and font transfer
bytes, `dom_content_loaded_ms` and `load_ms`. Image bytes: 80,724 on `/`, 6,236 on
`/en/shop`, 0 on the product page. Font bytes are 62,368 on every page.

## 3. Core Web Vitals — targets, not claims

The usual field thresholds are LCP ≤ 2.5 s, CLS ≤ 0.1 and INP ≤ 200 ms (TTFB is not
a Core Web Vital; 0.8 s is a common diagnostic target). In this single laboratory
run:

- Desktop LCP is 184–360 ms; mobile LCP is 704–1,392 ms — all under 2.5 s.
- CLS is ≤ 0.001804 on every page (far below 0.1).
- The largest observed interaction is 56–64 ms on mobile; desktop measured no event
  entry (`null`), so it does not supply an INP-like value.
- TTFB is 47–194 ms on desktop and 5–59 ms on mobile in this run.

These are **laboratory observations on this machine and this build**, not a field
assessment and not a performance claim for the MAREA experience. The sample is six
page loads with no comparison baseline and no run-to-run variance analysis. A
favourable number here does not establish real-user performance.

## 4. Production build and asset sizes

The recorded production build (`npx ng build embarcarte`) exited 0. The current
`dist/embarcarte/` contains a server bundle
(`server/server.mjs`, 1,269,637 bytes) and `server/index.server.html` (1,962 bytes),
consistent with the `outputMode: "server"` + SSR configuration. The browser output
contains **168 files / 3,032,053 bytes**:

| Extension | Files | Raw bytes | Gzip bytes (zlib level 9, computed here) |
|---|---:|---:|---:|
| `.html` | 97 | 1,847,298 | 591,359 |
| `.js` | 47 | 637,563 | 215,802 |
| `.png` | 4 | 297,154 | not compressed |
| `.woff2` | 8 | 130,132 | not compressed |
| `.webp` | 7 | 78,624 | not compressed |
| `.css` | 1 | 25,415 | 6,456 |
| `.ico` | 1 | 15,086 | not compressed |
| `.webmanifest` | 1 | 354 | 206 |
| `.svg` | 1 | 338 | 213 |
| `.txt` | 1 | 89 | 99 |
| **Total** | **168** | **3,032,053** | n/a |

Gzip is not part of the build output; the gzip column was computed with Node's
`zlib.gzipSync(..., { level: 9 })` over the current files, so it is an authoring
measurement, not an artefact the build emits. Raw sizes are the authoritative build
sizes. `main-*.js` is 12,870 bytes raw (3,905 gzip); `styles-*.css` is 25,415 bytes
raw (6,481 gzip at default level / 6,456 at level 9 — the small difference is the
compression level, which is stated rather than hidden). The **JS + CSS raw sum is
662,978 bytes** (215,802 + 6,456 = 222,258 gzip at level 9).

## 5. Catalogue build sizes

The catalogue's declared default configuration is **development**
(`optimization: false`, `sourceMap: true`), so its output is intentionally
unoptimized and must not be compared with the production bundle as if it were
shipped code.

| File | Raw bytes | Gzip (level 9) |
|---|---:|---:|
| `main.js` | 1,793,363 | 324,179 |
| `styles.css` | 11,447 | 2,576 |
| `main.js.map` | 2,632,805 | not applicable |
| all other `.map` files | 112,726 (combined remainder) | not applicable |
| `index.html` | 622 | 374 |
| **Total browser output** | **4,550,963 across 60 files** | n/a |

The catalogue includes the component implementations, five galleries, the generated
registry metadata and component documentation. These numbers describe a local
inspection tool, not a product payload.

## 6. Design-system contribution to the production bundle: 0 bytes

The design system contributes **0 bytes** to the production application because no
production import path exists:

- `src/main.ts`, `src/main.server.ts`, `src/app/app.routes.ts`,
  `src/app/core/seo.service.ts` and `src/server.ts` contain no `marea` reference
  (`MC17-08`, 5 files checked).
- `dist/embarcarte/browser` was scanned by `MC17-09`: 168 build files, no
  `marea-design-system`, `marea-ds-catalogue`, `MareaTheme` or `marea-theme`
  identifier.
- Production `styles` is exactly `["src/styles.scss"]`, and that file contains no
  `marea` reference (`MC17-07`).

This is an absence-of-import conclusion corroborated by a string scan, not a
per-module byte diff. It is the strongest measurement available without introducing
the design system into the production graph solely to measure it.

## 7. Dependency policy

No runtime dependency was added for the design system. `package.json` lists Angular
packages, Express, `google-auth-library`, `nodemailer`, `rxjs`, `tslib` and the two
`@fontsource-variable` packages; the design-system code imports only Angular and
local modules. The audit tooling (`@playwright/test`, `@axe-core/playwright`) is in
`devDependencies` and is not shipped. No third-party runtime, analytics or network
call is introduced by the catalogue.

## 8. SSR and hydration verification

### 8.1 What passed

The production Angular SSR build is present and the production entry points do not
reference the design system. The design-system SSR contract suite
(`e2e/design-system/ssr-contract.spec.ts`, 5 tests) passed in the recorded run and
performs static, filesystem-based checks:

| Check | Result |
|---|---|
| No `window`, `localStorage`, `sessionStorage`, `matchMedia`, `navigator` in DS `.ts` sources | 0 violations |
| No ambiguous `document` usage outside a method body | 0 ambiguous uses |
| No `Math.random`, `Date.now`, `new Date` in components/theme/data/core | 0 offenders |
| Production entry files do not import the design system | 0 offenders (5 files) |
| `angular.json` production project excludes catalogue/token styles and assets | pass |
| `src/styles.scss` contains no MAREA import | pass |

An independent source scan at authoring time confirms: 0 `window.`, 0 `document.`,
0 `localStorage`, 0 `matchMedia`, 0 `navigator`, 0 `Math.random`, 0 `Date.now`,
0 `new Date`, 0 `effect()`, 0 `afterNextRender`, 0 timers in
`src/app/marea-design-system/**/*.ts`. Deterministic ids come from `MareaIds`
(`marea-<prefix>-<n>`, construction order), injected by 9 components and the form
field.

### 8.2 A corrected record

D08 §6 recorded a module-level `fieldSequence` counter in `marea-form-field` as an
open SSR defect. The current file injects `MareaIds` and a source search returns
**0** `fieldSequence` occurrences. That specific defect is fixed in the working
tree; this document states the correction rather than repeating the stale warning.
It is still true that no hydration run of the design system exists.

### 8.3 What is not verified

- The design system is **not rendered through the production SSR server by design**.
  The catalogue is a browser-only Angular project with no `server`/`ssr` entry.
- No server-render → client-hydrate comparison of design-system markup was made.
- No hydration warning, mismatch or interaction-replay test was run.
- The static checks prove the absence of known unsafe APIs; they do not prove that a
  future composition will hydrate correctly.
- The production SSR build itself was recorded by the Lead (exit 0); this document
  did not rebuild it because `dist/embarcarte` was present and the task forbids an
  unnecessary rebuild.

## 9. Limitations of the performance evidence

1. **Laboratory, not field.** No CrUX, RUM, real users, real devices or real
   networks.
2. **Single run.** No median, variance, confidence interval or before/after
   comparison.
3. **Public app, not the design system.** The six pages do not include the
   catalogue; the 0-byte DS contribution is established separately by import
   analysis.
4. **Synthetic throttling.** 4× CPU, 150 ms latency and 1.6 Mbps are emulated; a
   mobile UA string is not a phone.
5. **Cold cache only.** CDP cache is disabled, so repeat-visit performance is not
   measured.
6. **Measurement window.** The script waits 2.5 s after network idle; `wall_ms`
   includes that wait and is not a page-load metric.
7. **INP proxy.** `observed_interaction_ms` is the largest event-timing entry from
   one language-switch click, not field INP; desktop produced no entry.
8. **Build sizes are environment-dependent.** Compression, hashing and bundles can
   change with the toolchain; gzip was computed at level 9 and is not emitted by the
   build.
9. **No budget enforcement.** Angular's default production budgets exist, but the
   catalogue does not run a production optimization build in this measurement.

## 10. Reproduce

```text
npm run test:performance
```

Expected: exit code 0; `artifacts/performance/m04-performance.json` is rewritten;
the console table shows the six rows above. To measure the catalogue, the command
would be `npm run build:design-system-preview` followed by an equivalent Lighthouse
or Playwright trace against `http://127.0.0.1:4301` — no such measurement exists in
this milestone.

Source references: `scripts/check-performance.mjs`, `scripts/e2e-server.mjs`,
`artifacts/performance/m04-performance.json`, `dist/embarcarte/**`,
`dist/marea-ds-catalogue/**`, `angular.json`, `package.json`,
`e2e/design-system/ssr-contract.spec.ts`,
`docs/marea/design-system/evidence/validator-run.json`,
`docs/marea/design-system/MC17-ANGULAR-COMPONENT-ARCHITECTURE.md`.
