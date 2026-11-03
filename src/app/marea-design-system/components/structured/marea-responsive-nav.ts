import { ChangeDetectionStrategy, Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import { MareaIds } from '../../core/ids';
import { MareaIcon } from '../foundation/marea-icon';

export interface MareaNavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly current?: boolean;
}

/**
 * Responsive navigation landmark.
 *
 * Mobile-first: below 1024px a single native toggle button controls the list and
 * Escape closes it and returns focus to that button. From 1024px the toggle is
 * hidden and the list is always horizontal. There is no focus trap and no
 * overlay; the current page is marked with `aria-current` plus a text-decoration
 * and weight change, never colour alone.
 */
@Component({
  selector: 'marea-responsive-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaIcon],
  host: { 'data-marea-component': 'marea-responsive-nav' },
  template: `
    <nav class="nav" [attr.aria-label]="label()">
      <button
        #toggle
        class="toggle"
        type="button"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="listId"
        (click)="toggleOpen()"
      >
        <marea-icon name="menu" size="lg" />
        <span class="toggle-label">
          {{ open() ? i18n.text('closeNavigation') : i18n.text('openNavigation') }}
        </span>
      </button>
      <ul class="list" [id]="listId" [class.is-open]="open()" (keydown)="onListKeydown($event)">
        @for (item of items(); track item.id) {
          <li class="item">
            <a
              class="link"
              [href]="item.href"
              [attr.aria-current]="item.current ? 'page' : null"
              (click)="close()"
            >
              {{ item.label }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--marea-space-2);
      min-block-size: var(--marea-control-md);
      min-inline-size: var(--marea-touch-target-min);
      padding: var(--marea-space-1) var(--marea-space-3);
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-radius: var(--marea-radius-control);
      background: var(--marea-surface);
      color: var(--marea-text-primary);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      letter-spacing: var(--marea-type-label-tracking);
      cursor: pointer;
    }
    .toggle:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
    .list {
      display: none;
      flex-direction: column;
      gap: var(--marea-space-1);
      inline-size: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .list.is-open {
      display: flex;
    }
    .item {
      min-inline-size: 0;
    }
    .link {
      display: inline-flex;
      align-items: center;
      min-block-size: var(--marea-control-md);
      padding: var(--marea-space-1) var(--marea-space-2);
      border-radius: var(--marea-radius-control);
      color: var(--marea-text-primary);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      text-decoration: none;
      overflow-wrap: anywhere;
    }
    .link:hover {
      color: var(--marea-action);
      text-decoration: underline;
    }
    .link:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    .link[aria-current='page'] {
      color: var(--marea-action);
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
    @media (min-width: 1024px) {
      .nav {
        flex-wrap: nowrap;
      }
      .toggle {
        display: none;
      }
      .list,
      .list.is-open {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        inline-size: auto;
        padding: 0;
        gap: var(--marea-space-1);
      }
    }
  `,
})
export class MareaResponsiveNav {
  readonly label = input.required<string>();
  readonly items = input.required<readonly MareaNavItem[]>();

  readonly i18n = inject(MareaI18n);
  readonly open = signal(false);

  readonly listId = inject(MareaIds).next('responsive-nav-list');

  private readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('toggle');

  toggleOpen(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }

  onListKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !this.open()) return;
    event.preventDefault();
    this.open.set(false);
    this.toggleButton()?.nativeElement.focus();
  }
}
