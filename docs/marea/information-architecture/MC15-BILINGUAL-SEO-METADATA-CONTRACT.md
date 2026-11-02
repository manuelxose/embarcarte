# MC-15 D11 — Bilingual SEO metadata contract (internal, gated)

| Field | Value |
|---|---|
| Deliverable | D11 `MC15-BILINGUAL-SEO-METADATA-CONTRACT.md` |
| Milestone | MC-15/36 — Bilingual information architecture, SEO route registry and migration planning |
| Status | `INTERNAL_PLANNING_ONLY` |
| Publication | `NOT_AUTHORIZED` |
| Live metadata change | `NOT_AUTHORIZED` |
| `MC16_STARTED` | `false` |
| Owner | `ia-content` |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Frozen base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Machine data | `data/bilingual-metadata.json` (`MAREA-MC15-BILINGUAL-METADATA`), 88 rows |
| Related | `data/proposed-routes.json`, `data/proposed-ia.json`, `data/structured-data-policy.json`, `data/indexation-policy.json`, `data/internal-link-graph.json` |

## 1. What this contract is

This is the **internal specification** of the title, description, robots, canonical, hreflang
and structured-data intent for every page in the current and proposed information architecture:
one row per `pageId` × `locale`, **88 rows** covering **44 page ids** (21 current public routes
and 23 proposed routes).

It is a contract, not an edit. No `title`, `meta description`, `robots`, `canonical`, `hreflang`
or JSON-LD value in the running site is changed by MC-15, and no proposed metadata can be
rendered while its route is `PROPOSED_INTERNAL_NOT_DEPLOYABLE`.

Two kinds of row exist, and the difference matters:

| Kind | `metadataStatus` | Meaning |
|---|---|---|
| Current page | `TARGET_TEMPLATE_NOT_IMPLEMENTED` | The template states the page intent and neutralises claim language that an MC-14 finding blocks. The value the repository renders **today** is recorded verbatim in `currentLiveValue` with its source file, so nothing is lost or silently rewritten |
| Proposed page | `GATED_INTERNAL_SPECIFICATION` | The template is a gated specification. It contains placeholders (`{{approvedBrand}}`, `{{familyName}}`, `{{readinessLabel}}`, …) and cannot be rendered publicly until the named gates open |

Every row carries `indexationAuthorized: false`: this contract authorizes no indexation, no
publication, no sitemap entry and no deployment for any page.

## 2. Sources of truth

| Source | Used for |
|---|---|
| `src/app/core/i18n/locale-routes.ts` | The 21 current route ids, their ES/EN paths and the locale model |
| `src/app/core/seo.service.ts` | How metadata is emitted: title plus the site-name suffix, robots string, canonical, alternates, `x-default` home only |
| Feature content files and `src/app/i18n/{es,en}.ts` | The verbatim current title/description recorded in `currentLiveValue` |
| `docs/marea/legal-commercial/data/website-findings.json` | The 34 `WEB-` findings attached per route (`openFindingIds`) |
| `docs/marea/legal-commercial/data/bilingual-claims.json` | The 42 `CLM-` claim records, their `releaseGate` and their bilingual pairs (`requiredClaimIds`) |
| `docs/marea/legal-commercial/data/release-evidence-gates.json` | The 13 gate ids used in `requiredClaimEvidence` and `commercialGate` |
| `data/indexation-policy.json` | Robots/canonical/sitemap policy classes (`IDX-*`) mirrored by `robotsPolicyClass` and `canonicalPolicyClass` |
| `data/structured-data-policy.json` | `schemaTypesAllowed` copied per page from its page identity matrix |
| `data/proposed-routes.json` / `proposed-ia.json` | The 23 proposed page ids, their gates and breadcrumb parents |

## 3. Coverage

