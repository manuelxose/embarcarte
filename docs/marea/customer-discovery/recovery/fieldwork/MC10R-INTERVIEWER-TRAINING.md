# MC-10R — Interviewer training (D22)

| Field                         | Value                                                                                                                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                   | MC-10R / D22 / `MC10R-INTERVIEWER-TRAINING`                                                                                                                                                              |
| Document status               | `DRAFT`                                                                                                                                                                                                  |
| Date                          | 2026-11-01                                                                                                                                                                                               |
| Owner                         | `agent-d-fieldwork` — Human Interviewer Training and Fieldwork Manager + Marine Recruitment Operations                                                                                                   |
| Write scope                   | `docs/marea/customer-discovery/recovery/fieldwork/` only                                                                                                                                                 |
| Recovery contract             | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` v`1.0.0`                                                                                                                                                       |
| Recovery work status          | `IN_PROGRESS`                                                                                                                                                                                            |
| External authorization status | `NOT_GRANTED` (`AUTH-MC10-001` revision `2`, `DRAFT_PREPARED`)                                                                                                                                           |
| Fieldwork readiness           | `PARTIALLY_READY`                                                                                                                                                                                        |
| Fieldwork status              | `BLOCKED`                                                                                                                                                                                                |
| Curriculum version            | `MC10R-TRAINING-1.0.0-DRAFT` (not approved, not delivered)                                                                                                                                               |
| Training completion           | `NOT_PERFORMED`                                                                                                                                                                                          |
| Scope                         | The complete 16-module interviewer curriculum, the synthetic mock-interview verification design, the scoring rubric and supervisor sign-off rule, and the training-record schema with real values `null` |
| Is not                        | A delivered training course, a trainee record, a completed mock interview, a supervisor sign-off, evidence that any interviewer is trained, or permission to conduct research                            |

> **STATUS: DRAFT — TRAINING DESIGN ONLY.** `TRAINING_COMPLETION = NOT_PERFORMED`;
> `TRAINEES = 0`; `MODULES_DELIVERED = 0`; `MOCK_VERIFICATIONS_PERFORMED = 0`;
> `SUPERVISOR_SIGN_OFFS = 0`. `AUTH_MC10_001 = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED`;
> `FIELDWORK_READINESS = PARTIALLY_READY`. No trainee, trainer, assessor or supervisor exists or is
> named. This curriculum has not been delivered to any person, and no agent may certify training
> completion, simulate a trainee result or sign off an imaginary interviewer.

## 0. Purpose, scope and reading rules

This document defines the training that a **real human interviewer** would have to complete before they
could be authorized to conduct a single MC-10R session. It exists because the MC-10 instrument package
is demanding and because the cost of a badly delivered session is not recoverable: a leading probe, a
skipped consent permission, a leaked identity or an accidental promise cannot be undone by analysis.

Reading rules:

1. **Nothing here was delivered.** Every module is a design. The training-record schema in §6 is
   populated with `null` and `NOT_PERFORMED`, because no trainee exists.
2. **Synthetic training material is not research.** The mock scenario cards are labelled
   `TRAINING_SYNTHETIC_NOT_RESEARCH`. They contain fictional, invented-for-training facts and no real
   person, organisation, brand, marina, vessel or participant. Practice material is never stored,
   coded, counted or reported as data.
3. **No self-certification.** A trainee cannot assess themselves, and no agent can assess anyone. The
   only acceptable completion evidence is a real supervisor's dated sign-off against the §5 rubric.
4. **No invented training completion.** There is no training completion, certificate, attendance
   record, assessment result or sign-off anywhere in this document or elsewhere in the programme. The
   state is `NOT_PERFORMED`.
5. **Version control.** The curriculum is versioned `MC10R-TRAINING-1.0.0-DRAFT`. A wording change
   requires a new version and a dated change record. The version in force when a module is delivered
   governs that delivery.
6. **D2 is the status authority.** Status strings come from D2 §2. Where this document uses assessment
   result labels (`PASS`, `FAIL`, `NOT_PERFORMED`), they are assessment outcomes for training, not D2
   recovery statuses; `NOT_PERFORMED` is the state of every assessment today.

## 1. Training principles

The curriculum is built around the frozen MC-10 instrument package and the D21 operating model:

| Principle                              | Consequence for training                                                                                                                                                                                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The instrument is fixed                | Training teaches fidelity to `SCREEN-01`, `CONSENT-01`, `GUIDE-01`, `PRICE-01` and `NOTE-01` under the candidate v`1.1.0` amendment package (`REVIEW_REQUIRED`, `PROPOSED_NOT_EFFECTIVE`). No trainee learns to improvise wording. |
| The study is not a sale                | Every module reinforces the non-sale statement and the prohibition on availability, price, launch, certification, compatibility, support, stock or delivery promises.                                                              |
| Neutrality is a skill, not an attitude | Modules 6, 7, 9, 10 and 11 are assessed through observed behaviour, not a knowledge quiz.                                                                                                                                          |
| Consent is granular and revocable      | Module 5 teaches four separate permissions (`C1`–`C4`) with no bundling and no pre-ticking; module 15 teaches withdrawal consequences.                                                                                             |
| Data minimisation is operational       | Modules 12, 13 and 14 teach note hygiene, incident handling and the approved secure submission process.                                                                                                                            |
| Quality is escalated, not absorbed     | Module 16 fixes the escalation path and the stop rules; an interviewer may not "fix" a problem in the field.                                                                                                                       |
| Training material is synthetic         | Mock scenarios are explicitly fictional and labelled; they never enter the research store.                                                                                                                                         |

Design constraints: the curriculum assumes 45–60 minute sessions, ES/EN delivery, the prepared geography
Rías Baixas / Galicia (Spain only) and the Wave 1 cohort structure. Delivery-duration estimates below
are design targets, not measurements; no training has occurred, so no duration is observed.

## 2. Curriculum overview

Sixteen modules, grouped into four blocks. All sixteen are mandatory; there is no partial certification.

| Block                    | Modules            | Purpose                                                                                  |
| ------------------------ | ------------------ | ---------------------------------------------------------------------------------------- |
| A — Foundations          | 1, 2, 3            | Why the study exists, what it is not, and what the product and legal status actually are |
| B — Participant handling | 4, 5, 15           | Screening, information, consent, decline and withdrawal                                  |
| C — Interview craft      | 6, 7, 8, 9, 10, 11 | Unprompted discovery, neutral probing, concept exposure and price discipline             |
| D — Evidence and safety  | 12, 13, 14, 16     | Accurate notes, incidents, data security and quality escalation                          |

## 3. The sixteen modules

Each module is specified with: objective, key content, assessed competency, evidence of completion and
failure mode. **No evidence of completion exists today for any module**; the evidence column states the
type of evidence that would be required.

### Module 1 — Research objectives

- **Objective.** Explain why MC-10R exists, what question each Wave 1 cohort is trying to answer, and
  what the study can never establish.
- **Key content.** The ten preregistered experiments and their bounds; the difference between a
  qualitative discovery study and a survey or a demand estimate; the segment structure and quotas
  (SEG-01 5–8, SEG-03 5–8, SEG-04 5–7, SEG-06 3–5; Wave 1 total 18–28); the geography limit (Rías
  Baixas / Galicia only; northern Portugal unavailable); the rule that a planned quota is not a
  completed interview and zero is absence of data.
- **Assessed competency.** Can state, without notes, the purpose of at least three Wave 1 experiments,
  the three things the study cannot establish (market size, demand, willingness to pay validation), and
  the current real state (`BLOCKED`, 0 participants).
- **Evidence of completion.** Supervised oral assessment record with the assessor's dated result.
- **Failure mode.** Treats the study as market validation or a sales precursor; promises a finding the
  design cannot support; cannot distinguish `BLOCKED` from `FAIL`.

### Module 2 — Research versus sales

- **Objective.** Internalise that the conversation is research, never a sale, marketing, pre-order,
  waiting list, pilot commitment or commercial offer.
- **Key content.** The mandatory disclosure set; the exact non-sale statement; the prohibition on
  asking for a purchase, deposit, reservation or expression of commercial interest; how to answer
  "can I buy it?" with "no"; how to answer a request for a price or launch date; the rule that
  enthusiasm is not an order and is never upgraded to a trial, listing or agreement.
- **Assessed competency.** In an observed drill, delivers the non-sale statement accurately, refuses
  every purchase request without discouraging participation, and does not accept an order even if the
  synthetic respondent offers one.
- **Evidence of completion.** Observed drill scored against the §5 rubric; the score is training
  evidence only, never research data.
- **Failure mode.** Says "not yet, but soon"; offers early access, a discount, a reservation, a demo
  unit or commercial priority; accepts a contact detail to "send the price later"; reframes the study
  as a pilot opportunity.

### Module 3 — Product readiness and legal restrictions

- **Objective.** State the real programme status accurately and never imply product availability,
  certification or brand clearance.
- **Key content.** MAREA is a **proposed** brand; trademark legal clearance `NOT_GRANTED`; source-IP
  clearance `NOT_CLEARED`; products are defined concepts, `NOT_FOR_SALE`; sales `BLOCKED`; commercial
  publication `BLOCKED`; production deployment `NOT_AUTHORIZED`; compatibility rows tested = 0;
  approved prices = 0; PILOT safety gate `BLOCKED`; no warranty, certification, support, stock or
  delivery exists; the controller identity is `OPEN` and the privacy contact is `OPEN` at this stage.
- **Assessed competency.** Correctly answers a set of scripted status questions and corrects a
  deliberately wrong statement from the assessor without overstating readiness.
- **Evidence of completion.** Assessor-scored status accuracy check with a recorded, dated result.
- **Failure mode.** Describes MAREA as a registered brand or an available product; implies CE/RCD/RED
  compliance, warranty or compatibility; speculates about launch timing; claims a pilot or partner
  relationship exists.

### Module 4 — Participant screening

- **Objective.** Administer `SCREEN-01` verbatim, decide eligibility correctly and record the outcome
  without collecting unnecessary data.
- **Key content.** S1–S8: decision role, vessel/fleet profile, base region, purchase activity, installer
  years and brands, competing-vendor and programme-staff exclusion, prior research, language
  preference; segment-specific eligibility and exclusion rules; `ELIGIBLE` / `NOT_ELIGIBLE` recording
  with a reason code and no full name; stopping a contact early when an exclusion applies.
- **Assessed competency.** Screens a set of synthetic scenario cards and produces the correct outcome
  and reason code for each, with no unnecessary personal data recorded.
- **Evidence of completion.** Scored screening drill with a dated assessor result.
- **Failure mode.** Paraphrases or reorders screener questions; accepts a proxy answer for the decision
  role; ignores the competing-vendor exclusion; records a name "for the file"; continues after an
  exclusion.

### Module 5 — Participant information and consent

- **Objective.** Provide the approved information before consent, take all four permissions separately
  and record them accurately.
- **Key content.** The information-before-consent order; the four permissions `C1` participation, `C2`
  audio recording (optional), `C3` anonymised/de-identified quote use (optional), `C4` follow-up
  (optional); no pre-ticking, no bundling, no consequence for declining an optional permission; the
  controller and privacy contact fields; the complaint route; the rule that the instrument cannot lawfully
  be issued while the controller is undesignated; the consent-script version gap (IV-04) and the
  quotation-wording defect (IV-01) that require approved amendment before fielding.
- **Assessed competency.** In a role-play, reads the consent sequence correctly, records four separate
  decisions with language and version fields, and refuses to bundle or pre-tick.
- **Evidence of completion.** Scored consent role-play; recorded as training evidence only.
- **Failure mode.** Asks for "one overall yes"; treats silence as consent; records consent after
  questions begin; omits the recording permission; promises "anonymous" when only de-identification is
  possible; proceeds while the controller field is blank.

### Module 6 — Unprompted problem discovery

- **Objective.** Elicit the participant's real problem in their own words **before** any concept or
  solution is introduced.
- **Key content.** `GUIDE-01` Q3 and Q7 technique; asking for the last real trip or maintenance job;
  the unprompted problem rule; not naming product categories; recording the economic or operational
  consequence only when the participant states it; distinguishing a complaint from a concrete prior
  spend or workaround; the difference between an unprompted problem and a solution the interviewer
  suggested.
- **Assessed competency.** In an observed practice conversation, obtains at least one unprompted problem
  statement and records it verbatim, without naming a product category or solution.
- **Evidence of completion.** Scored observed practice conversation; training evidence only.
- **Failure mode.** Probes with a feature name; asks "would a monitoring system help?"; counts a
  prompted problem as unprompted; invents a cost the participant did not state; fills silence with a
  suggested answer.

### Module 7 — Neutral probing

- **Objective.** Ask only approved neutral probes and stop talking.
- **Key content.** Approved probes: why, what happened next, how did you decide, what did you mean by
  that; the prohibition on feature, brand, price and solution probes; silence as a technique; repeating
  a misunderstood question neutrally; one question at a time; no prestige framing, no social-desirability
  cues, no approval signals; recording answers without correcting them.
- **Assessed competency.** Delivers a scripted drill in which the synthetic respondent gives short,
  ambiguous answers; the trainee must obtain detail without leading and without filling every silence.
- **Evidence of completion.** Scored probe drill with a dated assessor result.
- **Failure mode.** Asks multi-part questions; suggests answers; praises a "good" answer; names the
  product before the concept step; corrects the participant's opinion.

### Module 8 — Concept explanation

- **Objective.** Read the approved concept descriptions verbatim and without added benefits.
- **Key content.** The seven machine concept IDs `NAV`, `WATCH`, `PROTECT`, `HUB`, `START`,
  `INTEGRATED_SYSTEM`, `FLEET`; the Wave 1 cohort-to-concept mapping (Cohort A: WATCH/PROTECT; Cohort B:
  NAV/START; Cohort C: HUB/INTEGRATED_SYSTEM; Cohort D: WATCH/FLEET); reading the description exactly,
  in order, with no paraphrase, no added benefit, no price, no availability claim, no visual asset;
  recording misconceptions without correcting them; the brand not being named before the closing step.
- **Assessed competency.** Reads the candidate concept descriptions verbatim and answers "what does it
  do / what does it not do" prompts only by re-reading the approved text, not by explaining.
- **Evidence of completion.** Scored read-back and role-play.
- **Failure mode.** Improvises an explanation; adds a benefit not in the text; shows a document, image
  or website; names MAREA early; teaches the concept when the participant restates it incorrectly.

### Module 9 — Exclusions before benefits

- **Objective.** Deliver exclusions first, exactly as written, so comprehension is not inflated by
  selective benefit presentation.
- **Key content.** The exclusion-first rule; the concept-specific exclusions (for example: no charts
  included; no transponder transmission; no collision avoidance; no assured connectivity; no
  installation included; no certification; no compatibility guarantee; no theft prevention or safety
  guarantee); recording correct inclusions, correct exclusions and critical misconceptions separately;
  the comprehension rubric and its threshold (registered experiment minimums remain binding).
- **Assessed competency.** In a role-play, states every required exclusion before the corresponding
  benefit and does not soften an exclusion under participant pressure.
- **Evidence of completion.** Scored exclusion-order drill.
- **Failure mode.** Leads with benefits; omits an exclusion; softens "no compatibility guarantee" into
  "may be compatible"; argues with a participant's misconception.

### Module 10 — Pricing-module discipline

- **Objective.** Administer `PRICE-01` only after comprehension, from the frozen ladder, as a research
  opinion — never as an offer.
- **Key content.** The comprehension-before-pricing gate; the required disclosure read verbatim; the
  fixed buy-response scale; the four Van Westendorp questions; frozen ladder values from the external
  pricing-ladder artefact; no adjustment, reordering, addition or omission of a point mid-interview;
  currency and VAT recorded exactly as stated; the "not offers, nothing for sale" statements; the rule
  that only SEG-01 and SEG-03 can produce a Wave 1 experiment-level pricing result and only at eight
  completed pricing-module interviews per D2 §3.4; SEG-04/SEG-06 remain qualitative-pricing only.
- **Assessed competency.** Runs a full scripted pricing drill without improvising a price, without
  converting a price into an offer, and with correct currency/VAT recording.
- **Evidence of completion.** Scored pricing role-play and disclosure read-back.
- **Failure mode.** Quotes a price before Q11; adjusts the ladder; presents a point as an offer or a
  discount; invents a currency conversion; interprets a price answer as approval.

### Module 11 — Avoiding anchoring and social-desirability bias

- **Objective.** Recognise and avoid the biases that most easily contaminate this study.
- **Key content.** Anchoring: no price before the module, no competitor price, no "typically", no
  invented figure; social desirability: no cues that the participant should be positive, no disclosure
  of expected findings, no praise for helpfulness; interviewer knowledge of MAREA concepts as a leading
  risk; the disclosure that MAREA is a proposed, uncleared brand as a confounder that can itself shape
  trust barriers; recording quality flags (rushed, leading, confusion, interruption) without deleting
  data; interest is not intent and intent is not demand.
- **Assessed competency.** Identifies anchoring and desirability violations in recorded role-play
  exercises (including their own) and demonstrates corrected behaviour in a second drill.
- **Evidence of completion.** Scored bias-identification exercise and behaviour drill.
- **Failure mode.** Lets slip a target price or a competitor figure; says "most owners tell us…"; seeks
  confirmation of a hypothesis; suppresses a negative answer as "not useful".

### Module 12 — Accurate note-taking

- **Objective.** Capture complete, accurate `NOTE-01` records without invention, cleaning or unnecessary
  detail.
- **Key content.** Verbatim only for quotes, paraphrase marked as paraphrase; never invent an amount,
  a band or a currency; unknown fields left empty rather than `0`; no names, addresses, berth numbers,
  registration numbers or billing data; timestamps for key statements; consent flags with timestamps
  and script language/version; concept-comprehension grid; price answers with currency and VAT; quality
  flags; the rule that a gap is flagged, not filled.
- **Assessed competency.** Produces a `NOTE-01` record from a practice conversation within the session
  window, with correct verbatim/paraphrase marking and no invented fields; passes a spot-check against
  the recording or observer notes.
- **Evidence of completion.** Two scored note records (practice material only) plus a data-hygiene check.
- **Failure mode.** Writes polished quotes; turns a paraphrase into a quotation; rounds or invents an
  amount; writes a participant name or vessel name; fills an unknown with `0`; records after the session
  from memory only.

### Module 13 — Incident handling

- **Objective.** Recognise and escalate incidents immediately, without investigation or improvisation.
- **Key content.** Incident categories: consent breach, suspected data loss or misdirection, accidental
  identification of a participant, participant distress or vulnerability disclosure, complaint or
  allegation, recording failure, accidental promise or offer, safety-related claim, conflict discovery,
  hardware/fault issue; immediate actions: stop the session if necessary, do not delete evidence, write
  a factual incident note, notify the fieldwork lead and (where data is involved) the data steward; the
  escalation chain is **BLANK** today because no person is assigned; controller and privacy contact are
  `OPEN`; no contact may be invented; a personal-data breach is escalated without delay to the
  controller once designated, with the statutory deadline tracked by the governance owner.
- **Assessed competency.** Handles three synthetic incident scenarios in the correct order and writes a
  factual incident note; does not attempt to "fix" a breach by deleting data.
- **Evidence of completion.** Scored incident drill with a dated assessor result.
- **Failure mode.** Deletes or edits a record to hide a mistake; contacts the participant again without
  authority; promises confidentiality or a resolution; fails to escalate a suspected data loss.

### Module 14 — Data security

- **Objective.** Handle research data only through the approved restricted process.
- **Key content.** Layer A (identity/contact keys) and Layer B (pseudonymous records) separation; the
  store is **not provisioned** today; no participant data in Git, chat, email, tickets, personal cloud
  or local folders; the approved note-submission process; encryption and access-list rules; retention
  and deletion schedule (procedure designed, not operationally approved); pseudonymous candidate IDs;
  withdrawal and erasure consequences for each layer; prohibition on recording audio without `C2`; no
  photography of documents, screens or berths.
- **Assessed competency.** Completes a data-handling walkthrough and demonstrates the approved
  submission process (against a blank/synthetic record) with zero identifiers exposed.
- **Evidence of completion.** Scored security walkthrough plus a signed data-handling acknowledgement.
- **Failure mode.** Sends notes by unapproved channel; keeps a local copy; photographs identifying
  material; mixes Layer A and Layer B data; claims the store exists when it does not.

### Module 15 — Withdrawal processing

- **Objective.** Accept decline, pause, skip and withdrawal without pressure and execute the downstream
  consequences correctly.
- **Key content.** Decline versus withdrawal versus partial participation; immediate stop; no "just one
  more question"; no incentive to continue; recording the withdrawal date and stage; downstream
  handling in the ledger, notes and analysis; acknowledgement communication only through an approved
  template (`MC10R-TEMPLATES` `NOT_APPROVED`/`NOT_SENT`); retention and deletion handling for `C2`/`C3`
  permissions; the rule that a withdrawn record is counted once in `WITHDRAWN` and never in a later
  funnel state.
- **Assessed competency.** Handles a scripted withdrawal mid-session, records it correctly and explains
  the downstream consequences without error.
- **Evidence of completion.** Scored withdrawal drill.
- **Failure mode.** Argues, persuades or offers an incentive; keeps asking questions; omits the
  withdrawal from the ledger; uses the data anyway; records the person as "completed".

### Module 16 — Quality-control escalation

- **Objective.** Escalate quality problems to the right role and stop when the rules require stopping.
- **Key content.** Stop rules: incomplete consent, instrument-version mismatch, missing store, suspected
  fabrication, participant distress, repeated leading probes, inaudible recording, safety-related
  promise; deviation recording and the rule that data collected under a deviation travel with it;
  quality flags; suspension triggers; the interviewer's duty to report their own deviations; the
  prohibition on self-clearing a session; escalation to the fieldwork lead, then the research owner;
  the independent auditor's access to records; the rule that no quality issue is resolved by deleting or
  rewriting a record.
- **Assessed competency.** Correctly triages a set of synthetic quality scenarios and states the
  correct stop/escalate action for each.
- **Evidence of completion.** Scored triage exercise with a dated assessor result.
- **Failure mode.** Hides a deviation; continues past a stop rule; clears their own session; "fixes" a
  record after the fact; refuses auditor access.

## 4. Assessment model

| Element                  | Rule                                                                                                                                                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Formative assessment     | Observed drills and exercises during training; feedback is recorded, not scored for certification.                                                                                                                                                                  |
| Summative assessment     | Per-module assessment against the module's assessed competency; result `PASS` or `FAIL`.                                                                                                                                                                            |
| Pass rule                | Every module `PASS`, and every critical competency (`CC-01` consent sequence, `CC-02` non-sale discipline, `CC-03` neutral probing, `CC-04` exclusion-first delivery, `CC-05` withdrawal handling, `CC-06` data security) demonstrated at the highest rubric level. |
| Re-assessment            | A module `FAIL` requires re-training and re-assessment; the original result is retained, never overwritten.                                                                                                                                                         |
| No partial certification | Passing 15 of 16 modules does not authorize any session.                                                                                                                                                                                                            |
| Assessor                 | A real accepted trainer/assessor assigned by the fieldwork lead; the trainee cannot be their own assessor (`SOD-01`, `SOD-02`).                                                                                                                                     |
| Sign-off                 | The supervisor (fieldwork lead or approved delegate) signs the completed training record; without sign-off the interviewer remains `UNTRAINED`.                                                                                                                     |
| Agent prohibition        | No agent may deliver training, assess, score, sign off or record a completion. Agents may maintain this design document only.                                                                                                                                       |
| Validity                 | Training evidence is governance evidence, never research data; it is stored outside the repository once it contains real people.                                                                                                                                    |

## 5. Synthetic mock-interview verification

Before a real interviewer is marked ready, they must complete a supervised mock interview using
**synthetic, fictional** scenario material. The material is labelled `TRAINING_SYNTHETIC_NOT_RESEARCH`
in every artefact and is **never** stored in the research store, coded, counted or reported.

### 5.1 Mock design rules

1. The mock is a role-play between the trainee (interviewer) and a **real human role-player** reading a
   scripted synthetic scenario, or a two-trainee role-play. No real participant is involved at any
   point.
2. The scenario facts are invented for training. They deliberately use fictional vessels, fictional
   businesses, generic brand placeholders (for example "Brand A", "Brand B") and no real person,
   marina, club, association or company name.
3. The mock is not an interview, not a pilot, not a rehearsal with a real owner and not evidence about
   any market. It must not be quoted as participant speech anywhere.
4. The mock is recorded only as a training artefact (assessor notes and rubric scores) in the training
   record store; if audio is used for assessment, it is deleted under the training retention rule and
   never enters the research store.
5. The scenario is designed to test the failure modes that matter most: leading questions, premature
   price, promise-making, consent bundling, withdrawal pressure and note invention.
6. The mock cannot be used to satisfy any quota, and its synthetic respondent is never entered in any
   funnel state.

### 5.2 Scenario cards (synthetic, fictional)

Each card states the fictional facts and the behaviours the role-player is instructed to display. None
of these scenarios describes a real person or a real organisation.

| Card     | Cohort context                                 | Fictional facts (synthetic)                                                                                                                                                                               | Scripted behaviour to test                                                                                                                                                                |
| -------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MOCK-A` | Cohort A — SEG-03 unattended-vessel owner      | Fictional owner of a fictional 9 m motorboat kept afloat in a fictional marina; describes checking the boat by phone calls to a fictional marina office; mentions a fictional near-miss with a bilge pump | Gives one vague answer, then a detailed unprompted problem; asks whether a monitoring kit can be bought today; asks for a price before the module; then says they would rather stop early |
| `MOCK-B` | Cohort C — SEG-04 marine electronics installer | Fictional independent installer, eight years trading, has fitted two generic "Brand A"/"Brand B" first-party systems; describes a fictional multi-brand job with rework                                   | Lists compatibility and warranty demands unprompted; asks whether the interviewer can promise compatibility; asks who is liable if a fictional installation fails                         |
| `MOCK-C` | Cohort D — SEG-06 marina operator              | Fictional operator of a fictional small marina managing third-party berths; describes a fictional manual checking round and a fictional handover problem                                                  | Gives a misleadingly brief answer that could tempt a leading follow-up; reveals a fictional vessel name (accidental identification test); requests a commercial partnership or demo       |

