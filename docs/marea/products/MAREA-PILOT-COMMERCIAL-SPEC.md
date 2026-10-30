# MAREA PILOT — Complete commercial specification (MC-06 / D1-PILOT)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D1-PILOT |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Owner | MAREA PILOT Product Director (Product function) |
| Document status | INTERNAL ONLY — NOT PUBLISHED — NOT FOR SALE · `COMPLETE_TARGET_SPECIFICATION` |
| Product id | `PILOT` |
| Customer-facing names | MAREA PILOT · MAREA PILOT Coastal · MAREA PILOT Sail · MAREA PILOT Pro |
| Product type | `HARDWARE_SOFTWARE` — an installed steering system, not a software download and not a plug-in accessory |
| Lifecycle state | `DEFINED` (binding vocabulary, `docs/marea/COMMERCIAL-PORTFOLIO.md` lifecycle; `docs/marea/products/README.md` §3) |
| Branch | `feature/marea-mc06-pilot-sense-watch-products` |
| Date | 2026-10-30 |
| Contract authority | `docs/marea/products/README.md` — §1–§11 (MC-05 conventions) and §12–§23 (MC-06 addendum) |
| Companion deliverables owned by other functions | `docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md` (D10a-PILOT-SAFETY, Independent Marine Safety Engineer); `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` (D4, Lead with Commercial/UX); `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (D5); `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` (D6); `CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` (D7); `PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` (D9); `product-definitions.batch-02.json` (D11) |
| Customer copy | `docs/marea/products/copy/pilot.es.md` and `docs/marea/products/copy/pilot.en.md` (this deliverable, D8; draft internal copy, never publishable while the claims-policy gates are open) |
| Classification | Internal pre-contractual dossier. Not a catalogue, not a product page, not a quotation, not an installation instruction, not a safety certificate and not a commercial offer |

MAREA PILOT is the supervised steering-control family of the MAREA programme. This dossier defines the
**finished commercial product**: what the system is intended to be, for whom, with which physical and
software boundaries, in which editions, under which quotation model, and what evidence would have to exist
before a single unit may be sold or installed. It does not describe an MVP, a prototype milestone, a code
audit or a hardware implementation plan; engineering will decide the final implementation, and this document
fixes the commercial and safety vocabulary that implementation must satisfy.

Three facts govern every page of this dossier and may never be softened:

1. **The product is completely specified and not for sale.** Every edition is `DEFINED` (or `CONDITIONAL`,
   or an `INSTALLATION_PACKAGE`) and every edition is `NOT_FOR_SALE`. No SKU is orderable, no price is
   approved, no stock exists, no installer network exists and no quotation may be issued today.
2. **The safety gate is `BLOCKED`.** `PILOT_SAFETY_GATE = BLOCKED` (H-01, P-04): there is no bench
   evidence, no supervised sea trial, no independent verification and no conformity assessment for any PILOT
   configuration. The intended safety design is specified here; it is **not** evidenced.
3. **PILOT is supervised, local and physical.** The system is assisted and supervised by design: it requires
   continuous watchkeeping and the ability to take manual control at all times; it does not provide
   autonomous steering, unattended operation, collision avoidance, remote or cloud steering, or certification
   of any kind. Manual takeover and a physical E-stop are design boundaries, not optional features.

---

## 0. Contents

1. How to read this dossier (including the status matrix, readiness dimensions and canonical evidence states)
2. The canonical field block (convention)
3. The 24 canonical fields F01–F24
4. The intended steering system — complete subsystem specification
5. Steering modes and their evidence conditions
6. Vessel eligibility and the mandatory installation survey
7. Commissioning, dockside validation, supervised sea trial and operator training
8. Maintenance, diagnostics, firmware update and secure local access
9. Editions — PILOT Coastal, PILOT Sail and PILOT Pro
10. Pricing — starting-price hypothesis and the quotation model
11. Channel and installer economics framework
12. Warranty, service and support
13. Acceptance scenarios PILOT-AC-01 to PILOT-AC-18
14. Cross-sells and the ecosystem path
15. Safety annex — cross-reference to the PILOT safety case
16. Traceability annex — MC-02 blockers and evidence required before sale
17. Required disclaimers (verbatim) and non-assertions

## 1. How to read this dossier

### 1.1 Reading rules

This is the **complete intended final product definition** of MAREA PILOT, written for the customer and for
the commercial organisation, not for the engineer who will build it. Three reading rules apply:

- **The final product is described fully; the current readiness is described honestly.** Every field carries a
  separate evidence line. Capabilities that are not built are labelled `OPEN` or `BLOCKED` and name the
  milestone or artefact that would evidence them. Nothing in the Definition lines may be read as a claim that
  the described behaviour exists, is tested, is certified, is safe in service or is purchasable.
- **Every substantive statement carries an evidence class** — `VERIFIED_REPO`, `VERIFIED_EXTERNAL`,
  `ASSUMPTION`, `HYPOTHESIS`, `OPEN` or `BLOCKED` — and, where relevant, a product-specific canonical state
  from §1.4. `OPEN` and `BLOCKED` are legitimate answers; invented facts are not.
- **Prices are hypotheses.** The only figure this dossier may state is `from EUR 1,290` for the minimum usable
  Coastal configuration, always labelled `HYPOTHESIS_UNAPPROVED`, always described as a starting-price
  hypothesis and never as an all-inclusive, turnkey or purchasable amount. The commercial model is
  quotation-based per vessel (README §17, §18; decision D-009).

### 1.2 Product status matrix (README §1 mapping)

All of the following are true at MC-06 and none may be softened in customer-facing material:

| Dimension | Value |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` — the MC-02 audit is the only engineering evidence; no PILOT product hardware, no tested integration, no bench log and no sea trial exist |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BRAND_CLEARANCE` | `NOT_GRANTED` — MAREA is a proposed brand; no trademark clearance exists (X-01) |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` — OPEN-MARINE grants no reuse right; no root licence, no assignment (L-01–L-03) |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |
| `LIFECYCLE_STATE` | `DEFINED` for the product and for every edition; no edition is `RELEASED`, `FOR_SALE`, `APPROVED` or `PUBLISHABLE` |
| `SAFETY_GATE` | `PILOT_SAFETY_GATE = BLOCKED` (H-01, P-04) |
| `PRICING` | `HYPOTHESIS_UNAPPROVED` — one starting-price hypothesis only, quotation required |

### 1.3 Per-dimension readiness (README §4, never collapsed into one flag)

| Dimension | PILOT value at MC-06 | Evidence and scope |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | This dossier: 24 fields, 18 subsystem specifications, three mode definitions, survey and commissioning process, editions, quotation model, 18 acceptance scenarios |
| `engineering` | `NOT_VERIFIED` | No bench evidence, no hardware-in-the-loop record, no supervised sea trial, no independent verification. The audited source contains partial software safety logic and fail-closed profile rules, but its control API is unauthenticated and it has no rudder feedback, no manual-takeover detection, no hardware watchdog and no rearm path from the host (`HARDWARE-COMPLIANCE-MATRIX.md` §3.7) |
| `licensing` | `NOT_CLEARED` | No inbound or outbound software licence position; OPEN-MARINE ownership/assignment chain unresolved (L-01–L-03; README §7 rule 6 and §16) |
| `hardware` | `NOT_SELECTED` | No BOM, no enclosure, no harness, no drive selection, no control-head article, no serial/traceability scheme; the audited prototype references generic platforms and a legacy drive with no recorded rating (H-05, H-07; `HARDWARE-COMPLIANCE-MATRIX.md` §2) |
| `dataRights` | `NOT_GRANTED` | Own-vessel sensor data is used locally; no display, retention or redistribution right of AIS-derived traffic, charts or weather is granted, and PILOT contains none of those products (README §4 honest values for PILOT) |
| `compliance` | `NOT_STARTED` | No EMC assessment for a switched motor drive, no LVD/EMC/GPSR/RoHS/WEEE/CRA evidence, no EU declaration of conformity, no independent marine-engineer review (H-06, H-13) |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | `from EUR 1,290` is a starting-price hypothesis for the minimum usable Coastal configuration only; no costed basis exists (H-05, H-07, X-05) |
| `brandPublication` | `NOT_GRANTED` | X-01; no customer copy in this milestone is publishable |
| `availability` | `NOT_FOR_SALE` | No SKU, no stock, no installer network, no order flow, no quotation capability, no support contract |

### 1.4 Canonical product-specific evidence states (README §15, used unchanged)

These strings must appear wherever the subject is discussed and must never be upgraded:

| State | Value | Meaning |
| --- | --- | --- |
| `PILOT_SAFETY_GATE` | `BLOCKED` | H-01, P-04: no bench evidence, no sea trial, no independent verification, no conformity assessment |
| `PILOT_PHYSICAL_ESTOP_EVIDENCE` | `NOT_FOUND` | H-10: the E-stop concept is GPIO-level; no physical evidence exists |
| `PILOT_MOTOR_ISOLATION_EVIDENCE` | `NOT_FOUND` | H-03, H-10: no independent motor-power isolation evidence exists |
| `PILOT_RUDDER_FEEDBACK_EVIDENCE` | `NOT_FOUND` | H-01: no rudder or steering feedback exists |
| `PILOT_SEA_TRIALS` | `NOT_PERFORMED` | no supervised sea trial exists in any repository |

### 1.5 Evidence classes (README §5)

| Class | Meaning here |
| --- | --- |
| `VERIFIED_REPO` | Verifiable in this repository; a path is cited |
| `VERIFIED_EXTERNAL` | Verifiable at a cited public source with a check date |
| `ASSUMPTION` | An explicit planning assumption, stated as such, not evidence |
| `HYPOTHESIS` | A commercial or price assumption awaiting approval |
| `OPEN` | Fact not yet established; the intended customer experience is still specified |
| `BLOCKED` | An external condition (licence, certificate, quote, measurement) prevents closure |

The prohibited placeholder token is not used anywhere in this dossier.

### 1.6 The one-message summary

MAREA PILOT is completely specified and not for sale. It is a supervised, installer-quoted steering system
with a physical E-stop, independent motor-power isolation, a local control head and an intended minimum of
three steering modes. It is not an autonomous autopilot, not a remote-controlled helm, not a collision-avoidance
system and not a certified marine product. It has never been bench-tested, sea-tested or independently
reviewed in any recorded artefact; its safety gate is `BLOCKED`; its price is a starting-price hypothesis; and
its editions are `DEFINED`, `CONDITIONAL` and an `INSTALLATION_PACKAGE` respectively. Those are truthful states,
not defects of this document.

## 2. The canonical field block (convention)

Every field F01–F24 uses the contract block exactly as defined in `docs/marea/products/README.md` §6. The
`Definition` line describes the finished commercial experience in customer-understandable language; the
`Evidence` line labels it and cites the path or the missing artefact; `Owner` names a function, not a person;
`Blockers / dependencies` cites MC-02 blocker ids; `Commercial readiness` states one readiness dimension and
its value from README §4. No field is heading-only and no field contains an unlabelled assertion.

## 3. The 24 canonical fields F01–F24

#### F01 — Identity
- **Definition.** MAREA PILOT is the supervised steering-control family of the MAREA programme: an installed system that holds a course, holds a wind angle or follows a route only within the steering modes verified for that specific vessel and installation, always under continuous human supervision and always with immediate manual takeover available. The customer buys a complete installed configuration — a control computer, independent motor-control electronics, a physical helm control head, a drive/actuator matched to the steering system, a steering/rudder feedback reference, a calibrated heading sensor, the required power and safety components (physical E-stop and independent motor-power isolation), commissioning, a supervised sea trial, operator training and a documented installation record — not a box and not a software licence. Category: supervised vessel steering-control system (`HARDWARE_SOFTWARE`). Family: MAREA. Code: `PILOT`. Editions: MAREA PILOT Coastal, MAREA PILOT Sail, MAREA PILOT Pro (the last is a vessel-specific installation package, not a retail SKU). Positioning: a steering system whose claims are bounded by a vessel survey, a named installer, a local-only control boundary and mode-specific verification evidence; it is not an unattended autopilot, not an autonomous system, not a collision-avoidance system and not a remote-controlled helm.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04; `VERIFIED_REPO docs/marea/products/README.md` §2, §12, §18; `VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §3.1–§3.7. Every intended behaviour is `OPEN`; the product is not built and has no article (H-05).
- **Owner.** Product management (PILOT).
- **Blockers / dependencies.** H-01, H-05, H-07, P-04.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`.

