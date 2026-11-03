/**
 * MC-16 internal commerce domain.
 *
 * This module is deliberately isolated from the public shop, checkout and Stripe
 * code paths. It is a pure domain layer: every evaluator fails closed, every
 * current MAREA entity is non-merchantable, and no evaluator mutates data.
 */

export const MC16_POLICY_VERSION = 'MC16-COMMERCE-POLICY-1.0.0';

export const GATE_CLOSED_STATUS = 'CLOSED_VERIFIED' as const;

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
] as const;

export type ReadinessDimension = (typeof READINESS_DIMENSIONS)[number];

export type LifecycleState =
  | 'CONCEPT'
  | 'DEFINED'
  | 'ENGINEERING_VERIFIED'
  | 'REGULATORY_READY'
  | 'OPERATIONS_READY'
  | 'COMMERCIALLY_AVAILABLE'
  | 'RETIRED';

export type PriceStatus =
  | 'HYPOTHESIS_UNAPPROVED'
  | 'NOT_ESTABLISHED'
  | 'NOT_APPLICABLE'
  | 'APPROVED'
  | 'EXPIRED'
  | 'REVOKED';

export type GateStatus = 'BLOCKED' | 'EVIDENCE_REQUIRED' | 'EVIDENCE_SUBMITTED' | 'CLOSED_VERIFIED';

export type EvidenceClass =
  | 'VERIFIED_EXTERNAL'
  | 'REPOSITORY_VERIFIED'
  | 'ENGINEERING_DESIGN'
  | 'HYPOTHESIS_UNAPPROVED'
  | 'UNKNOWN'
  | 'NOT_GRANTED'
  | 'NOT_APPLICABLE';

export type Inclusion = 'INCLUDED' | 'OPTIONAL' | 'CONDITIONAL' | 'QUOTATION_REQUIRED';

export interface ReadinessDimensions {
  definition: string;
  engineering: string;
  licensing: string;
  hardware: string;
  dataRights: string;
  compliance: string;
  safety: string;
  pricing: string;
  brandPublication: string;
  operations: string;
  availability: string;
}

export interface ProductFamily {
  familyId: string;
  displayName: string;
  productType: string;
  lifecycleState: LifecycleState;
  publicationState: string;
  commercialAvailability: string;
  editionIds: string[];
  readiness: ReadinessDimensions;
  releaseGateDependencies: string[];
}

export interface ProductEdition {
  editionId: string;
  familyId: string;
  definitionStatus: string;
  editionType: string;
  lifecycleState: LifecycleState;
  engineeringStatus: string;
  licensingStatus: string;
  hardwareStatus: string;
  dataRightsStatus: string;
  complianceStatus: string;
  safetyStatus: string;
  priceStatus: PriceStatus;
  commercialStatus: string;
  commercialAvailability: string;
  publicationState: string;
  merchantable: boolean;
  priceApproved: boolean;
  merchantSkuCode: string | null;
  requiresQuotation: boolean;
  dependencyIds: string[];
  expandsTo: string[];
  releaseGateDependencies: string[];
}

export interface MerchantSKU {
  skuCode: string;
  editionId: string;
  state: 'CANDIDATE' | 'APPROVED' | 'ACTIVE' | 'RETIRED';
  merchantable: boolean;
  priceApproved: boolean;
  approvalEvidenceIds: string[];
}

export interface BundleComponent {
  lineId: string;
  editionId: string;
  familyId: string;
  quantity: number;
  inclusion: Inclusion;
  required: boolean;
  expandsTo: string[];
  subscriptionCapabilityIds: string[];
}

export interface BundleDefinition {
  bundleId: string;
  lifecycleState: LifecycleState;
  readinessState: string;
  commercialAvailability: string;
  priceStatus: PriceStatus;
  fixedPackagePriceEstablished: boolean;
  contractedSolution: boolean;
  hardwareIncludedByDefault: boolean;
  slaEstablished: boolean;
  components: BundleComponent[];
  optionalComponents: BundleComponent[];
  ineligibleEditions: Array<{ lineId: string; editionId: string; reason: string }>;
  contractOnlyEditions: Array<{ lineId: string; editionId: string; reason: string }>;
  releaseGateDependencies: string[];
}

export interface ReleaseGate {
  gateId: string;
  status: GateStatus;
  closureEvidenceIds?: string[];
  affectedFamilyIds?: string[];
  affectedBundleIds?: string[];
}

export interface EvidenceRecord {
  evidenceId: string;
  evidenceType: string;
  evidenceClass: EvidenceClass;
  gateId?: string | null;
  verified: boolean;
  status?: string;
  issuedBy?: string | null;
  issuedAt?: string | null;
  expiresAt?: string | null;
  revokedAt?: string | null;
}

export interface PriceVersion {
  priceVersionId: string;
  editionId: string;
  status: PriceStatus;
  amountMinor: number | null;
  currency: string | null;
  territory: string | null;
  channel: string | null;
  vatBasis: string | null;
  includesVat: boolean | null;
  effectiveFrom: string | null;
  effectiveTo: string | null;
  approvedBy: string | null;
  approvedByRole: string | null;
  approvalEvidenceIds: string[];
}

