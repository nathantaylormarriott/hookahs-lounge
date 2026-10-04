import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LOUNGE } from "@/lib/lounge";

export function Visit() {
  return (
    <section id="visit" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="eyebrow">Visit</span>
          <h2 className="section-title-shadow mt-4 text-3xl sm:text-5xl">
            Find us at 120 Lower Ford Street, Coventry
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="glass-panel shadow-soft h-full rounded-2xl p-7">
              <h3 className="section-title-shadow font-display text-sm tracking-[0.2em] uppercase text-gold">
                Opening hours
              </h3>
              <ul className="mt-6 space-y-3 text-sm">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                  (day) => (
                    <li key={day} className="flex justify-between border-b border-border/60 pb-3">
                      <span className="text-muted-foreground">{day}</span>
                      <span>12:00 midday – 2:00 am</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="shadow-soft relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Hookahs Lounge location map"
                src="https://www.google.com/maps?q=120+Lower+Ford+Street,+Coventry+CV1+5PW&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[420px] w-full grayscale-[35%]"
              />
              <a
                href={LOUNGE.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shadow absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/85 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-md transition-colors hover:border-gold hover:text-gold sm:bottom-4 sm:right-4 sm:text-sm"
              >
                Open in Google Maps
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80 sm:h-4 sm:w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
