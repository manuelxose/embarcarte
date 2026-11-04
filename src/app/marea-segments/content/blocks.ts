/**
 * MC-19 internal audience pages — block factory.
 *
 * `b()` is the only constructor of a content block. It fixes the publication and
 * approval literals, so no page, flag or environment variable can promote a
 * block to approved copy.
 */
import type {
  CopyClass,
  ContentSourceType,
  SegmentContentBlock,
  SegmentNavigationEntry,
  SegmentSectionId,
} from './content.types';
import { SEGMENT_APPROVAL_STATUS, SEGMENT_PUBLICATION_STATUS } from './content.types';

/** Evidence id groups, so a block never cites a raw, untyped string. */
export const EV = {
  instruction: ['EV-MC19-INSTRUCTION'],
  ia: ['EV-MC19-IA'],
  implementation: ['EV-MC19-IMPLEMENTATION'],
  preview: ['EV-MC19-PREVIEW'],
  handoff18: ['EV-MC18-HANDOFF'],
  handoff17: ['EV-MC17-HANDOFF'],
  routes: ['EV-MC15-ROUTES'],
  indexation: ['EV-MC15-INDEXATION'],
  families: ['EV-MC16-FAMILIES'],
  editions: ['EV-MC16-EDITIONS'],
  bundles: ['EV-MC16-BUNDLES'],
  products1: ['EV-MC05-PRODUCTS'],
  products2: ['EV-MC06-PRODUCTS'],
  products3: ['EV-MC07-PRODUCTS'],
  hardware: ['EV-MC11-HARDWARE'],
  gates: ['EV-MC14-GATES'],
  claims: ['EV-MC14-CLAIMS'],
  brand: ['EV-MC04-BRAND'],
} as const;

export function b(
  sectionId: SegmentSectionId,
  contentId: string,
  copyClass: CopyClass,
  evidenceIds: readonly string[],
  es: string,
  en: string,
  sourceType: ContentSourceType = 'AUTHORED_DRAFT',
): SegmentContentBlock {
  return {
    contentId,
    sectionId,
    sourceType,
    copyClass,
    evidenceIds: [...evidenceIds],
    publicationStatus: SEGMENT_PUBLICATION_STATUS,
    approvalStatus: SEGMENT_APPROVAL_STATUS,
    text: { es, en },
  };
}

export function nav(id: string, href: string, es: string, en: string): SegmentNavigationEntry {
  return { id, href, label: { es, en } };
}
