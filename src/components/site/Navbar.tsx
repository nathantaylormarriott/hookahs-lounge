import { useState } from "react";
import { NavProgressiveBlur } from "@/components/site/NavProgressiveBlur";
import { OpenNowBadge } from "@/components/site/OpenNowBadge";
import { LOUNGE } from "@/lib/lounge";
import { loungeWordmark } from "@/lib/site-images";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
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
                  src={loungeWordmark}
                  alt="HOOKAHS"
                  width={900}
                  height={224}
                  className="h-6 w-auto shrink-0 object-contain object-left sm:h-7"
                />
              </a>
              <OpenNowBadge compact className="shrink-0" />
            </div>

            <div className="hidden items-center gap-6 lg:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[11px] tracking-[0.22em] text-foreground/65 uppercase transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={LOUNGE.phoneHref}
                className="whitespace-nowrap rounded-full border border-gold/50 bg-background/10 px-5 py-2 text-sm text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-primary-foreground"
              >
                {LOUNGE.phoneDisplay}
              </a>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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
            <div className="glass-panel mx-5 mb-3 flex flex-col gap-1 rounded-xl p-3 lg:hidden">
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
              <a href={LOUNGE.phoneHref} className="rounded-lg px-3 py-3 text-sm text-gold">
                {LOUNGE.phoneDisplay}
              </a>
            </div>
          )}
        </div>
      </header>
      <div className="pointer-events-none h-[4.5rem]" aria-hidden />
    </>
  );
}
