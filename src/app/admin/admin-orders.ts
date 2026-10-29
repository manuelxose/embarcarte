import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBadge } from '../account/status-badge';
import { ORDER_STATUSES, OrderStatus, OrderSummary, formatDate, formatPrice } from '../core/models';

@Component({
  selector: 'app-admin-orders',
  imports: [RouterLink, StatusBadge],
  template: `
    <div class="dash-head">
      <h1 class="dash-title">Pedidos</h1>
      <div class="tabs" style="margin: 0">
        <button type="button" [class.on]="filter() === ''" (click)="filter.set('')">Todos</button>
        @for (s of statuses; track s) {
          <button type="button" [class.on]="filter() === s" (click)="filter.set(s)">{{ s }}</button>
        }
      </div>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Pedido</th><th>Cliente</th><th>Fecha</th><th>Pago</th><th>Estado</th><th class="num">Total</th></tr></thead>
        <tbody>
          @for (o of visible(); track o.id) {
            <tr>
              <td><a class="text-link" [routerLink]="['/admin/pedidos', o.id]">#{{ o.id }}</a></td>
              <td>{{ o.customer }}<br /><span class="small muted">{{ o.email }}</span></td>
              <td>{{ date(o.created_at) }}</td>
              <td>{{ o.payment_method }}</td>
              <td><app-status-badge [status]="o.status" /></td>
              <td class="num">{{ price(o.total_cents) }}</td>
            </tr>
          } @empty {
            <tr><td colspan="6" class="empty">No hay pedidos.</td></tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class AdminOrders {
  protected readonly statuses = ORDER_STATUSES;
  protected readonly filter = signal<OrderStatus | ''>('');
  protected readonly orders = signal<OrderSummary[]>([]);
  protected readonly visible = computed(() =>
    this.filter() ? this.orders().filter((o) => o.status === this.filter()) : this.orders(),
  );
  protected readonly price = formatPrice;
  protected readonly date = formatDate;

  constructor() {
    inject(HttpClient)
      .get<OrderSummary[]>('/api/admin/orders')
      .subscribe((o) => this.orders.set(o));
  }
}
