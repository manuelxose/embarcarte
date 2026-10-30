# MC-02 — Blockers and decisions register

| Field | Value |
| --- | --- |
| Document ID | MC-02 / BLOCKERS-AND-DECISIONS |
| Milestone | MC-02 — technology, IP, licensing and commercial-reuse audit |
| Programme | EMBARCARTE / MAREA (36 Master Prompts) |
| Date | 2026-10-30 |
| Subject revision | OPEN-MARINE `manuelxose/open-marine` @ `403941b8860439115418b1786d8431284d2dae08` (main) |
| Evidence base | `OPEN-MARINE-CAPABILITY-INVENTORY.md` (A), `INTELLECTUAL-PROPERTY-CHAIN.md` + `SOFTWARE-LICENSE-INVENTORY.csv` + `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` (B), `MARINE-DATA-RIGHTS-MATRIX.csv` (C), `HARDWARE-COMPLIANCE-MATRIX.md` (D), `MAREA-PRODUCT-REUSE-MAP.md` + `MAREA-COMMERCIAL-ARCHITECTURE.md` (E) |
| Owner | Lead (Technical Program Director) |
| Nature | Actionable register. Not a legal opinion, not a clearance certificate, not a quotation |

## How to read this register

- **ID prefixes:** `L` legal ownership/IP, `S` software licensing/supply chain, `D` marine data/chart rights,
  `H` hardware/safety/certification, `P` product readiness, `X` commercial/operational/external.
- **Severity:** `CRITICAL` blocks every commercial release; `HIGH` blocks the named product or claim;
  `MEDIUM` blocks a specific distribution model or milestone; `LOW` is a hygiene/process item.
- **Status:** `OPEN` (no owner decision yet), `BLOCKED` (needs an external document, permission,
  credential, measurement or agreement), `LEGAL_REVIEW_REQUIRED` (needs qualified counsel),
  `DECIDED` (decision recorded, with reference).
- **Responsible role:** a function, not a person. The company must name a human owner for each.
- **Milestone** references the *revised* registry positions after decision D-001:
  03 brand/legal, 04 identity, 05–07 product definitions, 08 bundles, 09 market evidence,
  10 customer discovery, 11 hardware BOM/conformity, 12 unit economics, 13 financial model,
  14 legal/commercial risk, 15 IA/SEO, 16 data model, 17 design system, 18 landing, 19 segments,
  20–22 catalog, 23 bundle comparison, 24 configurator, 25 SKU readiness, 26 checkout, 27 portal,
  28 support/RMA, 29–31 assets, 32 OPEN-MARINE contracts, 33–35 verification, 36 release.
- A blocker is closed only by its stated evidence. An audit finding or an AI agent's agreement is not
  a substitute for a licence, an assignment, a certificate, a measurement or a signed term.

## 1. Legal ownership and IP

