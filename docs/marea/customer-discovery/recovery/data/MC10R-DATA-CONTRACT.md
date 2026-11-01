# MC-10R — Research data contract (D18)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D18 / `MC10R-DATA-CONTRACT` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Status | `DRAFT_FOR_LEGAL_REVIEW` — candidate contract; `PROPOSED_NOT_EFFECTIVE` |
| Contract id | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` |
| Contract version | `1.0.0` |
| Date | 2026-11-01 |
| Owner | `agent-f-data` (Research Data Security and Integrity Engineer) |
| Scope | Record types, required and prohibited fields, pseudonymization, the consent-state model and its allowed transitions, provenance, pricing-response fields, data-quality flags, the repository-output allowlist, the PII prohibition rules and the machine-readable keys consumed by `mc10r-recovery.contract.json` (D27) and validated by `scripts/check-marea-customer-recovery.mjs` (D31). |
| Storage evidence states | `ARCHITECTURE_DEFINED = true`; `LOCAL_SYNTHETIC_TESTS_PASS = true`; `PROVISIONED = false`; `ACCESS_REVIEWED = false`; `OPERATIONALLY_APPROVED = false` |

> **STATUS BANNER — MC-10R / D18.** This is a candidate contract for future fieldwork. It is
> not effective, not approved and not evidence that any record type exists. Zero participant
> records, zero interview records, zero price responses and zero coded units exist. No record
> defined here may be created until `AUTH-MC10-001` is a real `GRANTED` record and D14's
> prerequisites are `VERIFIED_COMPLETE`.

## 1. Relationship to the MC-10 contract

MC-10's `data-contract/MC10-DATA-CONTRACT.md` (D22 of MC-10) remains the contract for the
existing Layer C aggregate files under `docs/marea/customer-discovery/data/`. This document
extends it for the recovery stage: it adds the Layer A/Layer B record types that will exist
outside the repository, the consent state machine, the fieldwork evidence contract and the
repository-output allowlist that the recovery gate enforces.

Rules of precedence:

1. No existing MC-10 clause is weakened. Where this contract restates an MC-10 rule, the
   stricter reading applies.
2. A value here is a design decision for future fieldwork, not a research result.
3. A field marked `PROHIBITED` may never appear in any file in this repository, including a
   fixture, unless the fixture is created in an operating-system temporary directory by the
   negative test suite and destroyed after the run.

## 2. Record types

Every research record belongs to exactly one record type. The type determines its layer, its
identity, its retention class and whether it may ever enter the repository.

| Record type | Id pattern | Layer | May enter repository? | Exists today |
| --- | --- | --- | --- | --- |
| `CANDIDATE_CONTACT` | `CND-<random>` | A | No | 0 |
| `RECRUITMENT_PERMISSION` | `RPM-<random>` | A | No | 0 |
| `CONSENT_RECORD` | `CSR-<random>` | A | No (consent flags aggregate may enter) | 0 |
| `FOLLOW_UP_PERMISSION` | `FUP-<random>` | A | No | 0 |
| `WITHDRAWAL_REQUEST` | `WDR-<random>` | A | No (the fact and scope may enter as governance metadata) | 0 |
| `IDENTITY_MAP` | `MAP-<random>` | A | No | 0 |
| `INTERVIEW_NOTE` | `INT-MC10-###` | B | No | 0 |
| `RAW_RESPONSE` | `RSP-<random>` | B | No | 0 |
| `RECORDING` | `REC-<random>` | B | No | 0 |
| `PRICE_RESPONSE` | `PRS-MC10-###` | B | No raw values; aggregate counts may enter | 0 |
| `CODING_UNIT` | `CU-<random>` | B | No source text | 0 |
| `DATA_QUALITY_FLAG` | `QF-<random>` | B | The class and resolution may enter | 0 |
| `AGGREGATE_RESULT` | `AGG-<name>` | C | Yes | 0 |
| `SCHEMA` / `CODEBOOK` | `SCH-*` / `ANA-01` | C | Yes | schemas only |
| `GOVERNANCE_METADATA` | `GOV-*` | C | Yes | yes (zero-data status records) |
| `VALIDATION_REPORT` | `VAL-*` | C | Yes | yes (validator output) |
| `SYNTHETIC_FIXTURE` | `TESTFIX-*` | outside | No (temporary directory only) | 0 in tree |

A pseudonymous participant id `P-MC10-###` is not a record type: it is the join key that
Layer B uses in place of an identity. It maps to exactly one `IDENTITY_MAP` row and to exactly
one consent history in Layer A.

## 3. Required and prohibited fields

