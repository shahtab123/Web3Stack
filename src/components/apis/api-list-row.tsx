import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ApiBuildPreview } from "@/components/apis/api-build-preview";
import { ProjectLogo } from "@/components/discover/project-logo";
import { Badge } from "@/components/ui/badge";
import type { ApiEntry } from "@/lib/api-directory";
import { getApiCategoryLabel } from "@/lib/api-directory";

type ApiListRowProps = {
  api: ApiEntry;
};

export function ApiListRow({ api }: ApiListRowProps) {
  const primaryCategory = api.categories[0];
  const visibleTags = api.tags.slice(0, 4);

  return (
    <article className="glass-card flex flex-col gap-4 rounded-lg p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <ProjectLogo
          slug={api.slug}
          name={api.name}
          websiteUrl={api.url}
          size={32}
          className="shrink-0"
        />
        <div className="min-w-0">
          <Link
            href={`/apis/${api.slug}`}
            className="font-semibold text-neutral-950 hover:underline dark:text-neutral-50"
          >
            {api.name}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {api.description}
          </p>
          <div className="mt-2 space-y-1">
            {primaryCategory ? (
              <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                {getApiCategoryLabel(primaryCategory)}
              </p>
            ) : null}
            {visibleTags.length > 0 ? (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {visibleTags.join(" • ")}
              </p>
            ) : null}
            <ApiBuildPreview items={api.whatCanYouBuild} />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {api.isOpenSource ? (
              <Badge variant="outline" className="text-[10px]">
                Open Source
              </Badge>
            ) : null}
            {api.isFree ? (
              <Badge variant="muted" className="text-[10px]">
                Free
              </Badge>
            ) : null}
            {api.isFreemium ? (
              <Badge variant="muted" className="text-[10px]">
                Freemium
              </Badge>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 sm:w-52">
        <a
          href={api.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card-action inline-flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium"
        >
          Website
          <ArrowUpRight className="size-3 text-neutral-400" />
        </a>
        <Link
          href={`/apis/${api.slug}`}
          className="glass-card-action inline-flex flex-1 items-center justify-center rounded-md px-3 py-2 text-xs font-medium"
        >
          Details
        </Link>
      </div>
    </article>
  );
}