#### F02 — Customer segments
- **Definition.** Primary segment: owners of recreational sailing yachts and motor cruisers, roughly 8–15 m, cruising day and coastal waters from Galicia and northern Portugal, whose boat already has a working mechanical steering system and who want assisted course-holding on passage with a person at the helm. Secondary segment: independent marine-electronics installers and refit yards that need a documented, survey-led steering product they can quote, install, commission and support without improvising interfaces. Tertiary segment: small sailing schools, charter operators and marina-maintenance companies standardising a handful of vessels, and owners of a legacy autopilot whose drive or support is at end of life and who want a supervised replacement rather than another opaque consumer unit. Buying contexts: pre-season refit; preparation for a longer coastal passage; replacement of a failing legacy drive; a deliberate upgrade after an insurance or safety review; a first steering system on a well-found used boat. Explicitly not a segment: any buyer seeking unattended or remote helm control, any commercial or passenger-carrying vessel subject to class or flag-state equipment certification, racing performance buyers, and vessels whose steering system cannot be surveyed or manually released.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04 (buyer and problem); `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §1 (pilot go-to-market geography); `VERIFIED_EXTERNAL docs/marea/MARKET-BENCHMARKS.md` PILOT row (a professional installer in Vigo sells and services established autopilot brands; check date 2026-10-30 — a channel and service benchmark, not a MAREA partner or a market-size claim); `ASSUMPTION` segment priority and buying-context ranking; `OPEN` — no primary customer evidence exists (X-06).
- **Owner.** Product marketing and commercial development.
- **Blockers / dependencies.** X-06, X-05.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F03 — Customer problems
- **Definition.** The problems MAREA PILOT is designed to address: (1) helm fatigue and crew workload on long coastal passages, especially with a short-handed crew; (2) an existing autopilot of unknown age, wear, calibration and history that the owner cannot assess and that provides no truthful state or alarm information; (3) steering systems installed over the years with no written record of what was tested, so neither owner nor insurer nor next technician can reconstruct the installation; (4) the fear — justified by the category's history — that a steering device takes authority away, fails silently or cannot be overridden; (5) manuals and product pages that describe performance and confidence but not the boundaries of operation, the manual-takeover drill or the physical safety path; (6) the retrofit problem: drives, feedback, compass and wiring differ per vessel, so a catalogue product rarely fits without a survey. Existing alternatives: established consumer and OEM autopilots fitted by a dealer; a professional/legacy autopilot with service support; windvane self-steering on sailing yachts; and simply helming by hand. MAREA PILOT's intended answer is a supervised, survey-quoted installation whose safety boundaries are physical, documented and trained, whose steering modes are claimed only after mode-specific verification, and whose price is a written vessel quotation rather than a shelf figure.
- **Evidence.** `ASSUMPTION` — problem framing and ranking; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04 and `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` H-01/P-04 (no certification, no test evidence); `VERIFIED_EXTERNAL docs/marea/MARKET-BENCHMARKS.md` PILOT row (installer channel and service benchmark, check date 2026-10-30); `OPEN` — no interviews, no installer discovery, no willingness-to-pay evidence (X-06).
- **Owner.** Product management with commercial strategy.
- **Blockers / dependencies.** X-06, P-04.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F04 — Complete end-state functionality
- **Definition.** At end state — and only once the evidence set of §16 exists — a customer receives a fully surveyed, installed, commissioned, sea-trial-verified and supported supervised steering system. The finished customer experience contains, and this dossier specifies, all of the following: a vessel eligibility decision from a written installation survey; a quotation that names every included and excluded item; the physical system described in §4 (control computer, independent motor-control electronics, physical control head, surveyed drive/actuator, steering feedback, calibrated heading, optional wind input, GNSS/route input, hardware watchdog, heartbeat timeout, overcurrent and thermal monitoring, physical E-stop, independent motor-power isolation, alarm classification, manual standby/override, defined loss-of-power behaviour); three steering modes with explicit evidence conditions (§5): heading hold as the final intent of the standard edition, wind-angle steering conditional on verification, and route/track following conditional on verification; local mode engagement and disengagement only from the control head; a commissioning sequence with dockside validation and supervised sea trials (§7); operator training and a signed handover record; a maintenance and diagnostics plan (§8); a documented firmware-update and secure local-access model (§8); after-sales support and a service path (§12); and a documented ownership-transfer procedure. The finished product does **not** contain, by design and not as a missing feature: autonomous or unattended steering, a remote or cloud steering command path, collision avoidance, AIS-based steering, automatic route upload that commands the helm, a mobile-app helm control, or any certification claim. Every steering mode is supervised: a qualified person must be at the helm, able to take manual control immediately.
- **Evidence.** `OPEN` — intended end-state behaviour; the subsystem register in §4 and the mode matrix in §5 record the evidence state of every element; `BLOCKED` H-01, P-04 for the safety gate, H-05/H-07 for hardware, H-01 for rudder feedback and takeover detection; `VERIFIED_REPO docs/marea/products/README.md` §6 F04 and §19 (cross-product authority).
- **Owner.** Product management (PILOT) with engineering and safety.
- **Blockers / dependencies.** H-01, H-03, H-05, H-07, H-10, P-04, P-10.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F05 — Differentiation
- **Definition.** MAREA PILOT is intended to be relevant for four reasons that narrow product pages do not state: (1) **supervision-first architecture** — a physical E-stop that removes motor power independently of firmware, independent motor-power isolation, a control head with an always-available manual standby, and a documented manual-takeover drill are design boundaries fixed before the product exists, not marketing options; (2) **a survey-quoted installation** in which the vessel is assessed, the included and excluded items are written down, the installer is named and the commissioning and sea-trial records stay with the boat; (3) **evidence-bounded mode claims** — wind-angle and route/track modes are not sold as equivalent to heading hold until each mode has its own verification evidence, and the copy says so; (4) **a local-only control boundary** in which no cloud, internet or remote command can steer the vessel, and only read-only status can leave the system. It is explicitly not differentiated by steering performance, accuracy, reliability or speed of response: no comparative or performance evidence exists, and the claims policy prohibits such claims. The commercial claim is supervision quality, installation accountability and evidence discipline, and it remains a `HYPOTHESIS` until real installations and independent review exist.
- **Evidence.** `ASSUMPTION` — differentiation hypothesis; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 (Class P: no performance comparison without test evidence) and §4.3 (PILOT supervision wording); `VERIFIED_REPO docs/marea/products/README.md` §16, §19; `OPEN` until MC-06 review and later verification milestones assess it.
- **Owner.** Product management and commercial strategy.
- **Blockers / dependencies.** H-01, P-04, X-05, X-06.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F06 — Editions
- **Definition.** Three edition-level objects, fixed by README §12 and §18 and by decision D-008, with no fourth edition and no renamed tier: **MAREA PILOT Coastal** — the standard surveyed installation for a supported steering and drive family, built around heading hold as its final intent; verdict `DEFINED`. **MAREA PILOT Sail** — the Coastal configuration extended with verified wind-angle steering; verdict `CONDITIONAL`, conditional on wind-angle mode verification on representative vessels and on a compatible, calibrated wind source (H-01); no price may be stated. **MAREA PILOT Pro** — a vessel-specific, quotation-only installation package for configurations outside the Coastal standard envelope; verdict `INSTALLATION_PACKAGE`, no retail SKU and no price. The edition difference must be a real difference in surveyed scope, drive family, feedback and integration, not a software toggle that disables a capable unit. Full edition architecture, included and excluded items in §9.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §12 (identities), §14 (verdict vocabulary), §17 (allowed price hypothesis), §18 (D-008/D-009); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04 (edition intent); `HYPOTHESIS` — edition content split and value boundary; `OPEN` — the final drive-family envelope and the exact Pro scope after hardware and survey design (H-03, H-05, H-07).
- **Owner.** Product management (PILOT) with commercial strategy.
- **Blockers / dependencies.** H-01, H-03, H-05, H-07, X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F07 — Included items
- **Definition.** The intended included content, per edition and per quotation, is: the physical helm control head; the control computer; the independent motor-control electronics; the drive/actuator unit selected by the survey and named in the quotation; the steering/rudder feedback components required by the surveyed configuration; a calibrated heading sensor; any wind sensor only where Sail is quoted and the wind source is compatible and calibrated; the harness, fusing, contactor and mounting items specified for that installation; the physical E-stop; the independent motor-power isolation components; installation labour by an authorised installer; commissioning; dockside validation; the supervised sea-trial programme for the modes being delivered; operator training; the installation, configuration and commissioning records; the on-device software licence for the published support window; documentation in Spanish and English; and the published support entitlement. Because no BOM exists, the exact item list per SKU is `OPEN` and may not be inferred from this paragraph; the quotation is the authoritative inclusion document and must name every item (D-009). Intended exclusions, stated before purchase: anything not named in the quotation; vessel structural, joinery or steering-system replacement work; batteries, charging or vessel-wide electrical upgrades; navigation software, charts, weather or AIS products; remote monitoring or connectivity services; spare drives and consumables; installation outside the served territory; and any mode or integration whose verification evidence is not delivered with the installation.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04 (final offer, editions, buying path); `VERIFIED_REPO docs/marea/products/README.md` §17–§18; `OPEN` — exact per-SKU contents (no BOM, H-05, H-07); `BLOCKED` H-03 (the motor-link interface is contradictory and not frozen).
- **Owner.** Product management with hardware engineering and procurement.
- **Blockers / dependencies.** H-03, H-05, H-07, X-05.
- **Commercial readiness.** `hardware = NOT_SELECTED`.

#### F08 — Optional accessories
- **Definition.** The intended optional ecosystem, described by function and never given an invented MAREA accessory name: a second control-head station only where the installation survey and the safety case support it (`OPEN`); an additional or longer harness and mounting kit for a specific helm layout (`OPEN`); a compatible wind sensor as a Sail input only after it is qualified as a steering input, not merely as a SENSE measurement; a compatible GNSS source where the installation requires one and the vessel does not already provide one; MAREA NAV for route context, which is an input to the helm, never an authority over it; MAREA HUB for read-only status and instrument context, which is not the actuator controller; MAREA DISPLAY for an approved read-only PILOT status view where the interface is validated; MAREA WATCH for authorised read-only status ashore; a maintenance plan and extended service items, both `OPEN`; and installer training or a re-survey when the vessel changes. Every optional item is compatible only within the published compatibility and survey envelope, and no optional MAREA product is presumed included in a PILOT purchase. No accessory price exists.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §9 (accessories are not families or editions); `VERIFIED_REPO docs/marea/products/README.md` §19 (cross-product authority); `OPEN` — exact accessory list and second-station support; `BLOCKED` H-01, H-05, X-05, X-06.
- **Owner.** Product management with procurement and integration.
- **Blockers / dependencies.** H-01, H-05, X-05, X-06.
- **Commercial readiness.** `hardware = NOT_SELECTED`.

#### F09 — Integration
- **Definition.** Integration is governed by the local control boundary, not by protocol names. The intended inputs are: a calibrated heading reference; a steering/rudder feedback reference; GNSS position, course and speed for route/track mode; a compatible, calibrated wind source for Sail's wind-angle mode; and route/waypoint context from MAREA NAV only through a future authorised local integration that has been verified and approved — NAV supplies route information as an input and never commands the actuator. The intended outputs are: drive commands inside the PILOT system only; read-only status to MAREA HUB, MAREA DISPLAY and MAREA WATCH under an approved, authenticated interface; and a local installation and diagnostic record. MAREA HUB is not the actuator controller. MAREA WATCH can display status but never engage, disengage, adjust heading or steer. No NMEA 2000 certification or operational compatibility is claimed: NMEA 2000 is not implemented (type stubs only) and no licence or certification exists (H-04). NMEA 0183 sentence parsing is sentence support, not conformance to the standard. Signal K is not a blanket guarantee: compatibility is per device, per firmware/software version, per message path and per direction, and only with recorded evidence. The published compatibility matrix is the single authority and lists each drive family, steering type, sensor model, firmware version, direction and known limitations. No public automatic steering-control path exists outside the PILOT boundary, and none may be introduced through NAV, HUB, DISPLAY or WATCH.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §19 (cross-product authority matrix); `VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §3.1, §4.1–§4.2 (no NMEA 2000); `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §7 (G2 unauthenticated API, G3 contradictory motor link, G4 fabricated UI state); `OPEN` — every device-level compatibility result (P-02-equivalent for PILOT integration is untested).
- **Owner.** Integration owner (PILOT Product Director) with engineering.
- **Blockers / dependencies.** H-02, H-03, H-04, P-10.
- **Commercial readiness.** `dataRights = NOT_GRANTED`.

#### F10 — Professional installation
- **Definition.** Professional installation is **mandatory for every PILOT configuration**; there is no self-install edition, no plug-and-play claim and no configuration in which the owner is expected to size a drive, install a contactor or verify an E-stop alone. The intended service chain is: pre-sale vessel questionnaire; on-board installation survey; eligibility verdict; written quotation naming included and excluded items; ordered materials; installation by an authorised installer; electrical and mechanical checks; dockside validation; commissioning profile; supervised sea trials per delivered mode; operator training including the manual-takeover and E-stop drills; signed handover with installation, configuration and test records; and a maintenance plan. The owner receives the records; the vessel keeps them on transfer. No installation duration, installation labour price, drive price or total price may be stated before measurement and quotation, and no installer certification scheme exists today, so no "certified technician" claim may be made. The service is `NOT_FOR_SALE` and the installer network does not exist.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04 (survey → quotation → commissioning → sea trials → training → maintenance); `VERIFIED_REPO docs/marea/products/README.md` §17–§18; `VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §3.5 G1–G9; `ASSUMPTION` service design; `BLOCKED` — no installer agreements, no competence scheme, no measured installation (X-05, X-06).
- **Owner.** Service operations with the installer network.
- **Blockers / dependencies.** H-01, H-05, H-07, P-04, X-05, X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F11 — Onboarding
- **Definition.** The intended first-use experience is an installer-led commissioning and handover, not a manual and a hope. Sequence: the survey and quotation happen before money changes hands; on installation the installer records the vessel, steering type, drive unit, feedback reference, heading sensor, E-stop and isolation components; at first power-up the installer confirms source status, completes compass calibration and deviation check, demonstrates the physical E-stop, demonstrates manual standby and the manual-takeover drill, explains every alarm class, records the configuration and writes the installation record; the first supervised sea trial happens in benign conditions before any mode is used routinely; the owner receives training in engage/disengage, mode selection, adjustment, alarm acknowledgement, manual takeover, E-stop and the maintenance checks the owner may perform; and the owner leaves with a printed or exported handover pack containing the installation record, the configuration record, the alarm card, the maintenance schedule, the support route and an explicit statement of what the system does not do. Education material is versioned with the product and provided in Spanish and English. No setup screen, manual, alarm card or training material exists today; the onboarding is `OPEN` and no screen has been usability-tested.
- **Evidence.** `OPEN` — onboarding UX, commissioning tooling, manuals and training material not built; `ASSUMPTION` sequence; `VERIFIED_REPO docs/marea/products/README.md` §6 F11 requirement.
- **Owner.** UX and content with support engineering and the installer network.
- **Blockers / dependencies.** H-01, H-05, H-07, P-04.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F12 — Licensing and subscriptions
- **Definition.** The intended commercial model is a one-time purchase of the installed system, including the licence to use its on-device software and local steering functions for the published support window, with security and corrective updates inside that window. **No subscription is required for the local steering function.** A subscription or service entitlement may never disable local steering, local alarms, manual takeover, the physical E-stop or any other safety-relevant local function when payment fails or a subscription expires — this is a design requirement of the specification, not a tested behaviour (README §16 rule 7). Any future cloud or remote service (status, monitoring, maintenance records) is a separate, optional product and may never become a steering path; MAREA WATCH, MAREA HUB and MAREA NAV entitlements are separate purchases and buying PILOT never implies one of them. The software licence position is `NOT_CLEARED` because the OPEN-MARINE ownership and assignment chain is unresolved (L-01–L-03). The support window, out-of-warranty service terms, ownership-transfer rules and any paid maintenance plan are `OPEN` and must be written before sale.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 rule 7 (subscription isolation) and §19; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04; `BLOCKED` L-01–L-03 (software ownership), X-02 (seller legal identity), X-05 (commercial terms).
- **Owner.** Product management with legal and compliance.
- **Blockers / dependencies.** L-01, L-02, L-03, X-02, X-05.
- **Commercial readiness.** `licensing = NOT_CLEARED`.

