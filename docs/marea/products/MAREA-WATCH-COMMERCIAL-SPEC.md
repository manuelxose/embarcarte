# MAREA WATCH — complete final-product commercial specification (MC-06 / D3-WATCH)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D3-WATCH |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Product | MAREA WATCH (`WATCH`); editions MAREA WATCH Core (`WATCH-CORE`) and MAREA WATCH Plus (`WATCH-PLUS`) |
| Owner function | Product Management — WATCH Product Director (author function for this dossier) |
| Status | `INTERNAL` / `COMPLETE_TARGET_SPECIFICATION` / `NOT_FOR_SALE` / `NOT_PUBLISHED` |
| Lifecycle state | `DEFINED` (binding vocabulary, `docs/marea/products/README.md` §3) |
| Branch | `feature/marea-mc06-pilot-sense-watch-products` |
| Date | 2026-10-30 |
| Contract authority | `docs/marea/products/README.md` §1–§23, especially §6 (24 fields), §15 (canonical evidence states), §16 (claim rules), §17 (price hypotheses), §19 (cross-product authority), §20 (notification state model) |
| Companion contract | `docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` (D10) — alert lifecycle, delivery evidence, privacy and data protection |
| Customer copy | `docs/marea/products/copy/watch.es.md` and `docs/marea/products/copy/watch.en.md` (D8; both owned by this deliverable in MC-06) |
| Publication / sale | None. No price is approved, no SKU is orderable, no page may be published while the brand, connectivity and conformity gates remain open |

This dossier defines the **finished commercial product** MAREA WATCH, not a telemetry demo, not a cloud
architecture proposal and not an engineering audit. It fixes the customer experience, the four commercial
layers, the edition boundary, the evidence labels and the gates that must close before anything may be sold.
A complete specification is not readiness, and readiness is not availability.

MAREA WATCH is a **shore/remote monitoring and notification service with an onboard monitoring device**. It is
not a distress service, not a theft-prevention guarantee, not a certified alarm system and not a remote helm
control. Its remote alerts depend on electrical power, network coverage and delivery by the notification
provider. Provider acceptance is not delivery, and delivery is never proof that a human saw an alert.

## 0. Contents

1. Status block — complete specification, zero commercial readiness
2. Canonical field block (convention)
3. The 24 canonical fields (F01–F24)
4. F04 capability-domain register — 40 mandatory final domains and the four commercial layers
5. The four commercial layers, separated
6. Edition architecture — MAREA WATCH Core and MAREA WATCH Plus
7. Local behaviour under degraded conditions (outage, power, sensor, payment, replacement, lockout)
8. Notification lifecycle — canonical state model and distinct timestamps
9. Acceptance scenarios — WATCH-AC-01 to WATCH-AC-20
10. Traceability annex — MC-02 blockers and the evidence required before sale
11. Ecosystem, cross-sells and cross-product authority
12. Required disclaimers — verbatim, ES and EN
13. Non-assertions and document status

---

## 1. Status block — completely specified, not for sale

### 1.1 Product-level status (README §1 mapping)

| Dimension | Value |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` — the MC-02 audit is the only engineering evidence; there is no WATCH telemetry service, no device identity, no notification pipeline, no subscription service and no hardware |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BRAND_CLEARANCE` | `NOT_GRANTED` — MAREA is a proposed brand; no trademark clearance exists (X-01) |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` — no reuse right from the source project and no WATCH-specific licence |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |

### 1.2 Per-dimension readiness (README §4, never collapsed into one flag)

| Dimension | WATCH value at MC-06 | Evidence and scope |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | This dossier, all 24 fields, 40 capability domains, 20 acceptance scenarios and the companion alert-delivery contract |
| `engineering` | `NOT_VERIFIED` | `WATCH_INGESTION = NOT_VERIFIED` (no production telemetry ingestion); `WATCH_NOTIFICATION_PIPELINE`, `WATCH_DEVICE_IDENTITY`, `WATCH_SUBSCRIPTION_SERVICE` and `WATCH_CONNECTIVITY_CONTRACT` are all `NOT_FOUND` (README §15, P-06). The audited source contains only LAN-local diagnostics and no remote-monitoring code (`OPEN-MARINE-CAPABILITY-INVENTORY.md` §5.1 C-08 `NOT_FOUND`) |
| `licensing` | `NOT_CLEARED` | No source-IP clearance (L-01–L-03 remain open); no telemetry, push-provider, mapping-provider or connectivity licence or agreement exists |
| `hardware` | `NOT_SELECTED` | No monitoring device, no BOM, no enclosure, no backup battery, no bench or environmental test (H-05, H-11) |
| `dataRights` | `NOT_GRANTED` | Own-vessel operational data is the customer's own data, but the shore-service processing, map basemap, push-provider and AIS-derived data rights are not granted; AIS-derived redistribution remains `LEGAL_REVIEW_REQUIRED` (D-09) |
| `compliance` | `NOT_STARTED` | No EU declaration of conformity, no EMC/RED/GPSR/RoHS/WEEE/CRA evidence (H-06); CRA vulnerability handling and secure update absent (H-13) |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | The WATCH figures of README §17 are internal hypotheses only; the subscription inclusions remain `OPEN` |
| `brandPublication` | `NOT_GRANTED` | X-01; no customer copy in this milestone is publishable |
| `availability` | `NOT_FOR_SALE` | No SKU, no stock, no order flow, no fulfilment, no connectivity contract, no support operation |

### 1.3 Evidence classes used in this dossier (README §5)

| Class | Meaning here |
| --- | --- |
| `VERIFIED_REPO` | Verifiable in this repository; a path is cited |
| `VERIFIED_EXTERNAL` | Verifiable at a cited public source with a check date (none is used for a WATCH capability) |
| `ASSUMPTION` | An explicit planning assumption, not evidence |
| `HYPOTHESIS` | A commercial or price assumption awaiting approval |
| `OPEN` | Fact not yet established; the intended customer experience is still specified |
| `BLOCKED` | An external condition (licence, certificate, quote, measurement, agreement) prevents closure |

`OPEN` and `BLOCKED` are legitimate values. The prohibited placeholder token is not used in this dossier, and
no field is filled with an unlabelled assertion.

### 1.4 Canonical WATCH evidence states (README §15, used unchanged)

| State | Value | What it means for every field below |
| --- | --- | --- |
| `WATCH_INGESTION` | `NOT_VERIFIED` | P-06: no production telemetry ingestion exists; no device has ever uploaded a monitored value to a shore service |
| `WATCH_NOTIFICATION_PIPELINE` | `NOT_FOUND` | P-06: no alert delivery pipeline, retry system, provider handoff, delivery evidence or acknowledgement exists |
| `WATCH_DEVICE_IDENTITY` | `NOT_FOUND` | P-06, X-07: no provisioning, ownership proof, pairing, revocation or transfer system exists |
| `WATCH_SUBSCRIPTION_SERVICE` | `NOT_FOUND` | P-06: no billing, entitlement, renewal, grace-period or cancellation service exists |
| `WATCH_CONNECTIVITY_CONTRACT` | `NOT_FOUND` | H-12: no SIM, data plan, roaming or connectivity terms exist with any operator; no telecom agreement of any kind is claimed or assumed |

These strings are canonical and may not be upgraded. A written design, a prototype stub or a plan is never
evidence for any of the five states.

### 1.5 The one-message summary

MAREA WATCH is completely specified and not for sale. There is no monitoring device, no telemetry service,
no notification pipeline, no device identity system, no subscription service and no connectivity contract.
It is not certified, not tested on a vessel, not installable through any installer network that does not yet
exist and not priced. Those are truthful states, not defects of this document.

---

## 2. Canonical field block (convention)

Every field F01–F24 uses the binding five-line block of `docs/marea/products/README.md` §6. `Definition`
describes the finished commercial experience; `Evidence` labels it; `Owner` names a function;
`Blockers / dependencies` cites MC-02 ids; `Commercial readiness` states one readiness dimension and value.

---

## 3. The 24 canonical fields

#### F01 — Identity
- **Definition.** MAREA WATCH is the shore/remote monitoring and notification product of the MAREA family: an onboard monitoring device with a declared set of supported sensor inputs, a secure device identity and an outbound-only connectivity design, sold together with a recurring monitoring subscription that delivers remote alerts to authorised people when the vessel is unattended. WATCH monitors position, battery/DC state with shore-power context, bilge and temperature context where the corresponding compatible input exists, evaluates the essential alert set and the owner-configured rules of the edition, and reports connectivity and data-freshness status honestly; it never presents a stale value as current and never claims that an alert was seen when it was not. Category: hardware plus recurring service (`HARDWARE_SERVICE`). Family: MAREA. Code: `WATCH`. Editions: MAREA WATCH Core (`WATCH-CORE`) and MAREA WATCH Plus (`WATCH-PLUS`). Positioning: shore-side awareness for an unattended vessel — distinct from MAREA HUB, which is the onboard local data gateway, and distinct from MAREA FLEET, which is a multi-vessel professional platform. WATCH is not a distress service, not a theft-prevention guarantee, not a certified alarm and not a remote helm control.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06; `VERIFIED_REPO docs/marea/products/README.md` §2, §12, §15, §16, §19, §20; `VERIFIED_REPO docs/marea/brand/brand-identity.contract.json` products and namingRules; `OPEN` for the final hardware implementation (`WATCH_DEVICE_IDENTITY = NOT_FOUND`).
- **Owner.** Product management (WATCH).
- **Blockers / dependencies.** H-11, H-12, P-06, X-07.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`.

