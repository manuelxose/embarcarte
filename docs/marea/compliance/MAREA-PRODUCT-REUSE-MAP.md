# MAREA — Nine-product technology reuse map

Date: 2026-10-30
Milestone: MC-02 (technology, IP, licensing and commercial-reuse audit), deliverable E-1
Status: AUDIT OUTPUT — NOT A LICENCE GRANT, NOT A CLEARANCE, NOT A SALE-READINESS STATEMENT
Seller and contractual party: EMBARCARTE. Proposed brand: MAREA. Technical origin: OPEN-MARINE (OMI).

**Standing statement for the whole document.** No product described here is legally cleared, certified,
commercially available or sale-ready. This map records where intended customer capability meets real
technology evidence, and what is still missing. It does not authorise copying, vendoring or shipping
any OPEN-MARINE code (DECISION-LOG D-002), does not grant any data or chart right, and does not create
any purchasable SKU.

---

## 1. Document control

| Field | Value |
|---|---|
| Subject revisions | EMBARCARTE branch `feature/marea-mc02-technology-audit`; OPEN-MARINE `403941b8860439115418b1786d8431284d2dae08` (`main`, clean working tree, verified 2026-10-30) |
| Evidence rule | Only repository evidence, companion audit documents and official public sources already cited by them. No supplier quote, price, certification, partner or legal conclusion is invented here |
| Author | Agent E (Commercial Product Strategist), MC-02 audit team |
| Independent review | Required before integration; reviewer must re-derive each "evidence" reference, not the summary |
| Writable scope | This file only. All companion documents are read-only evidence |
| Supersedes | Nothing. First product-level reuse map in the programme |

### 1.1 Citation codes used in this document

| Code | Document |
|---|---|
| `CI` | `docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` |
| `IP` | `docs/marea/compliance/INTELLECTUAL-PROPERTY-CHAIN.md` |
| `LP` | `docs/marea/compliance/LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` |
| `SLI` | `docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv` |
| `DR` | `docs/marea/compliance/MARINE-DATA-RIGHTS-MATRIX.csv` (row ids `MD-01`…`MD-28`) |
| `HW` | `docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` |
| `PF` | `docs/marea/COMMERCIAL-PORTFOLIO.md` |
| `WR` | `docs/marea/WEBSITE-AND-ROADMAP.md` |
| `M00` | `docs/marea/M00-DISCOVERY-BASELINE.md` |
| `M01` | `docs/marea/execution/MC-01-BASELINE.md` |
| `DL` | `docs/marea/execution/DECISION-LOG.md` |
| `A1` | `docs/marea/execution/MC-01-DELIVERY.md` |
| `AS` | `docs/marea/assets/ASSET-PIPELINE.md` |

Section references (`§`) are to numbered headings of the cited document. Where a document has no numbered
heading for the cited material (notably `PF` and `M00`), the named section or an explicit line range is
given instead. CSV rows are cited by row id. Companion tables are cited, not reproduced: this document
adds the product-level synthesis, not a second inventory.

---

## 2. Scope, method and vocabularies

### 2.1 Method

1. The nine product codes and their end-state capability sets are taken from `PF` §01–§09 and the
   taxonomy in the product-strategy skill. Product intent is never reduced to what the code can do today.
2. Technology elements are located in `CI` §3–§5 (workspace audits and capability states) and `HW` §2
   (hardware register). A product row may only cite an element that `CI`/`HW` already evidences.
3. Legal and licence positions are taken from `IP`, `LP`, `DR` and `HW` §4; none is re-litigated here.
4. Each product is scored on four independent readiness axes (§2.3). Axes are never merged into a single
   green/red verdict, and no axis can be raised by documentation.
5. Anything that cannot be evidenced is recorded `BLOCKED` or `NOT_VERIFIED` with the missing artefact named.

### 2.2 Technology-element decision statuses

| Status | Meaning in this document |
|---|---|
| `REUSE-CANDIDATE` | Engineering reuse is feasible subject only to the programme-wide rights gate (`DL` D-002, `LP` G-01/G-02) and normal integration testing. No third-party licence, supplier agreement or specialist physical evidence is outstanding for the element itself |
| `REUSE-CONDITIONAL` | Usable elements exist, but a specific permission, licence, hardware test, calibration or vessel test is outstanding. Naming the condition is mandatory |
| `LICENSE-OR-PARTNER` | Cannot be reused on open terms: a commercial licence, distributor agreement or supplier/partner agreement is required before any use |
| `BUILD` | Original implementation is the reasonable route; no reusable artefact exists or the existing one is out of scope |
| `REPLACE-OR-REMOVE` | Unusable under the intended commercial model, or a safer/cleaner alternative is needed. Must not ship as-is |
| `BLOCKED` | Material evidence or rights are missing; work may be planned but not executed or claimed |

Statuses are engineering and programme decisions. They are not legal opinions, and `REUSE-CANDIDATE`
still requires the written rights decision before a line of code moves.

### 2.3 Readiness axes

| Axis | Values used | Meaning |
|---|---|---|
| Software engineering readiness | `NOT_FOUND`, `DESIGN_ONLY`, `PROTOTYPE_UNTESTED`, `PROTOTYPE_UNIT_TESTED`, `INTEGRATION_UNVERIFIED`, `BLOCKED` | Derived from `CI` §5.1 states. `PROTOTYPE_UNTESTED` = code exists, tests exist in tree but were not executed (`CI` §6.3) |
| Legal / licence readiness | `BLOCKED_RIGHTS`, `OPEN_PROVIDER_TERMS`, `CONDITIONAL`, `NOT_APPLICABLE_SOFTWARE` | Derived from `IP` §5/§7/§8, `LP` §5/§11/§14, `DR` classifications. No value in this document means "cleared" |
| Physical / regulatory readiness | `NOT_APPLICABLE_SOFTWARE`, `NOT_EVIDENCED`, `BLOCKED` | Derived from `HW` §1.2, §2.8, §3.7, §5.2. `NOT_EVIDENCED` = no article, BOM, test or declaration exists |
| Commercial readiness | `CONCEPT`, `DEFINED` | Only two values are defensible today per `PF` Lifecycle / launch classification (lines 141–147). Nothing reaches `ENGINEERING VERIFIED` or above |

### 2.4 Limits of this document

- Lifecycle labels apply to the **product family as defined**, not to any orderable article.
- `PF` Lifecycle / launch classification (lines 141–147) defines six lifecycle values; this map never assigns `REGULATORY READY`,
  `OPERATIONS READY` or `COMMERCIALLY AVAILABLE` to any product.
- Price hypotheses in `PF` are not repeated as validated prices. Where a packaging implication depends
  on cost, it is marked OPEN.
- The MAREA trademark is **not cleared** (`M00` §Legal blockers, `IP` D-09, `AS` B5). No product-page
  branding decision can be treated as settled.

---

## 3. Cross-cutting technology reuse inventory

The element register below is the vocabulary the nine product maps draw from. It is not a second
capability inventory: each row points at the existing audit section that evidences it.

