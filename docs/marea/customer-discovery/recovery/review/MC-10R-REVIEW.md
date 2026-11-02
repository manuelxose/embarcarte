# MC-10R — Independent review (D33)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D33 / `MC-10R-REVIEW` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Reviewed commit | `ea80ea5927fa5b0df376bbbe71567ad8d86a3853` (corrective commit: closes MC10R-F01…F05) |
| Previously reviewed commit | `b0a8c1229d860514988d5c9a8958f82e179a899f` (first-round review: PARTIAL) |
| Reviewed branch | `feature/marea-mc10r-fieldwork-recovery` |
| Base commit | `d1ac69a4873222fbde93dcf69c360a5e0ca1542d` (verified MC-10 HEAD; verified ancestor) |
| Date | 2026-11-01 |
| Re-audit date | 2026-11-02 |
| Owner | `agent-g-auditor` — Independent Research Quality Auditor |
| Independence | I authored no implementation artifact in the audited scope. I wrote only this review file, and only re-verified the corrective commit by reading and executing, not by editing. |
| Review status | `PASS` for the internal preparation scope only — no BLOCKING or MAJOR defect remains after re-verification |
| Verdict | **PASS — for the internal preparation scope only.** MC-10 remains BLOCKED; AUTH-MC10-001 remains NOT_GRANTED; no legal sign-off, authorization, provisioning or interviewer readiness is claimed |
| MC-10 field research | **BLOCKED** — zero participants, zero interviews, zero price responses, no outreach |
| AUTH-MC10-001 | **NOT_GRANTED** (revision 2 is `DRAFT_PREPARED`, not a grant) |
| Legal review | **LEGAL_REVIEW_PENDING** — no legal opinion, sign-off or approval is claimed |
| Storage | `ARCHITECTURE_DEFINED = true`, `LOCAL_SYNTHETIC_TESTS_PASS = true`; `PROVISIONED = false`, `ACCESS_REVIEWED = false`, `OPERATIONALLY_APPROVED = false` |
| Interviewers | zero assigned, zero trained, zero appointed; training completion `NOT_PERFORMED` |

> **Verdict statement.** I issue `PASS` **for the internal preparation scope only** at commit
> `ea80ea5`, after independently reproducing every required result and re-running my own adversarial
> probes against the corrected gate. I explicitly refuse a primary-research PASS and a
> customer-validation PASS. MC-10 remains `BLOCKED`, `AUTH-MC10-001` remains `NOT_GRANTED`, and no
> external act has occurred. This review is an engineering and research-quality audit; it is **not** a
> legal opinion and must not be represented as one.

## 1. Independence and method

- I am the independent auditor named in the recovery plan; I authored none of D1–D32, the recovery
  scripts, the research validator extension, the corrective commit or any data, product, governance or
  fieldwork file.
- I inspected the actual working tree with read-only Git commands and read the real files. I did not run
  any Git write command.
- Every adversarial mutation was applied to a throwaway copy of the package created under the
  operating-system temporary directory; each fixture was deleted after use. The real working tree was
  never mutated by my probes. My only repository write is this review file.
- I re-read the corrective commit diff rather than trusting the correction summary, then reproduced the
  gates, suites, hashes and adversarial probes myself.

## 2. Reviewed scope (Area A)

The first review covered `b0a8c12`, which is 36 paths ahead of the base `d1ac69a`: 30 new recovery
documents, 2 new recovery scripts, and 4 modified existing files (`scripts/check-marea-customer-research.mjs`,
`scripts/check-marea-customer-research.test.mjs`, `docs/marea/customer-discovery/data-contract/MC10-DATA-CONTRACT.md`,
`package.json`). No `src/`, `public/`, `deploy/`, product/bundle contract, price, route, i18n, index or
dependency change was present, and the research validator keeps exactly the same 62 check ids as at the
base.

The corrective commit `ea80ea5` changes 9 paths (`+144/−24`): the two recovery scripts, and seven
recovery documents touched by MC10R-F01…F05. `git diff --name-status b0a8c12..ea80ea5` contains no
`src/`, `public/`, `deploy/`, product, bundle, data, governance, price or package file; `d1ac69a` remains
an ancestor and the local MC-10 branch head. The scope remains compliant with D1/D2.

