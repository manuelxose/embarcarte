# MAREA AIS — complete commercial specification (MC-05 / D3-AIS)

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D3-AIS |
| Milestone | MC-05 (Master Prompt 05/36) — complete final-product commercial definitions |
| Deliverable | D3 — MAREA AIS complete commercial specification |
| Owner | MAREA AIS Product Director (product function; not a named individual) |
| Status | INTERNAL / COMPLETE_TARGET_SPECIFICATION / NOT_FOR_SALE |
| Lifecycle state | `DEFINED` (binding scale in `COMMERCIAL-PORTFOLIO.md`; no other state may be claimed) |
| Base commit | `8ac6d69` (MC-04 HEAD) |
| Branch | `feature/marea-mc05-nav-hub-ais-products` |
| Date | 2026-10-30 |
| Binding contracts | `docs/marea/products/README.md` (conventions, 24 fields, evidence classes, readiness, claim rules) and `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` (verbatim disclaimers) |
| Write scope | This file only. `docs/marea/products/copy/ais.es.md` and `ais.en.md` are owned by UX, Content and Localization (D8) |
| Is not | A shop catalogue, published product page, price list, quotation, offer, certification, availability or stock statement |

## 0. How to read this document

This dossier specifies the intended final commercial product and, separately, what is actually verified
today. A complete specification is **not** readiness: MAREA AIS is `DEFINED` and `NOT_FOR_SALE`, and
nothing here makes any SKU orderable, priced, certified or available.

Every one of the 24 canonical fields uses the mandatory five-line block: Definition, Evidence, Owner,
Blockers / dependencies, Commercial readiness. Evidence labels are `VERIFIED_REPO`, `VERIFIED_EXTERNAL`,
`ASSUMPTION`, `HYPOTHESIS`, `OPEN` and `BLOCKED`; `OPEN` and `BLOCKED` are correct values when a fact does
not exist. Where an Evidence line is `OPEN` or `BLOCKED` it names the milestone that must produce the
evidence, using the MC-02 milestone numbering (11 BOM/hardware conformity, 27–28 support/RMA,
32 contracts, 33–34 physical and independent verification).

MAREA AIS is a **receive-only** AIS receiver. It is not a transponder, does not transmit the vessel's
identity or position, is not a DSC device, is not a collision-avoidance system and does not replace
watchkeeping. That constraint governs every field below.

## 1. Status block

### 1.1 Programme status (README §1, reproduced without change)

| Dimension | Value at MC-05 |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` (MC-02 audit evidence; no product hardware, no tested integration) |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BRAND_CLEARANCE` | `NOT_GRANTED` |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |

`EVIDENCE_BASED` describes the MC-02 audit: there is evidence about the programme and the audited
open-source stack, not evidence that the MAREA AIS product works. The per-dimension readiness below is
what the field blocks in §2 cite.

### 1.2 Per-dimension readiness — MAREA AIS at MC-05

A single `READY` flag is prohibited. Both editions carry the same values at this milestone.

| Dimension | Value | What proves the value / blocker |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | This dossier and `docs/marea/products/README.md` §6 |
| `engineering` | `NOT_VERIFIED` | AIS receive pipeline is external (AIS-catcher, GPL-3.0, `S-01`); no receiver hardware (`H-08`, `P-03`); no tested integration (`P-10`); tests `NOT_VERIFIED` |
| `hardware` | `NOT_SELECTED` | No receiver module selected, no enclosure, no BOM; no article has been built (`NOT_BUILT`) — `H-05`, `H-08`, `X-05` |
| `licensing` | `NOT_CLEARED` | GPL-3.0 decoder distribution strategy unresolved; decision DEC-04 (`S-01`, `P-03`) |
| `dataRights` | `NOT_GRANTED` | AIS-derived retention/redistribution not established; `D-09`, matrix row `MD-24` (`LEGAL_REVIEW_REQUIRED`) |
| `compliance` | `NOT_STARTED` | RED/EMC/CE, GPSR, RoHS, WEEE, CRA: no test report, no EU declaration of conformity, no technical file (`H-06`, `H-08`) |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | EUR 249 / EUR 399 are hypotheses only (`README` §8); no BOM, no quotes (`X-05`) |
| `brandPublication` | `NOT_GRANTED` | MAREA is a proposed brand; trademark clearance not performed (`X-01`) |
| `availability` | `NOT_FOR_SALE` | No stock, no fulfilment, no support/RMA process, no approved SKU record |

### 1.3 What "complete specification" does and does not mean

- **Does:** fixes the intended customer experience, editions, included and excluded boundaries, journeys,
  limitations, acceptance evidence and blocker traceability so three writers cannot contradict each other.
- **Does not:** assert that any capability is built, measured, certified, priced, approved or sellable; it
  does not close a single MC-02 blocker.
- **Correct reading:** the product is completely described and completely unavailable. Every sales-facing
  sentence remains subject to `COMMERCIAL-BRAND-CLAIMS-POLICY.md` and to an empty claims register.

## 2. Canonical 24 fields (F01–F24)

