# MC-12 D01 — Baseline, scope and governance

Status: `INTERNAL_ECONOMICS_ANALYSIS`. Milestone 12 of 36. Date: 2026-11-02.
Owner: Programme Lead and Integration Architect.

This document freezes what MC-12 inherits, what it may change, what it must not
change, and how its output will be judged. It is written before the economic
model so that no conclusion can rewrite its own acceptance rule.

## 1. Verified predecessor baseline

The working branch was created from the verified MC-11 head, not from `main` and
not from an assumed SHA.

| Check | Command | Observed |
|---|---|---|
| Local branch before MC-12 | `git branch --show-current` | `feature/marea-mc11-hardware-sourcing-conformity` |
| Local HEAD | `git rev-parse HEAD` | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` |
| Remote MC-11 head | `git ls-remote origin feature/marea-mc11-hardware-sourcing-conformity` | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` |
| Working tree | `git status --porcelain` | clean before MC-12 work |
| Prompt-preparation SHA | reference in Master Prompt 12/36 | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` |

The local and remote heads match each other and match the SHA recorded when the
prompt was prepared. **No unexpected commit exists between prompt preparation and
execution.** The last four commits are record-only closures of MC-11
(`0eceb86` delivery records, `73ab0ac` audit corrections, `a912c4d` re-verification
refreshes, `5b47a3d` audit closure record); no technical surface is changed by
them. No difference therefore needs to be resolved before branching.

MC-12 branch: `feature/marea-mc12-recurring-data-unit-economics`, created from
`5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499`.

## 2. Predecessor pull request

| Field | Value |
|---|---|
| PR | [#18](https://github.com/manuelxose/embarcarte/pull/18) |
| State | `OPEN` |
| Draft | `true` |
| Merged | `null` (not merged) |
| Head branch | `feature/marea-mc11-hardware-sourcing-conformity` |
| Head SHA | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` |
| Base branch | `feature/marea-mc10r-fieldwork-recovery` |
| Changed files | 64 |

PR #18 remains open, draft and unmerged. MC-12 must stack on the MC-11 branch, not
on `main`, and must not merge, deploy or publish anything.

## 3. Immutable inherited states

The following values are inherited and may not be cleared, upgraded or implied to
be resolved by any MC-12 artefact. They are encoded as validator invariants.

```
MC10_VERDICT = BLOCKED
MC10R_VERDICT = PASS
MC11_VERDICT = PARTIAL
MC11_INTERNAL_FEASIBILITY_SCOPE = PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE
MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED
CUSTOMER_EVIDENCE = NONE
CUSTOMER_WTP_VALIDATED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
SOURCE_IP_CLEARANCE = NOT_CLEARED
NMEA2000_CERTIFIED = false
TESTED_COMPATIBILITY_ROWS = 0
PILOT_SAFETY_GATE = BLOCKED
AIS_TRANSMISSION_OFFERED = false
FLEET_DEFAULT_HARDWARE = false
```

MC-12 adds two verdicts of its own and nothing else:

```
MC12_VERDICT            = PARTIAL
MC12_INTERNAL_ECONOMICS_SCOPE = PASS_INTERNAL_ECONOMICS_SCOPE
MC12_EXTERNAL_COMMERCIAL_EVIDENCE = BLOCKED_OR_NOT_OBTAINED
```

## 4. Source inventory and authority

Every financial, product, contractual and governance input comes from one of the
files below. Where the same fact appears twice, the precedence is the order shown.

| Tier | Source | Authority in MC-12 |
|---|---|---|
| A | `docs/marea/hardware/data/cost-scenarios.json` | Only authority for MC-11 modelled cost lines, assumptions `ASM-001..ASM-013`, 90 scenarios, tooling amortisation, unknown certification |
| A | `docs/marea/hardware/data/engineering-bom.json` | Component identity and priced-line coverage |
| A | `docs/marea/hardware/data/manufacturing-bom.json` | Labour/process assumptions and coverage |
| A | `docs/marea/hardware/data/price-observations.json` | 42 public price observations and their VAT basis |
| A | `docs/marea/hardware/data/supplier-register.json` | Supplier identity; no quotations |
| A | `docs/marea/hardware/data/conformity-applicability.json` | Regulatory applicability |
| A | `docs/marea/hardware/data/risks.json` | Inherited risk register |
| A | `docs/marea/products/product-definitions.batch-*.json` | Product families, editions, lifecycle, readiness, price hypotheses |
| A | `docs/marea/bundles/bundle-definitions.json` | Six bundle identities, components, price hypothesis register `PH-01..PH-06` |
| A | `docs/marea/COMMERCIAL-PORTFOLIO.md` | End-state product and bundle definitions |
| B | `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` | Milestone acceptance criteria and historical verdicts |
| B | `docs/marea/execution/DECISION-LOG.md` | Binding decisions D-001..D-048 |
| B | `docs/marea/customer-discovery/**` | Customer evidence state (NONE) |
| B | `docs/marea/market-validation/**` | Market hypotheses, never validated demand |
| C | MC-12 primary-source research (`docs/marea/economics/research/*`) | Public provider and legal evidence, cited with URL and date |

