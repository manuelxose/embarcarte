import assert from 'node:assert/strict';
import test from 'node:test';
import {
  evaluateBundleEligibility,
  evaluatePurchasability,
  evaluatePublicationEligibility,
  evaluateReadiness,
  evaluateReadinessTransition,
  isEvidenceUsable,
  resolveEntitlementDependencies,
  validateAuditEvent,
  validateEntitlementGrant,
  validateInventoryAvailability,
  validatePriceApproval,
} from '../src/server/marea-commerce/domain.ts';
import {
  loadModel,
  validateModel,
  validateNoActivationImports,
  validateSchemaSmoke,
  validateAgainstSources,
} from './marea-commerce-validator.mjs';

const NOW = '2026-11-03T00:00:00.000Z';
const model = loadModel();
const families = model.families.families;
const editions = model.editions.editions;
const gates = model.gates.gates.map((gate) => ({ gateId: gate.gateId, status: gate.status }));
const priceByEdition = new Map(model.price.prices.map((price) => [price.editionId, price]));

const evidenceForGates = gates.map((gate) => ({
  evidenceId: `EV-${gate.gateId}`,
  evidenceType: 'AUDIT_REPORT',
  evidenceClass: 'VERIFIED_EXTERNAL',
  gateId: gate.gateId,
  verified: true,
  status: 'VALID',
  issuedBy: 'Synthetic test authority',
  issuedAt: '2026-01-01T00:00:00.000Z',
  expiresAt: null,
  revokedAt: null,
}));
const closedGates = gates.map((gate) => ({
  gateId: gate.gateId,
  status: 'CLOSED_VERIFIED',
  closureEvidenceIds: [`EV-${gate.gateId}`],
}));
const priceEvidence = {
  evidenceId: 'EV-PRICE-APPROVAL',
  evidenceType: 'PRICE_APPROVAL',
  evidenceClass: 'VERIFIED_EXTERNAL',
  gateId: 'GATE-PRICING',
  verified: true,
  status: 'VALID',
  issuedBy: 'Synthetic finance authority',
  issuedAt: '2026-01-01T00:00:00.000Z',
  expiresAt: null,
  revokedAt: null,
};
const stockEvidence = {
  evidenceId: 'EV-STOCK-RECEIPT',
  evidenceType: 'INVENTORY_RECEIPT',
  evidenceClass: 'VERIFIED_EXTERNAL',
  gateId: null,
  verified: true,
  status: 'VALID',
  issuedBy: 'Synthetic warehouse',
  issuedAt: '2026-01-01T00:00:00.000Z',
  expiresAt: null,
  revokedAt: null,
};
const approvedPrice = {
  priceVersionId: 'PV-TEST-001',
  editionId: 'NAV-ESSENTIAL',
  status: 'APPROVED',
  amountMinor: 120000,
  currency: 'EUR',
  territory: 'ES',
  channel: 'DIRECT',
  vatBasis: 'STANDARD_21',
  includesVat: false,
  effectiveFrom: '2026-01-01T00:00:00.000Z',
  effectiveTo: null,
  approvedBy: 'finance-1',
  approvedByRole: 'FINANCE_LEAD',
  approvalEvidenceIds: ['EV-PRICE-APPROVAL'],
};

test('canonical data validates and matches sources', () => {
  const result = validateModel(model);
  assert.equal(result.ok, true, JSON.stringify(result.failures));
  assert.equal(validateAgainstSources(model).ok, true);
});

test('no public commerce module imports the isolated domain', () => {
  const result = validateNoActivationImports();
  assert.equal(result.ok, true, JSON.stringify(result.failures));
});

test('schema smoke installs, is idempotent and rolls back', async () => {
  const result = await validateSchemaSmoke();
  assert.equal(result.ok, true, JSON.stringify(result.failures));
});

