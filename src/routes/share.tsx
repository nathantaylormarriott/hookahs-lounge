import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ComponentType, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Globe,
  ImageIcon,
  Mail,
  MapPin,
  Phone,
  Send,
  UtensilsCrossed,
} from "lucide-react";
import { LOUNGE } from "@/lib/lounge";
import { NETLIFY_FORM_NAME, submitNetlifyForm } from "@/lib/netlify-form";
import { loungeLogo, galleryImages } from "@/lib/site-images";
import { SHARE_OG_IMAGE, SHARE_PAGE_META } from "@/lib/sharePageMeta";
import { cn } from "@/lib/utils";

const SHARE_TAB_CLASS =
  "group flex w-full min-h-[3.25rem] items-center rounded-full border border-gold/30 bg-background/92 px-5 py-3 text-sm font-semibold text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.99]";

const SHARE_FIELD_CLASS =
  "h-11 w-full rounded-full border border-border bg-secondary/50 px-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";

const SHARE_ICON = "h-4 w-4 shrink-0 text-gold";

type ShareLink = {
  label: string;
  href: string;
  external?: boolean;
  animatedArrow?: boolean;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
};

function ShareTabAnimatedArrow() {
  return (
    <ArrowRight
      className={cn(SHARE_ICON, "animate-[share-nudge_1.15s_ease-in-out_infinite]")}
      strokeWidth={2.5}
      aria-hidden
    />
  );
}

function ShareTabContent({
  label,
  icon: Icon,
  trailing,
}: {
  label: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  trailing?: ReactNode;
}) {
  return (
    <div className="relative flex w-full items-center self-stretch">
      <span className="relative z-10 flex shrink-0 items-center text-gold">
        {Icon ? <Icon className={SHARE_ICON} strokeWidth={2.5} aria-hidden /> : null}
      </span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center leading-snug">
        {label}
      </span>
      <span className="relative z-10 ml-auto flex shrink-0 items-center">
        {trailing ?? <span className="h-4 w-4 shrink-0" aria-hidden />}
      </span>
    </div>
  );
}

function ShareLinkButton({ label, href, external, animatedArrow, icon: Icon }: ShareLink) {
  const content = (
    <ShareTabContent label={label} icon={Icon} trailing={animatedArrow ? <ShareTabAnimatedArrow /> : undefined} />
  );

  if (
    external ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.includes("#")
  ) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={SHARE_TAB_CLASS}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={SHARE_TAB_CLASS}>
      {content}
    </Link>
  );
}

function ShareContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setError(false);
    try {
      await submitNetlifyForm(form);
      form.reset();
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <p className="border-t border-border/60 px-5 py-4 text-center text-sm text-muted-foreground" role="status">
        Thanks — we received your enquiry. If it is urgent, call {LOUNGE.phoneDisplay}.
      </p>
    );
  }

  return (
    <form
      name={NETLIFY_FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="space-y-2.5 border-t border-border/60 px-4 pb-4 pt-3"
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <p className="hidden" aria-hidden>
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={SHARE_FIELD_CLASS} />
      <input
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="Phone (optional)"
        className={SHARE_FIELD_CLASS}
      />
      <textarea
        name="message"
        rows={3}
        required
        placeholder="Your message…"
        className={cn(SHARE_FIELD_CLASS, "h-auto min-h-[5.5rem] resize-none rounded-2xl py-3")}
      />
      <button
        type="submit"
        disabled={sending}
        className={cn(SHARE_TAB_CLASS, "justify-center gap-2 bg-gold text-primary-foreground hover:bg-gold/90 hover:text-primary-foreground disabled:opacity-60")}
      >
        <span>{sending ? "Sending…" : "Send enquiry"}</span>
        <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
      </button>
      {error ? (
        <p className="text-center text-xs text-muted-foreground" role="status">
          Something went wrong. Call {LOUNGE.phoneDisplay} instead.
        </p>
      ) : null}
    </form>
  );
}