| ID | Element | Evidence | Decision status | Named condition or gate |
|---|---|---|---|---|
| E-01 | Shared marine data contract (Signal K-derived paths, SI units, quality flags, `DataPoint<T>`, clock-drift normalisation) | `CI` §3.1, §5.1 C-01 | `REUSE-CANDIDATE` | Adopt conventions and type shapes; copying code needs the D-002 rights decision. Test depth is 3 cases (`CI` §3.1) |
| E-02 | Signal K bus runtime as deployed (third-party server image + nine systemd units) | `CI` §4.1, §4.6, §5.1 C-02; `HW` §4.3 | `REUSE-CANDIDATE` | Apache-2.0 notice and digest pinning (`LP` §6, G-08); pin `v2.22.1` by digest, not tag |
| E-03 | Signal K delta publish/subscribe client patterns (HTTP POST + WebSocket) | `CI` §3.2, §3.4, §3.5 | `REUSE-CANDIDATE` | No authentication on delta POST today (`CI` §3.2) — a MAREA deployment must add a trust boundary |
| E-04 | First-party sensor publishers: NMEA 0183 wind parser, IMU fusion publisher, GPS publisher | `CI` §3.2, §5.1 C-13/C-14/C-15, §4.8; `HW` HW-05/HW-06/HW-07 | `REUSE-CONDITIONAL` | Wind and IMU have executed unit tests (5 + 3 cases, `CI` §6.1); real sensor, calibration, compass deviation and long-run tests are outstanding (`HW` HW-07, §2.5) |
| E-05 | Autopilot control engine: state machine, PID/heading/wind/track controllers, fault manager priority rules, software watchdog, HIL caps | `CI` §3.5, §5.1 C-09; `HW` §3.2 F-A12/F-A13/F-A14/F-A17 | `REUSE-CONDITIONAL` | Rights decision; control API unauthenticated (`CI` G2, `HW` F-A25); no hardware or vessel validation; no rudder feedback or takeover detection (`HW` F-A20/F-A21) |
| E-06 | Pico 2 safety-bridge firmware, per-profile policy, host CLI and host tests | `CI` §4.7, §5.1 C-11/C-12; `HW` §3.2 F-A01–F-A19 | `REUSE-CONDITIONAL` | Transport contradiction UART vs USB CDC (`CI` G3, `HW` O-05); no hardware watchdog (`HW` F-A23); no relay output (F-A24); hosting requires MicroPython toolchain |
| E-07 | AIS reception via external AIS-catcher, NMEA over UDP 10110 | `CI` §3.2, §4.4, §5.1 C-06; `LP` §7.1; `HW` HW-08 | `REPLACE-OR-REMOVE` (bundled) / `REUSE-CONDITIONAL` (separately installed) | AIS-catcher is GPL-3.0 and unpinned (`LP` G-06, LR-06; `HW` O-08). Separate-executable aggregation needs counsel confirmation plus a source-offer process (`LP` §7.2/§7.3) |
| E-08 | AIS target model, CPA/TCPA calculation, 250 ms coalesced target store, alarm wiring | `CI` §3.4, §5.1 C-06, G14 | `REUSE-CANDIDATE` | No dedicated CPA unit test; collision-risk maths is safety-adjacent and must gain tests before product use |
| E-09 | Chart engine: registry, MBTiles import, raster/S-57 conversion jobs, catalogue, quotas, packages, diagnostics | `CI` §3.6, §5.1 C-04; `HW` §2.2 G8 | `REUSE-CONDITIONAL` | Depends on unvendored GDAL/ogr2ogr/tippecanoe; missing `resources/ria-vigo-marine-mask.geojson`; chart rights per `DR`; code reuse needs D-002 |
| E-10 | Environmental/weather aggregation: provider registry, fallbacks, provenance metadata, tides, wind/wave fields | `CI` §3.6, §5.1 C-05; `DR` MD-04…MD-21 | `REUSE-CONDITIONAL` | Provider terms unresolved for most sources (`LP` §11.1, G-09); no forecast-accuracy evaluation (`CI` §5.1 C-05) |
| E-11 | Instrument dashboard patterns: datapoint store with history rings, uPlot charts, polar parser, page/panel structure | `CI` §3.4, §5.1 C-07 | `REUSE-CANDIDATE` | Quality-flag propagation into displays is absent (`CI` §5.3 C-07); numeric correctness against real sensors unverified |
| E-12 | Angular navigation UI application (routes, chart page, MapLibre engine, resources/GPX, alarms, playback, service worker, IndexedDB) | `CI` §3.4, §5.1 C-03 | `REUSE-CONDITIONAL` | Whole-application adoption decision, not module import (`M01` §7.2); no SSR/SEO layer; 347-warning lint ceiling; e2e fully mocked |
| E-13 | Simulation platform: scenario CRUD, runs, single-use arm token, lease, SSE, SQLite persistence, reports | `CI` §3.3, §5.1 C-10 | `REUSE-CANDIDATE` (internal test harness only) | Bench isolation defaults point at production ports (`CI` G1); assertions stored but never evaluated (`CI` G11) |
| E-14 | `marine-tile-server` standalone MBTiles server | `CI` §3.7, §5.1 C-16 | `REPLACE-OR-REMOVE` | Orphan with no tests, no consumer, and a stray `ISC` licence declaration (`IP` R-IP-01) |
| E-15 | Deployment assets: bootstrap/migration scripts, systemd units, DHCP probe, status probes | `CI` §4.3, §4.6, G7 | `REUSE-CONDITIONAL` | Stale `omi-test-bench.service`; AIS binary untracked (`CI` N-07); service/user model must be re-authored for a shipped appliance |
| E-16 | NMEA 2000 / CAN ingestion | `CI` §5.1 C-17; `HW` HW-09 | `BLOCKED` | Type declarations only; no decoder, no PGN handling, no CAN transport; NMEA 2000 licence and product certification prerequisite (`HW` §4.2, O-09) |
| E-17 | Remote monitoring uplink, alert delivery, geofence, multi-user shore access | `CI` §5.1 C-08 (NOT_FOUND) | `BUILD` | No code exists in either repository; `CI` N-10 |
| E-18 | Multi-tenant fleet/organisation SaaS (tenants, RBAC, audit, reporting, SLA) | none in either repository; `M01` §5.3 | `BUILD` | No organisation/tenant model, no audit log, no B2B roles (`M01` §2.2) |
| E-19 | Subscription, entitlement and recurring billing | none; `M01` §2.2, §5.3 | `BUILD` | Checkout is `Σ unit×qty` with no VAT, shipping, invoice numbering or subscription billing (`M01` §2.2) |
| E-20 | Device registration, serial ownership, warranty registration | none; `M01` §5.3 | `BUILD` | Current `products` table has no editions, serials, lifecycle or entitlements |
| E-21 | Authentication/authorisation for onboard services | absent on every OMI service (`CI` G9, `HW` F-A25) | `BUILD` | Blocks any network-exposed HUB/PILOT deployment; CRA-relevant (`HW` §5.4 C-08) |
| E-22 | Licensed chart supply (S-63/oeSENC exchange sets, cell permits, OEM identity) | `DR` MD-08, MD-27; `LP` §11.1 | `LICENSE-OR-PARTNER` | `BLOCKED` — no distributor/OEM agreement in evidence; decryption and DRM bypass explicitly out of scope (`CI` §3.6) |
| E-23 | Commercial weather API plans and licensed redistributable forecast products | `DR` MD-15, MD-20; `LP` §11.1 | `LICENSE-OR-PARTNER` | Open-Meteo free tier is non-commercial (`DR` MD-15); OpenWeatherMap requires a paid plan (`DR` MD-20); both `LEGAL_REVIEW_REQUIRED` |
| E-24 | Navigational rendering engine and chart processing pipeline | `CI` §3.4, §3.6 | `REUSE-CONDITIONAL` | Only one implementation exists; a second implementation would duplicate navigation rendering and requires a documented reason (see architecture document) |

---

## 4. Product reuse maps

Each product section follows the same 15-field structure so that a reviewer can check field-by-field
against `CI`, `HW`, `DR` and `LP`. Field values are evidence statements, not marketing copy.

### 4.1 MAREA NAV (marine navigation application)

Rollup: lifecycle `DEFINED` / software `PROTOTYPE_UNTESTED` / legal `BLOCKED_RIGHTS` + `OPEN_PROVIDER_TERMS` /
physical `NOT_APPLICABLE_SOFTWARE` (CRA potentially applicable, `HW` §5.2) / commercial `DEFINED`, not sellable.

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | Unified recreational navigation on phone/tablet/desktop with licensed charts, GNSS, waypoints, passages, vessel instruments, AIS overlay with CPA/TCPA, forecast layers, tides/currents/depth context, safety alerts, history and legally supported offline regions (`PF` §01). End-state, not reduced |
| 2 | Reusable OPEN-MARINE modules | Chart engine `E-09` (`CI` §3.6); chart/environment consumption and rendering `E-12` (`CI` §3.4); AIS analysis `E-08`; instruments `E-11`; data contract `E-01`; Signal K client `E-03` |
| 3 | Existing EMBARCARTE commercial infrastructure | Typed localized route registry, SEO contract, server-authoritative catalogue, auth with two roles, optional Stripe Checkout, admin back office (`M01` §2, §3). Missing: subscriptions, entitlements, quote entity, lifecycle/readiness fields, product content model (`M01` §5.3) |
| 4 | Confirmed technical functionality | Chart import/catalogue/tile code paths, Signal K WebSocket client with REST seed, AIS target store with CPA/TCPA and alarm wiring, datapoint store with history, polar parser (`CI` §5.1 C-03/C-04/C-06/C-07). All states are `IMPLEMENTED_NOT_FULLY_TESTED`; TypeScript tests were not executed (`CI` §6.3) |
| 5 | Partial or simulated functionality | Rendering, gestures, accessibility and performance unverified; e2e covers only mocked HTTP routes (`CI` §3.4, §6.4); S-57 conversion depends on unvendored GDAL/ogr2ogr/tippecanoe (`CI` G8); offline chart download conflicts with the OSM tile policy (`DR` MD-02, `LP` G-11) |
| 6 | Required integration work | Decide the application-shell boundary (`E-12` adoption vs a MAREA-built shell on the EMBARCARTE Angular baseline); integrate chart engine behind its HTTP contract; entitlements for chart/weather rights; account→device session model; ES/EN product copy; update channel |
| 7 | Required new development | Passage/route management and export of own route data on cancellation (`PF` §01); offline-region management with provenance; GNSS-loss, stale-AIS and datum-status UX; ECDIS non-claim and provenance surfaces; subscription gating that cannot affect navigation itself |
| 8 | External dependencies | Signal K server (`E-02`); licensed chart supply (`E-22`); tile/basemap provider or self-hosting (`DR` MD-01/MD-02); GNSS hardware supplied by the customer (`PF` §01 excludes it) |
| 9 | Licensing conditions | OPEN-MARINE rights decision before any code reuse (`IP` D-01–D-03, `DL` D-002); chart data under `LICENSE-OR-PARTNER` (`DR` MD-08/MD-27, `LP` §11.1 `BLOCKED`); OSM/OpenSeaMap tile policy limits offline use (`DR` MD-02/MD-03); Apache-2.0 notices for Signal K and third-party bundles (`LP` G-03) |
| 10 | Hardware obligations | None for the software SKU; no CE-marking act identified for a pure software supply (`HW` §5.4 C-01). CRA classification is `POTENTIALLY_APPLICABLE` (`HW` §5.2) |
| 11 | Required data rights | Licensed charts; weather/tide data only where terms permit (`DR` MD-15/MD-19/MD-20); own-vessel instrument data permitted (`DR` MD-25 `PERMITTED`); no redistribution of provider data (`LP` §11.2) |
| 12 | Safety obligations | No official ENC or ECDIS claim (`CI` §3.6 and the chart-engine README:185–187 cited there); no collision-avoidance claim from AIS (`HW` §4.6 rule 4); accurate offline/stale/freshness status; datum and provenance disclosure (`PF` §01 validation list) |
| 13 | Commercial packaging implications | NAV Essential/Pro subscription with the inclusions/exclusions stated per edition (`PF` §01); WEATHER entitlement sharing without double billing (`PF` §09); price hypotheses EUR 99/149 per year are unapproved (`PF` §01; `PF` lines 123–127); cancellation must preserve exportable own route data |
| 14 | Verification requirements | MC-13-NAV gate (`WR` §6); execute the unexecuted TypeScript suites (`CI` N-01); real chart conversion on real files; add CPA unit tests (`CI` G14); route/passage correctness on real GNSS tracks; provider-terms audit passed before any "licensed charts" claim |
| 15 | Recommended implementation boundary | NAV is a presentation and planning application plus a local data consumer. It must not become the chart-data redistributor, the vessel bus authority or a control path. Chart processing stays behind the chart-engine service boundary; execution commands belong to PILOT (architecture document §4/§7) |

