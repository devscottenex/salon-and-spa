import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { memberships, IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Join LUMÉA" },
      {
        name: "description",
        content:
          "Three membership tiers at LUMÉA: Essential, Signature and Elite. Priority booking, service discounts, complimentary treatments and VIP lounge access.",
      },
      { property: "og:title", content: "LUMÉA Membership — Your Ritual, Elevated" },
      {
        property: "og:description",
        content: "Priority booking, up to 20% off treatments and complimentary monthly rituals.",
      },
    ],
  }),
  component: MembershipPage,
});

const comparison = [
  { feature: "Priority booking window", tiers: [true, true, true] },
  { feature: "Service discount", tiers: ["10%", "15%", "20%"] },
  { feature: "Complimentary welcome ritual", tiers: [true, true, true] },
  { feature: "Monthly complimentary add-on", tiers: [false, true, true] },
  { feature: "Complimentary monthly treatment", tiers: [false, false, true] },
  { feature: "Exclusive member events", tiers: [false, true, true] },
  { feature: "Personal beauty consultant", tiers: [false, false, true] },
  { feature: "VIP lounge access", tiers: [false, false, true] },
  { feature: "Guest passes", tiers: [false, "2 / year", "Unlimited"] },
];

function MembershipPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Your Ritual. Elevated."
        intro="Belonging to Luméa means the diary opens for you first, and the house remembers how you like it."
        image={IMAGES.roomLounge}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-border p-1">
            {[
              { label: "Monthly", value: false },
              { label: "Annual · save 2 months", value: true },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setAnnual(o.value)}
                aria-pressed={annual === o.value}
                className={`rounded-full px-6 py-2.5 text-[0.6rem] uppercase tracking-[0.24em] transition-all duration-500 ${
                  annual === o.value ? "bg-gold/15 text-gold" : "text-muted-foreground"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {memberships.map((m, i) => (
            <Reveal key={m.name} delay={i}>
              <div
                className={`luxe-card luxe-card-hover flex h-full flex-col p-9 ${
                  m.featured ? "border-gold/45 lg:-translate-y-4" : ""
                }`}
              >
                <h2 className="text-3xl uppercase tracking-[0.1em]">{m.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{m.tagline}</p>
                <motion.p
                  key={annual ? "a" : "m"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 font-[family-name:var(--font-display)] text-6xl text-gold"
                >
                  £{annual ? m.annual : m.monthly}
                  <span className="ml-2 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    / {annual ? "year" : "month"}
                  </span>
                </motion.p>
                <div className="hairline-gold my-8" />
                <ul className="flex-1 space-y-3.5">
                  {m.full.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  data-cursor="book"
                  className={`mt-9 rounded-full py-3.5 text-center text-[0.62rem] uppercase tracking-[0.28em] transition-all duration-500 ${
                    m.featured
                      ? "bg-[image:var(--gradient-gold)] text-primary-foreground hover:shadow-[var(--shadow-gold)]"
                      : "border border-gold/40 text-ivory hover:bg-gold/12 hover:text-gold"
                  }`}
                >
                  Join Luméa
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-charcoal/30 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p className="eyebrow mb-6">Compare</p>
          <h2 className="text-4xl leading-[1.05] sm:text-5xl">Every benefit, side by side.</h2>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">Membership tier comparison</caption>
              <thead>
                <tr>
                  <th className="pb-5 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">
                    Benefit
                  </th>
                  {memberships.map((m) => (
                    <th
                      key={m.name}
                      scope="col"
                      className="pb-5 text-center text-[0.6rem] uppercase tracking-[0.26em] text-gold"
                    >
                      {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="border-t border-border"
                  >
                    <th scope="row" className="py-4 pr-6 text-sm font-normal text-ivory">
                      {row.feature}
                    </th>
                    {row.tiers.map((t, j) => (
                      <td key={j} className="py-4 text-center text-sm text-muted-foreground">
                        {t === true ? (
                          <Check className="mx-auto h-4 w-4 text-gold" />
                        ) : t === false ? (
                          <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                        ) : (
                          <span className="text-gold">{t}</span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
