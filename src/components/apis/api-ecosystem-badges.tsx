import Link from "next/link";
import { ProjectLogo } from "@/components/discover/project-logo";
import type { ApiEntry } from "@/lib/api-directory";
import {
  ecosystemToLogoSlug,
  getDisplayEcosystems,
} from "@/lib/api-directory-types";
import { getEcosystemHrefFromApiTag } from "@/lib/browse-ecosystems";
import { cn } from "@/lib/utils";

const chipClassName =
  "inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50/80 px-1.5 py-0.5 text-[10px] font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300";

type ApiEcosystemBadgesProps = {
  ecosystems: ApiEntry["ecosystems"];
  max?: number;
  className?: string;
  /** Set false when rendered inside another link (e.g. category grid cards). */
  linkable?: boolean;
};

export function ApiEcosystemBadges({
  ecosystems,
  max = 3,
  className,
  linkable = true,
}: ApiEcosystemBadgesProps) {
  const { visible, overflow } = getDisplayEcosystems(ecosystems, max);

  if (visible.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {visible.map((ecosystem) => {
        const content = (
          <>
            <ProjectLogo
              slug={ecosystemToLogoSlug(ecosystem)}
              name={ecosystem}
              size={14}
              className="rounded"
            />
            {ecosystem}
          </>
        );

        if (!linkable) {
          return (
            <span key={ecosystem} className={chipClassName}>
              {content}
            </span>
          );
        }

        return (
          <Link
            key={ecosystem}
            href={getEcosystemHrefFromApiTag(ecosystem)}
            className={cn(
              chipClassName,
              "transition-colors hover:border-neutral-400 hover:bg-neutral-100 dark:hover:border-neutral-600 dark:hover:bg-neutral-800",
            )}
          >
            {content}
          </Link>
        );
      })}
      {overflow > 0 ? (
        <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
