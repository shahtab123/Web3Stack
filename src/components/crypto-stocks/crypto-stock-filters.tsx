"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import {
  CRYPTO_STOCK_FILTER_CHIPS,
  CRYPTO_STOCK_SORT_OPTIONS,
  type CryptoStockSort,
} from "@/lib/crypto-stocks-directory";
import { cn } from "@/lib/utils";

export function CryptoStockFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeFilter = searchParams.get("category") ?? "all";
  const sort = (searchParams.get("sort") as CryptoStockSort | null) ?? "market-cap";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all") params.set(key, value);
        else params.delete(key);
      });

      startTransition(() => {
        router.push(`/crypto-stocks?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  return (
    <div className={cn(isPending && "opacity-60")}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
          {CRYPTO_STOCK_FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip.slug;

            return (
              <button
                key={chip.slug}
                type="button"
                onClick={() =>
                  updateParams({
                    category: chip.slug === "all" ? null : chip.slug,
                  })
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

        <label className="ml-auto flex shrink-0 items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          Sort by
          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value || null })}
            aria-label="Sort crypto stocks"
            className="rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-xs text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
          >
            {CRYPTO_STOCK_SORT_OPTIONS.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
