# MC-13 D06 — Hardware production and inventory cash flow

| Field | Value |
|---|---|
| Deliverable | D06 `MC13-HARDWARE-PRODUCTION-AND-INVENTORY-CASHFLOW.md` — status `INTERNAL_FINANCIAL_ANALYSIS`, conditional, hypothetical, pre-revenue |
| Milestone / date / owner | MC-13/36, 2026-11-02, `hardware-manufacturing-economics`; 60-month model `M01`–`M60`; EUR, 2 decimals half-up, tolerance ±0.005 EUR |
| Governed by / inherited from | D02 `MC13-FINANCIAL-DATA-CONTRACT.md`, `MC13-GENERATED-FIGURES.md`, `data/monthly-financial-model.json`, `working-capital.json`, `capital-investments.json`, `revenue-drivers.json`; MC-12 `hardware-cost-reconciliation.json` (`INV-TOOLING-01`), `unit-economics.json` (50 records), `MC12-HARDWARE-COST-RECONCILIATION.md`, `MC12-MC13-HANDOFF.md`, decision D-050 |
| Boundary | Analysis only. No approved price, quotation, purchase commitment, MOQ/term agreement, certification claim or financing approval. `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`; `PRICE_APPROVED = NONE`; `FORMAL_SUPPLIER_QUOTATIONS = NONE`. |

## 1. Purpose and scope

This deliverable documents how MC-13 converts inherited MC-11/MC-12 hardware evidence into per-unit
production inputs, how production and inventory convert those inputs into COGS and cash, and why
tooling/NRE is counted exactly once. Every figure is read from the governed JSON files or recomputed
from them; nothing here is a supplier quote, purchase order or commitment.

Six SKUs are costed (`monthly-financial-model.json` `supporting.hardwarePerSku`): `HUB-STANDARD`,
`HUB-PRO`, `DISPLAY-7`, `AIS-RECEIVER`, `SENSE-ENTRY-SYMBOLIC`, `WATCH-CORE`. Two canonical editions
are deliberately absent: `AIS-CONNECTED` has `knownVariableCostEur = null` and no `costBasis`
(`COST_MODEL_INCOMPLETE`), so no revenue and no COGS are modelled; `PILOT-COASTAL` has `null` cost,
zero units in every scenario and all 17 MC-11 categories `UNKNOWN` (UNK-HW-08, contract `V-03`).
`null` is never rendered as `0`; no installation revenue occurs, and the expedited-purchase path is
triggered only in the UPSIDE scenario (82 units, §4.2).

## 2. Hardware variable-cost inputs at the MC-11 100-unit BASE tier

Each figure is `variableCostExcludingToolingAndInstallationEur` = `knownSubtotalEur − COST-16 −
COST-12`, and equals the `knownVariableCostEur` of the cited record. These are the only per-unit
hardware costs the monthly model consumes.

| SKU (modelled) | Costed edition | EUR/unit, 100-unit BASE | `unit-economics.json` record | Completeness |
|---|---|---:|---|---|
| `HUB-STANDARD` | HUB-STANDARD | **281.13** | `UE-HUB-HUB-STANDARD-100-BASE` | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `HUB-PRO` | HUB-PRO (HUB-STANDARD floor) | **281.13** | `UE-HUB-HUB-PRO-100-BASE` | `INCOMPLETE_UNKNOWN_COSTS` |
| `WATCH-CORE` | WATCH-CORE | **190.90** | `UE-WATCH-WATCH-CORE-100-BASE` | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `SENSE-ENTRY-SYMBOLIC` | SENSE-POWER (representative module) | **88.27** | `UE-SENSE-MODULE-100-BASE` | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `DISPLAY-7` | DISPLAY-7 | **303.32** | `UE-DISPLAY-DISPLAY-7-100-BASE` | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `AIS-RECEIVER` | AIS-RECEIVER (receive-only) | **281.35** | `UE-AIS-AIS-RECEIVER-100-BASE` | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `PILOT-COASTAL` | — | **UNKNOWN (`null`)** | `UE-PILOT-COASTAL-100-BASE` | `INCOMPLETE_UNKNOWN_COSTS` |
| `AIS-CONNECTED` | — | **UNKNOWN (`null`)** | `UE-AIS-AIS-CONNECTED-100-BASE` | `INCOMPLETE_UNKNOWN_COSTS` |

