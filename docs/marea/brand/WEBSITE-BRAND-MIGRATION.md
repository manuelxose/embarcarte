# EMBARCARTE / MAREA — Website brand surface audit and migration plan

| Field | Value |
| --- | --- |
| Document ID | MC-03 / WEBSITE-BRAND-MIGRATION |
| Milestone | MC-03 — corporate brand architecture, trademark clearance research, commercial positioning, brand governance |
| Programme | EMBARCARTE / MAREA (36 Master Prompts) |
| Date | 2026-10-30 |
| Nature | **Read-only audit.** Not a legal opinion, not a trademark clearance, not a publication of the MAREA brand, not a commercial availability statement |
| Method | Read-only Git (`git grep`, `git log`, `git show`) + manual verification of every cited source line with the file reader. No build, no format, no test execution, no network |
| Source commit | `9631c6f52b20b20e85506b097615ca5eb1107a94` (`9631c6f`, branch `feature/marea-mc03-brand-governance`, 2026-10-30 17:25:24 +0100) |
| Repository | `manuelxose/embarcarte` |
| Prepared by | Agent F (`web-brand-auditor`) |
| Owner | Lead (Brand and Commercial Program Director) |
| Exclusive write scope | This file only |
| Companion documents | `BRAND-ARCHITECTURE.md`, `COMMERCIAL-BRAND-CLAIMS-POLICY.md`, `BRAND-VOICE-ES-EN.md`, `BRAND-AND-IP-DECISION-PACKAGE.md`, `brand-identity.contract.json` (all MC-03); `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` (MC-02 evidence base) |
| Status | COMPLETE (audit). Migration is **not authorised** by this document |

## 0. Status statement (read before using this audit)

- **EMBARCARTE** is the trading company and seller of record. Its corporate registration data
  (`SITE.legal`) is incomplete and must never be invented (MC-02 blocker **X-02**).
