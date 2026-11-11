import { createFileRoute } from "@tanstack/react-router";
import { CurrentDemo } from "@/components/site/CurrentDemo";
import { BookCallCta, CtaLink, Eyebrow, ItemGrid, Lead, PageHero, Section, SectionTitle, StatementBlock } from "@/components/site/primitives";
import { WealthTransferLayer } from "@/components/site/WealthTransferLayer";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [
    { title: "How GenWealth Works — From Plan to Transfer" },
    { name: "description", content: "See how GenWealth connects an owner's wishes, legal validation and institutional checks so inheritance can be carried out." },
    { property: "og:title", content: "How GenWealth Works — From Plan to Transfer" },
    { property: "og:description", content: "A clear path from inheritance instructions to a completed transfer." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: HowItWorks,
});

const steps=[
{label:"01",title:"Prepare the plan",body:"The owner records the relevant assets, chooses beneficiaries and defines what should happen—with support from a lawyer or notary."},
{label:"02",title:"Validate the instructions",body:"The legal professional checks the plan, documentation and applicable legal requirements. The owner remains in control of the assets."},
{label:"03",title:"Connect the assets",body:"GenWealth turns the approved instructions into clear rules and links them to the relevant wallets, custodians or institutions."},
{label:"04",title:"Verify the event",body:"When the plan is needed, the required identity, legal, institutional and event checks are completed before anything can move."},
{label:"05",title:"Authorize and transfer",body:"Once the required conditions are satisfied and the authorized professional approves, the predefined transfer is carried out."},
];
function HowItWorks(){return <>
<PageHero eyebrow="How it works" title={<>From an inheritance plan to a <span className="text-gradient">completed transfer.</span></>} intro={<Lead>A legal document says what should happen. GenWealth connects the people, checks and systems needed to make it happen.</Lead>}><BookCallCta /><CtaLink to="/contact" variant="outline">Talk to GenWealth</CtaLink><CtaLink to="/technology" variant="outline">See the technology</CtaLink></PageHero>
<Section><Eyebrow>Five clear stages</Eyebrow><SectionTitle className="mt-5">Know what happens—and who is responsible.</SectionTitle><div className="mt-10"><ItemGrid columns={2} items={steps.map(x=>({label:x.label,title:x.title,body:x.body}))}/></div></Section>
<Section><SectionTitle>Follow an asset through the process.</SectionTitle><Lead className="mt-6">The institution keeps custody. The legal professional keeps legal authority. GenWealth keeps the approved process connected.</Lead><div className="mt-10"><WealthTransferLayer/></div></Section>
<Section id="current-demo"><CurrentDemo /></Section>
<Section className="border-b-0"><SectionTitle>Built for real-world inheritance.</SectionTitle><Lead className="mt-6">People, assets and beneficiaries can span several countries. GenWealth connects technology with local legal expertise instead of trying to replace it.</Lead><div className="mt-10 max-w-3xl"><StatementBlock lines={["Clear roles. Required checks. Approved instructions.","Less searching, chasing and uncertainty for everyone involved."]}/></div><div className="mt-8 flex flex-wrap gap-3"><BookCallCta /><CtaLink to="/contact" variant="outline">Discuss your situation</CtaLink></div></Section>
</>}
