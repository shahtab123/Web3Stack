export const INTEL_PLATFORMS = [
  { slug: "x", label: "X" },
  { slug: "farcaster", label: "Farcaster" },
  { slug: "reddit", label: "Reddit" },
  { slug: "github", label: "GitHub" },
  { slug: "blog", label: "Blog Posts" },
] as const;

export type IntelPlatform = (typeof INTEL_PLATFORMS)[number]["slug"];

export const INTEL_TOPICS = [
  { slug: "grants", label: "Grants" },
  { slug: "apis", label: "APIs" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "startup-ideas", label: "Startup Ideas" },
] as const;

export type IntelTopic = (typeof INTEL_TOPICS)[number]["slug"];

export type IntelFilter =
  | "all"
  | IntelPlatform
  | IntelTopic;

export type IntelPostCatalogEntry = {
  platform: IntelPlatform;
  postUrl: string;
  topics: IntelTopic[];
  ecosystemSlugs?: string[];
  createdAt: string;
  /** Hide parent tweets when embedding X replies in a thread. */
  xHideConversation?: boolean;
};

export type IntelPostItem = {
  id: number;
  platform: IntelPlatform;
  postUrl: string;
  topics: IntelTopic[];
  createdAt: Date;
  xHideConversation?: boolean;
};

export function getPlatformLabel(platform: IntelPlatform) {
  return INTEL_PLATFORMS.find((p) => p.slug === platform)?.label ?? platform;
}

export function detectPlatformFromUrl(url: string): IntelPlatform {
  const lower = url.toLowerCase();
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "x";
  if (lower.includes("warpcast.com") || lower.includes("farcaster.xyz"))
    return "farcaster";
  if (lower.includes("reddit.com")) return "reddit";
  if (lower.includes("github.com") || lower.includes("gist.github.com"))
    return "github";
  return "blog";
}
