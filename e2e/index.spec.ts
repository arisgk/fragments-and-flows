import { expect, test } from '@playwright/test';

test.describe("the index's sections", () => {
  for (const [id, name] of [
    ['writing', 'Writing'],
    ['notes-and-excerpts', 'Notes & Excerpts'],
    ['ark-of-reflections', 'The Ark of Reflections'],
  ]) {
    test(`a link to #${id} goes to ${name}`, async ({ page }) => {
      await page.goto(`/#${id}`);

      await expect(
        page.getByRole('heading', { name, level: 2 })
      ).toBeInViewport();
      expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
    });
  }
});
