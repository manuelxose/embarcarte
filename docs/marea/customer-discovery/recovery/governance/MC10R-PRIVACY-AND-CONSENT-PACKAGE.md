# MC10R — Privacy and consent package (D16)

| Field                        | Value                                                                                                                                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Document ID                  | MC-10R / D16 / `MC10R-PRIVACY-AND-CONSENT-PACKAGE`                                                                                                                                                                                                                 |
| Document status              | `DRAFT_FOR_LEGAL_REVIEW`                                                                                                                                                                                                                                           |
| Legal review status          | `LEGAL_REVIEW_PENDING`                                                                                                                                                                                                                                             |
| Date                         | 2026-11-01                                                                                                                                                                                                                                                         |
| Owner                        | `agent-c-governance` (Research Ethics, Privacy and Governance Specialist)                                                                                                                                                                                          |
| Scope                        | Participant information content, four-permission consent design, consent record fields, optional recording/quotation/follow-up permissions, retention, withdrawal propagation, deletion, re-identification risk and the machine-readable consent/permission state. |
| Is not                       | an approved privacy notice, a consent instrument approval, a legal opinion, a controller designation, a record of any participant                                                                                                                                  |
| Candidate consent instrument | `CONSENT-01` v`1.1.0` — proposed, `PROPOSED_NOT_APPROVED`                                                                                                                                                                                                          |
| Authorization record         | `AUTH-MC10-001` revision 2 — `DRAFT_PREPARED` / `NOT_GRANTED`                                                                                                                                                                                                      |
| Fieldwork permission         | `FALSE`                                                                                                                                                                                                                                                            |
| Framework status             | `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED`                                                                                                                                                                                               |
| Milestone                    | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36)                                                                                                                                                                                        |
| Branch                       | `feature/marea-mc10r-fieldwork-recovery` (base `d1ac69a`)                                                                                                                                                                                                          |

> **STATUS: DRAFT_FOR_LEGAL_REVIEW — LEGAL_REVIEW_PENDING. No privacy notice may be issued, no consent
> may be requested and no participant data may be collected. Controller identity is OPEN, privacy
> contact is OPEN, the complaint route is undetermined, and no consent instrument is approved. Zero
> participants, zero consents, zero recordings and zero interviews exist.**

## 1. Purpose and limits

This package designs what a participant would be told and what a consent record would contain **if** a
real authorization, a designated controller, a reviewed legal basis and an approved instrument ever
exist. It is the input to the legal review in `MC10R-LEGAL-REVIEW-PACKAGE.md` (D15) and to the
authorization fields `controllerIdentity`, `privacyContact`, `approvedInstrumentVersions` and
`withdrawalRevocationMechanism` in D13.

It records no participant and no consent. It cannot be used as a notice, cannot be read aloud as an
approved script, and cannot be cited as evidence of compliance with GDPR, the LOPDGDD or Lei 58/2019.

## 2. Current blockers to any notice and any consent

| Blocker             | State                                         | Consequence                                                                                      |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Controller identity | `OPEN` — no verified legal entity             | GDPR Article 13 requires the controller's identity and contact; no valid notice can be completed |
| Privacy contact     | `OPEN` — no verified contact route            | No rights channel, no withdrawal route and no contact statement can be issued                    |
| Legal review        | `LEGAL_REVIEW_PENDING`                        | Every lawful-basis and information element is unreviewed                                         |
| Consent instrument  | `CONSENT-01` v`1.1.0` `PROPOSED_NOT_APPROVED` | No consent may be requested or recorded                                                          |
| Complaint route     | `OPEN` — competent authority undetermined     | The notice cannot state the right to complain to a supervisory authority                         |
| Storage             | not provisioned                               | No consent record or participant data can be held lawfully or securely                           |
| Authorization       | `NOT_GRANTED`                                 | No contact, screening, interview or recording may occur                                          |

