import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ToolCard, ToolMeta } from "@/components/tools/tool-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getRelatedTools, getToolBySlug } from "@/lib/tools";
import { formatCategory, formatPricing } from "@/lib/constants";
import { buildDetailMetadata } from "@/lib/site-seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return { title: "Tool not found" };
  }

  return buildDetailMetadata({
    title: tool.name,
    description: tool.tagline,
    path: `/tools/${tool.slug}`,
  });
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const related = await getRelatedTools(tool);

  return (
    <div className="space-y-10">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
      >
        <ArrowLeft className="size-4" />
        Back to directory
      </Link>

      <PageHeader
        title={tool.name}
        subtitle={tool.tagline}
        stats={[
          { label: "Category", value: formatCategory(tool.category) },
          { label: "Pricing", value: formatPricing(tool.pricing) },
          { label: "Tags", value: tool.tags.length },
        ]}
      >
        <ToolMeta tool={tool} />
      </PageHeader>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          About
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
          {tool.description}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            Visit website
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
        {tool.githubUrl && (
          <Button variant="outline" asChild>
            <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        )}
      </div>

      {related.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Related tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((relatedTool) => (
              <ToolCard key={relatedTool.id} tool={relatedTool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
