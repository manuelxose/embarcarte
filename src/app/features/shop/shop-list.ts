import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { ShopProduct, formatPrice } from '../../core/models';
import { SampleProduct, sampleText, searchSamples } from '../../core/sample-products';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { absoluteUrl } from '../../core/site.config';
import { ProductImage } from '../../shared/ui/product-image';
import { productText } from './product-text';

@Component({
  selector: 'app-shop-list',
  imports: [RouterLink, ProductImage],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">{{ i18n.t('shop.eyebrow') }}</p>
        <h1 class="display h-xl">{{ i18n.t('shop.title') }}<br /><em>{{ i18n.t('shop.titleEm') }}</em></h1>
        <p class="lead">{{ i18n.t('shop.lead') }}</p>
      </div>
    </section>

    <section class="section-pad"><div class="wrap">
      <div class="section-heading"><div><p class="eyebrow">{{ i18n.t('shop.samplesEyebrow') }}</p><h2 class="display h-lg">{{ i18n.t('shop.samplesTitle') }}</h2></div><p class="heading-note">{{ i18n.t('shop.samplesNote') }}</p></div>
      <label for="sample-search">{{ i18n.t('shop.search') }}</label>
      <input id="sample-search" type="search" [placeholder]="i18n.t('shop.searchPlaceholder')" (input)="search.set($any($event.target).value)" />
      <div class="service-grid">
        @for (item of filteredSamples(); track item.slug) {
          <article class="service-card"><div class="card-image"><app-product-image [src]="item.image" [alt]="sampleOf(item).name" /></div><div class="card-content"><span class="card-number">{{ sampleOf(item).category }} · {{ i18n.t('shop.sampleBadge') }}</span><h3>{{ sampleOf(item).name }}</h3><p>{{ sampleOf(item).summary }}</p><a class="arrow-link stretched" [routerLink]="locale.url('shopSample', { slug: item.slug })">{{ i18n.t('common.viewDetails') }} <span aria-hidden="true">→</span></a></div></article>
        } @empty {
          <p class="empty">{{ i18n.t('shop.noResults') }}</p>
        }
      </div>
    </div></section>

    <section class="services bg-soft section-pad">
      <div class="wrap">
        @if (error()) {
          <p class="empty">{{ i18n.t('shop.error') }}</p>
        } @else if (products() === null) {
          <p class="empty">{{ i18n.t('common.loading') }}</p>
        } @else if (products()!.length === 0) {
          <div class="empty">
            <h2 class="dash-title">{{ i18n.t('shop.soonTitle') }}</h2>
            <p>{{ i18n.t('shop.soonText') }} <a class="text-link" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'tienda' }">{{ i18n.t('shop.soonCta') }}</a>.</p>
          </div>
        } @else {
          <div class="service-grid">
            @for (p of products(); track p.id) {
              <article class="service-card">
                <div class="card-image"><app-product-image [src]="p.image" [alt]="textOf(p).name" /></div>
                <div class="card-content">
                  <span class="card-number">{{ textOf(p).category }}</span>
                  <h3><a class="stretched" [routerLink]="locale.url('shopDetail', { slug: p.slug })">{{ textOf(p).name }}</a></h3>
                  <p>{{ textOf(p).summary }}</p>
                  <div class="arrow-link">
                    <span class="price">{{ price(p.price_cents) }}</span>
                    @if (p.stock > 0) {
                      <button class="button button-dark button-small" style="position: relative; z-index: 2" type="button" (click)="cart.add(p)">
                        {{ i18n.t('shop.add') }}
                      </button>
                    } @else {
                      <span class="badge off">{{ i18n.t('shop.soldOut') }}</span>
                    }
                  </div>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class ShopList {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly cart = inject(CartService);
  protected readonly search = signal('');
  protected readonly products = signal<ShopProduct[] | null>(null);
  protected readonly error = signal(false);

  protected readonly filteredSamples = computed(() => searchSamples(this.search(), this.locale.locale()));

  protected sampleOf = (sample: SampleProduct) => sampleText(sample, this.locale.locale());
  protected textOf = (product: ShopProduct) => productText(product, this.locale.locale());
  protected price = (cents: number) => formatPrice(cents, this.locale.locale());

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const locale = this.locale.locale();
      const products = this.products();
      seo.set(
        pageSeo('shop', locale, {
          title: this.i18n.t('shop.seoTitle'),
          description: this.i18n.t('shop.seoDescription'),
          jsonLd: [
            breadcrumb([{ name: this.i18n.t('nav.shop'), path: this.locale.url('shop', undefined, locale) }], locale),
            // The list is published only once the catalogue has loaded, so the
            // markup never names products that are not on the page.
            ...(products?.length
              ? [
                  {
                    '@type': 'ItemList',
                    itemListElement: products.map((p, i) => ({
                      '@type': 'ListItem',
                      position: i + 1,
                      url: absoluteUrl(this.locale.url('shopDetail', { slug: p.slug }, locale)),
                      name: productText(p, locale).name,
                    })),
                  },
                ]
              : []),
          ],
        }),
      );
    });

    inject(HttpClient)
      .get<ShopProduct[]>('/api/shop/products')
      .subscribe({
        next: (products) => this.products.set(products),
        error: () => this.error.set(true),
      });
  }
}
