# MAREA PILOT — Design-stage safety case outline (MC-06 / D10a-PILOT-SAFETY)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D10a-PILOT-SAFETY |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Owner | Independent Marine Safety Engineer (safety function, independent of the PILOT Product Director and of PILOT engineering) |
| Document status | `INTERNAL_DESIGN_STAGE` · **NOT A CERTIFICATION** · **NOT A TEST REPORT** · **NOT A SEA-TRIAL RECORD** · **NOT AN APPROVED SAFETY CASE** · `INTERNAL_ONLY` |
| Product | MAREA PILOT — `HARDWARE_SOFTWARE`, supervised steering control (product id `PILOT`; editions `PILOT-COASTAL`, `PILOT-SAIL`, `PILOT-PRO` per `docs/marea/products/README.md` §2, §12, §18) |
| Lifecycle state | `DEFINED` (binding vocabulary; no PILOT article exists and nothing is sale-ready) |
| Branch | `feature/marea-mc06-pilot-sense-watch-products` |
| Date | 2026-10-30 |
| Contract authority | `docs/marea/products/README.md` §4 (readiness dimensions), §5 (evidence classes), §14–§19 (PILOT decisions, claim rules, cross-product authority), §23 (MC-06 prohibitions) |
| Relationship to the commercial specification | Companion to `docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md` (D1-PILOT). D1 defines the intended commercial product and its intended safety design; this outline defines the safety obligations, verification evidence and gates that an implementation must satisfy. Where the two differ on a safety matter, this outline may only **tighten** the requirement; D1 is not safety evidence and this outline is not a commercial specification |
| Relationship to MC-02 | Consumes the audit findings of `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` and `docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §3, §5 as evidence; it does not overturn them |
| Classification | Internal pre-contractual safety dossier. Not an installation instruction, not an operator manual, not a declaration of conformity, not an insurance document, not a legal opinion |
| Safety gate | `PILOT_SAFETY_GATE = BLOCKED` |
| Prepared by | AI agent acting in the Independent Marine Safety Engineer role, MC-06 run. This is the reason the document cannot be signed: a human qualified engineer is required (§19) |

## 0. Document control, status and reading rules

### 0.1 What this document is, and what it is not

This is a **design-stage safety dossier**: it states intended use, eligibility boundaries, foreseeable misuse,
hazard categories, a proposed risk method, safety goals, derived safety requirements, failure-detection
requirements, safety-state analysis, manual-takeover and independent-stop requirements, interface authority,
commissioning and sea-trial requirements, standards research, and the evidence needed to close the PILOT
safety gate.

It is **not**:

- a certification, an approval, a declaration of conformity, a CE marking, a type approval, a class
  certificate or a notified-body opinion;
- a test report, a bench log, a measurement record, an instrumented timing result, a sea-trial report or a
  commissioning record;
- a demonstration that any safety function works, on hardware or on water;
- an installation instruction or an operator manual (those documents do not exist yet);
- a statement that MAREA PILOT is safe, fit for purpose, lawful to sell or ready to install.

No physical test was performed for MC-06. No hardware was energised, no motor, drive, relay, GPIO, PWM or
actuator command was issued, no steering code was written, no firmware was flashed and no vessel was used.
Those are deliberate limits, not omissions to be inferred around.

### 0.2 Safety gate state (canonical strings, README §15 — never upgraded)

| Canonical state | Value | Meaning and blocker |
| --- | --- | --- |
| `PILOT_SAFETY_GATE` | `BLOCKED` | H-01, P-04: no bench evidence, no sea trial, no independent verification and no conformity assessment exist |
| `PILOT_PHYSICAL_ESTOP_EVIDENCE` | `NOT_FOUND` | H-10: the E-stop concept is GPIO-level only; no physical article, rating, wiring, test or record exists |
| `PILOT_MOTOR_ISOLATION_EVIDENCE` | `NOT_FOUND` | H-03, H-10: no independent motor-power isolation evidence exists and the motor link itself is contradictory |
| `PILOT_RUDDER_FEEDBACK_EVIDENCE` | `NOT_FOUND` | H-01: no rudder or steering position feedback exists |
| `PILOT_SEA_TRIALS` | `NOT_PERFORMED` | No supervised sea trial exists in any repository, for any mode, on any vessel |

These five values are the controlling state of the PILOT programme at MC-06. No section of this outline may
be read as upgrading them.

### 0.3 Readiness dimensions relevant to safety (README §4, never collapsed)

| Dimension | Value at MC-06 | Safety consequence |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | The intended product is fully specified; the safety argument is only outlined |
| `engineering` | `NOT_VERIFIED` | Partial software safety logic exists in an audited prototype; no hardware or vessel verification exists |
| `hardware` | `NOT_SELECTED` | No BOM, enclosure, harness, drive selection, control-head article or serial traceability (H-05, H-07) |
| `compliance` | `NOT_STARTED` | No EMC, RED, LVD, GPSR, RoHS, WEEE or CRA assessment; no declaration of conformity; CRA duties are not implemented (H-06, H-13) |
| `licensing` | `NOT_CLEARED` | OPEN-MARINE grants no reuse right; firmware redistribution into sold boards is not authorised (L-01–L-03) |
| `availability` | `NOT_FOR_SALE` | `PILOT_SAFETY_GATE = BLOCKED` and no SKU is orderable |

### 0.4 Evidence classes and claim rules (README §5, §16)

Every substantive factual statement in this outline carries one of these labels, and nothing is asserted
without one:

| Class | Meaning in this document |
| --- | --- |
| `VERIFIED_REPO` | Verifiable in this repository; a path is cited |
| `VERIFIED_EXTERNAL` | Verifiable at the cited public official source with a check date (all checks 2026-10-30) |
| `ASSUMPTION` | An explicit planning assumption, stated as such, not evidence |
| `HYPOTHESIS` | A commercial or price assumption awaiting approval (used only where commercial context is unavoidable) |
| `OPEN` | Fact not yet established; the intended behaviour is still specified |
| `BLOCKED` | An external condition (licence, certificate, article, measurement) prevents closure |

The prohibited placeholder token is not used anywhere in this document. No invented test, certificate,
standard applicability, measurement, sea trial, installer, supplier or approval is introduced. The claim
rules of `docs/marea/products/README.md` §16 apply in full: PILOT is supervised; there is no autonomy,
collision-avoidance, unattended-watch or certification claim; software watchdogs never replace physical
safeguards; no unit test proves vessel safety; no AI agent may steer a vessel.

### 0.5 Method, sources and limits of the analysis

Method used for MC-06:

1. Read the PILOT safety-relevant audit evidence: `docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md`
   §3.1–§3.7 (feature matrix F-A01–F-A28, discrepancies D-01–D-06, findings F-01–F-12, gates G1–G9),
   `docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §7 (gaps G1–G4, G9), and
   `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` (H-01, H-02, H-03, H-05, H-06, H-07, H-10,
   H-13, P-04, P-10).
2. Derive safety goals and requirements from the intended use, the hazard categories and the audit findings;
   state each requirement with its verification method and its true current evidence state.
3. Research the actual scope of the candidate EU acts and marine standards from official sources only; quote
   only what the official scope text supports; declare **no** standard applicable and no conformity.
4. Record what evidence would close each gate, and who must produce and sign it.

Limits: this is a paper analysis. It does not execute code, energise hardware, measure timing, simulate a
sea state or inspect a vessel. Statements about prototype behaviour are statements about audited code and
documentation (`PHYSICAL_TEST_NOT_VERIFIED` in MC-02 terms), never about a built or operated article.

### 0.6 Independence and review status

This outline was written by the safety function separately from the commercial specification and without
access to a PILOT implementation (none exists). It has **not** been reviewed or approved by a human. The
required independence arrangements are stated in §19. Until the approvals in §19 exist, this document is an
input to a safety case, not a safety case.

### 0.7 Contents

| Section | Subject |
| --- | --- |
| §0 | Document control, status, canonical states, evidence classes, method, independence |
| §1 | Intended use, users and operating environment; intended modes; non-uses |
| §2 | Vessel and steering eligibility envelope; "not assessable yet" list; survey criteria |
| §3 | Foreseeable misuse |
| §4 | Hazard analysis: proposed method, risk-matrix convention, hazard register |
| §5 | Safety goals SG-01–SG-10 |
| §6 | Safety requirements SR-01–SR-49 with verification method and evidence state |
| §7 | Failure-detection requirements |
| §8 | Safety state by fault and by vessel configuration; no universal de-energisation |
| §9 | Manual takeover provisions and independence |
| §10 | Physical E-stop and independent motor-power isolation |
| §11 | Watchdog independence and the limits of software watchdogs |
| §12 | Interface authority map; prohibition of remote/cloud steering |
| §13 | Safe commissioning requirements |
| §14 | Supervised sea-trial requirements |
| §15 | Standards and conformity route research (official sources, access dates) |
| §16 | Verification and evidence plan; physical/bench evidence |
| §17 | PILOT safety gate = BLOCKED: closing conditions |
| §18 | Residual-risk disclosure requirements for the future owner document |
| §19 | Signatories, independence and limitation statements |
| §20 | Traceability annex: blockers, internal references, external sources, declarations |
| §21 | Change control and next actions |

---

## 1. Intended use, intended users and intended operating environment

### 1.1 Intended use statement

`ASSUMPTION` / `OPEN` (design intent; no product exists): MAREA PILOT is intended to be a **supervised**
steering-control system for eligible recreational craft. Within a vessel- and mode-specific verified
envelope, it holds a heading, holds a wind angle or follows a route, while a competent person remains at the
helm, keeps a proper lookout and can take manual control at any time. It is engaged and disengaged locally,
from a physical control head inside the vessel, after an explicit human action.

It is not intended to be, and must never be described as: autonomous, unattended, remotely operated,
collision-avoiding, a substitute for watchkeeping, a certified marine product or a safety-of-life device.
The skipper's responsibility for navigation, crew and vessel is unchanged at all times
(`VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4.3; required PILOT disclaimer, §9 of
that policy).

### 1.2 Intended users

| User | Intended role and authority | Required competence (design requirement) | Prohibited assumptions | Current state |
| --- | --- | --- | --- | --- |
| **Skipper / operator** | Commands the vessel; decides when PILOT may be used; engages and disengages locally; takes manual control; performs pre-use checks; acknowledges alarms; stops using the system when conditions exceed the envelope | Competent to command the vessel; trained on this installation's engage/disengage, manual takeover, E-stop and alarm handling before first unsupervised use | Must not leave the helm unattended; must not treat PILOT as collision avoidance; must not rely on it in close-quarters, restricted visibility, heavy weather or unfamiliar waters beyond the documented envelope | `OPEN` — no training material, no handover record, no usability evidence exists |
| **Commissioning technician** | Performs the vessel survey, installs and calibrates the drive/feedback/heading, executes dockside validation, supports supervised sea trials, trains the operator, signs the commissioning record | Marine electrical and mechanical competence for the surveyed steering system; trained on this product; authority limited by the installation record and by the safety case | Must not sign off without the required measurements; must not enable a mode whose evidence is missing; must not alter safety components outside the documented design | `OPEN` — no competence scheme, no installer agreement, no training exists (X-05, X-06) |
| **Installer / yard (organisation)** | Employs the technician; owns workmanship, insurance and handover quality; retains installation and test records | Documented installation procedure, insurance, competence scheme and safety-responsibility matrix | Must not describe technicians as certified while no certification scheme exists | `OPEN` — no installer network exists |
| **Maintenance technician** | Diagnostics, firmware update, periodic E-stop/isolation test, lock-off during work on the drive | Competence in marine DC systems and lock-off procedure | Must not bypass the E-stop, the isolation device, the fuse rating or the feedback sensor to "make it work" | `OPEN` — no maintenance plan, no lock-off procedure exists |
| **Independent marine safety engineer (future)** | Approves the safety case, the vessel-configuration safe state and the sea-trial evidence; may veto at-sea use | Qualified marine engineer/naval architect with steering-system and functional-safety competence, independent of PILOT commercial and engineering management | Must not be the product author; must sign as a human | `NOT PERFORMED` — no independent review has occurred |

No other user has steering authority. The website, commerce platform, customer support, MAREA NAV, MAREA HUB,
MAREA WATCH, MAREA SENSE and any cloud or mobile surface are **not** users of the steering function and have
no command authority (§12).

### 1.3 Intended operating environment

| Dimension | Intended envelope (design intent) | Evidence state |
| --- | --- | --- |
| Vessel type | Recreational sailing yachts and motor cruisers with a surveyed, mechanical steering system; target commercial segment roughly 8–15 m (`VERIFIED_REPO docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md` F02) | `OPEN` — eligibility envelope not approved (§2) |
| Hull length | Within the recreational-craft range used by the RCD scope definition (2.5–24 m: `VERIFIED_EXTERNAL` EUR-Lex Directive 2013/53/EU, Article 2 and definitions, checked 2026-10-30) — market and standardisation context only, not an applicability determination for PILOT | `OPEN` — the RCD is a scope reference for the market, not an approval of PILOT |
| Waters | Coastal, inshore and sheltered waters within the vessel's design category and the surveyed operating limits; daylight and night use with proper watchkeeping | `OPEN` — no operational limits are approved; design-category mapping is `NOT_YET_ASSESSABLE` |
| Sea state / wind | Only conditions approved for that vessel and mode in the commissioning record; never heavy weather or a sea state beyond the approved limit | `OPEN` — no limit exists; no trial has been performed |
| Electrical system | 12 V DC nominal vessel DC system with documented fusing, isolation and grounding | `OPEN` — 24 V DC, 48 V DC, mains-derived supplies and mixed-voltage systems are `NOT_YET_ASSESSABLE` |
| Environmental exposure | Installed in locations approved by the survey; no ingress-protection rating may be claimed until tested (H-05) | `BLOCKED` — no IP rating, no thermal, vibration, humidity or salt-fog evidence exists |
| External dependencies | Heading reference; GNSS for TRACK mode; calibrated wind source for WIND mode; vessel power; human supervision | `OPEN` — dependencies are design inputs, not verified equipment |
| Excluded environments | Commercial, passenger-carrying, classed or flag-state-certified vessels; high-speed craft above 30 kn; craft above 24 m; any unattended or remote operation; racing performance use; any use requiring certified navigation or steering equipment | `BLOCKED` on MED/class questions and on absent evidence (H-06, H-07) |

### 1.4 Intended steering modes and preconditions

| Mode | Intended customer capability | Preconditions that must be true before use | Evidence state |
| --- | --- | --- | --- |
| HEADING (heading hold) | Hold a selected heading within the approved yaw band and vessel limits | Calibrated heading reference with health monitoring; rudder/steering feedback or an approved open-loop case; verified drive and limits; operator trained; commissioned and dock-validated | `OPEN` — prototype controller logic exists in audited code (MC-02 F-A13), no hardware evidence; `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND` |
| WIND (wind-angle hold) | Hold a selected apparent-wind angle on a sailing vessel | Everything above, plus a compatible calibrated wind source, qualified as a **steering input**, with health monitoring and a defined loss response | `OPEN` — wind parsing unit tests exist in the audited prototype but no sensor, calibration or steering evidence; PILOT Sail is `CONDITIONAL` (README §18 D-008) |
| TRACK (route following) | Follow a route supplied as an input by MAREA NAV (route data only, never authority) | Everything above, plus GNSS quality monitoring, route validation, no-go-zone logic and a defined loss/demotion response; NAV route data is an input only | `OPEN` — prototype track logic exists in audited code; GNSS quality handling is incomplete (MC-02 F-09); no route authority contract exists |

No mode may be delivered to a customer, marketed, or enabled in a commissioning record until its own
evidence exists for the specific vessel configuration. HEADING is the minimum intended mode; WIND and TRACK
are conditional (README §18).

### 1.5 Explicit non-uses (prohibited by design and by claims policy)

PILOT must not be used, sold or described for: unattended or remote steering; collision avoidance or traffic
separation; steering by AIS, chart, camera or generic sensor automation; automatic docking, mooring or
close-quarters manoeuvring; steering on commercial, passenger, classed, racing or high-speed craft; steering
where the drive, feedback or manual release is uninspected or unknown; any use as a certified or
safety-of-life system (`VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class P/X, §4).

