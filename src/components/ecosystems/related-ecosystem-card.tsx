import Link from "next/link";
import type { BrowseEcosystemWithCounts } from "@/lib/browse-ecosystems";

export function RelatedEcosystemCard({
  ecosystem,
}: {
  ecosystem: BrowseEcosystemWithCounts;
}) {
  return (
    <Link
      href={`/ecosystems/${ecosystem.slug}`}
      className="group flex w-[220px] shrink-0 flex-col rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <p className="font-medium group-hover:underline">{ecosystem.name}</p>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        {ecosystem.description}
      </p>
      <p className="mt-3 text-[10px] tabular-nums text-neutral-400">
        {ecosystem.apiCount} APIs · {ecosystem.recipeCount} recipes
      </p>
    </Link>
  );
}
