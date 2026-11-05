# MAREA DISPLAY · MAREA WEATHER · MAREA FLEET — Pricing and channel model (MC-07 / D6)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D6 — PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03 |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Date | 2026-10-30 |
| Owner function | Fleet Product Director and B2B Commercial Strategist, with finance and procurement input |
| Status | INTERNAL ONLY · NOT PUBLISHED · NOT FOR SALE · planning framework only. Not a price list, not a quotation, not a commercial offer |
| Scope | Price hypotheses for DISPLAY, WEATHER and FLEET; hardware completion-cost framework for DISPLAY; data/API economics for WEATHER; B2B SaaS unit economics for FLEET; channel, packaging, installation/onboarding and volume frameworks; verified official-source comparators for the three families; the exact evidence later milestones must obtain before any price approval |
| Governing contract | `mc07-brief.md` §4 (the only permitted MAREA figures and their exact status), §17 (batch-03 claim and price discipline); `docs/marea/products/README.md` §4 (pricing dimension), §5 (evidence classes), §6 (24 fields), §16–§17 principles carried over |
| Binding inputs | `docs/marea/COMMERCIAL-PORTFOLIO.md` §07–§09 and the price-and-channel decision rule; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6; `docs/marea/MARKET-BENCHMARKS.md`; `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`; batch-02 counterpart `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` |
| Nature | Internal framework. No approved price exists for any MAREA product, and no figure here may appear in a page, checkout, catalogue, advertisement, quotation or structured-data offer |

## 1. Purpose, and the one thing that must never be misread

This document lets a finance function later complete a per-SKU contribution and quotation worksheet for
the three batch-03 families — one hardware-software product (DISPLAY), one data subscription (WEATHER)
and one B2B SaaS (FLEET) — **without inventing a single figure**, and records what the market actually
publishes, from official pages retrieved on 2026-10-30, described honestly as *categories* rather than
as equivalents.

Every number below is exactly one of:

1. a **programme price hypothesis** permitted by `mc07-brief.md` §4 — `DISPLAY-7` EUR 699 one-off
   (VAT-included consumer retail hypothesis, starting price); `WEATHER-STANDARD` EUR 49/year and
   `WEATHER-PRO` EUR 89/year (consumer subscription hypotheses); `FLEET-START` EUR 49 per vessel/month
   and `FLEET-BUSINESS` EUR 79 per vessel/month (VAT excluded) — all `HYPOTHESIS_UNAPPROVED`;
2. a **verified external comparator** published by another company, with the exact official URL and the
   retrieval date (`VERIFIED_EXTERNAL`), or explicitly `NOT RETRIEVED` / `UNRESOLVED`;
3. an explicitly labelled **planning assumption** (`ASSUMPTION`) or symbolic **cost input**
   (`OPEN`/`BLOCKED`), never used as evidence.

There is **no supplier quotation, no bill of materials, no negotiated channel term, no data-provider
price that is fixed for MAREA, no connectivity contract and no customer willingness-to-pay measurement**
for any of the three families. Price status is `pricing = HYPOTHESIS_UNAPPROVED` and
`availability = NOT_FOR_SALE` for every edition; `DISPLAY-LARGE-CONDITIONAL` and `FLEET-ENTERPRISE`
are `NOT_ESTABLISHED` and may never carry an amount. No hypothesis may become an offer, and no margin,
mark-up, BOM figure or channel percentage may be presented as fact.

## 2. Evidence classes and vocabulary

`VERIFIED_EXTERNAL` = a public statement or price observed at the cited official URL on the cited date;
`HYPOTHESIS` = an unapproved commercial assumption; `ASSUMPTION` = a planning premise used only to
structure a calculation; `OPEN` = not established, with the exact evidence named; `BLOCKED` = an
external condition (quotation, certificate, licence, measurement, legal advice, contract) prevents
closure; `UNRESOLVED` = a page was reached but the needed fact was not retrievable; `NOT RETRIEVED` =
no official page exposing the fact was found. Unresolved facts stay `OPEN`/`BLOCKED`; the prohibited
placeholder token is never used.

## 3. Price hypothesis register — only the figures brief §4 permits

All rows `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`. No hypothesis has been costed, so none can move
to `COSTED_UNAPPROVED`. The frozen invoice/display facts are exactly those of `mc07-brief.md` §4.

| Product | Object | Hypothesis | Currency | VAT basis | Period | Status | What would validate it | Blockers |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DISPLAY | `DISPLAY-7` MAREA DISPLAY 7, 7-inch-class working designation (size NOT frozen) | 699 | EUR | `VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS`, applicable rate `OPEN` pending tax advice | One-off hardware + included base software + warranty window `OPEN` | `HYPOTHESIS_UNAPPROVED` starting price | Frozen industrial design and BOM, real supplier RFQs, test-house quotation, measured assembly/fulfilment, channel terms; **not an inclusive quotation**, installation quoted separately | H-04, H-05, H-06, H-11, H-13, X-05, X-06 |
| DISPLAY | `DISPLAY-LARGE-CONDITIONAL` MAREA DISPLAY Large (conditional) | no amount | — | — | — | `NOT_ESTABLISHED`, `CONDITIONAL` | Selection of a 10/12-inch hardware family, frozen size and costed configuration; `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED` | H-04, H-05, H-06, H-11, X-05 |
| WEATHER | `WEATHER-STANDARD` MAREA WEATHER Standard | 49 | EUR | Consumer subscription hypothesis; VAT treatment `OPEN` | Year | `HYPOTHESIS_UNAPPROVED` starting price | Provider rights, real provider cost per dataset and call volume, hosting and support cost, willingness to pay; coverage limited to licensed sources and declared area/horizon | D-04, D-05, D-07, D-09, D-10, P-08, X-05, X-06 |
| WEATHER | `WEATHER-PRO` MAREA WEATHER Pro | 89 | EUR | Consumer subscription hypothesis; VAT treatment `OPEN` | Year | `HYPOTHESIS_UNAPPROVED` | Multi-model comparison, advanced layers, route context and alerts must be costed per provider entitlement; conditional on provider rights | D-04, D-05, D-07, D-10, P-08, X-05 |
| FLEET | `FLEET-START` MAREA FLEET Start | 49 | EUR | **VAT excluded** (frozen) | Month, per vessel | `HYPOTHESIS_UNAPPROVED` starting price | Hosting, telemetry, storage, support, onboarding and payment cost per vessel; validated willingness to pay; approved limits. Suggested band 1–10 vessels; organisation fee hypothesis: none | P-09, H-12, X-05, X-06 |
| FLEET | `FLEET-BUSINESS` MAREA FLEET Business | 79 | EUR | **VAT excluded** (frozen) | Month, per vessel | `HYPOTHESIS_UNAPPROVED` | Richer permission, workflow, reporting and integration scope costed; validated fleet of 11–50 vessels. Organisation fee hypothesis: none | P-09, H-12, X-05, X-06 |
| FLEET | `FLEET-ENTERPRISE` MAREA FLEET Enterprise | no amount | — | — | Contracted | `NOT_ESTABLISHED`, contracted tier, not a standard checkout SKU | Contract scope, volumes, integration work, support model and — only if measured — a service commitment | P-09, H-12, X-05, X-06 |