---

## 2. Vessel and steering eligibility envelope

### 2.1 Eligibility principle

Eligibility is a **vessel-specific engineering decision**, not a catalogue compatibility claim. No drive
family, steering type, hull or installation is eligible because it is listed here; a family is only
"potentially eligible" subject to a written survey, a documented drive and feedback assessment, and the
approval of a qualified engineer. The published compatibility matrix required by README §19 must list each
drive family, steering type, sensor model, firmware version, direction and known limitation, only with
recorded evidence.

### 2.2 Drive-family and steering-type envelope

`ASSUMPTION` — the classification below is a planning envelope derived from the audited prototype
(a legacy two-wire brushed DC drive of the ST3000 class is the only drive documented in
`VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §2.2 HW-04) and from engineering
judgement. It is not a compatibility finding.

| Family | Description | Intended eligibility | Basis and condition | Evidence state |
| --- | --- | --- | --- | --- |
| **D-1** Mechanical wheel/quadrant drive with clutch or reversible gearing (below-deck or wheel-mounted brushed-DC drive) | Drive turns the wheel or quadrant; a mechanical clutch or reversible gear permits manual release | **Potentially eligible — primary intended family** | Drive model, torque, current, duty and manual release must be recorded; the audited ST3000-class reference has no datasheet, torque, current, winding or wear record (HW-04) | `OPEN` — drive data absent; H-07 |
| **D-2** Tiller-mounted drive with mechanical release | Linear/rotary drive acts on the tiller; the tiller can be released manually | **Potentially eligible — requires drive-specific assessment** | Manual release, drive force, mounting loads and feedback must be surveyed | `OPEN` — no evidence |
| **D-3** Hydraulic steering with electric pump or solenoid valve | Pump/valve moves the rudder; manual steering depends on bypass/valve design | **Not assessable yet** | Whether removing motor power frees, locks or degrades manual steering depends on the valve and bypass architecture, which is not documented for any candidate system | `OPEN` — no architecture evidence |
| **D-4** Drive-by-wire / electronic steering | Steering command is electronic end-to-end | **Not assessable yet — likely excluded for the first safety case** | No verified interface; no authority boundary with the vessel's own steering electronics; NMEA 2000 is not implemented (H-04) | `BLOCKED` — H-04 |
| **D-5** Outboard with integrated autopilot interface | Proprietary or vendor interface to an outboard steering system | **Not assessable yet** | Proprietary interface contracts, authority and failure behaviour are unknown; no vendor agreement exists | `OPEN` — no evidence |
| **D-6** Twin-rudder, twin-helm or multiple steering stations | More than one rudder or helm station | **Not assessable yet** | Feedback, authority, manual release and takeover detection are unresolved for multi-station layouts | `OPEN` — no evidence |
| **D-7** Vessel with no mechanical or manual release | The drive cannot be released or overridden by a person | **Excluded** | Manual takeover is a safety boundary; without it there is no acceptable manual authority | `BLOCKED` — safety goal SG-01 unsatisfiable |
| **D-8** Unsurveyed or unrated drive | Unknown model, wear, current, torque or duty (including legacy second-hand drives) | **Excluded until surveyed and documented** | The audited reference drive is legacy with no provenance, torque or current data (HW-04); fuse rating is a design assumption only | `BLOCKED` — H-07 |
| **D-9** Commercial, passenger, classed or flag-state vessel | Any vessel subject to class, flag-state or MED equipment requirements | **Excluded from the current envelope** | MED scope and national equipment rules were not applied to MAREA hardware (MC-02 C-09); no class approval exists | `BLOCKED` — legal review required |
| **D-10** High-speed craft above 30 kn | Craft in the speed band addressed by the high-speed craft heading-control standard | **Excluded from the current envelope** | The audited scope of ISO 16329:2003 addresses craft above 30 kn up to 70 kn with a maximum rate of turn of 20°/s (`VERIFIED_EXTERNAL` https://www.iso.org/standard/30256.html, checked 2026-10-30); no PILOT evidence exists in that class | `BLOCKED` — no evidence |
| **D-11** Craft above 24 m hull length | Outside small-craft standardisation scope | **Excluded from the current envelope** | The small-craft standard checked for this outline is scoped to craft up to 24 m hull length (`VERIFIED_EXTERNAL` ISO 25197:2020, https://www.iso.org/standard/71354.html, checked 2026-10-30); PILOT has no evidence above 24 m | `BLOCKED` — no evidence |
| **D-12** Petrol engine space / flammable-gas atmosphere installation | Equipment installed in a space where flammable gas may accumulate | **Not assessable yet** | If any PILOT device is installed in such a space, the applicable ignition-protection test requirements (`VERIFIED_EXTERNAL` ISO 8846:2025 scope: electrical devices on small craft operated without igniting a surrounding flammable gas atmosphere) must be assessed; no such install design exists | `OPEN` — no installation design |

### 2.3 "Not assessable yet" register (explicit)

The following cannot be assessed at MC-06 and must not be promised, quoted as supported, or enabled in a
commissioning record:

1. Any hydraulic steering system whose manual-steering behaviour after loss of electrical power has not been
   physically verified.
2. Any drive-by-wire or electronic steering system, and any vessel whose steering electronics would share
   authority with PILOT.
3. Any outboard or vendor-integrated autopilot interface without a documented interface contract and
   failure-behaviour specification.
4. Any multi-rudder or multi-helm configuration.
5. Any vessel above 24 m hull length, or any high-speed craft above 30 kn.
6. Any commercial, passenger, classed, flag-state or MED-relevant vessel.
7. Any installation in a petrol engine space or other flammable-gas-risk location, until ignition-protection
   requirements are assessed.
8. Any 24 V, 48 V or mains-derived electrical configuration.
9. Any installation where the drive rating, torque, stall current, duty cycle or wear is unknown.
10. Any configuration where manual release/takeover cannot be demonstrated physically, with and without
    computer power.
11. Any mode (WIND, TRACK) whose own verification evidence for that vessel has not been produced.
12. Any second control station, remote display authority, mobile application or cloud feature.

### 2.4 Mandatory eligibility criteria (survey-level)

A vessel may be proposed for PILOT only when every criterion below is satisfied and recorded in the survey:

| # | Criterion | Why it is a safety boundary | Evidence state |
| --- | --- | --- | --- |
| E-01 | The complete steering system, drive, feedback and manual release are documented and inspected | Eligibility cannot be decided from a model name alone | `OPEN` |
| E-02 | The drive has a verified rating (voltage, current, torque, duty) or is replaced with one that has | Fuse coordination and limits depend on the drive rating (HW-04, HW-12) | `BLOCKED` |
| E-03 | Manual takeover and mechanical release can be demonstrated and measured | SG-01; no takeover detection exists in the prototype (MC-02 F-A21, F-04) | `NOT_FOUND` |
| E-04 | An independent motor-power isolation device can be installed and rated for the DC breaking duty | SG-02; no isolation evidence exists (`PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`) | `NOT_FOUND` |
| E-05 | A physical E-stop can be sited at the helm and wired independently of the computer | SG-02; no physical E-stop evidence exists (`PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`) | `NOT_FOUND` |
| E-06 | Steering/rudder position feedback can be installed and calibrated, or an open-loop case is formally approved by a qualified engineer | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`; end-stop protection depends on it | `NOT_FOUND` |
| E-07 | The heading reference can be calibrated and its deviation recorded | Uncalibrated magnetometer heading exists in the prototype (MC-02 F-08, F-A26) | `NOT_FOUND` |
| E-08 | The vessel's electrical system can supply the installation with documented fusing, isolation and grounding | Electrical safety and faults (H-05, HW-12) | `OPEN` |
| E-09 | The installation location is suitable for the environment or protected accordingly | No IP/thermal evidence exists (H-05) | `OPEN` |
| E-10 | The skipper will be trained and will accept the documented limits and residual risks | Supervision is the primary barrier | `OPEN` |
| E-11 | A qualified marine engineer can approve the vessel-configuration safe state (§8) | No universal safe state is valid | `OPEN` |
| E-12 | The vessel is outside every exclusion in §2.2 D-7 to D-12 | Safety and regulatory envelope | `OPEN` |

---

## 3. Foreseeable misuse

The table records foreseeable misuse, its credible consequence and the mitigation required by design,
documentation and commissioning. Misuse mitigations are **requirements**, not completed controls; every
mitigation row remains `OPEN` until the corresponding evidence exists.

| # | Foreseeable misuse | Credible consequence | Required mitigation (design / documentation / procedure) | State |
| --- | --- | --- | --- | --- |
| M-01 | Leaving the helm unattended while engaged | Collision, grounding, man-overboard, loss of vessel | Supervision-first design; engage requires deliberate local action and an engagement indication; operator manual and training state continuous watchkeeping; no unattended claim; alarm if engagement persists without helm interaction only if a safe, approved mechanism exists (not assumed to replace watchkeeping) | `OPEN` |
| M-02 | Using PILOT in a marina, narrow channel, restricted visibility or close-quarters situation | Collision, contact damage | Documented limits; training; engage guard/confirmation; explicit "not for close-quarters" statement; no claim of close-quarters suitability | `OPEN` |
| M-03 | Using PILOT outside the commissioned sea-state/wind/vessel envelope | Loss of control, drive overload, structural load | Envelope recorded per vessel; instruction to disengage when conditions change; no performance claim beyond verified envelope | `OPEN` |
| M-04 | Forcing the helm against an engaged drive, or relying on the clutch to slip | Drive/steering damage, belt or quadrant failure, loss of manual control | Mechanical release verified; takeover detection requirement; stall/overcurrent protection; training on release procedure | `NOT_FOUND` |
| M-05 | Treating PILOT as collision avoidance or as a watchkeeper | Collision, grounding | Required disclaimers; no collision-avoidance claim; training; no AIS/chart-based steering path | `OPEN` |
| M-06 | Using an uncalibrated or unqualified sensor (generic wind, third-party compass) as a steering input | Uncontrolled turn, tack/gybe, loss of course | Input qualification requirement; calibration record; input health monitoring; SENSE readings are not automatically steering inputs (README §19) | `NOT_FOUND` |
| M-07 | Over-trusting NAV route data and following an unvalidated route | Grounding, collision, no-go-zone entry | NAV is an input only; route validation and no-go-zone requirements; supervised use; operator confirms route | `OPEN` |
| M-08 | Disabling, bypassing or "temporarily" rewiring the E-stop, isolation device, fuse or feedback sensor | Loss of independent stop; unprotected overcurrent; wrong steering feedback | Installation records; label and lock-off requirement; maintenance warnings; periodic test; no configuration may be accepted without these components | `NOT_FOUND` |
| M-09 | Commissioning by an unqualified person, without survey or measurement | Wrong direction, wrong limits, wrong calibration, latent failure | Professional installation is mandatory (D1 F10); survey and sign-off gate; commissioning record required before any at-sea use | `OPEN` |
| M-10 | Repeatedly resetting latched faults without diagnosing the cause | Failure recurrence, unnoticed degradation | Latched fault semantics; local rearm only after cause check; maintenance record; alarm history | `OPEN` |
| M-11 | Working on the drive or steering gear while motor power is available | Entanglement, crush, burns, unexpected movement | Independent isolation device; lock-off procedure; maintenance instruction; physical E-stop does not replace isolation for work | `NOT_FOUND` |
| M-12 | Using a phone, tablet, browser or the vessel LAN to "steer" or to change limits | Unauthorised or accidental helm movement | Prohibition by design; authenticated local control boundary; no exposed command API; network policy; interface authority map (§12) | `BLOCKED` — H-02 prototype API is unauthenticated |
| M-13 | Presenting PILOT as certified, type-approved, commercial-grade or suitable for a classed vessel | Regulatory misrepresentation; unsafe reliance | Claims policy; no certification claim anywhere; packaging and copy review | `OPEN` |
| M-14 | Installing a second-hand, legacy or unrated drive | Drive failure, fire risk, unpredictable current/torque | Survey criterion E-02; exclusion D-08; drive replacement where rating is unknown | `BLOCKED` |
| M-15 | Continuing to use the system after an alarm or after a manual takeover without a controlled re-engage | Unexpected resumption, loss of authority | Engagement state indication; no automatic re-engage; latched takeover event until acknowledged locally | `NOT_FOUND` |
| M-16 | Using PILOT on a 24 V/48 V or mains-powered system without assessment | Overvoltage, insulation failure, fire | Eligibility exclusion; documented electrical envelope; installer check | `OPEN` |

---

## 4. Hazard analysis: proposed method, hazard categories and register

### 4.1 Method statement (PROPOSED, not approved)

The method below is **proposed** for the future PILOT safety case. It is not a harmonised or certified
method, it has not been approved by a qualified engineer, and no risk-acceptance decision is made in this
document. The final method, its tolerability criteria and its acceptance authority are themselves subject to
qualified engineering review (gate condition G-02, §17).

Proposed method:

1. **Hazard identification** by structured brainstorming against the categories in §4.4, the audit findings
   (MC-02 F-01–F-12, G1–G4), and each drive family in §2.2. Output: hazard log with unique ids.
2. **Scenario definition** per hazard: initiating event, failure mode, operating mode, vessel configuration,
   exposure, and the human/system barriers present.
3. **Risk classification** using the proposed severity × exposure × controllability convention in §4.2–§4.3.
4. **Barrier analysis**: for each hazard, identify prevention, detection, response and mitigation barriers;
   verify each barrier's independence and evidence state.
5. **Detailed analyses** to be performed before the gate: FMEA/FMECA per drive family and per subsystem;
   fault-tree analysis for "loss of steering authority", "unintended helm movement" and "loss of manual
   takeover"; common-cause analysis for power, clock, sensor and network dependencies; human-factors
   analysis for alarms, mode confusion and takeover.
6. **Risk evaluation and acceptance**: performed by the human signatory and independent reviewer against
   criteria approved for this product; **not performed here**.

Current state of the analysis: the hazard categories and representative hazards are identified (§4.4), the
method and matrix convention are proposed (§4.2–§4.3), and **no FMEA, FMECA, fault tree, common-cause
analysis or risk-acceptance record exists**. All of them are `NOT_FOUND`.

### 4.2 Severity, exposure and controllability scales (PROPOSED)

| Scale | Level | Definition proposed for PILOT |
| --- | --- | --- |
| Severity (S) | S1 | No injury or minor injury; minor vessel or equipment damage; no loss of control |
| | S2 | Serious injury; significant vessel or third-party property damage; temporary loss of steering control recoverable by the crew |
| | S3 | Severe injury or single fatality; loss of vessel or major collision; unrecoverable loss of steering control |
| | S4 | Multiple fatalities; catastrophic collision, sinking or fire |
| Exposure (E) | E1 | Rare — not expected in the product life, or only in abnormal use |
| | E2 | Occasional — could occur at least once in the product life |
| | E3 | Frequent — could occur several times per season in intended use |
| | E4 | Continuous — condition present whenever the function is active |
| Controllability (C) | C1 | Easily controllable: the skipper can prevent the consequence with normal action and adequate warning |
| | C2 | Controllability degraded: prevention requires immediate, correct action under stress or with reduced warning |
| | C3 | Uncontrollable: no realistic human action can prevent the consequence after the initiating event |

### 4.3 Risk-matrix convention (PROPOSED, unapproved)

Risk score convention: `R = S × E × C`, with S ∈ {1,2,3,4}, E ∈ {1,2,3,4}, C ∈ {1,2,3}; score range 1–48.

| Proposed band | Score | Proposed interpretation (subject to approval) |
| --- | --- | --- |
| R4 | 1–6 | Review only; monitor; no dedicated control expected beyond normal design |
| R3 | 7–16 | Controls required; barriers must be specified and verified |
| R2 | 17–32 | Independent protection required; single barrier is insufficient |
| R1 | 33–48 | Intolerable without design change or an approved, justified residual-risk acceptance by a qualified engineer |

**PROPOSED — not accepted.** The bands, the arithmetic convention and the tolerability criteria are a
working proposal only. They have not been approved, and no hazard in this document carries an accepted risk
score. A score may only be assigned once a vessel configuration, operating profile and evidence set exist and
a qualified engineer has approved both the method and the acceptance criterion. Exposure and controllability
are vessel- and installation-specific and are `OPEN` for every hazard here.

### 4.4 Hazard categories and representative hazards

Provisional severity in the last column is the analyst's **proposed initial judgement (unapproved)** and must
not be read as a risk assessment. Exposure and controllability are `OPEN`; no score is assigned.

| ID | Category | Representative hazardous event | Potential harm | Affected users | Provisional severity (PROPOSED) | Primary control links |
| --- | --- | --- | --- | --- | --- | --- |
| HZ-01 | Loss of steering authority | Drive, clutch, belt or coupling fails while engaged; helm no longer responds as commanded | Collision, grounding, loss of vessel control | Skipper, crew, third parties | S3 | SG-01, SG-03, SR-06, SR-20, SR-43 |
| HZ-02 | Unintended helm movement | Erroneous command, wrong mode target, sensor error, integration error or re-engage causes movement not intended by the helm | Collision, man-overboard, injury from moving gear | Skipper, crew, nearby persons | S3 | SG-03, SG-05, SR-03, SR-06, SR-11, SR-21, SR-28 |
| HZ-03 | Overcurrent / thermal | Stall, jammed rudder, obstructed drive, undersized wiring, fuse miscoordination, sustained duty beyond rating | Fire, burns, insulation failure, drive destruction, loss of steering | Skipper, crew, vessel | S3 | SG-06, SR-15, SR-16, SR-33 |
| HZ-04 | Water ingress | Water in control head, enclosure, connector or drive; salt corrosion; condensation | Loss of control, short circuit, fire, corrosion failure | Skipper, crew | S2 | SG-06, SR-35, SR-37 |
| HZ-05 | Power loss | Battery disconnect, breaker trip, brownout, reboot, loose terminal while engaged | Uncommanded stop or movement depending on drive; loss of steering authority | Skipper, crew, third parties | S3 | SG-04, SR-13, SR-18, SR-19 |
| HZ-06 | Sensor failure | Heading, wind, GNSS or rudder feedback fails, freezes, saturates or reports implausible values | Wrong steering, uncontrolled turn, loss of course, grounding | Skipper, crew, third parties | S3 | SG-08, SR-22, SR-24, SR-25, SR-26, SR-28 |
| HZ-07 | Stale data | A frozen or old value is presented or used as current (heading, wind, GNSS, feedback, route) | Wrong steering decision by the controller or by the skipper | Skipper, crew, third parties | S3 | SG-08, SR-27, SR-40 |
| HZ-08 | Operator over-trust | Skipper leaves helm, ignores limits, relies on the system for watchkeeping or close-quarters | Collision, grounding, man-overboard | Skipper, crew, third parties | S3 | SG-01, SG-05, SG-09, SR-48 |
| HZ-09 | Commissioning error | Wrong direction, wrong limit, wrong calibration, feedback not verified, mode enabled without evidence | Uncommanded movement, wrong steering, loss of authority | Skipper, crew, installer | S3 | SG-09, SR-42–SR-45 |
| HZ-10 | Maintenance error | Wrong fuse, bypassed E-stop, disconnected feedback, mismatched firmware, missed periodic test | Loss of independent stop, overcurrent, incorrect steering | Skipper, crew, technician | S3 | SG-02, SG-06, SR-07, SR-08, SR-46, SR-47 |
| HZ-11 | Cyber / unauthorised command | Unauthenticated LAN client, open API, malicious or accidental command, compromised update | Uncommanded helm movement, changed limits, disabled safety functions | Skipper, crew, third parties | S3 | SG-05, SR-03, SR-05, SR-38, SR-39 |
| HZ-12 | Loss of manual takeover | Clutch jam, drive seizure, helm override force too high, software refuses disengagement | Inability to avoid a hazard; collision | Skipper, crew, third parties | S3 | SG-01, SR-06, SR-32, SR-44 |
| HZ-13 | Mechanical / structural | Drive mounting failure, belt failure, quadrant or cable failure, end-stop impact, rudder load beyond drive rating | Loss of steering, injury, hull damage | Skipper, crew, third parties | S3 | SG-03, SG-06, SR-17, SR-30, SR-33 |
| HZ-14 | Human factors / indication | Engagement or mode not clearly indicated; alarm missed; mode confusion; alarm flood | Incorrect operator response, loss of authority | Skipper, crew | S2 | SG-05, SG-08, SR-04, SR-46, SR-48 |
| HZ-15 | Integration error | NAV supplies an unsuitable route; HUB publishes stale data; SENSE input is uncalibrated; WATCH/NAV surfaces are misread as authority | Wrong steering decision, grounding, collision | Skipper, crew, third parties | S3 | SG-07, SR-03, SR-29, SR-39, SR-40 |
| HZ-16 | Environmental / EMI | Lightning, conducted/radiated interference from the motor drive, vibration, temperature extremes, supply transients | Corruption of commands or sensor data, component failure, fire | Skipper, crew | S2 | SG-06, SR-34, SR-36, SR-37 |
| HZ-17 | Loss of independent stop | Software hang, welded relay/contactor, broken E-stop wiring, isolation device not rated or not reachable | Motor cannot be stopped; entrapment, collision, fire | Skipper, crew, technician | S3 | SG-02, SR-07, SR-08, SR-09, SR-10 |
| HZ-18 | Watchdog failure | Control loop hang, event-loop block, firmware hang, corrupted I/O, same-loop timeout not detected | Sustained drive output, uncommanded movement, loss of steering | Skipper, crew, third parties | S3 | SG-04, SR-13, SR-14 |

### 4.5 Required analysis artefacts and current state

| Artefact | Purpose | Required before gate | Current state |
| --- | --- | --- | --- |
| Hazard log with hazardous-event ids, causes, consequences, barriers and evidence | Traceability from hazard to requirement to evidence | Complete, reviewed, signed | Hazard categories identified here; full log `NOT_FOUND` |
| FMEA/FMECA per drive family and subsystem (controller, motor drive, power, sensors, harness, control head, feedback) | Bottom-up failure analysis and diagnostic coverage | Complete, reviewed, signed | `NOT_FOUND` |
| Fault-tree analysis for "loss of steering authority", "unintended helm movement", "loss of manual takeover" | Top-down analysis of combination and common-cause failures | Complete, reviewed, signed | `NOT_FOUND` |
| Common-cause analysis (power, clock, network, sensor, firmware, human) | Independence argument for barriers | Complete, reviewed, signed | `NOT_FOUND` |
| Human-factors analysis (alarms, engagement indication, takeover drill, training) | Usability of the safety barriers | Complete, reviewed, signed | `NOT_FOUND` |
| Risk-acceptance record | Justifies every residual risk and single-channel acceptance | Signed by qualified human engineer and independent reviewer | `NOT_FOUND` — no acceptance decision is made in this outline |

---

## 5. Safety goals

The safety goals are the top-level claims a future safety case must demonstrate. None is demonstrated today.

| ID | Safety goal | Rationale | Hazard links | Evidence state |
| --- | --- | --- | --- | --- |
| SG-01 | Manual control of the vessel is always available, has priority over automatic control, and can be established without the cooperation of the command computer | The crew is the ultimate barrier; a steering system that can trap or outrank the helm is unacceptable | HZ-01, HZ-08, HZ-12, HZ-17 | `NOT_FOUND` |
| SG-02 | No automatic or powered action can prevent a person at the helm from stopping steering motion and removing motor power | Physical independent stop is the last line of defence and may never depend on software | HZ-03, HZ-10, HZ-17 | `NOT_FOUND` — `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`, `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND` |
| SG-03 | A single failure does not produce a sustained uncommanded helm movement | Single-point failure tolerance for the most dangerous failure mode | HZ-01, HZ-02, HZ-18 | `NOT_FOUND` |
| SG-04 | Loss of the command computer, the local link or the control loop results in a defined, vessel-specific response within a bounded time, and never in an undefined or oscillating output | The commander is not trusted; loss of it must be safe | HZ-05, HZ-18 | `NOT_FOUND` |
| SG-05 | Steering can be engaged only by an explicit local human action, and the engagement state is continuously and unambiguously indicated | Prevents remote, accidental or state-confused engagement | HZ-02, HZ-08, HZ-11, HZ-14 | `NOT_FOUND` |
| SG-06 | Electrical, thermal and mechanical faults are detected and contained before they become fire, loss-of-steering or injury hazards | Energy source and actuator must be protected independently | HZ-03, HZ-04, HZ-13, HZ-16 | `NOT_FOUND` |
| SG-07 | Steering is not dependent on external networks, cloud services, commercial subscriptions, the website or any other MAREA product | Local availability and no remote authority are non-negotiable | HZ-11, HZ-15 | `OPEN` — design requirement; no implementation exists |
| SG-08 | The operator is warned of degraded, stale, failed or implausible inputs before or at the moment they affect steering, and stale values are never presented as current | Sensor integrity is a safety barrier | HZ-06, HZ-07, HZ-14 | `NOT_FOUND` |
| SG-09 | Installation, commissioning and maintenance errors are prevented where practicable and detected otherwise, with a sign-off gate before any at-sea use | Most credible failures in a new installation are human | HZ-09, HZ-10 | `NOT_FOUND` |
| SG-10 | No remote, cloud, website, mobile or other networked surface can command, engage, disengage or tune steering | Authority must be local and physical | HZ-11, HZ-15 | `OPEN` — design prohibition; proof obligations in §12.2 |

---

## 6. Safety requirements derived from the safety goals

### 6.1 Requirement conventions

- Every requirement is a **design requirement to be satisfied**, not a description of existing behaviour.
- Verification method codes: **AN** = analysis/document review; **IN** = inspection of hardware, records or
  installation; **BT** = bench test with instrumentation; **HIL** = hardware-in-the-loop fault injection;
  **ST** = supervised sea trial; **RV** = independent review/sign-off.
- Evidence state uses only `NOT_FOUND` or `OPEN` in this outline, consistent with the MC-02 vocabulary. A
  `NOT_FOUND` requirement may have partial prototype logic in audited code; that is noted but never treated
  as verification (`PHYSICAL_TEST_NOT_VERIFIED`).
- No requirement is verified today.

### 6.2 Authority, engagement and independent stop

| ID | Safety requirement | SG | Verification | Evidence state | Note / blocker |
| --- | --- | --- | --- | --- | --- |
| SR-01 | Engagement of any steering mode requires an explicit, deliberate action at the local control head by a person physically present; no automatic, scheduled or remote engagement is permitted | SG-05 | IN, AN, BT | `NOT_FOUND` | Prototype exposes engage over an unauthenticated HTTP API (MC-02 F-A25, F-01; H-02) |
| SR-02 | The local control head is the sole authority for engage, disengage, mode change and manual standby; every other interface is read-only | SG-05, SG-10 | AN, IN, RV | `OPEN` | No product implementation exists; interface contract required (§12) |
| SR-03 | No remote or cloud steering command path exists in the design, code, deployment, documentation or support tooling | SG-07, SG-10 | AN, RV, IN | `OPEN` | Design prohibition; no product code exists; proof obligations in §12.2 |
| SR-04 | Engagement state, active mode, fault state and manual-takeover state are indicated at the helm in a way that is unambiguous in daylight and at night | SG-05, SG-08 | BT, ST, RV | `NOT_FOUND` | No control-head article or display exists (H-05, H-07) |
| SR-05 | The local control plane is authenticated and authorised, bound to the local vessel boundary, uses no wildcard CORS and exposes no unauthenticated command route | SG-05, SG-10 | AN, BT, RV | `BLOCKED` | H-02: the audited prototype API is unauthenticated, binds `0.0.0.0`, CORS `*` |
| SR-06 | Any manual takeover, or any deliberate human steering intervention, must cause immediate disengagement of automatic drive; automatic resumption is prohibited without a new local engage action | SG-01 | BT, ST, HIL | `NOT_FOUND` | No takeover detection: prototype `clutch` flag is a copy of the enable flag (MC-02 F-A21, F-04) |
| SR-07 | A physical E-stop at the helm must remove motor power independently of the command computer, the firmware and any software stop, and must be wired so that its failure mode is loss of drive output | SG-02 | IN, BT, RV | `NOT_FOUND` | `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`; H-10, HW-13, F-A05 |
| SR-08 | An independent motor-power isolation device (breaker or rated contactor) must be installed, rated for the DC breaking duty, reachable and lockable, and recorded in the installation record | SG-02 | IN, BT, RV | `NOT_FOUND` | `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`; H-03, H-10 |
| SR-09 | The E-stop chain must be monitored (dual channel, or single channel plus a formally documented and independently accepted risk acceptance) and must diagnose stuck or welded contacts where the architecture claims it | SG-02 | AN, BT, HIL | `NOT_FOUND` | HW-13: current concept is one NC contact on one GPIO, no cross-monitoring, welded contactor undetectable |
| SR-10 | A software stop (UI, API or remote) is not an E-stop and may not be credited as a safety function; documentation and training must state this | SG-02 | AN, IN, RV | `NOT_FOUND` | Prototype software E-stop depends on the next control tick (MC-02 F-07) |

### 6.3 Fault response, safe state, power and actuator protection

| ID | Safety requirement | SG | Verification | Evidence state | Note / blocker |
| --- | --- | --- | --- | --- | --- |
| SR-11 | Every fault class has defined detection, response, latching, indication and rearm semantics; no fault may leave the drive in an undefined state | SG-03, SG-04 | AN, HIL, BT | `NOT_FOUND` | Prototype has a partial fault manager (F-A11, F-A13, F-A14) but no host rearm path and no physical evidence (F-05) |
| SR-12 | The safe state is defined per fault **and per vessel configuration**, approved by a qualified marine engineer, and recorded in the commissioning record; there is no universal "always de-energise" rule (see §8) | SG-03, SG-04 | AN, RV, IN | `OPEN` | Proposed analysis in §8; no approval exists |
| SR-13 | Loss of the command computer, heartbeat or local link must remove or hold drive output according to the approved vessel-specific safe state within a bounded time verified by measurement | SG-04 | BT, HIL, ST | `NOT_FOUND` | Prototype heartbeat timeout is code-only and unmeasured (F-A02); value not verified |
| SR-14 | An independent hardware watchdog, with its own timebase and an output path that can force the drive safe, must supervise the control loop; the software watchdog is additional, not a substitute | SG-04 | AN, BT, HIL | `NOT_FOUND` | No `machine.WDT` equivalent in audited firmware (F-A23, F-03); engine watchdog is a Node timer in the same loop (F-10) |
| SR-15 | Overcurrent protection must be provided by two independent means (electronic limit plus fuse/breaker), coordinated with the surveyed drive rating and wiring | SG-06 | AN, BT, IN | `NOT_FOUND` | Single Hall sensor plus a fuse assumption; fuse coordination unverified (HW-12, F-A07) |
| SR-16 | Thermal protection and stall/jam detection must be implemented for the drive and control electronics, with a defined response | SG-06 | AN, BT | `NOT_FOUND` | No thermal sensing or stall detection exists in the audited prototype |
| SR-17 | Rudder/steering position feedback must be implemented, with end-stop protection and plausibility checks; if an open-loop case is approved instead, it must include end-stop and stall protection and a formal risk acceptance | SG-03, SG-06 | AN, BT, ST, RV | `NOT_FOUND` | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`; F-A20, F-02 |
| SR-18 | Loss of logic power must not produce a sustained uncommanded movement; on restoration the system must remain disengaged until a new local engage action | SG-04 | AN, BT, ST | `NOT_FOUND` | No power-loss behaviour evidence exists; HW-12 has no documented power architecture |
| SR-19 | Brownout, reboot and firmware restart behaviour must be defined, tested and indicated; no automatic re-engage is permitted | SG-04 | BT, HIL | `NOT_FOUND` | No evidence |
| SR-20 | Actuator faults (open circuit, short, seized drive, slip, no movement when commanded, movement when not commanded) must be detected and handled | SG-03 | AN, BT, HIL | `NOT_FOUND` | No feedback exists to detect most of these |
| SR-21 | Latched faults require an explicit local rearm after the cause has been checked; the rearm action, who may perform it and the record retained must be defined | SG-03, SG-09 | AN, BT, IN | `NOT_FOUND` | Prototype host cannot send rearm (`A`) after a Pico-latched fault (F-05) |

### 6.4 Sensing, data quality and route input

| ID | Safety requirement | SG | Verification | Evidence state | Note / blocker |
| --- | --- | --- | --- | --- | --- |
| SR-22 | The heading source must be health-monitored: range, rate, staleness, source status, and plausibility against independent evidence (for example COG and steering response) with a defined response | SG-08 | AN, BT, ST | `NOT_FOUND` | Prototype heading is an uncalibrated complementary-filter magnetometer with no plausibility check (F-08, F-A26) |
| SR-23 | Compass calibration and deviation must be performed, recorded and re-triggered by defined events; the calibration state must be visible to the operator | SG-08 | IN, BT, ST | `NOT_FOUND` | No calibration or deviation routine exists (F-A26) |
| SR-24 | The wind source must be qualified as a steering input, calibrated, health-monitored and assigned a defined loss response; loss of wind in WIND mode must demote or disengage per the approved safe state | SG-08, SG-03 | AN, BT, ST | `NOT_FOUND` | Wind parsing unit tests exist in the audited gateway, but no sensor, calibration or steering evidence (MC-02 C-13) |
| SR-25 | GNSS and route quality must be monitored (fix quality, freshness, valid position, cross-track limits) and must demote or disengage on degradation; position validity may not be inferred from speed alone | SG-08 | AN, BT, ST | `NOT_FOUND` | Prototype `positionValid` derives from SOG freshness only (F-09) |
| SR-26 | Rudder/steering feedback must be health-monitored (range, rate, disagreement, stuck value) and a feedback loss must have a defined response | SG-08, SG-03 | AN, BT, ST | `NOT_FOUND` | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND` |
| SR-27 | Data quality and freshness flags must be propagated to every consumer; stale values must never be presented as current nor used as valid control inputs | SG-08 | AN, BT, ST | `NOT_FOUND` | Prototype quality flags exist in the data contract but are not visibly propagated into displays (MC-02 C-07) |
| SR-28 | Sensor disagreement and implausibility must trigger a defined response, not silent averaging | SG-03, SG-08 | AN, HIL, ST | `NOT_FOUND` | No evidence |
| SR-29 | Route/waypoint data received from NAV is an input only: it must be validated (waypoint sequence, no-go zones, limits, freshness) and must never command the actuator directly | SG-07, SG-10 | AN, IN, RV | `OPEN` | NAV authority contract does not exist; no integration exists |
| SR-30 | Drive command limits (current, duty, motion time, rate) must be derived from the surveyed drive rating and approved per installation; bench and production profiles must not be interchangeable | SG-03, SG-06 | AN, BT, IN | `NOT_FOUND` | Prototype has per-profile caps in code (F-A08–F-A10), not verified; production profile requires safety flags (F-A19, D-05) — code policy only |
| SR-31 | Control tuning and limit changes are local-service actions only, authorised, recorded and never reachable from a networked or remote surface | SG-05, SG-10 | AN, IN, RV | `NOT_FOUND` | Prototype exposes `tuning` over the unauthenticated API (H-02) |
| SR-32 | Manual override must be achievable without fighting the drive beyond a defined, measured force/torque limit, and the means of release must be identified for the vessel | SG-01 | AN, BT, ST | `NOT_FOUND` | No measurement or release verification exists |

### 6.5 Electrical, thermal, environmental and EMC

| ID | Safety requirement | SG | Verification | Evidence state | Note / blocker |
| --- | --- | --- | --- | --- | --- |
| SR-33 | Fusing/breaker coordination, wiring current rating, cable routing and connector ratings must be designed, documented and inspected for the surveyed installation | SG-06 | AN, IN, BT | `NOT_FOUND` | Fuse rating is a design assumption; no wiring specification exists (HW-12, HW-16) |
| SR-34 | Isolation, grounding, reverse-polarity and transient protection must be designed and reviewed at system level; motor return and electronics ground must be addressed | SG-06 | AN, IN, BT | `NOT_FOUND` | No power architecture exists as a reviewable design (HW-12) |
| SR-35 | Environmental protection must be demonstrated for the installation location; no IP rating may be claimed or assumed until tested | SG-06 | BT, IN | `BLOCKED` | H-05: no ingress, thermal, vibration or salt-fog evidence exists |
| SR-36 | EMC design and testing of the switched motor drive, harness and enclosure must be performed at product level | SG-06 | AN, BT | `NOT_FOUND` | No EMC design or pre-compliance measurement exists (H-06, C-02) |
| SR-37 | Harness, connectors, strain relief, labelling and service loops must be specified and inspected | SG-06, SG-09 | AN, IN | `NOT_FOUND` | HW-16: no screening, strain relief, locking or IP specification exists |

### 6.6 Cyber, interface and local access

| ID | Safety requirement | SG | Verification | Evidence state | Note / blocker |
| --- | --- | --- | --- | --- | --- |
| SR-38 | The local network trust model must be defined and enforced: authenticated/authorised control, no open command API, no wildcard CORS, firmware integrity and version reporting, service-port protection | SG-05, SG-10 | AN, BT, RV | `BLOCKED` | H-02, H-13; no authentication or update mechanism exists in the audited prototype |
| SR-39 | Remote and cloud steering must be prohibited by architecture review, interface contract, deployment policy and penetration test; any future remote feature must pass a new safety case before being enabled | SG-07, SG-10 | AN, RV, BT | `OPEN` | Design prohibition; proof obligations in §12.2 |
| SR-40 | Read-only status exports to HUB, WATCH, DISPLAY or NAV must be structurally incapable of becoming write paths; the read-only boundary must be tested | SG-10 | AN, BT, RV | `OPEN` | Cross-product authority matrix fixed in README §19; no implementation exists |
| SR-41 | Vulnerability handling, secure update, SBOM and incident reporting must be designed against the CRA timeline and the product's own lifecycle | SG-05, SG-07 | AN, RV | `BLOCKED` | H-13; CRA applicability questions in §15; no process exists |

### 6.7 Commissioning, maintenance, human factors and documentation

| ID | Safety requirement | SG | Verification | Evidence state | Note / blocker |
| --- | --- | --- | --- | --- | --- |
| SR-42 | A written vessel survey and eligibility verdict are required before quotation; eligibility criteria E-01–E-12 must be recorded | SG-09 | IN, AN, RV | `NOT_FOUND` | No survey form or installer exists (X-05, X-06) |
| SR-43 | Drive calibration (direction, current, limits), heading calibration and feedback verification must be measured and recorded | SG-09, SG-03 | IN, BT | `NOT_FOUND` | No commissioning tooling or record exists |
| SR-44 | A dockside validation checklist (direction, stop functions, E-stop, isolation, manual release, alarms, limits) must be completed and signed **before** any at-sea use | SG-09, SG-02 | IN, BT, RV | `NOT_FOUND` | No checklist exists; no dockside evidence exists |
| SR-45 | Every steering mode must be verified in supervised increments, with signed records, before routine use; modes without evidence must remain disabled | SG-09, SG-03 | ST, RV | `NOT_FOUND` | `PILOT_SEA_TRIALS = NOT_PERFORMED` |
| SR-46 | The operator must be trained on engage/disengage, manual takeover, E-stop, alarm handling, limits and residual risks, and a handover record signed before unsupervised use | SG-09, SG-08 | IN, RV | `NOT_FOUND` | No training material exists |
| SR-47 | A maintenance schedule, periodic E-stop/isolation test, lock-off procedure and fault-history review must exist and be recorded | SG-02, SG-09 | IN, AN | `NOT_FOUND` | No maintenance plan exists |
| SR-48 | The operator manual must state intended use, limits, alarms, failure behaviour, manual takeover, E-stop, maintenance and residual risks, in the product's language | SG-08, SG-09 | AN, IN, RV | `NOT_FOUND` | No manual exists |
| SR-49 | An independent qualified marine safety engineer must review and sign the safety case and the vessel-configuration safe state before any at-sea use | SG-01–SG-10 | RV | `NOT_FOUND` | No independent review has occurred (§19) |

---

## 7. Failure-detection requirements

Detection is only useful if it is independent enough to detect the failing element and if its response is
defined. Each row below is a requirement, not an existing capability.

| Detection subject | What must be detected | Independence requirement | Required response (design intent, to be approved per vessel) | Current evidence | State |
| --- | --- | --- | --- | --- | --- |
| Heading sensor health | Loss, freeze, out-of-range, excessive rate, source status, implausible heading versus independent evidence | Heading health must not depend solely on the same sensor's own status word | Demote or disengage per approved safe state; alarm; never silently steer on a suspect heading | Prototype has source loss handling (F-A13) but no calibration or plausibility check (F-08) | `NOT_FOUND` |
| Wind sensor health | Loss, invalid status, out-of-range, stale, implausible apparent/true conversion | Must not rely on the wind sentence alone for validity | Demote WIND to approved fallback or disengage; alarm | Prototype parses MWV/MWD with status/checksum checks (MC-02 C-13); no hardware or steering evidence | `NOT_FOUND` |
| GNSS / route quality | No fix, degraded fix, stale position, invalid route, cross-track exceedance, no-go-zone conflict | Position validity must not be inferred only from speed | Demote or disengage; alarm; do not continue TRACK on degraded position | Prototype derives validity from SOG freshness only (F-09) | `NOT_FOUND` |
| Rudder / steering feedback | Loss, range, rate, stuck value, disagreement with command, end-stop approach | Feedback must be independent of the command path it supervises | Stop or limit drive per approved safe state; alarm | No feedback exists (`PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`; F-A20) | `NOT_FOUND` |
| Command heartbeat / timeout | Loss of command messages from the commander, message corruption, sequence gaps | Timeout evaluation must survive a hang or block of the command producer | Remove or hold drive per approved safe state within a measured bound; latch; alarm | Code exists in prototype (F-A02, 450–500 ms defaults) but is unmeasured and inside the same loop (F-03) | `NOT_FOUND` |
| Watchdog | Control-loop hang, event-loop block, firmware hang, task starvation | Watchdog must have independent timebase and an output path to force the drive safe | Force drive safe; latch; indicate; require local rearm | No hardware watchdog (F-A23); software watchdog in same event loop (F-10) | `NOT_FOUND` |
| Overcurrent / thermal | Current above approved limit, sustained overcurrent, stall, thermal rise, sensor fault | Two independent means required (SR-15); thermal must not depend on the current sensor alone | Limit, then stop and latch; alarm; require cause check before rearm | Single Hall sensor in prototype; no thermal sensing; fuse coordination unverified (HW-12, F-A07) | `NOT_FOUND` |
| Actuator fault | Open/short circuit, seized drive, no movement when commanded, movement when not commanded, slip | Must not rely only on the command value | Stop and latch; alarm; require local rearm | No feedback or diagnostics exist | `NOT_FOUND` |
| Power-loss behaviour | Logic power loss, motor power loss, brownout, restart | Behaviour must be determined by wiring and hardware, not by software | Defined vessel-specific safe state; no automatic re-engage; on restoration remain disengaged | No power architecture or evidence exists (HW-12, SR-18) | `NOT_FOUND` |
| E-stop chain | E-stop pressed, contact open, broken wiring, welded contactor (if claimed), isolation device open | E-stop detection must not depend on the command computer or firmware | Remove motor power; latch; indicate; require physical reset and cause check | Only GPIO-level sensing documented; no physical E-stop evidence (H-10, HW-13) | `NOT_FOUND` |
| Stale data / clock | Frozen values, timestamp age, clock jumps, source silent | Freshness must be evaluated independently per source | Mark invalid; alarm; stop using as control input; never display as current | Quality flags exist in the contract but are not visibly propagated (MC-02 C-07) | `NOT_FOUND` |

Detection performance (time bounds, thresholds, debounce) must be derived and approved per vessel and per
fault; **no threshold or timing value is approved in this document**, and the only numeric values mentioned
above come from the audited prototype as code defaults, not as verified limits.

---

## 8. Safety-state definition by fault and by vessel configuration

### 8.1 Principle: no universal de-energisation rule

A blanket instruction to "always de-energise the motor on any fault" is **not** adopted. Whether losing
powered steering is safer than keeping it depends on the drive family and on what happens to the manual
steering path when power is removed:

- If removing power leaves the helm free (clutch released, reversible gear, or manual bypass) and the crew
  can steer immediately, de-energising is generally the lower-risk default.
- If removing power leaves the rudder locked, the helm heavy, the steering inoperative or the drive
  mechanically engaged, de-energising may itself create a loss-of-steering-authority hazard, and a
  controlled stop, a hold, or a powered degraded mode under human supervision may be safer.
- If the powered path is not itself trustworthy (no independent watchdog, no feedback, no authenticated
  command path), keeping power is not a safe substitute and the only acceptable response is a stop with an
  independent isolation means.

The safe state for each fault must therefore be a **vessel-configuration-specific decision**, approved by a
qualified marine engineer, recorded in the commissioning record, and verified on that vessel. The analysis
below is a design-stage proposal; **no safe state is approved today**.

### 8.2 Drive-family analysis: losing powered steering versus maintaining it

| Drive family | If motor power is removed | If powered steering is maintained | Preliminary design-stage analysis (PROPOSED, unapproved) | Evidence needed |
| --- | --- | --- | --- | --- |
| D-1 mechanical wheel/quadrant drive with manual release | Helm is expected to be free if the clutch is released or the gearing is reversible; if the drive is mechanically engaged and irreversible, the helm may be locked or heavy | Continues to hold or move the rudder; depends on electronics integrity and command path | If release is verified and the helm is free: prefer de-energise for most faults. If the helm can be locked: a controlled stop with release instruction may be required. **Verify per vessel; do not assume** | Bench and vessel test of manual steering with motor de-energised, clutch engaged and disengaged; force measurement; signed record |
| D-2 tiller drive with manual release | Tiller should be free after release; without release the drive may hold the tiller | Continues to drive the tiller | Same conditional conclusion as D-1; release verification is mandatory | As D-1 |
| D-3 hydraulic steering with pump/valve | Manual steering depends on bypass/valve design; some systems allow manual operation with the pump stopped, others become heavy or locked if a valve closes on power loss | Pump can continue to move the rudder; a failed valve can still block manual steering | **Not assessable yet.** Neither de-energising nor maintaining can be assumed safe until the valve and bypass architecture are documented and tested | Valve/pump data; manual-steering force test with power removed; failure-mode analysis; signed record |
| D-4 drive-by-wire / electronic steering | Actuator may hold last position, freewheel, or make steering inoperative; depends entirely on the vessel's own system | Powered control continues but authority is shared with unknown electronics | **Not assessable yet and likely excluded from the first safety case.** Sharing authority with an unverified steering system is not acceptable without an interface safety contract | Architecture and interface contract; hazard analysis with the vessel system; independent review |
| D-5 outboard with integrated autopilot interface | Depends on the OEM system | Depends on the OEM system | **Not assessable yet**; no interface contract or failure-behaviour data | OEM documentation, contract, test evidence |
| D-6 twin rudder / multi-helm | Depends on which station and which rudder is affected | Depends on the same | **Not assessable yet** | Per-station and per-rudder analysis and tests |

### 8.3 Fault-to-safety-state matrix (proposed responses, unapproved)

Cell content states the candidate responses; the selected response for a given vessel must be one of these,
approved and recorded. "Approved safe state" means approved by the qualified engineer for that installation;
none is approved at MC-06.

| Fault / event | Candidate responses (A = de-energise/free; B = hold powered; C = controlled stop/centre then safe; D = degraded continue to human takeover) | Configuration dependency | Required indication | State |
| --- | --- | --- | --- | --- |
| Manual takeover detected or helm force exceeded | A or C, immediately, with automatic disengagement | Any family where release is verified | Takeover event displayed and latched | `NOT_FOUND` |
| Physical E-stop pressed | A, by hard-wired power removal, independent of software | All families | E-stop state displayed; physical reset required | `NOT_FOUND` |
| Isolation device opened | A, loss of motor power | All families | Drive-power indication | `NOT_FOUND` |
| Command heartbeat lost | A, B, C or D per approved config; must be bounded and deterministic | D-1/D-2 usually A or C; D-3/D-4 may require B or D if the powered path is trustworthy — never assumed | Fault displayed | `NOT_FOUND` |
| Command computer crash / reboot | A or C, with no automatic re-engage on recovery | As heartbeat loss | Fault displayed | `NOT_FOUND` |
| Hardware watchdog trip | A (force output safe) | All families | Fault displayed; local rearm only | `NOT_FOUND` |
| Overcurrent / stall | Limit first, then A or C; latch | All families | Overcurrent displayed; cause check before rearm | `NOT_FOUND` |
| Over-temperature | Limit, then A or C; latch | All families | Temperature/thermal fault displayed | `NOT_FOUND` |
| Heading loss or implausibility | A or C; demote from a higher mode where approved | HEADING cannot continue without approved alternative heading; WIND/TRACK may demote | Sensor fault displayed | `NOT_FOUND` |
| Wind loss (WIND mode) | Demote to an approved fallback or A/C per approved config | Requires an approved fallback mode; must not silently continue WIND | Mode/fault displayed | `NOT_FOUND` |
| GNSS / route loss (TRACK mode) | Demote to approved fallback or A/C | Requires an approved fallback; must not silently continue TRACK | Mode/fault displayed | `NOT_FOUND` |
| Rudder feedback loss | A or C, unless an open-loop case is approved with end-stop/stall protection | No feedback means no position assurance; open-loop requires formal risk acceptance | Feedback fault displayed | `NOT_FOUND` |
| Actuator fault | A; latch | All families | Actuator fault displayed; local rearm only | `NOT_FOUND` |
| Loss of logic power | Determined by wiring/hardware; no uncommanded motion; remain disengaged on restoration | All families; requires fail-safe wiring analysis | Power/fault state on recovery | `NOT_FOUND` |
| Loss of motor power | Manual steering must remain available if the vessel has a manual path; otherwise the vessel is not eligible | D-7 excluded | Power indication | `NOT_FOUND` |
| Cyber / unauthorised command attempt | Reject, log, latch and alarm; no steering action | All network-capable configurations | Security event displayed | `NOT_FOUND` |
| Stale or invalid data | Reject as control input; alarm; response per mode | All modes | Stale/invalid indication; never shown as current | `NOT_FOUND` |

### 8.4 Configuration record and approval requirement

Every installation must record: drive family, steering type, manual release method and verified behaviour,
isolation device and rating, E-stop location and wiring, feedback type and calibration, heading source and
calibration, approved limits, the approved safe state for each fault class, the modes delivered with
evidence, and the signatories. The record is part of the product; it transfers with the vessel. A vessel
without an approved safe-state record is not eligible for at-sea use.

### 8.5 Power-loss behaviour

The design must make the power-loss response a property of the wiring and hardware, not of software:

- loss of logic power must not leave the drive energised in a direction of travel;
- loss of motor power must leave a manual steering path on every eligible vessel;
- restoration of power must leave the system disengaged and require a new local engage action;
- the behaviour must be demonstrated by test on the bench and on the vessel, with the result recorded.

All of these are requirements (`NOT_FOUND`), not descriptions of existing behaviour.

---

## 9. Manual takeover provisions and independence

Manual takeover is the primary human barrier and must not depend on the good behaviour of software.

| # | Requirement | Evidence state |
| --- | --- | --- |
| MT-01 | A physical, mechanical means of taking manual control must exist and be identified per vessel (clutch, release lever, breakaway, helm override), and must be usable by one person at the helm | `NOT_FOUND` |
| MT-02 | Manual takeover must be possible with the command computer powered, hung, rebooting or disconnected, and with the local network down | `NOT_FOUND` |
| MT-03 | The force/torque required to override or release the drive must be measured and must be within a limit approved for the vessel and crew | `NOT_FOUND` |
| MT-04 | Manual takeover, or deliberate helm intervention, must cause automatic disengagement (SR-06) and must be indicated to the operator | `NOT_FOUND` |
| MT-05 | The takeover drill must be trained, demonstrated at commissioning and repeated in supervised trials; the record must be signed | `NOT_FOUND` |
| MT-06 | The operator manual must describe the takeover drill and state that the computer is not required for it | `NOT_FOUND` |

Current evidence: no manual-takeover detection exists in the audited prototype (MC-02 F-A21: `clutch` is a
copy of the enable flag; F-04). A belt clutch is described as the mechanical means of returning to hand
steering for the reference drive, but that is documentation, not evidence of a verified release.

**Exact physical evidence required before this section can be considered satisfied:**

1. Photographs and a drawing of the installed release mechanism on a representative vessel.
2. Measured override/release force or torque, with the instrument identified.
3. A bench test with the command computer powered off and with the local link disconnected.
4. A vessel test at low speed and, where the approved safe state depends on it, at cruise speed.
5. A signed commissioning record showing the drill was taught to the operator.
6. A signed statement by the qualified engineer that the manual path is adequate for the vessel.

---

## 10. Physical E-stop and independent motor-power isolation

### 10.1 Requirements

| # | Requirement | Evidence state |
| --- | --- | --- |
| ES-01 | A physical E-stop must be located at the helm, within reach of the person steering, clearly labelled, and operable without looking or with wet hands | `NOT_FOUND` |
| ES-02 | The E-stop must physically break the motor power circuit independently of the command computer, the firmware and any software stop | `NOT_FOUND` |
| ES-03 | The E-stop and its power contactor must be rated for the actual DC breaking duty of the surveyed motor circuit, and the rating must be documented | `NOT_FOUND` |
| ES-04 | The E-stop chain must be monitored, with dual channel or a formally documented, independently accepted single-channel risk acceptance; a welded/stuck contactor must not go undetected where the architecture claims monitoring | `NOT_FOUND` |
| ES-05 | An independent motor-power isolation device (breaker or rated contactor) must be installed and lockable for maintenance; it must not be the same device as the E-stop unless the architecture and rating justify it and the risk is accepted | `NOT_FOUND` |
| ES-06 | The firmware must not be able to defeat, inhibit or reuse the E-stop function; loss of firmware or loss of communication must not remove the physical stop | `NOT_FOUND` |
| ES-07 | The E-stop must be tested at commissioning, at periodic intervals and after any work on the motor circuit, with the result recorded | `NOT_FOUND` |
| ES-08 | Documentation and training must state that a software stop is not an E-stop and that the E-stop is not a substitute for lock-off during maintenance | `NOT_FOUND` |

### 10.2 Current evidence — explicitly NOT_FOUND

| Canonical state | Value | Audit basis |
| --- | --- | --- |
| `PILOT_PHYSICAL_ESTOP_EVIDENCE` | `NOT_FOUND` | H-10; the E-stop concept is GPIO-level, the firmware only senses GP13 and never drives a relay/contactor; no part, rating, wiring, test or record exists (HW-13, F-A05, F-A24) |
| `PILOT_MOTOR_ISOLATION_EVIDENCE` | `NOT_FOUND` | H-03, H-10; no independent motor-power isolation exists, and the motor link itself is contradictory between UART and USB CDC (G3) |

The audited prototype's E-stop direction is a design claim, not evidence: the firmware monitors a single NC
contact on one GPIO with a pull-up, has no second channel, no cross-monitoring, no stuck-contact diagnosis
and no test pulse (`VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §2.5 HW-13, §3.2
F-A05/F-A06). The documented protocol claim that a relay opens on heartbeat timeout is not implemented in
the firmware (discrepancy D-01); the relay class only logs state changes (F-A24).

### 10.3 Exact physical evidence required to close this section

1. Selected E-stop device and power contactor/relay: manufacturer, part number, DC voltage/current breaking
   rating, utilisation category, datasheet.
2. Schematic and harness drawing showing the E-stop and isolation device in the motor power path,
   independent of the computer and firmware.
3. Bench measurement of motor current interruption under load, with the instrument and method recorded.
4. Test of the E-stop with the command computer powered off, hung and disconnected.
5. Test of the isolation device under load and verification of lock-off.
6. Stuck/welded contact test or a formally documented single-channel risk acceptance signed by the qualified
   engineer and independent reviewer.
7. Commissioning and periodic test records with dates, results and signatories.
8. A signed statement that no software path can defeat the physical stop.

---

## 11. Watchdog independence and the limits of software watchdogs

### 11.1 Why a software watchdog is not a physical safeguard

A software watchdog runs on the same processor, in the same scheduling environment and often in the same
event loop as the function it supervises. It cannot reliably detect: a hung CPU; a blocked event loop longer
than its own semantics allow it to observe; corrupted memory or I/O; a stalled clock; a failed power rail; a
firmware fault that also disables the watchdog; or a failure in the command path that produces plausible but
wrong commands. It does not remove energy. It is a diagnostic and recovery mechanism, not a protective
device, and it never replaces the physical E-stop or the independent motor-power isolation.

Audit basis (`VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §3.2, §3.4): the
microcontroller has **no** independent hardware watchdog (F-A23); the heartbeat timeout is evaluated inside
the same MicroPython loop that services commands, so a firmware hang defeats both (F-03); the host-side
watchdog is a Node timer in the same event loop as the control loop (F-10). These are code findings, not
measured behaviour.

### 11.2 Requirements

| # | Requirement | Evidence state |
| --- | --- | --- |
| WD-01 | An independent hardware watchdog with its own timebase must supervise the real-time control path and be able to force the drive to the approved safe state | `NOT_FOUND` |
| WD-02 | The watchdog output path must be fail-safe: loss of the watchdog's own power or failure of its output must remove drive output, not preserve it | `NOT_FOUND` |
| WD-03 | The command heartbeat timeout must be evaluated outside the loop that services commands and must be testable by fault injection | `NOT_FOUND` |
| WD-04 | The host/commander software watchdog may exist as an additional layer but must not be credited in the safety argument | `NOT_FOUND` |
| WD-05 | Watchdog behaviour must be verified by injection: halt the loop, stop the heartbeat, block the task, corrupt a message, remove and restore power — each with recorded timing and result | `NOT_FOUND` |
| WD-06 | A watchdog trip must latch, indicate and require local rearm; repeated trips must escalate to a maintenance action | `NOT_FOUND` |

---

## 12. Interface authority map

### 12.1 Authority table

Authority is a safety boundary, not a feature list. "None" means the interface cannot affect steering by
design, and that prohibition must be enforced and tested, not merely documented.

| Interface | May read | May write | Steering command authority | Engage / disengage / mode authority | Current evidence | Rule |
| --- | --- | --- | --- | --- | --- | --- |
| **Local control head (physical)** | Pilot state, mode, alarms | Engage, disengage, mode selection, target adjustment within approved limits, manual standby | **Yes** — the only source of drive commands inside the vessel | **Sole authority** | `OPEN` — no control-head article exists (H-05, H-07) | The person at the helm is the only engagement authority |
| **Pilot local service port** | Diagnostics, logs, configuration | Tuning, calibration, firmware update, fault records | No direct steering command outside an explicit local service action | No engage authority | `OPEN` — prototype API is unauthenticated and LAN-open (H-02) | Physical local presence, authenticated, authorised, recorded |
| **MAREA NAV** | Pilot status (read-only) if an authorised integration exists | Route/waypoint context as an **input** | **No** | **No** | `OPEN` — no integration exists | Route data is an input; NAV never commands the actuator (README §19; D1 F09) |
| **MAREA HUB** | Pilot status (read-only) | Bounded instrument/nav data | **No** | **No** | `OPEN` — HUB is not the actuator controller (README §19) | HUB may publish and read status; it is never the steering controller |
| **MAREA WATCH** | Authorised read-only status | Nothing to the vessel control path | **No** | **No** | `OPEN` — no remote monitoring service exists; MC-02 C-08 `NOT_FOUND` | Display only; no remote engage, disengage, heading change or steering command |
| **MAREA SENSE** | N/A | Sensor measurements to the local bus | **No** — a generic sensor is not automatically a steering input | **No** | `OPEN` — SENSE measurement accuracy is not measured; SENSE NMEA 2000 not implemented | Inputs must be individually qualified and calibrated for steering |
| **MAREA DISPLAY** | Pilot status (read-only) where an approved interface exists | Nothing to the control path | **No** | **No** | `OPEN` — DISPLAY has no article | Presentation only; no authority |
| **Website / commerce / customer account** | Public product information, catalogue, account data | Orders, account details, contact requests | **No** | **No** | `VERIFIED_REPO src/server/api.ts` defines only commerce routes (`/auth/*`, `/account*`, `/shop/products*`, `/shop/config`, `/orders*`, `/contact`, `/stripe/webhook`); no vessel-control route exists. Informational pages about autopilots exist as marketing/education content and are not control surfaces | No operational vessel control in commerce endpoints; no steering command may be added (AGENTS.md architecture rules) |
| **Cloud / remote service** | Nothing that can write to the control path | Nothing to the control path | **Prohibited** | **Prohibited** | `OPEN` — no cloud service exists; MC-02 C-08 `NOT_FOUND`; H-13 CRA relevance | A remote or cloud steering path may never be introduced; any future remote function requires a new safety case |
| **Mobile application** | Read-only status only if ever built | Nothing to the control path | **Prohibited** | **Prohibited** | `OPEN` — no application exists | A mobile app may not steer, engage, disengage or tune |
| **Maintenance / service tooling** | Diagnostics, logs | Calibration, limits, firmware, rearm | Only through explicit, physical, authorised local service actions | No engage authority | `OPEN` — no tooling exists | Service actions must be logged and attributable |
| **Firmware update channel** | Version and status | Firmware image | **No** | **No** | `OPEN` — no update mechanism exists; H-13 | Integrity-checked, signed, rollback-protected; update cannot enable an unverified mode |

### 12.2 Prohibition of remote or cloud steering and proof obligations

Design rule: **no remote or cloud steering command path exists or may be introduced.** This is a
`VERIFIED_REPO` programme rule (`docs/marea/products/README.md` §16 rule 1 and §19; `COMMERCIAL-BRAND-CLAIMS-POLICY.md`
§4.3, §5) and a design requirement, not a statement about an implementation, because no PILOT implementation
exists. The audited prototype has no cloud uplink or remote monitoring service (MC-02 C-08 `NOT_FOUND`), but
its local HTTP command API is unauthenticated and LAN-open (H-02, F-01), which is a cyber/unauthorised-command
hazard, not a cloud path.

Proof obligations before any claim that the boundary is real:

1. A published interface contract that enumerates every input and output, with direction and authority.
2. An architecture review and a data-flow diagram showing no path from any network, website, cloud or
   partner system to the actuator.
3. Code and configuration review of the control plane: authentication, authorisation, bind address, CORS,
   service discovery, update channel.
4. Network test: scan of the vessel installation and of any remote management surface, showing no exposed
   command route.
5. Penetration test against the local and remote surfaces, with findings closed.
6. Deployment policy: no port forwarding, no reverse proxy to the control plane, no remote support session
   with command capability.
7. CRA-aligned vulnerability handling and update process (§15), because remote compromise is a cyber
   hazard even if the cloud cannot steer directly.

All seven are `OPEN`. No penetration test, architecture review or interface contract exists.

---

## 13. Safe commissioning requirements

Commissioning is a safety gate. These are requirements; **none has been performed**.

| # | Requirement | Required record | Responsible function | Current state |
| --- | --- | --- | --- | --- |
| C-01 | Pre-quotation vessel survey covering steering system, drive, manual release, feedback, heading, electrical system and installation locations | Survey form with measurements, photographs, eligibility verdict | Authorised installer | `NOT_FOUND` |
| C-02 | Drive compatibility and calibration: direction, current limit, duty, motion limits, verified against the surveyed drive rating | Calibration record with measured values and instruments | Commissioning technician | `NOT_FOUND` |
| C-03 | Heading calibration and deviation verification, including a check against an independent heading reference | Calibration record with deviations and conditions | Commissioning technician | `NOT_FOUND` |
| C-04 | Rudder/steering feedback verification: range, direction, end-stops, plausibility, and a physical end-stop test at reduced power | Feedback verification record | Commissioning technician | `NOT_FOUND` — `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND` |
| C-05 | Physical E-stop and independent isolation verification: function under load, with the computer on, off, hung and disconnected; lock-off check | E-stop and isolation test record | Commissioning technician + witness | `NOT_FOUND` — `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`, `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND` |
| C-06 | Manual takeover demonstration: release/override at the helm, with and without computer power; measured force/torque | Takeover test record | Commissioning technician + operator | `NOT_FOUND` |
| C-07 | Dockside validation checklist: direction, stop functions, alarms, limits, mode entry/exit, engagement indication, no movement when disengaged | Signed dockside checklist | Commissioning technician | `NOT_FOUND` |
| C-08 | Configuration record: vessel, drive, limits, safe states per fault, modes delivered with evidence, software/firmware versions, signatories | Configuration record | Commissioning technician + qualified engineer | `NOT_FOUND` |
| C-09 | Sign-off gate: no at-sea use until C-01–C-08 are complete and signed and the safe state is approved | Signed handover authorisation | Qualified marine engineer | `NOT_FOUND` |
| C-10 | Operator training and handover pack: engage/disengage, takeover, E-stop, alarms, limits, residual risks, maintenance checks | Training record and handover pack | Installer + operator | `NOT_FOUND` |

No vessel may be delivered or used at sea until the sign-off gate C-09 is satisfied and the first supervised
sea trial (§14) has been completed and recorded.

---

## 14. Supervised sea-trial requirements

A sea trial is the only way to produce vessel-level evidence; unit tests, simulation and bench code are
explicitly not sale-readiness evidence (MC-02 §3.7 rule). **`PILOT_SEA_TRIALS = NOT_PERFORMED`.** No trial
has been planned with a named vessel, no crew briefing exists and no trial record exists.

### 14.1 Incremental trial plan (requirements)

| Stage | Objective | Entry criteria | Exit criteria | Abort criteria | State |
| --- | --- | --- | --- | --- | --- |
| ST-0 Dockside | Prove direction, stops, E-stop, isolation, manual release, alarms and limits without propeller/rudder load risk | C-01–C-08 signed; vessel secured; competent crew briefed | All checks pass and are recorded; any defect closed and re-tested | Any failure of a stop function, E-stop, isolation or manual release | `NOT_PERFORMED` |
| ST-1 Low-speed heading hold | Establish basic stability and authority at low speed in open water | ST-0 passed; benign conditions; observer aboard | Heading held within the approved band; manual takeover demonstrated; no alarms | Loss of manual control, uncommanded movement, overcurrent trip, any doubt | `NOT_PERFORMED` |
| ST-2 Cruise-speed heading hold | Verify behaviour at the vessel's normal cruising speed and load | ST-1 passed; sea state within the approved limit | Approved performance and stability envelope recorded | Same as ST-1 plus structural or drive stress indications | `NOT_PERFORMED` |
| ST-3 Failure injection | Verify detection and response for heading loss, wind loss (if fitted), GNSS loss, heartbeat loss, computer crash, watchdog trip, sensor stale, overcurrent trip | ST-2 passed; fault-injection plan approved; safe area | Each injected fault produces the approved safe state and indication within the approved bound | Any failure to detect, respond or indicate; any uncommanded movement | `NOT_PERFORMED` |
| ST-4 Manual takeover under load | Verify takeover and disengagement at speed and under load, with and without computer power | ST-2 passed; trained crew | Takeover demonstrated within the approved effort/time; disengagement recorded | Inability to take over; excessive force; automatic resumption | `NOT_PERFORMED` |
| ST-5 WIND mode (conditional) | Verify wind-angle behaviour on representative points of sail and the defined loss response | ST-2 and ST-4 passed; calibrated wind source; PILOT Sail evidence plan approved | Mode-specific envelope recorded; loss response demonstrated | Uncontrolled turn, tack or gybe; sensor loss not handled | `NOT_PERFORMED` |
| ST-6 TRACK mode (conditional) | Verify route following, cross-track behaviour, waypoint advance, GNSS degradation and no-go-zone response | ST-2 and ST-4 passed; validated routes; NAV input contract verified | Mode-specific envelope recorded; degradation demonstrated | Route/position failure not handled; hazard-zone entry | `NOT_PERFORMED` |
| ST-7 Night and low-visibility | Verify indication, alarms and takeover in the conditions in which the product is intended to be used | ST-1 to ST-4 passed | Records demonstrate usable indication and drills | Any indication or alarm that cannot be perceived at the helm | `NOT_PERFORMED` |
| ST-8 Endurance / repeatability | Verify long-duration behaviour, thermal stability and repeatability of the safety paths | Previous stages passed | Approved duration and conditions recorded | Thermal, drift or repeatability failure | `NOT_PERFORMED` |

### 14.2 Trial governance requirements

1. A written trial plan naming the vessel, configuration, sea area, conditions, stages, abort criteria and
   the competent observer, approved by the qualified marine engineer before the trial.
2. A pre-trial crew briefing covering the plan, the manual takeover and E-stop drills, communications,
   abandon criteria and the person in command.
3. All safety-critical parameters instrumented; timing and response measurements recorded with identified
   instruments.
4. Logs, video where appropriate, alarm history, firmware versions and configuration retained as the trial
   record.
5. Every incident, near miss and deviation recorded, including the response and the corrective action.
6. The trial record signed by the installer, the observer and the qualified engineer; a human signatory,
   never an AI agent.
7. Nothing may be claimed as verified beyond the conditions and vessel of the recorded trial.

No stage may be skipped. A mode may not be delivered to a customer until its stage and the preceding stages
pass on a representative vessel.

---

## 15. Standards and conformity route research

### 15.1 Method and non-declaration

Method: official sources only; each act or standard was checked for its **actual scope**, not its title.
Scope summaries below are quoted or closely paraphrased from the official source, with the URL and the
access date (all accessed 2026-10-30). Full standard texts were not purchased or read; only the public
abstract/scope was verified. No clause-level claim is made.

**Non-declaration:** no standard is declared applicable to MAREA PILOT; no conformity assessment route is
selected; no notified body has been engaged; no test laboratory has been engaged; no declaration of
conformity, CE marking, wheel-mark approval, type approval or certificate of any kind exists. The
applicability notes below are questions for a conformity engineer and legal counsel, not determinations.
This matches the MC-02 position (`VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §5.8:
no CE marking, no DoC, no EMC/RED/LVD/RoHS/WEEE/GPSR/CRA compliance is asserted).

### 15.2 EU legislative acts: verified scope and applicability questions

| Act | Official source (accessed 2026-10-30) | Verified scope points relevant to PILOT | PILOT applicability question (not a determination) | Current evidence |
| --- | --- | --- | --- | --- |
| **Recreational Craft Directive 2013/53/EU** | https://eur-lex.europa.eu/eli/dir/2013/53/oj ; summary https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32013L0053 | Applies to recreational craft and partly completed craft, personal watercraft, components listed in Annex II, propulsion engines and craft subject to major conversion (Article 2). Annex II components are: ignition-protected equipment for inboard/stern-drive petrol engines and petrol tank spaces; start-in-gear protection devices for outboard engines; steering wheels, steering mechanisms and cable assemblies; fuel tanks and fuel hoses; prefabricated hatches and port lights. Design categories A–D and CE marking obligations apply to craft and designated components. The summary notes the Commission publishes and updates the list of harmonised standards for recreational craft. | **Not a designated component:** an electronic steering-control system is not in the Annex II list, so PILOT is not itself a "component" under the RCD on the verified text. Whether an installed PILOT affects the craft's compliance with the RCD essential requirements (for example steering, visibility, operator information) is a question for the craft builder, installer and legal counsel; **LEGAL_REVIEW_REQUIRED**, not decided here | `VERIFIED_EXTERNAL` scope; MAREA product conformity `NOT_STARTED` (H-06) |
| **EMC Directive 2014/30/EU** | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32014L0030 | Applies to "equipment", covering apparatus and fixed installations; does not apply to radio equipment within the RED scope, certain R&D kits, amateur radio equipment in defined cases, inherently benign equipment and specified airborne equipment; ceases to apply where essential requirements are laid down more specifically by other EU legislation. Apparatus requires conformity assessment, technical documentation, EU declaration of conformity and CE marking | A PILOT installation with a switched motor drive is apparatus in principle; if a radio module is included, the RED relationship must be resolved. **Applicability is a conformity-engineer decision**, and no EMC assessment has been performed | `VERIFIED_EXTERNAL` scope; conformity `NOT_STARTED`; no EMC design or pre-compliance measurement (C-02 in MC-02) |
| **Radio Equipment Directive 2014/53/EU** | https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red_en | Establishes the regulatory framework for radio equipment; essential requirements for safety/health, EMC and spectrum; applicable as of 13 June 2016. The page records that the CRA entered into force on 10 December 2024, that its main obligations apply from 11 December 2027, and that Delegated Regulation (EU) 2026/339 repeals the RED cybersecurity Delegated Regulation (EU) 2022/30 with effect from 11 December 2027 | **Only if a radio is included.** No radio has been selected for PILOT; if Wi-Fi, cellular or another transmitter is added, RED becomes an applicability question and module certification does not automatically cover the host | `VERIFIED_EXTERNAL` scope; radio selection `OPEN`; conformity `NOT_STARTED` |
| **Low Voltage Directive 2014/35/EU** | https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/low-voltage-directive-lvd_en | Covers electrical equipment with an input or output voltage between 50 and 1000 V AC, or 75 and 1500 V DC; applicable since 20 April 2016 | The recorded PILOT architecture is a 12 V DC system, below the LVD thresholds: **not applicable on the current recorded architecture**. The determination flips if a mains power supply or charger is included in the installation, which must be re-assessed at design freeze | `VERIFIED_EXTERNAL` scope; architecture `OPEN`/`NOT_SELECTED` (H-05) |
| **General Product Safety Regulation (EU) 2023/988** | https://eur-lex.europa.eu/eli/reg/2023/988/oj (Article 52: applies from 13 December 2024); summary https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32023R0988 | Applies to consumer products placed or made available on the market that are not covered by other specific EU safety legislation, and to the risks/aspects not already covered by it; imposes the general safety requirement, internal risk analysis, technical documentation, traceability, accident reporting and recall duties; a responsible economic operator in the EU is required. GPSR does not impose CE marking (MC-02 determination C-05, `VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §5.4) | A consumer PILOT hardware installation is plausibly within GPSR scope for risks not covered by the EMC/RED/RCD acts; the safety case, technical documentation and traceability obligations would then apply. **Applicability and classification require a compliance-engineer and legal determination**; no GPSR risk assessment or technical file exists | `VERIFIED_EXTERNAL` scope; conformity `NOT_STARTED` |
| **Cyber Resilience Act (EU) 2024/2847** | https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act | Mandatory cybersecurity requirements for products with digital elements across planning, design, development and maintenance; vulnerability handling; CE marking; some products may require third-party assessment. Entered into force 10 December 2024; **reporting obligations apply from 11 September 2026; main obligations from 11 December 2027** | **Applicability questions, not compliance.** Whether PILOT is a product with digital elements, which classification applies, and which conformity route is required are legal determinations. The audited prototype has no vulnerability handling, secure update, SBOM or incident reporting (H-13), so the product is not designed for the obligations that are already in force | `VERIFIED_EXTERNAL` scope and dates; conformity `NOT_STARTED`; H-13 `BLOCKED` |
| **Marine Equipment Directive 2014/90/EU (adjacent)** | MC-02 determination (internal evidence): `docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §5.4 C-09, §5.6 | Applies to marine equipment on ships flying an EU flag under the international conventions; third-party assessment and wheel mark; transposed in Spain by Real Decreto 701/2016. MC-02 records it as `NOT_APPLICABLE_WITH_EXPLANATION` for the recorded recreational target market, becoming potentially applicable for professional/commercial channels | **Not applied to PILOT for the recreational market on the recorded determination.** If PILOT is sold for a classed/flag-state/commercial vessel, MED scope and national rules become a legal-review question. No wheel mark may be used | `VERIFIED_REPO` MC-02 determination; legal review `OPEN` for professional channels |

The RCD summary also records that the Commission publishes and updates the list of harmonised standards for
recreational craft. **No harmonised standard has been identified as applicable to PILOT, and no presumption
of conformity is claimed.**

### 15.3 Marine standards: candidate references and verified scope

These are **candidate references for future assessment**, not applicable standards. Each was checked against
its official ISO catalogue abstract on 2026-10-30. The full texts are not held.

| Candidate | Official source | Verified scope (from the official abstract) | Relevance to PILOT | Status |
| --- | --- | --- | --- | --- |
| **ISO 25197:2020** — Small craft — Electrical/electronic control systems for steering, shift and throttle | https://www.iso.org/standard/71354.html | Establishes requirements for design, construction and testing of electrical/electronic steering, shift and throttle systems and dynamic positioning control systems on small craft up to 24 m hull length. **Explicitly does not apply to electric trolling motors and autopilot systems on sailing craft.** Published 2020-04; in revision; Amendment 1:2022 exists | Relevant context for electrical/electronic steering control on small **motor** craft; **explicitly not the sailboat autopilot case**. It cannot be declared applicable to PILOT Sail on the verified scope, and its full text is not held | **Not applicable declared**; scope verified only |
| **ISO 11674:2019** — Ships and marine technology — Heading control systems | https://www.iso.org/standard/68748.html | Minimum operational, functional and performance requirements, test methods and required results for heading control systems installed on board **ships** conforming to IMO Resolution MSC.64(67) Annex 3; takes account of IMO A.694(17) and IEC 60945; ship models for simulator performance testing assume propeller propulsion with conventional rudder, up to 30 knots | It addresses shipboard heading control systems against IMO performance standards, not recreational small-craft autopilots; useful as a methodological reference only if the target market changes | **Not applicable declared**; scope verified only |
| **ISO 16329:2003** — Ships and marine technology — Heading control systems for high-speed craft | https://www.iso.org/standard/30256.html | Structure, performance, inspection and testing of heading control systems for craft operating at speeds exceeding 30 kn and up to 70 kn, maximum rate of turn 20°/s, normal operation between 70°N and 70°S, per HSC Code chapter 13 | Defines the high-speed craft class that §2.2 D-10 excludes from the current envelope; it is not a recreational sailing/motor-cruiser autopilot standard | **Not applicable declared**; excluded class |
| **ISO 8846:2025** — Small craft — Electrical devices — Protection against ignition of surrounding flammable gases | https://www.iso.org/standard/87197.html | Test methods and requirements for the design of electrical devices on small craft so that, under normal operating conditions, they can be operated without igniting a surrounding flammable gas atmosphere; excludes hydrogen/air mixtures, devices with dysfunctional issues, and ignition from external sources such as static electricity or lightning | Relevant **only if** any PILOT device is installed in a petrol engine space or other flammable-gas-risk location; there is no such installation design today | **Not applicable declared**; conditional on installation location (§2.2 D-12) |

Conclusion: the verified scopes do not support declaring any of these standards applicable to a supervised
recreational steering system at MC-06. In particular, ISO 25197 explicitly excludes autopilot systems on
sailing craft, and ISO 11674 and ISO 16329 address ship/HS craft populations outside the current PILOT
envelope. A future conformity engineer must select and purchase the actual applicable standards (which may
be national, EN or ISO, or none) after the product, drive family and target vessel population are frozen.

### 15.4 Conformity route status

| Item | Status |
| --- | --- |
| Applicable EU acts identified | `OPEN` — scope questions listed; no determination |
| Standards selected and purchased | `NOT_STARTED` — no standard held |
| Accredited laboratory engaged | `NOT_STARTED` |
| Notified body engaged | `NOT_STARTED` |
| Declaration of conformity | `NOT_STARTED` — none exists |
| CE marking | `NOT_STARTED` — none exists and none may be affixed |
| CRA vulnerability handling, SBOM, incident process | `NOT_STARTED` — reporting obligations dated 2026-09-11 and main obligations 2027-12-11 are recorded as applicability questions only (H-13) |
| Wheel mark / MED | `NOT_STARTED` — not applied to the recreational envelope |
| Independent marine-engineer review | `NOT_STARTED` |

---

## 16. Verification and evidence plan

### 16.1 Verification legend

| Code | Method | What it can establish |
| --- | --- | --- |
| AN | Analysis and document review | Design intent, hazard coverage, interface contracts, calculations |
| IN | Inspection | Hardware presence, ratings, wiring, labelling, installation records, calibration records |
| BT | Bench test with instrumentation | Timing, current, thermal, stop function, force, E-stop under load, fault injection |
| HIL | Hardware-in-the-loop | Controller/firmware behaviour with real I/O and simulated vessel, including injected faults |
| ST | Supervised sea trial | Vessel-level behaviour in the approved conditions and configuration |
| RV | Independent review and sign-off | Adequacy of the argument and of the evidence; approval |

No verification method has been executed. The audit's own code tests (54 TypeScript cases, 15 Pico policy
cases) are not repeated as safety evidence: they are host-side unit tests with mocked or simulated
boundaries (`VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §6.1, §6.3; P-10 says
the Node/TypeScript suites are unexecuted).

