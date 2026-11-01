# MC-10R — Access, retention and deletion (D19)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D19 / `MC10R-ACCESS-RETENTION-AND-DELETION` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Status | `DRAFT_FOR_LEGAL_REVIEW` — design only; `PROPOSED_NOT_EFFECTIVE` |
| Date | 2026-11-01 |
| Owner | `agent-f-data` (Research Data Security and Integrity Engineer) |
| Scope | Role-based access control and least privilege, per-record retention, deletion procedure, withdrawal propagation and acknowledgement, backup and audit-log retention, processor requirements, export and portability, breach response, accountable-owner fields and the synthetic test procedure for deletion and withdrawal. |
| Storage evidence states | `ARCHITECTURE_DEFINED = true`; `LOCAL_SYNTHETIC_TESTS_PASS = true`; `PROVISIONED = false`; `ACCESS_REVIEWED = false`; `OPERATIONALLY_APPROVED = false` |

> **STATUS BANNER — MC-10R / D19.** Nothing in this document is in force. No store exists, no
> access list exists, no retention job runs, no deletion has ever been executed against real
> data and no accountable owner is designated. All accountable-owner fields are `OPEN` or
> `UNASSIGNED` and may be closed only by a named human's recorded acceptance, never by an agent
> or by a passing validator.

## 1. Principles

1. **Least privilege.** A role receives the minimum access needed for one task; access is
   time-boxed to a study wave and revoked when the task ends.
2. **Need-to-know per participant.** Analysis access is granted per assigned pseudonymous
   participant, not per store. There is no "read the whole Layer B" right.
3. **Separation of duties.** Whoever captures consent does not analyse the content; whoever
   deletes does not analyse; whoever audits does not author. No single role can both identify a
   person and read their research content.
4. **Default deny.** An unlisted role, an unlisted action or a missing approval is denied.
5. **Evidence over assertion.** Every access change, export and deletion produces a record;
   a policy without an operating record is a draft, not a control.
6. **No standing whole-store access, no shared accounts, no bulk download.**

## 2. Role-based access matrix

Legend: `—` none; `R` read; `W` write; `A` administer; `S` supervised, purpose-bound read;
`X` explicitly denied. All roles are currently `UNASSIGNED`; this matrix is a design.

| Role | Layer A contact | Layer A consent | Layer A mapping | Layer B notes/raw | Layer B recordings | Layer B price/coding | Layer C repository | Audit log | Export |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Data controller (accountable) | X (via written delegate only) | X (via delegate) | X (via delegate) | S | S | S | R | R | A (approves) |
| Privacy / DP contact | S purpose-bound | S purpose-bound | — | — | — | — | R | R | — |
| Data steward (custodian) | — | W | A | — | A (deletion only) | — | R | R | — |
| Fieldwork lead | W own candidates | W own consents | — | W own sessions | — | — | R | R | — |
| Interviewer | W own assigned candidate state | W own consent capture | X | W own session | W own recording | W own answers | — | — | X |
| Qualitative analyst | X | R scope flags only | X | R assigned participants | R with `RECORDING` consent | R assigned units | R | — | X |
| Second coder | X | — | X | R assigned units only | R with `RECORDING` consent | R assigned units | R | — | X |
| Independent auditor | — | — | S integrity verification | S | S | S | R | R | — |
| Legal reviewer | S | S | — | S policy samples | — | — | R | R | — |
| Processor (platform) | X | X | X | X | X | X | — | — | X |
| Local validator (synthetic only) | — | — | — | — | — | — | R/W temp fixtures | — | — |

Rules:

1. The mapping table is readable by no analytic role. The steward administers it without
   reading research content; the controller may inspect it only through a written delegate.
2. An interviewer sees only their own candidates and sessions and may not search the store.
3. The auditor may verify integrity but does not copy content out.
4. A processor never sees Layer A identity and never receives more than the pseudonymous scope
   it processes.
5. The `ACCESS_REVIEWED` state stays `false` until a named reviewer verifies the real access
   list; a matrix in a document is not an access review.

## 3. Least privilege and access lifecycle

