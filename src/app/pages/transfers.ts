import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IMAGES } from '../core/images';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-transfers',
  imports: [RouterLink],
  template: `
    <section class="hero" style="height: min(600px, calc(100svh - 76px))">
      <div class="hero-image" role="img" [attr.aria-label]="english ? 'Boat sailing toward the horizon' : 'Embarcación navegando hacia el horizonte'" [style.background-image]="'url(' + images.transfers + ')'"></div>
      <div class="hero-shade"></div>
      <div class="hero-content wrap">
        <p class="eyebrow">03 / {{ english ? 'Boat delivery' : 'Traslados' }}</p>
        <h1 class="display h-xl">{{ english ? 'Your boat, on its way' : 'Tu barco, rumbo' }}<br /><em>{{ english ? 'to the next port.' : 'al próximo puerto.' }}</em></h1>
        <p class="hero-copy">{{ english ? 'Boat deliveries by sea with careful planning and clear communication at every stage.' : 'Traslados marítimos de embarcaciones con planificación cuidada y comunicación clara en cada etapa.' }}</p>
        <div class="hero-actions">
          <a class="button button-light" [routerLink]="english ? '/en/contact' : '/contacto'" [queryParams]="{ tema: 'traslados' }">{{ english ? 'Request a quote' : 'Solicitar presupuesto' }} <span>↗</span></a>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">{{ english ? 'How we work' : 'Cómo trabajamos' }}</p>
        <ol class="steps">
          <li>{{ english ? 'Pre-departure review: vessel condition, documents and safety equipment.' : 'Revisión previa: estado de la embarcación, documentación y equipo de seguridad.' }}</li>
          <li>{{ english ? 'Planning: route, stops and a suitable weather window.' : 'Planificación: ruta, escalas y ventana meteorológica adecuada.' }}</li>
          <li>{{ english ? 'Passage tracking: we keep you informed of position and progress.' : 'Navegación con seguimiento: te mantenemos informado de la posición y del avance.' }}</li>
          <li>{{ english ? 'Handover: arrival, passage report and any incidents.' : 'Entrega: llegada a puerto, informe del viaje y de cualquier incidencia detectada.' }}</li>
        </ol>
      </div>
    </section>

    <section class="manifesto section-pad">
      <div class="manifesto-bg"></div>
      <div class="wrap manifesto-inner">
        <p class="eyebrow">{{ english ? 'For your quote' : 'Para el presupuesto' }}</p>
        <h2 class="display h-lg">{{ english ? 'Tell us about the boat,' : 'Cuéntanos el barco,' }}<br /><em>{{ english ? 'origin and destination.' : 'el origen y el destino.' }}</em></h2>
        <p>{{ english ? 'Vessel type and length, departure and arrival ports, approximate dates and whether extra crew is needed.' : 'Tipo y eslora de la embarcación, puertos de salida y llegada, fechas aproximadas y si necesitas tripulación adicional.' }}</p>
        <a class="button button-outline" [routerLink]="english ? '/en/contact' : '/contacto'" [queryParams]="{ tema: 'traslados' }">{{ english ? 'Request a quote' : 'Pedir presupuesto' }} <span>↗</span></a>
      </div>
    </section>
  `,
})
export class Transfers {
  protected readonly english = inject(ActivatedRoute).snapshot.data['language'] === 'en';
  protected readonly images = IMAGES;

  constructor() {
    inject(SeoService).set({
      title: this.english ? 'Boat delivery' : 'Traslado de embarcaciones',
      description: this.english ? 'Sailboat and motorboat deliveries between ports, with planning and tracking.' : 'Traslados marítimos de veleros y barcos a motor entre puertos, con planificación, seguimiento y entrega documentada.',
      path: this.english ? '/en/delivery' : '/traslados',
      language: this.english ? 'en' : 'es',
      alternates: [{ language: 'es', path: '/traslados' }, { language: 'en', path: '/en/delivery' }],
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