#### F01 — Identity
- **Definition.** MAREA AIS is the MAREA hardware product line's **receive-only** VHF AIS receiver package: an on-board receiver that listens to AIS VHF broadcasts and makes received vessel traffic available to compatible on-board systems. It is not a transponder, does not transmit the vessel's identity or position, is not a DSC device, is not a collision-avoidance system and is not a navigation system. Its positioning is the traffic-awareness layer that feeds MAREA NAV, MAREA HUB or a compatible third-party display; buying NAV does not imply radio hardware. Two editions are defined: MAREA AIS Receiver and MAREA AIS Connected. MAREA is a proposed brand, not a registered or cleared one.
- **Evidence.** VERIFIED_REPO `docs/marea/products/README.md` §2 and `docs/marea/COMMERCIAL-PORTFOLIO.md` §03 (definition and exclusions); VERIFIED_REPO `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4 (safety-critical language). The product itself is `OPEN` — no receiver hardware or tested build exists (`H-05`, `H-08`).
- **Owner.** Product (AIS Product Director) with Brand.
- **Blockers / dependencies.** `X-01` (brand clearance), `H-08` (receiver hardware and RF conformity).
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### F02 — Customer segments
- **Definition.** Primary segment: recreational sailing and motor-cruiser owners on coastal and day passages who already carry a chartplotter, tablet or laptop and have no AIS reception. Secondary: owners refitting older electronics, and boatyards/marine electricians who specify and install. Tertiary: light professional or skippered use, with the explicit caveat that marine-equipment (MED) scope is not applied and no professional-channel claim is made. Buying contexts: standalone traffic awareness, NAV+AIS, HUB+AIS, NAV+HUB+AIS, and installer-led retrofit. Personas are planning hypotheses, not interview findings.
- **Evidence.** ASSUMPTION — segment framing from `COMMERCIAL-PORTFOLIO.md` §03 and `MARKET-BENCHMARKS.md`; `OPEN` — no primary customer interviews exist (`X-06`, evidence milestone 09–10).
- **Owner.** Product with Market Research.
- **Blockers / dependencies.** `X-06`, `X-05`.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### F03 — Customer problems
- **Definition.** The problems are: (1) hidden traffic — vessels sharing the water that the crew does not see because there is no traffic information at the helm; AIS reception adds information only about vessels that transmit AIS; (2) older electronics — installed chartplotters and instruments often have no AIS input, and replacing them is expensive; (3) fragmented data — traffic, position and instrument data sit on separate screens. Existing alternatives: an integrated chartplotter with AIS input (full replacement), a standalone receive-only AIS receiver box from an established marine brand, a class A/B AIS transponder (a different product that transmits, with different licensing and installation consequences, excluded here), or a tablet/phone application that still requires AIS hardware to provide data. No alternative makes all traffic visible: not every vessel transmits AIS.
- **Evidence.** VERIFIED_EXTERNAL — D6 §5.3/§5.5 re-verification (2026-10-30): Digital Yacht AIS100 at EUR 300 (EU store) / EUR 360 (ES storefront) and AIS100PRO at EUR 350; the two storefronts differ on the same date and the VAT basis is unstated, so neither figure is an EU-wide price; an earlier EUR 360/420 programme note could not be reproduced and is superseded; ASSUMPTION — problem framing; `OPEN` — customer validation (`X-06`, milestone 09–10).
- **Owner.** Product.
- **Blockers / dependencies.** `X-06`.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### F04 — Final functionality
- **Definition.** The complete end-state product is a receive-only AIS receiver that listens to AIS VHF broadcasts through a connected VHF antenna, decodes them into vessel identity and movement information, maintains per-target state with message age and source, presents target lists and a traffic view, and publishes traffic data plus receiver health to compatible consumers (MAREA NAV, MAREA HUB, compatible third-party systems). It displays proximity values (CPA/TCPA) only when the required own-vessel inputs and a validated computation path exist; otherwise it states that they are unavailable instead of estimating. No transmission path exists in the architecture. The 26 mandatory capability domains are specified in the table below; every row describes intended end-state behaviour that is **not built and not tested**.
- **Evidence.** `OPEN` — no receiver hardware (`H-05`, `H-08`), no bundled decoder strategy (`P-03`, `S-01`), no tested integration (`P-10`); VERIFIED_REPO `docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg` (illustrative chain, engineering review pending); evidence milestones 11 and 34.
- **Owner.** Product with Hardware Engineering, Firmware and Integration (HUB owner).
- **Blockers / dependencies.** `H-05`, `H-08`, `P-03`, `S-01`, `P-10`.
- **Commercial readiness.** `engineering = NOT_VERIFIED`

**26 mandatory capability domains (intended end-state; none verified)**

| # | Domain | Intended final capability | Status / dependency |
| --- | --- | --- | --- |
| 1 | Recreational buyer profiles | Coastal and day-sailing owners of sail and motor craft who already own a display or tablet; sold as an addition to existing equipment. Edition choice guided by whether the customer needs a simple local output or documented richer networking and diagnostics. | `OPEN` (`X-06`) |
| 2 | Existing equipment integration | Designed to feed AIS traffic to compatible third-party chartplotters and navigation applications over a documented local output, after a published per-device compatibility matrix exists. No universal compatibility is claimed. | `OPEN` (`P-10`, `H-04`) |
| 3 | Receive-only AIS functionality | Listen-only VHF AIS reception of broadcast messages from vessels that transmit AIS. No transmitting element, no transponder function, no DSC. | `OPEN` (`P-03`) |
| 4 | Hardware receiver package | A receiver unit in a marine enclosure with power input, VHF antenna input, local data output and status indication. Hardware selection, enclosure, ingress rating and BOM are not chosen. | `BLOCKED` (`H-05`, `H-08`, `X-05`) |
| 5 | Signal reception requirements | Correct VHF antenna, feedline, splitter where an existing antenna is shared, adequate and fused power, and a sensible antenna position. Reception quality follows from those physical conditions; no detection, coverage or reception guarantee exists. | `OPEN` (`H-08`) |
| 6 | Antenna requirements | A dedicated AIS VHF antenna, or a VHF splitter to share the existing VHF antenna, with correct mount, coax, connectors and grounding. Antenna and splitter are separate purchases in the intended package structure, not included in either SKU. Exact recommendations await RF design. | `OPEN` (`H-08`) |
| 7 | Installation options | Installer-led installation for antenna, splitter, coax and power; self-install only for a documented low-risk configuration once a compatibility checklist exists. A commissioning checklist is intended. | `OPEN` (`P-03`, `X-06`) |
| 8 | Vessel and target information | Per received target: MMSI, vessel name, call sign, vessel type, dimensions where transmitted, position, course and speed over ground, heading where transmitted, navigation status, rate of turn, destination and ETA where transmitted, last-message age, receiving channel where the design supports it, and stale/lost state. Fields other vessels do not transmit remain absent. | `OPEN` (`P-03`) |
| 9 | Identity and track display | Target identity panel showing source and age; received-position track trail with stale and lost states. Markers are own product symbology, not official chart symbology. | `OPEN` (`P-03`); icons VERIFIED_REPO |
| 10 | Traffic target lists | Sortable target lists (nearest, newest, by type or status) with distance and bearing where own position exists, filters for stale targets, and an honest empty state. The list is never presented as complete traffic. | `OPEN` (`P-03`, `P-10`) |
| 11 | Position and heading data requirements | Own-vessel position, COG and SOG must come from a compatible GNSS source (for example MAREA NAV or MAREA HUB). Heading, where available, comes from a compatible heading source. Without own position, distance, bearing and CPA/TCPA cannot be produced; without heading, some derived values cannot be computed. The receiver alone does not supply own-vessel position. | `OPEN` (NAV/HUB dependency) |
| 12 | CPA/TCPA display | Proximity values can be shown only where own position, COG and SOG, and a validated computation path exist; they are presented as an awareness aid with source and age. This is not a collision-avoidance system and implies no safety outcome. Missing inputs produce an explicit unavailable state, never an estimate. | `OPEN` (NAV owner, `P-03`) |
| 13 | Traffic alert configuration | User-configurable proximity and stale-target thresholds, plus receiver-fault alerts, where computation exists and with documented defaults. Alerts are advisory, require watchkeeping and are not a substitute for it. The product alert engine is not implemented. | `OPEN` (`P-03`) |
| 14 | Missing-target and stale-data behaviour | Every target shows last-message age and stops being presented as current when messages stop; stale and lost states are explicit. Absence of a target is never presented as absence of a vessel. | `OPEN` (`P-03`, milestone 34) |
| 15 | Receiver connectivity status | Health indication for power, decoder state, data output, last-message age and channel status where the design supports it, visible both locally and to NAV/HUB. Fault states are named, not hidden. | `OPEN` (`H-08`, `P-10`) |
| 16 | Integration with NAV | MAREA NAV consumes AIS traffic for overlay, target lists and CPA/TCPA where NAV supports it. The NAV licence is separate and not included; overlay depends on NAV's AIS input support and a tested integration. | `OPEN` (NAV dependency) |
| 17 | Integration with HUB | MAREA HUB aggregates the receiver's local output with other on-board data and distributes it to consumers. HUB is a separate product, not included in either AIS SKU. | `OPEN` (HUB dependency, `H-04`) |
| 18 | Supported local output methods | Intended: standard AIS NMEA 0183 `!AIVDM` sentences over a documented local transport (local network and/or USB-serial), and a Signal K path where tested. Exact transports, ports, message rates and per-device behaviour are frozen in the compatibility matrix (D5). NMEA 2000 is not offered and no certification or compatibility is claimed; vessel data is not exposed to the open internet. | `OPEN` (`P-03`, `H-04`, `P-02`) |
| 19 | Power and installation requirements | 12 V DC vessel supply with documented fuse or breaker, correct polarity, cable routing, strain relief and separation from VHF coax; power consumption and thermal envelope not measured. No mains supply is part of the product. | `OPEN` (`H-05`) |
| 20 | Diagnostics | On-device status, last-message and error history, decoder state, output counters and a support export bundle. No remote diagnostics service is defined and reception does not depend on a cloud service. | `OPEN` (`P-03`, milestone 28) |
| 21 | Firmware updates | An update path, support period and secure-update mechanism must be defined, including vulnerability handling required by CRA applicability. No update mechanism, versioning scheme or update entitlement is asserted today. | `BLOCKED` (`H-06`) |
| 22 | Onboarding and user guidance | First-use sequence: mount, antenna or splitter, power, local data connection, select the AIS input on NAV/HUB or compatible equipment, confirm listening status and recent messages, see target ages, read the receive-only disclaimer. Guidance must teach stale/lost states and the absence of unequipped vessels. Guides are an obligation, not an existing artefact. | `OPEN` (D8 copy, `X-06`) |
| 23 | Documentation and support | Installation guide, compatibility matrix, warranty terms, support contact and RMA route. None exists; no support SLA or response time may be promised. | `OPEN` (`X-02`, milestone 28) |
| 24 | Warranty and replacement | The statutory consumer guarantee applies once sold; contractual duration, coverage, spare parts and replacement route are undefined and must not be stated until approved. | `OPEN` (`X-02`, milestone 28) |
| 25 | Regulatory and RF conformity requirements | A receiver that intentionally receives radio waves is radio equipment under RED; CE marking, EMC through RED, GPSR, RoHS, WEEE and CRA also apply. No test report, EU declaration of conformity, notified-body certificate or technical file exists. | `BLOCKED` (`H-06`, `H-08`) |
| 26 | Customer expectations and limitations | Receive-only; not every vessel transmits AIS; no collision avoidance; no transmission of own position; does not replace watchkeeping, official charts or required equipment; reception depends on antenna, cabling, power, installation and conditions; range is not guaranteed. | `OPEN` (claims policy) |

#### F05 — Differentiation
- **Definition.** Differentiation rests on four honest, checkable ideas rather than performance claims: (1) a receive-only receiver designed from the start to feed the MAREA data layer instead of replacing a chartplotter; (2) transparent target state — source, age, stale and lost — so the customer can judge what is on screen; (3) two editions in which Connected adds documented local networking and diagnostics, not a label; (4) an entry-price hypothesis below the published benchmark listings, which is a positioning hypothesis and not proof of margin. MAREA AIS does not compete with transponders, does not claim superior sensitivity, range or update rate, and no comparative performance claim exists.
- **Evidence.** VERIFIED_EXTERNAL — D6 §5.3/§5.5 re-verification (2026-10-30); ASSUMPTION — integration value and price positioning; `OPEN` — sensitivity and range (no RF measurement, `H-08`, milestone 34).
- **Owner.** Product with Commercial Strategy.
- **Blockers / dependencies.** `H-08`, `X-05`, `X-06`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F06 — Editions
- **Definition.** Two editions: MAREA AIS Receiver (`AIS-RECEIVER`, hypothesis EUR 249) with a basic documented compatible local output, and MAREA AIS Connected (`AIS-CONNECTED`, hypothesis EUR 399) with documented richer local networking, diagnostics and integration. Connected must deliver a verifiable customer benefit over Receiver (at least documented networking for more than one local consumer where the hardware supports it, and diagnostics the Receiver does not expose); it may not be a label or a software toggle. The distinct-value verdict is CONDITIONAL and is set out in §3: if the hardware design cannot evidence the difference, Connected must not be sold as a separate edition. Dual-channel (both AIS VHF channels) reception is a target engineering requirement for both editions and remains `OPEN` until the receiver design evidences it; it is never asserted as delivered.
- **Evidence.** HYPOTHESIS — price values from `README` §8 and `COMMERCIAL-PORTFOLIO.md` §03; `OPEN` — no hardware design (`H-08`), no edition verification; ASSUMPTION — the local networking/diagnostics difference is achievable within target cost.
- **Owner.** Product with Hardware Engineering and Commercial Strategy.
- **Blockers / dependencies.** `H-08`, `H-05`, `X-05`.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### F07 — Included items
- **Definition.** Both editions are intended to include the receiver unit, a documented power lead, a quick-start guide, a mounting solution appropriate to the chosen enclosure and a support registration path. Neither edition includes the AIS VHF antenna, a VHF splitter, mast coax and connectors, professional installation, MAREA NAV or MAREA HUB. The Connected edition adds documented local networking and richer diagnostics, not additional radio hardware by definition. Every content is procurement-dependent and is recorded as `OPEN` in §4; nothing in this field is a final boxed-contents list.
- **Evidence.** `OPEN` — no BOM, no enclosure, no packaging decision and no supplier quotation (`H-05`, `X-05`, milestone 11); ASSUMPTION — intended package structure.
- **Owner.** Product with Hardware Engineering and Supply.
- **Blockers / dependencies.** `H-05`, `X-05`.
- **Commercial readiness.** `hardware = NOT_SELECTED`

#### F08 — Optional accessories
- **Definition.** Optional, separately priced and separately stocked: a dedicated AIS VHF antenna; a VHF splitter for sharing an existing antenna; mast coax, connectors and mounting hardware; longer local data cabling; MAREA HUB; MAREA NAV subscription; professional installation and commissioning. No accessory price, stock or availability is stated and no accessory is bundled free. Antenna and splitter compatibility with the receiver must be checked before purchase.
- **Evidence.** ASSUMPTION — accessory list; `OPEN` — prices, stock and availability (`X-05`); antenna/splitter requirement `OPEN` (`H-08`).
- **Owner.** Product with Commercial and Operations.
- **Blockers / dependencies.** `X-05`, `H-08`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F09 — Integration
- **Definition.** MAREA AIS is designed as a data source inside the MAREA ecosystem: MAREA NAV is the intended primary visualisation surface, MAREA HUB the intended local aggregator, and compatible third-party systems may consume the same local output. Intended protocols are standard AIS NMEA 0183 `!AIVDM` sentences over a documented local transport and a Signal K path where tested. Compatibility is per device, per firmware and per direction and must be recorded in a published matrix (D5, HUB owner); Signal K is not a blanket guarantee. NMEA 2000 is not offered and neither certification nor compatibility is claimed (`H-04`). No automatic steering-control path is introduced or implied. Every displayed target carries its source and age.
- **Evidence.** `OPEN` — no tested integration (`P-10`, milestone 34); VERIFIED_REPO `docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §4.1 (external decoder forwards `!AIVDM` over UDP in the audited stack); ASSUMPTION — NAV/HUB consumer path.
- **Owner.** Integration (HUB Product Director) with Product and Engineering.
- **Blockers / dependencies.** `P-03`, `P-10`, `H-04`, D5 delivery.
- **Commercial readiness.** `engineering = NOT_VERIFIED`

