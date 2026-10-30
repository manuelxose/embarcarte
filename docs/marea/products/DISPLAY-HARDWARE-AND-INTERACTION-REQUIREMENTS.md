# MAREA DISPLAY — hardware and interaction requirements annex (MC-07 / D-HW)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D-HW-DISPLAY |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Product | MAREA DISPLAY (DISPLAY); editions DISPLAY-7 and DISPLAY-LARGE-CONDITIONAL |
| Owner function | Hardware and interaction engineering, with the DISPLAY Product Director as author function |
| Status | INTERNAL / COMPLETE_TARGET_SPECIFICATION / NOT_FOR_SALE / NOT_PUBLISHED |
| Companion dossier | docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md |
| Contract authority | docs/marea/products/README.md §1–§23; MC-07 shared conventions brief, including §17 claim rules |
| Date | 2026-10-30 |

This annex fixes the intended hardware, the physical and interaction requirements, and the validation plan for MAREA
DISPLAY. It does **not** report a measurement, a selected component or a test result. Every numeric or physical
statement in this annex is one of two things and is labelled as such:

- **REQUIRED_TARGET** — an engineering target that the design must meet; it is a requirement, not a measurement,
  and it cannot be quoted as a product specification until the corresponding test is executed and recorded.
- **NOT_ESTABLISHED** — a value that has not been chosen, measured or verified; it may not be published, inferred
  or presented as a product fact.

The canonical states SIZE_NOT_FROZEN, HARDWARE_NOT_SELECTED and BOM_NOT_ESTABLISHED apply throughout. There is no
manufactured unit, no prototype, no supplier quote and no laboratory result. The audited UI is a browser application,
not an embedded multifunction-display runtime (P-07), and no panel, compute module, enclosure, mount or harness exists
(H-05, H-11).

## 0. Contents

1. Purpose, scope and non-assertions
2. Canonical hardware evidence states
3. Intended hardware families and subsystem decomposition
4. Proposed sizes and their evidence status
5. Physical display requirements
6. Mounting requirements
7. Vessel power integration requirements
8. Thermal and environmental operating conditions
9. Day, sunlight and night modes
10. Measurement and alarm visibility
11. Accessible readouts and human factors
12. Touch, physical controls and wet/gloved input
13. Startup, updates, recovery and configuration
14. Local security requirements
15. Safety and PILOT integration boundaries
16. Engineering and conformity validation plan
17. Required disclaimers — verbatim
18. Non-assertions and document status

---

## 1. Purpose, scope and non-assertions

The annex exists so that a hardware engineer, an industrial designer, a compliance engineer and a reviewer can see
exactly what the finished device must do, what evidence is missing, and what may never be claimed in the meantime. It
is an engineering requirements document, not a datasheet. It defines the device boundary: the panel, the compute
module, the storage, the enclosure and bezel, the mounting, the power conversion and protection, the connectors and
harness, the dedicated operating environment and the base software. It does not define charts, weather data, the NAV
software, the HUB, the AIS receiver or any other ecosystem product.

**Scope of this annex:** intended hardware families; physical display requirements; proposed sizes with evidence
status; mounting; power; thermal and environmental conditions; day/sunlight/night modes; measurement and alarm
visibility; accessible readouts; wet/gloved input requirements; update and recovery; safety and PILOT integration
boundaries; and the engineering and conformity validation plan.

**What this annex is not:** not a certification file, not a test report, not a bill of materials, not a supplier
selection, not a brightness or resolution specification, not a sunlight-readability guarantee, not a price input and
not evidence that a device exists. MC-04 contrast evidence is referenced only as design evidence for proposed colour
and type tokens, never as a hardware photometric result.

---

## 2. Canonical hardware evidence states

