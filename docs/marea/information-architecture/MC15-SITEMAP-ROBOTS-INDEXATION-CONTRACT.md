# D09 — Sitemap, robots and indexation contract (MC-15)

| Field | Value |
|---|---|
| Deliverable | D09 `MC15-SITEMAP-ROBOTS-INDEXATION-CONTRACT.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Owner | `seo-migration` |
| Machine data | `data/indexation-policy.json` (`MAREA-MC15-INDEXATION-POLICY`) — **14 classes** |
| Base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Date | 2026-11-02 |
| Status | `INTERNAL_PLANNING_ONLY` |
| Indexation state | `INDEXATION_UNVERIFIED` |
| MC16_STARTED | `false` |

## 1. Boundary and evidence state

This contract states the **policy** for HTTP status, robots meta, `X-Robots-Tag`, canonical,
hreflang, sitemap membership, structured-data eligibility and publication gate per page class. It
changes no header, no meta tag, no sitemap entry and no `robots.txt` line.

**`INDEXATION_UNVERIFIED` applies to every URL.** There is no Search Console access in this
milestone, so:

- no URL may be described as `GOOGLE_INDEXED`;
- no indexation, impression or coverage count may be asserted;
- "indexable" means *permitted by policy*, never *present in an index*.

Evidence classes actually used: `REPOSITORY_VERIFIED` (code inspection) and
`LOCAL_SSR_VERIFIED` (isolated SSR run, disposable database, 2026-11-02). No `PUBLIC_OBSERVATION`
was performed.

## 2. The current sitemap generator

`src/server.ts` → `GET /sitemap.xml`:

| Source | Contribution | Notes |
|---|---|---|
| `prerenderedPaths` | walks `dist/browser` for `index.html` folders | one `<loc>` per prerendered route; no lastmod |
| static shop landings | `/tienda`, `/en/shop` | the shop is `RenderMode.Server`, so it is never prerendered and is added explicitly |
| active products | `/tienda/<slug>` for every `products.active = 1` row | `lastmod` from `updated_at` |
| translated products | `/en/shop/<slug>` only when `name_en`, `category_en`, `summary_en` and `description_en` are all non-empty | prevents an EN URL for untranslated content |
| `sitemapAlternates()` | `<xhtml:link rel="alternate">` pairs, derived from `matchRoute()`/`localizedUrl()` | a pair is emitted **only when both locale URLs are themselves in the sitemap** |
| `x-default` | appended for `home` only, pointing at `localizedUrl('home','es')` | one neutral entry point |

Deliberate exclusions: private routes (`cart`, `login`, `account`, `orderDetail`), the whole admin
area, `shopSample` pages (noindex by design) and everything that is not a page. The response is
cached `public, max-age=3600`.

## 3. Observed sitemap arithmetic (local observation, not a production expectation)

| Observation | Value |
|---|---|
| Prerendered route ids × locales | 12 × 2 = 24 |
| Technology details × locales | 6 × 2 = 12 |
| Guide details × locales | 30 × 2 = 60 |
| **Prerendered URLs** | **96** |
| Shop landing URLs | `/tienda`, `/en/shop` = **2** |
| URLs without fixtures (observed) | **98** |
| Seeded fixtures: 2 active products, 1 fully translated | 2 ES product URLs + 1 translated EN product URL = **3** |
| URLs with fixtures (observed) | **101** |
| `x-default` occurrences (observed) | 2, both pointing at `https://embarcarte.com/` |
| `<lastmod>` occurrences (observed) | 3 (the three product URLs) |
| Private, admin, sample, `/marea` occurrences (observed) | 0 |

**`101` is a test-fixture observation, never a hardcoded production expectation.** A production
sitemap differs with the real prerender output, the real catalogue and real translation state.
`scripts/check-seo.mjs` asserts `>= 100` URLs and the structural rules, not the literal number.

## 4. robots.txt today