#### F10 — Professional installation
- **Definition.** Professional installation is expected for most retrofits because antenna placement, splitter installation, mast coax, RF connectors and power routing determine both reception quality and electrical safety. Self-install is permitted only for a low-risk configuration defined in support documentation, which does not exist yet. Installation is not included in either SKU, is not free and must be quoted. No technician certification scheme exists, so no "certified technician" statement may be made. Commissioning should record receiver status, a reception check, confirmation of the data input on the consumer and acknowledgement of the receive-only disclaimer.
- **Evidence.** ASSUMPTION — installer-led route (`COMMERCIAL-PORTFOLIO.md` §03 "buying path"); `OPEN` — no installer programme, checklist or commissioning record (`X-06`, milestone 10/28); antenna/splitter requirement VERIFIED_REPO `HARDWARE-COMPLIANCE-MATRIX.md` §5.5 AIS row.
- **Owner.** Service Operations with Product.
- **Blockers / dependencies.** `H-08`, `X-05`, `X-06`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F11 — Onboarding
- **Definition.** First use must be safe and honest: mount the receiver, connect antenna or splitter and fused power, connect the local output, select the AIS input on NAV/HUB or compatible equipment, confirm the status shows listening with recent messages, see a target list with ages, and read the receive-only disclaimer before relying on the display. Onboarding must explicitly teach stale and lost target states and the fact that vessels not transmitting AIS are invisible. The quick-start and onboarding flow are obligations, not existing artefacts.
- **Evidence.** `OPEN` — no guide, no onboarding flow, no usability test (`P-10`, `X-06`, milestone 28); ASSUMPTION — sequence.
- **Owner.** UX, Content and Localization with Support.
- **Blockers / dependencies.** `P-10`, `X-06`, D8 copy delivery.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### F12 — Licensing and subscriptions
- **Definition.** The customer buys hardware; no subscription is intended for AIS reception itself. Software licensing is unresolved: the external GPL-3.0 decoder (AIS-catcher) cannot be shipped until DEC-04 is decided (GPL-compliant distribution with source offer and notices, a replacement permissively licensed decoder, or user-installed with documented separation), so no licence terms, update entitlement or source-offer position can be stated. MAREA NAV and MAREA HUB are separate products and licences and are not included. AIS-derived data retention and redistribution are not granted; the allowed posture is local, own-vessel situational awareness with target age and source shown. "Free forever" and "lifetime" language is prohibited.
- **Evidence.** `BLOCKED` — `S-01`/DEC-04; VERIFIED_REPO `docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv` (AIS-catcher GPL-3.0); `OPEN` — product licence and update terms (milestones 11 and 32).
- **Owner.** Engineering with Counsel and Product.
- **Blockers / dependencies.** `S-01`, `P-03`, `D-09`.
- **Commercial readiness.** `licensing = NOT_CLEARED`

