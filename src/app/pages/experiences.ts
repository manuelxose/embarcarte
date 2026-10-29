import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMAGES } from '../core/images';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-experiences',
  imports: [RouterLink],
  template: `
    <section class="hero" style="height: min(600px, calc(100svh - 76px))">
      <div class="hero-image" role="img" aria-label="Costa vista desde el mar" [style.background-image]="'url(' + images.experiences + ')'"></div>
      <div class="hero-shade"></div>
      <div class="hero-content wrap">
        <p class="eyebrow">02 / Experiencias</p>
        <h1 class="display h-xl">El mar se disfruta<br /><em>desde dentro.</em></h1>
        <p class="hero-copy">Salidas y experiencias náuticas para descubrir la costa, aprender y vivir el mar de otra manera.</p>
        <div class="hero-actions">
          <a class="button button-light" routerLink="/contacto" [queryParams]="{ tema: 'experiencias' }">Consultar disponibilidad <span>↗</span></a>
        </div>
      </div>
    </section>

    <section class="services bg-soft section-pad">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Propuestas</p>
            <h2 class="display h-lg">Cada salida,<br /><em>a tu medida.</em></h2>
          </div>
          <p class="heading-note">Adaptamos la ruta, la duración y el ritmo al grupo, a la previsión y a lo que queráis vivir.</p>
        </div>
        <div class="service-grid">
          @for (e of experiences; track e.title; let i = $index) {
            <article class="service-card">
              <div class="card-content">
                <span class="card-number">0{{ i + 1 }}</span>
                <h3>{{ e.title }}</h3>
                <p>{{ e.text }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">Cómo reservar</p>
        <div>
          <ol class="steps">
            <li><strong>Cuéntanos tu idea.</strong> Fechas, número de personas y qué os gustaría hacer.</li>
            <li><strong>Te proponemos un plan.</strong> Ruta, horario y precio cerrado según la previsión.</li>
            <li><strong>Confirmamos.</strong> Revisamos la meteo los días previos y te avisamos de cualquier cambio.</li>
          </ol>
          <div class="hero-actions" style="margin-top: 28px">
            <a class="button button-dark" routerLink="/contacto" [queryParams]="{ tema: 'experiencias' }">Preparar consulta <span>↗</span></a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Experiences {
  protected readonly images = IMAGES;
  protected readonly experiences = [
    { title: 'Salidas por la costa', text: 'Navega calas y tramos de costa con calma, a vela o a motor, en grupos reducidos.' },
    { title: 'Iniciación a la navegación', text: 'Aprende maniobras básicas, lectura del viento y uso de la electrónica de a bordo.' },
    { title: 'Travesías y planes a medida', text: 'Jornadas especiales, celebraciones o travesías más largas diseñadas contigo.' },
  ];

  constructor() {
    inject(SeoService).set({
      title: 'Experiencias y salidas en barco',
      description:
        'Salidas en barco por la costa, iniciación a la navegación y travesías a medida con Embarcarte. Consulta disponibilidad.',
      path: '/experiencias',
      jsonLd: [breadcrumb([{ name: 'Experiencias', path: '/experiencias' }])],
    });
  }
}
