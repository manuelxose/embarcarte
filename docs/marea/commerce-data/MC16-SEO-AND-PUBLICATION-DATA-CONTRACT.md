# MC-16 D15 — SEO and publication data contract

| Field | Value |
|---|---|
| Document ID | MC-16 / D15 / MC16-SEO-AND-PUBLICATION-DATA-CONTRACT |
| Milestone | MC-16/36 — commerce and product data model |
| Owner | commerce-docs (pricing, inventory, subscription and integration architect) |
| Date | 2026-11-03 |
| Base commit | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Branch | `feature/marea-mc16-commerce-product-data-model` |
| Status | `INTERNAL_ONLY` — 0 MAREA routes published/indexed; no publication, no structured data |
| Evidence class | `ENGINEERING_DESIGN` + `REPOSITORY_VERIFIED` |
| Authority | `data/publication-eligibility.json`; `data/mc17-handoff-inputs.json`; MC-15 route/SEO contracts |
| Downstream owner | MC-17 presentation — `MC17_STARTED = false`, no public UI change authorised |

## 1. Purpose and boundary

This document fixes the publication and structured-data contract MC-16 hands to
MC-17 and later SEO work. It answers four questions for every proposed MAREA
route and entity: may it be published, indexed, included in a sitemap or used to
emit product/offer markup? Today the answer is **no** for all 23 proposed routes,
and **no** for every MAREA `Product` or `Offer` node.

MC-16 does not add a route, change the sitemap, edit a canonical/hreflang tag,
touch `LOCALIZED_ROUTES`, publish a page, submit a sitemap, deploy or index
anything. The existing 21 public route ids and 7 admin route ids keep their
current behaviour.

Current counters:

- **23** proposed routes, all `PROPOSED_INTERNAL_NOT_DEPLOYABLE`.
- **0** MAREA routes published; **0** indexable; **0** sitemap-eligible;
  **0** commercial transactions authorised.
- **0** MAREA `Product`/`Offer` JSON-LD nodes; **0** MAREA price or availability
  markup.
- Current routes: 21 public + 7 admin = 28 route ids, preserved.

## 2. The 23 proposed routes

All twenty-three have `routeDefined = true`, `implementationReady = false`,
`publicationAuthorized = false`, `indexationAuthorized = false`,
`sitemapEligible = false`, `commercialTransactionAuthorized = false` and
`eligibility = PROPOSED_INTERNAL_NOT_DEPLOYABLE`.

| # | Route id | ES path | EN path | Page type | Blocking gates |
|---:|---|---|---|---|---:|
| 1 | `mareaOverview` | `/marea` | `/en/marea` | HUB_OVERVIEW | 13 |
| 2 | `mareaProducts` | `/marea/productos` | `/en/marea/products` | PRODUCTS_OVERVIEW | 13 |
| 3 | `mareaSolutions` | `/marea/soluciones` | `/en/marea/solutions` | SOLUTIONS_OVERVIEW | 13 |
| 4 | `mareaFamilyNav` | `/marea/nav` | `/en/marea/nav` | PRODUCT_FAMILY | 12 |
| 5 | `mareaFamilyHub` | `/marea/hub` | `/en/marea/hub` | PRODUCT_FAMILY | 10 |
| 6 | `mareaFamilyAis` | `/marea/ais` | `/en/marea/ais` | PRODUCT_FAMILY | 11 |
| 7 | `mareaFamilyPilot` | `/marea/pilot` | `/en/marea/pilot` | PRODUCT_FAMILY | 11 |
| 8 | `mareaFamilySense` | `/marea/sense` | `/en/marea/sense` | PRODUCT_FAMILY | 10 |
| 9 | `mareaFamilyWatch` | `/marea/watch` | `/en/marea/watch` | PRODUCT_FAMILY | 11 |
| 10 | `mareaFamilyDisplay` | `/marea/display` | `/en/marea/display` | PRODUCT_FAMILY | 11 |
| 11 | `mareaFamilyWeather` | `/marea/weather` | `/en/marea/weather` | PRODUCT_FAMILY | 10 |
| 12 | `mareaFamilyFleet` | `/marea/fleet` | `/en/marea/fleet` | PRODUCT_FAMILY | 10 |
| 13 | `mareaSolutionStart` | `/marea/soluciones/start` | `/en/marea/solutions/start` | BUNDLE | 12 |
| 14 | `mareaSolutionCruise` | `/marea/soluciones/cruise` | `/en/marea/solutions/cruise` | BUNDLE | 12 |
| 15 | `mareaSolutionSail` | `/marea/soluciones/sail` | `/en/marea/solutions/sail` | BUNDLE | 13 |
| 16 | `mareaSolutionProtect` | `/marea/soluciones/protect` | `/en/marea/solutions/protect` | BUNDLE | 12 |
| 17 | `mareaSolutionComplete` | `/marea/soluciones/complete` | `/en/marea/solutions/complete` | BUNDLE | 13 |
| 18 | `mareaSolutionFleet` | `/marea/soluciones/fleet` | `/en/marea/solutions/fleet` | BUNDLE | 11 |
| 19 | `mareaConfigurator` | `/marea/configurador` | `/en/marea/configurator` | TOOL | 12 |
| 20 | `professionals` | `/profesionales` | `/en/professionals` | PROFESSIONALS | 6 |
| 21 | `installers` | `/instaladores` | `/en/installers` | INSTALLERS | 6 |
| 22 | `support` | `/soporte` | `/en/support` | SUPPORT | 6 |
| 23 | `productDocumentation` | `/soporte/marea/:slug` | `/en/support/marea/:slug` | DOCUMENTATION | 9 |

