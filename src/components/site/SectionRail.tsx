import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "visit", label: "Visit" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
];

export function SectionRail() {
  const [active, setActive] = useState("menu");

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="pointer-events-none fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 min-[1440px]:block"
      aria-label="On this page"
    >
      <ol className="pointer-events-auto flex flex-col gap-3.5">
        {sections.map((section, index) => {
          const current = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "group flex items-center justify-end gap-3 text-[10px] tracking-[0.22em] uppercase transition-colors",
                  current ? "text-gold" : "text-foreground/45 hover:text-foreground",
                )}
              >
                <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-24 group-hover:opacity-100">
                  {section.label}
                </span>
                <span
                  className={cn(
                    "h-px bg-current transition-all duration-300",
                    current ? "w-8" : "w-3 group-hover:w-6",
                  )}
                  aria-hidden
                />
                <span className="w-5 text-right tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
