# D16 — SEO risk register and rollback plan (MC-15)

| Field | Value |
|---|---|
| Deliverable | D16 `MC15-SEO-RISK-AND-ROLLBACK-PLAN.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Owner | `seo-migration` |
| Machine data | `data/risk-register.json` (`MAREA-MC15-RISK-REGISTER`) — **22 risks** |
| Related | D07 redirect map, D08 canonical/hreflang, D09 indexation, D15 phases |
| Base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Date | 2026-11-02 |
| Status | `INTERNAL_PLANNING_ONLY` |
| Rollback executed | `NO` |
| Rollback readiness | `PLAN_ONLY — NOT_READY_TO_EXECUTE` |
| MC16_STARTED | `false` |

## 1. Boundary

This document is a **plan**, not an incident and not an execution. No rollback is performed, no
deployment is reverted, no sitemap is restored and no redirect is deactivated in MC-15. Nothing here
authorises a merge, a release or a live SEO change.

The plan exists so that a future authorised phase (D15 Phase 4–6) has a defined way back **before**
anything changes. A rollback plan written during an incident is not a rollback plan.

## 2. Rollback principle: versioned artefacts only, never invented identifiers

Every rollback step names an artefact that can be verified:

| Artefact | What identifies it | What it is *not* |
|---|---|---|
| Source state | git commit SHA on the MC-15 branch | an invented "deployment ID", "release ID" or "build number" |
| Build artefact | checksum of the built server/browser bundle | a fabricated pipeline run identifier |
| Redirect configuration | `data/redirect-map.json` contract version plus the `LOCALIZED_ROUTES`/`app.routes.server.ts` content at a commit SHA | a CDN rule ID that nobody recorded |
| Sitemap state | the captured `/sitemap.xml` body and its URL set at snapshot time | a remembered URL count |
| Canonical/hreflang state | the registry + `pageSeo()` output captured per URL | a hand-edited tag list |
| URL inventory | the Phase 0 snapshot (D15) | a spreadsheet maintained by hand after the fact |
| Database schema | the schema version/migration state of the products store | "the old database" |

**No rollback step in this plan depends on an invented deployment or release identifier.** If a
future pipeline introduces such identifiers, it must record them in the change record at release
time; until then the verifiable identifier is the commit SHA plus the artefact checksum.

## 3. Prerequisite 1 — pre-release URL snapshot

| Aspect | Requirement |
|---|---|
| Contents | Every public URL with: status code, canonical, hreflang set, robots meta, `X-Robots-Tag`, sitemap membership, JSON-LD types, redirect `Location` where applicable |
| Method | Read-only crawl of a reproducible SSR run with a disposable database and the inherited fixture class; no production write |
| Coverage | The 21 current route ids in both locales, the 6 technology details, the 30 guide details, the shop landings, the product URL set at capture time, the private and admin surfaces, the three legacy redirect paths, and the 404 surface |
| Storage | Immutable artefact referenced by D15 Phase 4 and by this plan; corrections are append-only |
| Owner | `PROGRAMME_LEAD` (capture) with `seo-migration` (interpretation) |
| Status today | **NOT CAPTURED.** MC-15 gathered partial local observations (D07/D08/D09, 2026-11-02); they are evidence inputs, not the snapshot |

Without this artefact, "verified rollback" is unfalsifiable: there is nothing to compare against.

## 4. Prerequisite 2 — redirect configuration version

The redirect surface is small and fully enumerable, which is what makes rollback tractable.

| Class | Records | Rollback meaning |
|---|---|---|
| `EXISTING_ACTIVE` | 3 — `/open-marine` → `/tecnologia`, `/productos` → `/tecnologia`, `/productos/:slug` → `/tecnologia/:slug` | Inherited and live. A rollback must **restore and preserve** them exactly; losing one is an incident, not a rollback action. |
| `KEEP_AS_IS` | 42 — every current public route in both locales (21 × 2), status 200, no destination | A rollback must leave them resolving to the same entity with the same status. |
| `INTERNAL_ONLY_NO_REDIRECT` | 7 admin routes | A rollback must never expose or redirect into admin. |
| `PROPOSED_NOT_ACTIVE` | 1 — `/open-marine/:slug` → `/tecnologia/:slug`, `authorizationRequired: true` | Not live. If a rollback finds it active, the incident is "an unauthorised redirect was activated", and the action is to remove it. |
| Non-redirect surfaces | 3 — unknown-path 404, unknown legacy product slug 404, `/api/*` | A rollback must preserve 404 semantics; converting them to 200 or to a redirect is a regression. |

Rollback of a redirect change therefore means: restore the recorded source→destination set at the
recorded commit, and prove set equality — not "remember what it was".

## 5. Prerequisite 3 — previous sitemap state

| Aspect | Requirement |
|---|---|
| Capture | The full `/sitemap.xml` body at snapshot time, stored verbatim with its URL set extracted |
| Comparison | Set equality of `<loc>` values; every difference must be explained by dynamic data (product rows) or by an authorised change |
| Restoration | Rolling back the sitemap means serving the previous URL set from the same generator at the previous commit — **never** hand-editing the XML |
| Known variability | The sitemap is generated from prerendered output plus active products, so product URLs legitimately vary with the database. Preserve the *generator* and the *static surface*; compare the dynamic part separately |
| Status today | **NOT CAPTURED.** The MC-15 observations (98 URLs clean, 101 with two fixtures) show the arithmetic, not a release artefact |

## 6. Prerequisite 4 — canonical and hreflang rollback

Canonical and hreflang are **derived**, not authored: `LOCALIZED_ROUTES` + `pageSeo()` in
`src/app/core/seo.service.ts` produce them, and `SeoService` emits them. Therefore:

| Rule | Statement |
|---|---|
| Revert the source, not the output | A canonical/hreflang rollback reverts the registry or component change; it never hand-edits `<link>` tags in a build |
| Preserved pages | A rollback restores the snapshot's canonical/hreflang exactly: self-referencing absolute canonical per locale, reciprocal groups, one `x-default` on the Spanish home |
| `shopDetail` | ES canonical self; EN canonical only for a translated product; an ES-only product declares no EN alternate — restore that conditional behaviour, never a blanket two-locale pair |
| `shopSample` | noindex with a self canonical observed and **no** alternates |
| Private and admin | no canonical, no hreflang |
| Proposed pages | `BLOCKED_NO_CANONICAL`, no group. A rollback that finds a canonical or a group on a proposed page has found a defect, not a state to preserve |
| Verification | Re-fetch each URL and compare the canonical and alternate set against the snapshot; a mismatch is a failed rollback |

## 7. Prerequisite 5 — application rollback dependencies

| Dependency | Why it matters | Precondition for a reversible release |
|---|---|---|
| Build artefact | The server bundle and browser bundle must be rebuildable from the recorded SHA | Build reproducible from a clean checkout; checksum recorded at release |
| Prerender output | Static pages are emitted at build time; a stale output regenerates old HTML over new routing | Rebuild and re-prerender as one unit, never partially |
| Database state | Product rows drive `shopDetail`, the sitemap and the shop index | Schema version recorded; product data snapshot or a forward-only migration with a documented reverse |
| Environment configuration | `SITE_URL`, canonical host and the `SITE.legal` block change rendered output | Config diff recorded at release; no secret value is copied into a document |
| `uploads/` media | Product images referenced by canonical pages | Media set recorded; deletion is not a rollback |
| Cache headers | A 1-year asset cache and a 1-hour sitemap cache delay a rollback's visibility | Purge procedure named at release time; sitemap cache TTL known |
| `robots.txt` | A static public file; a rollback restores the file content at the recorded commit | Content captured verbatim in the snapshot |

**None of these preconditions is verified today**, which is why rollback readiness is
`PLAN_ONLY — NOT_READY_TO_EXECUTE`.

## 8. Verification against the pre-release URL inventory

A rollback is complete only when this checklist passes against the snapshot.

| Check | Acceptance |
|---|---|
| Preserved URL set | Every preserved URL from the snapshot resolves to the same entity with the same status code |
| Redirect set | Exactly the three inherited 301s active; single hop; identical destinations; no `PROPOSED_NOT_ACTIVE` record active |
| Canonical | Every indexable URL declares the canonical recorded in the snapshot |
| Hreflang | Every group is reciprocal and self-referencing with the same members as the snapshot; `x-default` only on the Spanish home |
| Robots | robots meta and `X-Robots-Tag` match the snapshot per surface; private and admin still noindex; 404 responses still noindex |
| Sitemap | URL set equals the snapshot's static surface; dynamic differences explained; no private, admin, sample or blocked MAREA URL |
| Structured data | JSON-LD parses, types stay in the whitelist, no MAREA `Product`/`Offer`, no price/availability/rating/certification inflation |
| MAREA surface | Every `/marea` and `/en/marea` URL answers 404 and appears in no sitemap, canonical, alternate or navigation |
| Query/fragment | Any redirect specified to preserve a query string still does so; a redirect that never preserved one is not "fixed" by the rollback |

A single failed row means the rollback is **not** complete. Partial rollback is reported as
`PARTIAL`, never as PASS.

## 9. Incident thresholds and ownership

Thresholds are proposals that a human owner must agree **before** the release window (D15 Phase 5
entry criterion). They are not active monitoring rules, because no monitoring exists yet.

| ID | Threshold | Immediate action | Owner |
|---|---|---|---|
| T-01 | Any preserved indexable URL returns non-200 (or a different entity) | Roll back | Incident owner |
| T-02 | Any of the three inherited 301s is lost, changed, looped or made multi-hop | Roll back | `seo-migration` |
| T-03 | Sitemap contains any URL outside the authorised set, or any noindex/private/admin/sample/blocked URL | Roll back | `seo-migration` |
| T-04 | Any `/marea` or `/en/marea` URL answers 200, or appears in a sitemap, canonical, alternate, navigation or metadata | Roll back immediately + brand incident | `COMMERCIAL_DIRECTOR` |
| T-05 | A `Product`/`Offer` node appears for MAREA, or a price/availability/rating/certification claim appears in JSON-LD | Roll back immediately + claims incident | `COMMERCIAL_DIRECTOR` |
| T-06 | A preserved page's canonical points off-site, to another entity, or to a blocked page | Roll back | `seo-migration` |
| T-07 | Hreflang reciprocity broken on two or more clusters, or an invented EN alternate on an ES-only entity | Roll back | `seo-migration` |
| T-08 | Invalid JSON-LD on any released page (parse error or non-whitelisted type) | Roll back, or authorised hotfix if the cause is isolated and reversible | `seo-migration` |
| T-09 | Sustained 5xx on a preserved family beyond the agreed window | Roll back | Incident owner |
| T-10 | Query-string loss on a redirect whose specification requires preservation | Roll back that redirect | `seo-migration` |
| T-11 | Unknown paths start returning 200, or the 404 surface is swallowed into the home page | Roll back | `seo-migration` |
| T-12 | Any unrecorded write (route, redirect, metadata, sitemap, robots) is detected | Stop, record, roll back, escalate | `PROGRAMME_LEAD` |

**Decision authority:** the incident owner executes the technique; the `PROGRAMME_LEAD` authorises
the rollback decision; the `COMMERCIAL_DIRECTOR` is required for any threshold involving a brand,
claim or commercial statement (T-04, T-05). An agent may detect and report, never authorise.

## 10. What must survive any rollback unchanged

These URL families are existing business surfaces. A rollback must leave them resolving to the same
entity with the same status, canonical, hreflang and robots policy as the snapshot.

| Family | URLs | Preservation rule |
|---|---|---|
| Services | `/servicios`, `/en/services` | unchanged status 200, self canonical, reciprocal alternate, no redirect |
| Experiences | `/experiencias`, `/en/experiences` | same |
| Boat transfers (delivery) | `/traslados`, `/en/delivery` | same |
| Guides | `/guias`, `/en/guides` and 30 guide details per locale | same; no guide URL may be retired, merged or redirected |
| Technology | `/tecnologia`, `/en/technology` and 6 details per locale | same; the legacy 301s into this family must keep resolving in one hop |
| Shop | `/tienda`, `/en/shop` and the active product URLs | same; product set may change only through the catalogue, never through a redirect |
| Account (private) | `/acceso`, `/en/login`, `/cuenta`, `/en/account`, `/cuenta/pedidos/:id`, `/en/account/orders/:id` | unchanged, still noindex, still never a redirect target |
| Legal | `/aviso-legal`, `/privacidad`, `/cookies`, `/condiciones-de-venta` and their EN twins | unchanged and still indexable; a rollback must not noindex a legal page |
| Home | `/`, `/en` | unchanged, `x-default` still on the Spanish home |
| Admin (internal) | 7 admin routes | unchanged, noindex, never public |

## 11. Rollback readiness verdict

| Dimension | Verdict | Reason |
|---|---|---|
| Plan completeness | `COMPLETE_AS_PLAN` | prerequisite inventory, techniques, verification checklist, thresholds and ownership are defined |
| Snapshot captured | `NO` | only partial local observations exist (D07/D08/D09) |
| Sitemap state captured | `NO` | arithmetic observed, artefact not captured |
| Redirect configuration version recorded | `PARTIAL` | the redirect map dataset and the registry define the expected set; no release-time version record exists |
| Application rollback dependencies verified | `NO` | no rebuild-from-SHA check, no schema version record, no cache-purge procedure, no media inventory |
| Rehearsal performed | `NO` | D15 Phase 5 requires at least one rehearsal before release |
| Monitoring available | `NO` | no Search Console access; no monitoring harness exists |
| **Overall** | **`PLAN_ONLY — NOT_READY_TO_EXECUTE`** | nothing here authorises a release; the plan is ready to be rehearsed, not executed |

MC-15 deliberately does **not** claim rollback readiness. Claiming it without a snapshot, a
rehearsal and a monitoring source would be exactly the kind of fabricated evidence this programme
prohibits.

## 12. Risk register summary (22 risks)

| Severity | Risks |
|---|---|
| CRITICAL | `SEO-RISK-01` (loss of an indexed Spanish URL), `SEO-RISK-05` (premature MAREA indexation/brand), `SEO-RISK-08` (structured-data claim inflation), `SEO-RISK-18` (rollback depends on unverifiable artefacts) |
| HIGH | `SEO-RISK-02` (redirect chain), `SEO-RISK-03` (redirect loop), `SEO-RISK-04` (cross-locale redirect/canonical), `SEO-RISK-06` (canonical to blocked page), `SEO-RISK-07` (brand-publication bypass), `SEO-RISK-09` (hreflang reciprocity break), `SEO-RISK-11` (sitemap pollution), `SEO-RISK-12` (soft-404), `SEO-RISK-15` (query/fragment loss), `SEO-RISK-16` (redirect to a private page), `SEO-RISK-19` (blocked route exposed by a link), `SEO-RISK-20` (robots.txt misuse), `SEO-RISK-21` (ES/EN claim drift), `SEO-RISK-22` (indexation unmeasurable) |
| MEDIUM | `SEO-RISK-10` (invented EN alternate), `SEO-RISK-13` (crawl-depth regression), `SEO-RISK-14` (invalid JSON-LD), `SEO-RISK-17` (duplicate content) |

| Status | Count | Meaning |
|---|---|---|
| `PLANNED_MITIGATION` | 19 | a specific mitigation exists in D07–D10/D15/D16; none is measured in a live environment |
| `OPEN` | 3 | `SEO-RISK-15` (inherited query loss, unfixed by design), `SEO-RISK-18` (rollback prerequisites unmet), `SEO-RISK-22` (no measurement source) |
| `CLOSED` | 0 | nothing is closed: no failure has been measured absent |

Cross-references: all **13 release gates** and **19 of the 34 MC-14 website findings** appear in the
register against the risks they affect. No finding is closed and no gate is closed.

## 13. What this plan explicitly does not claim

- It does not claim that any redirect, canonical, hreflang or structured-data change is safe to
  deploy; it claims only that a way back is defined.
- It does not claim monitoring exists, that Search Console is available, or that any indexation
  measurement has been taken.
- It does not claim a deployment identifier, a release number, a pipeline run or a change ticket:
  none exists, and inventing one would make the rollback plan unusable.
- It does not authorise a release, a merge, a redirect activation or a publication.
