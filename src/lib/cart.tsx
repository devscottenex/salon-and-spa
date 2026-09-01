import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { products, type Product } from "./site-data";

export type CartLine = { slug: string; qty: number };

type CartContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  detailed: { product: Product; qty: number }[];
};

const Ctx = createContext<CartContext | null>(null);
const KEY = "lumea-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { slug, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const value = useMemo<CartContext>(() => {
    const detailed = lines
      .map((l) => ({ product: products.find((p) => p.slug === l.slug)!, qty: l.qty }))
      .filter((l) => Boolean(l.product));
    return {
      lines,
      detailed,
      add,
      setQty,
      remove,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: detailed.reduce((n, l) => n + l.product.price * l.qty, 0),
    };
  }, [lines, add, setQty, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
