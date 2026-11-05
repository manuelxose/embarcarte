# MAREA PILOT · MAREA SENSE · MAREA WATCH — Edition authority (MC-06 / D4)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D4-PRODUCT-EDITIONS |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Date | 2026-10-30 |
| Owner function | Lead (Chief Product Officer) with the Commercial, UX and Localization Specialist |
| Status | INTERNAL ONLY · NOT PUBLISHED · NOT FOR SALE · products `DEFINED`; brand clearance `NOT_GRANTED` |
| Lifecycle | `DEFINED` for `PILOT`, `SENSE` and `WATCH` (README §3; no other state may be claimed) |
| Governing contract | `docs/marea/products/README.md` §1–§11 (MC-05) and §12–§23 (MC-06 addendum), in particular §12, §14, §17, §18, §19, §21, §22 |
| Binding inputs | `docs/marea/COMMERCIAL-PORTFOLIO.md` §04–§06 and the price-and-channel decision rule; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6; `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`; `docs/marea/execution/DECISION-LOG.md` D-007, D-008, D-009 |
| Product dossiers (other functions) | D1 `MAREA-PILOT-COMMERCIAL-SPEC.md`, D2 `MAREA-SENSE-COMMERCIAL-SPEC.md`, D3 `MAREA-WATCH-COMMERCIAL-SPEC.md` — authoritative on product capability detail; this document is authoritative on **which customer configuration contains which capability and why** |
| Nature | Internal pre-contractual definition. Not a catalogue, not a product page, not a quotation, not a certification, not an availability statement |

**These are definitions, not availability.** Nothing in this document may be read as an offer, a stock
statement, a delivery date, an approved price, an installation promise or a claim that any capability is
implemented. All three products are `DEFINED` and `NOT_FOR_SALE`; `availability = NOT_FOR_SALE` and
`brandPublication = NOT_GRANTED` for every edition below. No edition is `RELEASED`, `FOR_SALE`, `APPROVED` or
`PUBLISHABLE`; those words are prohibited for batch-02 editions (README §14).

## 1. Purpose, and the question this document answers

MC-06 has to answer the same question for the second batch that MC-05 answered for the first: **is each
edition a real customer configuration with a repeatable value difference, or is it a label?** For PILOT the
answer is constrained by a safety gate that is `BLOCKED`; for SENSE by the fact that modules are hardware SKUs
whose accuracy is unmeasured; for WATCH by the fact that the entire service is `NOT_FOUND` in the evidence
base. This document therefore does four things:

1. fixes every edition-level object, its exact id, its display name and its **verdict** in the README §14
   vocabulary (`DEFINED`, `CONDITIONAL`, `INSTALLATION_PACKAGE`);
2. records, for **every** edition, all fifteen required fields (§1.2), including the honest engineering
   readiness and the condition that would justify the edition before launch;
3. states what each family actually does for the customer, and what it explicitly does not do;
4. keeps every price at `HYPOTHESIS_UNAPPROVED` or `NOT ESTABLISHED`, never at an approved value.

### 1.1 Inclusion status vocabulary (binding for this document and for D5–D9)

| Status | Meaning for the customer |
| --- | --- |
| `INCLUDED` | Part of the edition, inside the quoted scope, at no additional product cost |
| `INCLUDED_CONDITIONAL` | Part of the edition **only** if the named verification condition has been met for that vessel or that module; the condition is stated in the row |
| `INSTALLATION_SCOPE` | Not an edition feature: the item is selected by the vessel survey and named in the written quotation (`PILOT-PRO` and every PILOT drive/feedback selection) |
| `OPTIONAL` | Available only as a separately purchased MAREA product, accessory, service or data entitlement — never free, never implied |
| `NOT_INCLUDED` | Explicitly outside the edition; the customer must obtain it elsewhere |
| `TARGET_ONLY` | Intended final capability, not verified and not built; may not be sold, quoted as delivered or advertised |
| `NONE_BY_DESIGN` | Excluded permanently by the product boundary or the claims policy; no future edition may add it |

### 1.2 The fifteen required edition fields

Every edition record below carries exactly these labels, in this order: (1) **Edition ID**; (2) **Customer-facing
name**; (3) **Product family**; (4) **Target segment**; (5) **Capabilities included**; (6) **Capabilities
excluded**; (7) **Optional features**; (8) **Prerequisites**; (9) **Installation expectation**; (10)
**Subscription entitlement**; (11) **Price hypothesis**; (12) **Current engineering readiness**; (13) **Current
evidence**; (14) **Conditional edition viability**; (15) **Criteria that justify the edition before launch**.

### 1.3 Evidence status vocabulary (the honest engineering column)

| Status | Meaning |
| --- | --- |
| `NONE_BEYOND_AUDIT` | The only evidence is the MC-02 code/configuration audit; nothing is product-verified |
| `PARTIAL_PARSER` | Executed unit tests exist for a parser-level concern only (SENSE wind parsing, IMU fusion); no sensor, calibration or field accuracy evidence |
| `TARGET` | Intended capability with no verified implementation; a product-engineering requirement |
| `BLOCKED` | Cannot be offered or claimed until a named external condition closes (certificate, measurement, contract, right) |
| `NOT_FOUND` | The capability or service is absent from the evidence base (MC-02 `P-06` for WATCH) |

No edition in MC-06 is `VERIFIED`. That sentence is the difference between a specification and a launch.

### 1.4 Edition identity table (authoritative ids)

Thirteen edition-level objects exist. No other edition id may be used, no generation label, size, version
number or certification suffix may be attached, and no `®`/`™` may appear (README §12; X-01).

| Edition id | Display name | Family | Type | Verdict (README §14) | Price hypothesis (status) |
| --- | --- | --- | --- | --- | --- |
| `PILOT-COASTAL` | MAREA PILOT Coastal | PILOT | installed hardware+software system | `DEFINED` | from EUR 1,290 — `HYPOTHESIS_UNAPPROVED`, starting price only, never a quotation (D-009) |
| `PILOT-SAIL` | MAREA PILOT Sail | PILOT | installed hardware+software system | `CONDITIONAL` | `NOT ESTABLISHED` |
| `PILOT-PRO` | MAREA PILOT Pro | PILOT | vessel-specific installation package, **not a retail SKU** | `INSTALLATION_PACKAGE` | `NOT ESTABLISHED` (quoted per vessel; no figure exists) |
| `SENSE-WIND` | MAREA SENSE Wind | SENSE | sensor module SKU | `DEFINED` | `NOT ESTABLISHED` |
| `SENSE-POWER` | MAREA SENSE Power | SENSE | sensor module SKU | `DEFINED` | `NOT ESTABLISHED` |
| `SENSE-BILGE` | MAREA SENSE Bilge | SENSE | sensor module SKU | `DEFINED` | `NOT ESTABLISHED` |
| `SENSE-TANKS` | MAREA SENSE Tanks | SENSE | sensor module SKU | `DEFINED` | `NOT ESTABLISHED` |
| `SENSE-ENV` | MAREA SENSE Environment | SENSE | sensor module SKU | `DEFINED` | `NOT ESTABLISHED` |
| `SENSE-ESSENTIALS` | MAREA SENSE Essentials | SENSE | kit (preconfigured modules) | `DEFINED` | `NOT ESTABLISHED` (kits need independent price/cost sheets) |
| `SENSE-SAIL` | MAREA SENSE Sail | SENSE | kit (preconfigured modules) | `CONDITIONAL` | `NOT ESTABLISHED` |
| `SENSE-SYSTEMS` | MAREA SENSE Systems | SENSE | kit (preconfigured modules) | `CONDITIONAL` | `NOT ESTABLISHED` |
| `WATCH-CORE` | MAREA WATCH Core | WATCH | hardware + recurring service | `DEFINED` | EUR 299 hardware `HYPOTHESIS_UNAPPROVED`; monitoring subscription from EUR 9.90/month `HYPOTHESIS_UNAPPROVED` |
| `WATCH-PLUS` | MAREA WATCH Plus | WATCH | hardware + recurring service | `CONDITIONAL` | `NOT ESTABLISHED` |

