import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  output,
  viewChildren,
} from '@angular/core';

export interface MareaTabItem {
  readonly id: string;
  readonly label: string;
}

/**
 * Technical tab strip for the isolated design system.
 *
 * Native buttons with a roving tabindex; selection follows focus (automatic
 * activation). The parent owns the active id through `activeId`, so the strip
 * keeps no internal selection state and server-rendered markup hydrates
 * identically. The active tab is not identified by colour alone: it also gets a
 * heavier text weight and a 3px action border, and `aria-selected` is exposed.
 *
 * Panels are separate `marea-tab-panel` components. Render them next to these
 * tabs with matching ids so `aria-controls`/`aria-labelledby` resolve.
 */
@Component({
  selector: 'marea-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'mareaTabs',
  host: { 'data-marea-component': 'marea-tabs' },
  template: `
    <div class="list" role="tablist" [attr.aria-label]="label()" (keydown)="onKeydown($event)">
      @for (item of items(); track item.id) {
        <button
          #tab
          class="tab"
          type="button"
          role="tab"
          [class.is-active]="isActive(item.id)"
          [id]="item.id + '-tab'"
          [attr.aria-controls]="item.id + '-panel'"
          [attr.aria-selected]="isActive(item.id)"
          [attr.tabindex]="tabStopId() === item.id ? 0 : -1"
          (click)="select(item.id)"
          (focus)="select(item.id)"
        >
          {{ item.label }}
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .tab {
      max-inline-size: 100%;
      min-block-size: var(--marea-control-md);
      min-inline-size: var(--marea-touch-target-min);
      margin-block-end: calc(-1 * var(--marea-border-width-hairline));
      padding: var(--marea-space-2) var(--marea-space-3);
      border: 0;
      border-block-end: var(--marea-border-width-focus) solid transparent;
      background: transparent;
      color: var(--marea-text-secondary);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 600;
      letter-spacing: var(--marea-type-label-tracking);
      overflow-wrap: anywhere;
      cursor: pointer;
    }
    .tab:hover {
      color: var(--marea-text-primary);
      background: var(--marea-action-quiet-surface);
    }
    .tab.is-active {
      color: var(--marea-action);
      border-block-end-color: var(--marea-action);
      font-weight: 700;
    }
    .tab:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
  `,
})
export class MareaTabs {
  readonly label = input.required<string>();
  readonly items = input.required<readonly MareaTabItem[]>();
  readonly activeId = input<string | null>(null);
  readonly activeIdChange = output<string>();

  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  /** Roving tabindex: the active tab, or the first tab when nothing is active. */
  readonly tabStopId = computed<string | null>(() => {
    const active = this.activeId();
    const items = this.items();
    if (active !== null && items.some((item) => item.id === active)) return active;
    return items[0]?.id ?? null;
  });

  isActive(id: string): boolean {
    return this.activeId() === id;
  }

  select(id: string): void {
    if (id === this.activeId()) return;
    this.activeIdChange.emit(id);
  }

  onKeydown(event: KeyboardEvent): void {
    const items = this.items();
    if (!items.length) return;

    const currentIndex = items.findIndex((item) => item.id === this.activeId());
    const current = currentIndex >= 0 ? currentIndex : 0;
    let next: number;

    switch (event.key) {
      case 'ArrowRight':
        next = (current + 1) % items.length;
        break;
      case 'ArrowLeft':
        next = (current - 1 + items.length) % items.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    // Move focus only: the (focus) handler performs automatic activation, so a
    // keyboard move emits exactly one activeIdChange.
    this.tabButtons()[next]?.nativeElement.focus();
  }
}
