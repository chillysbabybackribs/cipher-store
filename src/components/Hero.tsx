import { ArrowRight, Shield, Cpu, Code } from "./Icons";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-xs font-mono text-text-muted tracking-wider uppercase mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 bg-accent" />
            Production-Ready AI Agents
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-text-primary mb-6 animate-fade-in-up animate-delay-100">
            Specialized AI agents
            <br />
            <span className="text-gradient">for every industry.</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg text-text-secondary leading-relaxed max-w-xl mb-10 animate-fade-in-up animate-delay-200">
            Local Desktop + Mobile Chat + Full OS and Security. Production-ready
            agents with complete source code and zero vendor lock-in.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 animate-fade-in-up animate-delay-300">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-void text-sm font-semibold hover:bg-accent-dim transition-colors"
            >
              View Agents
              <ArrowRight />
            </a>
            <a
              href="#docs"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm text-text-secondary hover:text-text-primary hover:border-text-muted transition-all"
            >
              Read Documentation
            </a>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-20 pt-10 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Compliance-Ready
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Industry-specific compliance built in (HIPAA, legal discovery, etc.)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                <Code className="w-5 h-5 text-text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Full Source Code
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Own every line. Deploy on your infrastructure with zero vendor lock-in
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Multi-Domain
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Healthcare, legal, real estate, research, and more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
