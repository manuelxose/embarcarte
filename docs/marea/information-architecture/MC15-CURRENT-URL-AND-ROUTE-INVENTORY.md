# MC-15 D02 — Current URL and route inventory

| Field | Value |
|---|---|
| Deliverable | D02 `MC15-CURRENT-URL-AND-ROUTE-INVENTORY.md` |
| Milestone | MC-15/36 — Bilingual information architecture, URL/SEO registry and migration plan |
| Date | 2026-11-02 |
| Owner | route-architect |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Frozen source commit | `e0be1e457456a401a529e1912770e07ed9a863e4` (MC-14 HEAD; `git rev-parse HEAD` at inspection time) |
| Machine data | `data/current-routes.json`, `data/current-urls.json`, `data/url-evidence.json` |
| Contract | `MC15-DATA-CONTRACT.md` (contractVersion `1.0.0`) |
| Status | `INTERNAL_PLANNING_ONLY` — `readOnly: true`, `publicationAuthorized: false`, `MC16_STARTED: false` |
| Public observation | `PERFORMED_2026-11-03_READ_ONLY_SITEMAP_AND_THREE_URLS` |
| Indexation evidence | `SEARCH_CONSOLE_VERIFIED_PARTIAL` (24 URL inspections, 2026-11-02) |
| Live deployment verified | `false` |

This document records what the site already has. It adds no route, changes no URL, adds no
redirect, publishes nothing and re-indexes nothing. It is the baseline that D03 (preservation
policy), the redirect map, the canonical/hreflang registry and the publication gates must
respect.

## 1. Purpose and boundary

**In scope:** a complete inventory of the current public, private, operator and legacy URL
surface of the frozen tree, with the evidence class of every claim.

**Out of scope:** any change to `src/`, `public/`, `package.json`, any MC-14 file, any proposed
MAREA route, any redirect, any metadata, any deployment. Those belong to later deliverables of
MC-15 or to MC-16, and every one of them is `NOT_AUTHORIZED` today.

**Hard limits of this document:**

- It does **not** claim that every URL is indexed by Google. A real Search Console property was
  consulted on 2026-11-02/03 for 24 representative URLs; 16 are confirmed indexed, 2 are excluded by
  noindex, 5 are not recognized and 1 public/indexable URL (`/traslados`) is not indexed. This is a
  partial sample, not a census; see §20 and `MC15-SEARCH-CONSOLE-EVIDENCE.md`.
- It does **not** prove runtime behaviour. It proves what the repository declares and what the
  local build emitted.
- It does **not** state that MAREA is public, registered, available or for sale. MAREA remains a
  proposed internal name with `MAREA_PUBLIC_USE = NO_GO` (MC-14, D-059).

## 2. Evidence classes and inspection method

### 2.1 Evidence classes used by MC-15

| Class | Meaning | Used here |
|---|---|---|
| `REPOSITORY_VERIFIED` | A fact read from a file (or a build artefact) of the frozen commit, reproducible by opening that file. | **Yes — the 23 original records in `url-evidence.json`** |
| `LOCAL_SSR_VERIFIED` | A fact observed by sending a request to a locally started SSR server. | **Yes, for the D07/D08/D09 evidence run of 2026-11-02** (built `dist` server, temporary `DATA_DIR`, port 4323). D02's own route and URL records remain `REPOSITORY_VERIFIED`. |
| `PUBLIC_OBSERVATION` | A fact observed against the public site. | **Yes, 2026-11-03** — read-only sitemap fetch and three representative URLs (`/traslados`, `/en/delivery`, `/experiencias`). |
| `SEARCH_CONSOLE_VERIFIED` | A fact taken from the verified Search Console property `sc-domain:embarcarte.com`. | **Yes, 2026-11-02** — 24 URL inspections recorded as `EV-GSC-001`…`EV-GSC-024`; partial sample, not a census. |
| `ASSUMED` | A working assumption that is not evidence. | Only where explicitly labelled |
| `UNKNOWN` | Not determinable from the available material. | Used as `NOT_OBSERVED` / `NOT_VERIFIED` |

No MC-15 dataset, document or report may state that **every** URL is indexed by Google. The only
permitted indexation states are `SEARCH_CONSOLE_VERIFIED_PARTIAL` for the 24-URL sample and
`INDEXATION_UNVERIFIED` for everything outside it. No full coverage count, ranking, traffic or
revenue claim is made.

### 2.2 Inspection method

1. `git rev-parse HEAD` → `e0be1e457456a401a529e1912770e07ed9a863e4`; `git status --porcelain`
   shows no modification of tracked files at inspection time (only the untracked MC-15
   documentation folder and team state).
2. Direct reading of the route registry, both route tables, the SEO service, the server sitemap
   and noindex sections, the two metadata scripts, the technology/guide/sample registries and the
   MC-14 findings dataset.
3. A deterministic derivation script re-read the same sources to build the three JSON datasets and
   **aborted on any count mismatch** (21 route ids, 6 technology slugs, 30 guide slugs, 10 sample
   slugs, 12 prerendered ids, 34 findings, 96 build-manifest paths). Nothing was typed from
   memory; no count in this document is an estimate.
