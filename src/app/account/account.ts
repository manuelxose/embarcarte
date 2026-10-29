import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { OrderSummary, User, formatDate, formatPrice } from '../core/models';
import { SeoService } from '../core/seo.service';
import { StatusBadge } from './status-badge';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, RouterLink, StatusBadge],
  template: `
    <div class="wrap dash">
      <nav class="dash-nav" aria-label="Área de cliente">
        <button type="button" [class.active]="tab() === 'pedidos'" (click)="tab.set('pedidos')">Mis pedidos</button>
        <button type="button" [class.active]="tab() === 'perfil'" (click)="tab.set('perfil')">Mis datos</button>
        @if (auth.isAdmin()) {
          <a routerLink="/admin">Administración</a>
        }
        <button type="button" (click)="logout()">Cerrar sesión</button>
      </nav>

      <div>
        <h1 class="dash-title">Hola, {{ auth.user()?.name }}</h1>
        @if (tab() === 'pedidos') {
          @if (orders() === null) {
            <p class="muted">Cargando pedidos…</p>
          } @else if (!orders()!.length) {
            <div class="panel empty">
              <p>Todavía no has hecho ningún pedido.</p>
              <a class="button button-dark" routerLink="/tienda">Ir a la tienda <span>↗</span></a>
            </div>
          } @else {
            <div class="table-wrap">
              <table class="data">
                <thead><tr><th>Pedido</th><th>Fecha</th><th>Estado</th><th>Pago</th><th class="num">Total</th></tr></thead>
                <tbody>
                  @for (o of orders(); track o.id) {
                    <tr class="clickable" (click)="open(o.id)">
                      <td><a [routerLink]="['/cuenta/pedidos', o.id]"><strong>#{{ o.id }}</strong></a></td>
                      <td>{{ date(o.created_at) }}</td>
                      <td><app-status-badge [status]="o.status" /></td>
                      <td>{{ o.payment_method }}</td>
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
              <h2 class="footer-title">Datos de contacto y envío</h2>
              <label for="name">Nombre</label>
              <input id="name" formControlName="name" autocomplete="name" />
              <label for="email">Email</label>
              <input id="email" [value]="auth.user()?.email" disabled />
              <label for="phone">Teléfono</label>
              <input id="phone" type="tel" formControlName="phone" autocomplete="tel" />
              <label for="address">Dirección de envío</label>
              <textarea id="address" rows="3" formControlName="address" autocomplete="street-address"></textarea>
              @if (profileMsg()) {
                <p [class]="profileMsg().startsWith('Guardado') ? 'success' : 'error'" role="status">{{ profileMsg() }}</p>
              }
              <button class="button button-dark" type="submit">Guardar <span>↗</span></button>
            </form>

            <form class="panel form" [formGroup]="password" (ngSubmit)="savePassword()">
              <h2 class="footer-title">Cambiar contraseña</h2>
              <label for="current">Contraseña actual</label>
              <input id="current" type="password" formControlName="current" autocomplete="current-password" />
              <label for="next">Nueva contraseña (mínimo 8 caracteres)</label>
              <input id="next" type="password" formControlName="next" autocomplete="new-password" />
              @if (passwordMsg()) {
                <p [class]="passwordMsg().startsWith('Contraseña actualizada') ? 'success' : 'error'" role="status">{{ passwordMsg() }}</p>
              }
              <button class="button button-outline" type="submit">Cambiar contraseña</button>
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
  protected readonly tab = signal<'pedidos' | 'perfil'>('pedidos');
  protected readonly orders = signal<OrderSummary[] | null>(null);
  protected readonly profileMsg = signal('');
  protected readonly passwordMsg = signal('');
  protected readonly price = formatPrice;
  protected readonly date = formatDate;

  protected readonly profile = this.fb.group({ name: ['', Validators.required], phone: [''], address: [''] });
  protected readonly password = this.fb.group({
    current: ['', Validators.required],
    next: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor() {
    inject(SeoService).set({ title: 'Mi cuenta', description: 'Área de cliente.', path: '/cuenta', noindex: true });
    const user = this.auth.user();
    if (user) this.profile.patchValue(user);
    this.http.get<OrderSummary[]>('/api/orders').subscribe((o) => this.orders.set(o));
  }

  protected open(id: number): void {
    void this.router.navigate(['/cuenta/pedidos', id]);
  }

  protected async saveProfile(): Promise<void> {
    if (this.profile.invalid) {
      this.profileMsg.set('El nombre es obligatorio.');
      return;
    }
    try {
      this.auth.setUser(await firstValueFrom(this.http.put<User>('/api/account', this.profile.getRawValue())));
      this.profileMsg.set('Guardado.');
    } catch {
      this.profileMsg.set('No se han podido guardar los cambios.');
    }
  }

  protected async savePassword(): Promise<void> {
    if (this.password.invalid) {
      this.passwordMsg.set('Indica tu contraseña actual y una nueva de al menos 8 caracteres.');
      return;
    }
    try {
      await firstValueFrom(this.http.put('/api/account/password', this.password.getRawValue()));
      this.password.reset();
      this.passwordMsg.set('Contraseña actualizada.');
    } catch {
      this.passwordMsg.set('La contraseña actual no es correcta.');
    }
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/');
  }
}
