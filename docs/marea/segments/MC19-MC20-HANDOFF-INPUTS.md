# MC-19/36 → MC-20 — Handoff inputs (D06, updated after implementation)

| Field            | Value                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Deliverable      | D06 — `MC19-MC20-HANDOFF-INPUTS.md`                                                       |
| Milestone        | MC-19/36 → MC-20/36                                                                       |
| Status           | `INPUTS_ONLY` — MC-20 has not started; no MC-20 work is authorized by this document       |
| MC-19 verdict    | `PARTIAL` — internal implementation `PASS_INTERNAL_SCOPE`; external approvals outstanding |
| MC-20            | Product catalog batch 1: NAV, HUB, AIS pages ES/EN; dependencies 02, 16, 18; `PLANNED`    |
| Machine-readable | `docs/marea/segments/data/mc19-mc20-handoff-inputs.json` (contract version 1.1.0)         |

## 1. What MC-20 may rely on

| Input                                                                                                                                   | State                              | Source                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------- |
| MC-17 design system (48 components + 1 directive)                                                                                       | Verified internal                  | `docs/marea/design-system/`; `src/app/marea-design-system/`                     |
| MC-18 bilingual landing patterns and isolated preview                                                                                   | Verified internal                  | `docs/marea/landing/`; `src/app/marea-landing/`; `preview/landing/`             |
| MC-16 canonical product data contract                                                                                                   | Verified internal                  | `docs/marea/commerce-data/`; generated projection in the landing                |
| MC-15 proposed route registry                                                                                                           | Verified internal                  | `docs/marea/information-architecture/data/proposed-routes.json`                 |
| MC-14 claims policy and publication gates                                                                                               | Verified internal                  | `docs/marea/legal-commercial/`                                                  |
| MC-18 audit and delivery conclusions                                                                                                    | Preserved                          | `MC18-INDEPENDENT-REVIEW.md`; `MC18-FINAL-DELIVERY-RECORD.md`                   |
| MC-19 internal audience-page pattern (one bilingual tree, 8 sections, evidence-bound copy, fail-closed CTA, internal preview namespace) | Implemented, internal preview only | `src/app/marea-segments/`; `MC19-IA-DECISION.md`; `MC19-TECHNICAL-INVENTORY.md` |
| MC-19 deterministic projection + validator pattern                                                                                      | Verified internal                  | `scripts/mc19-segments-projection.mjs`; `scripts/check-mc19-implementation.mjs` |

## 2. What MC-20 must not assume

- **The MC-19 audience pages have no public route, canonical, hreflang, sitemap entry or indexable
  metadata.** They are served only by the loopback preview in `internal/segments/*`.
- **No public owner path exists or is approved.** `shipowners` is a new internal-only identity;
  no public path is reserved.
- **No price, stock, SKU, purchase or subscription capability exists.** All nine families remain
  `NOT_FOR_SALE`, 0 prices approved and 0 merchant SKUs.
- **No lead capture, enquiry form, contact endpoint or installer registration exists.**
  `GATE-PRIVACY-DPA-DPIA` is blocked.
- **No installer, distributor or partner programme, accreditation or agreement exists.** DOC-17 is
  `NOT_EXECUTED`.
- **No trademark, public-use, source-IP, licensing, publication or deployment authorisation exists.**
- **No MC-19 acceptance criterion extended to publication, indexation or commercial activation.**
- **MC-20 must not reuse the MC-19 internal preview namespace as a public path.**

## 3. Inputs MC-20 may want, and their real state

| Input                                                   | Status                    | Note                                                               |
| ------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| Internal segment-page pattern                           | AVAILABLE (internal only) | Reusable as a pattern; not a route or copy approval.               |
| Audience boundary and semantic distinctions             | AVAILABLE                 | `MC19-IA-DECISION.md` §4; reuse the distinction, not the copy.     |
| Catalog-specific content-block/evidence contract        | PARTIAL                   | MC-18/MC-19 conventions exist; MC-20 still needs its own contract. |
| Approved public segment copy and route activation       | ABSENT                    | Publication is not authorised.                                     |
| Approved solution-page/component boundary against MC-23 | ABSENT                    | MC-19 implemented no solution or bundle page.                      |
| Privacy-approved enquiry component                      | BLOCKED                   | MC-20 must not build one; P03 remains open.                        |
| Shared SEO activation decision for future MAREA pages   | ABSENT                    | No route is activated or authorised.                               |

## 4. Recommended MC-20 entry conditions

1. MC-20 Master Prompt issued and bound to a scope revision.
2. MC-20 IA decision for the batch-1 family pages (NAV, HUB, AIS), reusing the MC-15 proposed routes and the MC-16 product data contract.
3. The MC-17 design system and the MC-18 bilingual component patterns are reused, not forked. Reusing the MC-19 internal pattern is optional: MC-20 must not depend on the MC-19 implementation.
4. Every family page stays preview-only and non-indexable until the publication gates and a release
   authorization record exist.
5. No price, stock, SKU, purchase, lead, certification, compatibility or installability claim is
   introduced.
6. The inherited debt remains visible: `FINANCIAL_V18 = INHERITED_OPEN`,
   `MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED`, and the MC-13/MC-15 findings remain open.

## 5. Explicit non-authorization

This handoff does **not** start MC-20, does not assign MC-20 owners or dates and does not approve any
MC-20 route, page, price, claim or publication.

```text
MC20_STARTED = false
MC20_SCOPE_APPROVED = false
MC20_DEPENDENCY_ON_MC19_IMPLEMENTATION = false
MC19_VERDICT = PARTIAL
MC19_PUBLICATION = NOT_AUTHORIZED
```
