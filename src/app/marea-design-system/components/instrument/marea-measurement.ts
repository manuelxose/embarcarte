import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Measurement label/unit annotation.
 *
 * Carries no numeric value, so it cannot present a reading on its own; callers
 * place it next to a demo-labelled readout. The unit is rendered in the shared
 * uppercase unit style with the tracking token, and the line wraps instead of
 * clipping on narrow instrument tiles.
 */
@Component({
  selector: 'marea-measurement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-measurement' },
  template: `
    <span class="label">{{ label() }}</span>
    <span class="unit">{{ unit() }}</span>
    @if (detail()) {
      <span class="detail">{{ detail() }}</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: baseline;
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
    .unit {
      font-family: var(--marea-type-unit-family);
      font-size: var(--marea-type-unit-size);
      line-height: var(--marea-type-unit-line-height);
      font-weight: var(--marea-type-unit-weight);
      letter-spacing: var(--marea-type-unit-tracking);
      text-transform: var(--marea-type-unit-transform);
      color: var(--marea-text-meta);
    }
    .detail {
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
export class MareaMeasurement {
  readonly label = input.required<string>();
  readonly unit = input.required<string>();
  readonly detail = input<string | null>(null);
}
