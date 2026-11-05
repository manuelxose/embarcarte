# MC-15 D06 — Slug and entity identity governance (non-deployable)

| Field | Value |
|---|---|
| Deliverable | D06 `MC15-SLUG-AND-ENTITY-IDENTITY-GOVERNANCE.md` |
| Milestone | MC-15/36 — Bilingual information architecture, SEO route registry and migration planning |
| Status | `INTERNAL_PLANNING_ONLY` |
| Publication | `NOT_AUTHORIZED` |
| Live route or redirect change | `NOT_AUTHORIZED` |
| `MC16_STARTED` | `false` |
| Owner | `ia-content` |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Frozen base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Machine data | `data/slug-governance.json` (`MAREA-MC15-SLUG-GOVERNANCE`) |
| Registry authority | `MC15-DATA-CONTRACT.md` section 2.4; current slugs from `src/app/core/i18n/locale-routes.ts` |

## 1. Principles

1. **Identity is not a string.** An entity is identified by `entityId` (plus edition or bundle
   id where applicable). The slug is a locale-specific locator for that identity. Renaming a
   display name, translating a label or rewriting copy never changes an entity or a slug.
2. **Existing indexed slugs are frozen.** The 21 current routes keep their ES and EN paths byte
   for byte, including any accent or non-ASCII character. This governance records them; it never
   rewrites them.
3. **New proposed slugs are ASCII and deterministic.** Unicode NFC, lowercase, transliterated,
   hyphen-separated. No discretion, no synonyms, no machine translation.
4. **One slug, one entity, one namespace.** Duplicates are rejected at registration, never
   silently disambiguated.
5. **Nothing here is deployed.** The rules describe how a future implementation must validate a
   slug. They do not register, publish, redirect or index anything.

## 2. Normalization pipeline

The pipeline is ordered; a step may reject but may never invent.

| Step | Operation | Rules | Failure mode |
|---|---|---|---|
| 0 | Strip query string and fragment, decode exactly once | SG-019, SG-024 | Double-encoded input is rejected |
| 1 | Unicode NFC | SG-001 | Non-normalizable input is rejected |
| 2 | Frozen-registry check: if the segment belongs to a current route, keep it verbatim and stop | SG-004, SG-023 | A "normalized" existing slug is a rejection |
| 3 | ASCII lowercase | SG-002 | Non-ASCII case folding is not attempted |
| 4 | Diacritic transliteration to ASCII (new slugs only) | SG-003, SG-006 | Any remaining non-ASCII character is a rejection |
| 5 | Separator normalization to a single hyphen | SG-005, SG-009 | Underscore, space, dot, camelCase are rejections |
| 6 | Edge and repeat checks, length check | SG-008, SG-009, SG-010 | Leading or trailing slash or hyphen is a rejection |
| 7 | Reserved-segment check at the correct position | SG-011, SG-025, SG-027 | Reserved is a rejection, not an override |
| 8 | Namespace uniqueness and duplicate check | SG-012, SG-013, SG-028 | Duplicate in one namespace is a rejection |
| 9 | Locale mapping check | SG-015, SG-016, SG-018, SG-030 | An unmapped EN slug is a rejection |
| 10 | Claim-language and private-id check | SG-020, SG-026 | Any commercial or private token is a rejection |

## 3. Rule catalogue

Thirty normative rules, `SG-001` to `SG-030`. Each has a `testId` in
`data/slug-governance.json` (`items`).

