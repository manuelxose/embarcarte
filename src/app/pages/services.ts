import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SERVICES } from '../core/catalog';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">{{ english ? 'Installation and support' : 'Instalación y soporte' }}</p>
        <h1 class="display h-xl">{{ english ? 'From the idea' : 'De la idea' }}<br /><em>{{ english ? 'to your boat.' : 'al barco navegando.' }}</em></h1>
        <p class="lead">{{ english ? 'We design, install and maintain navigation systems for your vessel.' : 'Diseñamos, instalamos y mantenemos el sistema de navegación de tu embarcación.' }}</p>
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
        <p class="eyebrow">{{ english ? 'The process' : 'El proceso' }}</p>
        <div>
          <ol class="steps">
            <li>{{ english ? 'Assessment: we review the boat, existing electronics and how you sail.' : 'Diagnóstico: revisamos tu embarcación, la electrónica actual y cómo navegas.' }}</li>
            <li>{{ english ? 'Proposal: a quote with equipment, installation and timing.' : 'Propuesta: presupuesto cerrado con equipos, instalación y plazos.' }}</li>
            <li>{{ english ? 'Installation: we install, configure and test the system on board.' : 'Instalación: montamos, configuramos y probamos el sistema contigo a bordo.' }}</li>
            <li>{{ english ? 'Support: updates and assistance each season.' : 'Soporte: actualizaciones y asistencia para que siga funcionando cada temporada.' }}</li>
          </ol>
          <div class="hero-actions" style="margin-top: 28px">
            <a class="button button-dark" [routerLink]="english ? '/en/contact' : '/contacto'" [queryParams]="{ tema: 'tecnologia' }">{{ english ? 'Request an assessment' : 'Solicitar diagnóstico' }} <span>↗</span></a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly english = inject(ActivatedRoute).snapshot.data['language'] === 'en';
  protected readonly services = this.english ? [
    { title: 'Onboard installation', text: 'Mounting, wiring, protected power and commissioning adapted to your boat.' },
    { title: 'Custom development', text: 'Displays, integrations and hardware for fleets, charter, schools and research projects.' },
    { title: 'Support and maintenance', text: 'Updates, diagnostics when connected and technical assistance.' },
  ] : SERVICES;

  constructor() {
    inject(SeoService).set({
      title: this.english ? 'Marine electronics installation and integration' : 'Instalación e integración de electrónica náutica',
      description: this.english ? 'Marine instrument integration, onboard computer installation, custom development and support.' : 'Integración de instrumentos NMEA, instalación de ordenadores de navegación, desarrollo a medida y soporte técnico para embarcaciones.',
      path: this.english ? '/en/services' : '/servicios',
      language: this.english ? 'en' : 'es',
      alternates: [{ language: 'es', path: '/servicios' }, { language: 'en', path: '/en/services' }],
      jsonLd: [breadcrumb([{ name: 'Servicios', path: '/servicios' }])],
    });
  }
}
