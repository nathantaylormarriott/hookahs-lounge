import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

const reviews = [
  "Nice shisha flavours, good food, friendly staff, good atmosphere.",
  "Great service, great smoke flavour and great drinks on offer.",
  "A great selection of shisha flavours, with food and drinks to go with them.",
  "Friendly, attentive staff who make you feel welcome and looked after.",
  "Comfortable atmosphere, with big screens for watching football.",
];

function Stars() {
  return (
    <div className="mt-4 flex gap-1 text-gold" aria-label="4.6 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = i < 4 ? 1 : 0.6;
        return (
          <span key={i} className="relative block h-3.5 w-3.5" aria-hidden>
            <svg viewBox="0 0 20 20" className="absolute inset-0 h-3.5 w-3.5 fill-current opacity-25">
              <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.51.94-5.5-4-3.9 5.53-.8L10 1.5z" />
            </svg>
            <svg
              viewBox="0 0 20 20"
              className="absolute inset-0 h-3.5 w-3.5 fill-current"
              style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
            >
              <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.51.94-5.5-4-3.9 5.53-.8L10 1.5z" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, 6400);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="reviews"
      className="relative scroll-mt-28 px-5 py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading label="Reviews" title="What guests say.">
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              4.6 from 565 Google reviews of the shisha bar in Balsall Heath.
            </p>
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid items-end gap-10 md:grid-cols-[0.34fr_1fr] md:gap-14">
          <Reveal>
            <p className="font-display text-[clamp(5rem,12vw,8.5rem)] leading-none tracking-[-0.07em] text-foreground">
              4.6
            </p>
            <Stars />
            <p className="mt-3 text-[11px] tracking-[0.24em] text-muted-foreground uppercase">Google · 565 reviews</p>
          </Reveal>

          <Reveal delay={80}>
            <blockquote
              key={index}
              className="review-quote font-display text-[clamp(1.7rem,3.6vw,3.15rem)] leading-[1.08] font-medium tracking-[-0.04em]"
            >
              {reviews[index]}
            </blockquote>
            <div className="mt-10 flex items-center justify-between border-t border-foreground/12 pt-5">
              <p className="text-[11px] tracking-[0.24em] text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-2 text-foreground/30">/</span>
                {String(reviews.length).padStart(2, "0")}
              </p>
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  className="text-[11px] tracking-[0.24em] text-foreground/70 uppercase transition-colors hover:text-gold"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  className="text-[11px] tracking-[0.24em] text-foreground/70 uppercase transition-colors hover:text-gold"
                >
                  Next
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
