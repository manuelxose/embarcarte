import nodemailer from 'nodemailer';

const transport = process.env['SMTP_HOST']
  ? nodemailer.createTransport({
      host: process.env['SMTP_HOST'],
      port: Number(process.env['SMTP_PORT'] ?? 587),
      secure: process.env['SMTP_SECURE'] === 'true',
      auth: process.env['SMTP_USER']
        ? { user: process.env['SMTP_USER'], pass: process.env['SMTP_PASS'] }
        : undefined,
    })
  : null;

export const adminInbox = () => process.env['CONTACT_TO'] ?? 'info@embarcarte.com';

/** No se registra el destinatario completo ni el cuerpo: pueden contener datos personales. */
const maskRecipient = (to: string): string => to.replace(/^(.).*(@.*)$/, '$1***$2');

/**
 * Envía un email si hay SMTP configurado. Sin SMTP no se escribe el contenido en
 * el log: los pedidos y mensajes contienen datos personales. Nunca lanza.
 */
export const sendMail = async (to: string, subject: string, text: string, replyTo?: string): Promise<void> => {
  if (!transport) {
    console.warn(`[mail] SMTP no configurado; email omitido (${maskRecipient(to)}): ${subject}`);
    return;
  }
  try {
    await transport.sendMail({
      from: process.env['CONTACT_FROM'] ?? process.env['SMTP_USER'],
      to,
      replyTo,
      subject,
      text,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    console.error(`[mail] error enviando email (${maskRecipient(to)}): ${message}`);
  }
};
