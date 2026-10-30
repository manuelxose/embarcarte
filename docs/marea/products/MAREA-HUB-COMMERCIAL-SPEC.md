# MAREA HUB — Complete commercial specification (MC-05 / D2-HUB)

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D2-HUB |
| Milestone | MC-05 (Master Prompt 05/36) |
| Owner | MAREA HUB Product Director (Product function) |
| Document status | INTERNAL · COMPLETE_TARGET_SPECIFICATION · NOT_FOR_SALE |
| Product id | `HUB` |
| Customer-facing names | MAREA HUB · MAREA HUB Standard · MAREA HUB Pro |
| Lifecycle state | `DEFINED` (binding vocabulary, `docs/marea/COMMERCIAL-PORTFOLIO.md` §Lifecycle) |
| Branch | `feature/marea-mc05-nav-hub-ais-products` |
| Base commit | `8ac6d69` (MC-04 HEAD) |
| Date | 2026-10-30 |
| Contract authority | `docs/marea/products/README.md` (MC-05 product-definition conventions) |
| Classification | Internal pre-contractual dossier. Not a catalogue, not a product page, not a quotation, not a commercial offer |

This dossier defines the **finished commercial product** MAREA HUB, not an MVP, not a hardware
implementation plan and not a code audit. Engineering will decide the final hardware implementation;
this document fixes the customer experience, the commercial vocabulary, the evidence labels and the
gates that must close before anything may be sold. A complete specification is not readiness, and
readiness is not availability.

---

## 1. Status block — completely specified, not for sale

### 1.1 Product-level status (contract §1 mapping)

All of the following are true at MC-05 and none of them may be softened in customer-facing material:

| Dimension | Value |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` — the MC-02 audit is the only engineering evidence; no HUB product hardware and no tested HUB integration exist |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BRAND_CLEARANCE` | `NOT_GRANTED` — MAREA is a proposed brand; no trademark clearance exists (X-01) |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` — OPEN-MARINE grants no reuse right; no root licence, no assignment (L-01–L-03, S-06) |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |

### 1.2 Per-dimension readiness (contract §4, never collapsed into one flag)

| Dimension | HUB value at MC-05 | Evidence and scope |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | This dossier, all 24 fields and 28 capability domains |
| `engineering` | `PARTIALLY_VERIFIED` | Only executed evidence is NMEA 0183 wind parsing and IMU-fusion unit behaviour (`OPEN-MARINE-CAPABILITY-INVENTORY.md` §6.1); TypeScript suites are unexecuted (P-10); no HUB integration exists (P-02). The product-level `EVIDENCE_BASED` row above means the judgement rests on audit evidence, not on a verified product |
| `licensing` | `NOT_CLEARED` | L-01–L-03 (no inbound grant), S-06 (Signal K image pinned by mutable tag, image SBOM owed); bundled decoder licences remain a distribution risk if a decoder is ever included |
| `hardware` | `NOT_SELECTED` | No BOM, no enclosure, no harness, no bench evidence (H-05, H-07); 13 identified components with one exact part number and none with a board revision |
| `dataRights` | `NOT_GRANTED` (AIS-derived traffic only); N/A for own-vessel instrument data | Own-vessel instrument data is permitted for on-board use (`MARINE-DATA-RIGHTS-MATRIX.csv` MD-25); AIS-derived history/redistribution is `LEGAL_REVIEW_REQUIRED` (D-09) |
| `compliance` | `NOT_STARTED` | No EU declaration of conformity, EMC/RED/GPSR/RoHS/WEEE/CRA evidence (H-06); CRA vulnerability handling and secure update absent (H-13) |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | EUR 349 Standard / EUR 499 Pro are internal hypotheses only, subject to BOM and conformity (X-05) |
| `brandPublication` | `NOT_GRANTED` | X-01; no customer copy in this milestone is publishable |
| `availability` | `NOT_FOR_SALE` | No SKU, no stock, no order flow, no fulfilment, no support contract |

### 1.3 Evidence classes used in this dossier (contract §5)

| Class | Meaning here |
| --- | --- |
| `VERIFIED_REPO` | Verifiable in this repository; a path is cited |
| `VERIFIED_EXTERNAL` | Verifiable at a cited public source with a check date |
| `ASSUMPTION` | An explicit planning assumption, not evidence |
| `HYPOTHESIS` | A commercial or price assumption awaiting approval |
| `OPEN` | Fact not yet established; the intended customer experience is still specified |
| `BLOCKED` | An external condition (licence, certificate, quote, measurement) prevents closure |

`OPEN` and `BLOCKED` are legitimate values. The prohibited placeholder token is not used anywhere in this
dossier, and no field is filled with an unlabelled assertion.

### 1.4 The one-message summary

MAREA HUB is completely specified and not for sale. It is not certified, makes no NMEA 2000 claim, is not
available, not priced, not tested on a vessel and not installable through an EMBARCARTE installer
network that does not yet exist. Those are truthful states, not defects of this document.

---

## 2. Canonical field block (convention)

Every field F01–F24 uses the contract block exactly as defined in `docs/marea/products/README.md` §6.
`Definition` describes the finished commercial experience; `Evidence` labels it; `Owner` names a
function; `Blockers / dependencies` cites MC-02 ids; `Commercial readiness` states one readiness
dimension with its value.

---

## 3. The 24 canonical fields

#### F01 — Identity
- **Definition.** MAREA HUB is the onboard data gateway and connectivity appliance of the MAREA family: one installed unit that gathers supported vessel data — GNSS position, compatible instrument data, Signal K streams, wind, depth where available, battery and utility status and receive-only AIS targets — normalises it into a single documented local vessel data interface, and serves that interface to MAREA NAV, MAREA DISPLAY, compatible instruments and the owner's own devices on the vessel network. Category: onboard data gateway/connectivity appliance (HARDWARE). Family: MAREA. Code: HUB. Editions: MAREA HUB Standard, MAREA HUB Pro. Positioning: the integration layer that makes mixed, legacy and modern equipment readable in one place without replacing working instruments; it is never the vessel's steering controller.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02; `VERIFIED_REPO docs/marea/products/README.md` §2, §4; `VERIFIED_REPO docs/marea/compliance/MAREA-PRODUCT-REUSE-MAP.md` §4.2 field 1. Final hardware implementation is `OPEN` (engineering decision).
- **Owner.** Product management (HUB).
- **Blockers / dependencies.** H-05, H-07, P-02.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`.