test('all 26 current editions are denied and expose no effective price or stock', () => {
  for (const edition of editions) {
    const family = families.find((candidate) => candidate.familyId === edition.familyId);
    const decision = evaluatePurchasability({
      family,
      edition,
      merchantSku: null,
      gates,
      evidence: [],
      price: priceByEdition.get(edition.editionId),
      inventory: [],
      actor: { actorId: 'synthetic-actor', roles: ['COMMERCE_OPERATOR'] },
      territory: 'ES',
      channel: 'DIRECT',
      now: NOW,
      adminActivated: false,
    });
    assert.equal(decision.allowed, false, edition.editionId);
    assert.equal(decision.effectivePrice, null, edition.editionId);
    assert.equal(decision.effectiveStock, null, edition.editionId);
    assert.ok(decision.reasonCodes.includes('MERCHANT_SKU_MISSING'));
    assert.ok(decision.blockingGateIds.length > 0);
  }
});

test('admin activation and client claims are recorded but ignored', () => {
  const edition = editions[0];
  const family = families[0];
  const decision = evaluatePurchasability({
    family,
    edition,
    merchantSku: null,
    gates,
    evidence: [],
    price: priceByEdition.get(edition.editionId),
    inventory: [],
    actor: { actorId: 'attacker', roles: ['ADMIN'] },
    territory: 'ES',
    channel: 'DIRECT',
    now: NOW,
    adminActivated: true,
    clientClaims: { price: 1, stock: 999, readiness: 'COMMERCIALLY_AVAILABLE' },
  });
  assert.equal(decision.allowed, false);
  assert.ok(decision.reasonCodes.includes('ADMIN_ACTIVATION_IGNORED'));
  assert.ok(decision.reasonCodes.includes('CLIENT_CLAIMS_IGNORED'));
});

test('approved price requires verified external evidence and authorized role', () => {
  const approved = validatePriceApproval(approvedPrice, [priceEvidence], NOW, {
    territory: 'ES',
    channel: 'DIRECT',
  });
  assert.equal(approved.approved, true, JSON.stringify(approved.reasonCodes));
  assert.equal(approved.effectivePrice?.amountMinor, 120000);

  const noEvidence = validatePriceApproval({ ...approvedPrice, approvalEvidenceIds: [] }, [], NOW, {
    territory: 'ES',
    channel: 'DIRECT',
  });
  assert.equal(noEvidence.approved, false);
  assert.ok(noEvidence.reasonCodes.includes('PRICE_APPROVAL_EVIDENCE_MISSING'));

  const wrongRole = validatePriceApproval(
    { ...approvedPrice, approvedByRole: 'ADMIN' },
    [priceEvidence],
    NOW,
    { territory: 'ES', channel: 'DIRECT' },
  );
  assert.equal(wrongRole.approved, false);
  assert.ok(wrongRole.reasonCodes.includes('PRICE_APPROVER_ROLE_UNAUTHORIZED'));

  const wrongEdition = validatePriceApproval(approvedPrice, [priceEvidence], NOW, {
    territory: 'ES',
    channel: 'DIRECT',
    editionId: 'NAV-PRO',
  });
  assert.equal(wrongEdition.approved, false);
  assert.ok(wrongEdition.reasonCodes.includes('PRICE_EDITION_MISMATCH'));
});

test('unknown price remains null and is never coerced to zero', () => {
  const result = validatePriceApproval(
    { ...approvedPrice, amountMinor: null, priceVersionId: 'PV-UNKNOWN' },
    [priceEvidence],
    NOW,
    { territory: 'ES', channel: 'DIRECT' },
  );
  assert.equal(result.approved, false);
  assert.equal(result.effectivePrice, null);
  assert.ok(result.reasonCodes.includes('PRICE_UNKNOWN'));
});

test('price hypothesis cannot become an effective price', () => {
  const result = validatePriceApproval(
    { ...priceByEdition.get('NAV-ESSENTIAL'), amountMinor: 99000 },
    [],
    NOW,
    { territory: 'ES', channel: 'DIRECT' },
  );
  assert.equal(result.approved, false);
  assert.equal(result.effectivePrice, null);
  assert.ok(result.reasonCodes.includes('PRICE_HYPOTHESIS_UNAPPROVED'));
});

