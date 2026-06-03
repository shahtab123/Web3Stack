import type { MetadataRoute } from "next";
import { apiDirectory } from "@/lib/api-directory-data";
import { BROWSE_ECOSYSTEMS } from "@/lib/browse-ecosystems";
import { cryptoStocksDirectory } from "@/lib/crypto-stocks-directory-data";
import { grantsDirectory } from "@/lib/grants-directory-data";
import { ideasDirectory } from "@/lib/ideas-directory-data";
import { recipeDirectory } from "@/lib/recipe-directory-data";
import { absoluteUrl } from "@/lib/site-seo";

type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(
  path: string,
  options: Pick<SitemapEntry, "changeFrequency" | "priority">,
): SitemapEntry {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    ...options,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: SitemapEntry[] = [
    entry("/", { changeFrequency: "daily", priority: 1 }),
    entry("/apis", { changeFrequency: "daily", priority: 0.95 }),
    entry("/recipes", { changeFrequency: "daily", priority: 0.9 }),
    entry("/ideas", { changeFrequency: "weekly", priority: 0.85 }),
    entry("/ecosystems", { changeFrequency: "weekly", priority: 0.85 }),
    entry("/grants", { changeFrequency: "daily", priority: 0.9 }),
    entry("/builder-intel", { changeFrequency: "daily", priority: 0.8 }),
    entry("/crypto-stocks", { changeFrequency: "daily", priority: 0.75 }),
    entry("/search", { changeFrequency: "weekly", priority: 0.6 }),
    entry("/about", { changeFrequency: "monthly", priority: 0.5 }),
    entry("/submit", { changeFrequency: "monthly", priority: 0.55 }),
    entry("/contributors", { changeFrequency: "monthly", priority: 0.5 }),
    entry("/tools", { changeFrequency: "weekly", priority: 0.7 }),
  ];

  const apiRoutes = apiDirectory.map((api) =>
    entry(`/apis/${api.slug}`, { changeFrequency: "weekly", priority: 0.7 }),
  );

  const recipeRoutes = recipeDirectory.map((recipe) =>
    entry(`/recipes/${recipe.slug}`, {
      changeFrequency: "weekly",
      priority: 0.65,
    }),
  );

  const ideaRoutes = ideasDirectory.map((idea) =>
    entry(`/ideas/${idea.slug}`, { changeFrequency: "monthly", priority: 0.6 }),
  );

  const grantRoutes = grantsDirectory.map((grant) =>
    entry(`/grants/${grant.slug}`, {
      changeFrequency: "weekly",
      priority: 0.65,
    }),
  );

  const ecosystemRoutes = BROWSE_ECOSYSTEMS.map((eco) =>
    entry(`/ecosystems/${eco.slug}`, {
      changeFrequency: "weekly",
      priority: 0.65,
    }),
  );

  const stockRoutes = cryptoStocksDirectory.map((stock) =>
    entry(`/crypto-stocks/${stock.ticker.toLowerCase()}`, {
      changeFrequency: "daily",
      priority: 0.55,
    }),
  );

  return [
    ...staticRoutes,
    ...apiRoutes,
    ...recipeRoutes,
    ...ideaRoutes,
    ...grantRoutes,
    ...ecosystemRoutes,
    ...stockRoutes,
  ];
}
