import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ApiGridCard } from "@/components/categories/api-grid-card";
import { CategorySection } from "@/components/categories/category-section";
import { IdeaCompactCard } from "@/components/ideas/idea-card";
import { PageHeader } from "@/components/layout/page-header";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { Badge } from "@/components/ui/badge";
import {
  getIdeaBySlug,
  getIdeaCategoryLabel,
  getIdeaDifficultyLabel,
  getIdeaGroupLabel,
  getRelatedIdeasForIdea,
  getRelatedRecipesForIdea,
  getSuggestedApisForIdea,
  getSuggestedEcosystemsForIdea,
  ideasDirectory,
} from "@/lib/ideas-directory";
import {
  GrantBulletList,
  GrantSectionCard,
} from "@/components/grants/grant-detail-sections";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ideasDirectory.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);

  if (!idea) return { title: "Idea not found" };

  return {
    title: idea.title,
    description: idea.description,
  };
}

export default async function IdeaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);

  if (!idea) notFound();

  const suggestedApis = getSuggestedApisForIdea(idea);
  const suggestedEcosystems = getSuggestedEcosystemsForIdea(idea);
  const relatedRecipes = getRelatedRecipesForIdea(idea);
  const relatedIdeas = getRelatedIdeasForIdea(idea);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-12">
      <Link
        href="/ideas"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
      >
        <ArrowLeft className="size-4" />
        All ideas
      </Link>

      <PageHeader title={idea.title} subtitle={idea.description}>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {getIdeaDifficultyLabel(idea.difficulty)}
          </Badge>
          <Badge variant="outline">
            {getIdeaGroupLabel(idea.group)}
          </Badge>
          <Badge variant="outline">
            {getIdeaCategoryLabel(idea.category)}
          </Badge>
          <Badge variant="muted">{idea.estimatedBuildTime}</Badge>
        </div>
      </PageHeader>

      <CategorySection title="Overview">
        <GrantSectionCard>
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {idea.overview}
          </p>
        </GrantSectionCard>
      </CategorySection>

      <CategorySection title="Problem">
        <GrantSectionCard>
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {idea.problem}
          </p>
        </GrantSectionCard>
      </CategorySection>

      <CategorySection title="Suggested Features">
        <GrantSectionCard>
          <GrantBulletList items={idea.suggestedFeatures} />
        </GrantSectionCard>
      </CategorySection>

      <CategorySection title="Suggested APIs" href="/apis">
        {suggestedApis.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No suggested APIs listed.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {suggestedApis.map((api) => (
              <ApiGridCard key={api.slug} api={api} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection title="Suggested Ecosystems" href="/ecosystems">
        {suggestedEcosystems.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No suggested ecosystems listed.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {suggestedEcosystems.map((ecosystem) => (
              <Link
                key={ecosystem.slug}
                href={`/ecosystems/${ecosystem.slug}`}
                className="group block rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium group-hover:underline">
                    {ecosystem.name}
                  </p>
                  <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
                </div>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {ecosystem.description}
                </p>
              </Link>
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

      <CategorySection title="Related Ideas">
        {relatedIdeas.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No related ideas listed.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedIdeas.map((related) => (
              <IdeaCompactCard key={related.slug} idea={related} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection title="Examples">
        {idea.examples.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No example projects listed.
          </p>
        ) : (
          <div className="space-y-2">
            {idea.examples.map((example) => (
              <a
                key={example.url}
                href={example.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
              >
                <span className="font-medium group-hover:underline">
                  {example.name}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
              </a>
            ))}
          </div>
        )}
      </CategorySection>
    </div>
  );
}
