import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { services, specialists } from "@/lib/site-data";

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): { service?: string } =>
    typeof search["service"] === "string" ? { service: search["service"] } : {},
  head: () => ({
    meta: [
      { title: "Book an Appointment — LUMÉA Salon & Spa" },
      {
        name: "description",
        content:
          "Reserve your treatment at LUMÉA: choose a service, therapist, date and time in a few unhurried steps.",
      },
      { property: "og:title", content: "Book an Appointment at LUMÉA" },
      {
        property: "og:description",
        content: "Choose your ritual, your therapist and your moment.",
      },
    ],
  }),
  component: BookPage,
});

const STEPS = ["Service", "Specialist", "Date & Time", "Details", "Confirm"];
const TIMES = ["09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];

function BookPage() {
  const { service: preselect } = Route.useSearch();
  const [step, setStep] = useState(preselect ? 1 : 0);
  const [serviceSlug, setServiceSlug] = useState<string | undefined>(preselect);
  const [specialist, setSpecialist] = useState<string>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [details, setDetails] = useState({ name: "", email: "", phone: "", notes: "" });
  const [done, setDone] = useState(false);

  const service = services.find((s) => s.slug === serviceSlug);
  const expert = specialists.find((s) => s.id === specialist);

  const days = useMemo(() => {
    const base = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i + 1);
      return d;
    });
  }, []);

  const canAdvance = [
    Boolean(serviceSlug),
    Boolean(specialist),
    Boolean(date && time),
    Boolean(details.name && details.email),
    true,
  ][step];

  if (done) {
    return (
      <section className="mx-auto grid min-h-[80svh] max-w-2xl place-items-center px-6 py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="luxe-card w-full p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15"
          >
            <Check className="h-7 w-7 text-gold" />
          </motion.div>
          <h1 className="mt-8 text-4xl">You're booked.</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {service?.name} with {expert?.name} on {date} at {time}. A confirmation is on its way to{" "}
            {details.email}.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 pb-28 pt-40 lg:px-10">
      <p className="eyebrow mb-5">Reservations</p>
      <h1 className="text-5xl sm:text-6xl">Book your ritual</h1>

      <ol className="mt-12 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-3">
            <div className="h-px w-full bg-border">
              <motion.div
                className="h-px bg-[image:var(--gradient-gold)]"
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span
              className={`text-[0.55rem] uppercase tracking-[0.22em] ${
                i <= step ? "text-gold" : "text-muted-foreground/50"
              }`}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="luxe-card mt-10 p-8 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => setServiceSlug(s.slug)}
                    className={`rounded-2xl border p-5 text-left transition-colors duration-400 ${
                      serviceSlug === s.slug
                        ? "border-gold/60 bg-gold/8"
                        : "border-border hover:border-gold/35"
                    }`}
                  >
                    <p className="text-[0.55rem] uppercase tracking-[0.26em] text-gold">
                      {s.category}
                    </p>
                    <p className="mt-2 text-lg">{s.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.duration} · £{s.price}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {specialists.map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => setSpecialist(sp.id)}
                    className={`rounded-2xl border p-5 text-left transition-colors duration-400 ${
                      specialist === sp.id
                        ? "border-gold/60 bg-gold/8"
                        : "border-border hover:border-gold/35"
                    }`}
                  >
                    <p className="text-lg">{sp.name}</p>
                    <p className="mt-1 text-[0.55rem] uppercase tracking-[0.26em] text-gold">
                      {sp.role}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-9">
                <div>
                  <p className="eyebrow mb-4">Choose a date</p>
                  <div className="flex gap-3 overflow-x-auto pb-3">
                    {days.map((d) => {
                      const label = d.toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      });
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setDate(label)}
                          className={`shrink-0 rounded-2xl border px-5 py-4 text-center transition-colors duration-400 ${
                            date === label
                              ? "border-gold/60 bg-gold/8 text-gold"
                              : "border-border text-muted-foreground hover:border-gold/35"
                          }`}
                        >
                          <span className="block text-[0.55rem] uppercase tracking-[0.2em]">
                            {d.toLocaleDateString("en-GB", { weekday: "short" })}
                          </span>
                          <span className="mt-1 block text-2xl">{d.getDate()}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-4">Choose a time</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {TIMES.map((t, i) => {
                      const unavailable = i === 2 || i === 5;
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={unavailable}
                          onClick={() => setTime(t)}
                          className={`rounded-full border py-3 text-sm transition-colors duration-400 ${
                            time === t
                              ? "border-gold/60 bg-gold/8 text-gold"
                              : "border-border text-muted-foreground hover:border-gold/35"
                          } disabled:cursor-not-allowed disabled:opacity-30`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {(
                  [
                    ["name", "Full name", "text"],
                    ["email", "Email", "email"],
                    ["phone", "Phone", "tel"],
                  ] as const
                ).map(([key, label, type]) => (
                  <div key={key}>
                    <label htmlFor={key} className="eyebrow mb-3 block">
                      {label}
                    </label>
                    <input
                      id={key}
                      type={type}
                      value={details[key]}
                      onChange={(e) => setDetails({ ...details, [key]: e.target.value })}
                      className="w-full rounded-2xl border border-input bg-transparent px-5 py-3.5 text-sm text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="notes" className="eyebrow mb-3 block">
                    Notes for your therapist
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={details.notes}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    className="w-full resize-none rounded-2xl border border-input bg-transparent px-5 py-3.5 text-sm text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <dl className="space-y-4 text-sm">
                {[
                  ["Service", service ? `${service.name} · ${service.duration}` : "—"],
                  ["Specialist", expert?.name ?? "—"],
                  ["When", `${date} at ${time}`],
                  ["Guest", details.name],
                  ["Contact", details.email],
                  ["Total", service ? `£${service.price}` : "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-border pb-4">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right text-ivory">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-gold disabled:opacity-30"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Back
          </button>
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => {
              if (step === STEPS.length - 1) {
                setDone(true);
                toast.success("Appointment confirmed");
              } else setStep((s) => s + 1);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-[0.62rem] uppercase tracking-[0.28em] text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--shadow-gold)] disabled:opacity-40"
          >
            {step === STEPS.length - 1 ? "Confirm booking" : "Continue"}
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