The reviewed commit is local in this checkout (`git branch -a` shows the MC-10 branch at `d1ac69a` but
no remote-tracking ref for the recovery branch); remote branch and stacked-PR state cannot be verified
offline and remain a Lead delivery obligation (MC10R-F06).

## 3. Real command results at the re-audited commit

All commands ran in `C:\Users\Admin\Documents\workspace\embarcarte` at `ea80ea5` with this review
present in the working tree.

| # | Command | Real observed result | Exit |
| ---: | --- | --- | ---: |
| 1 | `node scripts/check-marea-customer-research.mjs` | `MC-10 customer research validation: 62/62 checks passed` | 0 |
| 2 | `node --test scripts/check-marea-customer-research.test.mjs` | `tests 111`, `pass 111`, `fail 0`, `duration_ms 217515` | 0 |
| 3 | `node scripts/check-marea-customer-recovery.mjs` | `MC-10R recovery validation: 32/32 checks passed` | 0 |
| 4 | `node --test scripts/check-marea-customer-recovery.test.mjs` | `tests 82`, `pass 82`, `fail 0`, `duration_ms 103111` | 0 |
| 5 | `npx --no-install prettier --check` on the four scripts | `All matched files use Prettier code style!` | 0 |
| 6 | `git diff --check` and `git diff --check b0a8c12..ea80ea5` | no output (no whitespace errors) | 0 |
| 7 | `node scripts/check-marea-customer-recovery.mjs` with this review file present | `32/32 checks passed` (the review artifact does not disturb the gate) | 0 |
| 8 | `node scripts/check-marea-customer-research.mjs` with this review file present | `62/62 checks passed` | 0 |

The existing research gate still declares exactly the same 62 check ids `CR-01`…`CR-62` as at the base;
the original 96 tests are preserved (the test-file change is +156/−0) and the suite grew to 111. The
recovery suite grew from 74 to 82 with the eight correction cases described below. Check ids `CRR-01`…`CRR-32`
remain contiguous.

### 3.1 Frozen-integrity recomputation (12 hashes)

Independently recomputed again after the corrective commit:

