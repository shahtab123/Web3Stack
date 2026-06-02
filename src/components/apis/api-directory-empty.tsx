import Link from "next/link";
import { API_DIRECTORY_QUICK_CATEGORIES } from "@/lib/api-directory-constants";
import type { ApiCategory } from "@/lib/api-directory";
import { getApiCategoryLabel } from "@/lib/api-directory";

type ApiDirectoryEmptyProps = {
  activeCategory?: ApiCategory;
};

export function ApiDirectoryEmpty({ activeCategory }: ApiDirectoryEmptyProps) {
  const suggestions = activeCategory
    ? API_DIRECTORY_QUICK_CATEGORIES.filter(
        (category) => category.slug !== activeCategory,
      ).slice(0, 4)
    : API_DIRECTORY_QUICK_CATEGORIES.slice(0, 6);

  return (
    <div className="rounded-lg border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-neutral-700">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        No APIs found matching your search.
      </p>
      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Try a related category
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {suggestions.map((category) => (
            <Link
              key={category.slug}
              href={`/apis?category=${category.slug}`}
              className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
            >
              {getApiCategoryLabel(category.slug)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
