# MC-13 D07 — Recurring revenue and SaaS economics

| Field | Value |
|---|---|
| Deliverable | D07 `MC13-RECURRING-REVENUE-AND-SAAS-ECONOMICS.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` |
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date / owner | 2026-11-02 — SaaS and recurring revenue economics (`saas-economist`) |
| Machine sources | `data/revenue-drivers.json`, `data/recurring-revenue.json`, `data/assumptions.json`, `data/break-even-thresholds.json`, `data/scenario-results.json`, `data/monthly-financial-model.json`, `docs/marea/economics/data/unit-economics.json` |
| Governing contract | `MC13-FINANCIAL-DATA-CONTRACT.md` (V-01, V-06, V-12, V-17, V-20, A-05…A-08, A-21, R-01…R-05) |
| Review status | `PENDING_INDEPENDENT_REVIEW` |
| Boundary | Analysis only. Every subscription amount is a price hypothesis, not an offer; no SLA, contract, approved price, validated churn, validated renewal or break-even claim exists. |

## 1. Purpose and boundary

This deliverable states the account-level economics of the seven modelled subscription objects — `NAV-ESSENTIAL`, `NAV-PRO`, `WEATHER-STANDARD`, `WEATHER-PRO`, `WATCH-MONITORING`, `FLEET-START`, `FLEET-BUSINESS` — plus the shared NAV/WEATHER entitlement ledger, the WATCH and FLEET product constraints, payment and app-store deductions, inactive-account cost, deferred revenue and cash timing, the recurring revenue the model produces, and exactly which subscription break-even figures are `NOT_DETERMINABLE`.

Every price here is `HYPOTHESIS_UNAPPROVED` and `commercialAvailability` is `NOT_FOR_SALE`. `billingImplemented: false`, `subscriptionTermsStatus: OPEN` and `slaEstablished: false` describe the current state: no subscription is purchasable, no billing model is a contract term, and no subscription amount may appear in a checkout flow.

## 2. Price hypotheses

Source: `data/revenue-drivers.json#subscriptionSkus`, cross-checked against `docs/marea/products/product-definitions.batch-01/02/03.json`. All are `HYPOTHESIS_UNAPPROVED`; `FLEET-ENTERPRISE` and `WATCH-PLUS` are `NOT_ESTABLISHED`.

| SKU | Hypothesis | Period | Annualised | VAT basis | Cost completeness |
|---|---|---|---|---|---|
| `NAV-ESSENTIAL` | EUR 99.00 | per year | EUR 99.00 | `VAT_INCLUDED` | `INCOMPLETE_UNKNOWN_COSTS` |
| `NAV-PRO` | EUR 149.00 | per year | EUR 149.00 | `VAT_INCLUDED` | `INCOMPLETE_UNKNOWN_COSTS` |
| `WEATHER-STANDARD` | EUR 49.00 | per year | EUR 49.00 | `VAT_INCLUDED` | `INCOMPLETE_UNKNOWN_COSTS` |
| `WEATHER-PRO` | EUR 89.00 | per year | EUR 89.00 | `VAT_INCLUDED` | `INCOMPLETE_UNKNOWN_COSTS` |
| `WATCH-MONITORING` | EUR 9.90 | per month | EUR 118.80 | `VAT_INCLUDED` | `INCOMPLETE_UNKNOWN_COSTS` |
| `FLEET-START` | EUR 49.00 | per vessel-month | EUR 588.00 | `VAT_EXCLUDED_B2B` | `INCOMPLETE_UNKNOWN_COSTS` |
| `FLEET-BUSINESS` | EUR 79.00 | per vessel-month | EUR 948.00 | `VAT_EXCLUDED_B2B` | `INCOMPLETE_UNKNOWN_COSTS` |
| `WATCH-PLUS` | `null` | per year | `null` | `VAT_UNKNOWN` | `NOT_ESTABLISHED`, not modelled |
| `FLEET-ENTERPRISE` | `null` | per vessel-month | `null` | `VAT_UNKNOWN` | `NOT_ESTABLISHED`, not modelled |

The WATCH hypothesis is EUR 9.90 per month; the record bills it as a `YEAR` line at the EUR 118.80 annual equivalent. FLEET is the only monthly-billed and the only `VAT_EXCLUDED_B2B` line: a business price quoted net of VAT, never treated as consumer revenue.

