import { Eyebrow, Lead, SectionTitle } from "@/components/site/primitives";

const VIDEO_SRC = "/videos/genwealth-custodians.mp4";
const POSTER_SRC = "/videos/genwealth-custodians-poster.jpg";

export function CustodianDemo() {
  return (
    <>
      <Eyebrow>For custodians</Eyebrow>
      <SectionTitle className="mt-5">See how it works for custodians</SectionTitle>
      <div id="custodian-demo-summary">
        <Lead className="mt-6">
          GenWealth connects to your existing custody system to handle client inheritance across
          jurisdictions, with will terms recorded on chain and claims validated by a lawyer in the
          right jurisdiction.
        </Lead>
      </div>
      <div className="mt-10 max-w-4xl">
        <video
          className="aspect-video w-full border border-border-strong bg-surface"
          controls
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          aria-label="GenWealth demo for custodians"
          aria-describedby="custodian-demo-summary"
          title="See how it works for custodians"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </>
  );
}
