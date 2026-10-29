# Prompt: despliegue automático de embarcarte.com

Copia todo lo que hay bajo la línea en la sesión del agente que tiene acceso al VPS de Contabo (SSH) y a Cloudflare.

---

Necesito que dejes **embarcarte.com** en producción de forma completamente automática, sin pedirme pasos manuales. Tienes acceso SSH al VPS de Contabo y acceso a Cloudflare. Hazlo todo tú, verifica cada paso y al final dame un informe.

## Contexto

- Repositorio: `https://github.com/manuelxose/embarcarte`, rama `main`. Es una app Angular 21 con SSR y un backend Express + SQLite en el mismo proceso Node (tienda, área de cliente, admin). Lee `README.md` y la carpeta `deploy/` antes de empezar.
- Imagen Docker: `Dockerfile` en la raíz. El contenedor escucha en el puerto 4000, guarda los datos en el volumen `/app/data` y expone `/healthz`.
- `deploy/docker-compose.yml`: el servicio `web` publica `127.0.0.1:${WEB_PORT:-4000}:4000`. El servicio `caddy` está en el perfil `caddy` y **no debe activarse** en este servidor.
- `deploy/nginx/embarcarte.com.conf`: plantilla de nginx para embarcarte.com detrás de Cloudflare, con Origin Certificate.
- `deploy/.env.example`: variables de la app.
- **El VPS es compartido.** Ya sirve otra web, **Auctorio**, con nginx. Ahora mismo embarcarte.com acaba en Auctorio porque nginx no tiene un bloque para ese dominio y responde el sitio por defecto. También puede haber reglas de redirección en Cloudflare.

## Reglas obligatorias

1. **No rompas Auctorio** ni ningún otro servicio del servidor. No modifiques sus bloques de nginx, sus contenedores, sus certificados ni sus registros DNS.
2. **No ejecutes `deploy/setup-server.sh`.** No toques `ufw`/iptables ni `sshd_config`, y no actualices paquetes del sistema salvo que haga falta instalar Docker.
3. Antes de recargar nginx ejecuta siempre `nginx -t`. Si falla, revierte tu cambio.
4. Antes de modificar cualquier fichero existente, haz una copia `*.bak-<fecha>`.
5. No subas secretos al repositorio ni los muestres en logs públicos.
6. Si algo no se puede automatizar (por ejemplo, falta un permiso en el token de Cloudflare), dime exactamente qué permiso falta y sigue con todo lo demás.

## Pasos

### 1. Inspección del VPS (solo lectura)
- Versiones de Docker, Docker Compose y nginx. Revisa `ss -ltnp` y `/etc/nginx/sites-enabled/*`, y anota qué bloque es `default_server` y qué dominios sirve Auctorio.
- Elige `WEB_PORT`: 4000 si está libre; si no, el primer puerto libre desde 4010.
- Si falta Docker, instálalo con `curl -fsSL https://get.docker.com | sh`.

### 2. Código e imagen
- Clona o actualiza `main` en `/opt/embarcarte/src`. Si el repo es privado y no tienes credenciales de GitHub en el VPS, crea una *deploy key* de solo lectura o dime qué necesitas.
- Copia `deploy/docker-compose.yml`, `deploy/Caddyfile` y `deploy/nginx/` a `/opt/embarcarte/`.
- Construye la imagen en el propio servidor: `docker build -t ghcr.io/manuelxose/embarcarte:latest /opt/embarcarte/src`.

### 3. Configuración `/opt/embarcarte/.env` (permisos 600)
Parte de `deploy/.env.example`:
- `SITE_URL=https://embarcarte.com`
- `COMPOSE_PROFILES=` (vacío)
- `WEB_PORT=<el elegido>`
- `ADMIN_EMAIL=manuelxgon@gmail.com`
- `ADMIN_PASSWORD=`: genera una contraseña aleatoria de 24 caracteres y dámela solo en el informe final.
- SMTP y Stripe vacíos, salvo que encuentres credenciales ya configuradas para este dominio.

### 4. Arranque
- `cd /opt/embarcarte && docker compose up -d`.
- Comprueba que `curl -s http://127.0.0.1:<WEB_PORT>/healthz` devuelve `{"ok":true}` y que `docker compose ps` muestra el contenedor `healthy`.

