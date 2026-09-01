import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit — LUMÉA Chelsea, London" },
      {
        name: "description",
        content:
          "Find LUMÉA at 42 Marlowe Crescent, Chelsea, London. Call, WhatsApp or message our concierge team for bookings and enquiries.",
      },
      { property: "og:title", content: "Contact LUMÉA — Chelsea, London" },
      {
        property: "og:description",
        content: "Concierge enquiries, opening hours and directions to our Chelsea house.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DaySpa",
          name: CONTACT.name,
          telephone: CONTACT.phone,
          email: CONTACT.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "42 Marlowe Crescent",
            addressLocality: "London",
            postalCode: "SW3 4TQ",
            addressCountry: "GB",
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Message received", {
        description: "Our concierge will reply within one working day.",
      });
    }, 900);
  };

  return (
    <>
      <PageHero
        eyebrow="Visit"
        title="Come and see us."
        intro="A quiet townhouse on a Chelsea crescent, two minutes from Sloane Square."
        image={IMAGES.roomPool}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6">Concierge</p>
            <h2 className="text-4xl leading-[1.05] sm:text-5xl">Send us a note.</h2>
            <form onSubmit={onSubmit} className="mt-10 space-y-6">
              <Field id="name" label="Full name" />
              <Field id="email" label="Email" type="email" />
              <Field id="phone" label="Phone" type="tel" required={false} />
              <div>
                <label htmlFor="subject" className="eyebrow mb-3 block">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full rounded-2xl border border-input bg-transparent px-5 py-3.5 text-sm text-ivory focus:border-gold focus:outline-none"
                >
                  <option>Booking enquiry</option>
                  <option>Membership</option>
                  <option>Bridal & events</option>
                  <option>Gift vouchers</option>
                  <option>Something else</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="eyebrow mb-3 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-2xl border border-input bg-transparent px-5 py-3.5 text-sm text-ivory placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-[image:var(--gradient-gold)] py-4 text-[0.62rem] uppercase tracking-[0.3em] text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--shadow-gold)] disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>

          <div className="space-y-7">
            <Reveal>
              <div className="luxe-card p-8">
                <h3 className="text-2xl">Details</h3>
                <div className="hairline-gold my-6" />
                <ul className="space-y-5 text-sm text-muted-foreground">
                  <li className="flex gap-4">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {CONTACT.address}
                  </li>
                  <li className="flex gap-4">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-gold"
                    >
                      Message us on WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="luxe-card p-8">
                <h3 className="text-2xl">Opening hours</h3>
                <div className="hairline-gold my-6" />
                <dl className="space-y-4 text-sm">
                  {CONTACT.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-6">
                      <dt className="text-muted-foreground">{h.day}</dt>
                      <dd className="text-gold">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <motion.div className="overflow-hidden rounded-[2rem] border border-border">
                <iframe
                  title="Map to LUMÉA Chelsea"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1723%2C51.4890%2C-0.1543%2C51.4966&layer=mapnik"
                  className="h-[300px] w-full grayscale-[0.55] contrast-[1.05]"
                  loading="lazy"
                />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-3 block">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-input bg-transparent px-5 py-3.5 text-sm text-ivory focus:border-gold focus:outline-none"
      />
    </div>
  );
}
