# MC-11 D11 — Component and manufacturer landscape

Status: `INTERNAL_ENGINEERING_RESEARCH` — **no purchase authorised, no supplier contacted, no quotation
obtained, no sample ordered, no account created**. This document is public-source desk research only.
Milestone MC-11, branch `feature/marea-mc11-hardware-sourcing-conformity`, session date **2026-11-02**.
Scope language: candidates for the MAREA marine gateway HUB, monitoring device WATCH, SENSE sensor
modules, DISPLAY-7 HMI (with optional touch), AIS receive-only integration, and the power / connector /
enclosure / PCB / assembly / test / packaging services around them.

Machine-readable companion: `docs/marea/hardware/data/component-register.json` (41 records) and
`docs/marea/hardware/data/evidence/sourcing.json` (43 evidence records, EVD-MC11-101…143).

---

## 0. Evidence method, and the one big environment limitation

### 0.1 Evidence tiers used (and what they are NOT)

| Tier | Label | Meaning |
|---|---|---|
| **T1** | `MANUFACTURER_WEBPAGE_VERIFIED` | The manufacturer's own **HTML product page** was fetched on 2026-11-02 and the stated parameters were read there. |
| **T2** | `SECONDARY_MANUFACTURER_DESCRIPTION_VERIFIED` | The part is described on another manufacturer's page (e.g. an MCU on a display-module page). Identity is credible; lifecycle/price are not established. |
| **T3** | `DISTRIBUTOR_LISTING_ONLY` | The only fetched source is a distributor catalogue page (manufacturer identity/specs as catalogued by the distributor). |
| **T4** | `INACCESSIBLE / UNVERIFIED` | The page could not be retrieved (see 0.2). No parameter is quoted; the record says UNKNOWN. |

### 0.2 Recorded environment limitation — **datasheet PDFs could not be retrieved**

Every attempt to fetch an `application/pdf` datasheet failed at the research tool's fetch endpoint
(HTTP 404 returned for the fetch request itself). This was reproduced on Texas Instruments
(`https://www.ti.com/lit/ds/symlink/tcan1042.pdf`, EVD-MC11-131) and STMicroelectronics
(`https://www.st.com/resource/en/datasheet/stm32h743vi.pdf`, EVD-MC11-140), and on a third-party PDF
mirror. A PDF-to-text proxy returned the manufacturer's 404 page or a 403, not the document.

Consequences, recorded rather than hidden:

1. **`datasheetStatus` is never `RETRIEVED` in this workstream.** 31 records are
   `LISTED_NOT_RETRIEVED` (the manufacturer page lists a datasheet and/or the part is listed there)
   and 10 are `NOT_FOUND` (inaccessible page).
2. **No parameter in this document is quoted "from a datasheet".** Parameters marked verified come
   from manufacturer HTML product/part-detail pages (T1/T2). Where only a distributor rendered the
   value it is marked T3.
3. A future session with ordinary network access must retrieve the datasheets and re-classify these
   records before any design freeze. This is a **known, dated limitation**, not a claim of diligence.

### 0.3 Other sources that were INACCESSIBLE on 2026-11-02 (not used for any fact)

`raspberrypi.com` (CM4), `mouser.es` / `eu.mouser.com`, `digikey.com`, `tme.eu` product pages,
`analog.com` (MAX3490), `wiznet.io` (W5500), `recom-power.com` (R-78E5.0-1.0), `taoglas.com` (antenna),
`newark.com` (Amphenol M12), `fibox.com` product pages, `nordicsemi.com`, `eurocircuits.com`,
`tuvsud.com`. Evidence records EVD-MC11-130…139 and 141…143 document these failures explicitly.
A search-engine snippet is **never** treated as evidence in MC-11.

### 0.4 Summary counts (from `component-register.json`)

| Measure | Count |
|---|---|
| Component records | 41 |
| T1 manufacturer-webpage verified | 28 |
| T3 distributor-listing only | 1 (nRF52840-QIAA-R) |
| T2 secondary-manufacturer description | 1 (STM32H757XIH6 via Riverdi) |
| Identity-only / partially verified (page fetched, key data not rendered) | 2 (BMI088, BG95-M3) |
| T4 unverified / inaccessible | 9 |
| Datasheet `RETRIEVED` | **0** (blocked, §0.2) |
| Lifecycle `ACTIVE` | 23 |
| Lifecycle `NRND` | 3 (ATECC608B, ATECC608B Trust&GO, AT24CS32) |
| Lifecycle `EOL` | 3 (MAX-M10S-00B, MAX-M10N-00B, MAX-M10M-00B) |
| Lifecycle `UNKNOWN` | 12 |
| `CRITICAL` criticality | 10 |
| `CRITICAL` + `SINGLE_SOURCE` | **0** (no CRITICAL single-source in this landscape) |

