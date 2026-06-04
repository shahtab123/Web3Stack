import { Suspense } from "react";
import type { Metadata } from "next";
import { IntelFilterBar } from "@/components/builder-intel/intel-filter-bar";
import { IntelGallerySection } from "@/components/builder-intel/intel-gallery-section";
import { IntelSectionLoader } from "@/components/builder-intel/intel-section-loader";
import type { IntelFilter } from "@/lib/intel-posts";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Builder Intel",
  description:
    "Curated posts from X, Reddit and more — APIs, grants, hackathons, startup ideas and builder resources.",
  path: "/builder-intel",
});

type PageProps = {
  searchParams: Promise<{
    q?: string;
    filter?: string;
  }>;
};

export default async function BuilderIntelPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const intelFilters = {
    q: params.q,
    filter: (params.filter as IntelFilter) ?? "all",
  };
  const listResetKey = JSON.stringify(intelFilters);

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-3xl">
          Builder Intel
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
          Interesting discoveries, product launches, APIs, grants, hackathons,
          startup ideas and builder resources collected from across the internet.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="h-28 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />
        }
      >
        <IntelFilterBar />
      </Suspense>

      <Suspense
        key={listResetKey}
        fallback={
          <IntelSectionLoader label="Loading posts…" className="min-h-[50vh]" />
        }
      >
        <IntelGallerySection filters={intelFilters} resetKey={listResetKey} />
      </Suspense>
    </div>
  );
}
