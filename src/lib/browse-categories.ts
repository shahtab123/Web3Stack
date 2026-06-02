import type { ApiCategory, ApiEcosystem } from "./api-directory-types";
import { getEcosystemHrefFromApiTag } from "./browse-ecosystems";
import { loadApiCatalog, loadRecipeCatalog } from "./directory-db";
import { homepageEcosystems } from "./homepage-data";
import type { RecipeCategory } from "./recipe-directory-types";

export type BrowseCategory = {
  slug: string;
  name: string;
  description: string;
  subtitle: string;
  overview: string;
  apiCategories: ApiCategory[];
  recipeCategories: RecipeCategory[];
  ecosystems: ApiEcosystem[];
  featuredApiSlugs: string[];
  relatedCategorySlugs: string[];
};

export const BROWSE_CATEGORIES: BrowseCategory[] = [
  {
    slug: "trading",
    name: "Trading",
    description:
      "Trading APIs, exchanges, market data and automation tools.",
    subtitle:
      "Infrastructure, APIs and tools for building trading applications.",
    overview:
      "Combine exchange APIs, oracle feeds, and wallet auth to ship spot, perps, and automation products.",
    apiCategories: ["trading", "data"],
    recipeCategories: ["trading"],
    ecosystems: ["Hyperliquid", "Ethereum", "Multi-chain"],
    featuredApiSlugs: ["hyperliquid", "pyth", "dune", "alchemy"],
    relatedCategorySlugs: ["analytics", "infrastructure", "wallets"],
  },
  {
    slug: "payments",
    name: "Payments",
    description:
      "Payment processors, stablecoins, checkout and payroll tools.",
    subtitle:
      "Infrastructure, APIs and tools for building payment applications.",
    overview:
      "Connect checkout, payouts, and bank rails with processors and stablecoin treasury APIs.",
    apiCategories: ["payments", "banking"],
    recipeCategories: ["payments"],
    ecosystems: ["Chain-agnostic", "Ethereum", "Base"],
    featuredApiSlugs: ["stripe", "plaid", "circle", "marble"],
    relatedCategorySlugs: ["cards", "compliance", "wallets"],
  },
  {
    slug: "cards",
    name: "Cards",
    description:
      "Virtual cards, Visa integrations and card issuing platforms.",
    subtitle:
      "Infrastructure, APIs and tools for building card programs.",
    overview:
      "Issue virtual and physical cards, manage spend controls, and link crypto treasuries to card rails.",
    apiCategories: ["cards"],
    recipeCategories: ["cards"],
    ecosystems: ["Chain-agnostic", "Multi-chain"],
    featuredApiSlugs: ["marble", "rain", "circle", "stripe"],
    relatedCategorySlugs: ["payments", "compliance", "wallets"],
  },
  {
    slug: "wallets",
    name: "Wallets",
    description:
      "Wallet infrastructure and embedded wallet solutions.",
    subtitle:
      "Infrastructure, APIs and tools for building wallet experiences.",
    overview:
      "Embed wallets, connect external signers, and handle multi-chain sessions in your app.",
    apiCategories: ["wallets"],
    recipeCategories: ["wallets"],
    ecosystems: ["Ethereum", "Base", "Solana", "Multi-chain"],
    featuredApiSlugs: ["privy", "walletconnect", "rainbowkit"],
    relatedCategorySlugs: ["authentication", "infrastructure", "trading"],
  },
  {
    slug: "authentication",
    name: "Authentication",
    description:
      "User onboarding, passkeys and wallet login providers.",
    subtitle:
      "Infrastructure, APIs and tools for building auth flows.",
    overview:
      "Ship email, passkey, and wallet login with embedded wallet and session management APIs.",
    apiCategories: ["authentication", "identity"],
    recipeCategories: ["wallets"],
    ecosystems: ["Ethereum", "Base", "Solana", "Chain-agnostic"],
    featuredApiSlugs: ["privy", "supabase", "walletconnect", "rainbowkit"],
    relatedCategorySlugs: ["wallets", "identity", "infrastructure"],
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    description:
      "RPC providers, indexing and blockchain infrastructure.",
    subtitle:
      "Infrastructure, APIs and tools for building on-chain backends.",
    overview:
      "Run nodes, index chain data, and query protocols with RPC and subgraph infrastructure.",
    apiCategories: ["infrastructure", "data"],
    recipeCategories: ["infrastructure"],
    ecosystems: ["Ethereum", "Base", "Arbitrum", "Polygon"],
    featuredApiSlugs: ["alchemy", "the-graph", "supabase", "pyth"],
    relatedCategorySlugs: ["analytics", "trading", "wallets"],
  },
  {
    slug: "analytics",
    name: "Analytics",
    description: "Data providers and analytics tools.",
    subtitle:
      "Infrastructure, APIs and tools for building data products.",
    overview:
      "Query on-chain metrics, build dashboards, and feed analytics into trading or DeFi apps.",
    apiCategories: ["analytics", "data"],
    recipeCategories: ["trading", "analytics"],
    ecosystems: ["Ethereum", "Multi-chain", "Hyperliquid"],
    featuredApiSlugs: ["dune", "the-graph", "pyth", "chainalysis"],
    relatedCategorySlugs: ["trading", "infrastructure", "compliance"],
  },
  {
    slug: "ai",
    name: "AI",
    description: "AI agents, inference providers and AI infrastructure.",
    subtitle:
      "Infrastructure, APIs and tools for building AI-powered applications.",
    overview:
      "Run models locally or via API, route providers, and wire agents into your product workflows.",
    apiCategories: ["ai"],
    recipeCategories: ["ai"],
    ecosystems: ["Chain-agnostic"],
    featuredApiSlugs: ["ollama", "huggingface", "litellm"],
    relatedCategorySlugs: ["infrastructure", "trading", "security"],
  },
  {
    slug: "security",
    name: "Security",
    description: "Auditing, bug bounties and transaction protection.",
    subtitle:
      "Infrastructure, APIs and tools for building secure applications.",
    overview:
      "Coordinate bounties, screen transactions, and integrate audit workflows into your stack.",
    apiCategories: ["security", "bug-bounty"],
    recipeCategories: ["infrastructure"],
    ecosystems: ["Ethereum", "Multi-chain"],
    featuredApiSlugs: ["immunefi", "chainalysis"],
    relatedCategorySlugs: ["compliance", "infrastructure", "wallets"],
  },
  {
    slug: "identity",
    name: "Identity",
    description: "ENS, reputation systems and identity protocols.",
    subtitle:
      "Infrastructure, APIs and tools for building identity layers.",
    overview:
      "Resolve names, attach reputation, and link accounts across wallets and social graphs.",
    apiCategories: ["identity"],
    recipeCategories: ["wallets"],
    ecosystems: ["Ethereum", "Base", "Multi-chain"],
    featuredApiSlugs: ["privy", "supabase"],
    relatedCategorySlugs: ["authentication", "wallets", "compliance"],
  },
  {
    slug: "gaming",
    name: "Gaming",
    description: "Game infrastructure and gaming-focused tools.",
    subtitle:
      "Infrastructure, APIs and tools for building gaming applications.",
    overview:
      "Power leaderboards, in-game economies, and wallet onboarding for web3 games.",
    apiCategories: ["gaming"],
    recipeCategories: ["gaming"],
    ecosystems: ["Ethereum", "Solana", "Multi-chain"],
    featuredApiSlugs: ["privy", "alchemy", "supabase"],
    relatedCategorySlugs: ["wallets", "authentication", "trading"],
  },
  {
    slug: "compliance",
    name: "Compliance",
    description: "KYC, AML and regulatory tools.",
    subtitle:
      "Infrastructure, APIs and tools for building compliant applications.",
    overview:
      "Screen users and transactions, connect banking data, and meet regulatory requirements.",
    apiCategories: ["compliance"],
    recipeCategories: ["payments", "infrastructure"],
    ecosystems: ["Chain-agnostic", "Ethereum"],
    featuredApiSlugs: ["chainalysis", "plaid", "stripe"],
    relatedCategorySlugs: ["payments", "security", "identity"],
  },
];

