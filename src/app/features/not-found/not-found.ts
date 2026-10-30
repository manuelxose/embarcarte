import { Component, RESPONSE_INIT, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService } from '../../core/seo.service';

/**
 * Unknown URL. It is not redirected to the home page and it publishes no
 * canonical and no `hreflang`, because the document has no address of its own.
 */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="page-hero" style="min-height: 60vh">
      <div class="wrap">
        <p class="eyebrow">Error 404</p>
        <h1 class="display h-xl">{{ i18n.t('notFound.title') }}<br /><em>{{ i18n.t('notFound.titleEm') }}</em></h1>
        <p class="lead">{{ i18n.t('notFound.lead') }}</p>
        <div class="hero-actions" style="margin-top: 30px">
          <a [routerLink]="locale.url('home')" class="button button-dark">{{ i18n.t('notFound.home') }} <span aria-hidden="true">↗</span></a>
          <a [routerLink]="locale.url('shop')" class="text-link">{{ i18n.t('notFound.shop') }} <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);

  constructor() {
    const response = inject(RESPONSE_INIT, { optional: true });
    if (response) response.status = 404;

    const seo = inject(SeoService);
    effect(() => {
      seo.set({
        title: this.i18n.t('notFound.seoTitle'),
        description: this.i18n.t('notFound.seoDescription'),
        language: this.locale.locale(),
        noindex: true,
      });
    });
  }
}
