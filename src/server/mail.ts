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

/** Envía un email si hay SMTP configurado; si no, lo deja en el log. Nunca lanza. */
export const sendMail = async (to: string, subject: string, text: string, replyTo?: string): Promise<void> => {
  if (!transport) {
    console.warn(`[mail] SMTP no configurado. Para ${to}: ${subject}\n${text}`);
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
    console.error('[mail] error enviando email', err);
  }
};
