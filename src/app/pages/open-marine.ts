import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PRODUCTS } from '../core/catalog';
import { IMAGES } from '../core/images';
import { SeoService, breadcrumb } from '../core/seo.service';
import { CATALOG_EN } from '../core/catalog-en';

@Component({
  selector: 'app-open-marine',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">01 / {{ english ? 'Technology' : 'Tecnología' }}</p>
        <h1 class="display h-xl">{{ english ? 'Marine electronics' : 'Electrónica náutica' }}<br /><em>{{ english ? 'without black boxes.' : 'sin cajas negras.' }}</em></h1>
        <p class="lead">
          {{ english ? 'Open Marine is our open navigation and instrumentation platform. It turns a compact onboard computer into a data hub and displays charts, instruments and AIS on connected screens.' : 'Open Marine es nuestra plataforma abierta de navegación e instrumentación. Convierte un ordenador compacto a bordo en el centro de datos del barco y muestra cartas, instrumentos y AIS en cualquier pantalla.' }}
        </p>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">{{ english ? 'How it works' : 'Cómo funciona' }}</p>
        <ol class="steps">
          <li>{{ english ? 'Sensors: GPS, depth, wind, AIS, IMU and compatible NMEA instruments.' : 'Sensores: GPS, sonda, anemómetro, AIS, IMU y el resto de instrumentos NMEA 0183 o NMEA 2000.' }}</li>
          <li>{{ english ? 'Open Marine Hub: the gateway makes sensor data available through Signal K.' : 'Open Marine Hub: la pasarela de sensores normaliza los datos y los publica en Signal K.' }}</li>
          <li>{{ english ? 'Onboard services: charts, autopilot and alarms run locally.' : 'Servicios a bordo: motor de cartas, piloto automático y alarmas se ejecutan en local, sin Internet.' }}</li>
          <li>{{ english ? 'Screens: tablets and computers connect over Wi-Fi using a browser.' : 'Pantallas: tablets, móviles y portátiles abren el navegador por Wi-Fi, sin instalar apps.' }}</li>
        </ol>
      </div>
    </section>

    <section class="services bg-soft section-pad">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">{{ english ? 'Modules' : 'Módulos' }}</p>
            <h2 class="display h-lg">{{ english ? 'Software and hardware' : 'Software y hardware' }}<br /><em>Open Marine.</em></h2>
          </div>
          <p class="heading-note">{{ english ? 'Choose individual modules or a complete system configured for your vessel.' : 'Elige piezas sueltas o un sistema completo, instalado y configurado para tu embarcación.' }}</p>
        </div>
        @for (kind of kinds; track kind) {
        <h3 class="display h-md" style="margin: 40px 0 24px">{{ kind === 'Software' ? (english ? 'Navigation software' : 'Software de navegación') : (english ? 'Custom hardware' : 'Hardware a medida') }}</h3>
        <div class="service-grid two">
          @for (p of byKind(kind); track p.slug; let i = $index) {
            <article class="service-card">
              <div class="card-content">
                <span class="card-number">0{{ i + 1 }} / {{ p.kind }}</span>
                <h3>{{ english ? catalogEn[p.slug].name : p.name }}</h3>
                <p>{{ english ? catalogEn[p.slug].description : p.tagline }}</p>
                <a class="arrow-link stretched" [routerLink]="[english ? '/en/technology' : '/tecnologia', p.slug]">{{ english ? 'View details' : 'Ver detalles' }} <span aria-hidden="true">↗</span></a>
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
          <p class="eyebrow">{{ english ? 'Why open' : 'Por qué abierto' }}</p>
          <h2 class="display h-md">{{ english ? 'Your boat, your data,' : 'Tu barco, tus datos,' }}<br /><em>{{ english ? 'your decisions.' : 'tus decisiones.' }}</em></h2>
          <ul class="checklist" style="margin-top: 28px">
            <li>{{ english ? 'Integrate compatible equipment from different manufacturers.' : 'Mezcla equipos de distintos fabricantes sin pasarelas propietarias.' }}</li>
            <li>{{ english ? 'Replace or expand components without changing the entire system.' : 'Sustituye o amplía piezas sin cambiar todo el sistema.' }}</li>
            <li>{{ english ? 'Your navigation data remains on your boat.' : 'Tus datos de navegación se quedan en tu barco.' }}</li>
            <li>{{ english ? 'Auditable software tested using a simulation bench.' : 'Software auditable, probado con un banco de simulación antes de cada versión.' }}</li>
            <li>{{ english ? 'Use authorised chart data and respect commercial licences.' : 'Cartografía exclusivamente legal: respetamos las licencias de las cartas comerciales.' }}</li>
          </ul>
          <div class="hero-actions">
            <a class="button button-dark" [routerLink]="english ? '/en/shop' : '/tienda'">{{ english ? 'Visit the shop' : 'Ir a la tienda' }} <span aria-hidden="true">↗</span></a>
            <a class="text-link" [routerLink]="english ? '/en/contact' : '/contacto'" [queryParams]="{ tema: 'tecnologia' }">{{ english ? 'Request a demonstration' : 'Solicitar una demostración' }} <span>→</span></a>
          </div>
        </div>
        <div class="product-photo"><img [src]="images.tech" [alt]="english ? 'Electronics and systems development' : 'Electrónica y desarrollo de sistemas'" loading="lazy" /></div>
      </div>
    </section>
  `,
})
export class OpenMarine {
  protected readonly english = inject(ActivatedRoute).snapshot.data['language'] === 'en';
  protected readonly catalogEn = CATALOG_EN;
  protected readonly kinds = ['Software', 'Hardware'] as const;
  protected readonly byKind = (kind: 'Software' | 'Hardware') => PRODUCTS.filter((product) => product.kind === kind);
  protected readonly images = IMAGES;

  constructor() {
    inject(SeoService).set({
      title: this.english ? 'Open Marine technology' : 'Tecnología náutica abierta Open Marine',
      description: this.english ? 'Open Marine integrates navigation instruments and local charts using Signal K.' : 'Open Marine integra GPS, AIS, sonda, viento y piloto automático en un sistema abierto basado en Signal K, con cartas náuticas offline en cualquier tablet de a bordo.',
      path: this.english ? '/en/technology' : '/tecnologia',
      language: this.english ? 'en' : 'es',
      alternates: [{ language: 'es', path: '/tecnologia' }, { language: 'en', path: '/en/technology' }],
      jsonLd: [breadcrumb([{ name: 'Tecnología', path: '/tecnologia' }])],
    });
  }
}