- **MAREA** is a **proposed** product brand. `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; no product is
  commercially available. Nothing in this audit authorises publication, filing or asset procurement.
- **OPEN-MARINE** is the existing engineering foundation with **unresolved ownership and licensing**
  (MC-02 blockers L-01..L-04, decision DEC-01). It is not a cleared public product brand.
- The live website **continues to render EMBARCARTE and OPEN-MARINE naming after this audit**. Every
  required change is deferred to a later, explicitly authorised milestone.
- **This audit changed no source file, route, metadata, dictionary, legal field, asset or commerce
  behaviour.** Proof in §9.

## 1. Metadata

| Field | Value |
| --- | --- |
| Audit unit | one distinct verified `file:line` containing a brand-identity, protocol/certification, product or commercial-availability reference |
| Surface classes | `public` (rendered/indexed/served to users), `legal` (legal pages and seller data), `technical` (build, tests, operations, code comments, admin) |
| Brand lexicon | `Embarcarte`, `Open Marine`, `OPEN-MARINE`, `OMI`, `Open Marine Instrumentation`, `MAREA`, product module names |
| Claims lexicon | `NMEA`, `NMEA 2000`, `AIS`, `Signal K`, `certified`, `certificado`, `CE`, `ECDIS`, `stock`, `disponible`, `in stock`, `en stock`, `precio`, `€`, `buy`, `comprar`, `part of`, `powered by` |
| Classification vocabulary | `KEEP`, `EVENTUALLY_MIGRATE_TO_MAREA`, `TECHNICAL_INTERNAL_ONLY`, `REQUIRES_LEGAL_APPROVAL`, `REQUIRES_PRODUCT_VALIDATION`, `REQUIRES_COPY_CORRECTION`, `REQUIRES_SEO_MIGRATION` (one per row; defined in §2.4) |
| Independent review | Required by a different agent before this audit is accepted; the reviewer must inspect the cited lines, not this summary |

## 2. Method and scope

### 2.1 Exact commands and match counts

All commands were run read-only from the repository root at `9631c6f`, over `src/ public/ scripts/`.
"Lines" is the number of matched lines (not occurrences); a line may contain several terms.

```text
git grep -n -i -F -- "embarcarte" -- src public scripts                       # 83 lines (src 43 / public 3 / scripts 37)
git grep -n -i -F -- "open marine" -- src public scripts                     # 74 lines (src 73 / scripts 1)
git grep -n -i -F -- "open-marine" -- src public scripts                     # 7 lines
git grep -n -i -F -- "Open Marine Instrumentation" -- src public scripts     # 0 lines (6 lines exist only in docs/marea/compliance)
git grep -n -E     -- "\bOMI\b" -- src public scripts                        # 0 lines
git grep -n -i -F -- "MAREA" -- src public scripts                           # 0 lines
git grep -n -i -F -- "NMEA" -- src public scripts                            # 41 lines (all under src)
git grep -n -i -w -F -- "AIS" -- src public scripts                          # 78 lines
git grep -n -i -F -- "signal K" -- src public scripts                        # 46 lines
git grep -n -i -E -- "certificad|certified|certificat" -- src public scripts # 0 lines
git grep -n -i -F -- "ECDIS" -- src public scripts                           # 0 lines
git grep -n -i -w -F -- "stock" -- src public scripts                        # 74 lines
git grep -n -i -E -- "disponible|disponibilidad" -- src public scripts       # 35 lines
git grep -n -i -w -F -- "precio" -- src public scripts                       # 10 lines
git grep -n -F -- "€" -- src public scripts                                  # 7 lines
git grep -n -i -F -- "in stock" -- src public scripts                        # 1 line
git grep -n -i -F -- "en stock" -- src public scripts                        # 1 line
git grep -n -i -w -F -- "buy" -- src public scripts                          # 3 lines
git grep -n -i -w -F -- "comprar" -- src public scripts                      # 6 lines
git grep -n -i -F -- "part of" -- src public scripts                         # 3 lines
git grep -n -i -F -- "powered by" -- src public scripts                      # 0 lines
```

Positive findings from the lexicon: **no** `MAREA`, `OMI`, `Open Marine Instrumentation`, `ECDIS`,
`certified`, `certificado` or `powered by` text exists in the public source; the brand is currently
described exclusively as **EMBARCARTE** (company) selling **Open Marine** (platform/modules).

### 2.2 Files read for context (not only grepped)

`src/app/core/site.config.ts`, `seo.service.ts`, `images.ts`, `sample-products.ts`,
`core/i18n/{locale-routes,locale.config,locale.service}.ts`, `src/index.html`, `src/server.ts`,
`src/server/db.ts` (seed section), `src/app/app.routes.ts`, `src/app/app.routes.server.ts`,
`src/app/layout/{brand.ts,header/header.ts,footer/footer.ts,language-switcher/language-switcher.ts}`,
`src/app/features/{home,technology,services,about,guides,delivery,experiences,shop,legal,contact}/**`,
`src/app/i18n/{dictionary,es,en}.ts`, `scripts/check-seo.mjs`, `public/{robots.txt,site.webmanifest,favicon.svg}`,
`angular.json`, `package.json`, `docs/marea/{brand/*,compliance/MC-02-BLOCKERS-AND-DECISIONS.md,execution/*}`.

### 2.3 Inventory granularity

- Public corporate/legal strings and platform/product names are inventoried **one row per `file:line`**.
- The 30 guide articles are inventoried **one row per article** (`guides.es.ts` title line + `guides.en.ts`
  title line), because every guide uses the same components and routing and the protocol terms inside
  them are third-party educational description, not an EMBARCARTE product claim. Any article containing
  a platform-capability or naming statement cites that extra line in its rationale.
- Repetitive build/test identifiers are inventoried as **one row per file group**, with every `file:line`
  listed in the cell.

### 2.4 Classification vocabulary (mandatory, applied once per row)

| Class | Meaning |
| --- | --- |
| `KEEP` | True by role or by recorded fact; remains correct after any brand migration; no evidence gate |
| `EVENTUALLY_MIGRATE_TO_MAREA` | Customer-facing name whose MAREA equivalent is already defined by `BRAND-ARCHITECTURE.md`; changes only in an authorised Phase 3, never now |
| `TECHNICAL_INTERNAL_ONLY` | Build/test/ops/admin identifier or code comment; not public; may keep `embarcarte` indefinitely and must not be "brandified" |
| `REQUIRES_LEGAL_APPROVAL` | Statement about legal identity, ownership, licensing or contractual terms; blocked on company data or counsel (X-01, X-02, L-01..L-04, DEC-01) |
| `REQUIRES_PRODUCT_VALIDATION` | Capability, compatibility or specification claim needing MC-02 evidence and a product-readiness decision (H-01/H-04/H-10, P-01..P-04, D-01..D-03, X-05) |
| `REQUIRES_COPY_CORRECTION` | Wording that is currently false, unverifiable, absolute or inconsistent with the MC-02 evidence base; must be rewritten before any public brand milestone |
| `REQUIRES_SEO_MIGRATION` | String or URL whose change affects indexing (title, meta, canonical host, JSON-LD identity, redirect, sitemap, robots); needs a redirect/metadata plan plus post-change verification |

## 3. Inventory of the current public brand surface

### 3A. Corporate identity (EMBARCARTE) — company, legal and static shell

| # | File:line | Exact quoted string (short) | Locale(s) | Surface | Classification | Rationale |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `src/app/core/site.config.ts:7` | `name: 'Embarcarte'` | es/en | public | KEEP | Company/seller name; feeds title suffix (`seo.service.ts:39`), `og:site_name` (`:47`), JSON-LD `Organization`/`WebSite` (`home.ts:106,112`) and product `seller` (`shop-detail.ts:162`) |
| 2 | `src/app/core/site.config.ts:8` | `url: 'https://embarcarte.com'` | es/en | public | KEEP | Canonical host and JSON-LD URLs; domain strategy is a separate decision, not part of brand naming |
| 3 | `src/app/core/site.config.ts:10-11` | `defaultDescription: 'Embarcarte diseña y comercializa tecnología náutica abierta: ...'` | es | public | REQUIRES_COPY_CORRECTION | Describes an "open" technology the company designs/sells; contradicts unresolved OPEN-MARINE licensing (L-01). Also **dead config**: no consumer in `src/` (only the declaration matches `defaultDescription`) |
| 4 | `src/app/core/site.config.ts:12` | `'... piloto automático para tu embarcación con Open Marine.'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Platform name presented as customer-facing brand; MAREA replaces platform naming in a future authorised phase |
| 5 | `src/app/core/site.config.ts:13` | `email: 'info@embarcarte.com'` | es/en | public | KEEP | Company contact used in footer, legal pages and JSON-LD `Organization.email` |
| 6 | `src/app/core/site.config.ts:22` | `owner: 'Embarcarte'` | es/en | legal | REQUIRES_LEGAL_APPROVAL | Rendered as the site owner (`legal.ts:32`); verified corporate identity does not exist yet (X-02) |
| 7 | `src/app/core/site.config.ts:23` | `taxId: ''` | es/en | legal | REQUIRES_LEGAL_APPROVAL | Empty; must not be invented (X-02); `legal.ts:36` prints the "pending" notice |
| 8 | `src/app/core/site.config.ts:24` | `address: ''` | es/en | legal | REQUIRES_LEGAL_APPROVAL | Empty; same blocker; LSSI-CE seller identification is incomplete while it stays empty |
| 9 | `src/app/core/site.config.ts:25` | `registry: ''` | es/en | legal | REQUIRES_LEGAL_APPROVAL | Empty; same blocker; registry data is optional in copy but must come from the company |
| 10 | `src/index.html:5` | `<title>Embarcarte · Tecnología náutica abierta</title>` | es | public | REQUIRES_SEO_MIGRATION | Static shell title; overwritten by `SeoService` after hydration but served pre-hydration and on private responses (`server.ts:47`) |
| 11 | `src/index.html:8` | `<meta name="description" content="Embarcarte diseña ... con Open Marine.">` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Third copy of the `site.config.ts` description (see rows 3–4); independent edit risk |
| 12 | `src/server.ts:47` | `<title>Embarcarte · Open marine technology</title>` | en | public | REQUIRES_SEO_MIGRATION | Hard-coded EN shell title; not sourced from `SITE`; must be changed atomically with row 10 |
| 13 | `src/server.ts:51` | `'Embarcarte designs and sells open marine technology: ... with Open Marine.'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Hard-coded EN shell description; duplicate of row 11 |
| 14 | `src/app/layout/brand.ts:11` | `<span class="brand-name">embarcarte</span>` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Wordmark hard-coded in the header/footer component; future lockup is MC-04 work and not authorised |
| 15 | `src/app/layout/footer/footer.ts:71` | `© {{ year }} Embarcarte` | es/en | public | KEEP | Copyright belongs to the company; MAREA is not the legal person |
| 16 | `src/app/layout/footer/footer.ts:74` | `<span class="footer-domain">embarcarte.com</span>` | es/en | public | KEEP | Domain display; unchanged |
| 17 | `src/app/layout/footer/footer.ts:72` | `{{ i18n.t('footer.developedBy') }} Tecnoria` | es/en | public | KEEP | Factual developer attribution; the ownership nuance (MC-02 L-03) is a separate legal matter, not a brand string |
| 18 | `src/app/i18n/es.ts:10` | `'a11y.brand': 'Embarcarte, inicio'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Accessible name of the logo link; must match whichever wordmark is finally rendered |
| 19 | `src/app/i18n/en.ts:6` | `'a11y.brand': 'Embarcarte, home'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 20 | `src/app/i18n/es.ts:141` | `'cart.seoDescription': 'Tu carrito en Embarcarte.'` | es | public (private page) | EVENTUALLY_MIGRATE_TO_MAREA | Cart is `noindex` (`server.ts:30,250`); low SEO impact |
| 21 | `src/app/i18n/en.ts:136` | `'Your Embarcarte basket.'` | en | public (private page) | EVENTUALLY_MIGRATE_TO_MAREA | Same |
| 22 | `src/app/features/home/content/home.content.ts:91` | `title: 'Embarcarte - Tecnología abierta. Libertad en el mar.'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Indexed home `<title>`; a brand switch must be co-ordinated with §7 |
| 23 | `src/app/features/home/content/home.content.ts:142` | `'Open marine electronics, experiences at sea and boat delivery with Embarcarte.'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Indexed EN home description carries both company and platform naming |
| 24 | `src/app/features/about/content/about.content.ts:30` | `'En Embarcarte creemos que la tecnología náutica ...'` | es | public | KEEP | Corporate "about" copy; services/support stay under EMBARCARTE |
| 25 | `src/app/features/about/content/about.content.ts:57` | `title: 'Sobre Embarcarte'` | es | public | KEEP | Company page title; remains company-branded |
| 26 | `src/app/features/contact/content/contact.content.ts:25` | `'Habla con Embarcarte sobre electrónica náutica, ...'` | es | public | KEEP | Company contact copy |
| 27 | `src/app/features/contact/content/contact.content.ts:36` | `'Contact Embarcarte about marine electronics, ...'` | en | public | KEEP | Same, EN |
| 28 | `src/app/features/experiences/content/experiences.content.ts:58` | `'... travesías a medida con Embarcarte. Consulta disponibilidad.'` | es | public | KEEP | Company as service provider |
| 29 | `src/app/features/experiences/content/experiences.content.ts:95` | `'... tailored boat experiences with Embarcarte.'` | en | public | KEEP | Same, EN |
| 30 | `src/app/features/guides/content/guides-page.content.ts:18` | `listEyebrow: 'Aprende con Embarcarte'` | es | public | KEEP | Company education surface |
| 31 | `src/app/features/guides/content/guides-page.content.ts:33` | `listEyebrow: 'Learn with Embarcarte'` | en | public | KEEP | Same, EN |
| 32 | `src/app/features/delivery/delivery.ts:72` | `provider: { '@type': 'Organization', name: 'Embarcarte', url: 'https://embarcarte.com' }` | es/en | public | REQUIRES_SEO_MIGRATION | JSON-LD `Service.provider` embeds a second hard-coded host (diverges from `SITE.url`); structured-data change needs plan |
| 33 | `src/app/features/guides/guides.ts:141` | `publisher: { '@type': 'Organization', name: 'Embarcarte' }` | es/en | public | REQUIRES_SEO_MIGRATION | Publisher entity in 60 indexed guide pages; must stay consistent with the `Organization` node |
| 34 | `src/app/features/legal/content/legal.es.ts:108` | `'... compras realizadas en la tienda de embarcarte.com, cuyo vendedor es {owner}.'` | es | legal | REQUIRES_LEGAL_APPROVAL | Contract counterparty + domain-dependent seller statement (X-02) |
| 35 | `src/app/features/legal/content/legal.en.ts:91` | `'... purchases from embarcarte.com, whose seller is {owner}.'` | en | legal | REQUIRES_LEGAL_APPROVAL | Same, EN |
| 36 | `public/site.webmanifest:2` | `"name": "Embarcarte"` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Installed-app name on the home screen |
| 37 | `public/site.webmanifest:3` | `"short_name": "Embarcarte"` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, short form |
| 38 | `src/app/core/seo.service.ts:39` | `` `${data.title} \| ${SITE.name}` `` | es/en | public | REQUIRES_SEO_MIGRATION | Title-suffix mechanism for every non-home page; a brand switch changes all indexed titles at once |
| 39 | `src/app/core/seo.service.ts:47` | `this.tag('property', 'og:site_name', SITE.name)` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Social-card site name follows `SITE.name` |
| 40 | `src/app/features/home/home.ts:105-112` | `'@type': 'Organization', name: SITE.name, url: SITE.url` and `'@type': 'WebSite', name: SITE.name` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Organization/WebSite JSON-LD nodes; brand switch must keep one canonical entity |
| 41 | `src/app/features/shop/shop-detail.ts:162` | `seller: { '@type': 'Organization', name: SITE.name }` | es/en | public | KEEP | Seller of record is the company; must remain EMBARCARTE after migration |

### 3B. Platform and product naming — "Open Marine", module names, legacy slug

| # | File:line | Exact quoted string (short) | Locale(s) | Surface | Classification | Rationale |
| --- | --- | --- | --- | --- | --- | --- |
| 42 | `src/app/features/about/content/about.content.ts:59` | `'... traslados de embarcaciones, con la plataforma Open Marine.'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Platform named in the about meta description |
| 43 | `src/app/features/guides/content/guides-page.content.ts:25` | `asideText: 'Conoce los módulos de Open Marine ...'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Module family named in the guide aside |
| 44 | `src/app/features/guides/content/guides-page.content.ts:40` | `'Discover Open Marine modules and ask about a solution ...'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 45 | `src/app/features/technology/content/technology-page.content.ts:28` | `'Open Marine es nuestra plataforma abierta de navegación e instrumentación. ...'` | es | public | REQUIRES_COPY_CORRECTION | "nuestra plataforma" asserts ownership of an uncleared project (L-01..L-04; `BRAND-ARCHITECTURE.md` forbids presenting OPEN-MARINE as owned/cleared) and "cualquier pantalla" is absolute |
| 46 | `src/app/features/technology/content/technology-page.content.ts:32` | `'Open Marine Hub: la pasarela de sensores normaliza los datos y los publica en Signal K.'` | es | public | REQUIRES_PRODUCT_VALIDATION | HUB product behaviour claim; HUB has no physical product/hardware evidence (P-02, H-05) |
| 47 | `src/app/features/technology/content/technology-page.content.ts:53` | `title: 'Tecnología náutica abierta Open Marine'` | es | public | REQUIRES_SEO_MIGRATION | Indexed technology-page title carries the platform brand |
| 48 | `src/app/features/technology/content/technology-page.content.ts:55` | `'Open Marine integra GPS, AIS, sonda, viento y piloto automático ...'` | es | public | REQUIRES_PRODUCT_VALIDATION | Integration capability claim incl. autopilot; needs validated product scope |
| 49 | `src/app/features/technology/content/technology-page.content.ts:62` | `'Open Marine is our open navigation and instrumentation platform. ...'` | en | public | REQUIRES_COPY_CORRECTION | EN "our platform" ownership assertion; same as row 45 |
| 50 | `src/app/features/technology/content/technology-page.content.ts:66` | `'Open Marine Hub: the gateway makes sensor data available through Signal K.'` | en | public | REQUIRES_PRODUCT_VALIDATION | Same as row 46, EN |
| 51 | `src/app/features/technology/content/technology-page.content.ts:87` | `title: 'Open Marine technology'` | en | public | REQUIRES_SEO_MIGRATION | Indexed EN title |
| 52 | `src/app/features/technology/content/technology-page.content.ts:88` | `description: 'Open Marine integrates navigation instruments and local charts using Signal K.'` | en | public | REQUIRES_PRODUCT_VALIDATION | Capability claim in meta |
| 53 | `src/app/features/technology/technology.ts:40` | `{{ c().modulesHeading }}<br /><em>Open Marine.</em>` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Brand string hard-coded in the template, bypassing the content module |
| 54 | `src/app/features/technology/content/technology.es.ts:9` | `name: 'Open Marine Navigator'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Product identity shown in H1/`<title>`; maps to the MAREA NAV family in a future migration |
| 55 | `src/app/features/technology/content/technology.en.ts:10` | `name: 'Open Marine Navigator'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 56 | `src/app/features/technology/content/technology.es.ts:32` | `name: 'Open Marine Charts'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Not one of the nine mandated families; must be reconciled with the naming system (chart engine under NAV) |
| 57 | `src/app/features/technology/content/technology.en.ts:33` | `name: 'Open Marine Charts'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 58 | `src/app/features/technology/content/technology.es.ts:48` | `{ label: 'Integración', value: 'Open Marine Navigator y clientes MapLibre' }` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Platform name inside a spec row; MapLibre is a third-party nominative reference |
| 59 | `src/app/features/technology/content/technology.en.ts:49` | `{ label: 'Integration', value: 'Open Marine Navigator and MapLibre clients' }` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 60 | `src/app/features/technology/content/technology.es.ts:53` | `name: 'Open Marine Hub'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Maps to MAREA HUB |
| 61 | `src/app/features/technology/content/technology.en.ts:54` | `name: 'Open Marine Hub'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 62 | `src/app/features/technology/content/technology.es.ts:75` | `name: 'Open Marine Autopilot'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Maps to MAREA PILOT; product itself is not sellable (P-04) |
| 63 | `src/app/features/technology/content/technology.en.ts:76` | `name: 'Open Marine Autopilot'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 64 | `src/app/features/technology/content/technology.es.ts:97` | `name: 'Open Marine Simulation'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Engineering/simulation tool published as a customer module; must be re-scoped or retired from the public module list |
| 65 | `src/app/features/technology/content/technology.en.ts:98` | `name: 'Open Marine Simulation'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 66 | `src/app/features/technology/content/technology.es.ts:114` | `name: 'Pasarela de sensores Open Marine'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Maps to HUB/SENSE integration offering |
| 67 | `src/app/features/technology/content/technology.en.ts:115` | `name: 'Open Marine sensor gateway'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 68 | `src/app/features/technology/content/technology.es.ts:117` | `'... compartirlos con Open Marine.'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Platform name in description |
| 69 | `src/app/features/technology/content/technology.en.ts:118` | `'... shares it with Open Marine.'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 70 | `src/app/core/sample-products.ts:26` | `{ slug: 'hub', category: 'Open Marine', name: 'Open Marine Hub', ... }` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Platform brand used as a catalogue **category**; sample catalogue is `noindex` but rendered |
| 71 | `src/app/features/shop/shop-detail.ts:154` | `brand: { '@type': 'Brand', name: 'Open Marine' },` | es/en | public | REQUIRES_SEO_MIGRATION | Machine-readable `Product.brand` in every indexed product page; must move with the product brand |
| 72 | `src/app/features/technology/product-detail.ts:125` | `brand: { '@type': 'Brand', name: 'Open Marine' }` | es/en | public | REQUIRES_SEO_MIGRATION | Hardware module JSON-LD `Product.brand` |
| 73 | `src/server/db.ts:113` | `slug: 'open-marine-hub',` | es/en | public | REQUIRES_SEO_MIGRATION | Seeded product slug; if the product is activated the URL `/tienda/open-marine-hub` is indexed and a rename needs a 301 |
| 74 | `src/server/db.ts:114` | `name: 'Open Marine Hub',` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Seeded product name |
| 75 | `src/server/db.ts:118` | `'... Incluye Open Marine Navigator y el motor de cartas.'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Seeded product description |
| 76 | `src/server/db.ts:121` | `slug: 'open-marine-autopilot',` | es/en | public | REQUIRES_SEO_MIGRATION | Same URL risk as row 73; PILOT must not be sold (P-04) |
| 77 | `src/server/db.ts:122` | `name: 'Controlador Open Marine Autopilot',` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Seeded product name |
| 78 | `src/server/db.ts:131` | `summary: 'Receptor AIS por SDR listo para conectar al Open Marine Hub.'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Seeded product copy |
| 79 | `src/server/db.ts:132` | `'... configuración para Open Marine. Solo recepción.'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Seeded product copy; "Solo recepción" is an honest limitation to preserve |
| 80 | `src/app/app.routes.ts:120` | `{ path: 'open-marine', redirectTo: '/tecnologia', pathMatch: 'full' }` | es/en | public | REQUIRES_SEO_MIGRATION | Legacy one-hop redirect named after the platform; must keep working after migration (target may be renamed) |
| 81 | `src/app/app.routes.server.ts:57` | `{ path: 'open-marine', renderMode: RenderMode.Server, status: 301 }` | es/en | public | REQUIRES_SEO_MIGRATION | Server-side 301 status declaration paired with row 80 |
| 82 | `src/app/features/home/content/home.content.ts:141` | `title: 'Open marine technology and boat services'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | EN home `<title>` uses the generic platform phrase |
| 83 | `src/app/i18n/es.ts:35` | `'footer.technology': 'Tecnología Open Marine'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Footer link label |
| 84 | `src/app/i18n/en.ts:31` | `'footer.technology': 'Open Marine technology'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 85 | `src/app/i18n/es.ts:72` | `'Hardware y accesorios del ecosistema Open Marine. Compra online ...'` | es | public | EVENTUALLY_MIGRATE_TO_MAREA | Shop lead: platform as "ecosystem" plus immediate purchase CTA |
| 86 | `src/app/i18n/en.ts:68` | `'Hardware and accessories from the Open Marine ecosystem. Buy online ...'` | en | public | EVENTUALLY_MIGRATE_TO_MAREA | Same, EN |
| 87 | `src/app/i18n/es.ts:87` | `'shop.seoTitle': 'Tienda de electrónica náutica Open Marine'` | es | public | REQUIRES_SEO_MIGRATION | Indexed shop `<title>` |
| 88 | `src/app/i18n/en.ts:85` | `'Buy the Open Marine Hub navigation computer, the autopilot controller ...'` | en | public | REQUIRES_COPY_CORRECTION | Indexed shop description names specific products as purchasable ("Buy ... autopilot controller") while nothing is OPERATIONS READY (claims policy §5) |
| 89 | `src/app/i18n/es.ts:89` | `'Compra el ordenador de navegación Open Marine Hub, el controlador de piloto automático ...'` | es | public | REQUIRES_COPY_CORRECTION | Same, ES |
| 90 | `src/app/features/guides/content/guide-extras.ts:20` | `'Open Marine admite MBTiles y determinadas importaciones locales; no descifra S-63.'` | es | public | REQUIRES_PRODUCT_VALIDATION | Chart-engine capability claim inside an indexed guide; needs validation against the reuse map (P-01) |
| 91 | `src/app/features/guides/content/guide-extras.ts:24` | `'Open Marine supports MBTiles and certain local imports; it does not decrypt S-63.'` | en | public | REQUIRES_PRODUCT_VALIDATION | Same, EN |
| 92 | `src/app/features/guides/content/guide-extras.ts:156` | `'Qué puedes esperar de Open Marine' ... 'El proyecto documenta la importación de S-57 sin cifrar ...'` | es | public | REQUIRES_COPY_CORRECTION | Refers to "el proyecto" (the engineering repository) in customer-facing copy; architecture forbids presenting OPEN-MARINE as the product |
| 93 | `src/app/features/guides/content/guide-extras.ts:159` | `'What to expect from Open Marine' ... 'The project documents import of unencrypted S-57 ...'` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |

### 3C. Protocol, certification, safety, legal and commercial claims

| # | File:line | Exact quoted string (short) | Locale(s) | Surface | Classification | Rationale |
| --- | --- | --- | --- | --- | --- | --- |
| 94 | `src/app/features/technology/content/technology-page.content.ts:31` | `'Sensores: GPS, sonda, anemómetro, AIS, IMU y el resto de instrumentos NMEA 0183 o NMEA 2000.'` | es | public | REQUIRES_COPY_CORRECTION | Asserts NMEA 2000 instrument support; MC-02 H-04: NMEA 2000 is **not implemented** (type stubs only), and NMEA licensing/certification is not held |
| 95 | `src/app/features/technology/content/technology-page.content.ts:65` | `'Sensors: GPS, depth, wind, AIS, IMU and compatible NMEA instruments.'` | en | public | REQUIRES_COPY_CORRECTION | Vaguer, but still a compatibility claim needing tested evidence (claims policy Class C) |
| 96 | `src/app/features/technology/content/technology-page.content.ts:46` | `'Software auditable, probado con un banco de simulación antes de cada versión.'` | es | public | REQUIRES_COPY_CORRECTION | MC-02 H-09: the "isolated" bench is not isolated by default and simulation assertions are stored but never evaluated |
| 97 | `src/app/features/technology/content/technology-page.content.ts:80` | `'Auditable software tested using a simulation bench.'` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |
| 98 | `src/app/features/technology/content/technology-page.content.ts:47` | `'Cartografía exclusivamente legal: respetamos las licencias de las cartas comerciales.'` | es | public | REQUIRES_COPY_CORRECTION | Data-rights claim contradicted by open D-01..D-03 (no ENC distributor/OEM status; OSM offline policy; mislabelled MBAR source) |
| 99 | `src/app/features/technology/content/technology-page.content.ts:81` | `'Use authorised chart data and respect commercial licences.'` | en | public | KEEP | Directive, not a claim; safe form |
| 100 | `src/app/features/technology/content/technology.es.ts:17` | `'Blancos AIS con cálculo de CPA/TCPA y alarmas de colisión'` | es | public | REQUIRES_COPY_CORRECTION | Implies collision avoidance; MC-02 D-09 forbids presenting receive-only AIS as collision avoidance; C-06 is implemented-not-fully-tested |
| 101 | `src/app/features/technology/content/technology.en.ts:18` | `'AIS targets with CPA/TCPA calculation and collision alarms'` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |
| 102 | `src/app/features/technology/content/technology.es.ts:27` | `{ label: 'Licencia base', value: 'Código abierto, con soporte y personalización comercial' }` | es | public | REQUIRES_LEGAL_APPROVAL | Claims an open-source base licence; OPEN-MARINE has no LICENSE and no outbound licence decision (L-01, DEC-01) |
| 103 | `src/app/features/technology/content/technology.en.ts:28` | `{ label: 'Base licence', value: 'Open source, with commercial support and customisation' }` | en | public | REQUIRES_LEGAL_APPROVAL | Same, EN |
| 104 | `src/app/features/technology/content/technology.es.ts:43` | `'Solo flujos legales: no descifra cartas comerciales protegidas'` | es | public | KEEP | Accurate limitation statement; keep the wording in migration |
| 105 | `src/app/features/technology/content/technology.en.ts:44` | `'Legal workflows only: protected commercial charts are never decrypted'` | en | public | KEEP | Accurate limitation; keep |
| 106 | `src/app/features/technology/content/technology.es.ts:59` | `'Entradas NMEA 0183 y NMEA 2000 (mediante adaptador)'` | es | public | REQUIRES_COPY_CORRECTION | NMEA 2000 input claim; H-04 not implemented; NMEA 2000 trademark/licence/certification rules R-02 |
| 107 | `src/app/features/technology/content/technology.en.ts:60` | `'NMEA 0183 and NMEA 2000 inputs (via adapter)'` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |
| 108 | `src/app/features/technology/content/technology.es.ts:69` | `{ label: 'Protocolos', value: 'NMEA 0183, NMEA 2000, Signal K, AIS' }` | es | public | REQUIRES_PRODUCT_VALIDATION | Machine-readable spec matrix must be a tested compatibility matrix, not a list |
| 109 | `src/app/features/technology/content/technology.en.ts:70` | `{ label: 'Protocols', value: 'NMEA 0183, NMEA 2000, Signal K, AIS' }` | en | public | REQUIRES_PRODUCT_VALIDATION | Same, EN |
| 110 | `src/app/features/technology/content/technology.es.ts:76` | `tagline: 'Controlador de piloto automático abierto, con seguridad por diseño.'` | es | public | REQUIRES_COPY_CORRECTION | Safety-by-design claim; PILOT safety gate is BLOCKED (H-01, P-04) |
| 111 | `src/app/features/technology/content/technology.en.ts:77` | `'An open autopilot controller, safe by design.'` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |
| 112 | `src/app/features/technology/content/technology.es.ts:79` | `'... parada de emergencia física.'` | es | public | REQUIRES_PRODUCT_VALIDATION | E-stop is a design concept; no physical evidence (H-10) |
| 113 | `src/app/features/technology/content/technology.en.ts:80` | `'... a physical emergency stop.'` | en | public | REQUIRES_PRODUCT_VALIDATION | Same, EN |
| 114 | `src/app/features/technology/content/technology.es.ts:84` | `'Corte automático si se pierde la comunicación (heartbeat de 500 ms)'` | es | public | REQUIRES_PRODUCT_VALIDATION | Safety behaviour must be physically verified (H-01, H-10) |
| 115 | `src/app/features/technology/content/technology.en.ts:85` | `'Automatic cut-off if communication is lost (500 ms heartbeat)'` | en | public | REQUIRES_PRODUCT_VALIDATION | Same, EN |
| 116 | `src/app/features/technology/content/technology.es.ts:92` | `{ label: 'Seguridad', value: 'E-stop físico, watchdog y límite de corriente' }` | es | public | REQUIRES_PRODUCT_VALIDATION | Safety claims with no bench/sea evidence (H-10) |
| 117 | `src/app/features/technology/content/technology.en.ts:93` | `{ label: 'Safety', value: 'Physical e-stop, watchdog and current limit' }` | en | public | REQUIRES_PRODUCT_VALIDATION | Same, EN |
| 118 | `src/app/features/technology/content/technology.es.ts:33` | `tagline: 'Tu cartografía legal, en local y siempre disponible a bordo.'` | es | public | REQUIRES_COPY_CORRECTION | "siempre disponible" absolute + "legal" chart claim; D-01..D-03 open |
| 119 | `src/app/features/technology/content/technology.en.ts:34` | `'Your lawfully obtained charts, stored locally and always available on board.'` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |
| 120 | `src/app/features/technology/content/technology.es.ts:86` | `'Compatible con actuadores DC de dos hilos, como los de tipo ST3000'` | es | public | REQUIRES_PRODUCT_VALIDATION | Named third-party compatibility (Autohelm/Raymarine family); nominative use OK but compatibility untested (R-08) |
| 121 | `src/app/features/technology/content/technology.en.ts:87` | `'Compatible with two-wire DC actuators, such as the ST3000 type'` | en | public | REQUIRES_PRODUCT_VALIDATION | Same, EN |
| 122 | `src/app/features/technology/content/technology.es.ts:63` | `'Instalación, configuración y puesta en marcha incluidas'` | es | public | REQUIRES_PRODUCT_VALIDATION | Commercial inclusion claim; needs a real approved offer (X-05) |
| 123 | `src/app/features/technology/content/technology.en.ts:64` | `'Installation, configuration and commissioning included'` | en | public | REQUIRES_PRODUCT_VALIDATION | Same, EN |
| 124 | `src/app/features/about/content/about.content.ts:36` | `'Cada sistema se prueba primero en un banco de simulación que reproduce viento, corriente, AIS y fallos de sensores. ...'` | es | public | REQUIRES_COPY_CORRECTION | Bench-testing claim contradicted by H-09 (not isolated, assertions never evaluated) and H-05 (no physical evidence) |
| 125 | `src/app/features/about/content/about.content.ts:41` | `'Apostamos por estándares abiertos como Signal K y NMEA ...'` | es | public | KEEP | Generic standards mention, factual nominative use; keep NMEA 2000 claims constrained elsewhere |
| 126 | `src/app/features/about/content/about.content.ts:42` | `'... seguridad por diseño: el piloto automático incluye parada de emergencia física y vigilancia permanente ...'` | es | public | REQUIRES_COPY_CORRECTION | PILOT safety claim; H-01/H-10 blocked, no physical evidence |
| 127 | `src/app/features/about/content/about.content.ts:72` | `'We use open standards such as Signal K and NMEA ...'` | en | public | KEEP | Same as row 125, EN |
| 128 | `src/app/features/home/content/home.content.ts:55` | `'Sensores, instrumentación y pilotos automáticos con sistemas abiertos y protocolos estándar.'` | es | public | REQUIRES_COPY_CORRECTION | "protocolos estándar" implies standards compliance the programme does not hold |
| 129 | `src/app/features/home/content/home.content.ts:105` | `'Sensors, instruments and autopilots using open systems and standard protocols.'` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |
| 130 | `src/app/features/home/content/home.content.ts:83` | `{ title: 'Instrumentación', description: 'Datos · Precisión · Protocolo abierto' }` | es | public | REQUIRES_COPY_CORRECTION | "Precisión" is an unmeasured performance claim; "protocolo abierto" ambiguous |
| 131 | `src/app/features/home/content/home.content.ts:133` | `{ title: 'Instruments', description: 'Data · Precision · Open protocol' }` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |
| 132 | `src/app/features/home/content/home.content.ts:85` | `{ title: 'Piloto automático', description: 'Control inteligente · Abierto' }` | es | public | REQUIRES_PRODUCT_VALIDATION | PILOT product card links to a non-sellable, safety-gated product (P-04) |
| 133 | `src/app/features/home/content/home.content.ts:135` | `{ title: 'Autopilot', description: 'Intelligent control · Open' }` | en | public | REQUIRES_PRODUCT_VALIDATION | Same, EN |
| 134 | `src/app/features/services/content/services.content.ts:17` | `'Unificamos instrumentos, GPS, AIS y sensores de distintas marcas en un único sistema abierto.'` | es | public | KEEP | Service capability description; no certification or performance claim |
| 135 | `src/app/features/services/content/services.content.ts:35` | `'We unify instruments, GPS, AIS and sensors from different brands into a single open system.'` | en | public | KEEP | Same, EN |
| 136 | `src/app/features/services/content/services.content.ts:80` | `'Integración de instrumentos NMEA, instalación de ordenadores ...'` | es | public | KEEP | Service offering; NMEA is a nominative factual reference, not a product certification |
| 137 | `src/app/features/contact/content/contact.content.ts:22` | `note: 'Respondemos en 48 horas laborables.'` | es | public | REQUIRES_COPY_CORRECTION | Operational response commitment without a documented service contract (claims policy Class C) |
| 138 | `src/app/features/contact/content/contact.content.ts:33` | `note: 'We reply within 48 working hours.'` | en | public | REQUIRES_COPY_CORRECTION | Same, EN |
| 139 | `src/app/features/legal/content/legal.es.ts:29` | `'Los textos, diseños y marcas de este sitio pertenecen a {owner} o a sus licenciantes.'` | es | legal | REQUIRES_LEGAL_APPROVAL | Asserts ownership of "marcas" (trademarks) while no registration/clearance exists; claims policy Class X |
| 140 | `src/app/features/legal/content/legal.es.ts:30` | `'El software Open Marine distribuido como código abierto se rige por su propia licencia.'` | es | legal | REQUIRES_LEGAL_APPROVAL | Asserts open-source distribution; L-01 shows no licence exists |
| 141 | `src/app/features/legal/content/legal.en.ts:23` | `'... Open Marine software distributed as open source is governed by its own licence.'` | en | legal | REQUIRES_LEGAL_APPROVAL | Same as rows 139–140 in one EN line |
| 142 | `src/app/features/legal/content/legal.es.ts:137` | `'Los productos tienen la garantía legal de conformidad de tres años ...'` | es | legal | REQUIRES_LEGAL_APPROVAL | Statutory warranty statement must be confirmed by counsel against the actual seller/territory |
| 143 | `src/app/features/legal/content/legal.en.ts:114` | `'Products have the three-year legal conformity warranty provided by consumer law.'` | en | legal | REQUIRES_LEGAL_APPROVAL | Same, EN |
| 144 | `src/app/features/legal/content/legal.es.ts:81` | `'Este sitio web no utiliza cookies de analítica, publicidad ni seguimiento. ...'` | es | legal | KEEP | Accurate today: no analytics/advertising code in the audited source |
| 145 | `src/app/features/legal/content/legal.en.ts:70` | `'This website does not use analytics, advertising or tracking cookies. ...'` | en | legal | KEEP | Same, EN; must be re-verified before adding any new third-party script |
| 146 | `src/app/i18n/es.ts:96` | `'shopDetail.inStock': 'En stock'` | es | public | KEEP | Label bound to a server-authoritative `stock` value (`shop-detail.ts:48,60`); no invented stock |
| 147 | `src/app/i18n/en.ts:92` | `'shopDetail.inStock': 'In stock'` | en | public | KEEP | Same, EN |
| 148 | `src/app/i18n/es.ts:86` | `'shop.soldOut': 'Agotado'` | es | public | KEEP | Server-driven state label |
| 149 | `src/app/i18n/en.ts:82` | `'shop.soldOut': 'Out of stock'` | en | public | KEEP | Same, EN |
| 150 | `src/app/i18n/es.ts:106` | `'Producto de muestra: las características, el precio y el stock aún no están confirmados. Este artículo no se puede comprar.'` | es | public | KEEP | Strong honest disclaimer; keep in migration |
| 151 | `src/app/i18n/en.ts:102` | `'Example product: specifications, price and stock have not yet been confirmed. This item cannot be purchased.'` | en | public | KEEP | Same, EN |
| 152 | `src/app/i18n/es.ts:76` | `'Estos ejemplos no están a la venta. Consulta disponibilidad y compatibilidad antes de comprar.'` | es | public | KEEP | Honest sample-catalogue note |
| 153 | `src/app/i18n/en.ts:72` | `'These examples are not for sale. Ask us about availability and compatibility before buying.'` | en | public | KEEP | Same, EN |
| 154 | `src/app/i18n/es.ts:97` | `'shopDetail.notify': 'Avísame cuando esté disponible'` | es | public | KEEP | Honest unavailable-state CTA; replaces purchase action when stock is 0 |
| 155 | `src/app/features/shop/shop-detail.ts:47` | `{{ price(p.price_cents) }} ... {{ i18n.t('shopDetail.vat') }}` | es/en | public (commerce) | KEEP | Price comes from the server product record (`api.ts:313,358-365`), not from copy; server-authoritative |
| 156 | `src/app/features/shop/shop-detail.ts:60` | `p.stock < 5 ? i18n.t('shopDetail.lastUnits', { count: p.stock }) : i18n.t('shopDetail.inStock')` | es/en | public (commerce) | KEEP | Stock wording is derived from server data; cannot fabricate availability |
| 157 | `src/app/features/shop/shop-detail.ts:161` | `availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'` | es/en | public (commerce) | REQUIRES_PRODUCT_VALIDATION | Machine-readable price/availability published to search requires OPERATIONS READY + approved price list; currently no product is ready (claims policy §5, X-05) |
| 158 | `src/app/features/shop/shop-list.ts:61` | `@if (p.stock > 0) { ... } @else { ... 'shop.soldOut' }` | es/en | public (commerce) | KEEP | UI honours server stock; no hard-coded availability |
| 159 | `src/server/db.ts:137` | `VALUES (?, ?, ?, ?, 0, 0, 0)` (seed: price 0, stock 0, active 0) | es/en | technical/commerce | KEEP | Seed products are inactive drafts; this is the control that prevents an empty instance from advertising products |
| 160 | `src/app/features/legal/content/legal.es.ts:14` | `'(LSSI-CE), se informa de los datos del titular de este sitio web:'` | es | legal | KEEP | Correct legal basis citation; the gap is the missing data (rows 6–9), not the citation |
| 161 | `src/app/features/legal/content/legal.es.ts:21-23` | `'Los contenidos tienen carácter informativo y no constituyen una oferta vinculante. Los precios y especificaciones se confirman en cada presupuesto.'` | es | legal | KEEP | Honest control that prevents shop content from being read as a binding offer |
| 162 | `src/app/features/legal/content/legal.es.ts:114-116` | `'Los precios se muestran en euros e incluyen el IVA aplicable. ... Si un producto no estuviera disponible, te avisaremos y te devolveremos el importe pagado.'` | es | legal | KEEP | Statutory consumer information; keep, subject to counsel review with the verified seller identity |

### 3D. Indexed guide corpus (30 articles × ES/EN) — brand and claim posture

Reference line is the ES title line; the EN title line of the same article is given in the same cell.

| # | File:line | Exact quoted string (short) | Locale(s) | Surface | Classification | Rationale |
| --- | --- | --- | --- | --- | --- | --- |
| 163 | `guides.es.ts:4` · `guides.en.ts:5` | `'Qué es Signal K y cómo conecta los datos de tu barco'` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | Platform statement at `guides.es.ts:7` / `guides.en.ts:8` ("Open Marine utiliza Signal K..."); article itself honest |
| 164 | `guides.es.ts:9` · `guides.en.ts:10` | `'Cartas náuticas sin Internet: cómo preparar la navegación'` | es/en | public | REQUIRES_PRODUCT_VALIDATION | `guides.es.ts:11` / `guides.en.ts:12`: "Open Marine Charts admite MBTiles..." — chart-engine capability claim |
| 165 | `guides.es.ts:14` · `guides.en.ts:15` | `'AIS para barcos: qué muestra un receptor y cuáles son sus límites'` | es/en | public | KEEP | States receive-only and "not every boat appears"; strongest AIS honesty in the corpus |
| 166 | `guides.es.ts:19` · `guides.en.ts:20` | `'NMEA 0183 y NMEA 2000: diferencias al conectar instrumentos'` | es/en | public | KEEP | Third-party standards explained educationally; no EMBARCARTE compatibility claim |
| 167 | `guides.es.ts:24` · `guides.en.ts:25` | `'Anemómetro y veleta para barco: qué mide cada sensor'` | es/en | public | KEEP | Educational; no product claim |
| 168 | `guides.es.ts:29` · `guides.en.ts:30` | `'Piloto automático para velero: componentes y comprobaciones'` | es/en | public | KEEP | Educational; insists on manual recovery and supervision |
| 169 | `guides.es.ts:34` · `guides.en.ts:35` | `'Raspberry Pi a bordo: un ordenador para datos de navegación'` | es/en | public | REQUIRES_PRODUCT_VALIDATION | `guides.es.ts:35`: "Open Marine está diseñado para funcionar en una Raspberry Pi..." — product platform claim |
| 170 | `guides.es.ts:39` · `guides.en.ts:40` | `'Cómo compartir los datos del barco por una red Wi-Fi local'` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | `guides.es.ts:42`: "Con Open Marine, la interfaz se consulta..." — platform naming in body |
| 171 | `guides.es.ts:44` · `guides.en.ts:45` | `'Integrar GPS, AIS y sensores en una sola pantalla'` | es/en | public | EVENTUALLY_MIGRATE_TO_MAREA | `guides.es.ts:46`: "En Open Marine, Signal K actúa como bus de datos..." |
| 172 | `guides.es.ts:49` · `guides.en.ts:50` | `'Electrónica náutica abierta: ventajas y decisiones antes de empezar'` | es/en | public | KEEP | Defines "open" honestly and notes third-party licences survive; EN title uses the generic phrase "Open marine electronics" |
| 173 | `guides.es.ts:54` · `guides.en.ts:55` | `'Plotter náutico o tablet a bordo: cómo elegir la pantalla de navegación'` | es/en | public | KEEP | Educational |
| 174 | `guides.es.ts:59` · `guides.en.ts:60` | `'Cómo conectar un GPS a Signal K y comprobar su posición'` | es/en | public | KEEP | Educational; third-party protocol guidance |
| 175 | `guides.es.ts:64` · `guides.en.ts:65` | `'Alimentación de una Raspberry Pi en un barco de 12 V'` | es/en | public | KEEP | Educational electrical guidance |
| 176 | `guides.es.ts:69` · `guides.en.ts:70` | `'Dónde instalar una antena AIS en un velero'` | es/en | public | KEEP | Educational; states receiver does not transmit |
| 177 | `guides.es.ts:74` · `guides.en.ts:75` | `'Sensor de viento NMEA 2000: qué revisar antes de comprar'` | es/en | public | KEEP | Buying guidance for **third-party** sensors; does not claim MAREA NMEA 2000 capability |
| 178 | `guides.es.ts:79` · `guides.en.ts:80` | `'El sensor de viento del barco marca mal: guía de diagnóstico'` | es/en | public | KEEP | Educational |
| 179 | `guides.es.ts:84` · `guides.en.ts:85` | `'Cómo plantear la calibración de una veleta de velero'` | es/en | public | KEEP | Educational |
| 180 | `guides.es.ts:89` · `guides.en.ts:90` | `'Qué es MBTiles y cómo usarlo en un sistema de cartas náuticas'` | es/en | public | REQUIRES_PRODUCT_VALIDATION | `guides.es.ts:91`: "Open Marine Charts puede importar MBTiles..." |
| 181 | `guides.es.ts:94` · `guides.en.ts:95` | `'Cartas S-57 y S-63: diferencias y compatibilidad con Open Marine'` | es/en | public | REQUIRES_PRODUCT_VALIDATION | Indexed title contains platform brand **and** a compatibility claim; also a SEO-migration item for the title |
| 182 | `guides.es.ts:99` · `guides.en.ts:100` | `'Cómo organizar actualizaciones de cartas náuticas sin conexión'` | es/en | public | KEEP | Educational |
| 183 | `guides.es.ts:104` · `guides.en.ts:105` | `'CPA y TCPA en AIS: cómo interpretar una alarma de proximidad'` | es/en | public | KEEP | Explicitly says an alarm is "no una garantía de detección" — model honest limitation |
| 184 | `guides.es.ts:109` · `guides.en.ts:110` | `'Receptor AIS con SDR: qué necesitas para ver barcos cercanos'` | es/en | public | KEEP | Receive-only limitation stated |
| 185 | `guides.es.ts:114` · `guides.en.ts:115` | `'Cómo integrar una sonda de profundidad con Signal K'` | es/en | public | KEEP | Educational |
| 186 | `guides.es.ts:119` · `guides.en.ts:120` | `'Velocidad sobre el agua y sobre el fondo: diferencias en un barco'` | es/en | public | KEEP | Educational |
| 187 | `guides.es.ts:124` · `guides.en.ts:125` | `'Componentes de una red NMEA 2000 para barco'` | es/en | public | KEEP | Third-party standards explained; no product certification claim |
| 188 | `guides.es.ts:129` · `guides.en.ts:130` | `'Cómo llevar datos NMEA 0183 a Signal K'` | es/en | public | KEEP | Educational integration guidance |
| 189 | `guides.es.ts:134` · `guides.en.ts:135` | `'Qué considerar si un piloto automático pierde la señal'` | es/en | public | KEEP | Safety-conscious education; manual recovery |
| 190 | `guides.es.ts:139` · `guides.en.ts:140` | `'Cómo planificar el traslado de un velero por mar'` | es/en | public | KEEP | Service-adjacent education |
| 191 | `guides.es.ts:144` · `guides.en.ts:145` | `'Qué revisar antes de un traslado marítimo de embarcación'` | es/en | public | KEEP | Service-adjacent education |
| 192 | `guides.es.ts:149` · `guides.en.ts:150` | `'Mantenimiento de electrónica náutica: revisión antes de temporada'` | es/en | public | KEEP | Educational |
| 193 | `src/app/features/guides/content/guide-extras.ts:27` · `:31` | `'Receptor y transpondedor: una diferencia importante'` | es/en | public | KEEP | Explicitly says an SDR reception kit does not transmit; protects against AIS over-claim |
| 194 | `src/app/features/guides/content/guide-extras.ts:169` · `:172` | `'Un CPA pequeño ... es una estimación ... Un CPA favorable no demuestra que no haya otros barcos sin AIS'` | es/en | public | KEEP | Model honest LIMITATION statement for collision-risk features |

### 3E. Technical, build, test and internal identifiers

| # | File:line | Exact quoted string (short) | Locale(s) | Surface | Classification | Rationale |
| --- | --- | --- | --- | --- | --- | --- |
| 195 | `scripts/backup.mjs:48,50,78`; `scripts/check-backup.mjs:17,36,183,191`; `scripts/check-commerce.mjs:12,13,21,246,279`; `scripts/check-i18n.mjs:17,395,400`; `scripts/restore.mjs:41,49`; `src/server/db.ts:13` | `'embarcarte.sqlite'` / `'dist/embarcarte'` | n/a | technical | TECHNICAL_INTERNAL_ONLY | Build output directory and database filename; renaming breaks every check script; no public exposure |
| 196 | `scripts/check-commerce.mjs:86,87,117,118,145,172,173,177`; `scripts/check-i18n.mjs:106,425,491,530`; `scripts/check-seo.mjs:14,120` | `'https://embarcarte.com'` assertions | n/a | technical | REQUIRES_SEO_MIGRATION | Tests hard-code the production origin and exact canonical/sitemap URLs; any host migration must update them and the tests are the acceptance gate |
| 197 | `angular.json:61-66` | `"allowedHosts": ["embarcarte.com", "www.embarcarte.com", "localhost", "127.0.0.1"]` | n/a | technical | REQUIRES_SEO_MIGRATION | SSR host allow-list; a new brand domain must be added here first or requests are rejected |
| 198 | `package.json:2,17-18`; `angular.json:10,62-63,100,103` | `"name": "embarcarte"` / `dist/embarcarte/server/server.mjs` / project key `"embarcarte"` | n/a | technical | TECHNICAL_INTERNAL_ONLY | Project identity and artifact paths; not customer-visible |
| 199 | `src/app/core/site.config.ts:19` | `googleClientId: '533857766582-...apps.googleusercontent.com'` | n/a | technical | TECHNICAL_INTERNAL_ONLY | Public OAuth client ID bound to allowed origins; must be re-provisioned only if the domain changes |
| 200 | `src/app/core/auth.service.ts:41` | `/** Intercambia el ID token de Google por la sesión de Embarcarte. */` | n/a | technical | TECHNICAL_INTERNAL_ONLY | Code comment; never public |
| 201 | `src/styles.scss:4` | `/* Embarcarte — dirección visual clara, azul translúcido ... */` | n/a | technical | TECHNICAL_INTERNAL_ONLY | Stylesheet comment; never public |
| 202 | `src/app/features/admin/admin-messages.ts:26` | `'...&subject=Re: tu consulta en Embarcarte'` | es | technical (admin) | TECHNICAL_INTERNAL_ONLY | Staff reply template subject; internal |
| 203 | `src/server/api.ts:399` | `` `[embarcarte.com] Nuevo pedido #${orderId}` `` | es | technical (email) | TECHNICAL_INTERNAL_ONLY | Internal notification subject; not a website surface |
| 204 | `src/server/api.ts:406-407` | `'Thank you for your order with Embarcarte.'` / `'Gracias por tu pedido en Embarcarte.'` | es/en | technical (email) | KEEP | Transactional email identifies the seller; under the architecture the seller remains EMBARCARTE |
| 205 | `src/server/mail.ts:14` | `'info@embarcarte.com'` | n/a | technical | KEEP | Company inbox fallback |
| 206 | `public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/og-image.png` | raster brand marks / social card (no text in source) | n/a | public | EVENTUALLY_MIGRATE_TO_MAREA | Public brand assets require MC-04 replacement; PNG generation is externally BLOCKED (MC-01 X-03), so a brand switch cannot ship on generated imagery |
| 207 | `public/favicon.svg:1` | inline SVG mark: `<path d="M16 6v14M10 12h12" .../>` | n/a | public | EVENTUALLY_MIGRATE_TO_MAREA | Vector mark (mast/cross + hull curve), no text; the only brand asset trivially editable without image generation |
| 208 | `scripts/og.html:3` | `<svg ...>...</svg>Embarcarte</div>` | n/a | technical (asset source) | TECHNICAL_INTERNAL_ONLY | Source template used to render `public/og-image.png`; contains the wordmark |
| 209 | `public/robots.txt:5` | `Sitemap: https://embarcarte.com/sitemap.xml` | es/en | public | REQUIRES_SEO_MIGRATION | Absolute origin in robots; must change atomically with any host/brand migration |