| ruleId | Rule | Applies to | Normalization | Test id |
|---|---|---|---|---|
| SG-001 | Normalize to Unicode NFC before comparison, hashing or storage | All slugs | NFC | `SG-001-NFC-NORMALIZATION` |
| SG-002 | ASCII lowercase only; no locale-dependent casing | New slugs | ASCII lowercase | `SG-002-ASCII-LOWERCASE` |
| SG-003 | Transliterate diacritics to ASCII for new slugs only | New slugs | ASCII transliteration | `SG-003-ASCII-TRANSLITERATION` |
| SG-004 | Existing indexed slugs are immutable byte for byte, accents included | Existing slugs | None (verbatim) | `SG-004-EXISTING-SLUG-IMMUTABLE` |
| SG-005 | Exactly one hyphen between words; no underscore, space, dot, camelCase | All slugs | Hyphen separator | `SG-005-HYPHEN-SEPARATOR` |
| SG-006 | Character set is `a-z`, `0-9`, hyphen; anything else is a rejection | New slugs | Allowed charset | `SG-006-ALLOWED-CHARSET` |
| SG-007 | No spaces, punctuation, percent sign or percent-encoded sequence in a stored slug | All slugs | No punctuation, no percent | `SG-007-NO-PUNCTUATION-NO-PERCENT` |
| SG-008 | No leading or trailing slash, no empty segment; paths are assembled by the registry | All slugs | Trim edge slashes | `SG-008-NO-EDGE-SLASH` |
| SG-009 | No leading, trailing or double hyphen | All slugs | Collapse and trim hyphens | `SG-009-HYPHEN-POSITION` |
| SG-010 | Maximum 60 characters per slug (internal design objective) | New slugs | Max length 60 | `SG-010-MAX-LENGTH` |
| SG-011 | A new slug may not equal a reserved segment at that position | New slugs | Reserved check | `SG-011-RESERVED-SEGMENT` |
| SG-012 | Two entities may not share a slug in the same namespace and locale; duplicates are rejected | All slugs | Unique per namespace and locale | `SG-012-DUPLICATE-REJECT` |
| SG-013 | Cross-namespace slug reuse is allowed only when declared in this file | All slugs | Declared namespace reuse | `SG-013-NAMESPACE-REUSE-DECLARED` |
| SG-014 | Entity identity never depends on a locale display name | Entity slug | Identity independent of display name | `SG-014-ENTITY-IDENTITY-STABLE` |
| SG-015 | ES and EN slugs differ only where an explicit mapping exists | All slugs | Explicit locale mapping only | `SG-015-EXPLICIT-LOCALE-MAPPING` |
| SG-016 | No EN slug is invented where no approved EN translation exists | All slugs | No EN slug without translation | `SG-016-NO-INVENTED-EN-SLUG` |
| SG-017 | Edition slug derives from `editionId`: lowercase, hyphen-separated | Edition slug | Edition id lowercase hyphen | `SG-017-EDITION-SLUG-DERIVATION` |
| SG-018 | Bundle slugs come from the closed six-value enumeration and are literal segments | Bundle slug | Closed bundle enumeration | `SG-018-BUNDLE-SLUG-ENUMERATION` |
| SG-019 | Query string and fragment are never part of identity | All slugs | Strip query and fragment | `SG-019-QUERY-FRAGMENT-STRIPPED` |
| SG-020 | Private ids (order, customer, product database id, admin ids) never appear in a public slug | Private routes | Private id exclusion | `SG-020-PRIVATE-ID-EXCLUSION` |
| SG-021 | A historical alias is redirect-only, never canonical, never linked, never in a sitemap | Historical aliases | Redirect only | `SG-021-ALIAS-REDIRECT-ONLY` |
| SG-022 | Route parameters are validated with the same rules as literal slugs | Route parameters | Parameter validated as slug | `SG-022-PARAM-SLUG-VALIDATION` |
| SG-023 | A canonical slug changes only through a redirect-mapped, authorized migration | All slugs | No silent rename | `SG-023-SLUG-CHANGE-REQUIRES-REDIRECT` |
| SG-024 | Decode exactly once; double-encoded input is rejected | All slugs | Decode once | `SG-024-DECODE-ONCE` |
| SG-025 | Technical first segments are reserved (`api`, `uploads`, probes, sitemap, robots, icons, manifest, asset directories) | New slugs | Technical token reserved | `SG-025-TECHNICAL-TOKEN-RESERVED` |
| SG-026 | No commercial-state or claim language in a slug (`buy`, `price`, `stock`, `available`, `certified`, …) | New slugs | No claim language | `SG-026-NO-CLAIM-LANGUAGE` |
| SG-027 | The `en/` prefix belongs to the EN path only; bare `en` is reserved at root | All slugs | Locale prefix ownership | `SG-027-LOCALE-PREFIX` |
| SG-028 | Every accepted slug binds to exactly one `entityId` and one `routeId` | All slugs | Slug-entity binding | `SG-028-SLUG-ENTITY-BINDING` |
| SG-029 | Comparison is exact after normalization; no fuzzy or edit-distance fallback | All slugs | Exact match | `SG-029-EXACT-MATCH` |
| SG-030 | Documentation slug domain is the nine family ids lowercased, identical across locales, and no EN page without an approved translation | Documentation slug | Family-id domain | `SG-030-DOC-SLUG-DOMAIN` |

