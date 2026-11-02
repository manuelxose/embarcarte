# MC-12 — Independent audit and review (D17)

| Field | Value |
|---|---|
| Milestone | MC-12/36 — recurring/data licensing and per-SKU contribution economics (ex-VAT) |
| Reviewer | Agent H (independent auditor; did not author the implementation) |
| Review date | 2026-11-02 |
| **Re-verified commit (current)** | **`8f819c19a86d58b893bfab29a53d5a13c38fe2dc`** (`8f819c1`, branch head; remote head matches) |
| Previously reviewed commit | `fe970624bc7c41ae5ffe0fb578c194fcb6a795f1` (`fe97062`) — verdict was PARTIAL |
| Base / predecessor | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` (MC-11) |
| Branch | `feature/marea-mc12-recurring-data-unit-economics` |
| Machine companion | [review-findings.json](../data/review-findings.json) |
| **Final verdict** | **`PASS_INTERNAL_ECONOMICS_SCOPE`** for the code/data/gate scope at `8f819c1`, conditional on record-refresh items R1–R4 (§8). External commercial evidence unchanged: `BLOCKED_OR_NOT_OBTAINED` |

## 1. Method of this re-verification

1. Verified `git rev-parse HEAD` = `8f819c1`, ancestry (`fe97062` is its parent), clean tracked tree,
   remote head via `git ls-remote`, and PR states via `gh`.
2. Reviewed the **actual** correction diff `fe97062..8f819c1` (14 files, +1,284/−99) — not the change summary.
3. Confirmed the correction commit touches only MC-12 economics/scripts/registry; no MC-11 file, no app file.
4. Compared the corrected datasets against `fe97062`: all arithmetic values and cost lines are **unchanged**;
   the changes are additive (`recurringCostExposure`, `componentInclusions`, `conditionalComponents`,
   `fixedUnknownCosts`, `familyId`/basis annotations) plus the intentional PILOT/FLEET-SUBSCRIPTION null-cost
   component entries (SAIL, COMPLETE, FLEET).
5. Re-ran the full gate set (§3), re-ran my own independent arithmetic recomputation (§4), and independently
   reproduced the five new negative controls as in-memory mutations (§4, last row).
6. Updated findings F01–F12 and added F13–F16 for residuals found during re-verification (§7).

The independent recomputation script was again written from scratch under `.recon/audit/` and deleted after
use; it does not import the validator for arithmetic (the validator is imported only to confirm which check
fails under in-memory mutations).

## 2. Frozen-state and ancestry verification

| Check | Result | Evidence |
|---|---|---|
| HEAD equals correction commit | VERIFIED | `git rev-parse HEAD` → `8f819c19a86d58b893bfab29a53d5a13c38fe2dc`, exit 0 |
| Remote head equals local head | VERIFIED | `git ls-remote origin feature/marea-mc12-recurring-data-unit-economics` → `8f819c19…` |
| `fe97062` is the parent | VERIFIED | `git log --oneline -3`; `git merge-base --is-ancestor fe97062 8f819c1` exit 0 |
| Tracked worktree clean | VERIFIED | `git status --porcelain` → only `?? .recon/` (pre-existing untracked author scratch, not committed) |
| Correction diff scope | VERIFIED | 14 files: 11 `docs/marea/economics/**`, 1 registry row, 2 scripts. No `docs/marea/hardware/`, `bundles/`, `products/`, app or package change |
| No MC-11 regression | VERIFIED | No hardware file in diff; D-04 recomputed 19-file SHA-256 baseline PASS |
| Arithmetic immutability vs `fe97062` | VERIFIED | All 50 unit-economics records and 6 bundles: monetary fields and cost lines byte-identical; only additive fields and intended null-cost components changed |
| PR #18 unchanged | VERIFIED | `gh pr view 18` → OPEN, draft, MERGEABLE, mergedAt null |
| PR #19 unchanged/stacked/unmerged | VERIFIED | `gh pr view 19` → OPEN, draft, MERGEABLE, mergedAt null, base `feature/marea-mc11-hardware-sourcing-conformity` |

## 3. Re-execution results (exact commands)

| Command | Exit | Result |
|---|---|---|
| `node scripts/check-marea-unit-economics.mjs` | 0 | `49 checks — 49 PASS / 0 FAIL` |
| `node --test --test-isolation=none scripts/check-marea-unit-economics.test.mjs` | 0 | `tests 64 / pass 64 / fail 0` |
| `npm run test:economics` | 0 | 49/49 PASS |
| `npm run test:hardware` | 0 | `54/54 checks passed` |
| `node --test --test-isolation=none scripts/check-marea-hardware.test.mjs` | 0 | `tests 59 / pass 59 / fail 0` |
| `npm run format:check` | 0 | `All matched files use Prettier code style!` |

## 4. Independent recomputation and negative-control verification

| Check | Records | Result |
|---|---|---|
| Unit-economics arithmetic: net revenue, known variable cost, contribution, headroom, break-even gross price, contribution % | 50 | **0 mismatches** |
| MC-11 reconciliation: Σ lines = knownSubtotal, tooling field = COST-16, no double count, install handling | 90 scenarios | **0 mismatches** |
| Subscription annualisation | 7 | **0 mismatches** |
| Sensitivity / stress / decision scores recomputed from base records | 70 / 4 / 9 | **0 mismatches** |
| Bundle aggregates: net revenue, component-cost sum, contribution, % suppression | 6 | **0 mismatches** (numeric values unchanged from `fe97062`) |
| Bundle composition: required/allowed families, componentInclusions line existence/type, SENSE kit quantities (ESSENTIALS×2, COMPLETE×4), FLEET hardware-free | 6 | **0 violations** (PILOT/FLEET-START null cost accepted, never counted) |
| Provider classes / rights / blockers / manifest counts | 53 / 11 / 23 / manifest | classes sum **53** (incl. 1 engineering assumption); rights 11 (7/3/1), blocking 9; blockers 23 (14/8/1), 19 external; `classSum` 53; all reconciled |
| R-01 requirement re-derived independently | HUB, WATCH, DISPLAY, AIS | HUB/DISPLAY/AIS satisfied via `recurringCostExposure`; WATCH via declared UNKNOWN categories; **4/4 satisfied** |
| New negative controls reproduced as in-memory mutations via `validate()` | 5 | R-01 (HUB stripped, global cloud intact) → failures `['R-01']`; PR_CREATED=false → `['D-03']`; A-06 missing NAV / conditional SENSE / invented ST-99 → `['A-06']` each — **all 5 genuinely fail the intended check** |

## 5. What the correction commit changed (reviewed, not trusted)

| Area | Verified change | Evidence |
|---|---|---|
| F01 R-01 | Per-family condition now `!hasRecurringLine && !declaredUnknown && !declaredExposure`; `cloudPerDevice` no longer gates it | `scripts/check-marea-unit-economics.mjs:2115-2127` |
| F02 exposure | HUB/DISPLAY/AIS records carry `recurringCostExposure` (`UNKNOWN`/`NOT_APPLICABLE` with rationale); 26 records | `unit-economics.json` |
| F03 status | `PR_CREATED: true` in manifest and frozen block; D-03 negative test added | `manifest.json:53`, `mjs:104`, `test.mjs:775` |
| F04/F05/F06 docs | D19/D18/D13/registry state 11 rights (9 blocking) and 23 blockers (14/8/1, 19 external); evidence table adds `ENGINEERING_ASSUMPTION 1`; manifest `classSum: 53` | `MC-12-DELIVERY.md`, `MC12-EXECUTIVE-REPORT.md`, `MC12-BLOCKER-REGISTER.md`, `manifest.json:37,42` |
| F08/F09 bundles | SAIL/COMPLETE include required PILOT (null cost); FLEET includes FLEET-START (null); SENSE only in `conditionalComponents`; `componentInclusions` added; A-06 checks required/allowed families + line existence/type; 3 new negative tests | `bundle-economics.json`, `mjs:1598-1655`, `test.mjs:441,454,465` |
| F10 fixed costs | CERTIFICATION moved to `fixedUnknownCosts`; no longer in `unknownVariableCostCategories` | `bundle-economics.json` |
| F11 rounding | ASM-MC12-010 documents the allowance-derivation rounding rule | `assumptions.json` |
| F12 FX wording | Provider register scoped to individual cost registers and states bundle aggregates compose both bases | `MC12-PROVIDER-RESEARCH-AND-PRICE-REGISTER.md` §4 |

No check was weakened: R-01 and A-06 became strictly stricter, V-05 now also inspects components declared only
in `componentCosts`, and the A-06 null-cost allowance is conditional on the bundle total itself being non-numeric
(`mjs:1568-1576`), which cannot hide a numeric bundle discrepancy.

## 6. Dimension-by-dimension status (updated)

| Dim | Status | Evidence |
|---|---|---|
| A Scope/ancestry | PASS | §2 table |
| B Product/bundle identity | PASS | 9 families/26 editions; 6 bundles; required PILOT included, SENSE conditional-only, FLEET hardware-free, PILOT not a fixed price, AIS receive-only; independent composition check 0 violations |
| C Provider evidence | PASS | 53 records; 0 quotations/contracts; RFQ NOT_SENT; all sources dated; inaccessible/unknown null; classes sum 53 |
| D Licensing rights | PASS | 11 rights, 9 blocking; 0 GRANTED; chart/weather/NMEA not granted; docs corrected to 11 (7/3/1) |
| E Currency/VAT | PASS | All EUR; 21 %; net = gross/1.21 on all records; no VAT-inclusive net; conversions declared; FX wording scoped |
| F Per-SKU arithmetic | PASS | 50/50 records recomputed, 0 mismatches; numeric immutability vs `fe97062` confirmed |
| G Recurring aggregation | PASS | WATCH 6 lines incl. returns/notification; FLEET cloud/support/payment; inactive state ASM-MC12-020; no guaranteed delivery |
| H Scenarios/margins | PASS | 70/70, 4/4, 6/6, 9/9 recomputed; % suppressed with material unknowns; classifications consistent |
| I Governance/claims | PASS (status refresh pending) | No approved price/demand/profitability/break-even claim; PR_CREATED now true; `INDEPENDENT_REVIEW` still PENDING → F16 |
| J MC-11 no-regression | PASS | 90/90 COST-16/COST-12 invariants, D-04 hash, verdict strings unchanged |
| K Validation controls | PASS | 49 ids present; 64/64 tests; all 5 new controls independently fail the intended check; no self-comparison check found |
| L Deliverables/PR state | PARTIAL (docs refresh only) | D01–D19 substantive; 17 JSON contracts parse; links clean; PR state verified; stale test counts and registry placeholder → F07/F13 |

## 7. Findings status after re-verification

| ID | Sev | Status | Evidence of remediation / re-verification |
|---|---|---|---|
| F01 | MAJOR | **CLOSED_VERIFIED** | R-01 dead branch removed (`mjs:2126`); per-family mutation (HUB stripped, global cloud intact) → `['R-01']`; suite 64/64; gate 49/49 |
| F02 | MINOR | **CLOSED_VERIFIED** | `recurringCostExposure` on HUB/DISPLAY/AIS; independent R-01 re-derivation 4/4 satisfied |
| F03 | MAJOR | **CLOSED_VERIFIED** | `PR_CREATED: true` (manifest:53, mjs:104); D-03 mutation fails; D18/D19 true; PR #19 verified |
| F04 | MINOR | **CLOSED_VERIFIED** | D19/D18/registry now 11 rights (9 blocking: 7/3/1) matching the data |
| F05 | MINOR | **CLOSED_VERIFIED** | D19/D18/D13/registry now 23 blockers (14/8/1, 19 external) matching the data |
| F06 | MINOR | **CLOSED_VERIFIED** | `engineeringAssumptions: 1`, `classSum: 53`, D19 table adds the class; computed classes sum 53 (registry enumeration residual → F13) |
| F07 | MINOR | **OPEN (by design)** | Registry row still has placeholder "correction commit in the final head"; record commit must write `8f819c1`. No code/data impact |
| F08 | MINOR | **CLOSED_VERIFIED** | SAIL/COMPLETE include PILOT (null cost), FLEET includes FLEET-START (null), SENSE conditional-only; independent composition check 0 violations; numeric aggregates unchanged |
| F09 | MINOR | **CLOSED_VERIFIED** | A-06 required/allowed family + inclusion-line checks; 3 new tests independently fail A-06 only |
| F10 | INFORMATIONAL | **CLOSED_VERIFIED** | CERTIFICATION in `fixedUnknownCosts`; absent from variable-unknown list |
| F11 | INFORMATIONAL | **CLOSED_INFORMATIONAL** | ASM-MC12-010 documents rounding; 3 % of per-period-rounded annual net 98.16 = 2.9448 → 2.94; 0.01 artefact documented |
| F12 | INFORMATIONAL | **OPEN** | D04 wording scoped; decision-log D-051 unchanged (not in correction diff) and bundle JSON has no explicit FX-basis field; docs-only residual |
| **F13** | MINOR | **OPEN** | Stale gate counts: `MC-12-DELIVERY.md:97` and `MC12-EXECUTIVE-REPORT.md:61,171` still say 59/59 / 59 tests and registry row says "59-case"/"59/59" while actual is **64/64 / 64**; registry evidence enumeration still sums 52 (missing ENGINEERING_ASSUMPTION) |
| **F14** | MINOR | **OPEN** | `MC12-DATA-CONTRACT.md:181,214` does not document `recurringCostExposure`, `componentInclusions`, `conditionalComponents`, `fixedUnknownCosts`, nor their enumeration rules (componentInclusions omits PROTECT PR-07 whose cost is included, FLEET FP-04/FP-11; conditionalComponents omits FLEET FP-10). Docs-only; no arithmetic impact |
| **F15** | INFORMATIONAL | **OPEN** | `scripts/check-marea-unit-economics.test.mjs:640` title says "R-01 rejects WATCH…" but asserts `R-02`; cosmetic, non-blocking |
| **F16** | MINOR | **OPEN** | `INDEPENDENT_REVIEW = PENDING` still in `manifest.json:52`, `MC-12-DELIVERY.md:164`, `MC12-EXECUTIVE-REPORT.md:247`; closing it requires updating the frozen validator constant plus docs, which cannot be a docs-only record commit |

## 8. Verdict

**`PASS_INTERNAL_ECONOMICS_SCOPE`** — the internal economics scope is verified at `8f819c1`: 0 arithmetic
mismatches across 50 records / 90 scenarios / 70 sensitivity results / 4 stress cases / 6 bundles / 9 decision
scores; all F01–F11 original findings are closed with independently reproduced evidence; every commercial
governance flag holds (no approved price, no validated demand, no profitability/break-even claim, no right
granted, `NOT_FOR_SALE`, `MC13_STARTED=false`); PR #19 remains open, draft, stacked and unmerged.

The PASS is conditional on the following **record-refresh** actions, all documentation/status only unless
stated otherwise; none changes the economic model, datasets or gate logic:

- **R1 (F07):** write the correction commit SHA `8f819c1` into registry row 12, removing the placeholder.
- **R2 (F13):** update adversarial-suite counts to 64/64 (D19 §5, D18 §1/§7, registry) and add
  `ENGINEERING_ASSUMPTION` to the registry evidence enumeration so the classes sum to 53.
- **R3 (F14, F12):** document the new fields and their enumeration rule in `MC12-DATA-CONTRACT.md` (with a
  change note); scope or clarify D-051's "no subtotal mixes two bases" sentence (optionally decision D-053).
- **R4 (F16):** after the review is recorded, refresh `INDEPENDENT_REVIEW` in the status block — that requires
  a code constant change as well, so it belongs to a post-review record-refresh commit (as MC-11 did in
  `a912c4d`), not a docs-only commit. If the final delivery keeps the pre-review value, `PENDING` remains
  accurate but does not state the completed audit.
- **F15** is cosmetic (test title only) and may be corrected opportunistically.

**`MC12_EXTERNAL_COMMERCIAL_EVIDENCE` must remain `BLOCKED_OR_NOT_OBTAINED`**: 0 formal quotations, 0 executed
contracts, RFQ NOT_SENT, 9 inaccessible sources, chart/weather/NMEA/connectivity/cloud/tile/IP/trademark rights
unlicensed. No audit or documentation change can alter that external state.

## 9. Residual risks

- Gate assurance now rests on 64 adversarial tests and a stricter A-06; the third new A-06 test depends on
  `componentInclusions` being populated (it is, for all six bundles).
- The independent recomputation verifies arithmetic and identity, not the truth of published tariffs or
  licensing terms.
- Inherited MC-11 FX assumption (0.925925926 USD/EUR) remains on hardware lines; the observed ECB rate applies
  only to new conversions (D-051/ASM-MC12-021), with bundle aggregates composing both disclosed bases.
- 0.8–4.7 % observed-price coverage of modelled hardware cost; certification `UNKNOWN` in all 90 scenarios.
- No customer evidence, no WTP, no churn/CAC; recurring costs are tariffs, not contracts/SLAs.
- Uncommitted `.recon/` author scratch remains untracked in the working tree (not part of any commit).

## 10. What would change the verdict

- A regression in `check-marea-unit-economics.mjs` (weakened check), or any change to the economic data that
  fails the independent recomputation → back to PARTIAL/FAIL.
- Failure to apply R1–R4 in the final record refresh → the delivered documentation/status would not match the
  verified commit and the internal-scope PASS should not be recorded as final.
- Obtaining real quotations/contracts/licensing would change `MC12_EXTERNAL_COMMERCIAL_EVIDENCE`, not this
  internal-scope verdict.
