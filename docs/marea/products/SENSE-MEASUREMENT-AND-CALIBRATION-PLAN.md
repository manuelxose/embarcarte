# MAREA SENSE — Measurement and calibration plan (MC-06 / D10b)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D10b-SENSE-CALIBRATION |
| Milestone | MC-06 (Master Prompt 06/36) |
| Owner | MAREA SENSE Product Director (Product function) with hardware engineering and service operations |
| Document status | INTERNAL · DEFINED PLAN · NOT EXECUTED |
| Product id | `SENSE` — modules `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`; kits `SENSE-ESSENTIALS`, `SENSE-SAIL`, `SENSE-SYSTEMS` |
| Binding sibling | `docs/marea/products/MAREA-SENSE-COMMERCIAL-SPEC.md` (D2) |
| Contract authority | `docs/marea/products/README.md` §15–§16, §22 |
| Date | 2026-10-30 |
| Classification | Internal pre-contractual engineering plan. Not a calibration certificate, not an accuracy report, not an approved procedure for use on a vessel |

This plan fixes **what calibration will have to mean** for each SENSE module, what evidence would be needed
to claim that a measurement is trustworthy, and how each requirement will be verified in future work. It
does not calibrate anything: no module, sensor, sender, reference instrument or vessel installation exists.
Every acceptance value in this document is a `PROPOSED` target and every interval is `OPEN`.

The single rule of the plan: **a unit test, a parser test or a simulated signal is not measurement
evidence.** A measurement becomes evidence only when a physical article is compared against a traceable
reference, under recorded conditions, by a named operator, and the result is retained.

---

## 1. Purpose, scope and non-assertions

### 1.1 Purpose

1. Define per module the measurement principle, the calibration prerequisites, the class of reference
   equipment required, the procedure, the acceptance criteria for future engineering validation, the
   tolerance and evaluation method, the record-keeping format and the recalibration-interval basis.
2. Define the failure-detection and invalid/stale display rules that calibration depends on: a calibration
   record is meaningless if the consumer cannot tell a calibrated value from an uncalibrated one.
3. Define the field-replacement and re-calibration path, and the ownership-transfer implications of a
   calibration record.
4. Map every requirement in this plan to the future verification method that would close it.

### 1.2 Scope

