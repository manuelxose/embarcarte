/**
 * MC-18 internal landing — bilingual content contract.
 *
 * This file defines the shape of the ONE landing content source
 * (`landing-content.ts`). It deliberately mirrors the design-system rules:
 * one entity, one component tree, two locales; every rendered sentence is a
 * typed block with provenance and an explicit publication/approval state.
 *
 * Nothing here is approved public copy. `publicationStatus` and
 * `approvalStatus` are fixed literals so no build flag, query parameter or
 * environment variable can promote a block to approved.
 */

/** Locale of a rendered document. ES is the default, EN is served under `/en`. */
export type LandingLocale = 'es' | 'en';

/** The ten landing sections, in document order. Their ids are frozen. */
export type LandingSectionId =
  | 'hero'
  | 'ecosystem'
  | 'families'
  | 'architecture'
  | 'bundles'
  | 'softwareHardware'
  | 'professionals'
  | 'documentation'
  | 'availability'
  | 'closing';

/** Fixed literals: no approved copy exists, in either language. */
export const PUBLICATION_STATUS = 'INTERNAL_DRAFT_NOT_APPROVED' as const;
export const APPROVAL_STATUS = 'NOT_APPROVED' as const;

/**
 * Copy classes inherited from the MC-14 claims policy:
 * - `INTERNAL_EVIDENCED`: describes a fact already recorded in this repository.
 * - `PROPOSED_INTENT`: expresses a future intention or design proposal.
 * - `CONSTRAINT_STATEMENT`: states a limitation, negation or closed gate.
 * - `NAVIGATIONAL`: interface/navigation text with no product claim.
 */
export type CopyClass =
  'INTERNAL_EVIDENCED' | 'PROPOSED_INTENT' | 'CONSTRAINT_STATEMENT' | 'NAVIGATIONAL';

/** Where the block's content comes from. */
export type ContentSourceType =
  'INTERNAL_DOCUMENT' | 'CANONICAL_DOMAIN_DATA' | 'RELEASE_GATE_RECORD' | 'AUTHORED_DRAFT';

export interface LocalizedText {
  readonly es: string;
  readonly en: string;
}

/**
 * One bilingual content block. `contentId` is stable and unique across the
 * landing; `evidenceIds` must resolve in `content/evidence.ts`.
 */
export interface ContentBlock {
  readonly contentId: string;
  readonly sectionId: LandingSectionId;
  readonly sourceType: ContentSourceType;
  readonly copyClass: CopyClass;
  readonly evidenceIds: readonly string[];
  readonly publicationStatus: typeof PUBLICATION_STATUS;
  readonly approvalStatus: typeof APPROVAL_STATUS;
  readonly text: LocalizedText;
}

/** Titled paragraph used by principles and professional segments. */
export interface ContentItem {
  readonly itemId: string;
  readonly title: ContentBlock;
  readonly body: ContentBlock;
}

export interface NavigationEntry {
  readonly id: string;
  readonly label: LocalizedText;
  /** In-page anchor only. This preview never links to a public route. */
  readonly href: string;
}

/** Section 02 — one layer of the proposed ecosystem. */
export interface EcosystemLayer {
  readonly layerId: string;
  readonly title: ContentBlock;
  readonly body: ContentBlock;
}

/** Section 04 — a node in the conceptual architecture diagram. */
export type ArchitectureNodeKind = 'HARDWARE' | 'SOFTWARE' | 'SERVICE' | 'DATA' | 'EXTERNAL';

export interface ArchitectureNode {
  readonly nodeId: string;
  readonly kind: ArchitectureNodeKind;
  readonly label: ContentBlock;
}

/**
 * Section 04 — a conceptual dependency. Every link is unverified by
 * construction: the diagram never asserts interoperability.
 */
export interface ArchitectureLink {
  readonly linkId: string;
  readonly from: string;
  readonly to: string;
  readonly nature: 'CONCEPTUAL_DEPENDENCY';
  readonly label: ContentBlock;
}

/** Section 03 — per-family internal draft copy. Keys are MC-16 family ids. */
export interface LandingFamilyCopy {
  readonly familyId: string;
  readonly summary: ContentBlock;
  /** At least one material limitation per family; never empty. */
  readonly limitations: readonly ContentBlock[];
}

