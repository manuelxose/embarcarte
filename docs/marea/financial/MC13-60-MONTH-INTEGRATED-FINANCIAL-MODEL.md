# MC-13 D04 — 60-month integrated financial model

| Field | Value |
|---|---|
| Deliverable | D04 `MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` — `PENDING_INDEPENDENT_REVIEW` |
| Milestone / date | MC-13/36, 2026-11-02 |
| Owner | financial-architecture (Principal Financial Architect) |
| Authority | [MC13-FINANCIAL-DATA-CONTRACT.md](MC13-FINANCIAL-DATA-CONTRACT.md) (D02), `scripts/check-marea-financial-model.mjs` |
| Machine companions | [monthly-financial-model.json](data/monthly-financial-model.json), [scenario-results.json](data/scenario-results.json), [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) |
| Boundary | Analysis only. No price approval, no commercial availability, no financing approval, no break-even claim, no MC-14 start. |

**Figure status.** Every monetary figure below is `CONDITIONAL` or `HYPOTHETICAL`, traceable to a
JSON file in `docs/marea/financial/data/`; `UNKNOWN` means absent, never zero. No figure is a price,
verified cost, validated demand, financing offer or break-even claim.

## 1. Purpose

D04 documents the one integrated 60-period model MC-13 commits: architecture, dimensions, accounting rules,
cash-flow identities, the tooling/NRE invariant, named unknowns, the 12/36/60 views and reproducibility;
the conditional break-even analysis is D12. The model proves arithmetic consistency under labelled
assumptions, not commercial viability.

## 2. One integrated model, not three models

`data/monthly-financial-model.json` is a single `COLUMNAR_V1` file with four scenario blocks, 60
model-relative periods and one shared column schema. The 12-, 36- and 60-month reports are cut-offs
of the same arrays: flows (revenue, cost, cash flow) are summed from `M01` to the view month, while
stocks (cumulative cash, financing requirement, receivables, inventory units, vessels) are read at
the view month. `data/scenario-results.json` stores exactly those views and the validator recomputes
them from the model (`A-02`, `A-23`). Parallel forecast files would duplicate assumptions and drift,
so the break-even thresholds, stress cases and figures register all come from this same model.

## 3. Scenario family

| `scenarioId` | Eligible commercial case | Revenue authorised | Demand multiplier | Hypothetical clearance months (model-relative) | Result status |
|---|---|---|---|---|---|
| `RESTRICTED_CURRENT` | `RESTRICTED_CURRENT` | No | 0 | none (all `null`) | monetary columns suppressed, `null` |
| `DOWNSIDE` | `HYPOTHETICAL_POST_CLEARANCE` | No | 0.4 | NAV 26, HUB 16, AIS 22, SENSE 18, WATCH 16, DISPLAY 14, WEATHER 26, FLEET 12, PILOT `null` | conditional hypothetical |
| `BASE_HYPOTHETICAL` | `HYPOTHETICAL_POST_CLEARANCE` | No | 1.0 | NAV 13, HUB 8, AIS 11, SENSE 9, WATCH 8, DISPLAY 7, WEATHER 12, FLEET 6, PILOT `null` | conditional hypothetical |
| `UPSIDE_HYPOTHETICAL` | `HYPOTHETICAL_POST_CLEARANCE` | No | 1.6 | NAV 10, HUB 7, AIS 9, SENSE 8, WATCH 7, DISPLAY 6, WEATHER 10, FLEET 5, PILOT `null` | conditional hypothetical |

Clearance months are scenario shocks in `data/scenario-definitions.json`; they change no governance status flag. PILOT never clears and is zero in every scenario. `RESTRICTED_CURRENT` is the current authorised commercial reality — no sale is authorised — not a pessimistic projection.

## 4. Model dimensions

