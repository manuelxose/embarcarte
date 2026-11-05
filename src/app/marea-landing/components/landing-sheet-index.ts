import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Decorative sheet index for the editorial page rhythm.
 *
 * Renders a two-digit plate number, a hairline rule and a diamond tick. It is
 * purely visual: the host is `aria-hidden`, it carries no content and it never
 * introduces a heading level. The number is the position of the section in the
 * frozen document order, not product data.
 */
@Component({
  selector: 'marea-landing-sheet-index',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sheet', 'aria-hidden': 'true' },
  template: `
    <span class="number">{{ index() }}</span>
    <span class="rule"></span>
    <span class="tick"></span>
  `,
  styles: `
    :host {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      gap: var(--marea-space-3);
      min-inline-size: 0;
      margin-block-end: var(--marea-space-4);
    }
    .number {
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-numeric-tertiary-size);
      line-height: var(--marea-type-numeric-tertiary-line-height);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.16em;
      color: var(--marea-action);
    }
    .rule {
      flex: 1 1 auto;
      block-size: var(--marea-border-width-hairline);
      min-inline-size: var(--marea-space-4);
      background: var(--marea-border-strong);
      opacity: 0.4;
    }
    .tick {
      inline-size: 6px;
      block-size: 6px;
      flex: 0 0 auto;
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      transform: rotate(45deg);
    }
  `,
})
export class MareaLandingSheetIndex {
  readonly index = input.required<string>();
}
