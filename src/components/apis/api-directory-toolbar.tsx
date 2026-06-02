"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Grid3X3, List } from "lucide-react";
import {
  API_DIRECTORY_SORT_OPTIONS,
  API_DIRECTORY_VIEW_KEY,
  type ApiDirectorySort,
} from "@/lib/api-directory-constants";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

type ApiDirectoryToolbarProps = {
  resultCount: number;
  onViewChange: (view: ViewMode) => void;
  view: ViewMode;
};

export function ApiDirectoryToolbar({
  resultCount,
  onViewChange,
  view,
}: ApiDirectoryToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const sort = (searchParams.get("sort") as ApiDirectorySort | null) ?? "alpha";

  const updateSort = useCallback(
    (value: ApiDirectorySort) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "alpha") params.delete("sort");
      else params.set("sort", value);

      startTransition(() => {
        router.push(`/apis?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-800",
        isPending && "opacity-60",
      )}
    >
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {resultCount} {resultCount === 1 ? "API" : "APIs"}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(event) =>
              updateSort(event.target.value as ApiDirectorySort)
            }
            className="h-9 rounded-md border border-neutral-200 bg-background px-2 text-sm dark:border-neutral-800"
          >
            {API_DIRECTORY_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex rounded-md border border-neutral-200 p-0.5 dark:border-neutral-800">
          <ViewButton
            active={view === "grid"}
            label="Grid view"
            onClick={() => onViewChange("grid")}
          >
            <Grid3X3 className="size-4" />
          </ViewButton>
          <ViewButton
            active={view === "list"}
            label="List view"
            onClick={() => onViewChange("list")}
          >
            <List className="size-4" />
          </ViewButton>
        </div>
      </div>
    </div>
  );
}

function ViewButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-sm transition-colors",
        active
          ? "bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
          : "text-neutral-500",
      )}
    >
      {children}
    </button>
  );
}

export function useApiDirectoryView() {
  const [view, setView] = useState<ViewMode>("grid");

  useEffect(() => {
    const stored = localStorage.getItem(API_DIRECTORY_VIEW_KEY);
    if (stored === "grid" || stored === "list") setView(stored);
  }, []);

  function updateView(next: ViewMode) {
    setView(next);
    localStorage.setItem(API_DIRECTORY_VIEW_KEY, next);
  }

  return [view, updateView] as const;
}
