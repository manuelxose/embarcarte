/**
 * MC-19 internal audience pages — domain adapter.
 *
 * Bridges the canonical MC-16/MC-17 presentation data (through the verified
 * MC-18 adapter) and the MC-19 content contract. It adds no product data: family
 * identity, readiness, edition counts and restrictions come from the canonical
 * projection; only the per-audience summary text is authored here.
 *
 * Commercial invariants are inherited: the only presentation this milestone can
 * render is fail-closed (no purchase, no price, no availability).
 */
import type {
  MareaFamilySummary,
  MareaLocale,
  MareaReadinessSummary,
} from '../../marea-design-system/core/types';
import {
  LANDING_COMMERCIAL_PRESENTATION,
  LANDING_EDITION_COUNT,
  LANDING_STATUS_FACTS,
  buildReadinessSummary,
  familySummaryFor,
} from '../../marea-landing/data/landing-domain';
import { SEGMENT_CONTENT } from '../content';
import type { SegmentSectionId } from '../content/content.types';
import type { SegmentId } from '../models/segment-identity';

export const SEGMENT_COMMERCIAL_PRESENTATION = LANDING_COMMERCIAL_PRESENTATION;

export const SEGMENT_STATUS_FACTS = {
  families: LANDING_STATUS_FACTS.families,
  editions: LANDING_EDITION_COUNT,
  bundles: LANDING_STATUS_FACTS.bundles,
  releaseGates: LANDING_STATUS_FACTS.releaseGates,
  releaseGatesClosed: LANDING_STATUS_FACTS.releaseGatesClosed,
  requiredDocuments: LANDING_STATUS_FACTS.requiredDocuments,
  documentsExecuted: LANDING_STATUS_FACTS.documentsExecuted,
  publicAuthorizedClaims: LANDING_STATUS_FACTS.publicAuthorizedClaims,
  approvedPrices: LANDING_STATUS_FACTS.approvedPrices,
  verifiedStockRows: LANDING_STATUS_FACTS.verifiedStockRows,
  testedCompatibilityRows: LANDING_STATUS_FACTS.testedCompatibilityRows,
  merchantSkuCodes: LANDING_STATUS_FACTS.merchantSkuCodes,
};

/**
 * Builds the MC-17 family summaries for one audience page.
 *
 * A family id that resolves to no canonical fixture yields no card: the section
 * renders fewer cards instead of inventing identity. The validator rejects a
 * missing family, so this cannot pass unnoticed.
 */
export function segmentFamilySummaries(segmentId: SegmentId): readonly MareaFamilySummary[] {
  const copy = SEGMENT_CONTENT.segments[segmentId].families.families;
  const summaries: MareaFamilySummary[] = [];
  for (const entry of copy) {
    const summary = familySummaryFor(entry.familyId, entry.summary.text);
    if (summary) summaries.push(summary);
  }
  return summaries;
}

/** Derived fail-closed readiness summary with MC-19-localized dimension labels. */
export function segmentReadinessSummary(locale: MareaLocale): MareaReadinessSummary {
  const labels = SEGMENT_CONTENT.shared.readinessLabels.map((entry) => ({
    dimensionId: entry.dimensionId,
    label: entry.label.text[locale],
    note: null,
  }));
  return buildReadinessSummary(labels);
}

/** Stable heading id used by the section frame's `aria-labelledby`. */
export function sectionHeadingId(segmentId: SegmentId, sectionId: SegmentSectionId): string {
  return `mc19-${segmentId}-${sectionId}-heading`;
}
