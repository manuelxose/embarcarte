import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminProduct, formatPrice } from '../core/models';
import { ProductImage } from '../shop/product-image';

@Component({
  selector: 'app-admin-products',
  imports: [RouterLink, ProductImage],
  template: `
    <div class="dash-head">
      <h1 class="dash-title">Productos</h1>
      <a class="button button-dark" routerLink="/admin/productos/nuevo">Nuevo producto <span>+</span></a>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th colspan="2">Producto</th><th>Estado</th><th class="num">Stock</th><th class="num">Precio</th></tr></thead>
        <tbody>
          @for (p of products(); track p.id) {
            <tr>
              <td style="width: 72px"><div class="thumb"><app-product-image [src]="p.image" [alt]="p.name" /></div></td>
              <td><a class="text-link" [routerLink]="['/admin/productos', p.id]">{{ p.name }}</a><br /><span class="small muted">/tienda/{{ p.slug }}</span></td>
              <td><span [class]="p.active ? 'badge ok' : 'badge off'">{{ p.active ? 'Publicado' : 'Borrador' }}</span></td>
              <td class="num">{{ p.stock }}</td>
              <td class="num">{{ price(p.price_cents) }}</td>
            </tr>
          } @empty {
            <tr><td colspan="5" class="empty">No hay productos.</td></tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class AdminProducts {
  protected readonly products = signal<AdminProduct[]>([]);
  protected readonly price = formatPrice;

  constructor() {
    inject(HttpClient)
      .get<AdminProduct[]>('/api/admin/products')
      .subscribe((p) => this.products.set(p));
  }
}
