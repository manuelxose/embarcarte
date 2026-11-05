# AUTH-MC10-001 — Authorization revision 2 (D13)

| Field                    | Value                                                                                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID              | MC-10R / D13 / `AUTH-MC10-001-REV2-DRAFT`                                                                                                                                                                        |
| Document status          | `DRAFT_PREPARED`                                                                                                                                                                                                 |
| Date                     | 2026-11-01                                                                                                                                                                                                       |
| Owner                    | `agent-c-governance` (Research Ethics, Privacy and Governance Specialist)                                                                                                                                        |
| Scope                    | Complete proposed revision 2 of authorization record `AUTH-MC10-001` for a proposed exploratory Wave 1 of the MC-10 customer-discovery study. Prepared for review; it authorizes nothing and is not an approval. |
| Authorization record     | `AUTH-MC10-001`                                                                                                                                                                                                  |
| Revision                 | `2`                                                                                                                                                                                                              |
| Authorization status     | `NOT_GRANTED`                                                                                                                                                                                                    |
| Fieldwork permission     | `FALSE`                                                                                                                                                                                                          |
| External contact allowed | `FALSE`                                                                                                                                                                                                          |
| Legal review status      | `LEGAL_REVIEW_PENDING`                                                                                                                                                                                           |
| Milestone                | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36)                                                                                                                                      |
| Branch                   | `feature/marea-mc10r-fieldwork-recovery` (base `d1ac69a`)                                                                                                                                                        |

> **STATUS: DRAFT_PREPARED — AUTHORIZATION_STATUS = NOT_GRANTED — FIELDWORK_PERMISSION = FALSE —
> EXTERNAL_CONTACT_ALLOWED = FALSE.** This document prepares a reviewable authorization proposal. It is
> not a grant, not a signature, not an approval and not permission to identify, contact, screen, invite
> or interview anyone. Authorization requires a separate, dated, signed record issued by a real
> programme owner with recorded authority; no such record exists.

## 0. How to read this document

```
AUTHORIZATION_RECORD        = AUTH-MC10-001
REVISION                    = 2
DOCUMENT_STATUS             = DRAFT_PREPARED
AUTHORIZATION_STATUS        = NOT_GRANTED
FIELDWORK_PERMISSION        = FALSE
EXTERNAL_CONTACT_ALLOWED    = FALSE
LEGAL_REVIEW_STATUS         = LEGAL_REVIEW_PENDING
CONTROLLER_IDENTITY         = OPEN
PRIVACY_CONTACT             = OPEN
```

The record exists in two parts. Section 4 lists the thirty authorization fields with their prepared
values, the status of each field and the evidence a human must supply to close it. Section 7 repeats
the same values in a machine-readable block so that the recovery data layer (`data/mc10r-authorization-draft.json`,
D29) can mirror them without reinterpretation.

Empty is the honest value. `null` means no value exists. `OPEN` means the value cannot be produced by
this recovery milestone because it depends on the programme owner, a legal adviser, a data controller,
a data steward or a fieldwork lead who has not acted. A `PROPOSAL_PENDING_APPROVAL` value is draft
research scope prepared by this milestone; it is not an authorization value and cannot be acted on.

## 1. Purpose of this revision

Revision 2 is the complete proposed authorization for the Wave 1 exploratory stage of the MC-10
customer-discovery study. It exists so that, after a real authorization is issued and after the
prerequisites in `MC10R-AUTHORIZATION-GATE.md` (D14) are verified complete, fieldwork can begin without
re-planning and without a second round of document drafting.

This revision deliberately does **not** populate the human and legal values that have never existed in
the programme: there is no verified authorizer, no recorded authority basis, no signature, no date, no
expiry, no fieldwork lead, no controller identity, no privacy contact, no approved legal review, no
approved storage reference and no appointed interviewer. Those fields remain `null`/`OPEN` with the
responsible role and the evidence required to close them.

## 2. What this document is not

The following are explicitly **not** authorization and must never be read as authorization:

- The MC-10/MC-10R Master Prompt and its instructions.
- The existence of this branch, an open pull request, or a PR approval or review comment.
- The assignment of a task to an agent, including this D13 task.
- A recovery validator that passes, and any passing test suite.
- The preparation of instruments, plans, templates, consent documents or this draft itself.
- An agent's inference, a sponsor's enthusiasm, or the absence of an objection or refusal.
- Silently letting any field of this record fall to a default that implies permission.

Authorization exists only as a separate, dated, scoped record that names the authorizer and the
authority basis. `AUTH-MC10-001` has no such record; revision 1 records `NOT_GRANTED` and revision 2 is
this prepared draft.

## 3. Canonical registration

| Key                                     | Canonical value                                       |
| --------------------------------------- | ----------------------------------------------------- |
| Authorization record                    | `AUTH-MC10-001`                                       |
| Revision                                | `2`                                                   |
| Document status                         | `DRAFT_PREPARED`                                      |
| Authorization status                    | `NOT_GRANTED`                                         |
| Fieldwork permission                    | `FALSE`                                               |
| External contact allowed                | `FALSE`                                               |
| Programme                               | EMBARCARTE / MAREA — MC-10, recovery sub-stage MC-10R |
| Candidate instrument version            | `1.1.0` (proposed; not approved)                      |
| Historical effective instrument version | `1.0.0` (frozen)                                      |
| Candidate consent instrument            | `CONSENT-01` v`1.1.0` (proposed; not approved)        |
| Proposed Wave 1 geography               | Rías Baixas / Galicia (Spain only)                    |
| Proposed incentives                     | `ZERO` (proposal, not approved)                       |
| Proposed research spending              | `ZERO` (proposal, not approved)                       |
| Programme date                          | `2026-11-01`                                          |

## 4. The thirty authorization fields

The field status vocabulary is exactly: `VALUE_PRESENT`, `PROPOSAL_PENDING_APPROVAL`, `OPEN`, `NULL`.
A `VALUE_PRESENT` field is a record identity, a standing exclusion or the current (not granted) value;
it is not permission. The role column names the responsible role, never a real person, because no real
person or office has been designated.

