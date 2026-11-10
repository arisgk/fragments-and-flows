import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Loader } from 'astro/loaders';

/** A board as `boards.json` lists it, by its Allume ID. */
type IndexedBoard = {
  label: string;
  slug: string;
  parents: string[];
  view: string;
};

type BoardsIndex = {
  root: string;
  boards: Record<string, IndexedBoard>;
  preview?: { light: string; dark: string };
};

/**
 * Loads the boards that `allume-web-export embed` wrote into the folder, each
 * by its slug, with its view as the entry's rendered HTML. The root board's
 * entry has the URLs of the preview images, as the site serves the folder at
 * `servedAt`.
 */
export const allumeBoards = ({
  folder,
  servedAt,
}: {
  folder: string;
  servedAt: string;
}): Loader => ({
  name: 'allume-boards',
  load: async ({ store, parseData }) => {
    const index: BoardsIndex = JSON.parse(
      await readFile(join(folder, 'boards.json'), 'utf8')
    );

    const previewImages = index.preview && {
      light: `${servedAt}/${index.preview.light}`,
      dark: `${servedAt}/${index.preview.dark}`,
    };

    const entries = await Promise.all(
      Object.entries(index.boards).map(async ([id, board]) => {
        const html = await readFile(join(folder, board.view), 'utf8');
        const isRoot = id === index.root;

        return {
          id: board.slug,
          data: await parseData({
            id: board.slug,
            data: {
              label: board.label,
              slug: board.slug,
              isRoot,
              previewImages: isRoot ? previewImages : undefined,
            },
          }),
          rendered: { html },
        };
      })
    );

    store.clear();
    entries.forEach((entry) => store.set(entry));
  },
});
