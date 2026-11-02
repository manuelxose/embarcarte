# MC-13 D11 — Scenarios, 12/36/60 views

| Field | Value |
|---|---|
| Deliverable | D11 `MC13-SCENARIOS-12-36-60.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` — `PENDING_INDEPENDENT_REVIEW` |
| Milestone / date | MC-13/36, 2026-11-02 |
| Owner | financial-architecture (Principal Financial Architect) |
| Authority | [MC13-FINANCIAL-DATA-CONTRACT.md](MC13-FINANCIAL-DATA-CONTRACT.md) (D02); [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) |
| Machine companions | [scenario-results.json](data/scenario-results.json), [scenario-definitions.json](data/scenario-definitions.json), [monthly-financial-model.json](data/monthly-financial-model.json) |
| Boundary | Analysis only. No price approval, no commercial availability, no financing approval, no break-even claim, no MC-14 start. |

**Figure status.** Every figure is `CONDITIONAL_HYPOTHETICAL` or `UNKNOWN`. Nothing here is a
forecast commitment, a probability, a financing offer or a validated commercial result.

## 1. Purpose

D11 presents the 12-, 36- and 60-month views of all four scenarios of the single integrated model
documented in D04. It separates cumulative totals from period values, shows the revenue mix, the
working-capital position, the investment and funding exposure, the monthly burn and the cash recovery
position. It does not repeat the accounting method; D04 is the method reference and D12 the
conditional break-even reference.

## 2. What the three views are — and are not

- They are **reporting cut-offs of one 60-period model**, not three forecasts. `M12` sums `M01`–`M12`,
  `M36` sums `M01`–`M36`, `M60` sums `M01`–`M60`; stocks (cumulative cash, financing requirement,
  receivables, inventory units, vessels) are read at the cut-off month.
- **Cumulative totals** (net revenue, contribution, EBITDA-like, cash collections, capex, net cash
  flow) are sums over the window. **Period values** are single-month figures or point-in-time stocks
  at the cut-off; the two are never mixed in one column.
- Months are model-relative (`M01`…`M60`); no calendar launch, certification or sale date is asserted.
- `RESTRICTED_CURRENT` is **not a hypothetical projection**: it records the current authorised reality
  (no product is authorised for sale), so its revenue is zero and its monetary cost and cash columns
  are `null`/`UNKNOWN`.
- The `DOWNSIDE`, `BASE_HYPOTHETICAL` and `UPSIDE_HYPOTHETICAL` views are `SCENARIO_ASSUMPTION`-driven
  planning artifacts. None is a probability-weighted forecast.

## 3. Scenario frame

| `scenarioId` | Demand multiplier | Hypothetical clearance months (model-relative) | Revenue authorised | Status of result |
|---|---|---|---|---|
| `RESTRICTED_CURRENT` | 0 | none (all `null`) | No | restricted, monetary columns suppressed |
| `DOWNSIDE` | 0.4 | NAV 26, HUB 16, AIS 22, SENSE 18, WATCH 16, DISPLAY 14, WEATHER 26, FLEET 12; PILOT `null` | No | conditional hypothetical |
| `BASE_HYPOTHETICAL` | 1.0 | NAV 13, HUB 8, AIS 11, SENSE 9, WATCH 8, DISPLAY 7, WEATHER 12, FLEET 6; PILOT `null` | No | conditional hypothetical |
| `UPSIDE_HYPOTHETICAL` | 1.6 | NAV 10, HUB 7, AIS 9, SENSE 8, WATCH 7, DISPLAY 6, WEATHER 10, FLEET 5; PILOT `null` | No | conditional hypothetical |

Clearance months are scenario switches only; no governance status flag changes and PILOT never
clears. `RESTRICTED_CURRENT` is the current state, not a pessimistic case.

## 4. The views at a glance

Cumulative figures (EUR) except cumulative cash and financing requirement, which are point-in-time
values at the cut-off month.

