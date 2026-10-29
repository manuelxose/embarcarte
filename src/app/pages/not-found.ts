import { Component, RESPONSE_INIT, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="page-hero" style="min-height: 60vh">
      <div class="wrap">
        <p class="eyebrow">Error 404</p>
        <h1 class="display h-xl">Esta página<br /><em>se ha ido a la deriva.</em></h1>
        <p class="lead">No encontramos lo que buscas. Vuelve a puerto seguro.</p>
        <div class="hero-actions" style="margin-top: 30px">
          <a routerLink="/" class="button button-dark">Ir al inicio <span>↗</span></a>
          <a routerLink="/tienda" class="text-link">Ver la tienda <span>→</span></a>
        </div>
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
