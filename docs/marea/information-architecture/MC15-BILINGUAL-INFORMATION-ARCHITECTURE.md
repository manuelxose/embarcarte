# MC-15 D04 — Bilingual information architecture (proposed, non-deployable)

| Field | Value |
|---|---|
| Deliverable | D04 `MC15-BILINGUAL-INFORMATION-ARCHITECTURE.md` |
| Milestone | MC-15/36 — Bilingual information architecture, SEO route registry and migration planning |
| Status | `INTERNAL_PLANNING_ONLY` |
| Publication | `NOT_AUTHORIZED` |
| Live route change | `NOT_AUTHORIZED` |
| Deployment | `NOT_AUTHORIZED` |
| `MC16_STARTED` | `false` |
| Owner | `ia-content` |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Frozen base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Machine data | `data/proposed-ia.json` (`MAREA-MC15-PROPOSED-IA`), `data/proposed-routes.json` (`MAREA-MC15-PROPOSED-ROUTES`), `data/slug-governance.json` (`MAREA-MC15-SLUG-GOVERNANCE`) |
| Schema authority | `MC15-DATA-CONTRACT.md`, section 2.4 binding |

## 1. What this document is, and what it is not

This deliverable defines the **target information architecture** for the bilingual EMBARCARTE
site once a second layer of proposed MAREA product, solution, professional and support pages
exists. It is a design and governance artefact.

- It is **not** an implementation. No route was added to `src/app/app.routes.ts`, nothing was
  added to `LOCALIZED_ROUTES`, no component exists, no page is prerendered, nothing is
  published, indexed, redirected or sold.
- The website roadmap (`docs/marea/WEBSITE-AND-ROADMAP.md`) is a **proposal**. Its page map is
  a candidate list, not a record of implemented routes. This document narrows that candidate
  list to the 23 route identities fixed by the MC-15 data contract section 2.4 and records the
  collisions and gates that a later, separately authorized milestone would have to resolve.
- Every proposed page remains `PROPOSED_INTERNAL_NOT_DEPLOYABLE`. The proposed layer is
  invisible to users: not activated, not in the sitemap, not publicly linked, not indexable and
  not purchasable.

The organization of this document follows the two layers that must coexist:

| Layer | Nature | Change authority in MC-15 |
|---|---|---|
| Corporate preservation layer | 21 current public routes, 7 private admin routes, 3 active legacy redirects | None. Recorded as frozen; no path is renamed, moved or removed |
| Proposed MAREA layer | 23 proposed route identities, all `PROPOSED_INTERNAL_NOT_DEPLOYABLE` | None. Recorded as a design; nothing is activated |

## 2. Corporate preservation layer (all existing EMBARCARTE routes kept)

The preservation layer is the whole existing public site. The rule is simple and absolute:
**every current route keeps its current ES and EN path, its current component and its current
access rules.** The proposed layer is added as a sibling branch, never as a replacement, and no
indexed Spanish path moves.

Source of truth: `src/app/core/i18n/locale-routes.ts` (route registry) and
`src/app/app.routes.ts` (route table).

### 2.1 Current public routes (21)

| routeId | ES path | EN path | Page family | Preserved as |
|---|---|---|---|---|
| `home` | `/` | `/en` | Corporate home | Frozen canonical entry point |
| `technology` | `/tecnologia` | `/en/technology` | Technology | Frozen, indexed |
| `technologyDetail` | `/tecnologia/:slug` | `/en/technology/:slug` | Technology detail | Frozen parameterised namespace |
| `experiences` | `/experiencias` | `/en/experiences` | Experiences | Frozen, indexed |
| `delivery` | `/traslados` | `/en/delivery` | Boat delivery | Frozen, indexed |
| `services` | `/servicios` | `/en/services` | Services | Frozen, indexed |
| `about` | `/sobre-nosotros` | `/en/about` | About | Frozen, indexed |
| `contact` | `/contacto` | `/en/contact` | Contact | Frozen, indexed |
| `guides` | `/guias` | `/en/guides` | Guides hub | Frozen, indexed |
| `guideDetail` | `/guias/:slug` | `/en/guides/:slug` | Guide detail | Frozen parameterised namespace |
| `shop` | `/tienda` | `/en/shop` | Shop | Frozen, indexed |
| `shopDetail` | `/tienda/:slug` | `/en/shop/:slug` | Shop product | Frozen parameterised namespace |
| `shopSample` | `/tienda/muestra/:slug` | `/en/shop/sample/:slug` | Shop sample | Frozen, noindex, literal segment wins over `shopDetail` |
| `cart` | `/carrito` | `/en/cart` | Cart | Frozen, private |
| `login` | `/acceso` | `/en/login` | Login | Frozen, private |
| `account` | `/cuenta` | `/en/account` | Account | Frozen, private |
| `orderDetail` | `/cuenta/pedidos/:id` | `/en/account/orders/:id` | Order detail | Frozen, private, non-public identifier |
| `legalNotice` | `/aviso-legal` | `/en/legal-notice` | Legal | Frozen |
| `privacy` | `/privacidad` | `/en/privacy` | Legal | Frozen |
| `cookies` | `/cookies` | `/en/cookies` | Legal | Frozen |
| `termsOfSale` | `/condiciones-de-venta` | `/en/terms-of-sale` | Legal | Frozen |