#### F02 — Customer segments
- **Definition.** Primary segment: owners of recreational sailing and motor vessels who are modernising or consolidating mixed-age onboard electronics, with the pilot go-to-market in Galicia and northern Portugal. Secondary segment: independent marine electronics installers and refit yards who need a repeatable, documented integration product. Tertiary segment: small charter schools, marinas and boat-maintenance companies standardising several vessels, and second-hand buyers who inherit undocumented equipment. Buying contexts: refit or upgrade season, replacement of a failing single-purpose gateway, post-purchase retrofit, pre-season readiness, fleet standardisation. Explicitly not a segment: commercial shipping, security-critical installations, vessel telemetry for racing analysis and any buyer seeking steering control.
- **Evidence.** `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §1, §5 Phase A; `ASSUMPTION` segment priority and buying context ranking, to be validated in MC-03A/MC-10 discovery; no primary interviews exist (X-06).
- **Owner.** Product marketing and commercial development.
- **Blockers / dependencies.** X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F03 — Customer problems
- **Definition.** The problems MAREA HUB is designed to remove: (1) a fragmented helm in which plotter, wind instrument, AIS, battery monitor and phone each hold part of the picture; (2) legacy instruments that cannot feed a modern application and no reliable statement of what actually connects; (3) upgrade proposals that replace working equipment because integration is unknown; (4) installers improvising interfaces, so the owner cannot tell what was tested and what was hoped; (5) data trapped in vendor ecosystems with no local export or record; (6) battery, utility and navigation status in separate places; (7) the retrofit fear that nothing will work on this particular boat. Existing alternatives: single-purpose protocol gateways, replacing whole instrument systems, DIY single-board-computer plus Signal K builds, and dealer/brand instrument bundles. HUB's answer is assessed consolidation with a published compatibility matrix and an accountable installation service.
- **Evidence.** `VERIFIED_EXTERNAL docs/marea/MARKET-BENCHMARKS.md` HUB rows (Digital Yacht iKonvert, Yacht Devices WiFi gateway; check date 2026-10-30); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02; `ASSUMPTION` problem ranking and willingness to pay (X-06).
- **Owner.** Product management.
- **Blockers / dependencies.** X-06, P-02.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F04 — Final functionality
- **Definition.** At end state a customer receives a fully installed, configured and supported onboard data gateway that: ingests the supported sources listed in its published compatibility matrix; normalises them into one documented units/timestamp/quality vocabulary; publishes that interface on the vessel network; presents a local dashboard, connection diagnostics, installation status, device identity, configuration, history retention and backup/recovery; operates offline by design; degrades visibly and safely when a source fails; updates with rollback; supports ownership transfer; and is delivered through an EMBARCARTE professional installation service with handover, training and support. The 28 mandatory final capability domains are enumerated in §4 and every one is part of the finished commercial offer. The product does not offer steering, autopilot or control of the helm; it does not transmit AIS; it is not certified as navigation equipment.
- **Evidence.** `OPEN` — intended end-state experience; per-domain evidence state in §4; `VERIFIED_REPO docs/marea/products/README.md` §6 F04; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02.
- **Owner.** Product management (HUB) with engineering.
- **Blockers / dependencies.** H-04, H-05, P-02, P-10.
- **Commercial readiness.** `engineering = PARTIALLY_VERIFIED`.

#### F05 — Differentiation
- **Definition.** HUB is relevant because it combines four things narrow alternatives do not: (1) assessed consolidation of several source families into one documented local interface; (2) an installation and configuration service with a named responsibility boundary; (3) a compatibility matrix published per device, per firmware version and per read/write direction, with the limitations stated; (4) a local-first design in which the boat keeps working when the commercial website is not reachable. It is not differentiated by claiming superior accuracy, superiority to named competitors or effort-free connection behaviour. The commercial claim is integration quality and ownership experience, testable through installer and owner outcomes once real installations exist.
- **Evidence.** `ASSUMPTION` — differentiation hypothesis; `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §1 positioning; `VERIFIED_EXTERNAL docs/marea/MARKET-BENCHMARKS.md` finding 2 (consolidation is a promising entry point only if functionality exceeds narrower gateways and installation burden is justified).
- **Owner.** Product management and commercial strategy.
- **Blockers / dependencies.** P-02, X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F06 — Editions
- **Definition.** Two editions, differing by a customer-value boundary rather than by "more powerful": MAREA HUB Standard addresses a single-vessel mixed legacy installation within a documented base interface/connection envelope; MAREA HUB Pro extends the validated interface and connection envelope, increases integration capacity for denser or more varied equipment sets, and adds configuration and diagnostics depth plus installer tooling and support depth. The exact boundary is a product-engineering requirement that must be frozen after hardware design and physical tests; no port count, protocol list, radio feature or processor specification is invented here. The edition split must be capable of being evidenced in the published matrix; it must not be created by artificially disabling a capable unit. Price hypotheses are EUR 349 Standard and EUR 499 Pro. Full edition logic in §5.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02 (editions and hypothesis); `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §7 (edition vocabulary); `ASSUMPTION` edition value split; final SKU envelope `OPEN` (H-05, H-07).
- **Owner.** Product management (HUB).
- **Blockers / dependencies.** H-05, H-07, X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F07 — Included items
- **Definition.** Intended included content per edition: the MAREA HUB appliance; the mounting and power accessory items specified for that SKU (exact item list `OPEN` until the BOM is frozen); the connection and setup guide; the compatibility assessment for the purchased configuration; the licence to use the appliance's on-device software and local services for the published support window; a defined support entitlement; and professional installation only when the configuration is purchased as professionally installed. Intended exclusions, stated before purchase: the vessel network backbone, unrelated sensors, vendor-specific licensed cabling beyond the documented adapter list, third-party chart or weather licences, MAREA PILOT or any steering hardware, installation labour when self-installed, and any compatibility that is not published in the matrix. No bill of materials exists, so contents beyond the appliance and documentation are `OPEN`.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02 included/excluded; `OPEN` SKU content (no BOM); `BLOCKED` H-05, H-07.
- **Owner.** Product management with hardware engineering.
- **Blockers / dependencies.** H-05, H-07, X-05.
- **Commercial readiness.** `hardware = NOT_SELECTED`.

#### F08 — Optional accessories
- **Definition.** Intended optional items, always described by function and never given an invented MAREA product name: documented adapter and cabling items required by specific installations; network expansion items; power accessory items; an external GNSS antenna where the installation requires one; MAREA SENSE sensor modules (wind, battery, bilge or other verified signals); the receive-only MAREA AIS product where traffic awareness is bought; and service items such as professional installation, extended support or a later edition upgrade. Every optional item is only compatible within the tested matrix. No accessory name is approved and no accessory price exists; the list is a commercial requirement for the hardware design, not a catalogue.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §9 (accessories are not families or editions); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02 excluded items; `OPEN` exact accessory list; `BLOCKED` H-07, X-05.
- **Owner.** Product management with procurement.
- **Blockers / dependencies.** H-07, X-05.
- **Commercial readiness.** `hardware = NOT_SELECTED`.

#### F09 — Integration
- **Definition.** Integration is governed by a published matrix, not by protocol names. The intended supported inputs are: documented NMEA 0183 sentence inputs over supported serial/USB paths (sentence parsing only; parsing is not conformance to the NMEA 0183 standard); Signal K streams from supported sources, path by path and direction by direction; GNSS position/time/course/speed from a supported receiver; wind, depth where available, and battery/utility data from supported sources; and receive-only AIS targets from a compatible receive-only receiver. The appliance publishes one documented local vessel-data interface over the vessel network and hosts a local dashboard. NMEA 2000 is **not implemented and not certified**; no NMEA 2000 compatibility of any kind is claimed while H-04/DEC-05 remain open. Signal K is not a blanket compatibility guarantee; compatibility is per device, per firmware/software version, per message path and per direction, only with recorded evidence. No steering, autopilot or actuator control path is exposed or planned.
- **Evidence.** `VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §4.1–§4.3 (NMEA 2000 stubs only; NMEA certification facts; Signal K licensing); `VERIFIED_REPO docs/marea/compliance/MAREA-PRODUCT-REUSE-MAP.md` §4.2 fields 6 and 9; `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §3.2, §3.4. Executed evidence is limited to wind parsing and IMU unit behaviour; all other integration is `OPEN`.
- **Owner.** Integration owner (HUB Product Director) with engineering.
- **Blockers / dependencies.** H-04, H-02, P-02, S-06; AIS-derived data D-09.
- **Commercial readiness.** `dataRights = NOT_GRANTED` (AIS-derived traffic only).

#### F10 — Professional installation
- **Definition.** Professional installation is the intended route for every configuration outside a documented low-risk self-install set. The finished service runs from a pre-sale vessel questionnaire through equipment inventory, compatibility assessment, written installation proposal, required-materials list, scheduled installation, configuration, function checks, customer handover, user training, support and warranty responsibility, and later upgrades. The owner receives a permanent installation record (configuration, sources found, unsupported items, checks performed, software version). Self-install is permitted only where the questionnaire deterministically confirms a documented compatible configuration; otherwise the result is a specialist assessment or an installer proposal, never an asserted compatibility. No installation duration and no installation price are stated: both require measurement or quotation and are `OPEN`/`BLOCKED`.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02 buying path; `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` page content contract (configurator rules); `ASSUMPTION` service design; `BLOCKED` no installer agreements, no measured installations (X-05, X-06).
- **Owner.** Service operations with the installer network.
- **Blockers / dependencies.** P-02, X-05, X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F11 — Onboarding
- **Definition.** The first-use experience is a guided local configuration, not a manual and a hope. Delivery sequence: the compatibility assessment is offered before purchase; on power-up the appliance presents a local setup path that confirms network join, detects and lists sources, asks the owner or installer to label each source and vessel, confirms time and position, offers dashboard presets, and writes a configuration snapshot before leaving setup. For professionally installed configurations the installer completes this sequence and hands over with training. The owner leaves with an exported or printed configuration record, a list of sources that were not recognised, and a support reference. Education material is versioned with the product, provided in Spanish and English, and states what the product does not do. The setup screens and manuals are `OPEN`; no UI exists and no product screen has been usability-tested.
- **Evidence.** `OPEN` — onboarding UX and manuals not built; `ASSUMPTION` sequence; `VERIFIED_REPO docs/marea/products/README.md` §6 F11 requirement.
- **Owner.** UX and content with support engineering.
- **Blockers / dependencies.** P-02, H-07.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F12 — Licensing and subscriptions
- **Definition.** MAREA HUB is intended as a perpetual hardware purchase, under commercial terms that are not yet approved: owning the unit includes the licence to use its on-device software and local services, with security and corrective updates inside the published support window. No mandatory cloud subscription is required for local data functions, and no entitlement check or licence expiry may disable ingest, normalisation, local dashboard, diagnostics, configuration, history or recovery. MAREA NAV, MAREA WEATHER, MAREA WATCH and professional installation are separate offers; buying HUB never implies a chart, weather or traffic-data entitlement. Open-ended ownership promises are prohibited. The update support window, the treatment of a failed unit outside warranty and any paid-service terms are `OPEN`; source-IP licensing is `NOT_CLEARED` (L-01–L-03, S-06).
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price and channel decision rule and line on independent offline HUB data use; `VERIFIED_REPO docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` L-01–L-03, S-06; commercial terms `OPEN` (X-05).
- **Owner.** Product management with legal.
- **Blockers / dependencies.** L-01, L-02, L-03, S-06, X-05.
- **Commercial readiness.** `licensing = NOT_CLEARED`.

#### F13 — Retail and partner pricing
- **Definition.** Consumer price hypotheses, recorded for internal planning only and published nowhere: MAREA HUB Standard EUR 349, MAREA HUB Pro EUR 499, VAT-inclusive retail hypothesis, both `HYPOTHESIS_UNAPPROVED` and subject to real BOM and conformity cost. They are not "from" prices, not launch or limited offers, not discounts and not orderable. No partner, distributor, installer or volume price exists; the B2B structure is `OPEN` and belongs to the pricing and channel model deliverable. Professional installation is quoted per vessel, not bundled into the hardware price. No price may appear in checkout, catalogue or a live page before an approved price list, bottom-up costing and the readiness gates exist.
- **Evidence.** `HYPOTHESIS` — allowed figures and their limits from `docs/marea/products/README.md` §8 (the only permitted HUB figures); `BLOCKED` X-05 (no BOM, no quotes); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6.
- **Owner.** Commercial strategy and pricing with finance.
- **Blockers / dependencies.** X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F14 — Direct and ongoing costs
- **Definition.** A costing framework with named inputs only, because no figure exists: manufacturing, assembly, factory test, enclosure and labelling; conformity programme (EMC/RED/GPSR/RoHS/WEEE/CRA technical file, accredited laboratory, notified-body work where required); freight, packaging and fulfilment; payment fees; warranty accrual; returns allowance; technical and installer support; firmware maintenance including security and vulnerability handling; documentation, localisation and post-sale communication; stock financing; channel discount or installer commission. Recurring connectivity or data cost applies only if a SKU ever includes such a service, which is `OPEN`. Contribution margin is deliberately not computed: presenting one would invent BOM, quote and support data.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price and channel decision rule; `BLOCKED` X-05 (BOM, supplier quotes, data/connectivity terms); H-07, H-13.
- **Owner.** Finance and procurement with product management.
- **Blockers / dependencies.** H-07, H-13, X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F15 — Channel economics
- **Definition.** Intended channel model: direct sale by EMBARCARTE plus authorised professional installers and refit yards, starting in Galicia and northern Portugal. Responsibility split: EMBARCARTE owns the product definition, compatibility-matrix authority, warranty and support policy; the installer owns the vessel survey, mechanical and electrical work, configuration, function checks, handover and first-line support, and is accountable for workmanship. The market is entered through an assisted compatibility configurator that ends in a quote request, not in an automatically asserted compatible order. Installer margin, discount, rebate and loyalty terms are `OPEN`; no commission, margin percentage or channel price exists. An installer agreement set, competence scheme and service-level expectations must be written before any partner is announced.
- **Evidence.** `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §2 institutional routes and installer program; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` first go-to-market hypothesis; `ASSUMPTION` responsibility split; `BLOCKED` X-05, X-06.
- **Owner.** Commercial development with service operations.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F16 — Competitor comparison
- **Definition.** Verifiable indirect comparables, used as context and never as a superiority claim: single-purpose gateways establish a price band for narrower functionality (published retailer examples: Digital Yacht iKonvert at EUR 240 and a Yacht Devices YDWG-02N WiFi NMEA 2000 gateway at EUR 205.84 net of VAT / EUR 236.55 recommended retail price (retailer listing, 2026-10-30; the earlier EUR 249.07 anchor could not be reproduced)); replacing an instrument ecosystem establishes the "replace everything" alternative; a DIY single-board-computer plus Signal K build establishes the low-cost self-build alternative. MAREA HUB is not compared on unmeasured performance, accuracy or reliability. Its intended comparison points are assessed multi-device consolidation, published compatibility evidence, installation accountability and the MAREA upgrade path. Competitor figures are context, not supplier quotes or predictions; no market size, share or benchmark test exists.
- **Evidence.** `VERIFIED_EXTERNAL docs/marea/MARKET-BENCHMARKS.md` HUB rows (retail listings, check date 2026-10-30); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class P (no performance comparisons without test evidence).
- **Owner.** Commercial strategy.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F17 — Sales arguments
- **Definition.** Honest buyer arguments and the objection handling that goes with them. Arguments: one place for the data the boat already has, installed and supported; what connects is published before purchase, and what does not connect is said clearly; the local boat keeps working without the commercial website; start with a gateway and add navigation, traffic awareness or sensors later. Objections and answers: "I already have a gateway" — consolidation, support, evidence and upgrade path are the difference; "is it certified for NMEA 2000?" — no, NMEA 2000 is not implemented, licensed or certified, and the matrix will only list tested interfaces; "will it work with my brand of instruments?" — only if the published matrix has that device, firmware version and direction, otherwise a specialist assessment; "does it connect to anything?" — no, it is compatibility-assessed and, outside a documented low-risk set, professionally installed; "can it steer the boat?" — no, HUB has no steering or autopilot control path; "why EUR 349?" — a price hypothesis pending BOM, conformity and channel economics. No comparative claim against a named competitor is permitted.
- **Evidence.** `ASSUMPTION` — argument ranking; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§3; no sales test exists (X-06).
- **Owner.** Product marketing with sales enablement.
- **Blockers / dependencies.** H-04, P-02, X-06.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F18 — FAQ
- **Definition.** The pre-sale and post-sale questions this product must answer truthfully. What is in the box? — the appliance plus the documented accessory items for that SKU, the setup guide and support entitlement; professional installation when purchased. Will it connect to my instruments? — only those published in the compatibility matrix, with firmware version and direction; anything else receives a specialist assessment. Is it certified for NMEA 2000? — no. Does it transmit AIS? — no; AIS integration is receive-only. Does it need internet? — no; local functions run without the commercial website, and only remote or cloud features would need it. What happens when internet is lost? — local safety-relevant functions continue and their status is shown. Can I install it myself? — only in a documented low-risk configuration confirmed by the questionnaire. Is there a subscription? — none is required for local functions; separate MAREA services are optional. Can it steer the boat? — no. What happens when a sensor stops? — the value is marked stale or unknown with its age; nothing is fabricated. How do updates work? — through a published update path with recovery, once the update process is designed and tested. Can I sell the boat with it? — through a documented ownership transfer. What does it cost? — internal price hypotheses only; nothing is on sale. How long does installation take? — not yet measured.
- **Evidence.** Derived from this dossier; `OPEN` for the answers that depend on unbuilt capability; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4.
- **Owner.** Product management with content and support.
- **Blockers / dependencies.** H-04, X-05.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F19 — Warranty and support
- **Definition.** Intended after-sales position: the statutory consumer guarantee under Spanish and EU law, plus a contractual warranty whose duration and conditions are not yet defined and must be written before sale. Support covers compatibility questions, interpretation of diagnostics, update assistance and the fault-return process. A customer can export a diagnostic bundle for support without granting remote control. Ownership transfer updates the registered owner but does not extend or reset warranty. Response time, 24/7 service, spare-unit policy and out-of-warranty repair terms must not be promised until a real service contract and staffing exist. The seller's legal identity is required for any warranty text and is currently absent.
- **Evidence.** `OPEN` — warranty terms, support levels, RMA and spares policy; `BLOCKED` X-02 (legal identity), H-13 (secure update lifecycle), X-05; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C.
- **Owner.** Customer support with legal.
- **Blockers / dependencies.** X-02, H-13, X-05.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F20 — Bilingual product page copy
- **Definition.** The customer-facing Spanish and English copy is owned by the UX, Content and Localization Specialist and lives in `docs/marea/products/copy/hub.es.md` and `docs/marea/products/copy/hub.en.md` (deliverable D8). This dossier does not duplicate that copy; it fixes the facts the copy may use and the claims it may not make. The two files must carry: the verbatim navigation/instruments disclaimer in ES and EN (§11); the lifecycle statement `DEFINED` with the CTA "request a compatibility assessment" rather than buy; an edition and inclusion/exclusion table consistent with §5; a compatibility-matrix preview; the professional-installation proposition; the FAQ from F18; and no certification, availability, performance or superiority claim. The copy is internal draft while `brandPublication = NOT_GRANTED`. Editorial direction is credible marine instrumentation, not generic consumer electronics; no visual may suggest certification.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §10 D8 and §7 rule 10; `OPEN`/external dependency — copy files are another owner's deliverable, not reviewed here; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§5.
- **Owner.** UX, content and localisation (copy) with product review (facts).
- **Blockers / dependencies.** X-01, H-04.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F21 — Cross-sells
- **Definition.** Intended commercial path: HUB as the entry appliance, then MAREA NAV for the navigation experience (HUB is never required for NAV's standalone GNSS/chart use), receive-only MAREA AIS for traffic awareness, MAREA SENSE modules for wind/battery/bilge monitoring, MAREA DISPLAY for a fixed helm view, MAREA WATCH where shore monitoring exists, and MAREA WEATHER/NAV subscriptions as separate entitlements without double billing. Bundle content and pricing belong to MC-08 and are not decided here; no bundle price exists. A Standard-to-Pro path must exist as a supported migration, but whether that is a licensed feature upgrade, a hardware swap or a new unit is an `OPEN` commercial decision that must be made before the editions are published, otherwise "no dead end" would be an empty promise.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle architecture and product system; `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §11.1; `OPEN` upgrade mechanics; MC-08 dependency.
- **Owner.** Commercial product management.
- **Blockers / dependencies.** X-05, MC-08 bundle governance.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F22 — Retention strategy
- **Definition.** Retention is earned by the installed base, not by lock-in: a growing published compatibility matrix, a maintained firmware/update cadence, responsive support, local records the owner values, installer loyalty and a clear upgrade path into NAV, AIS, SENSE, DISPLAY and WATCH. The owner can export the vessel configuration and records and leave without losing essential local function. Recurring revenue exists only where a real service is delivered, and no entitlement is constructed to make a purchased appliance degrade. Retention is measured through support incidence, update uptake, cross-sell attachment and ownership-transfer survival, not through asserted loyalty.
- **Evidence.** `ASSUMPTION` — retention hypothesis; `OPEN` — no installed base exists; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` product-system logic.
- **Owner.** Customer success with product management.
- **Blockers / dependencies.** X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F23 — Success metrics
- **Definition.** Metrics to be defined and measured, with no invented targets: post-install activation rate; share of assessed devices that connect as published; unsupported-device triage rate; return and RMA rate; warranty incidence; measured installation hours per configuration (only once measured); support tickets per hundred units; compatibility-matrix coverage and freshness; update uptake and recovery success; ownership-transfer completion; cross-sell attachment into NAV, AIS, SENSE and DISPLAY; owner satisfaction; and contribution per unit only after real BOM, quote and channel data exist. Baselines and targets are `OPEN`; stating a number now would be invented.
- **Evidence.** `OPEN` — no installation, instrumented product or sales data; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02 KPIs (gateway activation, device success, returns, warranty, installation hours).
- **Owner.** Product operations with finance.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F24 — End-to-end acceptance
- **Definition.** Acceptance means the complete product demonstrably works end to end: the eight acceptance scenarios in §9 are executed and recorded; the published compatibility matrix is backed by device-level tests with firmware versions and direction; electrical, thermal, ingress and recovery behaviour is measured on a physical article; EMC/RED/GPSR/RoHS/WEEE/CRA evidence exists for the actual SKU; the installer chain has been validated on real vessels; the update and backup/restore paths have been exercised; and a real owner has completed handover and support. Documentation alone, unit tests or simulation do not constitute acceptance. No scenario or gate is claimed as passing in this dossier; all are `NOT_EVALUATED`.
- **Evidence.** `OPEN`/`BLOCKED` — scenarios defined in §9; gates in §10; MC-13-HUB verification gate; `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §6 mandatory milestone evidence.
- **Owner.** Quality assurance with engineering and compliance.
- **Blockers / dependencies.** H-02, H-04, H-05, H-06, H-07, H-13, P-02, P-10.
- **Commercial readiness.** `compliance = NOT_STARTED`.