| Object | Recomputation result |
| --- | --- |
| EXP-MC10-01 … EXP-MC10-10 threshold hashes (sorted-key 2-space JSON of the MC-09 record, UTF-8, SHA-256) | 10/10 `MATCH` — values unchanged from the record |
| Pricing-ladder `constructs` self-freeze (its documented compact, order-preserving JSON) | `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` — match |
| Instrument source `MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | raw byte SHA-256 `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` — match; 39,322 bytes |
| Container file hashes | pricing ladders `63f398f0…`, experiments `5ba02081…` — unchanged |
| D5 provenance hashes | `8111449b…`, `8bd22dc1…`, `f01420f1…`, `83ab30d3…` — all match |

No threshold, quota, ladder or instrument value was changed by `b0a8c12` or by `ea80ea5`.

## 4. Re-verification of the corrective commit

The Lead committed exactly the corrections requested in the first-round findings. I read the diff and
re-tested each one myself; I did not close a finding on the correction summary alone.

### 4.1 MC10R-F01 — CLOSED

- The condition at `scripts/check-marea-customer-recovery.mjs:1840` now reads
  `typeof child !== 'boolean' && typeof child !== 'string'`, so string-valued children are no longer
  skipped, and the honest `OPEN` sentinel is exempted for the approval-evidence, legal-review and
  approved-storage reference fields.
- My own probes on throwaway copies, re-run after the correction:
  - D29 authorization status and current status set to a bare granted value: failed `CRR-05`, `CRR-07`,
    `CRR-25`, `CRR-31` (CRR-25 now fails, as required);
  - invented approval-evidence string plus authorizer identity: failed `CRR-06`, `CRR-07`, `CRR-25`;
  - approved amendment status with an effective date and approval evidence: failed `CRR-11`, `CRR-25`.
- The four new D32 cases assert CRR-25 failure for the bare granted status, an approval-evidence string,
  a non-null effective date and an approved status/review status. The suite reports 82/82.
- No blocking or major defect remains in this area.

### 4.2 MC10R-F04 — CLOSED

- The recovery gate's narrative/count rules now cover ES/PT plural reporting verbs, expanded preference
  verbs, participant-percentage claims and numbered role-completion counts; D20 states the exact lexicon
  and the reliance on CR-62 for forms outside it.
- My own appended-claim probes on throwaway copies, re-run after the correction (each appended to a
  recovery document): an ES plural indirect claim failed `CRR-16`; a PT plural indirect claim failed
  `CRR-16`; an ES percentage claim failed `CRR-16`; an English role-count claim failed `CRR-17`; an
  English preference claim failed `CRR-16`. The research gate's CR-62 also rejected every one of them.
- The four new D32 cases cover the ES plural, PT plural, ES percentage and EN role-count forms; the suite
  reports 82/82.
- No blocking or major defect remains in this area.

### 4.3 MC10R-F02 — CLOSED

D3 IRB-02 and D4 DR-MC10R-02 now state the 15-field contract (14 enumerated fields plus
`priorVersionReading`), D2 §3.7 and W-F state the 30-numbered-field / 31-flat-key authorization record,
and D2 §3.7 keeps the ungranted status wording. I re-read the four documents and found the counts
consistent with D6/D13/D29.

### 4.4 MC10R-F03 — CLOSED

D1 §6 now states the per-artefact freeze recipes: experiment records use sorted-key two-space JSON; the
pricing-ladder self-freeze uses compact order-preserving JSON exactly as the artefact's own `freeze`
block specifies; the instrument source value is the raw SHA-256 of the frozen file bytes. My independent
recomputation matches all twelve values with those recipes.

### 4.5 MC10R-F05 — CLOSED

D4 DR-MC10R-03 addendum, D7 §4.3 and the D27 `sourceNote` now reconcile the two attributes: D7's
`NAMED_SEPARATE_VIEW` is a descriptive reporting view (operator views reported separately per
`MC10-GABOR-GRANGER.md` §6.1), while D27's `NOT_NAMED` is the canonical experiment-eligibility attribute
consistent with D2 and the frozen experiment text. Neither makes a cell experiment-level eligible, and
SEG-08 remains below the registered minimum. The two-attribute rule (reachability AND registered
population) is unchanged and enforced by CRR-10/CRR-24.

## 5. Audit conclusions by area (unchanged where re-verified)

- **Area B — sampling arithmetic.** Minima 37 and maxima 57 recompute exactly; the `40–80` figure is
  preserved only as `HISTORICAL_PLANNING_ASPIRATION` with `derivableFromSegmentQuotas: false`; Wave 1 is
  18–28 over SEG-01/03/04/06, Wave 2 completes 37/57 and Wave 3 requires an approved amendment. The
  15-field segment-quota contract remains `PROPOSED_NOT_EFFECTIVE` and no historical value is overwritten.
- **Area C — pricing feasibility.** `n >= 8` is retained for EXP-MC10-04/05; the 32-cell matrix is
  correct; SEG-04/05/06/08 are `BELOW_REGISTERED_MINIMUM` (7<8, 7<8, 5<8, 6<8); the two-attribute rule
  holds; no cell is presented as an experiment-level result; zero approved prices and false WTP flags are
  consistent.
- **Area D — instrument amendments.** IV-01…IV-09 are present with previous/candidate versions,
  reasons, affected experiments, dependencies, approval state and no effective date or sign-off; the
  frozen v1.0.0 source hash and the nine candidate section hashes recompute; the incident sequence,
  exclusions-before-benefits and concept mapping A–E are present and no undefined concept id is used.
- **Area E — authorization.** AUTH-MC10-001 rev 2 remains `DRAFT_PREPARED` / `NOT_GRANTED` with
  `fieldworkPermission: false` and `externalContactAllowed: false`; D29 carries exactly 31 flat
  authorization fields plus the four status keys and is field-for-field equal to D13 (0 mismatches); all
  human, legal, storage and interviewer values are `null`/`OPEN`/empty; every adversarial mutation is
  rejected, now including the string-typed structured cases.
- **Area F — research ethics.** Four separately recorded permissions, participant information,
  lawful-basis analysis, rights and complaint text, retention and withdrawal handling are present;
  controller and privacy contact remain `OPEN`; statuses remain `DRAFT_FOR_LEGAL_REVIEW` and
  `LEGAL_REVIEW_PENDING`; no legal opinion or approval is claimed. This review is not a legal review.
- **Area G — data security.** The three-layer architecture, access matrix, encryption requirements,
  retention, deletion, withdrawal propagation, backup, audit, processors, export controls and breach
  response are defined; only `ARCHITECTURE_DEFINED` and `LOCAL_SYNTHETIC_TESTS_PASS` are true while
  `PROVISIONED`, `ACCESS_REVIEWED` and `OPERATIONALLY_APPROVED` are false; no participant data, PII,
  audio, transcript, identity key or recovery marker exists under `src/`, `public/` or `deploy/`; the D32
  suite uses throwaway temporary fixtures and passes 82/82.
- **Area H — human fieldwork readiness.** Roles are `UNASSIGNED`, interviewers `UNTRAINED`, training
  `NOT_PERFORMED`, mock material labelled `TRAINING_SYNTHETIC_NOT_RESEARCH`, supervisor contacts blank,
  templates `NOT_APPROVED`/`NOT_SENT`, and no invented names, dates, appointments or participants. The
  manual is complete; no human is trained or appointed.
- **Area I — multilingual CR-62.** The gate remains 62/62 with the same ids and the suite 111/111 with
  the original 96 tests preserved. My fabricated-form probes were rejected in English, Spanish and
  Portuguese (straight/curly/guillemet quotes, dash and reverse-order attribution, parenthetical
  attribution, plural past-tense indirect speech, completed counts, percentages, preference claims); the
  documented false negatives (a non-covered language and an impersonal claim with no role noun) still
  pass, as documented; and the eight false-positive controls all pass CR-62. The strengthened recovery
  gate now rejects the appended ES/PT plural and percentage/count forms as recorded in §4.2. No claim
  that a heuristic proves authenticity is accepted.
- **Area J — commercial governance.** The MC-09 governance record is unchanged in meaning; trademark
  `NOT_GRANTED`, source IP `NOT_CLEARED`, product sales and publication `BLOCKED`, deployment
  `NOT_AUTHORIZED`, pilot safety `BLOCKED`, compatibility tested 0, approved prices 0, orderable products
  0, all ten experiments `NOT_EXECUTED`/`BLOCKED`; no public page, CTA, price, sale or bundle claim
  changed, and the product, bundle, brand and market gates pass.

## 6. Adversarial mutation results (re-run after correction)

Each probe was applied to a throwaway copy; the exact rejecting ids and exit codes are recorded.

| Probe | Mutation (temp copy) | Rejections observed | Exit |
| --- | --- | --- | ---: |
| E1 | D29 authorization status/current status set to a bare granted value with null evidence | `CRR-05`, `CRR-07`, `CRR-25`, `CRR-31` | 1 |
| E2 | D29 authorizer identity plus signed approval evidence invented | `CRR-06`, `CRR-07`, `CRR-25` | 1 |
| E3 | D28 IV-01 marked approved with an effective date and approval evidence | `CRR-11`, `CRR-25` | 1 |
| E4 | D30 interviewer role trained and counted as 1 | `CRR-17`, `CRR-22`, `CRR-24` | 1 |
| E5 | D30 + D27 storage claimed provisioned | `CRR-04`, `CRR-23`, `CRR-25` | 1 |
| E6 | D29 fieldwork permission and external-contact permission set true | `CRR-04`, `CRR-05`, `CRR-07`, `CRR-25` | 1 |
| E7 | D29 `expiryDate` and its field-status entry removed | `CRR-05`, `CRR-06`, `CRR-07` | 1 |
| E8 | Recovery prose stating that a recovery PASS cannot be read as fieldwork permission, mutated into the opposite claim | `CRR-25` | 1 |
| E9 | D30 controller identity and privacy contact invented | `CRR-18`, `CRR-23` | 1 |
| E10 | D27 recovery work status set to the PASS state while still ungranted | `CRR-32` | 1 |

All ten mutations are rejected. The unfixed baseline fixture passes the recovery gate 32/32 and the
research gate 62/62. The exhaustive mutation set remains in the 82-case D32 suite.

## 7. Findings

### MC10R-F01 — MAJOR — CLOSED

- **File/line:** `scripts/check-marea-customer-recovery.mjs:1840` (CRR-25 structured scan).
- **Original evidence:** the string filter compared the value with the string `'string'` instead of
  checking `typeof`, so every string-valued claim was skipped; a bare granted authorization status on a
  temp copy left CRR-25 passing (rejected only by CRR-05/07/31).
- **Correction:** `typeof child !== 'string'`; `OPEN` sentinel exempted for the three reference fields;
  four D32 regression cases added.
- **Corrective commit:** `ea80ea5927fa5b0df376bbbe71567ad8d86a3853`.
- **Re-verification evidence:** my probes now show CRR-25 failing on the bare granted status, the
  approval-evidence string and the approved-status/effective-date cases; recovery gate 32/32; suite
  82/82.
- **Closure status:** CLOSED.

### MC10R-F02 — MINOR — CLOSED

- **Files/lines:** `MC10R-BLOCKER-REGISTER.md:35`, `MC10R-DECISION-REGISTER.md:60`,
  `MC10R-RECOVERY-EXECUTION-PLAN.md:236` and `:294`.
- **Original evidence:** stale 14-field and 30-field counts in canonical registers versus the 15-field
  contract and 31 flat authorization keys.
- **Correction:** D3/D4 now state 15 fields; D2 §3.7 and W-F state 30 numbered fields / 31 flat keys.
- **Corrective commit:** `ea80ea5927fa5b0df376bbbe71567ad8d86a3853`.
- **Re-verification evidence:** re-read the four documents; counts now match D6/D13/D29 (31 flat fields
  verified again by direct comparison, 0 mismatches).
- **Closure status:** CLOSED.

### MC10R-F03 — MINOR — CLOSED

- **Files/lines:** `MC10R-BASELINE-AND-SCOPE.md:81-83` versus
  `docs/marea/customer-discovery/data/pricing-ladders.json:16-17`.
- **Original evidence:** D1 described a single sorted-key two-space canonicalisation for all twelve
  hashes, while the ladder's documented recipe is compact order-preserving JSON; the recorded ladder hash
  matches the compact form.
- **Correction:** D1 §6 now states the per-artefact recipes explicitly.
- **Corrective commit:** `ea80ea5927fa5b0df376bbbe71567ad8d86a3853`.
- **Re-verification evidence:** independent recomputation matches all twelve values with the recipes now
  stated; container hashes unchanged.
- **Closure status:** CLOSED.

### MC10R-F04 — MINOR — CLOSED

- **Files/lines:** `scripts/check-marea-customer-recovery.mjs` narrative/count rules (CRR-16/CRR-17);
  `MC10R-IMPLEMENTATION-AND-TEST-EVIDENCE.md:63`.
- **Original evidence:** ES/PT plural reporting verbs and completed-count/percentage claims appended to a
  recovery document were not rejected by the recovery gate alone (the research gate's CR-62 rejected
  them).
- **Correction:** plural ES/PT verbs, expanded preference verbs, participant-percentage claims and
  numbered role-completion counts added to the recovery gate; D20 states the exact lexicon and reliance
  on CR-62 outside it; four D32 cases added.
- **Corrective commit:** `ea80ea5927fa5b0df376bbbe71567ad8d86a3853`.
- **Re-verification evidence:** the ES plural, PT plural, ES percentage and EN role-count appended-claim
  probes now fail CRR-16/CRR-17; recovery gate 32/32; suite 82/82.
- **Closure status:** CLOSED.

### MC10R-F05 — INFORMATIONAL — CLOSED

- **Files/lines:** `MC10R-PI03-PRICING-FEASIBILITY.md:459-460` versus
  `mc10r-recovery.contract.json:276-284`/`sourceNote`.
- **Original evidence:** D7's descriptive `NAMED_SEPARATE_VIEW` code and D27's canonical `NOT_NAMED`
  experiment-eligibility code for SEG-07/SEG-08 on EXP-MC10-04 were unreconciled.
- **Correction:** D4 DR-MC10R-03 addendum, D7 §4.3 reconciliation note and D27 `sourceNote` distinguish
  the reporting-view attribute from the experiment-eligibility attribute; neither makes a cell
  experiment-level eligible.
- **Corrective commit:** `ea80ea5927fa5b0df376bbbe71567ad8d86a3853`.
- **Re-verification evidence:** re-read the three documents; D27 remains the canonical eligibility
  attribute; the two-attribute rule and the 32-cell matrix are unchanged; zero executed cells.
- **Closure status:** CLOSED.

### MC10R-F06 — INFORMATIONAL — OPEN (external limitation, not a defect)

- **Files/lines:** `MC10R-BASELINE-AND-SCOPE.md:48-65`, `MC10R-RECOVERY-EXECUTION-PLAN.md:10` and
  `:323-335`.
- **Observed evidence:** the base relationship is verified locally; the recovery branch has no
  remote-tracking ref in this checkout and GitHub is not reachable from this audit, so the remote branch,
  remote HEAD, stacked-PR base and draft state recorded in D1 remain external claims.
- **Impact:** delivery evidence for the remote side is not audited; no repository artifact is wrong.
- **Required correction:** the Lead must verify the pushed branch, remote HEAD and stacked draft PR base
  after push and record the exact evidence in the delivery record.
- **Responsible agent:** lead.
- **Corrective commit:** null (delivery-time action).
- **Verification evidence:** remote branch ref and PR metadata recorded by the Lead in the delivery
  record.
- **Closure status:** OPEN — external limitation; it does not affect the internal preparation verdict.

## 8. Status-conflation and honesty re-check

I re-checked that a recovery preparation result is never presented as fieldwork permission and that the
MC-10 verdict is never upgraded. The gates reject the conflation cases; my probe E8 was rejected by
CRR-25; no document claims external authorization, legal review, a provisioned store, a trained
interviewer or real research. `MC10 = BLOCKED`, `AUTH-MC10-001 = NOT_GRANTED`,
`OUTREACH_AUTHORIZATION = NOT_GRANTED`, `FIELDWORK_STATUS = BLOCKED` and
`FIELDWORK_READINESS = PARTIALLY_READY` coexist consistently across the recovery package.

## 9. What remains externally blocked

No internal recovery work can close these; they remain real blockers for fieldwork:

1. External research authorization AUTH-MC10-001 (dated, scoped, signed, recorded authority basis) —
   currently `NOT_GRANTED`; the draft is not permission.
2. Verified data-controller identity and verified privacy contact — `OPEN`.
3. Qualified legal review of lawful basis, notices and recruitment communications —
   `LEGAL_REVIEW_PENDING`.
4. Approved participant information, consent process, ES/EN qualified review and any PT review — not
   obtained; Portugal stays excluded.
5. A provisioned access-controlled research store and access review — not provisioned, not reviewed.
6. Appointed, trained and authorized human interviewers with a named fieldwork lead — zero today.
7. Approval of the sampling, segment-quota and protocol amendments — all `PROPOSED_NOT_EFFECTIVE`.
8. Approval of the instrument amendment package (IV-01…IV-09) — `REVIEW_REQUIRED` /
   `DRAFT_FOR_LEGAL_REVIEW`.
9. Approved outreach channels and gatekeeper permissions — none; templates `NOT_APPROVED — NOT_SENT`.
10. Any Portugal scope — excluded pending PT instruments, PT legal review and PT-capable interviewers.

## 10. Conditions and sign-off

The verified end state is:

```
MC10R                        = PASS_INTERNAL_PREPARATION_SCOPE   (internal preparation only)
MC10                         = BLOCKED
AUTH_MC10_001                = NOT_GRANTED
OUTREACH_AUTHORIZATION       = NOT_GRANTED
FIELDWORK_STATUS             = BLOCKED
FIELDWORK_READINESS          = PARTIALLY_READY
PARTICIPANTS / INTERVIEWS / PRICE RESPONSES = 0
PROVISIONED / ACCESS_REVIEWED / OPERATIONALLY_APPROVED = false
TRAINED / APPOINTED INTERVIEWERS = 0
```

I, `agent-g-auditor`, issue `PASS` for the internal preparation scope only. I refuse a primary-research
PASS and a customer-validation PASS; I performed no legal review and provide no legal sign-off; I did not
grant authorization and do not represent a store, interviewer or fieldwork as operational. I wrote only
this review artifact in the audited repository. MC10R-F06 remains an external delivery limitation to be
evidenced by the Lead after push.
