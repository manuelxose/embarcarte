# MC-02 — Executive verdict

| Field | Value |
| --- | --- |
| Milestone | MC-02 — technology, intellectual property, software licensing and commercial reuse audit |
| Programme | EMBARCARTE / MAREA (36 Master Prompts), prompt 02 of 36 |
| Date | 2026-10-30 |
| Status | **PASS (audit scope)** — external legal/physical permissions remain BLOCKED and are recorded as such. No product is cleared for sale. |
| Audited OPEN-MARINE revision | `manuelxose/open-marine` @ `403941b8860439115418b1786d8431284d2dae08` (main = origin/main; 82 commits; 1,033 tracked files) |
| EMBARCARTE branch | `feature/marea-mc02-technology-audit` (stacked on MC-01 `4317865`; draft PR base `feature/marea-mc01-agent-foundation`) |
| Evidence | `OPEN-MARINE-CAPABILITY-INVENTORY.md`, `INTELLECTUAL-PROPERTY-CHAIN.md`, `SOFTWARE-LICENSE-INVENTORY.csv`, `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`, `MARINE-DATA-RIGHTS-MATRIX.csv`, `HARDWARE-COMPLIANCE-MATRIX.md`, `MAREA-PRODUCT-REUSE-MAP.md`, `MAREA-COMMERCIAL-ARCHITECTURE.md`, `MC-02-BLOCKERS-AND-DECISIONS.md`, `MC-02-REVIEW.md` |
| Nature | Evidence-based technical and commercial assessment. Not a legal opinion, not a clearance certificate, not a certification. |

## 1. Executive verdict

OPEN-MARINE contains a **real, coherent engineering foundation** — a Signal K-derived data contract,
a working Angular marine UI and chart rendering stack, a chart import/tile service, sensor-gateway
parsers with the only executed unit tests in the programme, a simulation bench, and an autopilot
safety architecture expressed in code and firmware. It is **not** a commercial product, and it is
**not licensed for reuse**: the public repository has no licence, no contributor assignments, and
nearly half of the current tree was last modified by an author whose contractual position is
undocumented. The audit therefore separates three conclusions: (a) **engineering reuse is real but
conditional**; (b) **commercial distribution is currently blocked on ownership and licensing**;
(c) **the nine MAREA products need substantial new development, data agreements and physical
validation** regardless of how much code is reused. The code is a strong starting point; the
rights, the certified hardware and the licensed data are not yet assets of the business.

## 2. What was actually audited

| Workstream | Scope | Principal result |
| --- | --- | --- |
| A — Source and architecture | 7 workspaces + 8 supporting areas, 1,033 tracked files | 18-row capability matrix: 2 IMPLEMENTED_AND_TESTED, 10 IMPLEMENTED_NOT_FULLY_TESTED, 1 EXTERNAL_DEPENDENCY, 1 SIMULATED_ONLY, 1 EXPERIMENTAL, 3 NOT_FOUND. 23 Python tests executed and passed; 214 TS unit + 3 Playwright cases remain NOT_VERIFIED (no `node_modules`, no installs). |
| B — IP and software licences | Full Git history, 5 lockfiles, requirements, Docker, firmware | 1,034-row inventory: 997 npm + 7 first-party + 13 Python + 17 platform rows. 109 direct, 925 transitive. Licence families: permissive 960, Apache-2.0 38, BlueOak 13, public domain 6, CC-BY 3, copyleft 6, proprietary/unlicensed 7, unknown 1. No CLA/DCO anywhere. |
| C — Marine data rights | 28 providers/datasets, official terms only | 3 PERMITTED, 5 PERMITTED_CONDITIONAL, 8 CONDITIONAL, 1 NOT_PERMITTED, 11 LEGAL_REVIEW_REQUIRED. Official ENC redistribution blocked; Open-Meteo free tier non-commercial; OSM tile policy forbids offline/bulk; repo mislabels non-commercial MBAR bathymetry as CC BY 4.0. |
| D — Hardware, safety, protocols, EU compliance | 13 components + 3 absent; firmware; 9 regimes × 9 families | PILOT commercialisation safety gate **BLOCKED**. No physical build/test/certification evidence at all. Protocol rights: 1 critical, 4 high, 6 medium, 1 low. 81 compliance cells: 33 CLEARLY_APPLICABLE, 10 POTENTIALLY_APPLICABLE, 37 NOT_APPLICABLE_WITH_EXPLANATION, 1 NOT_YET_ASSESSABLE. |
| E — Product mapping and architecture | All nine MAREA products | 83 reuse decision rows: 11 REUSE-CANDIDATE, 22 REUSE-CONDITIONAL, 7 LICENSE-OR-PARTNER, 21 BUILD, 6 REPLACE-OR-REMOVE, 16 BLOCKED. All nine products are DEFINED, none sellable. |
| Lead — Register | Consolidated findings | 58 blockers: 10 CRITICAL, 37 HIGH, 11 MEDIUM. 4 D-002 decisions on licensing recorded; 8 human/legal decisions required. |

## 3. What is commercially useful today