#### F02 — Customer segments
- **Definition.** Primary segment: owners of recreational sailing and motor vessels, roughly 8–15 m, who leave the boat unattended for days or weeks in a marina, mooring or yard in Galicia and northern Portugal and want to know from ashore when something needs attention. Secondary segment: charter and small fleet operators, sailing schools and boat-maintenance companies that watch several vessels and need a shared, auditable view with role restrictions. Tertiary segment: second-hand buyers and owners who inherit an old alarm or tracker and want one accountable service instead of several disconnected ones. Buying contexts: start of the unattended season, winter lay-up, a refit that exposes battery or bilge risk, a marina berth where the owner lives elsewhere, and the sale or purchase of a vessel. Explicitly not a segment: anyone seeking a certified distress or security service, insurance-mandated monitoring, remote control of the vessel, or commercial shipping.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06 (buyer/problem); `ASSUMPTION` segment priority and buying-context ranking derived from the portfolio and `MAREA-BRAND-STRATEGY.md` WATCH row; `OPEN` — no primary customer interviews or validated willingness to pay exist (X-06); MC-03A/MC-10 will evidence it.
- **Owner.** Product marketing and commercial development.
- **Blockers / dependencies.** X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F03 — Customer problems
- **Definition.** The problems WATCH is designed to remove: (1) the boat is unattended and the owner has no timely signal when battery voltage collapses, water enters the bilge or the vessel moves outside its berth; (2) existing alarm or tracker products report a value but not whether it is current, so a stale reading is mistaken for a safe one; (3) when the marina Wi-Fi or the mobile network fails, the owner cannot tell "all normal" from "no data"; (4) sharing access with family, crew, a technician or the marina is informal and cannot be revoked cleanly; (5) history is lost precisely when it is needed to explain an intermittent fault; (6) nobody can say who saw an alert and when, because "sent" and "seen" are treated as the same thing. Existing alternatives: a local alarm with a siren, a consumer tracker with a subscription, a marina neighbour checking the boat, or a marina service that reports by phone. WATCH's answer is conditional awareness with explicit data-freshness, last-known-good and delivery states, plus a clear statement of what is and is not monitored.
- **Evidence.** `ASSUMPTION` on the problem framing; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06 (final offer and quality gates: repeated delivery tests, delay metrics, connectivity fallbacks) and `docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §11 W-1–W-5; `OPEN` for interview evidence (X-06); no competitor test or comparison exists.
- **Owner.** Product management.
- **Blockers / dependencies.** X-06, P-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F04 — Complete end-state functionality
- **Definition.** At end state a customer buys a monitoring device, has it installed or installs it in a documented low-risk configuration, registers the vessel and proves ownership of the device, links the vessel to an account and invites the people who may see it. The finished product then provides forty capability domains, all enumerated in §4: device purchase and installation; vessel registration; secure provisioning and device identity; ownership proof and transfer; account linking; supported sensor inputs; position, battery and bilge monitoring; geofence; user rules; history; connectivity status; last-known-good value; data freshness; local buffering and store-and-forward; temporary connectivity loss and recovery; notification creation, provider handoff, provider acceptance, delivery evidence, acknowledgement and escalation; multi-user sharing and role restrictions; dashboard; subscription renewal; data plan administration; SIM and roaming administration; retention and deletion; cancellation and account deletion; hardware replacement; OTA updates; support and diagnostics; privacy controls; audit records; device loss and revocation; and end-of-life with ownership transfer. The four commercial layers are separated in §5 so that no buyer mistakes a data-plan assumption or a software capability for a hardware promise. WATCH issues notifications and displays state; it never commands the vessel, never steers, never acts as a distress service and never guarantees that an alert was delivered or seen.
- **Evidence.** `OPEN` — the intended end-state experience; per-domain evidence in §4; the five canonical states in §1.4; `VERIFIED_REPO docs/marea/products/README.md` §6 F04 and §20; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06. The MC-13-WATCH gate will evidence each domain.
- **Owner.** Product management (WATCH) with engineering.
- **Blockers / dependencies.** H-11, H-12, P-06, X-07.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F05 — Differentiation
- **Definition.** WATCH is intended to be relevant because it combines five things that a bare tracker or a local alarm does not: (1) a declared monitored-input list, so the owner knows exactly what is and is not watched; (2) explicit freshness, last-known-good and connectivity-gap reporting, so "no data" is never shown as "all normal"; (3) a notification lifecycle that distinguishes provider acceptance from delivery and delivery from human acknowledgement, and records who acknowledged and when; (4) a privacy model in which vessel position is not public by default and access is granted per role and revocable; (5) an owned device with a documented ownership transfer, replacement, revocation and end-of-life path, plus an honest statement of connectivity dependence. It is not differentiated by claiming faster delivery, longer range, superior reliability, theft prevention or rescue capability, and no such claim may be made.
- **Evidence.** `ASSUMPTION` — differentiation hypothesis; `VERIFIED_REPO docs/marea/products/README.md` §16 rule 5 and §20; `VERIFIED_REPO docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §11 W-1–W-8; `OPEN` — no product, no delivery measurement and no customer evidence exist (P-06, X-06).
- **Owner.** Product management and commercial strategy.
- **Blockers / dependencies.** P-06, X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F06 — Editions
- **Definition.** Exactly two editions, no third tier. MAREA WATCH Core (`WATCH-CORE`, verdict `DEFINED`) is the complete essential monitoring product: one vessel, the declared essential inputs (position, battery/DC state with shore-power context, bilge, temperature context and connectivity status), geofence and the essential alert set at the published base limits, a defined history window, an owner account with family/crew users and time-limited technician/installer access, the dashboard, notifications, escalation, and the full device-ownership lifecycle. MAREA WATCH Plus (`WATCH-PLUS`, verdict `CONDITIONAL`) adds only commercially defensible differences — additional monitored inputs beyond the Core envelope, a configurable rule set beyond the essential alert set (higher rule complexity), longer history retention, a larger named-user allowance and professional/organisation sharing with marina-service and professional-fleet roles — each justified by a measurable customer benefit and each conditional until validated and costed. The exact Core/Plus boundaries, all numeric limits and the Plus price are `OPEN`; the full architecture is in §6. Safety-relevant and local functions are identical in both editions and are never edition-gated.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §14, §18 (D-008 WATCH structure: Core `DEFINED`, Plus `CONDITIONAL`); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06 (editions); `HYPOTHESIS` edition value split; `OPEN` — no cost or validation evidence exists (X-05, X-06).
- **Owner.** Product management (WATCH) with commercial strategy.
- **Blockers / dependencies.** H-12, P-06, X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F07 — Included items
- **Definition.** Intended included content per edition: the MAREA WATCH monitoring device with its mounting and power items as specified for that SKU (exact item list `OPEN` until the BOM is frozen); the internal backup energy source if the final design includes one, whose duration is `OPEN` and must be measured; a declared sensor-input set with the connectors or adapters required by the documented installation; a device identity and the provisioning material required to bind it; the account, vessel registration and ownership-proof setup; the monitoring subscription entitlement of the purchased edition including the notification channels and the included user count; setup and safety documentation in Spanish and English; the support entitlement; and professional installation only when purchased or required by the configuration. Intended exclusions, stated before purchase: the vessel's own sensors where not supplied, shore power installation beyond the documented low-risk steps, unrelated third-party electronics, mobile-network coverage beyond the contracted service, any external alarm siren or security service, insurance or emergency response, and any capability not listed in the published monitored-input and compatibility documentation. No BOM, no connectivity terms and no subscription inclusion table exist, so contents beyond the device and documentation are `OPEN`.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06 (included/excluded); `OPEN` — SKU content, sensor set, backup-energy duration and subscription inclusions (H-11, H-12, X-05); `BLOCKED` — no BOM, no connectivity contract.
- **Owner.** Product management with hardware engineering and procurement.
- **Blockers / dependencies.** H-11, H-12, X-05.
- **Commercial readiness.** `hardware = NOT_SELECTED`.

#### F08 — Optional accessories
- **Definition.** Intended optional items, always described by function and never given an invented MAREA product name: additional compatible MAREA SENSE sensor modules where the published compatibility documentation confirms the input (for example battery, bilge or temperature measurement); the cabling, connectors and mounting items required by a specific installation; an external antenna or extension where the installation and coverage assessment require one; a backup-energy accessory where the final design supports one; an additional power-supply item for the documented installation; and service items such as professional installation, extended support or a later edition upgrade. Every optional item is compatible only within the tested matrix; SENSE has no connectivity of its own and remote delivery always requires WATCH with an active connectivity service. No accessory name is approved, no accessory price exists and no optional item may be presented as included.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` (accessories are not families or editions); `VERIFIED_REPO docs/marea/products/README.md` §16 rule 6 (SENSE alone does not deliver remote alerts); `OPEN` — exact accessory list; `BLOCKED` — H-11, H-12, X-05.
- **Owner.** Product management with procurement.
- **Blockers / dependencies.** H-11, H-12, X-05.
- **Commercial readiness.** `hardware = NOT_SELECTED`.

#### F09 — Integration
- **Definition.** WATCH integration is bounded and evidence-based. The device consumes its own declared sensor inputs and, where a documented compatible source exists, measured values from MAREA SENSE modules; it uplinks a bounded, consented telemetry subset (position, monitored-input values and states, device and connectivity health, alert flags) over an outbound-only connection to the WATCH service. It does not accept inbound connections, does not expose an internet-reachable control surface, does not route the vessel's local data to shore beyond that subset, does not display AIS traffic in the defined product, and does not integrate with MAREA PILOT for any command. MAREA HUB is a distinct onboard gateway and is not included or required; WATCH does not republish HUB data to shore without a separately consented service. MAREA FLEET may consume authorised read-only telemetry under a future contract only. No protocol compatibility is claimed: each sensor input is supported only after a recorded test in its documented configuration and direction.
- **Evidence.** `VERIFIED_REPO docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §6 C-16, §11 W-1–W-8, §5.2 prohibited paths X-1/X-3/X-6/X-7; `VERIFIED_REPO docs/marea/products/README.md` §19 cross-product authority; `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §5.1 C-08 (no remote-monitoring code) and C-13/C-14 (only executed sensor parsing/fusion evidence); `OPEN` — sensor compatibility matrix not built (P-06); `BLOCKED` — H-12.
- **Owner.** Integration owner (WATCH Product Director) with engineering.
- **Blockers / dependencies.** H-12, P-06, X-07.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F10 — Professional installation
- **Definition.** Professional installation is the intended route for every configuration outside a documented low-risk self-install set, and it is always offered. The finished service runs from a pre-sale vessel and coverage questionnaire through a documented sensor and power assessment, a written installation proposal naming included and excluded items, scheduled installation, provisioning and pairing, function checks, owner handover and training, and a permanent installation and device record. The owner leaves knowing exactly which inputs are monitored, which are not, what happens when power or connectivity is lost, and how to revoke a device. Self-install is permitted only where the questionnaire deterministically confirms a documented configuration requiring no vessel electrical modification beyond the published steps; otherwise the result is a specialist assessment or an installer proposal, never an asserted compatibility. No installation duration, no installation price and no technician certification scheme exist; all three are `OPEN`/`BLOCKED`.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06 quality gates and buying path; `ASSUMPTION` service design; `OPEN` — no installer network, no assessment flow and no measured installation exist (X-05, X-06).
- **Owner.** Service operations with the installer network.
- **Blockers / dependencies.** H-11, H-12, X-05, X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F11 — Onboarding
- **Definition.** The first-use experience is a guided, verified setup, not a manual and a hope. Delivery sequence: the monitored-input and coverage assessment is offered before purchase; on power-up the device presents a provisioning path that establishes its identity and binds it to one vessel and one owner account; the owner registers the vessel, proves ownership, confirms the people who may see it and their roles, names each monitored input and its normal range, sets the first rule and geofence, tests a notification end to end, and receives a record of what is monitored and what is not. For professionally installed configurations the installer completes the sequence and hands over with training. Education material is versioned with the product, provided in Spanish and English, and states what the product does not do, what happens during an outage and how to revoke access. The setup screens, manual and training material are `OPEN`; no UI exists and no product screen has been usability-tested.
- **Evidence.** `OPEN` — onboarding UX and manuals not built; `ASSUMPTION` sequence; `VERIFIED_REPO docs/marea/products/README.md` §6 F11 requirement and §16 rule 5; `VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md` §9 (allowed CTA per readiness).
- **Owner.** UX, content and localisation with support engineering.
- **Blockers / dependencies.** P-06, X-07.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F12 — Licensing and subscriptions
- **Definition.** MAREA WATCH is intended to be sold as a **perpetual hardware purchase plus a recurring monitoring subscription per vessel**. The hardware purchase gives the owner the device and the licence to use its on-device software inside the published support and update window. The subscription is the service that makes remote monitoring work: outbound connectivity through the contracted data arrangement, the shore service that stores the telemetry subset, rule evaluation in the service, notification delivery through the chosen providers, the included history window, the included user seats, escalation and support for the service. The subscription does not grant ownership of any third-party data, and no connectivity, push or mapping provider right is transferred beyond its own terms. Renewal, grace period, payment-failure handling, suspension of remote notifications, cancellation, data export and deletion rules are defined in the companion contract; what the subscription includes (connectivity cap, device count, user count, retention, push, VAT, roaming, installation) is `OPEN`. **Subscription isolation is a design requirement:** no entitlement state, payment failure or subscription expiry may disable local sensing, local alarms, local buffering or any safety-relevant independent function of the device; degradation is remote-service and presentation only. This requirement is not yet tested.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 rule 7, §17, §18; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06 (hipótesis and disclosure duty); `VERIFIED_REPO docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §3 R-A3, §11 W-4; `OPEN`/`BLOCKED` — no subscription service, no terms of service and no connectivity contract (`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`; H-12, X-02).
- **Owner.** Commercial strategy with legal.
- **Blockers / dependencies.** H-12, P-06, X-02, X-05.
- **Commercial readiness.** `licensing = NOT_CLEARED`.

