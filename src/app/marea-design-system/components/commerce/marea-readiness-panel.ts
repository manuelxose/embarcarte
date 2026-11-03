import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import type { MareaReadinessStatus, MareaReadinessSummary, MareaTone } from '../../core/types';
import { MareaStatusBadge } from '../foundation/marea-status-badge';
import { MareaText } from '../foundation/marea-text';

const READINESS_TONE: Readonly<Record<MareaReadinessStatus, MareaTone>> = {
  READY: 'safe',
  NOT_READY: 'warning',
  BLOCKED: 'critical',
  NOT_ASSESSED: 'neutral',
};

const READINESS_COPY: Readonly<Record<MareaReadinessStatus, MareaCopyKey>> = {
  READY: 'ready',
  NOT_READY: 'notReady',
  BLOCKED: 'blocked',
  NOT_ASSESSED: 'notAssessed',
};

/**
 * Readiness panel. Only derived labels and an opaque blocked-gate count are
 * rendered; gate evidence stays in the domain layer and no lifecycle state is
 * promoted here.
 */
@Component({
  selector: 'marea-readiness-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-readiness-panel' },
  imports: [MareaStatusBadge, MareaText],
  template: `
    <section class="panel">
      <h3 marea-text variant="heading" class="heading">{{ heading() ?? i18n.text('readiness') }}</h3>
      <div class="overall">
        <span
          marea-status-badge
          [tone]="readinessTone(summary().overall)"
          [label]="readinessLabel(summary().overall)"
        ></span>
      </div>
      <p marea-text variant="bodySmall" tone="secondary" class="note">{{ i18n.text('derivedReadiness') }}</p>
      <ul class="dimensions">
        @for (dimension of summary().dimensions; track dimension.dimension) {
          <li class="dimension">
            <div class="dimension-head">
              <span marea-text variant="label" class="dimension-label">{{ dimension.label }}</span>
              <span
                marea-status-badge
                [tone]="readinessTone(dimension.status)"
                [label]="readinessLabel(dimension.status)"
              ></span>
            </div>
            @if (dimension.note) {
              <p marea-text variant="bodySmall" tone="secondary" class="dimension-note">{{ dimension.note }}</p>
            }
          </li>
        }
      </ul>
      <p marea-text variant="meta" class="gates">{{ i18n.text('blockedGates') }} · {{ gateSummary() }}</p>
    </section>
  `,
  styles: `
    :host { display: block; min-inline-size: 0; color: var(--marea-text-primary); }
    .panel { display: grid; gap: var(--marea-space-3); min-inline-size: 0; }
    .heading, .note, .gates { margin: 0; }
    .overall { display: flex; flex-wrap: wrap; gap: var(--marea-space-2); }
    .dimensions { display: grid; gap: var(--marea-space-2); margin: 0; padding: 0; list-style: none; }
    .dimension {
      display: grid;
      gap: var(--marea-space-1);
      padding-block-end: var(--marea-space-2);
      border-block-end: var(--marea-border-width-hairline, 1px) solid var(--marea-line);
      min-inline-size: 0;
    }
    .dimension:last-child { padding-block-end: 0; border-block-end: 0; }
    .dimension-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--marea-space-2);
    }
    .dimension-label { font-weight: 600; overflow-wrap: anywhere; }
    .dimension-note { margin: 0; }
  `,
})
export class MareaReadinessPanel {
  readonly summary = input.required<MareaReadinessSummary>();
  readonly heading = input<string | null>(null);

  readonly i18n = inject(MareaI18n);

  readonly gateSummary = computed(() => {
    const count = this.summary().blockedGateIds.length;
    return count > 0 ? String(count) : this.i18n.text('noneRecorded');
  });

  readinessTone(status: MareaReadinessStatus): MareaTone {
    return READINESS_TONE[status] ?? 'neutral';
  }

  readinessLabel(status: MareaReadinessStatus): string {
    return this.i18n.text(READINESS_COPY[status] ?? 'notAssessed');
  }
}
