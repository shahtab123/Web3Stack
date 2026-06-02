import { getBrandLogoUrl } from "@/lib/brand-logos";
import type { RecipeEntry } from "@/lib/recipe-directory-types";

export function parseGithubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("github.com")) return null;

    const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;

    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

export function getGithubOpenGraphImage(url: string): string | null {
  const repo = parseGithubRepo(url);
  if (!repo) return null;

  return `https://opengraph.githubassets.com/1/${repo.owner}/${repo.repo}`;
}

export function getYoutubeThumbnailId(url: string): string | null {
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (embedMatch?.[1]) return embedMatch[1];

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch?.[1]) return watchMatch[1];

  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch?.[1]) return shortMatch[1];

  return null;
}

export function getYoutubeThumbnail(url: string): string | null {
  const id = getYoutubeThumbnailId(url);
  if (!id) return null;

  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

function getLogoFallbackImage(recipe: RecipeEntry): string | null {
  const logoUrl = getBrandLogoUrl(
    recipe.logoSlug ?? recipe.slug,
    recipe.docsUrl ?? recipe.sourceUrl,
  );

  return logoUrl;
}

/** Resolve a preview image from GitHub, YouTube, or explicit recipe metadata. */
export function getRecipeThumbnailUrl(recipe: RecipeEntry): string | null {
  if (recipe.thumbnailUrl) return recipe.thumbnailUrl;

  if (recipe.githubUrl) {
    const githubImage = getGithubOpenGraphImage(recipe.githubUrl);
    if (githubImage) return githubImage;
  }

  if (recipe.sourceUrl) {
    const sourceGithubImage = getGithubOpenGraphImage(recipe.sourceUrl);
    if (sourceGithubImage) return sourceGithubImage;
  }

  if (recipe.videoUrl) {
    const youtubeImage = getYoutubeThumbnail(recipe.videoUrl);
    if (youtubeImage) return youtubeImage;
  }

  return getLogoFallbackImage(recipe);
}

export function getRecipeScreenshots(recipe: RecipeEntry): string[] {
  if (recipe.screenshots.length > 0) return recipe.screenshots;

  const images: string[] = [];

  const add = (url: string | null) => {
    if (url && !images.includes(url)) images.push(url);
  };

  add(getRecipeThumbnailUrl(recipe));

  if (recipe.githubUrl) {
    add(getGithubOpenGraphImage(recipe.githubUrl));
  }

  if (recipe.sourceUrl) {
    add(getGithubOpenGraphImage(recipe.sourceUrl));
  }

  if (recipe.videoUrl) {
    add(getYoutubeThumbnail(recipe.videoUrl));
  }

  return images;
}

export function getRecipePreviewLabel(recipe: Pick<RecipeEntry, "sourceType">) {
  if (recipe.sourceType === "demo-app") return "Demo";
  if (recipe.sourceType === "template") return "Template";
  if (recipe.sourceType === "video") return "Video";
  if (recipe.sourceType === "github") return "GitHub";
  return "Source";
}