## 3. Known direct cost per account-year

Source: `data/revenue-drivers.json#subscriptionSkus[*].knownDirectCostEurPerYear`, from `docs/marea/economics/data/unit-economics.json`. Amounts are EUR per account-year (`WATCH-MONITORING` also per device-year, `FLEET` per vessel-year) and cover known costs only.

| Component | NAV-Ess. | NAV-Pro | WEA-STD | WEA-PRO | WATCH | FLEET-START | FLEET-BUS. |
|---|---|---|---|---|---|---|---|
| Payment processing | 1.74 | 2.49 | 0.99 | 1.59 | 4.80 | 11.88 | 17.28 |
| Cloud / account | 0.24 | 0.24 | 0.24 | 0.24 | 1.86 | 1.20 | 1.20 |
| Cellular connectivity | — | — | — | — | 0.60 | — | — |
| Notification delivery | — | — | — | — | 0.85 | — | — |
| Customer support | 6.00 | 6.00 | 3.00 | 3.00 | 2.00 | 24.00 | 24.00 |
| Returns / withdrawal | 2.45 | 3.69 | 1.22 | 2.21 | 2.94 | — | — |
| **Known direct cost** | **10.43** | **12.42** | **5.45** | **7.04** | **13.05** | **37.08** | **42.48** |
| Conditional headroom | 71.39 | 110.72 | 35.05 | 66.51 | 85.13 | 550.92 | 905.52 |
| Classification | `LICENSING_BLOCKED` | `LICENSING_BLOCKED` | `LICENSING_BLOCKED` | `LICENSING_BLOCKED` | `COST_MODEL_INCOMPLETE` | `COST_MODEL_INCOMPLETE` | `COST_MODEL_INCOMPLETE` |

Every figure **excludes the unknown chart/weather data licence** (`ASM-MC13-049`, `value: null`), and the FLEET figures exclude onboarding, DPA and SLA cost. The conditional headroom is what remains of net revenue after the known direct cost; it is not a margin and not a contribution claim, because the largest cost driver on the NAV and WEATHER products is missing. All seven records are `INCOMPLETE_UNKNOWN_COSTS`: no subscription has a complete cost model. Further recorded and unestimated gaps are `WATCH_PLUS_SERVICE` scope (`WATCH-MONITORING`) and `FLEET_ONBOARDING_DPA_SLA` (both FLEET editions); the MC-12 NAV record also lists map-tile cost as unknown.

## 4. Conditional account economics and subscription break-even status

Net revenue per account-year is the gross hypothesis, reduced by the subscription channel factor `0.94` (§9) and divided by `1.21` where the hypothesis is VAT-inclusive. The `UNIT_CONTRIBUTION_ZERO` threshold would be that net revenue minus the known direct cost, but the register publishes it as `null` wherever a material cost input is missing (`data/break-even-thresholds.json`).

| SKU | Net per period (annual unless stated) | Known direct cost | Threshold value | Status | Missing input |
|---|---|---|---|---|---|
| `NAV-ESSENTIAL` | EUR 76.91 | EUR 10.43 | `null` | `NOT_DETERMINABLE` | chart/weather data licence |
| `NAV-PRO` | EUR 115.75 | EUR 12.42 | `null` | `NOT_DETERMINABLE` | chart/weather data licence |
| `WEATHER-STANDARD` | EUR 38.07 | EUR 5.45 | `null` | `NOT_DETERMINABLE` | chart/weather data licence |
| `WEATHER-PRO` | EUR 69.14 | EUR 7.04 | `null` | `NOT_DETERMINABLE` | chart/weather data licence |
| `WATCH-MONITORING` | EUR 92.29 | EUR 13.05 | EUR 79.24 | `CONDITIONAL_HYPOTHETICAL_THRESHOLD` | none declared |
| `FLEET-START` | EUR 49.00/mo | EUR 3.09/mo | EUR 45.91/vessel-month | `CONDITIONAL_HYPOTHETICAL_THRESHOLD` | onboarding/DPA/SLA, telemetry above driver |
| `FLEET-BUSINESS` | EUR 79.00/mo | EUR 3.54/mo | EUR 75.46/vessel-month (derived) | not in the threshold register | onboarding/DPA/SLA |

