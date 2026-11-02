# MC-13 — Independent financial audit and review (D19)

| Field | Value |
|---|---|
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Auditor | Agent G — independent financial auditor (did not author any MC-13 implementation) |
| Review date | 2026-11-02 |
| Reviewed commit | `7dfb56dddfa20939605129d51c1a203d3e325cc6` (`7dfb56d`) |
| Reviewed branch | `feature/marea-mc13-financial-model-cashflow-break-even` |
| Base commit | `e59a8b9b3916d979d8eaeff78acd3795fd26c125` (`e59a8b9b`, MC-12 head; local = remote) |
| PR | [#20](https://github.com/manuelxose/embarcarte/pull/20), draft, open, `MERGEABLE`, `mergeStateStatus: UNSTABLE`, not merged, stacked on `feature/marea-mc12-recurring-data-unit-economics` |
| Machine companion | [review-findings.json](../data/review-findings.json) |
| **Verdict** | **`PARTIAL` — PASS_INTERNAL_FINANCIAL_SCOPE is withheld** |
| External commercial evidence | `BLOCKED_OR_NOT_OBTAINED` by design — not a defect of this milestone |
| Findings | **16 total: 2 BLOCKING, 3 MAJOR, 8 MINOR, 3 INFORMATIONAL — 16 OPEN** |
| Gate at the frozen commit | `73 checks — 71 PASS / 2 FAIL` (D-02, D-07) |
| Unit suite at the frozen commit | `29 tests — 28 PASS / 1 FAIL` (positive control) |
| Gate after this review record | `73 checks — 70 PASS / 3 FAIL` (D-02, D-07, V-19 — expected while findings are open) |
| Unit suite after this review record | `29 tests — 27 PASS / 2 FAIL` (test 27 state coupling + positive control; see F-16) |

## 1. Method

1. Verified the frozen state: `git rev-parse HEAD`, branch, clean worktree, ancestry
   (`git merge-base`), remote head (`git ls-remote`) and PR #20 (`gh pr view 20`,
   `gh pr checks 20`).
2. Reviewed the whole `git diff e59a8b9b..7dfb56d` (43 files, +71,303/−3) and the
   predecessor SHA-256 baseline (recomputed all 45 hashes).
3. Read the governing contract, the assumptions/evidence register, all 22 data JSON
   files, the engine, the builder, the validator, the unit suite, the MC-12 handoff and
   its consumption register, decisions D-050..D-056 and the master-prompt registry.
4. Wrote an **independent model** (throw-away scripts under `%TEMP%\mc13-audit`, not
   committed, importing no MC-13 code) that rebuilds all four scenarios from the
   curated inputs and compares every column, the 12/36/60 views, all 24 stress cases,
   the 70 break-even thresholds and the COST-16 inheritance with the committed derived
   files.
5. Re-ran the deterministic builder (`--check`), the validator
   (`--allow-pending-review`) and the unit suite, recording exact commands, environment
   and exit codes.
6. Executed **my own** 14 in-memory adversarial mutations (VAT in net revenue,
   duplicated/embedded tooling, zeroed unknown licence, approved price, PILOT bypass,
   missing period, broken cash identity, broken receivables identity, no-op cloud and
   cellular overrides, false reviewer PASS with/without an open blocking finding,
   amortisation over the capital schedule) and confirmed each fails the intended check.
7. Tested each of the 32 declared stress-override applications individually for effect.
8. Executed two auditor negative controls outside the author's suite: subtracting a
   refund cash outflow from receipts (the gate cannot see it) and appending a false
   doc-level review PASS (the gate cannot see it).
9. Checked 208 numeric claims in the human-readable reports against the governed JSON,
   and reviewed all reports for fabricated evidence, unsupported commercial claims,
   price approvals and premature PASS assertions.

Environment: Windows 11 Home, Node.js v24.18.0, npm 12.0.1, git 2.38.0.windows.1,
gh 2.96.0. No network access to external evidence was needed or attempted.

## 2. Frozen-state verification