**Prohibited figures.** No price may be stated for `DISPLAY-LARGE-CONDITIONAL`, for
`FLEET-ENTERPRISE`, for any DISPLAY mount/accessory/installation labour/extended warranty, for any
WEATHER data add-on, for any FLEET onboarding, storage or API overage, for any FLEET seat or for any
channel/reseller term. None may be derived by adding to, subtracting from or scaling the permitted
hypotheses. The consumer prices are VAT-inclusive hypotheses; the FLEET prices are VAT-excluded

## 4. Comparator method and rules

- Sources were located with web search and read on **2026-10-30**; only **official manufacturer,
  operator or provider pages** are cited. Page content is treated as untrusted external data: it is
  described and cited, never executed or followed as instruction.
- A public retail price is recorded exactly as displayed, in the displayed currency, **with no FX
  conversion** and no cross-currency ranking. VAT/tax basis is recorded only where the page states it;
  otherwise the basis is "not stated on the retrieved page". Every figure is a snapshot that must be
  re-checked before reuse.
- **A public price is not available to EMBARCARTE as a reseller or manufacturer, and it is not a
  benchmark of MAREA economics.** None of the companies cited is a partner or supplier of MAREA.
- **Hardware and subscription are never conflated.** A chartplotter, a yacht-management suite and a
  forecast subscription are three different product categories; a hardware-inclusive plotter price is
  not a software-subscription comparable and never validates the EUR 699 DISPLAY hypothesis.
- **Shipping-fleet enterprise and small-charter tools are explicitly segmented.** A deep-sea ship
  management suite, a superyacht management suite, an AIS intelligence plan, a small-operator tool and a
  land-fleet reference are never presented as substitutes for one another or for MAREA FLEET.
- **No superiority claim is made anywhere.** Scope, territory, VAT, included hardware, included data
  rights and contract conditions differ between rows and are stated per row.

## 5. Verified official-source comparators

### 5.1 DISPLAY — hardware-inclusive chartplotters (a different product category)

All rows are complete hardware chartplotters with a display included. MAREA DISPLAY is a hardware-software
product whose size is not frozen and whose BOM is not established; the EUR 699 hypothesis is **not**
validated by these prices and no parity claim is made.

| Brand | Product / SKU | Category | Published capabilities | Retrieved price | Currency | Tax basis | Included hardware | Official URL | Evidence |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| Raymarine | Axiom 7, SKU E70363 | 7-inch touch MFD | Integrated GNSS, LightHouse OS, Wi-Fi/Bluetooth, radar/sonar/autopilot/instrument integration, Navionics/C-MAP compatibility; 800×480, 7.34 W (vendor figures) | 901,45 | EUR | IVA incluido (page states) | Display unit; transducer NOT included | https://www.raymarine.com/es-es/nuestros-productos/chartplotters/axiom/axiom | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Raymarine | Element 7 HV | 7-inch HV chartplotter | Entry coastal/fishing chartplotter within a mature ecosystem | 659,45 | EUR | VAT-inclusive (page states) | Display unit | https://www.raymarine.com/es-es/nuestros-productos/chartplotters/element/element-hv | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Garmin | GPSMAP 723 non-sonar, worldwide basemap, PN 010-02365-00 | 7-inch IPS chartplotter | GNSS, chartplotter/radar/sailing bundle options, Navionics+ options (vendor) | 1,199.99 | USD | Tax not stated on the retrieved page (US listed price) | Display unit; basemap variant as listed | https://www.garmin.com/en-US/p/697252/pn/010-02365-00/ | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| B&G | Zeus 3S (7/9/12 family) | Sailing/racing MFD | Sailing-specific MFD, quad-core, touch, sunlight-visibility design (vendor) | No price published on the retrieved official pages | — | — | Display unit (not verified) | https://www.bandg.com/es-es/noticias/new-zeus3s-sailing-display/ ; https://www.bandg.com/es-es/bg/type/chartplotters/ | `VERIFIED_EXTERNAL` capability; price `OPEN`, not zero |
| Simrad | NSX (5/7/9 family) | Mid-size MFD | NSX MFD, custom dashboards, C-MAP DISCOVER/REVEAL X (vendor) | No price published on the retrieved official pages | — | — | Display unit (not verified) | https://www.simrad-yachting.com/es-es/nsx/ | `VERIFIED_EXTERNAL` capability; price `OPEN`, not zero |

### 5.2 WEATHER — consumer forecast subscriptions and provider API terms

The consumer subscription comparators below are **software subscriptions**; the provider rows are
**data/API supply terms**. Neither category is a MAREA price, a MAREA cost or evidence of MAREA
forecast accuracy.

