import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';

export interface MareaSpecRow {
  readonly label: string;
  readonly value: string;
  readonly note?: string | null;
}

/**
 * Dense two-column specification table.
 *
 * The table keeps a visible `<caption>` and `<th scope>` associations. Dense
 * tables become horizontally scrollable inside a labelled, keyboard-focusable
 * region, with a visible scroll hint below 768px, so the page itself never
 * overflows at 320px. Status is always carried by text, never by colour.
 */
@Component({
  selector: 'marea-spec-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-spec-table' },
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
            <th scope="col">{{ i18n.text('valueLabel') }}</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track $index) {
            <tr>
              <th scope="row">{{ row.label }}</th>
              <td>
                <span class="value">{{ row.value }}</span>
                @if (row.note) {
                  <span class="note">{{ row.note }}</span>
                }
              </td>
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
    .value {
      display: block;
    }
    .note {
      display: block;
      margin-block-start: var(--marea-space-1);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
    }
    @media (min-width: 768px) {
      .hint {
        display: none;
      }
    }
  `,
})
export class MareaSpecTable {
  readonly caption = input.required<string>();
  readonly rows = input.required<readonly MareaSpecRow[]>();

  readonly i18n = inject(MareaI18n);
}