Decision register — MAREA NAV:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| Data contract shapes and Signal K client patterns | `REUSE-CANDIDATE` | `CI` §3.1, §3.2 | D-002 rights decision; contract test depth |
| Chart engine as a service boundary | `REUSE-CONDITIONAL` | `CI` §3.6, G8 | GDAL/tippecanoe pinning; mask asset; D-002 |
| Angular navigation UI adoption | `REUSE-CONDITIONAL` | `CI` §3.4; `M01` §7.2 | Whole-app adoption decision; SSR/SEO position; licence |
| AIS CPA/TCPA calculation | `REUSE-CANDIDATE` | `CI` §3.4, G14 | Unit tests for `calculateCpa` before product use |
| Licensed chart supply | `LICENSE-OR-PARTNER` | `DR` MD-08/MD-27, `LP` §11.1 | Distributor/OEM agreement; end-user EULA |
| Basemap tiles for hosted/offline use | `LICENSE-OR-PARTNER` | `DR` MD-02, `LP` G-11 | Self-hosted or licensed tile provider decision |
| Subscription/entitlement layer | `BUILD` | `M01` §2.2, §5.3 | MC-11A design; billing provider decision |
| Chart data redistribution (any form) | `BLOCKED` | `DR` MD-08, `LP` §11.2 | Provider permission; legal review |

### 4.2 MAREA HUB (onboard data gateway/connectivity appliance)

Rollup: lifecycle `DEFINED` / software `PROTOTYPE_UNTESTED` / legal `BLOCKED_RIGHTS` + `OPEN_PROVIDER_TERMS` /
physical `NOT_EVIDENCED` / commercial `DEFINED`, not sellable.
Applicability (`HW` §5.2): CE `CA`, EMC `POT`, RED `POT`, GPSR `CA`, RoHS `CA`, WEEE `CA`, CRA `CA`, MED `NAE`.

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | Onboard appliance integrating supported GPS, NMEA/Signal K/instruments, AIS, wind, battery and sensor data, publishing a local vessel data interface, diagnostics, network access and appropriately bounded local automation (`PF` §02) |
| 2 | Reusable OPEN-MARINE modules | Signal K runtime and systemd service set `E-02` (`CI` §4.1, §4.6); sensor publishers `E-04`; delta publisher pattern `E-03`; deployment scripts `E-15`; simulation bench `E-13` as factory/bench test tooling |
| 3 | Existing EMBARCARTE commercial infrastructure | Catalogue/order/admin/auth foundation (`M01` §2, §3). Missing for an appliance: serial/device registration, RMA and warranty entities, compatibility configurator, quote flow, hardware stock model (`M01` §5.3) |
| 4 | Confirmed technical functionality | Bus composition works as deployment glue: third-party Signal K container, nine systemd units, Python publishers, HTTP/WS delta clients (`CI` §5.1 C-02 `EXTERNAL_DEPENDENCY`). Executed tests establish only NMEA 0183 wind parsing and IMU fusion unit behaviour (`CI` §6.1) |
| 5 | Partial or simulated functionality | The TypeScript sensor gateway is a skeleton with type-only adapters and a stub runtime (`CI` §3.2, G5); NMEA 2000 and CAN ingestion do not exist (`CI` C-17); AIS binary is untracked and two incompatible AIS designs coexist (`CI` G6) |
| 6 | Required integration work | Choose and freeze the protocol set actually supported (NMEA 0183 serial/USB, Signal K, Wi-Fi/Ethernet); implement adapters that are currently interfaces; local service supervision, watchdog and recovery; configuration UI; firmware/software update path; compatibility matrix per device model and read/write operation (`PF` §02) |
| 7 | Required new development | Authentication and authorisation for every local service (`E-21`); diagnostics with device inventory; signed update mechanism; bounded local automation rules that cannot reach steering; factory test fixture and serialisation (`HW` §2.8 layer 2) |
| 8 | External dependencies | Signal K server (`E-02`); MicroPython toolchain only if a microcontroller is included; the customer's existing instruments; component suppliers (no BOM exists, `HW` O-02) |
| 9 | Licensing conditions | OPEN-MARINE rights; Apache-2.0 notice retention for Signal K and notices for the 1,034-row inventory (`LP` §6.4, G-03); GPL exposure only if AIS-catcher is bundled (`LP` §7, `HW` R-04); container image SBOM and multi-stage build still owed (`LP` G-07) |
| 10 | Hardware obligations | BOM with manufacturer part numbers and revisions; EMC or RED route depending on radio inclusion; GPSR safety case and technical documentation; RoHS declarations; WEEE producer registration; CRA secure-by-default and vulnerability handling; EU declaration of conformity (`HW` §5.5). No article, enclosure, harness or bench log exists (`HW` §2.8) |
| 11 | Required data rights | Own-vessel instrument data permitted (`DR` MD-25 `PERMITTED`); Signal K runtime `PERMITTED` (`DR` MD-23); AIS reception `LEGAL_REVIEW_REQUIRED` (`DR` MD-24); no third-party redistribution of onboard data without consent |
| 12 | Safety obligations | No NMEA 2000 certification claim without NMEA licence and certification (`HW` §4.2, O-09); do not describe sentence parsing as NMEA 0183 conformance (`HW` R-03); bounded automation must have no steering path (`PF` §02); LAN trust model must be replaced before sale (`CI` G9) |
| 13 | Commercial packaging implications | HUB Standard/Pro editions with a frozen SKU/port set after hardware design (`PF` §02); price hypotheses EUR 349/499 subject to BOM and conformity; assisted compatibility configurator plus installer-led quote; self-install only for permitted low-risk configurations |
| 14 | Verification requirements | MC-13-HUB gate (`WR` §6); protocol/device matrix evidence; physical electrical, EMC and thermal evidence; repeated power-loss and recovery tests; `HW` §3.5-style gate discipline applied to the appliance (no equivalent gate exists yet) |
| 15 | Recommended implementation boundary | HUB is the vessel data gateway and service host, never the steering controller. It publishes a local contract (Signal K paths) and consumes external devices read-mostly; any write operation toward instruments must be explicitly listed and bounded (architecture document §4.3/§6) |

Decision register — MAREA HUB:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| Signal K runtime + systemd composition | `REUSE-CANDIDATE` | `CI` §4.1, §4.6 | Digest pinning; notice bundle; product support position |
| Wind/IMU/GPS publishers | `REUSE-CONDITIONAL` | `CI` C-13/C-14/C-15 | Real sensor + calibration tests; packaging/pinning |
| TypeScript adapter framework | `REPLACE-OR-REMOVE` | `CI` §3.2, G5 | Either implement adapters properly or delete the workspace from the product path |
| NMEA 2000 / CAN support | `BLOCKED` | `CI` C-17; `HW` HW-09, §4.2 | NMEA licence, certification plan, implementation |
| Local service authentication | `BUILD` | `CI` G9; `HW` F-A25 | Trust-model design; CRA-readiness input |
| AIS-catcher inside the appliance | `REPLACE-OR-REMOVE` | `LP` §7.1, G-06/014 | GPL compliance decision or replacement decoder |
| Device registration and RMA | `BUILD` | `M01` §5.3 | MC-11A/MC-11B design |
| Hardware design freeze | `BLOCKED` | `HW` §2.8, O-02 | BOM, schematics, harness, enclosure, power architecture |

### 4.3 MAREA AIS (receive-only traffic awareness)