1. **Signal K-derived data contract** (`marine-data-contract`: paths, SI units, quality flags,
   `DataPoint`, clock-drift handling). The cleanest reusable asset: a proven vocabulary for every
   MAREA product, independent of the UI. Reuse as a contract design; importing the package itself
   requires the ownership/licence decision.
2. **Navigation and instrument presentation** (`marine-instrumentation-ui`): MapLibre chart rendering,
   instrument dashboards, AIS list/map views, uPlot history. Reusable as patterns and components, not
   as a drop-in product: it is a separate Angular application with its own state and dependency tree.
3. **Chart service boundary** (`marine-chart-engine`, `marine-tile-server`): catalog/import/job/tile
   HTTP contract for MBTiles, legal S-57 conversion and raster imports, with an explicit refusal of
   S-63/oeSENC/DRM. Valuable as a **service boundary**, worthless as a chart entitlement: it ships no
   licensed chart rights.
4. **Sensor and Signal K glue** (`marine-sensor-gateway`): the wind NMEA MWV/MWD parser and IMU
   fusion/publisher are the only components with executed tests (23 cases). Directly reusable for SENSE
   and HUB once the licence exists; the TypeScript adapters are type-only.
5. **Autopilot architecture** (`marine-autopilot-engine` + Pico 2 firmware): fail-closed profiles,
   heartbeat cut, GPIO E-stop concept, motor policy limits. Reusable as **design input for the safety
   boundary**, not as a product: no relay output, no hardware watchdog, no rudder feedback, no bench or
   sea-trial evidence.
6. **Simulation/test harness** (`marine-simulation-platform`): scenario orchestration and bench tooling.
   Useful for engineering verification after its isolation defect is fixed.
7. **Signal K runtime** (upstream `signalk/signalk-server:v2.22.1`, Apache-2.0): the interoperability
   bus to integrate unmodified, pinned by digest, with notice retention and a compatibility matrix.

## 4. Main risks

| Risk | Severity | Finding |
| --- | --- | --- |
| Ownership and inbound licence | CRITICAL | No `LICENSE`/`COPYING`/`NOTICE`; GitHub `license: null`; 47.9% of current files last touched by `mgonzalezv@eservicios.indra.es`; 51.7% by `oficina@tecnoriasl.com`; no assignments/CLA/DCO. Public visibility is not a licence. |
| Distribution licence obligations | HIGH | AIS-catcher is GPL-3.0 and is downloaded/compiled into the appliance path; non-multi-stage Dockerfile leaves GPL `make`/`g++` in the image; `copernicusmarine` is EUPL-1.2. No NOTICE bundle exists for 1,034 components. |
| Chart and weather rights | HIGH | No official ENC distributor/OEM agreement; Open-Meteo free tier is non-commercial; OSM tile policy forbids offline/bulk use; OpenWeather tiles are a separate paid SKU; Esri imagery has no licensed path; MBAR bathymetry is mislabelled CC BY 4.0 (it is CC-BY-NC, not for navigation). |
| PILOT safety | CRITICAL | Commercialisation gate BLOCKED: software safety logic PARTIAL, no physical bench evidence, no sea trial, no independent verification, no conformity assessment; control API unauthenticated on `0.0.0.0` with CORS `*`; no relay output, no rudder feedback, no hardware watchdog. |
| Standards claims | HIGH | NMEA 2000 is not implemented (type stubs only) and NMEA's official position requires certification/licence/manufacturer/product codes for products that read or transmit it. NMEA 0183 parsing is not conformity. No claim may be made. |
| Hardware evidence | CRITICAL | 13 components identified, only one with an exact part number, none with a board revision, no BOM, no measurements, no EMC/environmental test, no CE/DoC. CRA reporting obligations already apply from 2026-09-11. |
| Product readiness | HIGH | 3 capabilities NOT_FOUND (remote monitoring, NMEA 2000/CAN ingestion, vessel validation); WATCH and FLEET have no implementation; DISPLAY/SENSE/AIS hardware does not exist. |
| Supply chain integrity | MEDIUM | Unpinned binaries, mutable container tags, no image SBOM, no licence gate in CI, unknown licence for one npm package. |

## 5. Product opportunities (end-state, not sale-ready)

| Product | Reuse basis | Binding constraints | Recommended next step |
| --- | --- | --- | --- |
| **NAV** | UI, chart rendering, chart service, data contract | No official chart rights; offline tiles blocked; licences unresolved | Define "licensed-chart-capable" scope; chart rights decision DEC-02 |
| **HUB** | Data contract, publishers, Signal K runtime, gateway architecture | No product hardware, unauthenticated control plane, NMEA 2000 not implemented | Freeze hardware/protocol matrix; security hardening; prototype |
| **AIS** | AIS target analysis/UI, receive-only pipeline | AIS-catcher GPL-3.0; no receiver hardware; no RF certification | Decoder strategy DEC-04; certified receiver module |
| **PILOT** | Safety architecture, control engine, Pico firmware | Safety gate BLOCKED; no bench/sea evidence; no conformity | Fund staged safety programme DEC-06; do not sell |
| **SENSE** | Wind/IMU parsers, data contract | No sensor product, no calibration/accuracy evidence | Sensor selection and calibration programme |
| **WATCH** | Nothing directly; new build | No remote monitoring, device identity, connectivity contract | Build on commercial platform; privacy/threat model |
| **DISPLAY** | Web UI in kiosk/embedded runtime | No display hardware or enclosure; sunlight/ingress unverified | Hardware selection + embedded runtime decision |
| **WEATHER** | Provider adapters (partial), provenance model | Open-Meteo commercial tier; MeteoGalicia/Puertos/AEMET terms unresolved | Data acquisition decision DEC-03 |
| **FLEET** | EMBARCARTE accounts/commerce patterns only | No multi-tenant SaaS, billing, tenant isolation | Build; B2B discovery first |