| Step | Requirement | Evidence |
| --- | --- | --- |
| Appointment | Named human accepts a written role with scope and duration | Appointment record outside the repository |
| Training | Role-specific privacy and data-handling training completed | Training record with date (currently 0 trained) |
| Grant | Access granted per role and per wave; no standing access | Access-grant record in the audit log |
| Review | Before each wave and on any role change | Access-review record; `ACCESS_REVIEWED` may then be true |
| Revocation | Within 1 business day of role end, incident or withdrawal of trust | Audit-log entry |
| Recertification | Every 6 months | Review record |

No human is currently appointed, trained, granted or reviewed; every row is a requirement.

## 4. Retention schedule per record type

| Record type | Layer | Retention | Clock start | Disposal | Status |
| --- | --- | --- | --- | --- | --- |
| `CANDIDATE_CONTACT` (not interviewed) | A | 90 days | last contact | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `CANDIDATE_CONTACT` (excluded) | A | 30 days | exclusion decision | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `RECRUITMENT_PERMISSION` | A | 24 months | permission date | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `CONSENT_RECORD` | A | 24 months | interview completion | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `FOLLOW_UP_PERMISSION` | A | Until scope expiry, max 12 months | grant date | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `WITHDRAWAL_REQUEST` (proof) | A | 36 months | withdrawal date | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `IDENTITY_MAP` | A | 24 months | completion or withdrawal | Delete + key destruction | `PROPOSED_NOT_EFFECTIVE` |
| `RECORDING` | B | Delete after transcription, hard max 30 days | session date | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `INTERVIEW_NOTE` | B | 24 months | interview completion | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `RAW_RESPONSE` | B | 24 months | interview completion | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `PRICE_RESPONSE` raw | B | 24 months | interview completion | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `CODING_UNIT` source text | B | 24 months | analysis closure | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `DATA_QUALITY_FLAG` | B | 24 months | analysis closure | Delete | `PROPOSED_NOT_EFFECTIVE` |
| `AGGREGATE_RESULT` | C | Programme lifetime | creation | Governance review | `ACTIVE` (only `data/` exists) |
| `GOVERNANCE_METADATA` | C | Programme lifetime | creation | Governance review | `ACTIVE` |
| `VALIDATION_REPORT` | C | Programme lifetime | creation | Governance review | `ACTIVE` |
| Access audit logs | Audit | 24 months | event | Delete | `PROPOSED_NOT_EFFECTIVE` |
| Deletion / withdrawal evidence | Audit | 36 months | event | Delete | `PROPOSED_NOT_EFFECTIVE` |
| Backups | A/B | 35-day rolling window | backup date | Expire | `PROPOSED_NOT_EFFECTIVE` |

A retention period is never shortened to avoid a deletion duty and never extended without a
recorded controller decision. Where a legal hold applies, the hold and its basis are recorded
and the deletion is deferred — never silently skipped.

## 5. Deletion procedure

| Phase | Action | Evidence required |
| --- | --- | --- |
| 1 Trigger | Withdrawal, expiry, erroneous capture, controller instruction or closure | Trigger record with date, class and scope |
| 2 Authorize | Controller or written delegate authorizes; the steward executes | Written authorization |
| 3 Locate | Enumerate every record for the participant or class across Layers A/B and replicas | Record inventory with counts |
| 4 Delete primary | Delete authoritative-store records; destroy the identity-map row and its key material | Deletion log with counts |
| 5 Delete content | Purge pseudonymous notes, raw responses, price answers and verbatim text inside coding units | Deletion log |
| 6 Propagate | Mark analysis eligibility false; exclude coding units; recompute affected Layer C aggregates; remove quotations | Propagation record |
| 7 Backups | Deletion propagates within one backup cycle (35 days); expiry is the fallback | Backup-expiry record |
| 8 Verify | A second person re-runs the identifier search and verifies zero residual records | Verification record |
| 9 Acknowledge | Written acknowledgement to the requester within 30 days | Acknowledgement record |
| 10 Audit | Append the deletion event to the audit log and retain 36 months | Audit entry with hash |

Deletion must be irreversible: no soft-delete flag alone, no "deleted" marker over live
content, no retained copy for convenience. A deleted identity key is destroyed, not archived.