| ID | Product/component | Blocker | Severity | Evidence | Required decision | Responsible role | Possible remediation | Status | Milestone |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| L-01 | OPEN-MARINE (whole repository) | Public repository with no `LICENSE`/`COPYING`/`NOTICE`; GitHub reports `license: null`. Default copyright grants EMBARCARTE no inbound reuse right and grants customers no outbound right. | CRITICAL | `INTELLECTUAL-PROPERTY-CHAIN.md` §0.1, §2; GitHub API retrieval 2026-10-30 | Choose the outbound licence position (proprietary baseline vs permissive vs source-available) and record it in writing | Company owner + counsel | Complete the assignment chain first; then adopt an explicit proprietary position for MAREA products; no `LICENSE` file added in MC-02 (D-002) | BLOCKED | 03 + 32 |
| L-02 | 495 of 1,033 current files (47.9%) | Files last touched by `mgonzalezv@eservicios.indra.es`; no contributor assignment, no CLA/DCO, and the employer relationship behind the domain is undocumented. | CRITICAL | `INTELLECTUAL-PROPERTY-CHAIN.md` §3.3, D-02 | Obtain a written IP assignment/waiver (and employer confirmation if applicable) before any commercial use | Company owner + contributor + counsel | Contributor agreement; employment/consulting contract review; freeze new work in disputed files until cleared | BLOCKED | 03 + 32 |
| L-03 | 534 of 1,033 current files (51.7%) | Files last touched by `oficina@tecnoriasl.com` (company-style domain) while custody is a personal GitHub account; ownership between the individual, TECNORIA and EMBARCARTE is not documented in the repository. | CRITICAL | `INTELLECTUAL-PROPERTY-CHAIN.md` §0.3, D-03/D-04 | Confirm which legal entity owns the code and execute assignment/licence to EMBARCARTE | Company owner + counsel | Corporate IP schedule; assignment to EMBARCARTE; repository transfer to an EMBARCARTE-controlled organisation | BLOCKED | 03 + 32 |
| L-04 | Git provenance before 2026-01-27 | The root commit `281ba95` already contains 204 files; pre-history provenance (whether code was copied from another project) is undocumented. | HIGH | `INTELLECTUAL-PROPERTY-CHAIN.md` §0.4, R-IP-12 | Contributor declaration of original authorship or disclosure of source | Engineering + counsel | Written provenance declaration; code-scan comparison against public sources | OPEN | 32 |
| L-05 | AI-assisted code and assets | 5 commits authored by `Claude <noreply@anthropic.com>` and AI agent branches; no AI-tool usage policy, no asset provenance for 3 WAV files and other media. | HIGH | `INTELLECTUAL-PROPERTY-CHAIN.md` §0.6, D-05/D-07 | Adopt an AI provenance and asset-rights policy; document tool terms | Engineering + counsel + design | AI-use register; replace unprovenanced assets; record model/tool terms | OPEN | 03 + 14 |
| L-06 | Release notices | No `NOTICE` bundle exists for the 1,034-row inventory, although Apache-2.0 (38 rows), CC-BY (3), BlueOak (13) and public-domain components require notice/attribution in external distributions. | HIGH | `SOFTWARE-LICENSE-INVENTORY.csv`; `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` | Approve and automate a third-party notices bundle | Engineering | Generate NOTICE from the inventory; gate releases on it | OPEN | 32 |
| L-07 | Public Git history | 3,843 cached provider tiles (OpenWeatherMap 1,038, OpenSeaMap 846, GEBCO 681, NOAA 555, EMODnet 525, IHM 198) and Signal K configuration remain retrievable in public history after de-tracking. | MEDIUM | `INTELLECTUAL-PROPERTY-CHAIN.md` §4.8, R-IP-07 | Decide history rewrite vs notice/retention position | Company owner + counsel | Legal assessment of each provider's terms; history rewrite only with authorization | LEGAL_REVIEW_REQUIRED | 03 + 32 |
| L-08 | Contributor governance | No `CONTRIBUTING`, CLA, DCO or `Signed-off-by` policy for future contributions. | MEDIUM | `INTELLECTUAL-PROPERTY-CHAIN.md` §4.2; D-12 | Adopt contributor IP policy before accepting external code | Engineering + counsel | DCO/CLA on future PRs; `.mailmap` | OPEN | 32 |
| L-09 | OPEN-MARINE naming | "Open Marine Instrumentation"/"OMI" has no trademark record in the repository; custody is a personal account. | MEDIUM | `INTELLECTUAL-PROPERTY-CHAIN.md` §0.10, D-09 | Decide whether OMI is an internal codename or a commercial name | Company owner + counsel | Trademark search if used commercially; otherwise keep internal | OPEN | 03 |

## 2. Software licensing and supply chain

