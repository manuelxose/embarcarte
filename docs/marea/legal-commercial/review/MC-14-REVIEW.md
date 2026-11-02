# MC-14 — Independent compliance audit (D21)

| Field | Value |
|---|---|
| Deliverable | D21 `review/MC-14-REVIEW.md` |
| Milestone | MC-14/36 — Legal/commercial risk register, regulatory compliance, consumer rights and commercial claims governance |
| Date | 2026-11-02 |
| Reviewer | Agent G — Independent Compliance Auditor (did not author the implementation) |
| Frozen commit | `6fb22850aa7acdcea3e4959024d93ea5adc54842` (`feat(mc14): legal/commercial governance, applicability, risk register, claims policy and validation`) |
| Base commit | `f80c0f02ac14803e9e1539393abbb225d7f49e16` (MC-13 record commit) |
| Branch | `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Machine-readable record | `data/review-findings.json` (`MAREA-MC14-REVIEW-FINDINGS`) |
| Verdict | **PENDING_CORRECTION** (interim) — 0 BLOCKING, 1 MAJOR, 9 MINOR, 7 INFORMATIONAL open |
| Expected verdict after correction | `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`, programme status `PARTIAL` (internal PASS, external clearance `NOT_GRANTED`), mirroring MC-13 |
| Nature | Internal governance audit. Not a legal opinion, certification, insurance or licence review, clearance to sell or publication authorisation |

## 0. Executive summary

The frozen implementation is technically solid and, in almost every dimension I could
machine-check or manually challenge, it matches its own documentation. The validator passes
54/54 at the freeze; the committed adversarial suite passes 41/41; nineteen independent
auditor-authored mutations are all detected; the changed-file scope is exactly the MC-14
package with no `src/`, `public/`, `.github/` or `deploy/` change; the 9×14 + 6×14 applicability
matrix is reasoned, not blanket-applied; the 134 inherited blockers are all mapped with 0 closed
and 0 deleted; the 10 MC-13 handoff dependencies are consumed exactly; claims enforcement is
real (0 public claims authorised, 42 bilingual pairs, 30 prohibited categories); external
clearance, certification, insurance, contact and publication are all honestly recorded as
absent.

However, the milestone makes contradictory factual claims about its own legal research
provenance. The research register (`research/mc14-legal-sources.csv`) and the research dossier
report **50 sources, 14 re-verified this session and 5 inaccessible**, while the governed
register (`data/legal-sources.json`) and deliverable D02 report **48 sources, 4 verified this
session and 4 inaccessible**; twelve sources carry mutually exclusive verification statuses
across the two layers (for example the CRA is simultaneously "re-verified this session" and
"consumed from predecessor evidence"), and a stale `2025-02-01` RED delegated-regulation date
that the dossier itself says must be corrected survives in the governed requirement. No legal
conclusion changes — everything remains unverified, non-compliant or unknown — but in a legal
evidence package the provenance trail must be true before an internal-scope PASS can be
awarded. That is the single MAJOR finding (A-01). It is closable in one reconciliation pass
without new legal research. The remaining findings are documentation/schema corrections that do
not change any conclusion.

I therefore fail closed: **PENDING_CORRECTION** now, with the expected award after correction
being `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE` and programme status `PARTIAL`. The internal
governance scope is close to awardable; external legal clearance is `NOT_GRANTED` and is not
required for that internal award.

## 1. Scope and method

Audited commit: `6fb22850aa7acdcea3e4959024d93ea5adc54842` on
`feature/marea-mc14-legal-commercial-risk-claims-policy`, diffed against
`f80c0f02ac14803e9e1539393abbb225d7f49e16`.

Method, in order:

1. Read `AGENTS.md` and `docs/marea/execution/AGENT-OPERATING-MODEL.md` (roles, evidence
   standard, review rules, milestone status rules).
2. Verified Git ancestry, branch state, commit count, merge-commit absence and changed-file
   scope from Git itself, not from the delivery summary.
3. Read the validator and its suite in full, then ran both package commands and the inherited
   gates.
4. Loaded every machine-readable dataset through the committed validator's JSON reader only,
   and recomputed counts, references and document-to-data reconciliation with
   auditor-written loops.
5. Cross-checked each delivered document against its governed dataset, including verbatim
   table rows and rationale text; verified all 34 website findings against the cited
   `file:line` ranges.
6. Re-fetched the four currency-critical external positions (CRA, PLD corrigendum, RED
   delegated-repeal, RD 188/2016 art 9.8) from official/EUR-Lex sources as an independent
   check on the register's claims.
7. Wrote nineteen independent negative controls in memory (no repository write) and confirmed
   each intended validator check fails.
8. Did not run the Angular build, Playwright or the backup gate (long/side-effectful), and did
   not use any credential, browser, deployment or commercial channel.

No implementation file was modified by the auditor. The only writes are this document and
`data/review-findings.json`.

## 2. Git ancestry and changed-file scope

| Check | Command | Result |
|---|---|---|
| Ancestry | `git merge-base --is-ancestor f80c0f0 6fb2285` | exit 0 — MC-13 record commit is an ancestor |
| Branch HEAD | `git rev-parse HEAD` | `6fb2285…` (the frozen candidate) |
| Worktree | `git status --porcelain` | clean before this review record |
| Merge commits in range | `git rev-list --merges f80c0f0..6fb2285` | none |
| Commits in range | `git rev-list --count f80c0f0..6fb2285` | 1 |
| Branch containment | `git branch --contains 6fb2285` | only `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Merged to `main`? | `git merge-base --is-ancestor 6fb2285 main` | exit 1 — not merged |
| Changed files | `git diff --name-only f80c0f0 6fb2285` | 43 paths, all inside the MC-14 package, its two scripts and `package.json` |

