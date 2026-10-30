import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopProduct, formatPrice } from '../core/models';
import { searchSamples } from '../core/sample-products';
import { SeoService } from '../core/seo.service';
import { ProductImage } from './product-image';

@Component({ selector: 'app-shop-en', imports: [RouterLink, ProductImage], template: `
  <section class="page-hero"><div class="wrap"><p class="eyebrow">Shop</p><h1 class="display h-xl">Marine electronics<br /><em>for your boat.</em></h1><p class="lead">Explore marine instruments, accessories and Open Marine equipment.</p><a routerLink="/tienda" hreflang="es">Ver en español</a></div></section>
  <section class="section-pad"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Sample catalogue</p><h2 class="display h-lg">Instruments and accessories</h2></div><p class="heading-note">These examples are not for sale. Ask us about availability and compatibility.</p></div><label for="sample-search">Search products</label><input id="sample-search" type="search" placeholder="For example, wind or GPS" (input)="search.set($any($event.target).value)" /><div class="service-grid">@for (p of filtered(); track p.slug) { <article class="service-card"><div class="card-image"><app-product-image [src]="p.image" [alt]="p.nameEn" /></div><div class="card-content"><span class="card-number">{{ p.categoryEn }} · Sample</span><h3>{{ p.nameEn }}</h3><p>{{ p.summaryEn }}</p><a class="arrow-link stretched" [routerLink]="['/en/shop/sample', p.slug]">View details →</a></div></article> } @empty { <p class="empty">No sample products match your search.</p> }</div></div></section>
  <section class="section-pad bg-soft"><div class="wrap"><h2 class="display h-md">Available products</h2>@if (failed()) { <p>We could not load the catalogue. Please try again later.</p> } @else if (products() === null) { <p>Loading products…</p> } @else if (!products()!.length) { <p>There are no products available to purchase yet.</p> } @else { <div class="service-grid">@for (p of products(); track p.id) { <article class="service-card"><div class="card-image"><app-product-image [src]="p.image" [alt]="p.name_en || p.name" /></div><div class="card-content"><span class="card-number">{{ p.category_en || p.category }}</span><h3>{{ p.name_en || p.name }}</h3><p [attr.lang]="p.summary_en ? 'en' : 'es'">{{ p.summary_en || p.summary }}</p><div class="arrow-link"><span class="price">{{ price(p.price_cents) }}</span><a [routerLink]="['/en/shop', p.slug]">View product →</a></div></div></article> }</div> }</div></section>
` })
export class ShopEn {
  protected readonly search = signal('');
  protected readonly products = signal<ShopProduct[] | null>(null);
  protected readonly failed = signal(false);
  protected readonly price = formatPrice;
  protected filtered() { return searchSamples(this.search(), true); }
  constructor() {
    inject(SeoService).set({ title: 'Marine electronics shop', description: 'Explore marine instruments, accessories and Open Marine equipment.', path: '/en/shop', language: 'en', alternates: [{ language: 'es', path: '/tienda' }, { language: 'en', path: '/en/shop' }] });
    inject(HttpClient).get<ShopProduct[]>('/api/shop/products').subscribe({ next: (p) => this.products.set(p), error: () => this.failed.set(true) });
  }
}
