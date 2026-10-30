import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';
import { GUIDES } from '../core/guides';
import { ENGLISH_GUIDES } from '../core/guides-en';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="home-hero">
      <div class="home-hero-image"></div>
      <div class="wrap home-hero-content">
        <p class="eyebrow">{{ english ? 'Technology · Experiences · Boat delivery' : 'Tecnología · Experiencias · Traslados' }}</p>
        <h1>{{ english ? 'Sail with' : 'Navega con' }}<br />{{ english ? 'more possibilities' : 'más posibilidades' }}</h1>
        <p>{{ english ? 'We develop marine electronics and connect technology with the real experience of being at sea.' : 'Desarrollamos soluciones electrónicas náuticas y conectamos la tecnología con la experiencia real de navegar.' }}</p>
        <div class="hero-actions">
          <a class="button button-dark" [routerLink]="english ? '/en/technology' : '/tecnologia'">{{ english ? 'Explore technology' : 'Explorar tecnología' }} <span aria-hidden="true">→</span></a>
          <a class="button button-outline" [routerLink]="english ? '/en' : '/'" fragment="servicios">{{ english ? 'Our services' : 'Nuestros servicios' }}</a>
        </div>
      </div>
    </section>

    <section class="home-services wrap" id="servicios" [attr.aria-label]="english ? 'Our services' : 'Nuestros servicios'">
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
          <p class="eyebrow">{{ english ? 'Featured products' : 'Productos destacados' }}</p>
          <h2>{{ english ? 'Marine instruments' : 'Instrumentación náutica' }}<br />{{ english ? 'for your boat' : 'de última generación' }}</h2>
          <p>{{ english ? 'Open solutions designed to work with the systems you already know.' : 'Soluciones abiertas diseñadas para integrarse con los sistemas que ya conoces.' }}</p>
          <a class="button button-outline" [routerLink]="english ? '/en/technology' : '/tecnologia'">{{ english ? 'Explore technology' : 'Ver toda la tecnología' }} <span aria-hidden="true">→</span></a>
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
        <p class="home-products-note">{{ english ? 'Open technology' : 'Tecnología abierta' }}<br />{{ english ? 'for a future' : 'para un futuro' }}<br />{{ english ? 'without limits' : 'sin límites' }}</p>
      </div>
    </section>
    <section class="section-tight bg-soft"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">{{ english ? 'Knowledge on board' : 'Conocimiento a bordo' }}</p><h2 class="display h-md">{{ english ? 'Guides for better navigation' : 'Guías para navegar mejor' }}</h2></div><a class="button button-outline" [routerLink]="guidesPath">{{ english ? 'All guides' : 'Ver todas las guías' }} →</a></div><div class="service-grid">@for (guide of guides; track guide.slug) { <article class="service-card"><div class="card-content"><h3>{{ guide.title }}</h3><p>{{ guide.description }}</p><a class="arrow-link stretched" [routerLink]="[guidesPath, guide.slug]">{{ english ? 'Read guide' : 'Leer guía' }} →</a></div></article> }</div></div></section>
  `,
})
export class Home {
  protected readonly english = inject(ActivatedRoute).snapshot.data['language'] === 'en';
  protected readonly guidesPath = this.english ? '/en/guides' : '/guias';
  protected readonly guides = GUIDES.slice(0, 3).map((guide) => this.english ? { slug: guide.slug, ...ENGLISH_GUIDES[guide.slug] } : guide);
  protected readonly lines = this.english ? [
    { title: 'Marine technology', text: 'Sensors, instruments and autopilots using open systems and standard protocols.', cta: 'Explore technology', path: '/en/technology', image: '/images/home-tech.webp', icon: '⚙' },
    { title: 'Marine experiences', text: 'Trips at sea to enjoy the coast from another perspective.', cta: 'Explore experiences', path: '/en/experiences', image: '/images/home-experiences.webp', icon: '⛵' },
    { title: 'Boat delivery', text: 'Carefully planned vessel deliveries between ports.', cta: 'Request a quote', path: '/en/delivery', image: '/images/home-transfers.webp', icon: '♧' },
  ] : [
    { title: 'Tecnología náutica', text: 'Sensores, instrumentación y pilotos automáticos con sistemas abiertos y protocolos estándar.', cta: 'Ver tecnología', path: '/tecnologia', image: '/images/home-tech.webp', icon: '⚙' },
    { title: 'Experiencias náuticas', text: 'Salidas por mar para disfrutar del entorno desde otra perspectiva.', cta: 'Ver experiencias', path: '/experiencias', image: '/images/home-experiences.webp', icon: '⛵' },
    { title: 'Traslados de embarcaciones', text: 'Transporte seguro y eficiente de barcos de un puerto a otro por vía marítima.', cta: 'Solicitar presupuesto', path: '/traslados', image: '/images/home-transfers.webp', icon: '♧' },
  ];
  protected readonly products = this.english ? [
    { title: 'Instruments', description: 'Data · Precision · Open protocol', image: '/images/home-anemometro.webp', path: '/en/technology' },
    { title: 'Wind sensors', description: 'Wind direction · Integration', image: '/images/home-veleta.webp', path: '/en/technology' },
    { title: 'Autopilot', description: 'Intelligent control · Open', image: '/images/home-piloto.webp', path: '/en/technology/piloto-automatico' },
  ] : [
    { title: 'Instrumentación', description: 'Datos · Precisión · Protocolo abierto', image: '/images/home-anemometro.webp', path: '/tecnologia' },
    { title: 'Sensores de viento', description: 'Dirección del viento · Integración', image: '/images/home-veleta.webp', path: '/tecnologia' },
    { title: 'Piloto automático', description: 'Control inteligente · Abierto', image: '/images/home-piloto.webp', path: '/tecnologia/piloto-automatico' },
  ];

  constructor() {
    inject(SeoService).set({
      title: this.english ? 'Open marine technology and boat services' : 'Embarcarte - Tecnología abierta. Libertad en el mar.',
      description: this.english ? 'Open marine electronics, experiences at sea and boat delivery with Embarcarte.' : 'Tecnología náutica abierta, experiencias en el mar y traslado de embarcaciones.',
      path: this.english ? '/en' : '/',
      language: this.english ? 'en' : 'es',
      alternates: [{ language: 'es', path: '/' }, { language: 'en', path: '/en' }],
      jsonLd: [
        { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: `${SITE.url}/icon-512.png`, email: SITE.email, ...(SITE.social.length ? { sameAs: SITE.social } : {}) },
        { '@type': 'WebSite', name: SITE.name, url: SITE.url, inLanguage: this.english ? 'en' : 'es-ES' },
      ],
    });
  }
}
