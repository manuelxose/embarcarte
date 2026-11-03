import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MareaIcon } from './marea-icon';
import type { MareaIconName } from './marea-icon-paths';

export type MareaNoticeVariant = 'info' | 'warning' | 'critical' | 'permission' | 'internal';

const VARIANT_ICON: Readonly<Record<MareaNoticeVariant, MareaIconName>> = {
  info: 'info',
  warning: 'warning',
  critical: 'critical',
  permission: 'lock',
  internal: 'shield-alert',
};

/**
 * Accessible notice/alert.
 *
 * The live-region role is opt-in: a static notice uses no live region (no
 * surprise announcements), `polite` renders `role="status"` and `assertive`
 * renders `role="alert"` only for genuinely urgent, user-triggered messages.
 */
@Component({
  selector: 'marea-notice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaIcon],
  host: {
    'data-marea-component': 'marea-notice',
    '[class]': "'marea-notice marea-notice--' + variant()",
    '[attr.role]': "live() === 'assertive' ? 'alert' : live() === 'polite' ? 'status' : null",
    '[attr.aria-live]': "live() === 'assertive' ? 'assertive' : live() === 'polite' ? 'polite' : null",
  },
  template: `
    <marea-icon [name]="icon()" size="lg" />
    <div class="body">
      <p class="heading">{{ heading() }}</p>
      @if (body()) {
        <p class="text">{{ body() }}</p>
      }
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: flex;
      gap: var(--marea-space-3);
      padding: var(--marea-space-4);
      border: var(--marea-border-width-hairline) solid currentColor;
      border-inline-start-width: var(--marea-border-width-strong);
      border-radius: var(--marea-radius-surface);
      background: var(--marea-surface);
      color: var(--marea-text-primary);
    }
    :host(.marea-notice--info) { color: var(--marea-state-info); }
    :host(.marea-notice--warning) { color: var(--marea-state-warning); background: var(--marea-state-warning-surface); }
    :host(.marea-notice--critical) { color: var(--marea-state-critical); background: var(--marea-state-critical-surface); }
    :host(.marea-notice--permission) { color: var(--marea-internal-banner-text); background: var(--marea-internal-banner-surface); }
    :host(.marea-notice--internal) { color: var(--marea-internal-banner-text); background: var(--marea-internal-banner-surface); }
    .body { display: grid; gap: var(--marea-space-1); min-inline-size: 0; }
    .heading { margin: 0; font-family: var(--marea-font-display); font-size: var(--marea-type-heading-size); font-weight: 700; color: currentColor; }
    .text { margin: 0; color: var(--marea-text-primary); }
    :host(.marea-notice--warning) .heading, :host(.marea-notice--critical) .heading { color: currentColor; }
    @media (max-width: 479px) { :host { padding: var(--marea-space-3); } }
  `,
})
export class MareaNotice {
  readonly heading = input.required<string>();
  readonly body = input<string | null>(null);
  readonly variant = input<MareaNoticeVariant>('info');
  readonly live = input<'off' | 'polite' | 'assertive'>('off');

  readonly icon = computed<MareaIconName>(() => VARIANT_ICON[this.variant()]);
}
