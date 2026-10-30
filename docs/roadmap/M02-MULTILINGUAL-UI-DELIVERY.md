# M02 — Multilingual UI delivery

Milestone: **Prompt 2 of 4**. Branch `feature/i18n-multilingual-ui`, stacked on
`feature/i18n-architecture-foundation` (M01, `714f9fe`) because M01 is still open.
Status: **PASS** — see §14.

## A. Executive summary

The frontend was bilingual by duplication: five English-only components mirrored the
Spanish ones, six page templates carried 159 inline `english ? … : …` expressions, the
English footer lived inside the root component, and every public URL was written three
times (routes, prerender list, SEO metadata).

M02 replaces that with **one component per feature**, per-locale content modules and
routes derived from the M01 registry. The `.ts` files touched by the change set grew
(content modules are typed data), but the duplicated *implementations* are gone: the five
duplicate components were deleted, the shell exists once, and 159 ternaries became 0 in the
migrated area. Nothing was renamed, no URL moved, and the prerendered output is still 96
routes.

The commerce screens (`shop/`, `account/`, `admin/`) were deliberately left alone: their
copy, their duplicated English components and their API contracts are M03 work.

## B. Before / after architecture

Before:

```
src/app/
├── app.ts                  ← root + a full English footer in its template
├── layout/{brand,header,footer}.ts   ← Spanish footer; header with links + englishLinks
├── pages/                  ← 15 components; 4 English-only duplicates
│   ├── home.ts             ← both languages, 31 ternaries
│   ├── open-marine.ts      ← 35 ternaries
│   ├── guides.ts           ← 31 ternaries
│   ├── english.ts          ← 5 English corporate pages in a PAGES map
│   └── contact-en / legal-en / product-detail-en
└── core/
    ├── catalog.ts + catalog-en.ts
    └── guides.ts + guides-en.ts + guide-extras.ts
```

After:

```
src/app/
├── app.ts                  ← skip link + <app-header/> + <router-outlet/> + <app-footer/>
├── layout/
│   ├── brand.ts            ← locale-aware logo link
│   ├── header/header.ts    ← one nav from semantic route ids + dictionary labels
│   ├── footer/footer.ts    ← one footer, translated
│   └── language-switcher/language-switcher.ts
├── shared/models/localized.ts  ← LocalizedContent<T> { es, en } + localized()
├── features/
│   ├── home/{home.ts, content/home.content.ts}
│   ├── technology/{technology.ts, product-detail.ts,
│   │               models/technology.ts,
│   │               content/{technology.es,technology.en,technology-page,technology-detail}.ts}
│   ├── guides/{guides.ts, models/guides.ts,
│   │           content/{guides.es,guides.en,guide-extras,guides-page}.ts}
│   ├── experiences, delivery, services, about, contact, legal/   ← same shape
└── core/i18n/ + i18n/       ← unchanged from M01, dictionaries extended (19 → 76 keys)
```

Dependency boundaries (unchanged from M01, now enforced by the tree):

- `i18n/*` imports only `core/i18n/locale.types.ts` — no Angular, so content and
  dictionaries are unit-testable without a framework.
- `features/*/content/*` imports only `shared/models/localized.ts` and types from
  `features/*/models/*`; it never imports a component or an Angular symbol.
- `features/*/models/*` owns identity (`slug`, `kind`) and merges `es`+`en` content.
- Components own presentation only: they read `LocaleService.locale()` and pick
  `localized(content, locale)`.
- `layout/*` imports `core/*`, `shared/*` and `i18n/*`; features never import layout.

Two models replace the parallel content files:

```ts
// features/technology/models/technology.ts
const TECHNOLOGY_IDENTITY = { navegador: 'Software', … } as const;
export type TechnologySlug = keyof typeof TECHNOLOGY_IDENTITY;     // identity, never translated
export interface TechnologyProduct { id; slug; kind; content: LocalizedContent<TechnologyContent> }

// features/guides/models/guides.ts
export const GUIDE_SLUGS = ['que-es-signal-k', …] as const;        // published identity
export interface Guide { id; slug; content: LocalizedContent<GuideText>; extra?; sources? }
```

`Record<TechnologySlug, …>` and `Record<GuideSlug, …>` make both content files exhaustive:
forgetting a translation is a **compile error**, not an empty paragraph.

## C. Duplication metrics

