import { Component, inject } from '@angular/core';
import { PRODUCTS } from '../core/catalog';
import { SeoService, breadcrumb } from '../core/seo.service';
import { absoluteUrl } from '../core/site.config';
import { ProductCard } from './product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  template: `
    <section class="page-hero">
      <div class="container narrow">
        <p class="eyebrow">Catálogo</p>
        <h1>Productos de electrónica náutica</h1>
        <p class="lead">Software y hardware Open Marine. Todos los equipos se entregan configurados para tu embarcación.</p>
      </div>
    </section>
    <section class="section">
      <div class="container grid-2">
        @for (p of products; track p.slug) {
          <app-product-card [product]="p" />
        }
      </div>
    </section>
  `,
})
export class Products {
  protected readonly products = PRODUCTS;

  constructor() {
    inject(SeoService).set({
      title: 'Productos: software y hardware náutico Open Marine',
      description:
        'Navegador, cartografía offline, ordenador de a bordo y piloto automático Open Marine. ' +
        'Electrónica náutica abierta, instalada y con soporte.',
      path: '/productos',
      jsonLd: [
        breadcrumb([{ name: 'Productos', path: '/productos' }]),
        {
          '@type': 'ItemList',
          itemListElement: PRODUCTS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(`/productos/${p.slug}`),
            name: p.name,
          })),
        },
      ],
    });
  }
}