| Dimension | Values carried by the committed model |
|---|---|
| Month | `M01`…`M60`, model-relative only |
| Scenario | the four IDs in §3 |
| Eligibility | `RESTRICTED_CURRENT`, `HYPOTHETICAL_POST_CLEARANCE`; hypothetical clearance months only, frozen flags never change |
| Family | NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET |
| Edition / SKU | 8 hardware SKUs (6 modelled; AIS-CONNECTED and PILOT-COASTAL not modelled); 9 subscription SKUs (5 in the annual cohort engine; FLEET revenue is driven by the vessel ledger) |
| Bundle | START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET; packaging metadata whose component edition IDs reconcile to the bundle definitions; component SKUs drive revenue, no separate bundle cash row in the monthly engine |
| Revenue type | `HARDWARE`, `SUBSCRIPTION`; `INSTALLATION` not modelled (self-install base case); `NONE` in the restricted case |
| Cost category | hardware COGS, cloud, connectivity, notifications, storage, payment processing, support, warranty reserve, engineering, operations, infrastructure management, sales and marketing, legal and accounting, product management, compliance; data licence, insurance, CRA lifecycle and security maintenance remain unknowns or declared envelopes |
| Channel | hardware direct 70 % / distributor 25 % / installer 5 % (blended factor 0.905); subscription direct 80 % / app store 20 % |
| Cohort | activation 0.70 / 0.85 / 0.95; monthly churn 0.03 / 0.015 / 0.008; annual renewal 0.55 / 0.75 / 0.85 (DOWNSIDE / BASE / UPSIDE) |
| Volume tier | MC-11/MC-12 analytical cases 1 / 10 / 100 / 500 / 1 000 units; unit costs use the disclosed 100-unit BASE tier; not a purchase commitment |
| Evidence status | 153 assumption records: 125 `SCENARIO_ASSUMPTION`, 11 `ENGINEERING_ASSUMPTION`, 7 `PUBLISHED_TARIFF`, 1 `INHERITED_ASSUMPTION`, 1 `VERIFIED_OBSERVED` count, 7 `UNKNOWN`, 1 `OFFICIAL_LICENSING_DOCUMENT` |

Sources: `revenue-drivers.json`, `recurring-revenue.json`, `scenario-definitions.json`, `assumptions.json`, `monthly-financial-model.json`; bundles are metadata only, none purchasable and no bundle price approved.

## 5. Time axis and period conventions

- `M01` is the first model period and `M60` the last; they are model-relative indices, not calendar months, and the
  model asserts no launch, certification or first-sale date (`U-06`).
- Opening cash is fixed by the analysis convention `0` (ASM-MC13-044) to measure the external cash requirement; it
  is not the company bank balance (`UNKNOWN`, ASM-MC13-045). There is no terminal value and no period after `M60`.
- `RESTRICTED_CURRENT` also carries 60 periods, but its monetary cost and cash columns are
  `null` with suppression reasons.

## 6. Accounting methodology

### 6.1 Gross invoiced versus net recognised revenue

The model separates gross invoiced amounts, VAT and net revenue. The monthly identity, verified
on the committed arrays, is:

```
grossInvoicedRevenue(m) = netRecognizedRevenue(m) + vatOutput(m) + refundsAllowance(m) + ΔdeferredRevenue(m)
netRecognizedRevenue(M60) = grossInvoicedRevenue − refundsAllowance − vatOutput − deferredRevenueEnd
```

M60 revenue bridge (EUR, conditional):

| Scenario | Gross invoiced | Refunds (3 %) | VAT output | Deferred end | Net recognised |
|---|---|---|---|---|---|
| `DOWNSIDE` | 463 955.96 | 8 018.35 | 66 841.65 | 22 045.70 | 367 050.26 |
| `BASE_HYPOTHETICAL` | 4 397 543.08 | 62 381.43 | 658 285.24 | 250 229.29 | 3 426 647.12 |
| `UPSIDE_HYPOTHETICAL` | 13 130 674.77 | 162 941.70 | 1 969 367.21 | 850 064.04 | 10 148 301.82 |

Net revenue splits hardware/subscription: BASE 1 666 941.57 / 1 759 705.55 (51.35 % recurring),
DOWNSIDE 214 269.17 / 152 781.09 (41.62 %), UPSIDE 4 354 099.89 / 5 794 201.93 (57.10 %).

### 6.2 VAT output, input, payment lag and credit carry-forward

VAT is 21 % on VAT-inclusive consumer hypotheses (ASM-MC13-001/002); FLEET is VAT-excluded B2B and VAT
output is never revenue (`A-04`). Input VAT is computed from inventory receipts (ASM-MC13-010), netted
against output VAT with a one-month lag (ASM-MC13-009) and a credit carry-forward. M60 output/input/paid:
BASE 658 285.24 / 323 793.20 / 317 758.93; DOWNSIDE 66 841.65 / 43 960.99 / 20 952.17; UPSIDE
1 969 367.21 / 843 457.44 / 1 076 693.05. The unused credit is not carried as a separate receivable
column — a disclosed limitation, not a zero cost.

