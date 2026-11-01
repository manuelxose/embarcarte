# MC-10R — Secure research data architecture (D17)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D17 / `MC10R-SECURE-DATA-ARCHITECTURE` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Status | `DRAFT_FOR_LEGAL_REVIEW` — architecture only; **not provisioned**, not access-reviewed, not operationally approved |
| Recovery work status | `READY_FOR_OWNER_REVIEW` |
| External authorization status | `NOT_GRANTED` (`AUTH-MC10-001` rev 2, `DRAFT_PREPARED`) |
| Fieldwork readiness | `PARTIALLY_READY` — fieldwork remains `BLOCKED` |
| Date | 2026-11-01 |
| Owner | `agent-f-data` (Research Data Security and Integrity Engineer) |
| Accountable human | `OPEN` — no data controller, privacy contact, data steward or processor is designated |
| Scope | Design of the three-layer research data model, access control, encryption, retention, deletion, withdrawal propagation, backup, audit, processors, export, breach response and the synthetic security test plan. Implemented artifacts: contracts D18, D27–D30 and validator D31. Nothing is provisioned. |
| Storage evidence states | `ARCHITECTURE_DEFINED = true`; `LOCAL_SYNTHETIC_TESTS_PASS = true`; `PROVISIONED = false`; `ACCESS_REVIEWED = false`; `OPERATIONALLY_APPROVED = false` |

> **STATUS BANNER — MC-10R / D17.** This document defines an architecture. It does not
> provision, configure or approve any store, processor, credential or account. No cloud
> service has been selected or configured. There is no participant data: participants,
> interviews, price responses, audio and transcripts are all zero. `ARCHITECTURE_DEFINED`
> and `LOCAL_SYNTHETIC_TESTS_PASS` are the only true storage evidence states; the other
> three are false and must stay false until a named human performs real provisioning,
> access review and operational approval.

## 1. Purpose and non-claims

MC-10 was blocked because no external research authorization exists. This architecture
removes the data-protection and research-integrity defects that would otherwise block
legitimate fieldwork **after** a real authorization is issued. It does not create
authorization, does not collect data and does not create a compliant store.

What this document is not:

- Not a data protection impact assessment, not a legal opinion, not a processor agreement.
- Not evidence that any encryption key, access list, audit log or deletion job exists.
- Not a claim that synthetic local tests prove operational security in a real service.
- Not permission to contact, recruit, screen or interview any person.

## 2. Three-layer data model

Data is separated by risk. Only Layer C may exist inside this repository. Layers A and B
are *designed* to live in an access-controlled store outside Git. That store does not
exist in this environment (blocker `BLK-MC10-05`, carried into `D30`).

### 2.1 Layer A — identity and consent (never in Git)

| Data element | Purpose | Minimum fields | Never stored with |
| --- | --- | --- | --- |
| Candidate contact details | To invite and schedule a candidate | `candidateRef` (random), channel handle, language, segment guess, gatekeeper reference | Research notes, quotations, price answers |
| Recruitment permission | To prove the gatekeeper/person allowed contact | `permissionRef`, channel, date, wording version, scope, expiry | Aggregate reports |
| Consent records | To prove lawful basis and permissions | `consentRecordRef`, `instrumentVersion` (`CONSENT-01` v`1.1.0` candidate), language, date, scope flags (`PARTICIPATION`, `RECORDING`, `QUOTATION`, `FOLLOW_UP`), capture method, **no signature image** | Analytic content |
| Follow-up permissions | To allow later contact | `followUpRef`, scope, expiry, channel restriction | Research notes |
| Withdrawal requests | To stop processing and propagate deletion | `withdrawalRef`, date, channel, scope (`ALL`, `QUOTATION`, `FOLLOW_UP`), acknowledgement state | Aggregate reports |
| Identity-to-pseudonym mapping | The only link between a person and `P-MC10-###` | `mapRef`, `P-MC10-###`, identity key reference; encrypted with a key not stored beside the data | Anything else, export, Git |

Rules: identity and consent are write-once, append-only and audited; the mapping table is
the single highest-risk asset and is encrypted at field level; no identity value is ever
copied into Layer B or Layer C. A pseudonymous ID is never joined with a name, email,
phone, berth number or vessel registration number in any file that leaves Layer A.

### 2.2 Layer B — research records (never in Git)

