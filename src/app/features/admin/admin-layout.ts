import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="wrap dash">
      <nav class="dash-nav" aria-label="Administración">
        <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Resumen</a>
        <a routerLink="/admin/pedidos" routerLinkActive="active">Pedidos</a>
        <a routerLink="/admin/productos" routerLinkActive="active">Productos</a>
        <a routerLink="/admin/clientes" routerLinkActive="active">Clientes</a>
        <a routerLink="/admin/mensajes" routerLinkActive="active">Mensajes</a>
        <a routerLink="/cuenta">Mi cuenta</a>
        <button type="button" (click)="logout()">Cerrar sesión</button>
      </nav>
      <div><router-outlet /></div>
    </div>
  `,
})
export class AdminLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    inject(SeoService).set({ title: 'Administración', description: 'Panel de administración.', path: '/admin', noindex: true });
  }

  protected async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/');
  }
}
