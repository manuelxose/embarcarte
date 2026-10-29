import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS, SERVICES } from '../core/catalog';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';
import { ProductCard } from './product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Tecnología náutica abierta</p>
          <h1>Electrónica de navegación que entiende a tu barco</h1>
          <p class="lead">
            En Embarcarte diseñamos, instalamos y damos soporte a sistemas de navegación basados en
            <strong>Open Marine</strong>: cartas offline, instrumentos, AIS y piloto automático en
            cualquier tablet de a bordo, sin quedar atado a una sola marca.
          </p>
          <div class="actions">
            <a routerLink="/contacto" class="btn">Pide presupuesto</a>
            <a routerLink="/open-marine" class="btn btn-ghost">Descubre Open Marine</a>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <svg viewBox="0 0 400 320">
            <defs>
              <linearGradient id="sea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stop-color="#0e3a5c" /><stop offset="1" stop-color="#061a2b" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="380" height="300" rx="22" fill="url(#sea)" stroke="#2bb3c0" stroke-opacity=".4" />
            <g stroke="#2bb3c0" stroke-opacity=".18" fill="none">
              <circle cx="200" cy="165" r="50" /><circle cx="200" cy="165" r="95" /><circle cx="200" cy="165" r="140" />
              <path d="M200 20v290M10 165h380" />
            </g>
            <path d="M40 260c40-30 70-10 110-40s60-70 120-60 70 30 100 20" stroke="#7fd6de" stroke-width="2" stroke-dasharray="6 6" fill="none" />
            <path d="M200 140l14 40-14-8-14 8z" fill="#f2b84b" />
            <g fill="#7fd6de"><circle cx="300" cy="95" r="5" /><circle cx="110" cy="110" r="5" /><circle cx="320" cy="230" r="5" /></g>
            <g font-family="system-ui,sans-serif" fill="#cfe9ee" font-size="13">
              <text x="30" y="44">SOG 6.4 kn</text><text x="30" y="64">COG 042°</text>
              <text x="300" y="44">TWS 14 kn</text><text x="300" y="64">DPT 12.3 m</text>
            </g>
          </svg>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid-3">
          <div class="feature">
            <h2 class="h3">Abierto y sin ataduras</h2>
            <p>Basado en Signal K y NMEA. Conecta la electrónica que ya tienes y amplíala cuando quieras.</p>
          </div>
          <div class="feature">
            <h2 class="h3">Funciona sin Internet</h2>
            <p>Todo corre a bordo: cartas, instrumentos y alarmas siguen disponibles lejos de la costa.</p>
          </div>
          <div class="feature">
            <h2 class="h3">Instalado y soportado</h2>
            <p>Te entregamos el sistema configurado para tu embarcación y te acompañamos cada temporada.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Catálogo</p>
          <h2>Software y hardware Open Marine</h2>
          <p class="muted">Elige piezas sueltas o un sistema completo listo para navegar.</p>
        </header>
        <div class="grid-2">
          @for (p of products; track p.slug) {
            <app-product-card [product]="p" />
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Servicios</p>
          <h2>De la idea al barco navegando</h2>
        </header>
        <div class="grid-4">
          @for (s of services; track s.title) {
            <div class="feature">
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section cta">
      <div class="container cta-inner">
        <div>
          <h2>¿Preparamos el sistema de tu embarcación?</h2>
          <p>Cuéntanos qué barco tienes y qué electrónica llevas. Te respondemos con una propuesta.</p>
        </div>
        <a routerLink="/contacto" class="btn btn-light">Hablar con nosotros</a>
      </div>
    </section>
  `,
})
export class Home {
  protected readonly products = PRODUCTS;
  protected readonly services = SERVICES;

  constructor() {
    inject(SeoService).set({
      title: 'Embarcarte · Tecnología náutica abierta y electrónica de navegación',
      description: SITE.defaultDescription,
      path: '/',
      jsonLd: [
        {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.url,
          logo: `${SITE.url}/icon-512.png`,
          email: SITE.email,
          ...(SITE.social.length ? { sameAs: SITE.social } : {}),
        },
        { '@type': 'WebSite', name: SITE.name, url: SITE.url, inLanguage: 'es-ES' },
      ],
    });
  }
}
