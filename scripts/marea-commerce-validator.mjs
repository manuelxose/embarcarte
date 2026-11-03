import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'docs/marea/commerce-data/data');

export const CANONICAL_FAMILY_IDS = [
  'NAV',
  'HUB',
  'AIS',
  'PILOT',
  'SENSE',
  'WATCH',
  'DISPLAY',
  'WEATHER',
  'FLEET',
];
export const CANONICAL_EDITION_IDS = [
  'NAV-ESSENTIAL',
  'NAV-PRO',
  'HUB-STANDARD',
  'HUB-PRO',
  'AIS-RECEIVER',
  'AIS-CONNECTED',
  'PILOT-COASTAL',
  'PILOT-SAIL',
  'PILOT-PRO',
  'SENSE-WIND',
  'SENSE-POWER',
  'SENSE-BILGE',
  'SENSE-TANKS',
  'SENSE-ENV',
  'SENSE-ESSENTIALS',
  'SENSE-SAIL',
  'SENSE-SYSTEMS',
  'WATCH-CORE',
  'WATCH-PLUS',
  'DISPLAY-7',
  'DISPLAY-LARGE-CONDITIONAL',
  'WEATHER-STANDARD',
  'WEATHER-PRO',
  'FLEET-START',
  'FLEET-BUSINESS',
  'FLEET-ENTERPRISE',
];
export const CANONICAL_BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
export const CANONICAL_GATE_IDS = [
  'GATE-MARKET-PLACEMENT',
  'GATE-SAFETY-PILOT',
  'GATE-IP-CLEARANCE',
  'GATE-DATA-LICENSING',
  'GATE-PRIVACY-DPA-DPIA',
  'GATE-CRA-CYBERSECURITY',
  'GATE-CONSUMER-TERMS',
  'GATE-COMMERCIAL-CLAIMS',
  'GATE-PRICING',
  'GATE-PAYMENTS',
  'GATE-INSURANCE',
  'GATE-LEGAL-ENTITY',
  'GATE-WEBSITE-REMEDIATION',
];
export const READINESS_DIMENSIONS = [
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
export const PACKAGE_BASENAME = 'docs/marea/commerce-data/data';

const readJson = (name) => JSON.parse(readFileSync(join(DATA_DIR, name), 'utf8'));
const sha256 = (path) =>
  createHash('sha256')
    .update(readFileSync(join(ROOT, path)))
    .digest('hex');
const sameSet = (left, right) => {
  const a = [...left].sort();
  const b = [...right].sort();
  return a.length === b.length && a.every((value, index) => value === b[index]);
};

export function loadModel() {
  return {
    manifest: readJson('manifest.json'),
    families: readJson('product-families.json'),
    editions: readJson('product-editions.json'),
    skus: readJson('sku-candidates.json'),
    bundles: readJson('bundle-compositions.json'),
    lifecycle: readJson('lifecycle-policy.json'),
    dimensions: readJson('readiness-dimensions.json'),
    gates: readJson('release-gate-mapping.json'),
    price: readJson('price-governance.json'),
    inventory: readJson('inventory-governance.json'),
    plans: readJson('subscription-plans.json'),
    entitlements: readJson('entitlement-definitions.json'),
    mappings: readJson('entitlement-mappings.json'),
    publication: readJson('publication-eligibility.json'),
    lineage: readJson('source-lineage.json'),
    legacy: readJson('legacy-commerce-mapping.json'),
    security: readJson('security-invariants.json'),
    audit: readJson('audit-event-contract.json'),
    blockers: readJson('blocker-register.json'),
    handoff: readJson('mc17-handoff-inputs.json'),
    findings: readJson('review-findings.json'),
  };
}

export function validateModel(model, options = {}) {
  const failures = [];
  let checks = 0;
  const check = (condition, ruleId, message, details = undefined) => {
    checks += 1;
    if (!condition) failures.push({ ruleId, message, details });
  };

  const families = model.families?.families ?? [];
  const editions = model.editions?.editions ?? [];
  const skus = model.skus?.candidates ?? [];
  const bundles = model.bundles?.bundles ?? [];
  const gates = model.gates?.gates ?? [];
  const prices = model.price?.prices ?? [];
  const plans = model.plans?.plans ?? [];
  const entitlements = model.entitlements?.definitions ?? [];
  const routes = model.publication?.routes ?? [];
  const familyById = new Map(families.map((family) => [family.familyId, family]));
  const editionById = new Map(editions.map((edition) => [edition.editionId, edition]));
  const bundleById = new Map(bundles.map((bundle) => [bundle.bundleId, bundle]));
  const gateById = new Map(gates.map((gate) => [gate.gateId, gate]));
  const entitlementById = new Map(
    entitlements.map((entitlement) => [entitlement.entitlementId, entitlement]),
  );

  // Families
  check(families.length === 9, 'FAM-001', `Expected 9 families, found ${families.length}`);
  check(
    sameSet(
      families.map((family) => family.familyId),
      CANONICAL_FAMILY_IDS,
    ),
    'FAM-002',
    'Family ids differ from the nine canonical ids',
  );
  check(
    new Set(families.map((family) => family.familyId)).size === families.length,
    'FAM-003',
    'Duplicate family id',
  );
  const editionRefs = new Set();
  for (const family of families) {
    check(
      Array.isArray(family.editionIds) && family.editionIds.length > 0,
      'FAM-004',
      `${family.familyId} has no editions`,
      family.familyId,
    );
    for (const editionId of family.editionIds) {
      editionRefs.add(editionId);
      check(
        editionById.has(editionId),
        'FAM-005',
        `${family.familyId} references unknown edition ${editionId}`,
      );
    }
    check(
      family.commercialAvailability === 'NOT_FOR_SALE',
      'FAM-006',
      `${family.familyId} is commercially available`,
      family.familyId,
    );
    check(
      family.lifecycleState === 'DEFINED',
      'FAM-007',
      `${family.familyId} is beyond DEFINED`,
      family.lifecycleState,
    );
    check(
      family.publicationState === 'INTERNAL_ONLY',
      'FAM-008',
      `${family.familyId} is published`,
      family.publicationState,
    );
    for (const dimension of READINESS_DIMENSIONS) {
      check(
        typeof family.readiness?.[dimension] === 'string',
        'FAM-009',
        `${family.familyId} missing readiness dimension ${dimension}`,
      );
    }
    check(
      family.readiness?.availability === 'NOT_FOR_SALE',
      'FAM-010',
      `${family.familyId} availability readiness is not NOT_FOR_SALE`,
    );
    check(
      family.readiness?.brandPublication === 'NOT_GRANTED',
      'FAM-011',
      `${family.familyId} brandPublication is not NOT_GRANTED`,
    );
    check(
      family.readiness?.licensing === 'NOT_CLEARED',
      'FAM-012',
      `${family.familyId} licensing is not NOT_CLEARED`,
    );
  }
  check(
    sameSet([...editionRefs], CANONICAL_EDITION_IDS),
    'FAM-013',
    'Family edition references do not cover all 26 editions exactly',
  );

  // Editions
  check(editions.length === 26, 'EDN-001', `Expected 26 editions, found ${editions.length}`);
  check(
    sameSet(
      editions.map((edition) => edition.editionId),
      CANONICAL_EDITION_IDS,
    ),
    'EDN-002',
    'Edition ids differ from the inherited 26 ids',
  );
  check(
    new Set(editions.map((edition) => edition.editionId)).size === editions.length,
    'EDN-003',
    'Duplicate edition id',
  );
  for (const edition of editions) {
    check(
      familyById.has(edition.familyId),
      'EDN-004',
      `${edition.editionId} references unknown family ${edition.familyId}`,
    );
    check(
      edition.merchantable === false,
      'EDN-005',
      `${edition.editionId} is merchantable`,
      edition.editionId,
    );
    check(
      edition.priceApproved === false,
      'EDN-006',
      `${edition.editionId} price is approved`,
      edition.editionId,
    );
    check(
      edition.merchantSkuCode === null,
      'EDN-007',
      `${edition.editionId} has a fabricated merchant SKU code`,
      edition.merchantSkuCode,
    );
    check(
      edition.commercialAvailability === 'NOT_FOR_SALE',
      'EDN-008',
      `${edition.editionId} is available for sale`,
    );
    check(
      edition.commercialStatus === 'NOT_FOR_SALE',
      'EDN-009',
      `${edition.editionId} commercial status is not NOT_FOR_SALE`,
    );
    check(
      edition.publicationState === 'INTERNAL_ONLY',
      'EDN-010',
      `${edition.editionId} is published`,
    );
    check(
      edition.lifecycleState === 'DEFINED',
      'EDN-011',
      `${edition.editionId} lifecycle is ${edition.lifecycleState}`,
    );
    check(
      edition.priceStatus !== 'APPROVED',
      'EDN-012',
      `${edition.editionId} price status is APPROVED`,
    );
    check(
      !['REGULATORY_READY', 'OPERATIONS_READY', 'COMMERCIALLY_AVAILABLE'].includes(
        edition.lifecycleState,
      ),
      'EDN-013',
      `${edition.editionId} has an unsupported lifecycle state`,
    );
  }
  const pilotPro = editionById.get('PILOT-PRO');
  check(
    pilotPro?.editionType === 'INSTALLATION_PACKAGE',
    'EDN-014',
    'PILOT-PRO is not INSTALLATION_PACKAGE',
  );
  check(
    pilotPro?.definitionStatus === 'INSTALLATION_PACKAGE',
    'EDN-015',
    'PILOT-PRO definition status is wrong',
  );
  check(
    pilotPro?.merchantable === false && pilotPro?.priceStatus === 'NOT_APPLICABLE',
    'EDN-016',
    'PILOT-PRO is merchantable or priced',
  );
  check(
    editionById.get('DISPLAY-LARGE-CONDITIONAL')?.definitionStatus === 'CONDITIONAL',
    'EDN-017',
    'DISPLAY-LARGE-CONDITIONAL is not conditional',
  );
  check(
    editionById.get('FLEET-ENTERPRISE')?.editionType === 'CONTRACTED_SAAS',
    'EDN-018',
    'FLEET-ENTERPRISE is not contracted SaaS',
  );
  check(
    editionById.get('AIS-RECEIVER')?.familyId === 'AIS' &&
      editionById.get('AIS-RECEIVER')?.safetyStatus === 'RECEIVE_ONLY_NO_TRANSMISSION',
    'EDN-019',
    'AIS is not receive-only',
  );
  check(
    editionById.get('WATCH-CORE')?.safetyStatus === 'LOCAL_SAFETY_INDEPENDENT',
    'EDN-020',
    'WATCH local safety is not independent',
  );
  for (const [kitId, modules] of Object.entries({
    'SENSE-ESSENTIALS': ['SENSE-POWER', 'SENSE-BILGE'],
    'SENSE-SAIL': ['SENSE-WIND', 'SENSE-ENV'],
    'SENSE-SYSTEMS': ['SENSE-POWER', 'SENSE-BILGE', 'SENSE-TANKS', 'SENSE-ENV'],
  })) {
    check(
      sameSet(editionById.get(kitId)?.expandsTo ?? [], modules),
      'EDN-021',
      `${kitId} expands incorrectly`,
      editionById.get(kitId)?.expandsTo,
    );
  }

  // SKU candidates
  check(skus.length === 26, 'SKU-001', `Expected 26 SKU candidates, found ${skus.length}`);
  check(
    sameSet(
      skus.map((candidate) => candidate.editionId),
      CANONICAL_EDITION_IDS,
    ),
    'SKU-002',
    'SKU candidate edition ids differ from 26 editions',
  );
  for (const candidate of skus) {
    check(
      candidate.merchantSkuCode === null,
      'SKU-003',
      `${candidate.editionId} has a fabricated merchant SKU code`,
    );
    check(
      candidate.merchantable === false,
      'SKU-004',
      `${candidate.editionId} candidate is merchantable`,
    );
    check(
      candidate.priceApproved === false,
      'SKU-005',
      `${candidate.editionId} candidate price is approved`,
    );
    check(
      candidate.commercialAvailability === 'NOT_FOR_SALE',
      'SKU-006',
      `${candidate.editionId} candidate is for sale`,
    );
    check(
      candidate.blockingGateIds.length > 0,
      'SKU-007',
      `${candidate.editionId} has no blocking gates`,
    );
  }

  // Bundles
  check(bundles.length === 6, 'BND-001', `Expected 6 bundles, found ${bundles.length}`);
  check(
    sameSet(
      bundles.map((bundle) => bundle.bundleId),
      CANONICAL_BUNDLE_IDS,
    ),
    'BND-002',
    'Bundle ids differ from six canonical ids',
  );
  check(
    new Set(bundles.map((bundle) => bundle.bundleId)).size === bundles.length,
    'BND-003',
    'Duplicate bundle id',
  );
  for (const bundle of bundles) {
    check(
      bundle.commercialAvailability === 'NOT_FOR_SALE',
      'BND-004',
      `${bundle.bundleId} is commercially available`,
    );
    check(bundle.priceApproved === false, 'BND-005', `${bundle.bundleId} price is approved`);
    check(
      bundle.fixedPackagePriceEstablished === false,
      'BND-006',
      `${bundle.bundleId} has a fixed package price`,
    );
    check(
      bundle.checkoutAllowed === false && bundle.orderable === false,
      'BND-007',
      `${bundle.bundleId} is checkout/orderable`,
    );
    check(
      bundle.publicationAuthorized === false && bundle.indexationAuthorized === false,
      'BND-008',
      `${bundle.bundleId} is published or indexable`,
    );
    for (const component of [...bundle.components, ...bundle.optionalComponents]) {
      check(
        editionById.has(component.editionId),
        'BND-009',
        `${bundle.bundleId}/${component.lineId} references unknown edition ${component.editionId}`,
      );
      check(
        component.editionId !== 'PILOT-PRO',
        'BND-010',
        `${bundle.bundleId} contains PILOT-PRO as a component`,
      );
      check(
        component.editionId !== 'DISPLAY-LARGE-CONDITIONAL',
        'BND-011',
        `${bundle.bundleId} contains DISPLAY-LARGE as a component`,
      );
      check(
        component.editionId !== 'FLEET-ENTERPRISE',
        'BND-012',
        `${bundle.bundleId} contains FLEET-ENTERPRISE as a component`,
      );
      check(
        component.quantity === 1,
        'BND-013',
        `${bundle.bundleId} has quantity ${component.quantity} for ${component.editionId}`,
      );
    }
    check(
      bundle.ineligibleEditions.every((entry) => editionById.has(entry.editionId)),
      'BND-014',
      `${bundle.bundleId} has an unresolved ineligible edition`,
    );
    check(
      bundle.hardwareIncludedByDefault === false,
      'BND-015',
      `${bundle.bundleId} includes hardware by default`,
    );
    check(
      new Set(
        [...bundle.components, ...bundle.optionalComponents].map(
          (component) => component.editionId,
        ),
      ).size ===
        bundle.components.length + bundle.optionalComponents.length,
      'BND-025',
      `${bundle.bundleId} contains a duplicate edition composition`,
    );
    if (bundle.bundleId === 'FLEET') {
      check(bundle.contractedSolution === true, 'BND-016', 'FLEET is not contracted');
      check(bundle.slaEstablished === false, 'BND-017', 'FLEET asserts an SLA');
      check(
        bundle.contractOnlyEditions.some((entry) => entry.editionId === 'FLEET-ENTERPRISE'),
        'BND-018',
        'FLEET-ENTERPRISE is not contract-only',
      );
    }
    if (bundle.bundleId === 'SAIL' || bundle.bundleId === 'COMPLETE') {
      check(
        bundle.readinessState === 'BLOCKED',
        'BND-019',
        `${bundle.bundleId} should be blocked by PILOT`,
      );
      check(
        bundle.releaseGateDependencies.includes('GATE-SAFETY-PILOT'),
        'BND-020',
        `${bundle.bundleId} does not carry the PILOT safety gate`,
      );
    }
    if (bundle.bundleId === 'PROTECT') {
      const kit = bundle.components.find((component) => component.editionId === 'SENSE-ESSENTIALS');
      check(Boolean(kit), 'BND-021', 'PROTECT does not include SENSE-ESSENTIALS');
      check(
        sameSet(kit?.expandsTo ?? [], ['SENSE-POWER', 'SENSE-BILGE']),
        'BND-022',
        'SENSE-ESSENTIALS expansion is wrong',
      );
      check(
        !bundle.components.some((component) =>
          ['SENSE-POWER', 'SENSE-BILGE'].includes(component.editionId),
        ),
        'BND-023',
        'PROTECT duplicates SENSE kit modules',
      );
    }
  }
  const effectiveModules = new Map();
  for (const component of bundleById.get('PROTECT')?.components ?? []) {
    const modules = component.expandsTo.length > 0 ? component.expandsTo : [component.editionId];
    for (const moduleId of modules)
      effectiveModules.set(moduleId, (effectiveModules.get(moduleId) ?? 0) + component.quantity);
  }
  check(
    [...effectiveModules.values()].every((count) => count === 1),
    'BND-024',
    'SENSE kit effective module quantities are duplicated',
  );

  // Lifecycle and readiness
  check(model.lifecycle?.states?.length === 7, 'LIF-001', 'Lifecycle does not define 7 states');
  check(
    new Set(model.lifecycle?.states ?? []).size === 7,
    'LIF-002',
    'Lifecycle states are not unique',
  );
  check(
    model.lifecycle?.currentState?.commerciallyAvailable === 0,
    'LIF-003',
    'A family is COMMERCIALLY_AVAILABLE',
  );
  check(
    model.lifecycle?.currentState?.maxReachableStateDuringMc16 === 'DEFINED',
    'LIF-004',
    'MC-16 maximum lifecycle is not DEFINED',
  );
  check(
    (model.dimensions?.dimensions ?? []).length === 11,
    'LIF-005',
    'Readiness dimensions are not 11',
  );
  check(
    sameSet(
      (model.dimensions?.dimensions ?? []).map((dimension) => dimension.dimension),
      READINESS_DIMENSIONS,
    ),
    'LIF-006',
    'Readiness dimension names differ',
  );
  for (const transition of model.lifecycle?.transitions ?? []) {
    check(
      transition.mc16Allowed === false,
      'LIF-007',
      `${transition.transitionId} is allowed during MC-16`,
    );
    check(
      transition.authorizationStatus === 'DENIED_BY_DEFAULT',
      'LIF-008',
      `${transition.transitionId} is authorized`,
    );
    check(
      transition.auditEventRequired === true,
      'LIF-009',
      `${transition.transitionId} has no audit requirement`,
    );
  }

  // Gates
  check(gates.length === 13, 'GATE-001', `Expected 13 gates, found ${gates.length}`);
  check(
    sameSet(
      gates.map((gate) => gate.gateId),
      CANONICAL_GATE_IDS,
    ),
    'GATE-002',
    'Gate ids differ from MC-14',
  );
  check(
    gates.every((gate) => gate.open === true),
    'GATE-003',
    'A release gate is not open',
  );
  check(
    gates.every((gate) => gate.status !== 'CLOSED_VERIFIED'),
    'GATE-004',
    'A release gate is silently closed',
  );
  check(
    gates.every((gate) => gate.closureAuthorized === false),
    'GATE-005',
    'A release gate closure is authorized',
  );
  check(model.gates?.summary?.closedVerified === 0, 'GATE-006', 'Closed gate count is not zero');
  check(
    (model.gates?.documents ?? []).length === 24,
    'GATE-007',
    'Required document count is not 24',
  );
  check(
    (model.gates?.documents ?? []).every((document) => document.executed === false),
    'GATE-008',
    'A required document is marked executed',
  );
  for (const edition of editions) {
    for (const gateId of edition.releaseGateDependencies) {
      check(
        gateById.has(gateId),
        'GATE-009',
        `${edition.editionId} references unknown gate ${gateId}`,
      );
    }
  }

  // Price
  check(prices.length === 26, 'PRC-001', `Expected 26 price records, found ${prices.length}`);
  check(
    prices.every((price) => price.status !== 'APPROVED'),
    'PRC-002',
    'An APPROVED price exists',
  );
  check(
    (model.price?.currentState?.approvedPrices ?? -1) === 0,
    'PRC-003',
    'Approved price count is not zero',
  );
  check(
    (model.price?.currentState?.effectivePrices ?? -1) === 0,
    'PRC-004',
    'Effective price count is not zero',
  );
  for (const price of prices) {
    check(price.amountMinor === null, 'PRC-005', `${price.editionId} carries a monetary amount`);
    check(price.currency === null, 'PRC-006', `${price.editionId} carries a currency`);
    check(price.territory === null, 'PRC-007', `${price.editionId} carries a territory`);
    check(price.channel === null, 'PRC-008', `${price.editionId} carries a channel`);
    check(
      price.approvalEvidenceIds.length === 0,
      'PRC-009',
      `${price.editionId} carries approval evidence`,
    );
    check(
      price.publicPriceAllowed === false &&
        price.checkoutPriceAllowed === false &&
        price.invoicePriceAllowed === false,
      'PRC-010',
      `${price.editionId} is public/checkout/invoice allowed`,
    );
  }
  check(
    sameSet(
      prices.map((price) => price.editionId),
      CANONICAL_EDITION_IDS,
    ),
    'PRC-011',
    'Price records do not cover all 26 editions',
  );

  // Inventory
  check((model.inventory?.items ?? []).length === 0, 'INV-001', 'MAREA inventory items exist');
  check(
    (model.inventory?.movements ?? []).length === 0,
    'INV-002',
    'MAREA inventory movements exist',
  );
  check(
    model.inventory?.currentState?.verifiedMareaStock === 'NONE',
    'INV-003',
    'Verified MAREA stock is not NONE',
  );
  check(
    model.inventory?.currentState?.mareaStockAvailableForSale === false,
    'INV-004',
    'MAREA stock is available for sale',
  );
  check(
    model.inventory?.currentState?.verifiedQuantity === null,
    'INV-005',
    'Verified quantity is not null',
  );
  check(
    model.inventory?.sources?.ADMIN_ENTERED_STOCK?.usableAsMareaStock === false,
    'INV-006',
    'Admin stock is usable as MAREA stock',
  );
  check(
    (model.inventory?.invariants ?? []).some((rule) =>
      rule.includes('quantityReserved <= quantityOnHand'),
    ),
    'INV-007',
    'Inventory invariant missing',
  );

  // Subscriptions and entitlements
  check(plans.length === 13, 'SUB-001', `Expected 13 subscription plans, found ${plans.length}`);
  check(
    plans.every(
      (plan) => plan.billingMode === 'DEFINED_NOT_ACTIVE' && plan.checkoutAllowed === false,
    ),
    'SUB-002',
    'A subscription plan is active or checkout-capable',
  );
  check(
    model.plans?.currentState?.billingImplemented === false,
    'SUB-003',
    'Billing is implemented',
  );
  check(
    model.plans?.currentState?.realSubscriptionsCreated === 0,
    'SUB-004',
    'Real subscriptions were created',
  );
  check(
    model.plans?.currentState?.realEntitlementsGranted === 0,
    'SUB-005',
    'Real entitlements were granted',
  );
  for (const plan of plans)
    check(
      entitlementById.has(plan.entitlementId),
      'SUB-006',
      `${plan.planId} references unknown entitlement ${plan.entitlementId}`,
    );
  check(
    entitlements.length === 12,
    'ENT-001',
    `Expected 12 entitlement definitions, found ${entitlements.length}`,
  );
  check(
    entitlements.every((definition) => definition.doubleBillingAllowed === false),
    'ENT-002',
    'Double billing is allowed',
  );
  check(
    entitlements.every((definition) => definition.gatesLocalSafety === false),
    'ENT-003',
    'Local safety is gated by an entitlement',
  );
  check(
    entitlements.some(
      (definition) =>
        definition.entitlementId === 'ENT-NAV-PRO' &&
        definition.sharedLedgerKey === 'ACCOUNT:NAV_PRO',
    ),
    'ENT-004',
    'NAV Pro shared ledger missing',
  );
  check(
    entitlements.some(
      (definition) =>
        definition.entitlementId === 'ENT-WEATHER' &&
        definition.sharedLedgerKey === 'ACCOUNT:WEATHER',
    ),
    'ENT-005',
    'WEATHER shared ledger missing',
  );
  const sharedKeys = new Map();
  for (const definition of entitlements)
    sharedKeys.set(
      definition.sharedLedgerKey,
      (sharedKeys.get(definition.sharedLedgerKey) ?? 0) + 1,
    );
  check(
    (sharedKeys.get('ACCOUNT:NAV_PRO') ?? 0) === 1,
    'ENT-006',
    'NAV Pro ledger is not canonical',
  );
  check(
    (sharedKeys.get('ACCOUNT:WEATHER') ?? 0) === 1,
    'ENT-007',
    'WEATHER ledger is not canonical',
  );
  for (const mapping of model.mappings?.referenceToEntitlement ?? []) {
    check(
      entitlementById.has(mapping.entitlementId),
      'ENT-008',
      `${mapping.referenceId} maps to unknown entitlement ${mapping.entitlementId}`,
    );
  }
  check(
    (model.entitlements?.currentState?.realEntitlementsGranted ?? -1) === 0,
    'ENT-009',
    'Real entitlement grant count is not zero',
  );
  check(
    (model.entitlements?.currentState?.grants ?? []).length === 0,
    'ENT-010',
    'Entitlement grants exist',
  );

  // Publication
  check(routes.length === 23, 'PUB-001', `Expected 23 proposed routes, found ${routes.length}`);
  check(
    routes.every((route) => route.publicationAuthorized === false),
    'PUB-002',
    'A proposed route is publication-authorized',
  );
  check(
    routes.every((route) => route.indexationAuthorized === false),
    'PUB-003',
    'A proposed route is indexation-authorized',
  );
  check(
    routes.every((route) => route.sitemapEligible === false),
    'PUB-004',
    'A proposed route is sitemap-eligible',
  );
  check(
    routes.every((route) => route.commercialTransactionAuthorized === false),
    'PUB-005',
    'A proposed route is commercially authorized',
  );
  check(
    model.publication?.structuredDataPolicy?.productNodeAllowed === false,
    'PUB-006',
    'Product JSON-LD is allowed',
  );
  check(
    model.publication?.structuredDataPolicy?.offerNodeAllowed === false,
    'PUB-007',
    'Offer JSON-LD is allowed',
  );
  check(
    model.publication?.structuredDataPolicy?.priceFieldAllowed === false,
    'PUB-008',
    'Structured-data price is allowed',
  );
  check(
    model.publication?.structuredDataPolicy?.availabilityFieldAllowed === false,
    'PUB-009',
    'Structured-data availability is allowed',
  );
  check(
    model.publication?.currentState?.mareaRoutesPublished === 0,
    'PUB-010',
    'A MAREA route is published',
  );
  check(
    model.publication?.currentState?.mareaRoutesIndexable === 0,
    'PUB-011',
    'A MAREA route is indexable',
  );

  // Legacy
  if (!options.skipLegacyHashes) {
    for (const file of model.legacy?.legacyCommerceFiles ?? []) {
      check(existsSync(join(ROOT, file.path)), 'LEG-001', `Legacy file missing: ${file.path}`);
      check(
        sha256(file.path) === file.sha256,
        'LEG-002',
        `Legacy commerce file changed: ${file.path}`,
      );
    }
  }
  check(
    (model.legacy?.mareaSkusMappedFromLegacy ?? []).length === 0,
    'LEG-003',
    'A legacy product was mapped to a MAREA SKU',
  );
  check(
    model.legacy?.preservation?.existingOrdersModified === false,
    'LEG-004',
    'Existing orders are marked modified',
  );
  check(
    model.legacy?.preservation?.existingCheckoutChanged === false,
    'LEG-005',
    'Existing checkout is marked changed',
  );
  check(
    model.legacy?.activeFlagSemantics?.legacyActiveIsMareaReadiness === false,
    'LEG-006',
    'Legacy active flag claims MAREA readiness',
  );
  check(
    (model.legacy?.seedSampleProducts ?? []).every((product) => product.mareaMapping === 'NONE'),
    'LEG-007',
    'A sample legacy product is mapped to MAREA',
  );

  // Audit and security
  check(model.audit?.appendOnly === true, 'AUD-001', 'Audit history is not append-only');
  for (const field of [
    'eventId',
    'entityType',
    'entityId',
    'eventType',
    'actorId',
    'actorRole',
    'timestamp',
    'reason',
    'evidenceRefs',
    'correlationId',
    'result',
  ]) {
    check(model.audit?.fields?.includes(field), 'AUD-002', `Audit field missing: ${field}`);
  }
  check(
    model.audit?.rules?.updateForbidden === true && model.audit?.rules?.deleteForbidden === true,
    'AUD-003',
    'Audit update/delete is not forbidden',
  );
  check(
    (model.security?.invariants ?? []).length >= 25,
    'SEC-001',
    'Security invariant count is below 25',
  );
  const securityText = JSON.stringify(model.security?.invariants ?? []);
  for (const token of [
    'Server-authoritative',
    'Admin activation',
    'entitlement',
    'cross-tenant',
    'append-only',
    'production schema',
  ]) {
    check(securityText.includes(token), 'SEC-002', `Security invariant missing token: ${token}`);
  }

  // Manifest and handoff
  const actualFiles = readdirSync(DATA_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort();
  check(
    sameSet(model.manifest?.files ?? [], actualFiles),
    'MNF-001',
    'Manifest file inventory differs from actual JSON files',
  );
  check(
    model.manifest?.counts?.productFamilies === families.length,
    'MNF-002',
    'Manifest family count is wrong',
  );
  check(
    model.manifest?.counts?.productEditions === editions.length,
    'MNF-003',
    'Manifest edition count is wrong',
  );
  check(
    model.manifest?.counts?.bundles === bundles.length,
    'MNF-004',
    'Manifest bundle count is wrong',
  );
  check(
    model.manifest?.counts?.approvedPrices === 0,
    'MNF-005',
    'Manifest approved price count is wrong',
  );
  check(
    model.manifest?.counts?.merchantSkus === 0,
    'MNF-006',
    'Manifest merchant SKU count is wrong',
  );
  check(
    model.manifest?.flags?.publicationAuthorized === false,
    'MNF-007',
    'Manifest publication flag is wrong',
  );
  check(model.manifest?.flags?.mc17Started === false, 'MNF-008', 'Manifest says MC-17 started');
  check(
    model.manifest?.flags?.productionMigrationExecuted === false,
    'MNF-009',
    'Manifest says a production migration executed',
  );
  check(
    model.manifest?.flags?.verifiedMareaStock === 'NONE',
    'MNF-010',
    'Manifest claims verified stock',
  );
  const external = model.blockers?.externalEvidence ?? {};
  check(
    external.trademarkLegalClearance === 'NOT_GRANTED',
    'EXT-001',
    'Trademark clearance is not NOT_GRANTED',
  );
  check(external.mareaPublicUse === 'NO_GO', 'EXT-002', 'MAREA public use is not NO_GO');
  check(
    external.sourceIpClearance === 'NOT_CLEARED',
    'EXT-003',
    'Source IP clearance is not NOT_CLEARED',
  );
  check(external.priceApproved === 'NONE', 'EXT-004', 'An external price is approved');
  check(external.licensingRightsGranted === false, 'EXT-005', 'Licensing rights are granted');
  check(external.publicationAuthorized === false, 'EXT-006', 'Publication is authorized');
  check(model.handoff?.mc17Started === false, 'HND-001', 'MC-17 is marked started');
  check(
    model.handoff?.presentationContract?.buyCtaAllowed === false,
    'HND-002',
    'A buy CTA is allowed',
  );
  check(model.handoff?.presentationContract?.priceVisible === false, 'HND-003', 'Price is visible');
  check(
    model.handoff?.presentationContract?.availabilityVisible === false,
    'HND-004',
    'Availability is visible',
  );

  // Blockers and inherited debt
  check(model.blockers?.summary?.releaseGatesOpen === 13, 'BLK-001', 'Open gate count is not 13');
  check(
    model.blockers?.summary?.requiredDocumentsUnexecuted === 24,
    'BLK-002',
    'Unexecuted document count is not 24',
  );
  check(
    model.blockers?.summary?.websiteFindingsOpen === 34,
    'BLK-003',
    'Open website finding count is not 34',
  );
  check(
    model.blockers?.summary?.mc16PreconditionsMet === 0,
    'BLK-004',
    'An MC-16 precondition is marked met',
  );
  check(
    (model.blockers?.inheritedDebt ?? []).some((debt) => debt.id === 'V-18'),
    'BLK-005',
    'V-18 inherited debt is not recorded',
  );
  check(
    (model.blockers?.inheritedDebt ?? []).some((debt) => debt.id === 'GSC-01'),
    'BLK-006',
    'GSC-01 is not recorded',
  );
  check(
    (model.blockers?.externalEvidence?.publicationAuthorized ?? true) === false,
    'BLK-007',
    'External evidence authorizes publication',
  );

  // Source lineage
  if (!options.skipSourceHashes) {
    for (const source of model.lineage?.sources ?? []) {
      check(existsSync(join(ROOT, source.path)), 'SRC-001', `Source file missing: ${source.path}`);
      check(
        sha256(source.path) === source.sha256,
        'SRC-002',
        `Source file hash changed: ${source.path}`,
      );
    }
  }

  // The review findings file may be replaced after the independent audit, but it
  // must never contain an unaudited PASS.
  check(
    ['PENDING_INDEPENDENT_AUDIT', 'AUDITED', 'PASS', 'PARTIAL', 'NEEDS_CORRECTION'].includes(
      model.findings?.status,
    ),
    'REV-001',
    'Review findings status is invalid',
  );
  if (['PASS', 'PARTIAL'].includes(model.findings?.status)) {
    check(
      Boolean(model.findings?.independentAuditor),
      'REV-002',
      'A PASS/PARTIAL review has no independent auditor',
    );
    check(
      Boolean(model.findings?.reviewedCommit),
      'REV-003',
      'A PASS/PARTIAL review has no reviewed commit',
    );
  }

  return { ok: failures.length === 0, checks, failures };
}

export function validateAgainstSources(model) {
  const failures = [];
  let checks = 0;
  const check = (condition, ruleId, message) => {
    checks += 1;
    if (!condition) failures.push({ ruleId, message });
  };
  const handoff = JSON.parse(
    readFileSync(
      join(ROOT, 'docs/marea/information-architecture/data/mc16-handoff-inputs.json'),
      'utf8',
    ),
  );
  const gatesSource = JSON.parse(
    readFileSync(
      join(ROOT, 'docs/marea/legal-commercial/data/release-evidence-gates.json'),
      'utf8',
    ),
  );
  const routesSource = JSON.parse(
    readFileSync(
      join(ROOT, 'docs/marea/information-architecture/data/proposed-routes.json'),
      'utf8',
    ),
  );
  const bundlesSource = JSON.parse(
    readFileSync(join(ROOT, 'docs/marea/bundles/bundle-definitions.json'), 'utf8'),
  );
  check(
    sameSet(
      (model.families?.families ?? []).map((family) => family.familyId),
      handoff.familyIds,
    ),
    'XSRC-001',
    'Family ids differ from MC-15 handoff',
  );
  check(
    sameSet(
      (model.editions?.editions ?? []).map((edition) => edition.editionId),
      handoff.editionIds,
    ),
    'XSRC-002',
    'Edition ids differ from MC-15 handoff',
  );
  check(
    sameSet(
      (model.bundles?.bundles ?? []).map((bundle) => bundle.bundleId),
      handoff.bundleIds,
    ),
    'XSRC-003',
    'Bundle ids differ from MC-15 handoff',
  );
  check(
    model.gates?.gates?.length === gatesSource.gates.length,
    'XSRC-004',
    'Gate count differs from MC-14',
  );
  for (const gate of gatesSource.gates) {
    const inherited = model.gates?.gates?.find((candidate) => candidate.gateId === gate.gateId);
    check(Boolean(inherited), 'XSRC-005', `Gate ${gate.gateId} missing`);
    check(inherited?.status === gate.status, 'XSRC-006', `Gate ${gate.gateId} status changed`);
  }
  check(
    model.publication?.routes?.length === routesSource.items.length,
    'XSRC-007',
    'Route count differs from MC-15',
  );
  for (const route of routesSource.items) {
    const inherited = model.publication?.routes?.find(
      (candidate) => candidate.routeId === route.routeId,
    );
    check(Boolean(inherited), 'XSRC-008', `Route ${route.routeId} missing`);
    check(
      inherited?.esPath === route.routePatternEs,
      'XSRC-009',
      `Route ${route.routeId} ES path changed`,
    );
    check(
      inherited?.enPath === route.routePatternEn,
      'XSRC-010',
      `Route ${route.routeId} EN path changed`,
    );
  }
  check(
    (model.bundles?.bundles ?? []).length === bundlesSource.bundles.length,
    'XSRC-011',
    'Bundle count differs from MC-08',
  );
  for (const editionId of handoff.editionIds) {
    const inherited = model.editions?.editions?.find((edition) => edition.editionId === editionId);
    const source = handoff.editions.find((edition) => edition.editionId === editionId);
    check(inherited?.familyId === source.familyId, 'XSRC-012', `${editionId} family changed`);
    check(
      inherited?.priceStatus === source.priceStatus,
      'XSRC-013',
      `${editionId} price status changed`,
    );
  }
  return { ok: failures.length === 0, checks, failures };
}

export function validateNoActivationImports() {
  const failures = [];
  let checks = 0;
  const roots = [join(ROOT, 'src/server'), join(ROOT, 'src/app')];
  const forbidden = ['marea-commerce', 'evaluatePurchasability', 'MC16_POLICY_VERSION'];
  const walk = (directory) => {
    for (const entry of readdirSync(directory)) {
      const absolute = join(directory, entry);
      const stat = statSync(absolute);
      if (stat.isDirectory()) {
        if (relative(ROOT, absolute).includes('marea-commerce')) continue;
        walk(absolute);
        continue;
      }
      if (!/\.(ts|mjs|js)$/.test(entry)) continue;
      const content = readFileSync(absolute, 'utf8');
      checks += 1;
      for (const token of forbidden) {
        if (content.includes(token)) {
          failures.push({
            ruleId: 'ISO-001',
            message: `${relative(ROOT, absolute)} imports or references ${token}`,
          });
        }
      }
    }
  };
  for (const root of roots) walk(root);
  const packageJson = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  checks += 1;
  if (!packageJson.scripts['test:commerce-data'])
    failures.push({ ruleId: 'ISO-002', message: 'test:commerce-data script is missing' });
  checks += 1;
  if (!packageJson.scripts['test:commerce-data:unit'])
    failures.push({ ruleId: 'ISO-003', message: 'test:commerce-data:unit script is missing' });
  return { ok: failures.length === 0, checks, failures };
}

export async function validateSchemaSmoke() {
  const failures = [];
  let checks = 0;
  const check = (condition, ruleId, message) => {
    checks += 1;
    if (!condition) failures.push({ ruleId, message });
  };
  const { installMareaCommerceSchema, MAREA_COMMERCE_TABLES, dropMareaCommerceSchema } =
    await import('../src/server/marea-commerce/schema.ts');
  const directory = mkdtempSync(join(tmpdir(), 'marea-commerce-validator-'));
  const path = join(directory, 'validator.sqlite');
  const db = new DatabaseSync(path);
  try {
    installMareaCommerceSchema(db);
    const tables = new Set(
      db
        .prepare("SELECT name FROM sqlite_master WHERE type='table'")
        .all()
        .map((row) => row.name),
    );
    for (const table of MAREA_COMMERCE_TABLES)
      check(tables.has(table), 'SCH-001', `Missing table ${table}`);
    const fk = db.prepare('PRAGMA foreign_keys').get();
    check(fk?.foreign_keys === 1, 'SCH-002', 'Foreign keys are not enabled');
    installMareaCommerceSchema(db);
    const meta = db.prepare('SELECT schema_version FROM marea_schema_meta').all();
    check(meta.length === 1, 'SCH-003', 'Schema installation is not idempotent');
    dropMareaCommerceSchema(db);
    const after = new Set(
      db
        .prepare("SELECT name FROM sqlite_master WHERE type='table'")
        .all()
        .map((row) => row.name),
    );
    check(
      MAREA_COMMERCE_TABLES.every((table) => !after.has(table)),
      'SCH-004',
      'Schema drop did not remove all MC-16 tables',
    );
  } finally {
    db.close();
    rmSync(directory, { recursive: true, force: true });
  }
  return { ok: failures.length === 0, checks, failures };
}

export async function runCli() {
  const model = loadModel();
  const results = [
    validateModel(model),
    validateAgainstSources(model),
    validateNoActivationImports(),
    await validateSchemaSmoke(),
  ];
  const failures = results.flatMap((result) => result.failures);
  const checks = results.reduce((sum, result) => sum + result.checks, 0);
  for (const failure of failures) console.error(`FAIL ${failure.ruleId}: ${failure.message}`);
  console.log(`MC-16 commerce data: ${checks - failures.length}/${checks} checks passed`);
  console.log(
    `files: ${model.manifest.files.length}; families: ${model.families.families.length}; editions: ${model.editions.editions.length}; bundles: ${model.bundles.bundles.length}; routes: ${model.publication.routes.length}; gates: ${model.gates.gates.length}; approved prices: ${model.price.currentState.approvedPrices}; merchant SKUs: ${model.manifest.counts.merchantSkus}; verified inventory: ${model.inventory.currentState.inventoryItemCount}`,
  );
  if (failures.length > 0) process.exitCode = 1;
  return { ok: failures.length === 0, checks, failures };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  await runCli();
}
