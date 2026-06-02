import Link from "next/link";
import type { BrowseCategoryWithCounts } from "@/lib/browse-categories";

export function RelatedCategoryCard({
  category,
}: {
  category: BrowseCategoryWithCounts;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex w-[220px] shrink-0 flex-col rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <p className="font-medium group-hover:underline">{category.name}</p>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        {category.description}
      </p>
      <p className="mt-3 text-[10px] tabular-nums text-neutral-400">
        {category.apiCount} APIs · {category.recipeCount} recipes
      </p>
    </Link>
  );
}
