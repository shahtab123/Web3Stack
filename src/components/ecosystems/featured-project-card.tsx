import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EcosystemFeaturedProject } from "@/lib/ecosystem-portal-data";

export function FeaturedProjectCard({ project }: { project: EcosystemFeaturedProject }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium group-hover:underline">{project.name}</p>
        <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
      </div>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>
    </a>
  );
}
