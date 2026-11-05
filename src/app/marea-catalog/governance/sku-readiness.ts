/**
 * MC-25 deterministic SKU readiness engine.
 *
 * GOVERNING RULE (MC-25 acceptance, inherited from the master registry):
 *
 *   "No orderable SKU without complete lifecycle/price/stock/compliance;
 *    MC-02 blockers referenced per SKU."
 *
 * The engine is pure: no clock, no randomness, no I/O, no Angular, no network.
 * It reads ONE frozen fact snapshot and cannot be handed alternative facts, so
 * a caller cannot forge a readiness result. Every refusal names the failed
 * prerequisite, the contract it comes from, the MC-02 blockers that hold it and
 * the evidence that would be required to close it.
 *
 * Current state, transcribed from the contracts:
 *   PRICE_APPROVED = NONE, COMMERCIAL_AVAILABILITY = NOT_FOR_SALE,
 *   verified stock rows = 0, merchant SKU codes = 0, 0/13 release gates closed.
 * Therefore EVERY decision is NOT_ORDERABLE. That is proved exhaustively by the
 * validator and the adversarial suite, not asserted here.
 */
import { BUNDLE_ORDER, BUNDLES } from '../data/bundle-comparison';
import type { GovernanceEdition } from '../data/governance.generated';
import type { SkuIdentity } from './sku-identity';
import {
  resolveCandidateIdentity,
  resolveEditionIdentity,
  resolveFamilyIdentity,
} from './sku-identity';
import {
  GOVERNANCE_SNAPSHOT,
  blockersForEdition,
  editionById,
  familyById,
  skuCandidateForEdition,
} from './governance-facts';

export const READINESS_EVALUATION_VERSION = 'mc25-readiness/1.0.0';

/** The ten prerequisites. Every one must be satisfied before any orderability. */
export const READINESS_PREREQUISITES = [
  'CANONICAL_IDENTITY',
  'LIFECYCLE_APPROVED',
  'PRICE_APPROVED',
  'INVENTORY_VERIFIED',
  'COMPLIANCE_VERIFIED',
  'LICENSING_IP_CLEARED',
  'SAFETY_APPROVED',
  'HARDWARE_CERTIFIED',
  'MC02_BLOCKERS_RESOLVED',
  'RELEASE_AUTHORIZED',
] as const;

export type ReadinessPrerequisiteId = (typeof READINESS_PREREQUISITES)[number];

export type PrerequisiteStatus = 'PASSED' | 'FAILED' | 'UNKNOWN' | 'NOT_APPLICABLE';

export interface PrerequisiteResult {
  readonly id: ReadinessPrerequisiteId;
  readonly status: PrerequisiteStatus;
  /** True only when the governing contract explicitly permits N/A here. */
  readonly permittedNotApplicable: boolean;
  readonly failureCode: string | null;
  readonly detail: string;
  /** Contract path the evaluation reads. */
  readonly contractRef: string;
  /** MC-02 blocker ids that hold this prerequisite, in contract order. */
  readonly mc02BlockerIds: readonly string[];
  /** Evidence that would close it. */
  readonly requiredEvidenceIds: readonly string[];
}

export interface RefusalReason {
  readonly code: string;
  readonly prerequisiteId: ReadinessPrerequisiteId;
  readonly detail: string;
  readonly mc02BlockerIds: readonly string[];
}

export interface ReadinessSubject {
  readonly identityKind: string;
  readonly familyId: string | null;
  readonly editionId: string | null;
  readonly skuCandidateId: string | null;
  readonly merchantSkuCode: string | null;
}

export type CommercialOrderability = 'ORDERABLE' | 'NOT_ORDERABLE';

export interface ReadinessDecision {
  readonly evaluationVersion: typeof READINESS_EVALUATION_VERSION;
  readonly subject: ReadinessSubject;
  /** Contract paths this decision is bound to. */
  readonly contractRefs: readonly string[];
  readonly prerequisites: readonly PrerequisiteResult[];
  readonly missingPrerequisites: readonly ReadinessPrerequisiteId[];
  /** Every MC-02 blocker referenced by the subject, deduplicated, contract order. */
  readonly mc02BlockerIds: readonly string[];
  readonly refusalReasons: readonly RefusalReason[];
  readonly commercialOrderability: CommercialOrderability;
  readonly orderable: boolean;
  /** Deterministic, non-cryptographic fingerprint of the decision inputs/result. */
  readonly evidenceFingerprint: string;
}