| ID | Product/component | Blocker | Severity | Evidence | Required decision | Responsible role | Possible remediation | Status | Milestone |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S-01 | AIS-catcher (GPL-3.0) | Downloaded or compiled at setup time and intended to run inside the appliance; shipping it triggers GPL-3.0 source-provision, notice and combined-work analysis. Version is not pinned and the download has no checksum. | HIGH | `SOFTWARE-LICENSE-INVENTORY.csv` row AIS-catcher; `HARDWARE-COMPLIANCE-MATRIX.md` §4.4/§4.5 (R-04); `scripts/init.sh:726-800`, `scripts/init.ps1:411-505` | Choose: ship AIS-catcher with full GPL compliance, or replace it, or keep it user-installed with a documented separation | Engineering + counsel | Written offer + source bundle; or permissive decoder; or installer download model; pin version and hash | LEGAL_REVIEW_REQUIRED | 11 + 32 |
| S-02 | Docker image build | `marine-tile-server/Dockerfile` is not multi-stage, so GPL-3.0 `make`/`g++` tools remain inside the distributed image. | MEDIUM | `INTELLECTUAL-PROPERTY-CHAIN.md` §0.7; `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` | Convert to multi-stage build and re-inventory the final image | Engineering | Multi-stage Dockerfile; image SBOM; notices | OPEN | 11 + 32 |
| S-03 | `copernicusmarine` Python client | EUPL-1.2 optional operator tooling; distribution footprint depends on whether the Python environment is shipped. | MEDIUM | `SOFTWARE-LICENSE-INVENTORY.csv` (Python rows); `requirements-copernicus.txt` unpinned | Decide whether Python tooling ships or stays build/operator-only | Engineering + counsel | Keep tooling out of shipped images; pin versions/hashes | OPEN | 11 |
| S-04 | `@mapbox/jsonlint-lines-primitives` | No licence metadata found in lockfile or registry; status UNKNOWN in the inventory. | MEDIUM | `SOFTWARE-LICENSE-INVENTORY.csv` (unknown = 1); `INTELLECTUAL-PROPERTY-CHAIN.md` gap | Replace the package or obtain licence clarification | Engineering | Replace with a licensed JSON linter or remove if build-only | OPEN | 32 |
| S-05 | 997 npm components / 13 Python / platform stack | No repository licence gate, no SBOM generation in CI, no NOTICE enforcement; 798 of 1,034 inventory rows are build-only but that split is not encoded in tooling. | HIGH | `SOFTWARE-LICENSE-INVENTORY.csv`; `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` §release gate | Add a licence/SBOM gate to the release pipeline before first commercial distribution | Engineering | CycloneDX/SPDX generation; allowlist; notice bundle; CI check | OPEN | 32 + 36 |
| S-06 | Signal K container image | Pinned by mutable tag `signalk/signalk-server:v2.22.1`, not by digest; image-level package licences not enumerated. | MEDIUM | `signalk-runtime/docker-compose.yml:3`; `INTELLECTUAL-PROPERTY-CHAIN.md` R-IP-10 | Pin digest, review image SBOM and Apache-2.0 NOTICE obligations | Engineering | Digest pin; image scan; licence notice retention | OPEN | 32 |
| S-07 | External binary acquisition | AIS-catcher and pip packages installed without hash/signature verification; CI actions and images are unpinned in places. | MEDIUM | `HARDWARE-COMPLIANCE-MATRIX.md` R-09; `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` | Adopt a binary/package integrity policy | Engineering | SHA-256 manifests; lockfiles with hashes; pinned digests | OPEN | 11 + 32 |
| S-08 | First-party workspace licensing | Seven of eight `package.json` files declare no licence (all except `marine-tile-server`, which declares `ISC`) and six of eight are marked `private: true`, creating an inconsistent signal. | HIGH | `INTELLECTUAL-PROPERTY-CHAIN.md` R-IP-01; `SOFTWARE-LICENSE-INVENTORY.csv` first-party rows | Reconcile the workspace licence declarations with the chosen outbound position | Company owner + engineering | Remove stray ISC or make it deliberate; consistent metadata after L-01 decision | OPEN | 03 + 32 |
| S-09 | Firmware stack | MicroPython (MIT) runtime and Python dependencies are not pinned; no firmware manifest; `rp2` third-party notices must ship with any firmware image. | MEDIUM | `HARDWARE-COMPLIANCE-MATRIX.md` §4.4 (R-11); `SOFTWARE-LICENSE-INVENTORY.csv` firmware rows | Create a firmware manifest and pin the runtime/toolchain | Engineering | `mpremote`/version manifest; notices; reproducible firmware build | OPEN | 11 |

## 3. Marine data, chart and weather rights

