# M03 — Multilingual commerce, customer experience and international SEO

Milestone: **Prompt 3 of 4**. Branch `feature/i18n-commerce-seo`, based on `main` at
`6580ce1` (M01 and M02 were already merged; the stacked base is therefore `main`).
Status: **PASS** — see §21.

---

## 1. Executive summary

Commerce was the last area still bilingual by duplication: six English-only components in
`shop/shop-en.ts` and `shop/commerce-en.ts` (27 kB of one-line templates) mirrored the
Spanish ones, nine `english ? … : …` expressions remained in the sample detail page, and
every commerce page wrote its own canonical path and `hreflang` pair by hand.

M03 removes the duplication instead of translating it. There is now **one component per
commerce page**, driven by the M01 locale services; the two English files and their six
components are deleted. Product copy has a single localization rule with an explicit
missing-translation policy; SEO is derived from the route registry rather than written per
page; the sitemap describes the bilingual relationship for search engines.

The public experience — catalogue, product detail, cart, checkout entry, login, account,
orders and 404 — is Spanish and English from the same code, on the same URLs, with the same
prices, stock and order state machine.

## 2. Verified M02 baseline

| Item | Value |
| --- | --- |
| `main` head before M03 | `6580ce1` (Merge PR #2) |
| M01 | merged (PR #1, `cbab0e7`) |
| M02 | merged (PR #2, `6580ce1`) |
| `npm run build` | Prerendered 96 static routes |
| `npm run test:i18n` | PASS |
| `npm run test:commerce` | PASS |
| `feature/*` remote branches | deleted after merge; `main` is the correct M03 base |

The M03 branch was created from `main`; no previous milestone was merged or re-merged
silently.

## 3. Commerce audit findings

Full inventory: [M03-COMMERCE-AUDIT.md](../architecture/M03-COMMERCE-AUDIT.md).

Measured on `6580ce1`, before any edit:

| Finding | Before |
| --- | --- |
| English-only duplicate commerce components | 6 (`ShopEn`, `ShopDetailEn`, `CartEn`, `LoginEn`, `AccountEn`, `OrderEn`) |
| Remaining `english ? …` expressions | 9, all in `shop/sample-detail.ts` |
| Components reading `route.snapshot.data['language']` | 1 (same file) |
| Commerce UI strings available in the dictionary | 0 of 76 keys |
| Hand-written canonical paths / alternate pairs in commerce | 10 call sites |
| Money and date formatting | hardcoded `es-ES` for both locales |
| English product detail JSON-LD | absent (`ld=0` on `/en/shop/*`) |
| Sitemap `xhtml:link` alternates | none |
| `x-default` | none |
| `/cuenta/pedidos/:id` ⇄ `/en/account/orders/:id` in the registry | absent, so the switcher dropped the order |
| 404 page | Spanish only, canonical to a non-existent `/404`, still in `src/app/pages/` |

Behaviour that the audit confirmed correct and that M03 did not touch: server-authoritative
pricing and stock, the order state machine, Stripe signature verification, bank transfer
flow, session cookies, guards, CSRF origin check and the three legacy 301s.

## 4. Architecture changes

- `core/i18n/locale-routes.ts` gains `orderDetail` (`cuenta/pedidos/:id` ⇄
  `en/account/orders/:id`), so protected localised routes round-trip. URLs did not change;
  they were simply added to the single registry that already described them.
- `core/i18n/locale.config.ts` gains `intlLocale` (`es-ES` / `en-GB`), used by the money and
  date formatters.
- `core/models.ts` now owns `formatPrice(cents, locale)`, `formatDate(date, locale)`,
  `CartItem` and `cartItemName(item, locale)` — the presentation helpers are pure and
  testable without Angular.
- `core/seo.service.ts`: `path` became optional (a document with no address of its own, i.e.
  the 404, publishes no canonical and no `og:url` instead of a false one) and `xDefault`
  was added. `pageSeo()` emits `x-default` for the home page only.
- `core/i18n/locale.service.ts`: `switchUrl()` now returns the path only and the switcher
  carries the query string and fragment through the router. A string `routerLink`
  percent-encodes `?…` into the path, which is how `/cuenta/pedidos/1?nuevo=1` became
  `/cuenta/pedidos/1%3Fnuevo%3D1` — a defect found by driving the real flow in a browser.
- New pure module `features/shop/product-text.ts`: the single rule for missing English
  product copy.
- New `features/account/payment-label.ts`: the payment method label, translated from the
  stored identifier.
- Component tree moved to the target shape of [ARCHITECTURE.md](./ARCHITECTURE.md) §1:
  `features/{shop,account,admin,not-found}`, and the two UI primitives (`ProductImage`,
  `StatusBadge`) into `shared/ui/`, which also removes the feature→feature imports the
  admin screens used to have.

## 5. Duplicated components removed

| Removed | Replaced by |
| --- | --- |
| `shop/shop-en.ts` (`ShopEn`, 24 lines, minified) | `features/shop/shop-list.ts` |
| `shop/commerce-en.ts` → `ShopDetailEn` | `features/shop/shop-detail.ts` |
| `shop/commerce-en.ts` → `CartEn` | `features/shop/cart.ts` |
| `shop/commerce-en.ts` → `LoginEn` | `features/account/login.ts` |
| `shop/commerce-en.ts` → `AccountEn` | `features/account/account.ts` |
| `shop/commerce-en.ts` → `OrderEn` | `features/account/order-detail.ts` |
| `pages/not-found.ts` (Spanish only) | `features/not-found/not-found.ts` |

| Metric | Before | After |
| --- | --- | --- |
| Commerce components | 12 | 7 |
| English-only duplicates | 6 | **0** |
| `english ? …` expressions (whole app) | 9 | **0** |
| `data['language']` readers | 1 | **0** |
| `data: { language }` route flags | 1 | **0** |
| Hand-written canonical/alternate pairs in commerce | 10 | **0** |
| Files with duplicated commerce presentation | 2 (`shop-en.ts`, `commerce-en.ts`) | **0** |
| Spanish literals in public commerce templates | ~120 | **0** |

The browser bundle confirms the deletion: the 21.27 kB `commerce-en` lazy chunk is gone;
the commerce chunks are now `cart` 7.94 kB, `account` 7.41 kB, `shop-detail` 6.39 kB and
`shop-list` 5.81 kB (raw). Initial transfer total: 132.70 kB.

## 6. Translation coverage

| Metric | Before | After |
| --- | --- | --- |
| Dictionary keys (`i18n/es.ts`) | 76 | **223** |
| Dictionary keys (`i18n/en.ts`) | 76 | **223** (1:1, compile-enforced) |
| Commerce UI keys | 0 | 143 |
| Technology modules with `tagline` + `specs` + `audience` in English | 0 of 6 | **6 of 6** |
| Services blocks published in English | 3 of 4 | **4 of 4** |
| Placeholder mismatches | 0 | **0** (asserted) |
| Keys missing in either locale | 0 | **0** (type + test enforced) |

Keys added by area: shop 19, shop detail 13, sample 2, cart 32, auth 15, account 30, order
18, status 5, payment 2, not-found 7, common 4.

Translation quality: `technology.en.ts` is a faithful rendering of the Spanish source — the
same six modules, the same number of spec rows per module, the same feature counts, no
capability added. Marine terminology was kept exactly as the Spanish publishes it
(Signal K, NMEA 0183/2000, AIS, CPA/TCPA, MBTiles, GeoTIFF, KAP, S-57, Raspberry Pi Pico 2,
Cytron MD30C R2, RTL-SDR). Nothing was invented: no new certification, delivery promise,
price, stock figure or legal claim.

## 7. Product data localization strategy

- Identity (`id`, `slug`, price, stock, image) is language-independent. The English URL of a
  product is the same entity, not a second product.
- Copy comes from the four published database fields `name_en`, `category_en`, `summary_en`,
  `description_en`. `productText(product, locale)` falls back **per field**, so a product
  translated only partially still reads naturally.
- A product counts as *translated* only when **all four** fields exist. That single boolean
  drives every downstream decision, and the sitemap uses the same four-field gate:
  - translated → both URLs indexable, reciprocal `hreflang`, listed in the sitemap;
  - untranslated → the Spanish URL is indexable and names only itself as an alternate; the
    English URL renders the Spanish copy marked `lang="es"`, canonicalises to itself and is
    `noindex`; the sitemap lists only the Spanish URL.
- The `lang="es"` marker sits on the product-derived nodes only (name, category, summary,
  description), never on the surrounding interface, so a screen reader hears English
  controls and Spanish content.
- No automatic translation is performed anywhere.

## 8. Cart and checkout regression evidence

- One cart component and one `CartService`; there is no second store.
- State survives the language switch: the basket is keyed by slug and stores both names, so
  an item added in Spanish shows its English name after switching (verified in the browser).
  Totals, quantities and identifiers are untouched by the switch.
- Baskets saved before M03 (no `name_en`) still render.
- The order payload now carries `language`, which the server already supported: it stores
  the localized line-item name, sends the localized customer email and forwards the locale
  to Stripe Checkout (`locale: 'es' | 'en'`).
- Prices, stock, totals, availability and state transitions remain server-authoritative:
  the client sends `slug`/`qty`/`price_cents`, and a mismatched or lowered price is rejected
  with `price_changed` (asserted for both an inflated and a deflated price).
- Bank transfer: the order stays `pendiente`, stock is reserved, cancelling restores it.
- Card payment stays disabled without a Stripe key; no live payment service is called from
  any automated test.

## 9. Authentication/security verification

| Property | Evidence |
| --- | --- |
| Login/registration endpoints unchanged | `src/server/api.ts` diff is mail-formatting only |
| Session cookies unchanged | `createSession`/`destroySession` untouched |
| Guard redirects stay in the locale | `authGuard` → `/acceso` or `/en/login` with `volver` |
| Language change does not log out | order page switched EN→ES with the session intact (browser) |
| Order ownership enforced | another customer receives `404` for a foreign order (asserted) |
| Unauthenticated order access | `401` for list and detail (asserted) |
| Customer cannot read the admin API | `403` (asserted), admin `200` |
| Account updates persist in the session | `PUT /api/account` then `/api/auth/me` (asserted) |
| Stripe webhook signature | unsigned → `400`, forged → `400`, stale timestamp → `400` |
| Payment confirmation stays server-side | a validly signed event with a non-matching `session_id` leaves the order `pendiente` (asserted) |

## 10. Administration localization decision

**`/admin` stays Spanish-only.** Recorded here as the milestone requires, and not claimed as
bilingual.

Reasons:
1. No business requirement for an English back office has been recorded.
2. Making it bilingual would need a locale preference that is *not* derived from the URL.
   That reintroduces exactly the second source of truth M01 removed, with the associated
   SSR/hydration risk, for an audience of internal users.
3. The brief states the public Spanish/English commerce experience takes precedence, and
   that keeping administration in Spanish is acceptable when documented.

What did change for administration: it now lives in `features/admin/`, uses the shared
`StatusBadge` and `ProductImage` (so status labels resolve through the dictionary and render
Spanish at `/admin`, where the URL-derived locale is `es`), and it inherits the new locale-
aware formatter defaults without a call-site change.

## 11. SEO before / after findings

| # | Before | After |
| --- | --- | --- |
| 1 | Shop list hardcoded `/tienda` + hand-written alternate pair, on both the initial and post-fetch `seo.set()` | `pageSeo('shop', locale)` from the registry |
| 2 | Shop detail hardcoded `/tienda/${slug}`; the English duplicate hardcoded `/en/shop/${slug}` | `pageSeo('shopDetail', locale, { params })` |
| 3 | Sample detail hardcoded both paths and emitted a `hreflang` pair on a `noindex` page | path from the registry, `noindex`, no alternates |
| 4 | Cart/login/account/order emitted hand-written paths; `AccountEn` and `OrderEn` shared one canonical | path from the registry, `noindex`, no alternates |
| 5 | 404 canonicalised to `https://embarcarte.com/404` | no canonical, no `og:url`, `noindex`, real 404 |
| 6 | English shop pages emitted no `Product`/`ItemList` JSON-LD | structured data on both locales, with localized names |
| 7 | `ItemList` named products from `p.name` on `/en/shop` | localized names |
| 8 | No `x-default` | `x-default` on the home page only (HTML + sitemap) |
| 9 | Order-page language switch lost the order | `/cuenta/pedidos/7` ⇄ `/en/account/orders/7` |
| 10 | Untranslated products were listed and linked in English | Spanish indexable, English `noindex`, no alternate, not in the sitemap |

Measured on the built SSR server (isolated test database):

| Page | canonical | `hreflang` | robots |
| --- | --- | --- | --- |
| `/tienda` | `/tienda` | es + en | index |
| `/en/shop` | `/en/shop` | es + en | index |
| `/tienda/<translated>` | itself | es + en | index |
| `/en/shop/<translated>` | itself | es + en | index |
| `/tienda/<untranslated>` | itself | es (self) | index |
| `/en/shop/<untranslated>` | itself | none | noindex |
| `/tienda/muestra/<slug>` | itself | none | noindex |
| `/` | `/` | es + en + **x-default** | index |
| `/no-existe`, `/en/no-existe` | none | none | noindex, 404 |

## 12. Sitemap verification results

- 98 static `<loc>` entries (96 prerendered + `/tienda` + `/en/shop`) plus one per active
  product and one per fully translated product; deterministic, sorted by path.
- `xmlns:xhtml` declared; every bilingual page carries self + counterpart `xhtml:link`s,
  emitted only when **both** URLs are in the sitemap, so an alternate can never point at a
  page that is not served (asserted: every `hreflang` target is itself a `<loc>`).
- `x-default` appears exactly twice, on the two home entries.
- Never listed: cart, login, account, order pages, `/admin/**`, sample pages, unknown URLs,
  inactive products, and the English URL of an untranslated product (asserted).
- `lastmod` from `products.updated_at` for product entries only.

## 13. Structured data verification

`Organization`, `WebSite`, `BreadcrumbList`, `Product`, `Offer`, `SoftwareApplication` and
`Article` remain the only types emitted. On commerce pages:

- `ItemList` names each product in the language of the page (asserted for both locales).
- `Product` carries the localized `name`, `description`, `category`, the authoritative
  `price` (`"price":"20.00"`), `priceCurrency: EUR`, `availability` derived from stock, and
  the seller. Identity (`sku`) is the slug, which is language-independent.
- No property was added without real data.

## 14. SSR verification

- 96 prerendered routes unchanged; `<html lang>` correct on all of them.
- Shop list and product detail are server-rendered from the database: the HTML contains the
  product name and its JSON-LD (verified by requesting the built server, not by trusting the
  component).
- Locale isolation: `LocaleService` seeds from `REQUEST.url` in a per-request injector; the
  suite renders `/` and `/en/shop` five times concurrently and asserts neither leaks into the
  other.
- Every SEO `effect()` reads only signals; required route inputs are read in `ngOnInit`, not
  in field initializers (the Angular compiler rejects the latter, which is how a mistake here
  would be caught at build time).
- No hydration mismatch introduced: the locale is still a pure function of the URL, and the
  404 page removes the canonical client-side exactly as it does on the server.

## 15. Tests executed

```
npm ci                 → 0 vulnerabilities (4 install scripts blocked by policy, as in M02;
                         the esbuild platform package is a dependency, build unaffected)
npm run build          → Prerendered 96 static routes. Application bundle generation complete.
npm run test:i18n      → PASS
npm run test:commerce  → PASS
```

`npm ci` was run after the work was complete (the lockfile is unchanged — M03 adds no
dependency) and followed by a full rebuild and both suites, so the result above is from a
clean tree.

`test:i18n` now also covers: `orderDetail` round-trip in both locales, the protected-route
alternate, product-copy fallback per field (including the `category_en` gate), locale-aware
money and dates with equal amounts, basket naming for old and new baskets, status/payment
labels, sample catalogue search per locale, technology and services content parity,
`x-default` presence on the home and absence elsewhere, the localized 404 (no canonical, no
alternate, `noindex`, own copy), a commerce source audit (no `english ?`, no language flags,
every public commerce component reads the locale services) and the 96-route crawl.

`test:commerce` now also covers: bilingual catalogue rendering with no cross-language leak,
identical identity/price/stock across locales, localized money, localized `ItemList` and
`Product`, canonical and reciprocal `hreflang` per page, the untranslated-product rules,
`lang="es"` on fallback copy only, sitemap integrity and reciprocity, the price-tampering
and duplicate-item rejections, order ownership, account persistence, admin authorization
and Stripe webhook verification (unsigned, forged, stale, mismatched session).

Both suites run against the real built server with a temporary database. No live payment
service is contacted.

Manual browser verification of the flows the suites cannot drive (client-rendered screens):
`/tienda` → add to basket → `/en/cart` shows the English name and `€` formatting → register
→ `/en/account` → checkout → `/en/account/orders/1?nuevo=1` → switch to Spanish → the
session survives, the order id survives and the page is fully Spanish.

## 16. Independent review findings

Read-only review of `6580ce1..f5c7196` by an independent reviewer (separate context), who
also re-ran both suites and probed a live build. Priorities: financial correctness, payment
integrity, auth/authz, customer data, SSR, indexing safety, translation quality,
maintainability, accessibility, performance.

| # | Severity | Finding | Resolution |
| --- | --- | --- | --- |
| 1 | Low | The translation gate ignored `category_en`, so a product missing only that field was indexed, `hreflang`-paired and sitemapped in English while showing a Spanish category. | `category_en` added to the gate **and** to the sitemap filter (they must agree); asserted in both suites. |
| 2 | Low | `lang="es"` wrapped the whole product column, so English interface labels (VAT, quantity buttons, add-to-basket) were announced as Spanish. | The marker now sits on the product-derived nodes only, on the detail page and in the catalogue cards; asserted. |

No Critical, High or Medium findings. The reviewer explicitly verified and found clean:
financial and payment behaviour (server diff is mail-only), stock and state transitions,
Stripe signature and tolerance, ownership and admin authorization, the commerce helpers for
`NULL`/empty English columns, canonical/hreflang/sitemap consistency on a live build,
per-request locale isolation, import direction after the move, and translation fidelity of
`technology.en.ts` and `services.content.ts` against the Spanish source.

Both findings were fixed in `f7cb186` and the full gate was re-run afterwards.

The reviewer also noted one pre-existing item, outside this milestone's scope:
`/carrito`, `/en/cart` and `/en/account…` are `RenderMode.Client`, so their initial HTML is
the generic shell with `<html lang="es">` until hydration. It predates M03
(`app.routes.server.ts` is untouched) and is listed in §17.

## 17. Known limitations

1. **Administration is Spanish-only** by decision (§10).
2. **Client-rendered private pages** (cart, login, account, order) ship the generic shell
   first, so their initial `lang` attribute is `es` even under `/en`. All of them are
   `noindex`, and the locale is corrected on hydration. They were `Client` before M03;
   making them server-rendered would require the session to be resolved during SSR.
3. **Translated order line names are frozen at purchase time.** An order placed in Spanish
   keeps Spanish product names when the customer switches language later. That is
   deliberate: order lines are financial/audit data.
4. **Sample catalogue** keeps per-field Spanish/English pairs in `core/sample-products.ts`
   rather than `LocalizedContent`, because the same records feed the route `CanMatch` guard.
   Both locales are complete and asserted.
5. **Slugs are untranslated** (§18 of the plan doc).

## 18. Remaining M04 scope

M04 is the last milestone and was not started. Expected remaining work, in the order the
repository now suggests:

1. Production readiness: deploy pipeline, environment configuration, real monitoring, and
   verification of behaviour against production data (M03 evidence is local).
2. Decide on the translated-slug migration using
   [I18N-SLUG-MIGRATION-PLAN.md](../architecture/I18N-SLUG-MIGRATION-PLAN.md).
3. Localize `/admin` **only if** a business requirement appears, using the documented
   scoped-preference approach — not the URL locale.
4. Move `core/{auth.service,seo.service,api-origin.interceptor}` into the target folders if
   desired; they have no duplicated presentation, which is why M02 and M03 left them.
5. Optional: server-render the private pages to fix limitation 2, once session-on-SSR is
   designed.
6. Analytics/consent review, performance budget in CI, and legal copy sign-off.

## 19. Commits

| Commit | Contents |
| --- | --- |
| `f5c7196` | feat(m03): unify the bilingual commerce experience and harden international SEO |
| `f7cb186` | fix(m03): close the three review findings on translated product pages |
| _(this commit)_ | docs(m03): audit, slug-migration plan and delivery report |

## 20. Pull request

| Item | Value |
| --- | --- |
| PR | https://github.com/manuelxose/embarcarte/pull/3 |
| Head | `feature/i18n-commerce-seo` |
| Base | `main` (M01 + M02 already merged) |
| Deployed | no |
| Merged | no |
| CI | the repository has no CI pipeline; the gate in §15 is the contract |

## 21. Final status

**PASS** for the M03 scope.

| Acceptance criterion | Status |
| --- | --- |
| M01/M02 architecture intact | ✅ registry, locale service, translation service and dictionaries extended, not replaced |
| Product listing genuinely bilingual | ✅ one component, both locales asserted |
| Product detail presentation consolidated | ✅ `commerce-en.ts` deleted |
| Customer-facing product data correctly localized | ✅ per-field fallback with an explicit rule |
| Technology module copy complete in English | ✅ 6/6 modules, tagline + specs + audience |
| Services content parity | ✅ 4/4 blocks in both locales |
| Cart uses one shared implementation | ✅ `CartEn` deleted |
| Cart state persists across language changes | ✅ verified in the browser |
| Authentication pages use shared components | ✅ `LoginEn` deleted |
| Customer account pages use shared components | ✅ `AccountEn`/`OrderEn` deleted |
| Protected localized routes remain secure | ✅ guards unchanged, ownership asserted, order id preserved |
| Checkout behaviour preserved | ✅ server-authoritative; only `language` added, which the server already supported |
| Transaction feedback localized | ✅ items, notices, emails, Stripe locale |
| Administration localization completed or scoped | ✅ scoped, with justification (§10) |
| Not-found page localized | ✅ `features/not-found/`, 404 status, `noindex`, no false canonical |
| Canonical URLs correct | ✅ derived from the registry, asserted per page |
| `hreflang` pairs reciprocal | ✅ HTML and sitemap |
| Sitemap contains only appropriate URLs | ✅ asserted |
| Structured data valid | ✅ localized, no invented properties |
| SSR correct | ✅ 96 routes, per-request isolation, data-driven shop pages |
| Existing slugs unchanged | ✅ none moved |
| Payment and database behaviour preserved | ✅ server diff is mail-formatting only |
| Existing redirects unchanged | ✅ three legacy 301s asserted |
| Build passes | ✅ |
| i18n tests pass | ✅ |
| Commerce tests pass | ✅ |
| New critical-flow tests pass | ✅ cart payload, auth, ownership, webhook, SEO, sitemap |
| Independent review: no unresolved Critical/High | ✅ two Low findings, both fixed |
| Git changes committed | ✅ |
| Stacked PR opened | ✅ #3 against `main` |
| No production deployment | ✅ |

