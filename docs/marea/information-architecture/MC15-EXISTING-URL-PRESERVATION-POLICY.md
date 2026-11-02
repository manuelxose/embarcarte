# MC-15 D03 — Existing URL preservation policy

| Field | Value |
|---|---|
| Deliverable | D03 `MC15-EXISTING-URL-PRESERVATION-POLICY.md` |
| Milestone | MC-15/36 — Bilingual information architecture, URL/SEO registry and migration plan |
| Date | 2026-11-02 |
| Owner | route-architect |
| Frozen source commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Baseline inventory | D02 `MC15-CURRENT-URL-AND-ROUTE-INVENTORY.md` (21 public route ids, 7 admin ids, 141 URL records) |
| Machine data | `data/current-urls.json` (`migrationDisposition`, `preservationReason`) |
| Status | `INTERNAL_PLANNING_ONLY` — `readOnly: true`, `publicationAuthorized: false` |
| Migration proposed in MC-15 | **none** |
| Redirects added in MC-15 | **none** |
| Live change authorised | **none** |

This policy binds every later MC-15 deliverable (redirect map, canonical/hreflang registry,
indexation policy, internal link graph, publication gates) and any future MC-16 or MC-17 execution
step. It exists because the cheapest way to damage an established site is to move a URL that other
people already link to.

## 1. Scope and authority

**Applies to:** every URL catalogued in D02 — the 21 public localized routes, the 7 admin child
patterns, the 3 active legacy redirects, the shop-detail database pattern, the 10 `noindex` sample
slugs and the wildcard 404 surface.

**Authority chain (highest first):**

1. `AGENTS.md` architecture rule: respect public indexed URLs and the `LOCALIZED_ROUTES` registry;
   every new route must justify collisions and canonical/hreflang.
2. `docs/marea/WEBSITE-AND-ROADMAP.md` §2: "Do not delete them or redirect indexed pages
   wholesale."
3. MC-03 brand audit §7.2–§7.4 and §8: no indexed URL may be removed; migration must be additive
   until a redirect map is live; redirects must survive a full re-crawl cycle.
4. MC-14 handoff §5 and §7: canonical/hreflang reciprocity preserved; no MAREA in titles before
   clearance; no public claim authorised.
5. This policy (MC-15), which turns the above into enumerated, checkable dispositions.

Where two sources disagree, the stricter one governs. MC-15 adds restrictions; it removes none.

## 2. Preservation rule

**R-01 (default).** Every URL that exists today is `KEEP_AS_IS` unless an explicit, recorded,
authorised migration decision says otherwise. Silence is never authorisation.

**R-02 (no migration in MC-15).** MC-15 proposes **no** URL migration, **no** renamed slug, **no**
retired page and **no** new redirect. Every record in `data/current-routes.json` carries
`changeControlStatus: NO_MIGRATION_PROPOSED_IN_MC15`, and the package datasets that describe
actions (redirect map, migration phases) are bound by the data contract to stay `NOT_EXECUTED`.

**R-03 (Spanish paths are frozen).** The 21 Spanish paths in `LOCALIZED_ROUTES` are the published
addresses. They may not be renamed, shortened, translated or re-cased by any MC-15 deliverable.

**R-04 (English counterparts are frozen too).** The `/en/*` counterparts are equally published;
"only Spanish is indexed" is not a licence to move the English URLs.

**R-05 (entity identity outlives display copy).** A route's identity is its `routeId` plus its
entity slug, never its translated display name. Renaming a title, H1, module name, product name or
brand token changes metadata, **never** the path. The six technology slugs and the 30 guide slugs
are brand-neutral and must not be renamed during any brand migration.

**R-06 (slugs are not translated).** English pages keep the Spanish slug
(`/en/guides/que-es-signal-k`, `/en/technology/navegador`). Introducing translated slugs would
require a redirect strategy that this milestone does not own, so it is not proposed.

**R-07 (the three legacy redirects stay active).** `/open-marine`, `/productos` and
`/productos/:slug` remain one-hop 301s to `/tecnologia`, `/tecnologia` and `/tecnologia/:slug`.
They are not removed, not chained, not repointed at any MAREA page and not converted into 302s.

