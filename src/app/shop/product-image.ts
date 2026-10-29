import { Component, input } from '@angular/core';

/** Imagen de producto con marcador de posición cuando no hay foto. */
@Component({
  selector: 'app-product-image',
  template: `
    @if (src()) {
      <img [src]="src()" [alt]="alt()" loading="lazy" />
    } @else {
      <svg viewBox="0 0 120 90" role="img" [attr.aria-label]="alt()">
        <path d="M14 58c14-10 28-10 46 0s32 10 46 0" stroke="#67c6f1" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M22 70c12-8 24-8 38 0s26 8 38 0" stroke="#a4e0fa" stroke-width="3" fill="none" stroke-linecap="round" />
      </svg>
    }
  `,
  styles: ':host{display:block;width:100%;height:100%} img,svg{width:100%;height:100%;object-fit:cover}',
})
export class ProductImage {
  readonly src = input('');
  readonly alt = input('');
}
