import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from './logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Logo],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a routerLink="/" class="brand" aria-label="Embarcarte, inicio" (click)="open.set(false)">
          <app-logo />
          <span>Embarcarte</span>
        </a>
        <button
          class="nav-toggle"
          type="button"
          [attr.aria-expanded]="open()"
          aria-controls="main-nav"
          (click)="open.set(!open())"
        >
          <span class="sr-only">Menú</span>
          <span class="bars" aria-hidden="true"></span>
        </button>
        <nav id="main-nav" class="main-nav" [class.open]="open()" aria-label="Principal">
          @for (link of links; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              (click)="open.set(false)"
              >{{ link.label }}</a
            >
          }
          <a routerLink="/contacto" class="btn btn-small" (click)="open.set(false)">Pide presupuesto</a>
        </nav>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly open = signal(false);
  protected readonly links = [
    { path: '/open-marine', label: 'Open Marine' },
    { path: '/productos', label: 'Productos' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/sobre-nosotros', label: 'Nosotros' },
  ];
}
