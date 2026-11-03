/**
 * MC-18 internal landing — content helpers.
 *
 * One locale-aware accessor shared by every section. The locale comes from the
 * design-system `MareaI18n` signal, which the theme host sets before children
 * render; there is no second locale state anywhere in the landing.
 */
import type { MareaLocale } from '../../marea-design-system/core/types';
import type { ContentBlock, LandingSectionId, LocalizedText } from './content.types';

export function localizedText(text: LocalizedText, locale: MareaLocale): string {
  return text[locale];
}

export function blockText(block: ContentBlock, locale: MareaLocale): string {
  return block.text[locale];
}

/** In-page anchors. They identify internal sections, never public routes. */
export const SECTION_ANCHORS: Readonly<Record<LandingSectionId, string>> = {
  hero: 'hero',
  ecosystem: 'ecosistema',
  families: 'familias',
  architecture: 'arquitectura',
  bundles: 'paquetes',
  softwareHardware: 'software-hardware',
  professionals: 'profesionales',
  documentation: 'documentacion',
  availability: 'disponibilidad',
  closing: 'cierre',
};

export const SECTION_ORDER: readonly LandingSectionId[] = [
  'hero',
  'ecosystem',
  'families',
  'architecture',
  'bundles',
  'softwareHardware',
  'professionals',
  'documentation',
  'availability',
  'closing',
];

export function sectionAnchor(sectionId: LandingSectionId): string {
  return SECTION_ANCHORS[sectionId];
}
