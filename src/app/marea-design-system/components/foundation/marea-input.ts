import { Directive, input } from '@angular/core';

/**
 * Text-input appearance contract for native `input`, `select` and `textarea`.
 *
 * The directive never replaces the element, so label/for, autocomplete and
 * validation semantics stay native. `invalid` adds `aria-invalid`; the visible
 * error text is rendered by `marea-form-field`, never by colour alone.
 */
@Directive({
  selector: 'input[mareaInput], select[mareaInput], textarea[mareaInput]',
  host: {
    'data-marea-component': 'marea-input',
    '[class.marea-input]': 'true',
    '[class.marea-input--invalid]': 'invalid()',
    '[attr.aria-invalid]': "invalid() ? 'true' : null",
    '[attr.aria-required]': "required() ? 'true' : null",
  },
})
export class MareaInput {
  readonly invalid = input(false);
  readonly required = input(false);
}
