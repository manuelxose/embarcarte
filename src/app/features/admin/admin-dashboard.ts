import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBadge } from '../../shared/ui/status-badge';
import { OrderSummary, formatDate, formatPrice } from '../../core/models';

interface Stats {
  revenueCents: number;
  pendingOrders: number;
  customers: number;
  unreadMessages: number;
  activeProducts: number;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, StatusBadge],
  template: `
    <h1 class="dash-title">Resumen</h1>
    @if (stats(); as s) {
      <div class="stats">
        <div class="stat"><b>{{ price(s.revenueCents) }}</b><span>Ventas cobradas</span></div>
        <a class="stat" routerLink="/admin/pedidos"><b>{{ s.pendingOrders }}</b><span>Pedidos por gestionar</span></a>
        <a class="stat" routerLink="/admin/clientes"><b>{{ s.customers }}</b><span>Clientes</span></a>
        <a class="stat" routerLink="/admin/mensajes"><b>{{ s.unreadMessages }}</b><span>Mensajes sin leer</span></a>
        <a class="stat" routerLink="/admin/productos"><b>{{ s.activeProducts }}</b><span>Productos publicados</span></a>
      </div>
    }
    <div class="dash-head"><h2 class="footer-title" style="margin: 0">Últimos pedidos</h2><a class="text-link" routerLink="/admin/pedidos">Ver todos →</a></div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Pedido</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th class="num">Total</th></tr></thead>
        <tbody>
          @for (o of orders(); track o.id) {
            <tr>
              <td><a class="text-link" [routerLink]="['/admin/pedidos', o.id]">#{{ o.id }}</a></td>
              <td>{{ o.customer }}</td>
              <td>{{ date(o.created_at) }}</td>
              <td><app-status-badge [status]="o.status" /></td>
              <td class="num">{{ price(o.total_cents) }}</td>
            </tr>
          } @empty {
            <tr><td colspan="5" class="empty">Aún no hay pedidos.</td></tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class AdminDashboard {
  protected readonly stats = signal<Stats | null>(null);
  protected readonly orders = signal<OrderSummary[]>([]);
  protected readonly price = formatPrice;
  protected readonly date = formatDate;

  constructor() {
    const http = inject(HttpClient);
    http.get<Stats>('/api/admin/stats').subscribe((s) => this.stats.set(s));
    http.get<OrderSummary[]>('/api/admin/orders').subscribe((o) => this.orders.set(o.slice(0, 8)));
  }
}
