import { IntelPostGallery } from "@/components/builder-intel/intel-post-gallery";
import { getIntelPosts, type IntelPostFilters } from "@/lib/intel-posts";

type IntelGallerySectionProps = {
  filters: IntelPostFilters;
  resetKey: string;
};

export async function IntelGallerySection({
  filters,
  resetKey,
}: IntelGallerySectionProps) {
  const posts = await getIntelPosts(filters);

  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 py-20 text-center dark:border-neutral-700">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No bookmarks match your filters.
        </p>
      </div>
    );
  }

  return <IntelPostGallery posts={posts} resetKey={resetKey} />;
}
