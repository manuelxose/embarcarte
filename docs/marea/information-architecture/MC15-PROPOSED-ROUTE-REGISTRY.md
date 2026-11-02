# MC-15 D05 — Proposed route registry and collision analysis (non-deployable)

| Field | Value |
|---|---|
| Deliverable | D05 `MC15-PROPOSED-ROUTE-REGISTRY.md` |
| Milestone | MC-15/36 — Bilingual information architecture, SEO route registry and migration planning |
| Status | `INTERNAL_PLANNING_ONLY` |
| Publication | `NOT_AUTHORIZED` |
| Live route change | `NOT_AUTHORIZED` |
| `MC16_STARTED` | `false` |
| Owner | `ia-content` |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Frozen base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Machine data | `data/proposed-routes.json` (`MAREA-MC15-PROPOSED-ROUTES`), `data/proposed-ia.json`, `data/slug-governance.json` |
| Registry authority | `MC15-DATA-CONTRACT.md` section 2.4 (23 ids, exact ES/EN patterns) |

## 1. Registry summary

| Property | Value |
|---|---|
| Proposed route ids | 23 |
| Proposed entities | 23 (`ENT-HUB-*` ×3, `ENT-FAMILY-*` ×9, `ENT-BUNDLE-*` ×6, `ENT-TOOL-CONFIGURATOR`, `ENT-PAGE-*` ×3, `ENT-DOC-PRODUCT`) |
| Literal routes | 22 |
| Parameterised routes | 1 (`productDocumentation`, `:slug` domain = nine family ids) |
| Status of every route | `PROPOSED_INTERNAL_NOT_DEPLOYABLE` |
| `routeDefined` | `true` for all 23 (pattern fixed by the contract) |
| `implementationReady` | `false` for all 23 |
| `publicationAuthorized` | `false` for all 23 |
| `indexationAuthorized` | `false` for all 23 |
| `commercialTransactionAuthorized` | `false` for all 23 |
| Sitemap eligibility | `false` for all 23 |
| Deployment state | `NOT_ACTIVATED_NOT_IN_SITEMAP_NOT_PUBLICLY_LINKED` |
| Collisions | 0 unresolved; per-route `collisionStatus` is `NO_COLLISION` |

The registry is a design table, not a router table. Nothing here is registered in
`src/app/core/i18n/locale-routes.ts` or `src/app/app.routes.ts`.

## 2. The 23-route registry

Gate column legend (full ids in `data/release-evidence-gates.json`):

`MKT` = GATE-MARKET-PLACEMENT · `SAFETY` = GATE-SAFETY-PILOT · `IP` = GATE-IP-CLEARANCE ·
`DATA` = GATE-DATA-LICENSING · `PRIV` = GATE-PRIVACY-DPA-DPIA · `CRA` = GATE-CRA-CYBERSECURITY ·
`TERMS` = GATE-CONSUMER-TERMS · `CLAIMS` = GATE-COMMERCIAL-CLAIMS · `PRICING` = GATE-PRICING ·
`PAY` = GATE-PAYMENTS · `INS` = GATE-INSURANCE · `LEGAL` = GATE-LEGAL-ENTITY ·
`REMED` = GATE-WEBSITE-REMEDIATION.

Publication state is `PROPOSED_INTERNAL_NOT_DEPLOYABLE` for every row; it is written in full once
here and abbreviated `PROPOSED` in the table only to keep the row readable.

