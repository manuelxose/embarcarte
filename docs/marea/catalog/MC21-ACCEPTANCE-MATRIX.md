# MC-21 — Acceptance matrix

Status vocabulary: `PASS` (measured evidence), `PARTIAL` (measured with a recorded gap),
`FAIL` (measured failure), `NOT_RUN` (not executed), `NOT_APPLICABLE`. A criterion is PASS only
with a real command result; inherited/external items stay NOT_RUN/PARTIAL.

| ID | Criterion | Evidence artifact | Command | Expected | Status |
| --- | --- | --- | --- | --- | --- |
| AC-01 | Six-family projection, canonical order, deterministic | `catalog.generated.ts`; `catalog-projection.json`; `catalog-canonical-mapping.json` | `node scripts/build-mc20-catalog-data.mjs --check` | exit 0; 6 families (NAV,HUB,AIS,SENSE,WATCH,WEATHER), 18 editions, byte-stable | PASS |
| AC-02 | Canonical identity copied byte-for-byte | projection vs `product-families.json` | `npm run test:mc20` (MC20-01/02/03) | 6×11 dimensions equal canonical; all `NOT_FOR_SALE` | PASS |
| AC-03 | 18 edition records keep id/family/type/definitionStatus/featureKeys | projection vs `product-editions.json` | `npm run test:mc20` (MC20-04) | 18 editions; SENSE=8, WEATHER=2, WATCH=2; 0 merchantable/SKU/price | PASS |
| AC-04 | Bundle inclusions match canonical composition | projection vs `bundle-compositions.json` | `npm run test:mc20` (MC20-09) | WEATHER(START/CRUISE/COMPLETE), SENSE(SAIL/PROTECT/COMPLETE), WATCH(PROTECT/COMPLETE/FLEET) | PASS |
| AC-05 | 12 preview routes, all Server, all internal | `models/catalog-identity.ts` | `npm run test:mc20` (MC20-23) | 6×2 routes under `internal/catalog/` or `en/internal/catalog/` | PASS |
| AC-06 | ES/EN structural + semantic parity | `content/{weather,sense,watch}.ts` | `npm run test:mc20` (MC20-16/17/18, MC21-02) | 0 empty/identical pairs, negations present, 0 ES-clustering in EN | PASS |
| AC-07 | Frozen 11 sections per family | `catalog-page.ts` | `npm run test:mc20` (MC20-10/19/20) | 10 sections + hero in order; 0 per-family branch | PASS |
| AC-08 | Data-source provenance (evidence class + real source per block) | content blocks | `npm run test:mc20` (MC20-12, MC21-03) | every block has evidenceClass + ≥1 existing source file | PASS |
| AC-09 | Honest availability (no fabricated status) | readiness panel + copy | `npm run test:mc20` (MC20-02/03, MC21-05) | `NOT_FOR_SALE`, `NOT_VERIFIED`, `NOT_GRANTED`, `NOT_SELECTED` verbatim | PASS |
| AC-10 | Licensed provider named only when contracted (WEATHER) | `content/weather.ts` + guards | `npm run test:mc20` (MC21-04) | 0 unlicensed provider name; `providerRightsGranted=false`; no forecast accuracy | PASS (F-1 closed) |
| AC-11 | SENSE limitations (no accuracy/ingress/NMEA-2000/remote-alert) | `content/sense.ts` | `npm run test:mc20` (MC21-06) | `NOT_MEASURED`/`NOT_VERIFIED`/`NOT_IMPLEMENTED` rendered | PASS |
| AC-12 | WATCH limitations (no guaranteed alert, not distress, no steering) | `content/watch.ts` | `npm run test:mc20` (MC21-07) | `NOT_VERIFIED`/`NOT_FOUND`; GATE-PRIVACY-DPA-DPIA | PASS |
| AC-13 | Prohibited commercial claims rejected (both locales) | `mc20-catalog-guards.mjs` + content | `npm run test:mc20` (MC20-15) + `npm run test:mc20:unit` | 0 prohibited claims; negative controls rejected | PASS |
| AC-14 | Gate preservation (10 governance gates verbatim) | delivery/audit records | `npm run test:mc20` (MC20-36, MC21-08) | TRADEMARK…NOT_GRANTED … GATE-PRIVACY-DPA-DPIA=BLOCKED present | PASS |
| AC-15 | Production isolation (0 identifiers; public paths 404) | `npm run build` output + e2e | `npm run build`; `npm run test:mc20` (MC20-29/30/34/35) | 0 identifiers; `/marea/*` 404; sitemap unchanged | PASS |
| AC-16 | SSR + hydration, no console error | `e2e/catalog/catalog.spec.ts` | `npm run test:mc20:e2e` | 12 routes 200, noindex, `data-marea-catalog-family`, hydration clean | PASS |
| AC-17 | a11y (axe 0 critical/serious; keyboard) | Playwright + axe | `npm run test:mc20:e2e` | axe 0 critical/serious; skip-link focus | PASS |
| AC-18 | Responsive (no horizontal overflow) | Playwright viewports | `npm run test:mc20:e2e` | no overflow 320/390/768/1440 | PASS |
| AC-19 | Production + preview build | `dist/**` | `npm run build`; `npm run build:landing:preview` | exit 0 | PASS |
| AC-20 | MC-20 batch-1 non-regression | NAV/HUB/AIS pages | `npm run test:mc20`; `npm run test:mc20:e2e` | batch-1 assertions still pass | PASS |
| AC-21 | MC-18/MC-17 non-regression | landing/DS | `npm run test:landing:unit` (45/45); MC20-21/22 (design-system/landing byte-identical) | unchanged | PASS |
| AC-22 | Format & dependencies | prettier + lockfile | `npm run format:check`; MC20-31 | format clean; lockfile unchanged | PASS |
| AC-23 | Adversarial/negative cases | `check-mc20-catalog.test.mjs` | `npm run test:mc20:unit` | 39/39; all negative mutations rejected | PASS |
| AC-24 | Inherited `FINANCIAL_V18` not bypassed | financial suite | `npm run test:financial` | remains FAIL 76/77 (unchanged) | PASS |
| AC-25 | Independent review, 0 open BLOCKING/MAJOR | `MC21-INDEPENDENT-AUDIT.md` (verifier t7 + external auditor) | verifier re-runs AC-01..24 | `OPEN_BLOCKING_OR_MAJOR = 0`; review `pass`; external findings XA-01..04 repaired | PASS |
| AC-26 | External audit findings closed | `MC21-INDEPENDENT-AUDIT.md`; commit `f7d3a3a` | generator `--check`; `test:mc20`; `test:mc20:unit`; `test:mc20:e2e` | 50/50, 39/39, 60/60; COMPLETE SENSE = 4 canonical rows | PASS |
| AC-27 | Model-routing constraint honoured | `MC21-AGENT-EXECUTION-AND-MODEL-ROUTING.md`; D-088 | document inspection | no Claude Opus 5.5 used after the product-owner instruction; ceiling Sonnet 5.5 | PASS |

## Outstanding gaps carried forward

- `PROFESSIONAL_EN_REVIEW` — professional English review of the new families' EN copy (NOT_RUN).
- Manual WCAG 2.2 AA / assistive-technology review (NOT_RUN; MC-19 AC08 / MC-20 AC-11 inheritance).
- Accepted MINOR residuals XA-05, XA-06, XA-07, XA-08, XA-12 and INFO XA-13, recorded in
  `MC21-INDEPENDENT-AUDIT.md` with their rationale.

## Edition-count correction

The original acceptance assumption of "12 editions" was corrected to **18** (canonical MC-16 has
8 SENSE editions). Decision D-085 records the amendment; AC-03 above reflects the corrected count.