The honest conclusion is that **no notice can be issued while the controller is `OPEN`**, and no consent
requested against an incomplete notice would be valid.

## 3. Participant information — required content

The participant information must contain at least the items below. Status vocabulary: `CANNOT_BE_COMPLETED`,
`DESIGNED_NOT_REVIEWED`, `DESIGNED_PENDING_CONTROLLER`, `OPEN`.

| #       | Required information                                                       | Designed content position                                                                                                            | Status                        | Blocking dependency                  |
| ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------------------------------ |
| `PI-01` | Identity and contact details of the controller                             | `OPEN` — no verified legal entity exists; no placeholder or brand name may be used                                                   | `CANNOT_BE_COMPLETED`         | D13 `controllerIdentity`; D15 `Q-01` |
| `PI-02` | Contact details of the data protection officer, if any                     | Decision not made; no contact exists                                                                                                 | `OPEN`                        | Controller designation               |
| `PI-03` | Purposes of the processing                                                 | Internal exploratory customer-discovery research only; four segments; no commercial or marketing use                                 | `DESIGNED_NOT_REVIEWED`       | D15 `Q-03`…`Q-09`                    |
| `PI-04` | Lawful basis for each purpose                                              | Separately identified per operation: participation, optional recording, de-identified quotation, optional follow-up, initial contact | `DESIGNED_NOT_REVIEWED`       | D15 §5 and `Q-03`…`Q-09`             |
| `PI-05` | Recipients or categories of recipients                                     | Study team only; no processor engaged; gatekeeper role undetermined                                                                  | `DESIGNED_NOT_REVIEWED`       | D15 §14, `Q-02`                      |
| `PI-06` | Transfers to a third country and safeguards                                | None planned; no tool selected                                                                                                       | `DESIGNED_NOT_REVIEWED`       | D15 §15, `Q-16`                      |
| `PI-07` | Retention period or criteria                                               | Per-data-class schedule designed; no controller-set period exists                                                                    | `DESIGNED_PENDING_CONTROLLER` | D15 `Q-14`; section 8                |
| `PI-08` | Data-subject rights                                                        | Access, rectification, erasure, restriction, objection and withdrawal are designed                                                   | `DESIGNED_NOT_REVIEWED`       | D15 §12, `Q-15`                      |
| `PI-09` | Right to withdraw consent at any time                                      | Designed: in-session STOP plus recorded withdrawal event, no reason required, no consequence                                         | `DESIGNED_NOT_REVIEWED`       | Section 4, section 8                 |
| `PI-10` | Right to lodge a complaint with a supervisory authority                    | The statutory authorities are the Spanish AEPD and the Portuguese CNPD; the determinate competent authority and route are `OPEN`     | `OPEN`                        | D15 §17, `Q-12`                      |
| `PI-11` | Whether provision is statutory or contractual, and consequences of failure | Not applicable: participation is voluntary and nothing is contracted or sold                                                         | `DESIGNED_NOT_REVIEWED`       | D15 `Q-06`                           |
| `PI-12` | Automated decision-making, including profiling                             | None; no automated decision is made about a participant                                                                              | `DESIGNED_NOT_REVIEWED`       | —                                    |
| `PI-13` | Optional audio-recording permission                                        | Separate optional choice; declining does not exclude participation; recording-specific effects explained                             | `DESIGNED_NOT_REVIEWED`       | D15 §10, `Q-07`                      |
| `PI-14` | Optional de-identified quotation permission                                | Separate optional choice; explicitly "de-identified, not anonymous"; internal research documents only; no public or marketing use    | `DESIGNED_NOT_REVIEWED`       | D15 `Q-08`, section 6                |
| `PI-15` | Optional follow-up contact permission                                      | Separate optional choice with channel, scope and end date                                                                            | `DESIGNED_NOT_REVIEWED`       | D15 `Q-09`                           |
| `PI-16` | Source of the contact data, where not obtained from the participant        | Required where a gatekeeper is involved; gatekeeper data flow undetermined                                                           | `OPEN`                        | D15 `Q-02`                           |
| `PI-17` | Language and accessibility of the notice                                   | ES and EN drafts intended; no qualified review; PT not produced                                                                      | `DESIGNED_NOT_REVIEWED`       | D15 `Q-10`, `Q-11`; D14 `P-07`       |
| `PI-18` | Version, date and instrument identifier of the notice                      | To be assigned only on approval; candidate instrument is `CONSENT-01` v`1.1.0`                                                       | `OPEN`                        | Approval does not exist              |