| State | Value | Meaning |
| --- | --- | --- |
| DISPLAY_HARDWARE | HARDWARE_NOT_SELECTED | No panel, compute module, enclosure, mount, power item or harness has been selected |
| DISPLAY_SIZE | SIZE_NOT_FROZEN | No diagonal size is chosen, measured or published; the entry edition carries a "7-inch-class" working designation only |
| DISPLAY_BOM | BOM_NOT_ESTABLISHED | No bill of materials, manufacturer part numbers, revisions, suppliers or serial plan exist |
| DISPLAY_SUNLIGHT_READABILITY | NOT_MEASURED | No photometric or field sunlight test exists on any article |
| DISPLAY_ENVIRONMENTAL | NOT_VERIFIED | No ingress, salt-fog, UV, vibration, shock or thermal test exists on any article |
| DISPLAY_EMBEDDED_RUNTIME | NOT_FOUND | No dedicated embedded or kiosk runtime exists for a display product |
| DISPLAY_UPDATE_ROLLBACK | NOT_FOUND | No signed update, rollback, SBOM or vulnerability process exists |
| DISPLAY_INSTALLER_NETWORK | NOT_FOUND | No installer programme, installation validation or installation cost exists |

These strings are canonical for batch 03 and may not be upgraded by this annex.

---

## 3. Intended hardware families and subsystem decomposition

### 3.1 Intended families

| Family | Status | Intended role | What is frozen |
| --- | --- | --- | --- |
| Compact helm display (entry, DISPLAY-7) | DEFINED, HARDWARE_NOT_SELECTED | Fixed, compact screen for a helm with limited panel space; full base-software experience; no capability reduced relative to a larger screen | The experience envelope and the edition boundary; **not** the size, panel, compute module, enclosure or price |
| Larger helm display (DISPLAY-LARGE-CONDITIONAL) | CONDITIONAL, HARDWARE_NOT_SELECTED, SIZE_NOT_FROZEN | Future larger-screen family for a helm with more panel space | Only the fact that it is conditional; the size is not frozen and no diagonal is named |

No third hardware family, generation label, variant suffix or "Pro/Max" naming may be invented.

### 3.2 Subsystem decomposition (all REQUIRED_TARGET, all NOT_ESTABLISHED today)

| Subsystem | Functional requirement | Selection state |
| --- | --- | --- |
| Panel and backlight | A panel suitable for a marine helm, with a sunlight mode and a night mode, and a photometric validation plan | HARDWARE_NOT_SELECTED |
| Compute module and memory | Enough compute to boot the dedicated environment and render the instrument layouts at the target responsiveness | HARDWARE_NOT_SELECTED |
| Storage | Durable local storage for configuration, logs and update staging, with a defined wear and replacement position | HARDWARE_NOT_SELECTED |
| Enclosure and bezel | A sealed enclosure and bezel intended for a wet marine environment, with a defined service opening strategy | HARDWARE_NOT_SELECTED |
| Mounting system | One approved mount family with a documented surface, orientation and fastening envelope | HARDWARE_NOT_SELECTED |
| Power conversion and protection | Conversion and protection from a vessel supply, with documented fusing, grounding and transient behaviour | HARDWARE_NOT_SELECTED |
| Connectors and harness | Marine connectors and a documented harness for the supported data inputs | HARDWARE_NOT_SELECTED |
| Dedicated operating environment | A controlled runtime that boots into the instrument interface and is locked to the approved application set | DISPLAY_EMBEDDED_RUNTIME = NOT_FOUND |
| Base software | Local dashboards, instrument and received-AIS presentation, navigation presentation, configuration, backup, diagnostics and update client | Specification only; no build |

---

## 4. Proposed sizes and their evidence status

| Edition | Proposed size statement | Evidence status | What may be published |
| --- | --- | --- | --- |
| DISPLAY-7 | "7-inch-class" is a **working designation** for a compact helm display, not a measured diagonal and not a frozen size | SIZE_NOT_FROZEN; HARDWARE_NOT_SELECTED | Only that the size is not frozen; no diagonal, no resolution, no aspect ratio and no panel technology |
| DISPLAY-LARGE-CONDITIONAL | A future larger-screen family with no chosen size | SIZE_NOT_FROZEN; HARDWARE_NOT_SELECTED; EDITION_CONDITIONAL | Only that the family is conditional; no size option list and specifically no diagonal selection |

