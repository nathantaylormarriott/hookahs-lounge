import { LOUNGE, OPENING_HOURS } from "@/lib/lounge";
import { loungeWordmark } from "@/lib/site-images";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="flex max-h-[100dvh] flex-col bg-background text-foreground">
      <div className="mx-auto min-h-0 w-full max-w-6xl flex-1 overflow-y-auto px-5 pt-16 pb-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[10px] tracking-[0.28em] text-gold uppercase">Visit</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              {LOUNGE.streetAddress}
              <br />
              {LOUNGE.addressNeighborhood}
              <br />
              {LOUNGE.addressLocality} {LOUNGE.postalCode}
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.28em] text-gold uppercase">Call</p>
            <a
              href={LOUNGE.phoneHref}
              className="mt-4 inline-block font-display text-2xl tracking-[-0.04em] transition-colors hover:text-gold"
            >
              {LOUNGE.phoneDisplay}
            </a>
            <div className="mt-4 flex gap-5 text-sm text-muted-foreground">
              <a href={LOUNGE.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Instagram
              </a>
              <a href={LOUNGE.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                TikTok
              </a>
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.28em] text-gold uppercase">Hours</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li>Sun–Thu · {OPENING_HOURS[0].label}</li>
              <li>Fri & Sat · {OPENING_HOURS[4].label}</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.28em] text-gold uppercase">Index</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-foreground/80">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-foreground/10 pt-5 text-[11px] tracking-[0.18em] text-muted-foreground uppercase sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} HOOKAHS</p>
          <p>Over 18s only</p>
        </div>
      </div>

      <a href="#top" className="block w-full shrink-0 pb-[env(safe-area-inset-bottom)]">
        <img
          src={loungeWordmark}
          alt="HOOKAHS"
          width={900}
          height={224}
          className="block h-auto w-full"
        />
      </a>
    </footer>
  );
}
