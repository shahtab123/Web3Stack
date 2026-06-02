import { ArrowUpRight } from "lucide-react";
import type { EcosystemResource } from "@/lib/ecosystem-portal-data";

export function ResourceLinkList({ resources }: { resources: EcosystemResource[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {resources.map((resource) => (
        <a
          key={resource.url}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <span className="font-medium group-hover:underline">{resource.label}</span>
          <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
        </a>
      ))}
    </div>
  );
}