`BE-BASE-SUBSCRIBERS` — operating break-even expressed as a number of paying subscriptions — is `NOT_DETERMINABLE` with `value: null`, because a subscriber count cannot be derived while the data-licence cost is unknown and mix, churn and renewal are unvalidated. Reporting it as a number would be an invented figure.

The distinction is deliberate and must not be collapsed. **NAV and WEATHER account contribution and break-even are `NOT_DETERMINABLE`, and the threshold value itself is `null`**: the missing data licence is material and could exceed the whole pre-licence headroom (EUR 71.39 / 110.72 for NAV and EUR 35.05 / 66.51 for WEATHER per account-year), so no subscription break-even number may be published for these products (`V-20`). WATCH and FLEET are only `CONDITIONAL_HYPOTHETICAL_THRESHOLD`: no material *cost* input is missing, but demand, churn, renewal and channel terms are illustrative and no contract exists. No subscription figure is `VERIFIED`.

## 5. Shared NAV/WEATHER entitlement ledger

`data/recurring-revenue.json#sharedEntitlements` declares `ENT-NAV-WEATHER`: `NAV-ESSENTIAL`, `NAV-PRO`, `WEATHER-STANDARD` and `WEATHER-PRO` share one `CHART_WEATHER_DATA_LICENCE` entitlement with `doubleBillingAllowed: false`, `doubleCostingAllowed: false` and shared cost driver `ASM-MC13-049`. The WEATHER product contract agrees (`navDoubleBillingAllowed: false`, `oneAccount: true`, `oneEntitlementLedger: true`).

Two rules follow and both are implemented: **billed once** — a customer holding NAV and WEATHER pays one data entitlement even though the SKUs carry separate prices; and **costed once** — the engine computes the licensed-account ledger as `max(NAV active, WEATHER active)` per month, never the sum, and applies any hypothetical licence unit cost to that max only. In the `RESTRICTED_CURRENT` case the ledger is empty because no account can be authorized.

| Scenario | NAV account-months | WEATHER account-months | Sum | Ledger (`max`) | Account-months avoided |
|---|---|---|---|---|---|
| `DOWNSIDE` | 7 851 | 2 636 | 10 487 | 7 851 | 2 636 (25.13 %) |
| `BASE_HYPOTHETICAL` | 117 329 | 46 229 | 163 558 | 117 347 | 46 211 (28.25 %) |
| `UPSIDE_HYPOTHETICAL` | 408 202 | 153 286 | 561 488 | 408 202 | 153 286 (27.30 %) |

The `BASE_HYPOTHETICAL` ledger slightly exceeds the NAV total because WEATHER clears one month earlier (M12 against M13), so WEATHER alone is active in the first month; that is correct `max` behaviour, not a double count. The avoided account-months measure the double-costing error the ledger prevents: roughly a quarter of the combined NAV+WEATHER account base, at a unit price that remains `UNKNOWN`.

## 6. Recurring revenue by SKU and cohort behaviour

Cumulative net revenue per subscription SKU from `monthly-financial-model.json#scenarios[*].supporting.subscriptionRevenueNetBySku`; FLEET revenue is the vessel balance valued at EUR 49.00 per vessel-month because it is not stored in that array.

| SKU | `DOWNSIDE` M12 / M36 / M60 | `BASE_HYPOTHETICAL` M12 / M36 / M60 | `UPSIDE_HYPOTHETICAL` M12 / M36 / M60 |
|---|---|---|---|
| `NAV-ESSENTIAL` | 0.00 / 2 922.58 / 30 623.36 | 0.00 / 125 349.25 / 470 069.47 | 1 563.96 / 467 736.17 / 1 635 895.75 |
| `NAV-PRO` | 0.00 / 2 729.93 / 29 642.58 | 0.00 / 113 216.19 / 424 281.23 | 1 398.82 / 422 467.01 / 1 475 415.72 |
| `WEATHER-STANDARD` | 0.00 / 520.74 / 5 466.53 | 0.00 / 27 106.99 / 97 707.37 | 307.80 / 92 285.66 / 322 408.15 |
| `WEATHER-PRO` | 0.00 / 524.52 / 5 260.84 | 0.00 / 24 614.82 / 88 893.10 | 276.58 / 84 657.18 / 297 592.76 |
| `WATCH-MONITORING` | 0.00 / 2 768.86 / 10 982.78 | 661.60 / 44 215.83 / 136 569.38 | 3 161.09 / 140 229.28 / 442 459.55 |
| `FLEET-START` | 0.00 / 20 384.00 / 70 805.00 | 6 566.00 / 182 084.00 / 542 185.00 | 22 981.00 / 530 915.00 / 1 620 430.00 |
| `FLEET-BUSINESS` | 0.00 / 0.00 / 0.00 | 0.00 / 0.00 / 0.00 | 0.00 / 0.00 / 0.00 |

