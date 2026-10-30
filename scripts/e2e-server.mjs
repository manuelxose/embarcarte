import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

/**
 * Servidor aislado para las pruebas E2E de Playwright.
 *
 * - Base de datos temporal fuera del repositorio.
 * - Stripe desactivado: nunca se contacta con el servicio real.
 * - Productos y usuarios de prueba creados por la API pública/administrativa.
 */
const root = process.cwd();
const port = Number(process.env['E2E_PORT'] ?? 4310);
const base = `http://127.0.0.1:${port}`;
const data = await mkdtemp(join(tmpdir(), 'embarcarte-e2e-'));

const server = spawn(process.execPath, [join(root, 'dist/embarcarte/server/server.mjs')], {
  cwd: root,
  env: {
    ...process.env,
    PORT: String(port),
    DATA_DIR: data,
    ADMIN_EMAIL: 'admin@e2e.test',
    ADMIN_PASSWORD: 'e2e-admin-password',
    STRIPE_SECRET_KEY: '',
    STRIPE_WEBHOOK_SECRET: '',
    SMTP_HOST: '',
    NODE_ENV: 'test',
  },
  stdio: ['ignore', 'inherit', 'inherit'],
});

let stopping = false;
const shutdown = async () => {
  if (stopping) return;
  stopping = true;
  if (server.exitCode === null) {
    const exited = new Promise((resolve) => server.once('exit', resolve));
    server.kill();
    await exited;
  }
  await rm(data, { recursive: true, force: true }).catch(() => {});
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function waitForServer() {
  for (let i = 0; i < 150; i++) {
    try {
      const response = await fetch(`${base}/healthz`);
      if (response.ok) return;
    } catch {}
    await sleep(200);
  }
  throw new Error('E2E server did not become ready');
}

async function request(path, { method = 'GET', body, cookie } = {}) {
  const response = await fetch(base + path, {
    method,
    headers: {
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...(cookie ? { cookie } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { response, data: response.status === 204 ? null : await response.json() };
}

const product = (overrides) => ({
  slug: 'e2e-hub',
  name: 'Hub de prueba',
  category: 'Prueba',
  summary: 'Resumen de prueba',
  description: 'Descripción de prueba',
  name_en: 'Test Hub',
  category_en: 'Test',
  summary_en: 'Test summary',
  description_en: 'Test description',
  price_cents: 2000,
  stock: 50,
  image: '',
  active: true,
  ...overrides,
});

await waitForServer();

try {
  const admin = await request('/api/auth/login', {
    method: 'POST',
    body: { email: 'admin@e2e.test', password: 'e2e-admin-password' },
  });
  if (admin.response.status !== 200) throw new Error('E2E admin login failed');
  const cookie = admin.response.headers.get('set-cookie')?.split(';')[0];

  for (const item of [
    product({}),
    product({
      slug: 'e2e-solo-es',
      name: 'Solo español',
      name_en: '',
      category_en: '',
      summary_en: '',
      description_en: '',
      stock: 5,
    }),
    product({ slug: 'e2e-agotado', name: 'Agotado', name_en: 'Sold out', stock: 0 }),
  ]) {
    const created = await request('/api/admin/products', { method: 'POST', body: item, cookie });
    if (created.response.status !== 201)
      throw new Error(`E2E product seed failed: ${created.response.status}`);
  }

  for (const [name, email] of [
    ['E2E Owner', 'e2e-owner@example.test'],
    ['E2E Other', 'e2e-other@example.test'],
  ]) {
    const registered = await request('/api/auth/register', {
      method: 'POST',
      body: { name, email, password: 'e2e-password-123' },
    });
    if (registered.response.status !== 201)
      throw new Error(`E2E user seed failed: ${registered.response.status}`);
  }

  console.log(`E2E server ready on ${base} (${data})`);
} catch (error) {
  console.error(error);
  await shutdown();
  process.exit(1);
}
