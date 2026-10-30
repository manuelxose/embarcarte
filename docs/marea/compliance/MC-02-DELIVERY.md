# MC-02 — Delivery report

Milestone: **MC-02 — Technology, intellectual property, software licensing and commercial-reuse audit**
Programme: EMBARCARTE / MAREA (36 Master Prompts). Prompt: 02 of 36 (revised registry, decision D-001).
Date: 2026-10-30. Environment: Windows 11, DeepSeek Harness Desktop `0.2.1-rc.5`, profile `desktop`.
Repository: `manuelxose/embarcarte` (branch `feature/marea-mc02-technology-audit`).
Audited technology repository: `manuelxose/open-marine` @ `403941b8860439115418b1786d8431284d2dae08` (read-only).

## 1. Verdict

**MC-02 = PASS (audit scope).**

The audit produced every required deliverable with traceable evidence: complete workspace/capability
inventory, full dependency inventory from real lockfiles, copyright/ownership chain assessment,
licence classification per distribution model, marine data-rights matrix from official terms, hardware
and safety assessment with an explicit PILOT gate, all nine products mapped to real technology, a
target commercial architecture, an operational licence-notice policy, and a 58-entry blocker register.
The required quality gates pass and an independent reviewer verifies the branch (see §10).

**PASS here means the audit is complete — it does not clear any product, data source, licence or
hardware for commercial release.** External legal permissions, data agreements, certifications and
physical/sea-trial evidence remain BLOCKED and are recorded as such; the affected commercial
activities stay restricted.

- Nothing was merged to `main`; nothing was deployed.
- OPEN-MARINE was not modified (`git status` clean, HEAD unchanged at `403941b`).
- No LICENSE/COPYING/NOTICE file was added to either repository.
- No OPEN-MARINE implementation code was copied into EMBARCARTE.
- No chargeable API, bulk download, hardware activation or radio transmission was performed.
- MC-01 remains `PARTIAL` and the AI image-generation blocker remains open.

## 2. Git state (verified)

