# Fragments & Flows Website

This is the codebase for the [Fragments & Flows website](https://fragmentsandflows.com/).

Built using [Astro](https://astro.build/).

## How to add Posts to the Digital Garden

Digital garden posts are written in Markdown and are located in `content/garden`. Just add a new markdown file there and it will get a URL corresponding to the file name and appear in the garden posts list. Make sure to set the metadata properly, defined at the top of the Markdown file (before the actual Markdown).

When updating posts, it's good to set the updated-at date manually in the metadata (this hasn't yet been automated).

## Development

These are the basic commands used for development:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

### Pages and Routing

Astro is opinionated in how you add routes, so it's good to familiarize with [file-based routing](https://docs.astro.build/en/guides/routing/) if you want to add a new page.

### Content & Digital Garden

Astro [Content Collections](https://docs.astro.build/en/guides/content-collections/) are used for defining and loading the digital garden posts.

## Deployment

The website is currently deployed to [Netlify](https://www.netlify.com/) using the relevant [Netlify Adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/). Every time you push to the `main` branch, a fresh Netlify deployment is triggered (there is an integration between GitHub and Netlify).