#### F13 — Retail and partner pricing
- **Definition.** Internal price hypotheses only, recorded for planning and published nowhere: MAREA WATCH Core hardware EUR 299, a hardware-purchase hypothesis from which connectivity and any SIM/data cost are excluded; and the MAREA WATCH Core monitoring subscription `from EUR 9.90 / month`, a subscription hypothesis whose inclusions are `OPEN`. Both are `HYPOTHESIS_UNAPPROVED`, VAT-inclusive consumer retail where stated, and neither is a "from" offer, a launch offer, a discount, a reservation or an orderable amount. No price exists for MAREA WATCH Plus, for any data plan, for installation labour, for an extended warranty, for a roaming package, for hardware replacement or for any accessory; those are `OPEN` and require costed evidence. The unresolved commercial terms that must be decided before any subscription is sellable are listed in §6.4. No partner, distributor, installer or volume price exists; the B2B structure is `OPEN` and belongs to the pricing and channel model deliverable.
- **Evidence.** `HYPOTHESIS` — exactly the WATCH figures allowed by `docs/marea/products/README.md` §17; `BLOCKED` — X-05 (no BOM, no connectivity quote, no provider quotes), H-12; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6.
- **Owner.** Commercial strategy and pricing with finance.
- **Blockers / dependencies.** H-12, X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F14 — Direct and ongoing costs
- **Definition.** A costing framework with named inputs only, because no figure exists: device BOM, assembly, factory test, enclosure, labelling and serialisation; conformity programme (EMC/RED/GPSR/RoHS/WEEE/CRA technical file, accredited laboratory, notified-body work where required); freight, packaging and fulfilment; payment fees; warranty accrual; returns and replacement allowance; technical support and installer support; firmware and service maintenance including security and vulnerability handling; the recurring shore service (hosting, telemetry storage, rule evaluation, notification provider fees, mapping or basemap fees where applicable); the connectivity data cost per device per month including roaming and any SMS fallback; customer acquisition; churn; and provider and connectivity contract minimum commitments. Contribution margin is deliberately not computed: presenting one would invent BOM, connectivity, provider and support data. No supplier quote, connectivity quote or push-provider price exists.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` pricing and channel rules and §06 disclosure duty; `BLOCKED` — H-11, H-12, H-13, X-05; `ASSUMPTION` on the cost categories.
- **Owner.** Finance and procurement with product management.
- **Blockers / dependencies.** H-11, H-12, H-13, X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F15 — Channel economics
- **Definition.** Intended channel model: direct sale by EMBARCARTE plus authorised professional installers, refit yards and marinas, starting in Galicia and northern Portugal. Responsibility split: EMBARCARTE owns the product definition, the monitored-input and compatibility authority, the subscription service, the connectivity relationship, warranty and support policy; the installer owns the vessel and coverage assessment, mechanical and electrical work, provisioning, function checks, handover and first-line support, and is accountable for workmanship. The market is entered through an assisted coverage and monitored-input assessment that ends in a quotation request for professional installation, not in an automatically asserted compatible order. Installer margin, subscription revenue share, activation fee and volume terms are `OPEN`; no commission or margin percentage exists. Marina-service and professional-fleet sharing is a product role, not a channel agreement, and must not be described as a partnership.
- **Evidence.** `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` institutional routes and installer program; `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §11; `ASSUMPTION` responsibility split; `BLOCKED` — X-05, X-06, H-12.
- **Owner.** Commercial development with service operations.
- **Blockers / dependencies.** H-12, X-05, X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F16 — Competitor comparison
- **Definition.** No verified like-for-like comparator of MAREA WATCH exists, and no competitor has been tested against it. The pricing and channel model records two public category anchors retrieved on 2026-10-30: a Garmin OnDeck Hub page that presents a hardware hub plus a required subscription and cellular service but did not publish a price, and a Siren Marine Siren 3 main-device page that published USD 299.99 for the device while its subscription price was not retrieved. They establish that "device price plus monthly subscription" is the established category shape and that WATCH's structure is consistent with it; they are **not** equivalents (the Siren 3 includes relay control, NMEA 2000 and a sensor ecosystem that MAREA WATCH does not claim) and they are **not** a benchmark, a cost input or a price-parity claim. No subscription price, recurring-cost comparison, delivery comparison or performance comparison exists for WATCH. Verification of the category, like-for-like scope and willingness to pay is `OPEN` and belongs to MC-03A/MC-09 field research.
- **Evidence.** `VERIFIED_EXTERNAL` — `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §5.2 and `docs/marea/MARKET-BENCHMARKS.md` WATCH row (check date 2026-10-30; the market benchmark records that no sufficiently equivalent verified end-to-end price was gathered, and the pricing document's anchors are device pages, not subscription benchmarks); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class P; `OPEN` — no comparison test, subscription evidence or customer research exists (X-06).
- **Owner.** Commercial strategy.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F17 — Sales arguments
- **Definition.** Honest buyer arguments and the objection handling that goes with them. Arguments: the monitored inputs are declared before purchase, so the owner knows what is watched and what is not; the product shows the age and last-known-good value of every monitored reading instead of a comfortable green light; it tells the owner when the vessel lost contact and how long the gap was; it records who acknowledged an alert and when, because provider acceptance and delivery are not the same thing; access is granted per role and can be revoked; and the device has a documented replacement, transfer, revocation and end-of-life path. Objections and answers: "Is this a distress service?" — no, it is conditional awareness and it is not certified for distress or safety-of-life; "Does it stop theft?" — no, it is not a theft-prevention guarantee and cannot prevent anything; "Does it always work?" — no, alerts depend on power, network coverage and notification-provider delivery, and immediate receipt is not guaranteed; "Can it steer or control the boat?" — no, no remote helm or steering command of any kind exists; "What happens when the network fails?" — the device buffers locally and replays when connectivity returns, the app shows the gap, and local functions keep working; "What does the subscription include?" — the inclusions are not yet decided and will be published with the approved offer; "How much?" — only unapproved internal price hypotheses exist and nothing is on sale. No comparative claim against a named competitor is permitted.
- **Evidence.** `ASSUMPTION` — argument ranking; `VERIFIED_REPO docs/marea/products/README.md` §16 rules 5–7 and §20; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§4; `OPEN` — no sales test, no customer evidence and no approved claims register entry (X-06, §8 claims register empty).
- **Owner.** Product marketing with sales enablement.
- **Blockers / dependencies.** P-06, X-01, X-06.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F18 — FAQ
- **Definition.** The pre-sale and post-sale questions this product must answer truthfully. What is monitored? Exactly the inputs listed in the published monitored-input documentation for the purchased configuration; nothing else is claimed. Does it guarantee that an alert is seen? No: provider acceptance is not delivery, delivery is not human acknowledgement, and immediate receipt is not guaranteed. What happens if the marina network fails? The device buffers locally with its own timestamps and replays when connectivity returns; the app shows connectivity loss, the gap and the last-known-good value with its age. What happens if the power fails? The device reports the power loss if its backup energy allows it; the backup duration will be published only once measured, and no duration is promised today. Does it work anywhere? No: there is no unlimited or worldwide connectivity claim; coverage and data terms depend on the contracted connectivity service, which does not exist yet. Can it stop a theft or a sinking? No: it reports conditions where its inputs work; it does not prevent anything, is not a security system and is not a certified distress service. Can it steer or control the vessel? No, and no such feature is planned. Is it certified? No. Who can see my vessel? Only the people and roles the owner authorises; position is not public by default and access can be revoked. What does the subscription include? The inclusions are `OPEN` and will be published before any sale. Can I install it myself? Only in a documented low-risk configuration; otherwise professional installation or a specialist assessment. What happens when I sell the boat? A documented ownership transfer rebinds the device and revokes the previous account; what happens to the subscription is stated in the terms. How long is history kept? The retention window is `OPEN` and will be published; the customer's own data is exportable.
- **Evidence.** Derived from this dossier and `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`; `OPEN` for the answers that depend on unbuilt capability and unresolved terms; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4 and §6.
- **Owner.** Product management with content and support.
- **Blockers / dependencies.** H-12, P-06, X-02, X-05.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F19 — Warranty and support
- **Definition.** Intended after-sales position: the statutory consumer guarantee under Spanish and EU law, plus a contractual warranty whose duration and conditions are not yet defined and must be written before sale. Support covers the device, provisioning, monitored-input interpretation, notification-channel diagnosis, connectivity questions within the contracted service, update assistance and the fault-return or replacement process. A customer can export a diagnostic record for support without granting remote control of the vessel. Ownership transfer updates the registered owner but does not extend or reset the hardware warranty. Response time, 24/7 service, spare-device policy, out-of-warranty repair terms and the treatment of a lost or destroyed device are `OPEN`. The seller's legal identity is required for any warranty text and is currently absent. No support statement may imply that support monitors the vessel or guarantees an alert.
- **Evidence.** `OPEN` — warranty terms, support levels, RMA and spares policy; `BLOCKED` — X-02 (legal identity), H-13 (secure update lifecycle) and X-05; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C.
- **Owner.** Customer support with legal.
- **Blockers / dependencies.** H-13, X-02, X-05.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F20 — Bilingual product page copy
- **Definition.** The customer-facing Spanish and English copy lives in `docs/marea/products/copy/watch.es.md` and `docs/marea/products/copy/watch.en.md` and is part of this deliverable in MC-06. Both files use the exact 24 numbered headings of `copy/nav.es.md` and `copy/nav.en.md`, followed by an approved-disclaimers section. The copy must state: the hardware purchase versus the monitoring subscription; the dependence on electrical power, network coverage and notification-provider delivery; the notification conditions including provider acceptance, delivery and acknowledgement distinctions; the privacy model and who can see the vessel; the Core versus Plus value; and the WATCH limitation statement verbatim, together with the navigation disclaimer and the brand attribution. It must contain no price, no purchase call to action, no stock or availability statement, no theft-prevention guarantee, no rescue or certified distress-service claim, no remote-control claim, no certification and no comparative superiority. The copy is internal draft while `brandPublication = NOT_GRANTED` and `availability = NOT_FOR_SALE`.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 rule 10, §22; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§6; `VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md` §8–§10; `OPEN` — publication blocked by X-01 and X-03.
- **Owner.** UX, content and localisation with product review (facts).
- **Blockers / dependencies.** X-01, X-03.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F21 — Cross-sells
- **Definition.** Intended commercial path: WATCH is bought with the SENSE inputs it actually consumes — SENSE battery and bilge measurement in the primary configuration, with additional SENSE modules where the published compatibility documentation confirms them — and the MAREA PROTECT bundle is the defined ecosystem context (`MAREA PROTECT` minimum content: WATCH + essential SENSE sensors; bundle price `HYPOTHESIS_UNAPPROVED` and governed by MC-08, never stated as a purchase price here). WATCH does not include HUB, does not require it and does not route HUB data to shore as part of this product. MAREA NAV remains standalone and does not require WATCH; WATCH does not include charts or navigation. MAREA FLEET is a separate B2B platform that may consume authorised read-only WATCH telemetry under a future contract; buying WATCH never creates a fleet tenancy. MAREA WEATHER and MAREA DISPLAY are separate products. Professional installation, a connectivity data plan and hardware replacement are separate commercial objects. Every cross-sell must state that no product is presumed included in another and that none is purchasable today.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06, bundle architecture and `MAREA PROTECT`; `VERIFIED_REPO docs/marea/brand/brand-identity.contract.json` bundles; `VERIFIED_REPO docs/marea/products/README.md` §2 bundles are ecosystem context only and §19; `OPEN` — bundle content, price and publication are MC-08.
- **Owner.** Commercial product management.
- **Blockers / dependencies.** X-01, X-05, MC-08 bundle governance.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F22 — Retention strategy
- **Definition.** Retention is intended to come from a service the owner values, not from lock-in: monitoring that produces fewer nuisance alerts because rules are honest about freshness; history that explains what happened; a notification record that shows who saw what; access management the owner actually uses for family, crew and the technician; a simple device replacement and ownership-transfer path; and transparent renewal that states the renewal date and price before it charges. The owner can export their own monitoring data and leave without losing the device's local function; the hardware keeps working locally without a subscription, and only the remote service degrades. Renewal reminders are sent in the notification channel and by email to the account owner; cancellation is available in-product; no dark pattern, fake urgency, hidden renewal or "free forever"/"lifetime" language is permitted. Reactivation, post-cancellation data retention and deletion rules are `OPEN`.
- **Evidence.** `HYPOTHESIS` — retention design is unvalidated; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6 and `BRAND-VOICE-ES-EN.md` §10; `OPEN` — no subscription, entitlement or customer-success system exists (`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`).
- **Owner.** Customer success with product management.
- **Blockers / dependencies.** P-06, X-02, X-05.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F23 — Success metrics
- **Definition.** A metric framework to be defined and measured, with no invented targets: commercial — subscription activation, monthly recurring revenue per device, renewal rate, churn reason mix, attachment of SENSE inputs and installation services; activation — device provisioned, vessel registered, ownership proven, first rule created, first end-to-end test notification acknowledged; quality and delivery — measurement of notification latency at each canonical timestamp, delivery-confirmation coverage, acknowledgement rate, escalation rate, duplicate-alert rate, buffered-alert replay success after connectivity loss, connectivity-gap duration distribution, false-alert rate per rule and channel-failure rate; support — tickets per hundred devices, provisioning failures, replacement rate and warranty incidence; trust — share of monitored values displayed with source and age, privacy requests completed within policy, access revocations completed and audit-record completeness. Baselines and targets are `OPEN`; stating a number now would be invented.
- **Evidence.** `OPEN` — no device, telemetry service, subscription or measurement exists; `ASSUMPTION` on the metric set derived from `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §06 KPIs (MRR, notification deliverability, churn, online fleet/device ratio) and `MAREA-COMMERCIAL-ARCHITECTURE.md` §11 W-1 (repeated delivery tests under real network loss, delay metrics).
- **Owner.** Product operations with finance.
- **Blockers / dependencies.** H-12, P-06, X-05, X-06.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F24 — End-to-end acceptance
- **Definition.** Acceptance means the complete product demonstrably works end to end: the twenty WATCH-AC scenarios of §9 are executed and recorded; a real device has been provisioned, registered, owner-verified and paired to an account on a real vessel; monitored values have been ingested and displayed with age; rules, geofence, notification handoff, provider acceptance, delivery evidence, acknowledgement and escalation have each been recorded with their distinct timestamps; delivery has been measured under real network loss; local buffering and replay have been tested across a power cut and a connectivity gap; subscription expiry and payment failure have been proven not to disable local safety-relevant functions; multi-user roles and revocation have been audited; retention, export and deletion have been exercised; an OTA update has succeeded and failed safely; hardware replacement, device revocation and ownership transfer have been executed; and a real owner has completed handover. Documentation alone, unit tests, UI mock-ups or a simulation do not constitute acceptance. No scenario is claimed as passing and every scenario is `NOT_EXECUTED`.
- **Evidence.** `OPEN`/`BLOCKED` — scenarios defined in §9; the five canonical states in §1.4; `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §5.1 C-08 `NOT_FOUND` and §6.3 (Node/TypeScript suites unexecuted); `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §6 mandatory milestone evidence; the MC-13-WATCH gate.
- **Owner.** Quality assurance with engineering and compliance; independent verification by a reviewer who is not the author.
- **Blockers / dependencies.** H-05, H-06, H-11, H-12, H-13, P-06, P-10, X-07.
- **Commercial readiness.** `compliance = NOT_STARTED`.

