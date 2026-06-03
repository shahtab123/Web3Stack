import type { ApiEcosystem } from "./api-directory-types";
import { loadApiCatalog, loadRecipeCatalog } from "./directory-db";
import { ecosystemGrantsCatalog } from "./ecosystem-grants-data";
import { intelPostsCatalog } from "./intel-posts-data";
import type { IntelPostItem } from "./intel-posts-types";
import {
  getFeaturedProjectsForEcosystem,
  getResourcesForEcosystem,
} from "./ecosystem-portal-data";

export function getEcosystemPortalSubtitle(name: string) {
  return `Developer tools, APIs, grants and opportunities within the ${name} ecosystem.`;
}

export type BrowseEcosystem = {
  slug: string;
  name: string;
  description: string;
  subtitle: string;
  overview: string;
  apiTags: ApiEcosystem[];
  featuredApiSlugs: string[];
  relatedEcosystemSlugs: string[];
};

export const BROWSE_ECOSYSTEMS: BrowseEcosystem[] = [
  {
    slug: "base",
    name: "Base",
    description: "Coinbase L2 with fast, low-cost EVM transactions.",
    subtitle: "Developer tools, APIs, grants and opportunities on Base.",
    overview:
      "Build consumer apps and on-chain backends on Base with RPC providers, wallet auth, and analytics APIs.",
    apiTags: ["Base"],
    featuredApiSlugs: ["privy", "alchemy", "dune", "rainbowkit"],
    relatedEcosystemSlugs: ["ethereum", "optimism", "arbitrum"],
  },
  {
    slug: "ethereum",
    name: "Ethereum",
    description: "The leading smart contract platform and DeFi hub.",
    subtitle: "Developer tools, APIs, grants and opportunities on Ethereum.",
    overview:
      "Ship dApps, DeFi protocols, and wallet products with Ethereum-native infrastructure and data APIs.",
    apiTags: ["Ethereum"],
    featuredApiSlugs: ["alchemy", "privy", "the-graph", "dune"],
    relatedEcosystemSlugs: ["base", "arbitrum", "optimism"],
  },
  {
    slug: "solana",
    name: "Solana",
    description: "High-throughput chain with low fees and fast finality.",
    subtitle: "Developer tools, APIs, grants and opportunities on Solana.",
    overview:
      "Build trading, gaming, and consumer apps with Solana wallet tooling and oracle infrastructure.",
    apiTags: ["Solana"],
    featuredApiSlugs: ["helius", "jupiter-sdk", "metaplex", "privy"],
    relatedEcosystemSlugs: ["sui", "aptos", "hyperliquid"],
  },
  {
    slug: "hyperliquid",
    name: "Hyperliquid",
    description: "High-performance L1 focused on perpetuals trading.",
    subtitle: "Developer tools, APIs, grants and opportunities on Hyperliquid.",
    overview:
      "Ship trading frontends, bots, and analytics with Hyperliquid execution and oracle APIs.",
    apiTags: ["Hyperliquid"],
    featuredApiSlugs: ["hyperliquid", "pyth", "privy"],
    relatedEcosystemSlugs: ["ethereum", "solana", "arbitrum"],
  },
  {
    slug: "arbitrum",
    name: "Arbitrum",
    description: "Optimistic rollup scaling Ethereum with EVM compatibility.",
    subtitle: "Developer tools, APIs, grants and opportunities on Arbitrum.",
    overview:
      "Deploy L2 apps with shared Ethereum tooling — RPC, indexing, and wallet APIs all support Arbitrum.",
    apiTags: ["Arbitrum"],
    featuredApiSlugs: ["alchemy", "the-graph", "walletconnect", "rainbowkit"],
    relatedEcosystemSlugs: ["ethereum", "optimism", "base"],
  },
  {
    slug: "optimism",
    name: "Optimism",
    description: "Optimistic rollup and Superchain ecosystem for Ethereum scaling.",
    subtitle: "Developer tools, APIs, grants and opportunities on Optimism.",
    overview:
      "Build on OP Stack chains with EVM-compatible RPC, wallet, and analytics infrastructure.",
    apiTags: ["Optimism"],
    featuredApiSlugs: ["alchemy", "walletconnect", "the-graph", "dune"],
    relatedEcosystemSlugs: ["base", "arbitrum", "ethereum"],
  },
  {
    slug: "avalanche",
    name: "Avalanche",
    description: "Multi-subnet platform for custom blockchains and DeFi.",
    subtitle: "Developer tools, APIs, grants and opportunities on Avalanche.",
    overview:
      "Launch subnets and DeFi apps with node infrastructure and cross-chain analytics tooling.",
    apiTags: ["Avalanche"],
    featuredApiSlugs: ["alchemy", "dune"],
    relatedEcosystemSlugs: ["ethereum", "polygon", "arbitrum"],
  },
  {
    slug: "sui",
    name: "Sui",
    description: "Move-based L1 with parallel transaction execution.",
    subtitle: "Developer tools, APIs, grants and opportunities on Sui.",
    overview:
      "Build Move apps with oracle feeds, wallet onboarding, and ecosystem grant programs.",
    apiTags: ["Sui"],
    featuredApiSlugs: ["pyth"],
    relatedEcosystemSlugs: ["aptos", "solana", "ethereum"],
  },
  {
    slug: "aptos",
    name: "Aptos",
    description: "Move VM chain optimized for safe smart contract development.",
    subtitle: "Developer tools, APIs, grants and opportunities on Aptos.",
    overview:
      "Ship Move-based apps with oracle infrastructure and foundation grant support.",
    apiTags: ["Aptos"],
    featuredApiSlugs: ["pyth"],
    relatedEcosystemSlugs: ["sui", "solana", "ethereum"],
  },
  {
    slug: "polygon",
    name: "Polygon",
    description: "Ethereum scaling with PoS sidechain and zk rollups.",
    subtitle: "Developer tools, APIs, grants and opportunities on Polygon.",
    overview:
      "Deploy EVM apps on Polygon with shared Ethereum developer tooling and analytics APIs.",
    apiTags: ["Polygon"],
    featuredApiSlugs: ["alchemy", "the-graph", "dune"],
    relatedEcosystemSlugs: ["ethereum", "arbitrum", "base"],
  },
  {
    slug: "berachain",
    name: "Berachain",
    description: "EVM L1 with proof-of-liquidity consensus.",
    subtitle: "Developer tools, APIs, grants and opportunities on Berachain.",
    overview:
      "Early ecosystem for DeFi and gaming apps with emerging builder grant programs.",
    apiTags: ["Berachain"],
    featuredApiSlugs: [],
    relatedEcosystemSlugs: ["ethereum", "monad", "base"],
  },
  {
    slug: "monad",
    name: "Monad",
    description: "High-performance parallel EVM L1 blockchain.",
    subtitle: "Developer tools, APIs, grants and opportunities on Monad.",
    overview:
      "Build EVM-compatible apps with next-gen throughput and growing developer incentives.",
    apiTags: ["Monad"],
    featuredApiSlugs: [],
    relatedEcosystemSlugs: ["ethereum", "berachain", "base"],
  },
  {
    slug: "bitcoin",
    name: "Bitcoin",
    description: "Bitcoin, Lightning Network, and Bitcoin-anchored smart contract layers.",
    subtitle: "Developer tools, APIs, and apps for Bitcoin and Lightning.",
    overview:
      "Build payments, micropayments, and L2 apps with Lightning, wallet APIs, and Stacks.",
    apiTags: ["Bitcoin"],
    featuredApiSlugs: ["lnd", "alby", "stacks-sdk"],
    relatedEcosystemSlugs: ["ethereum", "base"],
  },
  {
    slug: "cosmos",
    name: "Cosmos",
    description: "Interconnected appchains with IBC and the Cosmos SDK.",
    subtitle: "Developer tools, APIs, and grants across Cosmos zones.",
    overview:
      "Ship IBC-native dapps with CosmJS, cross-chain routing, and zone-specific infrastructure.",
    apiTags: ["Cosmos"],
    featuredApiSlugs: ["cosmjs", "skip-protocol"],
    relatedEcosystemSlugs: ["ethereum", "solana"],
  },
  {
    slug: "ton",
    name: "TON",
    description: "The Open Network — Telegram-native chain for mini apps and payments.",
    subtitle: "Developer tools, SDKs, and mini app opportunities on TON.",
    overview:
      "Build bots, mini apps, and payment flows with the TON SDK and Telegram distribution.",
    apiTags: ["TON"],
    featuredApiSlugs: ["ton-sdk"],
    relatedEcosystemSlugs: ["solana", "base"],
  },
  {
    slug: "multi-chain",
    name: "Multi-chain",
    description: "Protocols and tooling that work across multiple blockchains.",
    subtitle: "Cross-chain APIs, bridges, and multichain developer infrastructure.",
    overview:
      "Explore wallets, indexers, and protocols designed for more than one chain from day one.",
    apiTags: ["Multi-chain"],
    featuredApiSlugs: ["alchemy", "privy", "layerzero", "wormhole"],
    relatedEcosystemSlugs: ["ethereum", "base", "solana"],
  },
  {
    slug: "chain-agnostic",
    name: "Chain-agnostic",
    description: "Off-chain and universal tools usable on any chain or without a chain.",
    subtitle: "Auth, AI, compliance, and platform APIs not tied to one network.",
    overview:
      "Find identity, analytics, AI, and compliance tooling that integrates regardless of chain choice.",
    apiTags: ["Chain-agnostic"],
    featuredApiSlugs: ["privy", "stripe", "ollama", "immunefi"],
    relatedEcosystemSlugs: ["ethereum", "multi-chain"],
  },
];

