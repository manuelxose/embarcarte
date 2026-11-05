# OPEN-MARINE — Verified Capability Inventory

MC-02 Task A deliverable. Technology, implementation and test-evidence inventory of the OPEN-MARINE
repository, prepared as input to the MAREA product program. This document inventories what the
repository actually implements and what its tests actually establish. It does not issue legal
conclusions about ownership, software licences or data rights: those are covered by the companion
MC-02 documents listed in Appendix C.

## 0. Document control

| Field | Value |
|---|---|
| Document ID | MC-02-A |
| Status | FINAL — evidence snapshot at the commit below |
| Audit date | 2026-10-30 |
| Author | Agent A (repo-auditor), MC-02 audit team |
| Subject repository | `open-marine` (Open Marine Instrumentation, "OMI") |
| Subject remote | `https://github.com/manuelxose/open-marine.git` |
| Subject commit | `403941b8860439115418b1786d8431284d2dae08` (`main`, equals `origin/main`) |
| Commit metadata | `manuelxose`, Sat Oct 17 10:13:05 2026 +0200, `chore: remove the old workflow tooling references` |
| Tree state | clean (`git status --porcelain` empty), 82 commits, 1033 tracked files |
| Root licence file | none. No `LICENSE`, `COPYING` or `NOTICE` is tracked anywhere in the repository |
| Installed dependencies | none. `node_modules/` absent at repository root and in the UI workspace |
| Working-tree writes | none. The repository was inspected read-only; it was clean after all audit commands |
| Companion documents | `INTELLECTUAL-PROPERTY-CHAIN.md`, `SOFTWARE-LICENSE-INVENTORY.csv`, `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` (Task B); `MARINE-DATA-RIGHTS-MATRIX.csv` (Task C); `HARDWARE-COMPLIANCE-MATRIX.md` (Task D); `MC-02-BLOCKERS-AND-DECISIONS.md` |
| External sources consulted | none. No web request was made for this task; all provider names below are taken from repository code and configuration |

## 1. Scope, method and evidence vocabulary

### 1.1 Scope

The inventory covers the complete tracked repository: seven npm workspaces, the non-workspace
runtime/support directories (`signalk-runtime/`, `config/`, `scripts/`, `tools/`, `docs/`,
`.github/`), the Raspberry Pi deployment resources (systemd units), the Pico 2 MicroPython firmware,
and the test suites. Every material statement carries a repository-relative path with line numbers,
a commit SHA, or a command result.

### 1.2 What was and was not executed

Executed during this audit (all read-only with respect to the repository; no package install, no
build, no container, no hardware):

| Activity | Result |
|---|---|
| Git fact collection (`rev-parse`, `rev-list`, `ls-files`, `status`, `log`, `remote`) | performed; outputs in Appendix A |
| Static file inventory and line counting (Node script over `git ls-files`) | performed; outputs in Appendix A |
| JSON parse of tracked `*.json` files | 29 strict-JSON files parsed; 6 JSONC files rejected by strict JSON as expected (comments) |
| Python AST syntax check of all 23 tracked `*.py` files | 23/23 parsed OK |
| Pico 2 host-side safety tests (`test_bench_motor.py`) | 15 tests executed, all passed |
| Wind NMEA parser tests (`test_wind_nmea.py`) | 5 tests executed, all passed |
| IMU publisher/fusion tests (`test_publish_signalk.py`) | 3 tests executed, all passed |
| Repository cleanliness after Python runs (`git status --porcelain`) | empty (no bytecode written; `-B` used) |

Not executed, and therefore not evidence of success:

- Any TypeScript/Node build, lint or test (`npm run build`, `npm test`, `ng build`, `tsx --test`,
  `node --test`, Playwright). No `node_modules` exists and installing packages was out of scope.
- Any Docker Compose start (Signal K image not pulled), any chart conversion (GDAL/ogr2ogr/
  tippecanoe not invoked), any external data-provider call.
- Any hardware actuation, radio reception, I2C/UART/GPIO access or Pico 2 on-device execution.

Consequently, no Node/TypeScript capability in this document is marked `IMPLEMENTED_AND_TESTED`.
The two capabilities marked `IMPLEMENTED_AND_TESTED` are Python host-side modules whose tests were
actually executed and passed.

### 1.3 Evidence state vocabulary

| State | Meaning in this document |
|---|---|
| `IMPLEMENTED_AND_TESTED` | Code exists and an automated test for it was executed successfully during this audit, with the scope of that test stated. |
| `IMPLEMENTED_NOT_FULLY_TESTED` | Production code exists; tests exist in the tree and/or CI configuration, but test execution could not be verified in this audit, or coverage is demonstrably partial. |
| `SIMULATED_ONLY` | The behaviour is exercised only against a simulator/mock; no physical or vessel-level validation exists in the repository. |
| `DOCUMENTED_ONLY` | A design, protocol or claim is documented without an implementation that exercises it. |
| `EXTERNAL_DEPENDENCY` | The capability is delivered by a third-party runtime, service or binary that is referenced but not vendored in the repository. |
| `EXPERIMENTAL` | Code exists but is isolated, unlaunched, unintegrated or otherwise not part of a supported runtime path. |
| `NOT_FOUND` | No implementation of the capability exists in the tracked tree; supporting interfaces or documentation may exist. |
| `NOT_VERIFIED` | The available evidence is insufficient to decide the state without executing or inspecting something outside this audit's scope. |

### 1.4 Conventions

- Line references are `path:line` or `path:start-end` relative to the repository root at the subject
  commit. Ranges are inclusive and refer to the file content at `403941b`.
- "Test cases" are counted by matching `test(`/`it(` declarations in test files; they were not
  executed unless explicitly stated.
- The workspace under audit is Open Marine Instrumentation. Its naming ("OMI") is retained in
  citations; it is not the MAREA product brand.
- Nothing in this document should be read as a licence grant, a fitness statement, a navigation
  certification or a vessel-validation claim.

## 2. Repository identity and topology

### 2.1 Identity snapshot

| Fact | Evidence |
|---|---|
| HEAD commit | `403941b8860439115418b1786d8431284d2dae08` (`git rev-parse HEAD`) |
| Commit count | 82 (`git rev-list --count HEAD`) |
| First commit | `281ba95c296c7a9ec6e40bc92984b73b2e8c31f9`, 2026-01-27, "Sitemap controller added:fix" |
| Tracked files | 1033 (`git ls-files`) |
| Working tree | clean (`git status --porcelain` empty) |
| Remote | `origin https://github.com/manuelxose/open-marine.git` |
| Root package | `package.json:2-4`: `name=open-marine`, `version=0.1.0`, `private=true` |
| Workspaces | `package.json:5-13`, seven entries |
| Root licence declarations | only `marine-tile-server/package.json:13` (`"license": "ISC"`); all other packages declare none |
| Node/npm used by CI | Node 20 (`.github/workflows/ci.yml:18,31,43,56,69,82,95,107,119,132`) |
| Node/npm on this audit host | v24.18.0 / npm 12.0.1 (not used to run project code) |
| Python on this audit host | 3.12.0 (used for the executed Python tests) |
| Docker on this audit host | 29.9.2 (present, not used) |

Static integrity observations:

- 29 strict-JSON files parse; 6 files are JSON-with-comments (`.vscode/extensions.json`,
  `.vscode/launch.json`, `.vscode/tasks.json`, `marine-instrumentation-ui/tsconfig.json`,
  `tsconfig.app.json`, `tsconfig.spec.json`) and correctly fail a strict parser.
- 23 Python files parse as valid Python 3 AST.
- No real secrets, `.env` files, PEM keys or credential files are tracked. Only
  `config/omi.env.example` and `config/raspberry.env.example` are tracked; real configuration files
  are ignored (`.gitignore:113-116` lists `config/omi.env`, `config/raspberry.env`,
  `config/charts.local.env`).
- Untracked local tooling directories `.serena/` and `.codex/` exist on this machine but are not
  tracked; they are not repository content.

### 2.2 Workspace map

| Directory | package name | Version | Entry point | Primary runtime role |
|---|---|---:|---|---|
| `marine-data-contract` | `@omi/marine-data-contract` | 0.1.0 | `src/index.ts` → `dist/index.js` | Shared types, Signal K paths, units, quality |
| `marine-sensor-gateway` | `marine-sensor-gateway` | 0.1.0 | `src/index.ts`, `src/cli.ts` | Sensor adapter contracts, AIS NMEA forwarder, Signal K publisher |
| `marine-simulation-platform` | `marine-simulation-platform` | 1.0.0 | `src/index.ts`, `src/cli/index.ts` | Scenario orchestration, bench API, SQLite persistence, Signal K publishing |
| `marine-instrumentation-ui` | `marine-instrumentation-ui` | 0.0.0 | `src/main.ts` (Angular SPA) | Chart, instruments, AIS, autopilot, alarms, settings, diagnostics |
| `marine-autopilot-engine` | `marine-autopilot-engine` | 0.1.0 | `src/cli.ts` | Control loop, state machine, safety, command API, motor backends |
| `marine-chart-engine` | `marine-chart-engine` | 0.1.0 | `src/server.ts` | Chart catalogue, import, tiles, environment/weather/tide providers |
| `marine-tile-server` | `marine-tile-server` | 1.0.0 | `src/index.ts` | Minimal MBTiles tile + metadata server |

### 2.3 Source scale (tracked TypeScript under each `src/`)

Production sources exclude `*.spec.ts`/`*.test.ts`. Line counts are physical lines, not comments or
logical statements.

| Workspace | TS files in `src/` | Production TS files | Test TS files | Production LOC | Test LOC |
|---|---:|---:|---:|---:|---:|
| `marine-data-contract` | 8 | 7 | 1 | 892 | 33 |
| `marine-sensor-gateway` | 19 | 18 | 1 | 893 | 238 |
| `marine-simulation-platform` | 22 | 22 | 0 (tests live in `tests/`) | 2985 | 0 |
| `marine-instrumentation-ui` | 463 | 445 | 18 | 75,359 | 1,415 |
| `marine-autopilot-engine` | 42 | 30 | 12 | 3,548 | 824 |
| `marine-chart-engine` | 102 | 74 | 28 | 10,224 | 1,685 |
| `marine-tile-server` | 1 | 1 | 0 | 62 | 0 |

### 2.4 Tracked-file distribution

Top-level directories (`git ls-files`):