/** Section 05 — per-bundle internal draft copy. Keys are MC-16 bundle ids. */
export interface LandingBundleCopy {
  readonly bundleId: string;
  readonly summary: ContentBlock;
  /** Contract/safety composition constraints; never empty. */
  readonly constraints: readonly ContentBlock[];
}

/** Section 09 — readiness dimension labels (values come from canonical data). */
export interface ReadinessDimensionCopy {
  readonly dimensionId: string;
  readonly label: ContentBlock;
  readonly note: ContentBlock | null;
}

export interface LandingSectionCopy {
  readonly kicker: ContentBlock;
  readonly heading: ContentBlock;
  readonly lead: ContentBlock;
}

export interface HeroCopy extends LandingSectionCopy {
  readonly classification: ContentBlock;
  readonly supporting: ContentBlock;
  readonly highlights: readonly ContentBlock[];
}

export interface EcosystemCopy extends LandingSectionCopy {
  readonly layers: readonly EcosystemLayer[];
  readonly note: ContentBlock;
}

export interface FamiliesCopy extends LandingSectionCopy {
  readonly families: readonly LandingFamilyCopy[];
  readonly note: ContentBlock;
}

export interface ArchitectureCopy extends LandingSectionCopy {
  readonly nodes: readonly ArchitectureNode[];
  readonly links: readonly ArchitectureLink[];
  readonly diagramAlt: ContentBlock;
  readonly legend: readonly ContentBlock[];
  readonly note: ContentBlock;
}

export interface BundlesCopy extends LandingSectionCopy {
  readonly bundles: readonly LandingBundleCopy[];
  readonly note: ContentBlock;
}

export interface SoftwareHardwareCopy extends LandingSectionCopy {
  readonly principles: readonly ContentItem[];
  readonly note: ContentBlock;
}

export interface ProfessionalsCopy extends LandingSectionCopy {
  readonly segments: readonly ContentItem[];
  readonly note: ContentBlock;
}

export interface DocumentationCopy extends LandingSectionCopy {
  readonly principles: readonly ContentItem[];
  readonly scope: ContentBlock;
  readonly note: ContentBlock;
}

export interface AvailabilityCopy extends LandingSectionCopy {
  readonly dimensions: readonly ReadinessDimensionCopy[];
  readonly statusLines: readonly ContentBlock[];
  readonly gateNote: ContentBlock;
  readonly classificationNote: ContentBlock;
}

export interface ClosingCopy extends LandingSectionCopy {
  readonly statements: readonly ContentBlock[];
  readonly restriction: ContentBlock;
}

export interface LandingSections {
  readonly hero: HeroCopy;
  readonly ecosystem: EcosystemCopy;
  readonly families: FamiliesCopy;
  readonly architecture: ArchitectureCopy;
  readonly bundles: BundlesCopy;
  readonly softwareHardware: SoftwareHardwareCopy;
  readonly professionals: ProfessionalsCopy;
  readonly documentation: DocumentationCopy;
  readonly availability: AvailabilityCopy;
  readonly closing: ClosingCopy;
}

export interface LandingBrandCopy {
  /** Persistent internal/provisional banner. Never removed for aesthetics. */
  readonly internalBanner: ContentBlock;
  /** Proposed-brand restriction, visible in the page body, not only a title. */
  readonly provisionalBrand: ContentBlock;
  /** Footer classification block. */
  readonly footerClassification: ContentBlock;
  /** Skip link text. */
  readonly skipLink: ContentBlock;
  /** Header sovereignty: the internal preview label. */
  readonly previewLabel: ContentBlock;
}

export interface LandingContent {
  readonly brand: LandingBrandCopy;
  readonly navigation: readonly NavigationEntry[];
  readonly sections: LandingSections;
}

/** A block together with its resolved locale text, used by the data exporter. */
export interface ResolvedContentBlock {
  readonly contentId: string;
  readonly sectionId: LandingSectionId;
  readonly locale: LandingLocale;
  readonly sourceType: ContentSourceType;
  readonly copyClass: CopyClass;
  readonly evidenceIds: readonly string[];
  readonly publicationStatus: typeof PUBLICATION_STATUS;
  readonly approvalStatus: typeof APPROVAL_STATUS;
  readonly text: string;
}
