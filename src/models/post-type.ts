export const postTypes = [
  'excerpt',
  'note',
  'draft',
  'revision',
  'distillation',
] as const;

export type PostType = (typeof postTypes)[number];

export type PostTypeGroup = 'notes-and-excerpts' | 'writing';

export const postTypeGroups: {
  [group in PostTypeGroup]: { label: string; listPath: string };
} = {
  'notes-and-excerpts': {
    label: 'Notes & Excerpts',
    listPath: '/garden/notes-and-excerpts/1',
  },
  writing: {
    label: 'Writing',
    listPath: '/garden/writing/1',
  },
};

export const postTypeDetails: {
  [type in PostType]: {
    label: string;
    description: string;
    icon: string;
    group: PostTypeGroup;
  };
} = {
  excerpt: {
    label: 'Excerpt',
    description:
      'A fragment from a work that sparked a thought or inspired me.',
    icon: 'excerpt',
    group: 'notes-and-excerpts',
  },
  note: {
    label: 'Note',
    description:
      'A rough thought or comment I wanted to capture before it slipped away.',
    icon: 'note',
    group: 'notes-and-excerpts',
  },
  draft: {
    label: 'Draft',
    description:
      'A first take on an idea, meant to be tended and reworked over time.',
    icon: 'draft',
    group: 'writing',
  },
  revision: {
    label: 'Revision',
    description:
      'A piece I keep coming back to and reworking, more mature than a draft but still growing.',
    icon: 'document',
    group: 'writing',
  },
  distillation: {
    label: 'Distillation',
    description:
      'The essence of a long exploration, distilled into a mature piece that may still evolve.',
    icon: 'graduation-cap',
    group: 'writing',
  },
};

export const postTypesPagePath = '/garden/post-types';

export const getPostTypeUrl = (type: PostType) =>
  `${postTypesPagePath}#${type}`;
