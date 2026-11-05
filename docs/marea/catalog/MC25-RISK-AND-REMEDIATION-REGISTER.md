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

## 1b. Independent-audit findings and disposition

Auditor A (Claude Sonnet 5.5, static review) and Auditor B (DeepSeek V4-Pro,
executed attacks) findings are recorded in `MC25-INDEPENDENT-AUDIT.md`. Summary:

| ID | Severity | Disposition |
| --- | --- | --- |
| AUD-01 | MAJOR | FIXED — target-less tokens are `unverifiedAdditions`; never verified |
| AUD-02 | MINOR | FIXED — `FROM_BUNDLE_IS_TARGET_CONTEXT` note surfaced |
| AUD-03 | MAJOR | FIXED — verdict derived from the decision, not hardcoded |
| AUD-04 | MINOR | FIXED — facts computed from the matrices; bundle orderability derived |
| AUD-05 | MAJOR | FIXED — `.gitattributes` pins the contract JSONs to LF |
| AUD-06 | MINOR | FIXED — MC-25 runner stages are required |
| AUD-07 | MINOR | FIXED — total, sanitising request handling |
| AUD-08 | MINOR | FIXED — `applied: false` on every transition result |
| AUD-09 | NIT | ACCEPTED — inherited loopback preview CSP (`RES-MC25-07`) |
| AUD-10 | NIT | NOT APPLICABLE — `dist/` is gitignored, not delivered |
| F-01 | NIT | FIXED — comment corrected (freeze, not strict mode, is the defence) |
| F-02 | NIT | ACCEPTED — documented test-only combinator (`RES-MC25-08`) |
| F-03 | NIT | FIXED via AUD-03 |
| F-04 | NIT | DOCUMENTED — invocation contract for the inherited validator |
| F-05 | TRANSPARENCY | ACKNOWLEDGED — evidence regeneration is the documented mechanism |

## 1c. Findings raised by the author's own probing during implementation

| ID | Finding | Disposition |
| --- | --- | --- |
| SELF-01 | The verdict badge was originally hardcoded; the author found it before delivery and the audit independently raised it as AUD-03 | CLOSED by the AUD-03 fix |
| SELF-02 | `deepFreeze` skipped already-frozen top-level arrays (INH-02) | CLOSED, test `t1` |

## 2. Residual risk accepted in this milestone

| ID | Risk | Why accepted | Mitigation |
| --- | --- | --- | --- |
| RES-MC25-01 | Prose upgrade-path additions ("customer records and exports") cannot be structurally validated | The MC-08 contract writes them as free text; inventing structure would fabricate meaning | They are surfaced as `textualAdditions` and never counted as verified relationships |
| RES-MC25-02 | The claim guard is a heuristic and cannot enumerate natural language | Inherited MC-22/MC-24 limitation, unchanged | Guard remains a backstop; copy reviewed manually; no commercial claim shipped |
| RES-MC25-03 | Six MC-23 files remain unformatted (`bundle-comparison-table.ts`, `bundle-upgrade-selector.ts`, `bundle-comparison.ts`, `bundle-upgrade-paths.ts`, `section-bundles.ts`, `bundle-preview.ts`) | Explicit instruction not to absorb the reformat into a feature diff | Verified identical to baseline with `prettier --check`; `format:check` still reports exactly those six files |
| RES-MC25-04 | No screen-reader or assistive-technology testing | Out of the available tooling; claiming it would be false | axe-core + keyboard E2E recorded; manual AT verification preserved as debt |
| RES-MC25-05 | No professional English copy review | Outside the milestone | Bilingual parity machine-checked; professional review preserved as debt |
| RES-MC25-06 | There is no durable approval audit trail | No authorized persistence contract exists; creating one would be an unauthorized commercial backend | Every mutation is refused; the audit draft is explicitly `NOT_PERSISTED` |
| RES-MC25-07 | The preview CSP allows `'unsafe-inline'` for script/style | Inherited loopback-only preview configuration; a nonce pipeline is outside this milestone | Loopback binding + Host allow-list + no public route; the surface renders no third-party content |
| RES-MC25-08 | `combinePrerequisites` is exported and can return `orderable: true` for a hand-crafted array | It is a pure combinator used by the logic tests; the real engine takes one argument and no caller facts | Units `r5`, `t3` prove no real decision can be forged; the result is never surfaced as a commercial decision |

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