### 5.3 Scoring rubric

The assessor scores each dimension `0`, `1` or `2`. The rubric belongs to the training record, not to
the research instrument.

|   # | Dimension                           | `0` — not demonstrated                      | `1` — partially demonstrated          | `2` — competent                                                    | Critical |
| --: | ----------------------------------- | ------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------ | -------- |
|  R1 | Opening and identity statement      | Missing or improvised                       | Present but incomplete                | Complete, accurate and non-promotional                             | Yes      |
|  R2 | Information before consent          | Missing or after questions                  | Out of order or partial               | Correct order, all required elements                               | Yes      |
|  R3 | Four separate permissions `C1`–`C4` | Bundled or pre-ticked                       | Separate but one recorded incorrectly | Four separate, correctly recorded, optional handling correct       | Yes      |
|  R4 | Non-sale discipline                 | Makes an offer or promise                   | Mostly correct, one ambiguity         | Correctly refuses every request without discouraging participation | Yes      |
|  R5 | Neutral questioning                 | Leads or suggests                           | Occasional leading probe              | Neutral probes only; comfortable with silence                      | Yes      |
|  R6 | Unprompted problem discovery        | Prompted problem treated as unprompted      | Problem obtained but partly prompted  | Unprompted, verbatim, no category named                            | No       |
|  R7 | Concept delivery                    | Improvised or benefits-first                | Minor paraphrase                      | Verbatim, exclusions first, no added benefit                       | Yes      |
|  R8 | Price discipline                    | Price before module or ladder altered       | Minor disclosure error                | Disclosure verbatim, frozen ladder, no offer implied               | Yes      |
|  R9 | Note accuracy                       | Invents or polishes                         | Mis-marks one paraphrase              | Verbatim/paraphrase correct, no invented fields                    | Yes      |
| R10 | Withdrawal handling                 | Resists or continues                        | Stops late or incomplete record       | Immediate, non-pressuring, correctly recorded                      | Yes      |
| R11 | Incident handling                   | Ignores or deletes evidence                 | Partially escalates                   | Correct immediate action and factual escalation note               | Yes      |
| R12 | Data security                       | Uses unapproved channel or keeps local copy | Minor process error                   | Approved process only, zero identifiers exposed                    | Yes      |
| R13 | Closing and follow-up permission    | Omits or pressures                          | Partial                               | Complete; optional permission correctly recorded                   | No       |

