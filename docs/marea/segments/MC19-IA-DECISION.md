# MC-19/36 — Information architecture decision record

| Field                   | Value                                                                           |
| ----------------------- | ------------------------------------------------------------------------------- |
| Deliverable             | MC-19 IA decision (D-IA)                                                        |
| Milestone               | MC-19/36                                                                        |
| Status                  | `DECIDED_INTERNAL_ONLY` — implementation authorised, publication not authorised |
| Recorded                | 2026-11-04                                                                      |
| Baseline                | `ba63baa0e529ab9cb482fd929632d359fec1d328`                                      |
| Machine-readable record | `docs/marea/segments/data/mc19-ia-decision.json`                                |
| Predecessors            | MC-15 proposed route registry · MC-18 landing identity and preview architecture |

## 1. Decision

MC-19 implements **three internal audience identities** as three bilingual pages rendered by one
locale-aware component tree, inside the existing isolated loopback preview:

| Identity        | Entity                    | MC-15 route id  | Page type       | ES preview path                    | EN preview path                       | Public route |
| --------------- | ------------------------- | --------------- | --------------- | ---------------------------------- | ------------------------------------- | ------------ |
| `professionals` | `ENT-PAGE-PROFESSIONALS`  | `professionals` | `PROFESSIONALS` | `/internal/segments/professionals` | `/en/internal/segments/professionals` | none         |
| `installers`    | `ENT-PAGE-INSTALLERS`     | `installers`    | `INSTALLERS`    | `/internal/segments/installers`    | `/en/internal/segments/installers`    | none         |
| `shipowners`    | `ENT-INTERNAL-SHIPOWNERS` | — (new)         | — (new)         | `/internal/segments/shipowners`    | `/en/internal/segments/shipowners`    | none         |

`professionals` and `installers` reuse their MC-15 entity ids, route ids, page types and reserved
public slugs **as planning references only**. `shipowners` is a new internal identity: MC-15 defines
no owners route, entity or page type, so **no public path is created, reserved or proposed** for it.

## 2. Why an internal namespace instead of the MC-15 public paths

- The MC-15 proposed paths (`/profesionales`, `/instaladores`, `/en/professionals`,
  `/en/installers`) are `PROPOSED_INTERNAL_NOT_DEPLOYABLE` and `publicationAuthorized: false`.
  Serving them — even on loopback — would emulate a route the programme has not approved.
- `shipowners` has no proposed path at all; inventing `/armadores` would create an unapproved IA
  identity and an implicit route decision.
- One namespace for all three keeps the three pages equally isolated, makes an accidental public
  activation obvious, and lets the collision check be exact rather than semantic.
- The future public mapping stays documented (table above) but is **not** registered, linked or
  emitted anywhere.

## 3. Collision check (deterministic)

| Route set                          | Count | Result                                                               |
| ---------------------------------- | ----: | -------------------------------------------------------------------- |
| Public routes (`LOCALIZED_ROUTES`) |    21 | 0 collisions: no internal path equals or prefixes a public path      |
| MC-15 proposed routes              |    23 | 0 collisions against `routePatternEs`/`routePatternEn`               |
| Reserved public paths (planning)   |   2×2 | Not registered in `LOCALIZED_ROUTES`, the router, the sitemap or SEO |

`npm run test:mc19` (MC19-I02) recomputes this check from the two datasets and the live route
registry on every run.

## 4. Audience semantics — not interchangeable

- **`professionals`** — professional marine businesses that specify, operate or maintain more than
  one vessel (small fleets and charter, technical practices, maintenance, potential distribution).
  It is not the installer page and not the shipowner page, and it is not a partner programme.
- **`installers`** — independent installers and technical workshops evaluating real installation,
  commissioning and calibration work. It is not an installer registration, accreditation, directory
  or partner agreement (DOC-17 is `NOT_EXECUTED`).
- **`shipowners` / `armadores`** — the **individual owner of a recreational vessel**. In Spanish,
  “armador” also designates the owner or operator of a merchant vessel. This page explicitly excludes
  the commercial shipowner (shipping companies, cargo/passenger/work vessels, professional crew) and
  the professional fleet. `FLEET` — a contracted, multi-tenant B2B solution for small commercial and
  charter operators — is **not** presented as an individual-owner product.

The distinction is carried in each page's scope section (for / not for) and in the shared footer,
not only in a heading.

## 5. Boundary with MC-20 – MC-23

| Milestone | Scope (as defined by the roadmap and its own records)                               | MC-19 boundary                                                            |
| --------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| MC-20     | Product catalogue batch 1: NAV, HUB, AIS family pages                               | Not implemented; family pages and their routes stay MC-20-owned           |
| MC-21/22  | Subsequent catalogue and commercial presentation work defined by the actual roadmap | Not implemented; no page, route or component is pre-empted                |
| MC-23     | Its actual roadmap scope (bundle/comparison work)                                   | Not implemented; MC-19 embeds family context only, creates no bundle page |

No requirement is invented for MC-20–MC-23. The MC-19 pages reference canonical family identity but
never claim to be the family page: each card states that the summary is an internal per-audience
draft and that the family page belongs to the catalogue milestone.

## 6. Isolation mechanics

- The pages live in `src/app/marea-segments/` and are imported **only** by
  `preview/landing/segment-preview.ts`.
- The isolated preview project `marea-landing-preview` binds `127.0.0.1`, enforces a Host allowlist,
  returns `X-Robots-Tag: noindex, nofollow, noarchive`, sets a CSP with `form-action 'none'` and uses
  `RenderMode.Server` for every route (no prerender, no static artefact).
- No canonical, hreflang, Open Graph, Twitter card or JSON-LD is emitted; no sitemap entry exists; the
  production application does not import the module and returns 404 for every internal path.
- The production route files (`app.routes.ts`, `app.routes.server.ts`, `locale-routes.ts`,
  `src/server.ts`) are unchanged in this milestone.