`productDocumentation` is the only parameterised route; its `:slug` domain is
the nine lowercased family ids. No edition id may appear in a URL.

### 2.1 Invariants

1. No route may be published, indexed or added to the sitemap while any blocking
   gate is open. All 13 gates are open (12 `BLOCKED`, 1 `EVIDENCE_REQUIRED`).
2. Every one of the five authorisation booleans is `false`; a false value means
   "this MC-16 contract does not authorise the action", not a statement about an
   existing corporate page.
3. Page identity is not SKU identity. One family page exposes zero or more
   editions; no page may be created per edition, price, stock state or locale.
4. Publication is independent of product lifecycle but cannot promote it. A
   published page never makes a product merchantable.
5. No proposed route may collide with a current route, legacy redirect or admin
   surface; the registry records `NO_COLLISION` for all 23.

## 3. Publication eligibility model

`data/publication-eligibility.json` records, per route: `routeId`, `entityId`,
`pageType`, `esPath`, `enPath`, `routeDefined`, `implementationReady`,
`publicationAuthorized`, `indexationAuthorized`, `sitemapEligible`,
`commercialTransactionAuthorized`, `blockingGateIds` and `eligibility`.

The domain evaluator `evaluatePublicationEligibility()` (`domain.ts:648-667`)
returns `eligible = false` if any of the following is true:

- any release gate is not `CLOSED_VERIFIED` or lacks usable closure evidence
  (`GATE_OPEN:<gateId>`);
- `publicationAuthorized = false` (`PUBLICATION_NOT_AUTHORIZED`);
- `indexationAuthorized = false` (`INDEXATION_NOT_AUTHORIZED`);
- `commercialAvailability !== 'FOR_SALE'` (`PRODUCT_NOT_FOR_SALE`);
- `brandPublication !== 'PUBLICATION_APPROVED'` (`BRAND_NOT_CLEARED`);
- `structuredDataProductOffer = true` (`PUBLIC_PRODUCT_OFFER_MARKUP_PROHIBITED`).

Every MAREA entity currently fails at least the first four conditions. The
database table `marea_publication_eligibility` hard-codes all five flags to `0`
and has no activation path in MC-16.

## 4. Structured data: no MAREA Product or Offer

### 4.1 Absolute prohibitions

| Node / field | MAREA status | Note |
|---|---|---|
| `Product` | **PROHIBITED** | For every family, edition, bundle, concept and documentation page |
| `Offer` | **PROHIBITED** | No offer, no seller, no price, no availability |
| `price`, `priceCurrency`, `priceRange`, `priceSpecification`, `lowPrice`, `highPrice` | **PROHIBITED** | No "from €", no placeholder, no hypothesis |
| `availability`, `InStock`, `OutOfStock`, `PreOrder`, `BackOrder`, `PreSale`, `LimitedAvailability` | **PROHIBITED** | No free-text "coming soon" availability signal either |
| `aggregateRating`, `Review`, `ratingValue`, `reviewCount`, `award` | **PROHIBITED** | None exists; do not invent |
| Certification / conformity markup (CE, RED, NMEA 2000, wheelmark) | **PROHIBITED** | No certification exists |
| `brand` asserting registered status | **PROHIBITED** | MAREA is a proposed brand; trademark `NOT_GRANTED` |
| `seller`, `provider`, `manufacturer` without verified legal identity | **PROHIBITED** | `SITE.legal` fields are empty |

