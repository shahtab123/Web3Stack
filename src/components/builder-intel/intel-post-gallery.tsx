"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IntelEmbedScripts } from "@/components/builder-intel/intel-embed-scripts";
import { IntelPostCard } from "@/components/builder-intel/intel-post-card";
import { IntelSectionLoader } from "@/components/builder-intel/intel-section-loader";
import { IncrementalListStatus } from "@/components/ui/incremental-list-status";
import type { IntelPostItem } from "@/lib/intel-posts-types";
import { useIncrementalList } from "@/lib/use-incremental-list";
import { cn } from "@/lib/utils";

type IntelPostGalleryProps = {
  posts: IntelPostItem[];
  resetKey?: string;
};

const EMBED_READY_TIMEOUT_MS = 10_000;

export function IntelPostGallery({ posts, resetKey }: IntelPostGalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const loadedIdsRef = useRef(new Set<number>());
  const initialGateDoneRef = useRef(false);

  const { visibleItems, visibleCount, hasMore, sentinelRef, total, pageSize } =
    useIncrementalList(posts, undefined, resetKey);

  const initialBatch = useMemo(
    () => visibleItems.slice(0, Math.min(pageSize, visibleItems.length)),
    [visibleItems, pageSize],
  );
  const initialBatchIds = useMemo(
    () => new Set(initialBatch.map((post) => post.id)),
    [initialBatch],
  );
  const initialBatchSize = initialBatch.length;
  const hasXPosts = posts.some((post) => post.platform === "x");

  const [contentReady, setContentReady] = useState(initialBatchSize === 0);

  const markContentReady = useCallback(() => {
    setContentReady(true);
    initialGateDoneRef.current = true;
  }, []);

  const resetGate = useCallback(() => {
    setContentReady(false);
    initialGateDoneRef.current = false;
    loadedIdsRef.current.clear();
  }, []);

  useEffect(() => {
    resetGate();
    if (initialBatchSize === 0) {
      markContentReady();
    }
  }, [resetKey, resetGate, initialBatchSize, markContentReady]);

  const handleEmbedReady = useCallback(
    (postId: number) => {
      if (initialGateDoneRef.current || !initialBatchIds.has(postId)) return;

      loadedIdsRef.current.add(postId);
      if (loadedIdsRef.current.size >= initialBatchSize) {
        markContentReady();
      }
    },
    [initialBatchIds, initialBatchSize, markContentReady],
  );

  useEffect(() => {
    if (initialGateDoneRef.current || initialBatchSize === 0) return;

    const timeout = window.setTimeout(markContentReady, EMBED_READY_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, [resetKey, initialBatchSize, markContentReady]);

  useEffect(() => {
    if (!hasXPosts) return;

    const loadWidgets = () => {
      window.twttr?.widgets?.load(gridRef.current ?? undefined);
    };

    loadWidgets();
    const interval = window.setInterval(loadWidgets, 400);

    return () => window.clearInterval(interval);
  }, [hasXPosts, resetKey, initialBatchSize]);

  return (
    <div className={cn("relative", !contentReady && "min-h-[50vh]")}>
      {hasXPosts ? <IntelEmbedScripts /> : null}

      {!contentReady ? (
        <div className="flex min-h-[50vh] w-full items-center justify-center">
          <IntelSectionLoader label="Loading posts…" />
        </div>
      ) : null}

      <div
        ref={gridRef}
        className={cn(
          "space-y-6",
          !contentReady &&
            "pointer-events-none absolute inset-x-0 top-0 opacity-0",
        )}
        aria-hidden={!contentReady}
      >
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {visibleItems.map((post) => (
            <IntelPostCard
              key={post.id}
              post={post}
              eagerEmbed={!contentReady && initialBatchIds.has(post.id)}
              onEmbedReady={() => handleEmbedReady(post.id)}
            />
          ))}
        </div>

        {contentReady ? (
          <IncrementalListStatus
            visibleCount={visibleCount}
            total={total}
            pageSize={pageSize}
            hasMore={hasMore}
            sentinelRef={sentinelRef}
            noun="posts"
          />
        ) : null}
      </div>
    </div>
  );
}
