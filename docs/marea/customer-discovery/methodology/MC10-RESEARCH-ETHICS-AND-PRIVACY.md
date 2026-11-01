# MC-10 — Research ethics and privacy design

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D3 / MC10-RESEARCH-ETHICS-AND-PRIVACY |
| Milestone | MC-10 of 36 — primary customer discovery |
| Status | `DESIGNED — NOT_APPROVED` |
| Milestone status | `BLOCKED` — `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED` |
| Fieldwork | `NOT_EXECUTED`: 0 participants, 0 interviews, 0 recordings, 0 price responses, 0 personal data |
| Approval state | **DESIGNED only.** No data controller is designated, no lawful-basis review has been signed off, no privacy notice is approved, no secure store exists |
| Base | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Date | 2026-11-01 |
| Owner | agent-a-methodologist (Research Methodologist) |
| Authority | `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §11; `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` §4 |
| Is not | legal advice, an approved privacy notice, a controller designation, a completed DPIA, a record of any participant |

> **STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED).** This is a research-ethics
> design, not an approval and not a legal opinion. No controller, no legal sign-off, no participant data.

## 0. How to read this document

This document is the privacy and research-ethics **design** for the MC-10 customer-discovery study,
written so that the study could be operated lawfully **if and when** the programme supplies the missing
external conditions. It is not evidence that any of them exist.

Three facts dominate every section:

1. **No data controller is designated.** `research-status.json` records `W0-03 = BLOCKED`
   (`BLK-MC10-02`) and `W0-04 = BLOCKED` (no verified privacy contact). The programme's legal seller
   identity is `OPEN` (MC-09 `X-02`); a controller cannot be inferred from a proposed brand.
2. **No lawful-basis review exists.** `W0-05 = BLOCKED` (`BLK-MC10-03`). The consent analysis in §3 was
   written by the research methodologist, not by qualified counsel, and the Spanish and Portuguese
   national implementations have **not** been reviewed.
3. **No lawful collection can occur.** `OUTREACH_AUTHORIZATION = NOT_GRANTED`, `FIELDWORK_STATUS =
   BLOCKED`, and no Layer A/B store exists (`W0-12 = BLOCKED`). Therefore **no personal data may be
   collected, and none exists**: not a name, not a phone number, not a recording, not a transcript, not
   a note.

The vocabulary of this milestone is deliberate:

- **DESIGNED** — an internal design artefact exists and can be reviewed.
- **APPROVED** — a named accountable authority has accepted it and the acceptance is recorded.
- **BLOCKED** — an external condition (a controller, a legal sign-off, a storage provision, an
  authorization) does not exist, so the design cannot be operated.

Only the first state applies to this document: every control below is DESIGNED and none is APPROVED.
Nothing in this file weakens any commercial restriction; trademark clearance, source-IP clearance,
product sales, publication, deployment and price approval are unchanged and none is affected by
research preparation.

## 1. Scope and limits

**In scope.** Any future processing of personal data for MC-10 customer discovery, including:
recruitment communications, screening, consent capture, audio recording, note-taking, transcription,
coding, analysis, storage, retention, deletion and the exercise of data-subject rights.

**Out of scope.** MC-09 desk research (public sources only; no personal data), the public website privacy
notice, future consumer accounts, future order or payment data, and any employment or contractor data.
Those require their own instruments and their own approvals.

**Explicit limits.** This document is not a legal opinion. It records the design intent and the questions
counsel must answer; it does not answer them. It cannot be cited as proof of GDPR, LOPDGDD or Lei 58/2019
compliance, and it does not authorise any contact. A qualified review of the lawful basis and of the
recruitment communications is a recorded blocker (`BLK-MC10-03`) and must be completed by a legal adviser
before any fielding.

## 2. Data-controller requirement

### 2.1 Current state

| Required element | State | Evidence |
| --- | --- | --- |
| Named data controller (legal entity) | **UNDESIGNATED** | `research-status.json` `W0-03 = BLOCKED`; `BLK-MC10-02` |
| Verified controller privacy contact | **ABSENT** | `W0-04 = BLOCKED`; no contact may be invented |
| Legal seller identity resolved | **OPEN** | MC-09 `X-02`, cited by `W0-03`; MAREA is a proposed brand |
| Data-protection officer decision | **NOT MADE** | Not assessed; depends on the controller |
| EU representative decision (GDPR Art. 27) | **NOT MADE** | Depends on the controller's establishment |
| Accountability owner for retention | **ABSENT** | `W0-14 = NOT_APPROVED` |
| Breach decision-maker | **ABSENT** | No controller to decide |

No document in this repository may fill these gaps with a placeholder, a proposed brand name, a personal
name or a generic mailbox. Empty is the honest value.

### 2.2 What a designation must contain

Before any processing, the programme owner must record, in an approval artefact outside this design
document:

1. The legal entity acting as controller, its registered address and its registration identifier.
2. A verified, monitored privacy contact route (role-based, not a private individual unless unavoidable).
3. The DPO decision: whether one is required and, if required, the published contact.
4. Whether an EU representative is required and, if so, its identity and contact.
5. The purpose, lawful basis and retention owner for each processing operation in §6.
6. The processor register and any joint-controller analysis (§10, §2.3).
7. Who decides on breach notification, and to which supervisory authority the programme reports
   (Spanish AEPD and/or Portuguese CNPD, depending on where the participant is located).

### 2.3 Joint controllership and gatekeepers

No joint controller has been identified, and none may be assumed. Gatekeepers (yacht clubs, marinas,
associations, installers, retailers) are currently described as introduction channels only. If a
gatekeeper would transmit its own member or customer records to the programme, that transmission is a
separate processing operation requiring its own lawful basis, notice and possibly a joint-controller or
processor arrangement, reviewed before the channel is authorised. Channel authorization is itself a
recorded blocker (`W0-10 = BLOCKED`), so this design flaw must be resolved during channel approval, not
after it.

## 3. Lawful-basis analysis (DESIGNED, not reviewed)

### 3.1 Proposed basis

| Processing operation | Proposed basis | Status |
| --- | --- | --- |
| Participation in a discovery interview | GDPR Art. 6(1)(a) — explicit consent | DESIGNED; not legally reviewed |
| Audio recording (optional) | Art. 6(1)(a) — separate explicit consent | DESIGNED; not legally reviewed |
| Use of de-identified wording in internal research documents | Art. 6(1)(a) — separate explicit consent | DESIGNED; not legally reviewed |
| Follow-up contact (optional) | Art. 6(1)(a) — separate explicit consent with channel and expiry | DESIGNED; not legally reviewed |
| Recruitment communication to a business contact | **UNDECIDED** — consent versus another basis must be analysed per channel and jurisdiction | **BLOCKED** (`W0-10`, `BLK-MC10-04`) |

Special-category data (Art. 9) is **not sought**. The design excludes health, biometric, political,
religious, sexual, criminal and financial-account data. Participants may nevertheless volunteer such
information spontaneously; the stop-and-drop rule in §6.4 applies.

### 3.2 GDPR Article 7 conditions

Consent under Art. 7 requires the controller to demonstrate that the data subject consented. The design
therefore requires, for each of the four permissions:

- A separate, explicit yes/no answer — never a single bundled agreement and never a pre-ticked default.
- A recorded timestamp, language, script version and capture method (verbal with a witness or written).
- An explanation of each permission and its consequence in plain language before the answer is taken.
- The right to withdraw at any time, without justification and without consequence, and a recorded
  withdrawal date that is honoured downstream.
- No conditioning of any service on consent (there is no service and nothing is for sale).
- No incentive that is contingent on an opinion or on agreement to participate. The proposed
  zero-incentive policy is itself `NOT_APPROVED` (`W0-15`), so even a zero-incentive fielding awaits
  approval.
- No "consent by silence" and no consent inferred from a refusal not being expressed.

Because no controller exists, no consent can currently be validly requested or recorded: the information
in Art. 13 cannot be completed without the controller's identity and contact. Any consent text issued
now would be defective, which is one reason fieldwork is blocked rather than "in preparation".

### 3.3 GDPR Article 13 information elements

| Element required by Art. 13 | Where designed | Status |
| --- | --- | --- |
| Identity and contact details of the controller | Consent script, §5.2 of the discovery plan, and §2.2 here | **CANNOT BE COMPLETED** — controller absent |
| Contact details of the DPO, if any | Not in the script; §2.2 decision | **OPEN** |
| Purposes and lawful basis of processing | Consent script; §3.1 | DESIGNED |
| Legitimate interests, if relied on | Not applicable while consent is the proposed basis | DESIGNED |
| Recipients or categories of recipients | Consent script refers to the study team only; processor rules §10 | DESIGNED |
| Transfers to a third country and safeguards | None planned; must be re-checked if a tool is introduced | DESIGNED |
| Retention period or criteria | Consent script states "only as long as needed"; §8 sets the schedule | DESIGNED, owner absent |
| Data-subject rights | Consent script lists access, rectification, erasure and objection; §9 expands | DESIGNED, route absent |
| Right to withdraw consent | Consent script; §7 | DESIGNED |
| Right to lodge a complaint with a supervisory authority | **MISSING from the instrument text** — a defect registered in `MC10-INSTRUMENT-VERSIONS.md` §7 | **DEFECT** |
| Whether provision is statutory/contractual and consequences of failure | Not applicable; nothing is contracted | DESIGNED |
| Automated decision-making, including profiling | None; no automated decisions are made about participants | DESIGNED |

The missing complaint route is a material information defect. A participant must be told which
supervisory authority they may complain to; that authority depends on the controller's establishment,
which is undesignated. This cannot be fixed by drafting alone.

### 3.4 National implementations

- **Spain — LOPDGDD (Ley Orgánica 3/2018).** Named as an applicable implementation. **Not reviewed.**
  No conclusion is drawn about any additional requirement (for example information duties, age thresholds
  for information-society services, or the treatment of business-contact data).
- **Portugal — Lei 58/2019.** Named as an applicable implementation. **Not reviewed.** No conclusion is
  drawn about any additional requirement.

Because northern Portugal cannot be fielded anyway (Portuguese instruments are `NOT_PRODUCED`,
`BLK-MC10-07`), no Portuguese fieldwork is presently contemplated; the Portuguese review requirement is
therefore recorded rather than waived. Reviewing only the Spanish implementation would still leave
`W0-05` incomplete for any participant located in Spain, and must not be represented as a legal opinion
on the programme as a whole.

### 3.5 Recruitment communications

The lawful basis for approaching a candidate — especially a business contact at a listed installer,
retailer, marina or fleet operator — has **not** been analysed. Consent cannot be assumed for a first
contact, and a legitimate-interests assessment has not been performed. This is recorded as part of
`BLK-MC10-03` and must be resolved per channel, per jurisdiction, before any channel is authorised.

## 4. Data layers A/B/C

The programme separates three layers. Only Layer C may ever enter the repository.

| Layer | Contents | Storage | Repository | Current state |
| --- | --- | --- | --- | --- |
| **A — restricted operational** | Contact key (name, channel, contact details), permission records, scheduling notes, follow-up ledger | Access-controlled store with named access list, encryption at rest, deletion date | **NEVER** | Does not exist (`W0-12 = BLOCKED`) |
| **B — restricted research** | Pseudonymous participant records, audio, transcripts, raw notes, raw price answers, coding working files | Access-controlled research store, separate from Layer A, study-team access only | **NEVER** | Does not exist (`W0-12 = BLOCKED`) |
| **C — repository aggregate** | Counts, coded aggregates, segment-level summaries, pre-registered derived tables, empty scaffolds | Git repository | Permitted, under the rules in §4.2 | Exists, containing only zeros |

### 4.1 What may never enter the repository

The following must never be committed to this repository, in any branch, PR, issue, test fixture or
generated file:

- Participant names, contact details, postal or email addresses, telephone numbers.
- Audio recordings, video, transcripts, raw interview notes or any verbatim text tied to a participant.
- Berth numbers, vessel names, vessel registration or hull numbers, insurance or policy numbers.
- Marina customer lists, club membership lists, installer customer rosters, manifests, billing data.
- Any special-category data, and any free-text field that could contain it.
- Case-level coding files or participant-indexed tables beyond the pre-registered aggregate outputs.
- Any document that would let a reader re-identify a participant by combining the published fields.
- Quotes used as customer testimonials, marketing copy or public evidence.

### 4.2 Rules for Layer C in the repository

1. Layer C contains **aggregate counts and pre-registered analysis outputs only**.
2. Every count must be traceable to a reconciliation record outside the repository; the repository
   records the aggregate and the fact of reconciliation, never the records themselves.
3. No demographic cross-tabulation, no case-level listing, no free-text narrative, no quotation may be
   added without a recorded approval that does not currently exist.
4. Participant IDs may appear in Layer C only as opaque labels in analysis tables if they are random,
   non-derived and not linked to any identifying attribute.
5. The repository may describe the *design* of a study in full; it may not contain the *material* of a
   study.

### 4.3 Verbatim quotes

The consent model includes a separate quotation permission (`C3`). It does not authorise public
marketing use, testimonial use, or use while MAREA is an uncleared brand. Even for internal research
use, the default in this repository is **no quotation**. A quote may enter a repository document only
if all of the following exist and are recorded: a valid `C3` permission, a de-identification review, a
named approver, and a documented check that the combination of fields does not re-identify the speaker.
None of those exists, so no quote may be added today. The correct current value is: zero quotations.

## 5. Consent model — four separate permissions

| Permission | Content of the question | Optional | Withdrawal effect |
| --- | --- | --- | --- |
| `C1` Participation | Agree to take part in this conversation | No — without `C1` there is no conversation | Stops the session; no data may be used |
| `C2` Recording | Agree to audio recording for accuracy | Yes — declining does not exclude participation | Recording stopped and, on request, destroyed; notes-only mode applies |
| `C3` Quotation | Agree to de-identified wording being used in internal research documents | Yes | Existing draft use stopped; no new use; downstream documents corrected where feasible |
| `C4` Follow-up | Agree to be contacted about a later stage, with channel, scope and end date | Yes | Contact stops at once; Layer A key deleted if no other permission requires it |

### 5.1 Consent record fields

Each consent record must capture: participant ID; permission (`C1`–`C4`); granted yes/no; timestamp;
capture method; language; instrument and script version; the identity of the person taking consent (an
interviewer identifier, not a public name in the repository); withdrawal flag and date. The record lives
in Layer A, never in this repository.

### 5.2 Validity rules

- Consent is taken **before** screening notes, recording or any other data capture; the screener is
  administered only after the caller has identified themselves and the study.
- Consent is not bundled: hesitation on `C2` is recorded as "no" until an explicit yes is given.
- Consent is not treated as a commercial signal, a lead or a purchase intention.
- A material change to the study (new instrument version, new purpose, new channel) requires fresh
  consent for the affected permission; the old consent is not stretched to cover it.
- Participants are told they may stop at any point, skip any question and withdraw without a reason.

### 5.3 Registered instrument wording issue

The Spanish consent instrument refers to quoted wording as *anonymous* while the English instrument
says *anonymised*, and this design treats quotation as **de-identified at most, never guaranteed
anonymous** (§7). The wording must be corrected by a dated instrument amendment before fielding; until
then `C3` must be explained verbally as "de-identified, not anonymous". This defect is registered in
`MC10-INSTRUMENT-VERSIONS.md` §7 and does not permit any use of quotations under the present state.

## 6. Minimisation and the field allowlist

### 6.1 Allowed fields

| Field | Form | Layer |
| --- | --- | --- |
| Participant ID | Random opaque ID | B |
| Segment | `SEG-01` … `SEG-08` | B/C aggregate |
| Role | Broad role category (owner, decision-maker, technical lead, buyer) | B |
| Country / broad region | Region only, never an address | B |
| Language of interview | `ES` / `EN` | B |
| Acquisition source | Channel category, not a named person | B |
| Vessel/business profile | Bands (length bands, fleet-size bands, years active bands) | B |
| Consent flags `C1`–`C4` | Yes/no + timestamp | A |
| Purchase history | Category, year, amount band, currency, VAT treatment as stated | B |
| Spend bands | Category + band + currency | B |
| Price opinions | Point shown, response category, currency, VAT treatment, verbatim reasoning | B |
| Verbatim statements | Only for coded analysis, in Layer B | B |
| Barrier ranking | Codes + rank 1–3 | B |
| Comprehension | Per concept: inclusions, exclusions, misconception codes | B |
| Follow-up permission | Yes/no, channel, scope, expiry | A |
| Interviewer quality flags | Rushed, leading, translation issue, confusion | B |

### 6.2 Prohibited fields

No collection of full names, addresses, berth or registration numbers, identity-document numbers,
payment or billing data, insurance policy numbers, customer or member lists, employee records, health
or other special-category data, vehicle or vessel tracking credentials, or any field not on the
allowlist. "Unknown" is recorded as unknown and is never coerced to zero.

### 6.3 Minimisation tests

Before any field is added, the study must answer three questions in writing: (a) which analysis needs
it; (b) whether a band or code would suffice; (c) when it will be deleted. No field may be added for
"possible future interest", marketing, lead generation, partner reporting or investor material.

### 6.4 Stop-and-drop rule for volunteered sensitive data

If a participant volunteers special-category or identifying information (health, family situation,
identity documents, exact address), the moderator does not record it, does not probe it, and marks the
record "volunteered sensitive detail — not captured". If it was accidentally captured, it is redacted
from Layer B and the incident procedure in §13 applies. No attempt is made to "use it because it was
volunteered".

## 7. Pseudonymisation is not anonymisation

Participant records are **pseudonymised**, not anonymous. A pseudonymous record remains personal data
under GDPR because a key exists and because the remaining attributes may still single out an individual.

Re-identification risk factors in this study: a small, geographically concentrated population; a narrow
segment combined with vessel length band, base region and a distinctive recent purchase; an incident
narrative with dates; an unusual role in a small local market. Any of these can identify a person even
without a name.

Design consequences:

- The contact key maps participant IDs to identities; it lives in Layer A, access-restricted, with a
  deletion date, and is never joined to Layer B on any machine outside the approved store.
- Analysis outputs are aggregated by segment; case-level summaries stay in Layer B.
- Distinctive details are banded or generalised in any derived text: no dates more precise than a month,
  no berth or vessel identifiers, no "the only installer in [town]" phrasing.
- No document may describe the study population as anonymous, and no consent language may promise
  anonymity for quotations.
- If a record is genuinely anonymised (irreversibly, with no key and no re-identification route), it may
  leave personal-data controls only after an anonymisation review; that review does not exist, so the
  default is "personal data, restricted".

## 8. Retention and deletion (DESIGNED, owner absent)

| Data class | Retention | Deletion trigger | Accountable owner |
| --- | --- | --- | --- |
| Layer A contact key | Until end of MC-10 | Deleted at milestone close unless `C4` records a later date and scope | Data steward (not assigned) |
| Consent evidence (`C1`–`C4`) | As long as needed to demonstrate compliance | Controller-defined retention period — **not set** | Controller (**undesignated**) |
| Audio | Until the verbatim excerpt is verified | Destroyed immediately after verification | Interviewer / data steward (not assigned) |
| Transcripts and raw notes | Until analysis and coding are complete | Deleted or irreversibly anonymised at milestone close | Data steward (not assigned) |
| Coded working files (Layer B) | Until the MC-10 decision is recorded | Deleted at milestone close | Research methodologist (design owner only) |
| Layer C aggregate outputs | Repository history | Retained; contains no personal data | Lead |
| Repository documents | Repository history | Retained | Lead |

Rules: deletion is logged outside the repository with date, data class, and the reason; a deletion is not
"completed" until the backup path is also addressed; no data is retained "for possible future
research" without a fresh lawful basis and consent. Because no controller exists, the retention period
and the accountable owner are **not approved**, and no deletion can be certified.

## 9. Data-subject rights handling

| Right | Designed route | Deadline (design target) | Current feasibility |
| --- | --- | --- | --- |
| Information (Art. 13/14) | Consent script + notice | Before collection | **BLOCKED** — controller identity absent |
| Access | Privacy contact route → Layer A/B lookup by ID | One month, extendable | **BLOCKED** — no contact route exists |
| Rectification | Correct Layer A/B record and downstream coding if affected | One month | **BLOCKED** |
| Erasure | Delete Layer A key and Layer B record; update coded aggregates where they can no longer identify | One month | **BLOCKED** |
| Restriction | Flag record and stop analysis use | Immediately | **BLOCKED** |
| Portability | Not applicable to this research design (no automated processing based on consent for a service) | — | NOT APPLICABLE — recorded, not assumed silently |
| Objection | Stop processing and notify controller | Immediately | **BLOCKED** |
| Withdraw consent | Stop the session or remove the record; log date | Immediately | **BLOCKED for recorded data**; the verbal STOP procedure in §12 works in-session |
| Complaint to a supervisory authority | Route named in the notice | — | **MISSING from instruments**; authority depends on controller |

Identity verification for a rights request must use the minimum data already held; no new identifying
data is collected to satisfy a request. No fee is charged. Because no privacy contact exists, the honest
statement is that MC-10 currently has **no operable rights channel**; this is part of `W0-04` and
`BLK-MC10-02`, not a drafted document that can be released.

## 10. Processor and tooling rules

**Current state: no processor is engaged, because no data exists and no tool is approved.**

If a tool is introduced after authorization, all of the following are prerequisites:

1. A written data-processing agreement under GDPR Art. 28 (subject matter, duration, nature and purpose,
   instructions, confidentiality, security, sub-processor rules, assistance with rights and breach
   notification, deletion or return, audit).
2. An EU data-residency and transfer review, including the identification of any Chapter V transfer and
   its safeguard.
3. A security review of access control, encryption, logging and exit/export/deletion.
4. A sub-processor list reviewed before use.
5. A DPIA determination: if the study is scaled, combined with other processing, or introduces new
   technology, a DPIA is required before processing.

**Hard prohibitions, in force now:**

- No participant data, audio, transcript or raw note may be pasted into a consumer AI assistant, a free
  transcription service, a public chatbot, a personal cloud drive, a personal messaging app, or a
  spreadsheet outside the approved store.
- No automated transcription without an approved processor agreement and a human verification step.
- No AI system may be used to generate, simulate, extend or reconstruct participant statements. Synthetic
  dialogue is never evidence and never becomes a record.
- The research repository is not a data store: agents and scripts may operate on the documents in this
  repository, but they may not be given participant data to process.

This also binds the agent tooling used to prepare this milestone: documentation preparation needs no
participant data, and none has been introduced.

## 11. Breach response (draft, not operable)

A personal-data breach includes: loss or theft of a device holding Layer A/B data; an email or message
sent to the wrong recipient; a misconfigured share; unauthorised access; accidental publication of a
transcript or audio; loss of a contact key; accidental disclosure of special-category or identifying
detail.

Designed steps:

| Step | Action | Owner | Timeline |
| --- | --- | --- | --- |
| 1 | Stop the exposure, contain, preserve evidence | Discoverer → data steward | Immediately |
| 2 | Assess severity, categories and numbers affected, likely consequences | Controller + data steward | Within hours |
| 3 | Record in the internal breach register (outside repository) | Data steward | Same day |
| 4 | Notify the supervisory authority if the breach is likely to result in a risk | Controller | Without undue delay, where feasible within 72 hours of awareness (Art. 33) |
| 5 | Notify affected participants if high risk | Controller | Without undue delay (Art. 34) |
| 6 | Processors notify the controller | Processor | Without undue delay |
| 7 | Remediate, review and record lessons | Controller | After containment |

**Status: BLOCKED.** There is no controller, no DPO decision, no breach register, no privacy contact and
no supervisory-authority mapping. The draft cannot be operated and must not be described as a
functioning procedure. It is a design so that a real incident is not improvised afterward.

## 12. STOP and withdrawal procedure

### 12.1 During the session

1. Any of these stops the session immediately: "stop", "I don't want to continue", "withdraw", a request
   to delete the recording, visible distress, or a request to leave.
2. The moderator stops the recording first (if recording), then speaking; no persuasion, no "just one
   more question", no guilt, no incentive argument.
3. Record: time, which permission was withdrawn, and the participant's own words only if the participant
   supplied them and agrees; do not record a reason they did not give.
4. Offer a short debrief and the privacy contact route — which **does not exist yet**, so the honest
   script line is that the contact route will be supplied by the controller before any study begins.
   This is a fielding blocker, not a gap to improvise around.
5. If the participant asks for deletion, no further data is used and the record is flagged for deletion.

### 12.2 After the session

- The withdrawal is logged in Layer A with date and scope (`C1` participation, `C2` recording, `C3`
  quotation, `C4` follow-up) and propagated to Layer B and any analysis artefact.
- Withdrawal of `C2` destroys the audio; withdrawal of `C3` stops quotation use and corrects draft
  documents where feasible; withdrawal of `C4` deletes the follow-up contact data.
- Withdrawal of consent for participation means the record is not used for analysis; if analysis has
  already aggregated it, the controller decides whether the aggregate can stand (aggregates that cannot
  identify the person do not necessarily have to be re-opened), and the decision is recorded.
- No reason is required, no consequence follows, and no future approach is made without a fresh
  permission.

## 13. Incidents and deviations

Research incidents and their handling:

| Incident | Immediate action | Recorded where | Re-entry condition |
| --- | --- | --- | --- |
| Consent not properly taken | Stop; do not use the record; if data captured, delete or flag | Deviation log outside repository | Re-consent on a fresh session |
| Recording continued after `C2` refused | Stop and destroy the file; verify deletion | Deviation log | Session notes only, or exclusion |
| Wrong participant interviewed | Stop at screening failure; do not count; do not code | Deviation log + recruitment ledger | Excluded |
| Special-category data volunteered or captured | Stop recording; redact; notify controller | Incident log | Controller decision |
| Data sent to the wrong recipient | Contain, recall where possible, assess, breach assessment | Breach register | Controller decision |
| Accidental repository commit of participant data | Revert before push; purge if pushed; breach assessment | Incident log | Lead + controller decision |
| Instrument deviation (question skipped, ladder altered) | Record the deviation; flag the affected data | Deviation log | Analysis reports the deviation; no silent repair |

No incident may be resolved by editing a document to look consistent. No synthetic record may be created
to replace a lost one.

## 14. Cross-references

| Document | Relationship |
| --- | --- |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §11 | Source privacy design this document formalises |
| `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` §4 | Cross-cutting ethics and privacy safeguards |
| `docs/marea/customer-discovery/data/fieldwork-authorization.json` | `AUTH-MC10-001 = NOT_GRANTED`; the gate |
| `docs/marea/customer-discovery/data/research-status.json` | Blockers `BLK-MC10-02` … `BLK-MC10-05`; checklist `W0-03` … `W0-15` |
| `docs/marea/customer-discovery/data/decisions.json` | `D-029`–`D-032` invariant decisions |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-PROTOCOL.md` (D4) | Operational protocol that relies on these controls |
| `docs/marea/customer-discovery/methodology/MC10-INSTRUMENT-VERSIONS.md` (D5) | Frozen consent, screener and note instruments; registered wording defects |
| `docs/marea/customer-discovery/methodology/MC10-QUALITATIVE-ANALYSIS.md` (D11) | Coding and reporting rules for Layer C |
| `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md` | Authorization register and unblock sequence |
| `docs/marea/customer-discovery/data-contract/MC10-DATA-CONTRACT.md` | Machine-readable schema for Layers A/B/C and the reconciliation rules |

