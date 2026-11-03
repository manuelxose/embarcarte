import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MareaIcon } from './marea-icon';
import type { MareaIconName } from './marea-icon-paths';

export type MareaStateKind = 'loading' | 'empty' | 'error' | 'unavailable';

const KIND_ICON: Readonly<Record<MareaStateKind, MareaIconName>> = {
  loading: 'clock',
  empty: 'dash',
  error: 'critical',
  unavailable: 'lock',
};

/**
 * Non-blocking state panel for loading, empty, error and withheld/unavailable
 * states. Errors and loading states are announced; no essential information
 * depends on animation and no spinner is required to understand the state.
 */
@Component({
  selector: 'marea-state-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaIcon],
  host: {
    'data-marea-component': 'marea-state-panel',
    '[class]': "'marea-state-panel marea-state-panel--' + kind()",
    '[attr.role]': "kind() === 'error' ? 'alert' : 'status'",
    '[attr.aria-live]': "kind() === 'error' ? 'assertive' : 'polite'",
    '[attr.aria-busy]': "kind() === 'loading' ? 'true' : null",
  },
  template: `
    <marea-icon [name]="icon()" size="xl" />
    <p class="title">{{ title() }}</p>
    @if (description()) {
      <p class="description">{{ description() }}</p>
    }
    <div class="actions"><ng-content /></div>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      justify-items: center;
      gap: var(--marea-space-2);
      padding: var(--marea-space-8) var(--marea-space-4);
      text-align: center;
      border: var(--marea-border-width-hairline) dashed var(--marea-border-strong);
      border-radius: var(--marea-radius-surface);
      background: var(--marea-surface);
      color: var(--marea-text-primary);
    }
    :host(.marea-state-panel--error) { border-style: solid; border-color: var(--marea-state-critical); }
    .title { margin: 0; font-family: var(--marea-font-display); font-weight: 700; font-size: var(--marea-type-heading-size); }
    .description { margin: 0; max-inline-size: var(--marea-measure); overflow-wrap: break-word; color: var(--marea-text-secondary); }
    .actions:empty { display: none; }
  `,
})
export class MareaStatePanel {
  readonly kind = input<MareaStateKind>('empty');
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);

  readonly icon = computed<MareaIconName>(() => KIND_ICON[this.kind()]);
}
