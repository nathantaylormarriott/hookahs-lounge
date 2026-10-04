import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LOUNGE } from "@/lib/lounge";
import { NETLIFY_FORM_NAME, submitNetlifyForm } from "@/lib/netlify-form";

const fieldClass =
  "mt-2 w-full border-0 border-b border-foreground/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);

    try {
      await submitNetlifyForm(form);
      toast.success("Thanks — we received your enquiry and will get back to you soon.");
      form.reset();
    } catch {
      toast.error("Something went wrong sending your message. Please call us instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-28 px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <SectionHeading label="Contact" title="Hold a table.">
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Walk-ins are welcome when there is space. For a group, send a time and we will do our best.
            </p>
            <a
              href={LOUNGE.phoneHref}
              className="mt-8 inline-block font-display text-4xl tracking-[-0.045em] text-foreground transition-colors hover:text-gold sm:text-5xl"
            >
              {LOUNGE.phoneDisplay}
            </a>
            <p className="mt-4 text-sm text-muted-foreground">{LOUNGE.addressLine}</p>
          </SectionHeading>
        </Reveal>

        <Reveal delay={120}>
          <form
            name={NETLIFY_FORM_NAME}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            className="lg:pt-16"
          >
            <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
            <p className="hidden" aria-hidden>
              <label>
                Leave this empty
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="grid gap-x-8 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Date & time" name="when" placeholder="Fri 9pm" />
              <Field label="Guests" name="guests" type="number" placeholder="4" />
            </div>

            <label className="mt-2 block sm:col-span-2">
              <span className="text-[11px] tracking-[0.24em] text-muted-foreground uppercase">Message</span>
              <textarea name="message" rows={3} className={`${fieldClass} resize-none`} />
            </label>

            <button
              type="submit"
              disabled={sending}
              className="btn-shadow mt-8 inline-flex items-center gap-3 rounded-full bg-gold py-3 pr-3 pl-6 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {sending ? "Sending" : "Send enquiry"}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/15">→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.24em] text-muted-foreground uppercase">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClass}
      />
    </label>
  );
}