`SENSE` module *entry* price: from EUR 99 (`HYPOTHESIS_UNAPPROVED`) is the cheapest single-module starting
hypothesis and is not attributable to a named module in this document (README §17).

---

## 2. MAREA PILOT — three editions, one supervised system

**What the family does for the customer.** MAREA PILOT is intended to hold a course, hold a verified wind
angle, or follow a route **only** within the modes verified for that specific vessel, always under continuous
human supervision, with a physical E-stop, independent motor-power isolation, a local control head and an
always-available manual takeover. It is not an unattended autopilot, not a remote or cloud helm, not a
collision-avoidance system and not a certified product. Safety is a design boundary, not an edition feature:
**no edition may be bought, quoted or configured without the same physical safety path.**

**Edition logic.** The split is *surveyed steering scope*, not software licences:
Coastal = the standard surveyed installation with heading hold as its final intent; Sail = Coastal plus verified
wind-angle steering; Pro = anything outside the standard envelope, quoted per vessel. A customer must never be
able to buy a Pilot that differs only by a toggle.

### 2.1 PILOT capability register (editions × evidence)

| # | Capability | Coastal | Sail | Pro | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| P01 | Written vessel eligibility decision from an installation survey | `INCLUDED` | `INCLUDED` | `INCLUDED` | The survey is the product's safety and price basis in every edition; without it there is no quotation | `TARGET` |
| P02 | Heading hold (course keeping) under continuous supervision | `INCLUDED` | `INCLUDED` | `INSTALLATION_SCOPE` | The reason Coastal exists; the minimum usable supervised mode | `BLOCKED` (H-01, P-04: no bench evidence, no sea trial) |
| P03 | Wind-angle steering | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | `INSTALLATION_SCOPE` | The only genuine Coastal→Sail difference: a mode that needs a qualified wind source and its own verification | `BLOCKED` (H-01; wind mode unverified) |
| P04 | Route/track following | `TARGET_ONLY` | `TARGET_ONLY` | `TARGET_ONLY` | Intended for the family but attributed to **no** edition until verified; never used as an upgrade argument. The contract (`product-definitions.batch-02.json`) records the mode itself as `CONDITIONAL_ON_VERIFICATION`; edition attribution stays `TARGET_ONLY` until that condition closes | `BLOCKED` (H-01; NAV integration unverified — see D5) |
| P05 | Physical E-stop and independent motor-power isolation | `INCLUDED` | `INCLUDED` | `INCLUDED` | Permanent design boundary: an emergency path that does not depend on firmware or on any commercial service | `BLOCKED` (`PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`, `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`, H-10) |
| P06 | Local control head with engage/disengage and manual standby | `INCLUDED` | `INCLUDED` | `INCLUDED` | Local-only authority is the product's core promise; engagement never leaves the vessel | `BLOCKED` (H-02 unauthorised control plane; no physical article) |
| P07 | Drive/actuator, steering feedback and calibrated heading sensor | `INSTALLATION_SCOPE` | `INSTALLATION_SCOPE` | `INSTALLATION_SCOPE` | Selected by survey and named in the quotation; a catalogue drive would misdescribe the product | `BLOCKED` (`PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`, H-01, H-03, H-05) |
| P08 | Optional wind input for Sail | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | `INSTALLATION_SCOPE` | Must be qualified as a *steering input*, not merely as a SENSE measurement | `BLOCKED` (H-01, P-05) |
| P09 | Optional GNSS / route context from a compatible source | `OPTIONAL` | `OPTIONAL` | `INSTALLATION_SCOPE` | Context for the helm, never authority over it (README §19) | `BLOCKED` (D-01-adjacent integration, H-04) |
| P10 | Commissioning, dockside validation, supervised sea trial, operator training, signed handover record | `INCLUDED` | `INCLUDED` | `INCLUDED` | A steering system that is not commissioned and trained is not delivered | `TARGET`; `PILOT_SEA_TRIALS = NOT_PERFORMED` |
| P11 | Second control-head station | `OPTIONAL` | `OPTIONAL` | `OPTIONAL` | Only where the survey and safety case support it; not an edition differentiator | `OPEN` |
| P12 | Read-only status for NAV / HUB / WATCH | `OPTIONAL` | `OPTIONAL` | `OPTIONAL` | Separate products; read-only by rule; never a steering path | `BLOCKED` (README §19; D5) |
| P13 | Autonomous or unattended steering | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Never offered under any name; the supervised-steering disclaimer is mandatory | by design (README §16, claims policy §4.3) |
| P14 | Remote, internet or cloud steering command | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | No control path may leave the vessel; only read-only status may (README §16 rule 1) | by design (`H-02`) |
| P15 | Collision avoidance, AIS-based steering, traffic-triggered manoeuvres | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Not a collision-avoidance system; AIS is receive-only information | by design (claims policy §2 Class X) |
| P16 | Maintenance plan and service items | `OPTIONAL` | `OPTIONAL` | `OPTIONAL` | Quoted separately; no price exists | `OPEN` |
| P17 | Warranty and support entitlement | `INCLUDED` | `INCLUDED` | `INCLUDED` | Identical in principle across editions; Pro buys scope, not more legal rights | `BLOCKED` (X-02 legal identity; no terms) |

### 2.2 Edition record — `PILOT-COASTAL` (MAREA PILOT Coastal)

- **Edition ID.** `PILOT-COASTAL`.
- **Customer-facing name.** MAREA PILOT Coastal.
- **Product family.** `PILOT` (MAREA PILOT), installed hardware+software steering system.
- **Target segment.** Owners of sailing yachts and motor cruisers roughly 8–15 m already fitted with a working
  mechanical or hydraulic steering system, cruising day and coastal waters from Galicia and northern Portugal,
  who want supervised course-holding with a person at the helm. Secondary: independent installers/refit yards
  quoting a documented steering product. Not for any buyer seeking unattended or remote helm control.
- **Capabilities included.** P01, P02, P05, P06, P10, P17, plus P07/P08 within the surveyed installation scope.
- **Capabilities excluded.** Wind-angle steering; route/track following (`TARGET_ONLY`); autonomy (P13); remote
  control (P14); collision avoidance (P15); licensed charts, weather or AIS products; vessel structural or
  vessel-wide electrical work; anything not named in the quotation.
- **Optional features.** P09 GNSS/route context, P11 second station, P12 read-only status for NAV/HUB/WATCH,
  P16 maintenance plan, compatible wind sensor only as a quoted Sail input.
- **Prerequisites.** Completed installation survey and written eligibility decision; compatible steering
  system with manual release; surveyed drive/feedback selection; physical E-stop and independent motor-power
  isolation; authorised installer; signed quotation naming inclusions and exclusions; operator training.
