export const IDEA_DIFFICULTIES = [
  { slug: "beginner", label: "Beginner" },
  { slug: "intermediate", label: "Intermediate" },
  { slug: "advanced", label: "Advanced" },
] as const;

export type IdeaDifficulty = (typeof IDEA_DIFFICULTIES)[number]["slug"];

export const IDEA_CATEGORIES = [
  { slug: "trading", label: "Trading" },
  { slug: "payments", label: "Payments" },
  { slug: "cards", label: "Cards" },
  { slug: "wallets", label: "Wallets" },
  { slug: "ai", label: "AI" },
  { slug: "analytics", label: "Analytics" },
  { slug: "security", label: "Security" },
  { slug: "gaming", label: "Gaming" },
  { slug: "social", label: "Social & Community" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "commerce", label: "Commerce" },
  { slug: "discovery", label: "Discovery" },
] as const;

export type IdeaCategory = (typeof IDEA_CATEGORIES)[number]["slug"];

export const IDEA_GROUPS = [
  { slug: "crypto-finance", label: "Crypto & Finance" },
  { slug: "ai", label: "AI" },
  { slug: "agentic", label: "Agentic Apps" },
  { slug: "social", label: "Social Apps" },
  { slug: "utility", label: "Utility Apps" },
  { slug: "payments-apps", label: "Payments Apps" },
  { slug: "discovery-apps", label: "Discovery Apps" },
  { slug: "gaming", label: "Gaming" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "commerce", label: "Commerce" },
  { slug: "security", label: "Security" },
  { slug: "weird", label: "Weird But Interesting" },
] as const;

export type IdeaGroup = (typeof IDEA_GROUPS)[number]["slug"];

export type IdeaExample = {
  name: string;
  url: string;
};

export type IdeaEntry = {
  slug: string;
  title: string;
  description: string;
  overview: string;
  problem: string;
  suggestedFeatures: string[];
  difficulty: IdeaDifficulty;
  estimatedBuildTime: string;
  group: IdeaGroup;
  category: IdeaCategory;
  apiSlugs: string[];
  ecosystemSlugs: string[];
  relatedRecipeSlugs: string[];
  relatedIdeaSlugs: string[];
  examples: IdeaExample[];
};

export type IdeaFilters = {
  q?: string;
  filter?: string;
};

export type IdeaFilterChip = {
  key: string;
  filter: string;
  label: string;
};

export const IDEA_FILTER_CHIPS: IdeaFilterChip[] = [
  { key: "all", filter: "all", label: "All" },
  ...IDEA_GROUPS.map((g) => ({
    key: `group-${g.slug}`,
    filter: `group:${g.slug}`,
    label: g.label,
  })),
  ...IDEA_DIFFICULTIES.map((d) => ({
    key: `difficulty-${d.slug}`,
    filter: `difficulty:${d.slug}`,
    label: d.label,
  })),
  ...IDEA_CATEGORIES.map((c) => ({
    key: `category-${c.slug}`,
    filter: `category:${c.slug}`,
    label: c.label,
  })),
];

export function parseIdeaFilter(value: string | undefined) {
  if (!value || value === "all") return null;

  const colonIndex = value.indexOf(":");
  if (colonIndex === -1) {
    if (isIdeaGroup(value)) return { kind: "group" as const, slug: value };
    if (isIdeaCategory(value)) return { kind: "category" as const, slug: value };
    if (isIdeaDifficulty(value)) return { kind: "difficulty" as const, slug: value };
    return null;
  }

  const kind = value.slice(0, colonIndex);
  const slug = value.slice(colonIndex + 1);

  if (kind === "group" && isIdeaGroup(slug)) return { kind: "group", slug };
  if (kind === "category" && isIdeaCategory(slug)) return { kind: "category", slug };
  if (kind === "difficulty" && isIdeaDifficulty(slug)) return { kind: "difficulty", slug };

  return null;
}

export function getIdeaDifficultyLabel(slug: IdeaDifficulty) {
  return IDEA_DIFFICULTIES.find((d) => d.slug === slug)?.label ?? slug;
}

export function getIdeaCategoryLabel(slug: IdeaCategory) {
  return IDEA_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function getIdeaGroupLabel(slug: IdeaGroup) {
  return IDEA_GROUPS.find((g) => g.slug === slug)?.label ?? slug;
}

export function isIdeaDifficulty(value: string): value is IdeaDifficulty {
  return IDEA_DIFFICULTIES.some((d) => d.slug === value);
}

export function isIdeaCategory(value: string): value is IdeaCategory {
  return IDEA_CATEGORIES.some((c) => c.slug === value);
}

export function isIdeaGroup(value: string): value is IdeaGroup {
  return IDEA_GROUPS.some((g) => g.slug === value);
}
