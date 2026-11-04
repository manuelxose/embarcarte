/**
 * MC-20 internal catalogue — domain adapter.
 *
 * Bridges the generated MC-16 projection (`catalog.generated.ts`) and the
 * verified MC-17 presentation contracts. It adds no new product data: identity,
 * readiness, editions and bundle inclusion are read from the projection; only
 * labels come from the content contract.
 *
 * The commercial presentation is inherited from the MC-17 fail-closed adapter
 * and cannot be changed here: purchaseActionAllowed=false, cartAllowed=false,
 * priceVisible=false, availabilityVisible=false.
 */
import type {
  MareaCommercialPresentation,
  MareaEditionSummary,
  MareaFamilySummary,
  MareaLocale,
  MareaReadinessDimension,
  MareaReadinessStatus,
  MareaReadinessSummary,
  MareaRestrictionKind,
} from '../../marea-design-system/core/types';
import { deriveCommercialPresentation } from '../../marea-design-system/data/commerce-presentation.adapter';
import { MAREA_FIXTURE_FAMILIES } from '../../marea-design-system/data/fixtures/marea-fixtures.generated';
import {
  CATALOG_DOMAIN_FACTS,
  CATALOG_EDITIONS,
  CATALOG_FAMILIES,
  CATALOG_READINESS_DIMENSIONS,
} from './catalog.generated';
import type {
  CatalogEditionRecord,
  CatalogFamilyId,
  CatalogFamilyRecord,
} from './catalog.generated';
import { CATALOG_SHARED } from '../content/shared';

export { CATALOG_DOMAIN_FACTS };

/** The only commercial presentation the catalogue can render. */
export const CATALOG_COMMERCIAL_PRESENTATION: MareaCommercialPresentation =
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
      'LICENSING_NOT_CLEARED',
      'COMPATIBILITY_UNTESTED',
      'PRICE_NOT_APPROVED',
      'STOCK_NOT_VERIFIED',
    ],
  });

/** Opaque, non-personal gate label; the count is what the panel renders. */
const OPEN_RELEASE_GATE_LABEL = 'MC14_RELEASE_GATES';

/**
 * Canonical status code → design-system readiness tone.
 *
 * The mapping is explicit and lossy by design: the canonical taxonomy has more
 * values than the four presentation tones. A complete target specification is
 * READY for the definition dimension; not-applicable, not-started and
 * not-evaluated dimensions are NOT_ASSESSED; blocked is BLOCKED; every other
 * commercial or verification state is NOT_READY. Unknown values fail closed.
 */
const READINESS_TONE: Readonly<Record<string, MareaReadinessStatus>> = {
  READY: 'READY',
  COMPLETE_TARGET_SPECIFICATION: 'READY',
  NOT_READY: 'NOT_READY',
  PARTIALLY_VERIFIED: 'NOT_READY',
  NOT_CLEARED: 'NOT_READY',
  NOT_GRANTED: 'NOT_READY',
  NOT_SELECTED: 'NOT_READY',
  NOT_FOR_SALE: 'NOT_READY',
  HYPOTHESIS_UNAPPROVED: 'NOT_READY',
  OPEN: 'NOT_READY',
  NOT_ASSESSED: 'NOT_ASSESSED',
  NOT_APPLICABLE_SOFTWARE_PRODUCT: 'NOT_ASSESSED',
  NOT_STARTED: 'NOT_ASSESSED',
  NOT_EVALUATED: 'NOT_ASSESSED',
  BLOCKED: 'BLOCKED',
};

/** Canonical status code → design-system readiness tone. Unknown values fail closed. */
export function readinessStatusOf(value: string): MareaReadinessStatus {
  return READINESS_TONE[value] ?? 'NOT_READY';
}

export function catalogFamilyRecord(familyId: string): CatalogFamilyRecord | undefined {
  return CATALOG_FAMILIES.find((family) => family.familyId === familyId);
}

export function catalogEditionRecords(familyId: string): readonly CatalogEditionRecord[] {
  return CATALOG_EDITIONS.filter((edition) => edition.familyId === familyId);
}

export function catalogFamilyIds(): readonly CatalogFamilyId[] {
  return CATALOG_FAMILIES.map((family) => family.familyId as CatalogFamilyId);
}

/** Localized display text for a canonical code. Unknown or malformed codes fail closed. */
export function statusLabel(code: string, locale: MareaLocale): string {
  if (typeof code !== 'string' || code.length === 0) return 'UNKNOWN';
  return CATALOG_SHARED.statusVocabulary[code]?.[locale] ?? code;
}