export const Route = createFileRoute("/share")({
  head: () => ({
    meta: [
      { title: SHARE_PAGE_META.title },
      { name: "description", content: SHARE_PAGE_META.description },
      { property: "og:site_name", content: LOUNGE.name },
      { property: "og:title", content: SHARE_PAGE_META.ogTitle },
      { property: "og:description", content: SHARE_PAGE_META.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SHARE_PAGE_META.ogUrl },
      { property: "og:image", content: SHARE_OG_IMAGE },
      { property: "og:image:alt", content: "Shisha at HOOKAHS, Birmingham" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SHARE_PAGE_META.ogTitle },
      { name: "twitter:description", content: SHARE_PAGE_META.description },
      { name: "twitter:image", content: SHARE_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SHARE_PAGE_META.ogUrl }],
  }),
  component: SharePage,
});

function SharePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-background font-sans antialiased">
      <main
        className={cn(
          "relative z-10 flex min-h-[100dvh] w-full flex-col",
          "md:mx-auto md:max-w-md md:px-6",
          "md:pb-[max(2rem,env(safe-area-inset-bottom))] md:pt-[max(1.5rem,env(safe-area-inset-top))]",
        )}
      >
        <div
          className={cn(
            "relative isolate flex min-h-[100dvh] w-full flex-1 flex-col overflow-hidden p-0 text-foreground",
            "md:min-h-0 md:rounded-3xl md:border md:border-border md:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)]",
          )}
        >
          <div className="pointer-events-none absolute inset-0 isolate" aria-hidden>
            <img src={galleryImages.natali} alt="" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-background/78 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background/90" />
          </div>

          <header className="relative z-10 flex flex-col items-center px-5 pt-[max(2.25rem,env(safe-area-inset-top))] text-center md:px-8 md:pt-8">
            <Link to="/" aria-label={LOUNGE.name} className="mx-auto flex flex-col items-center gap-3">
              <img src={loungeLogo} alt="" className="h-[4.5rem] w-auto max-w-[min(85vw,280px)] object-contain drop-shadow-[0_0_40px_rgba(240,190,40,0.2)]" />
            </Link>
            <p className="mt-4 max-w-[19rem] text-sm leading-relaxed text-muted-foreground">{LOUNGE.tagline}</p>
            <p className="mt-2 text-xs tracking-[0.12em] uppercase text-gold">{LOUNGE.hoursSummary}</p>
          </header>

          <nav
            className="relative z-10 mt-8 flex w-full flex-1 flex-col gap-2.5 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:mt-10 md:px-8 md:pb-8"
            aria-label="Quick links"
          >
            <ShareLinkButton label="Visit our website" href="/" icon={Globe} animatedArrow />
            <ShareLinkButton label="View the menu" href="/#menu" icon={UtensilsCrossed} />
            <ShareLinkButton label="See the gallery" href="/#gallery" icon={ImageIcon} />
            <ShareLinkButton label="Find us on the map" href={LOUNGE.directionsUrl} external icon={MapPin} />
            <ShareLinkButton label={`Call ${LOUNGE.phoneDisplay}`} href={LOUNGE.phoneHref} icon={Phone} />
            <ShareLinkButton label="Opening hours" href="/#visit" icon={Clock} />

            <div className="overflow-hidden rounded-full border border-gold/30 bg-background/92 shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <button
                type="button"
                aria-expanded={contactOpen}
                onClick={() => setContactOpen((open) => !open)}
                className={cn(SHARE_TAB_CLASS, "rounded-none border-0 shadow-none")}
              >
                <ShareTabContent
                  label="Send a message"
                  icon={Mail}
                  trailing={
                    <ChevronDown
                      className={cn(SHARE_ICON, "transition-transform", contactOpen && "rotate-180")}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  }
                />
              </button>
              {contactOpen ? <ShareContactForm /> : null}
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}