### 3F. Surfaces verified with no brand or claim reference (negative evidence)

The following audited surfaces were read and contain **no** brand string or mandated claim term, so
they produce no inventory row: `src/app/layout/header/header.ts` (renders `<app-brand>`; navigation
labels come from the dictionary), `src/app/layout/language-switcher/language-switcher.ts` (labels from
`LOCALE_INFO.switchLabel` in `locale.config.ts:15-16`), `src/app/app.ts` (shell only), `src/app/core/images.ts`
(Unsplash photo URLs), `src/app/features/not-found/not-found.ts`, `src/app/core/images.ts` consumers in
`home`/`technology`/`experiences`/`delivery` (image paths only), and the cart/account/admin templates
(business strings, no product-brand or certification claim). This negative evidence is part of the
audit: it shows the brand surface is smaller and more centralised than the 209-row count might suggest.

## 4. Classification summary and reconciliation

| Classification | Rows |
| --- | --- |
| `KEEP` | 68 |
| `EVENTUALLY_MIGRATE_TO_MAREA` | 50 |
| `TECHNICAL_INTERNAL_ONLY` | 8 |
| `REQUIRES_LEGAL_APPROVAL` | 13 |
| `REQUIRES_PRODUCT_VALIDATION` | 25 |
| `REQUIRES_COPY_CORRECTION` | 28 |
| `REQUIRES_SEO_MIGRATION` | 17 |
| **Total references audited** | **209** |

