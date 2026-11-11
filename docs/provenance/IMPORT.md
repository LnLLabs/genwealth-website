# Source import

This repository started as a private draft import of the Inheritance Link / GenWealth website. It is a migration of an existing Lovable project, not a redesign.

## Snapshot

| Item | Value |
| --- | --- |
| Project | Inheritance Link / GenWealth |
| Lovable project id | `b0b2767d-b2e2-4238-ab0a-24626153ab74` |
| Pinned snapshot SHA | `5f7888b7f22c7dfd25def5c6eb98942ef20b57ac` |
| Export time | 2026-11-08T10:26:05.341841+00:00 |
| Editor | https://lovable.dev/projects/b0b2767d-b2e2-4238-ab0a-24626153ab74 |
| Preview recorded in project metadata | https://id-preview--b0b2767d-b2e2-4238-ab0a-24626153ab74.lovable.app |
| Public site URL already in source (`SITE_URL`, `public/robots.txt`) | https://connect-wealth-flow.lovable.app |
| Linked git repository in Lovable metadata | none recorded |
| Attachment ZIP sha256 | `eb873dd6a498a8d51d355a846f30b163d3d43630c8fef4ae7450c18f5673aa2b` |

The ZIP is a partial text snapshot. It was not treated as a verified runnable build.

## What was imported

All 137 non-environment text files listed in `export-manifest.json` were copied into the repository root unchanged. After the copy, every file's byte length and SHA-256 matched the manifest. No file contents were edited in the import commit.

Included with this note:

- `docs/provenance/export-manifest.json` — inventory, hashes, and the exporter's limitations
- `docs/provenance/EXPORT-README.md` — exporter README

The original Lovable `README.md`, `AGENTS.md`, and the rest of the tree are the snapshot files.

## What was not in the snapshot

- `.env` was excluded and was not read. No environment values were imported. No secret file was added.
- Four listed binaries were absent from the ZIP: `public/favicon.png`, `src/assets/family-legacy.jpg`, `src/assets/inheritance-family.jpg`, `src/assets/inheritance-planning.jpg`.
- Nineteen `*.asset.json` manifests were imported. Their underlying image and SVG blobs were not in the ZIP. Each manifest stores a root-relative URL of the form `/__l5e/assets-v1/<asset-id>/<filename>`, plus `size` and `content_type`. Those URLs are not absolute public URLs inside the source.
- No database rows, storage objects, accounts, or credentials were exported.
- Supabase project id in `supabase/config.toml` is configuration already present in the snapshot (`wlybrmocqvzjrhkihshw`). It is not a key.

## Secret scan

The exporter reported a conservative embedded-secret scan with no flagged strings. A second pass over the imported text looked for assignment-style secrets, live Stripe keys, and JWT-shaped tokens and did not find any. This is not a full secret audit. Dependency lockfile entries point at `https://europe-west1-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache/` for some packages; those are package archive URLs, not credentials.

## Biography updates

Not part of the unchanged import. The snapshot's founder copy is in `src/components/site/Founders.tsx`. Approved biography text, retrieved image bytes, and local run notes are described in `docs/MIGRATION.md`.
