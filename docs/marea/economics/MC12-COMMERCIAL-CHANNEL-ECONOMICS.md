# MC-12 D09 — Commercial channel economics

Status: `INTERNAL_ECONOMICS_ANALYSIS`. Milestone MC-12. Date: 2026-11-02. Owner: `commercial-finance-pricing-strategist`.

| Field | Value |
|---|---|
| Deliverable | D09 `MC12-COMMERCIAL-CHANNEL-ECONOMICS.md` — channel deductions and conditional contribution by channel |
| Machine companion | [channel-economics.json](data/channel-economics.json); data contract [MC12-DATA-CONTRACT.md](data/MC12-DATA-CONTRACT.md) |
| Inputs | [unit-economics.json](data/unit-economics.json), [sensitivity-scenarios.json](data/sensitivity-scenarios.json), [bundle-economics.json](data/bundle-economics.json), [assumptions.json](data/assumptions.json), [manifest.json](data/manifest.json), [blocker-register.json](data/blocker-register.json) |
| Commercial availability | `NOT_FOR_SALE`; `PRICE_APPROVED = NONE`; `CUSTOMER_EVIDENCE = NONE`; `CUSTOMER_WTP_VALIDATED = false` |
| Profitability / forecast | `profitability = NONE`; `forecastProduced = false`; no break-even claim |
| Currency | EUR; net revenue is VAT-exclusive (gross ÷ 1.21 on VAT-inclusive hypotheses, ASM-MC12-001/002) |

## 1. Method and evidence boundary

This analysis applies each declared channel deduction to the stored revenue and reports the resulting
contribution — *net revenue ex-VAT minus known variable cost, before fixed operating costs*
(ASM-MC12-018; method block of [unit-economics.json](data/unit-economics.json)) — not a margin,
EBITDA or net profit.

- **Only card processing is a published channel tariff.** CH-DIRECT is `PUBLISHED_TARIFF_APPLIED` at
  1.5 % + EUR 0.25 per transaction; no merchant contract or negotiated rate exists.
- **Installer (15 %) and distributor (35 %) trade deductions are explicit hypotheses**
  (`HYPOTHESIS_UNAPPROVED`, `ENGINEERING_ASSUMPTION`): no agreement, rate card or measured duration.
- **The app-store channel has a published rate but no agreement** (30 %, 15 % conditional); it also
  constrains pricing flexibility and refund handling.
- **The quotation channel has no rate:** PILOT, SAIL and COMPLETE are survey-priced with `null`
  deduction and `null` fee, so no channel price can be derived.

No partner agreement exists: [manifest.json](data/manifest.json) records `formalQuotations = 0` and
`executedContracts = 0`; `BLK-COMM-02` (MAJOR, OPEN) records that installer and distributor margins
are not established. CAC, churn, renewal and demand are `UNKNOWN` (ASM-MC12-016); no demand figure is used.

Every channel record declares its `revenueBasis`: `GROSS_VAT_INCLUSIVE_TRANSACTION` (CH-DIRECT),
`GROSS_TRANSACTION_VALUE` (CH-APP-STORE), `NET_REVENUE_EX_VAT` (CH-INSTALLER, CH-DISTRIBUTOR) and
`NOT_APPLICABLE` (CH-QUOTATION). Card processing attaches to the VAT-inclusive amount (NAV Essential:
99 × 1.5 % + 0.25 = 1.74; HUB: 349 × 1.5 % + 0.25 = 5.49); trade deductions attach to net revenue
(HUB 35 %: 288.43 − 100.95 − 281.13 = −93.65). Money is 2 decimals half-up, tolerance ±EUR 0.005.

## 2. Channel register

**Basis:** EUR per transaction; the fixed fee is per transaction; `null` means unknown, never zero.

