import { apiDirectory } from "@/lib/api-directory-data";
import { ideasDirectory } from "@/lib/ideas-directory-data";
import { grantsDirectory } from "@/lib/grants-directory-data";
import { homepageEcosystems } from "@/lib/homepage-data";
import { intelPostsCatalog } from "@/lib/intel-posts-data";
import { recipeDirectory } from "@/lib/recipe-directory-data";
import { API_CATEGORIES } from "@/lib/api-directory-types";

const ecosystemSlugMap: Record<string, string> = {
  Ethereum: "ethereum",
  Base: "base",
  Solana: "solana",
  Arbitrum: "arbitrum",
  Optimism: "optimism",
  Polygon: "polygon",
  Hyperliquid: "hyperliquid",
  Avalanche: "avalanche",
  Sui: "sui",
  Aptos: "aptos",
  Berachain: "berachain",
  Monad: "monad",
  "Multi-chain": "multi-chain",
  "Chain-agnostic": "chain-agnostic",
};

export const seedEcosystems = [
  ...homepageEcosystems.map((e) => ({
    slug: ecosystemSlugMap[e.name] ?? e.name.toLowerCase().replace(/\s+/g, "-"),
    name: e.name,
    description: e.description,
  })),
  {
    slug: "multi-chain",
    name: "Multi-chain",
    description: "Cross-chain protocols and tooling",
  },
  {
    slug: "chain-agnostic",
    name: "Chain-agnostic",
    description: "Tools that work across any chain or off-chain",
  },
].filter(
  (eco, index, arr) => arr.findIndex((e) => e.slug === eco.slug) === index,
);

export const seedCategories = API_CATEGORIES.map((cat) => ({
  slug: cat.slug,
  name: cat.label,
}));

const apiEcosystemSlug: Record<string, string> = {
  Ethereum: "ethereum",
  Base: "base",
  Solana: "solana",
  Arbitrum: "arbitrum",
  Optimism: "optimism",
  Polygon: "polygon",
  Hyperliquid: "hyperliquid",
  Avalanche: "avalanche",
  Sui: "sui",
  Aptos: "aptos",
  Berachain: "berachain",
  Monad: "monad",
  "Multi-chain": "multi-chain",
  "Chain-agnostic": "chain-agnostic",
};

export const seedApis = apiDirectory.map((api) => ({
  slug: api.slug,
  name: api.name,
  description: api.description,
  purpose: api.purpose,
  website: api.url,
  openSource: api.isOpenSource,
  freeTier: api.isFree || api.isFreemium,
  ecosystemSlug: apiEcosystemSlug[api.ecosystems[0]] ?? "chain-agnostic",
  categorySlugs: api.categories,
}));

export const seedRecipes = recipeDirectory.map((recipe) => ({
  slug: recipe.slug,
  title: recipe.name,
  description: recipe.description,
  difficulty: recipe.difficulty,
  estimatedTime: recipe.setupTime,
  apiSlugs: recipe.apis.map((a) => a.slug).filter(Boolean) as string[],
}));

export const seedGrants = grantsDirectory.map((grant) => ({
  slug: grant.slug,
  title: grant.name,
  description: grant.description,
  link: grant.applyUrl,
  ecosystemSlug: grant.ecosystemSlug,
}));

export const seedIntelPosts = intelPostsCatalog.map((entry) => ({
  platform: entry.platform,
  postUrl: entry.postUrl,
  createdAt: new Date(entry.createdAt),
}));

export const seedIdeas = ideasDirectory.map((idea) => ({
  slug: idea.slug,
  title: idea.title,
  description: idea.description,
  overview: idea.overview,
  difficulty: idea.difficulty,
  estimatedTime: idea.estimatedBuildTime,
  category: idea.category,
  apiSlugs: idea.apiSlugs,
  ecosystemSlugs: idea.ecosystemSlugs,
  relatedIdeaSlugs: idea.relatedIdeaSlugs,
}));
