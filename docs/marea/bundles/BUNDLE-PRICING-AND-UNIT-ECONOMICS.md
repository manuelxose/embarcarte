# MAREA — Bundle pricing and unit economics (MC-08 / D11)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D11 — BUNDLE-PRICING-AND-UNIT-ECONOMICS |
| Milestone | MC-08 (bundles, compatibility and lifecycle contract) |
| Date | 2026-10-30 |
| Owner | Pricing and Channel Economics Specialist (Agent E) |
| Status | INTERNAL · NOT PUBLISHED · PRICE HYPOTHESES UNAPPROVED · planning framework only |
| Base commit | `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` (MC-07 HEAD) |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Write scope | `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (this file only) |
| Is not | Not a price list · not a supplier cost · not an approved margin · not a commercial offer · not a quotation · not a sellable bundle · not a substitute for MC-11/MC-12 evidence |
| Binds on | `docs/marea/COMMERCIAL-PORTFOLIO.md`, `docs/marea/products/README.md` §5/§8/§17/§26–§31, `PRODUCT-PRICING-AND-CHANNEL-MODEL*.md` (batches 01–03), `docs/marea/execution/DECISION-LOG.md` D-007–D-017, `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` |
| Independent review | D19 (`docs/marea/bundles/MC-08-REVIEW.md`, Agent G). This document cannot pass any commercial gate on its own |

## 1. Purpose, status statement and the one thing never to misread

### 1.1 Purpose

This document is the bundle-level **pricing and unit-economics framework** for the six MC-08 bundles: MAREA
START, MAREA CRUISE, MAREA SAIL, MAREA PROTECT, MAREA COMPLETE and the MAREA FLEET package. It does two jobs
and only two:

1. it fixes a **symbolic, bottom-up cost and contribution structure** for hardware, services and subscriptions,
   so that a future finance function can fill in a per-bundle worksheet from real quotations without inventing
   a single figure; and
2. it **challenges the six historical bundle price hypotheses** (START 499, CRUISE 1,399, SAIL 1,990,
   PROTECT 399 plus subscription, COMPLETE 3,490, FLEET package bespoke) by computing what the fixed reference
   configurations would cost **if the permitted internal retail hypotheses were usable as price anchors**, listing
   what those sums omit, and recording an explicit verdict for each.

It does not price anything. It cannot price anything: the cost inputs do not exist.

### 1.2 Explicit status statement

- **A bundle definition is not a quotation and not an orderable SKU.** MC-08 defines bundle *contents*, inclusion
  and exclusion rules and a quoted-service boundary; it creates no purchasable object, no checkout line, no
  catalogue entry and no order flow. No bundle is a product family or an edition, no bundle carries a `pricing`
  value better than `HYPOTHESIS_UNAPPROVED`, and every bundle's availability state is `NOT_FOR_SALE`.
- **A definition milestone creates no approved price.** Every figure in this file is a programme
  `HYPOTHESIS_UNAPPROVED` carried unchanged from the canonical hypothesis register, a required arithmetic
  restatement of those hypotheses, or a symbol with status `OPEN`/`BLOCKED`. There is no BOM, no supplier
  quotation, no labour rate, no certification cost, no channel agreement, no connectivity or payment-cost
  quotation, and no VAT determination (X-05 and the related blockers below). A demonstration that a hypothesis
  is arithmetically consistent with other hypotheses is **not** costing and **not** pricing.
- **A PASS does not approve historical prices.** Even if MC-08 passes its definition, compatibility and
  lifecycle scope, and even if the independent reviewer finds this framework sound, **no historical bundle price
  is validated, approved, released, published or made usable**. The single permitted consequence of a PASS is
  that the bundle *definition* is internally consistent and the *economics questions* are correctly posed.

For the avoidance of doubt and to close the most common misreading: the words "approved", "final", "launch",
"from EUR" as an offer, "available" and "turnkey" never describe a bundle price in this document. They appear
only inside prohibitions. `pricing = HYPOTHESIS_UNAPPROVED` everywhere.

### 1.3 The one thing never to misread

> **A component price hypothesis is not a cost, and a sum of retail hypotheses is not a cost basis.**

A retail hypothesis (for example HUB Standard at EUR 349) is an unapproved statement about what a customer might
one day pay. It says nothing about what the product costs EMBARCARTE to make, certify, ship, support, install or
warrant. Adding several hypotheses together therefore produces a **reference sum of retail hypotheses** — a
useful arithmetic anchor for challenging a bundle headline, and nothing more. Every bundle sum in §6 is exactly
that: an arithmetic anchor, not a BOM, not a cost, not a margin, not a price and not a quotation.

Two corollaries that this document enforces everywhere:

1. **A hypothesis revision is not a cost movement.** If a component hypothesis is later revised upward, the
   bundle reference sum rises, but the bundle's production and service cost does not change. The two effects are
   never netted as if a retail price were a cost.
2. **A computed difference is not a discount, and a discount is not a pricing policy.** §6 records implied
   differences because the programme requires them; §7 states that no discount percentage, no approved discount
   and no discountable approved price exists.

## 2. Evidence classes and vocabulary

Every statement in this file carries one of the following classes. Where a class cannot be attached, the field
stays `OPEN` or `BLOCKED`; no unlabelled assertion is permitted.

| Class | Meaning in this document |
| --- | --- |
| `VERIFIED_REPO` | verifiable in this repository, with the path cited (for example `docs/marea/products/README.md` §8) |
| `VERIFIED_EXTERNAL` | a dated observation of another company's published price or terms at a cited URL; **never** an EMBARCARTE cost, an available price or a benchmark of MAREA economics. No new external retrieval is performed in this file; the comparators of MC-05/MC-06/MC-07 are cited only as context |
| `HYPOTHESIS_UNAPPROVED` | a programme commercial hypothesis awaiting costing and a pricing decision; never an offer |
| `ASSUMPTION` | an explicit planning premise used only to structure a calculation; never evidence and never a number presented as fact. The only scenario assumption in this file is the clearly labelled VAT illustration rate of §8.3 |
| `OPEN` | fact not yet established, with the exact evidence that would close it named |
| `BLOCKED` | an external condition (quotation, certificate, licence, measurement, contract, legal advice) prevents closure |
| `NOT_ESTABLISHED` | no figure exists for the object, and none may be stated or derived |
| `HISTORICAL_HYPOTHESIS` | a bundle hypothesis carried from `COMMERCIAL-PORTFOLIO.md`; recorded here for challenge only |

`TBD` is prohibited. A missing fact is `OPEN`/`BLOCKED`/`NOT_ESTABLISHED`, never a placeholder and never an
analyst estimate.

### 2.1 The unit of analysis

The unit of analysis is **one bundle configuration for one vessel for a defined term**, because that is the only
level at which the parts are comparable:

- a bundle mixes a **one-off hardware** hypothesis (HUB, AIS, DISPLAY, WATCH device, SENSE modules) with a
  **one-off installed-service** hypothesis (PILOT, only as a quotation) and with **annual** and **monthly**
  subscriptions (NAV, WATCH, FLEET);
- therefore a bundle headline is only meaningful with a stated **term** (first-year price, renewal price,
  hardware-only price, or installed-and-commissioned price) and a stated **territory/VAT basis**;
- mixing periods silently — for example comparing a one-year NAV entitlement with one-off hardware — is a
  modelling defect that this file flags per bundle instead of hiding it in one total.

## 3. Bundle object model and the fixed reference configurations

### 3.1 What a bundle is, and the rule that governs its price

A bundle is a **distinct commercial object** consisting of named product editions plus named services, with
enumerable inclusions and exclusions. It is **not** a product family, it is not a tenth edition set, and it is
not an orderable SKU while any included SKU is not `OPERATIONS_READY` and no bundle price has been costed and
decided through the pricing decision.

Rule carried from `COMMERCIAL-PORTFOLIO.md` and `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` §12:

```text
bundle price  =  Σ(standalone contributions of the included objects)
                 − shared cost savings actually evidenced
                 − channel margin actually negotiated
