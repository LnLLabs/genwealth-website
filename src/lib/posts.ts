import { parsePost, postKind, type PostFile, type PostKind } from "@/lib/post-file";

export type { PostKind };

const files = import.meta.glob("../../content/posts/*.{md,mdoc,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
});

function slugFromPath(path: string) {
  const name = path.split("/").pop() ?? path;
  return name.replace(/\.(md|mdoc|mdx)$/, "");
}

export function siteUrl() {
  const configured = import.meta.env["VITE_SITE_URL"];
  const value =
    typeof configured === "string" && configured.trim()
      ? configured.trim()
      : "https://genwealth.example";
  return value.replace(/\/+$/, "");
}

export const SITE_URL = siteUrl();

export function allPosts(): PostFile[] {
  return Object.entries(files)
    .map(([path, raw]) => parsePost(slugFromPath(path), String(raw)))
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return allPosts().find((post) => post.slug === slug) ?? null;
}

export function videoEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("/")) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be")
      return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`;
    if (host.endsWith("youtube.com")) {
      const id = parsed.searchParams.get("v") ?? parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host.endsWith("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function isSelfHostedVideo(url: string | null | undefined) {
  return Boolean(url && (url.startsWith("/videos/") || url.startsWith("/")));
}

export function videoThumbnail(url: string | null | undefined): string | null {
  const embed = videoEmbedUrl(url);
  const match = embed?.match(/youtube-nocookie\.com\/embed\/([\w-]+)/);
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export function formatDate(iso: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));
}

export function postKindOf(post: PostFile) {
  return postKind(post);
}