- **Installation expectation.** Professional, installer-led and mandatory. Quoted per vessel after survey.
  No self-install path exists or is planned; no installation price, duration or lead time exists (X-05, X-06).
- **Subscription entitlement.** None. `subscriptionHypothesis: null`. No recurring entitlement gates any local
  steering, alarm or safety function (README §16 rule 7, §19).
- **Price hypothesis.** **from EUR 1,290 — `HYPOTHESIS_UNAPPROVED`.** A starting-price hypothesis for the
  minimum usable Coastal configuration only. It is **not** an all-inclusive quotation, not turnkey, not a
  "from" offer for publication, and must not be summed into a bundle (D-009; README §17–§18).
- **Current engineering readiness.** `engineering = NOT_VERIFIED`, `hardware = NOT_SELECTED`,
  `compliance = NOT_STARTED`, `dataRights = NOT_GRANTED`, `pricing = HYPOTHESIS_UNAPPROVED`.
- **Current evidence.** `PILOT_SAFETY_GATE = BLOCKED`, `PILOT_SEA_TRIALS = NOT_PERFORMED`,
  `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`, `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`,
  `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND` (H-01, H-03, H-10, P-04). Evidence class: `BLOCKED`.
- **Conditional edition viability.** Viable as a *definition*; **not viable as a sale** until the safety gate
  closes. The edition survives as defined because its scope (standard surveyed installation, heading hold)
  is the narrowest sellable configuration and therefore the first candidate for a safety programme.
- **Criteria that justify the edition before launch.** (1) Bench evidence for the supervised control loop,
  E-stop path and motor isolation; (2) a recorded supervised sea-trial programme on representative vessels;
  (3) independent safety review and conformity assessment plan; (4) a frozen BOM and drive-family envelope;
  (5) measured installation hours and a written installer agreement; (6) written terms, warranty and seller
  identity; (7) a costed basis that survives the EUR 1,290 starting hypothesis or replaces it with a quotation
  model. Until then the edition is a definition only.

### 2.3 Edition record — `PILOT-SAIL` (MAREA PILOT Sail)

- **Edition ID.** `PILOT-SAIL`.
- **Customer-facing name.** MAREA PILOT Sail.
- **Product family.** `PILOT`.
- **Target segment.** Sailing-yacht owners within the Coastal envelope who sail to windward and want assisted
  wind-angle steering on passage, with a qualified wind source and a person at the helm.
- **Capabilities included.** Everything in `PILOT-COASTAL`, plus P03 wind-angle steering and P08 wind input,
  **conditional on** mode-specific verification and a calibrated, compatible wind source.
- **Capabilities excluded.** Route/track following (`TARGET_ONLY`); autonomy; remote control;
  collision avoidance; any claim that wind mode performs like, or better than, heading hold; any performance,
  accuracy or reliability claim (no comparative evidence exists).
- **Optional features.** As Coastal, plus additional wind-source options only where qualified as steering
  inputs.
- **Prerequisites.** Coastal prerequisites, plus: verified wind-angle mode evidence for that drive family and
  vessel class; a calibrated wind source qualified as a steering input; user training specific to wind mode and
  its failure behaviour.
- **Installation expectation.** As Coastal, plus wind-source installation and calibration, quoted per vessel.
- **Subscription entitlement.** None. `subscriptionHypothesis: null`.
- **Price hypothesis.** **`NOT ESTABLISHED`.** No figure may be stated (README §17 prohibits a `PILOT-SAIL`
  price). It is not derived by adding anything to the Coastal hypothesis.
- **Current engineering readiness.** `engineering = NOT_VERIFIED`, `hardware = NOT_SELECTED`,
  `compliance = NOT_STARTED`.
- **Current evidence.** `PILOT_SAFETY_GATE = BLOCKED`; wind-mode behaviour unverified (H-01); the wind parsing
  evidence in MC-02 is a SENSE-relevant parser unit test, not steering evidence.
- **Conditional edition viability.** `CONDITIONAL` — the edition exists as a definition only. If wind-angle
  mode cannot be verified on representative vessels, `PILOT-SAIL` must not ship: the family collapses to
  Coastal plus a quoted wind-input option, and this document must be revised rather than the claim softened.
- **Criteria that justify the edition before launch.** (1) Mode-specific verification evidence for wind-angle
  steering, separate from heading hold; (2) a qualified wind-source list and calibration procedure; (3) failure
  behaviour documented and trained (sensor loss, implausible angle, wind shift); (4) all Coastal criteria;
  (5) a costed scope difference that a customer can repeat in one sentence.

### 2.4 Edition record — `PILOT-PRO` (MAREA PILOT Pro)

- **Edition ID.** `PILOT-PRO`.
- **Customer-facing name.** MAREA PILOT Pro. **Verdict `INSTALLATION_PACKAGE`: a vessel-specific quoted
  service scope, never a retail SKU** (README §18, D-008).
- **Product family.** `PILOT`.
- **Target segment.** Vessels outside the standard surveyed envelope: unusual steering geometry, larger
  displacement, mixed or legacy drives, dual-station helms, or any configuration a survey cannot map onto the
  Coastal standard. Buyer is usually the installer, refit yard or a professional operator.
- **Capabilities included.** The surveyed and quoted scope only; may include combinations of P01–P12 where the
  safety case and the survey support them. Nothing is included by implication from Coastal or Sail.
- **Capabilities excluded.** Anything not written in the quotation; every `NONE_BY_DESIGN` item (P13–P15);
  certification or class-approval claims of any kind; operation as a fixed-price product.
- **Optional features.** Defined by the quoted scope only.
- **Prerequisites.** Full engineering survey; documented steering and electrical assessment; safety case review
  for the specific configuration; named installer accountability; supervised sea trial; training; written
  quotation with an explicit inclusion/exclusion schedule.
- **Installation expectation.** Bespoke, installer-led, quoted after survey. Cannot be bought from a page, a
  catalogue or a price list; cannot be represented as a fixed-price edition.
- **Subscription entitlement.** None. `subscriptionHypothesis: null`.
- **Price hypothesis.** **`NOT ESTABLISHED`.** No figure exists and none may be published; a quotation is the
  only commercial document (D-009).
- **Current engineering readiness.** `engineering = NOT_VERIFIED`; `hardware = NOT_SELECTED`.
- **Current evidence.** As Coastal/Sail, plus no survey method has been validated on a real vessel
  (`PILOT_SAFETY_GATE = BLOCKED`).
- **Conditional edition viability.** Viable **only** as a quoted service, and only after the Coastal safety
  gate closes: a bespoke configuration inherits every Coastal evidence gap and adds survey-specific risk.
- **Criteria that justify the edition before launch.** (1) All Coastal criteria; (2) a validated survey
  methodology and eligibility rules; (3) at least two documented reference installations with handover
  records; (4) a safe-scope refusal rule for configurations outside the safety case; (5) commercial terms that
  make "quoted scope" enforceable and auditable.

### 2.5 PILOT edition verdicts

- **The split is commercially sound as a definition** because it separates three genuinely different scopes
  (standard installation; standard plus a verified mode; bespoke configuration). It is **not yet sound as a
  sales structure** because the underlying safety and hardware evidence does not exist.
- **No edition buys more safety than another.** The physical safety path is identical everywhere; a customer
  who believes Sail or Pro is "safer" has been misled.
- **The starting price is a hypothesis about a configuration, not a product.** EUR 1,290 may only describe the
  minimum usable Coastal configuration, and any publication or quotation must name every included and excluded
  item (D-009). The commercial model is **quotation-based**: see D6 §8.