### 6.3 Cash collections versus recognised revenue

`cashReceiptsGross` = direct receipts + distributor collections + subscription cash;
`cashCollectionsNetOfVat = cashReceiptsGross − vatPaid`, verified monthly (`A-06`). Collections
differ from recognised revenue because annual subscriptions are collected on invoice before
recognition, receivables settle on 60-day (distributor) and 2-day (direct) terms, VAT settles
with a lag and a 3 % refund allowance is carried. M60:

| Scenario | Cash receipts gross | VAT paid | Collections net of VAT | Net recognised revenue |
|---|---|---|---|---|
| `DOWNSIDE` | 459 673.18 | 20 952.17 | 438 721.01 | 367 050.26 |
| `BASE_HYPOTHETICAL` | 4 369 492.24 | 317 758.93 | 4 051 733.31 | 3 426 647.12 |
| `UPSIDE_HYPOTHETICAL` | 13 058 948.99 | 1 076 693.05 | 11 982 255.94 | 10 148 301.82 |

### 6.4 Deferred revenue

Annual prepayments (NAV, WEATHER, WATCH monitoring) are collected at the start of the paid year and recognised
straight-line over 12 months (`BILL-ANNUAL`); the unearned part is `deferredRevenueEnd`. Monthly FLEET billing is
recognised in the billed month. M60 deferred: DOWNSIDE 22 045.70, BASE 250 229.29, UPSIDE 850 064.04; opening 0.

### 6.5 Hardware COGS

Hardware COGS = units sold × declared known variable unit cost (`A-09`), excluding tooling/NRE and
certification. M60 COGS: DOWNSIDE 195 285.88, BASE 1 521 869.39, UPSIDE 3 974 165.07; cumulative
units sold 859 / 6 642 / 17 349. Unit costs are inherited exactly from MC-12 (`A-24`): HUB 281.13,
WATCH 190.90, SENSE 88.27, DISPLAY 303.32, AIS 281.35 EUR/unit at the 100-unit BASE tier.

### 6.6 Variable versus fixed costs and known-variable contribution

```
knownVariableContribution(m) = netRecognizedRevenue(m) − cogsHardware(m) − softwareDirectCosts(m)
                               − paymentFees(m) − inventoryCarryingCost(m) − inventoryWriteOffCost(m)
ebitdaLikeConditional(m)     = knownVariableContribution(m) − fixedOpexEnvelope(m)
```

The fixed envelope has eleven monthly operating lines with 3 % annual inflation (engineering, support,
operations, infrastructure, sales and marketing, legal, product, security, warranty administration,
compliance, cloud floor); insurance and CRA lifecycle cost are unknown and excluded, never zero.
**The non-cash obsolescence write-off cost (`inventoryWriteOffCost`) is part of the conditional
contribution** (deducted there as a real cost) **and is reversed in working capital**, so it never
reaches operating cash flow. `ebitdaLikeConditional` is an EBITDA-like proxy, not statutory EBITDA. M60:

| Scenario | Contribution | Fixed opex envelope | EBITDA-like conditional |
|---|---|---|---|
| `DOWNSIDE` | 150 666.06 | 2 780 925.36 | -2 630 259.30 |
| `BASE_HYPOTHETICAL` | 1 688 226.86 | 2 306 288.64 | -618 061.78 |
| `UPSIDE_HYPOTHETICAL` | 5 475 105.86 | 1 511 192.40 | 3 963 913.46 |

Variable and fixed costs are never mixed; the validator recomputes both lines (`A-17`, `A-18`).
Payment fees sit inside contribution and are not deducted a second time in cash flow.

### 6.7 D&A is non-cash; accounting operating result

Capitalised items are amortised straight-line over 36 months (most items) or 24 months (INV-04, INV-06)
from their planned month. `amortizationNonCash` never enters operating cash flow; it is deducted only in
`accountingOperatingResult = ebitdaLikeConditional − amortizationNonCash`. M60: DOWNSIDE -3 133 384.37,
BASE -1 020 561.71, UPSIDE 3 621 788.54. No tax, interest or unknown cost is included; it is not a
profit figure.

