import type { Ref } from "react";

type IncrementalListStatusProps = {
  visibleCount: number;
  total: number;
  pageSize: number;
  hasMore: boolean;
  sentinelRef: Ref<HTMLDivElement | null>;
  noun?: string;
};

export function IncrementalListStatus({
  visibleCount,
  total,
  pageSize,
  hasMore,
  sentinelRef,
  noun = "items",
}: IncrementalListStatusProps) {
  if (total === 0) return null;

  if (hasMore) {
    return (
      <div ref={sentinelRef} className="flex justify-center py-6">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Showing {visibleCount} of {total} {noun} — scroll for more
        </p>
      </div>
    );
  }

  if (total > pageSize) {
    return (
      <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
        All {total} {noun} loaded
      </p>
    );
  }

  return null;
}
