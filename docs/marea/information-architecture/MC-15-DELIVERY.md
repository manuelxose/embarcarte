# MC-15 — Final delivery record

Status: INTERNAL_PLANNING_ONLY
Publication / indexation / live migration / deployment: NOT_AUTHORIZED
MC16_STARTED: false

## 1. Delivery identity

| Field | Value |
|---|---|
| Milestone | MC-15/36 |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Base | MC-14 HEAD `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Implementation candidate (frozen) | `b70d5500591be63d00ac33b4c1de6c802981b46d` |
| Correction commit (reviewed) | `d1d7a1a848fb2a82334811aad9b916d4041cd4a2` |
| Search Console addendum commit (reviewed) | `ad744e9f5f4d7e71d6c77692f45c3f737032771e` |
| Draft PR | [#22](https://github.com/manuelxose/embarcarte/pull/22) |
| PR base | `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| PR state | OPEN, draft, MERGEABLE, not merged |
| Changed files vs base | 49 (docs/marea/information-architecture, docs/marea/execution, package.json, 2 scripts) |
| Live website files changed | none (`src/`, `public/`, `.github/` diff empty) |
| Merge / deploy / publication / sitemap submission | NO / NO / NO / NO |
| MC-16 execution | none (`MC16_STARTED = false` everywhere) |

## 2. Final verdict

```text
MC15_VERDICT = PARTIAL
MC15_INTERNAL_IA_SEO_SCOPE = PASS_INTERNAL_IA_SEO_SCOPE
MC15_INDEPENDENT_REVIEW = PASS after corrections (d1d7a1a)
MC15_SEARCH_CONSOLE_REVIEW = PASS (addendum ad744e9); C-01/C-02 CLOSED_VERIFIED; GSC-01/GSC-02 OPEN pre-existing operational debt
MC15_INDEXATION_EVIDENCE = SEARCH_CONSOLE_VERIFIED_PARTIAL_24_URLS
```

The internal planning scope is PASS. The overall milestone is PARTIAL because the
external indexation evidence is **partial** (24 URL inspections, not the 98-URL
census), the live migration/publication is not authorized, and the inherited
`test:financial` V-18 failure is pre-existing at the MC-14 baseline (registry row
14 `PARTIAL` since `2626853`, financial validator unchanged by MC-15). Search
Console confirms 16 of 24 inspected URLs as indexed; `/traslados` is a pre-existing
operational gap (`GSC-01`) and the root URL is submitted as an invalid sitemap
(`GSC-02`).

## 3. Deliverables

| ID | Deliverable | Path |
|---|---|---|
| D01 | Baseline and governance | `MC-15-BASELINE-AND-GOVERNANCE.md` |
| D02 | Current URL and route inventory | `MC15-CURRENT-URL-AND-ROUTE-INVENTORY.md` |
| D03 | Existing URL preservation policy | `MC15-EXISTING-URL-PRESERVATION-POLICY.md` |
| D04 | Bilingual information architecture | `MC15-BILINGUAL-INFORMATION-ARCHITECTURE.md` |
| D05 | Proposed route registry | `MC15-PROPOSED-ROUTE-REGISTRY.md` |
| D06 | Slug and entity identity governance | `MC15-SLUG-AND-ENTITY-IDENTITY-GOVERNANCE.md` |
| D07 | Redirect and migration map | `MC15-REDIRECT-AND-MIGRATION-MAP.md` |
| D08 | Canonical and hreflang policy | `MC15-CANONICAL-HREFLANG-POLICY.md` |
| D09 | Sitemap, robots and indexation contract | `MC15-SITEMAP-ROBOTS-INDEXATION-CONTRACT.md` |
| D10 | Structured-data governance | `MC15-STRUCTURED-DATA-GOVERNANCE.md` |
| D11 | Bilingual SEO metadata contract | `MC15-BILINGUAL-SEO-METADATA-CONTRACT.md` |
| D12 | Navigation, breadcrumb and link graph | `MC15-NAVIGATION-BREADCRUMB-LINK-GRAPH.md` |
| D13 | Legal and commercial publication gates | `MC15-LEGAL-COMMERCIAL-PUBLICATION-GATES.md` |
| D14 | Website findings remediation plan | `MC15-WEBSITE-FINDINGS-REMEDIATION-PLAN.md` |
| D15 | Phased SEO migration plan | `MC15-PHASED-SEO-MIGRATION-PLAN.md` |
| D16 | SEO risk and rollback plan | `MC15-SEO-RISK-AND-ROLLBACK-PLAN.md` |
| D17 | MC-16 handoff | `MC15-MC16-HANDOFF.md` |
| D18 | Machine-readable contracts (20 datasets) | `data/*.json` |
| D19 | Deterministic validator and adversarial tests | `scripts/check-marea-ia-seo.mjs`, `scripts/check-marea-ia-seo.test.mjs` |
| D20 | Independent review | `MC15-INDEPENDENT-REVIEW.md`, `data/review-findings.json` |
| D21 | Spanish executive report | `MC15-EXECUTIVE-REPORT-ES.md` |
| D22 | Final delivery record | this file |
| — | Data contract | `MC15-DATA-CONTRACT.md` |
| — | Search Console evidence addendum | `MC15-SEARCH-CONSOLE-EVIDENCE.md`, `data/search-console-evidence.json` |
| — | Search Console independent verification | `MC15-SEARCH-CONSOLE-REVIEW.md`, `data/search-console-review.json` |
| — | Validation snapshot evidence | `data/manifest.json` and the D07/D08/D09 inline observations |

