# MC-12 — Independent audit and review (D17)

| Field | Value |
|---|---|
| Milestone | MC-12/36 — recurring/data licensing and per-SKU contribution economics (ex-VAT) |
| Reviewer | Agent H (independent auditor; did not author the implementation) |
| Review date | 2026-11-02 |
| Reviewed commit (frozen) | `fe970624bc7c41ae5ffe0fb578c194fcb6a795f1` (`fe97062`, branch head) |
| Base / predecessor | `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` (MC-11) |
| Branch | `feature/marea-mc12-recurring-data-unit-economics` |
| Machine companion | [review-findings.json](../data/review-findings.json) |
| Verdict | **PARTIAL** — internal arithmetic verified; internal-scope sign-off withheld on 2 OPEN MAJOR findings |

## 1. Method

1. Verified the frozen state: `git rev-parse HEAD` == prompt SHA; tracked worktree clean; PR #18/#19 state via `gh`.
2. Inspected the **actual** diff `git diff 5b47a3d..HEAD` (40 files, +24,253/−5) and the data contract,
   validator and adversarial tests — never the delivery summary.
3. Wrote a **separate** dependency-free Node recomputation (`.recon/audit/recompute.mjs`, deleted after
   use) that loads `docs/marea/economics/data/*.json`, `docs/marea/hardware/data/cost-scenarios.json` and
   `docs/marea/bundles/bundle-definitions.json` and recomputes totals from source records. It does **not**
   import or reuse the validator, so a shared formula error could not pass unnoticed.
