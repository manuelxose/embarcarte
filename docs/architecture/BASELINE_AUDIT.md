# Baseline audit — Embarcarte (M01)

Scope: `main` at `2304b43` (*Update pages content, routes and ignore local tooling*).
Everything below was verified against the working tree, not assumed from the brief.

## 1. Verified stack

| Item | Verified value |
| --- | --- |
| Angular | `21.2.25` (`@angular/core` in `node_modules`) |
| Angular builder | `@angular/build:application`, SSR entry `src/server.ts` |
| TypeScript | `5.9`, `strict`, `isolatedModules`, `module: preserve` |
| Server | Express 5 (`src/server.ts`) + `AngularNodeAppEngine` from `@angular/ssr/node` |
| Database | SQLite via `node:sqlite` (`src/server/db.ts`) |
| Tests | `scripts/check-commerce.mjs` only (`node:assert`, spawned against `dist/`) |
| Test framework | **None.** No `vitest`/`karma`/`jasmine` installed, no `test` target in `angular.json` |

Rendering modes (`src/app/app.routes.server.ts`): ~24 prerendered pages, product/guide
detail prerendered from catalogue params, shop server-rendered per request, cart/account/admin
client-only, unknown paths server-rendered with `404`.

## 2. How localization works today

There is **no i18n framework and no locale service**. The site is bilingual by duplication:

1. **Two route trees.** Spanish pages use unprefixed slugs (`/tecnologia`, `/tienda`,
   `/condiciones-de-venta`); English pages mirror them under `/en` (`/en/technology`,
   `/en/shop`, `/en/terms-of-sale`). Both trees are hand-written in `src/app/app.routes.ts`.
2. **Locale sniffing in the shell.** `App` reads `router.url` and passes an `english`
   boolean down to `<app-header>`.
3. **Per-page bilingual templates.** 8 page components (home, open-marine, experiences,
   transfers, services, guides, sample-detail, english) hold both languages in template
   ternaries — ~117 `english` occurrences across their templates. 7 of them additionally
   read `route.snapshot.data['language']`.
4. **Parallel content modules.** `core/catalog.ts` + `core/catalog-en.ts`,
   `core/guides.ts` + `core/guides-en.ts`, `core/guide-extras.ts`.
5. **Duplicate chrome.** `layout/header.ts` keeps two link arrays (`links`,
   `englishLinks`) and inline ternaries everywhere; `app.ts` inlines a complete English
   footer in its template while `layout/footer.ts` is Spanish-only.
6. **Duplicate English page components.** `pages/english.ts` renders 5 English pages from
   one `PAGES` map; `contact-en.ts`, `legal-en.ts`, `product-detail-en.ts`,
   `shop-en.ts`, `commerce-en.ts` mirror their Spanish counterparts.
7. **SEO.** `core/seo.service.ts` hardcodes `documentElement.lang` and `og:locale`, and
   every page calls `SeoService.set({ path, language, alternates })` with hand-written
   path strings (26 call sites).
8. **Language switch.** A single ES/EN link in the header that always points at the other
   language's **home page**, discarding the current page.

## 3. Findings

### Duplicated components / content
- `pages/home-en.ts` was deleted in `2304b43`; `pages/home.ts` already serves both locales.
  The same consolidation is still pending for experiences, transfers, services and
  open-marine, which now take a `language` route data flag instead.
- `english.ts` (5 pages), `contact-en.ts`, `legal-en.ts`, `product-detail-en.ts` remain
  fully separate components.

### Localization-sensitive URLs
- Every public URL is language-specific, and the two trees are expressed twice: once in
  `app.routes.ts` and once as strings inside each page's `SeoService.set` call. Nothing
  connects the two, so a renamed slug silently breaks canonicals and `hreflang`.
- Dynamic entities keep the **same slug in both languages** (`/tecnologia/navegador` ↔
  `/en/technology/navegador`, `/tienda/muestra/anemometro` ↔ `/en/shop/sample/anemometro`).
  That is the stable entity identifier the i18n layer must preserve.

### Shared content identifiers
- Products: `slug` (catalogue), plus `name_en`/`summary_en`/`description_en` columns in
  SQLite for shop products. Guides: `slug` + `guides-en.ts`.

### SSR / hydration
- Locale was derived from `router.url` (works, but re-evaluated per access and duplicated
  in every page).
- `<html lang>` depended on each page remembering to pass `language` to `SeoService`.
  Server-rendered English pages that do not call it (`/en/shop`, `/en/cart`, `/en/login`,
  `/en/account`) rendered `lang="es"`.
- No browser storage is used for language, so no hydration mismatch existed. This property
  must be preserved.

### Missing translations
- Spanish-only chrome: `layout/footer.ts`; English footer exists only inline in `app.ts`.
- No shared UI string layer at all: no accessibility labels, generic errors or common
  actions are centralized.

## 4. Risks identified before changing anything

| Risk | Mitigation |
| --- | --- |
| Moving Spanish URLs would drop indexed pages | Route registry encodes the *existing* paths; nothing is renamed |
| Rewriting page components could break checkout/account | M01 touches no commerce, account or admin component |
| A locale store could leak between concurrent SSR requests | Locale is derived from the request URL; no module-level mutable state |
| Changing `<html lang>` could break existing canonicals/`hreflang` | Locale strings are centralized but produce the same values (`es`, `en`, `es_ES`, `en_GB`) |
| New test tooling could churn the dependency tree | Tests reuse `node:assert` + a throwaway `tsc` compile; no new dependency |

## 5. Proposed change set for M01

1. Typed locale contract (`core/i18n/locale.types.ts`) with URL-derived locale detection.
2. Locale metadata (`core/i18n/locale.config.ts`) replacing hardcoded `lang`/`og:locale`.
3. Centralized localized route registry (`core/i18n/locale-routes.ts`).
4. `LocaleService` (signals, per-request state) and `TranslationService` (typed keys).
5. Spanish/English shared UI dictionaries under `src/app/i18n/`.
6. Minimal integration: root shell, header switcher, SEO service.
7. `npm run test:i18n` covering detection, mapping, translations and server-rendered markup.

## 6. Out of scope for this milestone

- Migrating page templates and content modules to dictionaries (Prompt 2).
- Rewriting the header/footer markup, checkout, account or admin screens.
- Splitting `catalog`/`catalog-en` and `guides`/`guides-en` (Prompt 2/3).
- Any `angular.json` i18n configuration, extra build locales, or `/es` prefixed URLs.
- Database schema changes and deployment.