export type BrowseEcosystemWithCounts = BrowseEcosystem & {
  apiCount: number;
  recipeCount: number;
  grantCount: number;
  intelCount: number;
};

function uniqueBySlug<T extends { slug: string }>(items: T[]) {
  return Array.from(new Map(items.map((item) => [item.slug, item])).values());
}

export function getBrowseEcosystemBySlug(slug: string) {
  return BROWSE_ECOSYSTEMS.find((ecosystem) => ecosystem.slug === slug) ?? null;
}

export function getApisForBrowseEcosystem(
  ecosystem: BrowseEcosystem,
  catalog: Awaited<ReturnType<typeof loadApiCatalog>>,
) {
  return catalog.filter((api) =>
    ecosystem.apiTags.some((tag) => api.ecosystems.includes(tag)),
  );
}

export function getFeaturedApisForBrowseEcosystem(
  ecosystem: BrowseEcosystem,
  catalog: Awaited<ReturnType<typeof loadApiCatalog>>,
) {
  const all = getApisForBrowseEcosystem(ecosystem, catalog);
  const bySlug = new Map(all.map((api) => [api.slug, api]));

  const featured = ecosystem.featuredApiSlugs
    .map((slug) => bySlug.get(slug))
    .filter(Boolean) as typeof all;

  if (featured.length >= 4) return featured.slice(0, 6);

  const rest = all.filter(
    (api) => !featured.some((item) => item.slug === api.slug),
  );

  return [...featured, ...rest].slice(0, 6);
}

