import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import type { TranslationKey } from '../../i18n/dictionary';

const AUTH_ERRORS: Record<number, TranslationKey> = {
  401: 'auth.badCredentials',
  409: 'auth.emailTaken',
  429: 'auth.tooManyAttempts',
};

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-hero" style="min-height: calc(100svh - 76px)">
      <div class="wrap">
        <h1 class="sr-only">{{ i18n.t('auth.seoTitle') }}</h1>
        <div class="panel auth-card">
          <div class="tabs" role="tablist">
            <button type="button" role="tab" [class.on]="mode() === 'login'" [attr.aria-selected]="mode() === 'login'" (click)="mode.set('login')">{{ i18n.t('auth.signIn') }}</button>
            <button type="button" role="tab" [class.on]="mode() === 'register'" [attr.aria-selected]="mode() === 'register'" (click)="mode.set('register')">{{ i18n.t('auth.register') }}</button>
          </div>
          <form class="form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
            @if (mode() === 'register') {
              <label for="name">{{ i18n.t('auth.name') }}</label>
              <input id="name" formControlName="name" autocomplete="name" />
            }
            <label for="email">{{ i18n.t('auth.email') }}</label>
            <input id="email" type="email" formControlName="email" autocomplete="email" />
            <label for="password">{{ i18n.t('auth.password') }}</label>
            <input id="password" type="password" formControlName="password"
                   [attr.autocomplete]="mode() === 'login' ? 'current-password' : 'new-password'" />
            @if (mode() === 'register') {
              <p class="form-hint" style="margin: -10px 0 16px">{{ i18n.t('auth.passwordHint') }}</p>
              <label class="check">
                <input type="checkbox" formControlName="consent" />
                <span>{{ i18n.t('auth.consent') }} <a [routerLink]="locale.url('privacy')">{{ i18n.t('common.privacyPolicy') }}</a>.</span>
              </label>
            }
            @if (error()) {
              <p class="error" role="alert">{{ error() }}</p>
            }
            <button class="button button-dark button-block" type="submit" [disabled]="sending()">
              {{ i18n.t(mode() === 'login' ? 'auth.signIn' : 'auth.register') }} <span aria-hidden="true">↗</span>
            </button>
          </form>
          <p class="form-hint">{{ i18n.t('auth.forgot', { email: site.email }) }}</p>
        </div>
      </div>
    </section>
  `,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly returnUrl = inject(ActivatedRoute).snapshot.queryParamMap.get('volver');
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly site = SITE;
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
    const seo = inject(SeoService);
    effect(() => {
      seo.set({
        title: this.i18n.t('auth.seoTitle'),
        description: this.i18n.t('auth.seoDescription'),
        path: this.locale.url('login'),
        language: this.locale.locale(),
        noindex: true,
      });
    });
    void this.auth.load().then((user) => user && this.redirect(user.role));
  }

  protected async submit(): Promise<void> {
    const { name, email, password, consent } = this.form.getRawValue();
    const register = this.mode() === 'register';
    if (this.form.invalid || (register && (!name.trim() || password.length < 8 || !consent))) {
      this.error.set(this.i18n.t(register ? 'auth.invalidRegister' : 'auth.invalidLogin'));
      return;
    }
    this.sending.set(true);
    this.error.set('');
    try {
      const user = register ? await this.auth.register(name, email, password) : await this.auth.login(email, password);
      this.redirect(user.role);
    } catch (err) {
      const status = err instanceof HttpErrorResponse ? err.status : 0;
      this.error.set(this.i18n.t(AUTH_ERRORS[status] ?? 'error.generic'));
    } finally {
      this.sending.set(false);
    }
  }

  private redirect(role: string): void {
    const safe = this.returnUrl?.startsWith('/') && !this.returnUrl.startsWith('//') ? this.returnUrl : null;
    void this.router.navigateByUrl(safe ?? (role === 'admin' ? '/admin' : this.locale.url('account')));
  }
}
