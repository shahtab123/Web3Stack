"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  API_CAPABILITY_TAGS,
  API_DIRECTORY_ECOSYSTEM_FILTERS,
  API_DIRECTORY_QUICK_CATEGORIES,
} from "@/lib/api-directory-constants";
import {
  API_TOOL_TYPES,
  type ApiCategory,
  type ApiEcosystem,
  type ApiToolType,
} from "@/lib/api-directory";
import { cn } from "@/lib/utils";

function countAdvancedFilters(params: URLSearchParams) {
  let count = 0;
  if (params.get("tag")) count += 1;
  if (params.get("free")) count += 1;
  if (params.get("freemium")) count += 1;
  if (params.get("ecosystem")) count += 1;
  if (params.get("type")) count += 1;
  return count;
}

function hasAdvancedFilters(params: URLSearchParams) {
  return countAdvancedFilters(params) > 0;
}

export function ApiDirectoryTopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const activeCategory = searchParams.get("category") as ApiCategory | null;
  const activeEcosystem = searchParams.get("ecosystem") as ApiEcosystem | null;
  const activeType = searchParams.get("type") as ApiToolType | null;
  const activeTag = searchParams.get("tag");
  const advancedActive = hasAdvancedFilters(searchParams);
  const advancedFilterCount = countAdvancedFilters(searchParams);

  useEffect(() => {
    if (advancedActive) setAdvancedOpen(true);
  }, [advancedActive]);

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

  return (
    <div className={cn("space-y-5", isPending && "opacity-60")}>
      <FilterSection title="Categories">
        {API_DIRECTORY_QUICK_CATEGORIES.map((category) => (
          <FilterPill
            key={category.slug}
            label={category.label}
            active={activeCategory === category.slug}
            onClick={() =>
              updateParams({
                category:
                  activeCategory === category.slug ? null : category.slug,
              })
            }
          />
        ))}
      </FilterSection>

      <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
        <button
          type="button"
          onClick={() => setAdvancedOpen((open) => !open)}
          aria-expanded={advancedOpen}
          className={cn(
            "flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left",
            "bg-neutral-50 transition-colors hover:bg-neutral-100",
            "dark:bg-neutral-900/40 dark:hover:bg-neutral-900/70",
            advancedOpen && "border-b border-neutral-200 dark:border-neutral-800",
          )}
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-950 dark:text-neutral-50">
              Advanced filters
            </p>
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              {advancedOpen
                ? "Hide tags, pricing, ecosystems, and type"
                : "Show tags, pricing, ecosystems, and type"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {advancedFilterCount > 0 ? (
              <span className="rounded-full border border-neutral-200 bg-background px-2 py-0.5 text-[11px] font-medium text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                {advancedFilterCount} active
              </span>
            ) : null}
            <span
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-md border border-neutral-200 bg-background dark:border-neutral-700 dark:bg-neutral-950",
                advancedOpen && "bg-neutral-100 dark:bg-neutral-900",
              )}
            >
              <ChevronDown
                className={cn(
                  "size-4 text-neutral-500 transition-transform duration-200",
                  advancedOpen && "rotate-180",
                )}
                aria-hidden
              />
            </span>
          </div>
        </button>

        {advancedOpen ? (
          <div className="space-y-5 px-4 py-4">
            <FilterSection title="Tags">
              {API_CAPABILITY_TAGS.map((tag) => (
                <FilterPill
                  key={tag}
                  label={tag}
                  active={activeTag === tag}
                  onClick={() =>
                    updateParams({
                      tag: activeTag === tag ? null : tag,
                    })
                  }
                />
              ))}
            </FilterSection>

            <FilterSection title="Pricing">
              <FilterPill
                label="Free"
                active={searchParams.get("free") === "1"}
                onClick={() => {
                  const active = searchParams.get("free") === "1";
                  updateParams({ free: active ? null : "1" });
                }}
              />
              <FilterPill
                label="Freemium"
                active={searchParams.get("freemium") === "1"}
                onClick={() => {
                  const active = searchParams.get("freemium") === "1";
                  updateParams({ freemium: active ? null : "1" });
                }}
              />
            </FilterSection>

            <FilterSection title="Ecosystems">
              {API_DIRECTORY_ECOSYSTEM_FILTERS.map((ecosystem) => (
                <FilterPill
                  key={ecosystem}
                  label={ecosystem}
                  active={activeEcosystem === ecosystem}
                  onClick={() =>
                    updateParams({
                      ecosystem:
                        activeEcosystem === ecosystem ? null : ecosystem,
                    })
                  }
                />
              ))}
            </FilterSection>

            <FilterSection title="Type">
              {API_TOOL_TYPES.map((type) => (
                <FilterPill
                  key={type.slug}
                  label={type.label}
                  active={activeType === type.slug}
                  onClick={() =>
                    updateParams({
                      type: activeType === type.slug ? null : type.slug,
                    })
                  }
                />
              ))}
            </FilterSection>
          </div>
        ) : null}
      </div>
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
