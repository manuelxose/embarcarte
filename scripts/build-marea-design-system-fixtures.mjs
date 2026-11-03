#!/usr/bin/env node
/**
 * MC-17 fixture generator.
 *
 * Reads the authoritative MC-16 presentation datasets and emits a *bounded*
 * TypeScript fixture module for the isolated design system:
 *   - no price amount, no stock quantity, no merchant SKU, no customer or vessel data
 *   - identities, definition status, readiness state, bundle composition and
 *     entitlement definitions only (plus synthetic internal summary copy)
 *
 * Usage:
 *   node scripts/build-marea-design-system-fixtures.mjs           # write
 *   node scripts/build-marea-design-system-fixtures.mjs --check   # verify committed output
 *
 * Deterministic: sorted input order is preserved from the MC-16 datasets, no timestamps.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MC16 = 'docs/marea/commerce-data/data';
const OUT = 'src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts';

const readJson = (p) => JSON.parse(readFileSync(resolve(root, MC16, p), 'utf8'));

const families = readJson('product-families.json');
const editions = readJson('product-editions.json');
const bundles = readJson('bundle-compositions.json');
const readiness = readJson('readiness-dimensions.json');
const entitlements = readJson('entitlement-definitions.json');

const problems = [];
const assert = (condition, message) => {
  if (!condition) problems.push(message);
};

assert(families.families?.length === 9, 'MC-16 must expose exactly 9 product families');
assert(editions.editions?.length === 26, 'MC-16 must expose exactly 26 editions');
assert(bundles.bundles?.length === 6, 'MC-16 must expose exactly 6 bundles');
assert(readiness.dimensions?.length === 11, 'MC-16 must expose 11 readiness dimensions');
assert(Array.isArray(entitlements.definitions) && entitlements.definitions.length > 0, 'entitlement definitions are required');

const baseRestrictions = ['PUBLICATION_NOT_AUTHORIZED', 'TRADEMARK_NOT_CLEARED', 'PRICE_NOT_APPROVED', 'STOCK_NOT_VERIFIED'];

function editionDisplayName(editionId) {
  return 'MAREA ' + editionId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const readinessDimensions = readiness.dimensions.map((d) => ({
  dimension: d.dimension,
  label: d.dimension.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
  status: 'NOT_READY',
  note: null,
}));

const readinessSummary = {
  dimensions: readinessDimensions,
  overall: 'NOT_READY',
  blockedGateIds: ['PUBLICATION_NOT_AUTHORIZED'],
};

const fixtureFamilies = families.families.map((family) => {
  const familyEditions = editions.editions.filter((edition) => edition.familyId === family.familyId);
  const restrictions = [...baseRestrictions];
  if (family.safetyStatus === 'BLOCKED' || family.familyId === 'PILOT') restrictions.push('SAFETY_GATE_BLOCKED');
  if (['AIS', 'NAV', 'WEATHER', 'FLEET'].includes(family.familyId)) restrictions.push('LICENSING_NOT_CLEARED');
  if (family.familyId === 'SENSE' || family.familyId === 'WATCH') restrictions.push('COMPATIBILITY_UNTESTED');

  return {
    familyId: family.familyId,
    displayName: family.displayName,
    definitionStatus: family.lifecycleState === 'DEFINED' ? 'DEFINED' : 'CONDITIONAL',
    editionCount: familyEditions.length,
    readiness: 'NOT_READY',
    summary: {
      es: `Definición interna de ${family.displayName}. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.`,
      en: `Internal definition of ${family.displayName}. No public availability, no approved price and no publication authorisation.`,
    },
    restrictions,
    editions: familyEditions.map((edition) => edition.editionId),
  };
});

const fixtureEditions = editions.editions.map((edition) => {
  const restrictions = [...baseRestrictions];
  if (edition.safetyStatus === 'BLOCKED') restrictions.push('SAFETY_GATE_BLOCKED');
  if (edition.familyId === 'FLEET' || edition.familyId === 'NAV' || edition.familyId === 'WEATHER') restrictions.push('LICENSING_NOT_CLEARED');
  return {
    editionId: edition.editionId,
    familyId: edition.familyId,
    displayName: editionDisplayName(edition.editionId),
    definitionStatus: edition.definitionStatus,
    editionType: edition.editionType,
    readiness: 'NOT_READY',
    requiresQuotation: Boolean(edition.requiresQuotation),
    restrictions,
    safetyStatus: edition.safetyStatus ?? null,
    licensingStatus: edition.licensingStatus ?? null,
    expandsTo: edition.expandsTo ?? [],
    dependencyIds: edition.dependencyIds ?? [],
    subscriptionCapabilityIds: edition.subscriptionCapabilityIds ?? [],
  };
});

const fixtureBundles = bundles.bundles.map((bundle) => {
  const restrictions = [...baseRestrictions];
  if (bundle.compatibilityStatus === 'UNTESTED') restrictions.push('COMPATIBILITY_UNTESTED');
  if (bundle.contractedSolution) restrictions.push('LICENSING_NOT_CLEARED');
  return {
    bundleId: bundle.bundleId,
    displayName: bundle.displayName,
    components: bundle.components.map((line) => ({
      lineId: line.lineId,
      editionId: line.editionId,
      displayName: editionDisplayName(line.editionId),
      inclusion: line.inclusion,
      required: Boolean(line.required),
      quantity: line.quantity,
      expandsTo: line.expandsTo ?? [],
    })),
    optionalComponents: (bundle.optionalComponents ?? []).map((line) => ({
      lineId: line.lineId,
      editionId: line.editionId,
      displayName: editionDisplayName(line.editionId),
      inclusion: line.inclusion,
      required: Boolean(line.required),
      quantity: line.quantity,
      expandsTo: line.expandsTo ?? [],
    })),
    contractOnly: (bundle.contractOnlyEditions ?? []).map((line) => ({
      editionId: line.editionId,
      displayName: editionDisplayName(line.editionId),
      reason: line.reason,
    })),
    ineligible: (bundle.ineligibleEditions ?? []).map((line) => ({
      editionId: line.editionId,
      displayName: editionDisplayName(line.editionId),
      reason: line.reason ?? 'INELIGIBLE',
    })),
    externalRequirements: bundle.externalRequirements ?? [],
    contractedSolution: Boolean(bundle.contractedSolution),
    hardwareIncludedByDefault: Boolean(bundle.hardwareIncludedByDefault),
    slaEstablished: Boolean(bundle.slaEstablished),
    restrictions,
    compatibilityStatus: bundle.compatibilityStatus ?? 'UNKNOWN',
  };
});

const fixtureEntitlements = entitlements.definitions.map((entitlement) => ({
  entitlementId: entitlement.entitlementId,
  name: entitlement.capabilityKey.replace(/_/g, ' '),
  term: entitlement.term,
  sharedLedgerKey: entitlement.sharedLedgerKey ?? null,
  localSafetyIndependent: !entitlement.gatesLocalSafety,
  note: null,
  requiresLicensedData: Boolean(entitlement.requiresLicensedData),
  doubleBillingAllowed: Boolean(entitlement.doubleBillingAllowed),
}));

// Hard guard: the emitted fixture must not contain commercial capability fields.
const emitted = JSON.stringify({ fixtureFamilies, fixtureEditions, fixtureBundles, fixtureEntitlements });
for (const forbidden of ['"merchantSkuCode"', '"priceAmount"', '"priceCurrency"', '"stock"', '"quantityAvailable"', '"customerId"', '"vesselId"']) {
  assert(!emitted.includes(forbidden), `fixture generation leaked forbidden field ${forbidden}`);
}
for (const edition of fixtureEditions) assert(edition.displayName && edition.editionId, 'edition fixture needs identity');

if (problems.length) {
  console.error('Fixture generation failed:');
  for (const problem of problems) console.error(' - ' + problem);
  process.exit(1);
}

const out = `// GENERATED FILE — do not edit by hand.
// Source: docs/marea/commerce-data/data/{product-families,product-editions,bundle-compositions,readiness-dimensions,entitlement-definitions}.json
// Generator: node scripts/build-marea-design-system-fixtures.mjs
// Fixture class: SYNTHETIC_INTERNAL_FIXTURE — internal presentation only.
// No price amount, stock quantity, merchant SKU, customer or vessel data is represented.
import type {
  MareaBundleSummary,
  MareaEditionSummary,
  MareaEntitlement,
  MareaFamilySummary,
  MareaReadinessSummary,
} from '../../core/types';

export const FIXTURE_CLASSIFICATION = 'SYNTHETIC_INTERNAL_FIXTURE' as const;

export interface MareaFixtureFamily extends MareaFamilySummary {
  readonly editions: readonly string[];
}

export interface MareaFixtureEdition extends MareaEditionSummary {
  readonly safetyStatus: string | null;
  readonly licensingStatus: string | null;
  readonly expandsTo: readonly string[];
  readonly dependencyIds: readonly string[];
  readonly subscriptionCapabilityIds: readonly string[];
}

export interface MareaFixtureBundle extends MareaBundleSummary {
  readonly compatibilityStatus: string;
}

export interface MareaFixtureEntitlement extends MareaEntitlement {
  readonly requiresLicensedData: boolean;
  readonly doubleBillingAllowed: boolean;
}

export const MAREA_FIXTURE_READINESS: MareaReadinessSummary = ${JSON.stringify(readinessSummary, null, 2)};

export const MAREA_FIXTURE_FAMILIES: readonly MareaFixtureFamily[] = ${JSON.stringify(fixtureFamilies, null, 2)};

export const MAREA_FIXTURE_EDITIONS: readonly MareaFixtureEdition[] = ${JSON.stringify(fixtureEditions, null, 2)};

export const MAREA_FIXTURE_BUNDLES: readonly MareaFixtureBundle[] = ${JSON.stringify(fixtureBundles, null, 2)};

export const MAREA_FIXTURE_ENTITLEMENTS: readonly MareaFixtureEntitlement[] = ${JSON.stringify(fixtureEntitlements, null, 2)};
`;

const abs = resolve(root, OUT);
if (process.argv.includes('--check')) {
  if (!existsSync(abs)) {
    console.error(`MISSING generated fixture module: ${OUT}`);
    process.exit(1);
  }
  if (readFileSync(abs, 'utf8') !== out) {
    console.error(`STALE generated fixture module: ${OUT} (run node scripts/build-marea-design-system-fixtures.mjs)`);
    process.exit(1);
  }
  console.log(`Fixture module current: ${fixtureFamilies.length} families, ${fixtureEditions.length} editions, ${fixtureBundles.length} bundles, ${fixtureEntitlements.length} entitlement definitions.`);
} else {
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, out);
  console.log(`wrote ${OUT}`);
  console.log(`${fixtureFamilies.length} families, ${fixtureEditions.length} editions, ${fixtureBundles.length} bundles, ${fixtureEntitlements.length} entitlements.`);
}
