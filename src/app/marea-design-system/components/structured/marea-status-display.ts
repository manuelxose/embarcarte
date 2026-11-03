import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MareaIcon } from '../foundation/marea-icon';
import type { MareaIconName } from '../foundation/marea-icon-paths';
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
 * Status line with a semantic tone icon.
 *
 * The icon is decorative: the tone is carried by the visible label (required),
 * and colour is only reinforcement. No live region is added, so a static status
 * is never announced as an update.
 */
@Component({
  selector: 'marea-status-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaIcon],
  host: {
    'data-marea-component': 'marea-status-display',
    '[class]': "'marea-status-display marea-status-display--' + tone()",
  },
  template: `
    <marea-icon [name]="icon()" size="lg" />
    <div class="body">
      <p class="label">{{ label() }}</p>
      @if (description()) {
        <p class="description">{{ description() }}</p>
      }
      @if (meta()) {
        <p class="meta">{{ meta() }}</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: flex-start;
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    marea-icon {
      flex: none;
      color: var(--marea-text-secondary);
    }
    :host(.marea-status-display--critical) marea-icon {
      color: var(--marea-state-critical);
    }
    :host(.marea-status-display--warning) marea-icon {
      color: var(--marea-state-warning);
    }
    :host(.marea-status-display--safe) marea-icon {
      color: var(--marea-state-safe);
    }
    :host(.marea-status-display--stale) marea-icon {
      color: var(--marea-state-stale);
    }
    :host(.marea-status-display--info) marea-icon {
      color: var(--marea-state-info);
    }
    :host(.marea-status-display--neutral) marea-icon {
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
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      font-weight: 700;
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
    .description {
      margin: 0;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      color: var(--marea-text-secondary);
      overflow-wrap: anywhere;
    }
    .meta {
      margin: 0;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaStatusDisplay {
  readonly tone = input.required<MareaTone>();
  readonly label = input.required<string>();
  readonly description = input<string | null>(null);
  readonly meta = input<string | null>(null);

  readonly icon = computed<MareaIconName>(() => TONE_ICON[this.tone()]);
}
