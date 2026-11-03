import { Injectable } from '@angular/core';

/**
 * Deterministic DOM ids for aria relationships.
 *
 * Counter-based ids render identically on the server and on the client for the
 * same component order, so hydration keeps stable `aria-labelledby` references.
 * No randomness and no timestamps are involved.
 */
@Injectable({ providedIn: 'root' })
export class MareaIds {
  private sequence = 0;

  next(prefix: string): string {
    this.sequence += 1;
    return `marea-${prefix}-${this.sequence}`;
  }
}
