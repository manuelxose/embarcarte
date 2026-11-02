# MC-12 — Connectivity and cloud recurring cost evidence (research note)

Status: `RESEARCH_ONLY`. Milestone: MC-12. Date: `2026-11-02`. Owner: cloud-connectivity-economics-engineer.
Evidence: `docs/marea/economics/data/provider-evidence.connectivity-cloud.json` (27 records) and
`docs/marea/economics/data/recurring-cost-inputs.json` (35 inputs). Currency: EUR, VAT excluded unless labelled.
USD converted with the ECB euro reference rate of 2 November 2026 (USD 1.1216/EUR), source:
<https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html>.

## 1. Method and evidence boundary

- Public pages only, retrieved on 2026-11-02. No registration, purchase, trial activation or provider contact;
  exact URLs are recorded per record.
- Evidence classes used: `PUBLISHED_PROVIDER_TARIFF`, `PUBLIC_PRICE_OBSERVATION`, `ENGINEERING_ASSUMPTION`,
  `INACCESSIBLE`, `UNKNOWN`. `FORMAL_PROVIDER_QUOTATION` and `EXECUTED_CONTRACT` are absent: none was requested.
- Unpublished price = `null`. A "from" price is a floor, not a tariff. A free tier is not a production entitlement.
  **No connectivity, cloud, notification, payment or distribution contract exists for MAREA.** Every number is a
  public list price or a declared assumption; none is an SLA, guaranteed price or production entitlement.
- Limits: usage profiles are an engineering envelope, not measured fleet data; support/alert volumes are
  unvalidated; no field or sea trial has been performed.
## 2. Strongest published tariffs (native currency, VAT basis of the source)

| Provider / product | Published tariff | VAT |
|---|---|---|
| 1NCE IoT Lifetime Flat | EUR 12 one-time / 10 years; 500 MB + 250 SMS; 1 Mbit/s; top-up EUR 10/500 MB | excl. |
| Soracom planX3_EU | 25 MB: EUR 4.50 first 12 months, then EUR 0.32/mo; 500 MB: EUR 22.80 then EUR 1.90/mo; overage EUR 0.01/MB | excl. |
| iot.cards (Spain) | EUR 0.005/MB pay-as-you-go, no monthly minimum, no permanence; SIM test kit EUR 15 incl. VAT | excl. |
| KORE Super SIM (ex-Twilio IoT) | SIM hardware from USD 3; active SIM from USD 2/mo; data from USD 0.10/MB | unknown |
| Vodafone España NB-IoT | "from" EUR 0.82/line/month; allowance/commitment not published | unknown |
| AWS IoT Core (EU Ireland) | USD 0.08 per 1M connection-minutes; USD 1.00 per 1M messages; rules USD 0.15 per 1M | excl. |
| AWS Lambda | USD 0.0000166667 per GB-s (x86); USD 0.20 per 1M requests; Arm USD 0.0000133334 per GB-s | excl. |
| Azure IoT Hub | B1 USD 10, S1 USD 25, S2 USD 250 per unit/month; S1 includes 400,000 messages/day | excl. |
| Cloudflare R2 / Workers | R2 USD 0.015/GB-month, Class A USD 4.50/1M, egress free; Workers Paid USD 5/mo minimum | excl. |
| Firebase Cloud Messaging | Listed as no-cost service (no per-message price) | n/a |
| Amazon SES | USD 0.11–0.23 per 1,000 emails (nine rates visible); model uses USD 0.11 floor | excl. |
| Twilio SMS Spain | USD 0.0875 per outbound SMS | excl. |
| Stripe (Spain) | 1.5% + EUR 0.25 EEA cards; 2.5% + EUR 0.25 UK; 2.8% + EUR 0.25 international | excl. |
| Apple App Store | 15% Small Business Program commission (<= USD 1M proceeds); standard 30% not evidenced | unknown |
| Google Play | 15% service-fee tier evidenced; 30% tier not numerically captured | unknown |
## 3. Per-device-month model (BASE, 1,000 devices, vendor costs only, ECB 0.8916 EUR/USD)

| Cost line | Arithmetic | EUR/device-month |
|---|---|---|
| Cellular data (iot.cards) | 10 MB x EUR 0.005/MB | 0.050000 |
| AWS IoT Core messages | 4,320 / 1e6 x USD 1.00 x 0.8916 | 0.003851 |
| AWS IoT Core connection | 14,400 min / 1e6 x USD 0.08 x 0.8916 | 0.001027 |
| Lambda compute + requests | 432 GB-s x USD 0.0000166667 + 0.00432M x USD 0.20, x 0.8916 | 0.007190 |
| R2 writes + storage | 0.00432M x USD 4.50 + 0.020 GB x USD 0.015, x 0.8916 | 0.017601 |
| Cloudflare Workers floor | USD 5.00 x 0.8916 / 1,000 devices | 0.004458 |
| Alerts (push 0, email, SMS 15%) | 6 x (0.15 x EUR 0.078015 + 0.85 x EUR 0.000098076) | 0.070714 |
| **Vendor subtotal, BASE** | sum of the above (managed DB/monitoring excluded, see gaps) | **0.154840** |