| # | routeId | pageId | entityId | ES pattern | EN pattern | Page type | Publication | Impl | Index | Commerce | Gates (n) | Blocking gates |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `mareaOverview` | `mareaOverview` | `ENT-HUB-MAREA` | `/marea` | `/en/marea` | HUB_OVERVIEW | PROPOSED | false | false | false | 13 | MKT, SAFETY, IP, DATA, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 2 | `mareaProducts` | `mareaProducts` | `ENT-HUB-PRODUCTS` | `/marea/productos` | `/en/marea/products` | PRODUCTS_OVERVIEW | PROPOSED | false | false | false | 13 | MKT, SAFETY, IP, DATA, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 3 | `mareaSolutions` | `mareaSolutions` | `ENT-HUB-SOLUTIONS` | `/marea/soluciones` | `/en/marea/solutions` | SOLUTIONS_OVERVIEW | PROPOSED | false | false | false | 13 | MKT, SAFETY, IP, DATA, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 4 | `mareaFamilyNav` | `mareaFamilyNav` | `ENT-FAMILY-NAV` | `/marea/nav` | `/en/marea/nav` | PRODUCT_FAMILY | PROPOSED | false | false | false | 12 | MKT, IP, DATA, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 5 | `mareaFamilyHub` | `mareaFamilyHub` | `ENT-FAMILY-HUB` | `/marea/hub` | `/en/marea/hub` | PRODUCT_FAMILY | PROPOSED | false | false | false | 10 | MKT, IP, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 6 | `mareaFamilyAis` | `mareaFamilyAis` | `ENT-FAMILY-AIS` | `/marea/ais` | `/en/marea/ais` | PRODUCT_FAMILY | PROPOSED | false | false | false | 11 | MKT, IP, DATA, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 7 | `mareaFamilyPilot` | `mareaFamilyPilot` | `ENT-FAMILY-PILOT` | `/marea/pilot` | `/en/marea/pilot` | PRODUCT_FAMILY | PROPOSED | false | false | false | 11 | MKT, SAFETY, IP, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 8 | `mareaFamilySense` | `mareaFamilySense` | `ENT-FAMILY-SENSE` | `/marea/sense` | `/en/marea/sense` | PRODUCT_FAMILY | PROPOSED | false | false | false | 10 | MKT, IP, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 9 | `mareaFamilyWatch` | `mareaFamilyWatch` | `ENT-FAMILY-WATCH` | `/marea/watch` | `/en/marea/watch` | PRODUCT_FAMILY | PROPOSED | false | false | false | 11 | MKT, IP, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 10 | `mareaFamilyDisplay` | `mareaFamilyDisplay` | `ENT-FAMILY-DISPLAY` | `/marea/display` | `/en/marea/display` | PRODUCT_FAMILY | PROPOSED | false | false | false | 11 | MKT, IP, DATA, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 11 | `mareaFamilyWeather` | `mareaFamilyWeather` | `ENT-FAMILY-WEATHER` | `/marea/weather` | `/en/marea/weather` | PRODUCT_FAMILY | PROPOSED | false | false | false | 9 | IP, DATA, CRA, TERMS, CLAIMS, PRICING, PAY, LEGAL, REMED |
| 12 | `mareaFamilyFleet` | `mareaFamilyFleet` | `ENT-FAMILY-FLEET` | `/marea/fleet` | `/en/marea/fleet` | PRODUCT_FAMILY | PROPOSED | false | false | false | 10 | IP, DATA, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, LEGAL, REMED |
| 13 | `mareaSolutionStart` | `mareaSolutionStart` | `ENT-BUNDLE-START` | `/marea/soluciones/start` | `/en/marea/solutions/start` | BUNDLE | PROPOSED | false | false | false | 11 | MKT, IP, DATA, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 14 | `mareaSolutionCruise` | `mareaSolutionCruise` | `ENT-BUNDLE-CRUISE` | `/marea/soluciones/cruise` | `/en/marea/solutions/cruise` | BUNDLE | PROPOSED | false | false | false | 11 | MKT, IP, DATA, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 15 | `mareaSolutionSail` | `mareaSolutionSail` | `ENT-BUNDLE-SAIL` | `/marea/soluciones/sail` | `/en/marea/solutions/sail` | BUNDLE | PROPOSED | false | false | false | 12 | MKT, SAFETY, IP, DATA, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 16 | `mareaSolutionProtect` | `mareaSolutionProtect` | `ENT-BUNDLE-PROTECT` | `/marea/soluciones/protect` | `/en/marea/solutions/protect` | BUNDLE | PROPOSED | false | false | false | 12 | MKT, SAFETY, IP, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 17 | `mareaSolutionComplete` | `mareaSolutionComplete` | `ENT-BUNDLE-COMPLETE` | `/marea/soluciones/complete` | `/en/marea/solutions/complete` | BUNDLE | PROPOSED | false | false | false | 13 | MKT, SAFETY, IP, DATA, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, INS, LEGAL, REMED |
| 18 | `mareaSolutionFleet` | `mareaSolutionFleet` | `ENT-BUNDLE-FLEET` | `/marea/soluciones/fleet` | `/en/marea/solutions/fleet` | BUNDLE | PROPOSED | false | false | false | 11 | SAFETY, IP, DATA, PRIV, CRA, TERMS, CLAIMS, PRICING, PAY, LEGAL, REMED |
| 19 | `mareaConfigurator` | `mareaConfigurator` | `ENT-TOOL-CONFIGURATOR` | `/marea/configurador` | `/en/marea/configurator` | TOOL | PROPOSED | false | false | false | 12 | MKT, SAFETY, IP, DATA, PRIV, CRA, TERMS, CLAIMS, PRICING, INS, LEGAL, REMED |
| 20 | `professionals` | `professionals` | `ENT-PAGE-PROFESSIONALS` | `/profesionales` | `/en/professionals` | PROFESSIONALS | PROPOSED | false | false | false | 5 | IP, TERMS, CLAIMS, LEGAL, REMED |
| 21 | `installers` | `installers` | `ENT-PAGE-INSTALLERS` | `/instaladores` | `/en/installers` | INSTALLERS | PROPOSED | false | false | false | 5 | IP, TERMS, CLAIMS, LEGAL, REMED |
| 22 | `support` | `support` | `ENT-PAGE-SUPPORT` | `/soporte` | `/en/support` | SUPPORT | PROPOSED | false | false | false | 5 | IP, CRA, CLAIMS, LEGAL, REMED |
| 23 | `productDocumentation` | `productDocumentation` | `ENT-DOC-PRODUCT` | `/soporte/marea/:slug` | `/en/support/marea/:slug` | DOCUMENTATION | PROPOSED | false | false | false | 7 | SAFETY, IP, DATA, CRA, CLAIMS, LEGAL, REMED |

