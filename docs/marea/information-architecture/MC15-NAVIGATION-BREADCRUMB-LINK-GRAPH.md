# MC-15 D12 — Navigation, breadcrumb and internal link graph (internal, non-deployable)

| Field | Value |
|---|---|
| Deliverable | D12 `MC15-NAVIGATION-BREADCRUMB-LINK-GRAPH.md` |
| Milestone | MC-15/36 — Bilingual information architecture, SEO route registry and migration planning |
| Status | `INTERNAL_PLANNING_ONLY` |
| Publication | `NOT_AUTHORIZED` |
| Live navigation change | `NOT_AUTHORIZED` |
| `MC16_STARTED` | `false` |
| Owner | `ia-content` |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Frozen base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Machine data | `data/internal-link-graph.json` (`MAREA-MC15-INTERNAL-LINK-GRAPH`), 206 edges / 103 unique links |
| Related | `data/bilingual-metadata.json` (breadcrumb parents and link targets), `data/proposed-ia.json`, `data/proposed-routes.json` |

## 1. Purpose and boundary

This document defines the directed navigation, breadcrumb and internal-link model for the current
and proposed architecture: 44 page ids, **103 unique links modelled in both locales (206 edges)**.

It is an internal design target. In MC-15:

- **No breadcrumb is emitted to the live website.** Breadcrumb JSON-LD and breadcrumb markup in
  the running site are unchanged; this graph describes what a later, separately authorised
  implementation would emit.
- **No navigation entry is added, moved or removed.** The header, footer and in-page links of the
  running site are unchanged.
- **No link to a proposed route is live.** Every edge whose destination is a proposed route is
  `plannedNotLive: true`, and a live page may never expose a blocked proposed route through
  primary, secondary or footer navigation.

## 2. Graph model

| Field | Values | Meaning |
|---|---|---|
| `edgeId` | `LNK-<from>-<to>-<linkType>-<LOCALE>` | Deterministic identifier; unique |
| `fromRouteId` | current or proposed route id | Source page |
| `toRouteId` | current or proposed route id | Destination page |
| `locale` | `es` \| `en` | Each unique link exists once per locale |
| `linkType` | `PRIMARY_NAV`, `SECONDARY_NAV`, `FOOTER`, `INLINE`, `BREADCRUMB`, `CTA` | Navigation region or link role |
| `targetStatus` | `LIVE_EXISTING` \| `PROPOSED_INTERNAL_NOT_DEPLOYABLE` | Status of the destination |
| `breadcrumbAllowed` | boolean | Whether the link may appear in a breadcrumb trail (nav and breadcrumb links true) |
| `plannedNotLive` | boolean | `true` exactly when the destination is a proposed route |
| `activationState` | `BLOCKED_PROPOSED_INTERNAL_NOT_DEPLOYABLE` | Present only on planned edges |
| `notes` | string | Why the edge exists or why it is modelled as it is |

Modelling rules:

1. **One conceptual link, two rows.** Every link is authored once per locale, because the same
   page pair exists in ES and EN. 103 unique links × 2 = 206 edges.
2. **`plannedNotLive` is destination-based.** It is `true` if and only if the destination is one of
   the 23 proposed routes. An edge from a proposed page to a live corporate page therefore carries
   `plannedNotLive: false` while still being unrenderable today, because both endpoints do not
   exist as live navigation.
3. **Live navigation never points at a blocked route.** A `PRIMARY_NAV`, `SECONDARY_NAV` or
   `FOOTER` edge from a current route to a proposed route is prohibited. The planned entry to the
   proposed branch is therefore modelled as `INLINE`, not as a nav or footer slot.
4. **Breadcrumb edges point child → parent**, matching how a breadcrumb trail links upwards.

## 3. Link inventory

| Link type | Unique links | Edges | Target live | Target proposed |
|---|---|---|---|---|
| `PRIMARY_NAV` | 10 | 20 | 10 | 0 |
| `SECONDARY_NAV` | 4 | 8 | 0 | 4 |
| `FOOTER` | 4 | 8 | 4 | 0 |
| `INLINE` | 34 | 68 | 6 | 28 |
| `BREADCRUMB` | 43 | 86 | 24 | 19 |
| `CTA` | 8 | 16 | 8 | 0 |
| **Total** | **103** | **206** | **52** | **51** |

Every unique link is present in both locales, and no page pair carries two different link types
(no duplicate navigation entry).

## 4. Corporate navigation map

Primary navigation (live, unchanged):

