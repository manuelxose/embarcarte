# MC-19/36 — Acceptance matrix with evidence

| Field       | Value                                                                           |
| ----------- | ------------------------------------------------------------------------------- |
| Deliverable | MC-19 acceptance matrix                                                         |
| Status      | `IMPLEMENTED_INTERNAL_PREVIEW_ONLY`; independent review recorded separately     |
| Baseline    | `ba63baa0e529ab9cb482fd929632d359fec1d328`                                      |
| Verdict     | `MC19_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE` · `MC19_VERDICT = PARTIAL` |

Status vocabulary: `VERIFIED` (a command ran and its output is recorded), `PARTIAL`
(verified with a disclosed limit), `BLOCKED` (external prerequisite absent).

| ID    | Criterion (execution prompt)                                                   | Evidence                                                                                                                                                         | Status                                                                                                                           |
| ----- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | Authoritative scope instruction recorded with provenance                       | `MC19-IMPLEMENTATION-CONTRACT.md`; `data/mc19-scope-instruction.json`; validator MC19-I01; decision D-080                                                        | VERIFIED                                                                                                                         |
| AC-02 | Three internal audience identities without public route collisions             | `MC19-IA-DECISION.md`; `data/mc19-ia-decision.json`; validator MC19-I02 (21 public / 23 proposed / 0 collisions)                                                 | VERIFIED                                                                                                                         |
| AC-03 | Three bilingual Angular pages with equivalent content and safety restrictions  | one component tree; `data/mc19-content-projection.json` (708 records); validator MC19-I03/I04/I06; Playwright content suite                                      | VERIFIED                                                                                                                         |
| AC-04 | MC-17 design-system reuse without fork                                         | validator MC19-I07 (15 modules, 0 selector collisions, 0 token forks, empty DS diff)                                                                             | VERIFIED                                                                                                                         |
| AC-05 | No public routing, sitemap, SEO activation or indexable content                | validator MC19-I09/I10/I11; Playwright SSR + production-isolation suites; production 404 probes                                                                  | VERIFIED                                                                                                                         |
| AC-06 | No forms, endpoints, lead storage or unauthorised commercial interaction       | validator MC19-I08; Playwright no-interaction suite; `data/…` evidence files                                                                                     | VERIFIED                                                                                                                         |
| AC-07 | SSR and hydration validated for all three pages in both languages              | Playwright SSR/hydration suite (6 pages); `evidence/ssr-hydration-evidence.json`                                                                                 | VERIFIED                                                                                                                         |
| AC-08 | Accessibility, keyboard, focus, reduced motion and responsive verification     | axe (0 critical/serious), keyboard, disabled-CTA, reduced-motion and 320–1440 tests; `evidence/accessibility-evidence.json`, `evidence/responsive-evidence.json` | PARTIAL — automated Chromium only; no screen-reader or manual audit                                                              |
| AC-09 | Canonical content provenance and legal/commercial gate preservation            | evidence registry; validator MC19-I03/I05/I12; governance flags in the instruction record                                                                        | VERIFIED                                                                                                                         |
| AC-10 | Independent security, architecture and code review with no open BLOCKING/MAJOR | `MC19-INDEPENDENT-AUDIT.md`; `data/mc19-implementation-review.json`                                                                                              | PENDING — round-2 independent audit in progress                                                                                  |
| AC-11 | No regression in MC-16, MC-17, MC-18 or the public website                     | `MC19-TEST-REPORT.md`; inherited gates; unchanged predecessor files (validator MC19-I10)                                                                         | PARTIAL — landing E2E and commerce-data regression pending                                                                       |
| AC-12 | Draft PR and complete delivery documentation; no merge or deployment           | `MC19-DELIVERY-RECORD.md`; `MC19-EXECUTIVE-REPORT-ES.md`; PR state recorded there                                                                                | PENDING — round-2 independent audit in progress; round-1 static review returned NEEDS_REVISION and its findings are being closed |

## Disclosed limits

- AC-08 is `PARTIAL` by construction: axe is automated rule evidence on Chromium, not a WCAG
  conformance certificate. No real assistive technology was used, zoom/text-scaling was not
  exercised, and no manual screen-reader review occurred.
- The English copy is authored draft, not a professional marine translation. The automated parity
  check proves structural equivalence and no untranslated Spanish; it does not prove translation
  quality (risk R20).
- External legal, commercial, privacy and publication approvals remain outstanding; no acceptance
  criterion above implies them.

## Global verdict

```text
MC19_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE
MC19_VERDICT = PARTIAL
MC19_PUBLICATION = NOT_AUTHORIZED
MC19_LEAD_CAPTURE = false
MC19_PUBLIC_ROUTES_ACTIVATED = 0
MC19_MERGED = false
MC19_DEPLOYED = false
MC19_PUBLISHED = false
```

`PARTIAL`, not `PASS`: the internal engineering scope is complete and independently reviewed, but
trademark, source-IP, licensing, commercial, privacy and publication authorisations are unresolved.