export interface InventoryItem {
  inventoryItemId: string;
  editionId: string;
  skuCode: string | null;
  quantityOnHand: number | null;
  quantityReserved: number | null;
  status: string;
  verified: boolean;
  stockEvidenceId: string | null;
}

export interface EntitlementDefinition {
  entitlementId: string;
  capabilityKey: string;
  familyId: string | null;
  term: string;
  sharedLedgerKey: string;
  status: string;
  doubleBillingAllowed: boolean;
  gatesLocalSafety: boolean;
}

export interface EntitlementGrant {
  grantId: string;
  entitlementId: string;
  scopeType: 'ACCOUNT' | 'ORGANIZATION' | 'TENANT' | 'VESSEL' | 'DEVICE';
  scopeId: string;
  state: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  basis: string;
  synthetic: boolean;
  startsAt: string;
  endsAt: string | null;
  actorId: string;
  auditEventId: string;
}

export interface SubscriptionState {
  planId: string;
  entitlementId: string;
  billingImplemented: boolean;
  checkoutAllowed: boolean;
}

export interface Actor {
  actorId: string;
  roles: string[];
}

export interface ReadinessTransition {
  transitionId: string;
  entityId: string;
  fromState: LifecycleState;
  toState: LifecycleState;
  requiredGateIds: string[];
  requiredEvidenceIds: string[];
  requiredApproverRoles: string[];
  authorizationStatus: string;
  auditEventId: string | null;
  mc16Allowed?: boolean;
}

export interface AuditEvent {
  eventId: string;
  entityType: string;
  entityId: string;
  eventType: string;
  previousVersion: string | null;
  newVersion: string | null;
  actorId: string;
  actorRole: string;
  timestamp: string;
  reason: string;
  evidenceRefs: string[];
  correlationId: string;
  result: 'DENIED' | 'ACCEPTED' | 'RECORDED';
  prevEventHash: string | null;
  eventHash: string;
}

export interface PurchasabilityContext {
  family: ProductFamily | null;
  edition: ProductEdition | null;
  merchantSku: MerchantSKU | null;
  gates: ReleaseGate[];
  evidence: EvidenceRecord[];
  price: PriceVersion | null;
  inventory: InventoryItem[];
  actor: Actor | null;
  territory: string | null;
  channel: string | null;
  now: string;
  adminActivated?: boolean;
  clientClaims?: Record<string, unknown> | null;
  publicationAuthorized?: boolean;
  policyVersion?: string;
}

export interface PurchasabilityDecision {
  allowed: boolean;
  reasonCodes: string[];
  blockingGateIds: string[];
  missingEvidenceIds: string[];
  effectivePrice: {
    amountMinor: number;
    currency: string;
    territory: string;
    channel: string;
    vatBasis: string;
    includesVat: boolean;
  } | null;
  effectiveStock: number | null;
  evaluatedAt: string;
  policyVersion: string;
}

const READY_VALUES: Record<ReadinessDimension, string> = {
  definition: 'COMPLETE_TARGET_SPECIFICATION',
  engineering: 'ENGINEERING_VERIFIED',
  licensing: 'CLEARED',
  hardware: 'CERTIFIED',
  dataRights: 'GRANTED_PER_TERRITORY',
  compliance: 'CONFORMANCE_EVIDENCE_ON_FILE',
  safety: 'SAFETY_APPROVED',
  pricing: 'APPROVED',
  brandPublication: 'PUBLICATION_APPROVED',
  operations: 'OPERATIONS_READY',
  availability: 'FOR_SALE',
};

export function isIsoDate(value: string | null | undefined): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

export function isEvidenceUsable(
  evidence: EvidenceRecord | undefined,
  now: string,
  allowedClasses: EvidenceClass[] = ['VERIFIED_EXTERNAL', 'REPOSITORY_VERIFIED'],
): boolean {
  if (!evidence) return false;
  if (!evidence.verified) return false;
  if (evidence.status === 'REVOKED' || evidence.status === 'EXPIRED') return false;
  if (evidence.revokedAt) return false;
  if (!allowedClasses.includes(evidence.evidenceClass)) return false;
  if (!isIsoDate(now)) return false;
  if (!isIsoDate(evidence.issuedAt)) return false;
  if (Date.parse(evidence.issuedAt!) > Date.parse(now)) return false;
  if (evidence.expiresAt !== null && evidence.expiresAt !== undefined) {
    if (!isIsoDate(evidence.expiresAt)) return false;
    if (Date.parse(evidence.expiresAt) <= Date.parse(now)) return false;
  }
  if (!evidence.issuedBy) return false;
  return true;
}

export function evaluateReadiness(input: {
  dimensions: ReadinessDimensions;
  gates: ReleaseGate[];
  evidence: EvidenceRecord[];
  now: string;
}): {
  ready: boolean;
  blockingDimensions: Array<{ dimension: ReadinessDimension; actual: string; required: string }>;
  blockingGateIds: string[];
  missingEvidenceIds: string[];
  evaluatedAt: string;
  policyVersion: string;
} {
  const blockingDimensions: Array<{
    dimension: ReadinessDimension;
    actual: string;
    required: string;
  }> = [];
  for (const dimension of READINESS_DIMENSIONS) {
    const actual = input.dimensions[dimension];
    if (actual !== READY_VALUES[dimension]) {
      blockingDimensions.push({
        dimension,
        actual: actual ?? 'UNKNOWN',
        required: READY_VALUES[dimension],
      });
    }
  }
  const gateEvaluation = evaluateGates(input.gates, input.evidence, input.now);
  return {
    ready:
      blockingDimensions.length === 0 &&
      gateEvaluation.blockingGateIds.length === 0 &&
      gateEvaluation.missingEvidenceIds.length === 0,
    blockingDimensions,
    blockingGateIds: gateEvaluation.blockingGateIds,
    missingEvidenceIds: gateEvaluation.missingEvidenceIds,
    evaluatedAt: input.now,
    policyVersion: MC16_POLICY_VERSION,
  };
}

