import { Eyebrow, Lead, Section, SectionTitle } from "@/components/site/primitives";
import techstars from "@/assets/partners/techstars.svg.asset.json";
import cvlabs from "@/assets/partners/cvlabs.svg.asset.json";
import catalyst from "@/assets/partners/catalyst.svg.asset.json";
import xrpl from "@/assets/partners/xrpl.svg.asset.json";
import maerki from "@/assets/partners/maerki.png.asset.json";
import fieldfisher from "@/assets/partners/fieldfisher.png.asset.json";
import solidus from "@/assets/partners/solidus.png.asset.json";
import reis from "@/assets/partners/reis.svg.asset.json";
import legalsquare from "@/assets/partners/legalsquare.png.asset.json";
import rff from "@/assets/partners/rff.svg.asset.json";
import aviz from "@/assets/partners/aviz.png.asset.json";
import rpba from "@/assets/partners/rpba.png.asset.json";
import lfadv from "@/assets/partners/lfadv.png.asset.json";
import jlegal from "@/assets/partners/jlegal.svg.asset.json";
import lamares from "@/assets/partners/lamares.svg.asset.json";

const stats = [
  { value: "02", label: "Versions of the solution launched" },
  { value: "80", label: "Users testing the solution" },
  { value: "26", label: "Inheritance firms across different jurisdictions" },
];

const partners: { name: string; logo?: string; keepColor?: boolean; tall?: boolean }[] = [
  { name: "Techstars", logo: techstars.url },
  { name: "CV Labs", logo: cvlabs.url, keepColor: true },
  { name: "Project Catalyst", logo: catalyst.url },
  { name: "XRP Commons", logo: xrpl.url },
  { name: "Will NGO" },
  { name: "Maerki Baumann", logo: maerki.url, tall: true },
  { name: "Heir Sure" },
  { name: "Solidus Wealth", logo: solidus.url },
  { name: "Reis & Pellicano", logo: reis.url },
  { name: "Legal Square", logo: legalsquare.url },
  { name: "RFF Advogados", logo: rff.url },
  { name: "Cartório Aviz", logo: aviz.url, tall: true },
  { name: "RPBA", logo: rpba.url },
  { name: "Fieldfisher", logo: fieldfisher.url },
  { name: "Leal Figueiredo e Associados", logo: lfadv.url },
  { name: "J Legal", logo: jlegal.url },
  { name: "Lamares Capela", logo: lamares.url },
];

export function Traction({ eyebrow, className }: { eyebrow: string; className?: string }) {
  return (
    <Section className={className ?? ""}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionTitle className="mt-5">Built in the open. Tested in the field.</SectionTitle>
      <Lead className="mt-6">
        We have launched two versions of the solution and tested it with 80 users and 26 inheritance firms across
        different jurisdictions.
      </Lead>
      <div className="traction-stats mt-14 grid gap-8 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="traction-stat border-t border-border-strong pt-6">
            <span className="traction-value">{s.value}</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <Eyebrow>Partners & clients</Eyebrow>
        <div className="partner-marquee mt-6" aria-label="Partners and clients">
          <ul className="partner-track">
            {[0, 1].map((copy) =>
              partners.map((p) => (
                <li key={`${copy}-${p.name}`} className={`partner-logo${p.tall ? " partner-logo-tall" : ""}`} aria-hidden={copy === 1 ? "true" : undefined}>
                  {p.logo ? (
                    <img src={p.logo} alt={copy === 0 ? p.name : ""} data-color={p.keepColor ? "keep" : undefined} />
                  ) : (
                    <span>{p.name}</span>
                  )}
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </Section>
  );
}