### 2.2 Private admin routes (7)

Admin is Spanish-only, guarded by `adminGuard` and outside the public slug space.

| routeId | Path | Preserved as |
|---|---|---|
| `admin` | `/admin` | Frozen private namespace |
| `adminOrders` | `/admin/pedidos` | Frozen private |
| `adminOrderDetail` | `/admin/pedidos/:id` | Frozen private |
| `adminProducts` | `/admin/productos` | Frozen private |
| `adminProductEdit` | `/admin/productos/:id` | Frozen private |
| `adminCustomers` | `/admin/clientes` | Frozen private |
| `adminMessages` | `/admin/mensajes` | Frozen private |

### 2.3 Active legacy redirects (3)

| redirectId | Source | Destination | Preserved as |
|---|---|---|---|
| `legacyOpenMarine` | `/open-marine` | `/tecnologia` | Active redirect, never a canonical page |
| `legacyProductos` | `/productos` | `/tecnologia` | Active redirect; the root segment `productos` stays reserved |
| `legacyProductoDetail` | `/productos/:slug` | `/tecnologia/:slug` | Active redirect, entity identity preserved |

`/productos` is the single most dangerous collision in this milestone: a future MAREA products
page placed at the root would silently replace a live redirect. The registry therefore puts the
products overview under `/marea/productos` and reserves the root segment (D06, SG-011/SG-021).

## 3. Proposed MAREA hierarchy

The proposed layer has one branch root (`/marea`, `/en/marea`), two overview pages, nine family
pages, six bundle pages, one tool, and four root-level surfaces that are not under `/marea` but
belong to the same proposition (professionals, installers, support, documentation).

```
Corporate root (existing / and /en)
├── Corporate pages (preserved, unchanged)
├── MAREA overview ........................ /marea                     L1
│   ├── Products overview ................. /marea/productos           L2
│   │   ├── NAV family .................... /marea/nav                 L3
│   │   ├── HUB family .................... /marea/hub                 L3
│   │   ├── AIS family .................... /marea/ais                 L3
│   │   ├── PILOT family .................. /marea/pilot               L3
│   │   ├── SENSE family .................. /marea/sense               L3
│   │   ├── WATCH family .................. /marea/watch               L3
│   │   ├── DISPLAY family ................ /marea/display             L3
│   │   ├── WEATHER family ................ /marea/weather             L3
│   │   └── FLEET family .................. /marea/fleet               L3
│   ├── Solutions overview ................ /marea/soluciones          L2
│   │   ├── START bundle .................. /marea/soluciones/start    L3
│   │   ├── CRUISE bundle ................. /marea/soluciones/cruise   L3
│   │   ├── SAIL bundle ................... /marea/soluciones/sail     L3
│   │   ├── PROTECT bundle ................ /marea/soluciones/protect  L3
│   │   ├── COMPLETE bundle ............... /marea/soluciones/complete L3
│   │   └── FLEET bundle .................. /marea/soluciones/fleet    L3
│   └── Compatibility configurator ........ /marea/configurador        L2
├── Professionals ......................... /profesionales             L1
├── Installers ............................ /instaladores              L1
└── Support ............................... /soporte                   L1
    └── Product documentation ............. /soporte/marea/:slug       L2
```

The EN mirror replaces only the explicitly mapped segments: `/en/marea`, `/en/marea/products`,
`/en/marea/solutions`, `/en/marea/configurator`, `/en/professionals`, `/en/installers`,
`/en/support`, `/en/support/marea/:slug`. Family and bundle segments are identical in both
locales (`nav`, `fleet`, `start`, …), because the product and bundle names are proper names, not
translatable labels.

### 3.1 Level allocation

