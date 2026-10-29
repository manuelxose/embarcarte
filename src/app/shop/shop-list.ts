import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/cart.service';
import { ShopProduct, formatPrice } from '../core/models';
import { SeoService, breadcrumb } from '../core/seo.service';
import { absoluteUrl } from '../core/site.config';
import { ProductImage } from './product-image';

@Component({
  selector: 'app-shop-list',
  imports: [RouterLink, ProductImage],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">Tienda</p>
        <h1 class="display h-xl">Electrónica abierta<br /><em>para tu barco.</em></h1>
        <p class="lead">Hardware y accesorios del ecosistema Open Marine. Compra online y sigue tu pedido desde tu área de cliente.</p>
      </div>
    </section>

    <section class="services bg-soft section-pad">
      <div class="wrap">
        @if (error()) {
          <p class="empty">No hemos podido cargar el catálogo. Inténtalo de nuevo en unos minutos.</p>
        } @else if (products() === null) {
          <p class="empty">Cargando productos…</p>
        } @else if (products()!.length === 0) {
          <div class="empty">
            <h2 class="dash-title">Muy pronto</h2>
            <p>Estamos preparando el catálogo. Mientras tanto, <a class="text-link" routerLink="/contacto" [queryParams]="{ tema: 'tienda' }">pídenos presupuesto</a>.</p>
          </div>
        } @else {
          <div class="service-grid">
            @for (p of products(); track p.id) {
              <article class="service-card">
                <div class="card-image"><app-product-image [src]="p.image" [alt]="p.name" /></div>
                <div class="card-content">
                  <span class="card-number">{{ p.category }}</span>
                  <h3><a class="stretched" [routerLink]="['/tienda', p.slug]">{{ p.name }}</a></h3>
                  <p>{{ p.summary }}</p>
                  <div class="arrow-link">
                    <span class="price">{{ price(p.price_cents) }}</span>
                    @if (p.stock > 0) {
                      <button class="button button-dark button-small" style="position: relative; z-index: 2" type="button" (click)="cart.add(p)">
                        Añadir
                      </button>
                    } @else {
                      <span class="badge off">Agotado</span>
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
  protected readonly cart = inject(CartService);
  protected readonly products = signal<ShopProduct[] | null>(null);
  protected readonly error = signal(false);
  protected readonly price = formatPrice;

  constructor() {
    const seo = inject(SeoService);
    inject(HttpClient)
      .get<ShopProduct[]>('/api/shop/products')
      .subscribe({
        next: (products) => {
          this.products.set(products);
          seo.set({
            title: 'Tienda de electrónica náutica Open Marine',
            description:
              'Compra el ordenador de navegación Open Marine Hub, el controlador de piloto automático y accesorios náuticos abiertos.',
            path: '/tienda',
            jsonLd: [
              breadcrumb([{ name: 'Tienda', path: '/tienda' }]),
              {
                '@type': 'ItemList',
                itemListElement: products.map((p, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: absoluteUrl(`/tienda/${p.slug}`),
                  name: p.name,
                })),
              },
            ],
          });
        },
        error: () => this.error.set(true),
      });
    seo.set({
      title: 'Tienda de electrónica náutica Open Marine',
      description:
        'Compra el ordenador de navegación Open Marine Hub, el controlador de piloto automático y accesorios náuticos abiertos.',
      path: '/tienda',
    });
  }
}
