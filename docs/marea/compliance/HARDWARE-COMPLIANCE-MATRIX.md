# MC-02 — Hardware Commercialisation, Safety and Protocol-Rights Assessment

Document ID: MC-02-D-HW
Milestone: MC-02 (technology, IP, licensing and commercial-reuse audit of OPEN-MARINE)
Programme: MAREA / EMBARCARTE
Date of record: 2026-10-30
Author role: Agent D — marine hardware and safety analyst
Status: AUDIT COMPLETE — determinations are advisory; no conformity, certification or approval is asserted
Classification: Internal — pre-contractual; not customer-facing marketing material

---

## 0. Control, method and evidence conventions

### 0.1 Subject repositories

| Ref | Repository | Revision audited | Access |
|---|---|---|---|
| OM | `C:\Users\Admin\Documents\workspace\open-marine` | `403941b8860439115418b1786d8431284d2dae08` (main) | Read-only |
| EB | `C:\Users\Admin\Documents\workspace\embarcarte` | branch `feature/marea-mc02-technology-audit`; this file is the only write | Write (single file) |

Related MC-02 deliverables produced by other auditors and cross-referenced here, not duplicated:

- `EB:docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv` — per-component software licence inventory (used for OMI unlicensed status, AIS-catcher GPL-3.0, MicroPython MIT and the Python dependency licences).
- `EB:docs/marea/compliance/MARINE-DATA-RIGHTS-MATRIX.csv` — chart/data rights; outside the hardware scope of this document.

Evidence notation used throughout:

- `OM:<path>:<line>` — a line in the OPEN-MARINE repository at the revision above.
- `EB:<path>` — a file in the EMBARCARTE repository.
- `S-xx` — an external source listed in section 6.2, all retrieved on 2026-10-30.
- `HW-xx` — a hardware component identifier from section 2.
- `F-Axx` — an autopilot safety feature identifier from section 3.
- `R-xx` — a protocol/standards risk identifier from section 4.5.
- `C-xx` — an EU/Spain compliance determination identifier from section 5.4.

### 0.2 Audit method and stated limits

This assessment was produced by reading source code, configuration, deployment scripts and repository documentation, and by consulting official EU, Spanish, NMEA, Signal K and open-source-project sources. The following were **not** done, deliberately:

- No hardware was energised, connected, flashed, probed or actuated.
- No motor, steering, PWM, GPIO, relay or actuator command was issued.
- No radio, CAN, NMEA 2000/0183, serial or USB traffic was generated, captured or replayed.
- No Pico 2 CLI, bench profile, HIL session, commissioning script or production launcher was executed.
- No firmware was compiled or installed.
- No measurement, photograph, oscilloscope trace, test report or sea trial exists in either repository to be relied on.

Consequently every hardware-behaviour statement below is a statement about **code and documentation**, not about a built or operated article. Where no physical evidence exists the label `PHYSICAL_TEST_NOT_VERIFIED` is used.

### 0.3 Evidence classes for behaviour claims

| Code | Meaning |
|---|---|
| E1 | IMPLEMENTED_IN_CODE — logic exists and is reachable in the audited source |
| E2 | AUTOMATED_TEST — covered by an automated test in the repository |
| E3 | SIMULATED — exercised only against the in-process simulator |
| E4 | BENCH_TESTED — supported by a bench log/report (none exist in the repository) |
| E5 | REAL_VESSEL_TESTED — supported by a sea-trial log/report (none exist) |
| E6 | INDEPENDENTLY_VERIFIED — assessed by an independent party (none exist) |
| E7 | NOT_EVIDENCED — no artefact in either repository |
| PTNV | PHYSICAL_TEST_NOT_VERIFIED — physical behaviour asserted only by design/documentation |

### 0.4 Evidence classes for hardware facts

| Code | Meaning |
|---|---|
| ID_CODE | Component identified only as a string or pin reference in code/config |
| ID_DOCS | Component identified in repository documentation only |
| MODEL_RECORDED | Exact manufacturer model/revision is recorded in the repository |
| MODEL_NOT_RECORDED | Manufacturer or part number is absent or generic |
| MFR_DOC_VERIFIED | Manufacturer documentation retrieved and read during this audit |
| MFR_DOC_NOT_VERIFIED | Manufacturer documentation not retrieved or not available |
| NO_ARTICLE | Component is required by design but does not exist in the repository at all |

### 0.5 Regulatory determination codes

| Code | Meaning |
|---|---|
| CLEARLY_APPLICABLE | the act's own scope test is met on the facts recorded here |
| POTENTIALLY_APPLICABLE | scope depends on a design/market decision not yet frozen |
| NOT_APPLICABLE_WITH_EXPLANATION | scope test is not met for the stated configuration |
| NOT_YET_ASSESSABLE | insufficient product definition to test scope |

No determination in this document is a legal opinion. Any cell that would require statutory interpretation is marked `LEGAL_REVIEW_REQUIRED`.

---

## 1. Executive determination

### 1.1 Headline results

| Item | Result |
|---|---|
| Hardware components identified in the audited revision | 13 identified (only one with an exact manufacturer part number, none with a board revision; 11 are generic or unrecorded), plus 3 required components that do not exist in the stack at all |
| Hardware evidence of physical build/test in either repository | None (no logs, reports, measurements, BOM or serial records) |
| MAREA PILOT commercialisation safety gate | **BLOCKED** — see section 3.7 |
| Protocol/standards rights | 1 critical, 4 high, 6 medium, 1 low risk (R-01 to R-12); no NMEA 2000 certification, no NMEA licence, no NMEA 2000 implementation |
| EU/ES applicability over 9 product families × 9 regimes (81 cells) | 33 CLEARLY_APPLICABLE, 10 POTENTIALLY_APPLICABLE, 37 NOT_APPLICABLE_WITH_EXPLANATION, 1 NOT_YET_ASSESSABLE |
| Conformity/certification evidence held | None. No CE marking, no EU declaration of conformity, no test report, no notified-body certificate, no NMEA certificate, no wheel-mark approval exists or is claimed |
| Cross-cutting critical finding | OPEN-MARINE grants no licence to reuse: there is no `LICENSE`/`COPYING`/`NOTICE` file, no workspace declares an outbound licence except `marine-tile-server` (`ISC`), and six of the eight `package.json` files are additionally marked `private`. Commercial reuse needs written permission. Cross-checked against `EB:docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv`, which records the same position per workspace |

### 1.2 Lifecycle position of every hardware-bearing family

Per the MAREA lifecycle scale (`EB:docs/marea/COMMERCIAL-PORTFOLIO.md:141-147`), every hardware family (HUB, AIS, PILOT, SENSE, WATCH, DISPLAY) is at **CONCEPT/DEFINED**, with no evidence reaching **ENGINEERING VERIFIED**, and none at **REGULATORY READY**.

---

## 2. Hardware inventory (mandate section 12)

### 2.1 Component register

| ID | Component | Role in the audited stack | Model / revision | Manufacturer | Evidence | Class |
|---|---|---|---|---|---|---|
| HW-01 | Single-board computer ("Raspberry Pi") | Runs Signal K, UI, autopilot engine, chart engine as systemd services | **Not recorded** — only the generic string "Raspberry Pi" and a `/proc/device-tree/model` prefix check | Raspberry Pi Ltd (inferred from the only named platform; MAC addresses are recorded in docs but OUI ownership is not verified in this audit) | `OM:docs/RASPBERRY_DEPLOYMENT.md:3`, `OM:docs/RASPBERRY_CONNECTION.md:12-15`, `OM:marine-sensor-gateway/rpi/omi-imu/setup.sh:24-32` | ID_DOCS; MODEL_NOT_RECORDED; MFR_DOC_NOT_VERIFIED |
| HW-02 | Pico 2 microcontroller board (RP2350) | Real-time PWM/DIR bridge and heartbeat/E-stop supervision between the Pi and the motor driver | "Pico 2"; the vendor product portal lists SC1631/SC1632 identifiers; board revision not recorded | Raspberry Pi Ltd | `OM:marine-autopilot-engine/pico2/README.md:6-8`, `OM:marine-autopilot-engine/pico2/main.py:22-28`, `OM:marine-autopilot-engine/pico2/pico_motor_cli.py:17` | ID_CODE + ID_DOCS; MODEL_RECORDED (family); MFR_DOC_NOT_VERIFIED |
| HW-03 | MD30C R2 brushed-DC motor driver | Power H-bridge driven by PWM+DIR from the Pico | "MD30C R2"; revision not recorded beyond "R2" | Cytron Technologies (inferred from product name only) | `OM:marine-autopilot-engine/pico2/README.md:6-8`, `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:46-48`, `:82-103` | ID_DOCS; MODEL_NOT_RECORDED; MFR_DOC_NOT_VERIFIED |
| HW-04 | ST3000 autopilot drive (12 V brushed DC, two-wire) | Steering actuator for the intended real pilot | "Autohelm/Nautech 3000"; no part number, winding data, torque, current or age recorded | Autohelm / Nautech (legacy brand; current brand ownership and support status not verified in this audit) | `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:5-7`, `OM:marine-autopilot-engine/pico2/README.md:1`, `:77-79` | ID_DOCS; MODEL_RECORDED (family name only); MFR_DOC_NOT_VERIFIED |
| HW-05 | NMEA 0183 wind sensor | Apparent/true wind input over RS-422/RS-232 style serial at 4800 baud | **Not recorded** — only `WIND_DEVICE`, `WIND_BAUD=4800`, because the parser accepts MWV/MWD | Not recorded | `OM:docs/WIND_GPS_DEMO.md:25-41`, `OM:config/omi.env.example:28-33`, `OM:marine-sensor-gateway/rpi/wind/wind_nmea.py:58-95` | ID_DOCS; MODEL_NOT_RECORDED; MFR_DOC_NOT_VERIFIED |
| HW-06 | USB GNSS receiver | Position, SOG, COG, magnetic variation input | "G-Mouse DL28U9U GPS" as a published source label; chipset not recorded | Not recorded (generic G-Mouse ODM product) | `OM:marine-sensor-gateway/rpi/omi-imu/02_publish_gps_signalk.py:35-37`, `OM:marine-sensor-gateway/rpi/omi-imu/01_test_gps.py:40-51`, `:78-95` | ID_CODE; MODEL_RECORDED (marketing string); MFR_DOC_NOT_VERIFIED |
| HW-07 | ICM-20948 9-axis IMU on a "MacArthur HAT" | Heading (magnetic), roll/pitch, accelerometer/gyroscope/magnetometer source | ICM-20948; I2C address expected `0x69`, fallback `0x68`; HAT revision not recorded | TDK InvenSense (sensor); HAT vendor not named in code (OpenPlotter "MacArthur HAT" per code comment) | `OM:marine-sensor-gateway/rpi/omi-imu/setup.sh:63-74`, `OM:marine-sensor-gateway/rpi/omi-imu/02_publish_signalk.py:16`, `:32-34` | ID_CODE; MODEL_RECORDED (sensor); MFR_DOC_NOT_VERIFIED |
| HW-08 | RTL-SDR USB receiver dongle | AIS reception (receive-only) feeding AIS-catcher, which emits NMEA 0183 over UDP 10110 | **Not recorded** — detection regex accepts `RTL-SDR`, `RTL28xx`, `R820T`, `R828D`, `Realtek` | Not recorded (generic RTL2832U-class dongle family implied by detection strings only) | `OM:scripts/start-ais.sh:61-79`, `OM:docs/RASPBERRY_CONNECTION.md:41-42`, `:129-133` | ID_CODE; MODEL_NOT_RECORDED; MFR_DOC_NOT_VERIFIED |
| HW-09 | NMEA 2000 interface / transceiver / HAT | Intended marine CAN backbone connectivity | **Absent** — only a TypeScript type declaration (an interface union of `socketcan`, `pcan`, `usbcan` and `native`) and a no-op actuator stub | Not applicable | `OM:marine-sensor-gateway/src/adapters/nmea2000.ts:1-25`, `OM:marine-autopilot-engine/src/actuators/backends/can-backend.ts:1-47` | NO_ARTICLE |
| HW-10 | NMEA 0183 interface / HAT / opto-isolator | Wired NMEA 0183 bus connection | **Absent** — only a TypeScript type declaration (`Nmea0183PortConfig`) and USB-serial adapters assumed by the Python scripts | Not applicable | `OM:marine-sensor-gateway/src/adapters/nmea0183.ts:1-27`, `OM:marine-sensor-gateway/rpi/wind/wind_nmea.py:1-113` | NO_ARTICLE |
| HW-11 | Display hardware | MAREA DISPLAY is intended as a dedicated marine display | **Absent** — the only display is the Angular UI rendered in a browser on customer devices | Not applicable | `OM:README.md:3`, `OM:docs/RASPBERRY_DEPLOYMENT.md:1-3`, `:10` | NO_ARTICLE |
| HW-12 | Power and electrical interfaces | 12 V dedicated motor circuit with 12 A fuse/breaker for the ST3000; Pico powered over USB from the Pi; Hall current sensor on ADC0 | Fuse rating recorded (12 A); no DC-DC converter, isolation, TVS, reverse-polarity or grounding design recorded | Not recorded | `OM:marine-autopilot-engine/pico2/README.md:77-79`, `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:105-127`, `:153-171` | ID_DOCS; MODEL_NOT_RECORDED; PTNV |
| HW-13 | External E-stop and power contactor/relay | Physical motor-power cut plus a monitored NC auxiliary contact into Pico GP13 | **No part, rating, model or channel architecture recorded**; firmware does not drive a relay | Not recorded | `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:129-151`, `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:76-81`, `OM:marine-autopilot-engine/pico2/main.py:24`, `:35-37`, `:51-58` | ID_DOCS; MODEL_NOT_RECORDED; PTNV |
| HW-14 | Hall-effect current sensor (conditioned 0-3.3 V) | Motor current feedback for overcurrent guard and calibration | **No part or sensitivity recorded**; `VoltsPerAmp` must be entered from a datasheet that is not in the repository | Not recorded | `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:153-182`, `OM:marine-autopilot-engine/pico2/build_config.py:40-62` | ID_DOCS; MODEL_NOT_RECORDED; MFR_DOC_NOT_VERIFIED |
| HW-15 | Small unloaded bench DC motor | bench-motor profile testing only | **No part or rating recorded** | Not recorded | `OM:marine-autopilot-engine/pico2/README.md:81-103`, `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:200-211` | ID_DOCS; MODEL_NOT_RECORDED; PTNV |
| HW-16 | Cables, connectors and network adapters | USB link Pi↔Pico; UART 115200 8N1 on `/dev/ttyAMA0`; GND/PWM/DIR logic wiring; USB-serial adapters for GPS and wind; Ethernet/Wi-Fi LAN | **Not recorded** — no cable specification, connector type, length, screening or ingress rating | Not recorded | `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:14-18`, `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:82-93`, `OM:docs/RASPBERRY_CONNECTION.md:1-15`, `:135-152` | ID_DOCS; MODEL_NOT_RECORDED; MFR_DOC_NOT_VERIFIED |

