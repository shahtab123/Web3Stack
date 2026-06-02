"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectLogo } from "@/components/discover/project-logo";
import { SectionHeader } from "@/components/discover/section-header";
import type { RecipeEntry } from "@/lib/recipe-directory-types";
import {
  getRecipeDifficultyLabel,
  getRecipeSetupTimeLabel,
} from "@/lib/recipe-directory-types";
import { FadeIn } from "@/components/discover/motion";
import { cn } from "@/lib/utils";

type PopularRecipesProps = {
  recipes: RecipeEntry[];
};

export function PopularRecipes({ recipes }: PopularRecipesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="popular-recipes-heading" className="space-y-6">
      <FadeIn>
        <SectionHeader
          id="popular-recipes-heading"
          title="Popular Recipes"
          subtitle="Real starter apps, demos, and templates you can fork today."
          href="/recipes"
        />
      </FadeIn>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe, index) => {
          const Card = reduceMotion ? "div" : motion.div;
          const cardProps = reduceMotion
            ? {}
            : {
                whileHover: { y: -2 },
                transition: { duration: 0.2, ease: "easeOut" as const },
              };

          return (
            <FadeIn key={recipe.slug} delay={index * 0.04}>
              <Card {...cardProps}>
                <Link
                  href={`/recipes/${recipe.slug}`}
                  className={cn(
                    "flex h-full flex-col rounded-xl bg-surface/70 p-5",
                    "transition-colors duration-200 hover:bg-surface-hover",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                  )}
                >
                  <h3 className="font-medium text-foreground">{recipe.name}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                    {recipe.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {recipe.apis.map((api) => (
                      <ProjectLogo
                        key={`${recipe.slug}-${api.slug ?? api.name}`}
                        slug={api.slug ?? api.name.toLowerCase()}
                        name={api.name}
                        size={26}
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4 text-xs text-muted">
                    <span>{getRecipeDifficultyLabel(recipe.difficulty)}</span>
                    <span aria-hidden>·</span>
                    <span>{getRecipeSetupTimeLabel(recipe.setupTime)}</span>
                  </div>
                </Link>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