`NAV-ESSENTIAL` carries the largest account count, but `FLEET-START` produces the largest single subscription line in `BASE_HYPOTHETICAL` from the smallest account base — a direct consequence of a per-vessel price (EUR 588 per vessel-year) against per-account prices of EUR 49–149 per year. That contrast is an artefact of the unapproved price hypotheses and the illustrative demand profiles, not a portfolio conclusion.

Cohort behaviour behind those totals (annual SKUs only; FLEET is a churned monthly balance):

| Scenario | New annual accounts to M60 | Renewals at M36 | Renewals at M60 | Active annual accounts M60 | FLEET vessels M60 |
|---|---|---|---|---|---|
| `DOWNSIDE` | 1 260 | 8 | 393 | 564 | 50 |
| `BASE_HYPOTHETICAL` | 18 211 | 1 596 | 8 790 | 6 606 | 366 |
| `UPSIDE_HYPOTHETICAL` | 62 100 | 6 750 | 33 632 | 22 595 | 1 134 |

Renewals are a large share of late-period activations in `BASE_HYPOTHETICAL` (8 790 renewals against 18 211 cumulative new accounts) and the first renewal in that scenario cannot occur before M21 (WATCH, gate M08) or M26 (NAV, gate M13). Every renewal figure inherits the invented 0.55 / 0.75 / 0.85 renewal rates and has no measured churn behind it.

## 7. WATCH monitoring

WATCH monitoring is EUR 9.90 per month hypothesis — EUR 118.80 annual equivalent, VAT-inclusive consumer hypothesis, `HYPOTHESIS_UNAPPROVED`. Its known direct cost is EUR 13.05 per device-year (cellular 0.60, cloud/telemetry 1.86, notifications 0.85, payment 4.80, support 2.00, returns 2.94), leaving EUR 85.13 of conditional headroom per device-year before certification and before any connectivity contract: the highest conditional consumer service headroom in the portfolio, and still `COST_MODEL_INCOMPLETE`.

**WATCH monitoring never gates local safety.** `gatesLocalSafety: false` on the record (`V-06`) and the product contract states `STEERING_NOT_GATED`, `LOCAL_SENSING_NOT_GATED`, `LOCAL_ALARMS_NOT_GATED` and `PAYMENT_FAILURE_NEVER_DISABLES_LOCAL_FUNCTIONS`: subscription expiry or failed payment may remove the remote commercial entitlement; it may never disable local measurement, local alarms or any safety-relevant function. This is a specification requirement, not tested behaviour.

No service level is claimed: `instantAlertGuarantee: false`, `distressServiceCertified: false`, `notificationPipelineState: NOT_FOUND`, `connectivityContractState: NOT_FOUND`, `connectivityDependent: true`. The subscription pays for connectivity, cloud, notification and retention; it does not promise alert delivery and must never be described as a distress or rescue service. Modelled volume is 8 / 20 / 32 mature monthly accounts and 56 / 592 / 1 986 active accounts at M60 for `DOWNSIDE` / `BASE_HYPOTHETICAL` / `UPSIDE_HYPOTHETICAL`.

## 8. FLEET — hardware-free per-vessel SaaS

FLEET is `SOFTWARE` charged per vessel-month. `hardwareByDefault: false` in the revenue-drivers bundle record and in the product contract (`FLEET_DEFAULT_HARDWARE = false`, `hardwareIncludedByDefault` false): FLEET adds **no hardware**, no hardware revenue and no hardware cost (`V-05`). Onboarding is a separately quoted service and is not modelled.

