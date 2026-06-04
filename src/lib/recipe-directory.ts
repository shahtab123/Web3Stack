import { recipeDirectory } from "./recipe-directory-data";
import { loadRecipeCatalog } from "./directory-db";
import type {
  RecipeCategory,
  RecipeDifficulty,
  RecipeEntry,
  RecipeEcosystem,
  RecipeFilters,
  RecipeSourceType,
} from "./recipe-directory-types";

const RECIPE_SLUG_ALIASES: Record<string, string> = {
  "agentkit-examples": "agentkit",
  "trading-platform": "hyperliquid-trading-bot",
  "trading-bot-starter": "hyperliquid-trading-bot",
  "copy-trading-platform": "hyperliquid-copy-trading-bot",
  "wallet-login-system": "onchain-commerce-shop",
  "wallet-login-starter": "onchain-commerce-shop",
  "crypto-neobank": "payroll-dashboard",
  "fantasy-trading-game": "portfolio-tracker",
  "payroll-app": "payroll-dashboard",
  "bug-bounty-platform": "web3-security-bounty-tracker",
  "ai-trading-agent": "ai-trading-agent-demo",
  "defi-dashboard": "defi-analytics-dashboard",
  "nft-marketplace": "thirdweb-nft-marketplace",
  "nft-marketplace-template": "thirdweb-nft-marketplace",
  "ai-support-bot": "agentkit",
  "socialfi-app": "hey-social-app",
  "base-mini-app-starter": "base-social-mini-app",
  "tribe-copy-trading": "tribe-mini-app",
  "ens-integration-starter": "ens-manager-app",
  "farcaster-frames-starter": "farcaster-mint-frame",
  "lens-social-starter": "hey-social-app",
  "aave-lending-demo": "defi-lending-app",
  "xmtp-agent-examples": "xmtp-messaging-agent",
  "agentkit-vercel-ai-sdk": "onchain-agent-demo",
  "n8n-agentkit-integration": "onchain-agent-demo",
  "thirdweb-dapp-starter": "thirdweb-nft-marketplace",
  "safe-react-app-template": "safe-wallet-web",
  "the-graph-subgraph-starter": "uniswap-pool-explorer",
  "moralis-web3-boilerplate": "moralis-nft-drop-app",
  "alchemy-account-abstraction-starter": "onchain-commerce-shop",
  "solana-wallet-starter": "solana-pay-store",
  "sui-move-starter": "sui-kiosk-marketplace",
  "gno": "gno-smart-contracts",
  "intentkit": "intentkit-agent-cluster",
  "hyper-alpha-arena": "hyper-alpha-arena",
  "polymarket-bot": "polymarket-trading-bot",
  "dapp-starter": "dapp-starter-jellydn",
  "turbo-eth-template": "turbo-eth-web3-app",
  "flow-telegram": "flow-telegram-quickstarts",
};

function recipeSortScore(recipe: RecipeEntry) {
  let score = 0;
  if (recipe.isOpenSource) score += 4;
  if (recipe.isFree) score += 2;
  return score;
}

export async function getRecipes(
  filters: RecipeFilters = {},
): Promise<RecipeEntry[]> {
  const catalog = await loadRecipeCatalog();
  let results = [...catalog];

  if (filters.q) {
    const query = filters.q.toLowerCase();
    results = results.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.sourceLabel.toLowerCase().includes(query) ||
        recipe.techStack.some((item) => item.toLowerCase().includes(query)) ||
        recipe.apis.some((api) => api.name.toLowerCase().includes(query)) ||
        recipe.categories.some((cat) => cat.includes(query)),
    );
  }

  if (filters.category) {
    results = results.filter((recipe) =>
      recipe.categories.includes(filters.category!),
    );
  }

  if (filters.source) {
    results = results.filter((recipe) => recipe.sourceType === filters.source);
  }

  if (filters.ecosystem) {
    results = results.filter((recipe) =>
      recipe.ecosystems.includes(filters.ecosystem!),
    );
  }

  if (filters.difficulty) {
    results = results.filter(
      (recipe) => recipe.difficulty === filters.difficulty,
    );
  }

  if (filters.api) {
    results = results.filter((recipe) =>
      recipe.apis.some(
        (api) =>
          api.slug === filters.api ||
          api.name.toLowerCase() === filters.api!.toLowerCase(),
      ),
    );
  }

  return results.sort((a, b) => {
    const scoreDiff = recipeSortScore(b) - recipeSortScore(a);
    if (scoreDiff !== 0) return scoreDiff;
    return a.name.localeCompare(b.name);
  });
}

export function getRecipeBySlug(slug: string): RecipeEntry | null {
  const resolved = RECIPE_SLUG_ALIASES[slug] ?? slug;
  return recipeDirectory.find((recipe) => recipe.slug === resolved) ?? null;
}

export function dedupeRecipesBySlug(recipes: RecipeEntry[]): RecipeEntry[] {
  const seen = new Set<string>();

  return recipes.filter((recipe) => {
    if (seen.has(recipe.slug)) return false;
    seen.add(recipe.slug);
    return true;
  });
}

export async function getRelatedRecipes(
  recipe: RecipeEntry,
  limit = 4,
): Promise<RecipeEntry[]> {
  const catalog = await loadRecipeCatalog();
  const related = dedupeRecipesBySlug(
    recipe.relatedRecipeSlugs
      .map((slug) => catalog.find((entry) => entry.slug === slug) ?? null)
      .filter((entry): entry is RecipeEntry => entry !== null),
  );

  if (related.length >= limit) return related.slice(0, limit);

  const seen = new Set([recipe.slug, ...related.map((item) => item.slug)]);
  const fallback = catalog.filter(
    (entry) =>
      !seen.has(entry.slug) &&
      entry.categories.some((category) => recipe.categories.includes(category)),
  );

  return dedupeRecipesBySlug([...related, ...fallback]).slice(0, limit);
}

export function getRecipeCategoryCounts() {
  const counts: Partial<Record<RecipeCategory, number>> = {};

  for (const recipe of recipeDirectory) {
    for (const category of recipe.categories) {
      counts[category] = (counts[category] ?? 0) + 1;
    }
  }

  return counts;
}

export function getRecipeApiOptions() {
  const seen = new Map<string, string>();

  for (const recipe of recipeDirectory) {
    for (const api of recipe.apis) {
      const key = api.slug ?? api.name.toLowerCase();
      if (!seen.has(key)) seen.set(key, api.name);
    }
  }

  return Array.from(seen.entries())
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function hasActiveRecipeFilters(filters: RecipeFilters) {
  return Boolean(
    filters.q ||
      filters.category ||
      filters.source ||
      filters.ecosystem ||
      filters.difficulty ||
      filters.api,
  );
}

export { recipeDirectory };
export {
  RECIPE_SOURCE_PLATFORMS,
} from "./recipe-directory-constants";
export type {
  RecipeEntry,
  RecipeCategory,
  RecipeDifficulty,
  RecipeEcosystem,
  RecipeFilters,
  RecipeSourceType,
};
export {
  RECIPE_CATEGORIES,
  RECIPE_DIFFICULTIES,
  RECIPE_ECOSYSTEM_FILTERS,
  RECIPE_SETUP_TIMES,
  RECIPE_SOURCE_TYPES,
  getRecipeCategoryLabel,
  getRecipeDifficultyLabel,
  getRecipeEcosystemLabel,
  getRecipeSetupTimeLabel,
  getRecipeSourceTypeLabel,
} from "./recipe-directory-types";
