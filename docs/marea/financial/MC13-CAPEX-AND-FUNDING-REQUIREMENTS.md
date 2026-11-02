# MC-13 D09 — Capital investment and funding requirements

| Field | Value |
|---|---|
| Deliverable | D09 `MC13-CAPEX-AND-FUNDING-REQUIREMENTS.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` — capital schedule, conditional financing requirement and unfunded envelope |
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date | 2026-11-02 |
| Owner | Commercial Strategy and Capital Planning |
| Machine authorities | [capital-investments.json](data/capital-investments.json), [scenario-results.json](data/scenario-results.json), [stress-tests.json](data/stress-tests.json), [assumptions.json](data/assumptions.json), [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) |
| Boundary | Analysis only. No investment approval, no financing offer and no commitment is produced or implied. |

## 0. Statement of limitation

Every amount in this document is an analytical envelope, an inherited engineering
sensitivity or a labelled scenario assumption. There is no formal supplier quotation,
no laboratory quotation, no term sheet, no investor commitment and no written funding
authorization. `capital-investments.json` states this explicitly: no amount is a
quotation, an approved budget or an investment authorization. The model therefore
reports a **conditional** financing requirement that excludes named unknown costs; the
true requirement is higher than every figure below.

## 1. Purpose, authority and rules

This schedule is the capital-investment companion to the integrated model. It exists
to make three things auditable: what capital the programme would need, when it would
be spent, and how it is treated in cash flow and accounting.

- MC-13 decision precedent: [D-050](../execution/DECISION-LOG.md) reclassifies
  tooling/NRE and certification as fixed one-off programme costs, excludes them from
  variable unit cost and forbids double counting.
- Contract rules: capex cash and non-cash amortisation are separated (`V-15`,
  `A-19`, `A-20`); working capital and reserves are never presented as capex
  (`A-15`); unknown amounts stay `null`, never `0` (`U-04`, `U-11`).
- The known capex envelope is the sum of the eight quantified lines in
  `capital-investments.json`: **EUR 402 500.00**. The assumption range spans
  **EUR 241 500.00 to EUR 644 000.00** (derived by summing the per-line ranges).
- Scenario multipliers are declared assumptions: `ASM-MC13-039` (DOWNSIDE 1.25),
  `ASM-MC13-040` (BASE 1.00), `ASM-MC13-041` (UPSIDE 0.85).

## 2. Required investment categories and inventory reconciliation

Thirteen categories are in scope. The machine inventory carries eleven items; two
categories are **not separately inventoried** and remain `UNKNOWN`, so they never enter
the modelled capex envelope and the conditional requirement is a floor.

| Required category | Inventory line | Status |
|---|---|---|
| Hardware, firmware and mechanical engineering | `INV-03` | INVENTORIED |
| Mechanical design, tooling and NRE per family | `INV-01` | INVENTORIED (MC-11 sensitivity envelope) |
| Manufacturing setup | — | **NOT INVENTORIED — UNKNOWN** |
| First-article and certification samples | `INV-06` | INVENTORIED |
| EMC/RED conformity (incl. environmental, CRA) | `INV-02` | INVENTORIED |
| Product-safety verification | — | **NOT INVENTORIED — UNKNOWN** (PILOT safety gate closed) |
| Security and update infrastructure | `INV-07` | INVENTORIED |
| Cloud, IoT and connectivity integration | `INV-04` | INVENTORIED |
| Legal, trademark and IP clearance | `INV-05` | INVENTORIED |
| Software development (apps, portal, integration) | `INV-08` | INVENTORIED |
| Initial inventory | `INV-09` | INVENTORIED as working capital, **not capex** |
| Working capital | `INV-10` | INVENTORIED as working capital, **not capex** |
| Contingency reserves | `INV-11` | INVENTORIED as an unfunded reserve, **not capex** |

## 3. Capital investment schedule

### 3.1 Quantified capital lines (`INV-01` to `INV-08`)