`HUB-PRO` has no separate costed scenario: it uses the HUB-STANDARD 281.13 floor because its
incremental candidate-envelope lines have no observed price (unknown category
`HUB_PRO_INCREMENTAL_LINES`; "the incremental PRO cost is unknown"), so its modelled unit cost is a
floor, not a HUB-PRO cost. `SENSE-ENTRY-SYMBOLIC` reuses the MC-11 SENSE-POWER costed scenario.

All 90 MC-11 scenarios are `INCOMPLETE` because `COST-17` (certification/EMC/RED) is `UNKNOWN` in
every one, so the true cost is higher by an unquantified amount. 0 supplier quotations and 0
executed contracts exist; 19/19 suppliers are `NOT_CONTACTED`, the RFQ is `NOT_SENT` (UNK-HW-09,
`V-09`). Observed public-price coverage of the modelled 100-unit BASE subtotal is HUB 1.8 %, WATCH
2.0 %, SENSE 4.7 %, DISPLAY 0.8 %, AIS 2.1 % (0.8–4.7 %); everything else is
`ENGINEERING_ASSUMPTION` (UNK-HW-10, `RC-05`). Landed cost is only ASM-009 (a percentage of
material); no Incoterms, freight tariff or customs ruling exists, import VAT is `UNKNOWN` (UNK-HW-04)
and 37/42 inherited price observations are `VAT_UNKNOWN`, so no established ex-VAT cost exists
(UNK-HW-07). No figure here is a landed cost, an accounting unit cost, a price or a margin.

### 2.2 Production volume tiers are analytical scenarios, not commitments

MC-11 costs volumes **1 / 10 / 100 / 500 / 1000 units** in LOW/BASE/HIGH cases as analysis cases —
not purchase commitments, MOQs or demand forecasts (`MC12-MC13-HANDOFF.md` §7). At BASE the variable
cost ex COST-16 and COST-12 (EUR/unit) falls with volume: HUB 315.22 / 305.20 / **281.13** / 262.50 /
252.05; WATCH 214.51 / 207.69 / **190.90** / 178.10 / 170.93; SENSE 100.27 / 97.05 / **88.27** /
81.01 / 77.05; DISPLAY 339.13 / 328.42 / **303.32** / 284.77 / 274.11; AIS 314.62 / 304.91 /
**281.35** / 263.06 / 252.63; PILOT `null` at every tier (the LOW/BASE/HIGH spread at 100 units is,
for example, HUB 187.32/281.13/455.95 and AIS 168.43/281.35/533.95). MC-13 consumes **only the
100-unit BASE column**, constant for all 60 periods and order quantities: no learning curve, volume
price break or FX movement inside the horizon (`inventoryValuation =
CONSTANT_UNIT_COST_PER_SCENARIO`).

## 3. COST-16 reconciliation — tooling/NRE is counted once

MC-11's `knownSubtotalEur` already contains the `COST-16` tooling/NRE amortisation line, and the
separate `toolingAmortizationEur` field repeats it. Decision **D-050** reclassifies `COST-16`/
`COST-17` as fixed one-off programme costs (excluded from variable cost, listed in
`fixedCostsExcluded`, never added a second time); `toolingAmortizationEur` is reporting only.

**Rule applied in MC-13.** For every unit cost in `monthly-financial-model.json`: **R-1** A = Σ
numerically known MC-11 lines = `knownSubtotalEur`; **R-2** B = `COST-16` line =
`toolingAmortizationEur`, never added to anything; **R-3** C = `COST-12` installation service,
excluded from the base unit cost and counted at most once in an installer configuration; **R-4**
variable unit cost V = A − B − C, and the monthly model uses V only; **R-5** B is capex cash plus
non-cash amortisation, never revenue and never variable cost; **R-6** contribution and EBITDA-like
results exclude amortisation (contract `A-19`), which appears only in `accountingOperatingResult`.

### 3.1 Explicit reconciliation proof at 100-unit BASE

