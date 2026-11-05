import { expect, test, type Page } from '@playwright/test';
import type { AxeResults } from 'axe-core';
import {
  ALL_MODES,
  AXE_TAGS,
  EVIDENCE_DIR,
  MODE_LABELS,
  RESULTS_DIR,
  assertCatalogueBuilt,
  collectAxe,
  describeViolations,
  gotoCatalogue,
  setMode,
  waitForPaint,
  writeJsonFile,
} from './helpers';

/**
 * Accesibilidad automatizada del catálogo interno MC-17.
 *
 * Los resultados de axe son evidencia de reglas automatizadas, NO una
 * declaración de conformidad WCAG completa. La revisión manual (contraste real,
 * lector de pantalla, orden de foco) sigue siendo obligatoria.
 */

const resultsByMode = new Map<string, AxeResults>();

test.beforeAll(async () => {
  await assertCatalogueBuilt();
});

test('all four visual modes pass the required automated WCAG A/AA rules', async ({ page }) => {
  // axe recorre una página muy grande (catálogo + documentación de contratos):
  // cuatro modos pueden superar los dos minutos aunque no haya violaciones.
  test.setTimeout(300_000);
  const failures: string[] = [];

  for (const mode of ALL_MODES) {
    await gotoCatalogue(page);
    await setMode(page, mode);
    const results = await collectAxe(page);
    resultsByMode.set(mode, results);

    const raw = JSON.stringify(results, null, 2);
    writeJsonFile(RESULTS_DIR, `axe-${mode}.json`, results);
    await test.info().attach(`axe-${mode}`, {
      body: raw,
      contentType: 'application/json',
    });

    for (const violation of describeViolations(results)) {
      failures.push(`[${mode}] ${violation}`);
    }
  }

  // Evidencia resumida: recuentos por modo y aviso explícito de alcance limitado.
  const summary = {
    title: 'MC-17 internal catalogue — automated axe summary',
    generatedAt: new Date().toISOString(),
    tool: '@axe-core/playwright (axe-core)',
    tags: [...AXE_TAGS],
    scope:
      'Internal, unpublished Angular catalogue (preview/), four visual modes, default ES locale. Automated rules only.',
    conformanceClaim:
      'NONE. This file is not a claim of full WCAG conformance; automated coverage is partial and manual review is required.',
    modes: Object.fromEntries(
      ALL_MODES.map((mode) => {
        const results = resultsByMode.get(mode);
        const violations = results?.violations.length ?? 0;
        const passes = results?.passes.length ?? 0;
        const incomplete = results?.incomplete.length ?? 0;
        const inapplicable = results?.inapplicable.length ?? 0;
        return [
          mode,
          {
            label: MODE_LABELS[mode],
            violations,
            passes,
            incomplete,
            inapplicable,
            violationRules: results?.violations.map((violation) => violation.id) ?? [],
            incompleteRules: results?.incomplete.map((rule) => rule.id) ?? [],
          },
        ];
      }),
    ),
  };
  writeJsonFile(EVIDENCE_DIR, 'axe-summary.json', summary);

  expect(failures, `Violaciones axe:\n${failures.join('\n')}`).toEqual([]);
});

test('every status badge carries non-empty visible text (never colour only)', async ({ page }) => {
  await gotoCatalogue(page);
  // `marea-status-badge` es un selector de atributo (`span[marea-status-badge]`),
  // no un elemento: en el DOM el host es <span data-marea-component="marea-status-badge">.
  const badges = await page
    .locator('[data-marea-component="marea-status-badge"]')
    .evaluateAll((elements) =>
      elements.map((element) => {
        const style = getComputedStyle(element);
        return {
          text: (element as HTMLElement).innerText.trim(),
          display: style.display,
          visibility: style.visibility,
        };
      }),
    );

  expect(badges.length, 'No se renderizó ningún marea-status-badge').toBeGreaterThan(0);
  const empty = badges.filter(
    (badge) => badge.text.length === 0 || badge.display === 'none' || badge.visibility === 'hidden',
  );
  expect(empty, `Estados sin texto visible (color-only): ${JSON.stringify(empty)}`).toEqual([]);
});

