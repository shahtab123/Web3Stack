import { getApiBySlug } from "@/lib/api-directory";
import type { ApiEntry } from "@/lib/api-directory";
import {
  getBrowseEcosystemsWithCounts,
  type BrowseEcosystemWithCounts,
} from "@/lib/browse-ecosystems";
import {
  FEATURED_API_BENTO_ORDER,
  FEATURED_API_BENTO_SIZE,
  SHOWCASE_ECOSYSTEM_SLUGS,
} from "@/lib/discover-home-data";
import { loadRecipeCatalog } from "@/lib/directory-db";
import { recipeDirectory } from "@/lib/recipe-directory-data";

export type FeaturedApiEntry = ApiEntry & {
  recipeCount: number;
  bentoSize: "large" | "medium";
};

export function getRecipeCountForApi(slug: string) {
  return recipeDirectory.filter((recipe) =>
    recipe.apis.some((api) => api.slug === slug),
  ).length;
}

export async function getFeaturedApisForHomepage(): Promise<FeaturedApiEntry[]> {
  const recipeCatalog = await loadRecipeCatalog();

  return FEATURED_API_BENTO_ORDER.map((slug) => {
    const api = getApiBySlug(slug);
    if (!api) return null;

    const recipeCount = recipeCatalog.filter((recipe) =>
      recipe.apis.some((entry) => entry.slug === slug),
    ).length;

    return {
      ...api,
      recipeCount,
      bentoSize: FEATURED_API_BENTO_SIZE[slug],
    };
  }).filter((api): api is FeaturedApiEntry => api !== null);
}

export async function getHomepageEcosystems(): Promise<
  BrowseEcosystemWithCounts[]
> {
  const all = await getBrowseEcosystemsWithCounts();
  const showcaseSlugs = new Set<string>(SHOWCASE_ECOSYSTEM_SLUGS);

  const featured = SHOWCASE_ECOSYSTEM_SLUGS.map((slug) =>
    all.find((ecosystem) => ecosystem.slug === slug),
  ).filter(
    (ecosystem): ecosystem is BrowseEcosystemWithCounts =>
      ecosystem !== undefined,
  );

  const rest = all.filter((ecosystem) => !showcaseSlugs.has(ecosystem.slug));

  return [...featured, ...rest];
}
