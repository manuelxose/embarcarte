import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PRODUCTS, Product, findProduct } from '../core/catalog';
import { SeoService, breadcrumb } from '../core/seo.service';
import { SITE, absoluteUrl } from '../core/site.config';

const summarize = (text: string, max = 158): string =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '') + '…';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="Migas de pan">
          <a routerLink="/">Inicio</a> / <a routerLink="/tecnologia">Tecnología</a> / <span>{{ product.name }}</span>
        </nav>
        <p class="eyebrow">{{ product.kind }}</p>
        <h1 class="display h-xl">{{ product.name }}</h1>
        <p class="lead">{{ product.tagline }}</p>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap detail-grid">
        <div class="prose">
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
        <aside class="panel">
          <h2 class="footer-title">Ficha técnica</h2>
          <dl class="specs">
            @for (s of product.specs; track s.label) {
              <div><dt>{{ s.label }}</dt><dd>{{ s.value }}</dd></div>
            }
          </dl>
          <a class="button button-dark button-block" routerLink="/tienda">Ver en la tienda <span aria-hidden="true">↗</span></a>
          <p class="form-hint">
            ¿Necesitas instalación o una configuración especial?
            <a class="text-link" routerLink="/contacto" [queryParams]="{ tema: 'tecnologia' }">Pide presupuesto</a>
          </p>
        </aside>
      </div>
    </section>

    <section class="bg-soft section-tight">
      <div class="wrap">
        <p class="eyebrow">Otros módulos</p>
        <div class="service-grid">
          @for (p of related; track p.slug) {
            <article class="service-card">
              <div class="card-content">
                <span class="card-number">{{ p.kind }}</span>
                <h3>{{ p.name }}</h3>
                <p>{{ p.tagline }}</p>
                <a class="arrow-link stretched" [routerLink]="['/tecnologia', p.slug]">Ver detalles <span>↗</span></a>
              </div>
            </article>
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
    // El guard canMatch de la ruta garantiza que el slug existe.
    const slug = inject(ActivatedRoute).snapshot.paramMap.get('slug')!;
    this.product = findProduct(slug)!;
    this.related = PRODUCTS.filter((p) => p.slug !== slug);

    const path = `/tecnologia/${this.product.slug}`;
    inject(SeoService).set({
      title: `${this.product.name}: ${this.product.kind === 'Hardware' ? 'hardware náutico' : 'software de navegación'}`,
      description: summarize(this.product.description),
      path,
      jsonLd: [
        breadcrumb([
          { name: 'Tecnología', path: '/tecnologia' },
          { name: this.product.name, path },
        ]),
        {
          '@type': this.product.kind === 'Software' ? 'SoftwareApplication' : 'Product',
          name: this.product.name,
          description: this.product.description,
          url: absoluteUrl(path),
          image: `${SITE.url}/og-image.png`,
          ...(this.product.kind === 'Software'
            ? { applicationCategory: 'NavigationApplication', operatingSystem: 'Web' }
            : { brand: { '@type': 'Brand', name: 'Open Marine' } }),
        },
      ],
    });
  }
}