bundled value =  the customer benefit that justifies any difference between that result and Σ hypotheses
```

That equation contains no computed value in this programme: the contributions are `OPEN`/`BLOCKED`, the shared
savings are unmeasured, and no channel margin exists. The equation is therefore a test to be applied later, not
a price to be computed now. It also fixes the direction: **a bundle may never be an arbitrary marketing
subtraction**, and it may never be assembled by summing the permitted retail hypotheses and calling the result
a price.

### 3.2 The six fixed reference configurations

The configurations below are fixed by the MC-08 brief and are not re-decided here. The bundle identifiers are
context objects, not product families and not editions.

| Bundle | Reference configuration (fixed) | Period structure | Historical hypothesis | Components whose price is `NOT_ESTABLISHED` and therefore excluded from the arithmetic |
| --- | --- | --- | ---: | --- |
| MAREA START | `HUB-STANDARD` + `NAV-PRO` | HUB one-off + NAV one year | EUR 499 | none (both components carry hypotheses) |
| MAREA CRUISE | `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7` | three one-off hardware items + NAV one year | EUR 1,399 | `AIS-CONNECTED` (conditional, not selected); `DISPLAY-LARGE-CONDITIONAL` (`NOT_ESTABLISHED`, ineligible) |
| MAREA SAIL | `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (quotation required) + `SENSE-WIND` (conditional steering input) | NAV one year + HUB hardware + PILOT vessel-specific installed scope + SENSE-WIND hardware | EUR 1,990 | `PILOT-SAIL` (`NOT_ESTABLISHED`); `PILOT-PRO` (`INSTALLATION_PACKAGE`, quotation only); `SENSE-WIND` price (`NOT_ESTABLISHED`) |
| MAREA PROTECT | `WATCH-CORE` hardware + `SENSE-ESSENTIALS` kit (= `SENSE-POWER` + `SENSE-BILGE`) + `WATCH-CORE` monitoring subscription | WATCH one-off + subscription monthly + kit one-off | EUR 399 plus subscription | `SENSE-ESSENTIALS` kit price (`NOT_ESTABLISHED`); each module price (`NOT_ESTABLISHED`); `WATCH-PLUS` (`NOT_ESTABLISHED`) |
| MAREA COMPLETE | `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + `SENSE-POWER` + `SENSE-BILGE` + `SENSE-TANKS` + `SENSE-ENV` + `PILOT-COASTAL` (quotation required) | NAV one year + hardware + WATCH subscription excluded + PILOT vessel-specific installed scope | EUR 3,490 | all four SENSE module prices (`NOT_ESTABLISHED`); `PILOT-PRO`; `WATCH-PLUS`; no AIS or WEATHER object is included |
| MAREA FLEET package | `FLEET-START`/`FLEET-BUSINESS` subscription + onboarding + registration/migration + training + support; hardware, connectivity and installation optional and quoted | subscription per vessel per month (VAT excluded) + one-off services per organisation + optional hardware | Bespoke (no amount) | `FLEET-ENTERPRISE` (`NOT_ESTABLISHED`); onboarding price; migration price; training price; support price; hardware, connectivity and installation costs |

### 3.3 Period and VAT-basis labels that travel with every bundle figure

| Bundle | Consumer/B2B route | VAT basis of the headline hypothesis | Term that must be stated with any future price |
| --- | --- | --- | --- |
| START | D2C or installer-led | consumer retail, VAT-inclusive hypothesis, rate `OPEN` | first year (NAV) + hardware; renewal price is a separate object |
| CRUISE | D2C or installer-led | consumer retail, VAT-inclusive hypothesis, rate `OPEN` | first year (NAV) + hardware; installation excluded |
| SAIL | installer-led quotation | consumer retail hypotheses for NAV/HUB, PILOT is a vessel-specific quotation, rate `OPEN` | quotation scope, not a term price |
| PROTECT | D2C hardware + subscription | consumer retail, VAT-inclusive hypothesis, rate `OPEN`; subscription billed monthly | hardware one-off + subscription term; connectivity excluded |
| COMPLETE | installer-led quotation | consumer retail hypotheses, PILOT quoted, rate `OPEN` | quotation scope; subscription years excluded from the hypothesis |
| FLEET package | B2B contracted | **VAT excluded** (frozen for FLEET pricing, D-014) | contract term per organisation; onboarding and service scope explicit |

## 4. Parameter registry

Every symbol used anywhere in this document is registered here. **No value is invented**: a symbol either
carries a permitted programme hypothesis (with its exact status) or is `OPEN`/`BLOCKED`/`NOT_ESTABLISHED` with
the artefact that would close it. Blockers use the ids of
`docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`.

### 4.1 Permitted price hypotheses used as named arithmetic inputs

These are the **only** product figures that may appear, and they are `HYPOTHESIS_UNAPPROVED`. The batch-01
figures come from `docs/marea/products/README.md` §8, the batch-02 figures from §17, the batch-03 figures from §26.

| Symbol | Object | Permitted hypothesis | Unit / period | Status | What would validate it |
| --- | --- | --- | --- | --- | --- |
| `G_NAV_E` | `NAV-ESSENTIAL` | 99 | EUR / year | `HYPOTHESIS_UNAPPROVED` | Costed software worksheet (chart + weather licences, hosting, support, payments, acquisition) + willingness-to-pay evidence + pricing decision (X-05, D-01, D-04, X-06) |
| `G_NAV_P` | `NAV-PRO` | 149 | EUR / year | `HYPOTHESIS_UNAPPROVED` | As NAV Essential plus the incremental entitlement cost (X-05, D-01, D-04) |
| `G_HUB_S` | `HUB-STANDARD` | 349 | EUR one-off | `HYPOTHESIS_UNAPPROVED` | BOM/RFQ, assembly, enclosure and certification quotes, measured install time, channel terms (H-05, H-06, H-07, X-05, X-06) |
| `G_HUB_P` | `HUB-PRO` | 499 | EUR one-off | `HYPOTHESIS_UNAPPROVED` | As HUB Standard plus frozen port/protocol increment (H-04, H-05, H-07) |
| `G_AIS_R` | `AIS-RECEIVER` | 249 | EUR one-off | `HYPOTHESIS_UNAPPROVED` | Receiver RFQ, antenna/splitter inclusion decision, RF conformity, install time, channel terms (H-08, S-01, X-05) |
| `G_AIS_C` | `AIS-CONNECTED` | 399 | EUR one-off | `HYPOTHESIS_UNAPPROVED`, `CONDITIONAL` | As AIS Receiver plus documented networking/diagnostics scope; not selected in any fixed reference configuration except by explicit future decision |
| `G_PILOT_COASTAL_FROM` | `PILOT-COASTAL` | from 1,290 | EUR, vessel-specific installed scope | `HYPOTHESIS_UNAPPROVED`, **starting-price reference only, not an inclusive quotation** (D-009) | Costed vessel-specific quotation from real RFQs + measured installation; never a list price or bundle summand that is treated as a price |
| `G_WATCH_CORE_HW` | `WATCH-CORE` hardware | 299 | EUR one-off | `HYPOTHESIS_UNAPPROVED` | Device BOM, modem/module quotes, certification, packaging, fulfilment, channel terms; connectivity **not** included (H-11, H-12, X-05) |
| `G_WATCH_CORE_SUB` | `WATCH-CORE` monitoring subscription | from 9.90 | EUR / month | `HYPOTHESIS_UNAPPROVED`; included contents `OPEN` | Connectivity/data cost, roaming, cloud and provider fees, support, billing, churn (H-12, P-06, X-05) |
| `G_DISPLAY_7_FROM` | `DISPLAY-7` | from 699 | EUR one-off | `HYPOTHESIS_UNAPPROVED`; `SIZE_NOT_FROZEN`; installation separately quoted | Frozen industrial design and BOM, supplier RFQs, test-house quotation, measured assembly/fulfilment, channel terms (H-04, H-05, H-06, H-11, X-05) |
| `G_WEATHER_STD` | `WEATHER-STANDARD` | 49 | EUR / year | `HYPOTHESIS_UNAPPROVED` | Provider rights, provider cost per dataset and call volume, hosting/support cost, willingness to pay (D-04, D-05, D-07, X-05) |
| `G_WEATHER_PRO` | `WEATHER-PRO` | 89 | EUR / year | `HYPOTHESIS_UNAPPROVED` | Multi-model entitlement cost; conditional on provider rights (D-04, D-05, D-07) |
| `G_FLEET_START` | `FLEET-START` | 49 | EUR / vessel / month, **VAT excluded** | `HYPOTHESIS_UNAPPROVED` | Hosting, telemetry, storage, support, onboarding, payment cost per vessel; validated willingness to pay (H-12, P-09, X-05) |
| `G_FLEET_BUSINESS` | `FLEET-BUSINESS` | 79 | EUR / vessel / month, **VAT excluded** | `HYPOTHESIS_UNAPPROVED` | As FLEET Start plus richer permission/workflow/reporting/integration scope costed (H-12, P-09, X-05) |
| `G_SENSE_ENTRY_FROM` | cheapest single SENSE module, entry configuration | from 99 | EUR one-off | `HYPOTHESIS_UNAPPROVED`, **not attributable to any named module** (README §17) | Module BOM/RFQ, calibration and test, packaging, install scope, channel terms (P-05, H-05, H-07, X-05) |

Historical bundle hypotheses (challenged in §6, never validated):

| Symbol | Bundle | Historical hypothesis | Status |
| --- | --- | ---: | --- |
| `H_START` | MAREA START | 499 | `HISTORICAL_HYPOTHESIS` / `HYPOTHESIS_UNAPPROVED` |
| `H_CRUISE` | MAREA CRUISE | 1,399 | `HISTORICAL_HYPOTHESIS` / `HYPOTHESIS_UNAPPROVED` |
| `H_SAIL` | MAREA SAIL | 1,990 | `HISTORICAL_HYPOTHESIS` / `HYPOTHESIS_UNAPPROVED`; recorded verdict `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` |
| `H_PROTECT_HW` | MAREA PROTECT | 399 plus subscription | `HISTORICAL_HYPOTHESIS` / `HYPOTHESIS_UNAPPROVED`; recorded verdict `HISTORIC_PRICE_NOT_COST_JUSTIFIED` |
| `H_COMPLETE` | MAREA COMPLETE | 3,490 | `HISTORICAL_HYPOTHESIS` / `HYPOTHESIS_UNAPPROVED`; recorded verdict `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` |
| `H_FLEET_PKG` | MAREA FLEET package | Bespoke | `HISTORICAL_HYPOTHESIS`, no amount exists |

### 4.2 Objects with no established price — no amount may be attached, derived or interpolated

| Object | Status | What would establish it |
| --- | --- | --- |
| `PILOT-SAIL` | `NOT_ESTABLISHED`, `CONDITIONAL` on verified wind-angle steering (H-01) | Mode-specific verification + a costed Coastal-plus-wind scope |
| `PILOT-PRO` | `NOT_ESTABLISHED`, `INSTALLATION_PACKAGE` (D-008) — quotation only, not a retail SKU | Documented reference installations and quotations |
| `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV` | `NOT_ESTABLISHED` each — the "from EUR 99" entry hypothesis is not attributable to a named module | Independent module price/cost sheet from BOM/RFQ, calibration and test (P-05, H-05) |
| `SENSE-ESSENTIALS`, `SENSE-SAIL`, `SENSE-SYSTEMS` | `NOT_ESTABLISHED` kits — a kit is never the sum of module hypotheses and needs its own price/cost sheet | Kit definition frozen + kitting and test cost + independent sheet |
| `WATCH-PLUS` | `NOT_ESTABLISHED`, `CONDITIONAL` | Additional benefits validated and costed; never priced by uplift (D-011) |
| `DISPLAY-LARGE-CONDITIONAL` | `NOT_ESTABLISHED`, `CONDITIONAL` (`SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`) | Frozen size class, selected hardware, costed configuration |
| `FLEET-ENTERPRISE` | `NOT_ESTABLISHED`, `CONTRACTED_TIER` | Contracted scope, volumes, integration work, support model |
| Any onboarding, migration, training, installation, commissioning, extended warranty, data plan, roaming package, connectivity service | `NOT_ESTABLISHED` | Measured labour/content cost + written provider or channel terms |

### 4.3 Hardware cost parameters (all `OPEN` or `BLOCKED`)

No numeric value may be entered against any symbol in this table without a real supplier quotation, test-house
quotation or measurement. The symbol family is suffixed by object (`_HUB_S`, `_HUB_P`, `_AIS_R`, `_AIS_C`,
`_DISP7`, `_WATCH`, `_SENSE`, `_PILOT`) as required by the worksheet.

| Symbol | Cost input | Behaviour | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `BOM_*` | Bill of materials: SoC/MCU, radio, GNSS, storage, connectors, passives, power, protection, panel/touch (DISPLAY), sensor element (SENSE), modem (WATCH), drive/actuator and feedback (PILOT) | Variable per unit | `BLOCKED` | Written supplier RFQs per SKU with MOQ, volume tiers, lead time, lifecycle (H-05, H-07, H-11, X-05) |
| `ASSY_*` | PCB fabrication, SMT/THT assembly, programming, inspection | Variable per unit | `BLOCKED` | Contract-manufacturer quotation at named volumes (H-07, X-05) |
| `ENCL_*` | Enclosure, bezel, gasket, seals, potting, mounting hardware; `TOOL_NRE_*` for tooling | Variable per unit + one-off NRE | `BLOCKED` | Enclosure supplier quotation incl. tooling/NRE (H-05, H-07, H-11) |
| `PWR_*` | Power conversion and protection: 12/24 V input, fuse, reverse polarity, transient protection, isolation | Variable per unit | `BLOCKED` | Electrical design review + component quotes (H-11) |
| `CABLE_*` | Harness, connectors, glands, NMEA 0183/2000 items where selected, drop cables, adapters | Variable per unit / per installation | `BLOCKED` | Harness drawing + supplier quote + written inclusion/exclusion decision (H-04, H-07) |
| `ACC_*` | Accessories that a usable configuration requires but that are not inside the base SKU (AIS antenna/splitter, GPS antenna, extra mounts, charging mount) | Variable per unit | `OPEN`/`BLOCKED` | Supplier quotation + written inclusion decision per edition (`AIS antenna/splitter`: `OPEN`) |
| `MTEST_*` | Manufacturing and production test: jig, burn-in, functional test, EMC pre-scan, cycle time | Variable per unit + NRE | `BLOCKED` | Test plan + test-house and jig quotes (H-06, H-07) |
| `K_KIT` | Kit composition: kitting labour, outer box, extra documentation, kit-level test (SENSE kits and any multi-item pack) | Variable per kit | `OPEN` | Kit definition frozen + measured kitting time |
| `PACK_*` | Retail packaging: box, ESD protection, inserts, multilingual labels and quick-start, artwork NRE | Variable per unit + NRE | `OPEN` | Packaging supplier quotation + artwork localisation cost |
| `LOGI_*` | Inbound freight, warehousing, last-mile delivery, return transport | Variable per unit / recurring | `OPEN` | Carrier and 3PL rate cards |
| `DUTY_*` | Import duty, customs handling, any environmental fee, customs classification | Territory-dependent | `OPEN` | Tax adviser opinion + customs classification per SKU |
| `PAY` | Payment processing, hosted checkout, chargeback and dispute fees | Variable per transaction | `OPEN` | Payment-provider fee schedule in writing |
| `WARR_RES_*` | Warranty reserve: expected failure rate × (replacement unit + labour + logistics) | Recurring accrual | `BLOCKED` | Reliability data from pilot installations + written warranty policy (X-02) |
| `RET_ALLOW_*` | Returns allowance: RMA handling, inspection, refurbishment, disposal, restocking | Recurring accrual | `OPEN` | Returns policy draft + measured return rate — no field history exists |
| `SUP_HW_*` | Warranty-period technical support and RMA labour per unit sold | Recurring | `OPEN` | Support model + measured ticket rate |
| `CERT_NRE_*` | CE/EMC/RED/LVD/GPSR/CRA/RoHS/WEEE conformity: test-house, technical file, declarations, translated manuals | One-off NRE per family; **amortised** as `CERT_ALLOC_*` over planned volume | `BLOCKED` | Accredited test-house quotation per SKU and directive + conformity route (H-05, H-06, H-13) |
| `EOL_ALLOC_*` | Obsolescence, lifecycle spares, firmware maintenance across the support window | Recurring / NRE amortisation | `OPEN` | Manufacturer lifecycle statements + engineering maintenance estimate (H-07) |
| `M_INSTALLER` | Installer margin: the price of stock, installation interface, first-line support, local warranty handling and lead generation | Channel margin | `BLOCKED` | Written installer terms (X-05, X-06) |
| `M_DISTRIBUTOR` | Distributor margin: stock, logistics, trade credit, warranty logistics, resale | Channel margin | `BLOCKED` | Written distributor terms (X-05, X-06) |
| `M_PARTNER` | Partner/referral margin for introducing an organisation or vessel (FLEET, referral-led routes) | Channel margin | `BLOCKED` | Written partner terms (X-05, X-06) |

### 4.4 Services cost parameters (all `OPEN` or `BLOCKED`)

| Symbol | Cost input | Unit | Status | Evidence that closes it |
| --- | --- | --- | --- | --- |
| `H_ONB` | Onboarding hours: organisation verification, vessel inventory, roles, configuration, invitations, report setup, acceptance | hours / organisation | `OPEN` | Measured onboarding hours across at least three real organisations (X-05, X-06) |
| `R_ONB` | Loaded hourly rate for onboarding delivery | EUR / hour | `BLOCKED` | Employment or supplier rate card; no rate exists |
| `H_SURVEY` | Compatibility survey hours: vessel, steering type, helm, cabling route, power, network | hours / vessel | `BLOCKED` | Measured survey hours on representative vessels (X-05, X-06) |
| `R_SURVEY` | Surveyor loaded hourly rate | EUR / hour | `BLOCKED` | Installer day-rate and service-call rate card (X-06) |
| `H_INST` | Installation hours: mounting, cable/harness routing, power/protection wiring, network connection, function test | hours / installation | `BLOCKED` | Measured installation hours across representative vessels (X-05, X-06) |
| `R_INST` | Installer loaded hourly rate | EUR / hour | `BLOCKED` | Written rate card (X-06) |
| `H_CONF` | Configuration hours: device configuration, dashboards, instrument/data-source mapping, entitlement setup | hours / installation | `OPEN` | Measured configuration time on representative vessels |
| `R_TECH` | Technical configuration loaded hourly rate | EUR / hour | `BLOCKED` | Written rate card (X-06) |
| `H_COMM` | Commissioning hours: dockside validation, calibration, configuration, recorded checks | hours / installation | `BLOCKED` | Measured commissioning hours + commissioning record template (H-01, X-05) |
| `R_COMM` | Commissioning loaded hourly rate | EUR / hour | `BLOCKED` | Written rate card (X-06) |
| `H_TRAIN` | Owner/handover training hours | hours / installation | `OPEN` | Measured training time |
| `R_TRAIN` | Training loaded hourly rate | EUR / hour | `BLOCKED` | Written rate card |
| `H_TRIAL` | Sea-trial vessel time and engineering supervision (PILOT and, where applicable, integrated installations) | hours / vessel | `BLOCKED` | Supervised sea-trial programme (H-01) |
| `C_SEATRIAL` | Sea-trial direct cost: vessel time, fuel, crew, supervision, records | EUR / trial | `BLOCKED` | Trial programme quotation and vessel availability |
| `C_TRAVEL` | Travel and subsistence to the vessel | EUR / visit | `OPEN` | Installer rate card and territory |
| `C_MIG` | Data migration cost when scoped: schema mapping, cleaning, validation, testing | EUR / organisation | `OPEN` | Migration tooling + pilot data |
| `C_RECORDS` | Installation and commissioning record production, storage, customer handover pack | EUR / installation | `OPEN` | Document template + process estimate |
| `C_SUP_SVC` | Post-install support load: tickets per unit, escalation, out-of-hours if ever contracted | EUR / unit or subscriber | `OPEN` | Support model + measured ticket rate |
| `C_HOST` | Hosting: application servers, APIs, background jobs, monitoring | EUR / period | `OPEN` | Cloud quotation at named usage assumptions |
| `C_API` | Provider/third-party API costs: weather, charts, AIS feed, geocoding, maps, analytics | EUR / period + per call | `BLOCKED` | Written provider price list / commercial-use agreement (D-04, D-05, D-07, D-10) |
| `C_TELEM_F` | Telemetry ingestion, processing, storage and egress per vessel and per data class (FLEET/WATCH feeds) | EUR / vessel / period | `BLOCKED` | Ingestion design + provider quotation (P-09, H-12) |
| `C_NOTIF` | Notification provider fees per message and per channel (push/SMS/email), with delivery-record capability | EUR / message + period | `BLOCKED` | Written provider price schedule (H-12, P-06) |
| `C_SEC` | Security operations: vulnerability handling, penetration testing, audit, insurance, CRA-related maintenance | EUR / period | `BLOCKED` | Security programme + quotations (H-13, X-07) |
| `C_DATA_LIC` | Licensed data entitlements: charts (official ENC), weather/tide/current data, AIS-derived data | EUR / period / region | `BLOCKED` | Signed licence or written provider quotation (D-01, D-02, D-03, D-04, D-09) |
| `C_CONN` | Device connectivity and data plan per device per month, with cap | EUR / device / month | `BLOCKED` | Written MVNO/operator terms (H-12) |
| `C_ROAM` | Roaming and coverage package | EUR / device / month | `BLOCKED` | Roaming terms + coverage evidence (H-12) |
| `C_SW_MAINT` | Software maintenance: platform, app, firmware, security updates, entitlement service | EUR / period | `OPEN` | Engineering maintenance estimate approved by finance |
| `C_PROVISION` | Account/device provisioning: identity, ownership, revocation, entitlement binding | EUR / device or / subscriber | `OPEN` | Provisioning design + measured service cost |
| `C_BILLING` | Subscription billing platform: dunning, retries, failed-payment recovery, invoicing, tax handling | EUR / period + per transaction | `OPEN` | Billing-provider schedule in writing |
| `C_MON` | Availability monitoring of providers and of the service; outage handling | EUR / period | `OPEN` | Monitoring design + provider SLA evidence (none granted) |
| `C_STORE_SVC` | Storage and retention: forecast snapshots, telemetry history, logs, backups | EUR / period | `OPEN` | Retention decision + provider quotation |

### 4.5 Rate and scenario parameters

| Symbol | Meaning | Status | Evidence that closes it |
| --- | --- | --- | --- |
| `v` | Consumer **VAT-inclusive** retail: applicable VAT rate per territory and product classification | `OPEN` | Written VAT and cross-border tax advice; the rate is **not** fixed by the programme (X-01/legal identity, tax advice) |
| `v_b2b` | VAT basis applied to a trade price for a VAT-registered buyer; place of supply, intra-EU reverse charge, OSS and territory regimes | `OPEN` | Written tax advice; no treatment is asserted |
| `p_pay` | Payment processing and chargeback rate applied to receipts | `OPEN` | Payment-provider schedule |
| `r_warr` | Warranty reserve rate (or expected failure rate) applied to hardware cost | `BLOCKED` | Pilot reliability data |
| `r_ret` | Returns allowance rate applied to order value | `OPEN` | Measured return rate |
| `m_chan` | Channel margin (installer or distributor) as a rate or amount | `BLOCKED` | Negotiated channel terms |
| `M_CHAN` | Bundle-level channel cost actually applicable to a trade price; equals whichever partner margins (`M_INSTALLER`, `M_DISTRIBUTOR`) are contracted for that route | `BLOCKED` | Negotiated channel terms (X-05, X-06) |
| `C_TARGET` | Target contribution per unit or per term, set by a business pricing decision | `OPEN` | Pricing decision; no target exists |
| `d_imp` | Import duty rate per classification | `OPEN` | Tax/customs advice |
| `d_obs` | Obsolescence and lifecycle allowance | `OPEN` | Manufacturer lifecycle statements |
| `CAC` | Customer acquisition cost per bundle or per subscription | `OPEN` | MC-09/MC-10 acquisition measurement (X-06) |
| `n` | Expected paying renewals per subscriber | `OPEN` | Observed cohort |
| `CHURN` | Churn rate per cohort (subscription lines) | `OPEN` | Observed cohort |
| `v_es_scenario` | **ASSUMPTION only**: an illustrative Spanish VAT rate of 21 % used to demonstrate the shape of a gross-to-net split | `ASSUMPTION` | Never evidence, never the approved treatment, never used to compute a margin or a price in this file (§8.3) |

### 4.6 Prohibited uses of these parameters

- No parameter may be filled with an analyst estimate, a competitor's public price, a search snippet or a
  "reasonable assumption" dressed as a number.
- `v` may not be replaced by `v_es_scenario` in any real calculation; the scenario exists only to show the
  formula's shape.
- A retail hypothesis (`G_*`) may never be substituted for a cost symbol (`BOM_*`, `C_*`), and a cost symbol may
  never be inferred from a retail hypothesis by subtraction.

## 5. Cost frameworks and symbolic contribution formulas

### 5.1 Hardware framework

A hardware line is only complete when **every** category below is costed. The category list is the test applied
to each bundle in §6 — a bundle whose arithmetic omits any of these is not a costed configuration.

| Category | What it includes | Status of the input |
| --- | --- | --- |
| Bill of materials (`BOM_*`) | electronics, modules, panel/touch, sensor elements, modem, enclosure materials | `BLOCKED` |
| Assembly and programming (`ASSY_*`) | SMT/THT, inspection, programming, fixtures | `BLOCKED` |
| Enclosure and tooling (`ENCL_*`, `TOOL_NRE_*`) | housing, seals, bezel, mounting interface, tooling/NRE | `BLOCKED` |
| Power and cabling (`PWR_*`, `CABLE_*`) | power conversion/protection, harness, connectors, interface items | `BLOCKED` |
| Accessories (`ACC_*`) | antenna/splitter, mounts, adapters required for a usable configuration | `OPEN`/`BLOCKED` |
| Manufacturing test (`MTEST_*`) | jig, burn-in, functional test, EMC pre-scan | `BLOCKED` |
| Packaging (`PACK_*`) | box, ESD, inserts, multilingual labels, quick-start, artwork NRE | `OPEN` |
| Logistics (`LOGI_*`) | inbound freight, warehousing, last-mile, returns transport | `OPEN` |
| Import (`DUTY_*`) | duty, customs handling, environmental fees | `OPEN` |
| Payment (`PAY`) | processing, checkout, chargeback, dispute | `OPEN` |
| Warranty reserve (`WARR_RES_*`) | failure rate × replacement + labour + logistics | `BLOCKED` |
| Returns allowance (`RET_ALLOW_*`) | RMA, inspection, refurbishment, disposal | `OPEN` |
| Support (`SUP_HW_*`) | warranty-period technical support and RMA labour | `OPEN` |
| Certification amortisation (`CERT_ALLOC_*`) | test-house, technical file, declarations, translated manuals, per-family NRE spread over planned volume | `BLOCKED` |
| Installer/distributor margin (`M_INSTALLER`, `M_DISTRIBUTOR`) | the price of real partner services | `BLOCKED` |
| Obsolescence (`EOL_ALLOC_*`) | lifecycle spares and firmware maintenance | `OPEN` |

**Manufacturing-test and certification note.** `CERT_ALLOC_*` is an amortisation of a one-off NRE, so it depends
on a planned volume that does not exist. Until a volume plan and a test-house quotation exist, the
per-unit certification share is not computable — and any bundle that claims to "include" conformity must state
that the certification NRE is `BLOCKED`.

### 5.2 Services framework

Services are the categories the historical bundle hypotheses omit most often, and the ones a quote-based model
exists to price honestly.

| Service category | Scope | Cost drivers (symbolic) | Status |
| --- | --- | --- | --- |
| Onboarding (FLEET, subscriptions) | organisation verification, vessel inventory, roles, configuration, invitations, report setup, acceptance | `H_ONB × R_ONB` + optional `C_TRAVEL` | `OPEN` |
| Compatibility survey | vessel, steering, helm, cabling route, power, network assessment | `H_SURVEY × R_SURVEY` + `C_TRAVEL` | `BLOCKED` |
| Configuration | device configuration, dashboards, instrument/data source mapping, entitlements | `H_CONF × R_TECH` | `OPEN` |
| Installation | mounting, cable/harness routing, power/protection wiring, network connection, function test | `H_INST × R_INST` + `C_TRAVEL` + hardware accessories | `BLOCKED` |
| Commissioning | dockside validation, calibration, recorded checks, defect correction | `H_COMM × R_COMM` + `C_SEATRIAL` where applicable | `BLOCKED` |
| Training | owner/installer handover, bilingual documentation, on-site or remote | `H_TRAIN × R_TRAIN` + content production | `OPEN` |
| Support | post-install first-line and escalation, ticket handling, RMA | `C_SUP_SVC` per unit/subscriber | `OPEN` |
| Data connectivity | SIM/eSIM, data plan, roaming, coverage validation | `C_CONN`, `C_ROAM` per device per month | `BLOCKED` |
| Hosting | service hosting, APIs, background jobs, monitoring | `C_HOST`, `C_MON` | `OPEN` |
| Provider APIs | weather, charts, AIS feed, notifications, maps | `C_API`, `C_DATA_LIC` | `BLOCKED` |
| Software maintenance | platform/app/firmware maintenance, security updates, entitlement service | `C_SW_MAINT`, `C_PROVISION` | `OPEN` |
| Account/device provisioning | identity, ownership, revocation, entitlement binding, transfer | `C_PROVISION` | `OPEN` |

**Services rule.** Installation and onboarding labour are always quoted as their **own line**, in hours and tasks
or as a fixed installation quotation, and are never folded invisibly into a bundle price. "Installation
included" language is prohibited because no installation price exists. A bundle may present hardware lines and a
quotation line in one commercial document; the quotation line stays itemised.

### 5.3 Subscription framework

| Category | What it is | Cost drivers | Status |
| --- | --- | --- | --- |
| Monthly/annual receipts | the recurring amount actually invoiced per period and per unit | `G_WEATHER_*`, `G_WATCH_CORE_SUB`, `G_FLEET_*`, `G_NAV_*` (annual) | `HYPOTHESIS_UNAPPROVED` |
| VAT basis | whether the recurring line is consumer VAT-inclusive or B2B VAT-excluded | `v` / `v_b2b` | `OPEN` (FLEET frozen as VAT-excluded, D-014) |
| Provider costs | third-party data and API entitlements consumed per subscriber | `C_API`, `C_DATA_LIC` | `BLOCKED` |
| Usage-based costs | per-call, per-message, per-vessel-ingest, per-notification usage | `C_API`, `C_CONN`, `C_NOTIF` | `BLOCKED` |
| Retention/storage | forecast snapshots, telemetry history, logs, backups | `C_STORE_SVC` | `OPEN` |
| Support | subscriber and incident support | `C_SUP_SVC` | `OPEN` |
| Cancellation/refund | refund handling, withdrawal position, data export on cancellation | `PAY` + policy | `OPEN` (consumer-law review) |
| Renewal | renewal reminder, price-change notice, renewal operating cost | `C_SW_MAINT` share + billing | `OPEN` |
| Payment recovery | dunning, retries, grace period, failed-payment handling | `C_BILLING` | `OPEN` |
| Channel commission | partner/integrator share of a recurring entitlement, if any | `m_chan` | `BLOCKED` |

### 5.4 Contribution formulas (symbolic — no value substituted)

```text
B2C consumer retail (VAT-inclusive hypothesis G, applicable rate v OPEN):
  NR            = G / (1 + v)                       net revenue, only valid once v is determined
  VAT_OUT       = G - NR
  C_u           = NR - VC                           contribution per unit sold
  CM            = C_u / NR                           a ratio, never publishable before every input exists

