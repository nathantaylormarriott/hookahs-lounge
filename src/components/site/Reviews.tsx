import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

const reviews = [
  "Brilliant prices, great atmosphere, lovely staff. Couldn't help but recommend this place.",
  "Very lovely staffs, perfect shisha flavors. I recommend it.",
  "A good place to chill out, the shisha is probably the best in Coventry which is served alongside good service.",
  "Best sheesha in town cheap and atmosphere is perfect and the staff are wonderful.",
  "Great place to chill. The guy theo who works there is brill.",
  "Best shisha in Coventry in my opinion. Friendly and welcoming place.",
  "My lovely place which I everyday take rest and smoke shisha... spicy and cheap love it.",
  "£10 shisha. £1 drinks. Can't go wrong.",
  "The quality of the hookah is the best.",
  "The best Shisha ever.",
];

function Stars({ className }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 text-gold ${className ?? ""}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.51.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
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
    }, 5600);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section id="reviews" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <span className="eyebrow">Reviews</span>
          <h2 className="section-title-shadow mt-4 text-3xl sm:text-5xl">Guest reviews</h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-foreground">
            Five-star ratings from guests who visit our shisha lounge in Coventry.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div
            className="glass-panel shadow-soft relative overflow-hidden rounded-2xl border border-border/80"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
              aria-hidden
            />

            <div className="flex flex-col gap-6 border-b border-border/50 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-7">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-secondary/50">
                  <GoogleMark />
                </div>
                <div className="text-left">
                  <p className="font-display text-sm tracking-wide text-foreground">Google Reviews</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Stars />
                    <span className="text-sm font-semibold text-gold">5.0</span>
                    <span className="text-xs text-muted-foreground">· Excellent</span>
                  </div>
                </div>
              </div>
              <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground sm:text-right">
                Review {index + 1} of {reviews.length}
              </p>
            </div>

            <div className="relative px-6 pb-8 pt-2 sm:px-12 sm:pb-10 sm:pt-4">
              <Quote
                className="pointer-events-none absolute left-5 top-0 h-10 w-10 text-gold/15 sm:left-9 sm:h-12 sm:w-12"
                aria-hidden
              />
              <div className="relative min-h-[6.5rem] sm:min-h-[5.5rem]">
                <blockquote
                  key={index}
                  className="review-quote px-2 text-center font-display text-lg leading-relaxed text-foreground sm:text-xl sm:leading-relaxed"
                >
                  {reviews[index]}
                </blockquote>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border/50 px-4 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="btn-shadow inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground transition-colors hover:border-gold hover:text-gold"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex max-w-[min(100%,14rem)] flex-1 flex-wrap items-center justify-center gap-1.5" role="tablist" aria-label="Reviews">
                {reviews.map((quote, i) => (
                  <button
                    key={quote}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Review ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-6 bg-gold" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index + 1)}
                className="btn-shadow inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground transition-colors hover:border-gold hover:text-gold"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