### 6.8 Capex cash versus amortisation

Investing cash is capex cash only. The eight capitalised items total 402 500.00 at the BASE
multiplier: INV-01 tooling/NRE 37 500, INV-02 certification 60 000, INV-03 engineering NRE
120 000, INV-04 cloud integration 25 000, INV-05 legal/IP 35 000, INV-06 samples 15 000, INV-07
security infrastructure 30 000, INV-08 software development 80 000; all are amortised straight
line, mostly over 36 months (INV-04 and INV-06 over 24). INV-09 initial inventory, INV-10 working
capital and INV-11 contingency reserve are `UNKNOWN` and are not capex. Capex cash = 402 500.00 ×
multiplier: DOWNSIDE 1.25 → 503 125.00; BASE 1.00 → 402 500.00; UPSIDE 0.85 → 342 125.00. Total
amortisation equals the capex envelope because every item is fully amortised before M60:
503 125.07 / 402 499.93 / 342 124.92. No amount is an approved budget or financing authorisation;
the contingency reserve (15 % of known capex, 60 375.00 at BASE) and the 2 000 000.00 analytical
funding envelope (ASM-MC13-046) are scenario envelopes.

## 7. The tooling/NRE invariant: never a variable unit cost, never twice

D-050 reclassifies COST-16 tooling/NRE and COST-17 certification as fixed one-off programme
costs: a one-off cost divided by volume is not a property of the product. INV-01 carries the
MC-11 sensitivity envelope only (37 500 EUR = HUB 12 000 + WATCH 8 000 + SENSE 3 500 + DISPLAY
9 000 + AIS 5 000), an inherited assumption, not a quotation. Tooling appears once as capex
cash and once as straight-line amortisation, never in contribution, COGS or unit cost;
certification (INV-02) is a fixed capital envelope, never a per-unit charge. The validator
rejects amortisation inside contribution and re-derives capex/amortisation from the capital
schedule (`V-15`, `A-16`, `A-20`); SKU unit costs are provably inherited unchanged from MC-12
(`V-16`, `A-24`).

## 8. Cash-flow bridge and identities

Verified identities (`A-14`…`A-17`):

```
operatingCashFlow(m)     = ebitdaLikeConditional(m) − workingCapitalMovement(m)
investingCashFlow(m)     = −capexCash(m)
netCashFlow(m)           = operatingCashFlow(m) + investingCashFlow(m)
cumulativeCashBalance(m) = openingCash + Σ netCashFlow(1..m), openingCash = 0
financingRequirement(m)  = max over i ≤ m of max(0, −cumulativeCashBalance(i))
```

Working capital is `netRecognizedRevenue − cashReceiptsGross + vatPaid + (inventoryPurchasesCash −
cogsHardware) − inventoryWriteOffCost`, so the non-cash write-off appears once in EBITDA and is added
back once here; it never affects operating cash. M60 (EUR, conditional):

| Scenario | EBITDA-like | Working-capital movement | Operating cash flow | Investing cash flow | Net cash flow | Cumulative cash | Financing requirement | Peak month |
|---|---|---|---|---|---|---|---|---|
| `DOWNSIDE` | -2 630 259.30 | -57 618.53 | -2 572 640.77 | -503 125.00 | -3 075 765.77 | -3 075 765.77 | 3 075 765.77 | M60 |
| `BASE_HYPOTHETICAL` | -618 061.78 | -605 082.86 | -12 978.92 | -402 500.00 | -415 478.92 | -415 478.92 | 987 326.73 | M27 |
| `UPSIDE_HYPOTHETICAL` | 3 963 913.46 | -1 818 975.72 | 5 782 889.18 | -342 125.00 | 5 440 764.18 | 5 440 764.18 | 632 135.66 | M10 |

The BASE financing requirement (987 326.73) is larger than the absolute M60 cash position
(415 478.92) because it is a running maximum and the deepest trough is at M27; the UPSIDE peak is
at M10. A negative working-capital movement is a cash release (deferred subscription cash and
payables exceed the cash absorbed by inventory and receivables); `RESTRICTED_CURRENT` cash is `UNKNOWN`.

## 9. Inventory identity and working capital

Monthly identity, verified for every month and scenario (`A-10`, `A-11`):

```
inventoryUnitsEnd = inventoryUnitsBegin + receiptsUnits − unitsSold − writeOffsUnits
```

