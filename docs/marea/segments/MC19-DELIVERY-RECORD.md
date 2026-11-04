# MC-19/36 — Delivery record

| Field                     | Value                                                                  |
| ------------------------- | ---------------------------------------------------------------------- |
| Deliverable               | MC-19 delivery record                                                  |
| Branch                    | `feature/marea-mc19-internal-audience-pages`                           |
| Baseline                  | `ba63baa0e529ab9cb482fd929632d359fec1d328` (MC-19 dependency baseline) |
| Implementation commit     | `cc3a62cb28da3a6c21dce16ee07580edb216debd`                             |
| Round-1 correction commit | `102c6f14f313c96c7dd0a39212add5642a3cb5f8`                             |
| Closure commit            | `3f19601fba77efe734d0ae2cb30c61051cecc638`                             |
| Evidence-only commit      | `65d1f6d2b24e3b19cee7ed222ab9b1cae2faaac2`                             |
| Draft PR                  | [#27](https://github.com/manuelxose/embarcarte/pull/27)                |
| Base PR (preserved)       | [#26](https://github.com/manuelxose/embarcarte/pull/26)                |
| Merge / deploy / publish  | `false` / `false` / `false`                                            |
| Public routes activated   | 0                                                                      |
| Publication               | `NOT_AUTHORIZED`                                                       |
| Indexation                | `NOT_AUTHORIZED`                                                       |
| Global verdict            | `MC19_VERDICT = PARTIAL`                                               |

## 1. What was delivered

- Three internal bilingual audience pages (`professionals`, `installers`, `shipowners`) in
  `src/app/marea-segments/`, rendered only by the isolated preview at
  `/internal/segments/*` (EN: `/en/internal/segments/*`).
- One bilingual content source (313 page blocks + 41 shared blocks = 708 resolved records) with
  fixed `INTERNAL_DRAFT_NOT_APPROVED` / `NOT_APPROVED` literals and a resolvable evidence registry.
- MC-17 component reuse without fork; MC-18 landing and design system unchanged.
- Deterministic projection and implementation inventory datasets, a 17-check validator, a
  43-test unit/adversarial suite and a 22-test Playwright suite.
- Documentation: implementation contract, IA decision, technical inventory, acceptance matrix,
  security/legal gate verification, test report, accessibility evidence, independent audit,
  risk/dependency update, Spanish executive report and MC-20 handoff update.

## 2. Delivery mechanics

1. Branch created from the verified current MC-19 dependency baseline
   (`ba63baa0e529ab9cb482fd929632d359fec1d328`), not from `main`.
2. Implementation committed as `cc3a62c`; round-1 audit corrections as `102c6f1`.
3. Branch pushed to `origin`; draft PR #27 opened with base `feature/marea-mc19-scope-proposal`
   (PR #26), which remains draft and unmerged.
4. Round-1 and round-2 audit findings closed in `102c6f1` and `3f19601`; evidence regenerated in the
   evidence-only commit `65d1f6d`; round-3 independent re-verification returned `PASS_INTERNAL_SCOPE`
   with 0 open BLOCKING/MAJOR findings.
5. No merge, no deployment, no publication, no sitemap submission, no Search Console action.
6. MC-20 was not started and is not dependent on this implementation.

## 3. Evidence index

| Evidence                           | Location                                      |
| ---------------------------------- | --------------------------------------------- |
| Implementation validator run       | `evidence/implementation-validator-run.json`  |
| Scope validator (v2, supersession) | `evidence/scope-validator-run-v2.json`        |
| MC-18 landing validator regression | `evidence/landing-regression-run.json`        |
| SSR/hydration                      | `evidence/ssr-hydration-evidence.json`        |
| Accessibility (automated)          | `evidence/accessibility-evidence.json`        |
| No-interaction                     | `evidence/no-interaction-evidence.json`       |
| Responsive                         | `evidence/responsive-evidence.json`           |
| Production isolation               | `evidence/production-isolation-evidence.json` |
| Production 404 probes              | `evidence/production-404-probes.json`         |
| Scope instruction                  | `data/mc19-scope-instruction.json`            |
| IA decision                        | `data/mc19-ia-decision.json`                  |
| Content projection                 | `data/mc19-content-projection.json`           |
| Implementation inventory           | `data/mc19-implementation-inventory.json`     |
| Risk register                      | `data/mc19-risk-register.json`                |
| Implementation review findings     | `data/mc19-implementation-review.json`        |

## 4. Non-authorisations carried forward

```text
MERGE = false
DEPLOY = false
PUBLISH = false
PUBLIC_ROUTE_ACTIVATION = false
SITEMAP_SUBMISSION = false
LEAD_CAPTURE = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
```

## 5. Next action

Owner decision on the external authorisations (trademark/public use, source IP and licensing, public
copy and claims, commercial data and pricing, publication/indexation/release, privacy/DPA/DPIA).
MC-20 remains unstarted.
