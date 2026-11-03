import assert from 'node:assert/strict';
import test from 'node:test';
import {
  evaluateCrossTenantAccess,
  evaluatePurchasability,
  evaluateReadinessTransition,
  validateInventoryAvailability,
  validatePriceApproval,
} from '../src/server/marea-commerce/domain.ts';
import { loadModel, validateModel } from './marea-commerce-validator.mjs';

const NOW = '2026-11-03T00:00:00.000Z';
const base = loadModel();

const mutate = (mutator) => {
  const model = structuredClone(base);
  mutator(model);
  return validateModel(model, { skipSourceHashes: true, skipLegacyHashes: true });
};

const expectRule = (name, mutator, ruleId) => {
  test(name, () => {
    const result = mutate(mutator);
    assert.equal(result.ok, false);
    assert.ok(
      result.failures.some((failure) => failure.ruleId === ruleId),
      `expected ${ruleId}, got ${JSON.stringify(result.failures.slice(0, 8))}`,
    );
  });
};

const edition = (model, editionId) =>
  model.editions.editions.find((item) => item.editionId === editionId);
const family = (model, familyId) =>
  model.families.families.find((item) => item.familyId === familyId);
const bundle = (model, bundleId) =>
  model.bundles.bundles.find((item) => item.bundleId === bundleId);

test('ADV-01 active=1 cannot make a blocked MAREA edition purchasable', () => {
  const result = mutate((model) => {
    edition(model, 'NAV-PRO').merchantable = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'EDN-005'));
});

test('ADV-02 a price hypothesis promoted to approved is rejected', () => {
  const result = mutate((model) => {
    model.price.prices[0].status = 'APPROVED';
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'PRC-002'));
});

test('ADV-03 null price replaced by zero is rejected', () => {
  const result = mutate((model) => {
    model.price.prices[0].amountMinor = 0;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'PRC-005'));
});

test('ADV-04 fabricated stock is rejected', () => {
  const result = mutate((model) => {
    model.inventory.items.push({
      inventoryItemId: 'FAKE-1',
      editionId: 'NAV-PRO',
      quantityOnHand: 50,
    });
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'INV-001'));
});

test('ADV-05 price approval with no evidence is rejected', () => {
  const result = mutate((model) => {
    const price = model.price.prices[0];
    price.status = 'APPROVED';
    price.approvalEvidenceIds = ['EV-FAKE'];
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'PRC-009'));
});

test('ADV-06 a blocked release gate bypass is rejected', () => {
  const result = mutate((model) => {
    model.gates.gates[0].status = 'CLOSED_VERIFIED';
    model.gates.gates[0].open = false;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'GATE-003'));
});

test('ADV-07 obsolete evidence reuse is rejected by lineage hash drift', () => {
  const model = structuredClone(base);
  model.lineage.sources[0].sha256 = '0'.repeat(64);
  const result = validateModel(model, { skipLegacyHashes: true });
  assert.equal(result.ok, false);
  assert.ok(result.failures.some((failure) => failure.ruleId === 'SRC-002'));
});

test('ADV-08 a restricted PILOT-PRO merchant SKU is rejected', () => {
  const result = mutate((model) => {
    edition(model, 'PILOT-PRO').merchantable = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'EDN-005'));
});

test('ADV-09 FLEET-ENTERPRISE sold as self-service is rejected', () => {
  const result = mutate((model) => {
    edition(model, 'FLEET-ENTERPRISE').commercialAvailability = 'FOR_SALE';
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'EDN-008'));
});

test('ADV-10 AIS transmission enablement is rejected', () => {
  const result = mutate((model) => {
    edition(model, 'AIS-RECEIVER').safetyStatus = 'TRANSMISSION_ENABLED';
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'EDN-019'));
});

test('ADV-11 PILOT readiness escalation without safety evidence is rejected', () => {
  const result = mutate((model) => {
    family(model, 'PILOT').lifecycleState = 'REGULATORY_READY';
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'FAM-007'));
});

test('ADV-12 a blocked bundle becoming orderable is rejected', () => {
  const result = mutate((model) => {
    bundle(model, 'SAIL').commercialAvailability = 'FOR_SALE';
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'BND-004'));
});

test('ADV-13 a SENSE kit duplicating a module is rejected', () => {
  const result = mutate((model) => {
    bundle(model, 'PROTECT').components.push({
      lineId: 'ADV-DUP',
      editionId: 'SENSE-POWER',
      familyId: 'SENSE',
      quantity: 1,
      inclusion: 'INCLUDED',
      required: true,
      expandsTo: [],
      subscriptionCapabilityIds: [],
    });
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'BND-023'));
});

