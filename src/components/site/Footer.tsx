import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

const columns = [
  {
    title: "Visit",
    links: [
      { label: "Services", to: "/services" },
      { label: "Experience", to: "/experience" },
      { label: "About", to: "/about" },
    ],
  },
  {
    title: "Belong",
    links: [
      { label: "Membership", to: "/membership" },
      { label: "Boutique", to: "/shop" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-charcoal/40 pb-28 pt-20 sm:pb-16">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-10">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl tracking-[0.22em]">LUMÉA</p>
          <p className="mt-2 text-[0.55rem] uppercase tracking-[0.4em] text-gold/80">
            Luxury Salon &amp; Spa
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A sanctuary in Chelsea for those who treat beauty as a ritual rather than an errand.
          </p>
          <div className="mt-7 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="https://instagram.com"
                aria-label="Social profile"
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-6">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="eyebrow mb-6">Concierge</p>
          <address className="space-y-3 text-sm not-italic leading-relaxed text-muted-foreground">
            <p>{CONTACT.address}</p>
            <p>
              <a className="transition-colors hover:text-gold" href={`tel:${CONTACT.phone}`}>
                {CONTACT.phone}
              </a>
            </p>
            <p>
              <a className="transition-colors hover:text-gold" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
        <div className="hairline-gold" />
        <p className="mt-6 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          © {new Date().getFullYear()} Luméa — All rights reserved
        </p>
      </div>
    </footer>
  );
}