| ID | Channel | Deduction | Fixed fee | Revenue basis | Status | Evidence class | Source | Applies to |
|---|---|---:|---:|---|---|---|---|---|
| CH-DIRECT | `DIRECT_TO_CONSUMER` | 1.5 % | EUR 0.25 | `GROSS_VAT_INCLUSIVE_TRANSACTION` | `PUBLISHED_TARIFF_APPLIED` | `PUBLISHED_PROVIDER_TARIFF` | <https://stripe.com/pricing> | NAV, WEATHER, HUB, AIS, SENSE, WATCH, DISPLAY, FLEET |
| CH-APP-STORE | `APP_STORE` | 30 % / 15 % conditional | EUR 0 | `GROSS_TRANSACTION_VALUE` | `HYPOTHESIS_UNAPPROVED` | `PUBLISHED_PROVIDER_TARIFF` | <https://developer.apple.com/app-store/small-business-program/> | NAV, WEATHER |
| CH-INSTALLER | `PROFESSIONAL_INSTALLER` | 15 % | EUR 0 | `NET_REVENUE_EX_VAT` | `HYPOTHESIS_UNAPPROVED` | `ENGINEERING_ASSUMPTION` | internal assumption | HUB, AIS, SENSE, WATCH, DISPLAY, PILOT |
| CH-DISTRIBUTOR | `DISTRIBUTOR_RETAIL` | 35 % | EUR 0 | `NET_REVENUE_EX_VAT` | `HYPOTHESIS_UNAPPROVED` | `ENGINEERING_ASSUMPTION` | internal assumption | HUB, AIS, SENSE, WATCH, DISPLAY |
| CH-QUOTATION | `QUOTATION_INSTALLATION` | `null` | `null` | `NOT_APPLICABLE` | `QUOTATION_ONLY` | `ENGINEERING_ASSUMPTION` | internal assumption | PILOT, SAIL, COMPLETE |

## 3. Hardware SKUs at 100-unit BASE under each channel

**Basis:** EUR per unit, 100-unit BASE, self-install. Direct is the registered `SEN-*-PAYMENT` result
(card fee added to the base cost); distributor = net revenue − 35 % − cost; installer = net revenue −
15 % − cost. Record IDs: `UE-HUB-HUB-STANDARD-100-BASE`, `UE-HUB-HUB-PRO-100-BASE`,
`UE-WATCH-WATCH-CORE-100-BASE`, `UE-SENSE-MODULE-100-BASE`, `UE-DISPLAY-DISPLAY-7-100-BASE`,
`UE-AIS-AIS-RECEIVER-100-BASE`.

| SKU | Gross hypothesis | Net revenue | Known variable cost | Base contribution | Direct | Distributor | Installer |
|---|---:|---:|---:|---:|---:|---:|---:|
| HUB-STANDARD | 349.00 | 288.43 | 281.13 | 7.30 | 1.81 | −93.65 | −35.96 |
| HUB-PRO | 499.00 | 412.40 | 281.13 | 131.27 | 123.53 | −13.07 | 69.41 |
| WATCH-CORE | 299.00 | 247.11 | 190.90 | 56.21 | 51.48 | −30.28 | 19.14 |
| SENSE-MODULE | 99.00 | 81.82 | 88.27 | −6.45 | −8.19 | −35.09 | −18.72 |
| DISPLAY-7 | 699.00 | 577.69 | 303.32 | 274.37 | 263.63 | 72.18 | 187.72 |
| AIS-RECEIVER | 249.00 | 205.79 | 281.35 | −75.56 | −79.55 | −147.59 | −106.43 |

Worked arithmetic. **HUB:** 288.43 − 5.49 − 281.13 = 1.81 direct; 288.43 − 100.95 − 281.13 = −93.65
distributor; 288.43 − 43.26 − 281.13 = −35.96 installer. **AIS:** 205.79 − 3.99 − 281.35 = −79.55;
the 72.03 distributor deduction leaves −147.59. **DISPLAY:** 577.69 − 10.74 − 303.32 = 263.63; the
202.19 distributor deduction leaves 72.18. **SENSE:** 81.82 − 1.74 − 88.27 = −8.19. **WATCH:**
247.11 − 4.73 − 190.90 = 51.48, and its 86.49 distributor deduction exceeds the whole contribution.

