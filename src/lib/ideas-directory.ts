import { getApiBySlug } from "./api-directory";
import { getBrowseEcosystemBySlug } from "./browse-ecosystems";
import { ideasDirectory } from "./ideas-directory-data";
import { loadIdeaCatalog } from "./directory-db";
import type {
  IdeaCategory,
  IdeaDifficulty,
  IdeaEntry,
  IdeaFilters,
  IdeaGroup,
} from "./ideas-directory-types";
import {
  IDEA_CATEGORIES,
  IDEA_DIFFICULTIES,
  IDEA_GROUPS,
  getIdeaCategoryLabel,
  getIdeaDifficultyLabel,
  getIdeaGroupLabel,
  parseIdeaFilter,
} from "./ideas-directory-types";
import { getRecipeBySlug, dedupeRecipesBySlug } from "./recipe-directory";

export async function getIdeas(
  filters: IdeaFilters = {},
): Promise<IdeaEntry[]> {
  const catalog = await loadIdeaCatalog();
  let results = [...catalog];

  if (filters.filter && filters.filter !== "all") {
    const parsed = parseIdeaFilter(filters.filter);

    if (parsed?.kind === "difficulty") {
      results = results.filter((idea) => idea.difficulty === parsed.slug);
    } else if (parsed?.kind === "category") {
      results = results.filter((idea) => idea.category === parsed.slug);
    } else if (parsed?.kind === "group") {
      results = results.filter((idea) => idea.group === parsed.slug);
    }
  }

  if (filters.q) {
    const query = filters.q.toLowerCase().trim();
    results = results.filter(
      (idea) =>
        idea.title.toLowerCase().includes(query) ||
        idea.description.toLowerCase().includes(query) ||
        idea.overview.toLowerCase().includes(query) ||
        getIdeaCategoryLabel(idea.category).toLowerCase().includes(query) ||
        getIdeaGroupLabel(idea.group).toLowerCase().includes(query),
    );
  }

  return results.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getGroupedIdeas(filters: IdeaFilters = {}) {
  const results = await getIdeas(filters);
  return IDEA_GROUPS.map((group) => ({
    group,
    ideas: results.filter((idea) => idea.group === group.slug),
  })).filter((section) => section.ideas.length > 0);
}

export function getIdeaBySlug(slug: string): IdeaEntry | null {
  return ideasDirectory.find((idea) => idea.slug === slug) ?? null;
}

export function getSuggestedApisForIdea(idea: IdeaEntry) {
  return idea.apiSlugs
    .map((slug) => getApiBySlug(slug))
    .filter((api): api is NonNullable<typeof api> => api !== null);
}

export function getSuggestedEcosystemsForIdea(idea: IdeaEntry) {
  return idea.ecosystemSlugs
    .map((slug) => getBrowseEcosystemBySlug(slug))
    .filter((eco): eco is NonNullable<typeof eco> => eco !== null);
}

export function getRelatedRecipesForIdea(idea: IdeaEntry) {
  return dedupeRecipesBySlug(
    idea.relatedRecipeSlugs
      .map((slug) => getRecipeBySlug(slug))
      .filter((recipe): recipe is NonNullable<typeof recipe> => recipe !== null),
  );
}

export function getRelatedIdeasForIdea(idea: IdeaEntry) {
  return idea.relatedIdeaSlugs
    .map((slug) => getIdeaBySlug(slug))
    .filter((related): related is IdeaEntry => related !== null);
}

export {
  IDEA_CATEGORIES,
  IDEA_DIFFICULTIES,
  IDEA_FILTER_CHIPS,
  IDEA_GROUPS,
  getIdeaCategoryLabel,
  getIdeaDifficultyLabel,
  getIdeaGroupLabel,
} from "./ideas-directory-types";

export { ideasDirectory } from "./ideas-directory-data";

export type { IdeaEntry, IdeaCategory, IdeaDifficulty, IdeaFilters, IdeaGroup };
