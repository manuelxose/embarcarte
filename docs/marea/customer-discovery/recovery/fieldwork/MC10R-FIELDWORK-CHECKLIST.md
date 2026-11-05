# MC-10R — Fieldwork checklist (D26)

| Field                         | Value                                                                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                   | MC-10R / D26 / `MC10R-FIELDWORK-CHECKLIST`                                                                                                           |
| Document status               | `DRAFT`                                                                                                                                              |
| Date                          | 2026-11-01                                                                                                                                           |
| Owner                         | `agent-d-fieldwork` — Human Interviewer Training and Fieldwork Manager + Marine Recruitment Operations                                               |
| Write scope                   | `docs/marea/customer-discovery/recovery/fieldwork/` only                                                                                             |
| Recovery contract             | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` v`1.0.0`                                                                                                   |
| Recovery work status          | `IN_PROGRESS`                                                                                                                                        |
| External authorization status | `NOT_GRANTED` (`AUTH-MC10-001` revision `2`, `DRAFT_PREPARED`)                                                                                       |
| Fieldwork readiness           | `PARTIALLY_READY`                                                                                                                                    |
| Fieldwork status              | `BLOCKED`                                                                                                                                            |
| Checklist state               | `NOT_STARTED` — no checklist item is executed                                                                                                        |
| Scope                         | The executable pre-fieldwork, per-session and close-out checklist, the 11-state recruitment-funnel design and the current zero counts                |
| Is not                        | An authorization, a session record, a participant record, a result, evidence that any checklist item was completed, or permission to begin fieldwork |

> **STATUS: DRAFT — NOTHING CHECKED, NOTHING EXECUTED.** `AUTH_MC10_001 = NOT_GRANTED`;
> `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED`;
> `FIELDWORK_READINESS = PARTIALLY_READY`. Every checklist item is `BLOCKED` or `NOT_STARTED`;
> `TRAINING_COMPLETION = NOT_PERFORMED`. `PARTICIPANTS = 0`; `INVITATIONS = 0`; `INTERVIEWS = 0`;
> `CONSENT_RECORDS = 0`; `NOTES = 0`. **No item below may be ticked by an agent, and no tick may be
> back-filled.** The recruitment funnel is a design with **all eleven states at 0**; no participant
> exists and no state has been entered.

## 0. How to use this checklist

1. **Fail-closed.** A checklist item is satisfied only by a real, dated evidence item held in the
   approved record location. A row with missing evidence stops the gate; nothing is waived because the
   others pass.
2. **No agent ticks.** Only the accountable human role may record an item as evidenced. No agent may
   mark, simulate, pre-fill or infer a tick.
3. **Status vocabulary.** Checklist item states use the D2 §2 recovery work status values
   (`NOT_STARTED`, `IN_PROGRESS`, `PARTIAL`, `READY_FOR_OWNER_REVIEW`, `PASS_INTERNAL_PREPARATION_SCOPE`,
   `BLOCKED`, `FAIL`). No new status vocabulary is introduced here. `NOT_PERFORMED` is used only for
   training-completion events, as mandated by D22. **No completion label exists in D2 for a generic
   external gate item**, so this document does not invent one; a future revision must agree the
   completion label with the Lead rather than introduce a divergent status.
4. **Current state is real.** Every open item is `BLOCKED` (waiting on an external dependency) or
   `NOT_STARTED` (internal work not begun). Nothing is `PASS_INTERNAL_PREPARATION_SCOPE`, and no item
   may be reported as done.
5. **Four inherited W0 items are already complete** in MC-10 (W0-01 baseline, W0-02 research owner,
   W0-09 geographic scope, W0-16 threshold/ladder freeze). They are prerequisites already satisfied and
   are not repeated as open rows; they do not authorize fieldwork, and W0-16 does not complete the
   candidate `1.1.0` ladder reference (D5 §7.1).
6. **A checklist is not a fieldwork record.** Ticking this document would not create a participant, a
   consent or an interview.

## 1. Current gate state

```
MC10R_RECOVERY_WORK_STATUS     = IN_PROGRESS
MC10_STATUS                    = BLOCKED
AUTH_MC10_001                  = NOT_GRANTED
AUTH_MC10_001_DOCUMENT_STATUS  = DRAFT_PREPARED
OUTREACH_AUTHORIZATION         = NOT_GRANTED
FIELDWORK_STATUS               = BLOCKED
FIELDWORK_READINESS            = PARTIALLY_READY
WAVE1_EXECUTION_STATE          = NOT_STARTED
INTERVIEWERS_AUTHORIZED        = 0
SESSIONS_SCHEDULED             = 0
SESSIONS_COMPLETED             = 0
PARTICIPANTS                   = 0
CONSENT_RECORDS                = 0
NOTES                          = 0
CODED_UNITS                    = 0
```

## 2. Pre-fieldwork checklist

The gate is closed until every row is satisfied with dated evidence. Current states are real.

### 2.1 Authorization and governance

| ID      | Requirement                                     | Evidence required                                                                                                                    | Current state             |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `PF-01` | `AUTH-MC10-001` is `GRANTED`                    | Dated, scoped authorization record issued by a real authorizer                                                                       | `BLOCKED` (`NOT_GRANTED`) |
| `PF-02` | Authorization fields complete                   | Authorizer, date, participant categories, geography, channels, volume cap, spend/incentive position, duration/expiry, fieldwork lead | `BLOCKED`                 |
| `PF-03` | Fieldwork lead named in the authorization       | Appointment record and acceptance (D21 gate `G2`)                                                                                    | `BLOCKED`                 |
| `PF-04` | Data controller designated                      | Designation record with legal identity                                                                                               | `BLOCKED`                 |
| `PF-05` | Verified privacy contact                        | Controller-owned contact record                                                                                                      | `BLOCKED`                 |
| `PF-06` | Qualified legal review complete                 | Dated legal review of lawful basis and recruitment communications                                                                    | `BLOCKED`                 |
| `PF-07` | Lawful basis documented                         | GDPR Art. 6(1)(a) consent analysis with national-law review                                                                          | `BLOCKED`                 |
| `PF-08` | Participant information notice approved (ES/EN) | Approved notice versions with approval reference                                                                                     | `BLOCKED`                 |
| `PF-09` | Consent instrument approved                     | Approved `CONSENT-01` version with four separate permissions                                                                         | `BLOCKED`                 |
| `PF-10` | Retention and deletion procedure approved       | Approved procedure with accountable retention owner                                                                                  | `BLOCKED`                 |
| `PF-11` | Restricted access policy accepted               | Signed acceptance by an operator                                                                                                     | `BLOCKED`                 |
| `PF-12` | Zero-incentive policy approved                  | Dated approval of the `ZERO` incentive policy                                                                                        | `BLOCKED`                 |
| `PF-13` | Spend position recorded                         | Approved spending amount (proposed `ZERO`) and no unauthorized expenditure                                                           | `BLOCKED`                 |

### 2.2 Instruments

| ID      | Requirement                                                          | Evidence required                                                                | Current state                                            |
| ------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `PF-14` | Candidate instrument version `1.1.0` approved for future fieldwork   | Approval record conferring `APPROVED_FOR_FUTURE_FIELDWORK` (not agent-conferred) | `BLOCKED` (`REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`) |
| `PF-15` | Registered amendment defects resolved or formally dispositioned      | Dated amendment records for IV-01…IV-08 or recorded scope decisions              | `BLOCKED`                                                |
| `PF-16` | Monitored-incident question amendment approved                       | Approved amendment closing the `EXP-MC10-09` design gap                          | `BLOCKED`                                                |
| `PF-17` | Closing brand-disclosure script approved                             | Approved `MINOR` amendment text                                                  | `BLOCKED`                                                |
| `PF-18` | Qualified ES/EN bilingual review signed                              | Qualified reviewer sign-off and equivalence record                               | `BLOCKED` (`W0-07 = PARTIAL`)                            |
| `PF-19` | Price-ladder artefact frozen, referenced and hash-verified           | Frozen ladder version, path and hash recorded against the instrument register    | `BLOCKED` (candidate reference incomplete)               |
| `PF-20` | Portuguese instruments available (only if Portugal is ever in scope) | Qualified PT translation and review, frozen as a new instrument version          | `NOT_STARTED` — Portugal is out of Wave 1 scope          |

### 2.3 Interviewers and training

| ID      | Requirement                                                       | Evidence required                                                                                    | Current state                                         |
| ------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `PF-21` | Interviewer roster accepted                                       | D21 `G0`–`G5` evidence per interviewer: acceptance, qualification, conflict declaration, appointment | `NOT_STARTED`                                         |
| `PF-22` | All 16 training modules complete with `PASS`                      | Dated module assessment records per interviewer                                                      | `NOT_STARTED` (`TRAINING_COMPLETION = NOT_PERFORMED`) |
| `PF-23` | Mock verification passed                                          | Scored rubric for a synthetic mock, with no critical failure                                         | `NOT_STARTED`                                         |
| `PF-24` | Supervisor sign-off recorded                                      | Dated sign-off by a real accepted supervisor                                                         | `NOT_STARTED`                                         |
| `PF-25` | Trainers and assessors assigned                                   | Accepted trainer/assessor records, independent of trainee                                            | `NOT_STARTED`                                         |
| `PF-26` | Supervisors assigned and reachable                                | Supervisor appointment and contact record (outside Git)                                              | `NOT_STARTED`                                         |
| `PF-27` | Conflict declarations and data-handling acknowledgements complete | Signed declarations per interviewer                                                                  | `NOT_STARTED`                                         |

### 2.4 Storage, data and escalation

| ID      | Requirement                           | Evidence required                                                                    | Current state                                      |
| ------- | ------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `PF-28` | Layer A store provisioned             | Operational store state `PROVISIONED`                                                | `BLOCKED`                                          |
| `PF-29` | Layer B store provisioned             | Operational store state `PROVISIONED`                                                | `BLOCKED`                                          |
| `PF-30` | Access reviewed                       | Access-list review evidence, state `ACCESS_REVIEWED`                                 | `BLOCKED`                                          |
| `PF-31` | Retention and deletion operational    | State `OPERATIONALLY_APPROVED`; executed test or operational evidence                | `BLOCKED` (`NOT_APPROVED`)                         |
| `PF-32` | Note-submission process tested        | End-to-end synthetic test record with receipt and deletion check                     | `NOT_STARTED`                                      |
| `PF-33` | Incident escalation contacts recorded | Named role contacts for fieldwork lead, data steward, controller and privacy contact | `BLOCKED` (contacts do not exist; D23 §12 `BLANK`) |

### 2.5 Recruitment, communications and scheduling

| ID      | Requirement                                           | Evidence required                                                             | Current state                              |
| ------- | ----------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `PF-34` | At least one outreach channel authorized              | Authorization naming the channel and its conditions                           | `BLOCKED` (`permittedContactMethods = []`) |
| `PF-35` | Institutional permissions recorded where required     | Written gatekeeper permission per channel                                     | `BLOCKED`                                  |
| `PF-36` | Recruitment templates approved (ES and EN)            | Dated per-template, per-language approval records                             | `NOT_STARTED` (`NOT_APPROVED`)             |
| `PF-37` | Recruitment ledger operational outside the repository | Restricted ledger with access control and field specification in force        | `NOT_STARTED`                              |
| `PF-38` | Scheduling process tested                             | Dry-run record with no real candidate and no appointment created              | `NOT_STARTED`                              |
| `PF-39` | Information-to-consent flow tested end-to-end         | Synthetic rehearsal record proving order, granularity and withdrawal handling | `NOT_STARTED`                              |

### 2.6 Plans, quotas and quality

| ID      | Requirement                                 | Evidence required                                                        | Current state                  |
| ------- | ------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------ |
| `PF-40` | Wave 1 plan approved for execution          | Approved D25 version and approval record                                 | `NOT_STARTED` (D25 is `DRAFT`) |
| `PF-41` | Wave 1 quotas recorded in the authorization | Authorized quotas SEG-03 5–8, SEG-01 5–8, SEG-04 5–7, SEG-06 3–5 (18–28) | `BLOCKED`                      |
| `PF-42` | Codebook `ANA-01` v`1.1.0` approved         | Approved codebook version and coding rubric                              | `BLOCKED`                      |
| `PF-43` | Second coder accepted and trained           | Acceptance, calibration and independence declaration                     | `NOT_STARTED`                  |
| `PF-44` | Independent auditor accepted for Wave 1     | Independence declaration and audit-scope acceptance                      | `NOT_STARTED`                  |

**Pre-fieldwork item count:** 44 items — `BLOCKED` 28, `NOT_STARTED` 16. Satisfied: **0**.

## 3. Per-session checklist

A session may begin only when every pre-session item is satisfied. All items are `NOT_STARTED`; no
session exists.

### 3.1 Pre-session

| ID     | Check                                                                 | Evidence / done when                                                      | Current state |
| ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------- |
| `P-01` | Authorization valid for this place, channel and volume                | Authorization reference and scope check                                   | `NOT_STARTED` |
| `P-02` | Candidate eligibility and screening recorded                          | `SCREEN-01` outcome `ELIGIBLE` with reason code                           | `NOT_STARTED` |
| `P-03` | Candidate-specific contact permission recorded                        | Gatekeeper or candidate opt-in record                                     | `NOT_STARTED` |
| `P-04` | Appointment exists and is consistent with the participant's agreement | Real scheduling record (no invented date)                                 | `NOT_STARTED` |
| `P-05` | Information notice provided and read                                  | Notice version and provision timestamp                                    | `NOT_STARTED` |
| `P-06` | Interviewer authorized                                                | D21 role status `AUTHORIZED_FOR_FIELDWORK`                                | `NOT_STARTED` |
| `P-07` | Supervisor contact complete and reachable                             | D23 §12 completed with real values                                        | `NOT_STARTED` |
| `P-08` | Approved instrument version loaded and recorded                       | Version, language and hash reference                                      | `NOT_STARTED` |
| `P-09` | Secure store operational                                              | Store state `OPERATIONALLY_APPROVED`                                      | `NOT_STARTED` |
| `P-10` | Note template ready, no identifiers pre-filled                        | `NOTE-01` version in front of interviewer                                 | `NOT_STARTED` |
| `P-11` | Recording decision tooling ready                                      | `C2` decision path available; recording optional                          | `NOT_STARTED` |
| `P-12` | Language confirmed                                                    | Participant's declared language recorded (`ES`/`EN`); no live translation | `NOT_STARTED` |
| `P-13` | Private environment                                                   | Quiet space; no third party unless separately consented and justified     | `NOT_STARTED` |
| `P-14` | Identity and non-sale statements ready                                | Approved identity statement and non-sale statement                        | `NOT_STARTED` |
| `P-15` | Withdrawal path known                                                 | Interviewer can explain consequences without notes                        | `NOT_STARTED` |
| `P-16` | Incident route known                                                  | Escalation chain and current contacts known                               | `NOT_STARTED` |

### 3.2 During the session

| ID     | Check                                                | Evidence / done when                                                      | Current state |
| ------ | ---------------------------------------------------- | ------------------------------------------------------------------------- | ------------- |
| `D-01` | Identity statement delivered                         | Statement recorded against the approved version                           | `NOT_STARTED` |
| `D-02` | Research-not-sale statement delivered                | Non-sale disclosure delivered verbatim                                    | `NOT_STARTED` |
| `D-03` | Information-before-consent confirmed                 | Order verified before any note or question                                | `NOT_STARTED` |
| `D-04` | `C1` participation recorded                          | Separate decision with date                                               | `NOT_STARTED` |
| `D-05` | `C2` audio recording recorded                        | Separate optional decision with date                                      | `NOT_STARTED` |
| `D-06` | `C3` de-identified wording recorded                  | Separate optional decision with date                                      | `NOT_STARTED` |
| `D-07` | `C4` follow-up recorded                              | Separate optional decision, channel, scope, expiry                        | `NOT_STARTED` |
| `D-08` | Consent script version and language recorded         | Version and language fields populated                                     | `NOT_STARTED` |
| `D-09` | Q1–Q15 administered in order                         | Guide section coverage recorded; deviations flagged                       | `NOT_STARTED` |
| `D-10` | No brand or price before Q11                         | Brand/price exposure check recorded                                       | `NOT_STARTED` |
| `D-11` | Exclusions stated before benefits                    | Concept delivery order recorded                                           | `NOT_STARTED` |
| `D-12` | Comprehension recorded without correction            | Comprehension grid with inclusions, exclusions, misconceptions            | `NOT_STARTED` |
| `D-13` | Price module discipline                              | Only after Q11; disclosure verbatim; frozen ladder; currency/VAT recorded | `NOT_STARTED` |
| `D-14` | Neutral probing                                      | No leading, feature, brand, price or solution probes                      | `NOT_STARTED` |
| `D-15` | No offer, promise or order accepted                  | Non-sale discipline maintained throughout                                 | `NOT_STARTED` |
| `D-16` | Notes captured live with verbatim/paraphrase marking | `NOTE-01` with marked quotes and paraphrases                              | `NOT_STARTED` |
| `D-17` | Withdrawal handled immediately if requested          | Stop, record date/stage, downstream consequences explained                | `NOT_STARTED` |
| `D-18` | Incident handled and escalated if it occurred        | Factual incident note and escalation reference                            | `NOT_STARTED` |

### 3.3 Post-session

| ID     | Check                                                | Evidence / done when                                                | Current state |
| ------ | ---------------------------------------------------- | ------------------------------------------------------------------- | ------------- |
| `A-01` | Note complete with gaps flagged                      | `NOTE-01` complete; unknowns left empty, not `0`                    | `NOT_STARTED` |
| `A-02` | No identifiers or invented amounts                   | Data-hygiene spot-check passed                                      | `NOT_STARTED` |
| `A-03` | Consent record complete and consistent with the note | `C1`–`C4` and version/language reconciled                           | `NOT_STARTED` |
| `A-04` | Concept grid and price fields recorded               | Grid and raw price answers with currency/VAT if administered        | `NOT_STARTED` |
| `A-05` | Quality flags recorded                               | Rushed/leading/confusion/interruption/translation flags as observed | `NOT_STARTED` |
| `A-06` | Deviation log updated                                | Deviation entry with date, section and consequence                  | `NOT_STARTED` |
| `A-07` | Withdrawal recorded if applicable                    | Terminal state `WITHDRAWN`; downstream artefacts respect it         | `NOT_STARTED` |
| `A-08` | Incident record and escalation reference             | Incident logged and escalated per D23 §11                           | `NOT_STARTED` |
| `A-09` | Secure upload completed                              | Upload reference and checksum                                       | `NOT_STARTED` |
| `A-10` | Receipt confirmed by data steward                    | Steward confirmation reference                                      | `NOT_STARTED` |
| `A-11` | Local copies removed                                 | Local notes/audio deleted after confirmed receipt                   | `NOT_STARTED` |
| `A-12` | Supervised debrief completed (initial sessions)      | Debrief record with supervisor and actions                          | `NOT_STARTED` |

**Per-session item count:** 46 items — `NOT_STARTED` 46. Sessions completed: **0**.

## 4. Close-out checklist

| ID     | Requirement                                         | Evidence required                                                  | Current state |
| ------ | --------------------------------------------------- | ------------------------------------------------------------------ | ------------- |
| `C-01` | All sessions accounted for                          | Session log reconciles to the ledger with no orphan record         | `NOT_STARTED` |
| `C-02` | Funnel reconciled                                   | Eleven-state counts consistent; terminal states correct            | `NOT_STARTED` |
| `C-03` | Segment quota status recorded                       | Met/under-recruited per cohort; no substitution or pooling         | `NOT_STARTED` |
| `C-04` | Every completed record consent-valid and reconciled | Per-record validation record                                       | `NOT_STARTED` |
| `C-05` | Double-coding ≥25% complete                         | Coder assignment log and double-coded set                          | `NOT_STARTED` |
| `C-06` | κ computed and reported                             | Observed/expected agreement, κ, units, per-code matrix             | `NOT_STARTED` |
| `C-07` | Negative cases listed explicitly                    | Negative-case register with source records                         | `NOT_STARTED` |
| `C-08` | Deviation log reviewed                              | Review record; amendments dispositioned                            | `NOT_STARTED` |
| `C-09` | Incident log reviewed                               | Incident review and data-incident handling evidence                | `NOT_STARTED` |
| `C-10` | Retention and deletion executed                     | Deletion/retention record per approved policy                      | `NOT_STARTED` |
| `C-11` | Independent audit complete                          | Auditor sample, findings, closure and re-verification              | `NOT_STARTED` |
| `C-12` | Wave 1 close-out report written                     | Report respecting the D25 §4 output classes                        | `NOT_STARTED` |
| `C-13` | Wave 2 decision recorded by humans                  | Research owner and programme owner decision record                 | `NOT_STARTED` |
| `C-14` | Access revoked and data archived                    | Access-revocation and archive record                               | `NOT_STARTED` |
| `C-15` | No claim beyond evidence                            | Close-out report verified against records; status updated honestly | `NOT_STARTED` |

**Close-out item count:** 15 items — `NOT_STARTED` 15.

## 5. Recruitment funnel design and current counts

### 5.1 The eleven funnel states

The funnel is forward-only; no state may be skipped. **`IDENTIFIED` may be entered only when
authorization exists and an authorized channel is in use.** Naming a person in a plan, a document or a
validator is never identification.

|   # | State                 | Meaning                                                                                                                                                   | Allowed next states                 |
| --: | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
|   1 | `IDENTIFIED`          | A real person matching a segment definition was located through an authorized channel and given an anonymous candidate ID; only when authorization exists | `CONTACT_AUTHORIZED`, `EXCLUDED`    |
|   2 | `CONTACT_AUTHORIZED`  | Candidate-specific permission to make contact was recorded (gatekeeper or candidate opt-in)                                                               | `INVITED`, `EXCLUDED`               |
|   3 | `INVITED`             | An **approved** invitation was issued through an authorized channel                                                                                       | `RESPONDED`, `WITHDRAWN`            |
|   4 | `RESPONDED`           | The candidate replied (interest or decline)                                                                                                               | `SCREENED`, `WITHDRAWN`             |
|   5 | `SCREENED`            | `SCREEN-01` was administered and an outcome recorded                                                                                                      | `ELIGIBLE`, `EXCLUDED`, `WITHDRAWN` |
|   6 | `ELIGIBLE`            | Meets the segment definition and passes all exclusions                                                                                                    | `CONSENTED`, `WITHDRAWN`            |
|   7 | `CONSENTED`           | `CONSENT-01` administered after the information notice; `C1`–`C4` recorded separately with dates                                                          | `INTERVIEW_COMPLETED`, `WITHDRAWN`  |
|   8 | `INTERVIEW_COMPLETED` | The interview was actually conducted under the approved protocol and a note was captured                                                                  | `ANALYSIS_ELIGIBLE`, `WITHDRAWN`    |
|   9 | `ANALYSIS_ELIGIBLE`   | Record complete, consent flags valid, quality checks passed, only pseudonymised data remains                                                              | Terminal (unless later withdrawn)   |
|  10 | `WITHDRAWN`           | The participant withdrew at any stage; date and stage recorded; downstream artefacts respect it                                                           | Terminal                            |
|  11 | `EXCLUDED`            | An eligibility or exclusion rule was met; reason code recorded; no further contact                                                                        | Terminal                            |

Transition rules: forward-only; no skipped state; a candidate with a missing required record is counted
in **no** state; a withdrawn participant is counted once in `WITHDRAWN` and never in a later state; no
interview may exist without `CONSENTED`; no `INVITED` may exist without `CONTACT_AUTHORIZED`.

### 5.2 Current funnel counts — all zero

No candidate exists. Every count is 0 because no identification, contact, invitation or interview was
authorized or attempted. These are **current-state** counts; `WITHDRAWN` and `EXCLUDED` are terminal and
are not summed into later states.

| State                 | SEG-03 (A) | SEG-01 (B) | SEG-04 (C) | SEG-06 (D) | Wave 1 total | SEG-02/05/07/08 (not in Wave 1) | Grand total |
| --------------------- | ---------: | ---------: | ---------: | ---------: | -----------: | ------------------------------: | ----------: |
| `IDENTIFIED`          |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `CONTACT_AUTHORIZED`  |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `INVITED`             |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `RESPONDED`           |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `SCREENED`            |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `ELIGIBLE`            |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `CONSENTED`           |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `INTERVIEW_COMPLETED` |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `ANALYSIS_ELIGIBLE`   |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `WITHDRAWN`           |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| `EXCLUDED`            |          0 |          0 |          0 |          0 |            0 |                               0 |           0 |
| **Total records**     |      **0** |      **0** |      **0** |      **0** |        **0** |                           **0** |       **0** |

Aggregates:

```
CANDIDATES_IDENTIFIED         = 0
CANDIDATES_CONTACT_AUTHORIZED = 0
INVITATIONS_SENT              = 0
RESPONSES_RECEIVED            = 0
SCREENINGS_COMPLETED          = 0
ELIGIBLE_CANDIDATES           = 0
CONSENT_RECORDS               = 0
INTERVIEWS_COMPLETED          = 0
ANALYSIS_ELIGIBLE_RECORDS     = 0
WITHDRAWALS                   = 0
EXCLUSIONS                    = 0
```

### 5.3 Funnel arithmetic rules

1. Zero denominators: no percentage may be computed from a zero denominator; such a proportion is
   `NOT_COMPUTED` or `NOT_APPLICABLE`, never `0%`.
2. A planned quota (SEG-03 5–8, SEG-01 5–8, SEG-04 5–7, SEG-06 3–5; total 18–28) is not a count of
   participants and is never entered in the funnel.
3. `INVITED` is never demand; `RESPONDED` interest is never purchase intent; `CONSENTED` is never a
   completed interview.
4. `WITHDRAWN` and `EXCLUDED` are terminal; a person appears once in the state where the journey ended,
   and never in a later state.
5. The funnel file (`docs/marea/customer-discovery/data/recruitment-funnel.json`) remains the
   machine-readable source; this document's counts reconcile to it (all zero).
6. A channel that produced no identification is not evidence about the market; it is a process
   observation only.
7. No state may be entered for a person whose required record is missing; the person is counted in no
   state until the record exists.

## 6. Session record template (blank)

No session record exists. This is the blank schema; every real value is `null`/`BLANK` and must be
filled only from a real session.

| Field                       | Value  | Rule                                                                   |
| --------------------------- | ------ | ---------------------------------------------------------------------- |
| Session ID                  | `null` | Opaque internal ID; never derived from a name                          |
| Candidate anonymous ID      | `null` | Format `MC10-CAND-####`; assigned only after authorized identification |
| Segment                     | `null` | One canonical segment only                                             |
| Interviewer ID              | `null` | Role holder, identity outside Git                                      |
| Language                    | `null` | `ES`/`EN` as declared                                                  |
| Instrument version          | `null` | Version in force at the session                                        |
| Consent script version      | `null` | Version in force                                                       |
| Session date                | `null` | Real date only; no invented date                                       |
| Start time / duration       | `null` | Real values only                                                       |
| `C1` participation          | `null` | Separate decision with date                                            |
| `C2` recording              | `null` | Separate optional decision                                             |
| `C3` de-identified wording  | `null` | Separate optional decision                                             |
| `C4` follow-up              | `null` | Separate optional decision with scope/expiry                           |
| Recording reference         | `null` | Only if `C2` agreed                                                    |
| Note reference              | `null` | `NOTE-01` record ID                                                    |
| Quality flags               | `null` | Observed flags only                                                    |
| Deviation reference         | `null` | Deviation log ID if any                                                |
| Withdrawal status           | `null` | `false`/`true` + date + stage if withdrawn                             |
| Incident reference          | `null` | Incident log ID if any                                                 |
| Supervisor review reference | `null` | Required for initial sessions                                          |
| Analysis eligibility        | `null` | Determined only after reconciliation                                   |