| Family | A `knownSubtotal` | B `COST-16` | C `COST-12` | A − B − C | MC-12 `knownVariableCost` | Equal |
|---|---:|---:|---:|---:|---:|---|
| HUB-STANDARD | 437.13 | 120.00 | 36.00 | 281.13 | 281.13 | yes |
| WATCH-CORE | 324.90 | 80.00 | 54.00 | 190.90 | 190.90 | yes |
| SENSE-POWER | 168.27 | 35.00 | 45.00 | 88.27 | 88.27 | yes |
| DISPLAY-7 | 453.32 | 90.00 | 60.00 | 303.32 | 303.32 | yes |
| AIS-RECEIVER | 370.35 | 50.00 | 39.00 | 281.35 | 281.35 | yes |
| PILOT-COASTAL | 0.00 (no known line) | `null` | `null` | `null` | `null` | not applicable |

Worked HUB case: the sixteen numeric lines sum to **437.13** including COST-16 **120.00**;
437.13 − 120.00 = 317.13 (variable ex tooling, still including installation); 317.13 − 36.00 =
**281.13**. Adding `toolingAmortizationEur` again gives 281.13 + 120.00 = 401.13, an amount present
in no record. `INV-TOOLING-01` PASS: 90/90 scenarios, max abs subtotal delta 0.00 EUR, 0
tooling-field mismatches (`hardware-cost-reconciliation.json#invariant`).

MC-13 capex closes the same loop in the other direction: the MC-11 ASM-008 tooling envelope is
HUB 12 000 + WATCH 8 000 + SENSE 3 500 + DISPLAY 9 000 + AIS 5 000 = **37 500 EUR**, and the 100-unit
COST-16 lines sum to (120 + 80 + 35 + 90 + 50) × 100 = **37 500 EUR**. `capital-investments.json`
INV-01 is that envelope, `notAQuote: true` / `notABudget: true`, `CAPITALIZED` over 36 months,
`INVESTING_CASH_OUTFLOW`. Tooling is therefore counted once: capex cash (BASE 402 500 EUR known
capex) plus non-cash amortisation (BASE 402 499.93 EUR over the horizon); the unit cost stays
281.13. INV-02 (certification, 60 000 EUR envelope) follows the same capex treatment because COST-17
remains unknown.

**Enforcement.** `scripts/check-marea-unit-economics.mjs` **A-09** recomputes Σ lines =
`knownSubtotalEur` and `toolingAmortizationEur` = COST-16 for 90/90 scenarios; **A-10** rejects
COST-16/COST-17 in `costLines` and any COST-12 count other than exactly once in an installer
configuration; **A-11** requires fixed cost categories `variable: false`.
`scripts/check-marea-financial-model.mjs` **V-15** recomputes the 90/90 sum deltas, rejects COST-16
inside variable cost, recomputes `knownVariableContribution` (including the non-cash write-off cost)
for every hypothetical month and requires INV-01 `notAQuote`/`notABudget`; **V-16** requires each
SKU's `knownVariableCostEur` to equal its MC-12 record, forbids installer-configuration records as
base cost and forbids installation revenue in `BASE_HYPOTHETICAL`. Contract check IDs **V-15**,
**A-19**, **A-20**; decision **D-050**; `unit-economics.json#method.variableCostExcludes` lists the
excluded fixed categories. No path charges tooling twice.

## 4. Inventory model

### 4.1 Declared policy inputs (`data/working-capital.json`)

| Input | Value | Assumption ID | Evidence class / contract |
|---|---|---|---|
| Safety stock | 1 month of forecast demand | `ASM-MC13-014` | `SCENARIO_ASSUMPTION` |
| Minimum order quantity | 25 units | `ASM-MC13-015` | `SCENARIO_ASSUMPTION`; no MOQ exists |
| Lead time | 2 months | `ASM-MC13-013` | `SCENARIO_ASSUMPTION` |
| Supplier deposit | 30 % at order | `ASM-MC13-011` | `SCENARIO_ASSUMPTION`; no term exists |
| Balance | 70 % one month after receipt (`balanceDueAfterDays: 30`) | `ASM-MC13-012` | `SCENARIO_ASSUMPTION` |
| Carrying cost | 2 % per year of inventory asset | `ASM-MC13-016` | `SCENARIO_ASSUMPTION` |
| Obsolescence write-down | 5 % per year of available units | `ASM-MC13-017` | `SCENARIO_ASSUMPTION` |
| Initial inventory | 0 units | `working-capital.json` | policy label |
| Inventory valuation | constant unit cost per scenario | `working-capital.json` | `CONSTANT_UNIT_COST_PER_SCENARIO` |
| FX hedge / credit facility | none / none | `working-capital.json` | `fxHedgeExists: false`; `creditFacilityExists: false` |

