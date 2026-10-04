import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LOUNGE, OPENING_HOURS } from "@/lib/lounge";

export function Visit() {
  return (
    <section id="visit" className="relative scroll-mt-28 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading label="Visit" title="Moseley Road.">
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{LOUNGE.addressLine}</p>
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <Reveal>
            <ul>
              {OPENING_HOURS.map((slot) => (
                <li
                  key={slot.day}
                  className="flex items-baseline gap-3 border-b border-foreground/10 py-3.5"
                >
                  <span className="text-[0.95rem] text-foreground/85">{slot.day}</span>
                  <span className="mb-[5px] min-w-6 flex-1 border-b border-dotted border-foreground/25" aria-hidden />
                  <span className="shrink-0 font-display text-sm text-gold-soft tabular-nums">{slot.label}</span>
                </li>
              ))}
            </ul>
            <a
              href={LOUNGE.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] text-foreground uppercase transition-colors hover:text-gold"
            >
              Directions
              <span aria-hidden>→</span>
            </a>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.25rem]">
              <iframe
                title="HOOKAHS location map"
                src={LOUNGE.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[420px] w-full grayscale-[40%] contrast-125"
              />
              <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-background/80 px-4 py-2 text-[11px] tracking-[0.18em] text-foreground uppercase backdrop-blur-md">
                {LOUNGE.postalCode}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