### 2.2 Commercial integration restrictions

| ID | Restrictions recorded or implied | Evidence |
|---|---|---|
| HW-01 | No hardware model means no validated thermal, power, storage-lifetime, ingress or vibration envelope. Deployment assumes a systemd/Docker host with USB and UART availability and `/dev/ttyAMA0` on the 40-pin header. The repository excludes `tools/ais-catcher` from the deployment copy, so the AIS binary is built/downloaded on the target. | `OM:scripts/migrate-to-raspberry.sh:312-339` |
| HW-02 | Pico must be running a MicroPython build exposing USB "Board in FS mode" for `mpremote` deployment and a `/dev/serial/by-id/usb-MicroPython_Board_in_FS_mode_*-if00` node for host control. Exactly one board must be present or the CLI refuses. No board-level power, decoupling or protection design is recorded. | `OM:marine-autopilot-engine/pico2/install.sh:9`, `:52-57`, `OM:marine-autopilot-engine/pico2/pico_motor_cli.py:27-31` |
| HW-03 | External-PWM mode must be configured (`JP6 = EXT PWM`); logic connector is GND/PWM/DIR only; no 3V3 or 5V feed; power current must not be routed through a breadboard; ground must be common with the Pico. | `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:82-103`, `:105-127` |
| HW-04 | Legacy drive with no recorded datasheet: torque, rated current, stall current, duty cycle, brush condition, insulation and encoder/feedback absence are unknown. A 12 A fuse is a design assumption, not a verified rating. | `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:38-42`, `OM:marine-autopilot-engine/pico2/README.md:77-79` |
| HW-05 | Only MWV and MWD are parsed; MWV `status` must be `A`; speed units N/K/M accepted; anything else raises or is ignored. | `OM:marine-sensor-gateway/rpi/wind/wind_nmea.py:46-95` |
| HW-06 | Only RMC/GGA/GSA/GSV/VTG are parsed; NMEA baud default 9600; device is auto-detected from `/dev/ttyACM*` or `/dev/ttyUSB*`; no explicit device identity is validated. | `OM:marine-sensor-gateway/rpi/omi-imu/01_test_gps.py:36-51`, `:78-95` |
| HW-07 | Requires I2C bus 1 and address 0x69 (0x68 tolerated with a warning); depends on the third-party `icm20948` Python package; heading is a complementary-filter magnetometer heading with **no hard-iron/soft-iron calibration and no deviation table anywhere in the repository**. | `OM:marine-sensor-gateway/rpi/omi-imu/setup.sh:34-74`, `OM:marine-sensor-gateway/rpi/omi-imu/02_publish_signalk.py:64-120` |
| HW-08 | Requires a working RTL-SDR enumerated by AIS-catcher; if none is detected the service exits 0 without opening serial ports; AIS-catcher is downloaded from `releases/latest` or cloned from the default branch with no version pin, hash or signature check. | `OM:scripts/start-ais.sh:61-79`, `OM:scripts/init.sh:726-771`, `:788-841` |
| HW-09 | No NMEA 2000 hardware is present in the audited revision. Any MAREA NMEA 2000 SKU would need a new BOM item, a licensed NMEA 2000 implementation and NMEA product certification. | `OM:marine-sensor-gateway/src/adapters/nmea2000.ts:1-25` |
| HW-10 | No galvanically isolated NMEA 0183 interface is present; the Python publishers open USB serial directly. Opto-isolation, ground-loop and lightning/surge protection are unaddressed. | `OM:marine-sensor-gateway/rpi/wind/wind_nmea.py:1-113`, `OM:marine-sensor-gateway/rpi/omi-imu/setup_gps.sh:67-84` |
| HW-11 | No display hardware design exists; sunlight legibility, ingress, vibration, touch-in-wet-glove, thermal and power design for a cockpit display are unaddressed. | `EB:docs/marea/COMMERCIAL-PORTFOLIO.md:84-92` |
| HW-12 | Power architecture is described only as prose: fused 12 V to the driver, USB to the Pico, common logic ground. No system-level fuse coordination, no isolation between charger/battery grounds, no supply-voltage transient protection record, no battery-backed shutdown. | `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:105-127` |
| HW-13 | The E-stop requires two independent circuits: a power contactor that physically breaks 12 V, and an auxiliary NC contact to GP13. The firmware only monitors GP13 (pull-up, open = stop) and never drives the power contactor. | `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:129-151`, `:24-25`, `OM:marine-autopilot-engine/pico2/main.py:35-37` |
| HW-14 | Sensitivity must be taken from the sensor datasheet (`VoltsPerAmp`); output must be conditioned strictly to 0-3.3 V; sensor supply voltage is not assumed; calibration is stored on the Pi and required before non-bench profiles will install. | `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:153-182`, `OM:marine-autopilot-engine/pico2/build_config.py:45-63` |
| HW-15 | bench-motor must be used only with a small, unloaded, mechanically secured DC motor, a limited supply or correctly rated fuse, and never with the ST3000, HIL, Signal K or the real pilot. Current is intentionally unavailable. | `OM:marine-autopilot-engine/pico2/README.md:81-121` |
| HW-16 | The documented links are: USB to the Pico (also the power path), UART `/dev/ttyAMA0` configured with `stty`, GND/PWM/DIR logic wiring that must not exceed 3.3 V, and USB-serial adapters auto-detected by device glob. No screening, strain relief, connector locking, bundling with power cables, or IP rating is specified. | `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:82-93`, `OM:marine-sensor-gateway/rpi/omi-imu/01_test_gps.py:78-95`, `OM:marine-sensor-gateway/rpi/wind/wind_nmea.py:1-113` |

### 2.3 Manufacturer documentation and component-level certification status

| ID | Manufacturer documentation | Component-level certification evidence |
|---|---|---|
| HW-01 | Not retrieved in this audit (no model recorded, so no datasheet can be matched). Raspberry Pi publishes compliance documentation for its own products, but none is captured in either repository. | None held. Supplier CE/UKCA/RoHS declarations are not in the repository. |
| HW-02 | Vendor product portal exposes Pico 2 datasheet, pinout, product brief and a "Compliance" document subcategory (`S-22`); the datasheet PDF itself was **not retrieved** (`S-23`, not retrieved in this audit). | None held. No declaration of conformity captured. |
| HW-03 | Repository cites a Cytron product page (`OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:597`); that URL returned HTTP 404 on 2026-10-30 and no datasheet is stored. Third-party summaries quote 5-30 V, 30 A continuous / 80 A peak, 3.3 V/5 V logic, reverse-polarity protection — **not verified against a manufacturer document**. | None held. |
| HW-04 | None. No datasheet, no service manual, no drive rating, no age or refurbishment record. | None held. |
| HW-05 | None. No model, no manual, no sentence configuration record. | None held. |
| HW-06 | None. Marketing source label only; chipset and firmware version unknown. | None held. |
| HW-07 | Sensor manufacturer documentation not retrieved; HAT design files/licence not retrieved. `icm20948` Python package licence not captured in the repository. | None held. |
| HW-08 | AIS-catcher project licence retrieved (`S-20`, GPL-3.0). Dongle documentation absent. | None held. |
| HW-09 to HW-11 | Not applicable — no article. | Not applicable. |
| HW-12 to HW-16 | No component datasheets. Fuse rating, wiring sections and cable descriptions exist as prose only. | None held. |

**Rule applied:** brand recognition is not evidence. No component-level certification is treated as existing unless a document is held; none is held.

### 2.4 Redistribution and resale conditions

