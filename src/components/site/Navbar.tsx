import { useState } from "react";
import { BackgroundToggle } from "@/components/BackgroundVariantContext";
import { NavProgressiveBlur } from "@/components/site/NavProgressiveBlur";
import { OpenNowBadge } from "@/components/site/OpenNowBadge";
import { loungeLogo } from "@/lib/site-images";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavProgressiveBlur />
      <header className="fixed inset-x-0 top-0 z-50 w-full">
        <div className="relative z-[1]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <a href="#top" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <img
                  src={loungeLogo}
                  alt=""
                  aria-hidden
                  className="h-9 w-9 shrink-0 object-contain object-top sm:h-10 sm:w-10"
                />
                <span className="font-display text-sm tracking-[0.2em] uppercase">
                  Hookahs <span className="text-gold">Lounge</span>
                </span>
              </a>
              <OpenNowBadge compact className="shrink-0" />
              <BackgroundToggle compact className="shrink-0" />
            </div>

            <div className="hidden items-center gap-8 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:07922466215"
                className="rounded-full border border-gold/50 bg-background/10 px-5 py-2 text-sm text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-primary-foreground"
              >
                07922 466215
              </a>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span className={`h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </button>
          </nav>

          {open && (
            <div className="glass-panel mx-5 mb-3 flex flex-col gap-1 rounded-xl p-3 md:hidden">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
              <a href="tel:07922466215" className="rounded-lg px-3 py-3 text-sm text-gold">
                07922 466215
              </a>
            </div>
          )}
        </div>
      </header>
      <div className="pointer-events-none h-[4.5rem]" aria-hidden />
    </>
  );
}