**R-08 (private and sample surfaces stay reachable and non-indexable).** `cart`, `login`,
`account`, `orderDetail`, the seven admin patterns and the ten sample slugs keep their current
behaviour: reachable, `noindex`, outside the sitemap. They are not deleted and not made indexable.

**R-09 (no current URL may be redirected into a future MAREA catalogue).** No existing service,
experience, guide, shop, account or legal URL may be redirected to a proposed `/marea`,
`/marea/productos`, `/marea/soluciones`, family, bundle, configurator, professional, installer,
support or product-documentation page. MAREA pages are `PROPOSED_INTERNAL_NOT_DEPLOYABLE`; pointing
an existing address at a non-deployable page would be an unauthorised publication by redirect.

**R-10 (MAREA routes are additive).** Proposed MAREA routes may only be **added** beside the
existing surfaces. They may not reuse, shadow or capture an existing path, and they may not be
declared as the canonical or `hreflang` target of an existing page.

**R-11 (no collateral change).** Preserving a URL includes preserving its contract: canonical
self-reference, reciprocal `hreflang`, sitemap membership, robots policy, HTTP status and locale
declaration. A URL that keeps its path but loses its canonical is a broken promise, not a
preservation.

**R-12 (evidence, then change).** Any future change to a preserved URL requires, in this order: a
recorded authorisation, a redirect map entry with a one-hop destination, an updated canonical/
`hreflang`/sitemap plan, the automated gates green, and a post-change crawl comparison. Until all
five exist, the URL does not move.

**R-13 (no invented preservation claims).** Preservation is asserted only from repository
evidence (`REPOSITORY_VERIFIED`). No MC-15 document may state that a URL is indexed, ranked or
crawled; the only permitted label is `INDEXATION_UNVERIFIED`.

## 3. Disposition vocabulary

| Disposition | Meaning | Reversible? | Applied to |
|---|---|---|---|
| `KEEP_AS_IS` | Serve the URL exactly as today, in both locales, with its canonical/`hreflang`/sitemap contract intact. | n/a — no change | 98 static URL records (24 static + 12 technology detail + 60 guide detail + 2 shop lists) |
| `KEEP_NOINDEX` | Keep the URL reachable but permanently outside the indexable surface (document `noindex` and/or `X-Robots-Tag`). | no | 35 records: 8 private, 7 admin, 20 sample |
| `KEEP_REDIRECT` | Keep the existing one-hop 301 exactly as declared, target unchanged. | removal would be a regression | 3 legacy patterns + 1 concrete expansion |
| `DYNAMIC_DB` | The URL set is data, not registry. Each row keeps its own identity; the pattern must keep resolving to the same entity. | n/a | 2 shop-detail pattern records |
| `NO_PRESERVATION_REQUIRED` | Not a preserved address: a 404 surface that must keep answering 404 with no canonical and no alternate. | n/a | 2 unknown-route records |

Totals are asserted by `data/current-urls.json` (`summary.dispositionCounts`):
`KEEP_AS_IS 98`, `KEEP_NOINDEX 35`, `KEEP_REDIRECT 4`, `DYNAMIC_DB 2`,
`NO_PRESERVATION_REQUIRED 2` = 141 records.

## 4. Decision table

`Authorization status` reads: `NONE_REQUIRED_NO_CHANGE` (nothing is being changed, so no
authorisation is consumed) or `REQUIRED_BEFORE_ANY_CHANGE` (a standing condition, not a granted
permission). No authorisation is granted anywhere in this table.

