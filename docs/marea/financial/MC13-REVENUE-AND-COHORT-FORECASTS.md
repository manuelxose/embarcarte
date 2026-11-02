# MC-13 D05 — Revenue drivers and cohort forecasts

| Field | Value |
|---|---|
| Deliverable | D05 `MC13-REVENUE-AND-COHORT-FORECASTS.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` |
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date / owner | 2026-11-02 — SaaS and recurring revenue economics (`saas-economist`) |
| Machine sources | `data/revenue-drivers.json`, `data/scenario-definitions.json`, `data/scenario-results.json`, `data/monthly-financial-model.json`, `data/recurring-revenue.json`, `data/break-even-thresholds.json`, `data/assumptions.json` |
| Governing contract | `MC13-FINANCIAL-DATA-CONTRACT.md` (V-01…V-14, V-17, A-02, A-03, A-05, A-06, A-21) |
| Review status | `PENDING_INDEPENDENT_REVIEW` |
| Boundary | Analysis only. No price approval, no availability, no approved forecast, no authorized revenue, no customer evidence, no break-even claim, no MC-14 start. |

## 1. Purpose and boundary

This deliverable states how revenue is produced inside the single 60-period MC-13 model: hardware and subscription drivers, the nine families and their editions, the six bundle price hypotheses, the channel structure, the conditional clearance-dependency schedule, the illustrative demand assumptions, the cohort mechanics that turn units and accounts into recognised revenue, and the resulting 12/36/60-month totals per scenario.

Nothing here is a forecast. `data/scenario-definitions.json` freezes the governance state: every product is `NOT_FOR_SALE`, `PRICE_APPROVED = NONE`, `CUSTOMER_EVIDENCE = NONE`, `CUSTOMER_WTP_VALIDATED = false`, `LICENSING_RIGHTS_GRANTED = false`, `PILOT_SAFETY_GATE = BLOCKED`, `FLEET_DEFAULT_HARDWARE = false`, and no executed contract or formal quotation exists. `authorizedForSaleMask` is `0` in all four scenarios, including the three hypothetical ones: hypothetical revenue is conditional model output, never an authorized sale.

`RESTRICTED_CURRENT` is the only scenario that describes the company as it is today. `DOWNSIDE`, `BASE_HYPOTHETICAL` and `UPSIDE_HYPOTHETICAL` are three hypothetical post-clearance cases built on the same unapproved prices; they are mutually exclusive illustrations, not a probability distribution.

## 2. The nine product families and their editions

`data/revenue-drivers.json#productFamilies` declares exactly nine families. Edition identities come from `docs/marea/products/product-definitions.batch-01.json`, `batch-02.json` and `batch-03.json`.

| Family | Type | Editions | Clearance gate | Modelled revenue objects |
|---|---|---|---|---|
| NAV | `SOFTWARE` | `NAV-ESSENTIAL`, `NAV-PRO` | `CHART_LICENCE` | 2 subscriptions |
| HUB | `HARDWARE` | `HUB-STANDARD`, `HUB-PRO` | `RED_CERTIFICATION` | 2 hardware SKUs |
| AIS | `HARDWARE` | `AIS-RECEIVER`, `AIS-CONNECTED` | `NMEA_LICENCE` | `AIS-RECEIVER` only |
| PILOT | `HARDWARE_SOFTWARE` | `PILOT-COASTAL`, `-SAIL`, `-PRO` | `SAFETY_GATE` | none (`safetyBlocked: true`) |
| SENSE | `HARDWARE` | `SENSE-WIND`, `-POWER`, `-BILGE`, `-TANKS`, `-ENV`, `-ESSENTIALS`, `-SAIL`, `-SYSTEMS` | `RED_CERTIFICATION` | `SENSE-ENTRY-SYMBOLIC` only |
| WATCH | `HARDWARE_SERVICE` | `WATCH-CORE`, `WATCH-PLUS` | `RED_CERTIFICATION` | `WATCH-CORE` + `WATCH-MONITORING` |
| DISPLAY | `HARDWARE_SOFTWARE` | `DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL` | `RED_CERTIFICATION` | `DISPLAY-7` only |
| WEATHER | `SOFTWARE` | `WEATHER-STANDARD`, `WEATHER-PRO` | `WEATHER_LICENCE` | 2 subscriptions |
| FLEET | `SOFTWARE` | `FLEET-START`, `-BUSINESS`, `-ENTERPRISE` | `NONE` | `FLEET-START` per-vessel SaaS only |

