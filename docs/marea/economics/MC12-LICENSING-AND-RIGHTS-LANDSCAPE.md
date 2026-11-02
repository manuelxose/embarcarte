# MC-12 D03 — Licensing and data-rights landscape

| Field | Value |
|---|---|
| Deliverable | D03 `MC12-LICENSING-AND-RIGHTS-LANDSCAPE.md` |
| Owner / date | `licensing-data-rights-researcher` + `programme-lead`, 2026-11-02 |
| Status | `INTERNAL_ECONOMICS_ANALYSIS` |
| Machine companion | [licensing-rights.json](data/licensing-rights.json), [providers.json](data/providers.json) |
| Raw research | [MC12-RESEARCH-CHARTS-WEATHER-NMEA.md](research/MC12-RESEARCH-CHARTS-WEATHER-NMEA.md), [MC12-LEGAL-TAX-RESEARCH.md](research/MC12-LEGAL-TAX-RESEARCH.md) |
| Commercial availability | `NOT_FOR_SALE`; `PRICE_APPROVED = NONE`; `LICENSING_RIGHTS_GRANTED = false` |

## 1. Question and method

The economic question is not "can MAREA display a map?" but "which rights must
EMBARCARTE hold before a customer pays for each product, and which of those rights
are evidenced today?" The answer drives both the revenue claim and the cost
structure, because a data licence is usually a per-account or per-device variable
cost.

Method: public primary sources only, retrieved on 2026-11-02, classified in
[providers.json](data/providers.json) (53 records: 21 published tariffs, 2 public
price observations, 15 official licensing documents, 9 inaccessible, 5 unknown, 0
quotations, 0 contracts). No provider was contacted, no account was created and no
licence was accepted. `FORMAL_PROVIDER_QUOTATION` and `EXECUTED_CONTRACT` do not
appear anywhere in the dataset, by construction.

## 2. Rights actually required, by product

| Product | Right required for the paid value | Status | Binding source |
|---|---|---|---|
| NAV | Commercial redistribution, offline caching and update of official ENC for Spanish/Portuguese waters | `NOT_GRANTED` | IHO S-63 distribution is contract-mediated; UKHO/Shom/IHM terms not public (`PE-CW-003..006`) |
| NAV (Pro) | Commercial display/caching of forecast and tide/current data | `NOT_GRANTED` | No weather data licence (`LR-WEATHER-001`) |
| WEATHER | Commercial re-display of a derived marine forecast with attribution and continuity | `NOT_GRANTED` | Open sources exist, but no commercial re-display contract (`PE-CW-014..022`) |
| HUB, SENSE, DISPLAY, AIS | NMEA 0183 licence; NMEA 2000 certification where claimed | `NOT_GRANTED` | Fee schedule partly published; no licence or certification held (`PE-CW-023..025`) |
| WATCH, FLEET | Cellular connectivity and cloud processing agreement | `NOT_GRANTED` | Published tariffs only; no operator/cloud contract (`LR-CONN-001`, `LR-CLOUD-001`) |
| All software | Production basemap/tile right or self-hosted tile stack | `REQUIRES_CONTRACT` | OSMF tile policy prohibits the required load (`PE-CW-011`) |
| All products | Source-IP clearance | `NOT_GRANTED` (inherited) | MC-02 `SOURCE_IP_CLEARANCE = NOT_CLEARED` |
| All products | MAREA trademark clearance | `NOT_GRANTED` (inherited) | MC-03 `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` |

Nine blocking rights are recorded in `licensing-rights.json` (`LR-*`) and mapped to
the blocker register (`BLK-LIC-01..09`).

## 3. Chart data: the decisive constraint

1. **Free chart coverage is the wrong geography.** NOAA ENC is public domain and
   permits redistribution and commercial use, but it covers United States waters,
   not Galicia, Portugal or the Atlantic coast. It is not a substitute for the
   target market's official ENC (`PE-CW-001`, `PE-CW-002`).
2. **Official ENC access is contract-mediated.** The IHO S-57/S-63 scheme protects
   ENC distribution with data-server and permit arrangements. UKHO (Admiralty),
   Shom and the Instituto Hidrográfico de la Marina publish no public fee schedule
   and their terms could not be read in this session; they are recorded
   `INACCESSIBLE`, not guessed (`PE-CW-004..006`). Even where a cell is
   public-domain, the display/decryption route may still require an agreement.
3. **Commercial chart products cannot simply be bundled.** Garmin/Navionics offers
   a developer/OEM route but publishes no price or redistribution terms; C-MAP's
   EULA restricts the required commercial use; OSM tile policy prohibits heavy
   production use (`PE-CW-007..011`). Anything usable requires a negotiated OEM
   contract, which is not authorised.
4. **Open data is context, not navigation.** OpenStreetMap is ODbL with
   attribution/share-alike obligations; EMODnet bathymetry is free but not
   navigation-grade. Neither establishes a navigational product or a guarantee
   (`PE-CW-010`, `PE-CW-013`, `PE-CW-026`).