### 16.2 Required physical and bench evidence

| ID | Evidence | Method | Required content | State |
| --- | --- | --- | --- | --- |
| EV-B01 | Heartbeat/timeout cut, measured | BT | Instrumented timing from heartbeat loss to zero drive output; repeatability; conditions | `NOT_FOUND` |
| EV-B02 | E-stop under load | BT | Measured interruption time and current; E-stop with computer on/off/hung/disconnected | `NOT_FOUND` |
| EV-B03 | Independent isolation under load | BT, IN | Isolation device rating; interruption; lock-off verification | `NOT_FOUND` |
| EV-B04 | Overcurrent trip and fuse coordination | BT | Measured trip current/time; fuse/breaker coordination; drive rating | `NOT_FOUND` |
| EV-B05 | Thermal behaviour | BT | Temperature rise under sustained duty and stall; protection response | `NOT_FOUND` |
| EV-B06 | Direction and command integrity | BT | Correct direction for every command; no movement when disengaged; command corruption response | `NOT_FOUND` |
| EV-B07 | Manual takeover and override force | BT, IN | Measured force/torque; release with computer on/off/hung | `NOT_FOUND` |
| EV-B08 | Watchdog and fault injection | HIL, BT | Loop hang, blocked task, lost heartbeat, corrupted message, power loss/restore; each with response and timing | `NOT_FOUND` |
| EV-B09 | Rudder feedback and end-stop | BT, ST | Range, direction, plausibility, end-stop protection at reduced power | `NOT_FOUND` |
| EV-B10 | Environmental and EMC | BT | Ingress, thermal, vibration and EMC evidence for the installation location; no IP claim before test | `NOT_FOUND` |
| EV-B11 | Software safety logic review | AN, RV | Fault manager, state machine, interface, authentication, update path | `NOT_FOUND` |
| EV-B12 | Firmware in CI and reproducible build | IN, AN | Firmware tests executed in CI; version reported by the device; reproducible build | `NOT_FOUND` |

