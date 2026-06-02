import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectLogo } from "@/components/discover/project-logo";
import { RecipeCoverImage } from "@/components/recipes/recipe-cover-image";
import { Badge } from "@/components/ui/badge";
import type { RecipeEntry } from "@/lib/recipe-directory";
import {
  getRecipeDifficultyLabel,
  getRecipeSetupTimeLabel,
  getRecipeSourceTypeLabel,
} from "@/lib/recipe-directory";
import { cn } from "@/lib/utils";

type RecipeGalleryCardProps = {
  recipe: RecipeEntry;
  className?: string;
};

export function RecipeGalleryCard({ recipe, className }: RecipeGalleryCardProps) {
  return (
    <article
      className={cn(
        "glass-card group flex h-full flex-col overflow-hidden rounded-xl",
        className,
      )}
    >
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--glass-card-border)]">
          <RecipeCoverImage
            recipe={recipe}
            imageClassName="transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-3">
          <ProjectLogo
            slug={recipe.logoSlug ?? recipe.slug}
            name={recipe.name}
            websiteUrl={recipe.docsUrl ?? recipe.sourceUrl}
            size={28}
            className="shrink-0"
          />
          <div className="min-w-0 flex-1">
            <Link
              href={`/recipes/${recipe.slug}`}
              className="font-semibold text-neutral-950 hover:underline dark:text-neutral-50"
            >
              {recipe.name}
            </Link>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {recipe.description}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="text-[10px]">
            {getRecipeSourceTypeLabel(recipe.sourceType)}
          </Badge>
          <Badge variant="muted" className="text-[10px]">
            {recipe.sourceLabel}
          </Badge>
          {recipe.isOpenSource ? (
            <Badge variant="outline" className="text-[10px]">
              Open Source
            </Badge>
          ) : null}
          {recipe.githubUrl ? (
            <Badge variant="muted" className="gap-1 text-[10px]">
              <Github className="size-2.5" />
              GitHub
            </Badge>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {recipe.ecosystems.slice(0, 4).map((ecosystem) => (
            <span
              key={ecosystem}
              className="rounded-full border border-neutral-200 px-2 py-0.5 text-[10px] text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
            >
              {ecosystem}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
          <span>{getRecipeDifficultyLabel(recipe.difficulty)}</span>
          <span aria-hidden>·</span>
          <span>{getRecipeSetupTimeLabel(recipe.setupTime)}</span>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Link
            href={`/recipes/${recipe.slug}`}
            className="glass-card-action inline-flex flex-1 items-center justify-center rounded-md px-3 py-2 text-xs font-medium"
          >
            View Recipe
          </Link>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card-action inline-flex items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium"
          >
            Source
            <ArrowUpRight className="size-3 text-neutral-400" />
          </a>
          {recipe.githubUrl ? (
            <a
              href={recipe.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-action inline-flex items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium"
            >
              GitHub
              <Github className="size-3 text-neutral-400" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