`public/robots.txt` (static file, served as-is):

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://embarcarte.com/sitemap.xml
```

Policy consequences:

- **robots.txt blocking is never a substitute for `noindex`.** A disallowed URL can still be
  indexed from external links, and a disallowed page cannot be crawled to see its `noindex`. That is
  why the private and admin surfaces are *crawlable but `noindex`* (`meta` + `X-Robots-Tag`) instead
  of disallowed.
- `/api/` is a JSON surface: `robots.txt` is a crawl hint, not an access control. Authorisation is
  enforced server-side and is unaffected by this file.
- No candidate MAREA path is disallowed. Disallowing an unpublished path would advertise it and
  would break the future crawl of an authorised page.
- Any future `robots.txt` change is a public change and is **not authorised** in MC-15.

## 5. Indexation classes (14)

### 5.1 Surface, status and directives

| classId | Surfaces | HTTP status | robots meta | `X-Robots-Tag` | Canonical |
|---|---|---|---|---|---|
| `IDX-EXISTING-PUBLIC-CLEAN` | delivery, services, contact, guides, guideDetail (both locales) | 200 | `index, follow, max-image-preview:large` | none | self, absolute |
| `IDX-EXISTING-PUBLIC-WITH-FINDINGS` | home, technology, technologyDetail, experiences, about, shop (both locales) | 200 | `index, follow, max-image-preview:large` | none | self, absolute |
| `IDX-EXISTING-LEGAL-PAGES` | legalNotice, privacy, cookies, termsOfSale (both locales) | 200 | `index, follow, max-image-preview:large` | none | self, absolute |
| `IDX-MAREA-CONCEPT-INTERNAL-ONLY` | 9 family + 6 bundle identities in CONCEPT/DEFINED/INTERNAL_ONLY state | 404 | `noindex, follow` | none | none (no page) |
| `IDX-MAREA-PROPOSED-PAGES` | the 23 proposed route ids | 404 (today) | `noindex, follow` | none | `BLOCKED_NO_CANONICAL` |
| `IDX-PRIVATE-CLIENT-AREA` | cart, login, account, orderDetail (both locales) | 200 | `noindex, follow` | `noindex, nofollow` | none |
| `IDX-ADMIN-INTERNAL` | 7 admin route ids | 200 (CSR shell) | `noindex, follow` client-side; header is authoritative | `noindex, nofollow` | none |
| `IDX-DYNAMIC-SHOP-DETAIL` | shopDetail (both locales) | 200 active / 404 unknown | index when translated, `noindex, follow` otherwise | none | ES self; EN only when translated |
| `IDX-UNTRANSLATED-EN-SURFACE` | EN URL of an ES-only product | 200 | `noindex, follow` | none | none (proposed); self canonical observed |
| `IDX-SAMPLE-PRODUCTS` | shopSample (both locales) | 200 | `noindex, follow` | none | self observed; no policy asserted |
| `IDX-LEGACY-REDIRECTS` | `/open-marine`, `/productos`, `/productos/:slug` | 301 | not rendered | none | destination owns the canonical |
| `IDX-404-UNKNOWN` | unknown paths, every blocked `/marea` URL | 404 | `noindex, follow` | none | none |
| `IDX-API-ENDPOINTS` | `/api/*` | per endpoint | n/a (JSON) | none | n/a |
| `IDX-STATIC-UPLOADS-AND-ASSETS` | `/uploads/*`, hashed build assets | 200 | n/a | none | n/a |

### 5.2 Eligibility and gates

| classId | Hreflang | Sitemap-eligible | Structured data eligible | Publication gate |
|---|---|---|---|---|
| `IDX-EXISTING-PUBLIC-CLEAN` | reciprocal ES/EN + self | **yes** | yes (BreadcrumbList; Service on delivery; Article on guide detail) | `GATE-WEBSITE-REMEDIATION` |
| `IDX-EXISTING-PUBLIC-WITH-FINDINGS` | reciprocal ES/EN + self | **yes** | yes, restricted per D10 | `GATE-COMMERCIAL-CLAIMS` |
| `IDX-EXISTING-LEGAL-PAGES` | reciprocal ES/EN + self | **yes** | **no** (no JSON-LD today; adding any needs authorisation) | `GATE-LEGAL-ENTITY` |
| `IDX-MAREA-CONCEPT-INTERNAL-ONLY` | none | **no** | **no** | `GATE-MARKET-PLACEMENT` |
| `IDX-MAREA-PROPOSED-PAGES` | none until publication + indexation authorisation | **no** | **no** | `GATE-COMMERCIAL-CLAIMS` |
| `IDX-PRIVATE-CLIENT-AREA` | none | **no** | **no** | `GATE-PRIVACY-DPA-DPIA` |
| `IDX-ADMIN-INTERNAL` | none | **no** | **no** | `GATE-PRIVACY-DPA-DPIA` |
| `IDX-DYNAMIC-SHOP-DETAIL` | ES self + EN only when translated | **yes** (active products only) | yes: BreadcrumbList, Product, Offer (existing commerce, not modified) | `GATE-PRICING` |
| `IDX-UNTRANSLATED-EN-SURFACE` | none | **no** | **no** | `GATE-WEBSITE-REMEDIATION` |
| `IDX-SAMPLE-PRODUCTS` | none (by design) | **no** | **no** | `GATE-COMMERCIAL-CLAIMS` |
| `IDX-LEGACY-REDIRECTS` | destination owns them | **no** | **no** | `GATE-WEBSITE-REMEDIATION` |
| `IDX-404-UNKNOWN` | none | **no** | **no** | `GATE-WEBSITE-REMEDIATION` |
| `IDX-API-ENDPOINTS` | none | **no** | **no** | `GATE-PRIVACY-DPA-DPIA` |
| `IDX-STATIC-UPLOADS-AND-ASSETS` | none | **no** | **no** | `GATE-WEBSITE-REMEDIATION` |

**No proposed MAREA page is sitemap-eligible in MC-15.** Sitemap-eligible classes: 4
(`CLEAN`, `WITH-FINDINGS`, `LEGAL`, `DYNAMIC-SHOP-DETAIL`) — all pre-existing surfaces. Blocked
classes: 10.

### 5.3 Class notes

- `IDX-EXISTING-PUBLIC-WITH-FINDINGS`: indexability is **not removed by planning**. De-indexing a
  live page to hide an unresolved claim would be a live SEO change and would destroy the business
  while the finding is remediated. The finding is fixed on the page, not by hiding the page.
- `IDX-EXISTING-LEGAL-PAGES`: legal documents must stay crawlable so the mandatory disclosures are
  discoverable and verifiable. `noindex` here would hide the very documents the law requires.
- `IDX-DYNAMIC-SHOP-DETAIL`: the product URL appears in the sitemap only while the product is
  active; the EN URL appears only when the product is fully translated. Product *markup* is gated
  separately from page *publication* (D10 §7).
- `IDX-UNTRANSLATED-EN-SURFACE`: the current implementation answers `noindex` with a self canonical.
  The proposed policy is no canonical on a `noindex` page; the divergence is recorded in D08
  §6 (`D8-DIV-01`) and is not implemented in MC-15.
- `IDX-404-UNKNOWN`: a 404 stays a 404. No soft-404, no home swallow, no redirect to login.
- `IDX-MAREA-*`: the 23 proposed URLs are `PROPOSED_INTERNAL_NOT_DEPLOYABLE`. They are not
  published, not indexable, not sitemap-eligible and not purchasable; `/marea` and `/en/marea`
  answered `404` in the isolated run.

## 6. Coverage of the 34 MC-14 website findings

Every finding's affected surface is represented by an indexation class. No finding is closed, and no
finding changes a page class by decree; the class exists so future remediation knows which surface
it is touching.

| Findings | Affected URL(s) | Page identity | Class |
|---|---|---|---|
| WEB-001, WEB-002, WEB-005, WEB-025 | `/aviso-legal` | `legalNotice` | `IDX-EXISTING-LEGAL-PAGES` |
| WEB-007, WEB-008 | `/privacidad` | `privacy` | `IDX-EXISTING-LEGAL-PAGES` |
| WEB-024, WEB-028, WEB-030 | `/condiciones-de-venta` | `termsOfSale` | `IDX-EXISTING-LEGAL-PAGES` |
| WEB-003, WEB-015, WEB-029 | `/tecnologia` | `technology` | `IDX-EXISTING-PUBLIC-WITH-FINDINGS` |
| WEB-004 | `/tienda` | `shop` | `IDX-EXISTING-PUBLIC-WITH-FINDINGS` |
| WEB-026 | `/experiencias` | `experiences` | `IDX-EXISTING-PUBLIC-WITH-FINDINGS` |
| WEB-022 | `/sobre-nosotros` | `about` | `IDX-EXISTING-PUBLIC-WITH-FINDINGS` |
| WEB-016, WEB-021, WEB-033 | `/` and `/en` | `home` | `IDX-EXISTING-PUBLIC-WITH-FINDINGS` |
| WEB-006, WEB-019, WEB-034 | `/tecnologia/piloto-automatico` | `technologyDetail` | `IDX-EXISTING-PUBLIC-WITH-FINDINGS` |
| WEB-017 | `/tecnologia/navegador` | `technologyDetail` | `IDX-EXISTING-PUBLIC-WITH-FINDINGS` |
| WEB-018, WEB-020 | `/tecnologia/hub` | `technologyDetail` | `IDX-EXISTING-PUBLIC-WITH-FINDINGS` |
| WEB-013, WEB-014, WEB-027 | `/tienda/:slug` | `shopDetail` | `IDX-DYNAMIC-SHOP-DETAIL` |
| WEB-031 | `/tienda/muestra/:slug` | `shopSample` | `IDX-SAMPLE-PRODUCTS` |
| WEB-009, WEB-010 | `/acceso` | `login` | `IDX-PRIVATE-CLIENT-AREA` |
| WEB-011, WEB-023 | `/carrito` | `cart` | `IDX-PRIVATE-CLIENT-AREA` |
| WEB-012, WEB-032 | `/api/orders` | API (no page identity) | `IDX-API-ENDPOINTS` |

Coverage: **34 / 34 findings mapped** across 15 distinct page surfaces plus 1 API surface. None of the 34 findings
is closed, downgraded or marked remediated by this document.

## 7. Verification performed and its limits

| Check | Method | Result |
|---|---|---|
| 14 classes present, unique ids | dataset inspection | 14 unique |
| Mandatory fields per class | `httpStatus`, `robotsMeta`, `xRobotsTag`, `canonicalPolicy`, `hreflangPolicy`, `sitemapEligible`, `structuredDataEligible`, `publicationGate` present on all 14 | holds |
| 404 class uses HTTP 404 | dataset inspection | holds |
| No private/admin class is sitemap-eligible | dataset inspection | holds (4 eligible classes are all public pre-existing surfaces) |
| No MAREA class is sitemap-eligible | dataset inspection | holds (0 of 10 blocked classes) |
| Sitemap arithmetic | isolated SSR run with and without fixtures | 98 → 101 as recorded in §3 |
| Private/admin/sample/proposed absent from the sitemap | sitemap scan | holds |
| `x-default` count and target | sitemap scan | 2, both `https://embarcarte.com/` |
| 404 behaviour | direct probes | `/marea`, `/en/marea`, `/productos/does-not-exist` → 404 with noindex |

**What is not verified:** real indexation, crawl behaviour in production, Google's rendering of the
client-rendered private/admin surfaces, and any behaviour of an unpublished MAREA URL (there is
none to observe). `INDEXATION_UNVERIFIED` remains the honest state of the whole indexation model.