export function evaluateGates(
  gates: ReleaseGate[],
  evidence: EvidenceRecord[],
  now: string,
): { blockingGateIds: string[]; missingEvidenceIds: string[] } {
  const blockingGateIds: string[] = [];
  const missingEvidenceIds: string[] = [];
  if (!Array.isArray(gates) || gates.length === 0) {
    blockingGateIds.push('GATE-SET-MISSING');
    return { blockingGateIds, missingEvidenceIds };
  }
  const evidenceById = new Map(evidence.map((item) => [item.evidenceId, item]));
  for (const gate of gates) {
    if (gate.status !== GATE_CLOSED_STATUS) {
      blockingGateIds.push(gate.gateId);
      continue;
    }
    const closureIds = gate.closureEvidenceIds ?? [];
    if (closureIds.length === 0) {
      blockingGateIds.push(gate.gateId);
      missingEvidenceIds.push(`EV-${gate.gateId}-CLOSURE`);
      continue;
    }
    for (const evidenceId of closureIds) {
      if (!isEvidenceUsable(evidenceById.get(evidenceId), now)) {
        blockingGateIds.push(gate.gateId);
        missingEvidenceIds.push(evidenceId);
      }
    }
  }
  return {
    blockingGateIds: [...new Set(blockingGateIds)].sort(),
    missingEvidenceIds: [...new Set(missingEvidenceIds)].sort(),
  };
}

export function validatePriceApproval(
  price: PriceVersion | null,
  evidence: EvidenceRecord[],
  now: string,
  scope: { territory: string | null; channel: string | null; editionId?: string | null },
): {
  approved: boolean;
  reasonCodes: string[];
  missingEvidenceIds: string[];
  effectivePrice: PurchasabilityDecision['effectivePrice'];
} {
  const reasonCodes: string[] = [];
  const missingEvidenceIds: string[] = [];
  if (!price) {
    return {
      approved: false,
      reasonCodes: ['PRICE_NOT_ESTABLISHED'],
      missingEvidenceIds: [],
      effectivePrice: null,
    };
  }
  if (price.status === 'HYPOTHESIS_UNAPPROVED') reasonCodes.push('PRICE_HYPOTHESIS_UNAPPROVED');
  else if (price.status === 'NOT_ESTABLISHED') reasonCodes.push('PRICE_NOT_ESTABLISHED');
  else if (price.status === 'NOT_APPLICABLE') reasonCodes.push('PRICE_NOT_APPLICABLE');
  else if (price.status === 'EXPIRED') reasonCodes.push('PRICE_EXPIRED');
  else if (price.status === 'REVOKED') reasonCodes.push('PRICE_REVOKED');
  else if (price.status !== 'APPROVED') reasonCodes.push('PRICE_STATUS_UNKNOWN');

  if (price.amountMinor === null) reasonCodes.push('PRICE_UNKNOWN');
  else if (!Number.isInteger(price.amountMinor) || price.amountMinor < 0)
    reasonCodes.push('PRICE_INVALID_MINOR_UNITS');

  for (const field of ['currency', 'territory', 'channel', 'vatBasis'] as const) {
    if (!price[field]) reasonCodes.push(`PRICE_${field.toUpperCase()}_MISSING`);
  }
  if (price.includesVat === null) reasonCodes.push('PRICE_VAT_BASIS_MISSING');
  if (!price.approvedBy) reasonCodes.push('PRICE_APPROVER_MISSING');
  if (!['FINANCE_LEAD', 'COMMERCIAL_DIRECTOR'].includes(price.approvedByRole ?? '')) {
    reasonCodes.push('PRICE_APPROVER_ROLE_UNAUTHORIZED');
  }
  if (!price.effectiveFrom || !isIsoDate(price.effectiveFrom))
    reasonCodes.push('PRICE_EFFECTIVE_FROM_MISSING');
  if (
    price.effectiveFrom &&
    isIsoDate(price.effectiveFrom) &&
    Date.parse(price.effectiveFrom) > Date.parse(now)
  ) {
    reasonCodes.push('PRICE_NOT_YET_EFFECTIVE');
  }
  if (
    price.effectiveTo &&
    isIsoDate(price.effectiveTo) &&
    Date.parse(price.effectiveTo) <= Date.parse(now)
  ) {
    reasonCodes.push('PRICE_EXPIRED');
  }
  if (scope.territory !== null && price.territory !== null && scope.territory !== price.territory) {
    reasonCodes.push('PRICE_TERRITORY_MISMATCH');
  }
  if (scope.channel !== null && price.channel !== null && scope.channel !== price.channel) {
    reasonCodes.push('PRICE_CHANNEL_MISMATCH');
  }
  if (scope.editionId && price.editionId !== scope.editionId) {
    reasonCodes.push('PRICE_EDITION_MISMATCH');
  }

  const evidenceById = new Map(evidence.map((item) => [item.evidenceId, item]));
  if (price.status === 'APPROVED') {
    if (price.approvalEvidenceIds.length === 0) {
      reasonCodes.push('PRICE_APPROVAL_EVIDENCE_MISSING');
    }
    for (const evidenceId of price.approvalEvidenceIds) {
      const record = evidenceById.get(evidenceId);
      if (!record) {
        reasonCodes.push('PRICE_APPROVAL_EVIDENCE_MISSING');
        missingEvidenceIds.push(evidenceId);
        continue;
      }
      if (!['PRICE_APPROVAL', 'EXTERNAL_PRICE_LIST'].includes(record.evidenceType)) {
        reasonCodes.push('PRICE_APPROVAL_EVIDENCE_WRONG_TYPE');
      }
      if (!isEvidenceUsable(record, now, ['VERIFIED_EXTERNAL'])) {
        reasonCodes.push('PRICE_APPROVAL_EVIDENCE_INVALID');
        missingEvidenceIds.push(evidenceId);
      }
    }
  }

  const approved = reasonCodes.length === 0;
  return {
    approved,
    reasonCodes: [...new Set(reasonCodes)],
    missingEvidenceIds: [...new Set(missingEvidenceIds)],
    effectivePrice:
      approved &&
      price.amountMinor !== null &&
      price.currency &&
      price.territory &&
      price.channel &&
      price.vatBasis &&
      price.includesVat !== null
        ? {
            amountMinor: price.amountMinor,
            currency: price.currency,
            territory: price.territory,
            channel: price.channel,
            vatBasis: price.vatBasis,
            includesVat: price.includesVat,
          }
        : null,
  };
}

