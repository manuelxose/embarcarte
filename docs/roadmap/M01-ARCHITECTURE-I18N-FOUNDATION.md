# M01 — Architecture and i18n foundation

Milestone: **Prompt 1 of 4**. Branch `feature/i18n-architecture-foundation`, based on `main`
at `2304b43`.

## 1. Executive summary

The repository had no internationalization layer. Two fully duplicated route trees and
~117 inline `english ? … : …` template expressions carried the bilingual content, and every
one of the 26 `SeoService.set()` call sites repeated its public path by hand.

M01 adds a small, dependency-free foundation: a typed locale contract derived from the URL,
a centralized route registry, typed Spanish/English interface dictionaries, and two
services (`LocaleService`, `TranslationService`). Page copy, commerce screens and admin
screens were **not** migrated — that is Prompt 2/3 work.

Beyond the plumbing, one visible improvement shipped: the language switcher now takes the
visitor to the same page in the other language (including detail slugs, query string and
fragment) instead of always pointing at the home page.

Status: **PASS** for the M01 scope (see §14), with the limitations listed in §11.

## 2. Original architecture findings

Summarized here; the full inventory is in
[docs/architecture/BASELINE_AUDIT.md](../architecture/BASELINE_AUDIT.md).

- Locale was sniffed from `router.url` in the root component and passed down as a boolean.
- Bilingual content lived in template ternaries (8 page components) and duplicated content
  modules (`catalog`/`catalog-en`, `guides`/`guides-en`, `guide-extras`).
- The header kept two parallel link arrays; the Spanish footer lived in `layout/footer.ts`
  and the English footer was inlined in the root component template.
- Public URLs were written twice: in `app.routes.ts` and again as strings in each page's
  `SeoService.set()` call. Nothing linked the two.
- Server-rendered English pages that never called `SeoService` (`/en/shop`, `/en/cart`,
  `/en/login`, `/en/account`) emitted `<html lang="es">`.
- No locale service, no translation layer, no test framework, no `test` target.

## 3. Changes implemented

1. **Locale contract** (`core/i18n/locale.types.ts`) — `Locale` union, `isLocale`,
   `otherLocale`, and `localeFromUrl` (handles router URLs and absolute request URLs).
2. **Locale metadata** (`core/i18n/locale.config.ts`) — `htmlLang`, `ogLocale` and
   `switchLabel` per locale, replacing hardcoded literals in `SeoService`.
3. **Localized route registry** (`core/i18n/locale-routes.ts`) — 20 semantic route ids,
   `localizedUrl`, `matchRoute` (reverse matching with parameters) and `alternateUrl`
   (locale alternates that preserve slug, query and fragment, and return `null` when a page
   has no counterpart).
4. **`LocaleService`** — active locale as a `computed` signal, seeded from `REQUEST` during
   SSR and from `NavigationEnd` in the browser, plus localized URL helpers and `<html lang>`
   synchronisation.
5. **`TranslationService` + dictionaries** — `src/app/i18n/{es,en,dictionary}.ts`; typed
   keys, `{placeholder}` interpolation, Spanish fallback, key-as-last-resort and a
   development warning for missing keys.
6. **Minimal integration** — root shell uses the services; the header no longer receives an
   `english` input but derives it from `LocaleService`; the language switcher uses
   `alternateUrl`.
7. **Tests** — `npm run test:i18n` (`scripts/check-i18n.mjs`).

## 4. Files created

| File | Purpose |
| --- | --- |
| `src/app/core/i18n/locale.types.ts` | Locale union, validation, URL detection |
| `src/app/core/i18n/locale.config.ts` | `htmlLang`, `ogLocale`, switcher labels |
| `src/app/core/i18n/locale-routes.ts` | Localized route registry and alternates |
| `src/app/core/i18n/locale.service.ts` | Signal locale, request-aware init, URL helpers |
| `src/app/core/i18n/translation.service.ts` | `t(key, params)` bound to the active locale |
| `src/app/i18n/es.ts` | Spanish shared UI dictionary |
| `src/app/i18n/en.ts` | English shared UI dictionary (typed as complete) |
| `src/app/i18n/dictionary.ts` | Lookup, interpolation, fallback |
| `scripts/check-i18n.mjs` | i18n + server-rendering checks |
| `docs/architecture/BASELINE_AUDIT.md` | Phase A audit |
| `docs/architecture/ARCHITECTURE.md` | Target architecture and decisions |
| `docs/roadmap/M01-ARCHITECTURE-I18N-FOUNDATION.md` | This report |

## 5. Files modified