export function getRecipesForBrowseEcosystem(
  ecosystem: BrowseEcosystem,
  apiCatalog: Awaited<ReturnType<typeof loadApiCatalog>>,
  recipeCatalog: Awaited<ReturnType<typeof loadRecipeCatalog>>,
) {
  const apis = getApisForBrowseEcosystem(ecosystem, apiCatalog);
  const apiSlugs = new Set(apis.map((api) => api.slug));

  return uniqueBySlug(
    recipeCatalog.filter((recipe) =>
      recipe.apis.some((api) => api.slug && apiSlugs.has(api.slug)),
    ),
  );
}

export function getGrantsForBrowseEcosystem(ecosystem: BrowseEcosystem) {
  return ecosystemGrantsCatalog.filter((grant) =>
    grant.ecosystemSlugs.includes(ecosystem.slug),
  );
}

export function getIntelPostsForBrowseEcosystem(ecosystem: BrowseEcosystem) {
  return intelPostsCatalog.filter((post) =>
    post.ecosystemSlugs?.includes(ecosystem.slug),
  );
}

export function getIntelPostItemsForBrowseEcosystem(
  ecosystem: BrowseEcosystem,
  limit = 3,
): IntelPostItem[] {
  return getIntelPostsForBrowseEcosystem(ecosystem)
    .slice(0, limit)
    .map((entry, index) => ({
      id: index + 1,
      platform: entry.platform,
      postUrl: entry.postUrl,
      topics: entry.topics,
      createdAt: new Date(entry.createdAt),
    }));
}

