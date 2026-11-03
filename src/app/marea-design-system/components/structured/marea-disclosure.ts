import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * Single native disclosure.
 *
 * The `<details>` element keeps the native summary/expanded semantics and
 * keyboard support. Angular state stays authoritative through the `open` input;
 * the component only reports user toggles through `openedChange` and never keeps
 * a second internal state.
 */
@Component({
  selector: 'marea-disclosure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-disclosure' },
  template: `
    <details class="details" [attr.open]="open() ? '' : null" (toggle)="onToggle($event)">
      <summary class="summary">
        <span class="summary-text">{{ summary() }}</span>
        @if (meta()) {
          <span class="meta">{{ meta() }}</span>
        }
      </summary>
      <div class="content"><ng-content /></div>
    </details>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .details {
      border: var(--marea-border-width-hairline) solid var(--marea-line);
      border-radius: var(--marea-radius-surface);
      background: var(--marea-surface);
    }
    .summary {
      min-block-size: var(--marea-control-md);
      padding: var(--marea-space-3) var(--marea-space-4);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-heading-size);
      line-height: var(--marea-type-heading-line-height);
      font-weight: 600;
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
      cursor: pointer;
    }
    .summary::marker {
      color: var(--marea-action);
    }
    .summary:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    .meta {
      display: block;
      margin-block-start: var(--marea-space-1);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-text-meta);
      overflow-wrap: anywhere;
    }
    .content {
      padding: 0 var(--marea-space-4) var(--marea-space-4);
    }
  `,
})
export class MareaDisclosure {
  readonly summary = input.required<string>();
  readonly open = input(false);
  readonly meta = input<string | null>(null);
  readonly openedChange = output<boolean>();

  onToggle(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLDetailsElement)) return;
    // Ignore the toggle fired when the bound input itself rewrites the attribute.
    if (target.open === this.open()) return;
    this.openedChange.emit(target.open);
  }
}
