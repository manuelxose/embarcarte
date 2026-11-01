# MC-10R — Interviewer operations kit (D23)

| Field                         | Value                                                                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                   | MC-10R / D23 / `MC10R-INTERVIEWER-OPERATIONS-KIT`                                                                                                                                                 |
| Document status               | `DRAFT`                                                                                                                                                                                           |
| Date                          | 2026-11-01                                                                                                                                                                                        |
| Owner                         | `agent-d-fieldwork` — Human Interviewer Training and Fieldwork Manager + Marine Recruitment Operations                                                                                            |
| Write scope                   | `docs/marea/customer-discovery/recovery/fieldwork/` only                                                                                                                                          |
| Recovery contract             | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` v`1.0.0`                                                                                                                                                |
| Recovery work status          | `IN_PROGRESS`                                                                                                                                                                                     |
| External authorization status | `NOT_GRANTED` (`AUTH-MC10-001` revision `2`, `DRAFT_PREPARED`)                                                                                                                                    |
| Fieldwork readiness           | `PARTIALLY_READY`                                                                                                                                                                                 |
| Fieldwork status              | `BLOCKED`                                                                                                                                                                                         |
| Instrument status             | Candidate `1.1.0` — `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`; historical frozen `1.0.0`                                                                                                       |
| Scope                         | The manual packet a real, accepted, trained and authorized human interviewer would follow for a Wave 1 session                                                                                    |
| Is not                        | An approved script, an appointment, a schedule, a consent record, a session log, a data store, an authorization to contact anyone, or evidence that any interviewer, supervisor or session exists |

> **STATUS: DRAFT — MANUAL ONLY.** `AUTH_MC10_001 = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED`;
> `FIELDWORK_READINESS = PARTIALLY_READY`. `APPROVED_SCRIPTS = 0`; `INTERVIEWERS_APPOINTED = 0`;
> `INTERVIEWERS_TRAINED = 0`; `SESSIONS_SCHEDULED = 0`; `SESSIONS_CONDUCTED = 0`;
> `SUPERVISOR_CONTACT = BLANK`. **A complete manual is not a trained, appointed interviewer, and this
> manual authorizes no contact.** Every operational field that would name a person or a contact is
> blank; no name, date, appointment, supervisor, channel or recipient may be invented.

## 0. What this kit is, and the order in which it may be used

This is the **manual packet** for a future Wave 1 session. It consolidates the operating rules a real
interviewer would need in front of them: the script references, eligibility, scheduling, consent,
session checklist, interview sequence, concept descriptions, price-module discipline, note submission,
withdrawal handling, incident escalation, supervisor contact and close-out.

It may be read and rehearsed internally. It may **not** be used to contact anyone, schedule anything,
take consent, collect data or conduct a session until all of the following are true and recorded:

1. `AUTH-MC10-001` is `GRANTED`, dated and scoped (revision recorded; every required field populated).
2. A real data controller is designated and a verified privacy contact exists.
3. Qualified legal review is complete and the participant information notice is approved.
4. The candidate instrument version `1.1.0` is approved for future fieldwork (currently
   `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`).
5. The secure Layer A/B stores are `PROVISIONED`, `ACCESS_REVIEWED` and `OPERATIONALLY_APPROVED`
   (currently only `ARCHITECTURE_DEFINED` and, after the D20 evidence run,
   `LOCAL_SYNTHETIC_TESTS_PASS`).
6. A real interviewer has been accepted (`G0`–`G5`), trained (D22) and authorized (`AUTHORIZED_FOR_FIELDWORK`).
7. A real supervisor is assigned and reachable; the supervisor contact field in §15 is completed.

Until every item is true, this kit is a **preparation artefact** and the fieldwork status remains
`BLOCKED`.

## 1. Script and version reference

The instruments are frozen historical `1.0.0` text with candidate amendments in
`MC10R-INSTRUMENT-AMENDMENT-v1.1.0`. The candidate version is **not approved for fielding**. The source
hash of the historical frozen source is
`cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`.

| Script       | Purpose                                                     | Historical version | Candidate version | Candidate status                                                                                        | Approved-for-fielding reference |
| ------------ | ----------------------------------------------------------- | ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `SCREEN-01`  | Eligibility screener (S1–S8)                                | `1.0.0` (frozen)   | `1.1.0`           | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`                                                            | `null`                          |
| `CONSENT-01` | Information and four separate permissions `C1`–`C4`         | `1.0.0` (frozen)   | `1.1.0`           | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`                                                            | `null`                          |
| `GUIDE-01`   | Moderator guide, Q1–Q15                                     | `1.0.0` (frozen)   | `1.1.0`           | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`                                                            | `null`                          |
| `PRICE-01`   | Conditional pricing module (Gabor–Granger + Van Westendorp) | `1.0.0` (frozen)   | `1.1.0`           | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`; ladder values live in the external frozen ladder artefact | `null`                          |
| `NOTE-01`    | Note-taking template                                        | `1.0.0` (frozen)   | `1.1.0`           | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`                                                            | `null`                          |
| `SCHEMA-01`  | Data-capture schema                                         | `1.0.0` (frozen)   | `1.1.0`           | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`                                                            | `null`                          |
| `ANA-01`     | Analysis plan and codebook reference                        | `1.0.0` (frozen)   | `1.1.0`           | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`                                                            | `null`                          |

