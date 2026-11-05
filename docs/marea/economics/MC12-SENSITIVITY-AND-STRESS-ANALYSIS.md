# MC-12 D11 — Sensitivity and stress analysis

Status: `INTERNAL_ECONOMICS_ANALYSIS`. Milestone MC-12. Date: 2026-11-02. Owner: `commercial-finance-pricing-strategist`.

| Field | Value |
|---|---|
| Deliverable | D11 `MC12-SENSITIVITY-AND-STRESS-ANALYSIS.md` — pre-registered levers, stress grid and break-even bounds |
| Machine companion | [sensitivity-scenarios.json](data/sensitivity-scenarios.json); data contract [MC12-DATA-CONTRACT.md](data/MC12-DATA-CONTRACT.md) |
| Inputs | [unit-economics.json](data/unit-economics.json), [bundle-economics.json](data/bundle-economics.json), [assumptions.json](data/assumptions.json), [manifest.json](data/manifest.json), [licensing-rights.json](data/licensing-rights.json), [hardware-cost-reconciliation.json](data/hardware-cost-reconciliation.json) |
| Scope | 70 registered scenarios, 4 stress cases, 12 levers (all 11 contract-registered plus `INSTALLER_MARGIN`); every result conditional |
| Commercial availability | `NOT_FOR_SALE`; `PRICE_APPROVED = NONE`; `CUSTOMER_EVIDENCE = NONE` |
| Profitability / forecast | `profitability = NONE`; `forecastProduced = false`; `breakEvenClaim = false` |
| Currency | EUR; hardware per unit at 100-unit BASE, subscriptions per account-year |

## 1. Method

Every result here is a conditional contribution: *net revenue ex-VAT minus known variable cost,
before fixed operating costs* (ASM-MC12-018). Each scenario applies one declared operation to one base
record: `MULTIPLY_COST` (variable cost × factor), `DEDUCT_REVENUE_PCT` (net revenue − percentage),
`ADD_COST` (variable cost + amount) or `MULTIPLY_REVENUE_PCT` (net revenue × factor). Results are not
additive across levers; the combined cases in section 3 are computed separately. All 70 stored
results reproduce from the base record and declared operation within ±EUR 0.005 (A-07).

The levers are pre-registered in [MC12-DATA-CONTRACT.md](data/MC12-DATA-CONTRACT.md) §4.10, which
lists eleven: `HARDWARE_COST_INCREASE`, `YIELD_LOSS`, `FX_MOVEMENT`, `CLOUD_USAGE`,
`CELLULAR_OVERAGE`, `DATA_LICENCE_COST`, `RETURNS_WARRANTY`, `PAYMENT_PROCESSING`,
`DISTRIBUTOR_MARGIN`, `SUPPORT_COST`, `SUBSCRIPTION_ACTIVATION_RETENTION`. All eleven are now
exercised. The file additionally uses `INSTALLER_MARGIN`, which the contract list omits — a remaining
documentation mismatch, not an economic error.

Rounding and tolerance follow the contract: money 2 decimals half-up, percentages 1 decimal,
recomputation tolerance ±EUR 0.005 (U-04, U-05, U-09, A-14). Fixed costs — tooling/NRE, engineering
NRE, certification, insurance, security maintenance — are excluded from every contribution here. Where
a record carries a material unknown cost, no contribution percentage is published (V-17), so no
`contributionPct` is quoted either. A positive contribution is not profit, and no scenario is a
forecast, a break-even claim or an approved price.

## 2. Lever table

**Basis:** EUR contribution before unknowns, per unit at 100-unit BASE (hardware) or per account-year
(subscriptions); range across all stored results for the lever.

