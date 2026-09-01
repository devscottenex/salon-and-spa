import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — LUMÉA Boutique" },
      {
        name: "description",
        content: "Review the products in your LUMÉA boutique bag and proceed to checkout.",
      },
      { property: "og:title", content: "Your Bag — LUMÉA Boutique" },
      { property: "og:description", content: "Small-batch skincare, oils and candles." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 9;

  return (
    <section className="mx-auto min-h-[70svh] max-w-6xl px-6 pb-28 pt-40 lg:px-10">
      <p className="eyebrow mb-5">Boutique</p>
      <h1 className="text-5xl sm:text-6xl">Your bag</h1>

      {detailed.length === 0 ? (
        <div className="luxe-card mt-14 p-14 text-center">
          <p className="text-lg text-muted-foreground">Your bag is empty for the moment.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.3em] text-primary-foreground"
          >
            Visit the boutique
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <ul className="space-y-5">
            <AnimatePresence initial={false}>
              {detailed.map(({ product, qty }) => (
                <motion.li
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="luxe-card grid grid-cols-[88px_minmax(0,1fr)] items-center gap-5 p-5 sm:grid-cols-[110px_minmax(0,1fr)_auto]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.55rem] uppercase tracking-[0.28em] text-gold">
                      {product.category}
                    </p>
                    <h2 className="mt-1.5 truncate text-xl">{product.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">£{product.price}</p>
                    <div className="mt-4 flex items-center gap-5 sm:hidden">
                      <QtyControl qty={qty} onChange={(q) => setQty(product.slug, q)} />
                      <button
                        type="button"
                        onClick={() => remove(product.slug)}
                        className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground hover:text-gold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="hidden items-center gap-6 sm:flex">
                    <QtyControl qty={qty} onChange={(q) => setQty(product.slug, q)} />
                    <motion.span
                      key={qty}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-20 text-right text-lg text-gold"
                    >
                      £{product.price * qty}
                    </motion.span>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => remove(product.slug)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-border text-ivory/60 transition-colors hover:border-gold hover:text-gold"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <aside className="luxe-card h-fit p-8">
            <h2 className="text-2xl">Summary</h2>
            <div className="hairline-gold my-6" />
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>£{subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Complimentary" : `£${shipping}`}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-lg">
                <dt>Total</dt>
                <dd className="text-gold">£{subtotal + shipping}</dd>
              </div>
            </dl>
            <button
              type="button"
              className="mt-8 w-full rounded-full bg-[image:var(--gradient-gold)] py-3.5 text-[0.62rem] uppercase tracking-[0.28em] text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--shadow-gold)]"
            >
              Proceed to checkout
            </button>
            <Link
              to="/shop"
              className="mt-4 block text-center text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground hover:text-gold"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}

function QtyControl({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  return (
    <div className="flex items-center gap-4 rounded-full border border-border px-4 py-2">
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(qty - 1)}>
        <Minus className="h-3.5 w-3.5 text-ivory/70" />
      </button>
      <motion.span key={qty} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-5 text-center text-sm">
        {qty}
      </motion.span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(qty + 1)}>
        <Plus className="h-3.5 w-3.5 text-ivory/70" />
      </button>
    </div>
  );
}
