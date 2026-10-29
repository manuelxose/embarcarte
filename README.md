# embarcarte.com

Web comercial de **Embarcarte**: tecnología náutica abierta y catálogo de la plataforma
[Open Marine](https://github.com/manuelxose/open-marine) (software y hardware).

- Angular 21 con SSR y prerenderizado de todas las páginas (HTML completo para buscadores).
- SEO: título, descripción, canonical, Open Graph/Twitter y JSON-LD (Organization, WebSite,
  Product, Service, BreadcrumbList) por página; `sitemap.xml` generado en el build; `robots.txt`;
  404 real para rutas desconocidas.
- Formulario de contacto con envío por SMTP (`/api/contact`), campo trampa anti-bots y límite por IP.
- Producción: imagen Docker + Caddy (HTTPS automático con Let's Encrypt, HTTP/3, compresión,
  cabeceras de seguridad, redirección `www` → dominio raíz).

## Desarrollo

```bash
npm ci
npm start              # http://localhost:4200
npm run build          # dist/ + sitemap.xml
npm run serve:ssr      # servidor de producción en http://localhost:4000
```

El contenido vive en `src/app/core/catalog.ts` (productos y servicios) y `src/app/core/site.config.ts`
(email, datos legales). **Antes del lanzamiento completa `SITE.legal`** (titular, NIF, domicilio): se muestra en
el aviso legal y la política de privacidad.

## Despliegue en Contabo

Arquitectura: GitHub Actions compila, publica la imagen en `ghcr.io/manuelxose/embarcarte` y despliega por SSH en
el VPS, donde `docker compose` levanta `web` (Node SSR) y `caddy` (puertos 80/443).

### 1. DNS en Namecheap

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

Opcional, para que el formulario envíe emails: copia `deploy/.env.example` a `/opt/embarcarte/.env` y rellena el SMTP.

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

Para volver a una versión anterior: `WEB_IMAGE=ghcr.io/manuelxose/embarcarte:<sha> docker compose up -d`.
