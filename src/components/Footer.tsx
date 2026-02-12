export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 border border-border flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-accent" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-text-primary">
                Clawdia
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Specialized AI agents for research, healthcare, legal, real estate,
              and automation. Full source code included.
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-4">
              Products
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Clawdia - Search
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Clawdia - Health
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Clawdia - Law
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Clawdia - Real Estate
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  View All Agents
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-4">
              Resources
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Deployment Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Integration Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-4">
              Company
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-text-muted font-mono">
            2026 Clawdia Agents. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] text-text-muted hover:text-text-secondary transition-colors">
              GitHub
            </a>
            <a href="#" className="text-[11px] text-text-muted hover:text-text-secondary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-[11px] text-text-muted hover:text-text-secondary transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
