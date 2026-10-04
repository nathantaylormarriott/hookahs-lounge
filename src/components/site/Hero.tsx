import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { loungeLogo } from "@/lib/site-images";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[calc(100dvh-4.5rem)] px-5">
      <div className="absolute left-1/2 top-1/2 flex w-full max-w-xl -translate-x-1/2 -translate-y-[54%] flex-col items-center text-center">
        <Reveal>
          <TiltCard surface={false} intensity={8} className="mx-auto w-fit overflow-visible">
            <img
              src={loungeLogo}
              alt="Hookahs Lounge"
              width={2048}
              height={1865}
              decoding="async"
              className="hero-logo-shadow mx-auto block h-auto w-[min(78vw,430px)] max-w-none object-contain"
            />
          </TiltCard>
        </Reveal>

        <Reveal delay={120} className="mt-4 sm:mt-5">
          <p className="max-w-[100vw] overflow-x-auto px-1 text-xs tracking-[0.14em] whitespace-nowrap uppercase text-muted-foreground sm:text-sm sm:tracking-[0.16em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span>120 Lower Ford Street</span>
            <span className="mx-2 text-gold sm:mx-3">•</span>
            <span>Coventry CV1 5PW</span>
            <span className="mx-2 text-gold sm:mx-3">•</span>
            <span>12:00 midday – 2:00 am daily</span>
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-7 sm:mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#menu"
              className="btn-shadow rounded-full bg-gold px-5 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:px-6 sm:py-2.5"
            >
              Our Menu
            </a>
            <a
              href="#visit"
              className="btn-shadow rounded-full border border-border bg-background/40 px-5 py-2 text-xs backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:px-6 sm:py-2.5"
            >
              Find us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