Reconciliation rule: the table above lists **only** rows 1–209 of §3; each row carries exactly one
classification, so the seven class counts must sum to the total. Rows 1–41 (corporate identity),
42–93 (platform/product naming), 94–162 (claims), 163–194 (guide corpus) and 195–209 (technical) are
disjoint. Raw grep counts in §2.1 are higher because one line can contain several terms, because the
guide corpus is adjudicated per article (not per line) and because lines matching a term may be
irrelevant to the brand surface (e.g. Spanish words containing the substring "ce").

Interpretation of the totals:

- The `KEEP` majority is the company identity, the honest availability/limitation controls and the
  educational guide corpus — the parts that must **survive** migration unchanged.
- `EVENTUALLY_MIGRATE_TO_MAREA` is the future product-brand switch; it is the largest migration group
  because the platform/module naming is pervasive in customer-facing copy and titles.
- The `REQUIRES_*` classes are the work that **blocks** migration: legal (seller/ownership/licence),
  product validation (NMEA 2000, PILOT safety, chart rights, availability readiness), copy correction
  (false/absolute claims) and SEO migration (titles, JSON-LD identity, hosts, redirects).

## 5. Current brand truth statement

### 5.1 What the site says the brand is today

- `SITE.name = 'Embarcarte'` — `src/app/core/site.config.ts:7`. It is the **company and seller** name,
  used as the title suffix for every non-home page (`seo.service.ts:39`), as `og:site_name`
  (`seo.service.ts:47`), as the JSON-LD `Organization`/`WebSite` name (`home.ts:106,112`), as the
  JSON-LD product `seller` (`shop-detail.ts:162`) and in the legal description (`legal.ts:79`).
