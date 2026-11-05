# MC-11 — Protocol and compatibility assessment (D6)

| Field | Value |
|---|---|
| Document | D6 `MC11-PROTOCOL-AND-COMPATIBILITY-ASSESSMENT.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 6) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `hw-architect` |
| Machine records | `data/nmea-status.json`, `data/compatibility-requirements.json` |

**Evidence states.** No supplier contacted, no purchase, no sample, no bench or vessel test, no
certification, no customer evidence. `NMEA2000_CERTIFIED = false`, `TESTED_COMPATIBILITY_ROWS = 0`,
`CE_MARKING_CLAIM = PROHIBITED`. **Zero compatibility rows in MC-11 are `TESTED` or `SUPPORTED`**; the D2
compatibility vocabulary is `DOCUMENTED_INTERFACE`, `PROPOSED`, `ASSUMED`, `TEST_REQUIRED`, `BLOCKED`.

**What is verified about standards in this session.** NMEA official pages for NMEA 2000 and NMEA 0183
(`EVD-MC11-001…004`), RED 2014/53/EU (`EVD-MC11-015/016`), and manufacturer pages for the parts named in
D4. The NMEA standards themselves are **copyrighted documents that MAREA has not licensed**, so no
sentence table, PGN table, connector drawing or electrical-limit table is reproduced or asserted from
the standards. Where a figure comes from general industry knowledge rather than a retrieved source it is
marked `ENGINEERING_REFERENCE (not retrieved)`.

---

## 1. Purpose and method

This document answers research question 7: how NMEA 2000/0183, Ethernet, Wi-Fi, BLE, cellular and the
optional satellite path should be assessed. It does **not** assert that anything works. It records, per
transport: what it is for; its physical layer; MAREA's device role; the data model; the bandwidth and
latency character; the electrical constraints; access and licensing; certification/membership;
commercial risk; third-party interoperability; fault isolation; cybersecurity exposure; and maintenance
burden. Then it separates the six NMEA questions that are routinely confused (§2) and gives the
compatibility matrix in the frozen vocabulary (§3).

**Governing rule:** compatibility is a claim about **a specific device, a firmware/software version, a
message or data type and a direction**, backed by a recorded test — never about a protocol name or a
brand. If a device is not in the published matrix, the answer is "not assessed", not "probably works".

---

## 2. NMEA governance — six separate questions, none satisfied

This section is deliberately redundant with `data/nmea-status.json` because it is the most common source
of false product claims in the programme.

| Question | NMEA 2000 | NMEA 0183 | Source |
|---|---|---|---|
| **1. Technical implementation** | `NOT_IMPLEMENTED`. No stack, no CAN interface, no address claiming, no PGN codec, no hardware. The legacy stack holds only a TypeScript interface union and a no-op stub (`HW-09`). | `SENTENCE_PARSING_ONLY`. An MWV/MWD wind parser (unit-tested) and a GNSS sentence parser (code only) exist; there is no RS-422/opto-isolated electrical layer (`HW-10`). | `HARDWARE-COMPLIANCE-MATRIX.md §2`, §4.1–§4.6 |
| **2. Membership / licensing** | `NOT_A_MEMBER`. No NMEA licence agreement for NMEA 2000. NMEA states the standard is licensed and not sold through an online store. | `NOT_LICENSED`. NMEA 0183 is a copyrighted document sold only by NMEA; published price tiers are USD 1,150 (manufacturer member), USD 7,500 (government/industrial/testing) and USD 10,000 (consumer electronics), and NMEA 0183-HS is an appendix (`EVD-MC11-003`). | NMEA pages retrieved 2026-11-02 |
| **3. Manufacturer identification** | `NOT_ASSIGNED`. Each manufacturer must buy an NMEA 2000 manufacturer code (assignment takes up to 60 days) and a product code per certified product (`EVD-MC11-002`). No application was filed. | `NOT_ASSIGNED`. An NMEA 0183 manufacturer mnemonic code costs USD 200, requires purchase of the standard and is issued to companies only (`EVD-MC11-004`). | NMEA pages |
| **4. Product certification** | `NOT_CERTIFIED`. NMEA states that all products that read and/or transmit NMEA 2000 information must be certified, that certification follows validation of a mandatory encrypted certification file, and that the certification tool is part of the process (`EVD-MC11-001`). | No product-certification scheme equivalent to NMEA 2000 exists; conformance to the standard is a document-licence and engineering question, and MAREA claims none. | NMEA pages |
| **5. Approved terminology** | Prohibited: "NMEA 2000 certified", "NMEA 2000 compatible", "NMEA 2000 ready", "NMEA 2000 approved". Permitted: a factual statement that MAREA does not implement NMEA 2000. | Prohibited: "NMEA 0183 compliant", "NMEA 0183 certified", "conforms to NMEA 0183". Permitted: "parses documented NMEA 0183 sentence types; parsing is not conformance". | D2 claims policy |
| **6. Logo use** | `NOT_PERMITTED`. The mark is a registered trademark of NMEA; logo and "NMEA 2000 Certified" use follows certification (`EVD-MC11-001`). | `NOT_PERMITTED`. No NMEA mark or standard extract may be reproduced. | NMEA pages; `HARDWARE-COMPLIANCE-MATRIX.md §2.7` |

**Consequence:** any MAREA document, page, quotation or support answer that implies NMEA 2000 capability
is false today and must be removed. Any future NMEA 2000 interface would be a **certification programme**
(licence → manufacturer code → implementation → certification tool → NMEA validation → logo), not a
firmware feature.

---

## 3. Transport-by-transport assessment

### 3.1 NMEA 0183

| Aspect | Assessment |
|---|---|
| Purpose | Legacy marine serial data exchange: position, speed, depth, wind, heading, AIS sentences between instruments and consumers. |
| Physical layer | Serial bus at 4800 baud, one talker and multiple listeners (NMEA official page, `EVD-MC11-003`); differential RS-422-style signalling in practice; 38.4 kbaud for 0183-HS. |
| MAREA device role | Receive-only listener on HUB, NAV (via adapter), AIS output, SENSE-WIND adapter. **No talker role is implemented.** |
| Data model | Printable ASCII sentences with talker/sentence identifiers and comma-separated fields; no standard session, no authentication, no quality metadata beyond sentence status fields. |
| Bandwidth / latency | Very low bandwidth; sentence-rate latency (typically sub-second for navigation data). `ENGINEERING_REFERENCE (not retrieved)`: exact update rates are vendor-specific. |
| Electrical constraints | Differential pair, ground reference, isolation needed to avoid ground loops; miswiring to 12 V must be survived. Exact electrical limits are in the licensed standard, not held. |
| Access / licensing | Copyrighted standard licensed by NMEA (prices `EVD-MC11-003`); mnemonic code USD 200 (`EVD-MC11-004`). Parsing public sentence descriptions is not the same as being licensed for the standard text, and MAREA states it is not conformant. |
| Certification / membership | No product certification; membership optional but required for member pricing. |
| Commercial risks | Vendor-specific sentences; firmware-dependent behaviour; no interoperability guarantee; a compatibility matrix is the only honest answer. |
| Third-party interoperability | Per device, per firmware, per sentence, per direction. `TEST_REQUIRED` for every row. |
| Fault isolation | Serial point-to-point; a faulty talker affects only its listener path, provided the interface is isolated. |
| Cybersecurity exposure | Low network exposure (no IP), but a physical port can be a trust boundary; no authentication exists in the protocol. |
| Maintenance | Stable protocol; the maintenance burden is the compatibility matrix and per-device regression testing. |

### 3.2 NMEA 2000

| Aspect | Assessment |
|---|---|
| Purpose | Multi-master CAN-based marine instrument network intended to let certified equipment share data, commands and status (`EVD-MC11-001`). |
| Physical layer | CAN bus (ISO 11898-class) with a proprietary connector and power distribution; commonly documented at 250 kbit/s — `ENGINEERING_REFERENCE (not retrieved)` because the standard is not held. |
| MAREA device role | **None. Not implemented and prohibited from being claimed.** A future role would be receive-only until a write path is separately approved. |
| Data model | PGN-based parameter groups with defined field layouts in the licensed standard; manufacturer and product codes identify devices. |
| Bandwidth / latency | Moderate for instrument data; not suitable for video or bulk transfer. Exact capacity not asserted. |
| Electrical constraints | Isolated transceiver, common-mode range, termination, ground offset, short-to-battery survival; not designed. |
| Access / licensing | NMEA 2000 license agreement; manufacturer code; product code; certification tool; logo restrictions (`EVD-MC11-001/002`). |
| Certification / membership | **Mandatory per NMEA for any product that reads and/or transmits NMEA 2000 information.** Not obtained. |
| Commercial risks | Cannot be sold as a feature package without a certification programme; reverse-engineered PGN libraries are not a lawful substitute and create support risk. |
| Third-party interoperability | Unknown and unclaimable; a third-party certified gateway (e.g. iKonvert, `EVD-MC11-009`) can provide transport, but its certification does not certify MAREA. |
| Fault isolation | A single bus fault can take down all devices; isolation and segmentation matter. |
| Cybersecurity exposure | No authentication or encryption in the protocol; physical access to the bus is effectively control-plane access. That is a strong argument for the HUB being read-only. |
| Maintenance | Certification renewals, standard revisions, PGN additions; a serious long-term commitment. |

### 3.3 Generic CAN (beyond NMEA 2000)

| Aspect | Assessment |
|---|---|
| Purpose | Deterministic multi-drop control/telemetry bus; candidate for internal MAREA module interconnect (not for claiming NMEA 2000). |
| Physical layer | Differential CAN with transceiver; bit rate to be chosen (125/250/500 kbit/s); termination and stub-length rules. |
| MAREA device role | Possible internal bus between a HUB and MAREA modules. **Not designed.** |
| Data model | Custom frames; MAREA would own the contract; no standard interoperability. |
| Bandwidth / latency | Deterministic, low latency, low bandwidth; suitable for sensor/status traffic. |
| Electrical constraints | Isolated transceiver recommended; bus fault containment; termination. |
| Access / licensing | No licence required for generic CAN (ISO 11898 is a standard document); no NMEA claim permitted. |
| Certification / membership | None from a CAN perspective; EMC and product conformity still apply. |
| Commercial risks | A proprietary internal bus fragments the ecosystem and forces every module to carry a transceiver. A stronger argument for the shared multi-input module (D8). |
| Third-party interoperability | None intended externally. |
| Fault isolation | A shorted bus fails all nodes unless segmented. |
| Cybersecurity exposure | Physical-only, no authentication. |
| Maintenance | Low protocol churn; high firmware ownership. |

### 3.4 Ethernet

| Aspect | Assessment |
|---|---|
| Purpose | Local vessel LAN for HUB data distribution, DISPLAY, NAV clients, installer laptop and diagnostics. |
| Physical layer | 10/100/1000BASE-T with magnetics and RJ45 (or M12 for a harsher environment); PoE explicitly not assumed. |
| MAREA device role | HUB serves; DISPLAY/NAV/installer clients consume; optional second port for segmentation. |
| Data model | IP: HTTPS/WSS for the documented local data contract, mDNS/DHCP for discovery, no internet exposure required. |
| Bandwidth / latency | Ample for instrument data and dashboards; unsuitable (and unnecessary) for camera/video in scope. |
| Electrical constraints | Transformer isolation, shield/ground strategy, surge protection on long outdoor runs, cable category and length. |
| Access / licensing | None (open standards) but the application-layer contract is MAREA's own. |
| Certification / membership | None beyond EMC/EMC-RED; no protocol certification claimed. |
| Commercial risks | Vessel networks are undocumented and may be hostile; a HUB that assumes a clean LAN will disappoint. |
| Third-party interoperability | Per device and per firmware; only matrix rows published after test. |
| Fault isolation | VLAN/segmentation is the only real containment; a flat unauthenticated LAN is a systemic risk. |
| Cybersecurity exposure | **High**: unauthenticated local services, default credentials, unpatched routers, guest devices. CRA obligations attach; authentication and update duty are mandatory design work. |
| Maintenance | Long-lived; requires a security-update process and network documentation. |

### 3.5 Wi-Fi

| Aspect | Assessment |
|---|---|
| Purpose | Local client access (phone/tablet), onboarding, and convenience networking where cabling is impractical. |
| Physical layer | 2.4/5 GHz 802.11; radio module inside a host product or an external access point. |
| MAREA device role | Access point or client, depending on design; **not decided** and edition-boundary dependent (`EDITION_INTERFACE_UNSPECIFIED` for HUB). |
| Data model | IP transport; same local contract as Ethernet. |
| Bandwidth / latency | High bandwidth, variable latency; unsuitable for hard real-time control, adequate for data/dashboard. |
| Electrical constraints | Antenna placement, coexistence with other radios, enclosure attenuation, transmit power limits and RED requirements. |
| Access / licensing | Open standards; **RED applies because it is a radio**; no certification held. |
| Certification / membership | RED essential requirements; Wi-Fi Alliance certification is a commercial decision, not obtained. |
| Commercial risks | A radio in the product changes the conformity route and the power budget; a radio that is assumed but not designed is a common schedule trap. |
| Third-party interoperability | Infrastructure interoperability is generally good but not a product guarantee; client compatibility must be tested. |
| Fault isolation | Radio failure should leave wired functions intact; needs separate power/rail design. |
| Cybersecurity exposure | **High** (open or weak networks, WPS, default SSIDs); must support strong authentication and be documented. |
| Maintenance | Radio firmware and regulatory updates; module lifecycle. |

### 3.6 Bluetooth / BLE

| Aspect | Assessment |
|---|---|
| Purpose | Short-range provisioning and setup; possibly local sensor pairing. |
| Physical layer | 2.4 GHz ISM; BLE in modern designs. |
| MAREA device role | Provisioning/setup peripheral (candidate), not a data-distribution path. |
| Data model | GATT services or a custom profile; **not designed**. |
| Bandwidth / latency | Low bandwidth; connection latency; unsuitable for bulk data. |
| Electrical constraints | Antenna coexistence with Wi-Fi; RED. |
| Access / licensing | Open standard; RED applies. |
| Certification / membership | RED; Bluetooth SIG membership/declaration is a commercial decision not taken. |
| Commercial risks | Provisioning-only BLE is cheap; a BLE data path invites security and support problems. |
| Third-party interoperability | Phone OS versions vary; per-device test needed. |
| Fault isolation | No impact on wired functions if designed as an independent peripheral. |
| Cybersecurity exposure | Pairing/bonding weaknesses; an open BLE service is a serious flaw. |
| Maintenance | App and OS churn. |

### 3.7 GNSS

| Aspect | Assessment |
|---|---|
| Purpose | Position, time, course and speed for HUB, NAV, AIS-derived values and WATCH. |
| Physical layer | Received GNSS signals (L1 and multi-constellation); module with antenna input; serial/UART/I2C to host. |
| MAREA device role | Consumer of GNSS; MAREA does not transmit and does not certify a receiver. Candidate family verified: u-blox MAX-M10 series (`EVD-MC11-013`), which states <25 mW, concurrent GNSS, UART/I2C and −40 to +85 °C; the listed MAX-M10S-00B variant is marked **not longer available**, so a current order code must be re-selected. |
| Data model | NMEA 0183 sentences and/or UBX binary depending on module; fix quality, HDOP, age. |
| Bandwidth / latency | Low; typically 1 Hz or higher, vendor-specific. |
| Electrical constraints | Antenna placement, cable loss, supply noise, backup battery for hot start. |
| Access / licensing | GNSS itself is free-to-receive; module datasheets and any proprietary protocol terms apply. |
| Certification / membership | Receiver module conformity (RED/EMC) is the module supplier's; the assembled product still needs its own conformity. |
| Commercial risks | Anti-spoofing/jamming claims must not be made; no accuracy guarantee; indoor/covered berth reception is poor. |
| Third-party interoperability | Sentence-level compatibility requires per-module test. |
| Fault isolation | Loss of fix must be explicit; never interpolate a position silently. |
| Cybersecurity exposure | GNSS spoofing/jamming is a real threat; the product must not rely on GNSS for trusted time in security decisions without an alternative. |
| Maintenance | Module lifecycle (the verified family shows availability churn). |

### 3.8 AIS receive data

| Aspect | Assessment |
|---|---|
| Purpose | Receive-only vessel traffic awareness. |
| Physical layer | AIS VHF channels 161.975/162.025 MHz (receive only); VHF antenna; decoder; output as NMEA 0183 `!AIVDM` or a mapped path. |
| MAREA device role | Receive-only receiver or software consumer of a third-party receiver. **No transmitter, transponder or DSC.** |
| Data model | AIS messages (class A/B position, static and voyage data); multi-part sentences; per-target age and source. |
| Bandwidth / latency | Low data volume; latency dominated by target update intervals and channel load. |
| Electrical constraints | 50-ohm RF path, splitter insertion loss, antenna height, lightning/surge. |
| Access / licensing | Reception is free; **retention and redistribution of AIS-derived data are not granted** (`D-09`). GPL-3.0 decoder distribution decision pending (S-01). |
| Certification / membership | Receiver is radio equipment under RED (`EVD-MC11-015`); MED scope question unresolved. |
| Commercial risks | Not every vessel transmits AIS; no completeness claim; no collision-avoidance claim; no range guarantee. |
| Third-party interoperability | `!AIVDM` output is widely supported but each consumer must be tested. |
| Fault isolation | Antenna fault must be visible; a failed receiver must not look like "no traffic". |
| Cybersecurity exposure | Low (receive only), but output to a network should be bounded. |
| Maintenance | Decoder licensing and updates; antenna and cable maintenance. |

### 3.9 Cellular

| Aspect | Assessment |
|---|---|
| Purpose | WATCH outbound telemetry and alert delivery; optional FLEET device connectivity. |
| Physical layer | LTE Cat-M1/NB-IoT or Cat-1/Cat-4 (not selected); internal modem, SIM/eSIM, antenna. |
| MAREA device role | Outbound-only client to the WATCH/FLEET service. No inbound connection. |
| Data model | Bounded telemetry subset over TLS/MQTT or HTTPS; device identity and health. |
| Bandwidth / latency | Low bandwidth; latency and availability depend on coverage, roaming and operator policy. |
| Electrical constraints | Modem peak current, antenna design, coexistence with Wi-Fi/GNSS, power budget (see D5 §7). |
| Access / licensing | Mobile operator contract, data plan, roaming terms; **none exists**. |
| Certification / membership | RED for the radio; operator/PTCRB-class acceptance; eSIM provisioning agreements. |
| Commercial risks | Coverage in marinas and moorings is not guaranteed; data cost and roaming are external; vendor lock-in; eSIM lifecycle. |
| Third-party interoperability | Modem firmware and operator certification are per-device and per-network. |
| Fault isolation | Loss of coverage must buffer locally and show the gap; it must not silently drop. |
| Cybersecurity exposure | **High**: internet-connected device, credential storage, OTA update, SIM abuse. Secure element or secure key storage required. |
| Maintenance | Modem firmware, operator certification churn, eSIM management, ongoing data cost. |

### 3.10 Optional satellite

| Aspect | Assessment |
|---|---|
| Purpose | Contingent coverage where cellular is absent; **not in any MC-11 product definition**. |
| Physical layer | L-band or NB-IoT-over-satellite depending on provider; not selected and not researched beyond this note. |
| MAREA device role | Not designed. |
| Data model | Not designed. |
| Bandwidth / latency | Assumed low bandwidth, high latency, high cost — `ENGINEERING_ASSUMPTION`. |
| Electrical constraints | Antenna size, power, certification — unknown. |
| Access / licensing | Provider contract and hardware certification; none exists. |
| Certification / membership | RED plus provider certification; none. |
| Commercial risks | High recurring cost; a satellite claim would be a major commercial commitment. |
| Third-party interoperability | Not assessed. |
| Fault isolation | Not assessed. |
| Cybersecurity exposure | Not assessed. |
| Maintenance | Not assessed. |
| **Status** | `BLOCKED` — out of scope, not researched further, and no claim may be made. |

---

## 4. Compatibility matrix (frozen vocabulary, zero TESTED/SUPPORTED)

The full requirement rows are in `data/compatibility-requirements.json` (29 rows). Status meanings:
`DOCUMENTED_INTERFACE` = the interface shape is documented but not tested; `PROPOSED` = an intended
design with no test; `ASSUMED` = a third-party behaviour is assumed; `TEST_REQUIRED` = testable but not
tested; `BLOCKED` = cannot be offered or claimed until an external condition closes.

| Family | Protocol / link | Direction | Status | Principal block |
|---|---|---|---|---|
| HUB | NMEA 0183 listener (MWV/MWD/RMC/GGA/VTG/DPT) | receive | `TEST_REQUIRED` | no isolated electrical layer; parser scope only |
| HUB | GNSS serial intake | receive | `PROPOSED` | receiver identity and fix-quality propagation |
| HUB | NMEA 2000 CAN | receive | `BLOCKED` | licence, manufacturer code, certification, hardware |
| HUB | Signal K over LAN | bidirectional (read-mostly) | `PROPOSED` | no authentication, no product test |
| HUB | HTTPS/WSS local clients | receive by clients | `TEST_REQUIRED` | no authentication/TLS/identity |
| NAV | HUB local data | receive | `PROPOSED` | no integration test |
| NAV | AIS `!AIVDM` | receive | `BLOCKED` | no tested AIS path; data rights |
| NAV | Licensed charts/weather | receive | `BLOCKED` | no data rights |
| NAV | Third-party NMEA 0183 via adapter | receive | `TEST_REQUIRED` | no adapter list or test |
| AIS | VHF antenna / splitter | receive (RF) | `BLOCKED` | no receiver hardware, no RF/RED |
| AIS | `!AIVDM` local output | transmit (data) | `TEST_REQUIRED` | transport not frozen; GPL decision |
| AIS | Own-position intake for CPA/TCPA | receive | `TEST_REQUIRED` | computation path not validated |
| SENSE | NMEA 0183 wind (MWV/MWD) | receive | `TEST_REQUIRED` | parser test only, no real sensor |
| SENSE | Power measurement (shunt/hall) | receive | `PROPOSED` | no sensing element, no accuracy |
| SENSE | Bilge float switch | receive | `PROPOSED` | no switch qualification |
| SENSE | Tank sender | receive | `TEST_REQUIRED` | no sender list, calibration unsolved |
| SENSE | HUB publication | transmit | `PROPOSED` | HUB contract not frozen |
| SENSE | NMEA 2000 | transmit | `BLOCKED` | not implemented, not licensed |
| WATCH | Declared SENSE inputs | receive | `PROPOSED` | device not built |
| WATCH | Cellular uplink | transmit | `BLOCKED` | no modem, no plan, no coverage data |
| WATCH | Notification provider | transmit | `TEST_REQUIRED` | no provider account |
| WATCH | HUB data | none | `BLOCKED` | not an intended interface |
| DISPLAY | HUB local data | receive | `TEST_REQUIRED` | no runtime, no panel |
| DISPLAY | Weather entitlement view | receive | `BLOCKED` | display rights not granted |
| PILOT | Heading/feedback inputs | receive | `BLOCKED` | safety gate |
| PILOT | NAV route context | receive | `BLOCKED` | safety gate |
| FLEET | WATCH read-only telemetry | receive | `PROPOSED` | no consent, no integration |
| FLEET | HUB read-only health | receive | `PROPOSED` | no export service |
| WEATHER | Provider APIs | receive | `BLOCKED` | provider rights not granted |

**Count check:** rows = 29; `TESTED` = 0; `SUPPORTED` = 0; `deviceTestRecorded = false` in every row.
A published product compatibility matrix cannot exist before the first recorded device test.

---

## 5. Cross-cutting conclusions

1. **NMEA is a licensing and certification programme, not a protocol choice.** The cheapest lawful path
   to NMEA 2000 is a licence + manufacturer code + certification programme; the cheapest unlawful-looking
   path (reverse-engineered PGN libraries) creates support, legal and certification risk and is not a
   basis for a product.
2. **NMEA 0183 is the only legacy interface that can be implemented without a standard purchase**, but
   even that requires the electrical layer to be designed and isolated, and no conformance claim is
   permitted.
3. **Ethernet/Wi-Fi/BLE are the real product backbone** and carry the cybersecurity burden (CRA). The
   local contract and authentication model are more important than which radio is fitted.
4. **Cellular is the highest-risk transport** because it combines radio conformity, operator acceptance,
   coverage uncertainty, recurring cost and internet exposure.
5. **AIS reception is the only radio path that can be delivered without a transmitter**, and even it
   requires RED conformity and a data-rights position for retention/redistribution.
6. **Satellite is out of scope** and must not appear in any claim or roadmap promise.
7. **Fault isolation is a design requirement**: one network's fault must not propagate to another;
   read-only must be enforced in hardware/architecture where possible.
8. **Zero rows are tested.** Every compatibility statement is a requirement awaiting evidence.