Rules:

- The version in force **at the session** is recorded on every note. A session conducted under an
  unapproved or superseded version is a deviation and is not analysis-eligible.
- No interviewer may paraphrase, extend, reorder or translate live. The ES/EN text is parallel by
  design; qualified translation equivalence is **not established** (`W0-07 = PARTIAL`), and Portuguese
  instruments are deliberately `NOT_PRODUCED`, so northern Portugal cannot be fielded.
- Known instrument defects that must be fixed by approved amendment before any session include: the
  quotation-permission wording defect (IV-01), the missing closing brand-disclosure script (IV-02), the
  external price-ladder freeze (IV-03), the missing consent script version/language fields (IV-04), the
  codebook-version record (IV-05), the missing supervisory-authority complaint route (IV-06), the absent
  qualified bilingual sign-off (IV-07) and the absent PT instruments (IV-08).
- **No approved script exists today.** The "approved script reference" column is `null` for every row.

## 2. Segment eligibility for Wave 1

Wave 1 covers four cohorts only. Other segments are out of scope for this wave (D25 §9).

| Cohort | Segment  | Canonical name                        | Wave 1 quota | Eligibility (operational)                                                                                                                                    | Exclusions that terminate the contact                                                                                                                |
| ------ | -------- | ------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | `SEG-03` | Marina-based unattended-vessel owners | 5–8          | Owner-occupier whose vessel stays afloat unattended for weeks and who is responsible for and cares about monitoring it; decision role in equipment purchases | Vessel ashore, laid up or unused; not responsible for the vessel; no purchase role; under 18; vulnerable; programme staff; competing-vendor employee |
| B      | `SEG-01` | Recreational motorboat owners         | 5–8          | Owns a 6–15 m recreational motorboat used for day or coastal trips; decides equipment purchases                                                              | No vessel in class; no purchase role; under 18; vulnerable; programme staff; competing-vendor employee                                               |
| C      | `SEG-04` | Marine electronics installers         | 5–7          | Independent or yard installer, ≥5 years active, ≥2 first-party brands fitted in the last 24 months; technical decision-maker                                 | No independent install history; not the technical decision-maker; competing-vendor employee; under 18                                                |
| D      | `SEG-06` | Marina or shipyard operators          | 3–5          | Marina or shipyard operator managing berths, third-party vessels or refit work; operational decision role                                                    | Operator with no third-party vessels and no refit responsibility; no decision role; under 18; competing-vendor employee                              |

Universal exclusions apply in every cohort: under 18; vulnerable persons; EMBARCARTE/MAREA employees,
contractors or agents as participants; employees of competing marine-electronics manufacturers,
distributors or resellers; inability to give 45–60 minutes; anyone reachable only through purchased
lists, scraped contacts, private marina customer records or social-media harvesting. See §3.3 of the
recruitment plan. **No candidate exists; eligibility is a design rule, not a list.**

## 3. Scheduling instructions (must not be executed today)

**There are no appointments, dates, windows or schedules.** `SESSIONS_SCHEDULED = 0`. The instructions
below describe how scheduling would work only after the §0 gate is fully evidenced.

