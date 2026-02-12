import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-void">
      <Header />
      <Hero />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      <ProductCarousel />

      {/* Enterprise CTA section */}
      <section id="enterprise" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="border border-border p-10 sm:p-16 relative overflow-hidden">
            {/* Background accent line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-lg">
                <p className="text-xs font-mono text-text-muted tracking-widest uppercase mb-3">
                  Enterprise
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight mb-4">
                  Need a custom agent built?
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We build bespoke AI agents for any industry. Custom integrations,
                  white-label deployments, and dedicated support. From healthcare
                  to legal, real estate to research. Starting at $5,000.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-void text-sm font-semibold hover:bg-accent-dim transition-colors"
                >
                  Schedule a Call
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm text-text-secondary hover:text-text-primary hover:border-text-muted transition-all"
                >
                  View Case Studies
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <p className="text-2xl font-semibold text-text-primary">5+</p>
                <p className="text-xs text-text-muted mt-1">Specialized agents</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-text-primary">100%</p>
                <p className="text-xs text-text-muted mt-1">
                  Source code included
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-text-primary">
                  3x
                </p>
                <p className="text-xs text-text-muted mt-1">Faster deployment</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-text-primary">
                  $199
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Starting price
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
