# MC-21 — Canonical product mapping

Single source of truth: MC-16 canonical commerce data, MC-15 proposed-route registry, and the
MC-06 (batch-02) / MC-07 (batch-03) product definitions. The machine-readable projection is
`docs/marea/catalog/data/catalog-projection.json`; the identity map the generator writes is
`docs/marea/catalog/data/catalog-canonical-mapping.json` (authoritative, do not hand-edit).

## 1. Inputs consumed (read-only)

| Dataset | Field used | Projection field |
| --- | --- | --- |
| `docs/marea/commerce-data/data/product-families.json` | `familyId`, `displayName`, `productType`, `lifecycleState`, `readiness`, `editionIds`, `routeId`, `releaseGateDependencies` | `CATALOG_FAMILIES[*]` |
| `docs/marea/commerce-data/data/product-editions.json` | `editionId`, `editionType`, `definitionStatus`, `merchantable`, `priceApproved`, `merchantSkuCode`, `featureDefinitions` | `CATALOG_EDITIONS` |
| `docs/marea/commerce-data/data/bundle-compositions.json` | `bundleId`, `displayName`, `routeId`, component `inclusion` | `CATALOG_FAMILIES[*].bundleInclusions` |
| `docs/marea/commerce-data/data/readiness-dimensions.json` | `dimension`, `currentStatus` | `CATALOG_READINESS_DIMENSIONS` |
| `docs/marea/information-architecture/data/proposed-routes.json` | `entityId`, `status`, `publicationAuthorized`, `indexationAuthorized`, `collisionStatus`, `es`, `en` | `CATALOG_FAMILIES[*].proposedRoute` |
| `docs/marea/products/product-definitions.batch-02.json` / `.batch-03.json` | 24 fields per product, `globalRestrictions` | editorial content with source refs |

Note: SENSE and WATCH live in batch-02; WEATHER lives in batch-03. The generator reads both
batches plus batch-01 (the handoff's "batch-02" wording was imprecise).

## 2. Family map (six, canonical order)

### NAV / HUB / AIS (batch 1, unchanged from MC-20)
See `MC20-CANONICAL-PRODUCT-MAPPING.md`. Carried into the six-family tree without change.

### SENSE — modular sensing family (hardware)
- entityId `ENT-FAMILY-SENSE`; productType `HARDWARE`; engineering `PARTIALLY_VERIFIED`; safety
  `LOCAL_ALARM_INDEPENDENT`.
- Editions (8): `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`
  (`HARDWARE_MODULE`) + `SENSE-ESSENTIALS`, `SENSE-SAIL`, `SENSE-SYSTEMS` (`HARDWARE_KIT`; kits
  are packaging, not new capability).
- Bundles: SAIL (SENSE-WIND, included), PROTECT (SENSE-ESSENTIALS, included), COMPLETE
  (SENSE-POWER/BILGE/TANKS/ENV, included).
- Route `mareaFamilySense` → `/marea/sense` + `/en/marea/sense`; `NO_COLLISION`,
  `publicationAuthorized=false`. 10 blocking gates (no privacy/DPA, no data-licensing gate).

### WATCH — remote-awareness family (hardware + service)
- entityId `ENT-FAMILY-WATCH`; productType `HARDWARE_SERVICE`; engineering `NOT_VERIFIED`; safety
  `LOCAL_SAFETY_INDEPENDENT`.
- Editions (2): `WATCH-CORE` (`DEFINED`), `WATCH-PLUS` (`CONDITIONAL`), both `HARDWARE_DEVICE`.
- Bundles: PROTECT (WATCH-CORE included, WATCH-PLUS optional), COMPLETE (WATCH-CORE included),
  FLEET (WATCH-CORE included).
- Route `mareaFamilyWatch` → `/marea/watch` + `/en/marea/watch`; 11 blocking gates including
  `GATE-PRIVACY-DPA-DPIA`.

### WEATHER — forecast/data family (software)
- entityId `ENT-FAMILY-WEATHER`; productType `SOFTWARE`; engineering `NOT_VERIFIED`; hardware
  `NOT_APPLICABLE_SOFTWARE_PRODUCT`.
- Editions (2): `WEATHER-STANDARD` (`DEFINED`), `WEATHER-PRO` (`CONDITIONAL`), both
  `SOFTWARE_SUBSCRIPTION`.
- Bundles: START (WEATHER-STANDARD, included), CRUISE (WEATHER-STANDARD, included), COMPLETE
  (WEATHER-PRO, included).
- Route `mareaFamilyWeather` → `/marea/weather` + `/en/marea/weather`; blocking gates include
  `GATE-DATA-LICENSING`.

## 3. What the catalogue never does with this data

- Never promotes a status (`NOT_FOR_SALE`, `INTERNAL_ONLY`, `NOT_SELECTED`, `NOT_CLEARED`,
  `NOT_VERIFIED`, `NOT_GRANTED` are rendered as they are).
- Never turns an edition into a SKU: `merchantSkuCode = null`, `merchantable = false`,
  `priceApproved = false` for all 18 editions.
- Never turns a bundle relationship into availability: every bundle is `NOT_FOR_SALE`.
- Never claims tested compatibility (0 measured rows) or a licensed data provider (none contracted).
- Never states a price, including the MC-06 WATCH/SENSE hypotheses and the MC-07 WEATHER hypotheses.

## 4. Determinism

`node scripts/build-mc20-catalog-data.mjs --check` reads the datasets, asserts canonical
invariants (9 total families, 26 total editions, 6 bundles, gates open, all `NOT_FOR_SALE`) and
emits the six-family projection; it contains no timestamps and is byte-identical on re-run.