| Dimension | Value |
|---|---|
| Metadata rows | 88 (44 page ids × 2 locales) |
| Current public routes | 21 |
| Proposed routes | 23 |
| Gated proposed rows | 46 |
| Private rows (cart, login, account, orderDetail) | 8 |
| Distinct page types | 31 (every type in the MC-15 contract list is used exactly once except PRODUCT_FAMILY ×9 and BUNDLE ×6) |
| Rows carrying WEB findings | 26 |
| Distinct WEB findings referenced | 32 of 34 (`WEB-012` and `WEB-032` are `/api/orders` behaviour, not page metadata) |
| Rows carrying CLM claim records | 28 |
| Distinct CLM claims referenced | 42 of 42 |
| Distinct gates referenced | 12 of 13 (`GATE-WEBSITE-REMEDIATION` is a remediation gate, not claim evidence) |

Page-type coverage: CORPORATE, TECHNOLOGY_LISTING, TECHNOLOGY_DETAIL, EXPERIENCE, DELIVERY,
SERVICE, ABOUT, CONTACT, GUIDE_LISTING, GUIDE_DETAIL, SHOP_LISTING, SHOP_DETAIL, SHOP_SAMPLE,
CART, LOGIN, ACCOUNT, ORDER_DETAIL, LEGAL_NOTICE, PRIVACY, COOKIES, TERMS_OF_SALE,
MAREA_OVERVIEW, PRODUCTS_OVERVIEW, SOLUTIONS_OVERVIEW, PRODUCT_FAMILY ×9, BUNDLE ×6,
CONFIGURATOR, PROFESSIONALS, INSTALLERS, SUPPORT, DOCUMENTATION.

## 4. Field dictionary

| Field | Type | Meaning |
|---|---|---|
| `pageId` | string | Route id from the contract vocabulary (equals the metadata page id) |
| `locale` | `es` \| `en` | One row per locale |
| `pageType` | enum | Page type from the contract list |
| `intent` | string | What the page must accomplish for the reader |
| `titleTemplate` | string | Target document title before `SeoService` appends the site-name suffix |
| `descriptionTemplate` | string | Target `meta description` |
| `robotsPolicy` | string | Contract target robots directive |
| `robotsPolicyClass` | `IDX-*` | Matching class in `indexation-policy.json` |
| `robotsPolicyObserved` | string | What the repository emits today for that class |
| `robotsCondition` | string | Present only where the directive is conditional |
| `canonicalPolicy` | enum | `SELF_CANONICAL` · `NONE` · `NONE_UNTIL_AUTHORIZED` · `SELF_CANONICAL_WHEN_TRANSLATED_OTHERWISE_NONE` |
| `canonicalPolicyClass` | enum | Matching canonical policy in `indexation-policy.json` |
| `hreflangGroup` | string | `GROUP-<pageId>` for a genuine translation pair, `NO_GROUP` otherwise |
| `hreflangGroupStatus` | enum | `PUBLISHED_PAIR` · `PRIVATE_NOINDEX_PAIR` · `NO_GROUP` · `PROPOSED_NOT_PUBLISHED` · `CONDITIONAL_PER_PRODUCT_TRANSLATION` |
| `schemaTypesAllowed` | string[] | Structured-data types permitted by `structured-data-policy.json` for that page |
| `breadcrumbParent` | routeId \| null | Breadcrumb ancestor; `null` only for `home` |
| `breadcrumbParentBasis` | enum | `SUPERIOR_PAGE` · `ROOT_NO_PARENT` |
| `internalLinkTargets` | routeId[] | Outgoing link targets; every one has a matching edge in `internal-link-graph.json` |
| `requiredClaimEvidence` | gateId[] | Gates whose evidence is required before the copy in the row may be published |
| `requiredClaimIds` | `CLM-*`[] | Claim records that govern the row (families, bundles, brand root) |
| `commercialGate` | gateId \| null | Primary gate that must open before any commercial framing appears |
| `publicationStatus` | string | `CURRENT_PAGE_PUBLISHED` or `PROPOSED_INTERNAL_NOT_DEPLOYABLE` |
| `metadataStatus` | enum | `CURRENT_REPOSITORY_VALUE_RECORDED` value holder, `TARGET_TEMPLATE_NOT_IMPLEMENTED` or `GATED_INTERNAL_SPECIFICATION` |
| `indexationAuthorized` | boolean | Always `false` in MC-15 |
| `sitemapEligible` | boolean | Policy eligibility; always `false` for proposed pages |
| `currentLiveValue` | object | For current pages: the verbatim repository title/description and its source file and lines |
| `openFindingIds` | `WEB-*`[] | Open MC-14 findings attached to the route |
| `notes` | string | Why the template differs from the live value, or why it is gated |

