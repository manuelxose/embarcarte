# MAREA WEATHER — complete final-product commercial specification (MC-07 / D2-WEATHER)

Programme: EMBARCARTE / MAREA. Milestone MC-07, batch 03.
Product code WEATHER. Type SOFTWARE. Lifecycle DEFINED. Availability NOT_FOR_SALE. Publication INTERNAL_ONLY.
Companion annex: docs/marea/products/WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md.
Customer copy: docs/marea/products/copy/weather.es.md and docs/marea/products/copy/weather.en.md.

---

## 0. Contents

- §1 Status block — completely specified, not for sale
  - 1.1 Product-level status
  - 1.2 Per-dimension readiness, never collapsed into one flag
  - 1.3 Evidence classes used in this dossier
  - 1.4 Canonical WEATHER evidence states
  - 1.5 The one-message summary
- §2 Canonical field block convention
- §3 The 24 canonical fields F01–F24
- §4 F04 capability-domain register — the 44 mandatory final domains
  - 4.1 The six data types (forecast / observation / historical / derived / user-entered / unknown)
  - 4.2 The register
  - 4.3 Coverage check
  - 4.4 Per-variable display metadata
- §5 Pilot geography, declared coverage and the honest expansion statement
  - 5.1 The pilot geography
  - 5.2 Declared coverage per variable and per source
  - 5.3 Expansion limits and the honest expansion statement
- §6 Edition architecture — MAREA WEATHER Standard and MAREA WEATHER Pro
  - 6.1 Verdicts
  - 6.2 Outcome-based differentiation and the provider-rights gate
  - 6.3 What Standard must always include and is never edition-gated
- §7 Pricing and cost framework for the frozen hypotheses
  - 7.1 The two frozen hypotheses
  - 7.2 Named cost inputs (no invented provider contracts)
  - 7.3 Cost-per-variable attribution and margin sensitivity, symbolic only
  - 7.4 Commercial terms still unresolved
- §8 Forecast provenance, timestamp semantics, freshness and multi-model comparison
- §9 Acceptance scenarios WEATHER-AC-01 to WEATHER-AC-35
- §10 Traceability annex — MC-02 blockers and the exact evidence required before any sale
- §11 Ecosystem, cross-sells and cross-product authority
- §12 Required disclaimers and limitation statements — verbatim, ES and EN
- §13 Non-assertions and document status

---

## 1. Status block — completely specified, not for sale

### 1.1 Product-level status (README §1 and brief §3/§5 mapping)

| Dimension | Value |
| --- | --- |
| lifecycle | DEFINED |
| definition | COMPLETE_TARGET_SPECIFICATION |
| engineering | NOT_VERIFIED |
| licensing | NOT_CLEARED |
| hardware | NOT_APPLICABLE_SOFTWARE_PRODUCT |
| dataRights | NOT_GRANTED |
| compliance | NOT_STARTED |
| pricing | HYPOTHESIS_UNAPPROVED |
| brandPublication | NOT_GRANTED |
| availability | NOT_FOR_SALE |
| publication | INTERNAL_ONLY |
| PUBLICATION | BLOCKED |
| SOURCE_IP_CLEARANCE | NOT_CLEARED — no reuse right from the source project and no WEATHER-specific licence |
| providerRightsGranted | false |
| forecastAccuracyClaimed | false |
| redistributionAllowed | false |
| offlineAllowed | false |
| navDoubleBillingAllowed | false |

MAREA WEATHER is a software subscription product. NOT_APPLICABLE_SOFTWARE_PRODUCT for hardware does **not** mean it has no hardware dependencies: it depends on the customer's own device, on its screen and connectivity, and on licensed data. It creates no device obligation for MAREA and carries no hardware BOM.

### 1.2 Per-dimension readiness (README §4, never collapsed into one flag)

The nine dimensions above are independent. A defined product is not an available product: definition is complete, everything else is unproven. No single READY flag exists anywhere in this dossier, in the annex or in the copy.

### 1.3 Evidence classes used in this dossier (README §5)

VERIFIED_REPO (cite the repository path), VERIFIED_EXTERNAL (cite the public URL and the check date 2026-10-30), ASSUMPTION (explicit planning assumption), HYPOTHESIS (commercial or price assumption awaiting approval), OPEN (fact not yet established; the intended experience is still specified), BLOCKED (an external condition prevents closure). OPEN and BLOCKED are legitimate values. The prohibited placeholder token of README §5 is never used and appears nowhere in this dossier.

### 1.4 Canonical WEATHER evidence states

Used unchanged wherever the subject arises, and never upgraded:

| State | Value | Meaning |
| --- | --- | --- |
| WEATHER_PROVIDER_RIGHTS | NOT_GRANTED | No provider has granted commercial display, caching, offline or derived rights to MAREA. |
| WEATHER_PROVIDER_ADAPTERS | PARTIAL | Repository adapters for Open-Meteo, Copernicus Marine and EMODnet exist only in partial form; no production data pipeline for this product exists. |
| WEATHER_FORECAST_EVALUATION | NOT_PERFORMED | No verification of forecast skill in the pilot geography has been carried out; no accuracy figure exists. |
| WEATHER_TIDE_RIGHTS | UNRESOLVED | No official tide-provider terms could be established. |
| WEATHER_HISTORICAL_RIGHTS | NOT_GRANTED | No archive/retention right for historical comparison is held. |
| WEATHER_OFFLINE_RIGHTS | NOT_GRANTED | No offline packaging right is held. |
| WEATHER_SUBSCRIPTION_SERVICE | NOT_FOUND | No billing or entitlement service exists in this repository or product. |
| WEATHER_ENTITLEMENT_LEDGER | NOT_FOUND | The single-ledger model is specified, not built. |
| WEATHER_NOTIFICATION_SERVICE | NOT_FOUND | No configurable notification delivery service exists. |
| WEATHER_SOURCE_REGISTRY | NOT_FOUND | No version-pinned source registry with declared resolution, cycle and horizon exists. |

### 1.5 The one-message summary

MAREA WEATHER is completely specified and not for sale. There is no licensed dataset, no provider contract, no forecast evaluation in the pilot geography, no subscription or entitlement service, no notification service and no version-pinned source registry. The forecast accuracy of any source is unverified and unclaimable, a stale forecast must never be presented as current, and the product is not a meteorological guarantee, not an official warning authority and not a substitute for prudent seamanship. Those are truthful states, not defects of this document.

---

## 2. Canonical field block (convention)

Every field F01–F24 uses the binding five-line block of docs/marea/products/README.md §6:

- **Definition.** — the finished commercial experience, customer-understandable.
- **Evidence.** — one or more evidence classes with paths, URLs, dates or OPEN/BLOCKED.
- **Owner.** — a function, never a person.
- **Blockers / dependencies.** — MC-02 ids from the frozen WEATHER list (D-04, D-05, D-07, D-09, D-10, P-08, P-10, X-01, X-03, X-05, X-06).
- **Commercial readiness.** — one readiness dimension and its value.

---

## 3. The 24 canonical fields

#### F01 - Identity
- **Definition.** MAREA WEATHER is the marine weather and oceanographic information product of the MAREA family: a subscription software service that shows wind, gusts, waves, swell where a licensed source provides it, currents, tides where licensed, sea surface temperature where licensed and atmospheric conditions for a declared set of sailing areas, always with source, model run time, valid time, receipt time, age, data type, units, method, licence and limitations attached to every value. It distinguishes a forecast from an observation from a historical value from a derived computation from user-entered data from an unknown source, and it never presents one as another. It organises forecasts into timelines, map layers where layer rights exist, saved marine locations and a home summary; it supports multi-model comparison as a transparent side-by-side comparison, never as a fictional consensus; and in Pro it adds route weather context, passage planning, weather windows and configurable notifications. Category: software subscription. Family: MAREA. Code: WEATHER. Editions: MAREA WEATHER Standard (WEATHER-STANDARD) and MAREA WEATHER Pro (WEATHER-PRO). Positioning: honest, provenance-first marine weather awareness for the Galicia / Rías Baixas / Atlantic Portugal pilot geography, distinct from MAREA NAV (navigation workspace, charts, logbook) and from MAREA FLEET (multi-vessel B2B platform). It is not a meteorological guarantee, not an official warning authority and not a substitute for prudent seamanship.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §08; VERIFIED_REPO docs/marea/products/README.md §2, §4, §5; VERIFIED_REPO docs/marea/products/WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md §3; OPEN for the licensed provider set.
- **Owner.** Product management (WEATHER).
- **Blockers / dependencies.** D-10, P-08, X-01.
- **Commercial readiness.** definition = COMPLETE_TARGET_SPECIFICATION.

