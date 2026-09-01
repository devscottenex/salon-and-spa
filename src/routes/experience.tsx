import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Move, ArrowRight } from "lucide-react";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { rooms, IMAGES, experienceStages } from "@/lib/site-data";
import { Particles } from "@/components/site/Transition";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Virtual Tour — Step Inside LUMÉA" },
      {
        name: "description",
        content:
          "Take a 360° drag-to-look tour of LUMÉA: reception, hair studio, facial rooms, massage suites, VIP lounge and the boutique.",
      },
      { property: "og:title", content: "Step Inside LUMÉA — Virtual Tour" },
      {
        property: "og:description",
        content: "Explore every room of our Chelsea salon and spa before you arrive.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const [active, setActive] = useState(0);
  const room = rooms[active]!;

  return (
    <>
      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden pt-32">
        <img
          src={IMAGES.roomPool}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          fetchPriority="high"
        />
        <div className="veil absolute inset-0" />
        <Particles count={10} />
        <div className="relative px-6 text-center">
          <p className="eyebrow">Virtual Tour</p>
          <h1 className="mt-6 text-balance text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
            <RevealText text="Step Inside LUMÉA." />
          </h1>
          <Reveal delay={1}>
            <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
              Seven rooms, one continuous mood. Drag to look around each space.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <PanoViewer key={room.id} src={room.image} label={room.name} note={room.note} />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              data-cursor="view"
              className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-500 ${
                i === active ? "border-gold" : "border-border hover:border-gold/50"
              }`}
            >
              <img
                src={r.image}
                alt={r.name}
                loading="lazy"
                decoding="async"
                className="h-28 w-full object-cover transition-transform duration-1000 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-ink/55" />
              <span className="absolute bottom-3 left-4 text-[0.6rem] uppercase tracking-[0.26em] text-ivory">
                {r.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-charcoal/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow mb-6">The Journey</p>
          <h2 className="max-w-2xl text-4xl leading-[1.05] sm:text-5xl">
            Four stages, roughly three hours, no clocks on the wall.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {experienceStages.map((s, i) => (
              <Reveal key={s.number} delay={i}>
                <div className="luxe-card luxe-card-hover h-full p-7">
                  <p className="font-[family-name:var(--font-display)] text-5xl text-gold/40">
                    {s.number}
                  </p>
                  <h3 className="mt-3 text-2xl uppercase tracking-[0.1em]">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link
            to="/book"
            data-cursor="book"
            className="mt-14 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.3em] text-primary-foreground"
          >
            Reserve your visit <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}

function PanoViewer({ src, label, note }: { src: string; label: string; note: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(50);
  const drag = useRef<{ x: number; base: number } | null>(null);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, base: offset };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current || !ref.current) return;
    const delta = ((e.clientX - drag.current.x) / ref.current.clientWidth) * 70;
    setOffset(Math.min(100, Math.max(0, drag.current.base - delta)));
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      data-cursor="drag"
      className="relative aspect-[16/9] w-full touch-pan-y select-none overflow-hidden rounded-[2rem] border border-border"
    >
      <img
        src={src}
        alt={`${label} — panoramic view`}
        className="h-full w-full scale-[1.35] object-cover"
        style={{ objectPosition: `${offset}% 50%` }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/30" />
      <div className="pointer-events-none absolute bottom-7 left-7 right-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="eyebrow">Room</p>
          <h2 className="mt-2 truncate text-3xl sm:text-4xl">{label}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        </div>
        <span className="glass-panel hidden shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[0.55rem] uppercase tracking-[0.24em] text-gold sm:inline-flex">
          <Move className="h-3.5 w-3.5" /> Drag to look
        </span>
      </div>
    </motion.div>
  );
}