---

## 4. F04 capability-domain register — 28 mandatory final domains

This register is the substantive expansion of F04. Each domain is part of the finished commercial
experience; the evidence state says what is actually established today. "OPEN" means the experience is
defined but not evidenced; "BLOCKED" names the external condition. No domain may be dropped from the
final product because it is currently unevidenced.

| ID | Capability domain | Finished commercial experience | Evidence state | Blocking ids |
| --- | --- | --- | --- | --- |
| CD-01 | Supported vessel segments | Recreational sailing and motor vessels in the pilot region, assessed per vessel at questionnaire stage; no vessel, size or rig is declared supported without that assessment. Commercial shipping and steering-control use are excluded. | `ASSUMPTION` + `OPEN` (X-06) | X-06 |
| CD-02 | Equipment compatibility assessment | A pre-sale questionnaire and installer survey produce a documented verdict: supported, conditionally supported or not supported, with the exact device, firmware version, direction and required adapter. The verdict is recorded before money changes hands. | `OPEN` — method defined, no tested matrix exists | P-02, H-04 |
| CD-03 | Physical hardware package | One installed appliance with mounting and power items specified per SKU. Enclosure, harness, labelling and the final industrial design are engineering decisions; no manufactured article, BOM or appearance exists. Internal CMF direction is not a product specification. | `BLOCKED` — no article or BOM | H-05, H-07 |
| CD-04 | Supported connection families | The product commits only to connection families that are individually tested and published: documented NMEA 0183 serial/USB inputs and Signal K streams are the intended base, with Wi-Fi/Ethernet for local access. NMEA 2000 is not a supported family today. Exact ports and counts are `OPEN` product-engineering requirements. | `PARTIALLY_VERIFIED` (wind parsing, IMU) / `OPEN` | H-04, H-05 |
| CD-05 | GNSS intake | Position, time, course and speed from a supported GNSS source, published with source, fix quality and freshness; loss of fix is shown explicitly and never hidden or interpolated as valid. | `OPEN` — GPS publishing code exists; no executed test record | H-05, P-10 |
| CD-06 | Compatible NMEA data intake | Documented NMEA 0183 sentence types are parsed and published only after a recorded test; parsing is stated as sentence parsing, never as conformance to the NMEA 0183 standard. | `PARTIALLY_VERIFIED` — MWV/MWD parser has executed unit tests; other sentences `OPEN` | H-04, P-10 |
| CD-07 | Signal K interoperability | The appliance consumes and publishes Signal K paths as a documented local contract; compatibility is per source, firmware version, path and direction, and Signal K is never presented as a blanket guarantee. | `OPEN` — publish/subscribe patterns exist; no product test, no authentication | H-04, P-02 |
| CD-08 | Instrument data normalisation | Every supported input is mapped to one documented vocabulary with SI units, timestamps, source and quality/staleness flags, so NAV, DISPLAY and the dashboard see the same model. | `OPEN` — contract shapes exist; quality-flag propagation into displays is absent | P-02, P-10 |
| CD-09 | AIS data integration | Receive-only AIS targets from a compatible receive-only source, shown with identity, position, course/speed and freshness. Never transmits, never presented as collision avoidance or a transponder; AIS-derived retention and redistribution rights are not granted. | `BLOCKED` — reception-data rights and product evidence pending | D-09, P-02 |
| CD-10 | Wind | Apparent and true wind from a compatible source, with units, quality and freshness; a lost wind source becomes an explicit stale state, not a plausible-looking number. | `PARTIALLY_VERIFIED` — parser unit tests; real sensor and calibration tests outstanding | H-05, P-10 |
| CD-11 | Depth where available | Depth from a compatible source where the installation provides one; displayed with source and age; never a substitute for the vessel's required depth equipment, and loss of depth shows "unknown", never zero. | `OPEN` — no depth integration test exists | H-05, P-02 |
| CD-12 | Battery and utility | Battery voltage/state and utility conditions where measured by compatible sources; presented as operational information with thresholds and history, with no claim of preventing damage or guaranteeing availability. | `OPEN` — no measured sensor integration exists | H-05, P-10 |
| CD-13 | Local data distribution | One documented local vessel-data interface (paths, units, directions and rates) served on the vessel network; read-mostly by design, with any write operation enumerated, bounded and separately approved. | `OPEN` — interface defined, not productised | P-02, H-02 |
| CD-14 | Onboard network access | The appliance serves owners and compatible MAREA products on the vessel's local network, with an access-control model that replaces today's unauthenticated service trust model before any field use. | `BLOCKED` — security model not built | H-02, H-13 |
| CD-15 | Local dashboard access | A browser-based local dashboard showing live data, source health, stale states, basic alerts and configuration, available without the commercial website. | `OPEN` — no product dashboard exists | P-02 |
| CD-16 | Connection diagnostics | Per-source status, last message time, message rate, quality, error counters and a plain-language remedy, intended for both owner and installer. | `OPEN` — required new development | P-02 |
| CD-17 | Installation status | A permanent record of installation type, installer reference, checks performed, date and software version, used by support and warranty. | `OPEN` — installer record defined, no system exists | P-02, H-07 |
| CD-18 | Device identity | A unique unit identity and serial, registered to a vessel and owner, with secure binding. No identity, registration or provisioning system exists today. | `BLOCKED` — new development | X-07, P-02 |
| CD-19 | Configuration experience | Guided local configuration with safe defaults, per-source labelling and mapping, preview before apply, and no hidden remote configuration. | `OPEN` — UX not built | P-02 |
| CD-20 | Supported local data retention | Local history kept for a published retention window with export and delete; retention limits, storage behaviour and privacy model defined before sale. | `OPEN` — policy and implementation absent | X-07, P-02 |
| CD-21 | Offline functionality | Ingest, normalisation, dashboard, diagnostics, alerts, configuration, history and recovery all work with no connection to the commercial website; loss of that connection must not interrupt safety-relevant local functions. | `OPEN` — design requirement; must be verified by test | P-02, H-13 |
| CD-22 | Safe failure behaviour | Fail-visible and fail-local: missing or stale sources shown as unknown with age, never fabricated; power loss and reboot are designed for recovery; because HUB has no steering output, a HUB failure cannot move the helm. | `OPEN` — behaviour must be designed and tested | P-02, H-13 |
| CD-23 | Updates | Signed firmware/software update with rollback, so a failed update leaves a recoverable unit; the support window and vulnerability-handling process are published before sale. | `BLOCKED` — CRA-compliant update process absent | H-13 |
| CD-24 | Backup and configuration recovery | Configuration export and import, a documented factory reset, and recovery after power loss that preserves or restores the working configuration. | `OPEN` — required new development | P-02 |
| CD-25 | Ownership transfer | A documented procedure to rebind a unit to a new owner and vessel, revoke prior account access and state the warranty position, without destroying the boat's configuration evidence. | `BLOCKED` — no ownership/identity system | X-07 |
| CD-26 | Professional installation | The full service chain in §7, required outside the documented self-install set, with an installation record and handover. | `OPEN` — service design; `BLOCKED` no installer network | X-05, X-06 |
| CD-27 | Warranty and replacement | Statutory guarantee plus written contractual warranty, fault-return/replacement process and spares position published before sale. | `BLOCKED` — terms and seller identity absent | X-02, H-13 |
| CD-28 | Support and diagnostics | Support can interpret an owner-exported diagnostic bundle without remote control of the vessel; support hours, channels and escalation are defined. | `OPEN` — process not built | X-05, H-13 |