test('inventory requires provenance and rejects admin quantity alone', () => {
  const missing = validateInventoryAvailability([], 'NAV-ESSENTIAL', [], NOW);
  assert.equal(missing.available, false);
  assert.equal(missing.quantity, null);
  assert.ok(missing.reasonCodes.includes('VERIFIED_INVENTORY_MISSING'));

  const verified = validateInventoryAvailability(
    [
      {
        inventoryItemId: 'INV-1',
        editionId: 'NAV-ESSENTIAL',
        skuCode: 'SKU-1',
        quantityOnHand: 5,
        quantityReserved: 1,
        status: 'AVAILABLE',
        verified: true,
        stockEvidenceId: 'EV-STOCK-RECEIPT',
      },
    ],
    'NAV-ESSENTIAL',
    [stockEvidence],
    NOW,
  );
  assert.equal(verified.available, true);
  assert.equal(verified.quantity, 4);

  const adminOnly = validateInventoryAvailability(
    [
      {
        inventoryItemId: 'INV-2',
        editionId: 'NAV-ESSENTIAL',
        skuCode: null,
        quantityOnHand: 99,
        quantityReserved: 0,
        status: 'AVAILABLE',
        verified: false,
        stockEvidenceId: null,
      },
    ],
    'NAV-ESSENTIAL',
    [],
    NOW,
  );
  assert.equal(adminOnly.available, false);
  assert.equal(adminOnly.quantity, null);
});

test('expired evidence is unusable', () => {
  const result = validatePriceApproval(
    approvedPrice,
    [{ ...priceEvidence, expiresAt: '2025-01-01T00:00:00.000Z' }],
    NOW,
    { territory: 'ES', channel: 'DIRECT' },
  );
  assert.equal(result.approved, false);
  assert.ok(result.reasonCodes.includes('PRICE_APPROVAL_EVIDENCE_INVALID'));
});

test('future-issued and malformed-expiry evidence are unusable', () => {
  assert.equal(
    isEvidenceUsable(
      { ...priceEvidence, issuedAt: '2099-01-01T00:00:00.000Z', expiresAt: null },
      NOW,
    ),
    false,
  );
  assert.equal(isEvidenceUsable({ ...priceEvidence, expiresAt: 'not-a-date' }, NOW), false);
  assert.equal(isEvidenceUsable({ ...priceEvidence, issuedAt: null }, NOW), false);
  assert.equal(isEvidenceUsable(priceEvidence, NOW), true);
});

test('readiness requires all eleven dimensions and closed evidence-backed gates', () => {
  const result = evaluateReadiness({
    dimensions: families[0].readiness,
    gates,
    evidence: [],
    now: NOW,
  });
  assert.equal(result.ready, false);
  assert.equal(result.blockingDimensions.length, 10);
  assert.ok(result.blockingGateIds.length >= 12);
});

test('commercial transition is denied during MC-16', () => {
  const result = evaluateReadinessTransition(
    {
      transitionId: 'TR-TEST',
      entityId: 'NAV',
      fromState: 'OPERATIONS_READY',
      toState: 'COMMERCIALLY_AVAILABLE',
      requiredGateIds: gates.map((gate) => gate.gateId),
      requiredEvidenceIds: ['EV-ALL-RELEASE-GATES-CLOSED'],
      requiredApproverRoles: ['PROGRAMME_LEAD'],
      authorizationStatus: 'APPROVED',
      auditEventId: 'AUD-1',
    },
    {
      gates: closedGates,
      evidence: evidenceForGates,
      actor: { actorId: 'lead', roles: ['PROGRAMME_LEAD'] },
      now: NOW,
    },
  );
  assert.equal(result.authorized, false);
  assert.ok(result.reasonCodes.includes('MC16_COMMERCIAL_ACTIVATION_PROHIBITED'));
});

