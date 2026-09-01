import { useEffect, useRef, useState } from "react";

const LABELS: Record<string, string> = {
  view: "VIEW",
  explore: "EXPLORE",
  book: "BOOK",
  drag: "DRAG",
};

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const key = el?.dataset["cursor"];
      setLabel(key ? (LABELS[key] ?? null) : null);
    };

    const loop = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add("no-cursor");
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("no-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          label
            ? "grid h-[68px] w-[68px] place-items-center bg-gold/12 backdrop-blur-[2px]"
            : "h-2 w-2 bg-gold"
        }`}
      >
        {label ? (
          <span className="text-[0.5rem] uppercase tracking-[0.22em] text-gold">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
