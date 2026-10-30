import type { Locale } from '../../core/i18n/locale.types';
import type { OrderSummary } from '../../core/models';
import { translate } from '../../i18n/dictionary';

/** Payment method as shown to a customer; the stored value never changes. */
export const paymentLabel = (method: OrderSummary['payment_method'], locale: Locale): string =>
  translate(locale, method === 'tarjeta' ? 'payment.tarjeta' : 'payment.transferencia');
