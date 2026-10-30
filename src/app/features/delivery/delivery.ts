import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { IMAGES } from '../../core/images';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { localized } from '../../shared/models/localized';
import { DELIVERY_PAGE } from './content/delivery.content';

@Component({
  selector: 'app-delivery',
  imports: [RouterLink],
  template: `
    <section class="hero" style="height: min(600px, calc(100svh - 76px))">
      <div
        class="hero-image"
        role="img"
        [attr.aria-label]="c().imageAlt"
        [style.background-image]="'url(' + images.transfers + ')'"
      ></div>
      <div class="hero-shade"></div>
      <div class="hero-content wrap">
        <p class="eyebrow">{{ c().eyebrow }}</p>
        <h1 class="display h-xl">{{ c().heading[0] }}<br /><em>{{ c().headingEm }}</em></h1>
        <p class="hero-copy">{{ c().copy }}</p>
        <div class="hero-actions">
          <a class="button button-light" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'traslados' }">{{ c().cta }} <span>↗</span></a>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">{{ c().howEyebrow }}</p>
        <ol class="steps">
          @for (step of c().steps; track step) {
            <li>{{ step }}</li>
          }
        </ol>
      </div>
    </section>

    <section class="manifesto section-pad">
      <div class="manifesto-bg"></div>
      <div class="wrap manifesto-inner">
        <p class="eyebrow">{{ c().quoteEyebrow }}</p>
        <h2 class="display h-lg">{{ c().quoteHeading[0] }}<br /><em>{{ c().quoteHeadingEm }}</em></h2>
        <p>{{ c().quoteText }}</p>
        <a class="button button-outline" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'traslados' }">{{ c().quoteCta }} <span>↗</span></a>
      </div>
    </section>
  `,
})
export class Delivery {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly images = IMAGES;
  protected readonly c = computed(() => localized(DELIVERY_PAGE, this.locale.locale()));

  constructor() {
    const seo = inject(SeoService);
    effect(() =>
      seo.set(
        pageSeo('delivery', this.locale.locale(), {
          title: this.c().seo.title,
          description: this.c().seo.description,
          jsonLd: [
            breadcrumb([{ name: this.i18n.t('nav.delivery'), path: this.locale.url('delivery') }], this.locale.locale()),
            {
              '@type': 'Service',
              serviceType: 'Traslado de embarcaciones',
              provider: { '@type': 'Organization', name: 'Embarcarte', url: 'https://embarcarte.com' },
            },
          ],
        }),
      ),
    );
  }
}
