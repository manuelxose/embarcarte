import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMAGES } from '../core/images';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-image" role="img" aria-label="Velero navegando en mar abierto" [style.background-image]="'url(' + images.hero + ')'"></div>
      <div class="hero-shade"></div>
      <div class="hero-content wrap">
        <p class="eyebrow">Tecnología · Navegación · Servicios</p>
        <h1 class="display h-xl">El mar cambia.<br /><em>La libertad permanece.</em></h1>
        <p class="hero-copy">
          Tecnología náutica abierta y soluciones para disfrutar, comprender y recorrer el mar con más libertad.
        </p>
        <div class="hero-actions">
          <a class="button button-light" routerLink="/tecnologia">Descubre Embarcarte <span aria-hidden="true">↗</span></a>
          <a class="text-link" routerLink="/" fragment="servicios">Explorar servicios <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div class="hero-bottom wrap"><span>Hecho para quienes miran al horizonte</span><span class="scroll-note">Desliza para explorar ↓</span></div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">Una forma diferente de navegar</p>
        <div>
          <h2 class="display h-lg">Más conexión con tu barco.<br /><em>Menos límites.</em></h2>
          <p class="intro-copy">
            En Embarcarte creemos que la tecnología náutica debe ayudarte a navegar, no complicarte la vida. Unimos
            desarrollo técnico, pasión por el mar y servicios pensados desde la experiencia real a bordo.
          </p>
        </div>
      </div>
    </section>

    <section class="services bg-soft section-pad" id="servicios">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Qué hacemos</p>
            <h2 class="display h-lg">Tres formas de<br /><em>estar más cerca del mar.</em></h2>
          </div>
          <p class="heading-note">
            Desde la electrónica que desarrolla nuevas posibilidades hasta los servicios que hacen más fácil llegar al
            próximo puerto.
          </p>
        </div>
        <div class="service-grid">
          @for (line of lines; track line.path) {
            <article class="service-card">
              <div class="card-image" [style.background-image]="'url(' + line.image + ')'"></div>
              <div class="card-content">
                <span class="card-number">{{ line.number }}</span>
                <h3>{{ line.title }}</h3>
                <p>{{ line.text }}</p>
                <a class="arrow-link stretched" [routerLink]="line.path">{{ line.cta }} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">Tienda Open Marine</p>
        <div>
          <h2 class="display h-lg">Electrónica abierta,<br /><em>lista para tu barco.</em></h2>
          <p class="intro-copy">
            Ordenador de navegación, controlador de piloto automático y accesorios del ecosistema Open Marine. Compra
            online y sigue tu pedido desde tu área de cliente.
          </p>
          <div class="hero-actions" style="margin-top: 30px">
            <a class="button button-dark" routerLink="/tienda">Ver la tienda <span aria-hidden="true">↗</span></a>
            <a class="text-link" routerLink="/tecnologia">Conocer Open Marine <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="manifesto section-pad">
      <div class="manifesto-bg"></div>
      <div class="wrap manifesto-inner">
        <p class="eyebrow">Nuestra filosofía</p>
        <h2 class="display">La mejor tecnología<br />es la que te deja<br /><em>mirar al horizonte.</em></h2>
        <p>Diseñamos para conectar sistemas, compartir conocimiento y dar más control a quienes navegan.</p>
        <a class="button button-outline" routerLink="/sobre-nosotros">Conoce nuestro enfoque <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  `,
})
export class Home {
  protected readonly images = IMAGES;
  protected readonly lines = [
    {
      number: '01 / Tecnología',
      title: 'Electrónica náutica sin cajas negras.',
      text: 'Sensores, instrumentación y sistemas abiertos diseñados para integrarse con tu ecosistema de navegación.',
      cta: 'Explorar desarrollos',
      path: '/tecnologia',
      image: IMAGES.tech,
    },
    {
      number: '02 / Experiencias',
      title: 'El mar se disfruta desde dentro.',
      text: 'Salidas y experiencias náuticas para descubrir la costa, aprender y vivir el mar de otra manera.',
      cta: 'Consultar experiencias',
      path: '/experiencias',
      image: IMAGES.experiences,
    },
    {
      number: '03 / Traslados',
      title: 'Tu barco, rumbo al próximo puerto.',
      text: 'Traslados marítimos de embarcaciones con planificación cuidada y comunicación clara en cada etapa.',
      cta: 'Solicitar presupuesto',
      path: '/traslados',
      image: IMAGES.transfers,
    },
  ];

  constructor() {
    inject(SeoService).set({
      title: 'Embarcarte — Tecnología abierta. Libertad en el mar.',
      description:
        'Embarcarte: tecnología náutica abierta con Open Marine, experiencias en el mar y traslado de embarcaciones.',
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
