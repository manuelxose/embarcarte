import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Responsive grid that wraps by intrinsic minimum width instead of switching
 * between two fixed layouts. Children never force horizontal page overflow.
 */
@Component({
  selector: 'marea-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-component': 'marea-grid',
    '[style.--marea-grid-min]': 'minItem()',
    '[class]': "'marea-grid marea-grid--' + gap()",
  },
  template: '<ng-content />',
  styles: `
    :host {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--marea-grid-min, 240px)), 1fr));
      gap: var(--marea-gutter-md, 24px);
      align-items: start;
    }
    :host(.marea-grid--compact) {
      gap: var(--marea-space-3);
    }
    :host(.marea-grid--roomy) {
      gap: var(--marea-space-6);
    }
    @media (max-width: 767px) {
      :host {
        grid-template-columns: 1fr;
        gap: var(--marea-gutter-sm, 16px);
      }
    }
  `,
})
export class MareaGrid {
  /** CSS length for the minimum comfortable column width. */
  readonly minItem = input<string>('240px');
  readonly gap = input<'compact' | 'default' | 'roomy'>('default');
}