## 15. DESIGNED versus APPROVED register

| Item | State | Evidence / blocker |
| --- | --- | --- |
| Data-controller designation requirement | DESIGNED | `W0-03 = BLOCKED`, `BLK-MC10-02` |
| Privacy contact | ABSENT | `W0-04 = BLOCKED` |
| Lawful basis (Art. 6(1)(a), four permissions) | DESIGNED, not reviewed | `W0-05 = BLOCKED`, `BLK-MC10-03` |
| GDPR Art. 7 conditions | DESIGNED | Not reviewed |
| GDPR Art. 13 information set | DESIGNED but incomplete (complaint route missing) | Instrument defect; controller absent |
| Spanish national-law review | NOT PERFORMED | `BLK-MC10-03` |
| Portuguese national-law review | NOT PERFORMED | `BLK-MC10-03` |
| Recruitment-communication basis | NOT ANALYSED | `BLK-MC10-03`, `BLK-MC10-04` |
| Three-layer A/B/C model | DESIGNED | This document §4 |
| Layer A/B storage | DOES NOT EXIST | `W0-12 = BLOCKED`, `BLK-MC10-05` |
| Restricted access policy | DESIGNED, not accepted | `W0-13 = NOT_APPROVED` |
| Consent model (C1–C4) | DESIGNED | Not approved |
| Minimisation allowlist | DESIGNED | Not approved |
| Pseudonymisation rule | DESIGNED | Not implemented (no data) |
| Retention and deletion schedule | DESIGNED, owner absent | `W0-14 = NOT_APPROVED` |
| Rights handling | DESIGNED, not operable | No contact route |
| Processor rules | DESIGNED | No processor engaged |
| Breach response | DRAFT | No controller, no DPO, no register |
| STOP/withdrawal procedure | DESIGNED | In-session only; rights route absent |
| Incident handling | DESIGNED | Not adopted by any operator |
| Privacy notice | NOT APPROVED | `W0-06 = NOT_APPROVED` |
| Zero-incentive policy | NOT APPROVED | `W0-15 = NOT_APPROVED` |
| Any participant data | NONE EXISTS | Fieldwork blocked |
| Any legal sign-off | NONE OBTAINED | — |

No row above is APPROVED. Moving any row to APPROVED requires the recorded acceptance of the item by the
accountable authority named in §2.2, and that acceptance must be cited here by artefact and date.

## 16. Change control

This design is version 1.0.0. Material changes (new data field, new processor, new jurisdiction, change
to the four permissions, change to retention) require a dated amendment, a named reviewer, a new version
and a re-check of the blockers in §15. Wording-only corrections that do not change meaning are recorded
as patch revisions. No change may be made retroactively to imply that a control existed earlier than it
did. No legal approval, controller identity or storage provision may be assumed by editing this document.