Rollup: lifecycle `DEFINED` / software `PROTOTYPE_UNTESTED` / legal `BLOCKED_RIGHTS` + `OPEN_PROVIDER_TERMS` /
physical `NOT_EVIDENCED` / commercial `DEFINED`, not sellable.
Applicability (`HW` §5.2): CE `CA`, EMC `POT`, RED `CA`, GPSR `CA`, RoHS `CA`, WEEE `CA`, CRA `CA`, MED `NAE`.

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | **Receive-only** commercial AIS package: compatible dual-channel reception if verified by hardware design, ship identification, target histories, CPA/TCPA and alerts, local networking, NAV/HUB integration (`PF` §03). Transmission, DSC and collision avoidance are excluded (`PF` §03, which also excludes transmission, DSC and collision avoidance) |
| 2 | Reusable OPEN-MARINE modules | AIS analysis `E-08` (`CI` §3.4); NMEA-over-UDP ingestion pattern and process supervision `E-07` (`CI` §3.2); Signal K publication `E-03` |
| 3 | Existing EMBARCARTE commercial infrastructure | Catalogue and order flow usable for a device SKU; missing serial ownership, firmware update distribution, RF/regulatory evidence registers (`M01` §5.3) |
| 4 | Confirmed technical functionality | Target model with MMSI class inference, CPA/TCPA vectors, coalesced target store with expiry and tracks, alarm wiring (`CI` §5.1 C-06). Reception itself is an external binary; no AIS decoder exists in OMI code (`HW` §4.1) |
| 5 | Partial or simulated functionality | No dedicated CPA unit test (`CI` G14); no radio reception evidence; radio hardware is an unidentified generic RTL-SDR dongle (`HW` HW-08); two unreconciled AIS acquisition designs (`CI` G6); dual-channel reception unverified |
| 6 | Required integration work | Freeze the receiver hardware and RF front end; single supported acquisition path; UDP/NMEA plumbing into the local bus; device identity and diagnostics; install/antenna guidance; NAV/HUB target contract |
| 7 | Required new development | Receiver integration service (start-up supervision, failure and stale-target states), target-quality flags, alert throttling, device configuration surface; packaging and antenna accessory definitions |
| 8 | External dependencies | RTL-SDR-class receiver hardware and antenna/splitter decision (`PF` §03); AIS-catcher or a replacement decoder (`E-07`); local bus (`E-02`) |
| 9 | Licensing conditions | AIS-catcher GPL-3.0 requires either separate-process aggregation with source-offer obligations or replacement (`LP` §7.1–§7.3, LR-06; `HW` R-04). AIS reception data rights are `LEGAL_REVIEW_REQUIRED` (`DR` MD-24); no redistribution of target data |
| 10 | Hardware obligations | RED conformity as a radio receiver, EMC via RED, GPSR, RoHS, WEEE, CRA; RF test evidence and antenna requirements; source-offer process if AIS-catcher ships (`HW` §5.5, O-08/O-14) |
| 11 | Required data rights | Received AIS broadcast: local use evidenced as `LEGAL_REVIEW_REQUIRED` for MAREA (`DR` MD-24); storage and any redistribution require review; no third-party enrichment without terms (`DR` MD-21 is unrelated imagery, not AIS) |
| 12 | Safety obligations | Receive-only at all times; no "transponder", "type approved", "collision avoidance" or "certified" claim (`HW` §4.6 rules 3–4); stale-target and coverage-limit disclosure; alerts must not imply guaranteed detection of unequipped targets (`PF` §03) |
| 13 | Commercial packaging implications | AIS Receiver / AIS Connected editions (`PF` §03); antenna and splitter must be explicitly included or excluded before any price is quoted; EUR 249/399 are hypotheses, and below-market comparison is not margin validation (`PF` §03) |
| 14 | Verification requirements | MC-13-AIS gate (`WR` §6); RF/regulatory conformity route; sensitivity and dual-channel reception measurements; stale/failure state tests; positioning and alert usability tests; executed CPA tests |
| 15 | Recommended implementation boundary | AIS is a sensor product feeding the local bus. Decoding and reception stay outside the navigation renderer; the target contract is one-way into the vessel data layer, and no AIS output may ever be presented as collision avoidance (architecture document §10) |

Decision register — MAREA AIS:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| AIS target/CPA analysis | `REUSE-CANDIDATE` | `CI` §3.4, G14 | CPA unit tests; alert-tuning evidence |
| AIS-catcher bundled in appliance | `REPLACE-OR-REMOVE` | `LP` §7.1; `HW` HW-08 | Licensing decision or permissive decoder |
| AIS-catcher as separately installed third-party tool | `REUSE-CONDITIONAL` | `LP` §7.3 | Written counsel confirmation; source-offer process |
| Receiver hardware and RF front end | `BLOCKED` | `HW` HW-08, §2.6 | Identified receiver, RF measurements, antenna design |
| Dual-channel reception claim | `BLOCKED` | `PF` §03 ("if verified by hardware design") | Documented hardware verification |
| AIS data redistribution or enrichment | `BLOCKED` | `DR` MD-24 | Provider/legal review |

### 4.4 MAREA PILOT (supervised steering control)

Rollup: lifecycle `DEFINED` / software `PROTOTYPE_UNIT_TESTED` (engine and firmware policy) with
`SIMULATED_ONLY` actuation / legal `BLOCKED_RIGHTS` / physical `BLOCKED` (`HW` §3.7) / commercial `DEFINED`,
not sellable. **The PILOT commercialisation safety gate is `BLOCKED` (`HW` §3.7).**

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | Supervised compatible-vessel autopilot: heading hold, verified wind steering, route following, physical control head, local handover/override, feedback, alerts and diagnostics (`PF` §04). Never internet-remote unattended control (`PF` §04; `PF` product-system bullet on PILOT, line 15) |
| 2 | Reusable OPEN-MARINE modules | Control engine and safety evaluator `E-05` (`CI` §3.5, 54 test cases in tree); Pico 2 safety policy and host tests `E-06` (`CI` §4.7); state machine and latched faults (`HW` §3.2); HIL harness (`CI` §3.5) |
| 3 | Existing EMBARCARTE commercial infrastructure | Installer-led quote, survey and commissioning flows do not exist yet; the contact form is the only enquiry entity (`M01` §5.3). No installer, partner or B2B role exists (`M01` §2.2) |
| 4 | Confirmed technical functionality | Fault taxonomy with explicit priority (e-stop > overcurrent > low battery > heading loss > mode sensor loss), latched faults, software watchdog, per-profile drive ceilings, heartbeat cut, HIL caps, serial frame parsing (`CI` §3.5; `HW` F-A01–F-A19). 15 host-side firmware policy tests and the 54 engine cases establish logic, not hardware |
| 5 | Partial or simulated functionality | Actuation is `SIMULATED_ONLY` (`CI` C-11): no motor motion, no E-stop electrical test, no rudder feedback, no end-stop enforcement, no hardware watchdog, no relay/contactor line, no clutch/takeover detection (`HW` F-A20/F-A21/F-A23/F-A24). Motor link transport is contradictory UART vs USB CDC (`CI` G3). Control API is unauthenticated and binds `0.0.0.0` (`CI` G2, `HW` F-A25) |
| 6 | Required integration work | Resolve the physical link; add hardware watchdog and relay/power-cut; dual-channel or formally risk-accepted E-stop supervision; rudder position feedback; compass calibration and deviation; authenticated control plane; mode-transition and manual-takeover handshake (`HW` §3.5 G1–G9) |
| 7 | Required new development | Rudder/end-stop sensor integration and control loop; takeover detection; signed firmware with version reporting; commissioning and sea-trial tooling with recorded evidence; installer procedure and training material |
| 8 | External dependencies | Actuator/drive with verified ratings (`HW` HW-04); steering mechanics; competent marine engineer and vessel access (`HW` O-12); accredited EMC laboratory (`HW` §5.7) |
| 9 | Licensing conditions | OPEN-MARINE rights (engine and firmware), including firmware redistribution into programmed boards; MicroPython MIT and rp2 notices (`LP` §9); no NMEA 2000 path may be added to solve integration without the NMEA licence and certification decision (`HW` O-09) |
| 10 | Hardware obligations | Frozen BOM/schematics/harness/enclosure; EMC for the 20 kHz motor drive; GPSR safety case with functional-safety argument; RoHS; WEEE; CRA; EU DoC; product liability and insurance position (`HW` §5.5, §5.7) |
| 11 | Required data rights | Own-vessel data (`DR` MD-25), plus VHF/AIS inputs treated as receive-only; no provider data redistribution. No data-rights innovation is required for PILOT itself |
| 12 | Safety obligations | Physical E-stop and independent failure boundaries; local manual handover; no unattended remote steering; documented operator responsibility and limits; sea-trial and bench evidence before any performance claim; unit tests and simulation are explicitly not sale-readiness evidence (`HW` §3.7 rule) |
| 13 | Commercial packaging implications | PILOT Coastal/Sail/vessel-specific Pro; installer-led survey, commissioning, supervised sea trials, training and maintenance plan (`PF` §04). "From EUR 1,290" only if the delivered configuration is real; otherwise a vessel-specific inclusive quote; actuator, drive, sensor and installation must be expressly included or excluded (`PF` §04; `PF` lines 123–127). No turnkey claims |
| 14 | Verification requirements | `HW` §3.5 gates G1–G9 and `HW` §3.6 mode-by-mode sea trials; MC-13-PILOT (`WR` §6); bench/commissioning logs with instrumented timing; independent marine-engineering review; conformity assessment |
| 15 | Recommended implementation boundary | Safety-critical control is a physically separate layer with its own power cut, watchdog, manual override and local authority. The commercial platform and WATCH may never issue steering commands; PILOT accepts commands only from a local, authenticated control surface inside the vessel boundary (architecture document §4.4/§6) |