### 2.1 Gate matrix

`X` marks a blocking gate attached to the route. All 13 MC-14 gates are consumed.

| routeId | MKT | SAFETY | IP | DATA | PRIV | CRA | TERMS | CLAIMS | PRICING | PAY | INS | LEGAL | REMED |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `mareaOverview` | X | X | X | X | X | X | X | X | X | X | X | X | X |
| `mareaProducts` | X | X | X | X | X | X | X | X | X | X | X | X | X |
| `mareaSolutions` | X | X | X | X | X | X | X | X | X | X | X | X | X |
| `mareaFamilyNav` | X |  | X | X | X | X | X | X | X | X | X | X | X |
| `mareaFamilyHub` | X |  | X |  |  | X | X | X | X | X | X | X | X |
| `mareaFamilyAis` | X |  | X | X |  | X | X | X | X | X | X | X | X |
| `mareaFamilyPilot` | X | X | X |  |  | X | X | X | X | X | X | X | X |
| `mareaFamilySense` | X |  | X |  |  | X | X | X | X | X | X | X | X |
| `mareaFamilyWatch` | X |  | X |  | X | X | X | X | X | X | X | X | X |
| `mareaFamilyDisplay` | X |  | X | X |  | X | X | X | X | X | X | X | X |
| `mareaFamilyWeather` |  |  | X | X |  | X | X | X | X | X |  | X | X |
| `mareaFamilyFleet` |  |  | X | X | X | X | X | X | X | X |  | X | X |
| `mareaSolutionStart` | X |  | X | X |  | X | X | X | X | X | X | X | X |
| `mareaSolutionCruise` | X |  | X | X |  | X | X | X | X | X | X | X | X |
| `mareaSolutionSail` | X | X | X | X |  | X | X | X | X | X | X | X | X |
| `mareaSolutionProtect` | X | X | X |  | X | X | X | X | X | X | X | X | X |
| `mareaSolutionComplete` | X | X | X | X | X | X | X | X | X | X | X | X | X |
| `mareaSolutionFleet` |  | X | X | X | X | X | X | X | X | X |  | X | X |
| `mareaConfigurator` | X | X | X | X | X | X | X | X | X |  | X | X | X |
| `professionals` |  |  | X |  |  |  | X | X |  |  |  | X | X |
| `installers` |  |  | X |  |  |  | X | X |  |  |  | X | X |
| `support` |  |  | X |  |  | X |  | X |  |  |  | X | X |
| `productDocumentation` |  | X | X | X |  | X |  | X |  |  |  | X | X |

Gate derivation is deterministic and recorded in `data/proposed-routes.json`
(`gateDerivation`): commerce-bearing surfaces receive the eight gates that MC-14 attaches to all
nine families and all six bundles; family and bundle routes add the gates whose
`productFamilyIds` / `bundleIds` lists contain them; the three hubs and the configurator inherit
the union of the nodes they present; the configurator drops `GATE-PAYMENTS` because it produces a
quotation request and no checkout.

