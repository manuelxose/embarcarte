# MAREA DISPLAY — complete final-product commercial specification (MC-07 / D1-DISPLAY)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D1-DISPLAY |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Product | MAREA DISPLAY (DISPLAY); editions MAREA DISPLAY 7 (DISPLAY-7) and MAREA DISPLAY Large, conditional (DISPLAY-LARGE-CONDITIONAL) |
| Owner function | Product Management — DISPLAY Product Director (author function for this dossier) |
| Status | INTERNAL / COMPLETE_TARGET_SPECIFICATION / NOT_FOR_SALE / NOT_PUBLISHED |
| Lifecycle state | DEFINED (binding vocabulary, docs/marea/products/README.md §3) |
| Branch | feature/marea-mc07-display-weather-fleet-products |
| Date | 2026-10-30 |
| Contract authority | docs/marea/products/README.md §1–§23; the MC-07 shared conventions brief (docs/marea/execution/DECISION-LOG.md records related decisions) |
| Companion annex | docs/marea/products/DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md (D-HW; hardware, interaction, environmental and conformity evidence plan) |
| Customer copy | docs/marea/products/copy/display.es.md and docs/marea/products/copy/display.en.md |
| Publication / sale | None. No price is approved, no SKU is orderable, no page may be published while the brand, data-rights and conformity gates remain open |

This dossier defines the finished commercial product MAREA DISPLAY, not a tablet app, not a browser kiosk and not a
hardware prototype description. It fixes the customer experience, the commercial layers, the edition boundary, the
integration contract, the evidence labels and the physical gates that must close before anything may be sold.
A complete specification is not readiness, and readiness is not availability.

MAREA DISPLAY is a **physical marine multifunction display**: a panel, a compute module, storage, an enclosure, a
mounting system, power conversion and protection, marine connectors and harness, a dedicated operating environment
and the base software that presents navigation, instruments, received AIS, licensed data layers and the approved
status surfaces. It is the device; MAREA NAV is the navigation software; the two are distinct products with a
planned integration. The intended product has no measured screen size, no selected hardware, no established bill
of materials and no certification of any kind. Those are truthful states, not defects of this document.

## 0. Contents

1. Status block — complete specification, zero commercial readiness
2. Canonical field block (convention)
3. The 24 canonical fields (F01–F24)
4. F04 capability-domain register — 38 mandatory final domains
5. Product boundary — commercial layers, NAV versus DISPLAY, included base software versus separately licensed items
6. Integration contract — HUB, SENSE, AIS, NAV, WEATHER, PILOT, WATCH
7. Edition architecture — DISPLAY-7 and DISPLAY-LARGE-CONDITIONAL
8. Price decomposition — the EUR 699 starting hypothesis with no fabricated figures
9. Physical release gates — the evidence required before any display claim
10. Accessibility, human factors and the MC-04 contrast evidence (design evidence only)
11. Local behaviour under degraded conditions
12. Acceptance scenarios — DISPLAY-AC-01 to DISPLAY-AC-20
13. Traceability annex — MC-02 blockers and the evidence required before sale
14. Ecosystem, cross-sells and cross-product authority
15. Required disclaimers — verbatim, ES and EN
16. Non-assertions and document status

---

## 1. Status block — completely specified, not for sale

### 1.1 Product-level status

| Dimension | Value |
| --- | --- |
| PRODUCT_DEFINITION | COMPLETE_TARGET_SPECIFICATION |
| ENGINEERING_READINESS | NOT_VERIFIED — the MC-02 audit is the only engineering evidence; there is no display hardware, no enclosure, no embedded runtime and no tested integration |
| COMMERCIAL_AVAILABILITY | NOT_FOR_SALE |
| BRAND_CLEARANCE | NOT_GRANTED — MAREA is a proposed brand; no trademark clearance exists (X-01) |
| SOURCE_IP_CLEARANCE | NOT_CLEARED — no reuse right from the source project and no DISPLAY-specific licence |
| PUBLICATION_STATE | INTERNAL_ONLY |

### 1.2 Per-dimension readiness (never collapsed into one flag)

The nine frozen readiness dimensions for DISPLAY are reproduced exactly; none may be upgraded by this dossier.

| Dimension | DISPLAY value | Evidence and scope |
| --- | --- | --- |
| definition | COMPLETE_TARGET_SPECIFICATION | This dossier: all 24 fields, 38 capability domains, 20 acceptance scenarios, companion hardware annex |
| engineering | NOT_VERIFIED | P-07: no display hardware or enclosure; the audited UI is a browser application, not an embedded MFD runtime (docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md §3.4; docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md §2) |
| licensing | NOT_CLEARED | No source-IP clearance (L-01–L-03 remain open); no chart, weather, basemap or embedded-OS licence |
| hardware | NOT_SELECTED | H-11: no display, panel, compute module or cellular hardware exists; H-05: no physical build, measurement or EMC evidence |
| dataRights | NOT_GRANTED | D-01 (official charts), D-05 (weather overlays), D-06 (basemap), D-10 (external data generally) are all open |
| compliance | NOT_STARTED | H-06: CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA obligations not started; H-13: CRA vulnerability handling and secure update absent |
| pricing | HYPOTHESIS_UNAPPROVED | EUR 699 is an internal starting hypothesis only; no BOM, no supplier quote, no costed net revenue |
| brandPublication | NOT_GRANTED | X-01; no customer copy in this milestone is publishable |
| availability | NOT_FOR_SALE | No SKU, no stock, no order flow, no installation network, no service operation |

### 1.3 Evidence classes used in this dossier

| Class | Meaning here |
| --- | --- |
| VERIFIED_REPO | Verifiable in this repository; a path is cited |
| VERIFIED_EXTERNAL | Verifiable at a cited public source with a check date of 2026-10-30 |
| ASSUMPTION | An explicit planning assumption, not evidence |
| HYPOTHESIS | A commercial or price assumption awaiting approval |
| OPEN | Fact not yet established; the intended customer experience is still specified |
| BLOCKED | An external condition (licence, certificate, quote, measurement, agreement) prevents closure |

OPEN and BLOCKED are legitimate values. The prohibited placeholder token is not used anywhere in this dossier and no
field is filled with an unlabelled assertion.

### 1.4 Canonical DISPLAY evidence states

These strings are canonical for batch 03 and may not be upgraded. A design document, a browser mock-up or a plan is
never evidence for any of them.

| State | Value | What it means for every field below |
| --- | --- | --- |
| DISPLAY_HARDWARE | NOT_SELECTED | H-11, P-07: no panel, compute module, enclosure, mount or harness has been selected or built |
| DISPLAY_SIZE | SIZE_NOT_FROZEN | No screen size is measured, chosen, published or implied; "7-inch-class" is a working designation only |
| DISPLAY_BOM | BOM_NOT_ESTABLISHED | H-05, H-07: no bill of materials, supplier quote, revision or serial traceability exists |
| DISPLAY_SUNLIGHT_READABILITY | NOT_MEASURED | No photometric or field sunlight test exists on any article; no nit, contrast-ratio-in-sun or legibility claim may be made |
| DISPLAY_ENVIRONMENTAL | NOT_VERIFIED | No ingress, corrosion, salt-fog, UV, vibration, thermal or EMC test exists on any article; no IP rating or temperature range may be stated |
| DISPLAY_EMBEDDED_RUNTIME | NOT_FOUND | P-07: no dedicated embedded/kiosk runtime exists; the audited UI runs in a browser |
| DISPLAY_UPDATE_ROLLBACK | NOT_FOUND | H-13: no signed update, rollback, SBOM or CRA vulnerability process exists for a display product |
| DISPLAY_INSTALLER_NETWORK | NOT_FOUND | X-05, X-06: no installer programme, installation validation or installation price exists |

### 1.5 The one-message summary

MAREA DISPLAY is completely specified and not for sale. There is no display hardware, no enclosure, no selected
size, no bill of materials, no embedded runtime, no sunlight measurement, no environmental test, no conformity
assessment, no installer network and no approved price. The product is DEFINED, NOT_FOR_SALE and INTERNAL_ONLY, it
is not certified, not tested on a vessel and not orderable. Its EUR 699 figure is an unapproved starting hypothesis.
Those are truthful states, not defects of this document.

### 1.6 What this dossier deliberately does not repeat

Charts, weather, AIS data, connectivity and pilot-boundary details are owned by their own product documents and by
the compliance register. This dossier references them and fixes only the DISPLAY customer experience, the device
boundary and the evidence gates.

---

## 2. Canonical field block (convention)

Every field F01–F24 uses the binding five-line block of docs/marea/products/README.md §6. Definition describes the
finished commercial experience; Evidence labels it; Owner names a function; Blockers / dependencies cites MC-02 ids;
Commercial readiness states one readiness dimension and value. The Definition may describe intended final behaviour
that is not built, and the same block then says so explicitly in Evidence and names the milestone that will evidence it.

---

## 3. The 24 canonical fields

#### F01 - Identity
- **Definition.** MAREA DISPLAY is the dedicated physical display of the MAREA family: a marine multifunction display sold as one article with a panel, a compute module, storage, an enclosure, an approved mounting system, vessel power conversion and protection, marine connectors and harness, a dedicated operating environment and the included base software that presents navigation, onboard instruments, received AIS traffic, licensed data layers and approved status surfaces at the helm. It is a fixed display for a helm or navigation station — not a portable tablet, not a phone application, not a chartplotter with an included chart entitlement and not a safety system. Category: hardware plus software (HARDWARE_SOFTWARE). Family: MAREA. Code: DISPLAY. Editions: MAREA DISPLAY 7 (DISPLAY-7) and MAREA DISPLAY Large, conditional (DISPLAY-LARGE-CONDITIONAL). Positioning: the dedicated screen of the MAREA ecosystem, distinct from MAREA NAV, which is the navigation software and runs on customer devices, and distinct from MAREA HUB, which is the local data gateway. The screen size is not frozen; "7-inch-class" is a working designation for the entry edition and never a measured or published size.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07; VERIFIED_REPO docs/marea/products/README.md §2; VERIFIED_REPO docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md P-07, H-11; OPEN for the final hardware implementation (DISPLAY_HARDWARE = NOT_SELECTED).
- **Owner.** Product management (DISPLAY).
- **Blockers / dependencies.** H-05, H-11, P-07.
- **Commercial readiness.** definition = COMPLETE_TARGET_SPECIFICATION.

