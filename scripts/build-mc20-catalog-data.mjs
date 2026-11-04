#!/usr/bin/env node
/**
 * MC-20 internal catalogue data generator.
 *
 * Reads the authoritative MC-16 commerce datasets, the MC-15 proposed-route
 * registry, the MC-14 release-gate/claims datasets and the MC-05 product
 * definitions, then emits:
 *   - src/app/marea-catalog/data/catalog.generated.ts (bounded projection used by the UI)
 *   - docs/marea/catalog/data/catalog-projection.json   (machine-readable projection)
 *   - docs/marea/catalog/data/catalog-canonical-mapping.json (identity/edition/bundle map)
 *
 * It never invents product data. Identities, composition, readiness and gate
 * state are copied from the canonical datasets. The generated projection
 * contains no price amount, no stock quantity, no merchant SKU and no customer
 * or vessel data. Every commercial state stays NOT_FOR_SALE.
 *
 * Usage:
 *   node scripts/build-mc20-catalog-data.mjs           # write
 *   node scripts/build-mc20-catalog-data.mjs --check   # verify committed output
 *
 * Deterministic: stable ordering from the canonical datasets, no timestamps.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MC16 = 'docs/marea/commerce-data/data';
const MC15 = 'docs/marea/information-architecture/data';
const MC14 = 'docs/marea/legal-commercial/data';
const MC05 = 'docs/marea/products/product-definitions.batch-01.json';
const OUT_DIR = 'docs/marea/catalog/data';
const TS_OUT = 'src/app/marea-catalog/data/catalog.generated.ts';
const JSON_OUT = `${OUT_DIR}/catalog-projection.json`;
const MAPPING_OUT = `${OUT_DIR}/catalog-canonical-mapping.json`;
const CHECK = process.argv.includes('--check');

const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const problems = [];
const assert = (condition, message) => {
  if (!condition) problems.push(message);
};

// ------------------------------------------------------------------ canonical input
const familiesDoc = readJson(`${MC16}/product-families.json`);
const editionsDoc = readJson(`${MC16}/product-editions.json`);
const bundlesDoc = readJson(`${MC16}/bundle-compositions.json`);
const readinessDoc = readJson(`${MC16}/readiness-dimensions.json`);
const routesDoc = readJson(`${MC15}/proposed-routes.json`);
const gatesDoc = readJson(`${MC14}/release-evidence-gates.json`);
const claimsDoc = readJson(`${MC14}/claims-policy.json`);
const definitionsDoc = readJson(MC05);

const SCOPE_FAMILY_IDS = ['NAV', 'HUB', 'AIS'];
const DIMENSION_IDS = [
  'definition',
  'engineering',
  'licensing',
  'hardware',
  'dataRights',
  'compliance',
  'safety',
  'pricing',
  'brandPublication',
  'operations',
  'availability',
];

// ------------------------------------------------------------------ canonical invariants
assert(familiesDoc.families?.length === 9, 'canonical data must expose 9 families');
assert(editionsDoc.editions?.length === 26, 'canonical data must expose 26 editions');
assert(bundlesDoc.bundles?.length === 6, 'canonical data must expose 6 bundles');
assert(
  readinessDoc.dimensions?.length === 11,
  'canonical data must expose 11 readiness dimensions',
);
assert(
  JSON.stringify(readinessDoc.dimensions.map((entry) => entry.dimension)) ===
    JSON.stringify(DIMENSION_IDS),
  'canonical readiness dimension ids/order changed',
);
assert(
  JSON.stringify(familiesDoc.families.map((entry) => entry.familyId).slice(0, 3)) ===
    JSON.stringify(SCOPE_FAMILY_IDS),
  'the first three canonical families must be NAV, HUB, AIS',
);
assert(
  familiesDoc.families.every((entry) => entry.commercialAvailability === 'NOT_FOR_SALE'),
  'every family must be NOT_FOR_SALE',
);
assert(
  editionsDoc.editions.every(
    (entry) => entry.merchantable === false && entry.priceApproved === false,
  ),
  'no edition may be merchantable or price-approved',
);
assert(
  editionsDoc.editions.every((entry) => entry.merchantSkuCode === null),
  'no edition may carry a merchant SKU code',
);
assert(
  bundlesDoc.bundles.every(
    (entry) => entry.priceApproved === false && entry.fixedPackagePriceEstablished === false,
  ),
  'no bundle may have an approved or fixed price',
);
assert(
  bundlesDoc.bundles.every((entry) => entry.orderable === false && entry.checkoutAllowed === false),
  'no bundle may be orderable or checkout-enabled',
);
assert(gatesDoc.gates?.length === 13, 'canonical data must expose 13 release gates');
assert(
  gatesDoc.gates.every((entry) => entry.status !== 'CLOSED'),
  'no release gate may be closed',
);
assert(claimsDoc.summary?.publicAuthorized === 0, 'no claim may be public-authorized');
assert(definitionsDoc.products?.length === 3, 'MC-05 batch-01 must expose exactly 3 products');
assert(
  JSON.stringify(definitionsDoc.products.map((entry) => entry.id)) ===
    JSON.stringify(SCOPE_FAMILY_IDS),
  'MC-05 batch-01 product order/ids changed',
);
assert(
  definitionsDoc.globalRestrictions?.aisTransmissionOffered === false,
  'the canonical restrictions must keep AIS transmission unoffered',
);
assert(
  definitionsDoc.globalRestrictions?.commercialAvailability === 'NOT_FOR_SALE',
  'the canonical restrictions must keep every product NOT_FOR_SALE',
);
for (const familyId of SCOPE_FAMILY_IDS) {
  const family = familiesDoc.families.find((entry) => entry.familyId === familyId);
  const definition = definitionsDoc.products.find((entry) => entry.id === familyId);
  assert(family, `missing canonical family ${familyId}`);
  assert(definition, `missing MC-05 definition ${familyId}`);
  if (!family || !definition) continue;
  assert(
    family.editionIds.length > 0 && family.editionIds.length <= 3,
    `${familyId} must have between 1 and 3 editions`,
  );
  for (const editionId of family.editionIds) {
    const edition = editionsDoc.editions.find((entry) => entry.editionId === editionId);
    assert(edition, `missing canonical edition ${editionId}`);
    assert(edition?.familyId === familyId, `edition ${editionId} must belong to ${familyId}`);
  }
}

// ------------------------------------------------------------------ projection
const editionRecords = editionsDoc.editions
  .filter((entry) => SCOPE_FAMILY_IDS.includes(entry.familyId))
  .map((entry) => ({
    editionId: entry.editionId,
    familyId: entry.familyId,
    editionType: entry.editionType,
    definitionStatus: entry.definitionStatus,
    requiresQuotation: entry.requiresQuotation,
    merchantable: entry.merchantable,
    priceApproved: entry.priceApproved,
    merchantSkuCode: entry.merchantSkuCode,
    featureKeys: entry.featureDefinitions.map((feature) => feature.featureKey),
    notes: entry.notes,
  }));

const bundleInclusions = (familyId) => {
  const rows = [];
  for (const bundle of bundlesDoc.bundles) {
    const lines = [...(bundle.components ?? []), ...(bundle.optionalComponents ?? [])];
    const match = lines.find((line) => line.familyId === familyId);
    if (!match) continue;
    rows.push({
      bundleId: bundle.bundleId,
      displayName: bundle.displayName,
      customerFacingName: bundle.customerFacingName,
      routeId: bundle.routeId,
      inclusion: match.inclusion,
      lineId: match.lineId,
      editionId: match.editionId,
    });
  }
  return rows;
};

const familyRecords = SCOPE_FAMILY_IDS.map((familyId) => {
  const family = familiesDoc.families.find((entry) => entry.familyId === familyId);
  const route = routesDoc.items.find((entry) => entry.routeId === family.routeId);
  assert(route, `missing MC-15 proposed route for ${familyId}`);
  assert(route?.familyId === familyId, `MC-15 route ${family?.routeId} family mismatch`);
  assert(route?.collisionStatus === 'NO_COLLISION', `${familyId} proposed route must not collide`);
  assert(
    route?.publicationAuthorized === false &&
      route?.indexationAuthorized === false &&
      route?.implementationReady === false,
    `${familyId} proposed route must stay unauthorized, unindexed and not implementation-ready`,
  );
  return {
    familyId,
    displayName: family.displayName,
    productType: family.productType,
    lifecycleState: family.lifecycleState,
    definitionStatus:
      family.readiness.definition === 'COMPLETE_TARGET_SPECIFICATION' ? 'DEFINED' : 'CONDITIONAL',
    publicationState: family.publicationState,
    commercialAvailability: family.commercialAvailability,
    routeId: family.routeId,
    editionIds: family.editionIds,
    engineeringStatus: family.engineeringStatus,
    licensingStatus: family.licensingStatus,
    hardwareStatus: family.hardwareStatus,
    dataRightsStatus: family.dataRightsStatus,
    complianceStatus: family.complianceStatus,
    safetyStatus: family.safetyStatus,
    operationsStatus: family.operationsStatus,
    priceStatus: family.priceStatus,
    brandPublicationStatus: family.brandPublicationStatus,
    readiness: family.readiness,
    releaseGateIds: family.releaseGateDependencies,
    evidenceIds: family.evidenceIds,
    bundleInclusions: bundleInclusions(familyId),
    proposedRoute: {
      routeId: route.routeId,
      pageType: route.pageType,
      entityId: route.entityId,
      es: route.es,
      en: route.en,
      status: route.status,
      publicationStatus: route.publicationStatus,
      publicationAuthorized: route.publicationAuthorized,
      indexationAuthorized: route.indexationAuthorized,
      sitemapEligible: route.sitemapEligible,
      collisionStatus: route.collisionStatus,
    },
  };
});

const facts = {
  families: familyRecords.length,
  editions: editionRecords.length,
  bundlesReferencingScope: new Set(
    familyRecords.flatMap((family) => family.bundleInclusions.map((row) => row.bundleId)),
  ).size,
  readinessDimensions: readinessDoc.dimensions.length,
  releaseGates: gatesDoc.gates.length,
  releaseGatesClosed: gatesDoc.gates.filter((entry) => entry.status === 'CLOSED').length,
  requiredDocuments: gatesDoc.summary?.documents ?? 0,
  documentsExecuted: gatesDoc.summary?.documentsExecuted ?? 0,
  cataloguedClaims: claimsDoc.summary?.claimsCatalogued ?? 0,
  publicAuthorizedClaims: claimsDoc.summary?.publicAuthorized ?? 0,
  approvedPrices: editionsDoc.editions.filter((entry) => entry.priceApproved).length,
  merchantableEditions: editionsDoc.editions.filter((entry) => entry.merchantable).length,
  merchantSkuCodes: editionsDoc.editions.filter((entry) => entry.merchantSkuCode !== null).length,
  verifiedStockRows: 0,
  testedCompatibilityRows: 0,
};

assert(facts.approvedPrices === 0, 'no approved price may exist');
assert(facts.merchantableEditions === 0, 'no merchantable edition may exist');
assert(facts.merchantSkuCodes === 0, 'no merchant SKU code may exist');
assert(facts.publicAuthorizedClaims === 0, 'no public-authorized claim may exist');

// ------------------------------------------------------------------ emit TS
const quote = (value) => JSON.stringify(value);
const list = (values, indent) =>
  values.length === 0
    ? '[]'
    : `[\n${values.map((value) => `${indent}${value},`).join('\n')}\n${indent.slice(2)}]`;

const tsFamilies = familyRecords
  .map((family) => {
    const readiness = DIMENSION_IDS.map(
      (dimension) => `      ${dimension}: ${quote(family.readiness[dimension])},`,
    ).join('\n');
    const bundles = family.bundleInclusions
      .map(
        (row) =>
          `        { bundleId: ${quote(row.bundleId)}, displayName: ${quote(row.displayName)}, routeId: ${quote(row.routeId)}, inclusion: ${quote(row.inclusion)}, editionId: ${quote(row.editionId)} },`,
      )
      .join('\n');
    return `  {
    familyId: ${quote(family.familyId)},
    displayName: ${quote(family.displayName)},
    productType: ${quote(family.productType)},
    lifecycleState: ${quote(family.lifecycleState)},
    definitionStatus: ${quote(family.definitionStatus)},
    publicationState: ${quote(family.publicationState)},
    commercialAvailability: ${quote(family.commercialAvailability)},
    routeId: ${quote(family.routeId)},
    editionIds: ${quote(family.editionIds)},
    engineeringStatus: ${quote(family.engineeringStatus)},
    licensingStatus: ${quote(family.licensingStatus)},
    hardwareStatus: ${quote(family.hardwareStatus)},
    dataRightsStatus: ${quote(family.dataRightsStatus)},
    complianceStatus: ${quote(family.complianceStatus)},
    safetyStatus: ${quote(family.safetyStatus)},
    operationsStatus: ${quote(family.operationsStatus)},
    priceStatus: ${quote(family.priceStatus)},
    brandPublicationStatus: ${quote(family.brandPublicationStatus)},
    readiness: {
${readiness}
    },
    releaseGateIds: ${quote(family.releaseGateIds)},
    evidenceIds: ${quote(family.evidenceIds)},
    bundleInclusions: [
${bundles}
    ],
    proposedRoute: {
      routeId: ${quote(family.proposedRoute.routeId)},
      pageType: ${quote(family.proposedRoute.pageType)},
      entityId: ${quote(family.proposedRoute.entityId)},
      es: ${quote(family.proposedRoute.es)},
      en: ${quote(family.proposedRoute.en)},
      status: ${quote(family.proposedRoute.status)},
      publicationStatus: ${quote(family.proposedRoute.publicationStatus)},
      publicationAuthorized: false,
      indexationAuthorized: false,
      sitemapEligible: false,
      collisionStatus: ${quote(family.proposedRoute.collisionStatus)},
    },
  },`;
  })
  .join('\n');

const tsEditions = editionRecords
  .map(
    (edition) => `  {
    editionId: ${quote(edition.editionId)},
    familyId: ${quote(edition.familyId)},
    editionType: ${quote(edition.editionType)},
    definitionStatus: ${quote(edition.definitionStatus)},
    requiresQuotation: ${edition.requiresQuotation},
    merchantable: ${edition.merchantable},
    priceApproved: ${edition.priceApproved},
    merchantSkuCode: ${quote(edition.merchantSkuCode)},
    featureKeys: ${quote(edition.featureKeys)},
    notes: ${quote(edition.notes)},
  },`,
  )
  .join('\n');

const tsDimensions = readinessDoc.dimensions
  .map(
    (dimension) =>
      `  { dimension: ${quote(dimension.dimension)}, currentStatus: ${quote(dimension.currentStatus)} },`,
  )
  .join('\n');

const ts = `// GENERATED FILE - do not edit by hand.
// Source: ${MC16}/{product-families,product-editions,bundle-compositions,readiness-dimensions}.json,
//         ${MC15}/proposed-routes.json, ${MC14}/{release-evidence-gates,claims-policy}.json
// Generator: node scripts/build-mc20-catalog-data.mjs
// Projection: bounded internal MC-20 catalogue presentation (NAV, HUB, AIS).
// No price, stock, SKU, customer or vessel data. Publication: NOT_AUTHORIZED.
// Every commercial state below is NOT_FOR_SALE and every release gate is open.

export interface CatalogFamilyReadiness {
${DIMENSION_IDS.map((dimension) => `  readonly ${dimension}: string;`).join('\n')}
}

export interface CatalogBundleInclusion {
  readonly bundleId: string;
  readonly displayName: string;
  readonly routeId: string;
  readonly inclusion: string;
  readonly editionId: string;
}

export interface CatalogProposedRoute {
  readonly routeId: string;
  readonly pageType: string;
  readonly entityId: string;
  readonly es: string;
  readonly en: string;
  readonly status: string;
  readonly publicationStatus: string;
  readonly publicationAuthorized: false;
  readonly indexationAuthorized: false;
  readonly sitemapEligible: false;
  readonly collisionStatus: string;
}

export interface CatalogFamilyRecord {
  readonly familyId: string;
  readonly displayName: string;
  readonly productType: string;
  readonly lifecycleState: string;
  readonly definitionStatus: string;
  readonly publicationState: string;
  readonly commercialAvailability: string;
  readonly routeId: string;
  readonly editionIds: readonly string[];
  readonly engineeringStatus: string;
  readonly licensingStatus: string;
  readonly hardwareStatus: string;
  readonly dataRightsStatus: string;
  readonly complianceStatus: string;
  readonly safetyStatus: string;
  readonly operationsStatus: string;
  readonly priceStatus: string;
  readonly brandPublicationStatus: string;
  readonly readiness: CatalogFamilyReadiness;
  readonly releaseGateIds: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly bundleInclusions: readonly CatalogBundleInclusion[];
  readonly proposedRoute: CatalogProposedRoute;
}

export interface CatalogEditionRecord {
  readonly editionId: string;
  readonly familyId: string;
  readonly editionType: string;
  readonly definitionStatus: string;
  readonly requiresQuotation: boolean;
  readonly merchantable: boolean;
  readonly priceApproved: boolean;
  readonly merchantSkuCode: string | null;
  readonly featureKeys: readonly string[];
  readonly notes: string | null;
}

export interface CatalogReadinessDimensionRecord {
  readonly dimension: string;
  readonly currentStatus: string;
}

export interface CatalogDomainFacts {
  readonly families: number;
  readonly editions: number;
  readonly bundlesReferencingScope: number;
  readonly readinessDimensions: number;
  readonly releaseGates: number;
  readonly releaseGatesClosed: number;
  readonly requiredDocuments: number;
  readonly documentsExecuted: number;
  readonly cataloguedClaims: number;
  readonly publicAuthorizedClaims: number;
  readonly approvedPrices: number;
  readonly merchantableEditions: number;
  readonly merchantSkuCodes: number;
  readonly verifiedStockRows: number;
  readonly testedCompatibilityRows: number;
}

export const CATALOG_SCOPE_FAMILY_IDS = ${quote(SCOPE_FAMILY_IDS)} as const;
export type CatalogFamilyId = (typeof CATALOG_SCOPE_FAMILY_IDS)[number];

export const CATALOG_FAMILIES: readonly CatalogFamilyRecord[] = [
${tsFamilies}
];

export const CATALOG_EDITIONS: readonly CatalogEditionRecord[] = [
${tsEditions}
];

export const CATALOG_READINESS_DIMENSIONS: readonly CatalogReadinessDimensionRecord[] = [
${tsDimensions}
];

export const CATALOG_DOMAIN_FACTS: CatalogDomainFacts = {
${Object.entries(facts)
  .map(([key, value]) => `  ${key}: ${value},`)
  .join('\n')}
};
`;

const projectionJson = `${JSON.stringify(
  {
    contractId: 'MC20-CATALOG-PROJECTION',
    contractVersion: '1.0.0',
    milestone: 'MC-20',
    owner: 'MC-20 implementation team',
    generationMethod: 'node scripts/build-mc20-catalog-data.mjs',
    publicationState: 'NOT_AUTHORIZED',
    commercialAvailability: 'NOT_FOR_SALE',
    indexationAuthorized: false,
    publicRoutesRegistered: 0,
    families: familyRecords,
    editions: editionRecords,
    readinessDimensions: readinessDoc.dimensions.map((dimension) => ({
      dimension: dimension.dimension,
      currentStatus: dimension.currentStatus,
    })),
    facts,
  },
  null,
  2,
)}\n`;

const mappingJson = `${JSON.stringify(
  {
    contractId: 'MC20-CANONICAL-MAPPING',
    contractVersion: '1.0.0',
    milestone: 'MC-20',
    owner: 'MC-20 implementation team',
    sourceOfTruth: [
      `${MC16}/product-families.json`,
      `${MC16}/product-editions.json`,
      `${MC16}/bundle-compositions.json`,
      `${MC16}/readiness-dimensions.json`,
      `${MC15}/proposed-routes.json`,
      `${MC14}/release-evidence-gates.json`,
      `${MC14}/claims-policy.json`,
      MC05,
    ],
    families: familyRecords.map((family) => ({
      familyId: family.familyId,
      displayName: family.displayName,
      entityType: 'PRODUCT_FAMILY',
      productType: family.productType,
      routeId: family.routeId,
      editionIds: family.editionIds,
      bundles: family.bundleInclusions.map((row) => ({
        bundleId: row.bundleId,
        inclusion: row.inclusion,
        editionId: row.editionId,
      })),
      proposedPublicPath: family.proposedRoute,
      sourceRefs: [
        `${MC16}/product-families.json#families[familyId=${family.familyId}]`,
        `${MC16}/product-editions.json#editions[familyId=${family.familyId}]`,
        `${MC15}/proposed-routes.json#items[routeId=${family.routeId}]`,
        `${MC05}#products.${family.familyId}`,
      ],
    })),
  },
  null,
  2,
)}\n`;

// ------------------------------------------------------------------ write / check
if (problems.length > 0) {
  console.error('MC-20 catalogue generator — canonical input failed:');
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

const outputs = [
  [TS_OUT, ts],
  [JSON_OUT, projectionJson],
  [MAPPING_OUT, mappingJson],
];

if (CHECK) {
  let failed = false;
  for (const [path, content] of outputs) {
    let current = '';
    try {
      current = readFileSync(resolve(root, path), 'utf8');
    } catch {
      console.error(`MISSING generated file: ${path}`);
      failed = true;
      continue;
    }
    if (current !== content) {
      console.error(`STALE generated file: ${path}`);
      failed = true;
    }
  }
  if (failed) process.exit(1);
  console.log(`MC-20 catalogue data is up to date (${outputs.length} generated files).`);
  process.exit(0);
}

for (const [path, content] of outputs) {
  mkdirSync(dirname(resolve(root, path)), { recursive: true });
  writeFileSync(resolve(root, path), content);
}
console.log(`MC-20 catalogue data generated: ${outputs.length} files.`);
console.log(
  `  families=${facts.families} editions=${facts.editions} bundles=${facts.bundlesReferencingScope} gates=${facts.releaseGates} approvedPrices=${facts.approvedPrices}`,
);