## 3. Coverage matrix — nine families

| familyId | routeId | entityId | ES | EN | Editions (n) | Edition ids | Gates (n) |
|---|---|---|---|---|---|---|---|
| NAV | `mareaFamilyNav` | `ENT-FAMILY-NAV` | `/marea/nav` | `/en/marea/nav` | 2 | NAV-ESSENTIAL, NAV-PRO | 12 |
| HUB | `mareaFamilyHub` | `ENT-FAMILY-HUB` | `/marea/hub` | `/en/marea/hub` | 2 | HUB-STANDARD, HUB-PRO | 10 |
| AIS | `mareaFamilyAis` | `ENT-FAMILY-AIS` | `/marea/ais` | `/en/marea/ais` | 2 | AIS-RECEIVER, AIS-CONNECTED | 11 |
| PILOT | `mareaFamilyPilot` | `ENT-FAMILY-PILOT` | `/marea/pilot` | `/en/marea/pilot` | 3 | PILOT-COASTAL, PILOT-SAIL, PILOT-PRO | 11 |
| SENSE | `mareaFamilySense` | `ENT-FAMILY-SENSE` | `/marea/sense` | `/en/marea/sense` | 8 | SENSE-WIND, SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV, SENSE-ESSENTIALS, SENSE-SAIL, SENSE-SYSTEMS | 10 |
| WATCH | `mareaFamilyWatch` | `ENT-FAMILY-WATCH` | `/marea/watch` | `/en/marea/watch` | 2 | WATCH-CORE, WATCH-PLUS | 11 |
| DISPLAY | `mareaFamilyDisplay` | `ENT-FAMILY-DISPLAY` | `/marea/display` | `/en/marea/display` | 2 | DISPLAY-7, DISPLAY-LARGE-CONDITIONAL | 11 |
| WEATHER | `mareaFamilyWeather` | `ENT-FAMILY-WEATHER` | `/marea/weather` | `/en/marea/weather` | 2 | WEATHER-STANDARD, WEATHER-PRO | 9 |
| FLEET | `mareaFamilyFleet` | `ENT-FAMILY-FLEET` | `/marea/fleet` | `/en/marea/fleet` | 3 | FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE | 10 |

Coverage result: **9 of 9 families present, each with exactly one route identity, one entity id
and the edition ids recorded by the MC-05/06/07 product definitions.** No edition is invented and
no family is omitted. Edition ids are internal identifiers; no edition name is authorized for
public use by this document.

## 4. Coverage matrix — six bundles

Bundle composition is taken from `docs/marea/bundles/bundle-definitions.json` component lines
(`familyId` + `editionId`), deduplicated.

| bundleId | routeId | entityId | ES | EN | Component editions (n) | Edition ids referenced | Gates (n) |
|---|---|---|---|---|---|---|---|
| START | `mareaSolutionStart` | `ENT-BUNDLE-START` | `/marea/soluciones/start` | `/en/marea/solutions/start` | 2 | HUB-STANDARD, NAV-PRO | 11 |
| CRUISE | `mareaSolutionCruise` | `ENT-BUNDLE-CRUISE` | `/marea/soluciones/cruise` | `/en/marea/solutions/cruise` | 6 | HUB-STANDARD, NAV-ESSENTIAL, AIS-RECEIVER, AIS-CONNECTED, DISPLAY-7, DISPLAY-LARGE-CONDITIONAL | 11 |
| SAIL | `mareaSolutionSail` | `ENT-BUNDLE-SAIL` | `/marea/soluciones/sail` | `/en/marea/solutions/sail` | 6 | HUB-STANDARD, NAV-PRO, PILOT-COASTAL, PILOT-SAIL, PILOT-PRO, SENSE-WIND | 12 |
| PROTECT | `mareaSolutionProtect` | `ENT-BUNDLE-PROTECT` | `/marea/soluciones/protect` | `/en/marea/solutions/protect` | 3 | SENSE-ESSENTIALS, WATCH-CORE, WATCH-PLUS | 12 |
| COMPLETE | `mareaSolutionComplete` | `ENT-BUNDLE-COMPLETE` | `/marea/soluciones/complete` | `/en/marea/solutions/complete` | 12 | HUB-PRO, NAV-PRO, PILOT-COASTAL, PILOT-SAIL, PILOT-PRO, DISPLAY-7, DISPLAY-LARGE-CONDITIONAL, SENSE-BILGE, SENSE-ENV, SENSE-POWER, SENSE-TANKS, WATCH-CORE | 13 |
| FLEET | `mareaSolutionFleet` | `ENT-BUNDLE-FLEET` | `/marea/soluciones/fleet` | `/en/marea/solutions/fleet` | 2 | FLEET-START, FLEET-ENTERPRISE | 11 |

