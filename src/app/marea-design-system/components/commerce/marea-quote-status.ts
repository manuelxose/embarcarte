import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaNotice } from '../foundation/marea-notice';
import { MareaText } from '../foundation/marea-text';

/**
 * Quotation-only statement. It is a category, not an offer: no date, no amount
 * and no quotation commitment are rendered.
 */
@Component({
  selector: 'marea-quote-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-quote-status' },
  imports: [MareaNotice, MareaText],
  template: `
    <marea-notice
      variant="warning"
      [heading]="i18n.text('quotationOnly')"
      [body]="i18n.text('ctaQuoteOnly')"
    >
      @if (scope()) {
        <p marea-text variant="meta" class="scope">{{ scope() }}</p>
      }
    </marea-notice>
  `,
  styles: `
    :host { display: block; min-inline-size: 0; color: var(--marea-text-primary); }
    .scope { margin: 0; overflow-wrap: anywhere; }
  `,
})
export class MareaQuoteStatus {
  /** Optional scope code identifying the entity the quotation category applies to. */
  readonly scope = input<string | null>(null);

  readonly i18n = inject(MareaI18n);
}
