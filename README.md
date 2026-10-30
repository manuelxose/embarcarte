# embarcarte.com

Web comercial de **Embarcarte**: tecnología náutica abierta ([Open Marine](https://github.com/manuelxose/open-marine)),
experiencias en el mar y traslados de embarcaciones, con tienda online, área de cliente y panel de administración.

- Angular 21 con SSR. Páginas corporativas prerenderizadas; tienda renderizada en servidor en cada petición
  (precio y stock siempre actuales para Google); carrito, cuenta y admin solo en el navegador.
- SEO: título, descripción, canonical, Open Graph/Twitter y JSON-LD (Organization, WebSite, Product con Offer,
  Service, BreadcrumbList); `sitemap.xml` dinámico (incluye los productos publicados); 404 y 301 reales.
- **Tienda** (`/tienda`, `/carrito`): catálogo gestionado desde el admin, control de stock, pago con tarjeta vía
  Stripe Checkout (opcional) o por transferencia, emails de confirmación.
- **Área de cliente** (`/acceso`, `/cuenta`): registro, inicio de sesión, pedidos y su estado, datos de envío y
  cambio de contraseña.
- **Administración** (`/admin`): resumen de ventas, pedidos (cambio de estado; al cancelar se repone stock),
  productos (alta, edición, publicación, subida de fotos), clientes y mensajes del formulario de contacto.
- Backend en el propio servidor Express (`src/server/`): SQLite (`node:sqlite`), contraseñas con scrypt, sesión en
  cookie HttpOnly/SameSite, límites por IP, comprobación de origen y verificación de firma del webhook de Stripe.
- Diseño de la maqueta: Manrope y DM Sans servidas desde el propio dominio (sin Google Fonts) y fotografías de
  Unsplash configuradas en `src/app/core/images.ts`.
- Producción: imagen Docker + Caddy (HTTPS automático con Let's Encrypt, HTTP/3, compresión,
  cabeceras de seguridad, redirección `www` → dominio raíz).

## Desarrollo

```bash
npm ci
npm start              # http://localhost:4200
npm run build          # dist/ + sitemap.xml
npm run serve:ssr      # servidor de producción en http://localhost:4000
npm run serve:ssr:watch # servidor local que se reinicia con cada compilación vigilada (Windows/macOS)
```

Para probar la tienda y el admin en local:

```bash
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=cambia-esto npm run serve:ssr
```

Los datos (base de datos y fotos subidas) se guardan en `./data` (o en `DATA_DIR`).

Los textos de las fichas de tecnología viven en `src/app/core/catalog.ts`, las fotos en `src/app/core/images.ts` y
los datos de la empresa en `src/app/core/site.config.ts`. Los productos de la tienda se gestionan en `/admin`: se
crean tres borradores (Hub, Autopilot y kit AIS) **sin precio ni stock**; revísalos y publícalos desde el panel. **Antes del lanzamiento completa `SITE.legal`** (titular, NIF, domicilio): se muestra en
el aviso legal y la política de privacidad.

## Despliegue en Contabo

Arquitectura: GitHub Actions compila, publica la imagen en `ghcr.io/manuelxose/embarcarte` y despliega por SSH en
el VPS, donde `docker compose` levanta `web` (Node SSR) y `caddy` (puertos 80/443).

### 0. ¿Servidor dedicado o compartido?

- **Compartido** (el VPS ya tiene nginx con otra web, como Auctorio): el contenedor escucha solo en
  `127.0.0.1:4000` y nginx lo publica con `deploy/nginx/embarcarte.com.conf`. Deja `COMPOSE_PROFILES` vacío.
- **Dedicado**: pon `COMPOSE_PROFILES=caddy` en el `.env` y Caddy se encarga de 80/443 y del certificado.

Si al abrir embarcarte.com aparece otra web del servidor (p. ej. Auctorio), nginx no tiene un bloque
`server_name embarcarte.com` y está respondiendo el sitio por defecto: instala la configuración de `deploy/nginx/`.

### 1. DNS (Cloudflare)

Con el dominio en Cloudflare: registros `A` de `@` y `www` a la IP del VPS, proxy activado (nube naranja),
**SSL/TLS → Full (strict)** con un *Origin Certificate* instalado en nginx, y sin *Redirect Rules* / *Page Rules*
heredadas que apunten a otro dominio. En Namecheap solo deben figurar los nameservers de Cloudflare.

### 1b. DNS en Namecheap (si no usas Cloudflare)

En *Domain List → embarcarte.com → Manage → Advanced DNS* (con *Nameservers: Namecheap BasicDNS*):

| Tipo | Host | Valor | TTL |
|---|---|---|---|
| A | `@` | IP pública del VPS de Contabo | Automatic |
| A | `www` | IP pública del VPS de Contabo | Automatic |

Borra los registros por defecto de *parking* (`CNAME www → parkingpage.namecheap.com` y el `URL Redirect` de `@`).
Si el VPS tiene IPv6, añade también registros `AAAA`.

### 2. Preparar el VPS (una sola vez)

Genera una clave solo para el despliegue:

```bash
ssh-keygen -t ed25519 -f embarcarte_deploy -N "" -C "github-actions@embarcarte"
```

Copia el script al servidor y ejecútalo como root con la clave pública:

```bash
scp deploy/setup-server.sh root@IP_DEL_VPS:/root/
```

```bash
ssh root@IP_DEL_VPS 'bash /root/setup-server.sh "$(cat)"' < embarcarte_deploy.pub
```

Instala Docker, crea el usuario `deploy`, activa el cortafuegos (22, 80, 443), fail2ban, actualizaciones
automáticas y desactiva el acceso SSH por contraseña. **Comprueba que entras con tu clave antes de cerrar la sesión.**

Crea la configuración de la app a partir de `deploy/.env.example`:

```bash
ssh deploy@IP_DEL_VPS 'install -m 600 /dev/null /opt/embarcarte/.env && nano /opt/embarcarte/.env'
```

Como mínimo rellena `ADMIN_EMAIL` y `ADMIN_PASSWORD` (acceso a `/admin`). Para emails, el SMTP; para cobrar con
tarjeta, las claves de Stripe y un webhook a `https://embarcarte.com/api/stripe/webhook` con el evento
`checkout.session.completed`.

### 3. Secretos en GitHub

En *Settings → Secrets and variables → Actions* del repo:

- `CONTABO_HOST`: IP del VPS.
- `CONTABO_SSH_KEY`: contenido de la clave privada `embarcarte_deploy`.

Cada push a `main` compila, publica la imagen y despliega. También puede lanzarse a mano desde *Actions → Build & deploy*.
Caddy obtiene el certificado HTTPS en cuanto el DNS apunta al servidor.

### 4. Tras el primer despliegue

- Alta en [Google Search Console](https://search.google.com/search-console) y Bing Webmaster Tools; envía
  `https://embarcarte.com/sitemap.xml`.
- Comprueba los datos estructurados con la [prueba de resultados enriquecidos](https://search.google.com/test/rich-results).

### Operación

```bash
ssh deploy@IP_DEL_VPS
cd /opt/embarcarte
docker compose ps
docker compose logs -f web
```

Copia de seguridad de la base de datos y las fotos (volumen `app_data`), por ejemplo cada noche con cron:

```bash
docker run --rm -v embarcarte_app_data:/data -v /home/deploy/backups:/backup alpine tar czf /backup/embarcarte-$(date +%F).tgz -C /data .
```

Para volver a una versión anterior: `WEB_IMAGE=ghcr.io/manuelxose/embarcarte:<sha> docker compose up -d`.