---

## 1. Block coverage map

| Block | Purpose in MAREA candidate architectures | Records | Best evidence tier |
|---|---|---|---|
| `PROC` | HUB/WATCH compute: SBC / SoM / industrial module | 6 | T1 (Toradex, Variscite); T4 for CM4 |
| `MCU` | Real-time MCU (WATCH, SENSE, HUB I/O) | 2 | T1 (STM32H743); T2 (STM32H757) |
| `CAN` | NMEA 2000/DeviceNet physical layer: transceiver, isolation, controller, connector | 4 | T1 (TI, Microchip); T4 connector |
| `N183` | NMEA 0183 RS-422/RS-485 electrical layer + isolation | 3 | T1 (TI); T4 (ADI alt) |
| `ETH` | Ethernet PHY / SPI Ethernet | 2 | T4 (both) |
| `WIFI` | Wi-Fi 6 + BLE module | 1 | T4 |
| `BLE` | BLE SoC | 1 | T3 |
| `CELL` | LTE Cat-1 / LPWA modules (EU + regional variants) | 4 | T1 (Quectel) |
| `GNSS` | GNSS receiver | 6 | T1 (u-blox) — **EOL finding** |
| `SEC` | Secure element / TPM | 2 | T1 (Microchip) — **NRND finding** |
| `PWR` | DC-DC, reverse-polarity, fuse/TVS, protection | 3 | T1 (TI); T4 (RECOM) |
| `MEM` | Non-volatile identity/config storage | 1 | T1 (Microchip) — **NRND finding** |
| `SENSE` | Battery/power monitor, temp/humidity, IMU | 3 | T1 (TI, Sensirion); identity-only (Bosch) |
| `DISP` | Sunlight-readable panel + touch + bonding | 1 | T1 (Riverdi) |
| `MECH` | IP enclosure, M12 connectors, glands, vent, stainless | 1 (+1 in CAN) | T4 enclosure product; identity T1 |
| `RF` | Antennas (GNSS, LTE, Wi-Fi/BLE) | 1 | T4 |
| `PCB` / `PCBA` / `TEST` / `PKG` / `LOG` | Services — see D12/D13; no component MPN exists | 0 components | service pages only |

Blocks `PCB`, `PCBA`, `TEST`, `PKG`, `LOG` are **services**, not components: they are covered in D12
(suppliers) and D13 (public service prices). No invented MPN is created for them.

---

## 2. PROC — compute / industrial module

| ID | Manufacturer | MPN | Function | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | 2nd source | Tier |
|---|---|---|---|---|---|---|---|---|---|---|---|
| CMP-PROC-01 | Raspberry Pi Ltd | CM4102008 | CM4 SoM candidate | **UNVERIFIED (page inaccessible)** | UNK | UNK | UNK | UNKNOWN | CRITICAL | AVAILABLE (Toradex/Variscite) | T4 |
| CMP-PROC-02 | Toradex AG | 0063 (Verdin iMX8M Plus Quad 4GB IT) | Industrial SoM | 4×A53 1.6 GHz, M7F 800 MHz, 4 GB LPDDR4, 32 GB eMMC, 2×GbE (1 TSN), 2×CAN FD, 69.6×35×6 mm, commitment 2036+ | −40…+85 °C | UNK | ETH, CAN FD, USB, PCIe, MIPI DSI, HDMI, LVDS | ACTIVE | CRITICAL | AVAILABLE | T1 |
| CMP-PROC-03 | Variscite Ltd. | VAR-SOM-MX8MP | Industrial SoM | 1.8 GHz A53, M7 800 MHz, 1–8 GB LPDDR4, 8–128 GB eMMC, 2×GbE, 2×CAN FD, 15-yr availability claim, ISO 9001/13485 self-declared | −40…+85 °C (IT) | 3.3 V | ETH, CAN FD, USB3, PCIe, MIPI DSI, LVDS, HDMI | ACTIVE | CRITICAL | AVAILABLE | T1 |
| CMP-PROC-04 | Toradex AG | 0070 | SoM + Wi-Fi 5/BT 5.3 | as 0063 with 8 GB/32 GB and pre-certified radio | −40…+85 °C | UNK | as 0063 + Wi-Fi/BT | ACTIVE | MAJOR | AVAILABLE | T1 |
| CMP-PROC-05 | Toradex AG | 0058 | SoM +Wi-Fi/BT 4 GB | as above | −40…+85 °C | UNK | as above | ACTIVE | MAJOR | AVAILABLE | T1 |
| CMP-PROC-06 | Toradex AG | 0236 | SoM +Wi-Fi/BT 64 GB eMMC | configuration variant | −40…+85 °C | UNK | as above | ACTIVE | MINOR | AVAILABLE | T1 |

