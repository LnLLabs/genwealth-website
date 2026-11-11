import { ArrowRight, Check, Fingerprint, GitBranch, KeyRound, Layers, LockKeyhole, Network, Scale, ShieldCheck, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Capability = { title: string; body: string };

const icons = [KeyRound, GitBranch, ShieldCheck, Network];
const connections = [
  { from: "Asset owner", to: "Inheritance plan", icon: Wallet, endIcon: LockKeyhole, caption: "Control today. Prepared for tomorrow." },
  { from: "Approved instructions", to: "Beneficiaries", icon: Scale, endIcon: Users, caption: "Your wishes, expressed as clear instructions." },
  { from: "Required checks", to: "Professional approval", icon: Fingerprint, endIcon: Scale, caption: "Verification comes before any transfer." },
  { from: "Existing systems", to: "Connected workflow", icon: Layers, endIcon: GitBranch, caption: "Connected infrastructure. Clear responsibilities." },
];

export function TechnologyExplorer({ items, index, group }: { items: Capability[]; index: number; group: string }) {
  const [active, setActive] = useState(items[0]?.title ?? "");
  const Icon = icons[index] ?? Network;
  const connection = connections[index] ?? connections[0];
  if (!connection) return null;
  const currentIndex = items.findIndex(item => item.title === active);

  return (
    <Tabs value={active} onValueChange={setActive} orientation="vertical" className="technology-explorer mt-10">
      <TabsList aria-label={group} className="technology-topics">
        {items.map((item, i) => (
          <TabsTrigger value={item.title} key={item.title} className="technology-topic">
            <span className="topic-index" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
            <span className="topic-label min-w-0 flex-1">{item.title}</span>
            <ArrowRight className="topic-arrow size-4 shrink-0" aria-hidden />
          </TabsTrigger>

        ))}
      </TabsList>
      <div className="technology-detail">
        {items.map((item, i) => (
          <TabsContent key={item.title} value={item.title} className="technology-panel">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow text-primary">{group}</span>
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            </div>
            <div className="technology-diagram" aria-label={`${connection.from}, ${item.title}, ${connection.to}`}>
              <div className="technology-node"><connection.icon strokeWidth={1.4} aria-hidden /><span>{connection.from}</span></div>
              <div className="technology-wire" aria-hidden><span /></div>
              <div className="technology-core"><Icon strokeWidth={1.4} aria-hidden /><span className="font-mono">GenWealth</span></div>
              <div className="technology-wire" aria-hidden><span /></div>
              <div className="technology-node"><connection.endIcon strokeWidth={1.4} aria-hidden /><span>{connection.to}</span></div>
            </div>
            <div className="technology-copy" key={item.title}>
              <h3 className="text-2xl font-medium sm:text-3xl">{item.title}</h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground"><Check className="size-4 shrink-0 text-primary" aria-hidden /><span>{connection.caption}</span></div>
          </TabsContent>
        ))}
        <div className="technology-pagination">
          <span className="flex gap-1.5" aria-hidden>{items.map(item => <span key={item.title} className={item.title === active ? "technology-dot technology-dot-active" : "technology-dot"} />)}</span>
          <Button variant="ghost" size="icon" aria-label={`Next topic in ${group}`} title="Next topic" onClick={() => { const next = items[(currentIndex + 1) % items.length]; if (next) setActive(next.title); }} className="text-muted-foreground hover:bg-surface-strong hover:text-foreground"><ArrowRight aria-hidden /></Button>
        </div>
      </div>
    </Tabs>
  );
}