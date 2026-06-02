"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CATEGORIES, PRICING_OPTIONS, type Category, type Pricing } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ToolFiltersProps = {
  basePath?: string;
  showSort?: boolean;
};

export function ToolFilters({ basePath = "/tools", showSort = true }: ToolFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const category = searchParams.get("category") as Category | null;
  const pricing = searchParams.get("pricing") as Pricing | null;
  const sort = searchParams.get("sort") ?? "featured";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      startTransition(() => {
        router.push(`${basePath}?${params.toString()}`);
      });
    },
    [basePath, router, searchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = searchParams.get("q") ?? "";
      if (query !== current) {
        updateParams({ q: query || null });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, searchParams, updateParams]);

  return (
    <div className={cn("space-y-4", isPending && "opacity-60")}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          placeholder="Search tools, tags, descriptions..."
          value={query}
          className="pl-9"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={!category}
            onClick={() => updateParams({ category: null })}
          />
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat.value}
              label={cat.label}
              active={category === cat.value}
              onClick={() =>
                updateParams({
                  category: category === cat.value ? null : cat.value,
                })
              }
            />
          ))}
        </div>

        {showSort && (
          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm dark:border-neutral-800 dark:bg-neutral-950"
          >
            <option value="featured">Featured first</option>
            <option value="name">Name A–Z</option>
            <option value="newest">Newest</option>
          </select>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip
          label="All pricing"
          active={!pricing}
          onClick={() => updateParams({ pricing: null })}
        />
        {PRICING_OPTIONS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            active={pricing === option.value}
            onClick={() =>
              updateParams({
                pricing: pricing === option.value ? null : option.value,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
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
        "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-neutral-950 bg-neutral-950 text-neutral-50 dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
          : "border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600",
      )}
    >
      {label}
    </button>
  );
}
