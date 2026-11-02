# MC-11 — Portfolio hardware map (D3)

| Field | Value |
|---|---|
| Document | D3 `MC11-PORTFOLIO-HARDWARE-MAP.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 3 of D1–D37) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `hw-architect` (Agent A) — write scope `docs/marea/hardware/architecture/` |
| Machine records | `docs/marea/hardware/data/hardware-families.json`, `architecture-options.json` |

**Evidence states at the time of writing (binding).** No supplier was contacted; no quotation was
requested or received; nothing was purchased or sampled; no laboratory work, bench test, sea trial or
vessel installation was performed; no certification was obtained or claimed; customer evidence is
`NONE` (MC-10 transferred zero interviews and zero price responses). `PILOT_SAFETY_GATE = BLOCKED`,
`AIS_TRANSMISSION_OFFERED = false`, `REMOTE_HELM_CONTROL = false`, `FLEET_DEFAULT_HARDWARE = false`,
`NMEA2000_CERTIFIED = false`, `TESTED_COMPATIBILITY_ROWS = 0`, `CE_MARKING_CLAIM = PROHIBITED`,
`ENVIRONMENTAL_RATING_CLAIM = PROHIBITED`.

**This document authorises nothing.** It is not a design freeze, not a bill of materials, not a
purchase order, not a conformity assessment and not a price. Every architecture reference is an option
(`PROPOSED_NOT_APPROVED`); every hardware class is a planning classification, not an approved product
definition. Where a fact is absent the value is `UNKNOWN`, never `0` or "negligible".

**Evidence IDs used here** (full records in `data/evidence/architecture.json`):
`EVD-MC11-001` NMEA 2000 certification/manufacturer-code obligations · `EVD-MC11-003/004` NMEA 0183
licence and mnemonic code · `EVD-MC11-005/006/018` Raspberry Pi 5 · `EVD-MC11-007/008` Pico 2/RP2350 ·
`EVD-MC11-009` Digital Yacht iKonvert (third-party comparator) · `EVD-MC11-010/011` Toradex Verdin
iMX8M Plus · `EVD-MC11-012` STM32H743ZI · `EVD-MC11-013` u-blox MAX-M10 · `EVD-MC11-014`
Microchip ATECC608B (NRND) · `EVD-MC11-015/016` RED 2014/53/EU · `EVD-MC11-017/019` retrieval
failures (Cytron, Pico documentation).

---

## 1. What this map answers

MC-11 research question 1 ("which families require proprietary physical hardware?") and question 2
("which can be software-only or layered on third-party equipment?") are answered per family below.
The four hardware classes are used exactly as defined in the data contract:

| Hardware class | Families | Meaning in MC-11 |
|---|---|---|
| `PROPRIETARY_HARDWARE` | HUB, AIS, SENSE, WATCH, DISPLAY | A MAREA-designed or MAREA-branded physical article is required for the canonical product definition. None exists. |
| `SOFTWARE_ONLY` | NAV, FLEET | No MAREA physical article in the canonical definition; hardware dependencies are optional third-party purchases. |
| `LICENSED_DATA_SERVICE` | WEATHER | The product is a subscription over licensed third-party data; no physical article. |
| `SAFETY_BLOCKED` | PILOT | A physical control system is defined but development is prohibited while the safety gate is closed. |

A family may be `SOFTWARE_ONLY` and still be blocked by a third-party hardware dependency (NAV needs a
compatible data source for its Pro outcome). Hardware class describes **what MAREA must make**, not
what the customer must buy.

### 1.1 What is physically required versus what is commercial packaging

- **Kits are packaging, never capability.** `SENSE-ESSENTIALS` expands to `SENSE-POWER` + `SENSE-BILGE`;
  `SENSE-SAIL` and `SENSE-SYSTEMS` expand only to existing module editions. No kit adds a sensing
  element, a certification or a firmware capability.
- **Bundles are composition, never new SKUs.** The six bundle IDs map to canonical product lines only
  (§4). No bundle name justifies a new physical article.
- **A firmware feature is not a product.** None of the required components below may be replaced by a
  software claim (`NMEA2000_CERTIFIED = false`).

---

## 2. The nine families

Each family block uses the same order: identity and editions; required physical components; optional
physical components; software-only components; external data dependencies; interface requirements;
power requirements; safety classification; provisional architecture and alternatives; verification
needed; supplier evidence state; preliminary cost state; conformity questions; readiness; customer
requirement uncertainty; commercial blockers; shared platform blocks (block names only, never
component IDs — component IDs belong to the sourcing workstream).

### 2.1 `NAV` — MAREA NAV (`NAV-ESSENTIAL`, `NAV-PRO`)

- **Hardware class:** `SOFTWARE_ONLY`. **Required physical components:** none supplied by MAREA.
- **Optional physical:** customer phone/tablet/desktop with GNSS; MAREA HUB; receive-only MAREA AIS;
  documented USB-serial or isolated adapter for a third-party instrument feed.
- **Software-only:** planning/chart client, licensed-chart client and offline-region manager,
  instrument-overlay client, AIS target display and CPA/TCPA computation where valid inputs exist
  (boundary not frozen), weather/tide/current overlay client, account/entitlement/export/session.
- **External data:** licensed chart/ENC right (`CHART_RIGHTS_GRANTED = false`), licensed weather/tide/
  current right (`WEATHER_PROVIDER_RIGHTS = NOT_GRANTED`), customer device GNSS and connectivity.
- **Interfaces:** device GNSS; HTTPS/WSS to HUB or third party; NMEA 0183 receive where an adapter is
  documented; AIS `!AIVDM` receive; internet for licensed data (degradable, never required beyond
  licence terms). **No steering output, no autopilot route upload.**
- **Power:** none supplied; runs on the customer device. `UNKNOWN` consumption by MAREA.
- **Safety classification:** `NON_SAFETY_RELATED` (navigational aid, disclaimers mandatory).
- **Architecture:** provisional `ARCH-NAV-E` (software-first); no alternative hardware option exists by
  definition. **Verification:** chart/weather rights; device- and adapter-level integration tests with
  firmware versions; offline-region licence conformance; CPA/TCPA boundary; degraded-state tests.
- **Supplier evidence state:** no MAREA component. Third-party device evidence is `UNKNOWN`.
- **Preliminary cost:** `NOT_ESTABLISHED` (no data-cost quote; subscription economics unknowable here).
- **Conformity questions:** app-store/consumer-software duties; CRA for the connectable application and
  its update duty; whether any supplied accessory creates a separate product obligation.
- **Readiness:** `DEFINED_NOT_BUILT`. **Customer requirement uncertainty:** `UNVALIDATED`.
- **Commercial blockers:** chart rights, weather rights, no tested integration path, disclaimer
  obligations. **Shared blocks:** `GNSS, LOG, SEC, ETH, WIFI, MEM, PKG`.

### 2.2 `HUB` — MAREA HUB (`HUB-STANDARD`, `HUB-PRO`)

- **Hardware class:** `PROPRIETARY_HARDWARE`.
- **Required physical:** computing module (application-processor class, family not selected);
  supervisory MCU with independent watchdog; isolated NMEA 0183 listener (RS-422, opto-isolated);
  vessel-network Ethernet PHY/connector; Wi-Fi/BLE module for local access (edition boundary
  unspecified); regulated DC input with reverse-polarity, overcurrent and transient protection;
  internal storage (eMMC/SD class) and RTC with backup; hardware root of trust / secure-element
  candidate; enclosure, mount and labelled harness; status indication and factory-test access.
- **Optional physical:** isolated NMEA 2000 CAN interface — **blocked** (not implemented, not licensed,
  not certified); external GNSS antenna/receiver; cellular modem — **not in the edition boundary**
  (`EDITION_INTERFACE_UNSPECIFIED`); USB ports; second Ethernet port for segmentation.
- **Software-only:** vessel-data normalisation and local contract; source health/freshness/diagnostics;
  local dashboard and configuration; signed update, rollback, backup/restore; device identity,
  provisional registration and ownership transfer; installer tooling and commissioning record (HUB-PRO
  by edition definition only).
- **External data:** third-party instrument data through documented interfaces; GNSS; receive-only AIS
  from a compatible receiver (optional). HUB itself consumes no licensed data.
- **Interfaces:** NMEA 0183 receive (isolated) per matrix; Signal K over the LAN; HTTPS/WSS local
  interface; authenticated owner/installer roles; NMEA 2000 absent and prohibited; any write path to
  third-party equipment must be enumerated, bounded and separately approved.
- **Power:** 12 V and 24 V nominal; candidate range 9–32 V DC (**candidate requirement, not tested**);
  consumption and standby `UNKNOWN` — no article exists.
- **Safety classification:** `NON_SAFETY_RELATED`. HUB has no steering output by design.
- **Architecture:** provisional `ARCH-HUB-D` (hybrid MCU acquisition + application processor);
  alternatives `ARCH-HUB-A` (development board), `-B` (industrial SOM), `-C` (custom MCU), `-E`
  (software/service-first). Scoring and comparison in D4 §3 and D7 §3.
- **Verification:** isolation/transient tests; EMC pre-scan and accredited EMC; thermal, ingress,
  vibration; data-contract period/latency; power-loss and update recovery; network security review;
  edition interface freeze.
- **Supplier evidence state:** candidate families evidenced by manufacturer pages for Toradex
  (`EVD-MC11-010/011`), ST (`EVD-MC11-012`), Microchip (`EVD-MC11-014`), RPi (`EVD-MC11-005/006`);
  **no component is selected and no price was obtained**.
- **Preliminary cost:** `NOT_ESTABLISHED` (`rangeEur = null`); public retail SBC price observed
  (`EVD-MC11-006`) is context, not a BOM.
- **Conformity questions:** EMC; RED only if a radio is integrated (Wi-Fi/BLE is radio equipment);
  CRA update/support duties; GPSR; RoHS/WEEE; LVD non-applicability reasoning for a sub-75 V DC
  appliance (to confirm); MED/NMEA implications only if NMEA 2000 is ever added.
- **Readiness:** `DEFINED_NOT_ENGINEERED`. **Customer requirement uncertainty:** `UNVALIDATED`.
- **Commercial blockers:** H-04 (no tested matrix), H-05/H-07 (no hardware, BOM or quotes),
  unspecified edition interface boundary, no authenticated local access model, local-first rule.
- **Shared blocks:** `PROC, MCU, CAN, N183, ETH, WIFI, BLE, GNSS, SEC, PWR, MEM, MECH, RF, PCB, PCBA, TEST, PKG, LOG`.

### 2.3 `AIS` — MAREA AIS (`AIS-RECEIVER`, `AIS-CONNECTED`)

- **Hardware class:** `PROPRIETARY_HARDWARE`. **Receive-only by architecture and by policy.**
- **Required physical:** receive-only AIS VHF receiver (dual-channel target, single-channel minimum if
  dual cannot be evidenced); decoder host; VHF antenna input (antenna and splitter excluded from the
  SKU); regulated DC input with fuse/polarity/transient protection; documented local data output;
  status and decoding-health indication; enclosure, mount and labelled harness.
- **Optional physical:** dedicated AIS VHF antenna; VHF splitter; mast coax/connectors; second local
  consumer networking (AIS-CONNECTED boundary, `CONDITIONAL`); own-position source from NAV/HUB.
- **Software-only:** target state with age/stale/lost; target list and honest empty state; receiver
  diagnostics and support export; Signal K mapping where tested; CPA/TCPA in the consuming app only.
- **External data:** receive-only AIS VHF broadcast (no retention/redistribution right); own-vessel
  position/COG/SOG for derived values; GPL-3.0 decoder decision (S-01/DEC-04) before distribution.
- **Interfaces:** 50-ohm VHF input; NMEA 0183 `!AIVDM` output over a documented transport; Signal K
  where tested; **no transmission path of any kind**; no NMEA 2000 and no NMEA 2000 claim.
- **Power:** 12 V nominal (24 V to be confirmed); candidate range 9–32 V DC; consumption `UNKNOWN`.
- **Safety classification:** `NON_SAFETY_RELATED` (awareness aid; not collision avoidance).
- **Architecture:** provisional `ARCH-AIS-B`; alternatives `-A` (SDR/dev board), `-C` (custom board),
  `-D` (certified third-party receiver module + MAREA supervisory MCU), `-E` (software/service-first
  integration, no MAREA receiver). D9 recommends the `-E` posture for the near term.
- **Verification:** RF sensitivity/selectivity/spurious; EMC and RED; antenna/splitter installation
  test; decoder correctness against recorded captures; stale/lost and antenna-fault behaviour;
  per-consumer integration.
- **Supplier evidence state:** no receiver module evidenced; only the RED scope (`EVD-MC11-015/016`) and
  GNSS module availability (`EVD-MC11-013`) are recorded. **No price observed.**
- **Preliminary cost:** `NOT_ESTABLISHED`.
- **Conformity questions:** RED applies to a receive-only receiver; MED scope question for EU-flag
  ships; EMC/GPSR/RoHS/WEEE; CRA if connectable; antenna/splitter are separate products; AIS data
  retention/redistribution is a data-rights question, not radio conformity.
- **Readiness:** `DEFINED_NOT_ENGINEERED`. **Customer requirement uncertainty:** `UNVALIDATED`.
- **Commercial blockers:** `AIS_TRANSMISSION_OFFERED = false`; H-08 (no hardware/RF conformity);
  S-01/DEC-04 decoder licence; `AIS-CONNECTED` verdict `CONDITIONAL / NOT_YET_JUSTIFIED`.
- **Shared blocks:** `RF, PROC, MCU, N183, PWR, GNSS, MECH, PCB, PCBA, TEST, PKG, LOG`.

### 2.4 `PILOT` — MAREA PILOT (`PILOT-COASTAL`, `PILOT-SAIL`, `PILOT-PRO`)

- **Hardware class:** `SAFETY_BLOCKED`. `PILOT_SAFETY_GATE = BLOCKED` throughout MC-11.
- **Required physical (defined, not designed or authorised):** control computer; independent
  motor-control electronics; physical control head; surveyed drive/actuator; steering/rudder feedback;
  calibrated heading reference; physical E-stop and independent motor-power isolation; fused,
  transient-protected power and harness; installation records and handover pack.
- **Optional physical:** wind sensor qualified as a steering input (Sail only, conditional); GNSS for
  route mode; second control-head station; read-only status display.
- **Software-only:** heading-hold controller (final Coastal intent); wind-angle and route/track
  controllers (conditional, not equivalent modes); fault taxonomy and demotion; authenticated local
  control plane; commissioning and sea-trial evidence package.
- **External data:** vessel-specific survey and steering-system data; calibrated heading/wind;
  GNSS; installer competence, insurance and liability framework (does not exist).
- **Interfaces:** local-only control boundary; no cloud/internet/remote command; read-only status export
  only under an approved authenticated interface; **no actuator path outside PILOT**; no route upload
  that commands the helm from NAV; no NMEA 2000 claim.
- **Power:** 12/24 V nominal; dedicated fused motor circuit; range to be derived from the surveyed
  drive — `NOT_ESTABLISHED`; consumption `UNKNOWN`.
- **Safety classification:** `SAFETY_RELEVANT_BLOCKED`.
- **Architecture:** provisional `ARCH-PILOT-E` (no-actuator, software/service-only); alternatives
  `-A`…`-D` documented and scored but **not selectable**. D9 records the disposition
  `DEFER_SAFETY_CRITICAL_DEVELOPMENT` among the mandated vocabulary.
- **Verification:** gates G1–G9 of `HARDWARE-COMPLIANCE-MATRIX.md §3.5` — all `NOT_EVIDENCED`.
- **Supplier evidence state:** Cytron MD30C R2 manufacturer page **could not be retrieved**
  (`EVD-MC11-017`); no drive, E-stop or contactor evidence exists. No price asserted.
- **Preliminary cost:** `NOT_ESTABLISHED`; no BOM, no labour, no insurance, no conformity quote.
- **Conformity questions:** motor-drive EMC; LVD/EMC/GPSR; CRA if connectable; national rules for
  professional vessels; product liability and insurance; independent review.
- **Readiness:** `SAFETY_BLOCKED_NOT_ENGINEERED`. **Customer requirement uncertainty:** `UNVALIDATED`.
- **Commercial blockers:** `PILOT_SAFETY_GATE = BLOCKED`, `REMOTE_HELM_CONTROL = false`, H-01/H-03/H-05/H-07/P-04,
  no installer network or competence scheme, no bench or sea-trial evidence.
- **Shared blocks:** `MCU, PROC, PWR, GNSS, MECH, PCB, PCBA, TEST, LOG`.

### 2.5 `SENSE` — MAREA SENSE (five modules, three kits)

- **Hardware class:** `PROPRIETARY_HARDWARE`.
- **Required physical:** module MCU with protected/isolated front end; sensing element or documented
  input interface per module (anemometer, shunt/hall, float switch, tank sender, T/RH/pressure);
  regulated DC input with protection; local data interface to a compatible consumer; compartment-grade
  enclosure, cable gland, connectors and mount; calibration record medium and module identity.
- **Optional physical:** MAREA HUB; MAREA WATCH; third-party wind instrument/sender/shunt where the
  module is an adapter; masthead cable; replacement elements and calibration service.
- **Software-only:** measurement model with units/range/quality/freshness/calibration state;
  calibration workflow and record; diagnostics; firmware update with rollback; documented adapters.
- **External data:** no cloud dependency for local measurement; HUB or tested consumer for visibility;
  third-party sender characteristics for adapter modules.
- **Interfaces:** analogue/digital front end per module; NMEA 0183 MWV/MWD receive where acting as a
  wind adapter; Signal K / documented local interface through HUB; no NMEA 2000; no own connectivity.
- **Power:** 12 V nominal (24 V per module to confirm); candidate 9–32 V DC; consumption `UNKNOWN`.
- **Safety classification:** `NON_SAFETY_RELATED`. **Not a certified alarm and not required equipment.**
- **Architecture:** provisional `ARCH-SENSE-C` (shared custom MCU platform); alternatives `-A` (dev
  boards), `-B` (shared SOM carrier), `-D` (shared multi-input hub module), `-E` (third-party reuse).
- **Verification:** measurement chain vs reference class with dated calibration; accuracy/repeatability/
  drift measurement; electrical protection and isolation; ingress/salt-fog/vibration/thermal; invalid/
  stale/out-of-range states; HUB publication and cable-length/EMC.
- **Supplier evidence state:** only MCU/SOM families evidenced (`EVD-MC11-010/012`); no sensing element,
  no sender, no price, no accuracy data.
- **Preliminary cost:** `NOT_ESTABLISHED`; no kit price may be derived from module hypotheses.
- **Conformity questions:** EMC; RED only if a radio is added (intended: none); GPSR/RoHS/WEEE; CRA if
  network-connected; non-certified-alarm boundary; calibration responsibility and traceability.
- **Readiness:** `DEFINED_NOT_ENGINEERED`. **Customer requirement uncertainty:** `UNVALIDATED`.
- **Commercial blockers:** H-05/H-11, no accuracy evidence, no calibration fixture, no kit pricing,
  SAIL/SYSTEMS conditional.
- **Shared blocks:** `MCU, SENSE, PWR, N183, MECH, PCB, PCBA, TEST, PKG, LOG`.

### 2.6 `WATCH` — MAREA WATCH (`WATCH-CORE`, `WATCH-PLUS`)

- **Hardware class:** `PROPRIETARY_HARDWARE`.
- **Required physical:** monitoring device with declared sensor inputs and an internal backup energy
  source if the final design includes one; outbound-only cellular modem with SIM/eSIM and antenna;
  secure element or secure key storage for device identity; regulated DC input, power-loss detection
  and local buffering; connectors/adapters for the declared input set; enclosure, mount and
  installation materials; status indication and local diagnostics.
- **Optional physical:** external antenna; backup-energy accessory if supported; additional SENSE
  modules; installation service and hardware replacement.
- **Software-only:** provisioning/identity/ownership proof and transfer; freshness, last-known-good and
  connectivity-gap model; alert rules, local buffering, replay and escalation record; subscription
  service and entitlement ledger; notification handoff; privacy controls and revocation; signed OTA.
- **External data:** cellular coverage and data plan; push provider; monitoring subscription service
  (does not exist); installation/connectivity survey.
- **Interfaces:** outbound-only TLS, no inbound internet-reachable service; GNSS option; no AIS traffic
  display; **no control or steering path**; no HUB data ashore without separate consent.
- **Power:** 12/24 V nominal; candidate 9–32 V DC; **quiescent and average consumption `UNKNOWN`**.
  A monitoring device must not materially drain the battery it monitors; that is a measured
  requirement (D5 §7), not an assumption.
- **Safety classification:** `NON_SAFETY_RELATED`. Not a certified alarm, distress service or
  theft-prevention guarantee.
- **Architecture:** provisional `ARCH-WATCH-D` (hybrid low-power supervision + application processor);
  alternatives `-A` (dev board), `-B` (SOM), `-C` (custom low-power MCU), `-E` (software/service-first).
- **Verification:** quiescent/average current across modem states over a full unattended period;
  buffering/replay across a power cut; end-to-end alert test with distinct timestamps;
  subscription-expiry isolation; coverage survey; antenna/RF conformity; secure provisioning and
  revocation.
- **Supplier evidence state:** MCU/SOM/GNSS/secure-element families evidenced (`EVD-MC11-012/013/014/010`);
  **no modem, no SIM contract, no provider price, no device**.
- **Preliminary cost:** `NOT_ESTABLISHED`; connectivity and subscription costs are external and unpriced.
- **Conformity questions:** RED for the cellular radio plus operator acceptance; EMC/GPSR/RoHS/WEEE;
  CRA; GDPR role for position/telemetry; no guaranteed-alert claim.
- **Readiness:** `DEFINED_NOT_ENGINEERED`. **Customer requirement uncertainty:** `UNVALIDATED`.
- **Commercial blockers:** no connectivity contract, no subscription service/terms, H-11/H-12, no
  guaranteed-alert-delivery claim permitted.
- **Shared blocks:** `MCU, PROC, CELL, GNSS, SEC, PWR, MECH, RF, PCB, PCBA, TEST, PKG, LOG`.

### 2.7 `DISPLAY` — MAREA DISPLAY (`DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL`)

- **Hardware class:** `PROPRIETARY_HARDWARE`.
- **Required physical:** marine-helm panel and backlight with daylight/sunlight/night experiences
  (technology open); compute module/SoC able to render layouts at helm responsiveness; durable local
  storage; sealed enclosure and bezel with service-opening strategy; specified mount family with
  documented load case; power conversion/protection from 12/24 V; marine connectors and harness;
  dedicated operating environment locked to the approved application set.
- **Optional physical:** physical buttons/rotary control only if the final hardware includes them;
  second-station mount/harness; external GNSS/data source; wet-use touch sensor.
- **Software-only:** instrument/alarm/received-AIS presentation; navigation presentation; configuration,
  backup, diagnostics and update client; PILOT read-only status only after an approved interface.
- **External data:** HUB local data or another compatible source; licensed weather/chart data where
  displayed; no independent internet requirement for local instrument display.
- **Interfaces:** Ethernet/Wi-Fi; documented data inputs (HUB API, NMEA 0183 where applicable);
  **no steering authority and no PILOT control-head function**; no NMEA 2000 claim.
- **Power:** 12/24 V nominal; candidate 9–32 V DC; consumption `UNKNOWN` — **no current or power
  figure may be published before measurement**.
- **Safety classification:** `NON_SAFETY_RELATED`.
- **Architecture:** provisional `ARCH-DISPLAY-B` (industrial HMI module + SOM); alternatives `-A`
  (tablet-based), `-C` (custom screen/carrier/enclosure), `-D` (hybrid industrial panel + carrier),
  `-E` (third-party display integration). **Size stays `SIZE_NOT_FROZEN`.**
- **Verification:** photometric sunlight and night validation; thermal/ingress/salt-fog/UV/vibration;
  wet and gloved input measurement; boot/rollback/power-loss recovery; EMC; RED only if radio;
  readable safety information in every mode.
- **Supplier evidence state:** no panel, no SOM/carrier for display, no mount, no price. Only the
  generic SOM/RPi families are evidenced (`EVD-MC11-010/005`).
- **Preliminary cost:** `NOT_ESTABLISHED`.
- **Conformity questions:** EMC clearly applicable; RED potentially applicable only if a radio is
  present; LVD non-applicability to confirm; GPSR/RoHS/WEEE/CRA; not a PILOT control head.
- **Readiness:** `CONDITIONAL_SIZE_NOT_FROZEN`; `DISPLAY-EMBEDDED-RUNTIME = NOT_FOUND`.
- **Customer requirement uncertainty:** `UNVALIDATED`.
- **Commercial blockers:** `HARDWARE_NOT_SELECTED`, `SIZE_NOT_FROZEN`, `BOM_NOT_ESTABLISHED`,
  no photometric/environmental measurement, `DISPLAY-LARGE-CONDITIONAL` never selectable.
- **Shared blocks:** `DISP, PROC, MEM, PWR, ETH, WIFI, MECH, PCB, PCBA, TEST, PKG, LOG`.

### 2.8 `WEATHER` — MAREA WEATHER (`WEATHER-STANDARD`, `WEATHER-PRO`)

- **Hardware class:** `LICENSED_DATA_SERVICE`. **Required physical:** none.
- **Optional physical:** MAREA DISPLAY to render the licensed view where display rights permit; MAREA
  HUB to supply own-vessel observations (labelled as own-vessel, not third-party data).
- **Software-only:** source registry with provider/model/model-run/valid-time/receipt-time; four-state
  freshness plus missing/out-of-coverage; multi-model comparison showing labelled disagreement;
  entitlement ledger and NAV integration; caching only within licensed scope.
- **External data:** licensed forecast/observation datasets and API plans; display and caching rights;
  internet.
- **Interfaces:** HTTPS provider APIs server-side; read-only feed to NAV/DISPLAY/FLEET where permitted;
  no vessel control; no official-warning authority.
- **Power:** not applicable.
- **Safety classification:** `NON_SAFETY_RELATED`. **Architecture:** `ARCH-WEATHER-E` only.
- **Verification:** provider contracts; declared evaluation with published methodology (no accuracy
  claim before it); freshness/stale behaviour; entitlement sharing without double billing.
- **Supplier evidence:** provider rights `NOT_GRANTED`; no provider price retrieved (Open-Meteo plan
  amounts were not retrievable on 2026-10-30 per the WEATHER spec).
- **Preliminary cost:** `NOT_ESTABLISHED`. **Readiness:** `DEFINED_NOT_BUILT`.
- **Conformity questions:** consumer software/subscription duties; CRA if in scope; data protection.
- **Commercial blockers:** `WEATHER_PROVIDER_RIGHTS = NOT_GRANTED`, no source registry/evaluation/
  entitlement service, no accuracy or coverage claim permitted.
- **Customer requirement uncertainty:** `UNVALIDATED`. **Shared blocks:** `LOG, SEC, PKG` (+ `ETH` client).

### 2.9 `FLEET` — MAREA FLEET (`FLEET-START`, `FLEET-BUSINESS`, `FLEET-ENTERPRISE`)

- **Hardware class:** `SOFTWARE_ONLY`. **Required physical: NONE — `hardwareIncludedByDefault = false`.**
- **Optional physical:** no default hardware; any WATCH/HUB edge device is a separate purchase and an
  explicitly conditional integration, never a bundle line.
- **Software-only:** organisation tenancy, roles, invitations and revocation; vessel registry/profiles/
  operational state; maintenance, work orders, service history, equipment inventory; documents with
  expiry, incidents, events; reporting/export/audit/tenant isolation; read-only telemetry integration.
- **External data:** cloud hosting/database; notification providers; optional read-only WATCH/HUB
  telemetry with organisation consent; per-device connectivity (external, never in the SaaS fee).
- **Interfaces:** HTTPS web app/API; read-only telemetry ingestion; no inbound vessel connection, no
  command topic; permissioned outbound integrations; **no control, steering, throttle or remote helm**.
- **Power:** not applicable.
- **Safety classification:** `NON_SAFETY_RELATED`. **Architecture:** `ARCH-FLEET-E` only.
- **Verification:** tenant-isolation and authorisation adversarial test; read-only boundary proof;
  audit/export/deletion; CRA and data-processing obligations; no SLA or uptime figure before a
  measured service exists.
- **Supplier evidence:** no tenancy service, billing, terms or DPA exists.
- **Preliminary cost:** `NOT_ESTABLISHED`. **Readiness:** `DEFINED_NOT_BUILT`.
- **Conformity questions:** CRA for the B2B SaaS and client software; GDPR controller/processor roles.
- **Commercial blockers:** no tenancy/billing/terms/DPA; FLEET hardware-not-included rule binding;
  `FLEET-ENTERPRISE` contracted, never a checkout SKU.
- **Customer requirement uncertainty:** `UNVALIDATED`. **Shared blocks:** `LOG, SEC, PKG`.

---

## 3. Cross-family hardware dependency order

Which families can exist without another MAREA family physically present:

| Family | Can be delivered alone? | Mandatory MAREA hardware dependency | Mandatory third-party dependency |
|---|---|---|---|
| NAV | Yes (software) | None | Device GNSS; licensed chart data; optional instrument source |
| WEATHER | Yes (service) | None | Licensed provider data and internet |
| FLEET | Yes (SaaS) | None | Hosting and, optionally, telemetry devices |
| HUB | Yes (appliance) | None | At least one compatible data source for the promised outcome |
| AIS | Yes (with a consumer) | None (its output needs a consumer) | Antenna/splitter; own-position source for derived values |
| SENSE | **No** | HUB or a tested direct consumer | Sensing element/sender where adapter-type |
| WATCH | Yes | None | Cellular coverage and data plan; notification provider |
| DISPLAY | **No** | HUB or another compatible data source | None mandatory, but licensed data for weather/chart views |
| PILOT | Blocked | None (self-contained system) | None, but installer/survey/insurance required |

This order matters commercially: a HUB sold without any compatible source delivers almost nothing, and
a SENSE or DISPLAY sold without a consumer produces no user-facing data. That is a support and
returns risk, not a technical defect.

---

## 4. The six bundles traced to canonical composition

Source of truth: `docs/marea/bundles/bundle-definitions.json` `components[]`. The table lists only the
canonical component lines; `REQUIRED_EXTERNAL` and `QUOTATION_REQUIRED` lines are shown as external
dependencies. No bundle creates a SKU and none has a fixed turnkey price.

### 4.1 `START` — MAREA START

| Line | Family | Edition | Inclusion | Qty |
|---|---|---|---|---|
| ST-01 | HUB | `HUB-STANDARD` | INCLUDED | 1 |
| ST-02 | NAV | `NAV-PRO` | INCLUDED | 1 |
| ST-05 | — | — | REQUIRED_EXTERNAL (licensed chart region) | 1 |
| ST-06 | — | — | REQUIRED_EXTERNAL (customer phone/tablet with GNSS, cabling/adapters/power) | 1 |

**Families physically present:** HUB only. **Exclusions:** AIS, DISPLAY, PILOT, SENSE, WATCH, FLEET,
NMEA 2000 certification, ECDIS status. **Safety gate:** no actuator path; PILOT excluded; HUB has no
steering output. **Hardware included by default:** yes (HUB). **Fixed turnkey price:** no.

### 4.2 `CRUISE` — MAREA CRUISE

| Line | Family | Edition | Inclusion | Qty |
|---|---|---|---|---|
| CR-01 | NAV | `NAV-ESSENTIAL` | INCLUDED | 1 |
| CR-02 | HUB | `HUB-STANDARD` | INCLUDED | 1 |
| CR-03 | AIS | `AIS-RECEIVER` | INCLUDED | 1 |
| CR-04 | DISPLAY | `DISPLAY-7` | INCLUDED | 1 |
| CR-06 | AIS | `AIS-CONNECTED` | CONDITIONAL | 1 |
| CR-07 | DISPLAY | `DISPLAY-LARGE-CONDITIONAL` | INELIGIBLE | 1 |
| CR-09 | — | — | REQUIRED_EXTERNAL (AIS VHF antenna + optional splitter) | 1 |
| CR-10 | — | — | REQUIRED_EXTERNAL (mounts, power, cabling, installation, commissioning) | 1 |
| CR-11 | — | — | REQUIRED_EXTERNAL (licensed chart region and GNSS source) | 1 |

**Families physically present:** HUB, AIS (receive-only), DISPLAY. **Exclusions:** AIS transmission/
transponder, approved DISPLAY large size, PILOT, SENSE, WATCH, FLEET, NMEA 2000 certification, ECDIS,
unlimited charts. **Safety gate:** AIS receive-only; DISPLAY has no steering authority; PILOT excluded.
**Hardware included by default:** yes. **Fixed turnkey price:** no.

### 4.3 `SAIL` — MAREA SAIL

| Line | Family | Edition | Inclusion | Qty |
|---|---|---|---|---|
| SL-01 | NAV | `NAV-PRO` | INCLUDED | 1 |
| SL-02 | HUB | `HUB-STANDARD` | INCLUDED | 1 |
| SL-03 | PILOT | `PILOT-COASTAL` | QUOTATION_REQUIRED | 1 |
| SL-04 | SENSE | `SENSE-WIND` | CONDITIONAL | 1 |
| SL-05 | PILOT | `PILOT-SAIL` | CONDITIONAL | 1 |
| SL-06 | PILOT | `PILOT-PRO` | INELIGIBLE | 1 |
| SL-08 | — | — | REQUIRED_EXTERNAL (documented vessel and steering survey) | 1 |
| SL-09 | — | — | QUOTATION_REQUIRED (drive/actuator, feedback, E-stop, cabling, protection) | 1 |
| SL-10 | — | — | QUOTATION_REQUIRED (labour, commissioning, sea trials, training, conformity, warranty) | 1 |

**Families physically present:** HUB, SENSE-WIND (conditional), PILOT (quotation only, not a priced
line). **Exclusions:** fixed PILOT price or turnkey SAIL price, PILOT-PRO as retail SKU, autonomous/
remote steering, certified steering system, AIS, DISPLAY, WATCH, FLEET. **Safety gate:**
`PILOT_SAFETY_GATE = BLOCKED`; steering is quotation-only and never a priced bundle line; no capability
may be inferred from the bundle name. **Hardware included by default:** yes. **Fixed turnkey price:** no.

### 4.4 `PROTECT` — MAREA PROTECT

| Line | Family | Edition | Inclusion | Qty |
|---|---|---|---|---|
| PR-01 | WATCH | `WATCH-CORE` | INCLUDED | 1 |
| PR-02 | SENSE | `SENSE-ESSENTIALS` → `SENSE-POWER` + `SENSE-BILGE` | INCLUDED | 1 |
| PR-03 | SENSE | (loose module) | INELIGIBLE (duplicate; counted once) | 1 |
| PR-05 | WATCH | `WATCH-PLUS` | CONDITIONAL | 1 |
| PR-06 | — | — | REQUIRED_EXTERNAL (cellular/SIM/data plan) | 1 |
| PR-07 | — | — | INCLUDED (recurring monitoring subscription; remote stops on expiry, local functions continue) | 1 |
| PR-08 | — | — | REQUIRED_EXTERNAL (installation, labour, commissioning, registration, privacy notice) | 1 |

**Families physically present:** WATCH, SENSE (two modules via kit expansion). **Exclusions:** duplicate
loose modules, SENSE-SAIL/SYSTEMS, HUB as a requirement, PILOT, DISPLAY, AIS, FLEET, guaranteed or
immediate delivery, certified distress/theft service, subscription-free cloud monitoring, sensor
accuracy/IP claims. **Safety gate:** no control path; alerts conditional and not a certified alarm;
PILOT excluded; local functions survive subscription expiry. **Hardware included by default:** yes.
**Fixed turnkey price:** no.

### 4.5 `COMPLETE` — MAREA COMPLETE

| Line | Family | Edition | Inclusion | Qty |
|---|---|---|---|---|
| CP-01 | NAV | `NAV-PRO` | INCLUDED | 1 |
| CP-02 | HUB | `HUB-PRO` | INCLUDED | 1 |
| CP-03 | DISPLAY | `DISPLAY-7` | INCLUDED | 1 |
| CP-04 | WATCH | `WATCH-CORE` | INCLUDED | 1 |
| CP-05 | SENSE | `SENSE-POWER` | INCLUDED | 1 |
| CP-06 | SENSE | `SENSE-BILGE` | INCLUDED | 1 |
| CP-07 | SENSE | `SENSE-TANKS` | INCLUDED | 1 |
| CP-08 | SENSE | `SENSE-ENV` | INCLUDED | 1 |
| CP-09 | PILOT | `PILOT-COASTAL` | QUOTATION_REQUIRED | 1 |
| CP-13 | PILOT | `PILOT-PRO` | INELIGIBLE | 1 |
| CP-14 | PILOT | `PILOT-SAIL` | CONDITIONAL | 1 |
| CP-15 | DISPLAY | `DISPLAY-LARGE-CONDITIONAL` | INELIGIBLE | 1 |
| CP-16 | — | — | REQUIRED_EXTERNAL (full compatibility and safety survey) | 1 |
| CP-17 | — | — | QUOTATION_REQUIRED (vessel-specific components, labour, training, support, conformity) | 1 |

**Families physically present:** HUB, DISPLAY, WATCH, SENSE (four modules), PILOT (quotation only).
**Exclusions:** fixed turnkey COMPLETE price, PILOT-PRO retail SKU, DISPLAY-LARGE-CONDITIONAL,
SENSE-SYSTEMS in the reference configuration, autonomous/remote steering, guaranteed alert delivery,
ECDIS, NMEA 2000 certification, unlimited charts/data/coverage, a tenth family. **Safety gate:**
`PILOT_SAFETY_GATE = BLOCKED`; steering quotation-only; **COMPLETE is not a turnkey system and carries
no fixed price.** **Hardware included by default:** yes. **Fixed turnkey price:** no.

### 4.6 `FLEET` — MAREA FLEET package (`hardwareIncludedByDefault = false`)

| Line | Family | Edition | Inclusion | Qty |
|---|---|---|---|---|
| FP-01 | FLEET | `FLEET-START` | INCLUDED | 1 |
| FP-02 | FLEET | `FLEET-ENTERPRISE` | CONDITIONAL | 1 |
| FP-03 | — | — | INCLUDED (organisation onboarding, separately quoted service) | 1 |
| FP-04 | — | — | INCLUDED (device enrolment, personnel setup, data migration — services) | 1 |
| FP-08 | — | — | REQUIRED_EXTERNAL (cellular/SIM/data per connected device) | 1 |
| FP-10 | — | — | CONDITIONAL (contracted integrations and optional SLA) | 1 |

**Families physically present: NONE.** **Exclusions:** hardware in the per-vessel fee, WATCH/HUB/SENSE
hardware and subscriptions, connectivity in the subscription, standard ENTERPRISE price, invented SLA/
uptime/security certification, unlimited vessels/users/storage/API, cross-tenant access, vessel control,
a tenth family or new edition. **Safety gate:** read-only telemetry only; no command path; no hardware
by default; `NO_SLA_ESTABLISHED`.

**Bundle-level rule restated:** every bundle line above inherits the weakest evidence class of its
inputs. A bundle is `NOT_FOR_SALE`, `HYPOTHESIS_UNAPPROVED` on price and never a turnkey offer. PROTECT
counts each sensor once; SAIL/COMPLETE carry no fixed turnkey price; PILOT is never a priced bundle line.

---

## 5. Preliminary portfolio conclusions (engineering judgement, not approval)

1. **Three families are genuinely software-first** (NAV, WEATHER, FLEET) and can progress on data rights
   and software evidence without a hardware programme. They are still blocked, but by contracts and
   build work, not by tooling.
2. **Five families need proprietary hardware** (HUB, AIS, SENSE, WATCH, DISPLAY) and each carries the
   full stack: enclosure, power protection, EMC/RED, firmware update lifecycle and factory test. None of
   them can be sold from a prototype board.
3. **PILOT is not a hardware-cost problem, it is a safety-evidence problem**; no architecture choice
   changes its gate.
4. **The strongest shared-platform candidates** are the gateway compute/power/enclosure stack (HUB,
   AIS-CONNECTED, WATCH, DISPLAY), the isolated NMEA 0183 front end (HUB, SENSE-WIND), the cellular
   modem/antenna/identity stack (WATCH, FLEET edge) and the firmware-update/security architecture
   (all). Reuse is real but must not force one family's requirements onto another (D10 §4).
5. **The portfolio is not coherent as a simultaneous launch.** The dependency order in §3 and the
   bundle composition in §4 point to a staged sequence: data-rights and software evidence first, then
   one gateway, then sensing and monitoring, then display, with AIS receiver hardware last and PILOT
   not at all while the gate is closed.