Coverage result: **6 of 6 bundles present**, all at level 3 under the solutions overview, each
with one literal path segment and no open parameter.

## 5. Collision analysis

### 5.1 Method

Three independent checks were run against the frozen repository state:

1. **Pattern equality** — for every proposed concrete URL, test whether any current pattern in
   `LOCALIZED_ROUTES` (21 routes × 2 locales = 42 patterns, plus 3 legacy redirect patterns)
   matches it, using the same rule as `matchRoute`: equal segment count and literal equality for
   every non-parameter segment.
2. **First-segment ownership** — the first segment decides which namespace a URL belongs to, so
   a proposed first segment that is already owned by a current route, a private namespace or a
   technical endpoint would be a collision even if the deeper patterns differed.
3. **Slug-value reuse** — whether a proposed slug value is already used as a parameter value or
   a literal segment elsewhere. Same slug in two different namespaces is not a URL collision but
   must be declared (D06, SG-013).

The router contract that makes the result stable: `src/app/core/i18n/locale-routes.ts` matches
only patterns whose segment count equals the URL's segment count, and literal segments are
compared by exact string equality. There is no prefix matching, no fuzzy matching and no
trailing wildcard inside a pattern; the only wildcard in the application is the final `**`
not-found route.

### 5.2 Every current route pattern

| routeId | ES pattern | EN pattern | First segment owned | Overlap with proposed layer |
|---|---|---|---|---|
| `home` | `/` | `/en` | (empty) / `en` | None; no proposed route is the empty path, and `en` is a prefix, not a sibling segment |
| `technology` | `/tecnologia` | `/en/technology` | `tecnologia` / `en` | None; different literal segment |
| `technologyDetail` | `/tecnologia/:slug` | `/en/technology/:slug` | `tecnologia` / `en` | None; a proposed URL never starts with `tecnologia` |
| `experiences` | `/experiencias` | `/en/experiences` | `experiencias` / `en` | None |
| `delivery` | `/traslados` | `/en/delivery` | `traslados` / `en` | None |
| `services` | `/servicios` | `/en/services` | `servicios` / `en` | None; `/soporte` is a different segment, so support cannot shadow services |
| `about` | `/sobre-nosotros` | `/en/about` | `sobre-nosotros` / `en` | None |
| `contact` | `/contacto` | `/en/contact` | `contacto` / `en` | None |
| `guides` | `/guias` | `/en/guides` | `guias` / `en` | None |
| `guideDetail` | `/guias/:slug` | `/en/guides/:slug` | `guias` / `en` | None; guide slugs stay in their own namespace |
| `shop` | `/tienda` | `/en/shop` | `tienda` / `en` | None; the existing shop keeps `/tienda` and `/en/shop` for real inventory |
| `shopDetail` | `/tienda/:slug` | `/en/shop/:slug` | `tienda` / `en` | None |
| `shopSample` | `/tienda/muestra/:slug` | `/en/shop/sample/:slug` | `tienda` / `en` | None; literal `muestra` / `sample` is unrelated to any proposed segment |
| `cart` | `/carrito` | `/en/cart` | `carrito` / `en` | None |
| `login` | `/acceso` | `/en/login` | `acceso` / `en` | None |
| `account` | `/cuenta` | `/en/account` | `cuenta` / `en` | None |
| `orderDetail` | `/cuenta/pedidos/:id` | `/en/account/orders/:id` | `cuenta` / `en` | None; private identifier stays private |
| `legalNotice` | `/aviso-legal` | `/en/legal-notice` | `aviso-legal` / `en` | None |
| `privacy` | `/privacidad` | `/en/privacy` | `privacidad` / `en` | None |
| `cookies` | `/cookies` | `/en/cookies` | `cookies` / `en` | None |
| `termsOfSale` | `/condiciones-de-venta` | `/en/terms-of-sale` | `condiciones-de-venta` / `en` | None |