**Reading.** A verified industrial SoM route exists (Toradex and Variscite are pin-documented, long-life
industrial parts with integrated CAN FD and dual Ethernet). The Raspberry Pi CM4 route — historically
the default in the OPEN-MARINE-derived stack — remains **unverified**: its product page was
inaccessible and no CM4 datasheet could be retrieved. The BOM must not carry CM4 parameters, price or
temperature grade as if observed. A carrier board is required in every PROC option; its connectors,
power sequencing and thermals are NOT designed or verified here.

---

## 3. MCU

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | 2nd source | Tier |
|---|---|---|---|---|---|---|---|---|---|---|
| CMP-MCU-01 | STMicroelectronics | STM32H743VIT6 | Cortex-M7 480 MHz, 2 MB flash, 1 MB RAM, 2×CAN FD, ETH MAC, 3×16-bit ADC, LCD-TFT, ROP/tamper | UNK (grade not rendered) | 1.62–3.6 V | CAN FD, ETH, USB, I²C, SPI, UART, SDIO | ACTIVE ("in volume production") | MAJOR | AVAILABLE | T1 |
| CMP-MCU-02 | STMicroelectronics | STM32H757XIH6 | M7 480 MHz + M4 240 MHz, 2 MB flash, 1 MB RAM (as described by Riverdi) | UNK | UNK | CAN FD, RS232/485, I²C, SPI, USB | UNKNOWN | MAJOR | AVAILABLE | T2 |

**Reading.** The STM32H7 family is a credible single real-time MCU for WATCH/SENSE and for a hybrid
HUB (SoM + MCU). The exact orderable suffix (temperature grade, package) was **not rendered** on the
retrieved page: the BOM engineer must confirm the grade before freeze. No ST price is publicly listed;
distributor pricing is required.

---

## 4. CAN — NMEA 2000 / DeviceNet physical layer

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | 2nd source | Tier |
|---|---|---|---|---|---|---|---|---|---|---|
| CMP-CAN-01 | Texas Instruments | TCAN1042HGVDR | ISO 11898-2:2016, CAN FD up to 5 Mbps ("G" option), ±70 V bus fault (H), ±16 kV HBM, 110 ns loop, SOIC-8; **TI rating: Automotive** vs **RS: 'Automotive standard: No' (CONTRADICTION)** | −55…+125 °C (TI); −55…150 °C (RS) | 4.5–5.5 V | CAN/CAN FD | ACTIVE; TI page: "a newer version is available" | CRITICAL | AVAILABLE | T1 |
| CMP-CAN-02 | Texas Instruments | ISO1042DWV | Isolated CAN transceiver, 70 V bus fault, SOIC-8 | −40…+125 °C | 5 V class | CAN/CAN FD | ACTIVE | MAJOR | AVAILABLE | T1 |
| CMP-CAN-03 | Microchip | MCP2518FD | CAN FD controller, ISO 11898-1:2015, 8 Mbps, SPI 17 MHz, 31 FIFO, 2 KB RAM, ASIL B capable, Linux ≥5.10 | −40…+150 °C | 2.7–5.5 V | SPI, CAN FD | ACTIVE ("In Production") | MAJOR | AVAILABLE | T1 |
| CMP-CAN-04 | Amphenol LTW | M12A-05PFFS-SF8001 | 5-pin M12 panel connector candidate — **UNVERIFIED** (distributor page inaccessible) | UNK | UNK | M12 A-coded | UNKNOWN | MAJOR | UNKNOWN | T4 |