### 3.1 Required on every record

| Field | Rule |
| --- | --- |
| `recordType` | One of the values in section 2 |
| `recordId` | Stable, prefixed, never reused |
| `contractVersion` | `1.0.0` for this contract |
| `layer` | `A`, `B` or `C` as declared in section 2 |
| `createdAt` | ISO-8601 date-time in UTC |
| `instrumentVersion` | For any research record: instrument id + version + language |
| `provenance` | Where the record came from and under which permission |

### 3.2 Prohibited fields (never in the repository)

`name`, `firstName`, `lastName`, `fullName`, `email`, `e-mail`, `phone`, `mobile`, `whatsapp`,
`telephone`, `address`, `postalAddress`, `berthNumber`, `vesselRegistration`,
`registrationNumber`, `dni`, `nie`, `nif`, `iban`, `swift`, `signature`, `passport`,
`participantName`, `customerName`, `contactEmail`, `contactPhone`, `audio`, `recordingUrl`,
`transcript`, `verbatim`, `photo`, `ipAddress`, plus any free-text field that contains any of
these values. Field-name matching is case-insensitive and also matches camelCase and
snake_case variants. The existing MC-10 validator's forbidden-field set is a subset of this
list and MUST NOT be narrowed.

### 3.3 Pseudonymization rules

1. A participant is identified in research content only by `P-MC10-###`, assigned in a
   non-reversible order unrelated to recruitment order.
2. The mapping `P-MC10-###` → identity lives in Layer A only, encrypted at field level, and is
   the only place where the link exists.
3. Quasi-identifiers are reduced before any content leaves Layer B: exact dates become month
   or wave; vessel model becomes class; marina name is replaced by a geography class; a role
   plus employer plus marina combination that narrows to one person is a re-identification
   risk and must be generalized.
4. A re-identification assessment is required before a summary is published in Layer C:
   record the quasi-identifiers present, the k-anonymity-style reasoning (qualitative, not a
   statistical claim) and the decision. A summary that fails the assessment stays in Layer B.
5. No pseudonymous id may be combined with a name, contact handle, address, berth or vessel
   registration in any Layer C file. The validator scans for this.

## 4. Consent-state model and allowed transitions

The candidate instrument is `CONSENT-01` v`1.1.0` — proposed, not approved, not legally
reviewed. Consent is recorded per scope: `PARTICIPATION`, `RECORDING`, `QUOTATION`,
`FOLLOW_UP`. Each scope has exactly four states and three allowed transitions.

| Scope state | Meaning |
| --- | --- |
| `NOT_SOUGHT` | No consent captured yet; the default and the only initial state |
| `GRANTED` | Informed, recorded consent for this scope, with instrument version and date |
| `REFUSED` | The person declined this scope; processing for the scope stops |
| `WITHDRAWN` | Terminal for this scope in this study; processing stops and propagation runs |

Allowed transitions (the only ones a system may accept):

| From | To | Condition | Evidence required |
| --- | --- | --- | --- |
| `NOT_SOUGHT` | `GRANTED` | Informed consent captured before processing | consent record id, instrument id/version/language, date, capture method |
| `NOT_SOUGHT` | `REFUSED` | Person declines | refusal record id and date |
| `GRANTED` | `WITHDRAWN` | Person withdraws the scope | withdrawal record id, date, channel, scope |

Forbidden transitions (the system must reject, not repair): `WITHDRAWN` → any state;
`REFUSED` → `GRANTED` without a new informed-consent event recorded as a new record;
`GRANTED` → `NOT_SOUGHT`; any transition without a timestamp, instrument version or record id;
any consent treated as implied by silence, by an existing relationship or by an earlier study.

A withdrawal of `PARTICIPATION` implies `RECORDING` and `QUOTATION` withdrawal. A
`QUOTATION` withdrawal removes quotations even when participation continues. A `RECORDING`
withdrawal deletes recordings and forbids transcription of any remaining audio.

The machine-readable version of this model is `consentModel` in D27. The validator rejects any
transition outside the three allowed rows and any transition out of `WITHDRAWN`.

## 5. Provenance fields

Every research record that can influence a result carries provenance:

