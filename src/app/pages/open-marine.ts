import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../core/catalog';
import { SeoService, breadcrumb } from '../core/seo.service';
import { ProductCard } from './product-card';

@Component({
  selector: 'app-open-marine',
  imports: [RouterLink, ProductCard],
  template: `
    <section class="page-hero">
      <div class="container narrow">
        <p class="eyebrow">Plataforma</p>
        <h1>Open Marine: el sistema de navegación abierto</h1>
        <p class="lead">
          Open Marine es una plataforma de instrumentación y navegación que convierte un ordenador compacto
          a bordo en el centro de datos del barco. Recoge la información de tus sensores, la publica en
          Signal K y la muestra en cualquier pantalla conectada a la red del barco.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Cómo funciona</h2>
        <ol class="steps">
          <li><strong>Sensores.</strong> GPS, sonda, anemómetro, AIS, IMU y el resto de instrumentos NMEA 0183 o NMEA 2000.</li>
          <li><strong>Open Marine Hub.</strong> La pasarela de sensores normaliza los datos y los publica en Signal K.</li>
          <li><strong>Servicios a bordo.</strong> Motor de cartas, piloto automático y alarmas se ejecutan en local.</li>
          <li><strong>Pantallas.</strong> Tablets, móviles y portátiles abren el navegador por Wi-Fi, sin instalar apps.</li>
        </ol>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2>Módulos de la plataforma</h2>
        <div class="grid-2">
          @for (p of products; track p.slug) {
            <app-product-card [product]="p" />
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container narrow">
        <h2>Por qué una plataforma abierta</h2>
        <ul class="checklist">
          <li>Mezcla equipos de distintos fabricantes sin pasarelas propietarias.</li>
          <li>Sustituye o amplía piezas sin cambiar todo el sistema.</li>
          <li>Tus datos de navegación se quedan en tu barco.</li>
          <li>Software auditable, probado con un banco de simulación antes de cada versión.</li>
          <li>Cartografía exclusivamente legal: respetamos las licencias de las cartas comerciales.</li>
        </ul>
        <p><a routerLink="/contacto" class="btn">Solicita una demostración</a></p>
      </div>
    </section>
  `,
})
export class OpenMarine {
  protected readonly products = PRODUCTS;

  constructor() {
    inject(SeoService).set({
      title: 'Open Marine: sistema de navegación y electrónica náutica abierta',
      description:
        'Open Marine integra GPS, AIS, sonda, viento y piloto automático en un sistema abierto basado en Signal K, ' +
        'con cartas náuticas offline en cualquier tablet de a bordo.',
      path: '/open-marine',
      jsonLd: [breadcrumb([{ name: 'Open Marine', path: '/open-marine' }])],
    });
  }
}
