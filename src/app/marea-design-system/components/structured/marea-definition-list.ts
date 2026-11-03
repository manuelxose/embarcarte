import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaIds } from '../../core/ids';
import { MareaText } from '../foundation/marea-text';

export interface MareaDefinitionItem {
  readonly term: string;
  readonly definition: string;
  readonly note?: string | null;
}

/**
 * Native definition list.
 *
 * `<dl>`/`<dt>`/`<dd>` carry the term/definition semantics. When a visible
 * label is supplied it is rendered as a heading paragraph and referenced with
 * `aria-labelledby`, so the list has one accessible name without extra ARIA.
 */
@Component({
  selector: 'marea-definition-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaText],
  host: { 'data-marea-component': 'marea-definition-list' },
  template: `
    @if (label()) {
      <p class="label" [id]="labelId" marea-text variant="label" tone="action">{{ label() }}</p>
    }
    <dl class="list" [attr.aria-labelledby]="label() ? labelId : null">
      @for (item of items(); track $index) {
        <dt class="term">{{ item.term }}</dt>
        <dd class="definition">
          {{ item.definition }}
          @if (item.note) {
            <span class="note">{{ item.note }}</span>
          }
        </dd>
      }
    </dl>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .label {
      margin: 0 0 var(--marea-space-3);
    }
    .list {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-columns: minmax(7rem, max-content) 1fr;
      gap: var(--marea-space-2) var(--marea-space-4);
      margin: 0;
      padding: 0;
    }
    .term {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
    .definition {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      margin: 0;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
    .note {
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
    }
    @media (max-width: 767px) {
      .list {
        grid-template-columns: 1fr;
        gap: 0;
      }
      .term {
        margin-block-start: var(--marea-space-3);
      }
      .definition {
        margin-block-end: var(--marea-space-3);
      }
    }
  `,
})
export class MareaDefinitionList {
  readonly label = input<string | null>(null);
  readonly items = input.required<readonly MareaDefinitionItem[]>();

  readonly labelId = inject(MareaIds).next('definition-list');
}
