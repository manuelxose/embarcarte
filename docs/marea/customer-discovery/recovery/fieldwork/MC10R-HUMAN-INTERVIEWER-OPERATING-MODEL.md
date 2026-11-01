# MC-10R — Human interviewer operating model (D21)

| Field                         | Value                                                                                                                                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                   | MC-10R / D21 / `MC10R-HUMAN-INTERVIEWER-OPERATING-MODEL`                                                                                                                                                              |
| Document status               | `DRAFT`                                                                                                                                                                                                               |
| Date                          | 2026-11-01                                                                                                                                                                                                            |
| Owner                         | `agent-d-fieldwork` — Human Interviewer Training and Fieldwork Manager + Marine Recruitment Operations                                                                                                                |
| Write scope                   | `docs/marea/customer-discovery/recovery/fieldwork/` only                                                                                                                                                              |
| Recovery contract             | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` v`1.0.0`                                                                                                                                                                    |
| Recovery work status          | `IN_PROGRESS`                                                                                                                                                                                                         |
| External authorization status | `NOT_GRANTED` (`AUTH-MC10-001` revision `2`, document status `DRAFT_PREPARED`)                                                                                                                                        |
| Fieldwork readiness           | `PARTIALLY_READY`                                                                                                                                                                                                     |
| Fieldwork status              | `BLOCKED`                                                                                                                                                                                                             |
| Scope                         | Organisational responsibilities, separation of duties, interviewer qualification criteria, conflict-of-interest disclosure, human acceptance mechanism and current role status for the future MC-10R Wave 1 fieldwork |
| Is not                        | An appointment, an authorization, a roster, a training record, a supervision schedule, a schedule of interviews or evidence that any interviewer or participant exists                                                |

> **STATUS: DRAFT — INTERNAL PREPARATION ONLY.** `AUTH_MC10_001 = NOT_GRANTED`;
> `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED`;
> `FIELDWORK_READINESS = PARTIALLY_READY`. `ROLES_ASSIGNED = 0`; `INTERVIEWERS_ACCEPTED = 0`;
> `INTERVIEWERS_TRAINED = 0`; `INTERVIEWS = 0`. **No role in this document is assigned. No person is
> named, appointed, trained, supervised, available or scheduled. A role description is not a role
> assignment, and no agent may treat this document as evidence that a human accepted any role.**

## 0. Purpose, authority and reading rules

MC-10R prepares the human field-execution layer so that real fieldwork could begin **after** a real
written authorization and a real human appointment process. This document defines **who is responsible
for what**, **how a person becomes effective in a role**, and **why nobody is effective today**. It is
binding preparation for the recovery gate; it does not execute anything.

Reading rules:

1. **D2 is the status authority.** Status strings in this document come from
   `MC10R-RECOVERY-EXECUTION-PLAN.md` §2 and §3. Operational labels introduced for the assignment
   process (G0–G5 gates) are process labels **subordinate to** D2 status families; they do not create,
   replace or extend a D2 status.
2. **A role is not a person.** Every role in §2 is a function, not an occupant. The role-status table in
   §7 records `UNASSIGNED` for every role because no real human acceptance record exists anywhere.
3. **A document cannot appoint.** This file, the Master Prompt, a task-board assignment, an agent's
   statement, a validator pass, a schema field or an organisational chart cannot make a role effective.
   Only a recorded acceptance by a real person can (see §6).
4. **No invented humans.** No name, credential, availability, supervisor, trainer, assessor, interviewer
   or organisation is invented. Where a value would be a person or a contact, this document records
   `OPEN`, `UNASSIGNED`, `NOT_ASSIGNED` or `BLANK`.
5. **Agents hold no role.** No AI agent may act as interviewer, participant, supervisor, trainer,
   assessor, data steward, coder, second coder or auditor for real research, and no agent may
   self-certify or simulate any of those acts (§9).
6. **Preparation is not readiness.** This document moves the recovery package toward
   `PARTIALLY_READY`; it does not move fieldwork off `BLOCKED`, and it does not unblock
   `AUTH-MC10-001`.

Authoritative state, quoted from the Lead-owned records:

```
MC10R_RECOVERY_WORK_STATUS     = IN_PROGRESS
MC10_STATUS                    = BLOCKED
AUTH_MC10_001                  = NOT_GRANTED
AUTH_MC10_001_DOCUMENT_STATUS  = DRAFT_PREPARED
OUTREACH_AUTHORIZATION         = NOT_GRANTED
FIELDWORK_STATUS               = BLOCKED
FIELDWORK_READINESS            = PARTIALLY_READY
INTERVIEWERS_ASSIGNED          = 0
INTERVIEWERS_TRAINED           = 0
INTERVIEWS                     = 0
PARTICIPANTS                   = 0
```

## 1. Operating principle

The future fieldwork design uses a **small, supervised, rotating human panel** rather than a single
interviewer, because the study depends on neutral delivery of a fixed instrument and on auditable
evidence. The model rests on five rules:

1. **One responsibility, one accountable role.** Every operational action has exactly one accountable
   role, named in §2. Shared accountability is not accountability.
2. **No self-approval.** Nobody approves their own qualification, training, sign-off, coding or audit
   (§4).
3. **The interviewer is not the analyst of their own session as the only coder.** Sessions are coded by
   the qualitative analyst and independently double-coded by the second coder (§2.5, §2.6).
4. **Evidence travels with the person, not with the document.** Acceptance, training and authorization
   are recorded as dated evidence outside the repository; the repository holds only status and
   aggregate counts (§6, §10).
5. **The gate is fail-closed.** A missing appointment, qualification, acceptance, training sign-off,
   conflict declaration or supervision arrangement keeps the corresponding action unauthorised. Nothing
   is waived because the rest of the package is complete.

## 2. Role catalogue

Seven roles make up the fieldwork organisation. Support functions that are **not** fieldwork roles and
remain outside this model are listed in §2.8 so that their absence is not mistaken for a role gap inside
D21.

### 2.1 Research owner

| Field               | Definition                                                                                                                                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role ID             | `ROLE-RESEARCH-OWNER`                                                                                                                                                                                                                                                     |
| Mandate             | Owns the study scope, the preregistered design and the major methodological decisions. Approves study-scope changes, sampling/scope amendments, instrument-amendment packages and the final report framing. Is accountable to the programme owner for research integrity. |
| May decide          | Whether a wave proceeds after a quality review; whether a methodological deviation is acceptable; whether a segment is judged under-recruited; whether an amendment is proposed.                                                                                          |
| May not             | Conduct participant sessions; act as trainer, assessor or supervisor of training; code; act as second coder; audit the study; approve their own amendment; approve a threshold change to fit observed data.                                                               |
| Coordination        | Receives the fieldwork lead's quality-review report and the independent auditor's compliance report; approves the wording and scope of deviation and amendment records.                                                                                                   |
| Acceptance evidence | A dated written acceptance of the D21 role and the D2/§4 methodology boundaries, a conflict-of-interest declaration, and a written appointment recorded by the programme owner (all outside this repository).                                                             |
| Current status      | `UNASSIGNED`                                                                                                                                                                                                                                                              |
| Comment             | The MC-10 programme directorship recorded as W0-02 `COMPLETE` is a different, pre-existing programme accountability. It is **not** the D21 Wave 1 research-owner acceptance and does not make this role effective.                                                        |

### 2.2 Fieldwork lead

| Field               | Definition                                                                                                                                                                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role ID             | `ROLE-FIELDWORK-LEAD`                                                                                                                                                                                                                                                            |
| Mandate             | Owns approved interviewer operations: the accepted roster, scheduling within the authorized window, segment quotas, supervision of initial sessions, evidence-handling chain, and incident escalation. Ensures the approved instrument version is the one used in every session. |
| May decide          | Which accepted interviewer is assigned to which authorized segment; when to pause recruitment for a segment; when to suspend an interviewer pending review; when to escalate an incident.                                                                                        |
| May not             | Approve their own training, acceptance or supervision; act as independent auditor of the fieldwork they lead; alter the instrument, quotas or thresholds; schedule any session before the gate in §5 is fully evidenced; contact a participant outside an authorized channel.    |
| Coordination        | Reports to the research owner; receives acceptance records from the appointment process; hands evidence to the data steward; refers data incidents to the data steward and the data controller.                                                                                  |
| Acceptance evidence | Dated written acceptance of D21, D23 and D26, a conflict-of-interest declaration, availability commitment for the authorized window, and an appointment recorded by the programme owner (outside the repository).                                                                |
| Current status      | `UNASSIGNED`                                                                                                                                                                                                                                                                     |
| Comment             | The planning documents refer to a fieldwork lead as a required authorization field. That field is `null` in `AUTH-MC10-001`; no fieldwork lead exists.                                                                                                                           |

### 2.3 Human interviewers

| Field               | Definition                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role ID             | `ROLE-INTERVIEWER` (multiple positions, currently zero)                                                                                                                                                                                                                                                                                                                          |
| Mandate             | Conduct authorized research conversations using the approved instrument version, in the participant's declared language, with the approved consent sequence, and record real responses and real consent decisions accurately and completely. Protect participant rights and data throughout the session.                                                                         |
| May decide          | How to ask an approved neutral probe; when to pause for participant distress; when to stop a session for a consent or safety reason; when to escalate an incident.                                                                                                                                                                                                               |
| May not             | Recruit outside an authorized channel; promise availability, price, launch, certification, compatibility or early access; offer an incentive; improvise question wording; translate live; record without the separate recording permission; coach or correct during comprehension; continue after withdrawal; code their own session as sole coder; train or certify themselves. |
| Coordination        | Scheduled by the fieldwork lead; works to D23; submits notes through the approved secure process; reports incidents to the fieldwork lead.                                                                                                                                                                                                                                       |
| Acceptance evidence | Identity and contact held outside the repository (Layer A, not provisioned); documented qualification evidence against §3; completed training with supervisor sign-off (§8 and D22); conflict declaration; data-handling acknowledgement; language proficiency verified by a real assessor for the language of delivery.                                                         |
| Current status      | `UNASSIGNED` / `UNTRAINED`                                                                                                                                                                                                                                                                                                                                                       |
| Comment             | `INTERVIEWER_ROSTER = []`. Applying this document's requirements to a real person is future work that requires a real person to exist and accept.                                                                                                                                                                                                                                |

### 2.4 Data steward

| Field               | Definition                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role ID             | `ROLE-DATA-STEWARD`                                                                                                                                                                                                                                                                                                                             |
| Mandate             | Owns restricted storage and access: operates the approved Layer A (identity/contact keys) and Layer B (pseudonymous research records) stores when they exist, grants and revokes access, executes retention and deletion, reconciles the recruitment ledger against the notes, and keeps the audit trail that the independent auditor inspects. |
| May decide          | Access grant/revocation within the approved policy; deletion execution on a valid request or scheduled expiry; whether a record is complete enough to be reconcilable.                                                                                                                                                                          |
| May not             | Interpret or code research data; alter a participant's answers; create participant data; fabricate completion evidence; keep a copy of Layer A or Layer B data in Git, chat or tickets; approve the retention policy they execute.                                                                                                              |
| Coordination        | Receives notes through the secure submission process; confirms receipt to the fieldwork lead; handles withdrawal and erasure with the data controller; hands aggregate counts to the research owner.                                                                                                                                            |
| Acceptance evidence | Dated data-handling acceptance, access-policy acceptance, storage-operations briefing completion, conflict declaration, appointment record; the store itself must be `PROVISIONED`, `ACCESS_REVIEWED` and `OPERATIONALLY_APPROVED`.                                                                                                             |
| Current status      | `UNASSIGNED`                                                                                                                                                                                                                                                                                                                                    |
| Comment             | No store exists (`PROVISIONED = false`), so the role could not be operated even if a person accepted it.                                                                                                                                                                                                                                        |

### 2.5 Qualitative analyst

| Field               | Definition                                                                                                                                                                                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role ID             | `ROLE-QUALITATIVE-ANALYST`                                                                                                                                                                                                                                        |
| Mandate             | Codes valid interviews against the frozen codebook (`ANA-01` v`1.1.0` candidate), applies the preregistered theme families, reports negative cases explicitly, computes only denominators that exist, and prepares the aggregate analysis for independent review. |
| May decide          | Code application within the codebook; how to represent an ambiguous unit (with the ambiguity recorded); which negative cases need discussion with the second coder.                                                                                               |
| May not             | Interview participants in sessions they alone code; edit raw notes beyond a documented factual correction; remove or hide negative cases; relax a threshold; report a percentage from a zero denominator; code an invalid or withdrawn record.                    |
| Coordination        | Receives reconciled records from the data steward; works with the second coder; reports coding results to the research owner.                                                                                                                                     |
| Acceptance evidence | Dated acceptance, codebook-calibration completion using non-participant material only, conflict declaration, appointment record.                                                                                                                                  |
| Current status      | `UNASSIGNED`                                                                                                                                                                                                                                                      |
| Comment             | No interview exists to code; `CODED_UNITS = 0`.                                                                                                                                                                                                                   |

### 2.6 Second coder

| Field               | Definition                                                                                                                                                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role ID             | `ROLE-SECOND-CODER`                                                                                                                                                                                                        |
| Mandate             | Independently codes the preregistered proportion of completed records (at least 25%, rounded up, stratified by segment), reports agreement, expected agreement and Cohen's κ, and does not defer to the analyst's coding.  |
| May decide          | Their own provisional codes; whether a disagreement requires adjudication; whether a code definition is ambiguous enough to raise to the research owner.                                                                   |
| May not             | Be the interviewer of the session they are double-coding as the only other coder; discuss codes before independent coding is recorded; code withdrawn/invalid records; alter the codebook without the amendment procedure. |
| Coordination        | Works independently of the analyst; agreements and disagreements go to adjudication with the research owner; results feed the quality review.                                                                              |
| Acceptance evidence | Dated acceptance, codebook-calibration completion, independence declaration (no reporting line or close working relationship to the analyst for the coded set), conflict declaration, appointment record.                  |
| Current status      | `UNASSIGNED`                                                                                                                                                                                                               |
| Comment             | `DOUBLE_CODED_RECORDS = 0`; `KAPPA = NOT_COMPUTED`.                                                                                                                                                                        |

### 2.7 Independent auditor

| Field               | Definition                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Role ID             | `ROLE-INDEPENDENT-AUDITOR`                                                                                                                                                                                                                                                                                                                                   |
| Mandate             | Verifies compliance and evidence integrity: that acceptance and training records exist and match the roster, that consent records match sessions, that the funnel reconciles, that deviations and incidents were logged, that storage states are evidenced, and that no results are reported beyond the evidence. Reports findings; does not author results. |
| May decide          | What to inspect; how to sample records; when to classify a finding as blocking; when to require re-verification.                                                                                                                                                                                                                                             |
| May not             | Author research results, training records, recruitment records, coding or conclusions; conduct interviews; create or alter participant data; audit their own authored documents; be the research owner, fieldwork lead, analyst or second coder for the wave under audit.                                                                                    |
| Coordination        | Reports to the research owner and programme owner; findings block the wave close-out until closed and re-verified.                                                                                                                                                                                                                                           |
| Acceptance evidence | Written independence declaration, dated acceptance of the audit scope, appointment record.                                                                                                                                                                                                                                                                   |
| Current status      | `UNASSIGNED`                                                                                                                                                                                                                                                                                                                                                 |
| Comment             | An MC-10 reviewer existed for the prior preparation scope; that review is not an MC-10R fieldwork audit and confers no role here.                                                                                                                                                                                                                            |

### 2.8 Functions that are not D21 roles

These are separate functions whose absence blocks fieldwork but which are not assigned or defined as
D21 operational roles:

| Function               | Current state                                            | Why it is not a D21 role                                                                                                                      |
| ---------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Data controller        | `OPEN` / undesignated                                    | It is a legal governance appointment (D13/D15), not a fieldwork function. The controller owns the lawful basis, notices and rights decisions. |
| Privacy contact        | `OPEN`                                                   | Must be a verified contact of the controller; cannot be invented and is not an interviewer responsibility.                                    |
| Legal adviser          | `NOT_ENGAGED`                                            | Qualified legal review is an external professional service, not a fieldwork role the programme can fill by drafting.                          |
| Research methodologist | Preparation author (`agent-a-methodologist` design only) | Owns design, protocol and codebook documents; does not conduct Wave 1 sessions and is not a substitute for the analyst role.                  |
| Programme owner        | Programme directorship                                   | Approves the recovery and the authorization; is not the fieldwork lead and does not supervise sessions.                                       |

## 3. Interviewer qualification criteria

A person may be considered for `ROLE-INTERVIEWER` only against all ten criteria below. Each criterion
needs **verified evidence**, not a self-description. Where verification requires a qualified third
party, that third party must be a real person; if none exists, the criterion stays `OPEN` and the
candidate cannot be accepted. No agent may satisfy, simulate or certify any criterion.

|   # | Criterion                              | Minimum verified evidence                                                                                                                                                                    | How it would be assessed                                                                                                                            | Disqualifier / failure                                                                                                |
| --: | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
|  Q1 | Language proficiency                   | Documented proficiency in the language of delivery (Spanish or English), sufficient to read the instrument and consent scripts verbatim and to record answers accurately.                    | Real qualified-language assessor interview or verified language credential; a scripted read-back of the frozen instrument in the delivery language. | Cannot read the consent script verbatim; cannot record distinctions of meaning; insists on translating live.          |
|  Q2 | Interviewing experience                | Demonstrated experience conducting open, non-directive interviews (research, professional or equivalent), with at least one observed practice conversation.                                  | Documented history plus an observed practice session scored against the D22 rubric.                                                                 | Only closed-question/sales experience; argues with the respondent; leads.                                             |
|  Q3 | Neutral questioning                    | Demonstrated ability to ask approved neutral probes, stay silent, avoid suggesting categories, solutions, brands or prices, and avoid approval signals.                                      | Observed practice conversation plus targeted leading-question drills scored on the D22 rubric.                                                      | Asks "wouldn't you agree…"; names a solution or brand before the approved step; signals the desired answer.           |
|  Q4 | Marine domain familiarity or training  | Sufficient familiarity with vessels, electronics, installation and marina operations to follow answers without inventing technical facts, **or** completion of the approved domain briefing. | Domain briefing attendance recorded against a versioned outline plus a short supervised knowledge check.                                            | Invents compatibility or technical facts; corrects a participant's technical claim; cannot follow basic terminology.  |
|  Q5 | Privacy understanding                  | Demonstrated understanding of voluntary participation, the four separate permissions, data minimisation, pseudonymisation, retention and rights.                                             | Structured privacy briefing plus scenario questions from D22 module 5 and 14.                                                                       | Treats consent as a formality; bundles permissions; offers confidentiality the design cannot give.                    |
|  Q6 | Secure data handling                   | Demonstrated ability to follow the approved note-submission process, keep identifiers out of notes and never copy records into email, chat or personal storage.                              | Observed data-handling walkthrough plus a signed data-handling acknowledgement.                                                                     | Sends notes by unapproved channel; records names or berths; keeps local copies.                                       |
|  Q7 | Ability to follow approved instruments | Demonstrated fidelity to the frozen instrument version: wording, order, gates, required disclosures and stop points.                                                                         | Read-back and timed run-through of `GUIDE-01`/`CONSENT-01` candidate version; open-book fidelity check.                                             | Improvises questions; reorders the guide; skips the price disclosure; uses a different version.                       |
|  Q8 | Conflict-of-interest disclosure        | A complete written disclosure (employment, commercial interest, relationships, prior research, competing-vendor links) with no disqualifying conflict, renewed before each wave.             | Disclosure review by the fieldwork lead; standing exclusions applied (§3.1).                                                                        | Employee of a competing marine-electronics vendor; undisclosed commercial interest; refuses disclosure.               |
|  Q9 | Availability for supervision           | Committed availability for training, supervised initial sessions, debriefs and quality reviews within the authorized window.                                                                 | Written availability commitment and supervisor confirmation.                                                                                        | Cannot attend supervision; unavailable for initial-session observation; wants unsupervised start.                     |
| Q10 | Ability to handle withdrawal           | Demonstrated calm, non-persuasive handling of decline, pause, skip and withdrawal, including the downstream record consequences.                                                             | Scenario drills from D22 module 15; observed handling of a scripted withdrawal request.                                                             | Argues with withdrawal; offers an incentive to continue; records after withdrawal; omits the withdrawal from the log. |

### 3.1 Standing exclusions and disclosures

A candidate is excluded if any of the following is true. These mirror the MC-10 recruitment exclusions
and the `prohibitedTargets` in the authorization register; they are not negotiable:

- Under 18 years of age, or a vulnerable person.
- An employee, contractor or agent of EMBARCARTE / MAREA in a research or commercial role.
- An employee, contractor, reseller or distributor of a competing marine-electronics manufacturer.
- A person with direct commercial responsibility for the sale, pricing or promotion of MAREA products.
- A person recorded as a participant in the same study.
- A person whose conflict disclosure is incomplete, or who declines to disclose.

A disclosed conflict does not automatically exclude; it must be recorded and adjudicated by the
fieldwork lead and the research owner, and the person must be walled off from any affected coding or
analysis. The conflict register lives outside the repository.

## 4. Separation of duties

The following rules are validity requirements. They are stated before any person is considered so that
role assignment cannot be arranged around them later.

| Rule     | Statement                                                                                                                                           | Rationale                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `SOD-01` | No person approves their own qualification, training, supervisor sign-off or role acceptance.                                                       | Self-approval makes the evidence circular.                     |
| `SOD-02` | No person acts as their own supervisor, trainer or assessor.                                                                                        | Supervision must be independent of the supervised act.         |
| `SOD-03` | An interviewer is never the sole coder of their own session.                                                                                        | Interviewer framing and coding would share the same bias.      |
| `SOD-04` | The second coder is independent of the interviewer for the double-coded record and codes before discussion.                                         | Double coding must be genuine.                                 |
| `SOD-05` | The data steward does not code; coders do not administer storage access.                                                                            | Access administration and interpretation are different powers. |
| `SOD-06` | The independent auditor authors no result, training record, recruitment record or role acceptance they audit.                                       | Audit independence.                                            |
| `SOD-07` | The research owner does not conduct Wave 1 participant sessions, and the fieldwork lead does not approve the only acceptance for their own role.    | Preserves approval independence at the smallest team size.     |
| `SOD-08` | The trainer/assessor is not the trainee's line manager where a line relationship exists; if unavoidable, a second independent sign-off is required. | Reduces coercion in a small organisation.                      |
| `SOD-09` | No AI agent performs any role action in §2; agents only draft internal documents.                                                                   | Synthetic execution is never research evidence.                |

## 5. Assignment gates (process labels, not D2 statuses)

A real person becomes effective only by passing gates `G0`–`G5` in order. Each gate requires a recorded
evidence item held outside this repository. The gates cannot be waived, combined or back-dated.

| Gate | Requirement                                                                                       | Evidence item (outside repository)                                             | Failure effect                         |
| ---- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| `G0` | Role is open and the person is identifiable by a real accountable party                           | Role requisition record (no identity in Git)                                   | Role stays `UNASSIGNED`                |
| `G1` | Candidate has been nominated by the fieldwork lead or research owner                              | Dated nomination record                                                        | No process starts                      |
| `G2` | Candidate accepts the role in writing, with scope and obligations                                 | Dated written acceptance by the person                                         | Nothing is effective                   |
| `G3` | Qualification evidence against §3 is verified by a real assessor                                  | Verification record, assessor identity recorded outside Git                    | Candidate cannot be trained for a role |
| `G4` | Training and supervisor sign-off are complete (D22)                                               | Training record with modules, dates, assessor and supervisor sign-off          | Candidate is `UNTRAINED`               |
| `G5` | Authorization, storage and instrument prerequisites are satisfied and the appointment is recorded | Authorization revision, storage state, instrument approval, appointment record | Candidate cannot be scheduled          |

**Current gate state for every role: `G0` not started.** There is no requisition, nomination, candidate,
assessor, trainer or appointment.

## 6. Human acceptance mechanism

### 6.1 What counts as acceptance

An acceptance exists only when **all** of the following are recorded by a real person, dated, and held
outside the repository:

1. The person's written acceptance of the role and its obligations (D21 role, D23 operating kit, D26
   checklist, D2 boundaries).
2. Verified qualification evidence against §3, signed by a real assessor.
3. A complete conflict-of-interest declaration.
4. A data-handling acknowledgement and an availability commitment.
5. A supervisor/assessor acceptance covering training and sign-off (D22).
6. An appointment record naming the role, the wave, the authorized scope and the appointing account.

Until all six exist, the role status is `UNASSIGNED` or `ASSIGNMENT_IN_PROGRESS`. The repository may
record only the status and the count; identity, contact details and evidence documents live in the
approved Layer A store, which is **not provisioned**.

### 6.2 Operational role-status labels

The following labels are used **only** in this operating model to describe assignment progress. They are
not D2 status families and must not be reported as recalibration of the D2 status model.

| Label                      | Meaning                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `UNASSIGNED`               | No real person is associated with the role.                                                                            |
| `ASSIGNMENT_IN_PROGRESS`   | A real nomination exists; acceptance or verification is incomplete.                                                    |
| `ASSIGNED_NOT_AUTHORIZED`  | Acceptance and training are recorded, but a prerequisite (authorization, storage, instrument, appointment) is missing. |
| `AUTHORIZED_FOR_FIELDWORK` | All gates `G0`–`G5` are evidenced and the person may be scheduled within the authorized scope.                         |
| `SUSPENDED`                | A quality, compliance or data incident has paused the person's fieldwork pending review.                               |
| `RELEASED`                 | The person has left the role; access is revoked and records are retained per policy.                                   |

### 6.3 Invalid forms of appointment

The following are **never** acceptance and must be rejected:

- A role name appearing in a document, schema, task board, chart or validator.
- An agent stating that a role is filled.
- A "TBD" or "team member" placeholder replaced with a plausible-looking name.
- A signature, credential, referee, certificate or training date that has no real source.
- An acceptance recorded after the session it was supposed to authorize.
- An appointment whose evidence is stored only in this repository.

## 7. Role-status table (current, real state)

Every role is `UNASSIGNED`. No acceptance evidence exists for any role, in any form.

| Role                | Role ID                    | Required acceptance evidence                                                                                                                                                                                | Current status             | Training state   | Authorized for any session |
| ------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------- | -------------------------- |
| Research owner      | `ROLE-RESEARCH-OWNER`      | Written role acceptance, conflict declaration, appointment record, methodology-boundary acceptance                                                                                                          | `UNASSIGNED`               | `NOT_APPLICABLE` | No                         |
| Fieldwork lead      | `ROLE-FIELDWORK-LEAD`      | Written acceptance of D21/D23/D26, conflict declaration, availability commitment, appointment record                                                                                                        | `UNASSIGNED`               | `NOT_APPLICABLE` | No                         |
| Human interviewers  | `ROLE-INTERVIEWER`         | Identity (outside Git), qualification evidence `Q1`–`Q10`, conflict declaration, data-handling acknowledgement, language verification, D22 training completion with supervisor sign-off, appointment record | `UNASSIGNED` (0 positions) | `UNTRAINED`      | No                         |
| Data steward        | `ROLE-DATA-STEWARD`        | Data-handling acceptance, access-policy acceptance, storage-operations briefing, conflict declaration, appointment record, operational store                                                                | `UNASSIGNED`               | `NOT_APPLICABLE` | No                         |
| Qualitative analyst | `ROLE-QUALITATIVE-ANALYST` | Role acceptance, codebook-calibration completion, conflict declaration, appointment record                                                                                                                  | `UNASSIGNED`               | `NOT_APPLICABLE` | No                         |
| Second coder        | `ROLE-SECOND-CODER`        | Role acceptance, codebook-calibration completion, independence declaration, conflict declaration, appointment record                                                                                        | `UNASSIGNED`               | `NOT_APPLICABLE` | No                         |
| Independent auditor | `ROLE-INDEPENDENT-AUDITOR` | Independence declaration, audit-scope acceptance, appointment record                                                                                                                                        | `UNASSIGNED`               | `NOT_APPLICABLE` | No                         |

Aggregate counts, current:

```
ROLES_DEFINED                 = 7
ROLES_ASSIGNED                = 0
ROLES_WITH_ACCEPTANCE_EVIDENCE = 0
INTERVIEWER_POSITIONS_OPEN    = 0 (no requisition exists)
INTERVIEWER_ROSTER            = []
INTERVIEWERS_TRAINED          = 0
INTERVIEWERS_AUTHORIZED       = 0
SUPERVISORS_ASSIGNED          = 0
TRAINERS_ASSIGNED             = 0
```

## 8. Supervision and preparation requirements

These requirements are defined now so that supervision cannot be improvised once authorization exists.
None is currently satisfied.

| Requirement | Rule                                                                                                                                                                                     | Current status                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `SUP-01`    | Every newly accepted interviewer is observed in at least the first two sessions; the first is directly observed by the fieldwork lead or an approved supervisor, and both are debriefed. | `NOT_STARTED` — no interviewer, no supervisor |
| `SUP-02`    | The observed sessions are scored against the D22 rubric before the interviewer is cleared for unsupervised sessions.                                                                     | `NOT_STARTED`                                 |
| `SUP-03`    | A 10% random sample of subsequent sessions is reviewed for instrument fidelity and consent completeness.                                                                                 | `NOT_STARTED`                                 |
| `SUP-04`    | The fieldwork lead holds a weekly quality review while a wave is active; the independent auditor samples the review record.                                                              | `NOT_STARTED`                                 |
| `SUP-05`    | Suspension is immediate on a consent breach, a data incident, a fabrication suspicion or repeated instrument deviation; suspension is recorded and reviewed by the research owner.       | `NOT_STARTED`                                 |
| `SUP-06`    | Trainers and assessors are real, qualified humans accepted for those functions; they are not invented and not agents.                                                                    | `UNASSIGNED`                                  |

The D22 mock verification and supervisor sign-off are the entry point to `SUP-01`; they cannot be
performed by the trainee, by the fieldwork lead acting alone, or by an agent.

## 9. Prohibited actions and non-negotiables

The following are prohibited for every role and every agent, at all times:

1. **No invented people.** No name, credential, availability, supervisor, trainer, assessor,
   interviewer, participant or organisation may be created to fill a field or satisfy a validator.
2. **No self-certification.** No person signs off their own qualification, training, mock verification,
   conflict declaration or appointment.
3. **No agent certification.** No AI agent may mark training complete, simulate a mock interview result,
   approve a role, or act as a role. Agents may draft and review internal documents only.
4. **No retroactive authority.** A role acceptance cannot be recorded after the session it authorizes,
   and a document cannot state that a role "was assigned" when it was not.
5. **No document-based appointment.** A schema field, a role table, a task assignment, a validator pass
   or a delivery summary never makes a role effective.
6. **No unauthorized contact.** No role authorizes external contact before `AUTH-MC10-001` is `GRANTED`
   with a named channel and volume.
7. **No commercial role.** No interviewer may sell, promise, discount, offer early access or accept an
   order; the research is not a product sale.
8. **No data outside the approved store.** No role may hold participant-identifying data in Git, chat,
   email, tickets or personal storage.
9. **No role multiplication to look ready.** Opening a role requisition, drafting a roster or listing
   positions is not assignment, training or readiness.
10. **No documentation weakening.** If a D2 status appears inconsistent with reality, it is reported to
    the Lead; it is never reinterpreted to look unblocked.

## 10. Records, privacy and retention

- Identity and contact data for any future role holder live in the restricted Layer A store, outside
  this repository, with an access list and a deletion date. They never enter Git.
- This repository may record only: role identifiers, role status, counts, qualification criteria,
  acceptance evidence _types_ and training-record _schemas_ — never a person's name, contact detail,
  CV, credential number, signature or identity document.
- The role-status table in §7 is the only intended machine-readable content; a future schema may mirror
  it, but it must default to `UNASSIGNED` and reject any status without evidence references.
- Training records follow the D22 schema and live outside the repository once they contain real people.
  Until then, the schema's real values are `null` and the completion state is `NOT_PERFORMED`.
- Retention of role evidence follows the governance design (D15/D16): no operational store exists yet,
  so no deadline can be executed today.

## 11. Interaction with the other MC-10R deliverables

| Document                                                                                 | Relationship                                                                                                    |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `MC10R-RECOVERY-EXECUTION-PLAN.md` (D2)                                                  | Status authority, recovery model, canonical quotas and geography; this document is subordinate to it            |
| `MC10R-INTERVIEWER-TRAINING.md` (D22)                                                    | Defines the 16-module curriculum, synthetic mock verification and the training-record schema that `G4` requires |
| `MC10R-INTERVIEWER-OPERATIONS-KIT.md` (D23)                                              | The manual a real interviewer follows; referenced by acceptance obligation 1 in §6.1                            |
| `MC10R-RECRUITMENT-TEMPLATES-ES-EN.md` (D24)                                             | Draft communication materials used only after authorization and template approval                               |
| `MC10R-WAVE1-EXECUTION-PLAN.md` (D25)                                                    | The runnable first-wave protocol; this model is one of its prerequisites                                        |
| `MC10R-FIELDWORK-CHECKLIST.md` (D26)                                                     | Executable checklist that records the same `UNASSIGNED`/`BLOCKED` states                                        |
| D13/D14 (authorization), D15/D16 (legal/privacy), D17–D20 (storage), D27–D32 (validator) | External dependencies: authorization, controller/legal, secure store and gate validation                        |

## 12. What this document can and cannot establish

It **can** establish: the seven-role structure, the responsibilities and prohibitions of each role, the
ten qualification criteria, the separation-of-duties rules, the acceptance mechanism and the current
real status of every role.

It **cannot** establish: that any person exists for any role; that any person is qualified, trained,
supervised or available; that any authorization, store or instrument approval is in place; that any
session occurred; or that fieldwork readiness has advanced beyond `PARTIALLY_READY`.

## 13. Status statement

```
DOCUMENT                        = DRAFT
ROLE_MODEL                      = PREPARED_NOT_EFFECTIVE
ROLES_ASSIGNED                  = 0
INTERVIEWERS_ACCEPTED           = 0
INTERVIEWERS_TRAINED            = 0
SUPERVISORS_ASSIGNED            = 0
AUTH_MC10_001                   = NOT_GRANTED
OUTREACH_AUTHORIZATION          = NOT_GRANTED
FIELDWORK_STATUS                = BLOCKED
FIELDWORK_READINESS             = PARTIALLY_READY
INTERVIEWS                      = 0
PARTICIPANTS                    = 0
```

This document prepares a human operating model; it does not operate it. `MC10R` preparation scope is
not fieldwork permission, and no reader may treat the role tables above as a roster.
