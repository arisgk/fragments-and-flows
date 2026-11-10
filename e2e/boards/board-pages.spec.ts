import { expect, test } from '@playwright/test';

import { storeTheme, themeToggle, toggleTheme } from '../shared/helpers';
import { boardWithImages, root, rootChild } from './exported-boards';
import {
  expectBoardFillingWindow,
  expectBoardInTheme,
  expectBoardPage,
  expectExportedImagesServed,
  openBoard,
  openBoardFromItsCard,
} from './helpers';

test.describe('Allume board pages', () => {
  test('show a board at its URL', async ({ page }) => {
    await openBoard({ page, board: root });

    await expectBoardPage({ page, board: root });
  });

  test('fill the window below the bar, without the footer', async ({
    page,
  }) => {
    await openBoard({ page, board: root });

    await expectBoardFillingWindow({ page, board: root });
    await expect(themeToggle({ page })).toBeVisible();
  });

  test("open a board from its card on another board's page", async ({
    page,
  }) => {
    await openBoard({ page, board: root });

    await openBoardFromItsCard({ page, board: rootChild });

    await expectBoardPage({ page, board: rootChild });
  });

  test("serve a board's images", async ({ page, request }) => {
    await openBoard({ page, board: boardWithImages });

    await expectExportedImagesServed({ page, request });
  });

  test("follow the garden's theme", async ({ page }) => {
    await storeTheme({ page, theme: 'dark' });
    await openBoard({ page, board: root });
    await expectBoardInTheme({ page, theme: 'dark' });

    await toggleTheme({ page });

    await expectBoardInTheme({ page, theme: 'light' });
  });
});
