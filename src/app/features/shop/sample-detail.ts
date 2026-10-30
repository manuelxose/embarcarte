import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SAMPLE_PRODUCTS, sampleText } from '../../core/sample-products';
import { SeoService, pageSeo } from '../../core/seo.service';
import { ProductImage } from '../../shared/ui/product-image';

@Component({
  selector: 'app-sample-detail',
  imports: [RouterLink, ProductImage],
  template: `
    <section class="section-pad"><div class="wrap">
      <nav class="crumbs" [attr.aria-label]="i18n.t('a11y.breadcrumb')">
        <a [routerLink]="locale.url('home')">{{ i18n.t('nav.home') }}</a> /
        <a [routerLink]="locale.url('shop')">{{ i18n.t('nav.shop') }}</a> /
        <span>{{ text().name }}</span>
      </nav>
      <div class="detail-grid">
        <div class="product-photo"><app-product-image [src]="product.image" [alt]="text().name" /></div>
        <div>
          <p class="eyebrow">{{ text().category }} · {{ i18n.t('shop.sampleBadge') }}</p>
          <h1 class="display h-md">{{ text().name }}</h1>
          <p class="lead muted">{{ text().summary }}</p>
          <p>{{ i18n.t('sample.note') }}</p>
          <a class="button button-outline" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'tienda', producto: text().name }">{{ i18n.t('sample.ask') }} →</a>
        </div>
      </div>
    </div></section>
  `,
})
export class SampleDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly product = SAMPLE_PRODUCTS.find((p) => p.slug === this.route.snapshot.paramMap.get('slug'))!;
  protected readonly text = computed(() => sampleText(this.product, this.locale.locale()));

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const locale = this.locale.locale();
      const text = this.text();
      // Samples are examples, not saleable products: `noindex`, and no `hreflang`
      // pair because an alternate to a page we ask not to index is meaningless.
      seo.set({
        ...pageSeo('shopSample', locale, {
          params: { slug: this.product.slug },
          title: text.name,
          description: text.summary,
          noindex: true,
        }),
        alternates: [],
      });
    });
  }
}