#### F02 - Customer segments
- **Definition.** Primary segment: owners of recreational sailing and motor vessels roughly 8–18 m who keep a fixed helm station and want one dedicated, daylight-usable screen instead of a portable tablet held in a cradle. Secondary segment: owners modernising an older boat who keep existing instruments and sensors and want a modern presentation surface without replacing the whole electronics suite. Tertiary segment: small charter and sailing-school operators who want the same helm layout on several vessels. Buying triggers: a helm with no readable dedicated screen; a tablet that overheats, dims or cannot be charged at the helm; a refit that already installs a compatible data source; a new season's coastal cruising; a vessel purchase where the existing plotter is obsolete. Buying objections: "Why not a tablet?", "Will it work with my existing instruments?", "Is the size big enough?", "Can I install it myself?", "What happens to my charts and weather subscriptions?", "What if it fails at sea?", "Is the price justified against a dedicated plotter?". Explicitly not a segment: anyone seeking a certified navigation system, ECDIS, a safety-of-life instrument, a remote helm control or commercial-shipping bridge equipment.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07 (buyer/problem, quality gates); ASSUMPTION on segment priority, buying triggers and objection ranking derived from the portfolio and from docs/marea/brand/MAREA-BRAND-STRATEGY.md; OPEN — no primary customer interviews or validated willingness to pay exist (X-06); MC-09/MC-10 will evidence it.
- **Owner.** Product marketing and commercial development.
- **Blockers / dependencies.** X-06.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F03 - Customer problems
- **Definition.** The problems DISPLAY is designed to remove: (1) a portable tablet at the helm is fragile, hard to read in direct sun, difficult to charge and not fixed to the vessel; (2) existing instruments and a new navigation application live on different screens, so the helm is a collection of displays; (3) an old plotter presents a closed ecosystem and cannot run the owner's chosen software; (4) data shown without source, age or licensing status invites the owner to trust a stale value; (5) a screen that fails in wet or gloved conditions is a screen the owner stops using; (6) a power interruption at the helm reboots the screen into an unknown state; (7) "no cloud" is a legitimate requirement for a boat that leaves coverage. Existing alternatives: a tablet in a waterproof case, a dedicated chartplotter, a laptop below deck, a repeater, or nothing. DISPLAY's answer is a fixed marine display with a dedicated operating environment, daylight and night modes, a named alarm hierarchy, explicit data provenance, a documented startup and recovery behaviour, and a base software set that works locally without any cloud dependency.
- **Evidence.** ASSUMPTION on the problem framing; VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07; VERIFIED_REPO docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md; OPEN for interview evidence (X-06); no competitor test or comparison exists.
- **Owner.** Product management.
- **Blockers / dependencies.** X-06, P-07.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F04 - Complete end-state functionality
- **Definition.** At end state a customer buys a display, has it mounted and connected to vessel power and to the compatible data sources, starts it, selects a vessel profile, and uses it at the helm. The finished product provides the thirty-eight capability domains enumerated in §4: the physical display device and its dedicated operating environment; daylight readability and distinct sunlight and night modes; a responsive instrument layout; approved mounting; vessel power integration; a short, honest startup experience; vessel-profile selection; a local dashboard; navigation presentation; chart display where licensed; position and motion; wind and depth; battery, tanks and utilities; received AIS presentation; traffic alerts and stale-target indication; a weather overlay where licensed; data freshness and source visibility; configurable helm dashboards; touch controls; physical controls where validated; wet/gloved interaction where physically verified; an alarm and advisory hierarchy; power-loss recovery; safe local operation without cloud; configuration backup; update and rollback; local device security; user profiles; installation diagnostics; hardware replacement; service lifecycle; environmental protection; accessibility and human factors; a bilingual interface; and the subscription and software entitlement boundary. It presents information; it never steers, never commands the vessel and never replaces the skipper.
- **Evidence.** OPEN — the intended end-state experience; per-domain evidence in §4; the canonical states in §1.4; VERIFIED_REPO docs/marea/products/README.md §6 F04; VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07. The MC-34 hardware-evidence gate will evidence each domain.
- **Owner.** Product management (DISPLAY) with engineering.
- **Blockers / dependencies.** H-05, H-11, H-13, P-07.
- **Commercial readiness.** engineering = NOT_VERIFIED.

#### F05 - Differentiation
- **Definition.** DISPLAY is intended to be relevant because it combines five things a bare plotter or a tablet does not: (1) a dedicated helm article with an approved mount, vessel power integration and an enclosure intended for a wet marine environment, rather than a consumer device in a case; (2) a dedicated operating environment that boots into the instrument interface, not into a general-purpose desktop; (3) explicit day, sunlight and night modes designed as separate experiences, with the alarm hierarchy visible in all of them; (4) data provenance as a first-class rule — every value carries source, age and stale state, and a licensed layer is shown only where the licence exists; (5) a declared local-first behaviour in which base navigation and instrument presentation continue without cloud, and only separately licensed layers degrade. It is not differentiated by claiming a measured brightness, a sunlight-readable guarantee, a certified performance, a screen size or a comparison with any named competitor; no such claim may be made.
- **Evidence.** ASSUMPTION — differentiation hypothesis; VERIFIED_REPO docs/marea/products/README.md §7 and the MC-07 claim restrictions; VERIFIED_REPO docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md QA-01/QA-26 (design evidence only); OPEN — no product, no measurement and no customer evidence exist (P-07, X-06).
- **Owner.** Product management and commercial strategy.
- **Blockers / dependencies.** P-07, X-05, X-06.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F06 - Editions
- **Definition.** Exactly two edition entries, no third tier. MAREA DISPLAY 7 (DISPLAY-7) is the entry edition: a 7-inch-class working designation for a compact helm display, a complete base configuration with the included base software, one vessel profile active and the standard mounting and power items appropriate to the final hardware. Its size and hardware are not frozen. MAREA DISPLAY Large, conditional (DISPLAY-LARGE-CONDITIONAL) is a future larger-screen family: it is an edition conditional on hardware selection, tooling, sunlight validation, thermal design and a costed bill of materials, and it has no price, no size, no measured specification and no publication. Its name does not choose a size; SIZE_NOT_FROZEN, HARDWARE_NOT_SELECTED and EDITION_CONDITIONAL apply to it. Both editions are DEFINED or CONDITIONAL and neither is sellable. Safety-relevant presentation — the alarm hierarchy, data-freshness display, power-loss state and disclaimers — is identical in both editions and is never edition-gated.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07 (edition intent); VERIFIED_REPO docs/marea/products/README.md §14 (edition verdict vocabulary); HYPOTHESIS edition value split; OPEN — no hardware, size, cost or validation evidence exists (H-05, H-11, X-05).
- **Owner.** Product management (DISPLAY) with commercial strategy.
- **Blockers / dependencies.** H-05, H-11, X-05.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F07 - Included items
- **Definition.** Intended included content for DISPLAY-7, stated before purchase: the display article with its panel, compute module, storage, enclosure and bezel as finally designed; the approved mounting system for the documented installation; the supplied power cable and the power conversion and protection item required by the documented installation; the marine connectors and the harness required for the documented data inputs; the dedicated operating environment and the included base software (device operating environment, local dashboards, instrument presentation, received-AIS presentation, navigation presentation with licensed chart display only where the licence exists, configuration, backup and updates during the warranty period); setup and safety documentation in Spanish and English; the diagnostic and support entitlement; and professional installation only where purchased or required by the configuration. Intended exclusions, stated before purchase: chart coverage and licensed chart data; MAREA WEATHER entitlement; MAREA NAV subscription; MAREA HUB; MAREA AIS receiver; adapters and extra mounts beyond the included item; any transducer, sensor or third-party instrument; installation labour; a network connection or SIM unless a connectivity SKU exists; and any capability not listed in the published compatibility documentation. The full item list is OPEN until the BOM is frozen and no item name is approved today.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07 (included/excluded); OPEN — SKU contents, mount, power item and harness (H-05, H-11, X-05); BLOCKED — no BOM, no supplier terms.
- **Owner.** Product management with hardware engineering and procurement.
- **Blockers / dependencies.** H-05, H-11, X-05.
- **Commercial readiness.** hardware = NOT_SELECTED.

#### F08 - Optional accessories
- **Definition.** Intended optional items, described by function and never given an invented MAREA product name: additional approved mounting items for a second station or a different surface; a sun cover or protective cover; an extension for the power or data harness where the documented installation requires one; a NMEA 0183 or Signal K interface item only where the published compatibility matrix confirms the exact model, firmware and direction; an additional compatible display; MAREA HUB for integration of existing equipment; MAREA AIS for received traffic where supported; MAREA SENSE inputs where supported; and service items such as professional installation, commissioning, extended support and a later edition change. Every optional item is compatible only within the tested matrix. No accessory name is approved, no accessory price exists and no optional item may be presented as included.
- **Evidence.** VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md (accessories are not families or editions); VERIFIED_REPO docs/marea/products/README.md §7 rule 4 (no NMEA 2000 certification or compatibility claim); OPEN — exact accessory list; BLOCKED — H-04, H-05, X-05.
- **Owner.** Product management with procurement.
- **Blockers / dependencies.** H-04, H-05, X-05.
- **Commercial readiness.** hardware = NOT_SELECTED.

#### F09 - Integration
- **Definition.** DISPLAY integration is bounded and evidence-based. The device presents data only from sources that appear in the published compatibility matrix for the exact model, firmware version and direction: a compatible MAREA HUB for onboard equipment aggregation; a compatible MAREA AIS receiver for received traffic; MAREA NAV as navigation software with its own subscription and licensed charts; MAREA WEATHER as a separately licensed data service; MAREA SENSE measurements where compatible; and a read-only MAREA PILOT status/alarm surface where a future authorized interface exists. It does not accept inbound internet control, does not expose an internet-reachable control surface, does not command any steering, motor or autopilot actuator, does not include a cellular radio unless a future SKU declares one, and does not republish data to any shore service by default. No protocol compatibility is claimed: each source is supported only after a recorded test. The integration statuses frozen for batch 03 are reproduced in §6 and none is SUPPORTED.
- **Evidence.** VERIFIED_REPO docs/marea/products/README.md §19 cross-product authority; VERIFIED_REPO docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md §6 and the prohibited control paths; VERIFIED_REPO docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md H-04, P-07; OPEN — no device and no tested integration (P-07).
- **Owner.** Integration owner (DISPLAY Product Director) with engineering.
- **Blockers / dependencies.** H-04, P-07.
- **Commercial readiness.** engineering = NOT_VERIFIED.

#### F10 - Professional installation
- **Definition.** Professional installation is the intended route for every configuration outside a documented low-risk self-install set, and it is always offered. The finished service runs from a pre-sale vessel and helm questionnaire through a documented mounting, power and data assessment, a written installation proposal naming included and excluded items, scheduled installation, commissioning and function checks, owner handover and training, and a permanent installation record. The owner leaves knowing exactly which data sources are presented, which are not, what happens when power or a source is lost, and how to recover the device. Self-install is permitted only where the questionnaire deterministically confirms a documented configuration requiring no vessel electrical modification beyond the published steps; otherwise the result is a specialist assessment or an installer proposal, never an asserted compatibility. Installation duration, installation price and technician certification scheme are OPEN; no certification scheme exists and none may be claimed.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07 quality gates and buying path; ASSUMPTION service design; OPEN — no installer network, no assessment flow and no measured installation exist (X-05, X-06); BLOCKED — DISPLAY_INSTALLER_NETWORK = NOT_FOUND.
- **Owner.** Service operations with the installer network.
- **Blockers / dependencies.** H-05, H-11, X-05, X-06.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F11 - Onboarding
- **Definition.** The intended first-use experience: unbox; confirm the contents against the printed list; mount with the approved item; connect power through the supplied protective item; connect only the documented data source; power on and see a short, honest startup sequence that names the software version and the data sources it found; select or create the vessel profile; confirm the language; set the display for daylight, sunlight or night; complete a guided layout choice from the shipped dashboard presets; run the built-in source and freshness check; and finish with a short safety briefing that restates the disclaimers and explains what to do if a source is missing or stale. A first-run diagnostic produces a human-readable record the owner can show to support. Onboarding never promises a cloud account, never requires a connection to complete first use, and never hides a licence requirement behind a default. The onboarding flow itself is OPEN and will be validated with representative owners before a release decision.
- **Evidence.** OPEN — onboarding UX, manuals and first-run diagnostic not built; ASSUMPTION sequence; VERIFIED_REPO docs/marea/products/README.md §6 F11; VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md §9 (allowed CTA per readiness).
- **Owner.** UX, content and localisation with support engineering.
- **Blockers / dependencies.** P-07, X-06.
- **Commercial readiness.** engineering = NOT_VERIFIED.