## 6. Withdrawal propagation and acknowledgement

The withdrawal chain (also machine-readable in D27 `consentModel.withdrawalPropagation`):

| Step | State | Action | Accountable role |
| --- | --- | --- | --- |
| 1 | `RECEIVED` | Record the withdrawal, scope and channel | Fieldwork lead (`UNASSIGNED`) |
| 2 | `STOPPED` | Stop all contact and follow-up immediately | Fieldwork lead (`UNASSIGNED`) |
| 3 | `EXCLUDED` | Mark records non-eligible; exclude from coding and analysis | Qualitative analyst (`UNASSIGNED`) |
| 4 | `REMOVED` | Remove quotations and verbatim content from all outputs | Data steward (`UNASSIGNED`) |
| 5 | `RECOMPUTED` | Recompute affected Layer C aggregates | Data steward (`UNASSIGNED`) |
| 6 | `DELETED` | Delete per section 5 unless a recorded legal hold applies | Data steward (`UNASSIGNED`) |
| 7 | `ACKNOWLEDGED` | Written acknowledgement within 30 days | Privacy contact (`OPEN`) |
| 8 | `AUDITED` | Audit-log the chain; retain the proof record 36 months | Independent auditor (`UNASSIGNED`) |

A withdrawal that only edits a narrative document is not a withdrawal. An acknowledgement that
was never sent must be recorded `ACK_PENDING`, never `ACKNOWLEDGED`. No participant exists, so
no withdrawal and no acknowledgement exists; D32 proves the propagation *contract* with
synthetic mutations only.

## 7. Backup retention and recovery

- Encrypted backups of Layers A and B; the key is held separately from the backup medium.
- Rolling window 35 days; deletion propagates within one cycle.
- Restore tests use synthetic fixtures only and never restore real research data into a test
  environment.
- A restore test records date, scope, synthetic-data label and result. No restore has run
  against a real store because none exists.

## 8. Audit-log retention and content

- Append-only, tamper-evident (hash chain or write-once storage), retained 24 months.
- Fields: actor role, action, object class, pseudonymous id where unavoidable, timestamp,
  purpose, outcome, correlation id. No content payload, no identity value.
- Covered events: mapping access, consent create/withdraw, analysis-eligibility change, export,
  deletion, restore, access-list change, retention job run, breach event.
- Readable by steward, controller and independent auditor only.
- Logs are reviewed monthly during a wave and after any incident; review results are recorded.

## 9. Processor requirements

No processor is engaged. Before any engagement, all of the following are required and none
exists today:

1. Written processor agreement with data-protection terms, scope, duration, sub-processor list
   and audit rights.
2. Documented security review covering encryption, access control, logging, residency and
   deletion.
3. Confirmed data location and any transfer mechanism; `LEGAL_REVIEW_PENDING`.
4. Processor never receives Layer A identity; only the minimum pseudonymous scope.
5. Deletion and export obligations mirrored in the agreement and testable.
6. A named processor contact and a breach-notification route into the controller's breach
   procedure.

The processor inventory in D17 section 12 lists only candidate classes, all `NOT_ENGAGED`. No
cloud service has been selected or configured in this milestone.

## 10. Export and portability

1. Export requires the controller's recorded approval and a stated purpose.
2. Only pseudonymous, re-identification-assessed data may leave; identity keys are never
   exported.
3. A participant access or portability request is answered by the controller from Layer A
   directly, not by exporting the store.
4. Every export writes an audit entry before release and carries a manifest with scope, counts,
   version and recipient role.
5. Minimum necessary scope; whole-store export needs a recorded controller decision; cross-border
   transfer needs a legal basis and legal review (not obtained).
6. No export has ever occurred; no route exists.

## 11. Breach response

