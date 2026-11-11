import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Eyebrow, Lead, SectionTitle } from "@/components/site/primitives";

const WATCH_URL = "https://youtu.be/VuM91vV0d2s";
const EMBED_URL = "https://www.youtube-nocookie.com/embed/VuM91vV0d2s?autoplay=1";

export function CurrentDemo() {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  return (
    <>
      <Eyebrow>Current demo</Eyebrow>
      <SectionTitle className="mt-5">See the current demo</SectionTitle>
      <div id="current-demo-summary">
        <Lead className="mt-6">
          This demo shows our current solution. It does not represent the full GenWealth vision.
        </Lead>
      </div>
      <div className="mt-10 max-w-4xl">
        <div className="relative aspect-video w-full overflow-hidden border border-border-strong bg-surface">
          {playing ? (
            <iframe
              ref={frameRef}
              src={EMBED_URL}
              title="Current GenWealth demo"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface px-6 text-center text-foreground transition-colors hover:bg-surface-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-8px] focus-visible:outline-ring"
              onClick={() => setPlaying(true)}
              aria-describedby="current-demo-summary"
            >
              <span
                className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
                aria-hidden
              >
                <Play className="size-7 fill-current" />
              </span>
              <span className="text-sm font-semibold">Play the current GenWealth demo</span>
            </button>
          )}
        </div>
        <a
          href={WATCH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Watch on YouTube
          <ArrowUpRight className="size-4 text-primary" aria-hidden />
        </a>
      </div>
    </>
  );
}
