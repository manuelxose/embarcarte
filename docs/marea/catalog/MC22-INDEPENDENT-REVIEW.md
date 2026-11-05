# MC-22 — Independent review (attempt 2 · verifier) — product truth, safety, isolation, evidence integrity

| Field | Value |
| --- | --- |
| Milestone | MC-22/36 — product catalogue batch 3 (DISPLAY, PILOT, FLEET) ES/EN |
| Reviewer | `verifier` member (independent; author of no implementation/content/validator/test task) |
| Branch | `feature/marea-mc22-display-pilot-fleet-catalog` |
| Base | `1dc9aa0d85d418709cfaccd41fe1f2335462c672` |
| Verdict | **needs_revision** — 1 HIGH + 1 MEDIUM + 2 LOW findings, 0 BLOCKER |

This is attempt 2 of the MC-22 independent review. It supersedes the attempt-1 review
(which returned `needs_revision` with findings F1–F4). The attempt-1 MAJOR guard findings F1 and F2
are now **closed** by an undocumented "r2" hardening round present in the current working tree; the
remaining HIGH finding (uncommitted delivery state) and a newly reproduced MEDIUM false-negative keep
the verdict at `needs_revision`.

## 0. Measured delivery state (evidence integrity)

- `git rev-parse HEAD` → `1dc9aa0d85d418709cfaccd41fe1f2335462c672` — **HEAD equals the base**.
- `git diff --stat 1dc9aa0..HEAD` → **empty**.
- The entire MC-22 change set is uncommitted working-tree state: 14 modified tracked files + 8 untracked
  files (`src/app/marea-catalog/content/{display,pilot,fleet}.ts`, `MC22-TEST-REPORT.md`,
  `MC22-SECURITY-AND-ISOLATION-EVIDENCE.md`, `evidence/mc22-verifier-run.json`,
  `evidence/mc22-reverification-r1.json`).
- The evidence records bind to `HEAD = 1dc9aa0` (the base) — there is no MC-22 commit/tree id to
  content-bind the verification. → **F3**.

## 1. Product truth (independently traced to canonical data)

Read in full: `src/app/marea-catalog/content/{display,pilot,fleet}.ts`. Traced every capability,
limitation and readiness statement to `docs/marea/commerce-data/data/{product-families,product-editions}.json`
and `docs/marea/products/product-definitions.batch-0{2,3}.json`. Measured, not assumed:

- **DISPLAY** — `sizeState=SIZE_NOT_FROZEN`, `hardwareState=HARDWARE_NOT_SELECTED`,
  `bomState=BOM_NOT_ESTABLISHED`, `measuredPerformance=false`, `pilotControlAuthority=false`,
  `chartRightsGranted=false` (product-definitions.batch-03.json:673–683). Content renders them verbatim
  and publishes no dimension, resolution, brightness, IP rating or power figure. "DISPLAY 7" is a
  working label, not a measurement. The canonical `priceHypothesis` (699 EUR) and edition
  `priceState=HYPOTHESIS_UNAPPROVED` are correctly *not* published — the content says "no approved price".
- **PILOT** — `safetyGate=BLOCKED`, `seaTrialsCompleted=false`, `remoteHelmControl=PROHIBITED`,
  `physicalEstopEvidence/motorIsolationEvidence/rudderFeedbackEvidence=NOT_FOUND`, steering modes
  `HEADING_HOLD=NOT_VERIFIED`, `WIND_ANGLE/ROUTE_FOLLOW=CONDITIONAL_ON_VERIFICATION`
  (batch-02.json:568–592). Content renders supervised-only, never autonomous, never a certified
  autopilot, never sellable. `PILOT-COASTAL` `priceHypothesis` (1290 EUR) is correctly not published.
- **FLEET** — `multiTenantProductionService=false`, `slaEstablished=false` (`NO_SLA_ESTABLISHED`),
  `telemetryReadOnly=true`, `remoteControlPath=false`, `defaultRole=NO_ACCESS`,
  `securityCertificationClaimed=false`, `customerProductionDataUsed=false` (batch-03.json:1823–1842);
  8 roles (batch-03.json:363–372). Content keeps the B2B identity with no invented SLA, contract,
  customer, hardware or certification. `FLEET-START` `priceHypothesis` (49 EUR/mo) is correctly not published.
- Evidence classes are honest: undeployed/unverified behaviour is `OPEN`/`BLOCKED`/`HYPOTHESIS`/`ASSUMPTION`;
  `VERIFIED_REPO` is reserved for canonical dataset status strings and design-boundary facts. No
  unimplemented behaviour is labelled `VERIFIED_REPO`.

**Result: PASS** — no invented capability, figure, autonomy, SLA, certification or customer deployment.

## 2. Commercial / legal boundary

- No currency symbol, amount, EUR/USD, SKU code, stock row, order/checkout flow, lead capture, public
  route, `canonical`/`hreflang`/`sitemap`/JSON-LD or indexation signal was introduced (grepped over the
  content files and the full diff; the only "canonical" matches refer to "canonical data/composition",
  not SEO). No public-route/SEO file (`locale-routes.ts`, sitemap, robots) changed.
- The ten governance gates are byte-identical to base `1dc9aa0`
  (`git show 1dc9aa0:…/catalog.generated.ts` vs working tree — identical).
- 13 release gates, 0 CLOSED; 42 claims catalogued, 0 publicly authorised; 0 approved prices, 0
  merchantable editions, 0 merchant SKUs, 0 stock rows, 0 tested compatibility rows — all match
  `catalog-projection.json` facts.