## 4. Verified data

- 21 current RouteIds, 7 admin RouteIds, 141 concrete URLs, 47 evidence records
  (23 repository + 24 Search Console).
- 23 proposed routes, 46 ES/EN patterns, 0 collisions, 45 IA nodes.
- 53 redirect records: 3 existing active 301, 42 KEEP_AS_IS, 7 admin internal,
  1 conditional proposed not active. 0 new redirects for existing Spanish URLs.
- 88 canonical/hreflang rows, 44 pageIds, 15 reciprocal groups, 1 x-default,
  46 blocked proposed rows.
- 14 indexation classes; 0 MAREA sitemap-eligible.
- Search Console: property `sc-domain:embarcarte.com`, 24 URLs inspected,
  16 indexed, 2 noindex, 5 not recognized, 1 public/indexable not indexed
  (`/traslados`), 0 MAREA indexed; `sitemap.xml` 98 submitted / 0 errors; invalid
  root-URL sitemap submission with 1 error; five GSC findings (2 open operational,
  3 accepted informational).
- 9 structured-data types, 45 page identities; 0 MAREA Product/Offer, 0 ratings,
  0 reviews, 0 unauthorized prices.
- 88 bilingual metadata rows; proposed templates contain no literal MAREA brand,
  price, availability, certification, rating or sale language.
- 206 internal-link edges / 103 unique links; 0 orphans, 0 broken references,
  0 breadcrumb cycles, max planned depth 3.
- 13/13 gates, 24/24 documents, 23/23 route gate matrix; 0 gates closed.
- 34/34 MC-14 website findings mapped; 0 remediated; 0 closed; original statuses
  unchanged.
- 7 migration phases, all NOT_EXECUTED; 22 SEO risks; MC-16 handoff with 9
  families, 6 bundles, 26 editions and `MC16_STARTED = false`.

## 5. Verification executed

| Command | Result |
|---|---|
| `npm run test:ia-seo` | PASS (20 datasets including manifest, 21/23 routes, 34 findings, 13 gates) |
| `npm run test:ia-seo:unit` | PASS (63/63) |
| Auditor's independent mutations | 21/21 rejected for the intended reason; Search Console addendum mutations additionally rejected |
| `npm run test:i18n` | PASS |
| `npm run test:commerce` | PASS |
| `npm run test:seo` | PASS (101 fixture sitemap URLs) |
| `npm run test:backup` | PASS |
| `npm run test:legal-commercial` / `:unit` | PASS |
| `npm run test:economics` / `:unit` | PASS |
| `npm run test:hardware` / `:unit` | PASS |
| `npm run test:products` / `:unit` | PASS |
| `npm run test:bundles` / `:unit` | PASS |
| `npm run test:brand` / `:unit` | PASS |
| `npm run test:market` / `:unit` | PASS |
| `npm run test:customer-research` / `:unit` | PASS |
| `npm run test:customer-recovery` / `:unit` | PASS |
| `npm run test:financial` / `:unit` | FAIL — pre-existing inherited V-18 (row 14 PARTIAL since MC-14 `2626853`); not a MC-15 regression |
| `npm run format:check` | PASS |
| `npm run build` | PASS |
| `npm run test:e2e` | PASS (15/15) |
| `npm audit --omit=dev --audit-level=high` | PASS (0 vulnerabilities) |
| `git diff --check` | PASS |
| Search Console read-only | 24 URL inspections + sitemaps captured 2026-11-02 |

