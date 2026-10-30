import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../core/catalog';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">Instalación y soporte</p>
        <h1 class="display h-xl">De la idea<br /><em>al barco navegando.</em></h1>
        <p class="lead">Diseñamos, instalamos y mantenemos el sistema de navegación de tu embarcación.</p>
      </div>
    </section>
    <section class="services bg-soft section-pad">
      <div class="wrap service-grid two">
        @for (s of services; track s.title; let i = $index) {
          <article class="service-card">
            <div class="card-content">
              <span class="card-number">0{{ i + 1 }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </div>
          </article>
        }
      </div>
    </section>
    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">El proceso</p>
        <div>
          <ol class="steps">
            <li><strong>Diagnóstico.</strong> Revisamos tu embarcación, la electrónica actual y cómo navegas.</li>
            <li><strong>Propuesta.</strong> Presupuesto cerrado con equipos, instalación y plazos.</li>
            <li><strong>Instalación.</strong> Montamos, configuramos y probamos el sistema contigo a bordo.</li>
            <li><strong>Soporte.</strong> Actualizaciones y asistencia para que siga funcionando cada temporada.</li>
          </ol>
          <div class="hero-actions" style="margin-top: 28px">
            <a class="button button-dark" routerLink="/contacto" [queryParams]="{ tema: 'tecnologia' }">Solicitar diagnóstico <span>↗</span></a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly services = SERVICES;

  constructor() {
    inject(SeoService).set({
      title: 'Instalación e integración de electrónica náutica',
      description:
        'Integración de instrumentos NMEA, instalación de ordenadores de navegación, desarrollo a medida y soporte técnico para embarcaciones.',
      path: '/servicios',
      alternates: [{ language: 'es', path: '/servicios' }, { language: 'en', path: '/en/services' }],
      jsonLd: [breadcrumb([{ name: 'Servicios', path: '/servicios' }])],
    });
  }
}