Rules: (1) no screen size may be presented as a product fact, and no size may be inferred from a marketing label;
(2) the "7-inch-class" wording is an internal working designation and may not appear in published copy as a size
claim; (3) the conditional family must not be illustrated, priced or described with a diagonal; (4) the size decision
is a hardware-selection output, and until it is taken the product is intentionally size-agnostic.

---

## 5. Physical display requirements

All requirements below are REQUIRED_TARGET unless explicitly NOT_ESTABLISHED. No value has been measured.

| # | Requirement | Detail | Evidence status |
| --- | --- | --- | --- |
| 5.1 | Panel technology | A panel technology suitable for a marine helm with a sunlight mode and a night mode; the technology choice is open | NOT_ESTABLISHED |
| 5.2 | Resolution | A resolution sufficient for the instrument layouts and text at helm distance; no resolution figure is published | NOT_ESTABLISHED |
| 5.3 | Optical bonding and anti-reflective treatment | A stack intended to reduce internal reflections and improve daylight legibility; selection open | NOT_ESTABLISHED |
| 5.4 | Viewing angles | Wide enough for an off-axis helm viewing position without the alarm hierarchy becoming unreadable; numbers to be defined in the sunlight test protocol | NOT_ESTABLISHED |
| 5.5 | Brightness and dimming | A sunlight mode and a night mode implemented as separate experiences, with a dimming range validated by photometry; **no brightness, nit or contrast figure is published** | NOT_MEASURED |
| 5.6 | Colour and state encoding | Every state keeps a shape, label and pattern in addition to colour; the palette is design evidence from MC-04, not a hardware result | REQUIRED_TARGET (design evidence only) |
| 5.7 | Text legibility | Text at the intended helm viewing distance meets a minimum angular size to be fixed at design review; **no type size is published** | NOT_ESTABLISHED |
| 5.8 | Surface | A front surface compatible with wet use and cleaning, with a defined cleaning requirement | NOT_ESTABLISHED |
| 5.9 | Bezel and serviceability | A bezel and enclosure with a defined service opening strategy for panel or module service | NOT_ESTABLISHED |
| 5.10 | Weight and centre of gravity | Must suit the approved mount and the documented surface load case | NOT_ESTABLISHED |
| 5.11 | Marking | Serial, model, input rating and required markings, with traceability to the BOM | NOT_ESTABLISHED |

---

## 6. Mounting requirements

| # | Requirement | Detail | Evidence status |
| --- | --- | --- | --- |
| 6.1 | Approved mount family | One approved mount family with a documented surface, orientation, fastening and load case | NOT_ESTABLISHED |
| 6.2 | Surface preparation | A documented surface preparation and fastening method for the approved surfaces | NOT_ESTABLISHED |
| 6.3 | Viewing position | The mount must allow the documented viewing position at the helm and the documented cable routing | NOT_ESTABLISHED |
| 6.4 | Removal and service | The display must be removable for service without damaging the vessel surface | REQUIRED_TARGET |
| 6.5 | Tamper and retention | A retention or locking position suitable for a helm, with a defined service access | REQUIRED_TARGET |
| 6.6 | Alternative positions | A second-station configuration is supported only where a documented mount and harness exist | NOT_ESTABLISHED |
| 6.7 | Vibration interface | The mount must survive G-DIS-06 with the display installed | NOT_VERIFIED |

Mounting is always part of an installation assessment. No "universal mount" claim may be made; no mount is approved.

---

## 7. Vessel power integration requirements

