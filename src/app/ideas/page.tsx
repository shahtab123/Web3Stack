import { Suspense } from "react";
import type { Metadata } from "next";
import { IdeaCard } from "@/components/ideas/idea-card";
import { IdeaFilters } from "@/components/ideas/idea-filters";
import { PageHeader } from "@/components/layout/page-header";
import { getIdeas } from "@/lib/ideas-directory";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Ideas",
  description:
    "Discover products, tools and startups that can be built using open-source, free and freemium Web3 APIs.",
  path: "/ideas",
});

type PageProps = {
  searchParams: Promise<{
    q?: string;
    filter?: string;
  }>;
};

export default async function IdeasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = {
    q: params.q,
    filter: params.filter,
  };
  const ideas = await getIdeas(filters);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-10">
      <PageHeader
        title={`Ideas (${ideas.length})`}
        subtitle="Discover products, tools and startups that can be built using open-source, free and freemium APIs."
      />

      <Suspense
        fallback={
          <div className="mx-auto h-24 max-w-xl animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />
        }
      >
        <IdeaFilters />
      </Suspense>

      {ideas.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No ideas match your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.slug} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}
