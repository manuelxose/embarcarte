# MC-11 — D17 Environmental reliability plan

| Field | Value |
|---|---|
| Document | D17 `MC11-ENVIRONMENTAL-RELIABILITY-PLAN.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 17) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `manufacturing-engineer` |
| Machine records | `data/qualification-plan.json` (45 tests), `data/evidence/manufacturing.json` |

## 0. Status and control block (binding)

```
PHYSICAL_TESTS            = NOT_EXECUTED (every test in this document)
PROTOTYPE                 = NONE EXISTS
LABORATORY                = NONE ENGAGED, NONE CONTACTED, NONE BOOKED
TEST EQUIPMENT            = NONE BOOKED, NONE PURCHASED
CERTIFICATION             = NOT_ESTABLISHED
ENVIRONMENTAL_RATING_CLAIM= PROHIBITED
CE_MARKING_CLAIM          = PROHIBITED
PILOT_SAFETY_GATE         = BLOCKED
```

**No test in this document has been executed.** There is no prototype, no first article, no sample
and no test report. No laboratory was contacted, no chamber was booked, no test slot was reserved and
no quotation was requested. Every status is `NOT_EXECUTED`; every cost is `UNKNOWN`. No IP rating, no
temperature range, no EMC result, no salt-fog class, no vibration class and no qualification claim
may be extracted from this plan. A plan is not evidence.

The single most dangerous misreading of this document would be "the product is designed to meet X".
Nothing here describes an existing product. Every requirement is a **candidate requirement** and every
acceptance criterion a **candidate target** to be frozen at design review.

---

## 1. Purpose and method

D17 defines **how** MAREA would establish, with real measurements, whether a future hardware article
survives the marine environment and the vessel DC bus. It answers research question 9 of
`MC11-RESEARCH-SCOPE.md` §2 ("which reliability/environmental requirements are likely material") and
implements acceptance-list item 11 of `MC11-BASELINE-AND-GOVERNANCE.md` §10 ("qualification and
environmental test plans present, every test `NOT_EXECUTED`").

Method rules:

1. **Requirement source hierarchy.** An official standards body or legal text, then a classification
   society, then a manufacturer datasheet, then engineering judgement. A brand reputation is not a
   source.
2. **Candidate, not adopted.** Naming a standard is not adopting it and never a compliance claim. The
   standard texts themselves were **not purchased or read** in this session (copyrighted); only the
   official catalogue metadata was retrieved and is recorded in `data/evidence/manufacturing.json`.
3. **Method before severity.** The test method comes from a standard; the severity comes from a
   product-specific requirement that does not yet exist. Severity values in this document are
   `UNKNOWN` unless a candidate is explicitly marked.
4. **No PASS from paper.** A supplier datasheet, a simulation, a catalogue "marine grade" label or a
   competitor's certificate never becomes a MAREA result.
5. **Pre-scan before accredited test.** An accredited test is expensive and slow; an engineering
   pre-scan on the first article is the rational first step for EMC and ESD.
6. **One configuration, one report.** A report on a different enclosure, harness, firmware or radio
   configuration does not qualify the shipped configuration.

---

## 2. Requirement-source landscape and the IEC 60945 question

### 2.1 Retrieved metadata (what this session actually established)

The official IEC catalogue pages were retrieved (`EVD-MC11-401…423`). The relevant facts:

| Standard | Retrieved fact | Consequence for MAREA |
|---|---|---|
| **IEC 60945:2002** (`EVD-MC11-401`) | Edition 4.0, published 2002-08-14, TC 80, 179 pages, stability date 2028; scope: *shipborne radio equipment, shipborne navigational equipment, and, for EMC only, all other bridge-mounted equipment, equipment in close proximity to receiving antennas, and equipment capable of interfering with safe navigation of the ship and with radiocommunications* | **Not mandatory** for a recreational-craft accessory; candidate robustness/method reference only (§2.2) |
| **IEC 60529** IP code (`EVD-MC11-402`) | Consolidated ed. 2.2 (1989+A1:1999+A2:2013), TC 70, applies to enclosures of electrical equipment rated ≤ 72.5 kV | Candidate requirement only; classification, never a MAREA rating until tested (§2.3) |
| **IEC 61162-1** (`EVD-MC11-411`) | 2000 edition is withdrawn (2007); the catalogue states a more recent **IEC 61162-1:2024** exists (Edition 6) | Interface standard, **not** an environmental test standard; NMEA 0183 alignment; not used here for environmental severity |
| **LR Type Approval Test Specification 1** (`EVD-MC11-418`) | Applies to electrical/control/monitoring/instrumentation/programmable electronic systems "for use in the marine environment"; published July 2024; categories of approval for differing environmental conditions | Classification-society framework for **classed vessels**; a candidate voluntary reference for categories, not applicable to recreational craft by default |
| **DNV-CG-0339:2021** (`EVD-MC11-414`) | The DNV rules server returned HTTP 200 but the PDF body extracted only trademark/cover text; the environmental test scope and severities were **NOT retrievable** | Recorded as `PARTIALLY_INACCESSIBLE`; **no DNV requirement is quoted or relied on** |
| **IEC 60068-2-52:2017** (`EVD-MC11-403`) | Salt mist, cyclic (NaCl); harmonised with ISO 9227 as far as possible; TC 104 | Candidate method for salt/corrosion |
| **ISO 9227:2022** (`EVD-MC11-412`) | NSS/AASS/CASS salt-spray apparatus and procedure; explicitly **not** for predicting long-term corrosion resistance | Candidate method; interpretation must be product-specific |
| **IEC 60068-2-30:2005** (`EVD-MC11-406`) | Damp heat cyclic 12 h + 12 h; page states a **2025 edition replaced it on 2025-08-07** | Candidate method; the 2025 edition is the current one and was not retrieved |
| **IEC 60068-2-78:2025** (`EVD-MC11-421`) | Damp heat steady state; high humidity at constant temperature **without condensation** | Candidate method for non-condensing humidity; does not replace a condensation test |
| **IEC 60068-2-14:2023** (`EVD-MC11-420`) | Change of temperature (thermal cycling) | Candidate method |
| **IEC 60068-2-5:2018** (`EVD-MC11-422`) | Simulated solar radiation; Test Sa thermal effect, Test Sb weathering | Candidate method for UV/solar load |
| **ISO 4892-2:2013** (`EVD-MC11-413`) | Xenon-arc exposure of **plastics** to reproduce weathering | Candidate material-level method; not an equipment-level test |
| **IEC 60068-2-6:2007** (`EVD-MC11-404`) | Sinusoidal vibration method | Candidate method |
| **IEC 60068-2-27:2008** (`EVD-MC11-405`) | Shock method | Candidate method |
| **IEC 61000-4-2:2008** (`EVD-MC11-407`) | ESD immunity; page states **IEC 61000-4-2:2025** replaced it (withdrawal 2025-03-07) | Candidate method; current edition not retrieved |
| **IEC 61000-4-5:2014+A1:2017** (`EVD-MC11-408`) | Surge immunity; switching and lightning transients; direct lightning strikes **not** covered | Candidate method for surge |
| **IEC 61000-4-29:2026** (`EVD-MC11-409`) | DC input voltage dips, short interruptions and voltage variations | Candidate method for DC power interruption/variation |
| **CISPR 32:2015+A1:2019** (`EVD-MC11-410`) | Emission requirements for multimedia equipment, 9 kHz–400 GHz, Class A/B | Candidate emission method; classification choice is a conformity decision, not an engineering default |
| **ISO/IEC 17025:2017** (`EVD-MC11-423`) | Competence/impartiality requirements for testing and calibration laboratories | The basis on which an "independent" laboratory is judged |
| EMC Directive 2014/30/EU page (`EVD-MC11-415`) | Equipment must comply when placed on the market; CE marking only after testing and the prescribed conformity assessment; voluntary certificates are not recognised proof | Legal frame for the EMC test route (owned by D24) |
| RED 2014/53/EU page (`EVD-MC11-416`) | Essential requirements for safety/health, EMC and spectrum; RED cybersecurity delegated act (EU) 2022/30 repealed by (EU) 2026/339 effective 2027-12-11 | Legal frame where a radio is present (owned by D24) |
| CRA pages (`EVD-MC11-417`, `EVD-MC11-419`) | Main obligations from 2027-12-11; reporting from 2026-09-11; support period must reflect expected period of use | Security/lifecycle frame, not an environmental test |

### 2.2 Does IEC 60945 genuinely apply to a MAREA product?

**Short answer: no, not as a legal requirement for the current recreational-craft market position. It
is a candidate voluntary robustness reference for test methods and severities, and it becomes
relevant only if the product is placed on a vessel to which the international conventions apply or if
a classification society requires it.**

Reasoning, on the retrieved scope text (`EVD-MC11-401`) and the program's recorded market position:

1. **Its own scope is shipborne equipment.** The retrieved page lists *shipborne radio equipment,
   shipborne navigational equipment*, and for EMC only *other bridge-mounted equipment, equipment in
   close proximity to receiving antennas, and equipment capable of interfering with safe navigation*.
   MAREA's recorded target is recreational craft, not SOLAS/IMO ships.
2. **No carriage obligation exists for a recreational accessory.** Nothing in the retrieved text
   imposes IEC 60945 on a product that is not required equipment. Naming it as "the marine standard"
   would be rhetoric, not applicability.
3. **The MED is not automatically engaged.** `HARDWARE-COMPLIANCE-MATRIX.md` C-09 records
   `MED = NOT_APPLICABLE_WITH_EXPLANATION` for all nine families **for the recreational target
   market**, and the transposed Spanish rules were not verified for these items. D24 §4 states the
   same discipline: IEC 60945 is "not mandatory for a recreational-craft accessory… its scope is ship
   equipment… never cite it as a legal requirement, never claim compliance".
4. **A classification society is not involved.** No class rules apply to an unclassed recreational
   craft. LR Type Approval Test Specification 1 (`EVD-MC11-418`) is a classed-vessel framework and a
   candidate voluntary reference at most; DNV-CG-0339 could not be read (`EVD-MC11-414`).
5. **What it is genuinely useful for.** Its published methods and environmental classes are a
   pragmatic, marine-aware starting point for severities that plain industrial standards do not
   provide (salt atmosphere, humidity/condensation, vibration, EMC in a bridge environment). Using it
   **voluntarily as a method reference** is legitimate engineering. Using it as a claim is prohibited.
6. **If the market position changes** — professional/commercial vessels, a classification-society
   customer, or a product marketed as required navigation equipment — applicability must be
   re-assessed by the conformity workstream and qualified review. That is an **open question**, not a
   settled fact. `LEGAL_REVIEW_REQUIRED`.

**Therefore:** in this plan, IEC 60945 appears as a **candidate method reference** with an explicit
"voluntary only" note; it is never the sole requirement source for an acceptance criterion, and no
document may say "IEC 60945 compliant" until a real test report on the actual configuration exists.

### 2.3 IEC 60529 as a candidate requirement only

`EVD-MC11-402` establishes only that IEC 60529 classifies enclosure protection according to an IP
code. It does **not** establish any level for a MAREA product. Three engineering points that prevent
misuse:

1. **An IP rating is a classification of a tested enclosure, not of a design intent.** Testing an
   empty purchased enclosure says nothing about the assembled unit with its cable glands, connectors,
   service opening and gasket compression.
2. **IP does not cover condensation.** The second digit addresses water ingress (dripping, spraying,
   jets, immersion), not internal condensation from overnight cooling; a condensation plan needs damp
   heat/thermal cycling, not an IP test.
3. **The second digit is not "waterproof".** IPX5/IPX6 (jets) and IPX7/IPX8 (immersion) are
   different tests with different meanings; IPX4 is splash. Choosing a digit before the installation
   is defined would be arbitrary.

**Therefore:** "IP rating" appears only as `CANDIDATE_REQUIREMENT` with the target digit left
`UNKNOWN`; no IP claim is made anywhere, and no product copy may state an IP number until a test
report on the final assembly exists.

---

## 3. Master qualification test plan

Severity values are `UNKNOWN` unless marked. "Candidate source" means the standard's **method** is
candidate material; it is not a legal requirement and not a compliance claim. Every row is
`NOT_EXECUTED`.

**Identifier note (important for traceability).** The `PHEN-##` labels in this section identify a
**phenomenon**, not an executable test. The executable rows are the family test IDs
`QUAL-<FAMILY>-##` in `data/qualification-plan.json` (45 rows, every one `NOT_EXECUTED`); §3.6 maps
each phenomenon to the plan rows that implement it. This avoids inventing a second test-ID namespace.

