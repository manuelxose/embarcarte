# MC10R — Authorization gate (D14)

| Field                | Value                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Document ID          | MC-10R / D14 / `MC10R-AUTHORIZATION-GATE`                                                                                                                                            |
| Document status      | `DRAFT` — recovery internal control, not an approval                                                                                                                                 |
| Date                 | 2026-11-01                                                                                                                                                                           |
| Owner                | `agent-c-governance` (Research Ethics, Privacy and Governance Specialist)                                                                                                            |
| Scope                | Fail-closed authorization gate over the eleven prerequisites for any future `GRANTED` status, the release decision function, the release decision table and the current truth block. |
| Authorization record | `AUTH-MC10-001`                                                                                                                                                                      |
| Authorisation status | `NOT_GRANTED`                                                                                                                                                                        |
| Fieldwork status     | `BLOCKED`                                                                                                                                                                            |
| Recovery work status | `IN_PROGRESS`                                                                                                                                                                        |
| Milestone            | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36)                                                                                                          |
| Branch               | `feature/marea-mc10r-fieldwork-recovery` (base `d1ac69a`)                                                                                                                            |

> **STATUS: GATE CLOSED — AUTH_MC10_001 = NOT_GRANTED — OUTREACH_AUTHORIZATION = NOT_GRANTED —
> FIELDWORK_STATUS = BLOCKED.** No prerequisite is `VERIFIED_COMPLETE`. No external contact of any
> kind is permitted. This gate is an internal control document; it cannot open fieldwork, and passing
> it would still not be authorization.

## 1. The gate rule

Fieldwork is permitted only when the gate is **OPEN**, and the gate is OPEN only through a conjunction:
every prerequisite in section 3 is `VERIFIED_COMPLETE`, a valid authorization record exists in the state
described by section 4, the recorded fieldwork period is active, and no revocation event is recorded.

The gate is **fail-closed**:

- The default value of every prerequisite is its unmet state.
- A missing, empty, `null`, `OPEN`, placeholder, inferred, verbal or agent-produced value is **not**
  evidence. It counts as unmet.
- A partial or conditional grant is not a grant.
- A recency-based assumption (no refusal, no complaint, silence) is not evidence.
- If the evaluator cannot decide, the decision is `DENY`.
- No document in this repository, no validator result, no task assignment, no PR approval and no agent
  statement can satisfy or waive a prerequisite.

## 2. Classification vocabulary

Each prerequisite is classified with exactly one of the following values. The classification describes
the state of the evidence today, not the importance of the item.

