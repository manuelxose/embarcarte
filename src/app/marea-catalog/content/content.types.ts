/**
 * MC-20 internal catalogue — bilingual content contract.
 *
 * Every rendered sentence is a `CatalogContentBlock`: a canonical content id,
 * both locales, an evidence class inherited from the canonical dataset and the
 * source references that support it. The validator checks that the ids are
 * unique, that every block cites at least one real source file and that no
 * block introduces a prohibited commercial claim.
 *
 * These types describe presentation copy only. Product identity, readiness,
 * edition membership and bundle inclusion are never authored here: they are
 * read from the generated MC-16 projection.
 */

export type CatalogLocale = 'es' | 'en';

export interface Localized {
  readonly es: string;
  readonly en: string;
}

export type CatalogEvidenceClass =
  'VERIFIED_REPO' | 'VERIFIED_EXTERNAL' | 'ASSUMPTION' | 'HYPOTHESIS' | 'OPEN' | 'BLOCKED';

export interface CatalogContentBlock {
  readonly contentId: string;
  readonly text: Localized;
  readonly evidenceClass: CatalogEvidenceClass;
  readonly sourceRefs: readonly string[];
}

export interface CatalogSectionCopy {
  readonly kicker: Localized;
  readonly heading: Localized;
  readonly lead: Localized;
}

export type CatalogSectionId =
  | 'overview'
  | 'capabilities'
  | 'specifications'
  | 'composition'
  | 'editions'
  | 'limitations'
  | 'ecosystem'
  | 'readiness'
  | 'documentation'
  | 'closing';

export interface CatalogHero {
  readonly kicker: Localized;
  readonly heading: Localized;
  readonly lead: Localized;
  readonly category: Localized;
  /** Mandatory restrictions printed in the hero, never only in the footer. */
  readonly mandatoryNotice: CatalogContentBlock;
  readonly highlights: readonly CatalogContentBlock[];
}

export interface CatalogCapability {
  readonly contentId: string;
  readonly label: Localized;
  readonly description: Localized;
  readonly evidenceClass: CatalogEvidenceClass;
  readonly sourceRefs: readonly string[];
}

export interface CatalogLimitation {
  readonly contentId: string;
  readonly label: Localized;
  readonly description: Localized;
  readonly kind: 'LIMITATION' | 'PROHIBITION' | 'UNAVAILABLE';
  readonly evidenceClass: CatalogEvidenceClass;
  readonly sourceRefs: readonly string[];
}

export interface CatalogCompositionGroup {
  readonly groupId: string;
  readonly label: Localized;
  readonly heading: Localized;
  readonly items: readonly CatalogContentBlock[];
}

export interface CatalogInterfaceRow {
  readonly contentId: string;
  readonly direction: Localized;
  readonly transport: Localized;
  readonly status: Localized;
  readonly note: Localized | null;
  readonly evidenceClass: CatalogEvidenceClass;
  readonly sourceRefs: readonly string[];
}

export interface CatalogEditionContent {
  readonly editionId: string;
  readonly name: Localized;
  readonly summary: Localized;
  readonly note: Localized | null;
  readonly featureLabels: readonly { readonly featureKey: string; readonly label: Localized }[];
}

export interface CatalogBundleNote {
  readonly bundleId: string;
  readonly note: Localized;
}

export interface CatalogDocumentItem {
  readonly documentId: string;
  readonly title: Localized;
  readonly kind: string;
  readonly status: 'AVAILABLE' | 'PENDING';
  readonly limitation: Localized | null;
  readonly sourceRef: string;
}

export interface CatalogClosingCopy {
  readonly heading: Localized;
  readonly body: Localized;
  readonly governance: readonly CatalogContentBlock[];
  readonly nextMilestone: CatalogContentBlock;
}

export interface CatalogFamilyContent {
  readonly familyId: string;
  readonly hero: CatalogHero;
  readonly sections: Readonly<Record<CatalogSectionId, CatalogSectionCopy>>;
  readonly overviewNotes: readonly CatalogContentBlock[];
  readonly capabilities: readonly CatalogCapability[];
  readonly composition: readonly CatalogCompositionGroup[];
  readonly interfaces: readonly CatalogInterfaceRow[];
  readonly editions: readonly CatalogEditionContent[];
  readonly editionNote: Localized;
  readonly limitations: readonly CatalogLimitation[];
  readonly bundleNotes: readonly CatalogBundleNote[];
  readonly documentation: readonly CatalogDocumentItem[];
  readonly closing: CatalogClosingCopy;
}

export interface CatalogSharedNavEntry {
  readonly familyId: string;
  readonly label: Localized;
}

export interface CatalogSharedContent {
  readonly previewLabel: Localized;
  readonly classificationBanner: Localized;
  readonly provisionalBrand: Localized;
  readonly skipLink: Localized;
  readonly localeSwitchLabel: Localized;
  readonly proposedBrandLabel: Localized;
  readonly sectionNavLabel: Localized;
  readonly familiesNavLabel: Localized;
  readonly labels: Readonly<Record<string, Localized>>;
  /** Localized display text for canonical status codes. Never a new status value. */
  readonly statusVocabulary: Readonly<Record<string, Localized>>;
  readonly evidenceVocabulary: Readonly<Record<string, Localized>>;
  readonly familyNav: readonly CatalogSharedNavEntry[];
  readonly navigation: readonly {
    readonly id: CatalogSectionId;
    readonly label: Localized;
    readonly href: string;
  }[];
  readonly footerClassification: Localized;
  readonly footerPublicIsolation: Localized;
  readonly footerGates: Localized;
  readonly footerNoCommerce: Localized;
  readonly footerNoEnquiry: Localized;
  readonly facts: readonly {
    readonly contentId: string;
    readonly label: Localized;
  }[];
}

export const CATALOG_SECTION_IDS: readonly CatalogSectionId[] = [
  'overview',
  'capabilities',
  'specifications',
  'composition',
  'editions',
  'limitations',
  'ecosystem',
  'readiness',
  'documentation',
  'closing',
] as const;

/** In-page anchors. The order is frozen and shared by ES and EN. */
export const CATALOG_SECTION_ANCHORS: Readonly<Record<CatalogSectionId, string>> = {
  overview: 'vision-general',
  capabilities: 'capacidades',
  specifications: 'especificaciones',
  composition: 'composicion',
  editions: 'ediciones',
  limitations: 'limitaciones',
  ecosystem: 'ecosistema',
  readiness: 'preparacion',
  documentation: 'documentacion',
  closing: 'cierre',
};