Six hardware SKUs are modelled. The other editions are excluded for a stated reason: AIS is receive-only and no transmission offering exists (`V-04`); `AIS-CONNECTED`, `PILOT-*`, `DISPLAY-LARGE-CONDITIONAL`, `WATCH-PLUS` and `FLEET-ENTERPRISE` have no established price or scope; SENSE is modelled through one symbolic entry edition only. PILOT contributes zero units, zero revenue and `null` cost in every scenario (`V-03`). FLEET carries no hardware by default (`V-05`).

## 3. Hardware revenue drivers

`data/revenue-drivers.json#hardwareSkus` declares eight hardware records, of which six have `modelEnabled: true` and are modelled; `AIS-CONNECTED` and `PILOT-COASTAL` carry `modelEnabled: false` and no revenue. Prices are `HYPOTHESIS_UNAPPROVED` VAT-inclusive consumer retail hypotheses; the known variable cost is the inherited MC-11 100-unit `BASE` tier (`docs/marea/economics/data/unit-economics.json`), self-install, fixed tooling and certification excluded.

| SKU | Family | Gross hypothesis | Known variable cost | Cost completeness |
|---|---|---|---|---|
| `HUB-STANDARD` | HUB | EUR 349.00 (`VAT_INCLUDED`) | EUR 281.13 | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `HUB-PRO` | HUB | EUR 499.00 (`VAT_INCLUDED`) | EUR 281.13 | `INCOMPLETE_UNKNOWN_COSTS` |
| `DISPLAY-7` | DISPLAY | EUR 699.00 (`VAT_INCLUDED`) | EUR 303.32 | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `AIS-RECEIVER` | AIS | EUR 249.00 (`VAT_INCLUDED`) | EUR 281.35 | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `SENSE-ENTRY-SYMBOLIC` | SENSE | EUR 99.00 (`VAT_INCLUDED`) | EUR 88.27 | `COMPLETE_KNOWN_VARIABLE_COSTS` |
| `WATCH-CORE` | WATCH | EUR 299.00 (`VAT_INCLUDED`) | EUR 190.90 | `COMPLETE_KNOWN_VARIABLE_COSTS` |

Conditional per-unit thresholds come from `data/break-even-thresholds.json`. All are `CONDITIONAL_HYPOTHETICAL_THRESHOLD` and all exclude fixed tooling/NRE and certification: the minimum gross price is the known variable cost divided by the hardware channel factor and grossed up for VAT; unit contribution is net unit revenue ex-VAT after channel deductions minus that cost.

| SKU | Unit contribution | Minimum gross price | Status |
|---|---|---|---|
| `HUB-STANDARD` | -EUR 20.10 | EUR 375.88 | `CONDITIONAL_HYPOTHETICAL_THRESHOLD` |
| `HUB-PRO` | EUR 92.09 | EUR 375.88 | `CONDITIONAL_HYPOTHETICAL_THRESHOLD` |
| `DISPLAY-7` | EUR 219.49 | EUR 405.54 | `CONDITIONAL_HYPOTHETICAL_THRESHOLD` |
| `AIS-RECEIVER` | -EUR 95.11 | EUR 376.17 | `CONDITIONAL_HYPOTHETICAL_THRESHOLD` |
| `SENSE-ENTRY-SYMBOLIC` | -EUR 14.22 | EUR 118.02 | `CONDITIONAL_HYPOTHETICAL_THRESHOLD` |
| `WATCH-CORE` | EUR 32.73 | EUR 255.24 | `CONDITIONAL_HYPOTHETICAL_THRESHOLD` |

`HUB-PRO` reuses the `HUB-STANDARD` cost basis and therefore declares `requiredUnknownInputs: ["HUB_PRO_INCREMENTAL_COST"]`; its contribution is not a resolved number. Three SKUs are negative before fixed costs and the model keeps those results rather than suppressing them (`A-25`).

## 4. Subscription revenue drivers

`data/revenue-drivers.json#subscriptionSkus` declares nine records: seven modelled and two with `modelEnabled: false` (`WATCH-PLUS`, `FLEET-ENTERPRISE`, both `NOT_ESTABLISHED`). Account-level economics are owned by `MC13-RECURRING-REVENUE-AND-SAAS-ECONOMICS.md` (D07).

