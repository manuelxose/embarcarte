import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../core/catalog';
import { IMAGES } from '../core/images';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-open-marine',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">01 / Tecnología</p>
        <h1 class="display h-xl">Electrónica náutica<br /><em>sin cajas negras.</em></h1>
        <p class="lead">
          Open Marine es nuestra plataforma abierta de navegación e instrumentación. Convierte un ordenador compacto a
          bordo en el centro de datos del barco y muestra cartas, instrumentos y AIS en cualquier pantalla.
        </p>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">Cómo funciona</p>
        <ol class="steps">
          <li><strong>Sensores.</strong> GPS, sonda, anemómetro, AIS, IMU y el resto de instrumentos NMEA 0183 o NMEA 2000.</li>
          <li><strong>Open Marine Hub.</strong> La pasarela de sensores normaliza los datos y los publica en Signal K.</li>
          <li><strong>Servicios a bordo.</strong> Motor de cartas, piloto automático y alarmas se ejecutan en local, sin Internet.</li>
          <li><strong>Pantallas.</strong> Tablets, móviles y portátiles abren el navegador por Wi-Fi, sin instalar apps.</li>
        </ol>
      </div>
    </section>

    <section class="services bg-soft section-pad">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Módulos</p>
            <h2 class="display h-lg">Software y hardware<br /><em>Open Marine.</em></h2>
          </div>
          <p class="heading-note">Elige piezas sueltas o un sistema completo, instalado y configurado para tu embarcación.</p>
        </div>
        @for (kind of kinds; track kind) {
        <h3 class="display h-md" style="margin: 40px 0 24px">{{ kind === 'Software' ? 'Software de navegación' : 'Hardware a medida' }}</h3>
        <div class="service-grid two">
          @for (p of byKind(kind); track p.slug; let i = $index) {
            <article class="service-card">
              <div class="card-content">
                <span class="card-number">0{{ i + 1 }} / {{ p.kind }}</span>
                <h3>{{ p.name }}</h3>
                <p>{{ p.tagline }}</p>
                <a class="arrow-link stretched" [routerLink]="['/tecnologia', p.slug]">Ver detalles <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          }
        </div>
        }
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap detail-grid">
        <div>
          <p class="eyebrow">Por qué abierto</p>
          <h2 class="display h-md">Tu barco, tus datos,<br /><em>tus decisiones.</em></h2>
          <ul class="checklist" style="margin-top: 28px">
            <li>Mezcla equipos de distintos fabricantes sin pasarelas propietarias.</li>
            <li>Sustituye o amplía piezas sin cambiar todo el sistema.</li>
            <li>Tus datos de navegación se quedan en tu barco.</li>
            <li>Software auditable, probado con un banco de simulación antes de cada versión.</li>
            <li>Cartografía exclusivamente legal: respetamos las licencias de las cartas comerciales.</li>
          </ul>
          <div class="hero-actions">
            <a class="button button-dark" routerLink="/tienda">Ir a la tienda <span aria-hidden="true">↗</span></a>
            <a class="text-link" routerLink="/contacto" [queryParams]="{ tema: 'tecnologia' }">Solicitar una demostración <span>→</span></a>
          </div>
        </div>
        <div class="product-photo"><img [src]="images.tech" alt="Electrónica y desarrollo de sistemas" loading="lazy" /></div>
      </div>
    </section>
  `,
})
export class OpenMarine {
  protected readonly kinds = ['Software', 'Hardware'] as const;
  protected readonly byKind = (kind: 'Software' | 'Hardware') => PRODUCTS.filter((product) => product.kind === kind);
  protected readonly images = IMAGES;

  constructor() {
    inject(SeoService).set({
      title: 'Tecnología náutica abierta Open Marine',
      description:
        'Open Marine integra GPS, AIS, sonda, viento y piloto automático en un sistema abierto basado en Signal K, ' +
        'con cartas náuticas offline en cualquier tablet de a bordo.',
      path: '/tecnologia',
      alternates: [{ language: 'es', path: '/tecnologia' }, { language: 'en', path: '/en/technology' }],
      jsonLd: [breadcrumb([{ name: 'Tecnología', path: '/tecnologia' }])],
    });
  }
}