The 43 changed paths are: 20 MC-14 documents under `docs/marea/legal-commercial/`, 18 data
JSON files under `docs/marea/legal-commercial/data/`, 2 research files under
`docs/marea/legal-commercial/research/`, `scripts/check-marea-legal-commercial.mjs`,
`scripts/check-marea-legal-commercial.test.mjs` and `package.json`. The `package.json` diff only
adds the two new scripts (`test:legal-commercial`, `test:legal-commercial:unit`) and appends
both new files to the existing Prettier lists; no dependency changed. `git diff --name-status`
shows 42 additions and one modification, no deletions.

**Not changed:** `src/`, `public/`, `deploy/`, `.github/`, `AGENTS.md`, the MC-13/MC-12/MC-11
predecessor data and documents, and every public route, price, metadata, checkout or product
file. The website is therefore unmodified by MC-14, consistent with D15 and with
`manifest.websiteModified = false`. No deployment occurred (`DEPLOYED = false`, no deploy file
touched) and no merge occurred. The remote server state could not be queried without a network
Git operation; locally there is no `feature/marea-mc14-*` remote-tracking branch, so no MC-14
branch is known to have been pushed from this clone.

## 3. Data/document reconciliation and validator/test outputs

### 3.1 Commands executed

| Command | Result |
|---|---|
| `npm run test:legal-commercial` (at the freeze, before this record) | **54/54 checks passed**, exit 0 |
| `npm run test:legal-commercial:unit` | **41/41 tests passed**, exit 0 (also after this record was written) |
| `npm run test:legal-commercial` (after this record was written) | 53/54, exit 1, only `MC14-050` fails `[PENDING_CORRECTION]` — the designed pre-record state (manifest review still `PENDING`); see §10 |
| `node --test scripts/check-marea-legal-commercial.test.mjs` (plain) | exit 1, `EPERM` spawn — the documented Windows DSH sandbox child-process restriction. The package script already runs `node --test --test-isolation=none`, so no manual substitution was needed; the `npm run` result is authoritative. |
| `npm run test:i18n` / `test:commerce` / `test:seo` / `test:brand` | all exit 0 (SEO: 101 sitemap URLs; brand: 21/21) |
| `npm run test:products` / `test:bundles` / `test:market` / `test:customer-research` / `test:customer-recovery` / `test:hardware` / `test:economics` / `test:financial` | all exit 0 — 52/52, 35/35, 40/40, 62/62, 32/32, 54/54, 49/49, 77/77 inherited checks pass at the frozen commit |
| Auditor reconciliation loops | see §3.2 and §3.3 |
| Auditor mutation harness | 19/19 independent mutations detected (see §9.3) |

Inherited unit suites (`node --test scripts/check-marea-*.test.mjs`) hit the same sandbox
`EPERM` without `--test-isolation=none`; only MC-14's own suite is configured for this
environment. That is an environment limitation, not a regression introduced by MC-14.

