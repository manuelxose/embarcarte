# D08 — Canonical and hreflang policy (MC-15)

| Field | Value |
|---|---|
| Deliverable | D08 `MC15-CANONICAL-HREFLANG-POLICY.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Owner | `seo-migration` |
| Machine data | `data/canonical-hreflang.json` (`MAREA-MC15-CANONICAL-HREFLANG`) — **88 items** |
| Base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Date | 2026-11-02 |
| Status | `INTERNAL_PLANNING_ONLY` |
| Live SEO change | `NOT_AUTHORIZED` |
| MC16_STARTED | `false` |

## 1. Single source of truth

The canonical/hreflang architecture is **not** re-invented here. There is exactly one registry and
one derivation function:

| Layer | File | Role |
|---|---|---|
| URL registry | `src/app/core/i18n/locale-routes.ts` (`LOCALIZED_ROUTES`, `localizedUrl`, `matchRoute`, `alternateUrl`) | the only list of public URLs and their locale twins |
| Derivation | `src/app/core/seo.service.ts` → `pageSeo(id, locale, data)` | builds `path`, absolute canonical, the alternate list for every locale and the home-only `x-default` from the registry |
| Emission | `SeoService.set()` | writes `<link rel="canonical">`, `<link rel="alternate" hreflang>`, robots, Open Graph, JSON-LD |
| Verification | `scripts/check-seo.mjs` | asserts reciprocity, sitemap agreement and private-page exclusion against a real SSR run |

`data/canonical-hreflang.json` records the **policy per `pageId` × locale**; it does not become a
second registry and no page may read it. Any future implementation must keep deriving canonical and
hreflang from `LOCALIZED_ROUTES` + `pageSeo()`.

## 2. Current implementation, as observed

### 2.1 Code-level behaviour

| Behaviour | Where | Consequence |
|---|---|---|
| `pageSeo()` always sets an absolute self canonical from the registry | `seo.service.ts` | a page cannot disagree with its own URL |
| `pageSeo()` declares an alternate for **every** locale unconditionally | `seo.service.ts` | reciprocity is structural; the caller must remove alternates it cannot honour |
| `x-default` is emitted only for `id === 'home'` and points at the Spanish home | `seo.service.ts` | one language-neutral entry point |
| `path: undefined` removes the canonical and `og:url` | `seo.service.ts` (`setCanonical`) | the 404 page has no canonical |
| `shopDetail` ES keeps only the `es` alternate when the product has no English text; the EN URL becomes `noindex` with `alternates: []` | `shop-detail.ts` | an ES-only product never advertises an EN twin |
| `shopSample` overrides `noindex: true` and `alternates: []` while keeping the derived self canonical | `sample-detail.ts` | a sample page is noindex with a self canonical and no hreflang at all |
| Private pages call `seo.set()` with a registry `path`, `noindex: true` and no alternates | `cart.ts`, `login.ts`, `account.ts`, `order-detail.ts` | no alternates; the served shell carries no canonical at all |
| Admin sets a hard-coded `path: '/admin'` with `noindex: true` | `admin-layout.ts` | a canonical appears client-side on an internal page |

### 2.2 Output observed on an isolated SSR run (2026-11-02)

| URL | Status | robots meta | canonical | hreflang |
|---|---|---|---|---|
| `/` | 200 | `index, follow, max-image-preview:large` | `https://embarcarte.com/` | `es` → `/`, `en` → `/en`, `x-default` → `/` |
| `/en` | 200 | index | `https://embarcarte.com/en` | `es` → `/`, `en` → `/en`, `x-default` → `/` |
| `/aviso-legal` | 200 | index | self | `es`, `en` (reciprocal) |
| `/tienda/<translated>` | 200 | index | self | `es`, `en` |
| `/en/shop/<translated>` | 200 | index | self | `es`, `en` |
| `/tienda/<es-only>` | 200 | index | self | `es` only — no EN alternate invented |
| `/en/shop/<es-only>` | 200 | `noindex, follow` | self (observed) | **none** |
| `/tienda/muestra/<slug>` | 200 | `noindex, follow` | self (observed) | **none** |
| `/admin` | 200 | none in the shell | none in the shell | none; `X-Robots-Tag: noindex, nofollow` |
| `/marea`, `/en/marea` | 404 | `noindex, follow` | none | none |

## 3. Proposed policy by page class

| Page class | Pages | Canonical | Hreflang | `x-default` | Indexable |
|---|---|---|---|---|---|
| Language-neutral entry | `home` | self, absolute | reciprocal `es`/`en`, self-referencing | ES home only | yes |
| Public static and index pages | `technology`, `experiences`, `delivery`, `services`, `about`, `contact`, `guides`, `shop` | self, absolute | reciprocal `es`/`en` | no | yes |
| Static detail (same slug both locales) | `technologyDetail`, `guideDetail` | self, absolute | alternate to the twin of the **same entity** | no | yes |
| Dynamic commerce detail | `shopDetail` | ES self; EN self **only when the product has complete EN text** | ES→EN only for a translated product; never an EN alternate for an ES-only product | no | ES yes; EN conditional |
| Sample/example commerce | `shopSample` | self canonical observed; no policy asserted for a noindex page | **none** (no alternates at all) | no | no |
| Legal | `legalNotice`, `privacy`, `cookies`, `termsOfSale` | self, absolute | reciprocal `es`/`en` | no | yes |
| Private client area | `cart`, `login`, `account`, `orderDetail` | **none** | **none** | no | no |
| Administration | 7 admin route ids | **none** | **none** | no | no |
| 404 | unknown paths | **none** | **none** | no | no |
| Proposed MAREA / professional pages | 23 proposed route ids | `BLOCKED_NO_CANONICAL` | none until publication **and** indexation authorisation | no | no |

