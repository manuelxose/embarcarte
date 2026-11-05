import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';

/**
 * MC-23 bundle upgrade-path selector (presentation only).
 *
 * Toggle-button selector for a starting bundle: every control is a real
 * `<button type="button">` with `aria-pressed`, grouped by a native
 * `<fieldset>/<legend>`, keyboard operable, with a 44px minimum touch target.
 * Pressing a pressed control deselects it honestly (the output returns to
 * null) instead of forcing a permanent choice.
 *
 * The resulting upgrade path is announced through an always-rendered polite
 * live region (`role="status"` via `marea-notice live="polite"`) whose
 * content is mutated in place — the element is stable, so changes are
 * announced reliably. The component navigates nowhere, submits nothing and
 * touches no storage or network; it only emits through `bundleSelected`.
 * Every visible string arrives through the `labels` input and the localized
 * option records.
 */

/** One selectable bundle option of the upgrade-path selector. */
export interface MareaUpgradeBundleOption {
  /** Stable bundle identifier (data key only, never rendered as copy). */
  readonly bundleId: string;
  /** Already-localized bundle display name. */
  readonly displayName: string;
  /** Already-localized readiness/lifecycle state label for the bundle. */
  readonly stateLabel: string;
  /** Already-localized additions the resulting upgrade path would add, in order. */
  readonly pathAdditions: readonly string[];
}

/** Already-localized chrome copy for the upgrade-path selector. */
export interface MareaUpgradeSelectorLabels {
  /** Visible group label naming the bundle choice. */
  readonly groupLabel: string;
  /** Live-region heading while nothing is selected. */
  readonly pathHeading: string;
  /** Live-region body while nothing is selected. */
  readonly pathIdleLabel: string;
  /** Accessible name of the resulting additions list. */
  readonly pathListLabel: string;
  /** Optional supporting hint below the group label. */
  readonly hint?: string;
}

@Component({
  selector: 'marea-bundle-upgrade-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaNotice, MareaText],
  template: `
    <fieldset class="group">
      <legend class="group-label" marea-text variant="label">{{ labels().groupLabel }}</legend>
      @if (labels().hint; as hint) {
        <p class="hint" marea-text variant="meta">{{ hint }}</p>
      }
      <div class="options">
        @for (bundle of bundles(); track bundle.bundleId) {
          <button
            type="button"
            class="option"
            [class.option--pressed]="bundle.bundleId === selectedId()"
            [attr.aria-pressed]="bundle.bundleId === selectedId()"
            (click)="toggle(bundle.bundleId)"
          >
            <span class="option-name">{{ bundle.displayName }}</span>
            <span class="option-state" marea-text variant="meta">{{ bundle.stateLabel }}</span>
          </button>
        }
      </div>
    </fieldset>
    <div class="result">
      <marea-notice
        variant="info"
        live="polite"
        [heading]="selectedBundle()?.displayName ?? labels().pathHeading"
        [body]="selectedBundle() === null ? labels().pathIdleLabel : null"
      >
        @if (selectedBundle(); as selected) {
          @if (selected.pathAdditions.length > 0) {
            <ul class="path" [attr.aria-label]="labels().pathListLabel">
              @for (addition of selected.pathAdditions; track $index) {
                <li>{{ addition }}</li>
              }
            </ul>
          }
        }
      </marea-notice>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .group {
      margin: 0;
      padding: 0;
      border: 0;
      min-inline-size: 0;
    }
    legend.group-label {
      padding: 0;
      margin-block: 0 var(--marea-space-2);
    }
    p.hint {
      margin-block: 0 var(--marea-space-2);
    }
    .options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      gap: var(--marea-space-3);
    }
    .option {
      display: grid;
      gap: var(--marea-space-1);
      justify-items: start;
      min-block-size: 44px;
      padding: var(--marea-space-3) var(--marea-space-4);
      border: var(--marea-border-width-hairline) solid var(--marea-line);
      border-radius: var(--marea-radius-surface);
      background: var(--marea-surface);
      color: var(--marea-text-primary);
      font-family: var(--marea-font-body);
      text-align: start;
      cursor: pointer;
      appearance: none;
    }
    .option:hover {
      border-color: var(--marea-text-secondary);
    }
    .option:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    .option--pressed {
      border-color: var(--marea-action);
      background: var(--marea-surface-raised);
    }
    .option-name {
      overflow-wrap: anywhere;
      font-size: var(--marea-type-body-size);
      line-height: var(--marea-type-body-line-height);
      font-weight: 600;
    }
    .option--pressed .option-name {
      font-weight: 700;
    }
    span.option-state {
      display: block;
      margin-block-start: var(--marea-space-1);
    }
    .result {
      margin-block-start: var(--marea-space-4);
    }
    .path {
      margin: 0;
      padding-inline-start: var(--marea-space-4);
      display: grid;
      gap: var(--marea-space-1);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-size);
      line-height: var(--marea-type-body-line-height);
      color: var(--marea-text-primary);
    }
    .path li {
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaBundleUpgradeSelector {
  readonly bundles = input.required<readonly MareaUpgradeBundleOption[]>();
  readonly labels = input.required<MareaUpgradeSelectorLabels>();

  /** Emits the selected bundleId, or null when the pressed control is deselected. */
  readonly bundleSelected = output<string | null>();

  readonly selectedId = signal<string | null>(null);

  /** Option matching the current selection; null while nothing is selected. */
  readonly selectedBundle = computed(
    () => this.bundles().find((bundle) => bundle.bundleId === this.selectedId()) ?? null,
  );

  /** Selects the bundle, or deselects the pressed one; emits the new state. */
  toggle(bundleId: string): void {
    const next = this.selectedId() === bundleId ? null : bundleId;
    this.selectedId.set(next);
    this.bundleSelected.emit(next);
  }
}