**Pass rule for the mock:** every dimension is scored, every **critical** dimension is `2`, every
non-critical dimension is at least `1`, and no critical-failure event occurred (see §5.4). A mock that
does not pass is repeated with a different scenario card; a third failure triggers a joint review by the
fieldwork lead and research owner and may end the candidacy.

### 5.4 Critical-failure events

Any one of these is an automatic mock failure regardless of the other scores:

- A promise or implication of availability, price, launch, certification, warranty, compatibility,
  early access, discount or commercial benefit.
- Consent recorded before information, or permissions bundled/pre-ticked.
- A real (not synthetic) person's data collected or retained during the mock.
- Continuing after a withdrawal request.
- Inventing, polishing or deleting a note.
- An agent scoring or signing the mock.

### 5.5 Supervisor sign-off

A real interviewer may be marked `READY_PENDING_APPOINTMENT` only after:

1. All 16 module assessments are `PASS` and recorded with dates.
2. The mock verification is scored, passed and dated.
3. The **supervisor** (fieldwork lead or approved delegate) signs the training record, confirming the
   evidence exists and the candidate is ready for supervised real sessions.
4. The sign-off is recorded outside the repository with the supervisor's identity and date.

No trainee can sign their own record, and **no agent can sign, simulate or pre-fill a sign-off**. The
current count of supervisor sign-offs is `0`.

