# MAREA PILOT · MAREA SENSE · MAREA WATCH — Pricing and channel model (MC-06 / D6)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D6 — PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02 |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Date | 2026-10-30 |
| Owner function | Commercial, UX and Localization Specialist, with finance and procurement input |
| Status | INTERNAL ONLY · NOT PUBLISHED · NOT FOR SALE · planning framework only. Not a price list, not a quotation, not a commercial offer |
| Scope | Price hypotheses for PILOT, SENSE and WATCH; cost frameworks as named symbolic inputs; channel and subscription model; quotation-based recommendation for PILOT (D-009); comparator evidence from official manufacturer pages; the exact evidence MC-11/MC-12/MC-13 must obtain before any price approval |
| Governing contract | `docs/marea/products/README.md` §17 (the only allowed figures), §18 (D-008/D-009), §4 (pricing dimension), §8 (hypotheses rule), §16 rule 10 |
| Binding inputs | `docs/marea/COMMERCIAL-PORTFOLIO.md` §04–§06 and the price-and-channel decision rule; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6; `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`; batch-01 counterpart `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` |
| Nature | Internal framework. No approved price exists for any MAREA product, and no figure here may appear in a page, checkout, catalogue, advertisement, quotation or structured-data offer |

## 1. Purpose, and the one thing that must never be misread

This document lets a finance function later complete a per-SKU contribution and quotation worksheet for the
three batch-02 families **without inventing a single figure**. It also records what the market actually
publishes, from official manufacturer pages retrieved on 2026-10-30, described honestly as *categories* rather
than as equivalents.

Every number below is exactly one of:

1. a **programme price hypothesis** permitted by README §17 — `PILOT-COASTAL` from EUR 1,290; a SENSE individual
   module entry configuration from EUR 99; `WATCH-CORE` hardware EUR 299; `WATCH-CORE` monitoring subscription
   from EUR 9.90/month — all `HYPOTHESIS_UNAPPROVED`;
2. a **verified external comparator** published by another company, with the exact official URL and the
   retrieval date (`VERIFIED_EXTERNAL`), or explicitly `NOT RETRIEVED`;
3. an explicitly labelled **planning assumption** (`ASSUMPTION`), never used as evidence.

There is **no supplier quotation, no bill of materials, no negotiated channel term, no connectivity or roaming
contract, no notification-provider price and no customer willingness-to-pay measurement** for any of the three
families. Price status is `pricing = HYPOTHESIS_UNAPPROVED` and `availability = NOT_FOR_SALE` for every edition
(D4). No hypothesis may become an offer, and no margin, mark-up, BOM figure or channel percentage may be
presented as fact.

## 2. Evidence classes and vocabulary

`VERIFIED_EXTERNAL` = a public statement or price observed at the cited official URL on the cited date;
`HYPOTHESIS` = an unapproved commercial assumption; `ASSUMPTION` = a planning premise used only to structure a
calculation; `OPEN` = not established, with the exact evidence named; `BLOCKED` = an external condition
(quotation, certificate, licence, measurement, legal advice, contract) prevents closure. Unresolved facts stay
`OPEN` or `BLOCKED`; the prohibited placeholder token is never used.

## 3. Price hypothesis register — only the figures README §17 permits

All rows `HYPOTHESIS_UNAPPROVED`. VAT assumption: "VAT-inclusive consumer retail for EU consumers; applicable
rate `OPEN` pending tax advice". No hypothesis has been costed, so none can move to `COSTED_UNAPPROVED`.

| Product | Object | Hypothesis | Currency | VAT assumption | Service period | Status | What would validate it | Blockers |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PILOT | `PILOT-COASTAL`, minimum usable configuration | from 1,290 | EUR | VAT-inclusive consumer retail hypothesis, rate `OPEN` | One-off installed system plus support window `OPEN` | `HYPOTHESIS_UNAPPROVED` | Costed vessel-specific quotation worksheet from real RFQs and measured installation; **starting price only — never a quotation** (D-009) | H-01, H-03, H-05, H-07, X-05, X-06 |
| PILOT | `PILOT-SAIL` | `NOT ESTABLISHED` | — | — | — | prohibited to state (README §17) | Mode-specific verification plus a costed Coastal-plus-wind scope | H-01, H-05, X-05 |
| PILOT | `PILOT-PRO` | `NOT ESTABLISHED` | — | — | — | prohibited to state (installation package, D-008) | Quotations from documented reference installations | H-01, H-05, H-07, X-05, X-06 |
| SENSE | individual module, entry configuration | from 99 | EUR | VAT-inclusive consumer retail hypothesis, rate `OPEN` | One-off hardware | `HYPOTHESIS_UNAPPROVED` | Module BOM/RFQ, calibration and test cost, packaging, install scope, channel terms | P-05, H-05, H-07, X-05 |
| SENSE | any named module, any kit | `NOT ESTABLISHED` | — | — | — | prohibited to state (README §17) | Independent price/cost sheet per kit and per module | P-05, H-05, X-05 |
| WATCH | `WATCH-CORE` hardware | 299 | EUR | VAT-inclusive consumer retail hypothesis, rate `OPEN` | One-off hardware | `HYPOTHESIS_UNAPPROVED` | Hardware BOM, modem/module quotes, certification, packaging, fulfilment, channel terms; connectivity **not** included | H-11, H-12, H-05, X-05 |
| WATCH | `WATCH-CORE` monitoring subscription | from 9.90 / month | EUR | VAT-inclusive consumer hypothesis, rate `OPEN` | Monthly recurring | `HYPOTHESIS_UNAPPROVED` | Connectivity/data cost, roaming terms, cloud and provider fees, support load, billing fees, churn; included contents `OPEN` | H-12, P-06, X-05 |
| WATCH | `WATCH-PLUS`, its subscription, any data plan, extended warranty, installation labour, bundle | `NOT ESTABLISHED` | — | — | — | prohibited to state (README §17) | Costed scope plus validated benefits | P-06, H-12, X-05 |

