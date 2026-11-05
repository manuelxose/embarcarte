# MC-25 internal administration experience

**Surface:** `internal/catalog/sku-governance` (ES) and
`en/internal/catalog/sku-governance` (EN), isolated loopback preview only.
**Component:** `src/app/marea-catalog/sections/section-sku-governance.ts`
**Host:** `preview/landing/governance-preview.ts`

## 1. What an internal reviewer can do

| Capability | Implementation |
| --- | --- |
| Inspect canonical catalogue entries | family selector → edition selector, both contract-derived (9 families, 26 editions) |
| See readiness states | ten-prerequisite matrix with status badge and reason per row |
| Inspect unresolved blockers | per-SKU MC-02 table: id, register status, closure owner, required evidence |
| Review evidence provenance | contract id, version and SHA-256 digest for the six contracts the decision reads |
| Identify missing commercial prerequisites | ordered `missingPrerequisites` list |
| Examine lifecycle eligibility | derived internal state + every evaluated transition with its refusal code |
| Understand why an item cannot be sold | eight named refusal reasons for the default edition, each tied to a prerequisite and blockers |
| Attempt a review action | two actions, evaluated in business logic and **refused** |

## 2. What it deliberately cannot do

- It cannot approve a merchant SKU, mark a SKU orderable or publish anything:
  those actions are `PROHIBITED_ADMIN_ACTIONS` and refused for every principal.
- It cannot persist a review note, evidence request or decision: no authorized
  persistence contract exists (`APPROVAL_PERSISTENCE_CONTRACT = 'ABSENT'`).
- It cannot compute, display or accept a price, a stock quantity or a merchant
  SKU code.
- It cannot collect customer data, personal data or an email address; it renders
  no form that submits anywhere.

## 3. Fail-closed actions

`scripts/.../admin-authorization.ts` is the only action surface:

| Action | Read-only | Decision today |
| --- | --- | --- |
| `INSPECT_READINESS` | yes | allowed (`READ_ONLY_ALLOWED`) |
| `EVALUATE_READINESS` | yes | allowed (`READ_ONLY_ALLOWED`) |
| `REQUEST_EVIDENCE` | no | refused `NO_VERIFIED_AUTHORIZATION_MECHANISM` for the real principal; `NO_AUTHORIZED_PERSISTENCE_CONTRACT` for a forged verified principal |
| `RECORD_REVIEW_DECISION` | no | same |
| `APPROVE_MERCHANT_SKU` | no | refused `ACTION_PROHIBITED_BY_INVARIANT` |
| `MARK_ORDERABLE` | no | refused `ACTION_PROHIBITED_BY_INVARIANT` |
| `PUBLISH_SKU` | no | refused `ACTION_PROHIBITED_BY_INVARIANT` |

`submitReviewAction` returns `applied: false`, `persisted: false`,
`durableApproval: false` and an `auditDraft` ending in `NOT_PERSISTED` for every
action and every principal. The UI calls the same function the tests call
directly, so disabling a button in the template would change nothing.

## 4. Accessibility of the screen

- One `<h2>` section heading; `<h3>`/`<h4>` below it, no heading level skipped.
- Native `<label for>` + `<select>` for both selectors, 44px minimum height.
- Every table has a `<caption>`, `th[scope="col"]` headers and `th[scope="row"]`.
- Wide matrices scroll inside a labelled, keyboard-focusable
  `role="region"` (`tabindex="0"`) so the document never overflows at 320px.
- Status is text + icon + shape-coded badge, never colour alone.
- Review refusal is announced through a `role="status" aria-live="polite"`
  region.
- Skip link to the main content on focus.
- axe-core (`@axe-core/playwright`) reports 0 critical/serious violations on both
  locales, before and after a review action.
- Keyboard operation is exercised by E2E (selectors, skip link, buttons).

**Not claimed:** screen-reader testing and WCAG conformance were not performed.
Automated axe plus keyboard E2E is the evidence available; manual assistive
technology verification remains inherited debt.

## 5. Security posture of the surface

| Control | Implementation | Evidence |
| --- | --- | --- |
| Loopback binding | `server.ts` binds `127.0.0.1` only | source + E2E |
| Host allow-list | non-loopback `Host` → 403 | `server.ts`, inherited control |
| Noindex | `X-Robots-Tag` + `name="robots"` meta | E2E asserts both |
| No public route | path absent from production route tables | validator `MC25-12`, unit `c5` |
| No structured data | no canonical/hreflang/OG/JSON-LD | E2E |
| No external calls | no fetch/HttpClient/XHR/storage in the modules | validator `MC25-13`, unit `c4` |
| CSP | inherited preview CSP with `form-action 'none'` | `server.ts` |

The surface is not protected by a hidden button, a disabled attribute or CSS.
Direct invocation of the business logic is the tested attack, and it is refused.