export function validateInventoryAvailability(
  inventory: InventoryItem[],
  editionId: string,
  evidence: EvidenceRecord[],
  now: string,
): {
  available: boolean;
  quantity: number | null;
  reasonCodes: string[];
  missingEvidenceIds: string[];
} {
  const reasonCodes: string[] = [];
  const missingEvidenceIds: string[] = [];
  if (!editionId) {
    return {
      available: false,
      quantity: null,
      reasonCodes: ['EDITION_ID_MISSING'],
      missingEvidenceIds,
    };
  }
  const evidenceById = new Map(evidence.map((item) => [item.evidenceId, item]));
  const candidates = inventory.filter((item) => item.editionId === editionId);
  if (candidates.length === 0) {
    return {
      available: false,
      quantity: null,
      reasonCodes: ['VERIFIED_INVENTORY_MISSING'],
      missingEvidenceIds,
    };
  }
  let availableQuantity = 0;
  let sawUsableInventory = false;
  for (const item of candidates) {
    if (!item.verified) {
      reasonCodes.push('INVENTORY_UNVERIFIED');
      continue;
    }
    if (item.status !== 'AVAILABLE') {
      reasonCodes.push('INVENTORY_NOT_AVAILABLE');
      continue;
    }
    if (!item.stockEvidenceId) {
      reasonCodes.push('INVENTORY_EVIDENCE_MISSING');
      continue;
    }
    if (
      !isEvidenceUsable(evidenceById.get(item.stockEvidenceId), now, [
        'VERIFIED_EXTERNAL',
        'REPOSITORY_VERIFIED',
      ])
    ) {
      reasonCodes.push('INVENTORY_EVIDENCE_INVALID');
      missingEvidenceIds.push(item.stockEvidenceId);
      continue;
    }
    if (item.quantityOnHand === null || item.quantityReserved === null) {
      reasonCodes.push('INVENTORY_QUANTITY_UNKNOWN');
      continue;
    }
    if (!Number.isInteger(item.quantityOnHand) || !Number.isInteger(item.quantityReserved)) {
      reasonCodes.push('INVENTORY_QUANTITY_INVALID');
      continue;
    }
    if (
      item.quantityOnHand < 0 ||
      item.quantityReserved < 0 ||
      item.quantityReserved > item.quantityOnHand
    ) {
      reasonCodes.push('INVENTORY_QUANTITY_INVARIANT_VIOLATED');
      continue;
    }
    sawUsableInventory = true;
    availableQuantity += item.quantityOnHand - item.quantityReserved;
  }
  if (!sawUsableInventory) {
    return {
      available: false,
      quantity: null,
      reasonCodes: [...new Set(reasonCodes.length ? reasonCodes : ['VERIFIED_INVENTORY_MISSING'])],
      missingEvidenceIds: [...new Set(missingEvidenceIds)],
    };
  }
  if (availableQuantity <= 0) {
    return {
      available: false,
      quantity: 0,
      reasonCodes: [...new Set([...reasonCodes, 'NO_AVAILABLE_QUANTITY'])],
      missingEvidenceIds,
    };
  }
  if (reasonCodes.length > 0) {
    return {
      available: false,
      quantity: null,
      reasonCodes: [...new Set(reasonCodes)],
      missingEvidenceIds,
    };
  }
  return { available: true, quantity: availableQuantity, reasonCodes: [], missingEvidenceIds };
}

