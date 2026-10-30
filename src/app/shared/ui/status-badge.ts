import { Component, computed, inject, input } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { OrderStatus } from '../../core/models';
import type { TranslationKey } from '../../i18n/dictionary';

const CLASSES: Record<OrderStatus, string> = {
  pendiente: 'badge warn',
  pagado: 'badge',
  enviado: 'badge',
  completado: 'badge ok',
  cancelado: 'badge danger',
};

/** The stored value is the identifier; the label is translated from it. */
const LABELS: Record<OrderStatus, TranslationKey> = {
  pendiente: 'status.pendiente',
  pagado: 'status.pagado',
  enviado: 'status.enviado',
  completado: 'status.completado',
  cancelado: 'status.cancelado',
};

@Component({
  selector: 'app-status-badge',
  template: `<span [class]="cls()">{{ label() }}</span>`,
})
export class StatusBadge {
  readonly status = input.required<OrderStatus>();
  private readonly i18n = inject(TranslationService);
  protected readonly cls = computed(() => CLASSES[this.status()] ?? 'badge');
  protected readonly label = computed(() => this.i18n.t(LABELS[this.status()] ?? 'status.pendiente'));
}
