import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BOOKING_URL, CtaLink, Eyebrow, Lead, Section, SectionTitle } from "@/components/site/primitives";
import { WealthTransferLayer } from "@/components/site/WealthTransferLayer";
import { Traction } from "@/components/site/Traction";
import familyImage from "@/assets/inheritance-family.jpg";
import planningImage from "@/assets/inheritance-planning.jpg";
import legacyImage from "@/assets/family-legacy.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GenWealth — Inheritance, Connected" },
    { name: "description", content: "GenWealth connects owners, legal professionals and financial institutions so inheritance plans can be carried out with less delay and manual work." },
    { property: "og:title", content: "GenWealth — Inheritance, Connected" },
    { property: "og:description", content: "Your wealth. The people you choose. A connected path from inheritance plan to transfer." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Home,
});

type AudienceKey = "professionals" | "institutions" | "individuals";

const audiences: {
  key: AudienceKey;
  label: string;
  title: string;
  body: string;
  to: string;
  cta: string;
  callCta: string;
  callNote: string;
}[] = [
  { key: "professionals", label: "01 / Legal professionals", title: "More advising. Less chasing.", body: "Connect your legal expertise to a process that helps clients’ wishes become reality.", to: "/professionals", cta: "For lawyers & notaries", callCta: "Explore a professional workflow", callNote: "Bring a case you handle often. We walk through where validation and coordination take the most time." },
  { key: "institutions", label: "02 / Financial institutions", title: "Your systems. A clearer workflow.", body: "Add inheritance to your existing custody and compliance processes—not another silo.", to: "/institutions", cta: "For banks & custodians", callCta: "Discuss an institutional integration", callNote: "We start from the process you run today and map where an inheritance layer would connect." },
  { key: "individuals", label: "03 / Individuals", title: "Your wishes. Their peace of mind.", body: "Prepare your digital wealth for the people you choose, while keeping control today.", to: "/individuals", cta: "For individuals", callCta: "Prepare your digital assets", callNote: "We look at your wallets, accounts and documents together, and what still needs preparing." },
];


