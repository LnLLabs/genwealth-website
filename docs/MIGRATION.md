# Migration notes

Historical record of the Lovable import. The site no longer uses Supabase. Current setup is in the README.

This draft imports the Inheritance Link / GenWealth site from Lovable snapshot `5f7888b7f22c7dfd25def5c6eb98942ef20b57ac`. It is not production-ready and has not been deployed.

The import commit copies the 137 exported text files unchanged. A later commit adds retrieved image bytes, the two approved founder biographies, `.env` gitignore entries, and these notes.

## Install and run

Commands used in this workspace:

```sh
bun install
bunx tsc --noEmit
bun run lint
bun run build
bun run dev -- --host 127.0.0.1 --port 43123
```

`package.json` scripts are `dev`, `build`, `build:dev`, `preview`, `lint`, and `format`. There is no unit-test script. `tsc --noEmit` is a type check only; `tsconfig.json` already sets `"noEmit": true`.

`bun install` completed with the committed `bun.lock` (Bun 1.4.4). The lockfile still records some tarball URLs on `europe-west1-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache/`. Those URLs responded during this install. `@lovable.dev/vite-tanstack-config@2.26.5` is also published on the public npm registry.

## Environment variable names

Values were not in the export. `.env` is gitignored. `.env.example` lists names only.

| Name | Where it is read |
| --- | --- |
| `SUPABASE_URL` | Server Supabase client, contact and insights server functions, auth middleware |
| `SUPABASE_PUBLISHABLE_KEY` | Same server paths as `SUPABASE_URL` |
| `VITE_SUPABASE_URL` | Browser client in `src/integrations/supabase/client.ts` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser client in `src/integrations/supabase/client.ts` |
| `SUPABASE_SERVICE_ROLE_KEY` | `src/integrations/supabase/client.server.ts` (admin client; not used by the marketing pages) |
| `LOVABLE_DB_MIGRATION_URL` | `drizzle.config.ts` only |
| `LOVABLE_CRON_SECRET` | `src/integrations/supabase/cron-auth.ts` |
| `LOVABLE_CRON_SECRET_PREVIOUS` | `src/integrations/supabase/cron-auth.ts` |

`LOVABLE_PREVIEW_HOST` is not read by application code. `@lovable.dev/vite-tanstack-config` proxies `/__l5e/assets-v1/*` to that host during `vite dev` when the variable is set. This draft does not set it. Local copies under `public/__l5e/` are used instead.

`supabase/config.toml` contains project id `wlybrmocqvzjrhkihshw`. That id was already in the snapshot. It is not a key.

## Hosted dependencies

- **Supabase / Postgres.** Generated types and SQL migrations describe `posts`, `contact_submissions`, and `user_roles`, plus `has_role` and a trigger that assigns the first auth user the `admin` role. No rows were exported. Insights, RSS, sitemap, and `llms.txt` read published posts through server functions. The contact form inserts into `contact_submissions`. Auth, the editor, and the submissions screen need a live project and the env names above. None of that was called during this migration.
- **Drizzle.** `drizzle/schema.ts` is an empty generated stub. `drizzle.config.ts` points migrations at `LOVABLE_DB_MIGRATION_URL`. Migrations were not run.
- **Lovable Vite/Nitro build.** `vite.config.ts` uses `@lovable.dev/vite-tanstack-config`. Outside the Lovable sandbox the package still sets Nitro `defaultPreset` to `cloudflare-module` when Nitro is new enough. The installed Nitro is `3.0.260603-beta`, which meets that check, so `bun run build` targets Cloudflare Workers output. It does not deploy. Removing that preset would mean passing a different `nitro` option in `vite.config.ts`. That was not changed, because the default build is the project's current build path.
- **Public site named in source.** `src/lib/posts.ts` sets `SITE_URL` to `https://connect-wealth-flow.lovable.app`. `public/robots.txt` points its sitemap at the same host. Canonical URLs in insights still use that host.
- **Other outbound links left as authored.** Google Fonts, Calendly (`https://calendly.com/help-genwealth/30min`), LinkedIn profiles, and `https://docs.genwealth.app/`.

## Assets

The ZIP had no binary blobs. Source asset manifests store root-relative URLs such as `/__l5e/assets-v1/<id>/<file>`, not absolute URLs. Those paths are publicly served, without credentials, on the site named in source. The preview host recorded in the export manifest returned identical bytes for all 19 ids.