| ID | Condition |
|---|---|
| HW-01, HW-02, HW-03 | Purchased hardware; resale inside a MAREA product is a normal distribution act, but the manufacturer's terms of sale, warranty pass-through and trademark rules were not reviewed. No authorisation of MAREA by these manufacturers exists or is claimed. |
| HW-04 | Second-hand/legacy item. No proof of title, provenance, service history or remaining life. Resale inside a safety-relevant system creates a product-liability exposure that cannot be assessed without provenance records. |
| HW-05, HW-06, HW-14, HW-15, HW-16 | Unidentified generic parts: no supply contract, no batch traceability, no incoming inspection plan, no second-source qualification. |
| HW-07 | HAT is an open-hardware community design; its design licence and any obligation to publish modifications must be checked before MAREA ships a derivative (LEGAL_REVIEW_REQUIRED; not verified). |
| HW-08 | AIS-catcher is GPL-3.0 (`S-20`). Distributing a product that includes the binary triggers GPL source-provision obligations for AIS-catcher and for combined/derived works; see R-04. |
| HW-13 | Safety components (E-stop, contactor) must be selected for the actual DC breaking duty; a non-rated push button may only pilot a properly rated contactor. |
| Software | OPEN-MARINE has no root `LICENSE`, `COPYING` or `NOTICE` file; no workspace `package.json` declares an outbound licence except `marine-tile-server/package.json:13` (`ISC`); six of the eight `package.json` files carry `"private": true`. Default copyright therefore applies to the firmware, engine, gateway and UI code: reuse, modification and redistribution require written permission from the rightsholders (R-01). The per-component licence position is recorded in `EB:docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv`. |

### 2.5 Product-safety limitations and end-product certification implications

| ID | Product-safety limitations | End-product certification implications |
|---|---|---|
| HW-01 | Consumer SBC, not qualified for marine vibration, humidity, salt fog or wide-temperature duty. No watchdog supervisor, no UPS, no secure boot. | Component compliance does not confer compliance on the assembled device. The MAREA enclosure and the complete appliance need their own assessment. |
| HW-02 | 3.3 V-only I/O; no isolation; firmware runs a MicroPython loop with **no independent hardware watchdog** (`machine.WDT`) anywhere in the audited source. | Low-voltage DC assembly; EMC of the 20 kHz PWM switching node must be assessed at the driver/motor interface, not at the Pico. |
| HW-03 | 30 A continuous / 80 A peak class driver on a 12 A fused circuit for a legacy motor: fuse coordination and stall behaviour are unverified. PWM at 20 kHz is an EMC emitter. | Motor-drive EMC, conducted/radiated emissions, and enclosure/thermal design must be verified at product level. |
| HW-04 | No current or torque data, no feedback, no end-stop sensor; clutch is the only mechanical release. | An actuator with no verified rating cannot be declared suitable for a documented compatibility envelope. |
| HW-05 to HW-08 | Data-quality limits: no sensor calibration record, no redundancy, no plausibility cross-checks; AIS is receive-only and cannot be represented as collision avoidance. | None directly, but data provenance and failure behaviour are GPSR/CRA relevant. |
| HW-12 | No recorded isolation between the motor return and the electronics ground; no reverse-polarity protection at system level; no transient/overvoltage protection. | Electrical safety and EMC depend on a power architecture that does not yet exist as a reviewable design. |
| HW-13 | E-stop supervision depends on a single NC contact and one GPIO with a pull-up. There is no second channel, no cross-monitoring, no stuck-contact diagnosis and no test pulse. A welded power contactor is undetectable. | Safety-function evidence (architecture, DC, diagnostic coverage) does not exist; see section 3. |
| HW-14 | Single current sensor in the power path; no second independent overcurrent device other than a fuse; ADC resolution and noise unverified. | Overcurrent protection credit cannot be taken until the sensor is characterised. |
| HW-16 | Unspecified cabling and connectors: no screening for the 20 kHz PWM and brushed-motor circuit, no separation from signal/ADC wiring, no strain relief or IP rating, no documented cable current rating. | Conducted and radiated EMC and mechanical reliability cannot be argued from the current documentation. |

### 2.6 Supply and traceability risks

| Risk | Evidence |
|---|---|
| No bill of materials, no approved-vendor list, no part numbers, no serial/batch records, no incoming inspection, no hardware revision control. | Absence across both repositories (no BOM file; no hardware revision register) |
| AIS-catcher fetched from `releases/latest` or a shallow clone of the default branch — no version pin, no checksum, no signature. | `OM:scripts/init.sh:750`, `:795-798`, `:806-831` |
| Legacy ST3000 drive of unknown provenance and wear. | `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:5-7` |
| Pico deployment overwrites `config.py`, `main.py`, `motor_policy.py` via `mpremote`; only a backup of the previous `main.py` is taken. | `OM:marine-autopilot-engine/pico2/install.sh:59-70` |
| No firmware version is reported by the device: the status frame carries profile, pins and state, but no firmware/app version. | `OM:marine-autopilot-engine/pico2/main.py:153-185` |
| No calibration or E-stop verification artefact is committed; the records live only on one Raspberry at `~/.config/omi/pico2-current.json`. | `OM:marine-autopilot-engine/pico2/pico_motor_cli.py:20`, `:276-290`, `:443-448` |
| RTL-SDR dongle model unknown; RF performance and spurious response cannot be traced. | `OM:scripts/start-ais.sh:61-79` |

### 2.7 Trademark and marketing restrictions

| Mark | Restriction relevant to MAREA |
|---|---|
| "NMEA 2000" and the NMEA 2000 logo | Registered trademark of the National Marine Electronics Association; use is limited to licence holders, and "NMEA 2000 Certified" only after NMEA certification (`S-01`). |
| "NMEA 0183" | NMEA states the standard is a copyrighted document available only from NMEA; use of the standard text is licensed, not free (`S-02`). |
| "Signal K" | Project name/brand of the Signal K community; the specification is CC BY-SA 2.0 and the server Apache-2.0 (`S-05`, `S-07`). No trademark licence was found in retrieved sources; do not use project marks as endorsement. |
| "Raspberry Pi", "Pico" | Trademarks of Raspberry Pi Ltd; factual compatibility references only, no implied endorsement. |
| "Cytron", "MD30C" | Cytron trademark/product name; factual reference only. |
| "Autohelm", "Raymarine", "Nautech", "ST3000" | Legacy brand family; do not imply current manufacturer support, approval or spares availability for a second-hand drive. |
| "AIS" | Generic technology term; must never be presented as transponder, DSC, collision avoidance or type-approved equipment (portfolio already excludes transmission: `EB:docs/marea/COMMERCIAL-PORTFOLIO.md:49`). |

### 2.8 The three layers required by the mandate

| Layer | What exists today | Evidence status |
|---|---|---|
| (1) Development prototype | A Pi with Pico 2, MD30C R2, a bench DC motor and a legacy ST3000 drive, exercised through bench/commissioning/HIL profiles and host scripts | Code and procedure exist. **No bench log, no measurement, no commissioning record.** `PHYSICAL_TEST_NOT_VERIFIED` |
| (2) Commercially integrated electronic product | None. No enclosure, no BOM, no harness, no labelling, no firmware versioning, no production test fixture, no EMC design record | NOT_EVIDENCED |
| (3) Complete installed marine system | None. No vessel survey, no installation procedure, no commissioning sign-off, no sea trials, no operator training | NOT_EVIDENCED |

---

## 3. Autopilot safety audit (mandate section 13)

### 3.1 What the documented design claims

The repository's own protocol document describes a split architecture: the Raspberry runs high-level logic and never powers the motor; a microcontroller performs real-time PWM/direction and provides a hardware failsafe; the link is ASCII over UART at 115200 8N1; the Raspberry sends a desired rudder demand, an enable flag and a ≈10 Hz heartbeat; the microcontroller cuts the motor if the heartbeat stops (`OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:3-13`, `:16-37`, `:70-90`). The Pico 2 firmware implements that bridge with per-profile limits (`OM:marine-autopilot-engine/pico2/README.md:6-24`).

### 3.2 Feature classification matrix