## 5. Placeholder vocabulary

Placeholders are internal syntax. They never reach a rendered page: a template that still
contains `{{…}}` cannot be published, because the implementation must resolve it from an approved
source first.

| Placeholder | Resolves from |
|---|---|
| `{{siteName}}` | `SITE.name` in `src/app/core/site.config.ts` (currently `Embarcarte`) |
| `{{approvedBrand}}` | Public brand name, usable only after `GATE-IP-CLEARANCE`; never the internal planning token |
| `{{familyName}}` | Approved public family name from the product contract |
| `{{bundleName}}` | Approved public bundle name from the bundle contract |
| `{{productName}}` | Product name from shop or technology data |
| `{{productKind}}` | Product kind label from the technology model |
| `{{productSummary}}` | Approved product summary that passes the claims policy |
| `{{guideTitle}}`, `{{guideSummary}}` | Guide content values |
| `{{sampleName}}`, `{{sampleSummary}}` | Sample product values (illustrative, not saleable) |
| `{{shopSectionLabel}}` | Shop section label from the dictionary |
| `{{shopEyebrow}}` | Current shop eyebrow, recorded for fidelity only |
| `{{readinessLabel}}` | Approved lifecycle label (`DEFINED` / `IN_DEFINITION` / `NOT_FOR_SALE`) |
| `{{approvedEvidence}}` | Evidence reference identifier approved by the owning gate |

## 6. Current pages — templates and recorded live values

The template column is the target intent. The live value is recorded in `currentLiveValue`
(with `src` path) and is **not** changed by MC-15.

| pageId | ES template | EN template | Live value recorded | Findings | Evidence gates |
|---|---|---|---|---|---|
| `home` | `{{siteName}} - Tecnología náutica y servicios para tu embarcación` | `{{siteName}} - Marine technology and boat services` | yes | WEB-016, WEB-021, WEB-033 | IP, CLAIMS |
| `technology` | `Tecnología náutica` | `Marine technology` | yes | WEB-003, WEB-015, WEB-029 | IP, CLAIMS |
| `technologyDetail` | `{{productName}}: {{productKind}}` | `{{productName}}: {{productKind}}` | yes (dynamic) | WEB-006, WEB-017, WEB-018, WEB-019, WEB-020, WEB-034 | IP, CLAIMS, MKT, SAFETY |
| `experiences` | `Experiencias y salidas en barco` | `Boat trips and marine experiences` | yes | WEB-026 | CLAIMS |
| `delivery` | `Traslado de embarcaciones` | `Boat delivery` | yes | — | — |
| `services` | `Instalación e integración de electrónica náutica` | `Marine electronics installation and integration` | yes | — | CLAIMS |
| `about` | `Sobre {{siteName}}` | `About {{siteName}}` | yes | WEB-022 | CLAIMS, IP |
| `contact` | `Contacto` | `Contact` | yes | — | — |
| `guides` | `Guías de navegación y electrónica náutica` | `Marine navigation and electronics guides` | yes | — | — |
| `guideDetail` | `{{guideTitle}}` | `{{guideTitle}}` | yes (dynamic) | — | — |
| `shop` | `Tienda de electrónica náutica: catálogo y estado de los productos` | `Marine electronics shop: catalogue and product status` | yes | WEB-004 (BLOCKING) | CLAIMS, PRICING, PAY |
| `shopDetail` | `{{productName}} — {{shopSectionLabel}}` | `{{productName}} — {{shopSectionLabel}}` | yes (dynamic) | WEB-013, WEB-014, WEB-027 | PRICING, PAY, CLAIMS, MKT |
| `shopSample` | `{{sampleName}}` | `{{sampleName}}` | yes (dynamic) | WEB-031 | CLAIMS |
| `cart` | `Carrito` | `Basket` | yes | WEB-011, WEB-023 | TERMS, PRICING, PAY |
| `login` | `Acceso clientes` | `Customer sign in` | yes | WEB-009, WEB-010 | PRIV, LEGAL |
| `account` | `Mi cuenta` | `My account` | yes | — | PRIV |
| `orderDetail` | `Pedido` | `Order` | yes | — | TERMS |
| `legalNotice` | `Aviso legal` | `Legal notice` | yes | WEB-001, WEB-002, WEB-005, WEB-025 | LEGAL, IP, CLAIMS |
| `privacy` | `Política de privacidad` | `Privacy policy` | yes | WEB-007, WEB-008 | PRIV, LEGAL |
| `cookies` | `Política de cookies` | `Cookie policy` | yes | — (risk tracked on `/acceso`) | LEGAL, PRIV |
| `termsOfSale` | `Condiciones de venta` | `Terms of sale` | yes | WEB-024, WEB-028, WEB-030 | TERMS, PRICING, LEGAL |