Decision register — MAREA PILOT:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| Engine control/safety logic (state machine, fault manager, controllers) | `REUSE-CONDITIONAL` | `CI` §3.5, C-09; `HW` F-A12–F-A14 | D-002 rights; authenticated control plane; vessel validation |
| Pico 2 firmware and motor policy | `REUSE-CONDITIONAL` | `CI` §4.7, C-12; `HW` F-A19 | Transport resolution; on-device tests; hardware watchdog; relay line |
| HIL bench and simulation harness | `REUSE-CANDIDATE` (internal) | `CI` §3.3, §3.5 | Bench isolation fix (`CI` G1) |
| Physical actuation and E-stop architecture | `BLOCKED` | `HW` F-A05, F-A20, F-A23, F-A24, §3.7 | G1/G2 evidence: frozen design, measured fail-safe |
| Sea-trial and conformity evidence | `BLOCKED` | `HW` §3.6, §3.7, O-12 | Recorded trials; conformity assessment |
| Alternative: NMEA 2000-based drive integration | `BLOCKED` | `CI` C-17; `HW` O-09 | Licence, certification, implementation |
| Turnkey price or performance claim | `BLOCKED` | `PF` §04; `PF` lines 123–127; `HW` §3.7 | Validated BOM and inclusive quote; sea-trial evidence |

### 4.5 MAREA SENSE (sensors and monitoring)

Rollup: lifecycle `DEFINED` / software `PROTOTYPE_UNIT_TESTED` (wind, IMU) with `PROTOTYPE_UNTESTED` elsewhere /
legal `BLOCKED_RIGHTS` / physical `NOT_EVIDENCED` / commercial `DEFINED`, not sellable.
Applicability (`HW` §5.2): CE `CA`, EMC `POT`, RED `POT`, GPSR `CA`, RoHS `CA`, WEEE `CA`, CRA `POT`, MED `NAE`.

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | Coordinated marine sensor family for wind, temperature, battery, tank, bilge and environmental inputs plus compatible depth/level integration (`PF` §05), with specified calibration, accuracy envelope, voltage and maintenance |
| 2 | Reusable OPEN-MARINE modules | Wind NMEA 0183 parser `E-04` (`CI` C-13, 5 executed tests); IMU fusion publisher (`CI` C-14, 3 executed tests); GPS publisher (`CI` C-15, untested); I2C/USB serial integration patterns (`HW` HW-05/HW-06/HW-07) |
| 3 | Existing EMBARCARTE commercial infrastructure | Single-SKU catalogue cannot express individual modules plus kits; no kit/bundle SKU model, no calibration or warranty record (`M01` §2.2, §5.3) |
| 4 | Confirmed technical functionality | NMEA 0183 MWV/MWD parsing with checksum rejection and unit conversion; complementary-filter heading/attitude with stationary handling; both executed and passing at unit level (`CI` §6.1). GPS ingestion and stationary filtering exist but are untested (`CI` C-15) |
| 5 | Partial or simulated functionality | No real sensor was exercised; no calibration, no compass deviation table anywhere (`HW` HW-07); NMEA 2000 wind and depth not implemented (`CI` C-17); depth/level integration has no evidenced interface; no ingress, thermal or galvanic evidence |
| 6 | Required integration work | Freeze the measured-signal list per module; implement any TypeScript adapters actually needed; device identity and calibration storage; quality/freshness propagation into displays (`CI` §5.3 C-07); bus integration through HUB/Signal K |
| 7 | Required new development | Sensor modules and their firmware (hardware does not exist); calibration procedures and records; battery/tank/bilge measurement implementations; alarm semantics for each measured signal; kit packaging |
| 8 | External dependencies | Sensor suppliers and BOM (none exists, `HW` O-02); `icm20948` Python package and compatible HAT (design licence to check, `HW` §2.4); HUB or WATCH to aggregate |
| 9 | Licensing conditions | OPEN-MARINE rights for publisher code; permissive Python dependencies with notice obligations and missing hash pinning (`LP` G-16, `HW` R-09); HAT hardware design licence if MAREA manufactures a derivative (`HW` R-12) |
| 10 | Hardware obligations | EMC or RED depending on connectivity; GPSR; RoHS; WEEE; CRA if digital elements; ingress/accuracy/calibration evidence; material declarations; IP rating evidence (`HW` §5.5) |
| 11 | Required data rights | Own-vessel sensor data permitted (`DR` MD-25); no third-party data dependency in the base product; any provider-sourced environmental value must follow `DR` rules before display |
| 12 | Safety obligations | Bilge/battery alerts must not be represented as safety-certified alarms (`PF` §05 excludes certification); accuracy envelope and failure alerts must be published; measurement must not be presented as observation-grade where uncalibrated |
| 13 | Commercial packaging implications | Individual modules and SENSE Essentials/Sail/Systems kits need independent price/cost sheets (`PF` §05); EUR 99 module hypothesis unapproved; HUB/WATCH must be explicitly included or excluded in the SKU (`PF` §05) |
| 14 | Verification requirements | MC-13-SENSE gate (`WR` §6); calibration records; accuracy tests against reference instruments; ingress and thermal tests; field replacement and failure-alert tests; real hardware pytest coverage for the publishers (`CI` N-03) |
| 15 | Recommended implementation boundary | SENSE modules measure and publish through HUB/WATCH; they never bypass the bus or drive actuators. Measurement, calibration record and alarm thresholds live with the module; presentation lives in applications (architecture document §4.3) |

Decision register — MAREA SENSE:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| Wind NMEA 0183 parser | `REUSE-CONDITIONAL` | `CI` C-13, §6.1 | Real serial sensor test; long-run stability |
| IMU fusion publisher | `REUSE-CONDITIONAL` | `CI` C-14; `HW` HW-07 | Compass calibration/deviation; magnetic-disturbance tests |
| GPS publisher | `REUSE-CONDITIONAL` | `CI` C-15, G14 | Test file; fix-quality and filtering tests |
| Additional sensor modules (battery/tank/bilge/depth) | `BUILD` | none in `CI` §5.1 | Hardware design, BOM, firmware |
| NMEA 2000 depth/level interface | `BLOCKED` | `CI` C-17; `HW` O-09 | Licence/certification decision |
| Kit/bundle SKU model | `BUILD` | `M01` §2.2 | MC-05B/MC-10A commerce data model |

### 4.6 MAREA WATCH (shore/remote alerts service)

Rollup: lifecycle `DEFINED` / software `NOT_FOUND` for the service function / legal `BLOCKED_RIGHTS` /
physical `NOT_EVIDENCED` / commercial `DEFINED`, not sellable.
Applicability (`HW` §5.2): CE `CA`, EMC `POT`, RED `CA`, GPSR `CA`, RoHS `CA`, WEEE `CA`, CRA `CA`, MED `NAE`.

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | Remote boat-monitoring kit: position and geofence, battery/bilge/events, alerts, multi-user access, history and connectivity status with declared coverage and battery fallbacks (`PF` §06). Distinct from HUB's local gateway and from remote helm control (`PF` §06) |
| 2 | Reusable OPEN-MARINE modules | Only data-contract conventions `E-01` and, at most, publisher patterns `E-03`. The remote-monitoring function is absent: `CI` C-08 is `NOT_FOUND` |
| 3 | Existing EMBARCARTE commercial infrastructure | Account/session model, auth with two roles and email-based login are reusable foundations (`M01` §3); missing multi-user/organisation sharing, notification delivery, device ownership, subscription billing and privacy/consent flows (`M01` §5.3) |
| 4 | Confirmed technical functionality | None for the service: no telemetry uplink, no authentication on the device side, no alert delivery exists (`CI` C-08, N-10). Only LAN browser access to local diagnostic pages exists |
| 5 | Partial or simulated functionality | Not applicable — there is nothing to characterise as partial. Any monitoring claim today would be unsupported |
| 6 | Required integration work | Define the uplink contract (device → cloud), device identity and pairing, consent and data-minimisation, alert rules and delivery channels, retention policy, account linking |
| 7 | Required new development | Entire service: ingestion, time-series storage, geofence engine, notification pipeline with deliverability measurement, multi-user sharing, history views, device firmware/agent, subscription entitlements (`E-17`, `E-19`, `E-20`) |
| 8 | External dependencies | Cellular/Wi-Fi connectivity contract and SIM/roaming policy (`PF` §06 requires disclosure); notification providers; hosting; no supplier or price is evidenced |
| 9 | Licensing conditions | OPEN-MARINE rights for any reused pattern; third-party notices for the hosted stack (`LP` §6.2); GDPR/data-protection assessment required (`HW` §5.6); no data-provider licensing is created by WATCH itself |
| 10 | Hardware obligations | RED (cellular/Wi-Fi), GPSR, RoHS, WEEE, CRA, EU DoC; network coverage and roaming disclosure; Battery Regulation assessment if an internal battery is used (`HW` O-15); backup-energy behaviour tests (`PF` §06) |
| 11 | Required data rights | Own-vessel data (`DR` MD-25); explicit customer consent for uplink; no resale of vessel operational data; third-party data mixed into WATCH views inherits `DR` terms |
| 12 | Safety obligations | Must never be characterised as a distress, safety-alert or theft-prevention certified service (`PF` §06 exclusions); no remote helm functions; alert latency and connectivity limits disclosed; account/subscription logic must not disable safety-relevant local functions |
| 13 | Commercial packaging implications | WATCH Core/Plus; hardware plus monitoring subscription; SIM/network fees and roaming policy must be disclosed before live selling (`PF` §06); EUR 299 hardware plus EUR 9.90/month are hypotheses only |
| 14 | Verification requirements | MC-13-WATCH gate (`WR` §6); repeated alert delivery under real network loss; delay metrics; secure device ownership tests; privacy/consent review; backup-energy behaviour; subscription reliability |
| 15 | Recommended implementation boundary | WATCH is a cloud service plus a device agent. It reads a bounded subset of vessel data and may never write to the vessel data bus or to any control path; delivery guarantees are stated as measured, not implied (architecture document §11) |