| From | To | Type | Note |
|---|---|---|---|
| `home` | `technology` | PRIMARY_NAV | Technology hub |
| `home` | `experiences` | PRIMARY_NAV | Experiences |
| `home` | `delivery` | PRIMARY_NAV | Boat delivery |
| `home` | `services` | PRIMARY_NAV | Services |
| `home` | `about` | PRIMARY_NAV | About |
| `home` | `contact` | PRIMARY_NAV | Contact |
| `home` | `guides` | PRIMARY_NAV | Guides |
| `home` | `shop` | PRIMARY_NAV | Shop |
| `home` | `cart` | PRIMARY_NAV | Header cart entry; intended private destination |
| `home` | `login` | PRIMARY_NAV | Header account entry; intended private destination |

Footer (live): `home → legalNotice`, `home → privacy`, `home → cookies`, `home → termsOfSale`.

Calls to action and section links (live): `about → contact`, `services → contact`,
`experiences → contact`, `delivery → contact`, `technologyDetail → contact`, `shopDetail → cart`,
`login → account`, `account → orderDetail`.

Listing-to-detail links (live, 6): `technology → technologyDetail`, `guides → guideDetail`,
`shop → shopDetail`, `shop → shopSample`, `cart → termsOfSale`, `cart → privacy`.

## 5. Proposed hierarchy links

| From | To | Type | Note |
|---|---|---|---|
| `home` | `mareaOverview` | INLINE | Planned entry to the proposed branch. Modelled as INLINE because a live nav/footer edge to a blocked route is prohibited |
| `mareaOverview` | `mareaProducts` | SECONDARY_NAV | Branch secondary navigation |
| `mareaOverview` | `mareaSolutions` | SECONDARY_NAV | Branch secondary navigation |
| `mareaOverview` | `mareaConfigurator` | SECONDARY_NAV | Branch secondary navigation |
| `mareaOverview` | `professionals` | INLINE | Planned professional programme entry |
| `mareaOverview` | `installers` | INLINE | Planned installer programme entry |
| `mareaOverview` | `support` | INLINE | Planned support and documentation entry |
| `support` | `productDocumentation` | SECONDARY_NAV | Support hub → documentation set |
| `mareaProducts` | nine family pages | INLINE | Products overview → each family |
| `mareaSolutions` | six bundle pages | INLINE | Solutions overview → each bundle |
| each family page | `productDocumentation` | INLINE | Family page → its documentation entry (parameter `nav` … `fleet`) |

All 51 proposed-target links are blocked, and the 23 proposed pages are reachable from
`mareaOverview` through proposed-target links only (`products → families`,
`solutions → bundles`, `support → documentation`, `overview → configurator`, and the three
root-level surfaces from the overview).

## 6. Breadcrumb parentage

43 of the 44 pages have a breadcrumb parent; `home` has none by definition.

| Parent | Children | Depth of children |
|---|---|---|
| `home` | technology, experiences, delivery, services, about, contact, guides, shop, cart, login, account, legalNotice, privacy, cookies, termsOfSale, mareaOverview, professionals, installers, support (19) | 2 |
| `technology` | technologyDetail | 2 |
| `guides` | guideDetail | 2 |
| `shop` | shopDetail, shopSample | 2 |
| `account` | orderDetail | 3 |
| `mareaOverview` | mareaProducts, mareaSolutions, mareaConfigurator | 2 |
| `mareaProducts` | the nine family pages | 3 |
| `mareaSolutions` | the six bundle pages | 3 |
| `support` | productDocumentation | 2 |

Depth is counted in breadcrumb hops from the root: `home` = 1, a child of home = 2, a family page
= `home › mareaOverview › mareaProducts › <family>` = 4 positions / 3 parent hops. The maximum
planned breadcrumb depth is **3 hops** (4 trail positions including home).

Breadcrumb trails for the proposed layer follow the D04 specification:

```
Inicio › MAREA › Productos › <familia>
Inicio › MAREA › Soluciones › <paquete>
Inicio › MAREA › Configurador
Inicio › Profesionales
Inicio › Instaladores
Inicio › Soporte › MAREA › <familia>
```

`productDocumentation` is the only proposed page whose breadcrumb parent (`support`) differs from
its URL parent (`/soporte/marea/:slug` is a child of `/soporte` in both senses, so this is
consistent); it is **not** a child of the family page even though a family page links to it — the
family page owns a cross-link, not the breadcrumb.

## 7. Depth objectives (internal design targets)

| Level | Content class | Pages | Target |
|---|---|---|---|
| 0 | Corporate home | 1 | Entry point |
| 1 | Corporate top-level pages and branch roots | 19 | One click from home |
| 2 | Overviews, tool, documentation | 9 | Two clicks from home |
| 3 | Families and bundles | 15 | Three clicks from home |
| 4+ | none | 0 | Forbidden for proposed pages |

