import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type MareaTextRole =
  | 'display1'
  | 'display2'
  | 'title1'
  | 'title2'
  | 'heading'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'meta';
export type MareaTextTone =
  | 'primary'
  | 'secondary'
  | 'meta'
  | 'data'
  | 'action'
  | 'critical'
  | 'warning'
  | 'safe'
  | 'stale'
  | 'info';

/**
 * Typography contract. The consumer supplies the semantic element
 * (`<p marea-text>`, `<span marea-text>`, `<h3 marea-text>`), so the design
 * system never invents an extra wrapper or an out-of-order heading.
 */
@Component({
  selector: '[marea-text]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-marea-component': 'marea-text',
    '[class]': "'marea-text marea-text--' + variant() + ' marea-text--tone-' + tone()",
  },
  template: '<ng-content />',
  styles: `
    :host {
      display: block;
      margin: 0;
      font-family: var(--marea-type-body-family, inherit);
      font-size: var(--marea-type-body-size, 1rem);
      line-height: var(--marea-type-body-line-height, 1.65);
      font-weight: var(--marea-type-body-weight, 400);
      letter-spacing: var(--marea-type-body-tracking, 0);
      color: var(--marea-text-primary, inherit);
      text-wrap: pretty;
      overflow-wrap: break-word;
      max-inline-size: var(--marea-measure, 68ch);
    }
    :host(.marea-text--display1) {
      font-family: var(--marea-type-display1-family);
      font-size: var(--marea-type-display1-size);
      line-height: var(--marea-type-display1-line-height);
      font-weight: var(--marea-type-display1-weight);
      letter-spacing: var(--marea-type-display1-tracking);
      max-inline-size: 24ch;
    }
    :host(.marea-text--display2) {
      font-family: var(--marea-type-display2-family);
      font-size: var(--marea-type-display2-size);
      line-height: var(--marea-type-display2-line-height);
      font-weight: var(--marea-type-display2-weight);
      letter-spacing: var(--marea-type-display2-tracking);
      max-inline-size: 28ch;
    }
    :host(.marea-text--title1) {
      font-family: var(--marea-type-title1-family);
      font-size: var(--marea-type-title1-size);
      line-height: var(--marea-type-title1-line-height);
      font-weight: var(--marea-type-title1-weight);
      letter-spacing: var(--marea-type-title1-tracking);
      max-inline-size: 32ch;
    }
    :host(.marea-text--title2) {
      font-family: var(--marea-type-title2-family);
      font-size: var(--marea-type-title2-size);
      line-height: var(--marea-type-title2-line-height);
      font-weight: var(--marea-type-title2-weight);
      letter-spacing: var(--marea-type-title2-tracking);
    }
    :host(.marea-text--heading) {
      font-family: var(--marea-type-heading-family);
      font-size: var(--marea-type-heading-size);
      line-height: var(--marea-type-heading-line-height);
      font-weight: var(--marea-type-heading-weight);
    }
    :host(.marea-text--bodySmall) {
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
    }
    :host(.marea-text--label) {
      font-family: var(--marea-type-label-family);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: var(--marea-type-label-weight);
      letter-spacing: var(--marea-type-label-tracking);
    }
    :host(.marea-text--meta) {
      font-family: var(--marea-type-meta-family);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
    }
    :host(.marea-text--tone-secondary) {
      color: var(--marea-text-secondary);
    }
    :host(.marea-text--tone-meta) {
      color: var(--marea-text-meta);
    }
    :host(.marea-text--tone-data) {
      color: var(--marea-data-primary);
    }
    :host(.marea-text--tone-action) {
      color: var(--marea-action);
    }
    :host(.marea-text--tone-critical) {
      color: var(--marea-state-critical);
    }
    :host(.marea-text--tone-warning) {
      color: var(--marea-state-warning);
    }
    :host(.marea-text--tone-safe) {
      color: var(--marea-state-safe);
    }
    :host(.marea-text--tone-stale) {
      color: var(--marea-state-stale);
    }
    :host(.marea-text--tone-info) {
      color: var(--marea-state-info);
    }
  `,
})
export class MareaText {
  readonly variant = input<MareaTextRole>('body');
  readonly tone = input<MareaTextTone>('primary');
}
