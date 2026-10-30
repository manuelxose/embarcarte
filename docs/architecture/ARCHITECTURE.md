# Architecture

Companion to [BASELINE_AUDIT.md](./BASELINE_AUDIT.md). This document records the target
shape of the Angular app and the decisions taken in M01.

## 1. Target structure

```
src/app/
├── core/
│   ├── i18n/            locale.types.ts, locale.config.ts, locale-routes.ts,
│   │                    locale.service.ts, translation.service.ts   ← M01
│   ├── seo/             seo.service.ts                              ← move in Prompt 2
│   ├── auth/            auth.service.ts, guards.ts                  ← move in Prompt 3
│   └── http/            api-origin.interceptor.ts                   ← move in Prompt 3
├── shared/              ui components, models, utilities            ← Prompt 2
├── layout/              header, footer, brand, language-switcher    ← Prompt 2
├── features/            home, technology, experiences, delivery,
│                        services, guides, shop, account, admin, legal ← Prompt 2/3
└── i18n/                es.ts, en.ts, dictionary.ts                 ← M01
```

This is a destination, not a mandate to move every file now. M01 introduced `core/i18n/`
and `i18n/`; M02 moved the bilingual presentation into `features/` and `shared/`, deleted
the four English-only duplicate components and the duplicate footer, and rewrote
`app.routes.ts` / `app.routes.server.ts` on top of the registry. `core/seo.service.ts`,
`core/auth.service.ts` and `core/http` were **not** moved: they have no duplicated
presentation and moving them would only enlarge the M02 diff. The commerce screens
(`shop/`, `account/`, `admin/`) stay where they are until M03.

## 2. Locale contract

- Supported locales: `es` (default) and `en`, declared as a `const` tuple and derived into
  the `Locale` union, so an unsupported value cannot be typed.
- **The locale is a function of the URL.** `localeFromUrl()` maps `/…` to `es` and `/en/…`
  to `en`. There is no second source of truth, no cookie and no browser storage.
  Consequences: SSR and hydration always agree; a locale store cannot leak between
  concurrent SSR requests; the language of a shared link is never wrong.
- Spanish URLs stay unprefixed. `/es` is not introduced and no existing URL moves.

## 3. Services

| Service | Responsibility | SSR safety |
| --- | --- | --- |
| `LocaleService` | Active locale (`computed` signal), localized URL building, switch target, `<html lang>` sync | Initial URL comes from `REQUEST` (server) or `document.location` (browser); the injector is per request |
| `TranslationService` | `t(key, params)` against the active locale | Dictionaries are bundled modules, no HTTP, no `window` |

Both are `providedIn: 'root'`; no provider needs to be registered in `app.config.ts`.
`LocaleService` subscribes to `Router` `NavigationEnd` and updates one signal, so
`t()` and `locale()` are reactive inside templates without extra glue.

`TranslationService.t()` re-renders on locale change because it reads the locale signal.
Missing keys return the key itself and log a warning in development (`isDevMode()`);
in production the key is shown rather than an empty string.

## 4. Translation approach — evaluated options

| Option | Verdict |
| --- | --- |
| `@angular/localize` (`$localize`, ICU) | Compile-time. Requires one build per locale (`angular.json` i18n config), and switches locales by redirecting to a separate app. Incompatible with a single deployment serving both languages on the current URLs. Rejected. |
| `ngx-translate` | Runtime JSON loading. Adds a dependency, an HTTP request per locale, and an SSR loading race. Rejected: the site has two locales and a fixed UI vocabulary. |
| Hand-written typed dictionaries + `translate()` | ~40 lines, fully typed, tree-shaken, SSR-safe, no dependency. **Chosen.** |

Dictionaries are split by intent: `src/app/i18n/es.ts` and `en.ts` hold shared interface
strings (navigation, chrome, accessibility, common actions, generic errors). `en` is typed
as `Record<keyof typeof es, string>`, so forgetting a key is a compile error. Editorial and
product copy stays in its content modules and moves in Prompt 2.

## 5. Localized route registry

`LOCALIZED_ROUTES` maps a semantic `RouteId` to its `es` and `en` path, with `:slug`
placeholders for entities whose identifier is language-independent.

```ts
localizedUrl('technology', 'en');                       // '/en/technology'
localizedUrl('technologyDetail', 'es', { slug: 'hub' }); // '/tecnologia/hub'
matchRoute('/en/shop/sample/anemometro');                // { id: 'shopSample', locale: 'en', … }
alternateUrl('/en/technology?ref=mail#top', 'es');       // '/tecnologia?ref=mail#top'
alternateUrl('/admin', 'en');                            // null — no localized counterpart
```

Rules encoded here:

- Literal segments are matched before parameterised ones, so `/tienda/muestra/x` never
  resolves as `/tienda/:slug`.
- `alternateUrl()` returns `null` for pages with no counterpart (admin, account, legacy
  redirects). Callers decide; nothing is silently redirected to a home page.
- Query string and fragment survive a locale switch.

The registry is the single source for public URLs. Since M02, `app.routes.ts` and
`app.routes.server.ts` derive every public path from it (`path('technologyDetail', 'en')`),
and the prerender parameter lists come from the content models, so a published slug is
declared once. Pages never build a URL by hand: they call `LocaleService.url(id, params)`,
and SEO metadata goes through `pageSeo()`, which computes the canonical path, the locale
and the `hreflang` pair from the same registry.

## 6. Feature boundaries

- `core/*` may be imported by anything; `core/*` imports only `core/*` and `i18n/*`.
- `layout/*` and `features/*` must not import each other.
- `i18n/*` imports only `core/i18n/locale.types.ts` — no Angular import, so dictionaries
  are testable without a framework and cannot drag the component runtime into tests.
- No circular imports were introduced: `core/i18n` depends on nothing in `app/`.

## 7. SEO behaviour

`SeoService` keeps its contract and its output. The hardcoded `'es'`/`'en_GB'`/`es_ES`
values moved to `LOCALE_INFO`, producing byte-identical metadata. As a safety net,
`LocaleService` also sets `<html lang>` from the URL, which fixes server-rendered English
pages that never called `SeoService` (`/en/shop`, `/en/cart`, `/en/login`, `/en/account`).

## 8. Testing strategy

`npm run test:i18n` (`scripts/check-i18n.mjs`, `node:assert`, same shape as the existing
commerce check):

- locale detection table, including absolute request URLs;
- route round-trip for every id and locale, existing slugs, query/fragment preservation and
  the `null` counterpart cases;
- dictionary parity (keys and `{placeholders}`), interpolation and missing-key behaviour;
- server-rendered markup when `dist/` exists: `lang` per locale, `hreflang` alternates, and
  concurrent English/Spanish renders that must not contaminate each other.

No test framework was added. The pure i18n modules are compiled to a temporary folder with
the already-installed `typescript`, so assertions run against the real sources.