#### F13 — Retail and partner pricing
- **Definition.** The only permitted price statement is: **MAREA PILOT Coastal — from EUR 1,290, `HYPOTHESIS_UNAPPROVED`, VAT-inclusive retail hypothesis, starting-price hypothesis for the minimum usable Coastal configuration only.** It is explicitly **not** an all-inclusive price, not a turnkey price, not a quotation, not an offer, not a launch price and not a discount, and it may never be used as a shelf or "buy now" figure. The commercial model is **quotation-based**: each vessel receives a written quotation after survey that names every included and excluded item, the drive unit, the labour, the commissioning, the training and the delivered modes (D-009). No price may be stated for MAREA PILOT Sail, MAREA PILOT Pro, any drive or actuator, any installation, any second station, any extended warranty, any maintenance plan or any SENSE/HUB/NAV/WATCH product; those are `OPEN` and require costed evidence. No partner, distributor, installer or volume price exists; the B2B structure is `OPEN` and belongs to the pricing and channel deliverable. The `from EUR 1,290` figure must not be summed into a bundle or implied to make a bundle turnkey (README §17).
- **Evidence.** `HYPOTHESIS` — the only permitted PILOT figure, `VERIFIED_REPO docs/marea/products/README.md` §17 (binding qualification) and §18 (D-009); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6; `BLOCKED` X-05 (no BOM, no quotes, no channel terms).
- **Owner.** Commercial strategy and pricing with finance.
- **Blockers / dependencies.** X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F14 — Direct and ongoing costs
- **Definition.** A costing framework with named inputs only, because no cost figure exists: control computer; motor-control electronics; control head and enclosure; drive/actuator unit and its availability risk (a legacy drive family raises provenance and spares questions); feedback reference; heading sensor; harness, connectors, fusing, contactor and isolation components; enclosures, labelling and documentation; conformity programme including EMC assessment of the switched motor drive, LVD/EMC/GPSR/RoHS/WEEE applicability and CRA security work (H-06, H-13); bench, hardware-in-the-loop and supervised sea-trial programme (H-01); independent marine-engineer review (H-01, P-04); installation labour per vessel; commissioning and training time; warranty accrual; spares and field service; freight and packaging; payment fees; channel/installer margin; support and firmware maintenance including vulnerability handling; insurance and product-liability provision; and localisation. Contribution per installation is deliberately not computed: presenting a margin, a payback period or a break-even point would invent BOM, labour, conformity and channel data.
- **Evidence.** `BLOCKED` — no BOM, supplier quotes, conformity quote, insurance terms or channel terms (H-05, H-07, X-05; README §17); `ASSUMPTION` on the cost categories; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price-and-channel decision rule.
- **Owner.** Finance and procurement with product management.
- **Blockers / dependencies.** H-05, H-06, H-07, H-13, X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F15 — Channel economics
- **Definition.** The intended channel model is direct commercial ownership by EMBARCARTE with delivery through authorised professional installers and refit yards, starting in Galicia and northern Portugal. The responsibility split is a safety boundary, not a convenience: EMBARCARTE owns the product definition, the compatibility and safety-case authority, the warranty policy and the training requirements; the installer owns the vessel survey, the mechanical and electrical installation, the commissioning, the dockside validation, the supervised sea trial, the operator training, the handover record and first-line support, and is accountable for workmanship. No installer is announced, appointed or described as certified until an installer agreement set, a competence scheme, insurance requirements, a safety-responsibility matrix and service-level expectations exist — none of which exists today (`OPEN`, X-05, X-06). Installer margin, discount, rebate and volume terms are `OPEN`; no commission, percentage or channel price is stated. The market is entered through a survey request that ends in a quotation, never in a self-service order.
- **Evidence.** `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §2 (installer programme) and `docs/marea/MARKET-BENCHMARKS.md` PILOT row (installer channel benchmark, not a partner); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04 and price-and-channel decision rule; `ASSUMPTION` responsibility split; `BLOCKED` X-05, X-06.
- **Owner.** Commercial development with service operations.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F16 — Competitor comparison
- **Definition.** Only descriptive, verifiable anchors, used as category context and never as a superiority claim. The establishable anchor is that supervised and legacy autopilot systems are sold and serviced today through professional marine-electronics installers — the public listing of an established installer in Vigo that sells and services multiple autopilot manufacturers establishes the channel and service expectation (retailer listing, check date 2026-10-30). That is a channel benchmark, not confirmation of a MAREA partner, and no competitor product has been tested against MAREA PILOT. The other indirect alternatives are the OEM autopilot fitted by a boatyard, a windvane self-steering system on a sailing yacht, and helming by hand. MAREA PILOT is not compared on steering performance, accuracy, reliability, response, power consumption or price against any named competitor, because no comparative test evidence exists and the claims policy prohibits such claims (Class P). Its intended comparison points are supervision architecture, the physical safety path, survey-quoted installation accountability and evidence-bounded mode claims; those are `HYPOTHESIS` until real installations and independent review exist. No market size, share, price benchmark test or competitor certification statement is asserted.
- **Evidence.** `VERIFIED_EXTERNAL docs/marea/MARKET-BENCHMARKS.md` PILOT row and finding 4 (PILOT is a high-liability, vessel-specific proposition; sell with supervised installation and service only after demonstrated physical safety; check date 2026-10-30); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class P; `HYPOTHESIS` positioning implication; `OPEN` — no like-for-like comparison exists (X-06).
- **Owner.** Commercial strategy.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F17 — Sales arguments
- **Definition.** Honest buyer arguments and the objection handling that goes with them. Arguments: a steering system designed around supervision, with a physical E-stop, independent motor-power isolation and a control head whose manual standby is always available; an installation that is surveyed, quoted and recorded instead of improvised; mode claims that are made only when the mode has verification evidence; a local-only control boundary — nothing on the internet, no app and no remote party can steer the boat; and a system whose documentation says what it does not do. Objection handling: "Is this an autopilot I can leave alone?" — it is a supervised steering system: you keep watch and must be able to take manual control at all times; there is no unattended mode. "Will it work on my boat?" — only after the installation survey; a configuration outside the supported envelope is either quoted as a Pro package or declined. "Why is there no fixed price?" — a steering installation depends on the drive, the steering system, the feedback, the electrical work and the labour, so the quote names every included and excluded item; `from EUR 1,290` is a starting hypothesis for the minimum Coastal configuration, not a price. "How do I take over?" — disengage at the control head and take the helm; the manual release is mechanical and the E-stop removes motor power. "Can I control it from my phone or from shore?" — no; no remote or cloud steering path exists or is planned. "Is it certified?" — no certification is claimed; every edition is `DEFINED` and the safety gate is open. No comparative claim against a named competitor is permitted and no sales statement is publishable while the claims register is empty.
- **Evidence.** `ASSUMPTION` — argument ranking; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§5, §8 (claims register empty) and §9 (PILOT disclaimer); `VERIFIED_REPO docs/marea/products/README.md` §16–§17; `OPEN` — no sales test exists (X-06).
- **Owner.** Product marketing with sales enablement.
- **Blockers / dependencies.** H-01, P-04, X-01, X-06.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F18 — FAQ
- **Definition.** The pre-sale and post-sale questions PILOT must answer truthfully. What exactly is being installed? — the control head, control computer, independent motor-control electronics, the surveyed drive, feedback, heading sensor, E-stop, isolation and harness, plus commissioning, sea trial, training and records; the quotation names the exact items. Can it steer unattended? — no; it is supervised, requires continuous watchkeeping and immediate manual control. Who installs it? — an authorised professional installer; there is no self-install edition, and the installer network does not yet exist. What happens if power fails? — the drive must be de-energised and the helm returns to manual; the system must not resume a mode automatically after power returns and requires an explicit re-engage. How do I take over? — disengage at the control head and take the helm; the manual release is mechanical; the physical E-stop removes motor power. What if a sensor fails? — the affected mode must demote or disengage with a local alarm, and a missing value is never shown as a valid one. Which drives and steering systems are supported? — only those in the published compatibility envelope after survey; there is no universal compatibility. Does it work with MAREA NAV? — NAV may provide route context through an approved local integration once verified; NAV never commands the helm. Will it follow a route? — route/track following is `CONDITIONAL` and is only delivered where it has been verified for that installation. Can a subscription disable it? — no; local steering, alarms and manual takeover may never be gated by an entitlement. How is it maintained? — an installer-led maintenance plan with owner checks, including E-stop and alarm tests. Is it certified? — no certification is claimed. Can I move it to another boat? — a new survey and re-quotation are required; ownership transfer is documented. How much does it cost? — a quotation per vessel; `from EUR 1,290` is a starting-price hypothesis only.
- **Evidence.** Derived from this dossier; `OPEN` for the answers that depend on unbuilt capability and on the unbuilt installer network; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4–§6.
- **Owner.** Product management with content and support.
- **Blockers / dependencies.** H-01, H-05, P-04, X-05.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F19 — Warranty and support
- **Definition.** The intended after-sales position: the statutory consumer guarantee under Spanish and EU law, plus a contractual warranty whose duration and conditions are not yet defined and must be written before sale. Support covers product questions, interpretation of diagnostics, update assistance and the fault-return process, with a defined first line owned by the installer and a defined escalation to EMBARCARTE. Safety-related faults are handled as a stop-use condition: the system is not to be used until inspected, and the incident is recorded. A customer can export a diagnostic bundle for support without granting remote control, and **no support action may ever be performed by remote steering**. Response time, 24/7 service, a spare-unit policy, an out-of-warranty repair price and any service-level commitment may not be promised until a real service contract, staffing and spares position exist; none of them exists. Ownership transfer updates the registered owner and preserves the installation record but does not extend or reset the warranty. The seller's legal identity is required for any warranty text and is currently absent (X-02). A safety-recall and field-action process is required before sale and does not exist.
- **Evidence.** `OPEN` — warranty terms, support levels, RMA and spares policy, field-action process; `BLOCKED` X-02 (legal identity), H-13 (secure update lifecycle, CRA), X-05; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C (no warranty length or response time without written terms).
- **Owner.** Customer support with legal and compliance.
- **Blockers / dependencies.** H-13, X-02, X-05.
- **Commercial readiness.** `compliance = NOT_STARTED`.

#### F20 — Bilingual product page copy
- **Definition.** The customer-facing Spanish and English copy for PILOT is deliverable D8 of this milestone and lives in `docs/marea/products/copy/pilot.es.md` and `docs/marea/products/copy/pilot.en.md`. The two files use exactly the 24 numbered headings of `copy/nav.es.md` and `copy/nav.en.md`, followed by an approved-disclaimer section, and both carry the status banner `DRAFT — INTERNAL ONLY — NOT PUBLISHED — PRODUCT DEFINITION COMPLETE, NOT FOR SALE — PRICES ARE HYPOTHESES, NOT APPROVED.` This field fixes what that copy may contain: the exact product and edition names; the supervised nature of the system and the always-available manual takeover; the mandatory installation survey and survey-quoted commercial model; the three editions and their verdicts (`DEFINED` / `CONDITIONAL` / `INSTALLATION_PACKAGE`); the inclusion and exclusion principle; the mode evidence conditions; what the quotation includes and excludes; the maintenance, update and support position; the readiness state with the claims-policy CTA pair **"See the specification"** / **«Ver la especificación»** as primary and **"Request an installation survey"** / **«Solicitar estudio de instalación»** as secondary — never a purchase CTA; the PILOT supervised-steering disclaimer and the navigation disclaimer verbatim in the page language; the brand attribution; ES using **tú** and EN using neutral professional "you"; no price, no stock, no availability, no certification, no review or testimonial, no comparative superiority and no `®`/`™`; and no statement that strengthens or exceeds this dossier. The copy is internal draft while `brandPublication = NOT_GRANTED` and may not be published. All ten PILOT assets remain `BLOCKED_ON_IMAGE_GENERATION` (X-03) and `CONCEPT`, never a manufactured device.
- **Evidence.** `VERIFIED_REPO` — the two copy files are produced by this deliverable and exist in this checkout after delivery; their structure and claim conformance are a matter for independent MC-06 review and are not self-certified here. `VERIFIED_REPO docs/marea/products/README.md` §22 (copy conventions, ten asset ids `PILOT-HERO-01` … `PILOT-TEC-10`); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5, §9; `BLOCKED` X-01 (brand), X-03 (image generation).
- **Owner.** UX, content and localisation with product review (facts).
- **Blockers / dependencies.** X-01, X-03.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F21 — Cross-sells
- **Definition.** The intended ecosystem path: MAREA PILOT as the steering layer, with MAREA NAV for route context (NAV is standalone software and never commands the helm), MAREA HUB for read-only status and instrument context, MAREA SENSE Wind as a candidate wind input for Sail only after it is qualified and calibrated as a steering input, MAREA DISPLAY for an approved read-only status view at a second station, MAREA WATCH for authorised read-only status ashore, and — at ecosystem level only — the MAREA SAIL and MAREA COMPLETE bundles as defined by MC-08. Bundle content, price and publication are not decided here: the `EUR 1,990` and `EUR 3,490` figures in the portfolio are bundle hypotheses labelled `HYPOTHESIS_UNAPPROVED`, never a purchasable price and never a turnkey PILOT installation (README §8, §17). Cross-sell material must state which included product is `DEFINED` and not sale-ready, must not imply that a bundle is orderable, and must never describe a PILOT installation as included by default in any bundle. The internal upgrade paths are Coastal → Sail only when wind-angle verification exists, and Coastal or Sail → Pro as a re-quoted installation package; a Standard-to-Pro licence toggle does not exist.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle architecture and §04; `VERIFIED_REPO docs/marea/products/README.md` §17, §18, §19; `OPEN` — bundle governance MC-08 and upgrade mechanics; `HYPOTHESIS` on attachment value.
- **Owner.** Commercial product management.
- **Blockers / dependencies.** X-05, MC-08 bundle governance.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F22 — Retention strategy
- **Definition.** Retention is earned by a safe, well-supported installed base, not by lock-in. The intended mechanisms are: an installation record the owner values and can keep; an installer-led maintenance plan with season-start checks; firmware and security updates inside the published support window; training refreshers when a mode is added; a documented re-survey and re-quote path when the vessel changes (new drive, new wind sensor, new helm station, new owner); responsive support that can explain an alarm without taking control; and an honest upgrade path to Sail when wind-angle verification exists. The owner can export the installation record, configuration and maintenance history and can leave without losing the manual steering function, which is the boat's own. Recurring revenue exists only where a real service is delivered, and no entitlement is constructed to make a purchased system degrade. Retention is measured through support incidence, maintenance adherence, update uptake, mode adoption and ownership-transfer survival, not through asserted loyalty; no installed base exists yet.
- **Evidence.** `ASSUMPTION` — retention hypothesis; `OPEN` — no installed base, no maintenance-plan product, no update system; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` product-system logic and README §16 rule 7.
- **Owner.** Customer success with product management.
- **Blockers / dependencies.** H-13, X-05, X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F23 — Success metrics
- **Definition.** Metrics to be defined and measured, with no invented targets: completed safe installations; commissioning fault frequency per installation; share of surveyed vessels that are eligible; mode-verification pass rate per mode and vessel; manual-takeover drill completion at handover; E-stop test completion and record completeness; nuisance-alarm and false-trip rate; support tickets per hundred installations; field failure rate; warranty incidence; maintenance-plan adherence; update uptake and rollback success; re-survey and upgrade rate; ownership-transfer completion; cross-sell attachment into NAV, HUB, SENSE and WATCH; owner training completion; and incident or near-miss reporting rate. Baselines and targets are `OPEN`; stating a number now would be invented. Contribution per installation is measurable only after real BOM, labour, conformity, insurance and channel data exist.
- **Evidence.** `OPEN` — no installation, instrumented product or sales data; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §04 KPIs (completed safe installations, commissioning fault frequency, support response, field failure rate); `VERIFIED_REPO docs/marea/products/README.md` §6 F23.
- **Owner.** Product operations with finance.
- **Blockers / dependencies.** H-01, X-05, X-06.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F24 — End-to-end acceptance
- **Definition.** Acceptance means the complete product demonstrably works end to end on real vessels: the eighteen scenarios of §13 are executed and recorded; a frozen hardware design exists; bench and hardware-in-the-loop evidence exists for each safety function; supervised sea trials per delivered steering mode exist, with failure injection; the independent review required by the safety case exists; conformity evidence for the actual installation exists; the installer chain has been validated on reference vessels with measured installation hours; the update, rearm, diagnostics and manual-takeover paths have been exercised; and real owners have completed training and handover. Documentation, unit tests, simulation and source-code review do not constitute acceptance, and no PILOT SKU may be marked sale-ready from them. No scenario or gate is claimed as passing in this dossier: `PILOT_SEA_TRIALS = NOT_PERFORMED`, `PILOT_SAFETY_GATE = BLOCKED`, and every scenario is `NOT_EXECUTED`.
- **Evidence.** `OPEN`/`BLOCKED` — scenarios in §13, gate requirements in §16 and in `HARDWARE-COMPLIANCE-MATRIX.md` §3.5 G1–G9; independent review `NOT_EVIDENCED` (E6 absent); `VERIFIED_REPO docs/marea/products/README.md` §15.
- **Owner.** Quality assurance with engineering and compliance; independent verification by a reviewer who is not the author.
- **Blockers / dependencies.** H-01, H-03, H-05, H-06, H-07, H-10, H-13, P-04, P-10.
- **Commercial readiness.** `compliance = NOT_STARTED`.

