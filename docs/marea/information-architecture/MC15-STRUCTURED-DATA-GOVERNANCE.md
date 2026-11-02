# D10 — Structured-data governance (MC-15)

| Field | Value |
|---|---|
| Deliverable | D10 `MC15-STRUCTURED-DATA-GOVERNANCE.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Owner | `seo-migration` |
| Machine data | `data/structured-data-policy.json` (`MAREA-MC15-STRUCTURED-DATA-POLICY`) — 9 schema types, 45 page identities |
| Base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Date | 2026-11-02 |
| Status | `INTERNAL_PLANNING_ONLY` |
| Live markup change | `NOT_AUTHORIZED` |
| MC16_STARTED | `false` |

## 1. Boundary

This document is an **inventory plus a prohibition set**, not an implementation. It does not add,
remove or edit a single JSON-LD node. The existing non-MAREA commerce markup
(`shopDetail` `Product`/`Offer`, `technologyDetail` `Product`/`SoftwareApplication`) is inventoried
as an **existing risky pattern** and is explicitly **not modified** by MC-15: changing it would be a
live SEO change on an indexed page and is out of scope.

Everything below is enforced through policy and, later, an authorised implementation milestone.

## 2. Current structured-data inventory (repository-verified)

| Page | Node(s) emitted today | Source | Notes |
|---|---|---|---|
| home (both locales) | `Organization`, `WebSite` | `src/app/features/home/home.ts:103-113` | `Organization` carries name, url, logo, email, optional `sameAs`; `WebSite` carries `inLanguage`. No `legalName`, `taxID`, `address` — `SITE.legal` fields are empty. |
| technology index | `BreadcrumbList` | `src/app/features/technology/technology.ts:106` | single-item breadcrumb |
| technology detail | `BreadcrumbList`, plus `Product` (hardware) or `SoftwareApplication` (software) | `src/app/features/technology/product-detail.ts:115-127` | brand `Open Marine`; no `offers`, no `availability`, no price. `SoftwareApplication` carries `applicationCategory: NavigationApplication`, `operatingSystem: Web`. |
| experiences | `BreadcrumbList` | `experiences.ts:85` | — |
| delivery | `BreadcrumbList`, `Service` | `delivery.ts:67-76` | `Service.serviceType: "Traslado de embarcaciones"`, provider `Organization Embarcarte`; no price, no availability |
| services | `BreadcrumbList` | `services.ts:65` | — |
| about | `BreadcrumbList` | `about.ts:62` | — |
| contact | `BreadcrumbList` | `contact.ts:125` | — |
| guides index | `BreadcrumbList` | `guides.ts:125-132` | — |
| guide detail | `BreadcrumbList`, `Article` | `guides.ts:133-144` | headline, description, `inLanguage`, `mainEntityOfPage`, publisher `Organization Embarcarte`; no dates, no author |
| shop index | `BreadcrumbList`, `ItemList` | `shop-list.ts:104-120` | `ItemList` is emitted only after the catalogue loads, so it never names products absent from the page |
| shop detail | `BreadcrumbList`, `Product`, `Offer` | `shop-detail.ts:140-165` | see §3 |
| shop sample | none | `sample-detail.ts` | correct: an example is not a product |
| legal pages (4) | none | `legal.ts` | no breadcrumb today |
| private pages (4) | none | — | — |
| admin (7) | none | — | — |
| 404 | none | `not-found.ts` | — |
| any MAREA identity | **none** | — | the URLs do not exist (`404` observed) |

`scripts/check-seo.mjs` whitelists exactly `Organization, WebSite, BreadcrumbList, Product, Offer,
SoftwareApplication, Article, ItemList, Service` and fails on any other `@type` — so an unapproved
new type would break the inherited SEO gate.

## 3. Existing risky patterns tied to MC-14 findings (inventory only)

| Pattern | Detail | Findings | Risk if it stays unmanaged |
|---|---|---|---|
| `shopDetail` `Product` + `Offer` | `brand: Open Marine`; `sku: product.slug`; `price` = `(price_cents/100).toFixed(2)` straight from the admin-editable database column; `availability` = `InStock` when `stock > 0`, else `OutOfStock`; `seller: Organization Embarcarte` | **WEB-013** (price), **WEB-014** (structured data), **WEB-027** (safety/compat copy), plus **WEB-001/WEB-002** (seller legal identity empty) | markup can state a purchasable offer and a seller identity that the company cannot yet legally substantiate; an admin-entered price becomes a machine-readable claim |
| `shopDetail` stock-driven availability | `stock` is an admin field, not a fulfilment system | WEB-004 (availability), WEB-014 | `InStock` may be asserted without orderable inventory |
| `technologyDetail` `Product` (hardware) | brand `Open Marine`, name/description/url/image, **no** offers | **WEB-003** (ownership/open-source), **WEB-018/WEB-020** (compatibility/claims on Hub), **WEB-006/WEB-019/WEB-034** (autopilot safety), **WEB-017** (navigator safety) | the node can present an existing hardware concept as a defined product; claims live in `name`/`description` |
| `technologyDetail` `SoftwareApplication` | `applicationCategory`, `operatingSystem` | WEB-003, WEB-015 | implies a defined software product; the category/OS values must not be extended or invented |
| `shop` `ItemList` | items from the loaded catalogue | WEB-004 | a list node makes availability claims implicit; it must stay tied to what is rendered |
| home `Organization` / `WebSite` | no legal identity, no `sameAs` while `SITE.social` is empty | **WEB-001, WEB-002, WEB-005, WEB-025**, WEB-016, WEB-021, WEB-033 | a publisher node without a registered identity weakens every downstream claim |
| `Article` on guides | publisher Organization, no dates/author | WEB-022 (claims elsewhere), WEB-003 | inventing dates/authors would be fabrication; absence is currently the honest choice |
| `Service` on delivery | provider Organization | WEB-001 | a service offer needs the same legal identity as a product offer |

These eight patterns stay exactly as they are in MC-15. Their remediation is owned by D14
(`MC15-WEBSITE-FINDINGS-REMEDIATION`) and requires the gates named in §5.

## 4. Absolute restrictions (binding on every future page)

1. **No `Product` or `Offer` JSON-LD for any MAREA identity** — family, edition, bundle, concept or
   documentation page — while the gates are closed.
2. **No price**: no `price`, `priceCurrency`, `priceRange`, `priceSpecification`, `lowPrice`,
   `highPrice`, "from €", or any hypothetical/placeholder value. A price may only come from an
   approved price list and the server-authoritative product record.
3. **No availability**: no `availability`, `InStock`, `OutOfStock`, `PreOrder`, `BackOrder`,
   `PreSale`, `LimitedAvailability` and no free-text "coming soon" availability signal.
4. **No unapproved seller**: no `seller`, `provider`, `manufacturer` or `brand` Organization that is
   not legally identified and approved. `SITE.legal` is empty today.
5. **No fabricated social proof**: no `aggregateRating`, `ratingValue`, `reviewCount`, `review`,
   `Review`, `testimonial` or `award` for MAREA **or** for EMBARCARTE. None exists today (verified:
   zero matches for `aggregateRating|ratingValue|reviewCount` in `src`).
6. **No unsupported certification**: no CE, RED, EMC, NMEA 2000, wheelmark, "certified", "approved",
   GDPR/cyber certification, or conformity claim.
7. **No claim stronger than the visible copy**: every string in JSON-LD must appear, or be directly
   supported, in the rendered page. Structured data may not upgrade a "concept" into a product.
8. **Product eligibility is gated independently of page publication.** A page can exist, be
   indexable and carry a `BreadcrumbList` while `Product`/`Offer` remain unauthorised. The reverse
   is never allowed.
9. **No MAREA node may reuse an EMBARCARTE entity identity**: `entityId` values are distinct and a
   MAREA page may not declare itself the same entity as an existing technology product.
10. **No `SearchAction`, no `Event`, `FAQPage`, `HowTo` or `JobPosting`** on a MAREA page while its
    content is unauthorised.

## 5. Page-type matrix (9 schema types)

| Type | Allowed on | Forbidden | Required evidence | Gate |
|---|---|---|---|---|
| `Organization` | home only (as publisher/seller) | `Review`, `AggregateRating`, `Product`, `Offer`, `Service`; MAREA as public brand | verified registered name, tax ID, address, registry and contact; approved description | `GATE-LEGAL-ENTITY` |
| `WebSite` | home only | `SearchAction` (no published internal search), `Product`, `Offer` | verified site name/URL; `inLanguage` matching the rendered locale | `GATE-WEBSITE-REMEDIATION` |
| `BreadcrumbList` | every indexable existing page with a navigable parent | proposed/private/login/redirecting targets in the trail | breadcrumb derived from `LOCALIZED_ROUTES` and matching visible navigation; depth ≤ 4 | `GATE-WEBSITE-REMEDIATION` |
| `Article` | `guideDetail` only | `NewsArticle`, invented dates/authors, product claims | real guide content with visible headline/description; truthful publisher | `GATE-COMMERCIAL-CLAIMS` |
| `Service` | `delivery` only (existing) | price, availability, rating, certification | a service actually offered, truthful scope, provider identity, applicable terms | `GATE-CONSUMER-TERMS` |
| `ItemList` | `shop` index (existing) | MAREA items, items not rendered, 404 targets | list built only from products actually shown | `GATE-COMMERCIAL-CLAIMS` |
| `Product` | existing non-MAREA `shopDetail` and `technologyDetail` **only** | **any MAREA identity**; `AggregateRating`; `Review`; certification; `InStock` without orderable stock | active product, approved price/stock provenance, approved copy, verified seller for commerce; no offer for technology detail | `GATE-PRICING` |
| `Offer` | nested in the existing non-MAREA `shopDetail` `Product` | **any MAREA identity**; hypothetical price; availability without stock; quote-only pages | approved price list with VAT basis and territory, orderable stock, fulfilment, signed terms | `GATE-PRICING` |
| `SoftwareApplication` | existing `technologyDetail` for `Software`-kind products | **any MAREA page**; price/availability; invented `operatingSystem`/`applicationCategory`; ratings | a real software entity, described without certification or performance claims | `GATE-COMMERCIAL-CLAIMS` |

## 6. Page-identity matrix

### 6.1 Existing pages (21 route ids)

| pageId | Allowed today | Forbidden | Gate |
|---|---|---|---|
| `home` | `Organization`, `WebSite` | ratings, reviews, `SearchAction`, product nodes, MAREA brand | `GATE-LEGAL-ENTITY` |
| `technology` | `BreadcrumbList` | product/offer nodes on the index, MAREA rows | `GATE-COMMERCIAL-CLAIMS` |
| `technologyDetail` | `BreadcrumbList`, `Product`, `SoftwareApplication` (existing) | `Offer`, price, availability, certification, ratings | `GATE-COMMERCIAL-CLAIMS` |
| `experiences` | `BreadcrumbList` | product/offer/service-with-price | `GATE-COMMERCIAL-CLAIMS` |
| `delivery` | `BreadcrumbList`, `Service` | price, availability, ratings | `GATE-CONSUMER-TERMS` |
| `services` | `BreadcrumbList` | product/offer | `GATE-COMMERCIAL-CLAIMS` |
| `about` | `BreadcrumbList` | `Organization` duplication with invented data, awards, ratings | `GATE-COMMERCIAL-CLAIMS` |
| `contact` | `BreadcrumbList` | `Organization` with unverified address | `GATE-LEGAL-ENTITY` |
| `guides` | `BreadcrumbList` | `Article` on the index, `ItemList` of guides | `GATE-COMMERCIAL-CLAIMS` |
| `guideDetail` | `BreadcrumbList`, `Article` | invented dates/authors, ratings | `GATE-COMMERCIAL-CLAIMS` |
| `shop` | `BreadcrumbList`, `ItemList` | `Product`/`Offer` on the index, MAREA items | `GATE-COMMERCIAL-CLAIMS` |
| `shopDetail` | `BreadcrumbList`, `Product`, `Offer` (existing commerce) | MAREA nodes, hypothetical price, `InStock` without stock, ratings, certification, unapproved seller | `GATE-PRICING` |
| `shopSample` | none | `Product`, `Offer`, ratings — a sample is not saleable | `GATE-COMMERCIAL-CLAIMS` |
| `cart`, `login`, `account`, `orderDetail` | none | any node (private data, session identifiers) | `GATE-PRIVACY-DPA-DPIA` |
| `legalNotice`, `privacy`, `cookies`, `termsOfSale` | none today | `Organization` with unverified identity; `Service`/`Product` | `GATE-LEGAL-ENTITY` |
| admin (7 route ids) | none | any node | `GATE-PRIVACY-DPA-DPIA` |

### 6.2 Proposed pages (23 route ids)

All 23 are `PROPOSED_INTERNAL_NOT_DEPLOYABLE`: **allowed types = none** today; `BreadcrumbList` only
after publication authorisation; `Product`, `Offer`, `AggregateRating`, `Review`,
`SoftwareApplication`, `Service`, `Article`, `ItemList` and any price/availability/certification
statement are forbidden while the gates are closed.

Evidence profiles:

| Profile | Required evidence |
|---|---|
| `EP-PUB` | publication **and** indexation authorisation, the entity's blocking gates open, one approved claim record per visible claim, verified legal identity, a decided structured-data authorisation for the page type |
| `EP-FAMILY` | `EP-PUB` + family lifecycle `DEFINED` + family-specific decisions (PILOT `GATE-SAFETY-PILOT`; AIS receive-only, no transmission; WATCH no guaranteed alerts; WEATHER probabilistic data + `GATE-DATA-LICENSING`; FLEET B2B tenancy terms; NAV "navigational aid" boundary; SENSE measurement boundaries; DISPLAY/HUB conformity and compatibility evidence `GATE-MARKET-PLACEMENT`) |
| `EP-BUNDLE` | `EP-PUB` + approved bundle composition and exclusions (no price, no availability, no configured total) |
| `EP-TOOL` | `EP-PUB` + deterministic, tested compatibility rules; the tool may never assert a configuration it cannot prove |
| `EP-CORP` | `EP-PUB` + legal identity and approved professional/installer programme terms |
| `EP-DOC` | `EP-PUB` + rights to publish the documents (`GATE-IP-CLEARANCE`, `GATE-DATA-LICENSING` where data are included) |

| pageId | Entity | Evidence profile |
|---|---|---|
| `mareaOverview` | `ENT-HUB-MAREA` | `EP-PUB` |
| `mareaProducts` | `ENT-HUB-PRODUCTS` | `EP-PUB` |
| `mareaSolutions` | `ENT-HUB-SOLUTIONS` | `EP-BUNDLE` |
| `mareaFamilyNav` | `ENT-FAMILY-NAV` | `EP-FAMILY` |
| `mareaFamilyHub` | `ENT-FAMILY-HUB` | `EP-FAMILY` |
| `mareaFamilyAis` | `ENT-FAMILY-AIS` | `EP-FAMILY` |
| `mareaFamilyPilot` | `ENT-FAMILY-PILOT` | `EP-FAMILY` |
| `mareaFamilySense` | `ENT-FAMILY-SENSE` | `EP-FAMILY` |
| `mareaFamilyWatch` | `ENT-FAMILY-WATCH` | `EP-FAMILY` |
| `mareaFamilyDisplay` | `ENT-FAMILY-DISPLAY` | `EP-FAMILY` |
| `mareaFamilyWeather` | `ENT-FAMILY-WEATHER` | `EP-FAMILY` |
| `mareaFamilyFleet` | `ENT-FAMILY-FLEET` | `EP-FAMILY` |
| `mareaSolutionStart` | `ENT-BUNDLE-START` | `EP-BUNDLE` |
| `mareaSolutionCruise` | `ENT-BUNDLE-CRUISE` | `EP-BUNDLE` |
| `mareaSolutionSail` | `ENT-BUNDLE-SAIL` | `EP-BUNDLE` |
| `mareaSolutionProtect` | `ENT-BUNDLE-PROTECT` | `EP-BUNDLE` |
| `mareaSolutionComplete` | `ENT-BUNDLE-COMPLETE` | `EP-BUNDLE` |
| `mareaSolutionFleet` | `ENT-BUNDLE-FLEET` | `EP-BUNDLE` |
| `mareaConfigurator` | `ENT-TOOL-CONFIGURATOR` | `EP-TOOL` |
| `professionals` | `ENT-PAGE-PROFESSIONALS` | `EP-CORP` |
| `installers` | `ENT-PAGE-INSTALLERS` | `EP-CORP` |
| `support` | `ENT-PAGE-SUPPORT` | `EP-CORP` |
| `productDocumentation` | `ENT-DOC-PRODUCT` | `EP-DOC` |

## 7. Product eligibility is gated separately from publication

A published MAREA page is **not** a product offer. Four independent decisions must all be positive
before a `Product`/`Offer` node could ever exist for a MAREA identity:

| Decision | Current value | Gate |
|---|---|---|
| Page published | `false` | MC-16 publication authorisation |
| Entity lifecycle orderable (`OPERATIONS READY`) | `NOT_FOR_SALE` | lifecycle decision |
| Price approved + stock real + fulfilment proven | `PRICE_APPROVED = NONE`, no stock system | `GATE-PRICING` |
| Seller identity + commercial terms approved | `SITE.legal` empty, terms unsigned | `GATE-LEGAL-ENTITY`, `GATE-CONSUMER-TERMS` |

Until all four are true, the correct markup for a MAREA page is a `BreadcrumbList` only — and even
that only after the page is published.

## 8. Verification and limits

| Check | Method | Result |
|---|---|---|
| 9 schema types covered | dataset inspection | 9 (`Organization`, `WebSite`, `BreadcrumbList`, `Article`, `Service`, `ItemList`, `Product`, `Offer`, `SoftwareApplication`) |
| 45 page identities covered | dataset inspection | 21 existing + 23 proposed + admin group |
| No `aggregateRating`/`Review` anywhere in `src` | repository grep | 0 matches |
| No MAREA `Product`/`Offer` node authorised | dataset inspection | 0 authorised nodes |
| Existing commerce markup untouched | no file outside `docs/` modified in this deliverable | holds |
| JSON-LD re-observed over HTTP in this task | not performed | **not claimed**; the inventory is `REPOSITORY_VERIFIED` |
| Google rich-result eligibility | not testable without external tooling | `UNVERIFIED` |

Nothing in this document authorises new markup, a price, a stock state, a seller identity, a rating,
a review or a certification for MAREA. It authorises exactly one behaviour: keeping the current
markup unchanged while the gates are closed.