1. Scheduling is performed by the fieldwork lead or their recorded delegate — never by an agent, never
   by an interviewer acting as their own scheduler, and never through an unauthorized channel.
2. A session may be scheduled only for an eligible, screened, consent-ready candidate identified
   through a channel named in the granted authorization; the institutional permission (where required)
   and the candidate-specific contact permission are recorded before any scheduling message is sent.
3. The session is offered in the participant's declared language (ES or EN), within the 45–60 minute
   commitment, at a time the participant chooses. No time is presented as the only option.
4. The scheduling message is an approved version of the D24 scheduling template. Until that template is
   approved, no scheduling message exists.
5. At most **one** reminder is sent per invited candidate. No reminder is sent after a decline or a
   withdrawal. No automated, repeated or pressure sequence is permitted.
6. A cancellation by the participant is accepted without question; the cancellation template is used
   if the participant has consented to receive a reply. A cancellation is not re-approached more than
   once and never with a revised offer, incentive or urgency.
7. A no-show is recorded and not re-approached without the participant's own re-opt-in. No-show data is
   recorded in the restricted ledger only.
8. Rescheduling is allowed only at the participant's request or with their explicit agreement. The
   interviewer's availability does not create pressure.
9. No dates may be pre-filled, estimated or invented in any document, plan or validator. A date exists
   only when a real scheduling interaction produced it.

## 4. Consent instructions

Consent is taken **before** any note, recording or substantive question. The candidate information
notice must have been provided and read before consent is requested.

1. Read the identity statement (approved version) and confirm you are the named interviewer.
2. Read the non-sale statement: this is research, not a sale or marketing; nothing is for sale; no
   product is available, certified, launched or priced; MAREA is a proposed brand without completed
   legal clearance; no availability, price, launch, certification, warranty, compatibility, support,
   stock or delivery is promised.
3. Confirm the information notice was provided and read. The controller identity is `OPEN` and the
   privacy contact is `OPEN` today; **consent cannot lawfully be recorded against blank controller
   fields**, so this step is blocked until they exist.
4. Read `CONSENT-01` from the approved version. Record each permission separately, with language and
   script version:
   - `C1` participation — required to continue.
   - `C2` audio recording — optional; declining does not end participation.
   - `C3` use of de-identified wording — optional; declining does not end participation.
   - `C4` later follow-up contact — optional; declining does not end participation.
5. No permission is pre-ticked, bundled, implied by continuing or obtained retroactively. A refusal of
   `C1` ends the session immediately and politely.
6. Confirm the participant can withdraw or change any permission at any time without giving a reason.
7. Record consent in the consent record and reference it from the note; the audio, if agreed, is stored
   only as `C2` permits.
8. If the participant asks for a copy of the information, provide the approved version through the
   approved channel; do not improvise a summary.
9. If any consent element cannot be evidenced, **do not start the session**.

## 5. Session start checklist

This is the field checklist for the interviewer. Every item is currently `BLANK` because no session
exists. It is completed in order, and any `BLANK` or `FAIL` stops the session.

|    # | Check                   | Done when                                                                        | Current state |
| ---: | ----------------------- | -------------------------------------------------------------------------------- | ------------- |
| S-01 | Authorization and scope | Session falls inside a granted authorization and an authorized channel           | `BLANK`       |
| S-02 | Interviewer status      | Interviewer is `AUTHORIZED_FOR_FIELDWORK` in the current wave                    | `BLANK`       |
| S-03 | Supervisor reachable    | Supervisor contact in §12 is complete and reachable                              | `BLANK`       |
| S-04 | Instrument version      | The approved version is open and its version number is recorded                  | `BLANK`       |
| S-05 | Storage available       | Approved secure store is `OPERATIONALLY_APPROVED`                                | `BLANK`       |
| S-06 | Candidate record        | Eligibility, screening outcome and contact permission are recorded               | `BLANK`       |
| S-07 | Information provided    | Approved information notice was provided before consent                          | `BLANK`       |
| S-08 | Consent recorded        | `C1`–`C4` recorded separately with language and version                          | `BLANK`       |
| S-09 | Environment             | Quiet, private, no third party present unless separately consented and justified | `BLANK`       |
| S-10 | No-sale acknowledgement | Participant has been told this is research and not a sale                        | `BLANK`       |
| S-11 | Recording decision      | `C2` recorded; recording device set only if agreed                               | `BLANK`       |
| S-12 | Withdrawal path known   | Interviewer can explain withdrawal consequences without notes                    | `BLANK`       |
| S-13 | Incident route known    | Escalation chain and current contacts are known                                  | `BLANK`       |
| S-14 | Note template ready     | `NOTE-01` version in front of the interviewer; no identifiers pre-filled         | `BLANK`       |