**Reading.**
- The **NMEA 2000 physical layer** is standardised (ISO 11898-2, 250 kbit/s, DeviceNet-style cable and
  5-pin connectors). The transceiver/controller evidence above is about silicon, **not** about NMEA 2000
  certification. `NMEA2000_CERTIFIED = false` and `TESTED_COMPATIBILITY_ROWS = 0` remain true.
- **Critical gap:** no NMEA 2000 certificated transceiver, connector set, cable or termination evidence
  exists in this milestone. The M12 connector is listed by family only; A-coded M12 is **not**
  automatically NMEA 2000-compliant (pinout/keying/approval differ).
- The TCAN1042 automotive-rating contradiction between manufacturer and distributor is an evidence
  contradiction, not resolved by repetition; it matters if any automotive-grade claim is ever made.

---

## 5. N183 — NMEA 0183 (RS-422 / opto-isolated)

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | 2nd source | Tier |
|---|---|---|---|---|---|---|---|---|---|---|
| CMP-N183-01 | Texas Instruments | SN65HVD78D | 3.3 V half-duplex RS-485, 50 Mbps, >15 kV HBM, >12 kV IEC 61000-4-2, 80 mV hysteresis, <2 µA standby | −40…+125 °C | 3.3 V | RS-485/UART | ACTIVE | MAJOR | AVAILABLE | T1 |
| CMP-N183-02 | Texas Instruments | ISO7721DR | Reinforced 2-ch isolator, 100 Mbps, up to 5000 V<sub>RMS</sub>, ±100 kV/µs CMTI, UL/VDE/IEC certifications listed; **TI showed "Out of stock" on 2026-11-02** | −55…+125 °C | 2.25–5.5 V | digital I/O | ACTIVE | MAJOR | AVAILABLE | T1 |
| CMP-N183-03 | Analog Devices (Maxim) | MAX3490ESA+ | Alternative RS-485/422 transceiver — **UNVERIFIED** | UNK | UNK | RS-485/422 | UNKNOWN | MINOR | UNKNOWN | T4 |

