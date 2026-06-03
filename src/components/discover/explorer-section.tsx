"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  POPULAR_SEARCHES,
  SEARCH_PLACEHOLDERS,
} from "@/lib/discover-home-data";
import { cn } from "@/lib/utils";

export function ExplorerSection() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl K");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setPlaceholderIndex(
        (current) => (current + 1) % SEARCH_PLACEHOLDERS.length,
      );
    }, 3200);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  useEffect(() => {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    setShortcutLabel(isMac ? "⌘K" : "Ctrl K");
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modifier = isMac ? event.metaKey : event.ctrlKey;

      if (modifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const search = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    },
    [router],
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    search(query);
  }

  const placeholder = reduceMotion
    ? "Search APIs, recipes, ecosystems, grants..."
    : SEARCH_PLACEHOLDERS[placeholderIndex];

  const Header = reduceMotion ? "div" : motion.div;

  return (
    <section
      aria-labelledby="explorer-heading"
      className="mx-auto w-full max-w-2xl space-y-10 pb-4 pt-4 text-center sm:max-w-3xl"
    >
      <Header
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            })}
        className="mx-auto space-y-5"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
          Web3Scout
        </p>

        <div className="mx-auto space-y-3">
          <h1
            id="explorer-heading"
            className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl sm:tracking-[-0.04em]"
          >
            Everything you need to build in Web3.{" "}
            <span className="text-red-600 dark:text-red-400">Free. Open.</span>
          </h1>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-muted">
            APIs, tools, recipes, grants and ecosystems. All free or open source.
          </p>
        </div>
      </Header>

      <div className="mx-auto space-y-5">
        <form onSubmit={handleSubmit} className="group relative text-left">
          <label htmlFor="explorer-search" className="sr-only">
            Search Web3Scout
          </label>

          <div
            className={cn(
              "relative flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5",
              "transition-[border-color,box-shadow] duration-200",
              "group-focus-within:border-foreground/15 group-focus-within:shadow-[0_0_0_1px_rgba(0,0,0,0.04)]",
              "dark:group-focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
            )}
          >
            <Search className="size-5 shrink-0 text-muted" aria-hidden />

            <input
              ref={inputRef}
              id="explorer-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              className={cn(
                "min-h-[44px] w-full flex-1 bg-transparent text-base text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none",
              )}
            />

            <kbd
              className="hidden shrink-0 rounded-md border border-border px-2 py-1 text-[11px] font-medium text-muted sm:inline-flex"
              aria-hidden
            >
              {shortcutLabel}
            </kbd>
          </div>
        </form>

        <div className="space-y-3">
          <p className="text-xs font-medium text-muted">Popular searches</p>
          <div
            className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2"
            role="list"
            aria-label="Popular searches"
          >
            {POPULAR_SEARCHES.map((term, index) => (
              <span key={term} className="inline-flex items-center">
                <button
                  type="button"
                  role="listitem"
                  onClick={() => search(term)}
                  className={cn(
                    "inline-flex min-h-9 items-center text-sm text-muted",
                    "transition-colors hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                  )}
                >
                  {term}
                </button>
                {index < POPULAR_SEARCHES.length - 1 ? (
                  <span className="mx-2 text-border select-none" aria-hidden>
                    /
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