| Check | Result | Evidence |
|---|---|---|
| HEAD equals the frozen candidate | VERIFIED | `git rev-parse HEAD` → `7dfb56dddfa20939605129d51c1a203d3e325cc6` |
| Branch | VERIFIED | `feature/marea-mc13-financial-model-cashflow-break-even`; clean worktree |
| Base / ancestry | VERIFIED | merge base = `e59a8b9b…`; `--is-ancestor` exit 0 |
| Remote head identical | VERIFIED | `git ls-remote` → `7dfb56d…` on the MC-13 branch; MC-12 branch still `e59a8b9b…` |
| PR #20 draft, open, unmerged | VERIFIED | `state OPEN`, `isDraft true`, `mergedAt null`, `mergeable MERGEABLE`, `mergeStateStatus UNSTABLE` |
| PR CI | `Build, test and verify` pass (1m33s) | `gh pr checks 20`; the workflow does **not** run `test:financial` (F-14) |
| Changed-file scope | PASS | 19 documents + 22 data JSON + 4 scripts under `docs/marea/financial/`, `DECISION-LOG.md` (D-053..D-056), `package.json` (format list + two test scripts). No `src/`, `deploy/`, `public/`, commerce, price, route or public-catalogue file; no predecessor data modified |
| Predecessor SHA-256 baseline | PASS | 45/45 hashes match `data/predecessor-baseline.json`; 0 changed, 0 missing |
| Deterministic regeneration | PASS | `node scripts/build-marea-financial-model.mjs --check` → “8 derived files are current”, exit 0; D-03/D-10 pass |
| No secrets, new dependencies or deploy changes | PASS | package.json diff is scripts-only; no BOM/format issues (`git diff --check` clean) |

## 3. Commands and results (exact)

| Command | Exit | Result |
|---|---:|---|
| `git rev-parse HEAD` | 0 | `7dfb56dddfa20939605129d51c1a203d3e325cc6` |
| `git ls-remote origin feature/marea-mc13-financial-model-cashflow-break-even feature/marea-mc12-recurring-data-unit-economics` | 0 | MC-13 remote head `7dfb56d…`; MC-12 `e59a8b9b…` |
| `gh pr view 20 --json …` | 0 | OPEN, draft, MERGEABLE, UNSTABLE, unmerged, base `e59a8b9b…` |
| `gh pr checks 20` | 0 | 1 check pass (does not cover the MC-13 gate) |
| `git diff --stat e59a8b9b..7dfb56d` | 0 | 43 files, +71,303/−3 |
| baseline recompute (auditor script) | 0 | 45/45 match |
| `node scripts/build-marea-financial-model.mjs --check` | 0 | 8 derived files current |
| `node scripts/check-marea-financial-model.mjs --allow-pending-review` (frozen commit) | 1 | 73 checks — **71 PASS / 2 FAIL**: D-02, D-07 |
| `node --test scripts/check-marea-financial-model.test.mjs` (frozen commit) | 1 | 29 tests — **28 PASS / 1 FAIL** (positive control: D-02, D-07) |
| auditor recomputation (`%TEMP%\mc13-audit\recompute.mjs`) | 0 | 61 series / views compared: 0 mismatches; identities hold |
| auditor mutations (`%TEMP%\mc13-audit\mutations.mjs`) | 0 | 14/14 mutations caught by the intended check; 32/32 overrides effective |
| auditor document reconciliation (`verify-claims.mjs`) | 0 | 208/208 numeric claims match |
| `git diff --check e59a8b9b..7dfb56d` | 0 | no whitespace errors |
| validator after this review record | 1 | 73 checks — **70 PASS / 3 FAIL**: D-02, D-07 (open findings), V-19 (manifest still PENDING vs verdict PARTIAL) |
| unit suite after this review record | 1 | 29 tests — **27 PASS / 2 FAIL**: test 27 (state coupling) and positive control |

**Classification of failures.** None is BLOCKED_BY_ENVIRONMENT: all commands executed.
The gate and the unit suite are genuinely red, not sandbox artefacts.

## 4. Independent recomputation (what the auditor rebuilt)

- **60 periods per scenario** for `RESTRICTED_CURRENT`, `DOWNSIDE`,
  `BASE_HYPOTHETICAL`, `UPSIDE_HYPOTHETICAL`; 58 monetary/quantity column series plus
  three per-SKU maps per hypothetical scenario; the 12/36/60 views (26 view fields ×
  3 views × 3 scenarios).
- **Result:** every compared series, view and stress result matched the committed files
  within the ±0.005 EUR contract tolerance — **0 mismatches**. The model is
  internally reproducible and the committed arithmetic is not fabricated.
- **Key recomputed M60 totals (EUR):**

| Scenario | Gross invoiced | Net revenue | Contribution | EBITDA-like | Net cash flow | Cumulative cash | Financing requirement | Capex |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| DOWNSIDE | 463 955.96 | 367 050.26 | 150 666.06 | −2 630 259.30 | −3 075 765.77 | −3 075 765.77 | 3 075 765.77 | 503 125.00 |
| BASE_HYPOTHETICAL | 4 397 543.08 | 3 426 647.12 | 1 688 226.86 | −618 061.78 | −415 478.92 | −415 478.92 | 987 326.73 | 402 500.00 |
| UPSIDE_HYPOTHETICAL | 13 130 674.77 | 10 148 301.82 | 5 475 105.86 | 3 963 913.46 | 5 440 764.18 | 5 440 764.18 | 632 135.66 | 342 125.00 |
| RESTRICTED_CURRENT | 0 | 0 | null | null | null | null | null | null |