| Directory | Files | Note |
|---|---:|---|
| `marine-instrumentation-ui` | 697 | includes 103 SCSS, 57 HTML, 39 CSS, assets |
| `marine-chart-engine` | 115 | 102 TS |
| `marine-autopilot-engine` | 58 | 42 TS, 12 Pico Python |
| `scripts` | 52 | 36 PowerShell, 15 shell, 6 mjs, 1 Python |
| `marine-sensor-gateway` | 44 | 19 TS, 11 Python, 9 systemd units |
| `marine-simulation-platform` | 28 | 22 TS, 3 test TS |
| `marine-data-contract` | 14 | 8 TS |
| `docs` | 8 | Markdown |
| root files | 6 | `README.md`, `package.json`, `package-lock.json`, `.editorconfig`, `.gitattributes`, `.gitignore` |
| `marine-tile-server` | 5 | TS, Dockerfile, lockfile, tsconfig |
| `config` | 2 | env examples |
| `.github` | 1 | `workflows/ci.yml` only |
| `signalk-runtime` | 1 | `docker-compose.yml` only |
| `tools` | 1 | `.gitkeep` only |
| `.vscode` | 1 | `settings.json` |

Extensions across the tree: `.ts` 665, `.scss` 103, `.html` 57, `.css` 39, `.ps1` 36,
`.json` 35, `.py` 23, `.sh` 15, `.md` 14, no extension 10, `.service` 9, `.mjs` 6, `.cjs` 4,
`.svg` 4, `.wav` 3, `.yml` 2, `.example` 2, `.js` 2, `.txt` 1, `.ico` 1, `.webmanifest` 1,
`.ts_snippet` 1.

### 2.5 Root command surface

The root `package.json` is the only build/test/launch aggregation point
(`package.json:14-56`). Key mappings and gaps:

| Root script | Target | Observation |
|---|---|---|
| `build` | `npm run build --workspaces` (`package.json:18`) | includes all seven workspaces |
| `test` | `npm run test --workspaces` (`package.json:28`) | `marine-tile-server` defines no `test` script (`marine-tile-server/package.json:6-10`); aggregate behaviour is therefore NOT_VERIFIED |
| `lint` / `format` | all workspaces (`package.json:35-36`) | tile server and chart engine define neither lint nor format scripts |
| `start:signalk` / `stop:signalk` / `logs:signalk` | `docker compose` in `signalk-runtime` (`package.json:37-39`) | requires Docker and the external Signal K image |
| `start:ui` | `npm run start:lan` in UI (`package.json:42`) | runs Angular dev server on `0.0.0.0:4200` (`marine-instrumentation-ui/package.json:10-11`) |
| `start:ais/imu/gps/wind/autopilot` | `scripts/start-sensor-cross-platform.mjs <sensor>` (`package.json:44-48`) | dispatches to `.ps1`/`.sh` launchers (`scripts/start-sensor-cross-platform.mjs:27-41`) |
| `start:test-bench` / `start:simulation-bench` | simulation platform `bench` (`package.json:40,49`) | one run at a time, API on 4100 |
| `start:charts` | chart engine dev (`package.json:50`) | rebuilds then runs `dist/server.js` |
| `status` | `scripts/status.mjs` (`package.json:55`) | HTTP/UDP/AIS status checks |
| absent | no `start:gateway`, no `start:tile-server`, no `test:e2e` at root | the TypeScript sensor gateway and the tile server are not launched by any root script |

### 2.6 Runtime ports and interfaces

| Component | Port / transport | Evidence | Notes |
|---|---|---|---|
| Signal K server | HTTP/WS 3000; AIS NMEA UDP 10110 | `signalk-runtime/docker-compose.yml:6-8`; `marine-data-contract` defaults | external image `signalk/signalk-server:v2.22.1` |
| Angular UI | 4200 dev; 4300 Playwright | `marine-instrumentation-ui/package.json:11`; `playwright.config.ts:12,21` | served by `ng serve`, not SSR |
| Autopilot control API | 3990 | `marine-autopilot-engine/src/config.ts:105` | binds `0.0.0.0` by default (`config.ts:106`) |
| Autopilot HIL API | 43990 (loopback only) | `scripts/pico2/hil-control.sh:12,70-71` | separate process from production |
| Simulation bench API | 4100 | `marine-simulation-platform/src/cli/index.ts:19,31,51`; `omi-test-bench.service:13` | SSE event stream on the same port |
| "Isolated bench" Signal K / autopilot | 3100 / 3991 | only `config/omi.env.example:105-106`, `docs/RASPBERRY_CONNECTION.md:45,53`, `diagnostics.page.html:198` | no code reads these variables; see gap G1 |
| Chart engine | 8088 | `marine-chart-engine/src/config.ts:62-65`; `omi-charts.service:13` | |
| Tile server | 8080 | `marine-tile-server/src/index.ts:7`; `Dockerfile:13-15` | orphaned; see 3.7 |
| Signal K delta publishing | HTTP POST + WS stream | `marine-sensor-gateway/src/publishers/signalkPublisher.ts:109-130`; `02_publish_signalk.py:267-299` | both HTTP and WS paths exist |

### 2.7 Configuration and secrets posture

- `config/omi.env.example` documents AIS (lines 5-8), IMU (11-16), GPS (19-26), wind (29-33),
  autopilot (36-73), chart engine (75-90), Signal K image (92) and Raspberry migration (94-101) and
  bench ports (104-107).
- HIL is opt-in: `AP_HIL_CONFIRM=I_UNDERSTAND_HIL_MOVES_REAL_MOTOR` is checked in
  `marine-autopilot-engine/src/config.ts:100` and enforced in `src/cli.ts:22-31`.
- The chart engine loads `CHART_ENGINE_*` secrets from a local env file or `/etc/open-marine/charts.env`
  (`marine-chart-engine/src/config.ts:18-60`); the systemd unit keeps the file optional and world
  readable only by the service user (`omi-charts.service:20-23`).
- No credentials are tracked. Scan for `api_key`/`password`/`secret`/`token` literal assignments
  found no committed values.

## 3. Workspace audits

### 3.1 `marine-data-contract`

| Field | Finding |
|---|---|
| Package | `@omi/marine-data-contract` 0.1.0, ESM, `private` not set (`package.json:2-4`) |
| Entry points | `src/index.ts` re-exports `paths`, `units`, `quality`, `types`, `simulation` — `src/index.ts:1-5` |
| Runtime deps | none; 8 dev deps (`package.json:25-34`) |
| Build/test | `tsc -p tsconfig.json`; `vitest`/`vitest run` (`package.json:17,21-23`) |
| Public API | `PATHS` const tree and `SignalKPath` union (`src/paths.ts:1-149`); `DataPoint<T>`, `SourceRef`, `normalizeTimestamp` with 2 s drift clamp (`src/types.ts:4-74`); `Position`, `Vector3`, `Attitude`, `GpsFixType`, `GpsSatelliteInfo` (`src/types.ts:76-106`); autopilot state/mode/fault/status types (`src/types.ts:108-155`); units and conversions (`src/units.ts:1-23`); `QualityFlag` lifecycle and degradation rules (`src/quality.ts:1-31`); the scenario/run/channel contract for the simulation platform (`src/simulation.ts:1-353`) |
| Internal/dead code | `src/bench.ts` (169 lines) defines a legacy `Bench*` type family but is **not** exported from `src/index.ts` and is imported by no tracked file; `src/simulation.ts` additionally carries deprecated `Bench*` aliases (`src/simulation.ts:227-353`) |
| Consumers | all other six workspaces (`@omi/marine-data-contract` in their package.json) |
| Tests | one file, `src/types.spec.ts`, 3 cases covering only `normalizeTimestamp` (`src/types.spec.ts:4-32`). Paths, units, quality and all simulation types have no tests |
| Persistence / network / hardware | none |
| Security | pure data module, no I/O |
| Monitoring | none |
| Documentation accuracy | paths mirror Signal K conventions; the `AutopilotState` doc comment (`src/types.ts:108-113`) matches the engine's published state mapping (`marine-autopilot-engine/src/engine.ts:36-45`) |
| Integration | `PATHS` is the single cross-workspace vocabulary; the UI, engine, gateway and simulator all import it |

Assessment: small, coherent contract but weakly tested. The untested `normalizeTimestamp` is used by
publishers; the quality flags define a monotonic degradation model that the UI alarm code does not
reference (see 3.4). The dead `bench.ts` module is a repository-hygiene defect, not a runtime risk.

### 3.2 `marine-sensor-gateway`

| Field | Finding |
|---|---|
| Package | `marine-sensor-gateway` 0.1.0, ESM, private (`package.json:2-5`) |
| Entry points | `src/index.ts:1-4` re-exports adapters, AIS, gateway, publishers; `src/cli.ts` is the executable (`package.json:7-9`) |
| Runtime deps | only `@omi/marine-data-contract` (`package.json:14-16`); no serial, CAN, I2C or RTL library |
| TypeScript adapters | type/interface definitions only: `SensorAdapter` (`src/adapters/base.ts:13-19`), GPS (`gps.ts:28-32`), IMU (`imu.ts:33-37`), NMEA 0183 (`nmea0183.ts:23-27`), NMEA 2000 (`nmea2000.ts:16-26`), custom serial (`custom-serial.ts:17-22`). No implementing class exists |
| Gateway implementation | `StubSensorGateway` (`src/gateway.ts:23-50`) with no adapters registered by default; CLI prints "stub running. No adapters are enabled yet." (`src/cli.ts:8`) |
| AIS implementation | `AisGateway` spawns an external `rtl_ais` binary and forwards NMEA lines over UDP or TCP (`src/ais/rtlAisGateway.ts:21-234`; forwarders `src/ais/forwarders.ts:12-148`); restart with exponential backoff 1 s→15 s (`src/ais/rtlAisGateway.ts:24,191-200`); config via `AIS_*` env (`src/ais/config.ts:40-51`) |
| Signal K publisher | HTTP POST of delta messages grouped by context, `vessels.self` normalisation (`src/publishers/signalkPublisher.ts:26-145`) |
| Configuration | `AIS_*` variables only; no config file handling |
| Tests | one file, `src/__tests__/imu-integration.test.ts`, 7 cases: type shapes, unit constants, `PATHS` string equality, publisher delta encoding. Despite the filename, it does not start an adapter or read hardware (`src/__tests__/imu-integration.test.ts:56-237`) |
| Runtime wiring | none. No root script or systemd unit launches this workspace (see 2.5); `tools/` is empty in the repository |
| External dependencies | `rtl_ais` executable is not tracked; the deployed AIS path instead uses AIS-catcher (see 4.6) |
| Security | publishes to `http://127.0.0.1:3000` by default; no authentication on Signal K delta POST |
| Monitoring | console logging, error counters in `AisGatewayStatus` (`rtlAisGateway.ts:8-16`) |
| Documentation accuracy | no workspace README; the code's AIS design (`rtl_ais`) conflicts with the deployment documentation and units (AIS-catcher) |
| Integration | only the contract and publisher patterns are consumed; the actual sensor ingestion is implemented in Python (4.7) |

Assessment: this workspace is a skeleton plus a working AIS process supervisor and Signal K delta
publisher. The advertised adapter catalogue is type-only. Its only test is a publisher/type test, not
a sensor integration test.

### 3.3 `marine-simulation-platform`