`working-capital.json` status is `SCENARIO_ASSUMPTIONS_ONLY`: *"No MOQ, payment term, price-hold,
credit line or FX hedge exists."* Every term above is a planning assumption, never a contract.

### 4.2 Implemented mechanics (from the committed model)

- **Order policy (MRP plan)**: for each delivery month the per-SKU production target is that
  month's forecast demand plus the declared 1-month safety buffer (the following month's demand),
  less the on-hand already planned from earlier orders; the required quantity is rounded up to
  MOQ 25 **per SKU per order** and the order is placed two months before delivery. No planned order
  is placed in `M59`–`M60` (UPSIDE carries 82 expedited units in M60, counted as purchases). The plan
  therefore maintains a buffer instead of adding a fresh safety month every month.
- **Receipts** arrive two months after the order; **sales** recognise COGS = units sold × constant
  unit cost; **ending inventory** = begin + receipts − sold − write-offs, never negative (`A-10`).
- **Write-offs**: monthly units = min(max(0, available − sold), round(5 %/12 × available)) per SKU.
  The written-off value (`inventoryWriteOffCost`) is a non-cash cost recognised in
  `knownVariableContribution` and added back in `workingCapitalMovement`, so it is never a second
  cash outflow. Over the horizon it is EUR 0.00 DOWNSIDE, EUR 0.00 BASE and EUR 27 320.28 UPSIDE
  (131 units); `inventoryReceiptsCost − COGS − inventoryWriteOffCost = ending inventory asset`
  holds exactly (0.00 residual) in all three scenarios.
- **Inventory asset** = ending units × constant unit cost. **Purchases cash** = 30 % of order cost
  at order + 70 % of received cost one month after receipt. **Prepayments** = 30 % of units in
  transit; **payables** = 70 % of received-not-yet-paid cost; **carrying cost** = 2 %/12 × ending
  asset (BASE EUR 3 929.26 over 60 months). An unplanned shortfall would be expedited and paid on
  receipt: expedited units are 0 DOWNSIDE, 0 BASE and 82 UPSIDE (cash included in purchases cash).
- **Plan outcome**: the tight plan tracks demand — orders 6 725 vs 6 642 sold BASE, 925 vs 859
  DOWNSIDE, 17 532 vs 17 349 UPSIDE — and ending inventory stays at the buffer level (83 / 66 / 52
  units). No FIFO layers, no net-realizable-value test, no volume price step and no FX translation
  exist.

### 4.3 BASE_HYPOTHETICAL monthly inventory and purchase-cash series (selected months)

| Month | Begin | Orders | Receipts | Sold | W/offs | End | Asset EUR | Purchase cash EUR | Prepay EUR | Payable EUR | Carry EUR |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| M01–M04 | 0 | 0 | 0 | 0 | 0 | 0 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| M05 | 0 | 25 | 0 | 0 | 0 | 0 | 0.00 | 2 274.90 | 2 274.90 | 0.00 | 0.00 |
| M06 | 0 | 75 | 0 | 0 | 0 | 0 | 0.00 | 5 648.71 | 7 923.61 | 0.00 | 0.00 |
| M08 | 25 | 75 | 75 | 3 | 0 | 97 | 25 502.04 | 11 123.23 | 6 477.16 | 13 180.29 | 42.49 |
| M12 | 127 | 125 | 100 | 84 | 0 | 143 | 33 684.15 | 18 429.03 | 20 711.48 | 15 113.35 | 56.14 |
| M24 | 228 | 150 | 125 | 135 | 0 | 218 | 50 872.10 | 43 746.62 | 17 006.49 | 20 033.13 | 84.78 |
| M36 | 208 | 200 | 125 | 135 | 0 | 198 | 45 820.27 | 34 269.11 | 20 713.14 | 19 648.66 | 76.37 |
| M60 | 218 | 0 | 0 | 135 | 0 | 83 | 20 002.61 | 24 956.76 | 0.00 | 0.00 | 33.33 |