| Classification              | Meaning                                                                                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VERIFIED_COMPLETE`         | The prerequisite is met and the evidence is citable and verifiable; no further action is needed for this item.                                                                                            |
| `PREPARED_PENDING_APPROVAL` | The internal preparation artefact is complete, but a recorded human approval is still missing; approval cannot be inferred from the artefact.                                                             |
| `EXTERNAL_DEPENDENCY`       | Completion requires an external party that no internal work can substitute for: a legal adviser, a professional reviewer, real appointed humans, an external gatekeeper or an external operational store. |
| `NOT_READY`                 | Internal work is incomplete or not yet evidenced, or the condition cannot exist before a valid grant (for example an authorized period).                                                                  |
| `BLOCKED`                   | A hard-stop legal or authority condition is absent; fieldwork is impossible regardless of internal readiness.                                                                                             |

## 3. Prerequisite register — current state

No prerequisite is `VERIFIED_COMPLETE`. The register enumerates the eleven prerequisites individually.

| ID     | Prerequisite                                            | Classification              | Current evidence                                                                                                                                                                                                                                                              | Closure evidence required                                                                                                                                                                                                                                                                                                                                    | Accountable role                         |
| ------ | ------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `P-01` | A valid approval record has been issued                 | `BLOCKED`                   | `AUTH-MC10-001` revision 1 is `NOT_GRANTED`; revision 2 exists only as `DRAFT_PREPARED` (D13). No authorizer, authority basis, signature, date, expiry or fieldwork lead exists. `BLK-MC10-01` open.                                                                          | A separate dated, signed authorization revision 2 issued by the real programme owner (or a person with recorded written delegation), naming the authorizer, authority basis, scope, volume, spend and incentive position, duration, expiry and fieldwork lead; non-sensitive summary filed in the repository, full record in the controller's governance set | Programme owner                          |
| `P-02` | Controller and privacy contact are verified             | `BLOCKED`                   | `controllerIdentity = null`, `privacyContact = null` (D13, D15); `W0-03` and `W0-04` are `BLOCKED`; `BLK-MC10-02` open. No legal entity is designated.                                                                                                                        | Verified legal entity (registered name, registration identifier, registered address) acting as controller; verified monitored role-based privacy contact; recorded data-protection-officer decision and EU-representative decision                                                                                                                           | Programme owner + controller             |
| `P-03` | Legal review of communications and privacy is completed | `BLOCKED`                   | D15 and D16 are `DRAFT_FOR_LEGAL_REVIEW`; legal review status `LEGAL_REVIEW_PENDING`; `W0-05` `BLOCKED`; `BLK-MC10-03` open. No written opinion exists.                                                                                                                       | Written, dated legal review by a qualified legal adviser, citing the reviewed document versions, analysing the lawful basis per processing purpose and the recruitment communications, and determining the applicable jurisdiction; reference recorded in `legalReviewReference`                                                                             | Legal adviser                            |
| `P-04` | Participant information and consent are approved        | `NOT_READY`                 | D16 participant information and `CONSENT-01` v`1.1.0` are prepared but `PROPOSED_NOT_APPROVED`; a notice cannot be issued while the controller is `OPEN` (`W0-06` `NOT_APPROVED`); the supervisory-complaint route is not determined.                                         | Controller designation plus completed legal review plus a recorded approval of the participant information notice and the four-permission consent instrument, versioned and language-reviewed; only then may a notice be issued                                                                                                                              | Programme owner + legal adviser          |
| `P-05` | Secure data handling is operational                     | `NOT_READY`                 | Storage architecture is defined and local synthetic tests are recorded, but `PROVISIONED = false`, `ACCESS_REVIEWED = false`, `OPERATIONALLY_APPROVED = false`; `W0-12` `BLOCKED`; `BLK-MC10-05` open.                                                                        | A provisioned access-controlled Layer A/B store outside the repository with a named access list, encryption at rest, tested retention/deletion (including backups) and a reference recorded in `approvedStorageReference`                                                                                                                                    | Data steward                             |
| `P-06` | Interviewers are appointed and trained                  | `EXTERNAL_DEPENDENCY`       | Zero humans are assigned, trained or authorized; role definitions, training and kit materials are internal preparation only; `W0-11` `NOT_APPROVED`; `BLK-MC10-06` open.                                                                                                      | A real interviewer panel appointed and recorded outside the repository with training completion evidence, approved interviewer identifiers, and accepted responsibilities against the approved instruments                                                                                                                                                   | Fieldwork lead                           |
| `P-07` | Effective instrument versions are approved              | `EXTERNAL_DEPENDENCY`       | Candidate version `1.1.0` (`MC10R-INSTRUMENT-AMENDMENT-v1.1.0`, IV-01…IV-09) is `PROPOSED_NOT_EFFECTIVE`; historical `1.0.0` is frozen; qualified ES/EN review and PT review are not obtained; `W0-07` `PARTIAL`, `W0-08` `NOT_PRODUCED`.                                     | Recorded approval of the amendment package by a real authorized reviewer with reviewer identity, date and version hashes; ES/EN qualified review; PT instruments reviewed before any Portugal scope is considered                                                                                                                                            | Programme owner + instrument reviewer    |
| `P-08` | Sampling amendments are approved                        | `PREPARED_PENDING_APPROVAL` | The sampling reconciliation (D5), segment-quota contract (D6) and protocol amendment (D8) are prepared as proposed and not effective; Wave 1 18–28 is a proposed envelope; the full-study target and experiment thresholds are preserved; no programme-owner approval exists. | A dated sampling amendment approved by the programme owner that reconciles the quota, target and pricing-minimum conflicts and explicitly approves the Wave 1 segment scope and envelope; the full MC-10 sample is not replaced by Wave 1                                                                                                                    | Programme owner + research methodologist |
| `P-09` | Geographic and recruitment scope is authorized          | `NOT_READY`                 | Rías Baixas / Galicia is prepared; northern Portugal is excluded; no recruitment channel is authorized (`W0-10` `BLOCKED`); no gatekeeper permission exists; `BLK-MC10-04` open.                                                                                              | Geography stated inside the valid grant; channel-level authorization; recorded gatekeeper permissions where an introduction channel is used; legal review of the specific recruitment communication; Portugal kept excluded until P-07 and Portuguese compliance are approved                                                                                | Programme owner + fieldwork lead         |
| `P-10` | An authorized fieldwork period is active                | `NOT_READY`                 | `effectiveStartDate = null` and `expiryDate = null` (D13); no fieldwork start date exists; `W0-17` `BLOCKED`.                                                                                                                                                                 | Start and end dates inside the valid grant; start not earlier than the verified completion of P-01…P-09; release-day check confirms the current date lies within the recorded period                                                                                                                                                                         | Programme owner                          |
| `P-11` | No revocation is recorded                               | `NOT_READY`                 | No revocation register or revocation authority exists; the condition is vacuous until a valid grant exists, so it cannot be verified today.                                                                                                                                   | A recorded revocation register and named revocation authority; release-day check confirms no revocation event affects the record and that a revocation event would immediately close the gate                                                                                                                                                                | Programme owner + controller             |

### 3.1 Register summary

| Classification              |  Count | Prerequisites                          |
| --------------------------- | -----: | -------------------------------------- |
| `VERIFIED_COMPLETE`         |      0 | none                                   |
| `PREPARED_PENDING_APPROVAL` |      1 | `P-08`                                 |
| `EXTERNAL_DEPENDENCY`       |      2 | `P-06`, `P-07`                         |
| `NOT_READY`                 |      5 | `P-04`, `P-05`, `P-09`, `P-10`, `P-11` |
| `BLOCKED`                   |      3 | `P-01`, `P-02`, `P-03`                 |
| **Total**                   | **11** | —                                      |

Because at least one prerequisite is not `VERIFIED_COMPLETE`, the gate decision is `DENY`. Because
`P-01`, `P-02` and `P-03` are hard-stop legal/authority blockers, no internal recovery work can open the
gate.

## 4. Exact fail-closed conditions for a future `GRANTED`

`AUTHORIZATION_STATUS = GRANTED` may be recorded only when a later, separate, recorded act satisfies
**all** of the following. Any single failure, unknown, contradiction or unverifiable item means `DENY`;
there is no partial grant.

1. **Valid approval record issued.** A dated authorization record, revision 2 or later, issued by a real
   programme owner or a person with a recorded written delegation of the authority to authorize external
   research contact, and signed or otherwise recorded as approved.
2. **Every prerequisite verified.** All eleven prerequisites in section 3 are `VERIFIED_COMPLETE` with
   cited evidence; none is `PREPARED_PENDING_APPROVAL`, `EXTERNAL_DEPENDENCY`, `NOT_READY` or `BLOCKED`.
3. **Every field resolved.** The D13 field set carries real values: `authorizingPerson`, `authorityBasis`,
   `authorizationDate`, `effectiveStartDate`, `expiryDate`, `fieldworkLead`, `controllerIdentity`,
   `privacyContact`, `legalReviewReference`, `approvedStorageReference`, `approvalEvidence`,
   `withdrawalRevocationMechanism` are not `null`/`OPEN`; `permittedContactChannels` is not empty;
   `maximumAuthorizedContacts` and `maximumCompletedInterviews` are positive and internally consistent;
   `approvedInstrumentVersions` and `assignedInterviewers` are non-empty and approved; proposed values
   have been replaced by recorded decisions.
4. **Scope is coherent and authorized.** The recorded segments, geography, contact channels, contact
   ceiling, interview ceiling, spending ceiling and incentive policy match the approved sampling
   amendment and the approved channel authorizations, and nothing outside them is claimed.
5. **Period is active.** The release day lies within `[effectiveStartDate, expiryDate]`; an expired
   authorization is `EXPIRED`, not renewable by silence.
6. **No revocation.** No revocation event is recorded against the record; a revocation closes the gate
   immediately and requires a fresh grant.
7. **Evidence is filed.** The full record lives in the controller's governance set outside the
   repository; only its non-sensitive scope summary enters the repository.

The Master Prompt, a PR approval, an agent task assignment, a passing validator, a prepared template, a
signed-in-intent document, a sponsor's statement, an inference or the absence of an objection are
explicitly **not** authorization and cannot satisfy any condition above.

## 5. Release decision table

The decision function evaluates in the order below and returns the first applicable decision. Default
and unknown outcomes are `DENY`.

| #       | Evaluated condition                                                                                                       | Decision                             | Fieldwork effect                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `RD-01` | Any prerequisite in section 3 is not `VERIFIED_COMPLETE`                                                                  | `DENY`                               | No identification, contact, screening, invitation, interview or data capture                                                          |
| `RD-02` | No issued authorization record exists, or only a `DRAFT_PREPARED`/proposal exists                                         | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-03` | `authorizingPerson`, `authorityBasis` or `authorizationDate` is `null`/`OPEN`                                             | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-04` | `effectiveStartDate` or `expiryDate` is `null`/`OPEN`, or the current date is outside the period                          | `DENY` (`DENY_EXPIRED` when expired) | As `RD-01`                                                                                                                            |
| `RD-05` | `fieldworkLead` is `null`/`OPEN`                                                                                          | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-06` | `permittedSegments` or `permittedGeographies` is empty                                                                    | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-07` | `permittedContactChannels` is empty, or `maximumAuthorizedContacts`/`maximumCompletedInterviews` is not a positive number | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-08` | `controllerIdentity` or `privacyContact` is `null`/`OPEN`                                                                 | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-09` | `legalReviewReference` is `null`/`OPEN`, or the legal review is not recorded as complete                                  | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-10` | `approvedInstrumentVersions` is empty or contains only candidate versions                                                 | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-11` | `approvedStorageReference` is `null`/`OPEN`, or the store is not `OPERATIONALLY_APPROVED`                                 | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-12` | `assignedInterviewers` is empty, or training is not recorded complete                                                     | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-13` | Participant information or consent instrument is not approved                                                             | `DENY`                               | As `RD-01`                                                                                                                            |
| `RD-14` | A revocation event is recorded                                                                                            | `DENY` (`DENY_REVOKED`)              | Gate closed until a fresh grant                                                                                                       |
| `RD-15` | All conditions in section 4 hold simultaneously                                                                           | `ALLOW_SCOPED`                       | Fieldwork may start, but only exactly within the recorded scope, channels, ceilings and period; every other action remains prohibited |
| `RD-16` | `MC10R = PASS_INTERNAL_PREPARATION_SCOPE` is recorded while the gate is not open                                          | `NO_CHANGE`                          | `OUTREACH_AUTHORIZATION` remains `NOT_GRANTED`; `FIELDWORK_STATUS` remains `BLOCKED`                                                  |

`ALLOW_SCOPED` is future-conditional and does not exist today. Today every evaluation path from `RD-01`
to `RD-14` applies, `RD-15` is false and `RD-16` returns `NO_CHANGE`.

## 6. Current truth block

```
AUTH_MC10_001                  = NOT_GRANTED
AUTHORIZATION_DOCUMENT_HISTORY = revision 1 NOT_GRANTED (in force); revision 2 DRAFT_PREPARED (proposal)
OUTREACH_AUTHORIZATION         = NOT_GRANTED
FIELDWORK_STATUS               = BLOCKED
FIELDWORK_READINESS            = PARTIALLY_READY
MC10_PRIMARY_RESEARCH          = NOT_EXECUTED
AUTHORIZATION_GATE_DECISION    = DENY
GATE_OPEN                      = FALSE
EXTERNAL_CONTACT_ALLOWED       = FALSE
CONTROLLER_IDENTITY            = OPEN
PRIVACY_CONTACT                = OPEN
LEGAL_REVIEW                   = LEGAL_REVIEW_PENDING
SECURE_STORE                   = NOT_PROVISIONED
TRAINED_INTERVIEWERS           = 0
PARTICIPANTS                   = 0
COMPLETED_INTERVIEWS           = 0
PRICE_RESPONSES                = 0
```

```json
{
  "authorizationRecord": "AUTH-MC10-001",
  "authorizationStatus": "NOT_GRANTED",
  "authorizationDocumentStatus": "DRAFT_PREPARED",
  "outreachAuthorization": "NOT_GRANTED",
  "fieldworkStatus": "BLOCKED",
  "fieldworkReadiness": "PARTIALLY_READY",
  "mc10PrimaryResearch": "NOT_EXECUTED",
  "gateOpen": false,
  "gateDecision": "DENY",
  "externalContactAllowed": false,
  "participants": 0,
  "completedInterviews": 0,
  "priceResponses": 0,
  "legallyReviewed": false,
  "controllerDesignated": false,
  "privacyContactVerified": false,
  "secureStoreProvisioned": false,
  "trainedInterviewers": 0,
  "prerequisitesVerifiedComplete": 0
}
```

## 7. What the recovery milestone may and may not report

`MC10R = PASS_INTERNAL_PREPARATION_SCOPE` certifies only that the internal recovery preparation is
consistent, complete for its declared scope and independently audited. It is a claim about documents and
controls.

It **never** changes, and cannot be cited as changing:

```
OUTREACH_AUTHORIZATION = NOT_GRANTED
FIELDWORK_STATUS       = BLOCKED
AUTH_MC10_001          = NOT_GRANTED
```

It is not a legal sign-off, not an authorization, not a controller designation, not a trained
interviewer, not a provisioned store, not participant evidence, not a demand finding and not permission
to contact anyone. A reader who treats the recovery PASS as fieldwork permission is misreading it; the
gate rejects that reading (`RD-16`).

## 8. Change control and cross-references

- This gate may be tightened but not weakened. Removing or downgrading a prerequisite requires a
  recorded governance decision and cannot occur inside this recovery milestone.
- The prerequisite register must be re-evaluated, with evidence cited, by the accountable role before
  any `GRANTED` status; a release record must name the commit or document version reviewed.
- Any new legal requirement identified by counsel is added as a prerequisite before release; none may be
  satisfied by agent inference.

| Document                                                          | Relationship                                              |
| ----------------------------------------------------------------- | --------------------------------------------------------- |
| `recovery/MC10R-RECOVERY-EXECUTION-PLAN.md` (D2)                  | Binding canonical registration and status model           |
| `recovery/governance/AUTH-MC10-001-REV2-DRAFT.md` (D13)           | The proposed field set this gate evaluates                |
| `recovery/governance/MC10R-LEGAL-REVIEW-PACKAGE.md` (D15)         | Legal review evidence behind `P-03`                       |
| `recovery/governance/MC10R-PRIVACY-AND-CONSENT-PACKAGE.md` (D16)  | Participant information and consent behind `P-04`         |
| `docs/marea/customer-discovery/data/fieldwork-authorization.json` | Machine-readable revision-1 record                        |
| `docs/marea/customer-discovery/data/research-status.json`         | Wave-0 checklist and blockers `BLK-MC10-01`…`BLK-MC10-07` |
| `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md`   | Authorization register and unblock sequence               |
