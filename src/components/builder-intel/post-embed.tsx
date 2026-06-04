"use client";

import type { IntelPlatform } from "@/lib/intel-posts-types";
import { BlogEmbed } from "./embeds/blog-embed";
import { FarcasterEmbed } from "./embeds/farcaster-embed";
import { GitHubEmbed } from "./embeds/github-embed";
import { RedditEmbed } from "./embeds/reddit-embed";
import { XEmbed } from "./embeds/x-embed";
import { YouTubeEmbed } from "./embeds/youtube-embed";

type PostEmbedProps = {
  platform: IntelPlatform;
  postUrl: string;
  xHideConversation?: boolean;
  compact?: boolean;
  eager?: boolean;
  onReady?: () => void;
};

export function PostEmbed({
  platform,
  postUrl,
  xHideConversation,
  compact = false,
  eager = false,
  onReady,
}: PostEmbedProps) {
  const shared = { compact, eager, onReady };

  switch (platform) {
    case "x":
      return (
        <XEmbed
          url={postUrl}
          hideConversation={xHideConversation}
          {...shared}
        />
      );
    case "youtube":
      return <YouTubeEmbed url={postUrl} {...shared} />;
    case "farcaster":
      return <FarcasterEmbed url={postUrl} {...shared} />;
    case "reddit":
      return <RedditEmbed url={postUrl} {...shared} />;
    case "github":
      return <GitHubEmbed url={postUrl} {...shared} />;
    case "blog":
      return <BlogEmbed url={postUrl} {...shared} />;
    default:
      return <BlogEmbed url={postUrl} {...shared} />;
  }
}