---

## 4. F04 capability-domain register — 40 mandatory final domains

This register is the substantive expansion of F04. Each domain is part of the finished commercial experience;
the evidence state says what is actually established today. `OPEN` means the experience is defined but not
evidenced; `BLOCKED` names the external condition. No domain may be dropped from the final product because it
is currently unevidenced, and no domain may be presented as working because it is specified.

### 4.1 The four commercial layers (binding vocabulary)

| Layer | What it is | What the customer pays for | What it never includes |
| --- | --- | --- | --- |
| `HARDWARE` | The physical monitoring device, its enclosure, power and backup-energy items, connector and antenna items, and the professional installation and mounting work | A manufactured article with a declared monitored-input set, an installation and a serialised identity | Coverage, data allowance, alert delivery, certification, a guarantee |
| `SOFTWARE` | Device firmware and the account, vessel-registration, provisioning, rule, dashboard, history, sharing, privacy, audit, update and support software | The behaviour of the device and of the monitoring application for the purchased edition | Connectivity, telemetry transport cost, notification-provider cost, third-party data |
| `SUBSCRIPTION` | The recurring service entitlement: shore telemetry ingestion and storage, rule evaluation in the service, notification delivery through the chosen providers, escalation, the included history window and user seats, renewal and support | The recurring remote-monitoring service for the purchased edition | Hardware ownership, a perpetual licence to the service, a guarantee of delivery, any third-party data right |
| `EXTERNAL_CONNECTIVITY` | The contracted mobile data or equivalent outbound connectivity, the SIM/data-plan administration, roaming policy and the external notification providers (push, email, SMS where available) | A data allowance and provider relationship under the contracted terms — not yet contracted | Unlimited or worldwide coverage, any telecom agreement, any guarantee of provider acceptance or delivery |

Rules that bind every row below: (1) a customer never receives a capability of one layer by buying another;
(2) WATCH never claims "unlimited worldwide connectivity" and no telecom agreement is asserted, implied or
invented; (3) remote delivery exists only where HARDWARE + SOFTWARE + SUBSCRIPTION + EXTERNAL_CONNECTIVITY
are all present and working; (4) no entitlement may disable local safety-relevant or local functions.

### 4.2 The register

