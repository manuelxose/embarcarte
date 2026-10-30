import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../core/site.config';
import { Brand } from './brand';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Brand],
  template: `
    <footer class="site-footer">
      <div class="wrap footer-top">
        <div>
          <app-brand />
          <p>Tecnología abierta. Libertad en el mar.</p>
          <p><a [href]="'mailto:' + site.email">{{ site.email }}</a></p>
        </div>
        <div>
          <h2 class="footer-title">Qué hacemos</h2>
          <ul>
            <li><a routerLink="/tecnologia">Tecnología Open Marine</a></li>
            <li><a routerLink="/experiencias">Experiencias en el mar</a></li>
            <li><a routerLink="/traslados">Traslados de embarcaciones</a></li>
            <li><a routerLink="/servicios">Instalación y soporte</a></li>
            <li><a routerLink="/guias">Guías náuticas</a></li>
          </ul>
        </div>
        <div>
          <h2 class="footer-title">Tienda</h2>
          <ul>
            <li><a routerLink="/tienda">Catálogo</a></li>
            <li><a routerLink="/carrito">Carrito</a></li>
            <li><a routerLink="/cuenta">Mi cuenta</a></li>
            <li><a routerLink="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h2 class="footer-title">Legal</h2>
          <ul>
            <li><a routerLink="/aviso-legal">Aviso legal</a></li>
            <li><a routerLink="/privacidad">Privacidad</a></li>
            <li><a routerLink="/cookies">Cookies</a></li>
            <li><a routerLink="/condiciones-de-venta">Condiciones de venta</a></li>
          </ul>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>© {{ year }} Embarcarte</span>
        <span>Desarrollado por <a href="https://tecnoriasl.com" target="_blank" rel="noopener noreferrer">Tecnoria</a></span>
        <span class="footer-domain">embarcarte.com</span>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