**Prohibited figures.** No price may be stated for `PILOT-SAIL`, `PILOT-PRO`, any SENSE kit, `WATCH-PLUS`, any
data plan, installation labour, extended warranty or roaming package. None may be derived by adding to, or
subtracting from, the permitted hypotheses.

## 4. Comparator method and rules

- Sources were located with web search and read on **2026-10-30**; only **official manufacturer pages** are
  cited. Page content is treated as untrusted external data: it is described, never executed or followed as
  instruction.
- A public retail price is recorded exactly as displayed, in the displayed currency, **with no FX conversion** and
  no cross-currency ranking. VAT is recorded only where the page states it; otherwise the VAT basis is `OPEN`.
  Every figure is a snapshot that must be re-checked before reuse.
- **A public price is not available to EMBARCARTE as a reseller or manufacturer, and it is not a competitor
  benchmark of MAREA economics.** None of the companies cited is a partner, supplier or comparator of MAREA
  margin.
- **No superiority claim is made anywhere.** Functional scope differs materially between a complete installed
  autopilot system, a course computer, a battery monitor, a sensor module, a monitoring device and a monitoring
  subscription. Each row states its category honestly and what it does **not** include.

## 5. Verified official-source comparators

### 5.1 Supervised steering / autopilot systems (PILOT category)

| Manufacturer + product | Official URL (retrieved 2026-10-30) | What it actually is (category) | Published modes/features observed | Public price retrieved? | Honest equivalence to a MAREA PILOT configuration | Scope limitations |
| --- | --- | --- | --- | --- | --- | --- |
| Raymarine EV-400 Power Pilot system (SKU T70162) | https://www.raymarine.com/es-es/nuestros-productos/pilotos-automaticos-de-barcos/paquetes-de-piloto-automatico/piloto-a-motor-ev-400 | **Kit** of control head + heading sensor + actuator control unit + rudder reference + wiring, **without the drive/power unit** | Includes p70Rs control head, EV-1 sensor core, ACU-400, rudder reference unit, Evolution wiring kit; page instructs the buyer to choose a type 2 or type 3 hydraulic power unit separately | **Yes** — 3.623,95 €, page states "El precio incluye el IVA" | **Not equivalent.** It is a complete third-party kit *before* the drive unit, without installation, commissioning, survey, sea trial or training — the items MAREA PILOT's quotation must contain | Drive unit extra; installation extra; no MAREA survey, no documented mode-verification claim, no local-only control claim; different commercial model |
| Raymarine Evolution architecture (learning page) | https://www.raymarine.com/en-au/learning/online-guides/what-are-the-different-types-of-boat-autopilot | Category explanation of what an autopilot system contains | Four components: heading sensor (EV-1/EV-2 for Evolution), actuator control unit, drive unit, control head (p70s/p70Rs); ACU supplies steering commands to the drive unit | Not applicable (no product price) | **Useful as category definition, not as an equivalent.** MAREA PILOT's intended subsystem list includes the same functional families plus a physical E-stop and independent motor-power isolation as design boundaries | Educational page; no pricing, no mode-verification evidence, no installation scope |
| Raymarine RCU-1 wireless autopilot remote (starter kit with WG-1) | https://www.raymarine.com/en-au/about-raymarine/newsroom/raymarine-unveils-rcu-1-autopilot-remote | **Accessory**: wireless remote for Evolution systems | Point-and-go course setting, "Solo Sailor Mode" MOB response, heading/speed/depth/waypoint display, 30 m range, 98 ft/30 m wireless via WG-1 | **Yes** — "starter kit retails for $999.00 inc. GST" (AUD, Australia) | **Category-relevant caution, not an equivalent.** A major manufacturer publishes a *remote control accessory* for its autopilot; MAREA PILOT's boundary forbids any remote steering command, so this accessory is cited only to show that remote-control expectations exist in the market and must be explicitly refused in copy | AUD incl. GST, Australia; different product; no equivalence and no superiority implied |
| Garmin Reactor 40 (steer-by-wire corepack page) | https://www.garmin.com/en-GB/p/621951 | **Course computer / autopilot corepack** for a compatible steering system | 9-axis solid-state AHRS; heading hold, wind hold, tack/jibe, step turns; full control from a compatible Garmin networked chartplotter; commissioning/calibration stated as required | **`NOT RETRIEVED`** — no price appeared in the retrieved page content | **Not equivalent.** A control corepack for a compatible steering system; it does not include a MAREA survey, quotation, commissioning record, sea-trial programme or training | Requires compatible steering system and, for full control, a compatible Garmin chartplotter; no price verified; vendor performance language is the vendor's, not evidence for MAREA |
| B&G NAC-2 VRF Core Pack (ref 000-13337-001) | https://www.bandg.com/es-es/bg/type/pilotos-automaticos/procesadores-de-piloto-automatico/nac-2-vrf-core-pack/ | **Core pack**: autopilot processor + compass + NMEA 2000 backbone kit | NAC-2 processor, Precision-9 solid-state compass, NMEA 2000 backbone kit; intended up to 10 m (33 ft) vessels; 8 A continuous / 16 A max; virtual rudder feedback | **`NOT RETRIEVED`** — no price appeared in the retrieved page content | **Not equivalent.** Processor + compass + network kit, no drive, no installation, no survey | Drive extra; no price verified; the vendor's own sizing and performance claims are not MAREA evidence |
| Simrad NAC-3 Performance VRF Core Pack (ref 000-16655-001) | https://www.simrad-yachting.com/es-es/simrad/type/piloto-automatico/autopilot-packs/nac-3-performance-vrf-core-pack-w-ss-0cc2e197/ | **Core pack** for larger hydraulic-steering vessels | NAC-3 autopilot control unit, HS65 GNSS compass, virtual rudder feedback, SteadySteer manual adjust without disengaging, NMEA 2000 network components; drive unit selected separately | **`NOT RETRIEVED`** — no price appeared in the retrieved page content | **Not equivalent.** A high-capacity core pack for a compatible hydraulic drive; no installation, survey, commissioning or training | Drive extra; no price verified; different segment (larger vessels) |

