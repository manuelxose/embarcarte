# MC-14 — Independent compliance audit (D21)

| Field | Value |
|---|---|
| Deliverable | D21 `review/MC-14-REVIEW.md` |
| Milestone | MC-14/36 — Legal/commercial risk register, regulatory compliance, consumer rights and commercial claims governance |
| Date | 2026-11-02 |
| Reviewer | Agent G — Independent Compliance Auditor (did not author the implementation) |
| Frozen commit | `e32673ea26fa1b115e57b02b9755d3149c3db1ea` — round-2 corrected candidate (`fix(mc14): apply independent-audit corrections A-01..A-10 and reconcile research provenance`); previous frozen candidate `6fb22850aa7acdcea3e4959024d93ea5adc54842` |
| Base commit | `f80c0f02ac14803e9e1539393abbb225d7f49e16` (MC-13 record commit) |
| Branch | `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Machine-readable record | `data/review-findings.json` (`MAREA-MC14-REVIEW-FINDINGS`, re-verification round 2) |
| Verdict | **PENDING_CORRECTION** — 0 BLOCKING, 1 MAJOR, 3 MINOR, 4 INFORMATIONAL open; 9 closed |
| Expected verdict after residual correction | `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`, programme status `PARTIAL` (internal PASS, external clearance `NOT_GRANTED`), mirroring MC-13 |
| Nature | Internal governance audit. Not a legal opinion, certification, insurance or licence review, clearance to sell or publication authorisation |

## 0. Executive summary

**Round 1 (frozen candidate `6fb2285`)** found the implementation technically solid and
self-consistent in almost every dimension I could machine-check or manually challenge, but it
found one MAJOR defect (A-01: contradictory legal-research provenance between the research trail
and the governed register), a stale `2025-02-01` RED date (A-02) and a set of documentation
defects, and it failed closed with `PENDING_CORRECTION`.

**Round 2 (correction commit `e32673e`)** re-verifies the corrections independently. Most are
genuinely fixed: the CSV is now a 48-row governance mirror of `legal-sources.json` (same ids,
statuses, URLs and retrieval dates, 0 mismatches); the D02 source table (48/48) and requirement
table (51/51) match; dossier §2 per-source statuses match the governed register for every shared
source (0 mismatches) and the four considered-only records are explicitly marked
`NOT_IN_GOVERNED_REGISTER`; the stale RED date is `2025-08-01`; SCA RTS entry into force is
`2018-03-14`; the class C claims are `INTERNAL_ONLY` with 7 internal / 35 public-prohibited
summaries; the LGP requirement is `UNDETERMINED`; the "recital 580" citation is replaced by
Article 71; the WEEE wording and the `pilotCoverage` typo are fixed; and D20 now states the
reproducible 54/54 frozen result plus the CI manual-gate position. The gate at `e32673e` is
**54/54**, the committed suite is **41/41**, and **6/6 fresh** auditor mutations are detected.

Four items are not cleanly closed, however:

- **A-01 (MAJOR) is only partially corrected.** The dossier's §1 key-date table still labels 14
  sources `RE_VERIFIED` and its §3 transposition table still labels 6 sources `RE_VERIFIED`,
  including governed `CONSUMED_FROM_PREDECESSOR_EVIDENCE` sources (CRA, GPSR, DCD, UCPD,
  eCommerce, RD 186/2016, RD 187/2016, NMEA 2000 licensing, NMEA 0183, NMEA certification). The
  same document therefore still states two verification statuses for the same source and its own
  note "no source carries two verification statuses" is false; its §0 membership sentence
  (48 + 4 + 2) also contradicts its own 48 − 2 + 4 = 50 rule.
- **A-04 was claimed but not applied:** `git diff 6fb2285..e32673e` shows D19 was not modified;
  its §3.3 still declares fields that the 84 bundle assessments do not carry.
- **A-05 was claimed but not applied:** D03 lines 216/237 still shorten the governed
  WEATHER/FLEET BATTERIES rationales.
- **A-06 is only partially fixed:** D15, `website-findings.json` and D18 now use the real
  unprefixed routes, but `data/mc15-handoff-inputs.json` still contains `/legal/aviso-legal`,
  `/legal/privacidad`, `/legal/cookies` and `/tienda/checkout`, none of which exists in the route
  registry.

I therefore keep **PENDING_CORRECTION** (fail-closed): the standing rule is that no internal-scope
award is made while a MAJOR defect is open. The residual corrections are small documentation/data
edits and do not require new legal research. Once A-01, A-04, A-05 and A-06 are actually applied
and re-checked, the evidence supports `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE` with programme
status **PARTIAL** (internal legal/commercial governance PASS; external legal clearance
`NOT_GRANTED`, as in MC-13).

## 1. Scope and method

Audited candidates: `6fb22850aa7acdcea3e4959024d93ea5adc54842` (round 1) and
`e32673ea26fa1b115e57b02b9755d3149c3db1ea` (round 2, on top of `6fb2285`), both on
`feature/marea-mc14-legal-commercial-risk-claims-policy`, diffed against
`f80c0f02ac14803e9e1539393abbb225d7f49e16`.

Method, in order:

1. Read `AGENTS.md` and `docs/marea/execution/AGENT-OPERATING-MODEL.md` (roles, evidence
   standard, review rules, milestone status rules).
2. Verified Git ancestry, branch state, commit count, merge-commit absence and changed-file
   scope from Git itself, not from the delivery summary, for both candidates.
3. Read the validator and its suite in full. Round 2 inspected the only validator change
   (MC14-050 now accepts a `PENDING`/`PENDING_CORRECTION` review as the designed pre-record
   state) before accepting it.
4. Loaded every machine-readable dataset through the committed validator's JSON reader only,
   and recomputed counts, references and document-to-data reconciliation with auditor-written
   loops. For round 2, every changed data file was semantically diffed against `6fb2285` to
   prove that the changes are limited to the claimed corrections (formatting-only diffs in
   `bilingual-claims.json`, `liability-insurance.json`, `website-findings.json`,
   `mc15-handoff-inputs.json` were ignored by the semantic comparison).
5. Cross-checked each delivered document against its governed dataset, including verbatim table
   rows and rationale text, and verified all 34 website findings against the cited `file:line`
   ranges.
6. Re-fetched the four currency-critical external positions (CRA, PLD corrigendum, RED
   delegated-repeal, RD 188/2016 art 9.8) from official/EUR-Lex sources as an independent check.
7. Wrote 19 independent negative controls in round 1 and 6 fresh controls in round 2 (in-memory
   clones, no repository write) and confirmed each intended validator check fails.
8. Did not run the Angular build, Playwright or the backup gate (long/side-effectful), and did
   not use any credential, browser, deployment or commercial channel.

No implementation file was modified by the auditor. The only writes are this document and
`data/review-findings.json`.

## 2. Git ancestry and changed-file scope

| Check | Command | Result |
|---|---|---|
| Ancestry (round 1) | `git merge-base --is-ancestor f80c0f0 6fb2285` | exit 0 |
| Ancestry (round 2) | `git merge-base --is-ancestor f80c0f0 e32673e` | exit 0 |
| Branch HEAD at re-verification | `git rev-parse HEAD` | `e32673e…` (the corrected candidate) |
| Worktree | `git status --porcelain --untracked-files=all` | clean before this re-verification record |
| Merge commits | `git rev-list --merges f80c0f0..e32673e` | none |
| Commits in range | `git log f80c0f0..e32673e` | 2: `6fb2285` (frozen candidate), `e32673e` (correction commit) |
| Branch containment | `git branch --contains e32673e` | only `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Merged to `main`? | `git merge-base --is-ancestor e32673e main` | exit 1 — not merged |
| Total changed paths | `git diff --name-only f80c0f0 e32673e` | 44 paths: the MC-14 package (20 documents, 18 data JSON, 2 research files, D21 review), `package.json` and the two MC-14 scripts |
| Correction diff | `git diff --name-status 6fb2285 e32673e` | 17 modified files (14 documents/data + dossier + CSV + validator) + D21 added; no source, deployment or dependency change |
| Forbidden prefixes | filter of `^(src/|public/|deploy/|\.github/)` over the full diff | no match |

