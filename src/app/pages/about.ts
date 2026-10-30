import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">Nosotros</p>
        <h1 class="display h-xl">Más conexión con tu barco.<br /><em>Menos límites.</em></h1>
        <p class="lead">
          En Embarcarte creemos que la tecnología náutica debe ayudarte a navegar, no complicarte la vida. Unimos
          desarrollo técnico, pasión por el mar y servicios pensados desde la experiencia real a bordo.
        </p>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">Cómo trabajamos</p>
        <div class="prose">
          <p>
            Cada sistema se prueba primero en un banco de simulación que reproduce viento, corriente, AIS y fallos de
            sensores. Solo después lo llevamos al barco. Así reducimos sorpresas en el agua.
          </p>
          <p>
            Apostamos por estándares abiertos como Signal K y NMEA para que tu inversión no dependa de un único
            fabricante, y por la seguridad por diseño: el piloto automático incluye parada de emergencia física y
            vigilancia permanente de la comunicación.
          </p>
          <p>
            Además de la tecnología, organizamos experiencias en el mar y trasladamos embarcaciones entre puertos, con la
            misma forma de hacer las cosas: planificación cuidada y comunicación clara.
          </p>
        </div>
      </div>
    </section>

    <section class="manifesto section-pad">
      <div class="manifesto-bg"></div>
      <div class="wrap manifesto-inner">
        <p class="eyebrow">Nuestra filosofía</p>
        <h2 class="display">La mejor tecnología<br />es la que te deja<br /><em>mirar al horizonte.</em></h2>
        <p>Diseñamos para conectar sistemas, compartir conocimiento y dar más control a quienes navegan.</p>
        <a class="button button-outline" routerLink="/contacto">Hablemos <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  `,
})
export class About {
  constructor() {
    inject(SeoService).set({
      title: 'Sobre Embarcarte',
      description:
        'Embarcarte une tecnología náutica abierta, experiencias en el mar y traslados de embarcaciones, con la plataforma Open Marine.',
      path: '/sobre-nosotros',
      alternates: [{ language: 'es', path: '/sobre-nosotros' }, { language: 'en', path: '/en/about' }],
      jsonLd: [breadcrumb([{ name: 'Sobre nosotros', path: '/sobre-nosotros' }])],
    });
  }
}
