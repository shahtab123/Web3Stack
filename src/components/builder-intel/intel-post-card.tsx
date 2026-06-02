import { PostEmbed } from "./post-embed";
import type { IntelPostItem } from "@/lib/intel-posts";
import { getPlatformLabel } from "@/lib/intel-posts";

type IntelPostCardProps = {
  post: IntelPostItem;
};

function formatDateAdded(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function IntelPostCard({ post }: IntelPostCardProps) {
  return (
    <article
      id={`post-${post.id}`}
      className="mb-6 break-inside-avoid rounded-lg border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
    >
      <header className="mb-2 flex items-center justify-between gap-2 px-0.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {getPlatformLabel(post.platform)}
        </span>
        <time
          dateTime={post.createdAt.toISOString()}
          className="text-[10px] text-neutral-400 dark:text-neutral-500"
        >
          Added {formatDateAdded(post.createdAt)}
        </time>
      </header>

      <PostEmbed
        platform={post.platform}
        postUrl={post.postUrl}
        xHideConversation={post.xHideConversation}
      />
    </article>
  );
}
