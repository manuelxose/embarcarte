# MC-11 — Independent technical and evidence audit (D35)

| Field | Value |
|---|---|
| Reviewer | `qa-reviewer` (Agent G) — independent auditor; authored none of the audited material |
| Re-verified commit | `0eceb8663204e6b5d82a137bb0cb50b742e667dc` (branch head; delivery commit) |
| Original audited commit | `bef2f4b25e06205697bee4de9da908741c726621` |
| Correction commits | `73ab0ac` (audit corrections), `0eceb86` (delivery: D36, D37, registry, D-048, manifest) |
| Branch / PR | `feature/marea-mc11-hardware-sourcing-conformity`; draft PR [#18](https://github.com/manuelxose/embarcarte/pull/18) |
| Verified base | MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (local = `origin/feature/marea-mc10r-fieldwork-recovery`) |
| Date | 2026-11-02 (Europe/Madrid) |
| Audit scope | Actual committed tree at `0eceb86` (not the summary): D1–D37, all 18 JSON files, evidence shards, validator, corrections F01–F09 |
| Write scope of this audit | `docs/marea/hardware/review/` and `docs/marea/hardware/data/review-findings.json` only |

## 1. Verdict (re-issued after re-verification)

**`PARTIAL` — full MC-11. Internal feasibility scope: `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`.**

- **Internal hardware feasibility scope = `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`.** All 22 items of
  `MC11-BASELINE-AND-GOVERNANCE.md` §10 are now evidenced at `0eceb86`, including the two items open
  at the original audit:
  - **Item 21** — the auditor closes all `BLOCKING`/`MAJOR` findings: the single `MAJOR` finding
    (`MC11-F01`) is `CLOSED_VERIFIED`; there are **no** open `BLOCKING` or `MAJOR` findings.
  - **Item 22** — PR verified draft, stacked on the verified base, unmerged: independently confirmed
    (see §3).
- **Full MC-11 = `PARTIAL` and can never be `PASS`**: the authoritative registry requires *real
  supplier quotes*; no supplier was contacted and no quotation exists
  (`MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`; 0 suppliers contacted, 0 RFQs sent,
  0 quotations). This is an external evidence gap, **not a finding against the authors**, and the
  registry requirement is not rewritten or relaxed.
- **No `FAIL` condition.** No required gate is violated; every re-run gate passes. No fabrication was
  found: `FORMAL_SUPPLIER_QUOTATION` / `SUPPLIER_QUOTED` still occur only in prohibition text, no
  `TESTED`/`SUPPORTED` compatibility value exists, and no measured performance, power, thermal, EMC,
  ingress, certification, availability or price claim was introduced by the corrections.
- **All nine findings `MC11-F01…F09` are `CLOSED_VERIFIED`** (0 open `BLOCKING`/`MAJOR`/`MINOR`;
  `F03` closed after the audit's own arithmetic premise was corrected — see §7 and §12).
- **Lead-owned metadata refresh (PA-01…PA-05, §13)** is required after this re-verification so that
  D2/registry/governance/manifest/D36/D37 record the re-verified verdict and commit. These are
  record-keeping updates outside the auditor write scope; they do not change the technical evidence
  or the verdict.

**Recommended milestone statement:**
`PARTIAL — INTERNAL HARDWARE FEASIBILITY SCOPE PASS (re-verified at 0eceb86); FORMAL SUPPLIER`
`QUOTATIONS NOT OBTAINED (BLOCKED_OR_NOT_OBTAINED).`

## 2. Method and independence (round 2)

1. Re-verified **only the corrections** requested by the Lead, plus the integrity of the correction
   commits, against the current tree at `0eceb86` (working tree clean before this audit's edits).
2. Re-checked each claimed correction against the raw data/documents rather than the Lead's summary;
   re-ran the arithmetic that the corrections touched (including a full re-inspection of the cost
   model after the Lead's F03 disagreement — see §7).
3. Re-ran the mandated gates (`test:hardware`, `test:hardware:unit`, `test:bundles`,
   `test:products`, `format:check`, `git diff --check` on the working tree and the commit range).
4. Redisclosed external sources were **not** re-fetched in round 2 (they are unchanged external
   facts); the round-1 results stand and are restated in §10. Build and Playwright e2e remain
   Lead-owned and were not run by the auditor.
5. Read the new delivery artefacts (D36 Spanish executive report, D37 delivery record, registry
   row 11, D-048 in `DECISION-LOG.md` and `decisions.json`, manifest update) for honesty and
   overclaim.

**Independence statement.** The reviewer authored no audited file. The only files written by this
audit are this report and `data/review-findings.json`.

**Audit integrity note.** The round-1 `MC11-F03` finding was based on an additive assumption that
double-counted the tooling line (see §7). That finding is withdrawn and closed after re-inspection.
The error is recorded here rather than silently deleted.

## 3. Correction verification — F01 (MAJOR) — `CLOSED_VERIFIED`

| Check | Result |
|---|---|
| Branch on origin | `git ls-remote origin refs/heads/feature/marea-mc11-hardware-sourcing-conformity` → `0eceb8663204e6b5d82a137bb0cb50b742e667dc` |
| PR exists and is a draft | PR **#18**: `state: OPEN`, `isDraft: true`, `mergeable: MERGEABLE` |
| Stacked on verified base | `baseRefName: feature/marea-mc10r-fieldwork-recovery`; base remote head `6713178` (verified) |
| Head matches current tree | `headRefName` = MC-11 branch; `headRefOid` = `0eceb86` = local `HEAD` |
| Not merged / no deploy | PR state `OPEN`; no merge commits and no tags in `6713178..0eceb86`; no publication/merge/tag/deploy performed |
| D2 record | D2 §1 rows 16–17 record the remote ref and draft PR, and D2 states F01 explicitly (rows 16–17 are accurate except the stale SHA note in PA-01) |

Acceptance item 22 is therefore **evidenced**. No further correction required for F01.

## 4. Correction verification — F02, F04, F05, F06, F07, F08, F09

| Finding | Correction verified at `0eceb86` | Status |
|---|---|---|
| **F02** (MINOR) — D31 currency composition | D31:17 now: "42 observations: 37 manufacturer list prices (36 USD + 1 EUR) and 5 authorised-distributor retail prices (EUR); VAT basis 37 `VAT_UNKNOWN` + 5 `VAT_EXCLUDED`". D31:70 now: "37 of 42 … manufacturer list prices - 36 USD and 1 EUR - … the other 5 are EUR retail distributor listings". Recomputed from `price-observations.json`: 37 manufacturer (36 USD + 1 EUR) + 5 distributor EUR; 37 `VAT_UNKNOWN` + 5 `VAT_EXCLUDED` — **exact match**. | `CLOSED_VERIFIED` |
| **F04** (MINOR) — AIS/DISPLAY provisional architectures | `hardware-families.json`: AIS `provisionalArchitectureId = ARCH-AIS-E`, alternatives `A,B,C,D`; DISPLAY `provisionalArchitectureId = ARCH-DISPLAY-D`, alternatives `A,B,C,E`. D3:160 and D3:302 label them "near-term recommendation" (4.86 and 3.69). Consistent with D4 §3.3, D9 §1.7/§2.5, `architecture-options.json recommendations[]` and D29 §4. **0 contradictions.** | `CLOSED_VERIFIED` |
| **F05** (MINOR) — "MCU-11" typo | `git diff bef2f4b..0eceb86` shows both HUB-PRO BOM `architectureVersion` fields now read "MC-11 engineering preference"; no `MCU-11` token remains in any hardware data JSON (only the historical finding description in `review-findings.json`). | `CLOSED_VERIFIED` |
| **F06** (INFORMATIONAL) — 27.4% vs 27.5% | D22:215 now "120.00 (27.5%)", matching D22:100, D22:228 and D31:59. Recompute: 120.00/437.13 = 27.4517% → 27.5%. | `CLOSED_VERIFIED` |
| **F07** (INFORMATIONAL) — D36/D37 absent | D36 `MC11-EXECUTIVE-REPORT.md` (19 543 bytes) and D37 `MC-11-DELIVERY.md` (9 083 bytes) exist; `manifest.deliverables` D35/D36/D37 = `COMPLETE`. D36 states the milestone verdict `PARTIAL` and formal-procurement evidence `NOT_OBTAINED` with no certification/supplier/customer claim; D37 records the same external gaps. | `CLOSED_VERIFIED` |
| **F08** (INFORMATIONAL) — evidence strength | No evidence upgrade attempted: the `evidence-index.json` diff between `bef2f4b` and `0eceb86` adds only `independentVerification` + `auditNote` fields — no URL, `supportedAssertion`, `evidenceClass`, parameter or `datasheetStatus` changed; `component-register.json` unchanged. Disclosure remains explicit in D11 §0.2–0.3, D23 §10 and D37. **0/41 datasheets retrieved and 21/127 inaccessible/partial remains true.** | `CLOSED_VERIFIED` (limitation stands) |
| **F09** (INFORMATIONAL) — verification flags / manifest | 22 evidence records now carry `independentVerification = "VERIFIED_BY_AUDITOR"` with an `auditNote`. All 22 map to the 11 URLs the auditor actually fetched (NMEA 2000 ×3, NMEA 0183 ×3, Raspberry Pi 5 ×3, ST ×1, u-blox MAX-M10 ×2, Microchip ATECC608B ×3, TI TCAN1042 ×1, JLCPCB ×2, AISLER ×1, EC CRA policy ×2, EC CRA reporting ×1). **None** of the two inaccessible URLs (TI datasheet PDF, RS Components) and no disclosed-inaccessible record is marked verified. `manifest.files[review-findings.json].recordCount = 9`; `decisions.json` D-041…**D-048** (8 decisions). | `CLOSED_VERIFIED` (index/count part) |

## 5. Product and bundle coverage (dimension B) — `VERIFIED` (unchanged)

Nine canonical families, canonical editions (0 invalid), six bundles whose component lines match
`bundle-definitions.json` (0 mismatches), `FLEET hardwareIncludedByDefault = false`, kits expand only
to existing module editions, `PROTECT` counts each sensor once, `fixedTurnkeyPrice = false` for all
six bundles. Re-checked at `0eceb86`; the corrections touched none of these records except the F04
architecture ids.

## 6. Architecture (dimension C) — `VERIFIED` (F04 closed)

Frozen 11 weights sum 100; all 33 weighted scores re-derived (0 mismatch); `summaryTable` 0 drift;
D29 portfolio scores 9/9 correct; every power/thermal/EMC/ingress figure remains `UNKNOWN`,
`NOT_MEASURED` or candidate — no measured claim. F04 (AIS/DISPLAY provisional ids) is now aligned
across D3, `hardware-families.json`, D4, D9, D29 and `recommendations[]`.

## 7. BOM and cost arithmetic (dimension E) — `VERIFIED`, with a corrected audit understanding

Independently recomputed from raw JSON at `0eceb86`:

| Check | Scope | Result |
|---|---|---|
| Engineering BOMs | 11 BOMs, 155 lines | totals/unknown counts/status — **0 mismatches**; all `INCOMPLETE`, `totalEur = null` |
| Manufacturing BOMs | 11 BOMs, 171 lines | **0 mismatches**; all `INCOMPLETE`, `totalEur = null` |
| EUR conversion | 34 USD lines | `unitPriceEur = observed × 0.925925926` — **0 mismatches**; rate is the labelled `ENGINEERING_ASSUMPTION` ASM-001 |
| Tier integrity | all observation-linked lines | **0 mismatches** |
| Cost scenarios | all 90 | known-line sum / `missingCategories` / `totalStatus` — **0 mismatches** |
| D31 BASE table | 6 families × 5 volumes | **0 mismatches** against `cost-scenarios.json` |

**Corrected tooling understanding (MC11-F03).** The Lead disagreed with the round-1 finding and was
right. Re-inspection of `SCN-HUB-100-BASE` shows a KNOWN `COST-16` tooling/NRE line **inside** the
category sum:

- HUB volume 100: KNOWN category lines sum to **437.13**, and this **includes** `COST-16 = 120.00`.
- The standalone `toolingAmortizationEur` field is **120.00** — the same amount as the `COST-16` line.
  Adding it again (437.13 + 120 = 557.13; 12,351.22 + 12,000 = 24,351.22) would **double count**.
- Verified across all 90 scenarios: `toolingAmortizationEur` equals the `COST-16` line amount (or 0)
  in **90/90**, and equals the ASM-008 envelope × case multiplier ÷ volume; the D31 BASE table equals
  the sum of KNOWN lines for **30/30** family/volume rows.
- Therefore the **original D31 values were correct**; the round-1 statement that the figures excluded
  tooling was the auditor's error. The Lead's clarified heading (COST-16 included,
  `toolingAmortizationEur` not added again, with the 12 000/1 200/120/24/12 EUR HUB amounts) is
  accurate and is verified here. F03 is `CLOSED_VERIFIED` by clarification; no data change was needed.

## 8. Evidence integrity, regulations, NMEA, safety, security, governance — `VERIFIED`

- **Evidence integrity (F):** no `FORMAL_SUPPLIER_QUOTATION`/`SUPPLIER_QUOTED` data value, no
  `TESTED`/`SUPPORTED` compatibility value (29 rows: 9 `TEST_REQUIRED`, 9 `PROPOSED`, 11 `BLOCKED`;
  `deviceTestRecorded = false` everywhere), unknown ≠ 0, no invented MOQ/lead time/stock/warranty, no
  customer demand (MC-10: 0 interviews, 0 price responses), no validated WTP.
- **EU regulatory (G):** 11 acts, 22 configurations; every `applicable`/`notApplicable` row has a
  written rationale; all rows `APPLICABILITY_ASSESSED_NOT_CERTIFIED`; recomputed applicability counts
  match D23 exactly (RED 13/9, EMC 6, LVD 0, RoHS/WEEE/GPSR/PPWR 19, CRA 20, BAT 12, MED/RCD 0).
  CRA dates independently confirmed against official Commission pages in round 1: in force 10 Dec
  2024, **reporting from 11 Sep 2026**, **main obligations 11 Dec 2027**. All **18 conformity
  blockers remain open** (8 CRITICAL, 8 HIGH, 2 MEDIUM); none is presented as closed.
- **NMEA (H):** implementation, membership/licence, manufacturer code, product certification,
  terminology and logo use separated; `nmea2000Certified = false`, `testedCompatibilityRows = 0`; no
  certification/logo claim; NMEA 2000 fees and timetable remain `UNKNOWN` where the page did not
  render.
- **Safety (I):** `PILOT_SAFETY_GATE = BLOCKED` in governance, D2/D29/D30, bundles and machine data;
  no actuator/motor/steering design or executable control; `AIS_TRANSMISSION_OFFERED = false`;
  validator V37/V38 enforce both.
- **Security (J):** D27 threat model + candidate mechanisms; D28 firmware IP/supply chain;
  `SOURCE_IP_CLEARANCE = NOT_CLEARED`, no OPEN-MARINE code copied or declared reusable; CRA mapped as
  conformity input only, `CRA_COMPLIANCE = NOT_ESTABLISHED`.
- **Governance (K):** trademark `NOT_GRANTED`, `PRICE_APPROVED = NONE`, `NOT_FOR_SALE`,
  `PUBLICATION_CHANGE = NOT_AUTHORIZED`, `CE_MARKING_CLAIM = PROHIBITED`, no guaranteed alert
  delivery, no IP/EMC/temperature rating, no sale/order path. New delivery docs reviewed: D36/D37/
  D-048 are consistent with `PARTIAL` + `BLOCKED_OR_NOT_OBTAINED`, contain no full-PASS or
  certification/supplier/customer claim, and keep the real-quotes requirement unchanged.

## 9. Source verification (dimension D)

External sources were fetched in the first audit pass (2026-11-02) and were not re-fetched in this
correction round; the recorded results stand:

| # | URL (class) | Verified | Note |
|---|---|---|---|
| 1 | `digital-strategy.ec.europa.eu/.../cyber-resilience-act` (government) | **YES** | CRA dates: in force 10 Dec 2024, main 11 Dec 2027, reporting 11 Sep 2026 (EVD-301/417) |
| 2 | `digital-strategy.ec.europa.eu/.../cra-reporting` (government) | **YES** | reporting from 11 Sep 2026; 24 h / 72 h / 14-day / one-month (EVD-303) |
| 3 | `www.nmea.org/nmea-2000.html` (standards body) | **YES** | certification requirement, licence model, manufacturer code up to 60 days, product codes, logo rule (EVD-001/002/319) |
| 4 | `www.nmea.org/nmea-0183.html` (standards body) | **YES** | USD 1,150 / 7,500 / 10,000, USD 200 mnemonic, 4800 baud, v4.30 (EVD-003/004/320) |
| 5 | `www.ti.com/product/TCAN1042HGV/part-details/TCAN1042HGVDR` | **YES** | USD 2.196/1.689/1.244/0.889, −55…125 °C, Automotive, SOIC-8 (EVD-102) |
| 6 | `www.ti.com/lit/ds/symlink/tcan1042.pdf` (datasheet) | **NO** | fetch endpoint HTTP 404; reproduces EVD-131; **0/41 datasheets retrieved** |
| 7 | `www.raspberrypi.com/news/introducing-raspberry-pi-5/` | **YES** | USD 60/80, A76 2.4 GHz, 802.11ac, BT 5.0/BLE, GbE, PCIe 2.0 ×1, 5 V/5 A, ~12 W peak, sole first-party OS (EVD-005/006/018) |
| 8 | `www.st.com/.../stm32h743zi.html` | **YES** | active/volume, M7 480 MHz, 2 MB/1 MB, 1.62–3.6 V, 2× CAN FD, 2.95 µA standby (EVD-012) |
| 9 | `www.u-blox.com/en/product/max-m10-series` | **YES** | all variants "This product is not longer available" (EVD-116) |
| 10 | `www.microchip.com/en-us/product/ATECC608B` | **YES** | "Not Recommended for new designs", ECC-P256/SHA-256/AES-128-GCM, <150 nA (EVD-014/112/508) |
| 11 | `jlcpcb.com` | **YES** | $2/5 pcs, 24 h, $8 PCBA, $3 stencil, ISO 27001/27701, PCI DSS (EVD-124/204) |
| 12 | `aisler.net` | **YES** | Europe, "€14.20" starting, one business day (EVD-126) |
| 13 | `es.rs-online.com/web/p/can-interface-ics/2528889` | **NO** | fetch endpoint HTTP 404 twice; the sole EUR distributor price series could not be independently reproduced (EVD-109); recorded as inaccessible, not false |

## 10. Automated validation (dimension L) — re-run by the auditor at `0eceb86`

| Gate | Result |
|---|---|
| `npm run test:hardware` | **exit 0** — `MC-11 hardware evidence: 54/54 checks passed` (V01–V50 + S01–S04, incl. S03 manifest record counts) |
| `npm run test:hardware:unit` | **exit 0** — 59 tests, 59 pass, 0 fail |
| `npm run test:bundles` | **exit 0** — 35 checks, 35 passed; 43/43 files (incl. the updated `DECISION-LOG.md`); `RESULT: PASS` |
| `npm run test:products` | **exit 0** — 52 checks, 52 passed; 51/51 files; `RESULT: PASS` |
| `npm run format:check` | **exit 0** — All matched files use Prettier code style |
| `git diff --check` (working tree) | **exit 0** |
| `git diff --check 6713178 0eceb86` | **exit 0** |
| Round-1 full set | `test:products:unit` 106/106, `test:bundles:unit` 60/60, `test:brand` 21/21, `test:brand:unit` 13/13, `test:market` 40/40, `test:market:unit` 43/43, `test:customer-research` 62/62, `test:customer-research:unit` 111/111, `test:customer-recovery` 32/32, `test:customer-recovery:unit` 82/82, `test:i18n` PASS, `test:commerce` PASS, `test:seo` PASS, `test:backup` PASS, `npm audit --omit=dev --audit-level=high` 0 vulnerabilities — all exit 0. These gates are unaffected by the correction commits (only hardware/execution/review files changed) and were not re-run in round 2. |

**Not run by the auditor (Lead-owned):** `npm run build` (Angular SSR/prerender) and
`npm run test:e2e` (Playwright). D37 reports exit 0 for both; that is **Lead-reported**, not
auditor-verified, and is not claimed otherwise here.

## 11. Acceptance list §10 — status after re-verification

| Item | Status |
|---|---|
| 1 Baseline verified, discrepancies recorded | **EVIDENCED** (D2 §1; post-audit rows 16–17 — refresh SHA per PA-01) |
| 2–9 families, bundles, architectures, dependencies, sourcing, BOMs, price classes, unknowns | **EVIDENCED** |
| 10–11 manufacturing routes, DFM/DFT/quality, qualification (45 tests `NOT_EXECUTED`) | **EVIDENCED** |
| 12–13 EU applicability per configuration incl. exclusions; CRA/NMEA/MED evidence-linked | **EVIDENCED** |
| 14–16 PILOT gate, no actuator path; security/IP; no unsupported claims | **EVIDENCED** |
| 17–18 no invented customer validation; no supplier contact/RFQ/purchase | **EVIDENCED** |
| 19–20 validator 54/54 + 59 adversarial; regression gates pass | **EVIDENCED** |
| **21 auditor closes all BLOCKING/MAJOR findings** | **EVIDENCED** — 0 BLOCKING, 0 MAJOR open; F01 `CLOSED_VERIFIED` |
| **22 PR verified draft, stacked, unmerged** | **EVIDENCED** — PR #18, base MC-10R, head `0eceb86`, draft, `MERGEABLE`, unmerged |

## 12. Findings summary

| ID | Severity | Status | Verification at `0eceb86` |
|---|---|---|---|
| MC11-F01 | MAJOR | **CLOSED_VERIFIED** | branch on origin (`0eceb86`); draft PR #18 stacked on `6713178`, unmerged |
| MC11-F02 | MINOR | **CLOSED_VERIFIED** | D31 currency/VAT composition matches `price-observations.json` exactly |
| MC11-F03 | MINOR | **CLOSED_VERIFIED** (finding withdrawn; clarification verified) | COST-16 = 120 is inside the 437.13 subtotal; `toolingAmortizationEur` repeats it and is not additive; original values correct |
| MC11-F04 | MINOR | **CLOSED_VERIFIED** | AIS-E / DISPLAY-D consistent across data, D3, D4, D9, D29, `recommendations[]` |
| MC11-F05 | MINOR | **CLOSED_VERIFIED** | "MCU-11" removed from both HUB-PRO BOMs |
| MC11-F06 | INFORMATIONAL | **CLOSED_VERIFIED** | 27.5% consistent; 120.00/437.13 = 27.45% |
| MC11-F07 | INFORMATIONAL | **CLOSED_VERIFIED** | D36/D37 exist; manifest D35–D37 COMPLETE; content honest |
| MC11-F08 | INFORMATIONAL | **CLOSED_VERIFIED** | no evidence/parameter upgrade; disclosure explicit; limitation stands |
| MC11-F09 | INFORMATIONAL | **CLOSED_VERIFIED** | 22 `VERIFIED_BY_AUDITOR` records map exactly to fetched URLs; none inaccessible marked; recordCount 9; D-048 added |

## 13. Post-re-verification record refresh (Lead-owned, required)

These are record-keeping updates needed so the delivery documents reflect the re-issued verdict. They
are outside the auditor write scope and do not change the technical evidence; full details are in
`review-findings.json` `postAuditActions[]`.

| ID | File | Required update |
|---|---|---|
| PA-01 | `MC11-BASELINE-AND-GOVERNANCE.md` §1 row 16 | Records remote ref at `73ab0ac`; current remote/PR head is **`0eceb86`** — update (or record both commits). |
| PA-02 | `data/governance-status.json` | `milestoneState.mc11Verdict`/`internalFeasibilityScope` are still `PENDING_INDEPENDENT_REVIEW`; set `PARTIAL` / `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE` (formal procurement stays `BLOCKED_OR_NOT_OBTAINED`; numeric invariants stay 0/false). |
| PA-03 | `data/manifest.json` | `reviewSummary.reviewedCommit` still `bef2f4b` with 1 MAJOR/4 MINOR; update to `0eceb86`, 9 findings, 9 `CLOSED_VERIFIED`, 0 open. |
| PA-04 | `execution/MASTER-PROMPT-REGISTRY.md` row 11 | Still says "corrected pending re-verification"; record the re-verified internal-scope PASS and all findings closed, keeping full milestone `PARTIAL`. |
| PA-05 | `MC-11-DELIVERY.md` §1/§5/§9 and D36 references | Still say "re-verification pending"/"1 MAJOR, 4 MINOR"; refresh to record the re-verification at `0eceb86` and the closed findings. D37 §1's internal-scope PASS claim is now substantiated by this audit but the wording is stale. |

Until PA-01…PA-05 are applied, the delivery records are internally inconsistent about the re-verified
verdict. This does **not** invalidate the technical evidence or the internal-scope PASS, but it must
be closed before the milestone is declared complete.

## 14. What any further re-verification must check

1. PA-01…PA-05 applied; no new data/document change other than those refreshes.
2. `npm run test:hardware` still 54/54 and `test:hardware:unit` still 59/59; `format:check` and
   `git diff --check` clean; manifest record counts still match (S03).
3. `review-findings.json` findings count still equals `manifest.files[review-findings.json].recordCount`
   (currently 9) and no finding status regressed.
4. No evidence upgrade: no `FORMAL_SUPPLIER_QUOTATION`/`SUPPLIER_QUOTED` or `TESTED`/`SUPPORTED` value
   introduced; `datasheetStatus` still honest; `independentVerification` changed only where a real
   fetch was performed.
5. The prohibitions unchanged: CE/NMEA/certification, price approval, availability, IP/EMC/temperature
   rating, guaranteed alert delivery, AIS transmit, `PILOT_SAFETY_GATE = BLOCKED`,
   `SOURCE_IP_CLEARANCE = NOT_CLEARED`.
6. **Full MC-11 remains `PARTIAL` until genuine supplier quotations exist** (external,
   authorisation-gated, `BLOCKED_OR_NOT_OBTAINED`). No re-verification of internal documents can ever
   convert the full milestone to `PASS`.

**Closing rule.** The `MAJOR` and all `MINOR` findings are closed by verified correction. The internal
hardware feasibility scope is re-issued as `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`; the full
milestone is `PARTIAL` because the real supplier quotation evidence required by the registry does not
exist.