4. Independent cross-check of the prerender count against the local build output:
   `dist/embarcarte/prerendered-routes.json` lists exactly **96** paths, and the set is identical
   to `12 static ids × 2 locales` + `6 technology slugs × 2` + `30 guide slugs × 2` (set equality
   checked, zero missing, zero extra). `dist/` is git-ignored build output produced from a tree
   with no tracked source modification relative to the frozen commit.
5. The original repository pass sent no request. Later evidence runs (2026-11-02 local SSR and
   Search Console; 2026-11-03 public read-only sitemap and three URLs) are recorded separately in
   §20 and in `data/url-evidence.json`; they do not change the repository-derived records.

### 2.3 Identifier conventions

- `routeId` values are exactly the `RouteId` union of `src/app/core/i18n/locale-routes.ts`.
- Admin ids are the contract ids `admin, adminOrders, adminOrderDetail, adminProducts,
  adminProductEdit, adminCustomers, adminMessages`; they are **not** `RouteId` members because the
  admin area is deliberately outside the localized registry.
- Legacy redirect records use the contract ids `legacyOpenMarine`, `legacyProductos`,
  `legacyProductoDetail` (contract §2.3); the wildcard 404 record uses `unknownRoute`. Neither set
  is a `RouteId` member; `current-routes.json` therefore holds exactly the 21 public + 7 admin ids.
- `urlId` shape is `URL-<CLASS>-<LOCALE>[-<SLUG>]`. Fixed segments are uppercase. Entity slugs are
  appended as published in the MC-15 task brief: uppercase for technology detail
  (`URL-TECH-DETAIL-ES-NAVEGADOR`) and verbatim lowercase for guide and sample detail
  (`URL-GUIDE-DETAIL-EN-que-es-signal-k`, `URL-SAMPLE-ES-hub`).
- Cross-file references resolve by identifier only: `current-urls[].evidenceSource` is an
  `evidenceId` of `url-evidence.json`, never a free-text pointer.
- Four evidence records describe surfaces that are not pages (robots, sitemap, API, build
  manifest). They carry their own identifiers (`URL-ROBOTS-TXT`, `URL-SITEMAP-XML`,
  `URL-API-SURFACE`, `URL-BUILD-MANIFEST`) and `urlIdKind` different from `PAGE_URL`, so they can
  carry a `urlId` without inventing a page record.

## 3. Current public route registry (21 `RouteId`)

`src/app/core/i18n/locale-routes.ts:39-63` is the only list of public URLs. Spanish paths are
unprefixed because they are already published; English paths live under `/en`. Dynamic segments
use the **same slug in both locales**, so the entity identity is locale-independent.

| # | routeId | ES pattern | EN pattern | Component | Guards | Render mode | Class | Indexable | Sitemap |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `home` | `/` | `/en` | `Home` | — | Prerender | static | yes | yes |
| 2 | `technology` | `/tecnologia` | `/en/technology` | `Technology` | — | Prerender | static | yes | yes |
| 3 | `technologyDetail` | `/tecnologia/:slug` | `/en/technology/:slug` | `ProductDetail` | `technologyExists` (CanMatch) | Prerender (6 slugs) | dynamic / static registry | yes | yes |
| 4 | `experiences` | `/experiencias` | `/en/experiences` | `Experiences` | — | Prerender | static | yes | yes |
| 5 | `delivery` | `/traslados` | `/en/delivery` | `Delivery` | — | Prerender | static | yes | yes |
| 6 | `services` | `/servicios` | `/en/services` | `Services` | — | Prerender | static | yes | yes |
| 7 | `about` | `/sobre-nosotros` | `/en/about` | `About` | — | Prerender | static | yes | yes |
| 8 | `contact` | `/contacto` | `/en/contact` | `Contact` | — | Prerender | static | yes | yes |
| 9 | `guides` | `/guias` | `/en/guides` | `Guides` | — | Prerender | static | yes | yes |
| 10 | `guideDetail` | `/guias/:slug` | `/en/guides/:slug` | `Guides` (same component) | `guideExists` (CanMatch) | Prerender (30 slugs) | dynamic / static registry | yes | yes |
| 11 | `shop` | `/tienda` | `/en/shop` | `ShopList` | — | Server | static | yes | yes |
| 12 | `shopDetail` | `/tienda/:slug` | `/en/shop/:slug` | `ShopDetail` | — | Server | dynamic / database | **conditional** | **conditional** |
| 13 | `shopSample` | `/tienda/muestra/:slug` | `/en/shop/sample/:slug` | `SampleDetail` | `sampleExists` (CanMatch) | Server | dynamic / static registry | **no** | no |
| 14 | `cart` | `/carrito` | `/en/cart` | `Cart` | — | Client (CSR shell) | private / session-bound | no | no |
| 15 | `login` | `/acceso` | `/en/login` | `Login` | — | Client (CSR shell) | private / public form, noindex | no | no |
| 16 | `account` | `/cuenta` | `/en/account` | `Account` | `authGuard` (CanActivate) | Client (CSR shell) | private / authenticated | no | no |
| 17 | `orderDetail` | `/cuenta/pedidos/:id` | `/en/account/orders/:id` | `OrderDetail` | `authGuard` (CanActivate) | Client (CSR shell)¹ | private / authenticated / dynamic | no | no |
| 18 | `legalNotice` | `/aviso-legal` | `/en/legal-notice` | `Legal` (`data.page`) | — | Prerender | static | yes | yes |
| 19 | `privacy` | `/privacidad` | `/en/privacy` | `Legal` (`data.page`) | — | Prerender | static | yes | yes |
| 20 | `cookies` | `/cookies` | `/en/cookies` | `Legal` (`data.page`) | — | Prerender | static | yes | yes |
| 21 | `termsOfSale` | `/condiciones-de-venta` | `/en/terms-of-sale` | `Legal` (`data.page`) | — | Prerender | static | yes | yes |

