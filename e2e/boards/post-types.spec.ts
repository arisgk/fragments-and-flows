import { test } from '@playwright/test';

import { root } from './exported-boards';
import { expectBoardPage } from './helpers';

test.describe('the post types page', () => {
  test('leads to the Ark of Reflections', async ({ page }) => {
    await page.goto('/garden/post-types');

    await page
      .getByRole('link', { name: 'Explore the Ark of Reflections' })
      .click();

    await expectBoardPage({ page, board: root });
  });
});