test('any lifecycle transition is denied while MC16 is not explicitly allowed', () => {
  const result = evaluateReadinessTransition(
    {
      transitionId: 'TR-TEST-OPERATIONS',
      entityId: 'NAV',
      fromState: 'DEFINED',
      toState: 'OPERATIONS_READY',
      requiredGateIds: [],
      requiredEvidenceIds: [],
      requiredApproverRoles: ['PROGRAMME_LEAD'],
      authorizationStatus: 'APPROVED',
      auditEventId: 'AUD-1',
    },
    { gates: [], evidence: [], actor: { actorId: 'lead', roles: ['PROGRAMME_LEAD'] }, now: NOW },
  );
  assert.equal(result.authorized, false);
  assert.ok(result.reasonCodes.includes('MC16_TRANSITION_NOT_AUTHORIZED'));
});

test('publication eligibility is false while gates or brand clearance are open', () => {
  const result = evaluatePublicationEligibility({
    gates,
    evidence: [],
    publicationAuthorized: false,
    indexationAuthorized: false,
    commercialAvailability: 'NOT_FOR_SALE',
    brandPublication: 'NOT_GRANTED',
    structuredDataProductOffer: false,
    now: NOW,
  });
  assert.equal(result.eligible, false);
  assert.ok(result.reasonCodes.includes('PUBLICATION_NOT_AUTHORIZED'));
  assert.ok(result.reasonCodes.includes('BRAND_NOT_CLEARED'));
});

test('PILOT bundle is not eligible and SENSE kit modules are not duplicated', () => {
  const editionMap = new Map(editions.map((edition) => [edition.editionId, edition]));
  const sail = evaluateBundleEligibility({
    bundle: model.bundles.bundles.find((bundle) => bundle.bundleId === 'SAIL'),
    editions: editionMap,
    gates,
    evidence: [],
    now: NOW,
  });
  assert.equal(sail.eligible, false);
  assert.ok(sail.reasonCodes.includes('BUNDLE_COMPONENT_SAFETY_BLOCKED'));

  const protect = evaluateBundleEligibility({
    bundle: model.bundles.bundles.find((bundle) => bundle.bundleId === 'PROTECT'),
    editions: editionMap,
    gates,
    evidence: [],
    now: NOW,
  });
  assert.equal(protect.eligible, false);
  assert.equal(
    protect.reasonCodes.some((code) => code.startsWith('BUNDLE_DUPLICATE_MODULE')),
    false,
  );
});

test('shared entitlement ledger prevents duplicate billing', () => {
  const definitions = [
    {
      entitlementId: 'ENT-NAV-PRO',
      capabilityKey: 'NAV_PRO',
      familyId: 'NAV',
      term: 'YEAR',
      sharedLedgerKey: 'ACCOUNT:NAV_PRO',
      status: 'ACTIVE',
      doubleBillingAllowed: false,
      gatesLocalSafety: false,
    },
  ];
  const grant = {
    grantId: 'GRANT-1',
    entitlementId: 'ENT-NAV-PRO',
    scopeType: 'ACCOUNT',
    scopeId: 'acct-1',
    state: 'ACTIVE',
    basis: 'SYNTHETIC_TEST',
    synthetic: true,
    startsAt: '2026-01-01T00:00:00.000Z',
    endsAt: null,
    actorId: 'test',
    auditEventId: 'AUD-1',
  };
  const result = resolveEntitlementDependencies(
    [grant, { ...grant, grantId: 'GRANT-2' }],
    definitions,
    NOW,
  );
  assert.equal(result.duplicates.length, 1);
  assert.equal(result.duplicates[0].reason, 'DUPLICATE_BILLING_PREVENTED');
  assert.equal(result.resolved.filter((entry) => entry.billable).length, 1);
});

