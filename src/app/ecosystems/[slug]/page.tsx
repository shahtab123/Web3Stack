import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { IntelEmbedScripts } from "@/components/builder-intel/intel-embed-scripts";
import { IntelPostCard } from "@/components/builder-intel/intel-post-card";
import { ApiGridCard } from "@/components/categories/api-grid-card";
import { CategorySection } from "@/components/categories/category-section";
import { EcosystemPortalNav } from "@/components/ecosystems/ecosystem-portal-nav";
import { FeaturedProjectCard } from "@/components/ecosystems/featured-project-card";
import { GrantGridCard } from "@/components/ecosystems/grant-grid-card";
import { ResourceLinkList } from "@/components/ecosystems/resource-link-list";
import { PageHeader } from "@/components/layout/page-header";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { loadApiCatalog, loadRecipeCatalog } from "@/lib/directory-db";
import {
  BROWSE_ECOSYSTEMS,
  getBrowseEcosystemBySlug,
  getEcosystemPortalSubtitle,
  getFeaturedApisForBrowseEcosystem,
  getFeaturedProjectsForBrowseEcosystem,
  getGrantsForBrowseEcosystem,
  getIntelPostItemsForBrowseEcosystem,
  getRecipesForBrowseEcosystem,
  getResourcesForBrowseEcosystem,
} from "@/lib/browse-ecosystems";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return BROWSE_ECOSYSTEMS.map((ecosystem) => ({ slug: ecosystem.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ecosystem = getBrowseEcosystemBySlug(slug);

  if (!ecosystem) return { title: "Ecosystem not found" };

  return {
    title: ecosystem.name,
    description: getEcosystemPortalSubtitle(ecosystem.name),
  };
}

export default async function EcosystemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ecosystem = getBrowseEcosystemBySlug(slug);

  if (!ecosystem) notFound();

  const subtitle = getEcosystemPortalSubtitle(ecosystem.name);
  const [apiCatalog, recipeCatalog] = await Promise.all([
    loadApiCatalog(),
    loadRecipeCatalog(),
  ]);
  const featuredApis = getFeaturedApisForBrowseEcosystem(ecosystem, apiCatalog);
  const recipes = getRecipesForBrowseEcosystem(
    ecosystem,
    apiCatalog,
    recipeCatalog,
  ).slice(0, 4);
  const grants = getGrantsForBrowseEcosystem(ecosystem);
  const intelPosts = getIntelPostItemsForBrowseEcosystem(ecosystem, 3);
  const featuredProjects = getFeaturedProjectsForBrowseEcosystem(ecosystem);
  const resources = getResourcesForBrowseEcosystem(ecosystem);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-12">
      <Link
        href="/ecosystems"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
      >
        <ArrowLeft className="size-4" />
        All ecosystems
      </Link>

      <PageHeader title={ecosystem.name} subtitle={subtitle}>
        <EcosystemPortalNav ecosystem={ecosystem} />
      </PageHeader>

      <CategorySection id="overview" title="Overview">
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {ecosystem.overview}
        </p>
      </CategorySection>

      <CategorySection
        id="apis"
        title="Featured APIs"
        href={`/apis?ecosystem=${encodeURIComponent(ecosystem.apiTags[0] ?? ecosystem.name)}`}
      >
        {featuredApis.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No APIs tagged for this ecosystem yet.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredApis.map((api) => (
              <ApiGridCard key={api.slug} api={api} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection id="recipes" title="Build Recipes" href="/recipes">
        {recipes.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No build recipes linked to this ecosystem yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection id="grants" title="Grants" href="/grants">
        {grants.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No active grant programs listed yet.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {grants.map((grant) => (
              <GrantGridCard key={grant.slug} grant={grant} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection
        id="intel"
        title="Builder Intel"
        href="/builder-intel"
        linkLabel="More intel"
      >
        {intelPosts.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No builder intel posts tagged for this ecosystem yet.
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {intelPosts.map((post) => (
              <IntelPostCard key={post.postUrl} post={post} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection id="projects" title="Featured Projects">
        {featuredProjects.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No featured projects listed yet.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.url} project={project} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection id="resources" title="Resources">
        {resources.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No official resources listed yet.
          </p>
        ) : (
          <ResourceLinkList resources={resources} />
        )}
      </CategorySection>

      <IntelEmbedScripts />
    </div>
  );
}