| ID | Feature / behaviour | Code evidence | Automated test evidence | Simulated | Bench | Vessel | Independent | Verdict |
|---|---|---|---|---|---|---|---|---|
| F-A01 | Boot safe: PWM 0, DIR 0, motor disabled, standby state | `OM:marine-autopilot-engine/pico2/main.py:31-34`, `:248-255`; `OM:marine-autopilot-engine/src/engine.ts:135-147` | `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:40-50` — but this asserts source substrings, not runtime behaviour | n/a | No | No | No | E1 + weak E2; PTNV |
| F-A02 | Heartbeat timeout cuts drive (500 ms default, 450 ms bench) | `OM:marine-autopilot-engine/pico2/main.py:111-115`, `:275-276`; `OM:marine-autopilot-engine/pico2/motor_policy.py:15`, `:43-44` | `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:56-65` (freshness maths); `OM:scripts/pico2/bench-motor-watchdog-test.ps1`, `OM:scripts/pico2/watchdog-test.ps1` exist | n/a | Not evidenced (script exists, no log) | No | No | E1 + E2 (unit); PTNV for the 500 ms claim |
| F-A03 | Host heartbeat is sent every control tick | `OM:marine-autopilot-engine/src/engine.ts:196`; `OM:marine-autopilot-engine/src/actuators/backends/serial-backend.ts:135-137` | No dedicated test | E3 (sim only) | No | No | No | E1 |
| F-A04 | Enable flag must be 1 in the last command before output | `OM:marine-autopilot-engine/pico2/main.py:137-150`, `:216-244` | `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:52-55` (limits only) | n/a | No | No | No | E1 |
| F-A05 | Hardware E-stop power cut, independent of firmware | Documented as mandatory (`OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:129-151`) but the firmware only senses GP13; no relay/contactor line exists in code (`OM:marine-autopilot-engine/pico2/main.py:91-100` switches only PWM and DIR) | `safety_test()` requires a human to press the physical E-stop (`OM:marine-autopilot-engine/pico2/pico_motor_cli.py:421-448`) | n/a | Not evidenced | No | No | Documentation claim; `PHYSICAL_TEST_NOT_VERIFIED` |
| F-A06 | E-stop NC contact supervision (GP13 pull-up, open = stop) | `OM:marine-autopilot-engine/pico2/main.py:35-37`, `:51-58`, `:130-131` | `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:67-72` (requirement functions only) | n/a | Not evidenced | No | No | E1; PTNV |
| F-A07 | Overcurrent cutoff from calibrated Hall sensor | `OM:marine-autopilot-engine/pico2/main.py:61-71`, `:118-134`; `OM:marine-autopilot-engine/pico2/build_config.py:45-63` | `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:74-76` (sensor formatting only) | n/a | Not evidenced | No | No | E1; PTNV |
| F-A08 | Per-profile drive ceiling (bench 10 % default/20 % absolute; commissioning and HIL 10 %; production 100 %) | `OM:marine-autopilot-engine/pico2/motor_policy.py:32-40`; `OM:marine-autopilot-engine/pico2/main.py:145-150` | `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:52-55` | n/a | Not evidenced | No | No | E1 + E2 |
| F-A09 | Maximum motion time per command (bench/commissioning 1 s, HIL 30 s, none for production) | `OM:marine-autopilot-engine/pico2/main.py:277-283`; `OM:marine-autopilot-engine/pico2/motor_policy.py:17-21` | `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:56-65` | n/a | Not evidenced | No | No | E1 + E2 |
| F-A10 | Minimum pause between bench motions (2 s) | `OM:marine-autopilot-engine/pico2/main.py:229-238` | Not covered | n/a | No | No | No | E1 |
| F-A11 | Latched fault and explicit rearm | `OM:marine-autopilot-engine/pico2/main.py:103-108`, `:200-208` | No Pico-side test of `A` handling | n/a | No | No | No | E1; recovery gap F-05 |
| F-A12 | Engine software watchdog cuts drive if the loop stalls | `OM:marine-autopilot-engine/src/safety/watchdog.ts:1-58`; `OM:marine-autopilot-engine/src/engine.ts:432-437` | No test references the watchdog (grep of `src/__tests__` for "watchdog" returns only config defaults) | n/a | No | No | No | E1, untested |
| F-A13 | Sensor-loss rules: heading loss = hard fault; wind loss in WIND = demote; GPS loss in TRACK = demote | `OM:marine-autopilot-engine/src/safety/fault-manager.ts:25-69`; `OM:marine-autopilot-engine/src/sensors/sensor-base.ts:6-14` | `OM:marine-autopilot-engine/src/__tests__/safety.test.ts:29-67` (7 tests) | E3 | No | No | No | E1 + E2 |
| F-A14 | Overcurrent / low-battery / emergency-stop hard faults | `OM:marine-autopilot-engine/src/safety/limits.ts:13-17`; `OM:marine-autopilot-engine/src/safety/fault-manager.ts:32-41` | `OM:marine-autopilot-engine/src/__tests__/safety.test.ts:29-38` | E3 | No | No | No | E1 + E2 |
| F-A15 | Software E-stop (UI button) latches a motor cut | `OM:marine-autopilot-engine/src/engine.ts:599-603`, `:224-234`; `OM:marine-autopilot-engine/src/app/command-api.ts:199-203`; UI button at `OM:marine-instrumentation-ui/src/app/features/autopilot/autopilot.page.ts:86-90` | No API-level test of the `estop` route | E3 | No | No | No | E1, partially untested |
| F-A16 | Dock-side drive test while STANDBY | `OM:marine-autopilot-engine/src/engine.ts:182-192`, `:609-622`; `OM:marine-autopilot-engine/src/app/command-api.ts:204-218` | `OM:marine-autopilot-engine/src/__tests__/tuning.test.ts:42-45` (only "allowed in STANDBY") | E3 | No | No | No | E1 + E2 (partial); see F-06 |
| F-A17 | HIL cap 10 % PWM and 30 s session limit | `OM:marine-autopilot-engine/src/actuators/backends/hil-backend.ts:46-67`; `OM:marine-autopilot-engine/src/config.ts:100-102` | `OM:marine-autopilot-engine/src/__tests__/hil-backend.test.ts:40-85` (2 tests) | E3 | No | No | No | E1 + E2 |
| F-A18 | Production preflight: exact profile + safety-ready before motor enable | `OM:marine-autopilot-engine/src/actuators/backends/serial-backend.ts:22-25`, `:108-120`; `OM:marine-autopilot-engine/pico2/pico_motor_cli.py:591-599`; `OM:scripts/pico2/production-control.sh:33-63` | `OM:marine-autopilot-engine/src/__tests__/serial-telemetry.test.ts:31-60` (frame parsing) | n/a | Not evidenced | No | No | E1 + E2 (parsing); PTNV |
| F-A19 | Profiles ship fail-closed: production and commissioning cannot install without verified E-stop and calibrated current | `OM:marine-autopilot-engine/pico2/build_config.py:40-51`; `OM:marine-autopilot-engine/pico2/profiles/production.py:1-7` | `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:78-90` | n/a | n/a | n/a | No | E1 + E2 |
| F-A20 | Rudder feedback / position loop / end-stop enforcement | **Not implemented.** The Pico telemetry frame emits an empty rudder field (`print("T,,{}".format(...))` at `OM:marine-autopilot-engine/pico2/main.py:287-290`); no rudder sensor, encoder or potentiometer exists in code; the documented "rudder end-stop limits locally" responsibility (`OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:79-81`) has no implementation | None | n/a | No | No | No | E7 |
| F-A21 | Manual takeover / clutch detection | **Not implemented.** `MotorFeedback.clutch` is a copy of the enable flag (`OM:marine-autopilot-engine/src/actuators/backends/serial-backend.ts:139-147`); no helm/clutch sensor exists; the ST3000 belt clutch is described as a mechanical means of returning to hand steering (`OM:marine-autopilot-engine/pico2/README.md:77-79`) | None | n/a | No | No | No | E7 |
| F-A22 | Steering-mode transition sequence while engaged | Partial: state machine stores a pending mode and applies it on engage (`OM:marine-autopilot-engine/src/app/state-machine.ts:76-109`); `engage()` while already engaged re-targets immediately with no hold/centre/ramp handshake; no dedicated transition test | `OM:marine-autopilot-engine/src/__tests__/state-machine.test.ts:27-80` covers boot/engage/dodge/fault/demote only | E3 | No | No | No | E1 partial; no transition evidence |
| F-A23 | Independent hardware watchdog on the microcontroller | **Not implemented.** No `machine.WDT` or equivalent appears anywhere in `OM:marine-autopilot-engine/pico2/` (grep returns no matches) | None | n/a | No | No | No | E7 |
| F-A24 | Power relay control from the engine | **Not implemented as hardware.** `Relay` only logs state changes (`OM:marine-autopilot-engine/src/actuators/relay.ts:1-33`); engine calls `close()/open()` (`OM:marine-autopilot-engine/src/engine.ts:419`, `:429`) but no GPIO/serial line is driven | None | n/a | No | No | No | E1 abstraction only; E7 for the hardware line (contradicts `MOTOR_PROTOCOL.md:72-74`) |
| F-A25 | Authentication/authorisation of the control API | **Not implemented.** CORS `*`, no token, no TLS, default bind `0.0.0.0` (`OM:marine-autopilot-engine/src/app/command-api.ts:76-84`; `OM:marine-autopilot-engine/src/config.ts:105-106`) | None | n/a | n/a | n/a | No | E7; see F-01 |
| F-A26 | Compass calibration / deviation table for the heading reference | **Not implemented.** Heading is a complementary-filter magnetometer heading; no calibration or deviation routine exists (grep for calibration finds only Pico current calibration) | None | n/a | No | No | No | E7 |
| F-A27 | Firmware test execution in CI | **Not implemented.** CI runs TypeScript workspace tests and builds but has no Python/firmware job (`OM:.github/workflows/ci.yml:1-148`) | n/a | n/a | n/a | n/a | No | E7 |
| F-A28 | Committed bench/commissioning/sea-trial evidence | **None.** No `.log`, `.sqlite`, `.csv`, measurement or report artefact exists in OPEN-MARINE, and no log or measurement artefact exists in EMBARCARTE (both searched recursively on 2026-10-30) | n/a | n/a | No | No | No | E7 |

Automated test inventory relied on: 54 `test(...)` cases in `OM:marine-autopilot-engine/src/__tests__/` (12 files) and 15 `test_` functions in `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py`. All are host-side unit/integration tests with mocked or simulated actuator boundaries; none exercises real hardware or a real vessel.

### 3.3 Documentation-versus-code discrepancies

| ID | Document statement | Code reality | Consequence |
|---|---|---|---|
| D-01 | "Heartbeat timeout … cut the motor (PWM 0, driver disable, **open the power relay**)" — `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:72-74` | No relay output exists in the firmware; PWM and DIR only (`OM:marine-autopilot-engine/pico2/main.py:91-100`) | The documented hardware cut is not implemented by the MCU. The power cut relies entirely on external wiring and an E-stop contactor that is not specified. |
| D-02 | MCU must "enforce … rudder end-stop limits locally" — `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:79-81` | No rudder position sensor or limit logic exists | A mechanical end-stop can only be protected by the fuse and the current limit (when calibrated). |
| D-03 | "E-stop / watchdog → FAULT + motor off" — `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:88-90` | Hardware E-stop on the serial path arrives as a Pico `F` frame and is mapped to the generic fault reason `drive-blocked` (`OM:marine-autopilot-engine/src/engine.ts:173-178`); no publisher anywhere sets `steering.autopilot.emergencyStop`, the path the engine reads (`OM:marine-autopilot-engine/src/signalk/signalk-sensor-source.ts:7-8`, `:101`) | The engine's `emergency-stop` reason is reachable only through the HTTP software E-stop, not through the hardware E-stop line. |
| D-04 | Microcontroller may honour a closed-loop rudder demand "if it has a rudder feedback sensor" — `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:33-36` | No such mode exists in firmware | Documentation describes a capability that is not implemented. |
| D-05 | "Production ships blocked until actual sensors are calibrated" — `OM:marine-autopilot-engine/pico2/README.md:24` | True: `production.py` sets both safety flags false (`OM:marine-autopilot-engine/pico2/profiles/production.py:1-7`) and `build_config` refuses to render without a verified E-stop and calibration (`OM:marine-autopilot-engine/pico2/build_config.py:40-51`) | Consistent, fail-closed. This is the strongest safety property in the audited stack. |
| D-06 | Bench-motor never used with the ST3000/HIL/production — `OM:marine-autopilot-engine/pico2/README.md:81-84` | Host CLI enforces exact profile, duty ceiling, motion time and confirmation tokens (`OM:marine-autopilot-engine/pico2/pico_motor_cli.py:91-109`, `:478-495`) | Consistent; enforcement is host-side, so a non-CLI serial writer could bypass it, but the firmware still applies the profile ceiling. |

### 3.4 Safety-risk findings

| ID | Finding | Severity | Evidence |
|---|---|---|---|
| F-01 | The autopilot HTTP command API has no authentication, no TLS, wide-open CORS and binds `0.0.0.0` by default, while exposing `engage`, `drive-test`, `tuning`, `estop` and `clearFault`. Any host on the LAN can move the helm or change PID/limits. The HIL launcher pins the API to `127.0.0.1` (`OM:scripts/pico2/hil-control.sh:70-71`), but `production-control.sh` does not set `AP_API_HOST`, so the production engine inherits the `0.0.0.0` default. | Critical | `OM:marine-autopilot-engine/src/app/command-api.ts:50-55`, `:76-84`, `:144-219`; `OM:marine-autopilot-engine/src/config.ts:105-106`; `OM:scripts/pico2/production-control.sh:48-52`; `OM:scripts/pico2/hil-control.sh:70-71` |
| F-02 | No rudder position feedback: control is open-loop on drive; the `T` frame's rudder field is empty; no end-stop, stall or obstruction detection exists. | High | `OM:marine-autopilot-engine/pico2/main.py:287-290`; `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:54-68` |
| F-03 | No independent hardware watchdog on the MCU; the heartbeat timeout is evaluated inside the same MicroPython loop that services commands, so a firmware hang defeats both. | High | `OM:marine-autopilot-engine/pico2/main.py:257-290`; absence of `machine.WDT` |
| F-04 | No manual-takeover detection: `clutch` is a copy of the enable flag; the engine cannot know that a crew member has taken the helm or disengaged the belt clutch. | High | `OM:marine-autopilot-engine/src/actuators/backends/serial-backend.ts:139-147`; `OM:marine-autopilot-engine/pico2/README.md:77-79` |
| F-05 | No host-side rearm of a latched Pico fault: `SerialMotor` writes only `C`, `H`, `P` frames and never `A` (`OM:marine-autopilot-engine/src/actuators/backends/serial-backend.ts:163-177`, `:104-105`, `:113-114`, `:125`), so after a Pico-latched fault the motor cannot be re-enabled without running the CLI by hand. Safe but operationally blocking; also means engine `clearFault()` can leave the engine "enabled" while the Pico refuses output. | Medium | code as cited |
| F-06 | `drive-test` (dock jog) deliberately drives the helm while in STANDBY, and is reachable over the unauthenticated API; it is not gated by any local confirmation token, unlike the Pico bench profiles. | High | `OM:marine-autopilot-engine/src/engine.ts:182-192`, `:609-622` |
| F-07 | Software E-stop is not hardware: it sets a flag and relies on the next control tick to run `disableDrive()`; a stalled loop, a crashed process or a lost serial link is covered only by the Pico heartbeat timeout (450-500 ms), which is not measured on hardware. | High | `OM:marine-autopilot-engine/src/engine.ts:599-603`, `:236-253`, `:423-430` |
| F-08 | Heading reference is an uncalibrated magnetometer heading; magnetic variation is taken from GNSS RMC. There is no deviation table, no hard/soft-iron compensation and no heading-plausibility cross-check against COG. | High | `OM:marine-sensor-gateway/rpi/omi-imu/02_publish_signalk.py:64-120`; `OM:marine-autopilot-engine/src/signalk/signalk-sensor-source.ts:47-90` |
| F-09 | `positionValid` is derived from SOG freshness only, not from fix quality or HDOP, so a stationary bad-fix GPS can keep TRACK "valid". | Medium | `OM:marine-autopilot-engine/src/signalk/signalk-sensor-source.ts:89-92` |
| F-10 | The engine watchdog is a Node timer in the same event loop as the control loop; it cannot detect a blocked event loop for longer than its own interval semantics and does not reset hardware. | Medium | `OM:marine-autopilot-engine/src/safety/watchdog.ts:20-53` |
| F-11 | Mode changes while engaged have no defined handover (hold, centre, ramp or confirmation); a re-engage directly re-targets. | Medium | `OM:marine-autopilot-engine/src/app/state-machine.ts:76-109`, `:146-158` |
| F-12 | Firmware safety tests are not executed in CI and are not hardware tests; the strongest firmware assertions are source-text substring checks. | Medium | `OM:.github/workflows/ci.yml:1-148`; `OM:marine-autopilot-engine/pico2/tests/test_bench_motor.py:40-50` |

