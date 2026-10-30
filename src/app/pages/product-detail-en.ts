import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CATALOG_EN } from '../core/catalog-en';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({ selector: 'app-product-detail-en', imports: [RouterLink], template: `
  <section class="page-hero"><div class="wrap"><nav class="crumbs"><a routerLink="/en">Home</a> / <a routerLink="/en/technology">Technology</a></nav><p class="eyebrow">Open Marine</p><h1 class="display h-xl">{{ product.name }}</h1><p class="lead">{{ product.description }}</p><a [routerLink]="['/tecnologia', slug]" hreflang="es">Leer en español</a></div></section>
  <section class="section-pad"><div class="wrap detail-grid"><div class="prose"><h2>Features</h2><ul class="checklist">@for (feature of product.features; track feature) { <li>{{ feature }}</li> }</ul></div><aside class="panel"><h2 class="footer-title">Discuss your installation</h2><p>Compatibility and configuration depend on your vessel and equipment.</p><a class="button button-dark" routerLink="/en/contact">Contact us →</a><p><a routerLink="/en/shop">Explore the shop</a></p></aside></div></section>
` })
export class ProductDetailEn {
  protected readonly slug = inject(ActivatedRoute).snapshot.paramMap.get('slug')!;
  protected readonly product = CATALOG_EN[this.slug];
  constructor() { const path = `/en/technology/${this.slug}`; inject(SeoService).set({ title: this.product.name, description: this.product.description, path, language: 'en', alternates: [{ language: 'es', path: `/tecnologia/${this.slug}` }, { language: 'en', path }], jsonLd: [breadcrumb([{ name: 'Technology', path: '/en/technology' }, { name: this.product.name, path }])] }); }
}
