import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SearchResult } from "@/lib/global-search";
import { SEARCH_TYPE_LABELS } from "@/lib/global-search";
import { cn } from "@/lib/utils";

type SearchResultItemProps = {
  result: SearchResult;
  index: number;
  active: boolean;
  onMouseEnter: () => void;
  onFocus: () => void;
};

export function SearchResultItem({
  result,
  index,
  active,
  onMouseEnter,
  onFocus,
}: SearchResultItemProps) {
  const className = cn(
    "group flex items-start gap-3 rounded-lg border px-4 py-3 transition-colors outline-none",
    active
      ? "border-neutral-950 bg-neutral-50 dark:border-neutral-50 dark:bg-neutral-900"
      : "border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600",
  );

  const content = (
    <>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium group-hover:underline">{result.title}</p>
          <Badge variant="outline" className="text-[10px]">
            {SEARCH_TYPE_LABELS[result.type]}
          </Badge>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
          {result.description}
        </p>
        {result.meta && (
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {result.meta}
          </p>
        )}
      </div>
      {result.external && (
        <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-neutral-400" />
      )}
    </>
  );

  if (result.external) {
    return (
      <a
        id={`search-result-${index}`}
        href={result.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-search-index={index}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        tabIndex={active ? 0 : -1}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      id={`search-result-${index}`}
      href={result.href}
      className={className}
      data-search-index={index}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      tabIndex={active ? 0 : -1}
    >
      {content}
    </Link>
  );
}