## 6. Interview sequence (Q1–Q15)

Order is fixed; sections may not be reordered, merged or skipped for a completed case. Two controls
precede Q1: `SCREEN-01` before the session and `CONSENT-01` at its start. Time bands are design targets,
not measurements.

| Step | Section                          | Purpose                                                         | Gate / constraint                                                                                           | Target |
| ---- | -------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -----: |
| —    | Screener `SCREEN-01`             | Eligibility before the session                                  | Read verbatim; ineligible answer ends the contact                                                           | before |
| —    | Consent `CONSENT-01`             | Four separate permissions                                       | Before any note, recording or substantive question                                                          | ~4 min |
| Q1   | Context                          | Vessel/business and seasonal use                                | No brand, no price                                                                                          |  2 min |
| Q2   | Current equipment and setup      | What is aboard, age, connectivity, remembered brands            | No brand prompting by the moderator                                                                         |  3 min |
| Q3   | Current workflow                 | Last trip or last maintenance, start to finish                  | Probe what was checked, written down, asked, unexpected                                                     |  3 min |
| Q4   | Recent real purchase decisions   | Last purchase in 24 months and how it was decided               | Amount bands only; never invent a figure                                                                    |  5 min |
| Q5   | Current spend                    | Categories and annual bands                                     | Bands and currency only                                                                                     |  2 min |
| Q6   | Current alternatives             | Products, apps, services, likes and irritations                 | Probe manual substitute, incumbent, switching trigger                                                       |  2 min |
| Q7   | Pain points (undirected)         | Unprompted problems and their cost                              | No solutioning; no product-category names                                                                   |  5 min |
| Q8   | Installation                     | Installation, documentation, warranty, compatibility, liability | Probe rework risk and insurance concerns                                                                    |  3 min |
| Q9   | Subscription                     | Recurring-fee attitudes                                         | Probe local-function lockout, cadence, cancellation, per-vessel vs per-person                               |  3 min |
| Q10  | Trust and warranty               | What would create distrust in a new company                     | Probe data ownership, lapse, company disappearance, trust reference                                         |  3 min |
| Q11  | Concept comprehension            | Neutral concept descriptions; unaided restatement               | **Brand not named; benefits not added; exclusions stated first**; record misconceptions, never correct them |  5 min |
| Q12  | Conditional pricing (`PRICE-01`) | Gabor–Granger ladder and Van Westendorp questions               | **Only after Q11**; disclosure read verbatim; frozen ladder only                                            | 12 min |
| Q13  | Purchase-intent evidence         | Stated intent and what would have to be true                    | Repeat "today not orderable"; intent is not an order                                                        |  2 min |
| Q14  | Closing                          | Anything missed; most important thing; recommend or reject      | No new claim; no availability or price                                                                      |  2 min |
| Q15  | Follow-up permissions            | `C4` channel, scope and expiry                                  | Optional; withdrawable; record yes/no and date                                                              |  1 min |

Moderator discipline (binding, from the protocol): ask, then stop talking; probe with "why", "what
happened next", "how did you decide"; never probe with a feature, brand, price or solution; record
verbatim for quotes and mark paraphrases; no price before `PRICE-01`; never describe MAREA as available;
no correction during comprehension; one question at a time; one interviewer per session; the interviewer
is never the sole coder of their own session.

## 7. Concept descriptions (candidate v1.1.0 — not approved)

These are **candidate** neutral descriptions for the concept-comprehension step, pending approval of
`MC10R-INSTRUMENT-AMENDMENT-v1.1.0`. They are read verbatim, brand not named, exclusions first. They
make no availability, price, certification, compatibility or safety claim. The historical `1.0.0`
scripts are preserved as historical records and are never silently recoded.

