import Link from "next/link";
import { SectionHeader } from "@/components/discover/section-header";
import { getBrowseCategoriesWithCounts } from "@/lib/browse-categories";
import { HOMEPAGE_CATEGORIES } from "@/lib/discover-home-data";

export async function CategorySection() {
  const countsBySlug = new Map(
    (await getBrowseCategoriesWithCounts()).map((category) => [
      category.slug,
      category,
    ]),
  );

  const categories = HOMEPAGE_CATEGORIES.map((category) => ({
    ...category,
    apiCount: countsBySlug.get(category.slug)?.apiCount ?? 0,
  }));

  return (
    <section
      aria-labelledby="categories-heading"
      className="rounded-2xl border border-border bg-surface/30 p-5 sm:p-8"
    >
      <SectionHeader
        id="categories-heading"
        title="Browse by category"
        subtitle="Find APIs and recipes grouped by what you're building."
        href="/apis"
        className="mb-6 border-border pb-5"
      />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/apis?category=${category.slug}`}
            className="flex min-h-11 items-center justify-center rounded-full border border-border px-3 py-2 text-center text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <span className="truncate">{category.label}</span>
            <span className="ml-1.5 shrink-0 text-muted">· {category.apiCount}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