M60 month-level evidence: DOWNSIDE 87 + 0 − 21 − 0 = 66; BASE 218 + 0 − 135 − 0 = 83; UPSIDE 315 + 82 −
345 − 0 = 52. Inventory is never negative; purchases follow a projected-on-hand MRP target derived from
forward demand, safety stock and lead time, so the previous MOQ-driven overbuild no longer occurs. Policy
inputs are scenario assumptions: MOQ 25 units, safety stock 1 month, lead time 2 months, 30 % supplier
deposit, balance after 1 month, 2 % carrying cost, 5 % annual write-down; no MOQ, payment term or credit
agreement exists.

| Scenario | Purchases units | Units sold | Write-offs | Inventory end | Inventory asset M60 | Purchases cash | Carrying cost | Write-off cost |
|---|---|---|---|---|---|---|---|---|
| `DOWNSIDE` | 925 | 859 | 0 | 66 | 14 052.12 | 209 338.10 | 1 674.19 | 0.00 |
| `BASE_HYPOTHETICAL` | 6 725 | 6 642 | 0 | 83 | 20 002.61 | 1 541 872.72 | 3 929.26 | 0.00 |
| `UPSIDE_HYPOTHETICAL` | 17 532 | 17 349 | 131 | 52 | 14 978.20 | 4 016 463.75 | 6 964.80 | 27 320.28 |

Inventory is no longer a material net cash absorber in the BASE path: purchases cash 1 541 872.72 is close to
COGS 1 521 869.39, the end balance is 83 units and the write-off cost is 0.00. In UPSIDE, 131 units are written
off (27 320.28 non-cash cost in contribution, reversed through working capital); because working capital is a
net release in all three hypothetical scenarios, the financing requirement is driven by operating loss and capex.

## 10. 12 / 36 / 60 reporting views

Views derive from the single model: flows sum from `M01`, stocks are read at the view month. The
table reconciles to `MC13-GENERATED-FIGURES.md` and `scenario-results.json`; all rows are
`CONDITIONAL` except `RESTRICTED_CURRENT`, which is `UNKNOWN` (no authorised sale).

| Scenario | View | Net revenue | Contribution | EBITDA-like | Cumulative cash | Financing requirement |
|---|---|---|---|---|---|---|
| `RESTRICTED_CURRENT` | M12 | 0.00 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| `RESTRICTED_CURRENT` | M36 | 0.00 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| `RESTRICTED_CURRENT` | M60 | 0.00 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| `DOWNSIDE` | M12 | 0.00 | 0.00 | -523 800.00 | -1 029 199.90 | 1 029 199.90 |
| `DOWNSIDE` | M36 | 120 860.60 | 34 147.79 | -1 584 865.69 | -2 075 310.95 | 2 075 310.95 |
| `DOWNSIDE` | M60 | 367 050.26 | 150 666.06 | -2 630 259.30 | -3 075 765.77 | 3 075 765.77 |
| `BASE_HYPOTHETICAL` | M12 | 67 257.32 | 15 294.95 | -419 105.05 | -858 503.42 | 858 503.42 |
| `BASE_HYPOTHETICAL` | M36 | 1 376 225.77 | 523 430.13 | -819 256.83 | -924 705.28 | 987 326.73 |
| `BASE_HYPOTHETICAL` | M60 | 3 426 647.12 | 1 688 226.86 | -618 061.78 | -415 478.92 | 987 326.73 |
| `UPSIDE_HYPOTHETICAL` | M12 | 258 753.72 | 53 940.35 | -230 699.65 | -613 109.98 | 632 135.66 |
| `UPSIDE_HYPOTHETICAL` | M36 | 4 028 122.59 | 1 706 337.08 | 826 543.28 | 1 414 228.28 | 632 135.66 |
| `UPSIDE_HYPOTHETICAL` | M60 | 10 148 301.82 | 5 475 105.86 | 3 963 913.46 | 5 440 764.18 | 632 135.66 |

DOWNSIDE M12 cash -1 029 199.90 = capex 503 125.00 + fixed opex 523 800.00 + working-capital movement 2 274.90. DOWNSIDE cash never improves; BASE troughs at M27; UPSIDE at M10.

## 11. What the 60-period path shows — and does not show

