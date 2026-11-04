import type { CatalogFamilyContent } from './content.types';
import { NAV_CONTENT } from './nav';
import { HUB_CONTENT } from './hub';
import { AIS_CONTENT } from './ais';

export { CATALOG_SHARED } from './shared';
export { CATALOG_SECTION_ANCHORS, CATALOG_SECTION_IDS } from './content.types';
export type * from './content.types';

/** Frozen content map: one entry per canonical family in MC-16 order. */
export const CATALOG_CONTENT: Readonly<Record<string, CatalogFamilyContent>> = {
  NAV: NAV_CONTENT,
  HUB: HUB_CONTENT,
  AIS: AIS_CONTENT,
} as const;

export const CATALOG_FAMILY_CONTENT_LIST: readonly CatalogFamilyContent[] = [
  NAV_CONTENT,
  HUB_CONTENT,
  AIS_CONTENT,
];

export type CatalogFamilyContentId = keyof typeof CATALOG_CONTENT;

export function isCatalogFamilyContentId(value: unknown): value is CatalogFamilyContentId {
  return typeof value === 'string' && value in CATALOG_CONTENT;
}

export function catalogFamilyContent(familyId: string): CatalogFamilyContent | null {
  return CATALOG_CONTENT[familyId] ?? null;
}