App store is not applicable to hardware (`appliesTo` lists only NAV and WEATHER). HUB-PRO has no
registered payment scenario: the same 1.5 % + EUR 0.25 rule (fee 7.74) applies before its material unknown
incremental lines; AIS-CONNECTED and PILOT are excluded rather than zero-filled (no cost model / no price).

## 4. Subscriptions under each channel

**Basis:** EUR per account-year, first year. Direct equals the record's contribution because the
card-processing line (`SVC-PAYMENT`) is already inside its known variable cost; the 30 % column is
identical in EUR whether taken on net revenue or on gross transaction value at 21 % VAT. Distributor and
installer are not applicable; the 15 % column is the conditional app-store rate (NAV and WEATHER only).

| Subscription | Gross hypothesis | Net revenue | Known variable cost | Direct | 30 % channel deduction | App store 15 % (conditional) |
|---|---:|---:|---:|---:|---:|---:|
| NAV Essential | 99.00 | 81.82 | 10.43 | 71.39 | 46.84 | 59.12 |
| NAV Pro | 149.00 | 123.14 | 12.42 | 110.72 | 73.78 | 92.25 |
| WEATHER Standard | 49.00 | 40.50 | 5.45 | 35.05 | 22.90 | 28.97 |
| WEATHER Pro | 89.00 | 73.55 | 7.04 | 66.51 | 44.44 | 55.48 |
| WATCH Monitoring | 118.80 | 98.18 | 13.05 | 85.13 | 55.68 | n/a |
| FLEET Start | 588.00 | 588.00 | 37.08 | 550.92 | 374.52 | n/a |
| FLEET Business | 948.00 | 948.00 | 42.48 | 905.52 | 621.12 | n/a |

NAV Essential: 81.82 − 10.43 = 71.39 direct; 81.82 − 24.55 − 10.43 = 46.84 at 30 %; 81.82 − 12.27 −
10.43 = 59.12 at 15 %. The 30 % column is registered for every row (`SEN-*-STORE`): NAV and WEATHER
are app-store scenarios, while WATCH and FLEET are labelled a 30 % retail/distribution hypothesis in
the dataset. The 15 % column is arithmetic at the conditional rate, not a registered scenario.

## 5. Transaction economics

**Basis:** EUR per transaction. The percentage fee applies to the VAT-inclusive amount charged, the
fixed fee per transaction; the last column is total processing over VAT-exclusive net revenue. WATCH
Monitoring confirms it: 12 monthly charges of EUR 0.40 = EUR 4.80.

| Transaction | Charged (VAT incl.) | Net revenue | 1.5 % fee | Fixed EUR 0.25 | Total | % of net revenue |
|---|---:|---:|---:|---:|---:|---:|
| One EUR 9.90 monthly subscription payment | 9.90 | 8.18 | 0.15 | 0.25 | 0.40 | 4.9 % |
| WATCH Monitoring annual record, billed monthly | 118.80 | 98.18 | 1.80 | 3.00 | 4.80 | 4.9 % |
| NAV Essential annual | 99.00 | 81.82 | 1.49 | 0.25 | 1.74 | 2.1 % |
| HUB hardware, one unit | 349.00 | 288.43 | 5.24 | 0.25 | 5.49 | 1.9 % |
| FLEET Start account-year, B2B | 588.00 | 588.00 | 8.82 | 0.25 | 9.07 | 1.5 % |

The fixed fee is regressive: EUR 0.25 on one EUR 9.90 payment is **3.1 % of net revenue** (2.5 % of
the amount charged), against 0.31 % on EUR 99 annually and 0.09 % on a HUB unit. Monthly billing costs
4.9 % of net revenue versus 2.1 % annually; the 2.8-point gap is the fixed fee × 12.

