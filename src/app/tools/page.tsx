import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ToolFilters } from "@/components/tools/tool-filters";
import { ToolsTable } from "@/components/tools/tools-table";
import { ToolCard } from "@/components/tools/tool-card";
import type { Category, Pricing } from "@/lib/constants";
import { getTools } from "@/lib/tools";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Developer Tools",
  description:
    "Search and filter free, freemium, and open-source developer tools for Web3 and general development.",
  path: "/tools",
});

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    pricing?: string;
    sort?: string;
    view?: string;
  }>;
};

export default async function ToolsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters = {
    q: params.q,
    category: params.category as Category | undefined,
    pricing: params.pricing as Pricing | undefined,
    sort: (params.sort as "name" | "newest" | "featured") ?? "featured",
  };

  const tools = await getTools(filters);
  const view = params.view ?? "grid";
  const preserved = new URLSearchParams();
  if (params.q) preserved.set("q", params.q);
  if (params.category) preserved.set("category", params.category);
  if (params.pricing) preserved.set("pricing", params.pricing);
  if (params.sort) preserved.set("sort", params.sort);
  const queryString = preserved.toString();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tool directory"
        subtitle="Search, filter, and browse free and freemium tools across Web3, fintech, AI, and developer categories."
        stats={[
          { label: "Results", value: tools.length },
          { label: "View", value: view === "table" ? "Table" : "Grid" },
        ]}
      />

      <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />}>
        <ToolFilters />
      </Suspense>

      <ViewToggle currentView={view} queryString={queryString} />

      {view === "table" ? (
        <ToolsTable tools={tools} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.length === 0 ? (
            <div className="col-span-full rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No tools match your filters.
              </p>
            </div>
          ) : (
            tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
          )}
        </div>
      )}
    </div>
  );
}

function ViewToggle({
  currentView,
  queryString,
}: {
  currentView: string;
  queryString: string;
}) {
  const suffix = queryString ? `${queryString}&` : "";

  return (
    <div className="flex gap-2">
      <a
        href={`?${suffix}view=grid`}
        className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
          currentView !== "table"
            ? "border-neutral-950 bg-neutral-950 text-neutral-50 dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
            : "border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
        }`}
      >
        Grid
      </a>
      <a
        href={`?${suffix}view=table`}
        className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
          currentView === "table"
            ? "border-neutral-950 bg-neutral-950 text-neutral-50 dark:border-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
            : "border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
        }`}
      >
        Table
      </a>
    </div>
  );
}