- `SITE.defaultDescription` — `site.config.ts:10-12`: *"Embarcarte diseña y comercializa tecnología
  náutica abierta: electrónica de navegación, cartografía, instrumentación y piloto automático para tu
  embarcación con Open Marine."* This is the description the site presents as its default, and it
  mixes **three** different truths: the company (EMBARCARTE), an "open" technology and the uncleared
  platform brand (Open Marine).
- The public identity is therefore **one company brand (EMBARCARTE) reselling/engineering a platform
  brand (Open Marine)**. There is **no** public MAREA identity anywhere in the source: `git grep -i
  "MAREA"` over `src/ public/ scripts/` returns **0 lines**.

### 5.2 `SITE.legal` is incomplete — hard finding, must not be invented

`src/app/core/site.config.ts`:

```text
20   // Pendiente: completar con los datos fiscales reales del titular.
21   legal: {
22     owner: 'Embarcarte',
23     taxId: '',
24     address: '',
25     registry: '',
26   },
```

- The configuration itself records the gap: line 20 says the real tax data of the holder is pending.
- `src/app/features/legal/legal.ts:32-37` renders `owner` always, `taxId`, `address` and `registry`
  only when non-empty, and **line 36** prints `legal.pending` when `taxId` or `address` is missing.
- `src/app/i18n/es.ts:263` / `src/app/i18n/en.ts:256` render the public admission:
  *"Datos fiscales y domicilio: pendientes de confirmación."* / *"Tax details and address: awaiting
  confirmation."*
