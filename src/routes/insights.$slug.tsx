import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { BookCallCta, CtaLink, Eyebrow, Section } from "@/components/site/primitives";
import {
  SITE_URL,
  formatDate,
  getPost,
  isSelfHostedVideo,
  postKindOf,
  readingMinutes,
  videoEmbedUrl,
  videoThumbnail,
} from "@/lib/posts";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ params, loaderData: post }) => {
    if (!post)
      return {
        meta: [
          { title: "Insight unavailable — GenWealth" },
          { name: "robots", content: "noindex" },
        ],
      };
    const url = `${SITE_URL}/insights/${params.slug}`;
    const title = `${post.title} | GenWealth Insights`;
    const description = post.summary || post.body.replace(/[#*_>`[\]()]/g, "").slice(0, 155);
    const image = post.cover ?? videoThumbnail(post.videoUrl);
    const embed = videoEmbedUrl(post.videoUrl);
    const kind = postKindOf(post);
    const schema =
      kind === "video"
        ? {
            "@type": "VideoObject",
            name: post.title,
            description,
            uploadDate: post.date,
            thumbnailUrl: image ? [image] : undefined,
            embedUrl: embed ?? undefined,
            contentUrl: post.videoUrl ?? undefined,
          }
        : {
            "@type": "BlogPosting",
            headline: post.title,
            description,
            image: image ?? undefined,
            wordCount: post.body.split(/\s+/).length,
            keywords: post.tags.join(", ") || undefined,
          };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: kind === "video" ? "video.other" : "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(post.date ? [{ property: "article:published_time", content: post.date }] : []),
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            ...schema,
            url,
            datePublished: post.date,
            author: { "@type": "Organization", name: post.authorName },
            publisher: { "@type": "Organization", name: "GenWealth", url: SITE_URL },
            mainEntityOfPage: url,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <Section>
      <h1 className="text-3xl font-medium">This insight isn’t available.</h1>
      <div className="mt-6">
        <CtaLink to="/insights" variant="outline">
          All insights
        </CtaLink>
      </div>
    </Section>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const kind = postKindOf(post);
  const embed = videoEmbedUrl(post.videoUrl);
  const selfHosted = isSelfHostedVideo(post.videoUrl);
  return (
    <article>
      <header className="page-hero border-b border-border/60 pb-12 pt-14">
        <div className="mx-auto w-full max-w-3xl px-6">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All insights
          </Link>
          <div className="mt-8">
            <Eyebrow>
              {kind === "video" ? "Video update" : "Article"} ·{" "}
              <time dateTime={post.date || undefined}>{formatDate(post.date)}</time>
              {kind === "article" ? ` · ${readingMinutes(post.body)} min read` : ""}
            </Eyebrow>
          </div>
          <h1 className="page-heading mt-5 text-4xl font-medium leading-[1.15] sm:text-5xl">
            {post.title}
          </h1>
          {post.summary ? (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.summary}</p>
          ) : null}
          <p className="mt-6 text-sm text-muted-foreground">By {post.authorName}</p>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        {embed ? (
          <div className="mb-10 aspect-video w-full overflow-hidden bg-surface">
            <iframe
              src={embed}
              title={post.title}
              className="h-full w-full"
              allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : selfHosted && post.videoUrl ? (
          <video
            className="mb-10 aspect-video w-full bg-surface"
            controls
            playsInline
            preload="metadata"
            poster={post.cover ?? undefined}
            aria-label={post.title}
          >
            <source src={post.videoUrl} type="video/mp4" />
          </video>
        ) : post.cover ? (
          <img src={post.cover} alt="" className="mb-10 aspect-[16/9] w-full object-cover" />
        ) : null}
        <div className="prose-post">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
        {post.tags.length ? (
          <ul className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-14 flex flex-wrap gap-3 border-t border-border pt-10">
          <BookCallCta />
          <CtaLink to="/contact" variant="outline">
            Talk to GenWealth
          </CtaLink>
        </div>
      </div>
    </article>
  );
}
