import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Vertical rhythm container. */
@Component({
  selector: 'marea-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-component': 'marea-stack',
    '[style.--marea-stack-gap]': 'gapValue()',
  },
  template: '<ng-content />',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--marea-stack-gap, var(--marea-space-4));
      min-inline-size: 0;
    }
  `,
})
export class MareaStack {
  readonly gap = input<1 | 2 | 3 | 4 | 5 | 6 | 8>(4);

  gapValue(): string {
    return `var(--marea-space-${this.gap()})`;
  }
}
