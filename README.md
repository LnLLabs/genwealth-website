# GenWealth website

Static marketing site for GenWealth. Pages, Insights, RSS, the sitemap, and `llms.txt` are files produced by the build. There is no database and no server at runtime.

The design, founder biographies, founder photos, the How it works YouTube demo, and the custodian video on `/institutions` are unchanged.

## Setup

Node 22 and Bun 1.4.4.

```sh
bun install --frozen-lockfile
cp .env.example .env
bun run dev
```

The dev server listens on port 8080 unless you pass another port:

```sh
bun run dev -- --host 127.0.0.1 --port 43123
```

## Build and preview the static files

```sh
bun run build
python3 -m http.server 43124 --bind 127.0.0.1 --directory dist/client
```

`bun run build` prerenders every public route to `dist/client`. That directory is the site: HTML, CSS, images, videos, `rss.xml`, `sitemap.xml`, `llms.txt`, `robots.txt`, and `404.html`. GitHub Pages serves `404.html` for unknown paths. A plain Python server does not, so its own “File not found” page is expected locally.

`bun run preview` still looks for a server bundle and is not the static preview. Use the Python command above, or any other static file server pointed at `dist/client`.

## Environment variables

Both are public build-time values (`import.meta.env`). Set them in `.env` locally and as GitHub Actions repository variables before a build. Do not invent a Web3Forms key.

| Name | What it does |
| --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | Public access key for the contact form. The browser posts to `https://api.web3forms.com/submit`. If it is missing, the form stays on the page and asks people to email hello@genwealth.app. |
| `VITE_SITE_URL` | Canonical origin, no trailing slash. RSS, sitemap, `llms.txt`, `robots.txt`, and page metadata use it. Empty means `https://genwealth.example`. |

The contact form also has a honeypot field. A filled honeypot is treated as success and is not sent.

## Write an insight

Each post is one file in `content/posts`. The file name is the URL slug. Use `.mdoc` (what Keystatic writes), `.md`, or `.mdx`.

```md
---
title: A title
date: 2026-11-11
summary: One or two sentences for the list and the RSS description.
cover: /images/posts/cover.jpg
videoUrl: https://youtu.be/VuM91vV0d2s
tags: inheritance, lawyers
author: GenWealth
draft: false
---

The body is Markdown.
```

`cover` and `videoUrl` are optional. `videoUrl` can be a YouTube or Vimeo link, or a file already in `public/videos`, for example `/videos/genwealth-custodians.mp4`. `draft: true` keeps the post out of the site, RSS, and sitemap. Put cover images in `public/images/posts`.

`content/posts/example-how-an-insight-is-written.mdoc` is sample content. Delete it when a real post exists.

After the file is committed to `main`, GitHub Pages rebuilds and the post is on the site. A local check is `bun run build` and then opening `/insights` from `dist/client`.

### Keystatic, on this computer

With `bun run dev` running, open `/keystatic`. Choose Insights, create or edit a post, and save. Keystatic writes the file under `content/posts` (local storage). Commit that file. The public site does not include the admin. `/keystatic` is not prerendered, the editor bundle is left out of the production build, and GitHub Pages has no admin API.

### Keystatic for someone who does not use the terminal

That needs a GitHub repository. This repo is on Cursor Origin, and Keystatic does not speak to Origin.

Keystatic 0.6 supports three storage modes:

- `local` — files on disk. This is what `keystatic.config.ts` uses now.
- `github` — a GitHub repo, a GitHub App with write access to that repo, and these environment variables on a Node server that runs the admin: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` (Next.js) or `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` (other hosts). Docs: https://keystatic.com/docs/github-mode
- `cloud` — a Keystatic Cloud project, which is also stored in GitHub. The free plan covers one team of up to three users. Docs: https://keystatic.com/docs/cloud

Either hosted mode also needs the admin UI and `/api/keystatic` running on Node. Static GitHub Pages cannot do that. The switch is `storage.kind` in `keystatic.config.ts`. Do not change it until the content repo is on GitHub and the admin has a Node host. This project does not create that GitHub repo or those accounts. The Pages workflow does not host `/keystatic`.

Until then, a non-developer can use Keystatic only while someone runs `bun run dev` and opens `/keystatic` on that machine. Saving still produces a file that must be committed. The commit is what rebuilds the public site.

## GitHub Pages

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) publishes `dist/client` on every push to `main`. The site is built for the domain root. Use a user or organization site (`<user>.github.io`), or a project site with a custom domain. A project URL such as `https://<user>.github.io/<repo>/` needs a different Vite `base`.

Before the first run:

1. Push this branch to GitHub.
2. In the repository, open Settings, Pages, and set Source to GitHub Actions.
3. Optionally add repository variables `VITE_SITE_URL` and `VITE_WEB3FORMS_ACCESS_KEY`. Leave `VITE_SITE_URL` empty until the real origin is known. Leave the Web3Forms key empty until you have one.

A commit on `main` that changes `content/posts` triggers a rebuild. The build reads the Markdown and writes the new HTML. There is nothing to migrate and no server to start.

## Known limits

- `bun run preview` does not serve `dist/client`.
- `bun run lint` still fails on formatting that came in with the imported pages. New files are formatted. Do not reformat the whole tree just to clear that.
- Founder photos stay crossed: Rafael’s card uses `leandros-holleman.jpg`, and Leandros’s card uses `rafael-cardoso.jpg`.
- The How it works demo loads `https://www.youtube-nocookie.com/embed/VuM91vV0d2s` only after a click. Some networks show YouTube’s “confirm you’re not a bot” wall.
- The example insight is sample text. Delete it when real posts exist.
