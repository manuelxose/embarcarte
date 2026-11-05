# MC-12 D14 — MC-13 financial-model handoff

| Field | Value |
|---|---|
| Deliverable | D14 `MC12-MC13-HANDOFF.md` |
| Owner / date | `programme-lead`, 2026-11-02 |
| Status | `READY_FOR_MC13_WITH_NAMED_GAPS` |
| Machine companion | [mc13-handoff-inputs.json](data/mc13-handoff-inputs.json) |
| Critical boundary | **MC-13 has not started.** No 12/36/60-month forecast, no break-even claim and no approved price is produced here. |

## 1. Purpose

MC-13 owns the multi-period financial model. MC-12 transfers validated inputs,
explicit unknowns and scenario assumptions. It does not execute the model, does not
assert break-even and does not mark MC-13 as started.

## 2. Cost structures by SKU

| SKU | Variable cost basis | Recurring cost basis | Fixed / unknown |
|---|---|---|---|
| HUB Standard / Pro | MC-11 100-unit BASE variable cost EUR 281.13, self-install; installer config adds EUR 36.00 | optional cloud/dashboard; support allowance | tooling/NRE, certification, engineering NRE, insurance, security maintenance |
| WATCH Core | EUR 190.90 hardware at 100 units | EUR 13.05/device-year modelled (cellular, cloud, notifications, payment, support) | as above |
| SENSE module | EUR 88.27 at 100 units (per module cost basis) | none inherent | as above |
| DISPLAY 7 | EUR 303.32 at 100 units | optional cloud | as above |
| AIS Receiver | EUR 281.35 at 100 units | none inherent | NMEA licence, certification, as above |
| NAV Essential / Pro | EUR 10.43 / 12.42 per account-year known | chart/weather licence `UNKNOWN`, map tiles `UNKNOWN` | app-store commission, security maintenance |
| WEATHER Standard / Pro | EUR 5.45 / 7.04 per account-year known | provider usage `UNKNOWN` | security maintenance |
| FLEET START / BUSINESS | EUR 37.08 (START) / 42.48 (BUSINESS) per vessel-year modelled | cloud tenancy, support, telemetry volume `UNKNOWN` | onboarding, DPA, SLA |
| PILOT | none — no cost exists | none | entire scope `UNKNOWN`; safety `BLOCKED` |

## 3. Recurring operating costs

| Driver | Modelled value | Status |
|---|---|---|
| Cloud/telemetry per device-month | EUR 0.155 (BASE vendor subtotal, 1 000 devices) | tariff-derived floor |
| Cellular per device-month | EUR 0.05 (PAY-GO), alternatives EUR 0.10–0.375 | published tariff |
| Notifications per device-month | EUR 0.070714 (BASE alert mix) | published tariff |
| Cloud per account-month | EUR 0.02 | labelled assumption |
| Cloud per FLEET vessel-month | EUR 0.10 | labelled assumption |
| Support per account/device/vessel-year | EUR 6 / 4 / 24 | labelled assumption |
| Payment | 1.5 % + EUR 0.25 per transaction | published tariff |
| Chart/weather licence | `UNKNOWN` | licensing blocked |
| Security maintenance / CRA | `UNKNOWN` | no scope or rate |
| Product liability insurance | `UNKNOWN` | no broker quote |

Every fixed floor, tier step and minimum commitment is identified in
[D05](MC12-CLOUD-AND-CELLULAR-COST-MODEL.md): the Workers USD 5/month floor, the
Azure IoT Hub S1 stepped unit and the 1NCE/Soracom upfront commitments change the
per-unit average materially at low volume.

## 4. One-time investments and capital

| Item | Amount | State |
|---|---|---|
| Tooling and NRE | `UNKNOWN` | only the MC-11 sensitivity envelope (HUB 12 000 / WATCH 8 000 / SENSE 3 500 / DISPLAY 9 000 / AIS 5 000 EUR) exists; it is not a quote |
| Certification and conformity programme | `UNKNOWN` | no laboratory engaged |
| Hardware/firmware/mechanical engineering NRE | `UNKNOWN` | no schedule or rate |
| Cloud/connectivity integration and provisioning | `UNKNOWN` | not designed |
| Legal, trademark and IP clearance | `UNKNOWN` | inherited not granted |
| First-article and certification samples | `UNKNOWN` | not planned or authorised |

