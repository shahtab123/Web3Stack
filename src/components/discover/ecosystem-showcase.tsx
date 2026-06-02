import Link from "next/link";
import { ProjectLogo } from "@/components/discover/project-logo";
import { SectionHeader } from "@/components/discover/section-header";
import type { BrowseEcosystemWithCounts } from "@/lib/browse-ecosystems";

type EcosystemShowcaseProps = {
  ecosystems: BrowseEcosystemWithCounts[];
};

/** Two rows at lg (4 columns). */
const VISIBLE_COUNT = 8;

function EcosystemTile({ ecosystem }: { ecosystem: BrowseEcosystemWithCounts }) {
  return (
    <Link
      href={`/ecosystems/${ecosystem.slug}`}
      className="flex flex-col items-center rounded-xl px-3 py-5 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      <ProjectLogo slug={ecosystem.slug} name={ecosystem.name} size={52} />
      <h3 className="mt-3 text-sm font-medium text-foreground">
        {ecosystem.name}
      </h3>
      <p className="mt-1 text-xs text-muted">
        {ecosystem.apiCount} APIs · {ecosystem.recipeCount} recipes ·{" "}
        {ecosystem.grantCount} grants
      </p>
    </Link>
  );
}

export function EcosystemShowcase({ ecosystems }: EcosystemShowcaseProps) {
  return (
    <section
      aria-labelledby="ecosystem-showcase-heading"
      className="glass-panel rounded-2xl p-5 sm:p-8"
    >
      <SectionHeader
        id="ecosystem-showcase-heading"
        title="Ecosystems"
        subtitle="Explore chains with APIs, recipes, and grants."
        href="/ecosystems"
        className="mb-6 border-[var(--glass-border)] pb-5"
      />

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
        {ecosystems.slice(0, VISIBLE_COUNT).map((ecosystem) => (
          <EcosystemTile key={ecosystem.slug} ecosystem={ecosystem} />
        ))}
      </div>
    </section>
  );
}
