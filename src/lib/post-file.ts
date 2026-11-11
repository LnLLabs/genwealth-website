export type PostKind = "article" | "video";

export type PostFile = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  cover: string | null;
  videoUrl: string | null;
  tags: string[];
  draft: boolean;
  body: string;
  authorName: string;
};

function unquote(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, '"');
  }
  return trimmed;
}

function parseFrontmatter(block: string) {
  const data: Record<string, string> = {};
  const lines = block.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1] ?? "";
    let value = match[2] ?? "";
    if (value === "|" || value === ">") {
      const chunk: string[] = [];
      while (i + 1 < lines.length && /^[ \t]/.test(lines[i + 1] ?? "")) {
        i += 1;
        chunk.push((lines[i] ?? "").replace(/^[ \t]/, ""));
      }
      value = chunk.join(value === "|" ? "\n" : " ");
    }
    data[key] = unquote(value);
  }
  return data;
}

export function parsePost(slug: string, raw: string): PostFile {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const data = match ? parseFrontmatter(match[1] ?? "") : {};
  const body = (match ? (match[2] ?? "") : raw).trim();
  const title = data["title"] || slug;
  const tags = (data["tags"] ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const draftValue = (data["draft"] ?? "").toLowerCase();
  return {
    slug: data["slug"] || slug,
    title,
    date: data["date"] || data["published"] || "",
    summary: data["summary"] || data["excerpt"] || "",
    cover: data["cover"] || data["coverImage"] || null,
    videoUrl: data["videoUrl"] || data["video"] || null,
    tags,
    draft: draftValue === "true" || draftValue === "yes",
    body,
    authorName: data["author"] || "GenWealth",
  };
}

export function postKind(post: Pick<PostFile, "videoUrl">): PostKind {
  return post.videoUrl ? "video" : "article";
}