## 6. Dependency and licensing blockers (summary)

The full register is `MC-02-BLOCKERS-AND-DECISIONS.md` (58 entries). The blocking chain is:

1. **Ownership decision (L-01..L-03, S-08)** — without assignments and an outbound position, no reuse
   of OPEN-MARINE and no customer licence is possible.
2. **Distribution licensing (S-01..S-09, L-06)** — AIS-catcher GPL, Docker image, SBOM/notice gate.
3. **Data rights (D-01..D-10)** — official ENC, OSM tiles, Open-Meteo/OpenWeather, public-sector
   providers, AIS-derived data.
4. **Safety and conformity (H-01..H-13, P-04)** — PILOT gate, NMEA, CE/EMC/RED/GPSR/CRA, physical tests.
5. **Commercial evidence (X-01..X-07)** — brand clearance, legal identity, BOM/quotes, customer discovery,
   release governance, image generation.

## 7. Decisions required from the company (not resolvable by agents)

| # | Decision | Options | Blocking |
| --- | --- | --- | --- |
| DEC-01 | OPEN-MARINE ownership and outbound licence | proprietary baseline after assignments / permissive / source-available | L-01..L-04, S-08 |
| DEC-02 | Official ENC distribution | pursue IC-ENC/IHM/IHPT OEM / user-supplied charts only / partner | D-01, P-01 |
| DEC-03 | Weather data model | paid plan / self-hosted AGPL / partner | D-04, D-07, P-08 |
| DEC-04 | AIS decoder strategy | GPL-compliant AIS-catcher / replacement decoder / user-installed | S-01, P-03 |
| DEC-05 | NMEA 2000 participation | license + certify / NMEA 0183 + Signal K only | H-04 |
| DEC-06 | PILOT investment | full safety programme / defer / partner with certified vendor | H-01, P-04 |
| DEC-07 | Hardware manufacturing model | design + contract manufacture / OEM / partner | H-05..H-08, X-05 |
| DEC-08 | Launch order | readiness-gated | all |

## 8. Recommended next steps

1. **Do not publish any commercial claim derived from this audit.** All nine products remain DEFINED,
   not sellable; MAREA remains a proposed brand.
2. **Start the ownership chain now** (DEC-01): assignment/waiver from `mgonzalezv` including employer
   position, ownership confirmation from the TECNORIA-domain author, entity consolidation, then an
   explicit outbound licence position. This is legal work, not engineering work, and it gates everything.
3. **Commission the data/decoder/safety decisions** (DEC-02..DEC-06) before investing in those products.
4. **Build the reusable core as MAREA-owned code** where rights are clean: data contract conventions,
   device configuration, WATCH/FLEET services; integrate an unmodified Signal K server; do not copy
   OPEN-MARINE implementation until the licence decision is signed.
5. **Add the release-engineering gates** (SBOM, NOTICE bundle, licence gate, digest pinning, firmware CI)
   in prompt 32, before any distribution.
6. **Next planned milestone: MC-03 — brand architecture and legal clearance policy** (displaced from
   prompt 02 by decision D-001). It must cover MAREA trademark clearance and legal identity, and can
   run in parallel with the ownership work above; it must not publish brand assets as registered.

## 9. Explicit non-assertions

- No MAREA product is legally cleared, certified, approved, type-approved or commercially available.
- No NMEA 2000 / NMEA 0183 compliance or certification claim; no official ENC or ECDIS claim.
- No sea-trial, bench, EMC, environmental or conformity evidence exists for any hardware family.
- No price, stock, delivery, supplier quote or data agreement is asserted or invented.
- No licence file was added to OPEN-MARINE; no OPEN-MARINE code was copied into EMBARCARTE.
- MC-01 remains `PARTIAL`; the AI image-generation blocker remains open.

## 10. Audit conclusion

**The technology is real; the rights, data and safety evidence are not yet.** EMBARCARTE can reuse a
substantial part of the OPEN-MARINE engineering foundation to accelerate MAREA, but only after
ownership consolidation and an explicit licensing position — and the customer-facing products depend
on licensed data, certified hardware and independent safety validation that no amount of reuse
provides. MC-02 is complete as an audit (inventory, provenance, licensing, data rights, hardware,
product mapping and architecture all evidenced); the commercial programme remains gated by the
blockers recorded in `MC-02-BLOCKERS-AND-DECISIONS.md`.
