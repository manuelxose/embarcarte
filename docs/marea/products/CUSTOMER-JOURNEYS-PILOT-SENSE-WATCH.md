# MAREA PILOT · MAREA SENSE · MAREA WATCH — End-to-end customer journeys (MC-06 / D7)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D7-CUSTOMER-JOURNEYS |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Date | 2026-10-30 |
| Owner function | Commercial, UX and Localization Specialist (journey owner), with the PILOT safety owner and the WATCH service owner |
| Status | INTERNAL ONLY · NOT PUBLISHED · NOT FOR SALE · products `DEFINED`; brand clearance `NOT_GRANTED` |
| Governing contract | `docs/marea/products/README.md` §16, §19, §20 (WATCH notification states), §22 (17 stages, journey fields) |
| Binding inputs | D4 `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` (editions); D5 `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (compatibility); D6 (pricing framework); D1/D2/D3 product dossiers; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6, §9; `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` |
| Batch-01 counterpart | `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md` — same 17-stage order, same ownership model, never contradicted |
| Nature | Planning artefact for a future implementation. No step below is live, and no journey may be used to imply availability |

**These are definitions, not availability.** Every stage is `SPECIFIED_ONLY`, `OPEN` or `BLOCKED`; none is
implemented. The safety gate for PILOT is `BLOCKED`; the WATCH service is `NOT_FOUND`; SENSE measurement is
`NOT_MEASURED`; brand publication is `NOT_GRANTED` (X-01); the seller's legal identity is missing (X-02).

## 1. Reading conventions

### 1.1 Stage status vocabulary

| Label | Meaning |
| --- | --- |
| `SPECIFIED_ONLY` | Defined here; no page, service, entitlement or process exists to execute it |
| `OPEN` | Depends on an unresolved internal decision or measurement |
| `BLOCKED` | An external condition (certificate, contract, right, hardware, clearance) prevents the step |
| `NOT_APPLICABLE` | The stage does not apply to that product, for the stated reason |

### 1.2 CTA and language rules (binding for every touchpoint)

- All three families are `DEFINED`. The only permitted CTAs are the claims-policy §5 equivalents of **"See the
  specification"** / «Ver la especificación», **"Request a compatibility review"** / «Solicitar estudio de
  compatibilidad», and — where a lawful interest list exists — "Register interest". **No purchase, cart,
  reservation, pre-order, stock, price or delivery CTA may appear at any stage.**
- The PILOT supervised-steering disclaimer is mandatory on every PILOT surface; the navigation disclaimer on
  every surface showing position, depth or traffic (PILOT, SENSE, WATCH); the AIS receive-only disclaimer wherever
  AIS targets appear; the SENSE measurement-limitation wording in the SENSE copy; the WATCH conditional-awareness
  wording in the WATCH copy (README §16 rule 8, §9; claims policy §9). Copy wording is owned by D8 and is not
  duplicated here.
- Spanish copy uses **tú**; English uses neutral professional "you". Product, edition and family names never
  translate.
- No certification, approval, availability, stock, lead time, installer duration, support SLA, warranty length,
  testimonial or customer count may appear in any touchpoint.

### 1.3 Price rule for every stage

No approved price exists. The only figures that may appear anywhere in this journey model are the four permitted
hypotheses — `PILOT-COASTAL` from EUR 1,290, a SENSE entry module from EUR 99, `WATCH-CORE` hardware EUR 299,
`WATCH-CORE` subscription from EUR 9.90/month — and **only as internal planning figures labelled
`HYPOTHESIS_UNAPPROVED`**. **No customer touchpoint may display any of them.** The customer-facing state is a
specification view, a compatibility review request or a quotation request (D6 §8).

### 1.4 The control rule that no journey may break

- **No workflow in this document lets WATCH, NAV, HUB, SENSE, a website, a phone app or a cloud service steer the
  vessel, engage the pilot, adjust the heading, move the actuator or command the helm.** The only steering
  authority in the entire MAREA programme is the PILOT control head, locally, supervised, inside an
  independently validated boundary (README §16 rule 1, §19).
- **WATCH is read-only toward PILOT.** Authorised status may be *displayed* ashore; nothing may be *sent back*.
- A support agent, installer or administrator cannot steer a vessel through any tool described here.

## 2. The 17-stage blueprint — MAREA PILOT

Product `PILOT`; editions `PILOT-COASTAL` (`DEFINED`), `PILOT-SAIL` (`CONDITIONAL`), `PILOT-PRO`
(`INSTALLATION_PACKAGE`). It is a surveyed, installed, supervised steering system. **Every stage assumes a named
installer and a safety gate that is closed; today it is `BLOCKED`.**

| Stage | User action | Touchpoint | Expected result | Required information | Failure mode | Recovery | Commercial opportunity | Trust / safety requirement | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Discovery | Searches for a better way to hold a course short-handed; arrives from an installer, a yard or an EMBARCARTE services page | Proposed `/marea/pilot` (ES/EN); installer referral; search landing | Learns a supervised steering system is *defined* and not for sale, and that it is installed by a survey | Category; that it is supervised, local and installer-led; readiness state | Assumes it is an off-the-shelf autopilot or a phone app; assumes remote control | The page states `DEFINED`/not for sale and links to the survey route; no price, stock or order CTA | Routes the enquiry to the installer channel from the first minute | Supervised-steering disclaimer above the fold; no autonomy, remote-helm or performance wording | Page shows lifecycle `DEFINED`, disclaimer verbatim, zero price/stock CTA, no unverified compatibility |
| 2. Product understanding | Reads what the system does in each mode, what the E-stop and manual takeover mean, and what it is not | Capability and boundary blocks; safety explainer; help article | Can state in one sentence: "it holds a course/wind angle under supervision; I can take over at any moment; it never drives itself" | Mode list and their evidence conditions; physical safety path; exclusions; survey requirement | Believes every mode is available on every boat; believes the system prevents collisions | Mode table shows each mode's condition and status; exclusions listed before the benefits | The boundaries are the product's value, not fine print | Every capability row carries a status and limitation; no unlabelled capability anywhere |
| 3. Compatibility | Answers the vessel questionnaire and books a survey | Compatibility page / enquiry; installer questionnaire (D5 §5) | Exactly one outcome: `INSTALLER_ASSESSMENT_REQUIRED`, `NOT_SUPPORTED` or `INSUFFICIENT_INFORMATION`; then a survey | Steering type and condition, manual release, electrical system, feedback availability, inventory, territory | Assumes "autopilot fits any boat"; hides a steering fault to get a quote | Survey refusal or escalation rule; no suitability statement before the survey | Survey converts an enquiry into a documented quotation opportunity | Unknown is stated as unknown; a steering expectation mismatch is refused, not "worked around" | Outcome matches D5 §5.3; `ELIGIBLE_SELF_INSTALL` unreachable; survey record produced |
| 4. Editions | Chooses between Coastal, Sail and Pro, or is told Pro applies | Edition block (D4 §2); installer conversation | Understands Coast/Sail/Pro as surveyed scope — not performance tiers — and that Pro is a quoted package | Surveyed scope; mode evidence; what each edition does not include | Assumes Sail or Pro is "safer" or "more accurate" | Copy states the safety path is identical in every edition | Correct scope selection avoids under- or over-specifying a vessel | No edition buys more safety; no performance comparison | Edition copy matches D4 row by row; no "more powerful/safer/accurate" wording |
| 5. Price comprehension | Learns that PILOT is quoted per vessel after survey | Quotation request; installer proposal | Understands the commercial model without seeing an unapproved figure | Quotation scope, included/excluded schedule, warranty position `OPEN`, installation separately itemised | Assumes a "from" price is a turnkey offer | Explains that no price list exists and the quotation is the offer document | Sets the expectation that protects the installer and the customer | The EUR 1,290 hypothesis never appears customer-facing (D-009) | No figure on any surface; quotation template names every inclusion and exclusion |
| 6. Purchase or quote | Requests a survey and receives a written, vessel-specific quotation | Enquiry workflow (future MC-14A/MC-24); installer proposal | A documented next step and, later, a quotation — never an order confirmation | Vessel data, survey record, scope, exclusions, schedule, terms | Assumes the quote is a fixed turnkey price; assumes payment is possible now | Quotation is explicitly vessel-specific; pre-contract state until terms exist | Installer-led revenue with a defensible margin per scope | No payment, no card data, no implied availability at `DEFINED`; refusal policy for unsafe vessels | Quotation record exists with scope and exclusions; no order can be created |
| 7. Fulfilment | Receives the configured components per quotation after an authorised release (not possible today) | Installer ordering, delivery to yard, serial registration | Components match the quoted scope; serials recorded; no substitution without consent | Frozen scope, serials, delivery, warranty start `OPEN` | Partial delivery; substitution of a drive; missing E-stop parts | Substitution only with written customer consent; serials reconciled before installation | Installer ordering discipline reduces rework | E-stop and isolation parts are never optional or substituted | Fulfilment checklist reconciles serials against the quotation; safety parts always present |
| 8. Installation | Attends the yard; installs the drive, feedback, control head, cabling, power protection, E-stop and isolation | Installer commissioning route; installation record | A documented installation with every safety part verified physically | Installation drawings, drive spec, torque/alignment data, electrical protection, E-stop position, isolation arrangement | Unsafe installation; missing isolation; E-stop reachable only by the installer | Installation is refused and corrected before commissioning continues | Proves the installer's competence is the channel's real product | Physical safety path verified before any powered steering test; no "temporary" bypass | Installation record signed per item; isolation and E-stop physically tested and recorded |
| 9. Activation | Powers up, commissions dockside, performs dockside validation | Installer commissioning; control head | Control head initialised, compass calibrated, dockside validation passed, boundary tests recorded | Firmware/software version, calibration values, test checklist, alarm behaviour | Calibration error; steering reacting in the wrong direction; alarms suppressed | Recalibrate / roll back to a documented baseline; no sea trial until dockside validation passes | Commissioning record is the evidence base for later service | Commissioning only by a named installer; no remote commissioning; no operation before validation | Dockside validation record with versions, results and installer identity |
| 10. First use | Receives training; performs a supervised sea trial; engages heading hold for the first time with an instructor aboard | Supervised sea trial; training session; handover record | Can engage, monitor, disengage and take over; understands the E-stop drill and the mode's limits | Manual-takeover drill, E-stop use, alarm meaning, degraded states, log-keeping | Over-confidence after a successful trial; disengaging unexpectedly; unclear takeover | Supervised re-trial; explicit drill practice until demonstrated | Training turns a delivered system into a used system | Supervised steering disclaimer acknowledged before the trial; the owner demonstrates takeover | Training and sea-trial record signed; takeover drill demonstrated and recorded |
| 11. Regular use | Steers by hand, engages a verified mode on passage, supervises continuously, takes over when needed | Control head; helm; system status | Fewer helm corrections, one-person watchkeeping capacity, and a person always able to take over | Mode limits, wind-angle condition (Sail), sea state, route context, alarm meaning | Silent degradation; holding a course into danger; over-reliance; leaving the helm | Alarm hierarchy + manual takeover + E-stop; documented drill; training refresh | Retention through trust; service relationship | Always supervised; the system never holds the watch; no collision-avoidance implication | Logged use scenarios with takeover events recorded; no "unattended" usage observed |
| 12. Updates | Applies a firmware update through the authorised local route | Installer update route; support article; control head | Updated version with rollback; configuration preserved; re-validation after major updates | Update method, version policy, rollback behaviour, re-calibration need, supported window | Bricked unit; calibration drift after update; safety behaviour changed silently | Verified rollback, dockside re-validation, installer service visit | Updates are a support obligation, not a paid tier | Updates never touch the safety path without re-validation; no remote update on the control path | Version record + rollback test + post-update validation record |
| 13. Support | Reports a fault, an alarm or a mode that does not engage; requests service | Installer first-line support; support ticket; documented diagnostic export | A recorded case with diagnosis and a next step; **no remote steering** | Fault symptoms, alarms, versions, diagnostic export, warranty status | Expects remote diagnosis to "drive" the system; expects an SLA that does not exist | Escalation path installer → product support with a named owner | Service attach rate is the family's recurring revenue | Support tooling is read-only; no remote command path; no safety advice ("where to steer") | Case recorded end to end; no command channel used; no unpublished SLA |
| 14. Upgrade | Adds a second station, adds Sail mode evidence, or moves to a Pro scope after re-survey | Installer; support; edition comparison | Predictable expansion with a re-survey and a new quotation | Whether the change is hardware, evidence or scope; re-validation needs | Assumes a software unlock; assumes the upgrade price is the difference between two hypotheses | Every upgrade is quoted and validated separately | Expansion revenue per vessel | No upgrade may bypass re-validation of the safety path | Upgrade quoted and recorded; re-validation evidence attached |
| 15. Renewal or cancellation | `NOT_APPLICABLE` — PILOT carries no subscription | — | Nothing to renew; support window and out-of-warranty handling are stated instead | Support window, spare-part availability `OPEN`, service terms | Assumes a subscription is required to keep steering | Documentation states the support window and that no licence expiry affects steering | Service plans are a separate future decision | No entitlement may ever gate local steering or safety functions | Documentation states no subscription dependency; support window published |
| 16. Ownership transfer | Sells the vessel; the new owner needs the records and a new survey | Documented transfer procedure; installer | Ownership recorded, prior owner's access removed, records stay with the vessel, warranty position stated | Transfer procedure, records, whether the new owner needs a fresh survey/familiarisation | Assumes warranty resets; assumes records transfer automatically | Documented transfer with a handover pack and a safety familiarisation | Second-hand boats are a real market and a trust test | New owner receives the manual-takeover and E-stop briefing; records travel with the boat | Transfer record; handover pack; familiarisation acknowledgement |
| 17. End-of-life | Replaces or retires the system; disposes of electronics | Installer/yard; disposal guidance | Safe decommissioning, records archived, electronics disposed under WEEE | Decommissioning steps, disposal route, record retention | Abandoned system left energised; drive left engaged | Documented decommissioning procedure by a competent person | Up-sell to a new installation, done honestly | The steering system must be returned to a safe manual condition | Decommissioning record; disposal receipt; manual steering confirmed |

**Critical dependencies for the PILOT journey.** (1) `PILOT_SAFETY_GATE = BLOCKED` — stages 8–11 cannot be
evidenced (H-01, P-04). (2) No hardware, BOM or drive selection exists (`H-03`, `H-05`, `H-07`), so stage 7 is
blocked. (3) No installer network, agreements or rate card (`X-05`, `X-06`), so stages 6, 8 and 13 are blocked.
(4) E-stop, motor isolation and rudder feedback evidence do not exist (`H-10`, `H-01`), so stages 8–10 cannot be
accepted. (5) Terms, warranty and seller identity are missing (`X-02`), blocking stages 5, 15 and 16.

## 3. PILOT safety journeys

These are the journeys in which the product's safety claim is made or broken. Each records what the customer
experiences, what the product must display, the required behaviour, the recovery path, and the evidence that would
prove it. **All seven are `OPEN` or `BLOCKED`; none is tested.**

### 3.1 PJ-1 — Steering or heading sensor loss

- **Trigger.** Compass/heading sensor drops out, becomes implausible, or reports inconsistent data.
- **What the customer experiences.** The control head announces a heading-quality fault; the engaged mode exits
  or refuses to engage; steering remains under manual control.
- **What the product must display.** The fault class, the sensor that failed, the time of the last valid heading,
  and the fact that the mode is unavailable — never a silently held course.
- **Required behaviour.** Supervised degradation only: no automatic switch to a less trustworthy source without an
  explicit indication; manual takeover always immediately available; the E-stop remains electrical, not firmware.
- **Recovery.** Return to manual steering, clear the fault, recalibrate only in safe water, re-engage only after a
  successful self-test.
- **Evidence to close.** Recorded sensor-loss injection on the bench and in a supervised trial; display-state
  screenshots; takeover time measured.
- **Status.** `BLOCKED` (H-01, `PILOT_SAFETY_GATE`).

### 3.2 PJ-2 — Motor or controller fault

- **Trigger.** Motor driver overcurrent/thermal fault, controller heartbeat loss, or an actuator fault.
- **What the customer experiences.** An alarm, mode disengagement, and an independent motor-power interruption.
- **What the product must display.** Fault classification (overcurrent, thermal, driver, communication), whether
  motor power is isolated, and what remains available.
- **Required behaviour.** Fail-closed: motor power removed independently of the control firmware where required by
  the safety case; no automatic re-arm; a manual re-arm path that is deliberate and documented.
- **Recovery.** Manual steering, installer diagnosis, documented re-arm procedure, functional test before re-use.
- **Evidence.** Bench fault-injection record, isolation verification, thermal and overcurrent tests, independent
  review. **Status.** `BLOCKED` (`PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`, H-03, H-10).

### 3.3 PJ-3 — Power interruption

- **Trigger.** Vessel DC loss, breaker trip, blown fuse, or voltage collapse.
- **What the customer experiences.** The system stops steering; the steering returns to manual; alarms may be
  unavailable if power is wholly lost.
- **What the product must display.** Before loss: low-voltage warning if supported. After restoration: a
  post-outage state indicating that the mode is not engaged and that re-validation may be needed.
- **Required behaviour.** Loss of power must leave the steering in a safe manual condition; no last-commanded
  actuator position may persist; recovery must not auto-engage.
- **Recovery.** Restore power, check fusing and isolation, run the documented post-outage checklist, re-engage
  only after validation.
- **Evidence.** Recorded brown-out and full-loss tests, actuator-state verification, checklist usability test.
  **Status.** `BLOCKED` (`PILOT_SAFETY_GATE`, `H-10`).

### 3.4 PJ-4 — Manual takeover (the drill that must always work)

- **Trigger.** The skipper decides to take over: hazard, traffic, shallow water, crew instruction, or any doubt.
- **What the customer experiences.** Immediate manual authority; the mode disengages; the wheel/helm responds to
  the person.
- **What the product must display.** That the mode is disengaged and who/what disengaged it; no ambiguous state.
- **Required behaviour.** Takeover must be possible at any time, by a single deliberate action, with the physical
  E-stop available independently; the system must never re-engage itself after a takeover.
- **Recovery.** None needed: takeover *is* the recovery. The skipper continues manually and decides whether to
  re-engage.
- **Evidence.** Repeated takeover drills during the supervised trial, including takeover from a fault state and from
  a saturated actuator; measured takeover latency; owner demonstrations in training. **Status.** `BLOCKED`.

### 3.5 PJ-5 — Maintenance

- **Trigger.** Seasonal service, drive inspection, compass recalibration, firmware update, or a post-fault check.
- **What the customer experiences.** A documented maintenance plan, an installer visit, and a locked-out system
  during work.
- **What the product must display.** Service due state where implemented (never presented as a safety guarantee);
  version and calibration state at handover.
- **Required behaviour.** Maintenance work is performed with the drive isolated; no maintenance step requires an
  undocumented procedure; records stay with the vessel.
- **Recovery.** Post-maintenance functional test and dockside validation before the next passage.
- **Evidence.** Maintenance plan validated by an independent marine engineer; post-service test record.
  **Status.** `OPEN` (no maintenance plan exists).

### 3.6 PJ-6 — Warranty event

- **Trigger.** A failure within the warranty period (terms do not exist yet).
- **What the customer experiences.** A support case with a named owner, a diagnosis, and a remedy path.
- **What the product must display.** Fault evidence that a support engineer can read without steering the vessel
  (read-only diagnostic export).
- **Required behaviour.** No remote control is used to diagnose or "fix" steering; the vessel is made safe first;
  the warranty position is stated honestly and does not reset on transfer.
- **Recovery.** Installer intervention, replacement part, re-validation, documented closure.
- **Evidence.** RMA process definition, warranty text, a recorded mock case end to end. **Status.** `BLOCKED`
  (`X-02` seller identity and terms; no RMA process).

### 3.7 PJ-7 — Ownership transfer

- **Trigger.** The vessel is sold with the system installed.
- **What the customer experiences.** A documented transfer: records move with the boat, the previous owner's access
  ends, the new owner receives a safety familiarisation.
- **What the product must display.** Nothing customer-facing beyond the handover pack; device records are
  installer/document artefacts.
- **Required behaviour.** The new owner must be briefed on manual takeover and E-stop before using the system; the
  warranty does not silently reset; no personal data of the previous owner is retained unnecessarily.
- **Recovery.** Re-survey/familiarisation if the new owner's use case or waters differ.
- **Evidence.** Documented transfer procedure tested with a mock transfer; handover pack contents reviewed.
  **Status.** `OPEN` (procedure not written).

## 4. The 17-stage blueprint — MAREA SENSE

Product `SENSE`; five module SKUs (`SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`) and
three kits (`SENSE-ESSENTIALS` `DEFINED`; `SENSE-SAIL`, `SENSE-SYSTEMS` `CONDITIONAL`). A module measures locally,
has **no connectivity of its own**, and never delivers remote alerts.

| Stage | User action | Touchpoint | Expected result | Required information | Failure mode | Recovery | Commercial opportunity | Trust / safety requirement | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Discovery | Wants to know what is happening in the boat without replacing the helm | Proposed `/marea/sense`; bundle page (PROTECT context, MC-08); installer referral | Learns a sensor family is *defined*, not for sale, and that modules measure locally | Category; that modules are separate SKUs; that remote alerts need WATCH | Assumes it sends alerts to a phone; assumes it works with any display | Page states `DEFINED`/not for sale and explains the local-only nature | Highest-volume entry point of the three families | The measurement-limitation wording is present, not buried | Page states lifecycle, zero price/stock CTA, no accuracy or IP claim |
| 2. Product understanding | Reads which quantity each module measures, what calibration means, and what a "reading" is | Capability blocks per module; calibration explainer | Can state: "it measures X locally, I must calibrate it, an invalid reading is shown as invalid" | Quantity, units, intended range, calibration requirement, display state vocabulary | Believes an uncalibrated value is a measurement; believes a reading is an alarm | Calibration section and state examples shown before the benefit | Sets honest expectations that reduce returns | Readings only valid within verified range and calibration; no accuracy figure | Every capability row shows source/unit/freshness/calibration status; no invented figure |
| 3. Compatibility | Checks the boat: mounting, cable route, display/consumer, existing instruments | Compatibility page; installer assessment (D5 §5) | Exactly one D5 outcome; for an installed configuration, `INSTALLER_ASSESSMENT_REQUIRED` | Existing network, display consumer, tank/sender type, mounting points | Assumes "any sensor works anywhere"; assumes NMEA 2000 | Assessment and refusal rules; no "probably works" | Correct scoping prevents the worst support burden in the family | NMEA 2000 explicitly not offered; per-device compatibility only | Outcome recorded; NMEA 2000 statement present |
| 4. Editions | Chooses a module or a kit | Module/kit comparison (D4 §3) | Understands that a kit is preconfigured modules, not a new capability, and that Sail/Systems are conditional | Kit composition; which modules; conditional verdicts visible | Assumes a kit is a system that "does everything" | Kit pages list included modules and visible conditional status | Kit attachment rate is the family's main commercial lever | Conditional kits must not be shown as shipping products | Kit contents equal their modules exactly; conditional label present |
| 5. Price comprehension | Learns module pricing is not established and that installation is separate | Pricing-state block; quotation request | Understands the commercial model without an approved figure | That only an entry-module hypothesis exists internally; installation and materials separate | Assumes a "from" price applies to the module they want | Explains that module prices are not established | Avoids anchoring on a number that does not exist | No figure customer-facing; VAT basis stated once approved | No price surface; quotation path present |
| 6. Purchase or quote | Requests an assessment or a quotation for modules plus installation | Enquiry / installer quote | A documented next step and a materials/labour split | Vessel data, module selection, installation scope | Assumes checkout is possible; assumes installation is included | Quotation request only; no order state | Installer-led sale with a defensible scope | No payment or availability promise at `DEFINED` | Enquiry/quote record; no order entity |
| 7. Fulfilment | Receives modules and documented accessories after an authorised release | Fulfilment / installer delivery | Modules match the order; serials recorded; calibration accessories present | Final SKU contents, serials, packaging | Missing calibration item; wrong sender variant | Verified kitting and return/replace path | Low return rate protects thin module margin | Included/excluded list repeated at delivery | Serial/contents reconciliation record |
| 8. Installation | Installs the module (or books an installer) | Installation guide; installer visit | A mounted, wired, calibrated module with a documented reading path | Mounting rules, cable route, gland, power, calibration steps | Water ingress, bad cable route, calibration skipped | Installation checklist plus a post-install verification step | Professional installation is the quality gate | No self-install claim without a validated rule; no IP rating claim | Installation and calibration record; verification reading captured |
| 9. Activation | Pairs/configures the module with the display/consumer and confirms a valid reading | Local configuration; consumer setup | The reading appears with source, units, timestamp and calibration state | Display/consumer capability, sensor identity, calibration date | No reading; implausible reading; duplicated source | Diagnostics: source presence, wiring, calibration, range; escalate to installer | A successful activation is the first "it works" moment | An invalid reading must be shown as invalid, never defaulted to zero | Activation test with a known reference; state displayed correctly |
| 10. First use | Calibrates properly, reads trends, learns what invalidity looks like | Calibration workflow; onboarding | The owner can recognise a valid vs invalid reading and knows the calibration interval | Calibration procedure, interval, what to do when out of range, local indication meaning | Over-trusting an uncalibrated reading; ignoring a stale value | Re-calibration, stale-value explanation, support article | Establishes the calibration habit that prevents false confidence | Calibration is mandatory before a reading is presented as valid | Comprehension test: owner states the calibration boundary unprompted |
| 11. Regular use | Reads values, acts on local indication, plans maintenance | Local display/consumer; optional HUB | Measurements with source, units, freshness and quality; invalid values clearly invalid | Freshness window, local alarm meaning, expected ranges | Treating a stale value as current; assuming a local alarm is remote | Reconnect the source, refresh, check calibration; documented state behaviour | Optional HUB expands the picture and the spend | A reading without provenance is not shown as data | State-vocabulary test; stale-value display verified |
| 12. Updates | Applies a module firmware update through the documented route | Update guide; installer | Updated version, calibration preserved or documented re-calibration | Update route, version policy, calibration impact | Calibration lost; module bricked | Rollback and re-calibration procedure | Updates are a support obligation | No update silently changes measurement behaviour | Version + post-update verification record |
| 13. Support | Reports a missing/implausible reading or requests calibration help | Support; installer first line | Diagnosis and a next step, with a clear measure of "valid reading" | Symptoms, module identity, calibration date, installation history | Assumes a broken module when the fault is installation or calibration | Structured triage: installation → calibration → module → RMA | Support quality decides module reputation | Support never asserts accuracy it cannot evidence | Case recorded; triage script distinct from accuracy claims |
| 14. Upgrade | Adds a module or moves from modules to a kit | Module/kit comparison; installer | Predictable expansion with an assessment | Which capability is missing; whether a kit is cheaper once costed | Assumes modules automatically combine into a kit | Quote separately; kit composition checked | Expansion revenue per boat | Added modules inherit the same measurement discipline | Upgrade quoted and recorded |
| 15. Renewal or cancellation | `NOT_APPLICABLE` — modules carry no subscription; asks about the WATCH subscription if used for alerts | Support; WATCH account | Clear separation: SENSE is a one-off purchase, WATCH is the subscription | Support window, warranty, what WATCH adds | Assumes SENSE requires a subscription to work | Documentation states no subscription for SENSE; WATCH terms separate | Clean cross-sell boundary | Local sensing and indication never depend on a subscription | Documentation + a network/service-loss test proving local functions continue |
| 16. Ownership transfer | Sells the boat with the modules installed | Documented procedure; installer | New owner inherits the hardware, calibration record and manuals; no personal data retained | Calibration history, installation record, warranty position | New owner cannot interpret an existing installation | Handover pack with calibration record and module identity | Second-hand market credibility | Warranty position stated; privacy of previous owner respected | Transfer record with calibration history |
| 17. End-of-life | Removes or replaces a module; disposes of electronics | Installer; disposal guidance | Safe removal, connector sealing, disposal under WEEE, record closed | Removal steps, disposal route, whether the reading source is removed cleanly | Abandoned sensor left in a tank or bilge; leak path created | Documented removal procedure by a competent person | Replacement sale, honestly made | Removal must not create a water or fuel path | Removal record; integrity check |

**Critical dependencies for the SENSE journey.** (1) No sensor hardware, calibration or accuracy evidence
(`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`, P-05), so stages 7–11
cannot be accepted. (2) NMEA 2000 is not implemented (`SENSE_NMEA2000 = NOT_IMPLEMENTED`, H-04), so most
compatibility answers resolve to assessment or refusal. (3) No installer network or rate card (`X-05`, `X-06`)
blocks stages 6, 8 and 13. (4) No channel terms (`X-05`) blocks stage 7 economics. (5) Remote alerting is absent by
design; the WATCH journey in §5 is the only alert path.

## 5. The 17-stage blueprint — MAREA WATCH

Product `WATCH`; `WATCH-CORE` (`DEFINED`) and `WATCH-PLUS` (`CONDITIONAL`). Hardware plus a recurring monitoring
subscription; **conditional awareness, not a guarantee**; no helm or steering function.

| Stage | User action | Touchpoint | Expected result | Required information | Failure mode | Recovery | Commercial opportunity | Trust / safety requirement | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Discovery | Leaves the boat unattended and wants to know it is all right | Proposed `/marea/watch`; PROTECT bundle context; installer/marina referral | Learns a monitoring service is *defined*, not for sale, and that it depends on power, coverage and a subscription | Category; subscription nature; limits; that it is not a distress service | Assumes guaranteed or immediate alerting; assumes theft prevention | Page states `DEFINED`/not for sale and carries the conditional-awareness wording | The strongest emotional driver in the programme — and the easiest to over-promise | The conditional-awareness and "not a certified distress service" wording is visible, not footer-only | Page states lifecycle, zero price/stock CTA, disclaimer verbatim, no "24/7" or "guaranteed" |
| 2. Product understanding | Reads what is monitored, how alerts arrive, and what "delivered" means | Capability blocks; alert-state explainer; help article | Can state: "it tells me something happened, if power and coverage allow, and may not be immediate" | Monitored inputs; alert state model; connectivity dependence; history window `OPEN` | Believes silence means all is well; believes an alert was "seen" | Alert-state explainer shows `PROVIDER_ACCEPTED` ≠ delivered ≠ acknowledged | Honesty here protects the brand from the category's worst failure | Never present provider acceptance as human receipt (README §20) | Comprehension test on the state model; no guaranteed-delivery wording |
| 3. Compatibility | Checks boat power, mounting, coverage at the berth and monitored inputs | Compatibility/coverage page; installer or support assessment | Exactly one D5 outcome; coverage and power constraints stated; no promise | Power arrangement, mounting, mobile coverage at the berth, input list, existing sensors | Assumes coverage is "fine" because a phone works on the quay | Coverage assessment recorded; `INSTALLER_ASSESSMENT_REQUIRED` default | Correct scoping prevents the "never worked" refund | No connectivity guarantee; the coverage limit is stated before purchase | Coverage record; outcome in D5 vocabulary |
| 4. Editions | Chooses Core, and considers Plus | Edition comparison (D4 §4) | Understands Plus as additional validated inputs/rules/history, and that Plus is conditional | Edition difference; conditional status; what Plus does not improve (speed, reliability, coverage) | Assumes Plus is faster or more reliable | Conditional label visible; no reliability claim in either edition | Plus is the only upsell; it must be real | No claim that spending more improves alert delivery | Edition copy matches D4; conditional label present |
| 5. Price comprehension | Learns hardware and subscription are separate, and that connectivity is not included | Pricing-state block; quotation/interest route | Understands the two-part model without an approved figure | Hardware vs subscription; connectivity terms `OPEN`; what cancels what | Assumes the hardware price includes data/SIM or a year of service | Explains separation explicitly; no bundled-data claim | Avoids the most common billing complaint in the category | No figure customer-facing; connectivity cost never implied included | No price surface; separation statement present |
| 6. Purchase or quote | Requests or (after readiness) purchases hardware and a subscription | Enquiry / future checkout; authorised interest list | A documented next step; after readiness, a hardware order plus a subscription with explicit terms | Hardware contents; subscription contents and price when approved; consent; cancellation rules | Assumes the device alone provides monitoring | Subscription cannot be activated silently; no charge without explicit consent | Hardware + recurring revenue in one transaction | No payment at `DEFINED`; cancellation consequences shown before payment | Order/entitlement test only after readiness; consent record |
| 7. Fulfilment | Receives the device and SIM/eSIM arrangements | Fulfilment; installer delivery | Device serialised and registered to the owner; connectivity provisioned per terms | Serial, provisioning, connectivity terms, returns process | Activation failure; unprovisioned SIM; roaming surprise | Replacement/provisioning path; no blame-shifting to the network | First impression determines churn | Connectivity is the product; failure here is fatal to trust | Fulfilment test: serial, provisioning and subscription active on the same record |
| 8. Installation | Installs or books installation of the device and inputs | Installation guide; installer | A powered, mounted device with inputs verified and an initial heartbeat received | Power/fusing, mounting, antenna, input wiring, coverage | No heartbeat; intermittent power; antenna placement | Diagnostics for power/coverage/identity; installer visit | Installation quality determines the entire service experience | Owner-install must still produce a verified heartbeat before alerts are trusted | Installation record + first successful ingestion record |
| 9. Activation | Registers the device, proves ownership, invites users, sets basic rules | App/account; device registration | Device bound to the account with ownership proof; test alert received and acknowledged | Identity, consent/privacy notice, user roles, rule set | Ownership proof fails; invitation to the wrong person; test alert not delivered | Re-provisioning; identity re-verification; test-alert retry | Activation completion is the product's real conversion point | Privacy notice before position processing; test alert must traverse the real pipeline | Activation test: identity bound, test alert lifecycle recorded end to end |
| 10. First use | Learns what the app shows, sets geofence and bilge rules, learns what "no update" means | App onboarding; support article | Can interpret fresh/stale/missing data and distinguish "no event" from "no connection" | State vocabulary, freshness display, alert lifecycle, connectivity indicator | Believes a stale app view is live | Freshness display and last-known-good timestamp; support explainer | Reduces panic calls and false confidence | The app must never show a stale value as current (README §20) | Usability test: user distinguishes stale from live without help |
| 11. Regular use | Checks the boat, receives alerts, acknowledges them, reviews history | App; notification channels; history | Alerts with event time, state and acknowledgement; history with retention stated | Event/state times, retention window, input meaning | Alert fatigue; missed alert; false alarm | Rule tuning, acknowledgement, escalation practice, support | Renewal depends on perceived usefulness, not on more alerts | Alerts are advisory: the customer keeps responsibility for the vessel | Alert-delivery metrics recorded; state transitions audited |
| 12. Updates | Applies device firmware and app updates | Update route; app store | Updated, still-provisioned device; subscription unaffected | Update policy, support window, rollback | Device offline after update; identity lost | Rollback/re-provisioning procedure | Updates are an obligation to keep the service trustworthy | No update may silently change monitored inputs or alert rules | Update + rollback record; identity preserved |
| 13. Support | Reports a missing alert, connectivity issue, or billing question | Support; installer; billing | A case with a clear diagnosis and owner | Diagnostic data (device health, pipeline timestamps), subscription state | Blames the customer's phone; cannot prove delivery | Delivery-status evidence: queued / provider-accepted / delivery unknown | Support evidence is what makes alerting credible | Never claim a human saw an alert; state what is known | Case record with delivery-state evidence attached |
| 14. Upgrade | Moves Core → Plus, or adds sensors | App/edition comparison; support | Predictable change with an explicit new entitlement and price once approved | What Plus adds; proration rules `OPEN`; input compatibility | Assumes Plus unlocks unvalidated inputs | Entitlement change only after validation and costing | Expansion revenue | Additional inputs are validated before being offered | Upgrade test after readiness; no unvalidated input offered |
| 15. Renewal or cancellation | Renews, cancels or lets the subscription lapse | Renewal notice; account; support | Clear notice; cancellation at term end; data export; local functions unaffected | Renewal date, approved price, what stops, what remains exportable, retention | Dark patterns; silent auto-renewal; unexplained loss of history | Consent-based renewal, export offer, grace period, explicit statements | Retention is the business; trust decides it | On lapse: remote monitoring stops, **local functions never degrade**; no false urgency | Renewal/cancellation test; entitlement-isolation test |
| 16. Ownership transfer | Sells the boat; the buyer wants the monitoring to continue | Documented transfer procedure; support | Subscription transferred or re-created with a new owner; previous owner's access revoked | Transfer rules `OPEN`; retention; privacy | Old owner keeps visibility; new owner cannot register | Transfer procedure with revocation and re-verification | Second-hand boats are a recurring conversion source | Privacy of the previous owner; no vessel data leaks to a third party | Transfer test: old access revoked, new owner verified |
| 17. End-of-life | Removes or retires the device | Support; disposal guidance | Device deregistered, subscription closed, data deleted per policy, electronics disposed | Deregistration, deletion policy, retention limits, WEEE | Device keeps reporting after removal; data retained indefinitely | Deregistration + deletion confirmation | No retention trap; clean exit builds referral | Deletion honoured; no data held hostage | Delete/close record; confirmation to the customer |

**Critical dependencies for the WATCH journey.** (1) The service is `NOT_FOUND` (`WATCH_INGESTION`,
`WATCH_NOTIFICATION_PIPELINE`, `WATCH_DEVICE_IDENTITY`, `WATCH_SUBSCRIPTION_SERVICE`), so stages 7–17 cannot be
executed (P-06). (2) No connectivity contract exists (`WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`, H-12), so stages
3, 5, 7 and 8 cannot be promised. (3) No privacy/device-identity architecture (X-07) blocks stages 9 and 16.
(4) Brand and seller identity (`X-01`, `X-02`) block every customer-facing stage.

## 6. WATCH-specific journeys

Each records the trigger, the customer experience, the required display, the state-model path (README §20), the
recovery, and the evidence that would prove it. All are `OPEN`; none is implemented.

### 6.1 WJ-1 — Geofence event

- **Trigger.** The vessel leaves (or re-enters) the configured geofenced area.
- **Experience.** A notification arrives, the app shows the movement with the time it was observed, and the owner
  acknowledges it.
- **Required display.** `EVENT_OBSERVED → RULE_MATCHED → ALERT_CREATED → QUEUED → PROVIDER_ACCEPTED →
  DELIVERED_WHEN_CONFIRMED → ACKNOWLEDGED`, with `eventTime`, `alertCreationTime`, `providerAcceptanceTime`,
  `deliveryConfirmationTime` and `userAcknowledgementTime` shown as distinct values. If delivery is not confirmed,
  the state is `DELIVERY_UNKNOWN`, never "delivered".
- **Required behaviour.** No "your boat has been stolen" framing; no theft-prevention claim; the app must not
  present a stale position as current if the device has since gone offline.
- **Recovery.** If delivery is unknown: retry, alternative channel, call the marina or a trusted contact; support can
  see the pipeline state but **cannot see or act on the vessel's controls**.
- **Evidence.** Repeated geofence tests with real network loss; recorded state transitions; latency measurement.
  **Status.** `OPEN` (`WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`).

### 6.2 WJ-2 — Bilge alert

- **Trigger.** A high-water or bilge-activity input from a SENSE module or an integrated sensor.
- **Experience.** An alert with the water state, time and the last-known battery/connectivity state.
- **Required display.** The same lifecycle plus the measured quantity, units, calibration state and freshness of
  the reading; an uncalibrated or stale value is shown as invalid, not as a water level.
- **Required behaviour.** Never present the alert as "your boat is sinking" or as a certified alarm; never claim
  that a pump was activated; state clearly that the alert is information.
- **Recovery.** Contact the marina or a person aboard; acknowledge; support can confirm the pipeline state.
- **Evidence.** Wet/dry and false-trigger test matrix; alert with a deliberately disconnected sensor to prove the
  invalid-value display. **Status.** `OPEN` (SENSE measurement `NOT_MEASURED`; WATCH pipeline `NOT_FOUND`).

### 6.3 WJ-3 — Connectivity outage

- **Trigger.** The device loses mobile coverage (marina, winter cover, coastal shadow, roaming boundary).
- **Experience.** The app shows that the last update is older than expected; events observed during the outage
  arrive later; an alert may arrive after the event has ended.
- **Required display.** Last-known-good values with their age; a connectivity state distinct from "no alerts"; the
  `eventTime` of a late-delivered alert, never disguised as "now".
- **Required behaviour.** Events are buffered; delivery resumes after reconnection; no promise of immediate receipt;
  local functions (PILOT steering, SENSE local indication) are unaffected.
- **Recovery.** Wait for coverage; use the last-known-good view; ask a person aboard or the marina; the support path
  explains that this is expected behaviour, not a defect.
- **Evidence.** Controlled outage test on a real berth with recorded timestamps; a documented expectation statement
  in the support knowledge base. **Status.** `OPEN` (H-12).

### 6.4 WJ-4 — Adding a family member

- **Trigger.** The owner invites a partner or family member to see the boat.
- **Experience.** An invitation with a defined role, an acceptance, and a visible list of who has access.
- **Required display.** Who has access, with what role, since when, and a revocation path.
- **Required behaviour.** Invitations are explicit, role-limited and revocable; no shared password; the invited
  person sees only what the role allows; position visibility is disclosed (privacy).
- **Recovery.** Revoke and re-invite; support can verify the access list but never bypasses consent.
- **Evidence.** Roles/permissions test, privacy notice coverage, revocation test. **Status.** `OPEN`
  (`WATCH_DEVICE_IDENTITY = NOT_FOUND`, X-07).

### 6.5 WJ-5 — Technician sharing

- **Trigger.** An installer or yard needs temporary access to diagnose the monitoring installation.
- **Experience.** A time-limited, visible grant that the owner can revoke; the technician can see device health and
  installation state, not the owner's account.
- **Required display.** Active grants with expiry, scope and revoking party; an audit trail.
- **Required behaviour.** Least privilege; expiry by default; **no remote control of the vessel and no steering
  access of any kind**; the grant ends automatically.
- **Recovery.** Owner revokes; support re-grants only with the owner's consent; audit reviewed.
- **Evidence.** Grant/expiry/revocation test; audit log review with a security reviewer. **Status.** `OPEN`
  (X-07; no identity service).

### 6.6 WJ-6 — Device replacement

- **Trigger.** The device fails or is physically damaged.
- **Experience.** A replacement is provisioned and bound to the same account; the old device is deregistered; the
  monitored history is either migrated or explicitly not available.
- **Required display.** Which device is active, which is retired, and what history exists.
- **Required behaviour.** Re-provisioning must not expose the previous device's data to another account; serials
  reconciled; subscription not double-charged during the swap.
- **Recovery.** Support-led replacement with a documented procedure; temporary monitoring gap disclosed.
- **Evidence.** Full replacement rehearsal with two devices and a recorded account history. **Status.** `OPEN`
  (P-06, X-07).

### 6.7 WJ-7 — Core → Plus

- **Trigger.** The owner wants additional inputs, rules or longer history.
- **Experience.** A clear comparison, an explicit entitlement change, and a new price once approved.
- **Required display.** What changes, when it changes, what the new price is (when approved) and what is unaffected.
- **Required behaviour.** Plus benefits must already be validated and costed; no uplift invented; no proration
  promise before the policy exists; no double charge.
- **Recovery.** Downgrade at term end with a stated consequence; data export preserved.
- **Evidence.** Upgrade test after validation; billing test; entitlement-difference test. **Status.** `OPEN`
  (`WATCH-PLUS` `CONDITIONAL`).

### 6.8 WJ-8 — Cancellation

- **Trigger.** The owner cancels or does not renew.
- **Experience.** Remote monitoring stops at term end; the owner is told exactly what stops and what remains; own
  records are exportable; **local steering and local sensing are unaffected**.
- **Required display.** Term end date, list of stopped functions, export offer, retention plan.
- **Required behaviour.** No dark pattern, no false urgency, no silent auto-renewal, no degradation of any local
  safety-relevant function (subscription-isolation rule).
- **Recovery.** Reactivation within a stated window (policy `OPEN`); export remains available after cancellation.
- **Evidence.** Cancellation and export test; entitlement-isolation test proving local functions continue.
  **Status.** `OPEN` (no billing service, no written policy).

### 6.9 WJ-9 — Ownership transfer

- **Trigger.** The boat is sold.
- **Experience.** The subscription is transferred or closed and re-created with a new owner; the previous owner's
  access ends; history handling is stated.
- **Required display.** Current owner, device binding, transfer state, what history moves and what does not.
- **Required behaviour.** Identity re-verification for the new owner; no silent transfer of billing responsibility;
  privacy of the previous owner; no vessel data leaks.
- **Recovery.** Support-led transfer; the new owner re-registers if a transfer is not permitted (`OPEN`).
- **Evidence.** Transfer rehearsal with two accounts and a revoked-access check. **Status.** `OPEN` (X-07).

## 7. Cross-product journeys (with HUB, NAV, AIS, WEATHER and FLEET)

All are intended end-state experiences; all are `SPECIFIED_ONLY`. No journey implies that a combination is
purchasable, and none transfers steering authority.

### XJ-1 — PILOT + NAV (route context, no authority)

- **Data flow.** NAV route/waypoint context → local, authorised interface → PILOT control head for display; PILOT
  read-only status → NAV. No NAV command reaches the actuator.
- **Customer result.** The helm can see where the route intends to go while the skipper keeps authority.
- **Boundary.** NAV is an input and a display, never an authority. No automatic route-following may ship before
  evidence; route-following itself remains `TARGET_ONLY` (D4 §2.1, P04).
- **Blocked today.** `PILOT_SAFETY_GATE = BLOCKED`; NAV integration untested (D5 `I-01`, `I-30`).
- **Acceptance evidence.** A recorded local integration test proving that a route change cannot move the actuator.

### XJ-2 — SENSE + HUB + WATCH (the unattended-boat path)

- **Data flow.** SENSE modules → HUB (source, units, quality, freshness) → local display; WATCH → cloud → alerts
  ashore. The SENSE module never talks to the cloud directly.
- **Customer result.** The owner sees a measured picture aboard and receives remote alerts that are explicitly
  best-effort.
- **Boundary.** Three separate purchases; no product includes another; WATCH's subscription is separate from SENSE.
- **Blocked today.** SENSE measurement `NOT_MEASURED`; HUB protocol matrix unbuilt (`P-02`); WATCH service
  `NOT_FOUND` (D5 `I-06`, `I-08`, `I-11`).
- **Acceptance evidence.** End-to-end alert from a real sensor through HUB and WATCH with recorded timestamps, plus a
  network-loss repetition.

### XJ-3 — PILOT + WATCH (read-only awareness ashore)

- **Data flow.** PILOT status (mode, alarms, read-only) → WATCH → app ashore.
- **Customer result.** The owner can see that the pilot is engaged or that an alarm is present — **and can do
  nothing about it remotely**.
- **Boundary.** Strictly one-way. No engage, disengage, heading change or parameter change. If the owner wants to
  change anything, they must be aboard.
- **Blocked today.** PILOT safety gate; WATCH pipeline (`I-03`).
- **Acceptance evidence.** A security test proving no command channel exists in either direction.

### XJ-4 — WATCH + FLEET (read-only telemetry under contract)

- **Data flow.** WATCH → FLEET read-only telemetry for multi-vessel operations, under a written contract.
- **Customer result.** An operator sees vessel status across a small fleet without turning WATCH into a fleet
  platform.
- **Boundary.** FLEET is a separate SaaS product; no inclusion either way; no AIS-derived redistribution (`D-09`).
- **Blocked today.** `P-09` (no multi-tenant platform), `P-06` (no WATCH service), no contract (`I-14`, `I-15`).
- **Acceptance evidence.** Tenant-isolation test with two organisations and a written data-processing agreement.

### XJ-5 — Installer-led retrofit across the three families

- **Data flow.** Survey → product scope → quotation → installation → commissioning records → handover → service.
- **Customer result.** One documented vessel installation with named responsibility and a handover pack covering
  PILOT, SENSE and WATCH as purchased.
- **Boundary.** Each family keeps its own terms and warranty position; installation is quoted, never included; no
  product implies another.
- **Blocked today.** No installer network (`X-05`, `X-06`); no hardware; safety gate; WATCH service absent.
- **Acceptance evidence.** Two reference installations with complete records and a handover review.

### XJ-6 — Whole-boat coordinated experience (PILOT + SENSE + WATCH + HUB + NAV)

- **Data flow.** Sources → HUB → NAV and PILOT context; SENSE measured locally; WATCH ashore; all under separate
  licences and purchases.
- **Customer result.** A coordinated picture in which steering stays local and supervised and everything else is
  read-only or advisory.
- **Boundary.** No bundle is decided (MC-08); no product includes another; no cloud path to the actuator.
- **Blocked today.** The union of all blockers above, plus end-to-end integration evidence.
- **Acceptance evidence.** A recorded whole-vessel test with every safety boundary inspected, once every
  underlying row is `SUPPORTED`.

## 8. What the product displays when telemetry is stale or missing

Shared state vocabulary (batch-01 D5 §2.3 plus README §20 for WATCH); thresholds and windows are `OPEN`
engineering requirements and are never invented here.

| State | Meaning | PILOT display | SENSE display | WATCH display |
| --- | --- | --- | --- | --- |
| `FRESH` | Received within the current freshness window | Heading/wind/mode value with source and timestamp | Value with source, units, calibration state, timestamp | Value with source and timestamp; last update age |
| `STALE` | A previously received value has not updated | Mode quality warning; the value is shown aged and marked stale; engagement may be refused | Value remains visible, marked stale, with its age; never used as a valid reading | Last-known-good value with explicit age; a banner that the picture is not current |
| `LOST` | A source or target has not been heard for longer than its validity window | Sensor/source lost; mode exit; manual takeover prompt | Source lost; reading unavailable; installation check suggested | Device/source offline; queue of events whose delivery is unknown |
| `UNKNOWN` | A supported source is defined but has never produced a value | "Heading unavailable — never received"; mode cannot engage | "Unknown" plus the reason (no source, no calibration) | "No data received yet"; the app must not show a default |
| `NOT_AVAILABLE` | The product cannot provide the value in this configuration | "Not available — <reason>" (no driver feedback, no wind sensor, no route) | "Not available — no compatible source / not calibrated / out of range" | "Not available — no subscription / no coverage / input not configured" |
| Notification-specific | README §20 lifecycle | Not applicable (no remote alerting) | Local indication only; no push | `QUEUED`, `PROVIDER_ACCEPTED`, `DELIVERED_WHEN_CONFIRMED`, `ACKNOWLEDGED`, `EXPIRED`, `FAILED`, `DELIVERY_UNKNOWN` — each shown distinctly |

**Rules that apply everywhere.** (1) Never fabricate, interpolate or default a value. (2) Never present a stale
value as current. (3) Every value carries its source and its timestamp or age. (4) A missing value is a state, not
an error dialog. (5) The last-known-good value may be shown, but always with its age and a visual difference from a
live value. (6) Provider acceptance is never displayed as delivery, and delivery is never displayed as
acknowledgement. (7) An uncalibrated, out-of-range or implausible SENSE value is shown as invalid, never as data.
(8) A lapsed entitlement must not remove safety-relevant status display during an active session.

## 9. The no-steering guarantee (applies to every journey above)

| Workflow | What it may do | What it must never do |
| --- | --- | --- |
| WATCH app/cloud | Display authorised read-only PILOT status; deliver alerts; configure monitoring rules | Engage/disengage the pilot, change heading, send any command to the actuator or helm |
| NAV | Display route/waypoint context and read-only status | Command the actuator; auto-engage a mode; upload a route that steers |
| HUB | Publish bounded data; read status | Act as the actuator controller; host a control path |
| SENSE | Measure, indicate locally, publish readings to HUB/WATCH | Act as a steering input without qualification; command anything |
| Website/shop/account | Sell, document, support, configure entitlements | Provide any control surface for a vessel |
| Support tooling | Read diagnostics; verify entitlements; record a case | Steer, actuate, or bypass the local control head |
| Installer tooling | Commission locally with authenticated, physically initiated access | Leave a remote command path open; steer from off the vessel |

**Explicit statement.** No journey, workflow, app screen, API, support action or commercial process described in
this document lets WATCH or NAV steer the vessel. Steering is local, supervised and inside the PILOT boundary only.

## 10. Acceptance criteria for later milestones

| # | Stage / journey | Implementing milestone | Testable acceptance criterion |
| --- | --- | --- | --- |
| AC-01 | Discovery, Editions | MC-15A, MC-18A/20A, D4 | Each page states `DEFINED`, not for sale, carries the mandated disclaimers, and shows no price, stock, order or delivery CTA |
| AC-02 | Product understanding | MC-18/20 copy, D8 | Every capability block maps to a D4 row, carries its condition and limitation, and no unlabelled capability appears |
| AC-03 | Compatibility | MC-24, D5 | Only the four D5 outcomes are returned; `ELIGIBLE_SELF_INSTALL` is unreachable without a validated rule; NMEA 2000 is refused |
| AC-04 | Price comprehension | MC-25/26, D6 | No figure, "from" price or availability cue appears anywhere; the quotation model is explained without a number |
| AC-05 | Purchase or quote | MC-14A, MC-26 | Only the permitted CTAs exist; no order/payment can be produced at `DEFINED`; quotations carry the inclusion/exclusion schedule |
| AC-06 | Installation, commissioning | MC-13-PILOT, MC-14A | Bench + sea-trial evidence and a signed installation/commissioning record exist for a real configuration |
| AC-07 | First use, regular use | MC-13-PILOT/SENSE/WATCH | The safety and measurement scenarios are executed with recorded versions, sources and results; none passes on documentation |
| AC-08 | Stale/missing display | MC-13-*, MC-18/20 | Each state in §8 is rendered and reviewed in ES/EN; no fabricated or defaulted value appears |
| AC-09 | Alert delivery (WATCH) | MC-13-WATCH | Repeated delivery tests under real outage; state transitions match README §20; provider acceptance never shown as delivery |
| AC-10 | Subscription isolation | MC-11A, MC-26 | A payment-failure/expiry test proves local steering, local alarms and valid local sensing continue |
| AC-11 | WATCH sharing/transfer | MC-27, X-07 | Invitation, expiry, revocation, replacement and transfer tests pass with two accounts and an audit trail |
| AC-12 | No-steering guarantee | MC-13-*, security review | A security review proves no command channel to the actuator/helm exists from WATCH, NAV, HUB, app, support or installer tooling |
| AC-13 | Support | MC-28 | A case is recorded end to end with a named owner and no unpublished SLA; delivery-state evidence is attachable |
| AC-14 | Renewal/cancellation/end-of-life | MC-26/27, legal review | Cancellation, export, deletion and deregistration are tested and match approved terms |

## 11. Non-assertions

This document does not assert that any stage is implemented, priced, certified, tested, available or supported. It
creates no offer, stock record, delivery date, support SLA, installation time or price, warranty period,
compatibility result, data entitlement or legal clearance. MAREA PILOT, MAREA SENSE and MAREA WATCH are `DEFINED`
and `NOT_FOR_SALE`; PILOT is supervised only with a `BLOCKED` safety gate; SENSE is unmeasured and has no
connectivity of its own; WATCH is a conditional-awareness service whose service components are `NOT_FOUND`; MAREA
is a proposed brand without trademark clearance. No workflow here lets WATCH or NAV steer the vessel.

Related documents: `docs/marea/products/README.md` §16, §19, §20, §22; `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`
(D4); `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (D5); `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` (D6);
`PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` (D9); `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md` (batch-01 D7).