### 3.1 EMC and electrical stress

| ID | Test | Candidate requirement source | Proposed acceptance criterion (candidate) | Method | Equipment | Indep. lab | Prototype | Cost evidence | Responsible | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| PHEN-01 | EMC emissions — conducted 150 kHz–30 MHz and radiated 30 MHz–6 GHz | CISPR 32 Class A/B (`EVD-MC11-410`); EMC Directive 2014/30/EU (`EVD-MC11-415`); IEC 60945 EMC provisions as voluntary method reference (`EVD-MC11-401`) | No emission above the chosen limit with margin defined at design review; no configuration-dependent exceedance | Accredited emissions test; pre-scan first | LISN, EMI receiver, antennas, semi-anechoic chamber | **Yes** | Yes | `UNKNOWN` (no lab quote) | Accredited EMC laboratory (not engaged) + MAREA design | `NOT_EXECUTED` |
| PHEN-02 | EMC immunity — radiated and conducted RF, EFT, surge, dips (combined campaign) | IEC 61000-4-3/-4/-6 candidate methods (pages not retrieved); IEC 61000-4-5 (`EVD-MC11-408`); IEC 61000-4-29 (`EVD-MC11-409`); CISPR 32 framework (`EVD-MC11-410`) | No reset, latch-up, corruption or unsafe behaviour at the agreed levels; performance criterion defined per function at design review | Accredited immunity campaign | RF amplifiers, antennas, EFT generator, coupling networks, transient generator | **Yes** | Yes | `UNKNOWN` | Accredited EMC laboratory + MAREA | `NOT_EXECUTED` |
| PHEN-03 | ESD immunity — contact and air discharge on connectors, front surface, antenna ports | IEC 61000-4-2:2008 (`EVD-MC11-407`); current edition 2025 noted | No permanent damage; no reset that loses data or enters an unsafe state; recoverable upset only | ESD generator, contact/air discharges, pre-scan then accredited | ESD simulator, test setup, ground reference plane | **Yes** (accredited); pre-test in-house allowed | Yes | `UNKNOWN` | MAREA bench (pre-test) + accredited lab | `NOT_EXECUTED` |
| PHEN-04 | Surge / transient immunity — DC input and field interfaces (load-dump-style, switching transients) | IEC 61000-4-5 (`EVD-MC11-408`); IMO/ISO 7637-2 as a **named candidate practice** for a 12 V bus (page not retrieved, applicability to be confirmed); IEC 60945 voluntary method reference (`EVD-MC11-401`) | No permanent damage; defined recovery; no unsafe reset loop; no propagation from one interface to another | Surge generator, coupling/decoupling network; interface fault injection | Combination-wave generator, CDN, fault harness | **Yes** | Yes | `UNKNOWN` | Accredited lab + MAREA | `NOT_EXECUTED` |
| PHEN-05 | Power interruption and brownout — DC input dips, short interruptions, cranking profile | IEC 61000-4-29:2026 (`EVD-MC11-409`); IEC 61000-4-11 as AC-only candidate (page not retrieved); IEC 60945 voluntary reference (`EVD-MC11-401`) | Defined safe restart; no storage corruption; no fabricated value; no unsafe state; recovery time within a design-review target | Programmable DC source with dip/interruption profiles; repeated cycling | Programmable PSU, electronic load, current probe, scope | No (bench); **Yes** for formal conformity evidence | Yes | `UNKNOWN` | MAREA test engineering (not engaged) | `NOT_EXECUTED` |
| PHEN-06 | Voltage variation — full candidate window, reverse polarity, overvoltage, cranking dip | D5 §1 candidate window (10.5–15.0 V / 21.0–30.0 V, 9–32 V candidate input); IEC 61000-4-29 (`EVD-MC11-409`); IEC 60945 voluntary reference (`EVD-MC11-401`) | No damage across the agreed window; predictable degradation outside it; reverse polarity survives without fire/smoke; recovery on correction | Programmable source sweep; reverse-polarity test with current limit | Programmable PSU, electronic load, DMM, thermal camera | No (bench) | Yes | `UNKNOWN` | MAREA test engineering | `NOT_EXECUTED` |