| Provider / competitor | Product / edition | What it is | Retrieved price / terms | Currency | Tax basis | Official URL | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PredictWind | Free / Basic / Standard / Professional | Forecast app/web plus offshore app; 11 forecast models; routing and departure planning from Standard; advanced routing, polars and boat motion from Professional (vendor) | Free $0; Basic $29/year; Standard $249/year; Professional $499/year; 3-month satisfaction guarantee (vendor) | USD | Taxes "may apply" and are added at checkout, so displayed prices exclude tax | https://www.predictwind.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Windy | Premium consumer subscription | Forecast visualisation subscription | `UNRESOLVED` — official page returns a client-rendered shell with no static price or edition table; no official pricing page exposing amounts was located | — | — | https://www.windy.com/premium | `UNRESOLVED` checked 2026-10-30; must not be quoted |
| Windy | API | Weather data API | `UNRESOLVED` — API exists (20+ parameters, map layers) but no price or plan table was served in retrievable content; commercial terms unresolved | — | — | https://api.windy.com/ | `UNRESOLVED` checked 2026-10-30 |
| Orca (context anchor already in the repository benchmark) | Orca Plus; Smart Navigation | Navigation-plus-weather software alternative | Plus EUR 49/year; Smart Navigation EUR 149/year | EUR | Not stated in the cited benchmark row | https://help.getorca.com/en/articles/6541858-subscription-prices-and-functionality | `VERIFIED_EXTERNAL` via `docs/marea/MARKET-BENCHMARKS.md` (check date 2026-10-30) |
| Open-Meteo | Free API and paid plans | Weather API and data licence | Free API is **non-commercial only** (≤10,000 calls/day, 5,000/hour, 600/minute); a paid plan is required for a paid service; data licence CC BY 4.0 with mandatory attribution; paid plans add commercial-use licence and a dedicated endpoint; paid plan **amounts were not exposed** in retrievable content | — | — | https://open-meteo.com/en/terms ; https://open-meteo.com/en/pricing | `VERIFIED_EXTERNAL` terms; paid price `UNRESOLVED`; free tier `NOT_PERMITTED_FOR_PAID_SERVICE` |
| Copernicus Marine | Marine data licence 2.2 and service commitments | Ocean/marine model and observation data | Worldwide, non-exclusive, royalty-free, perpetual rights to copy, modify, create derivatives and redistribute originals; free of charge until end of programme (planned 30 June 2028); mandatory credit and DOIs; service commitments published | — | — | https://marine.copernicus.eu/user-corner/service-commitments-and-licence | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| EMODnet | Terms of use for online services and data products | EU marine data products | EU-owned products CC BY 4.0 with prescribed acknowledgement; no warranty; per-dataset originator metadata must be checked | — | — | https://emodnet.ec.europa.eu/en/terms-use-emodnet-online-services-data-and-data-products | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| AEMET | Nota Legal | Spanish meteorological data | Commercial and non-commercial reuse of covered documents with attribution and immutability conditions; AEMET NWP output is not open data (MC-02 D-07) | — | — | https://www.aemet.es/es/nota_legal | `VERIFIED_EXTERNAL` terms; NWP position `LEGAL_REVIEW_REQUIRED` |
| MeteoGalicia | Aviso legal | Regional meteorological data | `UNRESOLVED` — the official legal-notice URL returned 404 and the site root is a cookie shell | — | — | (official notice not retrievable) | `UNRESOLVED` checked 2026-10-30; matches D-07 |
| Puertos del Estado | Aviso legal | Spanish port/coastal data | `UNRESOLVED` — the legal notice timed out twice | — | — | (official notice not retrievable) | `UNRESOLVED` checked 2026-10-30; matches D-07 |
| OpenWeather | Startup / Developer / Professional / Expert; one-call | Weather data API | Startup £30/month; Developer £140/month; Professional £370/month; Expert £1,200/month; one-call £0.0012/call after 1,000 free/day; **terms page returned 404**, so sublicensing/resale is unresolved (repository row MD-20 records "no sublicense or resale" as `LEGAL_REVIEW_REQUIRED`) | GBP | Tax basis not stated on the retrieved page | https://openweathermap.org/price | `VERIFIED_EXTERNAL` price; terms `UNRESOLVED` checked 2026-10-30 |

### 5.3 FLEET — segmented marine operations software (and one explicitly non-marine reference)

Segment labels are binding. A ship-management suite is not a small-charter tool; a yacht-management
suite is not a shipping ERP; an AIS intelligence plan is not operations software; and a land-fleet
product is not marine at all.

| Segment | Product / edition | Buyer the page addresses | Published capabilities | Retrieved price | Currency | Tax basis | Contract conditions as published | Official URL | Evidence |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| Professional maritime / ship management | Full Ahead Maritime — Vessel / Ocean / Fleet / Squadron | Technical managers and ship operators | Predictive PMS, statutory certificate register, drills as jobs, audit evidence library, EU ETS/FuelEU reporting; self-configured, no implementation project | €1,490/yr up to 5 ships; €2,990/yr up to 10; €4,990/yr up to 25; €7,990/yr up to 50; "from €149/month" | EUR | VAT basis not stated on the retrieved page | Annual billing with two months free; above 50 ships by discussion | https://fullaheadmaritime.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Professional maritime / ship operations | UOC International — UOC Core; 2-Vessel Annual | Ship operators and fleet managers | Fleet monitoring, crew management, noon reports, location validation, fuel monitoring, provisioning, role-based access | €259 per vessel/month; 2-vessel annual €4,900/yr (about €204 per vessel/month by the page's own arithmetic); custom development packages €600/€1,350/€2,400 | EUR | VAT basis not stated on the retrieved page | 30-day pilot; no per-user charges claimed | https://uocintl.com/platform/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Professional maritime / crew and fleet operations | Seafarers.pro — Starter / Professional / Enterprise | Small to large fleet operators and agencies | Crew management, certificate tracking, rosters, PMS, procurement, QHSE, reporting, API, white-label; published volume discounts 10–25%; page claims a 99.9% SLA on Enterprise (vendor claim, not verified) | €150 / €240 / €360 per vessel/month; edge add-on €70 per vessel/month | EUR | VAT basis not stated on the retrieved page | Annual billing = 10 months; 30-day pilot; 40% first-year launch offer (vendor's) | https://www.seafarers.pro/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Vessel management and compliance | Vessel Vanguard — fleet plans (quoted) | Commercial fleet operators, vessel managers, government programmes | Vessel management, safety, compliance; custom quoting by vessel count and modules; page claims "3,000+ vessels managed" (vendor claim, not verified) | No published price; custom quote | — | — | Annual billing discounted versus monthly; Enterprise adds API, SSO, custom SLAs | https://www.vesselvanguard.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30; price `OPEN`, not zero |
| Superyacht management | YMS360 — Essentials / Operations / Compliance | Yacht managers and captains | Maintenance, equipment/inventory, crew, purchasing, logbooks, guest management, hours of rest, SMS/ISPS libraries, certification | $300 / $500 / $650 per month (flat; unlimited users/devices as published) | USD | Tax basis not stated on the retrieved page | Monthly/annual toggle; online deployment free | https://yms360.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Superyacht / yacht operating system | YOS Yacht Operating System — Captain / Vessel / Fleet | Captain-managed yachts to management companies | 21–40+ modules, offline-first, RBAC, audit trail; fleet portal and API on Fleet | €149 / €249 / €449 per month; Fleet includes 2 vessels plus €199/month per additional vessel; hosted server €59/month; live telemetry €49/month; onboarding €500–€5,000; telemetry onboarding typically €990 | EUR | **Excluding VAT** (stated) | Annual billing saves two months; quoted work never charged at checkout | https://yos.yachts/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Yacht management and charter | Scyllastar — one price per yacht, all modules | Yacht owners, managers and charter operators | Accounting, charter, crew and vessel modules in every plan; unlimited users; 24/7 support claimed; free migration | €99 (up to 20 m) / €199 (20–30 m) / €299 (30–40 m) / €399 (40 m+) per yacht/month | EUR | **Excluding VAT**; billed annually in advance (stated) | 30-day trial then 30-day money-back; price follows the yacht | https://scyllastar.com/pricing/ | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| AIS / maritime intelligence (not operations SaaS) | Rynda — Enterprise | Fleet teams needing tracking and market intelligence | Fleet and zones, alert rules, position updates up to 20 minutes, history archive, seats, documents | $5.18 per vessel/month for 50–150 vessels (minimum $259/month); extra seat $69/month | USD | Tax basis not stated on the retrieved page | One-off payment for the term, no auto-renewal; 6 months −5%, 12 months −10% | https://rynda.io/support/knowledge-base/enterprise-plan | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Land fleet maintenance (explicitly NOT marine) | Fleetio — Essential / Professional / Premium | Land vehicle fleet managers | Asset records, inventory, inspections, maintenance, work orders, reporting, integrations | $4 / $7 / $10 per vehicle/month billed annually; Essential $5 billed monthly | USD | Tax basis not stated on the retrieved page | 14-day trial; annual-only for Professional/Premium | https://www.fleetio.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30; non-marine reference only |

