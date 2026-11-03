import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { restrictionCopyKey } from '../../data/commerce-presentation.adapter';
import { MareaNotice } from '../foundation/marea-notice';
import type { MareaRestrictionKind } from '../../core/types';

/**
 * Permission/restriction notice.
 *
 * Delegates the notice chrome and its opt-in live region to `marea-notice`
 * (`variant="permission"`). The heading is derived from the restriction kind
 * through the existing copy dictionary, the body explains the detail or the
 * internal scope, and the meta line states that the scope is internal. The
 * notice never claims an approval, a publication or a purchase capability.
 */
@Component({
  selector: 'marea-permission-notice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaNotice],
  host: { 'data-marea-component': 'marea-permission-notice' },
  template: `
    <marea-notice variant="permission" [heading]="heading()" [body]="body()" [live]="live()">
      <p class="meta">{{ i18n.text('internalScope') }}</p>
    </marea-notice>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .meta {
      margin: 0;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-internal-banner-text);
    }
  `,
})
export class MareaPermissionNotice {
  readonly kind = input.required<MareaRestrictionKind>();
  readonly scope = input<string | null>(null);
  readonly detail = input<string | null>(null);
  readonly live = input<'off' | 'polite' | 'assertive'>('off');

  readonly i18n = inject(MareaI18n);

  readonly heading = computed(() => this.i18n.text(restrictionCopyKey(this.kind())));
  readonly body = computed<string | null>(() => this.detail() ?? this.scope());
}