### 7.1 Concept mapping (`GUIDE-01` → effective research concepts)

| Historical source concept        | Effective concept ID(s)              | Version | Wave 1 use                               |
| -------------------------------- | ------------------------------------ | ------- | ---------------------------------------- |
| A — navigation and onboard data  | `NAV`                                | `1.1.0` | Cohort B                                 |
| B — traffic awareness            | `HUB` + `START` (rubric element)     | `1.1.0` | Cohort B, Cohort C                       |
| C — unattended vessel monitoring | `WATCH`, `PROTECT`                   | `1.1.0` | Cohort A, Cohort D                       |
| D — steering assistance          | `INTEGRATED_SYSTEM` (rubric element) | `1.1.0` | Cohort C (concept only; no installation) |
| E — fleet operations             | `FLEET`                              | `1.1.0` | Cohort D                                 |

### 7.2 Candidate descriptions (draft instrument text, not approved)

Read exactly as approved; the text below is a **draft** whose approval state is `PROPOSED_NOT_EFFECTIVE`:

- **`NAV` — navigation and onboard data.** A local navigation and onboard-data layer that brings
  position, depth, speed and route information together for display on compatible equipment.
  **It does not include** nautical charts, chart licences or chart updates; it does not include any
  installation; it does not replace a certified navigation instrument; it makes no compatibility
  guarantee and no safety guarantee.
- **`WATCH` — unattended-vessel monitoring.** A monitoring layer that reports selected vessel
  conditions while the vessel is unattended, with configurable alerts for the owner.
  **It does not prevent theft**, does not guarantee safety, does not guarantee connectivity at the
  berth, does not include hardware by default, and does not control any vessel system.
- **`PROTECT` — vessel protection bundle.** A combination of monitoring and alerting intended for a
  vessel left unattended. **It is not an insurance product**, not a certified security service, does
  not guarantee detection or response, and includes no hardware by default.
- **`HUB` — local data gateway.** A local gateway that aggregates compatible vessel data read-only and
  makes it available to other onboard systems. **It does not include charts**; it does not guarantee
  compatibility with any device, model or firmware; it does not offer NMEA 2000 unless separately
  validated; it has no remote or automatic steering function; it includes no installation or
  certification.
- **`START` — entry navigation bundle.** An entry-level bundle combining navigation and onboard-data
  functions. **It does not include** charts, installation, certification, compatibility guarantees,
  or any vessel control.
- **`INTEGRATED_SYSTEM` — integrated steering assistance.** A concept for supervised steering
  assistance integrated with onboard systems. **It is not autonomous and not remote**; it is never
  unattended; the PILOT safety gate is `BLOCKED`; it is not available, not installable and not tested;
  this concept may be described only to explain what is excluded, never as a capability.
- **`FLEET` — multi-vessel operations.** Software for an operator to organise multi-vessel operations,
  work-lists and reporting. **Hardware is not included by default**; there is **no cross-tenant
  access**; there is **no service-level agreement**; there is **no remote control**; it is a concept,
  not a deployed service.

Rules: brand name not used in Q1–Q11; no visual assets (none exist and none may be created for
fielding without asset review); if the participant restates something incorrectly, record it and do not
correct it; the closing brand disclosure is a designed step with **no frozen script** (IV-02), so it
must be amended before fielding.

## 8. Price-module instructions

1. **Gate.** `PRICE-01` may be administered only after Q11 is completed and recorded. If comprehension
   is not completed, the price module is not administered.
2. **Disclosure.** Read the required price disclosure verbatim, including the statement that the
   exercise is research, that nothing is for sale, that no price is an offer, and that no product is
   available or orderable today.
3. **Frozen ladder.** Use only the frozen ladder values in the external ladder artefact referenced by
   the instrument register. Do not add, omit, reorder, round or translate a point. Record the ladder
   version in the note.
4. **Scale and questions.** Use the fixed five-category buy-response scale and the four Van Westendorp
   questions exactly as approved. Do not explain the scale beyond the approved wording.
5. **Recording.** Record currency and VAT treatment exactly as stated; never convert; never infer a
   figure; never correct the participant.