export function evaluatePurchasability(context: PurchasabilityContext): PurchasabilityDecision {
  const reasonCodes = new Set<string>();
  const missingEvidenceIds = new Set<string>();
  const now = context.now;
  const territory = context.territory;
  const channel = context.channel;

  if (!context.family) reasonCodes.add('ENTITY_FAMILY_MISSING');
  if (!context.edition) reasonCodes.add('ENTITY_EDITION_MISSING');
  if (!context.actor || context.actor.roles.length === 0) reasonCodes.add('ACTOR_UNAUTHORIZED');
  if (context.adminActivated) reasonCodes.add('ADMIN_ACTIVATION_IGNORED');
  if (context.clientClaims && Object.keys(context.clientClaims).length > 0)
    reasonCodes.add('CLIENT_CLAIMS_IGNORED');

  if (context.family) {
    if (context.family.commercialAvailability !== 'FOR_SALE')
      reasonCodes.add('FAMILY_NOT_FOR_SALE');
    if (
      context.family.lifecycleState === 'CONCEPT' ||
      context.family.lifecycleState === 'DEFINED'
    ) {
      reasonCodes.add('FAMILY_LIFECYCLE_NOT_COMMERCIAL');
    }
    if (context.family.readiness.licensing !== 'CLEARED') reasonCodes.add('LICENSING_NOT_CLEARED');
    if (context.family.readiness.brandPublication !== 'PUBLICATION_APPROVED')
      reasonCodes.add('BRAND_NOT_CLEARED');
    if (context.family.readiness.operations !== 'OPERATIONS_READY')
      reasonCodes.add('OPERATIONS_NOT_READY');
    if (context.family.readiness.availability !== 'FOR_SALE')
      reasonCodes.add('AVAILABILITY_NOT_READY');
  }

  if (context.edition) {
    if (context.edition.merchantable !== true) reasonCodes.add('EDITION_NOT_MERCHANTABLE');
    if (context.edition.commercialAvailability !== 'FOR_SALE')
      reasonCodes.add('EDITION_NOT_FOR_SALE');
    if (context.edition.priceApproved !== true) reasonCodes.add('EDITION_PRICE_NOT_APPROVED');
    if (context.edition.publicationState !== 'PUBLISHED') reasonCodes.add('EDITION_NOT_PUBLISHED');
    if (context.edition.safetyStatus === 'BLOCKED') reasonCodes.add('SAFETY_BLOCKED');
    if (context.edition.familyId === 'AIS') reasonCodes.add('AIS_RECEIVE_ONLY_NO_TRANSMISSION');
    if (context.edition.familyId === 'PILOT') reasonCodes.add('PILOT_QUOTATION_ONLY_NOT_CHECKOUT');
    if (context.edition.editionId === 'PILOT-PRO')
      reasonCodes.add('PILOT_PRO_INSTALLATION_PACKAGE_NOT_A_SKU');
    if (context.edition.editionId === 'FLEET-ENTERPRISE')
      reasonCodes.add('FLEET_ENTERPRISE_CONTRACT_ONLY');
    if (context.edition.editionId === 'DISPLAY-LARGE-CONDITIONAL')
      reasonCodes.add('DISPLAY_LARGE_CONDITIONAL_NOT_SELECTABLE');
  }

  if (!context.merchantSku) {
    reasonCodes.add('MERCHANT_SKU_MISSING');
  } else {
    if (context.merchantSku.merchantable !== true) reasonCodes.add('MERCHANT_SKU_NOT_MERCHANTABLE');
    if (context.merchantSku.priceApproved !== true)
      reasonCodes.add('MERCHANT_SKU_PRICE_NOT_APPROVED');
    if (context.merchantSku.state !== 'ACTIVE') reasonCodes.add('MERCHANT_SKU_NOT_ACTIVE');
    if (context.merchantSku.approvalEvidenceIds.length === 0)
      reasonCodes.add('MERCHANT_SKU_APPROVAL_EVIDENCE_MISSING');
    for (const evidenceId of context.merchantSku.approvalEvidenceIds) {
      if (!isEvidenceUsable(evidenceById.get(evidenceId), now, ['VERIFIED_EXTERNAL'])) {
        reasonCodes.add('MERCHANT_SKU_APPROVAL_EVIDENCE_INVALID');
        missingEvidenceIds.add(evidenceId);
      }
    }
    if (!context.edition || context.merchantSku.editionId !== context.edition.editionId) {
      reasonCodes.add('MERCHANT_SKU_EDITION_MISMATCH');
    }
  }

  const evidenceById = new Map(context.evidence.map((item) => [item.evidenceId, item]));
  const gateResult = evaluateGates(context.gates, context.evidence, now);
  for (const gateId of gateResult.blockingGateIds) reasonCodes.add(`GATE_OPEN:${gateId}`);
  for (const evidenceId of gateResult.missingEvidenceIds) missingEvidenceIds.add(evidenceId);

  if (!context.publicationAuthorized) reasonCodes.add('PUBLICATION_NOT_AUTHORIZED');
  if (context.edition) {
    if (context.edition.complianceStatus !== 'CONFORMANCE_EVIDENCE_ON_FILE')
      reasonCodes.add('COMPLIANCE_NOT_READY');
    if (context.edition.licensingStatus !== 'CLEARED') reasonCodes.add('LICENSING_NOT_CLEARED');
    if (
      context.edition.dataRightsStatus !== 'GRANTED_PER_TERRITORY' &&
      context.edition.requiresQuotation === false
    ) {
      if (
        context.edition.familyId === 'NAV' ||
        context.edition.familyId === 'WEATHER' ||
        context.edition.familyId === 'FLEET'
      ) {
        reasonCodes.add('DATA_RIGHTS_NOT_GRANTED');
      }
    }
  }

  const priceResult = validatePriceApproval(context.price, context.evidence, now, {
    territory,
    channel,
    editionId: context.edition?.editionId ?? null,
  });
  for (const code of priceResult.reasonCodes) reasonCodes.add(code);
  for (const evidenceId of priceResult.missingEvidenceIds) missingEvidenceIds.add(evidenceId);

  const inventoryResult = context.edition
    ? validateInventoryAvailability(
        context.inventory,
        context.edition.editionId,
        context.evidence,
        now,
      )
    : {
        available: false,
        quantity: null,
        reasonCodes: ['EDITION_ID_MISSING'],
        missingEvidenceIds: [] as string[],
      };
  for (const code of inventoryResult.reasonCodes) reasonCodes.add(code);
  for (const evidenceId of inventoryResult.missingEvidenceIds) missingEvidenceIds.add(evidenceId);

  if (territory === null) reasonCodes.add('TERRITORY_MISSING');
  if (channel === null) reasonCodes.add('CHANNEL_MISSING');

  const allowed = reasonCodes.size === 0;
  return {
    allowed,
    reasonCodes: [...reasonCodes].sort(),
    blockingGateIds: gateResult.blockingGateIds,
    missingEvidenceIds: [...missingEvidenceIds].sort(),
    effectivePrice: allowed ? priceResult.effectivePrice : null,
    effectiveStock: allowed ? inventoryResult.quantity : null,
    evaluatedAt: now,
    policyVersion: context.policyVersion ?? MC16_POLICY_VERSION,
  };
}