Fleet totals, BASE: 1 device = EUR 4.608/device-month (EUR 4.61/month); 10 = EUR 0.5962 (EUR 5.96/month);
100 = EUR 0.1950 (EUR 19.50); 500 = EUR 0.1593 (EUR 79.65); 1,000 = EUR 0.1548 (EUR 154.84). LOW at 1,000
devices = EUR 0.025671/device-month (EUR 25.67/month); HIGH = EUR 0.735261/device-month (EUR 735.26/month).
The support assumption (EUR 15/incident: 1 per 100 devices BASE) raises BASE to EUR 0.304840/device-month
(EUR 304.84/month); it is model-only, not a vendor cost. Azure alternative: one S1 unit (USD 25 = EUR 22.29/month,
12M messages/month) covers 1,000 BASE devices at EUR 0.022290/device-month, or 1 device at EUR 22.290000/device-month
— stepped, not linear; a HIGH fleet of 1,000 devices sends 17.52M messages/month, exceeding one S1 unit (12M), so
2 units = EUR 44.58/month.
## 4. What is stepped, fixed, minimum or variable

- Fixed/stepped: Cloudflare Workers USD 5/month floor; Azure IoT Hub per-unit monthly tiers (S1 400k msg/day
  capacity cliff); 1NCE EUR 12 per 10 years; Soracom 12-month upfront payment; Teltonika MOQ 100.
- Variable: cellular per MB, AWS IoT messages/connection-minutes, Lambda GB-s and requests, R2 operations and
  GB-month, SES per 1,000 emails, Twilio per SMS. Minimums: 1NCE one-off 10-year term, Soracom first 12 months
  upfront, Teltonika MOQ, Azure per unit, Workers USD 5/account/month. No verifiable Spanish
  activation/provisioning fee is published, so activation stays `null` rather than zero.
- Offsetting: Cloudflare R2 egress is published as free; AWS S3 egress was not retrieved.
- **Offshore boundary: terrestrial cellular coverage is NOT assumed offshore.** Cellular inputs apply only inside
  land-based coverage; satellite/offshore connectivity is out of scope and unpriced.
## 5. Inaccessible / unknown (explicit gaps)

- AWS S3 storage, DynamoDB and CloudWatch: price tables JavaScript-rendered; no numeric rate in served HTML; bulk
  price-list endpoint returned 404. Cloud compute cost is therefore a floor.
- Hetzner Cloud: page contains no EUR amount in the served HTML (client-rendered table); the EU fixed-price
  alternative used is Cloudflare Workers + R2 and Azure EU tiers, not a Hetzner quote.
- Telefónica Global Solutions / Movistar IoT: HTTP 403 (blocked) — accessibility gap, not content evidence.
- EMnify: pricing URL redirects to the homepage, no list prices (sales-quoted). Teltonika: plans/MOQ published,
  no price. Vodafone España: only an entry price (0.82 EUR/month). Orange Business: page retrieved but no tariff
  table; French M2M tariff PDF not parsed (PDF handling unavailable).
- Stripe: chargeback/dispute fee and Stripe Billing percentage not unambiguously captured -> `null`. Apple
  standard 30% commission and Google Play 30% tier not numerically evidenced -> only 15% tiers priced.
- OneSignal / APNs pricing not retrieved; APNs is bundled with a developer membership whose price was not checked.
- No contract, SLA, coverage map, fair-use rule, suspension policy or roaming guarantee was obtained.
## 6. RFQ questions required before a formal quotation / contract

1. Cellular: monthly allowance per tier, pooled vs per-SIM data, activation/provisioning fee, SIM/eUICC hardware
   and replacement cost, multi-year price protection, volume tiers at 1/10/100/500/1,000 devices.
2. Coverage/limits: Spain coastal and offshore coverage map, roaming zones, fair-use and speed caps,
   suspended/inactive behaviour, reactivation, notice period, SLA and credits.
3. Device management: platform/API fees, per-SIM management charge, eSIM remote provisioning, IMEI-SIM binding,
   firmware distribution bandwidth, tenant isolation and EU data-processing terms (GDPR DPA).
4. Cloud: committed-use discounts, EU-region residency guarantee, managed database and monitoring list prices,
   backup retention, egress schedule, support plan cost, tenant-isolation charges.
5. Notifications/payments/distribution: push provider terms (free tier not accepted as production), email
   limits, SMS sender-ID and carrier fees, retry/delivery guarantees; Stripe Billing percentage, SEPA/other
   method fees, chargeback/refund fees, VAT-inclusive pricing, Apple/Google commission qualification and the 30% case.
6. Every quote must state currency, VAT basis, validity date, minimum commitment, overage and termination terms;
   without that, values stay `null` in MC-12.
