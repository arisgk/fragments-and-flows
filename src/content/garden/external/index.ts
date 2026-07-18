import type { ExternalPost } from '../../../models/post';

export const externalPosts: { [key: string]: ExternalPost } = {
  'Introducing v2 Editor': {
    url: 'https://oktana.dev/blog/introducing-v2-editor',
    title: 'Introducing v2 Editor',
    description:
      'The manifesto for the rich text editor with version control capabilities we are building at Oktana, v2. In this post, we describe the basic principles, design decisions and our vision for v2, alongside reflecting on the current state and potential future of knowledge production in society. Originally published in the Oktana blog.',
    type: 'revision',
    createdAt: new Date('2025-09-04'),
    updatedAt: new Date('2025-09-12'),
  },
  'Introducing Oktana': {
    url: 'https://oktana.dev/blog/introducing-oktana',
    title: 'Introducing Oktana',
    description:
      'The introductory text for our newly formed collective, Oktana. Read about why we came together, our critique and vision for work and technology and our desires for the present and future of our initiative. Originally published in the Oktana blog.',
    type: 'draft',
    createdAt: new Date('2025-09-07'),
    updatedAt: new Date('2025-09-07'),
  },
  'v2 Technical Dive': {
    url: 'https://oktana.dev/blog/v2-technical-dive',
    title: 'v2 Technical Dive',
    description:
      'A deep dive into the technical stack, architecture, and challenges behind our new rich text editor, v2. We share our experience building a local-first cross-platform app, blending TypeScript (Electron) and Haskell (via WASM), and how our integration of Automerge, ProseMirror, and Pandoc enables seamless versioning and format conversion. Originally published in the Oktana blog.',
    type: 'revision',
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-01-20'),
  },
  'Updating an Electron App hosted on GitHub with electron-updater': {
    url: 'https://oktana.dev/blog/updating-electron-app',
    title: 'Updating an Electron App hosted on GitHub with electron-updater',
    description:
      'A guide on how to implement updates in an Electron application, focusing on the GitHub publishing provider. Based on how cross-platform updates are implemented in our v2 editor. Originally published in the Oktana blog.',
    type: 'revision',
    createdAt: new Date('2025-11-10'),
    updatedAt: new Date('2025-11-10'),
  },
};