---

## 5. Edition architecture — MAREA HUB Standard and MAREA HUB Pro

### 5.1 The intended customer-value boundary

| Difference | MAREA HUB Standard | MAREA HUB Pro |
| --- | --- | --- |
| Intended customer | Owner modernising one vessel with a mixed legacy installation inside a documented base envelope | Owner or integrator with a denser, more varied or more demanding installation; professional retrofits with higher diagnostics expectations |
| Validated interface / connection envelope | Base envelope, fixed after hardware design and physical tests (`OPEN` composition) | Extended envelope, adding interface families validated only on the Pro configuration (`OPEN` which) |
| Integration capacity | Base number of concurrent supported sources/streams, frozen at hardware design (`OPEN` value) | Larger validated concurrent capacity (`OPEN` value) |
| Configuration and diagnostics depth | Guided configuration, source status, error counters, installation record | Adds per-source history, deeper diagnostic export and installer-level checks (`OPEN` exact scope) |
| Installer tooling and support depth | Standard installation record and standard support | Extended installer tooling and deeper technical support channel (`OPEN` terms; no response-time promise) |
| Price hypothesis (internal only) | EUR 349 — `HYPOTHESIS_UNAPPROVED` | EUR 499 — `HYPOTHESIS_UNAPPROVED` |
| Final ports, protocols, radio features, processor | `OPEN` product-engineering requirement | `OPEN` product-engineering requirement |

