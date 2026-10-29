import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';

type LegalPage = 'aviso-legal' | 'privacidad' | 'cookies';

const TITLES: Record<LegalPage, string> = {
  'aviso-legal': 'Aviso legal',
  privacidad: 'Política de privacidad',
  cookies: 'Política de cookies',
};

@Component({
  selector: 'app-legal',
  template: `
    <section class="page-hero">
      <div class="container narrow"><h1>{{ title }}</h1></div>
    </section>
    <section class="section">
      <div class="container narrow prose">
        @switch (page) {
          @case ('aviso-legal') {
            <p>
              En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico
              (LSSI-CE), se informa de los datos del titular de este sitio web:
            </p>
            <ul>
              <li>Titular: {{ legal.owner }}</li>
              @if (legal.taxId) { <li>NIF/CIF: {{ legal.taxId }}</li> }
              @if (legal.address) { <li>Domicilio: {{ legal.address }}</li> }
              @if (legal.registry) { <li>Datos registrales: {{ legal.registry }}</li> }
              <li>Email: {{ site.email }}</li>
            </ul>
            <h2>Condiciones de uso</h2>
            <p>
              El acceso a este sitio implica la aceptación de estas condiciones. Los contenidos tienen carácter
              informativo y no constituyen una oferta vinculante. Los precios y especificaciones se confirman en cada
              presupuesto.
            </p>
            <h2>Propiedad intelectual</h2>
            <p>
              Los textos, diseños y marcas de este sitio pertenecen a {{ legal.owner }} o a sus licenciantes. El software
              Open Marine distribuido como código abierto se rige por su propia licencia.
            </p>
            <h2>Seguridad en la navegación</h2>
            <p>
              Los sistemas de ayuda a la navegación no sustituyen la vigilancia, la cartografía oficial ni el criterio del
              patrón. El usuario es responsable de la navegación segura de su embarcación.
            </p>
          }
          @case ('privacidad') {
            <p>
              Responsable del tratamiento: {{ legal.owner }}. Contacto: {{ site.email }}.
            </p>
            <h2>Qué datos tratamos y para qué</h2>
            <p>
              Los datos que nos envías a través del formulario de contacto (nombre, email, teléfono y mensaje) se usan
              exclusivamente para responder a tu consulta y, en su caso, preparar un presupuesto.
            </p>
            <h2>Base legal y conservación</h2>
            <p>
              La base legal es tu consentimiento y la aplicación de medidas precontractuales a tu solicitud. Conservamos
              los datos el tiempo necesario para atender la consulta y durante los plazos legales aplicables.
            </p>
            <h2>Destinatarios</h2>
            <p>No cedemos tus datos a terceros salvo obligación legal o proveedores técnicos necesarios (alojamiento y correo).</p>
            <h2>Tus derechos</h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo
              a {{ site.email }}. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
            </p>
          }
          @case ('cookies') {
            <p>
              Este sitio web no utiliza cookies de analítica, publicidad ni seguimiento. Solo podrían utilizarse
              cookies técnicas estrictamente necesarias para su funcionamiento, que no requieren consentimiento.
            </p>
            <p>Si en el futuro incorporamos otro tipo de cookies, actualizaremos esta política y te pediremos permiso.</p>
          }
        }
      </div>
    </section>
  `,
})
export class Legal {
  protected readonly site = SITE;
  protected readonly legal = SITE.legal;
  protected readonly page = inject(ActivatedRoute).snapshot.data['page'] as LegalPage;
  protected readonly title = TITLES[this.page];

  constructor() {
    inject(SeoService).set({
      title: this.title,
      description: `${this.title} de ${SITE.name}.`,
      path: `/${this.page}`,
    });
  }
}
