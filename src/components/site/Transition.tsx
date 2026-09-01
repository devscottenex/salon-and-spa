import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("lumea-intro");
    if (seen) {
      setDone(true);
      return;
    }
    const t = window.setTimeout(() => {
      window.sessionStorage.setItem("lumea-intro", "1");
      setDone(true);
    }, 1900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] grid place-items-center bg-ink"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.24em" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-[family-name:var(--font-display)] text-5xl text-ivory"
            >
              LUMÉA
            </motion.p>
            <p className="mt-4 text-[0.55rem] uppercase tracking-[0.45em] text-gold/80">
              Luxury Salon &amp; Spa
            </p>
            <div className="mx-auto mt-9 h-px w-56 overflow-hidden bg-border">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1] }}
                className="h-full origin-left bg-[image:var(--gradient-gold)]"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AnimatePresence mode="popLayout">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen isolate"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

/** Ambient drifting gold particles — pure CSS, GPU friendly. */
export function Particles({ count = 14 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute block h-1 w-1 rounded-full bg-gold/60"
          style={{
            left: `${(i * 37) % 100}%`,
            bottom: `-${(i % 5) * 8}px`,
            animation: `lumea-drift ${11 + (i % 7) * 2.4}s linear ${i * 1.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
