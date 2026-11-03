import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Fluid content container. Never exceeds the viewport; no horizontal overflow. */
@Component({
  selector: 'marea-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-component': 'marea-container',
    '[class]': "'marea-container marea-container--' + size()",
  },
  template: '<ng-content />',
  styles: `
    :host {
      display: block;
      inline-size: min(100% - 2 * var(--marea-space-4), var(--marea-container-default, 1160px));
      margin-inline: auto;
    }
    :host(.marea-container--narrow) { inline-size: min(100% - 2 * var(--marea-space-4), var(--marea-container-narrow, 800px)); }
    :host(.marea-container--wide) { inline-size: min(100% - 2 * var(--marea-space-4), var(--marea-container-wide, 1360px)); }
    @media (max-width: 479px) { :host { inline-size: calc(100% - 2 * var(--marea-space-3, 12px)); } }
  `,
})
export class MareaContainer {
  readonly size = input<'narrow' | 'default' | 'wide'>('default');
}