## 4. Consent design — four separately recorded permissions

Each permission is recorded **separately**, with its own question, its own yes/no answer and its own
timestamp. A single bundled agreement is not permitted, a pre-ticked default is not permitted and
consent by silence is not permitted. All permissions are `PROPOSED_NOT_APPROVED`.

| Permission                     | What the participant is asked                                                                  | Optional?                                           | If declined                              | Withdrawal effect                                                                                                                    | Recorded status         |
| ------------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `C1` — Participation           | Whether to take part in the conversation about their own marine-electronics experience         | Required — without it there is no session           | No conversation; no data may be captured | Stop the session; do not use the record for analysis; controller decides the treatment of aggregates that cannot identify the person | `PROPOSED_NOT_APPROVED` |
| `C2` — Audio recording         | Whether the conversation may be audio-recorded for accuracy                                    | Optional — declining does not exclude participation | Notes-only mode; no recording            | Stop the recording and destroy the audio; the treatment of any already-verified excerpt is a legal question (`Q-07`)                 | `PROPOSED_NOT_APPROVED` |
| `C3` — De-identified quotation | Whether de-identified wording may be used in internal research documents                       | Optional                                            | No quotation use at all                  | Stop existing draft use; no new use; correct draft documents where feasible                                                          | `PROPOSED_NOT_APPROVED` |
| `C4` — Follow-up contact       | Whether the participant may be contacted about a later stage, with channel, scope and end date | Optional                                            | No follow-up                             | Contact stops at once; delete the follow-up contact data unless another recorded permission requires a limited retention             | `PROPOSED_NOT_APPROVED` |

### 4.1 Consent validity rules

1. Consent is requested **before** screening notes, recording or any other data capture.
2. Each permission receives an explicit yes/no; hesitation is recorded as no until an explicit yes is
   given.
3. The plain-language explanation of each permission and its consequence precedes the answer.
4. A recorded timestamp, language, capture method and instrument version are captured for each
   permission.
5. Consent is not conditioned on any service, purchase or opinion; nothing is for sale in this research.
6. There is no incentive contingent on an opinion or on agreeing to participate; the zero-incentive
   policy is proposed and not approved.
7. A material change (new instrument version, new purpose, new channel, new jurisdiction) requires a
   fresh consent for the affected permission; an old consent is never stretched to cover it.
8. Withdrawal is possible at any time, without justification and without consequence, and a recorded
   withdrawal event is honoured downstream.
9. Consent cannot be validly requested while the controller identity, privacy contact and lawful-basis
   review are missing; the current state therefore yields zero valid consent requests and zero records.

## 5. Consent record — required fields

A future consent record is held in Layer A (restricted operational store) outside this repository. No
consent record exists today.