---

## 4. The intended steering system — complete subsystem specification

This section is the substantive expansion of F04. It describes the **finished installed system**. Every
subsystem is part of the final product and none may be dropped because it is currently unevidenced. The
"evidence state" column says what is actually established today, not what is promised. The audited prototype
is referenced by the MC-02 audit (`docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §2–§3,
`docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §7); it is **not** a product article, and nothing
in it may be described as tested.

### 4.1 System boundary — what sits where

```
              ┌──────────────────────────── vessel ─────────────────────────────┐
              │                                                                 │
  heading ────┤  heading/IMU ─┐   wind (Sail) ─┐   GNSS ─┐   route context ─┐  │
  feedback ───┤  rudder/steer ┤                │         │  (NAV, future)   │  │
              │               ▼                ▼         ▼                  ▼  │
              │        ┌───────────────────────────────────────────┐           │
              │        │ CONTROL COMPUTER (local, no cloud path)   │           │
              │        │ guidance · mode logic · alarms · logging  │           │
              │        └───────────────┬───────────────────────────┘           │
              │                        │ demand + enable + heartbeat (~10 Hz)  │
              │                        ▼                                       │
              │        ┌───────────────────────────────────────────┐           │
              │        │ INDEPENDENT MOTOR-CONTROL ELECTRONICS     │           │
              │        │ real-time PWM/DIR · own watchdog · limits │           │
              │        └───────────────┬───────────────────────────┘           │
              │                        │ drive power (through isolation)       │
              │                        ▼                                       │
              │        ┌───────────────────────────────────────────┐           │
              │        │ DRIVE / ACTUATOR ─── steering system ─────│───► helm  │
              │        └───────────────────────────────────────────┘           │
              │                                                                 │
              │  CONTROL HEAD (physical, at helm) ── engage/standby, mode,      │
              │  adjust, acknowledge, physical E-STOP                           │
              │  INDEPENDENT MOTOR-POWER ISOLATION (contactor/breaker,          │
              │  operator-actuated, not driven by firmware)                     │
              └─────────────────────────────────────────────────────────────────┘
```

Three boundaries are structural and may never be redesigned away:

1. **The control computer never powers the motor.** Guidance logic and power switching are separated; the
   motor-control electronics hold their own limits and their own timeout.
2. **Manual authority is physical.** Manual standby, the manual release and the E-stop do not depend on the
   control computer, on software mode state or on any network.
3. **No steering command crosses the system boundary.** No cloud, internet, mobile-app, NAV, HUB, DISPLAY or
   WATCH path can command the actuator; status may leave read-only.

### 4.2 Subsystem register

| ID | Subsystem | Intended final behaviour | Current evidence state | Blockers |
| --- | --- | --- | --- | --- |
| PS-01 | **Control computer** | Runs guidance, mode logic, alarm classification, logging and the local interface. Local-only; never directly powers the motor; must not be reachable for steering commands from the vessel network or the internet; restarts into a safe standby state. The audited prototype uses a single-board computer (model not recorded) and its HTTP command surface is unauthenticated, binds all interfaces and exposes engage, drive-test, tuning and E-stop to any host on the LAN. | `VERIFIED_REPO` prototype code exists (`HARDWARE-COMPLIANCE-MATRIX.md` §2.1 HW-01, §3.4 F-01); `OPEN` product hardware; security boundary not built. | H-02, H-05, H-07 |
| PS-02 | **Independent motor-control electronics** | A real-time bridge between the control computer and the drive, running on its own microcontroller, applying per-profile duty and motion limits and cutting the drive when the command heartbeat stops. Physically and electrically separable from the control computer so a computer fault cannot hold the drive on. The audited prototype documents a microcontroller bridge and a brushed-DC H-bridge driver, but the physical motor link is contradictory (documented UART vs firmware USB CDC) and no production selection exists. | `VERIFIED_REPO` documented design and code (`HARDWARE-COMPLIANCE-MATRIX.md` §3.1, §3.3; `OPEN-MARINE-CAPABILITY-INVENTORY.md` §7 G3); `OPEN` hardware; interface not frozen. | H-03, H-05, H-07 |
| PS-03 | **Drive / actuator families and compatibility boundaries** | Drives are sold only within a documented compatibility envelope, per drive family, per steering system and per surveyed vessel. The intended families are electromechanical steering drives with a mechanical release (wheel, tiller and linear drive types) and hydraulic configurations only after the manual-steering behaviour following loss of electrical power has been physically verified; the safety case records hydraulic, drive-by-wire and multi-station layouts as `NOT_YET_ASSESSABLE`, and the exact list is `OPEN` until engineering selects and tests it. A drive without a manual release, a drive whose duty cannot be verified, a steering system whose end stops cannot be protected, and any installation exceeding the documented drive envelope are `NOT_SUPPORTED`. No torque, current, speed, duty-cycle or force figure may be published before it is measured and documented. | `OPEN` — no drive selected, no rating recorded. The audited prototype references a legacy two-wire brushed-DC drive with no datasheet and a small bench motor, both explicitly not product evidence. | H-05, H-07, P-04 |
| PS-04 | **Physical helm control head** | A dedicated control head at the helm with: engage/standby, mode selection, course/angle adjustment, alarm acknowledgement, and a **physical E-stop** within reach. It displays the active mode, commanded heading or angle, source status, alarm class and the manual/standby state. It must remain usable with a wet, gloved hand and in daylight and night conditions (`OPEN` requirement, not a tested property). It contains no remote-command path and no mobile-app equivalent. | `OPEN` — no control-head article, enclosure, UI or ergonomics test exists. | H-05, H-07, X-03 (assets) |
| PS-05 | **Rudder / steering feedback** | A position or angle reference for the steering system that the control loop and end-stop protection can use, or — only where a surveyed installation cannot carry a feedback reference — an explicitly documented open-loop case with verified end-stop and stall protection. The final product requires the feedback requirement to be decided per installation survey and recorded in the quotation. The audited prototype has no rudder sensor, no encoder, no potentiometer and emits an empty rudder field; end-stop enforcement is documented but not implemented. | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND` (H-01); `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.2 F-A20. | H-01, H-05 |
| PS-06 | **Heading sensor** | A calibrated heading reference with documented accuracy envelope, deviation/compensation procedure and a heading-versus-COG plausibility check. The audited prototype uses an uncalibrated magnetometer heading with no deviation table and no compensation; the final product may not. | `OPEN` — requirement defined, implementation absent; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.4 F-08, F-A26. | H-01 |
| PS-07 | **Wind sensor (PILOT Sail only)** | A compatible, calibrated wind source for wind-angle steering. Wind-angle mode is delivered only where the source is qualified as a steering input, the mode is verified on a representative vessel, and loss of wind produces a defined demotion. The audited source contains NMEA 0183 wind parsing at unit level only; a parsed sentence is not a calibrated wind measurement and is not evidence of wind-angle steering. | `CONDITIONAL` — parser-level wind evidence only (capability `C-13`, unit evidence only); no installed wind steering test exists. | H-01, H-04 |
| PS-08 | **GNSS / route source** | GNSS position, course and speed for route/track following, with fix quality and freshness validated before use. Route/waypoint context may come from MAREA NAV only through a future authorised local integration; NAV is an input and never an authority, and NAV may not upload a route that commands the helm without an explicit human engagement at the control head. The audited prototype derives position validity from speed freshness only, not from fix quality or HDOP; the final product must not. | `OPEN` — requirement defined; route integration unverified; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.4 F-09. | H-01, P-10 |
| PS-09 | **Hardware watchdog** | An independent watchdog on the motor-control microcontroller that resets or cuts the drive if the control loop hangs, separate from the control computer's software watchdog. The audited prototype has no hardware watchdog anywhere; the software watchdog is a Node timer in the same event loop as the control loop. | `BLOCKED` — design required; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.4 F-03, F-A23. | H-10 |
| PS-10 | **Heartbeat / command timeout** | The control computer sends a demand, an enable flag and a periodic heartbeat; the motor-control electronics cut the drive when the heartbeat is missing. The audited protocol document specifies ≈10 Hz and a ≈500 ms default cut-off; the timeout is documented and unit-tested as arithmetic but **not measured on hardware**, and the fail-closed timing claim is therefore `OPEN`. | `PILOT_SAFETY_GATE = BLOCKED`; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.2 F-A02, §3.5 G6. | H-10 |
| PS-11 | **Overcurrent and thermal monitoring** | Motor-current monitoring from a calibrated current sensor, a per-profile overcurrent cut-out, and at least two independent overcurrent means (electronic cut-out plus a correctly rated fuse/breaker), plus thermal monitoring of the drive and electronics with a documented derating and cut-out behaviour. The audited prototype has one Hall sensor whose sensitivity must be entered from a datasheet, and a 12 A fuse described as a design assumption rather than a verified rating; no thermal design record exists. | `OPEN` — calibration and characterisation absent; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §2.1 HW-14, §3.2 F-A07. | H-05, H-10 |
| PS-12 | **Physical E-stop** | A physical control within reach of the helm that removes motor power independently of firmware and of the control computer's state, with an operator test procedure at every handover and at each maintenance interval. The intended architecture is a power contactor that physically breaks the drive supply plus a monitored auxiliary contact; the audited design documents the concept at GPIO level, the firmware only senses the contact and never drives the contactor, and no part, rating or test exists. | `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND` (H-10); `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.2 F-A05, F-A06. | H-10, H-05, H-07 |
| PS-13 | **Independent motor-power isolation** | An operator-actuated contactor or breaker that isolates the motor circuit from the vessel supply, independent of the electronics supply, rated for the actual DC breaking duty, and never driven by firmware. The audited prototype's relay abstraction only logs state; no GPIO or serial line is driven, and the documented "open the power relay" behaviour is not implemented. | `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND` (H-03, H-10); `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.3 D-01, F-A24. | H-03, H-10 |
| PS-14 | **Alarm classification** | Every condition maps to exactly one declared class, annunciated locally on the control head and recorded: `INFO` (operator information), `CAUTION` (degraded but usable), `ALARM` (mode disengages or is unavailable; manual helm required), `SAFETY_CUTOUT` (drive power removed; latched until explicit rearm). Source-invalid and stale states are distinct: a missing value is never displayed as a valid one, and a stale value is shown with its age. No alarm may replace manual control or imply a safety guarantee. | `OPEN` — the audited software has a partial fault taxonomy and limits; the classes and their mapping are a product requirement, not a tested behaviour. | H-01, H-10 |
| PS-15 | **Manual standby / override** | Manual authority always outranks the system: the control head has a dedicated standby, the drive has a mechanical release (for example a belt clutch or helm release appropriate to the surveyed drive), and disengaging returns the helm to the person. The final product must either detect manual takeover or provide an explicit, trained manual-release procedure; the audited prototype does not detect takeover — its "clutch" feedback is a copy of the enable flag and no helm/clutch sensor exists. | `OPEN` — manual release is a drive-family requirement; takeover detection absent; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.4 F-04, F-A21. | H-01, H-05 |
| PS-16 | **Loss-of-power behaviour** | Any loss of electronics power, drive power or control-head communication results in a de-energised drive and a helm that can be steered manually. The system must not resume a mode automatically after power returns: it starts in standby and requires an explicit re-engage, and a latched fault requires an explicit rearm. The audited design intent is boot-safe (PWM 0, direction 0, motor disabled, standby) but is not physically evidenced. | `OPEN` — design intent only; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.2 F-A01, §3.5 G6. | H-10, H-05 |
| PS-17 | **Loss-of-command-link behaviour** | If the command link between the control computer and the motor-control electronics is lost, corrupted or stalled, the motor-control electronics must stop the drive within the documented timeout, latch a fault, and remain stopped until an explicit rearm. There is no automatic retry and no jump to a previous command. The documented prototype behaviour matches the intent; timing and latch behaviour are unmeasured. | `OPEN` — documented, not measured; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.2 F-A02, F-A11. | H-03, H-10 |
| PS-18 | **Secure local access and service boundary** | The control plane must be authenticated and authorised, bound to the local installation only, audited, and separated from the vessel's general network trust model. The owner controls every access; service access requires the owner's explicit action and presence; no support or diagnostic operation may steer the vessel. Firmware updates are signed and roll-back capable and are performed with the drive disengaged. The audited prototype's control API has no authentication, no TLS, wildcard CORS and binds all interfaces; CRA obligations are not started. | `BLOCKED` — security architecture not built; `VERIFIED_REPO` `HARDWARE-COMPLIANCE-MATRIX.md` §3.4 F-01, `OPEN-MARINE-CAPABILITY-INVENTORY.md` §7 G2, G9; CRA gap H-13. | H-02, H-13 |

