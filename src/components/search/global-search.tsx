"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Search } from "lucide-react";
import { SearchResultItem } from "@/components/search/search-result-item";
import { Input } from "@/components/ui/input";
import {
  EXAMPLE_SEARCHES,
  SEARCH_SECTIONS,
  type GlobalSearchResults,
} from "@/lib/global-search";
import { cn } from "@/lib/utils";

type GlobalSearchProps = {
  initialQuery: string;
  results: GlobalSearchResults | null;
};

export function GlobalSearch({ initialQuery, results }: GlobalSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();

  const flatResults = results?.flat ?? [];

  const pushQuery = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      startTransition(() => {
        if (trimmed) {
          router.push(`/search?q=${encodeURIComponent(trimmed)}`, {
            scroll: false,
          });
        } else {
          router.push("/search", { scroll: false });
        }
      });
    },
    [router],
  );

  useEffect(() => {
    setQuery(initialQuery);
    setActiveIndex(-1);
  }, [initialQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() !== initialQuery.trim()) {
        pushQuery(query);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query, initialQuery, pushQuery]);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        const target = event.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (activeIndex < 0) return;

    const active = document.getElementById(`search-result-${activeIndex}`);
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    pushQuery(query);
    inputRef.current?.focus();
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (flatResults.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        index < flatResults.length - 1 ? index + 1 : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index > 0 ? index - 1 : flatResults.length - 1,
      );
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const active = document.getElementById(
        `search-result-${activeIndex}`,
      ) as HTMLAnchorElement | null;
      active?.click();
    }

    if (event.key === "Escape") {
      setActiveIndex(-1);
    }
  }

  function handleResultsKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (flatResults.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        index < flatResults.length - 1 ? index + 1 : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index > 0 ? index - 1 : flatResults.length - 1,
      );
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const active = document.getElementById(
        `search-result-${activeIndex}`,
      ) as HTMLAnchorElement | null;
      active?.click();
    }
  }

  let resultOffset = 0;

  return (
    <div className={cn("space-y-10", isPending && "opacity-70")}>
      <div className="mx-auto w-full max-w-2xl space-y-4 text-center">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400" />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search APIs, recipes, grants..."
            className="h-14 rounded-lg pl-12 text-base"
            aria-label="Search across the directory"
            autoFocus
          />
        </form>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Press{" "}
          <kbd className="rounded border border-neutral-200 px-1.5 py-0.5 font-mono text-[10px] dark:border-neutral-800">
            /
          </kbd>{" "}
          to focus ·{" "}
          <kbd className="rounded border border-neutral-200 px-1.5 py-0.5 font-mono text-[10px] dark:border-neutral-800">
            ↑
          </kbd>{" "}
          <kbd className="rounded border border-neutral-200 px-1.5 py-0.5 font-mono text-[10px] dark:border-neutral-800">
            ↓
          </kbd>{" "}
          to navigate
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {EXAMPLE_SEARCHES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setQuery(example);
                pushQuery(example);
              }}
              className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-50"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {results && results.query ? (
        <div
          ref={resultsRef}
          className="space-y-10"
          onKeyDown={handleResultsKeyDown}
          role="region"
          aria-label="Search results"
        >
          {results.total === 0 ? (
            <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No results for &ldquo;{results.query}&rdquo;.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {results.total} result{results.total === 1 ? "" : "s"} for{" "}
                <span className="font-medium text-neutral-950 dark:text-neutral-50">
                  &ldquo;{results.query}&rdquo;
                </span>
              </p>

              {SEARCH_SECTIONS.map((section) => {
                const items = results[section.key];
                if (items.length === 0) return null;

                const sectionStart = resultOffset;
                resultOffset += items.length;

                return (
                  <section key={section.key} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-800">
                      <h2 className="text-sm font-medium uppercase tracking-wide">
                        {section.title}
                      </h2>
                      <Link
                        href={section.href}
                        className="text-xs text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
                      >
                        Browse all
                      </Link>
                    </div>
                    <div className="space-y-2">
                      {items.map((result, index) => {
                        const flatIndex = sectionStart + index;
                        return (
                          <SearchResultItem
                            key={result.id}
                            result={result}
                            index={flatIndex}
                            active={activeIndex === flatIndex}
                            onMouseEnter={() => setActiveIndex(flatIndex)}
                            onFocus={() => setActiveIndex(flatIndex)}
                          />
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Start typing or choose an example search above.
          </p>
        </div>
      )}
    </div>
  );
}
