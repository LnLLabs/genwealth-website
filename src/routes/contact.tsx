import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import {
  BookCallCta,
  CtaLink,
  Eyebrow,
  Lead,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/site/primitives";
import { contactSubmissionSchema, web3FormsAccessKey } from "@/lib/contact";

const audienceKeys = ["professionals", "institutions", "individuals"] as const;
type AudienceKey = (typeof audienceKeys)[number];

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { audience?: AudienceKey } => {
    const key = search["audience"];
    return audienceKeys.includes(key as AudienceKey) ? { audience: key as AudienceKey } : {};
  },

  head: () => ({
    meta: [
      { title: "Talk to GenWealth — Inheritance Infrastructure" },
      {
        name: "description",
        content:
          "Book a demo, join the waitlist or discuss an integration. Tell us who you are and how inheritance works in your practice or institution today.",
      },
      { property: "og:title", content: "Talk to GenWealth — Inheritance Infrastructure" },
      {
        property: "og:description",
        content:
          "Legal professionals, institutions and individuals: start a conversation with GenWealth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const audiences = [
  "Lawyer / notary",
  "Bank / custodian",
  "Tokenization platform",
  "Wealth platform",
  "Individual",
];

const presets: Record<AudienceKey, { audience: string; reason: string; message: string }> = {
  professionals: {
    audience: "Lawyer / notary",
    reason: "Explore a professional workflow",
    message: "I would like to explore how GenWealth fits into my professional workflow.",
  },
  institutions: {
    audience: "Bank / custodian",
    reason: "Discuss an institutional integration",
    message: "I would like to discuss an institutional integration.",
  },
  individuals: {
    audience: "Individual",
    reason: "Prepare your digital assets",
    message: "I would like to prepare my digital assets for inheritance.",
  },
};

function Contact() {
  const { audience: audienceKey } = Route.useSearch();
  const preset = audienceKey ? presets[audienceKey] : undefined;
  const [audience, setAudience] = useState(preset?.audience ?? audiences[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(preset?.message ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [botcheck, setBotcheck] = useState("");
  const accessKey = web3FormsAccessKey();

  useEffect(() => {
    if (preset) {
      setAudience(preset.audience);
      setMessage(preset.message);
    }
  }, [preset?.audience, preset?.message]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSubmissionSchema.safeParse({ name, email, audience, message });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0] ?? "form")] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    if (botcheck) {
      setStatus("done");
      return;
    }
    if (!accessKey) {
      setErrors({
        form: "This form is not configured yet. Email hello@genwealth.app, or set VITE_WEB3FORMS_ACCESS_KEY.",
      });
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: parsed.data.name,
          email: parsed.data.email,
          audience: parsed.data.audience,
          message: parsed.data.message,
          subject: "GenWealth website enquiry",
          botcheck,
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Web3Forms rejected the message");
      }
      setStatus("done");
    } catch {
      setErrors({
        form: "We couldn't send your message. Please try again in a moment or write to hello@genwealth.app.",
      });
      setStatus("idle");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Talk to us"
        title={
          <>
            Tell us where inheritance <span className="text-gradient">breaks down today.</span>
          </>
        }
        intro={
          <Lead>
            Tell us about your practice, institution or assets. We'll show you where GenWealth can
            make the process clearer and reduce manual work.
          </Lead>
        }
      >
        <BookCallCta />
      </PageHero>

      <Section className="border-b-0">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-t border-border-strong pt-7 sm:pt-9">
            <SectionTitle className="text-2xl">Start the conversation</SectionTitle>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tell us your situation. We'll arrange a walkthrough. You decide whether it fits.
            </p>
            {preset ? (
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
                <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                Reason for your call: {preset.reason.toLowerCase()}
              </p>
            ) : null}

            {status === "done" ? (
              <div className="mt-7 border-t border-border-strong pt-7">
                <p className="text-lg font-medium">Thank you. Your message is on its way.</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We will reply by email. Prefer to talk live? Book a 30-minute call above.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative mt-7 space-y-6">
                {accessKey ? null : (
                  <p className="text-sm text-muted-foreground" role="status">
                    This form is not configured yet. You can still email hello@genwealth.app.
                  </p>
                )}
                <div
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label>
                    Leave this field empty
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={botcheck}
                      onChange={(event) => setBotcheck(event.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <p className="eyebrow">I am a</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {audiences.map((item) => (
                      <Button
                        key={item}
                        type="button"
                        onClick={() => setAudience(item)}
                        aria-pressed={audience === item}
                        className={
                          audience === item
                            ? "rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                            : "rounded-md border border-border bg-transparent px-4 py-2 text-sm text-muted-foreground shadow-none transition-colors hover:border-border-strong hover:bg-surface hover:text-foreground"
                        }
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="eyebrow">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    aria-invalid={!!errors["name"]}
                    className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                    placeholder="Your name"
                  />
                  {errors["name"] ? (
                    <span className="mt-2 block text-xs text-destructive">{errors["name"]}</span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="eyebrow">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    aria-invalid={!!errors["email"]}
                    className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                    placeholder="you@example.com"
                  />
                  {errors["email"] ? (
                    <span className="mt-2 block text-xs text-destructive">{errors["email"]}</span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="eyebrow">What would you like to discuss?</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    maxLength={2000}
                    aria-invalid={!!errors["message"]}
                    className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
                    placeholder="A demo, an integration, cross-border cases, preparing digital assets…"
                  />
                  {errors["message"] ? (
                    <span className="mt-2 block text-xs text-destructive">{errors["message"]}</span>
                  ) : null}
                </label>

                {errors["form"] ? (
                  <p className="text-sm text-destructive">{errors["form"]}</p>
                ) : null}

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-auto rounded-sm px-5 py-3"
                >
                  {status === "submitting" ? "Sending…" : "Send your message"}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Button>
                <p className="text-xs text-muted-foreground">
                  We only use your details to reply to this message. Prefer email?{" "}
                  <a
                    className="underline underline-offset-2 hover:text-foreground"
                    href="mailto:hello@genwealth.app"
                  >
                    hello@genwealth.app
                  </a>
                </p>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="border-t border-border-strong py-7">
              <Eyebrow>Legal professionals</Eyebrow>
              <p className="mt-3 text-sm text-muted-foreground">
                See how the technology fits into your existing workflow and how you can offer it to
                clients.
              </p>
              <div className="mt-5">
                <CtaLink to="/professionals" variant="outline">
                  For Professionals
                </CtaLink>
              </div>
            </div>
            <div className="border-t border-border-strong py-7">
              <Eyebrow>Institutions</Eyebrow>
              <p className="mt-3 text-sm text-muted-foreground">
                We start with your workflow, not a fixed product, and design the inheritance layer
                around your requirements.
              </p>
              <div className="mt-5">
                <CtaLink to="/institutions" variant="outline">
                  For Institutions
                </CtaLink>
              </div>
            </div>
            <div className="border-t border-border-strong py-7">
              <Eyebrow>Individuals</Eyebrow>
              <p className="mt-3 text-sm text-muted-foreground">
                Prepare your digital assets for inheritance without giving up control today.
              </p>
              <div className="mt-5">
                <CtaLink to="/individuals" variant="outline">
                  For Individuals
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