### 4.3 What the system does not contain

The finished product does **not** contain, by design and not as a road-map gap: autonomous or unattended
steering; a remote, cloud or mobile-app helm-control path; collision avoidance; AIS-based steering or AIS
target integration as a control input; automatic route upload that commands the helm without local human
engagement; a self-installation option; an automatic man-overboard or distress function; chart, weather or
AIS features (those are other MAREA products); or any certification, type approval or class-society status.
Any future capability would require its own verification, its own disclaimer and an amendment to this dossier
and to the safety case.

## 5. Steering modes and their evidence conditions

### 5.1 The three modes of the finished product

MAREA PILOT offers exactly three named steering modes at MC-06. No additional mode, no "auto" mode and no
unattended mode is defined. Heading hold is the final intent of the product; wind angle is allowed only after
its own verification; route/track following is allowed only after its own verification. A mode is delivered to
a vessel only when its prerequisites are satisfied for that installation and the evidence is on file; until
then the mode is described as `CONDITIONAL` or `NOT_VERIFIED`, never as working.

| Mode | Final intent | Prerequisites (vessel, sensors and evidence) | Current evidence state | Condition that closes it | What may never be claimed |
| --- | --- | --- | --- | --- | --- |
| **Heading hold** | The core of every PILOT edition: hold a commanded heading on a surveyed vessel under human supervision. | Surveyed steering system and drive within a documented family; calibrated heading reference with deviation check; rudder feedback (or a validated open-loop case with end-stop and stall protection); E-stop and motor-power isolation installed and tested; bench, dockside and supervised sea-trial evidence for this configuration; trained owner; safety case closed. | `NOT_VERIFIED`; `PILOT_SAFETY_GATE = BLOCKED`; no bench log, no sea trial, no independent review. | H-01, P-04 closure: bench → HIL → supervised sea trials per mode → independent review → conformity. | No performance, accuracy, reliability or unattended-confidence claim; no "set and forget"; no claim that the system keeps a course better than a person or another product. |
| **Wind angle** (PILOT Sail only) | Hold a commanded apparent or true wind angle for sailing, supervised, within a verified wind envelope. | Everything required for heading hold, **plus**: compatible and calibrated wind source qualified as a steering input; wind-angle controller verified with accidental-tack and gybe recovery, gust response and loss-of-wind demotion; representative-vessel sea trials upwind, beam, reach and run; reefed and unreefed configurations; owner training specific to the mode. | `CONDITIONAL` — parser-level wind evidence only, no installed wind-angle verification, no sea trial. | Wind-angle mode verification and sea trials per `HARDWARE-COMPLIANCE-MATRIX.md` §3.6, plus independent review; then the condition is removed from the edition verdict. | No claim of automatic tacking/gybing, no claim of sailing performance, no claim that a wind sensor is a steering-grade instrument before it is qualified. |
| **Route / track following** | Follow a planned route or a cross-track target under supervision, with heading/track authority local. | Everything required for heading hold, **plus**: GNSS position quality validated (fix quality and freshness, not speed alone); route context from an authorised local source (MAREA NAV may supply waypoint information only through a verified, approved integration; it never commands the helm); track controller verified for cross-track capture under current and leeway; GNSS-loss demotion; waypoint advance verified; no-go/close-hazard handling specified; night and low-visibility supervision procedure; owner training. | `CONDITIONAL` — no route integration is approved, no GNSS-quality validation exists, no sea trial. Attributed to no edition until verified (`TARGET_ONLY` in `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` P04). | Route/track verification and sea trials per `HARDWARE-COMPLIANCE-MATRIX.md` §3.6, plus the approved NAV local integration (README §19) and independent review. | No collision-avoidance claim, no "automatic navigation" claim, no claim that a route is safe or watched, no claim that NAV or HUB can steer. |

### 5.2 Mode governance rules (binding product rules)

1. **Engagement is local and deliberate.** A mode is engaged only by a person at the physical control head
   after an explicit action. There is no remote engage, no scheduled engage and no automatic engage.
2. **Supervision is continuous.** Every mode is supervised. A qualified person must be at the helm, keeping
   watch, with the ability to take manual control immediately; this is a product boundary, not a
   recommendation.
3. **Manual authority outranks every mode.** Manual standby, the mechanical release and the physical E-stop
   are always available and never depend on the active mode or on the control computer.
4. **Mode loss is announced and demotes safely.** Loss of an input demotes or disengages the mode with a
   classified alarm; loss of heading, position quality, feedback or command link within the engaged mode leads
   to demotion and, where necessary, a `SAFETY_CUTOUT`, with the drive de-energised. The demotion target for
   each mode must be defined in the safety case and verified by test; the audited software's partial rules
   (heading loss hard-fault, wind loss demote in wind mode, GNSS loss demote in track mode) are not evidence.
5. **Mode changes while engaged need a defined handover.** The final product must define and verify the
   handover when moving between modes while engaged; the audited state machine re-targets immediately without
   a hold/centre/ramp handshake and that behaviour is not acceptable as a product behaviour until resolved and
   verified.
6. **No mode is sold as equivalent to another.** Wind angle is not sold until verified; route/track following
   is not sold until verified; neither may be presented in copy as if it were part of heading hold.
7. **Mode claims expire with evidence.** If a mode's evidence is limited to specific conditions, the limit is
   published and repeated at handover; a mode is never described more broadly than the evidence permits.

### 5.3 What the customer is told before purchase

The quotation and the copy must state, in the page language: which modes are delivered with this
installation and which are not; that all modes are supervised and require continuous watchkeeping and
immediate manual control; that heading, wind and position sources are per-installation and per-device; that
route/track following depends on GNSS quality and on an approved local route integration; that no mode is
collision avoidance, navigation authority or unattended operation; and that the manual-takeover and E-stop
drills are part of the handover.

---

## 6. Vessel eligibility and the mandatory installation survey

### 6.1 Eligibility envelope (intended)

PILOT is intended for recreational sailing and motor vessels where all of the following can be established by
survey: an existing mechanical steering system with a known type and a mechanical manual release; a drive
location and mounting that can accept the selected drive family; a feasible steering/rudder feedback
reference (or a validated open-loop case); a compass mounting position with acceptable magnetic disturbance;
a helm station with room for the control head and a physical E-stop within reach; a dedicated, fused DC motor
circuit with a correctly rated isolation device; sufficient electrical capacity for the drive duty; and an
owner who accepts supervised operation and the training and maintenance obligations. This envelope is
`ASSUMPTION` plus `OPEN` engineering requirement: no vessel has been surveyed and no eligibility has been
evidenced.

### 6.2 Explicitly outside the eligibility envelope

Commercial or passenger-carrying vessels subject to class, flag-state or charter equipment certification;
vessels whose steering system has no mechanical manual release; vessels where the drive cannot be mounted or
the feedback cannot be referenced and no open-loop case can be validated; installations that would exceed the
documented drive duty; vessels with no place for a reachable physical E-stop; vessels whose electrical system
cannot supply the drive safely; and any owner seeking unattended or remote helm control. These are
`NOT_SUPPORTED` by design, not sales objections to be overcome. A configuration outside the Coastal envelope
may be quoted as an `INSTALLATION_PACKAGE` (PILOT Pro) only after specialist assessment; it is never asserted
as compatible before that assessment.

### 6.3 The mandatory installation survey

Every quotation is preceded by a survey performed by an authorised installer. The survey is the authority that
turns a product definition into a vessel-specific quotation, and its output is a written record that stays
with the boat. The intended survey register:

