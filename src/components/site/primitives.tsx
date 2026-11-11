import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("editorial-section border-b border-border/60 py-16 sm:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-2xl text-lg leading-relaxed text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("section-heading max-w-4xl text-3xl font-medium leading-tight sm:text-4xl", className)}>
      {children}
    </h2>
  );
}

const ctaBase =
  "inline-flex items-center justify-center rounded-sm px-5 py-3.5 text-sm font-semibold transition-all duration-200";

export function CtaLink({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:brightness-110",
    outline: "hero-outline border border-border-strong text-foreground hover:bg-surface-strong",
    ghost: "text-muted-foreground hover:text-foreground",
  }[variant];

  return (
    <Button asChild variant={variant === "primary" ? "default" : variant} className={cn(ctaBase, "h-auto whitespace-normal text-left", styles)}>
      <Link to={to}>{children}<ArrowUpRight className="ml-2 size-4 shrink-0" aria-hidden /></Link>
    </Button>
  );
}

export function ExternalCtaLink({
  href,
  children,
  variant = "outline",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:brightness-110",
    outline: "hero-outline border border-border-strong text-foreground hover:bg-surface-strong",
    ghost: "text-muted-foreground hover:text-foreground",
  }[variant];

  return (
    <Button asChild variant={variant === "primary" ? "default" : variant} className={cn(ctaBase, "h-auto whitespace-normal text-left", styles)}>
      <a href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight className="ml-2 size-4 shrink-0" aria-hidden /></a>
    </Button>
  );
}

export const BOOKING_URL = "https://calendly.com/help-genwealth/30min";

export function BookCallCta({
  children = "Book a 30-minute call",
  variant = "primary",
}: {
  children?: ReactNode;
  variant?: "primary" | "outline" | "ghost";
}) {
  return (
    <ExternalCtaLink href={BOOKING_URL} variant={variant}>
      {children}
    </ExternalCtaLink>
  );
}



export function StatementBlock({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <div className={cn("statement-block border-l-2 border-primary pl-6 sm:pl-10", className)}>
      {lines.map((line, i) => (
        <p
          key={line}
          className={cn(
            "font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl",
            i === lines.length - 1 ? "text-gradient font-semibold" : "text-foreground/85",
          )}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export function ItemGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body?: string; label?: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "item-grid grid gap-x-10 gap-y-10",
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {items.map((item) => (
        <div key={item.title} className="border-t border-border-strong pt-6">
          {item.label ? (
            <p className="eyebrow mb-6 text-primary/90">{item.label}</p>
          ) : null}
          <h3 className="text-lg font-semibold">{item.title}</h3>
          {item.body ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function TokenList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-border bg-surface px-3 py-2 font-[family-name:var(--font-mono)] text-xs text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Chain({ steps }: { steps: { role: string; detail: string }[] }) {
  return (
    <ol className="relative space-y-3">
      {steps.map((step, i) => (
        <li key={step.role} className="relative">
          <div className="surface-panel flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6">
            <span className="w-56 shrink-0 font-[family-name:var(--font-display)] font-semibold">
              {step.role}
            </span>
            <span className="text-sm text-muted-foreground">{step.detail}</span>
          </div>
          {i < steps.length - 1 ? (
            <div className="mx-auto h-6 w-px bg-border-strong" aria-hidden />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header className={cn("page-hero border-b border-border/60 pb-16 pt-16 sm:pb-20 sm:pt-20", image && "photo-hero")}>
      {image ? <img src={image} alt={imageAlt ?? ""} width={1536} height={1024} fetchPriority="high" /> : null}
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={cn("page-heading mt-6 text-4xl font-medium leading-[1.12] sm:text-5xl", image ? "max-w-2xl" : "max-w-4xl")}>
          {title}
        </h1>
        {intro ? <div className={cn("mt-7 space-y-4", image && "max-w-xl")}>{intro}</div> : null}
        {children ? <div className="mt-10 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </header>
  );
}
