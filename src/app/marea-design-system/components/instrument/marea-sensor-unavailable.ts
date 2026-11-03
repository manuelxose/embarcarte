import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import type { MareaSensorState } from '../../core/types';
import { MareaNotice } from '../foundation/marea-notice';

const SENSOR_STATE_KEY: Readonly<Record<MareaSensorState, MareaCopyKey>> = {
  NOT_INSTALLED: 'sensorNotInstalled',
  NO_SIGNAL: 'sensorNoSignal',
  ERROR: 'sensorError',
  CALIBRATING: 'sensorCalibrating',
  UNLICENSED: 'sensorUnlicensed',
};

/**
 * Unavailable-sensor presentation.
 *
 * The component states that no data exists and never invents a fallback value:
 * there is no numeric input and therefore no `0`, no last reading and no
 * placeholder measurement. The state is carried by the notice icon shape plus
 * visible text, not by colour.
 */
@Component({
  selector: 'marea-sensor-unavailable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaNotice],
  host: { 'data-marea-component': 'marea-sensor-unavailable' },
  template: `
    <marea-notice
      variant="info"
      [heading]="i18n.text('sensorUnavailable')"
      [body]="i18n.text('noDataAvailable')"
    >
      <p class="state">{{ stateText() }}</p>
      @if (unit()) {
        <p class="meta">{{ i18n.text('unit') }}: {{ unit() }}</p>
      }
    </marea-notice>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .state {
      margin: 0;
      font-family: var(--marea-type-label-family);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: var(--marea-type-label-weight);
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
    .meta {
      margin: 0;
      font-family: var(--marea-type-meta-family);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaSensorUnavailable {
  readonly state = input.required<MareaSensorState>();
  readonly unit = input<string | null>(null);

  readonly i18n = inject(MareaI18n);

  readonly stateText = computed<string>(() => this.i18n.text(SENSOR_STATE_KEY[this.state()]));
}
