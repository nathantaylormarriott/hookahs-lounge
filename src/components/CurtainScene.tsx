import { useLayoutEffect, useRef, type ReactNode } from "react";
import { SmokeyBackground } from "@/components/SmokeyBackground";

/**
 * The page scrolls up as a curtain. The footer stays fixed to the bottom on a
 * plain background, and the smoke is clipped away only in the strip that has
 * been uncovered.
 */
export function CurtainScene({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    const footerEl = footerRef.current;
    const smoke = smokeRef.current;
    if (!curtain || !footerEl || !smoke) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.visualViewport?.height ?? window.innerHeight;
      const footerHeight = footerEl.offsetHeight;
      const reveal = Math.min(footerHeight, viewport);
      curtain.style.marginBottom = `${reveal}px`;

      const bottom = curtain.getBoundingClientRect().bottom;
      const uncovered = Math.max(0, Math.min(reveal, viewport - bottom));
      smoke.style.clipPath = uncovered > 0.5 ? `inset(0px 0px ${Math.round(uncovered)}px 0px)` : "";
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();

    const observer = new ResizeObserver(schedule);
    observer.observe(footerEl);
    observer.observe(curtain);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
      curtain.style.marginBottom = "";
      smoke.style.clipPath = "";
    };
  }, []);

  return (
    <>
      <div ref={smokeRef} className="pointer-events-none fixed inset-0 z-[1]">
        <SmokeyBackground />
      </div>
      <div ref={curtainRef} className="relative z-10">
        {children}
      </div>
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        {footer}
      </div>
    </>
  );
}
