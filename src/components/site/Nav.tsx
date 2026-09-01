import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/experience", label: "Experience" },
  { to: "/about", label: "About" },
  { to: "/membership", label: "Membership" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 320 && y > prev);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-120%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled ? "glass-panel border-x-0 border-t-0 py-3" : "border-transparent py-6",
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-10"
        >
          <Link to="/" className="min-w-0 leading-none" data-cursor="explore">
            <span className="block font-[family-name:var(--font-display)] text-2xl tracking-[0.22em] text-ivory">
              LUMÉA
            </span>
            <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.4em] text-gold/80">
              Luxury Salon &amp; Spa
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="group relative text-[0.68rem] uppercase tracking-[0.24em] text-ivory/70 transition-colors duration-300 hover:text-gold data-[status=active]:text-gold"
                  data-cursor="view"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3">
            <Link
              to="/cart"
              aria-label={`Cart, ${count} items`}
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-border text-ivory/80 transition-colors hover:border-gold hover:text-gold sm:inline-flex"
              data-cursor="view"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-gold text-[0.55rem] text-primary-foreground">
                  {count}
                </span>
              ) : null}
            </Link>
            <Link
              to="/book"
              className="hidden rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-[0.62rem] uppercase tracking-[0.28em] text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--shadow-gold)] sm:inline-block"
              data-cursor="book"
            >
              Book Now
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ivory lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/98 px-8 lg:hidden"
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.6 }}
                >
                  <Link
                    to={l.to}
                    className="block py-3 font-[family-name:var(--font-display)] text-4xl text-ivory/90"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="hairline-gold my-8" />
            <Link
              to="/book"
              className="rounded-full bg-[image:var(--gradient-gold)] py-4 text-center text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground"
            >
              Book Appointment
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function BookingDock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/book")) return null;
  return (
    <>
      <Link
        to="/book"
        className="fixed bottom-8 right-8 z-40 hidden h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-charcoal/80 text-center text-[0.55rem] uppercase tracking-[0.22em] text-gold backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-gold hover:shadow-[var(--shadow-gold)] lg:flex"
        data-cursor="book"
      >
        Book
        <br />
        Now
      </Link>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-ink/92 p-3 backdrop-blur-md sm:hidden">
        <Link
          to="/book"
          className="block rounded-full bg-[image:var(--gradient-gold)] py-3.5 text-center text-[0.65rem] uppercase tracking-[0.3em] text-primary-foreground"
        >
          Book Now
        </Link>
      </div>
    </>
  );
}