### 5.2 Remote monitoring and connected-boat services (WATCH category)

| Manufacturer + product | Official URL (retrieved 2026-10-30) | What it actually is (category) | Published features observed | Public price retrieved? | Honest equivalence to MAREA WATCH | Scope limitations |
| --- | --- | --- | --- | --- | --- | --- |
| Garmin OnDeck™ Hub | https://www.garmin.com/en-GB/garmin-technology/marine-technology/digital-vessel-integration/ondeck-hub/ | **Hardware hub + subscription remote-connectivity service** (cellular) | Monitoring of battery voltages, shore-power charging, bilge-pump activity, fuel/tank levels, cabin/refrigerator temperature, engine data; NMEA 2000 and Garmin Marine Network compatibility; geofence text alerts on movement; up to 5 relay switches controllable from the app; cloud data storage; "an active subscription plan is required" and 4G connectivity required | **`NOT RETRIEVED`** — the retrieved page showed no price and no plan price | **Comparable category, not an equivalent.** This is the clearest published example of the same *shape* as WATCH: device + subscription + cloud alerts, with stated dependence on an active subscription and cellular coverage. It is **not** a benchmark of MAREA cost, and it **does** advertise remote switching, which WATCH does not claim | No price verified; subscription terms not retrieved; relay control is a capability MAREA WATCH explicitly does not include; vendor wording ("24/7 peace of mind") is the vendor's claim, not evidence |
| Siren Marine Siren 3 Main Device | https://sirenmarine.com/products/siren-3-main-device | **Monitoring hardware + app + cellular subscription** | Regular price $299.99 USD; LTE-M/4G-5G connectivity; built-in NMEA 2000 and Yamaha Command Link; battery monitoring, GPS position/geofence alerts, bilge activity, tank levels, security/entry with add-on sensors, temperature; "Choose Your Subscription Plan"; supports up to 6 wireless sensors and 1 wired sensor; relay control for e.g. a remote battery switch | **Yes** — **$299.99 USD** for the main device, page states "Regular price $299.99 USD" | **Directly comparable in product shape** (device price + separate subscription), but **not an equivalent**: Siren 3 includes relay control, NMEA 2000 and a sensor ecosystem; MAREA WATCH's included contents, sensor scope and subscription content are all `OPEN` | USD, US storefront; subscription price not retrieved; VAT/sales-tax basis not stated on the retrieved page; sensor and accessory costs extra; not a MAREA benchmark, partner or cost input |
| Garmin OnDeck FAQ (support) | https://support.garmin.com/en-IE/marine/faq/833b6F58OK7pcEc93lNmh5/ | Vendor support description of the OnDeck service scope | Relay control (up to five), up to 30 security sensors via the app, shore-power status, battery voltages, vessel GPS heading | `NOT RETRIEVED` (no price on a support page) | **Context only.** Confirms the category's dependence on subscriptions and app delivery | Vendor support page; no price; no MAREA equivalence |

### 5.3 Battery, tank and environmental monitoring components (SENSE category)

