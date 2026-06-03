import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Globe2 } from "lucide-react";
import { ApiGridCard } from "@/components/categories/api-grid-card";
import { CategorySection } from "@/components/categories/category-section";
import {
  GrantBulletList,
  GrantRelatedEcosystem,
  GrantSectionCard,
  GrantStepsList,
} from "@/components/grants/grant-detail-sections";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatFundingStages,
  getEcosystemName,
  getFundingTypeLabel,
  getGrantBySlug,
  getGrantStatusLabel,
  getRelatedApisForGrant,
  getRelatedEcosystemForGrant,
  getRelatedRecipesForGrant,
  grantsDirectory,
} from "@/lib/grants-directory";
import { buildDetailMetadata } from "@/lib/site-seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return grantsDirectory.map((grant) => ({ slug: grant.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const grant = getGrantBySlug(slug);

  if (!grant) return { title: "Opportunity not found" };

  return buildDetailMetadata({
    title: grant.name,
    description: grant.description,
    path: `/grants/${grant.slug}`,
  });
}

export default async function GrantDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const grant = getGrantBySlug(slug);

  if (!grant) notFound();

  const relatedApis = getRelatedApisForGrant(grant);
  const relatedRecipes = getRelatedRecipesForGrant(grant);
  const relatedEcosystem = getRelatedEcosystemForGrant(grant);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-10">
      <Link
        href="/grants"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
      >
        <ArrowLeft className="size-4" />
        All funding opportunities
      </Link>

      <header className="space-y-4 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {grant.name}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {grant.org}
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {grant.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {getFundingTypeLabel(grant.fundingType, grant.fundingTypeLabel)}
          </Badge>
          <Badge variant="outline">
            {formatFundingStages(grant.fundingStages)}
          </Badge>
          <Badge variant="outline">{getGrantStatusLabel(grant.status)}</Badge>
          {grant.remoteFriendly ? (
            <Badge variant="outline" className="gap-1">
              <Globe2 className="size-3" />
              Remote friendly
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {grant.applyUrl ? (
            <Button asChild size="sm">
              <a href={grant.applyUrl} target="_blank" rel="noopener noreferrer">
                Apply
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          ) : null}
          {grant.websiteUrl ? (
            <Button asChild variant="outline" size="sm">
              <a href={grant.websiteUrl} target="_blank" rel="noopener noreferrer">
                Official Website
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          ) : null}
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FactCard label="Funding Type" value={getFundingTypeLabel(grant.fundingType, grant.fundingTypeLabel)} />
        <FactCard label="Funding Stage" value={formatFundingStages(grant.fundingStages)} />
        <FactCard label="Funding Range" value={grant.fundingRange} />
        <FactCard label="Deadline" value={grant.deadline} />
        <FactCard label="Location" value={grant.location} />
        <FactCard
          label="Remote"
          value={grant.remoteFriendly ? "Remote friendly" : "In-person preferred"}
        />
      </div>

      <CategorySection title="Eligibility">
        <GrantSectionCard>
          <GrantBulletList items={grant.eligibility} />
        </GrantSectionCard>
      </CategorySection>

      <CategorySection title="Application Process">
        <GrantSectionCard>
          <GrantStepsList steps={grant.applicationSteps} />
        </GrantSectionCard>
      </CategorySection>

      <CategorySection title="Overview">
        <GrantSectionCard>
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {grant.overview}
          </p>
        </GrantSectionCard>
      </CategorySection>

      <CategorySection
        title="Related Ecosystem"
        href={`/ecosystems/${grant.ecosystemSlug}`}
      >
        {relatedEcosystem ? (
          <GrantRelatedEcosystem
            slug={relatedEcosystem.slug}
            name={relatedEcosystem.name}
            description={relatedEcosystem.description}
          />
        ) : (
          <GrantSectionCard>
            <p className="text-sm">{getEcosystemName(grant.ecosystemSlug)}</p>
          </GrantSectionCard>
        )}
      </CategorySection>

      <CategorySection title="Related APIs" href="/apis">
        {relatedApis.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No related APIs listed.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedApis.map((api) => (
              <ApiGridCard key={api.slug} api={api} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection title="Related Recipes" href="/recipes">
        {relatedRecipes.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No related recipes listed.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}
      </CategorySection>
    </div>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <GrantSectionCard>
      <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-snug">{value}</p>
    </GrantSectionCard>
  );
}