| Phase | Action | Accountable | Timing |
| --- | --- | --- | --- |
| Detect | Audit alert, participant report, internal discovery | Any role | Immediately |
| Contain | Revoke access, suspend processor, preserve evidence | Data steward (`UNASSIGNED`) | Immediately |
| Assess | Data classes, affected count, risk to rights and freedoms | Controller (`OPEN`) + privacy contact (`OPEN`) | ≤ 24 h |
| Notify authority | Notify the supervisory authority when required | Controller (`OPEN`) | ≤ 72 h from awareness |
| Notify people | Notify affected people when high risk | Controller (`OPEN`) | Without undue delay |
| Remediate | Rotate keys, access review, patch, re-train | Steward + controller | Per plan |
| Record | Breach register entry, facts, decisions, remediation; retain 36 months | Privacy contact (`OPEN`) | ≤ 72 h |

An agent may never send a breach notification. Because no store and no data exist, the current
breach surface is the repository itself (Layer C only), which both gates scan.

## 12. Accountable owner fields

| Field | Value | Closed by |
| --- | --- | --- |
| Data controller | `OPEN` | Verified legal entity + recorded acceptance |
| Privacy / DP contact | `OPEN` | Verified contact + appointment + DPO determination |
| Data steward | `UNASSIGNED` | Named human + accepted policy + training evidence |
| Fieldwork lead | `UNASSIGNED` | Named human + acceptance |
| Independent auditor | `UNASSIGNED` | Independent appointment |
| Processor contact | `NOT_ENGAGED` | Processor agreement |
| Withdrawal acknowledgement owner | `OPEN` | Controller or privacy-contact delegate |
| Retention/deletion approver | `OPEN` | Controller or written delegate |
| Breach-notification owner | `OPEN` | Controller |

`OPEN` and `UNASSIGNED` are honest values. They may not be replaced by an agent name, a role
title without a human, or a placeholder that reads like a person.

## 13. Synthetic test procedure for deletion and withdrawal

The recovery gate and its negative suite prove the contract, not the store. The procedure below
is the test specification; the executable evidence is D31/D32 and is reported honestly in D20.

**S-1 Contract-level consent transitions.** Fixture: a D27 copy. Assert only
`NOT_SOUGHT→GRANTED`, `NOT_SOUGHT→REFUSED`, `GRANTED→WITHDRAWN` are accepted; injecting
`WITHDRAWN→GRANTED` (or any out-of-`WITHDRAWN` transition) must fail with the transition
CRR id. Status: executed locally, synthetic.

**S-2 Contract-level withdrawal propagation.** Fixture: a D27 copy with the propagation chain
truncated or a step's accountable role removed. Assert the gate fails; removing the
`ACKNOWLEDGED` step or replacing `OPEN` with a fabricated person must fail. Status: executed
locally, synthetic.

**S-3 Contract-level deletion coverage.** Fixture: a D19/D27 copy with no deletion procedure
reference or with retention values that exempt a record class. Assert the gate fails when a
record class has no retention row. Status: executed locally, synthetic.

**S-4 Synthetic participant-withdrawal walk-through (future, requires a store).** Create
synthetic records for a fictional `P-TEST-###` in a temporary environment, run the deletion
procedure end to end, verify zero residual records, verify quotations are removed from a
synthetic aggregate, verify the audit log chain and verify the acknowledgement state machine.
Status: **NOT_EXECUTED** — no store exists; the procedure is specified so it can be executed
the day a store is provisioned. Never use real data for this test.

**S-5 Backup deletion propagation (future, requires a store).** Delete a synthetic record,
wait one backup cycle test window, restore a backup snapshot and prove the record is absent.
Status: **NOT_EXECUTED**.

**S-6 Access-control negative tests (future, requires a store).** Attempt each matrix cell's
denied action with a synthetic role and prove denial, including analyst-to-mapping and
interviewer-to-other-interviewer access. Status: **NOT_EXECUTED**.

A future operator may report S-4 to S-6 as passing only with a dated, reproducible transcript.
Until then they are `NOT_EXECUTED`, and no document may imply otherwise.

## 14. Limitations

- Design only: no store, key, access list, retention job, processor or backup exists.
- Local synthetic tests cover the contract (S-1 to S-3), not operational security.
- Legal review is pending; retention values are proposals and may change with the legal
  analysis in D15/D16.
- All accountable fields are `OPEN`/`UNASSIGNED`; the design does not substitute for
  appointment.
- This document does not authorize fieldwork; `AUTH-MC10-001` remains `NOT_GRANTED`.
