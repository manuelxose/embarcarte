import type { Locale } from '../../core/i18n/locale.types';
import type { ShopProduct } from '../../core/models';

export interface ProductText {
  readonly name: string;
  readonly category: string;
  readonly summary: string;
  readonly description: string;
  /** True only when every published English field exists. */
  readonly translated: boolean;
}

/**
 * One rule for missing English product content: an empty field falls back to
 * the Spanish value, and a product is only treated as translated when all four
 * fields are present. Identity (id, slug, price, stock, image) never depends
 * on the locale.
 */
export const productText = (product: ShopProduct, locale: Locale): ProductText => {
  const translated = Boolean(product.name_en && product.category_en && product.summary_en && product.description_en);
  if (locale === 'es') {
    return { name: product.name, category: product.category, summary: product.summary, description: product.description, translated };
  }
  return {
    name: product.name_en || product.name,
    category: product.category_en || product.category,
    summary: product.summary_en || product.summary,
    description: product.description_en || product.description,
    translated,
  };
};
