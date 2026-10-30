import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { OrderSummary, User, formatDate, formatPrice } from '../../core/models';
import { SeoService } from '../../core/seo.service';
import { StatusBadge } from '../../shared/ui/status-badge';
import { paymentLabel } from './payment-label';

interface Feedback {
  readonly text: string;
  readonly ok: boolean;
}

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, RouterLink, StatusBadge],
  template: `
    <div class="wrap dash">
      <nav class="dash-nav" [attr.aria-label]="i18n.t('account.nav')">
        <button type="button" [class.active]="tab() === 'orders'" (click)="tab.set('orders')">{{ i18n.t('account.orders') }}</button>
        <button type="button" [class.active]="tab() === 'profile'" (click)="tab.set('profile')">{{ i18n.t('account.profile') }}</button>
        @if (auth.isAdmin()) {
          <a routerLink="/admin">{{ i18n.t('account.admin') }}</a>
        }
        <button type="button" (click)="logout()">{{ i18n.t('account.signOut') }}</button>
      </nav>

      <div>
        <h1 class="dash-title">{{ i18n.t('account.greeting', { name: auth.user()?.name ?? '' }) }}</h1>
        @if (tab() === 'orders') {
          @if (orders() === null) {
            <p class="muted">{{ i18n.t('account.loadingOrders') }}</p>
          } @else if (!orders()!.length) {
            <div class="panel empty">
              <p>{{ i18n.t('account.noOrders') }}</p>
              <a class="button button-dark" [routerLink]="locale.url('shop')">{{ i18n.t('cart.goShop') }} <span aria-hidden="true">↗</span></a>
            </div>
          } @else {
            <div class="table-wrap">
              <table class="data">
                <thead><tr><th>{{ i18n.t('account.order') }}</th><th>{{ i18n.t('account.date') }}</th><th>{{ i18n.t('account.status') }}</th><th>{{ i18n.t('account.payment') }}</th><th class="num">{{ i18n.t('account.total') }}</th></tr></thead>
                <tbody>
                  @for (o of orders(); track o.id) {
                    <tr class="clickable" (click)="open(o.id)">
                      <td><a [routerLink]="orderPath(o.id)"><strong>#{{ o.id }}</strong></a></td>
                      <td>{{ date(o.created_at) }}</td>
                      <td><app-status-badge [status]="o.status" /></td>
                      <td>{{ paymentOf(o.payment_method) }}</td>
                      <td class="num">{{ price(o.total_cents) }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        } @else {
          <div class="stack">
            <form class="panel form" [formGroup]="profile" (ngSubmit)="saveProfile()">
              <h2 class="footer-title">{{ i18n.t('account.contactHeading') }}</h2>
              <label for="name">{{ i18n.t('account.name') }}</label>
              <input id="name" formControlName="name" autocomplete="name" />
              <label for="email">{{ i18n.t('account.email') }}</label>
              <input id="email" [value]="auth.user()?.email" disabled />
              <label for="phone">{{ i18n.t('account.phone') }}</label>
              <input id="phone" type="tel" formControlName="phone" autocomplete="tel" />
              <label for="address">{{ i18n.t('account.address') }}</label>
              <textarea id="address" rows="3" formControlName="address" autocomplete="street-address"></textarea>
              @if (profileMsg(); as feedback) {
                <p [class]="feedback.ok ? 'success' : 'error'" role="status">{{ feedback.text }}</p>
              }
              <button class="button button-dark" type="submit">{{ i18n.t('account.save') }} <span aria-hidden="true">↗</span></button>
            </form>

            <form class="panel form" [formGroup]="password" (ngSubmit)="savePassword()">
              <h2 class="footer-title">{{ i18n.t('account.changePassword') }}</h2>
              <label for="current">{{ i18n.t('account.currentPassword') }}</label>
              <input id="current" type="password" formControlName="current" autocomplete="current-password" />
              <label for="next">{{ i18n.t('account.newPassword') }}</label>
              <input id="next" type="password" formControlName="next" autocomplete="new-password" />
              @if (passwordMsg(); as feedback) {
                <p [class]="feedback.ok ? 'success' : 'error'" role="status">{{ feedback.text }}</p>
              }
              <button class="button button-outline" type="submit">{{ i18n.t('account.changePassword') }}</button>
            </form>
          </div>
        }
      </div>
    </div>
  `,
})
export class Account {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder).nonNullable;
  protected readonly auth = inject(AuthService);
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly tab = signal<'orders' | 'profile'>('orders');
  protected readonly orders = signal<OrderSummary[] | null>(null);
  protected readonly profileMsg = signal<Feedback | null>(null);
  protected readonly passwordMsg = signal<Feedback | null>(null);

  protected readonly profile = this.fb.group({ name: ['', Validators.required], phone: [''], address: [''] });
  protected readonly password = this.fb.group({
    current: ['', Validators.required],
    next: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected price = (cents: number) => formatPrice(cents, this.locale.locale());
  protected date = (sqlDate: string) => formatDate(sqlDate, this.locale.locale());
  protected paymentOf = (method: OrderSummary['payment_method']) => paymentLabel(method, this.locale.locale());
  protected orderPath = (id: number) => this.locale.url('orderDetail', { id: String(id) });

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      seo.set({
        title: this.i18n.t('account.seoTitle'),
        description: this.i18n.t('account.seoDescription'),
        path: this.locale.url('account'),
        language: this.locale.locale(),
        noindex: true,
      });
    });

    const user = this.auth.user();
    if (user) this.profile.patchValue(user);
    this.http.get<OrderSummary[]>('/api/orders').subscribe((o) => this.orders.set(o));
  }

  protected open(id: number): void {
    void this.router.navigateByUrl(this.orderPath(id));
  }

  protected async saveProfile(): Promise<void> {
    if (this.profile.invalid) {
      this.profileMsg.set({ text: this.i18n.t('account.nameRequired'), ok: false });
      return;
    }
    try {
      this.auth.setUser(await firstValueFrom(this.http.put<User>('/api/account', this.profile.getRawValue())));
      this.profileMsg.set({ text: this.i18n.t('account.saved'), ok: true });
    } catch {
      this.profileMsg.set({ text: this.i18n.t('account.saveError'), ok: false });
    }
  }

  protected async savePassword(): Promise<void> {
    if (this.password.invalid) {
      this.passwordMsg.set({ text: this.i18n.t('account.passwordInvalid'), ok: false });
      return;
    }
    try {
      await firstValueFrom(this.http.put('/api/account/password', this.password.getRawValue()));
      this.password.reset();
      this.passwordMsg.set({ text: this.i18n.t('account.passwordUpdated'), ok: true });
    } catch {
      this.passwordMsg.set({ text: this.i18n.t('account.passwordError'), ok: false });
    }
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl(this.locale.url('home'));
  }
}