| #       | Field                       | Meaning                                                                                                             | Required                        |
| ------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `CR-01` | `consentRecordId`           | Opaque record identifier generated by the approved store                                                            | Yes                             |
| `CR-02` | `participantId`             | Random opaque identifier; never a name or contact                                                                   | Yes                             |
| `CR-03` | `consentInstrumentId`       | `CONSENT-01` (candidate)                                                                                            | Yes                             |
| `CR-04` | `consentInstrumentVersion`  | `1.1.0` (candidate; must be the approved version at capture time)                                                   | Yes                             |
| `CR-05` | `consentLanguage`           | `ES` or `EN` (PT only under an approved PT instrument)                                                              | Yes                             |
| `CR-06` | `consentDate`               | Date and timestamp of capture                                                                                       | Yes                             |
| `CR-07` | `captureMethod`             | Verbal with witness, written, or another recorded method approved by counsel                                        | Yes                             |
| `CR-08` | `C1_participation`          | `GRANTED` / `NOT_GRANTED` plus timestamp                                                                            | Yes                             |
| `CR-09` | `C2_audioRecording`         | `GRANTED` / `NOT_GRANTED` plus timestamp; `NOT_APPLICABLE` only when participation was not given                    | Yes                             |
| `CR-10` | `C3_deIdentifiedQuotation`  | `GRANTED` / `NOT_GRANTED` plus timestamp                                                                            | Yes                             |
| `CR-11` | `C4_followUpContact`        | `GRANTED` / `NOT_GRANTED` plus channel, scope and end date                                                          | Yes                             |
| `CR-12` | `interviewerId`             | Non-identifying interviewer identifier; no public name in the repository                                            | Yes                             |
| `CR-13` | `applicableWithdrawalEvent` | `NONE` or the withdrawal event identifier with date, scope and affected permissions                                 | Yes                             |
| `CR-14` | `retentionDeletionDate`     | Date or rule for deletion of the record per the controller-set schedule                                             | Yes once the controller sets it |
| `CR-15` | `identityKeyLocation`       | `LAYER_A_ONLY` — the link between `participantId` and identity is held in Layer A, never in the research repository | Yes                             |

### 5.1 No identity keys in the research repository

Names, contact details, addresses, phone numbers, postal or email addresses, vessel identifiers, berth
numbers and any key that maps a participant identifier to an identity must never enter this repository.
The mapping lives in Layer A; Layer B holds pseudonymous research records; Layer C holds aggregates only.
No participant data exists in this repository today.

## 6. De-identification is not anonymity

1. **Pseudonymous records remain personal data.** A key exists and the remaining attributes may single
   out an individual, so no record may be described as anonymous.
2. **Removing a name alone does not guarantee anonymity.** In a small, geographically concentrated
   population, a role, region, vessel-length band, recent purchase or distinctive incident can identify
   a person without any name.
3. **Re-identification risk factors** in this design: narrow segments; Rías Baixas / Galicia
   concentration; marina or yard role combined with vessel profile; unusual local role; incident
   narratives with dates. Derived text must be banded and generalised.
4. **`C3` covers internal research documents only.** It does not authorise public testimonial, marketing,
   advertising, product-page or investor use. Public use needs a **separate reviewed permission**, a
   de-identification review, a named approver and a re-identification check — none exists.