### 16.3 Verification sequencing

Analysis and design review (AN/RV) → bench (BT) → HIL fault injection → independent review of bench/HIL
evidence → dockside validation → supervised sea trials by mode → independent review of the trial records →
gate decision. No at-sea stage may precede the previous stage's signed result. The HIL bench itself must be
verified as isolated first: the audited "isolated" bench defaults point at production ports, a defect that
must be fixed before HIL is used as safety evidence (H-09; MC-02 G1).

---

## 17. PILOT safety gate: `PILOT_SAFETY_GATE = BLOCKED`

The gate is closed. Every closing condition below is required; none is satisfied. No partial closure may be
read as progress towards sale.

| Gate | Closing condition | Required evidence (exact artefact) | Responsible function | Current state |
| --- | --- | --- | --- | --- |
| G-01 | Approved safety case | Full safety case (this outline expanded), hazard log, FMEA/FMECA, fault trees, common-cause analysis, risk-acceptance record, approved by the qualified signatory and independent reviewer | Independent Marine Safety Engineer + qualified marine safety engineer (human) | `BLOCKED` — outline only; no analyses; no approvals |
| G-02 | Qualified engineering review | Signed review by a competent marine engineer/naval architect, independent of PILOT engineering and commercial management, covering architecture, safe states and evidence | Independent reviewer (human) | `NOT_PERFORMED` |
| G-03 | Electrical and mechanical validation | Bench reports EV-B01–EV-B07 and EV-B09–EV-B10 with measurements, instruments and signatories; drive rating and fuse coordination records | Engineering + commissioning technician | `NOT_FOUND` |
| G-04 | Independent safety boundaries | Architecture evidence: separate motor-control electronics, hardware watchdog, independent power cut, authenticated local control plane; review of the boundaries | Engineering + independent reviewer | `NOT_FOUND` — code-level concepts only (F-A19, F-A23, F-A24) |
| G-05 | Physical E-stop evidence | `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`; exact evidence list in §10.3 | Hardware engineering + commissioning | `NOT_FOUND` |
| G-06 | Independent motor-power isolation evidence | `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`; rated device, schematic, load test, lock-off | Hardware engineering + commissioning | `NOT_FOUND` |
| G-07 | Tested manual takeover | §9 evidence: release demonstration, measured force, computer-on/off/hung tests, trained drill, signed record | Commissioning + independent reviewer | `NOT_FOUND` |
| G-08 | Rudder/steering feedback | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`; feedback installed, calibrated and verified, or a formally approved open-loop risk acceptance | Hardware engineering + commissioning | `NOT_FOUND` |
| G-09 | Real commissioning | At least one representative vessel fully commissioned per §13, with signed survey, calibration, dockside checklist and configuration record | Authorised installer + qualified engineer | `NOT_FOUND` |
| G-10 | Supervised sea trials | `PILOT_SEA_TRIALS = NOT_PERFORMED`; trial plan, records and sign-off per §14, by mode and stage | Installer + observer + qualified engineer | `NOT_PERFORMED` |
| G-11 | Documented vessel types | Approved eligibility envelope per drive family and steering type (§2), with the exclusion list and the conditions for each family; published compatibility matrix | Product + engineering + safety | `OPEN` — no approval |
| G-12 | Conformity evidence | Applicability determination, selected standards, test reports, technical file, EU declaration of conformity where required, CE marking where required, CRA process; or a documented, lawful route that excludes the product from those obligations | Compliance engineer + counsel | `NOT_STARTED` — H-06, H-13 |
| G-13 | Secure and authenticated control plane | Authentication, authorisation, binding policy, update integrity, penetration test results | Engineering + security | `BLOCKED` — H-02, H-13 |
| G-14 | Licensed firmware and code position | Written licence/assignment for any reused code and for firmware programmed into sold boards | Company owner + counsel | `BLOCKED` — L-01–L-03 |
| G-15 | Approved documentation and residual-risk disclosure | Operator manual, installation procedure, maintenance plan, residual-risk disclosure approved by the signatory | Documentation + safety | `NOT_FOUND` |

**Gate verdict: `PILOT_SAFETY_GATE = BLOCKED`.** No SKU may be sold, pre-sold, installed, quoted as ready or
described as safe while any of G-01–G-15 is unsatisfied. The programme rule is absolute: a PILOT product may
not be marketed with steering performance claims until the physical and trial evidence exists (MC-02 §3.7
rule; H-01, P-04).

---

## 18. Residual-risk disclosure requirements for the future owner document

A future owner document (operator manual and handover pack) must disclose residual risks explicitly, in
plain language, in the product's language, before any at-sea use. No owner document exists today; the
content below is the requirement for it, not a draft manual.

| # | Required disclosure | Why | Owner function | State |
| --- | --- | --- | --- | --- |
| R-01 | The system is supervised steering assistance and does not replace watchkeeping, charts, required equipment or the skipper's responsibility | Legal and safety baseline; claims policy §4.1, §4.3 | Documentation + safety | `NOT_FOUND` |
| R-02 | The exact operating envelope for this vessel: sea state, wind, speed, modes and conditions | Using it outside the envelope is a credible misuse (M-03) | Commissioning + documentation | `NOT_FOUND` |
| R-03 | Known single points of failure and accepted single-channel risk decisions, with the rationale | Transparency; residual-risk acceptance must be explicit | Safety + qualified engineer | `NOT_FOUND` |
| R-04 | What happens on each fault class: alarm, response, safe state, whether steering is available | Operator must know what to do (SG-08) | Engineering + documentation | `NOT_FOUND` |
| R-05 | Manual takeover drill and E-stop drill, with the physical location of the E-stop and isolation device | Primary human barriers (SG-01, SG-02) | Documentation + training | `NOT_FOUND` |
| R-06 | Power-loss behaviour and what the helm will feel like | HZ-05; unexpected helm feel causes panic and error | Engineering + documentation | `NOT_FOUND` |
| R-07 | Maintenance, inspections, periodic E-stop/isolation tests and lock-off procedure | HZ-10 | Service + documentation | `NOT_FOUND` |
| R-08 | Declared environmental limits and the fact that no ingress protection rating is claimed until tested | H-05, HZ-04 | Hardware + documentation | `NOT_FOUND` |
| R-09 | That the product is not certified, not type-approved and not suitable for commercial/classed vessels | Claims policy; M-13 | Documentation + legal | `NOT_FOUND` |
| R-10 | That software updates may change behaviour; which version is installed; how to verify it | CRA-relevant; reproducibility | Engineering + documentation | `NOT_FOUND` |
| R-11 | What to do if an alarm cannot be cleared, and that the system must not be used until diagnosed | M-10, M-15 | Documentation + support | `NOT_FOUND` |
| R-12 | That records (survey, calibration, commissioning, trials, maintenance) must transfer with the vessel | Traceability of the safety argument | Documentation | `NOT_FOUND` |

The disclosure must be signed by the human safety-case signatory and accepted in writing by the owner at
handover. An AI agent may draft text but may not sign, approve or accept it.

---

## 19. Signatories, independence and limitation statements

### 19.1 Required signatories

| Role | Required qualification | Independence requirement | Status |
| --- | --- | --- | --- |
| **Author / preparer of this outline** | AI agent acting in the Independent Marine Safety Engineer role, MC-06 | Not independent in the legal sense; cannot sign or approve | `OUTPUT PREPARED — NOT A SIGNATORY` |
| **Safety-case signatory (human)** | Qualified marine safety engineer or naval architect with demonstrated competence in marine steering/control systems, electrical safety, hazard analysis and functional-safety arguments; professional indemnity appropriate to the product | Independent of PILOT commercial management and of the engineering team that designed the product; must be named and traceable | `NOT_SIGNED — REQUIRED` |
| **Independent reviewer (human)** | Different competent engineer from the author and from the PILOT design team; marine/naval-architecture and safety competence | Full independence; must review the primary evidence, not the summary | `NOT_PERFORMED — REQUIRED` |
| **PILOT engineering acceptance** | Engineering lead and hardware responsible | Accountable for the implementation and evidence | `NOT_SIGNED — REQUIRED` |
| **Vessel-configuration approval (per installation)** | Qualified engineer approving the drive family, safe state and trial evidence for that vessel | Independent of the installing commercial interest where practicable | `NOT_PERFORMED — REQUIRED` |

### 19.2 Separation of duties

- The author of the safety case may not be the independent reviewer.
- The commercial owner of PILOT may not be the safety-case signatory or the independent reviewer.
- The installer may not approve the safety case for their own installation; the vessel-configuration
  approval must be independent of the commercial installation interest where practicable.
- No subscription, commercial or brand function has any authority over the safety case or the gate.

### 19.3 Limitation statements (binding on this document)

1. **This document is not a certification and not a test report.** No test was executed, no measurement was
   taken, no hardware was energised and no vessel was used in MC-06.
2. **`PILOT_SAFETY_GATE = BLOCKED`.** No PILOT configuration is safe, sale-ready, installable or operable at
   MC-06.
3. **No AI agent may control a live vessel.** No AI agent may engage, tune, steer or stop a vessel, and no AI
   agent may sign, approve or certify this safety case or a residual-risk acceptance. The human signatory in
   §19.1 is mandatory.
4. **No remote or cloud steering path exists or may be introduced.** Any future remote function requires a
   new safety case and a new gate.
5. **No standard is declared applicable and no conformity exists.** The standards research is scope-checking
   for a future conformity programme, not a declaration.
6. **Nothing here may be quoted in customer copy** to imply safety, certification, reliability, performance
   or readiness.

---

## 20. Traceability annex

### 20.1 MC-02 blockers and decisions addressed

| MC-02 id | Blocker summary | Where addressed in this outline | Current state |
| --- | --- | --- | --- |
| H-01 | PILOT commercialisation safety gate `BLOCKED`; no bench, sea trial, independent verification or conformity; no rudder feedback/takeover detection | §0.2, §2.2, §6, §7, §9, §17 | `BLOCKED` |
| H-02 | Unauthenticated, LAN-open autopilot HTTP command API | SR-01, SR-05, SR-31, SR-38, §12 | `BLOCKED` |
| H-03 | Contradictory motor link (UART vs USB CDC); no independent isolation evidence | SR-08, §8.5, §10, G-06 | `NOT_FOUND` |
| H-05 | No physical build, measurement, environmental or EMC evidence | §1.3, SR-35, SR-36, EV-B10 | `BLOCKED` |
| H-06 | CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA not started | §15, G-12 | `NOT_STARTED` |
| H-07 | No BOM, supplier quotes, manufacturing or traceability evidence | §2.2, E-02, SR-42 | `BLOCKED` |
| H-10 | No hardware watchdog, relay output, rudder/end-stop enforcement; E-stop concept only | SR-07, SR-09, SR-14, §10, §11 | `NOT_FOUND` |
| H-13 | CRA obligations and no vulnerability handling, secure update, SBOM or incident reporting | SR-38, SR-41, §15.2, G-13 | `BLOCKED` |
| P-04 | PILOT safety gate `BLOCKED`; do not offer for sale | §0.2, §17 | `BLOCKED` |
| P-10 | Engineering reuse status inventory-level; Node/TypeScript tests unexecuted | §0.3, §16.1 | `OPEN` |
| H-04 (additional) | NMEA 2000 not implemented; no licence or certification | §2.2 D-4, SR-29, §12 | `BLOCKED` |
| H-09 (additional) | "Isolated" test bench is not isolated by default | §16.3 | `OPEN` |
| L-01–L-03 (additional) | No inbound licence/assignment for reuse of the audited code | G-14 | `BLOCKED` |
| X-07 (additional) | No device identity, provisioning, ownership transfer or incident-response model | SR-38, SR-41 | `OPEN` |

### 20.2 Internal references

| Reference | Use in this outline |
| --- | --- |
| `docs/marea/products/README.md` §4, §5, §14, §15, §16, §18, §19, §23 | Readiness dimensions, evidence classes, edition verdicts, canonical states, claim rules, cross-product authority, MC-06 prohibitions |
| `docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md` (D1) | Intended commercial product, users, editions, modes, installation model |
| `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` (H-01, H-02, H-03, H-05, H-06, H-07, H-10, H-13, P-04, P-10; plus H-04, H-09, L-01–L-03, X-07 as additional dependencies) | Controlling blockers |
| `docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §2, §3, §4, §5 | Hardware inventory, safety audit F-A01–F-A28, findings, discrepancies, gates G1–G9, conformity matrix and non-assertions |
| `docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §5, §6, §7 | Capability states, executed-test scope, gaps G1–G4, G9 |
| `docs/marea/compliance/MAREA-PRODUCT-REUSE-MAP.md` §4.4 | PILOT reuse status and decision register |
| `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2, §4, §5, §9 | Prohibited claims, safety-critical language, disclaimer wording |
| `docs/marea/COMMERCIAL-PORTFOLIO.md` §04 | Intended offer, buying path and non-negotiable safety requirements |