| # | Requirement | Detail | Evidence status |
| --- | --- | --- | --- |
| 7.1 | Nominal systems | Support for the documented 12 V and 24 V nominal vessel supplies, with a defined tolerance envelope | REQUIRED_TARGET |
| 7.2 | Protection | Over-current protection, reverse-polarity protection, transient suppression and a documented grounding practice | REQUIRED_TARGET |
| 7.3 | Power item | A supplied power conversion and protection item appropriate to the documented installation | NOT_ESTABLISHED |
| 7.4 | Consumption | A consumption figure may be published only after measurement; **no current or power figure is published today** | NOT_MEASURED |
| 7.5 | Power-loss behaviour | On supply loss the device stops or enters a defined safe state, preserves configuration and restarts to a known state | NOT_VERIFIED (DISPLAY-AC-13) |
| 7.6 | Transients | A documented test plan for load-dump-style transients and for coexistence with other vessel loads | NOT_VERIFIED |
| 7.7 | Isolation | A defined isolation and grounding position, including any data-source reference | NOT_ESTABLISHED |

---

## 8. Thermal and environmental operating conditions

All envelope values are NOT_ESTABLISHED. No temperature range, ingress rating, salt-fog classification or vibration
classification may be published until the corresponding test is executed and recorded.

| # | Condition | Requirement | Evidence status |
| --- | --- | --- | --- |
| 8.1 | Operating temperature | An operating envelope defined by the thermal test plan, including a hot-helm and a cold-start profile | NOT_ESTABLISHED |
| 8.2 | Storage temperature | A storage envelope defined by the same plan | NOT_ESTABLISHED |
| 8.3 | Thermal state presentation | The device shows a thermal state honestly and never hides an alarm because of heat | REQUIRED_TARGET |
| 8.4 | Ingress | An ingress target defined with the enclosure design; **no IP rating is claimed** | NOT_VERIFIED |
| 8.5 | Salt fog and corrosion | A salt-fog and corrosion resistance plan for the enclosure, bezel, connectors and fasteners | NOT_VERIFIED |
| 8.6 | UV and solar load | A UV and solar-load plan for the front surface and bezel | NOT_VERIFIED |
| 8.7 | Vibration and shock | A marine vibration and shock profile selected from a published standard and applied to the installed article | NOT_VERIFIED |
| 8.8 | Humidity and condensation | A condensation and humidity plan for a helm that cools overnight | NOT_VERIFIED |
| 8.9 | Chemical exposure | A cleaning-agent and fuel/solvent exposure position for the front surface | NOT_ESTABLISHED |

---

## 9. Day, sunlight and night modes

| Mode | Intended experience | Requirement | Evidence status |
| --- | --- | --- | --- |
| Daylight | A balanced instrument view for normal daytime helm use, with the alarm hierarchy readable | Palette, type and layout validated at design review; contrast on proposed tokens is MC-04 design evidence only | NOT_MEASURED |
| Sunlight | A high-emphasis mode for direct sun: maximum useful contrast, reduced fine detail, alarms preserved | Must be photometrically validated on the actual panel in direct sun (G-DIS-01) | NOT_MEASURED |
| Night | A low-luminance, warm-neutral mode that preserves dark adaptation, reduces glare and disables pulsing | Must be validated in a dark-room photometry test and a supervised night-use protocol (G-DIS-02) | NOT_MEASURED |

Rules: the three modes are separate experiences, not one dimmer; every mode keeps the alarm hierarchy visible and
distinguishable without colour; night mode must not pulse; and no mode may be described as "sunlight readable" until
G-DIS-01 passes. The MC-04 measured palettes (54/54 target pairs in day, sunlight and night) are design evidence for
proposed tokens and are **not** a measurement of the panel.

---

## 10. Measurement and alarm visibility