| Data element | Purpose | Minimum fields | Notes |
| --- | --- | --- | --- |
| Pseudonymous notes | Qualitative analysis | `noteRef`, `P-MC10-###`, `INT-MC10-###`, instrument id/version/language/date, note text | Free text may re-identify; kept in B only |
| Raw responses | Analysis input | response id, item id, instrument version, value, timestamp | Never coerced: unknown stays unknown |
| Optional recordings | Verbatim source | recording reference, consent `RECORDING` flag, retention class | Stored only if consent flag true; deleted after transcription |
| Source/instrument versions | Traceability | `GUIDE-01`/`PRICE-01`/`NOTE-01`/`SCHEMA-01`/`ANA-01` + version + language + hash | v`1.0.0` historical; v`1.1.0` candidate `REVIEW_REQUIRED` |
| Pricing responses | Willingness-to-pay data | `PRS-MC10-###`, construct, ladder point, currency, VAT treatment, segment, instrument version, `UNKNOWN` handling | n never coerced; minimum n≥8 not reduced |
| Coding records | Qualitative coding | unit id, code id, codebook version, double-coded flag, coder reference | Coder references are role IDs, never names in Layer B if avoidable |
| Data-quality flags | Analysis eligibility | flag id, scope, severity, resolution state | Flags are records, not deletions: never overwrite a value |

Rules: Layer B is pseudonymous, not anonymous. Re-identification is possible by
combination; access is granted per participant and per task, never by whole-store export.
Quotations may only leave Layer B as Layer C after the `QUOTATION` consent check and a
re-identification assessment; currently no quotation exists at all.

### 2.3 Layer C — repository outputs (may be in Git)

Layer C contains only: aggregate results, schemas, re-identification-assessed anonymized
summaries, non-identifying provenance (instrument id/version/language/date, hashes),
experiment verdicts, analysis code, governance metadata and validation reports.

Allowed in Layer C: counts, plans and quotas labelled as plans, thresholds frozen by
SHA-256, zero counts, status records, `P-MC10-###` references **only** where they are
pseudonymous and carry no identity, aggregate findings that cite a valid interview record,
non-identifying provenance and validator output.

Prohibited in Layer C: names, contact details, addresses, berth/vessel identifiers, audio,
verbatim transcripts, screenshots of either, free-text notes from a single participant,
anything whose combination re-identifies a person, and any synthetic fixture presented as
research. `data/` is Layer C; the validator's PII and narrative scans (CR-46, CR-47, CR-62,
CRR) enforce the prohibition mechanically.

## 3. Access-control matrix (design)

Principle: least privilege, need-to-know per participant and per task, no standing
whole-store access, no sharing of accounts, and every access decision logged. Roles below
are the *only* defined roles; none is assigned to a human yet.

Legend: `—` none, `R` read, `W` write, `A` administer, `S` supervised read only.

| Role (status: all `UNASSIGNED`) | Layer A identity | Layer A consent | Layer A mapping | Layer B notes/raw | Layer B recordings | Layer B pricing/coding | Layer C repository | Audit log |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Data controller (accountable) | A via delegate only | A via delegate only | A via delegate only | S aggregate audit | S aggregate audit | S aggregate audit | R | R |
| Data steward / custodian | — | W | A | — | A (deletion) | — | R | R |
| Fieldwork lead | W recruitment state | W consent capture | — | W own sessions | — | — | R | R |
| Interviewer | W own candidate state | W own consent capture | — | W own session notes | W own recording | W own raw answers | — | — |
| Qualitative analyst | — | R consent flags only | — | R assigned participants | R with `RECORDING` consent | R | R | — |
| Second coder | — | — | — | R assigned units | R with `RECORDING` consent | R assigned units | R | — |
| Independent auditor | — | — | R(verify integrity, supervised) | S | S | S | R | R |
| Legal / privacy reviewer | S | S | — | S policy samples | — | — | R | R |
| Processor (external platform) | — | — | — | — | — | — | — | — |
| Engineering validator (local) | — | — | — | — | — | — | R/W synthetic fixtures only | — |

Rules:

1. No role reads and writes the same Layer A table except the data steward (custodian),
   and the steward does not analyse content.
2. Interviewers cannot see other interviewers' participants; analysts see assigned
   pseudonymous records only; the mapping is never readable by analysts.
3. Access is time-boxed to the study wave, reviewed before each wave and revoked on role
   change. Access review state is `ACCESS_REVIEWED = false` because no list exists.