| SKU | Billing period | Gross hypothesis | VAT basis | Demand modelled |
|---|---|---|---|---|
| `NAV-ESSENTIAL` | `YEAR` | EUR 99.00 | `VAT_INCLUDED` | yes |
| `NAV-PRO` | `YEAR` | EUR 149.00 | `VAT_INCLUDED` | yes |
| `WEATHER-STANDARD` | `YEAR` | EUR 49.00 | `VAT_INCLUDED` | yes |
| `WEATHER-PRO` | `YEAR` | EUR 89.00 | `VAT_INCLUDED` | yes |
| `WATCH-MONITORING` | `YEAR` | EUR 118.80 | `VAT_INCLUDED` | yes |
| `FLEET-START` | `MONTH` | EUR 49.00 | `VAT_EXCLUDED_B2B` | yes |
| `FLEET-BUSINESS` | `MONTH` | EUR 79.00 | `VAT_EXCLUDED_B2B` | no profile |
| `WATCH-PLUS` | `YEAR` | `null` | `VAT_UNKNOWN` | no |
| `FLEET-ENTERPRISE` | `MONTH` | `null` | `VAT_UNKNOWN` | no |

Every record declares `gatesLocalSafety: false` (`V-06`). No subscription is a safety gate and no subscription is a purchase commitment.

## 5. The six bundle price hypotheses

`data/revenue-drivers.json#bundles` holds six records derived from `docs/marea/bundles/bundle-definitions.json#priceHypothesisRegister`. Each is a historical starting figure only; a bundle is not a product, is not purchasable and has no checkout value.

| Bundle | Hypothesis ID | Amount | Status |
|---|---|---|---|
| START | `PH-01` | EUR 499.00 | `HYPOTHESIS_UNAPPROVED` |
| CRUISE | `PH-02` | EUR 1 399.00 | `HYPOTHESIS_UNAPPROVED` |
| SAIL | `PH-03` | EUR 1 990.00 | `HYPOTHESIS_UNAPPROVED` |
| PROTECT | `PH-04` | EUR 399.00 | `HYPOTHESIS_UNAPPROVED` |
| COMPLETE | `PH-05` | EUR 3 490.00 | `HYPOTHESIS_UNAPPROVED` |
| FLEET | `PH-06` | `null` | `NOT_ESTABLISHED` |

No bundle revenue line exists in the model. Bundles are excluded because their components include licensing-blocked (NAV, WEATHER), certification-blocked (HUB, SENSE, DISPLAY, WATCH) and safety-blocked (PILOT) editions, PROTECT is negative at its historical hypothesis, and the FLEET package has no price. The hypotheses are recorded so no later document can present EUR 499–3 490 as a price.

## 6. Channel mix (`SCENARIO_ASSUMPTION`)

`data/scenario-definitions.json#scenarios[].channelMix` declares the channel shares. Every row is `SCENARIO_ASSUMPTION`; no distributor, installer or app-store agreement exists and no channel margin has been negotiated. `RESTRICTED_CURRENT` declares an empty mix because there is no sale to route.

| Applies to | Channel | Share | Revenue deduction | Assumption (DOWNSIDE / BASE / UPSIDE) |
|---|---|---|---|---|
| `HARDWARE` | `DIRECT_TO_CONSUMER` | 70 % | 0 % | `ASM-MC13-100` / `-114` / `-128` |
| `HARDWARE` | `DISTRIBUTOR_RETAIL` | 25 % | 35 % | `ASM-MC13-101` / `-115` / `-129` |
| `HARDWARE` | `PROFESSIONAL_INSTALLER` | 5 % | 15 % | `ASM-MC13-102` / `-116` / `-130` |
| `SUBSCRIPTION` | `DIRECT_TO_CONSUMER` | 80 % | 0 % | `ASM-MC13-103` / `-117` / `-131` |
| `SUBSCRIPTION` | `APP_STORE` | 20 % | 30 % | `ASM-MC13-104` / `-118` / `-132` |