Decision register — MAREA WATCH:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| Remote monitoring service (uplink, alerts, geofence, history) | `BUILD` | `CI` C-08, N-10 | Product definition + MC-11A/MC-13-WATCH |
| Device identity and pairing | `BUILD` | `CI` G9; `M01` §5.3 | Security design; CRA-readiness input |
| Multi-user/organisation sharing | `BUILD` | `M01` §2.2 | Permission model; MC-11A |
| Subscription and billing | `BUILD` | `M01` §2.2, §5.3 | MC-10A/MC-11A; billing provider decision |
| Connectivity/SIM commercial terms | `LICENSE-OR-PARTNER` | `PF` §06 | Supplier agreement; no price may be quoted before it |
| Hardware kit and battery architecture | `BLOCKED` | `HW` §2.8 (no article), O-15 | BOM, RF/module choice, battery assessment |

### 4.7 MAREA DISPLAY (dedicated marine display device)

Rollup: lifecycle `DEFINED` / software `PROTOTYPE_UNTESTED` (reusable UI logic only) / legal `BLOCKED_RIGHTS` /
physical `NOT_EVIDENCED` (no article: `HW` HW-11) / commercial `DEFINED`, not sellable.
Applicability (`HW` §5.2): CE `CA`, EMC `CA`, RED `POT`, GPSR `CA`, RoHS `CA`, WEEE `CA`, CRA `CA`, MED `NAE`.

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | Marine-grade dedicated screen displaying NAV, instruments, AIS, weather, alerts and permitted pilot status/controls, with readable day/night modes and customizable helm views (`PF` §07) |
| 2 | Reusable OPEN-MARINE modules | Presentation logic and state patterns `E-11`, `E-12` (`CI` §3.4); chart rendering approach (`CI` §3.6 data access); data contract `E-01` |
| 3 | Existing EMBARCARTE commercial infrastructure | Catalogue/order/admin; missing serial registration, firmware update channel, warranty/RMA and accessory SKU model (`M01` §5.3) |
| 4 | Confirmed technical functionality | Nothing device-specific. Browser UI feature code exists but runs in a browser on customer devices (`HW` HW-11); no kiosk, boot, power or thermal behaviour exists |
| 5 | Partial or simulated functionality | The UI is a SPA with no SSR/SEO requirement for the device role; service worker and IndexedDB offline behaviour exists (`CI` §3.4) but no embeddable device shell, no day/night switch hardware behaviour, no wet-touch or sunlight-legibility evidence |
| 6 | Required integration work | Choose display hardware and OS/shell; kiosk boot into the MAREA vessel UI; power/supply design; brightness and dimming control; mount and cable definition; update mechanism |
| 7 | Required new development | Device firmware/image, watchdog boot, glove/wet touch interaction layer, helm view configuration, serviceability and field replacement process (`HW` §2.5 for DISPLAY) |
| 8 | External dependencies | Display panel/enclosure manufacturing partner (none evidenced); mounts; power components; BOM does not exist (`HW` O-02) |
| 9 | Licensing conditions | OPEN-MARINE rights for UI code; notices for the static bundle (`LP` §5.3, §6.2); Apache-2.0/MapLibre notices; no chart rights are conveyed by the device |
| 10 | Hardware obligations | EMC (display electronics), GPSR, RoHS, WEEE, CRA, RED if wireless; EU DoC; optical/thermal/vibration/ingress evidence; sunlight legibility; boot performance (`HW` §5.5; `PF` §07 quality gates) |
| 11 | Required data rights | Display consumes data whose rights stay with their holders (charts, weather); no redistribution through the device; own-vessel data permitted (`DR` MD-25) |
| 12 | Safety obligations | PILOT status/controls on the display only where an approved interface boundary exists (`PF` §07); no steering command may originate from the commercial platform; readable alarms and stale-data indication required |
| 13 | Commercial packaging implications | DISPLAY 7 and 10/12 names depend on verified enclosure/manufacturing capability; EUR 699 hypothesis unapproved; charts, mounts, HUB and pilot hardware never assumed included (`PF` §07) |
| 14 | Verification requirements | MC-13-DISPLAY gate (`WR` §6); ingress/vibration/thermal/power tests; sunlight legibility measurement; boot-time test; glove/wet-touch test if claimed; long-run stability |
| 15 | Recommended implementation boundary | DISPLAY is a client of the onboard runtime and of MAREA applications. It holds no authority and no persistence of safety-relevant state beyond local UI preferences (architecture document §4.3/§6) |

Decision register — MAREA DISPLAY:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| Vessel UI presentation layer | `REUSE-CONDITIONAL` | `CI` §3.4, C-03 | Licence; device-shell adaptation; performance budget |
| Chart rendering approach | `REUSE-CONDITIONAL` | `CI` §3.4, §3.6 | Licence; real-data rendering evidence |
| Display hardware, enclosure, power | `BLOCKED` | `HW` HW-11 (no article), §2.8 | BOM, supplier, industrial design, test plan |
| Device firmware/image and updates | `BUILD` | none exists | Security/update design; CRA readiness |
| Accessory and mount SKU model | `BUILD` | `M01` §2.2 | Commerce data model (MC-05B) |

### 4.8 MAREA WEATHER (forecast/data service)

Rollup: lifecycle `DEFINED` / software `PROTOTYPE_UNTESTED` / legal `OPEN_PROVIDER_TERMS` + `BLOCKED_RIGHTS` /
physical `NOT_APPLICABLE_SOFTWARE` (CRA `NOT_YET_ASSESSABLE`, `HW` §5.2) / commercial `DEFINED`, not sellable.

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | Coastal/offshore planning service for wind, waves, currents and tides with forecast comparisons, validity windows, route weather insights, source provenance and NAV integration, starting in Atlantic Galicia/Portugal (`PF` §08) |
| 2 | Reusable OPEN-MARINE modules | Environmental aggregation stack `E-10` (`CI` §3.6): provider registry, fallbacks, provenance fields, tide service, wind field, Open-Meteo marine, environment catalogue/sync |
| 3 | Existing EMBARCARTE commercial infrastructure | Account, SSR delivery and SEO infrastructure are directly usable (`M01` §2, §3); missing entitlements, entitlement sharing with NAV, and provenance/freshness presentation (`M01` §5.3) |
| 4 | Confirmed technical functionality | Provider selection, caching and normalisation code with tests in tree (`CI` C-05, 70 chart-engine cases) but not executed; repository's own audit states model-resolution and provenance limits (`CI` §5.3 C-05) |
| 5 | Partial or simulated functionality | No forecast-accuracy evaluation in the pilot geography; provider availability/terms unverified; offline cache behaviour unverified; several providers are fallback-only or key-gated (`CI` §3.6); Copernicus sync depends on EUPL tooling |
| 6 | Required integration work | Freeze the lawful source set per region; attribution and provenance surface; freshness/stale flags; entitlement mapping to NAV Pro; cache and offline policy compliant with each provider's terms |
| 7 | Required new development | Forecast comparison and route-assessment features; validity-window presentation; subscription entitlement service; source-quality evaluation harness in pilot geography; region coverage management |
| 8 | External dependencies | Weather/tide providers with terms (`DR` MD-04…MD-21); Open-Meteo plan choice; Copernicus/EMODnet/GEBCO WMS services; self-hosted model data is a separate engineering and licensing decision |
| 9 | Licensing conditions | Open-Meteo free tier is non-commercial (`DR` MD-15) → `LICENSE-OR-PARTNER` for a paid service; OpenWeatherMap requires a paid plan (`DR` MD-20); Puertos, MeteoGalicia, IHM, Esri rows are `LEGAL_REVIEW_REQUIRED`; EMODnet/Copernicus/GEBCO require attribution and terms confirmation (`LP` §11.1); no redistribution beyond display rights (`LP` §11.2) |
| 10 | Hardware obligations | None for the service. Any client application is a separate CRA assessment (`HW` §5.4 C-08, NYA for WEATHER) |
| 11 | Required data rights | Display rights, attribution strings, no repackaging, no offline redistribution; each provider row must be resolved before the corresponding dataset is shown (`DR` MD rows; `LP` G-09) |
| 12 | Safety obligations | No meteorological guarantee; forecast ≠ observation (`CI` §5.3 C-05); validity window and uncertainty disclosure; stale/offline status must be explicit; "not for navigation" where an official-product claim could be implied |
| 13 | Commercial packaging implications | WEATHER Standard/Pro; standalone usefulness without NAV; premium entitlements shared with NAV without double billing (`PF` §08); "from EUR 49/year" hypothesis unapproved; region coverage must not be implied beyond licensed data |
| 14 | Verification requirements | MC-13-WEATHER gate (`WR` §6); permission audit per source; provider-terms evidence; forecast evaluation against observations in the pilot geography; stale/offline behaviour tests; attribution presence tests |
| 15 | Recommended implementation boundary | WEATHER is a data service that serves applications; it owns provider abstraction, provenance and caching policy. It must not become a chart or navigation authority, and it must not redistribute provider data to third parties (architecture document §8/§9) |