| Field | Finding |
|---|---|
| Package | `marine-simulation-platform` 1.0.0, ESM, private, exports `core/*`, `publishers/*`, `runtime/*`, `api/*`, `persistence/*`, `scenarios/*` (`package.json:2-37`) |
| Entry points | `src/index.ts`; CLI `src/cli/index.ts` with commands `bench`, `closed-loop`, `live`, `list-scenarios` (`src/cli/index.ts:22-74`) |
| Runtime deps | `@omi/marine-data-contract`, `better-sqlite3` 12.11.1 (native addon) (`package.json:50-53`) |
| Public API | `SimulationApiServer` HTTP JSON API (`src/api/server.ts:17-210`), `RunManager` execution/arm/lease/SSE (`src/runtime/run-manager.ts:31-345`), persisted `SqliteStore` (`src/persistence/sqlite-store.ts:14-466`), deterministic `SignalGenerator` (`src/core/signal-generator.ts`), publishers HTTP/WS/composite/noop (`src/publishers/`), scenario presets and wind generator (`src/scenarios/`) |
| HTTP endpoints | `GET /health`; `GET/POST /api/v2/scenarios`, `POST /api/v2/scenarios/import`, `POST /api/v2/scenarios/generate-wind`; `GET/PUT/DELETE /api/v2/scenarios/:id`, `GET .../export`; `POST /api/v2/arm`; `GET/DELETE /api/v2/runs`, `POST /api/v2/runs`; `GET/POST /api/v2/runs/:id/{injections,lease,abort,events,report,samples}` (`src/api/server.ts:39-180`) |
| Execution contract | single active run (`run-busy`, `run-manager.ts:69`); 60 s single-use arm token (`run-manager.ts:49-54,340-344`); 30 s lease renewed by operator (`run-manager.ts:141-152`); SSE event stream with keepalive (`server.ts:189-209`); reports in JSON/CSV/HTML (`run-manager.ts:181-210`) |
| Closed-loop | `ClosedLoopClient` POSTs `/sim/reset` and `/vessels/self/autopilots/_default/disengage` to an autopilot base URL (`src/runtime/closed-loop-client.ts:6-29`); defaults to `http://localhost:3990` (`src/cli/index.ts:18`) |
| Persistence | SQLite WAL database with `scenarios`, `runs`, `events`, `samples`, retention by days/bytes (`src/persistence/sqlite-store.ts:18-40`; CLI `BENCH_DB_PATH`, `BENCH_RETENTION_*` at `src/cli/index.ts:32-40`) |
| Memory store | `src/persistence/memory-store.ts` for tests/ephemeral runs |
| Tests | 3 files, 12 cases: API v2 compatibility, closed-loop-unavailable → 409, SQLite persistence, generator determinism/spatial origin/apparent-wind derivation/no motor telemetry in ordinary scenarios (`tests/unit/signal-generator.test.ts:13-125`; `tests/integration/`) |
| Security boundary | CORS `*`; no authentication on scenario CRUD; arm token is a safety interlock, not authentication (`server.ts:99-101`); one run at a time; sensitive actions are `arm`-token-gated |
| Monitoring | `/health` only; no metrics endpoint |
| Documentation accuracy | README describes a "bench runtime with ARM token, lease, event stream and sample storage" (`marine-simulation-platform/README.md:10`); the claim of an isolated bench is not enforced by the code defaults (see G1) |
| Integration | publishes to Signal K via WS publisher (path `/signalk/v1/stream`, `src/publishers/ws-publisher.ts`), consumes autopilot API in closed-loop mode; UI speaks `/api/v2/*` through `SimulationApiService` (`marine-instrumentation-ui/src/app/features/diagnostics/simulation-api.service.ts:47-134`) |

Assessment: the most complete non-UI backend. Its tests are meaningful but unexecuted here, and its
default endpoint targets are the production ports, not the documented isolated bench ports.

### 3.4 `marine-instrumentation-ui`

| Field | Finding |
|---|---|
| Package | `marine-instrumentation-ui` 0.0.0, private, `packageManager: npm@10.9.2` (`package.json:2-5`) |
| Framework | Angular 21.2.x, standalone components, `@angular/build:application` browser target with service worker (`angular.json:21-74`); no `server`/`prerender` options and no `@angular/ssr` dependency in `package.json:25-42` |
| Entry points | `src/main.ts` (browser bootstrap, dev SW cleanup), `src/app/app.config.ts` (router, HTTP, animations, SW, environment factory), 13 `loadComponent` routes plus one `loadChildren` onboarding route in `src/app/app.routes.ts:6-117` |
| Routes | `/chart` (default), `/dashboard`, `/instruments`, `/vessels`, `/alarms`, `/resources`, `/autopilot`, `/performance`, `/diagnostics` (test bench), `/system-diagnostics`, `/settings`, `/legend`, `/onboarding`, `/styleguide`; redirects `/charts`→`/chart?manager=maps`, `/widgets`→`/instruments` (`app.routes.ts:7-117`) |
| Signal K client | WebSocket via RxJS `webSocket`, 3 s retry, 40 ms buffering, self-snapshot REST seed, AIS target extraction/mapping (`src/app/data-access/signalk/signalk-client.service.ts:55-124,126-201`) |
| Autopilot client | HTTP calls to `{autopilotApiUrl}/v2/api/vessels/self/autopilots/_default/{mode,engage,disengage,target,dodge,clearFault,tuning,estop,drive-test}` (`src/app/data-access/signalk/autopilot/signalk-autopilot.service.ts:63-243`); **local fallback fabricates autopilot state in the datapoint store when the API is unreachable** (`signalk-autopilot.service.ts:245-317,363-373`) |
| Chart data access | Engine catalogue merge and `localhost:8088` rebinding (`src/app/data-access/chart/chart-sources.ts:188`; `chart-engine-api.service.ts:262-263`); style builders for OSM/OpenSeaMap/GEBCO/NOAA/IHM WMS (`chart-sources.ts:33-140`) |
| AIS analysis | Target model with MMSI class inference (`src/app/core/models/ais.model.ts:1-110`), CPA/TCPA vector calculation (`src/app/core/calculations/cpa.ts:27-101`), 250 ms coalesced target store with 10 min expiry and 30 min tracks (`src/app/state/ais/ais-store.service.ts:13-60`), CPA alarm wiring (`src/app/features/alarms/services/alarms-facade.service.ts:61-72`) |
| Instruments | Datapoint store with 30 min history ring buffers, persisted paths and position-jump filtering (`src/app/state/datapoints/datapoint-store.service.ts:12-80`), dashboard pages/panels (`src/app/features/dashboard/`), uPlot charts (`src/app/shared/components/uplot-chart/`), polar parser (`src/app/features/performance/utils/polar-parser.ts:1-170`) |
| Persistence | `localStorage` for settings/preferences/onboarding/tuning fallback; IndexedDB `omi-database` v2 for positions, datapoints, alarm history with 30-day prune (`src/app/core/storage/idb-store.service.ts:33-41`); Cache Storage in environment layer; service-worker caches (`ngsw-config.json`) |
| External network | Signal K 3000, autopilot 3990, chart engine 8088, simulation 4100; tile/weather providers as in 3.6; `vesselfinder.com` details link defaults to disabled external base URL (`vessel-enrichment.providers.ts:8-14`) |
| Tests | 18 unit spec files, 68 cases (Vitest runner declared in `package.json:21`); 2 Playwright specs, 3 cases, desktop-1440-night and tablet-1024-day projects with mocked backend routes (`playwright.config.ts:16-25`; `e2e/chart-environment.spec.ts` mocks `/environment/catalog`, `/charts`, `/catalog/*`, `/weather/*`, `/api/marine/*`, `/tides/*`) |
| Lint | `eslint . --max-warnings 347` (`package.json:18`): a deliberate 347-warning debt ceiling |
| Security | no authentication; Signal K host override persistable via query parameter/localStorage (`app-environment.token.ts:92-143`); WS URL derives protocol from page (`:145-151`) |
| Monitoring | System diagnostics page is a Signal K path table (path, value, unit, quality, age, source) (`src/app/features/system-diagnostics/system-diagnostics.page.ts:12-70`), not host/service telemetry |
| Documentation accuracy | service description claims "SSR/development server" (`omi-ui.service:2`) but there is no SSR target; README claims nginx deployment (`README.md:10`) but no nginx configuration exists in the repository |
| Integration | consumes all four HTTP services; environment URLs built from the Signal K host (`app-environment.token.ts:41-57`); chart engine URLs rebound from `localhost:8088` to the runtime host |

Assessment: the largest and most mature component by volume (75k production LOC). Its correctness is
mostly UI/state logic; only a small fraction is covered (68 unit cases, heavy route mocking in e2e).
The autopilot local fallback is a truthfulness risk: a browser with no engine connection will still
display autopilot states derived locally, without any motor control.

### 3.5 `marine-autopilot-engine`

| Field | Finding |
|---|---|
| Package | `marine-autopilot-engine` 0.1.0, ESM, private (`package.json:2-5`) |
| Entry points | `src/cli.ts` wires config, sensor source, motor backend, engine and command API (`src/cli.ts:20-132`) |
| Control core | `Engine` fixed-rate loop, read snapshot → safety → controller → motor → publish (`src/engine.ts:53-203`); optional bench world reset API (`src/engine.ts:624-646`) |
| State machine | `standby`, `heading`, `wind`, `track`, `fault`, `calibration` states with explicit transitions and latched faults (`src/app/state-machine.ts:43-166`); mode mapping (`:9-29`) |
| Controllers | PID (`src/control/pid-controller.ts`), heading (`heading-controller.ts`), wind with gust/tack/gybe hazard detection (`wind-controller.ts`), track with XTE correction and no-go sailing limit (`track-controller.ts`), angle utilities (`angle-utils.ts`) |
| Safety | pure fault evaluator with priority e-stop > overcurrent > low battery > heading loss > mode sensor loss (`src/safety/fault-manager.ts:25-69`); limit helpers (`src/safety/limits.ts`); software watchdog (`src/safety/watchdog.ts:8-58`) |
| Command API | Node `http` server, CORS `*`, binds `0.0.0.0` by default, routes on `/autopilots/_default/{action}` plus `POST /sim/reset` (`src/app/command-api.ts:41-128`); no authentication, no CSRF protection, no TLS |
| Motor backends | `sim`, `serial`, `hil`, `gpio`, `can` (`src/config.ts:3,76-82`); `SerialMotor` opens the device directly, parses `T`/`F`/`R` telemetry (`src/actuators/backends/serial-backend.ts:33-69,78-225`); HIL mirrors a capped demand to a real motor and stops at 30 s (`src/actuators/backends/hil-backend.ts:9-90`); `GpioMotor`/`CanMotor` are stub-style backends |
| Sensor sources | Signal K WS subscription (`src/signalk/signalk-sensor-source.ts`, `sk-subscriber.ts`) and simulator source (`src/sim/sim-sensor-source.ts`, `sim-world.ts`) |
| Publishing | Signal K deltas (autopilot state/mode/fault/targets/drive/rudder, plus bench navigation and route geometry) (`src/engine.ts:441-526`) |
| Configuration | `AP_*` env with documented defaults: 10 Hz loop, 1 s watchdog, 35° rudder, 0.15–1.0 PWM, 10 A current limit, 11.5 V cutoff, 40° tack angle, 30 m arrival radius (`src/config.ts:90-134`) |
| Persistence | none (state is in-memory; tuning changes are lost on restart; the UI stores a separate local tuning copy) |
| Tests | 12 files, 54 cases: PID, state machine, safety matrix, serial telemetry parsing, HIL caps/timeout, route latch, track/wind closed loops on the simulated world, tuning clamps, sim course bridge, command-API sim reset 409 (`src/__tests__/`) |
| Security | unauthenticated control API on `0.0.0.0` by default; e-stop/drive-test/tuning reachable from the LAN; HIL additionally gated by env token and loopback binding |
| Monitoring | structured logger (`src/app/logger.ts`); health = incidental `GET` status response; no metrics or counters endpoint |
| Documentation accuracy | `docs/MOTOR_PROTOCOL.md` documents a UART link at `/dev/ttyAMA0` (`MOTOR_PROTOCOL.md:14-18`), but the Pico firmware reads USB CDC `sys.stdin` (`pico2/main.py:40,261`) and the deployment scripts open the USB by-id device (`scripts/pico2/hil-control.sh:13,69`; `production-control.sh:12,50`); see G3 |
| Integration | consumes Signal K sensors and course API, publishes autopilot + bench data; the UI talks to its Signal K-shaped route set; the simulation platform resets its bench world and disengages it |