B2B contract (VAT-excluded price T):
  NR_b2b        = T / (1 + v_b2b)                   v_b2b treatment OPEN; reverse charge/OSS undecided
  C_b2b         = NR_b2b - VC - M_DISTRIBUTOR

Hardware contribution:
  VC_HW         = BOM + ASSY + ENCL_ALLOC + PWR + CABLE + ACC + MTEST + PACK + LOGI + DUTY
                  + PAY + WARR_RES + RET_ALLOW + SUP_HW + CERT_ALLOC + EOL_ALLOC
  C_HW          = NR - VC_HW
  F_HW          = TOOL_NRE + CERT_NRE + MTEST_NRE + fixed overhead    (NRE to amortise, all OPEN/BLOCKED)
  BE_HW         = F_HW / C_HW                        break-even units; computable only after every input

Installation and service contribution (quoted, never "included"):
  VC_INST       = H_SURVEY×R_SURVEY + H_INST×R_INST + H_COMM×R_COMM + H_TRAIN×R_TRAIN
                  + C_TRAVEL + C_SEATRIAL + C_RECORDS + accessories consumed by the install
  C_INST        = NR_INST - VC_INST

Recurring subscription contribution:
  NR_SUB_M      = G_SUB_M / (1 + v)                 monthly consumer line
  VC_SUB_M      = C_CONN_SHARE + C_ROAM_SHARE + C_API_SHARE + C_HOST_SHARE + C_STORE_SHARE
                  + C_NOTIF_SHARE + C_SUP_SUB_SHARE + C_BILLING + PAY + C_MON + C_PROVISION
  C_SUB_M       = NR_SUB_M - VC_SUB_M
  LTV           = Σ(k = 1..n) C_SUB_k - CAC          n and CAC OPEN
  PAYBACK       = CAC / C_SUB_M                      only after both inputs exist

Partner / distributor contribution:
  C_PARTNER     = NR_trade - VC_HW - M_DISTRIBUTOR
  D*            = G - T_min, T_min solving (T_min / (1 + v_b2b)) - VC_HW - M_DISTRIBUTOR = C_TARGET
                  (C_TARGET OPEN, so D* is a ceiling to be derived, never a published percentage)

Warranty and returns liability (accrued, not a published rate):
  L_WARR        = r_warr × (BOM + ASSY + LOGI + SUP_HW)             r_warr BLOCKED
  L_RET         = r_ret  × (G + LOGI + refurbishment)               r_ret OPEN
  L_LIAB        = L_WARR + L_RET

Fully loaded customer economics (bundle, one term):
  FLC           = Σ_term NR_lines - Σ_term VC_lines - CAC - M_CHAN - L_LIAB - TAX_NONRECOVERABLE
  FLC is a framework, not a computed figure: all inputs OPEN/BLOCKED.
```

### 5.5 Bundle-level formula and the coverage condition

```text
Reference sum of retail hypotheses (an arithmetic anchor, not a cost):
  S_BUNDLE      = Σ(i in bundle) G_i
                  NB: periods differ (annual vs one-off); the sum is only valid as a same-period comparison
                  if each line is stated with its period. Mixed-period sums are flagged, never presented
                  as a single deliverable price.

Historical headline:
  H_BUNDLE      = the historical hypothesis for that bundle (H_START ...)

Implied difference (EUR, not a discount policy):
  Δ_BUNDLE      = S_BUNDLE - H_BUNDLE
                  Δ > 0  => the historical headline is BELOW the reference sum (a discount would be needed)
                  Δ < 0  => the historical headline is ABOVE the reference sum (a premium, not a discount)

Cost-coverage condition that any future approved bundle must satisfy:
  NR_BUNDLE (H_BUNDLE)  ≥  Σ_term VC_lines  +  M_CHAN  +  L_LIAB  +  C_TARGET
  where NR_BUNDLE is computed per line with its own v_i (goods vs digital service may differ), not with one
  blended rate.

Justified bundle band (symbolic, no value):
  S_BUNDLE - Σ(excluded service and cost categories) - S_SHARED  ≤  P_BUNDLE  ≤  S_BUNDLE + Σ(services_not_in_components)
  S_SHARED = ΔPACK + ΔINSTALL + ΔACQ + ΔSUP + ΔCHAN
             shared-cost savings, each one `OPEN` until measured; a bundle discount is only defensible
             against a measured S_SHARED, never against a competitor price or a marketing target.
