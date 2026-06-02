import Link from "next/link";
import type { BrowseCategoryWithCounts } from "@/lib/browse-categories";

export function CategoryBrowseCard({
  category,
}: {
  category: BrowseCategoryWithCounts;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
    >
      <h2 className="text-lg font-semibold tracking-tight group-hover:underline">
        {category.name}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {category.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-4 border-t border-neutral-100 pt-4 text-xs text-neutral-500 dark:border-neutral-900 dark:text-neutral-400">
        <span>
          <span className="font-semibold tabular-nums text-neutral-950 dark:text-neutral-50">
            {category.apiCount}
          </span>{" "}
          APIs
        </span>
        <span>
          <span className="font-semibold tabular-nums text-neutral-950 dark:text-neutral-50">
            {category.recipeCount}
          </span>{" "}
          Recipes
        </span>
      </div>
    </Link>
  );
}
