"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectLogo } from "@/components/discover/project-logo";
import type { RecipeEntry } from "@/lib/recipe-directory-types";
import { getRecipeThumbnailUrl } from "@/lib/recipe-helpers";
import { cn } from "@/lib/utils";

type RecipeCoverImageProps = {
  recipe: RecipeEntry;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function RecipeCoverImage({
  recipe,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: RecipeCoverImageProps) {
  const [failed, setFailed] = useState(false);
  const src = getRecipeThumbnailUrl(recipe);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex size-full items-center justify-center bg-neutral-100 dark:bg-neutral-900",
          className,
        )}
      >
        <ProjectLogo
          slug={recipe.logoSlug ?? recipe.slug}
          name={recipe.name}
          websiteUrl={recipe.docsUrl ?? recipe.sourceUrl}
          size={56}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative size-full overflow-hidden bg-neutral-100 dark:bg-neutral-900", className)}>
      <Image
        src={src}
        alt={recipe.name}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