The correction commit is a normal commit on the same branch (no merge), and it did not touch
`src/`, `public/`, `deploy/`, `.github/`, `AGENTS.md`, the predecessor milestone data or the
route/price/product/checkout implementation. The `package.json` change from round 1 only added
the two `test:legal-commercial*` scripts and the Prettier file lists; no dependency changed.
The website remains unmodified (`websiteModified = false`, `readOnly = true`,
`publicationAuthorized = false`), no deployment occurred (`DEPLOYED = false`) and no merge
occurred. The remote server state could not be queried without a network Git operation; locally
there is no `feature/marea-mc14-*` remote-tracking branch.

## 3. Data/document reconciliation and validator/test outputs

### 3.1 Commands executed

| Command | Result |
|---|---|
| `npm run test:legal-commercial` (round 1, at `6fb2285`) | **54/54 checks passed**, exit 0 |
| `npm run test:legal-commercial` (round 2, at `e32673e`, before this record) | **54/54 checks passed**, exit 0 |
| `npm run test:legal-commercial:unit` (both rounds) | **41/41 tests passed**, exit 0 |
| `node --test scripts/check-marea-legal-commercial.test.mjs` (plain) | exit 1, `EPERM` spawn — the documented Windows DSH sandbox child-process restriction. The package script already runs `node --test --test-isolation=none`, so no manual substitution was needed; the `npm run` result is authoritative. |
| `npm run test:i18n` / `test:commerce` / `test:seo` / `test:brand` | all exit 0 at `6fb2285` (SEO: 101 sitemap URLs; brand: 21/21) |
| `npm run test:products` / `test:bundles` / `test:market` / `test:customer-research` / `test:customer-recovery` / `test:hardware` / `test:economics` / `test:financial` | all exit 0 at `6fb2285` — 52/52, 35/35, 40/40, 62/62, 32/32, 54/54, 49/49, 77/77 inherited checks pass. The correction commit changes only MC-14 documents/data and the MC-14 validator, which these gates do not read, so they were not re-read by the correction. |
| Auditor reconciliation loops (both rounds) | see §3.2 and §3.3 |
| Fresh auditor mutation harness (round 2) | 6/6 independent mutations detected (N1–N6, §9.3) |

