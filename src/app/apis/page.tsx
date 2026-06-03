import { Suspense } from "react";
import type { Metadata } from "next";
import { ApiDirectoryEmpty } from "@/components/apis/api-directory-empty";
import { ApiDirectoryFeatured } from "@/components/apis/api-directory-featured";
import { ApiDirectoryHeader } from "@/components/apis/api-directory-header";
import { ApiDirectoryResults } from "@/components/apis/api-directory-results";
import { ApiDirectoryTopFilters } from "@/components/apis/api-directory-top-filters";
import type { ApiDirectorySort } from "@/lib/api-directory-constants";
import { API_CAPABILITY_TAGS } from "@/lib/api-directory-constants";
import { getFeaturedApisForHomepage } from "@/lib/discover-home-helpers";
import {
  getApis,
  hasActiveApiFilters,
  type ApiCategory,
  type ApiEcosystem,
  type ApiTag,
  type ApiToolType,
} from "@/lib/api-directory";
import { buildPageMetadata } from "@/lib/site-seo";

function parseTagParam(value: string | undefined): ApiTag | undefined {
  if (!value) return undefined;
  return (API_CAPABILITY_TAGS as readonly string[]).includes(value)
    ? (value as ApiTag)
    : undefined;
}

export const metadata: Metadata = buildPageMetadata({
  title: "APIs & Developer Tools",
  description:
    "Discover free and freemium APIs, SDKs, infrastructure and developer platforms for Web3 builders.",
  path: "/apis",
});

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    ecosystem?: string;
    tag?: string;
    type?: string;
    free?: string;
    freemium?: string;
    sort?: string;
  }>;
};

export default async function ApisPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters = {
    q: params.q,
    category: params.category as ApiCategory | undefined,
    ecosystem: params.ecosystem as ApiEcosystem | undefined,
    tag: parseTagParam(params.tag),
    type: params.type as ApiToolType | undefined,
    free: params.free === "1",
    freemium: params.freemium === "1",
    sort: (params.sort as ApiDirectorySort | undefined) ?? "alpha",
  };

  const apis = await getApis(filters);
  const featuredApis = await getFeaturedApisForHomepage();
  const showFeatured = !hasActiveApiFilters(filters);

  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />
        }
      >
        <ApiDirectoryHeader />
      </Suspense>

      <Suspense fallback={null}>
        <ApiDirectoryTopFilters />
      </Suspense>

      <div className="space-y-6">
        {showFeatured ? <ApiDirectoryFeatured apis={featuredApis} /> : null}

        {apis.length === 0 ? (
          <ApiDirectoryEmpty activeCategory={filters.category} />
        ) : (
          <ApiDirectoryResults apis={apis} />
        )}
      </div>
    </div>
  );
}