| # | routeId | Disposition | Rationale | Authorization status | Validation rule |
|---|---|---|---|---|---|
| 1 | `home` | `KEEP_AS_IS` | Site root; owns `x-default`; the only language-neutral entry point. | `NONE_REQUIRED_NO_CHANGE` | Root must stay canonical `https://embarcarte.com/`, must declare `es` + `en` + `x-default`, and must render one `Organization`/`WebSite` identity (`check-seo.mjs:221-235`). |
| 2 | `technology` | `KEEP_AS_IS` | Core commercial page and the target of two legacy redirects. | `NONE_REQUIRED_NO_CHANGE` | `/tecnologia` stays a 200 prerendered page; it is the redirect destination, so it must never itself redirect. |
| 3 | `technologyDetail` | `KEEP_AS_IS` | Six published module URLs; slugs are brand-neutral and entity-bearing. | `NONE_REQUIRED_NO_CHANGE` | All 6 slugs × 2 locales present in the build manifest and sitemap; slug equality across locales. |
| 4 | `experiences` | `KEEP_AS_IS` | Existing business surface; MC-14 has an open claim finding on it. | `NONE_REQUIRED_NO_CHANGE` | 200 + self-canonical + both alternates; no redirect may absorb it. |
| 5 | `delivery` | `KEEP_AS_IS` | Existing boat-delivery service; a real operating business. | `NONE_REQUIRED_NO_CHANGE` | 200 + self-canonical; must not be merged into a future `/marea/soluciones` page. |
| 6 | `services` | `KEEP_AS_IS` | Existing services surface. | `NONE_REQUIRED_NO_CHANGE` | 200 + self-canonical; must not be redirected to a professional/MAREA page. |
| 7 | `about` | `KEEP_AS_IS` | Existing corporate page; claims pending review. | `NONE_REQUIRED_NO_CHANGE` | 200 + self-canonical; content changes are metadata changes, never path changes. |
| 8 | `contact` | `KEEP_AS_IS` | Conversion page backed by `/api/contact`. | `NONE_REQUIRED_NO_CHANGE` | 200 + self-canonical; the API endpoint may change implementation, not the page URL. |
| 9 | `guides` | `KEEP_AS_IS` | Guide corpus index; bidirectional ES↔EN linking tested. | `NONE_REQUIRED_NO_CHANGE` | 200 + self-canonical; the "read in the other language" link must keep naming the target language (`check-i18n.mjs:526-527`). |
| 10 | `guideDetail` | `KEEP_AS_IS` | 30 published articles × 2 locales; the largest block of earned links. | `NONE_REQUIRED_NO_CHANGE` | 30 slugs × 2 locales in the build manifest; `GUIDE_SLUGS` order asserted (`check-i18n.mjs:254`). |
| 11 | `shop` | `KEEP_AS_IS` | Existing shop index; MAREA must not replace it. | `NONE_REQUIRED_NO_CHANGE` | Both list URLs in the sitemap by explicit declaration (`server.ts:197-198`); excluded from the `noindex` set. |
| 12 | `shopDetail` | `DYNAMIC_DB` | Per-product identity lives in the database; the pattern must keep resolving to the same row. | `NONE_REQUIRED_NO_CHANGE` | Every active product keeps one ES URL; EN only when fully translated; unknown slug stays `noindex` with no canonical. |
| 13 | `shopSample` | `KEEP_NOINDEX` | Marketing examples, not sellable inventory. | `NONE_REQUIRED_NO_CHANGE` | `noindex, follow`, empty alternate list, absent from the sitemap (`check-seo.mjs:159`). |
| 14 | `cart` | `KEEP_NOINDEX` | Session-bound private surface. | `NONE_REQUIRED_NO_CHANGE` | CSR shell 200 + `X-Robots-Tag: noindex, nofollow` + no canonical/`hreflang` (`check-i18n.mjs:547-568`). |
| 15 | `login` | `KEEP_NOINDEX` | Anonymous form, deliberately non-indexable. | `NONE_REQUIRED_NO_CHANGE` | Same shell contract as `cart`; excluded from sitemap (`check-seo.mjs:152-163`). |
| 16 | `account` | `KEEP_NOINDEX` | Authenticated area. | `NONE_REQUIRED_NO_CHANGE` | `authGuard` redirect to `/acceso?volver=…`; shell response leaks no session data. |
| 17 | `orderDetail` | `KEEP_NOINDEX` | Authenticated, dynamic, carries order identity. | `NONE_REQUIRED_NO_CHANGE` | Keeps the order id across locales; shell 200 + noindex; see D02 O-01 for the missing `serverRoutes` entry. |
| 18 | `legalNotice` | `KEEP_AS_IS` | Published legal document; gated by `GATE-LEGAL-ENTITY`. | `NONE_REQUIRED_NO_CHANGE` | 200 + self-canonical; content may be corrected, the URL may not move. |
| 19 | `privacy` | `KEEP_AS_IS` | Published privacy policy; gated by `GATE-PRIVACY-DPA-DPIA`. | `NONE_REQUIRED_NO_CHANGE` | Same as above; both locales must stay legally equivalent. |
| 20 | `cookies` | `KEEP_AS_IS` | Published cookie policy. | `NONE_REQUIRED_NO_CHANGE` | Same as above; note that MC-14 has no finding on this route (D02 O-02). |
| 21 | `termsOfSale` | `KEEP_AS_IS` | Published consumer terms; gated by `GATE-CONSUMER-TERMS`. | `NONE_REQUIRED_NO_CHANGE` | Same as above; contract text changes never imply a URL change. |
| 22 | `admin` | `KEEP_NOINDEX` | Operator dashboard. | `NONE_REQUIRED_NO_CHANGE` | `/admin` and `/admin/**` client-rendered with `noindex` (`server.ts:244-251`). |
| 23 | `adminOrders` | `KEEP_NOINDEX` | Operator order list. | `NONE_REQUIRED_NO_CHANGE` | Reachable only behind `adminGuard`; never in the sitemap. |
| 24 | `adminOrderDetail` | `KEEP_NOINDEX` | Operator order detail (customer data). | `NONE_REQUIRED_NO_CHANGE` | Same guard; no canonical, no alternate. |
| 25 | `adminProducts` | `KEEP_NOINDEX` | Operator product list. | `NONE_REQUIRED_NO_CHANGE` | Same guard; the admin URL is not the product URL. |
| 26 | `adminProductEdit` | `KEEP_NOINDEX` | Operator product editor. | `NONE_REQUIRED_NO_CHANGE` | Same guard; editing never rewrites a public product URL implicitly. |
| 27 | `adminCustomers` | `KEEP_NOINDEX` | Operator customer list (personal data). | `NONE_REQUIRED_NO_CHANGE` | Same guard; browser-only render. |
| 28 | `adminMessages` | `KEEP_NOINDEX` | Operator inbox (personal data). | `NONE_REQUIRED_NO_CHANGE` | Same guard; browser-only render. |
| 29 | `legacyOpenMarine` (`/open-marine`) | `KEEP_REDIRECT` | Historical address with external links. | `NONE_REQUIRED_NO_CHANGE` (removal would be `REQUIRED_BEFORE_ANY_CHANGE`) | `redirect: 'manual'` must return 301 with `Location: /tecnologia` (`check-i18n.mjs:495-504`). |
| 30 | `legacyProductos` (`/productos`) | `KEEP_REDIRECT` | Previous catalogue index. | Same as row 29 | 301 → `/tecnologia`; destination must stay a 200 page. |
| 31 | `legacyProductoDetail` (`/productos/:slug`) | `KEEP_REDIRECT` | Preserves product identity across the old path shape. | Same as row 29 | 301 → `/tecnologia/:slug` with the slug preserved; `/productos/navegador` → `/tecnologia/navegador`. |
| 32 | `unknownRoute` `/**` | `NO_PRESERVATION_REQUIRED` | A 404 surface is not a preserved address. | `NONE_REQUIRED_NO_CHANGE` | 404 status, `noindex, follow`, no canonical, no alternate, locale-correct copy (`check-i18n.mjs:505-522`). |