**Specific to a radio configuration (any family that integrates Wi-Fi/BLE/cellular/AIS receiver):**

| ID | Test | Candidate requirement source | Acceptance criterion (candidate) | Method | Equipment | Indep. lab | Prototype | Cost evidence | Responsible | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| PHEN-07 | Radio EMC and receiver performance — spurious emissions, sensitivity, blocking, selectivity (AIS receive-only; WATCH cellular) | RED 2014/53/EU essential requirements (`EVD-MC11-416`); radio EMC EN 301 489-1 series as **named candidate** (page not retrieved); service standards EN 300 328 / EN 301 908 as named candidates (pages not retrieved); CISPR 32 for unintentional emissions (`EVD-MC11-410`) | Receiver meets the agreed sensitivity/selectivity/spurious envelope; the radio does not degrade the function it serves; no out-of-band emission above the chosen limit | Conducted RF bench, then accredited radio test; reference receiver comparison | Spectrum analyser, signal generator, shielded box, antenna | **Yes** | Yes | `UNKNOWN` | Accredited RF laboratory + MAREA RF design | `NOT_EXECUTED` |

### 3.2 Climatic

| ID | Test | Candidate requirement source | Acceptance criterion (candidate) | Method | Equipment | Indep. lab | Prototype | Cost evidence | Responsible | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| PHEN-08 | Operating temperature — hot and cold operational extremes | IEC 60068-2-1/2-2 named candidate (pages not retrieved); IEC 60945 voluntary environmental classes (`EVD-MC11-401`); D5 §1 | Declared functions operate within the agreed envelope; no unsafe state; honest thermal state; no claim above the tested envelope | Climatic chamber, functional monitoring at temperature | Climatic chamber with feed-throughs, instruments | **Yes** | Yes | `UNKNOWN` | Accredited environmental lab + MAREA | `NOT_EXECUTED` |
| PHEN-09 | Storage temperature — non-operating hot/cold | IEC 60068-2-1/2-2 named candidates; IEC 60068-2-14 (`EVD-MC11-420`) recovery | No permanent damage or performance loss after storage and recovery | Chamber, storage soak, post-test functional test | Climatic chamber, post-test FCT | **Yes** | Yes | `UNKNOWN` | Accredited environmental lab | `NOT_EXECUTED` |
| PHEN-10 | Thermal cycling | IEC 60068-2-14:2023 (`EVD-MC11-420`) | No solder-joint cracking, seal failure, delamination or calibration shift beyond the agreed limit | Air-to-air thermal cycling, functional check at extremes and after | Thermal cycling chamber | **Yes** | Yes | `UNKNOWN` | Accredited environmental lab | `NOT_EXECUTED` |
| PHEN-11 | Damp heat — steady state, non-condensing | IEC 60068-2-78:2025 (`EVD-MC11-421`) | No insulation-resistance failure, corrosion or parameter drift beyond the agreed limit | Steady-state humidity chamber | Humidity chamber | **Yes** | Yes | `UNKNOWN` | Accredited environmental lab | `NOT_EXECUTED` |
| PHEN-12 | Damp heat — cyclic and condensation | IEC 60068-2-30 (2005, superseded by 2025 edition per `EVD-MC11-406`); IEC 60068-2-38 as named candidate | No condensation-induced leakage, corrosion or functional failure; recovery after condensation cycles | Cyclic humidity/temperature chamber with condensation | Cyclic chamber | **Yes** | Yes | `UNKNOWN` | Accredited environmental lab | `NOT_EXECUTED` |
| PHEN-13 | Solar/UV exposure and solar thermal load (DISPLAY front, enclosure/bezel) | IEC 60068-2-5:2018 (`EVD-MC11-422`); ISO 4892-2:2013 for plastics (`EVD-MC11-413`) | No crazing, colour shift, seal degradation or delamination beyond the agreed limit; thermal load does not cause unsafe state | Solar simulation; material coupons for UV | Solar simulator, UV chamber, colour/gloss measurement | **Yes** | Yes | `UNKNOWN` | Accredited lab + MAREA materials | `NOT_EXECUTED` |