Nothing in tier C may override tier A on a product, cost or bundle fact.

## 5. Scope

### In scope

1. Per-product, per-edition and per-bundle variable cost and contribution
   structure, ex-VAT in intent, with every input classified.
2. Recurring cost drivers: per active device-month, connected vessel-month,
   subscription-month, organisation-month, FLEET vessel, alert/message, GB,
   telemetry event, chart entitlement, support incident.
3. Licensing and data-rights landscape for chart, weather, NMEA, connectivity and
   cloud, including what is explicitly not granted.
4. Provider price register with retrieval dates and evidence classification.
5. Volume (`1/10/100/500/1000`), channel and price sensitivity using explicitly
   hypothetical selling prices.
6. Per-family decision matrix and provisional priority, under pre-registered
   decision rules.
7. Machine-readable datasets, deterministic validator and adversarial tests.
8. MC-13 handoff inputs, without executing MC-13.

### Out of scope and prohibited

- No supplier or data-provider outreach, RFQ transmission, account registration,
  purchase, payment, paid-API activation or contractual acceptance.
- No approved selling price, no published catalogue/checkout/advertisement/SEO
  change, no payment-flow change, no deployment.
- No claim that demand, willingness to pay, certification, compatibility or
  profitability is established.
- No clearing of any inherited immutable state, and no edit of historical
  MC-01..MC-11 verdicts.
- No AIS transmission offering, ever.
- No PILOT price approval or PILOT commercial availability.
- No FLEET default hardware.
- No gating of local safety functions behind a subscription.

## 6. Acceptance criteria (from the governing registry)

Registry row 12 requires: **unit-economics worksheets; bottom-up costs with
sources; no unlabelled assumptions; data/connectivity quotes real.**

MC-12 is therefore judged on two separate axes, because the last clause cannot be
satisfied internally:

| Axis | Requirement | Expected result |
|---|---|---|
| Internal economics scope | Traceable model, classified evidence, arithmetic reconciliation, deterministic gate, adversarial tests, independent audit | Can PASS on its own terms |
| External commercial evidence | Real chart/weather licensing terms, connectivity and cloud contracts or formal quotations, customer willingness to pay | BLOCKED — no outreach is authorised and no quotation exists |

The possible milestone outcomes are `PASS`, `PARTIAL`, `BLOCKED`, `FAIL`. A full
`PASS` requires genuine formal provider pricing and licensing evidence; because
that evidence cannot be obtained under the external-contact prohibition, the
honest full verdict is `PARTIAL`. `PARTIAL` is a correct result, not a defect.

## 7. Accounting conventions

- Currency: EUR. No other currency is summed without an explicit, recorded
  conversion with source and date. An assumed rate is labelled
  `ENGINEERING_ASSUMPTION`.
- VAT: all contribution arithmetic is ex-VAT in intent. A VAT-inclusive consumer
  hypothesis is converted with the statutory rate recorded in
  `legal-tax-inputs.json` (Spain 21 % → net = gross / 1.21). The conversion is
  disclosed per revenue line; VAT-inclusive figures are never presented as net
  revenue.
- Unknown cost: represented as `null`, never `0`, and carried in
  `unknownCostCategories`. A record with a material unknown cost cannot publish a
  contribution percentage.
- Rounding: monetary values 2 decimal places, half-up; percentages 1 decimal
  place. Recomputation tolerance ±0.005 EUR.
- Fixed versus variable: tooling/NRE amortisation (`COST-16`), engineering NRE and
  certification are fixed and excluded from unit contribution. Installation
  (`COST-12`) is a separate service cost, included only in configurations that
  include installation.
