# MC-11 — WATCH and SENSE architecture (D8)

| Field | Value |
|---|---|
| Document | D8 `MC11-WATCH-SENSE-ARCHITECTURE.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 8) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `hw-architect` |
| Machine records | `data/architecture-options.json` (`ARCH-WATCH-A…E`, `ARCH-SENSE-A…E`), `data/hardware-families.json` |

**Evidence states.** No WATCH or SENSE device exists; no enclosure, PCB, firmware, sample, quotation,
test or certification exists; no supplier was contacted; no vessel was instrumented; customer evidence is
`NONE`. **No guaranteed-alert-delivery claim and no accuracy, ingress or certification claim is made
anywhere in this document.** `PILOT_SAFETY_GATE = BLOCKED` and neither family has a control path.

---

## 1. The five architecture options for WATCH and SENSE

The program requires five architecture options to be assessed: **(1) discrete modules, (2) shared
multi-input hub, (3) integrated WATCH/SENSE, (4) third-party instrument reuse, (5) mixed wired/wireless.**
They are commercial/product-shape options, not all compute classes; the mapping to the scored
architectures in `architecture-options.json` is stated so the scoring is not double-counted.

| # | Program option | SENSE mapping | WATCH mapping | Nature |
|---|---|---|---|---|
| 1 | Discrete modules | `ARCH-SENSE-A` (dev-board modules) / `ARCH-SENSE-C` (custom discrete platform) | `ARCH-WATCH-C`/`-D` (single-purpose device) | One box per measurement / one monitoring box |
| 2 | Shared multi-input hub | `ARCH-SENSE-D` (shared acquisition module + sensing heads) | n/a (WATCH is already multi-input) | One electronics platform, several sensing heads |
| 3 | Integrated WATCH/SENSE | Not separately scored (cross-family integration of `ARCH-SENSE-D` + `ARCH-WATCH-D`) | Same | One device that senses and connects |
| 4 | Third-party instrument reuse | `ARCH-SENSE-E` (adapters/software) | `ARCH-WATCH-E` (service over third-party tracker) | No MAREA sensing element / no MAREA monitoring device |
| 5 | Mixed wired/wireless | Deployment topology over options 1–3 | Deployment topology | Not a separate compute class; **not separately scored** |

### 1.1 Commercial complexity and recurring-cost implications

| Option | Engineering complexity | Manufacturing complexity | Installation / support complexity | Recurring cost implication |
|---|---|---|---|---|
| 1 Discrete modules | Medium per module × 5 variants | High: five enclosures, five PCBs, five test fixtures | Simple per module, harder fleet-wide commissioning | No recurring cost in the product; support and calibration labour per module |
| 2 Shared multi-input hub | Medium-high (one platform, several front ends) | Medium: one main board, several heads | Cabling topology and head placement dominate; one shared point of failure | Possibly a calibration/service model; no cloud cost by itself |
| 3 Integrated WATCH/SENSE | High: sensor integrity + connectivity + subscription isolation in one box | Medium-high; one device with radio + sensors | Simplest single-box installation, hardest fault attribution | Cellular data + subscription + hosting — the highest recurring cost of the five |
| 4 Third-party reuse | Low engineering, high integration/testing | None (no MAREA article) | Depends entirely on third-party installation and app | No device margin; recurring cost set by third parties; possible double subscription |
| 5 Mixed wired/wireless | Adds radio coexistence and pairing to any of 1–3 | Medium | Wireless sensors are easy to place, harder to secure and support | Radio certification and support; possible battery replacement cost for wireless heads |

**Cross-cutting commercial statement.** Options 1–3 create a MAREA hardware business with tooling,
warranty, calibration and support obligations. Option 4 creates an integration/service business with much
lower capital exposure and much weaker differentiation. Option 3 has the best installation experience and
the worst fault-attribution problem (a single device that fails can remove several measurements and the
connectivity at once). Option 5 is a deployment choice, not a way to avoid the underlying engineering.

---

## 2. WATCH — candidate architecture

### 2.1 Product shape: standalone or HUB-dependent?

**The canonical definition is standalone.** WATCH monitors its declared inputs, evaluates rules and
uplinks a bounded telemetry subset; it does **not** require MAREA HUB and does not route HUB data ashore
without a separately consented service (`MAREA-WATCH-COMMERCIAL-SPEC F09`). The architecture therefore
must not create an accidental HUB dependency:

| Shape | Consequence | Verdict |
|---|---|---|
| Standalone (own sensors + own connectivity) | Works with no other MAREA product; matches the canonical definition; simplest support story | **Required by the product definition** |
| HUB-dependent | Would make WATCH unusable without a gateway, break the canonical definition and create a cross-sell trap | **Rejected** |
| HUB-optional read-only | Possible only as a future separately consented service; not part of this architecture | Not designed |

### 2.2 Power: 12/24 V supply, consumption, battery drain

- **Supply:** 12 V and 24 V nominal (candidate window 9–32 V DC, D5 §1); internal conversion to 3.3 V
  and radio rails. A hard-wired fused feed is the candidate installation; a plug-in supply is not.
- **Consumption:** `UNKNOWN` — no article. The design requirement is that **average** consumption over an
  unattended period must not materially drain the battery it monitors, and that figure must be measured
  and published before sale (D5 §7).
- **Design implication:** the device must default to deep sleep. A full Linux SBC with a modem attached
  cannot credibly meet that requirement; this is why `ARCH-WATCH-C` (custom low-power MCU) and
  `ARCH-WATCH-D` (hybrid) are the only credible production candidates.
- **Backup energy:** if the final design includes an internal backup source, its duration must be
  measured, its health monitored and its degradation reported. If it does not, the product must state
  exactly what happens on power loss. No duration is promised today.

### 2.3 Cellular modem, SIM/eSIM, antenna

| Element | Candidate requirement | Status |
|---|---|---|
| Modem | LTE Cat-M1/NB-IoT or Cat-1/Cat-4; **not selected** | `UNKNOWN` |
| SIM | nano-SIM or eSIM; **not decided**; eSIM simplifies logistics and hardens against SIM theft but requires a provisioning agreement | `UNKNOWN` |
| Antenna | internal or external with documented placement; must be protected against ESD/surge and water ingress | `NOT_DESIGNED` |
| Coverage | coverage at marinas, moorings and yards in Galicia/northern Portugal is **unmeasured**; no coverage claim may be made | `NOT_MEASURED` |
| Operator certification | RED plus operator/PTCRB-class acceptance; no engagement | `BLOCKED` |
| Data plan | no contract, no roaming terms, no data cap | `BLOCKED` |

### 2.4 Connectivity loss, buffering and retry

- The device must buffer locally with its own timestamps, replay when connectivity returns, and show the
  gap explicitly. "No data" must never look like "all normal".
- Retry policy must be bounded and must not create a power spiral (retry storms are a battery-drain and
  operator-cost risk).
- Store-and-forward depth, retention and replay semantics are **not designed**; they depend on storage,
  power budget and privacy policy.
- **No alert is guaranteed to be delivered.** Provider acceptance ≠ delivery ≠ human acknowledgement.
  The canonical notification lifecycle distinguishes the three and records who acknowledged and when.

### 2.5 GNSS option

- Optional GNSS for position, geofence and movement. It must be a **decision per edition/installation**,
  not silently assumed: GNSS adds antenna, power and spoofing considerations.
- Loss of fix must be explicit; a stale position must carry its age and never be presented as current.

### 2.6 Watchdog, provisioning and secure identity

- **Watchdog:** independent hardware watchdog on the MCU, plus a supervisory function for any higher-level
  processor. A software timer in the same loop it watches is not sufficient.
- **Secure provisioning:** device identity must be established at manufacture, bound to a vessel/owner at
  setup, and revocable. Candidate technology: secure element or secure key storage — the verified
  `ATECC608B` candidate is NRND (`EVD-MC11-014`), so the family must be re-selected.
- **Ownership proof and transfer:** a documented procedure to rebind the device, revoke prior access and
  state the subscription position. No identity or provisioning system exists today.
- **Credential handling:** no default shared password; per-device keys; no inbound internet-reachable
  service; outbound-only connection.

### 2.7 Alert chain and failure detection

Canonical chain (from `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`): measurement → rule evaluation →
notification creation → provider handoff → provider acceptance → delivery evidence → human
acknowledgement → escalation. Each step has a distinct timestamp and a distinct state.

| Failure | Required behaviour | Status |
|---|---|---|
| Sensor open/short/fault | Input shown invalid, not a plausible value | NOT_IMPLEMENTED |
| Stale measurement | Last-known-good value with age and a stale state | NOT_IMPLEMENTED |
| Connectivity loss | Local buffering; gap visible; last-known-good displayed | NOT_IMPLEMENTED |
| Provider outage | Retry with bounded policy; fallback channel if available; state reported | NOT_IMPLEMENTED |
| Device power loss | Report if backup energy allows; otherwise the gap is visible on recovery | NOT_IMPLEMENTED |
| Device failure | No heartbeat → the service must show the device as offline, never as "all normal" | NOT_IMPLEMENTED |
| Clock loss | Times marked uncertain; ordering preserved where possible | NOT_IMPLEMENTED |

### 2.8 Firmware recovery

- Signed OTA update with rollback and power-loss safety; version visibility; SBOM and vulnerability
  handling for CRA.
- Recovery path when an update fails, including a documented recovery route if the device is remote and
  cannot be reached. **None of this exists.**

### 2.9 Enclosure, installation, cloud dependency, subscription isolation

- **Enclosure:** sealed, mountable in a locker or near the DC panel, with strain-relieved connectors and a
  documented service access. No IP rating may be claimed.
- **Installation:** professional for any DC-distribution work; documented low-risk self-install only where
  the questionnaire proves it. The monitored inputs must be declared and installed so that the owner knows
  exactly what is watched.
- **Cloud dependency:** remote alerts require the service, the cellular network and the provider. **Local
  sensing, local alarm and local buffering must work without them.**
- **Subscription isolation:** an expired or unpaid subscription may stop remote notifications; it may
  never disable local functions. This is a design requirement and is **untested**.

### 2.10 WATCH candidate block diagram (text, not a design)

```
 declared inputs ──► protected front end ──► supervisory MCU ──► local buffer (flash)
 (battery, bilge, temp,          │                 │                    │
  distance, motion, water)      │                 ├── local alarm/indication
                                │                 └── rule evaluation
                                │
 12/24 V ──► fuse/reverse/TVS/DC-DC ──► rails ──► (backup source if designed)
                                │
                                └──► connectivity processor (duty-cycled)
                                          └──► modem + SIM/eSIM + antenna ──► TLS ──► MAREA service ──► provider ──► owner
 Legend: read-only sensing; no control output of any kind; no inbound service.