### 3.5 Required inputs for the PILOT commercialisation gate

No PILOT SKU may be marked sale-ready, quoted as turnkey, or marketed with steering performance claims until **all** of the following exist as reviewable artefacts.

| Gate | Requirement | Current status |
|---|---|---|
| G1 | Frozen hardware design: BOM with manufacturer part numbers, schematics, harness drawing, enclosure, power architecture (fuse coordination, isolation, transient protection), E-stop/contactor selection with DC rating | NOT_EVIDENCED |
| G2 | Independent hardware fail-safe evidence: verified power cut path, MCU hardware watchdog, E-stop with monitored dual channel or documented single-channel risk acceptance, overcurrent protection credited by two independent means, manual mechanical release | NOT_EVIDENCED (F-03, F-04, HW-13) |
| G3 | Rudder position feedback or an explicit, documented open-loop control case with end-stop and stall protection (current-based) verified by test | NOT_EVIDENCED (F-02) |
| G4 | Heading reference integrity: compass calibration procedure, deviation/compensation, heading-vs-COG plausibility check, documented accuracy envelope | NOT_EVIDENCED (F-08, F-09) |
| G5 | Software safety case: fault taxonomy, watchdog independence, rearm procedure, mode-transition handshake, manual-takeover handling, authenticated and authorised control plane | PARTIAL (engine rules exist; API unauthenticated F-01; no takeover F-04) |
| G6 | Bench and commissioning evidence: signed logs for each profile, heartbeat-cut timing measured with an instrument, overcurrent trip measured, E-stop under load, direction verification, fuse trip | NOT_EVIDENCED (F-A28) |
| G7 | Sea trials per intended steering mode, with failure injection: heading loss, wind loss, GNSS loss, serial loss, Pico power loss, Pi reboot, main-power loss, E-stop at cruise speed, jammed rudder/end-stop, manual takeover under load, heavy-weather limits | NOT_EVIDENCED |
| G8 | Conformity assessment: EMC test for the 20 kHz motor drive, RED if any radio is added, GPSR risk assessment and technical documentation, RoHS/WEEE, CRA if connectable, national rules if installed on professional vessels | NOT_EVIDENCED; see section 5 |
| G9 | Independent review by a competent marine engineer/naval architect plus, where applicable, a notified body; operator manual, stated limits, training, warranty and liability position | NOT_EVIDENCED (E6 absent) |

### 3.6 Intended steering modes and sea-trial requirements

| Mode | Controller evidence | Required sea trials before any claim |
|---|---|---|
| HEADING (compass hold) | `OM:marine-autopilot-engine/src/control/heading-controller.ts`, used at `OM:marine-autopilot-engine/src/engine.ts:402-412`; bench convergence test `OM:marine-autopilot-engine/src/__tests__/closed-loop-sim.test.ts:11-40` | Calm/choppy/heavy conditions; course stability and yaw-band measurement; heading-sensor loss at speed; drive saturation and overcurrent behaviour; manual takeover; long-duration drift; fuel/speed penalty |
| WIND (apparent-wind hold) | `OM:marine-autopilot-engine/src/control/wind-controller.ts`; hazard detector tests `OM:marine-autopilot-engine/src/__tests__/wind-controller.test.ts:12-37` | Upwind/beam/reach/run; accidental tack and gybe recovery; wind-sensor loss and demotion to HEADING; gust response; reefed/unreefed configurations |
| TRACK (route following) | `OM:marine-autopilot-engine/src/control/track-controller.ts`; no-go-zone limit; bench XTE convergence `OM:marine-autopilot-engine/src/__tests__/track-controller.test.ts:79` | Cross-track capture under current and leeway; waypoint advance with real GNSS; GNSS loss and demotion; no-go-zone behaviour in restricted waters; route with close hazards; night/low-visibility supervision |
| Any mode | n/a | All trials need: named vessel and configuration, load/sea state, software and firmware versions, instrumented timing, a signed test record, and a competent observer. None exists. |

### 3.7 PILOT gate verdict

| Sub-gate | Verdict |
|---|---|
| Safety logic implemented in software | PARTIAL — fault rules, limits, profiles and HIL caps are implemented and unit-tested; the control plane is unauthenticated; no rudder feedback or takeover detection |
| Microcontroller fail-safe | PARTIAL — fail-closed profiles and heartbeat cut exist; no hardware watchdog, no relay output, no rudder/end-stop enforcement, firmware not in CI |
| Physical bench evidence | BLOCKED — nothing committed, nothing measured |
| Real-vessel evidence | BLOCKED — no sea trial exists |
| Independent verification | BLOCKED — no third party involved |
| Conformity/certification | BLOCKED — no assessment started |
| **Overall MAREA PILOT commercialisation safety gate** | **BLOCKED** |

**Rule restated for the record:** unit tests, simulation and bench-tooling source code are not sale-readiness evidence. No PILOT device may be marked sale-ready from simulation or unit tests alone, and this audit found no bench or vessel evidence at all.

---

## 4. Protocol and standards rights (mandate section 14)

### 4.1 What the repository actually implements

| Protocol | Implementation status in the audited revision | Evidence |
|---|---|---|
| NMEA 0183 sentences (GPS) | Implemented via the third-party `pynmea2` parser: RMC, GGA, GSA, GSV, VTG | `OM:marine-sensor-gateway/rpi/omi-imu/01_test_gps.py:13`, `:128-199`; `OM:marine-sensor-gateway/rpi/omi-imu/02_publish_gps_signalk.py:360-468` |
| NMEA 0183 sentences (wind) | Implemented as a bespoke parser for MWV and MWD, including XOR checksum validation | `OM:marine-sensor-gateway/rpi/wind/wind_nmea.py:19-95` |
| NMEA 0183 transport/adapter | Type declaration only; no implementation | `OM:marine-sensor-gateway/src/adapters/nmea0183.ts:1-27` |
| NMEA 2000 (CAN, PGNs, fast-packet, ISO 11783-style addressing) | **Not implemented.** Only a type declaration with `pgn`, `source`, `priority` fields and a disabled actuator stub | `OM:marine-sensor-gateway/src/adapters/nmea2000.ts:1-25`; `OM:marine-autopilot-engine/src/actuators/backends/can-backend.ts:1-47` |
| Signal K data model / deltas / WebSocket stream | Implemented: delta publishing and subscription over Signal K HTTP/WS | `OM:marine-autopilot-engine/src/signalk/sk-publisher.ts`, `OM:marine-autopilot-engine/src/signalk/sk-subscriber.ts`, `OM:marine-sensor-gateway/rpi/omi-imu/02_publish_gps_signalk.py:211-246`, `:516-530` |
| Signal K server runtime | Consumed as a Docker image `signalk/signalk-server:v2.22.1`, not vendored | `OM:signalk-runtime/docker-compose.yml:1-14` |
| AIS NMEA 0183 (`!AIVDM`-family) | Produced by AIS-catcher (external GPL-3.0 program), forwarded verbatim over UDP 10110; no AIS decoder in OMI code | `OM:marine-sensor-gateway/src/ais/rtlAisGateway.ts:18`, `:170-189`; `OM:scripts/start-ais.sh:79` |
| CAN / serial gateways | Serial gateway to the Pico implemented with a bespoke ASCII protocol (not a standard); CAN stub only | `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:16-37`; `OM:marine-autopilot-engine/src/actuators/backends/serial-backend.ts:1-225` |
| Proprietary manufacturer messages (e.g. legacy autopilot buses) | **Not implemented.** The only proprietary reference is the legacy ST3000 as a two-wire DC drive, not a data protocol | `OM:marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:5-7` |

### 4.2 NMEA licensing and certification facts (official source)

- "All products that read and or transmit NMEA 2000 information must be certified by NMEA." NMEA 2000 requires a Licence Agreement, a purchased Manufacturer Code, a purchased Product Code per certified product, use of the NMEA 2000 Certification Tool to produce a mandatory encrypted certification file, and only after NMEA validation may the official logo and the term "NMEA 2000 Certified" be used in marketing (`S-01`).
- NMEA 2000® is a registered trademark of the National Marine Electronics Association; unlicensed use is not permitted (`S-01`, `S-03`).
- The NMEA 2000 Standard itself is not sold online; it is licensed by industry group, and updates are provided only to current marine manufacturer members (`S-01`).
- NMEA 0183: the standard is a copyrighted document available only from NMEA; NMEA states that other internet offerings "are not authorized and may constitute a copyright infringement". Manufacturer mnemonic codes are issued for an administrative fee and require purchase of the standard at the applicable industry-group price (`S-02`).
- The retrieved NMEA 0183 page states no product-certification requirement for NMEA 0183 products (unlike NMEA 2000). This audit therefore records "NMEA 0183 certification programme: NOT EVIDENCED on the official page" rather than inventing one.

### 4.3 Signal K licensing facts (official source)

- The Signal K specification repository carries a Creative Commons Attribution-ShareAlike 2.0 licence (`S-05`). The published specification documentation (as indexed, not re-retrieved in full) characterises the documentation as CC-BY-SA and the project source code as Apache-2.0; the specification repository README confirms the schema/specification nature of the repository (`S-06`).
- The Signal K reference server repository carries Apache License 2.0 (`S-07`).
- Consequence: consuming and publishing Signal K data is unencumbered; **redistributing modified specification documentation** triggers CC-BY-SA attribution and share-alike obligations; Apache-2.0 requires licence and notice retention for redistributed code. Neither licence grants trademark rights.

### 4.4 Open-source components relevant to hardware commercialisation

