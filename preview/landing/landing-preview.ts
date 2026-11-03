import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MareaLanding } from '../../src/app/marea-landing/landing';
import type { LandingLocale } from '../../src/app/marea-landing/content/content.types';
import { buildLandingSeoContract } from '../../src/app/marea-landing/models/seo';
import { MC18_PUBLICATION_EVALUATION } from '../../src/app/marea-landing/models/publication-gates';

/**
 * Internal preview host.
 *
 * Applies non-indexable, non-public metadata for the isolated landing and then
 * renders the real landing component. It emits NO canonical link, NO hreflang,
 * NO Open Graph/Twitter tags and NO JSON-LD: those are planning candidates only
 * (`src/app/marea-landing/models/seo.ts`).
 */
@Component({
  selector: 'marea-landing-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaLanding],
  template: '<marea-landing [locale]="locale()" />',
})
export class LandingPreview {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  readonly locale = computed<LandingLocale>(() =>
    this.route.snapshot.data['locale'] === 'en' ? 'en' : 'es',
  );

  constructor() {
    const locale = this.locale();
    const contract = buildLandingSeoContract(locale, MC18_PUBLICATION_EVALUATION);

    this.title.setTitle(contract.pageTitle);
    this.document.documentElement.lang = locale === 'es' ? 'es-ES' : 'en';
    this.document.documentElement.setAttribute('data-marea-preview', 'internal-not-published');

    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow, noarchive' });
    this.meta.updateTag({ name: 'description', content: contract.metaDescription });
    this.meta.updateTag({ name: 'marea-publication', content: 'NOT_AUTHORIZED' });
    // No canonical, hreflang, og:*, twitter:* or application/ld+json is added here.
  }
}