## 6. Training-record schema and real values

### 6.1 Record schema

The schema is defined now so that a later real record cannot omit evidence. Until real values exist,
each field holds `null` or a declared non-value. Identifiers live outside the repository once they
refer to a real person.

|   # | Field                   | Type   | Allowed values / rule                                          | Current value                       |
| --: | ----------------------- | ------ | -------------------------------------------------------------- | ----------------------------------- |
|   1 | `trainingRecordId`      | string | Opaque internal ID; no name derivation                         | `null`                              |
|   2 | `traineeId`             | string | Anonymous ID allocated outside Git; identity held in Layer A   | `OPEN`                              |
|   3 | `traineeIdentityRef`    | string | Layer A reference; never a name or contact in Git              | `null`                              |
|   4 | `roleTarget`            | enum   | `ROLE-INTERVIEWER`                                             | `ROLE-INTERVIEWER`                  |
|   5 | `wave`                  | enum   | `WAVE-1`                                                       | `WAVE-1`                            |
|   6 | `curriculumVersion`     | string | `MC10R-TRAINING-1.0.0-DRAFT`                                   | `MC10R-TRAINING-1.0.0-DRAFT`        |
|   7 | `moduleId`              | string | Module 1–16 identifier                                         | `null`                              |
|   8 | `moduleVersion`         | string | Version in force at delivery                                   | `null`                              |
|   9 | `deliveryDate`          | date   | ISO 8601; real date only                                       | `null`                              |
|  10 | `trainerId`             | string | Real accepted trainer, identity outside Git                    | `null`                              |
|  11 | `trainerAcceptanceRef`  | string | Acceptance record reference                                    | `null`                              |
|  12 | `assessorId`            | string | Real accepted assessor, independent of trainee                 | `null`                              |
|  13 | `assessmentMethod`      | enum   | `OBSERVED_DRILL` / `ROLE_PLAY` / `READ_BACK` / `WRITTEN_CHECK` | `null`                              |
|  14 | `rubricVersion`         | string | D22 rubric version                                             | `MC10R-TRAINING-RUBRIC-1.0.0-DRAFT` |
|  15 | `result`                | enum   | `PASS` / `FAIL` / `NOT_PERFORMED`                              | `NOT_PERFORMED`                     |
|  16 | `criticalFail`          | enum   | `YES` / `NO` / `NOT_ASSESSED`                                  | `NOT_ASSESSED`                      |
|  17 | `evidenceRef`           | string | Scored rubric or observed record reference                     | `null`                              |
|  18 | `supervisorId`          | string | Real accepted supervisor, identity outside Git                 | `null`                              |
|  19 | `supervisorSignOffDate` | date   | Real date only                                                 | `null`                              |
|  20 | `signOffStatus`         | enum   | `SIGNED` / `REFUSED` / `NOT_PERFORMED`                         | `NOT_PERFORMED`                     |
|  21 | `reCertificationDue`    | date   | Next wave or expiry date                                       | `null`                              |
|  22 | `notesRef`              | string | Training-notes reference; no participant data                  | `null`                              |