| Item | Value |
|---|---|
| MC-01 head / PR #7 | `43178657fae8b7435ac4b38f3af065ce74081aa7`; PR [#7](https://github.com/manuelxose/embarcarte/pull/7) still OPEN, DRAFT, base `main`, unmerged |
| MC-02 base | `4317865` (MC-01 head, as required by the stacked-branch rule) |
| MC-02 branch | `feature/marea-mc02-technology-audit` |
| Audit-deliverables commit | `cdbb7e76dbadefbd80317c167d562df4d573f78d` — 12 files, +5,207/−38 |
| Delivery commit | the commit that adds this report, the independent review and the registry status update |
| Draft PR | [#8](https://github.com/manuelxose/embarcarte/pull/8) — `feature/marea-mc02-technology-audit` → `feature/marea-mc01-agent-foundation` (stacked; retarget to `main` only after PR #7 is merged and the diff reverified) |
| Merge/deploy | **None.** No tag, no merge, no production deployment |

## 3. Team execution

Lead + five specialists, each with an exclusive write scope on the shared task board; a sixth
independent reviewer was spawned after delivery (Agent F). Read-only source inspection ran in parallel;
integration and Git were performed only by the Lead.

| Role | Deliverable | Task |
|---|---|---|
| Lead | verdict, blockers register, delivery, decision log, registry, integration | — |
| A — Source and architecture | `OPEN-MARINE-CAPABILITY-INVENTORY.md` | task-1 |
| B — IP and licensing | `INTELLECTUAL-PROPERTY-CHAIN.md`, `SOFTWARE-LICENSE-INVENTORY.csv`, `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` | task-2 |
| C — Marine data rights | `MARINE-DATA-RIGHTS-MATRIX.csv` | task-3 |
| D — Hardware and safety | `HARDWARE-COMPLIANCE-MATRIX.md` | task-4 |
| E — Product strategy | `MAREA-PRODUCT-REUSE-MAP.md`, `MAREA-COMMERCIAL-ARCHITECTURE.md` | task-5 |
| F — Independent QA | `MC-02-REVIEW.md` | task-6 |

## 4. Files created / changed

New (`docs/marea/compliance/`):

| File | Size | Content |
|---|---:|---|
| `MC-02-EXECUTIVE-VERDICT.md` | 14 KB | Decision-oriented verdict, useful technology, risks, product opportunities, decisions |
| `OPEN-MARINE-CAPABILITY-INVENTORY.md` | 82 KB | 7 workspaces + runtime dirs, 18 capability rows, test evidence, gaps G1–G11, documentation ledger |
| `INTELLECTUAL-PROPERTY-CHAIN.md` | 58 KB | Custody, deterministic authorship, rights A–J, missing assignments D-01–D-13, 12-row risk register, licence options |
| `SOFTWARE-LICENSE-INVENTORY.csv` | 733 KB | 1,034 rows × 21 columns |
| `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` | 36 KB | Intake gates, notice bundle, source disclosure, container/firmware policy, 20-item release gate, LR-01–LR-18 |
| `MARINE-DATA-RIGHTS-MATRIX.csv` | 32 KB | 28 provider/dataset rows × 28 columns, official URLs, retrieval dates |
| `HARDWARE-COMPLIANCE-MATRIX.md` | 91 KB | 13 components + 3 absent, PILOT gate, protocol rights, 81-cell EU/ES/PT matrix |
| `MAREA-PRODUCT-REUSE-MAP.md` | 70 KB | Nine products, 83 reuse decision rows, four-axis readiness, mandatory non-assertions |
| `MAREA-COMMERCIAL-ARCHITECTURE.md` | 49 KB | Four layers, Mermaid diagram, data/authority boundaries, Signal K decision, weather/chart/AIS boundaries |
| `MC-02-BLOCKERS-AND-DECISIONS.md` | 33 KB | 58 blockers (10 CRITICAL / 37 HIGH / 11 MEDIUM), 8 decisions required |
| `MC-02-DELIVERY.md` | this file | Delivery evidence |
| `MC-02-REVIEW.md` | independent review | Reviewer verdict and defects |

New (`docs/marea/execution/`):

- `DECISION-LOG.md` — D-001 schedule reconciliation and D-002 no-licence/no-copy decision.

Modified:

- `MASTER-PROMPT-REGISTRY.md` — prompt 02 reassigned to this audit, displaced brand work moved to
  prompt 03 with the identity system to 04 and product batches to 05–10; prompt 11–36 preserved;
  dependencies updated to consume the MC-02 blockers; MC-01 `PARTIAL` preserved.

Not changed: `src/`, `scripts/`, `.github/`, `deploy/`, `package.json`, Angular configuration,
application behaviour, CI/deployment triggers, OPEN-MARINE.

## 5. Audit results (real counts)

| Measure | Result |
|---|---:|
| OPEN-MARINE workspaces audited | 7 (+8 supporting areas) |
| Tracked files / commits / authors | 1,033 / 82 / 4 |
| Capability rows | 18 |
| Direct dependencies identified | 109 |
| Transitive dependencies inventoried | 925 |
| Total licence-inventory rows | 1,034 (997 npm + 7 first-party + 13 Python + 17 platform) |
| Unknown/unlicensed licence records | 8 (7 proprietary/unlicensed + 1 unknown package) |
| Third-party binaries / images / runtime components | 2 container images, 4 external binaries, 6 apt packages, 3 CI actions, 1 firmware runtime, 1 Node runtime |
| Data providers/datasets assessed | 28 |
| Data rows requiring legal review | 11 |
| Hardware components identified / absent | 13 / 3 |
| EU/ES/PT compliance cells | 81 (33 clearly applicable, 10 potentially, 37 N/A with explanation, 1 not yet assessable) |
| Product reuse decision rows | 83 |
| Blockers recorded | 58 (10 CRITICAL, 37 HIGH, 11 MEDIUM) |
| Real tests executed in the audit | 23 Python unit tests passed (15 Pico policy, 5 wind NMEA, 3 IMU fusion) |

Source counts are re-derivable from the audited commit and the five lockfiles; the validation script
checks the registry row count, CSV field counts, blocker counts and deliverable presence (§7).

## 6. Principal findings

1. **No inbound licence and no complete ownership chain.** OPEN-MARINE is public with no
   `LICENSE`/`COPYING`/`NOTICE`; GitHub reports `license: null`. 47.9% of current files were last
   touched by `mgonzalezv@eservicios.indra.es`; 51.7% by `oficina@tecnoriasl.com`; no CLA/DCO exists.
2. **Distribution licensing.** 997 npm components are almost entirely permissive/public-domain, but
   copyleft enters outside npm: AIS-catcher GPL-3.0 (downloaded/compiled into the appliance path),
   GPL `make`/`g++` left in a non-multi-stage Dockerfile, `copernicusmarine` EUPL-1.2. No NOTICE
   bundle exists for 1,034 components.
3. **Marine data rights.** No official ENC distributor/OEM agreement; Open-Meteo free tier is
   non-commercial; OSM tile policy forbids offline/bulk prefetch; OpenWeather tile layers are a
   separate paid SKU; Esri imagery has no licensed path; CNIG/IHM MBAR bathymetry is labelled
   `CC BY 4.0` in code but is non-commercial and not for navigation.
4. **Hardware and safety.** PILOT commercialisation gate **BLOCKED** — no bench, sea-trial,
   independent-verification or conformity evidence; no relay output, no rudder feedback, no hardware
   watchdog; unauthenticated control API on `0.0.0.0` with CORS `*`. 13 components identified, only
   one with an exact part number, none with a board revision; no BOM or test report.
5. **Protocols.** NMEA 2000 is not implemented (type stubs only); NMEA's official position requires
   certification/licence/manufacturer/product codes for products that read or transmit it. Parsing
   NMEA 0183 is not conformity. Signal K spec is CC-BY-SA 2.0, reference server Apache-2.0.
6. **Products.** All nine products are `DEFINED`, none sellable. WATCH and FLEET have no relevant
   implementation; DISPLAY/SENSE/AIS hardware does not exist; NAV depends on chart rights; WEATHER
   depends on provider contracts.

## 7. Commands and tests executed (real output)

Run by the Lead on branch `feature/marea-mc02-technology-audit`:

| Gate | Command | Result |
|---|---|---|
| Formatting | `npm run format:check` | PASS (exit 0) |
| Build | `npm run build` | PASS — prerendered 96 static routes |
| i18n | `npm run test:i18n` | PASS — locale, route and translation checks |
| Commerce | `npm run test:commerce` | PASS — catalogue, stock, authorization, webhook, security regressions |
| SEO | `npm run test:seo` | PASS — 101 sitemap URLs, canonical/hreflang/JSON-LD/private noindex |
| Backup/restore | `npm run test:backup` | PASS — checksums, integrity, FK, corrupt-copy rejection |
| E2E | `npm run test:e2e` | PASS — 15/15 Playwright tests (Chromium) |
| Dependency audit | `npm audit --omit=dev --audit-level=high` | PASS — 0 vulnerabilities |
| Diff hygiene | `git diff --cached --check` | PASS (exit 0) |

Deterministic artifact validation (Lead, script outside the repository):

- Master prompt registry: 36 unique prompt IDs, no duplicate row.
- `SOFTWARE-LICENSE-INVENTORY.csv`: required 12-column header order exact; 1,034 data rows; 21 columns;
  every row has the correct field count.
- `MARINE-DATA-RIGHTS-MATRIX.csv`: 28 data rows; 28 columns; every row has the correct field count.
- `MC-02-BLOCKERS-AND-DECISIONS.md`: 58 records; category counts L9/S9/D10/H13/P10/X7; severity counts
  10/37/11; status counts 28 BLOCKED, 22 OPEN, 4 LEGAL_REVIEW_REQUIRED, 1 NOT_YET_ASSESSABLE,
  1 REUSE-CONDITIONAL, 2 BUILD.
- Required deliverables present: 10/10 at the time of the audit commit.
- Internal reference check: 125 embarcarte-relative references examined; the only unresolved targets
  are the two files created after the audit commit (`MC-02-DELIVERY.md`, `MC-02-REVIEW.md`) and
  OPEN-MARINE-relative citations in evidence tables.
- OPEN-MARINE integrity: `git status --porcelain` empty, `rev-parse HEAD` still `403941b886...`.
- No licence file added in either repository; no `LICENSE`/`COPYING`/`NOTICE` created.

`npm test` is not defined in `package.json` and was not run or reported.

## 8. Quality gates (G1–G14)

| Gate | Result | Evidence |
|---|---|---|
| G1 Repository coverage | PASS | 7 workspaces + 8 supporting areas, §4 of capability inventory |
| G2 Dependency coverage | PASS | 1,034 rows; unknown recorded (1 package + 7 unlicensed first-party/platform) |
| G3 Copyright chain | PASS (assessment) | IP chain §2–§7; ownership clearance BLOCKED externally |
| G4 Licence classification | PASS | Inventory + policy; per distribution mode |
| G5 Marine data rights | PASS | 28 providers; 11 LEGAL_REVIEW_REQUIRED recorded, not guessed |
| G6 Protocol compliance | PASS | NMEA/Signal K/AIS distinction in hardware matrix §4 |
| G7 Hardware compliance | PASS | Matrix §2–§5; PILOT gate BLOCKED |
| G8 Product reuse | PASS | Nine products mapped, 83 decision rows |
| G9 Architecture | PASS | Four layers + Mermaid + authority boundaries |
| G10 Documentation | PASS | All required deliverables with provenance |
| G11 Independent review | PENDING at audit commit | `MC-02-REVIEW.md` (Agent F) |
| G12 Repository safety | PASS | OPEN-MARINE clean; no merge/deploy/licence/copy |
| G13 Existing gates | PASS | §7 above |
| G14 Roadmap | PASS | Registry reconciled (D-001); 36 prompts preserved |

## 9. Blockers and decisions

The full register is `MC-02-BLOCKERS-AND-DECISIONS.md`:
58 blockers, 8 human/legal decisions (DEC-01 ownership/licence, DEC-02 ENC, DEC-03 weather,
DEC-04 AIS decoder, DEC-05 NMEA 2000, DEC-06 PILOT, DEC-07 manufacturing, DEC-08 launch order).

Most consequential: ownership/assignments (L-01–L-03), PILOT safety gate (H-01, P-04), official ENC
rights (D-01), weather licensing (D-04), NMEA 2000 certification (H-04), CE/EMC/RED/GPSR/CRA evidence
(H-05, H-06, H-13), and the image-generation blocker (X-03, inherited from MC-01).

## 10. Independent review

Reviewer: `qa-reviewer`, a separate agent that authored none of the reviewed files. Its mandate:
inspect the actual branch/diff and PR, re-run the gates, verify representative claims and counts,
check the registry reconciliation and produce `MC-02-REVIEW.md` with a PASS/PARTIAL/BLOCKED/FAIL
verdict and blocking/non-blocking defects.

**Review verdict: recorded in `MC-02-REVIEW.md`.** Findings and any corrections are applied before the
final delivery commit.

## 11. Limitations

- External terms were retrieved from official public sources on 2026-10-30; several provider pages
  were unreachable (MeteoGalicia legal notice, Puertos del Estado timeout, some IHM/PDF pages) and are
  recorded as `LEGAL_REVIEW_REQUIRED` with the URL and limitation, not guessed.
- No Node/TypeScript build or test was executed for OPEN-MARINE (no `node_modules`, installs
  prohibited); the 214 TS unit cases and 3 Playwright cases remain `NOT_VERIFIED`.
- No hardware was energised, flashed or actuated; no radio/CAN/serial traffic was generated.
- `@mapbox/jsonlint-lines-primitives` licence remains unresolved; `node:18-slim` image SBOM is not
  enumerated; two dependency edges are noted in the IP chain appendix.
- Ownership statements are evidence-based assessments, not legal title opinions.

## 12. Readiness and next milestone

MC-02 closes the technology/IP/licensing evidence gap. The programme is ready for **MC-03 — Brand
architecture and legal clearance policy** (position 03 after decision D-001), which must run alongside
the ownership/assignment work (DEC-01) and must not publish MAREA as a registered or cleared brand.

**No subsequent milestone is started automatically. No production merge or deployment is authorized.**
