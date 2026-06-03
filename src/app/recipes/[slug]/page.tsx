import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  DetailSection,
  RecipeActionRow,
  RecipeApiList,
  RecipeCategoryList,
  RecipeChipList,
  RecipeDetailHero,
  RecipeLinkList,
  RecipeMetaBadges,
  RecipeRelatedGrid,
  RecipeScreenshotGallery,
  RecipeVideoEmbed,
} from "@/components/recipes/recipe-detail-sections";
import { getRecipeScreenshots } from "@/lib/recipe-helpers";
import {
  getRecipeBySlug,
  getRelatedRecipes,
  recipeDirectory,
} from "@/lib/recipe-directory";
import { buildDetailMetadata } from "@/lib/site-seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return recipeDirectory.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) return { title: "Recipe not found" };

  return buildDetailMetadata({
    title: recipe.name,
    description: recipe.description,
    path: `/recipes/${recipe.slug}`,
  });
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) notFound();

  const relatedRecipes = await getRelatedRecipes(recipe, 4);
  const screenshots = getRecipeScreenshots(recipe);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400"
      >
        <ArrowLeft className="size-4" />
        Back to Recipes
      </Link>

      <RecipeDetailHero recipe={recipe} />
      <RecipeMetaBadges recipe={recipe} />
      <RecipeActionRow recipe={recipe} />

      {screenshots.length > 0 ? (
        <DetailSection title="Screenshots">
          <RecipeScreenshotGallery recipe={recipe} />
        </DetailSection>
      ) : null}

      {recipe.videoUrl ? (
        <DetailSection title="Video Tutorial">
          <RecipeVideoEmbed videoUrl={recipe.videoUrl} />
        </DetailSection>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <DetailSection title="Tech Stack">
          <RecipeChipList title="" items={recipe.techStack} />
        </DetailSection>

        <DetailSection title="Ecosystems">
          <RecipeChipList title="" items={recipe.ecosystems} />
        </DetailSection>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <RecipeApiList recipe={recipe} />
        <RecipeCategoryList recipe={recipe} />
      </div>

      {recipe.links.length > 0 ? (
        <DetailSection title="Resources">
          <RecipeLinkList title="" links={recipe.links} />
        </DetailSection>
      ) : null}

      {recipe.gettingStartedLinks.length > 0 ? (
        <DetailSection title="Getting Started">
          <RecipeLinkList title="" links={recipe.gettingStartedLinks} />
        </DetailSection>
      ) : null}

      <DetailSection title="Related Recipes">
        <RecipeRelatedGrid recipes={relatedRecipes} />
      </DetailSection>
    </div>
  );
}
