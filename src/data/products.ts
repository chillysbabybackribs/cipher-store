export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  tag: string;
  features: string[];
  includes: string[];
  status: "available" | "coming-soon" | "beta";
}

export const products: Product[] = [
  {
    id: "search-agent",
    title: "Clawdia - Search",
    subtitle: "AI-Powered Research & Intelligence",
    description:
      "Enterprise research agent for competitive analysis, market research, business planning, and intelligence gathering. Conducts deep web research, synthesizes findings, and builds comprehensive reports.",
    price: 299,
    originalPrice: 499,
    category: "Research",
    tag: "Best Seller",
    features: [
      "Multi-source research & synthesis",
      "Competitive intelligence gathering",
      "Market analysis & sizing",
      "Executive summaries & reports",
      "Source tracking & citations",
      "Custom research methodologies",
    ],
    includes: [
      "Full source code + deployment guide",
      "Research templates & frameworks",
      "Integration examples",
      "90-day update access",
    ],
    status: "available",
  },
  {
    id: "health-agent",
    title: "Clawdia - Health",
    subtitle: "Healthcare AI Agent Suite",
    description:
      "Production-ready AI agent that handles patient intake, appointment scheduling, insurance verification, and clinical triage. HIPAA-compliant with EHR integration.",
    price: 399,
    originalPrice: 699,
    category: "Healthcare",
    tag: "Popular",
    features: [
      "HIPAA-compliant data handling",
      "Patient intake automation",
      "Appointment scheduling",
      "Insurance verification",
      "Clinical triage workflows",
      "EHR integration (Epic, Cerner, Athena)",
    ],
    includes: [
      "Full source code + deployment guide",
      "HIPAA compliance checklist",
      "EHR integration templates",
      "90-day update access",
    ],
    status: "coming-soon",
  },
  {
    id: "legal-agent",
    title: "Clawdia - Law",
    subtitle: "Legal Research & Document Analysis",
    description:
      "AI-powered legal research agent. Case law discovery, contract analysis, legal document synthesis, and compliance research. Built for law firms and in-house counsel.",
    price: 399,
    category: "Legal",
    tag: "Enterprise",
    features: [
      "Case law search & analysis",
      "Contract document review",
      "Legal research synthesis",
      "Citation tracking",
      "Regulatory compliance research",
      "Legal memo generation",
    ],
    includes: [
      "Full source code + deployment guide",
      "Legal research templates",
      "Compliance frameworks",
      "120-day update access",
    ],
    status: "coming-soon",
  },
  {
    id: "realestate-agent",
    title: "Clawdia - Real Estate",
    subtitle: "Property Research & Market Analysis",
    description:
      "Real estate AI agent for property research, market analysis, comp analysis, investment assessment, and market reports. For agents, brokers, and investors.",
    price: 349,
    category: "Real Estate",
    tag: "New",
    features: [
      "Property research & comp analysis",
      "Market trend analysis",
      "Investment ROI calculation",
      "Neighborhood insights",
      "Market reports generation",
      "Price prediction",
    ],
    includes: [
      "Full source code + deployment guide",
      "MLS integration templates",
      "Market report templates",
      "90-day update access",
    ],
    status: "coming-soon",
  },
  {
    id: "local-agent",
    title: "Clawdia - Local",
    subtitle: "System Automation & File Management",
    description:
      "Desktop automation agent for file operations, system administration, local workflow automation, and task scheduling. Full access to your machine.",
    price: 199,
    category: "Productivity",
    tag: "Foundation",
    features: [
      "File system automation",
      "System command execution",
      "Task scheduling & cron",
      "Local database management",
      "Process monitoring",
      "Custom script execution",
    ],
    includes: [
      "Full source code + deployment guide",
      "Automation templates",
      "Script library",
      "60-day update access",
    ],
    status: "available",
  },
  {
    id: "starter-bundle",
    title: "Starter Bundle",
    subtitle: "Search + Local Agents",
    description:
      "Perfect for small teams. Get Clawdia - Search for research and Clawdia - Local for automation. Full source code and priority support.",
    price: 399,
    originalPrice: 498,
    category: "Bundle",
    tag: "Save 20%",
    features: [
      "Clawdia - Search included",
      "Clawdia - Local included",
      "Priority support",
      "Lifetime updates",
      "Community access",
    ],
    includes: [
      "Full source code for both agents",
      "Integration guides",
      "Template library",
      "Lifetime update access",
    ],
    status: "available",
  },
  {
    id: "enterprise-bundle",
    title: "Enterprise License",
    subtitle: "All Clawdia Agents + White-Label",
    description:
      "Complete suite. Every Clawdia agent (Search, Health, Law, Real Estate, Local) plus white-label license, priority support, and custom integrations.",
    price: 1999,
    originalPrice: 3499,
    category: "Bundle",
    tag: "Save 43%",
    features: [
      "All 5 Clawdia agents included",
      "White-label license",
      "Priority integration support",
      "Custom branding",
      "Lifetime updates",
      "Dedicated support channel",
    ],
    includes: [
      "Complete source code for all agents",
      "White-label deployment guide",
      "Integration templates for each vertical",
      "Lifetime update access",
      "Custom integration consultation hours",
    ],
    status: "available",
  },
];

export const categories = ["All", "Research", "Healthcare", "Legal", "Real Estate", "Productivity", "Bundle"];