- The legal notice explicitly invokes LSSI-CE (`legal.es.ts:13-14`) and then cannot identify the
  holder (tax ID, address, registry); the terms of sale identify only `{owner}` = `Embarcarte`
  (`legal.es.ts:108`, `legal.en.ts:91`), with no tax ID or address.
- **Required treatment:** this is **MC-02 blocker X-02** (`MC-02-BLOCKERS-AND-DECISIONS.md:114`,
  severity HIGH, status `BLOCKED`, responsible role "Company owner", milestone `03 + 26`). The only
  valid remediation is the company supplying **verified** registration data. No agent, and no brand
  migration, may fill these fields with plausible-looking values; inventing a NIF, address or registry
  entry would be a false legal statement and is prohibited by AGENTS.md.
- Consequence for brand migration: the legal notice/terms cannot be rewritten for MAREA attribution
  until X-02 closes. A brand switch layered on an incomplete seller identity increases, not reduces,
  legal exposure.

### 5.3 Other brand-truth observations

- The description exists **three times** (`site.config.ts:10-12`, `index.html:8`, `server.ts:51`) and
  `defaultDescription` has **no consumer** in `src/` — a migration edit could easily update one copy
  and leave two stale. This must be consolidated in Phase 2/3.
- The wordmark `embarcarte` is hard-coded in `brand.ts:11`; the technology heading `Open Marine.` is
  hard-coded in `technology.ts:40`. Brand strings are not consistently in the i18n dictionary.
- `Open Marine` functions in practice as a **product/brand name** in titles, product names, JSON-LD
  `Brand`, product slugs and the shop copy, although `BRAND-ARCHITECTURE.md` defines it as an internal
  engineering identifier. This is the core inconsistency a MAREA migration resolves — by moving the
  customer-facing product identity to MAREA, not by renaming the engineering repository.

## 6. Claims risk (public certification, protocol, safety and availability claims)

The MC-02 evidence base rules out every certification claim: no CE/EMC/RED/LVD conformity
(H-06), no NMEA 2000 licence/certification (H-04, R-02), no sea trials or bench measurements (H-05,
H-09), no chart/OEM rights (D-01..D-03), no trademark clearance (X-01), unresolved ownership/licensing
(L-01..L-04). The site is nonetheless **reachable in production** and contains the following risky
claims. None is changed in this audit.

| Risk | Claim found (file:line) | Why it is risky (MC-02 evidence) | Required remediation class |
| --- | --- | --- | --- |
| R1 | `technology.es.ts:59` / `technology.en.ts:60`: "Entradas NMEA 0183 y NMEA 2000 (mediante adaptador)" / "NMEA 0183 and NMEA 2000 inputs (via adapter)"; repeated at `technology.es.ts:69` / `technology.en.ts:70` as a protocol list and at `technology-page.content.ts:31` | H-04: NMEA 2000 is *not implemented* (type stubs only) and the official NMEA position requires licence, manufacturer/product codes and certification for products reading or transmitting NMEA 2000; the term is a registered trademark. R-02 explicitly flags "claiming NMEA 2000 compatibility without licence or certification" as HIGH. This is currently an unqualified compatibility claim | `REQUIRES_COPY_CORRECTION` + `REQUIRES_PRODUCT_VALIDATION` |
| R2 | `technology.es.ts:17` / `technology.en.ts:18`: "Blancos AIS con cálculo de CPA/TCPA y alarmas de colisión" / "AIS targets with CPA/TCPA calculation and collision alarms" | D-09/claims policy Class X forbid implying collision avoidance from receive-only AIS; C-06 is `IMPLEMENTED_NOT_FULLY_TESTED`, with "false-alarm rate" and "AIS-derived product claims" listed as unvalidated | `REQUIRES_COPY_CORRECTION` |
| R3 | `technology.es.ts:76,79,84,92` / `technology.en.ts:77,80,85,93` ("seguridad por diseño", "parada de emergencia física", "heartbeat de 500 ms", "E-stop físico, watchdog") and `about.content.ts:42` | H-01 (PILOT safety gate BLOCKED: no bench evidence, no sea trial, no conformity) and H-10 (no hardware watchdog/relay/end-stop evidence; E-stop GPIO-level concept only). P-04 says do not offer PILOT for sale | `REQUIRES_COPY_CORRECTION` + `REQUIRES_PRODUCT_VALIDATION` |
| R4 | `technology-page.content.ts:46`: "Software auditable, probado con un banco de simulación antes de cada versión"; `about.content.ts:36`: "Cada sistema se prueba primero en un banco de simulación ..." | H-09: the bench is not isolated by default and simulation assertions are stored but never evaluated; H-05: no physical build/measurement/EMC evidence exists | `REQUIRES_COPY_CORRECTION` |
| R5 | `technology.es.ts:27` / `technology.en.ts:28`: "Código abierto, con soporte y personalización comercial"; `legal.es.ts:30` / `legal.en.ts:23`: "El software Open Marine distribuido como código abierto se rige por su propia licencia" | L-01: the OPEN-MARINE repository has **no** LICENSE file and `github license: null`; DEC-01/DEC-02 leave outbound licensing undecided. Publicly describing the product as open source is a licence statement the programme cannot support | `REQUIRES_LEGAL_APPROVAL` |
| R6 | `technology-page.content.ts:28` / `:62`: "Open Marine es nuestra plataforma abierta..." / "Open Marine is our open navigation and instrumentation platform" | Asserts ownership of a project whose authorship/licence chain is unresolved (L-01..L-04); `BRAND-ARCHITECTURE.md` explicitly forbids presenting OPEN-MARINE as owned/cleared | `REQUIRES_COPY_CORRECTION` (with legal sign-off) |
| R7 | `technology-page.content.ts:47`: "Cartografía exclusivamente legal: respetamos las licencias de las cartas comerciales"; `technology.es.ts:33`: "Tu cartografía legal ... siempre disponible"; `technology.es.ts:43` | D-01 (no ENC distributor/OEM agreement), D-02 (MBAR source mislabelled CC-BY vs CC-BY-NC, not for navigation), D-03 (OSM offline policy forbids bulk/offline prefetch). The "exclusively legal" absolute is not supportable while these are open | `REQUIRES_COPY_CORRECTION` |
| R8 | `shop-detail.ts:157-161` (JSON-LD Offer with price and `InStock`), `shop-detail.ts:47,60`, `shop-list.ts:61`, `i18n/es.ts:96`, `i18n/en.ts:92` | Not fabricated: price/stock come from the server (`api.ts:313,358-365,383`) and seed products ship inactive with price 0/stock 0 (`db.ts:135-139`). However, publishing price/availability to customers and search requires OPERATIONS READY + an approved price list (claims policy §5, X-05); no product is at that state in the programme | `REQUIRES_PRODUCT_VALIDATION` (operational gate, not a code defect) |
| R9 | `legal.es.ts:29` / `legal.en.ts:23`: "Los textos, diseños y marcas de este sitio pertenecen a {owner} o a sus licenciantes" / "Text, designs and trademarks belong to {owner} or its licensors" | Asserts trademark ownership while no trademark is registered or cleared (X-01) and the software/data ownership chain is unresolved; claims policy Class X prohibits claiming trademarks the programme has not cleared | `REQUIRES_LEGAL_APPROVAL` |
| R10 | `contact.content.ts:22` / `:33`: "Respondemos en 48 horas laborables" | Class C operational commitment with no documented service contract/staffing evidence (claims policy §2) | `REQUIRES_COPY_CORRECTION` |

