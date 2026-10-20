import { z } from 'astro/zod';
import { postTypeDetails, postTypes } from './post-type';

const basePostSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.url().optional(),
  type: z.enum(postTypes).default('draft'),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const internalPostSchema = basePostSchema.extend({
  slug: z.string(),
});

export type InternalPost = z.infer<typeof internalPostSchema>;

const externalPostSchema = basePostSchema.extend({
  url: z.url(),
});

export type ExternalPost = z.infer<typeof externalPostSchema>;

export const postSchema = z.union([internalPostSchema, externalPostSchema]);

export type Post = z.infer<typeof postSchema>;

export type ExcerptPost = Post & { type: 'excerpt' };
export type NotePost = Post & { type: 'note' };
export type DraftPost = Post & { type: 'draft' };
export type RevisionPost = Post & { type: 'revision' };
export type DistillationPost = Post & { type: 'distillation' };

export const isInternalPost = (post: Post): post is InternalPost => {
  return 'slug' in post;
};

export const isExternalPost = (post: Post): post is ExternalPost => {
  return 'url' in post;
};

export const getDisplayDate = (post: Post) => {
  return post.updatedAt;
};

export const getFormattedDisplayDate = (post: Post) =>
  getDisplayDate(post).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

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

export const getIconName = (post: Post) => postTypeDetails[post.type].icon;

export const getTypeLabel = (post: Post) => postTypeDetails[post.type].label;
