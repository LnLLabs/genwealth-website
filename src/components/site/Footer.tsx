import { Link } from "@tanstack/react-router";
import logo from "@/assets/genwealth-logo-transparent.png.asset.json";

const columns = [
  {
    title: "Infrastructure",
    links: [
      { to: "/how-it-works", label: "How It Works" },
      { to: "/technology", label: "Technology" },
      { to: "/about", label: "About & Vision" },
    ],
  },
  {
    title: "Audiences",
    links: [
      { to: "/professionals", label: "Lawyers & Notaries" },
      { to: "/institutions", label: "Banks & Custodians" },
      { to: "/individuals", label: "Individuals" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img src={logo.url} alt="GenWealth" className="h-9 w-auto max-w-[190px] object-contain" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Connect legal instructions, financial institutions and technology so wealth can reach
              the people it was meant for.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GenWealth. Inheritance infrastructure.</p>
          <p>GenWealth provides technology, not legal advice.</p>
        </div>
      </div>
    </footer>
  );
}