MC-13 must not treat the MC-11 tooling envelope as a budget. It is an amortisation
sensitivity, not a quotation.

## 5. Customer-acquisition inputs

`CUSTOMER_EVIDENCE = NONE`, `CUSTOMER_WTP_VALIDATED = false`. There is no CAC, no
funnel, no conversion rate, no churn and no renewal rate. MC-13 must carry these as
`UNKNOWN` and must not invent a market forecast. The only defensible statement is
that the customer column has not moved.

## 6. Subscription contribution drivers

| Driver | State |
|---|---|
| Price hypotheses | NAV 99/149 EUR/year; WEATHER 49/89; WATCH 9.90/month; FLEET 49/79 per vessel-month | all `HYPOTHESIS_UNAPPROVED` |
| Renewal / churn | `UNKNOWN` | no data |
| Data-licence cost | `UNKNOWN` | rights not granted |
| Payment fees | published | annual prepayment reduces fee regressivity |
| Shared entitlement | NAV/WEATHER one ledger | no double billing |
| Activation | `UNKNOWN` | no onboarding measurement |

## 7. Inventory, working capital and terms

No MOQ, payment term, price-hold, FX hedge, inventory policy or returns agreement
exists. Working-capital exposure is `UNKNOWN`. The MC-11 volume scenarios
(`1/10/100/500/1000`) are analysis cases, not purchase commitments.

## 8. Warranty, support and security lifecycle

- Warranty allowance is inside the MC-11 variable cost (1.5 % / 3 % / 6 % of
  material plus labour by case); it is an assumption, not a reliability reserve.
- Consumer legal guarantee is 3 years with a 24-month presumption; the 14-day
  withdrawal right is modelled as a 3 % revenue deduction.
- CRA support period is ≥ 5 years with updates for 10 years or the support period;
  this is a recurring engineering cost of `UNKNOWN` amount.
- Product liability insurance is `UNKNOWN`.

## 9. Uncertainty ranges for MC-13 scenarios

| Parameter | LOW | BASE | HIGH | Basis |
|---|---|---|---|---|
| Variable cost | 80 % | 100 % | 140 % | MC-11 LOW/HIGH cases plus a stress envelope |
| Connectivity EUR/device-month | 0.05 | 0.10–0.375 | 0.80 | plan choice and overage |
| Cloud multiplier | 0.5× | 1.0× | 2.0× | usage profile and fixed floor |
| Data licence EUR/account-year | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | no right, no price |
| Renewal rate | `UNKNOWN` | 70 % illustrative | `UNKNOWN` | no churn data |

These are analytical envelopes, not forecasts. The 70 % renewal figure appears only
as an illustrative sensitivity and is not evidence.

## 10. Model confidence

`LOW`. Costs are assumption-based, rights are not granted, customer evidence is
absent, and certification is unknown. A model built on this handoff can be
internally consistent but cannot be commercially validated.

## 11. Required external evidence before a financial model can be trusted

1. Chart redistribution licence with territory, caching, per-device and price terms.
2. Weather data licence with commercial display, caching, SLA and attribution.
3. NMEA 0183 licence and NMEA 2000 certification schedule.
4. Cellular IoT contract or formal quotation (allowance, roaming, suspension, term).
5. Cloud agreement, DPA and EU-region commitment.
6. Supplier quotations, MOQ, lead times and Incoterms for every material line.
7. Certification quotations (EMC, RED, environmental, CRA).
8. Product liability insurance quotation.
9. Executed customer interviews and pricing responses under `AUTH-MC10-001`.

Until those exist, MC-13 can only build a conditional model with named gaps — which
is exactly what MC-12 hands over.