Three templates deliberately differ from the live value, each because a named finding blocks the
live claim:

| Page | Live problem (recorded verbatim in `currentLiveValue`) | Template decision |
|---|---|---|
| `shop` | ES "Compra el ordenador de navegación…" and EN "Buy the Open Marine Hub…" instruct a purchase while the portfolio is `NOT_FOR_SALE` (WEB-004, BLOCKING) | Catalogue statement, no buying verb, no brand keyword. Matches D15 remediation plan §6.3 |
| `technology` | ES "Tecnología náutica abierta Open Marine" asserts ownership/origin (WEB-003) and uses the brand as a keyword (WEB-015) | Neutral "Tecnología náutica" / "Marine technology" |
| `home`, `about` | Brand keyword and unverified service/capability wording (WEB-016, WEB-021, WEB-022) | Neutral company description with `{{siteName}}` |

Everything else is a faithful neutralisation-free transcription of intent; where the live copy is
already neutral, the template equals it.

## 7. Proposed pages — gated specifications

Forty-six rows (23 pages × 2 locales) are `GATED_INTERNAL_SPECIFICATION`. They share one rule
set:

1. **No literal brand token.** The planning brand token never appears in `titleTemplate` or
   `descriptionTemplate`; the brand is a placeholder (`{{approvedBrand}}`) that only
   `GATE-IP-CLEARANCE` can authorise.
2. **No forbidden public-claim token.** No buy / order / pre-order / add-to-cart / checkout /
   price / currency amount / in-stock / available-now / certified / CE / NMEA-2000-certified /
   guaranteed / official charts / official weather / autonomous / self-steering / collision
   avoidance / rating / review wording.
3. **No availability, rating or price markup language.**
4. **Robots and canonical are closed:** `noindex,nofollow` and `NONE_UNTIL_AUTHORIZED`;
   `sitemapEligible: false`; `indexationAuthorized: false`.
5. **Readiness is a placeholder.** The lifecycle state is `{{readinessLabel}}` because the
   approved label is not decided for any family.

