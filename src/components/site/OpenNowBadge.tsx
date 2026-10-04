import { useEffect, useState } from "react";
import { getLoungeOpenStatus, type OpenStatus } from "@/lib/opening-hours";
import { cn } from "@/lib/utils";

type OpenNowBadgeProps = {
  className?: string;
  compact?: boolean;
};

export function OpenNowBadge({ className, compact = false }: OpenNowBadgeProps) {
  const [status, setStatus] = useState<OpenStatus>(() => getLoungeOpenStatus());

  useEffect(() => {
    const tick = () => setStatus(getLoungeOpenStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={cn("inline-flex", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide uppercase",
          compact ? "px-2 py-0.5 text-[10px] sm:px-2.5 sm:py-1 sm:text-[11px]" : "gap-2 px-3 py-1 text-xs",
          status.isOpen
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            : "border-border bg-secondary/40 text-muted-foreground",
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            status.isOpen ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-muted-foreground/60",
          )}
          aria-hidden
        />
        {status.label}
      </span>
    </div>
  );
}
