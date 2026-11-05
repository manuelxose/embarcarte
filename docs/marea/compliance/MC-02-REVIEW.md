# MC-02 - Independent QA and evidence review

| Field | Value |
|---|---|
| Reviewer | `qa-reviewer` (Agent F) - independent reviewer; authored none of the reviewed files |
| Date / window | 2026-10-30, 17:09-17:21 Europe/Madrid |
| Repository | `C:\Users\Admin\Documents\workspace\embarcarte` |
| Branch / base / head | `feature/marea-mc02-technology-audit` - base `4317865` (MC-01 head) - reviewed head `fc4e03c` |
| Reviewed commits | `cdbb7e7` (audit deliverables: 12 files, +5,207/-38) and `fc4e03c` (delivery report + registry status; 2 files, +231/-1) |
| Draft PR | [#8](https://github.com/manuelxose/embarcarte/pull/8), draft, base `feature/marea-mc01-agent-foundation` (stacked on [#7](https://github.com/manuelxose/embarcarte/pull/7)) |
| Audited technology repository | `C:\Users\Admin\Documents\workspace\open-marine` @ `403941b8860439115418b1786d8431284d2dae08` (read-only) |
| Rules honoured | Read-only Git; no `add/commit/checkout/branch/push/merge`, no installs, no chargeable APIs, no hardware commands; OPEN-MARINE not modified; this document is the only file written |
| Nature | Technical and evidence verification. Not a legal opinion and not a product-clearance or certification document |

## 1. Verdict

**MC-02 = PASS (audit scope).**

Every acceptance criterion in the review brief was independently verified against the real tree, the real
OPEN-MARINE commit and re-executed commands: 36 criteria verified, 0 partial, 0 not verified, 0 blocked.
All ten required audit deliverables are present (plus the delivery report and the decision-log entry),
internally coherent on every headline count, and their central conclusions re-derive exactly from the
audited sources. The repository gates are green on the
reviewed head. The audit's honesty posture holds under adversarial sampling: no product is described as
cleared, certified or saleable anywhere, no NMEA/chart/CE claim is made, and no fabricated quote,
certificate or supplier figure was found.

**One blocking delivery-hygiene defect (B-1) must be closed before PR #8 leaves draft:** the branch head
claims prompt 02 `PASS` and lists `MC-02-REVIEW.md` as evidence while that file does not exist in the
committed tree (it is this document). The correction is mechanical - commit this review in the final
delivery commit and correct the delivery-report row that describes that commit. If the commit is not made,
prompt 02 must revert to `IN PROGRESS`, because the registry's own rule forbids marking a prompt complete
before independent-review evidence exists in the repository (`MASTER-PROMPT-REGISTRY.md:17-18`).

**This PASS is an audit verdict only. It does not clear any product, data source, licence, brand or
hardware.** All nine products remain `DEFINED`, not sellable; the PILOT commercialisation gate remains
`BLOCKED`; ownership/licence, data agreements, certifications and physical/sea-trial evidence remain
`BLOCKED` and are recorded as such. This review approves **no merge, no deployment and no commercial
claim**. See section 11.

Defect totals: **1 blocking** (B-1, delivery ordering; closed by the final commit) and **9 non-blocking**
(N-1 to N-9, wording/precision and reproducibility items that do not change any finding).

## 2. Reviewer independence and method

This reviewer did not author, co-author or edit any reviewed document, and did not participate in the
audit. The only file written by this review is this document. No Git write command was executed.

1. Inspected the actual branch, commit log, diff statistics, file set and remote PR state (`git log`,
   `git show --stat/--numstat`, `git diff --name-status`, `git diff --check`, `gh pr view`, `gh api`) -
   no delivery summary was trusted.
2. Re-ran every repository gate on the reviewed head and captured exact exit codes and output tails
   (section 3).
3. Re-derived the audit's headline counts from first principles: Git history, the five committed
   `package-lock.json` files, the delivered CSVs, the delivered Markdown tables, and the OPEN-MARINE
   source at `403941b` (section 4).
4. Sampled 14 cited `file:line` claims in OPEN-MARINE and 6 official external sources (5 provider terms
   pages plus the European Commission CRA page) to confirm that citations point at real, supporting
   content and that classifications were not invented (section 5).
5. Re-ran the 23 Python tests the audit claims to have executed, then confirmed OPEN-MARINE remained
   byte-clean (`git status --porcelain` empty, HEAD unchanged).
6. Cross-checked every document against the others for contradictory counts, product-clearance language,
   prohibited certification claims and missing retrieval dates (sections 7-8).
7. Audited the diff for source/CI/deployment changes, secrets, customer data, copied implementation code
   and licence-file additions (sections 7-8).
8. Classified every finding as blocking/non-blocking with `file:line` or command evidence (section 9).

## 3. Gate results - re-run by the reviewer on `fc4e03c`

All commands were executed on the reviewed branch head, not copied from the delivery report. Exact tails:

| # | Gate | Command | Result | Evidence (tail) |
|---:|---|---|---|---|
| 1 | Formatting | `npm run format:check` | PASS (exit 0) | `All matched files use Prettier code style!` - **scope note:** the script only covers `e2e/`, `playwright.config.ts` and selected `scripts/*.mjs`; it does not cover the delivered Markdown/CSV (N-9) |
| 2 | Build (Angular 21 SSR/prerender) | `npm run build` | PASS (exit 0) | `Prerendered 96 static routes.` - `Application bundle generation complete. [8.872 seconds]` - `Output location: ...\dist\embarcarte` |
| 3 | i18n | `npm run test:i18n` | PASS (exit 0) | `Server-rendering checks passed: lang attributes, private shells, alternates and per-request locale isolation.` + `i18n foundation checks passed: locale detection, route mapping and translations.` |
| 4 | Commerce | `npm run test:commerce` | PASS (exit 0) | `Commerce integration checks passed: bilingual catalogue, localized SEO, stock, cart payload integrity, accounts, authorization, sitemap alternates, webhook verification and security regressions.` |
| 5 | SEO | `npm run test:seo` | PASS (exit 0) | `SEO checks passed: 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD and private noindex.` |
| 6 | Backup/restore | `npm run test:backup` | PASS (exit 0) | `Restore verified in ...\restored: integrity ok, 10 rows.` + `Backup/restore checks passed: consistent snapshot, checksums, integrity, foreign keys, counts and corrupt-copy rejection.` |
| 7 | E2E (Playwright/Chromium) | `npm run test:e2e` | PASS (exit 0) | `15 passed (40.6s)` against the production build on an isolated temp SQLite server |
| 8 | Dependency audit | `npm audit --omit=dev --audit-level=high` | PASS (exit 0) | `found 0 vulnerabilities` |
| 9 | Diff hygiene | `git diff --check 4317865..fc4e03c` | PASS (exit 0) | no whitespace/CRLF errors in the committed range. The delivery report records `git diff --cached --check` instead, which checks only staged changes and is weaker (N-5) |
| 10 | `npm test` | n/a | **NOT DEFINED** | `package.json` has no `test` script; the delivery report correctly does not report a result for it |
| 11 | OPEN-MARINE Python tests | `python -B marine-autopilot-engine/pico2/tests/test_bench_motor.py -v`; `python -B -m unittest test_wind_nmea -v` (cwd `rpi/wind`); `python -B -m unittest test_publish_signalk -v` (cwd `rpi/omi-imu`) | PASS (all exit 0) | `Ran 15 tests ... OK`, `Ran 5 tests ... OK`, `Ran 3 tests ... OK` = the claimed 23. `git status --porcelain` was empty and HEAD unchanged after the runs |

The working tree was clean before and after the review (`git status --porcelain` empty; build artefacts are
git-ignored). No gate regressed relative to the delivery report's claims; the reported results
(96 routes, 101 sitemap URLs, 15/15 E2E, 0 vulnerabilities) reproduce exactly.

## 4. Independent re-derivation of the headline counts

Method note: counts were produced with read-only Git and CSV/JSON parsing in `%TEMP%`; no auditor script
was committed, so these independent numbers also serve as a cross-check on the delivery's claim that its
validation script lived outside the repository.

| # | Claim | Claimed | Independently derived | Method | Status |
|---:|---|---:|---:|---|---|
| 1 | OPEN-MARINE tracked files / commits | 1,033 / 82 | 1,033 / 82 (70 non-merge + 12 merge) | `git ls-files`, `git rev-list --count --all --merges/--no-merges` | VERIFIED |
| 2 | Author identities | 4 | 4 (`oficina@tecnoriasl.com` 44, `mgonzalezv@eservicios.indra.es` 24, `manuelxgon@gmail.com` 9, `noreply@anthropic.com` 5) | `git shortlog -sne --all` | VERIFIED |
| 3 | Last-touch shares | 495 (47.9%) / 534 (51.7%) / 4 (0.4%) | 495 / 534 / 4 | newest-first `git log --all --name-only` stream, exactly the documented method (IP chain section 1.3); percent = 47.92 / 51.69 / 0.39 | VERIFIED |
| 4 | Root commit content | 204 files | 204 | `git ls-tree -r --name-only 281ba95` | VERIFIED |
| 5 | Cached provider tiles in history | 3,843 (OWM 1,038; OpenSeaMap 846; GEBCO 681; NOAA 555; EMODnet 525; IHM 198) | 3,843 (OWM 349+297+192+109+91 = 1,038; OpenSeaMap 846; GEBCO 681; NOAA 555; EMODnet 525; IHM 189+9 = 198) | `git log --all --diff-filter=D --name-only -- '*.png'` grouped by provider directory | VERIFIED |
| 6 | TS unit / Playwright cases | 214 / 3 | 214 / 3 | regex count of `test(`/`it(` declarations by workspace (54 autopilot, 70 chart-engine, 3 data-contract, 68 UI, 7 sensor-gateway, 12 simulation) + 3 e2e | VERIFIED |
| 7 | Python tests executed | 23 (15+5+3) | 23, re-executed | section 3 row 11 | VERIFIED |
| 8 | Licence inventory shape | 1,034 rows x 21 columns; required 12-column header order; 1,034 data rows | 1,034 data rows; 21 columns; every row 21 fields; header starts exactly `component,version,source,workspace,usage,license,license_evidence,distribution_mode,obligations,risk,status,action` | Python `csv` parse; 1,035 lines = header + 1,034 | VERIFIED |
| 9 | Composition / direct / transitive | 997 npm + 7 first-party + 13 Python + 17 platform; 109 direct, 925 transitive | 997 + 7 + 13 + (apt 6 + external-binary 4 + git-action 3 + docker-image 2 + firmware-runtime 1 + runtime 1 = 17) = 1,034; direct 109, transitive 925 | `component_type` and `usage` distributions | VERIFIED |
| 10 | Licence families | permissive 960; Apache 38; BlueOak 13; public domain 6; CC-BY 3; copyleft 6; proprietary/unlicensed 7; unknown 1 | exactly those (GPL 4 + EUPL 1 + LGPL 1 = 6 copyleft); 7 `OWN_CODE_UNLICENSED` + 1 `UNKNOWN` = 8 unresolved | `license_family`/`status` distributions | VERIFIED |
| 11 | Lockfile aggregates | 2,133 package entries; 1,004 unique `name@version`; 997 third-party npm | 2,142 non-root lockfile entries minus 9 `link` entries = 2,133; 1,011 unique minus 7 first-party workspaces = 1,004; 1,004 - 7 = 997 third-party | JSON parse of the five `package-lock.json` files (all `lockfileVersion: 3`) | VERIFIED |
| 12 | Row spot-check vs lockfiles | at least 10 rows | 11/11 sampled npm rows matched their lockfile version exactly, with matching registry URLs | deterministic sample (rows 0, 99, 199, 299, 399, 499, 599, 699, 799, 899, 979 of the npm rows) | VERIFIED |
| 13 | Data-rights matrix | 28 rows x 28 columns; 3 PERMITTED / 5 PERMITTED_CONDITIONAL / 8 CONDITIONAL / 1 NOT_PERMITTED / 11 LEGAL_REVIEW_REQUIRED; official URLs + retrieval dates | exactly those; 28/28 rows have an `https://` URL and `retrieval_date=2026-10-30` | Python `csv` parse | VERIFIED |
| 14 | Hardware components | 13 identified + 3 absent, from a 16-row register | HW-01..HW-16; HW-09 (NMEA 2000 interface), HW-10 (NMEA 0183 interface), HW-11 (display) are `NO_ARTICLE`; 13 identified; one with an exact manufacturer part number, none with a board revision | register parse (HW matrix section 2.1) | VERIFIED |
| 15 | Compliance matrix | 81 cells: 33 CA / 10 POT / 37 NAE / 1 NYA; per-regime and per-family tables | 81 cells; 33/10/37/1; every per-regime and per-family row matches | parse of the 9 x 9 table (HW matrix section 5.2) | VERIFIED |
| 16 | Protocol risk register | 1 critical / 4 high / 6 medium / 1 low (R-01..R-12) | exactly those (R-01 C; R-02..R-05 H; R-06..R-11 M; R-12 L) | register read | VERIFIED |
| 17 | Capability inventory | 18 rows: 2/10/1/1/1/3; gaps G1-G14; 23 executed Python tests | 18 rows; 2 IMPLEMENTED_AND_TESTED, 10 IMPLEMENTED_NOT_FULLY_TESTED, 1 SIMULATED_ONLY, 1 EXTERNAL_DEPENDENCY, 1 EXPERIMENTAL, 3 NOT_FOUND; G1-G14; 23 tests | matrix parse; tests re-executed | VERIFIED |
| 18 | Product reuse map | nine products; 83 decision rows: 11/22/7/21/6/16 | 24 element rows + 59 decision rows = 83; 11 REUSE-CANDIDATE (incl. one annotated "internal"), 22 REUSE-CONDITIONAL, 7 LICENSE-OR-PARTNER, 21 BUILD, 6 REPLACE-OR-REMOVE, 16 BLOCKED | parse of sections 3-4 with the document's own counting rule (reuse map section 5.2) | VERIFIED |
| 19 | Blocker register | 58 rows: L9/S9/D10/H13/P10/X7; severity 10/37/11; status 28 BLOCKED / 22 OPEN / 4 LEGAL_REVIEW_REQUIRED / 1 NOT_YET_ASSESSABLE / 1 REUSE-CONDITIONAL / 2 BUILD | exactly those; every row has 10 fields | table parse of section 1-6 | VERIFIED |
| 20 | Prompt registry | exactly 36 prompt IDs; MC-01 PARTIAL; no later prompt complete | 36 unique IDs (42 numeric table rows including the schedule-change table); 01 PARTIAL, 02 PASS, 03-36 PLANNED; D-001 tables consistent with `DECISION-LOG.md`; prompts 03-07/11/12/14/20-22/27/32 now depend on 02 | registry parse | VERIFIED |
| 21 | Delivery metadata | audit commit 12 files +5,207/-38; base/PR/stack | `cdbb7e7` = 12 files, +5,207/-38; range `4317865..fc4e03c` = 13 files, all `docs/`; PR #8 draft, base `feature/marea-mc01-agent-foundation`; PR #7 draft, base `main`, still OPEN | `git show --stat/--numstat`; `gh pr view` | VERIFIED |
| 22 | Release policy | 20-gate checklist G-01..G-20; LR-01..LR-18 | present; statuses are honest (`FAIL`/`BLOCKED` for unmet gates, `PASS` only for the inventory baseline and the policy text) | policy sections 14-15 | VERIFIED |

Two documentation count slips were found while re-deriving (they do not affect any audit finding):
N-2 (3,846 vs 3,843) and N-3 (Apache-2.0 raw 35 vs family 38); see section 9.

The review brief expected the capability inventory to define gaps G1-G11; the delivered document evidences
G1-G14. This is a superset, not a contradiction: G12-G14 are additional LOW/MEDIUM integration risks with
their own code citations (`OPEN-MARINE-CAPABILITY-INVENTORY.md:688-690`).

Method sensitivity note on criterion 3: a per-path `git log -1 -- <path>` reconstruction yields
489/544 instead of 495/534, because per-path history simplification and merge handling differ from the
newest-first `--name-only` stream. The document states its method precisely and that method reproduces
495/534/4 exactly, so the claim is reproducible and correct as written; a reviewer using the other method
should not read the difference as a contradiction.

## 5. Citation and external-source sampling

### 5.1 OPEN-MARINE `file:line` claims re-read at `403941b`

| # | Claim in delivered document | Citation | Observed content | Status |
|---:|---|---|---|---|
| 1 | MBAR/CNIG bathymetry is labelled `CC BY 4.0` in the chart catalogue | `marine-chart-engine/src/catalog/chart-source-catalog.ts:154` (blocker D-02, data-rights MD-11) | line 154 is `'CC BY 4.0'` inside the `cnig-bathymetry` provider | VERIFIED (and the label is wrong - see 5.2) |
| 2 | The package planner repeats the wrong label | `marine-chart-engine/src/services/package-planner.service.ts:146` | line 146 is `license: 'CC BY 4.0'` for `cnig-mbar` | VERIFIED |
| 3 | `Relay` is a logging-only abstraction with no hardware line | `marine-autopilot-engine/src/actuators/relay.ts:1-33` (HW F-A24) | class logs `motor power relay CLOSED/OPEN`; no GPIO/serial drive | VERIFIED |
| 4 | Control API is unauthenticated, CORS `*`, binds `0.0.0.0` | `src/app/command-api.ts:50-55, 76-84`; `src/config.ts:105-106` (HW F-01/F-A25) | constructor `host = "0.0.0.0"`; `Access-Control-Allow-Origin: *`; no credential check; routes include `engage`, `disengage`, `tuning`, `estop`, `drive-test` | VERIFIED |
| 5 | Production launch does not override `AP_API_HOST` | `scripts/pico2/production-control.sh:48-52` (HW F-01) | sets only `AP_MOTOR_BACKEND`, `AP_SENSOR_BACKEND`, `AP_SERIAL_PORT`, `AP_API_PORT` | VERIFIED |
| 6 | Pico telemetry sends an empty rudder field | `pico2/main.py:287-290` (HW F-A20) | `print("T,,{}".format(sensor_value(amps)))` | VERIFIED |
| 7 | `clutch` is a copy of the enable flag | `src/actuators/backends/serial-backend.ts:139-147` (HW F-A21) | `clutch: this.enabled` in `getFeedback()` | VERIFIED |
| 8 | No `machine.WDT` / hardware watchdog anywhere in the firmware | HW F-A23, capability C-12 | `git grep 'WDT|import machine' -- 'pico2/*.py'` returns no matches | VERIFIED |
| 9 | Firmware tests are source-substring assertions, not runtime tests | `pico2/tests/test_bench_motor.py:40-50` (HW F-A01/F-A12) | `assertIn("pwm.duty_u16(0)", firmware)` etc. - literally source-text checks; 15 `test_` functions | VERIFIED |
| 10 | Production profile ships fail-closed (E-stop and current sensor uncalibrated) | `pico2/profiles/production.py:1-7` | `ESTOP_CONFIGURED = False`, `CURRENT_SENSOR_CONFIGURED = False` | VERIFIED |
| 11 | HIL caps duty at 10% and latches after the session limit | `src/actuators/backends/hil-backend.ts:46-67` (HW F-A17) | clamps with `maxDuty`; on expiry stops both backends | VERIFIED |
| 12 | Simulation "bench" defaults point at production ports and UI claims isolation | `marine-simulation-platform/src/cli/index.ts:17-19`; `diagnostics.page.html:198` (capability G1) | defaults `localhost:3000` / `localhost:3990`; UI text `PORTS 3100 / 3991 / 4100 ISOLATED` | VERIFIED |
| 13 | Dockerfile is non-multi-stage and leaves `make`/`g++` in the image | `marine-tile-server/Dockerfile:1-18`; blocker S-02 | `FROM node:18-slim`, `apt-get install ... make g++`, no second stage | VERIFIED |
| 14 | AIS-catcher is downloaded unpinned from `releases/latest` | `scripts/init.sh:726-800`; HW matrix section 2.6 | `download_url="https://github.com/jvde-github/AIS-catcher/releases/latest/download/..."`, no checksum | VERIFIED |

### 5.2 Official external sources re-fetched on 2026-10-30

| # | Provider / source | Claim under test | Observed on the official page | Status |
|---:|---|---|---|---|
| 1 | IHM data policy - `https://cdihm.cnig.es/CentroDescargasIHM/politica-datos` (HTTP 200) | MBAR24 is `CC-BY-NC 4.0`, non-commercial, and "must not be used for navigation safety" | Page states the MBAR24 licence is CC-BY-NC 4.0, lists "No uso comercial" and says the data "no deben utilizarse para propósitos relacionados con la seguridad de la navegación" | VERIFIED - consequently blocker D-02 (repo label wrong) and MD-11 `NOT_PERMITTED` are correct |
| 2 | Open-Meteo terms - `https://open-meteo.com/en/terms` (HTTP 200) | Free API is non-commercial only; data CC-BY 4.0; commercial use needs a paid plan | "You may only use the free API services for non-commercial purposes"; commercial use requires subscription; data "provided under the terms of the CC-BY 4.0 licence" | VERIFIED - blocker D-04 correct |
| 3 | OSMF tile policy - `https://operations.osmfoundation.org/policies/tiles/` (HTTP 200) | Bulk download/offline prefetch prohibited; commercial access can be withdrawn | "You must not: Bulk download ('scrape') tiles or offer prefetch features"; "Offline use is not permitted"; commercial services "should be especially aware that access may be withdrawn" | VERIFIED - blockers D-03 and G-11 correct |
| 4 | OpenWeather pricing - `https://openweathermap.org/price` (HTTP 200) | Weather Maps 2.0 tile layers are a separate paid SKU (450 GBP/month) | "Weather Maps 2.0 1-hour ... 450 GBP / month", listed separately from Weather API subscriptions | VERIFIED - blocker D-05 and data-rights MD-20 correct |
| 5 | NMEA 2000 page - `https://www.nmea.org/nmea-2000.html` (HTTP 200) | All products reading/transmitting NMEA 2000 must be NMEA-certified; licence, manufacturer code and product code required; certification tool mandatory | "All products that read and or transmit NMEA 2000 information must be certified by NMEA"; licence agreement, Manufacturer Code, Product Code per certified product, mandatory encrypted certification file, official logo/term only after validation | VERIFIED - blocker H-04 and HW sections 4.2/4.6 correct |
| 6 | European Commission CRA page - `https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act` (HTTP 200) | In force 2024-12-10; main obligations 2027-12-11; reporting obligations from 2026-09-11 | "entered into force on 10 December 2024 ... main obligations ... from 11 December 2027, with reporting obligations to apply as of 11 September 2026"; CE marking applies | VERIFIED - blocker H-13, HW matrix section 5.1 C-08 and executive verdict section 4 correct |

Only 5 of the 28 provider rows were live-sampled (as the brief requires); the remaining classifications cite
official URLs and retrieval dates in the CSV, and 11 rows are already `LEGAL_REVIEW_REQUIRED` or
`NOT_PERMITTED`, consistent with the recorded limitations. See R-2 in section 10.

## 6. Criterion-by-criterion verdict

Status vocabulary: VERIFIED = independently confirmed with evidence in the working tree or a command;
PARTIAL = materially verified with a stated limitation; NOT VERIFIED = claim could not be confirmed;
BLOCKED = verification prevented by an external condition. Criteria are the review brief's checks plus the
milestone's declared quality gates G1-G14.

| # | Criterion | Status | Evidence |
|---:|---|---|---|
| 1 | Branch/base/head as declared | VERIFIED | `git rev-parse`: HEAD `fc4e03c`, base `4317865`, merge-base = `4317865`; exactly two MC-02 commits |
| 2 | Audit commit size as declared | VERIFIED | `cdbb7e7` = 12 files, +5,207/-38; `fc4e03c` = 2 files, +231/-1 |
| 3 | Actual diff scope is documentation only | VERIFIED | `git diff --name-status 4317865..fc4e03c` = 13 docs files, all `A`/`M` under `docs/`; no `src/`, `scripts/`, `.github/`, `deploy/`, `package.json`, Angular config change |
| 4 | No merge/tag/deploy from the branch | VERIFIED | no tags containing HEAD; `git log --merges 4317865..HEAD` empty; PR #8 unmerged and draft |
| 5 | PR state and stacking | VERIFIED | `gh pr view 8`: OPEN, draft, base `feature/marea-mc01-agent-foundation`; `gh pr view 7`: OPEN, draft, base `main` |
| 6 | Delivery metadata matches the branch | VERIFIED | commit hashes, 12-file count, branch/PR/base and +5,207/-38 all match; document sizes are working-tree bytes in decimal KB and correspond to the files (the licence CSV is 733 KB in the working tree; its 731,486-byte committed blob differs by exactly 1,035 bytes from CRLF normalisation) |
| 7 | Format gate | VERIFIED | exit 0; scope note N-9 |
| 8 | Build gate | VERIFIED | exit 0, 96 prerendered routes |
| 9 | i18n gate | VERIFIED | exit 0, both check families pass |
| 10 | Commerce gate | VERIFIED | exit 0, full integration suite passes |
| 11 | SEO gate | VERIFIED | exit 0, 101 sitemap URLs |
| 12 | Backup/restore gate | VERIFIED | exit 0, integrity/FK/corrupt-copy checks pass |
| 13 | E2E gate | VERIFIED | 15/15 passed |
| 14 | Dependency audit gate | VERIFIED | 0 vulnerabilities at `--audit-level=high` |
| 15 | Diff hygiene | VERIFIED | `git diff --check 4317865..fc4e03c` exit 0 |
| 16 | `npm test` undefined and not reported | VERIFIED | `package.json` has no `test` script; no fabricated result |
| 17 | OPEN-MARINE identity and cleanliness | VERIFIED | HEAD `403941b886...`, 1,033 files, 82 commits, clean tree before and after review; no tags |
| 18 | No licence/notice/CLA/DCO in OPEN-MARINE | VERIFIED | case-insensitive `git ls-files` finds no `LICENSE`/`COPYING`/`NOTICE`; GitHub API `license: null`, `owner.type: User`, public; no `CONTRIBUTING`/`CODE_OF_CONDUCT`/`.mailmap`; `web_commit_signoff_required: false` |
| 19 | Authorship counts and shares | VERIFIED | 495/534/4 and 47.9/51.7/0.4 reproduce with the documented method (section 4 #3) |
| 20 | History metrics (root commit, tiles, test counts) | VERIFIED | 204 root files; 3,843 tiles with exact provider split; 214 TS + 3 Playwright + 23 Python (re-executed) |
| 21 | Licence inventory structure and totals | VERIFIED | section 4 #8-#10 |
| 22 | Licence inventory sampled against lockfiles | VERIFIED | 11/11 rows matched; aggregates 2,133/1,004/997 recomputed |
| 23 | Data-rights matrix structure, classifications, dates | VERIFIED | 28 x 28; 3/5/8/1/11; 28/28 URLs with `2026-10-30` |
| 24 | Official terms support the data classifications | VERIFIED | 6 official pages re-fetched (section 5.2); MBAR mislabel confirmed |
| 25 | Hardware register, PILOT gate and claim support | VERIFIED | 13+3 components; 81 cells 33/10/37/1; PILOT gate `BLOCKED` with sub-gate statuses; all 14 sampled citations correct (section 5.1); no EMC/CE/sea-trial claim |
| 26 | Capability inventory states, tests and gaps | VERIFIED | 18 rows / 2-10-1-1-1-3; G1-G14 documented; live re-execution of the 23 tests; API/isolation/watchdog findings match code |
| 27 | Product reuse map and non-clearance | VERIFIED | nine products; 83 rows 11/22/7/21/6/16; every product row `DEFINED, not sellable`; mandatory non-assertions section 5.3 |
| 28 | Commercial architecture boundaries | VERIFIED | four layers A-D; Mermaid diagram present; prohibited paths X-1..X-7; no Layer A -> Layer D path (only a dashed, bounded, local config command) |
| 29 | Blocker register counts and statuses | VERIFIED | 58 rows, exact category/severity/status distributions; no blocker silently closed |
| 30 | Registry reconciliation and MC-01 status | VERIFIED | 36 unique prompt IDs; D-001 schedule matches `DECISION-LOG.md`; downstream dependencies reference 02; MC-01 `PARTIAL`; 03-36 `PLANNED` |
| 31 | Delivery report gates/counts match reality | VERIFIED | section 3 and 4; one command-choice weakness (N-5) |
| 32 | Release/notice policy present and honest | VERIFIED | 20-gate checklist G-01..G-20; LR-01..LR-18; unmet controls marked `FAIL`/`BLOCKED`, not passed |
| 33 | No product represented as cleared/certified/sale-ready | VERIFIED | full-text scan: every clearance/certification/price statement about MAREA is a negation, a prohibition or an explicitly labelled hypothesis; quoted third-party requirements (e.g. NMEA certification rules) are clearly attributed; reuse map section 5.3 (items 1-10); no CE/NMEA/ENC/ECDIS claim |
| 34 | No fabricated figures or quotations | VERIFIED | every sampled count and citation holds; the only provider price quoted (OpenWeather 450 GBP/month) is on the official price page; MAREA price figures are labelled "hypothesis/unapproved" from the pre-existing portfolio doc |
| 35 | Evidence hygiene: no secrets, customer data or private positions | VERIFIED | credential-pattern scan over all delivered Markdown/CSV: 0 hits; only public Git author e-mails appear; no vessel coordinates or private customer data in the new artefacts; all external sources dated 2026-10-30 |
| 36 | Repository safety: no licence added, no code copied, OPEN-MARINE unmodified | VERIFIED | no licence/notice file in the diff; docs contain only audit commands, a Mermaid diagram and command logs, no OPEN-MARINE implementation copied into `src/`; OPEN-MARINE clean and unchanged; internal embarcarte references resolve (the only absent target was `MC-02-REVIEW.md`, supplied by this document) |

Criteria totals: **36 VERIFIED / 0 PARTIAL / 0 NOT VERIFIED / 0 BLOCKED.** The single blocking defect
(B-1) is a delivery-ordering condition, not a failed audit criterion; see section 9.

## 7. Cross-document consistency and truthfulness review

- **Headline counts are consistent across the audit deliverables and the delivery report.** The single
  source figures for components (13+3), capability states (2/10/1/1/1/3), compliance cells (33/10/37/1),
  protocol risks (1/4/6/1), blocker totals (58; 10/37/11; 28/22/4/1/1/2), licence rows (1,034), data rows
  (28) and reuse rows (83; 11/22/7/21/6/16) all match their own tables and each other. No document
  asserts a different value for any of these.
- **No product is described as ready.** Every reuse-map readiness row ends in `DEFINED, not sellable`
  (`MAREA-PRODUCT-REUSE-MAP.md:468-476`); the executive verdict repeats "none sellable"
  (`MC-02-EXECUTIVE-VERDICT.md:36`, `:139-141`); the blocker register closes with "No product in this
  register is approved for public commercial availability" (`MC-02-BLOCKERS-AND-DECISIONS.md:164-166`).
- **No prohibited certification chart or protocol claim exists.** Full-text scan found no affirmative
  CE/DoC/EMC/RED/GPSR/CRA/type-approval/NMEA-2000-certified/ENC/ECDIS claim about MAREA; every
  MAREA-facing occurrence is inside a prohibition or a non-assertion (for example
  `HARDWARE-COMPLIANCE-MATRIX.md:399-404`, `:544`; `MAREA-PRODUCT-REUSE-MAP.md:515-540`).
- **Prices remain hypotheses.** The MAREA euro figures appear only as inherited portfolio hypotheses
  explicitly labelled unapproved (`MAREA-PRODUCT-REUSE-MAP.md:158`, `:195`, `:232`, `:267`, `:373`,
  `:406`, `:443`); the audit invents no price, stock, quote or delivery figure. The only external price
  used (OpenWeather 450 GBP/month) was re-verified on the provider page.
- **Data findings are supported, not repeated.** The MBAR mislabel was confirmed in code and against the
  official IHM policy page; the Open-Meteo, OSM, OpenWeather and NMEA positions were confirmed on the
  official pages rather than accepted because two documents agree.
- **Minor precision defects** were found (N-1 to N-4 in section 9): one licence-declaration count, one
  history tile count, one raw-vs-family Apache count and one MBAR row that reports the repository label
  without flagging that the label is wrong. None of them changes a finding, a severity or a status.

## 8. Repository safety and evidence hygiene

| Check | Result | Evidence |
|---|---|---|
| OPEN-MARINE unmodified | PASS | `git status --porcelain` empty and HEAD `403941b886...` unchanged before and after the review; tests were run with `python -B` and wrote no bytecode |
| No licence file added to either repository | PASS | diff contains no `LICENSE`/`COPYING`/`NOTICE`/`LICENCE`; OPEN-MARINE has none |
| No OPEN-MARINE implementation code copied into EMBARCARTE | PASS | diff touches only `docs/`; the only code-like blocks in the deliverables are audit shell commands, a Mermaid design diagram and command-log text |
| No secrets, tokens or credentials | PASS | credential-pattern scan across all delivered artefacts: 0 matches; no `.env`, PEM or key material |
| No customer data or private vessel positions | PASS | only public Git author e-mails appear; no customer records, positions or personal data were introduced |
| No fabricated certificates, quotes or approvals | PASS | no certificate/DoC/quote artefact claimed; supplier data explicitly marked `BLOCKED`/`NOT_YET_ASSESSABLE` |
| Retrieval dates for external sources | PASS | 28/28 data-rights rows dated 2026-10-30; IP-chain appendices D/E and hardware matrix section 6.2 dated |
| No accidental CI/deployment change | PASS | `.github/workflows/deploy.yml` unchanged; `main` remains unprotected and the audit branch cannot deploy it |
| No merge, tag or production deployment | PASS | PR #7 and #8 both OPEN/draft; no tag on HEAD; no deploy triggered by the branch |

## 9. Defect register

### 9.1 Blocking

| ID | Defect | Evidence | Correction |
|---|---|---|---|
| **B-1** | The reviewed branch head marks prompt 02 `PASS` and cites `MC-02-REVIEW.md` as acceptance evidence, but that file does not exist in the committed tree at `fc4e03c`. The delivery report simultaneously records the independent review as `PENDING at audit commit`. This violates the registry's own rule that a prompt is never marked complete before the independent reviewer has verified it. The defect is delivery ordering, not audit content: this document is that missing evidence and supports the PASS verdict. | `MASTER-PROMPT-REGISTRY.md:48` (row 02 `PASS`, evidence includes `MC-02-REVIEW.md`); `:17-18` (never complete until review verified); `MC-02-EXECUTIVE-VERDICT.md:11` (evidence list includes the file); `MC-02-DELIVERY.md:11`, `:18`, `:187` (G11 `PENDING at audit commit`), `:209-210`; `MC-02-REVIEW.md` is not listed by `git ls-tree -r --name-only fc4e03c -- docs/marea/compliance`; `MC-02-DELIVERY.md:40` describes the delivery commit as adding "this report, the independent review and the registry status update", which `fc4e03c` does not (it adds the report and the registry update only) | Commit this review in the final delivery commit (the same commit may carry the N-item wording fixes), update the `MC-02-DELIVERY.md:40` row to name that commit, and keep PR #8 in draft until the review is committed. If the review is not committed, set prompt 02 back to `IN PROGRESS`; a PASS status without the reviewer evidence is not acceptable |

### 9.2 Non-blocking

| ID | Defect | Evidence | Correction |
|---|---|---|---|
| N-1 | "Six of eight `package.json` files declare no licence and are `private: true`" conflates two facts. Independently: 7 of 8 declare no licence (all except `marine-tile-server` `ISC`); 6 of 8 are `private: true`. | `MC-02-BLOCKERS-AND-DECISIONS.md:58`; parsed `package.json` files: root/autopilot/chart/UI/sensor-gateway/simulation = private and unlicensed; data-contract unlicensed not private; tile-server `ISC` not private. The hardware matrix wording at `:100`/`:179` ("six of the eight ... marked private") is correct | Reword S-08 to "seven of eight declare no licence; six of eight are marked private" |
| N-2 | The contribution-history note says the author identity included "3,846 chart-cache PNG tiles"; the correct chart-cache count is 3,843 (3,846 is the total number of distinct PNG additions over all paths). The rest of the document uses 3,843 consistently. | `INTELLECTUAL-PROPERTY-CHAIN.md:120` vs `:31`, `:281`, `:309`, `:363`; `MC-02-BLOCKERS-AND-DECISIONS.md:43`; re-derivation in section 4 #5 | Reword `:120` to "3,843 chart-cache PNG tiles (of 3,846 PNG additions ever)" |
| N-3 | "Apache-2.0 (35 rows)" in the missing-documentation table differs from "Apache-2.0 (38 rows)" in the summary and the executive verdict. Both are derivable but measure different things: 35 raw `license` strings equal Apache-2.0; 38 rows have the Apache-2.0 notice-bearing family classification (dual-licensed rows included). | `INTELLECTUAL-PROPERTY-CHAIN.md:340` vs `:30`; `MC-02-EXECUTIVE-VERDICT.md:33`; licence CSV `license_family` count 38, raw `license` count 35 | State the basis in both places, e.g. "38 rows in the Apache-2.0 notice family (35 raw Apache-2.0 declarations, 3 dual-licensed)" |
| N-4 | The IP-chain chart/weather table reports the MBAR row as "`CC BY 4.0` (catalog) - attribution - LEGAL_REVIEW_REQUIRED" without flagging that the catalogue label is wrong. Read in isolation it could appear to endorse the label, contradicting D-02 and the data-rights matrix. | `INTELLECTUAL-PROPERTY-CHAIN.md:263` vs `MC-02-BLOCKERS-AND-DECISIONS.md:66` (D-02) and `MARINE-DATA-RIGHTS-MATRIX.csv` MD-11 | Add "(repository label is incorrect - actual licence CC-BY-NC 4.0; see D-02)" to that row |
| N-5 | The delivery report records diff hygiene as `git diff --cached --check`, which checks only staged changes; on a clean or empty index it can pass without examining the branch range. The reviewer re-ran the range check and it is clean, so the conclusion holds, but the recorded command does not prove it. | `MC-02-DELIVERY.md:153`; reviewer command `git diff --check 4317865..fc4e03c` = exit 0 | Record the range command in the delivery report |
| N-6 | The delivery table labels the 81 cells "EU/ES/PT compliance cells". The matrix is 9 EU-level regimes x 9 families; the Spanish transposition is discussed and Portuguese transposition is explicitly `NOT_YET_ASSESSABLE`. The label overstates Portuguese coverage. | `MC-02-DELIVERY.md:107` vs `HARDWARE-COMPLIANCE-MATRIX.md:523` | Reword to "EU compliance regimes (ES transposition discussed; PT NOT_YET_ASSESSABLE)" |
| N-7 | The executive verdict calls the Angular marine UI "working", but the audit executed no Node build, no UI test and no runtime; the capability inventory classifies it `IMPLEMENTED_NOT_FULLY_TESTED`. | `MC-02-EXECUTIVE-VERDICT.md:17` vs `OPEN-MARINE-CAPABILITY-INVENTORY.md:54-60`, `:525` | Reword to "implemented (static evidence; not executed in this audit)" |
| N-8 | The deterministic validation script is stated to live outside the repository, so the delivery's artefact checks are not reproducible by a later reviewer without rewriting the script. The reviewer re-derived the counts independently, so no count is unverified. | `MC-02-DELIVERY.md:155` ("script outside the repository") | Commit the checker under `scripts/compliance/` in prompt 32 (or record its exact source in the milestone evidence) |
| N-9 | `format:check` is reported as a passing quality gate on a documentation-only branch, but its glob covers only `e2e/`, `playwright.config.ts` and selected `scripts/*.mjs`; it never examines the delivered Markdown/CSV. The gate is green but not applicable to the reviewed diff. | gate log line 4; `package.json` `scripts.format:check`; `MC-02-DELIVERY.md:145` | State the gate's scope in the delivery report (as MC-01's review did) or add a documentation-format gate in a later milestone |

## 10. Residual risks and verification limits

| ID | Risk / limit | Consequence | Owner / next evidence |
|---|---|---|---|
| R-1 | OPEN-MARINE has no inbound or outbound licence and no contributor assignments; 47.9% of current files were last touched by a third-party employer-style identity. | No code may be commercially reused or redistributed until DEC-01/D-01..D-05 are resolved by humans and counsel. | Company owner + counsel; blocker L-01..L-03 |
| R-2 | Data-provider terms: only 5 of 28 rows were live-sampled by this review; 11 rows remain `LEGAL_REVIEW_REQUIRED` and several provider pages were unreachable during the audit as recorded. | Chart, weather, tide and AIS data cannot be licensed or published; classifications could change if a provider updates terms. | Data-rights owner; re-fetch before any data-dependent release |
| R-3 | PILOT safety: software safety logic is `PARTIAL`, no relay output, no rudder feedback, no hardware watchdog, unauthenticated control API, no bench or sea-trial evidence. | PILOT must not be sold, pre-sold or marketed; HUB/PILOT field use is unsafe until H-01..H-03/H-10 close. | Engineering + safety; DEC-06 |
| R-4 | NMEA 2000 is not implemented (type stubs only) and no NMEA licence/certification exists. | No NMEA 2000 compatibility or certification claim may be made; any such SKU needs a licensed implementation and certification. | DEC-05 |
| R-5 | The 214 TypeScript unit cases and 3 Playwright cases were not executed (no `node_modules` in OPEN-MARINE; installs prohibited). | All TypeScript capabilities remain static-evidence only; a reproducible build/test environment is a prerequisite for reuse (P-10). | Engineering; prompt 32 |
| R-6 | Copyleft exposure: AIS-catcher (GPL-3.0), GPL `make`/`g++` inside the non-multi-stage Dockerfile, EUPL `copernicusmarine`, LGPL `libusb`. | Shipping the appliance as currently built would create source-provision/notice obligations; no NOTICE bundle exists for 1,034 components. | DEC-04; engineering; release gates G-06/G-07/G-12 |
| R-7 | 3,843 provider-rendered tiles (including proprietary OWM and IHM tiles) and Signal K configuration remain retrievable in public Git history. | A public-release claim must account for history, not only `HEAD`; history rewrite vs notice is an open legal decision. | L-07 / R-IP-07; counsel |
| R-8 | MC-01 remains `PARTIAL` (no image-generation capability or budget authorization); image assets remain `CONCEPT`, never `REAL_PRODUCT`. | No MAREA visual may be presented as a real product photograph; brand publication remains blocked. | Company owner; X-03/DEC-01 sequence |
| R-9 | This review's external verification is a sample: 14 OPEN-MARINE `file:line` claims and 6 official pages, not the full 28-row provider matrix nor all 1,034 licence rows. | Residual sampling risk is low because the sampled items are the load-bearing findings and all matched, but it is not zero. | Future reviewer can expand the sample; the documents are fully cited |
| R-10 | Attestations that could not be independently observed: the Harness environment string, and the absence of chargeable API calls, downloads, hardware activation or radio transmission during the audit. | No artefact or tracked file contradicts them; they are accepted as attestations, not as verified facts. | Lead to keep the audit trail (cost/API logs outside the repository) |

Deliberately not re-run or re-fetched: the TypeScript/open-marine build and tests (no install permitted),
the provider pages that were already unreachable in the audit, the Raspberry Pi/MD30C vendor documents
(404 on 2026-10-30 as recorded), and the live public site (outside MC-02 scope).

## 11. Audit completion versus product clearance

| Question | Answer |
|---|---|
| Is MC-02 complete as an audit? | **Yes.** Ten required audit deliverables plus the delivery report and the decision-log entry are present; every headline count and sampled citation re-derives; all gates are green; no blocking content defect was found. |
| Does MC-02 PASS clear any product? | **No.** All nine products are `DEFINED`, not sellable; no price, stock, delivery, certification, chart right or data right is cleared. |
| Does it clear any licence or data source? | **No.** Only the inventory and classification are done; ownership/licence decisions and provider agreements remain `BLOCKED`. |
| Does it clear any hardware? | **No.** PILOT gate `BLOCKED`; no BOM, bench, sea-trial, EMC or conformity evidence exists. |
| Does it authorise merge, deployment or publication? | **No.** This review authorises none of them; PR #8 stays draft until B-1 is closed and PR #7 is merged, then the diff must be re-verified before retargeting. |
| What is now evidence-backed? | The capability inventory, licence/IP position, data-rights matrix, hardware/safety/protocol assessment, nine-product reuse map, target architecture, blocker register, notice policy and the revised 36-prompt registry. |

## 12. Exact next action

1. **Lead - close B-1 in the final delivery commit:** commit `docs/marea/compliance/MC-02-REVIEW.md`
   (this file) together with the N-1 to N-4 wording fixes (N-5 to N-9 optional but recommended); update
   `MC-02-DELIVERY.md` section 2 to name that commit as the delivery commit and update G11 from "PENDING
   at audit commit" to the recorded review verdict.
2. **Lead - re-check the final commit:** `git diff --check 4317865..<new-head>`, confirm only documentation
   files changed, confirm the review file exists, and re-run `npm run format:check` only if any covered
   file was touched (it should not be).
3. **Keep PR #8 draft and stacked.** Do not retarget to `main` while PR #7 is open; after PR #7 merges,
   re-verify the diff against `main` before retargeting. No merge, tag or deploy from this review.
4. **If the review cannot be committed:** set prompt 02 back to `IN PROGRESS` in
   `MASTER-PROMPT-REGISTRY.md`; a PASS without the committed reviewer evidence is not acceptable.
5. **Then, and only then, MC-02 may be signed off as `PASS (audit scope)`** while every product remains
   uncleared and every external blocker in `MC-02-BLOCKERS-AND-DECISIONS.md` remains open.

## Appendix A - Commands executed by the reviewer

```text
# summary of the exact commands run (all read-only; results in sections 3-5)
git status --porcelain -b; git log --oneline -8 --decorate; git rev-parse HEAD; git rev-parse 4317865; git merge-base HEAD 4317865
git show --stat --oneline cdbb7e7; git show --numstat --format='' cdbb7e7; git show --stat --oneline fc4e03c
git diff --name-status 4317865..fc4e03c; git diff --check 4317865..fc4e03c
git ls-tree -r --name-only fc4e03c -- docs/marea/compliance   (delivered artefact set at the reviewed head)
gh pr view 8 --json ...; gh pr view 7 --json ...; gh pr list --repo manuelxose/embarcarte
gh api repos/manuelxose/open-marine; gh api repos/manuelxose/open-marine/branches
gh api repos/manuelxose/embarcarte/branches/main/protection
npm run format:check; npm run build; npm run test:i18n; npm run test:commerce; npm run test:seo
npm run test:backup; npm run test:e2e; npm audit --omit=dev --audit-level=high
cd open-marine: git ls-files; git rev-list --count --all [--merges|--no-merges]; git shortlog -sne --all
git ls-tree -r --name-only 281ba95 | Measure-Object; git log --all --name-only (per-file last-touch stream)
git log --all --diff-filter=D --name-only --pretty=format: -- '*.png'   (3,843 cached tiles, provider split)
git grep -n <cited symbols and lines>; git status --porcelain (clean before/after)
python -B marine-autopilot-engine/pico2/tests/test_bench_motor.py -v
python -B -m unittest test_wind_nmea -v            (cwd marine-sensor-gateway/rpi/wind)
python -B -m unittest test_publish_signalk -v      (cwd marine-sensor-gateway/rpi/omi-imu)
python (CSV/JSON/table re-derivation in %TEMP%; no script committed)
web_fetch of the 6 official sources listed in section 5.2
```

Reviewed-state artefact sizes (bytes at `fc4e03c`): executive verdict 14,422; capability inventory 81,527;
IP chain 57,894; licence CSV 731,486; notice/distribution policy 35,495; data-rights CSV 32,324; hardware
matrix 90,889; reuse map 69,799; architecture 49,308; blocker register 32,926; delivery report 14,772;
decision log 5,243; registry 15,556.

*End of review. Verdict: **PASS (audit scope)** - 36/36 criteria verified, 1 blocking delivery-hygiene
defect (B-1) to be closed by the final delivery commit, 9 non-blocking wording/reproducibility defects;
no product is cleared, certified or sale-ready.*