6. **Scope.** In Wave 1, only `SEG-01` and `SEG-03` can produce an experiment-level pricing result, and
   only if **eight completed pricing-module interviews** are achieved in that segment (D2 §3.4).
   `SEG-04` and `SEG-06` are qualitative-pricing only (`BELOW_REGISTERED_MINIMUM` for the quantitative
   pricing experiments).
7. **No offer.** No price, range or point may be presented as an offer, discount, reservation,
   pre-order, deposit or early-access right. A stated value is a research opinion, never an approved
   price, and `APPROVED_PRICES = 0`.
8. **Stop.** If the participant appears to treat a figure as a purchasable offer, pause, repeat the
   non-offer statement, and record the quality flag.

## 9. Secure note-submission process

**No participant data may be collected today**, because no approved store exists
(`PROVISIONED = false`). The process below is the designed procedure to be executed only when the store
is operational.

1. Capture the session in `NOTE-01` version in force, pseudonymously; record the candidate anonymous ID,
   segment, language, acquisition source, interviewer ID and consent flags — never a name, contact
   detail, address, berth number, vessel name or registration number.
2. Mark verbatim statements as verbatim and paraphrases as paraphrases; leave unknown fields empty.
3. Do not store notes on a personal device, personal cloud, email draft or chat. If the approved
   submission app is unavailable, keep the record in the approved encrypted local workspace for the
   minimum time and escalate to the data steward; never choose an alternative channel yourself.
4. Submit through the approved upload route to the Layer B store, with the record ID and checksum;
   confirm the receipt reference and record it in the session log.
5. Where audio was agreed under `C2`, upload it to the approved encrypted store and mark the note with
   the audio reference; delete the local copy after confirmed receipt.
6. The data steward verifies receipt, reconciles the record against the ledger, and confirms
   completion; the interviewer does not mark a session complete before that confirmation.
7. If a submission fails or a record is suspected lost or misdirected, treat it as an incident (§11)
   immediately; do not re-send through a personal channel and do not delete evidence.

## 10. Withdrawal handling

1. On any sign of decline, distress or a wish to stop: stop immediately, without persuasion, without a
   "last question" and without an incentive.
2. Confirm the participant's decision in neutral words, thank them, and explain that no further contact
   will be made except a written acknowledgement if they wish to receive one.
3. Record the withdrawal date and the stage (invited / screened / consented / mid-session / after
   session) in the restricted record; mark the interview record as not-counted.
4. Respect each permission separately: withdraw the data affected by `C2`/`C3` if the participant asks,
   and escalate the deletion request to the data steward.
5. Apply the approved retention/deletion procedure once it exists; today the procedure is designed but
   `NOT_APPROVED`.
6. Record the person once in `WITHDRAWN` and never in a later funnel state. A withdrawal is not an
   exclusion and is never re-approached.
7. If the participant asks for a written acknowledgement, use the approved withdrawal template
   (D24, `NOT_APPROVED`/`NOT_SENT`); if no approved version exists, do not send one and record the
   request as pending approval.
8. Report the withdrawal in the weekly quality review; systemic patterns are reviewed by the research
   owner, never argued with the participant.

## 11. Incident escalation

An incident is any event that threatens participant rights, evidence integrity or the programme's
commitments. The interviewer's job is to **stop, preserve, record and escalate** — not to investigate or
resolve.

| Incident class                                                  | Immediate action                                                             | Escalate to                                                                                           | Timing      |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------- |
| Consent breach (missing, bundled, late, pre-ticked)             | Stop the session; preserve the record; do not take further data              | Fieldwork lead → research owner; data steward if data already recorded                                | Same day    |
| Suspected data loss, misdirection or unauthorized access        | Stop; do not delete anything; record what was sent and where                 | Fieldwork lead → data steward → data controller (when designated) → privacy contact (when designated) | Immediately |
| Accidental identification in a note (name, vessel, berth)       | Stop; flag the record; do not attempt to erase without the data steward      | Fieldwork lead → data steward                                                                         | Same day    |
| Participant distress or vulnerability disclosure                | Pause or stop; offer to stop; do not collect further detail                  | Fieldwork lead → research owner                                                                       | Same day    |
| Complaint or allegation against the programme or an interviewer | Listen; record factually; do not defend or promise an outcome                | Fieldwork lead → research owner; governance owner                                                     | Same day    |
| Recording failure or lost audio                                 | Stop recording; record the failure; do not re-enact or reconstruct           | Fieldwork lead → data steward                                                                         | Same day    |
| Accidental promise, offer or price statement                    | Stop; correct on the record with the non-offer statement; note the deviation | Fieldwork lead → research owner                                                                       | Immediately |
| Safety-related claim or request for assurance                   | Do not reassure; state the real limitations; note it                         | Fieldwork lead → research owner                                                                       | Same day    |
| Conflict of interest discovered (participant or interviewer)    | Pause; record; do not continue if it compromises consent                     | Fieldwork lead → research owner                                                                       | Same day    |
| Missing or mismatched instrument version                        | Stop; do not administer the mismatched module                                | Fieldwork lead                                                                                        | Immediately |

