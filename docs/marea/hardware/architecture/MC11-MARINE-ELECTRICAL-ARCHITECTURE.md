# MC-11 — Marine electrical architecture (D5)

| Field | Value |
|---|---|
| Document | D5 `MC11-MARINE-ELECTRICAL-ARCHITECTURE.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 5) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `hw-architect` |
| Related records | `data/hardware-families.json`, `data/compatibility-requirements.json`, `data/architecture-options.json` |

**Evidence states.** No article exists, no test was executed, no laboratory or vessel was used, no
supplier was contacted and no certification was obtained. Every electrical value below is one of:
`CANDIDATE_REQUIREMENT` (an engineering target that the design must meet), `ENGINEERING_ASSUMPTION`
(stated, unverified), or `UNKNOWN`/`NOT_MEASURED`. **No number in this document is a measured tolerance,
a validated rating, a compliance level or a certification claim.** `CE_MARKING_CLAIM = PROHIBITED`,
`ENVIRONMENTAL_RATING_CLAIM = PROHIBITED`. This document authorises nothing.

`PILOT_SAFETY_GATE = BLOCKED`: the PILOT sections describe only why a power architecture for a steering
system cannot be treated as an ordinary appliance design. **No actuator, motor-control or steering
output is designed or authorised here.**

---

## 1. The marine DC environment — candidate requirements, not measured tolerances

A recreational vessel's 12 V or 24 V DC system is not a clean laboratory supply: it is a battery bus
shared with alternators, chargers, inverters, pumps, winches, refrigerators and navigation lights, with
cabling that may be long, thin or undocumented. The values below are **candidate requirements** derived
from established marine practice and engineering judgement. None was measured on a MAREA article and
none substitutes for a real transient survey on representative vessels.

| Parameter | 12 V system (candidate) | 24 V system (candidate) | Status |
|---|---|---|---|
| Nominal battery voltage | 12.0 V (6-cell lead-acid) | 24.0 V (12-cell) | `CANDIDATE_REQUIREMENT` |
| Normal operating window | 10.5–15.0 V | 21.0–30.0 V | `CANDIDATE_REQUIREMENT` |
| Charging window (alternator/charger) | up to ~14.8 V (some chargers/equalisation higher) | up to ~29.6 V | `CANDIDATE_REQUIREMENT`; exact charger profiles unknown |
| Cranking dip | down to ~6 V for tens of milliseconds (engine start) | ~12 V | `ENGINEERING_ASSUMPTION`; must be measured per installation |
| Load-dump / inductive transient | positive and negative excursions well outside the charging window | proportionally higher | `UNKNOWN` — no measurement, no standard test level asserted |
| Ripple | alternator/charger ripple + inverter switching noise | same | `UNKNOWN` |
| Reverse polarity | a real installer error mode | same | `CANDIDATE_REQUIREMENT`: survive without user-visible damage |
| Ground reference | battery negative common; multiple ground points; possible galvanic paths via shore power, engine, propeller shaft, antenna | same | `ENGINEERING_ASSUMPTION`; must be surveyed per vessel |

**Design consequence.** Any MAREA product must accept the **widest plausible** window and survive
transients without permanent damage, or it must be sold with a documented, mandatory external protection
item. "9–32 V DC input" appears in the data records as a **candidate requirement across 12 V and 24 V
systems**, not as a tested range and not as a published product specification.

---

## 2. Candidate power-domain architecture (text diagram)

The diagram is a **candidate reference architecture** for a hardware-bearing family (HUB shown first;
AIS/SENSE/WATCH/DISPLAY reuse the same skeleton with a smaller load set). It is not an approved design.

```
 VESSEL 12/24 V BATTERY BUS
   │
   ├─[1] EXTERNAL FUSE / BREAKER  (sized to cable and product, see §11)
   │
   ├─[2] REVERSE-POLARITY PROTECTION        (ideal-diode / P-MOSFET, not a shunt diode)
   │
   ├─[3] TRANSIENT / SURGE CLAMP            (TVS + series impedance; coordinated with [2] and [4])
   │
   ├─[4] EMI INPUT FILTER                   (common-mode choke + X/Y capacitors)
   │
   ├─[5] WIDE-INPUT DC/DC CONVERTER         (buck or buck-boost; 12/24 V in → regulated internal rails)
   │        │
   │        ├── 5 V rail → USB / radios / peripherals (current-limited, fused or eFused)
   │        ├── 3.3 V rail → processors, MCU, logic, sensors
   │        ├── 1.8/1.2 V rails → core supplies (sequenced by PMIC)
   │        └── analog reference / isolated field supply where required
   │
   ├─[6] SUPERVISORY / BROWNOUT + RESET     (voltage supervisor + watchdog; defined reset tree)
   │
   ├─[7] ENERGY STORAGE / HOLD-UP           (only where a controlled shutdown or write-completion is needed)
   │
   ├─[8] PROTECTED FIELD INTERFACES:
   │        ├─ NMEA 0183 listener  → isolated RS-422 receiver (galvanic isolation barrier)
   │        ├─ NMEA 2000 (NOT IMPLEMENTED / PROHIBITED) → isolated CAN transceiver, if ever licensed
   │        ├─ Ethernet            → magnetics + ESD array + connector shield strategy
   │        ├─ USB                 → ESD array + current limit + connector retention
   │        └─ sensor inputs       → RC/EMI filter + clamp + surge element per input class
   │
   ├─[9] ANTENNA / RF PORTS (WATCH, AIS, DISPLAY radio)
   │        → ESD + surge + DC block / matching; antenna ground referenced to enclosure, not to battery negative
   │
   └─[10] ENCLOSURE / CHASSIS GROUND
            → single documented bond point; shield termination strategy; no uncontrolled ground loops
