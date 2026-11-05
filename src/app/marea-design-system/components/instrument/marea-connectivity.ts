import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import type { MareaConnectivityState, MareaTone } from '../../core/types';
import { MareaStatusBadge } from '../foundation/marea-status-badge';

const CONNECTIVITY_TONE: Readonly<Record<MareaConnectivityState, MareaTone>> = {
  ONLINE: 'safe',
  DEGRADED: 'warning',
  OFFLINE: 'critical',
  UNKNOWN: 'neutral',
};

const CONNECTIVITY_KEY: Readonly<Record<MareaConnectivityState, MareaCopyKey>> = {
  ONLINE: 'online',
  DEGRADED: 'degraded',
  OFFLINE: 'offline',
  UNKNOWN: 'unknown',
};

/**
 * Connectivity marker.
 *
 * The state is carried by a shape-coded badge icon plus its text label. The
 * badge describes a synthetic link state only: it is not a certified, live or
 * hardware-validated connection report. `lastSeen` is always a caller-formatted
 * string and is never computed or formatted here.
 */
@Component({
  selector: 'marea-connectivity',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaStatusBadge],
  host: { 'data-marea-component': 'marea-connectivity' },
  template: `
    <span class="label">{{ i18n.text('connectivity') }}</span>
    <span marea-status-badge [tone]="tone()" [label]="stateLabel()"></span>
    @if (device()) {
      <span class="meta">
        <span class="key">{{ i18n.text('device') }}:</span>
        <span class="value">{{ device() }}</span>
      </span>
    }
    @if (lastSeen()) {
      <span class="meta">
        <span class="key">{{ i18n.text('lastUpdate') }}:</span>
        <span class="value">{{ lastSeen() }}</span>
      </span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .label {
      font-family: var(--marea-type-label-family);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: var(--marea-type-label-weight);
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
    .meta {
      font-family: var(--marea-type-meta-family);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
      overflow-wrap: anywhere;
    }
    .key {
      color: var(--marea-text-secondary);
    }
    .value {
      color: var(--marea-text-primary);
    }
  `,
})
export class MareaConnectivity {
  readonly state = input.required<MareaConnectivityState>();
  readonly device = input<string | null>(null);
  readonly lastSeen = input<string | null>(null);

  readonly i18n = inject(MareaI18n);

  readonly tone = computed<MareaTone>(() => CONNECTIVITY_TONE[this.state()]);
  readonly stateLabel = computed<string>(() => this.i18n.text(CONNECTIVITY_KEY[this.state()]));
}