#### F02 - Customer segments
- **Definition.** Primary segment: recreational sailing and motor-boat skippers cruising the Galicia / Rías Baixas / Atlantic Portugal area who plan short coastal and day passages and need to decide when to go, which way to route and whether conditions are inside their comfort and competence. Secondary segment: small charter and sailing-school operators and flotilla organisers in the same geography who need a shared, attributable forecast view for several skippers and a defensible record of what was shown. Tertiary segment: owners preparing a longer Atlantic passage who use the pilot region as a departure area and want honest model comparison and weather windows before committing. Buying contexts: a weekend decision, a holiday charter, a regatta or club cruise, a delivery passage, and the first season after buying a boat. Explicitly not a segment: anyone seeking an official meteorological warning service, a certified routing authority, an insurance-grade weather record, offshore race routing as a performance guarantee, or commercial shipping weather routing.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §08 (buyer/problem); VERIFIED_REPO docs/marea/MARKET-BENCHMARKS.md (NAV+WEATHER consumer band); ASSUMPTION segment ranking and buying contexts; OPEN — no primary customer interviews, no validated willingness to pay (X-06).
- **Owner.** Product marketing and commercial development.
- **Blockers / dependencies.** X-06.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F03 - Customer problems
- **Definition.** The problems MAREA WEATHER is designed to remove: (1) forecasts are scattered across free apps whose data source, model run and age are invisible, so a skipper cannot tell whether two screens agree because the weather is stable or because they are the same model; (2) a value with no timestamp or an old timestamp is read as current, which is the most common way a forecast screen misleads; (3) multi-model comparison is presented as a single blended "best" number, hiding real disagreement behind a false consensus; (4) local effects in Galicia and the Rías are poorly served by global models at coarse resolution, and the finer regional sources are not licensed for a commercial product; (5) there is no honest way to tell "no data", "outside coverage", "stale" and "all normal" apart; (6) route and passage decisions are made without any structured weather window reasoning; (7) a subscriber cannot tell what is included in a weather entitlement or whether it duplicates one already paid for inside a navigation product. Existing alternatives: free forecast apps, model-viewer websites, harbour-office and club forecasts, GRIB workflows on a laptop, and commercial routing services. MAREA WEATHER's answer is provenance, explicit freshness and explicit comparison, not a claim of superior accuracy.
- **Evidence.** ASSUMPTION on the problem framing; VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §08 quality gates; VERIFIED_REPO docs/marea/MARKET-BENCHMARKS.md (crowded price-sensitive category); OPEN for interview evidence (X-06).
- **Owner.** Product management.
- **Blockers / dependencies.** X-06, P-08.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F04 - Complete end-state functionality
- **Definition.** At end state a customer subscribes, selects one or more sailing areas, saves marine locations, and works from a home screen that answers "what is the weather doing where I sail, how old is it and where did it come from". The finished product provides the forty-four capability domains enumerated and evidenced in §4: home screen; user-selected sailing areas; saved marine locations; wind; gusts; wave height; wave direction; wave period; swell where a licensed source provides it; currents; tides; sea surface temperature where licensed; atmospheric conditions; map layers; timelines; multi-model comparison; source identification; model run time; valid time; receipt time; forecast horizon; geographic coverage; spatial resolution; temporal resolution; attribution; data quality and status; missing data; stale forecast; confidence and uncertainty where a provider publishes it; historical comparison where licensed; route weather context; passage planning; weather windows; configurable notifications; account and saved locations; NAV integration; entitlement sharing; legally authorized caching; offline presentation where rights allow; usage limits; provider outage handling; support; renewal and cancellation; and bilingual marine terminology. Every domain carries its required data right and its external dependency. The product never claims accuracy, never invents a consensus, never shows a forecast as an observation and never presents a stale or unavailable forecast as current.
- **Evidence.** OPEN — intended end-state experience; per-domain evidence in §4; VERIFIED_REPO docs/marea/products/README.md §6 F04; VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §08; the MC-08-WEATHER gate will evidence each domain.
- **Owner.** Product management (WEATHER) with engineering.
- **Blockers / dependencies.** D-04, D-05, D-07, D-10, P-08, P-10.
- **Commercial readiness.** engineering = NOT_VERIFIED.

#### F05 - Differentiation
- **Definition.** MAREA WEATHER is intended to be relevant for six reasons that do not depend on an accuracy claim: (1) provenance-first display — every value carries provider, product, model, model run time, valid time, receipt time, data type and age; (2) an explicit four-state freshness model (current, aging, stale, expired) plus unavailable and out-of-coverage, so "no data" is never shown as "all normal"; (3) multi-model comparison that shows real disagreement as a labelled spread and never fabricates a consensus or a "best model"; (4) a declared coverage statement for the pilot geography, with resolution per source shown instead of implied; (5) a single MAREA entitlement ledger so weather bought with NAV or standalone is never billed twice; (6) bilingual marine terminology for the same data, so Spanish and English users see identical facts. It is not differentiated by claiming better accuracy, exclusive data, official authority, longer coverage, higher resolution or offshore routing performance, and no such claim may be made.
- **Evidence.** ASSUMPTION — differentiation hypothesis; VERIFIED_REPO docs/marea/products/README.md §14 (WEATHER claim restrictions) and brief §14; VERIFIED_REPO docs/marea/MARKET-BENCHMARKS.md (accuracy/price competition); OPEN — no product, no evaluation, no customer evidence (X-06, P-08).
- **Owner.** Product management and commercial strategy.
- **Blockers / dependencies.** X-06, X-05, P-08.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F06 - Editions
- **Definition.** Exactly two editions, both subscriptions against the same single entitlement ledger. MAREA WEATHER Standard (WEATHER-STANDARD, verdict DEFINED) is the complete single-view weather product: the pilot geography and any additional declared area the licensed sources cover, home screen, saved locations within a defined allowance, wind, gusts, waves, swell/currents/tides/SST only where licensed, atmospheric conditions, timeline, source/model-run/valid/receipt time, freshness and missing-data states, attribution, and the legal caching that the rights allow. MAREA WEATHER Pro (WEATHER-PRO, verdict CONDITIONAL) adds only outcomes that require additional provider rights or additional processing: multi-model comparison, additional map layers where layer rights exist, route weather context, passage planning and weather windows, configurable notifications, historical comparison where licensed, a longer timeline/horizon where licensed, a larger saved-location and device allowance, and priority support. The Pro verdict is conditional on provider entitlements: any Pro capability whose right is not granted is shown as unavailable with a stated reason and is never sold silently. Standard must contain every provenance, freshness, attribution and limitation element; those are never edition-gated. No third tier exists.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §08 (editions); the frozen edition ids and amounts are governed by the programme brief (external to this repository; the brief is a programme document, not a repository file, and is therefore not cited as VERIFIED_REPO); HYPOTHESIS edition value split; OPEN — no cost or validation evidence exists (X-05, X-06).
- **Owner.** Product management (WEATHER) with commercial strategy.
- **Blockers / dependencies.** D-04, D-05, D-07, X-05.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F07 - Included items
- **Definition.** Intended included content per edition: access to the declared data coverage and forecast horizon for the licensed sources in the edition; the home screen; the declared number of sailing areas and saved marine locations; the timeline and per-variable display metadata; source identification, attribution and provenance record; the freshness, missing-data, stale-forecast and out-of-coverage states; bilingual marine terminology and the disclaimer set; the account and entitlement-ledger record; legally authorized caching of the licensed data; and the support entitlement of the edition. Pro adds the additional outcomes of §6.2 only where their provider rights exist. Intended exclusions, stated before purchase: charts and nautical charts; navigation, route execution and logbook (those belong to NAV); the customer's device and internet connection; any provider dataset whose right is not granted; official meteorological warnings as an official service; guarantees of accuracy, availability or fitness for a passage decision; installation labour, hardware and connectivity. No inclusion table, allowance and price beyond the frozen hypotheses exists.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §08 (included/excluded); VERIFIED_REPO docs/marea/products/WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md §4 and §12; OPEN — allowance numbers and edition inclusions (X-05); BLOCKED — provider rights NOT_GRANTED.
- **Owner.** Product management with commercial operations.
- **Blockers / dependencies.** D-04, D-05, D-07, D-10, X-05.
- **Commercial readiness.** dataRights = NOT_GRANTED.

#### F08 - Optional accessories
- **Definition.** WEATHER is software and has no physical accessory of its own. Intended optional commercial objects, described by function and never invented as a product name: the MAREA WEATHER Pro upgrade from Standard with a prorated credit; the NAV subscription, which remains a separate product and may include Standard-equivalent read access only where provider rights allow; a MAREA DISPLAY entitlement so the licensed WEATHER view can appear on a fixed helm screen where the device, the entitlement and the provider display rights all permit it; a MAREA HUB or compatible onboard source that supplies own-vessel observations, clearly marked as observations from the customer's own equipment and not as third-party data; and professional assistance with interpretation or passage planning, offered only as a service that does not constitute a meteorological guarantee. No accessory carries an invented MAREA name, no accessory price exists, and no optional object may be presented as included.
- **Evidence.** VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md (accessories are not families or editions); VERIFIED_REPO docs/marea/products/README.md §19 cross-product authority; OPEN — accessory commercial structure; BLOCKED — X-05, D-10.
- **Owner.** Product management with commercial strategy.
- **Blockers / dependencies.** D-05, D-10, X-05.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F09 - Integration
- **Definition.** WEATHER integration is bounded and evidence-based. It reads licensed forecast and observation datasets server-side through the source registry, and user-entered locations from the account. It supplies read-only forecast context to MAREA NAV (status PLANNED: no verified integration exists) and, where an entitlement and the provider's display right both permit, to MAREA DISPLAY (CONDITIONAL). It may supply read-only weather context to MAREA FLEET only if the provider agreement permits B2B operational use (CONDITIONAL). It may consume own-vessel observation values from a compatible MAREA HUB or instrument source and always labels them as own-vessel observations (CONDITIONAL). It never ingests or resells AIS-derived traffic data: D-09 is cited because any shared map/reporting context with FLEET is excluded from this product until AIS data redistribution is legally established. It does not steer, route autonomously, control any vessel system, or publish official warnings. No protocol or data compatibility is claimed until each integration is tested and recorded.
- **Evidence.** VERIFIED_REPO docs/marea/products/README.md §19 and brief §9 (frozen statuses); VERIFIED_REPO docs/marea/products/WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md §10; OPEN — no integration exists; BLOCKED — D-09, D-10.
- **Owner.** Integration owner (WEATHER Product Director) with engineering.
- **Blockers / dependencies.** D-09, D-10, P-08.
- **Commercial readiness.** engineering = NOT_VERIFIED.

#### F10 - Professional installation
- **Definition.** There is no installation of MAREA WEATHER, because it is a software service. The nearest professional service is a **guided setup**. The finished offer is a short, documented onboarding path: choose the home area, save the first locations, learn to read the freshness and provenance metadata, understand what the edition includes and what it does not, and subscribe only when the intended use is clear. Guided setup is included in the service as documentation and self-serve flow; a paid assisted-interpretation service may be offered later as a separate object and would never be described as installation, site survey or a meteorological guarantee. No installer network, no certification scheme and no installation price exist and none may be implied.
- **Evidence.** ASSUMPTION service design; VERIFIED_REPO docs/marea/products/README.md §6 F10; OPEN — no onboarding flow exists (P-08).
- **Owner.** Service operations with support.
- **Blockers / dependencies.** P-08, X-05.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F11 - Onboarding
- **Definition.** The first-use experience is a guided, verified setup, not an empty map. Delivery sequence: the customer declares a home sailing area from the declared coverage list; the service states which variables are available there, from which sources, at what resolution and horizon, and which are unavailable and why; the customer saves the first marine location, which immediately shows source, model run, valid time, receipt time, data type and age; a short guided reading explains the freshness states so a stale value is recognised; the customer confirms language preference (Spanish or English) and the terminology set; a provenance and licence page lists every provider used with its credit; and the account shows exactly which entitlement is active. If the area or variable is not licensed, the onboarding says so plainly instead of showing an empty or fabricated chart. No onboarding flow, screen or usability test exists.
- **Evidence.** OPEN — onboarding UX not built; ASSUMPTION sequence; VERIFIED_REPO docs/marea/products/README.md §6 F11 and §14; VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md §9.
- **Owner.** UX, content and localisation with support engineering.
- **Blockers / dependencies.** P-08, X-05.
- **Commercial readiness.** engineering = NOT_VERIFIED.