These are **internal information-architecture objectives**, chosen so that no proposed page is
buried and every page has a static breadcrumb parent. They are not statements about any search
engine's crawl behaviour, ranking, or a guarantee of discovery: no crawler, index or ranking fact
is claimed anywhere in this milestone.

## 8. Detection report

All checks are mechanical over `data/internal-link-graph.json` and
`data/bilingual-metadata.json`.

| Check | Method | Result |
|---|---|---|
| Orphan pages | Every proposed route must have an incoming edge and be reachable from `mareaOverview`; every non-private current page except `home` must have an incoming edge | **0 orphans**; 23/23 proposed pages reachable |
| Broken references | Every `fromRouteId`/`toRouteId`, every metadata `internalLinkTarget` and every `breadcrumbParent` must resolve to a current or proposed route id | **0 broken references** |
| Cross-locale link errors | Every unique link must exist in both `es` and `en`, and every edge locale must be `es` or `en` | **0 errors** |
| Links to blocked proposed routes from live navigation | Any `PRIMARY_NAV`/`SECONDARY_NAV`/`FOOTER` edge from a current route to a proposed route | **0** |
| Circular breadcrumb ancestry | Walk the parent chain of all 43 parents | **0 cycles** |
| Missing breadcrumb parents | Every page except `home` must declare one | **0 missing**; `home` has `breadcrumbParent: null` and `ROOT_NO_PARENT` |
| Planned depth > 4 | Longest parent chain | **0**; maximum 3 hops |
| Duplicate navigation entries | Same `from`/`to` pair carrying more than one link type; duplicate `edgeId` | **0** |
| Unintended private-page links | Every edge whose destination is `cart`, `login`, `account` or `orderDetail`, reviewed individually | **6 intended links**, none unintended (see below) |
| Edges into private pages | Header cart and header account entries from `home`, post-login `login → account`, account → order detail, add-to-cart from a product detail, and the order-detail breadcrumb | All intended, all noindex on the destination side |
| Single-inbound-link pages | Pages reachable through exactly one link | 31 pages, all by design: hierarchy leaves and top-level pages reached from the header or footer. A single static inbound link is sufficient for depth 1–3; it is not an orphan condition |

Private-page links in full: `home → cart` (header), `home → login` (header),
`login → account` (post-authentication), `account → orderDetail`, `shopDetail → cart` (add to
cart), `orderDetail → account` (breadcrumb). No public page links to the private area except the
two deliberate header entries, and `orderDetail` is never linked from a public page.

## 9. Gating and activation record

| Assertion | State |
|---|---|
| Proposed-target links | 51 unique links / 102 edges, all `plannedNotLive: true`, all `targetStatus: PROPOSED_INTERNAL_NOT_DEPLOYABLE` |
| Live navigation to the proposed layer | None; the single planned entry (`home → mareaOverview`) is `INLINE` |
| Breadcrumb emission today | None; no proposed breadcrumb is rendered, and the existing breadcrumb JSON-LD is unchanged |
| Navigation markup change | None; no header, footer, menu or in-page link was modified |
| Link activation prerequisite | Each planned link requires its target route to leave `PROPOSED_INTERNAL_NOT_DEPLOYABLE`, which requires the gates recorded per route in `proposed-routes.json` |

## 10. Open decisions

| Id | Decision | Blocks | Owner |
|---|---|---|---|
| D12-OD-01 | Whether `/profesionales`, `/instaladores` and `/soporte` sit in primary navigation, footer or a secondary menu once authorised | Navigation model for three root-level surfaces | Lead + brand owner |
| D12-OD-02 | Whether the products overview uses a mega-menu or a plain list of nine families | Secondary navigation design | Design owner |
| D12-OD-03 | Whether family pages link to documentation in the body, the breadcrumb area, or both | Cross-link model | Support owner |
| D12-OD-04 | Whether `shop` keeps its `ItemList` link pattern to every product while commerce is closed | Internal linking for the shop | Commercial director |
| D12-OD-05 | Whether any proposed page may ever exceed depth 3 (for example a per-edition page) | Depth objective | Lead |

## 11. Verification record

| Check | Result |
|---|---|
| JSON parse | `internal-link-graph.json` parses; UTF-8, no BOM |
| Edge integrity | 206 edges, 206 unique `edgeId`s, 103 unique links, both locales for every link |
| Metadata ↔ graph consistency | Every `internalLinkTarget` in `bilingual-metadata.json` has a matching edge |
| Route resolution | All endpoints resolve to the 21 current or 23 proposed route ids |
| Breadcrumb model | 43 parents, 0 cycles, maximum 3 hops |
| Milestone validator (`scripts/check-marea-ia-seo.mjs`, link-graph and metadata sections) | 0 errors attributable to these two datasets |
