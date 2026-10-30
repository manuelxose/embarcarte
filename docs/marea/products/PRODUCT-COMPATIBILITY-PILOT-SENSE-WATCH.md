# MAREA PILOT · MAREA SENSE · MAREA WATCH — Compatibility and ecosystem contract (MC-06 / D5)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D5-COMPATIBILITY |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Date | 2026-10-30 |
| Owner function | Commercial, UX and Localization Specialist, with the PILOT integration owner (Safety and Hardware) and the WATCH service owner |
| Status | INTERNAL ONLY · NOT PUBLISHED · NOT FOR SALE · products `DEFINED` |
| Governing contract | `docs/marea/products/README.md` §16 (claim rules), §19 (cross-product authority matrix), §21 (compatibility table columns), §4, §5 |
| Binding inputs | D4 `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` (authoritative on edition contents); D1/D2/D3 product dossiers (authoritative on capability detail); `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2, §4 |
| Batch-01 counterpart | `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` (MC-05 D5) — this document extends it and never contradicts it; where a NAV/HUB/AIS row already exists, that row governs and is referenced, not restated |
| Nature | Internal pre-contractual compatibility contract. Not a catalogue, not a product page, not a certification, not an availability statement |

**These are definitions, not availability.** No row in this document is a compatibility claim. Zero rows are
`SUPPORTED`: no device, firmware version, cable, adapter, message capture or test result exists in the evidence
base for any integration below. `PILOT_SAFETY_GATE = BLOCKED`; SENSE measurement is `NOT_MEASURED`; the WATCH
service is `NOT_FOUND`; NMEA 2000 is not implemented, not licensed and not certified (`SENSE_NMEA2000 =
NOT_IMPLEMENTED`, H-04, DEC-05). A row that reads `PLANNED` or `CONDITIONAL` is a specification of intent, not
evidence that anything works.

## 1. Purpose and the governing rules

### 1.1 What this document decides

- the single matrix that states, for every desired integration among PILOT, SENSE, WATCH, HUB, NAV, AIS, WEATHER
  and FLEET, what each side requires, which direction data flows, where the local/cloud line sits, what the
  safety boundary is, what evidence exists and which gate would release the row;
- the one compatibility status vocabulary the six batch-02 documents and any future page, support script or
  quotation must use;
- the plain-language answers a buyer may be given, and the questions they must answer before compatibility can
  be confirmed;
- the prohibited directions and assertions that no document, page or support reply may introduce.

### 1.2 The governing rule (read before every other section)

1. **Unknown compatibility is stated as unknown.** It is never inferred as supported. A protocol name, a
   connector, a brand, a sibling product or an optimistic installer does not create compatibility.
2. **No product may be sold from an untested compatibility assumption.** A sale requires a published row with
   recorded test evidence, not a specification that promises to test later.
3. **Every row today is `PLANNED`, `CONDITIONAL` or `UNKNOWN`.** `SUPPORTED` requires a `DEVICE_TEST_RECORDED`
   evidence entry plus an independent reviewer. **No such entry exists for any MC-06 row.**
4. **No row is a certification.** A tested row is a statement about one configuration; it is not CE marking, not
   NMEA certification, not type approval and not a safety guarantee.
5. **No row introduces a steering command path.** PILOT mode engagement is local and inside the independently
   validated control boundary. Nothing here enables a cloud, remote or app-to-actuator steering command.
6. **Subscription isolation is a design requirement, not a behaviour claim.** No entitlement, payment failure or
   subscription lapse may disable local steering, local alarms, valid local sensing or any safety-relevant
   independent function.
7. **`SENSE` never delivers remote alerts by itself**, and **`WATCH` never steers**. Both statements are tested
   against every row in this matrix.

### 1.3 Status vocabulary (the only four values permitted)

| Status | Meaning | What it may be shown as |
| --- | --- | --- |
| `SUPPORTED` | A recorded test exists for the exact configuration (device, firmware, direction, adapter, record, reviewer) | A published compatibility statement, with its limitations |
| `PLANNED` | The intended path is defined by the dossiers and a **named milestone** will produce the evidence; nothing is tested | "Intended, pending validation" — never "works" |
| `CONDITIONAL` | The intended path is further gated by a stated external condition (right, qualification, contract, certificate) | "Conditional on <named condition>" |
| `UNKNOWN` | No assessment exists | "Not assessed; requires specialist assessment" — **never** "supported" |

Row count at issue: **31 rows — 0 `SUPPORTED`, 10 `PLANNED`, 13 `CONDITIONAL`, 8 `UNKNOWN`.**

### 1.4 The eight authority rules of README §19 (restated in substance, binding here)

| Relationship | Permitted | Prohibited |
| --- | --- | --- |
| PILOT ↔ NAV | NAV may supply route/waypoint information to a future authorised local integration once verified | NAV may never command the actuator; route data is an input, not authority |
| PILOT ↔ HUB | HUB may publish bounded instrument/nav data and read PILOT status | HUB is not the actuator controller; no unreviewed data path enables helm control |
| PILOT ↔ WATCH | WATCH may display authorised read-only PILOT status | No remote engage/disengage, no heading adjustment, no steering command |
| PILOT ↔ SENSE | Validated, calibrated measurements may be consumed after safety qualification | No generic sensor module is automatically acceptable as a steering input |
| SENSE ↔ HUB | HUB receives and publishes measurements with source, units, quality and freshness | No invented protocol compatibility |
| SENSE ↔ WATCH | WATCH consumes approved readings and sends remote notifications | SENSE never claims connectivity or push by itself |
| WATCH ↔ FLEET | FLEET may consume authorised read-only telemetry under a future contract | WATCH is not a multi-tenant fleet platform by default |
| Any ↔ Subscription | Local safety-relevant functions keep working without an active subscription | No entitlement gates local steering, local alarms or valid local sensing |

**Subscription-isolation rule (binding, README §16 rule 7).** A commercial entitlement may never disable local
steering behaviour, valid local sensing, local alarms or any other safety-relevant independent function when
payment fails or a subscription expires. This is a **design requirement of the specification, not a tested
behaviour**: no billing, entitlement or outage test exists.

## 2. The matrix — exact columns of README §21

Column order, exactly as required and not extended: **Integration | Required product | Required edition |
Required accessory | Required subscription | Data direction | Local/cloud boundary | Safety boundary | Current
evidence | Release gate.** The four-value status is carried as the leading token of the *Integration* cell so
that the column set stays exactly as fixed by the contract.

| Integration | Required product | Required edition | Required accessory | Required subscription | Data direction | Local/cloud boundary | Safety boundary | Current evidence | Release gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `I-01` `PLANNED` PILOT ← NAV route/waypoint context | PILOT + NAV | PILOT Coastal/Sail/Pro as quoted; NAV Pro (route context) | Surveyed route/GNSS interface chosen by installer; none qualified | None on the PILOT side | NAV → PILOT, read-only waypoint/route context | Local only; no route may arrive over the internet during passage | Route data is an input; it cannot engage a mode or move the actuator (README §19) | `NONE_BEYOND_AUDIT`; NAV integration untested (`P-01`, `P-10`) | MC-13-PILOT + MC-13-NAV local test record; D5 row promoted only with device/firmware evidence |
| `I-02` `PLANNED` PILOT ↔ HUB instrument/nav data and status | PILOT + HUB | PILOT quoted configuration; HUB Standard/Pro per batch-01 D4 | Surveyed data interface; adapter class `OPEN` | None | HUB → PILOT (bounded instrument/nav data); PILOT → HUB (read-only status) | Both ends local to the vessel; no cloud component | HUB is not the actuator controller; no path may enable helm control (`H-02`) | `NONE_BEYOND_AUDIT`; HUB protocol matrix unbuilt (`P-02`, `H-04`) | MC-13-HUB + MC-13-PILOT; HUB hardware and protocol freeze (`H-05`, `H-07`) |
| `I-03` `PLANNED` PILOT → WATCH read-only status ashore | PILOT + WATCH | PILOT quoted configuration; WATCH Core (Plus conditional) | None; the data path is the WATCH service | WATCH subscription **required** for any remote view | PILOT → WATCH, read-only, non-authoritative | Local capture, then cloud transport for display only | **No remote engage/disengage, no heading adjustment, no steering command**; one-way and read-only by design | `NONE_BEYOND_AUDIT`; WATCH ingestion `NOT_VERIFIED`, notification pipeline `NOT_FOUND` (`P-06`) | MC-13-PILOT + MC-13-WATCH; security review of the read-only boundary; no command channel may exist |
| `I-04` `CONDITIONAL` PILOT ← SENSE wind measurement as a Sail input | PILOT Sail + `SENSE-WIND` | PILOT Sail (`CONDITIONAL`); SENSE-WIND | Calibrated wind source qualified **as a steering input**, not merely as a measurement | None | SENSE → PILOT, read-only measurement | Local only | A generic sensor module is not automatically a steering input; the qualification is mode-specific and per vessel (README §19) | `PARTIAL_PARSER` for wind parsing only; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; `PILOT_SEA_TRIALS = NOT_PERFORMED` | Sensitivity/accuracy evidence (`H-01`, `P-05`) **and** a recorded wind-angle mode trial; both conditions, in that order |
| `I-05` `CONDITIONAL` PILOT ← compatible GNSS source | PILOT + GNSS source | PILOT quoted configuration | GNSS receiver/antenna where the vessel does not already provide one; class `OPEN` | None | GNSS → PILOT, read-only position/time | Local only | Loss of GNSS degrades to a defined degraded state with manual takeover available | `NONE_BEYOND_AUDIT`; no PPS/time-quality test exists | MC-13-PILOT with a recorded fix-loss scenario; device/firmware evidence |
| `I-06` `PLANNED` SENSE → HUB measurements with source, units, quality, freshness | SENSE + HUB | Any SENSE module; HUB Standard/Pro | Module-specific mounting/cabling; HUB adapter class `OPEN` | None | SENSE → HUB, one-way measurement publication | Local only | A measurement without units, source, calibration state and freshness is not data and must be shown invalid | `COMPONENT_UNIT_TEST_ONLY` for wind parsing (MC-02 §6.1); no device test | MC-13-SENSE + MC-13-HUB; frozen interface and adapter list (`H-04`, `P-02`) |
| `I-07` `CONDITIONAL` SENSE → HUB over NMEA 2000 | — not offered | None | — | — | — | — | — | NMEA 2000 is type stubs only; no licence, no certification (`SENSE_NMEA2000 = NOT_IMPLEMENTED`) | Blocked until DEC-05 resolves licensing **or** the family retires NMEA 2000 language |
| `I-08` `PLANNED` SENSE → WATCH approved readings and notifications | SENSE + WATCH | Any SENSE module; WATCH Core | WATCH input mapping; SENSE module as source | WATCH subscription required for notification | SENSE → WATCH reading; WATCH → customer notification | SENSE is local; WATCH is local capture plus cloud delivery | SENSE never claims connectivity or push by itself; WATCH owns the alert state model (`EVENT_OBSERVED` … `ACKNOWLEDGED`, README §20) | `NOT_FOUND` for the WATCH service; SENSE measurement `NOT_MEASURED` | MC-13-WATCH delivery tests under network loss; SENSE measurement evidence for the exact module |
| `I-09` `PLANNED` SENSE → NAV readings through a HUB | SENSE + HUB + NAV | Any SENSE module; HUB Standard/Pro; NAV Pro for live overlays | HUB as the only sanctioned path | None | SENSE → HUB → NAV, read-only | Local only | No direct SENSE-to-NAV path is specified; readings must reach NAV through HUB with source and freshness | `NONE_BEYOND_AUDIT`; batch-01 register A-02/B-01..B-08 untested | MC-13-HUB + MC-13-NAV; batch-01 rows `A-02`, `B-08` must be tested first |
| `I-10` `CONDITIONAL` SENSE → WATCH → FLEET telemetry | SENSE + WATCH + FLEET | SENSE module; WATCH Core; FLEET contract | None | WATCH subscription; FLEET contract | Read-only telemetry, upward only | Local capture, cloud aggregation under a written contract | FLEET is a separate product; WATCH is not a fleet platform by default; AIS-derived redistribution is not granted (`D-09`) | `NOT_FOUND` for FLEET ingestion (`P-09`) and for the WATCH pipeline | Written FLEET contract + tenant-isolation evidence (`P-09`, X-07) + WATCH delivery evidence |
| `I-11` `CONDITIONAL` WATCH ← HUB local vessel data (future consented relay) | WATCH + HUB | WATCH Core; HUB Standard/Pro | HUB as local source; input list `OPEN` | WATCH subscription for remote functions | HUB → WATCH, local read | Local capture; cloud only for the alert path | HUB data is context, never an actuation path; no helm influence (README §19) | `NONE_BEYOND_AUDIT`; D3 defines no *required* HUB relationship for WATCH — only a future consented relay of a bounded subset | A written WATCH service decision, a consent model and a security review, then MC-13-HUB/`WATCH` integration evidence |
| `I-12` `UNKNOWN` WATCH → HUB device/connectivity status | WATCH + HUB | — | — | — | WATCH → HUB, read-only status | — | Status display only; no control of the device through HUB | No HUB surface for WATCH status is specified in any dossier | Not assessed; would require a HUB product decision and a WATCH pipeline |
| `I-13` `UNKNOWN` WATCH ← receive-only AIS targets for a position/traffic view | WATCH + AIS | — (no WATCH edition defines an AIS surface) | — | — | AIS → WATCH | — | Receive-only, if such a surface were ever defined: not all vessels transmit AIS, not collision avoidance, the AIS disclaimer mandatory | No surface exists: D3 defines WATCH without AIS traffic; receiver absent (`H-08`, `P-03`); retention `D-09` | Not assessed. Would require a WATCH product decision, the AIS data-rights position (`D-09`), receiver hardware **and** the README §16 rule 9 disclaimer on any such surface |
| `I-14` `CONDITIONAL` WATCH → FLEET authorised read-only telemetry | WATCH + FLEET | WATCH Core; FLEET contract | None | WATCH subscription + FLEET contract | WATCH → FLEET, read-only, per-vessel | Cloud aggregation under a written contract | No customer-to-customer sharing, no tenant leakage, no redistribution of AIS-derived data | `NOT_FOUND` (`P-06`, `P-09`) | Written contract, DPIA/tenant isolation, retention policy (`D-09`, X-07) |
| `I-15` `CONDITIONAL` FLEET ← HUB telemetry | HUB + FLEET | HUB Standard/Pro; FLEET contract | None | FLEET contract | HUB → FLEET, read-only | Local capture, cloud ingestion | FLEET never commands a vessel; telemetry is operational, not safety-of-life | `NOT_FOUND` (`P-09`) | Contract + tenant isolation; MC-13-HUB telemetry export test |
| `I-16` `PLANNED` HUB → NAV vessel data (batch-01 pair, restated for completeness) | HUB + NAV | HUB Standard/Pro; NAV Pro | Local interface; adapter class `OPEN` | None | HUB → NAV, read-mostly | Local only; NAV remains usable without HUB | Read-only toward the vessel; any write path requires separate approval; no steering | `CODE_ONLY` (batch-01 `A-02`, `B-08`, `P-02`, `P-10`) | Batch-01 rows `A-02`/`B-08` tested; MC-13-HUB/NAV |
| `I-17` `PLANNED` NAV → HUB route/waypoint publication (read-mostly) | NAV + HUB | NAV Pro; HUB Standard/Pro | None | None | NAV → HUB, read-only publication | Local only | Route publication is data, not authority; HUB does not act on it | `CODE_ONLY`; no test | Batch-01 gate; must be proven non-actuating |
| `I-18` `PLANNED` AIS → HUB receive-only targets (batch-01 pair, restated) | AIS + HUB | AIS Receiver/Connected; HUB Standard/Pro | AIS antenna/splitter; receive-only output path | None | AIS → HUB, receive-only | Local only; no internet exposure, no redistribution (`D-09`) | Receive-only; target age always shown; no collision-avoidance claim | `CODE_ONLY`/`NONE` (batch-01 `B-07`, `C-04`, `P-03`) | Batch-01 gate + receiver hardware (`H-08`) |
| `I-19` `PLANNED` NAV ← HUB via separate local data layer (cross-check row) | NAV + HUB | NAV Essential/Pro; HUB Standard/Pro | None | None | HUB → NAV | Local only | NAV remains a navigational aid; no ECDIS claim; no steering | `CODE_ONLY` | Same as `I-16`; batch-01 governs |
| `I-20` `CONDITIONAL` NAV ↔ WEATHER entitlement sharing | NAV + WEATHER | NAV Pro (or as entitled); WEATHER Standard/Pro | None | WEATHER entitlement (separate licensed service) | WEATHER → NAV, licensed data | Cloud entitlement, local display | Forecasts are probabilistic; source, issue time and validity must be shown; **no double billing** once implemented | `BLOCKED` (`D-04`, `D-05`, `D-07`, `D-10`; `DEC-03`); entitlement mapping `BUILD` | Written provider terms + entitlement implementation + a two-account no-double-billing test |
| `I-21` `UNKNOWN` WEATHER → WATCH forecast context in alerts/history | WATCH + WEATHER | WATCH Core; WEATHER | None | WATCH subscription; WEATHER entitlement | WEATHER → WATCH, display context | Cloud to cloud | Forecast context is not an alert cause by itself and never justifies a safety claim | No surface is specified in any dossier; no provider rights | Not assessed — a WATCH dossier surface decision and provider rights would both be required |
| `I-22` `CONDITIONAL` PILOT → FLEET read-only operational status | PILOT + FLEET | PILOT quoted configuration; FLEET contract | None | FLEET contract | PILOT → FLEET, read-only status | Local capture, cloud read-only | No remote steering or mode command; status only; fleet use never implies unattended operation | `NOT_FOUND` (`P-06`; `PILOT_SAFETY_GATE = BLOCKED`) | FLEET contract plus PILOT safety gate closure and a read-only security review |
| `I-23` `UNKNOWN` AIS → WEATHER cross-context | AIS + WEATHER | — | — | — | — | — | — | No dossier specifies an AIS/WEATHER relationship and AIS-derived rights are not granted (`D-09`) | Not assessed; would require a product decision and a rights position |
| `I-24` `UNKNOWN` SENSE → FLEET direct path | SENSE + FLEET | — | — | — | — | — | A SENSE module has no connectivity of its own, so no direct path can exist | `NOT_FOUND` | Not assessed; SENSE reaches FLEET only through `I-10` |
| `I-25` `CONDITIONAL` PILOT ← SENSE bilge/power/environment readings for context only | PILOT + SENSE | PILOT quoted configuration; SENSE modules | Surveyed | None | SENSE → PILOT, read-only context | Local only | Context display only; never a steering input or a mode trigger; qualification is required before any control influence | `PARTIAL_PARSER`/`TARGET`; not assessed for PILOT use | Safety case review that explicitly excludes control influence, plus measurement evidence |
| `I-26` `UNKNOWN` NAV ← WATCH alert/status view on the navigation surface | NAV + WATCH | — | — | — | WATCH → NAV | — | Would be read-only status; a NAV surface for it is not specified | No surface specified; WATCH service `NOT_FOUND` | Not assessed; requires a NAV product decision and a WATCH pipeline |
| `I-27` `CONDITIONAL` WATCH ← compatible sensors/inputs beyond SENSE (input mapping) | WATCH + third-party input | WATCH Plus (conditional) | Input adapter class `OPEN` | WATCH subscription | Input → WATCH, read-only | Local capture, cloud alert | Only validated inputs; no generic "any sensor" claim | `NOT_FOUND`; WATCH-PLUS benefits unvalidated | WATCH-PLUS validation and costing; per-input compatibility evidence |
| `I-28` `CONDITIONAL` PILOT ↔ installer/service diagnostic tooling | PILOT + service tooling | PILOT quoted configuration | Documented service interface (not a customer accessory) | None | Tooling ↔ PILOT, local, authenticated | Local only; no internet exposure | Service access must be authenticated, audited and physically initiated; it must not become an operational helm command | `BLOCKED` (`H-02` unauthorised control plane; `H-09` test bench not isolated) | Security design + commissioning tooling evidence; independent review |
| `I-29` `UNKNOWN` HUB → WATCH notification source of hub events | HUB + WATCH | — | — | — | HUB → WATCH | — | Read-only event source; no control | No surface or mapping specified | Not assessed |
| `I-30` `CONDITIONAL` PILOT ↔ NAV shared passage record (read-only log exchange) | PILOT + NAV | PILOT quoted; NAV Pro | None | None | Passage record, read-only, both directions at the record level | Local exchange; account copy only if export is chosen | Records are evidence, never control; no route authority transferred | `NONE_BEYOND_AUDIT` | Data-model decision and a recorded export/import test |
| `I-31` `UNKNOWN` WATCH ← AIS-derived history retention for shore display | WATCH + AIS | — | — | — | AIS → WATCH history | Cloud retention | **Retention/redistribution of AIS-derived data is not granted** (`D-09`, `MD-24`) | `BLOCKED` (`D-09`) | Legal retention decision; until then this row must stay `UNKNOWN` and no history may be offered |

**Reading the matrix.** `PLANNED` rows describe intended end-state behaviour whose evidence is not produced;
`CONDITIONAL` rows name the extra external condition that must close before the row can ever be tested;
`UNKNOWN` rows are recorded so that nobody fills the gap by assumption. **No row may be quoted to a customer as
a compatibility statement**; only a `SUPPORTED` row may be, and none exists.

## 3. Subscription isolation across the matrix

| Scenario | Required behaviour (design requirement) | Status |
| --- | --- | --- |
| WATCH subscription expires or payment fails | Local steering (PILOT) is unaffected; local sensing and local alarms (SENSE) are unaffected; the owner loses remote notification and history only, and the app states exactly what stopped | `OPEN` — spec only; no billing/entitlement service exists (`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`) |
| WATCH connectivity is lost while the subscription is active | Events are buffered with `eventTime`/`deviceClockTime`, delivered after reconnection, and the last-known-good value is shown with its age; a stale value is never shown as current | `OPEN` — no pipeline (`WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`) |
| SENSE module has no subscription (all modules) | Full local measurement, calibration and local indication continue; no degraded mode is introduced by commercial state | `OPEN` spec |
| PILOT has no subscription (all editions) | Not applicable — PILOT carries no subscription; no firmware licence check may sit on the control path | `OPEN` spec |
| FLEET contract ends while WATCH/PILOT/HUB are owned | Read-only telemetry stops; local functions and the WATCH consumer service continue per their own entitlement | `OPEN` spec |
| Any entitlement server unreachable during a passage | Local safety-relevant functions continue; the failure is visible and explained, never silently degraded | `OPEN` spec |

## 4. Customer-facing compatibility questions and answers

The permitted answers only. Anything not in this table must be escalated, not improvised.

| Customer question | Answer permitted today | Why |
| --- | --- | --- |
| "Will PILOT work with my steering system?" | "PILOT is a surveyed, quoted installation: eligibility is decided by an installation survey, not by a list of boats. No configuration is verified today and no PILOT may be sold." | No hardware, no survey method, safety gate `BLOCKED` (H-01, H-05, P-04) |
| "Will PILOT follow a route from MAREA NAV?" | "Route/waypoint context is an intended input for a future verified local integration. NAV would never command the steering; route data is input, not authority. Nothing is verified today." | README §19; `I-01` `PLANNED` |
| "Can I engage the pilot from my phone or from WATCH?" | "No. Mode engagement is local, at the control head, supervised. No remote, app or cloud steering path exists or is planned." | README §16 rule 1; `I-03` read-only |
| "Will WATCH alert me if the boat is moving?" | "Geofence and position alerts are intended. Remote alerts depend on power, network coverage and delivery by the notification provider; immediate receipt is not guaranteed and they are not a certified distress service." | README §20; claims policy §4 |
| "Can WATCH start the engine / switch a pump / steer?" | "WATCH has no helm or steering function. Remote switching is not part of the WATCH definition; any future actuation would be a separate, safety-reviewed decision." | `W13` `NONE_BY_DESIGN`; `W12` not included |
| "Do SENSE modules send alerts to my phone?" | "No. A SENSE module measures and indicates locally. Remote alerting requires WATCH plus connectivity plus an active subscription, bought separately." | README §16 rule 6 |
| "Will SENSE work over NMEA 2000?" | "No. NMEA 2000 is not implemented, not licensed and not certified in this programme. Do not buy on an NMEA 2000 assumption." | `SENSE_NMEA2000 = NOT_IMPLEMENTED`, H-04, DEC-05 |
| "What is the accuracy of SENSE?" | "No accuracy figure, resolution or ingress rating may be stated: measurement evidence does not exist. Readings are only valid within each module's verified range and calibration once that evidence exists." | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, `SENSE_INGRESS_PROTECTION = NOT_VERIFIED` |
| "Does SENSE integrate with my HUB?" | "Integration through MAREA HUB is intended and unverified. Compatibility is per module, per firmware and per direction, published as a matrix — not a blanket promise." | `I-06` `PLANNED`; `H-04`, `P-02` |
| "Will PILOT data appear in WATCH?" | "Authorised read-only PILOT status may be displayed ashore once the read-only boundary is verified. No engage, disengage, heading change or steering command is possible." | `I-03` |
| "Will FLEET see my boat's telemetry?" | "Only through a separate, written FLEET agreement. FLEET is not included with WATCH, and WATCH is not a fleet platform." | `I-14`, `I-15`; `P-09` |
| "Do I need internet on board?" | "PILOT, SENSE and the local HUB functions are intended to work without the internet. WATCH needs mobile coverage to report ashore; the terms for that connectivity do not exist yet." | H-12; `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` |
| "Can I install it myself?" | "PILOT: no — installer-led only. SENSE: only in a documented low-risk configuration, and no validated rule exists today. WATCH: the device may be owner-installed, but the service still requires commissioning and a subscription." | No validated self-install rules exist |
| "Is any of this certified or approved?" | "No. Nothing in this programme is certified, type-approved, homologated or cleared. MAREA is a proposed brand." | X-01; claims policy §2 |

## 5. What a buyer must supply before compatibility can be confirmed

Compatibility cannot be confirmed from a brand, a boat length or a photograph. The following evidence is
required **before** any compatibility opinion, quotation or installation plan is issued. Missing items produce
`INSUFFICIENT_INFORMATION`, never an assumption.

### 5.1 The vessel survey (mandatory for PILOT and for any installed SENSE/WATCH configuration)

| Survey item | Why it is required | Required form |
| --- | --- | --- |
| Vessel type, length, displacement, make and year | Eligibility and drive sizing | Free text + category |
| Steering system type and condition (mechanical, hydraulic, tiller, wheel, dual station) | PILOT eligibility and drive selection | Description + photographs |
| Manual release / emergency steering arrangement | A steering system that cannot be manually released is not eligible | Description + test confirmation |
| Rudder or outboard feedback availability | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`; the surveyed configuration must state whether feedback exists | Description + photographs |
| Electrical system: voltage, battery capacity, charging, fusing, isolation points | Motor-power isolation and safety path | Measurements at survey |
| Mounting and access constraints (helm console, locker, cable routes, glands) | Installation scope and quotation | Photographs + plan |
| Existing equipment inventory (see §5.2) | Integration rows | Make/model/firmware list |
| Operating territory and cruising area | Support, data rights, coverage | Country/region |
| Owner expectations and intended use | Refusal boundary check (no unattended/remote expectation) | Recorded conversation |

