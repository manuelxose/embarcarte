import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../core/catalog';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container narrow">
        <p class="eyebrow">Servicios</p>
        <h1>Instalación e integración de electrónica náutica</h1>
        <p class="lead">Te ayudamos a diseñar, instalar y mantener el sistema de navegación de tu embarcación.</p>
      </div>
    </section>
    <section class="section">
      <div class="container grid-2">
        @for (s of services; track s.title) {
          <article class="card">
            <h2 class="h3">{{ s.title }}</h2>
            <p>{{ s.text }}</p>
          </article>
        }
      </div>
    </section>
    <section class="section section-alt">
      <div class="container narrow">
        <h2>Cómo trabajamos</h2>
        <ol class="steps">
          <li><strong>Diagnóstico.</strong> Revisamos tu embarcación, la electrónica actual y cómo navegas.</li>
          <li><strong>Propuesta.</strong> Te enviamos un presupuesto cerrado con equipos, instalación y plazos.</li>
          <li><strong>Instalación.</strong> Montamos, configuramos y probamos el sistema contigo a bordo.</li>
          <li><strong>Soporte.</strong> Actualizaciones y asistencia para que siga funcionando cada temporada.</li>
        </ol>
        <p><a routerLink="/contacto" class="btn">Solicitar diagnóstico</a></p>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly services = SERVICES;

  constructor() {
    inject(SeoService).set({
      title: 'Servicios de instalación e integración de electrónica náutica',
      description:
        'Integración de instrumentos NMEA, instalación de ordenadores de navegación, desarrollo a medida y ' +
        'soporte técnico para embarcaciones de recreo, chárter y escuelas.',
      path: '/servicios',
      jsonLd: [
        breadcrumb([{ name: 'Servicios', path: '/servicios' }]),
        {
          '@type': 'Service',
          serviceType: 'Instalación e integración de electrónica náutica',
          provider: { '@type': 'Organization', name: 'Embarcarte', url: 'https://embarcarte.com' },
          areaServed: { '@type': 'Country', name: 'España' },
        },
      ],
    });
  }
}
