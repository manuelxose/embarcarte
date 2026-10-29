import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumb } from '../core/seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container narrow">
        <p class="eyebrow">Sobre nosotros</p>
        <h1>Navegantes que construyen tecnología náutica</h1>
        <p class="lead">
          Embarcarte nace para acercar a cualquier embarcación una electrónica de navegación moderna, abierta y
          mantenible. Somos la empresa que desarrolla y comercializa los proyectos náuticos de la familia Open Marine.
        </p>
      </div>
    </section>
    <section class="section">
      <div class="container narrow prose">
        <h2>Nuestra forma de trabajar</h2>
        <p>
          Cada sistema se prueba primero en un banco de simulación que reproduce viento, corriente, AIS y fallos de
          sensores. Solo después lo llevamos al barco. Así reducimos sorpresas en el agua.
        </p>
        <p>
          Apostamos por estándares abiertos como Signal K y NMEA para que tu inversión no dependa de un único fabricante,
          y por la seguridad por diseño: el piloto automático incluye parada de emergencia física y vigilancia
          permanente de la comunicación.
        </p>
        <h2>Proyectos</h2>
        <p>
          Open Marine es nuestra primera línea de producto: software de navegación, cartografía local, ordenador de a bordo
          y piloto automático. Seguimos ampliando el catálogo con nuevos proyectos náuticos.
        </p>
        <p><a routerLink="/contacto" class="btn">Contacta con nosotros</a></p>
      </div>
    </section>
  `,
})
export class About {
  constructor() {
    inject(SeoService).set({
      title: 'Sobre Embarcarte',
      description:
        'Embarcarte desarrolla y comercializa tecnología náutica abierta: la plataforma Open Marine de navegación, ' +
        'cartografía e instrumentación para embarcaciones.',
      path: '/sobre-nosotros',
      jsonLd: [breadcrumb([{ name: 'Sobre nosotros', path: '/sobre-nosotros' }])],
    });
  }
}