| Component | Version control in OM | Licence | Commercial redistribution implication |
|---|---|---|---|
| AIS-catcher | Not pinned; downloaded from `releases/latest` or cloned from default branch at install time | GPL-3.0 (`S-20`) | Shipping it inside a MAREA appliance triggers GPL-3.0 source-provision and notice obligations for AIS-catcher and for works combined with it. Copyleft scope for an aggregate (separate process, no linking) must be confirmed by counsel (R-04). Detailed obligations are tracked in `EB:docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv`. |
| MicroPython (Pico firmware runtime) | Not vendored; device firmware assumed pre-installed | MIT (`S-21`) | Permissive; attribution required on redistribution of substantial portions. The rp2 port carries third-party notices that must ship with any firmware image. |
| Signal K server | Pinned as Docker image `v2.22.1` | Apache-2.0 (`S-07`) | Permissive; NOTICE retention. The Docker image is pinned by tag only, not by digest. |
| Signal K specification | Consumed, not redistributed | CC-BY-SA 2.0 (`S-05`) | Applies only if specification text or derivatives are redistributed. |
| Python runtime dependencies (`pynmea2`, `pyserial`, `requests`, `websocket-client`, `icm20948`, `mpremote`) | Installed unpinned by setup/install scripts; no Python lockfile or hash pinning | MIT / BSD-3-Clause / Apache-2.0 class (inventory: `EB:docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv`) | Permissive notice obligations on the shipped host image; the lack of version pinning and hashes is a supply-chain risk (R-09), not a licence risk. |
| OMI/OPEN-MARINE first-party code | Released under no licence | No `LICENSE`/`COPYING`/`NOTICE` file; no outbound licence declared except `marine-tile-server` (`ISC`); six of eight packages marked `private` | No grant to MAREA or anyone. Written permission from the rightsholders is a precondition for commercial reuse (R-01). Cross-checked against the programme inventory. |

### 4.5 Risk register

| ID | Risk | Severity | Assessment |
|---|---|---|---|
| R-01 | OPEN-MARINE is published without any licence grant (no `LICENSE`/`COPYING`/`NOTICE` file; no outbound licence declared except `marine-tile-server` ISC; six of eight packages marked `private`) | Critical | Commercial reuse, modification, firmware flashing into sold products and code redistribution are not authorised by default. Requires a written licence or assignment from the rightsholder before any SKU ships. This is a prerequisite, not a compliance item. Cross-checked against `EB:docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv`. |
| R-02 | Claiming NMEA 2000 compatibility without licence or certification | High | The official NMEA position is that any product reading or transmitting NMEA 2000 must be NMEA-certified. MAREA's portfolio already forbids the certification claim (`EB:docs/marea/COMMERCIAL-PORTFOLIO.md:38`) but permits "NMEA/Signal K/instruments" phrasing that must be constrained in copy. |
| R-03 | Implying NMEA 0183 compliance from parsing sentences | High | Parsing MWV/MWD/RMC does not constitute conformity to the copyrighted NMEA 0183 standard, and no certification programme was evidenced for 0183. Copy must say "parses NMEA 0183 sentences", never "NMEA 0183 certified/compliant". |
| R-04 | GPL-3.0 AIS-catcher inside a commercial appliance | High | Source-provision, notice and combined-work analysis are mandatory before shipping. Alternatives (replace with a permissively licensed decoder, or keep AIS-catcher as a user-installed component with a clear separation) need a licensing decision. |
| R-05 | NMEA 2000 PGN definitions / CAN frame semantics reimplemented from the standard | High (conditional) | If MAREA adds a NMEA 2000 stack, PGN tables derive from a licensed NMEA document; licensing and certification must precede implementation. No current code exists, so the risk is deferred, not resolved. |
| R-06 | Signal K documentation derivatives published under a non-share-alike licence | Medium | CC-BY-SA 2.0 share-alike would attach to modified specification docs. Keep MAREA docs original and cite Signal K. |
| R-07 | "Signal K compatible" claim without test evidence | Medium | Compatibility is a factual claim requiring a published test matrix (message paths, units, rates, failure behaviour). No such matrix exists. |
| R-08 | Trademark misuse (NMEA 2000®, NMEA Certified, Raspberry Pi, Cytron, Autohelm/Raymarine, Signal K) | Medium | Factual nominative use only; no logos; no "certified", "approved", "endorsed". |
| R-09 | Unpinned third-party binary and package downloads | Medium | No hash/signature verification; a compromised or changed artefact would be indistinguishable. Applies to AIS-catcher and all pip installs in setup scripts. |
| R-10 | `pynmea2` sentence tables may derive from the copyrighted NMEA 0183 standard | Medium | The package licence is MIT (recorded in the programme inventory), but the provenance of its sentence definitions is not documented; legal review recommended before relying on it in a commercial product (OPEN). |
| R-11 | No SBOM / machine-readable dependency inventory for the firmware and host runtime | Medium | The npm workspaces have lockfiles, but there is no Python lockfile, no hash pinning, no firmware manifest and no consolidated SBOM. Blocks CRA readiness and any distribution compliance statement. The licence inventory maintained in `EB:docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv` is an audit artefact, not a shipped SBOM. |
| R-12 | Use of an unlicensed "MacArthur HAT" derivative design | Low | Only if MAREA manufactures or modifies the HAT; check the hardware design licence before doing so (not verified). |

### 4.6 Advertising and standards-claim rules derived from this section

1. Never write "NMEA 2000 Certified", "NMEA certified", "NMEA approved" unless an NMEA certificate exists for that product code.
2. Never write "NMEA 0183 compliant/certified"; write "parses NMEA 0183 MWV/MWD sentences" only after a documented test.
3. Never imply interoperability beyond tested devices and message types; publish a compatibility matrix with device models and read/write operations.
4. Never describe AIS reception as collision avoidance, transponder capability or type approval; AIS remains receive-only.
5. Never use the Signal K or NMEA marks as endorsement; cite them nominatively.
6. Any GPL-covered component must appear in the product's licence notices with the corresponding source offer.

---

## 5. EU / Spain / Portugal compliance matrix (mandate section 15)

### 5.1 Regimes assessed and their scope tests

| Regime | Official act | Scope test used | Source |
|---|---|---|---|
| CE conformity | Overarching marking obligation where Union harmonisation legislation applies (EMC, RED, LVD, RoHS, CRA) | CE marking is required only for the acts that impose it; GPSR and WEEE do not impose CE marking | `S-08` (EMC CE/marking obligations), `S-09`, `S-17` |
| EMC | Directive 2014/30/EU | Applies to "equipment" (apparatus and fixed installations); excludes equipment covered by the R&TTE Directive 1999/5/EC — now repealed and replaced by RED 2014/53/EU — and ceases to apply to requirements laid down more specifically by other Union legislation | `S-08`, `S-09` |
| RED | Directive 2014/53/EU | Applies to radio equipment: products intentionally emitting or receiving radio waves for radiocommunication or radiodetermination; sets safety, EMC and spectrum essential requirements; applicable since 13 June 2016 | `S-09` |
| LVD | Directive 2014/35/EU | Applies to electrical equipment with input or output voltage 50-1000 V AC or 75-1500 V DC | `S-10` |
| GPSR | Regulation (EU) 2023/988 | Applies to consumer products not covered by other specific EU safety legislation, and to risks/aspects not already covered by it; obliges manufacturer, importer, distributor, responsible EU economic operator, technical documentation, traceability, recall duties (application date not displayed on the retrieved summary page; re-confirm with the legal workstream) | `S-11` |
| RoHS | Directive 2011/65/EU | Applies to electrical and electronic equipment in the annex categories plus open scope; restrictions on substances; manufacturer/importer/distributor obligations; CE marking applies | `S-13`, `S-15` |
| WEEE | Directive 2012/19/EU | Applies to waste electrical and electronic equipment; producer responsibility, collection and registration; excludes means of transport and certain items | `S-14`, `S-16` |
| CRA | Regulation (EU) 2024/2847 | Applies to products with digital elements; mandatory cybersecurity requirements, vulnerability handling, CE marking; entered into force 10 December 2024, main obligations from 11 December 2027, reporting obligations from 11 September 2026 | `S-17` |
| MED | Directive 2014/90/EU | Applies to marine equipment on ships flying an EU flag under the international conventions; requires third-party assessment and the wheel mark; transposed in Spain by Real Decreto 701/2016 | `S-12`, `S-19` |

Timeline note for CRA recorded on 2026-10-30: **reporting obligations under the CRA are already in force** (from 2026-09-11), while the main obligations apply from 2027-12-11 (`S-17`). Also from `S-09`: the RED cybersecurity delegated act (EU) 2022/30 is repealed by Delegated Regulation (EU) 2026/339 with effect from 2027-12-11, when the CRA takes over.

### 5.2 Applicability matrix — 9 MAREA families against 9 regimes

Codes: CA = CLEARLY_APPLICABLE; POT = POTENTIALLY_APPLICABLE; NAE = NOT_APPLICABLE_WITH_EXPLANATION; NYA = NOT_YET_ASSESSABLE.

| Family | CE | EMC | RED | LVD | GPSR | RoHS | WEEE | CRA | MED |
|---|---|---|---|---|---|---|---|---|---|
| NAV (software) | NAE | NAE | NAE | NAE | NAE | NAE | NAE | POT | NAE |
| HUB (appliance) | CA | POT | POT | NAE | CA | CA | CA | CA | NAE |
| AIS (receive-only receiver) | CA | POT | CA | NAE | CA | CA | CA | CA | NAE |
| PILOT (steering system) | CA | CA | POT | NAE | CA | CA | CA | CA | NAE |
| SENSE (sensor modules) | CA | POT | POT | NAE | CA | CA | CA | POT | NAE |
| WATCH (remote monitoring kit) | CA | POT | CA | NAE | CA | CA | CA | CA | NAE |
| DISPLAY (dedicated display) | CA | CA | POT | NAE | CA | CA | CA | CA | NAE |
| WEATHER (data service) | NAE | NAE | NAE | NAE | NAE | NAE | NAE | NYA | NAE |
| FLEET (SaaS) | NAE | NAE | NAE | NAE | NAE | NAE | NAE | NAE | NAE |

### 5.3 Applicability counts

| Count over the 81-cell matrix | Value |
|---|---|
| CLEARLY_APPLICABLE | 33 |
| POTENTIALLY_APPLICABLE | 10 |
| NOT_APPLICABLE_WITH_EXPLANATION | 37 |
| NOT_YET_ASSESSABLE | 1 |
| Total cells | 81 |

Per regime:

| Regime | CA | POT | NAE | NYA |
|---|---:|---:|---:|---:|
| CE conformity | 6 | 0 | 3 | 0 |
| EMC | 2 | 4 | 3 | 0 |
| RED | 2 | 4 | 3 | 0 |
| LVD | 0 | 0 | 9 | 0 |
| GPSR | 6 | 0 | 3 | 0 |
| RoHS | 6 | 0 | 3 | 0 |
| WEEE | 6 | 0 | 3 | 0 |
| CRA | 5 | 2 | 1 | 1 |
| MED | 0 | 0 | 9 | 0 |

Per family:

| Family | CA | POT | NAE | NYA |
|---|---:|---:|---:|---:|
| NAV | 0 | 1 | 8 | 0 |
| HUB | 5 | 2 | 2 | 0 |
| AIS | 6 | 1 | 2 | 0 |
| PILOT | 6 | 1 | 2 | 0 |
| SENSE | 4 | 3 | 2 | 0 |
| WATCH | 6 | 1 | 2 | 0 |
| DISPLAY | 6 | 1 | 2 | 0 |
| WEATHER | 0 | 0 | 8 | 1 |
| FLEET | 0 | 0 | 9 | 0 |