- DOWNSIDE: no authorised revenue until M14; M60 contribution 150 666.06, EBITDA-like
  -2 630 259.30, cash -3 075 765.77; no break-even month within the horizon.
- BASE: first revenue M07; operating break-even M39 (EBITDA-like +340.47); cash-flow break-even M23
  (+2 168.50), earlier than operating break-even because working capital releases cash; no cash
  recovery within 60 periods (M60 cash -415 478.92; trough 987 326.73 at M27).
- UPSIDE: first revenue M06; operating break-even M15 (+2 755.02), cash-flow break-even M11
  (+3 657.15), cash recovery M23 (+36 417.95); M60 cash 5 440 764.18; trough 632 135.66 at M10.
- Arithmetic outcomes of labelled assumptions only: no verified break-even, profitability, investment return
  or financing capacity is shown or asserted.

## 12. Named unknowns and why full profit is suppressed

| Unknown input | Assumption / blocker | Effect |
|---|---|---|
| Current company cash, funding and expenses | ASM-MC13-045, restricted suppression | opening cash is a convention; true position `UNKNOWN`; cash/expense columns `null` |
| Chart/weather data-licence cost | ASM-MC13-049 | excluded from direct cost; NAV/WEATHER unit contribution `NOT_DETERMINABLE` |
| Product liability insurance and CRA lifecycle | ASM-MC13-047, ASM-MC13-048 | excluded from fixed envelope; true fixed cost higher |
| FLEET onboarding, DPA, SLA, tenancy | `BLK-FIN-10` | excluded from direct cost; FLEET contribution conditional only |
| Customer acquisition, churn, renewal and willingness to pay | ASM-MC13-050/051/052 | no validated CAC; illustrative cohort rates; prices `HYPOTHESIS_UNAPPROVED` |
| Unknown capex/certification items | INV-09, INV-10, INV-11 | financing requirement is a floor |
| PILOT economics | `BLK-FIN-11` | safety `BLOCKED`; zero units, cost and revenue in every scenario |

Full profit is suppressed — no net profit, earnings before tax or shareholder result — because excluded
inputs could change its sign, no tax or interest schedule exists, demand is illustrative, and a profit
claim is a commercial assertion MC-13 is not authorised to make. The model stops at a conditional
EBITDA-like line and a pre-unknown, pre-tax accounting result.

## 13. Governance boundary

Frozen flags from `data/scenario-definitions.json`: commercial availability `NOT_FOR_SALE`, price approved
`NONE`, customer evidence `NONE`, WTP not validated, licensing rights not granted, formal supplier quotations
`NONE`, PILOT safety `BLOCKED`, AIS receive-only, FLEET without default hardware, CE marking claim prohibited.
AIS-CONNECTED and PILOT-COASTAL are not modelled. No scenario changes a status flag; no hypothetical clearance
is a certification, licence or approval. The milestone is not merged, not deployed and MC-14 is not started.

## 14. Reproducibility and reconciliation

```
node scripts/build-marea-financial-model.mjs
node scripts/check-marea-financial-model.mjs
```

The builder uses the deterministic engine `scripts/marea-financial-engine.mjs`; running it twice must produce
byte-identical output with no network, clock or random dependency. The validator recomputes the derived files
in memory and rejects divergence, including the 12/36/60 views and figures register. All §10 view totals were
recomputed as sums of the monthly arrays; the revenue bridge, contribution and EBITDA-like lines, cash-flow
bridge, inventory identity and capex/amortisation reconciliation hold for every month. Contract-text
discrepancies affecting no figure are reported to the Lead.

## 15. References

- [MC13-FINANCIAL-DATA-CONTRACT.md](MC13-FINANCIAL-DATA-CONTRACT.md), [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md), [monthly-financial-model.json](data/monthly-financial-model.json), [scenario-results.json](data/scenario-results.json), [break-even-thresholds.json](data/break-even-thresholds.json), [scenario-definitions.json](data/scenario-definitions.json), [assumptions.json](data/assumptions.json), [capital-investments.json](data/capital-investments.json), [working-capital.json](data/working-capital.json).
- [MC12-MC13-HANDOFF.md](../economics/MC12-MC13-HANDOFF.md), [mc13-handoff-inputs.json](../economics/data/mc13-handoff-inputs.json); D-049…D-052 in [DECISION-LOG.md](../execution/DECISION-LOG.md); [MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md](MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md) — D12.
