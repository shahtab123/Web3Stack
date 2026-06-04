import { Suspense } from "react";
import type { Metadata } from "next";
import { RecipeFilters } from "@/components/recipes/recipe-filters";
import { RecipeGalleryGrid } from "@/components/recipes/recipe-gallery-grid";
import {
  getRecipes,
  type RecipeCategory,
  type RecipeEcosystem,
  type RecipeSourceType,
} from "@/lib/recipe-directory";
import { RECIPE_ECOSYSTEM_FILTERS, RECIPE_SOURCE_TYPES } from "@/lib/recipe-directory-types";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Recipes",
  description:
    "Explore real applications, starter templates, demos and open-source projects built with popular Web3 APIs and ecosystems.",
  path: "/recipes",
});

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    source?: string;
    ecosystem?: string;
  }>;
};

function parseCategory(value: string | undefined): RecipeCategory | undefined {
  if (!value) return undefined;
  return value as RecipeCategory;
}

function parseSource(value: string | undefined): RecipeSourceType | undefined {
  if (!value) return undefined;
  return (RECIPE_SOURCE_TYPES as readonly { slug: string }[]).some(
    (item) => item.slug === value,
  )
    ? (value as RecipeSourceType)
    : undefined;
}

function parseEcosystem(value: string | undefined): RecipeEcosystem | undefined {
  if (!value) return undefined;
  return (RECIPE_ECOSYSTEM_FILTERS as readonly string[]).includes(value)
    ? (value as RecipeEcosystem)
    : undefined;
}

export default async function RecipesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters = {
    q: params.q,
    category: parseCategory(params.category),
    source: parseSource(params.source),
    ecosystem: parseEcosystem(params.ecosystem),
  };

  const recipes = await getRecipes(filters);
  const listResetKey = JSON.stringify(filters);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Recipes
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
          Explore real applications, starter templates, demos and open-source
          projects built with popular APIs and ecosystems.
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {recipes.length} project{recipes.length === 1 ? "" : "s"} to fork,
          study, or extend
        </p>
      </header>

      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />
        }
      >
        <RecipeFilters />
      </Suspense>

      {recipes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No projects match your filters.
          </p>
        </div>
      ) : (
        <RecipeGalleryGrid recipes={recipes} resetKey={listResetKey} />
      )}
    </div>
  );
}
