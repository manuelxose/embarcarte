# MC-11 — Embedded architecture options (D4)

| Field | Value |
|---|---|
| Document | D4 `MC11-EMBEDDED-ARCHITECTURE-OPTIONS.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 4) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `hw-architect` |
| Machine records | `data/architecture-options.json` (33 options, frozen weights, computed scores) |

**Evidence states.** No supplier contact, no RFQ, no purchase, no sample, no bench or laboratory
measurement, no certification, no customer evidence (`NONE`). `PILOT_SAFETY_GATE = BLOCKED`,
`AIS_TRANSMISSION_OFFERED = false`, `NMEA2000_CERTIFIED = false`, `TESTED_COMPATIBILITY_ROWS = 0`.
This document authorises nothing and freezes no design; `G1_ARCHITECTURE_SELECTION = CANDIDATE_ONLY`.

**What is verified about candidate parts.** Only the following were retrieved from manufacturer pages
in this session and may be stated as manufacturer facts: Raspberry Pi 5 (`EVD-MC11-005/006/018`),
Raspberry Pi Pico 2/RP2350 (`EVD-MC11-007/008`), Toradex Verdin iMX8M Plus (`EVD-MC11-010/011`),
ST STM32H743ZI (`EVD-MC11-012`), u-blox MAX-M10 (`EVD-MC11-013`), Microchip ATECC608B (`EVD-MC11-014`),
Digital Yacht iKonvert (`EVD-MC11-009`), NMEA official pages (`EVD-MC11-001…004`), RED (`EVD-MC11-015/016`).
The Cytron MD30C R2 page could **not** be retrieved (`EVD-MC11-017`) and therefore **no Cytron parameter
is asserted**. The Pico 2 datasheet PDF could not be retrieved (`EVD-MC11-019`), so no Pico 2
absolute-maximum, GPIO-voltage or temperature value is asserted.

---

## 1. The five architecture classes

The classes are the program's fixed vocabulary; they describe how compute is sourced, not which product
they belong to.

| Class | Definition | What it buys | What it costs |
|---|---|---|---|
| **A — Development board** | A retail single-board computer (SBC) or development board plus HATs/shields | Fastest route to a bench prototype; public documentation; low NRE | Consumer-grade lifecycle and environmental limits; no industrial change control; poor fit for production |
| **B — Compute module / industrial SOM** | A documented system-on-module on a MAREA carrier board | Industrial temperature class, published lifecycle, vendor BSP and security tooling | Custom carrier NRE, second board, vendor lock-in |
| **C — Custom MCU / gateway** | A single microcontroller (with or without RTOS) and a fully custom board | Determinism, lowest power, lowest BOM at volume, minimum firmware surface | Firmware scope, tooling and conformity all first-principles; no Linux software reuse |
| **D — Hybrid** | A low-power MCU for acquisition/supervision plus an application processor for services | Deterministic acquisition and safe state, with a rich application environment | Highest component count; inter-processor failure modes |
| **E — Software/service-first** | No MAREA proprietary hardware in the critical path; integrate certified third-party equipment behind MAREA software | No tooling, no RF/EMC of a new appliance, fastest learning | No hardware margin or differentiation; third-party lifecycle and interoperability control |

**Rule applied throughout:** an option's score never overrides a hard gate. PILOT is `BLOCKED` whatever
it scores; AIS transmission is not an option in any class; FLEET includes no default hardware; NMEA 2000
is not claimed in any class.

---

## 2. HUB candidate architectures (at least three credible candidates)

The HUB is the only family where all five classes are commercially plausible, so it is the worked
example. The candidate part families below are named only where a manufacturer page was retrieved;
where a value was not retrieved it is marked `UNVERIFIED`.

### 2.1 `ARCH-HUB-A` — Development-board appliance (Raspberry Pi 5 class)

- **Verified candidate:** Raspberry Pi 5 (Raspberry Pi Ltd), part family `Raspberry Pi 5`, 4 GB and 8 GB
  variants (manufacturer page `EVD-MC11-005/006`). Characteristics from the manufacturer: 2.4 GHz
  quad-core 64-bit Arm Cortex-A76, dual-band 802.11ac Wi-Fi, Bluetooth 5.0/BLE, Gigabit Ethernet,
  2× USB 3.0 + 2× USB 2.0, PCIe 2.0 ×1, standard 40-pin GPIO header (3.3 V I/O), real-time clock,
  microSD boot, 5 V/5 A USB-C power mode, peak consumption around 12 W for pathological workloads,
  USD 60 (4 GB) / USD 80 (8 GB) at launch. Raspberry Pi states Raspberry Pi OS is the sole supported
  first-party OS (`EVD-MC11-018`).
- **Not retrieved / `UNVERIFIED`:** operating temperature range, ingress, vibration, EMC qualification,
  GPIO absolute-maximum ratings, lifecycle/PCN commitment, distributor price and availability.
- **Architecture:** SBC + a HAT stack (isolated NMEA 0183 interface, power-protection HAT, possibly a
  CAN HAT that would remain unusable without NMEA 2000 licensing). Fits the 12 V vessel only through an
  external DC/DC converter and protection board.
- **Why it scores 3.12:** strong feasibility, availability and connectivity; weak supplier longevity
  (consumer SBC), weak energy, weak conformity (the assembled appliance has no marine qualification)
  and weak mechanical integration.

### 2.2 `ARCH-HUB-B` — Industrial SOM on a MAREA carrier (Toradex Verdin iMX8M Plus class)

- **Verified candidate:** Toradex `Verdin iMX8M Plus` (ITPN 0058/0063/0070 etc.; manufacturer page
  `EVD-MC11-010/011`). Characteristics from the manufacturer: NXP i.MX 8M Plus with up to four
  1.6 GHz Cortex-A53 plus an 800 MHz Cortex-M7F, up to 8 GB LPDDR4 and up to 32 GB eMMC, 2× Gigabit
  Ethernet, 2× CAN FD, 4× UART, 5× I2C, 3× SPI, Wi-Fi 5 2×2 and Bluetooth 5.3 on wireless variants,
  −40 to +85 °C, minimum product commitment 2036+ for the listed variants, some variants in mass
  production.
- **Architecture:** SOM + custom MAREA carrier that owns power protection, isolation, connectors,
  enclosure, RTC backup and test access. **Primary NMEA 2000 risk is unchanged:** the two CAN FD
  controllers are hardware, not NMEA 2000 certification, and must not be used to imply NMEA 2000.
- **Why it scores 3.85:** best-in-class availability and longevity, unchanged security and connectivity,
  but a carrier board NRE and a higher BOM than a retail SBC.

### 2.3 `ARCH-HUB-C` — Custom MCU gateway (STM32H743 class, no general-purpose OS)

- **Verified candidate:** STMicroelectronics `STM32H743ZI` (manufacturer page `EVD-MC11-012`):
  Cortex-M7 up to 480 MHz, up to 2 MB dual-bank flash and 1 MB RAM, 1.62–3.6 V supply and I/O,
  2× CAN controllers with CAN FD, independent and window watchdogs, RTC, 3× ADC, Ethernet MAC,
  2.95 µA in Standby; vendor lists the part as active and in volume production. Price not retrieved.
- **Architecture:** MCU + Ethernet PHY + isolated NMEA 0183 front end + optional radio module. No Linux,
  so no containerised services, no browser dashboard host and no reuse of the existing Node/TypeScript
  stack; the local interface and TLS stack must be written for a constrained target.
- **Why it scores 3.62:** best energy and a small security surface, but maintainability, connectivity and
  the firmware NRE are penalised.

### 2.4 `ARCH-HUB-D` — Hybrid (low-power MCU acquisition + application processor services)

- **Candidates (not selected):** application processor from class B (Toradex Verdin iMX8M Plus) or class
  A (Raspberry Pi 5, with its documented power and lifecycle limits) plus a supervisory MCU from class C
  (STM32H743 or an RP2350-class device, `EVD-MC11-007/012`). Secure element candidate:
  Microchip `ATECC608B` — **but this part is marked "Not Recommended for new designs"** at retrieval
  (`EVD-MC11-014`), so the secure-element family must be re-selected before any design freeze.
- **Architecture:** MCU owns time-critical capture, isolation supervision, watchdog, safe-state and
  buffered storage of last-known-good; application processor owns normalisation, dashboard, retention
  and updates. Boot order and inter-processor watchdog are first-class design items, not details.
- **Why it scores 3.85 (tied with B):** the only option that satisfies deterministic acquisition and
  rich local services while keeping a proprietary appliance. The tie with B is broken on requirements,
  not on score: D7 selects D as the engineering preference and states why.

### 2.5 `ARCH-HUB-E` — Software/service-first (third-party certified gateway + MAREA software)

- **Candidates (third party, not selected, not contacted):** documented NMEA 2000→USB gateways in the
  class of the Digital Yacht `iKonvert` (manufacturer page `EVD-MC11-009`: powered from the NMEA 2000
  network, full galvanic isolation between USB and NMEA 2000, FTDI USB, 230 kbaud RAW PGN mode,
  4.8/38.4/115 kbaud NMEA 0183 modes, and **bidirectional** — it can send routes/waypoints back onto
  the network where software supports it). A bidirectional gateway must be constrained to read-only by
  architecture, not by good intentions.
- **Architecture:** MAREA publishes a local data contract and a support list; the customer installs a
  certified gateway/Signal K server; MAREA software provides the vessel model, diagnostics and support
  experience. No MAREA appliance, tooling, EMC programme or enclosure.
- **Why it scores 4.53 — the highest of all 33 options:** it maximises feasibility, availability, cost
  certainty, maintainability and field service while avoiding every hardware burden. **It is not the
  engineering preference** (D7 §3): the HUB's canonical commercial definition is a proprietary appliance,
  and the weights do not measure brand differentiation, margin on hardware or control of the support
  boundary. The high score is reported honestly and escalated as a commercial-strategy decision for the
  Lead, not silently discarded.

---

## 3. Scoring — frozen criteria, arithmetic shown

Weights are copied verbatim from D2 §6 and were not changed after any score was assigned. Sum = 100.
Each criterion is scored 1–5 (5 = best on that criterion; for "conformity complexity" and "field-service
requirements" the scale is defined so that 5 = simplest/easiest, as in D2 §6). Weighted score =
Σ(score × weight) / 100.

### 3.1 HUB options — full arithmetic

Weights in column order: technical feasibility 15 · component availability 10 · supplier longevity 10 ·
energy consumption 5 · manufacturing cost uncertainty 8 · conformity complexity 12 · maintainability 8 ·
connectivity 6 · security 8 · mechanical integration 8 · field-service requirements 10.

| Option | Scores | Weighted contributions (score×weight) | Total ÷100 |
|---|---|---|---|
| A dev board | 4,5,2,2,3,2,4,5,2,2,3 | 60,50,20,10,24,24,32,30,16,16,30 = 312 | **3.12** |
| B industrial SOM | 4,4,5,3,2,4,4,5,4,4,3 | 60,40,50,15,16,48,32,30,32,32,30 = 385 | **3.85** |
| C custom MCU | 3,5,4,5,2,4,3,3,3,4,4 | 45,50,40,25,16,48,24,18,24,32,40 = 362 | **3.62** |
| D hybrid | 4,4,4,3,2,4,4,5,4,4,4 | 60,40,40,15,16,48,32,30,32,32,40 = 385 | **3.85** |
| E software-first | 5,5,3,4,5,5,5,4,3,5,5 | 75,50,30,20,40,60,40,24,24,40,50 = 453 | **4.53** |

Arithmetic check for option A: 60+50+20+10+24+24+32+30+16+16+30 = 312; 312/100 = 3.12. The same
division is applied to every option and the computed value is stored in `architecture-options.json`
(`weightedScore`, 2 decimals).

### 3.2 All 33 scored options (summary)

| Family | A | B | C | D | E |
|---|---:|---:|---:|---:|---:|
| HUB | 3.12 | 3.85 | 3.62 | **3.85** | **4.53** |
| AIS | 2.86 | 3.21 | 2.95 | 3.62 | **4.86** |
| WATCH | 2.95 | 3.45 | 3.81 | **3.90** | 4.06 |
| SENSE | 3.25 | 3.43 | **4.16** | 3.74 | 4.50 |
| DISPLAY | 4.03 | **3.69** | 2.98 | **3.69** | 4.50 |
| PILOT | 2.33 | 2.86 | 2.65 | 3.02 | 4.41 |
| NAV / WEATHER / FLEET | — | — | — | — | 4.74 each |

Read this table the way the program requires: **a high score is not an approval**. AIS-E and PILOT-E
score high because a no-hardware posture avoids hardware risk, which is exactly the point; the AIS
recommendation is E on the merits (D9 §2) while PILOT-E is the only posture compatible with the gate,
not a preferred steering product. DISPLAY-A and DISPLAY-E outscore the recommended D because the
criteria reward avoiding panel and enclosure work; D7/D9 explain why the recommendation is not the
highest score.

### 3.3 Why score ≠ recommendation

Four things the frozen weights cannot measure and which the Lead must decide commercially:

1. **Brand and product control.** A software-only or third-party-hardware posture leaves MAREA without
   the appliance the HUB product definition describes.
2. **Margin structure.** A hardware appliance and a subscription are different businesses; the weights
   contain no margin criterion.
3. **Support boundary.** A third-party gateway shifts part of the fault surface outside MAREA's control.
4. **Evidence quality.** Scores are engineering judgement informed by manufacturer pages, not by a
   measured prototype. There is no prototype.

The explicit engineering preferences (not approvals) are recorded in `architecture-options.json`
`recommendations[]`: HUB-D, AIS-E, PILOT-E (defer), SENSE-C, WATCH-D, DISPLAY-D, NAV-E, WEATHER-E,
FLEET-E, each with `explicitlyUnfrozen` text. `G1` remains `CANDIDATE_ONLY`.

---

## 4. Legacy hardware assessment (mandatory)

The legacy OPEN-MARINE stack is treated as **read-only evidence**, not as an approved design. The audited
revision identified 13 hardware components, only one with an exact manufacturer part number, none with a
board revision, and three required components that do not exist (`HARDWARE-COMPLIANCE-MATRIX.md` §2).
Its own audit records no bench log, no measurement, no BOM and no serial records. The assessment below
adds this session's verified manufacturer evidence and explicitly marks everything that is not verified.

### 4.1 Raspberry Pi single-board computer (legacy `HW-01`)

| Aspect | Verified / assessed |
|---|---|
| Manufacturer and part number | Raspberry Pi Ltd is the manufacturer of the Raspberry Pi 5 named here. The legacy repository records only the generic string "Raspberry Pi" — **no model and no revision is recorded for the legacy unit** (`MODEL_NOT_RECORDED`). The reference candidate `Raspberry Pi 5` (4 GB/8 GB) is verified as a manufacturer product (`EVD-MC11-005/006`). |
| Capabilities (verified, Pi 5) | 2.4 GHz quad Cortex-A76; dual 4Kp60 HDMI; dual-band 802.11ac Wi-Fi; Bluetooth 5.0/BLE; Gigabit Ethernet; 2× USB 3.0, 2× USB 2.0; PCIe 2.0 ×1; 40-pin GPIO; RTC; microSD boot. |
| Voltage/current limits (verified, Pi 5) | 5 V/5 A USB-C power mode documented; peak consumption around 12 W stated for pathological workloads; 3 A supply limits downstream USB current. **GPIO absolute-maximum, per-rail limits and input tolerance: `UNVERIFIED`.** |
| Connectors/interfaces (verified) | HDMI, USB-A/USB-C, Gigabit Ethernet (RJ45), 40-pin GPIO, FPC MIPI, PCIe FPC, JST fan/RTC/debug headers. |
| Documentation availability | Manufacturer announcement and documentation pages exist; product datasheet, thermal and EMC documentation **not retrieved** in this session. |
| Supply availability | Not assessed. No distributor stock or lead time retrieved; `availabilityClaim = UNKNOWN`. |
| Lifecycle | No lifecycle or PCN commitment retrieved. Consumer-product lifecycle is not a marine industrial commitment. |
| Environmental limits | `UNKNOWN` — no operating-temperature, ingress, vibration or salt-fog data retrieved. The board is not marketed as marine-qualified. |
| OS/firmware | Raspberry Pi OS is stated as the sole supported first-party OS; Debian-derived. Third-party OSes exist but are not first-party. |
| Licensing | Raspberry Pi and Pico are trademarks of Raspberry Pi Ltd; factual compatibility references only, no implied endorsement. Board documentation/schematic licensing **not verified**. |
| Public price observations | Manufacturer launch prices USD 60 (4 GB) and USD 80 (8 GB), plus taxes (`EVD-MC11-006`) — `HISTORICAL_OBSERVATION`, not a current price list, not a quotation. |
| Alternatives | Industrial SOM on a carrier (archived option B); x86 industrial SBC; ARM industrial SBC. |
| Prototype suitability | **High** — fastest path to a working bench HUB with public docs and cheap spares. |
| Commercial-production suitability | **Low** — consumer lifecycle, no marine qualification, no industrial change control, microSD failure risk, no hardware root of trust in the base design. |
| Redesign work needed | Replace with SOM or custom board; add isolated NMEA 0183 front end; add power protection and transient design; add secure element/secure boot; replace SD with eMMC or protected storage; design enclosure, harness and factory test. |
| Regulatory implications | The assembled appliance needs its own EMC assessment; Wi-Fi/BLE makes it radio equipment under RED; CRA applies if connectable. Component CE/RoHS declarations do not confer compliance on the assembly. |

### 4.2 Raspberry Pi Pico 2 / RP2350 (legacy `HW-02`)

| Aspect | Verified / assessed |
|---|---|
| Manufacturer and part number | Raspberry Pi Ltd; `Raspberry Pi Pico 2` board on `RP2350`; variants `RP2350A` (QFN60, 30 GPIO), `RP2350B` (QFN80, 48 GPIO), `RP2354A/B` with stacked 2 MB flash — all verified (`EVD-MC11-007/008`). The legacy repository records "Pico 2" and vendor portal identifiers SC1631/SC1632 but no board revision. |
| Capabilities (verified) | Two 150 MHz Arm Cortex-M33 cores with FPU/DSP; 520 KB SRAM; 4 MB external QSPI flash on Pico 2; signed-boot support; 8 KB antifuse OTP; SHA-256 acceleration; hardware TRNG; 12 PIO state machines; HSTX; external QSPI PSRAM support. |
| Voltage/current limits | `UNVERIFIED`. The datasheet PDF was not retrieved (`EVD-MC11-019`); no GPIO voltage, absolute-maximum or current value is asserted. Legacy design uses 3.3 V logic and a common ground with the motor driver — a repository fact, not a manufacturer rating. |
| Connectors/interfaces (verified) | micro-USB; 0.1-inch header pins on standard Pico 2; board is form-factor and electrically compatible with the original Pico per the manufacturer. Peripheral set (UART/SPI/I2C/PIO) documented by the SDK, not retrieved here. |
| Documentation availability | Launch announcement retrieved; datasheet, SDK and hardware design files **not retrieved**. |
| Supply availability | Manufacturer states full-rate production at launch; current stock/lead time `UNKNOWN` (no distributor data retrieved). |
| Lifecycle | No formal lifecycle statement retrieved. |
| Environmental limits | `UNKNOWN` — no temperature or qualification data retrieved. |
| OS/firmware | MicroPython, CircuitPython, Pico SDK (C/C++) and Rust support announced; legacy stack used MicroPython with `mpremote`. |
| Licensing | Trademarks of Raspberry Pi Ltd; SDK/MicroPython licence **not verified** in this session. |
| Public price observations | Board USD 5; RP2350A USD 0.80 in 3,400-unit reels, USD 1.10 single-unit (`EVD-MC11-007/008`) — manufacturer announcement prices, `HISTORICAL_OBSERVATION`. |
| Alternatives | STM32H743/H7 class (`EVD-MC11-012`), STM32G4/U5 class, ESP32-S3 class (radio included, different conformity). |
| Prototype suitability | **High** — cheap, 3.3 V logic, PIO flexible, security features usable for signed boot. |
| Commercial-production suitability | **Medium** for a supervisory MCU; no verified industrial temperature grade, no AEC-Q/industrial qualification, no formal lifecycle commitment. Acceptable only if the part's limits are verified from the datasheet first. |
| Redesign work needed | Verify temperature/EMC; add hardware watchdog (the legacy firmware had **none** — a documented safety finding F-03); replace host-side safety enforcement with MCU-enforced limits; add a real E-stop power cut (the legacy firmware only sensed GP13). |
| Regulatory implications | On-module radio none; EMC of the PWM switching node sits at the driver/motor interface, not at the MCU. No radio conformity, but CRA applies once network-connected. |

### 4.3 Cytron MD30C R2 brushed-DC motor driver (legacy `HW-03`)

| Aspect | Verified / assessed |
|---|---|
| Manufacturer and part number | Cytron Technologies is named in the repository; `MD30C R2` is the recorded product. **Manufacturer page could not be retrieved in this session** (`EVD-MC11-017`: HTTP 404 through the fetch tool; the MC-02 audit had the same result on 2026-10-30). `MANUFACTURER_SPEC_VERIFIED = false`. |
| Capabilities | `UNVERIFIED`. No manufacturer datasheet, no current, voltage, switching-frequency or protection data is asserted. Third-party reseller and student-datasheet snippets seen in search results are **not** used. |
| Voltage/current limits | `UNVERIFIED`. The repository's design assumption is a 12 V motor circuit fused at 12 A; that is an `ENGINEERING_ASSUMPTION`, not a driver rating. |
| Connectors/interfaces | Repository facts only: logic connector GND/PWM/DIR, external-PWM mode jumper JP6, separate motor power terminals, common logic ground. Not manufacturer-verified. |
| Documentation availability | **Inaccessible.** No manufacturer document is held. |
| Supply availability | `UNKNOWN`. No distributor stock or lead time retrieved. |
| Lifecycle | `UNKNOWN` (revision "R2" implies at least one revision; current status unverified). |
| Environmental limits | `UNKNOWN`. |
| OS/firmware | None (hardware). Driven by PWM/DIR from the MCU. |
| Licensing | Cytron/MD30C trademark; factual reference only. |
| Public price observations | `UNKNOWN` — no price retrieved from a trustworthy source. Hypothetical or reseller amounts are not reported. |
| Alternatives | Industrial brushed-DC servo amplifiers with datasheet DC ratings, stall protection and E-stop-compatible enable inputs; only after a steering safety case exists. |
| Prototype suitability | **Bench-only.** The legacy project explicitly restricts it to a small unloaded bench motor and forbids use with the real drive. |
| Commercial-production suitability | **None as documented** — no datasheet, no rating, no qualification, and it is a motor drive in a safety-relevant path. |
| Redesign work needed | Select a documented industrial drive; verify fuse coordination and stall behaviour; add thermal and overcurrent protection credited by two independent means; add contactor-based motor-power isolation; EMC design for the switched motor circuit. |
| Regulatory implications | The motor drive is the dominant EMC emitter and a safety-critical component; motor-drive EMC, LVD/EMC/GPSR position and insurance all depend on it. PILOT gate remains `BLOCKED`. |

### 4.4 NMEA HAT / NMEA interface hardware (legacy `HW-09`, `HW-10`)

| Aspect | Verified / assessed |
|---|---|
| What exists in the legacy stack | **Nothing physical.** `HW-09` (NMEA 2000 interface/transceiver/HAT) and `HW-10` (NMEA 0183 interface/HAT/opto-isolator) are TypeScript type declarations only; the Python publishers opened USB-serial adapters directly. `NO_ARTICLE`. |
| Manufacturer / part number | No MAREA NMEA interface exists. No "NMEA HAT" manufacturer page was retrieved in this session; a class of CAN HATs exists in the market but none was verified here, so no part is named. |
| Capabilities | NMEA 0183: a talker/listener serial bus at 4800 baud (38.4 kbaud for 0183-HS) with one talker and multiple listeners, per NMEA (`EVD-MC11-003`). NMEA 2000: multi-master CAN-based network with a 250 kbit/s physical layer, requiring NMEA licensing and certification of any product that reads or transmits (`EVD-MC11-001`). |
| Voltage/current limits | NMEA 0183 electrical interface is a differential RS-422-style loop; exact driver/receiver limits are in the copyrighted standard, which MAREA has not licensed. NMEA 2000 is a 12 V nominal network; transceiver and isolation ratings must come from the chosen component datasheet, which was not retrieved. `UNVERIFIED`. |
| Connectors | NMEA 0183: screw terminals/DE-9/USB-serial depending on product. NMEA 2000: Micro/Mini/RawNet connectors — none designed or verified here. |
| Documentation availability | NMEA official pages retrieved (`EVD-MC11-001…004`). The standards themselves are copyrighted and not held. A third-party gateway page (iKonvert) was retrieved as a comparator (`EVD-MC11-009`). |
| Supply availability | Not applicable: no article. Third-party gateway availability `UNKNOWN`. |
| Lifecycle | Not applicable. |
| Environmental limits | Not applicable; any future interface must be qualified in the appliance. |
| OS/firmware dependencies | NMEA 0183 requires a UART and sentence parser; NMEA 2000 requires a CAN controller, an NMEA-licensed stack, address claiming, PGN decoding and certification tooling. Neither exists. |
| Licensing constraints | NMEA 0183 document licence (USD 1,150 member / 7,500 / 10,000; mnemonic code USD 200) and NMEA 2000 license agreement + manufacturer code + per-product certification + logo restrictions (`EVD-MC11-001…004`). |
| Public price observations | NMEA document/code prices are official NMEA list prices (`EVD-MC11-003/004`). No hardware price was observed. |
| Alternatives | (a) isolated RS-422 front end designed in-house for 0183; (b) licensed NMEA 2000 stack on an isolated CAN transceiver; (c) third-party certified gateway (software-first option E) with the bidirectional write path constrained to read-only. |
| Prototype suitability | 0183 via USB-serial adapters is workable on a bench; NMEA 2000 is not workable before licensing, and reverse-engineered PGN libraries are not a lawful substitute for the standard. |
| Commercial-production suitability | 0183: suitable **only** with a properly isolated, protected front end and per-device qualification. NMEA 2000: not possible without licence, manufacturer code and certification. |
| Redesign work needed | Isolated transceiver, surge/ESD protection, common-mode and ground-loop analysis, connector standard, cable specification, per-sentence qualification and a published compatibility matrix. |
| Regulatory implications | An NMEA 2000 interface would add a certification programme (NMEA), an EMC surface and a MED-scope question for EU-flag vessels; no claim may be made before all three are resolved. |

### 4.5 Legacy assessment verdict

| Question | Verdict |
|---|---|
| Can the legacy development boards support a credible bench prototype of HUB/WATCH/SENSE? | **Yes** — A-class options are credible for bench work and are the right way to learn quickly. |
| Can they support a manufacturable product? | **No** — none is marine-qualified, none has an industrial lifecycle commitment, and the legacy stack has no BOM, no enclosure, no harness, no factory test and no certification. |
| Can the legacy motor-drive path support PILOT? | **No.** The driver has no verified datasheet, the MCU has no hardware watchdog, the control API was unauthenticated, there is no rudder feedback, no manual-takeover detection and no bench/sea-trial evidence. `PILOT_SAFETY_GATE = BLOCKED` and no architecture option can change that. |
| Is the legacy NMEA path a product? | **No.** No NMEA 0183 or NMEA 2000 interface exists physically; only parsers and type declarations. |
| What must be true before a prototype purchase? | A selected architecture, a frozen requirement set, an authorised BOM revision, a named supplier, purchasing authority and a safe test plan — gates `G2`/`G3`, both `NOT_AUTHORIZED` in MC-11. |

---

## 5. Open questions that block an architecture freeze

| # | Question | Why it cannot be closed in MC-11 |
|---|---|---|
| Q1 | Which HUB class (A/B/C/D/E)? | Needs a commercial decision on appliance ownership and margin, plus a funded carrier/NRE budget. |
| Q2 | Is a Wi-Fi/BLE radio in scope, and in which edition? | Edition interface boundary is `EDITION_INTERFACE_UNSPECIFIED`; adding a radio creates RED work and a new certification route. |
| Q3 | Is NMEA 2000 ever in scope? | Requires licence, manufacturer code, certification and a standard copy; no decision exists. |
| Q4 | Which secure element, given ATECC608B is NRND? | Needs a lifecycle review of alternatives; no alternative page was retrieved. |
| Q5 | Which storage and update architecture? | CRA-compliant signed update and rollback are unimplemented; storage wear and corruption are unmeasured. |
| Q6 | Does AIS receiver hardware get built at all? | D9 recommends deferring; requires a commercial decision and an RF partner. |
| Q7 | What is the WATCH modem/SIM strategy? | No modem selected, no operator contract, no coverage data. |
| Q8 | What is the DISPLAY size and panel? | `SIZE_NOT_FROZEN`; panel selection is a hardware-selection output. |
| Q9 | Is any architecture approved? | No. `G1 = CANDIDATE_ONLY`; approval requires responsible engineering sign-off that does not exist. |
