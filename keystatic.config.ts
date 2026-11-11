import { config, fields, collection } from "@keystatic/core";

// Local mode writes Markdown into this repo. It works with `bun run dev` on
// Cursor Origin. Keystatic's other modes (github, cloud) only talk to GitHub:
// https://keystatic.com/docs/github-mode and https://keystatic.com/docs/cloud
// Do not switch this until the repo lives on GitHub and the admin is hosted
// on Node. Static Cloudflare Pages cannot run the admin API.
export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Insights",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        cover: fields.image({
          label: "Cover image",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        videoUrl: fields.text({
          label: "Video URL",
          description:
            "Optional. A YouTube or Vimeo link, or a file path such as /videos/genwealth-custodians.mp4.",
        }),
        tags: fields.text({
          label: "Tags",
          description: "Optional. Separate tags with commas.",
        }),
        author: fields.text({ label: "Author", defaultValue: "GenWealth" }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});
