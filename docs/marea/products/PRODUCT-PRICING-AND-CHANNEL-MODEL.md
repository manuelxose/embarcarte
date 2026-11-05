# MAREA — Product pricing and channel model (MC-05 / D6)

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D6 — PRODUCT-PRICING-AND-CHANNEL-MODEL |
| Milestone | MC-05 (Master Prompt 05/36) |
| Date | 2026-10-30 |
| Owner | Commercial Strategy and Pricing Specialist |
| Status | INTERNAL. Planning framework only. Not a price list, not a quotation, not a commercial offer |
| Scope | MAREA NAV (Essential, Pro), MAREA HUB (Standard, Pro), MAREA AIS (Receiver, Connected); channel and renewal model; MC-08 bundle boundary |
| Implements | `pricing`, `retailAndPartnerPricing`, `directAndOngoingCosts`, `channelEconomics`, `licensingSubscriptions` dimensions of `docs/marea/products/README.md` §4 and §8 |
| Branch / base / review | `feature/marea-mc05-nav-hub-ais-products`, base commit `8ac6d69`; independent reviewer per D13 — this file cannot PASS any commercial gate on its own |

## 1. Purpose and the one thing that must never be misread

This document is the pricing, cost and channel **framework** for the three MC-05 products: it lets a finance
function later fill in a per-SKU contribution worksheet without inventing a single figure.

**No approved price exists for any MAREA product.** Every number in this file is exactly one of:

1. a **programme price hypothesis** carried unchanged from `docs/marea/COMMERCIAL-PORTFOLIO.md` and
   `docs/marea/products/README.md` §8, labelled `HYPOTHESIS_UNAPPROVED`;
2. a **verified external comparator** — a public price published by another company, with URL and check date
   (`VERIFIED_EXTERNAL`); or
3. an explicitly labelled **planning assumption** (`ASSUMPTION`), never used as evidence.

There are **no supplier quotations, no bills of materials, no negotiated channel terms and no customer
willingness-to-pay measurements** at MC-05. A comparator price is context for later costing, not revenue, not a net
price to EMBARCARTE and not evidence of achievable margin. Price status for all six editions is
`pricing = HYPOTHESIS_UNAPPROVED` and `availability = NOT_FOR_SALE` (README §4); no hypothesis may be written into a
checkout, catalogue, product page, structured-data `Product` offer or advertisement. MAREA is a proposed brand; no
registered-trademark or trademark symbol is attached to it or to any family or edition name.

Scope reminders carried from README §7: AIS is **receive-only** and is not a transponder, not collision
avoidance and not a replacement for watchkeeping; NAV is a navigational aid, not ECDIS and not ECDIS-equivalent;
no NMEA 2000 certification or operational compatibility claim is made anywhere in this document.

## 2. Evidence classes and vocabulary used here

`VERIFIED_EXTERNAL` = a public price or policy observed at a cited URL on the cited check date; `HYPOTHESIS` = an
unapproved commercial assumption; `ASSUMPTION` = a planning premise used only to structure a calculation; `OPEN` =
not established, with the exact evidence named; `BLOCKED` = an external condition (quotation, certificate, licence,
measurement, legal advice) prevents closure. Placeholder fields are prohibited; unresolved facts stay `OPEN` or
`BLOCKED`. Nothing below is estimated, interpolated or converted between currencies.

## 3. Price hypothesis register

All rows are `HYPOTHESIS_UNAPPROVED`. The VAT assumption is "VAT-inclusive retail for EU consumers, applicable
rate OPEN pending tax advice". No hypothesis has been costed, so none can move to `COSTED_UNAPPROVED`.

| Product | Edition | Hypothesis | Currency | VAT assumption | Service period | Status | What would validate it | Blocker ids |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
| MAREA NAV | Essential | 99 | EUR | VAT-inclusive for EU consumers; rate OPEN | 1 year, renewable | `HYPOTHESIS_UNAPPROVED` | Bottom-up software cost worksheet (chart/weather licences, hosting, support, payments, acquisition) + willingness-to-pay evidence + pricing decision | D-01, D-02, D-03, D-04, D-05, D-06, D-08, D-10, P-01, P-10, L-01–L-03, X-01, X-05, X-06 |
| MAREA NAV | Pro | 149 | EUR | VAT-inclusive for EU consumers; rate OPEN | 1 year, renewable | `HYPOTHESIS_UNAPPROVED` | Same worksheet as Essential plus the incremental cost of Pro entitlements (instruments, offline regions, advanced overlays) | As NAV Essential, plus the edition matrix frozen in `PRODUCT-EDITIONS-NAV-HUB-AIS.md` |
| MAREA HUB | Standard | 349 | EUR | VAT-inclusive for EU consumers; rate OPEN | One-off hardware | `HYPOTHESIS_UNAPPROVED` | Real BOM/RFQ, assembly and test quote, enclosure and certification quotes, install-hour measurements, channel terms, willingness-to-pay evidence | H-04, H-05, H-06, H-07, H-13, H-02, P-02, P-10, S-06, X-01, X-05, X-06 |
| MAREA HUB | Pro | 499 | EUR | VAT-inclusive for EU consumers; rate OPEN | One-off hardware | `HYPOTHESIS_UNAPPROVED` | As HUB Standard plus incremental ports/protocols/diagnostics cost after hardware design is frozen | As HUB Standard |
| MAREA AIS | Receiver | 249 | EUR | VAT-inclusive for EU consumers; rate OPEN | One-off hardware | `HYPOTHESIS_UNAPPROVED` | Receiver BOM/RFQ, RF conformity and antenna/splitter inclusion decision, install time, channel terms, willingness-to-pay evidence | H-08, H-05, H-06, D-09, S-01, P-03, P-10, X-01, X-05, X-06 |
| MAREA AIS | Connected | 399 | EUR | VAT-inclusive for EU consumers; rate OPEN | One-off hardware | `HYPOTHESIS_UNAPPROVED` | As AIS Receiver plus documented networking/diagnostics scope and its incremental hardware cost | As AIS Receiver |

