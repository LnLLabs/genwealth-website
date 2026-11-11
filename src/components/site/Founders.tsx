import { Linkedin } from "lucide-react";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/site/primitives";
import rafael from "@/assets/founders/rafael-cardoso.jpg.asset.json";
import leandros from "@/assets/founders/leandros-holleman.jpg.asset.json";

const founders = [
  {
    name: "Rafael Cardoso",
    role: "Co-founder & CEO",
    photo: leandros.url,
    linkedin: "https://www.linkedin.com/in/rafael-cardoso-2b03ba146/",
    bio: "Eight years of experience building products, teams, and partnerships across Web2 and Web3. Developed Will Easy, a UK online will platform, where he led partnerships and marketing. Led the development of a hospitality recruitment matching platform, signing up more than 170 restaurants and 2,600 hospitality professionals. Worked as a DeFi consultant for EMURGO and led the team responsible for events and community growth at Deep Funding.",
  },
  {
    name: "Leandros Holleman",
    role: "Co-founder & CTO",
    photo: rafael.url,
    linkedin: "https://www.linkedin.com/in/holleman-leandros-90260a74/",
    bio: "Computer scientist with over 10 years of experience in infrastructure, specialising in self-custodial wallets and secure infrastructure. Led the development of AnetaBTC V2, the largest wrapped-Bitcoin protocol on Cardano, and launched Key Pact, the first multisignature smart wallet on Cardano. A member of Cardano’s Technical Steering Committee, contributing to Cardano’s technical direction.",
  },
];

const learned = [
  { title: "Two versions shipped", body: "GenWealth V2 enables self-custodial inheritance execution across jurisdictions, plus a multichain solution for custodians." },
  { title: "Professionals at the core", body: "Working closely with 26 inheritance firms showed us lawyers and notaries must stay in charge of validation — technology should carry out what they confirm." },
  { title: "Funded by the community", body: "$95,000 in non-dilutive grants, voted for by 505 digital asset users." },
];

export function Founders() {
  return (
    <>
      <Section>
        <Eyebrow>Who is building GenWealth</Eyebrow>
        <SectionTitle className="mt-5">Two founders who have built inheritance products and secure blockchain infrastructure before.</SectionTitle>
        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          {founders.map((f) => (
            <article key={f.name} className="border-t border-border-strong pt-8">
              <div className="flex items-center gap-5">
                <img src={f.photo} alt={`Portrait of ${f.name}`} width={112} height={112} loading="lazy" className="size-24 shrink-0 rounded-sm object-cover object-top sm:size-28" />
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">{f.name}</h3>
                  <p className="eyebrow mt-2 text-primary/90">{f.role}</p>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Linkedin className="size-4 shrink-0" aria-hidden />
                    LinkedIn
                  </a>
                </div>
              </div>
              <p className="mt-6 text-base leading-relaxed text-foreground/85">{f.bio}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <Eyebrow>Why we are qualified</Eyebrow>
        <SectionTitle className="mt-5">Inheritance market experience, meeting proven security engineering.</SectionTitle>
        <Lead className="mt-6">
          Rafael has worked inside the inheritance market — acquiring customers and partnering with professionals. Leandros has launched wallet and protocol infrastructure that holds real value on Mainnet. GenWealth needs both: trust with legal professionals, and technology that keeps assets secure until the right moment.
        </Lead>
      </Section>
      <Section>
        <Eyebrow>What we have learned and achieved</Eyebrow>
        <SectionTitle className="mt-5">Progress so far.</SectionTitle>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {learned.map((l) => (
            <div key={l.title} className="border-t border-border-strong pt-6">
              <h3 className="text-lg font-semibold">{l.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
