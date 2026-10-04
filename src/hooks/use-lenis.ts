import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    let destroy: (() => void) | undefined;
    let raf = 0;

    void (async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({
        duration: 1.35,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const onAnchorClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
        if (!anchor) return;
        const id = anchor.getAttribute("href")!.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      };
      document.addEventListener("click", onAnchorClick);

      destroy = () => {
        document.removeEventListener("click", onAnchorClick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelAnimationFrame(raf);
      destroy?.();
    };
  }, []);
}