`publication-eligibility.json#structuredDataPolicy` sets `productNodeAllowed =
false`, `offerNodeAllowed = false`, `priceFieldAllowed = false`,
`availabilityFieldAllowed = false`, `aggregateRatingAllowed = false`,
`reviewAllowed = false` and `certificationMarkupAllowed = false`.

### 4.2 Allowed markup

- Today: **none** on any proposed MAREA route.
- After publication authorisation and a positive eligibility evaluation, the
  only MAREA node that could be considered is a `BreadcrumbList` for a published,
  navigable tree. Even that is not authorised today.
- Existing non-MAREA markup (`shopDetail` `Product`/`Offer`,
  `technologyDetail` `Product`/`SoftwareApplication`, home `Organization`/
  `WebSite`, `BreadcrumbList`, `Service`, `Article`, `ItemList`) is **untouched**
  and remains governed by the existing SEO gate. Its inherited risks
  (`WEB-013`, `WEB-014`) are not fixed or relabelled by MC-16.

A page can never upgrade a concept into a product through JSON-LD. Every JSON-LD
string must be supported by the rendered page and an approved claim.

## 5. Current routes preserved

| Class | Count | Treatment |
|---|---:|---|
| Public route ids | 21 | Unchanged; no MAREA route added |
| Admin route ids | 7 | Unchanged; private, never in sitemap |
| Total route ids | 28 | Unchanged |
| Indexable route ids | 16 | Unchanged |
| Conditionally indexable | 1 (`shopDetail`) | Existing rule; unchanged |
| Non-indexable | 11 | Existing rule; unchanged |
| Legacy redirect patterns | 3 | Active 301s preserved; no change |
| Dynamic route ids | 4 | Preserved |

Public ids: `home`, `technology`, `technologyDetail`, `experiences`, `delivery`,
`services`, `about`, `contact`, `guides`, `guideDetail`, `shop`, `shopDetail`,
`shopSample`, `cart`, `login`, `account`, `orderDetail`, `legalNotice`, `privacy`,
`cookies`, `termsOfSale`.

Admin ids: `admin`, `adminOrders`, `adminOrderDetail`, `adminProducts`,
`adminProductEdit`, `adminCustomers`, `adminMessages`.

Preservation rules: no canonical, hreflang, slug, redirect, sitemap, robots,
title, description or JSON-LD change is made by MC-16. The existing
`SEARCH_CONSOLE_VERIFIED_PARTIAL` sample and its open items (`GSC-01`, `GSC-02`)
are inherited unchanged. A hypothetical or planned route never enters the
sitemap.

## 6. Publication prerequisites (future, not met)

All of the following must be true before a single MAREA route can be published:

1. All 13 release gates closed with verified external evidence; no test pass,
   document draft or internal decision closes a gate.
2. Explicit publication authorisation from the required roles
   (`PROGRAMME_LEAD`, `COMMERCIAL_DIRECTOR`) and separate indexation
   authorisation.
3. Verified legal identity and seller terms (`GATE-LEGAL-ENTITY`,
   `GATE-CONSUMER-TERMS`).
4. Approved price with territory/channel/VAT basis and verified stock, if the
   page presents an offer (`GATE-PRICING`; `PRICE_APPROVED = NONE`).
5. Brand clearance and claims approval (`GATE-IP-CLEARANCE`,
   `GATE-COMMERCIAL-CLAIMS`); no "MAREA" public claim before clearance.
6. A decided structured-data authorisation per page type; `Product`/`Offer`
   still requires a separate product-eligibility decision.
7. Route-collision, canonical/hreflang, sitemap, redirect and rollback reviews;
   no page per edition or locale variant.
8. An approved MC-17 presentation contract and an accessible ES/EN page with
   truthful blocked-CTA states.

None is met. `MC17_STARTED = false`; `mc17ImplementationAuthorized = false`;
`publicUiChangeAuthorized = false`.