| #   | Field                              | Prepared value                                                                                                                                                                                                       | Field status                | Responsible role                         | Required evidence to close                                                                                                                                                                                                                                                                          |
| --- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `authorizationId`                  | `AUTH-MC10-001`                                                                                                                                                                                                      | `VALUE_PRESENT`             | Programme owner (record custodian)       | Canonical identifier already registered; no further evidence needed                                                                                                                                                                                                                                 |
| 2   | `revision`                         | `2`                                                                                                                                                                                                                  | `VALUE_PRESENT`             | Programme owner                          | A dated revision-2 record must actually be issued; this draft is not the issued record                                                                                                                                                                                                              |
| 3   | `programme`                        | `EMBARCARTE / MAREA — MC-10, recovery sub-stage MC-10R (programme milestone count remains 36)`                                                                                                                       | `VALUE_PRESENT`             | Programme owner                          | Canonical registration; none beyond it                                                                                                                                                                                                                                                              |
| 4   | `purpose`                          | Exploratory Wave 1 customer-discovery interviews limited to four segments, internal research use only, with no commercial, marketing, publication or lead-generation use                                             | `PROPOSAL_PENDING_APPROVAL` | Programme owner                          | The authorizer's accepted purpose statement inside the grant record                                                                                                                                                                                                                                 |
| 5   | `authorizingPerson`                | `null`                                                                                                                                                                                                               | `NULL`                      | Programme owner                          | Identity and role of the real human or delegated office that issues the grant, plus signature or equivalent recorded approval and the date; an agent, a task or this document cannot be the authorizer                                                                                              |
| 6   | `authorityBasis`                   | `null`                                                                                                                                                                                                               | `OPEN`                      | Programme owner + legal adviser          | Written governance record showing that the authorizing person holds, or has been delegated in writing, the authority to authorize external research contact                                                                                                                                         |
| 7   | `authorizationDate`                | `null`                                                                                                                                                                                                               | `NULL`                      | Programme owner                          | Date on which the grant is actually issued                                                                                                                                                                                                                                                          |
| 8   | `effectiveStartDate`               | `null`                                                                                                                                                                                                               | `NULL`                      | Programme owner                          | Start date set only when the D14 prerequisites are verified complete; must not precede them                                                                                                                                                                                                         |
| 9   | `expiryDate`                       | `null`                                                                                                                                                                                                               | `NULL`                      | Programme owner                          | Explicit end date or duration of the grant; an open-ended grant is not acceptable                                                                                                                                                                                                                   |
| 10  | `fieldworkLead`                    | `null`                                                                                                                                                                                                               | `NULL`                      | Programme owner                          | Named accountable human fieldwork lead and that person's recorded acceptance                                                                                                                                                                                                                        |
| 11  | `permittedSegments`                | `["SEG-01", "SEG-03", "SEG-04", "SEG-06"]`                                                                                                                                                                           | `PROPOSAL_PENDING_APPROVAL` | Programme owner + research methodologist | Approval of the Wave 1 segment scope and of the sampling amendment package; see section 5                                                                                                                                                                                                           |
| 12  | `permittedGeographies`             | `["Rías Baixas / Galicia (Spain)"]`                                                                                                                                                                                  | `PROPOSAL_PENDING_APPROVAL` | Programme owner                          | Geography confirmed inside the grant; northern Portugal remains excluded until the Portuguese prerequisites are approved                                                                                                                                                                            |
| 13  | `permittedContactChannels`         | `[]`                                                                                                                                                                                                                 | `OPEN`                      | Programme owner + fieldwork manager      | Channel-level authorization plus gatekeeper permissions plus a legal review of the recruitment communication for that channel; no channel is proposed by this draft                                                                                                                                 |
| 14  | `maximumAuthorizedContacts`        | `0`                                                                                                                                                                                                                  | `VALUE_PRESENT`             | Programme owner                          | The current authorized ceiling is zero while no grant exists (mirrors revision 1). A future grant must record a positive contact ceiling consistent with the approved recruitment plan; the contact ceiling is the authorizer's decision and is not inferred from the interview envelope            |
| 15  | `maximumCompletedInterviews`       | `0`                                                                                                                                                                                                                  | `VALUE_PRESENT`             | Programme owner + research methodologist | The current authorized ceiling is zero while no grant exists (mirrors revision 1). A future grant must record a positive ceiling equal to the approved Wave 1 envelope maximum; the proposed 18–28 envelope is proposal text in section 5 and does not live in this field until a grant is recorded |
| 16  | `spendingCeiling`                  | `0`                                                                                                                                                                                                                  | `PROPOSAL_PENDING_APPROVAL` | Programme owner + finance                | Approved spending position (ZERO proposed, not approved); any departure requires a fresh approval                                                                                                                                                                                                   |
| 17  | `incentivePolicy`                  | `{"proposed": "ZERO", "status": "NOT_APPROVED"}`                                                                                                                                                                     | `PROPOSAL_PENDING_APPROVAL` | Programme owner                          | Approved incentive policy; a zero-incentive policy still requires explicit approval before fielding. The `status` field records the real approval state (`NOT_APPROVED`); the object does not confer approval                                                                                       |
| 18  | `directEmailPermission`            | `false`                                                                                                                                                                                                              | `VALUE_PRESENT`             | Programme owner + legal adviser          | A future explicit grant only after the lawful-basis review of electronic outreach; `false` is the current value and no proposal to enable it exists in Wave 1                                                                                                                                       |
| 19  | `telephonePermission`              | `false`                                                                                                                                                                                                              | `VALUE_PRESENT`             | Programme owner + legal adviser          | A future explicit grant only after the lawful-basis review of telephone outreach; `false` is the current value                                                                                                                                                                                      |
| 20  | `thirdPartyIntroductionPermission` | `false`                                                                                                                                                                                                              | `VALUE_PRESENT`             | Programme owner + legal adviser          | A future explicit grant only with gatekeeper permissions and a review of the gatekeeper data flow; `false` is the current value                                                                                                                                                                     |
| 21  | `onSiteInvitationPermission`       | `false`                                                                                                                                                                                                              | `VALUE_PRESENT`             | Programme owner + legal adviser          | A future explicit grant only with venue permission and reviewed invitation wording; `false` is the current value                                                                                                                                                                                    |
| 22  | `prohibitedChannels`               | `["PURCHASED_CONTACT_LISTS", "SCRAPED_PERSONAL_EMAILS", "PRIVATE_MARINA_CUSTOMER_RECORDS", "COLD_AUTOMATED_CAMPAIGNS", "PAID_ADVERTISING_RECRUITMENT"]`                                                              | `VALUE_PRESENT`             | Programme owner                          | Standing exclusions preserved from revision 1; no closure needed, and no future revision may remove them without a recorded governance decision                                                                                                                                                     |
| 23  | `controllerIdentity`               | `null`                                                                                                                                                                                                               | `OPEN`                      | Programme owner                          | Verified legal entity (registered name, registration identifier, registered address) acting as data controller; a commercializer name, the proposed MAREA brand or an agent identity is not proof                                                                                                   |
| 24  | `privacyContact`                   | `null`                                                                                                                                                                                                               | `OPEN`                      | Programme owner + controller             | Verified, monitored, role-based privacy contact route; the data-protection-officer determination must be recorded                                                                                                                                                                                   |
| 25  | `approvedInstrumentVersions`       | `[]`                                                                                                                                                                                                                 | `OPEN`                      | Programme owner + instrument reviewer    | Recorded approval of `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` (IV-01…IV-09), ES/EN qualified review, and Portuguese review before any Portugal scope is considered; candidate `1.1.0` is not approved                                                                                                    |
| 26  | `approvedStorageReference`         | `null`                                                                                                                                                                                                               | `OPEN`                      | Data steward                             | Reference to a provisioned access-controlled Layer A/B store with `OPERATIONALLY_APPROVED` evidence; architecture documents are not a provisioned store                                                                                                                                             |
| 27  | `assignedInterviewers`             | `[]`                                                                                                                                                                                                                 | `OPEN`                      | Fieldwork lead                           | Roster of appointed humans held outside the repository, with recorded training completion and non-identifying interviewer identifiers                                                                                                                                                               |
| 28  | `withdrawalRevocationMechanism`    | `{"procedure": "Participant withdrawal of C1–C4 is designed in D16; authorization revocation requires a recorded revocation authority and register", "accountableRole": "OPEN", "priorRevisionId": "AUTH-MC10-001"}` | `OPEN`                      | Programme owner + controller             | Recorded authority and register able to revoke this authorization, plus the participant withdrawal mechanism made operable by a controller and an approved store; the design exists in D16 but is not operable, so the accountable role stays `OPEN`                                                |
| 29  | `legalReviewReference`             | `null`                                                                                                                                                                                                               | `OPEN`                      | Legal adviser                            | Written, dated legal review identifying the reviewer, the reviewed document versions and the jurisdiction determination; see D15                                                                                                                                                                    |
| 30  | `approvalEvidence`                 | `null`                                                                                                                                                                                                               | `OPEN`                      | Programme owner                          | The signature, recorded approval, minutes or equivalent artefacts that evidence the grant; this draft has none                                                                                                                                                                                      |
| 31  | `currentAuthorizationStatus`       | `NOT_GRANTED`                                                                                                                                                                                                        | `VALUE_PRESENT`             | Programme owner                          | May change to `GRANTED` only through a separately recorded valid grant that also satisfies every D14 prerequisite; this recovery milestone cannot change it                                                                                                                                         |

