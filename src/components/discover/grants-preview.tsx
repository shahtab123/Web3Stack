import Link from "next/link";
import { ProjectLogo } from "@/components/discover/project-logo";
import { SectionHeader } from "@/components/discover/section-header";
import { getBrowseEcosystemBySlug } from "@/lib/browse-ecosystems";
import {
  getGrantUrgency,
  GRANT_URGENCY_LABELS,
} from "@/lib/discover-home-data";
import type { GrantEntry } from "@/lib/grants-directory-types";
import { FadeIn } from "@/components/discover/motion";
import { cn } from "@/lib/utils";

type GrantsPreviewProps = {
  grants: GrantEntry[];
};

export function GrantsPreview({ grants }: GrantsPreviewProps) {
  return (
    <section aria-labelledby="grants-preview-heading" className="space-y-6">
      <FadeIn>
        <SectionHeader
          id="grants-preview-heading"
          title="Active Grants"
          subtitle="Funding programs worth applying to right now."
          href="/grants"
        />
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
                <th className="pb-3 pr-4 font-medium">Grant</th>
                <th className="pb-3 pr-4 font-medium">Ecosystem</th>
                <th className="pb-3 pr-4 font-medium">Funding</th>
                <th className="pb-3 pr-4 font-medium">Deadline</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {grants.map((grant) => {
                const ecosystem =
                  getBrowseEcosystemBySlug(grant.ecosystemSlug) ?? null;
                const urgency = getGrantUrgency(grant.status, grant.deadline);

                return (
                  <tr
                    key={grant.slug}
                    className="group border-b border-border/60 transition-colors hover:bg-surface-hover/50"
                  >
                    <td className="py-4 pr-4">
                      <Link
                        href={`/grants/${grant.slug}`}
                        className={cn(
                          "inline-flex items-center gap-3 font-medium text-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                        )}
                      >
                        {ecosystem ? (
                          <ProjectLogo
                            slug={ecosystem.slug}
                            name={ecosystem.name}
                            size={32}
                          />
                        ) : null}
                        <span className="group-hover:underline">
                          {grant.name}
                        </span>
                      </Link>
                    </td>
                    <td className="py-4 pr-4 text-muted">
                      {ecosystem?.name ?? grant.ecosystemSlug}
                    </td>
                    <td className="py-4 pr-4 text-foreground">
                      {grant.fundingRange}
                    </td>
                    <td className="py-4 pr-4 text-muted">{grant.deadline}</td>
                    <td className="py-4 text-xs uppercase tracking-wide text-muted">
                      {GRANT_URGENCY_LABELS[urgency]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </section>
  );
}