| Scenario | View | Net revenue | Contribution | EBITDA-like | Cumulative cash | Financing requirement |
|---|---|---|---|---|---|---|
| `RESTRICTED_CURRENT` | M12 | 0.00 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| `RESTRICTED_CURRENT` | M36 | 0.00 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| `RESTRICTED_CURRENT` | M60 | 0.00 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| `DOWNSIDE` | M12 | 0.00 | 0.00 | -523 800.00 | -1 029 199.90 | 1 029 199.90 |
| `DOWNSIDE` | M36 | 120 860.60 | 34 147.79 | -1 584 865.69 | -2 076 734.66 | 2 076 734.66 |
| `DOWNSIDE` | M60 | 367 050.26 | 150 666.06 | -2 630 259.30 | -3 081 802.04 | 3 081 802.04 |
| `BASE_HYPOTHETICAL` | M12 | 67 257.32 | 15 294.95 | -419 105.05 | -853 063.06 | 853 063.06 |
| `BASE_HYPOTHETICAL` | M36 | 1 376 225.77 | 523 430.13 | -819 256.83 | -943 893.07 | 995 185.23 |
| `BASE_HYPOTHETICAL` | M60 | 3 426 647.12 | 1 688 226.86 | -618 061.78 | -464 878.15 | 995 185.23 |
| `UPSIDE_HYPOTHETICAL` | M12 | 258 753.72 | 53 940.35 | -230 699.65 | -596 117.18 | 621 240.91 |
| `UPSIDE_HYPOTHETICAL` | M36 | 4 028 122.59 | 1 706 337.08 | 826 543.28 | 1 361 732.20 | 621 240.91 |
| `UPSIDE_HYPOTHETICAL` | M60 | 10 148 301.82 | 5 475 105.86 | 3 963 913.46 | 5 311 017.86 | 621 240.91 |

## 5. Cumulative totals versus period values at each cut-off

Period values are single-month amounts at the cut-off month; cumulative cash and financing
requirement are point-in-time stocks. Source: `scenario-results.json#scenarios.*.monthly`.

| Scenario | Cut-off | Period gross invoiced | Period net revenue | Period contribution | Period EBITDA-like | Period net cash flow | Cumulative cash | Financing requirement |
|---|---|---|---|---|---|---|---|---|
| `DOWNSIDE` | M12 | 0.00 | 0.00 | 0.00 | -43 650.00 | -45 924.90 | -1 029 199.90 | 1 029 199.90 |
| `DOWNSIDE` | M36 | 10 616.17 | 8 284.06 | 3 096.45 | -43 211.84 | -42 744.87 | -2 076 734.66 | 2 076 734.66 |
| `DOWNSIDE` | M60 | 13 753.91 | 11 462.64 | 5 936.68 | -43 191.78 | -38 273.04 | -3 081 802.04 | 3 081 802.04 |
| `BASE_HYPOTHETICAL` | M12 | 32 670.65 | 25 436.77 | 5 039.39 | -31 160.61 | -25 994.82 | -853 063.06 | 853 063.06 |
| `BASE_HYPOTHETICAL` | M36 | 89 546.89 | 72 080.76 | 36 616.55 | -1 788.03 | 3 745.20 | -943 893.07 | 995 185.23 |
| `BASE_HYPOTHETICAL` | M60 | 115 607.38 | 95 948.21 | 57 979.23 | 17 235.81 | 32 323.30 | -464 878.15 | 995 185.23 |
| `UPSIDE_HYPOTHETICAL` | M12 | 129 462.52 | 84 002.68 | 15 983.09 | -7 736.91 | 18 184.18 | -596 117.18 | 621 240.91 |
| `UPSIDE_HYPOTHETICAL` | M36 | 269 283.44 | 209 063.16 | 115 672.70 | 90 508.15 | 126 924.71 | 1 361 732.20 | 621 240.91 |
| `UPSIDE_HYPOTHETICAL` | M60 | 361 538.73 | 293 762.02 | 192 454.61 | 165 757.54 | 197 777.93 | 5 311 017.86 | 621 240.91 |

`RESTRICTED_CURRENT` has no period-value table because it authorises no sale and its monetary columns
are suppressed. Note the distinction: `BASE_HYPOTHETICAL` shows a positive final-month EBITDA-like
(17 235.81) while its 60-month cumulative EBITDA-like is still negative (-618 061.78).

## 6. Revenue mix and recurring-revenue exposure

Recurring-revenue exposure is the subscription share of net recognised revenue.

