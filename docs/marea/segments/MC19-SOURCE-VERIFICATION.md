# MC-19/36 — Source and baseline verification (D02)

| Field       | Value                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Deliverable | D02 — `MC19-SOURCE-VERIFICATION.md`                                                                                                     |
| Milestone   | MC-19/36 — segment/solution pages and enquiry flows                                                                                      |
| Status      | `VERIFIED_BASELINE` — read-only verification; no implementation                                                                         |
| Date        | 2026-11-04 (Europe/Madrid)                                                                                                              |
| Baseline    | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094` on `feature/marea-mc18-bilingual-corporate-landing`                                           |
| Method      | Git inspection, PR inspection, machine-readable dataset reads and the repository's own validators. No value is copied from a summary.   |
| Companion   | `docs/marea/segments/data/mc19-source-verification.json`                                                                                |

## 1. Repository state

| Check                                        | Observed                                                                                          |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `git rev-parse HEAD`                         | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094`                                                         |
| HEAD subject                                 | `chore(mc18): refresh validator evidence at final delivery HEAD`                                  |
| Remote MC-18 branch head (`git ls-remote`)   | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094` (local = remote)                                        |
| Working tree at handoff                      | Clean except a pre-existing untracked `.tmp-build.log`; the log was preserved outside the repo at `$TEMP/embarcarte-mc19-preexisting-tmp-build.log` and was not edited |
| PR #25                                       | `OPEN`, `DRAFT`, `MERGEABLE`, base `feature/marea-mc17-premium-design-system`, head `3490c0f`      |
| Merge / deploy / publish                     | `false` / `false` / `false`                                                                       |
| MC-18 branch ancestor of the MC-19 branch    | Yes (`git merge-base --is-ancestor 3490c0f HEAD` exit 0)                                           |
| Public route files changed since MC-18 HEAD  | None (`app.routes.ts`, `app.routes.server.ts`, `locale-routes.ts`, `src/server.ts`, `public/`)      |
| MC-18 implementation / MC-17 system changed  | None (`src/app/marea-landing`, `src/app/marea-design-system`, `preview/landing`, `e2e/landing`)     |

The MC-19 branch is stacked on the verified MC-18 head. The `main` branch does not contain
the MC-17/MC-18 chain; this is the same stacked-branch pattern used by every milestone since
MC-02.

## 2. Commands actually run at the baseline

| Command                                                                | Exit | Observed result                                                                                                                       |
| ---------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `git rev-parse HEAD`                                                   | 0    | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094`                                                                                             |
| `git ls-remote origin refs/heads/feature/marea-mc18-…`                 | 0    | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094`                                                                                             |
| `gh pr view 25 --json …`                                               | 0    | OPEN / DRAFT / MERGEABLE / base MC-17 / head `3490c0f`                                                                                 |
| `git diff --name-only 3490c0f -- <public route files>`                 | 0    | empty                                                                                                                                 |
| `git diff --name-only 3490c0f -- <MC-18 implementation>`               | 0    | empty                                                                                                                                 |
| `npm run test:landing`                                                 | 1    | **59/60** at the pre-commit tree; only `MC18-56` fails because the new untracked `docs/marea/segments/` is outside the MC-18 file scope |
| `npm run test:landing:unit`                                            | 0    | **45/45** tests                                                                                                                       |
| `npx tsc -p tsconfig.app.json --noEmit`                                | 0    | clean                                                                                                                                 |
| `npm run format:check`                                                 | 0    | all matched files formatted                                                                                                           |

`MC18-56` is a working-tree scope check, not a content failure: once this documentation
package is committed the working tree is clean and the check is re-run at delivery (D07).
The MC-18 validator evidence was restored byte-for-byte after the run, so the MC-18 delivery
evidence is unchanged.

## 3. Machine-readable facts re-derived from the canonical datasets

| Fact                                        | Observed | Source                                                                     |
| ------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| MC-15 proposed routes                       | 23       | `docs/marea/information-architecture/data/proposed-routes.json`            |
| Proposed routes deployable                  | 0        | Every route is `PROPOSED_INTERNAL_NOT_DEPLOYABLE`, `publicationAuthorized:false` |
| Bundle solution routes                      | 6        | `mareaSolutionStart/Cruise/Sail/Protect/Complete/Fleet`                    |
| `professionals` route                       | `/profesionales` / `/en/professionals` | proposed route registry                                   |
| `installers` route                          | `/instaladores` / `/en/installers`    | proposed route registry                                   |
| `mareaSolutions` route                      | `/marea/soluciones` / `/en/marea/solutions` | proposed route registry                              |
| Owners / professional-fleets route          | **absent** | proposed route registry                                                  |
| MC-14 release gates / closed                | 13 / 0   | `docs/marea/legal-commercial/data/release-evidence-gates.json`             |
| MC-14 required documents / executed         | 24 / 0   | same dataset (18 `NOT_EXECUTED`, 6 `DRAFT_REQUIRED`)                       |
| Privacy gate                                | `BLOCKED` | `GATE-PRIVACY-DPA-DPIA` in the same dataset                               |
| Catalogued claims / public-authorized       | 42 / 0   | `docs/marea/legal-commercial/data/bilingual-claims.json`                   |
| Product families / editions / bundles       | 9 / 26 / 6 | `docs/marea/commerce-data/data/`                                        |
| Merchant SKU codes / approved prices        | 0 / 0    | `sku-candidates.json`, `price-governance.json`                             |
| MC-19 implementation files                  | 0        | repository tree; only the MC-18 handoff files mention MC-19                |

## 4. Source inventory and what each establishes

| Source                                                                 | Establishes                                                                                                                                          | Used for                       |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `docs/marea/execution/MASTER-PROMPT-REGISTRY.md`                        | Row 19 is a one-line planning placeholder; prompts 03–36 are placeholders and the client Master Prompt is authoritative.                             | Scope sufficiency; P01         |
| `docs/marea/WEBSITE-AND-ROADMAP.md`                                    | MC-07B “Marine solution pages”; proposed `/profesionales` and `/instaladores`; no owners page.                                                        | Option mapping                 |
| `docs/marea/landing/MC18-MC19-HANDOFF.md` (D18)                        | Declared MC-19 scope, three audience references, six privacy prerequisites, explicit non-goals.                                                      | Scope boundary; P03            |
| `docs/marea/landing/data/mc19-handoff-inputs.json`                     | `mc19Started:false`, publication/indexation false, purchase/lead false, B01–B12 open.                                                                | Governance baseline            |
| `docs/marea/landing/MC18-INDEPENDENT-REVIEW.md` (D21)                  | Independent `PASS_INTERNAL_LANDING_SCOPE`; no form/input/endpoint; no MC-19 start.                                                                   | Inherited state                |
| `docs/marea/landing/MC18-FINAL-DELIVERY-RECORD.md` (D23)               | `MC18_VERDICT=PARTIAL`, internal scope PASS, no merge/deploy/publish, `MC19_STARTED=false`.                                                          | Verdicts and flags             |
| `docs/marea/landing/MC18-SPANISH-EXECUTIVE-REPORT.md` (D22)            | Spanish narrative and handoff pointer.                                                                                                               | Continuity                     |
| `docs/marea/information-architecture/data/proposed-routes.json`        | 23 proposed routes; no owners route; all non-deployable.                                                                                             | IA gap; P02                    |
| `docs/marea/legal-commercial/data/release-evidence-gates.json`         | 13/0 gates; 24/0 documents; privacy BLOCKED.                                                                                                         | P03, P09                       |
| `docs/marea/legal-commercial/data/bilingual-claims.json`               | 42/0 public-authorized claims.                                                                                                                       | P04                            |
| `docs/marea/commerce-data/data/*.json`                                 | 9/26/6; 0 SKUs; 0 prices.                                                                                                                            | P05                            |
| `docs/marea/execution/DECISION-LOG.md`                                 | D-074–D-077 record MC-18 and its explicit non-start of MC-19.                                                                                        | Decision continuity (D-078)    |

## 5. Findings that decide the scope question

- **F01 — No authoritative MC-19 Master Prompt.** The registry is explicit: the placeholder
  row is not the contract. Implementing from it would invent requirements.
- **F02 — No owners route.** The IA registry has no owners/armadores entity or page type.
  An owners page needs a recorded IA decision, not a coding decision.
- **F03 — Enquiry flows are blocked.** The privacy gate is `BLOCKED`, 24 required documents
  are unexecuted and the handoff lists six mandatory prerequisites. The “lead flows” half of
  the expected output cannot be built or tested now.
- **F04 — Publication is not authorized.** No public route, canonical, hreflang, JSON-LD,
  sitemap entry, merge or deployment is permitted.
- **F05 — The acceptance criterion is a theme, not a gate.** “Real CTAs only …” does not
  define a measurable acceptance matrix.
- **F06 — Solution-page ownership is ambiguous.** MC-20–23 already own family pages and
  bundle comparison; MC-15 already proposes the solutions overview and six bundle routes.

## 6. Conclusion

The baseline is verified and preserved. The MC-19 scope is **not sufficiently defined for
implementation**. The correct deliverable is the documented scope proposal in D01, the
dependencies in D03, the proposed acceptance matrix in D04, the risk register in D05 and
the MC-20 handoff inputs in D06. No code was written.
