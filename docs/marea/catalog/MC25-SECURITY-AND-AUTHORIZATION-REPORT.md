# MC-25 security and authorization test report

**Scope:** the internal SKU governance surface and its business logic.
**Method:** source inspection, validator assertions, adversarial unit tests,
direct business-logic invocation, Playwright E2E.

## 1. Threat model

| Threat | Control | Test |
| --- | --- | --- |
| Public reachability of an admin screen | loopback binding, Host allow-list, no public route, noindex | E2E, `MC25-12`, `MC25-13`, unit `c5` |
| UI-only protection (hidden/disabled button) | all mutations decided in `admin-authorization.ts` | unit `a2`–`a6`, `MC25-10`, `MC25-11` |
| Forged principal with a verified mechanism | persistence-contract check still refuses | unit `a3`, `MC25-10` |
| Direct invocation of the review workflow | `submitReviewAction` refuses identically | unit `a6`, E2E review test |
| Approve/order/publish without a backend | actions prohibited by invariant, for every principal | unit `a2`, validator `MC25-10` |
| Forged readiness evidence | one-argument engine, frozen snapshot, no injection | unit `t1`–`t3`, `r5`, `MC25-16` |
| Registry mutation at runtime | recursive freeze, private indexes | unit `t1`, `t2`, validator `MC25-16` |
| Unknown identity treated as valid | allow-list resolution → `UNKNOWN_IDENTITY` | unit `i5`, `r4` |
| NOT_APPLICABLE treated as approval | permitted-N/A allow-list | unit `r6`, validator `MC25-07` |
| Stale approval / evidence | SHA-256 provenance recomputed by validator | `MC25-08`, unit `c2` |
| Unknown edition read as exclusion | typed lookup | `MC25-15`, unit `f15-*` |
| External calls or data collection | no network/storage/email in the modules | `MC25-13`, unit `c4` |

## 2. Authorization matrix (executed)

`authorizeAdminAction(action, principal)`:

| Principal | INSPECT_READINESS | REQUEST_EVIDENCE | MARK_ORDERABLE |
| --- | --- | --- | --- |
| `CURRENT_PRINCIPAL` (anonymous, mechanism NONE) | allowed, read-only | refused `NO_VERIFIED_AUTHORIZATION_MECHANISM` | refused `ACTION_PROHIBITED_BY_INVARIANT` |
| Forged `PROGRAMME_LEAD` + `VERIFIED_SESSION` | allowed, read-only | refused `NO_AUTHORIZED_PERSISTENCE_CONTRACT` | refused `ACTION_PROHIBITED_BY_INVARIANT` |
| Unknown action (`DELETE_SKU`, `ORDER`, `''`, `null`) | — | — | refused `UNKNOWN_ACTION` |

The forged-principal row is the important one: even if a future session mechanism
were introduced, a mutation still cannot be applied because no authorized
persistence contract exists. `APPROVAL_PERSISTENCE_CONTRACT` is the literal
`'ABSENT'` and `AUTHORIZATION_FACTS.verifiedMechanisms = 0`.

## 3. Direct invocation results

`submitReviewAction` was invoked 14 times: 7 actions × 2 principals
(real + forged). Result:

```text
applied          = false    (14/14)
persisted        = false    (14/14)
durableApproval  = false    (14/14)
auditDraft       ends with ':NOT_PERSISTED' (14/14)
```

The UI path is the same function, so there is no bypass by calling it from the
console, a test, or a future component.

## 4. Isolation evidence

| Fact | Evidence |
| --- | --- |
| Preview binds `127.0.0.1` | `preview/landing/server.ts`, E2E health response (`host: 127.0.0.1`) |
| Non-loopback Host → 403 | inherited allow-list (`server.ts`) |
| `X-Robots-Tag: noindex, nofollow, noarchive` | E2E asserts the header |
| `robots` meta + `marea-publication: NOT_AUTHORIZED` | E2E asserts the SSR HTML |
| No canonical/hreflang/OG/Twitter/JSON-LD | E2E asserts absence on both locales |
| No public route registration | validator `MC25-12`; unit `c5` checks production route tables and `LOCALIZED_ROUTES` |
| Production build contains no catalogue identifier | inherited `MC20-30` bundle scan (re-run after a production build) |

## 5. Honest limits

- The Windows ACL sandbox confines **writes**, not reads or network. This report
  makes no claim of read or network isolation.
- No secrets, canaries or personal data are used or stored by this surface.
- `auditDraft` is a string returned to the caller and is **not** written to any
  audit store; no approval audit trail exists to write to.
- Screen-reader and assistive-technology testing was **not run**; no WCAG
  conformance is claimed.
- The claim guard is a heuristic backstop; a green run is not proof that no
  invented claim exists.
