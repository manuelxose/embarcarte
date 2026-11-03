import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Horizontal group that wraps instead of clipping. */
@Component({
  selector: 'marea-inline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-component': 'marea-inline',
    '[style.--marea-inline-gap]': 'gapValue()',
    '[class]': "'marea-inline marea-inline--' + align()",
  },
  template: '<ng-content />',
  styles: `
    :host { display: flex; flex-wrap: wrap; align-items: center; gap: var(--marea-inline-gap, var(--marea-space-3)); min-inline-size: 0; }
    :host(.marea-inline--between) { justify-content: space-between; }
    :host(.marea-inline--start) { justify-content: flex-start; }
  `,
})
export class MareaInline {
  readonly gap = input<2 | 3 | 4 | 5>(3);
  readonly align = input<'start' | 'between'>('start');

  gapValue(): string {
    return `var(--marea-space-${this.gap()})`;
  }
}