### 5.2 Existing equipment and connectivity inventory

| Item | What must be recorded | Consequence if unknown |
| --- | --- | --- |
| Navigation application/plotter | Make, model, software version | `UNKNOWN` row; no compatibility statement |
| GNSS source(s) | Device-only, external receiver, model and firmware | `I-05` cannot be assessed |
| Instruments (wind, depth, speed, heading) | Make, model, firmware, connection family | `I-04`, `I-09` cannot be assessed |
| Network type present | None, NMEA 0183, NMEA 2000, Signal K, Wi-Fi/Ethernet, proprietary | Some rows (`I-07`) are refused outright |
| Autopilot/steering electronics present | Make, model; interaction with PILOT decided by survey | Interface conflict risk; safety review |
| AIS equipment and antenna arrangement | Receiver/transponder/none; antenna/splitter status | `I-13` cannot be assessed |
| Mobile coverage at the berth | Operator, technology, measured signal/behaviour at the actual berth | WATCH viability is `OPEN`; no "always connected" promise |
| Power at the berth / shore power | Availability and behaviour when the boat is left | WATCH power/backup assumptions |
| Existing sensors or tank senders | Type, resistance/output, condition | SENSE-TANKS/CALIBRATION scope |
| Installer/yard relationship | Who will install and give first-line support | No installer network exists; quotation impossible |

