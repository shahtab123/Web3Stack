import { Suspense } from "react";
import type { Metadata } from "next";
import { GrantCard } from "@/components/grants/grant-card";
import { GrantFilters } from "@/components/grants/grant-filters";
import { PageHeader } from "@/components/layout/page-header";
import {
  getGrants,
  type BuilderType,
  type FundingStage,
  type FundingType,
  type GrantSort,
  type GrantStatus,
} from "@/lib/grants-directory";
import { isBuilderType, isFundingStage, isFundingType, isGrantSort } from "@/lib/grants-directory-types";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Funding Opportunities",
  description:
    "Grants, hackathons, accelerators, bounties and ecosystem programs for Web3 builders at every stage.",
  path: "/grants",
});

type PageProps = {
  searchParams: Promise<{
    status?: string;
    ecosystem?: string;
    fundingType?: string;
    fundingStage?: string;
    builderType?: string;
    sort?: string;
  }>;
};

export default async function GrantsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const grants = await getGrants({
    status: params.status as GrantStatus | undefined,
    ecosystem: params.ecosystem,
    fundingType: isFundingType(params.fundingType ?? "")
      ? (params.fundingType as FundingType)
      : undefined,
    fundingStage: isFundingStage(params.fundingStage ?? "")
      ? (params.fundingStage as FundingStage)
      : undefined,
    builderType: isBuilderType(params.builderType ?? "")
      ? (params.builderType as BuilderType)
      : undefined,
    sort: isGrantSort(params.sort ?? "") ? (params.sort as GrantSort) : undefined,
  });

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8">
      <PageHeader
        title={`Funding Opportunities (${grants.length})`}
        subtitle="Grants, hackathons, accelerators, incubators, bounties and venture programs — filter by funding type, stage, and builder profile."
      />

      <Suspense
        fallback={
          <div className="h-20 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />
        }
      >
        <GrantFilters />
      </Suspense>

      {grants.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No funding opportunities match your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {grants.map((grant) => (
            <GrantCard key={grant.slug} grant={grant} />
          ))}
        </div>
      )}
    </div>
  );
}
