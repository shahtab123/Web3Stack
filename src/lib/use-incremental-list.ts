"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const INCREMENTAL_PAGE_SIZE = 6;

export function useIncrementalList<T>(
  items: T[],
  pageSize = INCREMENTAL_PAGE_SIZE,
  resetKey?: string,
) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelNodeRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<() => void>(() => {});
  const hasMoreRef = useRef(false);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [pageSize, resetKey, items.length]);

  const loadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + pageSize, items.length));
  }, [items.length, pageSize]);

  loadMoreRef.current = loadMore;

  const hasMore = visibleCount < items.length;
  const visibleItems = items.slice(0, visibleCount);

  hasMoreRef.current = hasMore;

  const detachObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  const attachObserver = useCallback(() => {
    detachObserver();
    const node = sentinelNodeRef.current;
    if (!node || !hasMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) loadMoreRef.current();
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    observerRef.current = observer;
  }, [detachObserver]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      sentinelNodeRef.current = node;
      if (!node) {
        detachObserver();
        return;
      }
      attachObserver();
    },
    [attachObserver, detachObserver],
  );

  useEffect(() => {
    attachObserver();
    return detachObserver;
  }, [attachObserver, detachObserver, visibleCount, hasMore]);

  return {
    visibleItems,
    visibleCount,
    hasMore,
    sentinelRef,
    total: items.length,
    pageSize,
  };
}
