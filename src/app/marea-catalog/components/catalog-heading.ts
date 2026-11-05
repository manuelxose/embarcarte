import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';

/**
 * Section heading with a stable id.
 *
 * The wrapper carries the id so the enclosing `<section aria-labelledby>` has a
 * real accessible name. The visible heading itself is the verified MC-17
 * component; no heading level is duplicated.
 */
@Component({
  selector: 'marea-catalog-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaSectionHeading],
  template: `
    <div class="heading" [id]="headingId()">
      <marea-section-heading [heading]="heading()" [kicker]="kicker()" [lead]="lead()" />
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .heading {
      display: block;
      scroll-margin-block-start: var(--marea-space-6);
    }
  `,
})
export class MareaCatalogHeading {
  readonly headingId = input.required<string>();
  readonly heading = input.required<string>();
  readonly kicker = input<string | null>(null);
  readonly lead = input<string | null>(null);
}
