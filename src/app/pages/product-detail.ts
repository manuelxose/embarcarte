import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PRODUCTS, Product, findProduct } from '../core/catalog';
import { SeoService, breadcrumb } from '../core/seo.service';
import { SITE, absoluteUrl } from '../core/site.config';
import { ProductCard } from './product-card';

const summarize = (text: string, max = 158): string =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '') + '…';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, ProductCard],
  template: `
    <section class="page-hero">
      <div class="container narrow">
        <nav class="crumbs" aria-label="Migas de pan">
          <a routerLink="/">Inicio</a> / <a routerLink="/productos">Productos</a> / <span>{{ product.name }}</span>
        </nav>
        <span class="badge" [class.badge-hw]="product.kind === 'Hardware'">{{ product.kind }}</span>
        <h1>{{ product.name }}</h1>
        <p class="lead">{{ product.tagline }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container detail-grid">
        <div>
          <p>{{ product.description }}</p>
          <h2>Características</h2>
          <ul class="checklist">
            @for (f of product.features; track f) {
              <li>{{ f }}</li>
            }
          </ul>
          <h2>Para quién</h2>
          <p>{{ product.audience }}</p>
        </div>
        <aside class="card">
          <h2 class="h3">Ficha técnica</h2>
          <dl class="specs">
            @for (s of product.specs; track s.label) {
              <div><dt>{{ s.label }}</dt><dd>{{ s.value }}</dd></div>
            }
          </dl>
          <a [routerLink]="['/contacto']" [queryParams]="{ producto: product.slug }" class="btn btn-block">
            Solicitar presupuesto
          </a>
          <p class="small muted">Precio según configuración e instalación. Respuesta en 48 h laborables.</p>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2>Otros productos</h2>
        <div class="grid-3">
          @for (p of related; track p.slug) {
            <app-product-card [product]="p" />
          }
        </div>
      </div>
    </section>
  `,
})
export class ProductDetail {
  protected readonly product: Product;
  protected readonly related: Product[];

  constructor() {
    // El resolver de rutas garantiza que el slug existe.
    const slug = inject(ActivatedRoute).snapshot.paramMap.get('slug')!;
    this.product = findProduct(slug)!;
    this.related = PRODUCTS.filter((p) => p.slug !== slug);

    const path = `/productos/${this.product.slug}`;
    inject(SeoService).set({
      title: `${this.product.name}: ${this.product.kind === 'Hardware' ? 'hardware náutico' : 'software de navegación'}`,
      description: summarize(this.product.description),
      path,
      type: 'product',
      jsonLd: [
        breadcrumb([
          { name: 'Productos', path: '/productos' },
          { name: this.product.name, path },
        ]),
        {
          '@type': 'Product',
          name: this.product.name,
          description: this.product.description,
          category: this.product.kind === 'Hardware' ? 'Electrónica náutica' : 'Software de navegación',
          brand: { '@type': 'Brand', name: 'Open Marine' },
          url: absoluteUrl(path),
          image: `${SITE.url}/og-image.png`,
          manufacturer: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        },
      ],
    });
  }
}