## 4. Dataset composition (88 items = 44 `pageId` × 2 locales)

| Group | Items | `canonicalPolicy` values |
|---|---|---|
| Existing reciprocal pages (15 page ids) | 30 | `SELF` |
| `shopDetail` | 2 | ES `SELF`; EN `SELF_CONDITIONAL_ON_TRANSLATION` |
| `shopSample` | 2 | `SELF_OBSERVED_ON_NOINDEX` |
| Private pages (4 page ids) | 8 | `NONE_PRIVATE` |
| Proposed pages (23 page ids) | 46 | `BLOCKED_NO_CANONICAL` |
| **Total** | **88** | |

| Hreflang groups | Value |
|---|---|
| Groups declared | 15 (`HG-home` … `HG-termsOfSale`) |
| Group members | 30 items, both locales, self-referencing, absolute |
| Pages with **no** group | `shopDetail` (conditional per product), `shopSample` (no alternates by design), 4 private pages, 23 proposed pages |
| Items declaring `x-default` | 1 (`home`/`es`). The served `/en` document also emits the same `x-default` link, which is why the sitemap shows two `x-default` entries pointing at `https://embarcarte.com/`; the dataset keeps a single neutral owner to avoid two competing declarations. |
| Alternates pointing at an untranslated or missing page | 0 |
| Cross-entity alternates | 0 |

## 5. Invariants asserted

| Invariant | Method | Result |
|---|---|---|
| Self-referencing canonical on every indexable page | compare `canonicalUrlPattern` with `LOCALIZED_ROUTES[id][locale]` | holds for all 30 reciprocal + 1 ES `shopDetail` rows |
| Absolute URLs | every `canonicalUrlPattern` starts with `https://embarcarte.com` | holds for all 88 |
| Reciprocity | each group contains both locales and each member references the other | 15 groups, all reciprocal |
| Self-reference inside each group | each member's alternate list contains the other locale | holds |
| No alternate to a missing or untranslated page | compare against route registry; `shopDetail` EN alternates removed | holds; `shopDetail` declares no alternates in either direction until the product is translated |
| No cross-entity alternates | group membership is one `pageId` per group | holds (15 groups, 1 entity each) |
| `x-default` only on the home and only to the ES home | dataset scan | holds |
| Private pages declare nothing | dataset scan | holds (`NONE_PRIVATE`, no alternates, no group) |
| Proposed pages declare nothing | dataset scan | holds (`BLOCKED_NO_CANONICAL`, no alternates, no group) |
| No second registry introduced | dataset is consumed by nobody; `pageSeo()` unchanged | holds |

## 6. Current implementation vs proposed policy — recorded divergences

These are **policy** statements. None of them is implemented in MC-15; each would be a live SEO
change requiring authorisation.

| ID | Current implementation | Proposed policy | Consequence today | Decision |
|---|---|---|---|---|
| D8-DIV-01 | An untranslated EN product page keeps a self canonical while answering `noindex` (observed) | a `noindex` page declares **no** canonical, unless the canonical is needed to consolidate a duplicate | harmless but contradictory: a canonical on a noindex page sends mixed signals | deferred to MC-16; requires authorisation and a SEO-gate run |
| D8-DIV-02 | Private pages call `seo.set()` with a registry path, so a client-side render can add a self canonical; the SSR/CSR shell carries none | private pages declare no canonical and no hreflang in any rendering mode | the served response is clean; a JS render could add a canonical to a `noindex` page | deferred to MC-16 |
| D8-DIV-03 | Admin sets a hard-coded canonical `/admin` (not registry-derived) with `noindex` | internal surfaces declare no canonical and no hreflang | inert while `noindex` + `X-Robots-Tag` hold, but the value is not registry-derived | deferred to MC-16 |
| D8-DIV-04 | `pageSeo()` advertises every locale and callers must remove the alternates they cannot honour (`shopDetail`, `shopSample`) | alternates should be filtered at derivation time from the entity's real translation state | correct today because two callers handle it explicitly; a new page could forget | design note for any future page type, no change now |

None of these divergences is a defect introduced by MC-15, and none is fixed here.

## 7. Rules for any future page

1. Derive canonical and alternates from `LOCALIZED_ROUTES` + `pageSeo()`; never hand-write a URL.
2. A page may not declare an alternate to a URL that is not published, not translated or not
   sitemapped.
3. `x-default` remains exclusive to the home and continues to point at the Spanish home.
4. A proposed MAREA page starts with `BLOCKED_NO_CANONICAL` and no group. The group is created only
   when both locales are published with the same entity identity and indexation is authorised.
5. A MAREA page may never inherit the canonical, alternate or entity identity of an EMBARCARTE
   page: entity identity is per `entityId`, and family/bundle identities are distinct from the
   existing technology entities.
6. An ES-only entity never gets an invented EN alternate; the EN URL either does not exist or is
   `noindex` with no alternates.
7. Private and admin surfaces declare nothing and are never canonicalised to a public page.
