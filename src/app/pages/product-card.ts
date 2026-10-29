import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../core/catalog';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  template: `
    <article class="card product-card">
      <span class="badge" [class.badge-hw]="product().kind === 'Hardware'">{{ product().kind }}</span>
      <h3><a [routerLink]="['/productos', product().slug]" class="stretched">{{ product().name }}</a></h3>
      <p>{{ product().tagline }}</p>
      <span class="link-arrow" aria-hidden="true">Ver detalles →</span>
    </article>
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();
}
