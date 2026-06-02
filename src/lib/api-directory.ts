import type { ApiTag } from "./api-directory-constants";
import { apiDirectory } from "./api-directory-data";
import { loadApiCatalog } from "./directory-db";
import type {
  ApiCategory,
  ApiEcosystem,
  ApiEntry,
  ApiFilters,
  ApiSort,
  ApiToolType,
} from "./api-directory-types";

const referenceCounts = buildReferenceCounts();

function buildReferenceCounts() {
  const counts = new Map<string, number>();

  for (const api of apiDirectory) {
    for (const ref of [...api.relatedApis, ...api.similarTools]) {
      if (!ref.slug) continue;
      counts.set(ref.slug, (counts.get(ref.slug) ?? 0) + 1);
    }
  }

  return counts;
}

function sortApis(results: ApiEntry[], sort: ApiSort = "alpha") {
  switch (sort) {
    case "recent":
      return results.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    case "referenced":
      return results.sort(
        (a, b) =>
          (referenceCounts.get(b.slug) ?? 0) -
          (referenceCounts.get(a.slug) ?? 0),
      );
    case "ecosystems":
      return results.sort((a, b) => b.ecosystems.length - a.ecosystems.length);
    case "alpha":
    default:
      return results.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function filterApiCatalog(
  catalog: ApiEntry[],
  filters: ApiFilters = {},
): ApiEntry[] {
  let results = [...catalog];

  if (filters.q) {
    const query = filters.q.toLowerCase();
    results = results.filter(
      (api) =>
        api.name.toLowerCase().includes(query) ||
        api.description.toLowerCase().includes(query) ||
        api.purpose.toLowerCase().includes(query) ||
        api.commonUses.some((use) => use.toLowerCase().includes(query)) ||
        api.categories.some(
          (category) =>
            category.includes(query) ||
            category.replace("-", " ").includes(query),
        ) ||
        api.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  if (filters.tag) {
    results = results.filter((api) => api.tags.includes(filters.tag!));
  }

  if (filters.category) {
    results = results.filter((api) =>
      api.categories.includes(filters.category!),
    );
  }

  if (filters.ecosystem) {
    results = results.filter((api) =>
      api.ecosystems.includes(filters.ecosystem!),
    );
  }

  if (filters.type) {
    results = results.filter((api) => api.toolType === filters.type);
  }

  if (filters.free) {
    results = results.filter((api) => api.isFree);
  }

  if (filters.freemium) {
    results = results.filter((api) => api.isFreemium);
  }

  if (filters.oss) {
    results = results.filter((api) => api.isOpenSource);
  }

  if (filters.grant) {
    results = results.filter((api) => api.hasGrantProgram);
  }

  if (filters.hasApi) {
    results = results.filter((api) => api.hasApiAvailable);
  }

  if (filters.hasSdk) {
    results = results.filter((api) => api.hasSdkAvailable);
  }

  return sortApis(results, filters.sort ?? "alpha");
}

export async function getApis(filters: ApiFilters = {}): Promise<ApiEntry[]> {
  const catalog = await loadApiCatalog();
  return filterApiCatalog(catalog, filters);
}

export function getApiCategoryCounts() {
  const counts: Partial<Record<ApiCategory, number>> = {};

  for (const api of apiDirectory) {
    for (const category of api.categories) {
      counts[category] = (counts[category] ?? 0) + 1;
    }
  }

  return counts;
}

export function getApiEcosystemCounts() {
  const counts: Partial<Record<ApiEcosystem, number>> = {};

  for (const api of apiDirectory) {
    for (const ecosystem of api.ecosystems) {
      counts[ecosystem] = (counts[ecosystem] ?? 0) + 1;
    }
  }

  return counts;
}

export function getPopularApiTags(limit = 8) {
  const counts = getApiCategoryCounts();

  return Object.entries(counts)
    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
    .slice(0, limit)
    .map(([slug]) => slug as ApiCategory);
}

export function hasActiveApiFilters(filters: ApiFilters) {
  return Boolean(
    filters.q ||
      filters.category ||
      filters.ecosystem ||
      filters.tag ||
      filters.type ||
      filters.free ||
      filters.freemium ||
      filters.oss ||
      filters.grant ||
      filters.hasApi ||
      filters.hasSdk,
  );
}

export function getApiBySlug(slug: string): ApiEntry | null {
  return apiDirectory.find((api) => api.slug === slug) ?? null;
}

export function resolveRelatedApi(related: ApiEntry["relatedApis"][number]) {
  if (related.slug) {
    const api = getApiBySlug(related.slug);
    if (api) {
      return {
        name: api.name,
        href: `/apis/${api.slug}` as const,
        external: false,
      };
    }
  }
  if (related.url) {
    return { name: related.name, href: related.url, external: true };
  }
  return { name: related.name, href: null, external: false };
}

export function resolveSimilarTool(tool: ApiEntry["similarTools"][number]) {
  return resolveRelatedApi(tool);
}

export { apiDirectory };

export type { ApiEntry, ApiCategory, ApiEcosystem, ApiFilters, ApiSort, ApiToolType, ApiTag };
export {
  API_CATEGORIES,
  API_ECOSYSTEMS,
  API_TOOL_TYPES,
  getApiCategoryLabel,
  getApiToolTypeLabel,
} from "./api-directory-types";
export {
  API_CAPABILITY_TAGS,
  POPULAR_API_TAGS,
} from "./api-directory-constants";