| Lever | Scenarios | Factor / operation | Base records | Result range | Sign changes |
|---|---:|---|---|---:|---|
| `RETURNS_WARRANTY` | 5 | −3 % of net revenue | five hardware 100 BASE | −81.73 to 257.04 | HUB 7.30 → −1.35; SENSE and AIS negative |
| `PAYMENT_PROCESSING` | 5 | card fee added | five hardware 100 BASE | −79.55 to 263.63 | HUB 7.30 → 1.81; SENSE and AIS negative |
| `SUPPORT_COST` | 5 | +EUR 4 per device-year | five hardware 100 BASE | −79.56 to 270.37 | HUB 7.30 → 3.30; SENSE and AIS negative |
| `HARDWARE_COST_INCREASE` | 5 | cost × 1.20 | five hardware 100 BASE | −131.83 to 213.71 | HUB 7.30 → −48.93; SENSE and AIS negative |
| `YIELD_LOSS` | 5 | cost × 1.02 | five hardware 100 BASE | −81.19 to 268.30 | HUB stays positive at 1.68 |
| `FX_MOVEMENT` | 5 | cost × 1.05 | five hardware 100 BASE | −89.63 to 259.20 | HUB 7.30 → −6.76; SENSE and AIS negative |
| `DISTRIBUTOR_MARGIN` | 12 | −35 % hardware, −30 % channel | five hardware + seven subscription records | −147.59 to 621.12 | hardware except DISPLAY negative; subscriptions positive |
| `INSTALLER_MARGIN` | 5 | −15 % | five hardware 100 BASE | −106.43 to 187.72 | HUB, SENSE and AIS negative |
| `CLOUD_USAGE` | 1 | cloud doubled | WATCH Monitoring | 83.27 | WATCH positive |
| `CELLULAR_OVERAGE` | 1 | cellular +50 % | WATCH Monitoring | 84.83 | WATCH positive |
| `DATA_LICENCE_COST` | 14 | +EUR 6 / +EUR 24 per account-year | seven subscription records | 11.05 to 899.52 | none negative |
| `SUBSCRIPTION_ACTIVATION_RETENTION` | 7 | revenue × 0.70 | seven subscription records | 22.90 to 621.12 | none negative |

The FX lever sits on a BOM already converted at the inherited rate (ASM-MC12-015, about 3.9 % above
the observed ASM-MC12-021 rate); the yield lever is additional to the 1 % yield allowance already in
the BASE cost (COST-14, ASM-006).

## 3. Per-SKU stress grid at 100-unit BASE

**Basis:** EUR contribution per unit, self-install. +20 % = known variable cost × 1.20; +35 %
distributor = net revenue − 35 %; combined = both. DISPLAY's combined cell is registered `STRESS-04`;
other combined cells and the HUB-PRO row are recomputed arithmetic, not registered scenarios.

| SKU | Base | +20 % cost | +35 % distributor | Combined | Verdict |
|---|---:|---:|---:|---:|---|
| HUB-STANDARD | 7.30 | −48.93 | −93.65 | −149.88 | positive only at BASE |
| HUB-PRO | 131.27 | 75.04 | −13.07 | −69.30 | positive at base and cost stress |
| WATCH-CORE | 56.21 | 18.03 | −30.28 | −68.46 | positive at base and cost stress |
| SENSE-MODULE | −6.45 | −24.10 | −35.09 | −52.74 | negative throughout |
| DISPLAY-7 | 274.37 | 213.71 | 72.18 | 11.51 | positive throughout |
| AIS-RECEIVER | −75.56 | −131.83 | −147.59 | −203.86 | negative throughout |

Two observations. First, the thin SKUs are fragile: HUB's EUR 7.30 turns negative under the 3 % returns
deduction (−1.35) and the +5 % FX stress (−6.76), and the card fee leaves only EUR 1.81. Second, the
distributor deduction dominates the hardware levers — it is larger than the +20 % cost increase for every
SKU and alone turns WATCH from EUR 56.21 positive to EUR −30.28. Only DISPLAY survives both levers at once.

## 4. Registered stress cases

**Basis:** exactly as stored in `stressCases[]`; EUR contribution before unknowns.