| ID | Capability domain | Layer | Finished commercial experience | Evidence state | Blocking ids |
| --- | --- | --- | --- | --- | --- |
| CD-01 | Device purchase and delivery | `HARDWARE` | The customer purchases a defined monitoring device for a named vessel and receives the stated contents, documentation and support entitlement; the serial number is recorded against the order and later against the vessel. | `BLOCKED` — no BOM, no article, no fulfilment | H-05, H-11, X-05 |
| CD-02 | Professional installation and mounting | `HARDWARE` | Offered for every configuration and required outside a documented low-risk self-install set; includes vessel and coverage assessment, written proposal, installation, provisioning, function checks, handover and training, with a permanent installation record. | `OPEN` — service design only; no installer network | H-11, X-05, X-06 |
| CD-03 | Device power and backup energy | `HARDWARE` | The device is powered from the vessel and, where the final design includes it, from a backup energy source whose duration is measured and published before sale; power loss is reported when the device can report, and the absence of a report is never treated as normal. | `BLOCKED` — no design, no measurement (duration `OPEN`) | H-05, H-11 |
| CD-04 | Vessel registration | `SOFTWARE` | The owner registers vessel identity, type, dimensions, home berth and contact context once; the vessel profile is reused across the account and is attached to the device identity; duplicate or conflicting registrations are prevented. | `OPEN` — account and vessel registry not built (P-06) | P-06, X-07 |
| CD-05 | Secure provisioning and device identity | `SOFTWARE` | Each device receives a unique identity and credentials through a documented provisioning process; no shared, default or printed-in-manual credential exists; the device only talks to the service after provisioning, and provisioning is auditable. | `BLOCKED` — `WATCH_DEVICE_IDENTITY = NOT_FOUND` | P-06, X-07 |
| CD-06 | Ownership proof | `SOFTWARE` | Before a device is bound to an account, the buyer proves ownership through an order-linked or installer-linked verification; a device cannot be silently claimed by an unrelated account. | `BLOCKED` — no identity or registration system | P-06, X-07 |
| CD-07 | Ownership transfer and rebinding | `SOFTWARE` | When the vessel is sold, a documented transfer rebinds the device to the new owner and vessel, revokes the previous account's access, keeps the installation record with the vessel and states the warranty and subscription position. | `BLOCKED` — `WATCH_DEVICE_IDENTITY = NOT_FOUND` | P-06, X-07 |
| CD-08 | Account linking | `SOFTWARE` | The registered vessel and the provisioned device are linked to one owner account; the account holder can see the link, unlink only through the documented procedure, and the service rejects conflicting links. | `OPEN` — no account system | P-06, X-07 |
| CD-09 | Supported sensor inputs | `HARDWARE` | Each supported input is published with its model, firmware where applicable, units, intended range, mounting requirement, calibration requirement where applicable and limitations; no input is implied because a connector or protocol exists. | `BLOCKED` — no compatibility matrix; sensor range and calibration `OPEN` | H-11, P-06 |
| CD-10 | Position monitoring | `HARDWARE` | Position from the device's GNSS is shown with fix quality, source and age; loss of fix becomes an explicit unknown state, never an interpolated or last-position-shown-as-current value; position is not presented as a navigation aid. | `BLOCKED` — no device; `WATCH_INGESTION = NOT_VERIFIED` | H-11, P-06 |
| CD-11 | Battery monitoring | `HARDWARE` | Battery voltage or state is measured where a compatible input exists, displayed with source, timestamp and validity, compared against owner-defined thresholds and recorded in history; no claim is made that the product prevents battery damage. | `BLOCKED` — no device, no sensor validation | H-11, P-06 |
| CD-12 | Bilge monitoring | `HARDWARE` | Water presence or bilge level is measured where a compatible input exists, shown with source, validity and age, and never presented as a guarantee that the vessel is dry when the sensor is unpowered, disconnected or stale. | `BLOCKED` — no device, no sensor validation | H-11, P-06 |
| CD-13 | Geofence | `SOFTWARE` | The owner defines one or more vessel geofences; entry and exit are evaluated with hysteresis and debounce to avoid alert storms; a geofence assertion is suppressed when position is stale or invalid, and the state is shown as unverified instead. | `OPEN` — rule engine not built | P-06 |
| CD-14 | User rules and thresholds | `SOFTWARE` | The owner creates threshold, rate-of-change and state rules on supported inputs, with a preview of what would trigger and a plain-language description of the condition; rule limits per edition are published, and no hidden rule can be created by the service. | `OPEN` — no rule editor or engine | P-06 |
| CD-15 | History | `SOFTWARE` | Monitored values, state changes, rules, alerts, deliveries, acknowledgements, escalation and connectivity gaps are recorded with timestamps; history is searchable, exportable by the owner and retained for the published window of the edition. | `OPEN` — no service storage; retention window `OPEN` | P-06, X-07 |
| CD-16 | Connectivity status | `EXTERNAL_CONNECTIVITY` | The dashboard shows whether the device is online, the last contact time, the current connectivity quality and the age of the newest received value; "unknown" is a first-class state and is never rendered as "online". | `BLOCKED` — `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` | H-12, P-06 |
| CD-17 | Last-known-good value | `SOFTWARE` | Every monitored value keeps a last-known-good reading with its own device timestamp and receipt timestamp; the interface shows it as last-known with its age and never as the current value once freshness has expired. | `OPEN` — no telemetry or freshness model exists | P-06 |
| CD-18 | Data freshness and stale state | `SOFTWARE` | Each value carries a freshness state (live, delayed, stale, unknown) from a published policy per input; stale values do not satisfy rules silently, and the rule outcome states that it was evaluated on stale data or not evaluated. | `OPEN` | P-06 |
| CD-19 | Local buffering | `SOFTWARE` | When the uplink is unavailable the device buffers monitored values and events locally with its own clock and a monotonic sequence; the buffer survives a power cycle where the design includes non-volatile storage, and the buffer state is reported when connectivity returns. | `OPEN` — design requirement only; no device | H-11, P-06 |
| CD-20 | Store-and-forward replay | `SOFTWARE` | On reconnection the device forwards the buffered subset in order with original event times, the service deduplicates replays and records the connectivity gap; buffered alerts are delivered with an explicit "recorded while offline" marker and are never presented as instantaneous. | `OPEN` | H-12, P-06 |
| CD-21 | Temporary connectivity loss and recovery | `EXTERNAL_CONNECTIVITY` | Loss and recovery are detected and reported; the owner sees the gap duration and the values recorded during the gap; recovery triggers a state resynchronisation and a clear statement of what was and was not delivered while offline. | `BLOCKED` — no connectivity contract, no service | H-12, P-06 |
| CD-22 | Notification creation | `SOFTWARE` | A matched rule creates an alert with a stable identifier, severity, rule reference, vessel, triggering value, evidence and the canonical timestamps of §20; creation is idempotent for the same event and rule. | `BLOCKED` — `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND` | P-06 |
| CD-23 | Provider handoff | `EXTERNAL_CONNECTIVITY` | The service hands the notification to the configured external provider (push, email, SMS where available) and records the handoff time and the provider reference; handoff is not acceptance and is not delivery. | `BLOCKED` — `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND` | P-06, H-12 |
| CD-24 | Provider acceptance | `EXTERNAL_CONNECTIVITY` | Acceptance by the provider is recorded as its own state and timestamp; it never sets the delivered state and never proves that any human saw the alert. | `BLOCKED` — `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND` | P-06, H-12 |
| CD-25 | Delivery evidence | `EXTERNAL_CONNECTIVITY` | Delivery confirmation is recorded only where the provider supplies verifiable evidence; where evidence is unavailable the alert remains `DELIVERY_UNKNOWN` rather than being marked delivered, and the limitation is explained to the user. | `BLOCKED` — `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND` | P-06, H-12 |
| CD-26 | Acknowledgement | `SOFTWARE` | An authorised user can acknowledge an alert; the acknowledgement records the user, the time, the channel and any note, stops escalation for that alert and is visible to every authorised viewer. Acknowledgement is a human act and is never inferred from delivery. | `BLOCKED` — `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND` | P-06 |
| CD-27 | Escalation | `SOFTWARE` | If an alert is not acknowledged within the configured window, it escalates through a documented contact order with its own timestamps and per-step delivery evidence, and stops when acknowledged or when the escalation policy is exhausted; the exhausted policy is reported. | `OPEN` — policy design only; no pipeline | P-06 |
| CD-28 | Multi-user sharing and role restrictions | `SOFTWARE` | The owner invites people and assigns a role with least privilege; both editions include owner, family/crew and time-limited technician/installer access, and Plus additionally offers marina-service and professional-fleet organisation sharing when validated; each role has published read/acknowledge/configure rights; invitations expire, and revocation takes effect immediately. | `OPEN` — no account, role or invitation system | P-06, X-07 |
| CD-29 | Monitoring dashboard | `SOFTWARE` | The owner and authorised users see vessel state, each monitored input with value, unit, source, age and freshness, connectivity status, open alerts, last-known-good values, history access and the current subscription state; the dashboard never shows a fabricated green state. | `OPEN` — no application | P-06 |
| CD-30 | Subscription renewal | `SUBSCRIPTION` | Renewal date, term, entitlements and any change are stated before charge; renewal is confirmed to the owner; a failed charge enters a documented grace period and never disables local sensing, local alarms or local buffering; remote notifications resume on payment. | `BLOCKED` — `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND` | P-06, X-05 |
| CD-31 | Data plan administration | `SUBSCRIPTION` | The owner can see the included data allowance, current consumption and what happens when it is exhausted; upgrades and downgrades have a documented effective date; exhaustion degrades remote reporting in a stated order, never by silently disabling the device. | `BLOCKED` — `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` | H-12, P-06 |
| CD-32 | SIM and roaming administration | `EXTERNAL_CONNECTIVITY` | The SIM or connectivity identity is administered by the service; the owner is told the roaming position, the territories covered and the cost implications before travel; no unlimited or worldwide coverage claim is made and no operator agreement is asserted. | `BLOCKED` — `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` | H-12 |
| CD-33 | Retention and deletion | `SOFTWARE` | A published retention schedule per data class governs monitored values, history, alert records, delivery evidence, audit records, support records and account data; the owner can export before deletion; deletion requests are executed within the documented period; legal-hold and incident exceptions are stated. | `OPEN` — schedule and implementation absent; retention values `OPEN` | P-06, X-07 |
| CD-34 | Subscription cancellation | `SUBSCRIPTION` | Cancellation is available in-product and by support; it states the effective date, what stops (remote notifications and shore storage) and what continues (local device function); it offers export before termination; it does not create a penalty or a hidden step; account deletion is a separate documented request. | `BLOCKED` — no subscription service or terms | P-06, X-02 |
| CD-35 | Hardware replacement | `HARDWARE` | A failed or lost device is replaced through a documented process: the old identity is revoked, the new device is provisioned and rebound to the same vessel and account, history remains with the vessel where policy allows, and the warranty position is stated. | `BLOCKED` — no device identity, no RMA | H-11, X-07 |
| CD-36 | OTA updates | `SOFTWARE` | Firmware and software updates are signed, versioned and staged, with rollback to a known-good version; a failed update leaves the device recoverable; the supported-version and end-of-support policies are published before sale. | `BLOCKED` — CRA-compliant signed update absent | H-13, P-06 |
| CD-37 | Support and diagnostics | `SOFTWARE` | The owner can export a diagnostic record (device identity, firmware version, last contact, connectivity history, monitored-input health, recent alert lifecycle) without granting remote control; support can interpret it; support channels, hours and escalation are published. | `OPEN` — no device or support process | H-13, X-05 |
| CD-38 | Privacy controls | `SOFTWARE` | See the privacy section of the companion contract: minimisation of the uplinked subset, consent records, role-based visibility, no public position exposure by default, sharing revocation, export and deletion controls, and a plain-language privacy notice. | `OPEN` — no privacy model implemented; DPIA not performed | X-07 |
| CD-39 | Audit records | `SOFTWARE` | Access to vessel position and monitoring data, role changes, invitations, revocation, rule changes, subscription changes, ownership transfer and support access are recorded with actor, time and action, and are available to the owner on request. | `OPEN` — no audit log | X-07 |
| CD-40 | Device loss, revocation and end-of-life | `SOFTWARE` | The owner can report a device lost or stolen and revoke it, ending its ability to upload and to be rebound; at end of life the device is deprovisioned, data is deleted per policy and the owner receives an export; ownership transfer is the planned alternative to scrapping. | `BLOCKED` — `WATCH_DEVICE_IDENTITY = NOT_FOUND` | H-11, X-07 |

