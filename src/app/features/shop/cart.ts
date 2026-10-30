import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { CartService } from '../../core/cart.service';
import { CartItem, cartItemName, formatPrice } from '../../core/models';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService } from '../../core/seo.service';
import type { TranslationKey } from '../../i18n/dictionary';
import { ProductImage } from '../../shared/ui/product-image';

const CHECKOUT_ERRORS: Record<string, TranslationKey> = {
  price_changed: 'cart.error.priceChanged',
  out_of_stock: 'cart.error.outOfStock',
  invalid_item: 'cart.error.invalidItem',
};

@Component({
  selector: 'app-cart',
  imports: [RouterLink, ReactiveFormsModule, ProductImage],
  template: `
    <section class="section-pad">
      <div class="wrap">
        <p class="eyebrow">{{ i18n.t('cart.eyebrow') }}</p>
        <h1 class="display h-md" style="margin-bottom: 32px">{{ i18n.t('cart.title') }}</h1>

        @if (!cart.items().length) {
          <div class="panel empty">
            <p>{{ i18n.t('cart.empty') }}</p>
            <a class="button button-dark" [routerLink]="locale.url('shop')">{{ i18n.t('cart.goShop') }} <span aria-hidden="true">↗</span></a>
          </div>
        } @else {
          <div class="detail-grid">
            <div class="table-wrap">
              <table class="data">
                <thead><tr><th colspan="2">{{ i18n.t('cart.product') }}</th><th>{{ i18n.t('cart.quantity') }}</th><th class="num">{{ i18n.t('cart.amount') }}</th><th></th></tr></thead>
                <tbody>
                  @for (item of cart.items(); track item.slug) {
                    <tr>
                      <td style="width: 72px"><div class="thumb"><app-product-image [src]="item.image" [alt]="nameOf(item)" /></div></td>
                      <td><a [routerLink]="locale.url('shopDetail', { slug: item.slug })"><strong>{{ nameOf(item) }}</strong></a><br /><span class="small muted">{{ price(item.price_cents) }}</span></td>
                      <td>
                        <div class="qty">
                          <button type="button" [attr.aria-label]="i18n.t('cart.decrease')" (click)="cart.setQty(item.slug, item.qty - 1)">−</button>
                          <span>{{ item.qty }}</span>
                          <button type="button" [attr.aria-label]="i18n.t('cart.increase')" (click)="cart.setQty(item.slug, item.qty + 1)">+</button>
                        </div>
                      </td>
                      <td class="num">{{ price(item.price_cents * item.qty) }}</td>
                      <td><button class="button button-ghost button-small" type="button" (click)="cart.remove(item.slug)" [attr.aria-label]="i18n.t('cart.remove')">✕</button></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <aside class="panel">
              <dl class="specs">
                <div><dt>{{ i18n.t('cart.total') }}</dt><dd class="price">{{ price(cart.totalCents()) }}</dd></div>
              </dl>
              <p class="small muted">{{ i18n.t('cart.shippingNote') }}</p>
              @if (!auth.user()) {
                <p class="muted small">{{ i18n.t('cart.signInNote') }}</p>
                <a class="button button-dark button-block" [routerLink]="locale.url('login')" [queryParams]="{ volver: locale.url('cart') }">{{ i18n.t('cart.signInCta') }} <span aria-hidden="true">↗</span></a>
              } @else {
                <form class="form" [formGroup]="form" (ngSubmit)="checkout()" novalidate>
                  <label for="sname">{{ i18n.t('cart.shippingName') }}</label>
                  <input id="sname" formControlName="shippingName" autocomplete="name" />
                  <label for="sphone">{{ i18n.t('cart.phone') }}</label>
                  <input id="sphone" type="tel" formControlName="shippingPhone" autocomplete="tel" />
                  <label for="saddress">{{ i18n.t('cart.shippingAddress') }}</label>
                  <textarea id="saddress" rows="3" formControlName="shippingAddress" autocomplete="street-address"></textarea>
                  <label for="notes">{{ i18n.t('cart.notes') }}</label>
                  <textarea id="notes" rows="2" formControlName="notes" [placeholder]="i18n.t('cart.notesPlaceholder')"></textarea>
                  <span class="field-label">{{ i18n.t('cart.payment') }}</span>
                  @if (stripe()) {
                    <label class="check"><input type="radio" formControlName="payment" value="tarjeta" /> <span>{{ i18n.t('cart.card') }}</span></label>
                  }
                  <label class="check"><input type="radio" formControlName="payment" value="transferencia" /> <span>{{ i18n.t('cart.transfer') }}</span></label>
                  <label class="check">
                    <input type="checkbox" formControlName="terms" />
                    <span>{{ i18n.t('cart.termsAccept') }} <a [routerLink]="locale.url('termsOfSale')">{{ i18n.t('common.termsOfSale') }}</a> {{ i18n.t('cart.termsAnd') }} <a [routerLink]="locale.url('privacy')">{{ i18n.t('common.privacyPolicy') }}</a>.</span>
                  </label>
                  @if (error()) {
                    <p class="error" role="alert">{{ error() }}</p>
                  }
                  <button class="button button-dark button-block" type="submit" [disabled]="sending()">
                    {{ i18n.t(sending() ? 'cart.sending' : 'cart.submit') }} <span aria-hidden="true">↗</span>
                  </button>
                </form>
              }
            </aside>
          </div>
        }
      </div>
    </section>
  `,
})
export class Cart {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);
  protected readonly cart = inject(CartService);
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly stripe = signal(false);
  protected readonly sending = signal(false);
  protected readonly error = signal('');

  protected readonly form = inject(FormBuilder).nonNullable.group({
    shippingName: ['', Validators.required],
    shippingPhone: ['', Validators.required],
    shippingAddress: ['', Validators.required],
    notes: [''],
    payment: ['transferencia'],
    terms: [false, Validators.requiredTrue],
  });

  protected nameOf = (item: CartItem) => cartItemName(item, this.locale.locale());
  protected price = (cents: number) => formatPrice(cents, this.locale.locale());

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      // Private page: the path comes from the registry, and it publishes no
      // `hreflang` pair because it must never be indexed.
      seo.set({
        title: this.i18n.t('cart.seoTitle'),
        description: this.i18n.t('cart.seoDescription'),
        path: this.locale.url('cart'),
        language: this.locale.locale(),
        noindex: true,
      });
    });

    this.http.get<{ stripe: boolean }>('/api/shop/config').subscribe((c) => {
      this.stripe.set(c.stripe);
      if (c.stripe) this.form.controls.payment.setValue('tarjeta');
    });
    void this.auth.load().then((user) => {
      if (user) {
        this.form.patchValue({ shippingName: user.name, shippingPhone: user.phone, shippingAddress: user.address });
      }
    });
  }

  protected async checkout(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set(this.i18n.t('cart.invalid'));
      return;
    }
    this.sending.set(true);
    this.error.set('');
    const value = this.form.getRawValue();
    const locale = this.locale.locale();
    try {
      // The server re-reads price, stock and the localized name: the basket only
      // states which products and how many.
      const order = await firstValueFrom(
        this.http.post<{ id: number; checkoutUrl?: string; paymentError?: boolean }>('/api/orders', {
          ...value,
          language: locale,
          items: this.cart.items().map((i) => ({ slug: i.slug, qty: i.qty, price_cents: i.price_cents })),
        }),
      );
      this.cart.clear();
      if (order.checkoutUrl) {
        window.location.href = order.checkoutUrl;
        return;
      }
      await this.router.navigate([this.locale.url('orderDetail', { id: String(order.id) }, locale)], {
        queryParams: order.paymentError ? { pago: 'error' } : { nuevo: 1 },
      });
    } catch (err) {
      const code = err instanceof HttpErrorResponse ? err.error?.error : '';
      this.error.set(this.i18n.t(CHECKOUT_ERRORS[code] ?? 'error.generic'));
    } finally {
      this.sending.set(false);
    }
  }
}
