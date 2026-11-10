import { z } from 'astro/zod';

export const boardSchema = z.object({
  label: z.string(),
  slug: z.string(),
  isRoot: z.boolean(),
  previewImages: z.object({ light: z.string(), dark: z.string() }).optional(),
});

export type Board = z.infer<typeof boardSchema>;

export const getBoardUrl = (slug: string) => `/garden/boards/${slug}/`;