#### F13 — Retail and partner pricing
- **Definition.** Price hypotheses, not offers: MAREA AIS Receiver EUR 249 and MAREA AIS Connected EUR 399. Both are retail hypotheses awaiting written approval; VAT treatment, territory (initially ES/PT) and the exact included configuration at each price must be fixed by an approved price list after bottom-up costing. No "from", launch, discount or limited-offer language may be used, and no partner price exists. The benchmark listings — Digital Yacht AIS100 at EUR 300 (EU store) / EUR 360 (ES storefront) and AIS100PRO at EUR 350, re-verified in D6 §5.3 on 2026-10-30 — are context for the entry-price hypothesis, not proof of margin; the two storefronts differ on the same date, the VAT basis is unstated, and the included equipment and scope are not equivalent.
- **Evidence.** HYPOTHESIS — `README` §8 and `COMMERCIAL-PORTFOLIO.md` §03; VERIFIED_EXTERNAL — D6 §5.3/§5.5 re-verification (2026-10-30); an earlier EUR 360/420 programme note is superseded; `BLOCKED` — no BOM or quotes (`X-05`, milestone 11–12).
- **Owner.** Commercial Strategy and Pricing with Product.
- **Blockers / dependencies.** `X-05`, `H-08`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F14 — Direct and ongoing costs
- **Definition.** A framework with named inputs only; no cost, margin or contribution figure is asserted. Inputs: receiver BOM and assembly; enclosure, harness and packaging; factory test and RF/EMC pre-scan; RED/EMC conformity assessment and technical file; GPSR risk analysis and technical documentation; RoHS material declarations; WEEE registration and take-back; CRA secure-update and vulnerability handling; GPL-3.0 compliance (source bundle/offer or replacement decoder); documentation and localisation; fulfilment and shipping; payment fees; warranty accrual and returns reserve; installer support and RMA logistics; antenna/splitter pass-through if any SKU ever bundles them. Every input is currently unquoted.
- **Evidence.** `BLOCKED` — `X-05` (milestone 11–12); `OPEN` per input; no supplier quotation, BOM or provider price exists in the repository.
- **Owner.** Finance and Procurement with Product.
- **Blockers / dependencies.** `X-05`, `H-08`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F15 — Channel economics
- **Definition.** No distributor, installer or marketplace agreement exists. The intended channel is installer-led (refit yards and marine electricians) for antenna, splitter, installation and commissioning, with a possible direct online purchase of the Receiver edition only after operations readiness. Intended responsibilities: pre-sale compatibility check, installation, commissioning record, first-line support and escalation. Discount and margin structure, sell-in terms and warranty pass-through are undefined; no percentage may be stated, and the price hypothesis is not a channel offer.
- **Evidence.** `OPEN` — no channel terms (`X-05`, `X-06`, milestones 10 and 12); ASSUMPTION — installer-led route from `COMMERCIAL-PORTFOLIO.md` §03.
- **Owner.** Commercial Strategy and Channel.
- **Blockers / dependencies.** `X-05`, `X-06`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F16 — Competitor comparison
- **Definition.** The direct alternatives are standalone receive-only AIS receiver boxes and AIS-capable chartplotters. Class A/B AIS transponders are a different product category because they transmit, and they must not be compared with a receive-only receiver as equivalent. Published listings re-verified in D6 §5.3 on 2026-10-30: Digital Yacht AIS100 at EUR 300 in the EU-wide store and EUR 360 in the Spanish storefront (same date, so neither figure is an EU-wide price; VAT basis unstated) and AIS100PRO at EUR 350; an earlier EUR 360/420 programme note could not be reproduced and is superseded. Those listings differ in territory, VAT treatment, included equipment and feature scope, so they establish a price context only. No performance superiority, sensitivity or range comparison may be made; no receiver RF measurement exists for MAREA AIS.
- **Evidence.** VERIFIED_EXTERNAL — D6 §5.3/§5.5 re-verification (2026-10-30), which records the storefront difference and the unstated VAT basis; `OPEN` — any MAREA measurement (`H-08`, milestone 34).
- **Owner.** Commercial Strategy with Product.
- **Blockers / dependencies.** `H-08`, `X-05`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F17 — Sales arguments
- **Definition.** Approved-direction arguments, all conditional on evidence before publication: "Add traffic awareness to the equipment you already own." "Receive-only by design: you see what other vessels broadcast; you never transmit." "Targets show their age and source, so you can judge what you see." "Feeds MAREA NAV and MAREA HUB where the compatibility matrix says so." "Two editions: a straightforward receiver, and a Connected edition with documented networking and diagnostics." Objection handling must state plainly that antenna, splitter and installation are extra; that not every vessel transmits AIS; that the product does not prevent collisions and does not replace watchkeeping; that no range figure is promised; and that the price is a hypothesis until approved.
- **Evidence.** ASSUMPTION — argument structure; `OPEN` — publication not cleared (`brandPublication = NOT_GRANTED`); VERIFIED_REPO — claim classes in `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2.
- **Owner.** Product with Marketing and Brand.
- **Blockers / dependencies.** `X-01`, `H-08`, `X-05`.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`

