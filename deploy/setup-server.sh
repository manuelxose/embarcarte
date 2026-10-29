#!/usr/bin/env bash
# Preparación inicial de un VPS de Contabo (Ubuntu 22.04/24.04) para embarcarte.com.
# Uso, como root:  bash setup-server.sh "<clave pública SSH para desplegar>"
set -euo pipefail

DEPLOY_KEY="${1:?Pasa la clave pública SSH del despliegue como primer argumento}"
APP_DIR=/opt/embarcarte

apt-get update
apt-get -y upgrade
apt-get -y install ca-certificates curl ufw fail2ban unattended-upgrades

# Docker oficial
if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

# Usuario de despliegue sin contraseña, solo con clave
id deploy >/dev/null 2>&1 || adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
grep -qxF "$DEPLOY_KEY" /home/deploy/.ssh/authorized_keys 2>/dev/null || echo "$DEPLOY_KEY" >> /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys

install -d -o deploy -g deploy "$APP_DIR"

# Cortafuegos: SSH, HTTP y HTTPS (incluido HTTP/3)
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp
ufw --force enable

# SSH solo con clave
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
systemctl reload ssh || systemctl reload sshd

systemctl enable --now fail2ban
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "Servidor listo. Directorio de la app: $APP_DIR"