Shares are identical in the three hypothetical scenarios; only the assumption IDs differ. The engine blends them into a channel factor `Σ share × (1 − deduction)`: hardware `0.9050` (9.50 % blended deduction before VAT) and subscription `0.9400` (6.00 %, all of it the published 30 % app-store commission of `ASM-MC13-006` on the 20 % app-store share). `FLEET` is not routed through this factor; it is modelled directly at its per-vessel monthly hypothesis. Reseller margin, installation labour revenue and app-store listing costs are not modelled as separate lines; the deduction is the declared treatment. Distributor invoicing is channel-adjusted in the final data — the 35 % distributor deduction is applied once at the invoice and VAT is charged once on the resulting amount — so `distributorInvoicedGross` is a post-margin figure and hardware cash receipts, not gross revenue, move as a result.

## 7. Conditional clearance-dependency schedule

`data/scenario-definitions.json#scenarios[].clearanceSchedule` declares, per family and scenario, the month at which a gate is *hypothetically* assumed to clear. This is a modelling switch — not a clearance forecast, not a regulatory timetable, not evidence that any gate will clear. Every row carries `conditional: true` and `statusFlagUnchanged: true`; no scenario changes a governance status flag (`V-14`), and the per-scenario `statusFlags` blocks in `monthly-financial-model.json` are identical across all four scenarios.

| Family | Gate | Restricted | DOWNSIDE | BASE_HYPOTHETICAL | UPSIDE_HYPOTHETICAL |
|---|---|---|---|---|---|
| NAV | `CHART_LICENCE` | `null` | M26 | M13 | M10 |
| HUB | `RED_CERTIFICATION` | `null` | M16 | M08 | M07 |
| AIS | `NMEA_LICENCE` | `null` | M22 | M11 | M09 |
| PILOT | `SAFETY_GATE` | `null` | `null` | `null` | `null` |
| SENSE | `RED_CERTIFICATION` | `null` | M18 | M09 | M08 |
| WATCH | `RED_CERTIFICATION` | `null` | M16 | M08 | M07 |
| DISPLAY | `RED_CERTIFICATION` | `null` | M14 | M07 | M06 |
| WEATHER | `WEATHER_LICENCE` | `null` | M26 | M12 | M10 |
| FLEET | `NONE` | `null` | M12 | M06 | M05 |

PILOT is `null` in every scenario and never clears: the safety gate is `BLOCKED` and PILOT is excluded from revenue in all cases. The engine starts revenue in the month *after* the declared gate month, so a gate declared at M08 first produces units in M09. This sequencing is why the first revenue month differs per family and why the three hypothetical cases are not a simple multiplier of one another.

## 8. Illustrative demand assumptions (no customer evidence)

`data/revenue-drivers.json#demandProfiles` declares 36 profiles — one per modelled SKU and hypothetical scenario. Every profile is `SCENARIO_ASSUMPTION` with `launchOffsetMonths: 0`, and no `marketShare`, conversion rate, funnel or CAC input exists anywhere in MC-13 (`V-08`). These are illustrative planning quantities with **no customer evidence**: no interview, survey, pilot, pre-order, letter of intent or willingness-to-pay response exists.

Hardware profiles declare `matureMonthlyUnits` with a 6-month ramp; subscription profiles declare `matureMonthlyAccounts` with a 4-month ramp. The scenario `demandMultiplier` is `0.4` (`DOWNSIDE`), `1.0` (`BASE_HYPOTHETICAL`) and `1.6` (`UPSIDE_HYPOTHETICAL`).

| SKU | DOWNSIDE | BASE_HYPOTHETICAL | UPSIDE_HYPOTHETICAL |
|---|---|---|---|
| `HUB-STANDARD` (units/month) | 16 | 40 | 64 |
| `HUB-PRO` (units/month) | 3 | 8 | 13 |
| `DISPLAY-7` (units/month) | 8 | 20 | 32 |
| `AIS-RECEIVER` (units/month) | 5 | 12 | 19 |
| `SENSE-ENTRY-SYMBOLIC` (units/month) | 10 | 25 | 40 |
| `WATCH-CORE` (units/month) | 12 | 30 | 48 |
| `NAV-ESSENTIAL` (accounts/month) | 40 | 100 | 160 |
| `NAV-PRO` (accounts/month) | 24 | 60 | 96 |
| `WEATHER-STANDARD` (accounts/month) | 16 | 40 | 64 |
| `WEATHER-PRO` (accounts/month) | 8 | 20 | 32 |
| `WATCH-MONITORING` (accounts/month) | 8 | 20 | 32 |
| `FLEET-START` (vessels/month) | 4 | 10 | 16 |

