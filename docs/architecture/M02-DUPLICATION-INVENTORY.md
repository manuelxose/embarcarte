# M02 duplication inventory

Baseline: `feature/i18n-architecture-foundation` at `714f9fe` (M01, PASS).
Everything below was measured on that tree, not inferred from the M01 report.

## 1. How it was measured

- Read every component under `src/app/{pages,layout,shop,account,admin}` and the root shell.
- Counted inline `english ? … : …` expressions (`Select-String "english \?"`).
- Counted the `route.snapshot.data['language']` flags that decided the language at runtime.
- Counted public path literals in `app.routes.ts` and `app.routes.server.ts`, and the
  hand-written `path`/`alternates` pairs passed to `SeoService.set()`.
- Compared the Spanish and English copies of every page to separate *translated content*
  from *duplicated code*.

## 2. Baseline numbers

| Metric | Before |
| --- | --- |
| Page components in `src/app/pages/` | 15 |
| English-only duplicate page components | 4 (`english.ts` for 5 pages, `contact-en`, `legal-en`, `product-detail-en`) |
| Inline `english ? …` ternaries (M02 scope) | 159 |
| `english ? …` ternaries (whole app) | 172 |
| Components reading `route.snapshot.data['language']` | 7 |
| Footer implementations | 2 (`layout/footer.ts` in Spanish + a full English footer inlined in `app.ts`) |
| Header navigation arrays | 2 (`links`, `englishLinks`) |
| Content modules holding one language each | 5 (`catalog`, `catalog-en`, `guides`, `guides-en`, `guide-extras`) |
| Public path literals in `app.routes.ts` | 46 |
| Prerender path literals in `app.routes.server.ts` | 24 + 4 param routes |
| Hand-written `SeoService.set({ path, alternates })` call sites | 26 |
| Translation keys in `i18n/es.ts` | 19 |

Ternaries per file at the baseline:

| File | Ternaries |
| --- | --- |
| `pages/home.ts` | 31 |
| `pages/open-marine.ts` | 35 |
| `pages/guides.ts` | 31 |
| `pages/experiences.ts` | 24 |
| `pages/transfers.ts` | 22 |
| `pages/services.ts` | 16 |
| `layout/header.ts` | 0 (but 13 `english` reads and 2 link arrays) |
| everything else in scope | 0 |

## 3. Classification

### A. Duplicate components

| Duplicate | Spanish source | English source |
| --- | --- | --- |
| Technology landing | `pages/open-marine.ts` | `pages/english.ts` (`PAGES.technology`) |
| Experiences | `pages/experiences.ts` | `pages/english.ts` (`PAGES.experiences`) |
| Boat delivery | `pages/transfers.ts` | `pages/english.ts` (`PAGES.delivery`) |
| Services | `pages/services.ts` | `pages/english.ts` (`PAGES.services`) |
| About | `pages/about.ts` | `pages/english.ts` (`PAGES.about`) |
| Contact | `pages/contact.ts` | `pages/contact-en.ts` |
| Legal (4 pages) | `pages/legal.ts` | `pages/legal-en.ts` |
| Module detail | `pages/product-detail.ts` | `pages/product-detail-en.ts` |
| Footer | `layout/footer.ts` | inline in `app.ts` |

`english.ts` is two duplications at once: a second presentation for the corporate pages
(cards instead of the Spanish prose/step layouts) *and* a second copy of their copy.

### B. Conditional translations in templates

159 `english ? … : …` expressions. `home.ts` (31), `open-marine.ts` (35) and `guides.ts`
(31) carry most of them, including `attr.aria-label`, `<option>` labels and SEO strings.

### C. Duplicate navigation definitions

`layout/header.ts` keeps `links` and `englishLinks` side by side, plus four ternaries for
the account/cart/contact targets and the switcher label. The footer repeats the same six
destinations in a third place, and `app.ts` a fourth.

### D. Duplicate content models

- `core/catalog.ts` (Spanish `Product` + `SERVICES`) and `core/catalog-en.ts` (English
  `name`/`description`/`features` keyed by slug) — identity, presentation and text mixed.
- `core/guides.ts`, `core/guides-en.ts` and `core/guide-extras.ts` — three files, two
  languages, keyed by the Spanish slug.
- `SERVICES` was exported from the catalogue but the English list was inlined in
  `pages/services.ts`, and a third copy lived in `english.ts`.
- The English cards in `english.ts` duplicated the English text already present in
  `experiences.ts`, `transfers.ts` and `services.ts`.

### E. Duplicate route declarations

`app.routes.ts` wrote every public path by hand (46 literals). For the English tree the
same components were mounted a second time under `en/…`, and 7 routes carried a
`data: { language: 'en' }` flag that only existed because the URL-derived locale was not
used by the pages.

### F. Duplicate metadata logic

26 call sites repeated `path: '/…'` plus a hand-written `alternates` array. Nothing tied
those strings to `LOCALIZED_ROUTES`, so a renamed slug would silently break canonicals.

### G. Necessary language-specific behaviour (kept)

- Legal wording is legally binding: it stays locale-specific and is only shared at the
  *presentation* level.
- Slugs are the entity identity in both languages (`/tecnologia/navegador` ↔
  `/en/technology/navegador`, `/guias/x` ↔ `/en/guides/x`). Translating them needs a
  redirect strategy and belongs outside M02.
- The contact API receives the translated topic label, not a code.
- Some English copy simply does not exist yet (module `specs`/`audience`/`tagline`, one
  services block). Those blocks stay untranslated instead of being invented in place.

## 4. Migration order chosen

1. Shared contract (`shared/models/localized.ts`) and dictionaries.
2. Content models: technology (identity + `es`/`en`), guides (identity + `es`/`en` +
   extras), page copy per feature.
3. Shell: brand, language switcher, header, footer, root component.
4. Feature pages, one commit per feature.
5. Routes derived from the registry (`app.routes.ts`, `app.routes.server.ts`).
6. Regression checks, then documentation.

Each step compiles and prerenders the same 96 routes before the next one starts.