- **Risk — the label trap.** If Sail cannot evidence its mode and Pro cannot evidence a repeatable survey, both
  become labels. The verdict vocabulary exists exactly to prevent that, and this document keeps it explicit.
- **No fourth PILOT edition is specified.** A "PILOT Sport", "PILOT Charter" or performance tier would need a
  distinct customer, a safety case and an evidence base; none exists, and inventing one would create a price
  with no delivery behind it.

---

## 3. MAREA SENSE — five modules, three kits

**What the family does for the customer.** MAREA SENSE is intended to make an older boat readable: wind, DC
power, bilge water, tank levels and compartment environment, measured locally, with units, source, freshness
and calibration state always shown. A SENSE module is a **hardware sensor SKU with no connectivity of its own**:
it does not send remote alerts, and it cannot be assumed to speak any protocol before compatibility is tested
(`SENSE_NMEA2000 = NOT_IMPLEMENTED`, H-04). Readings are only valid within each module's verified range and
calibration; an uncalibrated, stale or out-of-range value is shown as invalid, never as data.

### 3.1 SENSE module register (capability × module)

| # | Capability | WIND | POWER | BILGE | TANKS | ENV | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S01 | Wind speed and angle measurement, locally displayed | `INCLUDED` | — | — | — | — | The headline sailing measurement; sells to sailors who do not want a whole new instrument ecosystem | `PARTIAL_PARSER` (NMEA 0183 wind parsing unit tests only; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, P-05) |
| S02 | DC voltage, current and derived charge state | — | `INCLUDED` | — | — | — | The most universal worry on an unattended boat | `TARGET` (no sensor hardware, P-05) |
| S03 | Bilge water presence / level | — | — | `INCLUDED` | — | — | The failure that sinks boats; local alarm value is immediate | `TARGET` (P-05) |
| S04 | Tank level (fuel / water) | — | — | — | `INCLUDED` | — | Operational planning without a new helm system | `TARGET` (P-05) |
| S05 | Compartment temperature, humidity and pressure context | — | — | — | — | `INCLUDED` | Environmental context (condensation, frost, heat) with no other product required | `TARGET` (P-05) |
| S06 | Calibration workflow with stored calibration state | `INCLUDED` | `INCLUDED` | `INCLUDED` | `INCLUDED` | `INCLUDED` | Without calibration a reading is not a measurement; this is not an upsell | `TARGET` |
| S07 | Units, source, timestamp, freshness and invalid/stale display | `INCLUDED` | `INCLUDED` | `INCLUDED` | `INCLUDED` | `INCLUDED` | Honest data state is a safety-of-understanding requirement in every module | `TARGET` |
| S08 | Local alarm / local indication where the module is designed with one | `INCLUDED` | `INCLUDED` | `INCLUDED` | `INCLUDED` | `INCLUDED` | The local function must survive any subscription, cloud or connectivity failure; D2 §5.3 governs which modules carry a local indication and none of them is a certified alarm | `TARGET` |
| S09 | Remote alert delivery ashore | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | SENSE alone never delivers remote alerts: that requires WATCH + connectivity + an active subscription (README §16 rule 6) | by design |
| S10 | Integration through MAREA HUB | `OPTIONAL` | `OPTIONAL` | `OPTIONAL` | `OPTIONAL` | `OPTIONAL` | HUB is a separate product; a module works without it within its own local scope | `BLOCKED` (H-04, P-02) |
| S11 | NMEA 2000 interface | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | Not implemented (stubs only), not licensed, not certified; no claim may be made | `BLOCKED` (`SENSE_NMEA2000 = NOT_IMPLEMENTED`, H-04, DEC-05) |
| S12 | Published accuracy, resolution or IP rating | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | `NOT_INCLUDED` | No figure and no ingress rating may appear before measurement | `BLOCKED` (`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`, H-05) |
| S13 | Certified alarm or safety-instrument status | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Never a certified alarm, never a distress or safety-of-life device | by design (claims policy §2) |

### 3.2 Module edition records — all fifteen fields per edition

**`SENSE-WIND` — MAREA SENSE Wind**
- **Edition ID.** `SENSE-WIND`.
- **Customer-facing name.** MAREA SENSE Wind.
- **Product family.** `SENSE` (`HARDWARE`), sensor module SKU.
- **Target segment.** Sailing-yacht owners who lack a reliable wind instrument or whose legacy masthead unit is at end of life, and who want measured wind without replacing the helm.
- **Capabilities included.** Wind speed/angle measurement displayed locally (S01); calibration workflow (S06); units/source/timestamp/freshness/invalid display (S07); local indication (S08).
- **Capabilities excluded.** Remote alert delivery (S09); NMEA 2000 interface (S11); published accuracy, resolution or IP rating (S12); certified-alarm status (S13); any steering use of wind data — a SENSE reading is never automatically a PILOT steering input (README §19).
- **Optional features.** HUB integration (S10, separate purchase); WATCH (separate product with its own subscription) for any remote alerting.
- **Prerequisites.** Compatible mounting and cable route (masthead work normally installer-led); calibration at installation; a consumer able to display the reading; measurement range and calibration procedure to be published with the module (`OPEN`).
- **Installation expectation.** Professional installation normally required for masthead work; a documented low-risk self-install path exists only if a validated rule is created — none exists today.
- **Subscription entitlement.** None (`subscriptionHypothesis: null`). Local measurement and indication are never gated by any entitlement.
- **Price hypothesis.** `NOT ESTABLISHED`. The from-EUR-99 entry hypothesis is not attributable to a named module (README §17).
- **Current engineering readiness.** `engineering = PARTIALLY_VERIFIED` scoped to parser-level unit tests only; `hardware = NOT_SELECTED`; `compliance = NOT_STARTED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`.
- **Current evidence.** Executed unit tests for NMEA 0183 wind parsing only (MC-02 §6.1); no sensor hardware, no calibration, no field accuracy, no ingress evidence (P-05, H-04).
- **Conditional edition viability.** `DEFINED` as a structure; not viable for sale until measurement, calibration and ingress evidence exist for the stated range.
- **Criteria that justify the edition before launch.** Measured accuracy and repeatability across the stated range; a validated calibration procedure; environmental/ingress evidence; a documented data path to a consumer; costed hardware and installation scope.

**`SENSE-POWER` — MAREA SENSE Power**
- **Edition ID.** `SENSE-POWER`.
- **Customer-facing name.** MAREA SENSE Power.
- **Product family.** `SENSE` (`HARDWARE`), sensor module SKU.
- **Target segment.** Owners of unattended or frequently unattended boats, and refit owners who want DC state without a new battery-management system.
- **Capabilities included.** DC voltage, current and derived charge-state measurement (S02); calibration workflow (S06); state/freshness display (S07); local indication (S08).
- **Capabilities excluded.** Remote alerts (S09); NMEA 2000 (S11); published accuracy/resolution/IP (S12); certified alarm (S13); any claim of battery protection, charging control or damage prevention — this is measurement only.
- **Optional features.** HUB integration; WATCH for remote alerts; a second monitored DC source where the module design supports it (`OPEN`).
- **Prerequisites.** Compatible shunt/fuse arrangement and cable route; electrical installation scope assessed by an installer; calibration at installation; measurement range published (`OPEN`).
- **Installation expectation.** Professional installation expected for any work inside a DC distribution system; no self-install rule is validated.
- **Subscription entitlement.** None.
- **Price hypothesis.** `NOT ESTABLISHED`; the from-EUR-99 entry hypothesis is not attributable to a named module.
- **Current engineering readiness.** `engineering = TARGET`; `hardware = NOT_SELECTED`; `compliance = NOT_STARTED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`.
- **Current evidence.** No power-monitoring hardware, calibration or measurement evidence exists (P-05, H-05).
- **Conditional edition viability.** `DEFINED` as a structure; viable only after electrical safety review and measured accuracy across the stated range.
- **Criteria that justify the edition before launch.** Measurement and repeatability evidence; electrical safety review of the installation; validated calibration; a documented display path; costed hardware and installation scope.

