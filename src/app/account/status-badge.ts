import { Component, computed, input } from '@angular/core';
import { OrderStatus } from '../core/models';

const CLASSES: Record<OrderStatus, string> = {
  pendiente: 'badge warn',
  pagado: 'badge',
  enviado: 'badge',
  completado: 'badge ok',
  cancelado: 'badge danger',
};

@Component({
  selector: 'app-status-badge',
  template: `<span [class]="cls()">{{ status() }}</span>`,
})
export class StatusBadge {
  readonly status = input.required<OrderStatus>();
  protected readonly cls = computed(() => CLASSES[this.status()] ?? 'badge');
}