| Level | Meaning | Proposed pages | Count |
|---|---|---|---|
| 0 | Corporate root | — | 1 |
| 1 | Root-level page or branch root | `mareaOverview`, `professionals`, `installers`, `support` | 4 |
| 2 | Second-level page | `mareaProducts`, `mareaSolutions`, `mareaConfigurator`, `productDocumentation` | 4 |
| 3 | Family and bundle leaf | 9 families + 6 bundles | 15 |

Total proposed identities: **23**. None of them exceeds level 3, which keeps every proposed
page within three breadcrumb hops of the corporate root.

## 4. Navigation hierarchy (proposed)

The proposed primary navigation model keeps the existing corporate services visible and adds a
single MAREA branch. It is a design proposal for a future milestone, not a navigation change.

| Slot | ES label (proposed) | EN label (proposed) | Target | State |
|---|---|---|---|---|
| 1 | Inicio | Home | `home` | Existing |
| 2 | MAREA | MAREA | `mareaOverview` | Proposed, not deployed |
| 3 | Servicios | Services | `services` | Existing |
| 4 | Profesionales | Professionals | `professionals` | Proposed, not deployed |
| 5 | Recursos | Resources | `guides` | Existing (label reuse is a future copy decision) |
| 6 | Soporte | Support | `support` | Proposed, not deployed |
| 7 | Tienda | Shop | `shop` | Existing |
| 8 | Cuenta | Account | `account` | Existing, private |

Secondary navigation inside the proposed branch:

| Group | Children | Notes |
|---|---|---|
| Products | nine family pages | Reached from `mareaProducts`; may appear as a mega-menu in a later design |
| Solutions | six bundle pages | Reached from `mareaSolutions` |
| Tool | configurator | One entry, no sub-items |

Footer: unchanged corporate legal, privacy, cookie and terms links. No MAREA branding may be
added to the header or footer until the brand gate opens (`MAREA_PUBLIC_USE = NO_GO`), so this
navigation model is an information-architecture target and cannot be rendered as public
navigation today.

## 5. Breadcrumb parentage

Breadcrumb parentage is the `parentId` graph in `data/proposed-ia.json`. Proposed breadcrumbs:

| Page | Breadcrumb trail (ES) | Breadcrumb trail (EN) |
|---|---|---|
| `mareaOverview` | Inicio › MAREA | Home › MAREA |
| `mareaProducts` | Inicio › MAREA › Productos | Home › MAREA › Products |
| nine families | Inicio › MAREA › Productos › `<family>` | Home › MAREA › Products › `<family>` |
| `mareaSolutions` | Inicio › MAREA › Soluciones | Home › MAREA › Solutions |
| six bundles | Inicio › MAREA › Soluciones › `<bundle>` | Home › MAREA › Solutions › `<bundle>` |
| `mareaConfigurator` | Inicio › MAREA › Configurador | Home › MAREA › Configurator |
| `professionals` | Inicio › Profesionales | Home › Professionals |
| `installers` | Inicio › Instaladores | Home › Installers |
| `support` | Inicio › Soporte | Home › Support |
| `productDocumentation` | Inicio › Soporte › MAREA › `<family>` | Home › Support › MAREA › `<family>` |

`productDocumentation` is deliberately **not** a child of the family page in the URL. It is a
separate, deeper namespace (`/soporte/marea/:slug`) so that documentation can grow, be
translated independently and be linked from support, without ever shadowing or competing with
the commercial family pages. Breadcrumb parentage and URL parentage therefore differ by design;
the difference is recorded here and in `proposed-ia.json`.

Corporate breadcrumb parentage is reproduced unchanged in `proposed-ia.json`: detail routes
(`technologyDetail`, `guideDetail`, `shopDetail`, `shopSample`, `orderDetail`) are children of
their existing parents, and every root-level corporate page is a level-1 child of the corporate
root. The seven private admin route ids and the three active legacy redirect ids are preserved in
the same dataset as root-level records (`preservedPrivateRouteIds`, `preservedLegacyRedirects`)
rather than as public information-architecture nodes, because they are not public navigation
surfaces; no public breadcrumb ever points at them.

## 6. Crawl-depth targets (internal design objectives)

These are **internal information-architecture objectives**, chosen for a comprehensible,
shallow site. They are not statements about any search engine's behaviour, and no external
claim is made or implied.

| Depth from home | Content class | Target | Objective |
|---|---|---|---|
| 0 | Corporate home | reached in 0 clicks | Single entry point |
| 1 | MAREA overview, professionals, installers, support, existing corporate services | reached in 1 click | Branch roots are never buried |
| 2 | Products overview, solutions overview, configurator, documentation entry | reached in 2 clicks | Both overviews and the tool are one click inside the branch |
| 3 | Nine family pages, six bundle pages, documentation leaves | reached in 3 clicks | Hard ceiling: no proposed page deeper than 3 |
| 4+ | none | forbidden for proposed pages | A page needing depth 4 must be re-parented, not published deeper |