## 4. Reserved segments

Fifty-nine reserved segments, exactly as recorded in `data/slug-governance.json`
(`reservedSegments`). Reservation is positional: `productos` is reserved both at the root
(legacy 301) and as the second segment of `/marea` (proposed products overview).

### 4.1 Locale and technical segments (13)

| Segment | Position | Category | Reason |
|---|---|---|---|
| `en` | root | Locale prefix | EN routes are prefixed; an ES page at `/en` would collide with the locale space |
| `api` | root | Technical | Express API mount (`/api`) |
| `uploads` | root | Technical | Static upload directory |
| `healthz` | root | Technical | Health probe endpoint |
| `readyz` | root | Technical | Readiness probe endpoint |
| `sitemap.xml` | root | Technical | Generated sitemap endpoint |
| `robots.txt` | root | Technical | Static robots file |
| `favicon.ico` | root | Technical | Static icon |
| `favicon.svg` | root | Technical | Static icon |
| `site.webmanifest` | root | Technical | Static web app manifest |
| `images` | root | Technical | Static image directory |
| `assets` | root | Technical | Build asset directory |
| `static` | root | Technical | Static hosting directory |

### 4.2 Current public route segments (15)

| Segment | Position | Route | Note |
|---|---|---|---|
| `home` | root only | `home` | The home page resolves to the empty path; no page may claim `home` as a first segment |
| `tecnologia` | root | `technology` | Indexed ES page, frozen |
| `experiencias` | root | `experiences` | Indexed ES page, frozen |
| `traslados` | root | `delivery` | Indexed ES page, frozen |
| `servicios` | root | `services` | Indexed ES page, frozen; `/soporte` is deliberately a different segment |
| `sobre-nosotros` | root | `about` | Indexed ES page, frozen; demonstrates a valid multi-word hyphenated slug |
| `contacto` | root | `contact` | Indexed ES page, frozen |
| `guias` | root | `guides` | Indexed ES hub; `:slug` children are a separate namespace |
| `tienda` | root | `shop` | Indexed ES shop hub; retains real inventory |
| `muestra` | shop second segment | `shopSample` | Literal segment that must keep winning over `shopDetail` |
| `sample` | EN shop second segment | `shopSample` | EN literal counterpart |
| `aviso-legal` | root | `legalNotice` | Frozen |
| `privacidad` | root | `privacy` | Frozen |
| `cookies` | root | `cookies` | Frozen |
| `condiciones-de-venta` | root | `termsOfSale` | Frozen |

### 4.3 Private namespace (5)

| Segment | Position | Route | Note |
|---|---|---|---|
| `admin` | root | `admin` | Private, guarded, ES-only; never a public slug |
| `carrito` | root | `cart` | Private |
| `acceso` | root | `login` | Private |
| `cuenta` | root | `account` | Private area root |
| `pedidos` | account second segment | `orderDetail` | Private order list and detail; the order id stays private |

### 4.4 Legacy redirect sources (2)

| Segment | Position | Redirect | Note |
|---|---|---|---|
| `open-marine` | root | `legacyOpenMarine` → `/tecnologia` | Redirect-only (SG-021) |
| `productos` | root | `legacyProductos` → `/tecnologia` | Redirect-only; rooted reservation prevents a future products page from silently replacing a live 301 |

### 4.5 Proposed MAREA namespace (20)

