import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { loungeFaqs } from "@/data/faq";

export function Faq() {
  return (
    <section id="faq" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title-shadow mt-4 text-3xl sm:text-5xl">Before you visit</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Practical answers about booking, parking, hours, and what to expect at the lounge.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="glass-panel shadow-soft mt-10 rounded-2xl px-5 sm:px-7">
            {loungeFaqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="border-border/60">
                <AccordionTrigger className="text-left text-sm font-semibold hover:text-gold sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
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
