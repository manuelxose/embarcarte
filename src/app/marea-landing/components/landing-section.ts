import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MareaContainer } from '../../marea-design-system/components/foundation/marea-container';

/**
 * Landing section frame.
 *
 * A semantic `<section>` with a stable in-page id and an accessible name that
 * points at the section heading rendered by the section itself. The frame owns
 * rhythm, hairline separation and background only; it never owns content.
 *
 * Rhythm steps mobile-first: 40px, 64px from 768px and 80px from 1200px. The top
 * hairline is always drawn (each frame is the root of its own section host), so
 * consecutive sections read as sheets of one technical document.
 */
@Component({
  selector: 'marea-landing-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaContainer],
  host: { '[class]': "'marea-landing-section marea-landing-section--' + tone()" },
  template: `
    <section class="section" [id]="anchor()" [attr.aria-labelledby]="labelledBy()">
      <marea-container size="wide"><ng-content /></marea-container>
    </section>
  `,
  styles: `
    :host {
      display: block;
      scroll-margin-block-start: var(--marea-space-6);
      background: var(--marea-canvas);
    }
    :host(.marea-landing-section--raised) {
      background: var(--marea-surface);
    }
    :host(.marea-landing-section--contrast) {
      background: var(--marea-surface-raised);
    }
    .section {
      padding-block: var(--marea-space-7);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    @media (min-width: 768px) {
      .section {
        padding-block: var(--marea-space-9);
      }
    }
    @media (min-width: 1200px) {
      .section {
        padding-block: var(--marea-space-10);
      }
    }
  `,
})
export class MareaLandingSectionFrame {
  readonly anchor = input.required<string>();
  readonly labelledBy = input.required<string>();
  readonly tone = input<'canvas' | 'raised' | 'contrast'>('canvas');
}