| File | Change |
| --- | --- |
| `src/app/app.ts` | Locale from `LocaleService` instead of `router.url`; skip link via `t()`; no `english` input on the header |
| `src/app/layout/header.ts` | `english` becomes a computed signal; language switcher uses `alternateUrl` + localized label |
| `src/app/core/seo.service.ts` | `Locale` type instead of `'es' \| 'en'`; metadata values come from `LOCALE_INFO` |
| `package.json` | `test:i18n` script |

No route, component template body, style, API, database or server file was changed.

## 6. Architectural decisions

Full rationale in [ARCHITECTURE.md](../architecture/ARCHITECTURE.md). In short:

- **Locale derived from the URL**, not from state: SSR/hydration agree by construction and
  concurrent requests cannot contaminate each other.
- **No i18n dependency.** `@angular/localize` is compile-time and would require one build
  per locale plus URL changes; `ngx-translate` adds a dependency and a runtime fetch for a
  two-locale, fixed-vocabulary UI. Typed in-memory dictionaries do the job in ~40 lines.
- **Route registry as the single source of public URLs**, without refactoring
  `app.routes.ts` in this milestone (that is Prompt 2).
- **No providers added to `app.config.ts`**: both services are `providedIn: 'root'` and
  derive everything from `Router` and `REQUEST`.

## 7. Tests executed and results

All commands were executed on this machine (Windows, Node 24.18.0, npm 12.0.1) on the
branch, after a clean `npm run build`.

| Command | Result |
| --- | --- |
| `npm run build` | PASS — 96 prerendered routes, browser + server bundles generated |
| `npm run test:i18n` | PASS — locale detection, route mapping, translations, server rendering |
| `npm run test:commerce` | PASS — translations, stock, duplicate items, payment validation, order access |

`npm ci` was not re-run: `package.json` and `package-lock.json` dependencies are unchanged
(no dependency was added or removed); the local `node_modules` already matched the lockfile
and both builds/tests used it.

What `test:i18n` asserts:

- `/` and `/tecnologia` → `es`; `/en` and `/en/technology` → `en`; `/admin` → `es`;
  `/english` → `es` (only a whole segment marks a locale); absolute request URLs work.
- every route id round-trips through `localizedUrl` → `matchRoute` in both locales, keeping
  its slug; existing public paths (`/tecnologia/navegador`, `/tienda/muestra/anemometro`,
  `/en/legal-notice`, `/condiciones-de-venta`, `/en/guides/:slug`) are unchanged.
- Spanish ↔ English alternates preserve query and fragment; `/admin`, `/cuenta/pedidos/7`,
  `/open-marine`, `/productos/:slug` and unknown paths return `null` instead of a home URL.
- both dictionaries have the same keys and the same `{placeholders}`; interpolation works;
  an unknown key returns the key; a missing parameter keeps the placeholder.

## 8. SSR verification results

Verified against the freshly built server (`dist/embarcarte/server/server.mjs`, temp SQLite
database, random port):

- `/en/technology` and `/en` → `<html lang="en">`; `/` and `/tecnologia` →
  `<html lang="es">`, with `hreflang="es"`/`hreflang="en"` alternates preserved.
- `/en/technology` renders the English footer and `/tecnologia` does not — proof that the
  locale is known during the first server render (from `REQUEST`, not from the router).
- Five interleaved pairs of `/en/shop` (server-rendered per request) and `/tienda` each
  return their own locale and footer, so no locale state crosses requests.
- Prerendered output inspected directly: `/en/technology` → `lang="en"`, `/tecnologia` →
  `lang="es"`, and the switcher links `/en/technology` → `/tecnologia`,
  `/tecnologia/navegador` → `/en/technology/navegador`, `/contacto` → `/en/contact`,
  `/guias` → `/en/guides`.

No browser-only global is touched during SSR. The only browser API in the locale path is
`document.location.pathname`, used as a fallback and never on the server (where `REQUEST`
is present).

## 9. SEO regression risks

| Risk | Status |
| --- | --- |
| Canonical / `og:url` paths change | None — `SeoService` still receives the same `path` strings; no page was edited |
| `hreflang` values change | None — `es`/`en` produced from `LOCALE_INFO`, identical to the previous literals |
| `og:locale` changes | None — `es_ES` / `en_GB`, identical to the previous values |
| `<html lang>` changes on Spanish pages | None — `es` before and after |
| `<html lang>` changes on English pages | Intended fix: `/en/shop`, `/en/cart`, `/en/login`, `/en/account` now declare `en` instead of `es` |
| Prerendered route list changes | None — `app.routes.server.ts` untouched (96 routes before and after) |
| Sitemap changes | None — `src/server.ts` untouched |
| Redirects (`/open-marine`, `/productos/**`) | None — `app.routes.ts` untouched |