| Metric | Before | After |
| --- | --- | --- |
| Page components in `src/app/pages/` | 15 | 1 (`not-found.ts`) |
| English-only duplicate components | 4 | 0 |
| Inline `english ? … : …` (M02 scope) | 159 | **0** |
| Inline `english ? … : …` (whole app) | 172 | 5 (all in `shop/sample-detail.ts`, M03) |
| Footer implementations | 2 | 1 |
| Header navigation arrays | 2 | 1 (list of route ids) |
| Content modules per language pair | 5 files, 2 languages each | 3 identity models + 11 typed content files |
| Translation keys (`i18n/es.ts`) | 19 | 76 (+57) |
| Public path literals in `app.routes.ts` | 46 | 12 (admin + legacy redirects only) |
| Prerender path literals in `app.routes.server.ts` | 24 + 4 param routes | 12 ids + 2 detail ids, expanded per locale |
| Hand-written SEO path/alternate pairs | 26 | `pageSeo()` derives them (10 call sites) |
| Files added / deleted | — | 30 added, 19 deleted, 12 moved |

Full inventory: [M02-DUPLICATION-INVENTORY.md](../architecture/M02-DUPLICATION-INVENTORY.md).

Translation keys added by area: shell/accessibility (10), footer (17), contact (25),
legal (7), guides (4), services/nav (2).

## D. Functional verification

Every public page was fetched from the built SSR server and asserted for status, `lang`,
title, canonical and both `hreflang` links. 96 prerendered routes × 2 assertions sets,
plus the server-rendered shop pages:

| Category | URLs | Result |
| --- | --- | --- |
| Home | `/`, `/en` | PASS — same component, both locales |
| Technology | `/tecnologia`, `/en/technology` | PASS |
| Technology detail | `/tecnologia/:slug`, `/en/technology/:slug` (6 slugs) | PASS |
| Experiences | `/experiencias`, `/en/experiences` | PASS |
| Boat delivery | `/traslados`, `/en/delivery` | PASS |
| Services | `/servicios`, `/en/services` | PASS |
| About | `/sobre-nosotros`, `/en/about` | PASS |
| Contact | `/contacto`, `/en/contact` | PASS — form, validation and API unchanged |
| Guides | `/guias`, `/en/guides` | PASS |
| Guide detail | `/guias/:slug`, `/en/guides/:slug` (30 slugs) | PASS |
| Legal | 4 Spanish + 4 English pages | PASS — wording verbatim |
| Shop / sample / detail | `/tienda`, `/en/shop`, `/tienda/muestra/:slug`, `/en/shop/sample/:slug`, `/tienda/:slug`, `/en/shop/:slug` | PASS (unchanged code) |
| Cart, login, account, orders | Spanish and English variants | PASS (unchanged code, paths from the registry) |
| Admin | `/admin/**` | PASS (unchanged, still guarded) |
| Legacy redirects | `/open-marine`, `/productos`, `/productos/:slug` | PASS — 301 to the same targets |
| Unknown routes | `/no-existe`, `/en/technology/no-existe` | PASS — 404 |

Language switching keeps page identity, including the slug, the query string and the
fragment (`/guias/que-es-signal-k?ref=1#fuentes` ↔ `/en/guides/que-es-signal-k?ref=1#fuentes`);
pages without a counterpart (admin, account, legacy) still fall back to that language's
home, which is the documented M01 behaviour.

## E. SEO / SSR verification

Evidence taken from `dist/embarcarte/browser/**/index.html` (prerendered) and from the
running server:

- `<html lang>`: `es` on Spanish pages, `en` on English pages, for all 96 prerendered
  routes and for the server-rendered shop pages.
- Canonical: exactly one, absolute, matching the registry (`https://embarcarte.com/en/technology`).
- `hreflang`: `es`, `en` pair for every migrated page, generated from the same registry id.
- Titles and descriptions: byte-identical to the published ones (`Open Marine technology |
  Embarcarte`, `Tecnología náutica abierta Open Marine | Embarcarte`, `Embarcarte -
  Tecnología abierta. Libertad en el mar.`, …).
- `og:locale`: `es_ES` / `en_GB` per locale.
- JSON-LD: Organization + WebSite on the home, BreadcrumbList and `Product`/`SoftwareApplication`
  or `Article` on detail pages. Breadcrumb labels are now localized (they used to be
  Spanish on some English pages).
- Sitemap: 98 `<loc>` entries (96 prerendered + `/tienda` + `/en/shop`, no active shop
  products in the test database) — unchanged.
- No hydration mismatch: the locale is still a pure function of the URL, and no page
  renders different content on the client than on the server.

## F. Regression testing

```
npm ci                → clean install, 0 vulnerabilities (esbuild postinstall is blocked by
                        the sandbox policy; the platform package is used, build unaffected)
npm run build         → Prerendered 96 static routes. Application bundle generation complete.
npm run test:i18n     → i18n foundation checks passed + content integrity + 96-route crawl
                        + per-request locale isolation
npm run test:commerce → Commerce integration checks passed: translations, stock,
                        duplicate items, payment validation and order access.
```

`test:i18n` gained two blocks:

1. **Content integrity** — compiles `shared/models` and every `features/**/{models,content}`
   module with the same throwaway `tsc`, then asserts: 6 technology slugs in the published
   order, 30 guide slugs, per-locale `name/description/features/title/sections` filled, the
   same section count per guide in both locales, closing sections present for all guides,
   legal pages structurally identical across locales with no empty paragraph, and no empty
   string anywhere in any page-content module.
2. **Public route crawl** — renders every prerendered route in both locales (96 requests)
   and asserts `lang`, a title, the canonical URL, both `hreflang` links, exactly one
   footer, no cross-language marker (e.g. Spanish chrome on an English page), and no
   unresolved `{placeholder}` / `undefined` in the output. It also asserts that `/` and
   `/en` render the same `home-hero` component, and that the legacy 301s and the 404s still
   behave.

No test framework or dependency was added.

## G. Independent review

Read-only review of the complete diff against `714f9fe`, covering architecture, duplication,
translation completeness, locale-service usage, SSR safety, hydration, route compatibility,
SEO, commerce risk, accessibility, performance and maintainability. The reviewer also
re-ran `npm run build`, `npm run test:i18n` and `npm run test:commerce` and inspected the
prerendered HTML.

| # | Severity | Finding | Resolution |
| --- | --- | --- | --- |
| 1 | Medium | `guides.otherLanguage` named the *current* language instead of the target, so `/guias` linked to `/en/guides…` with the label “Leer en español” (a regression against the base ternaries). | Swapped the two dictionary values (`es` → “Read in English”, `en` → “Leer en español”), documented the key, and locked the direction with an assertion in `check-i18n.mjs` for both the list and the detail pages. |
| 2 | Low | `breadcrumb()` localized the “Home” *name* but kept `path: '/'`, so English JSON-LD breadcrumbs jumped to the Spanish home. | `path: localizedUrl('home', locale)`; the English breadcrumb now starts at `https://embarcarte.com/en`, asserted in `check-i18n.mjs`. |

No Critical or High findings. The reviewer explicitly verified, and found no issue with:
prerender parameter generation (identical 96 URLs and slug order), `<html lang>` on every
prerendered page, the language switcher resolving to the real counterpart (never the
fallback) on all 96 pages, `CanMatchFn` slug checks after the `.at(-1)` rewrite, route
ordering (`tienda/muestra/:slug` before `tienda/:slug`, `guides` before `guides/:slug`),
guards and the `cuenta/pedidos/:id` ↔ `en/account/orders/:id` paths, the contact payload
shape, per-request locale isolation under concurrent rendering, legacy 301s and 404s, the
absence of diffs in `shop/`, `account/`, `admin/` and `src/server/`, byte-identical Spanish
legal copy, all 30 guides, and the 19 technology spec rows.

Both findings were fixed before the milestone was committed; the full gate was re-run
afterwards (see §F).

## H. Git delivery

| Item | Value |
| --- | --- |
| Branch | `feature/i18n-multilingual-ui` |
| Base branch | `feature/i18n-architecture-foundation` (M01, PR #1 still open) |
| Commit | see the branch head |
| PR | see the milestone pull request (stacked, base = M01 branch) |
| CI | no CI pipeline exists in the repository; the three commands in §F are the gate |

## I. Remaining work for M03

- **Commerce translation.** `shop/shop-list.ts`, `shop/shop-detail.ts`, `shop/shop-en.ts`,
  `shop/commerce-en.ts`, `shop/cart.ts`, `shop/sample-detail.ts`, `account/*` and
  `admin/*` still hold their own copy (and the last 5 `english ? …` ternaries). Their
  database fields (`name_en`, `summary_en`, …) already exist.
- **Module detail for English.** `specs`, `tagline` and `audience` are published only in
  Spanish, so the English detail page omits those blocks instead of showing Spanish text
  under English headings. Writing that copy is a content decision.
- **One services block** (`Integración de electrónica`) exists only in Spanish; the English
  page publishes three blocks. Unchanged by M02.
- **International SEO hardening.** Translated slugs, `x-default`, sitemap alternates and a
  full canonical audit were out of scope; M02 only guarantees that nothing regressed.
- `not-found.ts` is still Spanish-only and still lives in `pages/`; it is the last page
  outside the feature tree.
- `core/seo.service.ts`, `core/auth.service.ts` and `core/http/` were not moved into the
  target folders: they have no duplicated presentation, and moving them would have enlarged
  the diff without a functional benefit.

## J. Final result

**PASS** for the M02 scope:

- M01 foundation intact (registry, locale service, translation service, tests).
- One shared component per page; the five duplicate English components are deleted.
- One header, one footer, one language switcher, all locale-aware.
- Corporate pages, contact and legal consolidated; technology and guide content
  structurally localized.
- Public routes, prerender list and SEO metadata derived from the route registry.
- 96 prerendered routes, all public URLs, redirects and 404s preserved; shop, account and
  admin untouched.
- `npm run build`, `npm run test:i18n` and `npm run test:commerce` pass.
