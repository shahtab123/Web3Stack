"use client";

import { ApiCard } from "@/components/apis/api-card";
import { ApiListRow } from "@/components/apis/api-list-row";
import {
  ApiDirectoryToolbar,
  useApiDirectoryView,
} from "@/components/apis/api-directory-toolbar";
import { IncrementalListStatus } from "@/components/ui/incremental-list-status";
import type { ApiEntry } from "@/lib/api-directory";
import { useIncrementalList } from "@/lib/use-incremental-list";
import { cn } from "@/lib/utils";

type ApiDirectoryResultsProps = {
  apis: ApiEntry[];
  resetKey?: string;
};

export function ApiDirectoryResults({ apis, resetKey }: ApiDirectoryResultsProps) {
  const [view, setView] = useApiDirectoryView();
  const { visibleItems, visibleCount, hasMore, sentinelRef, total, pageSize } =
    useIncrementalList(apis, undefined, resetKey);

  return (
    <div className="space-y-4">
      <ApiDirectoryToolbar
        resultCount={apis.length}
        view={view}
        onViewChange={setView}
      />

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((api) => (
            <ApiCard key={api.slug} api={api} />
          ))}
        </div>
      ) : (
        <div className={cn("space-y-3")}>
          {visibleItems.map((api) => (
            <ApiListRow key={api.slug} api={api} />
          ))}
        </div>
      )}

      <IncrementalListStatus
        visibleCount={visibleCount}
        total={total}
        pageSize={pageSize}
        hasMore={hasMore}
        sentinelRef={sentinelRef}
        noun="APIs"
      />
    </div>
  );
}
