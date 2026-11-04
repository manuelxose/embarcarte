# MC-19/36 — Independent audit record

| Field                     | Value                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Deliverable               | MC-19 independent implementation audit                                                                           |
| Audited scope             | `src/app/marea-segments/`, `preview/landing/`, `e2e/segments/`, `scripts/check-mc19-*`, MC-19 delivery documents |
| Base                      | `ba63baa0e529ab9cb482fd929632d359fec1d328`                                                                       |
| Implementation commit     | `cc3a62cb28da3a6c21dce16ee07580edb216debd`                                                                       |
| Round-1 correction commit | `102c6f14f313c96c7dd0a39212add5642a3cb5f8`                                                                       |
| Machine-readable record   | `data/mc19-implementation-review.json`                                                                           |
| Independence              | The auditors did not author the implementation and made no commits, pushes, merges or deployments                |

## 1. Method

Two independent agents reviewed the change. Neither wrote the code. Each was asked to inspect the real
diff and evidence rather than a summary, to check scope, architecture, MC-17 reuse, MC-18 preservation,
IA/identity correctness, bilingual consistency, security boundaries, legal-gate preservation,
accidental-publication risk, test evidence and the MC-20 boundary, and to report findings with
severity and a required fix.

| Round | Reviewer                                       | Access                                   | Verdict                      |
| ----- | ---------------------------------------------- | ---------------------------------------- | ---------------------------- |
| 1     | Claude Opus 5.5 (external specialist)          | Static (shell denied in its environment) | `NEEDS_REVISION`             |
| 2     | Independent native auditor (`deepseek-v4-pro`) | Full shell, ran the suites               | `NEEDS_REVISION`             |
| 3     | Re-verification request to the round-2 auditor | Full shell                               | Recorded in §5 after closure |

A third review attempt (Claude Code backup, round 2) failed at the product layer
(`invalid-result`, exit 1, tool permission denied) and produced no review; it is recorded here as a
tool failure, not as evidence.

## 2. Round 1 — findings and closure

Round 1 returned `NEEDS_REVISION` with 3 MAJOR and 13 MINOR/INFORMATIONAL findings. No BLOCKING
finding. Corrections are in commit `102c6f1`.

| ID    | Severity      | Finding                                                              | Status                                                                                        |
| ----- | ------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| IR-01 | MAJOR         | Documents claimed the review/acceptance before the artefacts existed | PARTIAL at round 2 — corrected again in this closure (AC-10/AC-12 pending, PASS not declared) |
| IR-02 | MAJOR         | MC-18 browser regression not run                                     | CLOSED — `test:landing:e2e` 44/44; `test:commerce-data` PASS                                  |
| IR-03 | MAJOR         | “Published matrix” overclaim in the professionals copy               | CLOSED — reworded; claim guard passes                                                         |
| IR-04 | MINOR         | Isolation evidence stored literals and scanned too little            | CLOSED — measured statuses; browser + server scan; 404 probe artefact                         |
| IR-05 | MINOR         | Validator evidence did not match the reviewed commit                 | CLOSED — evidence regenerated at the closure commit (see §5)                                  |
| IR-06 | MINOR         | Claim/monetary guard too narrow                                      | CLOSED — widened regex and symmetric phrases; adversarial tests                               |
| IR-07 | MINOR         | MC-20 boundary contradiction                                         | CLOSED — MC-19 pattern optional; batch-1 wording                                              |
| IR-08 | MINOR         | Preserved-artefact list inaccurate                                   | CLOSED — edited files moved to `updatedInPlace`; risk register v1.1.0                         |
| IR-09 | MINOR         | Supersession record accepted without validation                      | CLOSED — MC19-24 validates it                                                                 |
| IR-10 | MINOR         | “Derived server-side” readiness overclaim                            | CLOSED — “derived from canonical dimensions”                                                  |
| IR-11 | MINOR         | Bilingual wording drift                                              | CLOSED — pre-installation, co-owners, alternative route                                       |
| IR-12 | MINOR         | CSP documentation incomplete                                         | CLOSED — full policy + `unsafe-inline` disclosure                                             |
| IR-13 | MINOR         | Dead exports                                                         | CLOSED — removed; typecheck clean                                                             |
| IR-14 | MINOR         | Documentation citation/errata                                        | CLOSED — citations corrected; counts reconciled                                               |
| IR-15 | INFORMATIONAL | One-vessel operator ambiguity                                        | CLOSED — “on behalf of others” / individual owner split                                       |
| IR-16 | INFORMATIONAL | “No endpoint” vs the health route                                    | CLOSED — “business/data-collection endpoint”; health route disclosed                          |

