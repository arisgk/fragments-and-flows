import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postSchema } from './models/post';
import { boardSchema } from './models/board';
import { allumeBoards } from './lib/allume/boards-loader';

const garden = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/garden/' }),
  schema: postSchema,
});

const boards = defineCollection({
  loader: allumeBoards({ folder: './public/allume', servedAt: '/allume' }),
  schema: boardSchema,
});

export const collections = { garden, boards };
