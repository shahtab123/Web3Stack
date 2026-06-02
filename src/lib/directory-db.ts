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

  return mergeCatalogBySlugs(slugs, apiDirectory);
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

  return mergeCatalogBySlugs(slugs, grantsDirectory);
});

export const loadIdeaCatalog = cache(async (): Promise<IdeaEntry[]> => {
  const slugs = await loadSlugsFromTable(async () => {
    const db = getDb();
    return db.select({ slug: ideas.slug }).from(ideas);
  });

  return mergeCatalogBySlugs(slugs, ideasDirectory);
});