| ID | Case | Base record | Contribution | Status | Reading |
|---|---|---|---:|---|---|
| STRESS-01 | AIS under +20 % cost | `UE-AIS-AIS-RECEIVER-100-BASE` | −131.83 | `NEGATIVE` | Below its own break-even before any stress (−75.56); the stress deepens the loss |
| STRESS-02 | PROTECT bundle at its historical price | `BE-PROTECT` | −50.74 | `NEGATIVE` | Known variable cost EUR 380.49 exceeds net revenue EUR 329.75 before connectivity and certification |
| STRESS-03 | NAV Essential with a EUR 24 chart licence | `UE-NAV-NAV-ESSENTIAL-ANNUAL` | 47.39 | `POSITIVE_CONDITIONAL` | Shows the data-licence ceiling; the licence right itself remains `NOT_GRANTED` |
| STRESS-04 | DISPLAY under +20 % cost and 35 % distributor deduction | `UE-DISPLAY-DISPLAY-7-100-BASE` | 11.51 | `POSITIVE_CONDITIONAL` | The only hardware configuration that remains positive under the combined stress |

STRESS-01 and STRESS-02 are negative under their own base assumptions, not only under stress: AIS
costs EUR 281.35 against EUR 205.79 of net revenue, and PROTECT's known variable cost of EUR 380.49
(including the WATCH monitoring returns line) exceeds its EUR 329.75 net revenue by EUR 50.74 before
connectivity and certification. STRESS-03 and STRESS-04 are conditional positives, not approvals:
STRESS-03 assumes a licence price that does not exist and STRESS-04 survives by EUR 11.51.

## 5. Break-even gross price at 100 units

**Basis:** EUR VAT-inclusive gross price at 100-unit BASE at which net revenue equals known variable
cost, from `breakEvenGrossPriceEur`; position is the current hypothesis minus this price. These are not
approved prices; they exclude all fixed costs, so the true break-even is higher by an unquantified amount.

| SKU | Break-even gross | Current hypothesis | Position |
|---|---:|---:|---:|
| HUB-STANDARD | 340.17 | 349.00 | +8.83 above |
| HUB-PRO | 340.17 | 499.00 | +158.83 above |
| WATCH-CORE | 230.99 | 299.00 | +68.01 above (floor: connectivity, cloud and notification costs are unknown) |
| SENSE-MODULE | 106.81 | 99.00 | 7.81 below |
| DISPLAY-7 | 367.02 | 699.00 | +331.98 above |
| AIS-RECEIVER | 340.43 | 249.00 | 91.43 below |
| AIS-CONNECTED / PILOT | `null` | 399.00 / none | not computable: no cost model / no known cost |

HUB is only EUR 8.83 above its break-even gross price, which is why a small cost or channel movement
erases its contribution (EUR 7.30 = 8.83 ÷ 1.21). AIS would need a gross price of EUR 340.43, 36.7 %
above the EUR 249 hypothesis; SENSE would need EUR 106.81, 7.9 % above its EUR 99 symbolic figure.
Under the 35 % distributor hypothesis the break-even gross rises by 1/0.65: HUB 523.34, WATCH 355.37,
SENSE 164.32, DISPLAY 564.65, AIS 523.74 (recomputed arithmetic, not dataset fields). A break-even price
is a floor for a pricing discussion, not an approved price and not a target.

## 6. Subscription sensitivity

**Basis:** EUR contribution per account-year. `+EUR 6` and `+EUR 24` are hypothetical chart/weather
data-licence costs added to known variable cost; `30 %` is a channel deduction on net revenue (app store
for NAV/WEATHER, retail/distribution hypothesis for WATCH/FLEET); `70 % renewal` multiplies revenue by
0.70. All 28 cells are registered results.

| Subscription | Base | +EUR 6 licence | +EUR 24 licence | 30 % channel | 70 % renewal | Survives each single lever |
|---|---:|---:|---:|---:|---:|---|
| NAV Essential | 71.39 | 65.39 | 47.39 | 46.84 | 46.84 | yes |
| NAV Pro | 110.72 | 104.72 | 86.72 | 73.78 | 73.78 | yes |
| WEATHER Standard | 35.05 | 29.05 | 11.05 | 22.90 | 22.90 | yes (thinnest) |
| WEATHER Pro | 66.51 | 60.51 | 42.51 | 44.44 | 44.44 | yes |
| WATCH Monitoring | 85.13 | 79.13 | 61.13 | 55.68 | 55.68 | yes |
| FLEET Start | 550.92 | 544.92 | 526.92 | 374.52 | 374.52 | yes |
| FLEET Business | 905.52 | 899.52 | 881.52 | 621.12 | 621.12 | yes |

