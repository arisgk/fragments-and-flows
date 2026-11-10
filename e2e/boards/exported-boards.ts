import { readFileSync } from 'node:fs';

export type Board = {
  label: string;
  slug: string;
  parents: string[];
  view: string;
};

// The boards are those of the Allume export in `public/allume/`, so the tests
// pick the ones they need from its index rather than naming them.
const folder = 'public/allume';
const index: {
  root: string;
  boards: Record<string, Board>;
  preview: { light: string; dark: string };
} = JSON.parse(readFileSync(`${folder}/boards.json`, 'utf8'));
const boards = Object.values(index.boards);

/** The first board of the export where the predicate holds. */
const findBoard = ({
  what,
  where,
}: {
  what: string;
  where: (board: Board) => boolean;
}) => {
  const board = boards.find(where);
  if (board === undefined) {
    throw new Error(`The export has no ${what}.`);
  }
  return board;
};

export const root = index.boards[index.root];

export const rootChild = findBoard({
  what: 'board on its root',
  where: (board) => board.parents.includes(index.root),
});

export const boardWithImages = findBoard({
  what: 'board with images',
  where: (board) =>
    readFileSync(`${folder}/${board.view}`, 'utf8').includes('<img'),
});

export const previewImages = {
  light: `/allume/${index.preview.light}`,
  dark: `/allume/${index.preview.dark}`,
};
