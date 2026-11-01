# MC-10 — Independent review (D25)

| Field | Value |
| --- | --- |
| Review ID | `MC10-REVIEW-03` (round 3, final for the preparation scope; replaces `MC10-REVIEW-02`) |
| Milestone | MC-10 of 36 — primary customer discovery, buyer recruitment and commercial positioning validation |
| Branch | `feature/marea-mc10-primary-customer-discovery` |
| Reviewed implementation commit | `f083c782428b82226d9f1a3d50e0fb2ceec7f2d2` (round-3 fix commit on top of `a7645f6`) |
| Previous reviewed commits | `a7645f6` (round 2), `cdfe678` (round 1) |
| Verified base commit | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` (confirmed ancestor of HEAD) |
| Reviewer | `agent-g-auditor` — independent research auditor, not an author of any MC-10 deliverable |
| Review date | 2026-11-01 |
| Scope reviewed | Wave-0 preparation package, research-integrity gate, blocked-fieldwork honesty, scope containment, privacy, freeze integrity, commercial governance |
| Fieldwork state | `BLOCKED` — `AUTH-MC10-001 = NOT_GRANTED`; 0 participants, 0 interviews, 0 price responses |
| Verdict | `PASS` for the Wave-0 preparation scope only; fieldwork remains `BLOCKED` |

## 0. Independence and integrity statement

I did not author any MC-10 deliverable and I did not write any of the three fix commits. `data/manifest.json`
assigns D25 (this review) to `agent-g-auditor` and assigns every other deliverable to a different
member, so no author of the reviewed scope wrote this review (verified against the manifest
deliverable inventory and against `CR-58`). I ran no git write command and modified no author file.
The only files I write are `docs/marea/customer-discovery/review/MC-10-REVIEW.md` (this file) and
`docs/marea/customer-discovery/review/review-findings.json`. Adversarial probes were executed against
throwaway copies of the tree under the operating-system temporary directory, never against the real
working tree. Every number and verdict below comes from a command I ran or a file I read in this
audit, not from a delivery summary or from the author's claim about a fix.

## 1. Explicit refusal of a primary-research PASS

No PASS is issued for primary customer research; the primary qualitative customer research scope is
BLOCKED because no fieldwork was authorized or executed. The PASS in this review covers only the
Wave-0 preparation scope: the research package exists, is internally consistent, is frozen where it
must be, and its integrity gate now rejects the fabricated-evidence forms I tested. It is not a
finding of demand, willingness to pay, concept comprehension, channel conditions or product
priorities, and it clears nothing commercial. A reader who treats this verdict as customer validation
would be misreading it.

## 2. Round-3 re-verification summary

Round 1 (at `cdfe678`) reported a blocking defect F-01: the integrity validator accepted a fabricated
quotation in the most natural Markdown form and a quantifier-less fabricated observation. Round 2 (at
`a7645f6`) added CR-62 and content-level CR-47, and I then reported a residual inline-attribution
class that still passed. Round 3 (at `f083c78`) was commissioned to close that residual, and I
re-verified it from scratch rather than accepting the Lead's summary.

Verified as fixed in round 3:

1. The validator diff accepts an optional definite or indefinite article before the role noun in the
   dash and pre-quotation rules, adds a reverse-order rule (closing quotation mark, optional comma,
   reporting verb, optional article, role noun) and a parenthetical rule, and stops exempting the
   three closing-quote rules from the meta-quote guard. The data contract section 2.8 now lists the
   covered inline forms in prose instead of quoting literal pattern text.
2. The negative suite grows from 88 to 96 tests.
3. All six residual probes I reported are now rejected by CR-62: quotation followed by a hyphen and
   an indefinite-article attribution; quotation followed by an em dash and a definite-article
   attribution; the second hyphen-and-indefinite-article wording; reverse-order reporting verb with an
   indefinite article; parenthetical indefinite-article attribution; and the reverse form with a
   trailing comma. The earlier probes A9, A9b, A9c, A9d and A10 are still rejected by CR-62, and
   A11/A11b are still rejected by CR-47.
4. All 62 checks pass on the real tree with D25 present, the 96-test suite passes, all 12 freeze
   hashes recompute, and every other gate in my scope passes at the reviewed commit.

State of the findings after round 3: F-01 is CLOSED with the re-verification evidence below. F-02,
F-03 and F-06 remain CLOSED from round 2. F-04 (D28 provisional delivery fields) and F-05 (registry row
10) remain OPEN INFORMATIONAL residuals that the Lead finalizes in the delivery commit. One new
INFORMATIONAL residual, F-10, records the lexical breadth limit of the heuristic check; it is not
blocking because the current tree contains no quotation of any form and the gate now rejects every
form it documents.

## 3. Method and evidence base

1. Read the actual commit graph: `git log --oneline -3`, `git rev-parse HEAD`, ancestry check of the
   base commit, and the three `git diff --stat` ranges. The full change set against `9d206cc` is 50
   files, 16361 insertions and 2 deletions; the round-2 fix `cdfe678..a7645f6` is 7 files, 360
   insertions and 13 deletions; the round-3 fix `a7645f6..f083c78` is 3 files, 130 insertions and 11
   deletions; every touched path is inside the declared scope.
2. Read the round-3 diff line by line: the three new or amended quotation rules, the meta-quote guard
   change, the 8 new tests and the data-contract coverage rewrite.
3. Read every machine-readable data file under `docs/marea/customer-discovery/data/`, the data
   contract, the full validator (62 checks) and the negative-mutation suite (96 tests), plus the
   delivery record D28, the Spanish executive report D26, the authorization register D2, the
   experiment results D17, the decision register D21, the product/bundle evidence documents D18/D19,
   the MC-11 handoff D27, the ethics/privacy design D3, the protocol D4, the instrument register D5,
   the outreach templates and the pricing ladder freeze.
4. Re-ran every gate in the assigned scope at `f083c78` and recorded the real exit status and summary
   line.
5. Recomputed all 12 frozen SHA-256 values independently in a separate Node process: the instrument
   source hash, the ten experiment threshold hashes and the pricing-ladder self-freeze. The MC-09
   registry is untouched by all three commits.
6. Attacked the fixed validator with 34 independent mutations in a fresh throwaway fixture copy: the
   12 original probes, the two content-level participant-data probes, the six residual attribution
   probes, the control probes, and a breadth probe set that characterises the heuristic's lexical
   limits. Recorded the check ids that rejected each mutation and the variants that were not rejected.
7. Verified the closed findings F-01, F-02, F-03 and F-06 directly against the files, and re-verified
   counts, PII patterns, data location, governance invariants, decisions D-029…D-033, review
   independence and Spanish/English consistency.

## 4. Criterion-by-criterion evidence

| # | Criterion | Evidence inspected (real files and outputs) | Result |
| --- | --- | --- | --- |
| 1 | Wave-0 preparation scope complete and internally consistent (D1–D28) | `manifest.json` deliverable inventory D1–D28; `CR-01`…`CR-05`; Wave-0 checklist with 17 items (4 complete, 6 blocked, 5 not approved, 1 partial, 1 not produced); data contract documents CR-01…CR-62 | Pass |
| 2 | No fabricated participants, interviews, price responses, quotes, observations, coded units or findings | Registers empty and zero-counted; CR-62 now rejects blockquoted attributions, pseudonymous-identifier references, dash/article attributions, reverse-order and parenthetical attributions, and quantifier-less observation claims (probes A9, A9b, A9c, A9d, A9e, A10, B1, B2, B3, B4, B9 all rejected); the real MC-10 tree contains zero quotation/attribution forms, zero pseudonymous participant references and zero observation-claim sentences | Pass; lexical breadth limitation recorded as F-10 |
| 3 | Authorization gate cannot be bypassed by documents or validator | `fieldwork-authorization.json` (`NOT_GRANTED`, null authorizer/date/lead, empty scopes, volume 0, inference guard, revision field `recordedBy`); probe A1 rejected by CR-06, CR-07, CR-11, CR-12; outreach templates `NOT_APPROVED`/`NOT_SENT`, approved 0, sent 0; no channel authorised | Pass |
| 4 | Privacy/consent model specified and no participant-identifying data in the repository | D3 ethics/privacy design; three-layer model with Layer A/B external and not provisioned; independent PII scan of all MC-10 docs, `data/*.json` and `instruments.json` returned 0 hits for email, international phone, 00-prefix phone, IBAN, DNI/NIE and postal-address patterns; no audio or transcript file tracked; CR-47 content scan finds no participant data under `src/`, `public/`, `deploy/` | Pass |
| 5 | Thresholds and instruments frozen; post-hoc change detectable | Independent recomputation at `f083c78`: instrument source `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` matches both as text and as bytes; all ten experiment hashes recompute exactly; ladder self-freeze `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` matches; probe A5 rejected by CR-14 and CR-15; MC-09 registry unchanged | Pass |
| 6 | No commercial restriction weakened, no readiness upgrade, no price approval, no publication/CTA | `data/governance-status.json` mirrors MC-09 with 0 value mismatches and only stricter additions; probe A6 rejected by CR-52; no `src/`, `public/`, `deploy/`, `e2e/` or lockfile change in any of the three commits; product evidence 9/9 `NOT_TESTED`; bundle evidence 6/6 `NOT_TESTED`; approved prices 0; orderable products 0; PILOT safety gate BLOCKED; WATCH guarantee not claimed; FLEET hardware not included by default; no fixed SAIL/COMPLETE offer | Pass |
| 7 | Validators and gates genuinely pass and were not weakened | Validator inventory is 62 checks, CR-01…CR-62 contiguous, no skipped or disabled checks; at `f083c78` without D25 it reports 58/62 (CR-01, CR-40, CR-41, CR-42) because the review is absent by construction, and with this review and findings present it reports 62/62; negative suite 96/96 pass; all 14 other gate commands pass | Pass |
| 8 | Counts reconcile and no rate has a zero denominator | Every count in the six registers is 0 or an explicit planned/threshold value; `coding.json` states undefined proportions; data-quality checks QC-01…QC-09 reconcile; independent scan found no positive completed count | Pass |
| 9 | Review independence | `manifest.json` D25 owner is `agent-g-auditor`; no other deliverable is owned by that member; this review was written only by the auditor, and the fix commits by the Lead | Pass |
| 10 | Decisions D-029…D-033 recorded and approve nothing | `DECISION-LOG.md` has all five entries; `decisions.json` has the same five, each `IN_FORCE`, each with evidence and status effect; `MC10-DECISION-REGISTER.md` records the same five and five planning defects | Pass |
| 11 | Spanish executive report present and no stronger than the English evidence | `MC10-EXECUTIVE-REPORT.md` states BLOCKED, zero participants/interviews/responses, 0 of 10 experiments, 9/9 and 6/6 `NOT_TESTED`, no price approval; its MC-09 scores (4.23, 3.77, 3.38, 3.37, 3.22, 2.90, 2.84, 2.64, 2.47; bundle 3.37, 3.27, 3.22, 2.99, 2.65, 2.31) and its MC-09 "115 sources / 136 claims" figure were checked against the MC-09 records and match; the report points to this review and claims no audit completion; no claim is stronger than the English documents | Pass; D28 still carries provisional delivery fields pending the delivery commit (F-04) |
| 12 | Scope containment | Full diff against `9d206cc` contains only `docs/marea/customer-discovery/**`, `scripts/check-marea-customer-research*.mjs`, `package.json` (format scripts plus two npm scripts) and an additive `DECISION-LOG.md` change; the round-2 fix touches 7 files and the round-3 fix 3 files, all inside the same scope; no `src/`, `public/`, `deploy/`, indexed URL, product/bundle contract or dependency changed | Pass; registry row 10 not yet updated (F-05) |
| 13 | Honesty of the BLOCKED status in D1, D2, D17, D18, D19, D21, D26, D28 | Each document carries an explicit blocked/not-executed/not-tested banner; D2 states the gate is a hard stop and lists the unblock sequence; D17 states all ten experiments are NOT_EXECUTED/BLOCKED and records five planning defects; D18/D19 keep MC-09 priority as historical context only; D21 states no commercial status change; D26 is the Spanish blocked report with a review pointer; D28 states the milestone is BLOCKED, not PASS | Pass; D28 provisional fields pending the delivery commit (F-04) |

## 5. Commands run and real results (round 3, at `f083c78`)

All commands were run on the real working tree (Windows 11, Node v24.18.0, npm 12.0.1). Earlier rounds
are superseded: the validator grew from 61 to 62 checks and the suite from 78 to 96 tests.

| Command | Real result |
| --- | --- |
| `node scripts/check-marea-customer-research.mjs` (with D25 present) | 62/62 checks passed, exit 0 |
| `node scripts/check-marea-customer-research.mjs` (throwaway copy without D25) | 58/62 — FAILED: CR-01, CR-40, CR-41, CR-42 (the review deliverable is absent by construction) |
| `node --test scripts/check-marea-customer-research.test.mjs` | 96 tests, 96 pass, 0 fail, exit 0 |
| `npm run test:market` | MC-09 market validation 40/40 checks passed, exit 0 |
| `npm run test:market:unit` | 43 tests, 43 pass, 0 fail, exit 0 |
| `npm run test:products` | 52 checks run, 52 passed, 0 failed; 51/51 scoped files read; overall PASS, exit 0 |
| `npm run test:products:unit` | 106 tests, 106 pass, 0 fail, exit 0 |
| `npm run test:bundles` | 35 checks run, 35 passed, 0 failed; 43/43 files; 60 assets; 6 bundles; overall PASS, exit 0 |
| `npm run test:bundles:unit` | 60 tests, 60 pass, 0 fail, exit 0 |
| `npm run test:brand` | 21 checks run, 21 passed, 0 failed; 24 files scanned; overall PASS, exit 0 |
| `npm run test:brand:unit` | 13 tests, 13 pass, 0 fail, exit 0 |
| `npm run test:i18n` | Server-rendering and i18n foundation checks passed, exit 0 |
| `npm run test:commerce` | Commerce integration checks passed, exit 0 |
| `npm run test:seo` | SEO checks passed: 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD, private noindex, exit 0 |
| `npm run format:check` | "All matched files use Prettier code style!", exit 0 |
| `git diff --check` (working tree and `9d206cc..HEAD`) | no whitespace errors, exit 0 |

Out of the auditor's scope and owned by the Lead: `npm run build` and `npm run test:e2e`. They were not
re-run here and this review makes no claim about them. Remote state (PR open/draft/mergeable) cannot
be verified offline from the local repository and is treated as an unverified external claim.

## 6. Independent freeze recomputation

| Object | Recorded value (first 24 hex) | Recompute result at `f083c78` |
| --- | --- | --- |
| Instrument source hash (`methodology/instruments.json` → `MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`) | `cbe7f9fe4634c44a7344a4b9` | Match both as UTF-8 text and as raw bytes; all 7 instrument `sourcePath` hashes match |
| Ten experiment thresholds (`data/experiments.json` ← canonical MC-09 records) | `199d1707131d0f10…`, `e4d4c05f1dc710f9…`, `46e535074b9e45fb…`, `9003cbc60cac89b9…`, `5d6d71906b77afb0…`, `ae2528b282482d23…`, `c16e255616e83bf6…`, `1600ef293030f7f1…`, `73a403e980513e48…`, `0e5eb0e20b7a6714…` | All ten recompute exactly with the documented canonicalisation; no post-hoc change |
| Pricing-ladder self-freeze (`data/pricing-ladders.json` → `constructs`) | `bfa09ebc904a66ba65961864` | Match |
| MC-09 registry untouched | — | `git diff --name-status 9d206cc..HEAD` lists no file under `docs/marea/market-validation/`, and none of the three commits touches it |

Environment note for hash stability: every frozen source is LF-only with no byte-order mark
(discovery plan 39322 bytes / 548 LF / 0 CRLF; experiment registry 27649 / 196 / 0; ladders
20398 / 284 / 0; instruments 5199 / 117 / 0; frozen experiments 24490 / 311 / 0), so text-mode and
byte-mode SHA-256 agree and the freeze is not exposed to a line-ending or BOM re-encoding accident.

## 7. Adversarial probes against the validator (throwaway fixture only)

The fixture was a fresh copy of `docs/` and `scripts/` from `f083c78` under the operating-system
temporary directory. The baseline was 62/62 before every probe and was re-confirmed after every
restore.

Probes carried over from earlier rounds (all still rejected):

| Probe | Mutation applied | Rejecting check ids | Outcome |
| --- | --- | --- | --- |
| A1 | Authorization status set to granted with null authorizer/date/lead and empty scopes | CR-06, CR-07, CR-11, CR-12 | Rejected |
| A2 | Fabricated interview record with consent not recorded, gate still closed | CR-04, CR-12, CR-20, CR-22, CR-24 | Rejected |
| A2b | Plausible full authorization, gate opened, fabricated interview without recorded consent | CR-04, CR-11, CR-12, CR-20, CR-22, CR-24, CR-44, CR-49 | Rejected |
| A3 | Price response with no currency and no VAT treatment, module marked administered | CR-04, CR-10, CR-25, CR-55 | Rejected |
| A4 | Injected participant email address into a results document | CR-46 | Rejected |
| A5 | Altered EXP-MC10-01 threshold in the frozen registry and in `data/experiments.json` | CR-14, CR-15 | Rejected |
| A6 | Upgraded a product to `RELEASED` / `AVAILABLE` | CR-52 | Rejected |
| A7 | Fabricated positive participant count and an experiment PASS verdict in D17 | CR-44, CR-49 | Rejected |
| A8 | Review document issuing a primary-research PASS | CR-42, CR-49 | Rejected |

Narrative-fabrication and application-data probes, accepted at round 1 or round 2 and now rejected:

| Probe | Mutation applied | Rejecting check ids | Outcome |
| --- | --- | --- | --- |
| A9 | Blockquoted fabricated quotation attributed to a pseudonymous participant | CR-62 | Rejected (was accepted at round 1) |
| A9b | Blockquoted fabricated quotation attributed to an owner | CR-62 | Rejected |
| A9c | Blockquoted fabricated quotation hidden in a fenced code block | CR-62 | Rejected |
| A9d | Unresolvable pseudonymous participant reference hidden in inline code | CR-62 | Rejected |
| A10 | Quantifier-less fabricated observation sentence | CR-62 | Rejected (was accepted at round 1) |
| A11 | Participant-content JSON under `src/` with a neutral filename | CR-47 | Rejected (was accepted at round 1) |
| A11b | Interview-record Markdown under `public/` with a neutral filename | CR-47 | Rejected |
| A9e | Quotation followed by a hyphen and an indefinite-article attribution | CR-62 | Rejected (was accepted at round 2) |
| B1 | Quotation followed by an em dash and a definite-article attribution | CR-62 | Rejected (was accepted at round 2) |
| B2 | Quotation followed by a hyphen and an indefinite-article attribution (second wording) | CR-62 | Rejected (was accepted at round 2) |
| B3 | Quotation followed by a reporting verb and an indefinite-article attribution in reverse order | CR-62 | Rejected (was accepted at round 2) |
| B4 | Quotation followed by a parenthetical indefinite-article attribution | CR-62 | Rejected (was accepted at round 2) |
| B9 | Quotation with a trailing comma, then a reporting verb and an indefinite-article attribution in reverse order | CR-62 | Rejected (was accepted at round 2) |

Control probes that are correctly handled and are not gaps: a forward attribution with an indefinite
article before the reporting verb is rejected by CR-62; a quotation with no attribution at all is not
treated as an attributed quotation; a negated observation sentence is accepted by design because the
negation exemption is intended; and an unresolvable pseudonymous identifier anywhere in a document is
rejected even without a quotation.

Breadth probes that still pass at 62/62 and characterise the heuristic limit (finding F-10,
informational): a role noun placed before a reporting verb outside the covered verb set; a quotation
that uses single-quote characters; a quotation that uses guillemet characters; and a fabricated
quotation attributed to a role noun outside the English list. The tree contains no such quotation of
any kind (guillemet and single-quote attribution scans returned zero), so this is a lexical breadth
limitation of the heuristic, not a missing control on any document that exists.

## 8. Counts, PII and data-location verification

- `research-status.json` participant counts, segment counts, sample and pricing/coding blocks: all
  zero, with planned minima/maxima explicitly labelled as planned.
- `recruitment-funnel.json`: 8 segments, 11 funnel states each, every state 0; `totalsCompleted` 0.
- `participants.json`, `interview-records.json`, `pricing-responses.json`, `coding.json` and
  `findings.json`: empty or zero; pricing unadministered; kappa null with `NOT_COMPUTED`; finding
  traceability rule intact.
- Independent PII scan of every MC-10 document, data file and the instrument freeze: 0 hits for email,
  international phone, 00-prefix phone, IBAN, DNI/NIE and postal-address patterns.
- No audio or transcript file is tracked; CR-47 scans content under `src/`, `public/` and `deploy/` and
  reports no participant data; Layer A and B stores are recorded as not provisioned and no participant
  data outside the repository is claimed to exist.
- Two historical git-author email strings in `DECISION-LOG.md` lines 68–69 predate the base commit and
  are not participant data; they are outside the MC-10 data contract and would never be treated as
  research contact data (F-08).

## 9. Commercial governance verification

`data/governance-status.json` was compared key by key with `docs/marea/market-validation/data/governance-status.json`
in a separate script: 0 value mismatches. The MC-10 mirror adds five stricter entries that MC-09 keeps
elsewhere or expresses differently (`pilotSafetyGate = BLOCKED`, `approvedPrices = 0`,
`orderableProducts = 0`, `wtpStatedPreferenceObserved = false`, `wtpCommerciallyValidated = false`), all
of which are restrictions, not relaxations. Verified unchanged: trademark clearance `NOT_GRANTED`,
source IP `NOT_CLEARED`, product sales `BLOCKED`, commercial publication `BLOCKED`, production
deployment `NOT_AUTHORIZED`, profitability not established, PILOT safety gate `BLOCKED`, compatibility
rows 0, approved prices 0, orderable products 0, remote helm control `PROHIBITED`, hardware not included
in FLEET by default. None of the three commits changes `src/`, `public/`, `deploy/`, the
product-definition batches, the bundle contract, indexed routes or any public copy, so no page, CTA or
structured-data offer was introduced.

## 10. Scope containment

Against `9d206cc`, the change set is 50 files, 16361 insertions and 2 deletions: 46 files under
`docs/marea/customer-discovery/` (12 top-level deliverable documents, the data contract, 19
data-directory files made of the README, the manifest and the 17 governed data files, 5 methodology
records made of 4 documents plus the instrument freeze, 3 recruitment documents, 1 owner document, 2
professional documents and 3 pricing documents), 2 new files under `scripts/`, this review pair, an
additive `DECISION-LOG.md` change and a `package.json` change (two npm scripts plus the two new scripts
in the Prettier lists; the only deletions in the whole range). The round-2 fix `cdfe678..a7645f6`
touches 7 files and the round-3 fix `a7645f6..f083c78` touches 3 files (the validator, the negative
suite and the data contract), all inside the declared scope. Nothing outside the declared scope changed
in any commit.

## 11. Findings

### F-01 — BLOCKING — CLOSED in round 3 — narrative-fabrication forms are rejected

- **Evidence.** Round 1: a blockquoted fabricated quotation (probe A9) and a quantifier-less fabricated
  observation (probe A10) were accepted at 61/61. Round 2 added CR-62 and rejected those forms but left
  six inline attribution forms accepted (A9e, B1, B2, B3, B4, B9). Round 3 extends the rules and, in a
  fresh throwaway fixture at `f083c78`, **all six residual probes are rejected by CR-62**, as are the
  round-1 and round-2 forms A9, A9b, A9c, A9d and A10; unresolvable pseudonymous participant references
  are rejected anywhere in a document; and the real tree still validates at 62/62. The data contract
  section 2.8 now lists the covered inline forms in prose and the validator header matches the
  implementation. **Closed** with this re-verification evidence.

### F-02 — MINOR — CLOSED in round 2 — CR-47 scans application-layer content

- **Evidence.** Round 1 placed participant-content JSON under a throwaway fixture `src/` directory with a
  neutral filename and the validator returned 61/61; CR-47 was also the only check without a negative
  test. At `a7645f6` and again at `f083c78`, CR-47 content-scans `src/`, `public/` and `deploy/` for
  participant, interview, consent, price-response and contact markers; probes A11 and A11b are both
  rejected with CR-47, and the suite contains a CR-47 negative test. **Closed**.

### F-03 — MINOR — CLOSED in round 2 — planning-inconsistency count corrected

- **Evidence.** `MC10-EXPERIMENT-RESULTS.md` section 11 says five plan inconsistencies and describes
  PI-05; `MC10-DECISION-REGISTER.md` section 4 records five; `data/research-status.json` holds five
  entries PI-01 to PI-05. All agree at `f083c78`. **Closed**.

### F-04 — INFORMATIONAL — OPEN — D28 still carries provisional delivery fields

- **Evidence.** `MC-10-DELIVERY.md` section 7 still lists pending independent re-runs at the reviewed
  commit for the validator and the negative suite, its header still says the preparation is
  independently audited, and section 10 still defers the implementation and review-correction commits to
  a final delivery update. The Spanish report was corrected in round 2 and no longer claims audit
  completion, so this finding is limited to D28.
- **Remediation.** Lead finalizes in the delivery commit: replace the pending rows with the reproduced
  results from section 5 of this review, record the reviewed commit `f083c78` and the review-correction
  commit, and keep the audit wording only once this review is committed.

### F-05 — INFORMATIONAL — OPEN — The Master-Prompt registry row for prompt 10 is still `PLANNED`

- **Evidence.** `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` line 56 still marks prompt 10 as
  `PLANNED` with evidence "-", while the change-control section requires the Lead to update the registry
  at the end of every prompt with status and commit/PR evidence. None of the three fix commits touches
  it.
- **Remediation.** Lead finalizes in the delivery commit: update the prompt-10 row to the honest status
  with branch, commit, review and gate evidence.

### F-06 — INFORMATIONAL — CLOSED in round 2 — revision author field renamed

- **Evidence.** `data/fieldwork-authorization.json` line 51 reads `recordedBy`; the top-level
  `authorizer`, `authorizerRole`, date, scopes and `fieldworkLead` remain null or empty, so the record
  still cannot be read as an outreach authorization. **Closed**.

### F-07 — INFORMATIONAL (closed) — Freeze stability across line-ending and encoding environments

- **Evidence.** All frozen sources are LF-only with no BOM, and all 12 hashes recompute both as UTF-8
  text and as raw bytes on Windows at `f083c78`. No action required; recorded so that a future editor
  does not silently introduce CRLF or a BOM into a hashed source.

### F-08 — INFORMATIONAL (closed) — Pre-existing non-research email strings in the decision log

- **Evidence.** `DECISION-LOG.md` lines 68–69 contain historical git-author email strings inherited from
  MC-02 at the base commit. They are neither participant data nor MC-10 additions and lie outside the
  MC-10 data contract; the MC-10 documents, data files and instruments contain zero PII-pattern hits.
- **Remediation.** None for MC-10; a future repository-hygiene pass may redact historical author
  addresses.

### F-09 — INFORMATIONAL (closed) — "17-file machine-readable layer" wording

- **Evidence.** `MC-10-DELIVERY.md` section 5 says "data/*.json (17-file machine-readable layer)" while
  the data directory holds 18 JSON files: the 17 governed files indexed by `manifest.json` plus
  `manifest.json` itself. `manifest.json` and CR-02/CR-03 agree on the 17 governed files.
- **Remediation.** Optional wording fix: "17 governed data files plus the manifest index".

### F-10 — INFORMATIONAL — OPEN — CR-62 is a heuristic limited to the documented lexical forms

- **Evidence.** Breadth probes at `f083c78` returned 62/62 for four variants outside the documented
  forms: a role noun placed before a reporting verb outside the covered verb set; a quotation using
  single-quote characters; a quotation using guillemet characters; and a fabricated quotation attributed
  to a role noun outside the English list. The data contract section 2.8 lists the covered inline forms
  in prose but does not state this lexical limit, and the validator header is silent on it. The tree
  contains zero quotations of any form (guillemet and single-quote attribution scans returned zero), so
  this is a breadth limit of a heuristic control rather than an open fabrication path in any existing
  document; the twelve probes that previously demonstrated a real bypass are all rejected.
- **Remediation.** Either extend CR-62 to additional quotation characters, bilingual role nouns and a
  wider reporting-verb set, or record the lexical scope explicitly in data-contract section 2.8 and the
  validator header. Required before any Spanish-language narrative reporting or before the gate is
  relied on for quotations in languages other than English. Lead may fold this into the delivery
  commit or schedule it as a follow-up; it is not blocking for the current preparation scope.

## 12. Out of scope and unverified claims

- `npm run build` and `npm run test:e2e` are Lead-owned; they were not re-run and are not asserted here.
- Remote state (PR open/draft/mergeable, remote HEAD equality) is not verifiable offline from the local
  repository; the local branch, HEAD, base ancestry and clean working tree were verified.
- This review does not opine on any matter outside the MC-10 preparation scope.

## 13. Remaining actions and unblock conditions

1. Lead finalizes F-04 and F-05 in the delivery commit; no further auditor gate change is required for
   the preparation scope.
2. Record or extend F-10 before any Spanish-language narrative reporting or non-English quotation
   surface; informational only.
3. Fieldwork remains blocked regardless of this PASS. The recorded unblock sequence is D2 section 5 and
   `research-status.json` blockers BLK-MC10-01…BLK-MC10-07: authorization with a named authorizer, date,
   scope, volume, spend/incentive position, duration and fieldwork lead; a designated data controller
   and verified privacy contact; qualified legal review of the lawful basis and recruitment
   communications; approved participant information notices and retention rules; a provisioned
   access-controlled Layer A/B store outside the repository; an approved outbound channel with trained
   human interviewers or an approved platform acting as processor; and Portuguese instruments with
   qualified linguistic review before any Portugal fielding.
4. The recorded planning inconsistencies PI-01…PI-05 must be resolved by dated amendment before
   fielding; MC-10 correctly records rather than silently repairs the quota, target and pricing-minimum
   conflicts.

## 14. Honesty statement

No participant, interview, quotation, observation, price response, coded unit or finding was invented by
this review. No finding above is based on an author summary: each cites a file I read or a command I ran.
The round-3 fix was verified from scratch at `f083c78`, and every probe was run after the fix was
committed, not before. The current MC-10 tree is materially honest: it records a blocked milestone, a
zero-data state and an unvalidated portfolio, and it does not convert preparation into research. This
verdict does not lift the fieldwork block and does not issue any primary-research PASS.
