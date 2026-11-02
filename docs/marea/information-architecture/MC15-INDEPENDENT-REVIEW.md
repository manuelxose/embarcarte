# D20 — MC-15 independent audit

| Field | Value |
|---|---|
| Deliverable | D20 `MC15-INDEPENDENT-REVIEW.md` + `data/review-findings.json` |
| Auditor | `auditor` (independent; did not author the implementation) |
| Reviewed commit (re-verification) | `d1d7a1a848fb2a82334811aad9b916d4041cd4a2` (`d1d7a1a`) |
| Original audit commit | `b70d5500591be63d00ac33b4c1de6c802981b46d` (`b70d550`) |
| Base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` (`e0be1e4`) |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Merge base | `e0be1e457456a401a529e1912770e07ed9a863e4` (verified) |
| Review date | 2026-11-02 |
| Re-verification date | 2026-11-02 |
| Verdict | **PASS** (after correction commit `d1d7a1a`; see §19) |
| Review status | `PASS_AFTER_CORRECTION` |
| Open findings | 0 BLOCKING, 0 MAJOR, 0 MINOR; 3 INFORMATIONAL accepted observations |
| Scope | **Internal IA/SEO planning only; no publication, indexation, deployment or MC-16 authorization.** |
| Publication / deployment | NOT_AUTHORIZED / NOT_EXECUTED |
| MC16_STARTED | `false` |

> This audit is an internal, read-only review. It does not authorise publication, indexation,
> deployment, a redirect change, a merge or MC-16. It claims no Google indexing and no Search
> Console evidence; indexation remains `INDEXATION_UNVERIFIED`.
>
> **Re-verification notice:** §1–§18 record the independent audit of `b70d550` whose original
> verdict was `NEEDS_REVISION`. §19 records the independent re-verification of correction commit
> `d1d7a1a` and is the operative verdict: **PASS**, with only the three informational observations
> IA-06…IA-08 retained as disclosed, non-blocking limitations.

## 1. Audit method and independence

The auditor did not author any implementation file. Only these two files were written:
`docs/marea/information-architecture/MC15-INDEPENDENT-REVIEW.md` and
`docs/marea/information-architecture/data/review-findings.json` (the scaffold was replaced).
No implementation document, dataset, script, `src/`, `public/`, `package.json` or MC-14 file was
edited. No Git write command, deployment, publication, merge, sitemap submission or external
contact was performed. `git status --porcelain` before and after the audit shows only the
untracked team-state directory `.agent-teams/`.

Evidence sources used independently of the author summaries: the Git history and diff, the
TypeScript route registries and server sitemap/noindex code, all 19 JSON files, the MC-14 source
datasets, the validator source and its unit suite, an isolated local SSR run (empty and 2-product
fixture) and 21 adversarial mutations executed against temporary copies of the data.

## 2. Ancestry, freeze and changed-file inventory

```text
git rev-parse HEAD                                  -> b70d5500591be63d00ac33b4c1de6c802981b46d
git rev-parse e0be1e4                               -> e0be1e457456a401a529e1912770e07ed9a863e4
git merge-base e0be1e4 b70d550                      -> e0be1e457456a401a529e1912770e07ed9a863e4
git rev-list --count e0be1e4..b70d550               -> 1
git diff --name-only e0be1e4 b70d550 -- src public .github   -> (empty)
git diff --name-only e0be1e4 b70d550 | where { $_ -notmatch '^docs/' } -> package.json, scripts/check-marea-ia-seo.mjs, scripts/check-marea-ia-seo.test.mjs
```

The frozen candidate is a single commit directly on top of the MC-14 HEAD. No `src/`, `public/`,
`.github/`, deployment, checkout, price, redirect, robots, sitemap or live-SEO file changed.
`package.json` changed only by adding the `test:ia-seo` / `test:ia-seo:unit` scripts and the two
new script paths in the Prettier `format` / `format:check` lists; no dependency, build or runtime
change. The two new scripts are the validator and its unit suite.

Exact changed-file inventory (40 files; 37 under `docs/marea/information-architecture/`, plus
`package.json` and the two scripts):

```text
docs/marea/information-architecture/MC-15-BASELINE-AND-GOVERNANCE.md
docs/marea/information-architecture/MC15-BILINGUAL-INFORMATION-ARCHITECTURE.md
docs/marea/information-architecture/MC15-BILINGUAL-SEO-METADATA-CONTRACT.md
docs/marea/information-architecture/MC15-CANONICAL-HREFLANG-POLICY.md
docs/marea/information-architecture/MC15-CURRENT-URL-AND-ROUTE-INVENTORY.md
docs/marea/information-architecture/MC15-DATA-CONTRACT.md
docs/marea/information-architecture/MC15-EXISTING-URL-PRESERVATION-POLICY.md
docs/marea/information-architecture/MC15-LEGAL-COMMERCIAL-PUBLICATION-GATES.md
docs/marea/information-architecture/MC15-MC16-HANDOFF.md
docs/marea/information-architecture/MC15-NAVIGATION-BREADCRUMB-LINK-GRAPH.md
docs/marea/information-architecture/MC15-PHASED-SEO-MIGRATION-PLAN.md
docs/marea/information-architecture/MC15-PROPOSED-ROUTE-REGISTRY.md
docs/marea/information-architecture/MC15-REDIRECT-AND-MIGRATION-MAP.md
docs/marea/information-architecture/MC15-SEO-RISK-AND-ROLLBACK-PLAN.md
docs/marea/information-architecture/MC15-SITEMAP-ROBOTS-INDEXATION-CONTRACT.md
docs/marea/information-architecture/MC15-SLUG-AND-ENTITY-IDENTITY-GOVERNANCE.md
docs/marea/information-architecture/MC15-STRUCTURED-DATA-GOVERNANCE.md
docs/marea/information-architecture/MC15-WEBSITE-FINDINGS-REMEDIATION-PLAN.md
docs/marea/information-architecture/data/bilingual-metadata.json
docs/marea/information-architecture/data/canonical-hreflang.json
docs/marea/information-architecture/data/current-routes.json
docs/marea/information-architecture/data/current-urls.json
docs/marea/information-architecture/data/indexation-policy.json
docs/marea/information-architecture/data/internal-link-graph.json
docs/marea/information-architecture/data/manifest.json
docs/marea/information-architecture/data/mc16-handoff-inputs.json
docs/marea/information-architecture/data/migration-phases.json
docs/marea/information-architecture/data/proposed-ia.json
docs/marea/information-architecture/data/proposed-routes.json
docs/marea/information-architecture/data/publication-gates.json
docs/marea/information-architecture/data/redirect-map.json
docs/marea/information-architecture/data/review-findings.json
docs/marea/information-architecture/data/risk-register.json
docs/marea/information-architecture/data/slug-governance.json
docs/marea/information-architecture/data/structured-data-policy.json
docs/marea/information-architecture/data/url-evidence.json
docs/marea/information-architecture/data/website-remediation.json
package.json
scripts/check-marea-ia-seo.mjs
scripts/check-marea-ia-seo.test.mjs
```

No MC-14 file (`docs/marea/legal-commercial/**`, `docs/marea/execution/**`) and no predecessor
dataset was modified.

## 3. Independent reconstruction of the route and URL inventory

The auditor re-parsed the repository sources rather than trusting the datasets:
`src/app/core/i18n/locale-routes.ts` (typed registry), `src/app/app.routes.ts`,
`src/app/app.routes.server.ts`, `src/app/features/technology/models/technology.ts`,
`src/app/features/guides/models/guides.ts`, `src/app/core/sample-products.ts`.

| Check | Reconstructed value | Dataset value | Result |
|---|---|---|---|
| Public `RouteId`s | 21 (exact union) | `current-routes.json` 21 public + 7 admin = 28 items | MATCH |
| Technology slugs | 6 (`navegador`, `cartografia`, `hub`, `piloto-automatico`, `simulacion`, `pasarela-sensores`) | 6 × 2 concrete URLs | MATCH |
| Guide slugs | 30 | 30 × 2 concrete URLs | MATCH |
| Sample slugs | 10 | 10 × 2 concrete URLs | MATCH |
| Admin patterns | 7 (Spanish-only) | 7 records | MATCH |
| Legacy redirects | `/open-marine`, `/productos`, `/productos/:slug` (3 active 301) plus the concrete `/productos/navegador` expansion | 4 `legacyRedirect` records | MATCH |
| Concrete URL records | 141, all unique | `current-urls.json` 141 | MATCH |
| Static surface without products | 96 prerendered + `/tienda` + `/en/shop` = 98 | 98 in D02/D09 and the local run | MATCH |
| Manifest items | 28 / 141 / 23 (`current-routes` / `current-urls` / `url-evidence`) | 28 / 141 / 23 | MATCH |

No existing Spanish path is moved, no route is removed, and every concrete Spanish public URL
record carries `KEEP_AS_IS` (or the documented `shopDetail` `DYNAMIC_DB` exception). The 98-URL
arithmetic is exactly `12 static ids × 2 + 6 technology × 2 + 30 guides × 2 + 2 shop lists`.

## 4. Collision matrix (23 proposed routes)

Recomputed independently from the source registries and from every concrete current URL:

- 23 proposed routes → 46 proposed ES/EN patterns;
- compared against all 21 current literal patterns, all parameterised current patterns, the 7
  admin patterns, the 3 legacy redirect paths, and all 139 concrete page URLs;
- result: **0 collisions** (literal, parameterised, admin, legacy or concrete-slug);
- every proposed route is `PROPOSED_INTERNAL_NOT_DEPLOYABLE`, `implementationReady=false`,
  `indexationAuthorized=false`, `commercialTransactionAuthorized=false`, `sitemapEligible=false`,
  `live/published/indexable` absent, `collisionStatus` `NO_COLLISION` with an empty `collidesWith`.
- the local SSR run answers `404` (no `Location`) for `/marea` and `/en/marea`, so no proposed
  route is a served public URL today.

## 5. Redirect map

`redirect-map.json`: 53 records = 3 `EXISTING_ACTIVE` 301 + 1 `PROPOSED_NOT_ACTIVE` 301 +
42 `KEEP_AS_IS` (26 static/locale + 8 dynamic + 8 private) + 7 `INTERNAL_ONLY_NO_REDIRECT`.

Independently recomputed, with no violation:

- the 3 active legacy 301s are preserved one-hop to `/tecnologia`, `/tecnologia` and
  `/tecnologia/:slug`; no loop and no chain among 301 sources;
- no active destination is `/`, `/marea`, `/en/marea`, the login/account/cart area or a 404
  destination; no cross-locale redirect; no many-to-one home redirect;
- every record declares `queryHandling` and `fragmentHandling`; the three legacy 301s record the
  observed query drop as inherited behaviour;
- unknown legacy product slugs are **not** 301-redirected (status stays 404), so no 301 points at
  a 404 destination. See finding IA-04 for the exact 404 response shape (a pre-existing
  observation inaccuracy, not a redirect).

Local SSR reproduction on 2026-11-02 (fresh `dist` build, disposable `DATA_DIR`, port 4399):

```text
/open-marine            -> 301 location /tecnologia
/open-marine?utm=1      -> 301 location /tecnologia
/productos              -> 301 location /tecnologia
/productos/navegador    -> 301 location /tecnologia/navegador
/productos/does-not-exist -> 404 location /tecnologia/does-not-exist (see IA-04)
```

## 6. Canonical and hreflang

`canonical-hreflang.json`: 88 rows = 44 page identities × 2 locales (21 current + 23 proposed).

Independently verified:

- every existing indexable page declares a self-referencing absolute canonical equal to its
  registry path; the local SSR serves exactly that canonical for `/`, `/en`, `/tecnologia`,
  `/en/technology`, the sampled guide/technology/shop pages and the fixture product pages;
- the 4 private routes declare `NONE_PRIVATE`, `indexable=false`, no alternates, and the served
  CSR shell carries `X-Robots-Tag: noindex, nofollow` with no canonical/hreflang;
- `shopSample` declares no alternates and is `noindex`; `shopDetail` is conditional
  (`SELF`/`SELF_CONDITIONAL_ON_TRANSLATION`, no EN alternate for an ES-only product). Reproduced:
  an ES-only fixture product serves only `es` on `/tienda/...` and `noindex` with no alternates on
  `/en/shop/...`; a fully translated product serves `es` + `en`;
- 15 reciprocal groups, 30 grouped rows, every group one page identity with both locales and
  reciprocal alternates; no invented EN alternate;
- `x-default` is declared on the home ES row only, with href `https://embarcarte.com/`; the served
  home pair emits exactly two `x-default` declarations, both pointing at the Spanish home (the
  dataset records the pair once, as documented in the EN row note);
- every proposed route is `BLOCKED_NO_CANONICAL`, `indexable=false`, with no hreflang group.

## 7. Sitemap, robots and indexation

Local SSR with an empty disposable database: **98** `<loc>` URLs. With the inherited 2-product
fixture (`seo-translated` fully translated, `seo-solo-es` Spanish-only): **101** URLs
(98 + 2 ES product URLs + 1 translated EN product URL). Both runs emit exactly 2 `x-default`
declarations, both `https://embarcarte.com/`.

- no `/marea`, `/en/marea`, admin, cart/login/account, sample or private URL is in either sitemap;
- `robots.txt` is not used as a noindex substitute: private/admin surfaces answer with
  `X-Robots-Tag: noindex, nofollow`, samples and 404 with `noindex, follow`; the only robots rule
  beyond `Allow: /` is `Disallow: /api/`;
- `INDEXATION_UNVERIFIED` is present throughout; no dataset or document claims Google indexing or
  Search Console evidence (a `SEARCH_CONSOLE_VERIFIED` mutation is rejected by the validator);
- 98/101 are recorded as local-fixture observations, never as a production expectation.

## 8. Structured data

- `structured-data-policy.json`: 9 schema page types, 45 page identities, absolute restrictions on
  MAREA Product/Offer/price/availability/rating/review/certification, and
  `mareaProductOrOfferNodesAuthorized=0` / `aggregateRatingNodesAuthorized=0`;
- all 23 proposed rows in `pageIdentityMatrix` have an empty `allowedTypes` and a non-empty
  `forbiddenTypes`; no proposed row allows Product or Offer;
- existing non-MAREA commerce is only inventoried, not modified: the fixture shop product still
  emits its inherited `Product` + `Offer` with EUR price and stock availability; the source tree
  is unchanged versus `e0be1e4`, so no live structured-data change was made;
- the local run contains no `MAREA` string in the served HTML or JSON-LD.

## 9. MC-14 website findings

34/34 findings `WEB-001`…`WEB-034` are mapped. Independent comparison against
`docs/marea/legal-commercial/data/website-findings.json`:

- 0 severity, 0 file and 0 route mismatches;
- `originalStatus = NOT_REMEDIATED` on all 34; `status = PLANNED_NOT_REMEDIATED` on all 34;
- 0 closed, 0 remediated; severities 6 BLOCKING / 20 MAJOR / 4 MINOR / 4 INFORMATIONAL;
- the MC-14 handoff `pageByPageIssues` discrepancy is documented in D02 §18 O-02, D14 §2 and
  `website-remediation.handoffMappingDiscrepancy` (21 listed vs 34, 13 unlisted, 16 route/label
  mismatches). The machine dataset is used as the authority and the discrepancy is not hidden.

## 10. Publication gates, documents, route matrix and hard restrictions

- 13/13 gates consumed; `sourceStatus` matches `release-evidence-gates.json` exactly
  (12 `BLOCKED` + 1 `EVIDENCE_REQUIRED`); no gate is closed; 24/24 documents consumed with the
  source status (0 executed, draft states preserved); 72/72 required-evidence records unique;
- 23/23 route-gate-matrix rows, all `implementationReady=false`, `publicationAuthorized=false`,
  `indexationAuthorized=false`, `commercialTransactionAuthorized=false`, all `routeDefined=true`;
- 45/45 proposed-IA nodes and 23/23 proposed routes carry no `true` authorisation;
- the 16 inherited hard restrictions (`TRADEMARK_LEGAL_CLEARANCE=NOT_GRANTED`,
  `MAREA_PUBLIC_USE=NO_GO`, `AIS_TRANSMISSION_OFFERED=false`, `FLEET_DEFAULT_HARDWARE=false`,
  `PRICE_APPROVED=NONE`, `PRODUCTION_DEPLOYMENT=NOT_AUTHORIZED`, etc.) are copied verbatim and
  unchanged;
- **finding IA-01** records that the gate lists in `proposed-routes.json` / `proposed-ia.json`
  disagree with D13 and `routeGateMatrix` on 11/23 routes; both files individually satisfy the
  validator, but they are not the same contract.

## 11. Families, bundles, editions and MC-16

- 9 family ids (`NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET`) and 6 bundle ids
  (`START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET`);
- 26 edition ids, all 26 found in the MC-05…MC-08 product/hardware source docs; no edition
  invented; every family/bundle edition mapping resolves;
- 206 link edges (103 unique links), 23/23 proposed pages reachable from `mareaOverview`,
  0 live navigation edges to a blocked proposed route, no orphan and no breadcrumb cycle;
- `MC16_STARTED=false` in the handoff, the manifest and every dataset; 16 named open dependencies,
  `OPEN_0_OF_13` / `OPEN_0_OF_24` / `OPEN_0_OF_34` preconditions and 0 routes published, 0 prices
  approved, 0 stock records, 0 certifications. `READY_FOR_MC16_WITH_NAMED_GAPS` is explicitly
  qualified in D17 as “inputs documented, MC-16 may not begin”; no MC-16 execution was found.

## 12. D15 / D16 migration and rollback review

- D15 defines phases 0–6, all `executionStatus=NOT_EXECUTED` (7/7), `authorizationRequired=true`,
  `authorizationStatus=NOT_GRANTED`, with entry/exit criteria, out-of-scope, prohibited actions and
  risk ids; `migration-phases.json` records `executedInMc15=0`, `authorizedInMc15=0`.
- D16 is executable in outline: versioned artefacts only (commit SHA + checksum, captured sitemap,
  snapshot, registry output), never an invented deployment/release id; five named prerequisites
  (URL snapshot, redirect version, sitemap state, canonical/hreflang, application rollback) with
  honest “NOT CAPTURED / NOT VERIFIED TODAY” status and `PLAN_ONLY - NOT_READY_TO_EXECUTE`;
  incident thresholds and an eight-row rollback verification checklist. No release/deployment id
  is invented anywhere in D15/D16 or the phase dataset.

## 13. Cross-file lineage

- all crossReferences in the 19 datasets resolve from the repository root;
- the 18 manifest dataset hashes and byte counts match the frozen `b70d550` tree (the
  `review-findings` entry pins the audit scaffold and becomes stale after D20 — finding IA-05);
- current-urls → url-evidence: 141/141 `evidenceSource` ids resolve; url-evidence → current-urls:
  19/19 page URLs resolve; 4 infrastructure `urlId`s intentionally have no page record
  (`NON_PAGE_SURFACE`, finding IA-06);
- proposed-route entity ids resolve to `slug-governance.entitySlug` (15 family/bundle) or
  `entitySlug`→`surfaceSlug` (8 page surfaces); proposed-IA parents, metadata link targets,
  breadcrumb parents, canonical alternates, matrix gate/evidence/document ids, remediation gate
  ids and 42 MC-14 claim ids all resolve; 25 remediation risk ids resolve in the MC-14 data;
- no dataset claims `LOCAL_SSR_VERIFIED` without a documented, reproducible observation; the
  central `url-evidence.json` holds only repository evidence (finding IA-07, informational).

## 14. Validator, unit suite and adversarial mutations

Commands and results:

```text
npm run test:ia-seo
  -> MC-15 IA/SEO validation passed: 19 datasets, 21 current routes, 23 proposed routes, 34 findings, 13 gates.
npm run test:ia-seo:unit
  -> tests 54, pass 54, fail 0
```

The auditor then ran **21 of its own mutations**, not copied from the author suite. Each mutation
was applied to a disposable copy of the repository (data + source + predecessor datasets), and
`node scripts/check-marea-ia-seo.mjs --root <temp-root>` was executed. A clean copy of the same
root validates with exit 0 before mutating, so a failure is attributable to the mutation.

| # | Mutation | Expected rejection | Actual |
|---|---|---|---|
| M01 | `mareaProducts.en` = `en/marea` (duplicate localized URL) | `IA-025` | exit 1, IA-020 + IA-025 |
| M02 | `technology.es` = `tecnologia-nueva` (moved Spanish route) | `IA-006` | exit 1, IA-006 |
| M03 | `URL-ABOUT-ES.concreteUrl` = `/contacto` (two RouteIds, one URL) | `IA-012` | exit 1, IA-012 |
| M04 | add `/ciclo-a`→`/ciclo-b` and `/ciclo-b`→`/ciclo-a` 301s | `IA-032` | exit 1, IA-032 + IA-033 |
| M05 | `legacyProductos` destination = `/open-marine` (chain) | `IA-033` | exit 1, IA-031/033/034 |
| M06 | `productDocumentation.es` = `tienda/:slug` (dynamic shadowing) | `IA-024` | exit 1, IA-020 + IA-024 |
| M07 | active `legacyProductos` destination = `""` | `IA-034` | exit 1, IA-031 + IA-034 |
| M08 | `mareaFamilyNav.en` = `en/marea/nav-entity` (wrong entity slug) | `IA-020` | exit 1, IA-020 |
| M09 | drop `technology:es` hreflang group | `IA-040` | exit 1, IA-040 ×2 |
| M10 | `technology:es` alternate → `pagina-inexistente` | `IA-041` | exit 1, IA-041 |
| M11 | `technology:es` canonical → `/experiencias` | `IA-038` | exit 1, IA-038 |
| M12 | `URL-CART-ES.sitemapMembership=true` | `IA-015` | exit 1, IA-015 |
| M13 | `mareaOverview.live/published=true` | `IA-026` | exit 1, IA-026 |
| M14 | MAREA page allows Product/Offer/AggregateRating + price/availability/rating text | `IA-046` | exit 1, IA-046/047/049 |
| M15 | `mareaFamilyPilot.commercialTransactionAuthorized=true` | `IA-021` | exit 1, IA-021 |
| M16 | AIS metadata claims AIS transmission (ES and EN variants) | must reject | **exit 0 — NOT CAUGHT** |
| M17 | FLEET metadata claims default hardware (ES and EN variants) | must reject | **exit 0 — NOT CAUGHT** |
| M18 | `GATE-IP-CLEARANCE.sourceStatus=CLOSED_VERIFIED` | `IA-056` | exit 1, IA-056 ×2 |
| M19 | `WEB-001.status=REMEDIATED` | `IA-059` | exit 1, IA-059 |
| M20 | `SEARCH_CONSOLE_VERIFIED` evidence class | `IA-018` | exit 1, IA-018 ×2 |
| M21 | handoff `MC16_STARTED=true` | `IA-062` | exit 1, IA-062 |

19/21 mutations fail for the intended reason. **M16 and M17 pass validation (exit 0)**: the
validator has no rule for the `AIS_TRANSMISSION_OFFERED=false` and `FLEET_DEFAULT_HARDWARE=false`
hard restrictions, although both are inherited legal/product constraints. This is finding IA-02.

## 15. Inherited regression suites

All commands were run in the working tree at `b70d550` with the frozen source (no implementation
file modified by the auditor). Results:

| Command | Result | Note |
|---|---|---|
| `npm run test:i18n` | PASS | foundation + server-rendering checks |
| `npm run test:commerce` | PASS | commerce integration checks |
| `npm run test:seo` | PASS | “SEO checks passed: 101 sitemap URLs…” |
| `npm run test:backup` | PASS | backup/restore integrity |
| `npm run test:legal-commercial` | PASS | 54/54 |
| `npm run test:legal-commercial:unit` | PASS | exit 0 |
| `npm run test:financial` | **FAIL (pre-existing)** | V-18: registry row 14 is not PLANNED |
| `npm run test:financial:unit` | **FAIL (pre-existing)** | 1 failing positive control, same V-18 |
| `npm run test:economics` | PASS | 0 discrepancies |
| `npm run test:economics:unit` | PASS | exit 0 |
| `npm run test:hardware` | PASS | 54/54 |
| `npm run test:hardware:unit` | PASS | exit 0 |
| `npm run test:products` | PASS | 52/52, 51/51 files |
| `npm run test:products:unit` | PASS | exit 0 |
| `npm run test:bundles` | PASS | 35/35, 6 bundles |
| `npm run test:bundles:unit` | PASS | exit 0 |
| `npm run test:brand` | PASS | 21/21, 24 files |
| `npm run test:brand:unit` | PASS | exit 0 |
| `npm run test:market` | PASS | 40/40 |
| `npm run test:market:unit` | PASS | exit 0 |
| `npm run test:customer-research` | PASS | 62/62 |
| `npm run test:customer-research:unit` | PASS | exit 0 |
| `npm run test:customer-recovery` | PASS | 32/32 |
| `npm run test:customer-recovery:unit` | PASS | exit 0 |
| `npm run test:ia-seo` | PASS | 19 datasets / 21 routes / 23 proposed / 34 findings / 13 gates |
| `npm run test:ia-seo:unit` | PASS | 54/54 |
| `npm run format:check` | PASS | all files Prettier-clean |
| `npm run build` | PASS | `dist/embarcarte` produced |
| `npm run test:e2e` | PASS | 15/15 Chromium |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `git diff --check` | PASS | no whitespace errors |

**Pre-existing financial failure (not an MC-15 regression).** `MASTER-PROMPT-REGISTRY.md` row 14
was changed from `PLANNED` to `PARTIAL` in MC-14 record commit `2626853`, i.e. before the MC-15
base `e0be1e4`; `git show e0be1e4:docs/marea/execution/MASTER-PROMPT-REGISTRY.md` already contains
`PARTIAL`, while the MC-13-era validator `scripts/check-marea-financial-model.mjs` (V-18) still
requires `PLANNED`. MC-15 changes no financial file (changed-file inventory above), so the failure
is inherited and must be fixed by the owner of the MC-13 financial gate, not hidden inside MC-15.

**Environment note (not a pass/fail gate):** the first `npm run test:seo` run hit a stale local SSR
process holding port 4323 (`node dist/embarcarte/server/server.mjs`, started at 22:19:21 before this
audit, no admin env), which answered the health check and returned 401 for the fixture login. After
terminating that disposable test server, `npm run test:seo` passed with the inherited 101-URL
fixture observation. This is test-environment hygiene, not an MC-15 code defect (finding IA-08).

## 16. Live-change and publication verification

- no change to `src/`, `public/robots.txt`, the sitemap generator, route registry, checkout,
  prices, product data or customer-facing copy: `git diff e0be1e4 b70d550 -- src public .github`
  is empty and the frozen tree produces the unchanged 98/101 sitemap, redirects and canonical map;
- no brand publication: `git grep -i marea -- src public` returns nothing; the served HTML contains
  no `MAREA`; proposed metadata uses `{{familyName}}` / `{{approvedBrand}}` placeholders, and the
  literal token appears only in internal class ids;
- no sitemap submission, Search Console action, deployment, DNS/CDN change, merge or MC-16 start;
  the production database was never touched (isolated temporary `DATA_DIR` only).

## 17. Findings

| ID | Severity | Summary | Owner |
|---|---|---|---|
| IA-01 | **MAJOR** | `proposed-routes.json` / `proposed-ia.json` blocking gates disagree with D13 §6 and `routeGateMatrix` on 11/23 routes | legal-governance + ia-content |
| IA-02 | **MAJOR** | validator does not reject AIS-transmission or FLEET-default-hardware claims (mutations M16/M17 pass) | Lead (D19) |
| IA-03 | MINOR | `current-routes.json` `shop.sitemapExpected=false` contradicts D02 §3 and sitemap membership | route-architect |
| IA-04 | MINOR | D07 recorded “404 with no Location header” for unknown legacy slugs; local SSR returns 404 **with** `Location` and an empty body | seo-migration |
| IA-05 | MINOR | `manifest.reviewedCommit=PENDING_FREEZE` and the review-findings entry pin the audit scaffold; stale after D20 | programme-lead |
| IA-06 | INFORMATIONAL | 4 `NON_PAGE_SURFACE` urlIds are not registered in `current-urls.json` (documented in D02 §2.3) | route-architect |
| IA-07 | INFORMATIONAL | `url-evidence.json` has no `LOCAL_SSR_VERIFIED` rows although four datasets claim that class (observations are inline and reproducible) | seo-migration |
| IA-08 | INFORMATIONAL | stale local test server on port 4323 had to be cleared before `test:seo`; test harness hygiene | Lead (test harness) |

Full machine-readable records (reproduction, evidence, required correction, status,
`correctionCommit`, `auditorReverification`) are in `data/review-findings.json`.

### IA-01 — conflicting blocking-gate assignment (MAJOR)

D05 §2.1 (`MC15-PROPOSED-ROUTE-REGISTRY.md:77-107`) and `gateDerivation` in
`proposed-routes.json` derive family/bundle gates from the source `productFamilyIds`/`bundleIds`
lists; D13 §6 (`MC15-LEGAL-COMMERCIAL-PUBLICATION-GATES.md:142-150`) declares the
`routeGateMatrix` the exact `blockingGateIds` per route and applies page-type scope with an
explicit PROTECT/FLEET composition note. The two derivations conflict on 11 of 23 routes:
`mareaOverview` 13 vs 4, `mareaFamilyWeather` 9 vs 10, `mareaSolutionStart`/`Cruise` 11 vs 12,
`mareaSolutionSail` 12 vs 13, `mareaSolutionProtect` 12 vs 11, `mareaConfigurator` 12 vs 5,
`professionals`/`installers` 5 vs 6, `support` 5 vs 6, `productDocumentation` 7 vs 7 with a
different composition. `proposed-routes.json` and `proposed-ia.json` agree with each other and
disagree with the matrix, so an implementer can read either the over-blocking list (e.g.
`mareaOverview` carrying PRICING/PAYMENTS/SAFETY) or the under-blocking list (e.g. solutions
missing PRIVACY, WEATHER missing MARKET-PLACEMENT, professionals missing PRIVACY). The validator
checks only that the ids exist, never that the datasets agree. Required correction: one
authoritative derivation (or two explicitly named, non-overlapping fields with a documented
relationship), regenerate both datasets and both documents, and add a validator equality rule.
No gate is cleared by this finding.

### IA-02 — unenforced AIS/FLEET hard restrictions (MAJOR)

`FORBIDDEN_PUBLIC_CLAIM` (`scripts/check-marea-ia-seo.mjs:195-197`) has no token for AIS
transmission or default FLEET hardware, so a proposed-page description claiming “AIS transmission
… 30 nautical miles” or “FLEET ships with default hardware” passes the validator (exit 0, both ES
and EN), even though `publication-gates.hardRestrictions` records
`AIS_TRANSMISSION_OFFERED=false` and `FLEET_DEFAULT_HARDWARE=false`. Required correction: add
explicit forbidden-token checks and unit tests for both restrictions (and any other
`hardRestrictions` value that is a claim, not a status), then re-run the mutation set.

## 18. Verdict at `b70d550` and re-verification conditions (superseded by §19)

**Verdict at `b70d550`: NEEDS_REVISION.** No BLOCKING finding and no live/publication defect was
found; the route inventory, URL preservation, redirect map, canonical/hreflang,
sitemap/indexation, structured-data restrictions, 34-finding mapping, 13 gates / 24 documents /
23 matrix rows, nine families / six bundles / 26 editions, MC-16-not-started and the
no-live-change boundary all hold under independent reproduction. However, the two MAJOR findings
above had to be corrected and independently re-verified before MC-15 could be accepted or any
downstream MC-16 planning started.

Re-verification was required for: IA-01 (the corrected datasets/docs and an equality check),
IA-02 (new validator rules that make M16/M17 fail for the intended reason), IA-03, IA-04 and
IA-05 (corrected observations/metadata). IA-06…IA-08 are informational and do not block
acceptance, but must be retained as disclosed limitations. The re-verification must use the same
commands and reproducibility standard as this review and must not treat a build, a local test pass
or a validator run as publication or indexation evidence.

## 19. Re-verification of correction commit `d1d7a1a` (operative verdict: PASS)

### 19.1 Correction commit and boundary

```text
git rev-parse HEAD                         -> d1d7a1a848fb2a82334811aad9b916d4041cd4a2
git log --oneline -2                       -> d1d7a1a fix(mc15): apply independent audit corrections IA-01..IA-05
                                              b70d550 feat(mc15): bilingual IA, SEO route registry, redirect map and publication gates
git merge-base e0be1e4 d1d7a1a             -> e0be1e457456a401a529e1912770e07ed9a863e4
git diff --name-only b70d550 d1d7a1a -- src public .github -> (empty)
git diff --name-only b70d550 d1d7a1a | where { $_ -notmatch '^docs/' } -> scripts/check-marea-ia-seo.mjs, scripts/check-marea-ia-seo.test.mjs
```

15 files changed: 6 MC-15 documents, 8 MC-15 datasets (including `manifest.json`,
`review-findings.json` and the two audit-updated datasets) and the validator + its unit suite.
No `src/`, `public/`, `.github/`, `package.json`, dependency, deployment, checkout, price,
redirect, sitemap, robots or live-SEO file changed. `git status --porcelain` shows only the
untracked `.agent-teams/` state at the start of the re-verification and only this review's two
in-scope files at the end.

### 19.2 Per-finding re-verification

| Finding | Severity | Status | Re-verification evidence |
|---|---|---|---|
| IA-01 | MAJOR | **CLOSED_VERIFIED** | 23/23 route sets equal across `proposed-routes`, `proposed-ia` and `routeGateMatrix`; each new set is exactly the sorted union of the three pre-correction sets; 0 gates removed (no relaxation); 13 gates still 12 BLOCKED + 1 EVIDENCE_REQUIRED, 0 closed; matrix gate/evidence/document ids resolve (0 errors); D05 matrix and D13 §6 counts match all 23 dataset counts (23/23). D05 §2.1 + D13 §5/§6 + `gateDerivation` document the sorted union as deliberately conservative. Validator `IA-068` + unit test. |
| IA-02 | MAJOR | **CLOSED_VERIFIED** | Validator now rejects AIS transmission/transponder and FLEET default/included hardware with `IA-069`; the auditor re-ran the original ES and EN claims and both fail (`mareaFamilyAis:es`/`:en` and `mareaFamilyFleet:es`/`:en`). Unit suite includes an AIS ES test and a FLEET EN test; 58/58 tests pass. Full 21-mutation set now 21/21 rejected for the intended reason. |
| IA-03 | MINOR | **CLOSED_VERIFIED** | `current-routes.json` `shop.sitemapExpected=true`; `current-urls` both shop rows `MEMBER_SERVER_LIST`; 98-URL baseline includes `/tienda` + `/en/shop`; direct mutation (set false) fails with `IA-070`; unit suite includes the IA-070 test. |
| IA-04 | MINOR | **CLOSED_VERIFIED** | `redirect-map.json`, D07 and D02 O-09 now record `/productos/does-not-exist` as `404` **with** `Location: /tecnologia/does-not-exist` and an empty body, explicitly not a 3xx. Independently reproduced on an isolated SSR run on port 4455 (fresh build, disposable `DATA_DIR`): status 404, `location=/tecnologia/does-not-exist`, body length 0, no noindex meta; the three legacy 301s stay one-hop. |
| IA-05 | MINOR | **CLOSED_VERIFIED** | `manifest.json` regenerated at `d1d7a1a`: 18/18 dataset sha256 and byte counts match the correction tree (including `review-findings` 16299 bytes), items counts match, `reviewedCommit=b70d550` truthfully names the last completed review, `reviewStatus` of that audit record is `NEEDS_REVISION` and this re-verification now supersedes it. The Lead's final manifest regeneration after this verdict is the expected delivery step (set `reviewedCommit=d1d7a1a`, new review-findings hash, `reviewStatus=PASS`); the current state is not misleading. |
| IA-06 | INFORMATIONAL | OPEN — accepted observation | Four `NON_PAGE_SURFACE` urlIds remain outside `current-urls.json`; D02 §2.3 documents them deliberately. No correction required; retained as a disclosed limitation. |
| IA-07 | INFORMATIONAL | OPEN — accepted observation | `url-evidence.json` still carries repository-only evidence while four datasets claim `LOCAL_SSR_VERIFIED`; the observations are inline and were reproduced again (98/101, redirects, canonical). No correction required beyond the correction commit. |
| IA-08 | INFORMATIONAL | OPEN — accepted observation | The stale port-4323 test server was a local environment condition, not an MC-15 code/data defect. Port 4323 was free for this re-verification and `test:seo` passed first time. No correction required. |

No finding was closed on a summary: every `CLOSED_VERIFIED` item above has a reproduced command
result in this section or in §19.3–§19.5.

### 19.3 Test matrix (correction commit)

All required commands were re-run at `d1d7a1a`. 31 commands executed: **29 passed, 2 failed
(pre-existing inherited baseline), 0 blocked**.

| Command | Result | Evidence |
|---|---|---|
| `npm run test:ia-seo` | PASS | 19 datasets, 21 current routes, 23 proposed routes, 34 findings, 13 gates |
| `npm run test:ia-seo:unit` | PASS | 58/58 (54 original + 4 correction tests) |
| `npm run test:i18n` | PASS | foundation + server-rendering checks |
| `npm run test:commerce` | PASS | commerce integration checks |
| `npm run test:seo` | PASS | 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD, private noindex |
| `npm run test:backup` | PASS | backup/restore integrity |
| `npm run test:legal-commercial` | PASS | 54/54 |
| `npm run test:legal-commercial:unit` | PASS | exit 0 |
| `npm run test:financial` | **FAIL (pre-existing)** | V-18: registry row 14 is not PLANNED |
| `npm run test:financial:unit` | **FAIL (pre-existing)** | 1 failing positive control, same V-18 |
| `npm run test:economics` | PASS | 0 discrepancies |
| `npm run test:economics:unit` | PASS | exit 0 |
| `npm run test:hardware` | PASS | 54/54 |
| `npm run test:hardware:unit` | PASS | exit 0 |
| `npm run test:products` | PASS | 52/52, 51/51 files |
| `npm run test:products:unit` | PASS | exit 0 |
| `npm run test:bundles` | PASS | 35/35, 6 bundles |
| `npm run test:bundles:unit` | PASS | exit 0 |
| `npm run test:brand` | PASS | 21/21, 24 files |
| `npm run test:brand:unit` | PASS | exit 0 |
| `npm run test:market` | PASS | 40/40 |
| `npm run test:market:unit` | PASS | exit 0 |
| `npm run test:customer-research` | PASS | 62/62 |
| `npm run test:customer-research:unit` | PASS | exit 0 |
| `npm run test:customer-recovery` | PASS | 32/32 |
| `npm run test:customer-recovery:unit` | PASS | exit 0 |
| `npm run format:check` | PASS | all files Prettier-clean |
| `npm run build` | PASS | `dist/embarcarte` produced |
| `npm run test:e2e` | PASS | 15/15 Chromium |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `git diff --check` | PASS | no whitespace errors |

**Inherited baseline failure (unchanged classification).** `test:financial` and
`test:financial:unit` fail only on V-18: `MASTER-PROMPT-REGISTRY.md` row 14 is `PARTIAL` at the
MC-15 base `e0be1e4` (changed in MC-14 commit `2626853`), while the MC-13-era validator still
requires `PLANNED`. No financial file changed in `b70d550..d1d7a1a`; this is predecessor debt,
not an MC-15 regression and not fixed or hidden by MC-15. Both commands are reported as FAIL, not
PASS and not blocked.

### 19.4 Adversarial mutations (full set re-run)

The same 21 auditor-authored mutations from §14 were re-run against a disposable copy of the
correction tree (`node scripts/check-marea-ia-seo.mjs --root <temp-root>`; clean base exit 0
first). **21/21 now fail for the intended reason**, including the two previously uncaught cases:

```text
M16 AIS transmission, ES + EN  -> exit 1, IA-069 mareaFamilyAis:es / :en implies AIS transmission/transponder capability
M17 FLEET default hardware, ES + EN -> exit 1, IA-069 mareaFamilyFleet:es / :en implies FLEET default/included hardware
IA-03 shop sitemapExpected=false -> exit 1, IA-070 shop has sitemap member URLs but sitemapExpected is not true
```

The other 18 mutations (M01–M15, M18–M21) still fail with their original expected codes
(IA-025, IA-006, IA-012, IA-032/033, IA-033, IA-024, IA-034, IA-020, IA-040, IA-041, IA-038,
IA-015, IA-026, IA-046/047/049, IA-021, IA-056, IA-059, IA-018, IA-062).

### 19.5 Isolated local SSR re-verification

Fresh `npm run build`, disposable `DATA_DIR`, free ports 4455 (empty) and 4456 (2-product
fixture); production data untouched; both servers terminated after the checks.

```text
empty fixture:   /sitemap.xml -> 200, 98 <loc>, x-default 2, no /marea, /admin, /carrito, /en/cart, /muestra or /en/login URL
2-product fixture: /sitemap.xml -> 200, 101 <loc>, x-default 2; product URLs = /tienda/seo-translated, /tienda/seo-solo-es, /en/shop/seo-translated
/marea, /en/marea -> 404, no Location, noindex, follow, no canonical
/open-marine -> 301 /tecnologia; /productos -> 301 /tecnologia; /productos/navegador -> 301 /tecnologia/navegador (one hop)
/productos/does-not-exist -> 404, Location: /tecnologia/does-not-exist, body length 0, no noindex meta (documented inherited behaviour)
/tecnologia canonical https://embarcarte.com/tecnologia, alternates es + en
/tienda/seo-translated -> canonical self, alternates es + en; /tienda/seo-solo-es -> only es alternate;
/en/shop/seo-solo-es -> 200 noindex, self canonical, no alternates
```

No MAREA or private/admin/sample URL appears in either sitemap; the 98/101 figures are local
fixture observations, not production or indexation evidence.

### 19.6 Boundary and integrity checks

- `git diff --name-only b70d550 d1d7a1a -- src public .github` is empty; no live route, redirect,
  sitemap, robots, SEO, checkout or price change, no dependency change, no deployment artefact.
- 34/34 MC-14 findings remain `originalStatus=NOT_REMEDIATED` and `status=PLANNED_NOT_REMEDIATED`
  (0 closed); 13/13 gates consumed with 12 `BLOCKED` + 1 `EVIDENCE_REQUIRED`, 0 closed; 24/24
  documents still 0 executed.
- `MC16_STARTED=false` in every dataset and in the manifest; no MC-16 execution, deployment,
  publication, merge, sitemap submission or external contact was performed.
- No dataset claims `SEARCH_CONSOLE_VERIFIED` or `GOOGLE_INDEXED`; indexation remains
  `INDEXATION_UNVERIFIED`.

### 19.7 Residual observations (non-blocking)

1. **IA-06 accepted:** the four `NON_PAGE_SURFACE` urlIds stay outside `current-urls.json` by
   documented design (D02 §2.3); machine-checking them would need a small surface allowlist.
2. **IA-07 accepted:** `url-evidence.json` remains repository-only; the local-SSR observations
   are inline in the datasets and were reproduced again, but they are not keyed in the central
   evidence registry.
3. **IA-08 accepted:** the port-4323 collision was a local leftover test server, not a repo
   defect; port hygiene remains an operational recommendation for the inherited harness.
4. **Lead delivery step:** one final `manifest.json` regeneration after this verdict should set
   `reviewedCommit=d1d7a1a`, refresh the `review-findings` hash/bytes/items and set the audit
   `reviewStatus=PASS`; the current manifest correctly matches the correction tree and is not
   misleading.
5. The inherited `test:financial` V-18 failure remains predecessor debt owned by the MC-13
   financial gate; it is not an MC-15 regression and must not be hidden in MC-15.
6. **Observation only, non-blocking:** `routeGateMatrix.requiredEvidenceIds` is the exact union of
   the blocking gates' evidence ids, but `requiredDocumentIds` is a route-specific mapping rather
   than a strict union (for the routes carrying `GATE-MARKET-PLACEMENT`, `DOC-03` and `DOC-18` are
   omitted; some family routes add `DOC-12`). Every id resolves, all 24 documents remain required
   package-wide and no gate is cleared, so this does not block acceptance; a future revision should
   either document the route-document applicability rule or derive the lists mechanically. This was
   not one of the original audit findings and is not counted as an open finding.

### 19.8 Final verdict

**Verdict: PASS.** All five corrected findings (IA-01…IA-05) are verified closed against
`d1d7a1a` with independently reproduced evidence; no BLOCKING, MAJOR or MINOR finding remains
open. Only the three informational observations IA-06…IA-08 remain, explicitly accepted and
non-blocking. The internal IA/SEO planning package is accepted at the planning level only:
publication, indexation, deployment, live route/redirect/SEO changes, merge and MC-16 remain
**NOT_AUTHORIZED / NOT_EXECUTED**, and no Search Console or Google-indexation evidence is claimed.

Re-verification standard for the future: any change after `d1d7a1a` requires a new commit, a new
independent check against the same commands and mutation set, and a fresh manifest regeneration;
a build, a local test pass or a validator run is never evidence of publication or indexation.
