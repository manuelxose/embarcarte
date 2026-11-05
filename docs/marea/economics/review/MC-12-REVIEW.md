# MC-12 — Independent audit and review (D17)

| Field | Value |
|---|---|
| Milestone | MC-12/36 — recurring/data licensing and per-SKU contribution economics (ex-VAT) |
| Reviewer | Agent H (independent auditor; did not author the implementation) |
| Review date | 2026-11-02 |
| **Final reviewed commit** | **`0f7e826828d03f3f18e8edd39fba2742160e286e`** (`0f7e826`) — final record-closure commit (parent `2460309`) |
| SHA-reference commit | `246030928e944450badbf69d4916aa92334dca07` (`2460309`) |
| Record-refresh commit | `05883ac1fb3401a2f2ed96d9e7d71bb0c60fdb99` (`05883ac`) |
| Correction commit (re-verified) | `8f819c19a86d58b893bfab29a53d5a13c38fe2dc` (`8f819c1`) |
| Originally reviewed commit | `fe970624bc7c41ae5ffe0fb578c194fcb6a795f1` (`fe97062`) — first verdict PARTIAL |
| Base / predecessor | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` (MC-11) |
| Branch | `feature/marea-mc12-recurring-data-unit-economics` |
| Machine companion | [review-findings.json](../data/review-findings.json) |
| **Final verdict** | **`PASS_INTERNAL_ECONOMICS_SCOPE`** — internal economics scope; external commercial evidence remains **`BLOCKED_OR_NOT_OBTAINED`** |
| Findings | **18 total: 16 `CLOSED_VERIFIED`, 2 `CLOSED_INFORMATIONAL`, 0 OPEN** (0 BLOCKING, 2 MAJOR both closed, 12 MINOR, 4 INFORMATIONAL) |

## 1. Method of this final verification

1. Verified `git rev-parse HEAD` = `0f7e826`, its ancestry (`fe97062` → `8f819c1` → `05883ac` →
   `2460309` → `0f7e826`), the remote head via `git ls-remote`, and PR states via `gh`.
2. Reviewed the **actual** closure diff `2460309..0f7e826` (3 files, +36/−10): three additive
   `componentInclusions` rows and the D19/D18 audit-summary text. Reviewed each change on its merits.
3. Confirmed the diff is additive/documentation-only: no script, gate, monetary value, cost line, bundle total or
   external-evidence change; the gate is byte-identical to the previously verified version.
4. Re-derived the three new inclusion rows (SAIL `SL-09`, `SL-10`; COMPLETE `CP-17`) against
   `bundle-definitions.json` and re-checked the contract's enumeration rule for all six bundles.
5. Re-ran the gates (§3) and re-ran the independent arithmetic recomputation (§4).
6. Closed F17 and F18 with evidence; the machine contract records 18 findings and 0 open.

## 2. Final state verification

| Check | Result | Evidence |
|---|---|---|
| HEAD equals final record-closure commit | VERIFIED | `git rev-parse HEAD` → `0f7e826828d03f3f18e8edd39fba2742160e286e`, exit 0 |
| Parent is the SHA-reference commit | VERIFIED | `git log --oneline -4`: 0f7e826 → 2460309 → 05883ac → 8f819c1 |
| Remote head matches local | VERIFIED | `git ls-remote origin feature/marea-mc12-…` → `0f7e826828d0…` |
| Tracked worktree clean | VERIFIED | `git status --porcelain` → only `?? .recon/` (pre-existing untracked author scratch) |
| Closure diff scope | VERIFIED | 3 files: D19, D18 and `bundle-economics.json` (+27 lines of additive inclusion rows). No script/MC-11/app/package change |
| No gate change | VERIFIED | `git diff 8f819c1..0f7e826 -- scripts/` empty; validator/test files byte-identical to the verified version |
| No monetary change | VERIFIED | All 6 bundle monetary fields, component cost lines and `aggregateConversionBases` identical to `2460309`; only 3 additive inclusion rows changed |
| D-04 MC-11 baseline | VERIFIED | Validator D-04 PASS (19-file SHA-256 baseline) |
| PR #18 / PR #19 | VERIFIED | Both OPEN, draft, MERGEABLE, mergedAt null; PR #19 stacked on `feature/marea-mc11-hardware-sourcing-conformity` |

## 3. Re-execution results at `0f7e826` (exact commands)

| Command | Exit | Result |
|---|---|---|
| `node scripts/check-marea-unit-economics.mjs` | 0 | `49 checks — 49 PASS / 0 FAIL` |
| `node --test --test-isolation=none scripts/check-marea-unit-economics.test.mjs` | 0 | `tests 64 / pass 64 / fail 0` |
| `npm run format:check` | 0 | `All matched files use Prettier code style!` |
| `npm run test:hardware` | 0 | `54/54 checks passed` (unchanged data, confirmation) |
| `node --test --test-isolation=none scripts/check-marea-hardware.test.mjs` | 0 | `tests 59 / pass 59 / fail 0` (unchanged data, confirmation) |

D-03 remains satisfied with `INDEPENDENT_REVIEW = PASS_INTERNAL_ECONOMICS_SCOPE`; the earlier independent
mutations (PENDING and FAIL) still fail `D-03`, so the gate enforces the final value.

## 4. Independent recomputation at `0f7e826`

| Check | Records | Result |
|---|---|---|
| Unit-economics arithmetic (net, known variable cost, contribution, headroom, break-even gross, %) | 50 | **0 mismatches** |
| MC-11 reconciliation (Σ lines, COST-16/COST-12 invariants) | 90 scenarios | **0 mismatches** |
| Sensitivity / stress / decision scores | 70 / 4 / 9 | **0 mismatches** |
| Bundle monetary aggregates and % suppression | 6 | **0 mismatches**; values identical to `2460309` |
| Three new inclusion rows re-derived against `bundle-definitions.json` | 3 | **exact match** on inclusion, `requiredForOutcome`, `familyId`, `editionId`, `quantity`, `expandsTo` |
| Contract enumeration rule for all bundles | 6 bundles | **satisfied**: SAIL 5 inclusion rows (SL-01/02/03/09/10), COMPLETE 10 (CP-01…CP-09, CP-17), PROTECT 3, FLEET 4, START 2, CRUISE 4 |
| Provider classes / rights / blockers / status | 53 / 11 / 23 / manifest | classes sum 53; rights 11 (7/3/1), blocking 9; blockers 23 (14/8/1, 19 external); status block consistent |
| D19/D18 audit-summary text vs findings contract | 2 documents | 18 findings (2 MAJOR, 12 MINOR, 4 INFORMATIONAL), 16/2/0 closed — **matches** |

## 5. Record-refresh and closure actions verified

| Item | Verified | Evidence |
|---|---|---|
| R1 / F07 | DONE | Registry row 12 names `8f819c1` and `05883ac`; placeholder removed |
| R2 / F12 + F13 | DONE | D-051 scoped; `aggregateConversionBases` on 6/6 bundles; 64/64 and engineering-assumption enumeration in D19/D18/registry |
| R3 / F14 | DONE | Contract documents `recurringCostExposure`, `componentInclusions`, `conditionalComponents`, `fixedUnknownCosts`, `aggregateConversionBases` and the enumeration rule |
| R4 / F16 | DONE | `INDEPENDENT_REVIEW = PASS_INTERNAL_ECONOMICS_SCOPE` in manifest, D18, D19 and frozen constant; D-03 verifies |
| R5 / F15 | DONE | Test title corrected to R-02 |
| A1 / F17 | DONE | `0f7e826`: SL-09 and SL-10 added to BE-SAIL; CP-17 to BE-COMPLETE; additive only |
| A2 / F18 | DONE | `0f7e826`: D19 and D18 now report 18 findings (2/12/4), D17 completed with `PASS_INTERNAL_ECONOMICS_SCOPE`, closure 16/2/0 |

## 6. Dimension status (final)

| Dim | Status | Evidence |
|---|---|---|
| A Scope/ancestry | PASS | §2 |
| B Product/bundle identity | PASS | 9 families/26 editions; 6 bundles; required PILOT included, SENSE conditional-only, FLEET hardware-free, PILOT not a fixed price, AIS receive-only; enumeration rule fully satisfied |
| C Provider evidence | PASS | 53 records, 0 quotations/contracts, RFQ NOT_SENT, all sources dated, inaccessible/unknown null; classes sum 53 |
| D Licensing rights | PASS | 11 rights (7/3/1), 9 blocking, 0 GRANTED; docs/registry match |
| E Currency/VAT | PASS | All EUR/21 %; net = gross/1.21 on all records; no VAT-inclusive net; per-register FX scoped; bundle bases declared |
| F Per-SKU arithmetic | PASS | 50/50 recomputed, 0 mismatches; no monetary change through the record commits |
| G Recurring aggregation | PASS | WATCH 6 lines; FLEET cloud/support/payment; inactive state; no guaranteed delivery |
| H Scenarios/margins | PASS | 70/70, 4/4, 6/6, 9/9 recomputed; % suppressed under material unknowns |
| I Governance/claims | PASS | No approved price/demand/profitability/break-even claim; `INDEPENDENT_REVIEW` records the completed audit |
| J MC-11 no-regression | PASS | 90/90 invariants; D-04 baseline; verdict strings unchanged |
| K Validation controls | PASS | 49 ids; 64/64 tests; mutation controls fail the intended check; no self-comparison check |
| L Deliverables/record | PASS | D01–D19 present; 16 economic JSON datasets + review contract parse; links resolve; registry/delivery text consistent; 0 open findings |

## 7. Findings — final status

| ID | Sev | Final status | Evidence |
|---|---|---|---|
| F01–F06, F08–F10 | MAJOR/MINOR/INFO | **CLOSED_VERIFIED** | Corrections at `8f819c1` independently re-verified (recomputation + mutations) |
| F07 | MINOR | **CLOSED_VERIFIED** | Registry row 12 names `8f819c1` and `05883ac`; placeholder gone |
| F11 | INFORMATIONAL | **CLOSED_INFORMATIONAL** | ASM-MC12-010 documents the rounding artefact |
| F12 | INFORMATIONAL | **CLOSED_VERIFIED** | D-051 scoped; 6/6 bundles declare `aggregateConversionBases` |
| F13 | MINOR | **CLOSED_VERIFIED** | 64/64 and 64-case counts fixed; engineering-assumption class added (sum 53) |
| F14 | MINOR | **CLOSED_VERIFIED** | Contract documents the new fields and enumeration rule |
| F15 | INFORMATIONAL | **CLOSED_INFORMATIONAL** | Test title corrected to R-02 |
| F16 | MINOR | **CLOSED_VERIFIED** | `INDEPENDENT_REVIEW = PASS_INTERNAL_ECONOMICS_SCOPE` in manifest/D18/D19/frozen block; D-03 rejects stale/wrong values |
| F17 | MINOR | **CLOSED_VERIFIED** | `0f7e826`: SAIL SL-09/SL-10 and COMPLETE CP-17 added; three rows exact against `bundle-definitions.json`; enumeration rule now satisfied; no monetary change |
| F18 | MINOR | **CLOSED_VERIFIED** | `0f7e826`: D19/D18 state 18 findings (2 MAJOR, 12 MINOR, 4 INFORMATIONAL), D17 completed, closure 16/2/0 |

**Final counts: 18 findings — 16 `CLOSED_VERIFIED`, 2 `CLOSED_INFORMATIONAL`, 0 OPEN.**
No BLOCKING or MAJOR finding is open; the two MAJOR findings (F01, F03) are closed with reproduced evidence.

## 8. Final verdict

**`PASS_INTERNAL_ECONOMICS_SCOPE`.** At `0f7e826` the internal economics scope is fully verified:

- 0 arithmetic mismatches across 50 unit-economics records, 90 MC-11 scenarios, 70 sensitivity results,
  4 stress cases, 6 bundles and 9 decision scores.
- No monetary value changed through `8f819c1 → 05883ac → 2460309 → 0f7e826`; the closure commit is additive/
  documentation-only.
- All gates pass: 49/49 checks, 64/64 adversarial tests, 54/54 hardware checks, 59/59 hardware tests and
  `format:check`; the gate is byte-identical to the previously verified version.
- All 18 independent-audit findings are closed (16 `CLOSED_VERIFIED`, 2 `CLOSED_INFORMATIONAL`, 0 open).
- Every commercial governance flag holds: no approved price, no validated demand, no profitability/break-even
  claim, no licensing right granted, `NOT_FOR_SALE`, `MC13_STARTED=false`,
  `INDEPENDENT_REVIEW = PASS_INTERNAL_ECONOMICS_SCOPE`.
- PR #19 remains open, draft, stacked on `feature/marea-mc11-hardware-sourcing-conformity`, and unmerged.

**`MC12_EXTERNAL_COMMERCIAL_EVIDENCE` remains `BLOCKED_OR_NOT_OBTAINED`:** 0 formal quotations, 0 executed
contracts, RFQ NOT_SENT, 9 inaccessible sources, 5 unknown prices, and chart/weather/NMEA/connectivity/cloud/
tile/IP/trademark rights unlicensed. No audit or documentation change can alter that external state.

**Delivery is unblocked** for the internal economics scope: no open BLOCKING/MAJOR/MINOR finding remains; the
only residual items are cosmetic observations recorded in §9 and the immutable external-evidence blockers.

## 9. Residual risks and observations

- FLEET's `aggregateConversionBases.hardware` is `null` (hardware-free, correct) while the generic note says
  "both bases" — cosmetic wording only.
- Independent recomputation verifies arithmetic and identity, not the truth of external tariffs or licensing.
- Inherited MC-11 FX assumption (0.925925926 USD/EUR) remains on hardware lines; ECB 0.8916 applies only to new
  conversions; bundle aggregates disclose both bases.
- 0.8–4.7 % observed-price coverage of modelled hardware cost; certification `UNKNOWN` in all 90 scenarios.
- No customer evidence, no WTP, no churn/CAC; recurring costs are published tariffs, not contracts or SLAs.
- Untracked `.recon/` author scratch remains in the working tree (not part of any commit).

## 10. What would change the verdict

- Any change to economic data, cost lines, bundle totals or gate logic that fails the independent recomputation
  or the 49/64/54/59 gates → back to PARTIAL/FAIL.
- Obtaining real quotations/contracts/licensing would change `MC12_EXTERNAL_COMMERCIAL_EVIDENCE`, not this
  internal-scope verdict.
