import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import { MareaStatusBadge } from '../foundation/marea-status-badge';
import type { MareaDataStatus, MareaTone } from '../../core/types';

const DATA_STATUS: Readonly<
  Record<MareaDataStatus, { readonly tone: MareaTone; readonly label: MareaCopyKey }>
> = {
  VERIFIED: { tone: 'safe', label: 'verified' },
  PARTIAL: { tone: 'info', label: 'partial' },
  UNVERIFIED: { tone: 'warning', label: 'unverified' },
  STALE: { tone: 'stale', label: 'staleData' },
  MISSING: { tone: 'critical', label: 'missing' },
};

/**
 * Data-quality line for one dimension.
 *
 * The status is mapped to a badge tone and to a text label; "verified" is never
 * inferred here, it is only rendered when the supplied data status is VERIFIED.
 * Optional evidence is shown as an explicit label/value pair, and the component
 * never announces itself (no live region).
 */
@Component({
  selector: 'marea-data-quality',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaStatusBadge],
  host: { 'data-marea-component': 'marea-data-quality' },
  template: `
    <div class="head">
      <span marea-status-badge [tone]="tone()" [label]="badgeLabel()"></span>
      <span class="dimension">{{ dimension() }}</span>
    </div>
    @if (evidence()) {
      <p class="evidence">
        <span class="evidence-label">{{ i18n.text('evidence') }}</span>
        <span class="evidence-value">{{ evidence() }}</span>
      </p>
    }
    @if (note()) {
      <p class="note">{{ note() }}</p>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .dimension {
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-heading-size);
      line-height: var(--marea-type-heading-line-height);
      font-weight: 600;
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
    .evidence {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: var(--marea-space-2);
      margin: 0;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      color: var(--marea-text-primary);
    }
    .evidence-label {
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-secondary);
    }
    .evidence-value {
      overflow-wrap: anywhere;
    }
    .note {
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
export class MareaDataQuality {
  readonly dimension = input.required<string>();
  readonly status = input.required<MareaDataStatus>();
  readonly evidence = input<string | null>(null);
  readonly note = input<string | null>(null);

  readonly i18n = inject(MareaI18n);

  readonly tone = computed<MareaTone>(() => DATA_STATUS[this.status()].tone);
  readonly badgeLabel = computed(() => this.i18n.text(DATA_STATUS[this.status()].label));
}
