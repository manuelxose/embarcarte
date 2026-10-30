import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';

type LegalPage = 'aviso-legal' | 'privacidad' | 'cookies' | 'condiciones-de-venta';

const TITLES: Record<LegalPage, string> = {
  'aviso-legal': 'Aviso legal',
  privacidad: 'Política de privacidad',
  cookies: 'Política de cookies',
  'condiciones-de-venta': 'Condiciones de venta',
};

@Component({
  selector: 'app-legal',
  template: `
    <section class="page-hero">
      <div class="wrap"><p class="eyebrow">Legal</p><h1 class="display h-lg">{{ title }}</h1></div>
    </section>
    <section class="section-pad">
      <div class="wrap-narrow prose">
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
              @if (!legal.taxId || !legal.address) { <li>Datos fiscales y domicilio: pendientes de confirmación.</li> }
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
            <p>
              Si creas una cuenta o haces un pedido, tratamos tus datos de cuenta, envío y pedidos para gestionar la
              compra, la entrega, la facturación y la garantía. Los pagos con tarjeta los procesa Stripe; no almacenamos
              los datos de tu tarjeta.
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
              Este sitio web no utiliza cookies de analítica, publicidad ni seguimiento. Solo usa elementos técnicos
              estrictamente necesarios, que no requieren consentimiento:
            </p>
            <ul>
              <li><strong>emb_session</strong> (cookie): mantiene tu sesión iniciada en el área de cliente. Caduca a los 30 días o al cerrar sesión.</li>
              <li><strong>emb_cart</strong> (almacenamiento local del navegador): recuerda los productos de tu carrito.</li>
            </ul>
            <p>Las fotografías se cargan desde Unsplash, que puede registrar tu dirección IP al servirlas.</p>
            <p>Si en el futuro incorporamos otro tipo de cookies, actualizaremos esta política y te pediremos permiso.</p>
          }
          @case ('condiciones-de-venta') {
            <p>
              Estas condiciones regulan las compras realizadas en la tienda de embarcarte.com, cuyo vendedor es
              {{ legal.owner }}.
            </p>
            <h2>Pedidos y precios</h2>
            <p>
              Los precios se muestran en euros e incluyen el IVA aplicable. El pedido se considera aceptado cuando te
              enviamos la confirmación por email. Si un producto no estuviera disponible, te avisaremos y te
              devolveremos el importe pagado.
            </p>
            <h2>Formas de pago</h2>
            <p>Tarjeta (a través de Stripe) o transferencia bancaria. Los pedidos por transferencia se preparan al recibir el pago.</p>
            <h2>Envío y plazos</h2>
            <p>Te indicaremos el plazo y el coste de envío o instalación antes de preparar el pedido.</p>
            <h2>Derecho de desistimiento</h2>
            <p>
              Como consumidor, dispones de 14 días naturales desde la recepción para desistir de la compra sin indicar el
              motivo, escribiendo a {{ site.email }}. Devolveremos el importe en un máximo de 14 días desde que
              recibamos el producto en su estado original. No aplica a productos configurados o fabricados a medida.
            </p>
            <h2>Garantía</h2>
            <p>Los productos tienen la garantía legal de conformidad de tres años prevista en la normativa de consumo.</p>
            <h2>Resolución de conflictos</h2>
            <p>Puedes dirigirte a nosotros en {{ site.email }} o a los servicios de consumo de tu comunidad autónoma.</p>
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
      alternates: [{ language: 'es', path: `/${this.page}` }, { language: 'en', path: `/en/${({ 'aviso-legal': 'legal-notice', privacidad: 'privacy', cookies: 'cookies', 'condiciones-de-venta': 'terms-of-sale' } as const)[this.page]}` }],
    });
  }
}