### 4.1 Field-count reconciliation

The binding brief calls this the thirty-field proposal and lists `currentAuthorizationStatus` among the
required items. Counted literally, the list contains **thirty authorization fields plus one derived
status field** (`currentAuthorizationStatus`) = 31 keys. Both the table above and the machine-readable
block in section 7 carry all 31 so that no required item is missing; the derived status field is not an
authorization value and is repeated in the header and the status banner. This reconciliation is reported
to the Lead so that the machine-readable mirror (D29) and the recovery validator agree on the same set.

## 5. Proposed Wave 1 research scope (ungranted)

The scope below is a **proposal**, not an authorization, not an approved sample and not a fieldwork
plan in force. It is recorded so the authorizer has exact scope text to accept, modify or reject.

| Segment          | Canonical name                        | Wave 1 minimum | Wave 1 maximum |
| ---------------- | ------------------------------------- | -------------: | -------------: |
| `SEG-01`         | Recreational motorboat owners         |              5 |              8 |
| `SEG-03`         | Marina-based unattended-vessel owners |              5 |              8 |
| `SEG-04`         | Marine electronics installers         |              5 |              7 |
| `SEG-06`         | Marina or shipyard operators          |              3 |              5 |
| **Wave 1 total** | —                                     |         **18** |         **28** |