- **Identities verified directly on the committed columns:** gross−refund−VAT = net
  (max round-off 0.03 EUR); net = hardware + subscription; VAT split; trade receivables
  identity with 2-period distributor lag; cash receipts composition and
  `cashCollectionsNetOfVat = cash - vatPaid`; inventory unit identity (exact integers, no
  negatives); `COGS = units × declared unit cost`; purchases cash = receipts cost +
  Δprepayments − Δpayables (≤0.03 EUR monthly); VAT payment lag with credit
  carry-forward; `operatingCashFlow = EBITDA-like − WC` and the direct cash route;
  net cash = operating + investing; opening 0 + Σ net cash = cumulative cash; financing
  requirement = running maximum drawdown; deferred-revenue identity; 12/36/60 views.
- **Stress:** all 24 cases rebuilt from the base scenario + declared overrides; every
  disclosed result field matched. All 32 individual override applications change at
  least one result — including **ST-11 cloud 2×** (Δ cumulative cash −30 069.13),
  **ST-12 cellular 0.375/device-month** (−11 877.45) and **ST-20 funding envelope halved**
  (2 000 000 → 1 000 000; only the envelope/gap field changes, as designed). The
  compound adverse case **ST-23** is −842 746.92 versus base; **ST-24** keeps a positive
  month-60 aggregate contribution (32 355.27) but never recovers cash and exceeds the
  envelope by 21 059.52.
- **Break-even:** 70 records; 0 VERIFIED; 14 NOT_DETERMINABLE; 56 conditional.
  Operating/cash-flow/cumulative-recovery/financing months recomputed and equal to the
  stored values (BASE M39/M23/no recovery; UPSIDE M15/M11/M23; DOWNSIDE none). No NAV,
  WEATHER or PILOT unit/price threshold asserts a numeric value while its material input
  is UNKNOWN.
- **COST-16 / MC-12 inheritance:** MC-11 reconciliation 90/90 scenarios, max subtotal
  delta 0.00, tooling never in variable cost, no repeat field mismatch; MC-13 carries
  tooling/NRE 37 500.00 EUR as capex (M02 BASE) and 36-month amortisation (M12
  124 444.44 / M36 390 069.38 / M60 402 499.93 cumulative); all 13 inherited
  hardware/subscription unit costs equal their MC-12 records.
- **Governance:** `NOT_FOR_SALE`, `PRICE_APPROVED = NONE`,
  `LICENSING_RIGHTS_GRANTED = false`, `CUSTOMER_WTP_VALIDATED = false`,
  `PILOT_SAFETY_GATE = BLOCKED`, AIS receive-only, FLEET hardware-free and no MC-14
  execution all verified. Unknown costs are `null` (7 UNKNOWN assumptions, insurance,
  CRA, data licence, FLEET onboarding/DPA/SLA, CAC, churn, WTP), never zero; the
  restricted case has zero authorized revenue and null cost/cash columns.

## 5. Defects found beyond the committed arithmetic

The recomputation above proves the **committed arithmetic is reproducible**; it does
not prove the **economics are right**. Four sub-surface defects were found by
re-deriving the cash flow independently:

1. **Refunds never paid in cash (F-03, MAJOR).** The refund/returns allowance reduces
   revenue and output VAT but no cash outflow exists. Paying the allowance in the sale
   month: BASE cumulative cash −415 478.92 → −477 860.35 and financing requirement
   987 326.73 → 1 008 167.43 (+20 840.70); DOWNSIDE +8 018.35; UPSIDE −162 941.70.
   Consequently the “adverse” stress **ST-07 (warranty/returns 6 %) improves cash by
   +10 608.01 and reduces the financing requirement by −3 398.50**; corrected, it is
   −51 773.42 versus the corrected base. D10 §9 claims “higher returns reduce net
   revenue and cash”, which the model contradicts.
2. **Distributor invoice basis (F-04, MAJOR).** `distributorInvoicedGross` uses full
   list price × 1.21, ignoring the declared 35 % distributor margin and adding VAT to a
   VAT-inclusive price. For HUB-STANDARD: 105.57 EUR/unit modelled vs 56.71
   channel-consistent. BASE receivables 28 050.84 → 15 068.64, distributor invoiced
   695 041.92 → 373 369.78, financing requirement 987 326.73 → 974 344.53 (M60 cash
   differs by 12 982.20 because the last two months are uncollected). Total cash is
   conserved over an extended horizon; the error is an allocation/timing misstatement
   that the internal identity cannot see.