### 20.3 External sources checked for this document

All accessed **2026-10-30**. Only scope statements were verified; full standard texts were not purchased or
read.

| Source | URL |
| --- | --- |
| Directive 2013/53/EU (recreational craft), full text | https://eur-lex.europa.eu/eli/dir/2013/53/oj |
| Directive 2013/53/EU, EUR-Lex summary | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32013L0053 |
| Directive 2014/30/EU (EMC), EUR-Lex summary | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32014L0030 |
| Directive 2014/53/EU (RED), European Commission page | https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red_en |
| Directive 2014/35/EU (LVD), European Commission page | https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/low-voltage-directive-lvd_en |
| Regulation (EU) 2023/988 (GPSR), full text | https://eur-lex.europa.eu/eli/reg/2023/988/oj |
| Regulation (EU) 2023/988 (GPSR), EUR-Lex summary | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32023R0988 |
| Regulation (EU) 2024/2847 (CRA), European Commission page | https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act |
| ISO 25197:2020, catalogue abstract | https://www.iso.org/standard/71354.html |
| ISO 11674:2019, catalogue abstract | https://www.iso.org/standard/68748.html |
| ISO 16329:2003, catalogue abstract | https://www.iso.org/standard/30256.html |
| ISO 8846:2025, catalogue abstract | https://www.iso.org/standard/87197.html |

