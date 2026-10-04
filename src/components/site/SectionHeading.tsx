import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-5xl", className)}>
      <span className="eyebrow">{label}</span>
      <h2 className="section-title-shadow mt-4 text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[0.9] font-medium tracking-[-0.045em]">
        {title}
      </h2>
      {children}
    </div>
  );
}
