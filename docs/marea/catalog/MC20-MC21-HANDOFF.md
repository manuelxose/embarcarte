# MC-20 → MC-21 — Handoff

| Field | Value |
| --- | --- |
| From | MC-20/36 — internal catalogue batch 1 (NAV, HUB, AIS) |
| To | MC-21/36 — product catalogue batch 2 (WEATHER, SENSE, WATCH) |
| Status | `INPUTS_ONLY` — MC-21 has not started and this document does not authorise it |
| MC-20 verdict | `PARTIAL` — internal implementation `PASS_INTERNAL_SCOPE`; external authorisations outstanding |
| MC-21 registry row | `PLANNED` |

## 1. What MC-21 may rely on

| Input | State | Source |
| --- | --- | --- |
| Generated projection pattern from MC-16 to a typed presentation contract | Verified internal | `scripts/build-mc20-catalog-data.mjs`; `src/app/marea-catalog/data/` |
| One-tree bilingual catalogue architecture for three families | Verified internal | `src/app/marea-catalog/catalog-page.ts`; `sections/` |
| Content contract with evidence class + canonical source refs | Verified internal | `src/app/marea-catalog/content/`; `mc20-catalog-guards.mjs` |
| Internal preview namespace and loopback SSR host | Verified internal | `preview/landing/`; `internal/catalog/*` |
| Validator / unit / adversarial / Playwright patterns | Verified internal | `scripts/check-mc20-catalog*.mjs`; `e2e/catalog/` |
| MC-17 design-system reuse map | Unchanged | `src/app/marea-design-system/` |

## 2. What MC-21 must not assume

- No public route, canonical, hreflang, sitemap, JSON-LD or indexation exists or is approved.
- No price, stock, SKU, quote, order, payment or lead capture exists.
- MC-20 does not certify compatibility, reception, conformity or safety.
- The AIS decoder licence, HUB hardware selection and compatibility measurement remain open.
- The internal preview namespace is not a public path and must not be reused as one.
- No MC-21 content, route, claim or publication is pre-approved by this handoff.

## 3. Recommended entry conditions for MC-21

1. MC-21 master prompt issued and bound to a scope revision.
2. Canonical identity for WEATHER, SENSE and WATCH read from MC-16 and MC-06 batch-02.
3. MC-17 design system and MC-20 catalogue pattern reused, not forked.
4. Preview-only, non-indexable, no commerce, no lead capture.
5. Inherited debt kept visible: `FINANCIAL_V18`, `MC16_FINAL_02`, MC-13 F-05/F-11/F-14,
   MC-15 GSC-01/GSC-02, MC-19 AC08 partial accessibility, professional English review.

```text
MC21_STARTED = false
MC21_SCOPE_APPROVED = false
MC20_VERDICT = PARTIAL
MC20_PUBLICATION = NOT_AUTHORIZED
```