#### F12 - Licensing and subscriptions
- **Definition.** MAREA DISPLAY is intended to be sold as a **one-off hardware purchase with included base software**, not as a subscription device. The purchase gives the owner the article and the licence to use its included base software inside the published support and update window: the device operating environment, local dashboards, instrument and received-AIS presentation, navigation presentation, configuration, backup and updates during warranty. **Base software is included and is not edition-gated or subscription-gated.** Separately licensed or separately purchased items are: chart data and coverage (D-01); MAREA WEATHER entitlement (its own product); a MAREA NAV subscription where the owner chooses the NAV software; MAREA HUB; a MAREA AIS receiver; adapters, extra mounts and installation labour; and any future connectivity SKU. No subscription, billing or entitlement service exists for DISPLAY and none is implemented in MC-07; renewal, grace, refund and cancellation rules therefore do not exist for DISPLAY. Subscription isolation is a design requirement where any repeated entitlement is later added: no payment state may ever disable local instrument presentation, the alarm hierarchy, the freshness display, the power-loss state or the disclaimers.
- **Evidence.** VERIFIED_REPO docs/marea/products/README.md §7 rule 8 and §16 rule 7; VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07; OPEN/BLOCKED — no subscription service, no terms of service and no chart or data licence exist (D-01, D-05, D-10, X-05); the WEATHER entitlement model is defined in the WEATHER dossier and is not duplicated here.
- **Owner.** Commercial strategy with legal.
- **Blockers / dependencies.** D-01, D-05, D-10, X-05.
- **Commercial readiness.** licensing = NOT_CLEARED.

#### F13 - Retail and partner pricing
- **Definition.** Internal price hypotheses only, recorded for planning and published nowhere: MAREA DISPLAY 7 has a single starting-price hypothesis of **EUR 699, one-off, VAT-inclusive consumer retail hypothesis**. It is labelled HYPOTHESIS_UNAPPROVED, it is not an inclusive quotation, it is not a "from" offer, not a launch offer, not a reservation and not orderable, and installation is quoted separately. MAREA DISPLAY Large, conditional has **no price**: it is NOT_ESTABLISHED and CONDITIONAL, with SIZE_NOT_FROZEN and HARDWARE_NOT_SELECTED, and may never be published with a price. No partner, distributor, installer or volume price exists; the B2B structure is OPEN and belongs to the pricing and channel deliverable. The decomposition that must be satisfied before EUR 699 can become a real price is in §8; presenting any component figure would invent a BOM or a supplier term.
- **Evidence.** HYPOTHESIS — the DISPLAY figures allowed by the MC-07 brief §4; BLOCKED — X-05 (no BOM, no supplier quotes, no channel terms), H-05; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §6.
- **Owner.** Commercial strategy and pricing with finance.
- **Blockers / dependencies.** H-05, X-05.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F14 - Direct and ongoing costs
- **Definition.** A costing framework with named inputs only, because no figure exists: panel and backlight; compute module and memory; storage; enclosure, bezel and sealing; approved mounting hardware; power conversion and protection; marine connectors and harness; embedded operating environment and any per-unit royalty; assembly, factory test, labelling and serialisation; the conformity programme (EMC, GPSR, RoHS, WEEE, CRA and RED where a radio is included; accredited laboratory, technical file, EU declaration of conformity, producer registrations); freight, packaging and fulfilment; payment fees; warranty accrual; returns and replacement allowance; technical support and installer support; firmware maintenance including security and vulnerability handling; spare-parts and service logistics; customer acquisition; channel margin or installer compensation; and the amortisation of base-software development. Contribution margin is deliberately not computed: presenting one would invent BOM, tooling, conformity, logistics and support data. No supplier quote, tooling quote, laboratory quote or channel agreement exists.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md price and channel decision rule and §07 quality gates; BLOCKED — H-05, H-06, H-07, H-13, X-05; ASSUMPTION on the cost categories.
- **Owner.** Finance and procurement with product management.
- **Blockers / dependencies.** H-05, H-06, H-07, X-05.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F15 - Channel economics
- **Definition.** Intended channel model: direct sale by EMBARCARTE plus authorised professional installers, refit yards and marinas, starting in Galicia and northern Portugal. Responsibility split: EMBARCARTE owns the product definition, the compatibility authority, the included base software, warranty and support policy; the installer owns the vessel and helm assessment, mechanical and electrical work, commissioning, function checks, handover and first-line support, and is accountable for workmanship. The market is entered through an assisted helm and compatibility assessment that ends in a quotation request for professional installation, not in an automatically asserted compatible order. Installer margin, activation fee, service revenue share and volume terms are OPEN; no commission or margin percentage exists, and no installer partnership exists today. Marina and charter sharing is a customer segment, not a channel agreement, and must not be described as a partnership.
- **Evidence.** VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md institutional routes; VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md; ASSUMPTION responsibility split; BLOCKED — X-05, X-06.
- **Owner.** Commercial development with service operations.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F16 - Competitor comparison
- **Definition.** No verified like-for-like comparator of MAREA DISPLAY exists and no competitor has been tested against it. The table below records public official product pages retrieved on 2026-10-30 for four established marine display families. All four are chartplotters sold **with hardware included**; they are not software subscriptions and must never be compared with a MAREA software subscription or treated as a price-parity benchmark. Third-party mechanical and optical figures are that third-party product's published facts, quoted here only as category context; they are never MAREA DISPLAY specifications, and MAREA DISPLAY keeps SIZE_NOT_FROZEN and HARDWARE_NOT_SELECTED. Currency, tax basis, territory, included charts and included hardware differ and are recorded as retrieved. No performance, brightness, resolution, legibility or value comparison is made or implied.

| Brand | Product / edition | Buyer | Key capabilities (as published by the third party) | Retrieved price | Currency | Tax basis | Included hardware | Official URL | Evidence |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| Raymarine | Axiom 7, SKU E70363 | Coastal and leisure helm | 7-inch touch MFD with integrated GPS, quad-core processor, LightHouse OS, Wi-Fi and Bluetooth, radar/sonar/autopilot/instrument integration, Navionics and C-MAP chart compatibility; third-party published 800 x 480, 7.34 W | 901.45 | EUR | IVA incluido (VAT included) | Display unit; transducer not included | https://www.raymarine.com/es-es/nuestros-productos/chartplotters/axiom/axiom | VERIFIED_EXTERNAL (checked 2026-10-30) |
| Raymarine | Element 7 HV | Entry coastal and fishing | 7-inch HV chartplotter in a mature ecosystem | 659.45 | EUR | VAT-inclusive (recorded in docs/marea/MARKET-BENCHMARKS.md with the official URL) | Display unit | https://www.raymarine.com/es-es/nuestros-productos/chartplotters/element/element-hv | VERIFIED_REPO and VERIFIED_EXTERNAL (checked 2026-10-30) |
| Garmin | GPSMAP 723, non-sonar, worldwide basemap | Coastal and offshore helm | 7-inch IPS chartplotter, GNSS, chartplotter/radar/sailing-bundle kits, Navionics+ chart options | 1,199.99 | USD | Tax not stated on the retrieved page (US listed price) | Display unit; charts/basemap variant as listed | https://www.garmin.com/en-US/p/697252/pn/010-02365-00/ | VERIFIED_EXTERNAL (checked 2026-10-30) |
| B&G | Zeus 3S (7/9/12 family) | Sailing and racing helm | Sailing-specific MFD, quad-core processor, touch, sunlight-visibility design intent, sailing features | Price not published on the official pages retrieved | — | Not applicable — no price retrieved | Display unit (not verified) | https://www.bandg.com/es-es/noticias/new-zeus3s-sailing-display/ and https://www.bandg.com/es-es/bg/type/chartplotters/ | VERIFIED_EXTERNAL for capability (checked 2026-10-30); price OPEN |
| Simrad | NSX (5/7/9 family) | Mid-size centre-console and leisure | NSX MFD, redesigned operating system, customisable dashboards, C-MAP DISCOVER/REVEAL X chart compatibility, activity bar | Price not published on the official pages retrieved | — | Not applicable — no price retrieved | Display unit (not verified) | https://www.simrad-yachting.com/es-es/nsx/ | VERIFIED_EXTERNAL for capability (checked 2026-10-30); price OPEN |

**Usage rules that bind this table.** (1) These are hardware-inclusive chartplotter prices, not software-subscription comparables; they must not be compared with MAREA NAV or MAREA WEATHER prices, nor used to present EUR 699 DISPLAY as like-for-like value. (2) No performance, brightness, resolution, legibility or superiority claim is made against any named brand; no comparative test exists. (3) Currency, VAT basis, territory, included charts and included hardware differ between rows and cannot be summed or averaged. (4) A "price not published" row is OPEN, not zero and not cheaper. (5) Third-party published figures are attributed to that product only and never become MAREA DISPLAY specifications. (6) The evidence is category context for the price-decomposition and channel work; it is not a cost input, a supplier quote, a market-share estimate or a willingness-to-pay validation. Verification of the category, like-for-like scope and willingness to pay is OPEN and belongs to MC-03A/MC-09 field research.
- **Evidence.** VERIFIED_EXTERNAL — the official URLs in the table, checked 2026-10-30; VERIFIED_REPO docs/marea/MARKET-BENCHMARKS.md DISPLAY rows; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §2 Class P; OPEN — no comparison test, no subscription evidence and no customer research exists (X-06).
- **Owner.** Commercial strategy.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** pricing = HYPOTHESIS_UNAPPROVED.

#### F17 - Sales arguments
- **Definition.** Honest buyer arguments and the objection handling that goes with them. Arguments: the helm gets one fixed, dedicated screen instead of a tablet in a cradle; the display boots into the instrument interface rather than a general desktop; day, sunlight and night are separate intended modes, not one dimmer; every value shows its source and age, and a licensed layer appears only where the licence exists; base navigation and instrument presentation are defined to work locally without cloud; the alarm hierarchy is identical in both editions and is never edition-gated; installation is assessed rather than assumed, and the owner leaves knowing what is and is not connected. Objections and answers: "Why not a tablet?" — a tablet is a general device with a battery and a consumer operating system; DISPLAY is specified as a fixed marine instrument with an approved mount, vessel power and a dedicated environment, and that difference is not yet physically proven; "Will it work with my instruments?" — only within the published per-device, per-firmware compatibility matrix, and the assessment decides; "Is the screen big enough?" — the size is not frozen and no size is claimed; "Can I install it myself?" — only in a documented low-risk configuration; "What about charts and weather?" — they are separate licensed or subscribed items, never included; "What if it fails at sea?" — the product must present a degraded but honest state, and the support and replacement path is defined as a requirement but not yet operated; "How much?" — only an unapproved internal hypothesis exists. No comparative claim against a named competitor is permitted.
- **Evidence.** ASSUMPTION — argument ranking; VERIFIED_REPO docs/marea/products/README.md §7 and MC-07 claim restrictions; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §2–§4; OPEN — no sales test, no customer evidence and no approved claims register entry (X-06, §8 claims register empty).
- **Owner.** Product marketing with sales enablement.
- **Blockers / dependencies.** X-01, X-06.
- **Commercial readiness.** brandPublication = NOT_GRANTED.