export type BrowseCategoryWithCounts = BrowseCategory & {
  apiCount: number;
  recipeCount: number;
};

const ECOSYSTEM_DESCRIPTIONS: Record<string, string> = Object.fromEntries(
  homepageEcosystems.map((eco) => [eco.name, eco.description]),
);

function uniqueBySlug<T extends { slug: string }>(items: T[]) {
  return Array.from(new Map(items.map((item) => [item.slug, item])).values());
}

export function getApisForBrowseCategory(
  category: BrowseCategory,
  catalog: Awaited<ReturnType<typeof loadApiCatalog>>,
) {
  return uniqueBySlug(
    catalog.filter((api) =>
      api.categories.some((cat) => category.apiCategories.includes(cat)),
    ),
  );
}

export function getFeaturedApisForBrowseCategory(
  category: BrowseCategory,
  catalog: Awaited<ReturnType<typeof loadApiCatalog>>,
) {
  const all = getApisForBrowseCategory(category, catalog);
  const bySlug = new Map(all.map((api) => [api.slug, api]));

  const featured = category.featuredApiSlugs
    .map((slug) => bySlug.get(slug))
    .filter(Boolean) as typeof all;

  if (featured.length >= 4) return featured.slice(0, 6);

  const rest = all.filter(
    (api) => !featured.some((item) => item.slug === api.slug),
  );

  return [...featured, ...rest].slice(0, 6);
}

