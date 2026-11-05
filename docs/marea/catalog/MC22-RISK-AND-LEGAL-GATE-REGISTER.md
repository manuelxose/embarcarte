# MC-22 — Risk and legal-gate register

## 1. Ten governance gates (verbatim)

All ten remain **open**; every external authorisation is **BLOCKED** / **NOT_GRANTED**. None is CLOSED.

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA = BLOCKED
```

These are byte-identical to the base commit `1dc9aa0` (verified by `git show` and the validator's MC21-08
cross-check).

## 2. Release gates (MC-14 register)

`docs/marea/legal-commercial/data/release-evidence-gates.json` records **13** release gates, **0 closed**
(12 `BLOCKED` + 1 `EVIDENCE_REQUIRED`). `GATE-SAFETY-PILOT = BLOCKED` keeps PILOT unsellable.
24 required documents, 0 executed.

## 3. Inherited debt register (carried forward, unchanged by MC-22)

| Debt | State | Notes |
| --- | --- | --- |
| `test:financial` V-18 | **FAIL (inherited)** | exit 1, 76/77 — "No MC-14 execution". Pre-existing, unrelated to MC-22. |
| Manual WCAG 2.2 AA + assistive-technology review | NOT_RUN (inherited) | manual a11y/AT debt carried from earlier milestones. |
| External legal clearance / certification / licences / insurance / prices | NOT_GRANTED / NONE | all external authorisations remain blocked (the ten gates). |
| Trademark clearance | NOT_GRANTED | MAREA remains a proposed brand; no ® symbol, no public brand use. |

## 4. Residual control limits (accepted by captain decision)

The prohibited-claim guard is a **heuristic backstop, not a proof of absence**. Its residual limits
(RES-01..06, RES-A..D) are documented in `MC22-INDEPENDENT-AUDIT.md` §9 and
`MC22-SECURITY-AND-ISOLATION-EVIDENCE.md` §8. The captain recorded that **no fourth repair round** is
opened for RES-04/05/06: each round closed its disclosed set and the next independent probe found more
(15 → 26 → 5 → 3 → 3), so continuing is an unbounded loop with diminishing value. The primary controls
are the canonical-data cross-checks and reviewed content (three independent audits + one internal review
all confirmed the shipped content is clean and canonical). A future milestone should replace or extend the
phrase-list approach with a semantic check — **not MC-23 scope**.
