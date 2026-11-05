# MC-22 — Executed dependency DAG

## 1. Genuinely parallel read-only discovery

Three read-only tasks ran in parallel at the start (no writes):

| Task | Owner | Deliverable |
| --- | --- | --- |
| t1 | architecture (role A) | Authoritative scope, dependency DAG, architecture inventory, acceptance contract |
| t2 | product (role B) | Canonical product truth, safety limitations, licensing provenance for DISPLAY/PILOT/FLEET |
| t3 | assurance (role E/F) | Security, publication-isolation and legal-gate analysis; validator/guard hardening design |

## 2. Single-writer sequential gate chain (one writer per step)

```
t1,t2,t3  (parallel, read-only)
   └─► t4  implementation  — extend catalogue to 9 families / 26 editions / 18 routes (deps t1,t2,t3)
         └─► t5  implementation — validator/guard hardening, adversarial suite, 18-route E2E (deps t4)
               └─► t6  verification — full suite (deps t4,t5)
                     └─► t7  review r1 — needs_revision (F1–F4)
                           └─► t9  repair r1 (deps t6)
                                 └─► t10 verification r1 (deps t9)
                                       └─► t12 repair r2 (deps t10)
                                             └─► t13 verification r2 (deps t12)
                                                   └─► t21 repair r3 (deps t13)
                                                         └─► t22 verification r3 — binding (deps t21)
                                                               └─► t23 review r2 — binding PASS (deps t22)
                                                                     └─► t24 documentation — product-truth set (deps t23)
                                                                           └─► t25 governance documentation (deps t24)
```

Every implementation/repair/verification/review step is strictly sequential: one writer in one checkout
(ENGINE-03 one-writer rule). Parallelism was only ever used for read-only discovery.

## 3. Cancelled duplicate repairs (one-writer rule)

The native quality loop auto-created two repair tasks after review round 1. Both were cancelled by the
captain before any work was done:

- **t14** — "repair r2 fixes t7" (auto-created): cancelled as a **duplicate** of the stricter, already-live
  t12 repair.
- **t19** — "repair r2 fixes t7" (auto-created after t7 was re-run): cancelled for the same reason.

Reason for cancellation: a second writer in the same checkout would violate the one-writer rule
(ENGINE-03). No finding was dropped; both were superseded by the live repair (t12), not abandoned.
The auto-created review companions (t15, t20) and the documentation tasks they gated (t8, t11, t16, t17,
t18) were likewise cancelled/superseded and re-issued with correct dependencies.

## 4. Three external static audits

Three external audits were run **outside** the AgentTeams task list, by the `subagent_claude_code`
product at `claude-sonnet-5-5`, each in a separate context with `SHELL_ACCESS` **denied** (STATIC REVIEW
only — no execution, no dynamic testing):

1. **Audit round 1** — NEEDS_REVISION, BLOCKER XA22-01; captain reproduced 15/15 prohibited-claim bypasses.
2. **Audit round 2** — NEEDS_REVISION, 26 defects (14 false negatives + 12 false positives); captain
   executed all 26 and confirmed all 26 wrong.
3. **Audit round 3** — NEEDS_REVISION narrow, XC22-01..XC22-05 (15 cases); captain reproduced all 15 as
   wrong; the same audit confirmed the shipped DISPLAY/PILOT/FLEET content is clean and canonical.

## 5. Non-binding early verification

Verification t6 and t10 returned PASS verdicts but are **NON-BINDING**: AgentTeams detected the workspace
changed while each verdict was forming (content drift across repair rounds). The binding evidence is the
post-repair verification on the committed revision (t22 on `450441d`) and the binding review (t23 on
`ae1e431`). This is stated explicitly rather than treating t6/t10 as sound delivery evidence.