Retrieved files and SHA-256 hashes are listed in `docs/provenance/retrieved-assets.json`.

- **19 manifest blobs.** Byte size matches each manifest `size`. Placed under `public/__l5e/assets-v1/` so the existing `url` fields resolve. Manifest JSON was not edited.
- **`public/favicon.png`.** Same path on the public site. PNG, 64×64, 4862 bytes. The export could not read the Lovable binary, so there is no snapshot hash to prove it is the same file.
- **`src/assets/inheritance-family.jpg`, `inheritance-planning.jpg`, `family-legacy.jpg`.** These are normal Vite imports, so the files have to exist for a build. They were downloaded from the public site's built asset URLs. Alt text and JPEG dimensions match the `<img>` attributes in `src/routes/index.tsx` (1920×1024, 1536×1024, and 1536×1024). No snapshot hash exists for these three files. They are the published build's bytes, not a reconstruction. A later local `vite build` emitted the same content-hashed names the public site serves: `inheritance-family-CIzkuuBx.jpg`, `inheritance-planning-CHFEnMFv.jpg`, and `family-legacy-DrzKy2ug.jpg`.

Nothing was drawn or substituted for a missing image. `src/assets/genwealth-logo.png` is vendored because its manifest exists. Header and footer import the transparent logo, not this file.

## Founder biographies

`src/components/site/Founders.tsx` is the only profile copy. Order, names, roles, and LinkedIn URLs identify the people:

1. Rafael Cardoso, Co-founder & CEO, `https://www.linkedin.com/in/rafael-cardoso-2b03ba146/`. The previous text was the Web2/Web3, Will Easy, hospitality, Emurgo, and Deep Funding biography.
2. Leandros Holleman, Co-founder & CTO, `https://www.linkedin.com/in/holleman-leandros-90260a74/`. The previous text was the infrastructure, AnetaBTC, KeyPact, and Cardano TSC biography.

The approved paragraphs replace that biography. The old one-line `bio` plus `highlights` bullets were the same biography in the previous wording. The bullets were removed so the page does not keep the old sentences next to the approved paragraph. Names, roles, LinkedIn links, photo assignments, card structure, and the later “Why we are qualified” and “What we have learned” sections were not edited.

The approved sentences are user-supplied copy. They were not independently checked.

### Photo assignment already in the snapshot

The photo fields are crossed relative to the filenames, and that was left as imported:

- Rafael Cardoso's `photo` is `leandros.url` (`/__l5e/assets-v1/397313b1-975c-4e78-b453-5934dad59fac/leandros-holleman.jpg`).
- Leandros Holleman's `photo` is `rafael.url` (`/__l5e/assets-v1/de84f74a-ee82-4f42-8e97-08e1429b9ecd/rafael-cardoso.jpg`).

The filenames and the people do not match. The correct portrait was not guessed, and the assignments were not swapped.

## Checks in this workspace

These are local results, not a production certification.

| Command | Result |
| --- | --- |
| `bun install` | Completed with the committed `bun.lock` (Bun 1.4.4) |
| `bunx tsc --noEmit` | Exit 0 |
| `bun run lint` | Exit 1. ESLint reported 642 problems (635 errors, 7 warnings). Almost all are `prettier/prettier` on source that was imported as-is and is not wrapped to the configured print width. The tree was not reformatted. |
| `bun run build` | Exit 0. Nitro reported preset `cloudflare-module`. Nothing was deployed. |
| Dev server on `http://127.0.0.1:43123` | GET `/`, `/about`, `/how-it-works`, `/professionals`, `/institutions`, `/individuals`, `/technology`, `/contact`, and `/auth` returned 200. Hero JPEGs, favicon, logo, founder portraits, and partner files returned 200. GET `/insights` returned 500 because `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` are unset. The server log shows that missing-env error and no outbound Supabase request. The contact form was not submitted. Migrations were not run. |

## What still does not run locally

- Signing in, editing posts, and reading contact submissions need the Supabase env names and the hosted project. Those routes throw or fail closed when the variables are missing. That behaviour was left in place.
- Submitting the contact form or loading insights will try to call Supabase. This migration did not submit the form and did not set credentials.
- Database contents, auth users, and storage objects were not exported.
- Build output is Cloudflare-oriented. Serving it as a Node process was not reconfigured.