#### F18 — FAQ
- **Definition.** Twelve intended pre- and post-sales questions, answered truthfully: transmit, completeness, collision avoidance, antenna, NAV/HUB dependency, connectivity, range, CPA/TCPA, third-party compatibility, stale targets, subscription and warranty. All answers are target wording pending evidence; the full list is in the table below this block.
- **Evidence.** `OPEN` — answers are target wording; no support artefacts or tested behaviours exist (`X-02`, `H-08`, milestones 28 and 34); VERIFIED_REPO — claims policy classes.
- **Owner.** Support with Product.
- **Blockers / dependencies.** `X-02`, `H-08`.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

| Question | Intended answer (target wording, not approved copy) |
| --- | --- |
| Does it transmit my position? | No. MAREA AIS is receive-only; it is not a transponder and has no transmission path. |
| Can it see every vessel? | No. It can only receive vessels that transmit AIS; many vessels do not. |
| Does it prevent collisions? | No. It is an awareness aid for the crew, not a collision-avoidance system, and it does not replace watchkeeping. |
| Do I need an antenna? | Yes. A dedicated AIS VHF antenna, or a VHF splitter to share the existing VHF antenna. Neither is included. |
| Do I need MAREA NAV or MAREA HUB? | No. The receiver can feed compatible third-party equipment; NAV and HUB add capability and are separate purchases. |
| Does it need internet? | No. Reception is local VHF; no cloud dependency is intended for reception. |
| What range can I expect? | No range figure is promised. Reception depends on antenna, cabling, power, installation and conditions. |
| What are CPA/TCPA? | Proximity values shown only when own position, COG/SOG and a validated computation path exist; otherwise the product shows that they are unavailable. |
| Will it work with my chartplotter? | Only as stated in the published compatibility matrix; there is no blanket compatibility claim. |
| What happens to old targets? | They become stale or lost and are shown with their age; they are not kept as current. |
| Is there a subscription? | None is intended for reception. NAV and HUB are separate; the update policy is not yet defined. |
| What about warranty and service? | The statutory consumer guarantee applies when sold; contractual terms and the RMA route are not yet defined. |

#### F19 — Warranty and support
- **Definition.** Once sold, the statutory consumer guarantee under Spanish and EU consumer law applies and cannot be excluded. The contractual warranty duration, coverage (unit, excluded antenna, water damage, installation faults), spare parts, repair/replacement route and support response are undefined and must not be stated until approved. The seller's legal identity (`X-02`) is required on the warranty document and is currently empty. No "certified repair", "24/7 support" or response-time claim is permitted. If the GPL decoder ships, its notices and source offer must accompany the product.
- **Evidence.** `OPEN` — no warranty terms and no seller identity (`X-02`, milestone 28); `BLOCKED` — GPL notice/source-offer bundle (`S-01`, milestone 32).
- **Owner.** Support and Legal with Product.
- **Blockers / dependencies.** `X-02`, `S-01`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F20 — Bilingual product page copy
- **Definition.** The complete Spanish and English customer-facing drafts are specified at `docs/marea/products/copy/ais.es.md` and `docs/marea/products/copy/ais.en.md`, owned by UX, Content and Localization (deliverable D8); this dossier does not duplicate them. Each must state receive-only operation, excluded transmission and DSC, antenna/splitter/installation exclusions, NAV/HUB separation, limitations, and must carry the AIS receive-only disclaimer and the navigation/instruments disclaimer verbatim; both are internal draft copy and must never be published while the gates are open. If the copy files are absent at review time, F20 is incomplete for this milestone and must be reported, not replaced with substitute copy.
- **Evidence.** VERIFIED_REPO — `docs/marea/products/copy/ais.es.md` and `docs/marea/products/copy/ais.en.md` exist in this checkout (checked 2026-10-30) as internal draft copy delivered under D8; their conformance to the requirements in this dossier is subject to the D13 independent review and is neither asserted nor audited by the product function; VERIFIED_REPO — mandated wording in `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9.
- **Owner.** UX, Content and Localization.
- **Blockers / dependencies.** D8 delivery, `X-01`, `H-08`.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`

