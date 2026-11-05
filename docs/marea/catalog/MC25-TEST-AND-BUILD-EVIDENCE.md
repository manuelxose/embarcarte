# MC-25 test and Angular build evidence

Every row is an executed command on the delivered branch, not a summary. The
final run is re-executed on the delivery commit and recorded in the delivery
record.

## 1. TypeScript

| Command | Result |
| --- | --- |
| `node scripts/run-tsc.mjs` | PASS — `tsc -p tsconfig.app.json --noEmit` exit 0; `tsc -p preview/landing/tsconfig.json --noEmit` exit 0 |

## 2. Real Angular build gate (not a typecheck substitute)

Command:

```text
node scripts/check-mc24-build.mjs \
  --component src/app/marea-catalog/sections/section-sku-governance.ts \
  --marker data-mc25-governance \
  --member mc25DeliberatelyMissingBinding \
  --export MareaCatalogSkuGovernance
```

| Stage | Result |
| --- | --- |
| `ng build marea-landing-preview` (positive) | PASS exit 0 |
| `ng build embarcarte` (positive, production) | PASS exit 0 |
| Injected invalid binding in the governance component | **rejected** by the Angular compiler: `TS2339: Property 'mc25DeliberatelyMissingBinding' does not exist on type 'MareaCatalogSkuGovernance'` |
| Fixture leak check | PASS — no fixture in the source tree |
| Verdict | **PASS — preview and production builds succeed AND an invalid template binding is rejected** |

The gate is reused through argv; the MC-24 invocation keeps its defaults. One
earlier run failed the production build with no reproducible cause (consistent
with a Windows file lock on `dist` from a concurrent validator run); a direct
`ng build embarcarte`, a second gate run and the final gate run all passed. The
transient is recorded rather than hidden.

## 3. MC-25 suites

| Command | Result |
| --- | --- |
| `npm run test:mc25` (`check-mc25-governance.mjs`) | **20/20 PASS** |
| `npm run test:mc25:unit` (`check-mc25-governance.test.mjs`, node:test) | **58/58 PASS** |
| `node scripts/test.mjs` (confined stages) | **7/7 PASS** (mc20, data, mc23data, mc23, unit, mc25, mc25unit) |
| `npm run check:mc25:data` | PASS — projection up to date (9 families, 26 editions, 26 candidates, 13 gates) |
| `npx playwright test -c playwright.catalog.config.ts --grep "@mc25"` | **15/15 PASS** |

## 4. Inherited regression suites

| Command | Result |
| --- | --- |
| `check-mc20-catalog.mjs` (MC-20/21/22) | **56/56 PASS** |
| `check-mc23-bundles.mjs` | PASS (13/13) |
| `check-mc23-bundles.test.mjs` | 16/16 PASS (one expectation corrected for F-15; see remediation doc) |
| `check-mc24-configurator.mjs` | **13/13 PASS** |
| `check-mc24-configurator.test.mjs` | **26/26 PASS** |
| `npx playwright test -c playwright.catalog.config.ts` (all catalog) | **116/116 PASS** (101 inherited + 15 MC-25) |
| `node scripts/check-i18n.mjs` | PASS — foundation + server-rendering |
| `node scripts/check-seo.mjs` | PASS — 101 sitemap URLs |
| `node scripts/check-commerce.mjs` | PASS |

## 5. Accessibility automation

| Check | Result |
| --- | --- |
| axe-core, ES initial state | 0 critical/serious violations |
| axe-core, ES after a review action | 0 critical/serious violations |
| axe-core, EN initial state | 0 critical/serious violations |
| axe-core, EN after a review action | 0 critical/serious violations |
| Keyboard reach of both selectors and the skip link | PASS |
| Responsive: no horizontal overflow at 1440/768/390/320 | PASS |

**Not performed:** screen-reader or other assistive-technology testing. No WCAG
conformance is claimed.

## 6. Public-build isolation

| Check | Result |
| --- | --- |
| `MC20-30` production bundle scan (inherited, re-run after the final production build) | 168 production bundle files, **0 catalogue identifiers** |
| Governance path in public route tables | absent (`MC25-12`, unit `c5`) |
| External network calls in governance modules | 0 (`MC25-13`, unit `c4`) |

## 7. Formatting state

`npx prettier --check src/app/marea-catalog preview/landing` reports exactly the
six inherited MC-23 files, identical to the MC-24 baseline. MC-25 added no new
formatting failure; the six files are declared debt (`RES-MC25-03`) and were not
silently reformatted.

## 8. Failure demonstrations (not only happy paths)

- Invalid template binding rejected by the compiler (build gate).
- Fabricated upgrade paths rejected with six distinct codes (unit `f2-3`…`f2-8`).
- Unknown edition distinguished from exclusion (unit `f15-1`…`f15-6`).
- Snapshot mutation attempts throw (unit `t1`).
- Prohibited/forged admin actions refused (unit `a2`–`a6`).
- A deliberately commercial claim is still rejected by the claim guard
  (`MC25-18` positive control).
- `assertNotOrderable` throws on a forged orderable decision (unit `t3`).
