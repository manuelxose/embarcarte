/**
 * MC-25 canonical SKU identity model.
 *
 * The milestone's first rule is a distinction, not a feature:
 *
 *   product family != edition != bundle != internal catalogue identity
 *   != candidate commercial SKU != approved merchant SKU
 *
 * A canonical edition is NEVER an approved commercial SKU. The MC-16 contract
 * establishes zero merchant SKU codes (`merchantSkuCodesEstablished = 0`) and
 * every candidate record carries `merchantSkuCode: null`. This module encodes
 * that: `resolveMerchantSku` has an empty approval registry and cannot mint a
 * code, and every resolution exposes `orderable: false` as a literal type.
 */
import { BUNDLE_ORDER } from '../data/bundle-comparison';
import type {
  GovernanceEdition,
  GovernanceFamily,
  GovernanceSkuCandidate,
} from '../data/governance.generated';
import {
  editionById,
  familyById,
  isGovernanceEditionId,
  isGovernanceFamilyId,
  skuCandidateById,
  skuCandidateForEdition,
} from './governance-facts';

/** The six identity kinds, in decreasing commercial authority. */
export const SKU_IDENTITY_KINDS = [
  'PRODUCT_FAMILY',
  'EDITION',
  'BUNDLE',
  'INTERNAL_CATALOGUE_IDENTITY',
  'CANDIDATE_COMMERCIAL_SKU',
  'APPROVED_MERCHANT_SKU',
] as const;

export type SkuIdentityKind = (typeof SKU_IDENTITY_KINDS)[number];

export type SkuIdentity = SkuIdentityResolution | UnknownIdentity;

export interface SkuIdentityResolution {
  readonly kind: SkuIdentityKind;
  readonly canonicalId: string;
  readonly familyId: string | null;
  /** Where the identity comes from: contract path plus contract id. */
  readonly contractRef: string;
  /** True only for a CANDIDATE_COMMERCIAL_SKU. */
  readonly candidateOnly: boolean;
  /** True only for an APPROVED_MERCHANT_SKU. Never reachable today. */
  readonly approvedMerchantSku: boolean;
  /** Null for every kind except an approved merchant SKU. */
  readonly merchantSkuCode: string | null;
  readonly edition: GovernanceEdition | null;
  readonly family: GovernanceFamily | null;
  readonly candidate: GovernanceSkuCandidate | null;
  readonly orderable: false;
}

export interface UnknownIdentity {
  readonly kind: 'UNKNOWN_IDENTITY';
  readonly canonicalId: string;
  readonly familyId: null;
  readonly contractRef: 'NONE';
  readonly candidateOnly: false;
  readonly approvedMerchantSku: false;
  readonly merchantSkuCode: null;
  readonly edition: null;
  readonly family: null;
  readonly candidate: null;
  readonly orderable: false;
  readonly reason: string;
}

/**
 * Approved merchant SKU registry.
 *
 * FROZEN and EMPTY. MC-16 establishes no merchant SKU code and no approval
 * record exists, so no code can resolve. Adding an entry would be a fabricated
 * commercial SKU claim; the validator asserts the registry stays empty and
 * frozen.
 */
export const MERCHANT_SKU_APPROVALS: readonly {
  readonly code: string;
  readonly editionId: string;
}[] = Object.freeze([]);

function unknownIdentity(input: unknown, reason: string): UnknownIdentity {
  return {
    kind: 'UNKNOWN_IDENTITY',
    canonicalId: typeof input === 'string' ? input : '',
    familyId: null,
    contractRef: 'NONE',
    candidateOnly: false,
    approvedMerchantSku: false,
    merchantSkuCode: null,
    edition: null,
    family: null,
    candidate: null,
    orderable: false,
    reason,
  };
}

function base(
  kind: SkuIdentityKind,
  canonicalId: string,
  familyId: string | null,
  contractRef: string,
  edition: GovernanceEdition | null,
  family: GovernanceFamily | null,
  candidate: GovernanceSkuCandidate | null,
  candidateOnly: boolean,
): SkuIdentityResolution {
  return {
    kind,
    canonicalId,
    familyId,
    contractRef,
    candidateOnly,
    approvedMerchantSku: false,
    merchantSkuCode: null,
    edition,
    family,
    candidate,
    orderable: false,
  };
}

/** Resolve a product family. */
export function resolveFamilyIdentity(familyId: unknown): SkuIdentity {
  if (!isGovernanceFamilyId(familyId)) {
    return unknownIdentity(familyId, 'NOT_A_CANONICAL_PRODUCT_FAMILY');
  }
  const family = familyById(familyId);
  if (!family) return unknownIdentity(familyId, 'FAMILY_NOT_FOUND');
  return base(
    'PRODUCT_FAMILY',
    family.familyId,
    family.familyId,
    'docs/marea/commerce-data/data/product-families.json',
    null,
    family,
    null,
    false,
  );
}