| ID | Product/component | Blocker | Severity | Evidence | Required decision | Responsible role | Possible remediation | Status | Milestone |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D-01 | NAV / DISPLAY official charts | No IHM/IHPT ENC distributor or OEM agreement; no S-63/OEM status. NAV cannot claim official charts, offline official regions or ECDIS-like status. | CRITICAL | `MARINE-DATA-RIGHTS-MATRIX.csv` rows MD-08..MD-12, MD-27 | Decide whether official ENC licensing is pursued (costly) or NAV stays "licensed-chart-capable" with user-supplied charts | Product + counsel | IC-ENC/IHM/IHPT distributor agreement; OEM S-63 status; per-cell permits and end-user EULA | BLOCKED | 03 + 11 + 20 |
| D-02 | Chart source catalogue | Repo labels CNIG/IHM MBAR bathymetry as `CC BY 4.0` (`chart-source-catalog.ts:154`) but the provider product is CC-BY-NC 4.0 and not for navigation. The label is wrong. | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv` MD-06/MD-27 notes; `marine-chart-engine/src/catalog/chart-source-catalog.ts:146-158` | Correct the label and remove MBAR from any commercial/navigation claim; legal confirmation of MBAR terms | Engineering + counsel | Rename/relabel source; block commercial bundling; keep manual import only if terms allow | OPEN | 20 + 32 |
| D-03 | NAV offline charts | OSM standard tile service policy forbids bulk/offline prefetch and warns commercial access can be withdrawn; product code includes offline chart download/caching. | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv` MD-02; `marine-instrumentation-ui` chart sync/caching code | Replace OSM tile dependency for paid offline features with licensed/self-hosted tiles | Product + engineering | Self-hosted tile stack; licensed provider; OpenSeaMap/EMODnet/Natural Earth where terms allow | OPEN | 20 + 32 |
| D-04 | WEATHER | Open-Meteo free API is non-commercial only; subscriptions require the paid customer API or self-hosting (server is AGPL-3.0); data is CC BY 4.0 with attribution. | CRITICAL | `MARINE-DATA-RIGHTS-MATRIX.csv` MD-15 | Choose paid plan, self-hosted AGPL server, or a different licensed provider; budget required | Product + finance + engineering | Written provider terms/quote; self-hosting compliance analysis | BLOCKED | 11 + 12 + 21 |
| D-05 | WEATHER / NAV overlays | OpenWeather map/tile layers are a separate paid SKU; an ordinary API key does not cover tile endpoints; no sublicensing or resale. | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv` MD-20 | Purchase the correct tier or remove the layer | Product + finance | Provider quote; entitlement mapping per product | BLOCKED | 12 + 21 |
| D-06 | NAV / DISPLAY basemap | Esri World Imagery tiles are fetched from `server.arcgisonline.com` without an ArcGIS account; no documented licensed path for a commercial product. | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv` MD-21; repository map source config | Remove or license the layer | Engineering + counsel | Replace with openly licensed basemap or obtain Esri terms | LEGAL_REVIEW_REQUIRED | 20 + 32 |
| D-07 | WEATHER (Galicia/Atlantic) | MeteoGalicia legal notice was unreachable during the audit; Puertos del Estado warns against third-party transfer without authorization; AEMET says NWP outputs are not open data. | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv` MD-16..MD-19; `open-marine/docs/marine-data-sources.md` | Obtain written terms for each public-sector provider used | Product + counsel | Written authorizations; contractual data agreements; fallback providers | BLOCKED | 12 + 21 |
| D-08 | NAV bathymetry | GEBCO terms allow commercial use but explicitly forbid navigation use; EMODnet bathymetry is not a nautical chart. | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv` MD-04, MD-06 | Restrict these layers to informational/contextual use with disclaimers | Product + engineering | UI disclaimers; provenance labels; exclude from navigation-grade claims | OPEN | 20 |
| D-09 | AIS / FLEET | Redistribution of AIS-derived traffic (history, fleet sharing) is not established; AIS reception is receive-only and may not be presented as collision avoidance or transponder capability. | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv` MD-24; `HARDWARE-COMPLIANCE-MATRIX.md` §4.6 | Decide AIS data retention/redistribution policy before FLEET/WATCH features | Product + counsel | Retention limits; no public redistribution; receive-only claims | LEGAL_REVIEW_REQUIRED | 22 + 27 |
| D-10 | All products with external data | 11 of 28 provider rows remain LEGAL_REVIEW_REQUIRED (IHM, CartoCiudad, AEMET NWP, MeteoGalicia, Puertos, Esri, AIS-derived data, official ENC licensing). | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv` classification counts | Close each row with a written term or remove the dependency | Product + counsel + data owners | Provider-by-provider clearance register | BLOCKED | 12 + 20–22 |

## 4. Hardware, safety and certification

