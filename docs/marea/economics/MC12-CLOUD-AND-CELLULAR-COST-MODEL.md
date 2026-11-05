# MC-12 D05 — Cloud and cellular operating cost model

| Field | Value |
|---|---|
| Deliverable | D05 `MC12-CLOUD-AND-CELLULAR-COST-MODEL.md` |
| Owner / date | `cloud-connectivity-economics-engineer`, 2026-11-02 |
| Status | `INTERNAL_ECONOMICS_ANALYSIS` |
| Machine companion | [recurring-cost-inputs.json](data/recurring-cost-inputs.json), [providers.json](data/providers.json) |
| Raw research | [MC12-RESEARCH-CONNECTIVITY-CLOUD.md](research/MC12-RESEARCH-CONNECTIVITY-CLOUD.md) |
| Boundary | published tariffs and labelled assumptions only; **no contract exists** |

## 1. Method

The recurring model is built from operational drivers, not from a chosen vendor.
Fifty-three provider records are classified in [providers.json](data/providers.json);
thirty-five cost inputs, each with explicit arithmetic, are in
[recurring-cost-inputs.json](data/recurring-cost-inputs.json). USD tariffs are
converted at the ECB euro reference rate observed on 2026-11-02
(USD 1.1216 per EUR, i.e. EUR 0.8916 per USD), recorded in the register.

Three usage profiles bound the workload:

| Driver | LOW | BASE | HIGH |
|---|---|---|---|
| Telemetry messages / device-month | 720 | 4 320 | 17 520 |
| Data MB / device-month | 1.5 | 10 | 60 |
| Storage MB / device | 5 | 20 | 60 |
| Alerts / device-month | 1 | 6 | 20 |
| SMS share of alerts | 10 % | 15 % | 20 % |
| Emails / account-month | 2 | 4 | 10 |
| Support incidents / 100 devices-month | 0.2 | 1 | 3 |

These profiles are an engineering envelope. No vessel has reported telemetry to a
MAREA system, so they are assumptions, not measurements.

## 2. Cellular IoT: what a published tariff actually buys

| Provider / plan | Published tariff | Effective EUR/device-month at BASE | Note |
|---|---|---|---|
| iot.cards (Spain) | EUR 0.005/MB pay-as-you-go, no minimum | **0.0500** | 10 MB/month; cheapest published Spain tariff found |
| 1NCE IoT Lifetime Flat | EUR 12 per SIM / 10 years, 500 MB + 250 SMS | 0.1000 | only if average use ≤ 4.17 MB/month; BASE needs top-ups → 0.2667 |
| Soracom planX3_EU 25 MB | EUR 4.50 upfront year 1, then EUR 0.32/month | 0.3750 | allowance fits BASE; committed upfront |
| KORE Super SIM | USD 2/active SIM/month + USD 0.10/MB | ≈ 1.78 + data | pay-as-you-go, high data rate |
| Vodafone España | "from" EUR 0.82/line/month | ≥ 0.82 | plan allowance not published |

The model uses the iot.cards BASE rate (EUR 0.05/device-month) and carries the
plan-level alternatives as a sensitivity range of EUR 0.10-0.375. **No operator,
MVNO, SIM/eSIM supply or activation agreement exists**, so this is a tariff, not a
service. Terrestrial cellular coverage is explicitly **not** assumed offshore;
blue-water connectivity is unpriced (`RC-035`).

## 3. Cloud and telemetry: per-device-month

| Line (BASE, published tariffs) | Arithmetic | EUR/device-month |
|---|---|---|
| AWS IoT Core messages | 4 320 × USD 1.00/M × 0.8916 | 0.003851 |
| AWS IoT Core connection time | 8 h/day × USD 0.08/M connection-minutes | 0.001027 |
| AWS Lambda + requests | 4 320 × USD 0.20/M + GB-s | 0.007190 |
| Cloudflare R2 writes + storage | Class A writes + 20 MB-month | 0.017601 |
| Workers Paid floor at 1 000 devices | USD 5/month ÷ 1 000 | 0.004458 |
| **Vendor subtotal** | | **0.15484** |