function Home() {
  return <>
    <header className="home-hero photo-hero">
      <img src={familyImage} alt="Three generations sharing a moment together on a terrace" width={1920} height={1024} fetchPriority="high" />
      <div className="home-hero-inner mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Eyebrow>GenWealth / Inheritance, connected</Eyebrow>
        <h1 className="home-heading mt-7 font-medium">Your wealth.<br />Their future.<br />Connected.</h1>
        <Lead className="mt-7 max-w-lg text-base">Prepare your digital and traditional assets for inheritance. GenWealth connects asset owners, inheritance professionals, custodians, beneficiaries, and technology to semi-automate inheritance transfers to beneficiaries.</Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/contact">Talk to GenWealth</CtaLink>
          <CtaLink to="/how-it-works" variant="outline">How it works</CtaLink>

        </div>
        <p className="mt-7 text-xs text-muted-foreground">Starting with digital assets. Built for every kind of wealth.</p>
      </div>
      <a href="#connected-inheritance" className="hero-scroll" aria-label="Explore connected inheritance"><ArrowDown className="size-4" aria-hidden /></a>
    </header>

    <div className="audience-bar border-b border-border">
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-6 py-6 sm:grid-cols-[1fr_2fr] lg:px-10">
        <p className="eyebrow self-center">One connection. Every role.</p>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          {audiences.map(a => <Link key={a.to} to={a.to} className="inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">{a.cta.replace("For ", "")}<ArrowUpRight className="size-3.5 text-primary" aria-hidden /></Link>)}
        </div>
      </div>
    </div>

    <Section id="connected-inheritance">
      <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <Eyebrow>01 / Beyond the paperwork</Eyebrow>
        <div><SectionTitle>A will says what should happen.<br /><span className="text-muted-foreground">We connect what happens next.</span></SectionTitle>
          <Lead className="mt-6 max-w-xl">Wealth lives across wallets, banks, platforms and countries. Inheritance still relies on people piecing it all together.</Lead>
        </div>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <figure><img src={planningImage} alt="A legal adviser reviewing an inheritance plan with a couple" loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" /><figcaption className="mt-4 flex justify-between gap-4 text-xs text-muted-foreground"><span>Expertise stays human.</span><span>The process becomes connected.</span></figcaption></figure>
        <div className="divide-y divide-border">
          {[{ n: "01", title: "Assets can be missed", body: "Wallets and accounts can be difficult to identify or access." }, { n: "02", title: "People work in silos", body: "Families, lawyers and institutions rely on disconnected documents and manual follow-up." }, { n: "03", title: "Transfers can stall", body: "Missing information and repeated checks add delay when families need clarity." }].map(x => <article key={x.n} className="problem-row flex gap-5 py-6 first:pt-0"><span className="pt-1 font-mono text-xs text-primary">{x.n}</span><div><h3 className="text-xl font-medium">{x.title}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{x.body}</p></div></article>)}
        </div>
      </div>
    </Section>

    <Section className="process-section">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><Eyebrow>02 / A clear path</Eyebrow><div><SectionTitle>Prepare. Validate. Transfer.</SectionTitle><Lead className="mt-5 max-w-xl">Three steps. Clear responsibilities. A plan ready for when it matters.</Lead></div></div>
      <div className="plan-grid mt-14 grid gap-10 md:grid-cols-3">
        {[{ n: "01", title: "Prepare", body: "Record your assets, choose your beneficiaries and make your wishes clear." }, { n: "02", title: "Validate", body: "A lawyer or notary checks the plan against the applicable legal requirements." }, { n: "03", title: "Transfer", body: "GenWealth connects the approved instructions to the checks and systems needed to carry them out." }].map(x => <article key={x.n} className="border-t border-border-strong pt-6"><span className="plan-number font-mono text-primary" aria-hidden>{x.n}</span><h3 className="mt-6 text-2xl font-medium">{x.title}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{x.body}</p></article>)}
      </div>
      <div className="mt-10"><CtaLink to="/how-it-works" variant="outline">Explore the process</CtaLink></div>
    </Section>

    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><Eyebrow>03 / The connection</Eyebrow><div><SectionTitle>Everyone keeps their role.<br /><span className="text-muted-foreground">Nothing gets lost between them.</span></SectionTitle><Lead className="mt-6">You set the wishes. The legal professional validates them. The institution keeps custody. GenWealth connects the path.</Lead></div></div>
      <div className="mt-12"><WealthTransferLayer /></div>
    </Section>

    <Section>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><Eyebrow>04 / Built around you</Eyebrow><SectionTitle className="max-w-2xl">A better way forward.<br />For everyone involved.</SectionTitle></div>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {audiences.map(a => <article key={a.to} className="audience-item flex flex-col border-t border-border-strong pt-6"><p className="eyebrow">{a.label}</p><h3 className="mt-7 max-w-xs text-2xl font-medium leading-snug">{a.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{a.body}</p><Link to={a.to} className="editorial-link mt-7 inline-flex items-center justify-between gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">{a.cta}<ArrowUpRight className="size-4 text-primary" aria-hidden /></Link><div className="call-reason"><p className="text-xs leading-relaxed text-muted-foreground">{a.callNote}</p><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="call-cta mt-5">{a.callCta}<ArrowUpRight className="size-4 text-primary" aria-hidden /></a></div></article>)}
      </div>
    </Section>

    <Traction eyebrow="05 / Traction" />

    <section className="legacy-section photo-hero">
      <img src={legacyImage} alt="A mother and her adult son looking through family photographs" loading="lazy" width={1536} height={1024} />
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24"><Eyebrow>For the next generation</Eyebrow><h2 className="mt-6 max-w-xl text-4xl font-medium leading-tight sm:text-5xl">A lifetime of building.<br />A clear way to pass it on.</h2><p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">The law defines who should inherit. GenWealth helps make the transfer happen.</p><div className="mt-8 flex flex-wrap gap-3"><CtaLink to="/contact">Start a conversation</CtaLink></div></div>
    </section>
  </>;
}
