import Link from "next/link";
import type { BrowseEcosystem } from "@/lib/browse-ecosystems";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "apis", label: "APIs" },
  { id: "recipes", label: "Recipes" },
  { id: "grants", label: "Grants" },
  { id: "intel", label: "Intel" },
  { id: "projects", label: "Projects" },
  { id: "resources", label: "Resources" },
] as const;

export function EcosystemPortalNav({ ecosystem }: { ecosystem: BrowseEcosystem }) {
  return (
    <nav
      aria-label={`${ecosystem.name} sections`}
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none"
    >
      {SECTIONS.map((section) => (
        <Link
          key={section.id}
          href={`#${section.id}`}
          className="shrink-0 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-50"
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
}