### 5.2 What Standard cannot do that Pro can

Standard does not include the extended validated interface and connection envelope, the larger
integration capacity, or the deeper diagnostics and installer tooling. In practice a Standard buyer
whose equipment inventory falls outside the base envelope has three outcomes: choose Pro, accept a
specialist assessment, or be told that HUB is not the right product for the installation. That answer is
part of the offer, not a failure of it.

Pro is therefore not "a faster box" and not "more powerful". It is the edition that can be *installed,
diagnosed and supported* across a broader, individually evidenced equipment set, and it gives the
installer better evidence to commission the vessel and resolve faults without guesswork.

### 5.3 Why the EUR 150 difference is a commercial hypothesis, not a fact

The intended value of the difference is: fewer return visits and less improvisation during
commissioning; headroom to add a source later without changing the appliance; and diagnostics depth that
reduces support time and owner uncertainty. Whether owners and installers value that at EUR 150 is a
`HYPOTHESIS_UNAPPROVED` to be tested against real BOM, real conformity cost and real installation data.
The final difference will be set after hardware freeze and bottom-up costing (H-05, H-07, X-05), and the
edition boundary must be capable of being proven in the published compatibility matrix. It must not be a
software toggle designed to force an upsell.

### 5.4 Edition decisions still open

The final SKU port set, protocol set, radio presence and processor specification are `OPEN`
product-engineering requirements to be frozen after hardware design and physical tests (P-02, H-05,
H-07). Also open: whether a Standard unit can be upgraded to Pro by licence, by hardware change or only
by replacement; whether Pro carries a different support term; and how the edition boundary is described
in the published matrix. None of these may be invented in copy.

