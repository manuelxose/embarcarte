# MC-19/36 → MC-20 — Handoff inputs (D06)

| Field          | Value                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------- |
| Deliverable    | D06 — `MC19-MC20-HANDOFF-INPUTS.md`                                                       |
| Milestone      | MC-19/36 → MC-20/36                                                                       |
| Status         | `INPUTS_ONLY` — MC-20 has not started; no MC-20 work is authorized by this document       |
| MC-19 verdict   | `BLOCKED` (scope proposal delivered; implementation not started)                         |
| MC-20          | Product catalog batch 1: NAV, HUB, AIS pages ES/EN; dependencies 02, 16, 18; `PLANNED`    |
| Machine-readable | `docs/marea/segments/data/mc19-mc20-handoff-inputs.json`                                |

## 1. What MC-20 may rely on

| Input                                                     | State                | Source                                                                 |
| --------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| MC-17 design system (48 components + 1 directive)          | Verified internal    | `docs/marea/design-system/`; `src/app/marea-design-system/`            |
| MC-18 bilingual landing patterns and isolated preview       | Verified internal    | `docs/marea/landing/`; `src/app/marea-landing/`; `preview/landing/`    |
| MC-16 canonical product data contract                      | Verified internal    | `docs/marea/commerce-data/`; generated projection in the landing       |
| MC-15 proposed route registry                              | Verified internal    | `docs/marea/information-architecture/data/proposed-routes.json`        |
| MC-14 claims policy and publication gates                  | Verified internal    | `docs/marea/legal-commercial/`                                         |
| MC-18 audit and delivery conclusions                       | Preserved            | `MC18-INDEPENDENT-REVIEW.md`; `MC18-FINAL-DELIVERY-RECORD.md`          |

## 2. What MC-20 must not assume

- **MC-19 segment or solution pages do not exist.** No owners, installers or professional
  fleets page was implemented; the MC-19 milestone stopped at the scope proposal.
- **No public MAREA route exists.** `/marea` and `/en/marea` return 404 in the production
  server; there is no sitemap, canonical, hreflang or JSON-LD for MAREA.
- **No price, stock, SKU, purchase or subscription capability exists.** All nine families are
  `NOT_FOR_SALE`, 0 prices are approved and 0 merchant SKUs exist.
- **No lead capture, enquiry form, contact endpoint or installer registration exists.**
  `GATE-PRIVACY-DPA-DPIA` is blocked and no consent/DPA/DPIA exists.
- **No trademark, public-use, source-IP, licensing or publication authorization exists.**
- **No MC-19 acceptance criterion is verified.** D04 is a proposal.

## 3. Inputs MC-20 needs from MC-19 (not available)

| Input                                                              | Status    | Why MC-20 needs it                                                |
| ------------------------------------------------------------------ | --------- | ----------------------------------------------------------------- |
| Approved segment-page patterns and audience context                | ABSENT    | Family pages may want a segment entry point; none exists.         |
| Approved solution-page/component boundary against MC-23            | ABSENT    | Avoids duplicating bundle comparison or family pages.             |
| Shared content-block/evidence conventions for catalog pages        | PARTIAL   | MC-18 conventions exist; MC-19 did not add a catalog-specific contract. |
| Shared SEO activation decision for future MAREA pages              | ABSENT    | MC-19 did not activate any route.                                 |
| Privacy-approved enquiry component                                 | BLOCKED   | MC-20 must not build one either; P03 is still open.               |

## 4. Recommended MC-20 entry conditions

1. MC-20 Master Prompt issued and bound to a scope revision.
2. MC-20 IA decision for the nine family pages, reusing the MC-15 proposed routes and the
   MC-16 product data contract.
3. The MC-17 design system and MC-18 landing patterns are reused, not forked.
4. Every family page stays preview-only and non-indexable until the publication gates and a
   release authorization record exist.
5. No price, stock, SKU, purchase, lead or certification claim is introduced.
6. The inherited debt listed in D03 remains visible; `FINANCIAL_V18` is still open.

## 5. Explicit non-authorization

This handoff does **not** start MC-20, does not assign MC-20 owners or dates and does not
approve any MC-20 route, page, price or publication. It records what is available and what
is not, so MC-20 does not inherit an assumption that MC-19 was implemented.

```text
MC20_STARTED = false
MC20_SCOPE_APPROVED = false
MC20_DEPENDENCY_ON_MC19_IMPLEMENTATION = false
```
