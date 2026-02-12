"use client";

import { useRef, useState, useEffect } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "./Icons";

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [filtered]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="products" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono text-text-muted tracking-widest uppercase mb-2">
              Product Catalog
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
              AI Agents
            </h2>
          </div>

          {/* Category filter + scroll arrows */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border border-border p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-accent text-void"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-9 h-9 border border-border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? "text-text-primary hover:border-accent"
                    : "text-text-muted/30 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-9 h-9 border border-border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? "text-text-primary hover:border-accent"
                    : "text-text-muted/30 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="scroll-x flex gap-5 pb-4"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom hint */}
        <div className="mt-6 flex items-center justify-center sm:hidden">
          <p className="text-xs text-text-muted font-mono">
            Swipe to browse
          </p>
        </div>
      </div>
    </section>
  );
}
