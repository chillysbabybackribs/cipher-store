"use client";

import { useState } from "react";

const tabs = [
  { id: "getting-started", label: "Getting Started" },
  { id: "how-it-works", label: "How It Works" },
  { id: "security", label: "Security" },
];

const content: Record<string, React.ReactNode> = {
  "getting-started": (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Quick Start</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          Get your AI agent running in under 10 minutes. Each agent ships as a complete, 
          self-contained application with everything you need to deploy locally or to your own infrastructure.
        </p>
        <div className="bg-surface-raised border border-border p-5 font-mono text-sm space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-text-muted select-none shrink-0">01</span>
            <div>
              <span className="text-accent">Purchase &amp; download</span>
              <span className="text-text-muted"> — receive your agent source code package</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-text-muted select-none shrink-0">02</span>
            <div>
              <span className="text-accent">Configure your API keys</span>
              <span className="text-text-muted"> — add your LLM provider credentials to .env</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-text-muted select-none shrink-0">03</span>
            <div>
              <span className="text-accent">Install dependencies</span>
              <span className="text-text-muted"> — npm install or yarn install</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-text-muted select-none shrink-0">04</span>
            <div>
              <span className="text-accent">Launch</span>
              <span className="text-text-muted"> — run the desktop app or start the server</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">What's Included</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Desktop Application", desc: "Electron-based app for macOS, Windows, and Linux" },
            { title: "Mobile Chat Interface", desc: "Responsive web chat that works on any device" },
            { title: "Full Source Code", desc: "Every line of code — no obfuscation, no black boxes" },
            { title: "Documentation", desc: "Setup guides, API reference, and configuration docs" },
            { title: "Industry Prompts", desc: "Pre-built system prompts tuned for your domain" },
            { title: "Update Channel", desc: "Access to patches and feature updates for 12 months" },
          ].map((item) => (
            <div key={item.title} className="border border-border-subtle p-4 hover:border-border transition-colors">
              <p className="text-sm font-medium text-text-primary">{item.title}</p>
              <p className="text-xs text-text-muted mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">System Requirements</h3>
        <div className="text-sm text-text-secondary space-y-2">
          <p><span className="text-text-muted font-mono mr-2">OS</span> macOS 12+, Windows 10+, Ubuntu 20.04+</p>
          <p><span className="text-text-muted font-mono mr-2">RAM</span> 8GB minimum, 16GB recommended</p>
          <p><span className="text-text-muted font-mono mr-2">Node</span> v18 or higher</p>
          <p><span className="text-text-muted font-mono mr-2">API</span> Anthropic, OpenAI, or OpenRouter API key</p>
        </div>
      </div>
    </div>
  ),

  "how-it-works": (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Architecture Overview</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          Each Clawdia agent is a standalone application that runs entirely on your hardware. 
          There are no external servers, no telemetry, and no data leaves your machine unless 
          you explicitly send it to an LLM provider.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border p-5">
            <div className="w-8 h-8 border border-border flex items-center justify-center mb-3">
              <span className="text-accent text-xs font-mono">01</span>
            </div>
            <h4 className="text-sm font-semibold text-text-primary mb-2">Local Runtime</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              The agent runs as a native desktop application on your machine. 
              All processing, file access, and tool execution happens locally 
              with full OS-level permissions you control.
            </p>
          </div>
          <div className="border border-border p-5">
            <div className="w-8 h-8 border border-border flex items-center justify-center mb-3">
              <span className="text-accent text-xs font-mono">02</span>
            </div>
            <h4 className="text-sm font-semibold text-text-primary mb-2">AI Reasoning Layer</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              When the agent needs to reason or generate responses, it sends 
              context to your configured LLM provider via encrypted API calls. 
              You choose the model and provider.
            </p>
          </div>
          <div className="border border-border p-5">
            <div className="w-8 h-8 border border-border flex items-center justify-center mb-3">
              <span className="text-accent text-xs font-mono">03</span>
            </div>
            <h4 className="text-sm font-semibold text-text-primary mb-2">Domain Tools</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Each agent comes with industry-specific tools — browser automation, 
              document processing, compliance checks, and more. Tools are modular 
              and customizable.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Key Capabilities</h3>
        <div className="space-y-3">
          {[
            { label: "Browser Automation", desc: "Agents can navigate, extract, and interact with websites using a built-in browser engine" },
            { label: "File System Access", desc: "Read, write, and manage files on the local machine with configurable permission boundaries" },
            { label: "Tool Orchestration", desc: "Agents chain multiple tools together to complete complex multi-step workflows" },
            { label: "Persistent Memory", desc: "Conversation history and context persists across sessions with encrypted local storage" },
            { label: "Scheduled Tasks", desc: "Set up recurring automated tasks with cron-style scheduling built into the agent" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 py-3 border-b border-border-subtle last:border-0">
              <span className="text-accent text-xs mt-0.5">▸</span>
              <div>
                <p className="text-sm font-medium text-text-primary">{item.label}</p>
                <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Deployment Options</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          Run as a desktop app for individual use, deploy as a web service for team access, 
          or embed into your existing infrastructure via API. Every deployment option uses the 
          same source code — no feature gating between tiers.
        </p>
      </div>
    </div>
  ),

  security: (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Security Model</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          Clawdia agents are designed with a local-first security model. Your data never 
          touches our servers. There is no cloud component, no analytics, and no telemetry. 
          The agent is yours to audit, modify, and deploy on your own terms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: "Zero Data Collection",
            desc: "No usage data, conversations, or files are ever sent to Clawdia. The only external calls are to your chosen LLM provider, controlled by your API key.",
            icon: "🔒",
          },
          {
            title: "Encrypted Local Storage",
            desc: "All conversation history, API keys, and settings are stored in an encrypted local store on your machine. No cloud sync, no external databases.",
            icon: "🗄️",
          },
          {
            title: "Full Source Audit",
            desc: "You receive complete, unobfuscated source code. Run your own security audits, pen tests, or code reviews before deploying to production.",
            icon: "🔍",
          },
          {
            title: "Network Isolation",
            desc: "The agent can run fully air-gapped with a local LLM. No internet required after initial setup if you use a self-hosted model.",
            icon: "🌐",
          },
          {
            title: "Permission Boundaries",
            desc: "Configure exactly what the agent can access — file system paths, network endpoints, and tool capabilities are all user-defined.",
            icon: "⚙️",
          },
          {
            title: "No Vendor Lock-In",
            desc: "Switch LLM providers at any time. Your data stays on your machine. Cancel and keep everything — the code is yours forever.",
            icon: "🔓",
          },
        ].map((item) => (
          <div key={item.title} className="border border-border p-5 hover:border-border transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg">{item.icon}</span>
              <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Compliance</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          Our healthcare and legal agents include built-in compliance tooling for industry regulations. 
          Because the agent runs on your infrastructure, you maintain full control over data residency 
          and retention policies.
        </p>
        <div className="flex flex-wrap gap-3">
          {["HIPAA Ready", "SOC 2 Compatible", "GDPR Friendly", "On-Premise Deployment", "Air-Gap Capable"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-mono border border-border text-text-muted hover:border-accent hover:text-accent transition-colors"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <div className="border border-accent/20 bg-accent-glow p-5">
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="text-accent font-semibold">Security disclosure:</span>{" "}
          If you discover a vulnerability in any Clawdia agent, please contact us at{" "}
          <span className="text-text-primary">security@openclawlocal.com</span>. 
          We take all reports seriously and will respond within 48 hours.
        </p>
      </div>
    </div>
  ),
};

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("getting-started");

  return (
    <section id="docs" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-text-muted tracking-widest uppercase mb-3">
            Documentation
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
            Everything you need to get started.
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? "text-accent"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl">{content[activeTab]}</div>
      </div>
    </section>
  );
}