The mature figure is a *monthly addition rate* at full ramp, not an installed base; the installed base is produced only by the cohort mechanics in §9. A demand profile is not a sales target, a capacity plan or a budget, and the three scenarios are not ordered probability cases.

## 9. Cohort mechanics: units, accounts, churn, renewal, deferred revenue

**Hardware.** Units in month `m` equal `round(matureMonthlyUnits × min(1, (m − first + 1) / 6))` where `first` is the month after the conditional clearance month. Net recognised revenue per unit is the gross hypothesis, reduced by the hardware channel factor, reduced by the refund/withdrawal allowance (`ASM-MC13-003`, 3 % engineering assumption), then divided by `1 + VAT` (`ASM-MC13-001`, 21 %). VAT is never recognised as revenue (`A-04`). Hardware cash settles directly in 2 days or through a distributor in 60 days (`ASM-MC13-018`, `-019`), so revenue, cash receipts and trade receivables separate from the first month.

**Annual subscriptions (NAV, WEATHER, WATCH monitoring).** A cohort model, not a simple stock:

1. **New.** Each month from `first`, new accounts are `round(matureMonthlyAccounts × rampFraction × activationRate)`. `activationRate` is a `SCENARIO_ASSUMPTION` (`0.7` / `0.85` / `0.95`); at `BASE_HYPOTHETICAL` the 100-account `NAV-ESSENTIAL` profile therefore produces `round(100 × 0.85) = 85` new accounts per month at full ramp.
2. **Cash.** A cohort's whole annual amount is invoiced and collected in its start month — prepayment in advance, not monthly billing.
3. **Recognition.** That cash is recognised straight-line over the following 12 months (`ASM-MC13-159`; remainder cent to the first month), leaving deferred revenue for the unearned part.
4. **Active.** An account is active exactly while its cohort is inside its 12-month period. Active is not `new × 12`: a renewed cohort is a new cohort.
5. **Renewal / churn.** At each anniversary `renewed = round(cohort × renewalRate)`. Non-renewed accounts leave the active base; that is the annual churn. There is no cancellation month inside the paid year and no refund on churn (`deferredRevenuePolicy.refundOnChurnPct: 0`).

**Monthly subscriptions (FLEET).** A vessel balance: `balance = balance − round(balance × monthlyChurnRate) + newVessels`; revenue and cash are recognised in the month billed and there is no deferred balance. FLEET uses `monthlyChurnRate` (`0.03` / `0.015` / `0.008`) and no activation multiplier. `FLEET-BUSINESS` has no demand profile in any scenario.

| Scenario | Annual renewal rate | Monthly churn rate | Activation rate | Deferred refund % |
|---|---|---|---|---|
| `DOWNSIDE` | 0.55 | 0.03 | 0.70 | 0 |
| `BASE_HYPOTHETICAL` | 0.75 | 0.015 | 0.85 | 0 |
| `UPSIDE_HYPOTHETICAL` | 0.85 | 0.008 | 0.95 | 0 |

`ASM-MC13-051` records `CHURN_VALIDATED = false` and `RENEWAL_RATE_VALIDATED = false` with `value: null`. These rates are invented so the model can run; they are not observations. The cohort behaviour is still readable: in `BASE_HYPOTHETICAL` the first annual cohort starts at M14 (NAV gate M13), the first renewal falls due at M26, and WATCH monitoring (gate M08) produces the first renewal at M21 — so no renewal is visible in any M12 view. Each scenario's `cohortAssumptions` block now also carries `deferredRevenueRefundPct: 0`, and `scenario-definitions.json#scenarios[].scenarioAssumptionIds` is populated — 9 IDs for `RESTRICTED_CURRENT` (`ASM-MC13-091`…`-099`, the nine `null` clearance-month declarations) and 29 per hypothetical scenario covering clearance schedule, channel mix, demand profiles and cohort rates — so every scenario input resolves to a declared assumption.

| Scenario | Deferred at M12 | Deferred at M36 | Deferred at M60 | Deferred M60 as % of annual-billed recurring revenue |
|---|---|---|---|---|
| `DOWNSIDE` | EUR 0.00 | EUR 11 376.24 | EUR 22 045.70 | 26.89 % |
| `BASE_HYPOTHETICAL` | EUR 3 306.91 | EUR 158 760.78 | EUR 250 229.29 | 20.55 % |
| `UPSIDE_HYPOTHETICAL` | EUR 40 940.41 | EUR 510 202.04 | EUR 850 064.04 | 20.37 % |
| `RESTRICTED_CURRENT` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |

Annual-billed recurring revenue at M60 is the subscription total minus FLEET: `EUR 81 976.09` / `EUR 1 217 520.55` / `EUR 4 173 771.93`. About a fifth of a year's annual prepayment is earned but not yet recognised at M60, which is why recognised revenue and cash are never the same number (`A-06`, `A-08`).

## 10. `RESTRICTED_CURRENT` — the zero-validated-customer view

`RESTRICTED_CURRENT` is kept structurally separate from the three hypothetical cases and must never be blended with them.

- **Zero authorized revenue.** `commercialRevenueAuthorized: false`, `demandMultiplier: 0`, empty `channelMix`, every clearance month `null`. The model stores 60 periods with `grossInvoicedRevenue`, `vatOutput`, `netRecognizedRevenue`, `hardwareRevenueNet`, `subscriptionRevenueNet` and `cashReceiptsGross` all `0.00`, `authorizedForSaleMask` all `0`, `revenueSuppressedMask` all `1`, `unitsTotal` `0`, `activeSubscriptions` `0`, `fleetActiveVessels` `0`.
- **Unknown cash and expense.** Every monetary cost and cash column is `null`, not `0`: `cogsHardware`, `softwareDirectCosts`, `fixedOpexEnvelope`, `ebitdaLikeConditional`, `operatingCashFlow`, `netCashFlow`, `cumulativeCashBalance` and `financingRequirement` are all declared `UNKNOWN` with reasons (`companyOpeningCash`, `fixedOpexEnvelope`, `cogsHardware`). Current company bank balance and current expenses are unknown; this document does not estimate them.
- **Zero customer evidence.** No customer, no validated willingness to pay, no quotation and no contract exists. The honest current statement is that the authorized revenue column is zero and the cost column is unknown — not that the business is unprofitable, and not that it is profitable.
- **Break-even status** is `CONDITIONAL_RESTRICTED_ZERO` with every month `null`.

## 11. Revenue results at 12, 36 and 60 months

Cumulative recognised revenue from `data/scenario-results.json#scenarios[*].views`, which the validator recomputes from `data/monthly-financial-model.json` (`A-02`).

| Scenario | View | Net revenue | Hardware net | Subscription net | Hardware share | Recurring share |
|---|---|---|---|---|---|---|
| `RESTRICTED_CURRENT` | M12 / M36 / M60 | EUR 0.00 | EUR 0.00 | EUR 0.00 | `null` | `null` |
| `DOWNSIDE` | M12 | EUR 0.00 | EUR 0.00 | EUR 0.00 | `null` | `null` |
| `DOWNSIDE` | M36 | EUR 120 860.60 | EUR 91 009.97 | EUR 29 850.63 | 75.30 % | 24.70 % |
| `DOWNSIDE` | M60 | EUR 367 050.26 | EUR 214 269.17 | EUR 152 781.09 | 58.38 % | 41.62 % |
| `BASE_HYPOTHETICAL` | M12 | EUR 67 257.32 | EUR 60 029.72 | EUR 7 227.60 | 89.25 % | 10.75 % |
| `BASE_HYPOTHETICAL` | M36 | EUR 1 376 225.77 | EUR 859 638.69 | EUR 516 587.08 | 62.46 % | 37.54 % |
| `BASE_HYPOTHETICAL` | M60 | EUR 3 426 647.12 | EUR 1 666 941.57 | EUR 1 759 705.55 | 48.65 % | 51.35 % |
| `UPSIDE_HYPOTHETICAL` | M12 | EUR 258 753.72 | EUR 229 064.47 | EUR 29 689.25 | 88.53 % | 11.47 % |
| `UPSIDE_HYPOTHETICAL` | M36 | EUR 4 028 122.59 | EUR 2 289 832.29 | EUR 1 738 290.30 | 56.85 % | 43.15 % |
| `UPSIDE_HYPOTHETICAL` | M60 | EUR 10 148 301.82 | EUR 4 354 099.89 | EUR 5 794 201.93 | 42.90 % | 57.10 % |