Rows 1–21 are exactly the 21 `RouteId` values of `locale-routes.ts`; rows 22–28 are the seven
contract admin ids; rows 29–31 are the three active legacy redirects; row 32 is the wildcard.

## 5. Absolute prohibitions

The following are **prohibited** in MC-15 and in any later milestone unless a recorded human
authorisation supersedes them:

| Id | Prohibited action | Why |
|---|---|---|
| P-01 | Removing or renaming any of the 21 Spanish paths or their `/en/*` counterparts. | Published addresses; §2 R-03/R-04. |
| P-02 | Redirecting any existing service, experience, guide, shop, account or legal URL to a proposed MAREA route. | Would publish a non-deployable page by proxy; §2 R-09. |
| P-03 | Reusing an existing path for a MAREA page (e.g. claiming `/tienda`, `/servicios`, `/tecnologia` as the MAREA catalogue). | Collision; MAREA must be additive; §2 R-10. |
| P-04 | Setting a MAREA page as canonical or `hreflang` target of an existing page. | Steals established identity; §2 R-10/R-11. |
| P-05 | Removing, chaining, re-targeting or downgrading the three legacy 301s. | Loses backlinks and crawl equity; §2 R-07. |
| P-06 | Making a private, admin or sample URL indexable, or adding one to the sitemap. | Leaks private data or invents indexable samples; §2 R-08. |
| P-07 | Translating slugs into English (`/en/technology/navigator`). | Requires a redirect strategy MC-15 does not own; §2 R-06. |
| P-08 | Changing a route's canonical, `hreflang`, sitemap membership or robots policy while claiming "the URL did not change". | Preservation includes the metadata contract; §2 R-11. |
| P-09 | Declaring any URL "indexed", "Google-indexed" or "verified in Search Console". | No such evidence exists in MC-15; §2 R-13. |
| P-10 | Adding a redirect that is "temporary" (302/307) to a MAREA page and later promoting it, bypassing the change procedure. | §2 R-12 forbids the change without the five elements. |

