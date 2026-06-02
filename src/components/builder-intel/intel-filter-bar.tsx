"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  INTEL_PLATFORMS,
  INTEL_TOPICS,
  type IntelFilter,
} from "@/lib/intel-posts-types";
import { cn } from "@/lib/utils";

const FILTER_CHIPS: { slug: IntelFilter; label: string }[] = [
  { slug: "all", label: "All" },
  ...INTEL_PLATFORMS.map((p) => ({ slug: p.slug as IntelFilter, label: p.label })),
  ...INTEL_TOPICS.map((t) => ({ slug: t.slug as IntelFilter, label: t.label })),
];

export function IntelFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const activeFilter = (searchParams.get("filter") ?? "all") as IntelFilter;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all") params.set(key, value);
        else params.delete(key);
      });

      startTransition(() => {
        router.push(`/builder-intel?${params.toString()}`, { scroll: false });
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

  return (
    <div className={cn("space-y-4", isPending && "opacity-60")}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bookmarks..."
          className="h-11 pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.slug}
            type="button"
            onClick={() => updateParams({ filter: chip.slug === "all" ? null : chip.slug })}
            className={cn(
              "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
              activeFilter === chip.slug ||
                (chip.slug === "all" && !searchParams.get("filter"))
                ? "border-neutral-950 bg-neutral-950 text-neutral-50 dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-400",
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