5. **Public testimonial use is blocked by brand and commercial governance in any case.**
   `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `COMMERCIAL_PUBLICATION = BLOCKED`,
   `PRODUCT_SALES = BLOCKED`. Even a valid `C3` could not lift those restrictions, and no quotation may
   be quoted, published or reused as customer evidence.
6. **The default is no quotation.** The correct current count of quotations, testimonial permissions and
   public research excerpts is zero.

## 7. Retention, deletion and withdrawal propagation

The schedule is designed; no period is controller-set and no accountable owner is designated. No
operational store exists, so no deletion can be certified.

| Data class                         | Layer | Retention rule (designed)                   | Deletion trigger                                                         | Accountable owner                                   |
| ---------------------------------- | ----- | ------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------- |
| Contact key and permission records | A     | Until the end of the study                  | Deleted at milestone close unless `C4` records a later date and scope    | `OPEN` — controller/data steward not designated     |
| Consent evidence                   | A     | As long as needed to demonstrate compliance | Controller-set retention period — not set                                | `OPEN` — controller                                 |
| Audio recording                    | B     | Until a verbatim excerpt is verified        | Destroyed immediately after verification; withdrawal of `C2` destroys it | `OPEN` — data steward                               |
| Transcripts and raw notes          | B     | Until analysis and coding complete          | Deleted or irreversibly anonymised at milestone close                    | `OPEN` — data steward                               |
| Coded working files                | B     | Until the programme decision is recorded    | Deleted at milestone close                                               | `OPEN` — research methodologist (design owner only) |
| Aggregate outputs                  | C     | Repository history                          | Retained; no personal data                                               | Lead                                                |
| Repository documents               | C     | Repository history                          | Retained                                                                 | Lead                                                |

### 7.1 Withdrawal propagation

| Withdrawal event                                                            | Immediate action                                                   | Downstream propagation                                                                                                        |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `C1` participation withdrawn                                                | Stop the session; flag the record as not analysis-eligible         | Remove from analysis inputs; controller records whether a non-identifying aggregate may stand                                 |
| `C2` audio withdrawn                                                        | Stop recording; destroy the audio file and verify deletion         | Any transcript derived only from that audio is removed or blocked pending the legal position (`Q-07`)                         |
| `C3` quotation withdrawn                                                    | Stop quotation use                                                 | Correct draft documents where feasible; no new use; record the corrected locations                                            |
| `C4` follow-up withdrawn                                                    | Contact stops at once                                              | Delete the follow-up contact data from Layer A unless another recorded permission requires a limited retention                |
| Any rights request (access, rectification, erasure, restriction, objection) | Log the request and verify identity with minimum data already held | Route through the controller's privacy contact, which does not currently exist; no new data is collected to satisfy a request |

Deletion is logged outside the repository with date, data class and reason; deletion is not complete
until the backup path is addressed. No data may be retained "for possible future research" without a
fresh lawful basis and fresh consent. Because no controller exists, retention periods, the withdrawal
register and the rights route are **not operable**, and the deletion record cannot be certified.

## 8. Rights and complaint route

The participant information must state the right to complain to a supervisory authority. The statutory
data-protection authorities are the Spanish **Agencia Española de Protección de Datos (AEPD)** and the
Portuguese **Comissão Nacional de Proteção de Dados (CNPD)**. This package does not assert a determinate
competent authority, jurisdiction or contact details as verified; the final determination belongs to
counsel (D15 §17 and `Q-12`). Until the controller is designated, no rights channel is operable, so the
honest statement is that MC-10 currently has **no operable rights or complaint route**.

## 9. Machine-readable consent and permission state

The block below is the authoritative consent/permission state for the recovery data layer (D29/D30 may
reference these keys). Every value is the current truth: nothing is granted, recorded or operable.

```json
{
  "consentPackageId": "MC10R-PRIVACY-AND-CONSENT-PACKAGE",
  "consentPackageVersion": "1.0.0",
  "consentInstrumentId": "CONSENT-01",
  "candidateConsentInstrumentVersion": "1.1.0",
  "consentInstrumentStatus": "PROPOSED_NOT_APPROVED",
  "participantInformationStatus": "DRAFT_FOR_LEGAL_REVIEW",
  "participantInformationIssuable": false,
  "controllerIdentity": null,
  "privacyContact": null,
  "complaintAuthorityDetermination": "OPEN",
  "determinateJurisdiction": "OPEN",
  "documentedLawfulBasis": "NOT_LEGALLY_REVIEWED",
  "permissions": {
    "C1_PARTICIPATION": {
      "required": true,
      "default": "NOT_GRANTED",
      "status": "PROPOSED_NOT_APPROVED"
    },
    "C2_AUDIO_RECORDING": {
      "required": false,
      "default": "NOT_GRANTED",
      "status": "PROPOSED_NOT_APPROVED"
    },
    "C3_DE_IDENTIFIED_QUOTATION": {
      "required": false,
      "default": "NOT_GRANTED",
      "status": "PROPOSED_NOT_APPROVED"
    },
    "C4_FOLLOW_UP_CONTACT": {
      "required": false,
      "default": "NOT_GRANTED",
      "status": "PROPOSED_NOT_APPROVED"
    }
  },
  "consentRecordsExist": 0,
  "permissionsGranted": 0,
  "participantInformationIssuedCount": 0,
  "publicTestimonialPermissionId": null,
  "publicTestimonialUsePermitted": false,
  "withdrawalMechanismStatus": "DESIGNED_NOT_OPERABLE",
  "withdrawalEventsRecorded": 0,
  "retentionScheduleStatus": "DESIGNED_PENDING_CONTROLLER",
  "rightsRouteStatus": "DESIGNED_NOT_OPERABLE",
  "layerAProvisioned": false,
  "layerBProvisioned": false,
  "identityKeyInResearchRepository": false
}
```

## 10. Status register

| Item                                    | Status                        | Note                                                                  |
| --------------------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| Participant information                 | `DRAFT_FOR_LEGAL_REVIEW`      | Cannot be issued while the controller is `OPEN`                       |
| Consent instrument `CONSENT-01`         | `PROPOSED_NOT_APPROVED`       | Candidate v`1.1.0`; no qualified review                               |
| `C1` participation permission           | `PROPOSED_NOT_APPROVED`       | Not offered to anyone                                                 |
| `C2` audio-recording permission         | `PROPOSED_NOT_APPROVED`       | Not offered; no recording exists                                      |
| `C3` de-identified quotation permission | `PROPOSED_NOT_APPROVED`       | Zero quotations and zero permissions exist                            |
| `C4` follow-up contact permission       | `PROPOSED_NOT_APPROVED`       | Not offered                                                           |
| Public testimonial / marketing use      | `BLOCKED`                     | Separate permission absent and brand/commercial governance forbids it |
| Consent records                         | 0                             | No valid consent could be requested                                   |
| Retention schedule                      | `DESIGNED_PENDING_CONTROLLER` | No periods or accountable owner                                       |
| Withdrawal mechanism                    | `DESIGNED_NOT_OPERABLE`       | No controller, privacy contact or Layer A store                       |
| Rights and complaint route              | `DESIGNED_NOT_OPERABLE`       | Competent authority undetermined                                      |
| Any `APPROVED` item                     | **none**                      | Only qualified legal review plus recorded approval can approve        |

## 11. Legal-review dependencies and change control

- Every item in section 3 that is `CANNOT_BE_COMPLETED` or `OPEN` is a question in D15 §19
  (`Q-01`, `Q-02`, `Q-10`, `Q-11`, `Q-12`).
- The consent design may be extended only by a dated amendment with a new version; the four permissions
  may not be merged, reduced or bundled.
- No agent may insert a controller, contact, jurisdiction, retention period, approval, signature or
  participant record into this package.
- A material change to any permission, information element, retention rule, jurisdiction or instrument
  version requires re-versioning and renewed legal review.

| Document                                                                             | Relationship                                                        |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `recovery/MC10R-RECOVERY-EXECUTION-PLAN.md` (D2)                                     | Binding canonical registration and status model                     |
| `recovery/governance/AUTH-MC10-001-REV2-DRAFT.md` (D13)                              | Authorization fields fed by this design                             |
| `recovery/governance/MC10R-AUTHORIZATION-GATE.md` (D14)                              | Prerequisite `P-04` and the fail-closed gate                        |
| `recovery/governance/MC10R-LEGAL-REVIEW-PACKAGE.md` (D15)                            | Legal questions `Q-01`…`Q-17` and the review checklist              |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (D3) | Prior ethics and privacy design, three-layer model and rights rules |
| `docs/marea/customer-discovery/data/research-status.json`                            | Wave-0 checklist and blockers                                       |
| `docs/marea/market-validation/data/governance-status.json`                           | Brand and commercial restrictions that block public testimonial use |