### 6.2 Current training state — real values

Every module is `NOT_PERFORMED`; every field that would identify a person is `null`/`OPEN`.

| Module | Title                                    | Result          | Assessor | Date   | Sign-off        |
| -----: | ---------------------------------------- | --------------- | -------- | ------ | --------------- |
|      1 | Research objectives                      | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|      2 | Research versus sales                    | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|      3 | Product readiness and legal restrictions | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|      4 | Participant screening                    | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|      5 | Participant information and consent      | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|      6 | Unprompted problem discovery             | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|      7 | Neutral probing                          | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|      8 | Concept explanation                      | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|      9 | Exclusions before benefits               | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|     10 | Pricing-module discipline                | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|     11 | Anchoring and social-desirability bias   | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|     12 | Accurate note-taking                     | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|     13 | Incident handling                        | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|     14 | Data security                            | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|     15 | Withdrawal processing                    | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |
|     16 | Quality-control escalation               | `NOT_PERFORMED` | `null`   | `null` | `NOT_PERFORMED` |

Aggregate state:

```
TRAINEES                            = 0
TRAINERS_ASSIGNED                   = 0
ASSESSORS_ASSIGNED                  = 0
MODULES_DELIVERED                   = 0
MODULE_ASSESSMENTS_PASSED           = 0
MOCK_VERIFICATIONS_PERFORMED        = 0
MOCK_VERIFICATIONS_PASSED           = 0
SUPERVISOR_SIGN_OFFS                = 0
INTERVIEWERS_MARKED_READY           = 0
TRAINING_COMPLETION                 = NOT_PERFORMED
```