### 4.4 Inventory totals per hypothetical scenario

| Metric | DOWNSIDE | BASE_HYPOTHETICAL | UPSIDE_HYPOTHETICAL |
|---|---:|---:|---:|
| Orders / receipts units | 925 / 925 | 6 725 / 6 725 | 17 532 / 17 532 |
| Units sold / write-offs units | 859 / 0 | 6 642 / 0 | 17 349 / 131 |
| Ending units / ending asset EUR | 66 / 14 052.12 | 83 / 20 002.61 | 52 / 14 978.20 |
| Purchases cash / COGS EUR | 209 338.10 / 195 285.88 | 1 541 872.72 / 1 521 869.39 | 4 016 463.75 / 3 974 165.07 |
| Carrying / write-off cost EUR | 1 674.19 / 0.00 | 3 929.26 / 0.00 | 6 964.80 / 27 320.28 |
| Prepayments / payables at M60 EUR | 0.00 / 0.00 | 0.00 / 0.00 | 0.00 / 0.00 |
| Average COGS unit cost EUR | 227.34 | 229.13 | 229.07 |

`RESTRICTED_CURRENT` has zero units and `null` monetary inventory columns (no authorized sale, no
known company costs); `null` is not zero. Obsolescence is a non-cash cost in contribution, reversed
in working capital: neither omitted from the P&L nor charged to cash twice.

## 5. COGS versus purchases cash

**COGS** = units **sold** × constant unit cost → `knownVariableContribution` (BASE
EUR 1 521 869.39). **Purchases cash** = 30 % deposit at order + 70 % balance one month after receipt
(+ expedited cash, zero BASE/DOWNSIDE, 82 units UPSIDE) → `workingCapitalMovement` (BASE
EUR 1 541 872.72). BASE bridge, EUR:

| Bridge item | Amount |
|---|---:|
| Inventory purchases cash | 1 541 872.72 |
| Less COGS | −1 521 869.39 |
| Difference (= inventory purchases minus cost of goods sold) | 20 003.33 |
| Less non-cash write-off cost added back in working capital | 0.00 |
| **Inventory working-capital outflow** | **20 003.33** |
| Increase in inventory asset (0 → 20 002.61) | +20 002.61 |
| Change in payables (0 → 0) | 0.00 |
| Change in prepayments (0 → 0) | 0.00 |
| Sum of explained items | 20 002.61 |
| **Unexplained (monthly 2-dp rounding)** | **0.72** |

Same decomposition: DOWNSIDE difference 14 052.22 = asset 14 052.12 + residual 0.10; UPSIDE
difference 42 298.68 = write-off 27 320.28 + outflow 14 978.40, and that outflow = asset 14 978.20 +
residual 0.20. Identities `A-09`, `A-10`, `A-11` are checked by
`scripts/check-marea-financial-model.mjs`; D10 completes the proof that inventory cash is not also an
operating expense when goods are sold.

## 6. Installation, warranty and returns

The base case is **self-install**: `COST-12` service is excluded from every unit cost in §2 (HUB
36.00, WATCH 54.00, SENSE 45.00, DISPLAY 60.00, AIS 39.00 EUR/unit at 100 units BASE, same
scenario/case as the subtotal), included at most once only in an `INSTALLER_INCLUDED` configuration,
and never double counted. The 60-month model contains no installation revenue (`V-16`) and no
installation cost line; the 5 % `PROFESSIONAL_INSTALLER` hardware channel share is a revenue
deduction on the hardware price, not installation service revenue. No installer rate card, channel
price or installation contract exists.

