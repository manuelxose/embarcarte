import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import type { MareaFreshnessState } from '../../core/types';
import { MareaFreshness } from './marea-freshness';

export type MareaNumericReadoutSize = 'primary' | 'secondary' | 'tertiary';

/**
 * Instrument numeric readout.
 *
 * Presentation specimen only: the value is pre-formatted by the caller, never
 * computed or locale-formatted here. Synthetic demonstration data is marked with
 * a visible `demo` tag; no value is ever presented as live, certified or read
 * from marine hardware. A `null` value renders an em dash plus the "no data"
 * text — never `0` and never a frozen last reading.
 */
@Component({
  selector: 'marea-numeric-readout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaFreshness],
  host: {
    'data-marea-component': 'marea-numeric-readout',
    '[class]': "'marea-numeric-readout marea-numeric-readout--' + size()",
  },
  template: `
    <div class="group" role="group" [attr.aria-label]="label()">
      <span class="label">{{ label() }}</span>
      <span class="figure">
        <span class="value">{{ displayValue() }}</span>
        @if (value() === null) {
          <span class="nodata">{{ i18n.text('noData') }}</span>
        }
        <span class="unit">{{ unit() }}</span>
      </span>
      <span class="sr-only">{{ alternativeText() }}</span>
      <span class="meta">
        @if (demo()) {
          <span class="demo">{{ i18n.text('demo') }}</span>
        }
        <marea-freshness [state]="freshness()" [ageSeconds]="ageSeconds()" />
      </span>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .group {
      display: grid;
      gap: var(--marea-space-1);
      min-inline-size: 0;
    }
    .label {
      font-family: var(--marea-type-label-family);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: var(--marea-type-label-weight);
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-secondary);
      overflow-wrap: anywhere;
    }
    .figure {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .value {
      font-variant-numeric: var(--marea-type-numeric-primary-numeric);
      color: var(--marea-data-primary);
      overflow-wrap: anywhere;
    }
    :host(.marea-numeric-readout--primary) .value {
      font-family: var(--marea-type-numeric-primary-family);
      font-size: var(--marea-type-numeric-primary-size);
      line-height: var(--marea-type-numeric-primary-line-height);
      font-weight: var(--marea-type-numeric-primary-weight);
      letter-spacing: var(--marea-type-numeric-primary-tracking);
    }
    :host(.marea-numeric-readout--secondary) .value {
      font-family: var(--marea-type-numeric-secondary-family);
      font-size: var(--marea-type-numeric-secondary-size);
      line-height: var(--marea-type-numeric-secondary-line-height);
      font-weight: var(--marea-type-numeric-secondary-weight);
      letter-spacing: var(--marea-type-numeric-secondary-tracking);
      font-variant-numeric: var(--marea-type-numeric-secondary-numeric);
    }
    :host(.marea-numeric-readout--tertiary) .value {
      font-family: var(--marea-type-numeric-tertiary-family);
      font-size: var(--marea-type-numeric-tertiary-size);
      line-height: var(--marea-type-numeric-tertiary-line-height);
      font-weight: var(--marea-type-numeric-tertiary-weight);
      letter-spacing: var(--marea-type-numeric-tertiary-tracking);
      font-variant-numeric: var(--marea-type-numeric-tertiary-numeric);
    }
    .unit {
      font-family: var(--marea-type-unit-family);
      font-size: var(--marea-type-unit-size);
      line-height: var(--marea-type-unit-line-height);
      font-weight: var(--marea-type-unit-weight);
      letter-spacing: var(--marea-type-unit-tracking);
      text-transform: var(--marea-type-unit-transform);
      color: var(--marea-text-meta);
      overflow-wrap: anywhere;
    }
    .nodata {
      font-family: var(--marea-type-meta-family);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .demo {
      font-family: var(--marea-type-meta-family);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-internal-banner-text);
      background: var(--marea-internal-banner-surface);
      border: var(--marea-border-width-hairline) solid currentColor;
      border-radius: var(--marea-radius-pill);
      padding: 0 var(--marea-space-1);
      white-space: nowrap;
    }
    .sr-only {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `,
})
export class MareaNumericReadout {
  readonly value = input.required<string | null>();
  readonly unit = input.required<string>();
  readonly label = input.required<string>();
  readonly size = input<MareaNumericReadoutSize>('primary');
  readonly freshness = input<MareaFreshnessState>('FRESH');
  readonly ageSeconds = input<number | null>(null);
  readonly demo = input(true);

  readonly i18n = inject(MareaI18n);

  /** Null renders the em dash; a leading ASCII minus is normalised to U+2212. */
  readonly displayValue = computed<string>(() => {
    const value = this.value();
    if (value === null) return '\u2014';
    return value.replace(/^-/, '\u2212');
  });

  readonly alternativeText = computed<string>(
    () =>
      `${this.label()}: ${this.value() === null ? this.i18n.text('noData') : this.displayValue()} ${this.unit()}`,
  );
}