export function getRecipesForBrowseCategory(
  category: BrowseCategory,
  catalog: Awaited<ReturnType<typeof loadRecipeCatalog>>,
) {
  return uniqueBySlug(
    catalog.filter((recipe) =>
      recipe.categories.some((cat) =>
        category.recipeCategories.includes(cat),
      ),
    ),
  );
}

export function getPopularRecipesForBrowseCategory(
  category: BrowseCategory,
  catalog: Awaited<ReturnType<typeof loadRecipeCatalog>>,
  limit = 4,
) {
  return getRecipesForBrowseCategory(category, catalog).slice(0, limit);
}

export function getEcosystemsForBrowseCategory(
  category: BrowseCategory,
  catalog: Awaited<ReturnType<typeof loadApiCatalog>>,
) {
  const apis = getApisForBrowseCategory(category, catalog);
  const fromApis = new Set<ApiEcosystem>();
  apis.forEach((api) => api.ecosystems.forEach((eco) => fromApis.add(eco)));
  category.ecosystems.forEach((eco) => fromApis.add(eco));
  return Array.from(fromApis);
}

export function getPopularEcosystemsForBrowseCategory(
  category: BrowseCategory,
  catalog: Awaited<ReturnType<typeof loadApiCatalog>>,
) {
  return getEcosystemsForBrowseCategory(category, catalog)
    .slice(0, 6)
    .map((name) => ({
      name,
      description:
        ECOSYSTEM_DESCRIPTIONS[name] ??
        "Ecosystem tools and APIs in this category.",
      href: getEcosystemHrefFromApiTag(name),
    }));
}

export async function getRelatedCategories(
  category: BrowseCategory,
): Promise<BrowseCategoryWithCounts[]> {
  const [apiCatalog, recipeCatalog] = await Promise.all([
    loadApiCatalog(),
    loadRecipeCatalog(),
  ]);

  return category.relatedCategorySlugs
    .map((slug) => getBrowseCategoryBySlug(slug))
    .filter((related): related is BrowseCategory => related !== null)
    .map((related) => ({
      ...related,
      apiCount: getApisForBrowseCategory(related, apiCatalog).length,
      recipeCount: getRecipesForBrowseCategory(related, recipeCatalog).length,
    }));
}

export function getBrowseCategoryBySlug(slug: string) {
  return BROWSE_CATEGORIES.find((category) => category.slug === slug) ?? null;
}

export async function getBrowseCategoriesWithCounts(): Promise<
  BrowseCategoryWithCounts[]
> {
  const [apiCatalog, recipeCatalog] = await Promise.all([
    loadApiCatalog(),
    loadRecipeCatalog(),
  ]);

  return BROWSE_CATEGORIES.map((category) => ({
    ...category,
    apiCount: getApisForBrowseCategory(category, apiCatalog).length,
    recipeCount: getRecipesForBrowseCategory(category, recipeCatalog).length,
  }));
}

export async function searchBrowseCategories(query: string) {
  const normalized = query.toLowerCase().trim();
  const categories = await getBrowseCategoriesWithCounts();
  if (!normalized) return categories;

  return categories.filter(
    (category) =>
      category.name.toLowerCase().includes(normalized) ||
      category.description.toLowerCase().includes(normalized) ||
      category.slug.includes(normalized),
  );
}