The 18–28 envelope is a proposed sample amendment, not a field of the ungranted record. The
`maximumCompletedInterviews` and `maximumAuthorizedContacts` fields carry the current authorized value
`0` because nothing is granted; a future grant must replace them with positive ceilings that match the
approved envelope. The table is the scope text a future grant would need to accept, modify or reject.

- **Geography.** Rías Baixas / Galicia, Spain only. **Northern Portugal is excluded** until Portuguese
  instruments are produced and approved (currently `NOT_PRODUCED`), Portuguese recruitment compliance is
  reviewed, and Portuguese-language interviewer capability is approved.
- **Segments not in Wave 1.** `SEG-02`, `SEG-05`, `SEG-07` and `SEG-08` are outside the proposed Wave 1
  scope and are not authorized by this draft.
- **Incentives.** Proposed `ZERO` — a proposal, not an approval. The incentive policy is `NOT_APPROVED`
  (`W0-15`) and even a zero-incentive position awaits explicit approval before fielding.
- **Spending.** Proposed `ZERO` — a proposal, not an approval. Paid research is `NOT_AUTHORIZED`.
- **Experiment caution.** Wave 1 is an exploratory pilot. Only `SEG-01` and `SEG-03` could reach the
  registered pricing minimum of n ≥ 8 if eight completed pricing-module interviews are achieved in that
  segment; `SEG-04` and `SEG-06` can produce qualitative price objections only and must be classified
  `BELOW_REGISTERED_MINIMUM`. No price, demand, willingness-to-pay or experiment verdict may be approved
  on Wave 1 evidence, and no experiment has been executed.
- **Not a replacement for the full study.** The full MC-10 sample across eight segments (minimum 37,
  ceiling 57 completed interviews) and the experiment thresholds are unchanged. Wave 1 is not the full
  study, not the historical 40–80 planning aspiration, and not a sample reduction.
- **Sample amendment.** The 18–28 Wave 1 envelope is a sample amendment relative to the full-study
  target. It takes effect only with the programme owner's explicit dated approval of the sampling
  amendment package; the recovery milestone cannot approve it.

## 6. Field-status summary

