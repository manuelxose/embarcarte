# M04 — International SEO audit

Scope: the public, indexable Spanish/English surface after M03, plus the private/noindex
boundary. Executed against the built SSR server and a temporary database, not against
production and not against Search Console.

## 1. Result

**PASS for the tested surface.** `npm run test:seo` fetched every sitemap URL, parsed every
JSON-LD block, and checked canonical, `lang`, robots and reciprocal `hreflang`. With two
seeded products (one fully translated, one Spanish-only), the sitemap contained **101 URLs**:
98 static (96 prerendered + `/tienda` + `/en/shop`) plus 2 Spanish product URLs plus 1
translated English product URL.

No canonical, hreflang, sitemap, structured-data or indexing defect remained open.

## 2. E1 — URL and canonical integrity

- Exactly one `<link rel="canonical">` on every indexable page; it equals the sitemap
  `<loc>` byte-for-byte.
- Canonical language is the language of the document; no cross-language canonical.
- `/en/...` pages canonicalise to themselves, never to the Spanish page.
- No redirect, 404 or query-string URL is listed in the sitemap.
- No duplicate canonical identity: each URL is unique.
- Legacy 301s (`/open-marine`, `/productos`, `/productos/:slug`) remain redirects and are not
  sitemap entries.
- Unknown URLs return a real 404 with no canonical and `noindex`.

## 3. E2 — Hreflang integrity

- Spanish and English public equivalents declare reciprocal `es`/`en` links.
- Every `hreflang` target in the sitemap is itself a sitemap `<loc>` and answers 200.
- Every HTML page carries the same pair as its sitemap entry.
- `x-default` is emitted only on the two home entries and points at the Spanish home (`/`);
  it is not added to interior pages.
- A translated product declares both languages. A product missing **any** of
  `name_en`, `category_en`, `summary_en`, `description_en` is not an English equivalent:
  the Spanish URL indexes itself with a self `es` alternate, the English URL is `noindex`
  and publishes no alternate, and only the Spanish URL is sitemapped.
- Samples, cart, login, account, order detail and `/admin` publish no alternates because
  they are `noindex` or private.
- No alternate points at a redirect or a page that is not served.

## 4. E3 — Sitemap

| Property | Result |
| --- | --- |
| XML declaration and `urlset` namespace | Present |
| `xmlns:xhtml` for alternates | Present |
| Absolute URLs | Yes, `https://embarcarte.com/...` |
| Deterministic order | Sorted by path on every request |
| Duplicate `<loc>` | None |
| Query strings / fragments | None |
| Private routes | None |
| Inactive products | Excluded |
| Spanish-only product | Spanish URL only |
| Translated product | Both URLs |
| `lastmod` | Product entries use `products.updated_at` (date only); static entries omit it |
| `x-default` | Exactly two, on the home entries |
| Cache | `public, max-age=3600` |
| Content type | `application/xml` |

The sitemap is generated from the same route registry as the pages, and an alternate is
emitted only when both counterpart URLs are in the published set. It cannot point at a URL
that is not served.

## 5. E4 — Structured data

The emitted types remain `Organization`, `WebSite`, `BreadcrumbList`, `Product`, `Offer`,
`ItemList`, `SoftwareApplication`, `Article` and, where the page publishes a service,
`Service`.

- Every block parses as JSON; no fabricated ratings, reviews, certifications or prices.
- Product `name`, `description`, `category`, `sku`, `image` and `offers` use the page
  language and the authoritative database values.
- `Offer.price` is the server price (`"19.99"` in the SEO fixture), `priceCurrency` is
  `EUR`, availability reflects stock (`InStock` / `OutOfStock`).
- `BreadcrumbList` starts at the home page of the current locale.
- `ItemList` names products in the page language.
- No aggregate rating or review property is invented.

## 6. E5 — Indexing behaviour

| Surface | Behaviour |
| --- | --- |
| 96 prerendered public routes | 200, indexable, canonical, reciprocal alternates |
| `/tienda`, `/en/shop` and active product pages | SSR from SQLite, indexable per the translation gate |
| Spanish-only product | `/tienda/:slug` indexable; `/en/shop/:slug` `noindex` |
| Samples | `noindex`, no canonical to `/404`, no alternates |
| Cart, login, account, order detail | CSR shell `noindex` at HTTP level (`X-Robots-Tag`) before hydration |
| `/admin` | CSR shell `noindex`; Spanish only |
| Unknown URL | Real 404, `noindex`, no canonical |
| Legacy URLs | 301 to the current route, not indexed |
| Redirect targets | 200 and self-canonical |

The initial HTML of private pages now declares the URL locale (`lang="en"` under `/en`) and
is no longer a Spanish, indexable shell. It remains an empty CSR shell until hydration.

## 7. E6 — Slug migration decision

**Recommendation: keep the current language-independent slugs. Do not migrate in M04.**

Reasons:

1. The current model gives every entity one identity (`slug`) and two presentations. It
   cannot produce a broken alternate by construction.
2. Every English detail URL (30 guides, 6 technology modules, product/sample patterns) is
   already published and paired. Renaming them creates 404s and splits signals unless a
   redirect map, sitemap transition and crawl are handled in one release.
3. The expected benefit (keyword-bearing English slugs) is unquantified. No Search Console
   export or ranking baseline was available in this milestone.
4. The migration plan already documents the required 301 map, one-crawl-cycle sitemap
   overlap and reciprocal-target assertions. That is a separate, reviewable project with a
   rollback plan, not a hardening change.

If a future business case appears, execute
[I18N-SLUG-MIGRATION-PLAN.md](../architecture/I18N-SLUG-MIGRATION-PLAN.md) in full, including
the "no redirect chains" and "every alternate is 200" tests.

## 8. Limitations

- No production crawl, Search Console coverage, ranking, click or Core Web Vitals field data
  was available. This is a code/build audit, not a search-performance report.
- No analytics/consent review was performed.
- The sitemap count depends on active products; the 101 figure is the fixture, not a
  production count.
- Legal copy sign-off is outside engineering.

## 9. Evidence

```bash
npm run build
npm run test:seo
npm run test:i18n
npm run test:commerce
```

Final output: `SEO checks passed: 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD
and private noindex.`
