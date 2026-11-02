# MC-10R — Blocker register (D3)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D3 / `MC10R-BLOCKER-REGISTER` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 |
| Date | 2026-11-01 |
| Owner | `lead` |
| Recovery status | `IN_PROGRESS` |
| Fieldwork status | `BLOCKED` |
| Authorization status | `NOT_GRANTED` |

## 1. How to read this register

Two classes of blocker are separated deliberately:

- **Internal recovery blockers (IRB)** — defects inside the repository or the recovery package that
  MC-10R can and must close by implementation. They are closed only when a deterministic check or an
  independent review verifies the correction.
- **External blockers (EXT)** — real-world dependencies that no amount of internal work can satisfy:
  human authorization, verified legal identity, qualified legal review, provisioned infrastructure,
  appointed and trained people, and qualified linguistic review. They are recorded with the
  responsible role and the exact evidence required for closure. They remain `OPEN` at the end of
  MC-10R unless a real external act occurs.

Status vocabulary: `CLOSED_VERIFIED`, `PREPARED_PENDING_EXTERNAL`, `OPEN`, `BLOCKED`, `NOT_STARTED`.
A recovery `PASS_INTERNAL_PREPARATION_SCOPE` never closes an EXT blocker.

## 2. Internal recovery blockers

| ID | Blocker | Severity | Owner | Required closure evidence | Status at plan time |
| --- | --- | --- | --- | --- | --- |
| IRB-01 | PI-01: per-segment quotas (37 minimum / 57 maximum) are incompatible with the 40–80 programme planning target; totals are not derived from quotas | BLOCKING_BEFORE_FIELDING | agent-a-methodologist | D5 traceability table, recomputed arithmetic, option analysis, proposed amendment | `IN_PROGRESS` |
| IRB-02 | PI-02: three conflicting quota/target readings (minimum 5/target 8; operator/retailer minimum 3; SEG-04/05 minimum 5; experiment target 8–10) | BLOCKING_BEFORE_FIELDING | agent-a-methodologist | D6 single 15-field contract (the 14 enumerated fields plus `priorVersionReading`), version pointer, ambiguity classes eliminated | `IN_PROGRESS` |
| IRB-03 | PI-03: EXP-MC10-04/05 require `n>=8` but SEG-04/05/06/08 max at 7/7/5/6 | BLOCKING_BEFORE_PRICING_ANALYSIS | agent-b-pricing | D7 matrix; unreachable cells classified; no threshold lowered | `IN_PROGRESS` |
| IRB-04 | PI-04: IV-01…IV-06 instrument amendments absent (quotation consent, brand disclosure, ladder provenance, consent version capture, ANA-01 codebook, complaint route) | BLOCKING_BEFORE_FIELDING | agent-e-instruments | D9/D10/D11 dated candidate amendments, real hashes, non-effective status | `IN_PROGRESS` |
| IRB-05 | PI-05: IV-07…IV-09 instrument gaps (incident question, exclusions-before-benefits, concept-ID reconciliation) | BLOCKING_BEFORE_WAVE_1 | agent-e-instruments | D9/D11 candidate wording + canonical mapping | `IN_PROGRESS` |
| IRB-06 | AUTH-MC10-001 rev 2 does not exist as a reviewable draft | BLOCKING_BEFORE_FIELDING | agent-c-governance | D13 + D29 with 30 fields, `DRAFT_PREPARED`, `NOT_GRANTED` | `IN_PROGRESS` |
| IRB-07 | Authorization gate is not expressed as a per-prerequisite fail-closed release decision | BLOCKING | agent-c-governance | D14 prerequisite table and classification | `IN_PROGRESS` |
| IRB-08 | No legally reviewable privacy/consent package or legal-review package | BLOCKING_BEFORE_FIELDING | agent-c-governance | D15/D16 with `DRAFT_FOR_LEGAL_REVIEW`, controller OPEN, lawful-basis analysis | `IN_PROGRESS` |
| IRB-09 | No secure data architecture, data contract, access/retention/deletion procedure or synthetic evidence | BLOCKING_BEFORE_FIELDING | agent-f-data | D17–D20 with `ARCHITECTURE_DEFINED` + `LOCAL_SYNTHETIC_TESTS_PASS`, not provisioned | `IN_PROGRESS` |
| IRB-10 | No machine-readable recovery contract, amendment registry, authorization draft or readiness record | BLOCKING | agent-f-data | D27–D30 valid JSON matching the canonical registration | `IN_PROGRESS` |
| IRB-11 | No deterministic recovery validator or adversarial negative suite; CR-62 lacks ES/PT lexical coverage (F-10) | BLOCKING | agent-f-data | D31/D32 real runs; CR-62 strengthened additively with 62/62 preserved and 96 tests preserved+extended | `IN_PROGRESS` |
| IRB-12 | Human interviewer operating model, training, kit, recruitment templates and Wave 1 plan absent | BLOCKING_BEFORE_FIELDING | agent-d-fieldwork | D21–D26 with zero invented humans/sessions/templates approved | `IN_PROGRESS` |
| IRB-13 | No independent audit of the integrated recovery package | MANDATORY | agent-g-auditor | D33 with findings, corrections and re-verification | `NOT_STARTED` |
| IRB-14 | Registry row 10 still `PLANNED`; no recovery decision entries; no delivery record | MAJOR | lead | registry update, D4, D35 | `NOT_STARTED` |