### 3.3 Mechanical

| ID | Test | Candidate requirement source | Acceptance criterion (candidate) | Method | Equipment | Indep. lab | Prototype | Cost evidence | Responsible | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| PHEN-14 | Vibration — sinusoidal sweep and endurance (installed orientation) | IEC 60068-2-6:2007 (`EVD-MC11-404`); IEC 60945 voluntary classes (`EVD-MC11-401`); LR Test Specification 1 categories as voluntary reference (`EVD-MC11-418`) | No mechanical damage, connector disengagement, solder-joint failure or functional interruption; post-test function passes | Electrodynamic shaker, installed mounting fixture | Vibration shaker, accelerometers, monitoring | **Yes** | Yes | `UNKNOWN` | Accredited mechanical lab | `NOT_EXECUTED` |
| PHEN-15 | Mechanical shock — handling, mounting, accidental impact | IEC 60068-2-27:2008 (`EVD-MC11-405`); IEC 60068-2-31/2-32 rough-handling named candidates | No damage, no loss of function; enclosure remains sealed | Shock machine / drop test per the chosen method | Shock tester | **Yes** | Yes | `UNKNOWN` | Accredited mechanical lab | `NOT_EXECUTED` |
| PHEN-16 | Cable strain and connector retention — pull, torsion, repeated flex | Internal candidate requirement (no retrieved standard for this exact case); cable-length limits are `UNKNOWN` (D8 §3.5) | Connector retains contact; no damage to PCB pad or enclosure; no intermittent open | Tensile/torsion rig with defined force and cycles | Force gauge, cycle rig | No (in-house possible); **Yes** for certification evidence | Yes | `UNKNOWN` | MAREA test engineering | `NOT_EXECUTED` |
| PHEN-17 | Connector degradation — mating cycles, corrosion after salt exposure, contact resistance | Internal candidate requirement; IEC 60512 series named candidate (pages not retrieved); ISO 9227 (`EVD-MC11-412`) | Contact resistance within the agreed limit after the agreed mating cycles and exposure; no intermittency | Repeated mating, salt exposure, millivolt-drop measurement | Mating rig, micro-ohmmeter, salt chamber | **Yes** | Yes | `UNKNOWN` | Accredited lab + MAREA component engineering | `NOT_EXECUTED` |

