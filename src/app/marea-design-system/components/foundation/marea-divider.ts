import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Native horizontal rule; decorative only, always excluded from the accessibility tree. */
@Component({
  selector: 'hr[marea-divider]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-component': 'marea-divider',
    '[class]': "'marea-divider marea-divider--' + spacing()",
    'aria-hidden': 'true',
  },
  template: '',
  styles: `
    :host { display: block; border: 0; border-block-start: var(--marea-border-width-hairline, 1px) solid var(--marea-line); margin: var(--marea-space-4) 0; }
    :host(.marea-divider--tight) { margin: var(--marea-space-2) 0; }
    :host(.marea-divider--loose) { margin: var(--marea-space-8) 0; }
  `,
})
export class MareaDivider {
  readonly spacing = input<'tight' | 'default' | 'loose'>('default');
}