| # | Survey item | Why it is required | Recorded verdict |
| --- | --- | --- | --- |
| SV-01 | Vessel identity, type, length, displacement class, intended cruising area | Defines the operating context and the drive duty question | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` |
| SV-02 | Steering system type, travel, mechanical end stops and manual release | Determines drive family, feedback feasibility and end-stop protection | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` |
| SV-03 | Drive mounting, linkage and available force path | Determines whether the selected drive can be installed within its documented envelope | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` |
| SV-04 | Steering/rudder feedback feasibility | Determines closed-loop operation or the open-loop case | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` / `REQUIRES_SPECIALIST_ASSESSMENT` |
| SV-05 | Heading-sensor location and magnetic environment | Determines whether heading can be calibrated to the documented standard | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` |
| SV-06 | Wind-sensor presence, model, calibration and output (PILOT Sail) | Determines whether wind-angle mode can be quoted at all | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` / `UNKNOWN_NOT_ASSESSED` |
| SV-07 | GNSS source and position quality | Determines whether route/track mode can be quoted | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` / `UNKNOWN_NOT_ASSESSED` |
| SV-08 | Dedicated motor circuit, fusing, isolation, grounding and E-stop location | Determines the electrical safety design and the isolation device rating | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` |
| SV-09 | Helm station ergonomics and control-head position | Determines whether the control head and E-stop are usable and reachable | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` |
| SV-10 | Existing autopilot/drive removal and manual-steering restoration | Determines the removal scope and the manual fallback | `ELIGIBLE` / `CONDITIONAL` / `NOT_ELIGIBLE` |
| SV-11 | Owner training needs, mobility and supervision plan | Determines the training scope and the manual-takeover drill | `ELIGIBLE` / `CONDITIONAL` |
| SV-12 | Installation record, quotation scope and exclusions | Produces the quotable scope and the written exclusions | Quotation document |

The survey verdict vocabulary is a product definition and an `ASSUMPTION`; the compatibility deliverable D5
owns the cross-product status vocabulary. No survey tooling, form or installer competence scheme exists today
(`OPEN`, X-05, X-06), and no survey has been performed.

### 6.4 Survey output and the quotation

The survey produces four artefacts: the survey record; the eligibility verdict per item; the written quotation
that names every included and excluded item, the drive unit, the delivered modes, the labour, the
commissioning, the sea trials and the training; and the planned installation record template. The quotation is
the only authoritative inclusion document; catalogue descriptions, bundle entries and price hypotheses never
override it.

---

## 7. Commissioning, dockside validation, supervised sea trial and operator training

This sequence is the **intended process**. None of it has been executed for any vessel; every stage is
`NOT_EXECUTED` or `BLOCKED`, and no stage may be described as completed, routine or proven.

| Stage | What happens | Output record | Evidence state |
| --- | --- | --- | --- |
| C-01 | Pre-sale questionnaire and installation survey | Survey record and eligibility verdict (§6) | `OPEN` — no form, no installer |
| C-02 | Written quotation with included/excluded items and delivered modes | Signed quotation | `OPEN` — quotation model not approved |
| C-03 | Materials ordered to the surveyed scope | Purchase record | `BLOCKED` — no BOM, no supply chain (H-05, H-07) |
| C-04 | Installation: drive, feedback, heading sensor, harness, isolation, control head, E-stop | Installation record with photographs and part references | `OPEN` — no procedure or installer network |
| C-05 | Electrical checks: fusing, isolation, grounding, polarity, supply integrity | Signed electrical check sheet | `NOT_EXECUTED` |
| C-06 | Dockside static validation with the vessel secured and the drive disengaged from load where the design permits: direction, limits, E-stop, isolation, alarm annunciation, control-head behaviour | Dockside validation record | `NOT_EXECUTED` |
| C-07 | Current-sensor and drive calibration within the documented procedure | Calibration record | `NOT_EXECUTED` — no calibrated sensor hardware (H-05) |
| C-08 | Compass calibration and deviation check; heading-versus-COG plausibility | Compass calibration record | `NOT_EXECUTED` — calibration procedure absent (H-01) |
| C-09 | Commissioning profile: limited duty, supervised, parameters recorded | Commissioning record | `NOT_EXECUTED` |
| C-10 | Supervised sea trial, heading hold: calm, choppy and heavier conditions; heading-sensor loss at speed; drive saturation and overcurrent; manual takeover; long-duration drift | Signed sea-trial record with conditions and observer | `PILOT_SEA_TRIALS = NOT_PERFORMED` |
| C-11 | Supervised sea trial, wind angle (Sail only): upwind, beam, reach and run; accidental tack/gybe recovery; wind loss and demotion; gust response; reefed/unreefed | Signed mode-specific sea-trial record | `PILOT_SEA_TRIALS = NOT_PERFORMED`; mode `CONDITIONAL` |
| C-12 | Supervised sea trial, route/track (only where route mode is delivered): cross-track capture with current and leeway; waypoint advance with real GNSS; GNSS loss and demotion; no-go/close-hazard behaviour; night and low-visibility supervision | Signed mode-specific sea-trial record | `PILOT_SEA_TRIALS = NOT_PERFORMED`; mode `CONDITIONAL` |
| C-13 | Failure injection: heartbeat loss, control-computer reboot, main-power loss, drive isolation, E-stop at cruise speed, jammed rudder/end stop, serial-link loss | Failure-injection record | `NOT_EXECUTED` |
| C-14 | Operator training: modes, alarms, manual takeover, E-stop, isolation, owner checks, maintenance plan, what the system does not do | Training attendance record | `OPEN` — no training material |
| C-15 | Handover: installation record, configuration record, alarm card, maintenance schedule, support route, signed acceptance | Signed handover pack | `OPEN` |

**Rule for the record:** unit tests, simulation, source-code review, bench-tooling source code and
documents do not constitute any stage of this sequence. The MC-02 audit found no bench log, no measurement
and no sea trial in any repository, and the safety gate remains `BLOCKED` (H-01, P-04).

---

## 8. Maintenance, diagnostics, firmware update and secure local access

### 8.1 Maintenance model (intended)

Maintenance is installer-led with defined owner checks. The intended schedule: at handover, the installer
demonstrates every check the owner may perform; at each season start, the installer performs the documented
inspection (drive mounting and linkage, feedback reference, wiring and connectors, isolation device, E-stop
test under controlled conditions, alarm test, compass deviation check, firmware version record); after any
work on the steering system, grounding, lightning strike, electrical modification or drive replacement, a
re-survey and re-validation are mandatory before the system is used again; and the owner performs the
documented pre-passage checks and the manual-takeover drill at a defined interval. The maintenance plan is a
paid service (`OPEN`, no price, no terms). No maintenance interval may be stated as a guarantee of reliability,
and no maintenance record may be fabricated.

### 8.2 Diagnostics (intended)

The local diagnostic view records: per-source status and last-message time (heading, feedback, GNSS, wind);
the active mode and commanded target; the last commands and the heartbeat history; the alarm log with class,
timestamp and acknowledgement; the drive current and thermal state where measured; the firmware and
configuration versions; and the installation identity. The owner and installer can export a diagnostic bundle
locally for support. Diagnostics are read-only with respect to steering: a diagnostic session may never move
the helm, and support may never steer the vessel. No diagnostic interface exists today (`OPEN`).

### 8.3 Firmware and software update (intended)

Updates are signed, verified, recorded and roll-back capable, and are applied only with the drive disengaged
and the vessel in a safe state. The update policy — supported versions, support window, security-fix process,
rollback behaviour, what happens to old configurations — is published with the product and confirmed before
sale. A failed update must leave the system in a recoverable, non-steering state. Cyber Resilience Act
obligations are not started: no vulnerability handling, coordinated disclosure, SBOM or incident reporting
exists (H-13), and the update process is `BLOCKED` until it does.

### 8.4 Secure local access model (intended)

The control plane is local, authenticated and audited. Binding is restricted to the installation; credentials
are per unit; every access is logged; owner authorisation is required for service access; and no remote path
exists for steering. Firmware and configuration actions require physical presence at the unit or an explicit
owner-authorised local session. The audited prototype violates every element of this model — the command API
has no authentication, no TLS, wildcard CORS and binds all interfaces, and any host on the vessel network can
engage, jog or tune the drive today (`VERIFIED_REPO` `OPEN-MARINE-CAPABILITY-INVENTORY.md` §7 G2, G9;
`HARDWARE-COMPLIANCE-MATRIX.md` §3.4 F-01). This is a defect to be closed before any field use, not a
documentation gap.

---

## 9. Editions — PILOT Coastal, PILOT Sail and PILOT Pro

### 9.1 Edition verdicts (README §14 vocabulary, decisions D-008/D-009)

| Edition | Canonical id | Verdict | What the verdict means | Sale state |
| --- | --- | --- | --- | --- |
| MAREA PILOT Coastal | `PILOT-COASTAL` | `DEFINED` | The standard surveyed installation for a supported steering and drive family, built around heading hold as its final intent. Customer-facing configuration fully specified and commercially coherent; still not sellable. | `NOT_FOR_SALE` |
| MAREA PILOT Sail | `PILOT-SAIL` | `CONDITIONAL` | The Coastal configuration extended with wind-angle steering. The differentiation depends on unverified capability (wind-angle mode and a qualified wind source), and the edition must state the condition that closes it. No price may be stated. | `NOT_FOR_SALE` |
| MAREA PILOT Pro | `PILOT-PRO` | `INSTALLATION_PACKAGE` | Vessel-specific quoted work that cannot be a fixed retail SKU. The scope is produced by a specialist assessment and a quotation, never by a catalogue configuration. No price may be stated. | `NOT_FOR_SALE` |

No fourth edition, no size tier, no generation label and no certification suffix may be attached to any of
the three. Every edition carries `publicationConditional = true` and none is `RELEASED`, `FOR_SALE`,
`APPROVED` or `PUBLISHABLE` (README §14).

### 9.2 The edition value boundary

| Difference | MAREA PILOT Coastal | MAREA PILOT Sail | MAREA PILOT Pro |
| --- | --- | --- | --- |
| Intended customer | Owner of a supported vessel within the standard surveyed envelope who wants supervised heading hold on passage | Sailing owner who wants supervised wind-angle steering in addition to heading hold | Owner or yard with a vessel outside the standard envelope, or with integration needs that no standard configuration covers |
| Steering/drive envelope | Supported steering and drive family selected by survey (`OPEN` list) | Same as Coastal, on a sailing vessel with a compatible qualified wind source | Vessel-specific; assessment may extend to other drive families, feedback arrangements and stations only where the safety case supports it (`OPEN` scope) |
| Modes delivered | Heading hold | Heading hold + wind angle, where wind-angle verification exists and the vessel's wind source is qualified | Determined per assessment; no mode is promised before verification for that configuration |
| Required sensors | Calibrated heading + steering feedback (or validated open loop) | Adds compatible calibrated wind source | As determined by assessment; no sensor is assumed |
| Control head | One helm station control head with physical E-stop | Same, plus wind-mode controls and displays | As determined by assessment; additional station only if the safety case supports it (`OPEN`) |
| Route context | Optional read-only context from NAV | Optional read-only context from NAV | Optional, subject to the approved local integration |
| Survey depth | Standard survey (§6) | Standard survey plus wind-source qualification | Specialist assessment with engineering involvement |
| Commissioning and sea trials | Standard commissioning and heading-hold sea trial | Adds wind-angle sea trials per §7 C-11 | Defined by the assessment |
| Training | Standard supervised-use training | Adds wind-mode training | Defined by the assessment |
| Price | `from EUR 1,290` starting-price hypothesis only; quotation mandatory | No price; quotation mandatory | No price; vessel-specific quotation only |
| Verdict | `DEFINED` | `CONDITIONAL` | `INSTALLATION_PACKAGE` |

### 9.3 Included items by edition

The table states the intended inclusion logic. The quotation remains the authoritative inclusion document and
must name every item (D-009). No item below may be assumed from a catalogue.

| Item | Coastal | Sail | Pro |
| --- | --- | --- | --- |
| Physical helm control head with E-stop | Included | Included | Included (configuration per assessment) |
| Control computer | Included | Included | Included |
| Independent motor-control electronics | Included | Included | Included |
| Drive/actuator matched by survey | Installation scope — survey-selected, named in the quotation | Installation scope — survey-selected, named in the quotation | Installation scope, per assessment |
| Steering/rudder feedback components | Installation scope, where required by the survey | Installation scope, where required by the survey | Installation scope, per assessment |
| Calibrated heading sensor | Installation scope — survey-selected, named in the quotation | Installation scope — survey-selected, named in the quotation | Installation scope, per assessment |
| Wind source and wind-angle hardware | Not included | Included conditionally — only where the supplied source is compatible and qualified; otherwise installation scope and quoted separately | Installation scope, per assessment |
| Harness, fusing, contactor/isolation and mounting | Installation scope — surveyed scope | Installation scope — surveyed scope | Installation scope, per assessment |
| Physical E-stop and independent motor-power isolation | Included | Included | Included |
| Installation labour | Included in the quotation | Included in the quotation | Included in the quotation |
| Commissioning, dockside validation, supervised sea trial | Included | Included, including wind-mode trials | Per assessment |
| Operator training and handover pack | Included | Included, including wind-mode training | Per assessment |
| On-device software licence for the support window | Included | Included | Included |
| Documentation in ES and EN | Included | Included | Included |
| Support entitlement | Included as published | Included as published | Included as published |
| Maintenance plan | Quoted separately (`OPEN`) | Quoted separately (`OPEN`) | Quoted separately (`OPEN`) |

### 9.4 Items excluded from every edition (stated before purchase)

No edition includes, and no quotation may imply: vessel structural, joinery, rudder or steering-system
replacement work; batteries, chargers, shore power or vessel-wide electrical upgrades beyond the surveyed
motor circuit; navigation software, charts, weather or AIS products; remote monitoring, connectivity or SIM
services; spare drives, spare control heads or consumables; installation outside the served territory; a
second helm station unless expressly quoted; any mode, integration or sensor whose verification evidence is
not delivered with the installation; and any certification, type approval or class-society status. A
configuration that needs any excluded item is either re-quoted or declined.

### 9.5 What each edition is not

- **Coastal is not a basic or degraded autopilot.** It is the full supervised heading-hold product for the
  standard envelope; it is not sold with a hidden upgrade gate on safety-relevant functions.
- **Sail is not Coastal plus a software unlock.** It is a conditional edition whose delivery depends on
  verified wind-angle capability and a qualified wind source on that vessel; the wind controller and its
  verification are the value, not a toggle.
- **Pro is not "the powerful one" and not a retail SKU.** It is a quotation-only installation package for
  work that the standard envelope cannot cover; it carries no fixed price and no catalogue configuration.
  Presenting Pro as a fixed-price edition is a contractual and safety error.

### 9.6 Edition decisions still open

The final drive-family envelope, the exact Pro scope, whether a second control-head station is ever supported,
whether Coastal can be upgraded to Sail by commissioning and verification or requires additional hardware,
whether route/track following is attributed to any edition at all (`TARGET_ONLY` today, dependent on the NAV
integration and on mode verification), the support term per edition, and the maintenance-plan content are
`OPEN` product-engineering and commercial requirements to be frozen with the editions deliverable D4, the
compatibility deliverable D5 and the safety case. None of them may be invented in copy or in a quotation.

---

## 10. Pricing — starting-price hypothesis and the quotation model

### 10.1 The commercial model is quotation-based

MAREA PILOT is sold only through a written, vessel-specific quotation produced after the installation survey.
There is no shelf price, no cart, no online purchase, no "add to boat" flow and no self-service configuration.
The quotation names every included and excluded item, the drive unit, the delivered modes, the labour, the
commissioning, the sea trials, the training, the support entitlement and the payment terms. This model is
required by decision D-009 and by README §17, and it is not a temporary sales preference: a steering
installation whose scope depends on the vessel cannot honestly be modelled as a fixed retail price.

### 10.2 The only permitted price statement

| Product / unit | Statement | Status | Binding qualification |
| --- | --- | --- | --- |
| MAREA PILOT Coastal | from EUR 1,290 | `HYPOTHESIS_UNAPPROVED` | **Starting-price hypothesis for the minimum usable Coastal configuration only.** Not an all-inclusive quotation, not a turnkey price, not an offer, not a launch or promotional price, not a discount, not a shelf price. A vessel-specific quotation is mandatory and must name every included and excluded item (README §17; D-009) |
| MAREA PILOT Sail | No price | `OPEN` | No price may be stated; requires costed evidence and the wind-angle condition to close |
| MAREA PILOT Pro | No price | `OPEN` | Vessel-specific quotation only; it is not a retail SKU |
| Drive/actuator, labour, commissioning, training, second station, maintenance plan, extended warranty | No price | `OPEN` | No amount may be stated; each requires costed evidence |
| Partner, distributor, installer or volume price | No price | `OPEN` | Channel terms do not exist |

### 10.3 Prohibited price presentations

Regardless of internal status, no PILOT material may present `from EUR 1,290` as: an all-inclusive or turnkey
price; a price that includes installation, drive, sensors or sea trials unless the quotation says so; a
purchasable amount; a launch, limited-time or discounted offer; a bundle component that can be summed or
subtracted; a comparison anchor against a competitor; or a figure in customer copy. Bundle figures in the
portfolio (`MAREA SAIL`, `MAREA COMPLETE`) are bundle hypotheses governed by MC-08, are not decided here and
must never be used to imply a turnkey PILOT installation (README §8, §17).

### 10.4 Cost categories — named inputs only, no amounts

| Cost category | What it covers | Evidence state |
| --- | --- | --- |
| Bill of materials | Control head, enclosure, control computer, motor-control electronics, drive, feedback, sensors, harness, isolation and mounting items | `BLOCKED` — no BOM (H-05, H-07) |
| Drive supply and lifecycle | Drive unit availability, provenance, rating and spare-part risk, especially for legacy drive families | `BLOCKED` — no supplier quote (H-07) |
| Conformity programme | EMC assessment of the switched motor drive, LVD/EMC/GPSR/RoHS/WEEE applicability, notified-body work where required, technical file and declaration of conformity | `BLOCKED` — not started (H-06) |
| Security and update lifecycle | Vulnerability handling, signed update with rollback, SBOM, incident reporting under the CRA | `BLOCKED` — not started (H-13) |
| Bench, HIL and sea-trial programme | Test articles, instrumentation, observer time, vessel time, failure-injection trials | `BLOCKED` — none exists (H-01, P-04) |
| Independent verification | Competent marine engineer/naval architect review and, where required, notified body | `BLOCKED` — no third party involved (H-01) |
| Installation labour | Survey, mechanical and electrical installation, commissioning, dockside validation, sea trial, training | `OPEN` — no measured installation (X-05) |
| Warranty and liability | Warranty accrual, insurance and product-liability provision for a steering system | `OPEN` — no terms, no insurance quote |
| Service and spares | First-line installer support, EMBARCARTE escalation, spares holding, field actions | `OPEN` — no service contract |
| Channel and fulfilment | Installer margin, freight, packaging, payment fees, documentation and localisation | `OPEN` — no channel terms (X-05) |

Contribution per installation is deliberately not computed: any margin, payback or break-even figure would
invent BOM, labour, conformity, insurance and channel data. Scenario arithmetic with named symbolic inputs
belongs to the pricing deliverable D6, not to this dossier.

---

## 11. Channel and installer economics framework

### 11.1 Intended channel model

Direct commercial ownership by EMBARCARTE, delivered through authorised professional installers and refit
yards, starting in Galicia and northern Portugal. The customer relationship enters through a survey request
that ends in a quotation, not in a self-service order. The installer is not a reseller of a box: the installer
is the party that surveys, installs, commissions, trials, trains and supports the installation, and therefore
carries a defined part of the safety responsibility.

### 11.2 Responsibility split

| Responsibility | EMBARCARTE | Authorised installer |
| --- | --- | --- |
| Product definition, compatibility envelope and safety-case authority | Owns | Receives and applies |
| Vessel survey and eligibility verdict | Defines the survey standard | Performs and is accountable for accuracy |
| Quotation scope and exclusions | Defines the quotation standard | Prepares the vessel-specific quotation |
| Physical installation, wiring, mounting, isolation | Approves the design | Performs and is accountable for workmanship |
| Commissioning, dockside validation, sea trials | Defines the process and signs off the evidence | Performs and records |
| Operator training and handover | Defines content | Delivers |
| First-line support and fault triage | Defines escalation | Owns first line |
| Warranty policy and field actions | Owns | Executes locally |
| Firmware and security updates | Owns | Applies under procedure |
| Product liability and insurance position | Owns the product side | Owns the installation side (`OPEN` — not written) |

### 11.3 Installer requirements that must exist before any installer is announced

An installer agreement set; a documented competence scheme (there is no technician certification scheme
today, so no "certified technician" claim may be made); insurance requirements; a safety-responsibility
matrix; a training and re-approval path; a defined service-level expectation with no invented response time;
and a field-action procedure. None exists (`OPEN`, X-05, X-06). No installer is announced, appointed or
described as authorised today, and the benchmark listing of an established installer is not a partnership.

### 11.4 Channel economics — framework only

The channel economics framework has named inputs only: installer margin or fixed installation fee; survey
time; installation hours; commissioning and sea-trial time; training time; travel; warranty labour
allocation; first-line support cost; spares and returns; payment and invoicing terms; and the allocation of
product-liability and installation-liability risk. No percentage, commission, discount or price exists, and no
margin may be computed and presented as fact. The channel offer is acceptable only if contribution clears an
agreed target and the support and liability obligations are funded (`VERIFIED_REPO
docs/marea/COMMERCIAL-PORTFOLIO.md` price-and-channel decision rule).

---

## 12. Warranty, service and support

| Topic | Intended position | Evidence state |
| --- | --- | --- |
| Statutory guarantee | Spanish and EU consumer guarantee applies once a sale exists | `OPEN` — no sale, no terms |
| Contractual warranty duration and conditions | To be written before sale; no duration may be stated now | `OPEN` — blocked by seller legal identity (X-02) and commercial terms (X-05) |
| Support scope | Product questions, alarm and diagnostic interpretation, update assistance, fault-return process; installer first line, EMBARCARTE escalation | `OPEN` — no support contract, no staffing |
| Safety-related faults | Stop-use condition; system not used until inspected; incident recorded and field action evaluated | `OPEN` — no field-action process |
| Remote support | Diagnostic bundle exported locally by the owner; **no remote steering, no remote control of the helm** | Design boundary; not built |
| Response time, 24/7, spare-unit policy | Not promised; no service level may be stated before a real contract and staffing exist | `OPEN` |
| Spares and repair | Drive and control-head spares position required before sale; no price | `OPEN` — no spares policy (H-07) |
| Maintenance plan | Installer-led plan with owner checks; quoted separately; terms `OPEN` | `OPEN` |
| Ownership transfer | Registered owner updated; installation record stays with the vessel; warranty not extended or reset; re-survey required if the system moves to another vessel | `OPEN` — no identity or transfer system |
| CRA and security | Vulnerability handling, secure update, incident reporting required before market placement | `BLOCKED` (H-13) |
| Documentation | Installation, configuration, alarm and maintenance records in Spanish and English, provided at handover | `OPEN` — not written |

No warranty length, response time, service level, spare availability, repair price or support commitment may
appear in any quotation or customer material until the corresponding written term exists. The statutory
guarantee is not a substitute for the safety evidence and does not make the product fit for unsupervised use.

---

## 13. Acceptance scenarios PILOT-AC-01 to PILOT-AC-18

All scenarios are `NOT_EXECUTED`. None is claimed to pass. A scenario may be described as behaviour only after
a recorded test result exists with vessel, configuration, load and sea state, software and firmware versions,
instrumented timing and a signed record by a competent observer. The classifications use the MC-06 vocabulary;
`CURRENTLY_VERIFIED` is intentionally unused because nothing has been executed.

| ID | Scenario (given / when / then) | Classification | Evidence required |
| --- | --- | --- | --- |
| PILOT-AC-01 | Given a surveyed vessel with heading hold commissioned, when the owner engages heading hold in calm conditions under supervision, then the vessel holds the commanded heading within the documented band, alarms are clear, and the owner can disengage at the control head | `NOT_EXECUTED` | Signed sea-trial record with conditions, heading trace, disengagement demonstration |
| PILOT-AC-02 | Given heading hold engaged, when conditions build to the documented limit, then the system stays within its limits or demotes with a declared alarm, and manual control remains available | `NOT_EXECUTED` | Sea-trial record in heavier conditions; yaw-band and saturation measurement |
| PILOT-AC-03 | Given heading hold engaged at speed, when the heading source is lost, then the mode disengages or a `SAFETY_CUTOUT` occurs with a declared alarm, and no fabricated heading is shown | `NOT_EXECUTED` | Fault-injection record with trace and alarm log |
| PILOT-AC-04 | Given heading hold engaged, when the command heartbeat/link is interrupted, then the drive stops within the documented timeout and remains stopped until an explicit rearm | `NOT_EXECUTED` | Instrumented timing measurement of the cut-off |
| PILOT-AC-05 | Given an engaged mode, when the control computer reboots or loses power, then the drive is de-energised and the system returns to standby with no automatic re-engagement | `NOT_EXECUTED` | Power/reboot test record |
| PILOT-AC-06 | Given an engaged mode, when vessel power is lost, then the drive is de-energised, the helm can be steered manually, and on power return the system is in standby | `NOT_EXECUTED` | Power-loss test record with manual-steering demonstration |
| PILOT-AC-07 | Given the vessel at cruise speed with a mode engaged, when the physical E-stop is pressed, then motor power is removed independently of firmware, the helm returns to manual and the state latches | `NOT_EXECUTED` | E-stop-under-load test record; physical evidence is `NOT_FOUND` today |
| PILOT-AC-08 | Given the installation energised, when the independent motor-power isolation device is operated, then the motor circuit is dead while electronics remain available to display the state | `NOT_EXECUTED` | Isolation test record; `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND` |
| PILOT-AC-09 | Given an engaged mode under load, when the person takes manual control or selects standby, then the helm returns to the person, the mode ends and the takeover is recorded or the trained release procedure is followed | `NOT_EXECUTED` | Manual-takeover-under-load test record; takeover detection is absent today |
| PILOT-AC-10 | Given an engaged mode, when the drive jams, reaches an end stop or draws overcurrent, then the drive cuts out, an alarm is raised and the failure is recorded without damage | `NOT_EXECUTED` | Jam/end-stop/overcurrent test record; end-stop protection not implemented today |
| PILOT-AC-11 | Given a Sail installation with a qualified wind source, when wind-angle mode is engaged upwind, on a reach and downwind, then the vessel follows the commanded angle within the documented envelope and recovers from an accidental tack or gybe under supervision | `NOT_EXECUTED` | Mode-specific sea trials per `HARDWARE-COMPLIANCE-MATRIX.md` §3.6; mode is `CONDITIONAL` |
| PILOT-AC-12 | Given wind-angle mode engaged, when the wind source is lost, then the mode demotes with a declared alarm and never invents a wind value | `NOT_EXECUTED` | Fault-injection record |
| PILOT-AC-13 | Given a route delivered by an approved local integration, when route/track mode is engaged, then cross-track capture and waypoint advance behave within the documented envelope under current and leeway | `NOT_EXECUTED` | Real-GNSS sea-trial record; mode is `CONDITIONAL` |
| PILOT-AC-14 | Given route/track mode engaged, when GNSS quality fails or position validity is lost, then the mode demotes or cuts out with a declared alarm | `NOT_EXECUTED` | Fault-injection record; GNSS validity logic is inadequate today |
| PILOT-AC-15 | Given the installed system on the vessel network, when an unauthorised host attempts engage, jog, tuning or E-stop commands, then no steering command is accepted, the attempt is logged and the physical helm state is unaffected | `NOT_EXECUTED` | Security test record; the audited prototype fails this scenario today |
| PILOT-AC-16 | Given a working installation, when a firmware update fails or is interrupted, then the system returns to the last working version, the configuration is preserved and no mode is engaged | `NOT_EXECUTED` | Interrupted-update and rollback test record; update process absent |
| PILOT-AC-17 | Given an installation being moved to another vessel or a vessel being sold, when the transfer procedure is executed, then the registered owner is updated, the installation record stays with the vessel, and a new survey is required before use on another vessel | `NOT_EXECUTED` | End-to-end transfer record; identity and transfer system absent |
| PILOT-AC-18 | Given a complete customer journey, when a survey, quotation, installation, commissioning, supervised sea trial, training, handover, support case and maintenance visit are executed, then every document is complete, signed and consistent, and the owner can state what the system does and does not do | `NOT_EXECUTED` | Full journey record with all artefacts; no journey has been executed |

---

## 14. Cross-sells and the ecosystem path

| Product | What it adds alongside PILOT | Boundary that may never be crossed | Status |
| --- | --- | --- | --- |
| MAREA NAV | Route and waypoint context for a future authorised local integration; the owner plans on the same boat data | NAV is an input, not an authority; NAV never commands the actuator and no route is delivered that steers without a local human engagement | `DEFINED`, not for sale |
| MAREA HUB | Read-only steering status and instrument context; local data integration | HUB is not the actuator controller and no data path through HUB may enable helm control | `DEFINED`, not for sale |
| MAREA SENSE | Wind measurement as a candidate Sail input, and other vessel measurements for context | A SENSE module is not automatically a steering input; it becomes one only after calibration and safety qualification | `PARTIALLY_VERIFIED` at parser level only (executed unit tests for NMEA 0183 wind parsing and IMU fusion; no sensor hardware, calibration or field accuracy evidence), not for sale |
| MAREA DISPLAY | An approved read-only PILOT status view at a helm or second station | No steering command, no mode change and no engage/disengage from DISPLAY | `DEFINED`, not for sale |
| MAREA WATCH | Authorised read-only PILOT status ashore | No remote engage, disengage, heading adjustment or steering command; WATCH is not a helm | `DEFINED`, not for sale |
| Bundles MAREA SAIL / MAREA COMPLETE | Ecosystem context only, governed by MC-08 | Bundle content, price and publication are not decided here; no bundle is orderable; no bundle price is a turnkey PILOT installation | `CONCEPT` |

The intended ownership path inside PILOT is Coastal → Sail only when wind-angle verification exists and the
vessel carries a qualified wind source, and Coastal or Sail → Pro as a re-quoted installation package after a
specialist assessment. There is no software unlock from Coastal to Sail and no upgrade price. No cross-sell
material may imply that a MAREA NAV, HUB, SENSE, DISPLAY, WATCH or bundle purchase includes a steering
installation, or that buying PILOT includes any of those products.

---

## 15. Safety annex — cross-reference to the PILOT safety case

This dossier defines the commercial product and its intended safety boundaries. It is **not** the safety
case and does not substitute for it. The independent design-stage safety dossier is a separate MC-06
deliverable owned by the Independent Marine Safety Engineer:
**`docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md` (D10a-PILOT-SAFETY)**. It states intended use, eligibility
boundaries, foreseeable misuse, hazard categories, safety goals, safety requirements, failure-detection
requirements, safe-state analysis, manual-takeover and independent-stop requirements, interface authority,
commissioning and sea-trial requirements and the evidence plan for the safety gate. This dossier
cross-references that document and must not duplicate, paraphrase or pre-empt it; where the two differ on a
safety matter, the safety dossier may only **tighten** the requirement and this dossier must be amended.

| Subject | Where it is owned | What this dossier does |
| --- | --- | --- |
| Hazard log, hazard analysis and risk classification | `PILOT-SAFETY-CASE-OUTLINE.md` | Names the hazards that the commercial boundaries depend on (drive runaway, loss of manual authority, undetected takeover, lost command link, E-stop failure, isolation failure, unauthenticated control, loss of heading/feedback/GNSS) without restating the analysis |
| Safety requirements and their verification method | `PILOT-SAFETY-CASE-OUTLINE.md` and `HARDWARE-COMPLIANCE-MATRIX.md` §3.5 | Requires them as acceptance evidence (§13, §16) |
| FMEA/FTA and independence arguments | `PILOT-SAFETY-CASE-OUTLINE.md` | Records that they do not exist yet (`NOT_EVIDENCED`) |
| Evidence plan for gate G1–G9 | `PILOT-SAFETY-CASE-OUTLINE.md` with `HARDWARE-COMPLIANCE-MATRIX.md` §3.5 | References the gate list and does not claim any gate |
| Manual takeover, E-stop and isolation design boundaries | This dossier (§4, §5) and the safety case | States them as binding product boundaries and records their evidence state |
| Conformity route and independent review | Conformity programme (H-06) and safety case | Records that neither exists |

The safety case is the authority for whether a configuration may be offered, commissioned or continued in
service. If the safety case and this dossier disagree on a safety boundary, the stricter position governs and
this dossier must be amended. No statement in this dossier may be used to argue that a safety property exists
without the safety case's evidence. At the time of writing, the safety gate is `BLOCKED` (H-01, P-04) and no
safety case evidence exists.

---

## 16. Traceability annex — MC-02 blockers and evidence required before sale

### 16.1 Mandatory PILOT blocker mapping (README §16, §17, §18; MC-02 register)

| Blocker | What it means for MAREA PILOT | Closed only by | Fields affected |
| --- | --- | --- | --- |
| H-01 | Commercialisation safety gate `BLOCKED`: no physical bench evidence, no sea trial, no independent verification, no conformity assessment. Software safety logic is partial; the control plane is unauthenticated; there is no rudder feedback and no takeover detection. | Staged safety programme: bench → HIL → supervised sea trials per mode → independent review → conformity; decision DEC-06 | F01, F04, F05, F06, F10, F17, F18, F23, F24, §4, §5, §7, §13 |
| H-02 | The on-board autopilot controller's HTTP command API is unauthenticated, binds all interfaces and exposes engage, drive-test, tuning and E-stop to the LAN; it may never be exposed in a product. | Authentication/authorisation, local binding, capability tokens, command audit, safety interlock, evidence that no steering command crosses the boundary | F09, PS-01, PS-18, PILOT-AC-15 |
| H-03 | The motor link is contradictory (documented UART vs firmware USB CDC vs scripts using USB by-id), so the physical/electrical interface is not a controlled design. | Single documented interface, controlled design, commissioning validation | F07, F09, PS-02, PS-13, PS-17 |
| H-05 | No physical build, measurement, environmental or EMC evidence exists; no article, no enclosure, no harness. | Prototype BOM, bench measurements, thermal/ingress/vibration tests, EMC pre-scan on the actual article | F07, F10, F13, F14, PS-03, PS-04, PS-11, F24 |
| H-06 | CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA obligations are not started; no EU declaration of conformity exists. The switched motor drive is an EMC emitter that must be assessed. | Conformity programme per installation/configuration, accredited laboratory, technical file, declaration of conformity, producer registrations | F14, F19, F24, §15 |
| H-07 | No BOM, supplier quotes, manufacturing or traceability evidence; legacy drive provenance and spares are unassessed. | Real RFQs, approved vendor list, part numbers/revisions, lifecycle commitments, serial traceability | F07, F08, F10, F13, F14, §10 |
| H-10 | No hardware watchdog, no relay output, no rudder/end-stop enforcement; E-stop concept is GPIO-level with no physical evidence; firmware safety tests are not in CI. | Hardware-safe design review, independent verification, hardware watchdog, fail-closed isolation, end-stop inputs, firmware CI, FMEA | PS-05, PS-09, PS-10, PS-11, PS-12, PS-13, PS-16, PS-17, PILOT-AC-04, PILOT-AC-07, PILOT-AC-10 |
| H-13 | CRA obligations: reporting obligations already apply and main obligations follow; no vulnerability handling, secure update, SBOM or incident reporting exists. | Security-by-design, coordinated disclosure, signed update with rollback, SBOM, incident reporting, conformity route | PS-18, F12, F19, §8.3 |
| P-04 | PILOT safety gate `BLOCKED` (H-01–H-03, H-10); no sea trials; no conformity; independent watchdog and E-stop not physically proven. PILOT may not be offered for sale. | See H-01 remediation; decision DEC-06 | F01, F05, F10, F17, F24 |
| P-10 | Engineering reuse is inventory-level; Node/TypeScript suites are unexecuted, including the safety tests that would matter; no reproducible build/test environment. | `npm ci` in an isolated environment, CI parity, executed test report per reused module | F09, F11, F23, F24 |
| X-01 | MAREA is a proposed brand; no trademark clearance. Nothing may be published as registered. | EUIPO/OEPM clearance and filing before any brand publication | F17, F20, copy files |
| X-03 | No image-generation capability or budget authorization; all PILOT assets are `BLOCKED_ON_IMAGE_GENERATION` and `CONCEPT`, never a manufactured device. | Written budget authorisation, provider credential, commercial-use confirmation; then a pilot asset | F20, §16.3 |
| X-05 | No BOM, supplier quotes, labour rates, conformity quotes, channel terms or approved price; no unit economics. | Real quotes, bottom-up costing and an approved price list | F13, F14, F15, F23, §10 |
| X-06 | No primary customer evidence, no installer/distributor terms, no validated willingness to pay. | Structured discovery and pilot customers; installer agreements | F02, F05, F15, F17, F21, F22 |

Supplementary references: L-01–L-03 (no inbound licence or assignment from the source project; software licence
position `NOT_CLEARED`), X-02 (seller legal identity required for warranty, terms and invoices), and D-09
(AIS-derived data rights — PILOT displays no AIS targets today; if a future display surface adds them, the AIS
receive-only disclaimer and data-rights position become mandatory). PILOT is not blocked by chart or weather
data rights (`D-01`, `D-04`) because it consumes none of that data; it is blocked by the hardware, safety,
licence and commercial blockers above.

### 16.2 Exact evidence required before any PILOT sale or quotation

1. **Safety evidence** — frozen hardware design; bench and HIL logs with instrumented measurements; supervised
   sea trials per delivered mode with failure injection; independent marine-engineer review; closed safety case
   (H-01, H-10, P-04).
2. **Hardware evidence** — BOM with manufacturer part numbers and revisions; harness and enclosure drawings;
   power architecture with fuse coordination, isolation and transient protection; E-stop and contactor
   selection with DC breaking rating; serial and traceability scheme (H-05, H-07).
3. **Conformity and security** — EMC assessment of the motor drive; LVD/EMC/GPSR/RoHS/WEEE applicability;
   CRA conformity with vulnerability handling, secure update and SBOM; EU declaration of conformity; producer
   registrations (H-06, H-13).
4. **Compatibility evidence** — a per-vessel-family compatibility envelope: drive family, steering type,
   feedback arrangement, heading sensor, wind source, firmware versions, directions and limitations, each
   backed by a recorded test (H-01, H-03; D5).
5. **Installer and service evidence** — installer agreements, competence scheme, insurance, responsibility
   matrix, reference installations, measured installation hours, training material, handover and maintenance
   procedures (X-05, X-06).
6. **Commercial evidence** — real BOM and labour costs, conformity and insurance quotes, channel terms, a
   bottom-up costing and an approved price list; only then may `from EUR 1,290` be reconsidered (X-05; §10).
7. **Legal evidence** — seller legal identity, written warranty and support terms, terms of sale, privacy and
   data position, and the software licence/ownership decision (X-02, L-01–L-03).
8. **Brand and copy evidence** — trademark clearance, a populated claims register and approved copy; no PILOT
   copy may be published before that (X-01, F20).

### 16.3 Asset status

The ten PILOT assets defined by README §22 — `PILOT-HERO-01`, `PILOT-USE-02`, `PILOT-OVR-03`, `PILOT-EDN-04`,
`PILOT-ECO-05`, `PILOT-INS-06`, `PILOT-MOB-07`, `PILOT-TMB-08`, `PILOT-OG-09`, `PILOT-TEC-10` — are
`BLOCKED_ON_IMAGE_GENERATION` with X-03 open, and every one is `CONCEPT`, never a manufactured device, never a
photograph of a real installation and never a certification visual. Their requirements are owned by the asset
deliverable D9; this dossier only records their status.

### 16.4 Lifecycle gate

No PILOT SKU may be orderable, pre-sold or quoted while these are missing. The lifecycle gate for any sale is
`ENGINEERING_VERIFIED` → `REGULATORY_READY` → `OPERATIONS_READY` with an approved SKU — not merely a published
specification, not a completed dossier and not a marketing page. A quotation is a commercial act and therefore
also requires the approved price list, the legal identity and the installer agreement that do not yet exist.

---

## 17. Required disclaimers (verbatim) and non-assertions

### 17.1 PILOT supervised-steering disclaimer — required in the dossier, both copy files and every quotation

Approved wording from `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9. Localise, do not paraphrase.