export function evidenceLabel(code: string, locale: MareaLocale): string {
  if (typeof code !== 'string' || code.length === 0) return 'UNKNOWN';
  return CATALOG_SHARED.evidenceVocabulary[code]?.[locale] ?? code;
}

/**
 * Fail-closed restrictions for a family.
 *
 * Every restriction is either a permanent current state (publication, trademark,
 * price, stock) or a measured fact (0 tested compatibility rows). It is not
 * inferred from an unrelated compliance status.
 */
export function restrictionsFor(record: CatalogFamilyRecord): readonly MareaRestrictionKind[] {
  const restrictions: MareaRestrictionKind[] = [
    'PUBLICATION_NOT_AUTHORIZED',
    'TRADEMARK_NOT_CLEARED',
    'COMPATIBILITY_UNTESTED',
  ];
  if (record.licensingStatus !== 'READY') restrictions.push('LICENSING_NOT_CLEARED');
  if (record.priceStatus !== 'READY') restrictions.push('PRICE_NOT_APPROVED');
  restrictions.push('STOCK_NOT_VERIFIED');
  return restrictions;
}

/**
 * Readiness summary derived from the eleven canonical dimensions. The overall
 * label is derived, never authored: BLOCKED when any dimension is blocked,
 * READY only when every dimension is ready.
 */
export function catalogReadinessSummary(
  familyId: string,
  locale: MareaLocale,
): MareaReadinessSummary {
  const record = catalogFamilyRecord(familyId);
  const dimensions: MareaReadinessDimension[] = CATALOG_READINESS_DIMENSIONS.map((dimension) => {
    const canonicalValue = record
      ? (record.readiness[dimension.dimension as keyof typeof record.readiness] ??
        dimension.currentStatus)
      : dimension.currentStatus;

    const label = CATALOG_SHARED.labels[dimension.dimension]?.[locale] ?? dimension.dimension;
    return {
      dimension: dimension.dimension,
      label,
      status: readinessStatusOf(canonicalValue),
      note: canonicalValue,
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
    blockedGateIds: record && record.releaseGateIds.length > 0 ? [OPEN_RELEASE_GATE_LABEL] : [],
  };
}

/** Edition summary for the verified MC-17 edition card. */
export function editionSummary(
  record: CatalogEditionRecord,
  displayName: string,
  readiness: MareaReadinessStatus,
  restrictions: readonly MareaRestrictionKind[],
): MareaEditionSummary {
  return {
    editionId: record.editionId,
    familyId: record.familyId,
    displayName,
    definitionStatus: record.definitionStatus === 'CONDITIONAL' ? 'CONDITIONAL' : 'DEFINED',
    editionType: record.editionType,
    readiness,
    requiresQuotation: record.requiresQuotation,
    restrictions,
  };
}

/** Canonical summary used when another catalogue family links to this one. */
export function familyCardSummary(familyId: string): MareaFamilySummary | null {
  const fixture = MAREA_FIXTURE_FAMILIES.find((family) => family.familyId === familyId);
  const record = catalogFamilyRecord(familyId);
  if (!fixture || !record) return null;
  return {
    familyId: fixture.familyId,
    displayName: fixture.displayName,
    definitionStatus: fixture.definitionStatus,
    editionCount: record.editionIds.length,
    readiness: readinessStatusOf(record.readiness.availability),
    summary: fixture.summary,
    restrictions: restrictionsFor(record),
  };
}

/** Facts printed in the readiness section, all copied from the projection. */
export const CATALOG_STATUS_FACTS = {
  families: CATALOG_DOMAIN_FACTS.families,
  editions: CATALOG_DOMAIN_FACTS.editions,
  bundles: CATALOG_DOMAIN_FACTS.bundlesReferencingScope,
  releaseGates: CATALOG_DOMAIN_FACTS.releaseGates,
  releaseGatesClosed: CATALOG_DOMAIN_FACTS.releaseGatesClosed,
  requiredDocuments: CATALOG_DOMAIN_FACTS.requiredDocuments,
  documentsExecuted: CATALOG_DOMAIN_FACTS.documentsExecuted,
  cataloguedClaims: CATALOG_DOMAIN_FACTS.cataloguedClaims,
  publicAuthorizedClaims: CATALOG_DOMAIN_FACTS.publicAuthorizedClaims,
  approvedPrices: CATALOG_DOMAIN_FACTS.approvedPrices,
  merchantableEditions: CATALOG_DOMAIN_FACTS.merchantableEditions,
  merchantSkuCodes: CATALOG_DOMAIN_FACTS.merchantSkuCodes,
  verifiedStockRows: CATALOG_DOMAIN_FACTS.verifiedStockRows,
  testedCompatibilityRows: CATALOG_DOMAIN_FACTS.testedCompatibilityRows,
} as const;
