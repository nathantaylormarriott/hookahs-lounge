import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { FlavourMarquee } from "@/components/site/FlavourMarquee";
import { loungeLogo } from "@/lib/site-images";

export function Hero() {
  return (
    <section id="top" className="relative flex h-dvh flex-col overflow-hidden px-5">
      <p className="pointer-events-none absolute top-1/2 left-3 hidden origin-center -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.42em] text-foreground/35 uppercase xl:block">
        Birmingham · B12
      </p>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <Reveal>
          <p className="text-center text-[11px] tracking-[0.42em] text-gold uppercase sm:text-xs">Est 2005</p>
        </Reveal>
        <Reveal delay={80} className="mt-5 sm:mt-6">
          <TiltCard surface={false} intensity={6} className="mx-auto w-fit overflow-visible">
            <img
              src={loungeLogo}
              alt="HOOKAHS"
              width={1040}
              height={268}
              decoding="async"
              className="hero-logo-shadow mx-auto block h-auto w-[min(92vw,760px)] max-w-none object-contain"
            />
          </TiltCard>
        </Reveal>
        <Reveal delay={140} className="mt-5 sm:mt-6">
          <p className="text-center text-[11px] tracking-[0.34em] text-foreground/80 uppercase sm:text-xs sm:tracking-[0.42em]">
            Lounge <span className="mx-1.5 text-gold sm:mx-2">|</span> Drink <span className="mx-1.5 text-gold sm:mx-2">|</span> Dine
          </p>
        </Reveal>
        <Reveal delay={200} className="mt-8 sm:mt-9">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#menu"
              className="btn-shadow inline-flex items-center gap-3 rounded-full bg-gold py-2.5 pr-2.5 pl-5 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-transform hover:scale-[1.02]"
            >
              Our Menu
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/15">→</span>
            </a>
            <a
              href="#visit"
              className="inline-flex items-center gap-3 rounded-full border border-foreground/25 bg-background/30 py-2.5 pr-2.5 pl-5 text-xs font-semibold tracking-[0.16em] uppercase backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
            >
              Find us
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current/25">→</span>
            </a>
          </div>
        </Reveal>
      </div>
      <FlavourMarquee />
    </section>
  );
}
