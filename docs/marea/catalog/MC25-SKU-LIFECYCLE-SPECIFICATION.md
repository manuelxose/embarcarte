# MC-25 SKU lifecycle specification

**Module:** `src/app/marea-catalog/governance/sku-lifecycle.ts`
**Evaluation:** pure, clock-free, non-persistent.
**Vocabulary:** exactly five states; no orderable, sellable, published or
publicly available state exists.

## 1. Relationship to the MC-16 product lifecycle

Two lifecycles coexist and must not be conflated:

| Lifecycle | States | Purpose |
| --- | --- | --- |
| MC-16 product lifecycle | `CONCEPT → DEFINED → ENGINEERING_VERIFIED → REGULATORY_READY → OPERATIONS_READY → COMMERCIALLY_AVAILABLE`, plus `RETIRED` | Where the *product* is in its engineering/regulatory path. Transcribed read-only in `GOVERNANCE_LIFECYCLE_STATES`. Current reachable state: `DEFINED` for 9 families. |
| MC-25 governance lifecycle | `DRAFT`, `INCOMPLETE`, `AWAITING_EVIDENCE`, `BLOCKED`, `READY_FOR_REVIEW` | How far an internal reviewer may take a *candidate commercial SKU* through evidence collection. |

The governance lifecycle has **no transition into the product lifecycle** and no
state that grants sale, publication or orderability. `READY_FOR_REVIEW` is a
review readiness flag, not an approval.

## 2. States

| State | Semantics | Current derivation |
| --- | --- | --- |
| `DRAFT` | Record created; nothing assessed. | Not derived today (every decision is BLOCKED). |
| `INCOMPLETE` | Definition recorded, commercial prerequisites missing, no hard blocker. | Reachable only when no MC-02 gate is open. |
| `AWAITING_EVIDENCE` | Evidence requested from the responsible owner. | Reachable when blockers are resolved but evidence is missing. |
| `BLOCKED` | At least one referenced MC-02 release gate is open. | **Derived for all 26 editions and 6 bundles today.** |
| `READY_FOR_REVIEW` | Every internal prerequisite is satisfied; review may start. | Unreachable today. |

Derivation is deterministic and lives in `governanceStateOf(decision)`:
open MC-02 blocker → `BLOCKED`; otherwise missing prerequisite →
`AWAITING_EVIDENCE`; otherwise `INCOMPLETE`; a commercially orderable decision
would map to `READY_FOR_REVIEW` (never to a sale state).

## 3. Transitions

Seven transitions exist. Every other ordered pair (19 of 25) is rejected with
`INVALID_TRANSITION`.

| ID | From → To | Trigger | Guard | Current result |
| --- | --- | --- | --- | --- |
| T-DRAFT-INCOMPLETE | DRAFT → INCOMPLETE | RECORD_DEFINITION | none | permitted (non-persistent) |
| T-DRAFT-BLOCKED | DRAFT → BLOCKED | RECORD_HARD_BLOCKER | none | permitted (non-persistent) |
| T-INCOMPLETE-AWAITING | INCOMPLETE → AWAITING_EVIDENCE | REQUEST_EVIDENCE | none | permitted (non-persistent) |
| T-INCOMPLETE-BLOCKED | INCOMPLETE → BLOCKED | RECORD_HARD_BLOCKER | none | permitted (non-persistent) |
| T-AWAITING-INCOMPLETE | AWAITING_EVIDENCE → INCOMPLETE | EVIDENCE_REJECTED | none | permitted (non-persistent) |
| T-BLOCKED-AWAITING | BLOCKED → AWAITING_EVIDENCE | BLOCKER_RESOLVED | `blockersResolved` | **refused** `BLOCKERS_NOT_RESOLVED` |
| T-AWAITING-READY | AWAITING_EVIDENCE → READY_FOR_REVIEW | EVIDENCE_ACCEPTED | `evidenceComplete && blockersResolved && approvalBackendVerified` | **refused** `EVIDENCE_INCOMPLETE` |

`transition()` returns `persisted: false` on **every** path, including permitted
ones. There is no approval backend to write to, so a green primary transition
records only an `auditDraft` string marked `NOT_PERSISTED`.

## 4. Guard context

`CURRENT_LIFECYCLE_CONTEXT` is frozen with all four guards `false`, because the
corresponding external fact does not exist:

- `evidenceComplete = false` — 0/13 release gates closed, 0 approved prices, 0
  verified stock rows.
- `blockersResolved = false` — the MC-16 register reports every release gate open.
- `reviewAuthorized = false` — no verified administrative authorization mechanism.
- `approvalBackendVerified = false` — no MAREA SKU approval store exists.

There is no setter and no injection point: the guard context is a module
constant. Tests assert that both gated transitions are refused and that the two
open transitions never persist.

## 5. Prohibited states

`PROHIBITED_GOVERNANCE_STATE_NAMES` lists `ORDERABLE`, `SELLABLE`, `FOR_SALE`,
`COMMERCIALLY_AVAILABLE`, `PUBLISHED`, `AVAILABLE`. They are asserted absent from
the vocabulary, from every transition source and from every transition target.

## 6. Terminal behaviour

`READY_FOR_REVIEW` is terminal with reason
`NO_VERIFIED_APPROVAL_BACKEND`. A future milestone may add a transition only
together with a verified approval mechanism, an authorized persistence contract
and its own acceptance tests. Adding a state requires documented semantics and
tests, per the milestone brief.