Decision register — MAREA WEATHER:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| Provider aggregation and provenance code | `REUSE-CONDITIONAL` | `CI` §3.6, C-05; `LP` G-09 | `DR` row resolution per provider; executed tests |
| Open-Meteo (paid plan) | `LICENSE-OR-PARTNER` | `DR` MD-15 | Commercial plan agreement |
| OpenWeatherMap | `LICENSE-OR-PARTNER` | `DR` MD-20 | Paid plan terms; caching/attribution rules |
| Copernicus Marine / EMODnet / GEBCO | `REUSE-CONDITIONAL` | `DR` MD-04/MD-05/MD-06; `LP` §11.1 | Attribution + terms confirmation; keep EUPL tooling outside the shipped image |
| Puertos del Estado / MeteoGalicia / IHM tides | `BLOCKED` | `DR` MD-10/MD-18/MD-19 | Written authorisation / legal review |
| Esri basemap inside WEATHER views | `REPLACE-OR-REMOVE` | `DR` MD-21 | Replace with licensed or self-hosted provider; remove hardcoded tile URL |
| Forecast comparison, entitlement and evaluation layer | `BUILD` | `CI` C-05 "not established" | MC-13-WEATHER programme |

### 4.9 MAREA FLEET (multi-vessel organisation SaaS)

Rollup: lifecycle `DEFINED` / software `NOT_FOUND` / legal `BLOCKED_RIGHTS` (reused code) with
`OPEN_PROVIDER_TERMS` if telemetry data is involved / physical `NOT_APPLICABLE_SOFTWARE` /
commercial `DEFINED`, not sellable.
Applicability (`HW` §5.2): all nine regimes `NAE` (B2B SaaS is a service, `HW` §5.4 C-08).

| # | Field | Content |
|---|---|---|
| 1 | Customer-facing intended capability | Organisation-oriented SaaS: multi-vessel dashboard, access controls, location/status, maintenance history/tasks, documents, operational alerts, reporting, service planning, owners/operators and compatible telemetry ingestion (`PF` §09) |
| 2 | Reusable OPEN-MARINE modules | Only data-contract conventions `E-01` and publisher patterns `E-03`, plus the simulation platform as internal test tooling `E-13`. No fleet code exists |
| 3 | Existing EMBARCARTE commercial infrastructure | SSR page delivery, SEO/sitemap, session auth, admin patterns (`M01` §2, §3) are a starting point; everything tenant-related is absent: no organisation model, no B2B roles, no audit log, no API, no SLA instrumentation (`M01` §2.2, §5.3) |
| 4 | Confirmed technical functionality | None for FLEET. `CI` C-08 (`NOT_FOUND`) covers the closest capability and does not exist |
| 5 | Partial or simulated functionality | None. The simulation platform persists runs and events but is a bench tool, not a fleet data store (`CI` §3.3) |
| 6 | Required integration work | Tenant isolation, RBAC, audited access, telemetry ingestion from WATCH/HUB, vessel registry, document store, maintenance workflow and export/deletion |
| 7 | Required new development | Entire SaaS (`E-18`), plus billing/contract management, API limits, SLA monitoring, data-processing agreements and reporting (`PF` §09 quality gates) |
| 8 | External dependencies | Business discovery with real operators (no customer evidence exists, `WR` §5 Phase A); hosting; communications contract where telemetry is cellular; no supplier or price is evidenced |
| 9 | Licensing conditions | OPEN-MARINE rights for any reused pattern; notice bundle for the hosted stack (`LP` §6.2); GDPR/data-processing terms; any third-party weather/chart data surfaced in FLEET inherits `DR` terms |
| 10 | Hardware obligations | None for the SaaS. Compatible monitored hardware is priced and contracted separately (`PF` §09) |
| 11 | Required data rights | Organisation and vessel operational data under contract with the operator; GDPR roles (controller/processor) to be defined; no resale or reuse of operational data outside the contract |
| 12 | Safety obligations | FLEET must not be presented as a safety, distress or collision-avoidance service; no remote control of any vessel function; alert latency and availability limits disclosed; operational decisions remain with the operator |
| 13 | Commercial packaging implications | FLEET Start/Business/Enterprise; per-vessel subscription with separately quoted onboarding, installation and volume terms (`PF` §09); "from EUR 49/vessel/month" hypothesis unapproved; willingness-to-pay must be tested against real onboard hardware/network cost |
| 14 | Verification requirements | MC-13-FLEET gate (`WR` §6); tenant-isolation tests; administrator control tests; access logs; data export/deletion; SLA monitoring and billing accuracy; real B2B discovery before any volume assumption (`WR` §5) |
| 15 | Recommended implementation boundary | FLEET is a separate B2B system of record for organisation operations. It consumes telemetry through a read-only contract and holds no vessel authority; it must never be the route by which commercial systems reach onboard control (architecture document §4.1/§11) |

Decision register — MAREA FLEET:

| Element | Status | Evidence | Gate to close |
|---|---|---|---|
| Multi-tenant SaaS, RBAC, audit, reporting | `BUILD` | `CI` C-08; `M01` §2.2 | MC-11A design + MC-13-FLEET |
| Telemetry ingestion contract from WATCH/HUB | `BUILD` | Depends on `E-17` | WATCH/HUB contract exists first |
| Tenant data isolation and export/deletion | `BUILD` | none | Security and GDPR review |
| Billing, per-vessel subscription, SLA | `BUILD` | `M01` §5.3 | MC-10A/MC-11A |
| Third-party data surfaced in FLEET views | `REUSE-CONDITIONAL` | `DR` rows | Resolve the specific `DR` row before display |
| Any OPEN-MARINE code reuse in the SaaS | `BLOCKED` | `IP` D-01–D-03; `DL` D-002 | Written rights decision |

---

## 5. Product-level readiness summary

### 5.1 Four-axis readiness matrix

No cell in this table means "cleared" or "sellable". Axis vocabularies are defined in §2.3.

| Product | Lifecycle (`PF` lines 141–147) | Software engineering | Legal / licence | Physical / regulatory | Commercial |
|---|---|---|---|---|---|
| NAV | DEFINED | `PROTOTYPE_UNTESTED` | `BLOCKED_RIGHTS` + `OPEN_PROVIDER_TERMS` | `NOT_APPLICABLE_SOFTWARE` (CRA `POT`) | DEFINED, not sellable |
| HUB | DEFINED | `PROTOTYPE_UNTESTED` (bus glue only) | `BLOCKED_RIGHTS` | `NOT_EVIDENCED` | DEFINED, not sellable |
| AIS | DEFINED | `PROTOTYPE_UNTESTED` (analysis only; reception external) | `BLOCKED_RIGHTS` + `OPEN_PROVIDER_TERMS` | `NOT_EVIDENCED` | DEFINED, not sellable |
| PILOT | DEFINED | `PROTOTYPE_UNIT_TESTED` logic + `SIMULATED_ONLY` actuation | `BLOCKED_RIGHTS` | `BLOCKED` (`HW` §3.7) | DEFINED, not sellable |
| SENSE | DEFINED | `PROTOTYPE_UNIT_TESTED` (wind, IMU) | `BLOCKED_RIGHTS` | `NOT_EVIDENCED` | DEFINED, not sellable |
| WATCH | DEFINED | `NOT_FOUND` | `BLOCKED_RIGHTS` | `NOT_EVIDENCED` | DEFINED, not sellable |
| DISPLAY | DEFINED | `PROTOTYPE_UNTESTED` (presentation only) | `BLOCKED_RIGHTS` | `NOT_EVIDENCED` (no article) | DEFINED, not sellable |
| WEATHER | DEFINED | `PROTOTYPE_UNTESTED` | `OPEN_PROVIDER_TERMS` + `BLOCKED_RIGHTS` | `NOT_APPLICABLE_SOFTWARE` | DEFINED, not sellable |
| FLEET | DEFINED | `NOT_FOUND` | `BLOCKED_RIGHTS` | `NOT_APPLICABLE_SOFTWARE` | DEFINED, not sellable |

Reading the matrix:

