import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CartService } from '../../core/cart.service';
import { LocaleService } from '../../core/i18n/locale.service';
import type { RouteId } from '../../core/i18n/locale-routes';
import { TranslationService } from '../../core/i18n/translation.service';
import type { TranslationKey } from '../../i18n/dictionary';
import { Brand } from '../brand';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

/** Navigation is a list of semantic routes: the label and the URL come from the locale. */
const NAV: readonly { readonly id: RouteId; readonly key: TranslationKey }[] = [
  { id: 'technology', key: 'nav.technology' },
  { id: 'shop', key: 'nav.shop' },
  { id: 'experiences', key: 'nav.experiences' },
  { id: 'delivery', key: 'nav.delivery' },
  { id: 'about', key: 'nav.about' },
  { id: 'guides', key: 'nav.guides' },
];

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Brand, LanguageSwitcher],
  template: `
    <header class="site-header" (keydown.escape)="open.set(false)">
      <app-brand (click)="open.set(false)" />
      <div class="header-right">
        <nav id="main-nav" class="nav-links" [class.open]="open()" [attr.aria-label]="i18n.t('a11y.mainNavigation')">
          @for (link of links(); track link.id) {
            <a [routerLink]="link.path" routerLinkActive="active" (click)="open.set(false)">{{ link.label }}</a>
          }
          <a class="nav-cta" [routerLink]="locale.url('contact')" (click)="open.set(false)">{{ i18n.t('header.contact') }} <span aria-hidden="true">↗</span></a>
        </nav>
        <div class="nav-icons">
          <app-language-switcher linkClass="icon-link" />
          <a class="icon-link" [routerLink]="accountPath()" [attr.aria-label]="accountLabel()" [attr.title]="accountLabel()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          </a>
          <a class="icon-link" [routerLink]="locale.url('cart')" [attr.aria-label]="i18n.t('a11y.cart')" [attr.title]="i18n.t('a11y.cart')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 7h14l-1.3 11.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5 7Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
            @if (cart.count()) {
              <span class="cart-count">{{ cart.count() }}</span>
            }
          </a>
          <button class="menu-toggle" type="button" aria-controls="main-nav"
                  [attr.aria-expanded]="open()" [attr.aria-label]="i18n.t(open() ? 'a11y.closeMenu' : 'a11y.openMenu')"
                  (click)="open.set(!open())">
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly auth = inject(AuthService);
  protected readonly cart = inject(CartService);
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly open = signal(false);
  protected readonly links = computed(() =>
    NAV.map((link) => ({ id: link.id, path: this.locale.url(link.id), label: this.i18n.t(link.key) })),
  );
  protected readonly accountLabel = computed(() => this.i18n.t(this.auth.user() ? 'a11y.account' : 'a11y.signIn'));
  protected readonly accountPath = computed(() =>
    this.auth.isAdmin() ? '/admin' : this.locale.url(this.auth.user() ? 'account' : 'login'),
  );

  constructor() {
    void this.auth.load();
  }
}