| ID | Investment item | estimatedAmount (EUR) | evidenceStatus | assumptionRange (EUR) | plannedMonth | requiredBeforeRevenue | capitalizationTreatment | cashFlowTreatment |
|---|---|---|---|---|---|---|---|---|
| INV-01 | Tooling and NRE per family (MC-11 ASM-008 envelope) | 37 500.00 | `INHERITED_ASSUMPTION` | 22 500.00 – 60 000.00 | 2 | true | `CAPITALIZED` / 36 months | `INVESTING_CASH_OUTFLOW` |
| INV-02 | Certification and conformity (EMC/RED/environmental/CRA) | 60 000.00 | `SCENARIO_ASSUMPTION` | 36 000.00 – 96 000.00 | 4 | true | `CAPITALIZED` / 36 months | `INVESTING_CASH_OUTFLOW` |
| INV-03 | Hardware, firmware and mechanical engineering NRE | 120 000.00 | `SCENARIO_ASSUMPTION` | 72 000.00 – 192 000.00 | 1 | true | `CAPITALIZED` / 36 months | `INVESTING_CASH_OUTFLOW` |
| INV-04 | Cloud, connectivity integration and device provisioning | 25 000.00 | `SCENARIO_ASSUMPTION` | 15 000.00 – 40 000.00 | 3 | true | `CAPITALIZED` / 24 months | `INVESTING_CASH_OUTFLOW` |
| INV-05 | Legal, trademark and IP clearance | 35 000.00 | `SCENARIO_ASSUMPTION` | 21 000.00 – 56 000.00 | 1 | true | `CAPITALIZED` / 36 months | `INVESTING_CASH_OUTFLOW` |
| INV-06 | First-article and certification samples | 15 000.00 | `SCENARIO_ASSUMPTION` | 9 000.00 – 24 000.00 | 4 | true | `CAPITALIZED` / 24 months | `INVESTING_CASH_OUTFLOW` |
| INV-07 | Security and update infrastructure (CRA-related) | 30 000.00 | `SCENARIO_ASSUMPTION` | 18 000.00 – 48 000.00 | 6 | true | `CAPITALIZED` / 36 months | `INVESTING_CASH_OUTFLOW` |
| INV-08 | Software development (apps, portal, integration) | 80 000.00 | `SCENARIO_ASSUMPTION` | 48 000.00 – 128 000.00 | 2 | true | `CAPITALIZED` / 36 months | `INVESTING_CASH_OUTFLOW` |

### 3.2 Non-capex items and all funding dependencies

| ID | Item | estimatedAmount (EUR) | evidenceStatus | assumptionRange | fundingDependency | blockingCondition |
|---|---|---|---|---|---|---|
| INV-09 | Initial inventory | null (`UNKNOWN`) | `WORKING_CAPITAL` | null | "Inventory financing not established." | "No supplier payment term, MOQ or credit line exists." |
| INV-10 | Working capital | null (`UNKNOWN`) | `WORKING_CAPITAL` | null | "No credit facility exists." | "No supplier or customer terms exist." |
| INV-11 | Contingency reserve | null (`UNKNOWN`) | `SCENARIO_ASSUMPTION` | null | "Contingency reserve not funded." | null |

For `INV-01` to `INV-08` the `fundingDependency` is the same string: "External funding
and written authorization not obtained." Their `blockingCondition` references are
`BLK-COST-03` (`INV-01`, `INV-03`), `BLK-COST-01` (`INV-02`), `BLK-LIC-06`
(`INV-04`), `BLK-LIC-08` (`INV-05`), `BLK-REG-02` (`INV-07`); `INV-06` and `INV-08`
carry `blockingCondition: null` but are still unapproved scenario envelopes.
`INV-09`, `INV-10` and `INV-11` are **not capex** and are excluded from every capex
total by construction.

## 4. The MC-11 tooling envelope is not a quotation and not a budget

`INV-01` inherits the MC-11 ASM-008 engineering sensitivity. It is an engineering
sensitivity, **not a vendor quotation** and **not an approved budget**:

| Family | Envelope (EUR) |
|---|---|
| HUB | 12 000 |
| WATCH | 8 000 |
| SENSE | 3 500 |
| DISPLAY | 9 000 |
| AIS | 5 000 |
| **Total** | **37 500** |

The record carries `notAQuote: true` and `notABudget: true`, evidence status
`INHERITED_ASSUMPTION`, and range EUR 22 500 – 60 000. It is capitalised and
amortised as a fixed one-off cost (D-050); it is never loaded into variable unit cost
and never added a second time.

