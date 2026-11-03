import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaIds } from '../../core/ids';
import { MareaSurface } from '../foundation/marea-surface';

/**
 * Instrument tile shell: one data surface, one labelled group, one heading.
 *
 * The heading id is generated deterministically by `MareaIds` and passed to the
 * surface as `aria-labelledby`, so the group has a stable accessible name on the
 * server and after hydration. The tile contains projected readouts only: it does
 * not fetch, calculate or claim a live measurement, and synthetic content is
 * marked with the visible `demo` tag.
 */
@Component({
  selector: 'marea-instrument-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaSurface],
  host: { 'data-marea-component': 'marea-instrument-tile' },
  template: `
    <marea-surface variant="raised" [labelledBy]="titleId">
      <header class="head">
        <h3 class="title" [id]="titleId">{{ title() }}</h3>
        @if (demo()) {
          <span class="demo">{{ i18n.text('demo') }}</span>
        }
      </header>
      <div class="body"><ng-content /></div>
    </marea-surface>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: min(100%, var(--marea-tile-min));
      max-inline-size: 100%;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--marea-space-2);
      margin-block-end: var(--marea-space-3);
    }
    .title {
      margin: 0;
      min-inline-size: 0;
      font-family: var(--marea-type-heading-family);
      font-size: var(--marea-type-heading-size);
      line-height: var(--marea-type-heading-line-height);
      font-weight: var(--marea-type-heading-weight);
      letter-spacing: var(--marea-type-heading-tracking);
      color: var(--marea-text-primary);
      overflow-wrap: anywhere;
    }
    .demo {
      font-family: var(--marea-type-meta-family);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      color: var(--marea-internal-banner-text);
      background: var(--marea-internal-banner-surface);
      border: var(--marea-border-width-hairline) solid currentColor;
      border-radius: var(--marea-radius-pill);
      padding: 0 var(--marea-space-1);
      white-space: nowrap;
    }
    .body {
      display: block;
      min-inline-size: 0;
    }
  `,
})
export class MareaInstrumentTile {
  readonly title = input.required<string>();
  readonly demo = input(true);

  readonly i18n = inject(MareaI18n);
  private readonly ids = inject(MareaIds);

  readonly titleId = this.ids.next('instrument-tile');
}