**42 current public patterns checked, 0 overlaps.** Verified additionally against the three
legacy redirect patterns:

| Legacy pattern | Type | Overlap with proposed layer |
|---|---|---|
| `/open-marine` | literal | None |
| `/productos` | literal | None at root; `/marea/productos` is two segments and starts with `marea`, so it cannot match. The root segment stays reserved so a future products page cannot silently take over the redirect |
| `/productos/:slug` | parameterised | None; segment count and first literal differ from every proposed URL |

### 5.3 Literal versus parameterised resolution

Current dynamic routes and their literal competitors:

| Namespace | Literal pattern | Parameterised pattern | Resolution rule that must be preserved |
|---|---|---|---|
| Shop | `/tienda/muestra/:slug` (`shopSample`) | `/tienda/:slug` (`shopDetail`) | Literal wins. `shopSample` is declared before `shopDetail` in `src/app/app.routes.ts` and guarded by `sampleExists`, so `/tienda/muestra/x` never resolves as a product with slug `muestra` |
| Technology | `/tecnologia` | `/tecnologia/:slug` | Segment count differs, so the hub is not shadowed by the detail route |
| Guides | `/guias` | `/guias/:slug` | Segment count differs, so the hub is not shadowed by the detail route |
| Account | `/cuenta` | `/cuenta/pedidos/:id` | Segment count differs; the detail route has a fixed literal second segment |

The proposed registry adds exactly one parameterised route, and it is deliberately placed in a
different, deeper namespace:

| Proposed dynamic route | Pattern | Competes with | Verdict |
|---|---|---|---|
| `productDocumentation` | `/soporte/marea/:slug` | nothing | **Shadows nothing.** Its first segment is `soporte`, which no current route owns; its second segment is the literal `marea`; its third segment is a parameter constrained to the nine family ids. The six family and bundle namespaces are rooted at `/marea`, so the two never share a first segment |

Two further precedence decisions are recorded because a later implementer could reintroduce the
risk:

- **The bundle namespace is closed.** The roadmap proposed `/marea/soluciones/:slug`. The
  binding contract enumerates six literal bundle routes instead, so no parameter exists that
  could swallow a future segment or collide with `mareaSolutions`. If a future decision reopens
  the parameter (D04-OD-02), literal-before-parameter precedence must be verified again.
- **`/marea/soluciones` versus six children.** The overview is two segments and each bundle is
  three, so the overview cannot shadow a bundle and a bundle cannot shadow the overview.

### 5.4 Admin and private namespaces

| Namespace | Patterns | Overlap | Note |
|---|---|---|---|
| Admin (7 ids, ES only) | `/admin`, `/admin/pedidos`, `/admin/pedidos/:id`, `/admin/productos`, `/admin/productos/:id`, `/admin/clientes`, `/admin/mensajes` | None | First segment `admin` is reserved; no proposed route starts with it and no proposed route exposes an admin id |
| Cart / login / account / order detail | `/carrito`, `/acceso`, `/cuenta`, `/cuenta/pedidos/:id` (+ EN) | None | Private surfaces stay out of the proposed IA, the sitemap and the slug map |

The proposed layer introduces no private surface, no authenticated area and no operational
control. Private identifiers (`:id` in order detail and admin, database product id) never appear
in a proposed slug (D06, SG-020).

### 5.5 Existing slug values

Existing slugs are used in four parameter namespaces: technology (`/tecnologia/:slug`), guides
(`/guias/:slug`), shop products (`/tienda/:slug`) and shop samples (`/tienda/muestra/:slug`).
They are frozen and stay where they are. The analysis relevant to this milestone:

| Case | Consequence |
|---|---|
| A shop product whose slug equals a family id (for example a product slug `nav`) | `/tienda/nav` and `/marea/nav` are different URLs in different namespaces. Not a collision. The slug value is shared, the entities are not, and identity is carried by the route plus `entityId`, never by the slug string alone |
| A technology or guide slug equal to `fleet` | Same reasoning: `/tecnologia/fleet` and `/marea/fleet` coexist without ambiguity |
| The documentation parameter reusing the family slugs (`/soporte/marea/nav`) | Intentional and declared: the parameter domain is exactly the nine family ids, so a documentation page is always addressable from its family identity |
| `fleet` used twice inside the proposed layer | `/marea/fleet` (family) and `/marea/soluciones/fleet` (bundle). Same slug value, different namespaces, different `entityId`, explicitly declared in `slug-governance.json` (SG-013). No unresolved ambiguity: a URL always resolves through one parent path to one entity |