Two consequences follow directly. First, the recurring share rises monotonically inside every hypothetical case — 10.75 % → 37.54 % → 51.35 % in `BASE_HYPOTHETICAL` — because the cohort base compounds while hardware is capped by the mature monthly demand assumption. Second, a majority-recurring mix is reached only at the end of the horizon even in the base case; nothing in the data supports a claim that recurring revenue dominates by year three.

Gross-to-net bridge and cash at the same views (`grossInvoicedRevenue`, `vatOutput`, `refundsAllowance`, `refundsCash`, `cashCollectionsNetOfVat`, `tradeReceivablesEnd`, `paymentFees`):

| Scenario | View | Gross invoiced | VAT output | Refund allowance | Net revenue | Cash net of VAT | Trade receivables at view | Payment fees |
|---|---|---|---|---|---|---|---|---|
| `DOWNSIDE` | M36 | EUR 159 131.94 | EUR 23 489.31 | EUR 3 405.79 | EUR 120 860.60 | EUR 151 990.77 | EUR 2 300.70 | EUR 2 412.67 |
| `DOWNSIDE` | M60 | EUR 463 955.96 | EUR 66 841.65 | EUR 8 018.35 | EUR 367 050.26 | EUR 432 684.74 | EUR 2 300.70 | EUR 6 922.08 |
| `BASE_HYPOTHETICAL` | M12 | EUR 86 250.34 | EUR 13 439.64 | EUR 2 246.47 | EUR 67 257.32 | EUR 75 081.63 | EUR 8 922.24 | EUR 1 333.64 |
| `BASE_HYPOTHETICAL` | M36 | EUR 1 851 266.02 | EUR 284 109.48 | EUR 32 169.99 | EUR 1 376 225.77 | EUR 1 700 974.67 | EUR 15 068.64 | EUR 27 884.43 |
| `BASE_HYPOTHETICAL` | M60 | EUR 4 397 543.08 | EUR 658 285.24 | EUR 62 381.43 | EUR 3 426 647.12 | EUR 4 002 334.08 | EUR 15 068.64 | EUR 65 353.40 |
| `UPSIDE_HYPOTHETICAL` | M36 | EUR 5 465 572.45 | EUR 841 556.36 | EUR 85 691.46 | EUR 4 028 122.59 | EUR 4 982 817.70 | EUR 38 530.40 | EUR 81 915.31 |
| `UPSIDE_HYPOTHETICAL` | M60 | EUR 13 130 674.77 | EUR 1 969 367.21 | EUR 162 941.70 | EUR 10 148 301.82 | EUR 11 852 509.62 | EUR 38 530.40 | EUR 194 072.07 |

Cash net of VAT exceeds recognised revenue in every view, because annual prepayment is collected ahead of straight-line recognition and hardware settles faster than it is recognised; trade receivables settle at a steady level once the distributor book reaches its 60-day equilibrium. Refund allowance is settled in cash in the same period — `refundsCash` equals `refundsAllowance` at every view (EUR 2 246.47 / 32 169.99 / 62 381.43 at `BASE_HYPOTHETICAL`) — so it is a cash outflow and not an accrual only. The refund allowance is hardware-only in the model — subscription lines are not reduced by it, which is inconsistent with the MC-12 subscription direct cost that already contains a returns line (see D07 §4).

## 12. Revenue by family and by SKU

Cumulative net recognised revenue at M60 from `monthly-financial-model.json#scenarios[*].supporting.hardwarePerSku[*].netRevenue` and `...subscriptionRevenueNetBySku`. FLEET revenue is derived from the `fleetActiveVessels` balance at the EUR 49.00 per-vessel-month hypothesis, because FLEET is not stored in the per-SKU subscription array.

