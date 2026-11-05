import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';

export interface MareaComparisonOption {
  readonly id: string;
  readonly label: string;
}

export interface MareaComparisonRow {
  readonly feature: string;
  readonly values: Readonly<Record<string, string | boolean | null>>;
}

/**
 * Feature comparison table.
 *
 * Boolean cells are always translated to `yes`/`no`; a missing or null cell is
 * rendered as `comparisonUnverified` instead of an ambiguous blank, so the table
 * never implies a capability that was not confirmed. The dense table scrolls
 * inside a labelled, focusable region with a visible mobile hint.
 */
@Component({
  selector: 'marea-feature-comparison',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-feature-comparison' },
  template: `
    <p class="hint">{{ i18n.text('scrollHint') }}</p>
    <div class="scroll" role="region" tabindex="0" [attr.aria-label]="caption()">
      <table class="table">
        <caption>
          {{
            caption()
          }}
        </caption>
        <thead>
          <tr>
            <th scope="col">{{ i18n.text('rowHeader') }}</th>
            @for (option of options(); track option.id) {
              <th scope="col">{{ option.label }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track $index) {
            <tr>
              <th scope="row">{{ row.feature }}</th>
              @for (option of options(); track option.id) {
                <td>{{ cellValue(row.values[option.id]) }}</td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .hint {
      margin: 0 0 var(--marea-space-2);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      color: var(--marea-text-secondary);
    }
    .scroll {
      max-inline-size: 100%;
      overflow-x: auto;
      border: var(--marea-border-width-hairline) solid var(--marea-line);
      border-radius: var(--marea-radius-surface);
      background: var(--marea-surface);
    }
    .scroll:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    .table {
      inline-size: 100%;
      border-collapse: collapse;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      color: var(--marea-text-primary);
    }
    caption {
      padding: var(--marea-space-3) var(--marea-space-4);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
      text-align: start;
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-heading-size);
      line-height: var(--marea-type-heading-line-height);
      font-weight: 600;
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
    th,
    td {
      padding: var(--marea-space-2) var(--marea-space-3);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
      text-align: start;
      vertical-align: top;
      overflow-wrap: anywhere;
    }
    thead th {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-secondary);
      background: var(--marea-surface-raised);
    }
    tbody th {
      font-weight: 700;
    }
    tbody tr:last-child > * {
      border-block-end: 0;
    }
    @media (min-width: 768px) {
      .hint {
        display: none;
      }
    }
  `,
})
export class MareaFeatureComparison {
  readonly caption = input.required<string>();
  readonly options = input.required<readonly MareaComparisonOption[]>();
  readonly rows = input.required<readonly MareaComparisonRow[]>();

  readonly i18n = inject(MareaI18n);

  cellValue(value: string | boolean | null | undefined): string {
    if (value === true) return this.i18n.text('yes');
    if (value === false) return this.i18n.text('no');
    if (value === null || value === undefined) return this.i18n.text('comparisonUnverified');
    return value;
  }
}
