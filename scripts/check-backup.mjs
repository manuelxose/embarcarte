import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { DatabaseSync } from 'node:sqlite';

/**
 * Verificación real de backup/restore en un entorno aislado:
 * servidor + SQLite temporal, pedido, imagen, copia, restauración y comprobación
 * de integridad, claves foráneas y recuentos. No toca producción.
 */
const root = process.cwd();
const temp = await mkdtemp(join(tmpdir(), 'embarcarte-backup-'));
const data = join(temp, 'data');
const backup = join(temp, 'backup');
const restored = join(temp, 'restored');
const tampered = join(temp, 'tampered');
const badTarget = join(temp, 'bad-target');
const port = 4322;
const base = `http://127.0.0.1:${port}`;

const server = spawn(process.execPath, [join(root, 'dist/embarcarte/server/server.mjs')], {
  env: {
    ...process.env,
    PORT: String(port),
    DATA_DIR: data,
    ADMIN_EMAIL: 'admin@backup.test',
    ADMIN_PASSWORD: 'backup-password-123',
    STRIPE_SECRET_KEY: '',
    STRIPE_WEBHOOK_SECRET: '',
    SMTP_HOST: '',
  },
  stdio: ['ignore', 'ignore', 'inherit'],
});

const run = (command, args, { expectZero = true } = {}) =>
  new Promise((resolvePromise, reject) => {
    // El caso corrupto se espera que falle: no ensuciar el log con su stack.
    const child = spawn(command, args, { cwd: root, stdio: expectZero ? 'inherit' : 'ignore' });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (expectZero && code !== 0) reject(new Error(`${command} exited with ${code}`));
      else resolvePromise(code);
    });
  });

const request = async (path, { cookie, body, method = body ? 'POST' : 'GET' } = {}) => {
  const response = await fetch(base + path, {
    method,
    headers: {
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...(cookie ? { cookie } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return {
    response,
    data: response.status === 204 ? null : await response.json(),
    cookie: response.headers.get('set-cookie')?.split(';')[0],
  };
};

try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(base + '/healthz')).ok) {
        ready = true;
        break;
      }
    } catch {}
    await sleep(200);
  }
  assert.ok(ready, 'server started');

  const admin = await request('/api/auth/login', {
    body: { email: 'admin@backup.test', password: 'backup-password-123' },
  });
  assert.equal(admin.response.status, 200);
  const product = await request('/api/admin/products', {
    cookie: admin.cookie,
    body: {
      slug: 'backup-product',
      name: 'Producto backup',
      category: 'Prueba',
      summary: 'Resumen',
      description: 'Descripción',
      price_cents: 2500,
      stock: 5,
      image: '',
      active: true,
    },
  });
  assert.equal(product.response.status, 201);

  const customer = await request('/api/auth/register', {
    body: { name: 'Backup', email: 'backup@example.test', password: 'backup-password-123' },
  });
  assert.equal(customer.response.status, 201);
  const order = await request('/api/orders', {
    cookie: customer.cookie,
    body: {
      shippingName: 'Backup',
      shippingPhone: '600000000',
      shippingAddress: 'Puerto 1',
      payment: 'transferencia',
      terms: true,
      items: [{ slug: 'backup-product', qty: 1, price_cents: 2500 }],
    },
  });
  assert.equal(order.response.status, 201);

  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    Buffer.alloc(32, 1),
  ]);
  const upload = await fetch(base + '/api/admin/uploads', {
    method: 'POST',
    headers: { 'content-type': 'image/png', cookie: admin.cookie },
    body: png,
  });
  assert.equal(upload.status, 201);

  server.kill();
  await new Promise((resolvePromise) => server.once('exit', resolvePromise));

  await run(process.execPath, [
    join(root, 'scripts/backup.mjs'),
    '--data-dir',
    data,
    '--out',
    backup,
  ]);
  const manifest = JSON.parse(await readFile(join(backup, 'manifest.json'), 'utf8'));
  assert.equal(manifest.database.integrity_check, 'ok');
  assert.equal(manifest.database.counts.orders, 1);
  assert.equal(manifest.uploads.length, 1);

  await run(process.execPath, [
    join(root, 'scripts/restore.mjs'),
    '--backup',
    backup,
    '--target',
    restored,
  ]);
  const verification = JSON.parse(
    await readFile(join(restored, 'restore-verification.json'), 'utf8'),
  );
  assert.equal(verification.verified, true);
  assert.equal(verification.foreign_key_violations, 0);
  assert.deepEqual(verification.counts, manifest.database.counts);
  assert.ok((await stat(join(restored, 'uploads'))).isDirectory());

  const restoredDb = new DatabaseSync(join(restored, 'embarcarte.sqlite'), { readOnly: true });
  assert.equal(restoredDb.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
  assert.equal(restoredDb.prepare('SELECT COUNT(*) AS n FROM order_items').get().n, 1);
  assert.equal(restoredDb.prepare('SELECT total_cents FROM orders').get().total_cents, 2500);
  restoredDb.close();

  // A corrupt copy must be refused before it can overwrite anything.
  await cp(backup, tampered, { recursive: true });
  const dbCopy = join(tampered, 'embarcarte.sqlite');
  const bytes = await readFile(dbCopy);
  bytes[bytes.length - 1] ^= 0xff;
  await writeFile(dbCopy, bytes);
  const code = await run(
    process.execPath,
    [join(root, 'scripts/restore.mjs'), '--backup', tampered, '--target', badTarget],
    { expectZero: false },
  );
  assert.notEqual(code, 0, 'a tampered backup is rejected');
  await assert.rejects(stat(badTarget), 'no target is created for an invalid backup');

  console.log(
    'Backup/restore checks passed: consistent snapshot, checksums, integrity, foreign keys, counts and corrupt-copy rejection.',
  );
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    const exited = new Promise((resolvePromise) => server.once('exit', resolvePromise));
    server.kill();
    await exited;
  }
  if (!resolve(temp).startsWith(resolve(tmpdir()) + sep))
    throw new Error('Unexpected temporary directory');
  await rm(temp, { recursive: true, force: true });
}
