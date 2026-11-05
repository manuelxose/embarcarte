import { expect, test } from '@playwright/test';
import { LOCALES, gotoLanding, waitForPaint } from './helpers';

/**
 * MC-18 keyboard and focus contract (Chromium, keyboard only).
 *
 * The skip link is the first focusable element and moves focus to <main>; every
 * visible interactive element is reachable with Tab and shows a focus indicator;
 * the DS responsive nav exposes aria-expanded/aria-controls and closes with
 * Escape through its documented path (focus inside the list). No keyboard trap.
 *
 * Inherited DS limitation (not an MC-18 defect): Escape pressed while focus is
 * on the toggle itself does not close the list, because marea-responsive-nav
 * binds keydown on the list (MC-17 component, frozen for MC-18).
 */

test.describe('keyboard and focus', () => {
  test('skip link is the first focusable element and moves focus to main', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoLanding(page, LOCALES[0]);
    await page.evaluate(() => {
      (document.activeElement as HTMLElement | null)?.blur();
      window.scrollTo(0, 0);
    });

    await page.keyboard.press('Tab');
    const first = await page.evaluate(() => {
      const active = document.activeElement as HTMLElement | null;
      const style = active ? getComputedStyle(active) : null;
      return {
        tag: active?.tagName ?? '',
        className: typeof active?.className === 'string' ? active.className : '',
        text: (active?.textContent ?? '').replace(/\s+/g, ' ').trim(),
        href: active?.getAttribute('href') ?? '',
        outlineWidth: style?.outlineWidth ?? '0px',
        outlineStyle: style?.outlineStyle ?? 'none',
        boxShadow: style?.boxShadow ?? 'none',
      };
    });

    expect(first.tag, 'first Tab stop').toBe('A');
    expect(first.className).toContain('skip');
    expect(first.href).toBe('#landing-main');
    expect(first.text.length).toBeGreaterThan(0);
    expect(
      first.outlineStyle !== 'none' && first.outlineWidth !== '0px',
      `skip link focus ring: outlineStyle=${first.outlineStyle}, outlineWidth=${first.outlineWidth}`,
    ).toBe(true);

    await page.keyboard.press('Enter');
    await expect(page.locator('#landing-main')).toBeFocused();
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe('#landing-main');
    await waitForPaint(page);
  });

  for (const width of [1440, 390] as const) {
    test(`all visible interactive elements are Tab-reachable with a focus indicator at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: width <= 390 ? 844 : 900 });
      await gotoLanding(page, LOCALES[0]);
      await page.evaluate(() => {
        (document.activeElement as HTMLElement | null)?.blur();
        window.scrollTo(0, 0);
      });

      const expected = await page.evaluate(() => {
        const isVisible = (element: Element): boolean => {
          const style = getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        };
        return Array.from(document.querySelectorAll('a[href], button, [tabindex="0"]'))
          .filter(isVisible)
          .map((element) => {
            const label = (element.getAttribute('aria-label') ?? element.textContent ?? '')
              .replace(/\s+/g, ' ')
              .trim()
              .slice(0, 60);
            const href = element.getAttribute('href') ?? '';
            return `${element.tagName.toUpperCase()}|${href}|${label}`;
          });
      });
      expect(expected.length, 'no interactive elements found').toBeGreaterThan(3);

      const visited: string[] = [];
      const focusProblems: string[] = [];

      // Bound the traversal to the control count + slack: if every visible
      // control is reached without getting stuck, there is no keyboard trap.
      for (let press = 0; press < expected.length + 8; press += 1) {
        await page.keyboard.press('Tab');
        // The skip link animates into view on :focus-visible; let focus
        // transitions and scroll-into-view settle before measuring geometry.
        await page.waitForTimeout(200);
        const state = await page.evaluate(() => {
          const active = document.activeElement as HTMLElement | null;
          if (!active || active === document.body) return null;
          const style = getComputedStyle(active);
          const rect = active.getBoundingClientRect();
          const centreX = rect.left + rect.width / 2;
          const centreY = rect.top + rect.height / 2;
          const topElement =
            centreX >= 0 &&
            centreY >= 0 &&
            centreX <= window.innerWidth &&
            centreY <= window.innerHeight
              ? document.elementFromPoint(centreX, centreY)
              : null;
          const label = (active.getAttribute('aria-label') ?? active.textContent ?? '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 60);
          return {
            key: `${active.tagName.toUpperCase()}|${active.getAttribute('href') ?? ''}|${label}`,
            outlineWidth: style.outlineWidth,
            outlineStyle: style.outlineStyle,
            boxShadow: style.boxShadow,
            inViewport:
              rect.top >= -1 &&
              rect.left >= -1 &&
              rect.bottom <= window.innerHeight + 1 &&
              rect.right <= window.innerWidth + 1,
            notObscured:
              topElement !== null &&
              (active === topElement || active.contains(topElement) || topElement.contains(active)),
            isControl:
              active.tagName === 'A' ||
              active.tagName === 'BUTTON' ||
              active.getAttribute('tabindex') === '0',
          };
        });
        if (!state) continue;

        const hasRing =
          (state.outlineStyle !== 'none' && state.outlineWidth !== '0px') ||
          (state.boxShadow !== 'none' && state.boxShadow.trim().length > 0);
        if (state.isControl) {
          visited.push(state.key);
          if (!hasRing) {
            focusProblems.push(`no focus indicator: ${state.key}`);
          }
          if (!state.inViewport) {
            focusProblems.push(`focused element outside the viewport: ${state.key}`);
          }
          if (!state.notObscured) {
            focusProblems.push(`focused element obscured: ${state.key}`);
          }
        }
      }

      const missing = expected.filter((key) => !visited.includes(key));
      expect(missing, `not reachable with Tab: ${missing.join(' | ')}`).toEqual([]);
      expect(focusProblems, `focus problems: ${focusProblems.join(' | ')}`).toEqual([]);

      // No keyboard trap: every visible control was reached within a bounded
      // number of Tab presses and the traversal kept advancing.
      const uniqueVisited = new Set(visited);
      expect(uniqueVisited.size).toBeGreaterThanOrEqual(expected.length);
    });
  }

  test('responsive nav toggle: aria-expanded/aria-controls and Escape close the list below 1024px', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoLanding(page, LOCALES[0]);

    const toggle = page.locator('marea-responsive-nav button');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const controlsId = await toggle.getAttribute('aria-controls');
    expect(controlsId, 'aria-controls must point to the nav list').toBeTruthy();
    const controlsExists = await page.evaluate(
      (id) => !!document.getElementById(id as string),
      controlsId,
    );
    expect(controlsExists, `aria-controls target ${controlsId} does not exist`).toBe(true);

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('marea-responsive-nav .list')).toBeVisible();

    // Documented path: focus inside the list, then Escape.
    await page.locator('marea-responsive-nav .link').first().focus();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('marea-responsive-nav .list')).toBeHidden();
    await expect(toggle, 'Escape returns focus to the toggle').toBeFocused();
  });

  test('at 1024px and above the toggle is hidden and the nav list is always visible', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await gotoLanding(page, LOCALES[0]);
    const toggle = page.locator('marea-responsive-nav button');
    await expect(toggle).toBeHidden();
    await expect(page.locator('marea-responsive-nav .list')).toBeVisible();
    const links = page.locator('marea-responsive-nav .link');
    await expect(links).toHaveCount(10);
    await expect(links.first()).toBeVisible();
  });
});