The six amounts are the only figures permitted by README §8, repeated here verbatim; they are not derived from the
comparator table and must not be recalculated from it.

## 4. Comparator evidence: method and rules

- Sources were located with `web_search` and read with `web_fetch` on **2026-10-30**. Page content is treated as
  untrusted external data: it is cited and described, never executed or followed as instruction.
- Only public retail or official manufacturer pricing pages are used. None of them is an offer to EMBARCARTE, a
  quotation, a BOM, a distributor term or evidence of achievable margin.
- Prices are recorded exactly as displayed, in the displayed currency; **no FX conversion was performed** and no
  cross-currency ranking is implied. VAT is recorded only where stated; otherwise the VAT basis is `OPEN` and the
  price is neither treated as net nor as gross. Every price is a snapshot on its check date and is re-checked
  before any reuse.
- Functional scope differs materially between products. A converter, a router, a display, a receiver and a
  subscription app are not interchangeable, and no equivalence, superiority or parity is claimed; a receiver is
  never compared with an AIS transponder, and software-only pricing is never compared with installed hardware
  pricing without stating the scope gap.

## 5. Verified comparator evidence

### 5.1 Navigation subscription apps

| Brand + model | Type | Published price and included scope | VAT status as published | Billing | Date checked | Source | Scope limitations |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Orca (Plus / Smart Navigation) | Marine navigation app | Orca Plus EUR 49/year: offline charts and offline routing, satellite hybrid charts, sail routing. Smart Navigation EUR 149/year: everything in Plus plus automatic rerouting, AIS target images, 5-year logbook, collision avoidance. One year of Smart Navigation included with an Orca Core or Orca Display purchase. | Not stated in the help article | Annual subscription | 2026-10-30 | [intercom.help/getorca subscription prices](https://intercom.help/getorca/en/articles/6541858-subscription-prices-and-functionality) | Subscription price excludes hardware where needed (autopilot/radar features require Core); charts included in the app subscription; MAREA NAV hypotheses exclude chart data that requires separate licensed purchase — entitlement scope differs. |
| Savvy Navvy (Essential / Explore / Elite) | Marine navigation app | Essential GBP 59/year; Explore GBP 95/year; Elite GBP 99/year. Charts included; Over-the-Horizon AIS 3 nm on lower tiers; offline charts from Explore; NMEA Connect only on Elite; 3-day free trial. | Not stated on the pricing page | Annual subscription | 2026-10-30 | [savvy-navvy.com/pricing](https://savvy-navvy.com/pricing) | GBP/UK marketplace pricing; not equivalent to an EU consumer price; feature and chart-coverage scope differs. |
| PredictWind (Basic / Standard / Professional) | Forecast and routing app/web service | Basic USD 29/year; Standard USD 249/year; Professional USD 499/year. Forecasting and routing service, not a full marine navigation product. | Explicitly excludes local sales tax: tax is added at checkout depending on location | Annual subscription | 2026-10-30 | [predictwind.com/pricing](https://www.predictwind.com/pricing) | Forecast/routing-centric; only partial navigation function; USD list; tax added at checkout so the displayed figure is not the gross consumer price. |
| Garmin Navionics Boating App | Marine navigation app subscription, annual | EUR 49.99 for the annual subscription in the official Garmin German store; the store page heading identifies a U.S. & Canada chart-coverage SKU. | Stated as including German VAT ("Inkl. MwSt") | Annual subscription | 2026-10-30 | [garmin.com/de-DE/p/904463](https://www.garmin.com/de-DE/p/904463/) | Coverage region is not Spain; the European regional coverage price is sold through other channels and was not verified here; differing entitlement scope (chart coverage) makes direct comparison unsafe. |

### 5.2 Marine gateways and onboard data hubs

| Brand + model | Type | Published price and included scope | VAT status as published | Billing | Date checked | Source | Scope limitations |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Digital Yacht iKonvert | NMEA 2000 to NMEA 0183 converter (single-purpose gateway) | From EUR 240.00 | Not stated | One-off hardware | 2026-10-30 | [digitalyacht.es PC/tablet category](https://digitalyacht.es/categoria-producto/sistemas-de-pc/) | Converter only; no vessel data interface, no application, no multi-device orchestration; narrower than the MAREA HUB intended claim. |
| Digital Yacht NavLink2 | NMEA 2000 to WiFi server | EUR 300.00 | Not stated | One-off hardware | 2026-10-30 | [digitalyacht.es PC/tablet category](https://digitalyacht.es/categoria-producto/sistemas-de-pc/) | Gateway only; no diagnostics/appliance service layer. |
| Yacht Devices YDWG-02N | NMEA 2000 WiFi gateway | EUR 205.84 displayed; recommended retail EUR 236.55 | Stated as excluding VAT for the detected shipping destination, excluding shipping | One-off hardware | 2026-10-30 | [SVB Marine ES listing](https://www.svb-marine.es/es/yacht-devices-puerta-de-enlace-gateway-wifi-nmea2000.html) | Retailer net-of-VAT price; gateway only; no application or integration service. |
| Raymarine YachtSense Link | Marine 4G/WiFi router with NMEA 2000/SeaTalkNG and low-voltage switching | EUR 1,109.20 displayed against a EUR 1,295.00 recommended retail price; requires a 4G SIM/data plan; GeoFence remote monitoring requires an additional subscription | Stated as excluding VAT for the detected destination, excluding shipping | One-off hardware plus ongoing connectivity/subscription | 2026-10-30 | [SVB Marine ES listing](https://www.svb-marine.es/es/raymarine-router-wifi-yachtsense-link.html) | Different product class with recurring connectivity cost; the SIM/data plan and subscription are not included; not a like-for-like comparison. |
| Orca Core 2 | Boat integration box (NMEA 2000, radar, autopilot control, compass, GPS; wireless bridge) | EUR 649 per unit | Displayed as including VAT, taxes and shipping for the detected destination | One-off hardware | 2026-10-30 | [getorca.com/product-configuration](https://getorca.com/product-configuration/) | Coupled to the Orca app subscription and includes autopilot-control capability that MAREA HUB does not claim; not equivalent. |

### 5.3 Receive-only AIS receivers

All products below are receive-only receivers. AIS transceiver pricing is deliberately excluded from this table
because comparing a receiver with a certified transponder would misstate scope.

| Brand + model | Type | Published price and included scope | VAT status as published | Billing | Date checked | Source | Scope limitations |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Digital Yacht AIS100 (NMEA 0183) | Dual-channel receive-only AIS receiver | EUR 300.00; requires a separate VHF/AIS antenna or splitter (not included) | Not stated | One-off hardware | 2026-10-30 | [Digital Yacht EU AIS receivers](https://digitalyacht.eu.com/product-category/ais-systems/ais-receivers/) | No app/display integration; antenna or splitter extra; VAT basis unstated. |
| Digital Yacht AIS100 (USB) | Dual-channel receive-only USB receiver | EUR 300.00 in the EU-wide store and EUR 360.00 in the Spanish storefront, observed on the same date | Not stated on either page | One-off hardware | 2026-10-30 | [Digital Yacht EU store](https://digitalyacht.eu.com/product-category/ais-systems/ais-receivers/) and [Digital Yacht ES store](https://digitalyacht.es/categoria-producto/sistemas-de-pc/) | The two storefronts differ by 20% on the same date, so neither figure may be treated as an EU-wide net price; VAT basis unstated. |
| Digital Yacht AIS100PRO | Dual-channel receive-only AIS receiver, NMEA and USB, with multiplexer | EUR 350.00 | Not stated | One-off hardware | 2026-10-30 | [Digital Yacht EU AIS receivers](https://digitalyacht.eu.com/product-category/ais-systems/ais-receivers/) | Antenna still additional; no MAREA-equivalent application layer; VAT basis unstated. |
| Digital Yacht AISnode | Receive-only AIS receiver for NMEA 2000 | EUR 595.00 | Not stated | One-off hardware | 2026-10-30 | [Digital Yacht EU AIS receivers](https://digitalyacht.eu.com/product-category/ais-systems/ais-receivers/) | NMEA 2000-oriented installation; different integration category; VAT basis unstated. |
| Digital Yacht AISNet | Network-enabled receive-only AIS receiver for base-station operation | EUR 895.00 | Not stated | One-off hardware | 2026-10-30 | [Digital Yacht EU AIS receivers](https://digitalyacht.eu.com/product-category/ais-systems/ais-receivers/) | Base-station/network use case, not a leisure-cockpit product; VAT basis unstated. |

### 5.4 Connected marine electronics

| Brand + model | Type | Published price and included scope | VAT status as published | Billing | Date checked | Source | Scope limitations |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Orca Display 2 (and charging mount) | 10-inch marine-grade display and 25 W wireless charging mount | Display EUR 999 per unit; charging mount EUR 349 per unit | Displayed as including VAT, taxes and shipping for the detected destination | One-off hardware | 2026-10-30 | [getorca.com/product-configuration](https://getorca.com/product-configuration/) | Dedicated display needing a compatible Core for full boat integration; the separately priced mount shows mounts/power items are not assumed included; MAREA DISPLAY is out of MC-05 scope. |
| Raymarine Element 7 HV / 9 HV / 12 HV | Dedicated chartplotter/fishfinder multifunction displays | EUR 659.45 (7-inch), EUR 901.45 (9-inch), EUR 1,506.45 (12-inch); chart cards and transducers are separate SKUs/variants | Stated as including Spanish VAT ("El precio incluye el IVA") | One-off hardware | 2026-10-30 | [raymarine.com Element HV ES](https://www.raymarine.com/es-es/nuestros-productos/chartplotters/element/element-hv) | Mature chartplotter ecosystem with sonar and chart-card options; not a MAREA DISPLAY comparator for MC-05 and no equivalence implied. |

### 5.5 Re-verification of existing programme anchors

`docs/marea/MARKET-BENCHMARKS.md` is dated 2026-10-30. Its anchors were re-checked rather than copied:

| Anchor in `MARKET-BENCHMARKS.md` | Result of re-verification on 2026-10-30 |
| --- | --- |
| Orca plans and hardware (Plus EUR 49/year, Smart Navigation EUR 149/year, Display 2 EUR 999, Core 2 EUR 649, mount EUR 349) | Confirmed on the official Orca help page and configuration page. |
| Garmin Navionics Boating Central & West Europe EUR 34.99 | Not reproduced. The official Garmin German store shows EUR 49.99 including VAT for a U.S. & Canada coverage SKU; the EUR 34.99 figure is treated as not currently verified. |
| Digital Yacht iKonvert EUR 240; AIS100 EUR 360; AIS100 PRO EUR 420 | iKonvert confirmed ("from EUR 240.00"). AIS100 EUR 360 confirmed on the Spanish storefront but EUR 300 in the EU-wide store; AIS100PRO observed at EUR 350, so the EUR 420 anchor is not reproduced. |
| Yacht Devices WiFi gateway EUR 249.07 retailer | Not reproduced. Observed EUR 205.84 net of VAT (recommended retail EUR 236.55) on SVB Marine. |
| Raymarine Element 7 HV EUR 659.45 VAT-inclusive | Confirmed on the official Raymarine Spain page. |

### 5.6 Comparators recorded as UNVERIFIED

| Brand + model | Category | What was observed | Reason it is UNVERIFIED |
| --- | --- | --- | --- |
| Weatherdock easyAIS A025 / A043; Comar AIS R450-X | AIS receivers | Search/dealer listings show EUR 249 and EUR 339.50 including VAT for the two Weatherdock models, and a network receiver in the EUR 700–900 range before VAT for the Comar | The official shop and dealer pages could not be fetched (HTTP 404 on 2026-10-30); search snippets are not accepted as verified paginated evidence. |
| Actisense W2K-1; Yacht Devices and Raymarine manufacturer pages | Gateways / routers | Earlier retail listings only; manufacturer pages gave specifications but could not be fetched | The Actisense retailer page now states the product is no longer available (no current price); for Yacht Devices and Raymarine only the SVB retailer price is verified. |
| Navionics Boating European regional in-app prices; any AIS transponder | Navigation app / transceiver | Not observed / deliberately excluded | App-store regional pricing was not retrievable in this session; AIS transceivers are not receive-only and including them would misstate scope. |

### 5.7 What the comparator evidence does not establish

- It establishes a public price point on a date. It establishes **no** supplier cost, bill of materials, import
  duty, freight, certification cost, support cost, channel margin, conversion rate, market size or forecast.
- Currency, VAT basis, territory, chart/data entitlements and included hardware differ between rows; no net-price
  ranking is computed and none should be inferred. Public retail prices are not prices available to EMBARCARTE as
  a reseller or manufacturer, and none of these companies is a partner, supplier or benchmark of MAREA economics.
- No statement here claims that a MAREA product is cheaper, better, equivalent or competitive; the hypotheses are
  planning inputs awaiting costing, not positioning. Observed cross-storefront differences (for example the
  Digital Yacht AIS100 at EUR 300 and EUR 360) show why a price must always carry its date, source and VAT basis.

## 6. Cost framework — hardware (HUB and AIS)

No numeric value may be entered in this table without a real supplier quotation, test-house quotation or measurement; the status column names exactly what closes each line.

| Cost category | What it includes | Exact data source needed | Status |
| --- | --- | --- | --- |
| Components | SoC/MCU, radio modules, GNSS, connectors, passives, power supply, protection, memory | Supplier quotations per SKU at named volumes, with MOQ, lead time and lifecycle commitment | BLOCKED (H-05, H-07, X-05) |
| PCB fabrication and assembly | PCB fabrication, SMT/THT assembly, inspection, programming, fixtures | Contract-manufacturer quotation for named volumes and test coverage | BLOCKED (H-07, X-05) |
| Enclosure and mechanical | Marine housing, gaskets, ingress-rated seals, mounting hardware, tooling | Enclosure supplier quotation including tooling/NRE and per-unit price | BLOCKED (H-07, X-05) |
| Cables and connectors | NMEA 2000 drop cable, adapters, USB loom, power cable | Supplier quotation plus a written inclusion/exclusion decision per edition | BLOCKED (H-07, X-05) |
| Antenna (where applicable) | AIS VHF antenna and/or splitter; GPS antenna for HUB variants | Supplier quotation plus a written decision on included versus optional accessory | OPEN (AIS dossier must freeze inclusion) |
| Test and calibration | Functional test, RF bench test, burn-in, fixture amortisation, labour time | Test plan with measured cycle time and hourly rate | BLOCKED (H-07, S-01) |
| Certification and technical documentation | CE/EMC, RED, LVD, GPSR, CRA, radio conformity, technical file, declarations, manuals, translations | Accredited test-house quotation per SKU and per directive; scope confirmation from the conformity body | BLOCKED (H-05, H-06, H-07, X-05) |
| Packaging | Retail box, ESD protection, inserts, labels, multilingual artwork | Packaging supplier quotation and artwork localisation cost | OPEN (no quote) |
| Inbound and outbound shipping | Freight from contract manufacturer to warehouse, last-mile delivery, return transport | Carrier rate card and 3PL quotation | OPEN (no quote) |
| Payment fees | Merchant/acquirer fees, hosted checkout, chargeback and dispute fees | Payment-provider fee schedule in writing | OPEN (no schedule) |
| Storage and inventory carrying | Warehousing, insurance, shrinkage, cost of capital tied up in stock | 3PL quotation and financing cost from finance | OPEN (no quote) |
| Returns allowance | RMA handling, inspection, refurbishment, disposal, restocking | Returns policy draft plus measured return rate — no field history exists | OPEN (rate must be measured, not assumed) |
| Warranty reserve | Expected failure rate, replacement unit cost, labour, logistics | Reliability data from pilot installations and warranty policy draft | BLOCKED (no field data exists) |
| Support | Tier-1/tier-2 labour cost per ticket, ticket rate per unit sold, documentation | Support model and measured ticket rate from pilot | OPEN (no measurement) |
| Installer/distributor discount | Trade margin required by the channel to stock, install and give first-line support | Written channel terms after negotiation — no signed contract exists | BLOCKED (X-05, X-06) |
| Taxes and duties | Import duties, customs handling, VAT treatment, any environmental fees | Tax adviser opinion and customs classification per SKU | OPEN (pending tax advice) |
| Obsolescence and lifecycle | Component EOL risk, firmware maintenance, revision spares | Purchasing lifecycle statements and engineering maintenance estimate | OPEN (no data) |

## 7. Cost framework — software (NAV)

| Cost category | What it includes | Exact data source needed | Status |
| --- | --- | --- | --- |
| Development and maintenance | Engineering effort for app, backend, offline behaviour, updates, security | Internal effort estimate approved by finance and converted to a cost basis | OPEN (no costed effort) |
| Chart data licensing | Licensed chart entitlement per region, distribution rights, updates | Signed licence terms or written quotation per region; official ENC distribution right is not granted | BLOCKED (D-01, D-02, D-03) |
| Weather, tide and current data licensing | Licensed forecast/current/tide data consumed by the app | Written provider terms or self-hosting compliance analysis with real hosting cost | BLOCKED (D-04, D-05, D-07, P-08) |
| Hosting and compute | Application servers, APIs, background jobs, monitoring | Cloud/provider quotation at named usage assumptions | OPEN (no quote) |
| Storage and delivery of data | Chart tile storage, logbook storage, backup, content delivery | Provider quotation at named volume assumptions | OPEN (no quote) |
| Third-party APIs | AIS internet feed, geocoding, maps, notification services, analytics | Provider price list or quotation per API | OPEN (no quote) |
| Support | Customer support labour per active subscriber and per ticket | Support model and measured ticket rate | OPEN (no measurement) |
| Payment processing and recurring billing | Merchant fees, subscription billing platform, dunning, retries | Payment/billing provider schedule in writing | OPEN (no schedule) |
| Refunds and chargebacks | Refund rate and dispute costs | Consumer-law advice plus measured rate from pilot | OPEN (no data) |
| Customer acquisition | Paid media, content, installer referrals, event costs | Marketing plan and measured cost per acquisition from MC-09/MC-10 | OPEN (no plan or measurement) |
| Entitlement administration | Identity, device/seat limits, entitlement enforcement, account service, app-store commission if sold through stores | Product decision on entitlement model plus store terms if applicable | OPEN (terms not confirmed) |
| Renewal expenses | Renewal reminders, failed-payment recovery, win-back, notice obligations | Renewal policy decision plus provider and legal input | OPEN (no policy approved) |
| Data refresh and quality evaluation | Forecast validation, chart freshness checks, provenance maintenance | Data-quality evaluation plan in the pilot geography | OPEN / BLOCKED (P-08) |

## 8. Contribution-margin calculation framework

### 8.1 Symbolic formula

No figures are substituted. Every symbol resolves to `OPEN` or `BLOCKED` today.

```text
Hardware SKU:
  NR_gross      = G / (1 + v)                 net revenue from a VAT-inclusive retail price G
  NR_trade      = T / (1 + v_b2b)             net revenue from a trade price T quoted to a VAT-registered buyer
  VC            = BOM + ASSY + TEST + PACK + FULFIL + PAY + WARR + RET + SUP + CHAN + OTHER
  C             = NR - VC                     contribution per unit sold
  CM            = C / NR                      contribution margin ratio (only valid once all inputs are sourced)

Software subscription:
  NR_year       = G_year / (1 + v_digital)
  VC_year       = DATALIC + HOST + STORE + API + SUPPORT + PAY + REF + ENT + RENEW + OTHER
  C1            = NR_year - VC_year           annual contribution per active subscriber
  LTV           = SUM(k = 1..n) C1_k - CAC    n = expected paying renewals (OPEN), CAC = acquisition cost (OPEN)
  PAYBACK       = CAC / C1                    months or years only after both inputs are sourced
```

Definitions used in the formulas: `G` retail price to the consumer; `v` VAT rate; `T` negotiated trade price;
`BOM` bill of materials; `ASSY` assembly/programming; `TEST` test and calibration; `PACK` packaging; `FULFIL`
fulfilment; `PAY` payment and chargeback fees; `WARR` warranty accrual; `RET` returns allowance; `SUP` onboarding
and support; `CHAN` channel discount or commission; `OTHER` other variable cost; `DATALIC` data licences; `HOST`
hosting; `STORE` storage and delivery; `API` third-party APIs; `REF` refunds and chargebacks; `ENT` entitlement
administration; `RENEW` renewal operating cost; `CAC` acquisition cost; `n` expected paying renewals.

### 8.2 Named empty inputs (worked structure, no fabricated values)

| Input | Meaning | Unit | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `G_NAV_E`, `G_NAV_P` | Retail price hypotheses, NAV Essential and Pro | EUR/year | `HYPOTHESIS_UNAPPROVED` | Pricing decision after costed worksheet and willingness-to-pay evidence |
| `G_HUB_S`, `G_HUB_P` | Retail price hypotheses, HUB Standard and Pro | EUR | `HYPOTHESIS_UNAPPROVED` | Pricing decision after real BOM/RFQ and channel terms |
| `G_AIS_R`, `G_AIS_C` | Retail price hypotheses, AIS Receiver and Connected | EUR | `HYPOTHESIS_UNAPPROVED` | Pricing decision after real BOM/RFQ and antenna inclusion decision |
| `v` | Applicable VAT rate per territory and product classification | ratio | `OPEN` | Written tax advice |
| `BOM_HUB_S`, `BOM_HUB_P`, `BOM_AIS_R`, `BOM_AIS_C` | Bill of materials per hardware SKU | EUR/unit | `BLOCKED` | Supplier quotations per SKU and volume |
| `ASSY`, `TEST` | Assembly, programming, test and calibration | EUR/unit | `BLOCKED` | Contract-manufacturer and test-house quotations |
| `PACK`, `FULFIL` | Packaging and fulfilment | EUR/unit | `OPEN` | Supplier and carrier rate cards |
| `PAY` | Payment and chargeback fees | EUR/order | `OPEN` | Payment-provider schedule |
| `WARR`, `RET` | Warranty accrual and returns allowance | EUR/unit | `OPEN` | Reliability and returns data from pilot installations |
| `SUP` | Onboarding and support | EUR/unit or EUR/subscriber | `OPEN` | Measured support load |
| `CHAN` | Channel discount or commission | EUR/unit | `BLOCKED` | Signed or negotiated channel terms |
| `DATALIC_NAV` | Chart plus weather/tide data entitlements | EUR/year | `BLOCKED` | Signed data licences or written provider quotations |
| `HOST`, `STORE`, `API` | Hosting, storage and third-party API costs | EUR/year | `OPEN` | Cloud and API quotations |
| `CAC_NAV` | Customer acquisition cost | EUR/subscriber | `OPEN` | MC-09/MC-10 acquisition evidence |
| `n` | Expected paying renewals per subscriber | renewals | `OPEN` | Renewal/churn measurement from pilot cohort |

### 8.3 Why no margin can be asserted today

Every variable on the right-hand side of `C` and `C1` is `OPEN` or `BLOCKED`, and the VAT rate `v` that converts
the hypothetical gross price into net revenue is itself `OPEN`. A subtraction of two unknown quantities remains
unknown. Therefore:

- no gross margin, contribution margin, mark-up or profit figure is asserted anywhere in this file or in MC-05;
  no "below cost" or "healthy margin" language may be attached to the price hypotheses;
- the price dimension stays `HYPOTHESIS_UNAPPROVED`; it may become `COSTED_UNAPPROVED` only after every non-data
  variable carries a sourced value, and `APPROVED` only after a pricing decision plus operations readiness;
- any internal spreadsheet that fills these inputs is a working model, not evidence, until the underlying
  quotations, licences and measurements are attached.

### 8.4 Break-even and channel-discount derivations (symbolic)

```text
Fixed costs per SKU        F = NRE + tooling + certification + fixed overhead          (all OPEN/BLOCKED)
Break-even volume          V* = F / C                                                  (computable only after C)
Maximum channel discount   D* = G - T_min,
                           where T_min solves  (T_min / (1 + v)) - VC = C_target      (C_target OPEN)
Renewal cohort value       Value = n * C1                                              (n and C1 OPEN)
```

`D*` is the economic ceiling for negotiated trade terms, shrinking as warranty, returns and support rise; it cannot be published as a reseller percentage until inputs and terms exist.

## 9. VAT and tax treatment

- Consumer retail hypotheses are stated **VAT-inclusive**; the applicable Spanish or Member State VAT rate is `OPEN` pending written tax advice, and no rate is asserted as approved.
- B2B quotations are intended as **ex-VAT** to buyers holding a valid VAT identification number. Place-of-supply,
  intra-EU reverse charge, One-Stop-Shop treatment of cross-border digital services and any Spanish territory with
  a distinct indirect-tax regime are all `OPEN`; the goods-versus-services classification of each SKU drives the
  analysis. App-store or marketplace distribution, if used, can change the merchant of record, the VAT model and
  the fee structure — that decision is also `OPEN`.
- Invoices must state the legal seller (EMBARCARTE), net price, VAT amount and gross price. The legal identity
  data is itself a blocker (`X-01`); no tax identifier, address or registration number may be fabricated.
  Comparative or crossed-out pricing claims are out of scope and must not appear in copy.

## 10. Channel economics

Two motions are modelled. Neither is operational today, and neither has signed terms.

### 10.1 Direct-to-consumer (D2C)

The MAREA site or an EMBARCARTE checkout sells the SKU, takes payment, fulfils, owns the customer relationship
and the legal seller obligations. It gains full margin capture, direct entitlement control and first-party data,
but carries support load, warranty and returns processing, installation (**not** included), acquisition cost,
payment/fraud risk and hardware stock exposure. Checkout may be enabled only for an `OPERATIONS_READY` SKU whose
price has completed approval. NAV is naturally D2C; HUB and AIS need a compatibility assessment first, so a
configuration or quote step precedes any checkout.

### 10.2 Installer-led

A local installer assesses the vessel, proposes the configuration, installs, commissions, trains the owner and
gives first-line support; it may buy at trade terms, act as referral channel, or both (`OPEN`). Installer-led is
the intended route for HUB and AIS and the only credible route for mixed-vessel integration; it trades margin for
reduced field-work burden and concentrates technical risk in a partner whose competence must be assessed.

### 10.3 Channel responsibilities matrix

| Responsibility | Direct-to-consumer | Installer-led (proposed) | Status |
| --- | --- | --- | --- |
| Price presentation | VAT-inclusive consumer price; ex-VAT to VAT-registered trade buyers | Trade price plus separately quoted installation and materials | OPEN (no terms) |
| Product margin owner | EMBARCARTE | Shared between EMBARCARTE and channel partner | BLOCKED (no signed terms) |
| Installation and compatibility assessment | Not included; customer arranges it; self-service/configurator with specialist escalation for compatibility | Installer assesses the vessel and quotes labour and materials separately, itemised | OPEN (no rate card) |
| Warranty (product and installation work) | EMBARCARTE for the product; installation work is the installer's own obligation | EMBARCARTE for the product, installer handling logistics and owning workmanship | OPEN (policies and contract not drafted) |
| Returns and withdrawal | EMBARCARTE processes returns | Defined per channel agreement; removed/installed goods differ | OPEN (no policy) |
| First-line support | EMBARCARTE support | Installer, escalating to EMBARCARTE | OPEN (no SLA) |
| Subscription renewal | EMBARCARTE billing | Must be defined: referral or reseller of the subscription | OPEN (no decision) |
| Cash and inventory risk | EMBARCARTE carries stock | Distributor/installer may carry stock under trade terms | OPEN (no terms) |

### 10.4 Discount methodology (principles, no percentage)

- A trade discount is not a marketing subtraction. It is the price of the services the partner performs: stock,
  installation labour interface, first-line support, local warranty handling and lead generation. Its ceiling is
  derived from the contribution model (`D*` in §8.4), not from competitor price lists, so no percentage is published.
- Volume tiers, payment terms, stock rotation and co-op support are negotiated only after a bottom-up costed
  worksheet exists; discounts are never applied retroactively and never to a `HYPOTHESIS_UNAPPROVED` price.
- Installer labour is always quoted separately, in hours and tasks or as a fixed installation quotation, and is
  never folded invisibly into the product price. "Installation included" language is prohibited because no
  installation price exists. A distributor or installer margin must cover real local costs and the partner's
  warranty exposure; the channel is modelled as its own P&L, not as a deduction from a consumer price.
- No reseller agreement exists. Nothing in this section constitutes a reseller term, an offer or a commitment.

## 11. Renewal and subscription model

NAV is a one-year renewable entitlement. The policy below is a **framework**, not an approved policy; legal and
consumer-law review is required before any of it becomes customer-facing copy.

| Event | Intended behaviour (framework) | Status |
| --- | --- | --- |
| Term start | Entitlement activated at purchase/activation; term length stated at checkout; no auto-charge without explicit consent | OPEN (consent and billing wording pending legal review) |
| During term | Essential and Pro entitlements as defined by the frozen edition matrix; device/seat limits declared | OPEN (edition matrix owned by D4) |
| Expiry | Data entitlement is suspended; the user's own routes, waypoints and logs remain exportable; licensed chart/data access after expiry depends on the data licence terms | OPEN (chart licence terms under D-01) |
| Renewal and failed payment | Renewal price policy is a hypothesis: the same list price applies at renewal unless a change is notified in advance as the law requires; retry, dunning, grace period and suspension rules must be defined | HYPOTHESIS / OPEN (no renewal price approved; no dunning policy) |
| Upgrade and downgrade | Mid-term upgrade applies the price difference pro-rata; downgrade takes effect at the next term; single account, no double billing | OPEN (commercial policy not approved) |
| WEATHER entitlement sharing | Where a NAV entitlement includes a WEATHER entitlement, the same entitlement must not be billed twice; the mapping is defined with the WEATHER product owner | OPEN (WEATHER dossier; no double-billing rule is binding) |
| Cancellation and refund | Customer can stop renewal; access continues to term end; data export remains available. A 14-day distance-sales withdrawal may not apply once a digital service has started with express consent; exact position requires legal advice, and refunds are not promised in copy | OPEN (pending consumer-law review) |

Renewal is a separate unit-economic cycle: `C1`/`CAC` in §8 apply to year one, and `LTV` needs an observed renewal cohort; no rate is asserted.

## 12. Bundle boundary (MC-08)

MAREA START (NAV + HUB) and MAREA CRUISE (NAV + HUB + receive-only AIS + DISPLAY) are referenced here only as
ecosystem context, exactly as in README §2. **Bundle contents and bundle pricing are governed by MC-08 and are
not decided in MC-05.** No bundle price is finalised, published, implied or derivable by adding the six
hypotheses above. DISPLAY is a batch-2 product with no costed model here; bundle pricing must be built from
standalone contributions less shared cost savings less channel margin (COMMERCIAL-PORTFOLIO), never by arbitrary
subtraction; NAV and WEATHER entitlements must not be charged twice; and no bundle may be shown as purchasable
until every included SKU is `OPERATIONS_READY` and the bundle price is approved under MC-08.

## 13. External data still required (numbered acquisition list)

1. Real BOM and written supplier RFQs for HUB Standard, HUB Pro, AIS Receiver and AIS Connected, with volume tiers,
   MOQ, lead time and lifecycle commitments (closes `BOM_*`; blockers H-05, H-07, X-05).
2. Contract-manufacturer quotation for assembly, programming, test, packaging and quality inspection (closes
   `ASSY`, `TEST`, `PACK`; blocker H-07).
3. Accredited test-house and conformity quotations per SKU for CE/EMC, RED, LVD, GPSR, CRA and radio, plus technical
   file, declaration and translated manual cost (blockers H-05, H-06, H-07).
4. Written chart-data licence quotations and territory rights, including the official ENC distribution position
   (blockers D-01, D-02, D-03).
5. Written weather/tide/current provider terms or a costed self-hosting analysis (blockers D-04, D-05, D-07, P-08).
6. Payment-provider and subscription-billing fee schedules in writing, including chargeback and dispute fees.
7. Carrier and 3PL rate cards for EU/ES/PT delivery, return transport, warehousing and inventory carrying.
8. Installer day-rate and measured HUB/AIS installation time on at least two representative vessels, plus
   service-call rates (blocker X-06).
9. Negotiated channel terms: installer/distributor discount expectations, payment terms, stock rotation, warranty
   handling and support escalation (closes `CHAN`; blockers X-05, X-06).
10. Customer willingness-to-pay evidence from structured discovery, including responses to the six hypotheses as
    neutral questions and never as offers (blocker X-06; MC-09/MC-10).
11. Written VAT and cross-border tax advice covering goods versus digital services, reverse charge, OSS, territory
    regimes and invoice wording (closes `v`; blocker X-01).
12. Legal review of consumer terms: withdrawal and digital-service consent, cancellation, renewal notice, price change, warranty wording and returns process.
13. Support cost baseline, measured ticket rate and an RMA process definition from pilot installations (closes
    `SUP`, `WARR`, `RET`).
14. Acquisition plan and measured cost per acquisition for NAV and WEATHER once a pilot funnel exists (closes
    `CAC_NAV`).
15. Component lifecycle/EOL and manufacturer supply or trademark constraints for the third-party modules used
    (blocker H-07).

Each numbered item is external: none can be produced by documentation work alone and none may be filled with an analyst estimate.

## 14. Price status statement

Every figure in this document is `HYPOTHESIS_UNAPPROVED` or a dated `VERIFIED_EXTERNAL` comparator. **No
approved price exists. No price appears in any checkout, catalogue, product page or structured-data offer, and
none may be added.** A price becomes usable only after it has been costed from real quotations and measurements,
reviewed, approved through the programme's pricing decision, and published for a SKU that has reached
`OPERATIONS_READY`; until then the correct customer-facing state is a quotation request or an availability statement matching true readiness — never a number.

## 15. Traceability and maintenance

- Binding conventions: `docs/marea/products/README.md` §4 (pricing and readiness dimensions), §5 (evidence classes),
  §7 (claim rules), §8 (hypotheses), §9 (blocker traceability); programme hypotheses in
  `docs/marea/COMMERCIAL-PORTFOLIO.md`; comparator baseline in `docs/marea/MARKET-BENCHMARKS.md`, every anchor
  re-verified in §5.5; financial operating model in `docs/marea/WEBSITE-AND-ROADMAP.md` §4.
- Blockers: `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` X-05 (costs), X-06 (customer evidence),
  D-04/D-05/D-07 (data), H-07 (BOM); H-12 (connectivity) is out of scope here but relevant to WATCH/FLEET.
- Maintained by the Commercial Strategy and Pricing Specialist and reviewed by the independent reviewer named in
  D13. Change control: any new number must be an approved internal decision or a dated, citable external
  observation; unverifiable comparators stay `UNVERIFIED` and stale anchors are re-checked before reuse.