```

---

## 3. SENSE — candidate architecture

### 3.1 Measured quantities and module mapping

| Module | Canonical measurement | Candidate sensing chain | Notes |
|---|---|---|---|
| `SENSE-POWER` | battery/system voltage and charge/discharge current | fused voltage sense + shunt or hall current sensor; isolated or high-side sensing to be defined | Most safety-adjacent installation (battery bank, alternator); professional install |
| `SENSE-BILGE` | water present at a switch (not continuous level) | isolated digital input with wetting current and open/short detection | **Not a certified alarm** and not the vessel's required bilge-alarm arrangement |
| `SENSE-TANKS` | contents level from a compatible sender | documented sender excitation/input; fuel and water calibration differ | Sender list does not exist; irregular tanks unsolved |
| `SENSE-WIND` | apparent wind speed/angle; true wind only with valid vessel inputs | original masthead sensor **or** NMEA 0183 MWV/MWD adapter | Masthead cable, lightning and calibration are unresolved |
| `SENSE-ENV` | cabin/compartment temperature, relative humidity, barometric pressure | digital sensor on a protected bus | Condensation and enclosure placement dominate accuracy |

**Beyond the canonical set (must not be invented as a product):** the brief asks about **motion/tilt** and
**water ingress**. Motion/tilt is a plausible IMU measurement (and the legacy stack has an IMU fusion
test), and water-ingress detection is a plausible resistive/conductive sensor. **Neither is part of the
canonical SENSE edition list.** Adding either would require a product decision and a new edition, which
MC-11 may not invent (D2 §3, §8). They are recorded here as candidate measurement capabilities for a
future edition only; no SKU, price or claim is created.

### 3.2 Calibration

- Every module must publish **value + unit + source + quality + calibration state + timestamp**.
- Calibration needs a documented reference class, a dated record, and a repeatable procedure. The owner
  or installer must be able to see whether a value is calibrated, uncalibrated, out of range, stale or
  invalid.
- **No calibration fixture exists**, no reference equipment is booked, and no calibration procedure has
  been executed. This is the main difference between "a sensor" and "a measurement product".
- Wind angle calibration requires a known heading reference and either a dockside or sea calibration;
  battery current requires a known load and a reference meter; tank level requires a fill/empty
  characterisation; temperature/humidity require a reference environment.

### 3.3 Accuracy requirements — without an accuracy claim

MC-11 deliberately sets **no numeric accuracy figure**. What it defines is the requirement structure that
must be evidenced before any figure can appear:

| Requirement element | Candidate definition | Evidence needed |
|---|---|---|
| Accuracy vs a reference | measurement error against a traceable reference across the intended range | bench comparison with a calibrated reference |
| Repeatability | spread of repeated measurements under identical conditions | repeated bench runs |
| Drift | change over time and temperature | long-duration and thermal test |
| Resolution / noise | smallest meaningful change distinguishable from noise | noise characterisation, cable-length test |
| Validity envelope | the range and conditions within which the value is presented as valid | defined and tested; outside it the value is invalid |
| Calibration state | whether the current reading is calibrated and to what reference | calibration record |
| Freshness | age of the value and the stale threshold | timing test |

The product may say "measured with calibration state shown"; it may **not** say "accurate", "precise",
"certified" or publish a tolerance until the corresponding test exists.

### 3.4 Power budget (framework, no numbers)

| Contributor | Assumption class | Status |
|---|---|---|
| MCU + front end | always-on, low duty | `UNKNOWN` |
| Sensing element excitation | continuous or pulsed depending on technology | `UNKNOWN` |
| Local interface (wired or radio) | continuous or duty-cycled | `UNKNOWN` |
| DC/DC losses | efficiency curve unmeasured | `UNKNOWN` |
| Total per module | must be measured, not estimated | `NOT_MEASURED` |

A SENSE module is permanent load on the same battery its POWER module monitors; its own consumption must
be part of the honest power picture.

### 3.5 Installation, cable length, noise, replacement, gateway coupling

- **Installation classes:** any work on DC distribution or the battery shunt, any tank sender, any
  masthead sensor/cable and any fuel/engine-space installation is professional-only. A one-for-one module
  replacement in a documented configuration may be a self-install if calibration can be repeated.
- **Cable length:** maximum lengths per interface are not established. Long cable runs on a vessel pick up
  pump, inverter and radio noise; the module's front end and filtering must be designed for that, and the
  length limits must be published.
- **Noise:** the installation must separate sensor cabling from motor/inverter cabling; where crossing is
  unavoidable, cross at right angles. Shielding/grounding policy is part of the design.
- **Measurement failure:** open circuit, short, out-of-range, implausible rate-of-change and sensor
  failure must all map to an explicit invalid/fault state — never to a plausible number.
- **Replacement:** field replacement must be possible without re-engineering the installation, with a
  documented recalibration step and a record update.
- **Gateway coupling:** a module with no compatible consumer produces no user-facing data. The intended
  consumer is HUB; a module must not claim HUB independence it does not have, and HUB must not claim
  support for a module it has not tested.

### 3.6 SENSE candidate block diagram (text, not a design)

```
 12/24 V ──► fuse/reverse/TVS/DC-DC ──► rails
                                        │
 sensing element / sender / NMEA 0183 ──► protected front end ──► MCU ──► local interface
   (wind, shunt, float, tank, T/RH/P)        │                        │        └──► HUB or tested consumer
                                             │                        └──► calibration record + identity
                                             └──► invalid/stale/out-of-range fault states
 Legend: measurement only; no connectivity of its own; not a certified alarm; no control output.
