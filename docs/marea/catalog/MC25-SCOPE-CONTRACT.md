# MC-25 scope contract — SKU readiness and catalogue governance

**Milestone:** MC-25 — "SKU readiness and catalog governance in admin/commerce"
**Dependencies:** MC-16, MC-20, MC-21, MC-22, MC-23, MC-24 (all verified at their delivered heads)
**Expected deliverable (registry):** "Admin workflow + lifecycle enforcement"
**Acceptance rule (registry, controlling):** "No orderable SKU without complete
lifecycle/price/stock/compliance; MC-02 blockers referenced per SKU."

This milestone does **not** invent an alternative acceptance rule. Every criterion
below is traceable to that sentence or to an explicit instruction in the MC-25
execution brief.

## 1. Baseline this contract is built on

| Fact | Value | Verified how |
| --- | --- | --- |
| MC-24 branch | `feature/marea-mc24-configurator` | `git branch --list`, `git ls-remote` |
| MC-24 draft PR | #31, OPEN, DRAFT, MERGEABLE | `gh pr view 31` |
| MC-24 head | `c4d9d76245770a69f765024f07426fe82b24d56c` | `git ls-remote --heads origin` |
| MC-24 base | `feature/marea-mc23-integration` at `7ed6ae6` | PR #31 |
| MC-23 preservation PR | #32, OPEN, DRAFT, not merged | `gh pr list` |
| MC-25 branch | `feature/marea-mc25-sku-governance` | created from `c4d9d76` |
| MC-25 worktree | `wt-mc25/governance` (ENGINE-03, single writer) | `parallel-dev.mjs create` |

The MC-24 delivery record previously named `ca186cd`. The remote PR head is one
commit later (`c4d9d76`), and that commit changes only
`docs/marea/catalog/MC24-DELIVERY-RECORD.md` and
`docs/marea/catalog/evidence/validator-run.json`. This was verified with
`git show --stat c4d9d76`; the inherited suites were re-run on `c4d9d76` rather
than trusting the earlier documentation evidence.

## 2. In scope

1. Canonical identity model separating product family, edition, bundle, internal
   catalogue identity, candidate commercial SKU and approved merchant SKU.
2. Internal governance lifecycle with explicit allowed transitions and rejection
   of every other pair.
3. Deterministic readiness engine with ten prerequisites and explicit refusal
   reasons, MC-02 blocker references and content-bound evidence provenance.
4. Internal administration experience (inspection + review intent) that fails
   closed in the business logic.
5. MC-02 blocker mapping per SKU, derived from the MC-16 register.
6. Canonical SKU identity and evidence model with SHA-256 contract digests.
7. Remediation of MC-23 F-2 (upgrade-path relationship integrity) and F-15
   (unknown edition vs commercial exclusion).
8. Generation, validation, adversarial unit tests, Angular build gate, E2E and
   accessibility automation.
9. Documentation set, Spanish executive report and MC-26 handoff inputs.

## 3. Out of scope (explicit non-goals)

- Any orderable, purchasable or publicly available SKU state.
- Prices, stock, merchant SKU codes, quotations, checkout or lead capture.
- A production approval backend, merchant registry or durable approval record.
- Public MAREA routes, sitemap entries, canonical/hreflang/JSON-LD for MAREA.
- Merge, deployment, publication, indexation or commercial activation.
- MC-26 (checkout and payments) is not started.
- Reformatting the six inherited unformatted MC-23 files. They remain declared
  debt; no MC-25 commit touches them.

## 4. Controlling invariants

| ID | Invariant | Enforcement |
| --- | --- | --- |
| INV-01 | Zero SKU may be orderable at this fact base | Exhaustive readiness matrix (26 editions, 26 candidates, 6 bundles) + frozen snapshot |
| INV-02 | A canonical edition is never an approved merchant SKU | Identity model; empty frozen merchant registry |
| INV-03 | No lifecycle state is orderable/sellable/published | Five-state vocabulary; prohibited names asserted |
| INV-04 | Every refusal names the failed prerequisite and its MC-02 blockers | `ReadinessDecision.refusalReasons` |
| INV-05 | NOT_APPLICABLE is not approval | Permitted-N/A allow-list; combination test |
| INV-06 | The fact snapshot cannot be mutated at runtime | Recursive freeze; push/assignment throw |
| INV-07 | Review mutations are refused in business logic, not the UI | `submitReviewAction` returns `applied: false` |
| INV-08 | The admin surface is not publicly reachable | loopback binding + Host allow-list + no public route + noindex |

## 5. Definition of done

- All acceptance criteria in `MC25-ACCEPTANCE-MATRIX.md` pass with recorded
  evidence.
- Real Angular preview **and** production builds succeed; the negative template
  binding is rejected by the compiler naming the injected member.
- `test:mc25` 20/20, `test:mc25:unit` 58/58, catalogue E2E green, inherited
  MC-20..MC-24 suites unchanged or stricter.
- Independent audit by a different model, with every BLOCKER/MAJOR closed and
  re-verified.
- Draft PR open, unmerged; no deployment, publication or indexation.

## 6. Verdict policy

`MC25_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE` only if every internal
criterion is implemented and independently verified. `MC25_VERDICT = PARTIAL`
because the external legal/commercial gates remain unresolved. If any internal
control cannot be implemented or verified, the verdict states the actual
`PARTIAL`/`BLOCKED` with precise evidence.