Across profiles the vendor subtotal is **LOW EUR 0.025671, BASE EUR 0.15484, HIGH
EUR 0.735261** per device-month (EUR 25.67 / 154.84 / 735.26 per month for 1 000
devices). The model therefore uses **EUR 0.155/device-month** for cloud and
telemetry, disclosed as a modelled floor.

Two structural effects matter more than the average:

1. **The Workers floor is regressive.** At one device the USD 5/month minimum
   dominates and BASE becomes EUR 4.61/device-month; only at scale does the
   marginal cost appear.
2. **Stepped tiers are not linear.** Azure IoT Hub S1 is USD 25/unit-month
   (EUR 22.29) for 400 000 messages/day: EUR 22.29/device-month at 1 device,
   EUR 0.2229 at 100 and EUR 0.02229 at 1 000. A HIGH profile at 1 000 devices
   needs two units. A per-device average without the tier step would be wrong.

Unavailable: AWS S3, DynamoDB and CloudWatch rates (JS-rendered tables), Hetzner
Cloud (client-rendered), and any contracted fixed minimum. `RC-029` and `RC-030`
are `null`, never zero.

## 4. Notifications and alerting

| Channel | Published tariff | BASE use |
|---|---|---|
| Push (FCM) | no-cost service, no per-message price | 85 % of alerts |
| Email (Amazon SES) | USD 0.11/1 000 emails → EUR 0.000098/email | 100 % of email events |
| SMS Spain (Twilio) | USD 0.0875/SMS → EUR 0.078015 | 15 % of alerts |

BASE alert cost is **EUR 0.070714/device-month** (6 alerts, 15 % SMS); HIGH is
EUR 0.313629. Modelled delivery cost is not a delivery guarantee. No notification
provider contract, retry policy or history-retention price exists.

## 5. Payment, distribution and other revenue-side deductions

| Item | Tariff | Nature |
|---|---|---|
| Stripe EEA card | 1.5 % + EUR 0.25 | published, per transaction |
| Stripe UK / international | 2.5 % / 2.8 % + EUR 0.25 | published, not modelled in base |
| Apple App Store | 15 % Small Business Program evidenced; 30 % standard not numerically evidenced | published programme terms |
| Google Play | 15 % service-fee tier evidenced | published programme terms |
| Chargeback / dispute fee | `null` — not retrieved | UNKNOWN |
| Stripe Billing percentage | `null` — not retrieved | UNKNOWN |

The fixed EUR 0.25 is regressive: on EUR 9.90 monthly monitoring it is 2.5 % of
revenue before the 1.5 % percentage, i.e. roughly 4.0 % all-in. This is why the
paid-monthly model is more fee-sensitive than an annual subscription.

## 6. Inactive, suspended and retention states

A device or subscription that is inactive still consumes identity, storage and
account cost. The model treats inactive devices as **zero telemetry, retained
account and storage cost**, and it does **not** assume that a suspended SIM is free:
suspension and minimum-commitment terms are not established (`ASM-MC12-020`,
`BLK-LIC-05`). Telemetry retention is modelled at 12 months (BASE), a policy
assumption, not a provider term. GDPR retention limits and the CRA support period
both push in the direction of a defined, costed retention policy.

## 7. What the model supports and what it does not

**Supports:** a defensible per-device-month order of magnitude
(EUR 0.15-0.20 combined for cloud and connectivity at BASE scale), the fact that
fixed floors and tier steps dominate at low volume, and the fact that notification
and payment deductions are small but non-zero.

**Does not support:** a contracted cost, an SLA, offshore coverage, a per-vessel
FLEET ingestion estimate (no telemetry volume data exists), data-residency
assurance (EU region is a design choice), or any claim that cloud is "negligible".
Every figure is a public tariff or a labelled assumption.
