import { createFileRoute } from "@tanstack/react-router";
import {
  BookCallCta,
  CtaLink,

  ExternalCtaLink,
  Eyebrow,
  Lead,
  PageHero,
  Section,
  SectionTitle,
  StatementBlock,
} from "@/components/site/primitives";

import { TechnologyExplorer } from "@/components/site/TechnologyExplorer";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Inheritance Technology — Verify First, Transfer Second | GenWealth" },
      {
        name: "description",
        content:
          "See how GenWealth connects permissions, verification, professional approval and existing financial systems before any inheritance transfer occurs.",
      },
      {
        property: "og:title",
        content: "Inheritance Technology — Verify First, Transfer Second | GenWealth",
      },
      {
        property: "og:description",
        content:
          "Technology that connects to existing financial and legal systems instead of replacing them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Technology,
});

const capabilities = [
  {
    group: "Ownership & control",
    items: [
      { title: "Self-custody", body: "Owners keep control of their assets while alive." },
      {
        title: "Smart accounts",
        body: "Programmable accounts that can hold predefined inheritance logic.",
      },
      {
        title: "Permission architecture",
        body: "Granular permissions describing who can do what, and when.",
      },
    ],
  },
  {
    group: "Inheritance rules",
    items: [
      {
        title: "Beneficiary rules",
        body: "Beneficiaries, allocations and conditions expressed as executable rules.",
      },
      {
        title: "Asset-specific allocation",
        body: "Percentages, specific assets or combined allocations per asset type.",
      },
      {
        title: "Execution workflows",
        body: "Configurable sequences per asset, institution and jurisdiction.",
      },
    ],
  },
  {
    group: "Verification & authorization",
    items: [
      { title: "Identity verification", body: "Verifying the parties involved in the process." },
      {
        title: "Death verification",
        body: "Configurable verification of the triggering event before anything executes.",
      },
      {
        title: "Professional authorization",
        body: "An authorized legal professional provides the required approval.",
      },
    ],
  },
  {
    group: "Resilience & integration",
    items: [
      {
        title: "Recovery mechanisms",
        body: "Designed for the reality that keys and access can be lost.",
      },
      {
        title: "Institutional APIs",
        body: "Connect inheritance workflows into existing institutional systems.",
      },
      {
        title: "Multi-chain architecture",
        body: "Support for assets held across different networks.",
      },
      {
        title: "Custodian & tokenization integration",
        body: "Work with existing custodians, wallets and tokenization platforms.",
      },
      {
        title: "Auditability",
        body: "Clear records of instructions, approvals and executed steps.",
      },
      {
        title: "Privacy & security",
        body: "Sensitive information is handled on a need-to-know basis.",
      },
    ],
  },
];

function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title={
          <>
            Built to verify first and <span className="text-gradient">transfer second.</span>
          </>
        }
        intro={
          <Lead>
            Nothing moves on its own. Every transfer follows predefined permissions, completed checks and professional authorization.
          </Lead>
        }
      >
        <BookCallCta />
        <CtaLink to="/contact" variant="outline">Talk to us</CtaLink>

        <CtaLink to="/how-it-works" variant="outline">
          How it works
        </CtaLink>
        <ExternalCtaLink href="https://docs.genwealth.app/">
          Read the documentation
        </ExternalCtaLink>
      </PageHero>


      {capabilities.map((group, index) => (
        <Section key={group.group}>
          <Eyebrow>{group.group}</Eyebrow>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{{
            "Ownership & control": "Owners keep control while the plan remains ready for when it is needed.",
            "Inheritance rules": "Approved legal instructions become clear rules that technology can follow.",
            "Verification & authorization": "Required events and identities are checked before a professional authorizes the next step.",
            "Resilience & integration": "The process connects to existing wallets, custodians and platforms, with records at every stage.",
          }[group.group]}</p>
          <TechnologyExplorer items={group.items} group={group.group} index={index} />
        </Section>
      ))}

      <Section className="border-b-0">
        <SectionTitle>Built to integrate, not replace.</SectionTitle>
        <Lead className="mt-6">
          GenWealth is designed to sit alongside existing financial, custody and legal
          infrastructure. Institutions keep their systems, controls and customer relationships; the
          inheritance layer is added around them.
        </Lead>
        <div className="mt-10 max-w-3xl">
          <StatementBlock
            lines={["Your systems remain in place.", "GenWealth connects the inheritance workflow around them."]}
          />
        </div>
        <div className="mt-10">
          <ExternalCtaLink href="https://docs.genwealth.app/">
            Read the documentation
          </ExternalCtaLink>
        </div>
      </Section>

    </>
  );
}