No SLA and no contract exist: `slaEstablished: false`, `multiTenantProductionService: false`, `crossTenantAccessAllowed: false`, `remoteSteeringAllowed: false`, `securityCertificationClaimed: false`, `tenancy.slaState: NO_SLA_ESTABLISHED`, `customerProductionDataUsed: false`. FLEET is a hypothesis about a service nobody has bought and must not be presented as an operating SaaS product. Prices are `FLEET-START` EUR 49.00 and `FLEET-BUSINESS` EUR 79.00 per vessel-month, `VAT_EXCLUDED_B2B`; `FLEET-ENTERPRISE` is `NOT_ESTABLISHED`. Known direct cost is EUR 37.08 (`START`) and EUR 42.48 (`BUSINESS`) per vessel-year — cloud tenancy 1.20, support 24.00, payment 11.88 / 17.28 — with cloud contract, onboarding, telemetry volume above the declared driver, DPA and SLA excluded and unknown. Conditional headroom is EUR 550.92 / EUR 905.52 per vessel-year (EUR 45.91 / EUR 75.46 per vessel-month), `COST_MODEL_INCOMPLETE` and `CONDITIONAL_HYPOTHETICAL_THRESHOLD`: the largest conditional software headroom in the portfolio and the least evidenced demand in it.

Only `FLEET-START` has a demand profile. Vessel balances at M60 are 50 / 366 / 1 134 with cumulative net revenue EUR 70 805.00 / EUR 542 185.00 / EUR 1 620 430.00 for `DOWNSIDE` / `BASE_HYPOTHETICAL` / `UPSIDE_HYPOTHETICAL`; the balance churns monthly at the scenario `monthlyChurnRate`. `FLEET-BUSINESS` has no demand profile in any scenario and produces no revenue.

## 9. Payment processing and app-store commission

Card processing is 1.5 % of the transaction plus EUR 0.25 fixed (`ASM-MC13-004`, `PUBLISHED_TARIFF`; `ASM-MC13-005`): the published EEA card rate, not a negotiated merchant rate. The percentage applies to gross VAT-inclusive card receipts — hardware gross invoiced plus the direct (non-app-store) share of subscription cash — and the fixed fee applies per transaction (`A-07`). The app-store rate is 30 % (`ASM-MC13-006`, `PUBLISHED_TARIFF`) on the 20 % app-store subscription share; it is embedded in the subscription channel factor `0.94` as a revenue reduction rather than booked as a separate cost line, and the app-store share is excluded from the card-fee base because the store commission covers its own transaction (`paymentProcessing.notes`).

| Scenario | Card fees M60 | of which percentage | of which fixed | Transactions | App-store revenue forgone M60 (derived) |
|---|---|---|---|---|---|
| `DOWNSIDE` | EUR 6 922.08 | EUR 6 369.33 | EUR 552.75 | 2 211 | EUR 12 553.52 |
| `BASE_HYPOTHETICAL` | EUR 65 353.40 | EUR 59 008.65 | EUR 6 344.75 | 25 379 | EUR 147 967.81 |
| `UPSIDE_HYPOTHETICAL` | EUR 194 072.07 | EUR 173 862.32 | EUR 20 209.75 | 80 839 | EUR 491 442.88 |

The app-store column is derived as 6 % of pre-channel subscription gross cash (20 % share × 30 % commission), not a declared field. Two observations follow: the fixed EUR 0.25 dominates a EUR 9.90 monthly WATCH charge — EUR 3.00 of the EUR 4.80 annual payment cost is the fixed fee — which is why annual prepayment is economically attractive but commercially undecided; and a 30 % store commission is the largest known deduction on the subscription line.

## 10. Inactive accounts, retained cost and deferred revenue

`inactiveAccountPolicy` sets `telemetryCostAssumedZero: true`, `retainedIdentityAndStorageCost: true` and `retainedCostFactor: 0.2` (`ASM-MC13-037`, `SCENARIO_ASSUMPTION`). **No provider has confirmed that a suspended SIM or a dormant account is free**, so the model charges an inactive device 20 % of the cloud cost per device-month with zero telemetry, and retains account and storage cost on the subscription side. `ASM-MC13-038` (2 % device attrition per year) produces the inactive-device stock: devices in field decay while cumulative units sold do not. At `BASE_HYPOTHETICAL` M60 the retained inactive-device cost is EUR 136.38 against EUR 29 611.58 of active device cost — small in absolute terms only because the cloud tariff is EUR 0.155 per device-month; the policy, not the amount, matters, and churned or dormant units are never silently free (`R-03`).

