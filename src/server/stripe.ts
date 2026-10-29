import { createHmac, timingSafeEqual } from 'node:crypto';

const secretKey = () => process.env['STRIPE_SECRET_KEY'];
export const stripeEnabled = () => !!secretKey();

interface LineItem {
  name: string;
  unit_cents: number;
  qty: number;
}

/** Crea una sesión de Stripe Checkout y devuelve su id y URL. */
export const createCheckoutSession = async (
  orderId: number,
  email: string,
  items: LineItem[],
  siteUrl: string,
): Promise<{ id: string; url: string }> => {
  const form = new URLSearchParams({
    mode: 'payment',
    customer_email: email,
    client_reference_id: String(orderId),
    'metadata[order_id]': String(orderId),
    success_url: `${siteUrl}/cuenta/pedidos/${orderId}?pago=ok`,
    cancel_url: `${siteUrl}/cuenta/pedidos/${orderId}?pago=cancelado`,
    locale: 'es',
  });
  items.forEach((item, i) => {
    form.set(`line_items[${i}][quantity]`, String(item.qty));
    form.set(`line_items[${i}][price_data][currency]`, 'eur');
    form.set(`line_items[${i}][price_data][unit_amount]`, String(item.unit_cents));
    form.set(`line_items[${i}][price_data][product_data][name]`, item.name);
  });
  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${secretKey()}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
  });
  const body = (await res.json()) as { id?: string; url?: string; error?: { message: string } };
  if (!res.ok || !body.id || !body.url) {
    throw new Error(`Stripe: ${body.error?.message ?? res.status}`);
  }
  return { id: body.id, url: body.url };
};

/** Verifica la cabecera Stripe-Signature (esquema v1, tolerancia de 5 minutos). */
export const verifyWebhook = (rawBody: Buffer, header: string | undefined): boolean => {
  const secret = process.env['STRIPE_WEBHOOK_SECRET'];
  if (!secret || !header) return false;
  const parts = Object.fromEntries(header.split(',').map((kv) => kv.split('=') as [string, string]));
  const timestamp = Number(parts['t']);
  if (!timestamp || Math.abs(Date.now() / 1000 - timestamp) > 300) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody.toString('utf8')}`).digest();
  return header
    .split(',')
    .filter((kv) => kv.startsWith('v1='))
    .some((kv) => {
      const given = Buffer.from(kv.slice(3), 'hex');
      return given.length === expected.length && timingSafeEqual(given, expected);
    });
};
