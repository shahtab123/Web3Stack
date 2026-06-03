import { Suspense } from "react";
import type { Metadata } from "next";
import { IntelEmbedScripts } from "@/components/builder-intel/intel-embed-scripts";
import { IntelFilterBar } from "@/components/builder-intel/intel-filter-bar";
import { IntelPostCard } from "@/components/builder-intel/intel-post-card";
import { getIntelPosts, type IntelFilter } from "@/lib/intel-posts";
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

  const posts = await getIntelPosts({
    q: params.q,
    filter: (params.filter as IntelFilter) ?? "all",
  });

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

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 py-20 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No bookmarks match your filters.
          </p>
        </div>
      ) : (
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {posts.map((post) => (
            <IntelPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <IntelEmbedScripts />
    </div>
  );
}