¹ `orderDetail` is in `CLIENT_ROUTES` (`src/server.ts:30`) and receives the noindex CSR shell, but
`src/app/app.routes.server.ts` declares **no explicit entry** for it. See §18 observation O-01.

Sources: `src/app/app.routes.ts:16-124`, `src/app/app.routes.server.ts:13-61`,
`src/app/core/i18n/locale-routes.ts:39-63`, `src/app/core/guards.ts:7-18`.

### 3.1 Render-mode summary

| Render mode | routeIds | Count |
|---|---|---|
| `Prerender` (static at build) | home, technology, technologyDetail, experiences, delivery, services, about, contact, guides, guideDetail, legalNotice, privacy, cookies, termsOfSale | 14 |
| `Server` (per request) | shop, shopDetail, shopSample | 3 |
| `Client` (browser only) | cart, login, account, orderDetail (shell) | 4 |

`12` of the `14` prerendered ids are in the `PRERENDERED` literal; the other two
(`technologyDetail`, `guideDetail`) are in `DETAILS` and expand through `getPrerenderParams`.

## 4. Admin surface (7 child patterns under one guarded parent)

`src/app/app.routes.ts:104-117`; `adminGuard` on the parent; `RenderMode.Client` for `/admin` and
`/admin/**` (`src/app/app.routes.server.ts:55-56`); Spanish only, by the documented decision
inherited from `M03-COMMERCE-SEO-DELIVERY.md`.

| # | Contract id | Pattern | Component | Indexable | Sitemap |
|---|---|---|---|---|---|
| 1 | `admin` | `/admin` | `AdminLayout` + `AdminDashboard` | no | no |
| 2 | `adminOrders` | `/admin/pedidos` | `AdminOrders` | no | no |
| 3 | `adminOrderDetail` | `/admin/pedidos/:id` | `AdminOrder` | no | no |
| 4 | `adminProducts` | `/admin/productos` | `AdminProducts` | no | no |
| 5 | `adminProductEdit` | `/admin/productos/:id` | `AdminProductEdit` | no | no |
| 6 | `adminCustomers` | `/admin/clientes` | `AdminCustomers` | no | no |
| 7 | `adminMessages` | `/admin/mensajes` | `AdminMessages` | no | no |

The admin layout sets `path: '/admin'` with `noindex: true`
(`src/app/features/admin/admin-layout.ts:29`), and the server answers `/admin` and `/admin/**`
with the CSR shell carrying `X-Robots-Tag: noindex, nofollow` (`src/server.ts:244-251`).

## 5. Concrete URL inventory and arithmetic

| Class | Rule | ES | EN | Records |
|---|---|---|---|---|
| Static prerendered pages | 12 ids × 2 locales | 12 | 12 | 24 |
| Technology detail | 6 slugs × 2 locales | 6 | 6 | 12 |
| Guide detail | 30 slugs × 2 locales | 30 | 30 | 60 |
| Shop list | 1 id × 2 locales | 1 | 1 | 2 |
| Shop detail | database pattern | 1 pattern | 1 pattern | 2 |
| Shop sample | 10 slugs × 2 locales | 10 | 10 | 20 |
| Private (cart, login, account, orderDetail) | 4 ids × 2 locales | 4 | 4 | 8 |
| Admin | 7 child patterns, ES only | 7 | 0 | 7 |
| Legacy redirects | 3 patterns + 1 concrete expansion | 4 | 0 | 4 |
| Unknown route (404) | wildcard, both locales | 1 | 1 | 2 |
| **Total records in `current-urls.json`** | | | | **141** |

**Baseline subtraction used everywhere in MC-15:** the 24 + 12 + 60 + 2 = **98** static URLs are
the served, sitemap-eligible surface without products. Sample pages (20) are served but `noindex`;
private (8) and admin (7) are served but excluded; the shop-detail pattern is data-driven and
cannot be enumerated from the frozen tree, because the local database of the frozen tree contains
no active product of its own.

## 6. Static inventory (24 prerendered pages)

