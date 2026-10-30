import { HttpClient } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order, formatDate, formatPrice } from '../core/models';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';
import { StatusBadge } from './status-badge';

@Component({
  selector: 'app-order-detail',
  imports: [RouterLink, StatusBadge],
  template: `
    <section class="wrap-narrow section-tight">
      <nav class="crumbs"><a routerLink="/cuenta">Mi cuenta</a> / Pedido #{{ id() }}</nav>
      @if (nuevo() || pago() === 'ok') {
        <div class="panel notice" style="margin-bottom: 24px" role="status">
          <strong>¡Gracias por tu pedido!</strong>
          <p class="muted" style="margin: 6px 0 0">
            @if (pago() === 'ok') {
              Estamos verificando tu pago. Consulta el estado del pedido para ver su confirmación.
            } @else {
              El pedido está pendiente. Te facilitaremos los datos de la transferencia y el plazo de entrega.
            }
          </p>
        </div>
      }
      @if (pago() === 'error') {
        <div class="panel notice" style="margin-bottom: 24px" role="status">No hemos podido iniciar el pago. El pedido se ha guardado pendiente; escríbenos a {{ site.email }} para completarlo.</div>
      }
      @if (pago() === 'cancelado') {
        <div class="panel notice" style="margin-bottom: 24px" role="status">
          El pago no se ha completado. Tu pedido queda pendiente: escríbenos a {{ site.email }} y te ayudamos a finalizarlo.
        </div>
      }
      @if (order(); as o) {
        <div class="dash-head">
          <h1 class="dash-title">Pedido #{{ o.id }}</h1>
          <app-status-badge [status]="o.status" />
        </div>
        <div class="stack">
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
              <dt>Fecha</dt><dd>{{ date(o.created_at) }}</dd>
              <dt>Pago</dt><dd>{{ o.payment_method }}</dd>
              <dt>Envío a</dt><dd>{{ o.shipping_name }}<br />{{ o.shipping_address }}<br />{{ o.shipping_phone }}</dd>
              @if (o.notes) {
                <dt>Notas</dt><dd>{{ o.notes }}</dd>
              }
            </dl>
          </div>
        </div>
      } @else if (missing()) {
        <p class="empty">No encontramos este pedido.</p>
      } @else {
        <p class="muted">Cargando…</p>
      }
    </section>
  `,
})
export class OrderDetail {
  readonly id = input.required<string>();
  readonly nuevo = input<string>();
  readonly pago = input<string>();

  private readonly http = inject(HttpClient);
  protected readonly site = SITE;
  protected readonly order = signal<Order | null>(null);
  protected readonly missing = signal(false);
  protected readonly price = formatPrice;
  protected readonly date = formatDate;

  constructor() {
    inject(SeoService).set({ title: 'Pedido', description: 'Detalle del pedido.', path: '/cuenta', noindex: true });
  }

  ngOnInit(): void {
    this.http.get<Order>(`/api/orders/${encodeURIComponent(this.id())}`).subscribe({
      next: (o) => this.order.set(o),
      error: () => this.missing.set(true),
    });
  }
}