| ID | Product/component | Blocker | Severity | Evidence | Required decision | Responsible role | Possible remediation | Status | Milestone |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| H-01 | MAREA PILOT | Commercialisation safety gate BLOCKED: no physical bench evidence, no sea trial, no independent verification, no conformity assessment. Software safety logic is PARTIAL; the control plane is unauthenticated and has no rudder feedback/takeover detection. | CRITICAL | `HARDWARE-COMPLIANCE-MATRIX.md` §3.7 | Do not sell or pre-sell PILOT; fund a staged safety programme | Product + engineering + safety | Bench test campaign → HIL → supervised sea trials → independent review → conformity | BLOCKED | 11 + 22 + 35 |
| H-02 | HUB / PILOT on-board runtime | Autopilot HTTP command API is unauthenticated, binds `0.0.0.0`, CORS `*`; `estop`, `drive-test`, `engage`, `tuning` reachable from the LAN. | CRITICAL | `OPEN-MARINE-CAPABILITY-INVENTORY.md` §7 G2 | Require authentication/authorization and network binding policy before any field use | Engineering | Local auth, loopback bind, capability tokens, command audit, safety interlock | OPEN | 11 + 32 + 34 |
| H-03 | PILOT motor link | Documentation/systemd specify `/dev/ttyAMA0` UART, while Pico firmware reads USB CDC stdin and HIL/production scripts use the USB by-id device. The motor link is contradictory. | HIGH | `OPEN-MARINE-CAPABILITY-INVENTORY.md` §7 G3 | Resolve the physical/electrical interface and document it as the controlled design | Engineering | Single documented interface; commissioning validation | OPEN | 11 + 35 |
| H-04 | HUB / SENSE / DISPLAY / AIS | NMEA 2000 is not implemented (type stubs only); NMEA's official position requires certification/licence/manufacturer/product codes for products that read or transmit NMEA 2000. No claim may be made. | HIGH | `HARDWARE-COMPLIANCE-MATRIX.md` §4.1–§4.2, R-02 | Decide whether to license NMEA 2000 and certify, or support NMEA 0183/Signal K only | Product + engineering + counsel | NMEA membership/licence, Manufacturer Code, Product Code, certification; or scope reduction | BLOCKED | 11 + 32 |
| H-05 | All hardware families | No physical build, measurement, environmental or EMC evidence exists in either repository; 13 components identified plus 3 required-but-absent, only one with an exact manufacturer part number, none with a board revision. | CRITICAL | `HARDWARE-COMPLIANCE-MATRIX.md` §1.1, §2 | Build and test physical prototypes before any hardware claim | Engineering + hardware | Prototype BOM, bench measurements, EMC pre-scan, thermal/ingress tests | BLOCKED | 11 + 34 |
| H-06 | HUB, AIS, SENSE, WATCH, DISPLAY | CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA obligations are not started; no EU declaration of conformity, test report or notified-body certificate exists. CRA applicability dates and product classification need confirmation. | HIGH | `HARDWARE-COMPLIANCE-MATRIX.md` §5 (33 CLEARLY_APPLICABLE, 10 POTENTIALLY_APPLICABLE) | Commission a conformity programme per product family | Compliance engineer + engineering | Applicability review, harmonised standards, accredited lab, technical file, DoC | NOT_YET_ASSESSABLE | 11 + 34 |
| H-07 | All hardware | No BOM, supplier quotes, manufacturing or traceability evidence; Raspberry Pi/Pico and third-party module supply and trademark use not assessed for production. | HIGH | `HARDWARE-COMPLIANCE-MATRIX.md` §2; `MAREA-PRODUCT-REUSE-MAP.md` | Obtain real BOM/quotes; confirm manufacturer terms and lifecycle | Hardware + procurement | RFQs, distributor terms, lifecycle commitments | BLOCKED | 11 + 12 |
| H-08 | AIS receiver hardware | Receive-only AIS requires RF/EMC/radio conformity and antenna/splitter considerations; no receiver hardware or certification evidence exists. | HIGH | `HARDWARE-COMPLIANCE-MATRIX.md` §2, §5 | Select certified receiver module or run own conformity programme | Hardware + compliance | Module with existing CE/RED evidence; system-level assessment | BLOCKED | 11 + 34 |
| H-09 | Test/commissioning tooling | The "isolated" test bench is not isolated by default (production `:3000`/`:3990`); documentation claims isolation; simulation assertions are stored but never evaluated. | HIGH | `OPEN-MARINE-CAPABILITY-INVENTORY.md` §7 G1, G8 | Fix the harness isolation before using it as safety evidence | Engineering | Correct ports, separate network namespace, assertion evaluation, mandatory isolation flag | OPEN | 32 + 34 |
| H-10 | Firmware safety | No hardware watchdog, no relay output, no rudder/end-stop enforcement; E-stop concept is GPIO-level but no physical evidence; firmware not in CI. | CRITICAL | `HARDWARE-COMPLIANCE-MATRIX.md` §3.2–§3.4 | Hardware-safe design review and independent verification | Engineering + safety | Hardware watchdog, fail-closed relay, end-stop inputs, CI for firmware, FMEA | BLOCKED | 32 + 35 |
| H-11 | DISPLAY / SENSE / WATCH | No display, sensor or cellular/WATCH hardware exists in the repository; only documented concepts. | HIGH | `OPEN-MARINE-CAPABILITY-INVENTORY.md` §5; `HARDWARE-COMPLIANCE-MATRIX.md` §2 | Select hardware platforms and validate them physically | Hardware | Supplier evaluation, prototype, environmental test | BLOCKED | 11 + 34 |
| H-12 | WATCH / FLEET connectivity | No connectivity hardware or SIM/roaming contract; recurring data cost and coverage are unquantified. | MEDIUM | `COMMERCIAL-PORTFOLIO.md` §06–§09; `MAREA-COMMERCIAL-ARCHITECTURE.md` | Choose connectivity model and obtain real terms | Product + procurement | MVNO/roaming quotes; coverage validation; cost model | BLOCKED | 11 + 12 |
| H-13 | Network-connected products (HUB, WATCH, DISPLAY, FLEET) | Cyber Resilience Act obligations: reporting obligations already apply from 2026-09-11 and main obligations from 2027-12-11; no vulnerability handling, secure update process, SBOM or incident reporting exists. | HIGH | `HARDWARE-COMPLIANCE-MATRIX.md` §5.1, C-08 | Design CRA-compliant vulnerability handling and update lifecycle before market placement | Engineering + compliance + counsel | Security-by-design process, coordinated vulnerability disclosure, update policy, SBOM, conformity assessment route | BLOCKED | 11 + 34 + 36 |

