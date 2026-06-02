"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CategoryBrowseCard } from "@/components/categories/category-browse-card";
import { Input } from "@/components/ui/input";
import type { BrowseCategoryWithCounts } from "@/lib/browse-categories";

type CategoryGridProps = {
  categories: BrowseCategoryWithCounts[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return categories;

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(normalized) ||
        category.description.toLowerCase().includes(normalized) ||
        category.slug.includes(normalized),
    );
  }, [categories, query]);

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter categories..."
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No categories match your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((category) => (
            <CategoryBrowseCard key={category.slug} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
