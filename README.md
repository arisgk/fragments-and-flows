# Fragments & Flows Website

This is the codebase for the [Fragments & Flows website](https://fragmentsandflows.com/).

Built using [Astro](https://astro.build/).

## How to add Posts to the Digital Garden

Digital garden posts are written in Markdown and are located in `content/garden`. Just add a new markdown file there and it will get a URL corresponding to the file name and appear in the garden posts list. Make sure to set the metadata properly, defined at the top of the Markdown file (before the actual Markdown).

When updating posts, it's good to set the updated-at date manually in the metadata (this hasn't yet been automated).

## Development

[Git LFS](https://git-lfs.com/) is needed for Allume's exported boards, in `public/allume/`. Once it's installed, pull them:

```sh
git lfs pull
```

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

#### Garden Posts

Astro [Content Collections](https://docs.astro.build/en/guides/content-collections/) are used for defining and loading the digital garden posts.

#### Ark of Reflections (Allume Boards)

The boards in `public/allume/` are exported from Allume with the `embed` command of [allume-web-export](https://github.com/oktana-coop/allume-web-export), which writes each board's view, its files and the viewer that makes it interactive, for the website to show in its own pages. To export them again, follow its [instructions for embedding](https://github.com/oktana-coop/allume-web-export#embed), writing into `public/allume/`, with the website's URLs: boards at `/garden/boards/{slug}/` and files at `/allume/files`. The root board is labeled Home.

The `boards` content collection loads them from `public/allume/boards.json`, and each board gets a page at `/garden/boards/<slug>/`.

### Testing

End-to-end tests use [Playwright](https://playwright.dev/), running against the production build. Download Playwright's Chromium once:

```sh
npx playwright install chromium
```

Run the tests:

```sh
npm run test:e2e
```

Open the Playwright UI (test timeline, action logs, screenshots):

```sh
npm run test:e2e:ui
```

Test files live in `e2e/`. Results (HTML report, failure screenshots, traces) are written to `e2e-results/`.

Server-rendered routes (the subscribe API and the unsubscribe page) are not part of the static build the tests run against, so the tests mock the subscribe API and don't cover unsubscribing.

## Deployment

The website is currently deployed to [Netlify](https://www.netlify.com/) using the relevant [Netlify Adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/). Every time you push to the `main` branch, a fresh Netlify deployment is triggered (there is an integration between GitHub and Netlify).

The Netlify site is already configured for Allume's boards, which are in Git LFS. To deploy the website to another Netlify site, set both of these in its settings on Netlify:

- the environment variable `GIT_LFS_ENABLED`, to `true`, so that builds fetch Git LFS files. It has to be set in the settings rather than in `netlify.toml`, which Netlify reads only after cloning.
- the build command `git lfs pull --include="public/allume/**" --exclude="" && npm run build`. Netlify fetches only some file types from Git LFS, which would leave the boards' `boards.json` and views as pointers, so the build fetches everything under `public/allume/` first.
