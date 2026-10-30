import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SAMPLE_PRODUCTS } from '../core/sample-products';
import { SeoService } from '../core/seo.service';
import { ProductImage } from './product-image';

@Component({ selector: 'app-sample-detail', imports: [RouterLink, ProductImage], template: `
  <section class="section-pad"><div class="wrap"><nav class="crumbs"><a [routerLink]="shop">{{ english ? 'Shop' : 'Tienda' }}</a> / {{ name }}</nav><div class="detail-grid"><div class="product-photo"><app-product-image [src]="product.image" [alt]="name" /></div><div><p class="eyebrow">{{ english ? product.categoryEn : product.category }} · {{ english ? 'Sample' : 'Muestra' }}</p><h1 class="display h-md">{{ name }}</h1><p class="lead muted">{{ english ? product.summaryEn : product.summary }}</p><p>{{ english ? 'Example product: specifications, price and stock have not yet been confirmed. This item cannot be purchased.' : 'Producto de muestra: las características, el precio y el stock aún no están confirmados. Este artículo no se puede comprar.' }}</p><a class="button button-outline" [routerLink]="english ? '/en/contact' : '/contacto'" [queryParams]="{ tema: 'tienda', producto: name }">{{ english ? 'Ask about availability' : 'Consultar disponibilidad' }} →</a></div></div></div></section>
` })
export class SampleDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly english = this.route.snapshot.data['language'] === 'en';
  protected readonly product = SAMPLE_PRODUCTS.find((p) => p.slug === this.route.snapshot.paramMap.get('slug'))!;
  protected readonly name = this.english ? this.product.nameEn : this.product.name;
  protected readonly shop = this.english ? '/en/shop' : '/tienda';
  constructor() {
    const es = `/tienda/muestra/${this.product.slug}`;
    const en = `/en/shop/sample/${this.product.slug}`;
    inject(SeoService).set({ title: this.name, description: this.english ? this.product.summaryEn : this.product.summary, path: this.english ? en : es, language: this.english ? 'en' : 'es', noindex: true, alternates: [{ language: 'es', path: es }, { language: 'en', path: en }] });
  }
}
