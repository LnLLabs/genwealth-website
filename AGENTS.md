<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared editorial layouts and optional photographic page headers in the site primitives so audience pages retain a consistent visual language.
- Import generated website photographs as bundled assets; keep photo contrast treatments in global semantic design tokens.

- Keep reference-inspired homepage presentation in semantic global styles and shared site primitives; the interactive transfer view uses the existing asset selection state, not simulated product data.
- Keep technology capabilities in an accessible topic explorer with conceptual connection diagrams, not simulated accounts or live verification states.
- Link out to sites outside the app with the ExternalCtaLink primitive (new tab, rel noopener noreferrer) so external buttons match internal CTAs.

- Insights posts are Markdown files in `content/posts`. The public pages, RSS, sitemap, and `llms.txt` are generated from those files at build time. Keystatic (`/keystatic` during `bun run dev`, local storage) is the editor. There is no database and no signed-in admin.
- The contact form posts from the browser to Web3Forms when `VITE_WEB3FORMS_ACCESS_KEY` is set. It includes a honeypot. It does not call a server function. Never accept a template name or arbitrary email recipient from the browser.