test('ADV-14 shared WEATHER entitlement billed twice is rejected', () => {
  const result = mutate((model) => {
    model.entitlements.definitions.find(
      (item) => item.entitlementId === 'ENT-WEATHER',
    ).doubleBillingAllowed = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'ENT-002'));
});

test('ADV-15 WATCH monitoring expiry disabling local safety is rejected', () => {
  const result = mutate((model) => {
    model.entitlements.definitions.find(
      (item) => item.entitlementId === 'ENT-WATCH',
    ).gatesLocalSafety = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'ENT-003'));
});

test('ADV-16 tenant A gaining tenant B entitlement is rejected', () => {
  const result = evaluateCrossTenantAccess({
    grant: {
      grantId: 'G-1',
      entitlementId: 'ENT-FLEET',
      scopeType: 'ORGANIZATION',
      scopeId: 'tenant-a',
      state: 'ACTIVE',
      basis: 'SYNTHETIC_TEST',
      synthetic: true,
      startsAt: NOW,
      endsAt: null,
      actorId: 'actor',
      auditEventId: 'AUD-1',
    },
    requestedScopeType: 'ORGANIZATION',
    requestedScopeId: 'tenant-b',
  });
  assert.equal(result.allowed, false);
  assert.equal(result.reasonCode, 'CROSS_TENANT_ENTITLEMENT_LEAK_BLOCKED');
});

test('ADV-17 a subscription status granting an unauthorized licence is rejected', () => {
  const result = mutate((model) => {
    model.entitlements.currentState.realEntitlementsGranted = 1;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'ENT-009'));
});

test('ADV-18 a fabricated payment event granting an entitlement is rejected', () => {
  const result = mutate((model) => {
    model.entitlements.currentState.grants.push({
      grantId: 'FAKE',
      entitlementId: 'ENT-WEATHER',
      synthetic: false,
    });
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'ENT-010'));
});

test('ADV-19 a client changing price or readiness is ignored', () => {
  const decision = evaluatePurchasability({
    family: family(base, 'NAV'),
    edition: edition(base, 'NAV-PRO'),
    merchantSku: null,
    gates: base.gates.gates,
    evidence: [],
    price: base.price.prices[0],
    inventory: [],
    actor: { actorId: 'client', roles: ['CUSTOMER'] },
    territory: 'ES',
    channel: 'DIRECT',
    now: NOW,
    clientClaims: { priceMinor: 1, readiness: 'COMMERCIALLY_AVAILABLE' },
  });
  assert.equal(decision.allowed, false);
  assert.ok(decision.reasonCodes.includes('CLIENT_CLAIMS_IGNORED'));
});

test('ADV-20 an unauthorized actor cannot authorize a gate transition', () => {
  const result = evaluateReadinessTransition(
    {
      transitionId: 'TR-ADV',
      entityId: 'PILOT',
      fromState: 'DEFINED',
      toState: 'ENGINEERING_VERIFIED',
      requiredGateIds: [],
      requiredEvidenceIds: [],
      requiredApproverRoles: ['HARDWARE_LEAD'],
      authorizationStatus: 'APPROVED',
      auditEventId: 'AUD-1',
    },
    { gates: [], evidence: [], actor: { actorId: 'viewer', roles: ['VIEWER'] }, now: NOW },
  );
  assert.equal(result.authorized, false);
  assert.ok(result.reasonCodes.includes('ACTOR_UNAUTHORIZED'));
});

test('ADV-21 deleting historical audit records is rejected by contract', () => {
  const result = mutate((model) => {
    model.audit.appendOnly = false;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'AUD-001'));
});

test('ADV-22 a version collision overwriting an approval is rejected', () => {
  const result = mutate((model) => {
    const price = model.price.prices[0];
    price.status = 'APPROVED';
    price.amountMinor = null;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'PRC-002'));
});

test('ADV-23 an invalid transition skipping a gate is rejected', () => {
  const result = mutate((model) => {
    model.lifecycle.transitions[0].mc16Allowed = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'LIF-007'));
});

test('ADV-24 a proposed MAREA page becoming indexable is rejected', () => {
  const result = mutate((model) => {
    model.publication.routes[0].indexationAuthorized = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'PUB-003'));
});

test('ADV-25 MAREA Product/Offer markup is rejected', () => {
  const result = mutate((model) => {
    model.publication.structuredDataPolicy.productNodeAllowed = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'PUB-006'));
});

test('ADV-26 a sample shop row mapped to a live MAREA SKU is rejected', () => {
  const result = mutate((model) => {
    model.legacy.mareaSkusMappedFromLegacy.push({ legacySlug: 'open-marine-hub', sku: 'FAKE' });
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'LEG-003'));
});

