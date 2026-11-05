# MC-24 — Risk and inherited-debt register

**Milestone:** MC-24 — Compatibility configurator and quotation triage
**Branch:** `feature/marea-mc24-configurator`
**Status vocabulary:** `OPEN` · `CLOSED_VERIFIED` · `PARTIAL` · `BLOCKED_EXTERNAL`

This register never marks an item closed without reproducible evidence. A status
change requires a command and a result recorded in this file or in the delivery
record.

## 1. MC-24 findings addressed in this milestone

| ID | Severity | Finding | Status | Evidence | Owner |
| --- | --- | --- | --- | --- | --- |
| F-01 | medium | `scripts/mc20-catalog-guards.mjs` — `positive-availability` missed the bare availability predicate in either Spanish word order (`disponible ya`, `ya disponible`, `ya está disponible`) and the English `now available` / `available now`. Reproduced before the fix. | **CLOSED_VERIFIED** | Reproduced (`PASSES`) pre-fix; after the pattern extension all 4 variants are rejected and 6 legitimate negations still pass. Check `MC24-11`. | MC-24 (shared-safety scope) |
| F-02 | medium | `scripts/mc20-catalog-guards.mjs` — `positive-guarantee` matched only the first-person `garantizamos`, so the participle forms `garantizado` / `soporte garantizado` / `garantizada` / `guaranteed` bypassed the guard. Reproduced before the fix. | **CLOSED_VERIFIED** | Reproduced (`PASSES`) pre-fix; after the pattern extension `garantizad[oa]s?`, `garantiza…` and `guaranteed` are rejected while `sin garantizar`, `No garantizamos`, `Ningún resultado está garantizado`, `Compatibility is not guaranteed` still pass. Check `MC24-11`. | MC-24 (shared-safety scope) |
| F-16 | medium | **New in MC-24.** `display-dimension` matched the inch-mark branch against an HTML attribute quote, so a page containing `aria-label="MC-24"` or `[level]="2"` was rejected as a physical dimension claim. This is a false-positive class that would block any template-bearing file from the catalogue guard. | **CLOSED_VERIFIED** | After the fix: `aria-label="MC-24"`, `[level]="2"` and `[heading]="…" [level]="2"` pass; `24"`, `10 "`, `7 pulgadas` and `120 mm` are still rejected. Check `MC24-10` and the adversarial suite. | MC-24 (shared-safety scope) |

**Why these were in MC-24 scope.** The configurator introduces new customer-facing
claim-bearing copy, so it *depends on* the inherited MC-20 claims guard: an
unremediated F-01/F-02 would let the new content ship an inferred commercial
claim. The three items above are a bounded shared-safety remediation, not an
unrelated refactor. No other guard rule was changed.

## 2. Inherited MC-23 findings

| ID | Severity | Finding | MC-24 status | Resolution path |
| --- | --- | --- | --- | --- |
| F-2 | low | Upgrade-path comparison validates edition ids without sufficiently validating the full relationship. Reproduced on this branch: `bundle-upgrade-paths.ts` compares by id. | **OPEN — not in MC-24 scope** | MC-25 (SKU readiness and catalog governance) owns bundle/edition relationship integrity; it must promote the id comparison to a full family↔edition↔inclusion relationship check with adversarial tests. |
| F-15 | low | `inclusionFor` returns `NOT_INCLUDED` for an edition that does not exist, instead of distinguishing "unknown edition" from "not included". Reproduced on this branch. | **OPEN — not in MC-24 scope** | MC-25, together with F-2. The configurator does not call `inclusionFor`, so no MC-24 result depends on the defect. |

Both remain **recorded and reproducible** on the delivered branch (check `MC24-13`).
They are not silently dropped.

## 3. Inherited programme debt (status preserved, not reinterpreted)