4. Re-executed the required gates and recorded exact commands/exit codes (§3).
5. Classified every dimension A–L as VERIFIED / PARTIAL / NOT VERIFIED with file evidence.
6. Findings use stable ids F01…, are OPEN and cannot be closed by the auditor (re-verification is the Lead's).

## 2. Frozen-state and ancestry verification

| Check | Result | Evidence |
|---|---|---|
| HEAD equals frozen SHA | VERIFIED | `git rev-parse HEAD` → `fe970624bc7c41ae5ffe0fb578c194fcb6a795f1`, exit 0 |
| Tracked worktree clean | VERIFIED | `git status --porcelain` → only `?? .recon/` (pre-existing untracked author scratch, not committed; not part of the reviewed tree) |
| Diff scope | VERIFIED | 40 files: `docs/marea/economics/**` (36), `docs/marea/execution/{DECISION-LOG,MASTER-PROMPT-REGISTRY}.md`, `package.json`, two new scripts. No `docs/marea/hardware/`, `bundles/`, `products/` or app file changed |
| No MC-11 data regression | VERIFIED | `git diff --name-only` contains no hardware file; D-04 recomputed SHA-256 baseline PASS (19/19 files, `bc2ae45…`) |
| Historical registry rows 1–11 unchanged | VERIFIED | Registry diff has exactly two removed lines: the header date and row 12; rows 01–11 byte-identical |
| Decisions D-001…D-048 unchanged | VERIFIED | Decision-log diff is append-only (0 removed lines); D-049…D-052 added |
| package.json changes are scripts only | VERIFIED | Only `format`/`format:check` path lists plus `test:economics`, `test:economics:unit` |
| PR #18 still open/draft/unmerged | VERIFIED | `gh pr view 18` → `OPEN`, `isDraft:true`, `MERGEABLE`, `mergedAt:null` |
| PR #19 open/draft/stacked/unmerged | VERIFIED | `gh pr view 19` → `OPEN`, draft, `MERGEABLE`, base `feature/marea-mc11-hardware-sourcing-conformity`, `mergedAt:null` |

Expected governance edits outside `docs/marea/economics/` are limited to the registry row and decision-log
append required by [AGENT-OPERATING-MODEL.md](../../execution/AGENT-OPERATING-MODEL.md).

## 3. Re-execution results (exact commands)

| Command | Exit | Result |
|---|---|---|
| `node scripts/check-marea-unit-economics.mjs` | 0 | `49 checks — 49 PASS / 0 FAIL` |
| `node --test --test-isolation=none scripts/check-marea-unit-economics.test.mjs` | 0 | `tests 59 / pass 59 / fail 0` |
| `npm run test:economics` | 0 | 49/49 PASS |
| `npm run test:hardware` | 0 | `54/54 checks passed` |
| `node --test --test-isolation=none scripts/check-marea-hardware.test.mjs` | 0 | `tests 59 / pass 59 / fail 0` |

Plain `node --test` was not used because DSH sandbox child-process workers can hit `EPERM`; that is an
environment condition, not a defect. No build/e2e was re-run (no build-affecting path changed).

## 4. Independent recomputation (method and counts)

| Scope | Records | Result |
|---|---|---|
| Unit-economics records: net revenue (`gross/(1+VAT)` / VAT-excluded), known variable cost (Σ variable KNOWN lines), contribution, headroom, break-even gross price (`kvc×1.21`), contribution % | **50** (41 have a break-even price; 9 null by design) | **0 mismatches** |
| MC-11 hardware cross-check: per-category cost lines vs `cost-scenarios.json`, `Σ lines == knownSubtotalEur`, `toolingAmortizationEur == COST-16`, installation not double counted | **90 scenarios + 41 hardware UE records** | **0 mismatches** |
| Subscription annualisation: per-period × periods, net per period, annual net, recurring contribution | **7 subscriptions** | **0 mismatches** |
| Sensitivity scenarios recomputed from base record + declared operation/factor | **70** | **0 mismatches** |
| Stress cases recomputed from base record | **4** | **0 mismatches** |
| Bundle net revenue, component-cost sums, contribution, % suppression | **6** | **0 arithmetic mismatches** (2 composition mismatches → F08) |
| Decision-matrix weighted scores from registered weights | **9 families** (weights sum 100) | **0 mismatches** |
| Provider evidence records (sources, classes, nulls, rights) | **53** | 0 governance violations (1 accounting mismatch → F06) |
| Licensing rights, blockers, decisions, manifest | **11 rights, 23 blockers, 52 decisions** | 2 documentation mismatches → F04, F05 |

All percentages are suppressed where a material unknown variable cost exists (validator V-17 and independent
check); no VAT-inclusive figure is used as net revenue; every VAT rate is 21 %.

## 5. Dimension-by-dimension evidence

| Dim | Claim | Status | Evidence |
|---|---|---|---|
| A | Scope and predecessor ancestry | VERIFIED | §2 table; diff stat; append-only decision log; unchanged registry rows 1–11 |
| B | Product/bundle identity | PARTIAL | 9 families and 26 editions resolve in `product-definitions.batch-01..03.json`; 6 canonical bundles; FLEET hardware-free (`hardwareIncludedByDefault:false`, no component costs/COST- lines); PILOT is `QUOTATION_PACKAGE`/`NOT_ESTABLISHED`, PH-03/PH-05 never used as prices; AIS receive-only (`receiveOnly:true`, no transmit claim). Composition deviation → F08; synthetic SKU ids `SENSE-MODULE`/`WATCH-MONITORING` are economic constructs, not editions (acceptable, mapped to kit/entitlement) |
| C | Provider evidence | PARTIAL | 53 records; classes 21 tariff / 2 observation / 15 official / 9 inaccessible / 5 unknown / **1 engineering assumption**; 0 `FORMAL_PROVIDER_QUOTATION`, 0 `EXECUTED_CONTRACT`, RFQ `NOT_SENT`; all 53 carry `sourceUrl`+`retrievedOn`; every inaccessible/unknown price is `null`; published tariffs are not labelled quotations. Evidence count inconsistencies → F06 |
| D | Licensing rights | PARTIAL | 11 rights (7 `NOT_GRANTED`, 3 `REQUIRES_CONTRACT`, 1 `PERMITTED` for a public-domain context layer); `blockingRights: 9`; no `GRANTED`; chart/weather/NMEA rights `NOT_GRANTED`; every `blockerId`/`sourceRecordId`/`blockedProduct` resolves; summary flags all false. Docs misstate count/status → F04 |
| E | Currency and VAT | VERIFIED | All files/records EUR; every `VAT_INCLUDED` record at 21 %; net = gross/1.21 recomputed on all records; no VAT-inclusive value used as net; numeric non-EUR observations are USD with declared ECB basis (`fxBasis` + `fxRates` + `ASM-MC12-021`); inherited MC-11 BOM lines keep 0.925925926 and are not re-converted. Bundle aggregates compose both disclosed bases → F12 (informational) |
| F | Per-SKU cost arithmetic | VERIFIED | Independently recomputed 50/50 records: net, known variable cost, contribution, headroom, break-even gross price — 0 mismatches. `breakEvenGrossPriceEur` null exactly where cost is unknown (`PILOT`, `AIS-CONNECTED`) or the object is a subscription |
| G | Recurring service-cost aggregation | VERIFIED | WATCH monthly→annual (9.90→118.80 gross, 98.18 net), FLEET 49/79 per vessel-month→588/948; WATCH carries cellular, cloud, notification, payment, support, returns lines; inactive/suspended state modelled (ASM-MC12-020, D08 §5); no guaranteed alert-delivery claim anywhere (negated wording only) |
| H | Scenarios, bundles, margins | PARTIAL | 70/70 sensitivity, 4/4 stress, 9/9 decision scores recomputed; 6/6 bundle net/contribution recomputed; all `contributionPct` null where a material unknown exists; family classifications consistent between `unit-economics.json` and `decision-matrix.json`. Composition deviation → F08 |
| I | Governance and commercial claims | PARTIAL | No approved/validated price (`HYPOTHESIS_UNAPPROVED`/`NOT_ESTABLISHED` only); `COMMERCIAL_AVAILABILITY=NOT_FOR_SALE`; `CUSTOMER_WTP_VALIDATED=false`; `PRICE_APPROVED=NONE`; `LICENSING_RIGHTS_GRANTED=false`; `breakEvenClaim=false`, `profitability=NONE`; `mc13Started=false`, no forecast artefact. Status block inconsistent on `PR_CREATED` → F03; counts misstated → F04–F06 |
| J | MC-11 traceability / no regression | VERIFIED | 90/90 scenarios: Σ lines = knownSubtotal, tooling field = COST-16 line, COST-16/17 absent from variable unit lines, COST-12 exactly once for installer and zero for self-install; D-04 hash unchanged; MC-11 files untouched; `MC10_VERDICT=BLOCKED`, `MC11_VERDICT=PARTIAL` preserved |
| K | Validation coverage and adversarial controls | PARTIAL | 49 check ids exist (5 S, 18 V, 14 A, 8 R, 4 D); 59/59 tests pass; every check family has a negative test that asserts the intended check id fails; no field-vs-itself comparison found. **R-01 dead branch** → F01; A-06 composition check too weak → F09; D-03 freezes the stale `PR_CREATED:false` → F03 |
| L | Deliverable completeness and PR state | PARTIAL | D01–D19 present and substantive (92–362 lines each; D15 = 16 economic JSON datasets plus this review's review-findings.json; D16 = 2 scripts); all 16 JSON files parse; relative links resolve in the delivery record, executive report and two other key docs (0 broken); PR state verified draft/stacked/unmerged. D17 is this document (created by the audit, as designed); registry placeholder → F07 |

## 6. Findings

| ID | Sev | Finding | Status |
|---|---|---|---|
| F01 | MAJOR | Validator R-01 cannot fail for a connected hardware family while global cloud inputs exist | OPEN |
| F02 | MINOR | HUB / DISPLAY / AIS declare no recurring cost input or explicit UNKNOWN, contrary to contract R-01 | OPEN |
| F03 | MAJOR | `PR_CREATED` status block inconsistent: manifest `false`, D18/D19 `true`, PR #19 exists; D-03 freezes `false` | OPEN |
| F04 | MINOR | Rights count misstated as “9 rights, all NOT_GRANTED or REQUIRES_CONTRACT”; actual 11 (7/3/1) | OPEN |
| F05 | MINOR | Blocker count/severity misstated as “22 (12 BLOCKING, 9 MAJOR, 1 MINOR)”; actual 23 (14/8/1) | OPEN |
| F06 | MINOR | Evidence counts inconsistent: `engineeringAssumptions:0` vs 1 actual; class counts sum 52 vs 53 provider records | OPEN |
| F07 | MINOR | Registry row 12 contains placeholder “correction commit in the final head” and premature review reference | OPEN |
| F08 | MINOR | Bundle component lists deviate from `bundle-definitions.json` (SAIL adds CONDITIONAL SENSE, omits PILOT; COMPLETE omits PILOT; FLEET list empty) | OPEN |
| F09 | MINOR | A-06 accepts any family present in `components ∪ optionalComponents`; does not verify included-only composition or quantities | OPEN |
| F10 | INFORMATIONAL | Bundles list fixed `CERTIFICATION` inside `unknownVariableCostCategories` (variable-cost vocabulary) | OPEN |
| F11 | INFORMATIONAL | WATCH monitoring returns 2.94 vs 3 % of net = 2.95 (already disclosed in D19 §8/D11) | OPEN |
| F12 | INFORMATIONAL | Bundle subtotals compose MC-11-inherited FX (hardware) and ECB-observed FX (recurring); D-051 wording should be scoped to registers | OPEN |

Full descriptions, evidence references, required corrections and owners are in
[review-findings.json](../data/review-findings.json).

## 7. Verdict

**Verdict: `PARTIAL`.**

- **Internal economics arithmetic is verified exactly** (50 records, 90 scenarios, 70 sensitivity cases,
  4 stress cases, 6 bundles, 9 decision scores — 0 mismatches) and every governance claim except the
  `PR_CREATED` flag holds. The economic conclusions (0 `ECONOMICS_EVIDENCED`, no price approved, no
  right granted, no profitability claim) are consistent with the evidence.
- **Internal-scope certification is withheld at this commit** because required dimension I (status-block
  consistency) and dimension K (every check genuinely able to fail) are not met: F01 and F03 are OPEN
  MAJOR findings. The 49/49 gate result is therefore necessary but not sufficient evidence of a clean
  internal scope.
- **`MC12_EXTERNAL_COMMERCIAL_EVIDENCE` must remain `BLOCKED_OR_NOT_OBTAINED`.** 0 formal quotations,
  0 executed contracts, 0 RFQs sent, 9 inaccessible sources, chart/weather/NMEA/connectivity/cloud/tile/
  IP/trademark rights unlicensed. No audit or documentation change can alter that external state.

Required before merge/sign-off: close F01 and F03, correct F02, F04–F09, and have the Lead re-run the
gates and re-verify on the corrected commit. The auditor does not close its own findings.

## 8. Residual risks

- Gate strength: a check that cannot fail (F01) creates false assurance for future data edits, even
  though the current arithmetic is correct.
- The independent recomputation depends on the same source registers; it verifies arithmetic and identity,
  not the truth of published tariffs, licensing terms or any external price.
- FX: inherited MC-11 0.925925926 basis remains an engineering assumption on all hardware lines.
- 0.8–4.7 % observed-price coverage of modelled hardware cost; certification `UNKNOWN` in all 90 scenarios.
- Recurring costs are published tariffs, not contracts; no SLA, no coverage offshore, no customer evidence,
  no WTP, no churn/CAC.
- Uncommitted `.recon/` author scratch remains in the working tree (not part of the frozen commit).

## 9. What would change the verdict

1. Remove the unreachable condition from R-01 and add a negative test that removes one family’s recurring
   exposure while retaining global cloud inputs; add the missing explicit UNKNOWN/NOT_APPLICABLE recurring
   declarations for HUB/DISPLAY/AIS (F01, F02).
2. Make `PR_CREATED` consistent across `manifest.json`, D18, D19 and the registry (and the frozen validator
   constant), keeping `MERGED/DEPLOYED/MC13_STARTED` false (F03).
3. Correct the rights, blocker and evidence counts and the registry placeholder, and align bundle component
   lists with the authoritative definitions or label conditional/omitted components (F04–F09).
4. Re-run the five gates above plus the independent recomputation on the corrected commit. With 0 arithmetic
   mismatches and F01/F03 CLOSED_VERIFIED, the recommendation becomes
   `PASS_INTERNAL_ECONOMICS_SCOPE` — external commercial evidence stays `BLOCKED_OR_NOT_OBTAINED` regardless.

## 10. No-issue dimensions (explicit)

No defect was found in: diff scope and ancestry, MC-11 no-regression and COST-16/COST-12 invariants,
per-SKU arithmetic, subscription annualisation, sensitivity/stress arithmetic, decision scores, currency/VAT
conversion, commercial-availability/price/WTP governance flags, or relative-link integrity of the reviewed
documents. Evidence is recorded in §3–§5 and in the `auditChecks` array of the machine companion.