test('ADV-27 an empty legal identity cannot be treated as valid', () => {
  const result = mutate((model) => {
    model.blockers.externalEvidence.trademarkLegalClearance = '';
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'EXT-001'));
});

test('ADV-28 a missing licensing right treated as approved is rejected', () => {
  const result = mutate((model) => {
    family(model, 'NAV').readiness.licensing = 'CLEARED';
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'FAM-012'));
});

test('ADV-29 an unknown stock amount becoming available is rejected', () => {
  const result = mutate((model) => {
    model.inventory.currentState.mareaStockAvailableForSale = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'INV-004'));
});

test('ADV-30 a duplicate bundle composition inflating quantities is rejected', () => {
  const result = mutate((model) => {
    bundle(model, 'PROTECT').components.push({
      lineId: 'ADV-DUP-2',
      editionId: 'WATCH-CORE',
      familyId: 'WATCH',
      quantity: 1,
      inclusion: 'INCLUDED',
      required: true,
      expandsTo: [],
      subscriptionCapabilityIds: [],
    });
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'BND-025'));
});

test('ADV-31 a mismatched ES/EN edition creating a second entity is rejected', () => {
  const result = mutate((model) => {
    model.editions.editions.push({
      ...edition(model, 'NAV-ESSENTIAL'),
      editionId: 'NAV-ESSENTIAL-EN',
    });
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'EDN-002'));
});

test('ADV-32 an unverified movement making stock negative is rejected', () => {
  const result = validateInventoryAvailability(
    [
      {
        inventoryItemId: 'INV-NEG',
        editionId: 'NAV-ESSENTIAL',
        skuCode: 'SKU-NEG',
        quantityOnHand: -1,
        quantityReserved: 0,
        status: 'AVAILABLE',
        verified: true,
        stockEvidenceId: 'EV-STOCK',
      },
    ],
    'NAV-ESSENTIAL',
    [
      {
        evidenceId: 'EV-STOCK',
        evidenceType: 'INVENTORY_RECEIPT',
        evidenceClass: 'VERIFIED_EXTERNAL',
        verified: true,
        status: 'VALID',
        issuedBy: 'warehouse',
        issuedAt: NOW,
        expiresAt: null,
      },
    ],
    NOW,
  );
  assert.equal(result.available, false);
  assert.ok(result.reasonCodes.includes('INVENTORY_QUANTITY_INVARIANT_VIOLATED'));
});

test('ADV-33 a bundle component pointing at an unknown edition is rejected', () => {
  const result = mutate((model) => {
    bundle(model, 'PROTECT').components.push({
      lineId: 'ADV-UNKNOWN',
      editionId: 'UNKNOWN-EDITION',
      familyId: 'SENSE',
      quantity: 1,
      inclusion: 'INCLUDED',
      required: true,
      expandsTo: [],
      subscriptionCapabilityIds: [],
    });
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'BND-009'));
});

test('ADV-34 a synthetic approval escaping its fixture is rejected', () => {
  const result = validatePriceApproval(
    {
      priceVersionId: 'PV-SYNTH',
      editionId: 'NAV-ESSENTIAL',
      status: 'APPROVED',
      amountMinor: 100,
      currency: 'EUR',
      territory: 'ES',
      channel: 'DIRECT',
      vatBasis: 'STANDARD_21',
      includesVat: false,
      effectiveFrom: NOW,
      effectiveTo: null,
      approvedBy: 'test',
      approvedByRole: 'FINANCE_LEAD',
      approvalEvidenceIds: ['EV-SYNTH'],
    },
    [
      {
        evidenceId: 'EV-SYNTH',
        evidenceType: 'PRICE_APPROVAL',
        evidenceClass: 'ENGINEERING_DESIGN',
        verified: true,
        status: 'VALID',
        issuedBy: 'test fixture',
        issuedAt: NOW,
        expiresAt: null,
      },
    ],
    NOW,
    { territory: 'ES', channel: 'DIRECT' },
  );
  assert.equal(result.approved, false);
  assert.ok(result.reasonCodes.includes('PRICE_APPROVAL_EVIDENCE_INVALID'));
});

test('ADV-35 a forbidden production migration path is rejected by tooling contract', () => {
  const result = mutate((model) => {
    model.manifest.flags.productionMigrationExecuted = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'MNF-009'));
});

test('ADV-36 existing customer orders altered is rejected', () => {
  const result = mutate((model) => {
    model.legacy.preservation.existingOrdersModified = true;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'LEG-004'));
});

test('ADV-37 a proposed MAREA page published is rejected', () => {
  const result = mutate((model) => {
    model.publication.currentState.mareaRoutesPublished = 1;
  });
  assert.ok(result.failures.some((failure) => failure.ruleId === 'PUB-010'));
});
