import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [RouterLink],
  template: `
    <a class="brand" routerLink="/" aria-label="Embarcarte, inicio">
      <span class="brand-mark" aria-hidden="true"></span><span class="brand-name">embarcarte</span>
    </a>
  `,
})
export class Brand {}