---

## 6. Compatibility policy and the published matrix

### 6.1 Principles

1. Compatibility is a claim about a **device, a firmware/software version, a message or data type and a
   direction**, backed by a recorded test — never about a protocol name or a brand.
2. The published compatibility matrix is the single authority. If a device is not in the matrix, the
   answer is "not assessed", not "probably works".
3. No universal-compatibility claim may be made: compatibility is published per device, per version and
   per direction, and nothing is implied by a protocol name.
4. NMEA 2000 status is unresolved and therefore absent from supported claims (H-04, DEC-05). There is no
   NMEA licence, no manufacturer/product code, no NMEA certification and no NMEA 2000 implementation —
   only type stubs in the audited source. No certification or operational compatibility claim is made
   while that decision is open.
5. Signal K is not a blanket guarantee. Signal K consumption/publishing is unencumbered at the
   specification level, but a product claim still needs per-device, per-path, per-direction test
   evidence.
6. NMEA 0183 sentence parsing is not conformance to the NMEA 0183 standard. Copy may say "parses
   NMEA 0183 sentences of the types listed" only after a documented test, and must not state or imply
   NMEA 0183 conformity or certification.
7. There is no public automatic steering or autopilot control path. HUB is never the steering
   controller, exposes no engage/helm/actuator command, and must not reuse the unauthenticated autopilot
   control plane (H-02).
8. Every published row carries a support status and an evidence reference; missing facts are marked as
   not assessed, never left as an unexplained placeholder.

### 6.2 Mandatory published matrix columns

| Column | What it must contain | Publication rule |
| --- | --- | --- |
| Protocol | The protocol family and, where applicable, the specific sentence, PGN or Signal K path group | No protocol row without test scope |
| Device category | Category such as GNSS receiver, wind instrument, depth sounder, battery monitor, AIS receiver, instrument display, autopilot status source | Category alone never implies compatibility |
| Manufacturer and model (where verified) | Exact manufacturer and model recorded during testing | "Unknown model" is published as unknown, never guessed |
| Firmware / software version | The tested version and the supported version range | Compatibility is not claimed across versions that were not tested |
| Supported data | The data types and fields actually exchanged | Data outside the list is unsupported |
| Read / write direction | Read-only, write, or both, stated explicitly | Any write path requires separate approval and security review |
| Known limitations | Rates, units, latency, missing fields, conditions that break it | Limitations are published, not hidden in support |
| Required adapter / cabling | The exact documented adapter or cable item needed | No compatibility without the required item stated |
| Installation conditions | Any vessel, power, network or configuration condition required | Conditions are part of the claim, not fine print |
| Evidence | Test record reference, date, test configuration | An unevidenced row is not published |
| Support status | `SUPPORTED_EVIDENCED`, `ASSESSED_INSTALLER_ONLY`, `NOT_SUPPORTED`, `UNKNOWN_NOT_ASSESSED` | Vocabulary below; no other status is used |

### 6.3 Support-status vocabulary

| Status | Meaning | Customer answer |
| --- | --- | --- |
| `SUPPORTED_EVIDENCED` | Tested in the stated configuration and direction; row complete | "This configuration is listed as supported" |
| `ASSESSED_INSTALLER_ONLY` | Technically plausible, but requires on-vessel assessment by an installer; no general claim | "Requires specialist assessment" |
| `NOT_SUPPORTED` | Tested and does not work, or excluded by design | "Not supported" |
| `UNKNOWN_NOT_ASSESSED` | Never tested; no claim either way | "Not assessed" |

### 6.4 NMEA 2000 — explicit statement for copy and support

NMEA 2000 is not implemented and not certified in MAREA HUB. The audited source contains type
declarations and disabled stubs only; NMEA's official position requires a licence agreement, manufacturer
and product codes and certification before a product may be described with an NMEA 2000 certification
claim. MAREA HUB makes no such claim, and the compatibility matrix will not list NMEA 2000 as supported
while H-04 and DEC-05 are open. If the company later licenses and certifies, the matrix row may be added
only with the certificate and a recorded test. If not, NMEA 2000 language is retired from all HUB copy.

### 6.5 No control path

HUB has no steering, autopilot, actuator or helm-control capability, and none is planned. Any future
read-only display of autopilot status would be a separate, explicitly approved interface with its own
security review; the unauthenticated autopilot command API must never be reused or exposed through HUB
(H-02). This is a product boundary, not a missing feature.

---

## 7. Installer proposition and self-install boundary

### 7.1 The intended full service chain

| Step | What happens | Customer-visible outcome | Status |
| --- | --- | --- | --- |
| 1. Pre-sale vessel questionnaire | Owner describes vessel, current equipment, goals, location and installation preference | A clear starting point and expected next step | `OPEN` — configurator not built |
| 2. Equipment inventory | Devices, models, firmware where obtainable, existing network and power context recorded | The boat's actual equipment list, in writing | `OPEN` |
| 3. Compatibility assessment | Each item mapped to the published matrix; unsupported items named | Supported / conditional / not supported verdict | `BLOCKED` — matrix not yet evidenced (P-02) |
| 4. Installation proposal | Scope, materials, responsibilities and a quotation prepared for that vessel | A written, vessel-specific proposal | `OPEN` — no installer agreements |
| 5. Required materials | Adapters, cabling and accessories identified from the assessed inventory | Exact list, no improvisation later | `OPEN` — accessory list not frozen (H-07) |
| 6. Scheduled installation | Installer performs the physical installation | Appointment and installation record | `BLOCKED` — no installer network |
| 7. Configuration | Sources discovered, labelled, mapped; vessel profile created; snapshot written | A configured, documented installation | `OPEN` |
| 8. Function checks | Each claimed data path and the dashboard verified on the vessel | A checks list signed off | `OPEN` |
| 9. Customer handover | What works, what does not, limitations, offline behaviour, support route | Owner understands the real system | `OPEN` |
| 10. User training | Short structured training on dashboard, diagnostics, updates and export | Owner able to use and diagnose basic issues | `OPEN` |
| 11. Support and warranty responsibility | Named boundary between installer, EMBARCARTE support and warranty | One accountable route, no finger-pointing | `BLOCKED` — terms and legal identity absent (X-02, X-05) |
| 12. Later upgrades | Documented path to add sources, sensors, AIS, DISPLAY, editions | Predictable expansion, not a dead end | `OPEN` — edition upgrade mechanics (F21) |