### 3.4 Marine-specific

| ID | Test | Candidate requirement source | Acceptance criterion (candidate) | Method | Equipment | Indep. lab | Prototype | Cost evidence | Responsible | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| PHEN-18 | Water ingress — jets and/or immersion per the chosen digit | IEC 60529 (`EVD-MC11-402`) as **candidate requirement only** | No water entry that impairs function or safety; no standing water at connectors; test on the **final assembly** | IPX5/IPX6 jet or IPX7/IPX8 immersion test, chosen after installation analysis | Ingress test rig, spray nozzles, immersion tank | **Yes** | Yes | `UNKNOWN` | Accredited ingress lab | `NOT_EXECUTED` |
| PHEN-19 | Salt fog / corrosion — enclosure, bezel, fasteners, connectors, antenna hardware | IEC 60068-2-52:2017 (`EVD-MC11-403`); ISO 9227:2022 (`EVD-MC11-412`) | No corrosion affecting function, sealing or connector resistance; no fastener seizure; documented inspection criteria | Cyclic salt-mist test; post-test function and inspection | Salt-spray/cyclic corrosion chamber | **Yes** | Yes | `UNKNOWN` | Accredited corrosion lab | `NOT_EXECUTED` |
| PHEN-20 | Long-duration operation — continuous soak with periodic power cycles | Internal candidate requirement (no single standard); IEC 60068-2-78 as environmental background (`EVD-MC11-421`) | No memory leak, watchdog reset storm, thermal runaway, storage wear-out or drift beyond the agreed limit over the agreed duration | 7-day-class continuous operation with monitored health and power cycles | Environmental/bench chamber, monitoring rig, power cycler | No (bench); sample size defined at design review | Yes | `UNKNOWN` | MAREA test engineering | `NOT_EXECUTED` |

### 3.5 Marine installation and in-situ tests

| ID | Test | Candidate requirement source | Acceptance criterion (candidate) | Method | Equipment | Indep. lab | Prototype | Cost evidence | Responsible | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| PHEN-21 | Marine installation — ground-loop, common-mode injection on serial/Ethernet, cable-length/noise characterisation | IEC 60945 voluntary method reference (`EVD-MC11-401`); internal candidate requirement; D5 §8 | No data corruption or damage under common-mode injection; documented maximum cable lengths; no ground-loop-induced reset | Common-mode injection network, long-cable test, reference instrument | Injection network, cable drums, instruments | **Yes** (or witnessed) | Yes | `UNKNOWN` | MAREA + accredited lab | `NOT_EXECUTED` |
| PHEN-22 | In-situ sensor installation — cable length, noise, calibration stability in the compartment | Internal candidate requirement; D8 §3.5; IEC 60945 voluntary reference (`EVD-MC11-401`) | Measurement stable within the agreed limit at the documented maximum cable length; no pump/inverter noise-induced error; calibration state honest | Installed-representative harness, noise injection, reference comparison | Noise source, reference meter, harness | No (in-house/field) | Yes | `UNKNOWN` | MAREA field test | `NOT_EXECUTED` |
| PHEN-23 | AIS antenna/splitter installation — reception quality and non-degradation of the vessel VHF | ITU-R M.1371 named candidate (page not retrieved); D9 §1.3; internal candidate requirement | Receiver meets the agreed reception envelope; the splitter does not degrade the vessel's required VHF radio beyond the agreed limit | Reference-receiver comparison, splitter insertion loss, dockside test | Reference receiver, VNA, RF power meter | **Yes** | Yes | `UNKNOWN` | MAREA + RF lab | `NOT_EXECUTED` |

### 3.6 Phenomenon → executable plan-test mapping

| Phenomenon | Plan test rows in `data/qualification-plan.json` |
|---|---|
| PHEN-01 EMC emissions | QUAL-HUB-01, QUAL-AIS-01, QUAL-WATCH-01, QUAL-SENSE-01, QUAL-DISPLAY-01, QUAL-PILOT-01 |
| PHEN-02 EMC immunity | QUAL-HUB-02, QUAL-AIS-02, QUAL-WATCH-02, QUAL-SENSE-02, QUAL-DISPLAY-02, QUAL-PILOT-02 |
| PHEN-03 ESD | QUAL-HUB-03, QUAL-AIS-03, QUAL-WATCH-03, QUAL-SENSE-03, QUAL-DISPLAY-03, QUAL-PILOT-03 |
| PHEN-04 Surge / transient immunity | QUAL-HUB-04, QUAL-AIS-04, QUAL-WATCH-04, QUAL-SENSE-04, QUAL-DISPLAY-04 |
| PHEN-05 Power interruption / brownout | QUAL-HUB-10 |
| PHEN-06 Voltage variation | QUAL-HUB-10 |
| PHEN-07 Radio EMC and receiver performance | QUAL-AIS-07 (AIS receiver), QUAL-WATCH-01/-02 (cellular radio aspects), QUAL-DISPLAY-01 (radio if fitted) |
| PHEN-08 Operating temperature | QUAL-HUB-08, QUAL-WATCH-07, QUAL-DISPLAY-08 |
| PHEN-09 Storage temperature | QUAL-HUB-08, QUAL-WATCH-07 |
| PHEN-10 Thermal cycling | QUAL-HUB-08, QUAL-WATCH-07, QUAL-DISPLAY-08, QUAL-PILOT-04 |
| PHEN-11 Damp heat, steady state | QUAL-HUB-07 |
| PHEN-12 Damp heat, cyclic / condensation | QUAL-HUB-07, QUAL-DISPLAY-07 |
| PHEN-13 UV / solar radiation | QUAL-DISPLAY-07 |
| PHEN-14 Vibration | QUAL-HUB-09, QUAL-SENSE-06, QUAL-DISPLAY-08 |
| PHEN-15 Mechanical shock | QUAL-HUB-09, QUAL-SENSE-06 |
| PHEN-16 Cable strain and connector retention | No dedicated row in the 45-test matrix yet. Covered in principle by the mechanical tests (QUAL-HUB-09, QUAL-SENSE-06) and by the D16 assembly/strain-relief requirements; a dedicated pull/torsion test must be added when the harness design exists. **Still `NOT_EXECUTED`.** |
| PHEN-17 Connector degradation | No dedicated row in the 45-test matrix yet. Partially probed by the salt tests (QUAL-HUB-06, QUAL-AIS-06, QUAL-WATCH-06, QUAL-SENSE-05, QUAL-DISPLAY-06); a dedicated mating-cycle/contact-resistance test must be added when connectors are selected. **Still `NOT_EXECUTED`.** |
| PHEN-18 Water ingress | QUAL-HUB-05, QUAL-AIS-05, QUAL-WATCH-05, QUAL-SENSE-05, QUAL-DISPLAY-05, QUAL-PILOT-04 |
| PHEN-19 Salt fog / corrosion | QUAL-HUB-06, QUAL-AIS-06, QUAL-WATCH-06, QUAL-SENSE-05, QUAL-DISPLAY-06, QUAL-PILOT-04 |
| PHEN-20 Long-duration operation | QUAL-WATCH-08 |
| PHEN-21 Marine installation / ground loop | QUAL-SENSE-07 |
| PHEN-22 In-situ sensor installation | QUAL-SENSE-07 |
| PHEN-23 AIS antenna/splitter installation | QUAL-AIS-08 |