test('WATCH local safety cannot be gated by an entitlement', () => {
  const result = validateEntitlementGrant(
    {
      grantId: 'GRANT-WATCH',
      entitlementId: 'ENT-WATCH',
      scopeType: 'ACCOUNT',
      scopeId: 'acct-1',
      state: 'ACTIVE',
      basis: 'SYNTHETIC_TEST',
      synthetic: true,
      startsAt: '2026-01-01T00:00:00.000Z',
      endsAt: null,
      actorId: 'test',
      auditEventId: 'AUD-1',
    },
    {
      entitlementId: 'ENT-WATCH',
      capabilityKey: 'WATCH',
      familyId: 'WATCH',
      term: 'MONTH',
      sharedLedgerKey: 'ACCOUNT:WATCH',
      status: 'ACTIVE',
      doubleBillingAllowed: false,
      gatesLocalSafety: true,
    },
    undefined,
    { actorId: 'admin', roles: ['ENTITLEMENT_ADMIN'] },
    NOW,
  );
  assert.equal(result.valid, false);
  assert.ok(result.reasonCodes.includes('LOCAL_SAFETY_MUST_NOT_BE_GATED'));
});

test('real grants and billing activation are rejected', () => {
  const definition = {
    entitlementId: 'ENT-NAV-PRO',
    capabilityKey: 'NAV_PRO',
    familyId: 'NAV',
    term: 'YEAR',
    sharedLedgerKey: 'ACCOUNT:NAV_PRO',
    status: 'ACTIVE',
    doubleBillingAllowed: false,
    gatesLocalSafety: false,
  };
  const result = validateEntitlementGrant(
    {
      grantId: 'GRANT-REAL',
      entitlementId: 'ENT-NAV-PRO',
      scopeType: 'ACCOUNT',
      scopeId: 'acct-1',
      state: 'ACTIVE',
      basis: 'PURCHASE',
      synthetic: false,
      startsAt: '2026-01-01T00:00:00.000Z',
      endsAt: null,
      actorId: 'test',
      auditEventId: 'AUD-1',
    },
    definition,
    {
      planId: 'RS-1',
      entitlementId: 'ENT-NAV-PRO',
      billingImplemented: true,
      checkoutAllowed: true,
    },
    { actorId: 'admin', roles: ['ENTITLEMENT_ADMIN'] },
    NOW,
  );
  assert.equal(result.valid, false);
  assert.ok(result.reasonCodes.includes('REAL_ENTITLEMENT_GRANT_PROHIBITED_MC16'));
  assert.ok(result.reasonCodes.includes('BILLING_NOT_IMPLEMENTED'));
  assert.ok(result.reasonCodes.includes('CHECKOUT_NOT_AUTHORIZED'));
});

test('audit event contract rejects secrets and missing evidence', () => {
  const valid = validateAuditEvent({
    eventId: 'AUD-1',
    entityType: 'PRODUCT_EDITION',
    entityId: 'NAV-ESSENTIAL',
    eventType: 'PRICE_REVISED',
    previousVersion: '1',
    newVersion: '2',
    actorId: 'finance-1',
    actorRole: 'FINANCE_LEAD',
    timestamp: NOW,
    reason: 'Evidence reviewed',
    evidenceRefs: ['EV-1'],
    correlationId: 'CORR-1',
    result: 'RECORDED',
    prevEventHash: null,
    eventHash: 'a'.repeat(64),
  });
  assert.equal(valid.valid, true, JSON.stringify(valid.reasonCodes));

  const invalid = validateAuditEvent({
    eventId: 'AUD-2',
    entityType: 'PRODUCT_EDITION',
    entityId: 'NAV-ESSENTIAL',
    eventType: 'PRICE_REVISED',
    previousVersion: '1',
    newVersion: '2',
    actorId: 'finance-1',
    actorRole: 'FINANCE_LEAD',
    timestamp: NOW,
    reason: 'card pan copied',
    evidenceRefs: [],
    correlationId: 'CORR-2',
    result: 'RECORDED',
    prevEventHash: null,
    eventHash: 'b'.repeat(64),
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.reasonCodes.includes('AUDIT_EVIDENCE_REQUIRED'));
  assert.ok(invalid.reasonCodes.includes('AUDIT_SECRET_OR_PAYMENT_DATA'));
});