| # | Requirement | Detail | Evidence status |
| --- | --- | --- | --- |
| 10.1 | Value with source and age | Every presented measurement carries value, unit, source and age; stale or unknown is explicit | REQUIRED_TARGET |
| 10.2 | Alarm hierarchy | Advisory, caution, warning and critical, each distinguishable by colour, shape, label and pattern | REQUIRED_TARGET |
| 10.3 | Acknowledgement | Acknowledgement is distinct from resolution and never erases a standing condition | REQUIRED_TARGET |
| 10.4 | Alarm persistence | A standing alarm remains visible in every mode and layout until resolved or explicitly acknowledged per the defined rule | REQUIRED_TARGET |
| 10.5 | Off-screen alarms | An alarm not visible in the current layout produces a persistent summary indicator | REQUIRED_TARGET |
| 10.6 | Alarm in degraded states | Alarms remain honest when a source is stale, unavailable or out of range; an unevaluated alarm is shown as not evaluated | REQUIRED_TARGET |
| 10.7 | Alarm audio, if implemented | Any audible alarm must meet a defined audibility and silence rule; the position is NOT_ESTABLISHED | NOT_ESTABLISHED |
| 10.8 | Alarm announcement for accessibility | Alarms announced in a non-colour-dependent way, with the accessible readout model of §11 | REQUIRED_TARGET |

---

## 11. Accessible readouts and human factors

| # | Requirement | Detail | Evidence status |
| --- | --- | --- | --- |
| 11.1 | Angular text size | Text at the intended viewing distance meets a minimum angular size fixed at design review | NOT_ESTABLISHED |
| 11.2 | Contrast | Proposed token pairs meet AA and the internal target in all modes as **design evidence** (MC-04 QA-01); the rendered panel is not measured | DESIGN EVIDENCE ONLY |
| 11.3 | Non-colour-only meaning | Every state keeps shape, label and pattern; greyscale and colour-blind simulations are design evidence, not user tests | REQUIRED_TARGET (design evidence) |
| 11.4 | Target size | Controls target a 44 x 44 px-class internal minimum for wet/glove use, with the web target-size floor treated separately | REQUIRED_TARGET |
| 11.5 | Focus and sequence | A visible focus state and a defined control order for any physical or on-screen control | REQUIRED_TARGET |
| 11.6 | Bilingual readouts | Spanish (Spain) and English interfaces with identical capability and identical safety strings | REQUIRED_TARGET |
| 11.7 | Reduced motion | Motion is limited; night mode reduces or disables pulsing; no flashing above a safe rate | REQUIRED_TARGET |

The accessible readout model is specified as a requirement. It is not a WCAG conformance claim, not a cockpit user
test and not a hardware accessibility validation.

---

## 12. Touch, physical controls and wet/gloved input

| # | Requirement | Detail | Evidence status |
| --- | --- | --- | --- |
| 12.1 | Touch | A touch sensor suitable for a wet helm, with a defined touch target and gesture set | NOT_ESTABLISHED |
| 12.2 | Dry responsiveness | A stated latency and accuracy target, measured instrumentally (G-DIS-03) | NOT_VERIFIED |
| 12.3 | Physical controls | Physical buttons or a rotary control may exist only if the final hardware includes them; their behaviour must then be validated | NOT_ESTABLISHED |
| 12.4 | Wet input | Wet-hand operation is a REQUIRED_TARGET and must be measured before any claim (G-DIS-04) | NOT_VERIFIED |
| 12.5 | Gloved input | Gloved operation is a REQUIRED_TARGET and must be measured before any claim (G-DIS-04) | NOT_VERIFIED |
| 12.6 | Cleaning mode | A defined way to clean the surface without triggering controls | REQUIRED_TARGET |
| 12.7 | False activation | A defined behaviour for water droplets and spray on the surface | REQUIRED_TARGET |

**Rule:** no wet/glove claim may appear in any document, copy or sales material until G-DIS-04 is executed on the
actual article and recorded. If the test fails, the requirement changes; the claim does not.

---

## 13. Startup, updates, recovery and configuration