## 5. Product readiness

| ID | Product/component | Blocker | Severity | Evidence | Required decision | Responsible role | Possible remediation | Status | Milestone |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P-01 | NAV | Reusable navigation UI and chart processing exist, but no official chart rights, no offline licensing, no tested instrument integration, no ECDIS/ENC claims possible. | HIGH | `MAREA-PRODUCT-REUSE-MAP.md` NAV; `OPEN-MARINE-CAPABILITY-INVENTORY.md` §5 | Approve NAV scope as "licensed-chart-capable" and define supported chart sources | Product | Chart rights (D-01..D-03), compatibility matrix, acceptance tests | REUSE-CONDITIONAL | 20 + 33 |
| P-02 | HUB | Architecture and data contract are reusable; no product hardware, no certified interfaces, unauthenticated control plane. | HIGH | `MAREA-PRODUCT-REUSE-MAP.md` HUB; `HARDWARE-COMPLIANCE-MATRIX.md` §2 | Freeze HUB hardware design and supported protocol matrix | Product + hardware | Prototype, certification, security hardening | BLOCKED | 11 + 34 |
| P-03 | AIS | AIS receive pipeline is external (AIS-catcher GPL-3.0); no bundled binary, no receiver hardware, no RF certification; receive-only restriction. | HIGH | `SOFTWARE-LICENSE-INVENTORY.csv`; `HARDWARE-COMPLIANCE-MATRIX.md` §4.4 | Decide decoder licensing strategy and receiver module | Product + engineering | GPL-compliant distribution or replacement; certified receiver | BLOCKED | 11 + 34 |
| P-04 | PILOT | Safety gate BLOCKED (H-01..H-03, H-10); no sea trials; no conformity; independent watchdog/E-stop not physically proven. | CRITICAL | `HARDWARE-COMPLIANCE-MATRIX.md` §3.7 | Do not offer PILOT for sale; fund safety programme | Product + engineering | See H-01 remediation | BLOCKED | 22 + 35 |
| P-05 | SENSE | No sensor product exists; only generic sensor adapters and wind/IMU publishing. | HIGH | `OPEN-MARINE-CAPABILITY-INVENTORY.md` §3.2; `HARDWARE-COMPLIANCE-MATRIX.md` §2 | Define sensor SKUs and validate measurement accuracy/calibration | Product + hardware | Sensor selection, calibration, environmental tests | BLOCKED | 11 + 34 |
| P-06 | WATCH | Remote monitoring foundation NOT_FOUND; no cloud telemetry service, no device identity/ownership transfer, no mobile app. | HIGH | `OPEN-MARINE-CAPABILITY-INVENTORY.md` §5 (NOT_FOUND); `MAREA-COMMERCIAL-ARCHITECTURE.md` | Build WATCH as new development, not reuse | Product + engineering | New service, secure device identity, alerting, privacy model | BUILD | 27 + 34 |
| P-07 | DISPLAY | No display hardware or enclosure; UI is a browser application, not an embedded MFD runtime. | HIGH | `OPEN-MARINE-CAPABILITY-INVENTORY.md` §3.4; `HARDWARE-COMPLIANCE-MATRIX.md` §2 | Choose display hardware and kiosk/embedded runtime strategy | Product + hardware | Hardware selection, embedded runtime, sunlight/ingress testing | BLOCKED | 11 + 34 |
| P-08 | WEATHER | Data rights blocked (D-04..D-07); provider adapters exist for Open-Meteo/Copernicus/EMODnet only in partial form; no forecast accuracy validation. | HIGH | `MARINE-DATA-RIGHTS-MATRIX.csv`; `open-marine/docs/marine-data-sources.md` | Choose licensed data provider and product entitlement model | Product + finance | Provider contracts, forecast evaluation in pilot geography | BLOCKED | 12 + 21 + 33 |
| P-09 | FLEET | No multi-tenant SaaS, no tenant isolation, no telemetry ingestion, no billing/entitlements in EMBARCARTE. | HIGH | `MAREA-COMMERCIAL-ARCHITECTURE.md`; `MC-01-BASELINE.md` §8 | Build FLEET on the commercial platform with strict tenant isolation | Product + engineering | New SaaS domain model, authz, billing, data processing terms | BUILD | 27 + 35 |
| P-10 | All nine products | Engineering reuse status is inventory-level; 10 capabilities are IMPLEMENTED_NOT_FULLY_TESTED, 1 SIMULATED_ONLY, 3 NOT_FOUND; Node/TypeScript tests unexecuted (214 unit + 3 Playwright NOT_VERIFIED). | HIGH | `OPEN-MARINE-CAPABILITY-INVENTORY.md` §5, §6 | Establish a reproducible build/test environment for any reused module | Engineering | `npm ci` in isolated env, CI parity, test report per module | OPEN | 32 + 33 |

