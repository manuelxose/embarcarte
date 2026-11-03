import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaIcon } from './marea-icon';

/**
 * Text link on a native anchor. The consumer supplies the element; the
 * component styles it and adds an optional external-link cue with a text
 * alternative, so meaning is never carried by the icon alone.
 */
@Component({
  selector: 'a[marea-link]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaIcon],
  host: {
    'data-marea-component': 'marea-link',
    '[class]': "'marea-link marea-link--' + variant()",
    '[attr.href]': 'href()',
    '[attr.target]': 'external() ? "_blank" : null',
    '[attr.rel]': "external() ? 'noopener noreferrer' : null",
  },
  template: `
    <ng-content />
    @if (external()) {
      <marea-icon name="external" size="sm" />
      <span class="sr-only"> ({{ i18n.text('external') }})</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--marea-space-1);
      color: var(--marea-action);
      font-family: var(--marea-font-body);
      font-weight: 600;
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 0.2em;
      border-radius: var(--marea-radius-control);
      cursor: pointer;
    }
    :host(:hover) {
      color: var(--marea-action-hover);
    }
    :host(:focus-visible) {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
    :host(.marea-link--quiet) {
      color: var(--marea-text-primary);
      text-decoration: none;
    }
    :host(.marea-link--quiet:hover) {
      color: var(--marea-action);
      text-decoration: underline;
    }
    :host(.marea-link--standalone) {
      font-size: var(--marea-type-body-size);
    }
    .sr-only {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `,
})
export class MareaLink {
  readonly href = input<string | null>(null);
  readonly external = input(false);
  readonly variant = input<'inline' | 'quiet' | 'standalone'>('inline');

  readonly i18n = inject(MareaI18n);
}
