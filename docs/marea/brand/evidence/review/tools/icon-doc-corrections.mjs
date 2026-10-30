#!/usr/bin/env node
/** Check the icon-doc corrections (IR-03 wording, IR-05 disclaimers, IR-06 flags, IR-01 index text). */
import { readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const dir = join(ROOT, 'docs/marea/brand/assets/icons/ui');
const index = readFileSync(join(dir, 'index.html'), 'utf8');
const proof = readFileSync(join(dir, 'reduction-proof.html'), 'utf8');
const norm = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const idx = norm(index);
const rp = norm(proof);
const flags = (t) => [...t.matchAll(/class="flag">([^<]*)</g)].map((m) => m[1]);
const probe = (label, text, patterns) => {
  console.log(`== ${label}`);
  for (const p of patterns) {
    const m = text.match(p);
    console.log(`  ${String(p).slice(0, 42)} ->`, m ? m[0].slice(0, 200) : 'NOT FOUND');
  }
};
probe('index', idx, [
  /Variantes? de reducci[^.]{0,160}/i,
  /padding[^.]{0,160}/i,
  /2 px[^.]{0,120}/i,
  /no sustituye a la carta n[^.]{0,120}/i,
  /does not replace official nautical charts[^.]{0,120}/i,
  /previsiones son probabil[^.]{0,120}/i,
  /Forecasts are probabilistic[^.]{0,120}/i,
]);
console.log('index flags:', flags(index));
probe('reductionProof', rp, [
  /render proof[^.]{0,160}/i,
  /no es una prueba[^.]{0,160}/i,
  /variante[^.]{0,160}/i,
]);
console.log('reduction flags:', flags(proof));
console.log('reduction has LEGAL_REVIEW_PENDING:', rp.includes('LEGAL_REVIEW_PENDING'));
console.log('index has weather disclaimer:', /previsiones son probabil/i.test(idx) || /Forecasts are probabilistic/i.test(idx));
console.log('index has navigation disclaimer:', /carta n[áa]utica oficial/i.test(idx));
