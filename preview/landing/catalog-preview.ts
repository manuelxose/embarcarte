import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MareaCatalogPage } from '../../src/app/marea-catalog/catalog-page';
import { CATALOG_CONTENT, CATALOG_SHARED } from '../../src/app/marea-catalog/content';
import { isCatalogFamilyId } from '../../src/app/marea-catalog/models/catalog-identity';
import type { CatalogFamilyId } from '../../src/app/marea-catalog/data/catalog.generated';

/**
 * Internal preview host for the six MC-20/MC-21 catalogue families.
 *
 * Applies non-indexable, non-public metadata and then renders the real catalogue
 * page. It emits NO canonical link, NO alternative-language links, NO Open
 * Graph/Twitter tags and NO JSON-LD: the catalogue has no publication or
 * indexation authorisation.
 */
@Component({
  selector: 'marea-catalog-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaCatalogPage],
  template: '<marea-catalog-page [family]="family()" [locale]="locale()" />',
})
export class CatalogPreview {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** Route data is untrusted input: an unknown value falls back to the first canonical family. */
  readonly family = computed<CatalogFamilyId>(() => {
    const value = this.route.snapshot.data['family'];
    return isCatalogFamilyId(value) ? value : 'NAV';
  });

  readonly locale = computed<'es' | 'en'>(() =>
    this.route.snapshot.data['locale'] === 'en' ? 'en' : 'es',
  );

  constructor() {
    const locale = this.locale();
    const family = this.family();
    const heading = CATALOG_CONTENT[family].hero.heading[locale];

    this.title.setTitle(`${heading} · ${CATALOG_SHARED.previewLabel[locale]}`);
    this.document.documentElement.lang = locale === 'es' ? 'es-ES' : 'en';
    this.document.documentElement.setAttribute('data-marea-preview', 'internal-not-published');

    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow, noarchive' });
    this.meta.updateTag({
      name: 'description',
      content: CATALOG_SHARED.classificationBanner[locale],
    });
    this.meta.updateTag({ name: 'marea-publication', content: 'NOT_AUTHORIZED' });
    // No canonical link, alternative-language link, social-card metadata or
    // structured-data script is added by this internal preview host.
  }
}
