import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { PageHero, Section, Lead } from "@/components/site/primitives";
import {
  SITE_URL,
  allPosts,
  formatDate,
  postKindOf,
  readingMinutes,
  videoThumbnail,
  type PostKind,
} from "@/lib/posts";

const filters = ["all", "article", "video"] as const;
type Filter = (typeof filters)[number];

const TITLE = "Insights — Articles & Video Updates on Digital Inheritance | GenWealth";
const DESC =
  "Articles and video updates from GenWealth on digital asset inheritance, estate planning for crypto, and how lawyers, notaries and institutions carry out inheritance.";

export const Route = createFileRoute("/insights/")({
  validateSearch: (search: Record<string, unknown>): { type?: PostKind } =>
    search["type"] === "article" || search["type"] === "video" ? { type: search["type"] } : {},
  loader: () => allPosts(),
  head: ({ loaderData }) => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/insights` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/insights` },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "GenWealth Insights",
        href: "/rss.xml",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "GenWealth Insights",
          url: `${SITE_URL}/insights`,
          description: DESC,
          publisher: { "@type": "Organization", name: "GenWealth", url: SITE_URL },
          blogPost: (loaderData ?? []).slice(0, 20).map((post) => ({
            "@type": postKindOf(post) === "video" ? "VideoObject" : "BlogPosting",
            headline: post.title,
            name: post.title,
            url: `${SITE_URL}/insights/${post.slug}`,
            datePublished: post.date,
          })),
        }),
      },
    ],
  }),
  component: Insights,
});

function Insights() {
  const posts = Route.useLoaderData();
  const { type } = Route.useSearch();
  const active: Filter = type ?? "all";
  const shown = posts.filter((post) => active === "all" || postKindOf(post) === active);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Articles and video updates on{" "}
            <span className="text-gradient">connected inheritance.</span>
          </>
        }
        intro={
          <Lead>
            What we are building, what we learn from lawyers, notaries and institutions, and how
            digital wealth can be passed on safely.
          </Lead>
        }
      />
      <Section>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter insights">
          {filters.map((filter) => (
            <Link
              key={filter}
              to="/insights"
              search={filter === "all" ? {} : { type: filter }}
              role="tab"
              aria-selected={active === filter}
              className={active === filter ? "nav-link nav-link-active" : "nav-link"}
            >
              {filter === "all" ? "All" : filter === "article" ? "Articles" : "Videos"}
            </Link>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="mt-14 max-w-lg text-muted-foreground">
            Nothing published here yet. New articles and video updates will appear here soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((post) => {
              const kind = postKindOf(post);
              const image = post.cover ?? videoThumbnail(post.videoUrl);
              return (
                <article
                  key={post.slug}
                  className="group flex flex-col border-t border-border-strong pt-6"
                >
                  <Link to="/insights/$slug" params={{ slug: post.slug }} className="flex flex-col">
                    {image ? (
                      <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-surface">
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        {kind === "video" ? (
                          <PlayCircle
                            className="absolute bottom-3 left-3 size-8 text-foreground"
                            aria-hidden
                          />
                        ) : null}
                      </div>
                    ) : null}
                    <p className="eyebrow">
                      {kind === "video" ? "Video" : "Article"} · {formatDate(post.date)}
                      {kind === "article" ? ` · ${readingMinutes(post.body)} min read` : ""}
                    </p>
                    <h2 className="mt-4 text-2xl font-medium leading-snug">{post.title}</h2>
                    {post.summary ? (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {post.summary}
                      </p>
                    ) : null}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground">
                      {kind === "video" ? "Watch" : "Read"}
                      <ArrowUpRight className="size-4 text-primary" aria-hidden />
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
