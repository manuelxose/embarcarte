import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Tab panel paired with `marea-tabs`.
 *
 * Render one panel per tab immediately next to the tab strip, with `itemId`
 * matching the tab id, so the panel `id` and its `aria-labelledby`/`aria-controls`
 * relationships resolve in both directions. The panel is hidden natively
 * (`hidden` attribute) when it is not active, so its content is removed from the
 * accessibility tree and the tab order.
 */
@Component({
  selector: 'marea-tab-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-tab-panel' },
  template: `
    <div
      class="panel"
      role="tabpanel"
      tabindex="0"
      [id]="itemId() + '-panel'"
      [attr.aria-labelledby]="itemId() + '-tab'"
      [attr.hidden]="active() ? null : ''"
    >
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .panel {
      padding-block-start: var(--marea-space-4);
      min-inline-size: 0;
    }
    .panel[hidden] {
      display: none;
    }
    .panel:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
  `,
})
export class MareaTabPanel {
  readonly itemId = input.required<string>();
  readonly active = input(false);
}