## 7. Mock material handling

- Every mock artefact (scenario card, assessor notes, rubric scores, practice `NOTE-01`) is marked
  `TRAINING_SYNTHETIC_NOT_RESEARCH` at the top and is stored in the training store, never in the
  research Layer B store.
- Mock artefacts are excluded from coding, from the funnel, from any denominator and from any report
  about participants.
- Mock audio, if used for assessment, is deleted under the training retention rule; it is never
  transcripted as research data.
- The scenario cards in §5.2 are deliberately generic. No real marina, club, association, installer,
  brand or person may be substituted into a card.
- If a mock participant says something that looks like a real research insight, it is still training
  material and may not be recorded as a finding. This rule is stated in module 12 and module 16.

## 8. Recertification and decertification

| Rule     | Requirement                                                                                                                                                   | Current state |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `REC-01` | A trained interviewer is re-certified before each new wave or authorization revision.                                                                         | `NOT_STARTED` |
| `REC-02` | A material instrument amendment requires refresher training on the changed sections before further sessions.                                                  | `NOT_STARTED` |
| `REC-03` | A consent breach, data incident, suspected fabrication or repeated instrument deviation suspends the interviewer; re-certification is required before return. | `NOT_STARTED` |
| `REC-04` | A lapsed sign-off removes scheduling eligibility; no session may occur on an expired certification.                                                           | `NOT_STARTED` |
| `REC-05` | The independent auditor samples training records against the roster each wave.                                                                                | `NOT_STARTED` |