### 5.4 Determination notes per regime

**C-01 CE conformity.** Required only where a harmonisation act applies. It is CA for the six hardware families because at least one of EMC/RED/RoHS/LVD/CRA applies to any plausible configuration. It is NAE for NAV, WEATHER and FLEET because no apparatus is placed on the market and no CE-marking act applies to a pure software/service supply. Consequence: MAREA must be able to name, per SKU, which acts trigger CE marking and must not apply a CE mark to a software/SaaS SKU. No CE marking exists today; nothing in either repository asserts one.

**C-02 EMC 2014/30/EU.** CA for PILOT and DISPLAY: both are non-radio apparatus with switching power stages (20 kHz PWM motor drive; display electronics) and must satisfy EMC essential requirements. POT for HUB, AIS, SENSE and WATCH because their EMC position depends on whether the SKU includes a radio: the EMC Directive states it "shall not apply to … equipment covered by Directive 1999/5/EC" (Art. 2(2)(a), read with the repeal of 1999/5/EC by RED) and ceases to apply where essential requirements are laid down more specifically by other Union legislation (Art. 2(3)). NAE for software/service families. Test planning must treat the motor cable and the brushed motor as the dominant emitter; no EMC design or pre-compliance measurement exists.

**C-03 RED 2014/53/EU.** CA for AIS (a receiver intentionally receiving radio waves is radio equipment under the RED) and for WATCH (cellular/Wi-Fi connectivity). POT for HUB, PILOT, SENSE and DISPLAY because radio inclusion is a design decision not yet frozen. NAE for software/service families. If a pre-certified radio module is used, module-level certification does not automatically cover the host; the RED guide and the module conditions must be checked (OPEN).

**C-04 LVD 2014/35/EU.** NAE for all nine families on the recorded architecture: all equipment runs at 12 V DC or 5 V/USB, below the 75 V DC threshold; the LVD covers 50-1000 V AC and 75-1500 V DC input or output voltage (`S-10`). This determination flips to POT if any SKU bundles a mains power supply or charger whose input is 230 V AC; re-assess at BOM freeze. No mains-powered SKU exists today.