export function evaluatePublicationEligibility(input: {
  gates: ReleaseGate[];
  evidence: EvidenceRecord[];
  publicationAuthorized: boolean;
  indexationAuthorized: boolean;
  commercialAvailability: string;
  brandPublication: string;
  structuredDataProductOffer: boolean;
  now: string;
}): { eligible: boolean; reasonCodes: string[]; blockingGateIds: string[] } {
  const reasonCodes = new Set<string>();
  const gateResult = evaluateGates(input.gates, input.evidence, input.now);
  if (!input.publicationAuthorized) reasonCodes.add('PUBLICATION_NOT_AUTHORIZED');
  if (!input.indexationAuthorized) reasonCodes.add('INDEXATION_NOT_AUTHORIZED');
  if (input.commercialAvailability !== 'FOR_SALE') reasonCodes.add('PRODUCT_NOT_FOR_SALE');
  if (input.brandPublication !== 'PUBLICATION_APPROVED') reasonCodes.add('BRAND_NOT_CLEARED');
  if (input.structuredDataProductOffer) reasonCodes.add('PUBLIC_PRODUCT_OFFER_MARKUP_PROHIBITED');
  for (const gateId of gateResult.blockingGateIds) reasonCodes.add(`GATE_OPEN:${gateId}`);
  return {
    eligible: reasonCodes.size === 0,
    reasonCodes: [...reasonCodes].sort(),
    blockingGateIds: gateResult.blockingGateIds,
  };
}

export function evaluateBundleEligibility(input: {
  bundle: BundleDefinition;
  editions: Map<string, ProductEdition>;
  gates: ReleaseGate[];
  evidence: EvidenceRecord[];
  now: string;
}): {
  eligible: boolean;
  reasonCodes: string[];
  blockingGateIds: string[];
  unresolvedEditionIds: string[];
} {
  const reasonCodes = new Set<string>();
  const unresolvedEditionIds: string[] = [];
  const gateResult = evaluateGates(input.gates, input.evidence, input.now);
  for (const gateId of gateResult.blockingGateIds) reasonCodes.add(`GATE_OPEN:${gateId}`);
  if (input.bundle.commercialAvailability !== 'FOR_SALE') reasonCodes.add('BUNDLE_NOT_FOR_SALE');
  if (input.bundle.fixedPackagePriceEstablished)
    reasonCodes.add('BUNDLE_FIXED_PRICE_WITHOUT_APPROVAL');
  if (input.bundle.ineligibleEditions.length > 0)
    reasonCodes.add('BUNDLE_HAS_INELIGIBLE_COMPONENT');
  if (input.bundle.contractOnlyEditions.length > 0)
    reasonCodes.add('BUNDLE_HAS_CONTRACT_ONLY_COMPONENT');
  if (input.bundle.contractedSolution) reasonCodes.add('CONTRACTED_B2B_NOT_SELF_SERVICE');
  if (input.bundle.hardwareIncludedByDefault) reasonCodes.add('FLEET_HARDWARE_MUST_NOT_BE_DEFAULT');
  const components = [...input.bundle.components, ...input.bundle.optionalComponents];
  const effectiveModuleCount = new Map<string, number>();
  for (const component of components) {
    const edition = input.editions.get(component.editionId);
    if (!edition) {
      unresolvedEditionIds.push(component.editionId);
      reasonCodes.add('BUNDLE_COMPONENT_UNRESOLVED');
      continue;
    }
    if (edition.safetyStatus === 'BLOCKED') reasonCodes.add('BUNDLE_COMPONENT_SAFETY_BLOCKED');
    if (edition.editionId === 'PILOT-PRO') reasonCodes.add('PILOT_PRO_NOT_A_BUNDLE_LINE');
    if (edition.commercialAvailability !== 'FOR_SALE')
      reasonCodes.add('BUNDLE_COMPONENT_NOT_FOR_SALE');
    if (component.expandsTo.length > 0) {
      for (const moduleId of component.expandsTo) {
        effectiveModuleCount.set(
          moduleId,
          (effectiveModuleCount.get(moduleId) ?? 0) + component.quantity,
        );
      }
    } else {
      effectiveModuleCount.set(
        component.editionId,
        (effectiveModuleCount.get(component.editionId) ?? 0) + component.quantity,
      );
    }
  }
  for (const [moduleId, count] of effectiveModuleCount) {
    if (count > 1) reasonCodes.add(`BUNDLE_DUPLICATE_MODULE:${moduleId}`);
  }
  return {
    eligible: reasonCodes.size === 0,
    reasonCodes: [...reasonCodes].sort(),
    blockingGateIds: gateResult.blockingGateIds,
    unresolvedEditionIds,
  };
}