| Scenario | M12 recurring share | M36 recurring share | M60 recurring share | Hardware net M60 | Subscription net M60 |
|---|---|---|---|---|---|
| `DOWNSIDE` | `null` (no revenue) | 24.70 % | 41.62 % | 214 269.17 | 152 781.09 |
| `BASE_HYPOTHETICAL` | 10.75 % | 37.54 % | 51.35 % | 1 666 941.57 | 1 759 705.55 |
| `UPSIDE_HYPOTHETICAL` | 11.47 % | 43.15 % | 57.10 % | 4 354 099.89 | 5 794 201.93 |

The recurring share rises within each path as the annual cohort matures; hardware revenue dominates
the early months. `RESTRICTED_CURRENT` has no revenue mix. This is an exposure statement, not a
recurring-revenue forecast.

## 7. Invoice and collection timing (M60)

| Scenario | Gross invoiced | Distributor invoiced | Distributor collected | Refunds cash | VAT output | Collections net of VAT | VAT paid | Deferred end | Receivables end |
|---|---|---|---|---|---|---|---|---|---|
| `DOWNSIDE` | 463 955.96 | 47 993.40 | 45 692.70 | 8 018.35 | 66 841.65 | 432 684.74 | 20 952.17 | 22 045.70 | 2 300.70 |
| `BASE_HYPOTHETICAL` | 4 397 543.08 | 373 369.81 | 358 301.17 | 62 381.43 | 658 285.24 | 4 002 334.08 | 317 758.93 | 250 229.29 | 15 068.64 |
| `UPSIDE_HYPOTHETICAL` | 13 130 674.77 | 975 252.66 | 936 722.26 | 162 941.70 | 1 969 367.21 | 11 852 509.62 | 1 076 693.05 | 850 064.04 | 38 530.40 |

Cash collections differ from recognised revenue by the deferred subscription balance, VAT settlement
and the receivable lag; `cashCollectionsNetOfVat = cashReceiptsGross − vatPaid` (D04 §6.3). Refunds
are now paid in cash, and distributor invoicing uses the channel-adjusted trade price (35 % margin
applied once, VAT computed once), so the distributor receivable is invoiced minus collected.

## 8. Investment exposure, additional funding and cash recovery

Cumulative investment is the derived sum `capex cash + working-capital movement` (formula shown; both
terms from `monthly-financial-model.json`); a negative working-capital movement is a net cash release,
so a negative cumulative investment means operating releases exceed capex. The funding envelope of
2 000 000.00 is an illustrative `SCENARIO_ASSUMPTION` (ASM-MC13-046), not a financing commitment; the
gap is the derived difference `max(0, financing requirement − 2 000 000.00)`.

| Scenario | Capex cash | Working-capital movement | Cumulative investment | Financing requirement | Gap vs 2 000 000 envelope | Cash recovery month |
|---|---|---|---|---|---|---|
| `DOWNSIDE` | 503 125.00 | -51 582.26 | 451 542.74 | 3 081 802.04 | 1 081 802.04 | none within M60 |
| `BASE_HYPOTHETICAL` | 402 500.00 | -555 683.63 | -153 183.63 | 995 185.23 | 0.00 (1 004 814.77 headroom) | none within M60 |
| `UPSIDE_HYPOTHETICAL` | 342 125.00 | -1 689 229.40 | -1 347 104.40 | 621 240.91 | 0.00 (1 378 759.09 headroom) | M23 |

`RESTRICTED_CURRENT` cannot be assessed: company cash, funding and existing expenses are `UNKNOWN`.
The financing requirement is a conditional floor because unknown insurance, CRA, licensing and capex
items are excluded. Recovery means `cumulativeCashBalance >= 0` after a negative balance under the
declared zero opening-cash convention; it is not a verified payback.

## 9. Monthly burn

Average monthly net cash flow over the window is derived as `cumulative net cash flow at the view ÷
number of months` (opening cash 0). Negative values are burn.

| Scenario | Average monthly net cash M01–M12 | M01–M36 | M01–M60 |
|---|---|---|---|
| `DOWNSIDE` | -85 766.66 | -57 687.07 | -51 363.37 |
| `BASE_HYPOTHETICAL` | -71 088.59 | -26 219.25 | -7 747.97 |
| `UPSIDE_HYPOTHETICAL` | -49 676.43 | +37 825.89 | +88 516.96 |