```

**Interpretation rule.** `Δ_BUNDLE` is not a discount and not a margin. It is the difference between two sets of
unapproved retail hypotheses plus, for some bundles, an omitted cost list. §6 states for each bundle exactly
which conclusion the arithmetic supports and which it cannot support.

## 6. Six-bundle price-hypothesis challenge

Method applied identically to every bundle:

1. restate the fixed reference configuration and its period structure;
2. compute `S_BUNDLE` using **only** the permitted internal hypotheses of §4.1;
3. state which objects have **no established price** and are therefore excluded;
4. list the missing cost categories that the sum does not contain;
5. state the implied difference `Δ_BUNDLE` and whether any discount is implied;
6. test whether a **legitimate usable configuration** could fit the headline;
7. state sensitivity to cost, hypothesis, VAT, channel and labour movements;
8. state what would invalidate the headline;
9. separate **evidence-supported conclusions** (arithmetic on named hypotheses, and documented status facts) from
   **assumptions**;
10. record the verdict.

### 6.1 MAREA START — `HUB-STANDARD` + `NAV-PRO`, historical EUR 499

**Configuration.** HUB Standard appliance (one-off) plus NAV Pro (one-year renewable entitlement). No
installation, no compatibility survey, no cabling, no onboarding and no subscription for the HUB are included in
the reference configuration.

**Implied component retail sum.**

| Component | Named hypothesis | Amount | Period | Established? |
| --- | --- | ---: | --- | --- |
| `NAV-PRO` | `G_NAV_P` | 149 | year | price hypothesis only; cost `NOT_ESTABLISHED` |
| `HUB-STANDARD` | `G_HUB_S` | 349 | one-off | price hypothesis only; BOM/cost `BLOCKED` |
| **Reference sum** | `S_START = G_NAV_P + G_HUB_S` | **498** | mixed (flagged) | **no — no costed configuration exists** |

`S_START = 149 + 349 = 498`.

**Excluded because no price exists.** None: both components carry permitted hypotheses. But no cost exists for
either: the HUB BOM is `BLOCKED` (H-05, H-07) and the NAV data-licence and hosting costs are `BLOCKED`/`OPEN`
(D-01, D-04).

**Missing cost categories.** HUB: BOM, assembly, enclosure/tooling, power/cabling, manufacturing test,
packaging, logistics, import, payment, warranty reserve, returns, support, certification amortisation,
obsolescence, installer/distributor margin. NAV: chart-data licence, weather/tide licence, hosting, storage,
third-party APIs, support, payment/recurring billing, refunds, acquisition, entitlement administration,
renewal costs. Bundle-level: compatibility survey, configuration, HUB installation, cabling/adapters, onboarding,
first-year support beyond warranty, channel margin if installer-led.

**Implied difference and required discount.**

```text
Δ_START = S_START - H_START = 498 - 499 = -1 EUR
```

The historical headline is **EUR 1 above** the reference sum. No discount is implied; a **premium of EUR 1** is
implied, and that EUR 1 cannot cover any of the missing cost categories. The arithmetic therefore does not
demonstrate a viable bundle price: it demonstrates that the headline is essentially the two hypotheses added
together, with the entire service and cost layer absent.

**Could a legitimate usable configuration fit?** The configuration is legitimate in *commercial* terms (both
objects are defined editions and the combination is within the fixed reference architecture of §3), and a
HUB + NAV package
is the first go-to-market hypothesis in `COMMERCIAL-PORTFOLIO.md`. It is **not** usable as a priced offer today:
no included SKU is `OPERATIONS_READY`, the HUB has no BOM, NAV has no chart entitlement, and the EUR 1 residual
cannot be shown to cover installation, payment, warranty, returns, support or channel margin. Whether the
headline *could* be delivered after costing is **not established in either direction** — it is `OPEN`.

**Sensitivity.**

| Movement | Symbolic effect on the coverage of `H_BUNDLE` | Evidence that would settle it |
| --- | --- | --- |
| HUB BOM/assembly/enclosure/test/pack/logistics rise | coverage falls by the increase in `VC_HW` | supplier RFQ (H-05, H-07) |
| Certification or tooling NRE exceeds the planned volume | per-unit `CERT_ALLOC`/`ENCL_ALLOC` rises, coverage falls | test-house quotation + volume plan |
| Warranty or return rate is higher than planned | coverage falls by `ΔL_LIAB` | pilot reliability and returns data |
| VAT rate or classification differs between goods and digital service | net revenue per line changes; a single blended `v` is invalid; coverage moves by `Σ G_i × Δ(1/(1+v_i))` | written tax advice |
| Installer-led route with margin `m_chan` | coverage falls by `m_chan` applied to the trade price | negotiated channel terms |
| A component hypothesis is revised **upward** | the reference sum rises by `ΔG`, so `Δ_START` becomes more negative; **cost does not change** — a hypothesis revision is not a cost movement | pricing decision, not a supplier fact |
| NAV renewal term shorter/longer than one year | the period comparison breaks; a first-year and a renewal price are different objects | term decision |

**What would invalidate the headline.** A real costed worksheet whose fully loaded variable cost plus channel
margin plus target contribution exceeds the net revenue implied by EUR 499; a supplier quote that makes the HUB
cost alone approach the net revenue; measured installation/configuration hours that must be absorbed into the
headline; or a tax determination that changes the goods/digital-service split. Any of these would require the
headline to be **revised**, and a revision is a business approval decision — not something this document may take.

**Evidence-supported vs assumption.** *Supported by arithmetic on named hypotheses:* `S_START = 498` and
`Δ_START = -1 EUR`; the claim that no discount is implied. *Supported by documented status facts:* no BOM, no
supplier quotation, no channel agreement, no VAT rate. *Assumption/`OPEN`:* that the two objects form a
deliverable first year at all; that EUR 1 of headroom is meaningful; any statement about margin.

**Verdict — MAREA START.**

| Field | Value |
| --- | --- |
| Historical hypothesis | EUR 499 |
| Price status | `HYPOTHESIS_UNAPPROVED` |
| Configuration cost established? | **NO** — retail hypotheses only; HUB BOM and NAV data costs `BLOCKED` |
| Fixed price permissible? | **NO** — no costed configuration, no approved price, no operations readiness |
| Recommended commercial model | **Uninstalled first-year product-only reference** (HUB + NAV lines) with a **withheld price**; installation, survey and configuration quoted separately; quote/configuration request until a costed worksheet and a pricing decision exist |
| Recorded classification | `CONFIGURATION_COST_NOT_ESTABLISHED` |

### 6.2 MAREA CRUISE — `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7`, historical EUR 1,399

**Configuration.** NAV Essential (one year) + HUB Standard + AIS Receiver + DISPLAY 7 (one-off hardware). The
fixed configuration excludes `AIS-CONNECTED` (conditional, not selected) and `DISPLAY-LARGE-CONDITIONAL`
(`NOT_ESTABLISHED`, ineligible, and it may never be presented as included hardware).

**Implied component retail sum.**

| Component | Named hypothesis | Amount | Period | Established? |
| --- | --- | ---: | --- | --- |
| `NAV-ESSENTIAL` | `G_NAV_E` | 99 | year | hypothesis only; cost `NOT_ESTABLISHED` |
| `HUB-STANDARD` | `G_HUB_S` | 349 | one-off | hypothesis only; BOM `BLOCKED` |
| `AIS-RECEIVER` | `G_AIS_R` | 249 | one-off | hypothesis only; BOM/conformity `BLOCKED` |
| `DISPLAY-7` | `G_DISPLAY_7_FROM` | 699 | one-off | starting hypothesis only; `SIZE_NOT_FROZEN`, BOM `BLOCKED` |
| **Reference sum** | `S_CRUISE = G_NAV_E + G_HUB_S + G_AIS_R + G_DISPLAY_7_FROM` | **1,396** | mixed (flagged) | **no — no costed configuration exists** |

`S_CRUISE = 99 + 349 + 249 + 699 = 1,396`. Required variant for comparison: with `NAV-PRO` instead of
`NAV-ESSENTIAL`, the same four objects sum to `149 + 349 + 249 + 699 = 1,446`.

**Excluded because no price exists.** `AIS-CONNECTED` (EUR 399 hypothesis, `CONDITIONAL`) is **not** in the fixed
configuration; `DISPLAY-LARGE-CONDITIONAL` has no price and is ineligible. CRUISE therefore contains no
`NOT_ESTABLISHED` component, but it contains two objects whose *cost* is entirely `BLOCKED` and one whose *size*
is not frozen.

**Missing cost categories.** All four hardware/software cost frameworks of §5.1 and §5.2, plus the
CRUISE-specific ones: AIS antenna or splitter decision (still `OPEN` — the AIS hypothesis does not state whether
a dedicated VHF/AIS antenna is included); DISPLAY mount, mounting hardware and installation; helm assessment;
cabling/extenders between HUB, AIS and DISPLAY; power work; multi-device configuration; commissioning; owner
training; DISPLAY environmental/conformity NRE and AIS RF conformity; multi-device support; and the fact that
`DISPLAY-7` is a **starting** hypothesis whose size class is not frozen.

**Implied difference and required discount.**

```text
Δ_CRUISE = S_CRUISE - H_CRUISE = 1,396 - 1,399 = -3 EUR
NAV-PRO variant: S_CRUISE(PRO) - H_CRUISE = 1,446 - 1,399 = +47 EUR
```

For the fixed configuration the historical headline is **EUR 3 above** the reference sum: no discount is
implied, a premium of EUR 3 is. If the historical EUR 1,399 was intended as a NAV Pro configuration, the
headline sits **EUR 47 below** that variant's reference sum — which would still be a purely arithmetic gap, not
a justified discount, and would leave every cost category of §6.2 unfunded. The document does not resolve which
reading was intended; it states both, and states that neither supports a fixed price.

**Could a legitimate usable configuration fit?** The configuration is architecturally coherent (NAV + HUB + AIS
receiver + display is the intended ecosystem combination), and it is the multi-device bundle most likely to need
professional installation. It cannot fit a *fixed price* today: `DISPLAY-7` has no frozen size or BOM,
`AIS-RECEIVER` has no RF conformity, the four-device installation has never been measured, and no channel terms
exist. Usability is also conditional on integration evidence that does not exist (NMEA 2000 not implemented,
H-04; AIS receive-only and not collision avoidance).

**Sensitivity.**

| Movement | Symbolic effect | Evidence that would settle it |
| --- | --- | --- |
| DISPLAY panel/compute/enclosure cost differs from the EUR 699 anchor | coverage falls by `ΔVC_DISP` | H-11 BOM + panel RFQ |
| Display size class is frozen larger than the assumption | BOM and enclosure tooling rise; the "from EUR 699" anchor becomes inapplicable | design freeze + tooling quote |
| AIS antenna/splitter turns out to be mandatory in the SKU | a mandatory accessory is missing from the catalogue price and must be added or quoted | inclusion decision + supplier quotation |
| AIS RF/EMC conformity cost is high per family | `CERT_ALLOC` rises; low volume makes amortisation worse | test-house quotation (H-06, H-08) |
| Installation hours exceed plan (multi-device wiring) | coverage falls by `Δ(H_INST × R_INST)` | measured installation records |
| NAV Pro variant is chosen | the reference sum rises to 1,446 and the headline moves to EUR 47 below it (a EUR 50 shift from the fixed configuration) | configuration decision, not a cost fact |
| VAT/classification mix (hardware vs digital) | per-line net revenue changes; one blended rate is invalid | tax advice (D-01 context, X-02) |

**What would invalidate the headline.** A costed configuration whose variable costs and channel margin exceed
the net revenue implied by EUR 1,399; a mandatory accessory (antenna/splitter, mount) that must be added to make
the configuration usable; a measured installation brief that cannot be recovered from the headline; a frozen
display size whose BOM contradicts the "from EUR 699" anchor; or a determination that the four objects cannot be
installed together without additional adapters. Any single one of these makes EUR 1,399 unusable as a bundle
price.

**Evidence-supported vs assumption.** *Supported by arithmetic on named hypotheses:* `S_CRUISE = 1,396`,
`Δ_CRUISE = -3 EUR`, NAV-Pro variant `1,446` and its `+47` gap. *Supported by documented facts:*
`DISPLAY-7` `SIZE_NOT_FROZEN`, `AIS-CONNECTED` conditional and not selected, antenna inclusion `OPEN`. *Assumed:*
that a four-object installed configuration is deliverable at all; that the EUR 3/47 differences mean anything
commercially.

**Verdict — MAREA CRUISE.**

| Field | Value |
| --- | --- |
| Historical hypothesis | EUR 1,399 |
| Price status | `HYPOTHESIS_UNAPPROVED` |
| Configuration cost established? | **NO** — three hardware costs `BLOCKED`, display size not frozen, installation unmeasured |
| Fixed price permissible? | **NO** |
| Recommended commercial model | **Uninstalled first-year product-only reference** (NAV one year + three hardware items) with installation, materials and commissioning quoted separately; a fixed bundle price only after BOM, conformity and measured installation |
| Recorded classification | `CONFIGURATION_COST_NOT_ESTABLISHED` |

### 6.3 MAREA SAIL — `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (quotation required) + `SENSE-WIND`, historical EUR 1,990

**Configuration.** NAV Pro (one year) + HUB Standard + `PILOT-COASTAL` (a vessel-specific quotation, **not** an
inclusive price, D-009) + `SENSE-WIND` (conditional steering input; its price is `NOT_ESTABLISHED`). `PILOT-SAIL`
is `NOT_ESTABLISHED` and `PILOT-PRO` is an installation package; neither is a priced item and neither may appear
as a bundle line.

**Implied component retail sum.**

| Component | Named hypothesis | Amount | Period | Established? |
| --- | --- | ---: | --- | --- |
| `NAV-PRO` | `G_NAV_P` | 149 | year | hypothesis only |
| `HUB-STANDARD` | `G_HUB_S` | 349 | one-off | hypothesis only; BOM `BLOCKED` |
| `PILOT-COASTAL` | `G_PILOT_COASTAL_FROM` | 1,290 | vessel-specific installed scope **starting reference only** | **not an inclusive quotation**; drive, labour and commissioning excluded (D-009) |
| `SENSE-WIND` | no attributable price — `G_SENSE_ENTRY_FROM` used **only as a placeholder** for the required arithmetic | 99 | one-off | **`NOT_ESTABLISHED`**: the from-EUR-99 entry hypothesis is not attributable to a named module |
| **Indicative floor** | `S_SAIL_INDICATIVE` | **1,887** | mixed (flagged) | **no — a floor of hypotheses, not a cost and not a price** |

`S_SAIL_INDICATIVE = 149 + 349 + 1,290 + 99 = 1,887`. The 99 is the **non-attributable** entry hypothesis, used
because the required challenge arithmetic includes it; it must never be read as the price of `SENSE-WIND`.

