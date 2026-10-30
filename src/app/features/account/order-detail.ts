import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { Order, formatDate, formatPrice } from '../../core/models';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { StatusBadge } from '../../shared/ui/status-badge';
import { paymentLabel } from './payment-label';

@Component({
  selector: 'app-order-detail',
  imports: [RouterLink, StatusBadge],
  template: `
    <section class="wrap-narrow section-tight">
      <nav class="crumbs" [attr.aria-label]="i18n.t('a11y.breadcrumb')">
        <a [routerLink]="locale.url('account')">{{ i18n.t('account.nav') }}</a> /
        <span>{{ i18n.t('order.title', { id: id() }) }}</span>
      </nav>
      @if (nuevo() || pago() === 'ok') {
        <div class="panel notice" style="margin-bottom: 24px" role="status">
          <strong>{{ i18n.t('order.thanksTitle') }}</strong>
          <p class="muted" style="margin: 6px 0 0">
            {{ i18n.t(pago() === 'ok' ? 'order.paymentChecking' : 'order.thanksTransfer') }}
          </p>
        </div>
      }
      @if (pago() === 'error') {
        <div class="panel notice" style="margin-bottom: 24px" role="status">{{ i18n.t('order.paymentFailed', { email: site.email }) }}</div>
      }
      @if (pago() === 'cancelado') {
        <div class="panel notice" style="margin-bottom: 24px" role="status">
          {{ i18n.t('order.paymentCancelled', { email: site.email }) }}
        </div>
      }
      @if (order(); as o) {
        <div class="dash-head">
          <h1 class="dash-title">{{ i18n.t('order.title', { id: o.id }) }}</h1>
          <app-status-badge [status]="o.status" />
        </div>
        <div class="stack">
          <div class="table-wrap">
            <table class="data">
              <thead><tr><th>{{ i18n.t('order.product') }}</th><th class="num">{{ i18n.t('order.price') }}</th><th class="num">{{ i18n.t('order.qty') }}</th><th class="num">{{ i18n.t('order.amount') }}</th></tr></thead>
              <tbody>
                @for (i of o.items; track $index) {
                  <tr><td>{{ i.name }}</td><td class="num">{{ price(i.unit_cents) }}</td><td class="num">{{ i.qty }}</td><td class="num">{{ price(i.unit_cents * i.qty) }}</td></tr>
                }
                <tr><td colspan="3"><strong>{{ i18n.t('order.total') }}</strong></td><td class="num"><strong>{{ price(o.total_cents) }}</strong></td></tr>
              </tbody>
            </table>
          </div>
          <div class="panel">
            <dl class="kv">
              <dt>{{ i18n.t('order.date') }}</dt><dd>{{ date(o.created_at) }}</dd>
              <dt>{{ i18n.t('order.payment') }}</dt><dd>{{ paymentOf(o.payment_method) }}</dd>
              <dt>{{ i18n.t('order.shipTo') }}</dt><dd>{{ o.shipping_name }}<br />{{ o.shipping_address }}<br />{{ o.shipping_phone }}</dd>
              @if (o.notes) {
                <dt>{{ i18n.t('order.notes') }}</dt><dd>{{ o.notes }}</dd>
              }
            </dl>
          </div>
        </div>
      } @else if (missing()) {
        <p class="empty">{{ i18n.t('order.missing') }}</p>
      } @else {
        <p class="muted">{{ i18n.t('common.loading') }}</p>
      }
    </section>
  `,
})
export class OrderDetail {
  readonly id = input.required<string>();
  readonly nuevo = input<string>();
  readonly pago = input<string>();

  private readonly http = inject(HttpClient);
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly site = SITE;
  protected readonly order = signal<Order | null>(null);
  protected readonly missing = signal(false);

  protected price = (cents: number) => formatPrice(cents, this.locale.locale());
  protected date = (sqlDate: string) => formatDate(sqlDate, this.locale.locale());
  protected paymentOf = (method: Order['payment_method']) => paymentLabel(method, this.locale.locale());

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      seo.set({
        title: this.i18n.t('order.seoTitle'),
        description: this.i18n.t('order.seoDescription'),
        path: this.locale.url('orderDetail', { id: this.id() }),
        language: this.locale.locale(),
        noindex: true,
      });
    });

  }

  ngOnInit(): void {
    this.http.get<Order>(`/api/orders/${encodeURIComponent(this.id())}`).subscribe({
      next: (order) => this.order.set(order),
      error: () => this.missing.set(true),
    });
  }
}