Corollary rules for a later implementation: no proposed page may be reachable only through a
parameter, a filter or a search result; every proposed page must have a static breadcrumb parent
and at least one static inbound link from its parent; the nine family pages are peers, and the
six bundle pages are peers, so neither group nests inside the other.

## 7. Publication-gate inheritance (summary)

Every proposed node in `proposed-ia.json` carries the blocking gate ids that come from MC-14
(`data/release-evidence-gates.json`). The derivation is deterministic:

| Surface | Gate basis | Gates |
|---|---|---|
| Three MAREA hubs | union of every family and bundle presented | all 13 |
| Nine family routes | `productFamilyIds` of each gate | 9–12 per family |
| Six bundle routes | `bundleIds` of each gate | 11–13 per bundle |
| Configurator | union minus `GATE-PAYMENTS` (quote request, no checkout) | 12 |
| Professionals, installers | brand, claims, legal, remediation, contract gates | 5 |
| Support | brand, claims, legal, remediation, CRA | 5 |
| Product documentation | support set plus data licensing and PILOT safety | 7 |

Corporate nodes only carry gates that the MC-14 page-level findings justify, referenced by
`WEB-` finding ids in the same dataset. Full per-route lists are in
`MC15-PROPOSED-ROUTE-REGISTRY.md` (D05) and `data/proposed-routes.json`.

## 8. Locale model

| Rule | Consequence in this IA |
|---|---|
| One component per page, localized from the typed route registry | A proposed page has one implementation and two locale paths; no duplicate ES/EN feature |
| Spanish paths are unprefixed and frozen | All existing ES paths keep their form; proposed ES slugs are unprefixed (`/marea`, `/profesionales`, `/soporte`) |
| English paths are prefixed with `en/` | All proposed EN slugs start with `en/`; the bare segment `en` is reserved |
| Entity identity is locale-independent | A family or bundle keeps one `entityId` across both locales; family and bundle slugs are identical in both languages |
| No invented translation | Where an EN page is not approved, no EN slug, no EN alternate and no hreflang pair may exist (D06, SG-016) |
| `x-default` is home only | The proposed layer emits no `x-default`; canonical and hreflang policy is defined in the SEO deliverable and not by this IA |

The nine family pages and six bundle pages are therefore locale-identical in their last path
segment and differ only in the prefix and the surrounding copy. The three hubs, the configurator
and the three root-level surfaces differ in both prefix and segment, exactly as tabulated in
section 3.

## 9. Non-deployability of the proposed layer

Recorded here and machine-checkable in `data/proposed-ia.json` and
`data/proposed-routes.json`:

| Assertion | State |
|---|---|
| Route definition | `routeDefined: true` (pattern fixed by the contract) |
| Implementation readiness | `implementationReady: false` |
| Publication authorization | `false` for every proposed and preserved node |
| Indexation authorization | `false` |
| Commercial transaction authorization | `false` |
| Sitemap eligibility | `false` for every proposed node |
| Deployment state | `NOT_ACTIVATED_NOT_IN_SITEMAP_NOT_PUBLICLY_LINKED` |
| Live route, redirect or sitemap change | none performed by this milestone |

The sitemap is generated at request time in `src/server.ts` from prerendered page folders plus
active shop products. A route that is not defined in the router and not prerendered cannot
appear in it. This document adds no route and no prerender target, so the sitemap is unchanged.

## 10. Open decisions carried forward

| Id | Decision needed | Blocks | Owner (proposed) |
|---|---|---|---|
| D04-OD-01 | Whether the three root-level surfaces (`/profesionales`, `/instaladores`, `/soporte`) belong to the MAREA branch or to the corporate site | Their breadcrumb and navigation placement | Lead, with brand owner |
| D04-OD-02 | Whether the bundle namespace stays a closed enumeration of six literals or becomes a parameterised `/marea/soluciones/:slug` | Registry shape and collision analysis | Lead |
| D04-OD-03 | Whether the documentation set is per family only or also per edition | Parameter domain of `productDocumentation` | Product governance |
| D04-OD-04 | Public navigation labels (ES/EN) and whether a mega-menu is used | Navigation design | Design owner |
| D04-OD-05 | Brand public-use decision, which gates every proposed surface | Everything in this layer | Legal counsel (`GATE-IP-CLEARANCE`) |

No decision above is taken in this document. Each one is a precondition for implementation, not
an authorization.
