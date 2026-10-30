#!/usr/bin/env node
/** Reviewer verification of TYPOGRAPHY-SYSTEM.md §3 T-4 / §7: inspect the built CSS for
 * @font-face URL origins and count emitted woff2 bytes. Read-only. */
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const cssDir = join(ROOT, 'dist/embarcarte/browser');
const cssFile = readdirSync(cssDir).find((f) => /^styles-.*\.css$/.test(f));
const text = readFileSync(join(cssDir, cssFile), 'utf8');

const faces = [...text.matchAll(/@font-face\{[^}]*\}/g)].map((m) => m[0]);
const urls = [];
for (const face of faces) {
  const m = face.match(/url\(([^)]+)\)/);
  if (m) urls.push(m[1].replace(/['"]/g, ''));
}
const external = urls.filter((u) => /^(?:https?:)?\/\//.test(u) || /^data:/.test(u));
const relativeMedia = urls.filter((u) => u.startsWith('./media/') || u.startsWith('media/'));
const woff2 = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.woff2')) woff2.push({ name: entry.name, bytes: readFileSync(p).length });
  }
};
walk(join(ROOT, 'dist'));
console.log(
  JSON.stringify(
    {
      cssFile,
      fontFaceCount: faces.length,
      urlCount: urls.length,
      relativeMediaUrls: relativeMedia.length,
      externalFontUrls: external,
      fontDisplayValues: [...new Set(faces.map((f) => (f.match(/font-display:([^;}]+)/) ?? [])[1]))],
      distWoff2Count: woff2.length,
      distWoff2Bytes: woff2.reduce((a, b) => a + b.bytes, 0),
      fontsGoogleReferenced: /fonts\.googleapis|fonts\.gstatic/.test(text),
      sampleUrls: urls.slice(0, 3),
    },
    null,
    2,
  ),
);