**Excluded because no price exists.** `SENSE-WIND` has no price (the 99 is a placeholder), `PILOT-SAIL` has no
price, `PILOT-PRO` has no price. More importantly, the EUR 1,290 PILOT reference **excludes**, by D-009 and by
the PILOT cost framework: the drive/actuator selected per vessel, rudder/steering feedback components, cabling,
power protection, installation labour, commissioning including dockside validation and calibration, supervised
sea trial, owner training, conformity, warranty reserve and installer margin. Those are not optional extras; they
are part of a usable PILOT installation, and the EU 1,290 figure is explicitly not an all-inclusive quotation.

**Missing cost categories.** All of §5.1/§5.2 for NAV, HUB and SENSE-WIND, **plus** the PILOT quotation scope
(drive, feedback, cabling, power protection, E-stop isolation, labour, commissioning, sea trial, conformity,
warranty, installer margin) and the **safety evidence** required before any PILOT sale (H-01,
`PILOT_SAFETY_GATE = BLOCKED`). A SAIL bundle is therefore missing an entire installed-system cost layer, not a
line item.

**Implied difference and required discount.**

```text
Δ_SAIL = S_SAIL_INDICATIVE - H_SAIL = 1,887 - 1,990 = -103 EUR
```

The historical headline is **EUR 103 above** the indicative floor. Because the floor is already an assembly of
unapproved retail hypotheses that *excludes* the drive, feedback, cabling, labour, commissioning, sea trial,
conformity and warranty, this is not a viable margin: the omitted scope alone is unbounded and unmeasured, and
the required arithmetic **does not establish** that EUR 103 can fund it. The honest conclusion is not "the price
is below cost" (that would itself be an unsupported claim) but: **the headline cannot be validated because the
configuration cost does not exist, and D-009 forbids presenting the PILOT component as a fixed price at all.**

**Could a legitimate usable configuration fit?** No fixed-price configuration can be stated. A usable SAIL
installation requires: a vessel and steering survey; a compatible drive/actuator selection; verified wind-angle
steering for any sail mode (H-01) plus the `SENSE-WIND` measurement being a **conditional** steering input, not
an approved one; a completed safety gate; and a quotation whose inclusions and exclusions are enumerated. The
EUR 1,990 headline is therefore **not a turnkey price, not a bundle price and not a quotation**; the correct
commercial object is a vessel-specific quotation.

**Sensitivity.**

| Movement | Symbolic effect | Evidence that would settle it |
| --- | --- | --- |
| Drive/actuator class differs by vessel | the largest single PILOT cost moves; a single headline cannot span vessel classes | survey + drive-family quotes (H-01, H-03) |
| Rudder/steering feedback is required and absent | adds a cost component not in the floor | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND` must be resolved |
| Installation/commissioning/sea-trial hours | coverage falls by `Δ(H_INST×R_INST + H_COMM×R_COMM + C_SEATRIAL)` | measured hours on representative vessels |
| Physical E-stop and motor isolation are mandatory design boundaries | adds hardware + conformity scope | `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND` |
| `SENSE-WIND` price is established above the entry placeholder | the floor rises by the difference | module BOM/RFQ (P-05) |
| Safety gate remains `BLOCKED` | no sale, quotation or price is permissible at all | H-01 evidence programme |
| VAT/classification of an installed hardware system | net revenue changes; installation labour classification may differ | tax advice |

**What would invalidate the headline.** Any of the following: a survey-driven drive/actuator selection that
moves the installed scope outside the EUR 1,290 reference; measured labour and commissioning that cannot be
recovered; a required rudder feedback or E-stop item that is not in the scope; the `PILOT_SAFETY_GATE` remaining
`BLOCKED` (which alone forbids any price); or the `SENSE-WIND` measurement failing to qualify as a steering
input. In practice the first three are expected to occur on a large share of vessels, which is why D-009 mandates
the quotation model rather than a list price.

**Evidence-supported vs assumption.** *Supported by arithmetic on named hypotheses:* the 1,887 indicative floor
and the `-103 EUR` difference. *Supported by decisions and documented facts:* D-009 (PILOT is quoted, never a
turnkey price), D-008 (`PILOT-PRO` is an installation package), `SENSE-WIND` price not established, safety gate
`BLOCKED`. *Unsupported and not claimed:* that EUR 1,990 covers any specific installation; any cost of drive,
labour or conformity; any margin.

**Verdict — MAREA SAIL.**

| Field | Value |
| --- | --- |
| Historical hypothesis | EUR 1,990 |
| Price status | `HYPOTHESIS_UNAPPROVED`; recorded as `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` |
| Configuration cost established? | **NO** — PILOT is a quotation, `SENSE-WIND` price does not exist, no installed scope is costed |
| Fixed price permissible? | **NO** — prohibited by D-009 and `PILOT_SAFETY_GATE = BLOCKED` |
| Recommended commercial model | **vessel-specific quotation**: itemised scope (NAV + HUB lines priced as components only when approved; PILOT and installation quoted after survey), with every inclusion and exclusion enumerated |
| Recorded classification | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` |

### 6.4 MAREA PROTECT — `WATCH-CORE` + `SENSE-ESSENTIALS` kit (`SENSE-POWER` + `SENSE-BILGE`), historical EUR 399 plus subscription

**Configuration.** WATCH Core hardware + monitoring subscription (monthly, connectivity excluded) + the
`SENSE-ESSENTIALS` kit, which expands to `SENSE-POWER` + `SENSE-BILGE` (two modules). The kit price is
`NOT_ESTABLISHED`; each module price is `NOT_ESTABLISHED`; the "from EUR 99" entry hypothesis is **not
attributable** to a named module.

**Implied component retail sum.**

| Component | Named hypothesis | Amount | Period | Established? |
| --- | --- | ---: | --- | --- |
| `WATCH-CORE` hardware | `G_WATCH_CORE_HW` | 299 | one-off | hypothesis only; BOM/modem/certification `BLOCKED` |
| `SENSE-POWER` | `NOT_ESTABLISHED`; placeholder = entry hypothesis | 99 | one-off | **no price exists**; placeholder only |
| `SENSE-BILGE` | `NOT_ESTABLISHED`; placeholder = entry hypothesis | 99 | one-off | **no price exists**; placeholder only |
| `SENSE-ESSENTIALS` kit | `NOT_ESTABLISHED` (its own price/cost sheet is required; a kit is never the sum of modules) | excluded | one-off | **no price exists** |
| `WATCH-CORE` subscription | `G_WATCH_CORE_SUB` from 9.90 | excluded from the hardware comparison | month | hypothesis only; contents `OPEN`; connectivity excluded |

Required arithmetic: WATCH hardware 299 + two-module floor (99 + 99 = 198) = **497**. Historical hardware
hypothesis: **399**. `497 > 399`.

Two-module floor: `S_PROTECT_2MOD = G_WATCH_CORE_HW + 2 × G_SENSE_ENTRY_FROM = 299 + 198 = 497`.
One-module arithmetic: `299 + 99 = 398`, which would leave EUR 1 of headroom against 399 — but a one-module
configuration **contradicts the fixed PROTECT composition** (POWER + BILGE, i.e. two modules).

**Excluded because no price exists.** The `SENSE-ESSENTIALS` kit price and each module price are
`NOT_ESTABLISHED`; `WATCH-PLUS` is `NOT_ESTABLISHED`; the subscription's included contents (connectivity cap,
device count, user count, retention) are `OPEN`, and SIM/data cost is explicitly excluded from the WATCH
hypothesis.

**Missing cost categories.** WATCH: device BOM, modem/cellular module, antennas, enclosure, certification (RED,
EMC, LVD, GPSR, CRA, WEEE), packaging, logistics, payment, replacement/RMA, channel margin; plus connectivity
(`C_CONN`, `C_ROAM`), cloud ingestion, storage/retention, notification provider, support, billing, and the
subscription service itself (`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`). SENSE: module BOM, housing/seals,
calibration and test, packaging, installation labour for two modules, warranty, support, kit kitting cost.
Bundle-level: installation labour, account/device provisioning, first-line support, and the consumer-law
framework for a hardware + subscription sale.

**Implied difference and required discount.**

```text
Δ_PROTECT = S_PROTECT_2MOD - H_PROTECT_HW = 497 - 399 = +98 EUR
```

To fit the fixed two-module composition at the historical EUR 399, **EUR 98 of component-hypothesis value would
have to be given away**, before a single real cost is considered. No shared packaging, shared installation,
reduced acquisition, reduced support duplication or channel efficiency has been evidenced to justify that. The
only arithmetic that fits EUR 399 is `299 + 99 = 398`, i.e. a **one-module** configuration, which contradicts the
fixed composition (POWER + BILGE) and the product's purpose (battery **and** bilge monitoring). The historical
headline is therefore classified, as required, **`HISTORIC_PRICE_NOT_COST_JUSTIFIED`**: it cannot even cover the
included configuration at the programme's own permitted hypotheses, let alone a real cost base.

**Could a legitimate usable configuration fit?** Not the fixed two-module PROTECT configuration, at EUR 399, on
the permitted hypotheses. A usable PROTECT configuration is otherwise coherent (WATCH Core is a defined edition,
`SENSE-ESSENTIALS` is a `DEFINED` kit of two declared modules, and the combination is the intended unattended-
monitoring package), and an active subscription is **required** for remote monitoring — but the subscription is a
separate recurring line whose contents and connectivity costs are `OPEN`. A legitimate *usable* configuration can
only exist as a **quotation-valued** package: WATCH hardware + subscription + kit + installation, each line
priced independently once priced/costed.

**Sensitivity.**

| Movement | Symbolic effect | Evidence that would settle it |
| --- | --- | --- |
| Any SENSE module price established above the 99 placeholder | the two-module floor rises by `2 × ΔG_module`; the EUR 98 shortfall widens | module BOM/RFQ (P-05, H-05) |
| Kit price established with kitting, box, extra documentation and kit-level test | adds `K_KIT`, further widening the shortfall | frozen kit definition + measured kitting |
| WATCH hardware hypothesis revised | the floor moves with `ΔG_WATCH`; cost unchanged | pricing decision, not a supplier fact |
| Connectivity/data cost turns out non-trivial | recurring contribution `C_SUB_M` falls; the subscription hypothesis becomes unusable, and connectivity may need its own line | MVNO terms (H-12) |
| Notification-provider cost per message | recurring contribution falls by usage | provider schedule |
| Subscription duration and included contents change | the meaning of "plus subscription" changes; the bundle term must be restated | product decision + billing design |
| Installation labour for two modules (one visit?) | if the single-visit assumption fails, `H_INST × R_INST` doubles | measured installation |
| VAT on a hardware + digital subscription mix | per-line net revenue differs; a single blended rate is invalid | tax advice |

**What would invalidate the headline.** The fixed two-module composition at EUR 399 is already invalidated by
the programme's own arithmetic (497 > 399). Any real cost quotation for WATCH (BOM + modem + certification +
packaging + logistics) or for the two SENSE modules would only widen the gap; a connectivity cost that must be
included in the subscription would make the recurring line uneconomic; and a kit price that includes kitting and
test would remove the last EUR 1 of apparent headroom. The headline does not survive any of these.

**Evidence-supported vs assumption.** *Supported by arithmetic on named hypotheses:* `497 > 399`, the EUR 98
shortfall, and that only `299 + 99 = 398` fits (a one-module configuration). *Supported by documented facts:*
`SENSE-ESSENTIALS = POWER + BILGE` (two modules), kit and module prices `NOT_ESTABLISHED`, WATCH subscription
contents `OPEN`, connectivity excluded. *Not claimed:* the real cost of either product; any margin statement.

**Verdict — MAREA PROTECT.**

| Field | Value |
| --- | --- |
| Historical hypothesis | EUR 399 plus subscription |
| Price status | `HYPOTHESIS_UNAPPROVED`; recorded as **`HISTORIC_PRICE_NOT_COST_JUSTIFIED`**; established/final price `OPEN` |
| Configuration cost established? | **NO** — no WATCH BOM, no SENSE module or kit price, no connectivity cost, no installation measurement |
| Fixed price permissible? | **NO** — and the historical amount does not even cover the fixed composition at the permitted hypotheses |
| Recommended commercial model | quotation-valued package: WATCH hardware and its subscription as separate lines, SENSE-ESSENTIALS kit quoted on its own price/cost sheet, installation separate; hardware and subscription never merged into one recurrence |
| Recorded classification | `HISTORIC_PRICE_NOT_COST_JUSTIFIED` |

### 6.5 MAREA COMPLETE — `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + `SENSE-POWER` + `SENSE-BILGE` + `SENSE-TANKS` + `SENSE-ENV` + `PILOT-COASTAL`, historical EUR 3,490

**Configuration.** NAV Pro (one year) + HUB Pro + DISPLAY 7 + WATCH Core hardware + four SENSE modules
(POWER, BILGE, TANKS, ENV) + `PILOT-COASTAL` (vessel-specific quotation). The WATCH subscription is **not** in the
historical amount, AIS and WEATHER are not included, and installation/commissioning are not included.

**Implied component retail sum.**

| Component | Named hypothesis | Amount | Period | Established? |
| --- | --- | ---: | --- | --- |
| `NAV-PRO` | `G_NAV_P` | 149 | year | hypothesis only |
| `HUB-PRO` | `G_HUB_P` | 499 | one-off | hypothesis only; BOM `BLOCKED` |
| `DISPLAY-7` | `G_DISPLAY_7_FROM` | 699 | one-off | starting hypothesis; `SIZE_NOT_FROZEN` |
| `WATCH-CORE` hardware | `G_WATCH_CORE_HW` | 299 | one-off | hypothesis only |
| `SENSE-POWER` | `NOT_ESTABLISHED`; placeholder | 99 | one-off | **no price exists** |
| `SENSE-BILGE` | `NOT_ESTABLISHED`; placeholder | 99 | one-off | **no price exists** |
| `SENSE-TANKS` | `NOT_ESTABLISHED`; placeholder | 99 | one-off | **no price exists** |
| `SENSE-ENV` | `NOT_ESTABLISHED`; placeholder | 99 | one-off | **no price exists** |
| `PILOT-COASTAL` | `G_PILOT_COASTAL_FROM` | 1,290 | vessel-specific installed scope, **starting reference only** | **not an inclusive quotation** |
| WATCH subscription | from 9.90 / month | excluded | month | contents `OPEN`; connectivity excluded |
| **Indicative floor** | `S_COMPLETE_INDICATIVE` | **3,332** | mixed (flagged) | **no — a floor of hypotheses, not a cost and not a price** |

`S_COMPLETE_INDICATIVE = 149 + 499 + 699 + 299 + (4 × 99 = 396) + 1,290 = 3,332`. The four 99s are the
non-attributable entry hypothesis used only because the required arithmetic includes four modules; no named
SENSE module has a price.

**Excluded because no price exists.** All four SENSE module prices and therefore any SENSE total; the WATCH
subscription (monthly, contents `OPEN`); AIS (not in the configuration); WEATHER (not in the configuration);
`PILOT-PRO` and `PILOT-SAIL`; extended warranty; any installation or commissioning labour.

