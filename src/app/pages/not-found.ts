import { Component, RESPONSE_INIT, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container narrow">
        <p class="eyebrow">Error 404</p>
        <h1>Esta página se ha ido a la deriva</h1>
        <p class="lead">No encontramos lo que buscas. Vuelve a puerto seguro:</p>
        <p class="actions">
          <a routerLink="/" class="btn">Ir al inicio</a>
          <a routerLink="/productos" class="btn btn-ghost">Ver productos</a>
        </p>
      </div>
    </section>
  `,
})
export class NotFound {
  constructor() {
    const response = inject(RESPONSE_INIT, { optional: true });
    if (response) {
      response.status = 404;
    }
    inject(SeoService).set({
      title: 'Página no encontrada',
      description: 'La página solicitada no existe.',
      path: '/404',
      noindex: true,
    });
  }
}