Isolated local SSR (built `dist`, disposable `DATA_DIR`, ports 4323/4324/4455):
98 sitemap URLs with an empty catalogue; 101 with the inherited 2-product
fixture; 3 legacy 301s one hop; `/marea` and `/en/marea` 404; private surfaces
`noindex` without canonical/hreflang; `x-default` only on the home pair; unknown
legacy slug 404 + `Location` + empty body (recorded, not changed).

Search Console read-only (refreshed 2026-11-03, `sc-domain:embarcarte.com`): 24 URL
inspections; 16 indexed, 2 excluded by noindex (`/carrito`, `/cuenta`), 5 not
recognized, and 1 public/indexable URL not indexed (`/traslados`; coverage wording
varies between "not recognized" and "discovered, currently not indexed"). `/traslados`
is in the 98-URL sitemap with 0 errors on `sitemap.xml`; the home URL is also
submitted as a sitemap with 1 error (`GSC-02`); 0 MAREA URLs indexed. This is a
partial sample, not a full census.

No blocked or unexecuted check is reported as PASS. Indexation is
`SEARCH_CONSOLE_VERIFIED_PARTIAL` for the 24 inspected URLs and
`INDEXATION_UNVERIFIED` for the rest; no full coverage, ranking or traffic claim
is made.

## 6. Independent review history

| Round | Commit | Verdict | Findings |
|---|---|---|---|
| 1 | `b70d550` | NEEDS_REVISION | 0 BLOCKING, 2 MAJOR (IA-01, IA-02), 3 MINOR (IA-03…IA-05), 3 INFORMATIONAL |
| 2 (corrections applied) | `d1d7a1a` | PASS | 5/5 corrected findings `CLOSED_VERIFIED`; 3 INFORMATIONAL accepted |
| 3 (Search Console addendum) | `ad744e9` | PASS | C-01/C-02 `CLOSED_VERIFIED`; GSC-01/GSC-02 OPEN as pre-existing operational debt outside MC-15 |

Corrections: unified blocking-gate union enforced by validator rule IA-068;
AIS/FLEET hard-restriction guards and tests (IA-069); shop sitemap consistency
(IA-070); exact 404+Location observation; manifest regeneration after PASS.
The auditor authored no implementation file. The Search Console addendum is being
verified by a separate non-authoring reviewer; its verdict is recorded in
`MC15-SEARCH-CONSOLE-REVIEW.md` and `data/search-console-review.json`.

## 7. Preserved status and residual debt

```text
MC14_VERDICT = PARTIAL
MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE = PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PRICE_APPROVED = NONE
MC14_COMMERCIAL_CLAIMS_PUBLICATION = NOT_AUTHORIZED
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
MC16_STARTED = false
```

MC-13 residual debt remains open, unmodified: F-05 (financial contract/check-ID
mapping), F-11 (stress-case per-unit metric semantics), F-14 (CI missing the
financial gate). MC-14's four INFORMATIONAL website findings remain
`NOT_REMEDIATED`; all 34 findings remain unclosed.

## 8. Delivery decision

- No merge.
- No deploy.
- No publication.
- No sitemap submission.
- No live route, redirect, metadata, robots, sitemap, checkout, price or product
  change.
- No MC-16 execution.

The delivery record commit and final HEAD are verified in the final executive
report and in the Git/PR checks recorded with the delivery. Documentation-only
record commits after `d1d7a1a` do not claim to be part of the audited
implementation candidate.