#### F18 - FAQ
- **Definition.** The pre-sale and post-sale questions this product must answer truthfully. What exactly is included? The display, its approved mounting and documented power and data items, the base software and documentation; charts, weather, NAV, HUB, AIS receiver, adapters and installation are separate. What size is the screen? No size is frozen or published; the entry edition is described as 7-inch-class as a working designation only. Can it show my charts? Only within a chart licence that exists; the device does not include chart coverage and official ENC distribution is not established. Can it show MAREA WEATHER? Only with a MAREA WEATHER entitlement and only where the provider rights allow the layer. Does it work without internet? The base local experience is defined to work without cloud; licensed layers may require their own availability conditions, which will be published. Can it steer the boat or control an autopilot? No, and no such feature is planned; PILOT, if ever presented, is read-only status at most. Is it certified? No certification of any kind exists. Can I install it in any boat? Only within the documented installation and compatibility envelope; otherwise an assessment is required. What happens if power is lost at the helm? The product must recover to a known state with its configuration intact; this is a design requirement, not tested behaviour. What happens to my settings if the device is replaced? A configuration backup and restore path is specified; the exact procedure and any service charge are OPEN. How long is support? The support and update window is not yet defined and will be published before any sale.
- **Evidence.** Derived from this dossier and docs/marea/products/DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md; OPEN for the answers that depend on unbuilt capability and unresolved terms; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §4 and §6.
- **Owner.** Product management with content and support.
- **Blockers / dependencies.** D-01, D-05, H-05, X-02, X-05.
- **Commercial readiness.** brandPublication = NOT_GRANTED.

#### F19 - Warranty and support
- **Definition.** Intended after-sales position: the statutory consumer guarantee under Spanish and EU law, plus a contractual warranty whose duration and conditions are not yet defined and must be written before sale. Support covers the device, installation and commissioning questions, source and freshness interpretation, update assistance, configuration export or restore, and the fault-return or replacement process. A customer can export a diagnostic record for support without granting remote control of the vessel. Ownership transfer updates the registered owner but does not extend or reset the hardware warranty. Response time, service hours, spare-device policy, out-of-warranty repair terms, the treatment of a damaged panel and the seller's legal identity are OPEN. No support statement may imply that support monitors the vessel or guarantees availability. The update and rollback obligation is a design requirement and is not yet operated.
- **Evidence.** OPEN — warranty terms, support levels, RMA and spares policy; BLOCKED — X-02 (legal identity), H-13 (secure update lifecycle) and X-05; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §2 Class C.
- **Owner.** Customer support with legal.
- **Blockers / dependencies.** H-13, X-02, X-05.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F20 - Bilingual product page copy
- **Definition.** The customer-facing Spanish and English copy lives in docs/marea/products/copy/display.es.md and docs/marea/products/copy/display.en.md and is part of this deliverable. Both files use the exact 24 numbered headings of copy/nav.es.md and copy/nav.en.md, followed by an approved-disclaimers section, and are true counterparts. The copy must state: the device-versus-software distinction; that the size is not frozen and no measured specification is claimed; the included base software versus the separately licensed charts, weather, NAV, HUB and AIS; the local-first behaviour and the dependency of licensed layers; the data-freshness and source rules; the alarm hierarchy; the installation assessment path; the warranty and update position; the lack of certification and availability; and the navigation and receive-only AIS disclaimers verbatim together with the brand attribution. It must contain no price, no competitor price, no currency amount, no purchase call to action, no stock or availability statement, no certification, no sunlight-readability guarantee, no measured size, no brightness or resolution figure, no IP rating and no temperature range.
- **Evidence.** VERIFIED_REPO docs/marea/products/README.md §22; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §2–§6; VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md §8–§10; OPEN — publication blocked by X-01 and X-03.
- **Owner.** UX, content and localisation with product review (facts).
- **Blockers / dependencies.** X-01, X-03.
- **Commercial readiness.** brandPublication = NOT_GRANTED.

#### F21 - Cross-sells
- **Definition.** Intended commercial path: DISPLAY is the screen of the ecosystem and is bought with the data sources the owner actually has. MAREA NAV is the software path and remains a separate subscription; MAREA HUB is the integration gateway for existing equipment; MAREA AIS adds received traffic; MAREA WEATHER adds a licensed overlay; MAREA SENSE adds measurements; MAREA PILOT may at most add a read-only status surface in a future authorized interface and is never sold as controlled from DISPLAY. The MAREA CRUISE bundle is the defined ecosystem context (NAV + HUB + receive-only AIS + DISPLAY); its content, price and publication are governed by MC-08 and are never stated as a purchasable price here. No product is presumed included in another, no cross-sell makes a licence included, and none is purchasable today.
- **Evidence.** VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07 and the bundle architecture; VERIFIED_REPO docs/marea/products/README.md §8 (bundles are ecosystem context only) and §19; OPEN — bundle content, price and publication are MC-08.
- **Owner.** Commercial product management.
- **Blockers / dependencies.** X-01, X-05, MC-08 bundle governance.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F22 - Retention strategy
- **Definition.** Retention is intended to come from a product that stays useful at the helm, not from lock-in: a layout the owner built and can keep; a display that presents the owner's own instruments; a configuration that can be exported and restored; an alarm hierarchy the owner learned to trust because it distinguishes advisory, caution, warning and critical states honestly; an update path that does not break the working layout; and a support path that can read a diagnostic record. The screen keeps working locally without any cloud service; only separately licensed layers can degrade with their own licence. Renewal pressure does not exist for a one-off purchase, and no repeated fee for base software may be introduced later as a dark pattern. Where the owner sells the boat, a documented ownership transfer updates the registered owner. Extended support, replacement and out-of-warranty terms are OPEN and must be published before sale.
- **Evidence.** HYPOTHESIS — retention design is unvalidated; VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §6 and BRAND-VOICE-ES-EN.md §10; OPEN — no installed base, no support operation and no update service exists.
- **Owner.** Customer success with product management.
- **Blockers / dependencies.** H-13, X-05.
- **Commercial readiness.** availability = NOT_FOR_SALE.

#### F23 - Success metrics
- **Definition.** A metric framework to be defined and measured, with no invented targets: commercial — sell-through per SKU, attachment of NAV, WEATHER, HUB and AIS, installation conversion, return rate and warranty incidence; activation — display mounted and powered, first-run diagnostic completed, vessel profile created, source and freshness check passed, dashboard preset chosen; quality — defect rate per hundred units, panel and touch failure rate, power-loss recovery success, update success and rollback success, boot time distribution, thermal-throttle events, sunlight-legibility field reports and night-mode complaints; support — tickets per hundred units, installation-related tickets, replacement rate and repair turn-around; trust — share of presented values shown with source and age, licensed-layer unavailable states displayed honestly and disclaimer presence on every surface. Baselines and targets are OPEN; stating a number now would be invented.
- **Evidence.** OPEN — no device, no installed base, no measurement and no support operation exists; ASSUMPTION on the metric set derived from VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md §07 KPIs (sell-through, return/defect rates, warranty reserve, bundle attachment).
- **Owner.** Product operations with finance.
- **Blockers / dependencies.** H-05, H-11, X-05, X-06.
- **Commercial readiness.** engineering = NOT_VERIFIED.

#### F24 - End-to-end acceptance
- **Definition.** Acceptance means the complete product demonstrably works end to end: the twenty DISPLAY-AC scenarios of §12 are executed and recorded; a real article has been mounted, powered, commissioned and used at a real helm; day, sunlight and night modes have been measured on the actual panel; input has been tested dry, wet and gloved where claimed; thermal, power, vibration and environmental exposure have been measured on the actual article; an EMC pre-scan and the applicability review have been completed; configuration backup and restore, update and rollback, and power-loss recovery have been proven; a replacement unit has been installed and the owner's settings restored; a real owner has completed handover; and the device has never presented a stale value as current. Documentation alone, browser mock-ups, unit tests or simulations do not constitute acceptance. No scenario is claimed as passing and every scenario is NOT_EXECUTED.
- **Evidence.** OPEN/BLOCKED — scenarios defined in §12; the canonical states in §1.4; VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md §5; VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md mandatory milestone evidence; the MC-34 hardware-evidence gate.
- **Owner.** Quality assurance with engineering and compliance; independent verification by a reviewer who is not the author.
- **Blockers / dependencies.** H-05, H-06, H-11, H-13, P-07, P-10, X-07.
- **Commercial readiness.** compliance = NOT_STARTED.

---

## 4. F04 capability-domain register — 38 mandatory final domains

Each domain is part of the finished commercial experience; the evidence state says what is actually established
today. OPEN means the experience is defined but not evidenced; BLOCKED names the external condition. No domain may
be dropped from the final product because it is currently unevidenced, and no domain may be presented as working
because it is specified. The register is the substantive expansion of F04 and the checklist the MC-34 gate must close.

