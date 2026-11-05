# MC-11 — AIS, DISPLAY and PILOT boundaries (D9)

| Field | Value |
|---|---|
| Document | D9 `MC11-AIS-DISPLAY-PILOT-BOUNDARIES.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 9) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `hw-architect` |
| Machine records | `data/architecture-options.json`, `data/hardware-families.json`, `data/compatibility-requirements.json`, `data/nmea-status.json` |

**Evidence states.** No article exists for any of the three families; no test, sample, quotation,
certification, type approval, sea trial or customer evidence exists; no supplier was contacted.
`AIS_TRANSMISSION_OFFERED = false`, `REMOTE_HELM_CONTROL = false`, **`PILOT_SAFETY_GATE = BLOCKED`**,
`NMEA2000_CERTIFIED = false`, `CE_MARKING_CLAIM = PROHIBITED`, `ENVIRONMENTAL_RATING_CLAIM = PROHIBITED`.

**Standards note.** Only RED 2014/53/EU was retrieved as an official legal text in this session
(`EVD-MC11-015/016`). Other standards named below (for example EN 60945, IEC 61162 series, ITU-R M.1371,
SOLAS V, the Marine Equipment Directive) are **engineering references that were not retrieved or
interpreted in this session**; their applicability to a specific MAREA configuration is owned by the
conformity workstream and requires qualified review. Naming a standard is not a conformity claim.

---

# Part 1 — AIS: four separate products that must never be conflated

The programme's biggest AIS risk is linguistic: "AIS" can mean four commercially and legally different
things. MC-11 treats them as four separate products and permits only the first.

| # | Product | What it is | Radio? | Who may sell it | MAREA status |
|---|---|---|---|---|---|
| P1 | **Receive-only AIS receiver** | Listens to AIS VHF broadcasts, decodes them, presents targets | **Yes — radio receiver** | Anyone who meets RED and product obligations | **The only AIS product MAREA defines.** Blocked on hardware, RF and data rights |
| P2 | **AIS transponder** | Transmits the vessel's identity and position (Class A/B), receives AIS | **Yes — transmitter** | Requires type approval/equipment approval and installation rules | **Prohibited.** Not developed, not offered, not planned |
| P3 | **Third-party integration** | MAREA software consumes a certified third-party receiver/transponder output | No MAREA radio | MAREA sells software/integration, not radio | Candidate (see recommendation) |
| P4 | **Software-only visualisation** | Displays targets supplied by someone else's radio hardware | No MAREA radio | Software product only | Candidate (see recommendation) |

**Binding rule:** the words "AIS transponder", "AIS transmit", "own-position broadcast", "DSC" and
"collision avoidance" must not appear as MAREA capabilities in any artefact. `AIS_TRANSMISSION_OFFERED =
false` is restated in `data/governance-status.json` and checked by the validator.

## 1.1 Radio versus non-radio classification

| Classification | Applies to | Consequence |
|---|---|---|
| **Radio equipment (receiver)** | P1 | RED 2014/53/EU scope includes equipment that intentionally **receives** radio waves (`EVD-MC11-015`: recitals 6 and 11). Receiver performance and immunity are essential requirements. |
| **Radio equipment (transmitter)** | P2 | RED plus spectrum authorisation, type/equipment approval, installation and operator rules; a totally different regulatory and liability regime. |
| **Non-radio software** | P3, P4 | No radio placement; software/EMC/CRA/data-protection duties remain. |

The RED text retrieved also excludes marine equipment within the scope of the Marine Equipment Directive
as published (`EVD-MC11-016`, Annex I referencing Council Directive 96/98/EC). **The current MED is
Directive 2014/90/EU**; the interaction between RED and MED for a receive-only AIS used on an EU-flag
vessel is a question for the conformity workstream and qualified review, **not answered by this
document**.

## 1.2 Spectrum and maritime obligations (P1/P2)

- **P1 (receiver):** listening on the AIS VHF channels is receive-only; the obligations are product
  conformity (RED/EMC), installation practice (antenna, splitter) and the data-rights position for
  retention/redistribution of received AIS data (not granted).
- **P2 (transmitter):** would require the applicable maritime equipment approval, correct MMSI/identity
  programming, installation by competent personnel, and interoperability testing. **MAREA is not entering
  this product.** No spectrum licence, type approval, notified-body certificate or equipment approval
  exists.
- **Antenna/splitter:** a splitter that shares the vessel's VHF antenna must not degrade the vessel's
  required VHF radio. That is an installation-safety requirement, and the splitter is a separate product
  with its own conformity.

## 1.3 Hardware integration, antenna, GNSS/timing

| Element | Candidate requirement | Status |
|---|---|---|
| Receiver front end | dedicated receive-only AIS receiver; dual-channel is a target, **not asserted** | No hardware |
| Decoder | AIS message decoding with target age; GPL-3.0 AIS-catcher cannot be shipped until DEC-04 resolves distribution or a replacement decoder is selected | `BLOCKED` (S-01/DEC-04) |
| Antenna | dedicated AIS VHF antenna or splitter; 50-ohm coax; correct connectors; mounted clear of other antennas | Not designed |
| Installation | professional for antenna/splitter/coax; documented low-risk self-install only where a checklist exists | No installer programme |
| GNSS / own position | receiver does not supply own position; position/COG/SOG come from NAV/HUB/customer equipment; CPA/TCPA only with valid inputs and a validated computation path | `OPEN` |
| Timing | target age derives from local time; clock loss must be marked; GNSS time is not a security trust anchor | `OPEN` |
| Output | NMEA 0183 `!AIVDM` over a documented transport and/or a Signal K path where tested | `TEST_REQUIRED` |

## 1.4 Relevant marine test standards (engineering references, not retrieved)

| Standard | Relevance | Status |
|---|---|---|
| RED 2014/53/EU | Radio equipment essential requirements for P1/P2 | Retrieved (`EVD-MC11-015/016`); applicability owned by conformity workstream |
| EMC (via RED or the EMC Directive for non-radio parts) | Emissions and immunity of the appliance | Not assessed |
| EN 60945 (marine navigation and radiocommunication equipment — environmental and EMC) | The de-facto environmental/EMC reference for marine electronics; **not retrieved, applicability not assessed** | `UNKNOWN` |
| IEC 61162 series (NMEA 0183 / NMEA 2000 interface standards family) | Interface standards; **not retrieved, no licence held** | `BLOCKED` |
| ITU-R M.1371 (AIS technical characteristics) | AIS radio/message definition | Not retrieved |
| SOLAS V / national carriage rules | Which vessels must carry AIS, and in which class | Not assessed; MAREA sells to recreational craft and makes no carriage claim |
| Marine Equipment Directive 2014/90/EU | Whether the product is marine equipment for EU-flag ships | Not assessed (`EVD-MC11-016` flags the interface) |
| GPSR, RoHS, WEEE, CRA | Product safety, materials, waste, cybersecurity | Applicable candidates; not assessed |

## 1.5 Equipment/type approval, NMEA integration, installation, liability

- **Type/equipment approval:** not applicable to P1 in the same way as a transmitter, but RED conformity
  and possibly MED scope apply; **no approval, certificate or declaration exists**.
- **NMEA integration:** receive-only output as `!AIVDM`; NMEA 2000 is **not offered**; NMEA 0183 is not
  licensed and no conformance is claimed (`data/nmea-status.json`).
- **Installation:** antenna, splitter, coax and power are the dominant factors in reception quality and
  electrical safety; most retrofits need a professional. **No installation duration, price or technician
  certification scheme exists.**
- **Liability:** a receive-only receiver cannot prevent collision and must not be marketed as safety
  equipment. Disclaimers are mandatory: receive-only, not every vessel transmits AIS, no collision
  avoidance, does not replace watchkeeping or required equipment, no guaranteed range.
- **Data rights:** AIS-derived retention and redistribution are not granted (`D-09`); the allowed posture
  is local, own-vessel situational awareness with target age and source shown.

## 1.6 Cost and market alternatives (context only — no quotation)

| Alternative | Market context | Cost implication for MAREA |
|---|---|---|
| Build a MAREA receive-only receiver (P1) | Requires RF design, RED, enclosure, antenna ecosystem, decoder licence | High NRE and tooling; no price evidence obtained |
| Integrate third-party certified receivers (P3) | MAREA sells software/integration | Low NRE; no hardware margin; support depends on third-party devices |
| Software-only visualisation (P4) | Lowest capital exposure | No radio, no hardware; narrowest product |
| AIS transponder (P2) | Different product class with type approval | **Not permitted**; not costed |
| Competitor receive-only boxes | Public listings recorded in the canonical AIS spec (Digital Yacht AIS100 at EUR 300 EU store / EUR 360 ES storefront on 2026-10-30; VAT basis unstated) — `HISTORICAL_OBSERVATION` carried from `VERIFIED_REPO`, **not re-retrieved in this MC-11 session** | Context only, **not a MAREA cost or price**, and not a quotation |

## 1.7 AIS recommendation (documented, with reasons)

**Recommendation: DEFER transmitter development permanently for this programme and integrate third-party
certified receive-only equipment before building a MAREA receiver.** Concretely:

1. **No AIS transmitter development, ever, in this programme.** Reasons: a transponder transmits the
   vessel's identity and position, requires type/equipment approval and a different liability regime,
   cannot be sold as a receive-only awareness aid, and would put MAREA in the safety-critical transmit
   chain. It is also out of scope for every canonical product definition.
2. **Near term: software-first integration (P3/P4).** Publish and test a receive-only integration
   contract for a small list of third-party receivers; deliver target visualisation through NAV and HUB.
   Reasons: removes RF design, RED and antenna engineering from the critical path; no tooling; no hardware
   inventory risk; aligns with `ARCH-AIS-E` (score 4.86, the highest AIS option).
3. **Only if a funded RF programme exists: integrate a certified receiver module behind a MAREA
   supervisory MCU and interface board (`ARCH-AIS-D`).** Reasons: keeps RF conformity with a specialist
   supplier while MAREA owns the product experience; avoids a from-scratch RF design (`ARCH-AIS-C`) and a
   consumer SDR prototype (`ARCH-AIS-A`).
4. **Do not build `ARCH-AIS-C`** unless MAREA has an RF design team, a test programme, an antenna/splitter
   strategy and a funded RED route. It is the highest-risk AIS option.
5. **Resolve the decoder licence first.** A GPL-3.0 decoder shipping decision is a legal/product decision,
   not a firmware detail.
6. **Do not resolve the `AIS-CONNECTED` edition yet.** Its verdict stays `CONDITIONAL / NOT_YET_JUSTIFIED`;
   it may only ship if the hardware evidences multi-client networking and diagnostics the Receiver does
   not expose.

`AIS_RECEIVE_ONLY_MVP = DEFERRED_TO_INTEGRATION` is the engineering posture. No RFQ, supplier contact or
purchase was performed.

---

# Part 2 — DISPLAY: the screen is a product, not a monitor

## 2.1 The screen problem on a boat

A helm display must be readable in direct sun, at night without destroying dark adaptation, through
polarised sunglasses, from an off-axis viewing position, with wet or gloved hands, in spray and salt, in a
cockpit that can exceed 50 °C in summer and drop to near freezing overnight, while vibrating and while the
vessel's DC bus is dirty. Every one of those is a **measured** property, and none has been measured for
MAREA. The canonical states are binding: `DISPLAY_HARDWARE = HARDWARE_NOT_SELECTED`,
`DISPLAY_SIZE = SIZE_NOT_FROZEN`, `DISPLAY_BOM = BOM_NOT_ESTABLISHED`,
`DISPLAY_SUNLIGHT_READABILITY = NOT_MEASURED`, `DISPLAY_ENVIRONMENTAL = NOT_VERIFIED`,
`DISPLAY_EMBEDDED_RUNTIME = NOT_FOUND`.

## 2.2 Technology choices and what must be proven

| Aspect | Options | What must be proven before any claim |
|---|---|---|
| Screen technology | TFT-LCD with high-brightness backlight; transflective LCD; OLED (burn-in risk in a fixed helm layout); e-paper (too slow for instruments) | Photometric sunlight and night performance on the actual panel; lifetime and burn-in for the chosen technology |
| Sunlight readability | high brightness + optical bonding + anti-reflective coating | Measured contrast in direct sun at the installed viewing distance; **no "sunlight readable" claim before G-DIS-01** |
| Brightness / contrast | separate daylight, sunlight and night modes (not one dimmer) | Photometric validation per mode; no nit or contrast figure published until measured |
| Viewing angles | wide horizontal/vertical for an off-axis helm | Measured readability at the installed angles |
| Touch vs physical | touch (capacitive, wet/glove challenges); physical buttons/rotary (reliable but more enclosure work); hybrid | Wet and gloved operation measured (G-DIS-04); false activation from droplets |
| Sealing | gasket, bonded front, sealed connectors | Ingress test; **no IP rating claimed** |
| Optical bonding | reduces internal reflections and improves legibility | Process partner and reliability (delamination, bubbles); not selected |
| Thermal | backlight heat + enclosed helm + sun load | Thermal chamber and in-situ test; honest thermal state display |
| Housing / mounting | sealed bezel; one specified mount family with load case | Mechanical, vibration and removal-for-service validation |
| Power | 12/24 V conversion, inrush, backlight power | Measured consumption per mode; no power figure before measurement |
| EMC | display electronics + radios | EMC test; RED only if a radio is present |
| Readable safety information | alarm hierarchy distinguishable by colour, shape, label and pattern; persistence; off-screen alarm summary | Design review + usability test; not colour-only |
| Processor / graphics | SoC or SOM able to render instrument layouts responsively | Bench measurement of boot, frame rate, input latency |
| Boot / recovery | short boot to the instrument view; signed A/B update; power-loss safety; factory reset | Power-loss and update-interruption tests |
| Serviceability | panel or module service without scrapping the unit; defined service opening | Service procedure and spares strategy |

## 2.3 Four candidate display architectures

| Option | Description | Advantages | Disadvantages | Score |
|---|---|---|---|---:|
| Tablet-based (`ARCH-DISPLAY-A`) | Browser app on a customer/supplied tablet in a marine mount | Fastest, cheapest, no tooling | No control of sunlight, thermal or lifecycle; not a dedicated instrument | 4.03 |
| Industrial HMI module + SOM (`ARCH-DISPLAY-B`) | Qualified industrial display module + industrial SOM carrier | Best balance of sunlight evidence, lifecycle and thermal design | Custom carrier and enclosure; no sample or quote | 3.69 |
| Custom screen + carrier (`ARCH-DISPLAY-C`) | Panel stack, carrier and enclosure designed from scratch | Maximum control of readability, sealing and interaction | Highest engineering, tooling and conformity effort; MOQ risk | 2.98 |
| Third-party display integration (`ARCH-DISPLAY-E`) | MAREA runtime on a certified MFD/tablet platform | No panel BOM; fastest to a visible product | Third-party lifecycle and terms; cannot claim the hardware | 4.50 |

`ARCH-DISPLAY-D` (hybrid: industrial panel + MAREA carrier + SOM) is the **engineering preference**
(3.69) because it keeps the panel evidence with the supplier while MAREA owns interaction, sealing and
mounting. **DISPLAY size stays `SIZE_NOT_FROZEN`**; "7-inch-class" is an internal working designation only,
and `DISPLAY-LARGE-CONDITIONAL` must never be illustrated, priced or described with a diagonal.

## 2.4 DISPLAY–PILOT boundary

The display may, in a future authorised integration, present **read-only** PILOT status and alarms. It
must never present engagement, mode change, heading adjustment or tuning, and it is **not a PILOT control
head**. No cloud, web or mobile path to steering exists through DISPLAY. Any PILOT integration requires an
authorised interface inside the PILOT safety boundary after independent validation; the DISPLAY product
does not own that evidence. `PILOT_SAFETY_GATE = BLOCKED` is unaffected.

## 2.5 DISPLAY recommendation

Proceed with **`ARCH-DISPLAY-D`** as engineering preference, preceded by a **sunlight/night photometric
study and a wet/glove interaction study on a reference panel**, because those two properties decide
whether a helm display is credible at all. Do not publish a size, brightness, contrast, resolution or IP
rating before measurement. Keep a tablet-based path (`ARCH-DISPLAY-A`) as a learning platform, not as the
product.

---

# Part 3 — PILOT: documentation-only safety feasibility

**`PILOT_SAFETY_GATE = BLOCKED`.** This part is a feasibility analysis, not a design. No actuator,
motor-control output, steering command, control head behaviour or control API is designed, specified,
implemented or authorised in MC-11. Nothing here reduces the gate.

## 3.1 Control authority

A PILOT system would take **temporary, supervised, revocable authority** over the steering position while
a qualified person is at the helm. The authority model must define: who may engage; from where; what
disengages automatically; what the crew can always do (manual override, physical E-stop, motor-power
isolation); and what the system may never do (operate unattended, accept a remote command, resume a mode
after power loss without explicit re-engagement). None of this exists as a design; the legacy prototype
had an unauthenticated HTTP control API with open CORS and no TLS.

## 3.2 Mechanical and hydraulic interfaces

The drive must be matched to the actual steering system (mechanical cable, hydraulic, wheel, tiller,
quadrant) by a survey. Drive torque, travel, mounting, backlash, end stops and the mechanical manual
release differ per vessel and per drive. The legacy reference drive (ST3000-class) has **no recorded
datasheet, torque, current, age or wear**; the drive is the single largest unknown in any feasibility
case. A drive with no verified rating cannot be declared suitable for any documented envelope.

## 3.3 Power-failure boundaries

Required future behaviour: loss of power de-energises the drive; the helm returns to manual; the system
does not resume a mode automatically; the failure is visible; the manual release is mechanical and
independent of firmware. A future design would need a contactor with verified DC breaking rating, a
fuse/breaker coordination study and a documented stored-energy position. None exists.

## 3.4 Actuator suitability

Actuator selection requires: verified torque and duty cycle for the vessel; stall current and thermal
behaviour; feedback (or a documented open-loop case with end-stop and stall protection); clutch/manual
release; corrosion and sealing; and a documented mounting. The legacy stack had **no rudder feedback**,
an empty rudder field in telemetry, no end-stop enforcement and no manual-takeover detection (the
"clutch" value was a copy of the enable flag).

## 3.5 Independent stop and disengagement

Two independent means are required: (1) operator-actuated motor-power isolation (contactor/breaker, not
firmware), and (2) a control-head disengage plus mechanical manual release. A single GPIO with a pull-up
monitoring an NC contact is **not** an adequate safety architecture: it has no second channel, no
cross-monitoring, no stuck-contact diagnosis and no test pulse. A welded contactor would be undetectable.

## 3.6 Human override

Human override must be **always available and independent of software**: mechanical release, control-head
standby, and a physical E-stop. Takeover must be *detectable* by the system so it can demote/disengage.
The legacy design could not detect takeover at all.

## 3.7 Watchdog and redundancy

- MCU: independent hardware watchdog (the legacy firmware had **none**).
- Application processor: watchdog plus a heartbeat to the MCU; the MCU must enforce a timeout.
- Power: supervisor and safe reset; a brownout must not produce uncontrolled drive output.
- Sensor: heading, feedback and GNSS loss must each have a defined demotion or disengage rule.
- No redundancy claim can be made: nothing is designed, let alone redundant.

## 3.8 Sensor failure

Heading loss, wind loss, GNSS loss, serial loss, MCU power loss, application-processor reboot, main-power
loss, jammed rudder and end-stop must each have a tested response. The legacy engine had unit-tested
fault rules but no hardware evidence and an unauthenticated control plane.

## 3.9 Unexpected activation and runaway output

The design must prevent: engaging without an explicit local command; resuming after a fault or power cut;
stale commands being executed; a runaway output after a processor crash; and a serial link that can be
driven by another host. The MCU must fail closed: no valid command + valid enable + live heartbeat + no
latched fault = no drive output. That logic exists in the legacy code in part, but has never been measured.

## 3.10 Vessel variation, commissioning, maintenance

Each installation is vessel-specific. A mandatory survey must record steering type, drive, feedback,
heading, electrical work, E-stop, isolation and manual release. Commissioning must include dockside checks
and supervised sea trials per delivered mode, with failure injection. Maintenance must include E-stop and
alarm tests and a documented manual-takeover drill. **No installer network, competence scheme, insurance
position, survey template or maintenance plan exists.**

## 3.11 Hazard identification (documentation only)

| Hazard | Severity | Existing evidence | Required control |
|---|---|---|---|
| Uncommanded course change | Catastrophic | None | Independent power isolation, authenticated local control, fail-closed MCU |
| Runaway drive / jammed rudder | Catastrophic | None | Overcurrent by two independent means, end-stop/stall protection, operator E-stop |
| Failure to disengage on manual takeover | Catastrophic | None | Takeover detection, mechanical release, contactor |
| Remote or unauthorised engagement | Catastrophic | Legacy API unauthenticated | Local-only authenticated control plane |
| Power-loss behaviour | Major | None | De-energised drive, no auto-resume, explicit re-engage |
| Sensor loss at speed | Major | Unit tests only | Demotion/disengage rules, tested |
| Drive rating mismatch | Major | Drive datasheet absent | Survey + verified drive rating |
| Installation error | Major | None | Survey, competence scheme, commissioning record |
| Nuisance disengagement | Minor–major | None | Tuning, but no unsafe workaround |

## 3.12 Verification and validation plan (required, not executed)

1. Functional safety concept and hazard analysis with a qualified safety engineer (not engaged).
2. Independent review by a competent marine engineer/naval architect (not engaged).
3. Hardware design freeze: schematics, harness, enclosure, power architecture, E-stop/contactor selection
   with DC rating, fuse coordination (not done).
4. Bench/HIL evidence per safety function, measured with instruments (not done).
5. Sea trials per mode with failure injection (not done; no vessel, no authorisation).
6. Conformity assessment including motor-drive EMC (not started).
7. Insurance and product-liability position (does not exist).
8. Operator manual, training, alarm card and maintenance plan (do not exist).

## 3.13 Qualified engineering and insurance dependencies

Even a perfect design would require a qualified functional-safety engineer, an independent marine
engineer, a notified body where applicable, an insurer willing to underwrite a steering product and a
company able to carry the liability. None of these dependencies is satisfied or funded.

## 3.14 PILOT recommendation — documented

**Disposition: `DEFER_SAFETY_CRITICAL_DEVELOPMENT`.** Among the mandated vocabulary
(`DEFER_SAFETY_CRITICAL_DEVELOPMENT`, `INTERNAL_SAFETY_RESEARCH_ONLY`,
`REQUIRES_QUALIFIED_SAFETY_ENGINEERING`, `REQUIRES_CUSTOMER_VALIDATION`,
`BLOCKED_PENDING_FUNDING_AND_TEST_PLAN`) the primary recommendation is **defer the safety-critical
development**, and the conditions required to reopen it are:
`REQUIRES_QUALIFIED_SAFETY_ENGINEERING` **and** `BLOCKED_PENDING_FUNDING_AND_TEST_PLAN` **and**
`REQUIRES_CUSTOMER_VALIDATION`. In practical terms:

- No PILOT hardware, actuator, motor-control or steering development is authorised.
- If PILOT is ever revisited, the only acceptable engineering posture would be `ARCH-PILOT-E`: a
  no-actuator, documentary and integration posture with **no MAREA steering output**, or at most a
  read-only status integration of a third-party certified autopilot.
- Any future steering architecture requires, at minimum: a named qualified safety engineer, a functional
  safety concept, an independent reviewer, bench/HIL evidence, sea trials with failure injection,
  conformity evidence, insurance, and a funded programme. None exists.
- `PILOT_SAFETY_GATE` stays **`BLOCKED`** in every document until a future authorised milestone changes it
  — and MC-11 does not.

---

# Part 4 — Cross-family boundaries that must not erode

| Boundary | Rule |
|---|---|
| AIS ↔ collision avoidance | AIS reception is an awareness aid. Never "collision avoidance", never a completeness claim. |
| AIS ↔ NAV/DISPLAY | Traffic display is a consuming-application feature; buying a receiver does not buy charts or navigation. |
| DISPLAY ↔ PILOT | Read-only status only after an authorised interface; never a control head; never engagement control. |
| NAV ↔ PILOT | NAV may provide route context; it never commands the helm. No automatic route upload that steers. |
| PILOT ↔ HUB/WATCH/DISPLAY | No command path of any kind; read-only status at most, under an approved authenticated interface. |
| Any family ↔ remote control | `REMOTE_HELM_CONTROL = false`; no cloud/web/mobile path to steering exists or is planned. |
| Any family ↔ certification | No CE, NMEA, IP, temperature, EMC, accuracy or alert-delivery claim exists. |

These boundaries are restated in `data/compatibility-requirements.json` (`BLOCKED` rows) and are enforced
by the validator (V36–V38, V40, V49).
