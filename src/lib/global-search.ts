import { getApis } from "./api-directory";
import { getApiCategoryLabel } from "./api-directory-types";
import { getBrowseEcosystemsWithCounts } from "./browse-ecosystems";
import { formatFundingStages, getFundingTypeLabel, getGrants } from "./grants-directory";
import { getIntelPosts } from "./intel-posts";
import { getPlatformLabel } from "./intel-posts-types";
import { getRecipes } from "./recipe-directory";

export const EXAMPLE_SEARCHES = [
  "trading",
  "wallet login",
  "bug bounty",
  "visa cards",
  "grants",
  "payroll",
] as const;

export type SearchResultType =
  | "api"
  | "recipe"
  | "ecosystem"
  | "grant"
  | "intel";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  meta?: string;
};

export type GlobalSearchResults = {
  query: string;
  apis: SearchResult[];
  recipes: SearchResult[];
  ecosystems: SearchResult[];
  grants: SearchResult[];
  intel: SearchResult[];
  total: number;
  flat: SearchResult[];
};

const SECTION_LIMIT = 8;

function normalizeQuery(query: string) {
  return query.toLowerCase().trim();
}

function queryWords(query: string) {
  return normalizeQuery(query).split(/\s+/).filter(Boolean);
}

function matchesText(text: string, query: string) {
  const words = queryWords(query);
  if (words.length === 0) return false;

  const haystack = text.toLowerCase();
  return words.every((word) => haystack.includes(word));
}

function matchesAny(query: string, parts: string[]) {
  return matchesText(parts.filter(Boolean).join(" "), query);
}

function searchApis(query: string, apis: Awaited<ReturnType<typeof getApis>>): SearchResult[] {
  return apis
    .filter((api) =>
      matchesAny(query, [
        api.name,
        api.description,
        api.purpose,
        api.overview,
        ...api.categories,
        ...api.ecosystems,
        ...api.commonUses,
        ...api.buildIdeas,
        ...api.useCases,
      ]),
    )
    .slice(0, SECTION_LIMIT)
    .map((api) => ({
      id: `api-${api.slug}`,
      type: "api" as const,
      title: api.name,
      description: api.description,
      href: `/apis/${api.slug}`,
      meta: api.categories.map(getApiCategoryLabel).slice(0, 2).join(" · "),
    }));
}

function searchRecipes(
  query: string,
  recipes: Awaited<ReturnType<typeof getRecipes>>,
): SearchResult[] {
  return recipes
    .filter((recipe) =>
      matchesAny(query, [
        recipe.name,
        recipe.description,
        ...recipe.categories,
        ...recipe.apis.map((api) => api.name),
      ]),
    )
    .slice(0, SECTION_LIMIT)
    .map((recipe) => ({
      id: `recipe-${recipe.slug}`,
      type: "recipe" as const,
      title: recipe.name,
      description: recipe.description,
      href: `/recipes/${recipe.slug}`,
      meta: recipe.sourceLabel,
    }));
}

function searchEcosystems(
  query: string,
  ecosystems: Awaited<ReturnType<typeof getBrowseEcosystemsWithCounts>>,
): SearchResult[] {
  return ecosystems
    .filter((ecosystem) =>
      matchesAny(query, [
        ecosystem.name,
        ecosystem.description,
        ecosystem.overview,
        ecosystem.slug,
      ]),
    )
    .slice(0, SECTION_LIMIT)
    .map((ecosystem) => ({
      id: `ecosystem-${ecosystem.slug}`,
      type: "ecosystem" as const,
      title: ecosystem.name,
      description: ecosystem.description,
      href: `/ecosystems/${ecosystem.slug}`,
      meta: `${ecosystem.apiCount} APIs · ${ecosystem.recipeCount} recipes`,
    }));
}

function searchGrants(
  query: string,
  grants: Awaited<ReturnType<typeof getGrants>>,
): SearchResult[] {
  return grants
    .filter((grant) =>
      matchesAny(query, [
        grant.name,
        grant.org,
        grant.description,
        grant.overview,
        grant.fundingType,
        getFundingTypeLabel(grant.fundingType, grant.fundingTypeLabel),
        formatFundingStages(grant.fundingStages),
        ...grant.ecosystemSlugs,
      ]),
    )
    .slice(0, SECTION_LIMIT)
    .map((grant) => ({
      id: `grant-${grant.slug}`,
      type: "grant" as const,
      title: grant.name,
      description: grant.description,
      href: `/grants/${grant.slug}`,
      meta: grant.fundingRange,
    }));
}

function searchIntel(
  query: string,
  posts: Awaited<ReturnType<typeof getIntelPosts>>,
): SearchResult[] {
  return posts
    .filter((post) =>
      matchesAny(query, [
        post.postUrl,
        post.platform,
        getPlatformLabel(post.platform),
        ...post.topics,
      ]),
    )
    .slice(0, SECTION_LIMIT)
    .map((post) => ({
      id: `intel-${post.id}`,
      type: "intel" as const,
      title: getPlatformLabel(post.platform),
      description: post.postUrl.replace(/^https?:\/\//, "").slice(0, 100),
      href: post.postUrl,
      external: true,
      meta: post.topics.join(" · "),
    }));
}

export async function globalSearch(query: string): Promise<GlobalSearchResults> {
  const normalized = normalizeQuery(query);

  if (!normalized) {
    return {
      query: normalized,
      apis: [],
      recipes: [],
      ecosystems: [],
      grants: [],
      intel: [],
      total: 0,
      flat: [],
    };
  }

  const [apis, recipes, ecosystems, grants, intelPosts] = await Promise.all([
    getApis(),
    getRecipes(),
    getBrowseEcosystemsWithCounts(),
    getGrants(),
    getIntelPosts(),
  ]);

  const apisResults = searchApis(normalized, apis);
  const recipesResults = searchRecipes(normalized, recipes);
  const ecosystemsResults = searchEcosystems(normalized, ecosystems);
  const grantsResults = searchGrants(normalized, grants);
  const intelResults = searchIntel(normalized, intelPosts);

  const flat = [
    ...apisResults,
    ...recipesResults,
    ...ecosystemsResults,
    ...grantsResults,
    ...intelResults,
  ];

  return {
    query: normalized,
    apis: apisResults,
    recipes: recipesResults,
    ecosystems: ecosystemsResults,
    grants: grantsResults,
    intel: intelResults,
    total: flat.length,
    flat,
  };
}

export const SEARCH_TYPE_LABELS: Record<SearchResultType, string> = {
  api: "API",
  recipe: "Recipe",
  ecosystem: "Ecosystem",
  grant: "Grant",
  intel: "Intel",
};

export const SEARCH_SECTIONS: {
  key: keyof Omit<GlobalSearchResults, "query" | "total" | "flat">;
  title: string;
  href: string;
}[] = [
  { key: "apis", title: "APIs", href: "/apis" },
  { key: "recipes", title: "Recipes", href: "/recipes" },
  { key: "ecosystems", title: "Ecosystems", href: "/ecosystems" },
  { key: "grants", title: "Grants", href: "/grants" },
  { key: "intel", title: "Builder Intel", href: "/builder-intel" },
];