3. **Missing delivery record / records (F-01, BLOCKING).** D21
   `MC-13-DELIVERY.md` is absent, `MASTER-PROMPT-REGISTRY.md` row 13 is still
   `PLANNED`, and D-054/D-056 cite files that do not exist. D-02 fails and the claimed
   73/73 / 29/29 are unreachable.
4. **Premature independent-review PASS (F-02, BLOCKING).** D20 asserts
   `MC13_INDEPENDENT_REVIEW = PASS_INTERNAL_FINANCIAL_SCOPE` while the manifest, the
   review record and the MC-14 handoff say PENDING; the gate does not detect a
   document-level false PASS (auditor control).

Additional MAJOR: the unit suite is coupled to the live review state (F-16). At the
frozen commit it is 28/29 (positive control fails); once a genuine verdict is recorded,
test 27 fails its own “audit starts pending” assertion, so 29/29 cannot be reproduced
without a test change.

## 6. Adversarial mutation evidence (auditor-written, in-memory only)

| ID | Mutation | Intended check failed |
|---|---|---|
| M01 | VAT added to net recognised revenue | A-03 / A-04 (+A-02, A-14, A-17, V-15) |
| M02 | Tooling/NRE duplicated in non-cash amortisation | A-18 / A-19 |
| M03 | Tooling/NRE embedded in variable unit cost | A-24 / V-16 (+A-20, A-21, A-22) |
| M04 | Unknown data-licence cost zeroed | V-12 (+D-10) |
| M05 | Price hypothesis APPROVED | V-01 (+S-04) |
| M06 | PILOT safety gate bypassed | S-09 / V-03 (+S-08, A-21, A-22, D-03, D-10) |
| M07 | One model period removed | A-01 / S-04 |
| M08 | Cumulative-cash identity broken | A-13 / A-16 |
| M09 | Trade-receivables identity broken | A-06 |
| M10 | Cloud override made a no-op | A-26 (+A-21, A-22, D-03) |
| M11 | False reviewer PASS, no recomputation | D-07 / V-19 |
| M12 | False reviewer PASS with open BLOCKING finding | D-07 / V-19 |
| M13 | Amortisation above the capital schedule | A-18 / A-19 |
| M14 | Cellular override made a no-op | A-26 (+A-21, A-22, D-03) |

Two negative controls show the gate's blind spots: subtracting a refund cash outflow
from receipts trips A-06/A-14 (the identities have no refund column), and appending
“MC13_INDEPENDENT_REVIEW = PASS_INTERNAL_FINANCIAL_SCOPE” to a report causes no
failure. These are evidence for F-03 and F-02, not author-suite reruns.

## 7. Documentation and claim review

- 208 explicit numeric claims in the working-capital, generated-figures, sensitivity
  and capex documents match the governed JSON.
- Two numeric documentation mismatches were found: F-08 (capex/funding document says
  8 BLOCKING / 6 MAJOR blockers; data and D15 say 9 / 5) and F-09 (subscription
  headroom figures omit the 6 % channel factor and contradict the same document's
  table).
- No approved price, no commercial availability, no validated demand, no fabricated
  quotation or customer evidence was found. All nine products remain
  `NOT_FOR_SALE`; unknown costs stay `UNKNOWN`; MC-14 is not started.
- **Fabricated evidence found:** D20's status block and its sentence that review
  results are “recorded” in files that do not exist (F-02), plus the missing D21 and
  registry row (F-01). These are the blocking documentation defects.

## 8. Findings summary