**Missing cost categories.** The full hardware framework of §5.1 for HUB Pro, DISPLAY 7, WATCH Core and four
SENSE modules; the full service framework of §5.2 (survey, installation, commissioning, training, support,
provisioning); the PILOT quotation scope (drive/actuator, feedback, cabling, power protection, E-stop isolation,
labour, commissioning, sea trial, conformity, warranty, installer margin); the WATCH recurring service
(connectivity, ingestion, storage, notifications, billing, support); certification amortisation across six
hardware/device families; and, because the headline has no stated term, **multi-year subscription years** for
NAV and WATCH. This is the largest omitted cost list of the six bundles.

**Implied difference and required discount.**

```text
Δ_COMPLETE = S_COMPLETE_INDICATIVE - H_COMPLETE = 3,332 - 3,490 = -158 EUR
```

The historical headline is **EUR 158 above** the indicative floor. That absolute gap is tiny relative to the
number of omitted categories (a PILOT drive/actuator, all labour, all commissioning, all conformity, all
subscription years beyond one), each unbounded and unmeasured. The required arithmetic therefore supports neither
"the price is adequate" nor "the price is below cost"; it supports the narrower and decisive fact that **the
configuration cost does not exist for the majority of the included scope**, and D-009 forbids treating the PILOT
component as a fixed price. A COMPLETE bundle cannot be a fixed-price object.

**Could a legitimate usable configuration fit?** Not as a fixed price. A legitimate COMPLETE installation would
require a vessel survey; drive/actuator selection; verified compatibility across HUB Pro, DISPLAY, AIS-optional
and SENSE modules; measured multi-device installation and commissioning; a completed PILOT safety gate; and an
itemised quotation that states every exclusion (AIS, WEATHER, subscription years, extended warranty, structural
work). The fixed reference configuration is also internally conditional: it contains five objects whose cost is
`BLOCKED` and four whose price is `NOT_ESTABLISHED`.

**Sensitivity.**

| Movement | Symbolic effect | Evidence that would settle it |
| --- | --- | --- |
| PILOT drive/actuator by vessel | largest single omitted cost; a single headline cannot span vessel classes | survey + drive-family quotes |
| Installation/commissioning hours across 6–8 devices | coverage falls by `Σ(H×R)` for survey, install, commissioning, training | measured installation programme |
| Any SENSE module price above the 99 placeholder | floor rises by `4 × ΔG_module` | module RFQ (P-05) |
| HUB Pro, DISPLAY or WATCH BOM | coverage falls by the corresponding `ΔVC` | H-05/H-07/H-11 BOMs |
| NAV and WATCH subscription years beyond year one | the headline has no term; each additional year adds a receipt and a cost that the hypothesis does not define | term decision |
| Certification NRE across families | per-unit `CERT_ALLOC` rises, worse at low volume | test-house quotations |
| VAT/classification mix | per-line net revenue differs; a blended rate is invalid | tax advice |
| Channel margin on an installer-led integrated job | coverage falls by `m_chan` on the trade price | channel terms |

**What would invalidate the headline.** Any of: the vessel survey selecting a drive/actuator outside the
assumed PILOT scope; measured installation and commissioning not recoverable from the residual; a required
rudder feedback or E-stop scope not included; a frozen DISPLAY size whose BOM contradicts the 699 anchor; the
safety gate remaining `BLOCKED` (which alone forbids a price); or any additional subscription year. As with
SAIL, the correct object is a quotation.

**Evidence-supported vs assumption.** *Supported by arithmetic on named hypotheses:* the 3,332 indicative floor
and the `-158 EUR` difference. *Supported by documented facts:* SENSE module prices `NOT_ESTABLISHED`, PILOT
quotation-only under D-009, DISPLAY size not frozen, subscriptions excluded. *Not claimed:* the real cost of any
included object; that EUR 158 covers or does not cover anything in particular.

**Verdict — MAREA COMPLETE.**

| Field | Value |
| --- | --- |
| Historical hypothesis | EUR 3,490 |
| Price status | `HYPOTHESIS_UNAPPROVED`; recorded as `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` (D-023: `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`) |
| Configuration cost established? | **NO** — six hardware/device cost families `BLOCKED`, four SENSE prices absent, PILOT quoted, subscriptions undefined |
| Fixed price permissible? | **NO** — D-009, `PILOT_SAFETY_GATE = BLOCKED`, and the absence of most of the cost base |
| Recommended commercial model | **vessel-specific multi-line quotation**: priced component lines only where an approved component price exists; everything else itemised and quoted; never a turnkey sum |
| Recorded classification | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` |

### 6.6 MAREA FLEET package — bespoke, no amount

**Configuration.** `FLEET-START` (from 49 EUR per vessel per month, VAT excluded) or `FLEET-BUSINESS` (79 EUR per
vessel per month, VAT excluded), plus onboarding, registration/migration, training and support; hardware,
connectivity and installation are optional and quoted. `FLEET-ENTERPRISE` is contracted and `NOT_ESTABLISHED`.

**Implied component retail sum.** **None is computed, and none may be computed.** The package is not a sum of
per-vessel subscriptions: it adds one-off services per organisation whose price does not exist, and optional
hardware/connectivity/installation whose cost does not exist. Any sum would have to invent an onboarding price,
a migration price, a training price, a support price, a hardware price and a connectivity price — all
`NOT_ESTABLISHED`.

| Package line | Permitted hypothesis / status | Can it enter a sum? |
| --- | --- | --- |
| `FLEET-START` per-vessel subscription | `G_FLEET_START` from 49 EUR / vessel / month, VAT excluded | a *rate* exists, but a package total requires a vessel count, a term and a service scope that are `OPEN` |
| `FLEET-BUSINESS` per-vessel subscription | `G_FLEET_BUSINESS` 79 EUR / vessel / month, VAT excluded | as above |
| `FLEET-ENTERPRISE` | `NOT_ESTABLISHED`, contracted | **no** |
| Onboarding / registration / migration | `NOT_ESTABLISHED` (`H_ONB`, `C_MIG` `OPEN`) | **no** |
| Training | `NOT_ESTABLISHED` (`H_TRAIN`, `R_TRAIN` `OPEN`) | **no** |
| Support beyond the subscription entitlement | `NOT_ESTABLISHED` (`C_SUP_SVC` `OPEN`) | **no** |
| Hardware (optional) | `NOT_ESTABLISHED` for the package; component hypotheses exist but are not package lines | **no** — quoting hardware inside a per-vessel fee is prohibited (D-014) |
| Connectivity, installation (optional) | `NOT_ESTABLISHED` (`C_CONN`, `H_INST` `BLOCKED`) | **no** — quoted separately |

The only defensible statement is therefore: the package has **no reference sum**, no historical amount and no
justified price. The subscription rate is a valid input to a future quotation once volumes, term and service scope
are fixed in a contract.

**Excluded because no price exists.** `FLEET-ENTERPRISE` (contracted, no amount), onboarding, migration,
training, support beyond the subscription entitlement, hardware, connectivity and installation.

**Missing cost categories.** Hosting and multi-tenant infrastructure per organisation and per vessel; telemetry
ingestion, storage and egress per vessel; notification providers; mapping licences if a map surface is included;
support minutes per organisation and per vessel; onboarding delivery hours; migration effort; payment, invoicing,
dunning and tax handling; sales and acquisition per organisation; partner/referral margin; security operations,
penetration testing, audit and insurance; and the CRA-related maintenance obligations (`H-13`). Also missing:
the DPA, subprocessor register and DPIA prerequisites, without which no customer data may be processed (X-07,
P-09).

**Implied difference and required discount.** Not computable: there is no historical amount. The only correct
statement is that a bespoke package price **does not exist** and that no discount can be discussed before a
costed service catalogue exists.

**Could a legitimate usable configuration fit?** The FLEET package is legitimate as an **integrated contracted
offer** (SaaS + onboarding + registration/migration + training + support, with hardware/connectivity/installation
optional and quoted). It is not a checkout object, it is not a subscription, and it must not be presented as
"included" in a FLEET subscription (D-014). A usable package requires a costed onboarding and service
catalogue, a data-processing agreement, and tenant isolation/authorisation evidence.

**Sensitivity.**

| Movement | Effect (symbolic) | Evidence that would settle it |
| --- | --- | --- |
| Per-vessel subscription hypothesis revised | changes the receipt line, not the cost of serving the vessel | pricing decision, not a supplier fact |
| Onboarding hours per organisation | organisation-level cost rises with `H_ONB × R_ONB`; a fixed package fee must recover it | measured onboarding across organisations (X-05, X-06) |
| Vessel count per organisation | spreads fixed organisation costs differently; per-vessel economics change | pilot cohort (X-06) |
| Telemetry volume or storage retention | `C_TELEM_F`, `C_STORE_SVC` rise per vessel | ingestion design + provider quotation (H-12, P-09) |
| Support minutes per vessel | `C_SUP_SVC` rises; the subscription contribution falls | measured ticket rate |
| Connectivity or hardware expectation | must be quoted separately; including it in the subscription is prohibited (D-014) | connectivity terms (H-12) |
| Enterprise integration / SLA requirement | contracted scope only; no SLA figure without measurement (`NO_SLA_ESTABLISHED`) | signed contract + measurement plan |
| Annual prepayment / volume discount | reduces receipts; ceiling must be derived from cost to serve, not from a competitor | costed service catalogue |

All are symbolic; all are `OPEN`/`BLOCKED`.

**What would invalidate the package.** An onboarding cost that cannot be recovered from a quoted service fee; a
hardware/connectivity expectation embedded in a subscription (prohibited by D-014); an enterprise requirement
for an SLA that has no measurement capability (`NO_SLA_ESTABLISHED`); or the absence of a DPA/DPIA. Any of these
stops the package rather than invalidating a number, because no number exists.

**Evidence-supported vs assumption.** *Supported by documented facts:* FLEET pricing is per vessel per month,
VAT excluded (D-014); onboarding, installation, connectivity and hardware are separately quoted; Enterprise is a
contracted tier with no price; no SLA is established. *Not established:* every element of the package's cost and
therefore any package price.

**Verdict — MAREA FLEET package.**

| Field | Value |
| --- | --- |
| Historical hypothesis | Bespoke (no amount) |
| Price status | no price exists — `BESPOKE_PACKAGE_NOT_ESTABLISHED` |
| Configuration cost established? | **NO** — no onboarding, migration, training, support, hardware, connectivity or installation cost |
| Fixed price permissible? | **NO** — contracted package only |
| Recommended commercial model | bespoke contracted quotation after costed service catalogue, DPA and tenant-isolation evidence |
| Recorded classification | `BESPOKE_PACKAGE_NOT_ESTABLISHED` |

### 6.7 Required summary table

| Bundle | Historical hypothesis | Configuration cost established? | Fixed price permissible? | Recommended commercial model |
| --- | ---: | --- | --- | --- |
| MAREA START | EUR 499 | **NO** — hypotheses only; HUB BOM and NAV data costs `BLOCKED` | **NO** | Uninstalled first-year product-only reference (HUB + NAV lines), price withheld; installation/survey/configuration quoted separately; quote/configuration request |
| MAREA CRUISE | EUR 1,399 | **NO** — three hardware costs `BLOCKED`, `DISPLAY-7` size not frozen, installation unmeasured | **NO** | Uninstalled first-year product-only reference (NAV one year + three hardware items); installation, materials and commissioning quoted separately; fixed bundle price only after BOM, conformity and measured installation |
| MAREA SAIL | EUR 1,990 | **NO** — PILOT is a quotation, `SENSE-WIND` price absent, no installed scope costed | **NO** (D-009; safety gate `BLOCKED`) | **Vessel-specific quotation** — `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` |
| MAREA PROTECT | EUR 399 plus subscription | **NO** — and the historical amount does not even cover the fixed two-module composition at the permitted hypotheses (497 > 399) | **NO** | Quotation-valued package: WATCH hardware + separate subscription + quoted SENSE kit + separate installation; final price `OPEN` |
| MAREA COMPLETE | EUR 3,490 | **NO** — six hardware/device cost families `BLOCKED`, four SENSE prices absent, PILOT quoted, subscriptions undefined | **NO** (D-009; safety gate `BLOCKED`) | **Vessel-specific multi-line quotation** — `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` (`FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`) |
| MAREA FLEET package | Bespoke (no amount) | **NO** — no onboarding/migration/training/support/hardware/connectivity/installation cost | **NO** | Bespoke contracted quotation after a costed service catalogue, DPA and tenant-isolation evidence |

Classification legend used in this table: `CONFIGURATION_COST_NOT_ESTABLISHED` (START, CRUISE),
`FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` (SAIL, COMPLETE),
`HISTORIC_PRICE_NOT_COST_JUSTIFIED` (PROTECT), `BESPOKE_PACKAGE_NOT_ESTABLISHED` (FLEET package). **No bundle in
this table has an established price, and none may be described as approved, final, launch, from-price or
purchasable.**

### 6.8 Cross-bundle findings

1. **Four of the five fixed-amount historical hypotheses sit above their component reference sums**
   (`Δ_START = −1`, `Δ_CRUISE = −3`, `Δ_SAIL = −103`, `Δ_COMPLETE = −158`), and one sits below
   (`Δ_PROTECT = +98`). None of those differences has any cost evidence behind it; they are differences between
   sets of unapproved retail hypotheses.
2. **The apparent headroom is an artefact of omission.** The bundles that appear to have headroom are precisely
   the ones omitting the largest cost categories (PILOT drive and labour, installation, commissioning,
   conformity, subscription years). The bundle that has no headroom (PROTECT) is the one whose composition is
   fully specified at two modules.
3. **No bundle is costed, so no bundle can be fixed-priced.** The single most important cross-bundle finding is
   that the question "is the bundle price right?" cannot be answered: the denominator does not exist.
4. **The period structure is unresolved in every bundle.** A one-year NAV entitlement, one-off hardware, a
   monthly subscription and a vessel-specific installation are four different objects. A bundle headline without
   a term is not a price; it is a sentence fragment.
5. **D-009 propagates through two bundles.** SAIL and COMPLETE contain PILOT as an installed, surveyed,
   safety-gated object. A fixed bundle price would silently turn a quotation into a turnkey price, which is
   prohibited. Their correct state is `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION`.
6. **PROTECT's failure is arithmetic, not missing cost.** Even before any real cost, the fixed composition
   (WATCH + POWER + BILGE) exceeds EUR 399 at the permitted hypotheses. It is recorded as
   `HISTORIC_PRICE_NOT_COST_JUSTIFIED`.

## 7. Bundle discount policy

### 7.1 Principle

A bundle price that is lower than the sum of its standalone objects is only defensible when the difference is
**paid for by a real, evidenced reduction in cost or a real increase in value**. The only admissible sources are
the five below; each one is `OPEN` until measured:

| Admissible source | What must be evidenced to justify a bundle difference | Status |
| --- | --- | --- |
| Shared packaging | one pack instead of several, measured packaging and fulfilment saving (`ΔPACK`) | `OPEN` — no packaging quote exists |
| Shared installation | one visit for several devices, measured labour saving (`ΔINSTALL`) with the installation still itemised | `BLOCKED` — no measured installation hours |
| Reduced acquisition cost | one acquisition funnel instead of several, measured saving (`ΔACQ`) | `OPEN` — no acquisition measurement (X-06) |
| Reduced support duplication | one support relationship, measured ticket reduction (`ΔSUP`) | `OPEN` — no ticket data |
| Channel efficiency | a trade term that reflects real partner services rather than a marketing subtraction (`ΔCHAN`) | `BLOCKED` — no channel agreement (X-05, X-06) |

```text
justifiable bundle difference  ≤  ΔPACK + ΔINSTALL + ΔACQ + ΔSUP + ΔCHAN   (symbolic; each term OPEN/BLOCKED)
```

### 7.2 Prohibitions

- **No discount percentage is created, stated, proposed or approved here.** Not for any bundle, not for any
  channel, not for any launch. `D*` in §5.4 is a ceiling to be derived from a costed contribution model; it is
  not a rate and cannot be published.
- **No discount may be applied to a hypothesis.** A discount presupposes an established, costed price; every
  bundle price in this programme is `HYPOTHESIS_UNAPPROVED`.
- **No discount may conceal a mandatory accessory or installation.** If a usable configuration requires an AIS
  antenna/splitter, a mount, an adapter, a survey or an installation, that item is either listed and priced as a
  separate line or explicitly excluded — never absorbed into a "bundle value" story. "Installation included" is
  prohibited while no installation price exists.
- **No discount may be justified by a competitor's price.** Public competitor prices are not costs and are not
  available to EMBARCARTE (see the comparator sections of `PRODUCT-PRICING-AND-CHANNEL-MODEL*.md`).
- **No retroactive discount** and no discount on a bundle that is not `OPERATIONS_READY`.
- **No "free" element** may be offered without a costed basis and a decided duration.
- **A bundle price below the sum of its parts is not automatically a discount**: it may be an omission of a
  mandatory cost. The correct response to an unexplained difference is to find the missing line, not to
  celebrate the saving.

### 7.3 Discount decision procedure (to be executed only after costing)

1. establish the costed contribution of every included object (hardware, service, subscription) from real
   quotations and measurements;
2. measure each admissible shared-saving term, or set it to zero if unmeasured;
3. compute the maximum justifiable difference from §7.1 and the `D*` ceiling from §5.4;
4. record the evidence, the arithmetic and the decision taken by the named human pricing authority;
5. publish only after the bundle reaches `OPERATIONS_READY` and the price is no longer a hypothesis.

Until steps 1–4 exist, the answer to "what discount does this bundle carry?" is: **none is approved, none is
proposed, and none may be inferred from the historical differences in §6.**

## 8. VAT and tax treatment framework

### 8.1 Principles

- Consumer bundle hypotheses are **VAT-inclusive** (a planning convention), and the applicable rate is **not
  fixed by the programme**. No rate is asserted as approved for any object, any territory or any classification.
- FLEET hypotheses are **VAT-excluded B2B** (frozen by D-014): the per-vessel figures are not gross consumer
  prices and must never be presented as such.
- The seller's legal identity is a blocker (`X-02`): no tax identifier, address or registration number may be
  fabricated, so no compliant invoice can be issued today.
- Place of supply, intra-EU reverse charge, One-Stop-Shop treatment of digital services and any territory-specific
  indirect-tax regime are `OPEN`.
- The goods-versus-services classification differs **inside** a single bundle: a HUB is goods, a NAV entitlement
  is a digital service, an installation is a service, a WATCH subscription is a recurring digital service. A
  bundle therefore cannot be netted down with one blended VAT rate: each line has its own `v_i`, all `OPEN`.

### 8.2 Per-line VAT treatment table (symbolic)

| Bundle line | Object class | VAT basis hypothesis | Rate | Status |
| --- | --- | --- | --- | --- |
| `NAV-*` entitlement | digital service, annual | consumer retail, VAT-inclusive hypothesis | `v` | `OPEN` |
| `HUB-*`, `AIS-*`, `DISPLAY-*`, `WATCH-CORE` hardware, `SENSE-*` modules | goods | consumer retail, VAT-inclusive hypothesis | `v` | `OPEN` |
| `PILOT-COASTAL` installed scope | mixed goods + installation service | quotation; treatment per quotation line | `v` | `OPEN` |
| Installation, commissioning, training, survey | services | quotation; treatment per line | `v` | `OPEN` |
| `WATCH-CORE` subscription | recurring digital service | consumer retail, VAT-inclusive hypothesis | `v` | `OPEN` |
| `FLEET-*` per-vessel subscription | B2B digital service | **VAT-excluded** | `v_b2b` | frozen as VAT-excluded; treatment `OPEN` |
| FLEET onboarding/migration/training/support | B2B services | quoted ex-VAT | `v_b2b` | `OPEN` |

### 8.3 Spanish 21 % scenario — `ASSUMPTION` only, never the approved treatment

```text
SCENARIO ILLUSTRATION — ASSUMPTION, NOT EVIDENCE, NOT A PRICE, NOT A MARGIN
  v_es_scenario = 0.21                        (assumed ONLY to show the shape of the arithmetic)
  net_factor    = 1 / (1 + 0.21)              (an arithmetic constant, not a net price)
  vat_factor    = 1 - net_factor              (the corresponding share, not a tax determination)
