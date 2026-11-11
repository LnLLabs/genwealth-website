import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ClipboardList, FileCheck2, ShieldCheck } from "lucide-react";
import { BookCallCta, BOOKING_URL, CtaLink, ExternalCtaLink, Eyebrow, ItemGrid, Lead, PageHero, Section, SectionTitle, StatementBlock, TokenList } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import pageImage from "@/assets/inheritance-planning.jpg";

export const Route = createFileRoute("/professionals")({
  head: () => ({
    meta: [
      { title: "For Lawyers & Notaries — GenWealth" },
      { name: "description", content: "Help clients prepare digital assets for inheritance, reduce repetitive administration and preserve your role as their legal adviser." },
      { property: "og:title", content: "For Lawyers & Notaries — GenWealth" },
      { property: "og:description", content: "Turn validated legal instructions into a plan that can be carried out." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Professionals,
});

const stages = [
  {
    icon: ClipboardList,
    title: "Prepare the case",
    phase: "Preparation",
    body: "After will creation, assist the client in organizing asset information, beneficiary information and defining instructions for execution that respect the will.",
  },
  {
    icon: FileCheck2,
    title: "Verify and confirm death claims",
    phase: "Verification",
    body: "Validate and submit documents related to proof of death.",
  },
  {
    icon: ShieldCheck,
    title: "Edit, validate and confirm transfer rules",
    phase: "Authorization",
    body: "Validate that transfer rules respect the will and the distribution defined in the probate.",
  },
];

const faqs = [
  {
    question: "Do I need to change the way I draft or validate wills?",
    body: [
      "No. GenWealth works alongside your existing process. It adds a service you can offer clients to help make sure their assets, documents, and instructions are organised and ready for inheritance.",
      "You can turn the instructions in a Will into transactions that are ready to be executed once you have completed the necessary checks and approved the distribution, saving families a lot of time, money and headaches with lost assets and bureaucracy.",
    ],
  },
  {
    question: "What tasks does GenWealth perform, and which remain my responsibility?",
    body: [
      "GenWealth's infrastructure helps automate the execution of a Will by organising and transferring assets, documents, and relevant information to the right beneficiaries.",
      "You remain responsible for drafting and validating the Will, just as you do today.",
      "You can also offer clients an additional service: helping them identify and organise their assets, documents, and beneficiary details while they are still alive. They can then keep this information updated through GenWealth.",
      "When the time comes, you verify the death and confirm that the distribution follows the Will and applicable legal requirements. Once approved, GenWealth helps carry out the distribution according to those instructions.",
    ],
  },
  {
    question: "Can I try the product with a real or test case?",
    body: [
      "Yes! You can start with our demo, where you can simulate the inheritance process and see how each stage works.",
      "Once you're comfortable with the platform, we can help you get started with a real case.",
    ],
    cta: { href: BOOKING_URL, label: "Book a call and let's explore it together" },
  },
];

function Professionals() {
  return (
    <>
      <PageHero
        image={pageImage}
        imageAlt="A legal adviser helping a couple prepare their inheritance instructions"
        eyebrow="For lawyers & notaries"
        title={<>Give clients a plan that works <span className="text-gradient">when they need it.</span></>}
        intro={
          <>
            <Lead>Your clients own wallets, tokens and cross-border accounts that a paper will cannot reach on its own.</Lead>
            <Lead>GenWealth connects your validated instructions to the people and systems responsible for carrying them out.</Lead>
          </>
        }
      >
        <BookCallCta />
        <CtaLink to="/contact" variant="outline">Book a demo</CtaLink>
        <CtaLink to="/how-it-works" variant="outline">See how it works</CtaLink>

      </PageHero>

      <Section>
        <SectionTitle>Spend less time chasing. More time advising.</SectionTitle>
        <Lead className="mt-6">Inheritance cases can involve finding assets, requesting documents, checking information and following up with several institutions. GenWealth gives that work a clear structure.</Lead>
        <div className="mt-10">
          <ItemGrid
            items={[
              { title: "A better client service", body: "Help clients prepare assets before an inheritance event creates urgency." },
              { title: "Less repetitive administration", body: "Keep assets, instructions, approvals and next steps connected." },
              { title: "A service that can scale", body: "Use a repeatable process instead of rebuilding every case from scratch." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionTitle>Built for assets traditional workflows struggle to reach.</SectionTitle>
        <div className="mt-6">
          <TokenList items={["Digital wallets", "Cryptoassets", "Tokenized assets", "International accounts", "Digitally represented ownership"]} />
        </div>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">Your client keeps control. You retain responsibility for legal advice and validation. GenWealth provides the technology that connects the approved instructions to execution.</p>
      </Section>

      <Section>
        <Eyebrow>In a case</Eyebrow>
        <SectionTitle className="mt-5">How professionals work with GenWealth</SectionTitle>
        <Lead className="mt-6">A concrete view of what you do inside the product, stage by stage.</Lead>
        <table className="stage-table mt-12">
          <caption className="sr-only">How professionals work with GenWealth, stage by stage</caption>
          <colgroup>
            <col className="stage-col-rail" />
            <col className="stage-col-name" />
            <col className="stage-col-phase" />
            <col />
          </colgroup>
          <thead className="stage-head">
            <tr>
              <th scope="col" className="stage-head-rail">
                <span className="sr-only">Flow</span>
              </th>
              <th scope="col">Stage</th>
              <th scope="col">Phase</th>
              <th scope="col">What you do inside the product</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((stage, i) => (
              <tr key={stage.title} className={cn("stage-row", i === 0 && "stage-row-first")}>
                <td className="stage-cell stage-rail" aria-hidden="true">
                  <span className="stage-node">
                    <stage.icon className="size-4" strokeWidth={1.4} />
                  </span>
                </td>
                <th scope="row" className="stage-cell stage-name-cell">
                  <span className="stage-name">{stage.title}</span>
                </th>
                <td className="stage-cell stage-phase-cell">
                  <span className="stage-phase">{stage.phase}</span>
                </td>
                <td className="stage-cell stage-body-cell">
                  <p className="stage-body">{stage.body}</p>
                </td>
              </tr>
            ))}
            <tr className="stage-row stage-row-last stage-row-terminal">
              <td className="stage-cell stage-rail" aria-hidden="true">
                <span className="stage-node">
                  <Check className="size-4" strokeWidth={1.6} />
                </span>
              </td>
              <th scope="row" className="stage-cell stage-name-cell">
                <span className="stage-name">Execution</span>
              </th>
              <td className="stage-cell stage-phase-cell">
                <span className="stage-phase">Next</span>
              </td>
              <td className="stage-cell stage-body-cell">
                <p className="stage-body">The validated instructions are executed by the infrastructure for assets, documentation, and information held by the deceased and assets held in the institutions leveraging the infrastructure.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section>
        <SectionTitle>Short FAQ</SectionTitle>
        <Lead className="mt-6">Short answers to what lawyers and notaries usually ask first.</Lead>
        <AccordionPrimitive.Root type="single" collapsible defaultValue="faq-0" className="faq-list mt-12">
          {faqs.map((faq, i) => (
            <AccordionPrimitive.Item key={faq.question} value={`faq-${i}`} className="faq-item">
              <AccordionPrimitive.Header className="faq-header">
                <AccordionPrimitive.Trigger className="faq-trigger">
                  <span className="faq-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="faq-answer">
                <div className="faq-answer-inner">
                  {faq.body.map((paragraph) => (
                    <p key={paragraph} className="faq-paragraph">{paragraph}</p>
                  ))}
                  {faq.cta ? (
                    <div className="faq-cta">
                      <ExternalCtaLink href={faq.cta.href} variant="outline">{faq.cta.label}</ExternalCtaLink>
                    </div>
                  ) : null}
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </Section>

      <Section className="border-b-0">
        <StatementBlock lines={["You provide legal expertise.", "GenWealth provides the infrastructure.", "Together, you give clients a clearer path forward."]} />
        <div className="mt-8">
          <BookCallCta />
          <CtaLink to="/contact" variant="outline">Book a demo</CtaLink>

        </div>
      </Section>
    </>
  );
}
