import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaIds } from '../../core/ids';

/**
 * Form field: label, help text and error message with correct programmatic
 * relationships.
 *
 * The control is projected by the consumer so it stays a native `input`,
 * `select` or `textarea`. Pair it with the `mareaInput` directive, and bind
 * `aria-describedby` to the exposed `describedBy()` so the hint and the error
 * are announced with the field. The error paragraph is `role="alert"` and the
 * field never relies on a red border alone.
 *
 * The projected control is styled from this component because projected nodes
 * keep the consumer's encapsulation context; `::ng-deep` is intentionally
 * limited to the namespaced `.marea-input` class inside this host.
 */
@Component({
  selector: 'marea-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'mareaFormField',
  host: { 'data-marea-component': 'marea-form-field' },
  template: `
    <label class="label" [attr.for]="controlId()">
      {{ label() }}
      @if (required()) {
        <span class="required" aria-hidden="true">*</span>
        <span class="sr-only">{{ i18n.text('required') }}</span>
      }
    </label>
    <ng-content />
    @if (hint()) {
      <p class="hint" [id]="hintId">{{ hint() }}</p>
    }
    @if (error()) {
      <p class="error" [id]="errorId" role="alert">{{ error() }}</p>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      min-inline-size: 0;
    }
    .label {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      font-weight: 700;
      color: var(--marea-text-primary);
    }
    .required {
      color: var(--marea-state-critical);
    }
    .hint {
      margin: 0;
      font-size: var(--marea-type-body-small-size);
      color: var(--marea-text-secondary);
    }
    .error {
      margin: 0;
      font-size: var(--marea-type-body-small-size);
      font-weight: 600;
      color: var(--marea-state-critical);
    }
    .sr-only {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    :host ::ng-deep .marea-input {
      inline-size: 100%;
      min-block-size: var(--marea-control-md);
      padding: var(--marea-space-2) var(--marea-space-3);
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-radius: var(--marea-radius-control);
      background: var(--marea-field-surface);
      color: var(--marea-text-primary);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-size);
      line-height: var(--marea-type-body-line-height);
    }
    :host ::ng-deep .marea-input:hover {
      border-color: var(--marea-action);
    }
    :host ::ng-deep .marea-input:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
    :host ::ng-deep .marea-input--invalid {
      border-color: var(--marea-state-critical);
      border-inline-start-width: var(--marea-border-width-strong);
    }
    :host ::ng-deep .marea-input:disabled {
      background: var(--marea-disabled-surface);
      color: var(--marea-disabled);
      cursor: not-allowed;
    }
  `,
})
export class MareaFormField {
  readonly label = input.required<string>();
  readonly controlId = input.required<string>();
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly required = input(false);

  readonly i18n = inject(MareaI18n);

  private readonly ids = inject(MareaIds);
  private readonly base = this.ids.next('field');
  readonly hintId = `${this.base}-hint`;
  readonly errorId = `${this.base}-error`;

  readonly describedBy = computed<string | null>(() => {
    const ids: string[] = [];
    if (this.hint()) ids.push(this.hintId);
    if (this.error()) ids.push(this.errorId);
    return ids.length ? ids.join(' ') : null;
  });
}