## 7. MC-17 handoff constraints

`data/mc17-handoff-inputs.json` fixes the presentation contract:

- one family page exposes zero or more editions; never one page per edition;
- edition display shows definition status and readiness labels; never a price or
  buy CTA;
- bundle display shows components and exclusions truthfully; never a fixed
  package price;
- all 23 proposed routes remain non-deployable;
- CTA states are limited to `DISABLED`, `COMING_SOON`, `REQUEST_INFORMATION`,
  `QUOTE_ONLY`, `NOT_AVAILABLE`;
- `buyCtaAllowed = false`, `priceVisible = false`, `availabilityVisible = false`,
  `cartAllowed = false`;
- ES and EN are one entity with localized content, not two SKUs;
- WCAG 2.2 AA, keyboard navigation, visible focus and no colour-only status.

## 8. Current proof and verification

| Check | Method | Result |
|---|---|---|
| 23 proposed routes | `publication-eligibility.json`; `proposed-routes.json` | 23 |
| All non-deployable | every route flags | `false` on all five; `PROPOSED_INTERNAL_NOT_DEPLOYABLE` |
| 0 published/indexable/sitemap | `currentState` | `0` each |
| 0 MAREA Product/Offer | `structuredDataPolicy`; route data | `false` each |
| 0 MAREA price/availability markup | same | `false` each |
| Current routes preserved | `currentRoutes`; `current-routes.json` summary | `preserved = true`, `changedByMc16 = false` |
| Publication evaluator denies | `domain.ts:648-667` | Denies on all current inputs |
| Data validator | `node scripts/check-marea-commerce-data.mjs` | 1,727/1,727 checks passed |

## 9. Acceptance criteria

| ID | Criterion | Current status |
|---|---|---|
| D15-AC-01 | Exactly 23 proposed routes, all `PROPOSED_INTERNAL_NOT_DEPLOYABLE` | **PASS** |
| D15-AC-02 | 0 MAREA routes published, indexed or sitemap-eligible | **PASS (current state)** |
| D15-AC-03 | No MAREA `Product`/`Offer` JSON-LD and no MAREA price/availability markup | **PASS (current state)** |
| D15-AC-04 | Current 21 public + 7 admin route ids preserved; no live SEO change | **PASS (current state)** |
| D15-AC-05 | Publication eligibility fails closed on open gates, missing authorisation, brand/price/offer conditions | **PASS (evaluator)** |
| D15-AC-06 | Future publication requires all gates, authorisations and evidence | **BLOCKED** — none met |

## 10. Open items

- All 13 gates are open; 24 required documents are unexecuted; 0 approved prices
  and 0 verified stock.
- No legal identity, seller terms, claims approval or trademark clearance.
- Search Console evidence remains partial (`SEARCH_CONSOLE_VERIFIED_PARTIAL`);
  `GSC-01`/`GSC-02` are inherited operational debt.
- No MC-17 implementation is authorised; no public MAREA page exists.
- The existing non-MAREA `Product`/`Offer` markup remains a recorded risk
  (`WEB-013`, `WEB-014`) and is intentionally untouched.

## 11. References

- `data/publication-eligibility.json` — 23 routes, structured-data policy,
  current-state counters.
- `data/mc17-handoff-inputs.json` — presentation and CTA contract.
- `data/proposed-routes.json` and `data/current-routes.json` — route identities,
  status vocabulary, preservation summary.
- `src/server/marea-commerce/domain.ts:648-667` — publication eligibility
  evaluator.
- `src/server/marea-commerce/schema.ts:342-353` — publication table with
  hard-coded zero flags.
- `docs/marea/information-architecture/MC15-STRUCTURED-DATA-GOVERNANCE.md:68-105, 131-188`
  — absolute structured-data restrictions and the 23-route matrix.
- `docs/marea/information-architecture/MC15-MC16-HANDOFF.md:262-301` — SEO and
  structured-data handoff.
- `MC16-SQLITE-SCHEMA-AND-MIGRATION-PLAN.md` (D13) — publication table.
- `MC16-MC17-HANDOFF.md` (D18) — downstream presentation handoff.

**Status statement.** This document authorises no publication, indexation,
sitemap entry, redirect or structured-data change. It records the current
blocked state and the conditions a future authorised milestone must satisfy.
