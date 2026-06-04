"use client";

import { IdeaCard } from "@/components/ideas/idea-card";
import { IncrementalListStatus } from "@/components/ui/incremental-list-status";
import type { IdeaEntry } from "@/lib/ideas-directory-types";
import { useIncrementalList } from "@/lib/use-incremental-list";

type IdeaGalleryGridProps = {
  ideas: IdeaEntry[];
  resetKey?: string;
};

export function IdeaGalleryGrid({ ideas, resetKey }: IdeaGalleryGridProps) {
  const { visibleItems, visibleCount, hasMore, sentinelRef, total, pageSize } =
    useIncrementalList(ideas, undefined, resetKey);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((idea) => (
          <IdeaCard key={idea.slug} idea={idea} />
        ))}
      </div>

      <IncrementalListStatus
        visibleCount={visibleCount}
        total={total}
        pageSize={pageSize}
        hasMore={hasMore}
        sentinelRef={sentinelRef}
        noun="ideas"
      />
    </div>
  );
}
