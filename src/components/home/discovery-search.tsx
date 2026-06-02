"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buildExamples } from "@/lib/homepage-data";
import { cn } from "@/lib/utils";

export function DiscoverySearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function search(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    search(query);
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to build?"
          className="h-11 pl-9 text-base"
        />
      </form>

      <div className="flex flex-wrap gap-2">
        {buildExamples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => search(example)}
            className={cn(
              "rounded-md border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 transition-colors",
              "hover:border-neutral-400 hover:text-neutral-950",
              "dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-50",
            )}
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