#### F21 — Cross-sells
- **Definition.** Complementary products: MAREA NAV (visualisation, AIS overlay and CPA/TCPA where supported), MAREA HUB (local aggregation and multi-consumer distribution), antenna and splitter accessories, and professional installation. The MAREA CRUISE bundle (NAV + HUB + receive-only AIS + DISPLAY, hypothesis EUR 1,399) is ecosystem context only; bundle contents, pricing and publication are governed by MC-08 and are not decided here. An upgrade path from Receiver to Connected is not decided and no trade-in or upgrade price may be stated.
- **Evidence.** VERIFIED_REPO — `COMMERCIAL-PORTFOLIO.md` §03 and bundle table; HYPOTHESIS — bundle price; `OPEN` — upgrade path and MC-08 bundle decision.
- **Owner.** Product with Commercial Strategy.
- **Blockers / dependencies.** `X-05`; MC-08 dependency.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F22 — Retention strategy
- **Definition.** Retention is product-led, not subscription-locked: firmware and diagnostic improvements within a defined support period, documentation and compatibility-matrix updates, a working service/RMA experience, and honest cross-sell into NAV or HUB only where the customer needs them. No recurring fee is assumed for reception; if a future service is added it must be described exactly and never as "free forever". Customer success should track installed units, activation (receiver feeding a consumer), customer comprehension of receive-only behaviour and expansion purchases. Support and update policy are `OPEN`.
- **Evidence.** `OPEN` — no support or update programme (`X-02`, `H-06` CRA update duty, milestone 28); ASSUMPTION — retention model.
- **Owner.** Support with Product.
- **Blockers / dependencies.** `X-02`, `H-06`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F23 — Success metrics
- **Definition.** Metrics to be instrumented only with real data; no targets or baselines are asserted. Commercial: units sold, gross contribution per unit after the named costs of F14, return rate and channel mix. Activation and quality: percentage of delivered units feeding a consumer within 30 days (definition to be fixed), measured target-reception uptime where telemetry is consented and never published as a guarantee, stale-state correctness, support tickets per 100 units and RMA rate. Customer: comprehension of receive-only and limitations in a post-purchase survey, NAV/HUB attachment rate, installer completion rate and installer feedback. No metric may be published as a product claim.
- **Evidence.** `OPEN` — no data and no baseline (`X-05`, `X-06`, milestone 12/34); ASSUMPTION — metric set.
- **Owner.** Product Analytics with Commercial.
- **Blockers / dependencies.** `X-05`, `X-06`.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### F24 — End-to-end acceptance
- **Definition.** Acceptance is defined by the nine scenarios in §7 plus physical and integration evidence. The overall status is NOT_EXECUTED: no receiver hardware exists, no RF or EMC test exists, no installation or on-water trial exists and no NAV/HUB integration test exists, so no scenario can be recorded as passed. Acceptance requires a built unit; RF and EMC evidence per the conformity plan; an antenna/splitter installation test; decoding of real AIS broadcasts; stale-data and antenna-fault behaviour tests; documented compatibility tests with each consumer; an installer commissioning record; and independent review. Until then the product remains `DEFINED` and `NOT_FOR_SALE`.
- **Evidence.** `BLOCKED` — `H-05`, `H-06`, `H-08`, `P-03`, `P-10` (milestones 34–35); §7 scenarios are `BLOCKED`, `OPEN` or `NOT_EXECUTED`.
- **Owner.** Product with Engineering, Compliance and Quality Gate.
- **Blockers / dependencies.** `H-05`, `H-06`, `H-08`, `P-03`, `P-10`.
- **Commercial readiness.** `engineering = NOT_VERIFIED`

## 3. Edition structure and the Connected value verdict

Both editions share the same receive-only core. The only justified difference is what the hardware design
can evidence around local networking, diagnostics and integration. Edition codes are fixed by
`docs/marea/products/README.md` §2.

| Dimension | MAREA AIS Receiver (`AIS-RECEIVER`) | MAREA AIS Connected (`AIS-CONNECTED`) |
| --- | --- | --- |
| Receive core | Receive-only AIS reception, target state with age and source | Same receive-only core |
| Dual-channel reception | Target engineering requirement, `OPEN`, never asserted | Target engineering requirement, `OPEN`, never asserted |
| Local output | Basic documented compatible local output (transport frozen in D5 matrix) | Documented richer local networking; more than one local consumer where hardware supports it (`OPEN`) |
| Diagnostics | Status, last-message age, fault indication | Richer diagnostics: counters, error history, support export (`OPEN`) |
| Integration | NAV or HUB or a third-party consumer per matrix | NAV and HUB and third-party consumers per matrix (`OPEN`) |
| Price hypothesis | EUR 249 — `HYPOTHESIS_UNAPPROVED` | EUR 399 — `HYPOTHESIS_UNAPPROVED` |
| Included hardware | Receiver unit, power lead, quick-start, mount (all `OPEN` pending BOM) | Same, plus the networking/diagnostic capability the design evidences (`OPEN`) |
| Excluded | Antenna, splitter, mast coax, installation, NAV licence, HUB, network backbone | Same exclusions |

**Receiver vs Connected customer-value verdict: CONDITIONAL — not yet justified.** Connected is a
defensible separate edition only if the frozen hardware design evidences both (a) networking for at least
two documented simultaneous local consumers, or a documented richer network interface that the Receiver
does not have, and (b) diagnostics that the Receiver does not expose. If either is missing, the correct
outcome is one receiver SKU plus an optional accessory or software option — selling a second edition at a
EUR 150 hypothesis premium on a label would be a pricing claim without a product difference. This verdict
must be resolved before edition pricing is approved (D4/D6) and before any copy is written (D8).

**Dual-channel statement.** Reception of both AIS VHF channels is a target engineering requirement for
both editions. It is `OPEN`: it depends on the selected receiver design, which does not exist (`H-08`).
No document, page or quotation may state that MAREA AIS receives both channels until measured evidence
exists. The benchmark listing reference to a "PRO" variant does not establish MAREA capability.

## 4. Included and excluded boundaries per SKU

Intended package structure. Nothing in this table is final: contents are procurement-dependent and
therefore `OPEN` until a BOM, enclosure and packaging decision exist (`H-05`, `X-05`). Antenna, splitter,
installation, NAV licence and HUB are **not** free and **not** included.

| Item | MAREA AIS Receiver | MAREA AIS Connected | Note / status |
| --- | --- | --- | --- |
| AIS receiver unit | Included — intended | Included — intended | Hardware selection `OPEN` (`H-05`, `H-08`) |
| Power cabling | Included — intended | Included — intended | Length, connector and fuse rating `OPEN` |
| Data / local output cabling | Included — intended basic lead | Included — intended, including network interface where evidenced | Interface types `OPEN` (D5 matrix) |
| AIS VHF antenna | NOT included | NOT included | Separate purchase; required for reception |
| VHF splitter | NOT included | NOT included | Separate purchase; only if the existing VHF antenna is shared |
| Mounting accessories | Included — intended bracket/mount | Included — intended bracket/mount | Enclosure and mount `OPEN` |
| Professional installation and commissioning | NOT included | NOT included | Quoted separately; not free |
| Navigation software (MAREA NAV) | NOT included | NOT included | Separate licence/product |
| MAREA HUB integration hardware | NOT included | NOT included | HUB is a separate product |
| Firmware updates | Intended for a defined support period | Intended for a defined support period | Support period and update mechanism `OPEN` (`H-06`) |
| Warranty | Statutory guarantee applies when sold | Statutory guarantee applies when sold | Contractual terms `OPEN` (`X-02`) |

Rules for using this table: (1) no item marked `OPEN` may appear in published copy as a confirmed
inclusion; (2) antenna, splitter, installation, NAV and HUB must be repeated as exclusions in every
sales surface; (3) a bundle may include AIS only under MC-08 rules and must still carry the exclusions.

## 5. Customer journeys A–F

Each journey describes intended data flow and customer result. None is verified; the evidence-status line
states exactly what is missing.

### Journey A — Standalone AIS on a compatible third-party system
- **Intended flow.** AIS VHF antenna (or VHF splitter) → receiver → local data output (`!AIVDM` over a
  documented transport) → customer's existing compatible chartplotter or navigation application.
- **Customer result.** Traffic targets appear on equipment the customer already owns, with identity,
  position and message age; no MAREA NAV or HUB is required.
- **Evidence status.** `OPEN`/`BLOCKED` — receiver hardware absent (`H-08`), no per-device compatibility
  matrix yet (`P-10`, D5). This path is the most dependent on third-party testing.

### Journey B — MAREA NAV + MAREA AIS
- **Intended flow.** Antenna/splitter → receiver → local output → MAREA NAV AIS input → overlay, target
  list and, where supported, CPA/TCPA using NAV's own position, COG and SOG. NAV is a separate licence.
