import type { LocalizedContent } from '../../../shared/models/localized';
import { LEGAL_EN } from '../content/legal.en';
import { LEGAL_ES } from '../content/legal.es';

/** Both the semantic route id and the page key: legal pages are addressed by these names. */
export type LegalPageId = 'legalNotice' | 'privacy' | 'cookies' | 'termsOfSale';

export interface LegalListItem {
  /** Rendered in bold before the text, e.g. the name of a cookie. */
  readonly label?: string;
  readonly text: string;
}

export interface LegalBlock {
  readonly heading?: string;
  readonly paragraphs?: readonly string[];
  readonly list?: readonly LegalListItem[];
  /**
   * Owner details read from `SITE.legal`; empty fields are skipped and a
   * "pending confirmation" line is shown instead, exactly as before.
   */
  readonly ownerDetails?: boolean;
}

export interface LegalText {
  readonly title: string;
  readonly blocks: readonly LegalBlock[];
}

export const LEGAL_PAGES: LocalizedContent<Record<LegalPageId, LegalText>> = { es: LEGAL_ES, en: LEGAL_EN };
