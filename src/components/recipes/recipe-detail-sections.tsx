import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectLogo } from "@/components/discover/project-logo";
import { RecipeCoverImage } from "@/components/recipes/recipe-cover-image";
import { RecipeGalleryCard } from "@/components/recipes/recipe-gallery-card";
import { Badge } from "@/components/ui/badge";
import type { RecipeEntry } from "@/lib/recipe-directory";
import {
  getRecipeCategoryLabel,
  getRecipeDifficultyLabel,
  getRecipeSetupTimeLabel,
  getRecipeSourceTypeLabel,
} from "@/lib/recipe-directory";
import { getRecipeScreenshots } from "@/lib/recipe-helpers";
import { EMBED_ALLOW_NO_AUTOPLAY, withoutVideoAutoplay } from "@/lib/embed-utils";

export function RecipeDetailHero({ recipe }: { recipe: RecipeEntry }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="relative aspect-[21/9] min-h-[180px] overflow-hidden">
        <RecipeCoverImage recipe={recipe} priority sizes="100vw" />
      </div>

      <div className="space-y-3 p-6">
        <div className="flex items-start gap-3">
          <ProjectLogo
            slug={recipe.logoSlug ?? recipe.slug}
            name={recipe.name}
            websiteUrl={recipe.docsUrl ?? recipe.sourceUrl}
            size={40}
          />
          <div>
            <h1 className="text-2xl font-semibold">{recipe.name}</h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecipeMetaBadges({ recipe }: { recipe: RecipeEntry }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">{getRecipeSourceTypeLabel(recipe.sourceType)}</Badge>
      <Badge variant="muted">{recipe.sourceLabel}</Badge>
      <Badge variant="outline">{getRecipeDifficultyLabel(recipe.difficulty)}</Badge>
      <Badge variant="muted">{getRecipeSetupTimeLabel(recipe.setupTime)}</Badge>
      {recipe.isOpenSource ? <Badge variant="outline">Open Source</Badge> : null}
      {recipe.isFree ? <Badge variant="muted">Free</Badge> : null}
    </div>
  );
}

export function RecipeActionRow({ recipe }: { recipe: RecipeEntry }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={recipe.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium transition-colors hover:border-neutral-400 dark:border-neutral-800"
      >
        Source
        <ArrowUpRight className="size-4 text-neutral-400" />
      </a>
      {recipe.docsUrl ? (
        <a
          href={recipe.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium dark:border-neutral-800"
        >
          Documentation
          <ArrowUpRight className="size-4 text-neutral-400" />
        </a>
      ) : null}
      {recipe.githubUrl ? (
        <a
          href={recipe.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium dark:border-neutral-800"
        >
          GitHub
          <Github className="size-4 text-neutral-400" />
        </a>
      ) : null}
    </div>
  );
}

export function RecipeScreenshotGallery({ recipe }: { recipe: RecipeEntry }) {
  const screenshots = getRecipeScreenshots(recipe);

  if (screenshots.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {screenshots.map((src) => (
        <div
          key={src}
          className="relative aspect-video overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
        >
          <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      ))}
    </div>
  );
}

export function RecipeVideoEmbed({ videoUrl }: { videoUrl: string }) {
  const embedUrl = withoutVideoAutoplay(videoUrl);

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title="Recipe tutorial video"
          className="size-full"
          allow={EMBED_ALLOW_NO_AUTOPLAY}
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function RecipeLinkList({
  title,
  links,
}: {
  title?: string;
  links: RecipeEntry["gettingStartedLinks"];
}) {
  if (links.length === 0) return null;

  return (
    <div className="space-y-2">
      {title ? <h3 className="text-sm font-medium">{title}</h3> : null}
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-neutral-800 hover:underline dark:text-neutral-200"
            >
              {link.label}
              <ArrowUpRight className="size-3.5 text-neutral-400" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecipeChipList({
  title,
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className="space-y-2">
      {title ? <h3 className="text-sm font-medium">{title}</h3> : null}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs dark:border-neutral-800"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RecipeApiList({ recipe }: { recipe: RecipeEntry }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Used APIs</h3>
      <ul className="space-y-1.5">
        {recipe.apis.map((api) => (
          <li key={api.name} className="text-sm">
            {api.slug ? (
              <Link
                href={`/apis/${api.slug}`}
                className="text-neutral-800 hover:underline dark:text-neutral-200"
              >
                {api.name}
              </Link>
            ) : (
              api.name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecipeCategoryList({ recipe }: { recipe: RecipeEntry }) {
  return (
    <RecipeChipList
      title="Categories"
      items={recipe.categories.map(getRecipeCategoryLabel)}
    />
  );
}

export function RecipeRelatedGrid({ recipes }: { recipes: RecipeEntry[] }) {
  if (recipes.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <RecipeGalleryCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  );
}

export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}