4. Any export of Layer B requires the controller's explicit approval plus an export record
   (see section 9); no bulk download is permitted.

## 4. Roles and permissions (proposed, unfilled)

| Role | Accountable for | Required appointment evidence | Current |
| --- | --- | --- | --- |
| Data controller | Lawful basis, notices, retention, breach | Legal entity identity + register of processing | `OPEN` |
| Data protection contact | Participant contact route, DPIA, breach notification | Verified contact + appointment record | `OPEN` |
| Data steward | Store provisioning, access list, deletion, audit | Named human, accepted policy, training record | `UNASSIGNED` |
| Fieldwork lead | Consented sessions, session records, withdrawal intake | Named human, authorization from controller | `UNASSIGNED` |
| Interviewer | Consent capture, session conduct | Trained + approved instrument version | `UNASSIGNED` (0 trained) |
| Qualitative analyst | Coding honesty, quotation eligibility | Codebook certified, confidentiality undertaking | `UNASSIGNED` |
| Second coder | Double coding, kappa reporting | Same as analyst, independent of first coder | `UNASSIGNED` |
| Independent auditor | Compliance verification | Independent of authors | `UNASSIGNED` |
| Processor / platform | Hosting, transcription, comms | Written processor agreement + security review | `NOT_ENGAGED` |

No invitation, consent capture, analysis or deletion is valid unless the acting role is
appointed in a recorded appointment with a date and an accepting human.

## 5. Encryption requirements (requirements only; no key exists)

| Requirement | Value | Evidence state |
| --- | --- | --- |
| Encryption at rest | AES-256 (or provider equivalent with documented algorithm) for every Layer A/B medium | `REQUIREMENT_ONLY` |
| Encryption in transit | TLS 1.2+ for every access path; no plaintext research channel | `REQUIREMENT_ONLY` |
| Field-level encryption | `P-MC10-###`-to-identity mapping column encrypted separately | `REQUIREMENT_ONLY` |
| Key management | Keys in a separate key store from data; no key in Git, no key in the repository, no key beside the data; two-person access for the identity key | `REQUIREMENT_ONLY` |
| Key rotation | Annual, and on role removal; old key material destroyed | `REQUIREMENT_ONLY` |
| Backups | Encrypted with the same standard; restore test with synthetic data only | `REQUIREMENT_ONLY` |
| Local synthetic evidence | Fixtures are synthetic and unencrypted only because they contain no personal data | `LOCAL_SYNTHETIC_TESTS_PASS` |

## 6. Retention schedule (proposed; not in force)

| Record class | Layer | Proposed retention | Trigger | Current status |
| --- | --- | --- | --- | --- |
| Candidate contact details (not interviewed) | A | 90 days | last contact | `PROPOSED_NOT_EFFECTIVE` |
| Candidate contact details (rejected/excluded) | A | 30 days | exclusion decision | `PROPOSED_NOT_EFFECTIVE` |
| Consent record | A | 24 months | interview completion | `PROPOSED_NOT_EFFECTIVE` |
| Withdrawal record (proof of withdrawal) | A | 36 months | withdrawal received | `PROPOSED_NOT_EFFECTIVE` |
| Identity-to-pseudonym mapping | A | 24 months | interview completion or withdrawal | `PROPOSED_NOT_EFFECTIVE` |
| Recordings | B | delete after transcription; hard maximum 30 days | session date | `PROPOSED_NOT_EFFECTIVE` |
| Transcripts/notes | B | 24 months | interview completion | `PROPOSED_NOT_EFFECTIVE` |
| Raw price responses | B | 24 months | interview completion | `PROPOSED_NOT_EFFECTIVE` |
| Coding records and codebook versions | B | 24 months | analysis closure | `PROPOSED_NOT_EFFECTIVE` |
| Data-quality flags | B | 24 months | analysis closure | `PROPOSED_NOT_EFFECTIVE` |
| Aggregate results, schemas, validator reports | C | programme lifetime | — | `ACTIVE` (only Layer C exists) |
| Audit logs (access) | Audit | 24 months | event date | `PROPOSED_NOT_EFFECTIVE` |
| Deletion/withdrawal evidence | Audit | 36 months | deletion date | `PROPOSED_NOT_EFFECTIVE` |

A retention value cannot be shortened to avoid a deletion obligation and cannot be
extended without a recorded controller decision. No clock runs today because no data exists.