## 6. Legacy redirect invariants

| Invariant | Rule | Currently satisfied by |
|---|---|---|
| One hop | The destination is a 200 page, never another redirect. | `/tecnologia` and `/tecnologia/:slug` are prerendered 200 pages. |
| Status | 301, declared in both the Angular route table and the server route table. | `app.routes.ts:119-123`, `app.routes.server.ts:57-59`. |
| Slug preservation | `/productos/:slug` keeps the slug. | `redirectTo: ({ params }) => '/tecnologia/' + params['slug']`. |
| No query/fragment loss | The framework redirect keeps the URL's query and fragment handling unchanged; MC-15 does not alter it. | Angular `redirectTo` semantics; unobserved at runtime (`NOT_OBSERVED`). |
| Regression test | A test must keep asserting 301 + target. | `scripts/check-i18n.mjs:494-504`. |
| Removal | Requires `REQUIRED_BEFORE_ANY_CHANGE` authorisation, a documented re-crawl cycle and a redirect-map entry. | `KEEP_REDIRECT` in `data/current-urls.json`. |

## 7. How a preserved URL could ever change (procedure, not an authorisation)

Nothing below is executed or authorised in MC-15. The sequence exists so that a future milestone
cannot improvise it:

1. **Decision record.** A `DECISION-LOG.md` entry naming the URL, the reason, the destination, the
   evidence and the approver. Without it the change stops here.
2. **Redirect map entry.** `sourcePath`, `destinationPath`, `statusCode 301`, `preserveEntityIdentity`,
   `riskClassification`, `executionStatus: NOT_EXECUTED` until executed in the authorised milestone.
   No chain, no loop, destination must be a retained or justified page.
3. **Canonical/hreflang update.** Self-reference at the destination, reciprocal alternates, no
   alternate to a page that will not exist.
4. **Sitemap update in the same change.** Old URL removed only after the redirect is live; new URL
   present in the same release.
5. **Gates green.** `npm run build`, `npm run test:i18n`, `npm run test:seo` (and `test:commerce`
   when a shop URL is involved), plus the MC-15 validators once they exist.
6. **Post-change observation.** A crawl comparison of the affected URLs, recorded with its own
   evidence class — `PUBLIC_OBSERVATION` at that time, never inferred today.
7. **Retention.** The redirect stays for at least a full re-crawl cycle (MC-03 §8 Phase 4 keeps the
   old URLs for 12 months after a switch).

## 8. Validation rules that must stay true

