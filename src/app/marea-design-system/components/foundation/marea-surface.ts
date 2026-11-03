import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Data surface. Not a decorative card: one surface per information group, one
 * elevation maximum, and a label when the surface groups related controls.
 */
@Component({
  selector: 'marea-surface',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-component': 'marea-surface',
    '[class]': "'marea-surface marea-surface--' + variant() + ' marea-surface--pad-' + padding()",
    '[attr.role]': "labelledBy() ? 'group' : null",
    '[attr.aria-labelledby]': 'labelledBy()',
  },
  template: '<ng-content />',
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
      background: var(--marea-surface);
      color: var(--marea-text-primary);
      border: var(--marea-border-width-hairline, 1px) solid var(--marea-line);
      border-radius: var(--marea-radius-surface);
      padding: var(--marea-space-5);
    }
    :host(.marea-surface--raised) { background: var(--marea-surface-raised); }
    :host(.marea-surface--outline) { background: transparent; border-color: var(--marea-border-strong); }
    :host(.marea-surface--pad-none) { padding: 0; }
    :host(.marea-surface--pad-tight) { padding: var(--marea-space-3); }
    :host(.marea-surface--pad-roomy) { padding: var(--marea-space-7); }
    @media (max-width: 479px) { :host { padding: var(--marea-space-4); } :host(.marea-surface--pad-roomy) { padding: var(--marea-space-5); } }
  `,
})
export class MareaSurface {
  readonly variant = input<'surface' | 'raised' | 'outline'>('surface');
  readonly padding = input<'none' | 'tight' | 'default' | 'roomy'>('default');
  /** Id of the visible heading that labels this surface, when it groups content. */
  readonly labelledBy = input<string | null>(null);
}