**C-05 GPSR (EU) 2023/988.** CA for the six consumer hardware families: the regulation applies where a product is not covered by other specific safety legislation, or to risks not covered by it, and imposes the general safety requirement, risk analysis, technical documentation, traceability, incident reporting and recall duties (`S-11`). It is NAE for NAV, WEATHER and FLEET as software/services are not "products" (goods) under the regulation. Note that GPSR does not require CE marking; it requires a safety case and a responsible economic operator in the EU. The regulation has applied since 2024-12-13 (application date taken from the regulation's application clause; it was not displayed on the retrieved summary page, so re-confirm in legal review).

**C-06 RoHS 2011/65/EU.** CA for all electronic hardware families: the directive applies to EEE, including cables and spare parts, with an open catch-all category and a short exclusion list that does not cover marine navigation/steering electronics (`S-13`). Manufacturer must design to substance restrictions, hold technical documentation and apply CE marking; importers and distributors must verify. NAE for software/service families. No material declarations, no supplier substance statements and no RoHS technical file exist today.

**C-07 WEEE 2012/19/EU.** CA for the six hardware families as EEE placed on the EU market; producer registration and take-back/financing obligations apply (`S-14`, `S-16`). The "means of transport" exclusion does not apply to a navigation/steering accessory. NAE for software/service families. No registration, no take-back scheme, no WEEE marking/producer identification exists.

**C-08 CRA (EU) 2024/2847.** CA for HUB, AIS, PILOT, WATCH and DISPLAY as connectable products with digital elements (main obligations from 2027-12-11; vulnerability/systemic-risk reporting duties already in force since 2026-09-11 per `S-17`). POT for NAV (software product with digital elements distributed to users — classification depends on distribution model and whether it is a standalone product or part of a service) and SENSE (only if the module contains digital elements/connectivity). NAE for FLEET (B2B SaaS is a service, not a product with digital elements; the position of any FLEET client app must be reviewed). NYA for WEATHER (data service with possible client software; product definition insufficient). Consequence: firmware update capability, SBOM, coordinated vulnerability disclosure and secure-by-default configuration are not present in the audited stack; the open, unauthenticated control API (F-01) is directly CRA-relevant.

**C-09 MED 2014/90/EU.** NAE for all nine families **for the recorded recreational target market**: the MED applies to marine equipment on ships flying an EU flag that are subject to the international conventions, and requires third-party assessment and the wheel mark (`S-12`); Spain transposes it with Real Decreto 701/2016 and applies the wheel-mark/notified-body modules through the Dirección General de la Marina Mercante (`S-19`). Recreational craft are not ships under those conventions, so the MED is **not** applied automatically — as the mandate requires. The determination becomes POT, with `LEGAL_REVIEW_REQUIRED`, if MAREA sells into professional/commercial vessel channels, if a SKU is installed on a ship to which the conventions apply, or if Spanish national equipment rules for recreational craft are found to cover a specific item (see section 5.6). No wheel mark may be used unless granted.

### 5.5 Obligations matrix per family

| Family | Manufacturer obligations | Importer obligations | Distributor obligations | Technical documentation and traceability | Warranty and liability |
|---|---|---|---|---|---|
| NAV | CRA (if in scope): secure development, vulnerability handling, SBOM, updates, CE marking from 2027-12-11 | CRA role check if importing; consumer-law seller identity | Do not alter software or claims | Release notes, supported platforms, security contact; data provenance for charts/weather | Contractual SaaS terms plus Spanish consumer rules; LEGAL_REVIEW_REQUIRED |
| HUB | EMC or RED conformity route, GPSR safety case and risk analysis, RoHS design and file, WEEE producer duty, CRA secure-by-default and updates, EU declaration of conformity | Verify CE/DoC, keep DoC and technical file available, add name/address, refuse non-compliant goods | Verify CE/DoC/labelling, preserve conditions, cooperate on risks | BOM, schematics, test reports, DoC, firmware versions, serial traceability, 10-year DoC retention (EMC Annex II), 10-year product info and 6-year supply-chain traceability (GPSR) | Statutory guarantee plus contractual warranty; spare parts and update policy must be stated |
| AIS | RED conformity (receiver), GPSR, RoHS, WEEE, CRA; EMC via RED; EU DoC; radio spectrum conditions | Verify CE/DoC, importer identification, refuse non-compliant | Same as HUB | As HUB plus RF test evidence, antenna requirements, receiver performance envelope; AIS-catcher GPL notices | As HUB; explicitly exclude collision-avoidance expectations |
| PILOT | EMC (motor drive) and RED if radio; GPSR safety case with functional-safety argument; RoHS; WEEE; CRA; EU DoC; installer and operator documentation | Verify DoC and safety documentation; refuse incomplete safety files | Preserve installation conditions; no unauthorised modification | As HUB plus safety case, FMEA/fault tree, bench and sea-trial records, commissioning sign-off, version traceability, E-stop test record | Highest exposure: product liability, installation liability, operator training, explicit limits and exclusions; LEGAL_REVIEW_REQUIRED |
| SENSE | EMC or RED depending on connectivity; GPSR; RoHS; WEEE; CRA if digital elements | As HUB | As HUB | Sensor calibration records, accuracy envelope, material declarations, IP rating evidence | As HUB; calibration and maintenance duties |
| WATCH | RED (cellular/Wi-Fi), GPSR, RoHS, WEEE, CRA; EU DoC | As HUB | As HUB | As HUB plus network coverage/roaming disclosure, data protection (GDPR) assessment | Subscription terms plus hardware guarantee; connectivity exclusions |
| DISPLAY | EMC, GPSR, RoHS, WEEE, CRA, RED if wireless; EU DoC | As HUB | As HUB | As HUB plus optical/thermal/vibration/ingress evidence | As HUB |
| WEATHER | Data licensing and attribution; consumer service terms; no CE act identified | Not applicable (service) | Not applicable | Source provenance, freshness, licence records | Service terms; LEGAL_REVIEW_REQUIRED for forecast liability |
| FLEET | B2B contract, data protection, security of processing; no CE act identified | Not applicable | Not applicable | DPA, tenant isolation, audit logs | B2B contract terms |

### 5.6 Adjacent regimes considered but not auto-applied

| Regime | Why it is adjacent | Determination |
|---|---|---|
| Recreational Craft Directive 2013/53/EU (`S-18`) | Applies to craft and designated components placed on the market; MAREA hardware may be installed in craft | Not applied to MAREA hardware: MAREA does not place craft on the market and steering/navigation electronics are not among the designated components in the retrieved summary. If MAREA ever supplies a designated component or a pre-installed craft system, re-assess. The craft builder's CE obligations are unaffected by MAREA devices. LEGAL_REVIEW_REQUIRED. |
| Spanish national equipment homologation (RD 1837/2000; Orden FOM/2258/2015 Annex A.1; RD 701/2016) (`S-19`) | Spain maintains equipment homologation and inspection rules for civil vessels alongside the MED | Not applied automatically. Whether any MAREA item falls under the Annex A.1 list was not verified; LEGAL_REVIEW_REQUIRED. |
| Battery Regulation (EU) 2023/1542 | WATCH backup batteries, DISPLAY or SENSE batteries would be in scope | Not assessed in this audit; OPEN before any SKU with an internal battery. |
| GDPR (EU) 2016/679 | WATCH/FLEET process vessel and account data | Not a product-safety regime; requires separate assessment by the data-protection workstream. |
| Radio licensing and spectrum use (national) | Any transmitter (Wi-Fi, cellular) must use permitted bands and power | Covered indirectly by RED conformity; no separate national licence analysis performed. |
| Portugal national implementation | The mandate covers ES and PT; EU regulations (GPSR, CRA) apply directly in Portugal, while directives are implemented by Portuguese national law | NOT_YET_ASSESSABLE in this audit: no Portuguese official source was retrieved. Before selling in Portugal, retrieve the Portuguese transposition of MED 2014/90/EU, WEEE 2012/19/EU and RoHS 2011/65/EU and the Portuguese market-surveillance authority's guidance, then re-run this matrix for PT. Recorded as OPEN, not assumed identical to Spain. |

### 5.7 Decisions requiring accredited laboratory, compliance engineer or legal counsel

| Decision | Owner | Why it cannot be decided in this audit |
|---|---|---|
| EMC test plan and pre-compliance measurements for the 20 kHz PWM motor drive and brushed motor | Accredited EMC laboratory | Requires physical article and chamber measurements; none exist |
| RED test route (self-declaration vs notified body) and radio module host integration conditions | Compliance engineer / notified body | Depends on the radio choice and module certification conditions |
| GPSR risk assessment and technical documentation per SKU | Compliance engineer plus legal counsel | Requires the frozen product definition and hazard analysis |
| CRA product classification, conformity route and vulnerability-reporting process | Legal counsel plus security lead | Classification of each SKU as default/important/critical is a legal determination |
| RoHS material declarations and technical file | Compliance engineer and supplier quality | Requires supplier declarations that do not exist |
| WEEE producer registration and take-back financing in Spain | Legal counsel | Requires the selling entity's establishment status and product categories |
| MED scope opinion and wheel-mark strategy | Legal counsel plus notified body | Depends on the target vessel channel; the mandate explicitly forbids auto-application |
| NMEA 2000 licence, manufacturer/product code purchase and certification | Business decision plus NMEA | Requires a commercial commitment and a NMEA-certifiable product |
| GPL-3.0 compliance strategy for AIS-catcher (include, replace, or separate) | Legal counsel | Copyleft boundary depends on packaging and process separation |
| OMI licence/assignment for commercial reuse | Legal counsel plus OMI rightsholders | No licence exists today (R-01) |
| PILOT functional-safety case and sea-trial protocol sign-off | Competent marine engineer / naval architect | Requires vessel access and specialist judgement |
| Product-liability and insurance position for steering control | Legal counsel and insurer | Commercial risk decision |

### 5.8 Standing non-assertions

This document does not assert, and must not be read as asserting: CE marking; an EU declaration of conformity; EMC, RED, LVD, RoHS, WEEE, GPSR or CRA compliance; NMEA 2000 certification or licence; NMEA 0183 conformity; Signal K compatibility certification; MED wheel-mark approval; AIS type approval; any notified-body certificate; any test report; any sea trial; any bench measurement; any supplier authorisation; any trademark clearance; any price. None of these exists in the audited evidence.

---

## 6. Evidence register

### 6.1 Internal evidence (OPEN-MARINE at `403941b8860439115418b1786d8431284d2dae08`)

| Group | Files read |
|---|---|
| Firmware | `marine-autopilot-engine/pico2/main.py`, `motor_policy.py`, `build_config.py`, `pico_motor_cli.py`, `install.sh`, `tests/test_bench_motor.py`, `profiles/bench-led.py`, `profiles/bench-motor.py`, `profiles/motor-commissioning.py`, `profiles/hil-motor.py`, `profiles/production.py` |
| Autopilot engine | `src/engine.ts`, `src/config.ts`, `src/cli.ts`, `src/types.ts`, `src/app/state-machine.ts`, `src/app/command-api.ts`, `src/actuators/relay.ts`, `src/actuators/alarm.ts`, `src/actuators/backends/serial-backend.ts`, `gpio-backend.ts`, `can-backend.ts`, `hil-backend.ts`, `src/safety/fault-manager.ts`, `watchdog.ts`, `limits.ts`, `src/sensors/sensor-base.ts`, `src/signalk/signalk-sensor-source.ts`, all `src/__tests__/*.test.ts` |
| Sensors | `marine-sensor-gateway/src/adapters/*.ts`, `src/gateway.ts`, `src/ais/*.ts`, `rpi/omi-imu/01_test_gps.py`, `02_publish_gps_signalk.py`, `02_publish_signalk.py`, `setup.sh`, `setup_gps.sh`, `rpi/wind/wind_nmea.py`, `03_publish_wind_signalk.py` |
| Deploy / ops | `scripts/pico2-motor.ps1`, `scripts/pico2/*.ps1`, `scripts/pico2/*.sh`, `scripts/start-ais.sh`, `scripts/init.sh`, `scripts/migrate-to-raspberry.sh`, `signalk-runtime/docker-compose.yml`, `.github/workflows/ci.yml` |
| Docs | root `README.md`, `docs/RASPBERRY_DEPLOYMENT.md`, `docs/RASPBERRY_CONNECTION.md`, `docs/PICO2_MD30C_MOTOR_GUIDE_ES.md`, `docs/WIND_GPS_DEMO.md`, `marine-autopilot-engine/docs/MOTOR_PROTOCOL.md`, `marine-autopilot-engine/pico2/README.md` |
| Config | `config/omi.env.example`, `config/raspberry.env.example`, all `package.json` |
| History | `git log --oneline` (82 commits); no commit message references a bench run, sea trial or certification |

### 6.2 External sources (retrieved 2026-10-30 unless the row says otherwise)

| ID | Source | URL | Used for |
|---|---|---|---|
| S-01 | NMEA — NMEA 2000 standards page | https://www.nmea.org/nmea-2000.html | Certification requirement, licence, manufacturer/product codes, trademark |
| S-02 | NMEA — NMEA 0183 standards page | https://www.nmea.org/nmea-0183.html | Copyright status, purchase/licence, manufacturer mnemonic codes |
| S-03 | NMEA — association home page | https://www.nmea.org/ | Trademark ownership context |
| S-04 | Signal K project site | https://signalk.org/ | Project identity and positioning |
| S-05 | Signal K specification — LICENSE | https://raw.githubusercontent.com/SignalK/specification/master/LICENSE | CC BY-SA 2.0 for the specification |
| S-06 | Signal K specification — README | https://raw.githubusercontent.com/SignalK/specification/master/README.md | Specification repository structure and publication path |
| S-07 | Signal K server — LICENSE | https://raw.githubusercontent.com/SignalK/signalk-server/master/LICENSE | Apache-2.0 for the server |
| S-08 | EUR-Lex — Directive 2014/30/EU (EMC), full text | https://eur-lex.europa.eu/eli/dir/2014/30/oj | Scope (Art. 2), exclusions, CE/marking and documentation obligations |
| S-09 | European Commission — Radio Equipment Directive page | https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red_en | RED scope, dates, CRA timeline, RED cybersecurity delegated act repeal, unregulated-certificate warning |
| S-10 | European Commission — Low Voltage Directive page | https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/low-voltage-directive-lvd_en | LVD voltage thresholds and scope |
| S-11 | EUR-Lex — GPSR summary (CELEX 32023R0988) | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32023R0988 | GPSR scope, exclusions, economic-operator obligations |
| S-12 | EUR-Lex — MED summary (CELEX 32014L0090) | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32014L0090 | MED scope (EU-flag ships under conventions), wheel mark, notified bodies |
| S-13 | EUR-Lex — RoHS summary (CELEX 32011L0065) | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32011L0065 | RoHS scope and obligations |
| S-14 | EUR-Lex — WEEE summary (CELEX 32012L0019) | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32012L0019 | WEEE scope, producer responsibility, exclusions |
| S-15 | European Commission — RoHS page | https://environment.ec.europa.eu/topics/waste-and-recycling/rohs-directive_en | RoHS/WEEE framing |
| S-16 | European Commission — WEEE page | https://environment.ec.europa.eu/topics/waste-and-recycling/waste-electrical-and-electronic-equipment-weee_en | WEEE framing and collection context |
| S-17 | European Commission — Cyber Resilience Act page | https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act | CRA scope, entry into force, application dates, CE marking, reporting obligations |
| S-18 | EUR-Lex — Recreational Craft Directive summary (CELEX 32013L0053) | https://eur-lex.europa.eu/legal-content/EN/LSU/?uri=CELEX:32013L0053 | Adjacent regime check for installed systems |
| S-19 | Spain — Dirección General de la Marina Mercante, homologación de equipos | https://www.transportes.gob.es/marina-mercante/nautica-de-recreo/normas-de-seguridad-y-recomendaciones/homologacion-de-equipos/homologacion-de-equipos-marinos | Spanish MED transposition (RD 701/2016), national rules (RD 1837/2000, Orden FOM/2258/2015), wheel-mark modules, notified-body database |
| S-20 | AIS-catcher — LICENSE | https://raw.githubusercontent.com/jvde-github/AIS-catcher/main/LICENSE | GPL-3.0 |
| S-21 | MicroPython — LICENSE | https://raw.githubusercontent.com/micropython/micropython/master/LICENSE | MIT, plus third-party licence summary |
| S-22 | Raspberry Pi — Pico 2 product information portal | https://pip.raspberrypi.com/categories/1005-raspberry-pi-pico-2 | Existence of official datasheet, pinout, product brief and a compliance document subcategory |
| S-23 | Raspberry Pi — Pico 2 datasheet (PDF asset path) | https://pip-assets.raspberrypi.com/categories/1005-raspberry-pi-pico-2/documents/RP-008299-DS-3-pico-2-datasheet.pdf | Existence inferred from `S-22`; **not retrieved**, so no electrical or thermal parameter is quoted from it |

### 6.3 Referenced but not verified

| Reference | Status |
|---|---|
| Cytron MD30C R2 product page cited at `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:597` | URL returned HTTP 404 through the retrieval endpoint on 2026-10-30; no manufacturer specification could be verified |
| Raspberry Pi Pico documentation page cited at `OM:docs/PICO2_MD30C_MOTOR_GUIDE_ES.md:595` | Retrieval endpoint returned HTTP 404 on 2026-10-30 although a search index still lists the page; not verified |
| Pico 2 datasheet PDF (`S-23`) | Listed with status "not retrieved" in section 6.2; existence inferred from the vendor portal only |
| `mared.org` notified-body database cited at `S-19` | Not retrieved; no wheel-mark certificate was searched |
| `pynmea2`, `pyserial`, `requests`, `websocket-client`, `icm20948`, `mpremote` licences | Not retrieved in this hardware audit; the programme inventory `EB:docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv` records PyPI-verified licences for the Python dependencies |

---

## 7. OPEN items and blockers

| ID | Open item | Blocking effect |
|---|---|---|
| O-01 | OMI licence/assignment for commercial reuse (R-01) | Blocks every hardware SKU: firmware and engine code cannot be redistributed without a grant |
| O-02 | Hardware BOM with manufacturer part numbers, revisions and suppliers | Blocks traceability, RoHS/WEEE, EMC planning and pricing |
| O-03 | ST3000 drive datasheet, condition report and torque/current measurements | Blocks PILOT compatibility envelope and fuse coordination |
| O-04 | Rudder position sensor decision and implementation (or formal open-loop risk acceptance) | Blocks PILOT control claims and end-stop protection |
| O-05 | Independent MCU hardware watchdog and relay/power-cut implementation | Blocks the documented fail-safe architecture |
| O-06 | Control-plane authentication/authorisation and TLS for the autopilot API | Blocks any network-exposed PILOT/HUB deployment; CRA relevance |
| O-07 | Compass calibration/deviation procedure and heading integrity check | Blocks reliable HEADING/WIND/TRACK behaviour claims |
| O-08 | AIS-catcher licensing decision and version pinning with verification | Blocks MAREA AIS distribution |
| O-09 | NMEA 2000 licence/certification decision (or retire NMEA 2000 compatibility language) | Blocks HUB NMEA 2000 claims |
| O-10 | EMC/RED/GPSR/CRA assessment plan with an accredited lab and compliance engineer | Blocks CE marking and any EU market placement |
| O-11 | Spanish WEEE/RoHS producer registration and market-surveillance position | Blocks retail distribution in Spain |
| O-12 | Sea-trial protocol, vessel access and competent sign-off | Blocks PILOT sale readiness |
| O-13 | SBOM and licence inventory for firmware and runtime | Blocks CRA readiness and distribution notices |
| O-14 | GPL source-offer process if AIS-catcher ships | Blocks product distribution if unresolved |
| O-15 | Battery-containing SKU assessment (Battery Regulation) | Blocks WATCH revisions with internal batteries |
| O-16 | Trademark usage review for all component and standard marks in marketing copy | Blocks publication of compatibility statements |
| O-17 | Portuguese transposition and market-surveillance position (MED, WEEE, RoHS) | Blocks distribution in Portugal until assessed; not assumed identical to Spain |

---

## 8. Review status

| Review | Status |
|---|---|
| Author self-check against mandate sections 12, 13, 14, 15 | Complete |
| Independent reviewer verification of PILOT gate classification against code | Pending — reviewer must re-read F-A01 to F-A28 evidence lines |
| Independent reviewer verification of regulatory applicability against cited sources | Pending — reviewer must confirm C-01 to C-09 and the 33/10/37/1 counts |
| Legal review of MED, GPSR, CRA and Spanish national positions | Pending |
| Marine engineering review of the PILOT safety case | Pending |
