import type { Metadata } from "next";
import { ExplorerSection } from "@/components/discover/explorer-section";
import { FeaturedApis } from "@/components/discover/featured-apis";
import { CategorySection } from "@/components/discover/category-section";
import { PopularRecipes } from "@/components/discover/popular-recipes";
import { EcosystemShowcase } from "@/components/discover/ecosystem-showcase";
import { IntelPreview } from "@/components/discover/intel-preview";
import { GrantsPreview } from "@/components/discover/grants-preview";
import { DiscoverMetrics } from "@/components/discover/discover-metrics";
import {
  getFeaturedApisForHomepage,
  getHomepageEcosystems,
} from "@/lib/discover-home-helpers";
import { getRecipes } from "@/lib/recipe-directory";
import { getGrants } from "@/lib/grants-directory";
import { getHomepageIntelPreview } from "@/lib/intel-posts";

export const metadata: Metadata = {
  title: "Discover",
  description:
    "Everything you need to build in Web3. Free and open — APIs, tools, recipes, grants and ecosystems.",
};

export default async function HomePage() {
  const [intelPreview, featuredApis, featuredRecipes, homepageEcosystems, activeGrants] =
    await Promise.all([
      getHomepageIntelPreview(),
      getFeaturedApisForHomepage(),
      getRecipes().then((recipes) => recipes.slice(0, 6)),
      getHomepageEcosystems(),
      getGrants({ status: "active" }).then((grants) => grants.slice(0, 4)),
    ]);

  return (
    <div className="space-y-14 sm:space-y-16">
      <ExplorerSection />
      <FeaturedApis apis={featuredApis} />
      <CategorySection />
      <PopularRecipes recipes={featuredRecipes} />
      <EcosystemShowcase ecosystems={homepageEcosystems} />
      <IntelPreview posts={intelPreview} />
      <GrantsPreview grants={activeGrants} />
      <DiscoverMetrics />
    </div>
  );
}
