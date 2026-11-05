# MC-13 — Independent financial audit and review (D19) — re-verification

| Field | Value |
|---|---|
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Auditor | Agent G — independent financial auditor (did not author any MC-13 implementation) |
| Review date | 2026-11-02 |
| Re-verified commit | `573d65a4e1f3c3799350691a6e698e97f5e483c1` (`573d65a`) |
| Previously reviewed commit | `7dfb56dddfa20939605129d51c1a203d3e325cc6` (`7dfb56d`, withheld: PARTIAL, 16 findings) |
| Reviewed branch | `feature/marea-mc13-financial-model-cashflow-break-even` |
| Base commit | `e59a8b9b3916d979d8eaeff78acd3795fd26c125` (MC-12 head; local = remote) |
| PR | [#20](https://github.com/manuelxose/embarcarte/pull/20), draft, open, `MERGEABLE`, `mergeStateStatus: UNSTABLE`, not merged, stacked on `feature/marea-mc12-recurring-data-unit-economics` |
| Machine companion | [review-findings.json](../data/review-findings.json) |
| **Verdict** | **`PASS_INTERNAL_FINANCIAL_SCOPE`** — internal financial scope only |
| External commercial evidence | `BLOCKED_OR_NOT_OBTAINED` by design — not a defect |
| First-audit findings | 16 total: **13 `CLOSED_VERIFIED`/`CLOSED_INFORMATIONAL`, 3 OPEN with explicit reasons** (F-05 MINOR, F-11 MINOR, F-14 INFORMATIONAL; 0 BLOCKING, 0 MAJOR open) |
| Builder at `573d65a` | `node scripts/build-marea-financial-model.mjs --check` → 8 derived files current, exit 0 |
| Builder after this re-issued record | `--check` → stale `manifest.json` (expected: the manifest is derived from the review verdict); the record commit regenerates it with `node scripts/build-marea-financial-model.mjs` |
| Validator at `573d65a` with the first-audit record | `77 checks — 75 PASS / 2 FAIL` (V-19, D-07; the committed record still listed the first-audit findings OPEN; **D-02 now PASSES**) |
| Validator after this re-issued record | `77 checks — 76 PASS / 1 FAIL` (only **V-19**, because `manifest.statusBlock.MC13_INDEPENDENT_REVIEW` still says `PARTIAL`; the Lead reconciles it in the record commit) |
| Validator with the record-commit reconciliation applied in memory | **`77 checks — 77 PASS / 0 FAIL`** |
| Unit suite at `573d65a` and after this record | **`29 tests — 29 PASS / 0 FAIL`** |

## 1. Method of this re-verification

1. Verified the corrected frozen state: `git rev-parse HEAD`, branch, clean worktree,
   ancestry (`git merge-base --is-ancestor 7dfb56d HEAD`), remote head (`git ls-remote`)
   and PR #20 (`gh pr view 20`).
2. Reviewed the **actual** correction diff `7dfb56d..573d65a` (31 files, +7,217/−5,534):
   engine, builder, validator, unit suite, 8 data JSON, 18 documents, D21 added, registry
   row 13 and decision log D-057. Checked scope on its merits (no `src/`, deploy, public,
   commerce, price or route change; predecessor files untouched; `package.json` unchanged).
3. Recomputed the 45-file predecessor SHA-256 baseline.
4. Re-ran the deterministic builder, the validator and the adversarial unit suite.
5. Re-ran my **independent model**, updated for the corrected refund-cash and
   channel-adjusted distributor rules, against every committed column, the 12/36/60
   views, all 24 stress cases and the 70 break-even thresholds.
6. Re-ran my own adversarial mutation harness, extended with mutations targeting the new
   checks A-27, A-28, S-12 and D-11.
7. Reconciled 197 numeric claims from the human-readable documents against the JSON and
   searched every document for the stale pre-correction figures.
8. Demonstrated the final record state in memory (this record + the manifest verdict
   reconciliation) and confirmed the gate reaches 77/77.

Environment: Windows 11 Home, Node.js v24.18.0, npm 12.0.1, git 2.38.0.windows.1,
gh 2.96.0. No command was sandbox-blocked.

## 2. Frozen-state verification

| Check | Result | Evidence |
|---|---|---|
| HEAD equals the re-verified candidate | VERIFIED | `git rev-parse HEAD` → `573d65a4e1f3c3799350691a6e698e97f5e483c1` |
| Branch / worktree | VERIFIED | `feature/marea-mc13-financial-model-cashflow-break-even`; worktree clean before this review record |
| Base / ancestry | VERIFIED | merge base `e59a8b9b…`; `7dfb56d` is an ancestor of `573d65a` |
| Remote head identical | VERIFIED | `git ls-remote` → `573d65a4e1f…` on the MC-13 branch |
| PR #20 | VERIFIED | OPEN, draft, `MERGEABLE`, `UNSTABLE`, `mergedAt null`, head `573d65a`, base `e59a8b9b` |
| Correction diff scope | PASS | 31 files: engine/builder/validator/test, 8 data JSON, 18 documents, D21, registry row 13, decision D-057. No `src/`, deploy, public, commerce, price, route or public-catalogue change; `package.json` unchanged |
| Predecessor baseline | PASS | 45/45 SHA-256 match; 0 changed, 0 missing |
| Deterministic regeneration | PASS | `--check` → “8 derived files are current”, exit 0; D-03/D-10 PASS |
| No secrets / new dependencies / deploy changes | PASS | correction diff contains scripts and documentation only, no new dependency |

## 3. Commands and results

| Command | Exit | Result |
|---|---:|---|
| `git rev-parse HEAD` / `git status --porcelain` | 0 | `573d65a4e1f3c3799350691a6e698e97f5e483c1` / clean |
| `git ls-remote origin feature/marea-mc13-financial-model-cashflow-break-even` | 0 | `573d65a4e1f3c3799350691a6e698e97f5e483c1` (identical) |
| `gh pr view 20 --json …` | 0 | OPEN, draft, MERGEABLE, UNSTABLE, unmerged |
| `git diff --stat 7dfb56d..573d65a` | 0 | 31 files, +7,217/−5,534 |
| predecessor SHA-256 recompute (auditor script) | 0 | 45/45 match |
| `node scripts/build-marea-financial-model.mjs --check` | 0 | 8 derived files current at `573d65a`; after this review record it reports stale `manifest.json` because the manifest is derived from the review verdict (record-commit builder run regenerates it) |
| `node scripts/check-marea-financial-model.mjs --allow-pending-review` (with first-audit record) | 1 | 77 checks — 75 PASS / 2 FAIL (V-19, D-07; D-02 PASS) |
| `node --test scripts/check-marea-financial-model.test.mjs` | **0** | **29 tests / 29 PASS / 0 FAIL** |
| auditor independent recomputation (corrected rules) | 0 | 61 series × 60 periods + views + 24 stress cases + 70 thresholds: **0 mismatches** |
| auditor mutations (`mutations2.mjs`, 19 cases) | 0 | **19/19** fail the intended validator check |
| auditor document reconciliation (`verify-claims-573.mjs`) | 0 | **197/197** numeric claims match |
| `node scripts/check-marea-financial-model.mjs --allow-pending-review` (after this record) | 1 | 77 checks — **76 PASS / 1 FAIL** (only V-19: manifest still `PARTIAL`) |
| in-memory validation with the record-commit manifest reconciliation | **0** | **77 checks — 77 PASS / 0 FAIL** |
| `node --test scripts/check-marea-financial-model.test.mjs` (after this record) | **0** | **29/29 PASS** |

The single remaining gate failure is not a model defect: `V-19` compares
`manifest.statusBlock.MC13_INDEPENDENT_REVIEW` with the verdict in this record, and the
manifest is updated by the Lead in the record commit that accepts the audit. The
in-memory run with that one-line reconciliation is 77/77.

## 4. Independent recomputation (corrected model)

- Rebuilt all four scenarios from the curated inputs with the **corrected rules**:
  refunds settled in cash (`refundsCash = refundsAllowance`, netted inside
  `cashReceiptsGross`) and distributor invoicing at the **channel-adjusted VAT-inclusive
  trade price** (35 % margin once, no second VAT gross-up).
- **Result: 0 mismatches** across 61 numeric column series × 60 periods, the three
  views and all 24 stress cases. The committed arithmetic and the corrected economic
  rules agree.
- **Key recomputed M60 totals (EUR):**

| Scenario | Gross invoiced | Refunds paid | Net revenue | Contribution | EBITDA-like | Net cash flow | Cumulative cash | Financing requirement | Capex |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| DOWNSIDE | 463 955.96 | 8 018.35 | 367 050.26 | 150 666.06 | −2 630 259.30 | −3 081 802.04 | −3 081 802.04 | 3 081 802.04 | 503 125.00 |
| BASE_HYPOTHETICAL | 4 397 543.08 | 62 381.43 | 3 426 647.12 | 1 688 226.86 | −618 061.78 | −464 878.15 | −464 878.15 | 995 185.23 | 402 500.00 |
| UPSIDE_HYPOTHETICAL | 13 130 674.77 | 162 941.70 | 10 148 301.82 | 5 475 105.86 | 3 963 913.46 | 5 311 017.86 | 5 311 017.86 | 621 240.91 | 342 125.00 |
| RESTRICTED_CURRENT | 0 | 0 | 0 | null | null | null | null | null | null |

- **Identities verified directly on the committed columns:** `refundsCash =
  refundsAllowance` every month; `cashReceiptsGross = directReceiptsGross +
  distributorCollectionsGross + subscriptionCashGross − refundsCash`; distributor
  invoiced = units × price × share × (1 − 35 %) with max deviation **0.02 EUR**;
  `gross − refunds − VAT − net = Δdeferred` (the first-audit record stated this identity
  without the deferred term; the corrected statement is the one verified here);
  COGS = units × declared unit cost; inventory unit identity exact and non-negative;
  purchases cash = receipts cost + Δprepayments − Δpayables; VAT lag with credit
  carry-forward; `operatingCashFlow = EBITDA-like − WC` and the direct cash route;
  net cash = operating + investing; opening 0 + Σ net cash = cumulative cash; financing
  requirement = running maximum drawdown; 12/36/60 views.
- **Corrections match the first-audit prediction exactly:** refunds cash moved BASE
  cumulative cash from −415 478.92 to −477 860.35 and financing from 987 326.73 to
  1 008 167.43; the distributor correction moved those to **−464 878.15 / 995 185.23**
  (also DOWNSIDE −3 081 802.04 and UPSIDE 5 311 017.86 / 621 240.91). ST-07 is now
  adverse by −51 773.42 cash and +17 442.20 financing versus BASE.
- **COST-16 and MC-12 inheritance unchanged:** MC-11 reconciliation 90/90, max subtotal
  delta 0.00, tooling never a variable cost, no repeat field; tooling/NRE 37 500.00 as
  capex at M02 BASE with 36-month amortisation (cumulative M12 124 444.44 / M36
  390 069.38 / M60 402 499.93); 13/13 inherited unit costs equal MC-12 records.
- **Break-even:** 70 thresholds, 0 verified, 14 NOT_DETERMINABLE, 56 conditional,
  18 MINIMUM_GROSS_PRICE now counted; months match (BASE M39/M23/no recovery; UPSIDE
  M15/M11/M23; DOWNSIDE none); no numeric NAV/WEATHER/PILOT threshold.
- **Governance:** `NOT_FOR_SALE`, `PRICE_APPROVED = NONE`, licensing not granted,
  `CUSTOMER_WTP_VALIDATED = false`, PILOT blocked, AIS receive-only, FLEET
  hardware-free, no MC-14 execution; unknown costs null; restricted case zero authorized
  revenue with evidenced zeros and null cost/cash columns.

## 5. Closure of the first-audit findings

| ID | Severity | First-audit issue | Re-verification evidence | Status |
|---|---|---|---|---|
| F-01 | BLOCKING | D21 delivery record / registry absent | D21 added (198 lines); registry row 13 populated (`IN PROGRESS — re-audit pending`); D-057 added; **D-02 PASS** | CLOSED_VERIFIED |
| F-02 | BLOCKING | Premature false independent-review PASS in D20 | D20 now `PENDING_REAUDIT` / `PARTIAL_WITHHELD_PENDING_REAUDIT`, no PASS claim; new check **D-11** rejects doc-level false PASS (mutation M19) | CLOSED_VERIFIED |
| F-03 | MAJOR | Refunds never paid in cash; ST-07 favourable | `refundsCash` = allowance, netted in receipts; **A-27**; BASE −464 878.15/995 185.23; ST-07 −516 651.57/1 012 627.43 (adverse) | CLOSED_VERIFIED |
| F-04 | MAJOR | Distributor invoice double VAT, no margin | Channel-adjusted trade price; **A-28**; BASE receivables 15 068.64, distributor invoiced 373 369.81 | CLOSED_VERIFIED |
| F-16 | MAJOR | Unit suite state-coupled | 29/29; synthetic final-record positive control; test 27 decoupled | CLOSED_VERIFIED |
| F-05 | MINOR | Contract §6 stale | Count now 77 and S-12/A-27/A-28/D-11 documented, but **A-15 still says “− paymentFees”** and A-13..A-23 ids remain misaligned | **OPEN (explicit reason)** |
| F-06 | MINOR | Empty scenario/threshold lineage | scenarioAssumptionIds 9/29 populated; portfolio threshold ids populated; **S-12** (mutation M18) | CLOSED_VERIFIED |
| F-07 | MINOR | Missing deferredRevenueRefundPct | Added (0) to all three cohortAssumptions | CLOSED_VERIFIED |
| F-08 | MINOR | Wrong blocker split in D09 | D09 now 9 BLOCKING / 5 MAJOR | CLOSED_VERIFIED |
| F-09 | MINOR | Headroom omitted channel factor | D07 now 66.48 / 103.33 / 32.62 / 62.10 / 79.24, consistent with its table | CLOSED_VERIFIED |
| F-10 | MINOR | Summary omitted MINIMUM_GROSS_PRICE | `minimumGrossPrice: 18`; counts sum to 70 | CLOSED_VERIFIED |
| F-11 | MINOR | Aggregate vs per-unit semantics | Per-unit/aggregate/average fields now distinct and documented, **but** the average is a static base-case 35.81 in all 24 cases (overrides not applied) and D13's ST-17 row/explanation contradicts the JSON | **OPEN (explicit reason)** |
| F-12 | MINOR | Restricted zeros vs null | Contract §4.9 now distinguishes evidenced zero-revenue derivatives from null cost/cash columns; data matches | CLOSED_VERIFIED |
| F-13 | INFORMATIONAL | evidenceCounts 152/153 | `officialLicensingDocuments: 1`; counts total 153 | CLOSED_INFORMATIONAL |
| F-14 | INFORMATIONAL | CI does not run the gate | Disclosed in D21 §8 as an accepted risk; CI still not wired | **OPEN (explicit reason)** |
| F-15 | INFORMATIONAL | Disclosed simplifications | D21 §8 / D10 / D05 / D06 retain the disclosures | CLOSED_INFORMATIONAL |

The three open items are non-blocking (2 MINOR, 1 INFORMATIONAL) and do not affect the
financial statements, the identities or the gate; they are recorded with their exact
required corrections and re-verification criteria in
[review-findings.json](../data/review-findings.json).

## 6. Adversarial mutation evidence (auditor-written, in-memory only)

| ID | Mutation | Intended check failed |
|---|---|---|
| M01 | VAT in net recognised revenue | A-03/A-04 |
| M02 | Tooling/NRE duplicated in amortisation | A-18/A-19 |
| M03 | Tooling/NRE embedded in variable unit cost | A-24/V-16 |
| M04 | Unknown data-licence zeroed | V-12 |
| M05 | Price hypothesis APPROVED | V-01 |
| M06 | PILOT safety gate bypassed | S-09/V-03 |
| M07 | One model period missing | A-01 |
| M08 | Cumulative-cash identity broken | A-13 |
| M09 | Receivables identity broken | A-06 |
| M10 | Cloud override no-op | A-26 |
| M11 | False reviewer PASS, no recomputation | D-07 |
| M12 | False reviewer PASS with open BLOCKING finding | D-07/V-19 |
| M13 | Amortisation above the capital schedule | A-18/A-19 |
| M14 | Cellular override no-op | A-26 |
| M15 | Refund cash outflow zeroed | **A-27** (+A-06) |
| M16 | Warranty stress reverted to the base refund rate | **A-27** (+A-26) |
| M17 | Distributor invoice reverted to full price × 1.21 | **A-28** (+A-06) |
| M18 | Scenario assumption lineage emptied | **S-12** |
| M19 | Document asserts an unawarded review PASS | **D-11** |

**19/19 mutations fail the intended check.** The four checks added for the first-audit
findings (A-27, A-28, S-12, D-11) each have a dedicated mutation and are not merely
self-consistent with the engine, because the corrected refunds and distributor rules were
also re-derived independently from the inputs.

## 7. Documentation and claim review

- **197/197** explicit numeric claims from D10 (9-view cash/financing table, bridge,
  VAT, refunds, receivables), D13 (all 24 stress rows: revenue, contribution, cumulative
  cash, financing, funding gap), D21 (headline results), D07 (channel-adjusted
  headroom), D09 (capex and blocker split) and D20 (scenario results) match the JSON.
- A search for the stale pre-correction figures (415 478.92 / 987 326.73 / 28 050.84 /
  3 075 765.77 / 5 440 764.18 / 983 928.23 / 404 870.91 / 4 051 733.31) returns no hit in
  any non-review document; the corrected figures are used consistently.
- No approved price, no commercial availability, no validated demand, no fabricated
  quotation or customer evidence, no profitability claim and no MC-14 execution were
  found. The reports explicitly keep external evidence `BLOCKED_OR_NOT_OBTAINED`.
- The residual documentation defects are F-05 (contract A-15/id mapping) and F-11
  (static per-unit average and D13 ST-17 wording); both are recorded OPEN with explicit
  reasons and are not financial-sign-off blockers.

## 8. Residual risks (accepted as disclosed, not waived)

External commercial evidence remains `BLOCKED_OR_NOT_OBTAINED` (0 quotations, 0
contracts, 0 granted rights, 0 customer evidence, `CUSTOMER_WTP_VALIDATED = false`).
Named unknown costs (data licence, insurance, CRA, FLEET onboarding/DPA/SLA, CAC,
churn/renewal, WTP, company cash) are excluded, so the true financing requirement is
higher than every reported figure. Opening cash is a zero analysis convention. VAT is an
illustration; the M60 VAT balance is paid in M61 outside the horizon. Demand, churn,
renewal and channel inputs are illustrative with no probability. The horizon truncates
the last two months of distributor collections (15 068.64 EUR BASE receivables at M60).
FX exposure is unhedged and inherited. Break-even thresholds are conditional or not
determinable, never verified. Refunds are paid in the sale month by assumption. These
risks are explicit in the corrected documents and are not defects for the internal scope.

## 9. What is required in the record commit

1. Commit this re-issued `MC-13-REVIEW.md` and `review-findings.json`.
2. Run `node scripts/build-marea-financial-model.mjs` (write mode) so the derived
   `data/manifest.json` is regenerated from the awarded verdict: its
   `MC13_INDEPENDENT_REVIEW` and `MC13_INTERNAL_FINANCIAL_SCOPE` become
   `PASS_INTERNAL_FINANCIAL_SCOPE` while `MC13_VERDICT` stays `PARTIAL` (external
   evidence is still missing). Do not hand-edit the manifest: the builder derives these
   fields from `review-findings.json` (build script `reviewStatus()`/`buildManifest()`).
3. Refresh the D20 and D21 status blocks to the awarded verdict and move
   `MASTER-PROMPT-REGISTRY.md` row 13 from `IN PROGRESS` to the final award.
4. Optionally close F-05 (contract A-15/id mapping) and F-11 (case-specific average
   unit contribution + D13 ST-17 wording); they are non-blocking.
5. Re-run `node scripts/check-marea-financial-model.mjs --allow-pending-review` (must be
   77/77), `node --test scripts/check-marea-financial-model.test.mjs` (must be 29/29)
   and `node scripts/build-marea-financial-model.mjs --check` (must be current), record
   the SHA in `finalRecordCommit`, then freeze the record commit.

In-memory validation with this record and the regenerated manifest already produces
**77/77 PASS / 0 FAIL**; the only gate failure on the current worktree is the derived
manifest (`V-19`), which the record-commit builder run resolves.

## 10. Final verdict

**`PASS_INTERNAL_FINANCIAL_SCOPE` for the corrected frozen candidate
`573d65a4e1f3c3799350691a6e698e97f5e483c1`, internal financial scope only.**

The corrected model is deterministic, independently reproducible (0 mismatches), its
cash/VAT/inventory/working-capital identities hold, the refund and distributor defects
are fixed and machine-checked (A-27/A-28), the first-audit blocking/major findings are
closed with evidence, the delivery record and registry are present, the document-level
false-PASS class is guarded (D-11), the unit suite is 29/29 and the gate reaches 77/77
once the Lead reconciles the manifest in the record commit. Three non-blocking findings
(F-05, F-11, F-14) remain OPEN with explicit reasons and do not affect this verdict.
External commercial evidence remains `BLOCKED_OR_NOT_OBTAINED` and no price,
availability, financing approval, verified break-even or MC-14 execution is implied.
`finalRecordCommit` remains `null` until the Lead records this audit.