**Reading.** NMEA 0183 needs **galvanic isolation** (the standard's opto-isolated input), not just a
transceiver. A transceiver + digital isolator + isolated DC-DC is the realistic chain; none of these
three parts alone constitutes a compliant NMEA 0183 port, and no compatibility test exists
(`TEST_REQUIRED`). The ISO7721 out-of-stock observation is point-in-time only.

---

## 6. ETH, WIFI, BLE

| ID | Manufacturer | MPN | Function | Verified parameters | Temp | Lifecycle | Crit. | Tier |
|---|---|---|---|---|---|---|---|---|
| CMP-ETH-01 | Microchip | KSZ8081RNB | 10/100 PHY | **UNVERIFIED** (URL resolved to generic page) | UNK | UNKNOWN | MAJOR | T4 |
| CMP-ETH-02 | WIZnet | W5500 | SPI Ethernet | **UNVERIFIED** (inaccessible) | UNK | UNKNOWN | MINOR | T4 |
| CMP-WIFI-01 | Espressif | ESP32-C6-MINI-1-N4 | Wi-Fi 6 + BLE module | **UNVERIFIED** (module table not rendered; TME page inaccessible) | UNK | UNKNOWN | MAJOR | T4 |
| CMP-BLE-01 | Nordic Semiconductor | nRF52840-QIAA-R | BLE 5 multiprotocol SoC | QFN-73, 2.4 GHz (distributor listing); **RS: "No disponible actualmente", planned range withdrawal** | −40…+85 °C | ACTIVE (manufacturer unverified) | MAJOR | T3 |

**Reading.** Connectivity silicon is where the research environment failed most. No Wi-Fi/BLE module
was verified from a manufacturer page. Two implications:

1. HUB designs that use a SoM with integrated Wi-Fi/BT (CMP-PROC-04/05) avoid a separate module
   decision for the radio, but the **RED radio assessment of the assembled product is still required**.
2. The nRF52840 is a real, widely used part but its distributor line is ending at RS; a second
   authorised distributor and the manufacturer lifecycle statement must be obtained before freeze.

---

## 7. CELL — cellular modules

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | 2nd source | Tier |
|---|---|---|---|---|---|---|---|---|---|---|
| CMP-CELL-01 | Quectel | EG915U-EU | LTE Cat 1 bis, LGA 23.6×19.9×2.4 mm, 10/5 Mbps, 3GPP Rel-13, optional BT/Wi-Fi scan, DFOTA | −40…+85 °C | UNK | USB, UART, SIM, analog audio | ACTIVE | CRITICAL | AVAILABLE (BG95 family per Quectel) | T1 |
| CMP-CELL-02 | Quectel | BG95-M3 | LPWA alternative — compatibility with EG915U **stated by Quectel**, specific orderable unverified | UNK | UNK | USB, UART, SIM | UNKNOWN | MINOR | UNKNOWN | T4 |
| CMP-CELL-03 | Quectel | EG915U-CN | China-band variant (not for EU) | −40…+85 °C | UNK | USB, UART, SIM | ACTIVE | MINOR | AVAILABLE | T1 |
| CMP-CELL-04 | Quectel | EG915U-LA | Latin-America variant (not for EU) | −40…+85 °C | UNK | USB, UART, SIM | ACTIVE | MINOR | AVAILABLE | T1 |

**Reading.** The EU orderable is **EG915U-EU** and must be specified explicitly; -CN/-LA are different
band sets. Module approvals do not certify a MAREA product. SIM/eSIM strategy, roaming, data cost and
operator agreements remain `NOT_SELECTED` (MC-10 HW-02) — no cellular subscription or provider
agreement exists.

---

## 8. GNSS — and a hard lifecycle finding

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Lifecycle | Crit. | Tier |
|---|---|---|---|---|---|---|---|---|
| CMP-GNSS-01 | u-blox | MAX-M10S-00B | M10 module, ROM/TCXO/LNA/SAW, LCC 9.7×10 mm, UART/I²C, <25 mW family claim | −40…+85 °C | ≤3.6 V (variant dependent) | **EOL** — "This product is not longer available" | CRITICAL | T1 |
| CMP-GNSS-02 | u-blox | MAX-M10N-00B | M10 flash variant, additional LNA/SAW | −40…+85 °C | ≤5.5 V (variant) | **EOL** | MINOR | T1 |
| CMP-GNSS-03 | u-blox | MAX-M10M-00B | M10 ROM/XTAL variant | −40…+85 °C | ≤5.5 V (variant) | **EOL** | MINOR | T1 |
| CMP-GNSS-04 | u-blox | ZED-F9P-15B | Multi-band L1/L5 RTK, 4 constellations, jamming detection, Galileo OSNMA, 17×22×2.4 mm, secure boot | −40…+85 °C | 2.7–3.6 V | ACTIVE (published price 124.62 USD) | MAJOR | T1 |
| CMP-GNSS-05 | u-blox | ZED-F9P-04B | Multi-band L1/L2 RTK | −40…+85 °C | 2.7–3.6 V | ACTIVE (127.42 USD) | MAJOR | T1 |
| CMP-GNSS-06 | u-blox | ZED-F9P-05B | Multi-band L1/L2 RTK | −40…+85 °C | 2.7–3.6 V | ACTIVE (127.42 USD) | MAJOR | T1 |

**Hard finding.** Every MAX-M10 variant is marked *"This product is not longer available"* on the
u-blox page on 2026-11-02. The program's inherited GNSS assumption (a cheap M10-class receiver) is
therefore **not sourceable as recorded**. Options are (a) a currently-available u-blox successor, (b) a
different GNSS vendor, or (c) the far more expensive ZED-F9P — whose RTK precision is **not a validated
MAREA requirement** and must not be marketed. No replacement was verified in this session.

---

## 9. SEC — secure element / TPM

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | Tier |
|---|---|---|---|---|---|---|---|---|---|
| CMP-SEC-01 | Microchip | ATECC608B | ECC-P256 (ECDH/ECDSA), SHA-256/HMAC, AES-128-GCM, 16 key slots, RNG, 2 monotonic counters, <150 nA sleep | up to +100 °C | 2.0–5.5 V (IO 1.8–5.5 V) | I²C, single-wire | **NRND** ("Not Recommended for new designs") | CRITICAL | T1 |
| CMP-SEC-02 | Microchip | ATECC608B Trust&GO | Pre-provisioned TLS variant named on the same page | UNK | UNK | I²C, single-wire | **NRND** | MAJOR | T1 |

**Reading.** A hardware root of trust is the right direction for CRA-era device security, but the most
common low-cost secure element in hobby/IoT designs is **NRND**. No TPM 2.0 part was verifiable in this
session. Device identity, secure boot, signed updates and key management must be re-specified with an
active part; ATECC608B must not be frozen into a long-life marine product without a lifecycle
decision. Cloud/CA provisioning implications are out of scope here.

---

## 10. PWR — power, protection, TVS/fuse

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Lifecycle | Crit. | Tier |
|---|---|---|---|---|---|---|---|---|
| CMP-PWR-01 | Texas Instruments | LMR33630ADDA | Buck 3.8–36 V in, 1–24 V out, 3 A, 400 kHz/1.4/2.1 MHz, >95 % peak efficiency claim, 25 µA Iq, HSOIC-8 | −40…+125 °C (Tj) | 3.8–36 V | ACTIVE | CRITICAL | T1 |
| CMP-PWR-02 | Texas Instruments | LM74700QDBVRQ1 | Ideal-diode controller 3.2–65 V, −65 V reverse, 20 mV regulation, <0.75 µs reverse blocking, AEC-Q100 G1, SOT-23-6 | −40…+125 °C | 3.2–65 V | ACTIVE | MAJOR | T1 |
| CMP-PWR-03 | RECOM | R-78E5.0-1.0 | 5 V 1 A module candidate — **UNVERIFIED** | UNK | UNK | UNKNOWN | MINOR | T4 |

**Reading.** A 36 V/65 V front end is *not* a marine transient rating by itself. Reverse-polarity,
surge/load-dump, fuse/PTC, TVS and inrush selection are required and **no TVS, fuse or PTC part was
verified** in this session (Littelfuse/Bourns pages were not retrieved). The power block is only
partially covered: the DC-DC and ideal-diode controller are evidenced; protection passives are not.

---

## 11. MEM

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | Tier |
|---|---|---|---|---|---|---|---|---|---|
| CMP-MEM-01 | Microchip | AT24CS32 | 32 Kbit I²C EEPROM, 1.7–5.5 V, 1 MHz, 1 M cycles, >100 yr retention, 128-bit factory serial, SOIC/TSSOP/UDFN/SOT23 | UNK | 1.7–5.5 V | I²C | **NRND** | MAJOR | T1 |

**Reading.** A factory-unique serial is attractive for device identity and traceability, but this part
is NRND. If a serial is used for provisioning or anti-counterfeit, an active alternative must be found.

---

## 12. SENSE — battery/power, environment, motion

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | Tier |
|---|---|---|---|---|---|---|---|---|---|
| CMP-SENSE-01 | Sensirion | SHT40-AD1B-R2 | ±1.8 %RH typical / ±3.5 % max, ±0.2 °C typical, 0.4 µA average, DFN 1.5×1.5×0.5 mm, factory calibrated, T&R 2500/10000 | −40…+125 °C | 1.08–3.6 V | I²C | ACTIVE | MAJOR | T1 |
| CMP-SENSE-02 | Texas Instruments | INA228AIDGSR | 20-bit ΔΣ, −0.3…+85 V common mode, ±163.84/±40.96 mV shunt, 2.94 MHz I²C, 16 addresses, VSSOP-10 | −40…+125 °C | 2.7–5.5 V | I²C | ACTIVE | MAJOR | T1 |
| CMP-SENSE-03 | Bosch Sensortec | BMI088 | IMU identity verified; **numeric data did not render** | UNK | UNK | UNK | UNKNOWN | MINOR | T1 identity only |

**Reading.** Battery/power monitoring and temperature/humidity are covered by verified active parts
(plus a shunt and a housing/vent design that are not selected). **Not covered by any verified part:**
bilge water-level sensing, water-ingress detection, wind sensing and tank sensing. These are core SENSE
capabilities; the BOM must mark them `COST_UNVERIFIED`/`COMPONENT_NOT_SELECTED`. Sensor accuracy
figures above are manufacturer declarations — no MAREA accuracy, calibration or alert-delivery claim is
permitted.

---

## 13. DISP — sunlight-readable display, touch, optical bonding

| ID | Manufacturer | MPN | Verified parameters | Temp | Supply | Interfaces | Lifecycle | Crit. | 2nd source | Tier |
|---|---|---|---|---|---|---|---|---|---|---|
| CMP-DISP-01 | Riverdi | RVT70HSSNWN00 | 7.0″ TFT 1024×600, 800–1000 cd/m², IPS, STM32H757XIH6 (2 MB/1 MB), 6.0–48.0 V input with reverse-polarity protection, RS232/RS485, 2×CAN FD, 64 Mb SDRAM + 512 Mb QSPI, microSD, TouchGFX support, customisation (cover glass, brightness, bonding) | UNK | 6.0–48.0 V | LCD/RS232/RS485/CAN FD/USB | ACTIVE | CRITICAL | UNKNOWN | T1 |

**Reading.** This is the strongest single display candidate found: integrated graphics MCU, wide DC
input, two CAN FD channels and documented customisation (including optical bonding and gasket work).
But **operating temperature, touch controller, bonding type and price were not rendered**, and there is
**no verified second source**. Sunlight readability is a manufacturer claim with no MAREA test. A
second display vendor and a touch-controller decision are open.

---

## 14. MECH — enclosure, connectors, glands, vent, stainless

| ID | Manufacturer | MPN | Verified | Temp | Lifecycle | Crit. | Tier |
|---|---|---|---|---|---|---|---|
| CMP-MECH-01 | Fibox | CAB PC 3030 (range) | Manufacturer identity and enclosure credentials verified from corporate page; **product page inaccessible** — dimensions, IP/IK, material, temperature UNK | UNK | UNKNOWN | CRITICAL | T4 (product) / T1 (identity) |
| CMP-CAN-04 (also MECH) | Amphenol LTW | M12A-05PFFS-SF8001 | M12 connector candidate — UNVERIFIED | UNK | UNKNOWN | MAJOR | T4 |

**Not covered by any verified part:** cable glands, pressure-equalisation vent, stainless fasteners,
breathable membranes, gaskets, mounting hardware, NMEA 2000 cable/terminators. IP rating cannot be
claimed for any MAREA unit: an IP-rated enclosure does not make an assembly IP-rated, and no ingress
test exists (`PHYSICAL_TESTS = NOT_EXECUTED`).

---

## 15. RF — antennas

| ID | Manufacturer | MPN | Verified | Lifecycle | Crit. | Tier |
|---|---|---|---|---|---|---|
| CMP-RF-01 | Taoglas | GSA.8841.A.001 | Antenna candidate — **UNVERIFIED** (manufacturer page inaccessible) | UNKNOWN | MAJOR | T4 |

**Reading.** RF is the least-evidenced block. Antenna gain, bands, VSWR, mounting, cable and IP are all
UNKNOWN; the choice drives cellular/GNSS/Wi-Fi field performance and RED testing. No range,
performance or certification claim is possible. A future session must retrieve antenna datasheets and
plan a real OTA/field test.

---

## 16. Services (PCB, PCBA, TEST, PKG, LOG)

Covered by supplier evidence and public service prices, not by component MPNs. Summary of what is
evidenced:

| Service block | Public evidence | Price evidence | Notes |
|---|---|---|---|
| PCB fab | JLCPCB homepage (T1), PCBWay homepage (T1), AISLER homepage (T1) | Advertised from-prices only (USD/EUR) | No EU fabrication quote; no capability audit; no IPC class statement |
| PCBA / EMS | JLCPCB, PCBWay, AISLER (T1 homepages) | Advertised from-prices | No component cost, no test, no tooling, no NRE |
| TEST (fixtures, EMC labs) | Applus+ identity page (T1, ES); other labs not retrieved | **No public price** | No accreditation scope, no notified-body status, no EMC/RED test plan cost |
| PKG | none retrieved | UNKNOWN | Packaging design and cost wholly open |
| LOG | none retrieved | UNKNOWN | Incoterms, freight, customs, EU representative all open |

---

## 17. Lifecycle, contradiction and supply risks found in this session

| Risk | Record | Severity | Required action |
|---|---|---|---|
| GNSS MAX-M10 family **EOL** ("not longer available") | CMP-GNSS-01/02/03, EVD-MC11-116 | **BLOCKING for BOM freeze** | Select and verify a currently-available GNSS receiver; do not assume M10 availability |
| Secure element ATECC608B **NRND** | CMP-SEC-01, EVD-MC11-112 | HIGH | Select an active root-of-trust/TPM; re-assess secure boot and provisioning |
| EEPROM AT24CS32 **NRND** | CMP-MEM-01, EVD-MC11-114 | MEDIUM | Find an active serialised EEPROM/NVM alternative |
| nRF52840 line **withdrawn at RS**, manufacturer lifecycle unverified | CMP-BLE-01, EVD-MC11-110 | MEDIUM | Obtain manufacturer lifecycle + a second authorised distributor |
| TCAN1042 **automotive rating contradiction** (TI vs RS) | CMP-CAN-01, EVD-MC11-102 vs 109 | MEDIUM | Resolve with datasheet/PCN before any grade claim; no automotive claim today |
| TI page: "a newer version of this product is available" (TCAN1042HGV) | EVD-MC11-101 | LOW | Check replacement/revision before freeze |
| ISO7721 **out of stock at TI** on observation date | CMP-N183-02, EVD-MC11-105 | LOW | Availability is point-in-time; qualify a second isolator |
| Display **single verified source, no second source** | CMP-DISP-01 | HIGH | Qualify a second display/panel vendor; decide touch and bonding |
| CM4 and CM4-class SBC **entirely unverified** | CMP-PROC-01 | HIGH | Do not specify CM4 in a BOM; use verified SoM route or re-research |
| Antenna, enclosure, protection passives, bilge/water/wind sensing **not evidenced** | CMP-RF-01, CMP-MECH-01, PWR protection, SENSE gaps | HIGH | Keep UNKNOWN/COST_UNVERIFIED; no claim |

### 17.1 CRITICAL parts (for the Lead's risk register)

`SINGLE_SOURCE` count among CRITICAL components is **zero**. The CRITICAL list, for lifecycle risks:

| Component | MPN | secondSourceStatus | Lifecycle |
|---|---|---|---|
| CMP-PROC-01 | CM4102008 | AVAILABLE | UNKNOWN (unverified) |
| CMP-PROC-02 | Toradex 0063 | AVAILABLE | ACTIVE |
| CMP-PROC-03 | VAR-SOM-MX8MP | AVAILABLE | ACTIVE |
| CMP-CAN-01 | TCAN1042HGVDR | AVAILABLE | ACTIVE |
| CMP-CELL-01 | EG915U-EU | AVAILABLE | ACTIVE |
| CMP-GNSS-01 | MAX-M10S-00B | AVAILABLE (function-level) | **EOL** |
| CMP-SEC-01 | ATECC608B | AVAILABLE (function-level) | **NRND** |
| CMP-PWR-01 | LMR33630ADDA | AVAILABLE | ACTIVE |
| CMP-DISP-01 | RVT70HSSNWN00 | UNKNOWN | ACTIVE |
| CMP-MECH-01 | Fibox CAB PC 3030 | UNKNOWN | UNKNOWN |

Note for the Lead: although `secondSourceStatus` is not `SINGLE_SOURCE` for GNSS/SEC (alternatives
exist at function level), **no alternative part was verified in this session**. If the BOM engineer
freezes ZED-F9P or an ATECC608B replacement without a second verified source, that line should then be
re-classified `SINGLE_SOURCE` and receive a RISK-SOURCING record.

---

## 18. What the BOM/cost engineer must NOT assume

1. **No datasheet was read.** Any parameter not in this document is unverified; do not fill gaps from
   memory or from an older OPEN-MARINE prototype.
2. **No price is a quotation.** Manufacturer web prices are USD catalogue prices with VAT unstated;
   RS prices are single-unit, VAT-excluded, pack-quantity retail. See D13.
3. **No MOQ, lead time, tooling, NRE, warranty or payment terms are known** except the advertised
   minimum quantities of three PCB services. Everything else is UNKNOWN.
4. **CM4 is not a specified part.** The Toradex/Variscite SoMs are the verified compute candidates.
5. **GNSS as inherited is EOL.** Do not put MAX-M10 into a BOM; ZED-F9P is verified but expensive and
   its RTK precision is not a validated requirement.
6. **ATECC608B and AT24CS32 are NRND.** Do not build a 5–10-year marine security/identity story on them.
7. **The enclosure is not selected**, no IP/IK rating is established and no ingress test exists.
8. **Antennas, cable glands, vent, TVS/fuse/PTC, bilge/water/wind sensors are not selected.** Their
   cost is `UNKNOWN`, which makes every BOM total containing them `INCOMPLETE`.
9. **No conformity or certification follows from any component choice.** Modules with their own
   approvals do not make the assembled MAREA product CE/RED/NMEA compliant.
10. **The supplier register is not a qualified vendor list.** No authorisation status was verified; no
    supplier was contacted; no supplier quality audit exists.
