import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../core/catalog';
import { SITE } from '../core/site.config';
import { Logo } from './logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a routerLink="/" class="brand"><app-logo /><span>Embarcarte</span></a>
          <p class="muted">Tecnología náutica abierta para navegar con más información y menos dependencia.</p>
          <p><a [href]="'mailto:' + site.email">{{ site.email }}</a></p>
        </div>
        <div>
          <h2 class="footer-title">Productos</h2>
          <ul>
            @for (p of products; track p.slug) {
              <li><a [routerLink]="['/productos', p.slug]">{{ p.name }}</a></li>
            }
          </ul>
        </div>
        <div>
          <h2 class="footer-title">Empresa</h2>
          <ul>
            <li><a routerLink="/open-marine">Plataforma Open Marine</a></li>
            <li><a routerLink="/servicios">Servicios</a></li>
            <li><a routerLink="/sobre-nosotros">Sobre nosotros</a></li>
            <li><a routerLink="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h2 class="footer-title">Legal</h2>
          <ul>
            <li><a routerLink="/aviso-legal">Aviso legal</a></li>
            <li><a routerLink="/privacidad">Privacidad</a></li>
            <li><a routerLink="/cookies">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom muted">© {{ year }} {{ site.name }}. Todos los derechos reservados.</div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly products = PRODUCTS;
  protected readonly year = new Date().getFullYear();
}