## 3. Round 2 — findings and closure

Round 2 returned `NEEDS_REVISION` with 2 MAJOR evidence-integrity findings and 4 minor/informational
findings. It confirmed **no BLOCKING security or publication defect**: no public exposure, no hidden
form/endpoint, no price/purchase/claim, no design-system fork, no duplicated ES/EN tree and no false
global PASS. It independently ran: `test:mc19` 17/17, `test:mc19:unit` 43/43, `check:mc19:data` PASS,
`test:mc19-scope` 24/24, both `tsc` runs exit 0, preview build exit 0 (0 prerendered), Playwright
22/22, `test:commerce-data` 1832/1832, production bundle scan 0 identifiers; the design-system,
landing and v1-proposal diffs were empty; the legal gates and security controls matched the source.

| ID     | Severity      | Finding                                                         | Closure                                                                      |
| ------ | ------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| IR2-01 | MAJOR         | Committed evidence was stale against the audited commit         | Regenerated at the closure commit; committed as an evidence-only commit (§5) |
| IR2-02 | MAJOR         | Audit findings not persisted; audit doc and review JSON missing | This document and `data/mc19-implementation-review.json` added               |
| IR2-03 | MINOR         | Stale counts (unit 42, scope 23)                                | Reconciled to 43/43 and 24/24                                                |
| IR2-04 | MINOR         | `test:landing` reported as both 59/60 and 58/60                 | Reconciled to 58/60 with the two branch-scope checks explained               |
| IR2-05 | MINOR         | `PASS_INTERNAL_SCOPE` declared while AC-10 was pending          | Reverted to `PENDING_FINAL_REVERIFICATION` until round 3                     |
| IR2-06 | INFORMATIONAL | Dirty working tree at the audited commit                        | Closure commits record the drift explicitly                                  |

## 4. What the auditors could not verify

- Round 1 could not run commands (shell denied) and reviewed statically.
- Round 2 did not re-run `test:landing:e2e` (44/44) or the landing validator; it relied on the
  recorded run and the working-tree evidence, and it had no network access to check the PR state.
- Neither round performed a manual WCAG audit with assistive technology, a 400% zoom test, a second
  browser engine, a penetration test or an OS-level isolation test. AC-08 therefore stays `PARTIAL`.
- Neither round reviewed the English copy as a professional marine translation (risk R20).

## 5. Final evidence commit and round-3 re-verification

A commit cannot contain evidence that names its own hash. The closure is therefore recorded in two
steps: a **closure commit** with all code and documentation, then an **evidence-only commit** that
adds the validator, Playwright and probe outputs recorded against the closure commit. The evidence-only
commit changes no code and no documentation content, so the reviewed bytes are the delivered bytes.

Round-3 re-verification (same independent auditor) result: **PENDING** at the time this document was
first written; the final verdict is recorded below once received.

```text
MC19_IMPLEMENTATION_ROUND_1 = NEEDS_REVISION (3 MAJOR, 13 MINOR/INFORMATIONAL; no BLOCKING)
MC19_IMPLEMENTATION_ROUND_2 = NEEDS_REVISION (2 MAJOR evidence-integrity, 4 MINOR/INFORMATIONAL; no BLOCKING)
MC19_IMPLEMENTATION_ROUND_3 = PENDING
```