Assessment: a real controller and safety implementation with the strongest test suite in the
repository (54 cases). Its physical path is documented inconsistently and has never been validated
on a vessel; simulator test success must not be read as vessel validation.

### 3.6 `marine-chart-engine`

| Field | Finding |
|---|---|
| Package | `marine-chart-engine` 0.1.0, ESM, private, main `dist/server.js` (`package.json:2-18`) |
| Entry point | `src/server.ts` builds services and mounts routers (`src/server.ts:48-300`) |
| Services | chart registry, MBTiles reader, import jobs, raster/S-57 conversion, EMODnet proxy, XYZ/WMS proxies with disk cache, storage quota, area search, package planner, chart packages, installation diagnostics, ENC hazards, IHM feature info, marine geometry/mask, environment catalogue/sync, tides, weather forecast, wind field, Open-Meteo marine, marine environment engine and provider registry (`src/server.ts:16-46,70-170`) |
| HTTP API | 12 router modules, 11 mounted, 60 route registrations; principal groups: `/health`, `/health/diagnostics`, `/charts` (list, metadata, imports, jobs, delete, raster/vector tiles), `/bathymetry/emodnet`, `/proxy/xyz`, `/proxy/wms`, `/catalog` (areas, package plans, installation, storage, ENC hazards, IHM feature info, marine mask, depth overlay, S-63 status, sources, downloads, progress/cancel), `/environment` (catalog, sync, times, tiles, geojson), `/tides/vigo`, `/weather` (wind field, forecast), `/api/marine` (providers, wind/waves/currents/sea-temperature/point, coastal mask, debug grid), `/packages` (`src/routes/*.ts`; router registrations at `src/server.ts:248-288`; `src/routes/tiles.routes.ts` is defined but never mounted and its only route returns 404) |
| Chart processing | MBTiles import validates metadata and copies into the data dir (`src/services/chart-import.service.ts:49-58`); GeoTIFF/KAP conversion shells out to `gdal_translate`/`gdaladdo` (`:60-77`); S-57 conversion shells out to `ogr2ogr`/`tippecanoe` with a fixed layer map (`:11-32,79-120,359-376`); archive extraction validates zip-slip and entry/size limits (`src/download/safe-archive-extractor.ts:19-47,74-80`) |
| Environmental providers | Open-Meteo wind/marine/forecast, OpenWeatherMap tiles (only with key), EMODnet WMS/WCS, NOAA WMS, GEBCO WMS, OpenSeaMap/IHM XYZ/WMTS, IHM tide API with MeteoGalicia fallback, Puertos HF radar OPeNDAP, cached Copernicus IBI frames (`src/server.ts:172-246`; `src/services/tide.service.ts:5-9,51-92`; `marine-environment/infrastructure/*`) |
| Persistence | JSON registries and manifests under `CHART_ENGINE_DATA_DIR` (`src/config.ts:86-105`), tile/weather/tide caches, `better-sqlite3` for MBTiles and ENC index files |
| Configuration | `CHART_ENGINE_*` env (port, data/cache/upload/registry paths, upload max MB, cache TTL, quota, OWM key, Copernicus sync, python executable) (`src/config.ts:86-105`) |
| Tests | 28 test files, 70 cases across catalogue parsing, geometry, download estimates, quota, package planning, marine environment math/selection, tide/weather/wind/WMS services; test runner builds first (`package.json:16`) |
| External tools | GDAL, `ogr2ogr`, `tippecanoe`, `unzip` must exist on PATH; absence maps to HTTP 422 (`src/server.ts:315-331`) |
| Missing tracked asset | server constructs a mask path under `resources/ria-vigo-marine-mask.geojson` (`src/server.ts:155-158`; `environment.routes.ts:131`), but `marine-chart-engine/resources/` is gitignored (`.gitignore:85`) and is not tracked; a clean clone has no mask until `npm run sync:coastal-mask` is run |
| Security | CORS `*`, no authentication; 2 GiB upload limit (default) via multer (`charts.routes.ts:28-31`); external processes spawned with `shell: process.platform === 'win32'` (`process-runner.service.ts:17-33,38-58`) — on Windows the command string is interpreted by the shell; current call sites pass a validated lowercase-kebab chart id and server-generated upload paths |
| Monitoring | `/health` and `/health/diagnostics` summarise configured providers and sync state (`src/routes/health.routes.ts:14-29`); no metrics |
| Documentation accuracy | README is detailed and mostly accurate, including explicit out-of-scope S-63/oeSENC/decryption (`marine-chart-engine/README.md:183-187`); S-63 is expressed only as a diagnostic/licensing gate (`catalog.routes.ts:141-147`; `installation-diagnostics.service.ts:37-80`), not as an import path |
| Integration | the UI consumes `/charts`, `/environment`, `/weather`, `/tides`, `/catalog`, `/api/marine`; the chart engine is the only component that talks to third-party data providers |

Assessment: the second-largest component and the one with the broadest external surface. Its
capability is real but conditional on external tools, credentials and network providers; several
services are explicitly diagnostic-only or fallback-only.

### 3.7 `marine-tile-server`

| Field | Finding |
|---|---|
| Package | `marine-tile-server` 1.0.0, no `private`, `"license": "ISC"`, empty author/description (`package.json:1-27`) |
| Implementation | 61-line Express server: `GET /tiles/:z/:x/:y.png` converts XYZ y to TMS and reads `tile_data` from MBTiles; `GET /metadata` returns the metadata table (`src/index.ts:1-61`) |
| Runtime | `better-sqlite3`, `cors`, `express` (`package.json:15-19`); `PORT` 8080, `MBTILES_PATH` env (`src/index.ts:7-8`; `Dockerfile:13-17`) |
| Container | `node:18-slim`, installs `python3 make g++` to build the native addon (`Dockerfile:1-11`) |
| Tests | none; no test script |
| Integration | none. No root start script, no systemd unit, no UI runtime consumer. The only UI reference to port 8080 is a legacy builtin chart source `LOCAL_RASTER_SOURCE` (`marine-instrumentation-ui/src/app/core/chart-sources/builtins/local-raster.ts:3-30`) whose registry service (`core/chart-sources/chart-source.registry.ts:10-18`) is not injected anywhere; the live UI uses the chart engine on 8088 instead |
| Documentation | no README |
| Security | no authentication, CORS enabled globally (`src/index.ts:10`) |
| Risk notes | `"license": "ISC"` is an unresolved metadata inconsistency with the rest of the repository (which has no licence); the base image is Node 18 while CI uses Node 20 and the audit host has Node 24 |

Assessment: `EXPERIMENTAL` orphan. It works as a minimal MBTiles server but is not part of any
launch path or documented deployment.

## 4. Supporting areas

### 4.1 `signalk-runtime/`

Single file: `docker-compose.yml`. Runs the third-party image `signalk/signalk-server:v2.22.1`,
exposes 3000/tcp and 10110/udp, persists Signal K state in `./data`, sets `TZ=Europe/Madrid`,
`IS_IN_DOCKER=true`, `restart: unless-stopped` (`signalk-runtime/docker-compose.yml:1-14`). The
`data/` directory is gitignored (`.gitignore:88`). This is the marine data bus: all publishers, the
UI and the autopilot depend on it. It is entirely an external dependency; nothing of Signal K itself
is vendored or tested here.

### 4.2 `config/`

Only examples are tracked: `config/omi.env.example` (autopilot, sensor, chart, AIS, IMU, GPS, wind,
bench and Raspberry migration variables) and `config/raspberry.env.example` (legacy SSH/migration
defaults). Real env files are gitignored. Observed inconsistencies:

- `BENCH_SIGNALK_PORT=3100` and `BENCH_AUTOPILOT_PORT=3991` (`omi.env.example:104-107`) are not read
  by any source file.
- `AP_SERIAL_PORT=/dev/ttyAMA0` (`omi.env.example:38`) conflicts with the Pico firmware's USB CDC
  stdin link (`pico2/main.py:40,261`).

### 4.3 `scripts/`

52 tracked files. Main groups:

| Group | Files | Role |
|---|---|---|
| Bootstrap | `init.sh` (1283 lines), `init.ps1` (807 lines), `init-cross-platform.mjs` | prerequisites, Signal K compose startup, build packages, optional AIS-catcher download/compile, Python publisher setup, chart engine setup, service summary |
| Raspberry migration | `migrate-to-raspberry.sh` (404 lines), `.ps1` (1003 lines), `migrate-to-raspberry-cross-platform.mjs` | rsync/SSH deployment, systemd installation, remote verification |
| Sensor launchers | `start-sensor-cross-platform.mjs` + per-sensor `.sh`/`.ps1`, `start-wind-demo.mjs` | dispatch to Python publishers (GPS/IMU/wind), AIS-catcher, autopilot engine |
| Operations | `status.mjs`, `build-and-verify.sh`, `serve-spa.py`, `raspberry-dhcp-probe.py` | health/status checks, build verification, static SPA serving, direct-cable DHCP helper |
| Pico 2 bench/HIL/production | 28 files under `scripts/pico2/` plus `pico2-motor.ps1` | LED/motor bench pulses, preflight, current calibration, safety/watchdog tests, HIL and production start/stop/engage control over SSH or local loopback |

Notable behaviours: `start-sensor-cross-platform.mjs` resolves the OS-specific launcher and spawns
it with `stdio: inherit` (`:27-41`); `status.mjs` probes HTTP endpoints, the AIS UDP port and AIS
target counts; the Pico scripts refuse physical starts without explicit confirmations
(`hil-control.sh:46-49`; `production-control.sh:34-37`).