## 6. Commercial, operational and external

| ID | Product/component | Blocker | Severity | Evidence | Required decision | Responsible role | Possible remediation | Status | Milestone |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| X-01 | MAREA brand | MAREA is a proposed brand; trademark clearance not performed; an existing "Marea Marine" is a risk signal, not an infringement finding. Nothing may be published as registered. | HIGH | `MC-01-DELIVERY.md` §10.2; `COMMERCIAL-PORTFOLIO.md` | Commission EUIPO/OEPM clearance before brand publication | Company owner + counsel | Trademark search and filing | BLOCKED | 03 |
| X-02 | Corporate identity | `SITE.legal` (tax id, address, registry) is empty; cannot be invented; legal pages stay incomplete. | HIGH | `MC-01-BASELINE.md` evidence 25; `src/app/core/site.config.ts:20-26` | Provide verified legal identity data | Company owner | Company registration data | BLOCKED | 03 + 26 |
| X-03 | AI image generation | No image-generation capability or credential; no written budget authorization. All MAREA visuals remain BLOCKED; MC-01 stays PARTIAL. | HIGH | `MC-01-DELIVERY.md` §7; `ASSET-PIPELINE.md` §10 | Written budget authorization + provider credential + commercial-use confirmation | Company owner | Human authorization, then one pilot asset | BLOCKED | 29 |
| X-04 | Release governance | `main` is unprotected and `deploy.yml` deploys on any push to `main`; no environment approvals; rollback/backup/monitoring not fully verified. | HIGH | `.github/workflows/deploy.yml:3-7`; `MC-01-DELIVERY.md` §10.4 | Authorize branch protection and environment reviewers before any merge | Company owner + engineering | Branch protection; required approvals; deployment gate | OPEN | 36 |
| X-05 | Costs and economics | No real BOM, supplier quotes, data-provider prices, connectivity costs or channel terms; no fabricated figures are introduced by this audit. | HIGH | `COMMERCIAL-PORTFOLIO.md` pricing hypotheses; `MC-02-DELIVERY.md` | Commission real quotes and unit economics | Finance + procurement | RFQs, data quotes, channel terms | BLOCKED | 11 + 12 |
| X-06 | Customer evidence | No primary customer interviews, no installer/distributor terms, no validated willingness to pay. | MEDIUM | `M00-DISCOVERY-BASELINE.md`; registry prompt 10 | Run discovery before committing product investment | Product + sales | Structured interviews, pilot customers | BLOCKED | 09 + 10 |
| X-07 | Security and privacy | No device identity, provisioning, ownership transfer or incident-response model; remote monitoring and fleet telemetry would process vessel positions. | HIGH | `MAREA-COMMERCIAL-ARCHITECTURE.md`; `MC-01-BASELINE.md` security section | Define device identity and privacy/security architecture before WATCH/FLEET build | Engineering + DPO/counsel | Threat model, DPIA, secure boot/update, key management | OPEN | 27 |