| ID | Severity | Title | Status |
|---|---|---|---|
| F-01 | BLOCKING | Missing D21 delivery record / registry row / cited artifacts | OPEN |
| F-02 | BLOCKING | Premature false independent-review PASS in D20 | OPEN |
| F-03 | MAJOR | Refunds never paid in cash; cash/financing overstated; ST-07 direction reversed | OPEN |
| F-04 | MAJOR | Distributor invoice basis double-counts VAT and omits the 35 % margin | OPEN |
| F-16 | MAJOR | Adversarial suite state-dependent; cannot reach 29/29 at the final record | OPEN |
| F-05 | MINOR | Contract §6 stale (71 vs 73 checks; A-15 formula; A-id renumbering) | OPEN |
| F-06 | MINOR | Empty scenarioAssumptionIds / inputAssumptionIds lineage | OPEN |
| F-07 | MINOR | cohortAssumptions missing deferredRevenueRefundPct | OPEN |
| F-08 | MINOR | Wrong blocker severity split in D09 | OPEN |
| F-09 | MINOR | Subscription headroom omits channel factor; contradicts own table | OPEN |
| F-10 | MINOR | Break-even summary omits MINIMUM_GROSS_PRICE counts | OPEN |
| F-11 | MINOR | “unitContributionStillPositive” is an aggregate, not per-unit | OPEN |
| F-12 | MINOR | Restricted monetary cash/tax columns zero vs null contract text | OPEN |
| F-13 | INFORMATIONAL | evidenceCounts cover 152/153 assumptions (official licensing doc) | OPEN |
| F-14 | INFORMATIONAL | CI does not run the MC-13 financial gate | OPEN |
| F-15 | INFORMATIONAL | Disclosed simplifications (VAT recovery, hardware-only refunds, opening cash) | OPEN |

Full reproduction steps, required corrections, owners and re-verification criteria are in
[review-findings.json](../data/review-findings.json).

## 9. Residual risks (accepted as disclosed, not waived)

External commercial evidence remains `BLOCKED_OR_NOT_OBTAINED`: 0 formal quotations,
0 executed contracts, 0 granted licensing rights, 0 customer evidence,
`CUSTOMER_WTP_VALIDATED = false`. All named unknown costs (data licence, insurance, CRA,
FLEET onboarding/DPA/SLA, CAC, churn/renewal, WTP, company cash) are excluded from the
conditional result, so the true financing requirement is higher than every reported
figure. Opening cash is a zero analysis convention, not the company position. VAT
treatment is an illustration; the M60 VAT balance is paid in M61 outside the horizon.
Demand/churn/renewal/channel inputs are illustrative scenario assumptions with no
probability. The 60-month horizon truncates two months of distributor collections.
Break-even thresholds are conditional or NOT_DETERMINABLE, never verified. These risks
are explicitly documented by the author and are not counted as defects.

## 10. What would change the verdict

1. **F-01:** author `MC-13-DELIVERY.md`, update `MASTER-PROMPT-REGISTRY.md` row 13,
   correct the decision-log references; D-02 and the positive control then pass.
2. **F-02:** make the D20 status block equal the manifest/review verdict, remove the
   unearned PASS, and add a validator guard against document-level false PASS claims.
3. **F-03:** settle refunds in cash (or make the treatment internally consistent),
   regenerate all derived files/documents and confirm ST-07 is adverse versus the
   corrected base.
4. **F-04:** compute distributor invoiced/collected cash from the channel-adjusted
   gross price, regenerate derived files/documents and add a validator check.
5. **F-16:** decouple test 27 from the live review record and make the positive control
   pass at the final record; re-run and record exact 29/29.
6. **F-05..F-15:** documentation/traceability/process corrections so the human reports
   reconcile with the JSON; contract and validator re-synchronised.
7. After corrections are committed and **re-frozen at a new head SHA**, the auditor
   re-runs the independent recomputation, the 14-mutation harness, the 208-claim
   reconciliation, the validator and the unit suite; `PASS_INTERNAL_FINANCIAL_SCOPE` is
   awarded only if no BLOCKING/MAJOR finding remains open and the gate is 73/73 with
   the manifest/status block reconciled to the actual review verdict (and 29/29 for the
   unit suite).
8. External commercial evidence is **not** required for `PASS_INTERNAL_FINANCIAL_SCOPE`;
   `MC13_EXTERNAL_COMMERCIAL_VALIDATION` must remain `BLOCKED_OR_NOT_OBTAINED`.

## 11. Final verdict

**`PARTIAL` — PASS_INTERNAL_FINANCIAL_SCOPE is NOT awarded on
`7dfb56dddfa20939605129d51c1a203d3e325cc6`.**

The numerical engine is deterministic, independently reproducible and internally
consistent; the boundaries (NOT_FOR_SALE, no price approval, no validated demand, no
granted licensing, no MC-14 start, unknowns kept null) are respected. But the frozen
candidate has two BLOCKING documentation/governance defects (missing D21 delivery
record/records; premature false independent-review PASS), two MAJOR economic defects
(refund cash settlement; distributor invoice basis, both quantified) and a MAJOR test-
suite state-coupling defect that makes the claimed 29/29 unreproducible, so the
frozen commit cannot receive an independent financial sign-off. The reviewer withholds
approval and will re-verify after the Lead implements the corrections and records the
review record commit (`finalRecordCommit` remains `null` until then).