## 7. Sign-off

No sign-off exists. The table is blank by design: no person is assigned, and no signature, name or date
may be invented.

| Role                  | Name    | Signature | Date   | Status       |
| --------------------- | ------- | --------- | ------ | ------------ |
| Research owner        | `BLANK` | `BLANK`   | `null` | `UNASSIGNED` |
| Fieldwork lead        | `BLANK` | `BLANK`   | `null` | `UNASSIGNED` |
| Interviewer(s)        | `BLANK` | `BLANK`   | `null` | `UNASSIGNED` |
| Supervisor / assessor | `BLANK` | `BLANK`   | `null` | `UNASSIGNED` |
| Data steward          | `BLANK` | `BLANK`   | `null` | `UNASSIGNED` |
| Independent auditor   | `BLANK` | `BLANK`   | `null` | `UNASSIGNED` |

## 8. Checklist status summary

| Section       |   Items | `BLOCKED` | `NOT_STARTED` | Satisfied |
| ------------- | ------: | --------: | ------------: | --------: |
| Pre-fieldwork |      44 |        28 |            16 |         0 |
| Per-session   |      46 |         0 |            46 |         0 |
| Close-out     |      15 |         0 |            15 |         0 |
| **Total**     | **105** |    **28** |        **77** |     **0** |