## 5. Capex cash versus non-cash amortisation

| Scenario | Capex multiplier | Capex cash (EUR) | Contingency reserve, 15 % (EUR, non-capex) | Amortisation M12 (EUR) | Amortisation M36 (EUR) | Amortisation M60 (EUR) |
|---|---|---|---|---|---|---|
| DOWNSIDE | 1.25 (`ASM-MC13-039`) | 503 125.00 | 75 468.75 | 155 555.56 | 487 586.87 | 503 125.07 |
| BASE_HYPOTHETICAL | 1.00 (`ASM-MC13-040`) | 402 500.00 | 60 375.00 | 124 444.44 | 390 069.38 | 402 499.93 |
| UPSIDE_HYPOTHETICAL | 0.85 (`ASM-MC13-041`) | 342 125.00 | 51 318.75 | 105 777.74 | 331 558.95 | 342 124.92 |
| RESTRICTED_CURRENT | not applied | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |

BASE capex cash falls in five months by `plannedMonth`: M01 EUR 155 000.00
(`INV-03` + `INV-05`), M02 EUR 117 500.00 (`INV-01` + `INV-08`), M03 EUR 25 000.00
(`INV-04`), M04 EUR 75 000.00 (`INV-02` + `INV-06`), M06 EUR 30 000.00 (`INV-07`);
total EUR 402 500.00; DOWNSIDE and UPSIDE scale every payment by their multiplier.

- **Cash:** `capexCash` is an `INVESTING_CASH_OUTFLOW`, counted in `investingCashFlow`
  and therefore in `netCashFlow`.
- **Non-cash:** `amortizationNonCash` is deducted only in `accountingOperatingResult`;
  it is excluded from operating cash flow (`A-19`) and never enters unit variable
  cost (`V-15`, `A-20`).
- Amortisation starts in the spend month over 24 or 36 months. Cumulative
  amortisation at M60 equals capex cash except for monthly rounding of at most
  EUR 0.07; this is not a missing cost.
- No capex figure is a budget, purchase order or committed spend.

## 6. Working capital and contingency are not capital expenditure

| Item | Treatment | Modelled basis |
|---|---|---|
| Initial inventory (`INV-09`) | `WORKING_CAPITAL_NOT_CAPEX` | `inventoryPurchasesCash` in the monthly model |
| Working capital (`INV-10`) | `WORKING_CAPITAL_NOT_CAPEX` | `workingCapitalMovement` in the monthly model |
| Contingency (`INV-11`) | `RESERVE_NOT_SPENT`, `NOT_CAPITALIZED` | 15 % of known capex (`ASM-MC13-043`): EUR 60 375.00 in BASE |

| Scenario | Inventory purchases cash to M60 (EUR) | Cumulative working-capital movement to M60 (EUR) | Contingency reserve (EUR) |
|---|---|---|---|
| DOWNSIDE | 209 338.10 | -57 618.53 | 75 468.75 |
| BASE_HYPOTHETICAL | 1 541 872.72 | -605 082.86 | 60 375.00 |
| UPSIDE_HYPOTHETICAL | 4 016 463.75 | -1 818 975.72 | 51 318.75 |

These are real cash movements, but they are **not capex**: the modelled capex total
remains EUR 402 500.00 (BASE) and never absorbs inventory, working-capital movement or
the reserve. The contingency reserve is an unfunded analytical allowance, not a
committed spend; it is excluded from capex cash and from the financing requirement.

## 7. Conditional financing requirement by scenario

Definitions: `financingRequirement` is the running maximum of `max(0, −cumulativeCashBalance)`
with the zero-opening-cash convention (`ASM-MC13-044`). The illustrative funding
envelope is EUR 2 000 000.00 (`ASM-MC13-046`): a **hypothetical analytical envelope,
not an offer or commitment**. Gap = `max(0, financingRequirement − envelope)`; headroom
= `max(0, envelope − financingRequirement)`. DOWNSIDE exceeds the envelope; its gap is
a **conditional** analytical shortfall, not an observed funding deficit, and BASE and
UPSIDE remain within it as conditional headroom. Pre-revenue exposure is the derived
sum of `netCashFlow` before first revenue.