| Family / object | `DOWNSIDE` M60 | `BASE_HYPOTHETICAL` M60 | `UPSIDE_HYPOTHETICAL` M60 |
|---|---|---|---|
| HUB hardware | EUR 78 251.22 | EUR 644 693.43 | EUR 1 687 604.82 |
| DISPLAY hardware | EUR 66 940.26 | EUR 512 192.72 | EUR 1 332 715.50 |
| WATCH hardware | EUR 44 903.25 | EUR 322 130.66 | EUR 843 397.59 |
| SENSE hardware | EUR 11 348.32 | EUR 87 122.53 | EUR 227 538.64 |
| AIS hardware | EUR 12 826.12 | EUR 100 802.23 | EUR 262 843.34 |
| NAV subscriptions | EUR 60 265.94 | EUR 894 350.70 | EUR 3 111 311.47 |
| WEATHER subscriptions | EUR 10 727.37 | EUR 186 600.47 | EUR 620 000.91 |
| WATCH monitoring | EUR 10 982.78 | EUR 136 569.38 | EUR 442 459.55 |
| FLEET per-vessel SaaS | EUR 70 805.00 | EUR 542 185.00 | EUR 1 620 430.00 |

Hardware units cumulated at M60 are HUB 291 / 2 376 / 6 210, DISPLAY 132 / 1 010 / 2 628, WATCH 207 / 1 485 / 3 888, SENSE 158 / 1 213 / 3 168 and AIS 71 / 558 / 1 455 for `DOWNSIDE` / `BASE_HYPOTHETICAL` / `UPSIDE_HYPOTHETICAL`. FLEET vessel balances at M60 are 50 / 366 / 1 134. The family columns reconcile exactly to `hardwareRevenueNet` and `subscriptionRevenueNet` of §11.

## 13. Non-claims and what would change the numbers

- No figure here is a forecast, budget, target, price, approved offer or evidence of demand. `reviewStatus` is `PENDING_INDEPENDENT_REVIEW`.
- The model excludes named unknown costs: the chart/weather data licence, FLEET onboarding/DPA/SLA, product-liability insurance and CRA/security-maintenance lifecycle cost. The true revenue-to-cost picture is worse than the conditional one, not better.
- Replacing an illustrative demand profile changes everything below it: every total in §11 is a direct function of §8 and of the cohort rates in §9, none of which is measured.
- What would change the numbers is evidence: a validated willingness-to-pay response, a signed distribution or app-store term, an actual customer cohort, a granted data licence and a clearance decision. Until any of those exists the only defensible revenue statement is the `RESTRICTED_CURRENT` one: zero authorized revenue.

## 14. Reported inconsistencies

Recorded for the Lead and the independent reviewer; nothing is edited outside this document.

1. **Bundle components reconciled (resolved).** An earlier data revision listed the same component editions for several bundles. The final `revenue-drivers.json#bundles[*].componentEditionIds` is derived from `docs/marea/bundles/bundle-definitions.json#bundles[*].components`, and validator check `V-21` fails any bundle whose edition list diverges from the governing contract. No delivered figure depends on the list.
2. **`channelMix` location (resolved in the contract).** `channelMix` is declared per scenario in `scenario-definitions.json#scenarios[].channelMix`; the data contract now states this explicitly and this document reads it there.
3. **Fee base includes VAT.** The payment-processing percentage is applied to gross VAT-inclusive receipts, not to net revenue; see D07 §8.
4. **`ASM-MC13-038` mis-reference closed.** Drafting found that `recurring-revenue.json#deferredRevenuePolicy` cited `ASM-MC13-038` ("Hardware device attrition per year = 2 %") as the straight-line authority. The final dataset adds `ASM-MC13-159` ("Annual subscription revenue recognition method", 12 months, `SCENARIO_ASSUMPTION`, confidence `NONE`) and the policy now points to it, so the record resolves; no figure changed.
5. **Figures reflect the post-audit final snapshot.** Three rebuilds occurred during drafting (collection aliasing, input VAT from receipts, safety stock, obsolescence write-off; an inventory-planning and override-effective fix; then the audit corrections). The audit corrections settle refunds in cash (`refundsCash` equals `refundsAllowance` at every view) and channel-adjust distributor invoicing (35 % once, no double VAT), which moves `cashCollectionsNetOfVat`, trade receivables, contribution, cash flow and financing. Every figure here is re-read from the current `data/` files and `MC13-GENERATED-FIGURES.md`: net revenue, the hardware/subscription split, recurring shares, per-SKU lines and deferred balances are unchanged. The identities verified arithmetically are: net revenue equals hardware net plus subscription net at every view; FLEET revenue equals vessel-months × EUR 49.00; per-SKU hardware net revenue sums to `hardwareRevenueNet`; per-SKU subscription revenue plus FLEET revenue equals `subscriptionRevenueNet`. The builder and validator scripts are committed in the implementation commit and are the executable gate.
