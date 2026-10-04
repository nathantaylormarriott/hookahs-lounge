import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { LOUNGE } from "@/lib/lounge";
import { NETLIFY_FORM_NAME, submitNetlifyForm } from "@/lib/netlify-form";

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
    <section id="contact" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title-shadow mt-4 text-3xl sm:text-5xl">Book a table or ask us anything</h2>
        </Reveal>

        <Reveal delay={140}>
          <div className="glass-panel shadow-soft mt-12 rounded-2xl p-7 sm:p-9">
            <form
              name={NETLIFY_FORM_NAME}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
              <p className="hidden" aria-hidden>
                <label>
                  Leave this empty
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
                <Field label="Date & time" name="when" placeholder="Fri 9pm" />
                <Field label="Guests" name="guests" type="number" placeholder="4" />
              </div>

              <label className="mt-5 block">
                <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-lg border border-input bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
                />
              </label>

              <button
                type="submit"
                disabled={sending}
                className="btn-shadow mt-7 w-full rounded-full bg-gold py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto sm:px-10"
              >
                {sending ? "Sending…" : "Send enquiry"}
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                In a hurry? Call{" "}
                <a href={LOUNGE.phoneHref} className="text-gold">
                  {LOUNGE.phoneDisplay}
                </a>
                .
              </p>
            </form>
          </div>
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
      <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-input bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}