### 4.4 `tools/`

Tracked content is only `tools/.gitkeep`; `.gitignore:109-111` ignores everything else. Deployment
expects `tools/ais-catcher/AIS-catcher` (`omi-ais.service:9`; `scripts/start-ais.sh:6`), which
`scripts/init.sh:773-809` downloads from `github.com/jvde-github/AIS-catcher` releases on request.
The binary is therefore an untracked external artefact; a clean clone cannot start the AIS service.

### 4.5 `docs/`

| File | Lines | Content and accuracy assessment |
|---|---:|---|
| `docs/CHARTS.md` | 201 | Supported chart formats, UI/CLI import, out-of-scope list. Consistent with the chart engine, including the S-63 licensing gate caveat |
| `docs/MARINE_ENVIRONMENT_AUDIT.md` | 61 | Self-critical audit of the environmental implementation, with per-component "observed problems" table. Accurate and unusually candid; it states provenance/interpolation limitations rather than claiming model-grade fields |
| `docs/MARINE_ENVIRONMENT_IMPLEMENTATION_REPORT.md` | 105 | Delivered-increment report (physical fields, provider selection, particles, coastal mask, interpolation, wave variables). Consistent with the `marine-environment/` code |
| `docs/PICO2_MD30C_MOTOR_GUIDE_ES.md` | 601 | Spanish-only wiring/commissioning/safety guide for Pico 2 + Cytron MD30C. Detailed, includes pre-motor checklist and fault diagnosis; language is inconsistent with the otherwise English documentation set |
| `docs/RASPBERRY_CONNECTION.md` | 153 | Current addresses, browser URLs, service table and checks; contains the incorrect "isolated bench uses 3100/3991" section (lines 45,53) and socat UART-emulation claim (lines 55-57) with no corresponding code |
| `docs/RASPBERRY_DEPLOYMENT.md` | 90 | Service matrix, chart storage, install steps. Mostly accurate; UI unit runs the dev server, not a compiled/static server |
| `docs/WIND_GPS_DEMO.md` | 75 | Local wind/GPS demo, NMEA sentence support, Raspberry wind sensor setup. Consistent with the Python publishers and launchers |
| `docs/marine-data-sources.md` | 35 | Provider-by-provider audit with measured samples and explicit limitations ("diagnostic samples prove transport and normalization paths only") |

### 4.6 Raspberry deployment resources

Nine systemd units in `marine-sensor-gateway/rpi/systemd/`:

| Unit | ExecStart / role | Observation |
|---|---|---|
| `signalk.service` | `docker compose up -d` in `signalk-runtime` (`:9-10`) | external image dependency |
| `omi-gps.service` | `scripts/start-gps.sh` (`:9`) | Python publisher, `SupplementaryGroups=dialout` |
| `omi-imu.service` | `02_publish_signalk.py` directly (`:9`) | Python publisher, `SupplementaryGroups=i2c` |
| `omi-wind.service` | `scripts/start-wind.sh` (`:9`) | Python publisher |
| `omi-ais.service` | `tools/ais-catcher/AIS-catcher ...` (`:9`) | untracked binary; docs describe the unit as running `start-ais.sh` |
| `omi-autopilot.service` | `scripts/start-sensor-cross-platform.mjs autopilot` (`:12`) | sets `AP_MOTOR_BACKEND=serial`, `AP_SERIAL_PORT=/dev/ttyAMA0` (`:18-19`), conflicting with the Pico USB CDC firmware |
| `omi-charts.service` | `node marine-chart-engine/dist/server.js` (`:9`) | hardened with `ReadWritePaths=/var/lib/open-marine`, `NoNewPrivileges=yes` (`:23-24`) |
| `omi-test-bench.service` | `node /home/manu/open-marine/marine-test-bench/dist/index.js` (`:8-9`) | **stale path**: no `marine-test-bench/` directory exists; the workspace is `marine-simulation-platform` and the unit's `WorkingDirectory` is invalid. It also does not set the isolated 3100/3991 ports |
| `omi-ui.service` | `npm run start:ui` (`:9`) with `NODE_ENV=production` (`:13`) | description says "SSR/development server" (`:2`); there is no SSR build, and the service runs the Angular dev server |

### 4.7 Pico 2 firmware and motor control

Tracked under `marine-autopilot-engine/pico2/` (10 Python files plus `install.sh` and `README.md`) and
driven by `scripts/pico2/`:

| Component | Evidence |
|---|---|
| Safety bridge firmware | `pico2/main.py` (293 lines): PWM 20 kHz on GP15, direction GP14, NC E-stop sense GP13, current sense GP26/ADC0 (`main.py:22-28`); boot-safe outputs (`:31-34,248-255`); frame handler for `H`/`X`/`A`/`P`/`V`/`C,...` (`:188-245`); 500 ms heartbeat timeout and profile motion caps in the main loop (`:257-292`); non-bench profiles require configured E-stop and current sensor (`:74-134`) |
| Shared policy | `pico2/motor_policy.py` (58 lines): five profiles, bench absolute 20% duty cap, 1 s bench motion, 2 s pause, 450 ms bench watchdog, production preflight requirements (`:3-58`) |
| Profiles | `profiles/bench-led.py`, `bench-motor.py`, `motor-commissioning.py`, `hil-motor.py`, `production.py`; generated `config.py` via `build_config.py` |
| Host CLI | `pico2/pico_motor_cli.py` (676 lines): status, stop, preflight, bench pulse/pulse-direction/ramp with confirmations and locking |
| Installer | `pico2/install.sh`: builds config, installs `mpremote`, backs up existing `main.py`, copies config/policy/firmware, resets, verifies status |
| Host-side tests | `pico2/tests/test_bench_motor.py`: 15 tests executed and passed in this audit (profile defaults, boot-safe output, 20% cap, motion/watchdog limits, missing-current vs zero, E-stop requirement, CLI refusals, stop-after-exception) |
| On-device status | NOT_VERIFIED. No Pico hardware was present; no on-device run, no UART/USB timing test, no motor motion |

Safety evidence quality: the *policy* is defensively written and host-tested; the *physical link and
timing* are unverified. The firmware reads USB CDC stdin, while the production systemd unit and the
motor protocol document specify a UART device. This is an engineering contradiction, not a wording
issue, and must be resolved before any hardware claim.

### 4.8 Test-suite inventory

| Workspace | Test files | Cases | Runner | CI job |
|---|---:|---:|---|---|
| `marine-data-contract` | 1 | 3 | Vitest (`package.json:21-23`) | `contract` (test + build) |
| `marine-sensor-gateway` | 1 | 7 | `tsx --test <one file>` (`package.json:10`) | `gateway` (test + build) |
| `marine-simulation-platform` | 3 | 12 | `tsx --test tests/**/*.test.ts` (`package.json:44`) | `simulation-platform` (test + build) |
| `marine-instrumentation-ui` (unit) | 18 | 68 | `ng test` / Vitest (`package.json:17,21`) | `ui-test` (`test:ci`) |
| `marine-instrumentation-ui` (e2e) | 2 | 3 | Playwright (`package.json:22`) | none |
| `marine-autopilot-engine` | 12 | 54 | `tsx --test src/__tests__/*.test.ts` (`package.json:10`) | `autopilot` (test + build) |
| `marine-chart-engine` | 28 | 70 | build then `node --test dist/**/*.test.js` (`package.json:16`) | `chart-engine` (test + build) |
| `marine-tile-server` | 0 | 0 | — | build only |
| Python host-side (Pico/wind/IMU) | 3 | 23 | `python -m unittest` | none |

### 4.9 CI workflows

Single workflow `.github/workflows/ci.yml` (name "OMI CI/CD Pipeline") on push to `main`/`develop`
and PR to `main`. Ten jobs: `contract` (11-22), `simulator` (24-34), `gateway` (36-47),
`autopilot` (49-60), `simulation-platform` (62-73), `chart-engine` (75-86), `tile-server` (88-98),
`ui-lint` (100-110), `ui-test` (112-122), `ui-build` (124-135, `needs: [contract, ui-lint, ui-test]`).
All jobs run `npm ci --workspaces --include-workspace-root --legacy-peer-deps` on Node 20.

CI coverage gaps, relative to the capability matrix:

- No Python tests (`pico2`, wind, IMU) are run, even though they are the only tests currently known
  to pass without hardware.
- No Playwright e2e job; no accessibility/axe gate.
- No deploy, release, container build/publish, SBOM, secret scan or dependency audit step.
- `ui-lint` enforces a fixed ceiling of 347 warnings (`marine-instrumentation-ui/package.json:18`),
  which prevents growth but also freezes existing debt.
- The workflow has not been observed to pass for this commit; CI status is NOT_VERIFIED from the
  checkout alone.

## 5. Capability matrix

### 5.1 Matrix

States use the vocabulary in 1.3. "Test evidence" counts cases in the tree; execution status is
stated separately. No simulator result is treated as vessel validation.

