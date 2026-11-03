import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  RESULTS_DIR,
  assertCatalogueBuilt,
  expectNoHorizontalOverflow,
  gotoCatalogue,
  waitForPaint,
} from './helpers';

/**
 * Responsive y reflow del catálogo interno MC-17.
 *
 * Se verifican los anchos reales del sistema (320 → 1440), el confinamiento de
 * tablas densas en regiones desplazables y el reflow a 200% de tamaño de texto
 * (WCAG 1.4.4 / 1.4.10) sin scroll horizontal de página.
 */

const WIDTHS = [320, 360, 390, 768, 1024, 1440] as const;
const HEIGHT = 900;

test.beforeAll(async () => {
  await assertCatalogueBuilt();
});

test('no horizontal overflow, tables contained and text not clipped at every width', async ({
  page,
}) => {
  mkdirSync(RESULTS_DIR, { recursive: true });

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: HEIGHT });
    await gotoCatalogue(page);

    await expectNoHorizontalOverflow(page, `viewport ${width}px`);

    // Cada tabla debe vivir en una región desplazable, enfocable y etiquetada.
    const tables = await page.locator('table').evaluateAll((elements) =>
      elements.map((table) => {
        const region = table.closest('[role="region"]');
        const tableRect = table.getBoundingClientRect();
        if (!region) {
          return {
            hasRegion: false,
            regionTabIndex: null,
            regionLabel: null,
            overflowX: null,
            regionRight: null,
            regionLeft: null,
            scrolls: null,
            tableRight: tableRect.right,
            viewportWidth: window.innerWidth,
          };
        }
        const style = getComputedStyle(region);
        const overflowing = region.scrollWidth > region.clientWidth + 1;
        let scrolled = 0;
        if (overflowing) {
          const original = region.scrollLeft;
          region.scrollLeft = 10_000;
          scrolled = region.scrollLeft;
          region.scrollLeft = original;
        }
        const regionRect = region.getBoundingClientRect();
        return {
          hasRegion: true,
          regionTabIndex: region.getAttribute('tabindex'),
          regionLabel: region.getAttribute('aria-label')?.trim() ?? '',
          overflowX: style.overflowX,
          regionRight: regionRect.right,
          regionLeft: regionRect.left,
          scrolls: overflowing ? scrolled > 0 : null,
          tableRight: tableRect.right,
          viewportWidth: window.innerWidth,
        };
      }),
    );

    expect(tables.length, `No hay ninguna tabla en ${width}px`).toBeGreaterThan(0);
    for (const [index, table] of tables.entries()) {
      const context = `tabla ${index + 1} a ${width}px`;
      expect(table.hasRegion, `${context}: no está dentro de [role="region"]`).toBe(true);
      expect(table.regionTabIndex, `${context}: la región no es tabbable`).toBe('0');
      expect(
        (table.regionLabel ?? '').length,
        `${context}: la región no tiene aria-label`,
      ).toBeGreaterThan(0);
      expect(['auto', 'scroll'], `${context}: overflow-x=${table.overflowX}`).toContain(
        table.overflowX,
      );
      // La región (no la tabla) debe caber en el viewport; la tabla puede desbordarla y desplazarse.
      expect(
        table.regionLeft!,
        `${context}: la región empieza fuera del viewport`,
      ).toBeGreaterThanOrEqual(-1);
      expect(
        table.regionRight!,
        `${context}: la región empuja la página más allá del viewport`,
      ).toBeLessThanOrEqual(table.viewportWidth + 1);
      if (table.scrolls !== null) {
        expect(table.scrolls, `${context}: se declara overflow pero no se puede desplazar`).toBe(
          true,
        );
      }
    }

    // Ningún encabezado o párrafo visible debe quedar recortado por overflow hidden.
    const clipped = await page.evaluate(() => {
      const problems: string[] = [];
      document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach((element) => {
        const style = getComputedStyle(element);
        const clipsY = style.overflowY === 'hidden' || style.overflowY === 'clip';
        if (!clipsY) return;
        if (element.clientWidth === 0 || element.clientHeight === 0) return;
        if (style.clipPath !== 'none') return;
        if (element.scrollHeight > element.clientHeight + 1) {
          problems.push(
            `${element.tagName.toLowerCase()} "${(element.textContent ?? '').trim().slice(0, 60)}" scrollHeight=${element.scrollHeight} clientHeight=${element.clientHeight}`,
          );
        }
      });
      return problems;
    });
    expect(clipped, `Texto recortado a ${width}px:\n${clipped.join('\n')}`).toEqual([]);

    // Captura de evidencia por ancho (no es una aserción de snapshot).
    await page.evaluate(() => window.scrollTo(0, 0));
    await waitForPaint(page);
    await page.screenshot({
      path: join(RESULTS_DIR, `responsive-${width}.png`),
      fullPage: false,
      animations: 'disabled',
    });
  }
});

test('200% text scaling keeps the page usable: no overflow, no clipped or overlapping controls', async ({
  page,
}) => {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: HEIGHT });
    await gotoCatalogue(page);

    const styleHandle = await page.addStyleTag({
      content: 'html { font-size: 200% !important; }',
    });
    await waitForPaint(page);

    try {
      await expectNoHorizontalOverflow(page, `viewport ${width}px con texto al 200%`);

      const problems = await page.evaluate(() => {
        const found: string[] = [];
        const isVisible = (element: HTMLElement): boolean => {
          const style = getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          if (style.opacity === '0') return false;
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        };
        const label = (element: HTMLElement): string =>
          (
            element.getAttribute('aria-label') ??
            (element.textContent ?? '').trim().slice(0, 50) ??
            element.tagName
          ).trim() || element.tagName;

        const controls = Array.from(document.querySelectorAll<HTMLElement>('button, a')).filter(
          isVisible,
        );

        for (const control of controls) {
          const rect = control.getBoundingClientRect();
          if (rect.left < -1 || rect.right > window.innerWidth + 1) {
            found.push(
              `control fuera del viewport: "${label(control)}" [${rect.left.toFixed(1)}, ${rect.right.toFixed(1)}] viewport=${window.innerWidth}`,
            );
          }
          const style = getComputedStyle(control);
          const clippedX =
            style.overflowX === 'hidden' && control.scrollWidth > control.clientWidth + 1;
          const clippedY =
            style.overflowY === 'hidden' && control.scrollHeight > control.clientHeight + 1;
          if (clippedX || clippedY) {
            found.push(`control recortado: "${label(control)}"`);
          }
        }

        const byParent = new Map<Element, HTMLElement[]>();
        for (const control of controls) {
          const parent = control.parentElement;
          if (!parent) continue;
          const siblings = byParent.get(parent) ?? [];
          siblings.push(control);
          byParent.set(parent, siblings);
        }
        for (const siblings of byParent.values()) {
          for (let first = 0; first < siblings.length; first += 1) {
            for (let second = first + 1; second < siblings.length; second += 1) {
              const a = siblings[first].getBoundingClientRect();
              const b = siblings[second].getBoundingClientRect();
              const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
              const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
              if (overlapX > 1 && overlapY > 1) {
                found.push(
                  `controles superpuestos: "${label(siblings[first])}" y "${label(siblings[second])}"`,
                );
              }
            }
          }
        }
        return found;
      });

      expect(
        problems,
        `Problemas de reflow al 200% en ${width}px:\n${problems.join('\n')}`,
      ).toEqual([]);
    } finally {
      await styleHandle.evaluate((element) => element.remove());
      await waitForPaint(page);
    }
  }
});