### 4.3 Coverage check

Every capability mandated for the final product is present above: purchase and installation (CD-01, CD-02),
vessel registration (CD-04), secure provisioning and identity (CD-05), ownership proof and transfer (CD-06,
CD-07), account linking (CD-08), supported inputs and position/battery/bilge monitoring (CD-09 to CD-12),
geofence (CD-13), user rules (CD-14), history (CD-15), connectivity status (CD-16), last-known-good (CD-17),
data freshness (CD-18), local buffering and store-and-forward (CD-19, CD-20), temporary loss and recovery
(CD-21), notification creation, handoff, acceptance, delivery evidence, acknowledgement and escalation
(CD-22 to CD-27), multi-user sharing and roles (CD-28), dashboard (CD-29), renewal, data plan and SIM/roaming
administration (CD-30 to CD-32), retention and deletion (CD-33), cancellation (CD-34), hardware replacement
(CD-35), OTA updates (CD-36), support and diagnostics (CD-37), privacy controls (CD-38), audit records
(CD-39), device loss/revocation and end-of-life with ownership transfer (CD-40), device power and backup
energy (CD-03), and monitoring dashboard state (CD-29). Nothing in the Master Prompt capability list is
omitted; nothing is claimed as evidenced.

---

## 5. The four commercial layers, separated

### 5.1 What the customer is buying — in one paragraph per layer

- **HARDWARE.** A monitoring device for one vessel, with its mounting, power and connection items and a
  serialised identity. The hardware purchase is a one-off purchase hypothesis (F13) and does not include
  connectivity or data. It is not a certified marine instrument, not a security device and not a navigation
  aid.
- **SOFTWARE.** The device firmware and the monitoring application: registration, provisioning, rules,
  geofence, dashboard, history, sharing, privacy controls, audit, updates and support. Software behaviour is
  specified here and evidenced nowhere yet; the WATCH core software is new development, not reuse of the
  audited source (`OPEN-MARINE-CAPABILITY-INVENTORY.md` §5.1 C-08 `NOT_FOUND`).
- **SUBSCRIPTION.** The recurring service: shore ingestion and storage, rule evaluation in the service,
  notification delivery through external providers, escalation, the included history window and user seats,
  renewal and service support. The subscription is not a licence to keep the device working locally: local
  sensing, local alarms and local buffering do not depend on it.
- **EXTERNAL_CONNECTIVITY.** The contracted outbound data service and the external notification providers.
  No telecom agreement exists, no coverage is guaranteed, no "unlimited worldwide" claim is made and no
  provider is named as a partner. A connectivity contract (`WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`) and
  real terms are a precondition of any sale.

### 5.2 What WATCH is not

WATCH is not: a distress, rescue, SOLAS or GMDSS service; a certified alarm; a theft-prevention or security
guarantee; an insurer-required monitoring service; a tracker with public position sharing by default; a
navigation or chart product; a remote helm or steering command of any kind; a multi-tenant fleet platform; a
HUB substitute; or a device that keeps working remotely without power, coverage and provider delivery. It is
conditional awareness with honest evidence about its own delivery.

### 5.3 Cross-product authority (README §19, binding)

| Relationship | Permitted | Prohibited |
| --- | --- | --- |
| SENSE → WATCH | WATCH consumes approved, calibrated readings from compatible SENSE modules and reports them remotely | SENSE claiming its own connectivity, push or remote delivery; unmeasured values presented as reliable |
| HUB → WATCH | None required by this product; a future consented service could relay a bounded subset | WATCH republishing HUB local data to shore without an explicit, consented service; treating HUB as included |
| WATCH → FLEET | FLEET may consume authorised read-only telemetry under a future contract | WATCH becoming a multi-tenant fleet platform by default; an implicit fleet tenancy on purchase |
| WATCH ↔ PILOT | A future read-only PILOT status display may be authorised | Any remote engage/disengage, heading adjustment or steering command of any kind |
| WATCH ↔ NAV/DISPLAY | Position and status may be shown as monitoring context under a future interface contract | WATCH offering navigation, charts, ECDIS-like status or AIS traffic in this product |
| WATCH ↔ Subscription | Remote service degrades on expiry or non-payment after a documented grace period | Any entitlement disabling local sensing, local alarms, local buffering or safety-relevant local function |

---

## 6. Edition architecture — MAREA WATCH Core and MAREA WATCH Plus

### 6.1 Verdicts

| Edition | Verdict | Commercial meaning | Price |
| --- | --- | --- | --- |
| MAREA WATCH Core (`WATCH-CORE`) | `DEFINED` | Complete essential monitoring product; customer-facing configuration fully specified and commercially coherent; still not sellable | Hardware EUR 299 hypothesis; subscription from EUR 9.90/month hypothesis; both `HYPOTHESIS_UNAPPROVED` |
| MAREA WATCH Plus (`WATCH-PLUS`) | `CONDITIONAL` | Differentiation depends on unverified capability and on costed validation; it must state the condition that closes it | No price established; `OPEN` |

`publicationConditional` is true for both editions. `RELEASED`, `FOR_SALE`, `APPROVED` and `PUBLISHABLE` are
prohibited. No third edition and no generation label may be invented.

### 6.2 The five permitted differences, each with a measurable benefit and a closing condition

The Plus edition may differ from Core **only** in these five dimensions. Every other capability — including
monitoring inputs already in Core, freshness and last-known-good display, notification states, privacy
controls, audit records, device lifecycle and all disclaimers — is identical in both editions. Safety-relevant
status is never edition-gated and never removed by an expired entitlement.

| Difference | MAREA WATCH Core (intended) | MAREA WATCH Plus (intended) | Measurable customer benefit | Status and closing condition |
| --- | --- | --- | --- | --- |
| Additional monitored inputs | The essential input set: position, battery/DC state with shore-power context, bilge, temperature context and connectivity status | Additional supported inputs beyond the Core envelope, validated on the Plus configuration (for example extra bilge points, motion or additional SENSE modules) | Fewer separate alarm/tracker systems on one vessel: measured by the number of distinct monitoring systems replaced and by the share of the owner's documented risk list covered by monitored inputs | `CONDITIONAL` — each additional input requires a tested compatibility row and a costed sensor set; closes when the input list and its measurement evidence exist |
| Rule complexity | The essential alert set with the published base thresholds, debounce and quiet hours: geofence, bilge high water, battery low, device power loss and connectivity loss | A configurable rule set beyond the essential alerts: more rules, composite conditions, rate-of-change and per-notification-channel routing | Fewer nuisance alerts and fewer missed conditions: measured by false-alert rate per rule and by the share of the owner's scenarios expressible without workarounds | `CONDITIONAL` — the configurable-rule engine and its limits are unvalidated; closes when a rule-usability study with real owners records false-alert and coverage outcomes |
| History retention | The published base history window | A longer published history window | Reconstruction of intermittent faults after they happen: measured by the share of support cases resolved from retained history without an on-vessel visit | `CONDITIONAL` — retention windows and storage cost are `OPEN`; closes when the window is costed and a support-outcome measurement exists |
| User count | Owner, family/crew and time-limited technician/installer access, within a small named-user allowance | A larger named-user allowance on the same role model | Fewer shared-password workarounds and cleaner revocation: measured by seats per vessel, revoked-access completion and incidents of credential sharing | `CONDITIONAL` — counts and price step are `OPEN`; closes when seat costs and a revocation test are measured |
| Professional sharing | Family/crew and time-limited technician/installer access only | Organisation/professional sharing with marina-service and professional-fleet roles, with scoped, expiring access (D4 W11 remains `OPTIONAL` until separately validated) | Service visits avoided and faster fault triage: measured by support incidents resolved remotely and by professional access requests fulfilled | `CONDITIONAL` — requires role design, audit evidence and a professional-use validation; closes when role-permission tests and a professional pilot are recorded; WATCH must not become a fleet-platform feature |

### 6.3 What Core must always include (never edition-gated, never subscription-gated)

Same in both editions and always available locally without the subscription: sensing of the supported inputs
and local alarms; local buffering of values and events; the state of the device and of its power source; the
display of a value as stale or unknown rather than current; the navigation and WATCH disclaimers; the
privacy controls; access revocation; the audit trail of who could see the vessel; and the export of the
owner's own data on request. These are design requirements of the specification, not tested behaviour.

### 6.4 Pricing hypotheses and unresolved subscription terms (README §17)

Only these figures may appear, only as `HYPOTHESIS_UNAPPROVED`, VAT-inclusive consumer retail where stated:

| Item | Hypothesis | Binding qualification |
| --- | --- | --- |
| WATCH Core hardware | EUR 299 | Hardware purchase hypothesis; connectivity and any SIM/data cost are **not** included |
| WATCH Core monitoring subscription | from EUR 9.90 / month | Subscription hypothesis; what it includes is `OPEN`. `HYPOTHESIS_UNAPPROVED` |
| WATCH Plus | No price established | `OPEN`; requires costed evidence and validation of §6.2 |