Positive controls found (keep, do not "fix" away): the sample-catalogue disclaimer (`i18n/es.ts:106`),
the sold-out/unavailable states (`shop-detail.ts:61-63`), the chart-engine "no descifra" limitation
(`technology.es.ts:43`), the AIS receive-only statements (`guides.es.ts:16`, `db.ts:132`), the
`schema.org/Availability` computation from server stock (`shop-detail.ts:161`), and the legal
out-of-scope limitation ("Los contenidos ... no constituyen una oferta vinculante",
`legal.es.ts:22-23`).

## 7. Routes and SEO

### 7.1 `LOCALIZED_ROUTES` status

Single source of truth: `src/app/core/i18n/locale-routes.ts:39-63` — **21 `RouteId` entries** (typed
registry, `satisfies Record<RouteId, LocalizedPath>`). Spanish paths are unprefixed and indexed; EN is
prefixed `/en/`. Dynamic segments use the same slug in both languages (`locale-routes.ts:33-38`), so
an entity keeps its identifier across locales. `app.routes.ts` builds every route from the registry
(`app.routes.ts:9-10`), and `app.routes.server.ts:9-10` does the same for prerender/render mode.

| Route id | ES path | EN path | Render mode (app.routes.server.ts) | Indexed |
| --- | --- | --- | --- | --- |
| `home` | `/` | `/en` | Prerender | Yes (`x-default` = ES home) |
| `technology` | `/tecnologia` | `/en/technology` | Prerender | Yes |
| `technologyDetail` | `/tecnologia/:slug` | `/en/technology/:slug` | Prerender (6 slugs) | Yes |
| `experiences` | `/experiencias` | `/en/experiences` | Prerender | Yes |
| `delivery` | `/traslados` | `/en/delivery` | Prerender | Yes |
| `services` | `/servicios` | `/en/services` | Prerender | Yes |
| `about` | `/sobre-nosotros` | `/en/about` | Prerender | Yes |
| `contact` | `/contacto` | `/en/contact` | Prerender | Yes |
| `guides` | `/guias` | `/en/guides` | Prerender | Yes |
| `guideDetail` | `/guias/:slug` | `/en/guides/:slug` | Prerender (30 slugs) | Yes |
| `shop` | `/tienda` | `/en/shop` | Server | Yes |
| `shopDetail` | `/tienda/:slug` | `/en/shop/:slug` | Server | Yes (EN only when fully translated: `shop-detail.ts:167-177`) |
| `shopSample` | `/tienda/muestra/:slug` | `/en/shop/sample/:slug` | Server | **No** — explicit `noindex` (`sample-detail.ts:44-54`), excluded from sitemap (`check-seo.mjs:159`) |
| `cart` | `/carrito` | `/en/cart` | Client shell | No — `noindex` (`server.ts:30,250`; `check-seo.mjs:277-295`) |
| `login` | `/acceso` | `/en/login` | Client shell | No — `noindex` |
| `account` | `/cuenta` | `/en/account` | Client shell | No — private |
| `orderDetail` | `/cuenta/pedidos/:id` | `/en/account/orders/:id` | Client shell | No — private |
| `legalNotice` | `/aviso-legal` | `/en/legal-notice` | Prerender | Yes |
| `privacy` | `/privacidad` | `/en/privacy` | Prerender | Yes |
| `cookies` | `/cookies` | `/en/cookies` | Prerender | Yes |
| `termsOfSale` | `/condiciones-de-venta` | `/en/terms-of-sale` | Prerender | Yes |

Outside the registry: `admin` (`app.routes.ts:104-117`, Spanish only, client-rendered, `noindex`,
`server.ts:244-251`) and three legacy paths — `/open-marine`, `/productos`, `/productos/:slug` — that
redirect with status 301 (`app.routes.ts:119-123`, `app.routes.server.ts:57-59`).

**Indexed URL inventory:** 98 static URLs (24 prerendered prose pages + 12 technology-detail pages +
60 guide-detail pages + 2 shop lists) plus one dynamic URL per active product (`/tienda/:slug`, and
`/en/shop/:slug` only when all EN fields exist — `server.ts:192-201`). `scripts/check-seo.mjs:132`
asserts `>= 100` sitemap entries because its test fixture adds two active products to the 98 static
URLs.

### 7.2 Routes whose labels or slugs could change under a future MAREA migration

**Key finding: no public URL path contains the string `embarcarte`, `marea` or `open marine`**, except
the legacy redirect `/open-marine`. A brand migration therefore does **not require any indexed URL to
change**. It changes **titles, descriptions, H1s, JSON-LD identities and product records**, not paths:

| Surface | What changes | SEO consequence | Required control |
| --- | --- | --- | --- |
| Home `<title>`/description (`home.content.ts:91`, `:141-142`) | brand token | indexed title/description of the site root | update in one release; keep canonical `/` |
| Title suffix on every non-home page (`seo.service.ts:39`) | `SITE.name` | all indexed titles change at once | schedule with Search Console monitoring; no path change |
| Technology page title/H1/modules (`technology-page.content.ts:53,87`; `technology.ts:40`; `technology.es/en.ts` names) | module display names | 12 technology URLs keep paths but change `<title>`/H1 | do not rename slugs (`navegador`, `cartografia`, `hub`, `piloto-automatico`, `simulacion`, `pasarela-sensores` are brand-neutral) |
| Product detail titles/H1 (`product-detail.ts:113-119`) | module name in title | 12 URLs | no path change |
| Shop title/description (`i18n/es.ts:87-89`, `en.ts:83-85`) | brand token | 2 list URLs | metadata only |
| Product records (`db.ts:113-132`; active products in DB) | product names; optional slug rename `open-marine-*` | product URLs are indexed when active | if a product slug changes: one-hop 301 per product, old→new, and sitemap update |
| Guide titles mentioning the platform (`guides.es.ts:94`, `guides.en.ts:95`) | title text | 2 of 60 guide URLs | metadata only |
| Legacy `/open-marine` | redirect target may be renamed | **already a 301** | keep the redirect; never delete the legacy path |
| Legal pages | attribution/seller wording | indexed legal URLs | requires X-02/legal approval first (§5.2) |

### 7.3 Canonical, hreflang and redirect requirements

- Canonical and alternates are **derived from the route registry**, not hand-written:
  `pageSeo()` (`seo.service.ts:129-135`) sets canonical path, locale and both alternates; only the home
  page declares `x-default` (`seo.service.ts:134`; verified by `check-seo.mjs:173-180`).
- Sitemap alternates are emitted only when both locales are actually published
  (`server.ts:165-181`), so an alternate can never point at a page that is not served.
- Reciprocity is enforced by `scripts/check-seo.mjs:212-235` (every sitemap alternate must appear in
  the HTML and every sitemap loc must be canonical on its own page) and private pages must have **no**
  canonical/hreflang (`check-seo.mjs:276-295`).
- The 404 page has no canonical and is `noindex` (`seo.service.ts:14-18`; `check-seo.mjs:297-299`).
- Legacy redirects: `open-marine`, `productos`, `productos/:slug` → `/tecnologia[/:slug]` with 301
  (`app.routes.ts:119-123`, `app.routes.server.ts:57-59`). A brand migration must add new one-hop 301
  entries in the **same** mechanism and must not create chains (redirect to a URL that itself
  redirects).

### 7.4 Sitemap, robots, JSON-LD and social metadata implications

- **Sitemap** is generated from the actual prerendered output plus DB products (`server.ts:139-215`);
  any new MAREA route that is prerendered will appear automatically. New pages must therefore be
  truthful and indexable only when ready (otherwise a `noindex`/server-render exception must be added
  to `app.routes.server.ts`).
- **Robots** hard-codes the absolute sitemap host (`public/robots.txt:5`) and the test asserts it
  (`check-seo.mjs:120`). It must change atomically with `SITE_URL`.
- **JSON-LD identity nodes**: `Organization` and `WebSite` use `SITE.name`/`SITE.url`
  (`home.ts:104-112`); `Product.brand` is hard-coded `'Open Marine'` (`shop-detail.ts:154`,
  `product-detail.ts:125`); `Article.publisher` is `'Embarcarte'` (`guides.ts:141`); `Service.provider`
  hard-codes a URL (`delivery.ts:72`). These are the machine-readable brand surface; a switch must keep
  **one** `Organization` identity (EMBARCARTE, the seller) and move **`Brand`/product names** to MAREA
  in a coordinated release.
- **OpenGraph/Twitter** are generated centrally (`seo.service.ts:46-59`): `og:site_name` follows
  `SITE.name`; the title suffix follows `SITE.name`; the default image is `/og-image.png`
  (`seo.service.ts:38`), a raster asset that currently carries the EMBARCARTE wordmark.
- **Static shell** titles/descriptions are hard-coded in `index.html:5,8` and `server.ts:47,51`; they
  are the first bytes a crawler can see and are **not** sourced from `SITE`, so they must be updated
  in the same release or crawlers may see two brands.
- **No indexed URL may be removed** (AGENTS.md architecture rule; registry comment
  `locale-routes.ts:33-38`; sitemap/redirect invariants tested). Migration must be additive until the
  redirect map is live, and redirects must remain for at least a full re-crawl cycle before any cleanup.

## 8. Phased migration plan

Prerequisite for every phase: this audit is accepted by an independent reviewer and the Lead records
the go/no-go. No phase may be executed by an agent acting alone; the human authorisations are listed in
`BRAND-AND-IP-DECISION-PACKAGE.md`.

### Phase 0 — Prerequisites (no public change)

| Item | Content |
| --- | --- |
| **Entry condition** | MC-03 evidence complete and reviewed: MAREA trademark research recorded (`TRADEMARK-CLEARANCE-RESEARCH.md`), brand architecture approved (`BRAND-ARCHITECTURE.md`), claims policy approved (`COMMERCIAL-BRAND-CLAIMS-POLICY.md`). This audit accepted. |
| **Prerequisites to close** | (a) **Trademark clearance** go/no-go (X-01) — professional EUIPO/OEPM review, not an agent conclusion; (b) **verified corporate identity** for `SITE.legal` (X-02); (c) **ownership/licence decision** for OPEN-MARINE (L-01..L-04, DEC-01); (d) decision on domain strategy (keep `embarcarte.com`, add a MAREA domain, or no new domain). |
| **Changes** | None to `src/`, routes, metadata, assets or commerce. Only decision records and the brand contract. |
| **Evidence needed** | Signed/recorded decisions with named human owners; no invented legal data; no trademark claim. |
| **Rollback control** | Not applicable (no product change); decisions are append-only in `DECISION-LOG.md`. |
| **Owner function** | Company owner + counsel + Lead. |