```

---

## 4. Cross-family architecture comparison

### 4.1 WATCH options (scored)

| Option | Score | Commercial complexity | Recurring cost implication |
|---|---:|---|---|
| A dev board + modem HAT | 2.95 | Low NRE, high support risk | Cellular data + subscription; device may be power-hungry |
| B industrial SOM + carrier | 3.45 | Medium NRE | Same recurring service cost; higher device cost |
| C custom low-power MCU | 3.81 | High firmware NRE | Best device power; same service cost |
| D hybrid MCU + app processor | **3.90** | High NRE and complexity | Best requirement fit; same service cost |
| E service over third-party tracker | **4.06** | Low NRE, weak differentiation | Third-party device + data + subscription stacking |

### 4.2 SENSE options (scored)

| Option | Score | Commercial complexity | Recurring cost implication |
|---|---:|---|---|
| A dev-board modules | 3.25 | Low NRE, unmanageable at volume | None in-product; support labour |
| B shared SOM carrier | 3.43 | Medium NRE, high BOM | None |
| C custom MCU platform | **4.16** | High NRE, tooling and calibration fixture | None; calibration service possible |
| D shared multi-input hub | 3.74 | Medium-high; cabling and single point of failure | None; service/calibration |
| E third-party reuse | **4.50** | Low NRE, weak differentiation | Third-party measurement cost; calibration still needed |

**Read honestly:** the highest scores in both families belong to the **least proprietary** options
(WATCH-E 4.06, SENSE-E 4.50), because the frozen criteria reward avoiding hardware risk. The
engineering preferences recorded in `architecture-options.json` are WATCH-D and SENSE-C — the options
that produce a real product — and they are preferences, not approvals. The Lead must decide whether MAREA
builds these devices at all.

---

## 5. Verification plan (all `NOT_EXECUTED`)

| ID | Verification | Applies to | Status |
|---|---|---|---|
| WS-V01 | Quiescent and average current over a full unattended cycle | WATCH | NOT_EXECUTED |
| WS-V02 | Buffer/replay across power cut and connectivity gap | WATCH | NOT_EXECUTED |
| WS-V03 | End-to-end alert test with distinct provider-acceptance/delivery/acknowledgement timestamps | WATCH | NOT_EXECUTED |
| WS-V04 | Subscription-expiry isolation test (local functions survive) | WATCH | NOT_EXECUTED |
| WS-V05 | Coverage survey at representative berths | WATCH | NOT_EXECUTED |
| WS-V06 | Modem RF, antenna and RED/EMC | WATCH | NOT_EXECUTED |
| WS-V07 | Secure provisioning, revocation and ownership transfer | WATCH | NOT_EXECUTED |
| WS-V08 | Measurement chain vs traceable reference, dated calibration record | SENSE (all) | NOT_EXECUTED |
| WS-V09 | Repeatability, drift and temperature behaviour | SENSE (all) | NOT_EXECUTED |
| WS-V10 | Invalid/stale/out-of-range/fault state demonstration | SENSE (all) | NOT_EXECUTED |
| WS-V11 | Cable-length and noise characterisation | SENSE (all) | NOT_EXECUTED |
| WS-V12 | Ingress, salt-fog, vibration, thermal qualification | WATCH + SENSE | NOT_EXECUTED |
| WS-V13 | HUB publication and latency test | SENSE | NOT_EXECUTED |
| WS-V14 | EMC pre-scan and accredited EMC | WATCH + SENSE | NOT_EXECUTED |

No laboratory, vessel, bench or test authorisation exists; gates `G2–G5` are `NOT_AUTHORIZED`.

---

## 6. Open questions

| # | Question | Why it is open |
|---|---|---|
| W1 | Is WATCH a MAREA device or a service over third-party devices? | Commercial decision; option E is highest-scoring but weakest differentiation |
| W2 | Which modem and SIM/eSIM strategy? | No modem selected, no operator contract, no coverage data |
| W3 | What backup energy source and duration? | Design undecided; duration must be measured |
| W4 | What is the monitored-input list per edition and its installation classes? | Monitored-input documentation not built |
| W5 | Is GNSS standard or optional? | Product/edition decision; power, antenna and privacy implications |
| W6 | Which SENSE platform (discrete vs shared vs integrated)? | Commercial decision; option E highest-scoring |
| W7 | Are motion/tilt and water ingress ever in scope? | Not canonical; would require a product/edition decision |
| W8 | What accuracy targets per measurement? | Must be derived from use case and proven; none set |
| W9 | What calibration service and reference equipment? | No fixture, no service design, no reference equipment |
| W10 | Is WATCH/SENSE integration a product or a bundle? | Cannot invent a product; would be a product decision outside MC-11 |