Spanish: `/`, `/tecnologia`, `/experiencias`, `/traslados`, `/servicios`, `/sobre-nosotros`,
`/contacto`, `/guias`, `/aviso-legal`, `/privacidad`, `/cookies`, `/condiciones-de-venta`.
English: `/en`, `/en/technology`, `/en/experiences`, `/en/delivery`, `/en/services`, `/en/about`,
`/en/contact`, `/en/guides`, `/en/legal-notice`, `/en/privacy`, `/en/cookies`,
`/en/terms-of-sale`.

Each is emitted as a real `index.html` by the build (`dist/embarcarte/prerendered-routes.json`) and
is listed in the sitemap from that filesystem walk, not from the registry — a route added to the
registry without a `Prerender` entry never reaches the sitemap.

## 7. Dynamic inventory

| Registry | Count | Identity rule | Evidence |
|---|---|---|---|
| `TECHNOLOGY_IDENTITY` (technology slugs) | 6 | `navegador`, `cartografia`, `hub`, `piloto-automatico`, `simulacion`, `pasarela-sensores`; identical in both locales | `src/app/features/technology/models/technology.ts:11-18` |
| `GUIDE_SLUGS` (guide slugs) | 30 | Spanish slug reused verbatim under `/en/guides/`; translated slugs are explicitly out of scope | `src/app/features/guides/models/guides.ts:6-42` |
| `SAMPLE_PRODUCTS` (sample slugs) | 10 | `anemometro`, `veleta`, `piloto`, `gps`, `ais`, `sonda`, `corredera`, `adaptador-nmea`, `antena-ais`, `hub` | `src/app/core/sample-products.ts:16-27` |
| `products` table (shop slugs) | data | one URL per active row; not enumerable from the repository | `src/server.ts:183-201`, `src/server/api.ts:315-334` |
| `orders` table (order ids) | data | `/cuenta/pedidos/:id`, private, `authGuard` | `src/app/features/account/order-detail.ts` |

All 6 technology and all 30 guide instances are present in the build manifest for both locales
(12 and 60 paths). The 10 sample slugs are **not** prerendered — they are server-rendered and
`noindex`.

## 8. Commerce and translation status (the only conditional indexation in the current site)

`shopDetail` is the single current route whose canonical, `hreflang`, robots and sitemap
eligibility depend on row-level content state (`src/app/features/shop/shop-detail.ts:167-177`):

| Product state | `/tienda/:slug` | `/en/shop/:slug` | Sitemap |
|---|---|---|---|
| All four EN fields present (`name_en`, `category_en`, `summary_en`, `description_en`) | 200, self-canonical, `es` + `en` alternates | 200, self-canonical, `es` + `en` alternates | both URLs |
| Spanish-only product | 200, self-canonical, **`es` self-alternate only** | reachable, **`noindex`**, **no alternates** | Spanish URL only |
| Unknown / inactive slug | 200, `noindex`, **no canonical**, no alternates | same | none |

Consequences that later deliverables must preserve:

- A Spanish-only product **must not** advertise an English alternate. Advertising one would point a
  crawler at a page that publishes itself as not-indexable.
- The English URL of a Spanish-only product still resolves with 200 and `noindex`. It is a served
  URL, not a published translation, and it is not evidence that the catalogue is bilingual.
- No product of either kind is published in the frozen tree by default: the database seeds three
  draft products (`open-marine-hub`, `open-marine-autopilot`, `kit-ais-sdr`) with `active = 0`
  (`src/server/db.ts:110-139`), so **no product URL is enumerated in MC-15 data**;
  `current-urls.json` carries pattern records instead.

## 9. Private, account and cart surface

`cart`, `login`, `account` and `orderDetail` are served as a **localised CSR shell before Angular
runs** (`src/server.ts:239-252`): `Content-Type: text/html`, `Cache-Control: no-store`,
`X-Robots-Tag: noindex, nofollow`, no session data, no cookie set, and no canonical or `hreflang`.
The shell exists in both locales because the shell file is rewritten for `/en` before it is served.

`account` and `orderDetail` are additionally protected by `authGuard`, which redirects to
`/acceso` or `/en/login` with `?volver=` (`src/app/core/guards.ts:7-11`). `orderDetail` deliberately
keeps the order id across locales (`locale-routes.ts:56-58`), so a language switch does not drop
the customer on a foreign home page.

## 10. Legacy redirects (3 active, all one hop)

| Pattern | Contract id | Target | Status | Declared in | Keeping it matters because |
|---|---|---|---|---|---|
| `/open-marine` | `legacyOpenMarine` | `/tecnologia` | 301 | `app.routes.ts:120`, `app.routes.server.ts:57` | Historical address of the original platform page; external links and crawlers still use it. |
| `/productos` | `legacyProductos` | `/tecnologia` | 301 | `app.routes.ts:121`, `app.routes.server.ts:58` | Previous catalogue index. |
| `/productos/:slug` | `legacyProductoDetail` | `/tecnologia/:slug` | 301 | `app.routes.ts:122`, `app.routes.server.ts:59` | Keeps the slug, so the entity identity survives the redirect. |