**Result: PASS.**

## 3. Architecture

Single component/content tree extended in place; `CATALOG_SCOPE_FAMILY_IDS` in
`catalog.generated.ts` is the single typed source of the nine-family scope, consumed by
`models/catalog-view.ts` (`CATALOG_PAGE_FAMILIES = CATALOG_SCOPE_FAMILY_IDS`),
`models/catalog-identity.ts`, `content/index.ts` and the validator. No component fork, no MC-17
selector fork, no duplicate source of product truth. **Result: PASS.**

## 4. Tests and evidence

- No test deleted, skipped or weakened. `node --test scripts/check-mc20-catalog.test.mjs` measured
  **66 tests / 66 pass / 0 fail / 0 skipped** (the "r2 hard acceptance matrix" at lines 785–854 is the
  +5 delta over the recorded 61).
- The validator's MC22-01..07 checks read canonical definitions + rendered content and fail closed;
  `build-mc20-catalog-data.mjs --check` exits 0 (byte-stable).
- **Evidence lag**: the machine-readable records still report unit = 61
  (`mc22-reverification-r1.json` line 49; `MC22-TEST-REPORT.md` §10.2 line 168), while the working tree
  now carries 66 unit tests. The r2 round is not documented. → **EVI-02** (LOW, additive — no weakening).

## 5. Adversarial ES/EN negation probe (independent, executed by the reviewer)

Ran `catalogClaimProblems` from `scripts/mc20-catalog-guards.mjs` in a temp script outside the repo.

Attempt-1 F1/F2 are now **closed** (verified both by the r2 unit tests and by direct probing):
`"El hardware está incluido."`, `"El hardware viene incluido."`, `"Hardware is included by default."`,
`"The hardware comes included."` → REJECTED; `"Las pruebas de mar se completaron."`,
`"Se realizaron las pruebas de mar."` → REJECTED. Honest disclaimers remain ALLOWED.

One **new false-negative reproduced** (not in the t10 15-input matrix, not covered by any current test):

| Input | Expected | Measured | Rule |
| --- | --- | --- | --- |
| "Pantalla de cinco pulgadas." | reject | **ALLOWED** | display-dimension |
| "Pantalla de seis pulgadas." | reject | **ALLOWED** | display-dimension |
| "Pantalla de veinte pulgadas." | reject | **ALLOWED** | display-dimension |
| "Pantalla de treinta pulgadas." | reject | **ALLOWED** | display-dimension |
| "Pantalla de cincuenta pulgadas." | reject | **ALLOWED** | display-dimension |
| "Screen of five inches." | reject | **ALLOWED** | display-dimension |
| "A five-inch display." | reject | **ALLOWED** | display-dimension |
| "A fifty-inch display." | reject | **ALLOWED** | display-dimension |

The `display-dimension` spelled-out alternation covers only ES 7–15 (`siete`…`quince`) and EN 7–12
(`seven`…`twelve`); spelled-out sizes outside that range pass the guard and therefore also pass
validator MC22-03. → **FNE-01** (MEDIUM).

## Findings

| id | severity | file | line | problem | requiredFix |
| --- | --- | --- | --- | --- | --- |
| F3 | high | (working tree — no commit) | — | The MC-22 implementation is uncommitted: HEAD == base `1dc9aa0`, `git diff 1dc9aa0..HEAD` empty; all changes are working-tree-only and the evidence records bind to the base commit, not to MC-22 bytes. No content-bound tree id exists. | Captain commits the full MC-22 change set to the branch and regenerates evidence records against that commit/tree id before the delivery gate. |
| FNE-01 | medium | scripts/mc20-catalog-guards.mjs | ~103 | `display-dimension` misses spelled-out sizes outside 7–15 (ES) / 7–12 (EN): "cinco/veinte/cincuenta pulgadas", "five-inch/fifty-inch display" are not rejected, so a spelled-out invented dimension would pass the guard and validator MC22-03. | Extend the spelled-out cardinal alternation to the full plausible range in both locales (or match "spelled cardinal + dimension unit" generically) and add unit tests for 1–6 and 16+. |
| EVI-02 | low | docs/marea/catalog/evidence/mc22-reverification-r1.json; MC22-TEST-REPORT.md §10.2 | 49 / 168 | Evidence records report unit = 61 while the working tree now carries 66 unit tests (the undocumented "r2 hard acceptance matrix"); the r2 round is not recorded. | Refresh the evidence records and test report to the actual 66-test state and document the r2 round. |
| LANG-01 | low | src/app/marea-catalog/content/display.ts | 366, 539 | EN copy uses "chartography" (non-standard) for "cartography"; ES "cartografía" is correct. | Replace "chartography" with "cartography". |

Resolved since attempt 1: **F1** (fleet-hardware-included copula forms) and **F2** (sea-trial ES
preterite) are closed by the r2 guard + test hardening; **F4** (report 57 vs 56) is addressed by the
"(pre-repair figure)" annotation in `MC22-TEST-REPORT.md` §1.

## Verdict

**needs_revision** — 0 BLOCKER, 1 HIGH (uncommitted delivery state → evidence not content-bound),
1 MEDIUM (new DISPLAY spelled-out-dimension false-negative), 2 LOW. Product truth, safety language,
commercial/legal boundary, architecture and test integrity are correct as shipped; the two attempt-1
guard findings are closed. The uncommitted state and the dimension-guard gap must be resolved before a
pass verdict.
