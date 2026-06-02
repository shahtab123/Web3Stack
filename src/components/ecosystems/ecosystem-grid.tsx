"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EcosystemBrowseCard } from "@/components/ecosystems/ecosystem-browse-card";
import { Input } from "@/components/ui/input";
import type { BrowseEcosystemWithCounts } from "@/lib/browse-ecosystems";

type EcosystemGridProps = {
  ecosystems: BrowseEcosystemWithCounts[];
};

export function EcosystemGrid({ ecosystems }: EcosystemGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return ecosystems;

    return ecosystems.filter(
      (ecosystem) =>
        ecosystem.name.toLowerCase().includes(normalized) ||
        ecosystem.description.toLowerCase().includes(normalized) ||
        ecosystem.slug.includes(normalized),
    );
  }, [ecosystems, query]);

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ecosystems..."
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No ecosystems match your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ecosystem) => (
            <EcosystemBrowseCard key={ecosystem.slug} ecosystem={ecosystem} />
          ))}
        </div>
      )}
    </div>
  );
}
