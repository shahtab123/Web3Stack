import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { IdeaEntry } from "@/lib/ideas-directory";
import {
  getIdeaCategoryLabel,
  getIdeaDifficultyLabel,
} from "@/lib/ideas-directory";

export function IdeaCard({ idea }: { idea: IdeaEntry }) {
  return (
    <Link
      href={`/ideas/${idea.slug}`}
      className="group flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-base font-semibold leading-snug group-hover:underline">
            {idea.title}
          </h2>
          <Badge variant="outline" className="shrink-0 text-[10px]">
            {getIdeaDifficultyLabel(idea.difficulty)}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {idea.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="muted" className="text-[10px]">
            {getIdeaCategoryLabel(idea.category)}
          </Badge>
        </div>
      </div>

      <dl className="mt-5 grid gap-2 border-t border-neutral-100 pt-4 text-xs dark:border-neutral-900">
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-500 dark:text-neutral-400">Build Time</dt>
          <dd className="font-medium">{idea.estimatedBuildTime}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-500 dark:text-neutral-400">Uses</dt>
          <dd className="font-medium tabular-nums">
            {idea.apiSlugs.length} API{idea.apiSlugs.length === 1 ? "" : "s"}
          </dd>
        </div>
      </dl>
    </Link>
  );
}

export function IdeaCompactCard({ idea }: { idea: IdeaEntry }) {
  return (
    <Link
      href={`/ideas/${idea.slug}`}
      className="group block rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <p className="font-medium group-hover:underline">{idea.title}</p>
      <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
        {idea.description}
      </p>
      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        {getIdeaDifficultyLabel(idea.difficulty)} · {idea.estimatedBuildTime}
      </p>
    </Link>
  );
}