**ES:** «El sistema de gobierno es asistido y supervisado: exige vigilancia y capacidad de toma de control
manual en todo momento. No permite gobierno autónomo ni control remoto sin supervisión.»

**EN:** "The steering system is assisted and supervised: it requires continuous watchkeeping and the ability to
take manual control at all times. It does not provide autonomous steering or unattended remote control."

### 17.2 Navigation / instruments disclaimer — required because the control head displays heading and route data

**ES:** «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo
reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la
navegación corresponde siempre al patrón.»

**EN:** "This product is a navigational aid. It does not replace official nautical charts, the vessel's
required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests
with the skipper."

### 17.3 AIS receive-only disclaimer — conditional

PILOT does not display AIS targets today. If a future approved surface presents AIS-derived traffic, the AIS
receive-only disclaimer of the claims policy §9 becomes mandatory on that surface, together with the AIS
data-rights position (D-09).

### 17.4 Brand attribution — verbatim, ES/EN

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

No customer-facing surface may present MAREA PILOT as certified, approved, available, priced, navigation-grade
or autonomously capable while `brandPublication = NOT_GRANTED` and `availability = NOT_FOR_SALE`.

### 17.5 Non-assertions

This dossier does **not** assert, and must not be read as asserting: CE marking, an EU declaration of
conformity, EMC/LVD/GPSR/RoHS/WEEE/CRA compliance or assessment; any notified-body, class-society or
laboratory certificate; any certificate for the drive, control head, isolation device or E-stop; any bench
measurement, thermal or ingress result, torque, current, duty-cycle, response time or timing figure; any
supervised sea trial or sea-trial result; any independent marine-engineer review; any completed installation,
measured installation hours or installation price; any stock, lead time, delivery or availability; any sales,
customer count, review, testimonial or partner; any trademark clearance; any installer certification; and any
autonomy, unattended operation, collision avoidance, remote or cloud steering, or certification of the
steering function.

Status of this deliverable: `INTERNAL ONLY — NOT PUBLISHED — NOT FOR SALE`, `COMPLETE_TARGET_SPECIFICATION`,
lifecycle `DEFINED`, safety gate `BLOCKED`. It defines the finished commercial product and the evidence that
would prove it. It does not make MAREA PILOT orderable, publishable, quotable, certified or safe in service,
and it does not replace the safety case, the conformity assessment, the installer agreement or any verification
milestone.