### 7.2 Self-install versus professionally installed

| Aspect | Self-install configuration | Professionally installed configuration |
| --- | --- | --- |
| When permitted | Only when the questionnaire deterministically confirms a documented low-risk configuration requiring no vessel electrical modification beyond documented connection steps | Every other configuration, and any installation the owner prefers to delegate |
| Who does the work | Owner, following the published setup guide | EMBARCARTE-authorised installer/refit yard |
| What the owner receives | Appliance, guide, configuration snapshot, diagnostic export route | The full chain in §7.1 plus installation record and handover |
| Support boundary | EMBARCARTE supports the product and documented steps; vessel wiring and third-party devices remain the owner's responsibility | EMBARCARTE and the installer share a defined boundary; workmanship is the installer's responsibility |
| Claimed duration / price | None — not measured | None — quotation per vessel, not measured |
| Current availability | `NOT_FOR_SALE` | `NOT_FOR_SALE`; installer network does not exist |

No installer certification scheme, competence register, service-level agreement or measured installation
time exists. No technician-certification claim and no installation-time or installation-price figure may
be made until those artefacts exist.

---

## 8. HUB customer journeys

### J1 — Owner modernising a vessel with mixed legacy instruments
**Situation.** A 10–14 m sailing yacht or motor cruiser with an older plotter, separate wind and depth instruments, a battery monitor and no coherent data layer. **Finished experience.** The owner completes the questionnaire, receives a compatibility verdict, buys an assessed configuration and gets an installation in which every supported source appears once, in one dashboard, with stale values shown as stale. Working instruments stay in place. **Entitlement and support boundary.** Product support and documented setup are included; third-party instrument repair is not. Expansion into NAV, AIS or SENSE is a separate purchase. **Status.** `OPEN`; no reference installation exists (X-06, P-02).

### J2 — Competent owner self-installing a documented low-risk configuration
**Situation.** An owner with electrical competence and a simple, already compatible equipment set wants to avoid installer cost. **Finished experience.** The questionnaire confirms the configuration is inside the self-install set; the owner follows the published guide, labels sources, writes a snapshot and runs the function checklist. If anything is outside the documented set, the flow stops and offers a specialist assessment rather than asserting compatibility. **Entitlement and support boundary.** Support covers the product and documented steps; it does not cover owner wiring or third-party devices, and a self-installed fault that requires on-vessel diagnosis is chargeable under terms to be defined. **Status.** `OPEN`.

### J3 — Professional installer performing a retrofit
**Situation.** An independent marine electronics installer takes on a vessel with undocumented or partly failing equipment and needs a repeatable integration product. **Finished experience.** The installer uses the compatibility assessment, the installer tooling, the diagnostic export and the installation record to scope, install, commission and hand over without inventing interfaces. Pro is the natural edition for denser installations. **Entitlement and support boundary.** The installer owns the installation and first-line support; EMBARCARTE owns product support, matrix authority and warranty policy; the commercial terms between them are `OPEN`. **Status.** `BLOCKED` — no installer agreements or tooling exist (X-05, X-06).

### J4 — Marina or maintenance company standardising several vessels
**Situation.** A marina or boat-maintenance company wants a consistent data layer and support path across a small fleet. **Finished experience.** Each vessel is assessed and configured individually; the company receives comparable installation records and a single support relationship rather than four ad-hoc integrations. Edition and quantity terms would be quoted, not taken from a hypothesis price. **Entitlement and support boundary.** This is a B2B quotation and contract path; FLEET is a separate SaaS product and is not implied by buying HUB. **Status.** `OPEN`; no B2B discovery or terms exist (X-06, X-05).

### J5 — Ownership transfer on sale of the vessel
**Situation.** The vessel is sold and the new owner needs the HUB rebound, prior account access revoked and the local configuration and data status documented. **Finished experience.** A documented transfer procedure moves the registered owner, keeps the installation record with the vessel, and tells the new owner what remains under warranty and what does not. **Entitlement and support boundary.** Warranty does not reset on transfer; support route and any paid-service terms transfer only as published. **Status.** `BLOCKED` — no device identity, registration or transfer system exists (X-07, P-02).

---

## 9. Acceptance scenarios

All scenarios are `NOT_EVALUATED`. None is claimed to pass. Each requires a recorded test result before it
may be described as behaviour.

| ID | Scenario | Given | When | Then | Classification | Evidence required |
| --- | --- | --- | --- | --- | --- | --- |
| AS-01 | Compatible device connected | A device listed as supported in the published matrix, with the stated firmware and adapter | It is connected and configured | The appliance discovers it, presents the supported data with source and freshness, and the matrix row matches observed behaviour | `NOT_EVALUATED` | Device-level test record with version and direction |
| AS-02 | Unsupported device connected | A device not listed in the matrix | It is connected or its data arrives | The appliance does not claim support; the data is shown as unsupported or unknown, and the flow offers a specialist assessment | `NOT_EVALUATED` | Negative test record and UI state evidence |
| AS-03 | Local network loses internet | A functioning installation with the commercial website unreachable | The internet connection is removed | Ingest, normalisation, dashboard, diagnostics, configuration, history and recovery continue; only remote/cloud functions are unavailable; safety-relevant local functions are unaffected | `NOT_EVALUATED` | Controlled network-loss test with recorded behaviour |
| AS-04 | Sensor stops sending valid values | A supported source that was publishing valid data | It stops or sends invalid/stale data | The value becomes stale or unknown with age, no fabricated value appears, and the dashboard and any alert reflect it | `NOT_EVALUATED` | Fault-injection test record |
| AS-05 | Installer diagnoses an installation | An installation with a known fault | The installer opens diagnostics | Per-source status, last message, rate, error counters and a diagnostic export are produced, sufficient to identify or escalate the fault | `NOT_EVALUATED` | Installer usability test on a real vessel |
| AS-06 | Device factory-reset | A configured appliance with a recorded installation | The factory reset is performed | Documented defaults return, the configuration can be restored from backup, and the identity/ownership state follows the documented procedure | `NOT_EVALUATED` | Reset and recovery test record |
| AS-07 | Firmware update fails safely | A unit with a known working version | An update is interrupted or fails verification | The unit returns to the last working version and does not become unusable | `NOT_EVALUATED` | Interrupted-update and rollback test record |
| AS-08 | Ownership transferred | A registered unit on a vessel being sold | The transfer procedure is executed | The new owner is registered, prior access is revoked, the installation record stays with the vessel, and the warranty position is stated | `NOT_EVALUATED` | End-to-end transfer test with account evidence |

---

## 10. Traceability annex — blockers and evidence required before sale

### 10.1 Mandatory HUB blocker mapping (contract §9)