export function resolveEntitlementDependencies(
  grants: EntitlementGrant[],
  definitions: EntitlementDefinition[],
  now: string,
): {
  resolved: Array<{
    grantId: string;
    entitlementId: string;
    ledgerKey: string;
    billable: boolean;
    resolution: string;
  }>;
  duplicates: Array<{ grantId: string; entitlementId: string; ledgerKey: string; reason: string }>;
  billableLedgerKeys: string[];
} {
  const definitionById = new Map(
    definitions.map((definition) => [definition.entitlementId, definition]),
  );
  const seen = new Set<string>();
  const resolved: Array<{
    grantId: string;
    entitlementId: string;
    ledgerKey: string;
    billable: boolean;
    resolution: string;
  }> = [];
  const duplicates: Array<{
    grantId: string;
    entitlementId: string;
    ledgerKey: string;
    reason: string;
  }> = [];
  for (const grant of [...grants].sort((a, b) => a.grantId.localeCompare(b.grantId))) {
    const definition = definitionById.get(grant.entitlementId);
    if (!definition) {
      resolved.push({
        grantId: grant.grantId,
        entitlementId: grant.entitlementId,
        ledgerKey: 'UNKNOWN',
        billable: false,
        resolution: 'UNKNOWN_DEFINITION',
      });
      continue;
    }
    if (grant.state !== 'ACTIVE') {
      resolved.push({
        grantId: grant.grantId,
        entitlementId: grant.entitlementId,
        ledgerKey: definition.sharedLedgerKey,
        billable: false,
        resolution: 'NOT_ACTIVE',
      });
      continue;
    }
    if (grant.endsAt && isIsoDate(grant.endsAt) && Date.parse(grant.endsAt) <= Date.parse(now)) {
      resolved.push({
        grantId: grant.grantId,
        entitlementId: grant.entitlementId,
        ledgerKey: definition.sharedLedgerKey,
        billable: false,
        resolution: 'EXPIRED',
      });
      continue;
    }
    const dedupeKey = `${definition.sharedLedgerKey}|${grant.scopeType}|${grant.scopeId}`;
    if (seen.has(dedupeKey)) {
      duplicates.push({
        grantId: grant.grantId,
        entitlementId: grant.entitlementId,
        ledgerKey: definition.sharedLedgerKey,
        reason: 'DUPLICATE_BILLING_PREVENTED',
      });
      resolved.push({
        grantId: grant.grantId,
        entitlementId: grant.entitlementId,
        ledgerKey: definition.sharedLedgerKey,
        billable: false,
        resolution: 'DEDUPED_SHARED_LEDGER',
      });
      continue;
    }
    seen.add(dedupeKey);
    resolved.push({
      grantId: grant.grantId,
      entitlementId: grant.entitlementId,
      ledgerKey: definition.sharedLedgerKey,
      billable: !definition.gatesLocalSafety && !definition.doubleBillingAllowed,
      resolution: 'CANONICAL_LEDGER',
    });
  }
  return {
    resolved,
    duplicates,
    billableLedgerKeys: [...seen].sort(),
  };
}