**Unresolved terms that must be decided and published before any subscription can be sold:** connectivity
data allowance and what happens when it is exhausted; device count per subscription; included user count and
additional-seat terms; history retention window per edition; push/email/SMS channel set and which channels are
included; VAT basis and territory; roaming territories and roaming charges; activation and installation fee;
hardware replacement and out-of-warranty terms; support level and hours; renewal term and price indexation;
grace period on payment failure; suspension behaviour of remote notifications; cancellation effective date and
refund position; export format and deletion period; bundle treatment in MAREA PROTECT (MC-08); and B2B or
professional terms. None of these may be inferred from the hypothesis price, and no margin or payback figure
may be computed and presented as fact.

---

## 7. Local behaviour under degraded conditions

This table is the customer-facing honesty test for WATCH. It is a **design requirement**, not tested
behaviour: every row is `NOT_VERIFIED` until MC-13-WATCH executes the corresponding acceptance scenario.
Two rules override every row: (1) **a subscription or payment failure must never disable safety-relevant or
local functions**; (2) WATCH never presents a stale or unknown state as normal.

| Condition | Device/local behaviour | Remote/service behaviour | What the user must see | Acceptance |
| --- | --- | --- | --- | --- |
| Internet outage (device reachable, uplink down) | Local sensing, local alarms and local buffering continue; values and events queue with device timestamps and sequence | No uplink; no new remote alert delivery; queued data replays on recovery in order, deduplicated, with the gap recorded | Connectivity lost, last contact time, gap duration, last-known-good values with age; explicitly "not current" | WATCH-AC-12 |
| Cellular outage (no coverage at the vessel) | Same as internet outage; the device cannot distinguish the reason and must not guess it | Service marks the device unreachable after the published threshold; no alert may claim delivery while the device is offline | "No contact since …", coverage assumption not asserted as fact, gap shown on recovery | WATCH-AC-13 |
| Power loss (vessel or device supply) | If backup energy is designed, the device reports power loss while it can; if not, it stops transmitting and its silence is not normal | Service raises a "device not reporting / power suspected" condition after the threshold where the design supports it; otherwise it shows an unreachable device | Power-loss or unreachable state, last-known-good, backup duration only if measured | WATCH-AC-14 |
| Backup power active | Device operates from backup for the measured duration; remote reporting continues subject to connectivity, but backup duration is never promised until measured | Service records the power-loss event and the device's recovery; no claim that the vessel is safe | On-backup state with remaining expectation stated only if measured | WATCH-AC-14 |
| GPS unavailable | Position becomes unknown; geofence evaluation is suspended, not failed silently; other monitored inputs continue | No geofence alert may fire from an invalid position; the rule state records "not evaluated: no position" | "Position unknown" with age; geofence marked unverified, not "inside" | WATCH-AC-15 |
| Sensor failure or stale input | The affected input is marked invalid/stale with its age; local alarm behaviour for that input is stated; other inputs continue | No alert may be created from a fabricated value; a rule evaluated on stale data says so | Affected input in stale/unknown state, last-known value with age, effect on rules stated | WATCH-AC-15 |
| Subscription expiry (at period end, no renewal) | Local sensing, local alarms, local buffering, local state and the disclaimers continue indefinitely | After a documented grace period, remote ingestion, storage of new history, notifications, escalation and history access beyond the exported data stop | Subscription expired and effective date; what stopped remotely; what still works locally; export offered before data limits apply | WATCH-AC-16 |
| Payment failure (charge declined) | Identical to subscription expiry: no change to local safety-relevant function; no device bricking; no alerting of the vessel's condition is used as leverage | Documented reminder and grace period, then the same remote-service suspension as expiry; account remains accessible for export and payment | Clear payment-failure notice, grace end date, recovery path; no data held hostage | WATCH-AC-16 |
| Device replacement | Old identity revoked; new device provisioned and rebound to the same vessel and account; installation record updated; local function restored on the new device | History association follows the published policy; service rejects the old identity; no dual-owner window | Replacement state, new device identity, what history remains, warranty position | WATCH-AC-20 |
| Account lockout | Device keeps sensing, alarming and buffering locally; no local function depends on account login | Account holder cannot sign in until recovery; other authorised users' access follows the security policy; support identity recovery is documented; no silent password or session bypass | Lockout explanation and recovery route; notification to the account's verified contact channel | WATCH-AC-20 |

**Implied exclusions of this table:** WATCH cannot report a power loss when it has no backup energy and no
reachable uplink; it cannot raise a geofence alert without a valid position; it cannot prove delivery or
human acknowledgement; and it cannot keep a remote service alive without an active subscription. These are
stated limitations of a conditional-awareness product, not defects to be hidden.

---

## 8. Notification lifecycle — canonical state model and distinct timestamps

The single canonical vocabulary of `docs/marea/products/README.md` §20 is binding and is used unchanged in
this dossier, the alert-delivery and privacy contract, the copy and the machine-readable contract:

`EVENT_OBSERVED` → `RULE_MATCHED` → `ALERT_CREATED` → `QUEUED` → `PROVIDER_ACCEPTED` →
`DELIVERED_WHEN_CONFIRMED` → `ACKNOWLEDGED`; terminal/exceptional states `EXPIRED`, `FAILED`,
`DELIVERY_UNKNOWN`.

The eight distinct timestamps are never conflated: `eventTime` (device), `deviceClockTime`,
`serverReceiptTime`, `alertCreationTime`, `notificationHandoffTime`, `providerAcceptanceTime`,
`deliveryConfirmationTime`, `userAcknowledgementTime`.

Three rules bind every surface and every field of this dossier:

1. **Provider acceptance is not delivery.** `PROVIDER_ACCEPTED` never sets `DELIVERED_WHEN_CONFIRMED`.
2. **Delivery confirmation is not human acknowledgement.** Only an explicit user action sets `ACKNOWLEDGED`.
3. **An event observed while the device is offline may reach the server only after connectivity resumes.** The
   product must show the last-known-good value with its freshness and must never present a stale value as
   current.

The full transition table, emitters, retry and backoff, dedupe, ordering, offline buffering, escalation,
channel-failure policy, measurement plan and privacy contract are defined in
`docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`. This dossier does not duplicate that
enum or define a second one.

---

## 9. Acceptance scenarios — WATCH-AC-01 to WATCH-AC-20

All scenarios are `NOT_EXECUTED`. None is claimed to pass. Each requires a recorded result with device,
firmware version, connectivity condition, provider and date before any behaviour may be described as working.
Classification vocabulary: `NOT_EXECUTED` only; no other value is used in this milestone.

| ID | Scenario | Expected end-state behaviour | Classification | Evidence required |
| --- | --- | --- | --- | --- |
| WATCH-AC-01 | Device purchase, delivery and installation | A customer receives the stated contents for the SKU, the device is installed in a documented configuration and the installation record exists | `NOT_EXECUTED` | Order, SKU contents, installation record, invoice identity |
| WATCH-AC-02 | Vessel registration and account linking | Vessel profile is registered once, linked to the provisioned device and visible to the owner; conflicting links are rejected | `NOT_EXECUTED` | Account and registry records; negative duplicate-link test |
| WATCH-AC-03 | Secure provisioning, device identity and ownership proof | A unique identity and credentials are issued; no default credential exists; an unrelated account cannot claim the device | `NOT_EXECUTED` | Provisioning log; credential audit; negative claim test |
| WATCH-AC-04 | Monitoring of position, battery and bilge with dashboard | Each supported input is ingested, displayed with value, unit, source and age; no input is displayed that is not supported | `NOT_EXECUTED` | Device-level ingestion record; dashboard evidence per input |
| WATCH-AC-05 | User rule and geofence creation | Owner creates threshold and geofence rules, sees a plain-language preview and understood trigger condition; invalid rules are refused | `NOT_EXECUTED` | Rule record; usability test with a real owner |
| WATCH-AC-06 | Alert creation and provider handoff | A matched rule creates one alert with canonical timestamps and a recorded handoff time and provider reference | `NOT_EXECUTED` | Alert record with all timestamps; provider handoff log |
| WATCH-AC-07 | Provider acceptance is not delivery | Provider accepts the notification; the alert does not become delivered and the UI does not claim delivery | `NOT_EXECUTED` | State-transition record showing acceptance without delivery |
| WATCH-AC-08 | Delivery confirmation is not acknowledgement | Provider supplies delivery evidence; the alert becomes delivered but not acknowledged, with distinct timestamps | `NOT_EXECUTED` | Delivery evidence record; acknowledgement remains empty |
| WATCH-AC-09 | Acknowledgement by an authorised user | An authorised user acknowledges with user identity and time; escalation for that alert stops; all authorised viewers see it | `NOT_EXECUTED` | Acknowledgement record; revocation/visibility check |
| WATCH-AC-10 | Escalation when unacknowledged | Within the configured window the alert escalates through the contact order with per-step evidence and a reported outcome | `NOT_EXECUTED` | Escalation timeline; per-step delivery evidence; exhausted-policy state |
| WATCH-AC-11 | Deduplication, ordering and alert-fatigue controls | Repeated identical events produce one grouped incident; enter/exit ordering is correct; debounce, hysteresis and quiet hours suppress storms without hiding a persistent condition | `NOT_EXECUTED` | Duplicate-suppression record; ordering log; quiet-hours test |
| WATCH-AC-12 | Internet outage, buffering and replay | Local sensing and buffering continue; values replay in order with original timestamps after recovery; the gap and the last-known-good value are shown | `NOT_EXECUTED` | Controlled network-loss test; replay log; gap display evidence |
| WATCH-AC-13 | Cellular/coverage outage and recovery | Device is reported unreachable after the threshold; no delivery is claimed while offline; recovery resynchronises state and records the gap | `NOT_EXECUTED` | Coverage-loss test; unreachable-state evidence; gap record |
| WATCH-AC-14 | Power loss and backup energy | Power loss is reported where the design supports it; backup duration is measured and no longer claimed; local buffer survives per design | `NOT_EXECUTED` | Power-cut test; backup-duration measurement; buffer-integrity record |
| WATCH-AC-15 | GPS unavailable and sensor failure/stale input | Position becomes unknown and geofence is suspended; stale inputs are marked with age; no fabricated value is shown | `NOT_EXECUTED` | GPS-denied test; fault-injection record; UI state evidence |
| WATCH-AC-16 | Subscription expiry and payment failure | Remote notifications and storage stop after the documented grace period; local sensing, alarms and buffering continue; export is offered; no safety-relevant function is disabled | `NOT_EXECUTED` | Entitlement-expiry test; payment-failure test; local-function test |
| WATCH-AC-17 | Data plan and SIM/roaming administration | Allowance and consumption are visible; exhaustion degrades in a stated order; roaming position and territories are shown; no unlimited/worldwide claim appears | `NOT_EXECUTED` | Data-plan record; exhaustion test; roaming disclosure evidence |
| WATCH-AC-18 | Multi-user sharing, roles and revocation | Owner, family/crew, technician and marina-service roles see only what their role permits; invitations expire; revocation is immediate and audited | `NOT_EXECUTED` | Role-permission matrix test; revocation timing test; audit record |
| WATCH-AC-19 | History, retention, export and deletion | History is retained for the published window, exported by the owner in a usable format, and deleted per policy after cancellation or account deletion | `NOT_EXECUTED` | Retention test; export file opened independently; deletion evidence |
| WATCH-AC-20 | Update, replacement, loss/revocation, ownership transfer and end-of-life | OTA update succeeds and a failed update rolls back; a replaced device is rebound and the old one revoked; a lost device is revoked; ownership transfer rebinds and revokes; end-of-life deprovisions and exports | `NOT_EXECUTED` | Update/rollback records; replacement and revocation records; transfer and end-of-life records |

