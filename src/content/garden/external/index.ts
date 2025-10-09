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
  'Towards a Communist Theory of Value': {
    url: 'https://ikee.lib.auth.gr/record/355439/?ln=en',
    title: 'Towards a Communist Theory of Value',
    description:
      'My master thesis for the Political Theory program of the School of Political Sciences, Aristotle University of Thessaloniki. Its domain is social action, both its constitution and orientation, mainly explored through the concept of value. Within it, I argue for abolishing the dominant conception of value and then engage with the task of  redefining it in ways that are fitting to emancipatory social projects, most prominently a communist one, in the broad sense of the term. Originally published in AUTH’s repository.',
    type: 'distillation',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
};