#### F12 - Licensing and subscriptions
- **Definition.** MAREA WEATHER is intended to be sold as a **time-limited consumer software subscription** per customer account, annual by default, renewed explicitly with the renewal date and amount stated before any charge. The subscription grants use of the service and of MAREA's own software, not ownership of any third-party dataset, and transfers no provider right. Rights in the underlying data remain with each provider under its own terms, as recorded in the companion annex. Entitlements are held in one MAREA account ledger: WEATHER standalone, or an included read access when NAV Pro includes the Standard-equivalent service, never both charged. Upgrade Standard to Pro applies a prorated credit; cancellation ends forecast access at the end of the period and never deletes user-owned saved locations within the retention policy; provider-licence loss produces an honest unavailable state with attribution retained. Grace period, payment-failure handling, data export and deletion are specified in the annex and remain OPEN in their exact durations. Billing and entitlement services are not implemented.
- **Evidence.** VERIFIED_REPO docs/marea/products/README.md §6 F12 and brief §10; VERIFIED_REPO docs/marea/products/WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md §10; OPEN/BLOCKED — no subscription service, no terms of service, no provider contract (WEATHER_SUBSCRIPTION_SERVICE = NOT_FOUND; D-10, X-05).
- **Owner.** Commercial strategy with legal.
- **Blockers / dependencies.** D-04, D-07, D-10, X-05.
- **Commercial readiness.** licensing = NOT_CLEARED.

