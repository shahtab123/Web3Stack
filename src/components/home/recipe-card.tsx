import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { RecipeEntry } from "@/lib/recipe-directory";
import {
  getRecipeDifficultyLabel,
  getRecipeSetupTimeLabel,
} from "@/lib/recipe-directory";

export function HomeRecipeCard({ recipe }: { recipe: RecipeEntry }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium group-hover:underline">{recipe.name}</p>
        <Badge variant="outline" className="shrink-0 text-[10px]">
          {getRecipeDifficultyLabel(recipe.difficulty)}
        </Badge>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {recipe.description}
      </p>
      <p className="mt-3 text-xs text-neutral-400">
        {getRecipeSetupTimeLabel(recipe.setupTime)}
      </p>
    </Link>
  );
}