| # | Requirement | Detail | Evidence status |
| --- | --- | --- | --- |
| 13.1 | Startup | A short boot that names software version, vessel profile and discovered sources; no generic desktop | REQUIRED_TARGET |
| 13.2 | Boot failure | A defined state when boot fails, with a recovery route and a diagnostic record | REQUIRED_TARGET |
| 13.3 | Signed update | Updates are signed and verified; unsigned software is refused | DISPLAY_UPDATE_ROLLBACK = NOT_FOUND |
| 13.4 | Rollback | A failed or interrupted update restores the previous working version with configuration intact | NOT_FOUND |
| 13.5 | Update interruption | Power loss during update must not brick the device | NOT_FOUND |
| 13.6 | Configuration backup | Export and restore of layouts, profiles and settings in a documented format | REQUIRED_TARGET |
| 13.7 | Factory reset | A defined reset that preserves the diagnostic record and states clearly what is erased | REQUIRED_TARGET |
| 13.8 | Version visibility | The running software version is visible to the owner and in the diagnostic record | REQUIRED_TARGET |
| 13.9 | Vulnerability handling | A CRA-oriented vulnerability handling, SBOM and incident process | NOT_FOUND (H-13) |

---

## 14. Local security requirements

| # | Requirement | Detail | Evidence status |
| --- | --- | --- | --- |
| 14.1 | No default credential | No shared or default password or key on a shipped device | REQUIRED_TARGET |
| 14.2 | Local access model | A defined local access model for owner, installer and service, with a documented scope | REQUIRED_TARGET |
| 14.3 | No inbound internet control | The device does not expose an internet-reachable control surface | REQUIRED_TARGET |
| 14.4 | Signed software | Signed operating environment and application images | REQUIRED_TARGET |
| 14.5 | Secure update | A secure update path with rollback, tied to §13 | NOT_FOUND |
| 14.6 | Data minimisation | No vessel position or operational data leaves the device by default | REQUIRED_TARGET |
| 14.7 | Threat model and DPIA | A threat model, privacy assessment and incident-response route before any connected SKU | NOT_STARTED (X-07) |

---

## 15. Safety and PILOT integration boundaries

| # | Rule | Detail |
| --- | --- | --- |
| 15.1 | No steering authority | The display never commands a steering actuator, motor controller or autopilot and has no engagement control |
| 15.2 | PILOT read-only | A future authorized interface may present read-only PILOT status and alarms; it never presents engagement, mode change, heading adjustment or tuning |
| 15.3 | No control head | DISPLAY is not a PILOT control head and must never be presented as one |
| 15.4 | No remote path | No cloud, web or mobile path to steering exists through DISPLAY, and none may be planned inside this product |
| 15.5 | Independent safety boundary | Any PILOT integration requires an authorized interface inside the PILOT safety boundary after independent validation; the DISPLAY product does not own that evidence |
| 15.6 | Alarm honesty | A PILOT-related advisory shown on DISPLAY must carry the same status semantics as the PILOT product and must never imply a control capability |

DISPLAY–PILOT is UNKNOWN. Nothing in this annex reduces the PILOT safety gate, which remains BLOCKED (H-01, P-04).

---

## 16. Engineering and conformity validation plan

| Stage | Scope | Required evidence | Exit criterion | State |
| --- | --- | --- | --- | --- |
| V0 — Concept | Requirements and architecture | This annex, the dossier and the interface review | Requirements baselined and internally reviewed | COMPLETE as a document |
| V1 — Bench | First article, power, boot, touch, modes | Bench report with article serial, software version and measurements | Every bench criterion recorded; open items listed | NOT_EXECUTED |
| V2 — Environmental | Thermal, ingress, salt fog, UV, vibration and shock | Laboratory reports per stage 8 | No unresolved safety-relevant failure | NOT_EXECUTED |
| V3 — EMC and radio | EMC pre-scan, then accredited EMC; RED route if a radio is present | Test reports and applicability decision | EMC essential requirements demonstrated; radio route decided | NOT_EXECUTED — DISPLAY is CLEARLY_APPLICABLE for EMC, POTENTIALLY_APPLICABLE for RED (HARDWARE-COMPLIANCE-MATRIX.md §5.2) |
| V4 — Installation | Reference installations and commissioning | Installation records and measured hours | Documented installation reproducible; handover recorded | NOT_EXECUTED |
| V5 — Field pilot | Controlled owner use, sunlight, night, wet/glove | Pilot report with controlled conditions and owner feedback | No safety-relevant defect; claims match measurements | NOT_EXECUTED |
| V6 — Conformity | CE route, GPSR, RoHS, WEEE, CRA, LVD position | Technical file, EU declaration of conformity, registrations, CRA process | Conformity evidence on file per SKU | NOT_STARTED (H-06, H-13) |