export function getFeaturedProjectsForBrowseEcosystem(ecosystem: BrowseEcosystem) {
  return getFeaturedProjectsForEcosystem(ecosystem.slug);
}

export function getResourcesForBrowseEcosystem(ecosystem: BrowseEcosystem) {
  return getResourcesForEcosystem(ecosystem.slug);
}

async function countForEcosystem(
  ecosystem: BrowseEcosystem,
  apiCatalog: Awaited<ReturnType<typeof loadApiCatalog>>,
  recipeCatalog: Awaited<ReturnType<typeof loadRecipeCatalog>>,
): Promise<BrowseEcosystemWithCounts> {
  return {
    ...ecosystem,
    apiCount: getApisForBrowseEcosystem(ecosystem, apiCatalog).length,
    recipeCount: getRecipesForBrowseEcosystem(
      ecosystem,
      apiCatalog,
      recipeCatalog,
    ).length,
    grantCount: getGrantsForBrowseEcosystem(ecosystem).length,
    intelCount: getIntelPostsForBrowseEcosystem(ecosystem).length,
  };
}

export async function getBrowseEcosystemsWithCounts(): Promise<
  BrowseEcosystemWithCounts[]
> {
  const [apiCatalog, recipeCatalog] = await Promise.all([
    loadApiCatalog(),
    loadRecipeCatalog(),
  ]);

  return Promise.all(
    BROWSE_ECOSYSTEMS.map((ecosystem) =>
      countForEcosystem(ecosystem, apiCatalog, recipeCatalog),
    ),
  );
}

export async function getRelatedEcosystems(
  ecosystem: BrowseEcosystem,
): Promise<BrowseEcosystemWithCounts[]> {
  const [apiCatalog, recipeCatalog] = await Promise.all([
    loadApiCatalog(),
    loadRecipeCatalog(),
  ]);

  return Promise.all(
    ecosystem.relatedEcosystemSlugs
      .map((slug) => getBrowseEcosystemBySlug(slug))
      .filter((related): related is BrowseEcosystem => related !== null)
      .map((related) => countForEcosystem(related, apiCatalog, recipeCatalog)),
  );
}

export function getEcosystemSlugFromApiTag(name: string): string | null {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return getBrowseEcosystemBySlug(slug) ? slug : null;
}

export function getEcosystemHrefFromApiTag(name: string): string {
  const slug = getEcosystemSlugFromApiTag(name);
  return slug
    ? `/ecosystems/${slug}`
    : `/apis?ecosystem=${encodeURIComponent(name)}`;
}

export async function searchBrowseEcosystems(query: string) {
  const normalized = query.toLowerCase().trim();
  const ecosystems = await getBrowseEcosystemsWithCounts();
  if (!normalized) return ecosystems;

  return ecosystems.filter(
    (ecosystem) =>
      ecosystem.name.toLowerCase().includes(normalized) ||
      ecosystem.description.toLowerCase().includes(normalized) ||
      ecosystem.slug.includes(normalized),
  );
}