| Scenario | First revenue month (derived) | Cumulative pre-revenue exposure (derived, EUR) | Financing requirement (EUR) | Cumulative cash M60 (EUR) | Envelope (EUR) | Gap (EUR) | Headroom (EUR) |
|---|---|---|---|---|---|---|---|
| DOWNSIDE | M14 | -1 074 159.40 | 3 075 765.77 | -3 075 765.77 | 2 000 000.00 | **1 075 765.77** | 0.00 |
| BASE_HYPOTHETICAL | M07 | -627 623.61 | 987 326.73 | -415 478.92 | 2 000 000.00 | 0.00 | 1 012 673.27 |
| UPSIDE_HYPOTHETICAL | M06 | -445 423.51 | 632 135.66 | 5 440 764.18 | 2 000 000.00 | 0.00 | 1 367 864.34 |
| RESTRICTED_CURRENT | no authorized sale | UNKNOWN | UNKNOWN | UNKNOWN | 2 000 000.00 | NOT_DETERMINABLE | NOT_DETERMINABLE |

Conditional break-even status (from [scenario-results.json](data/scenario-results.json)):
BASE operating break-even M39 and cash-flow break-even M23, cumulative cash recovery not
reached within 60 periods; UPSIDE operating M15, cash-flow M11, cumulative recovery M23;
DOWNSIDE all three `UNKNOWN` / `CONDITIONAL_HYPOTHETICAL_THRESHOLD`. Contribution at M60
is EUR 150 666.06 / 1 688 226.86 / 5 475 105.86 and EBITDA-like is
EUR -2 630 259.30 / -618 061.78 / 3 963 913.46 (DOWNSIDE / BASE / UPSIDE). None is a
verified break-even: every figure excludes named unknown costs, including unknown
capex and certification.

## 8. Stress evidence on the funding envelope

[stress-tests.json](data/stress-tests.json) runs 24 declared single-variable and
compound cases on the BASE hypothesis. Summary: **24 of 24** miss cash recovery within
60 periods, **23 of 24** keep positive unit contribution yet still collapse at company
level, and only **2 of 24** exceed the EUR 2 000 000 envelope (`fundingGapEur > 0`:
ST-17 and ST-24). Stress financing requirements range from EUR 983 928.23 (ST-07) to
EUR 2 708 788.64 (ST-17); across scenarios and stress cases the range is EUR 632 135.66
(UPSIDE) to EUR 3 075 765.77 (DOWNSIDE), against a BASE reference of EUR 987 326.73.

| Case | Stress | Financing requirement (EUR) | Envelope (EUR) | Gap (EUR) | Cumulative cash M60 (EUR) | Insolvent without funding |
|---|---|---|---|---|---|---|
| ST-07 | Warranty and returns 6 % | 983 928.23 | 2 000 000 | 0.00 | -404 870.91 | false |
| ST-16 | No licensing clearance | 1 621 575.35 | 2 000 000 | 0.00 | -1 621 575.35 | false |
| ST-17 | No customer acquisition | 2 708 788.64 | 2 000 000 | 708 788.64 | -2 708 788.64 | true |
| ST-19 | Inventory overstock and 30 % write-down | 1 013 587.28 | 2 000 000 | 0.00 | -466 121.52 | false |
| ST-23 | Compound adverse case | 1 344 974.00 | 2 000 000 | 0.00 | -1 258 225.84 | false |
| ST-24 | Positive unit contribution, company viability collapse | 2 021 059.52 | 2 000 000 | 21 059.52 | -2 021 059.52 | true |

Only ST-17 and ST-24 exceed the envelope; all 24 cases still end with negative
cumulative cash before any financing, and no case recovers cash within 60 periods.

## 9. Named unknowns and financial blockers

`unknownCapex` is empty in every scenario because inventory, working capital and the
reserve are excluded before classification — but the two uninventoried categories in
section 2, plus unknown capex/certification scope, mean the requirement is understated.
The model also excludes `OPEX-INSURANCE` (no quotation, broker indication or public
tariff) and `OPEX-CRA` (no scope, rate or support contract); both raise the true
financing requirement.

