import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/db/schema";
import { formatPricing } from "@/lib/constants";

export function CompactApiCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-start justify-between gap-3 rounded-lg border border-neutral-200 px-4 py-3 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium group-hover:underline">
          {tool.name}
        </p>
        <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
          {tool.tagline}
        </p>
        <p className="mt-1.5 text-[10px] uppercase tracking-wide text-neutral-400">
          {formatPricing(tool.pricing)}
        </p>
      </div>
      <ArrowUpRight className="size-3.5 shrink-0 text-neutral-400" />
    </Link>
  );
}