| # | Capability domain | Intended end-state experience | Current evidence and state |
| ---: | --- | --- | --- |
| 1 | Physical display device | A manufactured marine display article with panel, compute module, storage, enclosure and bezel, serialised and serviceable | DISPLAY_HARDWARE = NOT_SELECTED; DISPLAY_BOM = BOM_NOT_ESTABLISHED (H-05, H-11, P-07) |
| 2 | Dedicated operating environment | A controlled runtime that boots into the instrument interface, not a general-purpose desktop, and is locked to the approved application set | DISPLAY_EMBEDDED_RUNTIME = NOT_FOUND; the audited UI is a browser application (P-07) |
| 3 | Daylight readability | The screen is intended to be readable in normal daylight at the helm, with an honest statement of what has been measured | DISPLAY_SUNLIGHT_READABILITY = NOT_MEASURED; no claim may be made |
| 4 | Sunlight mode | A distinct high-contrast, high-emphasis mode for direct sun, with the alarm hierarchy still legible | Design intent only; no photometric measurement, no rendered-hardware sampling |
| 5 | Night mode | A distinct low-luminance, warm-neutral mode that preserves dark adaptation and keeps alarms visible without glare | Design intent only; no night photometry; MC-04 palette simulation is design evidence, not a hardware test |
| 6 | Responsive instrument layout | Layouts that reflow for the actual panel and viewing distance without losing the safety-relevant information | OPEN — no panel, no layout implementation |
| 7 | Approved mounting | A documented, approved mounting system with a surface, orientation and fastening envelope, and a stated installation assessment | DISPLAY_INSTALLER_NETWORK = NOT_FOUND; no mount selected (H-11) |
| 8 | Vessel power integration | Documented input range, protection, fusing and grounding for a vessel supply, with a stated behaviour on transients and reverse polarity | REQUIRED_TARGET in the annex; no electrical test exists (H-05) |
| 9 | Startup experience | A short, honest boot that names the software version, the sources found and the active vessel profile, with a defined failure state | OPEN — runtime and boot behaviour unbuilt |
| 10 | Vessel-profile selection | A profile that binds the layout, units, language and source set to one vessel, with a defined switch and a defined conflict behaviour | OPEN — no implementation; profile model defined here and in the annex |
| 11 | Local dashboard | A local home view that works with no cloud account and no internet connection | OPEN — local-first behaviour is a requirement, not tested |
| 12 | Navigation presentation | Position, heading, course, route and waypoints presented as an aid, with the navigation disclaimer on the surface | OPEN — presentation layer unbuilt; NAV remains a separate software product |
| 13 | Chart display where licensed | A chart view only within the coverage and terms of a chart licence, showing the licensed source and the licence state | BLOCKED — D-01, D-06, D-10; no chart right exists |
| 14 | Position and motion | Position, speed over ground, course and motion context shown with source and age, and an explicit unknown state | OPEN — no GNSS source selected or tested (H-04, P-07) |
| 15 | Wind and depth | Wind angle/speed and depth shown only from a compatible, verified source, with units, damping and stale state | OPEN — no tested instrument integration (H-04) |
| 16 | Battery, tanks and utilities | Battery voltage/state, tank levels and utility states shown only where a compatible source exists, with quality and freshness | OPEN — no tested SENSE or HUB data path (H-04) |
| 17 | Received AIS presentation | Received AIS targets presented as traffic information, with source, age and the receive-only disclaimer, never as collision avoidance | BLOCKED — receiver is a separate product; D-09; AIS receive-only rule |
| 18 | Traffic alerts and stale-target indication | CPA/TCPA-style advisory only where valid data exists, and an explicit stale/unknown indication when it does not | OPEN — no implementation; no alert configuration tested |
| 19 | Weather overlay where licensed | A weather layer only with a MAREA WEATHER entitlement and provider rights for the layer and area, attributed and timestamped | BLOCKED — D-05, D-10, and the WEATHER provider rights |
| 20 | Data freshness and source visibility | Every presented value carries its source and age; a stale or unknown value is never shown as current | OPEN — rule defined; no implementation |
| 21 | Configurable helm dashboards | Owner-composed layouts from approved widgets, with a reset, a preview and a documented limit | OPEN — no implementation |
| 22 | Touch controls | Touch interaction designed for a wet, moving helm, with target sizes and gesture rules defined as requirements | OPEN — no hardware, no measurement |
| 23 | Physical controls where validated | Physical buttons or a rotary control only if the final hardware includes them and their behaviour is validated | OPEN — hardware not selected; no physical control exists |
| 24 | Wet and gloved interaction where physically verified | Interaction proven with wet and gloved hands on the actual article before any claim is made | NOT_VERIFIED — no physical test; claims prohibited until measured |
| 25 | Alarm and advisory hierarchy | A named hierarchy (advisory, caution, warning, critical) with consistent colour, shape, label and acknowledgement rules | Design requirement; MC-04 state-encoding evidence is design evidence only |
| 26 | Power-loss recovery | A defined behaviour on supply loss and restoration: configuration intact, alarm state honest, no silent reset | OPEN — no power test |
| 27 | Safe local operation without cloud | Base navigation and instrument presentation operate locally; licensed layers degrade with their own honest state | OPEN — local-first requirement, untested |
| 28 | Configuration backup | Export and restore of layouts, profiles and settings in a documented format, usable for support and replacement | OPEN — no implementation |
| 29 | Update and rollback | A signed update path with a rollback to the previous working version and a state that survives interruption | DISPLAY_UPDATE_ROLLBACK = NOT_FOUND (H-13) |
| 30 | Local device security | No default credential, a controlled local access model, signed software, and a documented revocation and service path | OPEN — threat model and CRA obligations not started (H-13, X-07) |
| 31 | User profiles | A small number of local profiles with distinct layout and permission scope, and a defined owner profile | OPEN — no implementation |
| 32 | Installation diagnostics | A built-in source, power and freshness check that produces a human-readable record for the installer and support | OPEN — no implementation |
| 33 | Hardware replacement | A documented replacement path with configuration restore, serial traceability and warranty position | OPEN — no service operation |
| 34 | Service lifecycle | A defined support and update window, an end-of-support statement and an ownership-transfer path | OPEN — no lifecycle operation; H-13 |
| 35 | Environmental protection | An intended environmental envelope for ingress, corrosion, salt, UV, vibration and temperature, with no rating claimed until measured | DISPLAY_ENVIRONMENTAL = NOT_VERIFIED; REQUIRED_TARGET only |
| 36 | Accessibility and human factors | Readable type at helm distance, non-colour-only states, target sizes, focus and contrast rules and an accessible alarm announcement model | Design evidence from MC-04 only; see §10 — not a hardware or user test |
| 37 | Bilingual interface | A Spanish (Spain) and English interface with identical capabilities, full string coverage and no untranslated safety string | OPEN — no interface implementation |
| 38 | Subscription and software entitlements | A clear boundary between included base software and separately licensed items, with an honest unavailable state for any lapsed licence | OPEN — no entitlement service for DISPLAY; licensing NOT_CLEARED |

---

## 5. Product boundary — commercial layers, NAV versus DISPLAY, included versus separately licensed

### 5.1 The commercial layers, separated

| Layer | What it is | What the customer pays for | What it never includes |
| --- | --- | --- | --- |
| HARDWARE | The panel, compute module, storage, enclosure, bezel, mounting, power conversion and protection, connectors and harness | A manufactured article with a documented configuration and a serialised identity | Charts, weather data, a subscription, certification, a guarantee |
| BASE_SOFTWARE | The dedicated operating environment and the included presentation, dashboard, configuration, backup, update and diagnostic software | The behaviour of the device for the purchased edition, during the support and update window | Third-party data, connectivity, third-party software licences |
| SEPARATE_LICENCE | Chart data, basemap, weather layers and any other external data | The licensed data entitlement inside its coverage and terms | A perpetual right, coverage beyond the licence, redistribution |
| SEPARATE_PRODUCT | MAREA NAV, MAREA WEATHER, MAREA HUB, MAREA AIS, MAREA SENSE, MAREA PILOT, MAREA WATCH | Their own product and its own entitlements | Inclusion in DISPLAY, a bundled licence, a price promise |
| SERVICE | Installation, commissioning, extended support, replacement and repair | The work and the service terms | A certification, a guaranteed response time that is not contracted |

### 5.2 NAV versus DISPLAY — the boundary

MAREA NAV is software; MAREA DISPLAY is a device. They are separate products with separate commercial objects and a
planned integration. The boundary is binding:

| Question | MAREA NAV (software) | MAREA DISPLAY (device) |
| --- | --- | --- |
| What is sold | An application subscription entitlement | A physical display article with included base software |
| Where it runs | Customer phone, tablet or desktop | The display's dedicated operating environment |
| Ownership | Subscription access; own records exportable | One-off hardware purchase; base software included in the support window |
| Charts | Licensed chart access inside the licence | A presentation surface; chart display only where a licence exists |
| GNSS | Uses the device's position | Uses a connected and verified position source; no receiver type is assumed |
| Weather | Its own licensed entitlement or a WEATHER entitlement | Only via a MAREA WEATHER entitlement and provider rights |
| AIS | Shows received targets where a source exists | Shows received targets from a compatible receiver where one exists |
| PILOT | No control path | Read-only status at most in a future authorized interface |
| Failure | Application or connectivity degraded | Device, power or source degraded; honest local state required |
| Readiness | DEFINED, NOT_FOR_SALE | DEFINED, NOT_FOR_SALE |
| Publication | NOT_GRANTED | NOT_GRANTED |

Rules: buying DISPLAY never includes a NAV subscription; buying NAV never includes a display; a NAV licence is not
transferred by a DISPLAY sale; a chart licence is a third object and is never implied by either; and neither product
may be described as required by the other. Evidence: VERIFIED_REPO docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md
and docs/marea/COMMERCIAL-PORTFOLIO.md §01 and §07; integration status DISPLAY-NAV = PLANNED (§6). The device is
never presented as a substitute for the NAV software, and the NAV software is never presented as including a screen.

### 5.3 Included base software versus separately licensed items (binding list)

| Item | Status | Rule |
| --- | --- | --- |
| Device operating environment | INCLUDED_BASE_SOFTWARE | Locked to the approved application set; no general-purpose desktop |
| Local dashboards and helm layouts | INCLUDED_BASE_SOFTWARE | Owner-composed from approved widgets; exportable |
| Instrument and received-AIS presentation | INCLUDED_BASE_SOFTWARE | Shown only from a compatible, verified source |
| Navigation presentation | INCLUDED_BASE_SOFTWARE | The presentation surface only; NAV itself is separate if the owner uses it |
| Configuration and backup | INCLUDED_BASE_SOFTWARE | Export and restore in a documented format |
| Diagnostics | INCLUDED_BASE_SOFTWARE | Human-readable record for installer and support |
| Updates during warranty | INCLUDED_BASE_SOFTWARE | Signed update and rollback obligation; window not yet defined |
| Charts and coverage | SEPARATE_LICENCE — BLOCKED (D-01, D-06, D-10) | Never included; never "unlimited"; never implied by the device |
| Weather layers and forecasts | SEPARATE_PRODUCT or SEPARATE_LICENCE (D-05, D-10) | Only with entitlement and provider rights |
| MAREA NAV | SEPARATE_PRODUCT (subscription) | Never included in DISPLAY |
| MAREA HUB | SEPARATE_PRODUCT (hardware) | Never included; optional integration |
| MAREA AIS receiver | SEPARATE_PRODUCT (hardware) | Never included; a DISPLAY cannot receive AIS by itself |
| MAREA SENSE modules | SEPARATE_PRODUCT (hardware) | Never included |
| MAREA PILOT | SEPARATE_PRODUCT (hardware and software) | Read-only status at most; never a control path |
| MAREA WATCH | SEPARATE_PRODUCT (hardware and service) | Never included; no monitoring entitlement in DISPLAY |
| Adapters, extra mounts, harness extensions | SEPARATE_ACCESSORY | Only within the tested matrix |
| Installation and commissioning | SEPARATE_SERVICE | Quoted separately; no included labour |

---

## 6. Integration contract — HUB, SENSE, AIS, NAV, WEATHER, PILOT, WATCH

The frozen batch-03 integration statuses are reproduced exactly. No integration is SUPPORTED. Each row carries its
evidence class and the condition that would close it. The reverse edges that other product dossiers must honour are
listed in §6.2.

### 6.1 DISPLAY as the subject

