"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  API_CATEGORIES,
  API_ECOSYSTEMS,
  type ApiCategory,
  type ApiEcosystem,
} from "@/lib/api-directory";
import { cn } from "@/lib/utils";

type ApiDirectorySidebarProps = {
  categoryCounts: Partial<Record<ApiCategory, number>>;
  ecosystemCounts: Partial<Record<ApiEcosystem, number>>;
};

export function ApiDirectorySidebar({
  categoryCounts,
  ecosystemCounts,
}: ApiDirectorySidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") as ApiCategory | null;
  const activeEcosystem = searchParams.get("ecosystem") as ApiEcosystem | null;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      startTransition(() => {
        router.push(`/apis?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  if (collapsed) {
    return (
      <aside className="hidden w-10 shrink-0 lg:block">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="inline-flex size-9 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="size-4" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "hidden w-52 shrink-0 lg:block",
        isPending && "opacity-60",
      )}
    >
      <div className="sticky top-36 space-y-6 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Browse
          </p>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="inline-flex size-7 items-center justify-center rounded-md text-neutral-400"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="size-4" />
          </button>
        </div>

        <SidebarGroup title="Categories">
          <SidebarLink
            label="All categories"
            active={!activeCategory}
            onClick={() => updateParams({ category: null })}
          />
          {API_CATEGORIES.map((category) => (
            <SidebarLink
              key={category.slug}
              label={category.label}
              count={categoryCounts[category.slug]}
              active={activeCategory === category.slug}
              onClick={() =>
                updateParams({
                  category:
                    activeCategory === category.slug ? null : category.slug,
                })
              }
            />
          ))}
        </SidebarGroup>

        <SidebarGroup title="Ecosystems">
          <SidebarLink
            label="All ecosystems"
            active={!activeEcosystem}
            onClick={() => updateParams({ ecosystem: null })}
          />
          {API_ECOSYSTEMS.map((ecosystem) => (
            <SidebarLink
              key={ecosystem}
              label={ecosystem}
              count={ecosystemCounts[ecosystem]}
              active={activeEcosystem === ecosystem}
              onClick={() =>
                updateParams({
                  ecosystem:
                    activeEcosystem === ecosystem ? null : ecosystem,
                })
              }
            />
          ))}
        </SidebarGroup>
      </div>
    </aside>
  );
}

function SidebarGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SidebarLink({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm",
        active
          ? "bg-neutral-100 font-medium text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50"
          : "text-neutral-600 dark:text-neutral-400",
      )}
    >
      <span>{label}</span>
      {count != null ? (
        <span className="text-xs tabular-nums text-neutral-400">{count}</span>
      ) : null}
    </button>
  );
}