### 5. Cloudflare (por API)
Zona `embarcarte.com`:
- **DNS:** registros `A` de `@` y `www` con la IP pública del VPS, proxied (nube naranja). Añade `AAAA` solo si el VPS tiene IPv6 y nginx escucha en IPv6. Elimina los registros que apunten a otro sitio (*parking* de Namecheap, CNAME a Auctorio, etc.).
- Revisa **Redirect Rules**, **Page Rules**, **Bulk Redirects** y **Workers routes** de la zona. Elimina cualquiera que redirija embarcarte.com a Auctorio o a otro dominio, y anota lo que borres.
- **SSL/TLS:** modo `strict` (Full strict), *Always Use HTTPS* activado y TLS mínimo 1.2.
- **Origin Certificate** para `embarcarte.com` y `*.embarcarte.com`, con validez de 15 años:
  - genera la clave y el CSR con `openssl` en el VPS;
  - pide el certificado con `POST /client/v4/certificates` (`request_type: origin-rsa`);
  - guárdalo como `/etc/ssl/cloudflare/embarcarte.com.pem` y `/etc/ssl/cloudflare/embarcarte.com.key` (clave con permisos 600).
  - Si el token no tiene permiso para Origin CA, usa como alternativa `certbot` con el plugin `dns-cloudflare` y ajusta las rutas en el bloque de nginx.
- Verifica en Namecheap (o con `dig NS embarcarte.com`) que el dominio usa los nameservers de Cloudflare.

### 6. nginx
- Instala `deploy/nginx/embarcarte.com.conf` en `/etc/nginx/sites-available/` y enlázalo en `sites-enabled/`. Si `WEB_PORT` no es 4000, cambia el `proxy_pass`.
- Si la versión de nginx es anterior a la 1.25, sustituye `http2 on;` por `listen 443 ssl http2;`.
- Si el servidor usa `conf.d/` en lugar de `sites-enabled/`, colócalo donde corresponda.
- `nginx -t && systemctl reload nginx`.

### 7. Despliegue automático desde GitHub (si tienes acceso a GitHub)
- Crea el usuario `deploy` (grupo `docker`, sin contraseña), hazlo dueño de `/opt/embarcarte` y genera una clave SSH ed25519 solo para el despliegue. Autoriza la clave pública en `/home/deploy/.ssh/authorized_keys`.
- En el repo `manuelxose/embarcarte` crea los secretos de Actions `CONTABO_HOST` (la IP) y `CONTABO_SSH_KEY` (la clave privada), y el *environment* `production`.
- Cambia la rama por defecto del repo a `main` y borra la rama `claude/cool-rubin-vsdvnp` (tiene el mismo commit que `main`).
- Lanza el workflow *Build & deploy* y comprueba que termina en verde.
- Si no tienes acceso a GitHub, deja la clave privada en `/root/embarcarte_deploy` (permisos 600) y dime qué secretos tengo que crear.

### 8. Copias de seguridad
Cron diario a las 03:30 que guarde el volumen `embarcarte_app_data` en `/root/backups/embarcarte-YYYY-MM-DD.tgz` y conserve los últimos 14 días.

### 9. Verificación final
Todo esto debe cumplirse:
- `curl -sI https://embarcarte.com` → 200, servido por Cloudflare, **sin redirección a Auctorio**.
- `curl -sI http://embarcarte.com` y `curl -sI https://www.embarcarte.com` → 301 a `https://embarcarte.com/`.
- `https://embarcarte.com/tienda` → 200; `/sitemap.xml` y `/robots.txt` → 200; una URL inventada → 404.
- `https://embarcarte.com/healthz` → `{"ok":true}`.
- El login de admin funciona: `POST /api/auth/login` con las credenciales del `.env` devuelve 200 y una cookie `emb_session` marcada `Secure`.
- **Auctorio sigue funcionando** igual que antes (comprueba su dominio con `curl -sI`).

## Informe final
Dame:
- qué has cambiado en el VPS y en Cloudflare, incluidas las reglas borradas y las copias `.bak`;
- el `WEB_PORT` usado;
- la URL del admin y la contraseña generada (`ADMIN_EMAIL` es manuelxgon@gmail.com);
- el estado del despliegue automático;
- lo que haya quedado pendiente: SMTP, Stripe, publicar productos en `/admin` y completar los datos fiscales en `src/app/core/site.config.ts`.
