# MC-12 — Research note: chart data, marine weather data and NMEA licensing

Status: `INTERNAL_ENGINEERING_RESEARCH — PLANNING ONLY`.
Owner: `licensing-data-rights-researcher`. Date of retrieval: **2026-11-02** (all records).
Companion artefact: `docs/marea/economics/data/provider-evidence.chart-weather.json` (26 records, `PE-CW-001`…`PE-CW-026`).

**Bottom line: no chart, weather or NMEA right is granted to MAREA, and no provider contract exists.**
Nothing in this note is a quotation, a licence, or authorisation to publish, sell or embed any provider's data.

## 1. Method

Public web pages only, one session, no outreach, no registration, no purchase, no API key, no trial activation.
Every claim below is traceable to a `sourceUrl` actually fetched and recorded in the JSON with `retrievedOn = 2026-11-02`.
Where a page could not be retrieved or its terms did not render, the record is `INACCESSIBLE` or `UNKNOWN` and the price stays `null` — nothing is filled in from memory, vendor folklore or search snippets.
Monetary values are recorded in their native currency with no conversion; only USD amounts appear, and no exchange rate is asserted.
`OFFICIAL_LICENSING_DOCUMENT` in the JSON means an official provider page stating licence or access terms. It is **not** a contractual authorisation and grants nothing.

## 2. Strongest public facts