```

The scenario demonstrates only that a VAT-inclusive consumer figure G splits into `G × net_factor` and
`G × vat_factor`. It is **not** used anywhere in this document to derive a net revenue, a net price, a margin or
a contribution: doing so would require a determined rate (`OPEN`), a determined classification per line
(`OPEN`) and a costed worksheet (absent). A real calculation must use the per-line `v_i` from written tax advice,
not this scenario, and must not blend goods and digital services into one rate.

### 8.4 What the tax framework forbids

- A gross-to-net conversion presented as a net price.
- A VAT rate presented as decided, applicable or approved.
- A bundle price quoted VAT-inclusive to a VAT-registered B2B buyer as if it were the ex-VAT price (or vice
  versa).
- Any comparative, crossed-out or "VAT-free" marketing claim.
- Any invoice, VAT number, address or registration detail invented to make a quotation look compliant.

## 9. Channel economics per route

Three routes are modelled. None is operational, none has signed terms, and none has a costed economics.

### 9.1 Direct-to-consumer (D2C)

| Dimension | Position | Status |
| --- | --- | --- |
| Who sells, invoices, fulfils, supports | EMBARCARTE | `OPEN` — no shop, no stock, no approved price |
| Margin capture | full capture, offset by all variable cost, support, warranty, returns, acquisition and payment/fraud risk | `OPEN` |
| Installation | **not included**; customer arranges it or a quotation step precedes checkout | `BLOCKED` |
| Channels where plausible | START, CRUISE (simple configurations), PROTECT hardware + subscription, NAV/WEATHER-only paths | `OPEN` |
| Key risk | a D2C bundle price that appears to include installation or commissioning | prohibited |
| Decision needed | consumer terms, withdrawal/consent wording, returns process, payment capability | `OPEN` |

### 9.2 Installer-led (and installer-led quotation)

| Dimension | Position | Status |
| --- | --- | --- |
| Who sells | installer assesses the vessel, proposes the configuration, installs, commissions, trains, gives first-line support | `BLOCKED` — no installer network, agreements or rate cards (X-05, X-06) |
| Who prices what | product lines per an approved price list (none exists); installation labour and materials as the installer's own itemised quotation | `OPEN` |
| Margin model | `M_INSTALLER` as the price of real partner services, ceiling `D*`; never a deduction from a consumer price | `BLOCKED` |
| Applies to | START, CRUISE (fixed helm installation), SAIL, COMPLETE, and complex PROTECT installations | `OPEN` |
| Rule | the installer must never be asked to quote a hypothesis as if it were an approved price | binding |
| Decision needed | written terms: trade price, stock, payment terms, warranty handling, first-line support, escalation, who invoices what | `BLOCKED` |

### 9.3 B2B contracted (FLEET package and enterprise configurations)

| Dimension | Position | Status |
| --- | --- | --- |
| Buyer | organisation (school, charter, marina, rental operator, manager, flotilla) | `OPEN` — no customer evidence (X-06) |
| Unit | per-vessel monthly subscription (VAT excluded) plus one-off contracted services | frozen shape (D-014) |
| Contract | named account, scoped services, explicit limits, no invented SLA, no "unlimited" | `BLOCKED` — no contract, DPA or delivery capacity (P-09, X-07) |
| Margin | partner/installer margin `M_PARTNER`/`M_INSTALLER`, `BLOCKED` | `BLOCKED` |
| Rule | the FLEET package is **not** a FLEET subscription; hardware, connectivity and installation are optional and quoted (D-014) | binding |
| Decision needed | DPA, subprocessor register, DPIA, service scope, support model, termination and data-return terms | `BLOCKED` |

### 9.4 Channel comparison (no margin percentages — none exist)

| Criterion | D2C | Installer-led | B2B contracted |
| --- | --- | --- | --- |
| Revenue captured | higher per unit in principle, unmeasured | shared with partner, unmeasured | contracted, unmeasured |
| Cost borne by EMBARCARTE | support, warranty, returns, acquisition, payment/fraud | reduced field burden, but partner margin required | onboarding, support, security, DPA/DPIA |
| Installation cost visibility | customer-side, separate | itemised quotation | contracted scope |
| Main pricing risk | "included" language | quoting a hypothesis as approved | embedding hardware/connectivity in a subscription |
| Status | `OPEN` | `BLOCKED` | `BLOCKED` |

No route may be claimed to yield a particular margin; each is its own profit-and-loss object to be modelled
after quotations and terms exist.

## 10. Payment milestone proposal (not a contract)

This section is a **proposal for discussion**, not a contractual term, not an approved policy and not a payment
schedule. No percentage, amount, deposit or instalment value is created: a payment milestone is a *structure*,
and the split must be decided per contract after the scope and cost base exist.

| Milestone (proposal) | Trigger | Applies to | Amount |
| --- | --- | --- | --- |
| `M1` Quotation acceptance | signed acceptance of the itemised quotation and equipment selection | SAIL, COMPLETE, FLEET package, installer-led CRUISE | to be decided per contract — no amount or percentage exists |
| `M2` Equipment order | confirmed component availability / supplier order | hardware-bearing bundles | to be decided |
| `M3` Installation complete | installation and function test recorded | installed bundles | to be decided |
| `M4` Commissioning and handover | commissioning record, training, acceptance | installed bundles; FLEET onboarding | to be decided |
| `M5` Contract term / renewal | contracted service period or subscription renewal | FLEET package, WATCH subscription, NAV renewal | to be decided |

Rules for the proposal:

- a milestone never converts a hypothesis into an approved price;
- no milestone may be presented to a customer until the underlying quotation lines are costed and approved;
- subscription periods are billed only for the service actually delivered, and no charge may occur without
  explicit consent (`OPEN`, consumer-law review);
- the structure must survive cancellation and refund terms (§11) and the consumer's withdrawal position, which
  is `OPEN`;
- the final split is a business decision; this document creates none.

## 11. Subscription revenue, cancellation and refund framework

A framework, not approved policy. Legal and consumer-law review is required before any of it becomes
customer-facing wording.

| Event | Intended behaviour (framework) | Status |
| --- | --- | --- |
| Term start | subscription activated at purchase/activation; term and included contents stated; no charge without explicit consent | `OPEN` — terms not written |
| During term | declared scope: alerts, history window (WATCH), licensed data coverage (NAV/WEATHER), vessels and seats (FLEET), all limits numeric unless not yet decided | `OPEN` |
| VAT basis | consumer lines VAT-inclusive hypothesis; FLEET VAT-excluded; per-line rate `OPEN` | `OPEN` |
| Failed payment | grace period, retry, dunning; **remote monitoring may stop, local safety-relevant functions must never stop** (subscription isolation) | `OPEN` — design requirement |
| Cancellation | access continues to term end; export of the customer's own data offered; history retention stated | `OPEN` |
| Refund | not promised in copy; position depends on consumer law and on whether a digital service has started with express consent | `OPEN` — legal review |
| Upgrade | mid-term upgrade applies a prorated credit; the same entitlement is never billed twice (D-013) | `OPEN` |
| Renewal | renewal reminder and price-change notice as the law requires; no dark patterns or false urgency | `OPEN` |
| Payment recovery | retries and recovery cost modelled under `C_BILLING`; failed-payment impact on local function prohibited | `OPEN` |
| Channel commission on recurrence | whether a partner resells or refers the recurring entitlement, and on what basis | `BLOCKED` |
| Price change | at renewal only, with the advance notice required; no unilateral mid-term change | `OPEN` |
| Retention | `CHURN` per cohort must be observed before any LTV or payback statement | `OPEN` |

**Subscription-isolation rule (binding).** No subscription lapse, cancellation, refund or payment failure may
degrade local steering, local alarms or valid local sensing. This is a price-model constraint as well as a safety
constraint: a bundle may not be structured so that a WATCH/SENSE subscription controls the availability of a
local function.

## 12. Missing supplier evidence list

Each item is external. None can be produced by documentation work, and none may be filled with an estimate.

| # | Evidence required | What it closes | Bundles affected | Blocker |
| --- | --- | --- | --- | --- |
| 1 | Written supplier RFQs for HUB Standard/Pro, AIS Receiver/Connected, DISPLAY-7, WATCH Core and every SENSE module, with MOQ, volume tiers, lead time, lifecycle | `BOM_*` | START, CRUISE, PROTECT, COMPLETE | H-05, H-07, H-11, X-05 |
| 2 | Contract-manufacturer quotation for assembly, programming, test, packaging and inspection | `ASSY_*`, `MTEST_*`, `PACK_*` | all hardware bundles | H-07 |
| 3 | Enclosure, tooling and mounting quotations (including `SIZE_NOT_FROZEN` resolution for DISPLAY) | `ENCL_*`, `TOOL_NRE_*`, `ACC_*` | CRUISE, COMPLETE | H-05, H-07, H-11 |
| 4 | Accredited test-house and conformity quotations (CE/EMC/LVD/RED/GPSR/CRA/RoHS/WEEE) plus technical file and translated manuals | `CERT_NRE_*`, `CERT_ALLOC_*` | all hardware bundles | H-05, H-06, H-13 |
| 5 | AIS antenna/splitter inclusion decision and supplier quotation | `ACC_*` (AIS antenna/splitter) | CRUISE | H-08, S-01 |
| 6 | PILOT drive/actuator family selection and quotations, rudder/steering feedback evidence, physical E-stop and motor-isolation evidence | PILOT quotation scope | SAIL, COMPLETE | H-01, H-03, H-10 |
| 7 | Measured installation, commissioning and survey hours on representative vessels | `H_SURVEY`, `H_INST`, `H_COMM`, `R_*` | CRUISE, SAIL, PROTECT, COMPLETE | X-05, X-06 |
| 8 | Installer day-rate and service-call rate card | `R_SURVEY`, `R_INST`, `R_COMM` | all installed bundles | X-06 |
| 9 | Connectivity: MVNO/operator terms, SIM/eSIM logistics, roaming policy, measured coverage | `C_CONN`, `C_ROAM` | PROTECT, FLEET package | H-12 |
| 10 | Notification-provider written terms and price schedule | `C_NOTIF` | PROTECT, FLEET package | H-12, P-06 |
| 11 | Cloud/hosting quotations at named volumes and retention windows | `C_HOST`, `C_STORE_SVC`, `C_MON` | all subscription bundles | X-05, P-06 |
| 12 | Chart-data licence quotations and territory rights (official ENC position) | `C_DATA_LIC` for NAV | START, CRUISE, SAIL, COMPLETE | D-01, D-02, D-03 |
| 13 | Weather/tide/current provider terms or a costed self-hosting analysis | `C_API`, `C_DATA_LIC` | any WEATHER add-on; NAV overlays | D-04, D-05, D-07, D-10 |
| 14 | AIS-derived data retention/redistribution position | `C_DATA_LIC`, FLEET/WATCH data scope | PROTECT, FLEET package | D-09 |
| 15 | Payment-provider and subscription-billing fee schedules (incl. chargeback, dunning, refunds) | `PAY`, `C_BILLING` | all bundles | X-05 |
| 16 | Warranty policy and reliability/returns data from pilot installations | `WARR_RES_*`, `RET_ALLOW_*`, `r_warr`, `r_ret` | all hardware bundles | X-02, X-07 |
| 17 | Support model with measured ticket rate and minutes | `SUP_HW_*`, `C_SUP_SVC` | all bundles | X-05 |
| 18 | Negotiated channel terms (installer and distributor) | `M_INSTALLER`, `M_DISTRIBUTOR`, `m_chan`, `D*` | installer-led bundles | X-05, X-06 |
| 19 | Written VAT and cross-border tax advice, including per-line classification | `v`, `v_b2b` | all bundles | tax advice, X-02 |
| 20 | Onboarding, migration and training measurement across real organisations | `H_ONB`, `R_ONB`, `C_MIG`, `H_TRAIN`, `R_TRAIN` | FLEET package | X-05, X-06 |
| 21 | Partner/referral terms for FLEET | `M_PARTNER` | FLEET package | X-05, X-06 |
| 22 | Security programme cost (penetration testing, vulnerability handling, CRA maintenance, insurance) | `C_SEC` | FLEET package, PROTECT | H-13, X-07 |
| 23 | Seller legal identity, DPA, subprocessor register, DPIA | invoice capability; customer-data processing | all bundles (FLEET especially) | X-02, X-07, P-09 |
| 24 | Customer willingness-to-pay evidence from structured discovery, each hypothesis tested as a neutral question | price validation (never as an offer) | all bundles | X-06 |

## 13. Price decisions — classification and recommendation per historical hypothesis

Every historical bundle hypothesis is classified `HYPOTHESIS_UNAPPROVED` and receives exactly one
recommendation. **No historical bundle price is validated. No supplier quotation exists for any component. No
BOM, labour rate, certification cost, channel agreement, connectivity cost or payment-cost schedule exists.**
The recommendations below are the maximum this document may produce: they request a future business decision;
they do not take it.

| Bundle | Historical hypothesis | Classification | Recommendation | Recorded verdict |
| --- | ---: | --- | --- | --- |
| MAREA START | EUR 499 | `HYPOTHESIS_UNAPPROVED` | **RETAIN as an unapproved internal starting reference** (uninstalled first-year product-only reference); never customer-facing; revise only after a costed worksheet and a pricing decision | `CONFIGURATION_COST_NOT_ESTABLISHED` |
| MAREA CRUISE | EUR 1,399 | `HYPOTHESIS_UNAPPROVED` | **RETAIN as an unapproved internal starting reference** (uninstalled first-year product-only reference); the NAV-Essential vs NAV-Pro ambiguity must be resolved by a configuration decision; revise after BOM and measured installation | `CONFIGURATION_COST_NOT_ESTABLISHED` |
| MAREA SAIL | EUR 1,990 | `HYPOTHESIS_UNAPPROVED` | **WITHDRAW as a bundle price for business decision**; the object is a vessel-specific quotation (D-009) | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` |
| MAREA PROTECT | EUR 399 plus subscription | `HYPOTHESIS_UNAPPROVED` | **REVISE before any future use**; the amount cannot cover the fixed composition at the permitted hypotheses and must never be quoted or published; established price `OPEN` | `HISTORIC_PRICE_NOT_COST_JUSTIFIED` |
| MAREA COMPLETE | EUR 3,490 | `HYPOTHESIS_UNAPPROVED` | **WITHDRAW as a bundle price for business decision**; the object is a vessel-specific multi-line quotation (D-009), and `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED` | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` |
| MAREA FLEET package | Bespoke | no price exists | **RETAIN as a bespoke contracted model only**; no amount may be created before a costed service catalogue, DPA and tenant-isolation evidence | `BESPOKE_PACKAGE_NOT_ESTABLISHED` |

### 13.1 What a future pricing decision would require (all six)

No bundle hypothesis may move beyond `HYPOTHESIS_UNAPPROVED` until **all** of the following exist and are
attached to the decision:

1. a costed worksheet per bundle filling every symbol of §4.3–§4.5 from real quotations and measurements;
2. evidence that each included object is at least `REGULATORY_READY` and the bundle's installation route is
   established;
3. written channel terms where the route is installer-led or B2B;
4. written VAT/tax advice with per-line classification;
5. a consumer-law review of the commercial wording;
6. an observed willingness-to-pay evidence set (MC-09/MC-10), used as research and never as an offer;
7. a named human pricing authority taking the decision, with the worksheet attached.

Until then, `pricing = HYPOTHESIS_UNAPPROVED` is the honest state of every bundle, and the only correct
customer-facing representation is "request a quotation" or an availability statement matching true readiness.

## 14. External evidence acquisition list for MC-11 / MC-12 / MC-13

Bundle-specific deliverables the later milestones must produce. Each is external work; none may be substituted by
analyst estimates, competitor prices or internal re-arithmetic.

### 14.1 MC-11 — hardware, BOM and conformity

1. Frozen BOMs with manufacturer part numbers, revisions, alternates and lifecycle statements for HUB
   Standard/Pro, AIS Receiver, DISPLAY-7, WATCH Core and every SENSE module.
2. Three supplier RFQs per major cost category (panel/touch, compute, enclosure, power, harness, sensor element,
   cellular module), with volume tiers, MOQ, lead time and supply commitments.
3. Tooling/NRE quotations for enclosure, mounting and test jigs.
4. Accredited test-house quotations for EMC, LVD, RED applicability, environmental/ingress testing, and the
   conformity route decision.
5. GPSR, WEEE/RoHS and CRA positions per family.
6. AIS antenna/splitter inclusion decision with supplier quotation.
7. PILOT: drive-family selection, feedback evidence, E-stop and motor-isolation evidence, bench/HIL/FMEA and
   supervised sea-trial programme.
8. Measured installation and commissioning hours on at least three representative vessel/helm types, with a
   written scope and risk allowance.
9. Packaging and fulfilment quotations including multilingual artwork.

### 14.2 MC-12 — unit economics, channel and pricing decision

10. Bottom-up costed worksheet per bundle, filling §4.3–§4.5 from the MC-11 quotations; no symbol left as a
    guess.
11. Negotiated installer and distributor terms (trade price, stock, payment terms, warranty handling, first-line
    support, escalation, who invoices what).
12. Installer day-rate and service-call rate card plus measured labour content per installation type.
13. Warranty and returns policy with reliability grounded in pilot data, and an RMA process definition.
14. Support cost baseline with measured ticket rates and minutes per unit/service.
15. Payment-provider, subscription-billing and refund/dunning fee schedules in writing.
16. Cloud/hosting quotation at named bundle volumes and retention windows.
17. Connectivity terms (MVNO/operator, roaming, SIM logistics) and measured coverage where relevant.
18. Weather/chart/AIS-derived data agreements with per-line entitlement and redistribution rights.
19. Written VAT and cross-border tax advice with per-line classification, including installed-system treatment.
20. Consumer-law review of subscription, renewal, cancellation, withdrawal and warranty wording.
21. Willingness-to-pay research for each bundle configuration, tested as a neutral question, never as an offer.
22. A pricing decision per bundle (retain, revise or withhold), with the costed worksheet attached, taken by the
    named human authority.

### 14.3 MC-13 — verification gates before any price or quotation may be published

23. **PILOT:** bench evidence, E-stop and motor-isolation evidence, rudder/steering feedback evidence,
    supervised sea-trial records, independent safety review — `PILOT_SAFETY_GATE = BLOCKED` must close before
    any SAIL or COMPLETE quotation is issued.
24. **SENSE:** measured accuracy, range, resolution and repeatability per module, validated calibration
    procedure, environmental/ingress test reports.
25. **WATCH:** telemetry ingestion, device identity/ownership/revocation, notification delivery records under
    real network loss, subscription-isolation test proving local functions survive payment failure.
26. **DISPLAY:** frozen size class if any size claim is to be made, panel/enclosure environmental evidence,
    installation validation.
27. **FLEET package:** tenant isolation, cross-organisation access prevention, export/deletion, DPA/DPIA, and a
    service-level decision (a contracted SLA with measurement or the public statement `NO_SLA_ESTABLISHED`).
28. **Compatibility evidence:** the D5 rows on which each bundle depends must be tested (`I-*` rows), because a
    price for an integration nobody can use is not a price.
29. **Operations readiness:** stock/fulfilment capacity, support capability, returns process and payment
    capability for each specific bundle's SKUs.

## 15. Honest limits

1. **Spreadsheet arithmetic is not supplier cost evidence.** The sums in §6 are additions of unapproved retail
   hypotheses. They prove consistency or inconsistency between hypotheses; they prove nothing about what any
   object costs EMBARCARTE.
2. **A definition milestone does not establish margin.** No margin, contribution, mark-up, payback, LTV or
   break-even figure is computed in this document, because every input required to compute one is
   `OPEN`/`BLOCKED`. A subtraction of unknowns is unknown.
3. **No historical price is validated.** START 499, CRUISE 1,399, SAIL 1,990, PROTECT 399 plus subscription and
   COMPLETE 3,490 remain exactly what they were: unapproved hypotheses. The FLEET package has no amount at all.
4. **No supplier quotation exists** for any component of any bundle, and no labour rate, certification cost,
   channel agreement or connectivity contract exists either.
5. **A PASS does not approve anything.** If MC-08 passes, it passes its definition, compatibility and lifecycle
   scope; the bundle prices remain unapproved and unusable.
6. **Absence is reported as absence.** `NOT_ESTABLISHED`, `OPEN` and `BLOCKED` are the correct values; the
   programme prohibits placeholders, analyst estimates, invented comparators and invented customer evidence.
7. **Comparator prices are not available to EMBARCARTE.** The MC-05/MC-06/MC-07 comparator tables are dated
   observations of other companies' public prices in other product categories; they establish no cost, no
   willingness to pay and no achievable price, and none has been reused as a bundle input.
8. **The bundles do not exist.** No manufactured unit, no installed system, no deployment, no subscription
   service and no fleet tenant exists for any object in this document.

### 15.1 What this document must never be read to say

| Forbidden reading | Why |
| --- | --- |
| "MAREA START costs EUR 499" or any similar sentence | Every amount is an unapproved hypothesis; the document computes no cost |
| "The bundle saves EUR 3 / EUR 47 / EUR 98 / EUR 103 / EUR 158" | Those are differences between hypotheses, not savings; no discount policy is created |
| "The bundle includes installation" | No installation price exists; installation is always a separate itemised quotation |
| "VAT is 21 %" | 21 % appears only as an explicitly labelled scenario assumption, never as the approved treatment |
| "The margin is positive / negative / healthy" | No cost base exists; no margin may be stated in either direction |
| "The bundle is approved / final / launch-priced / purchasable" | No bundle price is approved and no bundle is for sale |
| "PILOT is turnkey for EUR 1,290" | D-009 prohibits it; PILOT is a vessel-specific quotation after survey |

## 16. Traceability and maintenance

- **Governing contract:** `docs/marea/products/README.md` §5 (evidence classes), §8 (batch-01 hypotheses), §17
  (batch-02 hypotheses), §26–§31 (batch-03 hypotheses, edition authority, claim rules, cross-product authority).
- **Hypothesis sources:** `docs/marea/COMMERCIAL-PORTFOLIO.md` (bundle architecture and price/channel decision
  rule); `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` §§3, 6–9, 12–13; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md`
  §§3, 7–10, 13; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §§3, 7–13, 16.
