import Link from "next/link";
import { ApiEcosystemBadges } from "@/components/apis/api-ecosystem-badges";
import { ProjectLogo } from "@/components/discover/project-logo";
import { SectionHeader } from "@/components/discover/section-header";
import { FadeIn } from "@/components/discover/motion";
import type { FeaturedApiEntry } from "@/lib/discover-home-helpers";
import { getApiCategoryLabel } from "@/lib/api-directory";
import { cn } from "@/lib/utils";

type FeaturedApisProps = {
  apis: FeaturedApiEntry[];
};

function BentoApiCard({ api }: { api: FeaturedApiEntry }) {
  const isLarge = api.bentoSize === "large";

  return (
    <Link
      href={`/apis/${api.slug}`}
      className={cn(
        "group flex h-full flex-col justify-between rounded-2xl bg-surface/80 transition-all duration-200",
        "hover:bg-surface-hover hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        isLarge
          ? "min-h-[176px] p-6 sm:min-h-[192px] sm:p-8"
          : "min-h-[148px] p-5 sm:p-6",
      )}
    >
      <div className="space-y-4">
        <ProjectLogo
          slug={api.slug}
          name={api.name}
          websiteUrl={api.url}
          size={isLarge ? 52 : 40}
        />

        <div className="space-y-2">
          <h3
            className={cn(
              "font-semibold tracking-tight text-foreground",
              isLarge ? "text-xl sm:text-2xl" : "text-base",
            )}
          >
            {api.name}
          </h3>
          <p
            className={cn(
              "leading-relaxed text-muted",
              isLarge ? "text-sm sm:text-base" : "text-sm line-clamp-2",
            )}
          >
            {api.description}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <ApiEcosystemBadges ecosystems={api.ecosystems} max={2} />
        <div className="flex items-center gap-3 text-xs text-muted">
          <span>
            {api.categories[0]
              ? getApiCategoryLabel(api.categories[0])
              : "API"}
          </span>
          <span aria-hidden>·</span>
          <span>
            {api.recipeCount} {api.recipeCount === 1 ? "recipe" : "recipes"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedApis({ apis }: FeaturedApisProps) {
  return (
    <section aria-labelledby="featured-apis-heading" className="space-y-6">
      <FadeIn>
        <SectionHeader
          id="featured-apis-heading"
          title="Popular APIs"
          subtitle="Popular tools builders use to launch products."
          href="/apis"
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {apis.map((api, index) => (
          <FadeIn
            key={api.slug}
            delay={index * 0.04}
            className={cn(
              api.bentoSize === "large" ? "sm:col-span-2" : "col-span-1",
            )}
          >
            <BentoApiCard api={api} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
