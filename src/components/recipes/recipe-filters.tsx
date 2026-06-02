"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  RECIPE_CATEGORIES,
  RECIPE_ECOSYSTEM_FILTERS,
  RECIPE_SOURCE_TYPES,
  type RecipeCategory,
  type RecipeEcosystem,
  type RecipeSourceType,
} from "@/lib/recipe-directory";
import { cn } from "@/lib/utils";

export function RecipeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const category = searchParams.get("category") as RecipeCategory | null;
  const source = searchParams.get("source") as RecipeSourceType | null;
  const ecosystem = searchParams.get("ecosystem") as RecipeEcosystem | null;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      startTransition(() => {
        router.push(`/recipes?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = searchParams.get("q") ?? "";
      if (query !== current) updateParams({ q: query || null });
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, searchParams, updateParams]);

  const activeCount = [category, source, ecosystem].filter(Boolean).length;

  return (
    <div className={cn("space-y-4", isPending && "opacity-60")}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, templates, APIs, ecosystems..."
          className="pl-9"
        />
      </div>

      <FilterSection title="Category">
        {RECIPE_CATEGORIES.map((item) => (
          <FilterPill
            key={item.slug}
            label={item.label}
            active={category === item.slug}
            onClick={() =>
              updateParams({
                category: category === item.slug ? null : item.slug,
              })
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Source Type">
        {RECIPE_SOURCE_TYPES.map((item) => (
          <FilterPill
            key={item.slug}
            label={item.label}
            active={source === item.slug}
            onClick={() =>
              updateParams({
                source: source === item.slug ? null : item.slug,
              })
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Ecosystem">
        {RECIPE_ECOSYSTEM_FILTERS.map((item) => (
          <FilterPill
            key={item}
            label={item}
            active={ecosystem === item}
            onClick={() =>
              updateParams({
                ecosystem: ecosystem === item ? null : item,
              })
            }
          />
        ))}
      </FilterSection>

      {activeCount > 0 ? (
        <button
          type="button"
          onClick={() =>
            updateParams({ category: null, source: null, ecosystem: null })
          }
          className="text-xs text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline dark:hover:text-neutral-200"
        >
          Clear filters
        </button>
      ) : null}
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-8 items-center rounded-full border px-3 text-xs transition-colors",
        active
          ? "border-neutral-950 bg-neutral-950 text-neutral-50 dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
          : "border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400",
      )}
    >
      {label}
    </button>
  );
}