`billingModels` declares two treatments: `BILL-ANNUAL` (NAV, WEATHER, WATCH) collected at the start of the paid year and recognised straight-line over 12 months with deferred revenue for the unearned part (`A-08`); and `BILL-MONTHLY` (FLEET) collected and recognised in the month billed. `deferredRevenuePolicy` fixes `STRAIGHT_LINE_12_MONTHS` through `ASM-MC13-159` ("Annual subscription revenue recognition method", 12 months, `SCENARIO_ASSUMPTION`, confidence `NONE`) and `refundOnChurnPct: 0`: no refund-on-churn right is assumed anywhere, a scenario assumption rather than a contract term. Recognised revenue therefore trails cash by up to eleven months on an annual line.

| Scenario | Subscription net revenue M12 / M36 / M60 | Deferred M12 / M36 / M60 | Active accounts M12 / M36 / M60 |
|---|---|---|---|
| `DOWNSIDE` | EUR 0.00 / 29 850.63 / 152 781.09 | 0.00 / 11 376.24 / 22 045.70 | 0 / 237 / 564 |
| `BASE_HYPOTHETICAL` | EUR 7 227.60 / 516 587.08 / 1 759 705.55 | 3 306.91 / 158 760.78 / 250 229.29 | 43 / 4 011 / 6 606 |
| `UPSIDE_HYPOTHETICAL` | EUR 29 689.25 / 1 738 290.30 / 5 794 201.93 | 40 940.41 / 510 202.04 / 850 064.04 | 571 / 13 272 / 22 595 |
| `RESTRICTED_CURRENT` | EUR 0.00 / 0.00 / 0.00 | `UNKNOWN` | 0 / 0 / 0 |

Active accounts exclude FLEET vessels, which are a separate vessel balance (§8). Annual versus monthly billing at M60 is EUR 81 976.09 / 1 217 520.55 / 4 173 771.93 annual-billed against EUR 70 805.00 / 542 185.00 / 1 620 430.00 FLEET monthly-billed — 69.19 % / 30.81 %, 53.66 % / 46.34 % and 72.03 % / 27.97 % of recurring revenue. The recurring share of total net revenue reaches 24.70 % / 41.62 % (`DOWNSIDE`), 37.54 % / 51.35 % (`BASE_HYPOTHETICAL`) and 43.15 % / 57.10 % (`UPSIDE_HYPOTHETICAL`) at M36 / M60; full revenue tables are in D05 §11.

## 11. What is not determinable and why

- **NAV and WEATHER account contribution, unit break-even and subscriber break-even: `NOT_DETERMINABLE` with `value: null`.** The chart/weather data licence is a per-account variable cost that is `UNKNOWN` (`ASM-MC13-049`; rights `NOT_GRANTED`, no price). It could exceed the pre-licence headroom of EUR 71.39–110.72 (NAV) and EUR 35.05–66.51 (WEATHER) per account-year. No subscription break-even number or claim may be published for these products (`V-20`).
- **Portfolio subscriber break-even: `NOT_DETERMINABLE`** for the same reason plus unvalidated mix, churn and renewal (`BE-BASE-SUBSCRIBERS`, `value: null`). Of the 70 declared thresholds, 14 are `NOT_DETERMINABLE` and none is `VERIFIED`; no subscription threshold is among the verified set.
- **WATCH monitoring and FLEET per-vessel contribution: `CONDITIONAL_HYPOTHETICAL_THRESHOLD` only** — the known cost is complete enough to state a conditional threshold, but demand, churn, renewal and channel terms are illustrative.
- **Churn, renewal, activation, CAC and willingness to pay: not measured.** `ASM-MC13-050`, `-051` and `-052` exist to mark them `UNKNOWN` with `value: null`; the cohort rates that run the model are invented illustration.
- **ARR multiple, LTV or payback: not produced and not producible.** Without CAC, validated churn or an approved price, any such figure would be fabricated.