App store is a revenue deduction, not a processing fee: 30 % removes EUR 24.55 of the EUR 81.82 NAV
Essential net revenue, leaving EUR 46.84; the conditional 15 % rate leaves EUR 59.12.

## 6. Installation channel

**Basis:** EUR per unit at 100-unit BASE. `COST-12` is the modelled cost of installation labour
(ASM-010 field hours × case labour rate), not a channel price; it appears only where a configuration
includes installation.

| SKU | `COST-12` per unit | Installer-included known variable cost | Installer-included contribution |
|---|---:|---:|---:|
| HUB-STANDARD | 36.00 | 317.13 | −28.70 |
| WATCH-CORE | 54.00 | 244.90 | 2.21 |
| SENSE-MODULE | 45.00 | 133.27 | −51.45 |
| DISPLAY-7 | 60.00 | 363.32 | 214.37 |
| AIS-RECEIVER | 39.00 | 320.35 | −114.56 |

No installer rate card, measured duration or agreement exists, so `COST-12` carries a cost, not a
price; the 15 % installer deduction is a separate hypothesis and the data never adds both. Installation
turns HUB, WATCH, SENSE and AIS negative and leaves DISPLAY at EUR 214.37; PILOT/SAIL/COMPLETE are quotation-only.

## 7. Returns and withdrawal

**Basis:** EUR per unit at 100-unit BASE. A 14-day withdrawal right and a 3-year Spanish guarantee
apply ([legal-tax-inputs.json](data/legal-tax-inputs.json)); ASM-MC12-010 applies a 3 % of net revenue
returns assumption (`MEDIUM`, no return-rate evidence), now registered as a `SEN-*-RETURNS` scenario.
Hardware records carry no returns line, whereas consumer subscriptions carry `SVC-RETURNS` (NAV
Essential EUR 2.45; WATCH Monitoring EUR 2.94), so the deduction is additional to the direct-channel
result: HUB 8.65 (1.81 → **−6.84**), HUB-PRO 12.37 (123.53 → 111.16), WATCH 7.41 (51.48 → 44.07),
SENSE 2.45 (−8.19 → −10.64), DISPLAY 17.33 (263.63 → 246.30), AIS 6.17 (−79.55 → −85.72). HUB's direct
contribution is smaller than its own returns assumption; the 36-month warranty is unquantified.

## 8. Channel risks and the evidence that would close them

**Basis:** qualitative register entries; no quantitative exposure is stated because none is evidenced.

| Risk | Where it binds | Evidence that would close it | Reference |
|---|---|---|---|
| Installer deduction and service price unnegotiated | HUB, SENSE and AIS negative even at 15 % | Signed installer agreement or rate card with measured install duration | `BLK-COMM-02` (MAJOR, OPEN) |
| Distributor terms unnegotiated | All hardware except DISPLAY negative at 35 % | Distributor term sheet with margin, MOQ, price-hold and returns | `BLK-COMM-02` |
| No merchant/payment contract | Card processing is a published tariff, not a negotiated rate | Merchant services contract or negotiated rate schedule | CH-DIRECT notes |
| App-store distribution not agreed | Published rate; commission tier and pricing freedom unresolved | Executed app-store distribution agreement | CH-APP-STORE |

## 9. Conclusion

**No channel is economically validated.** The only evidenced channel cost is card processing under
CH-DIRECT (1.5 % + EUR 0.25): it cuts HUB's base contribution from EUR 7.30 to EUR 1.81 and leaves AIS
and SENSE negative. At 35 % only DISPLAY stays positive; at 15 % only DISPLAY, HUB-PRO and WATCH do.

No channel result is a price approval, a margin or a statement that anything is profitable; the
manifest records `PRICE_APPROVED = NONE`, `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE` and
`profitability = NONE`. Closing the channel question requires a partner agreement, a distributor term
sheet and a payment contract — external evidence, not further modelling.
