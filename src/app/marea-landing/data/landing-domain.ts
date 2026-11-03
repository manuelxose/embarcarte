/**
 * MC-18 internal landing — domain adapter.
 *
 * Bridges the generated canonical projection (`domain.generated.ts`) and the
 * verified MC-17 design-system presentation contracts. It adds no new product
 * data: every field comes from the canonical datasets or the MC-17 fixtures.
 *
 * Commercial invariants are inherited from the MC-17 fail-closed adapter and
 * cannot be changed here.
 */
import type {
  MareaBundleSummary,
  MareaCommercialPresentation,
  MareaFamilySummary,
  MareaLocalizedText,
  MareaReadinessDimension,
  MareaReadinessStatus,
  MareaReadinessSummary,
} from '../../marea-design-system/core/types';
import type { MareaInclusion } from '../../marea-design-system/core/types';
import { deriveCommercialPresentation } from '../../marea-design-system/data/commerce-presentation.adapter';
import {
  MAREA_FIXTURE_BUNDLES,
  MAREA_FIXTURE_FAMILIES,
} from '../../marea-design-system/data/fixtures/marea-fixtures.generated';
import {
  LANDING_BUNDLES,
  LANDING_DOMAIN_FACTS,
  LANDING_EDITIONS,
  LANDING_FAMILIES,
  LANDING_READINESS_DIMENSIONS,
} from './domain.generated';
import type { LandingBundleRecord, LandingFamilyRecord } from './domain.generated';

export { LANDING_DOMAIN_FACTS, LANDING_EDITIONS, LANDING_READINESS_DIMENSIONS };
export type { LandingBundleRecord, LandingFamilyRecord };

/** Canonical family ids in MC-16 order (9). */
export const LANDING_FAMILY_IDS = LANDING_FAMILIES.map((family) => family.familyId);

/** Canonical bundle ids in MC-16 order (6). */
export const LANDING_BUNDLE_IDS = LANDING_BUNDLES.map((bundle) => bundle.bundleId);

/** 26 canonical editions. An edition is NOT a merchant SKU. */
export const LANDING_EDITION_COUNT = LANDING_EDITIONS.length;

/**
 * The only commercial presentation the landing can render. The MC-17 adapter
 * returns purchaseActionAllowed=false, cartAllowed=false, priceVisible=false and
 * availabilityVisible=false even when an upstream flag says otherwise.
 */
export const LANDING_COMMERCIAL_PRESENTATION: MareaCommercialPresentation =
  deriveCommercialPresentation({
    releaseGateOpen: false,
    buyCtaAllowed: false,
    cartAllowed: false,
    priceVisible: false,
    availabilityVisible: false,
    ctaState: 'DISABLED',
    restrictions: [
      'PUBLICATION_NOT_AUTHORIZED',
      'TRADEMARK_NOT_CLEARED',
      'PRICE_NOT_APPROVED',
      'STOCK_NOT_VERIFIED',
    ],
  });

export function landingFamilyRecord(familyId: string): LandingFamilyRecord | undefined {
  return LANDING_FAMILIES.find((family) => family.familyId === familyId);
}

export function landingBundleRecord(bundleId: string): LandingBundleRecord | undefined {
  return LANDING_BUNDLES.find((bundle) => bundle.bundleId === bundleId);
}

/**
 * Builds the design-system family summary for a content-authored description.
 *
 * Identity, readiness, edition count and restrictions come from the verified
 * MC-17 fixture; only the localized summary text comes from the landing content
 * contract. A missing fixture or record returns `null`, and the section renders
 * no card rather than inventing one (the validator rejects a missing family).
 */
export function familySummaryFor(
  familyId: string,
  summary: MareaLocalizedText,
): MareaFamilySummary | null {
  const record = landingFamilyRecord(familyId);
  const fixture = MAREA_FIXTURE_FAMILIES.find((family) => family.familyId === familyId);
  if (!record || !fixture) return null;
  return { ...fixture, summary };
}