### 20.4 Declarations for the record

- MC-06 performed **no steering test**, no bench test, no hardware-in-the-loop run and no sea trial.
- No hardware was activated, no motor or actuator was commanded, no firmware was flashed.
- No certificate, declaration, approval, measurement, trial result, installer agreement or standard
  applicability is claimed.
- `PILOT_SAFETY_GATE = BLOCKED`; `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`;
  `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`; `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`;
  `PILOT_SEA_TRIALS = NOT_PERFORMED`.
- This document is an internal design-stage safety dossier and must not be published, quoted as a safety
  certificate, or used to support any sale, installation or operating claim.

---

## 21. Change control and next actions

| # | Next action | Owner | Depends on | Output |
| --- | --- | --- | --- | --- |
| N-01 | Freeze the drive-family and steering-type eligibility envelope and publish the compatibility matrix | Product + engineering + safety | §2, H-03, H-07 | Approved envelope |
| N-02 | Select and document the E-stop, contactor and isolation architecture with DC ratings | Hardware engineering | §10 | Rated design + schematic |
| N-03 | Resolve the motor link (UART vs USB CDC) and freeze the interface | Engineering | H-03 | Controlled interface document |
| N-04 | Implement a hardware watchdog and independent output path | Engineering | §11 | Verified watchdog architecture |
| N-05 | Implement rudder/steering feedback and end-stop protection, or formally assess the open-loop case | Engineering + safety | H-01 | Feedback design + evidence |
| N-06 | Implement authentication/authorisation and local binding for the control plane | Engineering + security | §12, H-02 | Tested control plane |
| N-07 | Write the hazard log, FMEA/FMECA, fault trees and common-cause analysis | Safety + engineering | §4 | Analysed hazard set |
| N-08 | Run bench and HIL verification with instrumentation | Engineering | §16 | Bench evidence |
| N-09 | Perform a real commissioning and supervised sea trials | Installer + qualified engineer | §13, §14 | Commissioning and trial records |
| N-10 | Start the conformity programme (applicability, standards, laboratory, technical file, CRA) | Compliance + counsel | §15 | Conformity plan |
| N-11 | Engage the human safety-case signatory and independent reviewer | Company owner | §19 | Named, independent signatories |

Until N-07 to N-11 are complete and the gate conditions in §17 are satisfied, `PILOT_SAFETY_GATE = BLOCKED`
and no PILOT configuration may be installed, used at sea or offered for sale.
