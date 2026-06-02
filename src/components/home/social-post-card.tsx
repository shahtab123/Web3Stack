import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IntelPostItem } from "@/lib/intel-posts";
import { getPlatformLabel } from "@/lib/intel-posts";

export function SocialPostCard({ post }: { post: IntelPostItem }) {
  const dateAdded = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(post.createdAt);

  return (
    <Link
      href={`/builder-intel#post-${post.id}`}
      className="group flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {getPlatformLabel(post.platform)}
        </p>
        <p className="mt-1 truncate text-sm text-neutral-700 group-hover:underline dark:text-neutral-300">
          {post.postUrl.replace(/^https?:\/\//, "")}
        </p>
        <p className="mt-1 text-xs text-neutral-400">Added {dateAdded}</p>
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
    </Link>
  );
}