| Blocker | What it means for MAREA HUB | Closed only by |
| --- | --- | --- |
| H-02 | The on-board autopilot command API is unauthenticated, binds all interfaces and accepts steering commands; it must never be reused or exposed by HUB, and any local service trust model must be replaced | Authentication/authorisation and network-binding policy, capability tokens, command audit, safety interlock, and evidence that HUB cannot reach any steering command |
| H-04 | NMEA 2000 is not implemented (type stubs only); NMEA requires licence, manufacturer/product codes and certification for products reading or transmitting NMEA 2000 | DEC-05 decision: either NMEA membership/licence, codes and certification with a testable product, or scope reduction to NMEA 0183/Signal K with NMEA 2000 language retired |
| H-05 | No physical build, measurement, environmental or EMC evidence exists | Prototype BOM, bench measurements, thermal/ingress/vibration tests, EMC pre-scan on the actual article |
| H-06 | CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA obligations are not started; no EU declaration of conformity, test report or notified-body certificate | Per-SKU applicability review, harmonised standards, accredited laboratory tests, technical file, EU declaration of conformity, producer registrations |
| H-07 | No BOM, supplier quotes, manufacturing or traceability evidence | Real RFQs, approved vendor list, part numbers/revisions, lifecycle commitments, serial traceability |
| H-13 | CRA obligations: reporting duties already apply and main obligations follow; no vulnerability handling, secure update, SBOM or incident reporting exists | Security-by-design process, coordinated vulnerability disclosure, signed update with rollback, SBOM, incident reporting, conformity route |
| P-02 | Architecture and data contract are reusable, but there is no product hardware, no certified interface and the control plane is unauthenticated | Frozen hardware design and supported protocol matrix with test evidence |
| P-10 | Engineering reuse is inventory-level; 10 capabilities are implemented-not-fully-tested, 1 simulated-only, 3 not found; Node/TypeScript suites are unexecuted (214 unit, 3 Playwright not verified) | Reproducible build/test environment, CI parity, executed test report per reused module |
| S-06 | Signal K container image is pinned by mutable tag, not digest; image-level package licences are not enumerated | Digest pin, image SBOM, Apache-2.0 NOTICE retention, support position |
| X-01 | MAREA is a proposed brand; no trademark clearance; an existing "Marea Marine" is a risk signal, not an infringement finding | EUIPO/OEPM clearance and filing before any brand publication |
| X-05 | No BOM, supplier quotes, data-provider prices, connectivity costs or channel terms; no approved price | Real quotes, bottom-up costing and an approved price list |

Supplementary references used above and to be reconciled with the other dossiers: L-01–L-03 (no inbound
notice grant from the source project; commercial reuse needs written permission), D-09 (AIS-derived
traffic retention/redistribution is not established) and X-07 (device identity, provisioning, ownership
transfer and privacy model absent).

### 10.2 Exact evidence required before any HUB sale

- Frozen BOM with manufacturer part numbers, revisions and suppliers, and a serial/traceability scheme
  (H-05, H-07).
- Bench, electrical, thermal, ingress and EMC test evidence on the actual article, plus pre-compliance
  measurement before formal testing (H-05, H-06).
- Conformity route and EU declaration of conformity per SKU, with the applicable regimes identified
  (H-06); LVD position re-assessed at BOM freeze if any SKU bundles a mains supply.
- GPSR safety case, risk analysis, technical documentation and economic-operator identification (H-06).
- RoHS material declarations and WEEE producer registration for the selling entity (H-06).
- CRA conformity: vulnerability handling, secure update with rollback, SBOM, incident reporting and
  secure-by-default configuration (H-13).
- Protocol and device test matrix with firmware versions, directions, limitations and evidence records
  (P-02); NMEA 2000 decision recorded as licensed-and-tested or retired (H-04, DEC-05).
- Installer validation: reference installations, measured installation hours, tested update and
  backup/recovery, documented self-install set (X-05, X-06).
- Real supplier quotes, bottom-up costing, approved price list and channel terms (X-05).
- Written warranty and support terms, seller legal identity, privacy assessment for device identity and
  history (X-02, X-07).
- Brand clearance before any customer-facing publication (X-01); source-IP clearance and notice bundle
  before distribution (L-01–L-03, S-06).

No HUB SKU may be orderable while these are missing. The lifecycle gate for sale is `REGULATORY_READY`
then `OPERATIONS_READY` with an approved SKU — not merely a published specification.

---

## 11. Local-first architecture and required disclaimers

### 11.1 HUB is local-first — binding product rule

MAREA HUB is a local-first appliance. **Loss of the commercial website connection must not interrupt
safety-relevant local functions.** Local ingest, normalisation, the local dashboard, connection
diagnostics, installation status, configuration, local history and recovery all operate on the vessel
without any connection to the EMBARCARTE commercial website or to any cloud service. No licence check,
entitlement refresh, telemetry upload or remote configuration may be placed on the critical path of those
functions. Where a remote or cloud feature is unavailable, the product states that clearly and keeps
operating locally. This rule is a design requirement and is not yet verified; it is tracked in CD-21 and
blocked by P-02/H-13.

### 11.2 Navigation and instruments disclaimer — verbatim, ES and EN

Required on every surface showing position, charts, traffic, depth or weather, in the product's language,
localised and not paraphrased:

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo
  reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La
  responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's
  required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always
  rests with the skipper."

### 11.3 AIS receive-only disclaimer — verbatim, ES and EN

Required wherever HUB presents AIS-derived traffic:

- ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un
  sistema de evitación de colisiones ni un transpondedor.»
- EN: "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance
  system and not a transponder."

### 11.4 Brand attribution — verbatim, ES and EN

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

No customer-facing surface may present MAREA HUB as certified, approved, available, priced or
navigation-grade while `brandPublication = NOT_GRANTED` and `availability = NOT_FOR_SALE`.

---

## 12. Cross-product reconciliation with NAV, AIS, DISPLAY and SENSE

| Product | What must match the HUB dossier | Reconciliation status |
| --- | --- | --- |
| MAREA NAV | The local vessel-data interface contract (paths, units, quality flags, directions); NAV is standalone and does not require HUB; NAV compatibility statements may not exceed the HUB matrix | `OPEN` — interface contract to be agreed in D5 (compatibility) and NAV dossier review |
| MAREA AIS | HUB consumes receive-only AIS only; AIS remains receive-only, never a transponder or collision-avoidance system; AIS-derived retention/redistribution is not granted (D-09); HUB is not an AIS product; target age and stale/lost states use the same vocabulary as the AIS dossier | `OPEN` — shared AIS data-rights wording, target-state vocabulary and disclaimer ownership to confirm with the AIS dossier |
| MAREA DISPLAY | DISPLAY consumes the same local interface and must not imply HUB-only capabilities; a HUB failure must leave DISPLAY's own navigation display usable | `OPEN` — no DISPLAY dossier agreement yet |
| MAREA SENSE | SENSE modules expose only tested measured signals; compatibility is per module and firmware; HUB does not invent sensor accuracy or calibration claims | `OPEN` — sensor capability list not frozen (P-05) |
| MAREA PILOT | No integration of HUB into steering or actuator control; no reuse of the autopilot control plane; no HUB copy may imply a steering capability | `DECIDED` as a product boundary in this dossier; H-02 remains open |
| MAREA WATCH / FLEET | HUB local data is not redistributed to shore services without an explicit, consented service; no double billing between HUB local functions and any monitoring subscription | `OPEN` — service architecture not defined |

Additional items for the shared compatibility-matrix deliverable (D5) that this dossier leaves to be
frozen with the NAV and AIS owners: the exact local interface contract (paths, units, quality flags and
directions); the shared stale/lost and target-age vocabulary; the supply of own-vessel position, COG and
SOG to any AIS computation layer; the receive-only AIS local transport and the Signal K path where tested;
and the AIS-derived retention limits (D-09). None of these may be asserted as agreed until D5 records
them.

---

## 13. Non-assertions and document status

This dossier does **not** assert, and must not be read as asserting: CE marking, an EU declaration of
conformity, EMC/RED/LVD/GPSR/RoHS/WEEE/CRA compliance or assessment; NMEA 2000 certification, licence,
implementation or operational compatibility; NMEA 0183 conformance; Signal K compatibility certification;
AIS type approval or transmission; any notified-body or laboratory certificate; any test report, bench
measurement, thermal/ingress result or sea trial; any supplier quote, BOM, cost or approved price; any
installation measurement, installation duration or installation price; any stock, lead time or
availability; any sales, customer count, review or testimonial; any trademark clearance; any certification
of installers; and any steering, autopilot or remote helm capability.

Status of this deliverable: `INTERNAL`, `COMPLETE_TARGET_SPECIFICATION`, `NOT_FOR_SALE`. It defines the
finished commercial product and the evidence that would prove it. It does not make MAREA HUB orderable,
publishable, certified, priced or supported, and it does not replace the MC-13-HUB verification gate or
any conformity assessment.
