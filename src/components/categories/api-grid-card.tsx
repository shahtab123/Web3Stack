import Link from "next/link";
import { ProjectLogo } from "@/components/discover/project-logo";
import { Badge } from "@/components/ui/badge";
import type { ApiEntry } from "@/lib/api-directory";

export function ApiGridCard({ api }: { api: ApiEntry }) {
  return (
    <Link
      href={`/apis/${api.slug}`}
      className="group block h-full rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <ProjectLogo
            slug={api.slug}
            name={api.name}
            websiteUrl={api.url}
            size={24}
            className="shrink-0"
          />
          <p className="truncate font-semibold group-hover:underline">
            {api.name}
          </p>
        </div>
        {api.isOpenSource && (
          <Badge variant="outline" className="shrink-0 text-[10px]">
            OSS
          </Badge>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
        {api.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {api.isFree && (
          <Badge variant="muted" className="text-[10px]">
            Free
          </Badge>
        )}
        {api.isFreemium && (
          <Badge variant="muted" className="text-[10px]">
            Freemium
          </Badge>
        )}
      </div>
    </Link>
  );
}
