"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IDEA_FILTER_CHIPS } from "@/lib/ideas-directory";
import { cn } from "@/lib/utils";

export function IdeaFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const activeFilter = searchParams.get("filter") ?? "all";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all") params.set(key, value);
        else params.delete(key);
      });

      startTransition(() => {
        router.push(`/ideas?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = searchParams.get("q") ?? "";
      if (query !== current) updateParams({ q: query || null });
    }, 250);

    return () => clearTimeout(timeout);
  }, [query, searchParams, updateParams]);

  return (
    <div className={cn("space-y-4", isPending && "opacity-60")}>
      <div className="relative mx-auto max-w-xl">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search ideas..."
          className="pl-9"
          aria-label="Search ideas"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {IDEA_FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip.filter;

          return (
            <button
              key={chip.key}
              type="button"
              onClick={() =>
                updateParams({ filter: chip.filter === "all" ? null : chip.filter })
              }
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs transition-colors",
                isActive
                  ? "border-neutral-950 bg-neutral-950 text-neutral-50 dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-50",
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
