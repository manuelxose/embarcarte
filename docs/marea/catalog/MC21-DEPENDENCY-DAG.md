# MC-21 — Dependency DAG

## 1. MC-19 is NOT a dependency

MC-20 branched from the MC-18 delivery HEAD `3490c0f`; MC-19 implementation (`37921a9`, PR #27)
was explicitly excluded (decision D-081). MC-21 branched from the MC-20 delivery HEAD `115a1ac`
and inherits the same exclusion: **no MC-19 code, route or page is incorporated**. MC-21 depends
on **MC-20** and **MC-02** only (registry row 21: `20, 02`).

## 2. Reused unchanged vs changed

**Verified-reusable unchanged (no fork):**
- `src/app/marea-catalog/catalog-page.ts` — one-tree page shell (11 section hosts).
- `src/app/marea-catalog/sections/*.ts` — eleven data-driven sections, zero per-family branch.
- `src/app/marea-catalog/data/catalog-domain.ts` — readiness-tone adapter, fail-closed.
- `src/app/marea-catalog/content/content.types.ts` — frozen `CatalogFamilyContent` contract.
- `src/app/marea-design-system/**` — MC-17 components + `commerce-presentation.adapter.ts`
  (`FAMILY_LIMIT_KEYS` already maps SENSE/WATCH/WEATHER).
- `src/app/marea-landing/**` — MC-18 landing frame (read-only, byte-identical).
- `preview/landing/app.routes.ts` + `app.routes.server.ts` — derive from `CATALOG_PREVIEW_ROUTES`
  and auto-extend to 12 routes (no edit).
- `angular.json` — `marea-landing-preview` project unchanged.

**Changed (in scope, all under the MC-21 write scope):**
- `scripts/build-mc20-catalog-data.mjs` — multi-batch (02+03) product-definition reads; six-family
  scope; SENSE 8-edition bound; deterministic `--check`.
- `scripts/check-mc20-catalog.mjs` — six-family SCOPE, `BASE_COMMIT = 115a1ac`, MC21-01…10 checks.
- `scripts/check-mc20-catalog.test.mjs` — 33 tests incl. eight-provider negative controls (F-1).
- `scripts/mc20-catalog-guards.mjs` — `NAMED_PROVIDER_MARKERS` 8 providers + word-boundary match.
- `src/app/marea-catalog/content/{weather,sense,watch}.ts` (new) + `index.ts` + `shared.ts`.
- `src/app/marea-catalog/models/catalog-identity.ts` + `catalog-view.ts`.
- `src/app/marea-catalog/data/catalog.generated.ts` (regenerated: 6 families, 18 editions).
- `preview/landing/catalog-preview.ts` (fallback family) + `server.ts` (log string).
- `e2e/catalog/catalog.spec.ts` (12 routes, batch-2 assertions).
- `package.json` (MC-21 aliases + format coverage).
- `docs/marea/catalog/**` (MC21-* records + data projections + evidence).

## 3. Phase DAG

```text
DISCOVERY (t1 scope, t2 product truth)
   └─> IMPLEMENTATION (t3 six-family tree)
         └─> VERIFICATION (t5 independent verifier; 50/50, 60/60, build 0 identifiers)
               └─> REPAIR (t6 F-1 named-provider guard)  ── loop cap 2, F-1 closed
                     └─> REVIEW (t7 independent review, verdict pass 0 findings)
                           └─> INTEGRATION/RECORD (t8 this record set)
                                 └─> EXTERNAL AUDIT (Claude Opus 5.5, static-only) → NEEDS_REVISION
                                       └─> REPAIR XA-01..XA-04, XA-09..XA-11 (t9, f7d3a3a)
                                             └─> EXTERNAL RE-AUDIT (Claude Sonnet 5.5) → delivery record
```

No phase gate is skipped: t5 verification failed nothing new, t6 closed the single medium finding
F-1, t7 re-verified the integrated candidate, the external audit then found seven further defects
(including two live inaccuracies), t9 repaired them and the captain re-measured every gate. The
delivery record is the Lead's responsibility and is intentionally not produced here.
