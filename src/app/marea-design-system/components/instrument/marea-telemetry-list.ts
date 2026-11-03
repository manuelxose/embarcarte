import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaIds } from '../../core/ids';
import type { MareaTelemetryItem } from '../../core/types';
import { MareaStatePanel } from '../foundation/marea-state-panel';
import { MareaFreshness } from './marea-freshness';

/**
 * Telemetry definition list for synthetic readings.
 *
 * Every row is a `<dt>`/`<dd>` pair, so label and value keep their programmatic
 * relationship. Values are pre-formatted by the caller, use tabular Manrope
 * figures and render an em dash plus the "no data" text when absent — never `0`
 * and never a frozen last value. Non-fresh rows add the mapped freshness marker
 * (shape-coded icon plus text) and the demo tag marks the whole list as
 * synthetic. No row claims a certified, live or hardware-validated measurement.
 */
@Component({
  selector: 'marea-telemetry-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaFreshness, MareaStatePanel],
  host: { 'data-marea-component': 'marea-telemetry-list' },
  template: `
    @if (caption() || demo()) {
      <div class="head">
        @if (caption()) {
          <p class="caption" [id]="captionId">{{ caption() }}</p>
        }
        @if (demo()) {
          <span class="demo">{{ i18n.text('demo') }}</span>
        }
      </div>
    }
    @if (items().length === 0) {
      <marea-state-panel kind="empty" [title]="i18n.text('noData')" />
    } @else {
      <dl [attr.aria-labelledby]="caption() ? captionId : null">
        @for (item of items(); track item.id) {
          <dt>{{ item.label }}</dt>
          <dd>
            <span class="value">{{ displayValue(item.value) }}</span>
            <span class="unit">{{ item.unit }}</span>
            @if (item.value === null) {
              <span class="nodata">{{ i18n.text('noData') }}</span>
            }
            @if (item.freshness !== 'FRESH') {
              <marea-freshness [state]="item.freshness" [ageSeconds]="item.ageSeconds" />
            }
          </dd>
        }
      </dl>
    }
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--marea-space-2);
      margin-block-end: var(--marea-space-3);
    }
    .caption {
      margin: 0;
      min-inline-size: 0;
      font-family: var(--marea-type-label-family);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: var(--marea-type-label-weight);
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
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
    dl {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-columns: minmax(0, auto) minmax(0, 1fr);
      gap: var(--marea-space-2) var(--marea-space-4);
      margin: 0;
      align-items: baseline;
    }
    dt {
      min-inline-size: 0;
      font-family: var(--marea-type-body-small-family);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      color: var(--marea-text-secondary);
      overflow-wrap: anywhere;
    }
    dd {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: flex-end;
      gap: var(--marea-space-1);
      margin: 0;
      min-inline-size: 0;
      text-align: end;
    }
    .value {
      font-family: var(--marea-type-numeric-tertiary-family);
      font-size: var(--marea-type-numeric-tertiary-size);
      line-height: var(--marea-type-numeric-tertiary-line-height);
      font-weight: var(--marea-type-numeric-tertiary-weight);
      letter-spacing: var(--marea-type-numeric-tertiary-tracking);
      font-variant-numeric: var(--marea-type-numeric-tertiary-numeric);
      color: var(--marea-data-primary);
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
    .nodata {
      font-family: var(--marea-type-meta-family);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
    }
    @media (max-width: 479px) {
      dl {
        grid-template-columns: minmax(0, 1fr);
        gap: var(--marea-space-1);
      }
      dd {
        justify-content: flex-start;
        text-align: start;
        margin-block-end: var(--marea-space-2);
      }
    }
  `,
})
export class MareaTelemetryList {
  readonly items = input.required<readonly MareaTelemetryItem[]>();
  readonly caption = input<string | null>(null);
  readonly demo = input(true);

  readonly i18n = inject(MareaI18n);
  private readonly ids = inject(MareaIds);

  readonly captionId = this.ids.next('telemetry-caption');

  /** Null renders the em dash; a leading ASCII minus is normalised to U+2212. */
  displayValue(value: string | null): string {
    if (value === null) return '\u2014';
    return value.replace(/^-/, '\u2212');
  }
}
