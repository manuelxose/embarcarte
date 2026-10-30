import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { formatDate, formatPrice } from '../../core/models';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  orders: number;
  spent_cents: number;
}

@Component({
  selector: 'app-admin-customers',
  template: `
    <div class="dash-head">
      <h1 class="dash-title">Clientes</h1>
      <input class="search" type="search" placeholder="Buscar por nombre o email" aria-label="Buscar"
             (input)="query.set($any($event.target).value)"
             style="border: 1px solid #dcecf6; border-radius: 999px; padding: 11px 16px; min-width: 260px" />
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Cliente</th><th>Teléfono</th><th>Alta</th><th class="num">Pedidos</th><th class="num">Gastado</th></tr></thead>
        <tbody>
          @for (c of visible(); track c.id) {
            <tr>
              <td>
                <strong>{{ c.name }}</strong>
                @if (c.role === 'admin') { <span class="badge">admin</span> }
                <br /><a class="small text-link" [href]="'mailto:' + c.email">{{ c.email }}</a>
              </td>
              <td>{{ c.phone || '—' }}</td>
              <td>{{ date(c.created_at) }}</td>
              <td class="num">{{ c.orders }}</td>
              <td class="num">{{ price(c.spent_cents) }}</td>
            </tr>
          } @empty {
            <tr><td colspan="5" class="empty">Sin resultados.</td></tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class AdminCustomers {
  protected readonly customers = signal<Customer[]>([]);
  protected readonly query = signal('');
  protected readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return q ? this.customers().filter((c) => `${c.name} ${c.email}`.toLowerCase().includes(q)) : this.customers();
  });
  protected readonly price = formatPrice;
  protected readonly date = formatDate;

  constructor() {
    inject(HttpClient)
      .get<Customer[]>('/api/admin/customers')
      .subscribe((c) => this.customers.set(c));
  }
}