### 5.6 Reserved words

Reserved segments that the proposed layer must not take, with the reason and source, are
enumerated in D06 section 4 and in `data/slug-governance.json` (`reservedSegments`, 59 entries):
current ES/EN route segments, the private `admin` namespace, the three legacy redirect sources,
the proposed namespace's own reserved segments (`marea`, `productos`, `products`, `soluciones`,
`solutions`, `configurador`, the nine family segments and the six bundle segments), the locale
prefix `en`, and the technical first segments served by the application (`api`, `uploads`,
`healthz`, `readyz`, `sitemap.xml`, `robots.txt`, `favicon.ico`, `favicon.svg`,
`site.webmanifest`, `images`, `assets`, `static`).

### 5.7 Collision conclusion

**No unresolved ambiguous collision exists.**

- 23 of 23 proposed routes have `collisionStatus: NO_COLLISION` and an empty `collidesWith`.
- No proposed first segment is owned by a current public route, a private route, a legacy
  redirect source or a technical endpoint.
- The single parameterised proposed route sits in a deeper namespace (`/soporte/marea`) whose
  first segment no current pattern uses; it shadows nothing and nothing shadows it.
- The single same-slug reuse inside the proposed layer (`fleet`) is between two declared
  namespaces with two distinct entity ids and is resolved deterministically by the parent path.
- Literal-before-parameter precedence in the existing shop remains untouched because the
  proposed layer does not modify the shop, and the bundle namespace is closed rather than
  parameterised.

Residual risk is recorded, not hidden: if a later implementation adds an open parameter under
`/marea`, or moves a proposed page to a reserved root segment, the conclusion above no longer
holds and the collision analysis must be repeated before registration.

## 6. Activation record

`/marea` and every proposed child are **NOT activated, NOT in the sitemap and NOT publicly
linked**. This is recorded per route in `data/proposed-routes.json`
(`deploymentState: NOT_ACTIVATED_NOT_IN_SITEMAP_NOT_PUBLICLY_LINKED`) and per node in
`data/proposed-ia.json`.

| Assertion | Evidence |
|---|---|
| Not activated | None of the 23 ids appears in `src/app/core/i18n/locale-routes.ts` or `src/app/app.routes.ts`; no component exists |
| Not in the sitemap | `src/server.ts` builds `/sitemap.xml` from prerendered page folders plus active shop products. A route that is neither defined nor prerendered cannot appear. The proposed pages are not prerendered, so the generated sitemap is unchanged |
| Not publicly linked | No navigation, footer, internal link graph file, JSON-LD or content file in the repository references the proposed paths. The navigation model in D04 section 4 is a design table, not markup |
| Not indexable | `indexationAuthorized: false` for all 23; no canonical, hreflang or robots directive is emitted for a route that does not resolve. Today a proposed URL resolves to the not-found component |
| Not purchasable | `commercialTransactionAuthorized: false` for all 23; the existing shop and checkout are untouched, and no MAREA SKU, price, stock or offer exists |
| No redirect | No legacy redirect points at a proposed path, and no proposed path is a redirect source |

## 7. Open decisions

| Id | Decision | Blocks | Owner (proposed) |
|---|---|---|---|
| D05-OD-01 | Bundle namespace: closed enumeration (current registry) or parameterised `:slug` | Registry shape, precedence re-verification | Lead |
| D05-OD-02 | Documentation parameter domain: family-only or family plus edition | `productDocumentation` domain and slug rules | Product governance |
| D05-OD-03 | Whether `/profesionales`, `/instaladores`, `/soporte` stay root-level or move under `/marea` | Their namespace, collision set, breadcrumbs | Lead with brand owner |
| D05-OD-04 | Whether the configurator may quote before `GATE-PRICING` and `GATE-PAYMENTS` are addressed | Whether the tool can ever present a number | Commercial director |
| D05-OD-05 | Which MC-15 dataset becomes the operational gate matrix owner (`data/publication-gates.json`) | Cross-file duplication of the per-route gate list | Lead |

No decision in this table is taken by this document.
