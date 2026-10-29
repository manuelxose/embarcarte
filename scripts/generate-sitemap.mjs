// Genera sitemap.xml a partir de las páginas prerenderizadas en dist/.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://embarcarte.com';
const root = join(import.meta.dirname, '../dist/embarcarte/browser');
const today = new Date().toISOString().slice(0, 10);

const pages = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry === 'index.html') pages.push(relative(root, dir).split(sep).join('/'));
  }
};
walk(root);

const priority = (path) => (path === '' ? '1.0' : /^(aviso-legal|privacidad|cookies)$/.test(path) ? '0.2' : '0.8');
const urls = pages
  .sort()
  .map(
    (path) =>
      `  <url><loc>${SITE_URL}/${path}</loc><lastmod>${today}</lastmod><priority>${priority(path)}</priority></url>`,
  );

writeFileSync(
  join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);
console.log(`sitemap.xml: ${pages.length} URLs`);