## 10. Independent review findings

Reviewed the diff read-only against the M01 rules (types, SSR isolation, route mapping,
missing translations, complexity, dependencies, regressions).

| # | Severity | Finding | Resolution |
| --- | --- | --- | --- |
| 1 | Medium | `localeFromUrl` initially failed on absolute request URLs (`https://host/en/x` would resolve to `es`), which is exactly what `REQUEST.url` provides during SSR | Fixed — scheme/authority stripped before segment parsing; covered by a test |
| 2 | Low | `TranslationService` exposed an unused `locale` alias | Removed |
| 3 | Low | `SITE.locale` is now unused in `seo.service.ts` | Left in place: it is pre-existing site configuration, not part of this change |

No critical or high findings remain. Unresolved: none.

## 11. Unresolved issues / known limitations

1. **Page copy is still bilingual in templates.** ~117 `english` ternaries and the
   duplicated content modules remain. Prompt 2 owns that migration; the dictionaries and
   `t()` are ready for it.
2. **`app.routes.ts` does not use the route registry yet.** The registry matches and
   generates the current URLs exactly, but the route definitions are still hand-written, so
   a future slug change must be applied in both places until Prompt 2.
3. **The footer stays split** (Spanish component + inline English markup in `app.ts`).
4. **Pages without a localized counterpart** (admin, account, legacy redirects) still send
   the language switcher to the other locale's home page — the previous behaviour, now
   explicit in `alternateUrl()` returning `null`.
5. **`src/app/core/seo/` and `src/app/features/` do not exist yet**; the file tree is
   deliberately unchanged apart from the two new i18n folders.
6. **No component-level test harness.** M01 tests the pure i18n modules plus real SSR
   output; wiring `@angular/build:unit-test` (Vitest) is left to the milestone that first
   needs to assert component rendering.

## 12. Commits

| SHA | Message |
| --- | --- |
| `b27906c` | `feat(i18n): add typed locale and translation foundation` |
| `ad9534a` | `docs(i18n): record the repository audit and target architecture` |
| `c8251a6` | `docs(i18n): add the M01 milestone report` |

Branch: `feature/i18n-architecture-foundation` (not merged into `main`, not deployed).

## 13. Pull request

<https://github.com/manuelxose/embarcarte/pull/1>

## 14. Final milestone status

**PASS** for M01, against the Definition of Done:

| Criterion | Evidence |
| --- | --- |
| Repository audit documented | `docs/architecture/BASELINE_AUDIT.md` |
| Target architecture documented | `docs/architecture/ARCHITECTURE.md` |
| Typed locale definitions | `locale.types.ts`, `locale.config.ts` |
| `LocaleService` implemented and integrated | `locale.service.ts`, used by root shell, header, tests |
| `TranslationService` implemented and tested | `translation.service.ts`, dictionary tests |
| Spanish and English shared dictionaries | `src/app/i18n/es.ts`, `en.ts` |
| Centralized localized route mapping | `locale-routes.ts` + tests |
| SSR locale behaviour correct | §8 |
| Existing Spanish and English URLs unchanged | route test table, prerendered route count unchanged |
| Commerce and administration preserved | `test:commerce` PASS; no commerce/admin file touched |
| Production build passes | §7 |
| New i18n tests pass | §7 |
| No unresolved critical/high review findings | §10 |
| Committed to the feature branch | §12 |
| PR opened with evidence | <https://github.com/manuelxose/embarcarte/pull/1> |

No criterion is left unverified.

## 15. Prerequisites for Prompt 2

1. Keep the locale contract untouched: Spanish stays unprefixed, `en` stays the only
   prefixed locale, and the locale keeps being derived from the URL.
2. Migrate page templates to `t()` **and add keys to `es.ts` first** — `en.ts` fails to
   compile until the English string exists.
3. Move `core/seo.service.ts` to `core/seo/`, `catalog*`/`guides*` into `features/*`, and
   the shell components into `layout/*` without changing their selectors or templates'
   rendered output.
4. Route definitions can now be generated from `LOCALIZED_ROUTES`; keep every existing path
   byte-identical and keep `app.routes.server.ts` and the sitemap in sync.
5. Reuse `alternateUrl()` for `hreflang`/canonical generation instead of hand-written
   `alternates` arrays.
6. Run `npm run build && npm run test:i18n && npm run test:commerce` before and after each
   migration step; `test:i18n` already guards the route table and both locales' markup.