### 3.2 Manifest evidence counts — recomputed, 23/23 match

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
| claims / prohibitedClaimCategories | 42 / 30 | 42 (A4/C3/P11/X24) / 30 |
| websiteFindings | 34 | 34 (6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL) |
| releaseGates / releaseDocuments | 13 / 24 | 13 / 24 |
| externalDecisions | 20 | 20 (19 PENDING, 1 OUT_OF_SCOPE_FOR_MC14) |
| formalQuotations / executedContracts / contacts | 0 | 0 (no fabricated contact) |

### 3.3 Document-to-data reconciliation

| Document | Check | Result |
|---|---|---|
| D02 source register | 51/51 requirement rows match `legal-sources.json` (provision, obligation, sources, status, gate) | match |
| D05 risk register | 95/95 risk rows match `risk-register.json` (title, severity, status, owner, gate, evidence count); domain counts 11/10/15/6/10/7/7/5/13/7/4 sum to 95 | match |
| D16 release gates | 13/13 gate rows and 24/24 document rows match `release-evidence-gates.json` | match |
| D17 external decisions | 20/20 decision rows match (status, owner, due date, blocking risks) | match |
| D14 bilingual catalogue | 42/42 claim ids present; every ES and EN pair appears verbatim and the class/status/channel columns match the JSON | match |
| D03 applicability matrix | 208/210 rationale+status rows match verbatim; 2 rows are shortened (A-05) | mismatch ×2 |
| D08 / D09 / D10 / D12 | 16 obligations + 8 templates / 14 purposes / 14 requirements + 12 controls / 13 scenarios — counts and statuses match | match |
| D04 economic operators | 11 role rows and 9 scenario rows; the document uses human labels rather than `roleId` values (traceable through D19), no role is asserted as held | match |
| D15 website inventory | all 34 findings: cited file exists, line range valid, `observedText` is a verbatim substring of the cited lines, `status = NOT_REMEDIATED` | match |
| Reference integrity | auditor sweep of every known `*Id`/`*Ids` foreign-key field (including paths the validator does not check, e.g. website-finding risk ids, external-decision blocking risks, scenario product families, predecessor blocker ids) | 0 unresolved |
| Manifest counts | 23/23 recomputed counts match | match |

Two reconciliation defects are recorded: the source-register provenance contradiction (A-01) and
the two shortened D03 rationales (A-05). The repeated-count claims inside the documents (D01
"48/51/95/134/42/30/34/13/24/20", D05 "CRITICAL=29, HIGH=62, MEDIUM=4", D03 collated per-family
A/C/N/U counts, D16 "13 gates, 24 documents, 0 executed", D14 "42 pairs") all recompute
correctly.

## 4. Source and date verification

### 4.1 Mandatory currency checks — all confirmed against official sources

| Position | Package value | Independent check |
|---|---|---|
| CRA 2024/2847 | publication 2024-11-20, in force 2024-12-10, reporting from 2026-09-11, main obligations 2027-12-11, support period ≥ 5 years (Art 13(8); updates Art 13(9)) | Confirmed: Art 71 applies the Regulation from 2027-12-11; Art 14 reporting from 2026-09-11; Art 13(8) five-year floor |
| PLD 2024/2853 | publication 2024-11-18, entry into force 2024-12-08, transposition 2026-12-09; May 2026 corrigendum OJ L 2026/90364 (2026-05-07, CELEX 32024L2853R(01)) changes Art 2(1) so it applies to products placed on the market after 2026-12-08 | Confirmed: corrigendum text replaces Article 2(1) with "after 8 December 2026" |
| RED DelReg 2022/30 | applied from 2025-08-01 | Confirmed; the package also correctly corrects the mission brief's "2025-02-01" — except for the two stale references in A-02 |
| DelReg 2026/339 | adopted 2026-02-16, OJ 2026-04-29, in force 2026-05-19, repeals 2022/30 with effect from 2027-12-11 | Confirmed: "Delegated Regulation (EU) 2022/30 is repealed with effect from 11 December 2027" |
| GPSR 2023/988 | applies 2024-12-13; Art 19 online-offer information duties | Confirmed |
| RD 188/2016 Art 9(8) | Spanish-language instructions and safety information for the Spanish market | Confirmed: "Las instrucciones e información de seguridad deberán estar al menos en castellano, si se pone el equipo en el mercado español" |
| Consumer floor | 3-year Spanish legal guarantee, 24-month presumption, 14-day withdrawal; EU floor 2 years | Confirmed and correctly separated from the EU minimum |