| # | Provider | Right or tariff found (as published) | Price | Source |
|---|---|---|---|---|
| 1 | NOAA Office of Coast Survey | Chart/bathy data dedicated to public domain via **CC0-1.0**; redistribution and commercial use permitted | None (0) | [data-licensing.html](https://nauticalcharts.noaa.gov/data/data-licensing.html) |
| 2 | NOAA ENC | ENC cells free direct; paid IC-ENC/VAR channel; weekday-evening updates | 0 direct; IC-ENC fee unpublished | [noaa-enc.html](https://nauticalcharts.noaa.gov/charts/noaa-enc.html) |
| 3 | IHO | **S-63 permit scheme**: encryption, selective access per licensed cell, authentication; OEM/Data Server agreement + IHO-issued credentials required | No fee schedule; `ON_REQUEST` | [iho.int data protection](https://iho.int/en/data-protection-s-100/s-57) |
| 4 | UKHO (AVCS) | ~23,000 ENCs, S-63/S-57, weekly updates, sold via distributor network | **Not read** (EULA PDF unreachable) | [admiralty.co.uk/avcs](https://www.admiralty.co.uk/avcs) |
| 5 | C-MAP (Navico) | EULA: private use only, **"NOT FOR COMMERCIAL USE"**; no copying, bundling, sub-licensing or distribution; one device | Product purchase; not a tariff | [C-MAP EULA](https://prod.c-map.com/en-au/legal/terms-and-conditions-eula/) |
| 6 | Garmin/Navionics web API | Standard = free viewer, **must be free to end users, no overlays**; Enhanced = paid annual licence by region/global, commercial use | Enhanced fee unpublished | [developer.garmin.com web](https://developer.garmin.com/marine-charts/web/) |
| 7 | Navionics mobile SDK | In-app purchase of chart rights; developer token; monetise inside own app | Unpublished | [developer.garmin.com mobile](https://developer.garmin.com/marine-charts/mobile/) |
| 8 | OpenStreetMap | **ODbL**: copy/adapt/distribute with attribution; derivative databases must stay ODbL (share-alike) | None (0) | [openstreetmap.org/copyright](https://www.openstreetmap.org/copyright) |
| 9 | OSMF tiles | **Offline use and bulk pre-seeding prohibited**; no SLA; access withdrawable, including for paying customers | None (0) | [OSMF tile policy](https://operations.osmfoundation.org/policies/tiles/) |
| 10 | EMODnet | Products owned by EU, **CC BY 4.0**; DTM 115 m grid, LAT, updated every 2 years; "not a nautical chart" | None (0) | [EMODnet terms](https://emodnet.ec.europa.eu/en/terms-use-emodnet-online-services-data-and-data-products) |
| 11 | Copernicus Marine | Free; worldwide, non-exclusive, royalty-free, **perpetual** licence; redistribution of unmodified products and derivative works permitted with credit/DOIs | 0 — **until planned 30 June 2028** | [CMEMS SLA + licence](https://marine.copernicus.eu/user-corner/service-commitments-and-licence) |
| 12 | DWD | Open spatial data under **CC BY 4.0**; attribution only condition; **no availability guarantee** on opendata.dwd.de | None (0) | [DWD legal notice](https://www.dwd.de/EN/service/legal_notice/legal_notice_node.html) |
| 13 | Open-Meteo | Free tier **non-commercial only** (<10k calls/day); commercial use needs paid subscription; data CC BY 4.0; plans 1M/5M/50M+ calls per month | Amounts not retrieved — `NOT_PUBLISHED` | [terms](https://open-meteo.com/en/terms) · [pricing](https://open-meteo.com/en/pricing) |
| 14 | Stormglass | EUR 19 / **49** / 129 per month; commercial use from Medium up; Free not commercial | EUR 49/month (Medium) | [stormglass.io/pricing](https://stormglass.io/pricing/) |
| 15 | Visual Crossing | Free commercial use ≤1,000 records/day; metered **USD 0.0001 per record** | USD 0.0001/record | [visualcrossing.com/weather-api](https://www.visualcrossing.com/weather-api) |
| 16 | PredictWind | Consumer subscriptions USD 29/249/499 per year — **app subscriptions, not a data licence**; no public API/redistribution offer found | No data price | [predictwind.com/pricing](https://www.predictwind.com/pricing/) |
| 17 | Meteomatics | Packages Core/Pro/Premium, usage-based, **"talk to our experts"** — no public tariff | `ON_REQUEST` | [meteomatics.com/en/pricing](https://www.meteomatics.com/en/pricing/) |
| 18 | NMEA 0183 | **VERIFIED**: USD 1,150 manufacturer member / USD 7,500 government-industrial-testing / USD 10,000 consumer electronics; **USD 200** mnemonic code; 50% update discount; no online store | USD 1,150–10,000 (tier undetermined) | [nmea.org/nmea-0183](https://www.nmea.org/nmea-0183.html) |
| 19 | NMEA 2000 | Certification mandatory; standard licensed not sold; manufacturer code ≤60 days; per-product codes; class/function broadcast. **Fee table did not render — CONFIRMED** | `UNKNOWN`, remains `null` | [nmea.org/nmea-2000](https://www.nmea.org/nmea-2000.html) |

## 3. What is explicitly NOT granted

- **No chart right.** No provider grants MAREA redistribution, embedding or offline rights. C-MAP forbids commercial use outright; Navionics' free tier forbids a paid product and overlays; UKHO, Shom and IHM terms were not even readable.
- **No weather right beyond open licences.** Only Copernicus Marine, DWD and OSM/EMODnet-class material carry a public grant, and all are subject to attribution, no-warranty, and (for CMEMS) a programme end date.
- **No NMEA right.** No NMEA membership, standard licence, manufacturer code, product code, certification or logo right exists (MC-11 position unchanged; 0183 tariff verified).
- **No offline entitlement anywhere** except public-domain/CC data. OSMF forbids offline tiles explicitly; ODbL permits the *data*, not the tile service.
- **No navigational-authority status** is conferred by any licence in this set. OSM, OpenSeaMap and EMODnet bathymetry are explicitly not charts.
- **No continuity guarantee** from any free source: DWD disclaims availability, Open-Meteo disclaims accuracy/uptime on the free tier, CMEMS funding ends 2028.
- **No price is a quotation.** Stormglass, Visual Crossing, PredictWind and NMEA figures are public tariffs or consumer prices only.

## 4. What is inaccessible or unpriced

| Provider | Gap |
|---|---|
| UKHO | Digital-data EULA PDF unreachable; no redistribution, per-device or price facts |
| Shom (France) | Account/cart portal only; licence PDFs unopenable; no terms read |
| IHM (Spain) | Site returns a JS shell; no terms, no price |
| OpenSeaMap | Portal has no licence statement; `UNKNOWN`, treated as not permission |
| Stormglass | Terms page rendered only a cookie banner — redistribution/caching unknown |
| Meteomatics, PredictWind, Navionics (Enhanced/SDK), IC-ENC | No published data-licence tariff; sales contact only |
| NMEA 2000 fee, NMEA membership fee | Not rendered / 404 — confirmed gaps, **not** to be estimated |

## 5. What a quotation (RFQ) would need to ask

1. Grant: exact rights to store, cache, display, sub-license and redistribute derived tiles; territory; product editions covered (NAV/HUB/AIS/PILOT/WEATHER/FLEET).
2. Term, termination and **survival of cached data** after termination; update entitlement and cadence; stale-data obligations.
3. Per-device / per-user / per-vessel seat definition and metering; concurrent-device rules; offline permits and hardware-ID binding (S-63-style).
4. Price: currency, VAT treatment, minimum commitment, overage, annual uplift, trial/evaluation terms.
5. Attribution wording, logo/mark rules, and any mandated disclaimer ("not for primary navigation").
6. API/SDK access, rate limits, SLA, deprecation notice, security/incident obligations, data-residency.
7. For charts: which hydrographic offices are covered, S-63 credential route, and whether the reseller or the HO is licensor.
8. For NMEA: industry-group classification determination and the full certification/validation timetable.
9. Continuity: what happens if a provider withdraws access or a funding programme ends (CMEMS 2028).
10. Indemnity and liability caps, plus written confirmation that no field in this register is a commitment.

## 6. What MC-12 may and may not conclude

**May conclude**
- A costed data layer cannot be priced today: 0 of 26 records is a quotation, and 7 have no obtainable price at all.
- Chart licensing is a **commercial negotiation**, not a download: the leading official sources are contract-mediated, per-device and territory-bound; the only free chart coverage evidenced is **US waters (NOAA, CC0)**.
- Weather data is the cheap half: DWD (CC BY 4.0) and CMEMS (free to 2028) give real rights; commercial APIs cluster at EUR 19–129/month (Stormglass) or metered micro-costs (USD 0.0001/record, Visual Crossing).
- Offline/cached operation is a **rights problem**, not just an engineering one — it must be licensed, not assumed.
- NMEA 0183 cost is bounded by the verified USD 1,150–10,000 schedule plus USD 200; NMEA 2000 cost remains **unknown**.

**May not conclude**
- That any provider will licence MAREA, or at what price.
- That an open licence makes data navigational or accurate enough for a product claim.
- That a published tariff, price page or fee schedule is available to MAREA — none is a quote.
- That "free to 2028" (CMEMS), "free commercial up to 1,000 records" (Visual Crossing) or "free tier" (Open-Meteo) is a durable commercial foundation.
- That OSM/OpenSeaMap can carry a nautical-chart claim, or that OSM tiles can back an offline chart.
- That NMEA 2000 cost or certification duration can be budgeted; that MC-11's table-not-rendered result can be "filled" by estimation.
- That MC-12 unit economics may treat any of these figures as contractual, recurring, or VAT-inclusive.

**Recommended next action (commercial owner, not engineering):** issue the §5 RFQ to UKHO/IC-ENC, Shom, Navionics-Enhanced, C-MAP commercial and NMEA before any recurring-data revenue model is approved.