No chain exists: each destination is a prerendered 200 page. The inherited test asserts all three
with `redirect: 'manual'` (`scripts/check-i18n.mjs:494-504`), including the parameterised case
`/productos/navegador → /tecnologia/navegador`.

## 11. Unknown-route 404

- `app.routes.ts:124` declares `path: '**'` → `NotFound` component.
- `app.routes.server.ts:60-61` renders it in `Server` mode with `status: 404`.
- `not-found.ts:40-44` sets `noindex: true` and **no** `path`, which removes the canonical and
  `og:url` instead of pointing at a page that does not exist (`seo.service.ts:14-18,70-82`).
- The 404 copy follows the locale of the requested URL; the inherited tests check `/no-existe` and
  `/en/no-existe` (status 404, `lang` correct, `noindex`, no canonical, no alternate) and that
  `/en/technology/no-existe` is also a 404.

## 12. API and infrastructure exclusion

`app.use('/api', api)` is mounted **before** Angular (`src/server.ts:136`), and `public/robots.txt`
declares `Disallow: /api/`. No API path belongs to the localized or SEO surface.

| Surface | Reality in the frozen tree | In the SEO surface? |
|---|---|---|
| `/api/*` | 13 handler registrations (`src/server/api.ts:105-460`) | no |
| `/api/admin/*` | 14 handler registrations (`src/server/api.ts:496-715`) | no |
| `/uploads/*` | static upload directory, `index: false`, `redirect: false` | no |
| `/healthz`, `/readyz` | operational probes (`src/server.ts:121-134`) | no |
| `/sitemap.xml` | generated from the build walk + shop products (`src/server.ts:183-215`) | it *is* the sitemap, not a page |
| `/robots.txt` | static file in `public/` | not a page |
| hashed assets | `express.static` with long cache | not pages |

`/api/orders` appears in the MC-14 findings as a **risk surface**, not as a page: it is counted
here as 34-findings evidence but excluded from the public URL inventory (§16).

## 13. Sitemap baseline arithmetic

The sitemap is assembled in `src/server.ts:183-215` from four sources:

1. every `index.html` found by walking the browser build output → **96** paths in the frozen build;
2. the literal `/tienda` → 1;
3. the literal `/en/shop` → 1;
4. every **active** product in Spanish, plus an English URL only when the product has all four EN
   fields → 0 in the frozen tree, because the three seeded products are drafts with `active = 0`
   (`src/server/db.ts:110-139`), and `N` in an operated database.

| Component | Arithmetic | Count |
|---|---|---|
| Static prerendered pages | 12 ids × 2 locales | 24 |
| Technology detail | 6 slugs × 2 locales | 12 |
| Guide detail | 30 slugs × 2 locales | 60 |
| **Prerendered subtotal** (walked from `dist`) | | **96** |
| Shop lists | `/tienda` + `/en/shop` | 2 |
| **Static surface without products** | 96 + 2 | **98** |
| Products | active ES rows + translated EN rows | `N` |
| **Total** | 98 + N | **98 + N** |

Controls that must not be broken by any future route:

- `x-default` is emitted **only** for the home pair and points at `/` (`src/server.ts:176-179`).
- `xhtml:link` alternates are emitted **only** when both locales are themselves in the same sitemap
  (`src/server.ts:165-181`), so an alternate can never point at a URL that is not served.
- `lastmod` exists only for product URLs (taken from `updated_at`); static URLs carry none.
- Private pages, sample pages, admin and legacy redirects are never in the sitemap; the inherited
  test asserts their absence (`scripts/check-seo.mjs:152-163`).
- If the browser build output is absent (development server), the walk yields nothing and the
  sitemap degrades to `/tienda`, `/en/shop` plus products. This is a development-only artefact, not
  a production state; no production sitemap was observed.

## 14. Canonical and hreflang observations

- Canonical, `hreflang` and `og:url` are **derived**, never hand-written: `pageSeo()`
  (`src/app/core/seo.service.ts:129-135`) builds `path` from the registry and declares both locales
  as alternates for the same `routeId` and the same params.
- The home pair is the only one that declares `x-default`, and it points at the Spanish home
  (`seo.service.ts:134`; asserted by `scripts/check-seo.mjs:173-180` and
  `scripts/check-i18n.mjs:490-492`).
- A page with `noindex` publishes **no** canonical and **no** alternate: the 404 does this by
  omitting `path`, and the private shell does it by never rendering `pageSeo`.
- `shopSample` sets `noindex: true` and `alternates: []` explicitly
  (`src/app/features/shop/sample-detail.ts:44-54`).
- `shopDetail` narrows the pair per product (§8). This is the current site's only "no alternate for
  an untranslated page" implementation, and it is the pattern D04–D06 must generalise.
- Reciprocity is enforced, not assumed: every sitemap alternate must also appear in the page HTML
  and every sitemap loc must be canonical on its own page (`scripts/check-seo.mjs:212-235`); private
  pages must carry neither canonical nor `hreflang` (`:276-295`).

## 15. Translation-status observations

