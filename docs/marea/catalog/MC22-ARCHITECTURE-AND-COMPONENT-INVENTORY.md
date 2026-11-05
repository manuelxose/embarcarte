# MC-22 — Architecture and component inventory

## 1. One component tree, one typed projection, no duplicate truth

The catalogue is a single Angular component tree. The nine-family scope is typed in exactly one place —
`CATALOG_SCOPE_FAMILY_IDS` in `src/app/marea-catalog/data/catalog.generated.ts` — and every consumer
derives from it:

- `src/app/marea-catalog/models/catalog-view.ts` — `CATALOG_PAGE_FAMILIES = CATALOG_SCOPE_FAMILY_IDS`
  (previously a hardcoded six-family literal; now derived, so no second list of truth exists).
- `src/app/marea-catalog/models/catalog-identity.ts` — `CATALOG_IDENTITIES` and `CATALOG_PREVIEW_ROUTES`
  derive from the same scope.
- `src/app/marea-catalog/content/index.ts` — the frozen `CATALOG_CONTENT` map and list register the
  three new family content objects.
- `scripts/check-mc20-catalog.mjs` — `SCOPE` is derived from the projection, not hardcoded.

MC-17 design system reuse without selector forks: the catalogue module reuses the existing
`marea-catalog-page` host and MC-17 components; the unit suite asserts no component fork of an MC-17
selector exists. No new `.component.ts` file was added.

## 2. Files extended

| File | Change |
| --- | --- |
| `src/app/marea-catalog/content/display.ts` | new — DISPLAY bilingual content |
| `src/app/marea-catalog/content/pilot.ts` | new — PILOT bilingual content |
| `src/app/marea-catalog/content/fleet.ts` | new — FLEET bilingual content |
| `src/app/marea-catalog/content/index.ts` | registers DISPLAY/PILOT/FLEET in the frozen map and list |
| `src/app/marea-catalog/content/shared.ts` | family nav + status vocabulary (SIZE_NOT_FROZEN, HARDWARE_NOT_SELECTED, BOM_NOT_ESTABLISHED, NO_SLA_ESTABLISHED) |
| `src/app/marea-catalog/models/catalog-identity.ts` | 3 identities (mareaFamilyDisplay/Pilot/Fleet, ENT-FAMILY-*, slugs, reserved `/marea/{slug}` + `/en/marea/{slug}`, PROPOSED_INTERNAL_NOT_DEPLOYABLE) |
| `src/app/marea-catalog/models/catalog-view.ts` | `CATALOG_PAGE_FAMILIES` derived from the projection |
| `src/app/marea-catalog/data/catalog.generated.ts` | regenerated 9-family / 26-edition projection; ten governance gates unchanged |
| `scripts/build-mc20-catalog-data.mjs` | `SCOPE_FAMILY_IDS` = 9 families; fail-closed batch-3 canonical asserts; projection completeness asserts |
| `scripts/check-mc20-catalog.mjs` | validator: SCOPE from projection, MC20-01 set-equality, MC20-04 26 editions, MC22-01..07 canonical/claims/content checks, MC21-08 gate cross-check vs base |
| `scripts/mc20-catalog-guards.mjs` | prohibited-claim guard: batch-3 families + structural negation model; documented heuristic backstop |
| `scripts/check-mc20-catalog.test.mjs` | unit suite 70 tests (9 families / 26 editions / 18 routes + adversarial matrices) |
| `e2e/catalog/catalog.spec.ts` | 18 preview routes, health endpoint, public-route 404, batch-3 honesty blocks, axe |
| `package.json` | `build:mc22:data`, `check:mc22:data`, `test:mc22`, `test:mc22:unit`, `test:mc22:e2e` |
| `docs/marea/catalog/data/catalog-projection.json` | regenerated projection (9 families, 26 editions, 6 bundles, 11 dims, 13 gates) |
| `docs/marea/catalog/data/catalog-canonical-mapping.json` | regenerated canonical mapping |

## 3. Files deliberately unchanged (isolation proof)

| File | Why unchanged |
| --- | --- |
| `src/app/core/i18n/locale-routes.ts` | public route registry — no public route added |
| `src/app/app.routes.ts`, `src/app/app.routes.server.ts` | public SSR routes unchanged |
| sitemap / robots / SEO files | no indexation signal added |
| `src/app/marea-design-system/**` | MC-17 design system untouched — reuse, no fork |
| `docs/marea/commerce-data/data/product-families.json`, `product-editions.json` | canonical source of truth — read, never rewritten |

The production build still prerenders **96 static public routes** (unchanged from the MC-17/MC-21
baseline), and `grep dist/embarcarte` returns **0** catalogue identifiers — the catalogue exists only
under the loopback `internal/catalog/*` preview.