| Manufacturer + product | Official URL (retrieved 2026-10-30) | What it actually is (category) | Published scope observed | Public price retrieved? | Honest equivalence to a MAREA SENSE module | Scope limitations |
| --- | --- | --- | --- | --- | --- | --- |
| Victron Energy BMV-712 Smart | https://www.victronenergy.com/battery-monitors/bmv-712-smart | **Battery monitor** (shunt-type, Bluetooth, app) | Bluetooth built-in; VictronConnect app for configuration, history and trends | **`NOT RETRIEVED`** — the retrieved page showed no price | **Category analog for `SENSE-POWER`, not an equivalent.** A mature battery-monitoring product with an app; a SENSE module is intended to be one part of a broader local measurement family with its own calibration and display-state contract | No price verified; no MAREA accuracy claim exists to compare; different ecosystem |
| Yacht Devices product range (e.g. YDBM-02 battery monitor, YDTA-01/YDTA-04 tank adapters, YDTC-13 thermometer, YDHS-01 humidity, YDBC-05 barometer) | https://www.yachtd.com/products/ | **NMEA 2000 sensor and adapter modules** | Range of NMEA 2000 devices published with stated measurement ranges/accuracies (e.g. thermometer ±0.5 °C, barometer ±1 hPa, humidity ±2 % RH), battery monitor, tank adapters, rudder adapter, and an autopilot course computer with AUTO/WIND/TRACK modes | **`NOT RETRIEVED`** — the retrieved page showed no prices | **Category analog for SENSE modules, not an equivalent.** These modules are NMEA 2000-native; MAREA SENSE is **not** NMEA 2000-implemented (`SENSE_NMEA2000 = NOT_IMPLEMENTED`) and must never imply it | No prices verified; NMEA 2000 orientation; vendor accuracy figures are the vendor's own published claims, not MAREA evidence, and no MAREA accuracy figure may be published |

### 5.4 What the retrieved comparator evidence actually shows

1. **Every family has mature, commercially available competitors.** That is a commercial fact, not a MAREA
   differentiation claim, and it makes the evidence discipline stricter, not looser.
2. **Two prices were actually retrieved** (Raymarine EV-400 kit 3.623,95 € incl. IVA; Siren 3 main device
   $299.99 USD); the Raymarine RCU-1 remote was published at $999.00 AUD inc. GST. Every other product in these
   tables is recorded as `NOT RETRIEVED` and no price may be inferred, estimated or copied.
3. **Product shape matters more than price.** The WATCH category is a *device price plus a monthly subscription*
   in both retrieved examples; the PILOT category is a *kit price plus a separately priced drive plus
   installation*. MAREA's own structure (quotation-based PILOT; hardware + subscription WATCH) is consistent
   with those shapes — which is a structural observation, **not** validation of any figure.

## 6. What the comparator evidence does not establish

- It establishes a published point on a date. It establishes **no** supplier cost, BOM, import duty, freight,
  certification cost, support cost, channel margin, conversion rate, market size, forecast, willingness to pay
  or achievable price for EMBARCARTE.
- Currency, VAT/tax basis, territory, included accessories, subscription content and installation scope differ
  between rows; **no net-price ranking is computed and none may be inferred**.
- No statement here claims that a MAREA product is cheaper, better, equivalent or competitive. No vendor's
  performance language is repeated as a MAREA claim, and no vendor is named in customer copy.

## 7. Cost frameworks — named symbolic inputs only

**Rule: no numeric value may be entered in these tables without a real supplier quotation, test-house
quotation, contract or measurement.** Each symbol resolves to `OPEN` or `BLOCKED` today. Symbols are planning
vocabulary, not amounts.

### 7.1 PILOT — surveyed, installed steering system