**Warranty allowance** is inside the MC-11 variable cost (COST-15, ASM-007: 1.5 % / 3 % / 6 % of
material plus assembly/test labour by LOW/BASE/HIGH case) — an allowance, not a reliability reserve;
no failure-rate data or RMA history exists (UNK-HW-05). **Refund and withdrawal allowance** is
modelled at 3 % of hardware gross invoiced revenue (ASM-MC13-003, `ENGINEERING_ASSUMPTION`): BASE
EUR 62 381.43, DOWNSIDE EUR 8 018.35, UPSIDE EUR 162 941.70; subscription cash gross is outside the
base. It is also **paid in cash in the same period** (`refundsCash`, validator **A-27**), so it
reduces cash receipts as well as revenue. No measured return rate, 14-day withdrawal experience or
returns agreement exists (BLK-FIN-12). **Obsolescence** is physical write-off units (5 %/yr) valued
at the constant unit cost and recognised as a non-cash cost (§4.2, §5); no disposal or recovery
proceeds are modelled.

## 7. Unknowns and blockers affecting this deliverable

| ID / blocker | Unknown | Effect on D06 |
|---|---|---|
| `COST-17` / BLK-FIN-02 | Certification/conformity cost, no laboratory engaged | All 90 scenarios `INCOMPLETE`; true unit cost higher |
| UNK-HW-02 / BLK-COST-03 | Tooling/NRE quotation; only the ASM-008 envelope | INV-01 is `notAQuote`/`notABudget`; capex and amortisation are envelopes |
| UNK-HW-04 / BLK-FIN-03 | Freight, customs, Incoterms, import VAT | Unit costs are not landed costs; MOQ/lead/terms are assumptions |
| UNK-HW-05 / BLK-FIN-12 | Warranty/RMA reserve, failure rates, returns agreement | Warranty is only an allowance inside unit cost |
| UNK-HW-06 / UNK-HW-07 | Observed EUR/USD rate; input VAT status (37/42 `VAT_UNKNOWN`) | No FX movement; no established ex-VAT cost |
| UNK-HW-08 / BLK-FIN-11 | PILOT cost does not exist | `null` cost, zero units, no revenue — never zero-filled |
| UNK-HW-10 | Volume price breaks and learning curve | Tiers are analytical, no step applied |
| — | HUB-PRO incremental cost / AIS-CONNECTED cost | HUB-PRO on the HUB-STANDARD floor; AIS-CONNECTED unmodelled |

## 8. Checks performed and traceability

Read-only verification (no data, script or other document was modified; only D06 and D10 were
written): 100-unit BASE reconciliation recomputed for all six SKUs (A − B − C = V, deltas 0.00);
`INV-TOOLING-01` read (90/90, max abs delta 0.00, 0 mismatches); inventory identity checked for every
month (no negative stock); write-off identity `receipts cost − COGS − write-off cost = ending asset`
exact; purchases-cash / COGS bridge recomputed for all three scenarios (residuals BASE 0.72, DOWNSIDE
0.10, UPSIDE 0.20 EUR, disclosed); 60-month totals recomputed and matched to `scenario-results.json`
M60 views and `MC13-GENERATED-FIGURES.md` (BASE: purchases cash 1 541 872.72; COGS 1 521 869.39;
ending asset 20 002.61; carrying 3 929.26; write-off cost 0.00). The MC-13 validator was run on this
final snapshot: its model arithmetic checks (`A-06`, `A-09`–`A-16`, `A-27`, `A-28`, `V-15`, `V-16`,
`R-06`) PASS; the remaining reported failures concern pending documents and the open review findings.

**Correction note (audit lineage).** An earlier working snapshot had four defects — aliased per-SKU
distributor collections, input VAT computed on units sold, a declared safety-stock month not
consumed, and an unexpensed write-off value. All four were corrected, a later inventory-planning
(MRP) revision replaced the monthly safety-stock add-on with the 1-month-buffer plan described in
§4.2, and the post-audit corrections made refunds a cash outflow and fixed distributor invoicing to
the channel-adjusted VAT-inclusive trade price. All corrections predate this delivery; the figures
here are the final audited `2026-11-02` snapshot and are recorded for lineage only, not as the
current state.

## 9. Boundary statement

All figures are conditional, hypothetical and pre-revenue. No unit cost is a quotation, approved
cost, landed cost, price, margin or profitability statement; no MOQ, lead time, payment term or
capacity exists. MC-13 does not approve a price, authorize procurement, start MC-14 or assert
break-even.
