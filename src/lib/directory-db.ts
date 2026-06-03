import { cache } from "react";
import { getDb, isDatabaseConfigured } from "@/db";
import { apis, grants, ideas, recipes } from "@/db/schema";
import { apiDirectory } from "./api-directory-data";
import type { ApiEntry } from "./api-directory-types";
import { grantsDirectory } from "./grants-directory-data";
import type { GrantEntry } from "./grants-directory-types";
import { ideasDirectory } from "./ideas-directory-data";
import type { IdeaEntry } from "./ideas-directory-types";
import { recipeDirectory } from "./recipe-directory-data";
import type { RecipeEntry } from "./recipe-directory-types";

async function loadSlugsFromTable(
  query: () => Promise<{ slug: string }[]>,
): Promise<string[] | null> {
  if (!isDatabaseConfigured()) return null;

  try {
    const rows = await query();
    if (rows.length === 0) return null;
    return rows.map((row) => row.slug);
  } catch {
    return null;
  }
}

function mergeCatalogBySlugs<T extends { slug: string }>(
  slugs: string[] | null,
  catalog: T[],
): T[] {
  if (!slugs) return catalog;

  const bySlug = new Map(catalog.map((item) => [item.slug, item]));
  const merged = slugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is T => item != null);

  return merged.length > 0 ? merged : catalog;
}

export const loadApiCatalog = cache(async (): Promise<ApiEntry[]> => {
  const slugs = await loadSlugsFromTable(async () => {
    const db = getDb();
    return db.select({ slug: apis.slug }).from(apis);
  });

  if (!slugs) return apiDirectory;

  const bySlug = new Map(apiDirectory.map((item) => [item.slug, item]));
  const seen = new Set<string>();
  const ordered: ApiEntry[] = [];

  for (const slug of slugs) {
    const item = bySlug.get(slug);
    if (item) {
      ordered.push(item);
      seen.add(slug);
    }
  }

  for (const item of apiDirectory) {
    if (!seen.has(item.slug)) {
      ordered.push(item);
    }
  }

  return ordered.length > 0 ? ordered : apiDirectory;
});

export const loadRecipeCatalog = cache(async (): Promise<RecipeEntry[]> => {
  const slugs = await loadSlugsFromTable(async () => {
    const db = getDb();
    return db.select({ slug: recipes.slug }).from(recipes);
  });

  return mergeCatalogBySlugs(slugs, recipeDirectory);
});

export const loadGrantCatalog = cache(async (): Promise<GrantEntry[]> => {
  const slugs = await loadSlugsFromTable(async () => {
    const db = getDb();
    return db.select({ slug: grants.slug }).from(grants);
  });

  if (!slugs) return grantsDirectory;

  const bySlug = new Map(grantsDirectory.map((item) => [item.slug, item]));
  const seen = new Set<string>();
  const ordered: GrantEntry[] = [];

  for (const slug of slugs) {
    const item = bySlug.get(slug);
    if (item) {
      ordered.push(item);
      seen.add(slug);
    }
  }

  for (const item of grantsDirectory) {
    if (!seen.has(item.slug)) {
      ordered.push(item);
    }
  }

  return ordered.length > 0 ? ordered : grantsDirectory;
});

export const loadIdeaCatalog = cache(async (): Promise<IdeaEntry[]> => {
  const slugs = await loadSlugsFromTable(async () => {
    const db = getDb();
    return db.select({ slug: ideas.slug }).from(ideas);
  });

  if (!slugs) return ideasDirectory;

  const bySlug = new Map(ideasDirectory.map((item) => [item.slug, item]));
  const seen = new Set<string>();
  const ordered: IdeaEntry[] = [];

  for (const slug of slugs) {
    const item = bySlug.get(slug);
    if (item) {
      ordered.push(item);
      seen.add(slug);
    }
  }

  for (const item of ideasDirectory) {
    if (!seen.has(item.slug)) {
      ordered.push(item);
    }
  }

  return ordered.length > 0 ? ordered : ideasDirectory;
});