Escalation chain (roles and current state; **contacts are BLANK because no person is assigned**):

```
Interviewer
  -> Fieldwork lead            : UNASSIGNED
  -> Research owner            : UNASSIGNED
  -> Data steward              : UNASSIGNED
  -> Data controller           : OPEN (undesignated)
  -> Privacy contact           : OPEN (does not exist)
  -> Legal adviser             : NOT_ENGAGED
  -> Independent auditor       : UNASSIGNED
```

A personal-data breach, once a controller exists, must be escalated without delay to the controller so
that the statutory notification assessment can be made by the accountable party. The interviewer does
not notify participants, regulators or authorities directly.

## 12. Supervisor contact field

**This table is intentionally blank.** No supervisor is assigned, no contact detail exists, and no
contact may be invented. The kit is not operational until every cell holds a real, verified value
recorded outside this repository and referenced here by a non-personal identifier.

| Field                                                              | Value            | Source of the real value (outside Git)   |
| ------------------------------------------------------------------ | ---------------- | ---------------------------------------- |
| Supervisor name                                                    | `BLANK`          | Layer A role record — not provisioned    |
| Supervisor role                                                    | `BLANK`          | Appointment record — none exists         |
| Supervisor telephone                                               | `BLANK`          | Layer A contact record — not provisioned |
| Supervisor secure email                                            | `BLANK`          | Layer A contact record — not provisioned |
| Supervisor acceptance date                                         | `BLANK`          | Appointment record — none exists         |
| Deputy supervisor                                                  | `BLANK`          | Appointment record — none exists         |
| Data steward contact                                               | `BLANK`          | Layer A contact record — not provisioned |
| Privacy contact                                                    | `BLANK` (`OPEN`) | Controller designation — does not exist  |
| Emergency/professional support route (if a participant is at risk) | `BLANK`          | Governance decision — not defined        |
| Escalation hours                                                   | `BLANK`          | Operational plan — not defined           |

## 13. End-of-session checklist

|    # | Check                           | Done when                                                            | Current state |
| ---: | ------------------------------- | -------------------------------------------------------------------- | ------------- |
| E-01 | Consent complete and consistent | `C1`–`C4` recorded with dates, language and version                  | `BLANK`       |
| E-02 | Note complete                   | `NOTE-01` fields addressed; gaps flagged, not filled                 | `BLANK`       |
| E-03 | Verbatim/paraphrase marked      | Every quote is verbatim and every paraphrase marked                  | `BLANK`       |
| E-04 | No identifiers                  | No name, contact, address, berth, vessel name or registration        | `BLANK`       |
| E-05 | Amounts as stated               | No invented amount, band, currency or conversion                     | `BLANK`       |
| E-06 | Concept step recorded           | Correct inclusions, exclusions and misconceptions recorded           | `BLANK`       |
| E-07 | Price module recorded           | Only if administered; ladder version, currency and VAT recorded      | `BLANK`       |
| E-08 | Quality flags                   | Rushed, leading, confusion, interruption, translation issue recorded | `BLANK`       |
| E-09 | Deviation log                   | Any deviation recorded with date, section and consequence            | `BLANK`       |
| E-10 | Withdrawal                      | None, or recorded with date and stage                                | `BLANK`       |
| E-11 | Incident                        | None, or escalated and logged                                        | `BLANK`       |
| E-12 | Secure submission               | Uploaded, receipt confirmed, local copies removed                    | `BLANK`       |
| E-13 | Data steward confirmation       | Record reconciled against the ledger                                 | `BLANK`       |
| E-14 | Debrief                         | Supervised debrief completed for initial sessions                    | `BLANK`       |

