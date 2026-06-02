"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import {
  BUILDER_TYPES,
  FUNDING_STAGES,
  FUNDING_TYPES,
  GRANT_SORT_OPTIONS,
  GRANT_STATUSES,
  getBuilderTypeLabel,
  getFundingStageLabel,
  getFundingTypeLabel,
  getGrantEcosystemOptions,
  getGrantStatusLabel,
  type BuilderType,
  type FundingStage,
  type FundingType,
  type GrantSort,
  type GrantStatus,
} from "@/lib/grants-directory";
import { cn } from "@/lib/utils";

export function GrantFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const ecosystemOptions = getGrantEcosystemOptions();

  const status = searchParams.get("status") as GrantStatus | null;
  const ecosystem = searchParams.get("ecosystem");
  const fundingType = searchParams.get("fundingType") as FundingType | null;
  const fundingStage = searchParams.get("fundingStage") as FundingStage | null;
  const builderType = searchParams.get("builderType") as BuilderType | null;
  const sort = (searchParams.get("sort") as GrantSort | null) ?? "deadline-soonest";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      startTransition(() => {
        router.push(`/grants?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  const selectClassName =
    "h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm sm:w-auto dark:border-neutral-800 dark:bg-neutral-950";

  const activeFilters = [
    status ? { key: "status", label: `Status: ${getGrantStatusLabel(status)}` } : null,
    ecosystem
      ? {
          key: "ecosystem",
          label: `Ecosystem: ${ecosystemOptions.find((item) => item.slug === ecosystem)?.name ?? ecosystem}`,
        }
      : null,
    fundingType
      ? {
          key: "fundingType",
          label: `Funding Type: ${getFundingTypeLabel(fundingType)}`,
        }
      : null,
    fundingStage
      ? {
          key: "fundingStage",
          label: `Stage: ${getFundingStageLabel(fundingStage)}`,
        }
      : null,
    builderType
      ? {
          key: "builderType",
          label: `Builder: ${getBuilderTypeLabel(builderType)}`,
        }
      : null,
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className={cn("space-y-3", isPending && "opacity-60")}>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <select
          value={fundingType ?? ""}
          onChange={(e) =>
            updateParams({ fundingType: e.target.value || null })
          }
          className={selectClassName}
          aria-label="Filter by funding type"
        >
          <option value="">Funding Type</option>
          {FUNDING_TYPES.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={fundingStage ?? ""}
          onChange={(e) =>
            updateParams({ fundingStage: e.target.value || null })
          }
          className={selectClassName}
          aria-label="Filter by funding stage"
        >
          <option value="">Funding Stage</option>
          {FUNDING_STAGES.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={builderType ?? ""}
          onChange={(e) =>
            updateParams({ builderType: e.target.value || null })
          }
          className={selectClassName}
          aria-label="Filter by builder type"
        >
          <option value="">Builder Type</option>
          {BUILDER_TYPES.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value || null })}
          className={selectClassName}
          aria-label="Sort opportunities"
        >
          {GRANT_SORT_OPTIONS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        <select
          value={status ?? ""}
          onChange={(e) => updateParams({ status: e.target.value || null })}
          className={selectClassName}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {GRANT_STATUSES.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={ecosystem ?? ""}
          onChange={(e) => updateParams({ ecosystem: e.target.value || null })}
          className={selectClassName}
          aria-label="Filter by ecosystem"
        >
          <option value="">All ecosystems</option>
          {ecosystemOptions.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <FilterChip
              key={filter.key}
              label={filter.label}
              onClear={() => updateParams({ [filter.key]: null })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-400"
    >
      {label} ×
    </button>
  );
}