| Field status                |  Count | Fields                                                                                                                                                                                                                                                                      |
| --------------------------- | -----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VALUE_PRESENT`             |     11 | `authorizationId`, `revision`, `programme`, `maximumAuthorizedContacts`, `maximumCompletedInterviews`, `directEmailPermission`, `telephonePermission`, `thirdPartyIntroductionPermission`, `onSiteInvitationPermission`, `prohibitedChannels`, `currentAuthorizationStatus` |
| `PROPOSAL_PENDING_APPROVAL` |      5 | `purpose`, `permittedSegments`, `permittedGeographies`, `spendingCeiling`, `incentivePolicy`                                                                                                                                                                                |
| `OPEN`                      |     10 | `authorityBasis`, `permittedContactChannels`, `controllerIdentity`, `privacyContact`, `approvedInstrumentVersions`, `approvedStorageReference`, `assignedInterviewers`, `withdrawalRevocationMechanism`, `legalReviewReference`, `approvalEvidence`                         |
| `NULL`                      |      5 | `authorizingPerson`, `authorizationDate`, `effectiveStartDate`, `expiryDate`, `fieldworkLead`                                                                                                                                                                               |
| **Total**                   | **31** | Thirty authorization fields plus the derived status field                                                                                                                                                                                                                   |

No field is `APPROVED`. No field carries an invented human, legal, controller, contact, signature or
interviewer value.

## 7. Machine-readable field set

The block below is the authoritative field set of this document. D29
(`data/mc10r-authorization-draft.json`) mirrors it; the recovery validator may parse it. Values are
canonical; a consumer must treat `currentAuthorizationStatus` and `FIELDWORK_PERMISSION` as the gate,
so no proposal or `null` value can be read as permission. Two fields (`incentivePolicy` and
`withdrawalRevocationMechanism`) are objects so their proposal/accountability metadata travels with the
value; neither object confers approval or operability. All other fields are primitive.

```json
{
  "authorizationId": "AUTH-MC10-001",
  "revision": 2,
  "programme": "EMBARCARTE / MAREA — MC-10, recovery sub-stage MC-10R (programme milestone count remains 36)",
  "purpose": "Exploratory Wave 1 customer-discovery interviews limited to four segments, internal research use only, with no commercial, marketing, publication or lead-generation use",
  "authorizingPerson": null,
  "authorityBasis": null,
  "authorizationDate": null,
  "effectiveStartDate": null,
  "expiryDate": null,
  "fieldworkLead": null,
  "permittedSegments": ["SEG-01", "SEG-03", "SEG-04", "SEG-06"],
  "permittedGeographies": ["Rías Baixas / Galicia (Spain)"],
  "permittedContactChannels": [],
  "maximumAuthorizedContacts": 0,
  "maximumCompletedInterviews": 0,
  "spendingCeiling": 0,
  "incentivePolicy": {
    "proposed": "ZERO",
    "status": "NOT_APPROVED"
  },
  "directEmailPermission": false,
  "telephonePermission": false,
  "thirdPartyIntroductionPermission": false,
  "onSiteInvitationPermission": false,
  "prohibitedChannels": [
    "PURCHASED_CONTACT_LISTS",
    "SCRAPED_PERSONAL_EMAILS",
    "PRIVATE_MARINA_CUSTOMER_RECORDS",
    "COLD_AUTOMATED_CAMPAIGNS",
    "PAID_ADVERTISING_RECRUITMENT"
  ],
  "controllerIdentity": null,
  "privacyContact": null,
  "approvedInstrumentVersions": [],
  "approvedStorageReference": null,
  "assignedInterviewers": [],
  "withdrawalRevocationMechanism": {
    "procedure": "Participant withdrawal of C1–C4 is designed in D16; authorization revocation requires a recorded revocation authority and register",
    "accountableRole": "OPEN",
    "priorRevisionId": "AUTH-MC10-001"
  },
  "legalReviewReference": null,
  "approvalEvidence": null,
  "currentAuthorizationStatus": "NOT_GRANTED"
}
```

### 7.1 Machine-readable record status

```json
{
  "authorizationRecord": "AUTH-MC10-001",
  "revision": 2,
  "documentStatus": "DRAFT_PREPARED",
  "authorizationStatus": "NOT_GRANTED",
  "fieldworkPermission": false,
  "externalContactAllowed": false,
  "legalReviewStatus": "LEGAL_REVIEW_PENDING",
  "controllerIdentityStatus": "OPEN",
  "privacyContactStatus": "OPEN",
  "effectiveAuthorization": false,
  "permittedAction": "INTERNAL_DOCUMENT_PREPARATION_ONLY",
  "inferenceGuard": "The Master Prompt, a PR approval, a task assignment, a passing validator, a prepared template or an agent inference does not constitute outreach authorization; authorization must be a separate, dated, scoped record naming the authorizer and the authority basis."
}
```

## 8. Release gate — what may change `NOT_GRANTED`

`AUTHORIZATION_STATUS` may become `GRANTED` **only** in a separate, later, separately recorded act that
satisfies every condition below. This recovery milestone, this document, its machine-readable mirror and
any passing validator cannot perform that act.

1. A valid authorization record exists, issued by a real programme owner or a person with a recorded
   written delegation of that authority (`authorizingPerson` and `authorityBasis` present), dated,
   signed or otherwise recorded as approved.
2. All thirty authorization fields carry real values: no `null`, no `OPEN`, no `PROPOSAL_PENDING_APPROVAL`
   left unresolved, and every proposal replaced by a recorded decision.
3. Every prerequisite in `MC10R-AUTHORIZATION-GATE.md` (D14) is `VERIFIED_COMPLETE`.
4. The effective fieldwork period is active on the day of release, and no revocation event is recorded.
5. The recorded scope (segments, geography, channels, contact ceiling, interview ceiling, spending and
   incentive position) is internally consistent with the approved sampling amendment.
6. The record is filed in the controller's governance set outside this repository; only its
   non-sensitive scope summary may enter this repository.

If any condition is missing, unknown, contradictory or unverifiable, the gate stays closed. Default
deny. There is no partial grant, no implied grant and no grant by silence.

The valid end state of the MC-10R recovery milestone remains:

```
MC10R                        = PASS_INTERNAL_PREPARATION_SCOPE
MC10                         = BLOCKED
AUTH_MC10_001                = NOT_GRANTED
OUTREACH_AUTHORIZATION       = NOT_GRANTED
FIELDWORK_STATUS             = BLOCKED
FIELDWORK_READINESS          = PARTIALLY_READY
```

## 9. Revision history

| Revision | Date       | Status                           | Change                                                                                                                                                                                     | Recorded by          |
| -------- | ---------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| 1        | 2026-11-01 | `NOT_GRANTED`                    | Initial record created at the authorization gate; every field absent                                                                                                                       | `lead`               |
| 2        | 2026-11-01 | `NOT_GRANTED` (`DRAFT_PREPARED`) | Complete proposed revision 2 prepared for review: all fields present, human/legal values `null`/`OPEN`, Wave 1 scope and zero-incentive/zero-spending proposals recorded as proposals only | `agent-c-governance` |

Revision 2 is **prepared, not issued**. A reader must treat revision 1 as the only record in force and
revision 2 as a proposal.

## 10. Change control and cross-references

- This document may not be edited to insert an authorizer, signature, date, controller, privacy contact,
  legal opinion, storage approval or interviewer. Such values exist only through the recorded acts named
  in section 8.
- A future valid grant is a new dated revision, never an in-place edit of this draft.
- Wording corrections that do not change meaning are patch revisions and must be recorded.

| Document                                                                             | Relationship                                              |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `recovery/MC10R-RECOVERY-EXECUTION-PLAN.md` (D2)                                     | Binding canonical registration                            |
| `recovery/governance/MC10R-AUTHORIZATION-GATE.md` (D14)                              | Fail-closed prerequisite gate and release decision        |
| `recovery/governance/MC10R-LEGAL-REVIEW-PACKAGE.md` (D15)                            | Legal-review package behind `legalReviewReference`        |
| `recovery/governance/MC10R-PRIVACY-AND-CONSENT-PACKAGE.md` (D16)                     | Participant information, consent and withdrawal design    |
| `docs/marea/customer-discovery/data/fieldwork-authorization.json`                    | Machine-readable revision-1 record (`NOT_GRANTED`)        |
| `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md`                      | Authorization register, rule and unblock sequence         |
| `docs/marea/customer-discovery/data/research-status.json`                            | Wave-0 checklist and blockers `BLK-MC10-01`…`BLK-MC10-07` |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (D3) | Research ethics and privacy design                        |