| ID | Capability | State | Principal implementation evidence | Test evidence | Not established |
|---|---|---|---|---|---|
| C-01 | Shared marine data contract | `IMPLEMENTED_NOT_FULLY_TESTED` | `marine-data-contract/src/paths.ts:1-149`, `types.ts:4-155`, `units.ts:1-23`, `quality.ts:1-31`, `simulation.ts:1-353` | 3 Vitest cases, timestamp normalisation only; not executed | runtime/type-check success, cross-workspace compatibility, quality-flag usage |
| C-02 | Onboard connectivity runtime | `EXTERNAL_DEPENDENCY` | Signal K image (`signalk-runtime/docker-compose.yml:1-14`), 9 systemd units, Python publishers and HTTP/WS delta clients | no automated test for the runtime composition; the 23 executed Python tests cover publisher helpers and Pico policy only | end-to-end bus behaviour, container startup, service dependency ordering, LAN access |
| C-03 | Navigation UI | `IMPLEMENTED_NOT_FULLY_TESTED` | Angular routes (`app.routes.ts:6-117`), chart page/facade/MapLibre engine, resources/GPX, alarms, playback, chart sources | 68 unit + 3 e2e cases (mocked backends); not executed | real Signal K data flow, MapLibre rendering, mobile gestures, accessibility, performance |
| C-04 | Chart processing (import, conversion, tiles, catalogue) | `IMPLEMENTED_NOT_FULLY_TESTED` | `marine-chart-engine/src/services/chart-import.service.ts:49-120`, `chart-registry.service.ts`, `routes/charts.routes.ts`, `download/*`, CLIs | 70 chart-engine cases; not executed; conversion paths need GDAL/ogr2ogr/tippecanoe | conversion success on real files, tile rendering, licence-gated data intake |
| C-05 | Environmental data service | `IMPLEMENTED_NOT_FULLY_TESTED` | `marine-chart-engine/src/marine-environment/*`, `services/{weather-forecast,wind-field,tide,open-meteo-marine}.ts`, `routes/{environment,weather,marine-environment,tides}.routes.ts` | 70 chart-engine cases include environment math/selection/provider tests; not executed | provider availability/terms, forecast accuracy, field validity, offline cache behaviour |
| C-06 | AIS traffic analysis | `IMPLEMENTED_NOT_FULLY_TESTED` | UI AIS store/CPA/alarm wiring (`state/ais/ais-store.service.ts:1-60`, `core/calculations/cpa.ts:27-101`, `features/alarms/services/alarms-facade.service.ts:61-72`); AIS NMEA ingestion only via external AIS-catcher/rtl_ais | no dedicated CPA/AIS unit test; alarm-engine spec has 6 cases | radio reception, target fusion, false-alarm rate, AIS-derived product claims, data redistribution |
| C-07 | Instrument dashboards | `IMPLEMENTED_NOT_FULLY_TESTED` | Dashboard/instruments routes and panels (`features/dashboard/`, `features/instruments/`), datapoint store, uPlot, performance polar parser | no dashboard-specific test; state/calculation specs cover fragments | numeric correctness against real sensors, stale-data quality propagation, history persistence |
| C-08 | Remote monitoring foundations | `NOT_FOUND` | none; only LAN browser access, local `/health` endpoints and local diagnostics pages exist | n/a | any remote/shore monitoring, telemetry uplink, authentication, alert delivery |
| C-09 | Local autopilot control | `IMPLEMENTED_NOT_FULLY_TESTED` | `marine-autopilot-engine/src/engine.ts:53-647`, `app/state-machine.ts:43-166`, `safety/*`, `app/command-api.ts:41-293`, Signal K publish/subscribe | 54 autopilot cases; not executed | hardware control, tuning correctness at sea, API security, multi-client behaviour |
| C-10 | Simulation and test infrastructure | `IMPLEMENTED_NOT_FULLY_TESTED` | `marine-simulation-platform/src/api/server.ts:17-355`, `runtime/run-manager.ts:31-345`, `persistence/sqlite-store.ts:14-466`, UI diagnostics/bench pages | 12 simulation cases; not executed | genuine bench isolation, scenario fidelity, assertion evaluation (assertions are stored but not computed) |
| C-11 | Autopilot physical actuation path | `SIMULATED_ONLY` | `actuators/backends/{sim,serial,hil,gpio,can}-backend.ts`, `pico2/main.py`, `scripts/pico2/*` | host-side Pico policy 15 cases (executed, passed); motor behaviour only against simulated world | real motor motion, E-stop response, rudder feedback, current limiting on hardware, vessel validation |
| C-12 | Pico 2 firmware safety policy | `IMPLEMENTED_NOT_FULLY_TESTED` | `pico2/main.py:22-293`, `pico2/motor_policy.py:1-58`, profiles, `install.sh` | 15 host-side cases executed and passed | on-device execution, USB/UART link, watchdog timing, GPIO wiring, certified safety behaviour |
| C-13 | Wind NMEA 0183 ingestion | `IMPLEMENTED_AND_TESTED` | `marine-sensor-gateway/rpi/wind/wind_nmea.py`, `03_publish_wind_signalk.py` | 5 `unittest` cases executed and passed (MWV apparent, MWV invalid status, MWD, km/h conversion, checksum rejection) | real serial sensor, NMEA 2000 wind, long-run stability, Signal K delivery |
| C-14 | IMU heading/attitude fusion and publishing | `IMPLEMENTED_AND_TESTED` | `marine-sensor-gateway/rpi/omi-imu/02_publish_signalk.py` (complementary fusion, stationary handling, WS/HTTP publishing) | 3 `unittest` cases executed and passed (fast gyro response, bias isolation, stationary stability) | real ICM-20948 hardware, calibration, magnetic disturbance at sea |
| C-15 | GPS ingestion and stationary filtering | `IMPLEMENTED_NOT_FULLY_TESTED` | `marine-sensor-gateway/rpi/omi-imu/02_publish_gps_signalk.py` (GpsState, StationaryFilterState) | no GPS publisher test file | real receiver, fix quality, stationary filter correctness |
| C-16 | Marine tile server | `EXPERIMENTAL` | `marine-tile-server/src/index.ts:1-61`, `Dockerfile:1-18` | none | integration, deployment, Node 18 image parity |
| C-17 | NMEA 2000 / CAN sensor ingestion | `NOT_FOUND` | type-only interfaces in `marine-sensor-gateway/src/adapters/nmea2000.ts:1-26` and CAN backend stub | none | any actual NMEA 2000 decoding or CAN hardware access |
| C-18 | Vessel / sea-trial validation | `NOT_FOUND` | no sea-trial log, no vessel test record, no certified installation record in the tree | none | all physical, environmental and certification claims |

### 5.2 State distribution

| State | Count | Capabilities |
|---|---:|---|
| `IMPLEMENTED_AND_TESTED` | 2 | C-13, C-14 |
| `IMPLEMENTED_NOT_FULLY_TESTED` | 10 | C-01, C-03, C-04, C-05, C-06, C-07, C-09, C-10, C-12, C-15 |
| `SIMULATED_ONLY` | 1 | C-11 |
| `EXTERNAL_DEPENDENCY` | 1 | C-02 |
| `EXPERIMENTAL` | 1 | C-16 |
| `NOT_FOUND` | 3 | C-08, C-17, C-18 |
| `NOT_VERIFIED` | 0 | — |
| `DOCUMENTED_ONLY` | 0 | — |
| **Total** | **18** | |

Interpretation: the repository is a substantial engineering prototype with real autopilot, chart,
environment and simulation logic; it is not a validated commercial system. Two of eighteen capability
areas have executed test evidence, both at pure unit level. Every physical, vessel, data-rights and
remote-service claim remains outside what the repository can prove.

### 5.3 Capability detail notes

- C-01: the contract is the de-duplication mechanism across the stack. Its weakness is test depth
  (one file), and two modules (`paths.ts`, `simulation.ts`) are consumed by every other workspace
  with no behavioural tests.
- C-02: "onboard connectivity" is mostly composition: a third-party Signal K container plus nine
  systemd units plus Python scripts. The repository contributes the glue, not the bus.
- C-03: the UI is a browser SPA (no SSR), despite the service-unit description. It is offline-capable
  through a service worker and IndexedDB, but it is not a published web product and has no SEO layer.
- C-04: chart *display* capability is broader than chart *processing* capability: imports are real,
  but conversions depend on unvendored GDAL/ogr2ogr/tippecanoe, and S-63/oeSENC are deliberately
  absent.
- C-05: the environment stack is a provider aggregation with explicit fallbacks and provenance
  fields; the repository's own audit doc states its model-resolution limitations
  (`docs/MARINE_ENVIRONMENT_AUDIT.md:1-61`). Forecast values must not be presented as observations.
- C-06: AIS *analysis* is implemented in the UI (CPA/TCPA, danger flags, tracks); AIS *reception* is
  entirely an external binary. The two AIS implementations (TypeScript `rtl_ais`, deployed
  AIS-catcher) are not reconciled.
- C-07: dashboards are broad (depth, wind, engine, power, navigation, environment, system) but
  correctness depends on Signal K data quality; the contract's `QualityFlag` is not visibly
  propagated into dashboard displays.
- C-08: no remote-monitoring code exists. LAN access is the only remote access, and it is
  unauthenticated.
- C-09: control logic and safety interlock design are the strongest engineering asset in the repo;
  the same code path is also reachable over an unauthenticated LAN API.
- C-10: the simulation platform is a real orchestrator with persistence and SSE, but its "isolated"
  bench defaults point at production endpoints, and assertions are stored without an evaluator
  (run status is set to `passed` when the scenario duration completes, `run-manager.ts:258-262`).
- C-11: HIL is the only path that intentionally touches a real motor; it caps duty at 10% and
  latches after 30 s (`hil-backend.ts:46-67`), and refuses to start without the env confirmation
  (`cli.ts:22-31`). No physical validation is recorded.
- C-12: the firmware's safety policy is conservative and host-tested; the transport ambiguity
  (UART vs USB CDC) and the absence of on-device tests block any hardware-safety claim.
- C-13/C-14: the only executed tests in this audit; they establish parser/fusion unit behaviour, not
  sensor accuracy or Signal K delivery.
- C-15: the GPS publisher is substantially more complex than the wind/IMU publishers (802 lines) and
  has no test file.
- C-16: the tile server duplicates a subset of the chart engine and is unused.
- C-17: NMEA 2000 is an aspiration encoded as interfaces; there is no decoder, no PGN handling and
  no CAN transport implementation.
- C-18: no vessel, sea-trial, certification or installation evidence exists anywhere in the tree.

## 6. Test evidence: what the tests establish and what they do not

### 6.1 Tests actually executed in this audit

Command and result summary (full commands in Appendix A):

| Suite | Command | Result |
|---|---|---|
| Pico 2 host-side safety | `python -B marine-autopilot-engine/pico2/tests/test_bench_motor.py -v` | `Ran 15 tests ... OK` (exit 0) |
| Wind NMEA parser | `python -B -m unittest test_wind_nmea -v` (cwd `marine-sensor-gateway/rpi/wind`) | `Ran 5 tests ... OK` (exit 0) |
| IMU publisher/fusion | `python -B -m unittest test_publish_signalk -v` (cwd `marine-sensor-gateway/rpi/omi-imu`) | `Ran 3 tests ... OK` (exit 0) |

These 23 executed cases establish:

- The NMEA 0183 wind parser converts MWV/MWD sentences to SI units and rejects invalid status and
  bad checksums at unit level (5 cases).
- The IMU complementary filter keeps fast gyro response while rejecting stationary bias and magnetic
  noise at unit level (3 cases).
- The Pico 2 safety *policy* caps bench duty at 20%, enforces motion and watchdog limits, requires
  E-stop/current sensing for non-bench profiles, keeps boot outputs at zero, and that the host CLI
  refuses unconfirmed or over-long commands (15 cases).
- The Python sources are syntactically valid under Python 3.12 (23/23 AST parse).

They do **not** establish: sensor accuracy, radio reception, serial/USB timing, PWM output, motor
direction, E-stop electrical behaviour, thermal/electrical safety, autopilot steering quality,
navigation correctness, chart licensing or vessel suitability.

### 6.2 Static validations executed

- 29 strict-JSON files parse; 6 JSONC files are excluded from strict parse (comments). No malformed
  JSON was found.
- 23 Python files parse as valid AST.
- `git status --porcelain` remained empty after all audit activity; the read-only constraint held.
- File/line counts in this document were produced by scripts reading `git ls-files`, not by
  inspecting a dirty working tree.

### 6.3 Node/TypeScript execution: NOT_VERIFIED

All 214 TypeScript unit cases and 3 Playwright cases are unexecuted. No `node_modules` is present,
no install was performed, and no build was attempted. Consequences:

- No statement in this document claims that `npm run build`, `npm run lint`, `ng test`, `tsx --test`,
  `node --test` or Playwright pass.
- CI job definitions exist but their status for commit `403941b` is not observable from the checkout.
- Native dependencies (`better-sqlite3` 12.11.1) require a toolchain or prebuilt binary; their
  runtime compatibility with the audit host (Node 24) and the CI image (Node 20) is unverified.
- Any "tested" label in the repository applies to test *existence*, not to a verified green run.

### 6.4 What the test suites would establish if executed

| Suite | Would establish | Would not establish |
|---|---|---|
| Contract (3) | timestamp drift clamping | Signal K path/schema compatibility, unit correctness, simulation schema validity |
| Gateway (7) | delta message shape, context grouping, path constants | any adapter, AIS process supervision, serial/NMEA decoding, hardware |
| Autopilot (54) | PID/state-machine/safety logic, serial frame parsing, HIL caps, controller convergence in the simulator | motor motion, real sensor failure modes, sea state, API security, vessel validation |
| Simulation (12) | deterministic generation, API v2 contract, SQLite persistence, closed-loop unavailability handling | scenario fidelity, real assertions, bench isolation, real autopilot interaction |
| Chart engine (70) | catalogue parsing, geometry/quota math, provider selection, WMS/XYZ proxy transforms, environment math | GDAL/S-57 conversion on real data, external provider availability, tile serving under load |
| UI unit (68) | preference migrations, chart settings, wind/needle calculations, alarm engine, autopilot console logic | full chart rendering, real Signal K streams, accessibility, mobile gestures |
| UI e2e (3) | chart environment UI against mocked HTTP routes | any real backend integration |
| Python (23, executed) | parser/fusion/policy unit behaviour | hardware, vessel, certification |

### 6.5 CI coverage map

Covered: TS contract, gateway, autopilot, simulation, chart-engine tests; UI lint/unit/build; all
builds. Not covered: Python tests, e2e/accessibility, deploy/release, container build, SBOM,
dependency/security scanning. The `tile-server` job builds the orphan workspace without testing it.

## 7. Implementation gaps and integration risks

Ranked by consequence for a commercial marine product. Severity is an engineering judgement, not a
legal one.

| ID | Risk | Severity | Evidence | Consequence |
|---|---|---|---|---|
| G1 | "Isolated" test bench is not isolated by default | HIGH | defaults `http://localhost:3000` and `:3990` (`marine-simulation-platform/src/cli/index.ts:17-19`); CLI only reads `BENCH_DB_PATH` and retention (`:32-40`); `BENCH_SIGNALK_PORT`/`BENCH_AUTOPILOT_PORT` unused (`config/omi.env.example:104-107`); UI claims "PORTS 3100 / 3991 / 4100 ISOLATED" (`diagnostics.page.html:198`); docs claim 3100/3991 (`docs/RASPBERRY_CONNECTION.md:45,53`) and socat UART emulation (`:55-57`) with no code | a closed-loop "bench" run can command the production autopilot and publish simulated data into the live Signal K bus |
| G2 | Autopilot command API is unauthenticated and LAN-open | HIGH | binds `0.0.0.0` (`marine-autopilot-engine/src/config.ts:106`); CORS `*` and no credential check (`src/app/command-api.ts:76-84`); actions include `estop`, `drive-test`, `tuning`, `engage` (`:25-35,144-220`) | anyone on the same network can engage, jog or tune the drive; only HIL is loopback-bound |
| G3 | Motor link contradiction (UART vs USB CDC) | HIGH | protocol doc `/dev/ttyAMA0` (`docs/MOTOR_PROTOCOL.md:14-18`); systemd `AP_SERIAL_PORT=/dev/ttyAMA0` (`omi-autopilot.service:18-19`); firmware reads `sys.stdin` (`pico2/main.py:40,261`); HIL/production scripts use USB by-id (`hil-control.sh:13,69`; `production-control.sh:12,50`) | the documented production link may not communicate with the shipped firmware; physical validation is impossible until resolved |
| G4 | UI fabricates autopilot state when the engine is unreachable | HIGH | local fallback writes datapoints labelled `local-autopilot-fallback` (`signalk-autopilot.service.ts:11,245-317`) and is used whenever the API is unavailable (`:310-317`) | the UI can show "engaged" or a target without any engine/motor behind it; unsafe for operator trust |
| G5 | TypeScript sensor gateway is not wired and is type-only | MEDIUM | adapters are interfaces only (`adapters/base.ts:13-19`; `gps.ts:28-32`; `imu.ts:33-37`; `nmea0183.ts:23-27`; `nmea2000.ts:16-26`); CLI runs `StubSensorGateway` (`cli.ts:4-13`); no root/systemd launch path | the workspace's apparent sensor framework cannot ingest sensors; real ingestion is the Python scripts |
| G6 | AIS receiver binary absent and two AIS designs | MEDIUM | `tools/` only `.gitkeep`; unit expects `tools/ais-catcher/AIS-catcher` (`omi-ais.service:9`); docs say the unit runs `start-ais.sh`; TS gateway spawns `rtl_ais` (`rtlAisGateway.ts:61-70`) | AIS cannot start from a clean clone; two incompatible acquisition paths complicate support |
| G7 | Stale systemd unit for the test bench | MEDIUM | `omi-test-bench.service:8-9` points at `marine-test-bench/dist/index.js`; no such directory exists; workspace is `marine-simulation-platform` | the bench service fails to start on a deployed unit set |
| G8 | Chart processing depends on unvendored external tools and a missing mask | MEDIUM | GDAL/ogr2ogr/tippecanoe (`chart-import.service.ts:63-64,87-88`); `resources/ria-vigo-marine-mask.geojson` referenced (`server.ts:155-158`) but `marine-chart-engine/resources/` gitignored (`.gitignore:85`); Windows `shell: true` (`process-runner.service.ts:21,42`) | conversions and marine masks fail or degrade in a clean clone; Windows argument handling warrants review |
| G9 | LAN trust model: no authentication on any service, no TLS | MEDIUM | chart engine CORS `*` (`server.ts:55-60`); simulation CORS `*` (`server.ts:222-226`); autopilot CORS `*`; UI host override via query string/localStorage (`app-environment.token.ts:92-143`) | any device on the boat network can read/alter state; no user/session model |
| G10 | Documentation overstates capabilities | MEDIUM | SSR/nginx claims (`omi-ui.service:2`; `README.md:10`) vs no SSR target (`angular.json:21-74`) and no nginx config; bench isolation (G1); AIS unit command mismatch (G6) | reviewers/operators may rely on non-existent deployment properties |
| G11 | Assertions are stored but never evaluated | MEDIUM | run steps include a "verification" step (`run-manager.ts:85-93`); duration completion sets `passed` (`:258-262`); no evaluator consumes `SimulationAssertionResult` | "passed" simulation runs do not mean scenario assertions passed |
| G12 | Tuning/preferences persistence gaps | LOW | engine tuning in-memory (`engine.ts:577-597`); UI keeps a separate tuning copy in localStorage (`signalk-autopilot.service.ts:324-347`) and separate defaults (`:363-373`) | after restart the engine reverts to env defaults while the UI shows local values |
| G13 | Toolchain and version drift | LOW | CI Node 20; tile-server image Node 18 (`Dockerfile:1`); chart engine `@types/node` 25 (`package.json:32`); Angular 21 with Angular-eslint 19 (`marine-instrumentation-ui/package.json:44-50`); UI `packageManager npm@10.9.2` | reproducibility and lint behaviour vary across environments |
| G14 | Weak coverage of safety-adjacent pure functions | LOW | no tests for `calculateCpa` (`core/calculations/cpa.ts`), no GPS publisher test, no test for the UI local fallback, no test for chart-engine process runner on Windows | regressions in collision-risk maths and sensor filtering would be uncaught |

## 8. Documentation accuracy ledger

| Claim | Location | Conflicting evidence | Verdict |
|---|---|---|---|
| UI is served "systemd/nginx in Raspberry deployments" | `README.md:10` | no nginx config anywhere; `omi-ui.service:9` runs `npm run start:ui` (dev server) | INACCURATE |
| UI unit is an "SSR/development server" | `omi-ui.service:2` | `angular.json:21-74` has no server/prerender target; `package.json:25-42` has no `@angular/ssr` | INACCURATE |
| Test bench is "isolated" | `README.md:12`; `diagnostics.page.html:198`; `docs/RASPBERRY_CONNECTION.md:45,53` | bench defaults to production ports; isolation env vars unused (G1) | INACCURATE unless launched with explicit flags not present in the documented units |
| `omi-ais.service` runs `scripts/start-ais.sh` | `docs/RASPBERRY_CONNECTION.md:129-133` (narrative section) | unit ExecStart calls `tools/ais-catcher/AIS-catcher` directly (`omi-ais.service:9`) | INACCURATE |
| Test bench service exists | `docs/RASPBERRY_CONNECTION.md:45`; `docs/RASPBERRY_DEPLOYMENT.md:16` | unit points to non-existent `marine-test-bench/` (G7) | INACCURATE |
| Bench Signal K 3100 / autopilot 3991 with socat UART emulation | `docs/RASPBERRY_CONNECTION.md:53-57` | no code reads 3100/3991; no socat usage in tracked code | INACCURATE |
| Motor link is `/dev/ttyAMA0` UART at 115200 8N1 | `docs/MOTOR_PROTOCOL.md:14-18`; `config/omi.env.example:38` | Pico firmware reads USB CDC stdin; deployment scripts open USB by-id | CONTRADICTORY, unresolved |
| Chart engine supports only legal/local data and excludes S-63 decryption | `marine-chart-engine/README.md:183-187`; `README.md:50` | consistent with code; S-63 exists only as diagnostics | ACCURATE |
| Environmental fields are explicit about provenance/limitations | `docs/MARINE_ENVIRONMENT_AUDIT.md`; `docs/marine-data-sources.md` | consistent with `marine-environment/` code and API metadata | ACCURATE |
| Wind/GPS demo and NMEA sentence support | `docs/WIND_GPS_DEMO.md` | consistent with `wind_nmea.py` and launchers | ACCURATE |
| Simulation "enterprise" platform | `marine-simulation-platform/README.md:3` | 2,985 production LOC, 12 tests, no assertion evaluator | MARKETING LANGUAGE, unsupported |

## 9. Commercial-reusability observations (engineering only)

This section records engineering observations about reuse difficulty. It deliberately contains no
legal conclusion about ownership, licensing or data rights; those are in the Task B/C/D documents.
Per decision D-002 in `docs/marea/execution/DECISION-LOG.md`, no OPEN-MARINE code may be copied or
vendored while the rights position is unresolved.