Separate training-completion state (D22): `MODULES_DELIVERED = 0`; `TRAINING_COMPLETION =
NOT_PERFORMED`; `SUPERVISOR_SIGN_OFFS = 0`.

## 9. Prohibited uses of this checklist

1. **No agent ticks.** A checked row is a human-recorded evidence reference, never an agent inference.
2. **No back-filling.** An item cannot be ticked after an event it was supposed to authorize.
3. **No synthetic evidence.** Mock, training and dry-run material is labelled
   `TRAINING_SYNTHETIC_NOT_RESEARCH` and cannot satisfy a checklist item that requires real evidence.
4. **No quota from checklist.** Passing pre-fieldwork rows does not create a participant; reaching a
   quota is not a checklist item.
5. **No implied authorization.** A fully ticked checklist would still not authorize contact without a
   granted, dated, scoped `AUTH-MC10-001`.
6. **No status invention.** This checklist does not create a new status vocabulary and does not
   reinterpret a D2 status to look unblocked.
7. **No participant data in this document.** No name, contact, address, berth, vessel name,
   registration number, transcript or audio may be added to this file.

## 10. Cross-references

| Document                                                     | Relationship                                                     |
| ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `MC10R-RECOVERY-EXECUTION-PLAN.md` (D2)                      | Status authority, canonical quotas, geography, validators        |
| `MC10R-HUMAN-INTERVIEWER-OPERATING-MODEL.md` (D21)           | Roles, acceptance gates, supervision the checklist verifies      |
| `MC10R-INTERVIEWER-TRAINING.md` (D22)                        | Training completion, mock verification and records schema        |
| `MC10R-INTERVIEWER-OPERATIONS-KIT.md` (D23)                  | The session procedure and escalation chain the checklist follows |
| `MC10R-RECRUITMENT-TEMPLATES-ES-EN.md` (D24)                 | Template approval status and communication rules                 |
| `MC10R-WAVE1-EXECUTION-PLAN.md` (D25)                        | Execution sequence, output limits and expansion rule             |
| `docs/marea/customer-discovery/data/recruitment-funnel.json` | Machine-readable funnel this document reconciles to (all zero)   |
| `MC10-RESEARCH-PROTOCOL.md` (MC-10 D4)                       | Wave 0 checklist, interview order and deviation rules            |
| `MC10-FIELDWORK-AUTHORIZATION.md` (MC-10 D2)                 | Authorization gate and unblock sequence                          |

## 11. Status statement

```
DOCUMENT                        = DRAFT
CHECKLIST_ITEMS                 = 105
ITEMS_BLOCKED                   = 28
ITEMS_NOT_STARTED               = 77
ITEMS_SATISFIED                 = 0
FUNNEL_STATES                   = 11
FUNNEL_TOTAL_RECORDS            = 0
PARTICIPANTS                    = 0
INTERVIEWS                      = 0
CONSENT_RECORDS                 = 0
NOTES                           = 0
TRAINING_COMPLETION             = NOT_PERFORMED
AUTH_MC10_001                   = NOT_GRANTED
OUTREACH_AUTHORIZATION          = NOT_GRANTED
FIELDWORK_STATUS                = BLOCKED
FIELDWORK_READINESS             = PARTIALLY_READY
```

Nothing in this checklist is ticked. A checklist is not an authorization, a participant or an
interview, and no reader may treat any row above as evidence that fieldwork occurred.
