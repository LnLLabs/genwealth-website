import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { insightPrerenderPaths, staticSitePlugin } from "./scripts/static-site-plugin";

const pages = [
  "/",
  "/about",
  "/how-it-works",
  "/professionals",
  "/institutions",
  "/individuals",
  "/technology",
  "/contact",
  "/insights",
  ...insightPrerenderPaths(),
].map((path) => ({ path }));

export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoSubfolderIndex: true,
      failOnError: true,
      filter: (page: { path?: string }) => {
        const route = page.path ?? "";
        return !route.startsWith("/keystatic") && !route.startsWith("/api");
      },
    },
    pages,
  },
  vite: {
    plugins: [staticSitePlugin()],
  },
});