test('focused buttons and links show a visible focus indicator in web-light and instrument-night', async ({
  page,
}) => {
  for (const mode of ['web-light', 'instrument-night'] as const) {
    await gotoCatalogue(page);
    await setMode(page, mode);
    await waitForPaint(page);

    const button = await focusFirstByTab(page, 'button');
    expectFocusRing(button, `${mode} / botón`);

    const link = await focusFirstByTab(page, 'a');
    expectFocusRing(link, `${mode} / enlace`);
  }
});

test('images and role=img SVGs expose an accessible name while decorative SVGs are aria-hidden', async ({
  page,
}) => {
  await gotoCatalogue(page);

  const report = await page.evaluate(() => {
    const problems: string[] = [];
    const labelOf = (element: Element): string => {
      const ariaLabel = element.getAttribute('aria-label')?.trim() ?? '';
      if (ariaLabel) return ariaLabel;
      const labelledBy = element.getAttribute('aria-labelledby')?.trim() ?? '';
      if (labelledBy) {
        const text = labelledBy
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim() ?? '')
          .join(' ')
          .trim();
        if (text) return text;
      }
      return element.querySelector('title')?.textContent?.trim() ?? '';
    };

    document.querySelectorAll('img').forEach((image) => {
      const alt = image.getAttribute('alt')?.trim() ?? '';
      const hidden = image.getAttribute('aria-hidden') === 'true';
      if (!alt && !hidden) {
        problems.push(`<img> sin alt ni aria-hidden: ${image.outerHTML.slice(0, 120)}`);
      }
    });

    document.querySelectorAll('svg').forEach((svg) => {
      const role = svg.getAttribute('role');
      if (role === 'img') {
        if (!labelOf(svg)) {
          problems.push(`SVG role="img" sin nombre accesible: ${svg.outerHTML.slice(0, 120)}`);
        }
        return;
      }
      if (svg.getAttribute('aria-hidden') !== 'true') {
        problems.push(`SVG decorativo sin aria-hidden="true": ${svg.outerHTML.slice(0, 120)}`);
      }
    });

    return { problems, svgCount: document.querySelectorAll('svg').length };
  });

  expect(
    report.svgCount,
    'No se renderizó ningún SVG; la comprobación sería vacía',
  ).toBeGreaterThan(0);
  expect(report.problems, report.problems.join('\n')).toEqual([]);
});

interface FocusRing {
  readonly label: string;
  readonly outlineWidth: string;
  readonly outlineStyle: string;
  readonly boxShadow: string;
}

/** Llega al primer control del selector pulsando Tab (nunca con `.focus()`). */
async function focusFirstByTab(page: Page, selector: string) {
  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur();
    window.scrollTo(0, 0);
  });

  for (let presses = 0; presses < 120; presses += 1) {
    await page.keyboard.press('Tab');
    const ring = await page.evaluate((wanted) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active || !active.matches(wanted)) return null;
      const style = getComputedStyle(active);
      return {
        label: (active.textContent ?? '').trim().slice(0, 80) || active.tagName,
        outlineWidth: style.outlineWidth,
        outlineStyle: style.outlineStyle,
        boxShadow: style.boxShadow,
      };
    }, selector);
    if (ring) return ring as FocusRing;
  }

  throw new Error(`No se alcanzó ningún <${selector}> con 120 pulsaciones de Tab`);
}

function expectFocusRing(ring: FocusRing, context: string): void {
  const hasOutline = ring.outlineStyle !== 'none' && ring.outlineWidth !== '0px';
  const hasBoxShadowRing = ring.boxShadow !== 'none' && ring.boxShadow.trim().length > 0;
  expect(
    hasOutline || hasBoxShadowRing,
    `${context}: "${ring.label}" no muestra indicador de foco (outlineStyle=${ring.outlineStyle}, outlineWidth=${ring.outlineWidth}, boxShadow=${ring.boxShadow})`,
  ).toBe(true);
}
