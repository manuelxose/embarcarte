import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n, formatAge, type MareaCopyKey } from '../../core/i18n';
import type { MareaFreshnessState, MareaTone } from '../../core/types';
import { MareaStatusBadge } from '../foundation/marea-status-badge';

const FRESHNESS_TONE: Readonly<Record<MareaFreshnessState, MareaTone>> = {
  FRESH: 'safe',
  STALE: 'stale',
  OFFLINE: 'critical',
  NO_DATA: 'stale',
};

const FRESHNESS_LABEL: Readonly<Record<MareaFreshnessState, MareaCopyKey>> = {
  FRESH: 'fresh',
  STALE: 'stale',
  OFFLINE: 'offline',
  NO_DATA: 'noData',
};

/**
 * Data-freshness marker for a synthetic readout.
 *
 * The badge component renders a shape-coded icon AND the text label, so freshness
 * is never conveyed by colour alone. A stale state always carries the rendered
 * age (`mm:ss`) next to the label; nothing pulses and no timer runs here.
 */
@Component({
  selector: 'marea-freshness',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaStatusBadge],
  host: { 'data-marea-component': 'marea-freshness' },
  template: `<span marea-status-badge [tone]="tone()" [label]="label()"></span>`,
  styles: `
    :host {
      display: inline-flex;
      min-inline-size: 0;
    }
  `,
})
export class MareaFreshness {
  readonly state = input.required<MareaFreshnessState>();
  readonly ageSeconds = input<number | null>(null);

  readonly i18n = inject(MareaI18n);

  readonly tone = computed<MareaTone>(() => FRESHNESS_TONE[this.state()]);

  readonly label = computed<string>(() => {
    const text = this.i18n.text(FRESHNESS_LABEL[this.state()]);
    return this.state() === 'STALE' ? `${text} ${formatAge(this.ageSeconds())}` : text;
  });
}
