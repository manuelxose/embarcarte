import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaText } from '../foundation/marea-text';

/**
 * Honest price-withheld block. The only commercial input is an opaque MC-16
 * status code: no amount, currency or numeric value can enter this component.
 */
@Component({
  selector: 'marea-price-unavailable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-price-unavailable' },
  imports: [MareaText],
  template: `
    <section class="price-unavailable">
      <h4 marea-text variant="heading" class="heading">{{ heading() ?? i18n.text('priceUnavailableHeading') }}</h4>
      <p marea-text variant="bodySmall" tone="secondary" class="body">{{ i18n.text('priceUnavailable') }}</p>
      @if (priceStatus()) {
        <p marea-text variant="meta" class="meta">{{ i18n.text('status') }} · {{ priceStatus() }}</p>
      }
      <p marea-text variant="label" tone="warning" class="sale">{{ i18n.text('notForSale') }}</p>
    </section>
  `,
  styles: `
    :host { display: block; min-inline-size: 0; color: var(--marea-text-primary); }
    .price-unavailable { display: grid; gap: var(--marea-space-1); min-inline-size: 0; }
    .heading, .body, .meta, .sale { margin: 0; }
    .meta { overflow-wrap: anywhere; }
  `,
})
export class MareaPriceUnavailable {
  /** Opaque MC-16 price status code; never an amount. */
  readonly priceStatus = input<string | null>(null);
  readonly heading = input<string | null>(null);

  readonly i18n = inject(MareaI18n);
}
