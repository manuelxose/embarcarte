# MC-22 — Independent audit record

Three external static audits + one internal AgentTeams review. Every finding was reproduced by the
captain by executing the guard module (not taken on the auditor's word).

## 1. External audit round 1 (STATIC REVIEW, shell denied)

- Auditor: `subagent_claude_code` (claude-sonnet-5-5), separate context, SHELL_ACCESS denied → STATIC REVIEW.
- Verdict: **NEEDS_REVISION**, BLOCKER **XA22-01**.
- Captain reproduced by executing `scripts/mc20-catalog-guards.mjs`: **15/15** prohibited-claim bypasses
  (autonomy, certification, sea-trial, dimension, SLA and price paraphrases).

## 2. Repair 1 (t9)

Negator re-scoping (strong/weak/post negation), PILOT autonomy + DISPLAY dimension vocabulary, DISPLAY
self-contradiction removed, FLEET VERIFIED_REPO overstatement + billing unit removed, PILOT E-stop
labelling, `BASE_COMMIT=1dc9aa0`, self-validating MC21-08 gate cross-check, duplicate MC20-33 removed.
Captain re-executed: **15/15 rejected, 6/6 honest disclaimers allowed**.

## 3. External audit round 2 (STATIC REVIEW, shell denied)

- Verdict: **NEEDS_REVISION**, **26 defects** — 14 false negatives ("is fully autonomous", "is certified",
  "has completed sea trials", "ha obtenido la aprobación regulatoria", "Pantalla de siete pulgadas", …)
  and 12 false positives (honest disclaimers wrongly rejected).
- Captain executed all 26: **all 26 confirmed wrong**.

## 4. Internal review round 1 (AgentTeams, deepseek-v4-pro)

- Task t7. Verdict **needs_revision**, 3 HIGH + 1 LOW:
  - **F1** (HIGH) — `fleet-hardware-included` missed the copula/verb forms "hardware está/viene/es incluido".
  - **F2** (HIGH) — `sea-trial` ES alternative missed the preterite "se completaron / se realizaron".
  - **F3** (HIGH) — the delivery was entirely uncommitted (HEAD == base); evidence not content-bound.
  - **F4** (LOW) — stale validator count in the report (57 vs 56).

## 5. Repair 2 (t12)

Structural negation-model rewrite (strong/weak/post negation, clause boundaries, coordination handling),
completed the PILOT autonomy + DISPLAY dimension vocabularies, spelled-out sizes uno..cincuenta /
one..fifty, hardware copula forms, sea-trial verb-then-noun. Captain verified **61/61**.

## 6. External audit round 3 (STATIC REVIEW, shell denied)

- Verdict: **NEEDS_REVISION narrow** — **XC22-01** dead cd/m² alternative, **XC22-02** negation scope
  leaking across and/y/yet, **XC22-03** unscoped post-negation, **XC22-04** five honest disclaimers
  wrongly rejected, **XC22-05** price strings passing. Captain reproduced all **15** cases as wrong.
- The same audit **confirmed the shipped DISPLAY/PILOT/FLEET content is clean and canonical**.

## 7. Repair 3 (bounded, t21)

Predicate-scoped strong negation (coordination + finite verb), adjacent weak negators, clause-anchored
post-negation (contractions, prohibited/excluded, colon lists, Spanish elision), price coverage, cd/m² fix,
plus the independent-verification residuals RES-01..03. Captain verified **82/82** accumulated cases.

## 8. Binding verification and review

- Verification r2 (t13): PASS on `8f5b14b` (26-case matrix 0 mismatches; round-1 no regression).
- Verification r3 (t22): PASS on `450441d` (72-case accumulated matrix 0 mismatches; RES-01/02/03 closed).
- Review r2 (t23): **PASS** on `ae1e431` — fresh 41-case adversarial matrix 0 mismatches; six gates
  re-measured green; product truth traced to canonical data; negation model judged principled.

## 9. Documented residual limits (accepted, LOW, none in shipped content)

- **RES-01** "PILOT steers the boat automatically." — closed by r3.
- **RES-02** "Pantalla de sesenta pulgadas." / "Screen of sixty inches." — closed by r3.
- **RES-03** "El hardware se incluye." — closed by r3.
- **RES-04** "Certificado NMEA 2000." — accepted (unbounded phrase space).
- **RES-05** "Aprobación CE obtenida." — accepted.
- **RES-06** "PILOT operates without a skipper." — accepted.
- **RES-A..D** (review r2): "sail itself"/"self-piloting", "NMEA 2000 approved"/"CE marked", hyphenated
  "1200-nit"/"candela", "order now"/"contact us for a quote" — accepted.

These are paraphrases in the **unbounded phrase space** of the guard, which is documented as a
**heuristic backstop, not a proof of absence**. The primary controls are the canonical-data cross-checks
(which read the source JSON directly) and reviewed content. No current content contains any of them.

## 10. Final outcome

`MC22_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE`; milestone `MC22_VERDICT = PARTIAL` (external
legal/commercial authorisations remain BLOCKED/NOT_GRANTED). No merge, deployment, publication,
indexation, price, SKU, certification, compatibility or SLA claim was introduced.