### 5.4 What the retrieved comparator evidence actually shows

1. **Every family has mature competitors.** That is a commercial fact, not a MAREA differentiation
   claim, and it makes the evidence discipline stricter, not looser.
2. **DISPLAY:** every retrieved plotter is hardware-inclusive; two published Spanish prices sit in the
   same order of magnitude as the EUR 699 hypothesis, but with different size, included charts, included
   hardware and tax positions. The comparison proves a category, not the hypothesis.
3. **WEATHER:** consumer forecast subscriptions span from free/nominal to several hundred dollars a
   year; provider API terms and prices are heterogeneous, several are unresolved, and at least one free
   tier is explicitly non-commercial. Nothing here validates EUR 49 or EUR 89.
4. **FLEET:** per-vessel monthly pricing is the established shape in professional maritime software;
   published prices span a very wide range by segment, annual billing and volume discounts are normal,
   onboarding is frequently quoted separately, and several suites are quote-only. The intended FLEET
   segment sits between per-yacht management and per-vessel shipping operations, and no official price
   page for that exact segment was retrieved.
5. **No market share, growth rate, revenue or customer count is inferred from any page.**

## 6. What the comparator evidence does not establish

- It establishes a published point on a date. It establishes **no** supplier cost, BOM, import duty,
  freight, certification cost, support cost, channel margin, data-provider price for MAREA, conversion
  rate, market size, forecast, willingness to pay or achievable price for EMBARCARTE.
- Currency, tax basis, territory, included accessories, included charts/data, subscription content and
  installation scope differ between rows; **no net-price ranking is computed or implied**.
- No statement here claims that a MAREA product is cheaper, better, equivalent or competitive. No
  vendor's performance language is repeated as a MAREA claim, and no vendor is named in customer copy.

## 7. DISPLAY — hardware completion-cost framework (below-hardware, no BOM)

**Rule: no numeric value may be entered in these tables without a real supplier quotation, test-house
quotation or measurement.** Each symbol resolves to `OPEN` or `BLOCKED` today. The categories follow
Master Prompt §6.7; the exact BOM is `BOM_NOT_ESTABLISHED` and the size is `SIZE_NOT_FROZEN`.

| Symbol | Cost input (what it is) | Behaviour | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `C_PANEL` | Display panel (size class not frozen, sunlight/contrast class required target), bonding, backlight | Variable per unit + NRE | `BLOCKED` | Panel selection against a REQUIRED_TARGET specification and a supplier quote (H-11) |
| `C_TOUCH` | Touch layer and controller (wet/glove operation only if physically verified) | Variable per unit | `BLOCKED` | Touch technology decision + quote; no claim before measurement |
| `C_COMPUTE` | Compute module, memory, storage, radios (Wi-Fi/Bluetooth; cellular only if a connectivity decision exists) | Variable per unit | `BLOCKED` | Frozen architecture + module RFQs (H-04, H-12, H-13) |
| `C_STORAGE` | Internal storage and its sizing for offline maps/data, updates and logs | Variable per unit | `OPEN` | Storage sizing decision + quote |
| `C_ENCL` | Enclosure, bezel, gasket, seals, mounting interface, IP-class target (not a rating until tested) | Variable per unit + tooling NRE | `BLOCKED` | Industrial design freeze + tooling quote; ingress test plan (H-05, H-11) |
| `C_THERMAL` | Thermal design: heatsink, spreader, fanless design validation, sun-load analysis | NRE + variable per unit | `BLOCKED` | Thermal simulation + chamber test quotation |
| `C_MOUNT` | Mounting system (bracket, RAM-style arm or fixed mount), fixings | Variable per unit + tooling | `OPEN` | Mount design decision + quote; mount may be sold separately and must be stated |
| `C_PWR` | Power conversion and protection: 12/24 V input, fuse, reverse-polarity, transient protection, consumption budget | Variable per unit | `BLOCKED` | Electrical design review + component quotes (H-11) |
| `C_PROT` | Environmental protection measures (conformal coating, breathers, corrosion-resistant materials) | Variable per unit | `OPEN` | Design freeze + process quote |
| `C_CONN` | Connectors, glands, harness, cable set, NMEA 0183/2000 interface items where selected | Variable per unit/installation | `BLOCKED` | Connector and harness drawing + quotes (H-04, H-06) |
| `C_SW` | Base software: operating environment, local dashboards, instrument/AIS/NAV presentation, configuration, backup, update mechanism; firmware maintenance | NRE + recurring maintenance | `OPEN` | Engineering plan and maintenance estimate; `USER_IP` clearance (L-01–L-03) |
| `T_TEST` | Development and production test: bench, burn-in, functional test jig, EMC pre-scan | NRE + variable per unit | `BLOCKED` | Test plan + test-house and jig quotes (H-05, H-06) |
| `C_ENV` | Environmental validation: thermal, humidity, vibration, ingress, salt-mist where applicable; **not a rating until evidence exists** | Fixed NRE per design generation | `BLOCKED` | Accredited test-house quotation and test plan |
| `C_CERT` | Conformity: CE marking route, EMC/LVD/RED applicability, GPSR, CRA, WEEE/RoHS; technical file, manuals | Fixed NRE per family | `BLOCKED` | Conformity route decision + accredited test quotation (H-06, H-13) |
| `C_PACK` | Packaging: box, inserts, ESD protection, multilingual labels and quick-start, artwork | NRE + variable per unit | `OPEN` | Packaging quote + artwork localisation |
| `FULFIL` | Freight, warehousing, fulfilment, returns handling | Variable/recurring | `OPEN` | Carrier/3PL rate cards |
| `PAY` | Payment processing and chargeback fees | Variable per order | `OPEN` | Payment-provider schedule |
| `R_WARR` | Warranty reserve: expected failure rate × replacement + labour + logistics | Recurring accrual | `BLOCKED` | Reliability data + written warranty terms (X-02) |
| `C_SUP` | Technical support, RMA handling, spare parts, out-of-warranty service | Recurring | `OPEN` | Support model + measured ticket rate |
| `M_INST` | Distributor/installer economics: installer margin, installation labour quote, first-line support, warranty handling | Channel margin | `BLOCKED` | Written installer/distributor terms (X-05, X-06) |
| `VAT_D` | VAT/duty per territory | Tax | `OPEN` | Written tax advice |