```

**Cloud/shore boundary.** No MAREA product may take its operating power from, or reference its ground
to, a shore-power or internet-connected source. The only external connections are the vessel DC bus,
the vessel network, antennas and (WATCH) the mobile network. The HUB is **local-first**: loss of the
commercial website must not interrupt local functions.

**PILOT boundary.** A steering system would add a motor circuit, a contactor and a physical E-stop. That
architecture is deliberately **not designed here**. The only statement MC-11 makes is the requirement
that any future design must provide an operator-actuated, firmware-independent motor-power isolation and
a documented manual-takeover drill. `PILOT_SAFETY_GATE = BLOCKED` remains in force.

---

## 3. Protection requirements per function

| Function | Candidate requirement | Why it matters on a vessel | Status |
|---|---|---|---|
| **Reverse polarity** | Survive reversed supply at the connector without fire, smoke or user-visible damage; recover when corrected | Battery leads are routinely reconnected backwards during winter service | `CANDIDATE_REQUIREMENT` |
| **Overcurrent** | Coordinated external fuse/breaker + internal current limiting; no single fault may cause a cable to overheat before the protective device operates | Long, thin vessel cabling and high available fault current from a large battery bank | `CANDIDATE_REQUIREMENT` |
| **Transient / surge** | Clamp and survive load-dump-style and inductive transients; no permanent damage; no unsafe reset loop | Alternators, winches, pumps and lightning-adjacent transients | `UNKNOWN` test levels — must be measured/standardised before a claim |
| **Grounding** | One documented signal-ground reference per enclosure; shield termination strategy; no reliance on the vessel hull as a signal return | Hull/engine/propeller galvanic paths; shore-power ground | `CANDIDATE_REQUIREMENT` |
| **Galvanic isolation** | NMEA 0183 interface isolated from the host; isolation barrier rated for the vessel environment | NMEA 0183 devices on different batteries/chargers create ground loops and offset voltages | `CANDIDATE_REQUIREMENT`; isolation voltage `UNKNOWN` |
| **EMC filtering** | Input filter + per-interface filtering; enclosure and cable-shield strategy defined | A switching converter and PWM loads are both victim and source | `CANDIDATE_REQUIREMENT`; test levels `UNKNOWN` |
| **Conversion** | Wide-input converter that holds regulation across the candidate window and degrades predictably below it | Charging/starting dips and equalisation spikes | `CANDIDATE_REQUIREMENT`; efficiency `UNKNOWN` |
| **Brownout / reset** | Defined reset threshold; safe state; boot only after rails are stable; no partial writes | Engine cranking is a routine brownout | `CANDIDATE_REQUIREMENT`; thresholds `UNKNOWN` |
| **Sequencing** | Power-good chain; processors released after rails; field interfaces enabled last | Latch-up, phantom powering of powered interfaces, back-powering | `CANDIDATE_REQUIREMENT` |
| **Quiescent drain** | A hard budget per product, measured in every low-power state; WATCH especially must not drain the battery it monitors | Unattended vessels sit for weeks; a monitoring device that flattens the battery defeats its own purpose | `CANDIDATE_REQUIREMENT`; figures `NOT_MEASURED` |
| **ESD** | ESD arrays on every user-accessible connector and antenna port; enclosure discharge path defined | Crew touch connectors, antennas and screens in dry/cold conditions | `CANDIDATE_REQUIREMENT` |
| **Connector protection** | Keyed, locking, strain-relieved connectors; no exposed live pins; touch-safe terminals; reverse-insertion impossible | Wet, gloved, hurried installation at a helm or in a locker | `CANDIDATE_REQUIREMENT` |
| **Fuse selection** | Fuse/breaker rated for cable ampacity and product maximum current, with DC rating and interrupt capacity suitable for the battery bank; documented in the installation guide | A fuse chosen for the product but not for the cable is a fire risk | `CANDIDATE_REQUIREMENT`; actual ratings `NOT_ESTABLISHED` |
| **Cable / connector suitability** | Tinned copper, marine-rated insulation, correct gauge for current and voltage drop, UV/salt/oil resistance, documented maximum length per interface | Voltage drop and corrosion are the most common field faults | `CANDIDATE_REQUIREMENT`; cable schedule `NOT_ESTABLISHED` |
| **Field-service safety** | Service disconnect, labelled hazards, stored-energy warning, no exposed hazardous voltage; instructions for isolation before work | Installers and owners work on live DC systems | `CANDIDATE_REQUIREMENT` |

---

## 4. Interface protection matrix

Severity is assessed for the **host** product being damaged or disturbed. All ratings are candidate
requirements until measured; no protection component is selected.

| Interface | Typical fault / stress | Protection candidate | Isolation required? | Residual unknown |
|---|---|---|---|---|
| 12/24 V DC input | reverse polarity, load dump, cranking dip, overcurrent, ESD | fuse/breaker + ideal-diode reverse protection + TVS + input filter + wide-input converter | No (but input return strategy documented) | transient levels; fault current; charger profiles |
| NMEA 0183 listener (RS-422) | ground offset, common-mode surge, miswire to a 12 V talker, short | isolated transceiver + series resistors + TVS + common-mode choke | **Yes** | isolation voltage; maximum bus length; talker drive levels |
| NMEA 2000 (if ever licensed) | bus fault, ground offset, short to battery, ESD | isolated CAN transceiver + TVS + common-mode choke + termination strategy | **Yes** | not designed; blocked by licence/certification |
| Ethernet | ESD, surge on long outdoor cable, ground potential difference | magnetics + ESD array + shield/ground strategy | Optional (transformer-based) | cable route and length; PoE is out of scope |
| USB | ESD, overcurrent, back-powering, connector abuse | ESD array + current-limited switch + retention | No (host is local) | current budget; cable quality |
| Antenna (AIS VHF, WATCH cellular, GNSS) | ESD, lightning-adjacent surge, DC short, water ingress | DC block/matching + surge element + ESD + sealed connector | Antenna ground referenced to enclosure, not to battery negative | lightning exposure; antenna grounding practice |
| Sensor inputs (SENSE) | miswire to 12 V, short, induced noise, wet connector | clamp + series resistance + RC filter + isolated or protected front end | Per input class | maximum cable length; noise environment |
| Relay / contactor coil (future, not PILOT) | back-EMF, inrush | flyback + driver rating + isolation | Yes if the coil is external | not designed |
| Display panel/backlight (DISPLAY) | inrush, thermal, ESD on the front surface | soft-start + current limit + ESD/ground path | No | inrush and thermal behaviour |

**Rule:** a protection component that is not in the BOM does not protect anything. Every row above is a
requirement on a future design, not a description of an existing one.

---

## 5. Per-family power budget — explicit assumptions, no invented numbers

The only honest budget in MC-11 is a **framework** with `UNKNOWN` totals. Because unknown is never zero,
the data records carry `typicalConsumptionW = null` and `standbyConsumptionW = null` for every family.

| Family | Supply (candidate) | Load contributors (assumption, not measured) | Typical W | Standby W | Status |
|---|---|---|---|---|---|
| HUB | 12/24 V, 9–32 V candidate window | application processor (idle→load), Wi-Fi/BLE radio, Ethernet PHY, isolated 0183 front end, storage, DC/DC losses | `null` | `null` | NOT_MEASURED; class-A reference suggests several watts, but even that is not a product figure |
| AIS | 12 V (24 V to confirm) | receiver front end, decoder host, status LEDs | `null` | `null` | NOT_MEASURED |
| SENSE (per module) | 12 V (24 V to confirm) | MCU, front end, sensing element excitation, local interface | `null` | `null` | NOT_MEASURED |
| WATCH | 12 V (24 V to confirm) + internal backup if designed | modem (peak vs idle vs sleep), MCU, sensors, buffering, backup charging | `null` | `null` | NOT_MEASURED — see §7 |
| DISPLAY | 12/24 V | panel backlight (dominant), compute, radios, conversion losses | `null` | `null` | NOT_MEASURED; **no brightness or power figure may be published** |
| NAV / WEATHER / FLEET | none supplied | customer device / cloud | n/a | n/a | NOT_APPLICABLE |
| PILOT | 12/24 V + dedicated motor circuit | control computer, motor-control electronics, contactor coil, drive losses | `null` | `null` | NOT_DESIGNED, BLOCKED |

**Assumptions that must be replaced by measurement before any budget is quoted to a customer or used in
a BOM:** (1) processor idle/load power; (2) radio transmit duty cycle; (3) modem wake/sleep duty cycle;
(4) DC/DC efficiency across the input window; (5) backlight power at each brightness mode;
(6) quiescent current of every always-on rail.

---

## 6. Failure-mode register (electrical)

| ID | Failure mode | Cause | Local effect | System effect | Detection | Mitigation candidate | Status |
|---|---|---|---|---|---|---|---|
| EF-01 | Reverse polarity | Installer error | Protection conducts, product off | No data; no damage | Reverse-protection status | Ideal-diode + documented wiring | PROPOSED |
| EF-02 | Sustained overvoltage | Charger fault / equalisation | Clamp conducts, converter may shut down | Product offline; restarts when corrected | Input-voltage monitor | TVS + overvoltage shutdown | PROPOSED |
| EF-03 | Load-dump transient | Alternator/load switching | Temporary reset or latch-off | Reboot; possible data loss | Reset cause register | Clamp + hold-up + graceful restart | PROPOSED |
| EF-04 | Cranking brownout | Engine start | Processor resets | Reboot; storage corruption risk if writing | Brownout detector | Supervisor + write-completion hold-up + journaling | PROPOSED |
| EF-05 | Input fuse open | Short or miswire | Product off | Loss of that product only | Fuse status (if monitored) | Correct fuse coordination; service procedure | PROPOSED |
| EF-06 | Ground loop via NMEA 0183 | Different ground references | Noise, corrupted sentences | Wrong or missing data | CRC/parse error counters | Galvanic isolation | PROPOSED |
| EF-07 | Isolated interface breakdown | Surge exceeding barrier rating | Barrier fails; possible damage both sides | Safety and data risk | Isolation test at service | Rated barrier + external surge protection | PROPOSED |
| EF-08 | Ethernet surge | Long cable / nearby strike | PHY damage | Network loss | Link status | Magnetics + TVS + cable routing rules | PROPOSED |
| EF-09 | Antenna open/short | Water ingress, cable damage | Reception loss | AIS/WATCH blind; alarms must show fault | Antenna fault detection where designed | Sealed connectors, DC diagnostics | PROPOSED |
| EF-10 | Converter thermal shutdown | High ambient, blocked ventilation | Product off or derated | Loss of function in a hot locker | Thermal sensor | Derating, thermal design, honest thermal state | PROPOSED |
| EF-11 | Storage corruption | Power loss during write, SD wear | Configuration loss | Boot failure or lost history | Filesystem check / boot counter | eMMC, journaling, A/B update | PROPOSED |
| EF-12 | Radio coexistence interference | Wi-Fi/BLE/LTE/AIS in one enclosure | Throughput or sensitivity loss | Data gaps, missed alerts | Error counters | Filtering, antenna separation, duty-cycle limits | PROPOSED |
| EF-13 | Backup energy source failure (WATCH) | Cell ageing, charging fault | No report during outage | Silent gap — the exact failure the product exists to prevent | Backup health check | Measured health, staleness reporting, honest status | PROPOSED |
| EF-14 | Field miswire to 12 V on a sensor input | Installer error | Input clamp conducts | Module damage or false reading | Input diagnostics | Clamp + series resistance + documented wiring | PROPOSED |
| EF-15 | Fuse/breaker undersized for cable | Installation choice | Nuisance trip or cable overheating | Fire risk in the worst case | None automatic | Installation guide with cable/fuse table; inspection | PROPOSED |
| EF-16 | Parallel-battery cross-feed through ground paths | Multiple grounds, shore power | Galvanic corrosion / stray current | Long-term corrosion damage | Periodic inspection | Isolation and single-bond strategy | PROPOSED |

No failure mode in this register has been demonstrated by test. `mitigationStatus = PROPOSED_NOT_IMPLEMENTED`.

---

## 7. WATCH — the monitoring device that must not drain the battery it monitors

This is a first-order product requirement, not an optimisation. A vessel left unattended for weeks has a
small available energy budget; a monitoring device that draws tens of milliamps continuously can flatten
a service battery and turn a "protection" product into the cause of the failure it is meant to report.
There is **no measured figure** for a MAREA WATCH device because no device exists.

**Candidate requirement (not measured):** the WATCH device's own average consumption over an unattended
period must be a small fraction of the self-discharge and expected load of the battery it monitors, and
must be published as a measured value before sale. The product must also report its own energy impact
honestly (e.g. "device draws X mA average, measured on article Y at temperature Z").

**Design constraints implied by that requirement:**

1. **Deep sleep is the default state.** The application processor (if any) must be off or duty-cycled;
   a low-power MCU supervises sensors and wake sources. This is exactly why `ARCH-WATCH-D`/`-C` are
   preferred over `ARCH-WATCH-A` (a full Linux SBC cannot meet the quiescent target defensibly).
2. **Modem duty cycle dominates.** Cellular attach, keep-alive and upload scheduling must be batched and
   bounded. A modem that stays attached for convenience destroys the budget. No duty-cycle figure is
   asserted.
3. **Alert path must survive deep sleep.** Wake sources: bilge switch change, geofence movement, timer,
   shore-power loss, battery-voltage threshold, and a bounded periodic heartbeat.
4. **Backup energy must be honest.** If a backup source is fitted, its duration must be measured, its
   health monitored and its degradation reported — not promised. If no backup is fitted, the product
   must say what happens on power loss.
5. **Subscription isolation.** An expired subscription may stop remote notifications; it may never stop
   local sensing, local alarm or local buffering. This is a design requirement, untested.
6. **Self-drain reporting.** The device should report its own supply voltage and the vessel battery
   voltage separately, so a low battery caused by the device can be distinguished from one caused by the
   vessel.

**Unknowns requiring laboratory measurement:** average and peak current per modem state; sleep current
including regulator quiescent and sensor leakage; backup-source charge/discharge behaviour; behaviour at
the candidate voltage extremes; thermal effect on battery ageing; long-duration (weeks) average under a
real marina network.

---

## 8. HUB — isolation consequences of joining multiple marine networks

A HUB that connects NMEA 0183, a vessel Ethernet/IP network, Wi-Fi clients, an optional AIS receiver and
(if ever licensed) NMEA 2000 is not "one network". It is a **boundary device between networks with
different ground references and different fault energies**. The consequences are architectural:

1. **Every galvanically referenced interface must be isolated or single-point referenced.** The NMEA 0183
   listener must be isolated (as the legacy stack never was — `HW-10` had no opto-isolation). Ethernet is
   transformer-coupled but its shield/ground policy must be explicit. USB is a local, non-isolated bus and
   must not become a path between networks.
2. **The HUB becomes the common point for ground loops.** If one radio, one instrument and one laptop are
   referenced to different battery negatives, the HUB is where the loop closes. One documented bond point
   and an isolation barrier on each external serial interface are the mitigation; without them the HUB
   will inject noise into the very data it distributes.
3. **A fault on one network must not propagate to the others.** Short-to-battery on an 0183 line must
   not damage the IP side; a PoE or Ethernet surge must not reach the processor; an antenna fault must not
   reset the appliance.
4. **The write path is a safety boundary.** A third-party gateway such as the iKonvert is documented as
   bidirectional and can send routes/waypoints onto an NMEA 2000 network where software supports it
   (`EVD-MC11-009`). The HUB must be read-only toward vessel networks. If a write path is ever added it
   must be enumerated, bounded, separately approved and tested — and it still may never be a steering
   path.
5. **Network segmentation is a security requirement, not a convenience.** Guest Wi-Fi, owner devices,
   installer laptops and safety-relevant instruments should not share an unsegmented, unauthenticated
   network. A second Ethernet port or a documented segmentation policy is a candidate requirement.
6. **Loss of the shore/internet connection must not change local behaviour.** The HUB must keep
   ingesting, normalising, showing and logging with no internet. Any cloud feature is additive.

**Verification required:** isolation resistance and withstand test; ground-loop injection test;
common-mode noise injection on each interface; fault injection (short to battery, short to ground,
antenna open/short); EMC pre-scan; network segmentation and authentication review. None executed.

---

## 9. PILOT — no control outputs (boundary restated)

MC-11 designs **no** actuator path. For the record, the electrical facts that make a steering system a
different class of design are:

- A motor circuit carries stall current far above any electronics budget, so fuse coordination,
  contactor DC rating and cable ampacity are safety functions, not conveniences.
- Motor-power isolation must be **operator-actuated and firmware-independent**; an E-stop that only
  signals a GPIO is not a power cut. The legacy design sensed GP13 but never drove a contactor.
- The MCU needs a hardware watchdog independent of the control loop; the legacy firmware had none.
- Overcurrent protection must be credited by two independent means (e.g. fuse + measured current limit).
- Manual takeover must be detectable, not assumed; the legacy `clutch` signal was a copy of the enable
  flag.
- Power loss must de-energise the drive and require an explicit re-engage; the system must not resume a
  mode automatically.
- The control plane must be authenticated and local; the legacy HTTP API had no authentication, no TLS,
  wide-open CORS and bound `0.0.0.0` by default.

Because none of this is designed or tested, `PILOT_SAFETY_GATE = BLOCKED` and **no PILOT electrical
architecture is proposed in this milestone**. D9 records the disposition.

---

## 10. Test plan (every test `NOT_EXECUTED`)

| Test ID | Test | Purpose | Equipment | Acceptance basis | Status |
|---|---|---|---|---|---|
| E-T01 | Input voltage sweep 12 V system | Confirm regulation across the candidate window | Programmable DC source, electronic load, DMM | No damage; output in regulation across candidate window | NOT_EXECUTED |
| E-T02 | Input voltage sweep 24 V system | Same for 24 V | Same | Same | NOT_EXECUTED |
| E-T03 | Reverse polarity | Survival of the most common miswire | Reversed source, current limit | No damage, no fire, recovers | NOT_EXECUTED |
| E-T04 | Load-dump / transient injection | Survival of inductive transients | Transient generator (lab hire) | No permanent damage, defined recovery | NOT_EXECUTED |
| E-T05 | Cranking dip | Brownout and restart behaviour | Programmable source with dip profile | Defined safe restart; no corruption | NOT_EXECUTED |
| E-T06 | Overcurrent / fuse coordination | Protective device operates before cable overheats | Current source, thermal camera, sample cable | Coordination per installation table | NOT_EXECUTED |
| E-T07 | Isolation withstand and resistance | Verify the 0183 barrier | Isolation tester | Defined barrier rating met | NOT_EXECUTED |
| E-T08 | Ground-loop injection | Verify noise immunity on serial and Ethernet | Common-mode injection network | No data corruption; no damage | NOT_EXECUTED |
| E-T09 | ESD on connectors and front surface | Verify ESD protection | ESD gun, test points | No upset or damage at the chosen level | NOT_EXECUTED |
| E-T10 | Quiescent current (WATCH) | Measure real deep-sleep and average | Precision current meter / coulomb counter | Meets the candidate requirement | NOT_EXECUTED |
| E-T11 | Modem duty-cycle power | Measure average over unattended cycle | Current logger + live network | Budget documented honestly | NOT_EXECUTED |
| E-T12 | Antenna fault (open/short) | Verify detection and protection | Network analyser, fault simulators | Fault detected and reported | NOT_EXECUTED |
| E-T13 | Thermal soak at extremes | Verify derating and thermal state honesty | Thermal chamber (not booked) | No unsafe state; honest thermal display | NOT_EXECUTED |
| E-T14 | Power-loss during storage write | Verify no corruption | Programmable switch, repeated cycling | No corruption / recoverable | NOT_EXECUTED |
| E-T15 | EMC pre-scan | Early risk reduction before accredited test | Pre-scan bench (not booked) | No unresolved critical emission | NOT_EXECUTED |
| E-T16 | Multi-interface simultaneous fault | One fault must not propagate | Fault injection harness | Fault contained to its interface | NOT_EXECUTED |

**No test may be recorded as PASS from simulation, a supplier datasheet or an engineering assumption.**
Test authorisation is gate `G4 = NOT_AUTHORIZED`; equipment does not exist and no laboratory was booked.

---

## 11. Fuse selection and cable/connector suitability (candidate rules)

1. **Fuse for the cable first, then the product.** The protective device must protect the smallest
   conductor in the circuit, not merely the appliance. The installation guide must publish a table of
   cable gauge, maximum length, fuse/breaker rating and voltage drop for each supported configuration.
2. **DC rating and interrupt capacity.** Automotive-style fuses/breakers used on a large battery bank
   must be rated for DC and for the available fault current; a device rated only for AC is not acceptable.
3. **No shared fuse with mission-critical loads.** Navigation lights, bilge pumps and radio equipment
   should not share a fuse with a convenience appliance; a MAREA product must not be the reason a
   required circuit is lost.
4. **Cable and connector class.** Tinned copper, marine-rated insulation, UV/salt/oil resistance, correct
   gauge for current and voltage drop, strain relief, locking/keyed connectors, no exposed live pins.
5. **Separation.** Antenna coax and signal cabling should be separated from motor and inverter cabling;
   where crossing is unavoidable, cross at right angles.
6. **Documented maximum lengths** per interface are required before installation instructions can be
   written; none is measured.
7. **Service disconnection.** Installation instructions must require isolating the battery before work,
   and the product must be safe to touch when unpowered (no stored hazardous energy beyond a documented
   hold-up).

All ratings are `NOT_ESTABLISHED`; no fuse, breaker, cable or connector has been selected or purchased.

---

## 12. Unknowns that require laboratory or vessel measurement

| # | Unknown | Consequence if left unknown | Measurement needed |
|---|---|---|---|
| U1 | Real transient profile on the target vessels | Protection may be under- or over-designed | Portable transient recorder survey on representative vessels (not authorised) |
| U2 | Available fault current at the installation point | Fuse interrupt capacity may be inadequate | Battery/bank survey |
| U3 | Ground potential differences and galvanic paths on real vessels | Isolation and corrosion strategy may be wrong | Vessel electrical survey |
| U4 | Quiescent and average current of each product | WATCH could drain the battery; HUB standby cost unknown | Bench precision measurement |
| U5 | Modem duty cycle and coverage behaviour | WATCH energy budget and alert latency unknown | Live-network measurement |
| U6 | Thermal rise in a closed locker / behind a helm | Derating and lifetime unknown | Thermal chamber + in-situ logging |
| U7 | EMC emissions and immunity of the assembled products | CE/EMC route cannot be planned | Pre-scan then accredited test |
| U8 | Isolation barrier withstand in the real installation | Safety and data integrity risk | Isolation test on article |
| U9 | Cable-length limits per interface | False compatibility and support load | Length/noise characterisation |
| U10 | Effect of a device on battery ageing | Environmental and warranty impact | Long-duration test (not feasible in MC-11) |

**No laboratory, vessel, bench or test authorisation exists.** All of the above are `NOT_EXECUTED`, and
the milestone cannot convert any of them into a claim.