### 5.3 Questionnaire outcomes (the only four permitted results)

| Outcome | Definition | Returned when |
| --- | --- | --- |
| `ELIGIBLE_SELF_INSTALL` | A validated deterministic rule confirms a documented low-risk configuration | **Unreachable today** — no validated rule exists for any MC-06 product |
| `INSTALLER_ASSESSMENT_REQUIRED` | The configuration is plausible but outside validated rules or needs a survey | Default outcome for every enquiry today |
| `NOT_SUPPORTED` | The request needs an excluded capability or an unsupported configuration | Steering-expectation mismatch, NMEA 2000-only requirement, certified-alarm requirement, fleet-shared monitoring of a third party's boat |
| `INSUFFICIENT_INFORMATION` | Mandatory fields missing or contradictory | Any unresolved item in §5.1–§5.2 |

## 6. Unknown and blocked register — exact conditions that would promote a row

| Family | What is blocked | Exact external evidence needed | Owner function |
| --- | --- | --- | --- |
| PILOT safety gate (`H-01`, `P-04`) | Every PILOT row: `I-01`–`I-05`, `I-22`, `I-25`, `I-28`, `I-30` | Bench evidence, E-stop and motor-isolation evidence, supervised sea trials, independent review, conformity plan | Safety + engineering |
| PILOT hardware (`H-03`, `H-05`, `H-07`) | Drive/feedback/control-head definitions in every PILOT row | Frozen BOM, resolved motor-link interface, real quotes, built units | Hardware + procurement |
| PILOT control plane (`H-02`) | Any status or service interface (`I-02`, `I-28`) | Authentication, network binding policy, command audit, safety interlock | Engineering + security |
| SENSE measurement (`P-05`) | `I-04`, `I-06`, `I-08`, `I-09`, `I-25` | Calibration and field accuracy evidence per module; environmental/ingress evidence (`H-05`) | Engineering + compliance |
| NMEA 2000 (`H-04`, `DEC-05`) | `I-07` and any NMEA 2000 row anywhere | Licence + certification (membership, manufacturer/product codes, certified implementation) **or** a written decision to retire NMEA 2000 language | Company owner + product |
| HUB hardware and protocol matrix (`P-02`, `H-05`, `H-07`) | `I-02`, `I-06`, `I-09`, `I-11`, `I-12`, `I-16`–`I-19` | Frozen hardware, tested protocol matrix, bench/EMC evidence | Hardware + engineering |
| WATCH service (`P-06`) | Every WATCH row: `I-03`, `I-08`, `I-10`–`I-15`, `I-22`, `I-27`, `I-29`, `I-31` | Built ingestion, device identity/ownership proof, notification pipeline with delivery records, billing/entitlement service, mobile app | Engineering + product |
| WATCH connectivity (`H-12`) | Any WATCH promise involving coverage or delivery timing | Written MVNO/roaming terms, measured coverage at representative berths, data-cost model | Procurement + finance |
| Device identity and privacy (`X-07`) | WATCH sharing, transfer, replacement, FLEET telemetry | Threat model, DPIA, provisioning/revocation design, privacy notice | Engineering + DPO |
| AIS-derived data rights (`D-09`, `MD-24`) | `I-13` cloud display, `I-31` history | Written retention/no-redistribution decision | Product + counsel |
| FLEET platform (`P-09`) | `I-10`, `I-14`, `I-15`, `I-22` | Multi-tenant service with isolation evidence, contract, data-processing terms | Engineering + product |
| Weather rights (`D-04`, `D-05`, `D-07`, `D-10`) | `I-20`, `I-21` | Written provider terms/quotes and an entitlement implementation | Product + finance + counsel |
| Brand and seller identity (`X-01`, `X-02`) | Any customer-facing compatibility statement | Trademark clearance and verified legal identity | Company owner + counsel |