| Observation | Evidence |
|---|---|
| All 21 public `RouteId`s exist in both locales in the registry, with no missing EN path. | `locale-routes.ts:39-63`; `scripts/check-i18n.mjs:115-131` round-trips every id × locale. |
| The dictionaries are key-for-key identical and no key is empty in either locale. | `scripts/check-i18n.mjs:170-180`. |
| Technology content is published in both locales for all 6 modules; spec rows must match between locales. | `scripts/check-i18n.mjs:229-249`. |
| All 30 guides are published in both locales, with filled sections. | `scripts/check-i18n.mjs:253-271`. |
| Legal pages exist in both locales and must stay legally equivalent. | `scripts/check-i18n.mjs:274-283`; MC-14 handoff §5. |
| Sample products carry EN fields for all 10 rows, but the sample pages are `noindex` in both locales. | `src/app/core/sample-products.ts:16-27`, `sample-detail.ts:44-54`. |
| **Shop products are not covered by dictionary parity at all**: a Spanish-only product has no EN alternate and its EN URL is `noindex`. | `shop-detail.ts:167-177`; `src/server.ts:192-201`. |
| English guide URLs keep the Spanish slug by design. | `guides.ts:6-10`. |

The last two rows are the reason the inventory is bilingual but **not** symmetrical: translated
copy exists for every registry page, while translated catalogue rows are a per-row property.

## 16. URLs referenced by the MC-14 website findings (34 findings → 16 paths)

Computed from `docs/marea/legal-commercial/data/website-findings.json` (34 records, all `es`, all
`NOT_REMEDIATED`). Fifteen of the sixteen paths are current localized URLs; `/api/orders` is an API
endpoint and is excluded from the public URL inventory.

| # | Finding route | Findings | Count | Mapped `routeId` | In the 98 static surface? |
|---|---|---|---|---|---|
| 1 | `/` | WEB-016, WEB-021, WEB-033 | 3 | `home` | yes |
| 2 | `/tecnologia` | WEB-003, WEB-015, WEB-029 | 3 | `technology` | yes |
| 3 | `/tecnologia/piloto-automatico` | WEB-006, WEB-019, WEB-034 | 3 | `technologyDetail` (`piloto-automatico`) | yes |
| 4 | `/tecnologia/hub` | WEB-018, WEB-020 | 2 | `technologyDetail` (`hub`) | yes |
| 5 | `/tecnologia/navegador` | WEB-017 | 1 | `technologyDetail` (`navegador`) | yes |
| 6 | `/experiencias` | WEB-026 | 1 | `experiences` | yes |
| 7 | `/sobre-nosotros` | WEB-022 | 1 | `about` | yes |
| 8 | `/tienda` | WEB-004 | 1 | `shop` | yes |
| 9 | `/tienda/:slug` | WEB-013, WEB-014, WEB-027 | 3 | `shopDetail` | pattern (data) |
| 10 | `/tienda/muestra/:slug` | WEB-031 | 1 | `shopSample` | no (noindex) |
| 11 | `/carrito` | WEB-011, WEB-023 | 2 | `cart` | no (private) |
| 12 | `/acceso` | WEB-009, WEB-010 | 2 | `login` | no (private) |
| 13 | `/aviso-legal` | WEB-001, WEB-002, WEB-005, WEB-025 | 4 | `legalNotice` | yes |
| 14 | `/privacidad` | WEB-007, WEB-008 | 2 | `privacy` | yes |
| 15 | `/condiciones-de-venta` | WEB-024, WEB-028, WEB-030 | 3 | `termsOfSale` | yes |
| 16 | `/api/orders` | WEB-012, WEB-032 | 2 | — (API, not a page) | no |
| | **Totals** | | **34** | **13 distinct `RouteId` + 1 API** | 24 findings on 11 prerendered routes |

Reading the table:

- **No finding exists against `/cookies`.** The MC-14 handoff summary claims one (WEB-022); the
  machine dataset places WEB-022 on `/sobre-nosotros`. See §18, O-02.
- No finding exists in English. The MC-14 evidence base covers the Spanish surface only, so it does
  **not** prove bilingual claim parity; that remains an open verification for MC-15 deliverables.
- 24 of the 34 findings sit on 11 routes of the static 98-URL surface (10 prerendered pages plus the
  server-rendered shop list), and 3 more sit on the dynamic shop-detail pattern. Any future
  remediation of those pages touches documents that are already served, so it must go through the
  redirect/robots invariants in D03.

## 17. Reconciliation of the "101" observation

The inherited SEO test reports a sitemap of **101** URLs. That number is explained exactly and is
**not** a production count:

| Step | Arithmetic | Result |
|---|---|---|
| Prerendered pages in the build | 12 × 2 + 6 × 2 + 30 × 2 | 96 |
| Shop lists added by hand | `/tienda`, `/en/shop` | 98 |
| Products seeded by the test fixture (`scripts/check-seo.mjs:80-115`) | 2 active products: `seo-translated` (full EN) and `seo-solo-es` (no EN) | 98 |
| Product URLs the sitemap emits for that fixture | `/tienda/seo-translated`, `/en/shop/seo-translated`, `/tienda/seo-solo-es` | 101 |

