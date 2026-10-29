import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CartService } from '../core/cart.service';
import { Brand } from './brand';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Brand],
  template: `
    <header class="site-header">
      <app-brand (click)="open.set(false)" />
      <div class="header-right">
        <nav id="main-nav" class="nav-links" [class.open]="open()" aria-label="Navegación principal">
          @for (link of links; track link.path) {
            <a [routerLink]="link.path" routerLinkActive="active" (click)="open.set(false)">{{ link.label }}</a>
          }
          <a class="nav-cta" routerLink="/contacto" (click)="open.set(false)">Hablemos <span aria-hidden="true">↗</span></a>
        </nav>
        <div class="nav-icons">
          <a class="icon-link" [routerLink]="auth.isAdmin() ? '/admin' : '/cuenta'"
             [attr.aria-label]="auth.user() ? 'Mi cuenta' : 'Acceder'" [title]="auth.user() ? 'Mi cuenta' : 'Acceder'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          </a>
          <a class="icon-link" routerLink="/carrito" aria-label="Carrito" title="Carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 7h14l-1.3 11.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5 7Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
            @if (cart.count()) {
              <span class="cart-count">{{ cart.count() }}</span>
            }
          </a>
          <button class="menu-toggle" type="button" aria-controls="main-nav"
                  [attr.aria-expanded]="open()" [attr.aria-label]="open() ? 'Cerrar menú' : 'Abrir menú'"
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
  protected readonly open = signal(false);
  protected readonly links = [
    { path: '/tecnologia', label: 'Tecnología' },
    { path: '/tienda', label: 'Tienda' },
    { path: '/experiencias', label: 'Experiencias' },
    { path: '/traslados', label: 'Traslados' },
    { path: '/sobre-nosotros', label: 'Nosotros' },
  ];

  constructor() {
    void this.auth.load();
  }
}
