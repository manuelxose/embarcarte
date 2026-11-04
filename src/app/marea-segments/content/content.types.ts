/**
 * MC-19 internal audience pages — bilingual content contract.
 *
 * One content source (`content/index.ts`) feeds one component tree
 * (`segment-page.ts`) for three audience identities and two locales. Every
 * rendered sentence is a typed block with stable id, section id, copy class,
 * evidence ids and FIXED publication/approval literals.
 *
 * The vocabulary (`CopyClass`, `ContentSourceType`, `LocalizedText`, the two
 * frozen status literals) is imported from the MC-18 contract rather than
 * redefined, so the two internal page families cannot drift apart.
 */
import type {
  ContentSourceType,
  CopyClass,
  LocalizedText,
} from '../../marea-landing/content/content.types';
import type { SegmentId } from '../models/segment-identity';

export type { ContentSourceType, CopyClass, LocalizedText };

/** Eight frozen sections, in document order. */
export type SegmentSectionId =
  | 'hero'
  | 'scope'
  | 'families'
  | 'capabilities'
  | 'ecosystem'
  | 'readiness'
  | 'documentation'
  | 'closing';

export const SEGMENT_SECTION_ORDER: readonly SegmentSectionId[] = [
  'hero',
  'scope',
  'families',
  'capabilities',
  'ecosystem',
  'readiness',
  'documentation',
  'closing',
];

/** In-page anchors. They identify internal sections, never public routes. */
export const SEGMENT_SECTION_ANCHORS: Readonly<Record<SegmentSectionId, string>> = {
  hero: 'inicio',
  scope: 'alcance',
  families: 'familias',
  capabilities: 'capacidades',
  ecosystem: 'ecosistema',
  readiness: 'disponibilidad',
  documentation: 'documentacion',
  closing: 'cierre',
};

export const SEGMENT_PUBLICATION_STATUS = 'INTERNAL_DRAFT_NOT_APPROVED' as const;
export const SEGMENT_APPROVAL_STATUS = 'NOT_APPROVED' as const;

export interface SegmentContentBlock {
  readonly contentId: string;
  readonly sectionId: SegmentSectionId;
  readonly sourceType: ContentSourceType;
  readonly copyClass: CopyClass;
  readonly evidenceIds: readonly string[];
  readonly publicationStatus: typeof SEGMENT_PUBLICATION_STATUS;
  readonly approvalStatus: typeof SEGMENT_APPROVAL_STATUS;
  readonly text: LocalizedText;
}

export interface SegmentNavigationEntry {
  readonly id: string;
  readonly label: LocalizedText;
  /** In-page anchor only. */
  readonly href: string;
}

export interface SegmentSectionCopy {
  readonly kicker: SegmentContentBlock;
  readonly heading: SegmentContentBlock;
  readonly lead: SegmentContentBlock;
}

export interface SegmentHeroCopy extends SegmentSectionCopy {
  readonly classification: SegmentContentBlock;
  readonly highlights: readonly SegmentContentBlock[];
}

/** One titled aspect of the audience boundary. */
export interface SegmentScopeItem {
  readonly itemId: string;
  readonly label: SegmentContentBlock;
  readonly body: SegmentContentBlock;
}

/** One evidence-based use case, with the declared limit of that scenario. */
export interface SegmentUseCase {
  readonly useCaseId: string;
  readonly title: SegmentContentBlock;
  readonly body: SegmentContentBlock;
  readonly limit: SegmentContentBlock;
}

export interface SegmentScopeCopy extends SegmentSectionCopy {
  readonly isFor: readonly SegmentScopeItem[];
  readonly isNotFor: readonly SegmentScopeItem[];
  readonly useCases: readonly SegmentUseCase[];
  readonly boundary: SegmentContentBlock;
}

export interface SegmentFamilyCopy {
  readonly familyId: string;
  readonly summary: SegmentContentBlock;
}

export interface SegmentFamiliesCopy extends SegmentSectionCopy {
  readonly families: readonly SegmentFamilyCopy[];
  readonly note: SegmentContentBlock;
}

/**
 * One differentiated capability. `limit` is mandatory: a capability row without
 * a declared limit cannot be authored through this type.
 */
export interface SegmentCapability {
  readonly capabilityId: string;
  readonly title: SegmentContentBlock;
  readonly capability: SegmentContentBlock;
  readonly limit: SegmentContentBlock;
}

export interface SegmentCapabilitiesCopy extends SegmentSectionCopy {
  readonly capabilities: readonly SegmentCapability[];
  readonly note: SegmentContentBlock;
}

/** One step of the conceptual data/installation chain (a real sequence). */
export interface SegmentEcosystemStep {
  readonly stepId: string;
  readonly label: SegmentContentBlock;
  readonly body: SegmentContentBlock;
}