#### F13 - Retail and partner pricing
- **Definition.** Internal price hypotheses only, recorded for planning and published nowhere: MAREA WEATHER Standard (WEATHER-STANDARD) EUR 49 per year, consumer subscription, a starting-price hypothesis; and MAREA WEATHER Pro (WEATHER-PRO) EUR 89 per year, consumer subscription, a hypothesis conditional on provider entitlements. Both are HYPOTHESIS_UNAPPROVED, VAT-inclusive consumer retail where stated, and neither is an offer, a discount, a pre-order or an orderable amount. No price exists for any add-on, data plan, assisted interpretation, extended support or partner volume terms; those are OPEN and require costed evidence. The cost framework that must support or refute these figures is in §7 and in the annex; it is deliberately not turned into a margin claim because no provider contract, API plan or channel term exists.
- **Evidence.** HYPOTHESIS — exactly the frozen amounts of brief §4; BLOCKED — X-05 (no provider contract, no API plan, no costed data budget), D-04, D-07, D-10; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §6.
- **Owner.** Commercial strategy and pricing with finance.
- **Blockers / dependencies.** D-04, D-07, D-10, X-05.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F14 - Direct and ongoing costs
- **Definition.** A costing framework with named inputs only, because no figure exists: provider data cost (per provider, per API plan, per call budget and per variable class); API and compute cost for ingestion, derivation, comparison and map tiles; storage and retention cost for cached grids, historical archives and provenance records; serving and egress cost; availability monitoring and incident handling; support cost per subscriber including provenance and licence questions; payment and billing fees, chargebacks and refunds; customer acquisition cost and trial cost; renewal and retention cost; localisation maintenance for Spanish and English terminology; legal cost for provider contracts, DPA and consumer terms; regional-expansion cost per additional geography (new provider, new rights, new validation). Contribution margin is deliberately not computed: presenting one would invent provider prices, plan volumes, support rates and churn. The structure is in §7.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md pricing and channel rules; ASSUMPTION on the cost categories; BLOCKED — D-10, X-05; OPEN — provider price evidence (Open-Meteo plan amounts were not retrievable on 2026-10-30).
- **Owner.** Finance and procurement with product management.
- **Blockers / dependencies.** D-04, D-05, D-07, D-10, X-05.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F15 - Channel economics
- **Definition.** Intended channel model: direct online sale by EMBARCARTE as the primary route, with an assisted-compatibility path through sailing schools, charter operators, clubs and marine electronics installers in Galicia and northern Portugal. Responsibility split: EMBARCARTE owns the product definition, the source registry, the provider relationships, the entitlement ledger, billing, support policy and the honest availability statement; a partner owns the local relationship and any interpretation service it chooses to sell, under its own responsibility and never as a MAREA meteorological guarantee. The market is entered through a declared-coverage check that ends in a subscription or an honest "not covered here" answer, never in an asserted compatibility. Partner margin, revenue share, referral fee and volume terms are OPEN; no percentage exists. A school or club using the product for several skippers is a customer use case, not a partnership.
- **Evidence.** VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md institutional routes; VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md §11; ASSUMPTION responsibility split; BLOCKED — X-05, X-06.
- **Owner.** Commercial development with service operations.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F16 - Competitor comparison
- **Definition.** No like-for-like verified comparator of MAREA WEATHER exists and no competitor has been tested against it. Two public anchors were retrieved from official pages on 2026-10-30 and are recorded only as category context, in a different product category from a licensed regional marine-weather service:
  - **PredictWind** (https://www.predictwind.com/pricing, checked 2026-10-30): Free USD 0; Basic USD 29/year; Standard USD 249/year; Professional USD 499/year, annual billing, taxes added at checkout, global forecast app/web plus an Offshore app, 11 forecast models, weather routing and departure planning from Standard, ocean and tidal currents and high-resolution routing in Professional. Currency USD.
  - **Windy premium** (https://www.windy.com/premium, checked 2026-10-30): the official page returned a client-rendered shell with no retrievable price or edition table; Windy premium pricing, currency, tax basis and edition contents are UNRESOLVED and are not quoted in this dossier.
  The existing repository benchmark also records Orca Plus EUR 49/year and Orca Smart Navigation EUR 149/year (https://help.getorca.com/en/articles/6541858-subscription-prices-and-functionality, check date 2026-10-30) as an established software alternative. These anchors establish that the consumer weather/navigation subscription band is already occupied and price-sensitive; they do NOT establish equivalence, price parity, coverage parity, model quality or an obtainable market. MAREA WEATHER competes on provenance, freshness honesty, transparent comparison and entitlement integrity, never on a claimed accuracy advantage.
- **Evidence.** VERIFIED_EXTERNAL PredictWind pricing page (2026-10-30); VERIFIED_EXTERNAL Windy premium page attempted, term UNRESOLVED (2026-10-30); VERIFIED_EXTERNAL Orca pricing via VERIFIED_REPO docs/marea/MARKET-BENCHMARKS.md (2026-10-30); ASSUMPTION on relevance; OPEN — no comparison test, no customer research (X-06).
- **Owner.** Commercial strategy.
- **Blockers / dependencies.** X-05, X-06, X-01.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F17 - Sales arguments
- **Definition.** Honest buyer arguments and the objection handling that goes with them. Arguments: every value shows its source, model run, valid time, receipt time and age, so the customer can see what they are looking at; the product distinguishes forecast, observation, history, derived, user-entered and unknown; a stale or missing value is labelled as such instead of being smoothed into a comfortable picture; multi-model comparison shows real disagreement instead of a fabricated consensus; the coverage and resolution are declared instead of implied; and weather bought with NAV is never billed twice. Objections and answers: "Is this more accurate than my free app?" — MAREA does not claim superior accuracy and no evaluation exists; the difference claimed is provenance and honesty, not skill. "Does it replace official warnings?" — no, it is not an official warning authority and the customer must use official sources. "Does it work offline?" — only where a licence permits offline presentation, and an offline surface is labelled not current. "Can I see the whole Atlantic?" — no: coverage is declared per source and per area, with pilot coverage in Galicia, Rías Baixas and Atlantic Portugal. "Is it guaranteed for my passage?" — no: forecasts are probabilistic and may differ from actual local conditions. "What does Pro add?" — comparison, route context, passage planning, weather windows, notifications and history where licensed. "How much?" — only unapproved internal hypotheses exist and nothing is on sale. No comparative superiority claim against a named competitor is permitted.
- **Evidence.** ASSUMPTION — argument ranking; VERIFIED_REPO docs/marea/products/README.md §14 and brief §14; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §2–§6; OPEN — no sales test, no customer evidence (X-06).
- **Owner.** Product marketing with sales enablement.
- **Blockers / dependencies.** X-01, X-06, P-08.
- **Commercial readiness.** brandPublication = NOT_GRANTED.

#### F18 - FAQ
- **Definition.** The pre-sale and post-sale questions the product must answer truthfully. Where does the data come from? From licensed providers identified on the page and in every value; the current provider set is not granted for commercial use, so no launch claim is made. How old is this forecast? Every value shows model run, valid time, receipt time and age, and an aging, stale or expired value is labelled. Why do two models disagree? Because they are different models; the product shows the disagreement and does not average it into a false consensus. What happens when a provider is down? The surface shows an unavailable state with the last successful receipt and keeps the attribution. Do you show official warnings? No: MAREA WEATHER is not an official warning authority and does not publish official warnings. Can I use it offline? Only where a licence permits it; otherwise the offline state says the value is not current. Which areas are covered? The declared pilot geography, with per-source coverage and resolution shown; anything else is out of coverage. Is it a meteorological guarantee? No. Is it certified? No certification exists. Does buying WEATHER with NAV cost twice? No: one entitlement ledger, never billed twice. Can I export my data? Saved locations and preferences are user-owned and exportable within the retention policy. What happens if I cancel? Access ends at the end of the period, the renewal date is shown beforehand, and user-owned records follow the retention and export policy. Can I get a forecast for my exact position? Only within the declared grid and resolution; the product does not claim point precision finer than the source.
- **Evidence.** Derived from this dossier and the companion annex; OPEN for the answers that depend on unbuilt capability and unresolved terms; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §4 and §6.
- **Owner.** Product management with content and support.
- **Blockers / dependencies.** D-04, D-07, D-10, X-02 (legal identity for terms before sale).
- **Commercial readiness.** brandPublication = NOT_GRANTED.

#### F19 - Warranty and support
- **Definition.** Intended after-sales position: the statutory consumer guarantee under Spanish and EU law, plus contractual terms that must be written before any sale. Support covers how to read provenance and freshness, coverage questions, entitlement and billing questions, how to report a wrong or stale value, and how to obtain a provenance record for a decision that was taken. Support is explicitly **not** an interpretation guarantee, not a meteorological service and not an emergency channel; it cannot validate a passage decision and never implies that MAREA watched the weather for the customer. Response-time commitments, availability commitments, refund policy and the treatment of an unavailable provider are OPEN. No SLA figure exists and none may be stated: service levels are provider targets and internal intentions, not contractual promises. The seller's legal identity is required for any warranty or terms text and is currently absent.
- **Evidence.** OPEN — warranty terms, support levels, refund policy; BLOCKED — X-02 (legal identity), X-05; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §2 Class C and §5.
- **Owner.** Customer support with legal.
- **Blockers / dependencies.** X-02, X-05.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F20 - Bilingual product page copy
- **Definition.** The customer-facing Spanish and English copy lives in docs/marea/products/copy/weather.es.md and docs/marea/products/copy/weather.en.md and is part of this deliverable. Both files use the exact 24 numbered headings of copy/nav.es.md and copy/nav.en.md, with no h3 subheadings and identical heading counts, followed by an unnumbered approved-disclaimers section and the internal status line. The copy states: that forecasts are probabilistic and never guarantees; that no accuracy percentage or superiority is claimed; that every value shows source and timestamp; that coverage is declared and limited to licensed sources; that some datasets may be unavailable because rights are not granted; that offline, historical and notification features depend on rights; that WEATHER and NAV share one entitlement and are never billed twice; the WEATHER limitation statement, the weather disclaimer, the navigation/instruments disclaimer and the brand attribution verbatim. It contains no currency amount, no purchase call to action, no stock or availability statement, no certification and no comparative superiority. It is internal draft while brandPublication = NOT_GRANTED and availability = NOT_FOR_SALE.
- **Evidence.** VERIFIED_REPO docs/marea/products/README.md §22 and brief §8; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §2–§6; VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md §8–§11; OPEN — publication blocked by X-01 and X-03.
- **Owner.** UX, content and localisation with product review (facts).
- **Blockers / dependencies.** X-01, X-03.
- **Commercial readiness.** brandPublication = NOT_GRANTED.

#### F21 - Cross-sells
- **Definition.** Intended commercial path: MAREA NAV is the natural companion because planning a passage needs both the navigation workspace and the weather decision, and buying them together must never double-charge the weather entitlement (NAV Pro may include Standard-equivalent read access only where provider rights allow; CONDITIONAL). MAREA DISPLAY can present the licensed weather view at the helm where the device, the entitlement and the provider display right permit (CONDITIONAL). MAREA HUB or compatible instruments can supply own-vessel observations that the customer sees alongside forecasts, clearly labelled as observations (CONDITIONAL). MAREA FLEET may consume read-only weather context only if the provider agreement permits B2B operational use (CONDITIONAL); buying WEATHER never creates a fleet tenancy. The MAREA CRUISE and MAREA START bundles are ecosystem context only and are not purchasable here; no bundle price is stated. Charts, hardware, connectivity and professional interpretation are separate commercial objects. Every cross-sell must state that no product is presumed included in another and that none is purchasable today.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md bundle architecture; VERIFIED_REPO docs/marea/products/README.md §19 and brief §9; OPEN — bundle content, price and publication belong to MC-08.
- **Owner.** Commercial product management.
- **Blockers / dependencies.** X-01, X-05, D-10.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F22 - Retention strategy
- **Definition.** Retention is intended to come from a service the customer values, not from lock-in: forecasts that are easier to trust because the provenance and age are visible; saved locations and areas that become the customer's own workspace; a comparison view that saves the weekly "which model do I believe" argument; a weather-window view that becomes part of the passage routine; and honest renewal that states the renewal date and price before charging. The customer can export saved locations and preferences and leave without losing access to historical provenance records that belong to them within the retention policy; data that MAREA is not licensed to keep is not retained. Renewal reminders go to the account owner by email and in-product; cancellation is available in-product; no dark pattern, fake urgency, hidden renewal or "lifetime" language is permitted. Reactivation, post-cancellation retention and deletion rules are OPEN.
- **Evidence.** HYPOTHESIS — retention design unvalidated; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §6 and BRAND-VOICE-ES-EN.md §10; OPEN — no subscription or customer-success system exists (WEATHER_SUBSCRIPTION_SERVICE = NOT_FOUND).
- **Owner.** Customer success with product management.
- **Blockers / dependencies.** X-02, X-05, D-10.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F23 - Success metrics
- **Definition.** A metric framework to be defined and measured, with no invented targets: commercial — trial-to-paid conversion, annual renewal rate, churn reason mix, upgrade rate from Standard to Pro, entitlement sharing with NAV (how many customers are correctly not double-billed) and average revenue per account; activation — home area declared, first location saved, provenance panel viewed, first comparison used, first weather window created; quality and trust — share of displayed values carrying complete metadata (source, model run, valid time, receipt time, age, data type, licence), count of stale or expired values correctly labelled, count of unavailable states with a stated reason, provider-error rate, cache hit ratio and provenance-record exports; cost — provider cost per active account, cost per variable class, support contacts per hundred accounts, legal and contract cost; coverage — share of declared pilot area served by at least one licensed source, and per-variable availability. Baselines and targets are OPEN; stating a number now would be invented.
- **Evidence.** OPEN — no service, subscription or measurement exists; ASSUMPTION on the metric set derived from VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §08 KPIs (conversion, renewal, forecast usage, support/data costs, coverage quality); BLOCKED — X-05, X-06.
- **Owner.** Product operations with finance.
- **Blockers / dependencies.** X-05, X-06, P-08.
- **Commercial readiness.** engineering = NOT_VERIFIED.

#### F24 - End-to-end acceptance
- **Definition.** Acceptance means the complete product demonstrably works end to end: the thirty-five WEATHER-AC scenarios of §9 are executed and recorded; a real licensed source (or an explicitly labelled test fixture standing in for one) has been registered with declared resolution, cycle and horizon; a value has been ingested and displayed with its six timestamps, data type, units, method, licence and age; a stale value has been proven to become STALE and a beyond-horizon value EXPIRED rather than current; a provider outage has been shown as unavailable with attribution retained; a second model has been compared without any consensus or ranking claim; a route has been sampled and labelled advisory; a weather window has been produced and labelled advisory; a notification has been configured and its delivery limits shown; the entitlement ledger has been proven not to double-bill NAV and WEATHER; an expired entitlement has been proven to produce unavailable, not frozen, forecasts; caching has been proven to occur only where a right exists; export, cancellation and retention have been exercised; and ES/EN terminology parity has been reviewed. Documentation alone, a mock-up or a fixture does not constitute acceptance of a licensed production pipeline. No scenario is claimed as passing and every scenario is NOT_EXECUTED.
- **Evidence.** OPEN/BLOCKED — scenarios defined in §9; VERIFIED_REPO docs/marea/products/WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md §5–§9; the MC-08-WEATHER gate.
- **Owner.** Quality assurance with engineering and compliance; independent verification by a reviewer who is not the author.
- **Blockers / dependencies.** D-04, D-05, D-07, D-10, P-08, P-10, X-05.
- **Commercial readiness.** compliance = NOT_STARTED.

---

## 4. F04 capability-domain register — the 44 mandatory final domains

This register is the substantive expansion of F04. Each domain is part of the finished commercial experience; the evidence state says what is actually established today. OPEN means the experience is defined but not evidenced; BLOCKED names the external condition; NOT_GRANTED means the required data right is absent. No domain may be dropped from the final product because it is currently unevidenced, and no domain may be presented as working because it is specified.

### 4.1 The six data types (binding vocabulary)

Every displayed value carries exactly one data type. It is the central rule that prevents a forecast being read as an observation or a derived number being read as a measurement.

| Data type | Meaning | May never be shown as |
| --- | --- | --- |
| FORECAST | Output of a numerical or statistical prediction valid at a future validTime | an observation, a historical value, a guarantee |
| OBSERVATION | A value measured at a time and place by an instrument or station | a forecast, a model output |
| HISTORICAL | A past forecast, reanalysis or archived value shown for comparison | a current forecast |
| DERIVED | A value MAREA computed from licensed inputs (route sampling, weather window, spread, index, mean) | a provider forecast or an observation |
| USER_ENTERED | Data the customer supplied (saved location name, personal threshold) | provider data |
| UNKNOWN | A value whose origin cannot be established | any of the above; such a value is withheld or explicitly marked unknown |

### 4.2 The register

| # | Domain | What the finished product does | Data type | Required right / external dependency | Evidence state |
| ---: | --- | --- | --- | --- | --- |
| 01 | Home screen | Answers "what is the weather doing where I sail, how old is it and where did it come from" for the declared home area and saved locations, with freshness and source visible before any value. | FORECAST / OBSERVATION | Licensed sources for the home area; source registry. | OPEN; BLOCKED D-10, P-08 |
| 02 | User-selected sailing areas | The customer selects one or more declared sailing areas from a published list; the service states exactly what is covered there, from which source, at what resolution and horizon, and what is not covered. | USER_ENTERED + metadata | Declared coverage per source; provider geographic scope. | OPEN; BLOCKED D-07, D-10 |
| 03 | Saved marine locations | Named marine locations (harbour entrance, anchorage, club, waypoint) stored in the account, exportable, with per-location variable availability and freshness. | USER_ENTERED | Account service and retention policy. | OPEN; BLOCKED X-05 |
| 04 | Wind | Sustained wind speed and true direction, with source, model, model run, valid time, receipt time, age and resolution; sustained wind is never conflated with gust. | FORECAST / OBSERVATION | Wind data right; Open-Meteo paid, Copernicus, MeteoGalicia, AEMET NWP. | NOT_GRANTED; D-04, D-07 |
| 05 | Gusts | Gust value shown separately from sustained wind, and a measured gust shown as OBSERVATION rather than forecast. | FORECAST / OBSERVATION | Gust-bearing source; only where the licensed product publishes gust. | NOT_GRANTED; D-04, D-07 |
| 06 | Wave height | Significant wave height with unit, source, model run, valid time and declared spatial resolution; never presented as a measured sea state. | FORECAST / OBSERVATION | Wave data right; Copernicus IBI waves, Open-Meteo marine (paid). | NOT_GRANTED; D-04, D-10 |
| 07 | Wave direction | Wave direction with the convention stated (direction from or towards) and the model identified. | FORECAST | Wave data right. | NOT_GRANTED; D-04, D-10 |
| 08 | Wave period | Wave period with the definition stated (peak or mean) and the model identified. | FORECAST | Wave data right. | NOT_GRANTED; D-04, D-10 |
| 09 | Swell where available | Swell height, direction and period are offered only where a licensed product documents a swell partition; otherwise the domain resolves to SWELL = NOT_AVAILABLE with a stated reason. Never synthesised from total sea state. | FORECAST | Swell partition right. | UNRESOLVED; D-04, D-07 |
| 10 | Currents | Surface current speed and direction from a licensed model or HF-radar observation, labelled FORECAST or OBSERVATION accordingly. | FORECAST / OBSERVATION | Current data right; Copernicus IBI, Puertos del Estado HF radar. | NOT_GRANTED; D-07, D-10 |
| 11 | Tides | Tide height only with station or model identifier, datum, prediction basis, source, valid time and age; an official tide table is never claimed without a written right. | FORECAST (predicted) | Tide provider right; MeteoGalicia RSS, Puertos, IHM, IH Portugal. | UNRESOLVED; D-07, D-10 |
| 12 | Sea surface temperature where licensed | SST with source, product and time; an observation is labelled as observation and a model value as forecast. | FORECAST / OBSERVATION | SST right; Copernicus IBI, Open-Meteo marine (paid). | NOT_GRANTED; D-04, D-10 |
| 13 | Atmospheric conditions | Air temperature, pressure at mean sea level, cloud cover and precipitation, each with unit, source and timestamp. | FORECAST / OBSERVATION | Atmospheric data right; Open-Meteo paid, AEMET OpenData, MeteoGalicia. | NOT_GRANTED; D-04, D-07 |
| 14 | Map layers | Raster or vector layers only where a tile/layer licence exists; an unlicensed layer is absent with a stated reason and is never proxied from an unlicensed endpoint. | DERIVED (rendered) | Layer/tile licence; OpenWeather Weather Maps 2.0. | BLOCKED D-05 |
| 15 | Timelines | A time axis per variable aligned on validTime, with model run and receipt time available for every step, and with horizon boundaries marked. | FORECAST | Licensed horizon per source. | OPEN; BLOCKED D-10 |
| 16 | Multi-model comparison | Side-by-side per-model values with individual attribution and a labelled spread; no consensus, no average presented as a forecast, no "best model" claim. | FORECAST + DERIVED (spread) | Display right for each compared model. | NOT_GRANTED; D-04, D-07 |
| 17 | Source identification | Provider, product, model and dataset version shown for every value, and a provenance page listing every source and licence. | metadata | Every provider naming and credit rules. | OPEN; BLOCKED D-10 |
| 18 | Model run time | The model cycle shown and never substituted by receipt time; an old run relative to validTime is flagged. | metadata | Provider metadata per variable. | OPEN; BLOCKED D-10 |
| 19 | Valid time | The instant or interval the value describes, shown always; a value without validTime is not rendered. | metadata | Provider metadata. | OPEN; BLOCKED D-10 |
| 20 | Receipt time | When MAREA received the response, shown separately and never used to imply freshness of the model. | metadata | Server clock and ingestion record. | OPEN; BLOCKED D-10 |
| 21 | Horizon | The declared forecast horizon per source and variable, shown as a boundary; nothing beyond it is presented as forecast. | metadata + FORECAST | Provider-declared horizon. | OPEN; BLOCKED D-10 |
| 22 | Geographic coverage | A declared coverage statement and map per source; a coordinate outside it returns OUT_OF_COVERAGE, never a neighbour substitution without notice. | metadata | Provider geographic scope. | OPEN; BLOCKED D-07, D-10 |
| 23 | Spatial resolution | The declared model grid or product resolution per source, labelled as the source resolution and never presented as point precision. | metadata | Provider documentation. | OPEN; BLOCKED D-10 |
| 24 | Temporal resolution | The declared time step per source and variable. | metadata | Provider documentation. | OPEN; BLOCKED D-10 |
| 25 | Attribution | The provider required credit and DOI/citation rendered on the surface where the data appears and on the provenance page, verbatim. | metadata | Credit strings per provider; see annex §11. | OPEN; BLOCKED D-10 |
| 26 | Data quality / status | A status model (current, aging, stale, expired, unavailable, out of coverage) plus provider quality flags where published, never invented. | DERIVED (status) | Defined freshness rules and provider status metadata. | OPEN |
| 27 | Missing data | Missing values render as NO_DATA, never zero-filled; partial variable sets are shown partially with the reason. | metadata | Defined missing-data rules. | OPEN |
| 28 | Stale forecast | Staleness is computed from the declared cycle and shown; a stale or expired forecast is never styled or described as current. | DERIVED (status) | Freshness rules and source registry. | OPEN |
| 29 | Confidence / uncertainty where supported | Confidence or dispersion is shown only where a provider publishes an ensemble or uncertainty product, with the provider meaning; otherwise the field reads NOT_PROVIDED. | FORECAST (provider ensemble) | Ensemble/uncertainty provider product. | UNRESOLVED; D-10 |
| 30 | Historical comparison where licensed | Past forecasts or reanalysis shown for comparison only where an archive right exists, with the archive provider, period and method stated. | HISTORICAL | Historical/archive right. | NOT_GRANTED; D-04, D-10 |
| 31 | Route weather context | Forecast values sampled along a customer route, labelled DERIVED and advisory, with the sampling method and each contributing model stated; context only, never a guarantee and never an automatic routing decision. | DERIVED | Derived-output right for each contributing model. | NOT_GRANTED; D-04, D-07 |
| 32 | Passage planning | A planning workspace that organises departure window, route context and weather windows against the customer own thresholds, all labelled advisory. | DERIVED + USER_ENTERED | Derived-output right; account service. | NOT_GRANTED; D-10 |
| 33 | Weather windows | A computed window where the forecast stays inside customer-declared limits, with the contributing models, threshold, period and uncertainty limits stated; explicitly advisory auxiliary computation, never a guarantee. | DERIVED | Derived-output right; threshold inputs from the customer. | NOT_GRANTED; D-04, D-07 |
| 34 | Configurable notifications | Customer rules on saved locations and windows, delivered through a notification service, with delivery limits and provider dependence stated; never an official warning and never a guaranteed immediate alert. | DERIVED (rule) | Notification service, provider terms, consumer consent. | NOT_GRANTED; D-05, X-05 |
| 35 | Account and saved locations | One account with the entitlement ledger, saved areas and locations, language preference, provenance record and export/delete controls. | USER_ENTERED | Account service and retention policy. | OPEN; BLOCKED X-05 |
| 36 | NAV integration | Read-only weather context supplied to MAREA NAV; status PLANNED. No charts, no logbook and no navigation execution inside WEATHER. | FORECAST (consumed) | NAV integration contract and provider display right. | PLANNED; D-10 |
| 37 | Entitlement sharing | One ledger; NAV Pro may include Standard-equivalent read access only where provider rights allow; prorated upgrade; never billed twice. | metadata | Billing/entitlement service and provider subscription compatibility. | NOT_GRANTED; D-10, X-05 |
| 38 | Legally authorized caching | Server-side caching only where the provider terms permit it, with bounded TTL, attribution and purge on licence loss. | metadata | Caching right per provider. | NOT_GRANTED; D-04, D-07, D-10 |
| 39 | Offline presentation where rights allow | Offline only where a written right exists; an offline surface states the last receipt time and that the value is not current. No right exists today. | FORECAST (cached) | Offline right per provider. | NOT_GRANTED; D-10 |
| 40 | Usage limits | The customer plan limits and the MAREA provider-call budget are stated; rate-limit exhaustion shows a budget state and serves only aged cached values. | metadata | Plan definitions and provider quotas. | OPEN; BLOCKED D-04, D-05 |
| 41 | Provider outage handling | An outage is shown as unavailable with the last successful receipt time, the provider named and attribution retained; no silent substitution of another source. | metadata | Availability monitoring and fallback policy. | OPEN |
| 42 | Support | Provenance and freshness questions, coverage questions, entitlement and billing questions, and a provenance-record export for a decision already taken; never a meteorological interpretation guarantee and never an emergency channel. | metadata | Support process and legal identity. | OPEN; BLOCKED X-02 |
| 43 | Renewal and cancellation | Explicit renewal date and amount before charge, cancellation in-product, prorated upgrade, export and retention rules stated, expired entitlement produces unavailable rather than frozen forecasts. | metadata | Billing service and consumer terms. | OPEN; BLOCKED X-02, X-05 |
| 44 | Bilingual marine terminology | The same facts in Spanish (Spain) and natural international English: marine terms such as swell, gust, significant wave height, tide datum and current are defined and used consistently on both sides. | metadata | Terminology glossary and localisation review. | OPEN |

### 4.3 Coverage check

The register is complete only if each of the 44 domains resolves to a **declared coverage state** for the customer's area, rather than to an implied global availability. The rule is: no domain is shown as available merely because a source exists somewhere; it is shown as available only where the licensed source's declared box, declared resolution and declared horizon cover that coordinate and that variable.

**Declared coverage per variable class.** The product must state, per variable and per source, the coverage it can actually deliver in the pilot geography, and the limitation the customer sees. Where a source does not publish a variable, the domain resolves to NOT_AVAILABLE rather than being inferred from a neighbouring variable.

| Variable class | Declared coverage the product must show | Declared limitation shown with the value | Outside coverage behaviour |
| --- | --- | --- | --- |
| Wind and gusts | Source box within the pilot geography, declared grid resolution, declared time step, declared horizon | Model grid, not a local measurement; no point precision; upstream model named | OUT_OF_COVERAGE with the source box stated |
| Wave height, direction and period | Regional wave product box and declared resolution | Significant wave height is a statistical parameter, not a measured sea state; period definition stated | OUT_OF_COVERAGE; no substitution from a global model without a visible label |
| Swell partition | Only where the source documents a partition, with the same box and resolution | Partition definition and availability vary by product | NOT_AVAILABLE_FROM_SOURCE when the licence or product does not publish it |
| Currents | Model box or HF-radar footprint, declared coverage and representative depth | Model current is not a local measurement; HF radar has its own footprint and quality flags | OUT_OF_COVERAGE outside the footprint |
| Tides | Declared station or model, datum and prediction basis | Prediction basis and datum; not an official tide table | NOT_AVAILABLE for an unregistered station; never interpolated from a distant port |
| Sea surface temperature | Declared product box and resolution | Modelled or observed, labelled; not a local thermometer | OUT_OF_COVERAGE |
| Atmospheric conditions | Declared model box, resolution and horizon | Model value, not a station observation unless labelled OBSERVATION | OUT_OF_COVERAGE |
| Map layers | Layer licence scope and tile coverage | Rendered from a licensed layer, not a nautical chart | Layer absent with a stated reason |
| Contextual bathymetry | EMODnet coverage for the area | Context only, never a chart, never navigation-grade | Layer absent, stated |
| History and notifications | Declared archive period or rule scope | Archive period and method; delivery limits | Feature unavailable with reason |

**Coverage limitations that must be stated to the customer.** Per-source resolution and horizon; regional rather than global scope; the difference between a model grid value and a local measurement; the fact that a product may publish one variable and not another; temporal gaps in a provider's update cycle; and the fact that provider coverage, resolution and horizon may change with a new product version and must then be re-declared.

**What happens outside coverage.** A coordinate outside a source's declared box returns OUT_OF_COVERAGE with the box and the source named. A variable outside the declared product returns NOT_AVAILABLE_FROM_SOURCE with the source named. A time beyond the declared horizon returns EXPIRED. The product never substitutes a nearer grid point, a different model, a coarser fallback or a climatological average without a visible statement of exactly what was substituted; where no honest substitute exists, the surface stays empty with a reason instead of showing a plausible-looking value.

**Coverage check of this register.** All 44 domains of the master requirement set are present: home screen (01), user-selected sailing areas (02), saved marine locations (03), wind (04), gusts (05), wave height (06), wave direction (07), wave period (08), swell (09), currents (10), tides (11), sea surface temperature (12), atmospheric conditions (13), map layers (14), timelines (15), multi-model comparison (16), source identification (17), model run time (18), valid time (19), receipt time (20), horizon (21), geographic coverage (22), spatial resolution (23), temporal resolution (24), attribution (25), data quality/status (26), missing data (27), stale forecast (28), confidence/uncertainty (29), historical comparison (30), route weather context (31), passage planning (32), weather windows (33), configurable notifications (34), account and saved locations (35), NAV integration (36), entitlement sharing (37), legally authorized caching (38), offline presentation (39), usage limits (40), provider outage handling (41), support (42), renewal/cancellation (43), bilingual marine terminology (44). The "wave height / direction / period" requirement is enumerated as three domains (06–08) because each has its own definition, unit and limitation; that is the counting basis for 44. Domains whose data type is FORECAST or OBSERVATION and that depend on a provider right are all NOT_GRANTED, UNRESOLVED or BLOCKED; no domain is marked as working. Domains that depend on MAREA-built services are OPEN; none is implemented.

### 4.4 Per-variable display metadata

Any variable shown to a customer must carry this block. It is the operational form of §4.1 and of the annex §5, and it is the same block in Standard and in Pro: provenance is never an edition feature.

| Metadata field | Content | Rule |
| --- | --- | --- |
| source | Provider, product and dataset version | Required; an unknown source means UNKNOWN, not a guess |
| model | Model name and, in a comparison view, the individual model | Required for FORECAST |
| units | Canonical unit with the display unit | Required; knots for wind, metres for waves, degrees for direction, degrees Celsius for temperature, hectopascals for pressure, metres for tide |
| validTime | The instant or interval the value describes | Required; no validTime, no render |
| dataType | FORECAST / OBSERVATION / HISTORICAL / DERIVED / USER_ENTERED / UNKNOWN | Required |
| age | now minus validTime or now minus observationTime, labelled which | Required; no age, no render as a forecast |
| method | Model, ensemble, observation, interpolation or derivation method | Required; interpolation declared if used |
| license | The rights classification and the attribution string for that provider | Required |
| limitations | The declaration of that variable's limits (resolution, horizon, not a local measurement, not navigation-grade, prediction basis for tides) | Required |
| freshnessState | CURRENT / AGING / STALE / EXPIRED / UNAVAILABLE / OUT_OF_COVERAGE | Required |

**Rendering rule.** A value that cannot fill all ten fields is not rendered as a forecast. It is either withheld or shown in an explicitly incomplete state (for example UNKNOWN with the missing field named). The metadata travels with the value into every consumer surface, including the NAV context view and the DISPLAY presentation, so a downstream screen cannot strip the provenance and leave a bare number.

---

## 5. Pilot geography, declared coverage and the honest expansion statement

### 5.1 The pilot geography

The intended pilot geography is **Galicia (including the Rías Baixas), the adjacent Atlantic waters of the Iberian northwest, and Atlantic Portugal**. It is chosen because it is a coherent cruising area with meaningful local variability, because several candidate sources cover it regionally, and because it is the programme's declared first market. It is a planning scope, not a granted coverage: WEATHER_PROVIDER_RIGHTS = NOT_GRANTED and no source is licensed for the product yet. The pilot area is a deliberate boundary: the product must not imply that the same experience extends automatically to the Mediterranean, the Bay of Biscay outside the declared box, the Atlantic islands or any other coast.

### 5.2 Declared coverage per variable and per source

For each sailing area in the pilot geography the product must publish, and the customer must be able to inspect, a coverage statement per variable: which source covers it, at what declared spatial resolution, at what declared temporal resolution, out to what declared horizon, and with what declared update cycle. The statement is data, not marketing: it is stored in the source registry and rendered next to the value. Where several sources cover the same variable, the coverage statement is per source, because a comparison between a coarse and a fine source is only honest if both resolutions are visible.

The declaration must also cover the negative case explicitly: variables that the licensed set does not provide in that area, areas inside the pilot region but outside a source's box, and periods beyond a source's horizon. If a variable is not available, the customer sees which variable, which source was expected and why it is not available; the surface does not silently omit it.

### 5.3 Expansion limits and the honest expansion statement

The intended expansion is to additional declared coastal regions, each added only when three things exist together: a provider right for that region, a validated source registry entry with declared resolution, cycle and horizon, and a coverage statement reviewed against the product's own variable list. Expansion is therefore a rights-and-evidence process, not a marketing decision.

This dossier makes **no** claim of exclusive data, proprietary model, official status, measured local accuracy, superior resolution, guaranteed availability, continuous coverage, global coverage or market exclusivity anywhere, in the pilot area or elsewhere. Regional high-resolution sources such as MeteoGalicia and Puertos del Estado are recorded as UNRESOLVED and are not presented as an advantage until their terms are obtained. No expansion date, no target market share and no coverage percentage is stated, because none is evidenced.

---

## 6. Edition architecture — MAREA WEATHER Standard and MAREA WEATHER Pro

### 6.1 Verdicts

| Edition id | Display name | Verdict | Hypothesis | Amount | Period / basis | State |
| --- | --- | --- | --- | ---: | --- | --- |
| WEATHER-STANDARD | MAREA WEATHER Standard | DEFINED | starting price | 49 | YEAR, consumer subscription, VAT-inclusive consumer retail where stated | HYPOTHESIS_UNAPPROVED |
| WEATHER-PRO | MAREA WEATHER Pro | CONDITIONAL | multi-model comparison, advanced layers, route context, alerts; conditional on provider entitlements | 89 | YEAR, consumer subscription | HYPOTHESIS_UNAPPROVED |

Both editions sit on the same single entitlement ledger. No third edition exists and no bundle price is stated here. The Pro verdict is CONDITIONAL because several of its outcomes are impossible without provider grants that do not exist; the edition is nevertheless fully defined so that the commercial conversation, the cost framework and the acceptance scenarios can be completed.

### 6.2 Outcome-based differentiation and the provider-rights gate

The difference between editions is a **customer outcome**, and every Pro outcome has an explicit gate. Differentiation is never a longer feature list for its own sake; if an outcome cannot be delivered lawfully, it is not sold.

| Pro outcome | What the customer can do that Standard cannot | Gate |
| --- | --- | --- |
| Multi-model comparison | See two or more licensed models side by side with their spread, instead of a single view | Display right for each compared model (D-04, D-07) |
| Additional map layers | See weather layers on the map where a layer licence exists | Layer/tile licence (D-05) |
| Route weather context | Sample forecast along a route and read it as advisory context | Derived-output right (D-04, D-07, D-10) |
| Passage planning and weather windows | Organise a departure around customer-declared limits and a computed window | Derived-output right; account service |
| Configurable notifications | Be told when a saved location or window meets a rule | Notification service plus provider and consumer terms |
| Historical comparison | Compare today's forecast with a licensed past forecast or archive | Archive right (D-10) |
| Longer timeline or horizon | Look further out where the licensed source declares a longer horizon | Provider-declared horizon |
| Larger allowances | More saved locations and more active devices | Defined limits (OPEN) |
| Priority support | A defined support route with stated response expectations | Support policy (OPEN) |

**Provider-rights gate (binding).** If a Pro outcome's right is not granted, the outcome is **not sold and not shown as a teaser**. The product shows the capability as unavailable with a plain reason, and the customer pays only for what the licence supports. Selling Pro while relying on an ungranted dataset would be a false commercial promise; it is prohibited regardless of the price label. The same gate applies to a Standard capability whose right lapses: the entitlement remains, the honest unavailable state appears, and attribution is retained rather than the feature being quietly replaced.

### 6.3 What Standard must always include and is never edition-gated

Never edition-gated, and never withheld to create an upsell: source identification; model run time, valid time and receipt time; per-variable age; the six data-type labels; the freshness state model; missing-data and out-of-coverage behaviour; attribution and licence text; the disclaimer set and the limitation statement; the honest unavailable state during a provider outage; the ability to export the customer's own saved locations and preferences; and the statement that forecasts are not guarantees. These are safety-relevant to a decision about going to sea, so they belong to the cheapest edition and to every future edition: an edition that removed them would be selling a misleading product rather than a cheaper one.

---

## 7. Pricing and cost framework for the frozen hypotheses

### 7.1 The two frozen hypotheses

| Edition | Amount | Period / basis | State | What it is never |
| --- | ---: | --- | --- | --- |
| MAREA WEATHER Standard (WEATHER-STANDARD) | 49 | YEAR, consumer subscription, VAT-inclusive consumer retail where stated | HYPOTHESIS_UNAPPROVED, starting price | an offer, a discount, a reservation, a pre-order, an orderable amount, an inclusive quotation |
| MAREA WEATHER Pro (WEATHER-PRO) | 89 | YEAR, consumer subscription | HYPOTHESIS_UNAPPROVED | as above; and conditional on provider entitlements, so its scope may reduce |

No other MAREA amount is permitted in this dossier. The two figures are planning hypotheses whose purpose is to force a cost conversation, not to describe a market price. They appear in no customer-facing copy.

### 7.2 Named cost inputs (no invented provider contracts)

Every line is an input that must be quoted before any margin statement. None exists today.

| Cost line | What it is | Status |
| --- | --- | --- |
| Provider data subscription per provider | The commercial tier for each licensed forecast/ocean source used by the edition, with its call budget and term | OPEN — no quote; Open-Meteo plan amounts not retrievable on 2026-10-30 |
| Provider tile/layer subscription | The separate tile SKU for map layers | BLOCKED — D-05 |
| Tide/current provider cost | Per-station or per-region tide and current licence | UNRESOLVED — no terms retrieved |
| Ingestion and compute | Fetching, decoding, re-gridding to the declared product grid, derivation of comparisons and windows | ASSUMPTION categories only |
| Storage | Cached grids, provenance records, historical archive where licensed | ASSUMPTION; archive BLOCKED |
| Serving and egress | Map/API serving to web and mobile clients | ASSUMPTION |
| Availability monitoring and on-call | Detecting provider outage and labelling unavailable states | ASSUMPTION |
| Support | Provenance, coverage, entitlement and billing questions per account | ASSUMPTION |
| Payment and billing | Payment fees, chargebacks, refunds, dunning | ASSUMPTION; billing service NOT_FOUND |
| Customer acquisition | Marketing, trial cost, partner referral | OPEN — no data |
| Renewal and retention | Reminder, win-back, upgrade to Pro | OPEN — no data |
| Localisation maintenance | Spanish/English marine terminology glossary and review | ASSUMPTION |
| Legal and compliance | Provider contracts, DPA, consumer terms, disclaimers | BLOCKED — X-02 legal identity |
| Regional expansion | New provider, new rights, new source validation per added geography | OPEN |

### 7.3 Cost-per-variable attribution and margin sensitivity, symbolic only

Cost-per-variable attribution is the only honest way to test the hypotheses, because a weather product's cost is driven by which variables it offers and how often it refreshes them — not by user count alone.

Symbolic framework (no numbers are evaluated here; evaluating them would invent provider prices):

- Cost per variable class V = (call volume for V × price per call for V) + (derivation compute for V) + (storage for V) + (share of provider subscription fixed fee).
- Call volume for V = active accounts in area A × refreshes per account per period × variables per refresh.
- Contribution per subscription = subscription amount net of VAT − variable cost share − serving cost − support cost − payment fees − acquisition cost amortised over the expected subscription life.
- Sensitivity: the hypotheses only survive if the sum of per-variable costs for the Standard variable set, at the declared refresh rate and declared account volume, stays below the net subscription amount. Because provider prices, refresh policy and account volume are all OPEN, the inequality cannot be evaluated.

Two conclusions are already available without numbers: (a) a product that refreshes many variables at high frequency for many accounts is dominated by provider call cost, so the refresh policy must be declared and constrained; (b) adding a second model for comparison multiplies the data cost of every compared variable, so Pro's premium must be justified by the comparison outcome and gated on the actual per-model price. This is why Pro is CONDITIONAL and why the provider-rights gate is a commercial gate, not only a legal one.

### 7.4 Commercial terms still unresolved

Refresh policy per variable; saved-location allowance; active-device allowance; Pro upgrade proration method; grace period and payment-failure handling; refund policy; renewal reminder timing; what happens to cached data on cancellation; tax treatment per market; partner referral terms; whether a trial exists and for how long. All are OPEN and none may be invented in copy or in a price table.

---

## 8. Forecast provenance, timestamp semantics, freshness and multi-model comparison

The dossier adopts the annex in full; the operative rules restated here are the ones the product must implement and the acceptance scenarios must prove.

1. **Six distinct timestamps.** modelRunTime, validTime, receiptTime, displayTime, observationTime and publicationTime are separate fields, separately displayed where relevant, and never substituted for one another. A forecast is never labelled with its receipt time as though that were its validity.
2. **Data type always attached.** FORECAST, OBSERVATION, HISTORICAL, DERIVED, USER_ENTERED, UNKNOWN. A forecast is never presented as an observation; a derived value is never presented as a provider forecast.
3. **Six freshness states.** CURRENT, AGING, STALE, EXPIRED, UNAVAILABLE, OUT_OF_COVERAGE, computed from the source's declared update cycle, not from a marketing threshold. Stale and expired values are labelled and never styled as current.
4. **Transparent comparison, never a fictional consensus.** Each model keeps its identity, run time, horizon and licence. Spread is shown as spread. No "average forecast", no "best model", no confidence percentage invented by MAREA. Where a provider publishes an ensemble, it is shown as the provider published it.
5. **No accuracy claim.** No percentage, no hit rate, no skill score and no "more accurate than" statement exists, because WEATHER_FORECAST_EVALUATION = NOT_PERFORMED and no evaluation plan has been executed in the pilot geography.
6. **Honest unavailable state.** Provider outage, licence loss, rate-limit exhaustion and entitlement expiry all produce an explicit unavailable state with a reason, the last successful receipt time and the attribution retained. None of them may produce a frozen value presented as live.

---

## 9. Acceptance scenarios WEATHER-AC-01 to WEATHER-AC-35

Every scenario is NOT_EXECUTED. None is claimed as passing. Documentation, mock-ups and fixtures do not constitute acceptance of a licensed production pipeline; a scenario that needs a licensed source may only be closed with a real licensed source or an explicitly labelled test fixture, and the fixture closure never proves the licence.

| Id | Scenario | Pass criteria | Evidence required | Status |
| --- | --- | --- | --- | --- |
| WEATHER-AC-01 | Home screen with declared home area | Home screen shows the declared area, saved locations, and for each value its source and age before any interpretation | Screen record + source registry entry | NOT_EXECUTED |
| WEATHER-AC-02 | User-selected sailing areas | Customer selects declared areas; uncovered areas return OUT_OF_COVERAGE with a reason | Recorded session + coverage statement | NOT_EXECUTED |
| WEATHER-AC-03 | Saved marine locations | Add, rename, delete and export a location; per-location variable availability shown | Recorded session + export file | NOT_EXECUTED |
| WEATHER-AC-04 | Wind with full provenance | Sustained wind renders with source, model, modelRunTime, validTime, receiptTime, age, units, licence and limitation | Value metadata capture | NOT_EXECUTED |
| WEATHER-AC-05 | Gust distinguished | Gust is separate from sustained wind and a measured gust is labelled OBSERVATION | Value metadata capture | NOT_EXECUTED |
| WEATHER-AC-06 | Wave height | Significant wave height with unit, model and declared resolution; labelled FORECAST | Value metadata capture | NOT_EXECUTED |
| WEATHER-AC-07 | Wave direction and period | Direction convention and period definition stated on screen | Screen record | NOT_EXECUTED |
| WEATHER-AC-08 | Swell availability | Swell shown only when the licensed product documents a partition; otherwise NOT_AVAILABLE with reason | Source documentation + screen record | NOT_EXECUTED |
| WEATHER-AC-09 | Currents | Current speed/direction labelled FORECAST or OBSERVATION correctly per source | Value metadata capture | NOT_EXECUTED |
| WEATHER-AC-10 | Tides | Tide shows station/model, datum, prediction basis, source, validTime and age; no official-tide claim | Screen record + source terms | NOT_EXECUTED |
| WEATHER-AC-11 | Sea surface temperature | SST labelled forecast or observation per source and never presented as measured sea temperature when modelled | Value metadata capture | NOT_EXECUTED |
| WEATHER-AC-12 | Atmospheric conditions | Temperature, pressure, cloud and precipitation each with unit, source and timestamp | Value metadata capture | NOT_EXECUTED |
| WEATHER-AC-13 | Map layers licensed only | A licensed layer renders with attribution; an unlicensed layer is absent with a stated reason and is not proxied | Network capture + screen record | NOT_EXECUTED |
| WEATHER-AC-14 | Timeline alignment | Timeline steps align on validTime; modelRunTime and receiptTime available per step; horizon boundary marked | Screen record | NOT_EXECUTED |
| WEATHER-AC-15 | Multi-model comparison | Two models shown side by side with individual attribution and a labelled spread; no consensus, no mean presented as forecast | Screen record + metadata capture | NOT_EXECUTED |
| WEATHER-AC-16 | No fictional consensus | Attempt to surface an averaged "best" value is blocked or explicitly labelled "arithmetic mean, not a forecast" | Negative test | NOT_EXECUTED |
| WEATHER-AC-17 | Source identification | Every displayed value resolves to provider, product, model and dataset version; provenance page lists all sources | Audit of rendered values | NOT_EXECUTED |
| WEATHER-AC-18 | Model run vs valid vs receipt time | A fixture with an old model run and a fresh receipt time is displayed as old run, not as fresh forecast | Clock/age fixture test | NOT_EXECUTED |
| WEATHER-AC-19 | Horizon boundary | A value beyond the declared horizon is EXPIRED, not rendered as forecast | Fixture test at horizon edge | NOT_EXECUTED |
| WEATHER-AC-20 | Geographic coverage | A coordinate outside the declared box returns OUT_OF_COVERAGE; no silent neighbour substitution | Fixture test at boundary | NOT_EXECUTED |
| WEATHER-AC-21 | Spatial and temporal resolution declared | Each source displays its declared resolution and time step; no point-precision claim | Screen record | NOT_EXECUTED |
| WEATHER-AC-22 | Attribution rendered | Required credit strings and DOIs render where the data appears and on the provenance page | Screen record + string comparison | NOT_EXECUTED |
| WEATHER-AC-23 | Data quality / status | Status model renders correctly in all six states with a stated reason for each non-current state | State matrix test | NOT_EXECUTED |
| WEATHER-AC-24 | Missing data | A missing value renders NO_DATA and is never zero-filled; partial variable coverage is stated | Fixture with a gap | NOT_EXECUTED |
| WEATHER-AC-25 | Stale forecast | A value older than twice the declared cycle becomes STALE and is never styled or described as current | Age fixture test | NOT_EXECUTED |
| WEATHER-AC-26 | Uncertainty where supported | A provider ensemble is shown with the provider meaning; absent a product the field reads NOT_PROVIDED | Fixture + provider documentation | NOT_EXECUTED |
| WEATHER-AC-27 | Historical comparison | History renders only with an archive right, with period and method stated; without the right the feature is unavailable | Right record + screen record | NOT_EXECUTED |
| WEATHER-AC-28 | Route weather context | A route is sampled, each value labelled DERIVED and advisory, contributing models named, no automatic routing decision | Recorded session + method statement | NOT_EXECUTED |
| WEATHER-AC-29 | Passage planning | A planning workspace combines departure window, route context and weather windows, all labelled advisory | Recorded session | NOT_EXECUTED |
| WEATHER-AC-30 | Weather windows | A window is computed from customer thresholds and stated models, labelled advisory, never a guarantee | Recorded session + computation record | NOT_EXECUTED |
| WEATHER-AC-31 | Configurable notifications | A rule is configured; delivery limits and provider dependence are shown; no official-warning claim | Recorded session + notification delivery record | NOT_EXECUTED |
| WEATHER-AC-32 | Account and entitlement | One account shows one entitlement; NAV Pro inclusion is marked included, not purchased | Account record + ledger view | NOT_EXECUTED |
| WEATHER-AC-33 | No double billing | Buying WEATHER then adding NAV Pro, and the reverse, never charges the weather entitlement twice; upgrade applies prorated credit | Billing simulation + ledger record | NOT_EXECUTED |
| WEATHER-AC-34 | Caching and offline honesty | Caching occurs only where a right exists; offline surface shows last receipt time and "value not current"; no offline package where no right exists | Network capture + screen record | NOT_EXECUTED |
| WEATHER-AC-35 | Provider outage, usage limits, renewal and language parity | Outage shows unavailable with attribution; budget exhaustion serves only aged values; renewal date and amount shown before charge; expired entitlement produces unavailable, not frozen; ES/EN terminology parity reviewed | Incident simulation + bilingual review record | NOT_EXECUTED |

---

## 10. Traceability annex — MC-02 blockers and the exact evidence required before any sale

| Blocker | What it says | Where it bites in this dossier | Exact evidence required to close |
| --- | --- | --- | --- |
| D-04 | Open-Meteo free API is non-commercial only; subscriptions require the paid customer API or self-hosting (AGPL-3.0); data is CC BY 4.0 | F04 domain 04–13, 16, 30–33; §7; annex §3.3 | Purchased commercial plan with invoice and archived terms, or a different licensed provider; a written decision recorded (DEC-03) |
| D-05 | OpenWeather map/tile layers are a separate paid SKU; no sublicensing or resale; ordinary key does not cover tiles | F04 domain 14; §6.2; annex §3.7 | Purchased tile SKU with terms, or removal of the layer from the product |
| D-07 | MeteoGalicia legal notice unreachable; Puertos warns against third-party transfer; AEMET NWP is not open data | F04 domains 02, 04, 05, 09, 10, 11, 13, 22; §5.3; annex §3.4–3.6 | Written terms or authorisations from each public-sector provider; NWP data-supply agreement or permanent exclusion |
| D-09 | AIS-derived traffic redistribution is not established | F09 integration; §11 (no AIS data in WEATHER) | AIS data-retention/redistribution policy before any shared FLEET map context |
| D-10 | External data generally: 11 of 28 provider rows remain LEGAL_REVIEW_REQUIRED | Every FORECAST/OBSERVATION domain; annex §12–§13 | A provider-by-provider clearance register with written terms and archived URLs |
| P-08 | WEATHER readiness: data rights blocked; adapters partial; no forecast accuracy validation | F04 all domains, F23, F24 | Licensed provider, complete adapters, source registry, and a recorded forecast evaluation in the pilot geography |
| P-10 | All nine products: engineering reuse is inventory-level; Node/TypeScript tests unexecuted | F24; §9 every scenario | Reproducible test environment and executed test reports per module |
| X-01 | MAREA brand clearance not performed; nothing may be published as registered | F17, F20, F21; §12 | EUIPO/OEPM clearance before any brand publication |
| X-03 | AI image generation blocked; no image credential or budget | F20 asset dependency only | Written budget authorisation and provider credential; no asset is generated in this milestone |
| X-05 | No real BOM, provider quotes, connectivity costs or channel terms | F13, F14, F15, F22, F23; §7 | Real provider quotes, plan prices and channel terms |
| X-06 | No primary customer interviews or validated willingness to pay | F02, F03, F05, F16, F17, F23 | Structured interviews and pilot-customer evidence |

**The exact evidence required before any WEATHER sale:** a licensed, version-pinned source registry with written terms for every provider displayed; a recorded legal review of every row in the annex §13; implemented and tested attribution; a working provider pipeline with the six timestamps; proven freshness, stale, missing and out-of-coverage behaviour; a working single entitlement ledger with no double billing; written consumer terms with the seller legal identity (X-02); a review of the pilot geography coverage; and independent verification of §9. Until all of that exists, WEATHER is DEFINED and NOT_FOR_SALE.

---

## 11. Ecosystem, cross-sells and cross-product authority

Integration statuses are frozen by the milestone brief; this dossier restates them and does not upgrade any of them.

| Integration | Status | Evidence class | What it means, and the boundary |
| --- | --- | --- | --- |
| WEATHER-NAV | PLANNED | OPEN | Read-only weather context into the NAV workspace; entitlement sharing on one ledger; NAV supplies no weather right and WEATHER supplies no chart right. No verified integration exists. |
| WEATHER-FLEET | CONDITIONAL | OPEN | Only if a provider agreement permits B2B operational use; buying WEATHER never creates a fleet tenancy; no AIS-derived data is shared (D-09). |
| WEATHER-DISPLAY | CONDITIONAL | OPEN | Licensed weather view on a fixed helm screen only where device, entitlement and provider display right all permit; DISPLAY is a separate product with its own rights. |
| WEATHER-HUB | CONDITIONAL | OPEN | Own-vessel observations from a compatible HUB may be displayed as OBSERVATION alongside forecasts; no protocol compatibility is claimed until tested. |

Cross-sell rules: NAV is the natural companion and must never create a second weather charge; DISPLAY presents, it does not license; FLEET consumes only under a B2B-permitted agreement; START, CRUISE, SAIL, PROTECT and COMPLETE bundles are ecosystem context only and are not purchasable here; charts, hardware, connectivity and professional interpretation are separate objects. No product is presumed included in another and none is purchasable today.

---

## 12. Required disclaimers and limitation statements — verbatim, ES and EN

These are quoted verbatim from the approved sources and must appear exactly, in the product language, on the surfaces indicated. They are not paraphrased, summarised or reordered.

### 12.1 Navigation / instruments disclaimer (COMMERCIAL-BRAND-CLAIMS-POLICY.md §9; required wherever a position or route context appears)

ES:
«Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»

EN:
"This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

### 12.2 Weather disclaimer (COMMERCIAL-BRAND-CLAIMS-POLICY.md §9; required on every WEATHER surface)

ES:
«Las previsiones son probabilísticas y pueden desviarse de las condiciones locales reales. Se muestra la fuente y la hora de cada dato.»

EN:
"Forecasts are probabilistic and may differ from actual local conditions. Source and timestamp are displayed for every data point."

### 12.3 Batch-03 WEATHER limitation statement (brief §17.2, INTERNAL DRAFT wording pending claims-register approval)

ES:
«La cobertura depende de proveedores con licencia y no se garantiza la exactitud de la previsión. Una previsión caducada o no disponible nunca se presenta como actual.»

EN:
"Coverage depends on licensed providers and forecast accuracy is not guaranteed. A stale or unavailable forecast is never presented as current."

### 12.4 Brand attribution (COMMERCIAL-BRAND-CLAIMS-POLICY.md §9, footer of commercial material)

ES:
«MAREA es una marca de producto de EMBARCARTE.»

EN:
"MAREA is a product brand of EMBARCARTE."

### 12.5 Status statement that must accompany any commercial material

MAREA WEATHER is not a meteorological guarantee, is not an official warning authority and is not a substitute for prudent seamanship. It does not replace official meteorological warnings, official nautical charts, the vessel required equipment, continuous watchkeeping, the judgement of the skipper or the decision to stay in port. Forecasts are probabilistic and may differ from actual local conditions; every value is shown with its source and its time; a stale, expired or unavailable forecast is never presented as current.

---

## 13. Non-assertions and document status

**Non-assertions.** This dossier does not assert: that MAREA WEATHER is available, purchasable, published, certified or approved; that any provider has granted a right; that any forecast is accurate or has been evaluated; that coverage is global, continuous or exclusive; that any resolution or horizon is better than a source provides; that any official service, warning or tide table is reproduced; that offline, historical or notification features are permitted; that any price is approved; that any integration is SUPPORTED; that any customer, test, trial, review or benchmark of MAREA WEATHER exists.

**Document status:** DRAFT — INTERNAL ONLY — NOT PUBLISHED — PRODUCT DEFINITION COMPLETE, NOT FOR SALE — PRICES ARE HYPOTHESES, NOT APPROVED — DATA RIGHTS NOT GRANTED.