## 7. Deletion procedure (designed; never executed on real data)

1. **Trigger.** Withdrawal, retention expiry, erroneous capture, controller instruction or
   study closure.
2. **Authorize.** The data steward executes; the controller (or delegate) authorizes in
   writing. A deletion is never performed by the person whose behaviour is under audit.
3. **Scope.** Delete from the authoritative store first, then replica, then backups per
   their cycle. Delete the identity mapping entry and the identity key material for that
   participant. Layer B: purge the participant's pseudonymous records and any verbatim
   content inside coding units.
4. **Propagate.** Set the participant's analysis eligibility to false, exclude coding units
   and quotations, and recompute affected Layer C aggregates. Remove a quotation from any
   published output unless it is already non-identifying and the withdrawal scope allows it.
   Withdrawal of `QUOTATION` scope removes the quotation even when participation continues.
5. **Acknowledge.** Record an acknowledgement to the requester within 30 days. Accountable
   role `OPEN`.
6. **Verify.** A second person verifies deletion with a record count and a search for the
   identifier; the verification is written to the audit log.
7. **Report.** The deletion event is recorded as a Layer C governance metadata entry with a
   date, a scope class, a record count and a hash of the deletion record — never with the
   identity itself.

Deletion of synthetic fixture data is executed and verified by D32; deletion of real data
has never occurred and cannot occur while there is no store.

## 8. Withdrawal propagation (designed)

| Step | Action | Acknowledgement state |
| --- | --- | --- |
| 1 | Receive withdrawal through an authorized channel and record it in Layer A | `RECEIVED` |
| 2 | Stop all contact immediately (including follow-up permissions) | `STOPPED` |
| 3 | Mark Layer B records non-eligible; exclude from coding and analysis | `EXCLUDED` |
| 4 | Remove quotations and verbatim content from all outputs | `REMOVED` |
| 5 | Recompute Layer C aggregates affected by the excluded records | `RECOMPUTED` |
| 6 | Delete per the deletion procedure unless a legal retention obligation records a basis | `DELETED` or `LEGAL_HOLD` |
| 7 | Send written acknowledgement within 30 days | `ACKNOWLEDGED` or `ACK_PENDING` |
| 8 | Audit-log the chain and retain the proof record 36 months | `AUDITED` |

Every state is recorded with a date and a role. A withdrawal that only sets a flag in a
narrative document is not a withdrawal. No withdrawal exists today because no participant
exists; D32 proves the propagation *logic* against synthetic contracts.

## 9. Export and portability controls (designed)

- Export is only for a defined purpose: legal obligation, participant access request,
  approved analysis platform, or study handover.
- Only pseudonymous, re-identification-assessed datasets may be exported. Identity keys and
  the mapping are never exported; a participant access request is answered by the
  controller from Layer A directly, not by exporting the store.
- Any export carries a manifest (record counts, version, date, recipient role) and is
  written to the audit log before release.
- Minimum necessary scope; whole-store export requires a recorded controller decision.
- Cross-border transfer requires a legal basis and legal review (`LEGAL_REVIEW_PENDING`);
  none is approved.

## 10. Backup and recovery (designed)

- Encrypted backups of Layers A and B; key held separately.
- Rolling backup window 35 days; deletion propagates to backups within one backup cycle.
- Restore test uses **synthetic fixtures only**; a restore of real research data into a
  test environment is prohibited.
- Restore test evidence is recorded with a date, scope, synthetic-data label and result;
  no restore test has run against a real store because none exists.

## 11. Audit logging (designed)

- Append-only log: actor role, action, object class, object pseudonymous id where needed,
  timestamp, purpose, outcome. No content payload, no identity in log text.
- Log access is granted to the steward, controller and independent auditor only.
- Log integrity: hash chain or write-once storage; log retention 24 months.
- Events covered: access to the mapping, consent create/withdraw, analysis eligibility
  change, export, deletion, restore, access-list change.
- Current audit surface: none (no store). Local synthetic runs are recorded in D20.

## 12. Processor inventory (all NOT_ENGAGED)

