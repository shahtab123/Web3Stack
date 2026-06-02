"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  API_CATEGORIES,
  getApiCategoryLabel,
  type ApiCategory,
} from "@/lib/api-directory";
import { cn } from "@/lib/utils";

type ApiCategoryNavProps = {
  counts: Partial<Record<ApiCategory, number>>;
  variant?: "sidebar" | "horizontal";
};

export function ApiCategoryNav({
  counts,
  variant = "sidebar",
}: ApiCategoryNavProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const activeCategory = searchParams.get("category") as ApiCategory | null;

  function selectCategory(slug: ApiCategory | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");

    startTransition(() => {
      router.push(`/apis?${params.toString()}`, { scroll: false });
    });
  }

  const isHorizontal = variant === "horizontal";

  return (
    <nav
      className={cn(
        isPending && "opacity-60",
        isHorizontal
          ? "flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          : "w-48 shrink-0 space-y-1 xl:w-52",
      )}
      aria-label="API categories"
    >
      {!isHorizontal && (
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Categories
        </p>
      )}

      <CategoryButton
        label="All"
        active={!activeCategory}
        onClick={() => selectCategory(null)}
        horizontal={isHorizontal}
      />

      {API_CATEGORIES.map((category) => (
        <CategoryButton
          key={category.slug}
          label={getApiCategoryLabel(category.slug)}
          count={counts[category.slug]}
          active={activeCategory === category.slug}
          onClick={() =>
            selectCategory(
              activeCategory === category.slug ? null : category.slug,
            )
          }
          horizontal={isHorizontal}
        />
      ))}
    </nav>
  );
}

function CategoryButton({
  label,
  count,
  active,
  onClick,
  horizontal,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
  horizontal: boolean;
}) {
  if (horizontal) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
          active
            ? "border-neutral-950 bg-neutral-950 text-neutral-50 dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
            : "border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400",
        )}
      >
        {label}
        {count != null && (
          <span className="ml-1 text-neutral-400">({count})</span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
        active
          ? "bg-neutral-950 font-medium text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
          : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900",
      )}
    >
      <span>{label}</span>
      {count != null && (
        <span className="text-xs tabular-nums text-neutral-400">{count}</span>
      )}
    </button>
  );
}
