"use client";

import { RecipeGalleryCard } from "@/components/recipes/recipe-gallery-card";
import { IncrementalListStatus } from "@/components/ui/incremental-list-status";
import type { RecipeEntry } from "@/lib/recipe-directory-types";
import { useIncrementalList } from "@/lib/use-incremental-list";

type RecipeGalleryGridProps = {
  recipes: RecipeEntry[];
  resetKey?: string;
};

export function RecipeGalleryGrid({ recipes, resetKey }: RecipeGalleryGridProps) {
  const { visibleItems, visibleCount, hasMore, sentinelRef, total, pageSize } =
    useIncrementalList(recipes, undefined, resetKey);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((recipe) => (
          <RecipeGalleryCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>

      <IncrementalListStatus
        visibleCount={visibleCount}
        total={total}
        pageSize={pageSize}
        hasMore={hasMore}
        sentinelRef={sentinelRef}
        noun="projects"
      />
    </div>
  );
}
