"use client";

import type { IntelPlatform } from "@/lib/intel-posts-types";
import { BlogEmbed } from "./embeds/blog-embed";
import { FarcasterEmbed } from "./embeds/farcaster-embed";
import { GitHubEmbed } from "./embeds/github-embed";
import { RedditEmbed } from "./embeds/reddit-embed";
import { XEmbed } from "./embeds/x-embed";

type PostEmbedProps = {
  platform: IntelPlatform;
  postUrl: string;
  xHideConversation?: boolean;
  compact?: boolean;
};

export function PostEmbed({
  platform,
  postUrl,
  xHideConversation,
  compact = false,
}: PostEmbedProps) {
  switch (platform) {
    case "x":
      return (
        <XEmbed
          url={postUrl}
          hideConversation={xHideConversation}
          compact={compact}
        />
      );
    case "farcaster":
      return <FarcasterEmbed url={postUrl} compact={compact} />;
    case "reddit":
      return <RedditEmbed url={postUrl} compact={compact} />;
    case "github":
      return <GitHubEmbed url={postUrl} compact={compact} />;
    case "blog":
      return <BlogEmbed url={postUrl} compact={compact} />;
    default:
      return <BlogEmbed url={postUrl} compact={compact} />;
  }
}
