# MC-13 D01 — Baseline and governance

| Field | Value |
|---|---|
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Deliverable | D01 `MC-13-BASELINE-AND-GOVERNANCE.md` |
| Date | 2026-11-02 |
| Owner | `programme-lead` |
| Branch | `feature/marea-mc13-financial-model-cashflow-break-even` |
| Verified base | MC-12 `e59a8b9b3916d979d8eaeff78acd3795fd26c125` (local = remote = prompt-preparation SHA) |
| Predecessor branch | `feature/marea-mc12-recurring-data-unit-economics` |
| Predecessor PR | [#19](https://github.com/manuelxose/embarcarte/pull/19), open, draft, stacked, unmerged |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` |
| Commercial availability | `NOT_FOR_SALE` |
| Price approved | `NONE` |
| MC-14 started | `false` |

## 1. Purpose and boundary

MC-13 turns the frozen MC-11 hardware evidence and MC-12 unit economics into one
integrated 60-period financial model with 12-, 36- and 60-month reporting views, a
monthly cash-flow and working-capital model, an investment and financing schedule,
three hypothetical post-clearance scenarios plus the restricted current case,
conditional break-even thresholds and a full stress suite.

It is an **analysis milestone**. It does not approve a price, does not make a product
commercially available, does not obtain financing, does not create customer evidence,
does not clear any licensing or safety gate, does not authorize a launch and does not
start MC-14. A `PASS` for the internal financial scope would not establish commercial
profitability, financing availability or launch authorization.

## 2. Verified repository baseline

Preflight performed before any MC-13 write:

| Check | Result |
|---|---|
| Current branch before work | `feature/marea-mc12-recurring-data-unit-economics` |
| `git rev-parse HEAD` | `e59a8b9b3916d979d8eaeff78acd3795fd26c125` = expected MC-12 HEAD |
| Remote MC-12 head | `e59a8b9b3916d979d8eaeff78acd3795fd26c125` (identical) |
| MC-11 base present | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` |
| Merge base MC-12 / MC-11 | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` |
| Tracked worktree before work | clean (`git status --porcelain` empty) |
| Untracked files before work | none |
| Ancestor chain observed | `e59a8b9` → `0f7e826` → `2460309` → `05883ac` → `8f819c1` → `fe97062` → `e6e181a` → `5b47a3d` |
| MC-12 delivery/audit evidence present | `docs/marea/economics/MC-12-DELIVERY.md`, `review/MC-12-REVIEW.md`, `data/review-findings.json` |
| MC-11 data present | `docs/marea/hardware/data/*.json`, 90 cost scenarios |

No predecessor file was modified. `data/predecessor-baseline.json` records the SHA-256
of 45 inherited MC-11/MC-12 data and contract files, and the validator recomputes every
hash (check `D-06`).

The MC-13 branch was created directly from the verified MC-12 HEAD, never from `main`.

## 3. Governing documents read and enforced

- `docs/marea/execution/MASTER-PROMPT-REGISTRY.md`
- `docs/marea/execution/DECISION-LOG.md` (including D-049…D-052)
- `docs/marea/execution/AGENT-OPERATING-MODEL.md`
- `docs/marea/economics/MC12-MC13-HANDOFF.md`
- `docs/marea/economics/data/mc13-handoff-inputs.json`
- `docs/marea/economics/data/MC12-DATA-CONTRACT.md`, `unit-economics.json`,
  `hardware-cost-reconciliation.json`, `assumptions.json`, `licensing-rights.json`,
  `blocker-register.json`, `legal-tax-inputs.json`, `recurring-cost-inputs.json`,
  `channel-economics.json`, `bundle-economics.json`
- `docs/marea/hardware/data/cost-scenarios.json` and the MC-11 engineering/manufacturing BOMs
- `docs/marea/products/product-definitions.batch-01/02/03.json`
- `docs/marea/bundles/bundle-definitions.json`
- `docs/marea/execution/MC-01-BASELINE.md` and the prior delivery reports

## 4. Frozen predecessor verdicts

The following are authoritative and are not re-interpreted by MC-13:

```text
MC10_VERDICT = BLOCKED
MC10R_VERDICT = PASS
MC11_VERDICT = PARTIAL
MC11_INTERNAL_FEASIBILITY_SCOPE = PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE
MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED
MC12_VERDICT = PARTIAL
MC12_INTERNAL_ECONOMICS_SCOPE = PASS_INTERNAL_ECONOMICS_SCOPE
MC12_EXTERNAL_COMMERCIAL_EVIDENCE = BLOCKED_OR_NOT_OBTAINED
MC12_INDEPENDENT_REVIEW = PASS_INTERNAL_ECONOMICS_SCOPE
MC12_PRICE_APPROVED = NONE
MC12_COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
```

The validator checks these against the MC-12 manifest, the registry and the delivery
status block (`V-07`, `D-01`).

## 5. Absolute governance invariants

Preserved in every scenario and every document:

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
SOURCE_IP_CLEARANCE = NOT_CLEARED
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PRICE_APPROVED = NONE
CUSTOMER_EVIDENCE = NONE
CUSTOMER_WTP_VALIDATED = false
FORMAL_SUPPLIER_QUOTATIONS = NONE
LICENSING_RIGHTS_GRANTED = false
PILOT_SAFETY_GATE = BLOCKED
AIS_TRANSMISSION_OFFERED = false
FLEET_DEFAULT_HARDWARE = false
NMEA2000_CERTIFIED = false
TESTED_COMPATIBILITY_ROWS = 0
CE_MARKING_CLAIM = PROHIBITED
MERGED = false
DEPLOYED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
```

A financial model may never override a safety, legal, certification, IP, licensing or
commercial gate. A hypothetical clearance switch is an analysis parameter; it does not
change the real status flags. No simulated financial success creates a real valuation,
demand or investment return.

## 6. Scenario cases

| Scenario | Eligibility case | Revenue authorization | Meaning |
|---|---|---|---|
| `RESTRICTED_CURRENT` | restricted current | none | Current authorized commercial reality: every product `NOT_FOR_SALE`, zero authorized revenue, company cash and expenses `UNKNOWN`. |
| `DOWNSIDE` | hypothetical post-clearance | analysis only | Slower adoption, delayed licensing, certification delays, higher support burden, lower renewal, margin pressure. |
| `BASE_HYPOTHETICAL` | hypothetical post-clearance | analysis only | Explicit sequencing, moderate illustrative adoption, declared cadence, known costs plus named unknowns. |
| `UPSIDE_HYPOTHETICAL` | hypothetical post-clearance | analysis only | Faster adoption, better retention, lower operating-cost intensity. |

The three hypothetical cases are **not** forecasts validated by customers. No probability
is assigned. The restricted case exists precisely so a favourable hypothetical cannot be
mistaken for the current business.

## 7. Model commitments

1. One integrated 60-period model; the 12/36/60 views aggregate from it and are never
   independent models.
2. Model-relative periods `M01`…`M60`; no real calendar launch date is asserted.
3. Nine product families (NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET)
   and the six bundles (START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET) are covered
   without changing their frozen classifications.
4. Every numeric input resolves to an assumption record with evidence class, source and
   lineage; `null` means unknown and is never zero.
5. Demand, churn, renewal, activation and channel mix are labelled `SCENARIO_ASSUMPTION`.
6. Unknown data-licence, insurance, CRA, FLEET onboarding/DPA/SLA and supplier/customer
   terms remain explicit named unknowns; full profit is suppressed accordingly.
7. Tooling/NRE is capital expenditure and non-cash amortisation, never a variable unit
   cost, and is never counted twice.
8. Inventory purchases cash, COGS and working-capital movements reconcile.
9. Break-even is conditional and clearly classified; unknown inputs force
   `NOT_DETERMINABLE`.
10. Negative and adverse results are retained, including cases where unit contribution
    stays positive while company-level cash never recovers.

## 8. Work ownership and independent review

| Role | Scope |
|---|---|
| Lead / programme director | Git, integration, data contract, engine, generator, validator, baseline, delivery, registry, decision log |
| Financial architect | D04 integrated model, D12 break-even, D11 scenario views, D13 sensitivity/stress |
| Hardware/manufacturing economist | D06 hardware/inventory cash flow, D10 working capital |
| SaaS economist | D05 revenue/cohorts, D07 recurring/SaaS |
| Commercial/capital planner | D09 capex/funding, D14 portfolio prioritization |
| Compliance/risk specialist | D08 opex/security lifecycle, D15 unknowns/blockers, D16 MC-14 handoff |
| Financial data engineer | D18 machine data, engine support and adversarial test suite |
| Independent financial auditor | D19 independent audit of the frozen candidate commit |

The auditor is a different agent from every author and may withhold sign-off. A
documentation-only correction never re-characterizes which implementation commit was
audited.

## 9. Prohibited actions asserted absent

No merge, deploy, publication, public price/catalogue/checkout/SEO/payment change, no
customer, supplier or provider contact, no RFQ, no account registration, no purchase,
no paid API, no certification, no AIS transmission offer, no PILOT commercial
availability, no FLEET default hardware, no safety gating, no trademark filing and no
MC-14 execution. Read-only research from legitimate public sources is permitted and no
new external observation was added by MC-13.

## 10. Acceptance criteria for this milestone

`PASS` is allowed only when the complete MC-13 analytical scope is verified: integrated
60-month model; reconciling 12/36/60 views; full portfolio coverage; operational
scenario framework; verified cash-flow and working-capital treatment; verified capital
investment accounting; correct conditional break-even; preserved unknown inputs;
complete evidence lineage; all mandatory deliverables; deterministic and adversarial
tests passing; inherited regression gates passing; independent review with no blocking
or major defects; commercial restrictions preserved; and a draft PR without merge or
deployment.

`PARTIAL` applies when meaningful internal financial modelling is delivered but a
governing acceptance criterion cannot be satisfied because of a documented external
blocker (no quotations, no licences, no customer evidence, no insurance quotation, no
company accounts). `BLOCKED` applies when no defensible implementation can be completed.
`FAIL` applies to unresolved material accounting errors, fabricated evidence or
governance violations. A favourable hypothetical result never upgrades the verdict.

## 11. Machine companion and executable gate

- Contract and canonical inventory: `MC13-FINANCIAL-DATA-CONTRACT.md` (D02).
- Machine data: `data/*.json`.
- Deterministic engine and builder: `scripts/marea-financial-engine.mjs`,
  `scripts/build-marea-financial-model.mjs`.
- Gate: `scripts/check-marea-financial-model.mjs` (`npm run test:financial`) with the
  adversarial suite `scripts/check-marea-financial-model.test.mjs`
  (`npm run test:financial:unit`).