- Tooling invariance: `knownSubtotalEur` already contains the `COST-16` line;
  `toolingAmortizationEur` repeats it and is never added again.
- Revenue, gross margin, contribution and net profit are four different things and
  are labelled as such. No net-profit figure is produced.

## 8. Evidence classification

Only these classes may appear in MC-12 data:

`FORMAL_PROVIDER_QUOTATION`, `EXECUTED_CONTRACT`, `PUBLISHED_PROVIDER_TARIFF`,
`OFFICIAL_LICENSING_DOCUMENT`, `PUBLIC_PRICE_OBSERVATION`, `ENGINEERING_ASSUMPTION`,
`INACCESSIBLE`, `UNKNOWN`, `NOT_AUTHORIZED`.

Because no outreach is authorised, `FORMAL_PROVIDER_QUOTATION` and
`EXECUTED_CONTRACT` must not appear anywhere in the MC-12 data. A website price is
not a quotation; a documentation page is not a contractual right; a free tier is
not production eligibility; a published tariff is not a negotiated price.

## 9. Pre-registered decision rules

These rules are fixed before results are seen. The weights sum to 100 and are
stored in `data/assumptions.json` (`DECT-01`, `DECT-02`).

| Dimension | Weight |
|---|---|
| Cost evidence completeness | 25 |
| Recurring-cost exposure certainty | 15 |
| Provider licensing readiness | 20 |
| Technical readiness | 10 |
| Customer evidence | 15 |
| Regulatory readiness | 10 |
| Contribution confidence | 5 |

Classification rule (evaluated in this order, first match wins; a lower-ranked rule
never overrides a higher one):

1. `SAFETY_BLOCKED` — any safety gate is closed for the object (PILOT).
2. `LICENSING_BLOCKED` — a required data or IP right is not granted.
3. `COST_MODEL_INCOMPLETE` — a material **unit-variable** cost category is `UNKNOWN`.
   A fixed one-off unknown (tooling, certification programme, insurance, engineering
   NRE) is carried separately and does not by itself make the unit case incomplete.
4. `ECONOMICS_EVIDENCED` — every material cost is evidenced and contribution is
   positive under the base scenario.
5. `CONDITIONAL_ECONOMIC_CASE` — evidenced costs plus explicit conditional
   hypotheses and no blocking right.
6. `DEFER_RECOMMENDED` — the conditional case is negative under credible stress.

An economic score can never override a legal, safety or IP gate.

## 10. Dependency graph

```
MC-11 cost-scenarios / BOMs / price observations
        └─> hardware cost reconciliation ─┐
MC-02 licensing blockers + provider research ─┤
MC-08 bundle definitions + price hypotheses ──┼─> unit economics ─> bundle economics
MC-09 market hypotheses (WTP unvalidated) ────┤        │                │
MC-10/10R customer evidence = NONE ───────────┘        v                v
                                              recurring model   sensitivity / stress
                                                       └──────> decision matrix ─> MC-13 handoff
```

## 11. Deliverable index

D01 this file; D02 `data/MC12-DATA-CONTRACT.md`; D03 `MC12-LICENSING-AND-RIGHTS-LANDSCAPE.md`;
D04 `MC12-PROVIDER-RESEARCH-AND-PRICE-REGISTER.md`; D05 `MC12-CLOUD-AND-CELLULAR-COST-MODEL.md`;
D06 `MC12-HARDWARE-COST-RECONCILIATION.md`; D07 `MC12-PER-SKU-CONTRIBUTION-MODEL.md`;
D08 `MC12-SUBSCRIPTION-AND-RECURRING-REVENUE-MODEL.md`; D09 `MC12-COMMERCIAL-CHANNEL-ECONOMICS.md`;
D10 `MC12-BUNDLE-ECONOMICS.md`; D11 `MC12-SENSITIVITY-AND-STRESS-ANALYSIS.md`;
D12 `MC12-COMMERCIAL-PRIORITIZATION.md`; D13 `MC12-BLOCKER-REGISTER.md`;
D14 `MC12-MC13-HANDOFF.md`; D15 `data/*.json`; D16 `scripts/check-marea-unit-economics.mjs` +
tests; D17 `review/MC-12-REVIEW.md`; D18 `MC12-EXECUTIVE-REPORT.md` (Spanish);
D19 `MC-12-DELIVERY.md`.
