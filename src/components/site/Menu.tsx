import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { menuSections, type MenuGroup } from "@/data/menu";
import { cn } from "@/lib/utils";

const brandMarks: Record<string, { src: string; width: number; height: number }> = {
  "Hookahs Savacco London mixes": { src: "/brand/logos/savacco-london.webp", width: 404, height: 341 },
  "Al Fakher": { src: "/brand/logos/al-fakher.webp", width: 587, height: 512 },
  "Savacco London": { src: "/brand/logos/savacco-london.webp", width: 404, height: 341 },
};

function PriceList({ groups, shishaGroups }: { groups: MenuGroup[]; shishaGroups?: boolean }) {
  return (
    <div
      className={cn(
        "grid items-start gap-x-16 lg:grid-cols-2",
        shishaGroups ? "gap-y-16 sm:gap-y-20" : "gap-y-14",
      )}
    >
      {groups.map((group) => (
        <div key={group.label} className={group.wide ? "lg:col-span-2" : undefined}>
          <div className="flex items-center gap-4">
            {shishaGroups && brandMarks[group.label] ? (
              <img
                src={brandMarks[group.label].src}
                alt=""
                width={brandMarks[group.label].width}
                height={brandMarks[group.label].height}
                className="h-14 w-auto shrink-0 sm:h-16"
              />
            ) : null}
            <p
              className={cn(
                shishaGroups
                  ? "section-title-shadow max-w-4xl text-[clamp(1.55rem,3.4vw,2.5rem)] leading-[0.92] font-medium tracking-[-0.04em]"
                  : "text-[11px] tracking-[0.28em] text-gold uppercase",
              )}
            >
              {group.label}
            </p>
          </div>
          {group.note ? (
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">{group.note}</p>
          ) : null}
          <ul className={cn(group.wide ? "sm:columns-2 sm:gap-x-12" : undefined, shishaGroups ? "mt-5" : "mt-2")}>
            {group.items.map((item) => (
              <li
                key={item.name}
                className="border-b border-foreground/10 py-3.5 break-inside-avoid"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[0.95rem]">{item.name}</span>
                  <span className="mb-[5px] min-w-6 flex-1 border-b border-dotted border-foreground/25" aria-hidden />
                  <span className="shrink-0 font-display text-sm tabular-nums text-gold-soft">{item.price}</span>
                </div>
                {item.note ? (
                  <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground">{item.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Menu() {
  return (
    <section id="menu" className="relative scroll-mt-28 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading label="Menu" title="What we serve" className="mx-auto text-center">
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Shisha, food and desserts, and hot and cold drinks.
            </p>
          </SectionHeading>
        </Reveal>

        <div className="mt-16 space-y-20 sm:space-y-24">
          {menuSections.map((section, index) => (
            <Reveal key={section.title} delay={index * 60}>
              <h3 className="section-title-shadow max-w-5xl text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[0.9] font-medium tracking-[-0.045em]">
                {section.title}
              </h3>
              <div className="mt-10">
                <PriceList groups={section.groups} shishaGroups={section.title === "Shisha"} />
              </div>
              {section.notes?.length ? (
                <ul className="mt-8 max-w-3xl space-y-2">
                  {section.notes.map((note) => (
                    <li key={note} className="text-xs leading-relaxed text-muted-foreground">
                      {note}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