### 4.2 Register quality

All 48 governed sources carry `sourceId`, instrument, `officialUrl` (EUR-Lex ELI, BOE, European
Commission, AEPD, MITECO, IHM, AEMET, NMEA, EUIPO, OEPM), jurisdiction (EU 31 / ES 14 /
international 3), `retrievedOn` 2026-11-02 and a `verificationStatus` from the declared
vocabulary. Requirements are complete (51/51 with provision, obligation, jurisdiction, products,
economic operators, evidence, status, uncertainty, owner, gate, risks). No requirement is
marked `COMPLIANT_VERIFIED` (0/51); no `APPLICABLE` determination relies only on a
`NOT_RETRIEVED`/`INACCESSIBLE` source; no `NOT_APPLICABLE` determination relies only on a weak
source (0/56). One negative determination (REQ-ES-LGP-01) cites only a `NOT_RETRIEVED` source
(A-09).

### 4.3 Defects found

- **A-01 (MAJOR):** contradictory verification statuses and counts between the research trail
  and the governed register (12 contradictory sources; 14 vs 4 verified; 50 vs 48 rows; 4
  research-only and 2 governed-only sources; incompatible vocabulary
  `RE_VERIFIED_THIS_SESSION` vs `VERIFIED_THIS_SESSION`). Detail in §10 and
  `data/review-findings.json`.
- **A-02 (MINOR):** `2025-02-01` survives in `REQ-DELREG-01` (`legal-sources.json:1589`,
  D02:112) although the same document, the source record, the CSV and the dossier all state
  `2025-08-01` and the dossier explicitly says any 2025-02-01 artefact must be corrected.
- **A-03 (MINOR):** SCA RTS 2018/389 `effectiveDate` 2018-09-14 is wrong (entry into force
  2018-03-14, application 2019-09-14); the dossier's 2018-04-02 is also wrong.
- **A-10 (MINOR):** the dossier cites a non-existent CRA "recital 580" for the application date
  (correct basis: Article 71; the governed record cites Art 71 correctly).
- Observations not raised as findings: several dossier date-table entries use OJ-publication
  dates while the governed JSON uses adoption/publication dates (e.g. EMC/LVD, CRD, CSD/DCD,
  UCPD, eCommerce, EUTMR, MED) and some dossier fields say `NOT_RETRIEVED` where the governed
  record has predecessor-consumed dates. These are annotation-convention differences inside the
  A-01 reconciliation scope rather than independent wrong conclusions; the four
  mission-critical positions are correct in both layers.

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
correct for a horizontal liability regime and is separately reasoned per product (software,
connected product, service). No CE marking, wheelmark, NMEA certification or marine approval is
claimed anywhere.

The RCD/MED/CRA/PLD boundaries are reasoned: RCD is excluded for add-on electronics with the
PILOT/DISPLAY component question left `UNDETERMINED`; MED is excluded with an explicit
"not shipborne MED equipment / no wheelmark claim" rationale; CRA scope for
NAV/WEATHER/FLEET is `CONDITIONALLY_APPLICABLE` on a scope analysis rather than asserted; PLD
application is explained per product. One wording defect: the WEEE rationales say bundled
hardware "is registered separately" as if registration existed (A-17).

### 5.2 Inherited blocker mapping (58 MC-02 + 39 MC-11 + 23 MC-12 + 14 MC-13 = 134)

- MC-02: all 58 mapped, exactly L 9 / S 9 / D 10 / H 13 / P 10 / X 7 (the required L 9 / D 10 /
  H 13 / X 7 plus the S/P records). The count was re-derived from the MC-02 blocker table itself
  (58 rows, no duplicates), not from the mapping file.
- MC-11: all 39 risk ids in `docs/marea/hardware/data/risks.json` are mapped, no extras.
- MC-12: all 23 blocker ids in `docs/marea/economics/data/blocker-register.json` are mapped, no
  extras.
- MC-13: all 14 blocker ids in `docs/marea/financial/data/blocker-register.json` are mapped,
  no extras; all 14 inherited statuses match the predecessor register exactly.
- 134 unique `register/inheritedId` pairs, `doubleCounted = false` everywhere, no duplicates, 0
  `CLOSED_VERIFIED`, 0 deletions, 0 status changes; every mapping resolves to at least one
  MC-14 risk and every risk `predecessorBlockerIds` reference resolves to a mapped record.