| Field | Type | Rule |
| --- | --- | --- |
| `instrumentId` | enum | `SCREEN-01`, `CONSENT-01`, `GUIDE-01`, `PRICE-01`, `NOTE-01`, `SCHEMA-01`, `ANA-01` |
| `instrumentVersion` | string | `1.0.0` historical frozen; `1.1.0` candidate `REVIEW_REQUIRED` — never represented as approved |
| `instrumentLanguage` | enum | `ES`, `EN`, `PT`; a PT instrument does not exist (`NOT_PRODUCED`) so no PT record may exist |
| `instrumentSourceHash` | sha256 | `1.0.0` historical hash `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`; a candidate hash must be labelled `NOT_EFFECTIVE` |
| `recordedAt` | ISO-8601 | Session or capture time, UTC |
| `recordedBy` | role id | `INTV-*` or role; never a name in Layer C |
| `sessionWave` | enum | `WAVE_1`, `WAVE_2`, `WAVE_3`; a record must state which wave it belongs to |
| `consentRecordRef` | id | Resolvable in Layer A; the reference, never the content |

A record without provenance cannot be used in analysis, may not be quoted and may not be
counted. Provenance of `1.0.0` records is historical; a `1.1.0` candidate instrument may not
produce records until an approval exists.

## 6. Pricing-response fields

| Field | Required | Rule |
| --- | --- | --- |
| `priceResponseId` | yes | `PRS-MC10-###` |
| `participantId` | yes | `P-MC10-###` |
| `segmentId` | yes | Canonical `SEG-0N` |
| `experimentId` | yes | `EXP-MC10-04` (Gabor-Granger) or `EXP-MC10-05` (Van Westendorp) |
| `construct` | yes | Canonical construct id from `pricing-ladders.json` |
| `ladderPointIndex` | yes | Index into the frozen ladder; the ladder itself is frozen by hash |
| `ladderProvenanceRef` | yes | Reference to the frozen ladder record and its hash |
| `currency` | yes | ISO-4217; `UNKNOWN` is allowed as a value and is never coerced |
| `vatTreatment` | yes | `VAT_INCLUDED`, `VAT_EXCLUDED`, `VAT_UNKNOWN`, `NOT_APPLICABLE`; never guessed |
| `responseValue` | yes | Number or `UNKNOWN`; never coerced to zero |
| `answerType` | yes | `BINARY`, `THRESHOLD`, `TOO_CHEAP`, `TOO_EXPENSIVE`, `NOT_ANSWERED` |
| `administeredAt` | yes | ISO-8601 UTC |
| `instrumentVersion` | yes | `PRICE-01` version/language |
| `registeredMinimumN` | yes | `8` for the segment × construct cell; never reduced |
| `feasibilityClass` | derived | `REACHABLE_AT_PLANNED_MAX` or `BELOW_REGISTERED_MINIMUM`; a cell below the minimum may not be presented as a reachable quantitative result |

Rules: the registered minimum `n >= 8` per segment per construct is never lowered to obtain a
result; `BELOW_REGISTERED_MINIMUM` segments (`SEG-04`, `SEG-05`, `SEG-06`, `SEG-08` at planned
maxima 7, 7, 5, 6) can produce qualitative price objections only; `UNKNOWN` is a value, not a
zero; currency mixing is prohibited; VAT treatment must be stated or marked unknown; a price
is never approved by a research record.

## 7. Data-quality flags

| Flag class | Example | Rule |
| --- | --- | --- |
| `MISSING_RESPONSE` | item not answered | Record the gap; never impute |
| `UNKNOWN_VALUE` | `UNKNOWN` price or currency | Preserve; never coerce |
| `OUT_OF_SCOPE_SEGMENT` | record from a non-permitted segment | Exclude; do not delete silently |
| `CONSENT_SCOPE_MISMATCH` | content used beyond the granted scope | Block analysis and quotation; escalate |
| `REIDENTIFICATION_RISK` | summary too narrow | Keep in Layer B; generalize or suppress |
| `INSTRUMENT_VERSION_MISMATCH` | record from an unapproved version | Exclude from analysis |
| `TRANSCRIPTION_UNCERTAINTY` | audio unclear | Mark; never silently correct |
| `WITHDRAWAL_PENDING` | propagation incomplete | Quarantine the record until propagation completes |

A flag is a record with `flagId`, `scope`, `severity` (`INFO`, `WARN`, `BLOCKING`), `raisedAt`,
`resolution` (`OPEN`, `RESOLVED`, `SUPPRESSED`) and a reason. A blocking flag prevents use in
analysis. Flags never delete or overwrite the underlying value: the record and the reason
both survive until retention expiry.

## 8. Repository-output allowlist (Layer C)

Only the following may be written under `docs/marea/customer-discovery/`:

1. Aggregate tables whose every cell is a count of real records, a plan, a quota labelled as a
   plan, or a rate with a stated positive denominator. Zero counts are allowed and must say 0.
