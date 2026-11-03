import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MareaText } from './marea-text';

/**
 * Section heading with an optional kicker and lead text.
 *
 * `level` must be 2 or 3: the page owns its single `<h1>`, and a component that
 * emitted an `h1` in the middle of a document would break the heading order.
 */
@Component({
  selector: 'marea-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaText],
  host: { 'data-marea-component': 'marea-section-heading' },
  template: `
    <div class="head">
      @if (kicker()) {
        <p class="kicker" marea-text variant="label" tone="action">{{ kicker() }}</p>
      }
      @if (level() === 2) {
        <h2 marea-text [variant]="'title1'">{{ heading() }}</h2>
      } @else {
        <h3 marea-text [variant]="'title2'">{{ heading() }}</h3>
      }
      @if (lead()) {
        <p class="lead" marea-text variant="body" tone="secondary">{{ lead() }}</p>
      }
    </div>
    <div class="actions"><ng-content /></div>
  `,
  styles: `
    :host { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: var(--marea-space-4); margin-block-end: var(--marea-space-5); }
    .head { display: grid; gap: var(--marea-space-2); min-inline-size: 0; }
    .kicker { margin: 0; color: var(--marea-action); }
    .lead { margin-block-start: var(--marea-space-1); max-inline-size: 56ch; }
    .actions { display: flex; flex-wrap: wrap; gap: var(--marea-space-3); }
    @media (max-width: 767px) { :host { align-items: start; } }
  `,
})
export class MareaSectionHeading {
  readonly heading = input.required<string>();
  readonly kicker = input<string | null>(null);
  readonly lead = input<string | null>(null);
  readonly level = input<2 | 3>(2);
}
