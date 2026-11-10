import { test } from '@playwright/test';

import { storeTheme } from '../shared/helpers';
import { previewImages, root } from './exported-boards';
import { expectBoardPreview } from './helpers';

test.describe("the index's board preview", () => {
  test('links to the root board, in the light theme', async ({ page }) => {
    await storeTheme({ page, theme: 'light' });

    await page.goto('/');

    await expectBoardPreview({ page, board: root, image: previewImages.light });
  });

  test('shows the dark preview in the dark theme', async ({ page }) => {
    await storeTheme({ page, theme: 'dark' });

    await page.goto('/');

    await expectBoardPreview({ page, board: root, image: previewImages.dark });
  });
});