| Component | Engineering reuse value | Reuse difficulty | Main blockers |
|---|---|---|---|
| `marine-data-contract` types/paths | High: clean vocabulary for a marine data model | Low (rewrite from concepts, do not copy) | rights; small test surface; some types are simulator-specific |
| Autopilot state machine + safety evaluator | High: explicit fault priorities, latched faults, watchdog | Medium | rights; untested hardware path; no certification evidence; link ambiguity |
| Pico 2 safety policy + host test approach | Medium-high: conservative profile/cap design | Medium | rights; on-device validation absent; MicroPython toolchain; E-stop/current-sense hardware requirements |
| Chart engine provider/registry architecture | Medium-high: provider metadata, fallbacks, cache, quota | Medium-high | rights; many third-party data terms (Task C); external GDAL stack; missing tracked mask |
| Environmental model-selection/interpolation | Medium: provider-independent field abstraction with provenance | High | rights; data terms; model-resolution limits; heavy external dependencies |
| Simulation orchestrator (runs/samples/SSE/arm token) | Medium: useful test harness pattern | Medium | rights; bench isolation defect; assertions not evaluated |
| Angular chart UI | Low for direct reuse in a commercial web product | High | rights; 75k LOC SPA with no SSR/SEO, heavy bundle, lint debt, mocked-only e2e |
| `marine-tile-server` | Negligible | — | orphan, no tests, licence metadata inconsistency |
| Python sensor publishers | Medium: pragmatic device integrations | Medium | rights; hardware-specific; only wind/IMU unit-tested; Python packaging not pinned |
| Signal K integration pattern | Medium: standard bus usage | Low-medium | Signal K is third-party infrastructure (Task B/D), not repository IP |

Reusability caveats that apply to every row:

- The repository has no licence file. Public visibility is not a rights grant; the ownership question
  is recorded as an open blocker in the companion Task B documents.
- Reuse of *concepts and interfaces* is an engineering decision; reuse of *code* requires the rights
  decision first.
- No component has vessel-level or certification evidence, so none can be reused as a validated
  marine control or navigation product without new verification.
- Data-provider terms affect architectural reuse (Task C matrix), especially for charts, weather,
  tides and AIS.

## 10. Open items and NOT_VERIFIED register

| ID | Item | Why it matters | Needed to close |
|---|---|---|---|
| N-01 | TypeScript builds/tests/lint have not been run | All `IMPLEMENTED_NOT_FULLY_TESTED` labels are static-evidence only | Install dependencies in a controlled environment and run the CI commands; record exact results |
| N-02 | CI status for `403941b` unknown | Cannot assert a green baseline | Obtain CI run evidence (logs/URL) or reproduce locally |
| N-03 | No Python tests in CI | The only currently-passing tests are unguarded | Add Python test job and repeat audit |
| N-04 | Physical motor link unresolved | Blocks any autopilot hardware claim | Resolve UART vs USB CDC; run commissioning tests per guide with qualified supervision |
| N-05 | Bench isolation defaults | Safety and data-integrity risk | Change default bench endpoints to isolated ports or require explicit flags; update UI/docs |
| N-06 | Autopilot API authentication | Safety/security risk on shared networks | Define trust model (loopback-only, token, or authenticated gateway) |
| N-07 | AIS binary packaging | AIS capability not deployable from clean clone | Vendor/pin a verified binary or document/automate acquisition with checksums |
| N-08 | Missing `resources/ria-vigo-marine-mask.geojson` | Marine mask/depth features degrade | Generate via `sync:coastal-mask` or track a licensed/derived asset with provenance |
| N-09 | External provider terms | Commercial use of weather/tide/chart/AIS data unresolved | Task C matrix |
| N-10 | No remote-monitoring implementation | Product capability absent | Product decision; no engineering basis to claim it |
| N-11 | No vessel/sea-trial validation | No physical performance claims possible | Sea-trial programme with recorded evidence |
| N-12 | `marine-tile-server` licence metadata | Repository metadata inconsistency | Rights decision (Task B) |

## Appendix A — Command log summary

Repository facts (read-only Git):

```text
git -C <repo> rev-parse HEAD
403941b8860439115418b1786d8431284d2dae08
git -C <repo> rev-list --count HEAD
82
git -C <repo> ls-files            # output counted: 1033 lines
git -C <repo> status --porcelain  # output counted: 0 lines
git -C <repo> remote get-url origin
https://github.com/manuelxose/open-marine.git
```

Executed Python tests (2026-10-30, Python 3.12.0, `-B` to avoid bytecode writes):

```text
python -B marine-autopilot-engine/pico2/tests/test_bench_motor.py -v
Ran 15 tests in 0.004s
OK

python -B -m unittest test_wind_nmea -v      (cwd: marine-sensor-gateway/rpi/wind)
Ran 5 tests in 0.000s
OK

python -B -m unittest test_publish_signalk -v  (cwd: marine-sensor-gateway/rpi/omi-imu)
Ran 3 tests in 0.000s
OK
```

Static checks:

```text
JSON files parsed OK: 29/35 (6 JSONC files with comments, excluded from strict parse)
Python files parsed OK: 23/23
git status --porcelain after audit: 0 lines
```

Not run (by constraint): `npm install`, `npm ci`, `npm run build`, any `npm test`, `ng build`,
Playwright, Docker Compose, GDAL/ogr2ogr/tippecanoe, any hardware or network operation.

## Appendix B — Evidence index (principal citations)

| Subject | Reference |
|---|---|
| Workspaces declaration | `package.json:5-13` |
| Root scripts and launch surface | `package.json:14-56` |
| No licence in tree | `git ls-files` matched only `marine-instrumentation-ui/public/assets/icons/MATERIAL_SYMBOLS_NOTICE.md`; all package metadata except `marine-tile-server/package.json:13` has no licence field |
| Contract exports | `marine-data-contract/src/index.ts:1-5` |
| Contract paths | `marine-data-contract/src/paths.ts:1-149` |
| Contract tests | `marine-data-contract/src/types.spec.ts:4-32` |
| Gateway stub | `marine-sensor-gateway/src/gateway.ts:23-50`; `src/cli.ts:4-13` |
| Gateway adapter interfaces | `src/adapters/base.ts:13-19`; `gps.ts:28-32`; `imu.ts:33-37`; `nmea0183.ts:23-27`; `nmea2000.ts:16-26` |
| AIS process supervision | `src/ais/rtlAisGateway.ts:21-234`; `src/ais/forwarders.ts:12-148` |
| Signal K delta publisher | `src/publishers/signalkPublisher.ts:26-145` |
| Gateway test | `src/__tests__/imu-integration.test.ts:56-237` |
| Simulation API | `marine-simulation-platform/src/api/server.ts:39-210` |
| Simulation run lifecycle | `src/runtime/run-manager.ts:49-154,226-288` |
| Simulation defaults (production ports) | `src/cli/index.ts:17-19` |
| Simulation SQLite | `src/persistence/sqlite-store.ts:14-40` |
| Simulation tests | `tests/unit/signal-generator.test.ts:13-125`; `tests/integration/` |
| UI routes | `marine-instrumentation-ui/src/app/app.routes.ts:6-117` |
| UI Angular targets (no SSR) | `marine-instrumentation-ui/angular.json:21-74` |
| UI environment URLs | `src/app/core/config/app-environment.token.ts:41-57` |
| Signal K WS client | `src/app/data-access/signalk/signalk-client.service.ts:55-124` |
| Autopilot client + local fallback | `src/app/data-access/signalk/autopilot/signalk-autopilot.service.ts:63-105,245-317` |
| CPA calculation | `src/app/core/calculations/cpa.ts:27-101` |
| AIS store | `src/app/state/ais/ais-store.service.ts:1-60` |
| UI tests | 18 spec files under `src/app/**/*.spec.ts`; `e2e/chart-environment.spec.ts`; `e2e/chart-mobile-layout.spec.ts`; `playwright.config.ts:16-25` |
| Autopilot engine loop | `marine-autopilot-engine/src/engine.ts:53-203` |
| Autopilot safety rules | `src/safety/fault-manager.ts:25-69`; `src/safety/watchdog.ts:8-58` |
| Autopilot command API | `src/app/command-api.ts:41-293` |
| Autopilot config/defaults | `src/config.ts:90-134` |
| Serial motor backend | `src/actuators/backends/serial-backend.ts:33-69,78-225` |
| HIL backend | `src/actuators/backends/hil-backend.ts:9-90` |
| Pico firmware | `pico2/main.py:22-293`; `pico2/motor_policy.py:1-58` |
| Pico host tests | `pico2/tests/test_bench_motor.py` (15 cases, executed) |
| Motor protocol doc | `marine-autopilot-engine/docs/MOTOR_PROTOCOL.md:14-18` |
| Chart engine server | `marine-chart-engine/src/server.ts:48-331` |
| Chart import/conversion | `src/services/chart-import.service.ts:49-120,268-279` |
| Safe archive extraction | `src/download/safe-archive-extractor.ts:19-47,74-80` |
| Tide providers | `src/services/tide.service.ts:5-9,51-92` |
| Marine environment engine | `src/marine-environment/application/marine-environment-engine.ts:15-130` |
| Chart engine config | `src/config.ts:86-105` |
| Chart engine tests | 28 files under `marine-chart-engine/src/**/*.test.ts` |
| Tile server | `marine-tile-server/src/index.ts:1-61`; `Dockerfile:1-18` |
| systemd units | `marine-sensor-gateway/rpi/systemd/*.service` (executable lines cited in 4.6) |
| Signal K compose | `signalk-runtime/docker-compose.yml:1-14` |
| CI | `.github/workflows/ci.yml:9-135` |
| Environment example | `config/omi.env.example:1-107` |
| Python publishers | `marine-sensor-gateway/rpi/omi-imu/02_publish_signalk.py`; `02_publish_gps_signalk.py`; `rpi/wind/wind_nmea.py`; `03_publish_wind_signalk.py` |
| Python tests | `rpi/omi-imu/test_publish_signalk.py` (3, executed); `rpi/wind/test_wind_nmea.py` (5, executed) |
| Docs set | `docs/*.md` (line counts in 4.5) |
| Pico guide | `docs/PICO2_MD30C_MOTOR_GUIDE_ES.md` (601 lines, Spanish) |

## Appendix C — Companion document boundaries

| Document | Owns | This document does not duplicate |
|---|---|---|
| `INTELLECTUAL-PROPERTY-CHAIN.md`, `SOFTWARE-LICENSE-INVENTORY.csv`, `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` | Ownership/authorship chain, dependency licences, distribution obligations | No licence conclusion is drawn here; component names are provided for that inventory |
| `MARINE-DATA-RIGHTS-MATRIX.csv` | Provider-by-provider terms, caching/redistribution/offline rights | Provider identities are listed from code only; no terms are asserted here |
| `HARDWARE-COMPLIANCE-MATRIX.md` | Hardware certification, autopilot safety gate, protocol rights, EU/ES/PT compliance | Physical/hardware findings are referenced, not re-litigated |
| `MC-02-BLOCKERS-AND-DECISIONS.md` | Aggregated blockers and program decisions | No new program decision is recorded here |

End of document.
