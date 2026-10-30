# M03 — Commerce and international SEO audit

Baseline: `main` at `6580ce1` (M02 merged, PR #2). Everything below was measured on
that tree by reading every commerce file and the server, not inferred from the
M02 report.

## 1. How it was measured

- Read `src/app/{shop,account,admin,core}`, `src/app/pages/not-found.ts`, `src/app/app.routes*.ts`,
  `src/server.ts` and `src/server/*`.
- Counted the remaining `english ? … : …` expressions and every component that still
  reads `route.snapshot.data['language']`.
- Compared each Spanish component with its English counterpart in
  `shop/shop-en.ts` and `shop/commerce-en.ts`.
- Fetched the built SSR server to record the current canonical, `hreflang`, `lang`,
  sitemap and JSON-LD output before changing anything.

## 2. Baseline numbers

| Metric | Before M03 |
| --- | --- |
| Commerce components | 12 (`shop/` 6, `account/` 4, `admin/` 8 minus shared) |
| English-only duplicate commerce components | 6 (`ShopEn`, `ShopDetailEn`, `CartEn`, `LoginEn`, `AccountEn`, `OrderEn`) |
| Files holding an English duplicate | 2 (`shop/shop-en.ts`, `shop/commerce-en.ts`) with 715 lines combined |
| `english ? … : …` expressions left in the app | 9, all in `shop/sample-detail.ts` |
| Components reading `route.snapshot.data['language']` | 1 (`shop/sample-detail.ts`), fed by 1 route `data` flag |
| Translation keys available to commerce | 76 in `i18n/es.ts`, none for shop, cart, checkout, login, account or orders |
| Hardcoded Spanish strings in commerce templates | ~120 |
| `formatPrice` / `formatDate` | hardcoded `es-ES` for both locales |
| Hand-written SEO paths in commerce | 10 (`/tienda`, `/en/shop`, `/carrito`, `/en/cart`, `/acceso`, `/en/login`, `/cuenta`, `/en/account`, `/404`, plus per-product paths) |
| Public URLs *not* in `LOCALIZED_ROUTES` | `/cuenta/pedidos/:id`, `/en/account/orders/:id`, `/admin/**` |
| Prerendered public routes | 96 |
| Sitemap `<loc>` entries | 98 static + 1 per translated product |

## 3. Findings

### A. Duplicate commerce implementations

| Duplicate | Spanish source | English source | Notes |
| --- | --- | --- | --- |
| Product listing | `shop/shop-list.ts` | `shop/shop-en.ts` (`ShopEn`) | The English copy drops the availability badge, the add-to-cart button and the empty-state CTA; it links products with `<a>` instead of a stretched card link |
| Product detail | `shop/shop-detail.ts` | `commerce-en.ts` (`ShopDetailEn`) | English version has no quantity selector, no stock hint and a different price block |
| Cart | `shop/cart.ts` | `commerce-en.ts` (`CartEn`) | Divergent markup (no product thumbnails, no `<dl>` totals, `Remove` text instead of an icon); only this copy sends `language: 'en'` with the order |
| Login / registration | `account/login.ts` | `commerce-en.ts` (`LoginEn`) | Different validation message granularity |
| Account | `account/account.ts` | `commerce-en.ts` (`AccountEn`) | English copy drops the payment-method column and the success/error styling of profile messages |
| Order detail | `account/order-detail.ts` | `commerce-en.ts` (`OrderEn`) | English copy omits the order breadcrumb, the status badge and shows a different notice set |

`commerce-en.ts` is 27 kB of minified single-line templates: six components, one file,
no shared code with the Spanish versions. Every business change has to be made twice.

### B. Remaining language conditionals

`shop/sample-detail.ts` still reads the route `data` flag and branches 9 times. It is the
only component in the app outside the M01/M02 locale contract.

### C. Locale-independent formatting

`core/models.ts` formats money and dates with `es-ES` for both locales, so an English
page prints `40,00 €` and `3 oct 2026`. The value is right, the locale is not. The same
`euros()` helper is used in the English transaction email.

### D. Product data

- The database already stores `name_en`, `category_en`, `summary_en`, `description_en`
  (`PUBLIC_PRODUCT` in `src/server/api.ts`, editable in `admin-product-edit.ts`).
- Forgetting a translation is *not* a compile error: an empty `name_en` is a valid value.
  Product identity (`id`, `slug`, price, stock, image) is already language-independent and
  must stay that way.
- `POST /api/orders` already accepts `language` and stores the localized line-item name;
  `createCheckoutSession()` already forwards `locale` to Stripe Checkout. The Spanish cart
  simply never sends the field.
- `SAMPLE_PRODUCTS` (`core/sample-products.ts`) holds `name`/`nameEn` pairs and a
  `searchSamples(query, english)` boolean.

### E. Missing English copy (blocking real bilingual pages)

- `features/technology/content/technology.en.ts`: `tagline`, `specs` and `audience` are
  absent for all **6** modules, so the English detail page renders fewer blocks than the
  Spanish one (no spec table at all).
- `features/services/content/services.content.ts`: the English list publishes **3** of the
  **4** Spanish blocks (`Integración de electrónica` is missing).

### F. International SEO defects

| # | Defect | Where |
| --- | --- | --- |
| 1 | `ShopList` hardcodes `path: '/tienda'` and a hand-written alternate pair on both the initial and the post-fetch `seo.set()` | `shop/shop-list.ts` |
| 2 | `ShopDetail` hardcodes `/tienda/${slug}` and builds the alternate conditionally by hand; the English duplicate hardcodes `/en/shop/${slug}` | `shop/shop-detail.ts`, `commerce-en.ts` |
| 3 | `SampleDetail` hardcodes both paths and emits **both** alternates on a `noindex` sample page | `shop/sample-detail.ts` |
| 4 | Cart, login and account emit `path` values that are not derived from the registry, and `AccountEn`/`OrderEn` both canonicalize to `/en/account` — two different pages, one canonical | `shop/cart.ts`, `account/*` |
| 5 | The 404 page canonicalizes to `https://embarcarte.com/404`, a URL that does not exist; it is a false canonical for every unknown URL | `pages/not-found.ts` |
| 6 | Sitemap has no `xhtml:link` alternates, so the two language versions are not related for search engines | `src/server.ts` |
| 7 | Sitemap loc list is derived from the files on disk, which is correct, but the product pairing rule is duplicated by hand and cannot express reciprocity | `src/server.ts` |
| 8 | `ItemList` JSON-LD on the shop list names products from `p.name` even on `/en/shop` | `shop/shop-list.ts` |
| 9 | No `x-default` anywhere | — |
| 10 | `/cuenta/pedidos/:id` ↔ `/en/account/orders/:id` is missing from `LOCALIZED_ROUTES`, so `alternateUrl()` returns `null` and the language switcher on an order drops the visitor on the other home page | `core/i18n/locale-routes.ts` |
| 11 | The not-found page is Spanish-only and still lives in `src/app/pages/` | `pages/not-found.ts` |

Verified-good and must not regress: exactly one canonical per prerendered page, `<html lang>`
per locale, reciprocal `hreflang` on the 96 prerendered routes, `Product`/`SoftwareApplication`
/`Article`/`BreadcrumbList` JSON-LD with localized breadcrumb names, `noindex` on cart,
login, account and admin, and 301s for the three legacy paths.

### G. Authentication and checkout

- `authGuard` already redirects to `/acceso` or `/en/login` based on the URL prefix and
  keeps `volver` — correct in both locales.
- `adminGuard` redirects a signed-in non-admin to `/cuenta` regardless of locale; that is a
  Spanish-only destination, but `/admin` exists only in Spanish, so it is consistent.
- Order access is enforced server-side (`user_id` or `role === 'admin'`), not by the client.
- Stripe signature verification, timestamp tolerance, the CSRF origin check, the
  `pendiente → pagado` transition guarded by `stripe_session_id`, stock decrement inside a
  transaction and the compensating stock restore on cancellation are all in the server and
  must not be touched.
- Duplicate webhooks are naturally idempotent: the `UPDATE` only applies to `status = 'pendiente'`.

### H. Administration

`/admin` is Spanish-only, has no English route, and no business requirement for one has been
recorded. Localizing it would need a locale preference that is *not* derived from the URL,
which reintroduces a second source of truth that M01 deliberately removed. Decision taken in
M03: **keep `/admin` Spanish and scope it explicitly**, per the milestone brief; the public
Spanish/English commerce experience takes precedence.

## 4. Risks

| Risk | Mitigation |
| --- | --- |
| Changing formatting could look like changing amounts | Format only; the integer `price_cents` and every calculation stay untouched, and a test asserts both locales show the same amount |
| Product URL changes would break indexed pages | Slugs are untouched; the registry keeps `tienda/:slug` ↔ `en/shop/:slug` |
| Emitting `hreflang` to an untranslated English product would be a soft-404 signal | Alternates stay conditional on the four translated fields; the English page of an untranslated product is `noindex` |
| Cart state loss on language switch | Cart is a single root signal keyed by slug and already survives navigation; the test switches locale with a populated cart |
| Moving files breaks lazy route imports | The move is mechanical and the build resolves every `import()`; prerender + server render of the shop covers it |
| Adding an `orderDetail` route id could shadow `cuenta` | `matchRoute` prefers literal segments and segment count must match exactly |

## 5. Required tests

Product catalogue (both locale names, identity, price, stock, missing translation, detail
links), cart (add, remove, quantity, language switch with items, totals, stock), auth (login,
guards, locale change, account persistence, order ownership, unauthorized access), checkout
(payload integrity, server price authority, payment status, webhook verification, bank
transfer), SEO (canonical, reciprocal `hreflang`, `lang`, sitemap integrity and alternates,
localized structured data, localized 404, `noindex`, missing translations) and SSR (no
hydration mismatch, no request locale contamination, first-render content, status codes,
availability rendering).

## 6. Migration order

1. Locale infrastructure: `orderDetail` route id, `intlLocale`, locale-aware formatting,
   `SeoService` canonical/`x-default` support.
2. Dictionaries.
3. File moves into `features/` + `shared/ui/`; delete the two English duplicate files.
4. Product list and detail.
5. Cart and checkout.
6. Login, account and order detail.
7. Not-found.
8. SEO and sitemap.
9. Tests, review, documentation.