All 28 registered subscription results are positive, so no single registered lever makes a
subscription negative. The thinnest is WEATHER Standard at EUR 11.05 under a EUR 24 licence, then
EUR 22.90 at 30 %. A combined EUR 24 licence plus 30 % deduction is not registered but recomputes to
EUR −1.10 for WEATHER Standard (40.50 × 0.70 = 28.35, less 5.45 and 24.00) — the only subscription
combination that crosses zero. WATCH Monitoring starts at EUR 85.13 and FLEET Business is now testable.

## 7. Data-licence headroom

**Basis:** EUR per account-year. Headroom is `netRevenueEur − knownVariableCostEur`, the maximum
combined chart/weather/tile allowance before contribution reaches zero; it is not a licence price.

**NAV Essential: EUR 71.39** (EUR 65.39 remaining at a EUR 6 licence, EUR 47.39 at EUR 24). **NAV Pro:
EUR 110.72** (EUR 104.72 at EUR 6, EUR 86.72 at EUR 24). The EUR 6 and EUR 24 figures are hypothetical
and were never observed; no chart or weather licence price exists. The headroom is a bound: NAV
Essential can absorb at most EUR 71.39 per account-year across chart, weather and map-tile rights
combined, and NAV Pro EUR 110.72, before its contribution is zero. The rights remain blocked —
`LR-CHART-001` (`BLK-LIC-01`), `LR-WEATHER-001` (`BLK-LIC-03`) and `LR-MAP-001` (`BLK-LIC-07`) in
[licensing-rights.json](data/licensing-rights.json), all `NOT_GRANTED`/`REQUIRES_CONTRACT`; because the
true price is `UNKNOWN`, the headroom bounds the problem but cannot confirm a licensed NAV is viable.

## 8. What would falsify each conclusion

**Basis:** logical falsifiers and the external evidence each would require; no falsifier is evidenced
in MC-12, where no quotation or contract was obtained.

| Conclusion | What would falsify it | Evidence required |
|---|---|---|
| Only card processing is an evidenced channel cost (D09) | A merchant or partner contract showing a different rate | Signed payment contract or negotiated rate schedule |
| No channel is economically validated | Negotiated installer or distributor terms under which a SKU stays positive at its hypothesis price | Signed installer and distributor terms |
| DISPLAY is the only hardware positive under combined stress | A distributor deduction above 37.0 % at +20 % cost, or a cost increase above 23.8 % at 35 % (recomputed thresholds) | Distributor term sheet; supplier quotation |
| AIS and PROTECT are negative under their own base assumptions | A cost reduction or price rise sufficient to close the gap: AIS +36.7 % gross, PROTECT +14.5 % gross (arithmetic, before connectivity and certification) | Supplier quotations; product liability and certification quotations |
| No scenario establishes profitability | A full cost model including fixed costs, financing and validated demand, none of which any lever in this file addresses | Cost quotations, customer willingness-to-pay evidence |
| Subscription results stay positive under each single lever | A combined licence-plus-deduction test (WEATHER Standard −1.10) or a real licence price above the EUR 71.39 / EUR 110.72 headroom | Executed data-licence contract |

## 9. Conclusion

**No scenario establishes profitability.** The 70 registered scenarios and 4 stress cases are
conditional contribution arithmetic; they exclude fixed costs, financing and demand, and the manifest
records `profitability = NONE` with no forecast and no break-even claim. **DISPLAY is the only hardware
configuration that stays positive under the combined stress** (EUR 11.51 per unit at 100 units), and it
does so only because its EUR 699 hypothesis sits EUR 331.98 above its EUR 367.02 break-even gross price.
**AIS (EUR −75.56) and PROTECT (EUR −50.74) are negative under their own base assumptions**, and AIS is
negative at every modelled BASE volume in the hardware reconciliation.

Subscription results are positive under every registered single lever, but the thinnest is EUR 11.05
and the true data-licence price is unknown while the rights are `NOT_GRANTED`; the section 5 break-even
prices are floors, not approved prices. Closing the question requires external evidence — supplier and
certification quotations, a data-licence contract and a distributor term sheet — not another scenario.