| Symbol | Input (what it is) | Cost behaviour | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `C_CTRL` | Control electronics / control computer (PCB, assembly, test) | Variable per unit + one-off NRE | `BLOCKED` | Frozen design + contract-manufacturer quote (H-05, H-07) |
| `C_MDRV` | Motor driver / power stage (incl. heatsink, protection) | Variable per unit | `BLOCKED` | Supplier quote + thermal/EMC pre-scan |
| `C_ACT` | Drive / actuator unit selected per vessel | Variable per quotation | `BLOCKED` | Drive-family selection + supplier/distributor quotes (H-03, H-05) |
| `C_SENS` | Sensors (heading, rudder/feedback where required, wind for Sail) | Variable per unit | `BLOCKED` | Component selection + quotes (H-01, P-05 for wind) |
| `C_FDBK` | Steering/rudder feedback components | Variable per survey | `BLOCKED` | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND` |
| `C_HEAD` | Control head (display, keys, enclosure, E-stop interface) | Variable per unit + tooling | `BLOCKED` | Enclosure/tooling quote + BOM (H-07) |
| `C_CABLE` | Cabling, harness, connectors, glands | Variable per installation | `BLOCKED` | Harness drawing + supplier quote |
| `C_PWR` | Power protection (fusing, contactor, isolation, suppression) | Variable per installation | `BLOCKED` | Electrical safety review + quote |
| `C_ESTOP` | E-stop assembly (physical, independent of firmware) | Variable per unit | `BLOCKED` | `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND` (H-10) |
| `C_MECH` | Mechanical interfaces, brackets, mounting hardware | Variable per survey | `BLOCKED` | Mechanical design + quotes |
| `L_INST` | Installation labour (hours × rate) | Variable per installation | `BLOCKED` | Measured installation hours on representative vessels (X-05, X-06) |
| `C_COMM` | Commissioning: dockside validation, calibration, sea trial, training, records | Variable per installation | `BLOCKED` | Measured commissioning hours + a sea-trial programme (H-01) |
| `T_TEST` | Physical testing: bench, HIL, EMC pre-scan, environmental, sea trials | Fixed NRE per design generation | `BLOCKED` | Test plan + test-house and vessel-time quotes (H-01, H-10) |
| `C_CONF` | Conformity: CE/EMC/LVD/RED/GPSR/CRA, technical file, declared standards, manuals (ES/EN) | Fixed NRE per family | `BLOCKED` | Accredited test-house quotation + conformity route (H-06, H-13) |
| `R_WARR` | Warranty reserve (expected failure rate × replacement + labour + logistics) | Recurring accrual | `BLOCKED` | Reliability data from pilot installations; warranty terms (X-02) |
| `C_MAINT` | Maintenance and service (spares, firmware, field calls) | Recurring | `OPEN` | Maintenance plan + measured service calls |
| `M_CHAN` | Installer/channel margin (the price of stock, installation interface, first-line support, warranty handling, lead generation) | Channel margin | `BLOCKED` | Written installer/distributor terms (X-05, X-06) |
| `TAX_P` | VAT/import duty per territory | Tax | `OPEN` | Written tax advice |

### 7.2 SENSE — sensor modules and kits

| Symbol | Input | Cost behaviour | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `C_MOD` | Module cost (sensor element, PCB, firmware, assembly, test) | Variable per unit + one-off NRE | `BLOCKED` | BOM/RFQ per module (P-05, H-05, H-07) |
| `C_HOUS` | Housing, seals, connectors, potting, mounting hardware | Variable per unit + tooling | `BLOCKED` | Enclosure quote + ingress test plan (`SENSE_INGRESS_PROTECTION = NOT_VERIFIED`) |
| `C_CAL` | Calibration: procedure, fixture, per-unit calibration time, re-calibration policy | Variable per unit + fixed fixture | `BLOCKED` | Calibration plan + measured cycle time (`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`) |
| `C_PACK` | Packaging (ESD protection, inserts, multilingual labels) | Variable per unit + artwork NRE | `OPEN` | Packaging quote + artwork localisation |
| `L_INST_S` | Installation labour per module or kit (single visit assumption `OPEN`) | Variable per installation | `BLOCKED` | Measured installation hours (X-05, X-06) |
| `K_KIT` | Kit composition: kitting labour, box, extra documentation, kit-level test | Variable per kit | `OPEN` | Kit definition frozen + measured kitting time |
| `R_WARR_S` | Warranty/replacement reserve per module | Recurring accrual | `OPEN` | Field reliability data; warranty terms (X-02) |
| `M_DIST` | Distributor/installer economics (trade margin, stock rotation, first-line support) | Channel margin | `BLOCKED` | Written channel terms (X-05, X-06) |
| `C_CERT_S` | Module conformity (EMC, LVD where applicable, CRA for connected modules, WEEE/RoHS) | Fixed NRE per module family | `BLOCKED` | Test-house quotes (H-06) |
| `FULFIL_S` | Freight, warehousing, returns handling | Variable/recurring | `OPEN` | Carrier + 3PL rate cards |
| `PAY_S` | Payment and chargeback fees | Variable per order | `OPEN` | Payment-provider schedule |

### 7.3 WATCH — hardware plus recurring service

| Symbol | Input | Cost behaviour | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `C_BOM_W` | Hardware BOM (board, enclosure, sensors, power, antennas) | Variable per unit + NRE | `BLOCKED` | BOM/RFQ (H-11, H-05) |
| `C_MODEM` | Cellular and/or Wi-Fi modules, SIM/eSIM hardware | Variable per unit | `BLOCKED` | Module selection + quotes (H-11, H-12) |
| `C_CONN` | Connectivity/data plan (per device per month, data cap) | Recurring variable | `BLOCKED` | Written MVNO/operator terms (H-12) |
| `C_ROAM` | Roaming and coverage package | Recurring variable | `BLOCKED` | Roaming terms + coverage evidence (H-12) |
| `C_INGEST` | Cloud ingestion and processing (compute, queues, functions) | Recurring variable | `OPEN` | Cloud quotation at named volume assumptions (P-06) |
| `C_STORE` | Storage and retention (history windows are `OPEN`) | Recurring variable | `OPEN` | Provider quotation; retention decision (D-09) |
| `C_NOTIF` | Notification provider (push/SMS/email) fees | Recurring variable | `BLOCKED` | Provider price schedule in writing |
| `C_DASH` | Dashboards, app and admin surfaces (development + maintenance) | Fixed + recurring | `OPEN` | Engineering estimate + store terms if distributed via stores |
| `C_SUP_W` | Customer support per device and per ticket | Recurring | `OPEN` | Support model + measured ticket rate |
| `C_SUB` | Subscription/billing platform (entitlement service, dunning, retries) | Recurring fixed + per-transaction | `OPEN` | Billing-provider schedule (`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`) |
| `PAY_W` | Payment processing and chargeback fees | Variable per transaction | `OPEN` | Payment-provider schedule |
| `C_REPL` | Device replacement / RMA / refurbishment (failure rate × unit + labour + logistics) | Recurring variable | `OPEN` | Reliability data + RMA process (X-07) |
| `C_CERT_W` | Conformity for a radio device (RED, EMC, LVD, GPSR, CRA, WEEE) | Fixed NRE per family | `BLOCKED` | Accredited test-house quotes (H-06, H-13) |
| `CHURN` | Churn rate per cohort | Recurring driver | `OPEN` | Observed cohort from a pilot |
| `CAC_W` | Customer acquisition cost (hardware + subscription) | Variable per customer | `OPEN` | Measured acquisition cost (X-06, MC-09/MC-10) |
| `M_CHAN_W` | Channel margin / installer referral (if sold through dealers) | Channel margin | `BLOCKED` | Written channel terms (X-05, X-06) |

### 7.4 Cost-behaviour classification (binding, so no figure is double-counted)

| Behaviour | Definition | Examples across the three families |
| --- | --- | --- |
| One-off / NRE | Paid once per design generation, amortised over volume or absorbed | Tooling, enclosure NRE, conformity, technical file, packaging artwork, control-head tooling, firmware platform |
| Recurring fixed | Paid every period regardless of installed base | Cloud platform baseline, dashboards maintenance, support staffing, billing platform, notification-provider minimums |
| Recurring variable | Scales with active devices or subscriptions | Connectivity/data, roaming, cloud ingestion/storage per device, notification per message, support per ticket |
| Variable per unit | Scales with units produced/shipped | BOM, assembly, test, calibration time, packaging, freight, payment fees, installation hours |
| Channel margin | Paid to the party that stocks, installs, supports and generates demand | Installer/distributor trade margin, referral fees |
| Warranty liability | Accrued now, paid later | Failure rate × replacement cost + labour + logistics + returns handling |
| Taxes and duties | Territory-dependent, not revenue | VAT (goods vs digital service), import duty, WEEE/environmental fees |

## 8. Contribution model and the quotation recommendation for PILOT (D-009)

### 8.1 Symbolic formulas — no figures substituted

```text
PILOT (quotation-based, per vessel):
  Q_gross     = Σ(included scope symbols) + L_INST + C_COMM + T_alloc + R_WARR_alloc
                + M_CHAN + TAX_P                    (all symbols OPEN/BLOCKED today)
  quotation   = itemised schedule of included and excluded items, per D-009
  approval    = requires Q_verified from real RFQs, measured installation and a signed channel term

