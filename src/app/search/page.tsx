import { Suspense } from "react";
import type { Metadata } from "next";
import { GlobalSearch } from "@/components/search/global-search";
import { globalSearch } from "@/lib/global-search";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search across APIs, recipes, grants, ecosystems and builder intel.",
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const results = query ? await globalSearch(query) : null;

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-3xl">
          Search
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
          Search across APIs, recipes, grants, ecosystems and builder intel.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="mx-auto h-14 max-w-2xl animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />
        }
      >
        <GlobalSearch initialQuery={query} results={results} />
      </Suspense>
    </div>
  );
}
