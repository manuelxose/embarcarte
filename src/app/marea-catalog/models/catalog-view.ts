import type { CatalogSectionId } from '../content/content.types';

/** Stable, machine-checkable heading id for one family section. */
export function catalogHeadingId(familyId: string, sectionId: CatalogSectionId): string {
  return `catalog-${familyId.toLowerCase()}-${sectionId}`;
}

/** Total number of sections in the frozen document order. */
export const CATALOG_SECTION_COUNT = 10;

/** Only the three canonical families may render a catalogue page. */
export const CATALOG_PAGE_FAMILIES = ['NAV', 'HUB', 'AIS'] as const;