Recurring revenue does not by itself fix the cash position. In the final dataset the whole-portfolio conditional contribution at `BASE_HYPOTHETICAL` M60 is EUR 1 688 226.86 with cumulative cash -EUR 415 478.92 and a financing requirement of EUR 987 326.73; `DOWNSIDE` is worse on both (contribution EUR 150 666.06, cumulative cash -EUR 3 075 765.77, financing EUR 3 075 765.77) and only `UPSIDE_HYPOTHETICAL` reaches positive cumulative cash (EUR 5 440 764.18 at M60). Conditional break-even months from `scenario-results.json`: `BASE_HYPOTHETICAL` operating M39 and cash-flow M23 with no cumulative cash recovery inside the horizon; `UPSIDE_HYPOTHETICAL` M15 / M11 / M23; `DOWNSIDE` reaches none. Those are D04/D12 scope figures, repeated only to prevent reading the recurring line as self-funding: the subscription book is positive on known variable contribution long before the company is cash-positive, and in `DOWNSIDE` the company never becomes cash-positive inside 60 months.

## 12. Evidence actions that would change the status

The subscription model is blocked on evidence, not on arithmetic. In dependency order:

1. **Chart/weather data licence terms** — territory, caching, per-account and redistribution pricing. This single input converts NAV and WEATHER from `NOT_DETERMINABLE` to a determinable conditional contribution; nothing else can.
2. **Validated churn, renewal and activation** from a real cohort (`ASM-MC13-051`). Without it the cohort rates in `cohortAssumptions` remain illustrative and every recurring total above is a scenario, not a planning number.
3. **A connectivity/cloud contract with DPA and a fair-use limit** — the WATCH and FLEET cost gap, and the precondition for any statement about inactive-account cost being non-zero.
4. **A channel decision** — direct, distributor or app store — which fixes whether the 30 % app-store commission and the 1.5 % + EUR 0.25 card tariff are the right deductions.
5. **Validated willingness to pay** (`ASM-MC13-052`) before any of the nine hypotheses could move toward `HYPOTHESIS_UNAPPROVED → approvable`. No price may be approved on this evidence base.

## 13. Non-claims and reported inconsistencies

No subscription amount is an offer, a price approval or a billing configuration: `billingImplemented: false` and every price status is `HYPOTHESIS_UNAPPROVED`, `NOT_ESTABLISHED` or `NOT_FOR_SALE`. WATCH is never a rescue or guarantee service; FLEET has no SLA. `reviewStatus` is `PENDING_INDEPENDENT_REVIEW`. The `ASM-MC13-038` mis-reference found while drafting is closed: `deferredRevenuePolicy` now cites `ASM-MC13-159` (§10). The following defects are reported to the Lead; none is edited outside this document.

1. **`demandProfiles` schema gap (resolved in the contract).** Contract §4.4 now names both `matureMonthlyUnits` (hardware) and `matureMonthlyAccounts` (subscriptions); the dataset was already internally consistent.
2. **WATCH is an annual SKU with a monthly hypothesis.** `grossAmountEur` is 118.80 with `period: YEAR`, derived from EUR 9.90 per month; consistent, but the JSON carries no conversion note.
3. **Refund treatment differs by revenue type.** The 3 % allowance (`ASM-MC13-003`) is hardware-only in the monthly model, while the MC-12 subscription costs already contain a returns component. No double deduction occurs, but the contract's refund identity is effectively hardware-scoped.
4. **App-store commission has two representations.** It is a revenue deduction inside the channel factor and also an `INCOMPLETE_UNKNOWN_COSTS` category in the MC-12 NAV/WEATHER records; the modelled treatment is the channel factor.
5. **Figures reflect the final data snapshot.** The dataset was regenerated twice during drafting (collection aliasing, input VAT from receipts, safety stock, obsolescence write-off, then an inventory-planning and effective-override fix). Every subscription total, payment-fee derivation and app-store figure here was re-read from the current `data/` files; subscription revenue, the hardware/recurring split, per-SKU lines and deferred balances are unchanged, while contribution, cash-flow and financing moved. The register publishes `null` instead of a numeric NAV/WEATHER subscription threshold, and this document follows that. The builder and validator scripts are committed in the implementation commit and are the executable gate.