| Integration | Status | Evidence class | Reason and boundary | Closing evidence |
| --- | --- | --- | --- | --- |
| DISPLAY–HUB | CONDITIONAL | OPEN — no DISPLAY hardware, no validated integration | A compatible HUB is intended to supply onboard data; no device exists to test and no HUB protocol matrix covers DISPLAY | Tested model/firmware/direction matrix and a recorded integration test (H-04, P-07) |
| DISPLAY–NAV | PLANNED | OPEN — NAV is software, DISPLAY is a device | Intended that NAV presentation can be shown on the device; no interface contract is implemented; neither product includes the other | Interface contract, implemented build, recorded end-to-end presentation test |
| DISPLAY–AIS | CONDITIONAL | OPEN — receiver is a separate product | Received targets only from a compatible, installed receiver; receive-only disclaimer required; never collision avoidance | Tested receiver model/firmware and a recorded target-presentation test (D-09) |
| DISPLAY–WEATHER | CONDITIONAL | OPEN — provider rights not granted | A weather layer only with a MAREA WEATHER entitlement and provider rights for that layer and area | Entitlement model and provider terms (D-05, D-10) |
| DISPLAY–SENSE | CONDITIONAL | OPEN — no tested sensor path | Measurements from compatible SENSE modules only, with source, units, quality and freshness | Tested sensor matrix and a recorded measurement-presentation test (H-04) |
| DISPLAY–PILOT | UNKNOWN | BLOCKED — PILOT safety gate is BLOCKED (H-01, P-04) | Status and monitoring presentation **only**; never steering authority, never engagement, never a control head, never a remote or web pilot path | A future read-only interface authorized inside the PILOT safety boundary, after independent validation |
| DISPLAY–WATCH | UNKNOWN | OPEN — no interface defined | No monitoring entitlement and no data path defined in DISPLAY; any future view would be read-only context | A defined interface contract and a recorded read-only test |

### 6.2 Reverse edges other dossiers must honour

| Edge | Frozen status | Meaning |
| --- | --- | --- |
| WEATHER–DISPLAY | CONDITIONAL | The weather product may be presented on DISPLAY only with entitlement and provider rights |
| FLEET–DISPLAY | UNKNOWN | FLEET has no defined display integration and must not imply one |
| NAV ecosystem references to DISPLAY | Ecosystem context only | NAV copy may describe DISPLAY as an optional fixed screen; never as included |

### 6.3 Rules that bind every integration row

1. No integration may be described as working because a protocol is named; only a recorded per-device, per-firmware,
   per-direction test closes a row (docs/marea/products/README.md §7 rule 4).
2. NMEA 2000 is not implemented and no NMEA 2000 licence or certification exists; no NMEA 2000 certification or
   operational compatibility claim may be made (H-04, DEC-05).
3. Signal K is not a blanket compatibility guarantee; compatibility is per device, per firmware and per direction.
4. No integration introduces a steering, motor, autopilot-engagement or remote-helm path. PILOT is read-only status
   at most, and only after the PILOT safety boundary is independently validated.
5. A licence is never transferred by an integration. A chart, weather or basemap right is its own object (D-01,
   D-05, D-06, D-10).
6. The device does not accept inbound internet control and does not expose an internet-reachable control surface.

---

## 7. Edition architecture — DISPLAY-7 and DISPLAY-LARGE-CONDITIONAL

### 7.1 Verdicts

| Edition | Verdict | Commercial meaning | Price |
| --- | --- | --- | --- |
| MAREA DISPLAY 7 (DISPLAY-7) | DEFINED | Complete entry configuration; customer-facing definition coherent; still not sellable and not measured | EUR 699 one-off starting hypothesis, VAT-inclusive consumer retail hypothesis, HYPOTHESIS_UNAPPROVED |
| MAREA DISPLAY Large, conditional (DISPLAY-LARGE-CONDITIONAL) | CONDITIONAL | Future larger-screen family whose differentiation and feasibility depend on unselected hardware and unverified sunlight/thermal validation | None. NOT_ESTABLISHED; never published with a measured size or price |

publicationConditional is true for both editions. No third edition and no generation label may be invented. The
displays are not certified, not priced in an approved list and not orderable.

### 7.2 DISPLAY-7 — the entry edition

The 7-inch-class designation is a working label for a compact helm display and never a measured, frozen or published
size. The edition is defined by the experience envelope, not by a number: a compact fixed screen for a helm with
limited panel space; the included base software of §5.3; one active vessel profile; the standard mounting and power
items of the final configuration; the full alarm hierarchy; and the full data-provenance rule. Its value against a
larger screen is intended to be installation simplicity and panel-space fit, not a capability reduction: no
safety-relevant presentation is removed from the entry edition.

### 7.3 DISPLAY-LARGE-CONDITIONAL — the conditional family

This entry exists to state honestly that a larger-screen family is part of the intended product line without selecting
or publishing it. It is conditional on: hardware selection of a panel and compute module; enclosure and tooling;
sunlight and thermal validation on the larger panel; a costed bill of materials; and a decision on tooling investment.
Its size is not frozen and no diagonal is named anywhere in this dossier. Its price is
not established. Its publication is conditional and blocked. If the conditions cannot be met, the honest outcome is
that the family is not offered, not that a size or price is guessed.

### 7.4 What both editions must always include (never edition-gated)

The alarm hierarchy; data freshness and source visibility; the power-loss state; the disclaimers; the local-first base
experience; configuration backup; update and rollback; the diagnostic record; and the accessibility rules. No edition
may hide a safety-relevant state and no entitlement may disable one.

---

## 8. Price decomposition — the EUR 699 starting hypothesis with no fabricated figures

EUR 699 is a starting-price hypothesis, one-off, VAT-inclusive consumer retail, HYPOTHESIS_UNAPPROVED. It is not an
inclusive quotation and installation is quoted separately. The decomposition below lists every BOM and commercial
cost category that must be established before the hypothesis can become a real price. Each category is
REQUIRED_TARGET: the requirement is stated, and no figure is invented. A category is closed only by a real quote, a
real measurement or a signed term.

| # | Cost category | Required evidence (REQUIRED_TARGET) | Current state |
| ---: | --- | --- | --- |
| 1 | Panel and backlight | Selected panel with datasheet, sunlight-contrast measurement plan and lifecycle commitment | NOT_ESTABLISHED (H-05, H-11) |
| 2 | Compute module and memory | Selected module with performance, thermal envelope and lifecycle commitment | NOT_ESTABLISHED |
| 3 | Storage | Selected storage with endurance and replacement policy | NOT_ESTABLISHED |
| 4 | Enclosure, bezel and sealing | Mechanical design, material, seal strategy and tooling quote | NOT_ESTABLISHED |
| 5 | Approved mounting | Mount design, load case and tooling quote | NOT_ESTABLISHED |
| 6 | Power conversion and protection | Input range, protection design, thermal budget and component quotes | NOT_ESTABLISHED |
| 7 | Connectors and harness | Marine connector selection, harness drawing and quote | NOT_ESTABLISHED |
| 8 | Dedicated operating environment | Build, licence and per-unit royalty position (if any) | NOT_ESTABLISHED |
| 9 | Base software amortisation | Development cost and unit-volume assumption, approved by finance | NOT_ESTABLISHED (X-05) |
| 10 | Assembly and factory test | Assembly quote, test procedure and test time | NOT_ESTABLISHED |
| 11 | Labelling and serialisation | Label, serial and traceability process | NOT_ESTABLISHED |
| 12 | Conformity programme | Applicability review, accredited-laboratory quotes, technical file and EU declaration of conformity | NOT_STARTED (H-06) |
| 13 | Red compliance if a radio is included | Radio module choice, RED route and notified-body position | POTENTIALLY_APPLICABLE, not decided (HARDWARE-COMPLIANCE-MATRIX.md §5) |
| 14 | CRA and secure update | Vulnerability handling, SBOM, signed update and incident process cost | NOT_FOUND (H-13) |
| 15 | Packaging and freight | Packaging design, protection, volume and freight quote | NOT_ESTABLISHED |
| 16 | Fulfilment | Warehouse, shipping and insurance cost | NOT_ESTABLISHED |
| 17 | Payment fees | Acquiring and payment-method cost | NOT_ESTABLISHED |
| 18 | Warranty accrual | Written warranty terms and projected incidence | NOT_ESTABLISHED (X-02) |
| 19 | Returns and replacement allowance | Return policy and replacement logistics | NOT_ESTABLISHED |
| 20 | Support and installer support | Support model, staffing and cost per unit | NOT_ESTABLISHED |
| 21 | Firmware maintenance and security | Ongoing maintenance and vulnerability-response cost | NOT_ESTABLISHED |
| 22 | Spare parts and service logistics | Spare-panel and spare-unit policy | NOT_ESTABLISHED |
| 23 | Customer acquisition | Channel mix and acquisition cost | NOT_ESTABLISHED (X-06) |
| 24 | Channel margin or installer compensation | Channel terms and installer remuneration model | NOT_ESTABLISHED (X-05) |
| 25 | VAT position | Applicable VAT rate and territory confirmed by finance | HYPOTHESIS: VAT-inclusive consumer retail, rate not frozen |

**Rules.** (1) No gross-to-net conversion, contribution margin, gross margin or payback figure is computed or
presented in this dossier: every input above is missing, so any number would be invented. (2) The EUR 699 figure is
never decomposed into public component prices. (3) The EUR 699 figure is never described as a "from" offer, a launch
price, a discount, a bundle component or a sum with any other product. (4) If the bottom-up cost does not support
EUR 699, the hypothesis changes; the product definition does not. (5) MAREA DISPLAY Large has no price decomposition
because it has no selected hardware; listing a BOM for it would invent the product.

---

## 9. Physical release gates — the evidence required before any display claim

All gates are NOT_EXECUTED or BLOCKED. A gate closes only with a recorded result naming the article, the serial
number, the firmware/software version, the laboratory or vessel, the method and the date. A design document, a
simulation or a supplier datasheet is not a closed gate. No gate may be waived to publish a claim.

| Gate | Name | What must be proven | Method and evidence | State |
| --- | --- | --- | --- | --- |
| G-DIS-01 | Sunlight legibility test | That the actual panel is legible at a helm in direct sunlight under a stated viewing distance, with no invented brightness figure | Photometric measurement plus a controlled outdoor legibility protocol on the article, with acceptance criteria fixed before the test; no nit claim is made public | NOT_EXECUTED |
| G-DIS-02 | Night mode verification | That the night mode preserves dark adaptation, does not glare and keeps the alarm hierarchy visible | Dark-room photometry plus a supervised night-use protocol on the article | NOT_EXECUTED |
| G-DIS-03 | Input responsiveness | That touch and any physical control meet a stated latency and accuracy target in dry conditions | Instrumented latency and target-accuracy test on the article | NOT_EXECUTED |
| G-DIS-04 | Wet and gloved interaction | That interaction works with wet hands and with gloves before any claim is made | Defined wet/glove protocol on the article; if not performed, no wet/glove claim appears anywhere | NOT_EXECUTED — claims prohibited until measured |
| G-DIS-05 | Thermal and power | That the article stays inside its thermal limits and its stated power envelope across a hot-helm and cold-start profile, including transients | Environmental chamber and electrical test with recorded profiles | NOT_EXECUTED |
| G-DIS-06 | Vibration and shock | That the article and its mount survive a stated marine vibration and shock profile with no loss of function | Laboratory vibration/shock test per a stated standard profile | NOT_EXECUTED |
| G-DIS-07 | Marine environmental exposure | That the enclosure resists ingress, salt fog, UV and corrosion to its intended envelope — with no IP rating claimed until the test exists | Laboratory ingress, salt-fog and UV tests on the article; rating stated only from the report | NOT_EXECUTED — DISPLAY_ENVIRONMENTAL = NOT_VERIFIED |
| G-DIS-08 | Electrical compatibility | That the power input tolerates the documented vessel supply range, reverse polarity, transients and grounding practice without damage or unsafe state | Electrical test plan on the article plus a documented installation requirement | NOT_EXECUTED |
| G-DIS-09 | EMC and RED applicability | That EMC essential requirements are met, and that the RED position is decided if any radio is included | Applicability review, EMC pre-scan then accredited test; RED route if a radio is present | NOT_EXECUTED — DISPLAY is CLEARLY_APPLICABLE for EMC, POTENTIALLY_APPLICABLE for RED (HARDWARE-COMPLIANCE-MATRIX.md §5.2) |
| G-DIS-10 | Product conformity | That the CE route, GPSR safety case, RoHS, WEEE registration and CRA obligations are satisfied per SKU, with the EU declaration of conformity | Conformity assessment file, laboratory reports, technical file, EU declaration of conformity, producer registrations | NOT_STARTED (H-06, H-13) |
| G-DIS-11 | Installation validation | That a documented installation can be completed and commissioned reproducibly, with measured effort and a handover record | Reference installations on representative vessels; measured installation hours | NOT_EXECUTED — DISPLAY_INSTALLER_NETWORK = NOT_FOUND |
| G-DIS-12 | Update and recovery | That a signed update succeeds and a failed or interrupted update rolls back to the previous working version, with configuration preserved | Update and rollback test, including power interruption during update | NOT_EXECUTED — DISPLAY_UPDATE_ROLLBACK = NOT_FOUND |
| G-DIS-13 | Field service and replacement | That a replacement unit can be installed, the owner's configuration restored, the old unit decommissioned and the warranty position recorded | Field replacement exercise with a real owner and a service record | NOT_EXECUTED |
| G-DIS-14 | Safety and PILOT integration boundary | That no display surface, integration or update introduces steering authority, engagement, a control head or a remote/web pilot path | Architecture review, interface test and an independent safety review inside the PILOT boundary | NOT_EXECUTED — DISPLAY–PILOT = UNKNOWN, read-only status at most |