## 3. External blockers (cannot be closed by MC-10R)

| ID | External dependency | Responsible role | Evidence required for closure | Status | Can fieldwork start? |
| --- | --- | --- | --- | --- | --- |
| EXT-01 | Valid external research authorization `AUTH-MC10-001` | Programme owner (named human) | Dated, scoped, signed authorization naming authorizer, authority basis, segments, geography, channels, contact/interview caps, spending/incentive position, duration, fieldwork lead; recorded in a revision ≥ 2 with `AUTHORIZATION_STATUS = GRANTED` and approval evidence | `OPEN` (record `NOT_GRANTED`) | **No** |
| EXT-02 | Verified data-controller identity | Programme owner / authorized source | Verified corporate identity (legal entity, tax/registration identifier where required), address, representative and role as controller; verifiable document | `OPEN` | **No** |
| EXT-03 | Verified privacy contact | Controller | Named or role-based privacy contact with a verified, monitored channel and response commitment | `OPEN` | **No** |
| EXT-04 | Qualified legal review of lawful basis, recruitment communications and privacy notices | Qualified legal adviser (ES; PT before Portugal) | Written review reference, scope, date, reviewer identity and conclusions; GDPR/LOPDGDD/Lei 58/2019 and e-communications analysis | `OPEN` | **No** |
| EXT-05 | Approved participant information and consent process | Controller + legal review | Approved notice versions (ES; PT before Portugal), consent instrument version, optional recording/quotation/follow-up permissions | `OPEN` | **No** |
| EXT-06 | Provisioned access-controlled secure research store (Layer A/B outside Git) | Data steward / controller | Real store reference, access list, encryption at rest/in transit, audit logging, retention and deletion configuration, access review evidence, breach procedure | `OPEN` (design only) | **No** |
| EXT-07 | Appointed and trained human interviewers with a named fieldwork lead | Programme owner / fieldwork lead | Named humans accepting roles, completed training records with supervisor sign-off, conflict-of-interest declarations, approved channel access | `OPEN` (zero assigned, zero trained) | **No** |
| EXT-08 | Approved sampling/quota amendment | Programme owner | Approved `MC10R-SAMPLING-1.1.0` / `MC10R-SEGMENT-QUOTA-1.1.0` (currently `PROPOSED_NOT_EFFECTIVE`) | `OPEN` | **No** |
| EXT-09 | Approved effective instrument version (SCREEN-01, CONSENT-01, GUIDE-01, PRICE-01, NOTE-01, SCHEMA-01, ANA-01) | Research owner + methodologist + legal as applicable | Signed amendment approval; new effective version with recomputed hashes; qualified ES/EN review; PT review before Portugal | `OPEN` (candidate v1.1.0 `REVIEW_REQUIRED`) | **No** |
| EXT-10 | Portuguese instruments, recruitment compliance and interviewer capability (only if Portugal is ever added) | Methodologist + legal + fieldwork lead | Qualified PT translation/equivalence review, PT legal review, PT-capable interviewer | `OPEN` (Portugal excluded from Wave 1) | **No** for Portugal |
| EXT-11 | Approved outbound channel and gatekeeper permissions for named recruitment sources | Programme owner / fieldwork lead | Channel-level authorization plus documented gatekeeper permission; no purchased/scraped lists | `OPEN` | **No** |
| EXT-12 | Approved storage and processing of any participant data | Controller + data steward | EXT-02…EXT-06 closed and a processor agreement where a third party is used | `OPEN` | **No** |

## 4. Relationship to the MC-10 blocker register

The MC-10 blockers remain valid and are not superseded: `BLK-MC10-01` outreach authorization,
`BLK-MC10-02` data controller, `BLK-MC10-03` lawful basis, `BLK-MC10-04` outreach channels,
`BLK-MC10-05` secure store, `BLK-MC10-06` approved outbound channel and trained humans,
`BLK-MC10-07` PT instruments. MC-10R adds internal closure work (IRB-01…IRB-14) and the fuller external
evidence requirements above; it does not mark any MC-10 blocker as unblocked.

## 5. Fail-closed rule

The recovery may end with `MC10R = PASS_INTERNAL_PREPARATION_SCOPE` while every EXT item remains
`OPEN`. Fieldwork remains `BLOCKED` and `OUTREACH_AUTHORIZATION` remains `NOT_GRANTED` until EXT-01
and all of EXT-02…EXT-12 that the authorized scope requires are actually satisfied and independently
evidenced. No validator, document, PR approval or agent statement may substitute for those external
acts.