SENSE module / kit:
  NR          = G / (1 + v)                          net revenue from a VAT-inclusive retail price G
  VC          = C_MOD + C_HOUS + C_CAL + C_TEST + C_PACK + FULFIL_S + PAY_S + R_WARR_S + C_SUP_S + M_DIST
  C_u         = NR - VC                              contribution per unit
  CM          = C_u / NR                             only valid once every input is sourced
  Break-even  = F / C_u        where F = C_CERT_S + tooling + kitting NRE + fixed overhead

WATCH (hardware + subscription):
  NR_W        = G_W / (1 + v)
  VC_W        = C_BOM_W + C_MODEM + C_CERT_W_alloc + C_PACK + FULFIL + PAY_W + C_REPL + M_CHAN_W
  C1_month    = NR_sub_month - (C_CONN + C_ROAM + C_INGEST + C_STORE + C_NOTIF + C_DASH_alloc
                               + C_SUP_W + C_SUB + PAY_W)
  LTV         = Σ(k=1..n) C1_k - CAC_W               n = expected paying months (OPEN)
  PAYBACK     = CAC_W / C1_month                     only after both inputs exist
  D*          = G - T_min, T_min solving (T_min/(1+v_b2b)) - VC = C_target   (C_target OPEN)
```

### 8.2 Formal recommendation — PILOT is sold by quotation, not by price list (D-009)

This document **formally recommends the quotation-based model** for every PILOT configuration:

1. **No retail SKU and no list price.** A steering system is configured by survey; a list price would either
   over-charge the simple boat or under-charge (and under-deliver) the complex one.
2. **`from EUR 1,290` is a starting-price hypothesis for the minimum usable Coastal configuration**, permitted
   only in internal documents labelled `HYPOTHESIS_UNAPPROVED`. It is **not** turnkey, **not** an all-inclusive
   quotation, **not** publishable as a "from" offer and **never** summed into a bundle (README §17–§18).
3. **The quotation is the product description.** It must name every included item (control head, control
   computer, motor control, drive, feedback, sensors, cabling, power protection, E-stop, isolation, labour,
   commissioning, sea trial, training, records, warranty position) and every exclusion (charts, NAV, HUB, AIS,
   connectivity, spares, structural work, territory restrictions).
4. **Margin is managed per quotation, not per SKU.** A single below-cost configuration must not be cross-subsidised
   invisibly: the quotation worksheet has to show the contribution of the specific scope.
5. **No discount is ever applied to a hypothesis.** A trade or promotional discount may only apply to an approved,
   costed price list (section 9.3).

### 8.3 Channel model

| Motion | How it works | Where it applies | Status |
| --- | --- | --- | --- |
| Direct-to-consumer (D2C) | EMBARCARTE sells, invoices, fulfils, supports; installation is separate | SENSE modules (simple hardware), WATCH hardware + subscription | `OPEN` — no shop, no stock, no approved price |
| Installer-led quotation | Installer surveys, proposes, installs, commissions, trains, gives first-line support; EMBARCARTE owns product, matrix authority and product warranty | PILOT (only credible route); complex SENSE/WATCH installations | `BLOCKED` — no installer network, agreements or rate cards (X-05, X-06) |
| Quotation-based service scope | The commercial document is a vessel-specific quotation with an itemised schedule | `PILOT-PRO` always; `PILOT-COASTAL`/`SAIL` in practice | `BLOCKED` — no measured scope or costed worksheet |
| Subscription resale/referral | Whether a channel partner resells or refers the WATCH subscription | WATCH through dealers | `OPEN` — no decision, no terms |

**Channel principles.** (a) Installation labour is always quoted separately and never folded invisibly into a
product price; "installation included" language is prohibited because no installation price exists. (b) A trade
discount is the price of real partner services, its ceiling derived from the contribution model (`D*`), never
from a competitor price list. (c) No reseller agreement exists; nothing here constitutes a reseller term or
commitment. (d) A channel partner must never be asked to quote a hypothesis price as if it were approved.

## 9. Renewal, subscription and cancellation framework (WATCH)

| Event | Intended behaviour (framework — not approved policy) | Status |
| --- | --- | --- |
| Term start | Subscription activated at purchase/activation; monthly or annual term stated; no charge without explicit consent | `OPEN` |
| During term | Declared service: monitoring, alert delivery attempts, history window, device and user counts; **contents still `OPEN`** | `OPEN` |
| Connectivity outage | Events buffered and delivered after reconnection; stale values always shown with age; no "always-on" promise | `OPEN` (design requirement) |
| Failed payment | Grace period, retry and dunning defined in writing; **remote monitoring may stop, local functions never** | `OPEN` |
| Cancellation | Access continues to term end; data export of the customer's own records offered before expiry; history retention stated | `OPEN` |
| Price change at renewal | Only with the advance notice the law requires; no dark patterns, no false urgency | `OPEN` |
| Hardware out of warranty | Service may continue but replacement is chargeable; terms not written | `OPEN` |
| No double billing | Where a shared entitlement exists (e.g. WEATHER on a NAV account), the same entitlement is never billed twice | `OPEN` — not implemented |

The **subscription-isolation rule** (README §16 rule 7) is a price-model constraint: no entitlement may be
structured so that its lapse degrades local steering, local alarms or valid local sensing.

## 10. VAT, tax and invoicing

- Consumer hypotheses are stated **VAT-inclusive**; the applicable Spanish or Member-State rate is `OPEN` pending
  written tax advice. No rate is asserted as approved.
- B2B quotations are intended as **ex-VAT** to VAT-registered buyers. Place of supply, intra-EU reverse charge,
  One-Stop-Shop treatment of digital services and territory-specific regimes are `OPEN`; the goods-vs-services
  classification of each object drives the analysis.
- The seller's legal identity is a blocker (`X-02`): no tax identifier, address or registration number may be
  fabricated, so no compliant invoice can be issued today.
- Comparative or crossed-out pricing claims are out of scope and must not appear anywhere.

## 11. What no document in this milestone may say

| Forbidden statement | Why |
| --- | --- |
| Any figure from section 3 presented as a price, offer, launch price, discount or "available from" | Every figure is `HYPOTHESIS_UNAPPROVED`; claims policy §2 Class C and §6 |
| Any figure other than the four permitted hypotheses | README §17 prohibits everything else (`PILOT-SAIL`, `PILOT-PRO`, SENSE kits, `WATCH-PLUS`, data plans, labour, extended warranty, roaming) |
| Any margin, mark-up, BOM value, channel percentage or payback period | Every input is `OPEN`/`BLOCKED`; a subtraction of unknowns is unknown |
| Any competitor price as an EMBARCARTE price, or any cost derived from it | A public price is not a supplier cost; no FX conversion was performed |
| Any superiority, parity or "cheaper than" comparison | No comparative evidence exists (claims policy §2 Class P) |
| Any claim that a sub-1,290 PILOT, a 99 SENSE module or a 299 WATCH device is profitable | No costed worksheet exists |
| "Free" connectivity, "included" SIM, "lifetime" subscription or "no subscription needed" for WATCH remote functions | Connectivity terms `NOT_FOUND`; claims policy §6 |

## 12. Status statement

Every figure in this document is `HYPOTHESIS_UNAPPROVED` or a dated `VERIFIED_EXTERNAL` observation, or the
explicit words `NOT ESTABLISHED` / `NOT RETRIEVED`. **No approved price exists for any MAREA product.** No price
appears in any checkout, catalogue, product page, advertisement, structured-data offer or quotation, and none may
be added. A price becomes usable only after it has been costed from real quotations and measurements, reviewed,
approved through the programme's pricing decision, and published for a SKU that has reached `OPERATIONS_READY` —
which no batch-02 product has. Until then the correct customer-facing state is a quotation request or an
availability statement that matches true readiness — never a number.

## 13. Evidence MC-11, MC-12 and MC-13 must obtain before any price approval

This is the complete, exact list. Every item is external: none can be produced by documentation work, and none
may be filled with an analyst estimate, a search snippet or a competitor's public price.

### 13.1 MC-11 — hardware, BOM and conformity (all three families)

1. **Written supplier RFQs** for every PILOT electronic assembly (control computer, motor driver, control head,
   E-stop assembly, harness) and the surveyed drive families, with volume tiers, MOQ, lead time and lifecycle
   commitment.
2. **Written supplier RFQs** for every SENSE module (sensor element, PCB, housing, seals, connectors) per module,
   with volume tiers, MOQ, lead time and lifecycle commitment.
3. **Written supplier RFQs** for the WATCH device (board, cellular/LTE-M module, Wi-Fi module, antennas,
   enclosure, power/backup) with the same terms, **plus** module certification evidence (CE/RED) where an
   already-certified module is used.
4. **Frozen BOMs and design freezes** for one Coastal PILOT configuration, one SENSE module (starting with the
   entry hypothesis), and the WATCH device — including revision control and a serial/traceability scheme.
5. **Contract-manufacturer quotations** for assembly, programming, test, packaging and quality inspection, per
   product family, at named volumes.
6. **Accredited test-house and conformity quotations** per family: CE/EMC, LVD, RED (WATCH), GPSR, CRA, RoHS/WEEE,
   technical file, EU declaration of conformity and translated manuals (ES/EN).
7. **Environmental and ingress test plan and quotation** for SENSE modules and the WATCH device (thermal, humidity,
   salt, vibration, IP rating) — no IP rating may be published before the test report exists.
8. **PILOT-specific safety evidence plan and quotation:** bench and HIL campaign, E-stop and independent
   motor-power isolation verification, hardware watchdog and fail-closed behaviour, FMEA, independent safety
   review, supervised sea-trial programme and vessel time.
9. **Measured installation and commissioning hours** on at least two representative vessels per family (PILOT:
   steering types; SENSE: masthead and below-decks; WATCH: power/antenna route), with photographs and a timed
   record.
10. **Component lifecycle/EOL statements** and manufacturer trademark/supply constraints for every third-party
    module used, plus the NMEA licensing decision (`DEC-05`) because no NMEA 2000 cost or certification exists.
11. **Connectivity hardware and contract evidence:** MVNO/operator terms, SIM/eSIM logistics, roaming policy and
    measured coverage at representative berths (Galicia/northern Portugal), including outage behaviour.
12. **Notification-provider written terms and price schedule** (push/SMS/email), with delivery-record capability
    and an agreed definition of "delivered".

### 13.2 MC-12 — unit economics, channel and pricing decision

13. **Bottom-up costed worksheet** per object (`PILOT-COASTAL` minimum configuration, one SENSE module, SENSE kits,
    `WATCH-CORE` hardware, `WATCH-CORE` subscription) filling every symbol in section 7 from the MC-11
    quotations — no symbol left as a guess.
14. **Negotiated channel terms:** installer/distributor discount expectations, payment terms, stock rotation,
    warranty handling, first-line support and escalation, and who invoices what (PILOT labour vs product).
15. **Installer day-rate and service-call rate card**, plus the measured labour content of each installation type.
16. **Warranty and returns policy** with a reliability assumption grounded in pilot data, an RMA process
    definition, and the legal identity and terms of the seller (`X-02`).
17. **Support cost baseline** (staffing, ticket rate per unit, documentation and training load) for each family,
    including the installer's support boundary.
18. **Payment-provider and subscription-billing fee schedules** in writing, including chargeback, refund and
    dunning costs; app-store terms if any consumer distribution route is chosen.
19. **Cloud cost quotation** for WATCH at named device volumes and retention windows, plus the retention decision
    (`D-09` if any AIS-derived data is involved).
20. **Customer willingness-to-pay evidence** from structured discovery (MC-09/MC-10), testing each hypothesis as a
    neutral question — starting price, coastal configuration, SENSE entry module, WATCH hardware and the monthly
    subscription — never as an offer.
21. **Written VAT and cross-border tax advice** covering goods vs digital services per family, reverse charge,
    OSS, territory regimes, invoice wording and the seller's legal identity.
22. **Consumer-law review** of subscription, renewal, cancellation, withdrawal, price-change and warranty wording,
    including what happens to monitoring and history on cancellation.
23. **A pricing decision** for each object (approve / revise / withhold), with the costed worksheet attached, taken
    by the named human authority — not by an agent and not by a document.

### 13.3 MC-13 — verification gates that must be recorded before a price may be published

24. **PILOT:** bench evidence, E-stop and motor-isolation evidence, rudder/steering feedback evidence, supervised
    sea-trial records, independent safety review — closing `PILOT_SAFETY_GATE = BLOCKED` before any quotation is
    issued, let alone a price.
25. **SENSE:** measured accuracy, range, resolution and repeatability per module, a validated calibration
    procedure, and environmental/ingress test reports (`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`,
    `SENSE_INGRESS_PROTECTION = NOT_VERIFIED` closed).
26. **WATCH:** recorded telemetry ingestion, device identity/ownership/revocation, notification delivery records
    under real network loss (including `DELIVERY_UNKNOWN` cases), subscription/entitlement tests, and a
    subscription-isolation test proving local functions survive payment failure.
27. **Compatibility evidence:** the D5 rows that a price depends on (e.g. `I-01`, `I-04`, `I-06`, `I-08`, `I-11`)
    must be tested, because a price for an integration nobody can use is not a price.
28. **Operations readiness evidence:** stock/fulfilment capacity, support capability, returns process and payment
    capability for the specific SKU — the `OPERATIONS_READY` precondition for publication.

Related documents: `docs/marea/products/README.md` §17–§18; `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` (D4);
`PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (D5); `CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` (D7);
`PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` (D9); `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` (batch-01 D6);
`docs/marea/COMMERCIAL-PORTFOLIO.md` §04–§06; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6.