| Candidate processor class | Purpose | Selected? | Configured? | Agreement? | Notes |
| --- | --- | --- | --- | --- | --- |
| Managed database / object storage | Host Layers A/B | No | No | No | No cloud service selected |
| Encrypted file transfer | Exchange with interviewers | No | No | No | — |
| Video-conferencing | Remote interviews | No | No | No | Must record consent for recording |
| Transcription service | Transcript production | No | No | No | Human transcription preferred at zero budget |
| Survey/pricing administration tool | Ladder administration | No | No | No | Must preserve `UNKNOWN` handling |
| Email / messaging provider | Invitations | No | No | No | Not authorized for outreach |
| Key management service | Keys | No | No | No | Keys do not exist |

No processor may be engaged before a written agreement, a documented security review and a
controller decision. A processor is never a controller and never obtains Layer A identity.

## 13. Incremental deployment rule (keep it small)

The first provisioned version must be the smallest complete system: one access-controlled
store for Layers A and B, one encrypted identity column, one audit log, one deletion runbook
and the validator. No microservices, no new dependency, no analytics platform and no
third-party cloud selection are in scope. Any future infrastructure change needs a recorded
controller decision and an update to this document plus D18/D19.

## 14. Breach response (designed; accountable role `OPEN`)

1. **Detect** — audit alert, participant report, or internal discovery.
2. **Contain** — revoke access, suspend the affected processor, preserve evidence.
3. **Assess** — classify data classes affected (identity, consent, research content),
   affected people count, risk to rights and freedoms.
4. **Notify** — controller notifies the supervisory authority within 72 hours of awareness
   when required, and affected participants without undue delay when high risk. Notices are
   issued by the controller, never by an agent.
5. **Remediate** — rotate keys, force access review, patch, re-train.
6. **Record** — breach register entry with facts, decision and remediation; 36 months.

Because there is no store and no data, the current breach surface is the repository itself;
the repository holds only Layer C zero-data records and is scanned by the existing gate.

## 15. Synthetic security test plan

| Test | What it proves | Executed? | Evidence |
| --- | --- | --- | --- |
| `CRR` contract invariants | The recovery contracts cannot represent a granted/approved/provisioned state without evidence | Yes, local, synthetic | D31 + D32 run output in D20 |
| Consent transition map | Only allowed consent/withdrawal transitions are accepted | Yes, local, synthetic | D31 + D32 |
| Quota and pricing invariants | No quota inflation; BELOW_REGISTERED_MINIMUM cells never presented reachable | Yes, local, synthetic | D31 + D32 |
| Deletion/withdrawal propagation model | A withdrawal forces exclusion, quotation removal and audit evidence | Yes, contract-level, local | D31 + D32 |
| Access-control negative tests | Unauthorized role access is denied | **No** | Requires a real store |
| Encryption at rest | Data is unreadable without the key | **No** | Requires a real store and key |
| Backup/restore with synthetic records | Restore works and deletion survives backup | **No** | Requires a real store |
| Audit-log completeness in a service | Every access is logged | **No** | Requires a real store |
| Export-control enforcement | Only approved pseudonymous exports leave | **No** | Requires a real store |

The five unexecuted tests are recorded as such and stay `NOT_EXECUTED` in D20. They may not
be reported as passing because the local validator passes.

## 16. Evidence states (separate and not conflated)

| State | Value | Meaning |
| --- | --- | --- |
| `ARCHITECTURE_DEFINED` | **true** | This document plus D18/D19 and the contracts exist and are validated locally |
| `LOCAL_SYNTHETIC_TESTS_PASS` | **true** | D31/D32 pass against synthetic fixtures on this machine |
| `PROVISIONED` | **false** | No store, account, key, bucket, database or processor exists |
| `ACCESS_REVIEWED` | **false** | No access list exists to review |
| `OPERATIONALLY_APPROVED` | **false** | No accountable operator has approved operation |

A document is not a store; a validator is not an access review; a synthetic test is not
operational approval.

## 17. Limitations and open items

- No store, no key management, no audit service, no processor agreement: all designed only.
- No controller, no privacy contact, no data steward: accountable fields `OPEN`.
- Legal review pending (`LEGAL_REVIEW_PENDING`): GDPR/LOPDGDD and PT Lei 58/2019 analysis is
  D15/D16, not this document.
- The consent instrument `CONSENT-01` v`1.1.0` is a candidate, not approved.
- Instrument versions v`1.1.0` are `REVIEW_REQUIRED`; v`1.0.0` is historical and frozen.
- Local tests prove deterministic contract invariants, not real-world security.
- Nothing here authorizes fieldwork. `AUTH-MC10-001` remains `NOT_GRANTED`.
