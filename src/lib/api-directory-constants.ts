import type { ApiCategory } from "./api-directory-types";

export const API_DIRECTORY_SEARCH_PLACEHOLDERS = [
  "wallet authentication",
  "trading API",
  "card issuing",
  "bug bounty",
  "analytics",
  "stablecoin payments",
] as const;

export const API_DIRECTORY_QUICK_CATEGORIES: {
  slug: ApiCategory;
  label: string;
}[] = [
  { slug: "trading", label: "Trading" },
  { slug: "payments", label: "Payments" },
  { slug: "cards", label: "Cards" },
  { slug: "wallets", label: "Wallets" },
  { slug: "authentication", label: "Authentication" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "analytics", label: "Analytics" },
  { slug: "security", label: "Security" },
  { slug: "ai", label: "AI" },
  { slug: "gaming", label: "Gaming" },
  { slug: "identity", label: "Identity" },
  { slug: "compliance", label: "Compliance" },
];

export const API_DIRECTORY_SORT_OPTIONS = [
  { value: "alpha", label: "Alphabetical" },
  { value: "recent", label: "Recently Added" },
  { value: "referenced", label: "Most Referenced" },
  { value: "ecosystems", label: "Most Ecosystems" },
] as const;

export type ApiDirectorySort =
  (typeof API_DIRECTORY_SORT_OPTIONS)[number]["value"];

export const API_DIRECTORY_VIEW_KEY = "atlas-api-directory-view";

export const API_DIRECTORY_ECOSYSTEM_FILTERS = [
  "Ethereum",
  "Base",
  "Solana",
  "Arbitrum",
  "Sui",
  "Hyperliquid",
  "Optimism",
  "Polygon",
  "Avalanche",
  "Aptos",
  "Multi-chain",
  "Chain-agnostic",
] as const;

export const API_CAPABILITY_TAGS = [
  "Wallet Login",
  "Embedded Wallets",
  "Account Abstraction",
  "MPC",
  "Stablecoins",
  "Payments",
  "Card Issuing",
  "Virtual Cards",
  "Payroll",
  "Trading Bots",
  "Copy Trading",
  "Perps",
  "Trading API",
  "Market Data",
  "Oracles",
  "Indexing",
  "RPC",
  "Bug Bounty",
  "KYC",
  "AML",
  "Banking",
  "Passkeys",
  "Social Login",
  "AI Agents",
  "Analytics",
  "Treasury",
  "Custody",
  "On/Off Ramp",
  "Grants",
  "Hackathons",
] as const;

export type ApiTag = (typeof API_CAPABILITY_TAGS)[number];

/** Quick-filter subset shown first in directory advanced filters. */
export const POPULAR_API_TAGS = [
  "Wallet Login",
  "Embedded Wallets",
  "Stablecoins",
  "Trading Bots",
  "Card Issuing",
  "Market Data",
] as const satisfies readonly ApiTag[];
