import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  ApiDetailHeader,
  ApiTopActions,
  BulletList,
  CapabilityTags,
  DetailCard,
  DetailSection,
  EcosystemLogoChips,
  ItemGrid,
  QuickFacts,
  ResourceLinks,
  SimilarToolsGrid,
} from "@/components/apis/api-detail-sections";
import {
  getApiBySlug,
  resolveSimilarTool,
  apiDirectory,
} from "@/lib/api-directory";
import { getApiResourceLinks } from "@/lib/api-detail-helpers";
import { buildDetailMetadata } from "@/lib/site-seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return apiDirectory.map((api) => ({ slug: api.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const api = getApiBySlug(slug);

  if (!api) return { title: "API not found" };

  return buildDetailMetadata({
    title: api.name,
    description: api.description,
    path: `/apis/${api.slug}`,
  });
}

export default async function ApiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const api = getApiBySlug(slug);

  if (!api) notFound();

  const similarTools = api.similarTools.map(resolveSimilarTool);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        href="/apis"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400"
      >
        <ArrowLeft className="size-4" />
        Back to API directory
      </Link>

      <ApiDetailHeader api={api} />
      <ApiTopActions api={api} />

      <DetailSection title="Quick Facts">
        <QuickFacts api={api} />
      </DetailSection>

      <DetailSection title="Overview">
        <DetailCard>
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            <span className="font-medium text-neutral-950 dark:text-neutral-50">
              What it does:{" "}
            </span>
            {api.overview}
          </p>
        </DetailCard>
      </DetailSection>

      <DetailSection title="What can you build?">
        <BulletList items={api.whatCanYouBuild} />
      </DetailSection>

      <DetailSection title="What problem does this solve?" defaultOpen={false}>
        <DetailCard>
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {api.problemSolved}
          </p>
        </DetailCard>
      </DetailSection>

      <DetailSection title="Use Cases" defaultOpen={false}>
        <p className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">
          Real examples of what developers build.
        </p>
        <ItemGrid items={api.useCases} />
      </DetailSection>

      {similarTools.length > 0 ? (
        <DetailSection title="Similar Tools" defaultOpen={false}>
          <SimilarToolsGrid items={similarTools} />
        </DetailSection>
      ) : null}

      <DetailSection title="Ecosystem Support" defaultOpen={false}>
        <EcosystemLogoChips ecosystems={api.ecosystems} />
      </DetailSection>

      {getApiResourceLinks(api).length > 0 ? (
        <DetailSection title="Resource Links" defaultOpen={false}>
          <ResourceLinks api={api} />
        </DetailSection>
      ) : null}

      {api.grantInfo ? (
        <DetailSection title="Grant Information" defaultOpen={false}>
          <DetailCard>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {api.grantInfo}
            </p>
          </DetailCard>
        </DetailSection>
      ) : null}

      <DetailSection title="Tags" defaultOpen={false}>
        <CapabilityTags tags={api.tags} />
      </DetailSection>
    </div>
  );
}