## 9. Prohibited actions

1. **No invented trainee, trainer, assessor or supervisor.** Fields stay `null`/`OPEN`.
2. **No self-certification.** No person and no agent marks a module, mock or sign-off complete.
3. **No agent participation.** No agent may role-play a participant, deliver a module, score a mock or
   sign a record.
4. **No training-as-research.** Mock material is never evidence and never enters a funnel state.
5. **No retroactive training.** A training date cannot be recorded after the session it was supposed to
   cover.
6. **No waived modules.** A missing module blocks readiness even if all others pass.
7. **No credential inflation.** No certificate, title or "certified interviewer" status is claimed by
   completing internal training; the only valid label is a recorded `AUTHORIZED_FOR_FIELDWORK` role
   status under D21 gates.
8. **No document-based readiness.** A completed training manual is not a trained interviewer. A
   validator pass is not a training record.

## 10. Cross-references

| Document                                           | Relationship                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `MC10R-HUMAN-INTERVIEWER-OPERATING-MODEL.md` (D21) | Roles, qualification criteria and the `G0`–`G5` assignment gates this training feeds  |
| `MC10R-INTERVIEWER-OPERATIONS-KIT.md` (D23)        | The operating manual the training teaches                                             |
| `MC10-RESEARCH-PROTOCOL.md` (MC-10 D4)             | Interview order, moderator discipline, comprehension-before-pricing and capture rules |
| `MC10-INSTRUMENT-VERSIONS.md` (MC-10 D5)           | Frozen instrument register, hash and amendment defects this curriculum references     |
| `MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (MC-10 D3)   | Consent, data layers, retention and rights                                            |
| `MC10-QUALITATIVE-ANALYSIS.md` (MC-10 D11)         | Codebook and coding rules taught in the analyst/coder roles                           |
| `MC10R-RECOVERY-EXECUTION-PLAN.md` (D2)            | Status authority and the no-invented-evidence rules                                   |

## 11. Status statement

```
DOCUMENT                        = DRAFT
CURRICULUM_VERSION              = MC10R-TRAINING-1.0.0-DRAFT
MODULES_DEFINED                 = 16
MODULES_DELIVERED               = 0
TRAINEES                        = 0
TRAINING_COMPLETION             = NOT_PERFORMED
MOCK_VERIFICATIONS_PERFORMED    = 0
SUPERVISOR_SIGN_OFFS            = 0
INTERVIEWERS_MARKED_READY       = 0
AUTH_MC10_001                   = NOT_GRANTED
FIELDWORK_STATUS                = BLOCKED
FIELDWORK_READINESS             = PARTIALLY_READY
```

A training manual is not a trained interviewer. This document cannot make anyone ready to interview, and
no reader may treat the module tables, rubric or schema as a completion record.
