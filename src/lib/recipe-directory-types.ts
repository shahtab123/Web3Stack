export const RECIPE_CATEGORIES = [
  { slug: "trading", label: "Trading" },
  { slug: "payments", label: "Payments" },
  { slug: "cards", label: "Cards" },
  { slug: "wallets", label: "Wallets" },
  { slug: "ai", label: "AI" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "analytics", label: "Analytics" },
  { slug: "gaming", label: "Gaming" },
] as const;

export type RecipeCategory = (typeof RECIPE_CATEGORIES)[number]["slug"];

export const RECIPE_SOURCE_TYPES = [
  { slug: "documentation", label: "Documentation" },
  { slug: "github", label: "GitHub" },
  { slug: "template", label: "Template" },
  { slug: "demo-app", label: "Demo App" },
  { slug: "tutorial", label: "Tutorial" },
  { slug: "video", label: "Video" },
] as const;

export type RecipeSourceType = (typeof RECIPE_SOURCE_TYPES)[number]["slug"];

export const RECIPE_ECOSYSTEM_FILTERS = [
  "Base",
  "Ethereum",
  "Polygon",
  "Arbitrum",
  "Solana",
  "Sui",
  "Avalanche",
  "Aptos",
  "Starknet",
  "Hyperliquid",
] as const;

export type RecipeEcosystem = (typeof RECIPE_ECOSYSTEM_FILTERS)[number];

export const RECIPE_DIFFICULTIES = [
  { slug: "beginner", label: "Beginner" },
  { slug: "intermediate", label: "Intermediate" },
  { slug: "advanced", label: "Advanced" },
] as const;

export type RecipeDifficulty = (typeof RECIPE_DIFFICULTIES)[number]["slug"];

export const RECIPE_SETUP_TIMES = [
  { slug: "15-min", label: "15 Minutes" },
  { slug: "1-hour", label: "1 Hour" },
  { slug: "weekend", label: "Weekend Project" },
] as const;

export type RecipeSetupTime = (typeof RECIPE_SETUP_TIMES)[number]["slug"];

export type RecipeApi = {
  slug?: string;
  name: string;
};

export type RecipeLink = {
  label: string;
  url: string;
};

export type RecipeEntry = {
  slug: string;
  name: string;
  description: string;
  difficulty: RecipeDifficulty;
  setupTime: RecipeSetupTime;
  categories: RecipeCategory[];
  sourceType: RecipeSourceType;
  sourceLabel: string;
  ecosystems: RecipeEcosystem[];
  apis: RecipeApi[];
  techStack: string[];
  logoSlug?: string;
  thumbnailUrl?: string;
  screenshots: string[];
  githubUrl?: string | null;
  docsUrl?: string | null;
  sourceUrl: string;
  videoUrl?: string | null;
  isOpenSource: boolean;
  isFree: boolean;
  links: RecipeLink[];
  gettingStartedLinks: RecipeLink[];
  relatedRecipeSlugs: string[];
};

export type RecipeFilters = {
  q?: string;
  category?: RecipeCategory;
  source?: RecipeSourceType;
  ecosystem?: RecipeEcosystem;
  difficulty?: RecipeDifficulty;
  api?: string;
};

export function getRecipeCategoryLabel(slug: RecipeCategory) {
  return RECIPE_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function getRecipeSourceTypeLabel(slug: RecipeSourceType) {
  return RECIPE_SOURCE_TYPES.find((s) => s.slug === slug)?.label ?? slug;
}

export function getRecipeDifficultyLabel(slug: RecipeDifficulty) {
  return RECIPE_DIFFICULTIES.find((d) => d.slug === slug)?.label ?? slug;
}

export function getRecipeSetupTimeLabel(slug: RecipeSetupTime) {
  return RECIPE_SETUP_TIMES.find((t) => t.slug === slug)?.label ?? slug;
}

export function getRecipeEcosystemLabel(slug: RecipeEcosystem) {
  return slug;
}
