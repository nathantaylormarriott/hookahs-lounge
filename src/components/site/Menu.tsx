import { Reveal } from "@/components/Reveal";
import { drinksSections, shishaSection, type MenuGroup } from "@/data/menu";

function MenuGroups({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.label || "items"}>
          {group.label ? (
            <p className="mb-4 border-b border-border/60 pb-2 text-xs tracking-[0.14em] uppercase text-muted-foreground">
              {group.label}
            </p>
          ) : null}
          <ul className="space-y-3">
            {group.items.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-3">
                <p className="text-[0.95rem] font-semibold">
                  <span className="mr-2" aria-hidden>
                    {item.emoji}
                  </span>
                  {item.name}
                </p>
                <span className="shrink-0 font-display text-sm text-gold-soft">{item.price}</span>
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
    <section id="menu" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="eyebrow">Menu</span>
          <h2 className="section-title-shadow mt-4 text-3xl sm:text-5xl">Our Menu</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 md:items-start">
          <Reveal>
            <div className="glass-panel shadow-soft h-full rounded-2xl p-7">
              <h3 className="section-title-shadow font-display text-lg tracking-[0.16em] uppercase text-gold">
                {shishaSection.title}
                <span className="ml-2" aria-hidden>
                  {shishaSection.emoji}
                </span>
              </h3>
              <div className="mt-7">
                <MenuGroups groups={shishaSection.groups} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="glass-panel shadow-soft h-full rounded-2xl p-7">
              <div className="space-y-10">
                {drinksSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="section-title-shadow font-display text-lg tracking-[0.16em] uppercase text-gold">
                      {section.title}
                      <span className="ml-2" aria-hidden>
                        {section.emoji}
                      </span>
                    </h3>
                    <div className="mt-7">
                      <MenuGroups groups={section.groups} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
