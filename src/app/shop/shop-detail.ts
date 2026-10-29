import { HttpClient } from '@angular/common/http';
import { Component, RESPONSE_INIT, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/cart.service';
import { ShopProduct, formatPrice } from '../core/models';
import { SeoService, breadcrumb } from '../core/seo.service';
import { SITE, absoluteUrl } from '../core/site.config';
import { ProductImage } from './product-image';

@Component({
  selector: 'app-shop-detail',
  imports: [RouterLink, ProductImage],
  template: `
    @if (product(); as p) {
      <section class="section-pad">
        <div class="wrap">
          <nav class="crumbs" aria-label="Migas de pan">
            <a routerLink="/">Inicio</a> / <a routerLink="/tienda">Tienda</a> / <span>{{ p.name }}</span>
          </nav>
          <div class="detail-grid">
            <div class="product-photo"><app-product-image [src]="p.image" [alt]="p.name" /></div>
            <div>
              <p class="eyebrow">{{ p.category }}</p>
              <h1 class="display h-md">{{ p.name }}</h1>
              <p class="lead muted" style="margin: 18px 0 24px">{{ p.summary }}</p>
              <p class="price" style="font-size: 30px">{{ price(p.price_cents) }} <span class="small muted">IVA incluido</span></p>
              @if (p.stock > 0) {
                <div class="hero-actions" style="margin: 24px 0">
                  <div class="qty">
                    <button type="button" aria-label="Menos" (click)="qty.set(Math.max(1, qty() - 1))">−</button>
                    <span>{{ qty() }}</span>
                    <button type="button" aria-label="Más" (click)="qty.set(Math.min(p.stock, qty() + 1))">+</button>
                  </div>
                  <button class="button button-dark" type="button" (click)="add(p)">Añadir al carrito <span>↗</span></button>
                </div>
                @if (added()) {
                  <p class="success" role="status">Añadido. <a class="text-link" routerLink="/carrito">Ver carrito →</a></p>
                }
                <p class="small muted">{{ p.stock < 5 ? 'Últimas ' + p.stock + ' unidades' : 'En stock' }}</p>
              } @else {
                <p><span class="badge off">Agotado</span></p>
                <a class="text-link" routerLink="/contacto" [queryParams]="{ tema: 'tienda' }">Avísame cuando esté disponible →</a>
              }
              <div class="prose" style="margin-top: 32px; white-space: pre-line">{{ p.description }}</div>
            </div>
          </div>
        </div>
      </section>
    } @else if (notFound()) {
      <section class="page-hero" style="min-height: 50vh">
        <div class="wrap">
          <p class="eyebrow">Tienda</p>
          <h1 class="display h-lg">Este producto<br /><em>no está disponible.</em></h1>
          <p class="lead"><a class="text-link" routerLink="/tienda">Volver a la tienda →</a></p>
        </div>
      </section>
    } @else {
      <p class="empty">Cargando…</p>
    }
  `,
})
export class ShopDetail {
  readonly slug = input.required<string>();

  private readonly http = inject(HttpClient);
  private readonly seo = inject(SeoService);
  private readonly response = inject(RESPONSE_INIT, { optional: true });
  protected readonly cart = inject(CartService);
  protected readonly product = signal<ShopProduct | null>(null);
  protected readonly notFound = signal(false);
  protected readonly qty = signal(1);
  protected readonly added = signal(false);
  protected readonly price = formatPrice;
  protected readonly Math = Math;

  ngOnInit(): void {
    this.http.get<ShopProduct>(`/api/shop/products/${encodeURIComponent(this.slug())}`).subscribe({
      next: (p) => {
        this.product.set(p);
        const path = `/tienda/${p.slug}`;
        this.seo.set({
          title: `${p.name} — Tienda`,
          description: p.summary || p.description.slice(0, 155),
          path,
          image: p.image.startsWith('/') ? p.image : undefined,
          jsonLd: [
            breadcrumb([
              { name: 'Tienda', path: '/tienda' },
              { name: p.name, path },
            ]),
            {
              '@type': 'Product',
              name: p.name,
              description: p.description || p.summary,
              sku: p.slug,
              category: p.category,
              brand: { '@type': 'Brand', name: 'Open Marine' },
              image: p.image ? (p.image.startsWith('/') ? SITE.url + p.image : p.image) : `${SITE.url}/og-image.png`,
              offers: {
                '@type': 'Offer',
                url: absoluteUrl(path),
                priceCurrency: 'EUR',
                price: (p.price_cents / 100).toFixed(2),
                availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                seller: { '@type': 'Organization', name: SITE.name },
              },
            },
          ],
        });
      },
      error: () => {
        this.notFound.set(true);
        if (this.response) this.response.status = 404;
        this.seo.set({ title: 'Producto no disponible', description: 'Producto no disponible.', path: '/tienda', noindex: true });
      },
    });
  }

  protected add(p: ShopProduct): void {
    this.cart.add(p, this.qty());
    this.added.set(true);
  }
}
