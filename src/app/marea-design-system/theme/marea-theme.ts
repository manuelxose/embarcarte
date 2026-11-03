import { ChangeDetectionStrategy, Component, OnChanges, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../core/i18n';
import type { MareaContext, MareaLocale, MareaMode } from '../core/types';

/**
 * Host for an isolated design-system surface.
 *
 * - Sets the visual mode through `data-marea-mode`; the token layer is scoped to
 *   this element only (never `:root`), so the public website cannot be restyled.
 * - Sets the document locale for the copy dictionary before children render, so
 *   server-rendered markup and hydration agree.
 * - Renders only projected content: no routing, no data fetching, no global state.
 */
@Component({
  selector: 'marea-theme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-theme': '',
    '[attr.data-marea-mode]': 'mode()',
    '[attr.data-marea-context]': 'context()',
    '[attr.lang]': 'locale()',
  },
  template: '<ng-content />',
  styles: `
    :host {
      display: block;
      background: var(--marea-canvas, transparent);
      color: var(--marea-text-primary, inherit);
      font-family: var(--marea-font-body, inherit);
      font-size: var(--marea-type-body-size, 1rem);
      line-height: var(--marea-type-body-line-height, 1.65);
      -webkit-text-size-adjust: 100%;
    }
    :host:focus {
      outline: none;
    }
  `,
})
export class MareaTheme implements OnChanges {
  readonly mode = input<MareaMode>('web-light');
  readonly locale = input<MareaLocale>('es');

  private readonly i18n = inject(MareaI18n);

  readonly context = computed<MareaContext>(() => (this.mode().startsWith('instrument-') ? 'instrument' : 'corporate'));

  ngOnChanges(): void {
    this.i18n.locale.set(this.locale());
  }
}
