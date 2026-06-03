import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ApiBuildPreview } from "@/components/apis/api-build-preview";
import { ApiEcosystemBadges } from "@/components/apis/api-ecosystem-badges";
import { ProjectLogo } from "@/components/discover/project-logo";
import { Badge } from "@/components/ui/badge";
import type { ApiEntry } from "@/lib/api-directory";
import { formatApiCategoryWithTags } from "@/lib/api-directory";
import { cn } from "@/lib/utils";

type ApiCardProps = {
  api: ApiEntry;
  className?: string;
};

export function ApiCard({ api, className }: ApiCardProps) {
  const categoryLine = formatApiCategoryWithTags(api.categories[0], api.tags);

  return (
    <article
      className={cn(
        "glass-card flex h-full flex-col rounded-lg p-4",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <ProjectLogo
          slug={api.slug}
          name={api.name}
          websiteUrl={api.url}
          size={32}
          className="shrink-0"
        />
        <div className="min-w-0 flex-1">
          <Link
            href={`/apis/${api.slug}`}
            className="font-semibold text-neutral-950 hover:underline dark:text-neutral-50"
          >
            {api.name}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {api.description}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {categoryLine ? (
          <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            {categoryLine}
          </p>
        ) : null}

        <ApiEcosystemBadges ecosystems={api.ecosystems} />

        <ApiBuildPreview items={api.whatCanYouBuild} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
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

      <div className="mt-auto flex gap-2 pt-4">
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
          View Details
        </Link>
      </div>
    </article>
  );
}
