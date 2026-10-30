import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { CartService } from '../core/cart.service';
import { formatPrice } from '../core/models';
import { SeoService } from '../core/seo.service';
import { ProductImage } from './product-image';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, ReactiveFormsModule, ProductImage],
  template: `
    <section class="section-pad">
      <div class="wrap">
        <p class="eyebrow">Tu pedido</p>
        <h1 class="display h-md" style="margin-bottom: 32px">Carrito</h1>

        @if (!cart.items().length) {
          <div class="panel empty">
            <p>Tu carrito está vacío.</p>
            <a class="button button-dark" routerLink="/tienda">Ir a la tienda <span>↗</span></a>
          </div>
        } @else {
          <div class="detail-grid">
            <div class="table-wrap">
              <table class="data">
                <thead><tr><th colspan="2">Producto</th><th>Cantidad</th><th class="num">Importe</th><th></th></tr></thead>
                <tbody>
                  @for (item of cart.items(); track item.slug) {
                    <tr>
                      <td style="width: 72px"><div class="thumb"><app-product-image [src]="item.image" [alt]="item.name" /></div></td>
                      <td><a [routerLink]="['/tienda', item.slug]"><strong>{{ item.name }}</strong></a><br /><span class="small muted">{{ price(item.price_cents) }}</span></td>
                      <td>
                        <div class="qty">
                          <button type="button" aria-label="Menos" (click)="cart.setQty(item.slug, item.qty - 1)">−</button>
                          <span>{{ item.qty }}</span>
                          <button type="button" aria-label="Más" (click)="cart.setQty(item.slug, item.qty + 1)">+</button>
                        </div>
                      </td>
                      <td class="num">{{ price(item.price_cents * item.qty) }}</td>
                      <td><button class="button button-ghost button-small" type="button" (click)="cart.remove(item.slug)" aria-label="Quitar">✕</button></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <aside class="panel">
              <dl class="specs">
                <div><dt>Total (IVA incluido)</dt><dd class="price">{{ price(cart.totalCents()) }}</dd></div>
              </dl>
              <p class="small muted">Los costes de envío o instalación, si corresponden, se confirmarán por separado.</p>
              @if (!auth.user()) {
                <p class="muted small">Para completar la compra, accede o crea tu cuenta. Así podrás seguir el pedido.</p>
                <a class="button button-dark button-block" routerLink="/acceso" [queryParams]="{ volver: '/carrito' }">Acceder para comprar <span>↗</span></a>
              } @else {
                <form class="form" [formGroup]="form" (ngSubmit)="checkout()" novalidate>
                  <label for="sname">Nombre de envío</label>
                  <input id="sname" formControlName="shippingName" autocomplete="name" />
                  <label for="sphone">Teléfono</label>
                  <input id="sphone" type="tel" formControlName="shippingPhone" autocomplete="tel" />
                  <label for="saddress">Dirección de envío</label>
                  <textarea id="saddress" rows="3" formControlName="shippingAddress" autocomplete="street-address"></textarea>
                  <label for="notes">Notas (opcional)</label>
                  <textarea id="notes" rows="2" formControlName="notes" placeholder="Embarcación, puerto, horarios…"></textarea>
                  <span class="field-label">Forma de pago</span>
                  @if (stripe()) {
                    <label class="check"><input type="radio" formControlName="payment" value="tarjeta" /> <span>Tarjeta (pago seguro con Stripe)</span></label>
                  }
                  <label class="check"><input type="radio" formControlName="payment" value="transferencia" /> <span>Transferencia bancaria</span></label>
                  <label class="check">
                    <input type="checkbox" formControlName="terms" />
                    <span>Acepto las <a routerLink="/condiciones-de-venta">condiciones de venta</a> y la <a routerLink="/privacidad">política de privacidad</a>.</span>
                  </label>
                  @if (error()) {
                    <p class="error" role="alert">{{ error() }}</p>
                  }
                  <button class="button button-dark button-block" type="submit" [disabled]="sending()">
                    {{ sending() ? 'Procesando…' : 'Confirmar pedido' }} <span>↗</span>
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
  protected readonly price = formatPrice;
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

  constructor() {
    inject(SeoService).set({ title: 'Carrito', description: 'Tu carrito en Embarcarte.', path: '/carrito', noindex: true });
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
      this.error.set('Completa los datos de envío y acepta las condiciones de venta.');
      return;
    }
    this.sending.set(true);
    this.error.set('');
    const value = this.form.getRawValue();
    try {
      const order = await firstValueFrom(
        this.http.post<{ id: number; checkoutUrl?: string; paymentError?: boolean }>('/api/orders', {
          ...value,
          items: this.cart.items().map((i) => ({ slug: i.slug, qty: i.qty, price_cents: i.price_cents })),
        }),
      );
      this.cart.clear();
      if (order.checkoutUrl) {
        window.location.href = order.checkoutUrl;
        return;
      }
      await this.router.navigate(['/cuenta/pedidos', order.id], { queryParams: order.paymentError ? { pago: 'error' } : { nuevo: 1 } });
    } catch (err) {
      const code = err instanceof HttpErrorResponse ? err.error?.error : '';
      this.error.set(
        code === 'price_changed'
          ? 'Ha cambiado el precio de algún producto. Elimínalo y vuelve a añadirlo para revisar el precio actual.'
          : code === 'out_of_stock'
          ? 'Alguno de los productos ya no tiene stock suficiente. Revisa las cantidades.'
          : code === 'invalid_item'
            ? 'Algún producto del carrito ya no está disponible. Quítalo e inténtalo de nuevo.'
            : 'No hemos podido completar el pedido. Inténtalo de nuevo.',
      );
    } finally {
      this.sending.set(false);
    }
  }
}
