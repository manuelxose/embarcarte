import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="currentColor" opacity=".12" />
      <path d="M16 5v15M9 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none" />
      <path d="M6 18c2 5.5 6 8 10 8s8-2.5 10-8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none" />
    </svg>
  `,
  styles: ':host{display:inline-flex;color:var(--accent)}',
})
export class Logo {}