/** Resolve a canonical edition. Never an approved commercial SKU. */
export function resolveEditionIdentity(editionId: unknown): SkuIdentity {
  if (!isGovernanceEditionId(editionId)) {
    return unknownIdentity(editionId, 'NOT_A_CANONICAL_EDITION');
  }
  const edition = editionById(editionId);
  if (!edition) return unknownIdentity(editionId, 'EDITION_NOT_FOUND');
  const family = familyById(edition.familyId);
  if (!family) return unknownIdentity(editionId, 'EDITION_FAMILY_NOT_FOUND');
  const candidate = skuCandidateForEdition(edition.editionId) ?? null;
  return base(
    'EDITION',
    edition.editionId,
    edition.familyId,
    'docs/marea/commerce-data/data/product-editions.json',
    edition,
    family,
    candidate,
    false,
  );
}

/** Resolve an internal catalogue identity such as `ENT-FAMILY-NAV`. */
export function resolveInternalCatalogueIdentity(entityId: unknown): SkuIdentity {
  if (typeof entityId !== 'string' || !/^ENT-FAMILY-[A-Z]+$/u.test(entityId)) {
    return unknownIdentity(entityId, 'NOT_AN_INTERNAL_CATALOGUE_IDENTITY');
  }
  const familyId = entityId.slice('ENT-FAMILY-'.length);
  const family = familyById(familyId);
  if (!family) return unknownIdentity(entityId, 'INTERNAL_IDENTITY_FAMILY_NOT_FOUND');
  return base(
    'INTERNAL_CATALOGUE_IDENTITY',
    entityId,
    family.familyId,
    'docs/marea/catalog/MC20-CANONICAL-PRODUCT-MAPPING.md',
    null,
    family,
    null,
    false,
  );
}

/** Resolve a canonical bundle. */
export function resolveBundleIdentity(bundleId: unknown): SkuIdentity {
  if (typeof bundleId !== 'string' || !(BUNDLE_ORDER as readonly string[]).includes(bundleId)) {
    return unknownIdentity(bundleId, 'NOT_A_CANONICAL_BUNDLE');
  }
  return base(
    'BUNDLE',
    bundleId,
    null,
    'docs/marea/bundles/bundle-definitions.json',
    null,
    null,
    null,
    false,
  );
}

/**
 * Resolve a CANDIDATE commercial SKU.
 *
 * A candidate is a governance object, not an offer: it has no merchant code, no
 * approved price and no availability.
 */
export function resolveCandidateIdentity(skuCandidateId: unknown): SkuIdentity {
  if (typeof skuCandidateId !== 'string') {
    return unknownIdentity(skuCandidateId, 'NOT_A_CANDIDATE_SKU_ID');
  }
  const record = skuCandidateById(skuCandidateId);
  if (!record) return unknownIdentity(skuCandidateId, 'NOT_A_CANDIDATE_SKU_ID');
  const edition = editionById(record.editionId);
  if (!edition) return unknownIdentity(skuCandidateId, 'CANDIDATE_EDITION_NOT_FOUND');
  return base(
    'CANDIDATE_COMMERCIAL_SKU',
    record.skuCandidateId,
    record.familyId,
    'docs/marea/commerce-data/data/sku-candidates.json',
    edition,
    familyById(record.familyId) ?? null,
    record,
    true,
  );
}

/**
 * Resolve an APPROVED merchant SKU code.
 *
 * Unreachable by construction: the approval registry is empty and frozen, so
 * every invocation returns UNKNOWN_IDENTITY. No merchant SKU identifier may be
 * fabricated.
 */
export function resolveMerchantSku(merchantSkuCode: unknown): SkuIdentity {
  const approvals = MERCHANT_SKU_APPROVALS;
  const code = typeof merchantSkuCode === 'string' ? merchantSkuCode : '';
  const match = approvals.find((entry) => entry.code === code);
  if (!match) {
    return unknownIdentity(code, 'NO_APPROVED_MERCHANT_SKU_REGISTRY');
  }
  const edition = editionById(match.editionId);
  if (!edition) return unknownIdentity(code, 'APPROVED_SKU_EDITION_NOT_FOUND');
  return {
    ...base(
      'APPROVED_MERCHANT_SKU',
      code,
      edition.familyId,
      'docs/marea/commerce-data/data/sku-candidates.json',
      edition,
      familyById(edition.familyId) ?? null,
      skuCandidateForEdition(edition.editionId) ?? null,
      false,
    ),
    approvedMerchantSku: true,
    merchantSkuCode: code,
  };
}

/** True when the identity is a canonical edition (any resolution). */
export function isEditionIdentity(identity: SkuIdentity): boolean {
  return identity.kind === 'EDITION' || identity.kind === 'CANDIDATE_COMMERCIAL_SKU';
}
