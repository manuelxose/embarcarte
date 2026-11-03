import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaIds } from '../../core/ids';
import { MareaText } from '../foundation/marea-text';

export interface MareaAccordionItem {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly note?: string | null;
}

/**
 * Native disclosure accordion.
 *
 * Each item is a `<details>`/`<summary>` pair, so keyboard operation, the
 * expanded/collapsed announcement and the marker come from the browser and no
 * ARIA or JavaScript state is added. In `single` mode every `<details>` shares
 * one generated `name`, which gives exclusive-accordion behaviour natively.
 */
@Component({
  selector: 'marea-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaText],
  host: { 'data-marea-component': 'marea-accordion' },
  template: `
    <div class="items">
      @for (item of items(); track item.id) {
        <details class="item" [attr.name]="mode() === 'single' ? groupName : null">
          <summary class="summary">{{ item.title }}</summary>
          <p class="body" marea-text variant="bodySmall">{{ item.body }}</p>
          @if (item.note) {
            <p class="note" marea-text variant="meta">{{ item.note }}</p>
          }
        </details>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .items {
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .item {
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .summary {
      min-block-size: var(--marea-control-md);
      padding: var(--marea-space-3) var(--marea-space-1);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-heading-size);
      line-height: var(--marea-type-heading-line-height);
      font-weight: 600;
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
      cursor: pointer;
    }
    .summary::marker {
      color: var(--marea-action);
    }
    .summary:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    .body {
      padding: 0 var(--marea-space-1) var(--marea-space-2) var(--marea-space-5);
      overflow-wrap: anywhere;
    }
    .note {
      padding: 0 var(--marea-space-1) var(--marea-space-4) var(--marea-space-5);
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaAccordion {
  readonly items = input.required<readonly MareaAccordionItem[]>();
  readonly mode = input<'single' | 'multiple'>('multiple');

  readonly groupName = inject(MareaIds).next('accordion');
}