- All 10 MC-13 handoff dependencies (`MC14-DEP-01`…`MC14-DEP-10`) are consumed with area and
  amount status identical to `docs/marea/financial/data/mc14-handoff-inputs.json`; unknown
  amounts stay `null` (DEP-02/05/09), the 3% returns assumption stays labelled illustrative
  (DEP-04), and the EUR 60,000 envelope stays `ILLUSTRATIVE_ENVELOPE_ONLY` (DEP-01).

### 5.3 Inherited conflict and predecessor status

The MC-03 class-A public-brand allowance conflict is recorded
(`MC14-BRAND-CONFLICT-01`, source `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md`) with the
stricter MC-14 rule taking precedence and IPR-14/CLM-01 attached. Predecessor verdicts are
preserved unchanged (`MC13_VERDICT = PARTIAL`,
`MC13_INTERNAL_FINANCIAL_SCOPE = PASS_INTERNAL_FINANCIAL_SCOPE`,
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
maintenance costs are `UNKNOWN` (EUR 60,000 is an illustrative stress envelope, not a quote);
the reporting obligation is correctly recorded as **already applicable from 2026-09-11**, so the
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
rate or reliability evidence. B2C and B2B are separated (`sameTemplateJustified = false`):
consumer rules do not apply to professional buyers and a separate B2B contract set is required.
Consumer terms, withdrawal form and subscription terms are all `DRAFT_REQUIRED`/not approved;
`GATE-CONSUMER-TERMS` is `BLOCKED`.

## 9. Claims enforcement and negative tests

### 9.1 Policy state

42 bilingual claim pairs (4 A / 3 C / 11 P / 24 X), 30 mandatory prohibited categories, valid
classes and statuses. **0 claims are `PUBLIC_AUTHORIZED`**; 4 are `INTERNAL_ONLY` and 38
`PUBLIC_PROHIBITED`. `publicationAuthorization = NONE`; `MAREA_PUBLIC_USE = NO_GO`;
`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; no `®`/`™` appears in any non-prohibited claim (the
only `®` is CLM-008, an X-class catalogue example of a prohibited statement, with
`registeredSymbolAllowed = false`). The inherited MC-03 conflict is documented and resolved in
favour of the stricter rule. All 42 claims have both locales, and ES/EN numeric tokens match
(`24,7`/`24.7`, `1.000`/`1,000` are correctly localised, not mismatches). Every claim has an
approver role, release gate, legal sources and risks that resolve. The class-C status deviation
is A-08.

### 9.2 Validator enforcement

The validator enforces class/status vocabularies, prohibitions on P/X publication, evidence
requirements, publication-authorisation `NONE`, frozen flags, trademark/IP statuses, PILOT
blocking, AIS receive-only, FLEET no-default-hardware, price/financial/insurance prohibitions,
consumer rights, MC-13 unknown amounts, the 134-record mapping, the brand conflict, predecessor
verdicts, website immutability, MC-15 non-start, gate/document non-certification, external
decisions, review-state consistency and publication/trademark coexistence. The suite's 40
negative controls plus the positive control pass 41/41.

### 9.3 Independent negative tests (auditor-written, 19/19 detected)

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

The mutations are the auditor's own; the committed test fixtures were not reused. The detection
rate confirms the controls are not merely self-consistent with the implementation's own tests.

## 10. Findings

Full evidence, required correction and re-verification steps are in
`data/review-findings.json`. Summary:

| ID | Class | Status | Finding |
|---|---|---|---|
| A-01 | **MAJOR** | OPEN | Research trail and governed register publish contradictory verification statuses and counts (14 vs 4 verified; 50 vs 48 sources; 12 contradictory records; vocabulary and membership drift) |
| A-02 | MINOR | OPEN | Stale `2025-02-01` RED delegated-regulation date in `REQ-DELREG-01` (data + D02) |
| A-03 | MINOR | OPEN | SCA RTS 2018/389 `effectiveDate` wrong (2018-09-14; entry into force 2018-03-14) |
| A-04 | MINOR | OPEN | 84 bundle assessments omit `legalSourceIds`/`requirementIds`/`evidenceRequired` declared by D19 §3.3 |
| A-05 | MINOR | OPEN | D03 does not reproduce the WEATHER/BATTERIES and FLEET/BATTERIES governed rationales |
| A-06 | MINOR | OPEN | Public-URL attribution wrong: `/es/...` labels and non-existent `/es/legal/*`, `/es/tienda/checkout` paths in D15/website-findings/D18/MC-15 handoff |
| A-07 | MINOR | OPEN | D20 records a 53/54 freeze run that is 54/54 at the frozen commit |
| A-08 | MINOR | OPEN | Class C claims are `PUBLIC_PROHIBITED` while the policy workflow says `INTERNAL_ONLY` until evidence |
| A-09 | MINOR | OPEN | `REQ-ES-LGP-01` rests solely on a `NOT_RETRIEVED` source while D02 states no conclusion rests on one |
| A-10 | MINOR | OPEN | Dossier cites a non-existent CRA "recital 580"; correct basis is Article 71 |
| A-11 | INFORMATIONAL | OPEN | CI does not execute the MC-14 gate and the package does not disclose it |
| A-12 | INFORMATIONAL | OPEN | Validator coverage gaps (owner-role vocabulary, bundle citations, decision risk refs, no document-level false-PASS check) |
| A-13 | INFORMATIONAL | OPEN | `pilOtCoverage` field-name typo |
| A-14 | INFORMATIONAL | OPEN | MC-11/MC-12 inherited statuses recorded via `AS_RECORDED_IN_PREDECESSOR` sentinel |
| A-15 | INFORMATIONAL | OPEN | Record-commit artefacts absent at freeze by design; Lead must complete them with the verdict |
| A-16 | INFORMATIONAL | OPEN | Remote PR/head state not observable; local evidence shows no merge/deploy/publication |
| A-17 | INFORMATIONAL | OPEN | WEEE rationales imply producer registration already exists |

Counts: **0 BLOCKING, 1 MAJOR, 9 MINOR, 7 INFORMATIONAL, 0 closed.** A-01 is the only finding
that prevents an internal-scope award; it is a provenance reconciliation defect, not a change of
legal conclusion.

### Record-commit reconciliation note

Writing this review record changes the gate state, as verified: after this record was written
the unmodified validator reports **53/54 with only `MC14-050` failing `[PENDING_CORRECTION]`**.
The check requires `manifest.review.status` to equal the awarded verdict once the review is no
longer `PENDING`. Until the Lead's record commit sets `manifest.review.status`,
`statusBlock.MC14_VERDICT`, `statusBlock.MC14_INDEPENDENT_REVIEW` and
`statusBlock.MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE` consistently (and adds D22/D23), the gate
cannot return to 54/54. This is the designed pre-record state, not a frozen-implementation
failure — the freeze itself was 54/54. Because the interim verdict is `PENDING_CORRECTION`, the
correct sequence is: apply the A-01…A-10 corrections, obtain re-verification of the corrected
commit, then record the awarded `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE` / programme `PARTIAL`
with D22/D23 and the manifest/registry/decision-log updates.

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
  finds them contradictory in A-01), not the original retrieval of every source.
- The Angular build, Playwright E2E, backup/restore and performance gates were not run (long or
  side-effectful, and the diff touches no runtime code); the read-only inherited gates that were
  run all pass.
- The remote Git/PR state was not queried; the no-merge, no-deploy and no-publication statements
  rest on local Git evidence and the manifest flags.

## 12. Final verdict and authorisation statement

**Verdict: PENDING_CORRECTION.** The internal legal/commercial governance implementation was
verified in breadth (scope, data, documents, applicability, mapping, operators, privacy, CRA,
consumer rights, claims enforcement, gates, tests) and one MAJOR defect remains open: the
package publishes contradictory legal-research provenance (verification statuses and counts)
between the research trail and the governed register (A-01), with a stale `2025-02-01` date
(A-02) showing the reconciliation pass is incomplete. No BLOCKING defect was found. Once A-01
and the other correction items are applied and re-verified, the evidence supports
`PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE` with programme status **PARTIAL**: the internal legal
governance scope passes, while external legal clearance is `NOT_GRANTED` by definition
(mirroring MC-13's internal PASS / programme PARTIAL).

No sign-off of external legal clearance is given or implied. **No sale, certification, legal
clearance, insurance cover, licence, price approval, commercial claim, publication, merge or
deployment is authorised by this review record.** MAREA remains an internal proposed brand
(`MAREA_PUBLIC_USE = NO_GO`, `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`), every product remains
`NOT_FOR_SALE`, `PRICE_APPROVED = NONE`, no public claim is authorised, the website is
unmodified, and MC-15 has not started (`MC15_STARTED = false`).
