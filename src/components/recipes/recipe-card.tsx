import type { RecipeEntry } from "@/lib/recipe-directory";
import { RecipeGalleryCard } from "@/components/recipes/recipe-gallery-card";

type RecipeCardProps = {
  recipe: RecipeEntry;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return <RecipeGalleryCard recipe={recipe} />;
}
