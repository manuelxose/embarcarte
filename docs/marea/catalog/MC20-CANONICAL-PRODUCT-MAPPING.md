# MC-20 — Canonical product mapping

Single source of truth: MC-16 canonical commerce data and the MC-05 batch-01 product
definitions. The machine-readable projection is
`docs/marea/catalog/data/catalog-projection.json`; the identity map is
`docs/marea/catalog/data/catalog-canonical-mapping.json`.

## 1. Inputs consumed (read-only)

| Dataset | Field used | Projection field |
| --- | --- | --- |
| `docs/marea/commerce-data/data/product-families.json` | `familyId`, `displayName`, `productType`, `lifecycleState`, `readiness`, `editionIds`, `routeId`, `releaseGateDependencies` | `CATALOG_FAMILIES[*]` |
| `docs/marea/commerce-data/data/product-editions.json` | `editionId`, `editionType`, `definitionStatus`, `requiresQuotation`, `merchantable`, `priceApproved`, `merchantSkuCode`, `featureDefinitions` | `CATALOG_EDITIONS` |
| `docs/marea/commerce-data/data/bundle-compositions.json` | `bundleId`, `displayName`, `routeId`, component `inclusion` | `CATALOG_FAMILIES[*].bundleInclusions` |
| `docs/marea/commerce-data/data/readiness-dimensions.json` | `dimension`, `currentStatus` | `CATALOG_READINESS_DIMENSIONS` |
| `docs/marea/information-architecture/data/proposed-routes.json` | `status`, `publicationAuthorized`, `indexationAuthorized`, `implementationReady`, `collisionStatus`, `es`, `en` | `CATALOG_FAMILIES[*].proposedRoute` |
| `docs/marea/legal-commercial/data/release-evidence-gates.json` | gate count, closed count, documents | `CATALOG_DOMAIN_FACTS` |
| `docs/marea/legal-commercial/data/claims-policy.json` | `claimsCatalogued`, `publicAuthorized` | `CATALOG_DOMAIN_FACTS` |
| `docs/marea/products/product-definitions.batch-01.json` | 24 fields per product, `globalRestrictions` | editorial content with source references |

## 2. Family map

### NAV — software navigation family

- Editions: `NAV-ESSENTIAL`, `NAV-PRO` (`SOFTWARE_SUBSCRIPTION`).
- Hardware: not applicable.
- Bundles: START (NAV-PRO, included), CRUISE (NAV-ESSENTIAL, included), SAIL (NAV-PRO, included), COMPLETE (NAV-PRO, included).
- Readiness: definition complete target specification; engineering partially verified; every commercial dimension not ready.
- Catalogue page: 6 capabilities, 6 limitations, 6 interfaces, 4 composition groups, 2 editions, 5 documents.

### HUB — onboard data gateway (hardware)

- Editions: `HUB-STANDARD`, `HUB-PRO` (`HARDWARE_DEVICE`).
- Hardware: `NOT_SELECTED`; BOM not frozen; no port, radio, processor, power or dimension is published.
- Bundles: START, CRUISE, SAIL (HUB-STANDARD, included), PROTECT (HUB-STANDARD, optional), COMPLETE (HUB-PRO, included), FLEET (HUB-STANDARD, optional).
- Catalogue page: 6 capabilities, 6 limitations, 6 interfaces, 4 composition groups, 2 editions, 5 documents.

### AIS — receive-only receiver (hardware)

- Editions: `AIS-RECEIVER`, `AIS-CONNECTED` (`HARDWARE_DEVICE`; the second is `CONDITIONAL`).
- Receive-only: `AIS_TRANSMISSION_OFFERED = false`; not a transponder, not DSC, not collision avoidance, not navigation.
- Bundles: CRUISE (AIS-RECEIVER, included), COMPLETE (AIS-RECEIVER, optional).
- Licensing: external GPL-3.0 decoder (AIS-catcher) unresolved under DEC-04; distribution is blocked.
- Catalogue page: 6 capabilities, 7 limitations, 5 interfaces, 4 composition groups, 2 editions, 5 documents.

## 3. What the catalogue never does with this data

- It never promotes a status: `NOT_FOR_SALE`, `INTERNAL_ONLY`, `NOT_SELECTED`, `NOT_CLEARED`
  are rendered as they are.
- It never turns an edition into a SKU: `merchantSkuCode = null`, `merchantable = false`,
  `priceApproved = false` for all six editions.
- It never turns a bundle relationship into availability: every bundle is `NOT_FOR_SALE`,
  not orderable and not checkout-enabled.
- It never claims tested compatibility: the tested row count is 0 and the compatibility
  notice fails closed.
- It never states a price, including the MC-05 AIS price hypotheses.

## 4. Determinism

`node scripts/build-mc20-catalog-data.mjs` reads the datasets, asserts canonical invariants
(9 families, 26 editions, 6 bundles, 13 gates, all `NOT_FOR_SALE`, 0 approved prices, 0
merchant SKUs) and emits the projection. `--check` fails when the committed projection is stale.
The generator contains no timestamps and produces byte-identical output on re-run.