The release sequencing rule: no claim, no copy and no SKU may use a gate's subject as a feature before that gate is
closed. G-DIS-01 and G-DIS-02 close design claims; G-DIS-05 through G-DIS-10 close product conformity; G-DIS-11
through G-DIS-13 close the service model; G-DIS-14 closes the safety boundary. A partial closure is reported as
PARTIAL with its exact scope and is never rounded up to PASS.

---

## 10. Accessibility, human factors and the MC-04 contrast evidence (design evidence only)

The intended accessibility position is specified here as a requirement, not as a result. Readability at helm
distance, non-colour-only state encoding, target sizes for a moving vessel, focus visibility, an announcement model
for alarms and a bilingual interface are all part of the finished product. None of them is proven on hardware.

**What the MC-04 evidence actually establishes — design evidence only.** The MC-04 accessibility record
(docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md, QA-01/QA-03/QA-04/QA-26) measured 190 colour pairs across four
modes on the proposed instrument tokens: every proposed instrument pair passed WCAG AA and the stricter internal
target in the day, sunlight and night palettes (54/54 per mode), and it authored colour-blind and greyscale simulation
boards. That is credible **design evidence for proposed colour and type tokens**. It is explicitly **not** a hardware
validation, **not** a photometric measurement of the panel, **not** sunlight or night photometry and **not** a user
test; the record itself marks these as PARTIAL/NOT_TESTED and states that rendered sampling of an implemented screen
was not performed. Therefore: MC-04 contrast results may be cited only as design evidence for the palette and type
system, never as proof that the eventual MAREA DISPLAY is sunlight-readable, night-safe or accessible in a cockpit.
Closing the accessibility claims requires G-DIS-01, G-DIS-02, G-DIS-03 and a user test on the real article.

Design requirements carried into the annex: minimum control target for wet/glove use is a REQUIRED_TARGET to be
measured (a 44 x 44 px-class internal target is the design aim, with the WCAG floor as a separate web rule); every
state keeps a shape, label and text cue in addition to colour; alarms use a four-level hierarchy and are announced
without requiring colour perception; night mode reduces luminance and disables pulsing; text at helm distance meets a
stated minimum angular size to be measured; and the Spanish and English interfaces must have identical capability
and identical safety strings.

---

## 11. Local behaviour under degraded conditions

This table is the customer-facing honesty test for DISPLAY. It is a **design requirement**, not tested behaviour:
every row is NOT_VERIFIED until its acceptance scenario is executed. Two rules override every row: (1) the device
must never present a stale or unknown state as current; (2) no licence or entitlement state may disable the base
local experience or the alarm hierarchy.

| Condition | Device behaviour | What the user must see | Acceptance |
| --- | --- | --- | --- |
| Vessel power lost | The display stops or enters a defined safe state; configuration is not lost; on restoration it boots to a known state | Power-loss state before loss if energy allows, and a defined restart state; no silent reset of configuration | DISPLAY-AC-13 |
| Supply transient or reverse polarity | The protective item isolates the fault; the device either survives or fails safely, never with a partially working alarm display | A defined fault state or a clean restart; no misleading half-rendered alarm | DISPLAY-AC-13 |
| Position source lost | Position becomes unknown; navigation presentation degrades honestly | "Position unknown" with age; route guidance marked unverified, not silently continuing | DISPLAY-AC-09 |
| Instrument source lost or stale | The affected value is marked stale or unavailable with its age; other values continue | Affected value in stale/unknown state; source named; no fabricated value | DISPLAY-AC-09 |
| AIS source lost | Received targets are marked stale; CPA/TCPA-style advisory is suspended, not guessed | Stale-traffic indication with age; advisory marked not evaluated | DISPLAY-AC-10 |
| Chart licence absent, lapsed or out of coverage | The chart view shows an honest unavailable state with attribution retained; no fabricated or frozen chart is presented as current | Licence state, coverage gap and last valid state; no "all good" | DISPLAY-AC-11 |
| Weather entitlement lapsed | The weather layer is removed or shown as unavailable with source retained; the base experience continues | Layer unavailable, reason and date; no frozen forecast presented as current | DISPLAY-AC-11 |
| No internet or cloud | Local dashboards, instrument presentation, navigation presentation and alarms continue | No cloud indicator required for base use; the device never blocks on a network | DISPLAY-AC-12 |
| Update interrupted | The previous working version remains or is restored; configuration preserved | Update failed state with the version actually running; a documented recovery path | DISPLAY-AC-14 |
| Storage full or corrupt | The device protects configuration and alarms first; a diagnostic record is offered | Clear storage state; no silent loss of settings | DISPLAY-AC-14 |
| Temperature beyond envelope | A defined thermal state is shown; the device never hides an alarm because of heat | Thermal warning and what still works; no false normal state | DISPLAY-AC-15 |
| Device fault | A defined fault state and a diagnostic record for support | Fault code, what is affected, recovery route | DISPLAY-AC-16 |

Implied exclusions: DISPLAY cannot present a value whose source it does not have; it cannot show a licensed chart or
weather layer without a right; it cannot alarm on a condition it does not sense; it cannot keep an alarm visible
without power; and it cannot guarantee legibility in any light until G-DIS-01 and G-DIS-02 are measured. These are
stated limitations of a presentation device, not defects to be hidden.

---

## 12. Acceptance scenarios — DISPLAY-AC-01 to DISPLAY-AC-20

All scenarios are NOT_EXECUTED. None is claimed to pass. Each requires a recorded result with article serial number,
software version, vessel or bench, configuration and date before any behaviour may be described as working.
Classification vocabulary: NOT_EXECUTED only; no other value is used in this milestone.

| ID | Scenario | Expected end-state behaviour | Classification | Evidence required |
| --- | --- | --- | --- | --- |
| DISPLAY-AC-01 | Purchase, delivery and contents check | The customer receives exactly the stated contents of the purchased edition and the printed contents list matches | NOT_EXECUTED | Order, SKU contents, packing record |
| DISPLAY-AC-02 | Mounting and power installation | The approved mount is fitted to the documented surface and the display is powered through the supplied protective item with a commissioning record | NOT_EXECUTED | Installation record, photographs, electrical check |
| DISPLAY-AC-03 | First start and source discovery | A short startup names software version, vessel profile and the sources found; missing sources are named honestly | NOT_EXECUTED | Boot capture, source list, first-run diagnostic |
| DISPLAY-AC-04 | Vessel-profile creation and switching | A profile binds layout, units, language and source set; switching is explicit and conflict behaviour is defined | NOT_EXECUTED | Profile records; switch test |
| DISPLAY-AC-05 | Daylight, sunlight and night modes | The three modes are distinct experiences; the alarm hierarchy remains legible in each; no glare in night mode | NOT_EXECUTED | Photometric records and controlled-use evidence (G-DIS-01, G-DIS-02) |
| DISPLAY-AC-06 | Touch and physical control responsiveness | Dry touch targets and any physical control meet the stated latency and accuracy targets | NOT_EXECUTED | Instrumented latency and accuracy records (G-DIS-03) |
| DISPLAY-AC-07 | Wet and gloved operation | The stated interaction works with wet hands and gloves; if not tested, no claim exists | NOT_EXECUTED | Wet/glove protocol record (G-DIS-04) |
| DISPLAY-AC-08 | Navigation and instrument presentation | Position, course, route, wind, depth and utility values are presented with source, unit and age, and unknown states are explicit | NOT_EXECUTED | Per-value presentation record with source and age |
| DISPLAY-AC-09 | Source loss and stale-value honesty | Loss of position or an instrument produces a stale/unknown state with age; no fabricated value appears; other values continue | NOT_EXECUTED | Fault-injection record, screen evidence |
| DISPLAY-AC-10 | Received AIS presentation and stale targets | Received targets appear as traffic information with the receive-only disclaimer; on source loss they become stale and advisory is suspended | NOT_EXECUTED | AIS-presentation record; stale-target evidence; disclaimer presence |
| DISPLAY-AC-11 | Licensed chart and weather states | A chart appears only within a licence; an absent, lapsed or out-of-coverage layer shows an honest unavailable state with attribution | NOT_EXECUTED | Licence-state records; coverage-gap evidence |
| DISPLAY-AC-12 | Local operation without cloud | Dashboards, instruments, navigation presentation and alarms work with no internet and no account | NOT_EXECUTED | Offline test with network capture |
| DISPLAY-AC-13 | Power loss and restoration | Configuration survives; the device restarts to a known state; a power-loss state is shown where energy allows | NOT_EXECUTED | Power-cut test, state capture, configuration comparison |
| DISPLAY-AC-14 | Configuration backup, restore, update and rollback | Backup and restore reproduce the layout and profiles; a signed update succeeds; an interrupted update rolls back with configuration intact | NOT_EXECUTED | Backup file, restore evidence, update and rollback records |
| DISPLAY-AC-15 | Thermal and environmental states | The device stays within thermal limits; a thermal state is shown honestly; environmental exposure is measured on the article | NOT_EXECUTED | Chamber records, thermal-state evidence, environmental reports (G-DIS-05 to G-DIS-07) |
| DISPLAY-AC-16 | Device fault and diagnostics | A fault produces a diagnostic record and a recovery route; support can read the record without remote control | NOT_EXECUTED | Diagnostic record; support walkthrough |
| DISPLAY-AC-17 | Alarm and advisory hierarchy | Advisory, caution, warning and critical are distinguishable by colour, shape, label and pattern; acknowledgement does not erase a standing condition | NOT_EXECUTED | Alarm-state matrix test; greyscale and colour-blind review |
| DISPLAY-AC-18 | User profiles and access | Profiles separate layout and permission scope; the owner profile cannot be silently taken over; a lockout has a documented recovery | NOT_EXECUTED | Profile access-test record |
| DISPLAY-AC-19 | Hardware replacement and ownership transfer | A replacement unit is installed, configuration restored, old identity decommissioned and the registered owner updated | NOT_EXECUTED | Replacement record; restore evidence; transfer record |
| DISPLAY-AC-20 | End-to-end ownership and end of support | A real owner completes installation, handover, use and a support case; the support and update window and the end-of-support statement are published | NOT_EXECUTED | Owner handover record; support case; published lifecycle statement |

