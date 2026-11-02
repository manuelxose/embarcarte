# MC-14 — Independent compliance audit (D21)

| Field | Value |
|---|---|
| Deliverable | D21 `review/MC-14-REVIEW.md` |
| Milestone | MC-14/36 — Legal/commercial risk register, regulatory compliance, consumer rights and commercial claims governance |
| Date | 2026-11-02 |
| Reviewer | Agent G — Independent Compliance Auditor (did not author the implementation) |
| Frozen commit | `7f31db83797f9423bbd9d0b60764f8db22fe8bbf` — round-3 audited candidate (`fix(mc14): close residual audit items in dossier tables, D19 schema and MC-15 routes`); previous candidates `e32673ea26fa1b115e57b02b9755d3149c3db1ea` and `6fb22850aa7acdcea3e4959024d93ea5adc54842` |
| Base commit | `f80c0f02ac14803e9e1539393abbb225d7f49e16` (MC-13 record commit) |
| Branch | `feature/marea-mc14-legal-commercial-risk-claims-policy` (pushed; remote head = `7f31db8`; draft PR #21 open, not merged) |
| Machine-readable record | `data/review-findings.json` (`MAREA-MC14-REVIEW-FINDINGS`, re-verification round 3) |
| Verdict | **`PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`** |
| Programme status | **`PARTIAL`** — internal legal/commercial governance PASS; external legal clearance `NOT_GRANTED` (mirroring MC-13) |
| Findings | 0 BLOCKING, 0 open MAJOR, 0 open MINOR; 4 INFORMATIONAL open by design; 13 closed |
| Nature | Internal governance audit. Not a legal opinion, certification, insurance or licence review, clearance to sell or publication authorisation |

## 0. Executive summary

**Round 1 (`6fb2285`)** found the implementation technically solid and self-consistent in almost
every dimension, but with one MAJOR provenance defect (A-01), a stale RED date (A-02) and a set of
documentation defects; it failed closed with `PENDING_CORRECTION`. **Round 2 (`e32673e`)** verified
most corrections but found A-01 only partially fixed, A-04/A-05 claimed but not applied, and A-06
partially fixed; it kept `PENDING_CORRECTION`. **Round 3 (`7f31db8`)** closes all four residuals and
awards the internal-scope verdict.

At `7f31db8`:

- the dossier's §1 key-date table (50 rows) and §3 transposition table now carry the governed
  verification status for every shared source, no shared source carries two statuses, and the §0
  membership arithmetic is corrected (50 research records = 46 shared + 4 considered-only; governed
  48 = 46 shared + 2 compilation additions);
- D19 §3.3 now states the reduced bundle-assessment schema explicitly, so the data contract and
  the 84 bundle assessments agree;
- D03 reproduces all 210 governed rationale/status rows verbatim, including the two BATTERIES rows;
- `data/mc15-handoff-inputs.json` routes now match the real unprefixed registry paths.

The gate is **54/54**, the committed adversarial suite **41/41**, `format:check` **PASS**, and
**5/5 fresh** auditor mutations are detected. The three commits in `f80c0f0..7f31db8` contain no
merge commit and touch no `src/`, `public/`, `deploy/` or `.github/` file. The branch is pushed
(remote head = `7f31db8`) and draft PR #21 is open against the MC-13 branch with `mergedAt: null`.

**Award:** `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE` for the internal legal/commercial governance
scope, with programme status **`PARTIAL`**: external legal clearance, certification, insurance,
data licences, prices and all external decisions remain `NOT_GRANTED`/`PENDING`. No sale,
certification, legal clearance, insurance cover, licence, price approval, commercial claim,
publication, merge or deployment is authorised. `finalRecordCommit` stays `null` until the Lead
records this award.

## 1. Scope and method

Audited candidates: `6fb22850aa7acdcea3e4959024d93ea5adc54842` (round 1),
`e32673ea26fa1b115e57b02b9755d3149c3db1ea` (round 2) and
`7f31db83797f9423bbd9d0b60764f8db22fe8bbf` (round 3, the awarded candidate), on
`feature/marea-mc14-legal-commercial-risk-claims-policy`, diffed against
`f80c0f02ac14803e9e1539393abbb225d7f49e16`.

Method, in order:

1. Read `AGENTS.md` and `docs/marea/execution/AGENT-OPERATING-MODEL.md` (roles, evidence
   standard, review rules, milestone status rules).
2. Verified Git ancestry, branch state, commit count, merge-commit absence, remote head and PR
   state, and changed-file scope from Git/GitHub themselves, not from the delivery summary.
3. Read the validator and its suite in full. The only validator change across the three commits
   is MC14-050 accepting a `PENDING`/`PENDING_CORRECTION` review as the designed pre-record state;
   the auditor reviewed that diff and wrote mutation N7 to confirm a recorded false award with an
   open MAJOR finding is still rejected.
4. Loaded every machine-readable dataset through the committed validator's JSON reader only, and
   recomputed counts, references and document-to-data reconciliation with auditor-written loops.
   Every changed data file was semantically diffed against the previous candidate to prove that
   the changes are limited to the claimed corrections (JSON re-formatting ignored).
5. Cross-checked each delivered document against its governed dataset, including verbatim table
   rows and rationale text; verified all 34 website findings against the cited `file:line`
   ranges.
6. Re-fetched the four currency-critical external positions (CRA, PLD corrigendum, RED
   delegated-repeal, RD 188/2016 art 9.8) from official/EUR-Lex sources as an independent check.
7. Wrote 19 independent negative controls in round 1, 6 in round 2 and 5 fresh ones in round 3
   (in-memory clones, no repository write) and confirmed each intended validator check fails.
8. Did not run the Angular build, Playwright, backup or npm-audit gates (they write artifacts or
   require network/browser and are outside the auditor's write scope); `format:check` was run
   (read-only). No credential, browser, deployment or commercial channel was used.

No implementation file was modified by the auditor. The only writes are this document and
`data/review-findings.json`.

## 2. Git ancestry, scope and remote state

| Check | Command | Result |
|---|---|---|
| Ancestry | `git merge-base --is-ancestor f80c0f0 7f31db8` | exit 0 |
| Branch HEAD | `git rev-parse HEAD` | `7f31db8…` (the awarded candidate) |
| Commits in range | `git log f80c0f0..7f31db8` | 3: `6fb2285`, `e32673e`, `7f31db8` |
| Merge commits | `git rev-list --merges f80c0f0..7f31db8` | none |
| Branch containment | `git branch --contains 7f31db8` | only `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Merged to `main`? | `git merge-base --is-ancestor 7f31db8 main` | exit 1 — not merged |
| Total changed paths | `git diff --name-only f80c0f0 7f31db8` | 45 paths: the MC-14 package, `docs/marea/execution/DECISION-LOG.md` (record artefact), `package.json` and the two MC-14 scripts |
| Forbidden prefixes | filter of `^(src/|public/|deploy/|\.github/)` over the full diff | no match |
| Remote head | `git ls-remote origin feature/marea-mc14-legal-commercial-risk-claims-policy` | `7f31db8…` — branch pushed, remote = local Head |
| Draft PR | `gh pr view 21 --json …` | #21 OPEN, draft, base `feature/marea-mc13-financial-model-cashflow-break-even`, head `7f31db8`, `mergedAt: null` |
| Worktree | `git status --porcelain --untracked-files=all` | only an uncommitted `docs/marea/execution/DECISION-LOG.md` change (Lead record work, not the auditor's) |

The correction commits are normal commits on the same branch (no merge) and touch no `src/`,
`public/`, `deploy/`, `.github/`, `AGENTS.md`, predecessor milestone data, route, price, metadata,
checkout or product file. `package.json` from round 1 only added the two `test:legal-commercial*`
scripts and Prettier file lists; no dependency changed. The website remains unmodified
(`websiteModified = false`, `readOnly = true`, `publicationAuthorized = false`), the manifest keeps
`MERGED = false`/`DEPLOYED = false`, no deployment occurred, and PR #21 is a draft with
`mergedAt: null`.

## 3. Data/document reconciliation and validator/test outputs

### 3.1 Commands executed at `7f31db8`

| Command | Result |
|---|---|
| `npm run test:legal-commercial` | **54/54 checks passed**, exit 0 |
| `npm run test:legal-commercial:unit` | **41/41 tests passed**, exit 0 |
| `npm run format:check` | All matched files use Prettier code style, exit 0 |
| `node --test scripts/check-marea-legal-commercial.test.mjs` (plain) | exit 1, `EPERM` spawn — the documented Windows DSH sandbox child-process restriction; the packaged script already uses `--test-isolation=none` |
| Auditor reconciliation loops (all three rounds) | see §3.2 and §3.3 |
| Fresh auditor mutation harness (round 3) | 5/5 independent mutations detected (N7–N11, §9.3) |

Inherited website gates (`test:i18n`, `test:commerce`, `test:seo`, `test:brand`) and the inherited
MAREA validators (products 52/52, bundles 35/35, market 40/40, customer-research 62/62,
customer-recovery 32/32, hardware 54/54, economics 49/49, financial 77/77) were run at `6fb2285`
and all passed; the subsequent commits change only MC-14 documents/data and the MC-14 validator,
which those gates do not read. Inherited unit suites hit the same sandbox `EPERM` without
`--test-isolation=none`; only MC-14's own suite is configured for this environment. The build,
Playwright E2E, backup and npm-audit results in D22 are Lead-reported and were not independently
re-run by the auditor (they write artifacts or need network/browser); `format:check` was
independently re-run and passes.

### 3.2 Manifest evidence counts — recomputed at `7f31db8`, 23/23 match

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
| websiteFindings | 34 | 34 (6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL; 34/34 observedText verbatim) |
| releaseGates / releaseDocuments | 13 / 24 | 13 / 24 |
| externalDecisions | 20 | 20 (19 PENDING, 1 OUT_OF_SCOPE_FOR_MC14) |
| formalQuotations / executedContracts / contacts | 0 | 0 (no fabricated contact) |

### 3.3 Document-to-data reconciliation at `7f31db8`

| Document | Check | Result |
|---|---|---|
| D02 source register | 48/48 source rows (verification status) and 51/51 requirement rows match `legal-sources.json` | match |
| CSV research register | 48 rows; ids = governed ids; 0 status/URL/retrieval-date mismatches; status distribution 4 / 32 / 2 / 6 / 4 | match |
| Dossier §1 key-date table | 50 rows; 0 verification-status mismatches for shared sources; governed vocabulary used | match |
| Dossier §2 | 50 per-source blocks (46 governed + 4 considered-only `NOT_IN_GOVERNED_REGISTER`); 0 status mismatches | match |
| Dossier §3 transposition table | 0 `RE_VERIFIED` labels for shared sources; CRA line carries the governed status; the only `RE_VERIFIED` text left is the historical renaming note at line 35 | match |
| Dossier §0 membership | 50 research records = 46 shared + 4 considered-only; governed 48 = 46 shared + 2 compilation additions (DB-96-9, AEMET) | match |
| D05 risk register | 95/95 risk rows match (title, severity, status, owner, gate, evidence count) | match |
| D16 release gates | 13/13 gate rows and 24/24 document rows match | match |
| D17 external decisions | 20/20 decision rows match (status, owner, due date, blocking risks) | match |
| D14 bilingual catalogue | 42/42 claim ids; every ES/EN pair appears verbatim; class/status/channel columns match; 7 internal / 35 public-prohibited header | match |
| D03 applicability matrix | 210/210 rationale+status rows match the governed data verbatim (including WEATHER/FLEET BATTERIES) | match |
| D19 data contract | §3.3 declares the reduced bundle-assessment schema explicitly and the 84 bundle assessments match it | match |
| D08 / D09 / D10 / D12 | 16 obligations + 8 templates / 14 purposes / 14 requirements + 12 controls / 13 scenarios | match |
| D04 economic operators | 11 role rows and 9 scenario rows; no role asserted as held | match |
| D15 website inventory | 34/34 findings verbatim, `NOT_REMEDIATED`, `publicChangeAuthorized = false`; route labels match the registry | match |
| `mc15-handoff-inputs.json` routes | /tienda, /tecnologia, /aviso-legal, /privacidad, /cookies, /carrito, /sobre-nosotros — all real registry paths | match |
| Reference integrity | auditor sweep of every known `*Id`/`*Ids` foreign-key field | 0 unresolved |
| Manifest counts | 23/23 recomputed counts match | match |

The repeated-count claims inside the documents (D01 "48/51/95/134/42/30/34/13/24/20", D05
"CRITICAL=29, HIGH=62, MEDIUM=4", D03 collated per-family A/C/N/U counts, D16 "13 gates, 24
documents, 0 executed", D14 "42 pairs (7 internal, 35 public-prohibited)") all recompute
correctly. There is no remaining reconciliation mismatch.

## 4. Source and date verification

### 4.1 Mandatory currency checks — all confirmed against official sources

| Position | Package value | Independent check |
|---|---|---|
| CRA 2024/2847 | publication 2024-11-20, in force 2024-12-10, reporting from 2026-09-11, main obligations 2027-12-11, support period ≥ 5 years (Art 13(8); updates Art 13(9)) | Confirmed: Art 71 applies the Regulation from 2027-12-11; Art 14 reporting from 2026-09-11; Art 13(8) five-year floor |
| PLD 2024/2853 | publication 2024-11-18, entry into force 2024-12-08, transposition 2026-12-09; May 2026 corrigendum OJ L 2026/90364 (2026-05-07, CELEX 32024L2853R(01)) changes Art 2(1) so it applies to products placed on the market after 2026-12-08 | Confirmed: corrigendum text replaces Article 2(1) with "after 8 December 2026" |
| RED DelReg 2022/30 | applied from 2025-08-01 | Confirmed; the stale `2025-02-01` was corrected (A-02) |
| DelReg 2026/339 | adopted 2026-02-16, OJ 2026-04-29, in force 2026-05-19, repeals 2022/30 with effect from 2027-12-11 | Confirmed: "Delegated Regulation (EU) 2022/30 is repealed with effect from 11 December 2027" |
| GPSR 2023/988 | applies 2024-12-13; Art 19 online-offer information duties | Confirmed |
| RD 188/2016 Art 9(8) | Spanish-language instructions and safety information for the Spanish market | Confirmed: "Las instrucciones e información de seguridad deberán estar al menos en castellano, si se pone el equipo en el mercado español" |
| Consumer floor | 3-year Spanish legal guarantee, 24-month presumption, 14-day withdrawal; EU floor 2 years | Confirmed and correctly separated from the EU minimum |
| SCA RTS 2018/389 | entry into force 2018-03-14; application 2019-09-14 | Confirmed (A-03) |

### 4.2 Register quality

All 48 governed sources carry `sourceId`, instrument, `officialUrl` (EUR-Lex ELI, BOE, European
Commission, AEPD, MITECO, IHM, AEMET, NMEA, EUIPO, OEPM), jurisdiction (EU 31 / ES 14 /
international 3), `retrievedOn` 2026-11-02 and a `verificationStatus` from the declared
vocabulary. Requirements are complete (51/51): every requirement cites an existing source with a
retrieval date and an owner. No requirement is marked `COMPLIANT_VERIFIED` (0/51); no
`APPLICABLE` determination relies only on a `NOT_RETRIEVED`/`INACCESSIBLE` source; no
`NOT_APPLICABLE` determination relies only on a weak source (0/56). The one negative
determination that rested solely on a `NOT_RETRIEVED` source is `UNDETERMINED` and the D02 rule
is qualified (A-09).

### 4.3 Provenance reconciliation (A-01, closed)

The governed register is authoritative: 48 sources, one status per source, mirrored exactly by
the CSV (48 rows) and by dossier §1/§2/§3 and D02. The research layer's 50 records are explained
by the documented membership rule: 46 shared with the governed register plus 4 considered-only
records marked `NOT_IN_GOVERNED_REGISTER`; the governed register adds 2 compilation sources
(`SRC-EU-DB-96-9`, `SRC-ES-AEMET-TERMS`). No source carries two verification statuses.

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
per product. The WEEE wording ("falls to be registered separately") and the two BATTERIES
rationales now match the governed data (A-17, A-05 closed), and the bundle-assessment schema gap
is documented in D19 (A-04 closed).

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
  risk and every risk `predecessorBlockerIds` reference resolves to a mapped record.
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
transition (2022/30 repealed from 2027-12-11) is recorded correctly.

## 8. Consumer-rights review

D08 and `consumer-rights.json` are consistent: 3-year Spanish legal guarantee, 24-month
presumption of non-conformity, EU 2-year floor, 14-day withdrawal, precontractual information,
unfair-terms control, digital content/services remedies, and the rule that a commercial warranty
may add to but not replace, restrict or shorten legal rights
(`commercialWarrantyReplacesLegalGuarantee = false`, `CONS-OB-04`). The 3% returns allowance is
labelled `ILLUSTRATIVE_ASSUMPTION_NOT_MEASURED` and D08 §2 explains it is not a measured return
rate or reliability evidence. B2C and B2B are separated (`sameTemplateJustified = false`).
Consumer terms, withdrawal form and subscription terms are all `DRAFT_REQUIRED`/not approved;
`GATE-CONSUMER-TERMS` is `BLOCKED`.

## 9. Claims enforcement and negative tests

### 9.1 Policy state

42 bilingual claim pairs (4 A / 3 C / 11 P / 24 X), 30 mandatory prohibited categories, valid
classes and statuses. **0 claims are `PUBLIC_AUTHORIZED`**; **7 are `INTERNAL_ONLY`** (4 A plus
the three C claims CLM-019/039/040) and **35 are `PUBLIC_PROHIBITED`**. `publicationAuthorization
= NONE`; `MAREA_PUBLIC_USE = NO_GO`; `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; no `®`/`™`
appears in any non-prohibited claim (the only `®` is CLM-008, an X-class catalogue example of a
prohibited statement, with `registeredSymbolAllowed = false`). The inherited MC-03 conflict is
documented and resolved in favour of the stricter rule. All 42 claims have both locales, and
ES/EN numeric tokens match (`24,7`/`24.7`, `1.000`/`1,000` are correctly localised). Every claim
has an approver role, release gate, legal sources and risks that resolve. The policy workflow
step 4 and the data are consistent.

### 9.2 Validator enforcement

The validator enforces class/status vocabularies, prohibitions on P/X publication, evidence
requirements, publication-authorisation `NONE`, frozen flags, trademark/IP statuses, PILOT
blocking, AIS receive-only, FLEET no-default-hardware, price/financial/insurance prohibitions,
consumer rights, MC-13 unknown amounts, the 134-record mapping, the brand conflict, predecessor
verdicts, website immutability, MC-15 non-start, gate/document non-certification, external
decisions, review-state consistency and publication/trademark coexistence. The suite's 40
negative controls plus the positive control pass 41/41.

### 9.3 Independent negative tests (auditor-written; 19/19 + 6/6 + 5/5 detected)

| # | Mutation | Intended check | Detected |
|---|---|---|---|
| M01–M19 | round-1 controls: invented CE/NMEA certification, PILOT approval, AIS transmission, price authorisation, fabricated insurance, A-class public claim vs brand NO-GO, ES/EN number contradiction, gate/risk closure without evidence, source-IP clearance, unknown-to-zero, wrong date, missing document, predecessor deletion, false DPIA, remediated website finding, review-verdict inconsistency, unauthorised publication | MC14-021/018/023/025/027/052/015/020/029/054/002/031/053/035/050/017 | 19/19 |
| N1–N6 | round-2 controls: pre-record PASS, class C conditional-public without evidence, unreasoned bundle NOT_APPLICABLE, deleted governed source, publication authorisation without a claim, invented NMEA certification | MC14-050/042/010/005/017/021 | 6/6 |
| **N7** | **recorded PASS award while a MAJOR finding is OPEN (manifest + review set to the award)** | MC14-050 | **yes** (also MC14-002 without D23) |
| **N8** | **class C claim `PUBLIC_AUTHORIZED` with synthetic evidence** | MC14-017 | **yes** (also 019/041/052) |
| **N9** | **invented source-IP clearance / rights granted** | MC14-020 | **yes** |
| **N10** | **class C claim `PUBLIC_CONDITIONAL` without evidence** | MC14-042 | **yes** |
| **N11** | **critical risk without required evidence** | MC14-008 | **yes** |

The mutations are the auditor's own; the committed test fixtures were not reused. M01–M19 were
run at `6fb2285`, N1–N6 at `e32673e`, N7–N11 at `7f31db8`. The detection rate confirms the
controls are not merely self-consistent with the implementation's own tests.

## 10. Findings

Full evidence, correction and re-verification steps are in `data/review-findings.json`.
Status at the awarded candidate:

| ID | Class | Status | Finding |
|---|---|---|---|
| A-01 | MAJOR | CLOSED | Research provenance: dossier §1/§3 now carry the governed status for all shared sources; §0 membership arithmetic corrected |
| A-02 | MINOR | CLOSED | Stale `2025-02-01` RED date corrected to `2025-08-01` |
| A-03 | MINOR | CLOSED | SCA RTS entry into force corrected to `2018-03-14` |
| A-04 | MINOR | CLOSED | D19 §3.3 now states the reduced bundle-assessment schema explicitly |
| A-05 | MINOR | CLOSED | D03 now reproduces the governed WEATHER/FLEET BATTERIES rationales (210/210 rows match) |
| A-06 | MINOR | CLOSED | MC-15 handoff routes now match the registry (no `/legal/*` or `/tienda/checkout`) |
| A-07 | MINOR | CLOSED | D20 gate-result statement reproducible (54/54 frozen; designed 53/54 pre-record) |
| A-08 | MINOR | CLOSED | Class C claims `INTERNAL_ONLY`; summaries 7 internal / 35 public-prohibited |
| A-09 | MINOR | CLOSED | `REQ-ES-LGP-01` `UNDETERMINED`; D02 rule qualified |
| A-10 | MINOR | CLOSED | "recital 580" replaced by Article 71 |
| A-11 | INFORMATIONAL | CLOSED | CI manual-gate position disclosed in D20 §6 |
| A-12 | INFORMATIONAL | OPEN (by design) | Validator coverage gaps (owner-role vocabulary, decision risk refs, document-level false-PASS check) — accepted limitation |
| A-13 | INFORMATIONAL | CLOSED | `pilotCoverage` typo fixed |
| A-14 | INFORMATIONAL | OPEN (by design) | MC-11/MC-12 inherited statuses via `AS_RECORDED_IN_PREDECESSOR` sentinel — documented |
| A-15 | INFORMATIONAL | OPEN (record duty) | Record-commit artefacts pending (manifest, D23, registry row 14, decision log, finalRecordCommit) — Lead duty, does not block the internal award |
| A-16 | INFORMATIONAL | OPEN (snapshot) | Remote state now partially verified: branch pushed at `7f31db8`, draft PR #21 open, not merged |
| A-17 | INFORMATIONAL | CLOSED | WEEE wording "falls to be registered separately" in data and D03 |

Counts: **0 BLOCKING, 0 open MAJOR, 0 open MINOR; 4 INFORMATIONAL open by design; 13 closed.**
No blocking or major defect remains; the internal-scope award is issued.

### Record-commit reconciliation note

Writing this award changes the pre-record gate state: with the manifest still `PENDING` and the
review verdict now `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`, the unmodified validator reports
**53/54** with only `MC14-050` failing — the designed pre-record state. The Lead's record commit
must reconcile the manifest and may choose either path (both verified/simulated by the auditor):

- **Path A (works with the frozen validator):** set `manifest.review.status`,
  `statusBlock.MC14_VERDICT` and `statusBlock.MC14_INDEPENDENT_REVIEW` to
  `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`, set `MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE` to the same,
  set `PR_CREATED = true`, `review.frozenCandidateCommit = 7f31db8`; add D23. In-memory
  simulation with D23 present: **54/54**.
- **Path B (MC-13 mirror, requires amending MC14-050):** keep `statusBlock.MC14_VERDICT =
  PARTIAL` and record `MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE = MC14_INDEPENDENT_REVIEW =
  PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`, with `review.status = PARTIAL`; MC14-050 must then
  compare `MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE` with the review verdict. With the frozen
  MC14-050, Path B reports **53/54** (`MC14-050`, plus `MC14-002` until D23 exists).

Also required in the record commit: add D23 `MC-14-DELIVERY.md`; update
`MASTER-PROMPT-REGISTRY.md` row 14 and the decision log (D-058…D-061 are staged but uncommitted at
`7f31db8`); update `MC14-EXECUTIVE-REPORT-ES.md`'s commit list to include `7f31db8` (it currently
stops at `e32673e`); and set `finalRecordCommit`.

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
  full 48-source corpus, so the audit verifies the register's internal provenance and its
  reconciliation rather than the original retrieval of every source.
- The Angular build, Playwright E2E, backup/restore, npm audit and performance gates were not run
  by the auditor (they write artifacts or need network/browser and are outside the auditor's write
  scope); D22's rows for build/E2E/audit are Lead-reported, while `format:check` was independently
  re-run and passes. The inherited read-only gates were run and pass at `6fb2285`, and the later
  commits do not touch their inputs.
- The award is internal-scope only. It does not constitute legal clearance, a conformity
  assessment, an insurance or licence confirmation, a price approval or a publication
  authorisation, and the programme verdict stays PARTIAL.

## 12. Final verdict and authorisation statement

**Verdict: `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`.** The independent audit of
`7f31db83797f9423bbd9d0b60764f8db22fe8bbf` finds the MC-14 internal legal/commercial governance
package complete, internally reconciled and gated: Git ancestry and scope are correct (3 commits,
0 merges, no `src/`/`public/`/`deploy/`/`.github/` change, branch pushed, draft PR #21 open and
unmerged); the legal source register reconciles across CSV, dossier, D02 and the governed JSON
with one status per source; the applicability matrix (9×14 + 6×14), predecessor mapping
(134 records, 0 closed/deleted, 10 MC-13 dependencies), economic-operator, GDPR/CRA,
consumer-rights, claims-enforcement, release-gate and machine-data layers are consistent; the
gate is 54/54, the suite 41/41, `format:check` passes and the auditor's fresh mutations are all
detected. **Programme status: `PARTIAL`** — the internal governance scope passes while external
legal clearance is `NOT_GRANTED` by definition (mirroring MC-13's internal PASS / programme
PARTIAL). The four remaining INFORMATIONAL items are accepted limitations and record-commit
duties; none is a defect.

No sign-off of external legal clearance is given or implied. **No sale, certification, legal
clearance, insurance cover, licence, price approval, commercial claim, publication, merge or
deployment is authorised by this review record.** MAREA remains an internal proposed brand
(`MAREA_PUBLIC_USE = NO_GO`, `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`), every product remains
`NOT_FOR_SALE`, `PRICE_APPROVED = NONE`, no public claim is authorised, the website is
unmodified, and MC-15 has not started (`MC15_STARTED = false`). `finalRecordCommit` remains null
in the machine-readable record until the Lead records this award.

## 13. Re-verification log — round 2, correction commit `e32673e`

**Trigger:** Lead corrections A-01…A-10 plus A-11 disclosure, A-13 typo and A-17 wording in
`e32673ea26fa1b115e57b02b9755d3149c3db1ea`, on top of the frozen candidate `6fb2285`.

**Verified applied and correct:** A-02 (`REQ-DELREG-01` = `2025-08-01`; only the correction note
retains `2025-02-01`); A-03 (SCA RTS `2018-03-14`; no `2018-04-02`); A-07 (D20 reproducible 54/54
and designed 53/54 pre-record state); A-08 (CLM-019/039/040 `INTERNAL_ONLY`; summaries 7 internal
/ 35 public-prohibited; D14 aligned); A-09 (`REQ-ES-LGP-01` `UNDETERMINED`; D02 rule qualified);
A-10 (Article 71; no "recital 580"); A-11 (D20 §6 CI disclosure); A-13 (`pilotCoverage`); A-17
(WEEE "falls to be registered separately"). Provenance layer: CSV 48 rows with 0 mismatches, D02
48/48 + 51/51, dossier §2 50 blocks with 0 mismatches. Gate 54/54, suite 41/41, 6/6 fresh
mutations at `e32673e`.

**Verified not complete at that commit (fixed in `7f31db8`):** dossier §1 (14 rows) and §3
(6 rows) still labelled governed-CONSUMED sources `RE_VERIFIED` and §0 arithmetic was
inconsistent (A-01); D19 was unmodified (A-04); D03 battery rows were shortened (A-05); four
MC-15 handoff routes were non-existent (A-06). The verdict remained `PENDING_CORRECTION`.

## 14. Re-verification log — round 3, residual-fix commit `7f31db8` (award)

**Trigger:** residual fixes in `7f31db83797f9423bbd9d0b60764f8db22fe8bbf`, on top of `e32673e`.

**Verified applied and correct:**

- A-01: dossier §1 key-date table 50 rows with 0 verification-status mismatches for shared
  sources; §3 0 `RE_VERIFIED` labels for shared sources (CRA line now
  `CONSUMED_FROM_PREDECESSOR_EVIDENCE`); the only `RE_VERIFIED` text is the historical renaming
  note at line 35; §0 corrected to 50 = 46 shared + 4 considered-only and governed 48 = 46 shared
  + 2 compilation additions. CLOSED.
- A-04: D19 §3.3 explicitly declares the reduced bundle schema
  (`instrumentId`/`status`/`rationale`/`condition`, inheriting `legalSourceIds`/`requirementIds`/
  `evidenceRequired` from the included family assessments) and the 84 bundle assessments match
  it. CLOSED.
- A-05: D03 WEATHER/BATTERIES and FLEET/BATTERIES reproduce the governed rationales verbatim;
  210/210 rationale/status rows match. CLOSED.
- A-06: `data/mc15-handoff-inputs.json` routes are /tienda, /tecnologia, /aviso-legal,
  /privacidad, /cookies, /carrito, /sobre-nosotros; no `/legal/*` or `/tienda/checkout`. CLOSED.
- Re-check of previously closed items and the whole package: 0 unresolved foreign keys; manifest
  23/23 counts; D02 51/51 + 48/48; D05 95/95; D16 13+24; D17 20/20; D14 42/42; 34/34 website
  observedText verbatim; 42 claims, 0 numeric-parity failures, 0 public authorised; gate 54/54,
  suite 41/41, format:check PASS, fresh mutations N7–N11 5/5.
- Semantic diffs of every changed data file against `e32673e` show only the claimed corrections
  (JSON re-formatting ignored by parsed-object comparison).
- Git/remote: 3 commits from base, 0 merges, 45 changed paths all inside the package +
  `DECISION-LOG.md` (record artefact) + `package.json` + the two scripts; no forbidden prefix;
  branch pushed and remote head = `7f31db8`; draft PR #21 OPEN against the MC-13 branch,
  `mergedAt: null`; `main` does not contain the candidate.
- Record-commit state simulated in memory: with D23 present and the manifest review/status block
  reconciled to the internal award (Path A), the gate returns 54/54; keeping
  `MC14_VERDICT = PARTIAL` (Path B, MC-13 mirror) requires the MC14-050 recorded-state amendment
  described in §10.

**Award:** `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`, programme status `PARTIAL`,
`finalRecordCommit` null (Lead to record).