## 14. A complete manual is not a trained, appointed interviewer

This distinction is binding:

| This kit provides                                           | This kit does not provide                                        |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| Script references, version rules and the interview sequence | An approved script version (`null` for every instrument)         |
| Eligibility and exclusion rules                             | A candidate, a screened participant or a consent record          |
| Scheduling rules to follow after authorization              | An authorization, a date, an appointment or a window             |
| Consent steps and permission structure                      | A controller, a verified privacy contact or an approved notice   |
| Concept descriptions (candidate)                            | An approved concept text or any right to present a product       |
| Price-module discipline                                     | An approved ladder in force, an offer or a price                 |
| Note and incident rules                                     | A provisioned store, a data steward or an escalation contact     |
| A role description for interviewers                         | A person who accepted, trained, was supervised or was authorized |
| A supervisor contact field                                  | A supervisor (the field is `BLANK`)                              |

Operational status remains: `APPROVED_SCRIPTS = 0`; `INTERVIEWERS_APPOINTED = 0`;
`SESSIONS_SCHEDULED = 0`; `SESSIONS_CONDUCTED = 0`; `PARTICIPANTS = 0`; `FIELDWORK_STATUS = BLOCKED`.

## 15. Change control

1. Any wording change to this kit requires a new version and a dated change record. The version in force
   when a session occurs governs that session.
2. The kit must be updated in the same amendment cycle as the instruments, the templates and the
   protocol; no partial update.
3. Blank contact fields may only be completed from a real accepted appointment recorded outside the
   repository; they may never be filled with a plausible placeholder.
4. The kit cannot be edited to state that a person, authorization, appointment or session exists.
5. An approved version of this kit is required before any session; approval alone does not create
   authorization, training or a supervisor.

## 16. Cross-references

| Document                                           | Relationship                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| `MC10R-HUMAN-INTERVIEWER-OPERATING-MODEL.md` (D21) | Roles, acceptance gates and supervision requirements this kit depends on |
| `MC10R-INTERVIEWER-TRAINING.md` (D22)              | Training that must precede authorized use of this kit                    |
| `MC10R-RECRUITMENT-TEMPLATES-ES-EN.md` (D24)       | Draft scheduling, reminder, cancellation and withdrawal communications   |
| `MC10R-WAVE1-EXECUTION-PLAN.md` (D25)              | The runnable wave protocol this kit supports                             |
| `MC10R-FIELDWORK-CHECKLIST.md` (D26)               | Executable checklist that records the same blanks and statuses           |
| `MC10-RESEARCH-PROTOCOL.md` (MC-10 D4)             | Interview order, moderator discipline and methodology                    |
| `MC10-INSTRUMENT-VERSIONS.md` (MC-10 D5)           | Instrument freeze, hash, amendment defects                               |
| `MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (MC-10 D3)   | Consent, data layers, retention, rights and incident context             |

## 17. Status statement

```
DOCUMENT                        = DRAFT
KIT_VERSION                     = MC10R-OPS-KIT-1.0.0-DRAFT
APPROVED_SCRIPTS                = 0
INSTRUMENT_CANDIDATE_VERSION    = 1.1.0
INSTRUMENT_CANDIDATE_STATUS     = REVIEW_REQUIRED / PROPOSED_NOT_EFFECTIVE
INTERVIEWERS_APPOINTED          = 0
INTERVIEWERS_TRAINED            = 0
SUPERVISOR_CONTACT              = BLANK
SESSIONS_SCHEDULED              = 0
SESSIONS_CONDUCTED              = 0
CONSENT_RECORDS                 = 0
NOTES_SUBMITTED                 = 0
AUTH_MC10_001                   = NOT_GRANTED
OUTREACH_AUTHORIZATION          = NOT_GRANTED
FIELDWORK_STATUS                = BLOCKED
FIELDWORK_READINESS             = PARTIALLY_READY
```

This kit is complete as a manual and empty as an operation. It authorizes no interview and contains no
participant, appointment or contact.
