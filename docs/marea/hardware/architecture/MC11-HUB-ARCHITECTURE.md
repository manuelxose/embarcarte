# MC-11 — HUB architecture (D7)

| Field | Value |
|---|---|
| Document | D7 `MC11-HUB-ARCHITECTURE.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 7) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `hw-architect` |
| Machine records | `data/architecture-options.json` (`ARCH-HUB-A…E`), `data/hardware-families.json`, `data/compatibility-requirements.json` |

**Evidence states.** No HUB article exists; no schematic, BOM, enclosure, harness, carrier board, sample,
quotation, test report or certification exists. No supplier was contacted. `NMEA2000_CERTIFIED = false`,
`TESTED_COMPATIBILITY_ROWS = 0`, `ENVIRONMENTAL_RATING_CLAIM = PROHIBITED`. This document is an
architecture **proposal**; it freezes nothing and `G1_ARCHITECTURE_SELECTION = CANDIDATE_ONLY`.

**Two things are kept deliberately separate in this document:**

- **Engineering preference** — the architecture MAREA's hardware engineer would build if authorised
  (§4). It is a judgement, labelled as such.
- **Approved specification** — there is none. The only fixed facts are the canonical commercial
  definition and the edition boundary (§2), both owned outside MC-11.

---

## 1. What the HUB is, and what it must not become

The canonical definition (`MAREA-HUB-COMMERCIAL-SPEC.md` F01, F04, F09) is a local-first onboard data
gateway/connectivity appliance: it gathers supported vessel data, normalises it into one documented local
interface, serves it to NAV/DISPLAY/compatible instruments and the owner's devices, and keeps working
offline. It is **not** a navigation system, **not** an AIS transmitter, **not** certified navigation
equipment, and **never** the vessel's steering controller.

Four non-negotiable boundaries:

1. **No control path.** No actuator, autopilot, helm or steering output exists or is planned. A read-only
   status path is the maximum, and it must be enumerated.
2. **Local-first.** Loss of the commercial website or the internet must not interrupt ingest,
   normalisation, dashboard, diagnostics, configuration, history or recovery.
3. **Fail-visible, never fail-fabricated.** A stale or missing source is shown as stale/unknown with its
   age; nothing is interpolated into a plausible-looking value.
4. **No NMEA 2000 claim.** Not implemented, not licensed, not certified.

---

## 2. Edition boundary (binding; no third edition)

`HUB-STANDARD` and `HUB-PRO` are the only editions. MC-11 may propose candidate interfaces per edition
but may not move an interface into an edition the canonical contract excludes, and may not invent a
third edition.

| Interface / capability | `HUB-STANDARD` | `HUB-PRO` | Status |
|---|---|---|---|
| Isolated NMEA 0183 receive (base envelope) | Candidate required | Candidate required | `PROPOSED` |
| Signal K / documented local interface | Candidate required | Candidate required | `PROPOSED` |
| Ethernet + Wi-Fi local access | Candidate required | Candidate required | `PROPOSED`; radio presence is an edition-boundary question |
| Local dashboard, diagnostics, configuration, backup | Candidate required | Candidate required | `PROPOSED` |
| Extended validated connection families | Not included | Candidate required | **`EDITION_INTERFACE_UNSPECIFIED`** — canonical spec does not name which families |
| Integration capacity (number of concurrent sources) | Bounded envelope | Larger bounded envelope | **Exact figures `OPEN`** — not invented here |
| Deeper diagnostics / installer tooling / commissioning record | Basic pass/fail | Documented commissioning evidence + installer tooling | Canonical edition table |
| Local data retention window | Short | Extended | **Exact windows `OPEN`** |
| NMEA 2000 | Not included | Not included | `BLOCKED` for both; cannot be moved into any edition |
| Cellular modem | Not specified | Not specified | **`EDITION_INTERFACE_UNSPECIFIED`** — do not assume |
| Second Ethernet port / network segmentation | Not specified | Not specified | **`EDITION_INTERFACE_UNSPECIFIED`** |
| USB host ports | Candidate for adapters/service | Candidate for adapters/service | **Exact count `OPEN`** |

**Rule:** the two editions will ultimately be distinguished by a **validated interface envelope and
diagnostics depth**, not by a software switch that disables a capable unit. The exact port count, radio
set and processor are `OPEN` product-engineering requirements. Nothing in §3–§4 may be published as an
edition specification until the boundary is frozen.

---

## 3. Candidate architectures, scored and compared

The frozen criteria and arithmetic are in D4 §3; the machine records are `ARCH-HUB-A…E` in
`data/architecture-options.json`. The comparison table repeats only what is needed here.

| Candidate | Class | Processor | MCU supervision | Isolation approach | Score /100 |
|---|---|---|---|---|---:|
| A. Development-board appliance | A | Raspberry Pi 5-class SBC (`EVD-MC11-005/006`) | Optional external MCU only | HAT-based isolated 0183 | 3.12 |
| B. Industrial SOM on MAREA carrier | B | Toradex Verdin iMX8M Plus (`EVD-MC11-010/011`) | On-SOM Cortex-M7F available | Carrier-based isolated 0183/ETH/USB | 3.85 |
| C. Custom MCU gateway | C | STM32H743-class MCU (`EVD-MC11-012`) | The MCU is the only processor | Board-level isolated 0183 | 3.62 |
| D. Hybrid MCU + application processor | D | Class B or A application processor + class C MCU | Dedicated supervisory MCU | Board-level isolated 0183/ETH/USB | 3.85 |
| E. Software/service-first | E | Third-party certified gateway | n/a | Inherited from third party | **4.53** |

**Why E scores highest and is still not the engineering preference.** The frozen weights reward
feasibility, availability, cost certainty, maintainability and field service — all of which a
no-hardware posture maximises. They do not measure appliance ownership, hardware margin, brand control or
the commercial definition of HUB. E is the cheapest route to an integration product and should be
evaluated as a **go-to-market decision for the Lead**, not silently dropped. Conversely, choosing D is a
decision to build an appliance and must be funded and approved as such.

**Why B and D tie at 3.85.** B is simpler (one processor, vendor BSP) but the on-SOM M7 is not
independent of the application processor's power state in the way a separate supervisory MCU can be. D
adds a component and inter-processor failure modes but gives genuine separation between acquisition and
services. The preference for D is a requirement judgement (§4), not a score outcome.

---

## 4. Engineering preference — candidate HUB architecture (not approved)

**`ARCH-HUB-D` (hybrid) is the engineering preference**, subject to the commercial decision in §3 and to
the open questions in §11. The block structure below is a proposal; every "candidate" item is unselected
and unpriced.

### 4.1 Processor / SOM (candidate)

- **Application processor:** class-B industrial SOM (Toradex Verdin iMX8M Plus class is the verified
  reference) or class-A SBC if the programme accepts consumer lifecycle. Verified class-B characteristics
  that matter here: up to 4× Cortex-A53 1.6 GHz, 800 MHz Cortex-M7F, up to 8 GB LPDDR4, up to 32 GB
  eMMC, 2× Gigabit Ethernet, 2× CAN FD, 4× UART, 5× I2C, 3× SPI, Wi-Fi 5 + BT 5.3 on wireless
  variants, −40 to +85 °C, 2036+ commitment (`EVD-MC11-010/011`).
- **What is NOT decided:** Linux distribution and BSP, secure-boot chain, containerisation, storage
  partitioning, update mechanism. The class-B vendor offers Torizon/Yocto and security layers; using them
  would make the CRA update story much easier, but no selection or licence review was performed.

### 4.2 MCU supervision (candidate)

- A dedicated MCU owns: watchdogs for itself and the application processor; brownout/supervisor logic;
  reset sequencing; RTC backup management; storage of last-known-good configuration; the safe-state
  policy on power loss; and a heartbeat with the application processor.
- Candidate MCU family: STM32H743-class (`EVD-MC11-012`: independent and window watchdog, RTC, 1.62–3.6 V
  I/O, 2.95 µA standby) or RP2350-class (`EVD-MC11-007`: signed boot, OTP, SHA-256, TRNG). Selection
  requires datasheet limits that were **not retrieved** for RP2350.
- The MCU must **not** be optional. A Linux-only HUB relies on a software watchdog in the same kernel it
  is watching; that is not adequate for a device whose job is to keep showing honest data.

### 4.3 NMEA 0183 (candidate)

- Isolated RS-422 listener, at least one input, 4800 baud (0183-HS 38.4 kbaud as a candidate option).
- Serial isolation barrier, series resistors, TVS and common-mode choke; connector keyed and labelled.
- **Read-only.** A HUB talker path is not required by the canonical product and is not proposed.
- Sentence parsing only: MWV/MWD/RMC/GGA/VTG/DPT as the candidate set; every sentence requires a recorded
  test before publication. **Parsing is not conformance to NMEA 0183** (`data/nmea-status.json`).

### 4.4 NMEA 2000 (candidate: none)

- **Not implemented, not licensed, not certified, not proposed for either edition.**
- Hardware-wise a class-B SOM already exposes two CAN FD controllers; that is a hardware capability, not
  a product capability. Using it would require the NMEA 2000 license agreement, a manufacturer code, a
  product code, the certification tool and NMEA validation (`EVD-MC11-001/002`) — a programme, not a
  firmware task.
- A third-party gateway could add NMEA 2000 transport at the installation. If one is ever supported, it
  must be **read-only**: the verified comparator `iKonvert` is explicitly bidirectional and can send
  routes/waypoints onto the network (`EVD-MC11-009`). A HUB that can write to a vessel network is a
  different product with a different risk position.

### 4.5 Ethernet and network segmentation (candidate)

- At least one 10/100/1000BASE-T port with magnetics, ESD and a documented shield/ground strategy.
- A second port (or a documented segmentation policy) is a **candidate requirement** for separating
  owner clients, installer access and instrument traffic; it is not an edition feature and is currently
  `EDITION_INTERFACE_UNSPECIFIED`.
- Local discovery via mDNS/DHCP with a documented fallback address; no dependency on the internet.

### 4.6 Wi-Fi / BLE (candidate; edition boundary open)

- Wi-Fi 2.4/5 GHz for local client access; BLE for provisioning only (candidate).
- A radio in the product changes the conformity route to RED. The radio's presence, band, power and
  antenna are **not decided**, and the edition boundary does not currently allocate them.
- Coexistence with GNSS and any cellular option must be designed; antenna separation and filtering are
  candidate requirements.

### 4.7 GNSS option (candidate)

- External GNSS antenna/receiver option for installations without a position source.
- Candidate module family: u-blox MAX-M10 series (`EVD-MC11-013`), but the verified page shows listed
  MAX-M10S order codes as **not longer available**; a current order code and lifecycle check are required
  before selection.
- GNSS time must not be the sole trusted time source for security decisions; RTC + monotonic counters
  are the fallback.

### 4.8 USB (candidate)

- USB host ports are useful for adapters, service access and storage, and are also an attack surface. A
  candidate requirement is: current-limited ports, ESD protection, a documented service-only mode and no
  automatic execution of anything from removable media.

### 4.9 Storage (candidate)

- eMMC (class-B SOM) preferred over microSD for an unattended appliance; microSD only if a documented
  wear/corruption strategy exists.
- Partitioning candidate: read-only system + writable configuration/history + separate update slot
  (A/B) with rollback. Wear levelling, power-loss journaling and storage health reporting are candidate
  requirements.

### 4.10 RTC and time (candidate)

- RTC with backup (coin cell or supercapacitor) and a documented time-source policy: GNSS when available,
  RTC otherwise; monotonic uptime; explicit "time uncertain" state after a long power loss.
- Timestamps are part of the data contract: every value carries source time and receive time.

### 4.11 Secure element / hardware root of trust (candidate)

- The verified candidate `ATECC608B` is **"Not Recommended for new designs"** (`EVD-MC11-014`). It must
  not be selected without a lifecycle review; alternatives were not evaluated in this session.
- Candidate functions: device identity and key storage, signed firmware verification support, secure
  provisioning, ownership binding. **None of this exists in any form today.**

### 4.12 Isolation and grounding (candidate)

See D5 §8. Every galvanically referenced external serial interface is isolated; the enclosure has one
documented bond point; Ethernet magnetics and antenna grounding have explicit policies. **No protection
component is selected and no isolation rating is asserted.**

### 4.13 Ports and connectors (candidate)

| Port | Candidate connector | Notes |
|---|---|---|
| DC input | Keyed, locking 2-pin or 3-pin (12/24 V, with earth if used) | Fuse external and documented; reverse polarity survived |
| NMEA 0183 | Pluggable terminal block or documented adapter | Isolated; labelled A/B/GND; strain relief |
| Ethernet | RJ45 with retention (M12 is an alternative for harsher locations) | Shield policy documented |
| USB | USB-A or USB-C with retention | Service/adapters; limited current |
| Antenna (optional GNSS/cellular) | SMA or FAKRA depending on radio | Sealed; surge/ESD protected |
| Status | LEDs (power, network, source health, fault) | Must not be the only diagnostic; no misleading "all OK" LED |
| Service | Internal header/pads or a documented service port | Not exposed to the owner by default |

Port counts, connector part numbers and panel layout are **not decided** and must not be published.

### 4.14 Power consumption (candidate)

No figure is measured or published. The candidate budget must be built bottom-up (processor idle/load,
radio duty cycle, Ethernet PHY, isolation, storage, DC/DC efficiency) and then **measured**; until then
the data record carries `null`. A HUB that runs 24/7 on a moored vessel must have a defensible quiescent
figure, because it is a permanent load on the same battery that SENSE/WATCH monitor.

### 4.15 Enclosure (candidate)

- Sealed enclosure sized for the carrier + connectors, with a defined service-opening strategy, mounting
  family, cable glands/strain relief, condensation management and material compatibility with salt, UV,
  fuel and cleaning agents.
- **No IP rating, temperature range, salt-fog class or vibration class may be claimed** until measured
  (`ENVIRONMENTAL_RATING_CLAIM = PROHIBITED`).

### 4.16 Update model (candidate)

- Signed images; A/B slots; rollback on failed boot; power-loss-safe update; version visible to the owner
  and in diagnostics; SBOM and vulnerability-handling process for CRA.
- Ownership of the update service window is a commercial decision (`OPEN`). **No update process exists.**

### 4.17 Diagnostics (candidate)

- Per-source status (last message time, rate, error counters, quality), boot/reset cause, storage health,
  supply-voltage history, temperature, network status, update history.
- Owner-exportable diagnostic bundle for support **without remote control**.
- **No "all systems OK" summary that hides a stale source.** The honest state is the product.

### 4.18 Boot recovery (candidate)

- Watchdog-driven reset; boot counter with automatic fallback to the previous known-good image after
  repeated failures; documented factory reset that preserves the diagnostic record; recovery from a
  corrupt configuration without returning the unit.
- None of this is implemented or tested; `power-loss during update must not brick the device` is a
  requirement, not a fact.

---

## 5. Candidate interface map (text)

```
                 ┌─────────────────────────── HUB candidate (ARCH-HUB-D) ───────────────────────────┐
 12/24 V DC ─────┤ fuse → reverse protection → TVS/filter → DC/DC → rails                          │
                 │                                                     │                             │
 NMEA 0183 ──────┤ isolated RS-422 ──► supervisory MCU ── health/heartbeat ──► application processor │
 (read only)     │        │                     │                                │                 │
 Ethernet ───────┤ magnetics/ESD ───────────────┼────────────────────────────────┤                 │
 Wi-Fi/BLE ──────┤ radio (edition boundary OPEN)│                                │                 │
 USB ────────────┤ current-limited/ESD ─────────┘                                │                 │
 GNSS option ────┤ antenna → receiver ──► serial ─────────────────────────────────┤                 │
                 │                                                              ├─ local data API   │
                 │  power-loss safe state ◄── MCU ◄── RTC backup / storage       ├─ dashboard        │
                 │                                                              ├─ diagnostics      │
                 │  sealed enclosure · one bond point · service access           └─ update (A/B)    │
                 └──────────────────────────────────────────────────────────────────────────────────┘
                    Read-only toward vessel networks. No actuator, autopilot or steering output.
