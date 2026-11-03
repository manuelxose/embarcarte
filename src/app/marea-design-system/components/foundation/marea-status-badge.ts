import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MareaIcon } from './marea-icon';
import type { MareaIconName } from './marea-icon-paths';
import type { MareaTone } from '../../core/types';

const TONE_ICON: Readonly<Record<MareaTone, MareaIconName>> = {
  critical: 'critical',
  warning: 'warning',
  safe: 'check',
  stale: 'clock',
  info: 'info',
  neutral: 'square',
};

/**
 * Status chip. Colour is never the only encoding: the chip always renders a
 * shape-coded icon AND the supplied text label. A label is a required input, so
 * an icon-only status cannot be produced by this API.
 */
@Component({
  selector: 'span[marea-status-badge]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaIcon],
  host: {
    'data-marea-component': 'marea-status-badge',
    '[class]': "'marea-status-badge marea-status-badge--' + tone()",
  },
  template: `
    <marea-icon [name]="icon()" size="sm" />
    <span class="text">{{ label() }}</span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--marea-space-1);
      padding: 3px var(--marea-space-2);
      border: var(--marea-border-width-hairline) solid currentColor;
      border-radius: var(--marea-radius-pill);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      letter-spacing: 0.02em;
      white-space: normal;
    }
    :host(.marea-status-badge--critical) { color: var(--marea-state-critical); background: var(--marea-state-critical-surface); }
    :host(.marea-status-badge--warning) { color: var(--marea-state-warning); background: var(--marea-state-warning-surface); }
    :host(.marea-status-badge--safe) { color: var(--marea-state-safe); background: var(--marea-state-safe-surface); }
    :host(.marea-status-badge--stale) { color: var(--marea-state-stale); background: var(--marea-state-stale-surface); }
    :host(.marea-status-badge--info) { color: var(--marea-state-info); background: var(--marea-state-info-surface); }
    :host(.marea-status-badge--neutral) { color: var(--marea-text-secondary); background: var(--marea-surface-raised); }
    .text { overflow-wrap: anywhere; }
  `,
})
export class MareaStatusBadge {
  readonly tone = input.required<MareaTone>();
  readonly label = input.required<string>();

  readonly icon = computed<MareaIconName>(() => TONE_ICON[this.tone()]);
}