Why this is not a production number:

1. The fixture creates its own database in a temporary directory and seeds exactly two products
   (`mkdtemp`, `DATA_DIR=data`). A real database may hold a different number of active products, so
   the true production count is `98 + N` with `N` unknown and unobserved.
2. `scripts/check-seo.mjs:132` asserts only `blocks.length >= 100` — a floor, not an inventory.
3. The frozen tree's own database seeds only three **draft** products with `active = 0`
   (`src/server/db.ts:110-139`), so 101 is not even reproducible without the fixture.
4. 101 is **not** a production or Google indexation count. It is the number of `<loc>` entries one
   test run produced. The indexation status of every URL is now `SEARCH_CONSOLE_VERIFIED_PARTIAL`
   for the 24 inspected URLs and `INDEXATION_UNVERIFIED` outside that sample (§20).

An independent predecessor statement agrees with the 98 baseline: `docs/marea/brand/
WEBSITE-BRAND-MIGRATION.md` §7.1 records "98 static URLs (24 prerendered prose pages + 12
technology-detail pages + 60 guide-detail pages + 2 shop lists)". MC-03 calls them "indexed"; MC-15
records 16 of 24 sampled URLs as confirmed indexed and the rest as unverified (§20).

## 18. Structural observations, discrepancies and open items

None of these is a change request. They are recorded so that a later deliverable does not build on
a false premise.

| Id | Observation | Evidence | Effect on MC-15 |
|---|---|---|---|
| O-01 | `orderDetail` has **no explicit `serverRoutes` entry**: `src/app/app.routes.server.ts` declares client render for `cart`, `login` and `account` only, while `src/server.ts:30` lists `orderDetail` in `CLIENT_ROUTES`. A normal HTML request is served by the CSR-shell middleware, but a request that bypasses the shell middleware would fall through to the `**` route declared with `status: 404`. | `app.routes.server.ts:48-54`, `server.ts:29-30,239-252`; the shell path is asserted 200 in `check-i18n.mjs:554-559` | `orderDetail` is recorded as `Client (CSR shell)` with this caveat in `current-routes.json`. Any future touch of render modes must add the missing declaration; MC-15 proposes the fix but does not apply it. |
| O-02 | The MC-14 **human-readable** page table (`MC14-MC15-HANDOFF.md` §4, `data/mc15-handoff-inputs.json` → `pageByPageIssues`) does not match the MC-14 **machine dataset** `website-findings.json`: the route/finding grouping is shifted, e.g. the handoff lists WEB-022 under `/cookies` while the dataset places it on `/sobre-nosotros`, and `/cookies` has no finding at all. | `website-findings.json` (34 records) vs `mc15-handoff-inputs.json` `pageByPageIssues` (8 rows) | MC-15 uses the machine dataset as the authority for route↔finding mapping; the handoff summary is treated as a narrative index. The mismatch is not corrected here (MC-14 files are frozen and out of scope) and must be reconciled by whoever owns MC-14 records. |
| O-03 | MC-03 §7.1 labels the 98 URLs "indexed". The repository shows they are served and sitemapped; Search Console confirms 16 of 24 sampled URLs as indexed, not all 98. | `WEBSITE-BRAND-MIGRATION.md` §7.1; `data/search-console-evidence.json` | MC-15 uses `SEARCH_CONSOLE_VERIFIED_PARTIAL` for the sample and `INDEXATION_UNVERIFIED` outside it. No full-coverage claim. |
| O-04 | The sitemap is built from the **filesystem** of the build output, not from the route registry. A registry route without a `Prerender` entry is invisible to the sitemap unless it is added by hand (as `shop` is). | `src/server.ts:139-155,195-201` | Any future MAREA route must be prerendered **or** explicitly added; the redirect/canonical registry (D04–D06) must state which. |
| O-05 | `shopDetail` resolves without a `CanMatch` guard, unlike `technologyDetail`, `guideDetail` and `shopSample`. An unknown slug renders a 200 page with `noindex` and no canonical instead of a 404. | `app.routes.ts:74-75`, `shop-detail.ts:122-131` | Recorded as current behaviour. MC-15 does not change status codes; a future decision may revisit it. |
| O-06 | `x-default` exists on the home pair only. Every other bilingual pair declares `es` + `en` and no `x-default`. | `seo.service.ts:134`; `check-seo.mjs:173-180` | D04's canonical/hreflang matrix must keep this rule or justify a change explicitly. |
| O-07 | Portuguese was withheld by decision, so the site is strictly two-locale today. | D-031 in `docs/marea/execution/DECISION-LOG.md` | No third locale is assumed anywhere in MC-15. |
| O-08 | The package validator rule `IA-014` originally required every Spanish non-private, non-sample current URL to carry a `KEEP_*` disposition, which conflicted with the MC-15 specification requiring `DYNAMIC_DB` for the shop-detail pattern. **Resolved on 2026-11-02 by the team lead:** `IA-014` now carries an explicit exception for `routeId === 'shopDetail'` with `migrationDisposition === 'DYNAMIC_DB'`, and the two pattern records keep that value because the URL set is database rows, not registry entries. | `scripts/check-marea-ia-seo.mjs:424` (`dynamicException`); `data/current-urls.json` items `URL-SHOP-DETAIL-PATTERN-ES` / `-EN` | No action left for MC-15. Verified by running the validator's `validateData` over the datasets that exist: no `IA-014` finding points at any D02/D03 record. |
| O-09 | An unknown legacy product slug such as `/productos/does-not-exist` answers `404` with `Location: /tecnologia/does-not-exist`, an empty body and no noindex body. This is the inherited Angular redirect leaving a header on a 404, not a 3xx redirect. | `app.routes.ts:122`; isolated local SSR run 2026-11-02, reproduced after the D20 audit (finding IA-04) | Recorded as inherited behaviour. The no-301-to-a-404 invariant holds; MC-15 changes no live routing. |