Inherited unit suites (`node --test scripts/check-marea-*.test.mjs`) hit the same sandbox
`EPERM` without `--test-isolation=none`; only MC-14's own suite is configured for this
environment. That is an environment limitation, not a regression introduced by MC-14.

### 3.2 Manifest evidence counts — recomputed at `e32673e`, 23/23 match

| Count | Manifest | Recomputed |
|---|---:|---:|
| legalSources | 48 | 48 |
| legalRequirements | 51 | 51 |
| productFamiliesAssessed / bundlesAssessed | 9 / 6 | 9 / 6 |
| applicabilityAssessments | 210 | 126 + 84 = 210 |
| economicOperatorRoles / supplyScenarios | 11 / 9 | 11 / 9 |
| risks | 95 | 95 (29 CRITICAL, 62 HIGH, 4 MEDIUM) |
| predecessorBlockersMapped | 134 | 58 + 39 + 23 + 14 = 134 |
| mc13HandoffDependenciesConsumed | 10 | 10 |
| consumerObligations / consumerTemplates | 16 / 8 | 16 / 8 |
| privacyPurposes | 14 | 14 |
| cybersecurityRequirements / lifecycleControls | 14 / 12 | 14 / 12 |
| licensingRights / liabilityScenarios | 17 / 13 | 17 / 13 |
| claims / prohibitedClaimCategories | 42 / 30 | 42 (A4/C3/P11/X24; 7 INTERNAL_ONLY / 35 PUBLIC_PROHIBITED) / 30 |
| websiteFindings | 34 | 34 (6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL) |
| releaseGates / releaseDocuments | 13 / 24 | 13 / 24 |
| externalDecisions | 20 | 20 (19 PENDING, 1 OUT_OF_SCOPE_FOR_MC14) |
| formalQuotations / executedContracts / contacts | 0 | 0 (no fabricated contact) |

### 3.3 Document-to-data reconciliation at `e32673e`

| Document | Check | Result |
|---|---|---|
| D02 source register | 48/48 source rows (verification status) and 51/51 requirement rows (provision, obligation, sources, status, gate) match `legal-sources.json` | match |
| CSV research register | 48 rows; ids = governed ids; 0 status/URL/retrieval-date mismatches vs `legal-sources.json`; status distribution 4 / 32 / 2 / 6 / 4 | match |
| Dossier §2 | 50 per-source blocks (46 governed + 4 considered-only `NOT_IN_GOVERNED_REGISTER`); 0 verification-status mismatches for shared sources; 2 governed-only additions documented | match |
| Dossier §1 / §3 | still 14 + 6 `RE_VERIFIED` labels for governed-CONSUMED sources; §0 membership arithmetic inconsistent | **mismatch (A-01)** |
| D05 risk register | 95/95 risk rows match (title, severity, status, owner, gate, evidence count); domain counts sum to 95 | match |
| D16 release gates | 13/13 gate rows and 24/24 document rows match | match |
| D17 external decisions | 20/20 decision rows match (status, owner, due date, blocking risks) | match |
| D14 bilingual catalogue | 42/42 claim ids; every ES/EN pair appears verbatim; class/status/channel columns match, including the three C claims now `INTERNAL_ONLY` and the updated "7 internal / 35 public-prohibited" header | match |
| D03 applicability matrix | 208/210 rationale+status rows match verbatim; 2 rows still shortened | **mismatch ×2 (A-05)** |
| D08 / D09 / D10 / D12 | 16 obligations + 8 templates / 14 purposes / 14 requirements + 12 controls / 13 scenarios — counts and statuses match | match |
| D04 economic operators | 11 role rows and 9 scenario rows; human labels rather than `roleId` values (traceable through D19); no role asserted as held | match |
| D15 website inventory | all 34 findings: cited file exists, line range valid, `observedText` is a verbatim substring, `status = NOT_REMEDIATED`, `publicChangeAuthorized = false`; route labels now match the registry | match |
| `mc15-handoff-inputs.json` routes | 4 of 8 page routes still non-existent (`/legal/*`, `/tienda/checkout`) while D18 is correct | **mismatch (A-06)** |
| Reference integrity | auditor sweep of every known `*Id`/`*Ids` foreign-key field (including paths the validator does not check) | 0 unresolved |
| Manifest counts | 23/23 recomputed counts match | match |