// ---------------------------------------------------------------------------
// Contract-derived vocabulary. Values are read, never authored.
// ---------------------------------------------------------------------------
const READY_VALUE: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(
    GOVERNANCE_SNAPSHOT.readinessDimensions.map((dimension) => [
      dimension.dimension,
      dimension.readyValue,
    ]),
  ),
);

const FAILURE_CODE: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(
    GOVERNANCE_SNAPSHOT.readinessDimensions.map((dimension) => [
      dimension.dimension,
      dimension.failureCode,
    ]),
  ),
);

const CONTRACT = Object.freeze({
  editions: 'docs/marea/commerce-data/data/product-editions.json',
  candidates: 'docs/marea/commerce-data/data/sku-candidates.json',
  price: 'docs/marea/commerce-data/data/price-governance.json',
  inventory: 'docs/marea/commerce-data/data/inventory-governance.json',
  publication: 'docs/marea/commerce-data/data/publication-eligibility.json',
  blockers: 'docs/marea/commerce-data/data/blocker-register.json',
  dimensions: 'docs/marea/commerce-data/data/readiness-dimensions.json',
});

const priceFact = (key: keyof typeof GOVERNANCE_SNAPSHOT.priceState): unknown =>
  GOVERNANCE_SNAPSHOT.priceState[key];

/** The generated projection is `as const`, so booleans are literal types. */
const asBoolean = (value: unknown): boolean => value === true;

/** Contract gate ids referenced by an edition, filtered to open MC-02 gates. */
function openBlockersFor(edition: GovernanceEdition): readonly string[] {
  return blockersForEdition(edition)
    .filter((blocker) => blocker.open === true)
    .map((blocker) => blocker.blockerId);
}

function result(
  id: ReadinessPrerequisiteId,
  status: PrerequisiteStatus,
  failureCode: string | null,
  detail: string,
  contractRef: string,
  mc02BlockerIds: readonly string[] = [],
  requiredEvidenceIds: readonly string[] = [],
  permittedNotApplicable = false,
): PrerequisiteResult {
  return {
    id,
    status,
    permittedNotApplicable,
    failureCode,
    detail,
    contractRef,
    mc02BlockerIds,
    requiredEvidenceIds,
  };
}

/**
 * Evaluate every prerequisite for one edition.
 *
 * The hardware dimension is the only prerequisite the contract explicitly marks
 * not applicable, and only for a software product whose contract value is
 * `NOT_APPLICABLE_SOFTWARE_PRODUCT`. It is recorded as NOT_APPLICABLE — never as
 * PASSED — and the combination step treats it as satisfied only through that
 * explicit permission.
 */