DISPLAY contribution (symbolic only):

```text
NR_DISP   = G_DISP / (1 + v)                        net revenue from a VAT-inclusive retail hypothesis
VC_DISP   = C_PANEL + C_TOUCH + C_COMPUTE + C_STORAGE + C_ENCL_alloc + C_THERMAL_alloc + C_MOUNT
            + C_PWR + C_PROT + C_CONN + C_PACK + FULFIL + PAY + R_WARR + C_SUP_alloc + M_INST
C1_DISP   = NR_DISP - VC_DISP                       contribution per unit (not computed)
F_DISP    = tooling + C_ENV + C_CERT + C_SW_NRE     fixed NRE to amortise
BE_DISP   = F_DISP / C1_DISP                        break-even units (not computed)
```

Hardware vs software boundary that must be respected in costing: DISPLAY's **base included software**
(device OS, local dashboards, instrument/AIS/NAV presentation, configuration, backup, updates during
warranty) is inside the hardware price; **separate** are charts (D-01), WEATHER entitlement, NAV
subscription, HUB, AIS receiver, adapters, extra mounts and installation labour. Costing the base
software inside the device while charging separately for the data entitlements is a commercial decision
that must be stated, never blurred.

## 8. WEATHER — data/API economics framework

WEATHER is a data service: its marginal cost is driven by **provider entitlements and call volume**, not
by units shipped. Every symbol below is a framework input, not an amount. Provider rights are
`NOT_GRANTED`; at least one free tier is `NOT_PERMITTED_FOR_PAID_SERVICE` (Open-Meteo).

| Symbol | Cost input | Behaviour | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `C_PROV` | Provider subscription or enterprise agreement per dataset (wind, waves, currents, tides, pressure, temperature, precipitation, visibility) | Recurring fixed per provider + tier | `BLOCKED` | Written provider terms and price schedule for commercial redistribution/display (D-04, D-05, D-07, D-10) |
| `C_API` | API call volume and overage cost per provider, per model, per call type | Recurring variable | `BLOCKED` | Provider call limits and price list; call-volume model per forecast cycle |
| `C_PROC` | Processing: ingestion, normalisation, unit conversion, model comparison, derived fields, gridding | Recurring variable | `OPEN` | Engineering estimate + hosting quote at named volumes |
| `C_STORE` | Storage of forecast snapshots, observations, history and user data; retention decision | Recurring variable | `OPEN` | Retention decision + provider quote |
| `C_CACHE` | Caching and CDN to reduce provider calls and serve forecast tiles | Recurring variable | `OPEN` | Cache architecture + CDN quote |
| `C_CMP` | Multi-model comparison and advanced layers (Pro): compute and data cost per additional model | Recurring variable | `BLOCKED` | Provider entitlement per additional model (D-05) |
| `C_HOST` | Application hosting, API serving, background jobs, monitoring | Recurring fixed + variable | `OPEN` | Hosting quote |
| `C_SUP_WX` | Support per subscriber and per data incident | Recurring | `OPEN` | Support model + measured ticket rate |
| `PAY_WX` | Payment, invoicing, refunds and chargebacks | Variable per transaction | `OPEN` | Payment-provider schedule |
| `CAC_WX` | Acquisition cost per paying subscriber | Variable per subscriber | `OPEN` | Measured acquisition (X-06) |
| `CHURN_WX` | Renewal/churn per cohort | Recurring driver | `OPEN` | Observed cohort from a pilot |
| `C_MON` | Availability monitoring of providers and of the service; provider outage handling | Recurring | `OPEN` | Monitoring design + provider SLA evidence (none granted) |
| `C_REGION` | Regional expansion: new provider agreement, new datasets, coverage validation, localisation | NRE + recurring per region | `BLOCKED` | A signed regional data agreement (D-10) |
| `ATTRIB` | Attribution obligations: credit lines, DOIs, links required by licence | Process cost, not a fee | `OPEN` | Provider terms transcribed into product requirements |
| `L_REV` | Revenue-share or commercial-use uplift if a provider charges for redistribution | Recurring variable | `BLOCKED` | Written provider agreement |

**Cost per variable and margin sensitivity.** The unit of analysis is one **licensed variable × one
region × one forecast horizon × one model**, because provider terms and prices are sold that way. The
sensitivity method (no results asserted):

```text
cost_per_variable_month = C_PROV_share + C_API_share + C_PROC_share + C_STORE_share + C_CACHE_share
subscriber_contribution = (G_WEATHER_yearly / 12) / (1 + v) - cost_per_subscriber_month
payback_months          = CAC_WX / contribution_per_subscriber_month
coverage_decision       = a variable/region is included only if its provider right is GRANTED and its
                          contribution at the planned subscriber base is non-negative
```

The decisions that must be made before any WEATHER price is approved: which variables and regions are in
Standard and in Pro; how many models Pro compares; the forecast horizon; cache and refresh policy; the
provider call budget per subscriber; whether any provider charges for redistribution; and what happens
when a provider is unavailable. **No provider right is granted today, so no cost can be locked and no
price can be approved.** The EUR 49 and EUR 89 hypotheses are cost-gated, not revenue evidence.

## 9. FLEET — B2B SaaS unit-economics framework

FLEET's economics are per organization and per vessel. The framework follows Master Prompt §8.6. Every
symbol is a framework input; none is an amount.

