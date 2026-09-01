import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Clock, Check } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { services, serviceCategories, IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Massage, Facials, Hair & Beauty | LUMÉA" },
      {
        name: "description",
        content:
          "Explore LUMÉA's full treatment menu: massage, facials, hair, beauty and body rituals with durations, pricing and benefits.",
      },
      { property: "og:title", content: "Services at LUMÉA Luxury Salon & Spa" },
      {
        property: "og:description",
        content: "Massage, facials, hair, beauty and body rituals — pricing and durations.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [category, setCategory] = useState<(typeof serviceCategories)[number]>("All");
  const list = category === "All" ? services : services.filter((s) => s.category === category);

  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title="Treatments for the body, the face and the hour."
        intro="Twenty-two rituals across five disciplines. Every one begins with a consultation and ends without a rush."
        image={IMAGES.roomHair}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <nav aria-label="Service categories" className="flex flex-wrap gap-3">
          {serviceCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-6 py-2.5 text-[0.6rem] uppercase tracking-[0.26em] transition-all duration-500 ${
                category === c
                  ? "border-gold bg-gold/12 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-ivory"
              }`}
            >
              {c}
            </button>
          ))}
        </nav>

        <motion.div layout className="mt-14 grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((s) => (
              <motion.article
                key={s.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="luxe-card luxe-card-hover group grid grid-cols-1 overflow-hidden sm:grid-cols-[40%_1fr]"
              >
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-108"
                  />
                </div>
                <div className="flex flex-col p-7">
                  <p className="text-[0.55rem] uppercase tracking-[0.3em] text-gold">
                    {s.category}
                  </p>
                  <h2 className="mt-2.5 text-2xl">{s.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <ul className="mt-5 space-y-1.5">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-gold" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                    <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {s.duration}
                    </span>
                    <span className="text-lg text-gold">from £{s.price}</span>
                  </div>
                  <Link
                    to="/book"
                    search={{ service: s.slug }}
                    data-cursor="book"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 py-3 text-[0.6rem] uppercase tracking-[0.28em] text-ivory transition-colors duration-500 hover:bg-gold/12 hover:text-gold"
                  >
                    Book this ritual
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="border-t border-border bg-charcoal/30 py-24 text-center">
        <SectionHeading
          align="center"
          eyebrow="Not sure where to begin?"
          title="Let the concierge choose for you."
          intro="Tell us how you want to feel afterwards and we will build the afternoon around it."
          className="px-6"
        />
        <Link
          to="/contact"
          className="mt-10 inline-flex rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.3em] text-primary-foreground"
          data-cursor="explore"
        >
          Speak to the concierge
        </Link>
      </section>
    </>
  );
}
