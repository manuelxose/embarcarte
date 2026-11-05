# MC-12 D04 — Provider research and price register

| Field | Value |
|---|---|
| Deliverable | D04 `MC12-PROVIDER-RESEARCH-AND-PRICE-REGISTER.md` |
| Owner / date | `licensing-data-rights-researcher` + `cloud-connectivity-economics-engineer`, 2026-11-02 |
| Status | `INTERNAL_ECONOMICS_ANALYSIS` — public research only; no outreach |
| Machine companion | [providers.json](data/providers.json) |
| Raw registers | [provider-evidence.chart-weather.json](data/provider-evidence.chart-weather.json), [provider-evidence.connectivity-cloud.json](data/provider-evidence.connectivity-cloud.json) |

## 1. Register composition

| Metric | Value |
|---|---|
| Provider records | 53 |
| Dependencies covered | 8 (chart, weather, NMEA, cellular, cloud, notifications, payments, app distribution) |
| `PUBLISHED_PROVIDER_TARIFF` | 21 |
| `PUBLIC_PRICE_OBSERVATION` | 2 |
| `OFFICIAL_LICENSING_DOCUMENT` | 15 |
| `INACCESSIBLE` | 9 |
| `UNKNOWN` | 5 |
| `ENGINEERING_ASSUMPTION` | 1 |
| `FORMAL_PROVIDER_QUOTATION` | **0** |
| `EXECUTED_CONTRACT` | **0** |
| Quotation register | `EMPTY`; RFQ packages `NOT_SENT` |
| Observation date | `2026-11-02` for every record |

The two `FORMAL_PROVIDER_QUOTATION` and `EXECUTED_CONTRACT` classes are absent by
construction: no supplier or provider was contacted, no RFQ was transmitted and no
terms were accepted. A website price is recorded as a tariff or a public
observation, never as a negotiated price.

## 2. Strongest published observations

### Charts and data rights

| Provider | Product / right | Observation | Class |
|---|---|---|---|
| NOAA OCS | ENC, public domain | USD 0, US waters only | official document |
| IHO | S-57/S-63 distribution | OEM/data-server agreement, price on request | official document |
| UKHO | Admiralty/AVCS | terms not retrievable | inaccessible |
| Shom | French charts | terms not retrievable | inaccessible |
| IHM (Spain) | Spanish charts | terms not retrievable | inaccessible |
| Garmin/Navionics | OEM/developer content | price on request, no redistribution terms | official document |
| C-MAP (Navico) | commercial charts | EULA prohibits the required use | official document |
| OSM/OpenSeaMap | open map data | ODbL, tile policy prohibits production load | official document |
| EMODnet / Copernicus | bathymetry/marine data | free, attribution, not navigation-grade | official document |

### Weather

| Provider | Observation | Class |
|---|---|---|
| Copernicus Marine | free, attribution, continuity dependency | official document |
| DWD | free open data, attribution, no SLA | official document |
| Stormglass | EUR 49/month medium plan, 5 000 req/day | published tariff |
| Visual Crossing | USD 0.0001 per record, metered | published tariff |
| Meteomatics | quote only | public observation |
| Open-Meteo | commercial price not retrieved | official document |
| PredictWind | end-user subscription, not a data licence | public observation |

### Connectivity and cloud

| Provider | Observation | Class |
|---|---|---|
| iot.cards (Spain) | EUR 0.005/MB, no minimum | published tariff |
| 1NCE | EUR 12 per SIM / 10 years, 500 MB + 250 SMS | published tariff |
| Soracom | EUR 4.50 first year, 25 MB/month; then EUR 0.32/month | published tariff |
| KORE (ex-Twilio IoT) | USD 2/active SIM/month + USD 0.10/MB | published tariff |
| Vodafone España | "from" EUR 0.82/line/month | published tariff |
| AWS IoT Core / Lambda | USD 1.00/M messages; USD 0.08/M connection-minutes | published tariff |
| Azure IoT Hub | USD 25/S1 unit/month | published tariff |
| Cloudflare R2 / Workers | USD 0.015/GB-month; USD 5/month floor | published tariff |
| FCM | no-cost push | published tariff |
| Amazon SES | USD 0.11/1 000 emails | published tariff |
| Twilio | USD 0.0875/SMS Spain | published tariff |
| Stripe | 1.5 % + EUR 0.25 EEA cards | published tariff |
| Apple / Google | 15 % small-business/service-fee tier evidenced | published tariff |

## 3. Classification discipline

- **A published tariff is not a quotation.** It is an observation of a public list
  price, without negotiated terms, volume breaks, SLA, currency clause or
  termination regime.
- **A free tier is not production eligibility.** FCM at no cost, open weather data
  and public-domain charts do not establish a production right for a paid product.
- **A documentation page is not a contractual right.** An OEM programme page with
  "contact us" pricing grants nothing.
- **Inaccessible is a result.** Nine records are `INACCESSIBLE` because the terms
  could not be retrieved. They are not guessed.
- **Unknown is a result.** Five records are `UNKNOWN` with `price: null`.

## 4. Retrieval and currency basis

All observations carry `retrievedOn: 2026-11-02`. USD amounts are converted at the
ECB euro reference rate observed that day (USD 1.1216 per EUR; EUR 0.8916 per USD),
recorded with its source in the register and in
[recurring-cost-inputs.json](data/recurring-cost-inputs.json). The inherited MC-11
BOM conversion (EUR 0.925925926 per USD) is **not** re-based, so no individual cost
register mixes two conversion bases. Bundle aggregates do combine hardware components
(inherited MC-11 basis) and subscription components (ECB basis); each component keeps
its own disclosed basis. This closure is recorded as `ASM-MC12-021`.

## 5. What remains unavailable

| Gap | Providers | Consequence |
|---|---|---|
| Chart redistribution price and terms | UKHO, Shom, IHM, IHO OEM | NAV and all chart-dependent bundles remain blocked |
| Weather commercial re-display | Meteomatics, Open-Meteo, provider contracts | WEATHER remains blocked |
| NMEA 2000 fees/certification | NMEA | HUB/SENSE/DISPLAY/AIS claims blocked |
| Managed IoT plans (sales-led) | Telefónica, EMnify, Teltonika, Orange, Vodafone managed | connectivity cost is a tariff range, not a service |
| Cloud fixed minimum and DB/monitoring rates | AWS S3/DynamoDB/CloudWatch, Hetzner | cloud cost is a floor, not a contract |
| Chargeback and billing fees | Stripe | payment risk unquantified |
| Apple/Google 30 % tier | Apple, Google | only 15 % evidenced |
| SLA, coverage, fair use, suspension, roaming | all connectivity providers | no service guarantee |

## 6. RFQ / contact packages

No RFQ was sent. A future authorised package must ask, at minimum:

1. Grant scope: territory, coverage, offline cache survival after termination,
   update entitlement, per-device and per-vessel seats.
2. Price: per account, per device, per request, minimum commitment and overage.
3. Service: SLA, continuity, withdrawal notice, data-residency and sub-processors.
4. Legal: attribution wording, disclaimer, liability allocation, audit right.
5. Commercial: VAT basis, currency clause, term and termination.

Until such packages are authorised and answered, the provider register remains an
input to a conditional model, not evidence of a deliverable service.
