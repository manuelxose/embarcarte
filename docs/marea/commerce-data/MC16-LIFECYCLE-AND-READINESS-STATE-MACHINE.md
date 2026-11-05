# MC-16 — Lifecycle and readiness state machine (D06)

| Field | Value |
|---|---|
| Lifecycle states | 7 |
| Readiness dimensions | 11 |
| Current families | all `DEFINED` |
| Current `COMMERCIALLY_AVAILABLE` | 0 |
| Maximum reachable state during MC-16 | `DEFINED` |
| Canonical data | `data/lifecycle-policy.json`, `data/readiness-dimensions.json` |

## 1. Purpose

Readiness is multidimensional. Reaching a later state in one dimension never clears
another dimension. A passing test is not evidence that a regulator, rights holder,
supplier, insurer or payment provider approved anything.

## 2. Lifecycle states

| State | Meaning | Current |
|---|---|---|
| `CONCEPT` | Idea only; no complete target definition | 0 |
| `DEFINED` | Internal target specification complete; not verified or cleared | 9 families |
| `ENGINEERING_VERIFIED` | Engineering evidence accepted | 0 |
| `REGULATORY_READY` | Applicable conformity, safety and market-placement evidence accepted | 0 |
| `OPERATIONS_READY` | Terms, payment, legal entity, insurance and support readiness accepted | 0 |
| `COMMERCIALLY_AVAILABLE` | Every gate, price, stock, publication and approval condition is satisfied | 0 |
| `RETIRED` | Authorized withdrawal from sale | 0 |

No MAREA family, edition or bundle may be assigned `REGULATORY_READY`,
`OPERATIONS_READY` or `COMMERCIALLY_AVAILABLE` in MC-16. The schema's MC-16 guards reject
those values; a later milestone must migrate them deliberately.

## 3. Readiness dimensions

| Dimension | Ready value | Current MAREA state |
|---|---|---|
| definition | `COMPLETE_TARGET_SPECIFICATION` | complete for all families |
| engineering | `ENGINEERING_VERIFIED` | not verified / partially verified |
| licensing | `CLEARED` | `NOT_CLEARED` |
| hardware | `CERTIFIED` | not selected / not certified; N/A for software |
| dataRights | `GRANTED_PER_TERRITORY` | `NOT_GRANTED` |
| compliance | `CONFORMANCE_EVIDENCE_ON_FILE` | `NOT_STARTED` |
| safety | `SAFETY_APPROVED` | PILOT `BLOCKED`; others not approved |
| pricing | `APPROVED` | 0 approved; hypotheses or not established |
| brandPublication | `PUBLICATION_APPROVED` | `NOT_GRANTED` |
| operations | `OPERATIONS_READY` | `NOT_READY` |
| availability | `FOR_SALE` | `NOT_FOR_SALE` |

All eleven are evaluated independently by `evaluateReadiness()`. Any dimension that is
not at its ready value blocks readiness. Missing dimensions fail closed.

## 4. Transition contract

Every proposed transition records:

```
transitionId
entityId
fromState
toState
requiredGateIds
requiredEvidenceIds
requiredApproverRoles
authorizationStatus
auditEventId
```

A transition is accepted only when all required gates are closed with valid evidence, all
required evidence records are present and usable, the actor holds an authorized role, the
transition is authorized, and an audit event exists. Otherwise it fails closed.

### 4.1 Canonical transitions

| Transition | Required gates | Required evidence | Approver roles | MC-16 |
|---|---|---|---|---|
| CONCEPT → DEFINED | none | complete definition | product governance | not used |
| DEFINED → ENGINEERING_VERIFIED | none | engineering verification | hardware/engineering lead | denied |
| ENGINEERING_VERIFIED → REGULATORY_READY | market placement, CRA, PILOT safety | conformity, DoC, safety case | compliance, security, hardware | denied |
| REGULATORY_READY → OPERATIONS_READY | consumer terms, payments, legal entity, insurance, privacy | terms, payment, legal entity, insurance | legal, finance, commercial | denied |
| OPERATIONS_READY → COMMERCIALLY_AVAILABLE | all 13 | all gates closed, price, inventory, publication | programme, commercial, finance, legal | denied |
| ANY → RETIRED | none | retirement authorization | programme, commercial | denied |

`evaluateReadinessTransition()` always adds `MC16_COMMERCIAL_ACTIVATION_PROHIBITED` for a
transition to `COMMERCIALLY_AVAILABLE`; no activation can occur in this milestone even if
a synthetic fixture supplies every other input.

## 5. Negative-path proof

The evaluator deterministically rejects a transition when any of the following is true:

- an external legal gate is open;
- a licence is missing;
- a price is unapproved or unknown;
- stock provenance is absent;
- the PILOT safety case is blocked;
- a required approval or approver role is missing;
- the actor lacks permission;
- a prerequisite document is expired or revoked;
- the audit event is missing.

The adversarial suite exercises gate bypass, PILOT readiness escalation, invalid
transition skipping, unauthorized actor and commercial activation. Each test must fail for
the intended reason.

## 6. Snapshot model

`marea_readiness_snapshots` stores an evaluated snapshot with all eleven dimensions,
lifecycle state, ready flag, blocking gate ids, evidence ids, evaluation timestamp and
policy version. A snapshot records a decision; it does not itself grant a state.

## 7. Current result

```
families DEFINED                      = 9
families ENGINEERING_VERIFIED         = 0
families REGULATORY_READY             = 0
families OPERATIONS_READY             = 0
families COMMERCIALLY_AVAILABLE       = 0
editions/bundles COMMERCIALLY_AVAILABLE = 0
```
