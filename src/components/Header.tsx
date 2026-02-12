"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "./Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — clean text mark, no icons */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-border flex items-center justify-center">
            <div className="w-3 h-3 bg-accent" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            Clawdia
          </span>
          <span className="text-xs font-mono text-text-muted tracking-widest uppercase ml-1 hidden sm:inline">
            agents
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#products"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Products
          </a>
          <a
            href="#enterprise"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Enterprise
          </a>
          <a
            href="#docs"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Documentation
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative text-text-secondary hover:text-text-primary transition-colors">
            <ShoppingCart />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-void text-[10px] font-bold flex items-center justify-center">
              0
            </span>
          </button>
          <a
            href="#products"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-transparent border border-border text-text-primary hover:border-accent hover:text-accent transition-all"
          >
            Browse Agents
          </a>
        </div>
      </div>
    </header>
  );
}