## 7. Non-claims — assertions prohibited in every batch-02 document, page and support reply

| Forbidden assertion | Classification | What would ever permit it |
| --- | --- | --- |
| "Compatible with <device>" without a `SUPPORTED` row | Prohibited | A recorded device test with firmware, direction, adapter and reviewer |
| "PILOT is compatible with <any autopilot network/brand>" | Prohibited absolutely | Never as a blanket claim; only per surveyed configuration with evidence, and never as a brand-wide claim |
| "Control/track your boat from anywhere" or any remote helm implication | Prohibited absolutely | Never: no remote steering path may exist |
| "WATCH guarantees you will be alerted", "real-time", "24/7 monitoring", "immediate notification" | Prohibited | Never as a guarantee; only the README §20 state model with delivery uncertainty stated |
| "WATCH prevents theft" or "protects your boat" | Prohibited absolutely | Never |
| "Certified alarm", "safety device", "distress service", "SOLAS", "GMDSS" | Prohibited absolutely | Never inside this programme |
| "SENSE accuracy ±X", "IP67", "marine-grade certified" before measurement | Prohibited | Measured evidence + environmental test evidence |
| "NMEA 2000 compatible" / "NMEA 2000 certified" for SENSE, PILOT or WATCH | Prohibited | `H-04`/`DEC-05` closure; no route exists today |
| "Works with any boat" / "plug and play" | Prohibited absolutely | Never: compatibility is per device, firmware, direction and installation |
| "Local functions keep working without a subscription" presented as verified behaviour | Prohibited as a verified claim | It is a **design requirement**; claim it only as designed, and only after an outage test |
| Any certification, approval, or homologation statement | Prohibited | X-01/H-06 closure; no certificate exists |
| Any statement that a WATCH or NAV workflow can steer the vessel | Prohibited absolutely | Never; the product boundary is fixed in README §16 and §19 |