---

## 4. Phenomenon coverage map (the mandated list)

Every phenomenon required by the MC-11 brief is covered by at least one phenomenon row above and
mapped to executable plan rows in §3.6. No phenomenon is silently dropped, and no phenomenon has a
result. PHEN-16 and PHEN-17 currently have no dedicated row in the 45-test matrix; that gap is stated
explicitly rather than hidden, and it remains `NOT_EXECUTED`.

| Required phenomenon | Tests | Coverage note |
|---|---|---|
| EMC emissions | PHEN-01, -07 | Unintentional emissions + radio emissions |
| EMC immunity | PHEN-02 | Radiated/conducted/EFT/surge combined campaign |
| ESD | PHEN-03 | Connectors, front surface, antenna ports |
| Transient immunity | PHEN-04 | Surge/load-dump-style; interface fault injection |
| Salt / corrosion | PHEN-19 | Enclosure, bezel, fasteners, connectors |
| Humidity | PHEN-11, -12 | Steady-state and cyclic |
| Condensation | PHEN-12 | Cyclic damp heat with condensation; IP does not cover it |
| Operating temperature | PHEN-08 | Functional at extremes |
| Storage temperature | PHEN-09 | Non-operating + recovery |
| Vibration | PHEN-14 | Sinusoidal, installed orientation |
| Mechanical shock | PHEN-15 | Handling and mounting |
| Water ingress | PHEN-18 | IP test on final assembly |
| UV | PHEN-13 | Solar simulation + material coupons |
| Connector degradation | PHEN-17 | Mating cycles + corrosion + contact resistance |
| Cable strain | PHEN-16 | Pull/torsion/flex |
| Thermal cycling | PHEN-10 | Air-to-air |
| Power interruption | PHEN-05 | Dips, interruptions, cranking |
| Voltage variation | PHEN-06 | Window, reverse polarity, overvoltage |
| Long-duration operation | PHEN-20 | Continuous soak with power cycles |
| Marine-specific installation | PHEN-21, -22, -23 | Ground loop, in-situ cable/noise, AIS antenna/splitter |

---

## 5. Per-family qualification emphasis

No family has an article. The emphasis below is the **engineering priority** for a future programme,
not a claim that any family is closer to qualification.

| Family | Highest-risk phenomena | Plan tests that matter first | Family-specific note |
|---|---|---|---|
| **HUB** | EMC emissions/immunity; thermal in a closed locker; power interruption/load dump; ingress; vibration | QUAL-HUB-01, -02, -04, -08, -09, -10, -05, -06 | Permanent 24/7 load; must survive a dirty shared DC bus and never fabricate data after a reset |
| **AIS** | RF receiver performance and spurious response; antenna/splitter installation; ESD/surge on the antenna path; ingress at the antenna connector | QUAL-AIS-07, -03, -04, -05, -08 | A noisy local device degrades the weak-signal function it exists to provide |
| **WATCH** | Quiescent drain and modem duty cycle; thermal in a locker; humidity/condensation; cellular RF; long-duration soak | QUAL-WATCH-08, -07, -01, -02, -05 | Must not drain the battery it monitors; drain measurement is a first-order acceptance test, not an optimisation |
| **SENSE** | Salt/condensation in engine spaces and bilges; connector corrosion; cable length/noise; calibration drift; water ingress | QUAL-SENSE-05, -06, -07, -02, -04 | A sensor module in a wet compartment is a different environmental class from a cabin device |
| **DISPLAY** | Solar thermal load and UV; thermal shutdown; ingress; vibration; touch/optical-bond delamination | QUAL-DISPLAY-07, -08, -05, -06, -01 | The helm is the harshest location: sun load, spray, vibration and a hot enclosure |
| **PILOT** | Motor-drive EMC; thermal; ingress; safety-function evidence | **BLOCKED** | `PILOT_SAFETY_GATE = BLOCKED`: no actuator, motor or steering design exists. Environmental tests cannot be meaningfully defined before a safety concept and a design exist; rows in `qualification-plan.json` are placeholders only and authorise nothing |