**`SENSE-BILGE` — MAREA SENSE Bilge**
- **Edition ID.** `SENSE-BILGE`.
- **Customer-facing name.** MAREA SENSE Bilge.
- **Product family.** `SENSE` (`HARDWARE`), sensor module SKU.
- **Target segment.** Owners of boats left on moorings or in marinas, and crews who want local bilge awareness without a remote service.
- **Capabilities included.** Bilge water presence/level measurement (S03); calibration workflow (S06); state display (S07); local indication (S08).
- **Capabilities excluded.** Remote alerts (S09 — a SENSE module has no connectivity of its own); NMEA 2000 (S11); published accuracy/resolution/IP (S12); certified-alarm status (S13); any claim to prevent flooding, sinking or damage.
- **Optional features.** HUB integration; WATCH for remote alerts; a second sensor point where the design supports it (`OPEN`).
- **Prerequisites.** Compatible mounting position and cable route; access for inspection; calibration/trigger test at installation; false-trigger behaviour documented (`OPEN`).
- **Installation expectation.** Installer or competent owner inside a documented configuration; no validated self-install rule exists.
- **Subscription entitlement.** None.
- **Price hypothesis.** `NOT ESTABLISHED`.
- **Current engineering readiness.** `engineering = TARGET`; `hardware = NOT_SELECTED`; `compliance = NOT_STARTED`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`.
- **Current evidence.** No bilge sensor, detection or false-trigger evidence exists (P-05, H-05).
- **Conditional edition viability.** `DEFINED` as a structure; viable only after detection, false-alarm and failure-mode testing.
- **Criteria that justify the edition before launch.** Detection test matrix (wet/dry, dirt, motion); false-alarm rate evidence; failure-mode analysis (sensor loss must be visible, not silent); ingress evidence; a documented display path.

**`SENSE-TANKS` — MAREA SENSE Tanks**
- **Edition ID.** `SENSE-TANKS`.
- **Customer-facing name.** MAREA SENSE Tanks.
- **Product family.** `SENSE` (`HARDWARE`), sensor module SKU.
- **Target segment.** Cruising owners and small charter operators needing fuel/water level awareness without a new tank-sender ecosystem.
- **Capabilities included.** Tank-level measurement for compatible tanks (S04); calibration workflow including a calibration curve (S06); state display (S07); local indication (S08).
- **Capabilities excluded.** Remote alerts (S09); NMEA 2000 (S11); published accuracy/resolution/IP (S12); certified alarm (S13); any claim of legally valid tank measurement for commercial fuel accounting.
- **Optional features.** HUB integration; WATCH for remote alerts; multi-tank coverage only where the module design supports it (`OPEN`).
- **Prerequisites.** Compatible tank material, sender type and access; a calibration curve per tank shape; installation that does not create a leak path; sender compatibility list published (`OPEN`).
- **Installation expectation.** Professional installation expected for any tank penetration; documented self-install only after a validated rule exists.
- **Subscription entitlement.** None.
- **Price hypothesis.** `NOT ESTABLISHED`.
- **Current engineering readiness.** `engineering = TARGET`; `hardware = NOT_SELECTED`; `compliance = NOT_STARTED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`.
- **Current evidence.** No tank sender hardware or calibration evidence exists (P-05, H-05).
- **Conditional edition viability.** `DEFINED` as a structure; viable only after a validated sender list and calibration across representative tank shapes.
- **Criteria that justify the edition before launch.** Sender compatibility evidence; calibration accuracy across tank shapes; leak-path installation review; a documented display path; costed scope.

**`SENSE-ENV` — MAREA SENSE Environment**
- **Edition ID.** `SENSE-ENV`.
- **Customer-facing name.** MAREA SENSE Environment.
- **Product family.** `SENSE` (`HARDWARE`), sensor module SKU.
- **Target segment.** Owners monitoring compartments for condensation, frost, heat or engine-room conditions.
- **Capabilities included.** Compartment temperature, humidity and pressure context (S05); calibration (S06); state display (S07); local indication (S08).
- **Capabilities excluded.** Remote alerts (S09); NMEA 2000 (S11); published accuracy/resolution/IP (S12); certified alarm (S13); any claim of certified fire, gas or safety detection.
- **Optional features.** HUB integration; WATCH for remote alerts; multiple placement points where the design supports it (`OPEN`).
- **Prerequisites.** Suitable placement out of direct spray and heat sources; cable route; calibration; placement rules published (`OPEN`).
- **Installation expectation.** Documented low-risk placement may be owner-installable once a validated rule exists; none exists today.
- **Subscription entitlement.** None.
- **Price hypothesis.** `NOT ESTABLISHED`.
- **Current engineering readiness.** `engineering = TARGET`; `hardware = NOT_SELECTED`; `compliance = NOT_STARTED`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`.
- **Current evidence.** No environmental sensor or placement evidence exists (P-05, H-05).
- **Conditional edition viability.** `DEFINED` as a structure; viable only after measurement and placement evidence.
- **Criteria that justify the edition before launch.** Measurement evidence in the stated range; placement guidance validated in real compartments; ingress/condensation behaviour documented; a documented display path.

### 3.3 Kit edition records — a kit is packaging, never a new capability

A kit is a **preconfigured bundle of module SKUs**. It must not include anything its modules cannot do, and it
carries an independent price/cost sheet that does not exist yet.

