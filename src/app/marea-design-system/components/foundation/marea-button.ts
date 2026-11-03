import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaIds } from '../../core/ids';
import { MareaIcon } from './marea-icon';

export type MareaButtonVariant = 'action' | 'secondary' | 'ghost' | 'critical';

/**
 * Native button with an explicit, discoverable disabled contract.
 *
 * - With a `disabledReason`, the control keeps `aria-disabled="true"`, stays
 *   keyboard discoverable, exposes the reason through `aria-describedby` and
 *   blocks activation.
 * - Without a reason, it uses the native `disabled` attribute.
 * - `loading` sets `aria-busy` and blocks activation; no timer or animation is
 *   required to understand the state.
 */
@Component({
  selector: 'button[marea-button]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaIcon],
  host: {
    'data-marea-component': 'marea-button',
    '[class]': "'marea-button marea-button--' + variant() + ' marea-button--' + size()",
    '[attr.type]': 'type()',
    '[attr.disabled]': "isNativelyDisabled() ? '' : null",
    '[attr.aria-disabled]': "isAriaDisabled() ? 'true' : null",
    '[attr.aria-busy]': "loading() ? 'true' : null",
    '[attr.aria-describedby]': 'reasonId()',
    '(click)': 'onActivate($event)',
  },
  template: `
    @if (loading()) {
      <marea-icon name="clock" />
    }
    <span class="label"><ng-content /></span>
    @if (disabledReason()) {
      <span class="sr-only" [id]="reasonSpanId">{{ disabledReason() }}</span>
    }
    @if (loading()) {
      <span class="sr-only" [id]="loadingSpanId">{{ i18n.text('loading') }}</span>
    }
    @if (icon()) {
      <marea-icon [name]="icon()!" />
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--marea-space-2);
      min-block-size: var(--marea-control-md);
      min-inline-size: var(--marea-touch-target-min);
      padding: var(--marea-space-2) var(--marea-space-4);
      border: var(--marea-border-width-hairline) solid transparent;
      border-radius: var(--marea-radius-control);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      letter-spacing: var(--marea-type-label-tracking);
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: background-color var(--marea-motion-state) var(--marea-ease-standard), border-color var(--marea-motion-state) var(--marea-ease-standard);
    }
    :host(.marea-button--action) { background: var(--marea-action); color: var(--marea-text-on-accent); }
    :host(.marea-button--action:hover) { background: var(--marea-action-hover); }
    :host(.marea-button--secondary) { background: var(--marea-action-quiet-surface); color: var(--marea-action); border-color: var(--marea-border-strong); }
    :host(.marea-button--secondary:hover) { border-color: var(--marea-action); }
    :host(.marea-button--ghost) { background: transparent; color: var(--marea-action); }
    :host(.marea-button--ghost:hover) { background: var(--marea-action-quiet-surface); }
    :host(.marea-button--critical) { background: var(--marea-state-critical); color: var(--marea-text-on-accent); }
    :host(.marea-button--sm) { min-block-size: var(--marea-control-sm); padding-inline: var(--marea-space-3); }
    :host(.marea-button--lg) { min-block-size: var(--marea-control-lg); padding-inline: var(--marea-space-5); }
    :host(:focus-visible) { outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring); outline-offset: var(--marea-focus-offset); }
    :host(.marea-button--action:focus-visible), :host(.marea-button--critical:focus-visible) {
      outline-color: var(--marea-focus-ring-on-fill);
      outline-offset: var(--marea-focus-inset);
    }
    :host([aria-disabled='true']), :host([disabled]) { background: var(--marea-disabled-surface); color: var(--marea-disabled); border-color: var(--marea-border-strong); cursor: not-allowed; }
    :host([aria-disabled='true']:hover), :host([disabled]:hover) { background: var(--marea-disabled-surface); }
    :host(.marea-button--ghost[aria-disabled='true']), :host(.marea-button--ghost[disabled]) { background: transparent; border-color: transparent; }
    @media (prefers-reduced-motion: reduce) { :host { transition: none; } }
    .sr-only { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  `,
})
export class MareaButton {
  readonly variant = input<MareaButtonVariant>('action');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly disabledReason = input<string | null>(null);
  readonly loading = input(false);
  readonly icon = input<null | 'chevron-right' | 'arrow-right' | 'external' | 'check' | 'close' | 'download' | 'document'>(null);

  readonly activated = output<void>();

  readonly i18n = inject(MareaI18n);
  private readonly ids = inject(MareaIds);
  readonly reasonSpanId = this.ids.next('button-reason');
  readonly loadingSpanId = this.ids.next('button-loading');

  readonly isAriaDisabled = computed(() => (this.disabled() || this.loading()) && !!this.disabledReason());
  readonly isNativelyDisabled = computed(() => (this.disabled() || this.loading()) && !this.disabledReason());
  readonly reasonId = computed(() => (this.isAriaDisabled() ? this.reasonSpanId : null));

  onActivate(event: Event): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.activated.emit();
  }
}
