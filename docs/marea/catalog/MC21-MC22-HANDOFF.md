# MC-21 → MC-22 — Handoff (inputs only)

| Field | Value |
| --- | --- |
| From | MC-21/36 — product catalogue batch 2 (WEATHER, SENSE, WATCH) |
| To | MC-22/36 — product catalogue batch 3 (DISPLAY, PILOT, FLEET) |
| Status | `INPUTS_ONLY` — MC-22 has **not** started and this document does not authorise it |
| MC-21 verdict | `PARTIAL` — internal implementation `PASS_INTERNAL_SCOPE`; external authorisations outstanding |
| MC-22 registry row | `PLANNED` |

## 1. What MC-22 may rely on

| Input | State | Source |
| --- | --- | --- |
| Six-family one-tree catalogue architecture | Verified internal | `src/app/marea-catalog/` (decision D-083) |
| Deterministic projection generator for six families, 18 editions, 10 gates | Verified internal | `scripts/build-mc20-catalog-data.mjs` (`--check` byte-stable) |
| Bilingual content contract with evidence class + canonical source refs | Verified internal | `src/app/marea-catalog/content/content.types.ts` |
| Validator 50/50, unit/adversarial 39/39, Playwright 60/60 across 12 routes | Verified internal | `MC21-TEST-REPORT.md` |
| Named-provider / accuracy / SLA / availability guards | Verified internal | `scripts/mc20-catalog-guards.mjs` |
| Internal preview namespace and loopback SSR host | Verified internal | `preview/landing/` |
| Isolation proof pattern (bundle grep, route tables, sitemap) | Verified internal | `MC21-SECURITY-AND-ISOLATION-EVIDENCE.md` |

## 2. What MC-22 must not assume

- No public route, canonical, hreflang, sitemap, JSON-LD or indexation exists or is approved.
- No price, stock, SKU, quote, order, payment or lead capture exists.
- MC-21 certifies no compatibility, reception, conformity, accuracy or safety.
- The internal preview namespace is not a public path and must not be reused as one.
- No MC-22 content, route, claim or publication is pre-approved by this handoff.

## 3. Mandatory extra cautions for batch 3

| Family | Caution | Source |
| --- | --- | --- |
| PILOT | `PILOT_SAFETY_GATE = BLOCKED`; E-stop / motor isolation / rudder evidence `NOT_FOUND`; sea trials `NOT_PERFORMED`. Must present supervision limits, no autonomous control, never sold while the gate is blocked | `PILOT-SAFETY-CASE-OUTLINE.md`, MC-06 |
| FLEET | `NOT_IMPLEMENTED`, `NO_SLA_ESTABLISHED`, server-side tenant model specified but not built; read-only telemetry, no vessel-control path; B2B terms not contracted | `FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md`, MC-07 |
| DISPLAY | `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`, BOM not established, no PILOT authority; data licensing still blocked | `DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md`, MC-07 |

## 4. Recommended entry conditions for MC-22

1. MC-22 master prompt issued and bound to a scope revision.
2. Confirm MC-21 delivery HEAD and that PR for MC-21 remains draft and unmerged.
3. Preserve all ten governance gates verbatim; re-run the same isolation proof.
4. Keep PILOT, FLEET and DISPLAY inside the internal preview; no safety, SLA or B2B claim.
5. Keep the inherited debt register visible (`FINANCIAL_V18`, `MC16_FINAL_02`, MC-13 F-05/F-11/F-14,
   MC-15 GSC-01/GSC-02, DEC-04, HUB hardware, 0 compatibility rows, professional EN review,
   manual WCAG/AT review, MC-19 AC08).

```text
MC22_STARTED = false
MC21_VERDICT = PARTIAL
MC21_PUBLICATION = NOT_AUTHORIZED
```
