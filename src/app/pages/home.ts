import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';
import { GUIDES } from '../core/guides';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="home-hero">
      <div class="home-hero-image"></div>
      <div class="wrap home-hero-content">
        <p class="eyebrow">Tecnología · Experiencias · Traslados</p>
        <h1>Navega con<br />más posibilidades</h1>
        <p>Desarrollamos soluciones electrónicas náuticas y conectamos la tecnología con la experiencia real de navegar.</p>
        <div class="hero-actions">
          <a class="button button-dark" routerLink="/tecnologia">Explorar tecnología <span aria-hidden="true">→</span></a>
          <a class="button button-outline" routerLink="/" fragment="servicios">Nuestros servicios</a>
        </div>
      </div>
      <p class="home-hero-note">Tecnología abierta.<br />Libertad en el mar.</p>
    </section>

    <section class="home-services wrap" id="servicios" aria-label="Nuestros servicios">
      @for (line of lines; track line.path) {
        <article class="home-service">
          <img [src]="line.image" alt="" />
          <div>
            <span class="home-service-icon" aria-hidden="true">{{ line.icon }}</span>
            <h2>{{ line.title }}</h2>
            <p>{{ line.text }}</p>
            <a [routerLink]="line.path">{{ line.cta }} <span aria-hidden="true">→</span></a>
          </div>
        </article>
      }
    </section>

    <section class="home-products">
      <div class="wrap home-products-grid">
        <div class="home-products-intro">
          <p class="eyebrow">Productos destacados</p>
          <h2>Instrumentación náutica<br />de última generación</h2>
          <p>Soluciones abiertas diseñadas para integrarse con los sistemas que ya conoces.</p>
          <a class="button button-outline" routerLink="/tecnologia">Ver toda la tecnología <span aria-hidden="true">→</span></a>
        </div>
        <div class="home-product-list">
          @for (product of products; track product.title) {
            <a class="home-product" [routerLink]="product.path">
              <img [src]="product.image" alt="" />
              <strong>{{ product.title }}</strong>
              <small>{{ product.description }}</small>
              <span aria-hidden="true">→</span>
            </a>
          }
        </div>
        <p class="home-products-note">Tecnología abierta<br />para un futuro<br />sin límites</p>
      </div>
    </section>
    <section class="section-tight bg-soft"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Conocimiento a bordo</p><h2 class="display h-md">Guías para navegar mejor</h2></div><a class="button button-outline" routerLink="/guias">Ver todas las guías →</a></div><div class="service-grid">@for (guide of guides; track guide.slug) { <article class="service-card"><div class="card-content"><h3>{{ guide.title }}</h3><p>{{ guide.description }}</p><a class="arrow-link stretched" [routerLink]="['/guias', guide.slug]">Leer guía →</a></div></article> }</div></div></section>
  `,
})
export class Home {
  protected readonly guides = GUIDES.slice(0, 3);
  protected readonly lines = [
    { title: 'Tecnología náutica', text: 'Sensores, instrumentación y pilotos automáticos con sistemas abiertos y protocolos estándar.', cta: 'Ver tecnología', path: '/tecnologia', image: '/images/home-tech.webp', icon: '⚙' },
    { title: 'Experiencias náuticas', text: 'Salidas por mar para disfrutar del entorno desde otra perspectiva.', cta: 'Ver experiencias', path: '/experiencias', image: '/images/home-experiences.webp', icon: '⛵' },
    { title: 'Traslados de embarcaciones', text: 'Transporte seguro y eficiente de barcos de un puerto a otro por vía marítima.', cta: 'Solicitar presupuesto', path: '/traslados', image: '/images/home-transfers.webp', icon: '♧' },
  ];
  protected readonly products = [
    { title: 'Instrumentación', description: 'Datos · Precisión · Protocolo abierto', image: '/images/home-anemometro.webp', path: '/tecnologia' },
    { title: 'Sensores de viento', description: 'Dirección del viento · Integración', image: '/images/home-veleta.webp', path: '/tecnologia' },
    { title: 'Piloto automático', description: 'Control inteligente · Abierto', image: '/images/home-piloto.webp', path: '/tecnologia/piloto-automatico' },
  ];

  constructor() {
    inject(SeoService).set({
      title: 'Embarcarte - Tecnología abierta. Libertad en el mar.',
      description: 'Tecnología náutica abierta, experiencias en el mar y traslado de embarcaciones.',
      path: '/',
      alternates: [{ language: 'es', path: '/' }, { language: 'en', path: '/en' }],
      jsonLd: [
        { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: `${SITE.url}/icon-512.png`, email: SITE.email, ...(SITE.social.length ? { sameAs: SITE.social } : {}) },
        { '@type': 'WebSite', name: SITE.name, url: SITE.url, inLanguage: 'es-ES' },
      ],
    });
  }
}
