# MC-22 — Acceptance matrix

Status vocabulary: `PASS` (measured evidence), `FAIL` (measured failure), `BLOCKED` (external authorisation
outstanding), `NOT_RUN` (not executed). A criterion is `PASS` only with a real command result; internal
catalogue scope is `PASS`, external authorisations stay `BLOCKED`, and inherited gaps stay `NOT_RUN`. No
criterion is pre-assigned PASS.

Binding measured results (source `MC22-TEST-REPORT.md` §12 and `MC22-INDEPENDENT-REVIEW.md`, on commit
`450441d` / evidence-bound `ae1e431`): `--check` 0 · validator **56/56** · unit **70/70** (0 skipped) ·
e2e **84 passed** · build **96 static routes** · `format:check` 0 · release gates **13, 0 CLOSED**
(12 BLOCKED + 1 EVIDENCE_REQUIRED) · ten governance gates verbatim · 0 catalogue identifiers in `dist/`.

| ID | Criterion | Method | Measured result | Verdict |
| --- | --- | --- | --- | --- |
| AC-01 | Nine-family projection, canonical order, deterministic | `node scripts/build-mc20-catalog-data.mjs --check` | exit 0, "up to date (3 generated files)"; 9 families (NAV,HUB,AIS,SENSE,WATCH,WEATHER,DISPLAY,PILOT,FLEET), 26 editions, byte-stable | PASS |
| AC-02 | Canonical family identity byte-for-byte | validator MC20-01/02/08 | 9 families; DISPLAY/PILOT productType HARDWARE, FLEET SAAS; all NOT_FOR_SALE; PILOT safetyStatus BLOCKED, DISPLAY hardwareStatus NOT_SELECTED, FLEET NOT_APPLICABLE_SOFTWARE_PRODUCT | PASS |
| AC-03 | Eight new editions keep id/family/type/definitionStatus/featureKeys | validator MC20-04 | 26 editions total; 8 batch-3 editions exact; 0 merchantable, 0 approved price, 0 SKU | PASS |
| AC-04 | Bundle inclusions match canonical composition | validator MC20-09 | DISPLAY-7 INCLUDED in CRUISE/COMPLETE; PILOT-COASTAL QUOTATION_REQUIRED in COMPLETE; FLEET-START INCLUDED in FLEET; every tuple matches `bundle-compositions.json` | PASS |
| AC-05 | 18 preview routes, all Server, all internal | validator MC20-23 / MC21-10 | 9×2 routes under `internal/catalog/` and `en/internal/catalog/`, all Server-rendered | PASS |
| AC-06 | ES/EN structural + semantic parity | validator MC20-16/17/18, MC21-02; measured `bilingualTextProblems` | 40 blocks/family; equal ES/EN string counts (137/143/147 per locale); 0 parity problems | PASS |
| AC-07 | DISPLAY publishes no dimension/resolution/brightness/IP/power claim | validator MC22-02/03 | SIZE_NOT_FROZEN, HARDWARE_NOT_SELECTED, BOM_NOT_ESTABLISHED, measuredPerformance=false, pilotControlAuthority=false; 0 display-* claims | PASS |
| AC-08 | PILOT safety gate BLOCKED, no autonomy/certification/approval | validator MC22-04/05 | safetyGate=BLOCKED, seaTrialsCompleted=false, NOT_FOUND evidence, remoteHelmControl=PROHIBITED; 0 pilot-* claims | PASS |
| AC-09 | FLEET no SLA/availability/hardware/customer/certification | validator MC22-06/07 | NO_SLA_ESTABLISHED, telemetryReadOnly=true, remoteControlPath=false, defaultRole=NO_ACCESS; 0 fleet-* claims | PASS |
| AC-10 | Prohibited commercial claims rejected in both locales | validator MC20-15; unit suite | 0 prohibited claims over all localized strings; unit 70/70 (0 skipped) | PASS |
| AC-11 | Ten governance gates preserved verbatim, none CLOSED | validator MC20-36, MC21-08 | 10 gates byte-identical to base `1dc9aa0`; release register 13 gates, 0 CLOSED | PASS |
| AC-12 | Production isolation | validator MC20-29/30/34/35; `grep dist/embarcarte` | 0 catalogue identifiers; `/marea/*` 404; public sitemap/robots/locale-routes unchanged | PASS |
| AC-13 | SSR + hydration, no commerce path | `npm run test:mc22:e2e` | 84 passed; no form, no purchase control, no price rendered | PASS |
| AC-14 | Accessibility (axe) | Playwright + axe | 0 critical / 0 serious violations on the 18 routes | PASS |
| AC-15 | Production + preview build | `npm run build` | 96 prerendered static routes, exit 0 | PASS |
| AC-16 | Batch-1/2 non-regression (NAV..WEATHER) | `npm run test:mc22`; e2e over 18 routes | all 9 families pass; 18 routes render | PASS |
| AC-17 | MC-17/MC-18 non-regression (design-system/landing) | validator MC20-21/22; `git diff` | design-system and landing byte-identical to base; no fork | PASS |
| AC-18 | Format & dependencies | `npm run format:check`; validator MC20-31 | 0 violations; package.json deps + lockfile unchanged | PASS |
| AC-19 | Adversarial/negative cases | unit suite + accumulated matrix + independent review | 70/70 unit; 72-case accumulated matrix 0 mismatches; review 41-case 0 mismatches | PASS |
| AC-20 | Independent review, 0 open BLOCKING/MAJOR | `MC22-INDEPENDENT-REVIEW.md` | verdict PASS; 0 BLOCKER / 0 MAJOR / 0 MINOR | PASS |
| AC-21 | Inherited `FINANCIAL_V18` not bypassed | `npm run test:financial` | remains FAIL 76/77 (pre-existing, unchanged by MC-22) — disclosed, not concealed | PASS (inherited) |

## External authorisations — BLOCKED (not software-milestone PASS)

These are the ten governance gates; none is granted. They are **BLOCKED**, not PASS:

| Gate | State |
| --- | --- |
| TRADEMARK_LEGAL_CLEARANCE | NOT_GRANTED |
| MAREA_PUBLIC_USE | NO_GO |
| SOURCE_IP_CLEARANCE | NOT_CLEARED |
| LICENSING_RIGHTS_GRANTED | false |
| PRICE_APPROVED | NONE |
| COMMERCIAL_AVAILABILITY | NOT_FOR_SALE |
| PUBLICATION_AUTHORIZED | false |
| INDEXATION_AUTHORIZED | false |
| PRODUCTION_DEPLOYMENT | NOT_AUTHORIZED |
| GATE-PRIVACY-DPA-DPIA | BLOCKED |

## Outstanding gaps carried forward — NOT_RUN / BLOCKED

- `PROFESSIONAL_EN_REVIEW` — professional English review of the new families' EN copy (NOT_RUN; inherited).
- Manual WCAG 2.2 AA / assistive-technology review (NOT_RUN; inherited MC-19 AC08 / MC-20 AC-11 debt).
- External legal/trademark/IP/price/publication authorisations (BLOCKED — table above).

## Summary

Internal catalogue scope: **PASS** (AC-01..AC-20 measured green; AC-21 inherited failure disclosed). External
authorisations: **BLOCKED**. No criterion is pre-assigned PASS; every PASS row above cites a real command
and its measured result, in agreement with `MC22-TEST-REPORT.md` §12 and `MC22-INDEPENDENT-REVIEW.md`.