- **Customer result.** One visual surface combines navigation and traffic awareness; the customer sees
  target age and source and can judge stale data.
- **Evidence status.** `OPEN`/`BLOCKED` — no tested NAV integration (`P-10`); own-position/heading
  requirements and CPA/TCPA ownership must be reconciled with the NAV dossier (see §11).

### Journey C — MAREA HUB + MAREA AIS
- **Intended flow.** Antenna/splitter → receiver → local output → MAREA HUB → consumers on the local
  network. HUB aggregates AIS with other on-board data and distributes it; HUB is a separate product.
- **Customer result.** Mixed equipment reaches one local data layer; AIS traffic available to several
  consumers where the Connected design evidences it.
- **Evidence status.** `BLOCKED` — HUB hardware and protocol matrix unbuilt (`H-05`, `H-04`, `P-02`);
  integration ownership sits with the HUB Product Director (D5).

### Journey D — MAREA NAV + MAREA HUB + MAREA AIS
- **Intended flow.** Antenna/splitter → receiver → HUB local data layer → NAV (AIS overlay, target lists,
  CPA/TCPA where supported) and any other compatible consumer, all under separate licences.
- **Customer result.** A coordinated on-board data picture; the customer buys each product on its own
  merits, not as a turnkey system, and installation remains a separate service.
- **Evidence status.** `BLOCKED` — combines B and C gaps; no end-to-end test, no bundle decision (MC-08),
  no verified compatibility matrix.

### Journey E — Professional installer AIS retrofit
- **Intended flow.** Compatibility and antenna assessment → antenna/splitter and mast coax installation →
  receiver mounting and fused power → local data connection → commissioning record (receiver status,
  reception check, consumer input) → handover with the receive-only disclaimer and update information.
- **Customer result.** A documented installation with the reception chain checked, not a box handed over;
  the installer remains the first-line support channel.
- **Evidence status.** `OPEN` — no installer programme, checklist, commissioning record or channel terms
  (`X-05`, `X-06`); no technician certification scheme exists, so that phrase must never be used.

### Journey F — Customer facing missing or stale AIS targets
- **Intended flow.** Receiver status shows listening and last-message age → targets carry message age →
  when messages stop, the target becomes stale then lost and is labelled → when no targets are received,
  an empty state explains that not all vessels transmit AIS and that reception depends on installation.
- **Customer result.** The customer can tell the difference between "no traffic" and "no data", and is not
  led to believe that an empty list means empty water.
- **Evidence status.** `OPEN` — behaviour specified but unimplemented (`P-03`, milestone 34); copy and
  onboarding for this state depend on D8 and F11.

## 6. Limitations and customer expectations

These statements are part of the product definition, not marketing caveats. They must appear, in
substance, on every commercial surface.

1. **Receive-only.** MAREA AIS listens to AIS VHF broadcasts; it has no transmission path and is not a
   transponder. It does not transmit the vessel's identity or position and it is not a DSC device.
2. **Incomplete by nature.** Not every vessel transmits AIS. Absence of a target is not evidence of
   absence of a vessel, and a target list is never a complete traffic picture.
3. **No collision avoidance.** The product is not a collision-avoidance system and implies no safety
   outcome. Alerts and proximity values are advisory and do not replace watchkeeping, good seamanship, the
   vessel's required equipment or official charts.
4. **CPA/TCPA depend on other data.** Proximity values exist only when own position, COG and SOG, a
   heading source where required, and a validated computation path are present. Missing inputs produce an
   explicit unavailable state, never an estimate.
5. **Reception depends on installation.** Antenna type and position, feedline, splitter, connectors,
   grounding, power quality and installation work determine what is received. Reception range is not
   guaranteed and no range figure is promised.
6. **Other vessels' data may be incomplete.** Fields another vessel does not transmit, or transmits
   rarely, are absent or old; the product shows age and source instead of hiding that.
7. **Regulatory status is not started.** CE marking, RED, EMC, GPSR, RoHS, WEEE and CRA conformity do not
   exist. The product is not certified, not CE marked and must not be described as approved or homologated.
8. **No NMEA 2000 capability or claim.** NMEA 2000 is not implemented or certified in the programme
   (`H-04`); compatibility is per device, per firmware and per direction, only per the published matrix.
9. **Data is for own-vessel situational awareness.** AIS-derived retention and redistribution are not
   granted (`D-09`, `MD-24`); the product is not an authority-grade traffic service and its data must not
   be resold or aggregated.
10. **Not available, not priced, not cleared.** The product is `DEFINED` and `NOT_FOR_SALE`; prices are
    hypotheses; MAREA is a proposed brand without trademark clearance.
11. **Software licensing unresolved.** The external GPL-3.0 decoder strategy is undecided (`S-01`); no
    distribution form of the product exists.
12. **No professional or safety-of-life role.** MED scope is not applied and recreational craft rules are
    unassessed for this item; no distress, SOLAS, GMDSS or wheel-mark implication may be made.

## 7. Acceptance scenarios

No scenario has been executed. Classification uses `BLOCKED`, `OPEN` or `NOT_EXECUTED`; `PASS` is not
available at this milestone and must not be recorded.

| ID | Scenario | Expected intended behaviour | Classification | Evidence needed before any pass |
| --- | --- | --- | --- | --- |
| S-01 | Receiver starts | Unit powers from a fused 12 V supply; status shows listening; no unsafe state | `BLOCKED` | Built unit, bench power test, start-up log (`H-05`) |
| S-02 | Targets received | Real AIS broadcasts decode into targets with identity, position and age | `BLOCKED` | Receiver hardware, RF chain, decoding test, recorded capture (`H-08`, `P-03`) |
| S-03 | Targets become stale | Targets stop being current when messages stop; age and stale/lost state shown | `OPEN` | Implemented behaviour plus fault-injection test (milestone 34) |
| S-04 | Required position data missing | Distance, bearing and CPA are shown unavailable with a clear message; no estimate shown | `OPEN` | Behaviour test with own-position input removed; NAV/HUB dependency |
| S-05 | CPA/TCPA cannot be calculated | Explicit unavailable state; no fabricated value; explanation to the user | `OPEN` | Computation-path test and copy review (D8) |
| S-06 | NAV receives valid traffic data | NAV consumes AIS targets per the compatibility matrix without corruption or duplication | `BLOCKED` | Documented integration test with NAV versions (`P-10`, D5) |
| S-07 | Antenna fault detected where supported | Fault is surfaced with guidance, and the empty state is not presented as "no traffic" | `OPEN` | Capability itself `OPEN`; detection design plus test (`H-08`) |
| S-08 | User misunderstands receive-only | Disclaimer and onboarding make clear that traffic may be missing and that the unit does not transmit | `OPEN` | Usability and comprehension test (`X-06`); copy D8 delivered |
| S-09 | Product needs service | Customer finds a documented warranty terms document, support contact and RMA route | `OPEN` | Support/RMA process and seller legal identity (`X-02`, milestone 28) |

Acceptance verdict: **0 of 9 scenarios passed; overall `NOT_EXECUTED` / `BLOCKED`.** Scenario count is
therefore honest evidence of definition completeness, not of product readiness.

