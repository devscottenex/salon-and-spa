import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { PageHero, LuxeLink } from "@/components/site/Primitives";
import { Reveal, RevealText, MaskImage } from "@/components/site/Reveal";
import { IMAGES, stats, specialists } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LUMÉA — Beauty Is a Ritual" },
      {
        name: "description",
        content:
          "The story, philosophy, experts and products behind LUMÉA, a luxury salon and spa in Chelsea, London.",
      },
      { property: "og:title", content: "About LUMÉA — Beauty Is a Ritual" },
      {
        property: "og:description",
        content: "Ten years, twenty-five thousand guests, one unhurried idea of beauty.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our House"
        title="Beauty Is a Ritual."
        intro="Not a transaction, not a quick fix — a practice you return to, in a room built for it."
        image={IMAGES.intro}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Our Philosophy</p>
            <h2 className="text-4xl leading-[1.05] sm:text-5xl">
              <RevealText text="Slow is the luxury." />
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <Reveal>
              <p>
                Everything at Luméa is designed to remove urgency. Rooms are sound-isolated. Lighting
                is warm and dimmable by the guest. Therapists are never double-booked, so a treatment
                that needs another ten minutes gets them.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p>
                We formulate our own oils, balms and masks in a small London studio, using short
                ingredient lists we are willing to print in full. What we use on you is what we sell
                in the boutique — there is no professional-only mystique here.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Our Story</p>
            <h2 className="text-4xl leading-[1.05] sm:text-5xl">From one room in Chelsea.</h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Luméa opened in 2016 with a single treatment room, two therapists and a waiting list
                built entirely by word of mouth. The rule then is the rule now: no treatment leaves
                the room until it is finished properly.
              </p>
              <p>
                Ten years later the house occupies three floors — a hair studio, four facial cabins,
                six massage suites, a thermal pool and a member's lounge — and the diary still runs
                on the same principle.
              </p>
            </div>
            <div className="mt-10">
              <LuxeLink to="/experience" variant="outline">
                Tour the space
              </LuxeLink>
            </div>
          </div>
          <MaskImage
            src={IMAGES.roomLounge}
            alt="The LUMÉA VIP lounge"
            className="aspect-[5/4] rounded-[2.5rem]"
          />
        </div>
      </section>

      <section className="border-y border-border bg-charcoal/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow mb-6">Our Experts</p>
          <h2 className="max-w-xl text-4xl leading-[1.05] sm:text-5xl">
            Fifteen practitioners. One standard.
          </h2>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {specialists
              .filter((s) => s.id !== "any")
              .map((s, i) => (
                <Reveal key={s.id} delay={i}>
                  <div className="luxe-card luxe-card-hover h-full p-8">
                    <p className="font-[family-name:var(--font-display)] text-5xl text-gold/35">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 text-2xl">{s.name}</h3>
                    <p className="mt-2 text-[0.6rem] uppercase tracking-[0.26em] text-gold">
                      {s.role}
                    </p>
                    <p className="mt-5 text-sm text-muted-foreground">
                      {s.years} years in practice
                    </p>
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <MaskImage
            src={IMAGES.gal2}
            alt="The LUMÉA apothecary shelves"
            className="aspect-[4/3] rounded-[2.5rem]"
          />
          <div>
            <p className="eyebrow mb-6">Our Products</p>
            <h2 className="text-4xl leading-[1.05] sm:text-5xl">Short lists, honest labels.</h2>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every formula is made in batches of under three hundred, dated on the base, and
              blended without synthetic fragrance. If an ingredient is not doing work, it is not in
              the bottle.
            </p>
            <div className="mt-10">
              <LuxeLink to="/shop">Visit the boutique</LuxeLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="border-y border-border bg-charcoal/30 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-[family-name:var(--font-display)] text-6xl text-gold">
              <Counter to={s.value} run={inView} />
              {s.suffix}
            </p>
            <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Counter({ to, run }: { to: number; run: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return <>{value}</>;
}
