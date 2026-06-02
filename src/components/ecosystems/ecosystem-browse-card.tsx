import Link from "next/link";
import type { BrowseEcosystemWithCounts } from "@/lib/browse-ecosystems";

export function EcosystemBrowseCard({
  ecosystem,
}: {
  ecosystem: BrowseEcosystemWithCounts;
}) {
  return (
    <Link
      href={`/ecosystems/${ecosystem.slug}`}
      className="group block h-full rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
    >
      <h2 className="text-lg font-semibold tracking-tight group-hover:underline">
        {ecosystem.name}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {ecosystem.description}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-4 text-xs text-neutral-500 dark:border-neutral-900 dark:text-neutral-400 sm:grid-cols-4">
        <Stat label="APIs" value={ecosystem.apiCount} />
        <Stat label="Recipes" value={ecosystem.recipeCount} />
        <Stat label="Grants" value={ecosystem.grantCount} />
        <Stat label="Intel" value={ecosystem.intelCount} />
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span>
      <span className="font-semibold tabular-nums text-neutral-950 dark:text-neutral-50">
        {value}
      </span>{" "}
      {label}
    </span>
  );
}
