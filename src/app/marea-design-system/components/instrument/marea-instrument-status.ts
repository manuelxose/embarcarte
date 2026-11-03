import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import type { MareaTone } from '../../core/types';
import { MareaIcon } from '../foundation/marea-icon';
import type { MareaIconName } from '../foundation/marea-icon-paths';

const TONE_ICON: Readonly<Record<MareaTone, MareaIconName>> = {
  critical: 'critical',
  warning: 'warning',
  safe: 'check',
  stale: 'clock',
  info: 'info',
  neutral: 'square',
};

/**
 * Instrument status line: shape-coded icon, bold label, cause and required action.
 *
 * Colour is never the only encoding. The live-region role is opt-in: a static
 * specimen renders no live region, and `polite`/`assertive` are only for a
 * caller that documents a genuine announcement need. Nothing here delivers an
 * alarm, monitors the vessel or claims safety-critical operation.
 */
@Component({
  selector: 'marea-instrument-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaIcon],
  host: {
    'data-marea-component': 'marea-instrument-status',
    '[class]': "'marea-instrument-status marea-instrument-status--' + tone()",
    '[attr.role]': "live() === 'assertive' ? 'alert' : live() === 'polite' ? 'status' : null",
    '[attr.aria-live]':
      "live() === 'assertive' ? 'assertive' : live() === 'polite' ? 'polite' : null",
  },
  template: `
    <marea-icon [name]="icon()" size="md" />
    <div class="body">
      <p class="label">{{ label() }}</p>
      @if (cause()) {
        <p class="cause">{{ cause() }}</p>
      }
      @if (action()) {
        <p class="action">{{ i18n.text('required') }}: {{ action() }}</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: start;
      gap: var(--marea-space-2);
      min-inline-size: 0;
      color: var(--marea-text-primary);
    }
    :host(.marea-instrument-status--critical) {
      color: var(--marea-state-critical);
    }
    :host(.marea-instrument-status--warning) {
      color: var(--marea-state-warning);
    }
    :host(.marea-instrument-status--safe) {
      color: var(--marea-state-safe);
    }
    :host(.marea-instrument-status--stale) {
      color: var(--marea-state-stale);
    }
    :host(.marea-instrument-status--info) {
      color: var(--marea-state-info);
    }
    :host(.marea-instrument-status--neutral) {
      color: var(--marea-text-secondary);
    }
    .body {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      min-inline-size: 0;
    }
    .label {
      margin: 0;
      font-family: var(--marea-type-heading-family);
      font-size: var(--marea-type-heading-size);
      line-height: var(--marea-type-heading-line-height);
      font-weight: 700;
      color: currentColor;
      overflow-wrap: anywhere;
    }
    .cause {
      margin: 0;
      font-family: var(--marea-type-body-small-family);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      color: var(--marea-text-secondary);
      overflow-wrap: anywhere;
    }
    .action {
      margin: 0;
      font-family: var(--marea-type-label-family);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: var(--marea-type-label-weight);
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaInstrumentStatus {
  readonly tone = input.required<MareaTone>();
  readonly label = input.required<string>();
  readonly cause = input<string | null>(null);
  readonly action = input<string | null>(null);
  readonly live = input<'off' | 'polite' | 'assertive'>('off');

  readonly i18n = inject(MareaI18n);

  readonly icon = computed<MareaIconName>(() => TONE_ICON[this.tone()]);
}