- **Decisions:** D-007 (vocabulary and price status), D-008 (`PILOT-PRO` installation package), D-009 (PILOT
  quotation model), D-010 (one governance system; subscription isolation), D-011 (batch-02 editions; no Plus
  uplift), D-012 (batch-03 editions; DISPLAY size), D-013 (WEATHER one ledger, no double billing), D-014 (FLEET
  per vessel, VAT excluded, contracted Enterprise), D-015 (safety/security never edition features), D-016 (one
  governance system across three batches). MC-08 decisions: D-018 (bundle contract type; no bundle inherits
  product approval), D-019 (reference configurations and edition pairings fixed), D-020 (PROTECT counts sensors
  once; kits expand to modules), D-021 (SAIL and COMPLETE remain vessel-specific quotations), D-022 (FLEET
  package distinct from the FLEET SaaS family), D-023 (historical bundle prices remain unapproved; these price
  challenge verdicts are recorded), D-024 (journey/asset reconciliation).
- **Blockers:** X-05 (no costs), X-06 (no customer/channel evidence), H-05/H-07 (no BOM/supplier quotes), H-06/H-13
  (conformity), H-12 (connectivity), D-01 (charts), D-04/D-05/D-07/D-10 (weather/data rights), P-06 (WATCH
  service), P-09 (FLEET SaaS), X-01 (brand), X-02 (legal identity, warranty terms), X-07 (security/privacy).
- **Change control:** any new number must be an approved internal decision or a dated, citable external
  observation; a hypothesis is never upgraded by re-arithmetic; stale comparator anchors must be re-checked
  before reuse; an unverifiable comparator stays `UNVERIFIED`.
- **Owner:** Pricing and Channel Economics Specialist (this document); independent review by D19. This document
  creates no price, no quotation, no discount, no margin and no commercial offer.