| pageId | ES title template | EN title template | Primary gate | Claim records |
|---|---|---|---|---|
| `mareaOverview` | `Productos y soluciones para tu embarcación` | `Products and solutions for your vessel` | CLAIMS | CLM-008, 010, 025, 026, 027, 028, 029, 030, 031, 032, 038, 041 (portfolio-level) |
| `mareaProducts` | `Productos: familias y ediciones previstas` | `Products: families and planned editions` | CLAIMS | — |
| `mareaSolutions` | `Soluciones: paquetes por uso` | `Solutions: use-case packages` | PRICING | — |
| `mareaFamilyNav` | `{{familyName}}: navegación` | `{{familyName}}: navigation` | CLAIMS | CLM-001, 002, 003, 004, 007, 009, 011, 012, 019, 039 |
| `mareaFamilyHub` | `{{familyName}}: conexión de datos a bordo` | `{{familyName}}: on-board data connection` | CLAIMS | CLM-005, 006, 014, 015, 018, 033 |
| `mareaFamilyAis` | `{{familyName}}: recepción de tráfico AIS` | `{{familyName}}: AIS traffic reception` | CLAIMS | CLM-016, 021, 036 |
| `mareaFamilyPilot` | `{{familyName}}: gobierno asistido bajo supervisión` | `{{familyName}}: supervised assisted steering` | SAFETY | CLM-020, 035 |
| `mareaFamilySense` | `{{familyName}}: sensórica a bordo` | `{{familyName}}: on-board sensors` | CLAIMS | — |
| `mareaFamilyWatch` | `{{familyName}}: supervisión remota` | `{{familyName}}: remote monitoring` | CLAIMS | CLM-022, 042 |
| `mareaFamilyDisplay` | `{{familyName}}: pantallas a bordo` | `{{familyName}}: on-board displays` | CLAIMS | CLM-017 |
| `mareaFamilyWeather` | `{{familyName}}: información meteorológica` | `{{familyName}}: weather information` | DATA | CLM-013, 024, 040 |
| `mareaFamilyFleet` | `{{familyName}}: gestión de flotas` | `{{familyName}}: fleet management` | CRA | CLM-023, 034, 037 |
| `mareaSolutionStart` | `START: paquete de inicio` | `START: entry package` | CLAIMS | CLM-005 |
| `mareaSolutionCruise` | `CRUISE: paquete de crucero` | `CRUISE: cruising package` | CLAIMS | CLM-011, 013, 036 |
| `mareaSolutionSail` | `SAIL: paquete de vela` | `SAIL: sailing package` | CLAIMS | CLM-020, 035 |
| `mareaSolutionProtect` | `PROTECT: paquete de supervisión` | `PROTECT: monitoring package` | CLAIMS | CLM-022, 042 |
| `mareaSolutionComplete` | `COMPLETE: paquete completo` | `COMPLETE: complete package` | CLAIMS | — |
| `mareaSolutionFleet` | `FLEET: paquete de flota` | `FLEET: fleet package` | CLAIMS | CLM-023, 037 |
| `mareaConfigurator` | `Configurador de compatibilidad` | `Compatibility configurator` | PRICING | — |
| `professionals` | `Para profesionales` | `For professionals` | TERMS | — |
| `installers` | `Programa para instaladores` | `Installer programme` | TERMS | — |
| `support` | `Soporte` | `Support` | CRA | — |
| `productDocumentation` | `Documentación de {{familyName}}` | `{{familyName}} documentation` | CRA | — |

Gate abbreviations: IP = `GATE-IP-CLEARANCE`, CLAIMS = `GATE-COMMERCIAL-CLAIMS`,
PRICING = `GATE-PRICING`, PAY = `GATE-PAYMENTS`, TERMS = `GATE-CONSUMER-TERMS`,
LEGAL = `GATE-LEGAL-ENTITY`, PRIV = `GATE-PRIVACY-DPA-DPIA`, MKT = `GATE-MARKET-PLACEMENT`,
SAFETY = `GATE-SAFETY-PILOT`, DATA = `GATE-DATA-LICENSING`,
CRA = `GATE-CRA-CYBERSECURITY`.

