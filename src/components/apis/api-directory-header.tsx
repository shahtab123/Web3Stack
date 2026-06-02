"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { API_DIRECTORY_SEARCH_PLACEHOLDERS } from "@/lib/api-directory-constants";
import { cn } from "@/lib/utils";

export function ApiDirectoryHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(
        (current) =>
          (current + 1) % API_DIRECTORY_SEARCH_PLACEHOLDERS.length,
      );
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = searchParams.get("q") ?? "";
      if (query === current) return;

      const params = new URLSearchParams(searchParams.toString());
      if (query) params.set("q", query);
      else params.delete("q");

      router.push(`/apis?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, router, searchParams]);

  return (
    <div className="space-y-2 pb-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          APIs & Developer Tools
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
          Discover free and freemium APIs, SDKs, infrastructure and developer
          platforms.
        </p>
      </div>

      <div
        className={cn(
          "sticky top-20 z-30 -mx-4 border-b border-transparent bg-background/95 px-4 py-3 backdrop-blur-md",
          "sm:-mx-6 sm:px-6",
        )}
      >
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${API_DIRECTORY_SEARCH_PLACEHOLDERS[placeholderIndex]}...`}
            className={cn(
              "h-11 w-full rounded-lg border border-neutral-200 bg-background pl-9 pr-4 text-sm",
              "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30",
              "dark:border-neutral-800 dark:focus:ring-neutral-600/30",
            )}
          />
        </div>
      </div>
    </div>
  );
}