**`SENSE-ESSENTIALS` — MAREA SENSE Essentials** — verdict `DEFINED`.
- **Edition ID.** `SENSE-ESSENTIALS`.
- **Customer-facing name.** MAREA SENSE Essentials.
- **Product family.** `SENSE` (`HARDWARE`), kit of module SKUs.
- **Target segment.** The absent owner: a boat left unattended that needs DC state and bilge awareness first.
- **Capabilities included.** The capabilities of its two modules only — `SENSE-POWER` (S02) and `SENSE-BILGE` (S03), plus S06, S07 and S08.
- **Capabilities excluded.** Wind, tanks and environment measurement; remote alerts (S09); NMEA 2000 (S11); published accuracy/IP (S12); certified alarm (S13); installation labour; any WATCH subscription.
- **Optional features.** HUB integration (separate); WATCH purchased separately for remote alerts.
- **Prerequisites.** Both modules' prerequisites; one installation visit in principle (`OPEN`); a calibration and verification pass for each module.
- **Installation expectation.** Professional installation expected for the electrical and bilge work; quoted separately; no included labour.
- **Subscription entitlement.** None for the kit. Remote notification requires WATCH plus connectivity plus its subscription — never implied by the kit.
- **Price hypothesis.** `NOT ESTABLISHED`; a kit needs its own price/cost sheet and is never the sum of module hypotheses.
- **Current engineering readiness.** `hardware = NOT_SELECTED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; `compliance = NOT_STARTED`.
- **Current evidence.** Its modules' evidence — `TARGET` for both (P-05, H-05).
- **Conditional edition viability.** `DEFINED` and the most coherent first kit, because it addresses the two anxieties that motivate purchase; sale is blocked on measurement evidence for both modules.
- **Criteria that justify the edition before launch.** Both modules' measurement evidence; a measured single-visit installation scope; a kit-specific costed sheet; explicit clarity that remote alerts are a separate WATCH purchase.

**`SENSE-SAIL` — MAREA SENSE Sail** — verdict `CONDITIONAL`.
- **Edition ID.** `SENSE-SAIL`.
- **Customer-facing name.** MAREA SENSE Sail.
- **Product family.** `SENSE` (`HARDWARE`), kit of module SKUs.
- **Target segment.** Sailing owners who want wind and environmental context before any other monitoring.
- **Capabilities included.** `SENSE-WIND` (S01) and `SENSE-ENV` (S05), plus S06, S07 and S08 — nothing more.
- **Capabilities excluded.** Remote alerts; NMEA 2000; accuracy/IP claims; certified alarm; installation labour; any claim that a wind reading is a qualified steering input for PILOT Sail.
- **Optional features.** HUB integration; WATCH separately; PILOT Sail wind qualification is a **separate** condition, not a kit feature.
- **Prerequisites.** Both modules' prerequisites, including masthead installation for wind and a calibration pass; wind measurement evidence.
- **Installation expectation.** Professional installation required for masthead work; quoted separately.
- **Subscription entitlement.** None.
- **Price hypothesis.** `NOT ESTABLISHED`.
- **Current engineering readiness.** `engineering = PARTIALLY_VERIFIED` for wind parsing only; `hardware = NOT_SELECTED`.
- **Current evidence.** Wind parser unit tests only; no sensor, masthead, calibration or environmental evidence (P-05).
- **Conditional edition viability.** `CONDITIONAL` — the condition is wind measurement and calibration evidence plus a masthead installation scope. If wind accuracy cannot be evidenced, the kit must not ship and customers buy modules individually.
- **Criteria that justify the edition before launch.** Wind measurement and calibration evidence; masthead installation and cable-route scope; kit-specific costed sheet; a documented wind-data consumer path.

**`SENSE-SYSTEMS` — MAREA SENSE Systems** — verdict `CONDITIONAL`.
- **Edition ID.** `SENSE-SYSTEMS`.
- **Customer-facing name.** MAREA SENSE Systems.
- **Product family.** `SENSE` (`HARDWARE`), kit of module SKUs.
- **Target segment.** Owners/operators standardising a fuller measured picture, including small charter or maintenance operators buying per vessel (not as a fleet platform).
- **Capabilities included.** `SENSE-POWER` (S02), `SENSE-BILGE` (S03), `SENSE-TANKS` (S04) and `SENSE-ENV` (S05), plus S06, S07 and S08.
- **Capabilities excluded.** Wind measurement; remote alerts; NMEA 2000; accuracy/IP claims; certified alarm; installation labour; "expanded engine/utility conditions" from the portfolio — that would need a module and evidence that do not exist (`OPEN`).
- **Optional features.** HUB integration; WATCH separately; additional tank or environment points where supported (`OPEN`).
- **Prerequisites.** All four modules' prerequisites; a validated multi-module installation; a consumer able to display combined readings.
- **Installation expectation.** Professional installation required across several compartments; multi-module labour scope measured only after measurement evidence exists.
- **Subscription entitlement.** None.
- **Price hypothesis.** `NOT ESTABLISHED`.
- **Current engineering readiness.** `engineering = TARGET` across four modules; `hardware = NOT_SELECTED`; `compliance = NOT_STARTED`.
- **Current evidence.** No measurement evidence for any of the four modules (P-05).
- **Conditional edition viability.** `CONDITIONAL` — the condition is four simultaneous measurement claims plus a validated multi-module installation. Without both, the kit is an expensive bundle of unverified parts.
- **Criteria that justify the edition before launch.** All four modules' evidence; multi-module installation scope and measured labour; kit-specific costed sheet; a documented consumer for combined readings.
### 3.4 SENSE edition verdicts

- **Modules are the product; kits are packaging.** The five module SKUs are the honest unit of sale because each
  carries its own measurement claim, its own calibration and its own install scope.
- **Two kits are conditional for a structural reason, not a marketing one.** Sail depends on wind accuracy;
  Systems depends on four simultaneous measurement claims and a multi-module installation. Only Essentials is
  `DEFINED`, because only it addresses one coherent anxiety with two modules.
- **No kit price, module prices beyond the entry hypothesis, or "system" price exists.** The portfolio's
  "starting EUR 99" is a single-module entry hypothesis, not a module list.
- **Remote alerts are never a SENSE feature.** A customer who wants alerts ashore needs WATCH; conflating the
  two would misdescribe both products (README §16 rule 6).

---

## 4. MAREA WATCH — hardware plus a service, `DEFINED` and `CONDITIONAL`

**What the family does for the customer.** MAREA WATCH is intended to tell an owner, ashore, that something on
an unattended boat needs attention — position/geofence, bilge water, DC state, temperature, and the freshness of
the connection itself — through a subscription service that depends on power, network coverage and a
notification provider's delivery. It is **conditional awareness, not a guarantee**: it is not a certified
distress service, not a theft-prevention system and it has **no helm or steering function of any kind**. Every
alert is described with the README §20 state model, and provider acceptance is never presented as human
receipt.

### 4.1 WATCH capability register

| # | Capability | Core | Plus | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- |
| W01 | Device identity, ownership registration and revocation | `INCLUDED` | `INCLUDED` | Without identity there is no safe sharing, transfer or replacement; not a monetisable feature | `NOT_FOUND` (`WATCH_DEVICE_IDENTITY`, P-06, X-07) |
| W02 | Position reporting and geofence alerts | `INCLUDED` | `INCLUDED` | The base reason to buy a monitoring device | `NOT_FOUND` (`WATCH_INGESTION`, P-06) |
| W03 | Bilge water / high-water alert | `INCLUDED` | `INCLUDED` | The failure with the highest consequence on an unattended boat | `NOT_FOUND` (P-06; SENSE module required where measurement is delegated) |
| W04 | DC/battery state and shore-power context | `INCLUDED` | `INCLUDED` | Explains most "why is my boat dead" calls | `NOT_FOUND` (P-06) |
| W05 | Temperature context | `INCLUDED` | `INCLUDED` | Freeze/heat/condensation awareness | `NOT_FOUND` (P-06) |
| W06 | Alert state model and per-alert freshness/timestamps | `INCLUDED` | `INCLUDED` | Honesty about what was observed, queued, accepted, delivered or acknowledged is the product's trust core | `NOT_FOUND` (`WATCH_NOTIFICATION_PIPELINE`, P-06) |
| W07 | Multi-user access (owner + family) | `INCLUDED` | `INCLUDED` | A boat is shared; a single login would be a hostile limitation | `NOT_FOUND` (X-07) |
| W08 | Technician/installer time-limited access | `INCLUDED` | `INCLUDED` | Needed for support and commissioning; must be revocable and audited | `NOT_FOUND` (X-07) |
| W09 | History and retention of observations | `INCLUDED_CONDITIONAL` (short window) | `INCLUDED_CONDITIONAL` (extended window) | Retention is a real storage/compliance cost and a real Plus benefit; windows `OPEN` | `NOT_FOUND`; retention rights `OPEN` (D-09) |
| W10 | Additional inputs and configurable alert rules | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | The genuine Plus difference — only if validated and costed | `NOT_FOUND` |
| W11 | Organisation/vessel sharing beyond one owner's boat | `NOT_INCLUDED` | `OPTIONAL` | FLEET is a separate product; WATCH Plus must not become a fleet platform by stealth | `NOT_FOUND` (README §19) |
| W12 | Remote switching / relay actuation | `NOT_INCLUDED` | `NOT_INCLUDED` | Not part of the WATCH definition; any future actuation is `OPEN`, safety-reviewed and never steering | `OPEN` |
| W13 | Helm, steering or autopilot control | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | No workflow in WATCH may steer the vessel, engage the pilot or command the helm | by design (README §16 rule 1, §19) |
| W14 | Theft prevention or recovery guarantee | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Never claimed: alerts depend on power, coverage and provider delivery | by design (claims policy §2 Class X) |
| W15 | Certified distress, SOLAS, GMDSS or safety-of-life service | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Not a distress service; must be stated wherever alerts are described | by design |
| W16 | Connectivity, SIM/data and roaming terms | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | Required for the service to work at all; terms and cost are `OPEN` and never implied included in the hardware price | `NOT_FOUND` (`WATCH_CONNECTIVITY_CONTRACT`, H-12) |
| W17 | Subscription entitlement and its boundaries | `INCLUDED` (required) | `INCLUDED` (required) | A service without an entitlement model is not a product; the entitlement must never gate local safety functions | `NOT_FOUND` (`WATCH_SUBSCRIPTION_SERVICE`, P-06) |
| W18 | Device replacement, Core→Plus change, transfer on sale | `INCLUDED` | `INCLUDED` | Second-hand boats and failed units are normal, not edge cases | `NOT_FOUND` (X-07) |

### 4.2 Edition record — `WATCH-CORE` (MAREA WATCH Core)

- **Edition ID.** `WATCH-CORE`.
- **Customer-facing name.** MAREA WATCH Core.
- **Product family.** `WATCH` (`HARDWARE_SERVICE`: hardware plus recurring service).
- **Target segment.** Owners leaving a boat unattended in a marina or on a mooring in Galicia/northern Portugal;
  secondary: small charter/maintenance operators monitoring a few vessels per vessel (not as a fleet product).
- **Capabilities included.** W01–W08, W09 short window, W16–W18.
- **Capabilities excluded.** Additional inputs and alert rules (Plus), organisation/fleet sharing, remote
  switching, any steering/helm function (`NONE_BY_DESIGN`), theft-prevention guarantee, certified distress
  service, SIM/data plan (not included in hardware price), installation labour.
- **Optional features.** WATCH Plus where genuinely justified and costed; SENSE modules supplying additional
  measured inputs; HUB as a local data source; technician access for commissioning.
- **Prerequisites.** Boat with a suitable power supply and mounting location; mobile coverage at the berth
  (unquantified, H-12); device registration and ownership proof; active subscription for any remote function;
  consent and privacy notice for position processing (X-07).
- **Installation expectation.** A hardware installation by the owner or an installer, plus account/device
  commissioning; installation scope and price `OPEN`, never included in the EUR 299 hardware hypothesis.
- **Subscription entitlement.** **Required** for remote monitoring. Hardware hypothesis EUR 299
  `HYPOTHESIS_UNAPPROVED`; subscription hypothesis **from EUR 9.90/month** `HYPOTHESIS_UNAPPROVED`. What the
  subscription includes — connectivity cap, device count, user count, retention — is `OPEN`.
- **Price hypothesis.** EUR 299 hardware and from EUR 9.90/month subscription, both `HYPOTHESIS_UNAPPROVED`;
  connectivity/SIM/data cost is **not** included and is `NOT ESTABLISHED`.
- **Current engineering readiness.** `engineering = NOT_VERIFIED`, `hardware = NOT_SELECTED`,
  `compliance = NOT_STARTED`; `WATCH_INGESTION = NOT_VERIFIED`,
  `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`, `WATCH_DEVICE_IDENTITY = NOT_FOUND`,
  `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`, `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` (P-06, H-12, X-07).
- **Current evidence.** `NOT_FOUND` for the entire service; MC-02 records no telemetry ingestion, no alert
  pipeline, no device identity, no billing/entitlement and no connectivity contract.
- **Conditional edition viability.** `DEFINED` as a structure, but **not viable for sale**: the service must be
  built (P-06 = `BUILD`), and its two recurring cost inputs (connectivity, notification provider) do not exist.
  It is the batch-02 edition most exposed to unquantified recurring cost.
- **Criteria that justify the edition before launch.** (1) Working ingestion, identity and notification pipeline
  with repeated delivery tests under real network loss; (2) written connectivity terms and a measured data cost;
  (3) a notification-provider contract with recorded delivery behaviour; (4) privacy/DPIA and device-identity
  security; (5) a support/RMA process and terms; (6) a costed basis for EUR 299 + 9.90/month or a replacement;
  (7) explicit alert-language review (no distress, no guarantee).

### 4.3 Edition record — `WATCH-PLUS` (MAREA WATCH Plus)

- **Edition ID.** `WATCH-PLUS`.
- **Customer-facing name.** MAREA WATCH Plus.
- **Product family.** `WATCH`.
- **Target segment.** Owners or small operators who need more monitored inputs, configurable alert rules,
  longer history and controlled sharing beyond a single user — only where that need is validated.
- **Capabilities included.** Everything in Core, plus W10 (additional inputs and alert rules), W09 extended
  window, and W11 organisation sharing only if separately validated (otherwise `OPTIONAL`).
- **Capabilities excluded.** Any claim that Plus improves alert speed, reliability or coverage (no evidence
  exists); fleet-platform behaviour; remote switching; steering (`NONE_BY_DESIGN`); distress service.
- **Optional features.** SENSE modules; HUB; installer/technician workflows.
- **Prerequisites.** As Core, plus a validated input compatibility envelope and a support model for more
  complex configurations.
- **Installation expectation.** As Core; additional inputs may add installation work, quoted separately.
- **Subscription entitlement.** **Required**, at a **`NOT ESTABLISHED`** price. Plus must not be priced by
  adding a uniform uplift to Core before its additional benefits are validated and costed.
- **Price hypothesis.** **`NOT ESTABLISHED`** (README §17 prohibits a `WATCH-PLUS` price).
- **Current engineering readiness.** `engineering = NOT_VERIFIED`; the additional benefits do not exist in any
  form.
- **Current evidence.** `NOT_FOUND`; no input-expansion capability, no rule engine, no extended retention.
- **Conditional edition viability.** `CONDITIONAL` — if the additional benefits cannot be validated and costed,
  `WATCH-PLUS` must not ship; the customer buys Core with its declared limits, and this document must be
  revised rather than the label retained.
- **Criteria that justify the edition before launch.** (1) A validated additional-input list with recorded
  compatibility; (2) a configurable-rule engine with tested false-positive behaviour; (3) a retention costed
  basis and rights position (D-09); (4) genuine multi-user/organisation value without becoming FLEET;
  (5) all Core criteria.

### 4.4 WATCH edition verdicts

- **Core is the honest product; Plus is a hypothesis.** The single clearest fact about this family is that the
  service is `NOT_FOUND`; a second edition with more benefits cannot be sold before the first edition exists.
- **Hardware price and subscription price are separate claims.** EUR 299 excludes connectivity and SIM/data;
  the subscription's contents are `OPEN`. Presenting either as all-in would misdescribe the offer.
- **The value is honesty about delivery, not speed of notification.** No "immediate", "24/7", "guaranteed" or
  "real-time" language may describe WATCH (claims policy §2 Class P/X; README §20).
- **WATCH never steers.** No edition, plan or workflow may engage the pilot, command the helm or actuate
  steering. Read-only PILOT status is the only relationship (README §19).

---

## 5. Cross-family comparison — what each family does for the customer

| Question the customer asks | MAREA PILOT | MAREA SENSE | MAREA WATCH |
| --- | --- | --- | --- |
| What do I actually buy? | A surveyed, installed, supervised steering system (quoted per vessel) | A hardware sensor module, or a kit of modules | A monitoring device plus a recurring monitoring service |
| Does it work on its own? | Yes as an installed system, within verified modes — but only with installation | Yes locally (measurement + local indication); no remote alerts | Yes with connectivity and an active subscription; nothing remote without them |
| Does it need a subscription? | No | No | **Yes** for remote monitoring |
| What is the edition choice about? | Surveyed scope: standard installation, verified wind mode, or bespoke package | Which quantity you measure; kits preconfigure a set of modules | How much monitoring/history/sharing is configured (Plus is conditional) |
| What must I still buy separately? | Nothing implied; every inclusion/exclusion is in the quotation | HUB (optional), WATCH (for remote alerts), installation materials | SIM/data/connectivity as contracted; SENSE inputs; installation labour |
| Is a site survey or assessment required? | **Mandatory** before pricing | A compatibility/installation assessment | Coverage and installation assessment |
| Can I install it myself? | No — installer-led only | Only in a documented low-risk configuration; none validated today | Hardware may be owner-installed; service still requires commissioning |
| What happens when data is missing? | The mode drops out; manual takeover is always available | The reading is shown invalid/stale, never as data | The last-known-good value is shown with its age; never presented as current |
| What safety claim is never made? | Autonomy, remote helm, collision avoidance, certification | Accuracy figures, IP ratings, certified alarms | Guaranteed/immediate delivery, theft prevention, distress service |
| Can it steer the vessel? | Only the PILOT control head, locally, supervised | Never | Never |

---

## 6. Cross-product inclusion boundaries (the most common customer misunderstanding)

| Boundary | Rule (never deviate in copy, quotation or catalogue) |
| --- | --- |
| Buying PILOT does **not** include | NAV, HUB, AIS, SENSE or WATCH; charts/weather; remote status; a second station; spare drives; installation outside the quoted scope; any certification |
| Buying SENSE does **not** include | HUB; WATCH or any remote alerting; connectivity; a certified alarm; an accuracy or ingress claim; a steering input qualification |
| Buying WATCH does **not** include | SIM/data/connectivity cost; any SENSE module; HUB; FLEET; steering or helm control; theft prevention; a distress service; an uninterrupted-connectivity promise |
| Buying any edition does **not** include | An approved price, a delivery date, a certification, a support SLA, an installation time or price, or a compatibility result |
| A kit does **not** include | Any capability its modules lack; a price computed from module hypotheses; installation labour |
| No MAREA product in this batch includes | Another MAREA product, a bundle entitlement, or any automatic steering authority |

---

## 7. Decisions taken in this document (recorded in `DECISION-LOG.md` as D-008, D-009 and D-011)

1. **Thirteen edition-level objects, no more.** Three PILOT objects, eight SENSE objects (five modules, three
   kits), two WATCH objects. No fourth PILOT edition, no sixth SENSE module, no third WATCH edition.
2. **Verdicts adopted exactly as README §14/§18 fix them:** `PILOT-COASTAL` `DEFINED`; `PILOT-SAIL`
   `CONDITIONAL`; `PILOT-PRO` `INSTALLATION_PACKAGE`; `SENSE-ESSENTIALS` `DEFINED` and every module `DEFINED`;
   `SENSE-SAIL` and `SENSE-SYSTEMS` `CONDITIONAL`; `WATCH-CORE` `DEFINED`; `WATCH-PLUS` `CONDITIONAL`.
3. **Safety and honesty are never edition features.** E-stop, motor isolation, manual takeover, calibration,
   stale/invalid display, local function without subscription, device identity, data export and ownership
   transfer are included in the base configuration of every edition.
4. **Remote alerting is never a SENSE feature and WATCH never steers.** The two boundaries are restated in
   every downstream document (D5, D7, D8, D9) because they are the two most likely customer misreadings.
5. **PILOT Pro is a quoted service scope, not a retail SKU** (README §18, D-008), and the PILOT starting price
   is a hypothesis about a configuration, not a product price (D-009).
6. **`WATCH-PLUS` must not be priced by uplift**; its additional benefits must be validated and costed first.

## 8. Open edition questions (explicitly unresolved)

| # | Question | Why it is open | Owner |
| --- | --- | --- | --- |
| E-09 | Exact Coastal drive/steering envelope and Pro refusal boundary | No frozen hardware or survey methodology (H-03, H-05, H-07) | Hardware + safety |
| E-10 | Whether wind-angle mode can be verified at all on representative vessels | No sea trials (`PILOT_SEA_TRIALS = NOT_PERFORMED`) | Safety + engineering |
| E-11 | Whether route/track following belongs to any edition | Depends on NAV integration and mode verification (H-01, D5) | Product + engineering |
| E-12 | Exact module measurement ranges, accuracy and ingress evidence | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED` | Engineering + compliance |
| E-13 | Kit compositions and whether Systems includes an engine/utility module | No such module is specified; no evidence (P-05) | Product + hardware |
| E-14 | Retention windows and organisation-sharing scope for WATCH Plus | D-09 rights position and storage design unresolved | Product + counsel |
| E-15 | What the WATCH subscription includes (connectivity cap, device count, users, history) | `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`; no connectivity terms (H-12) | Product + finance |
| E-16 | Whether any price hypothesis survives bottom-up costing | No BOM, quotes, connectivity or channel terms (X-05) | Finance + procurement |

