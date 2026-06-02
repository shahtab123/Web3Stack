import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GrantEntry } from "@/lib/grants-directory";
import {
  formatFundingStages,
  getFundingTypeLabel,
} from "@/lib/grants-directory";

export function GrantCard({ grant }: { grant: GrantEntry }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="font-semibold leading-snug">{grant.name}</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {grant.org}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-[10px]">
            {getFundingTypeLabel(grant.fundingType, grant.fundingTypeLabel)}
          </Badge>
          <Badge variant="muted" className="text-[10px]">
            {formatFundingStages(grant.fundingStages)}
          </Badge>
          {grant.remoteFriendly ? (
            <Badge variant="outline" className="gap-1 text-[10px]">
              <Globe2 className="size-2.5" />
              Remote
            </Badge>
          ) : null}
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {grant.description}
        </p>
      </div>

      <dl className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-sm dark:border-neutral-900">
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-500 dark:text-neutral-400">Deadline</dt>
          <dd className="text-right font-medium">{grant.deadline}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-500 dark:text-neutral-400">Location</dt>
          <dd className="text-right font-medium">{grant.location}</dd>
        </div>
      </dl>

      <div className="mt-5 flex gap-2">
        <Button asChild size="sm" className="flex-1">
          <a href={grant.applyUrl} target="_blank" rel="noopener noreferrer">
            Apply
            <ArrowUpRight className="size-3.5" />
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={grant.learnMoreUrl}>Learn More</Link>
        </Button>
      </div>
    </article>
  );
}
