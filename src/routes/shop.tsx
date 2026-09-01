import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Search, Star, X, Minus, Plus } from "lucide-react";
import { PageHero } from "@/components/site/Primitives";
import { products, productCategories, IMAGES, type Product } from "@/lib/site-data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Boutique — LUMÉA Skincare, Oils & Candles" },
      {
        name: "description",
        content:
          "Shop LUMÉA's in-house apothecary: facial serums, essential oils, body care, candles and wellness blends made in small London batches.",
      },
      { property: "og:title", content: "The LUMÉA Boutique" },
      {
        property: "og:description",
        content: "Small-batch skincare, oils and candles from our Chelsea apothecary.",
      },
    ],
  }),
  component: ShopPage,
});

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

function ShopPage() {
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof productCategories)[number]>("All");
  const [maxPrice, setMaxPrice] = useState(160);
  const [sort, setSort] = useState<Sort>("featured");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quick, setQuick] = useState<Product | null>(null);

  const list = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.price <= maxPrice &&
        (p.name + p.category).toLowerCase().includes(query.toLowerCase()),
    );
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [query, category, maxPrice, sort]);

  return (
    <>
      <PageHero
        eyebrow="The Boutique"
        title="The apothecary, bottled."
        intro="Everything we use in the treatment rooms, available to take home."
        image={IMAGES.gal2}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-10">
            <div>
              <label htmlFor="shop-search" className="eyebrow mb-4 block">
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="shop-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Serum, oil, candle…"
                  className="w-full rounded-full border border-input bg-transparent py-3 pl-10 pr-4 text-sm text-ivory placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4">Category</p>
              <ul className="space-y-2">
                {productCategories.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => setCategory(c)}
                      aria-pressed={category === c}
                      className={`text-sm transition-colors duration-300 ${
                        category === c ? "text-gold" : "text-muted-foreground hover:text-ivory"
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label htmlFor="price" className="eyebrow mb-4 block">
                Max price · £{maxPrice}
              </label>
              <input
                id="price"
                type="range"
                min={50}
                max={160}
                step={2}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[oklch(0.79_0.09_84)]"
              />
            </div>

            <div>
              <label htmlFor="sort" className="eyebrow mb-4 block">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="w-full rounded-full border border-input bg-transparent px-5 py-3 text-sm text-ivory focus:border-gold focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Highest rated</option>
              </select>
            </div>
          </aside>

          <div>
            <p className="mb-8 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">
              {list.length} product{list.length === 1 ? "" : "s"}
            </p>
            <motion.div layout className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <motion.article
                    layout
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="luxe-card luxe-card-hover group flex flex-col overflow-hidden"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                      />
                      <button
                        type="button"
                        aria-label={`Add ${p.name} to wishlist`}
                        onClick={() =>
                          setWishlist((w) =>
                            w.includes(p.slug) ? w.filter((s) => s !== p.slug) : [...w, p.slug],
                          )
                        }
                        className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-ink/60 backdrop-blur-sm transition-colors hover:border-gold"
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${
                            wishlist.includes(p.slug) ? "fill-gold text-gold" : "text-ivory/70"
                          }`}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuick(p)}
                        data-cursor="view"
                        className="absolute inset-x-4 bottom-4 rounded-full bg-ink/75 py-2.5 text-[0.55rem] uppercase tracking-[0.26em] text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100"
                      >
                        Quick view
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.55rem] uppercase tracking-[0.28em] text-gold">
                        {p.category}
                      </p>
                      <h2 className="mt-2 text-xl">{p.name}</h2>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-gold text-gold" /> {p.rating}
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
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>{quick ? <QuickView product={quick} onClose={() => setQuick(null)} /> : null}</AnimatePresence>
    </>
  );
}

function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/85 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 28, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="luxe-card grid max-h-[86svh] w-full max-w-4xl overflow-y-auto md:grid-cols-2"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full max-h-[60svh] w-full object-cover"
          loading="lazy"
        />
        <div className="relative p-9">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full border border-border text-ivory/70 hover:border-gold hover:text-gold"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-[0.55rem] uppercase tracking-[0.3em] text-gold">{product.category}</p>
          <h2 className="mt-3 text-3xl">{product.name}</h2>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-gold text-gold" /> {product.rating} · 128 reviews
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="hairline-gold my-7" />
          <p className="text-[0.6rem] uppercase tracking-[0.26em] text-gold">Ingredients</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {product.ingredients}
          </p>
          <p className="mt-8 font-[family-name:var(--font-display)] text-4xl text-gold">
            £{product.price}
          </p>
          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center gap-4 rounded-full border border-border px-4 py-2.5">
              <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-3.5 w-3.5 text-ivory/70" />
              </button>
              <span className="w-5 text-center text-sm">{qty}</span>
              <button type="button" aria-label="Increase" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-3.5 w-3.5 text-ivory/70" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                add(product.slug, qty);
                onClose();
              }}
              className="flex-1 rounded-full bg-[image:var(--gradient-gold)] py-3 text-[0.6rem] uppercase tracking-[0.28em] text-primary-foreground"
            >
              Add to cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