None of these changes the edition *structure*; each changes the *contents or the price* of an edition and must
be closed before any product page, quotation or catalogue entry is published.

## 9. Status statement

This document defines editions for products that are **completely specified and not for sale**. It approves no
price, creates no purchasable SKU, certifies nothing and asserts that no capability above is implemented.
MAREA PILOT, MAREA SENSE and MAREA WATCH are `DEFINED`; engineering readiness is `NOT_VERIFIED` (SENSE:
`PARTIALLY_VERIFIED` for parser-level unit tests only); hardware is `NOT_SELECTED`; conformity is `NOT_STARTED`;
one safety gate and five WATCH service components are `BLOCKED`/`NOT_FOUND`; brand clearance is `NOT_GRANTED`.
PILOT is supervised only and has no autonomous or remote steering path. AIS-related data rights, when mentioned,
remain `NOT_GRANTED` (D-09). Every price in this document is `HYPOTHESIS_UNAPPROVED` or `NOT ESTABLISHED`.

Related documents: `docs/marea/products/README.md`; `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (D5);
`PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` (D6); `CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` (D7);
`PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` (D9); `MAREA-PILOT-COMMERCIAL-SPEC.md` (D1),
`MAREA-SENSE-COMMERCIAL-SPEC.md` (D2), `MAREA-WATCH-COMMERCIAL-SPEC.md` (D3).
