import Link from "next/link";
import { ProjectLogo } from "@/components/discover/project-logo";
import type { ApiEntry } from "@/lib/api-directory";

type ApiDirectoryFeaturedProps = {
  apis: ApiEntry[];
};

export function ApiDirectoryFeatured({ apis }: ApiDirectoryFeaturedProps) {
  if (apis.length === 0) return null;

  return (
    <section aria-labelledby="featured-apis-label" className="space-y-3">
      <h2
        id="featured-apis-label"
        className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
      >
        Featured APIs
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {apis.map((api) => (
          <Link
            key={api.slug}
            href={`/apis/${api.slug}`}
            className="flex flex-col items-center rounded-lg border border-neutral-200 px-3 py-3 text-center transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
          >
            <ProjectLogo
              slug={api.slug}
              name={api.name}
              websiteUrl={api.url}
              size={28}
            />
            <span className="mt-2 text-xs font-medium text-neutral-950 dark:text-neutral-50">
              {api.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
