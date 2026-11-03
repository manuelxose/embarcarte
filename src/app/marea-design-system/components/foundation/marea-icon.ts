import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MAREA_ICON_PATHS, type MareaIconName } from './marea-icon-paths';

/**
 * Semantic icon primitive.
 *
 * Decorative by default (`aria-hidden="true"`). To convey meaning it MUST be
 * labelled: `label` sets `role="img"` and an accessible name. An icon alone is
 * never the only carrier of status: every status component renders text too.
 */
@Component({
  selector: 'marea-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-component': 'marea-icon',
    '[class]': "'marea-icon marea-icon--' + size()",
  },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label()"
      [attr.aria-hidden]="label() ? null : 'true'"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host { display: inline-flex; flex: none; align-items: center; justify-content: center; inline-size: var(--marea-icon-size-md); block-size: var(--marea-icon-size-md); }
    :host(.marea-icon--sm) { inline-size: var(--marea-icon-size-sm); block-size: var(--marea-icon-size-sm); }
    :host(.marea-icon--lg) { inline-size: var(--marea-icon-size-lg); block-size: var(--marea-icon-size-lg); }
    :host(.marea-icon--xl) { inline-size: var(--marea-icon-size-xl); block-size: var(--marea-icon-size-xl); }
    svg { inline-size: 100%; block-size: 100%; }
  `,
})
export class MareaIcon {
  readonly name = input.required<MareaIconName>();
  readonly label = input<string | null>(null);
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  readonly paths = computed<readonly string[]>(() => MAREA_ICON_PATHS[this.name()] ?? ['M5 12h14']);
}