## 7. Decisions required (human/legal), not resolvable by agents

| # | Decision | Options | Blocking IDs | Owner |
| --- | --- | --- | --- | --- |
| DEC-01 | OPEN-MARINE ownership and outbound licence | (a) proprietary baseline after assignments; (b) permissive; (c) source-available/dual | L-01..L-04, S-08 | Company owner + counsel |
| DEC-02 | Whether official navigation ENC distribution is pursued | (a) pursue IC-ENC/IHM/IHPT OEM; (b) user-supplied charts only; (c) partner with chart provider | D-01, P-01 | Company owner + product |
| DEC-03 | Weather data acquisition model | (a) paid provider; (b) self-hosted AGPL server; (c) partner | D-04, D-07, P-08 | Company owner + product + finance |
| DEC-04 | AIS decoder strategy | (a) GPL-compliant AIS-catcher distribution; (b) replacement decoder; (c) user-installed | S-01, P-03 | Engineering + counsel |
| DEC-05 | NMEA 2000 participation | (a) license + certify; (b) NMEA 0183/Signal K only | H-04 | Company owner + product |
| DEC-06 | PILOT investment and safety programme | (a) fund full staged programme; (b) defer product; (c) partner with certified autopilot vendor | H-01, P-04 | Company owner |
| DEC-07 | Hardware manufacturing model | (a) design + contract manufacture; (b) OEM/white-label; (c) partner | H-05..H-08, X-05 | Company owner |
| DEC-08 | Product launch order after readiness gates | data-driven; no product before its gate | All | Company owner |

## 8. Milestone dependency consequences (revised registry)

- **Prompts 05–07 (product definitions)** may be written from this audit but must not assert availability,
  certification, chart inclusion or data rights.
- **Prompt 08 (bundles)** and **prompts 20–24 (catalog, bundles UI, configurator)** are blocked from
  purchasable states by L-01..L-03, D-01..D-04, H-01..H-06 and X-05.
- **Prompt 11 (BOM/conformity)** is the natural home for H-04..H-08 and X-05; it depends on D-01, D-04 and S-01.
- **Prompt 12 (unit economics)** depends on real provider/connectivity quotes (D-04, D-05, H-12, X-05).
- **Prompt 14 (legal/commercial risk)** should absorb L-06..L-09, D-09, X-07.
- **Prompt 32 (OPEN-MARINE contracts)** must produce the interface contracts and safety boundaries that
  H-02, H-09, H-10, S-05 and P-10 require.
- **Prompts 33–35 (verification)** can only PASS with physical/sea-trial evidence; otherwise they stay BLOCKED.
- **Prompt 36 (release)** cannot PASS while X-01..X-04 remain open.

## 9. Register summary (as recorded on 2026-10-30)

| Category | Count | CRITICAL | HIGH | MEDIUM | LOW |
| --- | ---: | ---: | ---: | ---: | ---: |
| Legal ownership and IP (L) | 9 | 3 | 3 | 3 | 0 |
| Software licensing and supply chain (S) | 9 | 0 | 3 | 6 | 0 |
| Marine data, chart and weather rights (D) | 10 | 2 | 8 | 0 | 0 |
| Hardware, safety and certification (H) | 13 | 4 | 8 | 1 | 0 |
| Product readiness (P) | 10 | 1 | 9 | 0 | 0 |
| Commercial, operational and external (X) | 7 | 0 | 6 | 1 | 0 |
| **Total** | **58** | **10** | **37** | **11** | **0** |

Status distribution: `BLOCKED` 28, `OPEN` 22, `LEGAL_REVIEW_REQUIRED` 4, `NOT_YET_ASSESSABLE` 1,
`REUSE-CONDITIONAL` 1, `BUILD` 2. The two MC-02 programme decisions D-001/D-002 are recorded in
`../execution/DECISION-LOG.md`, not as blockers.

These counts describe **audit findings**, not commercial status. A product is not made ready by closing
a document action: the underlying licence, assignment, certificate, measurement, contract or test must
exist. No product in this register is approved for public commercial availability.