---

## 13. Traceability annex — MC-02 blockers and the evidence required before sale

### 13.1 Mandatory DISPLAY blocker mapping

The DISPLAY blocker set is frozen: H-04, H-05, H-06, H-11, H-13, D-01, D-05, D-06, D-10, P-07, P-10, X-01, X-03,
X-05, X-06, X-07. No other blocker id is introduced.

| Blocker | What it means for MAREA DISPLAY | Closed only by |
| --- | --- | --- |
| H-04 | NMEA 2000 is not implemented (type stubs only); no NMEA licence or certification; no claim may be made | NMEA membership/licence and certification, or a documented scope limited to NMEA 0183/Signal K with tested interfaces (DEC-05) |
| H-05 | No physical build, measurement, environmental or EMC evidence exists | Prototype BOM, bench measurements, thermal/ingress/vibration and EMC pre-scan on the actual article |
| H-06 | CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA obligations are not started; no EU declaration of conformity, test report or notified-body certificate | Per-SKU applicability review, harmonised standards, accredited laboratory tests, technical file, EU declaration of conformity, producer registrations |
| H-11 | No display, panel, compute module or enclosure hardware exists; only documented concepts | Hardware platform selection, prototype, environmental test and real device evidence |
| H-13 | CRA obligations: reporting applies from 2026-09-11 and main obligations from 2027-12-11; no vulnerability handling, secure update, SBOM or incident reporting exists | Security-by-design process, coordinated vulnerability disclosure, signed update with rollback, SBOM, incident reporting, conformity route |
| D-01 | No IHM/IHPT ENC distributor or OEM agreement; official chart rights not established | Written chart distribution decision and, if pursued, a distributor/OEM agreement (DEC-02) |
| D-05 | Weather overlay layers are a separate paid SKU; no provider right for a commercial product | Provider terms and entitlement mapping for the layer and area |
| D-06 | Basemap tiles have no documented commercial licensed path | Replace with an openly licensed basemap or obtain the provider's terms |
| D-10 | Eleven of twenty-eight provider rows remain LEGAL_REVIEW_REQUIRED; external data rights are not closed | Provider-by-provider clearance register with written terms |
| P-07 | No display hardware or enclosure; the audited UI is a browser application, not an embedded MFD runtime | Hardware selection, embedded/kiosk runtime strategy, sunlight/ingress testing |
| P-10 | Engineering reuse is inventory-level; Node/TypeScript suites are unexecuted | Reproducible build/test environment and an executed test report for every reused module used by DISPLAY |
| X-01 | MAREA is a proposed brand; no trademark clearance; "Marea Marine" is a risk signal, not an infringement finding | EUIPO/OEPM clearance and filing before any brand publication |
| X-03 | No image-generation capability or credential; all DISPLAY visuals remain BLOCKED_ON_IMAGE_GENERATION; assets are CONCEPT, not REAL_PRODUCT | Written budget authorisation, provider credential, commercial-use confirmation and one pilot asset |
| X-05 | No BOM, supplier quotes, tooling quotes, conformity costs or channel terms; no approved price | Real quotes, bottom-up costing and an approved price list |
| X-06 | No primary customer interviews, no installer or distributor terms, no validated willingness to pay | Structured discovery and pilot customers before committing product investment |
| X-07 | No device identity, provisioning, ownership-transfer, privacy or incident-response model; a helm display processes vessel position | Threat model, DPIA, secure boot/update, key management and audit design |

Supplementary references used above: X-02 (seller legal identity, required for warranty and service terms), H-07 (no
BOM, supplier quotes or traceability), L-01–L-03 and S-06 (source-IP and notice position for any reused component),
and X-04 (release governance). They are cited, not replaced.

### 13.2 Exact evidence required before any DISPLAY sale

- Frozen BOM with manufacturer part numbers, revisions, suppliers and serial traceability (H-05, H-11, H-07).
- Bench, electrical, power-fail, thermal, vibration, ingress and EMC test evidence on the actual article, plus a
  pre-compliance measurement (H-05, H-06).
- Conformity route and EU declaration of conformity per SKU (H-06), with the RED position resolved for any radio, the
  GPSR safety case and the economic-operator identification; CRA vulnerability handling, signed update with rollback,
  SBOM and incident reporting (H-13).
- Written chart distribution decision and chart-provider terms (D-01); basemap terms (D-06); weather provider terms
  and entitlement mapping (D-05); a provider-by-provider clearance register (D-10).
- Executed hardware acceptance results for G-DIS-01 to G-DIS-14 with the article and laboratory named.
- Measured installation hours, reference installations, a documented self-install set and a professional handover
  record (X-05, X-06).
- Real supplier and tooling quotes, bottom-up costing, an approved price list and channel terms (X-05).
- Written warranty and support terms and the seller's legal identity (X-02, X-05).
- Brand clearance before any customer-facing publication (X-01); asset provenance and X-03 closed before any visual
  is published.
- Executed suite of DISPLAY-AC-01 to DISPLAY-AC-20 with independent supervision.

No DISPLAY SKU may be orderable while these are missing. The lifecycle gate for sale is REGULATORY_READY then
OPERATIONS_READY with an approved SKU — not merely a published specification.

---

## 14. Ecosystem, cross-sells and cross-product authority

| Product | Relationship to DISPLAY | Binding boundary |
| --- | --- | --- |
| MAREA NAV | Navigation software that may be presented on the device where the interface exists | Separate subscription; never included; neither requires the other; DISPLAY-NAV = PLANNED |
| MAREA HUB | Onboard data gateway that may supply compatible equipment data | Separate hardware; never included; no unreviewed data path; DISPLAY-HUB = CONDITIONAL |
| MAREA AIS | Receive-only traffic source | Separate hardware; DISPLAY cannot receive AIS by itself; receive-only disclaimer always shown; DISPLAY-AIS = CONDITIONAL |
| MAREA WEATHER | Licensed forecast and layer service | Separate entitlement; only with provider rights for the layer and area; DISPLAY-WEATHER = CONDITIONAL |
| MAREA SENSE | Measurement modules | Separate hardware; only compatible, calibrated values; DISPLAY-SENSE = CONDITIONAL |
| MAREA PILOT | Supervised steering system | Status and monitoring presentation only in a future authorized interface; never steering authority, never engagement, never a control head, never a remote or web path; DISPLAY-PILOT = UNKNOWN |
| MAREA WATCH | Remote monitoring and notification service | Separate product and subscription; no monitoring entitlement in DISPLAY; DISPLAY-WATCH = UNKNOWN |
| MAREA FLEET | B2B multi-vessel platform | FLEET-DISPLAY = UNKNOWN; FLEET must not imply a display integration |
| MAREA CRUISE | Ecosystem bundle context (NAV + HUB + receive-only AIS + DISPLAY) | Bundle content, price and publication are MC-08; never a purchasable price here |

No product MAREA de la familia se presupone incluido en la compra de otro. Cada familia se adopta por separado, y su
compatibilidad se publica por equipo y versión.

---

## 15. Required disclaimers — verbatim, ES and EN

### 15.1 Navigation and instruments disclaimer

Required in this dossier, in the companion annex and in both DISPLAY copy files, because the device presents
position, charts, traffic, depth and weather. Approved wording of
docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §9, used verbatim:

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

### 15.2 AIS receive-only disclaimer

Required wherever received AIS targets are displayed, which includes the defined DISPLAY product. Approved wording,
used verbatim:

- ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.»
- EN: "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder."

### 15.3 PILOT boundary statement

Required wherever the PILOT status surface is mentioned. The steering disclaimer of the claims policy §9 applies to
PILOT itself; for DISPLAY the binding statement is the boundary: the display may present read-only PILOT status and
alarms at most, and presents no engagement, no control head and no steering authority.

- ES: «La pantalla puede mostrar, como máximo, el estado y las alarmas del piloto en modo de solo lectura. No permite
  conectar, desconectar, ajustar el rumbo ni gobernar la embarcación.»
- EN: "The display may show PILOT status and alarms in read-only form at most. It does not engage, disengage, adjust
  heading or steer the vessel."

This is an internal boundary statement, not an approved marketing claim; it is not presented as approved policy text.

### 15.4 Brand attribution

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

### 15.5 DISPLAY batch-03 limitation statement (verbatim, INTERNAL DRAFT wording)

The statement below is the MC-07 internal-draft wording pending claims-register approval. It is **not** claimed as
approved policy text; its placement in this dossier is required by the MC-07 brief §17.

- ES: «La pantalla es un concepto interno: no existe una unidad fabricada ni se han verificado tamaño, brillo, legibilidad solar ni resistencia ambiental. Las cartas y los servicios de datos se licencian por separado.»
- EN: "The display is an internal concept: no manufactured unit exists and its size, brightness, sunlight legibility and environmental resistance have not been verified. Charts and data services are licensed separately."

### 15.6 Display-specific non-assertions (required on every surface)

No measured screen size; no brightness, nit or contrast figure; no resolution stated as a product fact; no IP rating;
no temperature range as fact; no "sunlight readable" guarantee; no certified performance; no "unlimited charts"; no
PILOT control authority; no safety-system framing; no certification, availability or approved price. These are
non-assertions, not limitations of ambition.

---

## 16. Non-assertions and document status

This dossier does **not** assert, and must not be read as asserting: any screen size, measured or frozen; any
brightness, nit, contrast, resolution or viewing-angle figure for MAREA DISPLAY; any sunlight-readable or night-safe
guarantee; any IP rating, temperature range, vibration, shock or salt-fog rating; any CE marking, EU declaration of
conformity, EMC/RED/LVD/GPSR/RoHS/WEEE/CRA compliance or assessment; any NMEA 2000 licence, certification or
operational compatibility; any chart, basemap or weather distribution right; any tested integration with HUB, NAV,
AIS, WEATHER, SENSE, PILOT or WATCH; any PILOT steering, engagement, control-head or remote/web authority; any
certification, stock, lead time, availability, customer count, review or testimonial; any trademark clearance; any
supplier quote, BOM, tooling quote, cost, margin or approved price; any sea trial, bench result or field measurement;
and any image asset — all DISPLAY visuals remain BLOCKED_ON_IMAGE_GENERATION (X-03) and CONCEPT, not REAL_PRODUCT.

Status of this deliverable: INTERNAL, COMPLETE_TARGET_SPECIFICATION, NOT_FOR_SALE, NOT_PUBLISHED. It defines the
finished commercial product and the evidence that would prove it. It does not make MAREA DISPLAY orderable,
publishable, certified, priced or supported, and it does not replace the MC-34 hardware-evidence gate, the DPIA or
any conformity assessment.
