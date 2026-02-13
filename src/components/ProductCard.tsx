import { Product } from "@/data/products";
import { ArrowRight, Check, Eye } from "./Icons";

export default function ProductCard({ product }: { product: Product }) {

  const statusLabel = {
    available: "Available",
    "coming-soon": "Coming Soon",
    beta: "Beta",
  };

  const statusColor = {
    available: "text-success",
    "coming-soon": "text-text-muted",
    beta: "text-warning",
  };

  return (
    <div className="min-w-[340px] sm:min-w-[380px] max-w-[400px] w-full h-[520px] border border-border bg-surface card-hover glow-hover flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
            {product.category}
          </span>
          <span className="w-px h-3 bg-border" />
          <span className={`text-[10px] font-mono uppercase tracking-widest ${statusColor[product.status]}`}>
            {statusLabel[product.status]}
          </span>
        </div>
        {product.tag && (
          <span className="text-[10px] font-mono px-2 py-0.5 border border-accent/30 text-accent tracking-wider uppercase">
            {product.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-5 flex-1 flex flex-col overflow-hidden">
        {/* Title block */}
        <div className="mb-4 shrink-0">
          <h3 className="text-base font-semibold text-text-primary leading-snug">
            {product.title}
          </h3>
          <p className="text-xs text-text-muted font-mono mt-1">
            {product.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-3 shrink-0">
          {product.description}
        </p>

        {/* Features preview — fixed 3 shown, no expand toggle to prevent layout shift */}
        <div className="space-y-2 mb-5 shrink-0">
          {product.features.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-text-muted mt-0.5 shrink-0" />
              <span className="text-xs text-text-secondary">{f}</span>
            </div>
          ))}
          {product.features.length > 3 && (
            <p className="text-xs text-text-muted mt-1">
              +{product.features.length - 3} more features
            </p>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Includes */}
        <div className="border-t border-border-subtle pt-4 mb-5 shrink-0">
          <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2">
            Includes
          </p>
          {product.includes.slice(0, 2).map((item, i) => (
            <p key={i} className="text-xs text-text-secondary leading-relaxed">
              {item}
            </p>
          ))}
          {product.includes.length > 2 && (
            <p className="text-xs text-text-muted">
              +{product.includes.length - 2} more
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-text-primary">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-text-muted line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-all">
            <Eye />
          </button>
          {product.status === "available" ? (
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-void text-xs font-semibold hover:bg-accent-dim transition-colors">
              Add to Cart
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 border border-border text-xs text-text-muted cursor-not-allowed">
              {product.status === "beta" ? "Request Access" : "Notify Me"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