| Symbol | Cost/income input | Behaviour | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `R_VESSEL` | Per-vessel monthly subscription rate (Start or Business hypothesis) | Recurring revenue | `HYPOTHESIS_UNAPPROVED` | Costed unit economics + approved price list (X-05) |
| `N_VESSELS` | Active vessels per organization | Volume driver | `OPEN` | Pilot cohort |
| `C_HOST_F` | Multi-tenant hosting: compute, database, object storage, search, queues per organization and per vessel | Recurring variable | `OPEN` | Cloud quotation at named volumes |
| `C_TELEM_F` | Telemetry ingestion, processing, storage and egress per vessel and per data class | Recurring variable | `BLOCKED` | Ingestion design + provider quote (P-09, H-12) |
| `C_NOTIF_F` | Notification providers (email, SMS, push) per message and per channel | Recurring variable | `BLOCKED` | Provider price schedule |
| `C_MAP_F` | Mapping/basemap licence if a map surface is included | Recurring fixed/variable | `OPEN` | Map-provider terms (D-10) |
| `C_SUP_F` | Support minutes per organization and per vessel × loaded hourly cost | Recurring variable | `OPEN` | Support model + measured tickets |
| `C_ONB` | Onboarding: delivery hours, migration, training, configuration per organization | Variable per organization | `OPEN` | Measured onboarding hours (X-05, X-06) |
| `C_MIG` | Data migration cost when scoped | Variable per organization | `OPEN` | Migration tooling estimate + pilot data |
| `C_PAY_F` | Payment processing, invoicing, dunning, tax handling, refunds | Variable per transaction | `OPEN` | Payment-provider schedule |
| `C_SALES` | Sales and marketing per new organization: demos, pilots, travel, partner commission | Variable per organization | `OPEN` | Measured acquisition (X-06) |
| `M_PARTNER` | Partner/installer margin or referral fee | Channel margin | `BLOCKED` | Written partner terms (X-05, X-06) |
| `C_SEC` | Security operations, vulnerability handling, penetration tests, audit, insurance, CRA maintenance | Recurring fixed | `BLOCKED` | Security programme + quotes (H-13, X-07) |
| `CHURN_F` | Vessel and organization churn per cohort | Recurring driver | `OPEN` | Observed cohort |
| `EXP_F` | Expansion: vessel additions and Start→Business upgrades within existing organizations | Recurring driver | `OPEN` | Observed cohort |
| `DISC` | Annual prepayment and volume discount | Revenue reduction | `OPEN` | Commercial decision + costed ceiling |

The metric definitions and formulas are those of the FLEET dossier §12.2–§12.3 and are not duplicated as
figures here. The model must report, at minimum: MRR, ARR run-rate, ARPA, per-vessel gross margin,
CAC payback, GRR, NRR, gross churn by reason, cost to serve per vessel and per organization, onboarding
cost per organization, support cost per vessel, telemetry cost per vessel and partner margin as a share
of revenue. **No value for any of them is asserted in this document, because every input is
`OPEN`/`BLOCKED`.**

**FLEET packaging and price architecture rules:**

1. Per-vessel monthly is the billable unit; VAT is excluded from the frozen hypotheses.
2. Organisation fee: hypothesis is none in Start and Business; Enterprise negotiated. This is a
   hypothesis, not an approved term, and must be decided before any pricing page exists.
3. Seats are included and not charged per seat in Start and Business; Enterprise seats are contractual.
4. Onboarding is separately quoted and must be costed before it is offered as "included" anywhere.
5. Every limit (vessels, users, storage, telemetry history, API calls, integrations, support) must be a
   published number or range with a stated over-limit behaviour. **No "unlimited" claim is permitted.**
6. Enterprise is a contracted tier: no list price, no checkout SKU, no implied SLA or certification.


## 10. Packaging, bundles and channel strategy

### 10.1 Packaging principles

1. **One product, one commercial object.** A subscription, a hardware unit, a data entitlement and a
   service are never sold as an ambiguous "package" whose contents the buyer cannot enumerate.
2. **Contents are enumerable before purchase.** Every offer must list included items, excluded items,
   limits and what happens at the limit; no hidden inclusion and no dependency presented as a bonus.
3. **Hardware and subscription are separate lines.** A DISPLAY purchase includes the device and its base
   software; charts, WEATHER, NAV, HUB, AIS and installation are separate. A FLEET subscription includes
   the SaaS entitlement; onboarding, WATCH/HUB hardware and connectivity are separate. A WEATHER
   subscription includes licensed data access; device or navigation software is separate.
4. **The bundle is a distinct object.** The MAREA bundles (START, CRUISE, SAIL, PROTECT, COMPLETE,
   FLEET) are governed by MC-08; this document does not define, price or publish them. The **MAREA FLEET
   package** is the integrated fleet offer (SaaS + onboarding + device supply + installation + WATCH +
   HUB + connectivity + professional support) and is not included in any FLEET subscription.
5. **No "free" claim without a costed basis.** "Free trial", "free tier" or "included" may only be used
   when the underlying cost and the duration are decided and published; none is today.
6. **No consumer price is a B2B price.** Consumer VAT-inclusive hypotheses never appear in a B2B
   quotation, and B2B prices are quoted ex-VAT.

### 10.2 Packaging per family

| Product | Intended commercial units | What each unit contains | What it never contains | Status |
| --- | --- | --- | --- | --- |
| DISPLAY | `DISPLAY-7` device (one-off); `DISPLAY-LARGE-CONDITIONAL` future family without price | Panel, compute, storage, enclosure, mounting interface, documented cable/power items, base software, warranty window as written | Charts, WEATHER entitlement, NAV subscription, HUB, AIS receiver, adapters, extra mounts, installation labour | `DISPLAY-7` hypothesis only; Large `NOT_ESTABLISHED` |
| WEATHER | `WEATHER-STANDARD`; `WEATHER-PRO` (annual subscriptions) | Licensed data access within declared coverage, horizon and model set, attribution and freshness display | Forecast guarantee, exclusive rights, redistribution/offline rights, device, navigation software, charts | Hypotheses only; provider rights `NOT_GRANTED` |
| FLEET | `FLEET-START`; `FLEET-BUSINESS`; `FLEET-ENTERPRISE` (contracted) | Platform entitlement, role model, published limits, support entitlement of the edition | Hardware, installation, connectivity, data licences, onboarding unless contracted, custom work | Hypotheses only; Enterprise `NOT_ESTABLISHED` |
| MAREA FLEET package (MC-08) | Bespoke integrated fleet offer | SaaS + onboarding + device supply + installation + WATCH + HUB + connectivity + professional support, as defined by MC-08 | Any claim that the package is included in a subscription | `OPEN`; not priced, not published |

### 10.3 Channel strategy

