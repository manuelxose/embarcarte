import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaText } from '../foundation/marea-text';

/**
 * Honest availability-withheld block. The only input is an opaque MC-16 state
 * code: no quantity exists in this API and no availability claim is made.
 */
@Component({
  selector: 'marea-stock-unavailable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-stock-unavailable' },
  imports: [MareaText],
  template: `
    <section class="stock-unavailable">
      <h4 marea-text variant="heading" class="heading">{{ i18n.text('stockUnavailableHeading') }}</h4>
      <p marea-text variant="bodySmall" tone="secondary" class="body">{{ i18n.text('stockUnavailable') }}</p>
      @if (stockState()) {
        <p marea-text variant="meta" class="meta">{{ i18n.text('status') }} · {{ stockState() }}</p>
      }
      <p marea-text variant="label" tone="warning" class="sale">{{ i18n.text('notForSale') }}</p>
    </section>
  `,
  styles: `
    :host { display: block; min-inline-size: 0; color: var(--marea-text-primary); }
    .stock-unavailable { display: grid;
      grid-template-columns: minmax(0, 1fr); gap: var(--marea-space-1); min-inline-size: 0; }
    .heading, .body, .meta, .sale { margin: 0; }
    .meta { overflow-wrap: anywhere; }
  `,
})
export class MareaStockUnavailable {
  /** Opaque MC-16 availability state code; never a quantity. */
  readonly stockState = input<string | null>(null);

  readonly i18n = inject(MareaI18n);
}
