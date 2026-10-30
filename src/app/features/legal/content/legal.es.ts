import type { LegalPageId, LegalText } from '../models/legal';

/**
 * Published Spanish legal copy, transcribed verbatim from the previous
 * `pages/legal.ts`. Legal wording is not edited, generated or reordered here.
 */
export const LEGAL_ES: Record<LegalPageId, LegalText> = {
  legalNotice: {
    title: 'Aviso legal',
    blocks: [
      {
        paragraphs: [
          'En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico ' +
            '(LSSI-CE), se informa de los datos del titular de este sitio web:',
        ],
        ownerDetails: true,
      },
      {
        heading: 'Condiciones de uso',
        paragraphs: [
          'El acceso a este sitio implica la aceptación de estas condiciones. Los contenidos tienen carácter ' +
            'informativo y no constituyen una oferta vinculante. Los precios y especificaciones se confirman en cada ' +
            'presupuesto.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        paragraphs: [
          'Los textos, diseños y marcas de este sitio pertenecen a {owner} o a sus licenciantes. El software ' +
            'Open Marine distribuido como código abierto se rige por su propia licencia.',
        ],
      },
      {
        heading: 'Seguridad en la navegación',
        paragraphs: [
          'Los sistemas de ayuda a la navegación no sustituyen la vigilancia, la cartografía oficial ni el criterio del ' +
            'patrón. El usuario es responsable de la navegación segura de su embarcación.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Política de privacidad',
    blocks: [
      { paragraphs: ['Responsable del tratamiento: {owner}. Contacto: {email}.'] },
      {
        heading: 'Qué datos tratamos y para qué',
        paragraphs: [
          'Los datos que nos envías a través del formulario de contacto (nombre, email, teléfono y mensaje) se usan ' +
            'exclusivamente para responder a tu consulta y, en su caso, preparar un presupuesto.',
          'Si creas una cuenta o haces un pedido, tratamos tus datos de cuenta, envío y pedidos para gestionar la ' +
            'compra, la entrega, la facturación y la garantía. Los pagos con tarjeta los procesa Stripe; no almacenamos ' +
            'los datos de tu tarjeta.',
        ],
      },
      {
        heading: 'Base legal y conservación',
        paragraphs: [
          'La base legal es tu consentimiento y la aplicación de medidas precontractuales a tu solicitud. Conservamos ' +
            'los datos el tiempo necesario para atender la consulta y durante los plazos legales aplicables.',
        ],
      },
      {
        heading: 'Destinatarios',
        paragraphs: ['No cedemos tus datos a terceros salvo obligación legal o proveedores técnicos necesarios (alojamiento y correo).'],
      },
      {
        heading: 'Tus derechos',
        paragraphs: [
          'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo ' +
            'a {email}. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).',
        ],
      },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    blocks: [
      {
        paragraphs: [
          'Este sitio web no utiliza cookies de analítica, publicidad ni seguimiento. Solo usa elementos técnicos ' +
            'estrictamente necesarios, que no requieren consentimiento:',
        ],
        list: [
          {
            label: 'emb_session',
            text: '(cookie): mantiene tu sesión iniciada en el área de cliente. Caduca a los 30 días o al cerrar sesión.',
          },
          {
            label: 'emb_cart',
            text: '(almacenamiento local del navegador): recuerda los productos de tu carrito.',
          },
        ],
      },
      {
        paragraphs: [
          'Las fotografías se cargan desde Unsplash, que puede registrar tu dirección IP al servirlas.',
          'Si en el futuro incorporamos otro tipo de cookies, actualizaremos esta política y te pediremos permiso.',
        ],
      },
    ],
  },
  termsOfSale: {
    title: 'Condiciones de venta',
    blocks: [
      {
        paragraphs: [
          'Estas condiciones regulan las compras realizadas en la tienda de embarcarte.com, cuyo vendedor es {owner}.',
        ],
      },
      {
        heading: 'Pedidos y precios',
        paragraphs: [
          'Los precios se muestran en euros e incluyen el IVA aplicable. El pedido se considera aceptado cuando te ' +
            'enviamos la confirmación por email. Si un producto no estuviera disponible, te avisaremos y te ' +
            'devolveremos el importe pagado.',
        ],
      },
      {
        heading: 'Formas de pago',
        paragraphs: ['Tarjeta (a través de Stripe) o transferencia bancaria. Los pedidos por transferencia se preparan al recibir el pago.'],
      },
      {
        heading: 'Envío y plazos',
        paragraphs: ['Te indicaremos el plazo y el coste de envío o instalación antes de preparar el pedido.'],
      },
      {
        heading: 'Derecho de desistimiento',
        paragraphs: [
          'Como consumidor, dispones de 14 días naturales desde la recepción para desistir de la compra sin indicar el ' +
            'motivo, escribiendo a {email}. Devolveremos el importe en un máximo de 14 días desde que ' +
            'recibamos el producto en su estado original. No aplica a productos configurados o fabricados a medida.',
        ],
      },
      {
        heading: 'Garantía',
        paragraphs: ['Los productos tienen la garantía legal de conformidad de tres años prevista en la normativa de consumo.'],
      },
      {
        heading: 'Resolución de conflictos',
        paragraphs: ['Puedes dirigirte a nosotros en {email} o a los servicios de consumo de tu comunidad autónoma.'],
      },
    ],
  },
};
