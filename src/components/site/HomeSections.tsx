import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Star, Instagram, Plus } from "lucide-react";
import { Reveal, RevealText, MaskImage } from "./Reveal";
import { LuxeLink, SectionHeading, GoldRule } from "./Primitives";
import { Particles } from "./Transition";
import {
  IMAGES,
  VIDEOS,
  homeServices,
  experienceStages,
  memberships,
  testimonials,
  gallery,
  products,
} from "@/lib/site-data";
import { useCart } from "@/lib/cart";

const BottleScene = lazy(() => import("./BottleScene"));

/* ---------------------------------------------------------------- HERO */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section
      ref={ref}
      onPointerMove={(e) =>
        setTilt({
          x: (e.clientX / window.innerWidth - 0.5) * 14,
          y: (e.clientY / window.innerHeight - 0.5) * 10,
        })
      }
      className="relative z-0 flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <motion.video
          src={VIDEOS.salonSpaTour}
          poster={IMAGES.massage}
          autoPlay
          muted
          loop
          playsInline
          alt="Candlelit luxury treatment suite at LUMÉA"
          className="h-[112%] w-full object-cover"
          width={1920}
          height={1200}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: tilt.x, translateY: tilt.y }}
        />
        <div className="absolute inset-0 bg-ink/62" />
        <div className="veil absolute inset-0" />
      </motion.div>

      <Particles count={16} />

      <motion.div style={{ opacity: fade }} className="relative px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="eyebrow"
        >
          Chelsea, London
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(8px)" }}
          animate={{ opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-[family-name:var(--font-display)] text-6xl leading-none sm:text-8xl lg:text-[9rem]"
        >
          LUMÉA
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="hairline-gold mx-auto my-8 w-56 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1.1 }}
          className="font-[family-name:var(--font-display)] text-2xl italic text-ivory/90 sm:text-4xl"
        >
          Indulge in Timeless Luxury.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.1 }}
          className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Where beauty, wellness and tranquility come together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.1 }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <LuxeLink to="/services" variant="outline">
            Explore Services
          </LuxeLink>
          <LuxeLink to="/book" cursor="book">
            Book Your Experience
          </LuxeLink>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center sm:bottom-10"
      >
        <p className="text-[0.55rem] uppercase tracking-[0.4em] text-ivory/50">
          Scroll to discover
        </p>
        <div className="relative mx-auto mt-4 h-9 w-px bg-border">
          <span
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold"
            style={{ animation: "lumea-scroll-dot 2.4s ease-in-out infinite" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------- INTRODUCTION */

export function Introduction() {
  const points = [
    ["Personalised treatments", "Every ritual is adapted on the day, never pulled from a menu."],
    ["Premium products", "An in-house apothecary blended in small batches in London."],
    ["Expert therapists", "An average of twelve years' practice behind every pair of hands."],
    ["A quiet environment", "Sound-isolated suites, warm light and no clocks anywhere."],
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <MaskImage
          src={IMAGES.intro}
          alt="The LUMÉA relaxation lounge in ivory and gold"
          width={1200}
          height={1504}
          className="aspect-[4/5] rounded-[2.5rem]"
        />
        <div>
          <p className="eyebrow mb-6">The Sanctuary</p>
          <h2 className="text-balance text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
            <RevealText text="A Sanctuary Designed Around You." />
          </h2>
          <Reveal delay={1}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Luméa began with a simple objection: that beauty had become rushed. We built a house
              where treatments are unhurried, products are honest, and the person on the table is
              the only agenda in the room.
            </p>
          </Reveal>

          <ul className="mt-12 space-y-7">
            {points.map(([title, copy], i) => (
              <Reveal as="li" key={title} delay={i + 1}>
                <div className="hairline-gold mb-5" />
                <p className="text-lg text-ivory">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={5} className="mt-12">
            <LuxeLink to="/about" variant="outline">
              Our Philosophy
            </LuxeLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- SIGNATURE SERVICES */

export function SignatureServices() {
  return (
    <section className="relative border-y border-border bg-charcoal/30 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <SectionHeading
            eyebrow="Signature Services"
            title="Rituals, not appointments."
            intro="Nine house treatments, each developed with our therapists and refined over a decade."
          />
          <LuxeLink to="/services" variant="ghost" className="justify-self-start px-0 md:justify-self-end">
            All services <ArrowRight className="h-3.5 w-3.5" />
          </LuxeLink>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((s, i) => (
            <Reveal key={s.slug} delay={i % 3}>
              <Link
                to="/services"
                data-cursor="view"
                className="luxe-card luxe-card-hover group block h-full overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    width={1000}
                    height={750}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-gold/40 bg-ink/50 px-3 py-1 text-[0.55rem] uppercase tracking-[0.24em] text-gold backdrop-blur-sm">
                    {s.category}
                  </span>
                </div>
                <div className="p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl transition-transform duration-500 group-hover:translate-x-1">
                      {s.name}
                    </h3>
                    <span className="shrink-0 text-sm text-gold">£{s.price}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <div className="mt-7 flex items-center justify-between">
                    <span className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                      {s.duration}
                    </span>
                    <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.28em] text-gold">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- 3D SCENE */

export function ProductScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div
          className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-ink"
          data-cursor="drag"
        >
          {mounted ? (
            <Suspense fallback={<SceneSkeleton />}>
              <BottleScene />
            </Suspense>
          ) : (
            <SceneSkeleton />
          )}
          <Particles count={8} />
          <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.55rem] uppercase tracking-[0.34em] text-ivory/40">
            Move your cursor to explore
          </p>
        </div>

        <div>
          <p className="eyebrow mb-6">The Apothecary</p>
          <h2 className="text-balance text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
            <RevealText text="Luxury in Every Detail." />
          </h2>
          <Reveal delay={1}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our signature oil is pressed in small batches, aged for six weeks and decanted into
              hand-finished glass. It appears in every treatment here — and in the bottle you take
              home.
            </p>
          </Reveal>
          <Reveal delay={2} className="mt-10">
            <LuxeLink to="/shop">Discover Our Rituals</LuxeLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SceneSkeleton() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-ink">
      <div className="float-slow h-48 w-24 rounded-full bg-gradient-to-b from-gold/25 to-transparent blur-xl" />
    </div>
  );
}

/* ---------------------------------------------------------- EXPERIENCE */

export function ExperienceRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={ref} className="relative hidden h-[400vh] lg:block">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-[400vw]">
          {experienceStages.map((stage) => (
            <article key={stage.number} className="relative h-full w-screen shrink-0">
              <img
                src={stage.image}
                alt={stage.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/65" />
              <div className="relative flex h-full flex-col justify-center px-16 xl:px-28">
                <p className="font-[family-name:var(--font-display)] text-[9rem] leading-none text-gold/25">
                  {stage.number}
                </p>
                <h3 className="-mt-6 text-7xl uppercase tracking-[0.12em]">{stage.title}</h3>
                <div className="hairline-gold my-8 w-72" />
                <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                  {stage.copy}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ExperienceStack() {
  return (
    <section className="lg:hidden">
      {experienceStages.map((stage) => (
        <article key={stage.number} className="relative min-h-[70svh] overflow-hidden">
          <img
            src={stage.image}
            alt={stage.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="relative flex min-h-[70svh] flex-col justify-center px-7">
            <p className="font-[family-name:var(--font-display)] text-7xl text-gold/30">
              {stage.number}
            </p>
            <h3 className="-mt-3 text-4xl uppercase tracking-[0.1em]">{stage.title}</h3>
            <div className="hairline-gold my-6 w-40" />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{stage.copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

/* ----------------------------------------------------------- BUDDHA */

export function BuddhaAltar() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const statueY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const statueRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-0.8, 0, 0.8]);
  const statueScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.04, 0.98]);
  const haloPulse = useTransform(scrollYProgress, [0, 0.4, 1], [0.55, 1.05, 0.7]);
  const dustY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const vignette = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 1, 1, 0.55]);
  const rippleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.3]);
  const rippleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.55, 0]);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) setMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      onPointerMove={(e) =>
        mounted
          ? setTilt({
              x: (e.clientX / window.innerWidth - 0.5) * 14,
              y: (e.clientY / window.innerHeight - 0.5) * 10,
            })
          : null
      }
      className="relative z-0 overflow-hidden bg-ink py-28 lg:py-40"
    >
      <motion.div
        style={{ opacity: vignette }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% 48%, oklch(0.79 0.09 84 / 0.18), transparent 60%), radial-gradient(800px 500px at 50% 56%, oklch(0.63 0.05 158 / 0.10), transparent 60%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: dustY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {Array.from({ length: 42 }).map((_, i) => {
          const left = (i * 53) % 100;
          const size = 1 + ((i * 13) % 3);
          const delay = (i % 9) * 0.45;
          const dur = 8 + (i % 7) * 1.6;
          return (
            <span
              key={i}
              className="absolute block rounded-full"
              style={{
                left: `${left}%`,
                bottom: `-${((i * 7) % 20)}px`,
                width: `${size}px`,
                height: `${size}px`,
                background:
                  i % 5 === 0
                    ? "oklch(0.88 0.055 88 / 0.85)"
                    : "oklch(0.79 0.09 84 / 0.55)",
                filter: "blur(0.3px)",
                animation: `lumea-drift ${dur}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <div className="relative order-2 aspect-[4/5] w-full max-w-[520px] justify-self-center lg:order-1">
          <motion.div
            style={{ scale: haloPulse }}
            aria-hidden="true"
            className="absolute inset-0 -z-10"
          >
            <div
              className="absolute -inset-6 rounded-full"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, oklch(0.79 0.09 84 / 0), oklch(0.79 0.09 84 / 0.22), oklch(0.88 0.055 88 / 0.35), oklch(0.79 0.09 84 / 0.22), oklch(0.79 0.09 84 / 0))",
                filter: "blur(42px)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.92 0.07 92 / 0.32), oklch(0.79 0.09 84 / 0.18) 40%, transparent 70%)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25"
              style={{ boxShadow: "inset 0 0 60px oklch(0.79 0.09 84 / 0.25)" }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/12"
            />
          </motion.div>

          <motion.div
            style={{ scale: rippleScale, opacity: rippleOpacity }}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[96%] w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25"
          />

          <motion.div
            style={{
              y: statueY,
              rotate: statueRotate,
              scale: statueScale,
            }}
          >
            <motion.figure
              animate={
                mounted
                  ? { x: tilt.x * 0.4, y: tilt.y * 0.4 }
                  : { x: 0, y: 0 }
              }
              transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.6 }}
              className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-gold/20"
            >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 10%, oklch(0.24 0.02 84 / 0.55), oklch(0.14 0.006 70) 65%)",
              }}
            />
            <motion.img
              src={IMAGES.buddha}
              alt="Gautama Buddha — serenity for the soul"
              className="relative z-10 h-full w-full object-cover"
              width={1200}
              height={1500}
              fetchPriority="high"
              {...(mounted
                ? {
                    initial: { filter: "brightness(0.55) saturate(0.7) sepia(0.1)" },
                    whileInView: {
                      filter: "brightness(0.98) saturate(1.05) sepia(0.02)",
                    },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                  }
                : null)}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.14 0.006 70 / 0.35) 0%, transparent 40%, transparent 65%, oklch(0.14 0.006 70 / 0.65) 100%), radial-gradient(120% 70% at 50% 0%, oklch(0.88 0.055 88 / 0.22), transparent 55%)",
                mixBlendMode: "screen",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(90% 70% at 50% 38%, oklch(0.88 0.055 88 / 0.3), transparent 62%)",
              }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24"
              style={{
                background:
                  "linear-gradient(180deg, transparent, oklch(0.79 0.09 84 / 0.18), oklch(0.79 0.09 84 / 0.35))",
                filter: "blur(10px)",
              }}
            />
          </motion.figure>
          </motion.div>

          <div
            aria-hidden="true"
            className="absolute -bottom-6 left-1/2 h-6 w-[78%] -translate-x-1/2 rounded-[50%] bg-gold/35 blur-2xl"
          />
        </div>

        <div className="order-1 lg:order-2">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-6"
          >
            The Quiet Within
          </motion.p>
          <h2 className="text-balance text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
            <RevealText text="Stillness. The Ultimate Luxury." />
          </h2>
          <Reveal delay={1}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Before the hands, before the oils — there is a breath. We design every ritual around
              that pause: the moment when the day outside stops, and the room inside begins to do
              its work.
            </p>
          </Reveal>

          <ul className="mt-12 space-y-6">
            {[
              ["Unrushed hours", "Two-hour minimum on signature rituals — no watch on the wall."],
              ["Silent suites", "Sound-isolated rooms, dimmed at the door by the guest."],
              ["Mindful breath", "Every treatment opens with a guided moment of stillness."],
            ].map(([title, copy], i) => (
              <Reveal as="li" key={title} delay={i + 2}>
                <div className="flex gap-4">
                  <div className="mt-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_2px_oklch(0.79_0.09_84_/_0.55)]" />
                  </div>
                  <div>
                    <p className="text-lg text-ivory">{title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={5} className="mt-12">
            <LuxeLink to="/experience">Enter the Sanctuary</LuxeLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- MEMBERSHIP */

export function MembershipTeaser() {
  return (
    <section className="border-y border-border bg-charcoal/30 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Membership"
          align="center"
          title="Your Ritual. Elevated."
          intro="Three ways to belong to the house, each with priority access to the diary."
        />
        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {memberships.map((m, i) => (
            <Reveal key={m.name} delay={i}>
              <div
                className={`luxe-card luxe-card-hover flex h-full flex-col p-9 ${
                  m.featured ? "border-gold/45" : ""
                }`}
              >
                {m.featured ? (
                  <span className="mb-5 self-start rounded-full bg-gold/15 px-3 py-1 text-[0.55rem] uppercase tracking-[0.24em] text-gold">
                    Most chosen
                  </span>
                ) : null}
                <h3 className="text-3xl uppercase tracking-[0.1em]">{m.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.tagline}</p>
                <p className="mt-7 font-[family-name:var(--font-display)] text-5xl text-gold">
                  £{m.monthly}
                  <span className="ml-2 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    / month
                  </span>
                </p>
                <GoldRule className="my-8" />
                <ul className="flex-1 space-y-3">
                  {m.perks.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                      <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <LuxeLink to="/membership">Explore Memberships</LuxeLink>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- TESTIMONIALS */

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index]!;

  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="eyebrow">In their words</p>
        <p
          aria-hidden="true"
          className="mt-6 font-[family-name:var(--font-display)] text-[7rem] leading-[0.5] text-gold/25"
        >
          &ldquo;
        </p>
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <p className="font-[family-name:var(--font-display)] text-3xl italic leading-snug sm:text-5xl">
            {active.quote}
          </p>
          <footer className="mt-9">
            <div className="flex justify-center gap-1">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-5 text-sm uppercase tracking-[0.24em] text-ivory">{active.name}</p>
            <p className="mt-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
              {active.treatment}
            </p>
          </footer>
        </motion.blockquote>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-ivory/70 transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-px w-8 transition-colors duration-500 ${
                  i === index ? "bg-gold" : "bg-border"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-ivory/70 transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- GALLERY */

export function Gallery() {
  return (
    <section className="border-y border-border py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="@lumea.spa"
          title="Inside the house."
          intro="Moments from the studio, the suites and the apothecary."
        />
        <div className="mt-16 columns-2 gap-5 lg:columns-4">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={i % 4} className="mb-5 break-inside-avoid">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="view"
                className="group relative block overflow-hidden rounded-2xl"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
                    g.tall ? "aspect-[3/4]" : "aspect-square"
                  }`}
                />
                <div className="absolute inset-0 grid place-items-center bg-ink/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Instagram className="h-6 w-6 text-gold" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- SHOP TEASER */

export function ShopTeaser() {
  const { add } = useCart();
  const featured = products.slice(0, 4);

  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <SectionHeading
            eyebrow="The Boutique"
            title="Take the ritual home."
            intro="Blended in-house, in small batches, with nothing decorative in the formula."
          />
          <LuxeLink to="/shop" variant="ghost" className="justify-self-start px-0 md:justify-self-end">
            Visit the boutique <ArrowRight className="h-3.5 w-3.5" />
          </LuxeLink>
        </div>

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i}>
              <div className="luxe-card luxe-card-hover group flex h-full flex-col overflow-hidden">
                <Link to="/shop" className="relative block aspect-square overflow-hidden" data-cursor="view">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-108"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.55rem] uppercase tracking-[0.28em] text-gold">
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-xl">{p.name}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    {p.rating}
                  </div>
                  <p className="mt-auto pt-6 text-lg text-gold">£{p.price}</p>
                  <button
                    type="button"
                    onClick={() => add(p.slug)}
                    className="mt-4 rounded-full border border-gold/40 py-2.5 text-[0.6rem] uppercase tracking-[0.26em] text-ivory transition-colors duration-500 hover:bg-gold/12 hover:text-gold"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- FINAL CTA */

export function FinalCta() {
  return (
    <section className="relative flex min-h-[85svh] items-center justify-center overflow-hidden">
      <img
        src={IMAGES.gal1}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <Particles count={12} />
      <div className="relative px-6 text-center">
        <p className="eyebrow">Begin</p>
        <h2 className="mt-6 text-balance text-5xl leading-[1.02] sm:text-7xl">
          <RevealText text="Your Moment Begins Here." />
        </h2>
        <Reveal delay={1}>
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Step away from the ordinary and enter a world created entirely for you.
          </p>
        </Reveal>
        <Reveal delay={2} className="mt-11">
          <LuxeLink to="/book" cursor="book">
            Book Your Experience
          </LuxeLink>
        </Reveal>
      </div>
    </section>
  );
}
