# MC-25 risk, remediation and residual-risk register

Status vocabulary: **CLOSED**, **OPEN**, **ACCEPTED**, **BLOCKED** (external).

## 1. Findings remediated in MC-25

| ID | Severity | Finding | Status | Evidence |
| --- | --- | --- | --- | --- |
| F-2 | low (inherited) | Upgrade-path comparison validated ids without validating the family↔edition↔inclusion relationship | **CLOSED** | `MC25-F2-F15-REMEDIATION-EVIDENCE.md` §1; validator `MC25-14`; unit `f2-1…f2-9` |
| F-15 | low (inherited) | `inclusionFor` returned `NOT_INCLUDED` for a nonexistent edition | **CLOSED** | `MC25-F2-F15-REMEDIATION-EVIDENCE.md` §2; validator `MC25-15`; unit `f15-1…f15-6` |
| INH-01 | medium (found in MC-25) | The MC-23 bundle preview was registered in the client route table but not in `app.routes.server.ts`, so it fell into the `**` 404 server route and answered 404 while rendering | **CLOSED** | `preview/landing/app.routes.server.ts`; validator `MC25-12` now compares both route tables for all four preview families |
| INH-02 | low (found in MC-25) | `deepFreeze` skipped already-frozen arrays, leaving the records inside `Object.freeze([...])` mutable | **CLOSED** | `governance-facts.ts` uses a `WeakSet` traversal; validator `MC25-16`; unit `t1` |
| INH-03 | low (found in MC-25) | The MC-24 build gate injected the negative binding by matching `marker>` only, so a component whose marker is followed by another attribute could not be tested | **CLOSED** | `check-mc24-build.mjs` counts and replaces the marker; MC-25 uses the gate with its own component |

No finding was closed by declaration. Each has a reproduction or a failing
control, a repair and a re-verification.

## 2. Residual risk accepted in this milestone

| ID | Risk | Why accepted | Mitigation |
| --- | --- | --- | --- |
| RES-MC25-01 | Prose upgrade-path additions ("customer records and exports") cannot be structurally validated | The MC-08 contract writes them as free text; inventing structure would fabricate meaning | They are surfaced as `textualAdditions` and never counted as verified relationships |
| RES-MC25-02 | The claim guard is a heuristic and cannot enumerate natural language | Inherited MC-22/MC-24 limitation, unchanged | Guard remains a backstop; copy reviewed manually; no commercial claim shipped |
| RES-MC25-03 | Six MC-23 files remain unformatted (`bundle-comparison-table.ts`, `bundle-upgrade-selector.ts`, `bundle-comparison.ts`, `bundle-upgrade-paths.ts`, `section-bundles.ts`, `bundle-preview.ts`) | Explicit instruction not to absorb the reformat into a feature diff | Verified identical to baseline with `prettier --check`; `format:check` still reports exactly those six files |
| RES-MC25-04 | No screen-reader or assistive-technology testing | Out of the available tooling; claiming it would be false | axe-core + keyboard E2E recorded; manual AT verification preserved as debt |
| RES-MC25-05 | No professional English copy review | Outside the milestone | Bilingual parity machine-checked; professional review preserved as debt |
| RES-MC25-06 | There is no durable approval audit trail | No authorized persistence contract exists; creating one would be an unauthorized commercial backend | Every mutation is refused; the audit draft is explicitly `NOT_PERSISTED` |

## 3. Inherited debt preserved (not reinterpreted)

| Item | Status | Note |
| --- | --- | --- |
| `FINANCIAL_V18` | OPEN | Pre-existing validator-state debt; the financial gate is outside MC-25 |
| `MC16_FINAL_02` | OPEN | Unchanged |
| MC-13 F-05 / F-11 / F-14 | OPEN | Unchanged |
| MC-15 GSC-01 / GSC-02 | OPEN | Search Console operational debt |
| DEC-04 AIS decoder licensing | BLOCKED | External rights decision |
| HUB hardware selection | BLOCKED | No supplier selection |
| Zero tested compatibility rows | OPEN | `ELIGIBLE_SELF_INSTALL` remains unreachable; MC-25 does not alter the configurator |
| Professional English review | OPEN | Not performed |
| Manual WCAG / assistive technology verification | OPEN | Not performed |
| MC-19 AC08 | OPEN | Unchanged |
| Shared validator naming debt | OPEN | Unchanged |
| Heuristic claims-guard limitations | OPEN | Unchanged |

No inherited failure is hidden and no inherited gate was weakened. The MC-23
F-2/F-15 pair moves from OPEN to CLOSED with the evidence above; the MC-24
register remains the historical record of their state at MC-24.

## 4. External gates (BLOCKED, unchanged)

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE          = NO_GO
SOURCE_IP_CLEARANCE       = NOT_CLEARED
LICENSING_RIGHTS_GRANTED  = false
PRICE_APPROVED            = NONE
COMMERCIAL_AVAILABILITY   = NOT_FOR_SALE
PUBLICATION_AUTHORIZED    = false
INDEXATION_AUTHORIZED     = false
PRODUCTION_DEPLOYMENT     = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA     = BLOCKED
PILOT_SAFETY_GATE         = BLOCKED
```

These are not risks MC-25 can close; they are the reason the global verdict stays
`PARTIAL`.
