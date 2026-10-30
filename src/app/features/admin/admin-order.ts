import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StatusBadge } from '../../shared/ui/status-badge';
import { ORDER_STATUSES, Order, OrderStatus, formatDate, formatPrice } from '../../core/models';

type AdminOrderDetail = Order & { customer: { id: number; name: string; email: string; phone: string } };

@Component({
  selector: 'app-admin-order',
  imports: [RouterLink, FormsModule, StatusBadge],
  template: `
    <nav class="crumbs"><a routerLink="/admin/pedidos">Pedidos</a> / #{{ id() }}</nav>
    @if (order(); as o) {
      <div class="dash-head">
        <h1 class="dash-title">Pedido #{{ o.id }}</h1>
        <app-status-badge [status]="o.status" />
      </div>
      <div class="stack">
        <div class="panel form">
          <label for="status">Cambiar estado</label>
          <div class="hero-actions" style="gap: 12px">
            <select id="status" [(ngModel)]="status" style="margin: 0; max-width: 240px">
              @for (s of statuses; track s) {
                <option [value]="s">{{ s }}</option>
              }
            </select>
            <button class="button button-dark" type="button" [disabled]="status === o.status || saving()" (click)="save()">Guardar</button>
          </div>
          <p class="form-hint">Al cancelar un pedido se repone el stock de sus productos.</p>
          @if (error()) { <p class="error" role="alert">{{ error() }}</p> }
        </div>
        <div class="table-wrap">
          <table class="data">
            <thead><tr><th>Producto</th><th class="num">Precio</th><th class="num">Uds.</th><th class="num">Importe</th></tr></thead>
            <tbody>
              @for (i of o.items; track $index) {
                <tr><td>{{ i.name }}</td><td class="num">{{ price(i.unit_cents) }}</td><td class="num">{{ i.qty }}</td><td class="num">{{ price(i.unit_cents * i.qty) }}</td></tr>
              }
              <tr><td colspan="3"><strong>Total</strong></td><td class="num"><strong>{{ price(o.total_cents) }}</strong></td></tr>
            </tbody>
          </table>
        </div>
        <div class="panel">
          <dl class="kv">
            <dt>Cliente</dt><dd>{{ o.customer.name }} · <a class="text-link" [href]="'mailto:' + o.customer.email">{{ o.customer.email }}</a></dd>
            <dt>Fecha</dt><dd>{{ date(o.created_at) }}</dd>
            <dt>Pago</dt><dd>{{ o.payment_method }}</dd>
            <dt>Envío</dt><dd>{{ o.shipping_name }}<br />{{ o.shipping_address }}<br />{{ o.shipping_phone }}</dd>
            @if (o.notes) {
              <dt>Notas</dt><dd>{{ o.notes }}</dd>
            }
          </dl>
        </div>
      </div>
    } @else {
      <p class="muted">Cargando…</p>
    }
  `,
})
export class AdminOrder {
  readonly id = input.required<string>();
  private readonly http = inject(HttpClient);
  protected readonly statuses = ORDER_STATUSES;
  protected readonly order = signal<AdminOrderDetail | null>(null);
  protected readonly saving = signal(false);
  protected readonly error = signal('');
  protected status: OrderStatus = 'pendiente';
  protected readonly price = formatPrice;
  protected readonly date = formatDate;

  ngOnInit(): void {
    this.http.get<AdminOrderDetail>(`/api/admin/orders/${this.id()}`).subscribe((o) => {
      this.order.set(o);
      this.status = o.status;
    });
  }

  protected async save(): Promise<void> {
    this.saving.set(true);
    this.error.set('');
    try {
      const updated = await firstValueFrom(this.http.put<Order>(`/api/admin/orders/${this.id()}`, { status: this.status }));
      this.order.update((o) => (o ? { ...o, ...updated, customer: o.customer } : o));
    } catch (err) {
      this.error.set(err instanceof HttpErrorResponse && err.status === 409 ? 'No hay stock suficiente para reactivar el pedido.' : 'No se ha podido actualizar el pedido.');
    } finally {
      this.saving.set(false);
    }
  }
}