Residual reconciliation defects are A-01 (dossier §1/§3/§0), A-04 (D19 vs bundle schema) and
A-05 (two D03 rows); A-06 is a data/document route mismatch. The repeated-count claims inside the
documents (D01 "48/51/95/134/42/30/34/13/24/20", D05 "CRITICAL=29, HIGH=62, MEDIUM=4", D03
collated per-family A/C/N/U counts, D16 "13 gates, 24 documents, 0 executed", D14 "42 pairs
(7 internal, 35 public-prohibited)") all recompute correctly.

## 4. Source and date verification

### 4.1 Mandatory currency checks — all confirmed against official sources

| Position | Package value | Independent check |
|---|---|---|
| CRA 2024/2847 | publication 2024-11-20, in force 2024-12-10, reporting from 2026-09-11, main obligations 2027-12-11, support period ≥ 5 years (Art 13(8); updates Art 13(9)) | Confirmed: Art 71 applies the Regulation from 2027-12-11; Art 14 reporting from 2026-09-11; Art 13(8) five-year floor |
| PLD 2024/2853 | publication 2024-11-18, entry into force 2024-12-08, transposition 2026-12-09; May 2026 corrigendum OJ L 2026/90364 (2026-05-07, CELEX 32024L2853R(01)) changes Art 2(1) so it applies to products placed on the market after 2026-12-08 | Confirmed: corrigendum text replaces Article 2(1) with "after 8 December 2026" |
| RED DelReg 2022/30 | applied from 2025-08-01 | Confirmed. At `e32673e` the stale `2025-02-01` is gone from the governed requirement and D02 (A-02 closed) |
| DelReg 2026/339 | adopted 2026-02-16, OJ 2026-04-29, in force 2026-05-19, repeals 2022/30 with effect from 2027-12-11 | Confirmed: "Delegated Regulation (EU) 2022/30 is repealed with effect from 11 December 2027" |
| GPSR 2023/988 | applies 2024-12-13; Art 19 online-offer information duties | Confirmed |
| RD 188/2016 Art 9(8) | Spanish-language instructions and safety information for the Spanish market | Confirmed: "Las instrucciones e información de seguridad deberán estar al menos en castellano, si se pone el equipo en el mercado español" |
| Consumer floor | 3-year Spanish legal guarantee, 24-month presumption, 14-day withdrawal; EU floor 2 years | Confirmed and correctly separated from the EU minimum |
| SCA RTS 2018/389 | entry into force 2018-03-14; application 2019-09-14 | Confirmed at `e32673e` in JSON and dossier (A-03 closed) |

### 4.2 Register quality

All 48 governed sources carry `sourceId`, instrument, `officialUrl` (EUR-Lex ELI, BOE, European
Commission, AEPD, MITECO, IHM, AEMET, NMEA, EUIPO, OEPM), jurisdiction (EU 31 / ES 14 /
international 3), `retrievedOn` 2026-11-02 and a `verificationStatus` from the declared
vocabulary. Requirements are complete (51/51). No requirement is marked `COMPLIANT_VERIFIED`
(0/51); no `APPLICABLE` determination relies only on a `NOT_RETRIEVED`/`INACCESSIBLE` source; no
`NOT_APPLICABLE` determination relies only on a weak source (0/56). The one negative determination
that rested solely on a `NOT_RETRIEVED` source is now `UNDETERMINED` and the D02 rule is
qualified (A-09 closed).

### 4.3 Defect status after round 2

- **A-01 (MAJOR, still open):** the CSV, D02 and dossier §2 now reconcile with the governed
  register, but the dossier §1 (14 rows) and §3 (6 rows) still label governed-CONSUMED sources
  `RE_VERIFIED`, and the §0 membership sentence is arithmetically inconsistent. Detail in §10
  and `data/review-findings.json`.
- **A-02 / A-03 / A-10 (MINOR, now closed):** stale RED date corrected to `2025-08-01`; SCA RTS
  entry into force corrected to `2018-03-14`; "recital 580" replaced by Article 71.
- Observations not raised as findings: several dossier date-table entries use OJ-publication
  dates while the governed JSON uses adoption/publication dates (e.g. EMC/LVD, CRD, CSD/DCD,
  UCPD, eCommerce, EUTMR, MED). These are annotation-convention differences inside the A-01
  reconciliation scope rather than independent wrong conclusions; the four mission-critical
  positions are correct in both layers.

## 5. Applicability and mapping review

### 5.1 Applicability matrix (9 families × 14 instruments; 6 bundles × 14)

Across the 210 assessments the status distribution is: 102 `APPLICABLE`, 48
`CONDITIONALLY_APPLICABLE`, 56 `NOT_APPLICABLE_WITH_REASON`, 4 `UNDETERMINED`. The four
`UNDETERMINED` rows are exactly the genuinely undecided ones (PILOT/RCD, DISPLAY/RCD,
SAIL/RCD, COMPLETE/RCD) and are escalated to counsel. Every `NOT_APPLICABLE` carries a written
legal rationale and source citations (families) or a rationale (bundles); every
`CONDITIONALLY_APPLICABLE` carries the condition that would change applicability. The matrix is
product-specific: NAV, WEATHER and FLEET are correctly excluded from EMC/LVD/WEEE/BATTERIES/
RCD/MED on software/service grounds, while HUB/AIS/WATCH/DISPLAY carry the hardware instruments;
AIS is correctly treated as RED radio equipment in receive-only mode; MED is
`NOT_APPLICABLE_WITH_REASON` everywhere with no wheelmark claim; GPSR and CRA are reasoned per
product rather than blanket-applied. PLD is `APPLICABLE` on every family and bundle, which is
correct for a horizontal liability regime and is separately reasoned per product. No CE marking,
wheelmark, NMEA certification or marine approval is claimed anywhere.

The RCD/MED/CRA/PLD boundaries are reasoned: RCD is excluded for add-on electronics with the
PILOT/DISPLAY component question left `UNDETERMINED`; MED is excluded with an explicit
"not shipborne MED equipment / no wheelmark claim" rationale; CRA scope for NAV/WEATHER/FLEET is
`CONDITIONALLY_APPLICABLE` on a scope analysis rather than asserted; PLD application is explained
per product. One wording defect was closed in `e32673e`: the WEEE rationales now say the
hardware "falls to be registered separately" (A-17). Two documentation residuals remain: the
D03 rows for two rationales (A-05) and the bundle-assessment schema gap (A-04).

### 5.2 Inherited blocker mapping (58 MC-02 + 39 MC-11 + 23 MC-12 + 14 MC-13 = 134)

- MC-02: all 58 mapped, exactly L 9 / S 9 / D 10 / H 13 / P 10 / X 7 (the required L 9 / D 10 /
  H 13 / X 7 plus the S/P records). The count was re-derived from the MC-02 blocker table itself
  (58 rows, no duplicates), not from the mapping file.
- MC-11: all 39 risk ids in `docs/marea/hardware/data/risks.json` are mapped, no extras.
- MC-12: all 23 blocker ids in `docs/marea/economics/data/blocker-register.json` are mapped.
- MC-13: all 14 blocker ids in `docs/marea/financial/data/blocker-register.json` are mapped, no
  extras; all 14 inherited statuses match the predecessor register exactly.
- 134 unique `register/inheritedId` pairs, `doubleCounted = false` everywhere, 0
  `CLOSED_VERIFIED`, 0 deletions, 0 status changes; every mapping resolves to at least one MC-14
  risk and every risk `predecessorBlockerIds` reference resolves to a mapped record (re-verified
  at `e32673e`; unchanged by the correction).
- All 10 MC-13 handoff dependencies (`MC14-DEP-01`…`MC14-DEP-10`) are consumed with area and
  amount status identical to `docs/marea/financial/data/mc14-handoff-inputs.json`; unknown
  amounts stay `null` (DEP-02/05/09), the 3% returns assumption stays labelled illustrative
  (DEP-04), and the EUR 60,000 envelope stays `ILLUSTRATIVE_ENVELOPE_ONLY` (DEP-01).

### 5.3 Inherited conflict and predecessor status

The MC-03 class-A public-brand allowance conflict is recorded (`MC14-BRAND-CONFLICT-01`, source
`docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md`) with the stricter MC-14 rule taking
precedence and IPR-14/CLM-01 attached. Predecessor verdicts are preserved unchanged
(`MC13_VERDICT = PARTIAL`, `MC13_INTERNAL_FINANCIAL_SCOPE = PASS_INTERNAL_FINANCIAL_SCOPE`,
`MC13_EXTERNAL_COMMERCIAL_VALIDATION = BLOCKED_OR_NOT_OBTAINED`).

## 6. Economic-operator review

11 potential roles and 9 supply scenarios. The file's status note states that no role is legally
held or accepted until a written decision and supporting contracts exist, and every scenario
lists `likelyRoles` rather than asserted roles. The module-versus-integrated-product distinction
is explicit (SCN-03 third-party certified receiver module; SCN-04 Raspberry-Pi-based integrated
appliance): a module certificate is never treated as final-product certification. Importer and
distributor duties are defined (verify manufacturer conformity, importer identity/language/
storage, market-surveillance cooperation; distributor must not alter and must stop supply on
non-conformity), and the release restrictions repeat the same rule. The role definitions cover
brand owner, manufacturer, OEM assembler, importer, distributor, seller, installer, SaaS
provider, controller, processor and service operator. No economic-operator role is asserted as
already held by EMBARCARTE.

## 7. GDPR and CRA review

**GDPR/privacy.** A role map of four potential roles (controller, processor, joint-controller
candidate, subprocessor), 14 processing purposes, rights implementation, DPIA screening, security
and breach, international transfers and FLEET tenancy are recorded prospectively. The package
states truthfully that no DPIA has been performed (`screeningPerformed = false`, AEPD
consultation `NOT_PERFORMED`), no DPA exists (`dpaExists = false`), no processing inventory is
approved, tenant isolation is not tested (`tenantIsolationTested = false`), Article 32 controls
are `NOT_ASSESSED`/not implemented, and no data-residency or "GDPR-compliant" claim may be made.
The validator's MC14-053 guards these negatives. One legal source (AEPD DPIA guidance) is
`INACCESSIBLE`; the limitation is disclosed.

**CRA.** 14 essential requirements are mapped and all 14 are `NOT_MET`; 12 lifecycle controls are
`NOT_IMPLEMENTED` or `OPEN`; the support period is `OPEN` (five-year statutory floor correctly
described as tied to expected lifetime, not a marketing guarantee); support-period and
maintenance costs are `UNKNOWN` (EUR 60,000 is an illustrative stress envelope, not a quote); the
reporting obligation is correctly recorded as **already applicable from 2026-09-11**, so the
absent process is a present gap; no classification memo, conformity route, notified body, DoC,
CE marking or reporting channel exists; `GATE-CRA-CYBERSECURITY` is `BLOCKED`. The RED-to-CRA
transition (2022/30 repealed from 2027-12-11) is recorded correctly. These facts are unchanged
at `e32673e`.

## 8. Consumer-rights review

D08 and `consumer-rights.json` are consistent: 3-year Spanish legal guarantee, 24-month
presumption of non-conformity, EU 2-year floor, 14-day withdrawal, precontractual information,
unfair-terms control, digital content/services remedies, and the rule that a commercial warranty
may add to but not replace, restrict or shorten legal rights
(`commercialWarrantyReplacesLegalGuarantee = false`, `CONS-OB-04`). The 3% returns allowance is
labelled `ILLUSTRATIVE_ASSUMPTION_NOT_MEASURED` and D08 §2 explains it is not a measured return
rate or reliability evidence. B2C and B2B are separated (`sameTemplateJustified = false`).
Consumer terms, withdrawal form and subscription terms are all `DRAFT_REQUIRED`/not approved;
`GATE-CONSUMER-TERMS` is `BLOCKED`. These facts are unchanged at `e32673e`.

## 9. Claims enforcement and negative tests

### 9.1 Policy state (after the `e32673e` corrections)

42 bilingual claim pairs (4 A / 3 C / 11 P / 24 X), 30 mandatory prohibited categories, valid
classes and statuses. **0 claims are `PUBLIC_AUTHORIZED`**; **7 are `INTERNAL_ONLY`** (4 A plus
the three C claims CLM-019/039/040, corrected in `e32673e`) and **35 are `PUBLIC_PROHIBITED`**.
`publicationAuthorization = NONE`; `MAREA_PUBLIC_USE = NO_GO`;
`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; no `®`/`™` appears in any non-prohibited claim (the
only `®` is CLM-008, an X-class catalogue example of a prohibited statement, with
`registeredSymbolAllowed = false`). The inherited MC-03 conflict is documented and resolved in
favour of the stricter rule. All 42 claims have both locales, and ES/EN numeric tokens match
(`24,7`/`24.7`, `1.000`/`1,000` are correctly localised, not mismatches). Every claim has an
approver role, release gate, legal sources and risks that resolve. The policy workflow step 4
("Until then it stays INTERNAL_ONLY") and the data are now consistent (A-08 closed).

### 9.2 Validator enforcement

The validator enforces class/status vocabularies, prohibitions on P/X publication, evidence
requirements, publication-authorisation `NONE`, frozen flags, trademark/IP statuses, PILOT
blocking, AIS receive-only, FLEET no-default-hardware, price/financial/insurance prohibitions,
consumer rights, MC-13 unknown amounts, the 134-record mapping, the brand conflict, predecessor
verdicts, website immutability, MC-15 non-start, gate/document non-certification, external
decisions, review-state consistency and publication/trademark coexistence. The only validator
change in `e32673e` makes MC14-050 accept a `PENDING`/`PENDING_CORRECTION` review as the designed
pre-record state; the auditor reviewed the diff and ran mutation N1 to confirm a pre-record PASS
is still rejected. The suite's 40 negative controls plus the positive control pass 41/41.

### 9.3 Independent negative tests (auditor-written; 19/19 in round 1, 6/6 fresh in round 2)

| # | Mutation | Intended check | Detected |
|---|---|---|---|
| M01 | Invent CE certification (DOC-01 CERTIFIED) | MC14-021 | yes |
| M02 | Invent NMEA 2000 certification | MC14-021 | yes |
| M03 | Approve PILOT safety gate (BLOCKED → CLEARED) | MC14-018 | yes (also 022) |
| M04 | Offer AIS transmission in a public claim | MC14-023 | yes (also 017/019/041/052) |
| M05 | Authorise a price claim | MC14-025 | yes (also 014/017/019/041/052) |
| M06 | Fabricate insurance cover in a public claim | MC14-027 | yes (also 014/017/019/041/052) |
| M07 | A-class public claim vs brand `NO_GO` | MC14-052 | yes (also 017/019/041) |
| M08 | Contradict ES/EN numbers (2 vs 3 editions) | MC14-015 | yes |
| M09 | Close a gate without evidence | MC14-021 | yes |
| M10 | Mark a risk `CLOSED_VERIFIED` | MC14-039 | yes |
| M11 | Invent source-IP clearance | MC14-020 | yes |
| M12 | Convert an UNKNOWN amount to zero | MC14-029 | yes |
| M13 | Write a non-ISO legal date | MC14-054 | yes |
| M14 | Delete a mandatory document | MC14-002 | yes |
| M15 | Delete inherited MC-02 blocker L-01 | MC14-031 | yes (also 032) |
| M16 | Assert a DPIA was performed | MC14-053 | yes |
| M17 | Mark a website finding `REMEDIATED` | MC14-035 | yes |
| M18 | Write a review verdict while the manifest review is PENDING | MC14-050 | yes |
| M19 | Publish without publication authorisation | MC14-017 | yes |
| **N1** | **Pre-record PASS verdict while `manifest.review.status = PENDING`** | MC14-050 | **yes** |
| **N2** | **Class C claim `PUBLIC_CONDITIONAL` with empty evidence** | MC14-042 | **yes** |
| **N3** | **Bundle `NOT_APPLICABLE` with a trivial rationale** | MC14-010 | **yes** |
| **N4** | **Delete a governed source still referenced** | MC14-005 | **yes** (also 006/043/048) |
| **N5** | **`publicationAuthorization = AUTHORIZED` without an authorised claim** | MC14-017 | **yes** |
| **N6** | **Invent NMEA certification at the corrected candidate** | MC14-021 | **yes** |

The mutations are the auditor's own; the committed test fixtures were not reused. Round-1
M01–M19 were run at `6fb2285`; round-2 N1–N6 were run at `e32673e` after the correction. The
detection rate confirms the controls are not merely self-consistent with the implementation's
own tests.

## 10. Findings

Full evidence, required correction and re-verification steps are in
`data/review-findings.json`. Status after round 2:

| ID | Class | Status after `e32673e` | Finding |
|---|---|---|---|
| A-01 | **MAJOR** | **OPEN (partial)** | Dossier §1 (14 rows) and §3 (6 rows) still label governed-CONSUMED sources `RE_VERIFIED`; §0 membership arithmetic inconsistent; CSV/D02/§2 now reconcile |
| A-02 | MINOR | CLOSED | Stale `2025-02-01` RED date corrected to `2025-08-01` |
| A-03 | MINOR | CLOSED | SCA RTS entry into force corrected to `2018-03-14` |
| A-04 | MINOR | **OPEN** | D19 §3.3 vs the 84 bundle assessments — claimed correction not applied (D19 unmodified) |
| A-05 | MINOR | **OPEN** | D03 WEATHER/FLEET BATTERIES rationales — claimed correction not applied |
| A-06 | MINOR | **OPEN (partial)** | D15/website-findings/D18 fixed; `mc15-handoff-inputs.json` still has `/legal/*` and `/tienda/checkout` |
| A-07 | MINOR | CLOSED | D20 now states the reproducible 54/54 frozen result and the designed 53/54 pre-record state |
| A-08 | MINOR | CLOSED | Class C claims now `INTERNAL_ONLY`; summaries 7 internal / 35 public-prohibited; catalogue aligned |
| A-09 | MINOR | CLOSED | `REQ-ES-LGP-01` now `UNDETERMINED`; D02 rule qualified for conservative negative determinations |
| A-10 | MINOR | CLOSED | "recital 580" replaced by Article 71 |
| A-11 | INFORMATIONAL | CLOSED | D20 §6 discloses that CI does not execute the gate (manual gate) |
| A-12 | INFORMATIONAL | OPEN | Validator coverage gaps (owner-role vocabulary, bundle citations, decision risk refs, no document-level false-PASS check) — accepted limitation |
| A-13 | INFORMATIONAL | CLOSED | `pilotCoverage` typo fixed |
| A-14 | INFORMATIONAL | OPEN | MC-11/MC-12 inherited statuses via `AS_RECORDED_IN_PREDECESSOR` sentinel — documented |
| A-15 | INFORMATIONAL | OPEN | Record-commit artefacts still pending (manifest `PENDING`, D22/D23 absent, registry row 14 `PLANNED`) — Lead duty |
| A-16 | INFORMATIONAL | OPEN | Remote PR/head state not observable; local evidence shows no merge/deploy/publication |
| A-17 | INFORMATIONAL | CLOSED | WEEE wording now "falls to be registered separately" in data and D03 |

Counts: **0 BLOCKING, 1 MAJOR, 3 MINOR, 4 INFORMATIONAL open; 9 closed.** A-01 is the only
finding that prevents an internal-scope award; it is a provenance-reconciliation defect in the
research dossier, not a change of legal conclusion.

### Record-commit reconciliation note

At `e32673e` the gate is **54/54** because the validator now treats `manifest.review.status =
PENDING` with a `PENDING_CORRECTION` review verdict as the designed pre-record state. The Lead's
record commit must still reconcile `manifest.review.status`, `statusBlock.MC14_VERDICT`,
`statusBlock.MC14_INDEPENDENT_REVIEW` and `statusBlock.MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE` with
the awarded verdict, add D22/D23, update registry row 14 and the decision log, and record
`finalRecordCommit`. Because the interim verdict is `PENDING_CORRECTION`, the correct sequence is:
apply A-01/A-04/A-05/A-06, obtain re-verification of the corrected candidate, then record the
awarded `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE` / programme `PARTIAL`.

## 11. Residual limitations

- External legal clearance, certification, conformity assessment, insurance, data licences,
  supplier quotations, executed contracts and counsel engagement are all absent by design
  (0 formal quotations, 0 executed contracts, 0 licensing rights granted, 0 public claims
  authorised). External decisions remain 19 PENDING + 1 OUT_OF_SCOPE_FOR_MC14.
- Six sources are `NOT_RETRIEVED` and four `INACCESSIBLE` in the governed register; the Spanish
  PLD transposition text is not retrieved; external decisions name the missing counsel and
  authority actions.
- The applicability matrix and CRA classification are reasoned internal assessments, not
  conformity files or legal opinions; RCD/MED/CRA/PLD scope questions are escalated to counsel.
- The claims validator proves internal consistency and prohibited-status enforcement, not that
  wording is legally non-misleading; ambiguous claims require human legal review.
- The auditor re-fetched the four currency-critical external positions but did not re-fetch the
  full 48-source corpus, so the audit verifies the register's internal provenance claims (and
  finds the dossier tables still contradictory in A-01), not the original retrieval of every
  source.
- The Angular build, Playwright E2E, backup/restore and performance gates were not run (long or
  side-effectful, and no runtime code changed); the read-only inherited gates that were run at
  `6fb2285` all pass and the correction commit does not touch their inputs.
- The remote Git/PR state was not queried; the no-merge, no-deploy and no-publication statements
  rest on local Git evidence and the manifest flags.

## 12. Final verdict and authorisation statement

**Verdict: PENDING_CORRECTION (round 2).** The round-1 corrections were re-verified: nine
findings are closed and the machine gate (54/54), the suite (41/41), the fresh mutation harness
(6/6), the applicability/mapping/claims/privacy/CRA/consumer reviews and the scope checks all
still hold at `e32673e`. One MAJOR defect remains open — the research dossier still states two
verification statuses for the same governed sources in its §1/§3 tables and its §0 membership
arithmetic is inconsistent (A-01) — and three MINOR corrections were claimed but not applied or
only partially applied (A-04, A-05, A-06). Per the auditing rule, no internal-scope award is
issued while a MAJOR defect is open. Once A-01, A-04, A-05 and A-06 are applied and re-verified,
the evidence supports `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE` with programme status **PARTIAL**:
the internal legal governance scope passes, while external legal clearance is `NOT_GRANTED` by
definition (mirroring MC-13's internal PASS / programme PARTIAL).

No sign-off of external legal clearance is given or implied. **No sale, certification, legal
clearance, insurance cover, licence, price approval, commercial claim, publication, merge or
deployment is authorised by this review record.** MAREA remains an internal proposed brand
(`MAREA_PUBLIC_USE = NO_GO`, `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`), every product remains
`NOT_FOR_SALE`, `PRICE_APPROVED = NONE`, no public claim is authorised, the website is
unmodified, and MC-15 has not started (`MC15_STARTED = false`).

## 13. Re-verification log — correction commit `e32673e`

**Trigger:** Lead corrections A-01…A-10 plus A-11 disclosure, A-13 typo and A-17 wording in
`e32673ea26fa1b115e57b02b9755d3149c3db1ea`, on top of the frozen candidate `6fb2285`.

**Verified applied and correct:**

- A-02: `REQ-DELREG-01` now says `2025-08-01` in `legal-sources.json` and D02:114; only the
  explanatory correction note retains `2025-02-01`.
- A-03: SRC-EU-SCA-2018-389 `effectiveDate = 2018-03-14`; dossier §1 shows `2018-03-14`; no
  `2018-04-02` remains.
- A-07: D20:109-117 states the reproducible `54/54` frozen result and explains the designed
  `53/54` pre-record state.
- A-08: CLM-019/039/040 are `INTERNAL_ONLY`; claims-policy and bilingual-claims summaries are
  4/3/11/24 and 7 internal / 35 public-prohibited / 0 authorised; D14 header and rows aligned.
- A-09: `REQ-ES-LGP-01` is `UNDETERMINED`; D02:21-24 qualifies the no-non-retrieved-source rule.
- A-10: "recital 580" replaced by Article 71; no occurrence remains.
- A-11: D20 §6 "CI position" discloses that the gate is manual and not CI-executed.
- A-13: `pilotCoverage` present, `pilOtCoverage` absent.
- A-17: WEEE rationales now "falls to be registered separately" in data and D03.
- Data integrity re-checked: 0 unresolved foreign keys; D02 51/51 + 48/48; D05 95/95; D16
  13+24; D17 20/20; D14 42/42; 34/34 website findings verbatim; manifest 23/23 counts; 42
  claims with bilingual/numeric parity and 0 public authorised.
- Gate `npm run test:legal-commercial` **54/54**, suite `npm run test:legal-commercial:unit`
  **41/41**, fresh mutations **6/6** at `e32673e`.
- Semantic diffs of every changed data file against `6fb2285` show only the claimed
  corrections (the large line diffs in `bilingual-claims.json`, `liability-insurance.json`,
  `website-findings.json` and `mc15-handoff-inputs.json` are JSON re-formatting; parsed-object
  comparison confirms no other change).

**Verified NOT applied / not complete (remain open):**

- A-01: dossier §1 lines 45,46,48,49,52,63,64,66,78,79,80,87,88,89 and §3 lines
  665,666,667,668,686,689 still say `RE_VERIFIED` for governed `CONSUMED_FROM_PREDECESSOR_EVIDENCE`
  sources; §0 line 11 arithmetic (48 + 4 + 2) contradicts the line-35 rule (48 − 2 + 4 = 50).
- A-04: `git diff 6fb2285..e32673e -- MC14-MACHINE-READABLE-CONTRACTS.md` is empty; D19 §3.3
  unchanged; 84/84 bundle assessments still lack the three declared fields.
- A-05: D03:216/237 still read "WEATHER contains no battery." / "FLEET contains no batteries.".
- A-06: `data/mc15-handoff-inputs.json`:137/146/155/162 still contain `/legal/aviso-legal`,
  `/legal/privacidad`, `/legal/cookies`, `/tienda/checkout`; D15, `website-findings.json` and D18
  are correct.

**Git/scope at `e32673e`:** ancestry from `f80c0f0` exit 0; exactly 2 commits in range; 0 merge
commits; 44 total changed paths, all inside the MC-14 package/scripts/`package.json`; no
`src/`, `public/`, `deploy/`, `.github/` change; HEAD on the feature branch only; not an ancestor
of `main`; no local remote-tracking MC-14 branch; clean worktree before this record was written.