| Item | Status | Note |
| --- | --- | --- |
| `FINANCIAL_V18` | OPEN — pre-existing gate failure | Unchanged by MC-24; the financial gate is outside this milestone. |
| `MC16_FINAL_02` | OPEN | Unchanged. |
| MC-13 F-05 / F-11 / F-14 | OPEN | Unchanged. |
| MC-15 GSC-01 / GSC-02 | OPEN | Search Console operational debt; MC-24 registers no sitemap entry. |
| DEC-04 AIS licensing | BLOCKED_EXTERNAL | Unchanged. |
| HUB hardware selection | BLOCKED_EXTERNAL | Unchanged. |
| Zero verified compatibility rows | CONFIRMED — 0 `TESTED` rows | **Directly determines MC-24 behaviour:** `VALIDATED_SELF_INSTALL_RULES` is empty, so `ELIGIBLE_SELF_INSTALL` is unreachable. |
| Professional English review | OPEN | The MC-24 EN copy is engineering-authored and has **not** had professional review. |
| Manual WCAG 2.2 AA / assistive-technology testing | OPEN — automated only | MC-24 runs browser-based axe and keyboard tests; **screen-reader testing is NOT_RUN**. No WCAG conformance is claimed. |
| MC-19 AC08 | OPEN | Unchanged; MC-19 is not an MC-24 dependency. |
| Shared validator naming debt | OPEN | Unchanged. |
| Heuristic claims validation limitation | **OPEN BY DESIGN** | The keyword guard is a supporting control, never a proof of absence. See §4. |

## 4. Known limitations of the heuristic claims validation

The guard is a **heuristic backstop, not an exhaustive validator**. This milestone
does not claim that the keyword rules cover all natural-language commercial
assertions, and it does not claim that a clean guard run proves the absence of an
invented claim. Concretely:

1. The rules match enumerated phrasings plus the tested variants. Paraphrase space
   is unbounded; an unseen wording can still pass. MC-22 documented this (RES-04..06);
   MC-24 does not close it and does not claim to.
2. The negation heuristic is clause-scoped and deliberately fails closed on
   ambiguity, but a negator outside the scope window is not detected.
3. Extending a pattern trades a bypass for a possible false positive. F-16 shows a
   real false-positive class that existed undetected; the fix narrows the inch-mark
   branch to a discriminator that still rejects genuine `24"` claims.
4. The primary controls remain: the typed content contract, the generated
   contract-derived projection with its `--check` drift gate, and human content
   review.

## 5. MC-24 residual risks

| ID | Risk | Severity | Mitigation in this milestone | Residual status |
| --- | --- | --- | --- | --- |
| R-01 | The `ELIGIBLE_SELF_INSTALL` path is implemented but unreachable, so it is not exercised by production traffic. | low | Proved unreachable by `MC24-02`; the branch is unit-tested for determinism. A future `TESTED` row must add a validated rule plus its own regression test. | OPEN — accepted |
| R-02 | Quotation triage classifies but cannot produce a real quotation; there is no survey, no terms and no seller identity. | medium | The UI states no quotation/price is produced; `quotationProvided/priceProvided/orderable` are typed `false`. | BLOCKED_EXTERNAL |
| R-03 | The configurator copy is engineering-authored ES/EN. | medium | ES/EN parity is structurally enforced; professional translation and English review are outstanding. | OPEN |
| R-04 | Accessibility evidence is automated (axe + keyboard), not assistive-technology. | medium | Reported honestly as NOT_RUN for screen readers; no conformance claimed. | OPEN |
| R-05 | The configurator is an internal preview only. | low | No public route, noindex, no sitemap; production bundle carries 0 catalogue identifiers. | BY DESIGN |

## 6. External authorisation gates (unchanged)

```text
TRADEMARK_LEGAL_CLEARANCE   = NOT_GRANTED
MAREA_PUBLIC_USE            = NO_GO
SOURCE_IP_CLEARANCE         = NOT_CLEARED
LICENSING_RIGHTS_GRANTED    = false
PRICE_APPROVED              = NONE
COMMERCIAL_AVAILABILITY     = NOT_FOR_SALE
PUBLICATION_AUTHORIZED      = false
INDEXATION_AUTHORIZED       = false
PRODUCTION_DEPLOYMENT       = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA       = BLOCKED
```

MC-24 changes none of these and does not reinterpret internal success as external
approval.