| Motion | How it works | Where it applies | Status |
| --- | --- | --- | --- |
| Direct consumer sale (D2C) | EMBARCARTE sells, invoices, fulfils and supports the software/subscription | WEATHER subscriptions once rights exist; DISPLAY once hardware exists | `OPEN` — no shop, no stock, no approved price |
| Installer-led hardware sale | Installer assesses the helm, proposes and installs the DISPLAY with mounting and power work; EMBARCARTE owns product definition, compatibility authority and warranty | DISPLAY (only credible route for fixed helm installation) | `BLOCKED` — no installer network, agreements or rate cards (X-05, X-06, H-11) |
| B2B direct sale | EMBARCARTE sells the organization subscription, onboards and supports; hardware/installation are separate purchases | FLEET Start and Business | `BLOCKED` — no terms, no DPA, no onboarding operation (P-09, X-07) |
| B2B contracted sale | Named account, scoped contract, contracted volumes/service model, delivery owner | FLEET Enterprise; large flotillas | `BLOCKED` — no contract, no delivery capacity |
| Partner / referral | Marina, school, association or installer introduces an organization; referral or margin terms apply | FLEET and DISPLAY after a pilot | `OPEN` — no agreement; no margin percentage exists |
| Distributor / reseller | Stock, installation interface, first-line support, warranty handling | DISPLAY at scale; never before product and conformity exist | `OPEN` — no distributor terms |

**Channel principles.** (a) Installation and onboarding labour are always priced separately and never
folded invisibly into a product price; "installation included" language is prohibited while no
installation price exists. (b) A trade discount is the price of real partner services, derived from the
contribution model, never from a competitor's price list. (c) No reseller or distributor agreement
exists; nothing in this document constitutes one. (d) A channel partner must never be asked to quote a
hypothesis as if it were an approved price.

## 11. Installation and onboarding economics

These are the human-work cost objects that the price hypotheses do **not** include. No duration and no
price is stated because none is measured.

| Object | Intended scope | Cost drivers (symbolic) | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| DISPLAY installation | Helm assessment, mounting, power and protection wiring, instrument/NMEA/network connection where supported, configuration, function test, handover, installation record | Hours × rate, travel, mounting hardware, cable/harness labour, risk allowance for difficult helms | `BLOCKED` | Measured installation hours across representative vessels (X-05, X-06) |
| DISPLAY commissioning | Firmware update, dashboards, instrument and data-source configuration, owner training | Hours × rate + test time | `BLOCKED` | Measured commissioning hours |
| WEATHER onboarding | Account and entitlement activation, coverage explanation, NAV/device linking where applicable | Support minutes, documentation | `OPEN` | Support model + trial data |
| FLEET onboarding (Start/Business) | Organisation verification, vessel/equipment inventory, role design, configuration, invitations, integration authorisation, report setup, acceptance | Delivery hours, migration effort, training sessions, travel if on site | `OPEN` | Measured onboarding hours per organization (X-05, X-06) |
| FLEET migration | Import from spreadsheets, an existing system or an owner's records; data cleaning and validation | Data volume, schema mapping, reconciliation, testing | `OPEN` | Migration tooling + pilot data |
| FLEET Enterprise onboarding | Contracted project: governance design, integration scope, migration, training, acceptance criteria | Project management, solution design, engineering, training | `BLOCKED` | Signed Enterprise contract with scope |
| Support escalation | Case handling beyond first-line, incident response, out-of-hours if ever contracted | Support engineering time, on-call, tools | `BLOCKED` | Support model + contract (X-05) |
| Training content | Bilingual manuals, quick-start, video or on-site training | Content production, localisation, maintenance | `OPEN` | Content plan + localisation quote |

Rule: onboarding may be offered as "included" only after its cost is measured and a specific inclusion is
decided and published. Until then, every onboarding offer is a quotation.

## 12. Volume, discount and contract framework

| Mechanism | Intended basis | Status | Guardrails |
| --- | --- | --- | --- |
| FLEET annual prepayment | Annual term preferred; discount not decided | `OPEN` | Discount must clear the costed annual-prepayment ceiling; no auto-renewal without notice |
| FLEET volume bands | Vessel-count bands for larger organizations | `OPEN` | Published bands, no hidden negotiation, no retroactive surprise; discount ceiling derived from cost to serve |
| FLEET multi-year contract | Term length and price indexation not decided | `OPEN` | Index and cap must be stated; no unilateral mid-term increase |
| FLEET Enterprise contract | Scope, volumes, services, support and any measured SLA defined in contract | `NOT_ESTABLISHED` | No SLA number without measurement; no unlimited scope |
| DISPLAY volume (installer/distributor) | Trade price for stock and installation interface | `OPEN` | Derived from contribution, not from competitor pricing; written terms only |
| DISPLAY bundle with installation | Installation quoted separately; a combined commercial document may present both lines | `OPEN` | The installation line remains itemised; no "included" claim |
| WEATHER annual term | Annual subscription; multi-year not decided | `OPEN` | No "lifetime" or "free forever" language |
| Referral / partner fee | Fixed or percentage, not decided | `OPEN` | Disclosed in the contract, never invented in a quote |
| Promotional discount | Not permitted on unapproved hypotheses | Prohibited | Only on an approved, costed price list, with a recorded rationale and end date |

**Contract minimums that must exist before any sale:** seller legal identity (X-02), terms of service,
data-processing agreement (for any personal data, especially FLEET and position data), withdrawal and
consumer-rights terms where applicable, price indexation and notice, termination and data-return terms,
support model, and the applicable tax treatment.

## 13. VAT, tax and invoicing

- **DISPLAY** hypothesis is VAT-inclusive consumer retail; the applicable Spanish/Member-State rate is
  `OPEN` pending written tax advice, and the EUR 699 figure is not a net-of-VAT amount.
- **WEATHER** hypotheses are consumer subscriptions; tax treatment of a digital service (place of supply,
  One-Stop-Shop, territory) is `OPEN`; no rate is asserted as approved.
- **FLEET** hypotheses are **VAT excluded**; B2B quotations are intended ex-VAT to VAT-registered buyers,
  with place of supply, intra-EU reverse charge and territory-specific rules `OPEN` pending tax advice.
- The seller's legal identity is a blocker (X-02): no tax identifier, address or registration number may
  be fabricated, so no compliant invoice can be issued today.
- Comparative or crossed-out pricing claims are out of scope and must not appear anywhere.

## 14. What no document in this milestone may say

