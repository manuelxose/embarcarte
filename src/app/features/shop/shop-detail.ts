import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  RESPONSE_INIT,
  TransferState,
  computed,
  effect,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { ShopProduct, formatPrice } from '../../core/models';
import { SeoData, SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { SITE, absoluteUrl } from '../../core/site.config';
import { ProductImage } from '../../shared/ui/product-image';
import { productText } from './product-text';

const summarize = (text: string, max = 158): string =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '') + '…';

@Component({
  selector: 'app-shop-detail',
  imports: [RouterLink, ProductImage],
  template: `
    @if (product(); as p) {
      <section class="section-pad">
        <div class="wrap">
          <nav class="crumbs" [attr.aria-label]="i18n.t('a11y.breadcrumb')">
            <a [routerLink]="locale.url('home')">{{ i18n.t('nav.home') }}</a> /
            <a [routerLink]="locale.url('shop')">{{ i18n.t('nav.shop') }}</a> /
            <span>{{ textOf(p).name }}</span>
          </nav>
          <div class="detail-grid">
            <div class="product-photo"><app-product-image [src]="p.image" [alt]="textOf(p).name" /></div>
            <div>
              <p class="eyebrow" [attr.lang]="contentLang()">{{ textOf(p).category }}</p>
              <h1 class="display h-md" [attr.lang]="contentLang()">{{ textOf(p).name }}</h1>
              <p class="lead muted" [attr.lang]="contentLang()" style="margin: 18px 0 24px">{{ textOf(p).summary }}</p>
              <p class="price" style="font-size: 30px">{{ price(p.price_cents) }} <span class="small muted">{{ i18n.t('shopDetail.vat') }}</span></p>
              @if (p.stock > 0) {
                <div class="hero-actions" style="margin: 24px 0">
                  <div class="qty">
                    <button type="button" [attr.aria-label]="i18n.t('cart.decrease')" (click)="qty.set(Math.max(1, qty() - 1))">−</button>
                    <span>{{ qty() }}</span>
                    <button type="button" [attr.aria-label]="i18n.t('cart.increase')" (click)="qty.set(Math.min(p.stock, qty() + 1))">+</button>
                  </div>
                  <button class="button button-dark" type="button" (click)="add(p)">{{ i18n.t('shopDetail.addToCart') }} <span aria-hidden="true">↗</span></button>
                </div>
                @if (added()) {
                  <p class="success" role="status">{{ i18n.t('shopDetail.added') }} <a class="text-link" [routerLink]="locale.url('cart')">{{ i18n.t('shopDetail.viewCart') }} →</a></p>
                }
                <p class="small muted">{{ p.stock < 5 ? i18n.t('shopDetail.lastUnits', { count: p.stock }) : i18n.t('shopDetail.inStock') }}</p>
              } @else {
                <p><span class="badge off">{{ i18n.t('shop.soldOut') }}</span></p>
                <a class="text-link" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'tienda' }">{{ i18n.t('shopDetail.notify') }} →</a>
              }
              <div class="prose" [attr.lang]="contentLang()" style="margin-top: 32px; white-space: pre-line">{{ textOf(p).description }}</div>
            </div>
          </div>
        </div>
      </section>
    } @else if (notFound()) {
      <section class="page-hero" style="min-height: 50vh">
        <div class="wrap">
          <p class="eyebrow">{{ i18n.t('shop.eyebrow') }}</p>
          <h1 class="display h-lg">{{ i18n.t('shopDetail.unavailableTitle') }}<br /><em>{{ i18n.t('shopDetail.unavailableTitleEm') }}</em></h1>
          <p class="lead"><a class="text-link" [routerLink]="locale.url('shop')">{{ i18n.t('shopDetail.backToShop') }} →</a></p>
        </div>
      </section>
    } @else {
      <p class="empty">{{ i18n.t('common.loading') }}</p>
    }
  `,
})
export class ShopDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly initialSlug = this.route.snapshot.paramMap.get('slug') ?? '';
  private loadedSlug = this.initialSlug;

  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly transferState = inject(TransferState);
  private readonly seo = inject(SeoService);
  private readonly response = inject(RESPONSE_INIT, { optional: true });
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly cart = inject(CartService);
  /** The SSR response is transferred so hydration starts with the same product. */
  protected readonly product = signal<ShopProduct | null>(
    this.transferState.get(this.stateKeyFor(this.initialSlug), null),
  );
  protected readonly notFound = signal(false);
  protected readonly qty = signal(1);
  protected readonly added = signal(false);
  protected readonly Math = Math;

  protected textOf = (product: ShopProduct) => productText(product, this.locale.locale());
  protected price = (cents: number) => formatPrice(cents, this.locale.locale());

  /** Marks product copy that falls back to Spanish while the page itself is English. */
  protected readonly contentLang = computed(() => {
    const product = this.product();
    return product && this.locale.locale() === 'en' && !productText(product, 'en').translated ? 'es' : null;
  });

  constructor() {
    effect(() => {
      const locale = this.locale.locale();
      const product = this.product();
      if (!product) {
        if (!this.notFound()) return;
        // The product does not exist: no canonical and no alternate, because
        // either would point search engines at a page that is not published.
        this.seo.set({
          title: this.i18n.t('shopDetail.seoUnavailableTitle'),
          description: this.i18n.t('shopDetail.seoUnavailableDescription'),
          noindex: true,
        });
        return;
      }
      const text = productText(product, locale);
      const path = this.locale.url('shopDetail', { slug: product.slug }, locale);
      const page: SeoData = pageSeo('shopDetail', locale, {
        params: { slug: product.slug },
        title: `${text.name} — ${this.i18n.t('shop.eyebrow')}`,
        description: summarize(text.summary || text.description),
        image: product.image.startsWith('/') ? product.image : undefined,
        jsonLd: [
          breadcrumb(
            [
              { name: this.i18n.t('nav.shop'), path: this.locale.url('shop', undefined, locale) },
              { name: text.name, path },
            ],
            locale,
          ),
          {
            '@type': 'Product',
            name: text.name,
            description: text.description || text.summary,
            sku: product.slug,
            category: text.category,
            brand: { '@type': 'Brand', name: 'Open Marine' },
            image: product.image ? (product.image.startsWith('/') ? SITE.url + product.image : product.image) : `${SITE.url}/og-image.png`,
            offers: {
              '@type': 'Offer',
              url: absoluteUrl(path),
              priceCurrency: 'EUR',
              price: (product.price_cents / 100).toFixed(2),
              availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              seller: { '@type': 'Organization', name: SITE.name },
            },
          },
        ],
      });
      if (text.translated) {
        this.seo.set(page);
        return;
      }
      // Only the Spanish page is published: it indexes itself and names no
      // English alternate, and the English URL asks not to be indexed.
      this.seo.set(
        locale === 'es'
          ? { ...page, alternates: [{ language: 'es', path }] }
          : { ...page, noindex: true, alternates: [] },
      );
    });

  }

  private stateKeyFor(slug: string) {
    return makeStateKey<ShopProduct>(`shop-product:${slug}`);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get('slug') ?? '';
      if (slug === this.loadedSlug) {
        // Hydration already had the server product: no duplicate request and
        // no empty first render (which caused a large layout shift on mobile).
        if (!this.product()) this.load(slug);
        return;
      }
      // The router can reuse this component between two product URLs.
      this.loadedSlug = slug;
      this.product.set(null);
      this.notFound.set(false);
      this.qty.set(1);
      this.added.set(false);
      this.load(slug);
    });
  }

  private load(slug: string): void {
    this.http.get<ShopProduct>(`/api/shop/products/${encodeURIComponent(slug)}`).subscribe({
      next: (product) => {
        this.product.set(product);
        if (isPlatformServer(this.platformId)) this.transferState.set(this.stateKeyFor(slug), product);
      },
      error: () => {
        this.notFound.set(true);
        if (this.response) this.response.status = 404;
      },
    });
  }

  protected add(product: ShopProduct): void {
    this.cart.add(product, this.qty());
    this.added.set(true);
  }
}
