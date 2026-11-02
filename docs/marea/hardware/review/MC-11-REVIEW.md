# MC-11 — Independent technical and evidence audit (D35)

| Field | Value |
|---|---|
| Reviewer | `qa-reviewer` (Agent G) — independent auditor; authored none of the audited material |
| Final confirmed commit | `a912c4d77918e1d4e04877e097fda75a3fc89ea8` (record-refresh-only commit; branch head) |
| Technical re-verified commit | `0eceb8663204e6b5d82a137bb0cb50b742e667dc` (delivery commit) |
| Original audited commit | `bef2f4b25e06205697bee4de9da908741c726621` |
| Correction commits | `73ab0ac` (audit corrections), `0eceb86` (delivery), `a912c4d` (PA-01…PA-05 refreshes) |
| Branch / PR | `feature/marea-mc11-hardware-sourcing-conformity`; draft PR [#18](https://github.com/manuelxose/embarcarte/pull/18) |
| Verified base | MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (local = `origin/feature/marea-mc10r-fieldwork-recovery`) |
| Date | 2026-11-02 (Europe/Madrid) |
| Audit scope | Actual committed tree at `a912c4d`; technical content identical to the re-verified `0eceb86` (diff contains record refreshes only) |
| Write scope of this audit | `docs/marea/hardware/review/` and `docs/marea/hardware/data/review-findings.json` only |

## 1. Verdict (final, after three audit rounds)

**`PARTIAL` — full MC-11. Internal feasibility scope: `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`.**

- **Internal hardware feasibility scope = `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`.** All 22 items of
  `MC11-BASELINE-AND-GOVERNANCE.md` §10 are evidenced, including **item 21** (all `BLOCKING`/`MAJOR`
  findings closed) and **item 22** (draft PR #18, stacked on the verified base, unmerged — verified at
  the final head).
- **Full MC-11 = `PARTIAL` and can never be `PASS`.** The authoritative registry requires *real
  supplier quotes*; no supplier was contacted and no quotation exists
  (`MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`; 0 suppliers, 0 RFQs, 0 quotations).
  This is an external evidence gap, **not a finding against the authors**; the registry requirement is
  neither rewritten nor relaxed.
- **No `FAIL` condition.** No required gate is violated (all re-run gates pass at `a912c4d`); no
  fabrication exists (`FORMAL_SUPPLIER_QUOTATION`/`SUPPLIER_QUOTED` only in prohibition text; no
  `TESTED`/`SUPPORTED` compatibility value; no measured/performance/certification/availability/price
  claim). The final head `a912c4d` introduces **no technical change** (see §13): the diff against
  `0eceb86` touches only registry/governance/manifest/D2/D36/D37/review records.
- **Findings `MC11-F01…F09`: all `CLOSED_VERIFIED`** (0 open `BLOCKING`/`MAJOR`/`MINOR`;
  `MC11-F03` was withdrawn after the auditor's own arithmetic premise was corrected — §7).
- **Post-audit actions `PA-01…PA-05`: all `CLOSED_VERIFIED`** at `a912c4d` (§13). One non-blocking
  wording note remains on the phrase "current head" in D2/registry (§13); it does not affect the
  verdict.

**Final milestone statement:**
`PARTIAL — INTERNAL HARDWARE FEASIBILITY SCOPE PASS (re-verified at 0eceb86, records confirmed at`
`a912c4d); FORMAL SUPPLIER QUOTATIONS NOT OBTAINED (BLOCKED_OR_NOT_OBTAINED).`

## 2. Method and independence (three rounds)

1. **Round 1** audited the fixed commit `bef2f4b` against the actual tree (not the summary), recomputed
   the evidence from raw JSON, re-fetched 13 representative external URLs and ran all mandated gates.
2. **Round 2** re-verified only the Lead's corrections at `0eceb86`, including a full re-inspection of
   the cost arithmetic after the Lead contested `MC11-F03`; re-ran the required gates; and reviewed the
   new delivery artefacts (D36/D37/registry/D-048/manifest) for overclaim.
3. **Round 3 (this pass)** confirms **only** the five record refreshes `PA-01…PA-05` at `a912c4d`:
   verified that the final commit is record-only (8 files, none of the technical data files), checked
   each refreshed record against the re-issued verdict, and re-ran `test:hardware`,
   `test:hardware:unit`, `format:check` and `git diff --check`.

**Independence statement.** The reviewer authored no audited file. The only files written by this
audit are this report and `data/review-findings.json`.

**Audit integrity note.** The round-1 `MC11-F03` finding was based on an additive assumption that
double-counted the tooling line. It is withdrawn and closed after re-inspection; the error is recorded
here rather than silently deleted.

## 3. Baseline, scope and PR (dimension A / item 22) — `VERIFIED`

| Check | Result |
|---|---|
| Final head | `HEAD` = `a912c4d77918e1d4e04877e097fda75a3fc89ea8`; working tree clean before this audit's edits |
| Remote branch | `git ls-remote origin refs/heads/feature/marea-mc11-hardware-sourcing-conformity` = `a912c4d` |
| Draft PR | PR **#18**: `state OPEN`, `isDraft true`, `mergeable MERGEABLE`, `headRefOid a912c4d`, base `feature/marea-mc10r-fieldwork-recovery` (base head `6713178`), unmerged |
| No merge/deploy | no tags at head, no merge commits in `6713178..a912c4d`; no publication/merge/deploy performed |
| Clean scope | the milestone's changes remain confined to `docs/marea/hardware/`, `docs/marea/execution/` records, `package.json` test/format scripts and the two hardware scripts; no `src/`, `public/`, `deploy/`, commerce, publication or OPEN-MARINE change |
| Ancestry | `6713178` is an ancestor of `a912c4d` |

Acceptance item 22 is evidenced at the final head.

## 4. Product, bundle and architecture coverage (dimensions B, C) — `VERIFIED`

- Nine canonical families; canonical editions (0 invalid); six bundles whose component lines match
  `bundle-definitions.json` (0 mismatches); `FLEET hardwareIncludedByDefault = false`; kits expand only
  to existing module editions; `PROTECT` counts each sensor once; `fixedTurnkeyPrice = false` for all
  six bundles.
- Frozen 11 architecture weights sum 100; all **33** weighted scores re-derived (0 mismatch);
  `summaryTable` 0 drift; D29 nine portfolio scores all correct; `hardware-families.json` AIS/DISPLAY
  provisional ids are `ARCH-AIS-E`/`ARCH-DISPLAY-D` and agree with D3, D4, D9, D29 and
  `recommendations[]` (F04 closed).
- No performance/power/thermal/EMC/ingress claim is presented as measured; every such value remains
  `UNKNOWN`, `NOT_MEASURED` or candidate.

## 5. Sourcing and evidence integrity (dimensions D, F) — `VERIFIED WITH DISCLOSED LIMITATION`

- 41 components, all with MPN; `datasheetStatus` honest (`RETRIEVED = 0`, `LISTED_NOT_RETRIEVED` 31,
  `NOT_FOUND` 10); 42 price observations correctly classified (37 manufacturer list = 36 USD + 1 EUR;
  5 authorised-distributor EUR); **0 quotations**, **0** `FORMAL_SUPPLIER_QUOTATION`/`SUPPLIER_QUOTED`
  data values; unknown ≠ 0; no invented MOQ/lead time/stock/warranty; no customer demand/WTP.
- 22 evidence records are marked `VERIFIED_BY_AUDITOR`, mapping exactly to the 11 URLs the auditor
  fetched; **none** of the inaccessible sources (TI datasheet PDF, RS page) is marked verified.
- Residual limitation, explicitly disclosed by the authors and carried forward: **21/127** evidence
  records are inaccessible/partial and **0/41** datasheets were retrieved; confidence in component
  parameters and the single EUR distributor price is correspondingly limited (F08). No evidence or
  parameter was upgraded by any correction commit.

## 6. BOM and cost arithmetic (dimension E) — `VERIFIED` (with the F03 correction)

Independently recomputed from raw JSON: all **11 engineering BOMs** (155 lines) and **11 manufacturing
BOMs** (171 lines) — totals, unknown counts and `INCOMPLETE` status **0 mismatches**; 34 USD lines
converted at 0.925925926 (FX-USD-EUR-01) **0 mismatches**; tier integrity 0 mismatches; all **90**
scenarios (known-line sum, `missingCategories`, `totalStatus`) and the D31 BASE table (30/30 rows)
**0 mismatches**.

**Corrected tooling understanding (F03).** `SCN-HUB-100-BASE` KNOWN category lines sum to **437.13 and
include** `COST-16 = 120.00`; the standalone `toolingAmortizationEur = 120.00` repeats that amount and
must **not** be added again (adding it would double count). Verified across 90/90 scenarios: the
tooling field equals the `COST-16` line (or 0), and D31's clarified heading (COST-16 included, field
not re-added, with the 12 000/1 200/120/24/12 EUR HUB amounts) is accurate. The round-1 finding's
premise was wrong; the original data values were correct.

## 7. Regulations, NMEA, safety, security, governance (dimensions G–K) — `VERIFIED`

- **EU regulatory:** 11 acts, 22 configurations; every `applicable`/`notApplicable` row has a written
  rationale; all rows `APPLICABILITY_ASSESSED_NOT_CERTIFIED`; recomputed applicability counts match D23
  (RED 13/9, EMC 6, LVD 0, RoHS/WEEE/GPSR/PPWR 19, CRA 20, BAT 12, MED/RCD 0). CRA dates independently
  confirmed against official Commission pages: in force 10 Dec 2024, **reporting 11 Sep 2026**, **main
  obligations 11 Dec 2027**. All **18 conformity blockers remain open**; none is presented as closed.
- **NMEA:** implementation, membership/licence, manufacturer code, certification, terminology and logo
  use separated; `nmea2000Certified = false`, `testedCompatibilityRows = 0`; no certification claimed.
- **Safety:** `PILOT_SAFETY_GATE = BLOCKED` everywhere; no actuator/motor/steering design or executable
  control; `AIS_TRANSMISSION_OFFERED = false`.
- **Security:** D27 threat model + candidate mechanisms; D28 firmware IP/supply chain;
  `SOURCE_IP_CLEARANCE = NOT_CLEARED`; CRA mapped as conformity input only, `CRA_COMPLIANCE =
  NOT_ESTABLISHED`.
- **Governance:** trademark `NOT_GRANTED`; `PRICE_APPROVED = NONE`; `NOT_FOR_SALE`;
  `PUBLICATION_CHANGE = NOT_AUTHORIZED`; `CE_MARKING_CLAIM = PROHIBITED`; no guaranteed alert delivery;
  no IP/EMC/temperature rating; no sale/order path. D36/D37/D-048 are consistent with `PARTIAL` +
  `BLOCKED_OR_NOT_OBTAINED` and introduce no full-PASS, certification, supplier or customer claim.

## 8. Independent source verification (dimension D)

External sources were fetched in round 1 (2026-11-02) and were not re-fetched in rounds 2–3 (unchanged
external facts); round-1 results stand: **11 of 13 URLs verified**, **2 inaccessible** recorded as such
(not proof of falsity).

| URL (class) | Verified | Key assertion confirmed |
|---|---|---|
| `digital-strategy.ec.europa.eu/.../cyber-resilience-act` | **YES** | CRA in force 10 Dec 2024; main 11 Dec 2027; reporting 11 Sep 2026 (EVD-301/417) |
| `digital-strategy.ec.europa.eu/.../cra-reporting` | **YES** | reporting from 11 Sep 2026; 24 h/72 h/14-day/one-month (EVD-303) |
| `www.nmea.org/nmea-2000.html` | **YES** | certification requirement, licence model, manufacturer code ≤60 days, product codes, logo rule (EVD-001/002/319) |
| `www.nmea.org/nmea-0183.html` | **YES** | USD 1,150/7,500/10,000, USD 200 mnemonic, 4800 baud, v4.30 (EVD-003/004/320) |
| `www.ti.com/product/TCAN1042HGV/part-details/TCAN1042HGVDR` | **YES** | USD 2.196/1.689/1.244/0.889, −55…125 °C, Automotive, SOIC-8 (EVD-102) |
| `www.ti.com/lit/ds/symlink/tcan1042.pdf` | **NO** | HTTP 404 at fetch endpoint (reproduces EVD-131); 0/41 datasheets retrieved |
| `www.raspberrypi.com/news/introducing-raspberry-pi-5/` | **YES** | USD 60/80, A76 2.4 GHz, 802.11ac, BT 5.0/BLE, GbE, PCIe 2.0 ×1, 5 V/5 A, ~12 W peak (EVD-005/006/018) |
| `www.st.com/.../stm32h743zi.html` | **YES** | active/volume, M7 480 MHz, 2 MB/1 MB, 1.62–3.6 V, 2× CAN FD, 2.95 µA standby (EVD-012) |
| `www.u-blox.com/en/product/max-m10-series` | **YES** | all variants "This product is not longer available" (EVD-116) |
| `www.microchip.com/en-us/product/ATECC608B` | **YES** | "Not Recommended for new designs"; ECC-P256/SHA-256/AES-128-GCM; <150 nA (EVD-014/112/508) |
| `jlcpcb.com` | **YES** | $2/5 pcs, 24 h, $8 PCBA, $3 stencil, ISO 27001/27701, PCI DSS (EVD-124/204) |
| `aisler.net` | **YES** | Europe, "€14.20" starting, one business day (EVD-126) |
| `es.rs-online.com/web/p/can-interface-ics/2528889` | **NO** | HTTP 404 twice; sole EUR distributor price series not independently reproducible (EVD-109) |

## 9. Automated validation (dimension L)

| Gate | Result |
|---|---|
| **`npm run test:hardware` at `a912c4d`** | **exit 0 — 54/54 checks passed** (V01–V50 + S01–S04; includes manifest record-count check) |
| **`npm run test:hardware:unit` at `a912c4d`** | **exit 0 — 59 tests, 59 pass, 0 fail** |
| **`npm run format:check` at `a912c4d`** | **exit 0 — All matched files use Prettier code style** |
| **`git diff --check` (working tree and `6713178..a912c4d`)** | **exit 0 — clean** |
| Round-2 gates at `0eceb86` | `test:bundles` 35/35 PASS (updated DECISION-LOG scanned), `test:products` 52/52 PASS, plus the round-1 full set (products:unit 106/106, bundles:unit 60/60, brand 21/21 + 13/13, market 40/40 + 43/43, customer-research 62/62 + 111/111, customer-recovery 32/32 + 82/82, i18n/commerce/SEO/backup PASS, `npm audit` 0 vulnerabilities) — all exit 0. Unaffected by the record-refresh commit. |
| Lead-run, not auditor-run | `npm run build` (exit 0) and `npm run test:e2e` (Playwright 15/15) — **Lead-reported only** in D37/D36, not auditor-verified. |

## 10. Acceptance list §10 — final status

| Items | Status |
|---|---|
| 1 baseline/discrepancies; 2–9 families, bundles, architectures, dependencies, sourcing, BOMs, price classes, unknowns | **EVIDENCED** |
| 10–11 manufacturing routes, DFM/DFT/quality, qualification (45 tests `NOT_EXECUTED`) | **EVIDENCED** |
| 12–13 EU applicability per configuration incl. exclusions; CRA/NMEA/MED evidence-linked | **EVIDENCED** |
| 14–16 PILOT gate/no actuator; security/IP; no unsupported claims | **EVIDENCED** |
| 17–18 no invented customer validation; no supplier contact/RFQ/purchase | **EVIDENCED** |
| 19–20 validator 54/54 + 59 adversarial; regression gates pass | **EVIDENCED** |
| **21 auditor closes all BLOCKING/MAJOR findings** | **EVIDENCED** — 0 open BLOCKING/MAJOR |
| **22 PR verified draft, stacked, unmerged** | **EVIDENCED** — PR #18 at `a912c4d` |

## 11. Findings summary (final)

| ID | Severity | Status | Verification |
|---|---|---|---|
| MC11-F01 | MAJOR | **CLOSED_VERIFIED** | branch on origin (`a912c4d`); draft PR #18 stacked on `6713178`, unmerged |
| MC11-F02 | MINOR | **CLOSED_VERIFIED** | D31 currency/VAT composition matches `price-observations.json` exactly |
| MC11-F03 | MINOR | **CLOSED_VERIFIED** (withdrawn; clarification verified) | COST-16 = 120 inside 437.13; `toolingAmortizationEur` duplicates it; original values correct |
| MC11-F04 | MINOR | **CLOSED_VERIFIED** | AIS-E / DISPLAY-D consistent across data, D3, D4, D9, D29, recommendations |
| MC11-F05 | MINOR | **CLOSED_VERIFIED** | "MCU-11" removed from both HUB-PRO BOMs |
| MC11-F06 | INFORMATIONAL | **CLOSED_VERIFIED** | 27.5% consistent; 120.00/437.13 = 27.45% |
| MC11-F07 | INFORMATIONAL | **CLOSED_VERIFIED** | D36/D37 exist; manifest D35–D37 COMPLETE; content honest |
| MC11-F08 | INFORMATIONAL | **CLOSED_VERIFIED** | no evidence/parameter upgrade; disclosure explicit; limitation stands |
| MC11-F09 | INFORMATIONAL | **CLOSED_VERIFIED** | 22 audit-verified records map exactly to fetched URLs; none inaccessible marked; recordCount 9; D-048 added |

## 12. Final confirmation pass — `PA-01…PA-05` at `a912c4d` — all `CLOSED_VERIFIED`

**Scope proof: the final head is record-only.** `git diff --stat 0eceb86..a912c4d` = **8 files**, all
records: `MASTER-PROMPT-REGISTRY.md`, `MC-11-DELIVERY.md`, `MC11-BASELINE-AND-GOVERNANCE.md`,
`MC11-EXECUTIVE-REPORT.md`, `data/governance-status.json`, `data/manifest.json`,
`data/review-findings.json`, `review/MC-11-REVIEW.md`. **No technical data file changed**:
`hardware-families`, `architecture-options`, `component-register`, `price-observations`, both BOMs,
`cost-scenarios`, `conformity-applicability`, `qualification-plan`, `compatibility-requirements`,
`nmea-status`, `risks`, `decisions` and `evidence-index` are identical to the re-verified `0eceb86`.

| PA | File | Verified at `a912c4d` |
|---|---|---|
| **PA-01** | `MC11-BASELINE-AND-GOVERNANCE.md` §1 row 30 | Records both SHAs: audit-correction `73ab0ac`, delivery/re-verified `0eceb86`; row 31 keeps PR #18 `OPEN`/draft/`MERGEABLE`/unmerged facts; base `6713178` unchanged. |
| **PA-02** | `data/governance-status.json` | `milestoneState` = `mc11Verdict PARTIAL`, `internalFeasibilityScope PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`, `formalProcurementEvidence BLOCKED_OR_NOT_OBTAINED`, `independentReview PARTIAL`, `reverifiedCommit 0eceb86`, `reverifiedOn 2026-11-02`, `openBlockingFindings/openMajorFindings/openMinorFindings 0/0/0`. Diff changes only those fields; all 28 invariants and every numeric zero unchanged. |
| **PA-03** | `data/manifest.json` | `reviewSummary` = `reviewedCommit 0eceb86`, verdict `PARTIAL`, `internalFeasibilityScope PASS…`, findings 9, blocking 0, major 1 (historical total), minor 4, informational 4, `closedVerified 9`, `open 0`; top-level `milestoneVerdict`/`internalFeasibilityScope`/`formalProcurementEvidence` present; review-findings `recordCount` still **9 = actual findings**. |
| **PA-04** | `execution/MASTER-PROMPT-REGISTRY.md` row 11 | Records the re-verification at `0eceb86`: internal scope `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`, **9/9 findings `CLOSED_VERIFIED`** (0 open), full milestone `PARTIAL`, formal quotations `BLOCKED_OR_NOT_OBTAINED`; "real quotes only" requirement unchanged. |
| **PA-05** | `MC-11-DELIVERY.md`, `MC11-EXECUTIVE-REPORT.md` | D37 §1 re-verified verdict block (PARTIAL + internal PASS + 9/9 closed); §4 e2e 15/15 recorded as **Lead-run only**; §5 records the re-verification at `0eceb86`, the withdrawn F03 (COST-16 inside 437.13) and the auditor's re-run gates; §9 updated. D36 §1/§10 record the re-issued verdict, withdrawn F03 and PA refreshes. |

**One non-blocking wording note (no action required for the verdict).** D2 line 30 and registry row 11
phrase `0eceb86` as "current head"/"branch head"; at the final head `a912c4d` the accurate statement is
that `0eceb86` is the **re-verified delivery head** and `a912c4d` is the **record-refresh-only commit**.
This is record wording, not evidence; a future docs touch may phrase the head dynamically as "current
head tracked by PR #18". It does not alter the verdict or any acceptance item.

## 13. What any further re-verification must check

1. Any new commit after `a912c4d`: inspect `git diff a912c4d..<new head>`; accept only record/typo
   changes unless a new technical change is explicitly re-audited.
2. `npm run test:hardware` still 54/54; `test:hardware:unit` still 59/59; `format:check` and
   `git diff --check` clean; manifest record counts still match (S03).
3. `review-findings.json` findings count equals `manifest.files[review-findings.json].recordCount`
   (currently **9**); no finding/PA status regressed.
4. No evidence upgrade: no `FORMAL_SUPPLIER_QUOTATION`/`SUPPLIER_QUOTED` or `TESTED`/`SUPPORTED` value,
   no datasheet status upgrade, `independentVerification` changed only where a real fetch occurred.
5. Prohibitions unchanged: CE/NMEA/certification, price approval, availability, IP/EMC/temperature
   rating, guaranteed alert delivery, AIS transmit, `PILOT_SAFETY_GATE = BLOCKED`,
   `SOURCE_IP_CLEARANCE = NOT_CLEARED`, `NOT_FOR_SALE`, `NOT_CONTACTED`.
6. **Full MC-11 remains `PARTIAL` until genuine supplier quotations exist** — an external,
   authorisation-gated `BLOCKED_OR_NOT_OBTAINED` gap that no internal document can close.

**Closing rule.** The internal hardware feasibility scope is `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`
(re-verified at `0eceb86`, records confirmed at `a912c4d`); all 9 findings and all 5 post-audit actions
are `CLOSED_VERIFIED`; the full milestone is `PARTIAL` because the real supplier quotation evidence
required by the registry does not exist.
