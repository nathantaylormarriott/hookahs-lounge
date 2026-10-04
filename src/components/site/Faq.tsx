import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { loungeFaqs } from "@/data/faq";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-28 px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <SectionHeading label="FAQ" title="Before you come." />
        </Reveal>

        <Reveal delay={80}>
          <Accordion type="single" collapsible>
            {loungeFaqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="border-foreground/10">
                <AccordionTrigger className="py-5 text-left text-base font-medium tracking-[-0.02em] hover:text-gold hover:no-underline sm:text-lg">
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-[11px] tracking-[0.2em] text-gold tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-8 pb-5 pl-9 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
