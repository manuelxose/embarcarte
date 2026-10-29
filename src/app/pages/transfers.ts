import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMAGES } from '../core/images';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-transfers',
  imports: [RouterLink],
  template: `
    <section class="hero" style="height: min(600px, calc(100svh - 76px))">
      <div class="hero-image" role="img" aria-label="Embarcación navegando hacia el horizonte" [style.background-image]="'url(' + images.transfers + ')'"></div>
      <div class="hero-shade"></div>
      <div class="hero-content wrap">
        <p class="eyebrow">03 / Traslados</p>
        <h1 class="display h-xl">Tu barco, rumbo<br /><em>al próximo puerto.</em></h1>
        <p class="hero-copy">Traslados marítimos de embarcaciones con planificación cuidada y comunicación clara en cada etapa.</p>
        <div class="hero-actions">
          <a class="button button-light" routerLink="/contacto" [queryParams]="{ tema: 'traslados' }">Solicitar presupuesto <span>↗</span></a>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">Cómo trabajamos</p>
        <ol class="steps">
          <li><strong>Revisión previa.</strong> Estado de la embarcación, documentación y equipo de seguridad.</li>
          <li><strong>Planificación.</strong> Ruta, escalas y ventana meteorológica adecuada.</li>
          <li><strong>Navegación con seguimiento.</strong> Te mantenemos informado de la posición y del avance.</li>
          <li><strong>Entrega.</strong> Llegada a puerto, informe del viaje y de cualquier incidencia detectada.</li>
        </ol>
      </div>
    </section>

    <section class="manifesto section-pad">
      <div class="manifesto-bg"></div>
      <div class="wrap manifesto-inner">
        <p class="eyebrow">Para el presupuesto</p>
        <h2 class="display h-lg">Cuéntanos el barco,<br /><em>el origen y el destino.</em></h2>
        <p>Tipo y eslora de la embarcación, puertos de salida y llegada, fechas aproximadas y si necesitas tripulación adicional.</p>
        <a class="button button-outline" routerLink="/contacto" [queryParams]="{ tema: 'traslados' }">Pedir presupuesto <span>↗</span></a>
      </div>
    </section>
  `,
})
export class Transfers {
  protected readonly images = IMAGES;

  constructor() {
    inject(SeoService).set({
      title: 'Traslado de embarcaciones',
      description:
        'Traslados marítimos de veleros y barcos a motor entre puertos, con planificación, seguimiento y entrega documentada.',
      path: '/traslados',
      jsonLd: [
        breadcrumb([{ name: 'Traslados', path: '/traslados' }]),
        {
          '@type': 'Service',
          serviceType: 'Traslado de embarcaciones',
          provider: { '@type': 'Organization', name: 'Embarcarte', url: 'https://embarcarte.com' },
        },
      ],
    });
  }
}