## 8. Traceability annex — MC-02 blockers and evidence required before sale

| Blocker | What it prevents for MAREA AIS | Evidence required before sale |
| --- | --- | --- |
| `H-08` | Receiver RF/EMC/radio conformity and antenna/splitter considerations; no receiver hardware or certification evidence exists | Selected receiver module with existing CE/RED evidence, or an own conformity programme; system-level RF and EMC reports; antenna/splitter specification |
| `H-05` | No physical build, measurement, environmental or EMC evidence exists | Prototype BOM with part numbers, bench measurements, thermal/ingress/vibration tests, serial traceability |
| `H-06` | CE/EMC/RED/GPSR/RoHS/WEEE/CRA obligations not started (LVD is not applicable on the recorded low-voltage architecture); no EU declaration of conformity or test report | Applicability review, harmonised standards route, accredited laboratory results, technical file, EU DoC, WEEE registration, CRA vulnerability-handling process |
| `S-01` | GPL-3.0 AIS-catcher distribution strategy unresolved (DEC-04) | Written decision: GPL-compliant source offer and notices with pinned version/hash, replacement decoder, or documented user-installed separation |
| `D-09` | AIS-derived retention and redistribution not established (`MD-24`) | Retention limits, no-redistribution policy, target age/source display, legal review recorded |
| `P-03` | Receive pipeline external; no bundled binary, no receiver hardware, no RF certification | Decoder strategy executed, receiver selected, RF evidence produced |
| `P-10` | Engineering reuse inventory-level; tests not reproducible | Reproducible test environment and per-module test report |
| `H-04` | NMEA 2000 not implemented, no licence or certification; no claim permitted | No evidence closes this for AIS: keep NMEA 2000 out of scope and claim nothing |
| `X-01` | MAREA trademark clearance not performed; nothing may be published as registered | EUIPO/OEPM clearance before any brand publication |
| `X-05` | No BOM, supplier quote, conformity cost or channel terms | Real RFQs, conformity quotations, channel terms and bottom-up costing |
| `X-06` | No customer interviews or installer terms; willingness to pay unvalidated | Structured customer and installer discovery with recorded findings |

**Minimum evidence set before any MAREA AIS sale is authorised:** built and tested unit; RF/EMC and RED
conformity with EU DoC; GPSR technical documentation and risk assessment; RoHS/WEEE/CRA position;
GPL-3.0 distribution decision implemented; agreed data-retention policy; published compatibility matrix
with tested consumers; installer procedure and commissioning record; approved price list with BOM-based
costing; warranty terms with the seller's legal identity; and an independent quality gate verdict.

## 9. Mandatory disclaimers — verbatim ES/EN

Use verbatim, localised and never paraphrased, on every AIS surface (product page, packaging, manual,
installer material, quotations, presentations). Where a surface also shows navigation, position, charts or
weather, the navigation/instruments disclaimer is carried as well.

**AIS (receive-only):**

- ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.»
- EN: "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder."

**Navigation / instruments:**

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

**Brand attribution (footer):**

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

Note: the AIS disclaimer states what the product is not; it does not weaken the other limitations in §6.
The claims register under `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §8 is empty and remains the gate for any
Class C claim derived from this dossier.

## 10. Internal brand assets available for design input (not publication)

- `docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg` — MR-DIA-001, illustrative receive-only
  chain (antenna and splitter, VHF receiver, decoder, HUB/NAV, AIS analysis, presentation) with an explicit
  "no transmit path" callout and an "illustrative, not certified, engineering review pending" label. It is
  an internal design input, not a published MAREA identity and not evidence of the product.
- `docs/marea/brand/ICONOGRAPHY-SYSTEM.md` §2.5 — `ais-receive-only`, `ais-target`, `ais-target-selected`,
  `ais-target-lost` (dashed outline plus state label for lost targets; selection never by colour alone; no
  transmit or transponder icon exists in the set).
- Any photography, CGI or mock-up of MAREA AIS hardware is absent and remains `BLOCKED_ON_IMAGE_GENERATION`
  until authorised; no substitute may be presented as the product.

## 11. Reconciliation items for NAV and HUB owners (and Lead integration)

1. **CPA/TCPA ownership.** Deciding whether proximity computation lives in MAREA NAV or in the receiver
   layer is a joint decision; this dossier only defines the required inputs and the unavailable state.
2. **Own-vessel data contract.** NAV or HUB must supply own position, COG and SOG to the AIS layer (or
   compute proximity themselves); the interface, units, rates and stale behaviour must be in D5.
3. **Stale/lost vocabulary.** NAV, HUB and AIS must use the same target-age and target-state terms; three
   products with three vocabularies would contradict each other in copy and in the compatibility matrix.
4. **Compatibility matrix (D5).** HUB owns it; this dossier defines capabilities only. No document may
   claim per-device compatibility before D5 records tested results.
5. **NMEA 2000 non-claim.** NAV, HUB and AIS documents must all avoid the claim consistently (`H-04`).
6. **Local output transport.** The `!AIVDM` transport(s) and Signal K path must be frozen with HUB, not
   invented separately by each dossier.
7. **Alert surfacing.** Decide which product raises traffic alerts and how they are presented; the same
   alert must not be claimed twice with different semantics.
8. **Data retention.** AIS-derived history is not cleared for retention or redistribution (`D-09`);
   NAV track-history and any FLEET/WATCH aggregation must not assume otherwise.
9. **Edition and bundle economics.** Edition price hypotheses (EUR 249 / EUR 399) must reconcile with D4
   editions, D6 pricing and the MC-08 MAREA CRUISE bundle (hypothesis EUR 1,399).
10. **Copy (D8).** `ais.es.md` and `ais.en.md` must repeat the §4 exclusions and the §9 disclaimers exactly;
    this dossier keeps F20 as a reference, not a duplicate.
11. **Validator (D11).** The machine-readable contract must enforce 24 keys, the five-line block, absence of
    placeholder text, receive-only language and the readiness values in §1.2.
12. **Assets.** Any AIS visual must stay illustrative and labelled until hardware photography or engineering
    drawings exist; no render may be presented as a real product.

**Resolution recorded 2026-10-30 (D5 `A-05`/`C-05`, D4 `N12`/`N13`; supersedes items 1 and 7 above).**
CPA/TCPA computation lives in the consuming application — MAREA NAV Pro — not in the receiver: MAREA AIS
supplies received target data with source and age and never computes CPA/TCPA. Traffic alert rules are a
MAREA NAV Pro capability; MAREA AIS raises no traffic alerts in either edition.

## 12. Document control

| Field | Value |
| --- | --- |
| Revision | 1 (first issue at MC-05) |
| Author role | MAREA AIS Product Director (product function) |
| Review state | Pending independent product review (D13) and Lead integration (D12) |
| Change rule | Any change to editions, included items, prices, readiness values or disclaimers requires a new revision and re-check against `docs/marea/products/README.md` |
| Known limits | No hardware, no RF/EMC evidence, no integration test, no customer research, no cleared brand or GPL strategy; F20 copy files not yet delivered |
