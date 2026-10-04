import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (default 4). */
  intensity?: number;
  /** Drop shadow on the card (default true). */
  surface?: boolean;
}

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value));
}

export function TiltCard({
  children,
  className,
  intensity = 4,
  surface = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyTilt = (clientX: number, clientY: number) => {
      if (reduced.matches) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (clientX - cx) / (window.innerWidth * 0.45);
      const y = (clientY - cy) / (window.innerHeight * 0.45);
      const rotateX = clamp(-y * intensity, intensity);
      const rotateY = clamp(x * intensity, intensity);
      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
    };

    const reset = () => {
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    };

    const onMove = (e: MouseEvent) => applyTilt(e.clientX, e.clientY);
    const onLeave = () => reset();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={cn(
        "tilt-card relative",
        surface && "overflow-hidden",
        surface && "rounded-2xl shadow-soft",
        className,
      )}
    >
      <div className="relative h-full">{children}</div>
    </div>
  );
}
