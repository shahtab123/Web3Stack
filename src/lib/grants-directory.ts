import { BROWSE_ECOSYSTEMS, getBrowseEcosystemBySlug } from "./browse-ecosystems";
import { getApiBySlug } from "./api-directory";
import { dedupeRecipesBySlug, getRecipeBySlug } from "./recipe-directory";
import { grantsDirectory } from "./grants-directory-data";
import { loadGrantCatalog } from "./directory-db";
import type {
  BuilderType,
  FundingStage,
  FundingType,
  GrantEntry,
  GrantFilters,
  GrantSort,
  GrantStatus,
} from "./grants-directory-types";
import {
  BUILDER_TYPES,
  FUNDING_STAGES,
  FUNDING_TYPES,
  GRANT_SORT_OPTIONS,
  GRANT_STATUSES,
  formatFundingStages,
  getBuilderTypeLabel,
  getFundingStageLabel,
  getFundingTypeLabel,
  getGrantStatusLabel,
  isBuilderType,
  isFundingStage,
  isFundingType,
  isGrantSort,
} from "./grants-directory-types";

const GRANT_SLUG_ALIASES: Record<string, string> = {
  "base-grants": "base-builder-program",
};

export async function getGrants(
  filters: GrantFilters = {},
): Promise<GrantEntry[]> {
  const catalog = await loadGrantCatalog();
  let results = [...catalog];

  if (filters.status) {
    results = results.filter((grant) => grant.status === filters.status);
  }

  if (filters.ecosystem) {
    results = results.filter((grant) =>
      grant.ecosystemSlugs.includes(filters.ecosystem!),
    );
  }

  if (filters.fundingType) {
    results = results.filter(
      (grant) => grant.fundingType === filters.fundingType,
    );
  }

  if (filters.fundingStage) {
    results = results.filter(
      (grant) =>
        grant.fundingStages.includes(filters.fundingStage!) ||
        grant.fundingStages.includes("open-to-all"),
    );
  }

  if (filters.builderType) {
    results = results.filter((grant) =>
      grant.builderTypes.includes(filters.builderType!),
    );
  }

  if (filters.q) {
    const query = filters.q.toLowerCase();
    results = results.filter(
      (grant) =>
        grant.name.toLowerCase().includes(query) ||
        grant.description.toLowerCase().includes(query) ||
        grant.org.toLowerCase().includes(query) ||
        getFundingTypeLabel(grant.fundingType, grant.fundingTypeLabel)
          .toLowerCase()
          .includes(query) ||
        formatFundingStages(grant.fundingStages).toLowerCase().includes(query) ||
        getEcosystemName(grant.ecosystemSlug).toLowerCase().includes(query),
    );
  }

  return sortGrants(results, filters.sort);
}

function sortGrants(results: GrantEntry[], sort?: GrantSort) {
  const resolvedSort = sort && isGrantSort(sort) ? sort : "deadline-soonest";

  switch (resolvedSort) {
    case "newest":
      return [...results].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case "highest-funding":
      return [...results].sort(
        (a, b) => b.fundingAmountMax - a.fundingAmountMax,
      );
    case "most-beginner-friendly":
      return [...results].sort(
        (a, b) => b.beginnerFriendlyScore - a.beginnerFriendlyScore,
      );
    case "deadline-soonest":
    default:
      return [...results].sort(
        (a, b) => a.deadlineSortOrder - b.deadlineSortOrder,
      );
  }
}

export function getGrantBySlug(slug: string): GrantEntry | null {
  const resolved = GRANT_SLUG_ALIASES[slug] ?? slug;
  return grantsDirectory.find((grant) => grant.slug === resolved) ?? null;
}

export function getEcosystemName(slug: string) {
  return (
    BROWSE_ECOSYSTEMS.find((ecosystem) => ecosystem.slug === slug)?.name ?? slug
  );
}

export function getGrantEcosystemOptions() {
  return BROWSE_ECOSYSTEMS.map((ecosystem) => ({
    slug: ecosystem.slug,
    name: ecosystem.name,
  }));
}

export function getRelatedApisForGrant(grant: GrantEntry) {
  return grant.relatedApiSlugs
    .map((slug) => getApiBySlug(slug))
    .filter((api): api is NonNullable<typeof api> => api !== null);
}

export function getRelatedRecipesForGrant(grant: GrantEntry) {
  return dedupeRecipesBySlug(
    grant.relatedRecipeSlugs
      .map((slug) => getRecipeBySlug(slug))
      .filter((recipe): recipe is NonNullable<typeof recipe> => recipe !== null),
  );
}

export function getRelatedEcosystemForGrant(grant: GrantEntry) {
  return getBrowseEcosystemBySlug(grant.ecosystemSlug);
}

export {
  grantsDirectory,
  GRANT_STATUSES,
  FUNDING_TYPES,
  FUNDING_STAGES,
  BUILDER_TYPES,
  GRANT_SORT_OPTIONS,
  getGrantStatusLabel,
  getFundingTypeLabel,
  getFundingStageLabel,
  getBuilderTypeLabel,
  formatFundingStages,
};

export type {
  GrantEntry,
  GrantFilters,
  GrantStatus,
  FundingType,
  FundingStage,
  BuilderType,
  GrantSort,
};

/** @deprecated Use FUNDING_TYPES */
export const GRANT_TYPES = FUNDING_TYPES;
/** @deprecated Use getFundingTypeLabel */
export { getGrantTypeLabel } from "./grants-directory-types";