```

---

## 6. Data contract the HUB must publish (candidate shape, not frozen)

| Element | Candidate requirement |
|---|---|
| Value | numeric or enumerated value |
| Unit | SI unit with explicit conversion provenance |
| Source | device identity + interface + adapter reference |
| Timestamp | source time and receive time |
| Quality | valid / invalid / out-of-range / uncalibrated |
| Freshness | age in milliseconds + stale/lost threshold |
| Confidence | declared level where the source provides it |
| Direction | read/write, with write paths enumerated and separately approved |
| Transport | HTTPS/WSS; Signal K path mapping where tested |

**Rule:** a consumer must never be able to mistake "no data" for "normal". That is the entire value of
the data contract and the reason freshness is a first-class element.

---

## 7. Interoperability policy (binding on the future product)

1. Compatibility is published **per device, per firmware version, per message/data type and per
   direction**, backed by a recorded test.
2. If a device is not in the published matrix, the answer is "not assessed". Never "probably works".
3. No universal-compatibility claim, no protocol-name claim, no "works with any NMEA 0183 device".
4. Signal K is not a blanket guarantee; it is per source, version, path and direction.
5. NMEA 2000 is absent from supported claims until licensed, implemented and certified.
6. Any write path is enumerated, bounded, separately approved and tested — and never a steering path.

---

## 8. Verification plan required before any HUB specification is frozen

| # | Verification | Evidence required | Status |
|---|---|---|---|
| H-V1 | Frozen requirement set and edition interface boundary | Approved document with port/radio/capacity decisions | NOT_DONE |
| H-V2 | Architecture selection (G1) | Responsible engineering approval of A–E choice | `CANDIDATE_ONLY` |
| H-V3 | Schematic, layout and DFM/DFT review | Reviewed design package | NOT_DONE |
| H-V4 | Electrical protection and isolation tests | D5 E-T01…E-T16 results | NOT_EXECUTED |
| H-V5 | EMC pre-scan then accredited EMC | Test reports on a representative article | NOT_EXECUTED |
| H-V6 | Thermal, ingress, vibration, salt-fog | Laboratory reports | NOT_EXECUTED |
| H-V7 | Data-contract period/latency and source-health tests | Recorded bench results | NOT_EXECUTED |
| H-V8 | Power-loss, reboot and update-recovery tests | Recorded results incl. corrupt-image recovery | NOT_EXECUTED |
| H-V9 | Security review and authenticated local access | Threat model, test report, DPIA where personal data | NOT_STARTED |
| H-V10 | Compatibility matrix with recorded device tests | Per-device rows with firmware, direction, adapter | 0 rows |
| H-V11 | CRA/EMC/RED/GPSR applicability for the actual configuration | Conformity workstream output | NOT_STARTED |

---

## 9. Failure behaviour required by the design (not implemented)

| Failure | Required behaviour | Current state |
|---|---|---|
| Power loss | Restart to a known state; configuration preserved; no fabricated data | NOT_IMPLEMENTED |
| Application processor hang | Supervisory MCU resets it; local data path degrades visibly | NOT_IMPLEMENTED |
| Source stops sending | Value becomes stale with age; never kept as current | NOT_IMPLEMENTED |
| Source sends implausible data | Out-of-range/invalid state; never silently accepted | NOT_IMPLEMENTED |
| Storage corruption | Boot from previous image; diagnostic record preserved | NOT_IMPLEMENTED |
| Network loss | Local functions continue; internet features degrade only | NOT_IMPLEMENTED |
| Interface fault (short/surge) | Fault contained to that interface | NOT_IMPLEMENTED |
| Clock loss | Time marked uncertain; monotonic uptime continues | NOT_IMPLEMENTED |
| Update failure | Rollback to previous working version | NOT_IMPLEMENTED |
| HUB failure | Cannot move the helm — no steering output exists by design | TRUE BY ARCHITECTURE |

---

## 10. What must stay open (and why)

| Open item | Why it cannot be frozen |
|---|---|
| Processor/SOM and carrier | No funded NRE, no supplier quote, no thermal/EMC evidence |
| Radio presence and band | Edition boundary unspecified; RED route changes with a radio |
| NMEA 2000 | Licence/certification programme not started |
| Secure element | Verified candidate is NRND; alternatives not evaluated |
| Storage size/partitioning | Depends on retention windows, which are `OPEN` |
| Port count and connectors | Depends on the edition envelope, which is `OPEN` |
| Enclosure and mounting | Depends on the installation assessment and the industrial design |
| Power figures | No article; must be measured |
| Update and support window | Commercial and CRA decision, not an engineering choice |
| Price/BOM | No quotation; all cost lines `COST_UNVERIFIED` |

---

## 11. Engineering preference summary (separated from approval)

**Preference:** `ARCH-HUB-D` — a hybrid design with an industrial SOM-class application processor, a
dedicated supervisory MCU, an isolated NMEA 0183 listener, Ethernet with a segmentation policy, an
optional Wi-Fi radio only after the edition boundary is frozen, secure identity on a lifecycle-verified
part, A/B signed updates, and a sealed enclosure with measured environmental and thermal behaviour.

**What that preference is not:** it is not an approved architecture, not a frozen specification, not an
edition definition, not a BOM and not a schedule. It is the candidate the engineer would take forward if
the programme authorises a HUB hardware programme and resolves the commercial question about building an
appliance rather than integrating third-party gateways (option E, the highest-scoring option).

**Escalation:** the choice between D (build the appliance) and E (integrate certified gateways) is a
commercial-strategy decision above the engineering preference. It should be taken before any NRE is spent.