2. Schemas and codebook versions, including `PROPOSED_NOT_EFFECTIVE` candidates.
3. Anonymized, re-identification-assessed summaries that satisfy section 3.3 and cite only
   aggregate evidence.
4. Non-identifying provenance: instrument ids, versions, languages, dates and SHA-256 hashes.
5. Experiment verdicts that are `NOT_EXECUTED` / `BLOCKED` (or a future real verdict produced
   from real records under a recorded analysis plan).
6. Analysis code, validator and test scripts.
7. Governance metadata and validation reports.
8. Status records with `NOT_GRANTED`, `BLOCKED`, `PARTIALLY_READY`, `PROPOSED_NOT_EFFECTIVE`,
   `OPEN` values.

Not allowed in Layer C: identity or consent content, raw notes, raw price values with any
quasi-identifier, audio, transcripts, screenshots, any synthetic fixture, any invented
finding, any quotation without a resolvable consent-valid interview record, and any document
that claims an authorization, approval or operational store that does not exist.

## 9. PII prohibition rules (enforced by both gates)

1. No email address, telephone number, IBAN, DNI/NIE/NIF, postal address, social handle or
   account identifier anywhere under `docs/`, `src/`, `public/` or `deploy/`.
2. No participant name, no contact field and no identity key in JSON: the existing CR-46
   forbidden-field scan and the CRR scan both run on every recovery data file and every
   recovery Markdown document.
3. No audio (`*.mp3`, `*.wav`, `*.m4a`, `*.ogg`, `*.webm`) and no transcript file
   (`*transcript*`, `*verbatim*`) anywhere in the repository.
4. The recovery gate additionally scans for participant-email shapes in recovery documents,
   participant identity keys (`P-MC10-###` joined with identity terms) and realistic personal
   data patterns, and fails closed.
5. Detection is heuristic and documented as such (see D20 and the MC-10R addendum to
   `MC10-DATA-CONTRACT.md`); a clean scan is not proof of absence. It is a control that must
   fail loudly, never a guarantee.

## 10. Machine-readable keys consumed by D31

The recovery gate reads the following from the recovery data files. Any missing key is a hard
failure, never a default.

| Source | Key | Meaning |
| --- | --- | --- |
| D27 | `contractId`, `contractVersion`, `milestone`, `date`, `owner`, `deliveryStage`, `recoveryWorkStatus` | Contract identity and staging |
| D27 | `bindingTruth.*` | MC-10 blocked state, authorization and outreach status, zero counts |
| D27 | `sampling.*` | Preserved quotas, totals 37/57, historical aspiration 40–80, Wave 1 18–28, pricing feasibility classes |
| D27 | `consentModel.*` | States, allowed transitions, withdrawal propagation chain, accountable owner fields |
| D27 | `deliverables[]` | D1–D36 inventory with `id`, `path`, `owner` |
| D27 | `validators.*` | Existing gate 62 checks unchanged; CR-62 extension; recovery gate prefix `CRR` |
| D27 | `statusModel.*` | Status enums |
| D27 | `commercialInvariants.*` | Must equal the MC-10 `commercialInvariants` block byte-for-value |
| D28 | `amendments[]` | 14 entries `PI-01`…`PI-05`, `IV-01`…`IV-09` with statuses and null evidence |
| D29 | the 31 authorization keys (including `authorizationDate`, `effectiveStartDate`, `expiryDate`, `approvalEvidence`) + `documentStatus`, `authorizationStatus`, `fieldworkPermission`, `externalContactAllowed`, `inferenceGuard`, `fieldStatus`, `fieldMapNote` | Ungranted authorization mirror of D13; a missing or non-null `expiryDate`/`approvalEvidence` is a hard failure |
| D30 | `readinessState`, `fieldworkStatus`, `prerequisites[]`, `roles[]`, `storage`, `legalPrivacy`, `instrumentVersions`, `wave1`, `counts` | Fieldwork readiness record |

Every value is compared against the canonical registration in D2 section 3 and against the
MC-10 zero-data records under `docs/marea/customer-discovery/data/`. The gate never writes,
never repairs and never normalizes a missing value.

## 11. Change control

- This contract is `PROPOSED_NOT_EFFECTIVE`. It becomes effective only with a recorded
  programme-owner approval and a version bump.
- The consent model, pseudonymization rules, pricing minima and repository allowlist may not be
  relaxed to make a gate pass. A relaxation is a new version with a recorded decision.
- A CI-visible numeric claim in D20 ("N checks", "N tests") must be the observed output of a
  real run at the recorded commit; it is never aspirational.
- Synthetic fixtures are excluded from the repository and from every total; they exist only in
  operating-system temporary directories created by the negative test suite.