/** Verified MC-17 bundle composition, including kit expansion and exclusions. */
export function bundleSummaryFor(bundleId: string): MareaBundleSummary | null {
  return MAREA_FIXTURE_BUNDLES.find((bundle) => bundle.bundleId === bundleId) ?? null;
}

/** Count of components in the canonical composition (kit lines counted once). */
export function bundleComponentCount(bundleId: string): number {
  return landingBundleRecord(bundleId)?.components.length ?? 0;
}

/**
 * Maps the canonical inclusion vocabulary to the design-system type. Unknown
 * values degrade to the most restrictive inclusion instead of crashing.
 */
export function normalizedInclusion(value: string): MareaInclusion {
  switch (value) {
    case 'INCLUDED':
    case 'OPTIONAL':
    case 'CONDITIONAL':
    case 'QUOTATION_REQUIRED':
    case 'EXCLUDED':
    case 'CONTRACT_ONLY':
      return value;
    default:
      return 'CONDITIONAL';
  }
}

export interface ReadinessDimensionLabel {
  readonly dimensionId: string;
  readonly label: string;
  readonly note: string | null;
}

const READINESS_TONE: Readonly<Record<string, MareaReadinessStatus>> = {
  NOT_READY: 'NOT_READY',
  NOT_ASSESSED: 'NOT_ASSESSED',
  BLOCKED: 'BLOCKED',
  READY: 'READY',
};

function statusOf(value: string): MareaReadinessStatus {
  return READINESS_TONE[value] ?? 'NOT_READY';
}

/**
 * Builds the fail-closed readiness summary rendered in section 09.
 *
 * Every canonical dimension is NOT_READY today; the overall label is derived,
 * never authored, and is BLOCKED whenever any dimension is blocked.
 */
export function buildReadinessSummary(
  labels: readonly ReadinessDimensionLabel[],
): MareaReadinessSummary {
  const dimensions: MareaReadinessDimension[] = LANDING_READINESS_DIMENSIONS.map((dimension) => {
    const copy = labels.find((entry) => entry.dimensionId === dimension.dimensionId);
    return {
      dimension: dimension.dimensionId,
      label: copy?.label ?? dimension.dimensionId,
      status: statusOf(dimension.currentStatus),
      note: copy?.note ?? null,
    };
  });

  const statuses = dimensions.map((dimension) => dimension.status);
  const overall: MareaReadinessStatus = statuses.includes('BLOCKED')
    ? 'BLOCKED'
    : statuses.every((status) => status === 'READY')
      ? 'READY'
      : statuses.every((status) => status === 'NOT_ASSESSED')
        ? 'NOT_ASSESSED'
        : 'NOT_READY';

  return {
    dimensions,
    overall,
    blockedGateIds: LANDING_DOMAIN_FACTS.releaseGates > 0 ? [OPEN_RELEASE_GATE_LABEL] : [],
  };
}

/** Opaque, non-personal gate label; the count is what the panel renders. */
const OPEN_RELEASE_GATE_LABEL = 'MC14_RELEASE_GATES';

/** Facts printed in the status section, all copied from the generated projection. */
export const LANDING_STATUS_FACTS = {
  families: LANDING_DOMAIN_FACTS.families,
  editions: LANDING_DOMAIN_FACTS.editions,
  bundles: LANDING_DOMAIN_FACTS.bundles,
  releaseGates: LANDING_DOMAIN_FACTS.releaseGates,
  releaseGatesClosed: LANDING_DOMAIN_FACTS.releaseGatesClosed,
  requiredDocuments: LANDING_DOMAIN_FACTS.requiredDocuments,
  documentsExecuted: LANDING_DOMAIN_FACTS.documentsExecuted,
  publicAuthorizedClaims: LANDING_DOMAIN_FACTS.publicAuthorizedClaims,
  approvedPrices: LANDING_DOMAIN_FACTS.approvedPrices,
  verifiedStockRows: LANDING_DOMAIN_FACTS.verifiedStockRows,
  testedCompatibilityRows: LANDING_DOMAIN_FACTS.testedCompatibilityRows,
  merchantSkuCodes: LANDING_DOMAIN_FACTS.merchantSkuCodes,
} as const;