export function evaluatePrerequisites(edition: GovernanceEdition): readonly PrerequisiteResult[] {
  const candidate = skuCandidateForEdition(edition.editionId) ?? null;
  const family = familyById(edition.familyId);
  const isSoftware = /^SOFTWARE_/u.test(edition.editionType);
  const hardwareStatus = edition.hardwareStatus;
  const hardwarePermittedNa = isSoftware && hardwareStatus === 'NOT_APPLICABLE_SOFTWARE_PRODUCT';
  const open = openBlockersFor(edition);

  const identityOk = candidate !== null && family !== undefined;
  const lifecycleOk =
    edition.lifecycleState === 'COMMERCIALLY_AVAILABLE' &&
    edition.commercialAvailability === 'COMMERCIALLY_AVAILABLE' &&
    candidate?.merchantable === true;
  const priceOk =
    edition.priceApproved === true &&
    edition.priceStatus === READY_VALUE['pricing'] &&
    priceFact('approvedPrices') !== 0 &&
    Number(priceFact('approvedPrices')) > 0;
  const inventoryOk =
    asBoolean(GOVERNANCE_SNAPSHOT.inventoryState.mareaStockAvailableForSale) &&
    String(GOVERNANCE_SNAPSHOT.inventoryState.verifiedMareaStock) !== 'NONE' &&
    Number(GOVERNANCE_SNAPSHOT.inventoryState.verifiedQuantity) > 0;
  const complianceOk = edition.complianceStatus === READY_VALUE['compliance'];
  const licensingOk =
    edition.licensingStatus === READY_VALUE['licensing'] &&
    edition.dataRightsStatus === READY_VALUE['dataRights'];
  const safetyOk =
    edition.safetyStatus === READY_VALUE['safety'] &&
    (!edition.releaseGateIds.includes('GATE-SAFETY-PILOT') ||
      GOVERNANCE_SNAPSHOT.blockers.some(
        (blocker) => blocker.blockerId === 'GATE-SAFETY-PILOT' && blocker.open === false,
      ));
  const hardwareOk = hardwarePermittedNa || edition.hardwareStatus === READY_VALUE['hardware'];
  const blockersOk = open.length === 0;
  const releaseOk =
    asBoolean(GOVERNANCE_SNAPSHOT.externalEvidence.publicationAuthorized) &&
    asBoolean(GOVERNANCE_SNAPSHOT.publicationState.publicationAuthorized) &&
    String(GOVERNANCE_SNAPSHOT.externalEvidence.productionDeployment) === 'AUTHORIZED';

  const priceGate = edition.releaseGateIds.filter((gate) => gate === 'GATE-PRICING');
  const licensingGates = edition.releaseGateIds.filter(
    (gate) => gate === 'GATE-IP-CLEARANCE' || gate === 'GATE-DATA-LICENSING',
  );
  const marketGate = edition.releaseGateIds.filter(
    (gate) => gate === 'GATE-MARKET-PLACEMENT' || gate === 'GATE-CRA-CYBERSECURITY',
  );
  const safetyGate = edition.releaseGateIds.filter((gate) => gate === 'GATE-SAFETY-PILOT');

  return Object.freeze([
    result(
      'CANONICAL_IDENTITY',
      identityOk ? 'PASSED' : 'FAILED',
      identityOk ? null : 'CANONICAL_IDENTITY_INVALID',
      identityOk
        ? `edition ${edition.editionId} resolves to family ${edition.familyId} and candidate ${candidate?.skuCandidateId ?? 'MISSING'}`
        : `edition ${edition.editionId} does not resolve to a canonical family and candidate`,
      CONTRACT.editions,
      [],
      ['EV-DEFINITION-READY'],
    ),
    result(
      'LIFECYCLE_APPROVED',
      lifecycleOk ? 'PASSED' : 'FAILED',
      lifecycleOk ? null : 'LIFECYCLE_NOT_COMMERCIALLY_AVAILABLE',
      `contract lifecycleState = ${edition.lifecycleState}; commercialAvailability = ${edition.commercialAvailability}; merchantable = ${String(candidate?.merchantable)}`,
      CONTRACT.editions,
      [],
      ['EV-OPERATIONS-READY', 'EV-AVAILABILITY-READY'],
    ),
    result(
      'PRICE_APPROVED',
      priceOk ? 'PASSED' : 'FAILED',
      priceOk ? null : (FAILURE_CODE['pricing'] ?? 'PRICE_NOT_APPROVED'),
      `priceStatus = ${edition.priceStatus}; priceApproved = ${String(edition.priceApproved)}; approved price records = ${String(priceFact('approvedPrices'))}`,
      CONTRACT.price,
      priceGate,
      ['EV-PRICE-APPROVAL', 'EV-PRICING-READY'],
    ),
    result(
      'INVENTORY_VERIFIED',
      inventoryOk ? 'PASSED' : 'FAILED',
      inventoryOk ? null : 'STOCK_NOT_VERIFIED',
      `verifiedMareaStock = ${String(GOVERNANCE_SNAPSHOT.inventoryState.verifiedMareaStock)}; availableForSale = ${String(GOVERNANCE_SNAPSHOT.inventoryState.mareaStockAvailableForSale)}; verified quantity = ${String(GOVERNANCE_SNAPSHOT.inventoryState.verifiedQuantity)}`,
      CONTRACT.inventory,
      [],
      ['EV-INVENTORY-PROVENANCE'],
    ),
    result(
      'COMPLIANCE_VERIFIED',
      complianceOk ? 'PASSED' : 'FAILED',
      complianceOk ? null : (FAILURE_CODE['compliance'] ?? 'COMPLIANCE_NOT_READY'),
      `complianceStatus = ${edition.complianceStatus}; ready value = ${String(READY_VALUE['compliance'])}`,
      CONTRACT.dimensions,
      marketGate,
      ['EV-COMPLIANCE-READY', 'EV-CONFORMITY-ASSESSMENT'],
    ),
    result(
      'LICENSING_IP_CLEARED',
      licensingOk ? 'PASSED' : 'FAILED',
      licensingOk ? null : (FAILURE_CODE['licensing'] ?? 'LICENSING_NOT_CLEARED'),
      `licensingStatus = ${edition.licensingStatus}; dataRightsStatus = ${edition.dataRightsStatus}`,
      CONTRACT.dimensions,
      licensingGates,
      ['EV-LICENSING-READY', 'EV-DATARIGHTS-READY', 'EV-LEGAL-CLEARANCE'],
    ),
    result(
      'SAFETY_APPROVED',
      safetyOk ? 'PASSED' : 'FAILED',
      safetyOk ? null : (FAILURE_CODE['safety'] ?? 'SAFETY_BLOCKED'),
      `safetyStatus = ${edition.safetyStatus}; PILOT safety gate referenced = ${String(edition.releaseGateIds.includes('GATE-SAFETY-PILOT'))}`,
      CONTRACT.dimensions,
      safetyGate,
      ['EV-SAFETY-READY', 'EV-SAFETY-CASE'],
    ),
    result(
      'HARDWARE_CERTIFIED',
      hardwareOk ? (hardwarePermittedNa ? 'NOT_APPLICABLE' : 'PASSED') : 'FAILED',
      hardwareOk ? null : (FAILURE_CODE['hardware'] ?? 'HARDWARE_NOT_CERTIFIED'),
      `editionType = ${edition.editionType}; hardwareStatus = ${hardwareStatus}; N/A permitted = ${String(hardwarePermittedNa)}`,
      CONTRACT.dimensions,
      hardwarePermittedNa ? [] : marketGate,
      hardwarePermittedNa ? [] : ['EV-HARDWARE-READY'],
      hardwarePermittedNa,
    ),
    result(
      'MC02_BLOCKERS_RESOLVED',
      blockersOk ? 'PASSED' : 'FAILED',
      blockersOk ? null : 'RELEASE_GATES_OPEN',
      `${open.length} of ${edition.releaseGateIds.length} referenced MC-02 release gates are open`,
      CONTRACT.blockers,
      open,
      ['EV-ALL-RELEASE-GATES-CLOSED'],
    ),
    result(
      'RELEASE_AUTHORIZED',
      releaseOk ? 'PASSED' : 'FAILED',
      releaseOk ? null : 'PUBLICATION_NOT_AUTHORIZED',
      `publicationAuthorized = ${String(GOVERNANCE_SNAPSHOT.externalEvidence.publicationAuthorized)}; productionDeployment = ${String(GOVERNANCE_SNAPSHOT.externalEvidence.productionDeployment)}`,
      CONTRACT.publication,
      edition.releaseGateIds.filter((gate) => gate === 'GATE-COMMERCIAL-CLAIMS'),
      ['EV-PUBLICATION-AUTHORIZATION'],
    ),
  ]);
}

