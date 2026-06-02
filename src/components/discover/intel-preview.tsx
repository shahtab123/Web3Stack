"use client";

import Link from "next/link";
import type { IntelPostItem } from "@/lib/intel-posts-types";
import { getPlatformLabel } from "@/lib/intel-posts-types";
import { PostEmbed } from "@/components/builder-intel/post-embed";
import { IntelEmbedScripts } from "@/components/builder-intel/intel-embed-scripts";
import { SectionHeader } from "@/components/discover/section-header";
import { FadeIn } from "@/components/discover/motion";
import { cn } from "@/lib/utils";

type IntelPreviewProps = {
  posts: IntelPostItem[];
};

function IntelPreviewCard({ post }: { post: IntelPostItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
          {getPlatformLabel(post.platform)}
        </span>
        <Link
          href={`/builder-intel#post-${post.id}`}
          className="text-[10px] text-muted transition-colors hover:text-foreground"
        >
          Open
        </Link>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="max-h-[200px] overflow-hidden">
          <PostEmbed
            platform={post.platform}
            postUrl={post.postUrl}
            xHideConversation={post.xHideConversation}
            compact
          />
        </div>
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-10",
            "bg-gradient-to-t from-background via-background/80 to-transparent",
          )}
          aria-hidden
        />
      </div>
    </article>
  );
}

export function IntelPreview({ posts }: IntelPreviewProps) {
  return (
    <section aria-labelledby="intel-preview-heading" className="space-y-6">
      <IntelEmbedScripts />

      <FadeIn>
        <SectionHeader
          id="intel-preview-heading"
          title="Builder Intel"
          subtitle="Interesting findings from across the ecosystem."
          href="/builder-intel"
          linkLabel="View all intel"
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {posts.map((post, index) => (
          <FadeIn key={`${post.platform}-${post.postUrl}`} delay={index * 0.04}>
            <IntelPreviewCard post={post} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