| Blocking condition | Domain | Severity | Owner | Required evidence |
|---|---|---|---|---|
| `BLK-FIN-02` | Certification | BLOCKING | conformity-engineering | Laboratory quotations for EMC/RED/environmental/CRA scope |
| `BLK-FIN-03` | Procurement | BLOCKING | hardware-sourcing | Formal supplier quotations with MOQ, Incoterms and payment terms |
| `BLK-FIN-05` | Security lifecycle | MAJOR | security-engineering | Maintenance scope, support-period plan and cost rate |
| `BLK-FIN-07` | Company cash | BLOCKING | programme-lead | Company accounts, bank statement and written funding authorization |
| `BLK-FIN-12` | Working capital | MAJOR | hardware-sourcing | Supplier credit terms, return agreement and demand evidence |
| `BLK-FIN-13` | Financing | BLOCKING | programme-lead | Written funding authorization or signed term sheet |
| `BLK-FIN-14` | Price | BLOCKING | programme-lead | Approved price policy with channel, tax and WTP evidence |

All 14 register blockers are `OPEN` (8 `BLOCKING`, 6 `MAJOR`); none is closed by this
document. `BLK-FIN-13` is the direct reason the envelope remains a hypothesis.

## 10. Traceability register

| Figure | Value | Source |
|---|---|---|
| Known capex envelope | EUR 402 500.00 | `capital-investments.json#totals.knownCapexEnvelopeEur` |
| Assumption range, known capex | EUR 241 500.00 – 644 000.00 | derived: sum of `items[].assumptionRange` |
| MC-11 tooling envelope | EUR 37 500.00 | `capital-investments.json#INV-01`, MC-11 ASM-008 |
| Capex cash, BASE | EUR 402 500.00 | `scenario-results.json#BASE_HYPOTHETICAL.views.M60.capexCash` |
| Capex cash, DOWNSIDE / UPSIDE | EUR 503 125.00 / 342 125.00 | `scenario-results.json`, `ASM-MC13-039/041` |
| Contingency reserve, BASE | EUR 60 375.00 | `ASM-MC13-043`; `monthly-financial-model.json#supporting.contingencyReserveEur` |
| Amortisation M60, BASE | EUR 402 499.93 | `scenario-results.json#BASE_HYPOTHETICAL.views.M60.amortizationNonCash` |
| Financing requirement, BASE | EUR 987 326.73 | `scenario-results.json#BASE_HYPOTHETICAL.breakEven.financingRequirementEur` |
| Financing requirement, DOWNSIDE / UPSIDE | EUR 3 075 765.77 / 632 135.66 | `scenario-results.json#...breakEven.financingRequirementEur` |
| Illustrative funding envelope | EUR 2 000 000.00 | `assumptions.json#ASM-MC13-046` |
| Envelope gap, DOWNSIDE | EUR 1 075 765.77 | derived: financing requirement − envelope |
| Cumulative pre-revenue exposure | EUR -1 074 159.40 / -627 623.61 / -445 423.51 | derived from `monthly-financial-model.json` cash flows |
| Stress envelope gaps | 2 cases, max EUR 708 788.64 | `stress-tests.json#cases[].fundingGapEur` |
| Inventory purchases cash to M60 | EUR 1 541 872.72 (BASE) | `scenario-results.json#BASE_HYPOTHETICAL.views.M60.inventoryPurchasesCash` |

## 11. What would change this schedule

Formal supplier and laboratory quotations would replace the scenario envelopes;
MOQ, Incoterms, payment terms and a credit line would quantify `INV-09`/`INV-10`;
a written funding authorization or signed term sheet would convert the EUR 2 000 000
envelope from illustration to commitment; a broker indication would add the unknown
insurance cost; a CRA support-period plan would add the unknown lifecycle cost.

## 12. Governance statement

This document is analysis, not authorization. It contains **no investment approval,
no financing offer and no commitment**; it implies no purchase order, no supplier
engagement, no price approval, no commercial availability and no MC-14 start. The
regime remains `NOT_FOR_SALE`, `PRICE_APPROVED = NONE`, `FORMAL_SUPPLIER_QUOTATIONS = NONE`
and `LICENSING_RIGHTS_GRANTED = false`.