| Segment | Position | Reserved for | Locale |
|---|---|---|---|
| `marea` | root | Branch root `mareaOverview` | Both |
| `productos` | `/marea` second segment | `mareaProducts` | ES |
| `products` | `/en/marea` second segment | `mareaProducts` | EN |
| `soluciones` | `/marea` second segment | `mareaSolutions` | ES |
| `solutions` | `/en/marea` second segment | `mareaSolutions` | EN |
| `configurador` | `/marea` second segment | `mareaConfigurator` | ES |
| `nav` | `/marea` family segment | `mareaFamilyNav` | Both |
| `hub` | `/marea` family segment | `mareaFamilyHub` | Both |
| `ais` | `/marea` family segment | `mareaFamilyAis` | Both |
| `pilot` | `/marea` family segment | `mareaFamilyPilot` | Both |
| `sense` | `/marea` family segment | `mareaFamilySense` | Both |
| `watch` | `/marea` family segment | `mareaFamilyWatch` | Both |
| `display` | `/marea` family segment | `mareaFamilyDisplay` | Both |
| `weather` | `/marea` family segment | `mareaFamilyWeather` | Both |
| `fleet` | family and bundle segment | `mareaFamilyFleet` and `mareaSolutionFleet` | Both |
| `start` | bundle segment | `mareaSolutionStart` | Both |
| `cruise` | bundle segment | `mareaSolutionCruise` | Both |
| `sail` | bundle segment | `mareaSolutionSail` | Both |
| `protect` | bundle segment | `mareaSolutionProtect` | Both |
| `complete` | bundle segment | `mareaSolutionComplete` | Both |

`fleet` is the only value reserved in two places. Both bindings are declared, both carry a
distinct `entityId`, and the parent path resolves them unambiguously (SG-013).

### 4.6 Proposed root-level surfaces (4)

| Segment | Position | Reserved for | Locale |
|---|---|---|---|
| `profesionales` | root | `professionals` | ES |
| `instaladores` | root | `installers` | ES |
| `soporte` | root | `support` and the documentation namespace `soporte/marea` | ES |
| `support` | EN root | `support` and `en/support/marea` | EN |

## 5. Entity slug map — nine families and six bundles

Stable entity identity, locale slugs, edition ids and locale mapping state. Source of edition
ids: `product-definitions.batch-01/02/03.json`. For bundles, `editionIds` lists the component
editions referenced by the bundle components — a bundle is a composition, not an edition
(`COMPOSITE_COMPONENT_EDITIONS`); for families the editions are the family's own
(`OWN_EDITIONS`).