There are **no** unexplained differences between the verified counts in this document and the
build artefacts: 21 route ids, 7 admin ids, 6 technology slugs, 30 guide slugs, 10 sample slugs, 3
legacy redirects, 96 prerendered paths, 98 static URLs, 141 concrete URL records.

## 19. What this inventory does not establish

- It does not establish that the site is deployed, reachable or currently serving these URLs.
- It does not establish indexation, ranking, impressions, clicks or crawl status for every URL. It
  records the 24-URL Search Console sample in §20 and leaves the rest `INDEXATION_UNVERIFIED`.
- It does not establish sitemap submission for every future URL; it records the current
  `sitemap.xml` submission and the invalid root-URL sitemap submission.
- It does not establish that any MC-14 finding has been remediated: all 34 remain
  `NOT_REMEDIATED`.
- It does not establish any MAREA route, slug, title, canonical, redirect or publication state.
  Every MAREA page in MC-15 remains `PROPOSED_INTERNAL_NOT_DEPLOYABLE`.
- It does not start MC-16.

## 20. Search Console verification (2026-11-02)

Read-only Search Console evidence was captured for `sc-domain:embarcarte.com`
(permission `siteFullUser`) using the service account
`guiatv-gsc@guia-tv-8fe3c.iam.gserviceaccount.com`:

| Metric | Count |
|---|---:|
| URLs inspected | 24 |
| Indexed confirmed | 16 |
| Excluded by noindex | 2 |
| Not recognized | 5 |
| Public/indexable but not indexed | 1 (`/traslados`; coverage wording varies between “not recognized” and “discovered, currently not indexed”) |
| MAREA URLs indexed | 0 |
| Sitemap submitted URLs | 98 |

The preferred sitemap (`sitemap.xml`) is submitted with 0 errors and 98 URLs; the home URL was
also submitted as a sitemap and reports 1 error. `/traslados` is public, indexable, self-canonical
and in the sitemap but not indexed; Search Console coverage wording varies between “does not
recognize” and “discovered, currently not indexed” — a pre-existing operational gap recorded as
`GSC-01`. Private, sample and proposed MAREA URLs are not recognized or are noindex, as expected.
Full evidence: `MC15-SEARCH-CONSOLE-EVIDENCE.md` and `data/search-console-evidence.json`.

## 21. Cross-references

| Reference | Why it is cited |
|---|---|
| `MC15-DATA-CONTRACT.md` | Schema authority for all three datasets and the identifier vocabulary. |
| `MC15-EXISTING-URL-PRESERVATION-POLICY.md` (D03) | Binding preservation rules for every URL catalogued here. |
| `data/current-routes.json` | 28 route records (21 public + 7 admin) with the §3/§4 tables. |
| `data/current-urls.json` | 141 concrete URL records with `migrationDisposition` and `preservationReason`. |
| `data/url-evidence.json` | 47 evidence records: 23 `REPOSITORY_VERIFIED` + 24 `SEARCH_CONSOLE_VERIFIED`. |
| `data/search-console-evidence.json` | 24 URL inspections, sitemap status, five GSC findings and limitations (partial sample). |
| `src/app/core/i18n/locale-routes.ts` | The only list of public URLs. |
| `src/app/app.routes.ts`, `src/app/app.routes.server.ts` | Route table and render-mode table. |
| `src/app/core/seo.service.ts` | Canonical/hreflang derivation. |
| `src/server.ts` | CSR shell, noindex header, sitemap assembly, API mount. |
| `public/robots.txt` | `Disallow: /api/`, sitemap declaration. |
| `scripts/check-i18n.mjs`, `scripts/check-seo.mjs` | The inherited assertions that already pin the surface. |
| `docs/marea/legal-commercial/data/website-findings.json` | The 34 MC-14 findings mapped in §16. |
| `docs/marea/brand/WEBSITE-BRAND-MIGRATION.md` §7 | Independent predecessor inventory that agrees on 98. |
| `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` row 15 | MC-15 objective and verification criteria. |
| `docs/marea/execution/DECISION-LOG.md` | D-031 (no Portuguese), D-059/D-060 (no public MAREA use, no authorised claim). |
