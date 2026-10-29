import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-hero" style="min-height: calc(100svh - 76px)">
      <div class="wrap">
        <div class="panel auth-card">
          <div class="tabs" role="tablist">
            <button type="button" role="tab" [class.on]="mode() === 'login'" [attr.aria-selected]="mode() === 'login'" (click)="mode.set('login')">Acceder</button>
            <button type="button" role="tab" [class.on]="mode() === 'register'" [attr.aria-selected]="mode() === 'register'" (click)="mode.set('register')">Crear cuenta</button>
          </div>
          <form class="form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
            @if (mode() === 'register') {
              <label for="name">Nombre</label>
              <input id="name" formControlName="name" autocomplete="name" />
            }
            <label for="email">Correo electrónico</label>
            <input id="email" type="email" formControlName="email" autocomplete="email" />
            <label for="password">Contraseña</label>
            <input id="password" type="password" formControlName="password"
                   [attr.autocomplete]="mode() === 'login' ? 'current-password' : 'new-password'" />
            @if (mode() === 'register') {
              <p class="form-hint" style="margin: -10px 0 16px">Mínimo 8 caracteres.</p>
              <label class="check">
                <input type="checkbox" formControlName="consent" />
                <span>Acepto la <a routerLink="/privacidad">política de privacidad</a>.</span>
              </label>
            }
            @if (error()) {
              <p class="error" role="alert">{{ error() }}</p>
            }
            <button class="button button-dark button-block" type="submit" [disabled]="sending()">
              {{ mode() === 'login' ? 'Acceder' : 'Crear cuenta' }} <span>↗</span>
            </button>
          </form>
          <p class="form-hint">¿Has olvidado tu contraseña? Escríbenos desde el email de tu cuenta a info&#64;embarcarte.com.</p>
        </div>
      </div>
    </section>
  `,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly returnUrl = inject(ActivatedRoute).snapshot.queryParamMap.get('volver');
  protected readonly mode = signal<'login' | 'register'>('login');
  protected readonly sending = signal(false);
  protected readonly error = signal('');

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    consent: [false],
  });

  constructor() {
    inject(SeoService).set({ title: 'Acceso clientes', description: 'Accede a tu área de cliente.', path: '/acceso', noindex: true });
    void this.auth.load().then((user) => user && this.redirect(user.role));
  }

  protected async submit(): Promise<void> {
    const { name, email, password, consent } = this.form.getRawValue();
    const register = this.mode() === 'register';
    if (this.form.invalid || (register && (!name.trim() || password.length < 8 || !consent))) {
      this.error.set(
        register
          ? 'Indica tu nombre, un email válido, una contraseña de al menos 8 caracteres y acepta la privacidad.'
          : 'Introduce tu email y contraseña.',
      );
      return;
    }
    this.sending.set(true);
    this.error.set('');
    try {
      const user = register ? await this.auth.register(name, email, password) : await this.auth.login(email, password);
      this.redirect(user.role);
    } catch (err) {
      const status = err instanceof HttpErrorResponse ? err.status : 0;
      this.error.set(
        status === 401
          ? 'Email o contraseña incorrectos.'
          : status === 409
            ? 'Ya existe una cuenta con ese email. Accede con tu contraseña.'
            : status === 429
              ? 'Demasiados intentos. Espera unos minutos.'
              : 'No hemos podido completar la operación. Inténtalo de nuevo.',
      );
    } finally {
      this.sending.set(false);
    }
  }

  private redirect(role: string): void {
    const safe = this.returnUrl?.startsWith('/') && !this.returnUrl.startsWith('//') ? this.returnUrl : null;
    void this.router.navigateByUrl(safe ?? (role === 'admin' ? '/admin' : '/cuenta'));
  }
}