### Phase 1 — Non-public/internal alignment (no public change)

| Item | Content |
| --- | --- |
| **Entry condition** | Phase 0 decisions recorded; brand contract validated (`npm run test:brand`); MAREA remains internal. |
| **Changes (internal only)** | Admin placeholder naming (`admin-product-edit.ts:31`); internal comments/email subjects reviewed for accuracy; consolidate future brand strings into one config module (design only, not executed in MC-03); document the three duplicated description sources so a later single edit is possible; pre-write the claim-correction backlog (R1–R10) for approval. |
| **Explicit non-changes** | No public title, meta, JSON-LD, route, dictionary, asset or `SITE.legal` change. |
| **Evidence needed** | `git diff` touches no public-rendered file; `npm run test:brand`, `test:i18n`, `test:seo`, `test:commerce` still pass on an unmodified build. |
| **Rollback control** | Revert the internal commit; no public surface affected. |
| **Owner function** | Lead + Engineering. |

### Phase 2 — Additive MAREA surfaces (never replacing indexed URLs)

| Item | Content |
| --- | --- |
| **Entry condition** | Phase 0 trademark clearance + corporate identity + ownership decision recorded; prompt 15 (IA/URL/SEO registry) and prompt 17/18 (design system, landing) authorised; claims register populated for any statement to be published; image assets available (X-03 must be unblocked, otherwise a text-only launch is the only honest option). |
| **Changes** | New MAREA routes/pages added to `LOCALIZED_ROUTES` and `app.routes.server.ts` with justified canonical/hreflang; new pages are additive, self-canonical, and link to the existing technology pages; `Brand`/`Organization` JSON-LD on new pages only; existing EMBARCARTE/Open Marine pages untouched. |
| **Evidence needed** | `npm run test:i18n` (parity), `test:seo` (canonical reciprocity, sitemap, JSON-LD allowed types), `test:commerce` (no commerce change), build/prerender success; before/after sitemap diff showing **only additions**; Search Console baseline captured. |
| **Rollback control** | New routes can be removed with a one-hop 301 to their closest existing page; existing indexed URLs untouched; feature flag by route removal is immediate. |
| **Owner function** | Product + Marketing + SEO + Lead. |

### Phase 3 — Public brand switch with redirect map

| Item | Content |
| --- | --- |
| **Entry condition** | Phase 2 additive pages stable for at least one crawl cycle; all `REQUIRES_LEGAL_APPROVAL` and `REQUIRES_COPY_CORRECTION` items for the affected pages closed; MC-04 identity assets delivered (real files, not generated claims); legal review of seller/attribution strings; go/no-go recorded. |
| **Changes** | `SITE.name`/`defaultDescription` (`site.config.ts:7,10-12`); static shell (`index.html:5,8`; `server.ts:47,51`); wordmark (`brand.ts:11`, `a11y.brand`); home/technology/shop titles and descriptions; JSON-LD `Organization`/`WebSite`/`Brand` identity; product names in `technology.es/en.ts` and DB; product slug renames only if approved, each with a one-hop 301; `og:site_name`; webmanifest; brand assets. Keep the seller as EMBARCARTE in legal pages, `Product.seller` and transactional emails. |
| **Evidence needed** | Full `test:seo` + `test:i18n` + `test:commerce` pass; sitemap diff with no deletions; every changed URL 301s one hop to a 200 canonical; canonical/hreflang reciprocity verified post-deploy; rollback drill documented; claims-register approvals filed. |
| **Rollback control** | Text/metadata switch is a single small commit (site.config + shell + dictionaries + JSON-LD) that can be reverted; keep old-locale redirect map deployed even if the copy reverts; never delete old URLs until 12 months after the switch and a clean Search Console report. |
| **Owner function** | Lead (integration) + SEO + Legal + Product. |

### Phase 4 — Cleanup and SEO consolidation

| Item | Content |
| --- | --- |
| **Entry condition** | Phase 3 live and stable; Search Console shows no coverage regressions; no certificate/claim gate reopened. |
| **Changes** | Flatten redirect chains; retire internal/engineering naming from public copy (e.g. "el proyecto" in guides); remove superseded assets; consolidate duplicate descriptions into one source; update scripts/test fixture hostnames if the domain changed; final sitemap/robots verification. |
| **Evidence needed** | `npm run test:seo`, `test:i18n`, `test:commerce`, `test:backup` green; sitemap has no 404/redirect URLs; canonical self-consistency across the whole indexable surface; no legacy `/open-marine` removal. |
| **Rollback control** | Keep 301s indefinitely; cleanup commits are separable from the brand switch. |
| **Owner function** | Engineering + SEO + Lead. |

**Hard sequencing constraints:** Phase 0 legal items cannot be skipped or simulated; Phase 2 cannot
publish MAREA before trademark/legal clearance; Phase 3 cannot ship a visual identity while image
generation is externally BLOCKED (MC-01 X-03) unless the switch is deliberately text-only and reviewed
for consistency; no phase may delete an indexed URL.

## 9. What this milestone did NOT change

1. **No `src/` change of any kind** — no code, template, style, content, dictionary, i18n route,
   site config, legal field or commerce behaviour.
2. **No route added, removed, renamed or redirected** — `LOCALIZED_ROUTES`, `app.routes.ts` and
   `app.routes.server.ts` are untouched; `/open-marine`, `/productos` redirects untouched.
3. **No SEO metadata change** — titles, descriptions, canonical, hreflang, robots, sitemap, JSON-LD,
   OpenGraph/Twitter untouched.
4. **No `SITE.legal` change** — tax ID, address and registry remain empty and are **not invented**;
   X-02 remains BLOCKED.
5. **No commerce change** — prices, stock, cart, checkout, payments, server-authoritative validation
   untouched; no product activated or deactivated.
6. **No public brand publication** — MAREA is not used in any public-facing string by this milestone;
   `git grep -i "MAREA" -- src public scripts` still returns 0.
7. **No asset or identity work** — no image, icon, logo, font or visual token created, replaced or
   committed; no image generation attempted (MC-01 X-03 remains BLOCKED).
8. **No dependency, CI, package or build-config change by this audit** — no `package.json`,
   `angular.json`, workflow or lockfile edit was made by Agent F. (A concurrent MC-03 task adds the
   brand validator to `scripts/` and wires it in `package.json`/`.github/workflows/ci.yml`; that is not
   this audit, see §9 proof.)
9. **No Git write command** — no branch, checkout, commit, merge, reset or push was executed.
10. **No external action** — no domain purchase, trademark filing, DNS, deploy or contact with third
    parties.

**Proof — working tree state (read-only `git status`):**

```text
$ git status --short -- src
(no output: src/ is untouched)

$ git status --short
 M .github/workflows/ci.yml
 M package.json
?? docs/marea/brand/            # untracked directory: this audit + other MC-03 agents' documents
?? scripts/check-brand.mjs      # another MC-03 teammate's deliverable (task-5), not this audit
?? scripts/check-brand.test.mjs # another MC-03 teammate's deliverable (task-5), not this audit
```

The `src/` proof is the acceptance-relevant one: **no tracked or untracked change exists under
`src/`**. The non-`src/` modifications shown belong to a **different MC-03 task running concurrently**
(brand-governance validator and its `package.json`/CI wiring); this audit did not create, edit or stage
them, and did not run any Git write command. Nothing under `public/` is modified. Only files inside
`docs/marea/brand/` originate from this audit, and of those the only file this agent wrote is
`WEBSITE-BRAND-MIGRATION.md`.

## 10. Risk register and verdict

| # | Risk | Severity | Control | Owner function |
| --- | --- | --- | --- | --- |
| K1 | Seller identity incomplete (`SITE.legal` empty; public "pending" notice) — LSSI/consumer-precontract exposure | HIGH | Do not invent; close X-02 with verified registration data before any brand-related legal rewrite; legal review of legal pages | Company owner + counsel |
| K2 | Brand migration executed before MAREA trademark clearance | HIGH | Phase 0 go/no-go gate; `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` enforced by `check-brand`; no public MAREA string in this milestone | Company owner + Lead |
| K3 | NMEA 2000 / NMEA trademark and certification claim remains reachable | HIGH | Rewrite claims (R1) via claims register; remove unqualified NMEA 2000 wording before Phase 2/3; never use NMEA marks/logos without licence | Product + Engineering + Legal |
| K4 | PILOT/collision-alarm/AIS safety claims imply guarantees | HIGH | Apply claims policy Classes P/X (R2, R3); add navigation-aid limitation to every relevant page; no PILOT sale while H-01 open | Product + Safety + Legal |
| K5 | "Open source" / "our platform" statements contradict unresolved licensing/ownership | HIGH | Legal approval + copy correction (R5, R6) before any migration; reference DEC-01 outcome in copy | Company owner + counsel + Engineering |
| K6 | A metadata/brand switch changes the indexed surface and loses rankings | MEDIUM | Single coordinated release; canonical/hreflang reciprocity tests; before/after sitemap diff; Search Console monitoring; one-hop 301 memory for 12 months | SEO + Lead |
| K7 | Three duplicated brand descriptions (`site.config`, `index.html`, `server.ts`) drift apart during migration | MEDIUM | Consolidate into one source in Phase 2/3; add a regression check that the three strings agree | Engineering |
| K8 | Assets cannot be regenerated while image generation is BLOCKED (X-03) | MEDIUM | Phase 3 entry gate requires real, authorised assets; allow an explicitly text-only, consistency-reviewed switch; keep current raster assets until then | Design + Lead |
| K9 | Product slug rename (e.g. `open-marine-hub`) breaks an indexed product URL | MEDIUM | Only rename with a one-hop 301 + sitemap update; products are inactive by default (`db.ts:135-139`) so no immediate exposure | Engineering + SEO |
| K10 | Commercial availability/price claims published before OPERATIONS READY | HIGH | Keep seed products inactive; require approved price list and operations readiness before activating SKUs; claims register approval | Product + Finance + Lead |
| K11 | Legacy `/open-marine` redirect removed during cleanup, losing backlinks | LOW | Treat the redirect as permanent; add a test/lint to keep it; never delete indexed legacy paths | Engineering |

**Verdict on migration readiness.** The website is a small, well-instrumented, registry-driven
Angular SSR surface whose brand strings are concentrated in a few files (`site.config.ts`,
`index.html`, `server.ts`, `brand.ts`, `technology.*.ts`, `home.content.ts`, the dictionaries and the DB
seed), and **no indexed URL contains a brand token other than the `/open-marine` legacy redirect**. That
makes a future MAREA switch technically tractable and SEO-safe if executed as an additive, metadata-
only change with the existing canonical/hreflang/sitemap machinery. It is **not** ready to execute
today: the programme still lacks trademark clearance (X-01), verified corporate identity (X-02),
ownership/licence resolution (L-01..L-04/DEC-01), product validation for NMEA 2000 and PILOT safety
(H-01/H-04/H-10), chart-data rights (D-01..D-03) and a real commercial-availability state. Several
reachable public claims are currently unverifiable or false under the MC-02 evidence base and must be
corrected before any brand publication. The correct next step is Phase 0 decisions plus Phase 1
internal alignment; MC-03 leaves the production site, its URLs and its legal pages exactly as they
were.
