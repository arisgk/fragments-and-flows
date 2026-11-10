import { expect, type APIRequestContext, type Page } from '@playwright/test';

import { type Board } from './exported-boards';

const boardUrl = (board: Board) => `/garden/boards/${board.slug}/`;

const boardHeading = ({ page, board }: { page: Page; board: Board }) =>
  page.getByRole('heading', { level: 1, name: board.label });

export const openBoard = async ({
  page,
  board,
}: {
  page: Page;
  board: Board;
}) => {
  await page.goto(boardUrl(board));
};

/** Opens the board from its card on the current board's page. */
export const openBoardFromItsCard = async ({
  page,
  board,
}: {
  page: Page;
  board: Board;
}) => {
  await page.getByRole('link', { name: board.label, exact: true }).click();
};

/**
 * Expects the board's page at its URL, titled and headed with the board's
 * label, and described as a board in the Ark of Reflections.
 */
export const expectBoardPage = async ({
  page,
  board,
}: {
  page: Page;
  board: Board;
}) => {
  await expect(page).toHaveURL(boardUrl(board));
  await expect(page).toHaveTitle(board.label);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    `${board.label} board in the Fragments & Flows Ark of Reflections`
  );
  await expect(boardHeading({ page, board })).toBeVisible();
};

/**
 * Expects the board to span the window's width down to its bottom, with no
 * footer below it.
 */
export const expectBoardFillingWindow = async ({
  page,
  board,
}: {
  page: Page;
  board: Board;
}) => {
  const box = await boardHeading({ page, board })
    .locator('xpath=ancestor::*[@data-allume-board]')
    .boundingBox();
  const window = page.viewportSize();

  expect(box).not.toBeNull();
  expect(window).not.toBeNull();
  expect(box!.x).toBe(0);
  expect(box!.width).toBe(window!.width);
  expect(box!.y + box!.height).toBeCloseTo(window!.height, 0);
  await expect(page.getByRole('contentinfo')).toHaveCount(0);
};

/** Expects every image of the export on the page to be served as an image. */
export const expectExportedImagesServed = async ({
  page,
  request,
}: {
  page: Page;
  request: APIRequestContext;
}) => {
  const sources = await page
    .locator('img[src^="/allume/"]')
    .evaluateAll((images) =>
      images.map((image) => image.getAttribute('src') ?? '')
    );
  const responses = await Promise.all(
    sources.map((source) => request.get(source))
  );

  expect(sources.length).toBeGreaterThan(0);
  responses.forEach((response) => {
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toMatch(/^image\//);
  });
};

/**
 * Expects the board in the theme: a dark canvas with light text in the dark
 * theme, and the reverse in the light one.
 */
export const expectBoardInTheme = async ({
  page,
  theme,
}: {
  page: Page;
  theme: 'light' | 'dark';
}) => {
  const { canvas, text } = await brightnesses({ page });

  if (theme === 'dark') {
    expect(canvas).toBeLessThan(0.2);
    expect(text).toBeGreaterThan(0.7);
  } else {
    expect(canvas).toBeGreaterThan(0.8);
    expect(text).toBeLessThan(0.3);
  }
};

/**
 * Expects the index to link to the board's page, showing the preview image,
 * loaded.
 */
export const expectBoardPreview = async ({
  page,
  board,
  image,
}: {
  page: Page;
  board: Board;
  image: string;
}) => {
  const link = page.getByRole('link', { name: `The ${board.label} board` });
  await link.scrollIntoViewIfNeeded();

  await expect(link).toHaveAttribute('href', boardUrl(board));
  await expect(link.getByRole('img')).toHaveAttribute('src', image);
  await expect
    .poll(() =>
      link
        .getByRole('img')
        .evaluate((element: HTMLImageElement) => element.naturalWidth)
    )
    .toBeGreaterThan(0);
};

/** How bright the board's canvas and its title are, from 0 to 1. */
const brightnesses = async ({ page }: { page: Page }) => ({
  canvas: brightness(
    await page
      .locator('.allume-viewport')
      .evaluate((element) => getComputedStyle(element).backgroundColor)
  ),
  text: brightness(
    await page
      .getByRole('heading', { level: 1 })
      .evaluate((element) => getComputedStyle(element).color)
  ),
});

/** The average of a computed `rgb(…)` color's channels, from 0 to 1. */
const brightness = (color: string) => {
  const channels = (color.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
  return channels.reduce((sum, channel) => sum + channel, 0) / 3 / 255;
};
