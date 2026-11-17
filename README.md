# Portfolio site

Static site built with [Astro](https://astro.build). Needs Node 22.23.4 or newer (see `.nvmrc`).

```sh
npm install
npm run dev       # local preview, drafts visible
npm run build     # production build in dist/, drafts excluded
npm run preview   # serve the production build
npm run check     # type-check
```

Always use the `npm run` scripts. They first run `scripts/ensure-compiler.mjs`, which swaps Astro's native compiler for its WebAssembly build on CPUs where the native one crashes with "Illegal instruction".

Project status and next steps are in `plan.md`, a local file that is git-ignored and not part of this repository.

## Where things live

| What | Where |
|---|---|
| Name, headline, links, email, headshot, certifications | `src/data/profile.ts` |
| Career timeline | `src/data/experience.ts` |
| Case studies | `src/content/case-studies/*.md` |
| Talks and panels | `src/content/speaking/*.md` |
| Articles | `src/content/writing/*.md` |
| Colours and type | `src/styles/global.css` |

## Drafts

Any content file with `draft: true` shows in `npm run dev` with a Draft badge and is left out of the production build. The Work and Writing links appear in the navigation only when that section has at least one published entry; until then their list pages are marked `noindex` and left out of the sitemap.

To publish a first article, add `src/content/writing/my-title.md`:

```md
---
title: My title
description: One sentence for search results and the article list.
pubDate: 2027-01-15
---

Article text in Markdown.
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. Set the repository variables `SITE_URL` (and `BASE_PATH` for a project page) first; the workflow file explains both. The build fails in CI if `SITE_URL` is missing.

`Profile.pdf` and any other PDF are git-ignored because they contain private contact details.