| entityId | Type | Id | ES slug | EN slug | Edition ids | Locale mapping state |
|---|---|---|---|---|---|---|
| `ENT-FAMILY-NAV` | PRODUCT_FAMILY | NAV | `nav` | `nav` | NAV-ESSENTIAL, NAV-PRO | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-FAMILY-HUB` | PRODUCT_FAMILY | HUB | `hub` | `hub` | HUB-STANDARD, HUB-PRO | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-FAMILY-AIS` | PRODUCT_FAMILY | AIS | `ais` | `ais` | AIS-RECEIVER, AIS-CONNECTED | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-FAMILY-PILOT` | PRODUCT_FAMILY | PILOT | `pilot` | `pilot` | PILOT-COASTAL, PILOT-SAIL, PILOT-PRO | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-FAMILY-SENSE` | PRODUCT_FAMILY | SENSE | `sense` | `sense` | SENSE-WIND, SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV, SENSE-ESSENTIALS, SENSE-SAIL, SENSE-SYSTEMS | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-FAMILY-WATCH` | PRODUCT_FAMILY | WATCH | `watch` | `watch` | WATCH-CORE, WATCH-PLUS | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-FAMILY-DISPLAY` | PRODUCT_FAMILY | DISPLAY | `display` | `display` | DISPLAY-7, DISPLAY-LARGE-CONDITIONAL | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-FAMILY-WEATHER` | PRODUCT_FAMILY | WEATHER | `weather` | `weather` | WEATHER-STANDARD, WEATHER-PRO | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-FAMILY-FLEET` | PRODUCT_FAMILY | FLEET | `fleet` | `fleet` | FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-BUNDLE-START` | BUNDLE | START | `start` | `start` | HUB-STANDARD, NAV-PRO | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-BUNDLE-CRUISE` | BUNDLE | CRUISE | `cruise` | `cruise` | HUB-STANDARD, NAV-ESSENTIAL, AIS-RECEIVER, AIS-CONNECTED, DISPLAY-7, DISPLAY-LARGE-CONDITIONAL | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-BUNDLE-SAIL` | BUNDLE | SAIL | `sail` | `sail` | HUB-STANDARD, NAV-PRO, PILOT-COASTAL, PILOT-SAIL, PILOT-PRO, SENSE-WIND | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-BUNDLE-PROTECT` | BUNDLE | PROTECT | `protect` | `protect` | SENSE-ESSENTIALS, WATCH-CORE, WATCH-PLUS | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-BUNDLE-COMPLETE` | BUNDLE | COMPLETE | `complete` | `complete` | HUB-PRO, NAV-PRO, PILOT-COASTAL, PILOT-SAIL, PILOT-PRO, DISPLAY-7, DISPLAY-LARGE-CONDITIONAL, SENSE-BILGE, SENSE-ENV, SENSE-POWER, SENSE-TANKS, WATCH-CORE | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `ENT-BUNDLE-FLEET` | BUNDLE | FLEET | `fleet` | `fleet` | FLEET-START, FLEET-ENTERPRISE | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |

Families and bundles have locale-identical slugs because the family and bundle names are proper
names, not translatable labels. No English slug is invented and none is machine-translated.

## 6. Surface slug map — hubs, tool and root-level pages

| routeId | entityId | ES slug | EN slug | Namespace | Locale mapping state |
|---|---|---|---|---|---|
| `mareaOverview` | `ENT-HUB-MAREA` | `marea` | `marea` | `/` and `/en/` | `IDENTICAL_SLUG_ES_EN_CONTRACT_FIXED` |
| `mareaProducts` | `ENT-HUB-PRODUCTS` | `productos` | `products` | `marea` and `en/marea` | `EXPLICIT_ES_EN_MAPPING_CONTRACT_FIXED` |
| `mareaSolutions` | `ENT-HUB-SOLUTIONS` | `soluciones` | `solutions` | `marea` and `en/marea` | `EXPLICIT_ES_EN_MAPPING_CONTRACT_FIXED` |
| `mareaConfigurator` | `ENT-TOOL-CONFIGURATOR` | `configurador` | `configurator` | `marea` and `en/marea` | `EXPLICIT_ES_EN_MAPPING_CONTRACT_FIXED` |
| `professionals` | `ENT-PAGE-PROFESSIONALS` | `profesionales` | `professionals` | `/` and `/en/` | `EXPLICIT_ES_EN_MAPPING_CONTRACT_FIXED` |
| `installers` | `ENT-PAGE-INSTALLERS` | `instaladores` | `installers` | `/` and `/en/` | `EXPLICIT_ES_EN_MAPPING_CONTRACT_FIXED` |
| `support` | `ENT-PAGE-SUPPORT` | `soporte` | `support` | `/` and `/en/` | `EXPLICIT_ES_EN_MAPPING_CONTRACT_FIXED` |
| `productDocumentation` | `ENT-DOC-PRODUCT` | `:slug` | `:slug` | `soporte/marea` and `en/support/marea` | `PARAMETER_IDENTICAL_ACROSS_LOCALES` |

Three ES segments are genuinely different words from their EN counterparts
(`productos`/`products`, `soluciones`/`solutions`, `configurador`/`configurator`), and four are
cognate pairs that are still recorded as explicit mappings rather than assumed
(`profesionales`/`professionals`, `instaladores`/`installers`, `soporte`/`support`, plus
`marea`/`marea` which is identical). The mapping is a contract value, never a derivation.

## 7. Locale mapping rules

| Rule | Statement | Consequence |
|---|---|---|
| Mapped pairs only | ES and EN slugs differ only where `entitySlug` or `surfaceSlug` records both values | No translator, copywriter or developer may invent an EN segment |
| No invented EN page | If an EN page is not approved for an entity, the EN slug is absent, no EN alternate is emitted and no hreflang pair exists | ES-only pages stay ES-only; the EN sitemap does not gain an entry |
| Family and bundle parity | Family and bundle slugs are identical in both locales | Translation happens in copy, not in the path |
| Parameter parity | The documentation parameter uses the same family slug in both locales | The EN page is a translation of the ES page, addressed by the same identifier |
| Locale prefix ownership | EN patterns start with `en/`; ES patterns never do | `en` is reserved; an ES slug starting with `en` is rejected (SG-027) |
| Locale-independent entity | `entityId` never contains a locale | An entity can gain or lose a locale without changing identity |

## 8. Product edition slug mapping

Edition slugs are deterministic derivations of `editionId` (SG-017). They are technical and
documentation locators: MC-15 registers **no** per-edition public route, and a future per-edition
page would require a registry decision, not a new slug convention.

| Family | editionId | Derived slug | Public route in MC-15 |
|---|---|---|---|
| NAV | NAV-ESSENTIAL | `nav-essential` | None |
| NAV | NAV-PRO | `nav-pro` | None |
| HUB | HUB-STANDARD | `hub-standard` | None |
| HUB | HUB-PRO | `hub-pro` | None |
| AIS | AIS-RECEIVER | `ais-receiver` | None |
| AIS | AIS-CONNECTED | `ais-connected` | None |
| PILOT | PILOT-COASTAL | `pilot-coastal` | None |
| PILOT | PILOT-SAIL | `pilot-sail` | None |
| PILOT | PILOT-PRO | `pilot-pro` | None |
| SENSE | SENSE-WIND | `sense-wind` | None |
| SENSE | SENSE-POWER | `sense-power` | None |
| SENSE | SENSE-BILGE | `sense-bilge` | None |
| SENSE | SENSE-TANKS | `sense-tanks` | None |
| SENSE | SENSE-ENV | `sense-env` | None |
| SENSE | SENSE-ESSENTIALS | `sense-essentials` | None |
| SENSE | SENSE-SAIL | `sense-sail` | None |
| SENSE | SENSE-SYSTEMS | `sense-systems` | None |
| WATCH | WATCH-CORE | `watch-core` | None |
| WATCH | WATCH-PLUS | `watch-plus` | None |
| DISPLAY | DISPLAY-7 | `display-7` | None |
| DISPLAY | DISPLAY-LARGE-CONDITIONAL | `display-large-conditional` | None |
| WEATHER | WEATHER-STANDARD | `weather-standard` | None |
| WEATHER | WEATHER-PRO | `weather-pro` | None |
| FLEET | FLEET-START | `fleet-start` | None |
| FLEET | FLEET-BUSINESS | `fleet-business` | None |
| FLEET | FLEET-ENTERPRISE | `fleet-enterprise` | None |

Twenty-six editions across nine families, matching the MC-05/06/07 definitions. No edition is
invented, renamed or merged. `DISPLAY-7` demonstrates that digits are allowed in a slug (SG-006).

## 9. Bundle slug mapping

| bundleId | Slug | Parent namespace | Note |
|---|---|---|---|
| START | `start` | `/marea/soluciones`, `/en/marea/solutions` | Literal segment, closed enumeration |
| CRUISE | `cruise` | same | Literal segment |
| SAIL | `sail` | same | Literal segment; PILOT-containing bundle |
| PROTECT | `protect` | same | Literal segment |
| COMPLETE | `complete` | same | Literal segment |
| FLEET | `fleet` | same | Shares the slug value with `ENT-FAMILY-FLEET`; declared reuse under SG-013 |

A bundle slug is a **literal path segment**, not a parameter. Adding a seventh bundle would
require a registry decision and a new reserved segment, never a silent new slug (SG-018).

## 10. Duplicate rejection and namespace reuse

The uniqueness key is the tuple **(parent path, locale, slug)**.

| Situation | Verdict |
|---|---|
| Two entities, same namespace, same locale, same slug | Rejected (SG-012) |
| One entity, two locales, same slug | Accepted; the locales are different namespaces (families, bundles) |
| One entity, two locales, different mapped slugs | Accepted only with an explicit mapping (SG-015) |
| Two entities, different namespaces, same slug value | Accepted only when declared in this file (SG-013); currently `fleet` only |
| A slug with no entity binding | Rejected (SG-028) |
| A slug bound to two entities in one namespace | Rejected (SG-028) |
| An alias presented as canonical | Rejected (SG-021) |

The `fleet` case in full: `ENT-FAMILY-FLEET` at `/marea/fleet` (and `/en/marea/fleet`) and
`ENT-BUNDLE-FLEET` at `/marea/soluciones/fleet` (and `/en/marea/solutions/fleet`). Two parent
paths, two entity ids, one slug value. A URL always resolves through one parent path to one
entity, so there is no ambiguity; the reuse is declared so that a future duplicate check does not
flag it as an error and so that no one "fixes" it by renaming a live identity.

## 11. Rejection vectors

Executable expectations, mirrored in `data/slug-governance.json` (`rejectionVectors`). These are
planning fixtures: nothing is executed against a live server.

| Input | Expected verdict | Rules |
|---|---|---|
| `Marea` | accept after lowercase → `marea` | SG-002, SG-014 |
| `MAREA/Nav` | reject: embedded slash | SG-008 |
| `/marea/nav/` | reject: edge slash | SG-008 |
| `marea//nav` | reject: empty segment | SG-008, SG-009 |
| `marea/nav?lang=en` | strip query, then accept | SG-019 |
| `marea/nav#top` | strip fragment, then accept | SG-019 |
| `marea/n%C3%A1v` | reject: percent-encoding in a stored slug | SG-007, SG-024 |
| `marea/n av` | reject: space | SG-005, SG-007 |
| `marea/nav_2026` | reject: underscore | SG-005, SG-006 |
| `marea/-nav` | reject: leading hyphen | SG-009 |
| `marea/nav-` | reject: trailing hyphen | SG-009 |
| `marea/nav--hub` | reject: double hyphen | SG-009 |
| `productos` | reject at root: reserved legacy redirect source | SG-011, SG-021 |
| `marea/productos` | accept: proposed namespace | SG-011 |
| `marea/soluciones/fleet` | accept: declared namespace reuse | SG-013 |
| `marea/fleet/otra-cosa` | reject: no such namespace | SG-028 |
| `soporte/marea/fleet` | accept: documentation parameter domain | SG-022, SG-030 |
| `soporte/marea/nav-pro` | reject: parameter outside the nine-family domain | SG-022 |
| `soporte/marea/productos` | reject: parameter outside the domain | SG-022 |
| `comprar-nav` | reject: claim language | SG-026 |
| `api` | reject: technical token | SG-025 |
| `en` | reject at root: reserved locale prefix | SG-027, SG-011 |
| `tecnologia` | accept verbatim as an existing frozen slug | SG-004 |
| `Tecnología` | reject as a new slug; the existing frozen form `tecnologia` is the only accepted value | SG-003, SG-004, SG-015 |

## 12. Open decisions

| Id | Decision | Blocks | Owner (proposed) |
|---|---|---|---|
| D06-OD-01 | Whether ES/EN slug pairs for future non-product pages are reviewed as copy or as routing | Approval workflow for SG-015 | Lead with content owner |
| D06-OD-02 | Whether the documentation parameter domain grows to editions | SG-022/SG-030 domain and rejection vectors | Product governance |
| D06-OD-03 | Whether a future per-edition public page exists at all | SG-017 status as technical-only | Product governance |
| D06-OD-04 | Whether `fleet` family/bundle reuse is confirmed for implementation or one of the two entities receives a distinct slug | SG-013 declaration and the bundle path | Lead |
| D06-OD-05 | Whether accented ES slugs are ever allowed for new pages (this milestone forbids them for new slugs and freezes existing ones) | SG-003 scope | Lead with SEO owner |

No decision above is taken by this document, and no rule in it authorizes a live slug, route or
redirect change.