**Conformity applicability (from docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md §5.2).** For a dedicated
display: CE = CLEARLY_APPLICABLE; EMC = CLEARLY_APPLICABLE; RED = POTENTIALLY_APPLICABLE (only if a radio is
included); LVD = NOT_APPLICABLE_WITH_EXPLANATION (the LVD voltage scope is 50–1000 V AC or 75–1500 V DC and a display
on a vessel supply is outside it); GPSR = CLEARLY_APPLICABLE; RoHS = CLEARLY_APPLICABLE; WEEE = CLEARLY_APPLICABLE;
CRA = CLEARLY_APPLICABLE; MED = NOT_APPLICABLE_WITH_EXPLANATION (not marine equipment on an EU-flag ship under the
MED scope). These are audit determinations, not a conformity assessment, and no marking, declaration or certificate
exists.

**Validation rules.** (1) Each stage is reported as PASS, PARTIAL, BLOCKED or FAIL with its exact scope; no stage is
rounded up. (2) A supplier datasheet is not a test result. (3) A simulation is not a photometric measurement. (4) A
browser mock-up is not an embedded runtime. (5) A single successful unit is not a production-quality result. (6) No
stage may be skipped before a sale.

---

## 17. Required disclaimers — verbatim

### 17.1 Navigation and instruments disclaimer

Required in this annex because it describes a surface that presents position, charts, traffic, depth and weather.
Approved wording of docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §9, used verbatim:

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

### 17.2 DISPLAY batch-03 limitation statement (verbatim, INTERNAL DRAFT wording)

The wording below is the MC-07 internal-draft statement pending claims-register approval; it is not claimed as
approved policy text.

- ES: «La pantalla es un concepto interno: no existe una unidad fabricada ni se han verificado tamaño, brillo, legibilidad solar ni resistencia ambiental. Las cartas y los servicios de datos se licencian por separado.»
- EN: "The display is an internal concept: no manufactured unit exists and its size, brightness, sunlight legibility and environmental resistance have not been verified. Charts and data services are licensed separately."

### 17.3 Brand attribution

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

---

## 18. Non-assertions and document status

This annex does **not** assert, and must not be read as asserting: any selected panel, compute module, enclosure,
mount, power item or harness; any screen size or aspect ratio; any brightness, nit, contrast, resolution or
viewing-angle figure; any sunlight-readable or night-safe guarantee; any IP rating, temperature range, salt-fog class,
vibration class or shock figure; any measured power consumption; any wet or gloved operability; any tested
compatibility with any instrument, HUB, AIS, NAV, WEATHER, SENSE, PILOT or WATCH product; any steering, engagement,
control-head or remote-helm capability; any CE marking, EU declaration of conformity, EMC/RED/LVD/GPSR/RoHS/WEEE/CRA
assessment or certificate; any NMEA 2000 licence or certification; any chart, basemap or weather right; any supplier
quote, BOM, tooling quote, cost, margin or approved price; any bench, laboratory, sea-trial or field result; and any
image asset.

Status of this deliverable: INTERNAL, COMPLETE_TARGET_SPECIFICATION, NOT_FOR_SALE, NOT_PUBLISHED. It defines the
hardware and interaction requirements and the evidence that would prove them. It does not make MAREA DISPLAY
orderable, publishable, certified, priced or supported, and it does not replace the MC-34 hardware-evidence gate, the
DPIA or any conformity assessment.
