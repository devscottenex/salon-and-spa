import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-3.5 text-[0.7rem] font-normal uppercase tracking-[0.3em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40";

const styles = {
  gold: "bg-[image:var(--gradient-gold)] text-primary-foreground hover:shadow-[var(--shadow-gold)]",
  outline:
    "border border-gold/40 text-ivory hover:border-gold hover:bg-gold/10 hover:text-gold-soft",
  ghost: "text-ivory/70 hover:text-gold",
  dark: "bg-charcoal text-ivory border border-border hover:border-gold/50",
} as const;

export type LuxeVariant = keyof typeof styles;

export function LuxeButton({
  variant = "gold",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: LuxeVariant }) {
  return (
    <button className={cn(base, styles[variant], className)} data-cursor="book" {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function LuxeLink({
  to,
  variant = "gold",
  className,
  children,
  cursor = "explore",
  ...rest
}: {
  to: string;
  variant?: LuxeVariant;
  className?: string;
  children: ReactNode;
  cursor?: string;
  search?: Record<string, unknown>;
}) {
  return (
    <Link
      to={to}
      className={cn(base, styles[variant], className)}
      data-cursor={cursor}
      {...(rest as Record<string, unknown>)}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
      <h2 className="text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
      {intro ? (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("hairline-gold w-full", className)} />;
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40 sm:min-h-[70vh] sm:pb-24">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-45"
          loading="eager"
          fetchPriority="high"
        />
        <div className="veil absolute inset-0 pointer-events-none" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <p className="eyebrow mb-6 animate-[fade-in_1s_ease-out]">{eyebrow}</p>
        <h1 className="max-w-4xl text-balance text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </header>
  );
}