- Every product is `BLOCKED` or `OPEN_PROVIDER_TERMS` on legal readiness for the same two reasons:
  OPEN-MARINE grants no reuse rights (`IP` §0.1, `LP` G-01/G-02) and provider data terms are unresolved
  for charts/weather (`LP` G-09). Neither is a product-specific defect.
- No hardware family reaches `ENGINEERING VERIFIED`: `HW` §1.2 records CONCEPT/DEFINED with no physical
  build, test or measurement evidence at all (`HW` §2.8).
- Software readiness is uneven by design: PILOT and SENSE have the only executed unit tests in the
  programme (23 cases, `CI` §6.1), while WATCH and FLEET have no relevant code at all.
- Commercial readiness is uniformly `DEFINED` because the end-state specifications exist. `DEFINED`
  authorises publishing an end-state specification, not an offer (`PF` Lifecycle / launch classification and portfolio-status note, lines 141–149).

### 5.2 Decision status distribution

Counting rule, reproducible with a text search: one count per row of the §3 element register plus one per
row of the nine §4 decision registers (24 + 59 = 83 rows). Where a row names two statuses, it is counted
under the first named status only; the annotation "(bundled) / user-installed" on E-07 is therefore
counted as `REPLACE-OR-REMOVE`.

| Status | Rows | Where it concentrates |
|---|---:|---|
| `REUSE-CANDIDATE` | 11 | Data contract, Signal K bus, delta clients, AIS analysis, dashboard patterns, simulation harness |
| `REUSE-CONDITIONAL` | 22 | NAV chart/UI, HUB publishers, SENSE parsers, PILOT engine and firmware, DISPLAY presentation, WEATHER providers, separately installed AIS decoder, third-party data surfaced in FLEET |
| `LICENSE-OR-PARTNER` | 7 | Chart supply (S-63/IC-ENC), OSM/basemap tiles, Open-Meteo paid plan, OpenWeatherMap, WATCH connectivity |
| `BUILD` | 21 | WATCH service, FLEET SaaS, subscriptions, device registration, onboard auth, SENSE modules, DISPLAY firmware |
| `REPLACE-OR-REMOVE` | 6 | Bundled AIS-catcher (three rows), `marine-tile-server`, the type-only adapter framework, the Esri basemap |
| `BLOCKED` | 16 | PILOT physical gate and sea trials, NMEA 2000, hardware design freezes, AIS data rights, IHM/Puertos data, OPEN-MARINE rights |

`BLOCKED` and `BUILD` together account for 37 of 83 rows, which is the honest finding: the programme's
binding constraints are rights, hardware and provider agreements, while a large share of the customer
promise has no implementation anywhere in either repository.

### 5.3 Mandatory non-assertions

The following claims must not appear in any MAREA product page, quotation, manual, deck or marketplace
listing on the basis of this document:

1. **No NMEA 2000 certification claim.** No NMEA licence, manufacturer code, product code or certificate
   exists; NMEA 2000 is not implemented (`CI` C-17; `HW` §4.2, O-09, R-02). Phrasing must be constrained
   in copy per `HW` §4.6.
2. **No official ENC or ECDIS claim.** The chart engine explicitly states it is not an ECDIS and that
   S-63/oeSENC are out of scope (`CI` §3.6, chart-engine README:185–187; `DR` MD-08). Official vector
   products require distributor agreements and cell permits that do not exist.
3. **PILOT is not sea-trial validated.** There is no bench log, measurement, installation record or sea
   trial in either repository (`HW` §3.2 F-A28, §3.7, §2.8). Unit tests and simulation are not sale
   readiness.
4. **AIS is receive-only.** No transmission, transponder, DSC, type approval or collision-avoidance
   capability exists or may be implied (`PF` §03, `HW` §4.6 rule 4).
5. **No "certified", "approved", "compliant" or "type-approved" claim** for any product against EMC, RED,
   GPSR, RoHS, WEEE, CRA, MED or any standard; no CE marking, DoC, test report or notified-body
   certificate exists (`HW` §1.1, §5.8).
6. **No Signal K certification or endorsement claim.** Signal K is a nominative interoperability
   reference; no compatibility test matrix exists yet (`HW` R-07, §2.7).
7. **No price, stock, availability or delivery promise** may be derived from `PF` hypotheses or from this
   map. No SKU is purchasable (`PF` lines 123–127; `M01` §2.2).
8. **The image-generation blocker and MC-01 `PARTIAL` remain open.** MC-01 is `PARTIAL` because actual AI
   image generation is externally blocked (no capability and no credential), not because product
   documentation is missing (`A1` §1, §7; `DL` D-001). Product imagery therefore cannot be presented as
   `REAL_PRODUCT`; it is `CONCEPT` and must be labelled (`AS` classification enum and label table).
9. **MAREA is a proposed brand.** Trademark clearance is open and a conflicting commercial use is recorded
   as a risk signal, not a finding (`M00` §Legal blockers, `AS` B5).
10. **No product is legally cleared, certified or sale-ready.** This holds for all nine products without
    exception and cannot be changed by documentation alone.

---

## 6. Open items handed to later milestones

Only items that later milestones must actively consume; evidence ids are from the companion documents.

| ID | Item | Blocks | Owner milestone | Type |
|---|---|---|---|---|
| PRM-01 | Written OPEN-MARINE reuse decision (licence or assignment) covering code, firmware and documentation | Every product | MC-12A + counsel (`IP` D-01–D-05) | Legal — BLOCKED |
| PRM-02 | Third-party notice bundle and source-offer process | Any distribution | MC-12A / release gate (`LP` G-03, G-12) | Engineering + legal |
| PRM-03 | Chart supply decision: distributor agreement vs user-supplied charts only vs open datasets | NAV, DISPLAY | MC-09B/MC-13-NAV (`DR` MD-08/MD-26/MD-27) | Commercial + legal — BLOCKED |
| PRM-04 | Weather dataset permission set for the pilot geography | WEATHER, NAV | MC-13-WEATHER (`DR` rows; `LP` G-09) | Legal/Commercial |
| PRM-05 | AIS acquisition decision (separate-process GPL compliance vs permissive decoder) | AIS, HUB | MC-13-AIS (`LP` §7, LR-06) | Legal + engineering |
| PRM-06 | NMEA 2000 licence/certification decision or retirement of NMEA 2000 language | HUB, SENSE, PILOT integration | MC-16A (`HW` O-09) | Commercial + legal |
| PRM-07 | PILOT safety case, bench evidence and sea-trial programme | PILOT | MC-12B/MC-13-PILOT (`HW` §3.5) | Physical — BLOCKED |
| PRM-08 | Hardware BOM and supplier quotations for HUB/AIS/SENSE/WATCH/DISPLAY | All hardware families | MC-04A (`HW` O-02) | Commercial — OPEN |
| PRM-09 | Commerce data model: editions, lifecycle/readiness, entitlements, quotes, serials, subscriptions | All packaging claims | MC-05B/MC-10A (`M01` §5.3) | Engineering + product |
| PRM-10 | Asset production under `CONCEPT` labelling; no `REAL_PRODUCT` imagery until hardware evidence exists | Product pages | MC-08A/B/C (`AS`; `A1` §7) | Blocked on image generation + hardware |
| PRM-11 | MAREA trademark clearance | Every public brand use | Brand workstream (`M00`, `AS` B5) | Legal — BLOCKED |

---

## 7. Cross-reference index

| Claim area | Primary evidence |
|---|---|
| Capability states C-01…C-18 | `CI` §5.1 |
| Executed tests (23 Python cases only) | `CI` §6.1, §6.3 |
| Implementation gaps G1–G14 | `CI` §7 |
| Reuse difficulty per component | `CI` §9 |
| Ownership, rights categories A–J, missing assignments | `IP` §3, §5, §7 |
| IP risk register R-IP-01…R-IP-12 | `IP` §8 |
| Licence inventory (1,034 rows) and allow/deny rules | `LP` §5, `SLI` CSV |
| Copyleft/source-disclosure obligations | `LP` §7 |
| Provider terms and attribution | `LP` §11.1, §11.2; `DR` |
| Release gates G-01…G-20 | `LP` §14 |
| Hardware register HW-01…HW-15, restrictions, product-safety limits | `HW` §2.1, §2.2, §2.5 |
| PILOT features F-A01…F-A28, gates G1–G9, verdict | `HW` §3.2, §3.5, §3.7 |
| Protocol/standards rights and advertising rules | `HW` §4 |
| Regulatory applicability 9×9 and obligations per family | `HW` §5.2, §5.5 |
| Hardware open items O-01…O-17 | `HW` §7 |
| Product intent, editions, price hypotheses, bundles | `PF` §01–§09; bundle architecture table (lines 113–127) |
| Lifecycle scale | `PF` Lifecycle / launch classification (lines 141–147) |
| Route, content and commerce proposals | `WR` §2, §3, §6 |
| EMBARCARTE verified capabilities and gaps | `M01` §2, §2.2, §3, §5.3, §6, §7.2 |
| Programme decisions D-001, D-002 | `DL` |
| MC-01 `PARTIAL` and image blocker | `A1` §1, §7 |
| Asset classification labels `CONCEPT`/`REAL_PRODUCT` | `AS` |

End of document.
