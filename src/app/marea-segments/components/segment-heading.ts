import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';

/**
 * Section heading used by every MC-19 section.
 *
 * The `id` lives on the heading element itself, so the section frame's
 * `aria-labelledby` names the section with the heading text only — not with the
 * lead paragraph. `level` 1 is used once per page (the hero); every other
 * section uses level 2.
 */
@Component({
  selector: 'marea-segment-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaText],
  host: { 'data-marea-component': 'marea-segment-heading' },
  template: `
    @if (kicker()) {
      <p marea-text variant="label" tone="action" class="kicker">{{ kicker() }}</p>
    }
    @if (level() === 1) {
      <h1 marea-text variant="display1" class="heading" [id]="headingId()">{{ heading() }}</h1>
    } @else {
      <h2 marea-text variant="title1" class="heading" [id]="headingId()">{{ heading() }}</h2>
    }
    @if (lead()) {
      <p marea-text variant="body" tone="secondary" class="lead">{{ lead() }}</p>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .kicker,
    .heading,
    .lead {
      margin: 0;
    }
    .lead {
      max-inline-size: var(--marea-measure);
    }
  `,
})
export class MareaSegmentHeading {
  readonly heading = input.required<string>();
  readonly headingId = input.required<string>();
  readonly kicker = input<string | null>(null);
  readonly lead = input<string | null>(null);
  readonly level = input<1 | 2>(2);
}