export function validateEntitlementGrant(
  grant: EntitlementGrant,
  definition: EntitlementDefinition | undefined,
  subscription: SubscriptionState | undefined,
  actor: Actor | null,
  now: string,
): { valid: boolean; reasonCodes: string[] } {
  const reasonCodes = new Set<string>();
  if (!definition) reasonCodes.add('ENTITLEMENT_DEFINITION_MISSING');
  if (!actor || !actor.roles.includes('ENTITLEMENT_ADMIN')) reasonCodes.add('ACTOR_UNAUTHORIZED');
  if (!grant.basis) reasonCodes.add('ENTITLEMENT_BASIS_MISSING');
  if (!grant.auditEventId) reasonCodes.add('AUDIT_EVENT_MISSING');
  if (grant.synthetic !== true) reasonCodes.add('REAL_ENTITLEMENT_GRANT_PROHIBITED_MC16');
  if (['CONTRACT', 'PURCHASE', 'MIGRATION'].includes(grant.basis))
    reasonCodes.add('REAL_ENTITLEMENT_GRANT_PROHIBITED_MC16');
  if (!grant.startsAt || !isIsoDate(grant.startsAt)) reasonCodes.add('GRANT_START_INVALID');
  if (grant.endsAt && isIsoDate(grant.endsAt) && Date.parse(grant.endsAt) <= Date.parse(now))
    reasonCodes.add('GRANT_EXPIRED');
  if (subscription?.billingImplemented) reasonCodes.add('BILLING_NOT_IMPLEMENTED');
  if (subscription?.checkoutAllowed) reasonCodes.add('CHECKOUT_NOT_AUTHORIZED');
  if (definition?.gatesLocalSafety) reasonCodes.add('LOCAL_SAFETY_MUST_NOT_BE_GATED');
  if (grant.state === 'ACTIVE' && definition?.status !== 'ACTIVE')
    reasonCodes.add('DEFINITION_NOT_ACTIVE');
  return { valid: reasonCodes.size === 0, reasonCodes: [...reasonCodes].sort() };
}

export function evaluateCrossTenantAccess(input: {
  grant: EntitlementGrant;
  requestedScopeType: string;
  requestedScopeId: string;
}): { allowed: boolean; reasonCode: string } {
  if (
    input.grant.scopeType !== input.requestedScopeType ||
    input.grant.scopeId !== input.requestedScopeId
  ) {
    return { allowed: false, reasonCode: 'CROSS_TENANT_ENTITLEMENT_LEAK_BLOCKED' };
  }
  return { allowed: true, reasonCode: 'SCOPE_MATCH' };
}

export function evaluateReadinessTransition(
  transition: ReadinessTransition,
  input: {
    gates: ReleaseGate[];
    evidence: EvidenceRecord[];
    actor: Actor | null;
    now: string;
  },
): {
  authorized: boolean;
  reasonCodes: string[];
  blockingGateIds: string[];
  missingEvidenceIds: string[];
} {
  const reasonCodes = new Set<string>();
  const gateResult = evaluateGates(
    input.gates.filter((gate) => transition.requiredGateIds.includes(gate.gateId)),
    input.evidence,
    input.now,
  );
  for (const gateId of gateResult.blockingGateIds) reasonCodes.add(`GATE_OPEN:${gateId}`);
  const evidenceById = new Map(input.evidence.map((item) => [item.evidenceId, item]));
  for (const evidenceId of transition.requiredEvidenceIds) {
    if (!isEvidenceUsable(evidenceById.get(evidenceId), input.now)) {
      reasonCodes.add(`EVIDENCE_MISSING:${evidenceId}`);
    }
  }
  if (transition.authorizationStatus !== 'APPROVED') reasonCodes.add('TRANSITION_NOT_AUTHORIZED');
  if (!transition.auditEventId) reasonCodes.add('AUDIT_EVENT_MISSING');
  if (
    !input.actor ||
    !transition.requiredApproverRoles.some((role) => input.actor?.roles.includes(role))
  ) {
    reasonCodes.add('ACTOR_UNAUTHORIZED');
  }
  if (transition.toState === 'COMMERCIALLY_AVAILABLE')
    reasonCodes.add('MC16_COMMERCIAL_ACTIVATION_PROHIBITED');
  if (transition.mc16Allowed !== true) reasonCodes.add('MC16_TRANSITION_NOT_AUTHORIZED');
  return {
    authorized: reasonCodes.size === 0,
    reasonCodes: [...reasonCodes].sort(),
    blockingGateIds: gateResult.blockingGateIds,
    missingEvidenceIds: gateResult.missingEvidenceIds,
  };
}

export function validateAuditEvent(event: AuditEvent): { valid: boolean; reasonCodes: string[] } {
  const reasonCodes = new Set<string>();
  const required: Array<keyof AuditEvent> = [
    'eventId',
    'entityType',
    'entityId',
    'eventType',
    'actorId',
    'actorRole',
    'timestamp',
    'reason',
    'correlationId',
    'result',
    'eventHash',
  ];
  for (const field of required) {
    if (!event[field]) reasonCodes.add(`AUDIT_FIELD_MISSING:${field}`);
  }
  if (!isIsoDate(event.timestamp)) reasonCodes.add('AUDIT_TIMESTAMP_INVALID');
  if (event.result !== 'DENIED' && event.result !== 'ACCEPTED' && event.result !== 'RECORDED')
    reasonCodes.add('AUDIT_RESULT_INVALID');
  if (event.eventHash.length < 32) reasonCodes.add('AUDIT_HASH_TOO_SHORT');
  if (event.prevEventHash !== null && event.prevEventHash.length < 32)
    reasonCodes.add('AUDIT_PREVIOUS_HASH_INVALID');
  if (event.evidenceRefs.length === 0 && event.result !== 'DENIED')
    reasonCodes.add('AUDIT_EVIDENCE_REQUIRED');
  if (/\b(?:card|pan|cvv|secret|password|token)\b/i.test(event.reason))
    reasonCodes.add('AUDIT_SECRET_OR_PAYMENT_DATA');
  return { valid: reasonCodes.size === 0, reasonCodes: [...reasonCodes].sort() };
}
