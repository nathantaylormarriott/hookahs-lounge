import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { SmokeyBackground } from "@/components/SmokeyBackground";
import { LightswindSmokeyBackground } from "@/components/lightswind/SmokeyBackground";
import { cn } from "@/lib/utils";

export type BackgroundVariant = "a" | "b";

const STORAGE_KEY = "hookahs-lounge-bg-variant";

type BackgroundVariantContextValue = {
  variant: BackgroundVariant;
  setVariant: (next: BackgroundVariant) => void;
};

const BackgroundVariantContext = createContext<BackgroundVariantContextValue | null>(null);

function readVariant(): BackgroundVariant {
  if (typeof window === "undefined") return "a";
  return localStorage.getItem(STORAGE_KEY) === "b" ? "b" : "a";
}

export function BackgroundVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<BackgroundVariant>("a");

  useEffect(() => {
    setVariantState(readVariant());
  }, []);

  const setVariant = (next: BackgroundVariant) => {
    setVariantState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <BackgroundVariantContext.Provider value={{ variant, setVariant }}>
      {variant === "a" ? <SmokeyBackground /> : <LightswindSmokeyBackground backdropBlurAmount="md" />}
      {children}
    </BackgroundVariantContext.Provider>
  );
}

export function useBackgroundVariant() {
  const ctx = useContext(BackgroundVariantContext);
  if (!ctx) {
    throw new Error("useBackgroundVariant must be used within BackgroundVariantProvider");
  }
  return ctx;
}

export function BackgroundToggle({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { variant, setVariant } = useBackgroundVariant();

  return (
    <div
      className={cn(
        "inline-flex rounded-full border border-gold/35 bg-background/80 p-0.5 backdrop-blur-md",
        compact ? "shadow-none" : "shadow-lg",
        className,
      )}
      role="group"
      aria-label="Background style"
    >
      {(
        [
          { id: "a" as const, label: "A" },
          { id: "b" as const, label: "B" },
        ] as const
      ).map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => setVariant(id)}
          aria-pressed={variant === id}
          className={cn(
            "rounded-full font-semibold tracking-wide transition-colors",
            compact ? "min-w-[1.65rem] px-2 py-1 text-[10px]" : "min-w-[2.25rem] px-3 py-1.5 text-xs",
            variant === id
              ? "bg-gold text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
