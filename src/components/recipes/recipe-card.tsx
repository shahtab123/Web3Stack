import type { RecipeEntry } from "@/lib/recipe-directory";
import { RecipeGalleryCard } from "@/components/recipes/recipe-gallery-card";

type RecipeCardProps = {
  recipe: RecipeEntry;
  compact?: boolean;
};

export function RecipeCard({ recipe, compact }: RecipeCardProps) {
  return <RecipeGalleryCard recipe={recipe} compact={compact} />;
}
