export const SEARCH_PLACEHOLDERS = [
  "Build a trading platform...",
  "Build a crypto neobank...",
  "Build an AI trading agent...",
  "Build a wallet login system...",
  "Build a bug bounty platform...",
] as const;

export const POPULAR_SEARCHES = [
  "Trading Platform",
  "Crypto Neobank",
  "Wallet Authentication",
  "Stablecoin Payments",
  "Bug Bounty Platform",
] as const;

export const FEATURED_API_SLUGS = [
  "privy",
  "hyperliquid",
  "solana",
  "circle",
  "alchemy",
  "immunefi",
] as const;

/** Bento sizing for homepage featured API grid */
export const FEATURED_API_BENTO_SIZE: Record<
  (typeof FEATURED_API_SLUGS)[number],
  "large" | "medium"
> = {
  hyperliquid: "large",
  privy: "large",
  solana: "medium",
  circle: "medium",
  alchemy: "medium",
  immunefi: "medium",
};

export const FEATURED_API_BENTO_ORDER = [
  "hyperliquid",
  "privy",
  "solana",
  "circle",
  "alchemy",
  "immunefi",
] as const;

export const HOMEPAGE_CATEGORIES = [
  { slug: "trading", label: "Trading" },
  { slug: "payments", label: "Payments" },
  { slug: "cards", label: "Cards" },
  { slug: "wallets", label: "Wallets" },
  { slug: "ai", label: "AI" },
  { slug: "security", label: "Security" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "analytics", label: "Analytics" },
  { slug: "gaming", label: "Gaming" },
  { slug: "identity", label: "Identity" },
] as const;

export const SHOWCASE_ECOSYSTEM_SLUGS = [
  "base",
  "hyperliquid",
  "ethereum",
  "solana",
  "sui",
  "arbitrum",
] as const;

export const ECOSYSTEM_ACCENTS: Record<
  string,
  { gradient: string; glow: string; mark: string }
> = {
  base: {
    gradient: "from-blue-500/20 via-blue-600/5 to-transparent",
    glow: "group-hover:shadow-blue-500/20",
    mark: "bg-blue-500",
  },
  hyperliquid: {
    gradient: "from-teal-500/20 via-emerald-600/5 to-transparent",
    glow: "group-hover:shadow-teal-500/20",
    mark: "bg-teal-400",
  },
  ethereum: {
    gradient: "from-violet-500/20 via-purple-600/5 to-transparent",
    glow: "group-hover:shadow-violet-500/20",
    mark: "bg-violet-500",
  },
  solana: {
    gradient: "from-emerald-500/20 via-green-600/5 to-transparent",
    glow: "group-hover:shadow-emerald-500/20",
    mark: "bg-gradient-to-br from-emerald-400 to-purple-500",
  },
  sui: {
    gradient: "from-cyan-500/20 via-sky-600/5 to-transparent",
    glow: "group-hover:shadow-cyan-500/20",
    mark: "bg-cyan-400",
  },
  arbitrum: {
    gradient: "from-sky-500/20 via-blue-600/5 to-transparent",
    glow: "group-hover:shadow-sky-500/20",
    mark: "bg-sky-500",
  },
  bitcoin: {
    gradient: "from-orange-500/20 via-amber-600/5 to-transparent",
    glow: "group-hover:shadow-orange-500/20",
    mark: "bg-orange-500",
  },
  cosmos: {
    gradient: "from-indigo-500/20 via-violet-600/5 to-transparent",
    glow: "group-hover:shadow-indigo-500/20",
    mark: "bg-indigo-500",
  },
  ton: {
    gradient: "from-sky-500/20 via-cyan-600/5 to-transparent",
    glow: "group-hover:shadow-sky-500/20",
    mark: "bg-sky-400",
  },
};

export const DISCOVER_METRICS = [
  { label: "APIs", value: 350, suffix: "+" },
  { label: "Recipes", value: 150, suffix: "+" },
  { label: "Ecosystems", value: 40, suffix: "+" },
  { label: "Grants", value: 80, suffix: "+" },
  { label: "Intel Posts", value: 600, suffix: "+" },
] as const;

export type GrantUrgency = "active" | "new" | "closing-soon";

export function getGrantUrgency(
  status: "active" | "upcoming",
  deadline: string,
): GrantUrgency {
  if (status === "upcoming") return "new";
  if (deadline !== "Rolling" && !deadline.toLowerCase().includes("rolling")) {
    return "closing-soon";
  }
  return "active";
}

export const GRANT_URGENCY_LABELS: Record<GrantUrgency, string> = {
  active: "Active",
  new: "New",
  "closing-soon": "Closing Soon",
};
