# MC-21 — Technical facts, limitations and evidence classes

Every rendered statement carries an evidence class and canonical source references. Unknown values
are rendered as unknown/unavailable; nothing is inferred, averaged or filled in.

| Evidence class | Meaning |
| --- | --- |
| `VERIFIED_REPO` | Recorded in a repository dataset or document |
| `VERIFIED_EXTERNAL` | External source recorded in MC-02/MC-09 |
| `ASSUMPTION` / `HYPOTHESIS` | Documented assumption / unapproved commercial hypothesis |
| `OPEN` / `BLOCKED` | Insufficient evidence / external dependency prevents the claim |

## WEATHER (software · licensed-data service)

| Fact | Value | Source |
| --- | --- | --- |
| Product type | SOFTWARE | MC-16 `product-families.json` |
| Lifecycle / availability | `DEFINED` / `NOT_FOR_SALE` | MC-16 |
| Editions | WEATHER-STANDARD (`DEFINED`), WEATHER-PRO (`CONDITIONAL`) | `product-editions.json` |
| Hardware | `NOT_APPLICABLE_SOFTWARE_PRODUCT` | MC-16 |
| Readiness | engineering `NOT_VERIFIED`; licensing `NOT_CLEARED`; dataRights `NOT_GRANTED`; compliance `NOT_STARTED`; safety `NOT_EVALUATED`; operations `NOT_READY`; pricing `HYPOTHESIS_UNAPPROVED` | MC-16 |
| Provider rights | `WEATHER_PROVIDER_RIGHTS=NOT_GRANTED`; `providerRightsGranted=false`; `redistributionAllowed=false`; `offlineAllowed=false`; `navDoubleBillingAllowed=false` | `MAREA-WEATHER-COMMERCIAL-SPEC.md` §1.4 |
| Forecast | `WEATHER_FORECAST_EVALUATION=NOT_PERFORMED`; `forecastAccuracyClaimed=false` | spec §1.4 |
| Services | `WEATHER_SUBSCRIPTION_SERVICE=NOT_FOUND`; `WEATHER_ENTITLEMENT_LEDGER=NOT_FOUND`; `WEATHER_SOURCE_REGISTRY=NOT_FOUND` | spec §1.4 |
| Bundles | WEATHER-STANDARD included in START/CRUISE; WEATHER-PRO included in COMPLETE | `bundle-compositions.json` |
| Gate | `GATE-DATA-LICENSING` blocks (no source/provider/forecast-quality evidence) | `proposed-routes.json` |

Rendered limitations: no data provider is named or contracted; forecasts are probabilistic and no
accuracy/official status is claimed; the customer's own licence governs data; no redistribution or
offline right is assumed; no NAV/WEATHER double billing; no price/stock/SKU/order.

## SENSE (hardware · modular sensing)

| Fact | Value | Source |
| --- | --- | --- |
| Product type | HARDWARE | MC-16 |
| Lifecycle / availability | `DEFINED` / `NOT_FOR_SALE` | MC-16 |
| Editions | 8 (5 `HARDWARE_MODULE` + 3 `HARDWARE_KIT`) | `product-editions.json` |
| Readiness | engineering `PARTIALLY_VERIFIED`; hardware `NOT_SELECTED`; dataRights `NOT_GRANTED`; compliance `NOT_STARTED`; safety `LOCAL_ALARM_INDEPENDENT`; operations `NOT_READY` | MC-16 |
| Measurement | `SENSE_MEASUREMENT_ACCURACY=NOT_MEASURED`; ingress `NOT_VERIFIED` | `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md` |
| NMEA 2000 | `NOT_IMPLEMENTED` | MC-06 |
| Connectivity | none of its own; no remote alerting (requires WATCH + subscription) | MC-06 |
| Bundles | SAIL (SENSE-WIND), PROTECT (SENSE-ESSENTIALS), COMPLETE (POWER/BILGE/TANKS/ENV) | `bundle-compositions.json` |

Rendered limitations: no measurement-accuracy figure; no ingress/IP rating; no NMEA 2000
implementation or interoperability claim; no connectivity or remote alerting by itself; a kit is
packaging, not new capability; no price/stock/SKU/order.

## WATCH (hardware + service · remote awareness)

| Fact | Value | Source |
| --- | --- | --- |
| Product type | HARDWARE_SERVICE | MC-16 |
| Lifecycle / availability | `DEFINED` / `NOT_FOR_SALE` | MC-16 |
| Editions | WATCH-CORE (`DEFINED`), WATCH-PLUS (`CONDITIONAL`) | `product-editions.json` |
| Readiness | engineering `NOT_VERIFIED`; hardware `NOT_SELECTED`; dataRights `NOT_GRANTED`; safety `LOCAL_SAFETY_INDEPENDENT`; operations `NOT_READY` | MC-16 |
| Ingestion | `WATCH_INGESTION=NOT_VERIFIED`; connectivity/identity/subscription/notification pipeline `NOT_FOUND` | `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` |
| Bundles | PROTECT (WATCH-CORE incl, WATCH-PLUS opt), COMPLETE (CORE incl), FLEET (CORE incl) | `bundle-compositions.json` |
| Gate | `GATE-PRIVACY-DPA-DPIA` blocks | `proposed-routes.json` |

Rendered limitations: not a certified distress service; not theft prevention; no steering function;
alert delivery is never guaranteed; privacy gate blocked (no form, no lead capture, no personal-data
storage); no price/stock/SKU/order.

## Withheld claims (never rendered)

Prices, price hypotheses, merchant SKUs, stock, inventory, delivery dates, certifications,
regulatory approvals, NMEA interoperability guarantees, tested compatibility, measurement/forecast
accuracy, guaranteed alert delivery, safety-critical performance, warranty duration, sea trials,
testimonials, supplier quotations, and unlicensed data-provider names.
