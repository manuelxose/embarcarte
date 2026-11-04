# MC-19/36 — Dependencies and blockers register (D03)

| Field       | Value                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------- |
| Deliverable | D03 — `MC19-DEPENDENCIES-AND-BLOCKERS.md`                                                   |
| Milestone   | MC-19/36                                                                                    |
| Status      | `BLOCKED_PENDING_SCOPE_APPROVAL`                                                            |
| Baseline    | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094`                                                  |
| Companion   | D01 scope proposal · D02 source verification · D04 acceptance criteria · D05 risk register |

## 1. Implementation blockers (must close before any code)

| ID  | Blocker                                                    | Current state | Why it blocks implementation                                                                                     | Closure evidence required                                                                 |
| --- | ---------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| P01 | Authoritative MC-19 Master Prompt                          | `ABSENT`      | The registry row is a placeholder; the client-issued Master Prompt is authoritative.                            | The issued prompt text, bound to a scope revision and an accountable owner.               |
| P02 | IA/route/entity decision for segment and solution pages    | `ABSENT`      | No owners route; unclear whether solution pages are the MC-15 solutions overview, six bundle pages, or embedded context. | A recorded route decision with route ids, entities, page types, ES/EN paths, collision check and page-ownership boundary against MC-20–23. |
| P03 | Privacy/DPA/DPIA approval (B07)                            | `BLOCKED`     | No enquiry form, endpoint, lead store, registration or quote request may exist before it.                        | `GATE-PRIVACY-DPA-DPIA` closes with real executed evidence, not a plan.                    |
| P10 | Approval of this proposal, owners and write scopes         | `ABSENT`      | The proposal is not self-approving; no task DAG or write boundary is authorized.                                 | Written approval of the exact scope revision, task DAG, owners and file scopes.            |

P01, P02 and P10 block **all** implementation. P03 blocks only the enquiry/lead-flow
sub-scope; the recommended Option A does not require it because it collects no data.

## 2. Publication blockers (must close before any public activation)

| ID  | Blocker                                                        | Current state | Evidence                                                             |
| --- | -------------------------------------------------------------- | ------------- | -------------------------------------------------------------------- |
| P04 | Public copy approval (B05) and claims authorization (B06)      | `ABSENT`      | 0 of 42 catalogued claims public-authorized; 0 approved public copy.  |
| P05 | Commercial data and pricing decision (B08)                     | `ABSENT`      | `PRICE_APPROVED = NONE`; 0 approved prices; 0 merchant SKUs; `NOT_FOR_SALE`. |
| P06 | Publication/indexation/deployment and release authorization (B09) | `ABSENT`   | `PUBLICATION_AUTHORIZED = false`; `LANDING_RELEASE_AUTHORIZATION = null`. |
| P07 | Trademark clearance and MAREA public use (B01/B02)             | `NOT_GRANTED` | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `MAREA_PUBLIC_USE = NO_GO`. |
| P08 | Source IP and licensing clearance (B03)                        | `NOT_CLEARED` | `SOURCE_IP_CLEARANCE = NOT_CLEARED`; `LICENSING_RIGHTS_GRANTED = false`. |
| P09 | MC-14 release-gate programme closure (B10)                     | `0/13`        | 13 gates, 0 closed; 24 required documents, 0 executed.               |

## 3. Dependency graph for a future authorized execution

```text
P01 Master Prompt ─┐
P10 approval ──────┼─► T01 scope approval
                   └─► T02 IA/route decision (P02)
                              │
                              ▼
                        T03 content contract
                         ├──────────────► T04 implementation
                         └──────────────► T05 datasets + validator
                                                  │
                         T04 ─────────────────────┴─► T06 verification
                                                          │
                                                          ▼
                                                    T07 independent review
                                                          │
                                                          ▼
                                                    T08 delivery (draft PR)

P03 privacy ─► T09 enquiry/lead flow (BLOCKED, not scheduled)
P06 publication ─► public activation (NOT AUTHORIZED, out of MC-19 internal scope)
```

Dependency rules preserved from ENGINE-01/ENGINE-06: no dependent task starts early; one
writer per checkout; implementation, verification and review have separate owners; a failed
verification or review does not unlock delivery; repair is capped at two attempts.

## 4. Sequencing constraints

1. **T01 before T02.** The Master Prompt decides whether MC-19 is 3 audience pages, 9
   MC-15-aligned pages, or a different split.
2. **T02 before T03/T04.** The owners route/entity and the solution-page boundary must be
   recorded before copy or components are authored.
3. **T03 before T04.** The bilingual content contract and evidence registry are inputs, not
   afterthoughts; MC-18 proved that retrofitting provenance is costly.
4. **T05 parallel with T04.** Datasets, validator and adversarial mutations can be built
   from the approved contract while the page components are implemented.
5. **T06 after T04 and T05.** Verification measures the frozen implementation; it cannot
   certify an in-flight change.
6. **T07 after T06.** The reviewer must not be the implementer and must inspect the real
   diff and content-bound evidence.
7. **T09 only after P03 and P06.** Enquiry/lead flows are a separate authorized scope; they
   must not be smuggled into the page milestone.

## 5. Reopening conditions

| Scope                                 | Reopens when                                                       |
| ------------------------------------- | ------------------------------------------------------------------ |
| Option A (internal audience pages)    | P01, P02 and P10 close; P03 remains closed for enquiry flows.      |
| Option B (MC-15-aligned pages)        | Option A conditions plus a page-ownership decision against MC-20–23. |
| Option C (enquiry/lead flows)         | P03 and P06 close; P04/P05/P07/P08/P09 close before public activation. |
| Public indexation of any MC-19 page   | P06, P07, P08 and P09 close plus a real release authorization record. |

## 6. Inherited debt (must remain visible)

```text
FINANCIAL_V18 = INHERITED_OPEN
MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED
MC13_F05 = OPEN
MC13_F11 = OPEN
MC13_F14 = OPEN
MC15_GSC01 = OPEN
MC15_GSC02 = OPEN
```

No inherited item is closed by this proposal. `npm run test:financial` remains the known
inherited red gate (V-18) and is not reported as green.