| Rule | Enforced today by | MC-15 obligation |
|---|---|---|
| Every `RouteId` resolves in both locales and round-trips back to itself. | `scripts/check-i18n.mjs:115-131` | The future MC-15 validator must re-assert it against `current-routes.json`. |
| Every prerendered URL responds 200 with a self-canonical and both alternates (96 URLs). | `scripts/check-i18n.mjs:426-469` | Keep the count assertion at 96 until an authorised route change updates it. |
| Legacy redirects answer 301 with the documented target. | `scripts/check-i18n.mjs:494-504` | `KEEP_REDIRECT` rows must stay 3 patterns + 1 concrete expansion. |
| Unknown URLs answer 404, `noindex`, no canonical, no alternate. | `scripts/check-i18n.mjs:505-522` | Keep `NO_PRESERVATION_REQUIRED` semantics. |
| Private shells answer 200 + `X-Robots-Tag: noindex, nofollow` with no canonical/`hreflang`. | `scripts/check-i18n.mjs:545-568`, `scripts/check-seo.mjs:276-295` | Keep the 8 private records out of every indexable dataset. |
| The sitemap contains no private, sample, admin, legacy or 404 URL. | `scripts/check-seo.mjs:152-163` | Any future sitemap change must keep this list excluded. |
| Every sitemap `loc` is canonical on its own page and every alternate is reciprocated. | `scripts/check-seo.mjs:201-235` | D04's matrix must be derived from this rule, not invented. |
| `x-default` exists on the home pair only. | `scripts/check-seo.mjs:173-180`, `scripts/check-i18n.mjs:490-492` | Do not extend `x-default` to MAREA pages by assumption. |
| The prerender manifest equals the registry expansion. | `npm run build` → `dist/embarcarte/prerendered-routes.json` (96 paths, set-equal to the derivation) | Re-verify at freeze time. |

MC-15 does not claim that a validator for these dispositions exists yet. Until one does, the
dispositions are enforced by review against this document and `data/current-urls.json`.

**Cross-artefact exception (agreed).** The package validator `scripts/check-marea-ia-seo.mjs`
(`IA-014`) requires a `KEEP_*` prefix for every Spanish non-private, non-sample current URL, and the
D02/D03 specification requires `DYNAMIC_DB` for the shop-detail pattern. The team lead resolved the
conflict on 2026-11-02 by carving out an explicit exception for `routeId === 'shopDetail'` with
`DYNAMIC_DB` (`check-marea-ia-seo.mjs:424`). `data/current-urls.json` therefore keeps `DYNAMIC_DB`
on `URL-SHOP-DETAIL-PATTERN-ES`/`-EN`, and the preservation semantics are unchanged: those URLs are
database rows, so no product URL may move and none may be retired by a bulk rewrite.

## 9. What this policy does not authorise

- It does not authorise adding, moving, renaming, retiring or redirecting any URL.
- It does not authorise any MAREA URL, slug, title, canonical, `hreflang`, structured-data node or
  sitemap entry.
- It does not authorise any change to `src/`, `public/`, `package.json`, deployment configuration or
  any MC-14 artefact.
- It does not authorise publication, indexing requests, sitemap submission or Search Console work.
- It does not close any of the 13 MC-14 release gates; `GATE-WEBSITE-REMEDIATION` stays
  `EVIDENCE_REQUIRED` and the other twelve stay `BLOCKED`.
- It does not start MC-16 and does not treat MC-16 work as done.

## 10. Cross-references

| Reference | Why it is cited |
|---|---|
| `MC15-CURRENT-URL-AND-ROUTE-INVENTORY.md` (D02) | The inventory this policy protects. |
| `MC15-DATA-CONTRACT.md` §4 rules 1–7 | Hard rules the validators must encode (21 ids, private exclusion, sample noindex, redirect preservation, canonical reciprocity, sitemap eligibility). |
| `data/current-urls.json` | 141 records carrying `migrationDisposition` + `preservationReason`. |
| `data/current-routes.json` | 28 route records with `changeControlStatus: NO_MIGRATION_PROPOSED_IN_MC15`. |
| `data/url-evidence.json` | 23 `REPOSITORY_VERIFIED` evidence records; no runtime claim. |
| `docs/marea/brand/WEBSITE-BRAND-MIGRATION.md` §7.2–§7.4, §8 | Predecessor rule: no indexed URL removed, additive migration, redirects kept. |
| `docs/marea/WEBSITE-AND-ROADMAP.md` §2 | Programme-level instruction to keep existing route identities. |
| `docs/marea/legal-commercial/MC14-MC15-HANDOFF.md` §5, §7 | Bilingual parity and the do-not-do list MC-15 inherits. |
| `docs/marea/legal-commercial/data/release-evidence-gates.json` | `GATE-WEBSITE-REMEDIATION` and the twelve `BLOCKED` gates. |
| `src/app/core/i18n/locale-routes.ts` | The registry whose stability this policy protects. |