export interface SegmentEcosystemCopy extends SegmentSectionCopy {
  readonly steps: readonly SegmentEcosystemStep[];
  readonly note: SegmentContentBlock;
}

export interface SegmentReadinessCopy extends SegmentSectionCopy {
  /** Status statements printed next to the derived readiness panel. */
  readonly statements: readonly SegmentContentBlock[];
  readonly gateNote: SegmentContentBlock;
}

export type SegmentDocumentStatus = 'PENDING';

/** A documentation reference that does not exist yet, with its limitation. */
export interface SegmentDocumentationReference {
  readonly referenceId: string;
  readonly title: SegmentContentBlock;
  readonly limitation: SegmentContentBlock;
  readonly status: SegmentDocumentStatus;
}

export interface SegmentDocumentationCopy extends SegmentSectionCopy {
  readonly references: readonly SegmentDocumentationReference[];
  readonly note: SegmentContentBlock;
}

export interface SegmentClosingCopy extends SegmentSectionCopy {
  readonly statements: readonly SegmentContentBlock[];
  readonly restriction: SegmentContentBlock;
  readonly actionLabel: SegmentContentBlock;
  readonly actionReason: SegmentContentBlock;
}

export interface SegmentPageCopy {
  readonly hero: SegmentHeroCopy;
  readonly scope: SegmentScopeCopy;
  readonly families: SegmentFamiliesCopy;
  readonly capabilities: SegmentCapabilitiesCopy;
  readonly ecosystem: SegmentEcosystemCopy;
  readonly readiness: SegmentReadinessCopy;
  readonly documentation: SegmentDocumentationCopy;
  readonly closing: SegmentClosingCopy;
}

export interface SegmentReadinessDimensionLabel {
  readonly dimensionId: string;
  readonly label: SegmentContentBlock;
}

export interface SegmentAudienceNavEntry {
  readonly segmentId: SegmentId;
  readonly label: SegmentContentBlock;
}

/** Interface labels used by the section layout. Localized, never hard-coded. */
export interface SegmentSharedLabels {
  readonly isFor: SegmentContentBlock;
  readonly isNotFor: SegmentContentBlock;
  readonly useCase: SegmentContentBlock;
  readonly capability: SegmentContentBlock;
  readonly limit: SegmentContentBlock;
  readonly readinessFacts: SegmentContentBlock;
  readonly references: SegmentContentBlock;
  readonly pending: SegmentContentBlock;
  readonly audienceNav: SegmentContentBlock;
  readonly sectionNav: SegmentContentBlock;
  readonly factsFamilies: SegmentContentBlock;
  readonly factsEditions: SegmentContentBlock;
  readonly factsBundles: SegmentContentBlock;
  readonly factsGates: SegmentContentBlock;
  readonly factsClaims: SegmentContentBlock;
  readonly factsPrices: SegmentContentBlock;
  readonly factsCompatibility: SegmentContentBlock;
}

export interface SegmentSharedCopy {
  readonly classificationBanner: SegmentContentBlock;
  readonly provisionalBrand: SegmentContentBlock;
  readonly proposedBrandLabel: SegmentContentBlock;
  readonly footerClassification: SegmentContentBlock;
  readonly footerPublicIsolation: SegmentContentBlock;
  readonly footerGates: SegmentContentBlock;
  readonly footerEnquiry: SegmentContentBlock;
  readonly skipLink: SegmentContentBlock;
  readonly previewLabel: SegmentContentBlock;
  readonly localeSwitchLabel: SegmentContentBlock;
  readonly navigation: readonly SegmentNavigationEntry[];
  /** Cross-navigation between the three internal audience pages. */
  readonly audienceNav: readonly SegmentAudienceNavEntry[];
  readonly readinessLabels: readonly SegmentReadinessDimensionLabel[];
  readonly labels: SegmentSharedLabels;
}

export interface SegmentContent {
  readonly shared: SegmentSharedCopy;
  readonly segments: Readonly<Record<SegmentId, SegmentPageCopy>>;
}

/** Block together with its resolved locale text, used by the data exporter. */
export interface ResolvedSegmentBlock {
  readonly segmentId: SegmentId | 'shared';
  readonly contentId: string;
  readonly sectionId: SegmentSectionId;
  readonly locale: 'es' | 'en';
  readonly sourceType: ContentSourceType;
  readonly copyClass: CopyClass;
  readonly evidenceIds: readonly string[];
  readonly publicationStatus: typeof SEGMENT_PUBLICATION_STATUS;
  readonly approvalStatus: typeof SEGMENT_APPROVAL_STATUS;
  readonly text: string;
}