---

## 6. Test sequencing and gate logic

```
D1  Requirement freeze (envelope, install classes, radio set)         [NOT_DONE]
D2  First article built and instrumented                              [NO ARTICLE]
P1  Engineering pre-scan: EMC/ESD/thermal/vibration survey            [NOT_EXECUTED]
P2  Design fixes from pre-scan                                        [NOT_STARTED]
Q1  Accredited EMC + safety campaign on a frozen configuration         [NOT_EXECUTED]
Q2  Accredited environmental campaign (climatic + mechanical)          [NOT_EXECUTED]
Q3  Marine-specific campaigns (ingress, salt, in-situ install)         [NOT_EXECUTED]
Q4  Reliability/endurance and long-duration soak                       [NOT_EXECUTED]
R1  Test reports reviewed; claims register updated only from reports   [NO REPORTS]
G6  Conformity evaluation (D24)                                        [NOT_STARTED]
```

**Rule:** a design change after an accredited test invalidates the test for the changed configuration
unless the change is formally assessed as not affecting the result. This is why the configuration
must be frozen before Q1.

---

## 7. Prototype and sample definition

There is no prototype. For a future programme, "prototype" for qualification means:

- an article built from the **intended production process and materials** (not a development board),
- with the **intended enclosure, gasket, connectors and harness**,
- running the **intended firmware configuration** (or a documented qualification build),
- serialised and with its build record,
- in sufficient quantity to cover destructive tests (ingress, salt, some mechanical tests destroy the
  article) plus functional tests.

A development board, a breadboard, a 3D-printed shell or a mock-up is **not** a qualification
prototype. Sample size per test is `UNKNOWN` and must be agreed with the laboratory; at minimum, one
article per destructive test and one retained reference article are the engineering expectation, but
this is not yet a requirement.

---

## 8. Equipment and independent-laboratory requirement

| Capability | In-house candidate | Independent accredited laboratory | Why |
|---|---|---|---|
| EMC emissions/immunity | pre-scan only | **required** | The conformity route (D24) needs accredited reports; a pre-scan is engineering risk reduction only |
| ESD | pre-test | **required** | Accredited report for the EMC file |
| Surge/transient | bench | **required** for the formal campaign | Generator calibration and reproducibility |
| Climatic chambers | no | **required** | Accredited temperature/humidity/thermal-cycling reports |
| Vibration/shock | no | **required** | Shaker and calibration |
| Ingress IP | no | **required** | Accredited IP test; the rating is only valid from a test report |
| Salt/corrosion | no | **required** | Chamber and interpretation |
| UV/solar | no | **required** | Solar simulator and measurement |
| Long-duration soak | yes (bench) | not required | Engineering evidence, not a conformity test by itself |
| In-situ installation | yes (field) | not required | Field/vessel evidence; import into the technical file as supporting evidence |

**What "independent" means.** `ISO/IEC 17025:2017` (`EVD-MC11-423`) sets competence and impartiality
requirements; accreditation bodies use it as the assessment criterion. "We sent it to a lab" is not
the same as "an accredited laboratory issued a report whose scope covers this test". The conformity
workstream must verify accreditation scope, not just the logo. **No laboratory was contacted; no
accreditation status was verified.**

---

## 9. Cost evidence state

| Cost element | Status | Note |
|---|---|---|
| EMC pre-scan | `UNKNOWN` | No lab contacted |
| Accredited EMC emissions + immunity | `UNKNOWN` | No quote |
| ESD | `UNKNOWN` | No quote |
| Surge/transient | `UNKNOWN` | No quote |
| Climatic (temperature/humidity/thermal cycling) | `UNKNOWN` | No quote |
| Vibration/shock | `UNKNOWN` | No quote |
| Ingress (IP) | `UNKNOWN` | No quote |
| Salt fog/corrosion | `UNKNOWN` | No quote |
| UV/solar | `UNKNOWN` | No quote |
| Radio (RF/receiver) | `UNKNOWN` | No quote |
| Test-fixture and harness cost | `UNKNOWN` | No design |
| Retest budget after failures | `UNKNOWN` | Not modelled |
| Travel/shipping of articles | `UNKNOWN` | Not modelled |
| Certification/notified body | `UNKNOWN` | D24 owns; no quote |

**No public laboratory price was observed in this session.** Every `estimatedCost` in
`qualification-plan.json` is therefore `{ "status": "UNKNOWN", "amountEur": null }`. A
`BUDGETARY_INDICATION` would require an actually observed public price; none exists. The cost model
must carry qualifications as a separate, non-zero, `UNKNOWN` category — never as "included".

**What a usable quotation must contain** (for a future authorised enquiry): accreditation body and
scope; exact standard edition and clauses; configuration of the article; test duration and lead time;
number of samples; pre-scan vs accredited; report format; retest policy and cost; shipping and
handling; VAT treatment; validity period; and whether witnessed testing is included. None has been
requested.

---

## 10. What would falsify the design — explicit falsification list

A qualification result falsifies a design assumption when it contradicts it, not when it is merely
inconvenient. The following are the concrete results that would force a design change, delay or
cancel. Each is a test that does not exist yet.

