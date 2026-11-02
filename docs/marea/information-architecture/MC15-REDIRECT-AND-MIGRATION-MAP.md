# D07 — Redirect and migration map (MC-15)

| Field | Value |
|---|---|
| Deliverable | D07 `MC15-REDIRECT-AND-MIGRATION-MAP.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Owner | `seo-migration` |
| Machine data | `data/redirect-map.json` (`MAREA-MC15-REDIRECT-MAP`) |
| Base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Date | 2026-11-02 |
| Status | `INTERNAL_PLANNING_ONLY` |
| Publication | `NOT_AUTHORIZED` |
| Live redirect activation | `NOT_AUTHORIZED` |
| MC16_STARTED | `false` |

## 1. What this document is

This is a **planned** redirect and migration map. It is **not a deployed configuration**, not
a server or router change, and not a migration. **No redirect is created, edited, activated or
deactivated in MC-15.** No file outside this documentation package is touched: `src/`,
`public/robots.txt`, the sitemap generator, `app.routes.ts`, `app.routes.server.ts` and
`server.ts` are read-only for this deliverable.

The document answers one question only: *given the current public URL surface, what is the
authorised URL decision per identity, and what would have to be true before any redirect could
ever be added?*

## 2. What is actually live today (verified)

The inherited application already serves three legacy redirects. They are the **only** redirects
in the public surface and MC-15 changes none of them.

| redirectId | Source | Destination | Status | Live since | MC-15 decision |
|---|---|---|---|---|---|
| `legacyOpenMarine` | `/open-marine` | `/tecnologia` | 301 | inherited (pre-MC-15) | `EXISTING_ACTIVE` — preserved verbatim |
| `legacyProductos` | `/productos` | `/tecnologia` | 301 | inherited (pre-MC-15) | `EXISTING_ACTIVE` — preserved verbatim |
| `legacyProductoDetail` | `/productos/:slug` | `/tecnologia/:slug` | 301 | inherited (pre-MC-15) | `EXISTING_ACTIVE` — preserved verbatim |

Repository evidence: `src/app/app.routes.ts` (`open-marine`, `productos`, `productos/:slug`
`redirectTo`) and `src/app/app.routes.server.ts` (`RenderMode.Server` with `status: 301`).

Local SSR evidence (isolated run, disposable database, 2026-11-02):

| Request | Observed response | Notes |
|---|---|---|
| `/open-marine` | `301`, `location: /tecnologia` | one hop, ends `200` |
| `/productos` | `301`, `location: /tecnologia` | one hop, ends `200` |
| `/productos/hub` | `301`, `location: /tecnologia/hub` | one hop, ends `200`; entity identity kept by slug |
| `/productos?x=1` | `301`, `location: /tecnologia` | **query string dropped** (inherited behaviour) |
| `/open-marine?utm=1` | `301`, `location: /tecnologia` | **query string dropped** (inherited behaviour) |
| `/productos/does-not-exist` | `404` at the legacy URL, no `location` | no redirect to a 404 destination |

These six observations are the whole live redirect surface. Everything else in this document is a
planning record.

## 3. Decision rule for existing Spanish URLs

**No new redirect may be proposed for an existing Spanish URL in MC-15. The valid decision is
`KEEP_AS_IS`.** This is not a preference; it follows from the inherited constraints:

- Spanish public URLs are already indexed and must not move (`LOCALIZED_ROUTES` is the single
  source of truth and MC-15 does not edit it).
- Nine of the 13 release gates are closed, `MAREA_PUBLIC_USE = NO_GO` and
  `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`, so no consolidation, no rename and no "new home"
  redirect can be justified.
- A redirect is an irreversible public SEO action. MC-15 is a planning milestone.

Therefore the only permitted dispositions are `KEEP_AS_IS` (200), `EXISTING_ACTIVE` (the three
inherited 301s), `INTERNAL_ONLY_NO_REDIRECT` (admin), `NO_REDIRECT_404` (unknown paths) and, for a
surface that does not exist yet, `PROPOSED_NOT_ACTIVE` with `authorizationRequired: true`.

## 4. Record inventory

`data/redirect-map.json` holds **53 redirect records** plus **3 non-redirect surface records**.

| Group | Records | Status | `active` | `executionStatus` |
|---|---|---|---|---|
| Inherited legacy 301s | 3 | `EXISTING_ACTIVE` | `true` | `EXISTING_ACTIVE` |
| `KEEP_AS_IS` for the 21 current route ids × 2 locales | 42 | `KEEP_AS_IS` | `false` | `NOT_EXECUTED` |
| Administration (7 route ids, Spanish only) | 7 | `INTERNAL_ONLY_NO_REDIRECT` | `false` | `NOT_EXECUTED` |
| Conditional future redirect | 1 | `PROPOSED_NOT_ACTIVE` | `false` | `NOT_EXECUTED` |
| **Total `items`** | **53** | | exactly 3 active | none executed |

### 4.1 `KEEP_AS_IS` — every existing public route, both locales

Each row has two records (`-/es` and `-/en`), each with `statusCode: 200`,
`executionStatus: NOT_EXECUTED`, `active: false`, `canonicalDestination: SELF` and
`preserveEntityIdentity: true`. No record has a `destinationPath`: nothing is being moved.

| routeId | ES path | EN path | Disposition |
|---|---|---|---|
| `home` | `/` | `/en` | `KEEP_AS_IS` |
| `technology` | `/tecnologia` | `/en/technology` | `KEEP_AS_IS` |
| `technologyDetail` | `/tecnologia/:slug` | `/en/technology/:slug` | `KEEP_AS_IS_DYNAMIC_PATTERN` |
| `experiences` | `/experiencias` | `/en/experiences` | `KEEP_AS_IS` |
| `delivery` | `/traslados` | `/en/delivery` | `KEEP_AS_IS` |
| `services` | `/servicios` | `/en/services` | `KEEP_AS_IS` |
| `about` | `/sobre-nosotros` | `/en/about` | `KEEP_AS_IS` |
| `contact` | `/contacto` | `/en/contact` | `KEEP_AS_IS` |
| `guides` | `/guias` | `/en/guides` | `KEEP_AS_IS` |
| `guideDetail` | `/guias/:slug` | `/en/guides/:slug` | `KEEP_AS_IS_DYNAMIC_PATTERN` |
| `shop` | `/tienda` | `/en/shop` | `KEEP_AS_IS` |
| `shopDetail` | `/tienda/:slug` | `/en/shop/:slug` | `KEEP_AS_IS_DYNAMIC_PATTERN` |
| `shopSample` | `/tienda/muestra/:slug` | `/en/shop/sample/:slug` | `KEEP_AS_IS_DYNAMIC_PATTERN` (noindex, never redirected) |
| `cart` | `/carrito` | `/en/cart` | `KEEP_AS_IS_PRIVATE_NOINDEX` |
| `login` | `/acceso` | `/en/login` | `KEEP_AS_IS_PRIVATE_NOINDEX` |
| `account` | `/cuenta` | `/en/account` | `KEEP_AS_IS_PRIVATE_NOINDEX` |
| `orderDetail` | `/cuenta/pedidos/:id` | `/en/account/orders/:id` | `KEEP_AS_IS_PRIVATE_NOINDEX` |
| `legalNotice` | `/aviso-legal` | `/en/legal-notice` | `KEEP_AS_IS` |
| `privacy` | `/privacidad` | `/en/privacy` | `KEEP_AS_IS` |
| `cookies` | `/cookies` | `/en/cookies` | `KEEP_AS_IS` |
| `termsOfSale` | `/condiciones-de-venta` | `/en/terms-of-sale` | `KEEP_AS_IS` |

No record in this group carries a redirect destination, a status code other than 200, or an
`active` flag.

### 4.2 Administration — 7 records, never a redirect target

`/admin`, `/admin/pedidos`, `/admin/pedidos/:id`, `/admin/productos`, `/admin/productos/:id`,
`/admin/clientes`, `/admin/mensajes` (`admin`, `adminOrders`, `adminOrderDetail`, `adminProducts`,
`adminProductEdit`, `adminCustomers`, `adminMessages`).

Disposition `INTERNAL_ONLY_NO_REDIRECT`: Spanish-only, guarded, client-rendered, `X-Robots-Tag:
noindex, nofollow` (observed `200` on `/admin`). No public URL may redirect here and admin may
never be a redirect destination, a canonical target or a sitemap entry.

### 4.3 Conditional future redirect — `PROPOSED_NOT_ACTIVE`

| redirectId | Source | Destination | Status | `authorizationRequired` | Why it is not active |
|---|---|---|---|---|---|
| `proposedLegacyOpenMarineSlug` | `/open-marine/:slug` | `/tecnologia/:slug` | 301 (proposed) | `true` | The inherited site redirects `/open-marine` but not `/open-marine/<slug>`; that shape answers `404` today. No authorised analytics evidence exists that such inbound links exist. |

Activation conditions recorded in the dataset: (a) an authorised analytics export showing real
inbound traffic or backlinks, (b) per-slug verification that the destination slug exists in
`TECHNOLOGY` so no redirect lands on a 404, (c) written MC-16 authorisation and a separate change
record. Until all three exist, `executionStatus` stays `NOT_EXECUTED` and the record is not an
authorised change.

### 4.4 Non-redirect surfaces

| surfaceId | Pattern | HTTP | Rule |
|---|---|---|---|
| `unknownPath404` | `/**` | 404 | Unknown paths are a real 404 with a noindex meta. No home swallow, no hub redirect, no redirect to login or account. |
| `legacyProductoDetailUnresolvedSlug` | `/productos/:slug` | 404 | An unknown legacy slug is answered 404 at the legacy URL instead of redirecting to a 404 destination. |
| `apiEndpoints` | `/api/*` | per endpoint | JSON surface, disallowed in `robots.txt`, never redirected, no canonical/hreflang. |

## 5. Invariants asserted and how they were checked

| Invariant | Method | Result |
|---|---|---|
| No loops | Graph walk over every 301/308 source in the dataset, destination compared against the source set | `NONE` |
| No chains | One-hop follow from each legacy source | `NONE`; `/productos/hub` reaches `200` in one hop, `/open-marine` and `/productos` likewise |
| No many-to-home redirect | Destination set inspected | `NONE`; no destination is `/` and no destination is `/en` |
| No cross-locale mistakes | `sourceLocale` vs `destinationLocale` on every active record | Equal on all three (`es` → `es`); no ES→EN or EN→ES redirect exists |
| No query/fragment loss | Local SSR with `?x=1` and `?utm=1`, plus HTTP semantics review | **Query strings are dropped on the three inherited 301s** — an inherited defect, recorded, not fixed (see §6). Fragments are never sent to a server; browsers carry the fragment across a `301` by HTTP semantics, so `fragmentHandling` is recorded as browser-carried and not server-observable. |
| No destination 404 | Live follow of known slugs plus unknown-slug probe | No active redirect lands on a 404: unknown slugs are answered `404` at the legacy URL. The one conditional proposal is explicitly gated on per-slug destination verification. |
| No redirect into an unapproved MAREA page | Destination inspection | `NONE`; no record points at `/marea` or `/en/marea` |
| No redirect to login/account as substitute content | Destination inspection | `NONE`; `/acceso`, `/en/login`, `/cuenta`, `/en/account` are never destinations |
| Entity identity preserved | Source/destination entity comparison | Hub → hub, product slug → same product slug; the dynamic record keeps `:slug` identical, so the entity is the same at both addresses |
| No redirect executed in MC-15 | `executionStatus` scan | No record is `EXECUTED`; `active` is `true` only for the three inherited 301s |

## 6. Inherited defects and residual risks (not fixed here)

| ID | Observation | Impact | MC-15 action | Owner / gate |
|---|---|---|---|---|
| R-RED-01 | The three inherited 301s drop query strings (`/productos?x=1` → `/tecnologia`) | Campaign/UTM attribution is lost on legacy URLs; a redirect target cannot receive the original parameters | Recorded and measured; no change | MC-16, `GATE-WEBSITE-REMEDIATION`; needs authorisation because it changes live behaviour |
| R-RED-02 | `/productos/:slug` destination existence depends on the slug existing in `TECHNOLOGY` | A stale external link to a legacy slug that no longer exists would 404 (today it 404s at the legacy URL, which is the safer behaviour) | Recorded as `NO_REDIRECT_404`; optional conditional redirect with `authorizationRequired: true` | MC-16, analytics evidence first |
| R-RED-03 | `/open-marine/<slug>` was never redirected | Possible silent 404 for old deep links | Conditional proposal only; no activation | MC-16 |
| R-RED-04 | `robots.txt` does not disallow the legacy paths | Legacy URLs remain crawlable, which is correct for a 301 (a disallowed redirect target cannot be crawled) | No change; documented in D09 | — |

## 7. What MC-15 does not authorise

- No redirect is created, changed, activated or removed.
- No existing Spanish or English URL is moved, merged, canonicalised to another URL or retired.
- No `redirectTo`, `serverRoutes` status, Express middleware or `_redirects`-style file is edited.
- No sitemap submission, no Search Console action and no re-indexing request.
- No MAREA URL is created, so no MAREA redirect can exist yet.

Migration phasing, entry/exit criteria and authorisation requirements for any future execution are
owned by D15 (`MC15-MIGRATION-PHASES`) and D16 (`MC15-SEO-RISK-AND-ROLLBACK`). This document only
fixes the URL decision per identity.

## 8. Reconciliation and counts

| Item | Value |
|---|---|
| Current route ids covered | 21 / 21, both locales (`KEEP_AS_IS`) |
| Admin route ids covered | 7 / 7 |
| Legacy redirects covered | 3 / 3 (`EXISTING_ACTIVE`) |
| Proposed route ids with a redirect | 0 (a proposed, unpublished URL needs no redirect) |
| Redirect records | 53 |
| Non-redirect surface records | 3 |
| Records with `executionStatus: EXECUTED` | 0 |
| Records with `active: true` | 3 (the inherited 301s only) |
| Records with `authorizationRequired: true` | 1 (the conditional proposal) |

The route inventory used here was reconciled with the route-architect datasets
(`data/current-routes.json`, 28 records = 21 public + 7 admin, and `data/current-urls.json`,
141 URL records) and with `src/app/core/i18n/locale-routes.ts`. The peer dispositions
(`KEEP_AS_IS` 98, `KEEP_NOINDEX` 35, `KEEP_REDIRECT` 4 — the three legacy patterns plus the
concrete `/productos/navegador` example — `DYNAMIC_DB` 2 for the dynamic shop-detail patterns, and
`NO_PRESERVATION_REQUIRED` 2 for the 404 examples) agree with this map: nothing moves, no redirect
is added, the dynamic shop-detail URL set is data rather than registry and keeps the same slug per
product identity, and the private surfaces stay `noindex` and never redirected. No discrepancy was
found between the registry, the peer inventories and this map.