/** A prerequisite is satisfied by PASSED, or by an explicitly permitted N/A. */
function satisfied(prerequisite: PrerequisiteResult): boolean {
  if (prerequisite.status === 'PASSED') return true;
  return prerequisite.status === 'NOT_APPLICABLE' && prerequisite.permittedNotApplicable;
}

/**
 * Combine prerequisite results into an orderability decision.
 *
 * Exported for the logic tests only: it is a pure combinator over results that
 * the real path always obtains from `evaluatePrerequisites`. It cannot be used
 * to forge a decision for a real SKU because `evaluateSkuReadiness` never
 * accepts caller-supplied results.
 */
export function combinePrerequisites(prerequisites: readonly PrerequisiteResult[]): {
  readonly orderable: boolean;
  readonly missing: readonly ReadinessPrerequisiteId[];
} {
  const missing = prerequisites.filter((item) => !satisfied(item)).map((item) => item.id);
  const complete = READINESS_PREREQUISITES.every((id) =>
    prerequisites.some((item) => item.id === id),
  );
  return { orderable: complete && missing.length === 0, missing };
}

/** FNV-1a over the canonical serialization. Deterministic, not cryptographic. */
function fingerprint(value: unknown): string {
  const text = JSON.stringify(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

function decide(identity: SkuIdentity): ReadinessDecision {
  const edition = identity.edition;
  if (!edition) {
    const prerequisites: readonly PrerequisiteResult[] = Object.freeze([
      result(
        'CANONICAL_IDENTITY',
        identity.kind === 'UNKNOWN_IDENTITY' ? 'UNKNOWN' : 'FAILED',
        'CANONICAL_IDENTITY_INVALID',
        identity.kind === 'UNKNOWN_IDENTITY'
          ? `unresolved identity: ${identity.reason}`
          : `identity ${identity.kind} has no edition to evaluate`,
        CONTRACT.editions,
      ),
    ]);
    const base: Omit<ReadinessDecision, 'evidenceFingerprint'> = {
      evaluationVersion: READINESS_EVALUATION_VERSION,
      subject: {
        identityKind: identity.kind,
        familyId: identity.familyId,
        editionId: null,
        skuCandidateId: null,
        merchantSkuCode: identity.merchantSkuCode,
      },
      contractRefs: [CONTRACT.editions],
      prerequisites,
      missingPrerequisites: READINESS_PREREQUISITES,
      mc02BlockerIds: [],
      refusalReasons: [
        {
          code: 'CANONICAL_IDENTITY_INVALID',
          prerequisiteId: 'CANONICAL_IDENTITY' as const,
          detail: 'the subject is not a canonical edition',
          mc02BlockerIds: [],
        },
      ],
      commercialOrderability: 'NOT_ORDERABLE' as const,
      orderable: false,
    };
    return Object.freeze({ ...base, evidenceFingerprint: fingerprint(base) });
  }

  const prerequisites = evaluatePrerequisites(edition);
  const { orderable, missing } = combinePrerequisites(prerequisites);
  const receipt = skuCandidateForEdition(edition.editionId) ?? null;
  const refusalReasons: readonly RefusalReason[] = Object.freeze(
    prerequisites
      .filter((item) => !satisfied(item))
      .map((item) =>
        Object.freeze({
          code: item.failureCode ?? 'PREREQUISITE_NOT_SATISFIED',
          prerequisiteId: item.id,
          detail: item.detail,
          mc02BlockerIds: item.mc02BlockerIds,
        }),
      ),
  );
  const mc02 = Object.freeze(
    [...new Set(prerequisites.flatMap((item) => item.mc02BlockerIds))].sort(),
  );
  const base: Omit<ReadinessDecision, 'evidenceFingerprint'> = {
    evaluationVersion: READINESS_EVALUATION_VERSION,
    subject: {
      identityKind: identity.kind,
      familyId: edition.familyId,
      editionId: edition.editionId,
      skuCandidateId: receipt?.skuCandidateId ?? null,
      merchantSkuCode: identity.merchantSkuCode,
    },
    contractRefs: Object.freeze([...new Set(prerequisites.map((item) => item.contractRef))].sort()),
    prerequisites,
    missingPrerequisites: Object.freeze(missing),
    mc02BlockerIds: mc02,
    refusalReasons,
    commercialOrderability: orderable ? ('ORDERABLE' as const) : ('NOT_ORDERABLE' as const),
    orderable,
  };
  return Object.freeze({ ...base, evidenceFingerprint: fingerprint(base) });
}

/** Evaluate readiness for one canonical edition id. */
export function evaluateSkuReadiness(editionId: unknown): ReadinessDecision {
  return decide(resolveEditionIdentity(editionId));
}

/** Evaluate readiness for one candidate commercial SKU. */
export function evaluateCandidateReadiness(skuCandidateId: unknown): ReadinessDecision {
  return decide(resolveCandidateIdentity(skuCandidateId));
}

/** Evaluate readiness for a product family (never orderable). */
export function evaluateFamilyReadiness(familyId: unknown): ReadinessDecision {
  return decide(resolveFamilyIdentity(familyId));
}

export interface BundleReadinessDecision {
  readonly bundleId: string;
  readonly commercialOrderability: CommercialOrderability;
  readonly orderable: boolean;
  readonly includedEditionIds: readonly string[];
  readonly refusalReasons: readonly RefusalReason[];
  readonly evaluationVersion: typeof READINESS_EVALUATION_VERSION;
}

/**
 * Readiness for a bundle: never orderable while any included edition is not,
 * and never orderable while a bundle-level MC-08 gate holds it.
 */
export function evaluateBundleReadiness(bundleId: unknown): BundleReadinessDecision {
  const id = typeof bundleId === 'string' ? bundleId : '';
  const bundle = BUNDLES.find((entry) => entry.bundleId === id);
  const included = bundle
    ? bundle.lines
        .filter((line) => line.inclusion === 'INCLUDED' && line.editionId !== null)
        .map((line) => line.editionId as string)
    : [];
  const refusalReasons: RefusalReason[] = [];
  if (!bundle) {
    refusalReasons.push({
      code: 'UNKNOWN_BUNDLE',
      prerequisiteId: 'CANONICAL_IDENTITY',
      detail: `bundle ${id} is not a canonical MC-08 bundle`,
      mc02BlockerIds: [],
    });
  } else {
    for (const editionId of included) {
      const decision = evaluateSkuReadiness(editionId);
      if (decision.commercialOrderability !== 'ORDERABLE') {
        refusalReasons.push({
          code: 'BUNDLE_EDITION_NOT_ORDERABLE',
          prerequisiteId: 'LIFECYCLE_APPROVED',
          detail: `${editionId} is not orderable`,
          mc02BlockerIds: decision.mc02BlockerIds,
        });
      }
    }
    for (const gate of bundle.gates) {
      if (/PILOT_SAFETY_GATE_BLOCKED/u.test(gate)) {
        refusalReasons.push({
          code: 'SAFETY_BLOCKED',
          prerequisiteId: 'SAFETY_APPROVED',
          detail: `bundle ${id} is held by ${gate}`,
          mc02BlockerIds: ['GATE-SAFETY-PILOT'],
        });
      }
    }
  }

  // Computed, not asserted: a bundle is orderable only when it is a known
  // bundle whose every INCLUDED edition is orderable, whose own availability is
  // COMMERCIALLY_AVAILABLE and which no safety gate holds.
  const editionsOrderable =
    included.length > 0 && included.every((editionId) => evaluateSkuReadiness(editionId).orderable);
  const availabilityOrderable = bundle?.commercialAvailability === 'COMMERCIALLY_AVAILABLE';
  const safetyHold = bundle?.gates.some((gate) => /PILOT_SAFETY_GATE_BLOCKED/u.test(gate)) ?? true;
  const orderable = Boolean(bundle) && editionsOrderable && availabilityOrderable && !safetyHold;

  return Object.freeze({
    bundleId: id,
    commercialOrderability: orderable ? ('ORDERABLE' as const) : ('NOT_ORDERABLE' as const),
    orderable,
    includedEditionIds: Object.freeze(included),
    refusalReasons: Object.freeze(refusalReasons),
    evaluationVersion: READINESS_EVALUATION_VERSION,
  });
}

/** Every edition decision, in contract order. */
export function readinessMatrix(): readonly ReadinessDecision[] {
  return Object.freeze(
    GOVERNANCE_SNAPSHOT.editions.map((edition) => evaluateSkuReadiness(edition.editionId)),
  );
}

/** Every bundle decision, in contract order. */
export function bundleReadinessMatrix(): readonly BundleReadinessDecision[] {
  return Object.freeze(BUNDLE_ORDER.map((bundleId) => evaluateBundleReadiness(bundleId)));
}

/** Throws when a decision claims commercial orderability. Fail closed. */
export function assertNotOrderable(decision: ReadinessDecision | BundleReadinessDecision): void {
  if (decision.orderable || decision.commercialOrderability === 'ORDERABLE') {
    throw new Error(
      `MC-25 readiness invariant violated: ${JSON.stringify(decision)} claims commercial orderability`,
    );
  }
}

/**
 * Facts the engine publishes about itself.
 *
 * Computed from the same matrices the UI renders, not hard-coded: a constant
 * `orderableEditions: 0` would keep saying zero even if an evaluation started
 * returning orderable, which is exactly the dishonesty this milestone forbids.
 */
const EDITION_MATRIX = readinessMatrix();
const BUNDLE_MATRIX = bundleReadinessMatrix();

export const READINESS_FACTS = Object.freeze({
  evaluationVersion: READINESS_EVALUATION_VERSION,
  prerequisiteCount: READINESS_PREREQUISITES.length,
  editionCount: GOVERNANCE_SNAPSHOT.editions.length,
  bundleCount: BUNDLE_ORDER.length,
  orderableEditions: EDITION_MATRIX.filter((decision) => decision.orderable).length,
  orderableBundles: BUNDLE_MATRIX.filter((decision) => decision.orderable).length,
  approvedPrices: GOVERNANCE_SNAPSHOT.priceState.approvedPrices,
  verifiedStockRows: GOVERNANCE_SNAPSHOT.inventoryState.inventoryItemCount,
  openReleaseGates: GOVERNANCE_SNAPSHOT.blockers.filter((blocker) => blocker.open).length,
  merchantSkuCodesEstablished: GOVERNANCE_SNAPSHOT.skuCandidates.filter(
    (candidate) => candidate.merchantSkuCode !== null,
  ).length,
});

/** Sanity guard used by the UI: an edition id that resolves to a known edition. */
export function isReadableEditionId(value: unknown): value is string {
  return typeof value === 'string' && editionById(value) !== undefined;
}