| # | Falsifier result | What it would falsify | Consequence |
|---|---|---|---|
| F1 | Radiated or conducted emissions exceed the chosen limit after pre-scan fixes | "The enclosure, filtering and grounding are adequate" | Shielding/filter/layout redesign, retest |
| F2 | Radiated RF immunity causes a reset, data corruption or unsafe state | "The product can share a helm with a handheld VHF transmitter" | Layout/filtering/supervisor redesign |
| F3 | ESD on a user connector or front surface causes latch-up or permanent damage | "The ESD protection is adequate" | Protection component/layout redesign |
| F4 | Surge or load-dump-style transient destroys the input stage or the isolated interface | "The power and isolation protection is adequate" | Protection/isolation redesign |
| F5 | Radio receiver sensitivity/selectivity is inadequate in the presence of the device's own emissions | "The receiver can do its job inside this enclosure" | RF front-end/filtering/antenna redesign |
| F6 | Water ingress occurs at a gasket, cable gland or connector under the chosen IP test | "The enclosure is sealed for the installation class" | Enclosure/tooling redesign |
| F7 | Salt fog corrodes a connector, fastener or bezel enough to impair function | "The materials and plating are adequate for a salt atmosphere" | Material/plating/connector change |
| F8 | Damp heat or condensation produces leakage, corrosion or parameter drift | "The coating and breathing strategy is adequate" | Coating/enclosure climate design change |
| F9 | The device throttles, shuts down or exceeds its internal limit in a hot helm or locker | "The thermal design covers the installed environment" | Thermal/mechanical redesign; honest derating |
| F10 | Cold start fails below the candidate envelope | "The declared operating envelope is achievable" | Component/panel/heater change |
| F11 | Thermal cycling cracks a solder joint, delaminates an optical bond or shifts calibration | "The assembly survives daily thermal swings" | Solder/underfill/bonding redesign |
| F12 | Vibration loosens a connector, cracks a joint or interrupts operation | "The mounting and strain relief are adequate" | Mechanical redesign |
| F13 | Shock damages the display, antenna or enclosure | "The product survives handling and accidental impact" | Mechanical redesign |
| F14 | UV/solar exposure crazes the bezel, degrades the seal or shifts colour | "The front-surface materials are UV-stable" | Material change |
| F15 | Connector contact resistance rises after mating cycles or corrosion | "The connector family is adequate for the service life" | Connector change |
| F16 | Cable strain damages a pad or pulls a connector loose | "The cable retention is adequate" | Strain relief/connector change |
| F17 | A power interruption during a storage write corrupts data or bricks an update | "The storage and update design is power-loss-safe" | Storage/update/journaling redesign |
| F18 | A voltage excursion (overvoltage, reverse polarity, cranking) causes an unsafe state or damage | "The input protection covers the real bus" | Power architecture redesign |
| F19 | Long-duration soak reveals a memory leak, watchdog storm, drift or storage wear | "The firmware is stable for unattended operation" | Firmware/storage redesign |
| F20 | Marine ground-loop/common-mode injection corrupts serial/Ethernet data | "The isolation and grounding strategy is adequate" | Isolation/grounding redesign |
| F21 | In-situ cable length/noise causes measurement error beyond the agreed limit | "The documented cable limits are usable" | Front-end/filtering/cable-limit change |
| F22 | The AIS antenna/splitter degrades the vessel's required VHF radio | "The installation is safe for the vessel's radiocommunication" | Splitter/installation redesign or withdrawal |
| F23 | WATCH quiescent/average drain materially flattens the monitored battery | "The monitoring device does not harm the battery it monitors" | Power architecture/modem duty-cycle redesign |
| F24 | Calibration drifts beyond the agreed limit between service intervals | "The measurement can be trusted between calibrations" | Sensor/calibration/enclosure redesign |
| F25 | The test article cannot be produced reproducibly (batch variation) | "The manufacturing route delivers consistent units" | Process/route change |

**A failed test is a result, not a reason to lower the requirement.** The requirement may only change
through a documented decision with a rationale, and the product claim must then match the new
evidence — never the old intent.

---

## 11. Reporting and claim discipline

1. Every test report must name the article serial, configuration, firmware version, standard edition,
   clause, severity, result and deviations.
2. Only an executed, recorded test on the actual configuration may update the claims register.
3. A `NOT_EXECUTED` test never becomes "likely to pass"; an untested product has no rating.
4. A single passing unit is not a qualification of a population; sample size and acceptance logic must
   be agreed before the test.
5. A retest after a design change applies to the changed configuration only.
6. No document, page, price list or datasheet may state an IP number, temperature range, EMC result,
   salt-fog class, vibration class or "marine grade" claim until the corresponding report exists.
   `ENVIRONMENTAL_RATING_CLAIM = PROHIBITED` is enforced by the validator (V35).

---

## 12. Relationship to other deliverables

| Item | Relationship |
|---|---|
| D16 DFM/DFT/quality | Produces the serialised, tested, traceable articles this plan consumes |
| D18 service/warranty/RMA | Field failures feed the failure taxonomy; warranty evidence depends on qualification |
| D24 CE/EMC/RED roadmap | Owns the legal conformity route and the notified-body decision; D17 supplies candidate methods |
| D5 marine electrical architecture | Supplies the candidate voltage window, transient rationale and isolation requirements tested here |
| D4/D7/D8/D9 architecture | Supply the candidate product configurations and the risks each test must probe |
| Gates G2–G5 | No lab engagement, article build or test execution is authorised |

---

## 13. Explicit control statements

```
PHYSICAL_TESTS           = NOT_EXECUTED (all 23 phenomena in this plan; 45 plan tests)
TEST_LAB_CONTACTED       = NONE
TEST_EQUIPMENT_BOOKED    = NONE
TEST_QUOTATION_OBTAINED  = NONE
PROTOTYPE                = NONE
FIRST_ARTICLE            = NONE
TEST_REPORT              = NONE
ENVIRONMENTAL_RATING     = NOT_ESTABLISHED
IEC_60945_COMPLIANCE     = NOT_CLAIMED / NOT_APPLICABLE_AS_LEGAL_REQUIREMENT
IEC_60529_IP_RATING      = NOT_CLAIMED / CANDIDATE_REQUIREMENT_ONLY
```

Every test in this document and in `data/qualification-plan.json` is `NOT_EXECUTED`. No result,
rating or compliance statement exists.
