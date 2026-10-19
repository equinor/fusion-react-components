// Playwright helper for capturing Fusion Help screenshots of one component at a time.
// Copy into your help stories folder and adjust `imagesRoot` to your articles' images folder.
// Images are written as PNG, which `fhelp` requires.
import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { expect, type Locator } from '@playwright/test';

/** Where captured images are written; articles reference them as `images/<name>.png`. */
const imagesRoot = resolve(import.meta.dirname, '..', 'articles', 'images');

/** Space kept around a captured component, so its border and shadow are not cut off. */
const margin = 12;

/**
 * Outlines a control until the returned function removes it. The outline is an overlay rather than a
 * style on the control, so a container that clips its content, such as a grid cell, cannot cut it off.
 */
const outline = async (control: Locator) => {
  const box = await control.boundingBox();
  if (!box) {
    throw new Error('The control to outline is not on screen.');
  }
  const host = await control.evaluateHandle(
    // A modal dialog renders in the top layer, above anything appended to the body.
    (element) => element.closest('dialog[open]') ?? document.body,
  );
  const overlay = await host.evaluateHandle((parent, rect) => {
    const element = document.createElement('div');
    Object.assign(element.style, {
      position: 'fixed',
      left: `${rect.x - 5}px`,
      top: `${rect.y - 5}px`,
      width: `${rect.width + 10}px`,
      height: `${rect.height + 10}px`,
      border: '3px solid #ff1243',
      borderRadius: '6px',
      boxSizing: 'border-box',
      pointerEvents: 'none',
      zIndex: '2147483647',
    });
    parent.append(element);
    return element;
  }, box);
  await host.dispose();
  return async () => {
    await overlay.evaluate((element) => element.remove());
    await overlay.dispose();
  };
};

/**
 * Saves one component as `<imagesRoot>/<name>.png`.
 *
 * @param target - The component to capture. Several locators capture the area that spans them.
 * @param name - Image name. Keep it a string literal so a validator can find it in the source.
 * @param options.highlight - A control inside the component to outline, such as the button a step names.
 * @param options.width - A narrower viewport to lay the page out in first, so a page-filling component
 * reflows to a size that stays readable in the help side sheet.
 * @param options.height - A taller viewport for a component that would otherwise be cut off.
 */
export const capture = async (
  target: Locator | Locator[],
  name: string,
  { highlight, width, height }: { highlight?: Locator; width?: number; height?: number } = {},
) => {
  const components = Array.isArray(target) ? target : [target];
  const page = components[0].page();
  const layoutViewport = page.viewportSize();
  if ((width || height) && layoutViewport) {
    await page.setViewportSize({
      width: width ?? layoutViewport.width,
      height: height ?? layoutViewport.height,
    });
  }
  for (const component of components) {
    await expect(component).toBeVisible();
  }
  await components[0].scrollIntoViewIfNeeded();
  // Avoid hover states and tooltips in the image, and let transitions such as side sheets settle.
  await page.mouse.move(0, 0);
  await page.waitForTimeout(400);

  const boxes = await Promise.all(components.map((component) => component.boundingBox()));
  const viewport = page.viewportSize();
  if (boxes.some((box) => !box) || !viewport) {
    throw new Error(`Cannot capture "${name}": a component is not on screen.`);
  }
  const visible = boxes.filter((box) => box !== null);
  const left = Math.min(...visible.map((box) => box.x));
  const top = Math.min(...visible.map((box) => box.y));
  const right = Math.max(...visible.map((box) => box.x + box.width));
  const bottom = Math.max(...visible.map((box) => box.y + box.height));
  const x = Math.max(0, Math.floor(left - margin));
  const y = Math.max(0, Math.floor(top - margin));
  const clip = {
    x,
    y,
    width: Math.min(viewport.width, Math.ceil(right + margin)) - x,
    height: Math.min(viewport.height, Math.ceil(bottom + margin)) - y,
  };

  const restore = highlight ? await outline(highlight) : undefined;
  await mkdir(imagesRoot, { recursive: true });
  await page.screenshot({
    path: join(imagesRoot, `${name}.png`),
    clip,
    animations: 'disabled',
    caret: 'hide',
  });
  await restore?.();
  if ((width || height) && layoutViewport) {
    await page.setViewportSize(layoutViewport);
  }
};