## 8. Governance and change rule

- **Authority.** D4 governs edition contents; the batch-01 D5 governs NAV/HUB/AIS rows (`I-16`–`I-19` here are
  restatements for completeness and never override it); this document governs the MC-06 integrations.
- **Promotion.** A row becomes `SUPPORTED` only with device identity, firmware/software version, exact message or
  data set, adapter/cabling, a test record with date and observed result, an independent reviewer and published
  limitations. Unit tests, protocol specifications, simulation and documentation never promote a row.
- **Demotion.** A firmware or software change that invalidates a row demotes it back to `PLANNED` in the same
  revision that discovers it.
- **Change rule.** Any row, status or vocabulary change requires a new revision of this document, a re-check
  against D4 and the three dossiers, and an independent review of the evidence — not the summary.
- **Prose is not evidence.** This contract may be checked for consistency by a validator; a validator cannot
  create compatibility evidence.

## 9. Status statement

This document is a compatibility contract for products that are **completely specified and not for sale**. It
records **0 `SUPPORTED` rows**; it certifies nothing, approves no price, creates no SKU and states no
availability. MAREA PILOT is supervised steering only (`PILOT_SAFETY_GATE = BLOCKED`); MAREA SENSE measures
locally, has no connectivity of its own and no measured accuracy; MAREA WATCH is a conditional awareness service
whose ingestion, identity, notification and subscription components are `NOT_FOUND`. No workflow described here,
in any direction, allows WATCH, NAV, HUB, SENSE or a website to steer the vessel.

Related documents: `docs/marea/products/README.md` §16, §19, §20, §21;
`PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` (D4); `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` (D6);
`CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` (D7); `PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` (D9);
`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` (batch-01 D5).
