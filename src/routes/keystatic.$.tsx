import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const Editor = import.meta.env.DEV
  ? lazy(() =>
      import("@/components/keystatic-admin").then((mod) => ({ default: mod.KeystaticAdmin })),
    )
  : null;

export const Route = createFileRoute("/keystatic/$")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Keystatic — GenWealth" }, { name: "robots", content: "noindex" }],
  }),
  component: KeystaticRoute,
});

function KeystaticRoute() {
  if (!Editor) {
    return (
      <p className="p-8 text-sm text-muted-foreground">
        The editor is available while <code>bun run dev</code> is running.
      </p>
    );
  }
  return (
    <Suspense fallback={null}>
      <Editor />
    </Suspense>
  );
}