| Forbidden statement | Why |
| --- | --- |
| Any figure from §3 presented as a price, offer, launch price, discount or "available from" | Every MAREA figure is `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`; claims policy §2 Class C and §6 |
| Any MAREA figure other than the five frozen amounts (699 / 49 / 89 / 49 / 79) | Brief §4 is the only permitted set; `DISPLAY-LARGE-CONDITIONAL` and `FLEET-ENTERPRISE` have no amount |
| A DISPLAY price that implies measured size, brightness, resolution or certification | `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`; no measured specification exists |
| Any WEATHER claim of forecast accuracy, official warnings, exclusivity, redistribution or offline rights | Provider rights `NOT_GRANTED`; claims policy §2 Class P and brief §14 |
| Any FLEET uptime percentage, SLA figure, "certified secure" or "unlimited" element | `FLEET_SLA = NO_SLA_ESTABLISHED`; no certification; limits must be numeric |
| Any margin, mark-up, BOM value, channel percentage, payback period, LTV/CAC ratio or ARR forecast | Every input is `OPEN`/`BLOCKED`; a subtraction of unknowns is unknown |
| Any competitor price presented as an EMBARCARTE price, or a cost derived from it | A public price is not a supplier cost; no FX conversion was performed |
| Any superiority, parity, "cheaper than" or "best" comparison | No comparative evidence exists (claims policy §2 Class P) |
| "Free" connectivity, "included" SIM, "lifetime" subscription, "unlimited vessels/users/storage/API" | No such terms exist; claims policy §6; brief §14 |
| Any invented enterprise reference, customer logo, market-share figure or forecast accuracy | None exists (X-06); claims policy §2 Class X |

## 15. Status statement

Every MAREA figure in this document is `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`. Every competitor
figure is a dated `VERIFIED_EXTERNAL` observation of another company's published price or terms, with
its official URL and the retrieval date 2026-10-30, and is explicitly a different product category from
the MAREA product it is compared with. Every cost input is `OPEN` or `BLOCKED`. No approved price exists
for any MAREA product; no product is for sale; no margin, forecast or market size is asserted; and the
five permitted amounts are starting-point hypotheses, not offers, not quotations and not purchase
conditions.

## 16. Source-acquisition checklist for the next milestone (MC-08/MC-09/MC-11/MC-12)

The following evidence must be obtained before any price can move beyond `HYPOTHESIS_UNAPPROVED`. It is
listed as work to do, not as blocked forever; each row names the artefact required.

**DISPLAY (hardware)**

1. Frozen industrial design with a selected panel size class (resolves `SIZE_NOT_FROZEN`).
2. BOM with manufacturer part numbers, revisions and alternates (resolves `BOM_NOT_ESTABLISHED`).
3. Three supplier RFQs per major cost category (panel, touch, compute, enclosure, power, harness).
4. Tooling and NRE quotations (enclosure, mounting, test jig).
5. Accredited test-house quotations for EMC, LVD, RED applicability, environmental and ingress testing,
   and the conformity route decision.
6. GPSR, WEEE/RoHS and CRA position.
7. Measured installation hours on at least three representative helm types, with a written installation
   scope and risk allowance.
8. Distributor/installer terms (trade price, stock, warranty handling, first-line support).
9. Packaging and fulfilment quotations, including multilingual artwork.
10. Written warranty terms and the seller's legal identity.

**WEATHER (data)**

11. A written commercial-use agreement with every provider whose data is displayed in a paid service;
    free non-commercial tiers are `NOT_PERMITTED_FOR_PAID_SERVICE` and cannot be used for a paid product.
12. Per-dataset pricing and call limits (wind, waves, currents, tides, pressure, temperature,
    precipitation, visibility), including models for Pro comparison.
13. Explicit display, caching, storage, derived-output, attribution and redistribution rights per
    provider, transcribed into product requirements.
14. Coverage/geography and forecast-horizon rights, and the licensed-area declaration for Galicia,
    Rías Baixas and Atlantic Portugal.
15. Provider outage and change-notice terms (what happens when a model is discontinued).
16. Real call-volume measurements from a pilot to size `C_API`, `C_PROC`, `C_STORE` and `C_CACHE`.
17. Forecast-evaluation evidence for the pilot geography, used for product quality — never as an
    accuracy guarantee in copy.
18. Written tax advice on digital-service VAT and territory.

**FLEET (B2B SaaS)**

19. Cloud hosting quote at named volumes (organizations, vessels, telemetry events, storage).
20. Telemetry ingestion/egress cost measurement from a real WATCH/HUB feed.
21. Notification-provider price schedules per channel.
22. Support model with measured ticket rates and minutes per vessel.
23. Onboarding measurement across at least three real organizations (hours, migration effort, training).
24. Payment/invoicing provider schedule; VAT and territory rules; dunning and refund policy.
25. Partner/installer terms and referral margin.
26. Security programme cost (penetration testing, vulnerability handling, CRA maintenance, insurance).
27. A price and packaging test with real organizations, recording what they compare, what they refuse
    and their reaction to per-vessel pricing, annual prepayment and limits.
28. DPA, subprocessor register and DPIA before any customer data is processed.
29. A service-level decision: either a contracted SLA with a measurement plan or the public statement
    `NO_SLA_ESTABLISHED`; no percentage may be invented.
30. Retention/churn evidence from a pilot cohort before any renewal or LTV claim.

**All three**

31. Brand clearance (X-01) before any customer-facing publication.
32. Asset provenance and image-generation authorisation (X-03) before any visual is used.
33. Approved claims register entries for any Class C claim intended for publication.
34. A re-check of every competitor price cited here before reuse (prices change; the citations are
    snapshots of 2026-10-30).

## 17. Evidence the later milestones must record

| Milestone | Evidence it must leave behind | Price status it can unlock |
| --- | --- | --- |
| MC-08 (bundles) | Bundle content matrix, inclusion/exclusion rules and bundle-level costed ceiling; no bundle price before bottom-up costing | Bundle hypotheses identified, still `HYPOTHESIS_UNAPPROVED` |
| MC-09/MC-10 (market and discovery) | Official-source competitor refresh with dates; primary interviews and price tests per segment; no invented interviews | `HYPOTHESIS_UNAPPROVED` retained; willingness-to-pay evidence |
| MC-11 (BOM, supplier, conformity) | Frozen BOM, supplier quotes, conformity plan and test-house quotations; installation hours | `COSTED_UNAPPROVED` becomes possible for DISPLAY |
| MC-12 (unit economics and licensing) | Provider agreements, connectivity terms, hosting and support cost, bottom-up per-SKU contribution; no fabricated numbers | `COSTED_UNAPPROVED` becomes possible for WEATHER and FLEET |
| MC-13 (verification gates) | Executed acceptance scenarios: installation, data provenance, tenant isolation, billing, export, SLA measurement if any | Publication readiness (never sale without the remaining operations gates) |

No price may be published while any of the evidence above is missing. The next milestone must re-check
every cited competitor figure and must record the retrieval date of every new one.
