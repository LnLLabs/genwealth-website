import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "@/assets/genwealth-logo-transparent.png.asset.json";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/site/primitives";


const nav = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/professionals", label: "For Professionals" },
  { to: "/institutions", label: "For Institutions" },
  { to: "/individuals", label: "For Individuals" },
  { to: "/technology", label: "Technology" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6 py-5 lg:px-10">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="GenWealth" className="h-8 w-auto max-w-[170px] object-contain" />
        </Link>

        <nav className="hidden items-center gap-2 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeProps={{ className: "nav-link-active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>


        <div className="hidden items-center gap-3 xl:flex">
          <Button asChild size="sm" className="rounded-sm">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a call <ArrowUpRight className="size-4" aria-hidden /></a>
          </Button>
          <Button asChild size="sm" variant="outline" className="rounded-sm">
            <Link to="/contact">Talk to us <ArrowUpRight className="size-4" aria-hidden /></Link>
          </Button>
        </div>


        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 xl:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background xl:hidden">
          <nav id="mobile-navigation" className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
            {[...nav, { to: "/contact", label: "Talk to us" }].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="mobile-nav-link"
                activeProps={{ className: "nav-link-active" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mobile-nav-link"
            >
              Book a 30-minute call
            </a>

          </nav>

        </div>
      ) : null}
    </header>
  );
}
