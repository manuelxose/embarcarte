import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root shell of the isolated preview. It renders nothing but the router outlet:
 * the landing component and its locale metadata are route-scoped, so SSR and
 * hydration resolve the same locale from the same route data.
 */
@Component({
  selector: 'marea-preview-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class PreviewShell {}
