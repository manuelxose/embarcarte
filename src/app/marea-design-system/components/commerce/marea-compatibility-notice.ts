import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaNotice } from '../foundation/marea-notice';
import { MareaText } from '../foundation/marea-text';

/**
 * Compatibility statement. Zero tested rows is treated as unverified regardless
 * of the supplied status code, so a status string can never imply compatibility.
 */
@Component({
  selector: 'marea-compatibility-notice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-compatibility-notice' },
  imports: [MareaNotice, MareaText],
  template: `
    @if (isUnverified()) {
      <marea-notice
        variant="warning"
        [heading]="i18n.text('compatibilityHeading')"
        [body]="i18n.text('compatibilityUnverified')"
      />
    } @else {
      <p marea-text variant="bodySmall" tone="secondary" class="note">
        {{ i18n.text('compatibilityHeading') }} · {{ status() }} · {{ i18n.text('evidence') }}:
        {{ testedRows() }}
      </p>
    }
  `,
  styles: `
    :host { display: block; min-inline-size: 0; color: var(--marea-text-primary); }
    .note { margin: 0; overflow-wrap: anywhere; }
  `,
})
export class MareaCompatibilityNotice {
  readonly status = input.required<string>();
  readonly testedRows = input(0);

  readonly i18n = inject(MareaI18n);

  readonly isUnverified = computed(() => this.status() === 'UNTESTED' || this.testedRows() === 0);
}
