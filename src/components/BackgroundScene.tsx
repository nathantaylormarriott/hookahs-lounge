import type { ReactNode } from "react";
import { SmokeyBackground } from "@/components/SmokeyBackground";

export function BackgroundScene({ children }: { children: ReactNode }) {
  return (
    <>
      <SmokeyBackground />
      {children}
    </>
  );
}
