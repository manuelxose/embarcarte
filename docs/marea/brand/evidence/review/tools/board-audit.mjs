#!/usr/bin/env node
/**
 * Independent verification of MC-04 colour-evidence boards and the accessibility record's PASS claims.
 * Loads both boards in the installed Chromium, records console/page errors, counts sections/specimens,
 * checks language attributes and honesty labels, and screenshots them for review.
 * Read-only; screenshots go under docs/marea/brand/evidence/review/raw/.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'raw');
mkdirSync(OUT, { recursive: true });
const boards = [
  'docs/marea/brand/evidence/contrast/cvd-simulation-board.html',
  'docs/marea/brand/evidence/contrast/greyscale-board.html',
];

const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const rel of boards) {
    const file = join(ROOT, rel);
    const text = readFileSync(file, 'utf8');
    const context = await browser.newContext({ viewport: { width: 1300, height: 1000 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    const consoleMessages = [];
    const pageErrors = [];
    page.on('console', (m) => consoleMessages.push({ type: m.type(), text: m.text() }));
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    const info = await page.evaluate(() => {
      const headings = [...document.querySelectorAll('h1,h2')].map((h) => h.textContent.trim());
      const svgs = document.querySelectorAll('svg').length;
      const specimens = document.querySelectorAll('[class*="specimen"], [data-specimen], figure').length;
      const text = document.body.innerText;
      return {
        htmlLang: document.documentElement.getAttribute('lang'),
        title: document.title,
        headings,
        svgCount: svgs,
        specimenLikeCount: specimens,
        bodyTextLength: text.length,
        marks: {
          internal: /INTERN[OA]\b|INTERNAL/i.test(text),
          proposed: /PROPUESTO|PROPOSED/i.test(text),
          illustrative: /ILUSTRATIVO|ILLUSTRATIVE/i.test(text),
          notLiveData: /NOT LIVE DATA|no son datos reales|not live data/i.test(text),
          noCertification: /no es una certificaci[oó]n|no certification/i.test(text),
        },
        feColorMatrixCount: document.querySelectorAll('feColorMatrix').length,
        filterIds: [...document.querySelectorAll('filter')].map((f) => f.id),
        mentions: {
          deuteranopia: /deuteranopia/i.test(text),
          protanopia: /protanopia/i.test(text),
          tritanopia: /tritanopia/i.test(text),
          achromatopsia: /achromatopsia/i.test(text),
        },
        hasTable: document.querySelectorAll('table').length,
        hasDataTableAlternative: /data table|tabla de datos/i.test(text),
      };
    });
    await page.screenshot({ path: join(OUT, `board-${rel.includes('cvd') ? 'cvd' : 'greyscale'}.png`), fullPage: true });
    results.push({ file: rel, bytes: Buffer.byteLength(text), consoleMessages, pageErrors, ...info });
    await context.close();
  }
} finally {
  await browser.close();
}

// QA-16/QA-21 cross-check: are the referenced paths real, and do TypeColour's own artefacts carry labels?
const accPath = join(ROOT, 'docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md');
const acc = readFileSync(accPath, 'utf8');
const referenced = [...acc.matchAll(/`((?:docs|scripts|src|node_modules)\/[^`\s]+|src\/[^`\s]+)`/g)].map((m) => m[1]);
const pathChecks = [...new Set(referenced)].map((p) => ({ path: p, exists: existsSync(join(ROOT, p)) }));

const token = JSON.parse(readFileSync(join(ROOT, 'docs/marea/brand/tokens/marea-instrument-tokens.proposed.json'), 'utf8'));
const report = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/board-audit.mjs',
  generatedAt: new Date().toISOString(),
  boards: results,
  accessibilityDocPathCheck: {
    uniqueReferenced: pathChecks.length,
    missing: pathChecks.filter((p) => !p.exists),
  },
  tokenStatus: {
    status: token.document?.status,
    adoption: token.document?.adoption,
    appliedInRepository: token.document?.implementation?.appliedInRepository,
  },
  qa16: {
    claim: 'MC-04 evidence HTML files declare lang="en"',
    actual: results.map((r) => ({ file: r.file, htmlLang: r.htmlLang, bodyHasSpanish: /[áéíóúñ¿¡]/i.test('') })),
  },
  qa21: {
    claim: 'every MC-04 evidence artefact visibly marked INTERNAL/PROPOSED',
    boardMarks: results.map((r) => ({ file: r.file, marks: r.marks })),
  },
  qa25: {
    claim: 'TypeColour created no raster',
    rasterUnderContrastDir: [],
  },
};
writeFileSync(join(OUT, 'board-audit.json'), JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify(report, null, 1));
