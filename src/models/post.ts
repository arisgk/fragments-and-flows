import { z } from 'astro:content';

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().url().optional(),
  type: z
    .enum(['idea', 'excerpt', 'note', 'draft', 'revision', 'distillation'])
    .default('draft'),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Post = z.infer<typeof postSchema>;

export type IdeaPost = Post & { type: 'idea' };
export type ExcerptPost = Post & { type: 'excerpt' };
export type NotePost = Post & { type: 'note' };
export type DraftPost = Post & { type: 'draft' };
export type RevisionPost = Post & { type: 'revision' };
export type DistillationPost = Post & { type: 'distillation' };

export const getDisplayDate = (post: Post) => {
  return post.updatedAt;
};

export const isIdeaPost = (post: Post): post is IdeaPost => {
  return post.type === 'idea';
};

export const isExcerptPost = (post: Post): post is ExcerptPost => {
  return post.type === 'excerpt';
};

export const isNotePost = (post: Post): post is NotePost => {
  return post.type === 'note';
};

export const isDraftPost = (post: Post): post is DraftPost => {
  return post.type === 'draft';
};

export const isRevisionPost = (post: Post): post is RevisionPost => {
  return post.type === 'revision';
};

export const isDistillationPost = (post: Post): post is DistillationPost => {
  return post.type === 'distillation';
};