---

## 10. Traceability annex — MC-02 blockers and evidence required before sale

### 10.1 Mandatory WATCH blocker mapping

| Blocker | What it means for MAREA WATCH | Closed only by |
| --- | --- | --- |
| D-09 | AIS-derived traffic retention and redistribution are not established. WATCH does not display AIS traffic in the defined product; any future traffic view or AIS-derived history is `LEGAL_REVIEW_REQUIRED` and cannot be launched before its data-rights position exists | Written data-rights decision and, if retained, a retention/redistribution policy; WATCH keeps AIS out of the defined product |
| H-05 | No physical build, measurement, environmental or EMC evidence exists | Prototype BOM, bench measurements, thermal/ingress/vibration and EMC pre-scan on the actual article |
| H-06 | CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA obligations are not started; no EU declaration of conformity, test report or notified-body certificate | Per-SKU applicability review, harmonised standards, accredited laboratory tests, technical file, EU declaration of conformity, producer registrations |
| H-11 | No monitoring or cellular hardware exists in the repository; only documented concepts | Hardware platform selection, prototype, environmental test and real device evidence |
| H-12 | No connectivity hardware or SIM/roaming contract; recurring data cost and coverage are unquantified | MVNO/roaming quotes, real coverage validation, written connectivity terms and a cost model |
| H-13 | CRA obligations: reporting applies from 2026-09-11 and main obligations from 2027-12-11; no vulnerability handling, secure update, SBOM or incident reporting exists | Security-by-design process, coordinated vulnerability disclosure, signed update with rollback, SBOM, incident reporting, conformity route |
| P-06 | Remote-monitoring foundation `NOT_FOUND`; WATCH must be built as new development, not reused | New telemetry service, secure device identity, alerting pipeline, subscription service, mobile/web application and the five canonical states evidenced |
| P-10 | Engineering reuse is inventory-level; Node/TypeScript suites are unexecuted | Reproducible build/test environment and executed test report for every reused module used by WATCH |
| X-01 | MAREA is a proposed brand; no trademark clearance; "Marea Marine" is a risk signal, not an infringement finding | EUIPO/OEPM clearance and filing before any brand publication |
| X-03 | No image-generation capability or credential; all WATCH visuals remain `BLOCKED_ON_IMAGE_GENERATION`; assets are `CONCEPT`, not `REAL_PRODUCT` | Written budget authorisation, provider credential, commercial-use confirmation and one pilot asset |
| X-05 | No BOM, supplier quotes, connectivity costs, push/provider prices or channel terms; no approved price | Real quotes, bottom-up costing and an approved price list |
| X-06 | No primary customer interviews, no installer/distributor terms, no validated willingness to pay | Structured discovery and pilot customers before committing product investment |
| X-07 | No device identity, provisioning, ownership transfer, privacy or incident-response model; remote monitoring processes vessel positions | Threat model, DPIA, secure boot/update, key management, role and audit design |

Supplementary references used above and to be reconciled with the other dossiers: L-01–L-03 and S-06
(source-IP and notice position for any reused component); X-02 (seller legal identity, required for the terms
of service and the privacy notice); H-02 (the unauthenticated control plane must never become a WATCH path);
X-04 (release governance).

### 10.2 Exact evidence required before any WATCH sale

- Frozen BOM with manufacturer part numbers, revisions, suppliers and serial traceability (H-05, H-11).
- Bench, electrical, power-fail, backup-energy, thermal, ingress and EMC test evidence on the actual article,
  plus pre-compliance measurement (H-05, H-06).
- Conformity route and EU declaration of conformity per SKU (H-06), with the radio/RED position resolved for
  whatever connectivity module is selected; GPSR safety case and economic-operator identification.
- CRA conformity: vulnerability handling, signed update with rollback, SBOM, incident reporting and
  secure-by-default configuration (H-13).
- A real connectivity contract with coverage, data allowance, roaming, SMS/voice fallback (if any), exit and
  liability terms (H-12); a real push/email/SMS provider agreement with measurable delivery evidence.
- Executed alert-delivery measurement under real network loss, with the canonical timestamps recorded and no
  delivery claim where evidence is missing (P-06, §8).
- Device identity, provisioning, ownership proof, transfer, revocation and replacement executed end to end
  (P-06, X-07).
- Subscription service with renewal, grace, payment failure, cancellation, export and deletion; a tested
  proof that no entitlement disables local safety-relevant function (P-06, X-07).
- DPIA, privacy notice, records of processing, retention schedule and DPO sign-off of the lawful-basis
  assessment (X-07).
- Installer validation: reference installations, measured installation hours, documented self-install set
  and professional role sharing test (X-05, X-06).
- Real supplier and connectivity quotes, bottom-up costing, approved price list and channel terms (X-05).
- Written warranty and support terms and the seller's legal identity (X-02, X-05).
- Brand clearance before any customer-facing publication (X-01); asset provenance and X-03 closed before any
  visual is published.

No WATCH SKU may be orderable while these are missing. The lifecycle gate for sale is `REGULATORY_READY` then
`OPERATIONS_READY` with an approved SKU — not merely a published specification.

---

## 11. Ecosystem, cross-sells and cross-product authority

| Product | Relationship to WATCH | Binding boundary |
| --- | --- | --- |
| MAREA SENSE | Supplies the measured inputs WATCH consumes where the published compatibility documentation confirms them | SENSE alone does not deliver remote alerts; SENSE has no connectivity of its own; remote delivery requires WATCH + connectivity + active subscription (README §16 rule 6) |
| MAREA HUB | Onboard local data gateway; a distinct product with a distinct role | Not included, not required; WATCH does not republish HUB data to shore without an explicit, consented service; no double billing between local HUB functions and the monitoring subscription |
| MAREA FLEET | B2B multi-vessel platform that may consume authorised read-only telemetry under a future contract | WATCH is not a multi-tenant fleet platform by default; buying WATCH creates no fleet tenancy; no write path from FLEET to the vessel |
| MAREA PILOT | At most a future read-only status display, subject to the safety boundary | No remote engage/disengage, no heading adjustment, no steering command of any kind |
| MAREA NAV / MAREA DISPLAY | May show monitoring context under a future interface contract | WATCH is not navigation, charts, ECDIS or AIS traffic; NAV is standalone and does not require WATCH |
| MAREA WEATHER | Independent licensed data service | Not included; no entitlement claim |
| MAREA PROTECT | Ecosystem bundle (WATCH + essential SENSE sensors) as defined by MC-08 | Bundle content, price and publication are MC-08; the bundle hypothesis is never a purchasable price |

---

## 12. Required disclaimers — verbatim, ES and EN

### 12.1 Navigation / instruments disclaimer

Required in this dossier and in both WATCH copy files because WATCH presents position and vessel-state data.
Approved wording of `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9, used verbatim:

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo
  reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad
  de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's
  required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests
  with the skipper."

### 12.2 WATCH draft limitation statement (README §16.8, verbatim; INTERNAL DRAFT wording)

The statement below is the MC-06 internal-draft wording pending claims-register approval. It is **not**
claimed as approved policy text; its placement here is required by README §16 rule 8.

- ES: «Los avisos remotos dependen de la alimentación, de la cobertura de red y de la entrega por parte del
  proveedor de notificaciones. No se garantiza la recepción inmediata y no constituyen un servicio de socorro
  certificado.»
- EN: "Remote alerts depend on power, network coverage and delivery by the notification provider. Immediate
  receipt is not guaranteed and they are not a certified distress service."

### 12.3 AIS receive-only disclaimer — conditional

WATCH does not display AIS-derived traffic in the defined product, so the AIS disclaimer is not required on
its current surfaces. If a future approved interface ever presents AIS targets, the approved verbatim
disclaimer of `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 must appear wherever they are displayed:

- ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de
  evitación de colisiones ni un transpondedor.»
- EN: "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system
  and not a transponder."

### 12.4 Brand attribution

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

No customer-facing surface may present MAREA WATCH as certified, approved, available, priced, navigation-grade,
a distress service or a theft-prevention guarantee while `brandPublication = NOT_GRANTED`,
`availability = NOT_FOR_SALE` and `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`.

---

## 13. Non-assertions and document status

This dossier does **not** assert, and must not be read as asserting: CE marking, an EU declaration of
conformity, EMC/RED/LVD/GPSR/RoHS/WEEE/CRA compliance or assessment; any radio licence, telecom agreement,
SIM agreement, roaming agreement, MVNO relationship or coverage claim, and specifically no unlimited or
worldwide connectivity; any notification-provider agreement, delivery measurement, delivery-time guarantee or
delivery-rate figure; any device identity, provisioning, ownership-transfer or revocation system; any
subscription, billing or entitlement service; any theft-prevention, security, rescue, distress, SOLAS or GMDSS
capability; any remote helm, steering, autopilot or control capability; any vessel, bench or sea-trial result;
any sensor accuracy, calibration or environmental rating; any certification, insurance acceptance, stock,
lead time, availability, customer count, review or testimonial; any trademark clearance; any supplier quote,
BOM, cost, margin or approved price; any image asset — all visuals remain `BLOCKED_ON_IMAGE_GENERATION` (X-03)
and `CONCEPT`, not `REAL_PRODUCT`.

Status of this deliverable: `INTERNAL`, `COMPLETE_TARGET_SPECIFICATION`, `NOT_FOR_SALE`, `NOT_PUBLISHED`. It
defines the finished commercial product and the evidence that would prove it. It does not make MAREA WATCH
orderable, publishable, certified, priced or supported, and it does not replace the MC-13-WATCH verification
gate, the DPIA or any conformity assessment.
