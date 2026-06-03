import type { ApiTag } from "./api-directory-constants";

export type { ApiTag } from "./api-directory-constants";

export const API_CATEGORIES = [
  { slug: "trading", label: "Trading" },
  { slug: "payments", label: "Payments" },
  { slug: "cards", label: "Cards" },
  { slug: "banking", label: "Banking" },
  { slug: "wallets", label: "Wallets" },
  { slug: "authentication", label: "Authentication" },
  { slug: "ai", label: "AI" },
  { slug: "security", label: "Security" },
  { slug: "analytics", label: "Analytics" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "gaming", label: "Gaming" },
  { slug: "identity", label: "Identity" },
  { slug: "bug-bounty", label: "Bug Bounty" },
  { slug: "compliance", label: "Compliance" },
  { slug: "data", label: "Data" },
  { slug: "messaging-social", label: "Messaging & Social" },
  { slug: "oracles-rwa", label: "Oracles & Real World Data" },
  { slug: "defi-primitives", label: "DeFi Primitives" },
  { slug: "developer-experience", label: "Developer Experience" },
  { slug: "gasless-paymaster", label: "Gasless & Paymaster" },
  { slug: "privacy", label: "Privacy" },
] as const;

export type ApiCategory = (typeof API_CATEGORIES)[number]["slug"];

export const API_ECOSYSTEMS = [
  "Ethereum",
  "Base",
  "Solana",
  "Arbitrum",
  "Optimism",
  "Polygon",
  "Hyperliquid",
  "Avalanche",
  "Sui",
  "Aptos",
  "Berachain",
  "Monad",
  "Multi-chain",
  "Chain-agnostic",
  "Bitcoin",
  "Cosmos",
  "TON",
] as const;

export type ApiEcosystem = (typeof API_ECOSYSTEMS)[number];

export const API_TOOL_TYPES = [
  { slug: "api", label: "API" },
  { slug: "sdk", label: "SDK" },
  { slug: "platform", label: "Platform" },
  { slug: "protocol", label: "Protocol" },
  { slug: "service", label: "Service" },
] as const;

export type ApiToolType = (typeof API_TOOL_TYPES)[number]["slug"];

export type ApiLink = {
  label: string;
  url: string;
};

export type RelatedApi = {
  slug?: string;
  name: string;
  url?: string;
};

export type ApiInput = {
  slug: string;
  name: string;
  description: string;
  purpose: string;
  overview?: string;
  problemSolved?: string;
  commonUses?: string[];
  useCases?: string[];
  buildIdeas?: string[];
  whatCanYouBuild?: string[];
  popularRecipes: string[];
  relatedApis?: RelatedApi[];
  similarTools?: RelatedApi[];
  categories: ApiCategory[];
  ecosystems: ApiEcosystem[];
  tags?: ApiTag[];
  isOpenSource: boolean;
  isFree: boolean;
  isFreemium: boolean;
  hasGrantProgram: boolean;
  hasApiAvailable?: boolean;
  hasSdkAvailable?: boolean;
  isHackathonFriendly?: boolean;
  grantInfo?: string | null;
  links?: ApiLink[];
  url: string;
  githubUrl?: string | null;
  docsUrl?: string | null;
  updatedAt?: string;
  toolType?: ApiToolType;
};

export type ApiEntry = {
  slug: string;
  name: string;
  description: string;
  purpose: string;
  overview: string;
  problemSolved: string;
  commonUses: string[];
  useCases: string[];
  buildIdeas: string[];
  whatCanYouBuild: string[];
  popularRecipes: string[];
  relatedApis: RelatedApi[];
  similarTools: RelatedApi[];
  categories: ApiCategory[];
  ecosystems: ApiEcosystem[];
  tags: ApiTag[];
  toolType: ApiToolType;
  isOpenSource: boolean;
  isFree: boolean;
  isFreemium: boolean;
  hasGrantProgram: boolean;
  hasApiAvailable: boolean;
  hasSdkAvailable: boolean;
  isHackathonFriendly: boolean;
  grantInfo: string | null;
  links: ApiLink[];
  url: string;
  githubUrl?: string | null;
  docsUrl?: string | null;
  updatedAt: string;
};

export type ApiSort = "recent" | "alpha" | "referenced" | "ecosystems";

export type ApiFilters = {
  q?: string;
  category?: ApiCategory;
  ecosystem?: ApiEcosystem;
  tag?: ApiTag;
  type?: ApiToolType;
  free?: boolean;
  freemium?: boolean;
  oss?: boolean;
  grant?: boolean;
  hasApi?: boolean;
  hasSdk?: boolean;
  sort?: ApiSort;
};

export function getApiToolTypeLabel(slug: ApiToolType) {
  return API_TOOL_TYPES.find((type) => type.slug === slug)?.label ?? slug;
}

export function getApiCategoryLabel(slug: ApiCategory) {
  return API_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

/** e.g. "Infrastructure: RPC, Indexing" for listing cards */
export function formatApiCategoryWithTags(
  category: ApiCategory | undefined,
  tags: string[],
  maxTags = 4,
) {
  const visibleTags = tags.slice(0, maxTags);
  const categoryLabel = category ? getApiCategoryLabel(category) : null;

  if (!categoryLabel && visibleTags.length === 0) return null;
  if (!categoryLabel) return visibleTags.join(", ");
  if (visibleTags.length === 0) return categoryLabel;
  return `${categoryLabel}: ${visibleTags.join(", ")}`;
}

const GENERIC_API_ECOSYSTEMS = new Set<ApiEcosystem>([
  "Multi-chain",
  "Chain-agnostic",
]);

export function ecosystemToLogoSlug(name: ApiEcosystem) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/** Prefer concrete chains over generic multi-chain labels on listing cards. */
export function getDisplayEcosystems(ecosystems: ApiEcosystem[], max = 3) {
  const specific = ecosystems.filter((e) => !GENERIC_API_ECOSYSTEMS.has(e));
  const list = specific.length > 0 ? specific : ecosystems;
  const visible = list.slice(0, max);
  const overflow = Math.max(0, list.length - max);
  return { visible, overflow };
}

export function isFreeOrFreemium(api: ApiEntry) {
  return api.isFree || api.isFreemium;
}