Economic consequence: NAV cannot recognise its core subscription revenue until a
chart right exists, and the licence will be a per-account variable cost of unknown
size. The conditional headroom in
[unit-economics.json](data/unit-economics.json) (EUR 71.39 per NAV Essential
account-year, EUR 110.72 per NAV Pro account-year before other unknowns) is the
maximum all-in data allowance, not a margin.

## 4. Weather and forecast data: cheaper, but not licensed

- Copernicus Marine Service and DWD publish open data with attribution conditions;
  they are the cheapest evidence found. Copernicus Marine's continuity is a live
  dependency (a service horizon reported for 2028), so an indefinite right cannot
  be assumed (`PE-CW-014`, `PE-CW-019`, `PE-CW-020`).
- Meteomatics is quote-only; Stormglass publishes a EUR 49/month medium plan;
  Visual Crossing publishes metered per-record pricing; Open-Meteo prices were not
  retrievable. A published self-serve plan is a prototype option, not a negotiated
  right for a paid app (`PE-CW-015..017`, `PE-CW-022`).
- No provider confirmed commercial re-display, caching, SLA continuity, liability
  allocation or attribution wording. `RIGHT = NOT_GRANTED`.

Economic consequence: WEATHER has the lowest data cost of the data products, but at
EUR 49/year gross (EUR 40.50 net) a licence plus API usage consumes a large share of
revenue; the conditional headroom is EUR 35.05 per account-year before the
provider's usage costs.

## 5. NMEA licensing

The NMEA 0183 fee tiers (USD 1,150 manufacturer member / 7,500 / 10,000 and USD 200
mnemonic) are published and were re-verified, but they are a budgetary indication,
not a quotation. The NMEA 2000 fee table and certification route did not render and
are recorded `NOT_PUBLISHED`/`INACCESSIBLE`. No licence, membership or certification
is held, and `NMEA2000_CERTIFIED = false` remains true (`PE-CW-023..025`,
`LR-NMEA-001`, `BLK-LIC-04`).

Economic consequence: any NMEA claim is both unauthorised and an unquantified
one-off plus recurring cost. It cannot be included in a contribution calculation,
only carried as a fixed unknown.

## 6. Connectivity, cloud and map tiles

These are service rights rather than data rights, but they are equally blocking:
no operator, MVNO, cloud or tile agreement exists. Published IoT, cloud,
notification and payment tariffs are classified in
[providers.json](data/providers.json) and modelled in
[recurring-cost-inputs.json](data/recurring-cost-inputs.json). The important
distinction is that a tariff is not a contract, a free tier is not production
eligibility, and terrestrial cellular coverage is not assumed offshore
(`LR-CONN-001`, `LR-CLOUD-001`, `LR-MAP-001`).

## 7. Legal boundaries that no economic model may cross

| Boundary | Consequence |
|---|---|
| AIS transmission is not an authorised MAREA offering; only receive-only integration is in scope | No transmission revenue, service or hardware may be modelled (`BLK-AIS-01`) |
| PILOT safety gate is `BLOCKED` | No PILOT price, contribution or bundle inclusion may be represented as established (`BLK-SAFE-01`) |
| MAREA trademark clearance is `NOT_GRANTED` | No registered-mark claim, brand premium or trademark licensing revenue (`BLK-LIC-09`) |
| Source IP is `NOT_CLEARED` | No IP licensing revenue and no freedom-to-operate claim (`BLK-LIC-08`) |
| CRA cybersecurity obligations apply from 2026-09-11 / 2027-12-11 | Security maintenance is a recurring cost, not a one-off (see [legal-tax-inputs.json](data/legal-tax-inputs.json)) |

## 8. What MC-12 can and cannot conclude

**Can conclude:** no chart, weather, NMEA, connectivity, cloud or tile right is
granted; the cost of those rights is unknown or modelled from public tariffs; NAV
and WEATHER are licensing-blocked regardless of their attractive software margins;
software-first is only viable after a rights route is secured.

**Cannot conclude:** that open data is sufficient for a paid navigation product;
that a published tariff is a negotiable price; that a provider will grant
redistribution; that chart licensing is unaffordable (its price is unknown, not
high); or that any product is cleared for commercial availability.

## 9. Evidence gaps and the RFQ that would close them

| Gap | What must be obtained | Owner |
|---|---|---|
| ENC redistribution | Territory/coverage, offline cache survival, update entitlement, per-device seats, price, attribution | Commercial/Legal |
| Weather re-display | Commercial display right, caching, SLA/continuity, per-call price, attribution, liability | Commercial/Legal |
| NMEA | 0183 licence certificate; NMEA 2000 fee schedule and certification timetable | Engineering/Legal |
| Connectivity | Data allowance, roaming, fair use, suspension, activation, overage, term | Operations |
| Cloud | EU region, DPA, retention, egress, support, price commitment | Engineering/Legal |
| Tiles | Production quota/price or a costed self-hosted stack | Engineering |
| IP and trademark | Clearance opinions | Legal |

Every RFQ package is `NOT_SENT`. Obtaining any of these requires an authorisation
that MC-12 does not have.
