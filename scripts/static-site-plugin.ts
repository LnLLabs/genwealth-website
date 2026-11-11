import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { parsePost, postKind } from "../src/lib/post-file";

const STATIC_PATHS = [
  "/",
  "/how-it-works",
  "/professionals",
  "/institutions",
  "/individuals",
  "/technology",
  "/about",
  "/contact",
  "/insights",
];

function siteUrl() {
  const configured = process.env["VITE_SITE_URL"];
  const value = configured && configured.trim() ? configured.trim() : "https://genwealth.example";
  return value.replace(/\/+$/, "");
}

function loadPosts() {
  const dir = path.resolve("content/posts");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => /\.(md|mdoc|mdx)$/.test(name))
    .map((name) =>
      parsePost(name.replace(/\.(md|mdoc|mdx)$/, ""), readFileSync(path.join(dir, name), "utf8")),
    )
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function renderFeeds() {
  const origin = siteUrl();
  const posts = loadPosts();
  const rssItems = posts
    .map((post) => {
      const link = `${origin}/insights/${post.slug}`;
      const date = post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : "";
      return `<item><title>${escapeXml(post.title)}</title><link>${link}</link><guid>${link}</guid>${date}<description>${escapeXml(post.summary)}</description></item>`;
    })
    .join("");
  const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>GenWealth Insights</title><link>${origin}/insights</link><description>Articles and video updates on digital inheritance.</description>${rssItems}</channel></rss>`;
  const urls = [
    ...STATIC_PATHS.map((page) => `<url><loc>${origin}${page}</loc></url>`),
    ...posts.map(
      (post) =>
        `<url><loc>${origin}/insights/${post.slug}</loc>${post.date ? `<lastmod>${post.date}</lastmod>` : ""}</url>`,
    ),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
  const postLines = posts
    .map(
      (post) =>
        `- [${post.title.replace(/\s+/g, " ").trim()}](${origin}/insights/${post.slug}): ${postKind(post) === "video" ? "Video. " : ""}${post.summary.replace(/\s+/g, " ").trim()}`,
    )
    .join("\n");
  const llms = `# GenWealth

> GenWealth is inheritance infrastructure. It connects asset owners, inheritance professionals (lawyers and notaries), custodians, beneficiaries and technology to semi-automate inheritance transfers, starting with digital assets.

GenWealth does not replace lawyers, notaries, banks or custodians. The law defines who inherits; GenWealth connects the people and systems that carry out the transfer.

## Pages

- [Home](${origin}/): Overview of connected inheritance.
- [How it works](${origin}/how-it-works): Prepare, validate, transfer.
- [For legal professionals](${origin}/professionals): How lawyers and notaries work with GenWealth.
- [For institutions](${origin}/institutions): Inheritance workflows for banks and custodians.
- [For individuals](${origin}/individuals): Preparing digital assets for inheritance.
- [Technology](${origin}/technology): Ownership, control and inheritance rules.
- [About](${origin}/about): Company, traction and partners.
- [Contact](${origin}/contact): Book a call.

## Insights

- [All insights](${origin}/insights): Articles and video updates.
${postLines}
`;
  const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
  return { rss, sitemap, llms, robots };
}

function writeNotFound(dir: string) {
  const assets = path.join(dir, "assets");
  const css = existsSync(assets)
    ? readdirSync(assets).find((name) => name.startsWith("styles-") && name.endsWith(".css"))
    : undefined;
  const stylesheet = css ? `<link rel="stylesheet" href="/assets/${css}" />` : "";
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Page not found — GenWealth</title>
<meta name="robots" content="noindex" />
${stylesheet}
</head>
<body>
<div class="flex min-h-screen items-center justify-center bg-background px-4">
  <div class="max-w-md text-center">
    <h1 class="text-7xl font-bold text-foreground">404</h1>
    <h2 class="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
    <p class="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
    <div class="mt-6"><a href="/" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</a></div>
  </div>
</div>
</body>
</html>
`;
  writeFileSync(path.join(dir, "404.html"), html);
}

function contentType(url: string) {
  if (url.endsWith(".xml")) return "application/xml; charset=utf-8";
  return "text/plain; charset=utf-8";
}

export function staticSitePlugin(): Plugin {
  return {
    name: "genwealth-static-feeds",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        const feeds = renderFeeds();
        const body =
          url === "/rss.xml"
            ? feeds.rss
            : url === "/sitemap.xml"
              ? feeds.sitemap
              : url === "/llms.txt"
                ? feeds.llms
                : url === "/robots.txt"
                  ? feeds.robots
                  : null;
        if (!body) return next();
        res.statusCode = 200;
        res.setHeader("content-type", contentType(url ?? ""));
        res.end(body);
      });
    },
    writeBundle(options) {
      const dir = options.dir;
      if (!dir || !dir.includes("client")) return;
      const feeds = renderFeeds();
      mkdirSync(dir, { recursive: true });
      writeFileSync(path.join(dir, "rss.xml"), feeds.rss);
      writeFileSync(path.join(dir, "sitemap.xml"), feeds.sitemap);
      writeFileSync(path.join(dir, "llms.txt"), feeds.llms);
      writeFileSync(path.join(dir, "robots.txt"), feeds.robots);
      writeNotFound(dir);
    },
  };
}

export function insightPrerenderPaths() {
  return loadPosts().map((post) => `/insights/${post.slug}`);
}