Family and bundle descriptions are deliberately **limits-first** ("en definición", "sujeta a
verificación", "solo recepción", "gobierno asistido bajo supervisión", "pronóstico
probabilístico", "sin SLA"): they describe what the product is intended to be and what it is not,
which is the only claim class available before the gates open.

## 8. Robots policy

| Class | Pages | `robotsPolicy` (target) | Observed today | Sitemap |
|---|---|---|---|---|
| `IDX-EXISTING-PUBLIC-CLEAN` | delivery, services, contact, guides, guideDetail, about, experiences, home, technology, technologyDetail | `index, follow, max-image-preview:large` | same | eligible |
| `IDX-EXISTING-LEGAL-PAGES` | legalNotice, privacy, cookies, termsOfSale | `index, follow, max-image-preview:large` | same | eligible |
| `IDX-DYNAMIC-SHOP-DETAIL` (ES) | shopDetail | `index, follow, max-image-preview:large` | same | eligible |
| `IDX-UNTRANSLATED-EN-SURFACE` (EN) | shopDetail | `conditional: index, follow… when an approved EN translation exists; otherwise noindex, follow with no EN alternate` | `index, follow…` when translated, `noindex, follow` otherwise | not eligible untranslated |
| `IDX-SAMPLE-PRODUCTS` | shopSample | `noindex, follow` | same | not eligible |
| `IDX-PRIVATE-CLIENT-AREA` | cart, login, account, orderDetail | `noindex, follow` (meta) + `noindex, nofollow` (served shell header) | `noindex, follow` meta and `noindex, nofollow` header | not eligible |
| `IDX-MAREA-PROPOSED-PAGES` | all 23 proposed pages | `noindex,nofollow` | none (routes do not resolve) | not eligible |

Row counts: 31 `index…` rows, 46 `noindex,nofollow` proposed rows, 10 `noindex, follow` existing
private/sample rows, 1 conditional row, 31 rows with `sitemapEligible: true` and 57 with `false`.

**Private-page reconciliation (resolved in integration).** The metadata contract now preserves the
observed private-page behaviour instead of proposing a stricter future directive: `noindex, follow`
is the meta directive `SeoService` emits, and the served client shell additionally sends
`X-Robots-Tag: noindex, nofollow`. The 23 proposed pages remain `noindex,nofollow` because they are
not served at all today (`/marea` and `/marea/*` answer 404). `robotsPolicyObserved` records the
observed value or `none (route does not resolve)` for a proposed route. No live metadata is changed
in MC-15.

## 9. Canonical and hreflang

| Policy | Pages |
|---|---|
| `SELF_CANONICAL` | Every indexable current page, per locale |
| `SELF_CANONICAL_WHEN_TRANSLATED_OTHERWISE_NONE` | `shopDetail` EN |
| `NONE` | cart, login, account, orderDetail (private) |
| `NONE_UNTIL_AUTHORIZED` | All 23 proposed pages |

`hreflangGroup` is `GROUP-<pageId>` only where a genuine translation pair exists, and `NO_GROUP`
for `shopSample`. Group status:

| Status | Pages | Meaning |
|---|---|---|
| `PUBLISHED_PAIR` | 15 current public pages (30 rows) | Reciprocal ES/EN pair, self-referencing, as the repository emits today |
| `PRIVATE_NOINDEX_PAIR` | cart, login, account, orderDetail | A real translation pair for the language switcher, but never an indexable pair |
| `CONDITIONAL_PER_PRODUCT_TRANSLATION` | shopDetail | The EN alternate exists only when the product has a complete EN translation; otherwise no alternate is emitted |
| `NO_GROUP` | shopSample | No alternates (the repository sets `alternates: []` for samples) |
| `PROPOSED_NOT_PUBLISHED` | All 23 proposed pages | A genuine future translation pair that must not be published, linked with hreflang, or placed in a sitemap today |

`x-default` remains home-only and is not modelled per page here; it is a single site-level rule in
`SeoService`/`pageSeo`.

## 10. Claim evidence and commercial gates

`requiredClaimEvidence` lists gate ids only (real ids from
`release-evidence-gates.json`); `requiredClaimIds` lists the `CLM-` records that govern the row;
`commercialGate` names the single gate that must open before any commercial framing appears.

| Surface | Claim records | Gates in `requiredClaimEvidence` |
|---|---|---|
| `mareaOverview` | portfolio-level CLM set (12 records) | IP, CLAIMS, TERMS, LEGAL |
| `mareaProducts` | — | IP, CLAIMS, LEGAL |
| `mareaSolutions` | — | IP, CLAIMS, PRICING |
| NAV family | CLM-001, 002, 003, 004, 007, 009, 011, 012, 019, 039 | IP, CLAIMS, PRICING, DATA |
| HUB family | CLM-005, 006, 014, 015, 018, 033 | IP, CLAIMS, MKT, CRA |
| AIS family | CLM-016, 021, 036 | IP, CLAIMS, MKT |
| PILOT family | CLM-020, 035 | IP, CLAIMS, SAFETY |
| SENSE family | none | IP, CLAIMS |
| WATCH family | CLM-022, 042 | IP, CLAIMS, INS |
| DISPLAY family | CLM-017 | IP, CLAIMS, MKT |
| WEATHER family | CLM-013, 024, 040 | IP, CLAIMS, DATA |
| FLEET family | CLM-023, 034, 037 | IP, CLAIMS, CRA |
| START bundle | CLM-005 | IP, CLAIMS |
| CRUISE bundle | CLM-011, 013, 036 | IP, CLAIMS, DATA, MKT |
| SAIL bundle | CLM-020, 035 | IP, CLAIMS, SAFETY |
| PROTECT bundle | CLM-022, 042 | IP, CLAIMS, INS |
| COMPLETE bundle | none | IP, CLAIMS |
| FLEET bundle | CLM-023, 037 | IP, CLAIMS, CRA |
| `mareaConfigurator` | — | CLAIMS, PRICING, DATA, PRIV, SAFETY |
| `professionals`, `installers` | — | CLAIMS, TERMS, LEGAL |
| `support`, `productDocumentation` | — | CLAIMS, CRA (+ DATA and SAFETY for documentation) |

No gate is recorded as open, satisfied or closed anywhere in this contract. A gate id here means
"this evidence does not exist yet and blocks the row".

## 11. Structured data

`schemaTypesAllowed` is copied from `structured-data-policy.json`'s page identity matrix, so the
two datasets cannot disagree:

| Page group | Allowed types |
|---|---|
| home | Organization, WebSite |
| technologyDetail | BreadcrumbList, Product, SoftwareApplication (existing technology pages only) |
| guides/guideDetail | BreadcrumbList, Article |
| delivery | BreadcrumbList, Service |
| shop | BreadcrumbList, ItemList |
| shopDetail | BreadcrumbList, Product, Offer |
| other current pages | BreadcrumbList or none |
| every proposed page | none — Product, Offer, SoftwareApplication, Service, Article, ItemList, Review and AggregateRating are all forbidden while the pages are blocked |

No proposed page may emit structured data, and no price, availability, rating or certification
value may appear in any JSON-LD governed by this contract.

## 12. What is explicitly not authorized

- No change to any live `<title>`, description, robots directive, canonical, hreflang, JSON-LD,
  sitemap or navigation.
- No rendering of any proposed template, and no publication of the literal planning brand token
  in public metadata.
- No claim, price, availability, certification, rating or performance statement in any row.
- No new gate outcome: every gate remains open or blocked exactly as MC-14 recorded it.
- No indexation of the proposed layer: `indexationAuthorized: false`, `sitemapEligible: false`.

## 13. Open decisions

| Id | Decision | Blocks | Owner |
|---|---|---|---|
| D11-OD-01 | **Resolved in integration:** private pages keep `noindex, follow` meta plus the `noindex, nofollow` shell header; only the unserved proposed pages use `noindex,nofollow` | Robots policy before implementation | Lead + SEO owner |
| D11-OD-02 | Whether existing metadata is replaced by these templates in one release or page by page after each finding closes | Migration sequencing | Lead |
| D11-OD-03 | Whether the shop keeps `ItemList` once commerce is closed, or drops structured data entirely | Structured-data policy alignment | Commercial director |
| D11-OD-04 | Whether `shopDetail` EN keeps a canonical when it is noindex, or drops it | Canonical policy for untranslated surfaces | SEO owner |
| D11-OD-05 | Which approved label resolves `{{readinessLabel}}` for each family and whether it is displayed in the meta description at all | Proposed metadata readiness | Product governance |
| D11-OD-06 | Whether proposed pages carry any structured data at all once authorised (no type is planned today) | Future structured-data scope | SEO owner |

## 14. Verification record

| Check | Result |
|---|---|
| `node` JSON parse of both datasets | 3 datasets parse, no BOM, UTF-8 |
| Item count assertion | 88 items, 44 page ids, 2 locales each |
| Page-id coverage | 21 current + 23 proposed, none missing, none duplicated |
| Template token scan | No literal brand token, no forbidden claim token, no price and no availability/rating token in the 46 proposed rows |
| Link target resolution | Every `internalLinkTarget` and every `breadcrumbParent` resolves to a real route id |
| Gate/claim resolution | Every `requiredClaimEvidence`/`commercialGate` is one of the 13 gate ids; every `requiredClaimIds` entry is a real `CLM-` id |
| Milestone validator (`scripts/check-marea-ia-seo.mjs`, metadata and link-graph sections) | 0 errors attributable to these two datasets |
