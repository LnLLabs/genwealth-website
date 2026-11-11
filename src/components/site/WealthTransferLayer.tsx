import { useState } from "react";
import { ArrowRight, Building2, Landmark, Scale, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

type AssetKey = "bank" | "wallet" | "gold" | "investment" | "property";

const assets: {
  key: AssetKey;
  label: string;
  holder: string;
  note: string;
  stage: string;
  execution: string;
}[] = [
  {
    key: "wallet",
    label: "Crypto wallet",
    holder: "Self-custodied wallet",
    note: "Assets controlled by private keys, often spread across several wallets.",
    stage: "Today",
    execution: "Predefined technical rules release the assets to the beneficiaries.",
  },
  {
    key: "bank",
    label: "Bank account",
    holder: "Bank",
    note: "Accounts held with a regulated institution across one or more jurisdictions.",
    stage: "Next",
    execution: "The bank performs its checks and executes against validated instructions.",
  },
  {
    key: "gold",
    label: "Tokenized gold",
    holder: "Tokenization platform",
    note: "Digitally represented ownership of a physical, redeemable asset.",
    stage: "Next",
    execution: "Succession rules are applied inside the platform's existing infrastructure.",
  },
  {
    key: "investment",
    label: "Investment account",
    holder: "Custodian / broker",
    note: "Securities and portfolios held through a custodian or wealth platform.",
    stage: "Next",
    execution: "Transfer instructions are structured, verified and executed on record.",
  },
  {
    key: "property",
    label: "Property",
    holder: "Registry / notary",
    note: "Legally recognized ownership recorded in a public register.",
    stage: "Ultimately",
    execution: "Inheritance instructions are coordinated with registered ownership.",
  },
];

export function WealthTransferLayer() {
  const [active, setActive] = useState<AssetKey>("wallet");
  const asset = assets.find((a) => a.key === active) ?? assets[0];

  if (!asset) return null;

  const flow = [
    { icon: Wallet, role: "Owner", detail: "Decides what should happen to their wealth." },
    { icon: Scale, role: "Legal professional", detail: "Checks the instructions and legal requirements." },
    { icon: Landmark, role: asset.holder, detail: asset.note },
    {
      icon: Building2,
      role: "GenWealth",
      detail: "Connects the approved plan to the people and systems that carry it out.",
      highlight: true,
    },
    { icon: Users, role: "Beneficiaries", detail: asset.execution },
  ];

  return (
    <div className="transfer-view">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-border pb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Asset type">
          {assets.map(item => <Button key={item.key} type="button" variant="ghost" aria-pressed={active === item.key} onClick={() => setActive(item.key)} className={active === item.key ? "asset-tab asset-tab-active" : "asset-tab"}>{item.label}</Button>)}
        </div>
        <span className="font-mono text-xs text-primary">{asset.stage}</span>
      </div>
      <ol className="transfer-flow grid gap-0 lg:grid-cols-5" aria-live="polite">
        {flow.map((step, i) => <li key={step.role} className={step.highlight ? "transfer-step transfer-step-highlight" : "transfer-step"}>
          <div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>{i < flow.length - 1 ? <ArrowRight className="flow-arrow size-4 text-muted-foreground" aria-hidden /> : null}</div>
          <step.icon className="my-6 size-7 text-primary" strokeWidth={1.3} aria-hidden />
          <h3 className="text-sm font-semibold">{step.role}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
        </li>)}
      </ol>
      <p className="border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">GenWealth does not take ownership of the assets. It connects the approved plan to the people and systems needed to carry it out.</p>
    </div>
  );
}