In scope: the five module SKUs and the three kits of the SENSE family, the calibration of **original MAREA
measurement chains**, and the boundary conditions for **adapter mode** (a module consuming another
manufacturer's documented data).

Out of scope: HUB, WATCH, DISPLAY and NAV calibration; third-party sensor or sender accuracy; vessel survey;
legal metrology; any certified alarm or safety-function certification; any conformity assessment; any
installation procedure for a specific vessel or tank.

### 1.3 What this plan does not assert

This plan does not assert or imply: an achieved accuracy, resolution, repeatability, drift or stability
figure for any module; the existence of any sensor, sender, enclosure, reference instrument or test bench;
the existence of a calibration service or calibrated technician; an ingress-protection class; NMEA 2000
capability; a certified alarm; a legal-metrology or fuel-management function; a battery state-of-charge
function; a navigational function; or any certificate, declaration or test report.

### 1.4 Status vocabulary used here

| Marker | Meaning |
| --- | --- |
| `PROPOSED` | A target or acceptance criterion for future validation. Not achieved, not measured, not a specification. May not appear in customer copy. |
| `NOT_MEASURED` | The canonical state `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; no measurement accuracy evidence exists for that module. |
| `OPEN` | A fact, decision or artefact not yet established. |
| `BLOCKED` | An external condition (hardware, calibration equipment, measurement, conformity) prevents closure. |
| `NOT_EXECUTED` | A procedure or scenario defined but not performed. |
| `NOT_VERIFIED` | `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`; no environmental or ingress evidence exists. |

---

## 2. Evidence base — and exactly what it does not establish

### 2.1 What exists today

| Evidence | Source | What it establishes | What it does not establish |
| --- | --- | --- | --- |
| NMEA 0183 wind parser, 5 executed unit tests (MWV apparent, invalid status, MWD, km/h conversion, checksum rejection) | `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §6.1; `marine-sensor-gateway/rpi/wind/test_wind_nmea.py` | Single-input parser behaviour on synthetic sentences | Any real wind sensor accuracy, masthead installation behaviour, calibration, drift, field conditions or vessel-level measurement |
| IMU complementary-filter publisher, 3 executed unit tests (fast gyro response, bias isolation, stationary stability) | Same §6.1; `marine-sensor-gateway/rpi/omi-imu/test_publish_signalk.py` | Fusion behaviour on synthetic input | Real IMU hardware accuracy, magnetic deviation at sea, calibration procedure, heading accuracy or vessel behaviour |
| Type-only adapter catalogue (`SensorAdapter`, GPS, IMU, NMEA 0183, NMEA 2000, custom serial) | Same §3.2 | Interface shapes only | Any implemented sensor ingestion; no implementing class exists |
| Sensor hardware register: no model recorded for the wind sensor, GNSS receiver or RTL-SDR; no SENSE sensor article exists | `VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §2.1 | The absence of a selected SENSE sensing element | Nothing about accuracy, because there is no article to measure |

### 2.2 Explicit statement required by the MC-06 contract

**A unit-tested parser is not sensor-accuracy evidence.** The MC-02 executed NMEA 0183 wind parsing and IMU
fusion tests are **parser-level only**: they exercise message interpretation and a publishing/fusion
pipeline against synthetic or stationary input, with no physical sensor, no reference, no calibration and no
environmental condition. They cannot support an accuracy claim, a calibration claim, a range claim or an
installation claim, and they do not count as execution of any procedure in this plan.

### 2.3 The consequence for the family

`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` applies to every module. `SENSE_INGRESS_PROTECTION =
NOT_VERIFIED` applies to every enclosure. Until a module has an executed calibration record against a
traceable reference, the only truthful display state is `UNCALIBRATED`/`INVALID` — never a plausible-looking
number.

---

## 3. Measurement architecture — original device versus adapter

### 3.1 The two measurement models

| Model | Measurement chain | MAREA calibration obligation |
| --- | --- | --- |
| **Original measurement device** | MAREA selects the sensing element (or the sender input) and owns the chain from the physical quantity to the published value | Full: reference-class calibration, record, drift check, re-calibration after replacement |
| **Adapter** | A documented third-party source (NMEA 0183 sentences, Signal K path, existing sender) provides the value; MAREA normalises and republishes it | Connection/configuration verification and provenance labelling only; the source's accuracy and calibration are **not** asserted by MAREA |

### 3.2 Per-module model

| Module | Primary model | Adapter input (documented, matrix-gated) | MAREA accuracy claim in adapter mode |
| --- | --- | --- | --- |
| `SENSE-WIND` | Original masthead sensing element | NMEA 0183 MWV/MWD wind sentences, or a documented Signal K wind path | None — "source: third party, unverified by MAREA" is displayed |
| `SENSE-POWER` | Original voltage/current chain | Documented third-party battery-monitor data | None |
| `SENSE-BILGE` | Original switch/contact input chain | Documented dry-contact input | None; the state is a state, not a measurement |
| `SENSE-TANKS` | Original module reading a sender; the sender may be third-party | Existing tank sender input class, documented per matrix | None for sender accuracy; tank-table conversion is a MAREA responsibility |
| `SENSE-ENV` | Original on-module environmental sensing | Documented third-party environment source | None |

### 3.3 Adapter-mode rule

An adapter-mode reading must be published with: source identity (device/sentence/path), source quality where
the source provides it, the module's own connection state, the time of receipt, and the text/marker
"unverified by MAREA". A consumer must not be able to mistake an adapter reading for a MAREA-calibrated
measurement. No adapter input is supported until the D5 matrix records a tested device, firmware version and
direction.

---

## 4. Common requirements that apply to every module

### 4.1 Calibration states (canonical vocabulary for data and UI)

| State | Meaning | Display rule |
| --- | --- | --- |
| `UNCALIBRATED` | No valid calibration record for this module/configuration | Value shown as `INVALID`; no number presented as reliable |
| `CALIBRATED_VALID` | Valid current record for this configuration, within range, fresh | Value shown with source and age |
| `CALIBRATED_OVERDUE` | Record exists but the interval basis has expired or the configuration changed | Value may be shown with an overdue marker; not presented as a reliable measurement |
| `OUT_OF_RANGE` | Value outside the documented range | `INVALID`; the reason is shown |
| `STALE` | Value older than the freshness threshold | Last value shown only with `STALE` and age; not presented as current |
| `UNAVAILABLE` | Source lost or unknown | No value; state and age shown |
| `FAULT` | Detected hardware/connection fault | `FAULT`; no value |

`UNCALIBRATED`, `CALIBRATED_OVERDUE`, `OUT_OF_RANGE`, `STALE`, `UNAVAILABLE` and `FAULT` are all
"not a reliable measurement" states. The SENSE limitation statement of README §16 applies to every one of
them.

### 4.2 Reference equipment classes (generic; no part numbers are invented)

No reference equipment is held. These are **requirements**, not existing assets. A reference must be
traceable to a national or international standard, and its calibration must be current on the day of use.

| Class | Reference equipment class | Traceability requirement | Intended use |
| --- | --- | --- | --- |
| `REF-WIND-A` | Calibrated airflow and angle reference: wind tunnel or rotating-arm rig with a calibrated anemometer and a calibrated angle reference | Airspeed and angle traceable; uncertainty budget recorded | `SENSE-WIND` speed and angle |
| `REF-DC-A` | Calibrated DC voltage/current reference: precision digital multimeter plus calibrated shunt and a stable load | Voltage and current traceable; shunt certificate current | `SENSE-POWER` voltage, current, energy |
| `REF-LEVEL-A` | Physical level reference for tanks: graduated sight glass, calibrated dip tape or weighing system, with a documented tank geometry | Length/mass traceable; geometry method recorded | `SENSE-TANKS` empty/full and intermediate points |
| `REF-SWITCH-A` | Controlled switch-actuation fixture: a wet/dry test chamber and wiring harness allowing repeatable actuation and open/short injection | Function-test fixture; no metrological traceability required | `SENSE-BILGE` state verification and fault injection |
| `REF-ENV-A` | Calibrated thermometer, hygrometer and barometer, optionally a climatic chamber | Temperature, humidity and pressure traceable | `SENSE-ENV` temperature, RH, pressure |
| `REF-TIME-A` | Traceable time source (GNSS time or laboratory time reference) | UTC traceable | Timestamps, staleness and event ordering |
| `REF-INSTALL-A` | Controlled reference installation (bench or vessel-like fixture) with a reference sensor mounted alongside the device under test | Configuration and repeatability recorded | All modules; installation effects and repeatability |

### 4.3 Calibration prerequisites (all modules)

1. A frozen, identifiable configuration: module SKU, serial and firmware version; sensing element/sender
   identity; range; calibration constants; tank table where applicable.
2. A current, traceable reference from the applicable class, with uncertainty known and recorded.
3. A stable and recorded environment (temperature, supply voltage, vibration exposure where relevant); the
   conditions are part of the record.
4. A documented procedure version, a trained operator for the module class, and a calibration record
   template.
5. Power supplied through the documented path (fuse/breaker as specified) at the documented voltage.
6. The consumer configured to display quality, calibration state and freshness — calibration without
   observable state is not acceptable.
7. A documented "do not calibrate" condition: no calibration may be recorded if the reference is out of
   date, the configuration cannot be frozen or the fault-detection state is `FAULT`.

### 4.4 Tolerance and evaluation method (common)

1. **Tolerance** `T` is the applicable `PROPOSED` acceptance target for the module and point of the range.
2. **Test accuracy ratio (TAR):** the reference uncertainty `U_ref` must be ≤ `T`/3 at each point; if it is
   not, the point is not usable as acceptance evidence and the method must be improved.
3. **Evaluation:** at each defined point, at steady state, compare module value `M` to reference value `R`;
   error `e = M − R`; record `e`, `T`, `U_ref`, and the acceptance decision.
4. **Repeatability:** at least three repeat readings per point at the documented sampling behaviour; record
   spread and treat a non-repeatable point as a failure requiring investigation.
5. **Drift check:** a reference check at the start and end of each session; if the reference changes beyond
   its stated stability, the session is invalidated and repeated.
6. **Round-trip judgement:** acceptance requires every point within `T`; a single-point pass is not a module
   acceptance. Points, conditions and repetitions are fixed per module in §5.
7. **Uncertainty reporting:** results are reported as measured error with `U_ref` and conditions; results are
   evidence, not a published accuracy figure. A published accuracy claim would require a separate claims
   process and is not authorised at MC-06.

### 4.5 Record keeping (common format)

A calibration record is created per module and per calibration event, and must contain at least:

| Field | Content |
| --- | --- |
| Record identity | Unique record id; procedure and procedure version; document revision |
| Asset identity | Module SKU, serial, firmware version; sensing element/sender identity and serial where available |
| Installation identity | Vessel or bench reference; location/compartment/tank id; installation type (original/adapter) |
| Date and time | UTC start/end; timestamp source (`REF-TIME-A`) |
| Operator | Name/role; calibration competence reference (scheme `OPEN`) |
| Reference equipment | Class; equipment identifier; calibration certificate id; calibration due date; uncertainty `U_ref` |
| Configuration | Range; calibration constants/alignment offset; tank table version; adapter source identity (if any) |
| Conditions | Supply voltage; ambient temperature/humidity; test conditions; anything excluded |
| Test points | Reference values, measured values, error `e`, tolerance `T`, decision per point; repetitions |
| Fault states | Invalid/stale/fault states demonstrated and their evidence |
| Result | `PASS` / `FAIL` / `NOT_EXECUTED` against the `PROPOSED` acceptance criteria; failed points listed |
| Re-calibration | Basis, next due date if any (`OPEN`), and the decision reference |
| Signature | Operator and, for professional service, installer/service organisation identifier |

Retention: the record is retained for the support window (`OPEN`) and at least as long as the module is
supported; it is exportable with the installation record; it transfers with the vessel on ownership change.
Records are not a certificate of accuracy and must not be presented as one.

### 4.6 Recalibration interval basis (`OPEN`)

No interval is set. The interval must later be decided from, at minimum: (a) the stability/drift observed
in validation and repeated calibration; (b) the datasheet stability of the selected sensing element, where a
datasheet exists; (c) field return and complaint data; (d) the consequence of an undetected error for that
quantity; (e) any contractual or regulatory requirement (none identified); (f) the functional-test
requirements that are not metrological (bilge). Until that decision exists, the re-calibration basis is
`OPEN` and no interval may be promised in copy, packaging or quotation.

### 4.7 Failure detection and invalid/stale display rules (common)

1. A detected fault or lost source produces `FAULT`/`UNAVAILABLE`, never a held value.
2. A value older than the module's documented freshness threshold becomes `STALE` with age, then
   `UNAVAILABLE`.
3. An uncalibrated or configuration-changed module produces `INVALID`; its number is not styled or described
   as a measurement.
4. An out-of-range value is `INVALID`; the raw value may be shown only for diagnostics, labelled as raw.
5. A derived value is invalid when any input is invalid or stale (for example true wind without valid vessel
   speed/heading; dew point without valid temperature/humidity; energy counting interrupted).
6. Timestamps are UTC and are not conflated: sample time, receipt time and display time are distinct where
   the design supports it.
7. No automatic "repair" of a missing value (interpolation, last-known substituted silently) is permitted.
8. Failure detection itself must be verified by fault injection; an undetectable single-point failure must be
   documented as a limitation (notably a stuck-dry bilge switch and a stuck tank sender).

### 4.8 Field replacement and re-calibration (common)

1. Record the old module/element identity and its last calibration record.
2. Isolate power; replace with a documented compatible item.
3. Verify identity, firmware version and communication.
4. Re-run the module's §5.5 calibration procedure; write a new record.
5. Demonstrate invalid, stale and fault states; update the installation record and support case.
6. Where the module stores calibration, verify that the stored configuration is the intended one; if the
   configuration cannot be exported/imported reliably (`OPEN`), the procedure must state that re-calibration
   is mandatory after a module replacement, not optional.

### 4.9 Diagnostics requirements relative to calibration

Per module, the diagnostic view must expose: firmware version; calibration state and record reference; last
successful calibration date; configured range/tank table version/alignment offset; last-valid time and age;
fault counters; and the reference class used. A support bundle exported by the owner must contain these and
no vessel-control capability. Diagnostics are a product requirement for the HUB/DISPLAY consumer and are not
implemented (`P-02`).

---

## 5. Per-module calibration plans

### 5.1 `SENSE-WIND` — MAREA SENSE Wind

#### 5.1.1 Measurement principle

An original masthead sensing element converts wind speed and direction into electrical signals; the
below-deck interface samples them, applies the vessel alignment offset and publishes apparent wind speed and
angle, with true wind derived only when valid vessel speed and heading inputs exist. In adapter mode the
module reads documented NMEA 0183 MWV/MWD sentences (or a documented Signal K wind path), validates the
sentence status and checksum where applicable, converts units and republishes the value with third-party
source identity. The implemented parser accepted MWV/MWD with checksum validation in unit tests; that is
parser behaviour, not wind measurement.

No component part number, sensor technology, bearing type or cable type is fixed by this plan; those are
engineering decisions recorded in the BOM when it exists (`H-11`).

**Quantity, units and intended range (`PROPOSED`).** Apparent wind speed in knots and metres per second;
apparent wind angle in degrees. Intended range: 0–60 kn (0–30 m/s) and 0–359°; the validated test subset in
§5.1.4 is 5–40 kn and eight directions, because those are the points this plan can accept until a wider
reference rig exists. The range and every acceptance target are `PROPOSED`; `SENSE_MEASUREMENT_ACCURACY =
NOT_MEASURED`.

#### 5.1.2 Calibration prerequisites

- Sensing element and interface identified with serial and firmware version; masthead cable documented.
- Documented alignment reference: a vessel centreline reference or a bench heading reference for the
  installation.
- `REF-WIND-A` (airflow/angle reference) available and in calibration; bench installation or vessel in calm
  air for the alignment step, with the vessel's heading reference recorded.
- Vessel speed/heading inputs available and valid for any true-wind verification.
- Knowledge of the masthead height and any documented correction the design applies (none is claimed by
  default).

#### 5.1.3 Reference equipment class

`REF-WIND-A` (calibrated airflow and angle reference) and `REF-TIME-A`; `REF-INSTALL-A` for installation
repeatability. A compass/heading reference is required for alignment and is part of the record, not a
calibrated MAREA asset.

#### 5.1.4 Calibration procedure (intended steps)

1. Freeze the configuration (SKU, serial, firmware, cable, mounting position) and record it.
2. Perform the alignment step: with the vessel or bench reference known, set the alignment offset so the
   displayed apparent wind angle matches the reference direction at a minimum of four headings (for example
   0°, 90°, 180°, 270° — `PROPOSED`).
3. Verify angle across a minimum of eight directions (`PROPOSED`), recording error at each.
4. Verify speed at the `PROPOSED` points 5, 10, 15, 20, 30 and 40 kn (or equivalent in m/s), with at least
   three repeat readings at each point.
5. For adapter mode: verify sentence reception, status/checksum handling, unit conversion, source identity
   and the "unverified by MAREA" marker; no source accuracy calibration is performed.
6. Verify true-wind derivation: valid inputs produce true wind; removal of speed or heading input makes true
   wind unavailable (not estimated).
7. Demonstrate invalid, stale, out-of-range and fault states.
8. Write the calibration record with the reference, conditions and results.

#### 5.1.5 Acceptance criteria for future validation (`PROPOSED`)

| Criterion | `PROPOSED` target | Status |
| --- | --- | --- |
| Wind speed error after calibration, 5–40 kn | ≤ 1 kn or ≤ 5% of reading, whichever is greater, at every point | `NOT_EXECUTED` |
| Wind angle error after alignment | ≤ 5° at every direction | `NOT_EXECUTED` |
| Repeatability | Every repetition within the tolerance; no point excluded without investigation | `NOT_EXECUTED` |
| True wind behaviour | Unavailable when vessel speed/heading is missing or stale; never estimated | `NOT_EXECUTED` |
| Adapter provenance | Source identity and "unverified by MAREA" marker present in every adapter reading | `NOT_EXECUTED` |
| State behaviour | `INVALID`/`STALE`/`FAULT` demonstrated for uncalibrated, out-of-range, silent and disconnected input | `NOT_EXECUTED` |

#### 5.1.6 Tolerance and evaluation method

Apply §4.4 with `T` = the row value above; speed evaluated in kn and m/s with the conversion recorded; angle
evaluated as the smallest angular difference (0–180°). Reference uncertainty at each point must be ≤ `T`/3.
Masthead motion is not simulated unless `REF-INSTALL-A` provides it; the plan must state which condition
(static bench or vessel) each result belongs to.

#### 5.1.7 Record keeping

§4.5 plus: mounting position, masthead height, alignment offset, heading reference, reference airflow
conditions, and whether the result is bench or vessel.

#### 5.1.8 Recalibration interval basis (`OPEN`)

`OPEN`. Decision inputs: sensing-element drift observed in validation; bearing wear data once the element is
selected; field complaint rate; consequence of an undetected wind error for the use cases (sailing
instrumentation, not navigation). No interval may be promised.

#### 5.1.9 Failure detection and invalid/stale display rules

Missing sentence/source, timeout, checksum/status failure, open/short cable where detectable, implausible
jump and adapter loss produce `FAULT`/`UNAVAILABLE`; value ages through `STALE` to `UNAVAILABLE`; a mechanical
single-point failure that still produces a plausible signal is documented as not detectable without
redundancy. True wind is invalid whenever vessel speed/heading is invalid or stale.

#### 5.1.10 Field replacement and re-calibration

Replace the element/interface, verify identity, then repeat §5.1.4 steps 2–8 in full. A masthead sensor
replacement always requires re-alignment; a below-deck interface replacement requires re-verification against
the reference and a new record.

---

### 5.2 `SENSE-POWER` — MAREA SENSE Power

#### 5.2.1 Measurement principle

An original measurement chain samples battery/system DC voltage and the voltage across a current-sensing
element (shunt or equivalent) to derive current, then power and energy by integration. Adapter mode reads a
documented third-party battery-monitor source. No battery chemistry model, state-of-charge algorithm or
charge-efficiency model is claimed; state of charge is `OPEN` and may not be displayed as reliable.

**Quantity, units and intended range (`PROPOSED`).** Voltage in volts; current in amperes; power in watts;
energy in ampere-hours and watt-hours. Intended range: 8–32 V DC and a ±100 A class current envelope whose
final class depends on the selected sensing element (`OPEN`). The range and every acceptance target are
`PROPOSED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`.

#### 5.2.2 Calibration prerequisites

- Sensing chain identified (voltage divider/scaling, shunt or current sensor, amplifier) with serial and
  firmware version; shunt/scale value known and recorded.
- `REF-DC-A` available with calibrated DMM, calibrated shunt and stable load; `REF-TIME-A`.
- A stable supply and a documented wiring configuration; fuse/breaker present.
- No charging source active during zero/span checks unless the test explicitly covers it.
- Temperature of the module and of the shunt recorded (resistance changes with temperature are a known
  error source and must be in the record).

#### 5.2.3 Reference equipment class

`REF-DC-A` and `REF-TIME-A`; `REF-INSTALL-A` for repeatability. A calibrated electronic load or a resistive
load bank is part of the class; its own uncertainty is in the record.

#### 5.2.4 Calibration procedure (intended steps)

1. Freeze the configuration and record the sensing-chain identity and scale values.
2. Zero check: no current flow, record voltage and current zero offsets.
3. Voltage verification at the `PROPOSED` points 8, 12, 16, 24 and 32 V against the reference.
4. Current verification at the `PROPOSED` points 0, 5, 10, 25, 50 and 100 A (or the selected class envelope),
   with at least three repeats at each point, using the reference shunt/load.
5. Energy verification: constant known load for a documented period; compare accumulated energy against the
   reference calculation; verify the counter behaviour on interruption (frozen with state, not silently
   reset).
6. Temperature effect: repeat at least one voltage and one current point at the low and high recorded
   temperature conditions (`PROPOSED` if a chamber is available; otherwise record ambient only).
7. Adapter mode: verify source identity, unit and sign convention, and the "unverified by MAREA" marker.
8. Demonstrate invalid, stale, out-of-range, reversed-polarity and open-shunt states where the design
   supports detection.
9. Write the calibration record.

#### 5.2.5 Acceptance criteria for future validation (`PROPOSED`)

| Criterion | `PROPOSED` target | Status |
| --- | --- | --- |
| Voltage error after calibration | ≤ 0.1 V or ≤ 1% of reading, whichever is greater | `NOT_EXECUTED` |
| Current error after calibration | ≤ 1% of reading or ≤ 0.1 A, whichever is greater | `NOT_EXECUTED` |
| Energy error over the test period | ≤ 2% | `NOT_EXECUTED` |
| Sign and zero | Charge/discharge sign correct; zero offset documented; no drift beyond tolerance during the session | `NOT_EXECUTED` |
| Adapter provenance | Source identity and "unverified by MAREA" marker present | `NOT_EXECUTED` |
| State behaviour | `INVALID`/`STALE`/`FAULT` demonstrated; energy counter interruption explicitly flagged | `NOT_EXECUTED` |

#### 5.2.6 Tolerance and evaluation method

Apply §4.4; `T` per row. For energy, `T` is evaluated over the whole test interval, not per sample. Current
evaluation includes the reference shunt tolerance and the load stability. Voltage/current points are
evaluated both at ambient and at the recorded temperature conditions; results from different conditions are
never merged into one claimed figure.

#### 5.2.7 Record keeping

§4.5 plus: shunt/scale value and its source; module and shunt temperature; load type and its calibration;
charge/discharge sign convention; energy test duration and reference calculation.

#### 5.2.8 Recalibration interval basis (`OPEN`)

`OPEN`. Decision inputs: drift of the voltage reference and shunt observed in validation; shunt temperature
coefficient; field return data; consequence of an undetected battery-state error (monitoring only, no
protection claim). No interval may be promised.

#### 5.2.9 Failure detection and invalid/stale display rules

Open/shorted sensing path where detectable, reversed polarity, out-of-range voltage/current, implausible
current step, missing adapter source and energy-counter inconsistency produce `FAULT`/`UNAVAILABLE`; values
age through `STALE` to `UNAVAILABLE`; energy counters are frozen with an explicit flag; a reset is an event,
never a silent zero. State of charge is not displayed as reliable at any time.

#### 5.2.10 Field replacement and re-calibration

A module replacement requires re-verification of voltage/current against `REF-DC-A`; a shunt or
current-sensing element replacement **always** requires full re-calibration and a new record because the
scale value changes. The consumer must show `STALE`/`UNAVAILABLE` during the replacement outage.

---

### 5.3 `SENSE-BILGE` — MAREA SENSE Bilge

#### 5.3.1 Measurement principle

A switch or contact input reports a discrete water-presence/high-water state; the module debounces and
timestamps the state and publishes `DRY`/`WATER_DETECTED`/`FAULT`/`UNKNOWN`. It is not a continuous level
sensor, not a certified bilge alarm and not a substitute for the vessel's required bilge-alarm arrangement.
An optional current-sensing input may detect pump running where the design supports it. There is no
metrological calibration: the obligation is commissioning verification and periodic functional testing.

**Quantity, units and intended range (`PROPOSED`).** A discrete state (`DRY`, `WATER_DETECTED`, `FAULT`,
`UNKNOWN`) with no physical unit for water presence; optional pump current in amperes and run-time in hours.
There is no metrological range: the switch actuation threshold is mechanical and is verified functionally,
not calibrated numerically. `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; no level in mm or litres is claimed.

#### 5.3.2 Calibration prerequisites

- The physical switch/contact installed and wired to the documented channel; channel identity and
  compartment label recorded.
- `REF-SWITCH-A` (actuation fixture) or, on the vessel, a documented physical test (water in the bilge or
  controlled float actuation) approved by the installer.
- `REF-TIME-A` for event timestamps.
- The consumer configured to show state, age and fault state; the expected notification path (if any)
  identified, with the WATCH dependency stated.
- A documented dry baseline and a documented wet/actuated condition.

#### 5.3.3 Reference equipment class

`REF-SWITCH-A` for bench verification and fault injection; `REF-TIME-A`; on-vessel verification uses the
physical condition and a documented procedure rather than a metrological reference. `REF-INSTALL-A` where a
bench fixture is used.

#### 5.3.4 Calibration procedure (intended steps)

1. Record the module, firmware, channel, compartment label and switch identity.
2. Dry baseline: confirm `DRY` with a known-dry switch; record state and timestamp.
3. Actuation: actuate the switch (water, controlled float or fixture) and confirm `WATER_DETECTED` within the
   documented debounce; repeat at least 20 actuation cycles (`PROPOSED`).
4. Fault injection: open circuit, short circuit and invalid state; confirm `FAULT` and confirm the value is
   **never** `DRY` when the input is unavailable.
5. Power/communication loss: confirm `UNKNOWN`/`UNAVAILABLE` with age; never `DRY`.
6. Notification path (where a WATCH is part of the installation): confirm the state propagates with the WATCH
   evidence state, and record that remote delivery is conditional and not a certified alarm.
7. Write the commissioning/calibration record.

#### 5.3.5 Acceptance criteria for future validation (`PROPOSED`)

| Criterion | `PROPOSED` target | Status |
| --- | --- | --- |
| State fidelity | Displayed state follows the physical switch in all 20 actuation cycles | `NOT_EXECUTED` |
| Fail-visible rule | With the input removed, open, shorted or the module offline, the state is `FAULT`/`UNKNOWN`/`UNAVAILABLE` — never `DRY` | `NOT_EXECUTED` |
| Debounce | No chattering state under the documented debounce in the test condition | `NOT_EXECUTED` |
| Stuck-dry limitation | The documentation and handover clearly state that a stuck-dry switch is not detectable without redundancy | `NOT_EXECUTED` |
| Notification boundary | Any configured remote notification is described as conditional and not a certified alarm | `NOT_EXECUTED` |

#### 5.3.6 Tolerance and evaluation method

No metrological tolerance applies. Evaluation is functional: count successful state transitions, count
fault-injection passes, verify the fail-visible rule. Any single failure is a procedure failure; a
single-point mechanical failure mode (stuck switch) is documented, not "tolerated".

#### 5.3.7 Record keeping

§4.5 plus: compartment label, switch identity, actuation method, number of cycles, fault-injection results,
and the notification path tested (or explicitly not tested).

#### 5.3.8 Recalibration interval basis (`OPEN`)

`OPEN`. This module needs a **functional-test basis**, not a calibration interval. Inputs for the future
decision: switch wear data, field detection history, installation environment, manufacturer guidance once a
switch is selected, and the consequence of a missed high-water event. No testing interval may be promised.

#### 5.3.9 Failure detection and invalid/stale display rules

Detect open/short circuit, invalid state, missing heartbeat and implausible transitions where the design
supports it. A stuck-dry switch is **not detectable without redundancy** and is documented. Whenever the
input or module is unavailable, the state is `UNKNOWN`/`UNAVAILABLE` with age and is never `DRY`. The module
does not generate remote notifications by itself; a WATCH is required and remains conditional.

#### 5.3.10 Field replacement and re-calibration

Replace switch and/or module, verify identity, then repeat §5.3.4 steps 2–6 in full and write a new record.
The fail-visible rule must be re-demonstrated after every replacement.

---

### 5.4 `SENSE-TANKS` — MAREA SENSE Tanks

#### 5.4.1 Measurement principle

The module reads a documented tank-sender input (variable resistance, voltage or current loop as selected and
documented) and converts it into percentage of usable capacity and, where a tank table is configured, volume.
The sender and tank geometry dominate the result; the MAREA conversion is the part that can be calibrated and
recorded. It is not a legal-metrology or fuel-management instrument, and no fuel-consumption claim is made.

**Quantity, units and intended range (`PROPOSED`).** Level as a percentage of usable capacity and, where a
tank table is configured, volume in litres or cubic metres; raw sender values for diagnostics. Intended
range: 0–100% of usable capacity; supported sender input classes (variable resistance, voltage, current loop)
are `OPEN` pending selection (`H-11`). The range and every acceptance target are `PROPOSED`;
`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`.

#### 5.4.2 Calibration prerequisites

- Tank identity, nominal capacity, usable capacity, geometry description and sender identity/type recorded.
- A documented sender input class; for a variable-resistance sender, its empty/full values and any known
  non-linearity; for a voltage/current sender, its range.
- `REF-LEVEL-A` physical reference (sight glass, calibrated dip tape or weighing) and a documented fill/drain
  method; `REF-TIME-A`.
- Safe handling of the tank contents (fuel or waste) per the vessel and installer rules; no open flame; the
  work is intended to require a professional.
- The HUB/consumer configured to show percentage, tank table version and quality state.

#### 5.4.3 Reference equipment class

`REF-LEVEL-A`; `REF-TIME-A`; `REF-INSTALL-A` for repeatability. The physical reference must be independent of
the sender being calibrated.

#### 5.4.4 Calibration procedure (intended steps)

1. Record tank identity, capacity, geometry, sender identity and input class; freeze the configuration.
2. Establish the empty point against the physical reference (documented "empty" definition) and record the
   sender value.
3. Establish the full point against the physical reference and record the sender value.
4. Establish at least three intermediate points (`PROPOSED`: 25%, 50%, 75% of usable capacity) against the
   physical reference and record sender values.
5. Build or verify the tank table (shape/volume table) from the points and the documented geometry; record
   the table version.
6. Verify the low-level warning threshold if configured (a threshold is not a certified alarm and does not
   replace a required arrangement).
7. Demonstrate invalid, stale, out-of-range, missing-table and disconnected-sender states.
8. Write the calibration record, including the physical method used.

#### 5.4.5 Acceptance criteria for future validation (`PROPOSED`)

| Criterion | `PROPOSED` target | Status |
| --- | --- | --- |
| Percentage error after calibration, defined-geometry tank | ≤ 5% of usable capacity at every checked point | `NOT_EXECUTED` |
| Percentage error, irregular tank | ≤ 10% of usable capacity at every checked point | `NOT_EXECUTED` |
| Trend honesty | Level never presented as a precise volume when the sender is out of range or the table is missing | `NOT_EXECUTED` |
| Reference independence | Physical reference independent of the sender; method recorded | `NOT_EXECUTED` |
| State behaviour | `INVALID`/`STALE`/`FAULT` demonstrated; no full/empty value from a lost sender | `NOT_EXECUTED` |
| Sender-class matrix | Each supported sender class verified on a reference tank before being listed | `NOT_EXECUTED` |

#### 5.4.6 Tolerance and evaluation method

Apply §4.4 with `T` = the applicable percentage target, evaluated against the physically established level,
converted to volume using the documented tank table. The evaluation must state whether the error is
dominated by the sender, the geometry or the conversion; a result that passes only because the tank is
roughly rectangular must be labelled accordingly and not generalised.

#### 5.4.7 Record keeping

§4.5 plus: tank capacity and geometry; sender empty/full values; fill/drain method; points in percentage and
volume; tank table version; physical-reference method and its own uncertainty statement; content type
(fresh water, fuel, waste).

#### 5.4.8 Recalibration interval basis (`OPEN`)

`OPEN`. Inputs: sender drift and wear, tank-table stability, fluid type, field complaint rate, consequence of
a wrong level (monitoring only; no fuel-management or safety claim). A re-calibration is mandatory after any
sender replacement or tank geometry change; no periodic interval may be promised.

#### 5.4.9 Failure detection and invalid/stale display rules

Detect sender open/short, out-of-range resistance/voltage, implausible step, missing tank table, per-tank
source loss and adapter loss. A stuck sender reading a plausible value is not detectable without a reference;
this is documented. A lost sender produces `UNAVAILABLE`, never a full/empty percentage. Low-level warnings
are conditional and, for remote delivery, depend on WATCH; they are not a certified alarm.

#### 5.4.10 Field replacement and re-calibration

A sender replacement always requires re-calibration against `REF-LEVEL-A` (or an equivalent documented
physical reference) and a new tank-table version if the geometry or sender changed. A module replacement
requires re-verification of the tank table; where configuration export/import is not verified (`OPEN`),
re-calibration is mandatory. The consumer shows `STALE`/`UNAVAILABLE` during the outage.

---

### 5.5 `SENSE-ENV` — MAREA SENSE Environment

#### 5.5.1 Measurement principle

An original environmental sensing element measures ambient temperature, relative humidity and barometric
pressure at the installed location; dew point is derived from temperature and humidity. Adapter mode reads a
documented third-party environment source. It is not a weather forecast, not a fire/gas/CO detector and not a
certified safety device.

**Quantity, units and intended range (`PROPOSED`).** Temperature in degrees Celsius, relative humidity in
percent RH, pressure in hectopascals, derived dew point in degrees Celsius. Intended range: −20…+60 °C,
0–100% RH and 300–1100 hPa; a higher-temperature engine-space variant is `OPEN`. The range and every
acceptance target are `PROPOSED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`.

#### 5.5.2 Calibration prerequisites

- Sensing element, interface and installed location recorded; placement conditions documented (away from
  heat sources, sun, spray, bilge water).
- `REF-ENV-A` calibrated thermometer, hygrometer and barometer, or a climatic chamber with traceable
  references; `REF-TIME-A`.
- Stabilisation time at the test condition before reading; condensation/precipitation avoided.
- The consumer configured to show dew point, state and freshness.

#### 5.5.3 Reference equipment class

`REF-ENV-A` and `REF-TIME-A`; `REF-INSTALL-A` for placement repeatability. Where a chamber is not available,
the plan records that only ambient-condition comparison was performed and that the chamber points are
`NOT_EXECUTED`.

#### 5.5.4 Calibration procedure (intended steps)

1. Record the element, location, firmware and configuration.
2. Compare temperature, relative humidity and pressure against the reference at ambient conditions, with a
   documented stabilisation period and at least three repeats.
3. Where a chamber is available, repeat at `PROPOSED` temperature points (−10 °C, 20 °C, 40 °C) and
   `PROPOSED` humidity points (30%, 50%, 80% RH), plus at least two pressure points.
4. Verify derived dew point against the value calculated from the reference temperature/humidity; dew point
   is invalid when either input is invalid or stale.
5. Demonstrate invalid, stale, out-of-range and disconnected states.
6. For adapter mode: verify source identity, units and "unverified by MAREA" marker; no source calibration.
7. Write the calibration record, stating which conditions were actually covered.

#### 5.5.5 Acceptance criteria for future validation (`PROPOSED`)

| Criterion | `PROPOSED` target | Status |
| --- | --- | --- |
| Temperature error after verification | ≤ 0.5 °C over the stated range | `NOT_EXECUTED` |
| Relative humidity error after verification | ≤ 3–5% RH over the stated range | `NOT_EXECUTED` |
| Pressure error after verification | ≤ 2 hPa over the stated range | `NOT_EXECUTED` |
| Derived dew point | Consistent with the reference calculation; invalid when an input is stale | `NOT_EXECUTED` |
| Placement sensitivity | The effect of the installed location is recorded and bounded in the handover | `NOT_EXECUTED` |
| State behaviour | `INVALID`/`STALE`/`FAULT` demonstrated | `NOT_EXECUTED` |

#### 5.5.6 Tolerance and evaluation method

Apply §4.4 with `T` per row; each quantity evaluated independently. Results at chamber conditions are
reported separately from ambient-only results. Dew point is evaluated as a derived quantity and never as an
independent measurement.

#### 5.5.7 Record keeping

§4.5 plus: installation location and placement conditions; chamber/ambient conditions; stabilisation time;
reference model and its certificates; which points were covered and which were not.

#### 5.5.8 Recalibration interval basis (`OPEN`)

`OPEN`. Inputs: sensing-element stability (datasheet and observed drift), placement environment
(condensation, heat, salt), field complaint rate, consequence of an undetected environmental error
(monitoring and comfort, not a safety or navigation function). No interval may be promised.

#### 5.5.9 Failure detection and invalid/stale display rules

Missing sensor, communication error, out-of-range value, implausible rate of change and condensation/soaking
indication where the element supports it produce `FAULT`/`UNAVAILABLE`; values age through `STALE` to
`UNAVAILABLE`; derived dew point is invalid whenever either input is invalid or stale.

#### 5.5.10 Field replacement and re-calibration

Replace the element/module, verify identity and placement, then repeat §5.5.4 steps 2–6. Where the selected
element is factory-calibrated, the replacement still requires reference verification and a new record; no
field span adjustment is claimed unless the design supports it and the procedure is evidenced.

---

## 6. Requirement-to-verification matrix

Each requirement in this plan maps to the future verification method that would close it. "Owner" is a
function, not a person. No row is verified at MC-06.

| ID | Requirement | Future verification method | Evidence artefact | Owner | Gate |
| --- | --- | --- | --- | --- | --- |
| CAL-R-01 | Each module has a documented measurement principle, range and units | Engineering review of the selected sensing chain against §5 | Signed module design note + BOM | Hardware engineering | H-11 |
| CAL-R-02 | Each module has a defined reference equipment class and a traceable reference available | Reference equipment register with certificates and uncertainty | Reference register + certificates | Calibration/service operations | H-05 |
| CAL-R-03 | The calibration procedure is complete, reproducible and versioned | Independent operator executes the procedure from the document alone; discrepancies recorded | Procedure version + execution report | SENSE Product + service ops | H-05 |
| CAL-R-04 | A calibration record is created, complete and exportable | Record-template audit against §4.5 on a real execution | Sample record(s) + export test | Service operations | P-05 |
| CAL-R-05 | Acceptance criteria are explicit and `PROPOSED` only | Review that every criterion is marked `PROPOSED` and no achieved figure is published | Reviewed procedure + claims check | SENSE Product | X-01 |
| CAL-R-06 | Tolerance and evaluation method include uncertainty and TAR | Review of the evaluation sheet; `U_ref ≤ T/3` demonstrated at every point | Evaluation sheet | Hardware engineering | H-05 |
| CAL-R-07 | Repeatability and drift checks are performed and recorded | Repeated calibration sessions; drift plot over time | Session records + drift report | Hardware engineering | P-05 |
| CAL-R-08 | Uncalibrated values are displayed as invalid, not as data | Uncalibrated device test in a consumer (HUB/bench display) | UI/data-contract test record | Integration + engineering | P-02 |
| CAL-R-09 | Stale and unavailable states follow the documented thresholds | Fault injection: source loss, delay, silence | Fault-injection test record | Integration + engineering | P-02 |
| CAL-R-10 | Failure detection is verified per module, including the documented undetectable cases | Fault-injection matrix per module | Fault-injection matrix + results | Hardware engineering | H-05 |
| CAL-R-11 | Field replacement procedure is complete and re-calibration mandatory where required | Execute replacement on a bench/reference installation | Replacement test record | Service operations | P-05 |
| CAL-R-12 | Re-calibration interval decision basis is recorded (`OPEN` until then) | Decision note citing drift, datasheet stability, field data and consequence | Interval decision note | SENSE Product + quality | P-05 |
| CAL-R-13 | Installation and environmental conditions are recorded per calibration | Audit of records for condition fields | Record audit | Service operations | H-05 |
| CAL-R-14 | Originals and adapters are distinguishable in data and UI | Adapter-mode test: source identity and "unverified by MAREA" marker | Adapter test record | Integration | P-02 |
| CAL-R-15 | Timestamps are UTC and age is computed correctly | Time-source and staleness test using `REF-TIME-A` | Timestamp test record | Integration | P-02 |
| CAL-R-16 | Bilge fail-visible rule (never `DRY` when unavailable) is demonstrated | Fault injection and comprehension test | Test record + handover script | Hardware + UX | P-05 |
| CAL-R-17 | Tank calibration is verified against an independent physical reference | Reference-tank calibration with sight glass/dip/weighing | Tank calibration record | Hardware engineering | P-05 |
| CAL-R-18 | No parser, unit-test or simulated result is presented as measurement evidence | Evidence review of all claims and dossier text | Review note + claims register entry | SENSE Product + reviewer | P-10 |
| CAL-R-19 | Measurement provenance reaches the consumer (units, quality, calibration, freshness) | End-to-end HUB integration test | Integration test record | HUB integration owner | P-02 |
| CAL-R-20 | Calibration records are retained, exported and transfer with the vessel | Lifecycle test: export, ownership-transfer simulation, retention policy review | Export artefacts + policy | Service operations + legal | X-07 |
| CAL-R-21 | Environmental/ingress evidence exists before any exposure claim | Accredited or pre-compliance environmental test on the article | Test report | Hardware + compliance | H-05 |
| CAL-R-22 | Conformity evidence exists before any compliance claim | Applicability review, laboratory results, technical file, EU declaration of conformity | Technical file + DoC | Compliance | H-06 |
| CAL-R-23 | Remote notification (where claimed) is evidenced end to end and described as conditional | WATCH end-to-end delivery test under network loss | WATCH evidence package | WATCH owner | P-06 |
| CAL-R-24 | No accuracy, ingress or alarm claim is published without the evidence above | Independent claims audit of all published and internal copy | Claims audit record | Independent reviewer | X-01 |

---

## 7. Open items register (this plan)

| ID | Open item | Consequence | Closing evidence |
| --- | --- | --- | --- |
| O-01 | No SENSE sensing element, sender or enclosure selected | No calibration can be specified to component level | `H-11` selection + BOM |
| O-02 | No reference equipment held or procured | No calibration can be executed | Reference register + certificates |
| O-03 | No calibration bench or fixture | Procedures cannot be exercised reproducibly | Bench description + fixture validation |
| O-04 | Re-calibration intervals not decided | No interval, service plan or cost can be quoted | Interval decision note (CAL-R-12) |
| O-05 | Calibration service and competence scheme not defined | Professional calibration cannot be offered or promised | Service design + competence scheme |
| O-06 | HUB data contract not frozen | Provenance, quality and freshness cannot be verified end to end | D5 contract + integration test (CAL-R-19) |
| O-07 | Configuration export/import not verified | Replacement may force full re-calibration; must be stated | Export/import test |
| O-08 | WATCH not built | Remote notification remains `BLOCKED` and conditional | WATCH evidence package (`P-06`) |
| O-09 | No conformity programme | Calibration evidence cannot support a conformity claim | `H-06` programme |
| O-10 | No customer or installer discovery | Field procedure and training are unvalidated | `X-06` discovery |

---

## 8. Non-assertions and document status

This plan does **not** assert, and must not be read as asserting: any achieved accuracy, resolution,
repeatability or drift figure; any calibration or verification result; the existence of any sensor, sender,
fixture, reference instrument, calibration service or competent technician; any ingress-protection class or
environmental performance; NMEA 2000 capability; any certified alarm, safety or distress function; any
battery-management, legal-metrology or fuel-management function; any navigation function; any test report,
certificate or declaration; any available product, price, installation time or service level.

Status of this deliverable: `INTERNAL`, `DEFINED PLAN`, `NOT EXECUTED`. It defines how SENSE measurements
would be calibrated and verified, and it does not calibrate, approve, certify or make any SENSE module
orderable.