The burn narrows in all paths as revenue ramps; `BASE_HYPOTHETICAL` is close to monthly break-even by
M60 and `UPSIDE_HYPOTHETICAL` turns to a net average inflow by M36. `RESTRICTED_CURRENT` has no
admissible burn figure (costs unknown).

## 10. Conditional contribution and operating result

| Scenario | Cut-off | Contribution | EBITDA-like | Amortisation (non-cash) | Accounting operating result |
|---|---|---|---|---|---|
| `DOWNSIDE` | M12 | 0.00 | -523 800.00 | 155 555.56 | -679 355.56 |
| `DOWNSIDE` | M36 | 34 147.79 | -1 584 865.69 | 487 586.87 | -2 072 452.56 |
| `DOWNSIDE` | M60 | 150 666.06 | -2 630 259.30 | 503 125.07 | -3 133 384.37 |
| `BASE_HYPOTHETICAL` | M12 | 15 294.95 | -419 105.05 | 124 444.44 | -543 549.49 |
| `BASE_HYPOTHETICAL` | M36 | 523 430.13 | -819 256.83 | 390 069.38 | -1 209 326.21 |
| `BASE_HYPOTHETICAL` | M60 | 1 688 226.86 | -618 061.78 | 402 499.93 | -1 020 561.71 |
| `UPSIDE_HYPOTHETICAL` | M12 | 53 940.35 | -230 699.65 | 105 777.74 | -336 477.39 |
| `UPSIDE_HYPOTHETICAL` | M36 | 1 706 337.08 | 826 543.28 | 331 558.95 | 494 984.33 |
| `UPSIDE_HYPOTHETICAL` | M60 | 5 475 105.86 | 3 963 913.46 | 342 124.92 | 3 621 788.54 |

The accounting operating result is `EBITDA-like − amortisationNonCash`; it excludes tax, interest and
all unknown costs and is not a profit figure. Obsolescence write-off cost is inside contribution and
reversed in working capital (D04 §6.6).

## 11. Lifecycle, CRA and insurance burden

The CRA support-period engineering and update obligation and the product liability insurance premium
are `UNKNOWN` and excluded from every view (BLK-FIN-04/BLK-FIN-05; see
[D08](MC13-OPEX-AND-SECURITY-LIFECYCLE-COSTS.md)). No amount is shown because no amount exists:
setting them to zero would be false. Their absence makes every conditional view in §4 optimistic.
Stress case ST-18 (unexpected cybersecurity maintenance of EUR 60 000/year) is the only quantified
sensitivity and belongs to D13, not to these views.

## 12. What the views do not show

No view is a probability, a demand forecast or a commercial result. They do not show a verified
company break-even, profitability, an investment return, a financing approval or a sale. Break-even
months in the integrated model are conditional: BASE operating M39 and cash-flow M23 with no cash
recovery within M60; UPSIDE operating M15, cash-flow M11 and cash recovery M23; DOWNSIDE none.
Governance flags remain: commercial availability `NOT_FOR_SALE`, price approved `NONE`, customer
evidence `NONE`, licensing rights not granted, PILOT safety `BLOCKED`, MC-14 not started. The
milestone is not merged and not deployed.

## 13. Reproducibility and references

```
node scripts/build-marea-financial-model.mjs
node scripts/check-marea-financial-model.mjs
```

All views are regenerated deterministically from `monthly-financial-model.json` and reconciled by the
validator (`A-02`, `A-23`); the derived averages and gaps in §8–§9 show their formulas above. Figures
reconcile to [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) §1.

- [scenario-results.json](data/scenario-results.json), [scenario-definitions.json](data/scenario-definitions.json), [monthly-financial-model.json](data/monthly-financial-model.json), [break-even-thresholds.json](data/break-even-thresholds.json), [capital-investments.json](data/capital-investments.json), [working-capital.json](data/working-capital.json).
- [MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md](MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md) — D04; [MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md](MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md) — D12; [MC13-SENSITIVITY-AND-STRESS-TESTS.md](MC13-SENSITIVITY-AND-STRESS-TESTS.md) — D13.
- [MC13-FINANCIAL-DATA-CONTRACT.md](MC13-FINANCIAL-DATA-CONTRACT.md); [MC12-MC13-HANDOFF.md](../economics/MC12-MC13-HANDOFF.md).
