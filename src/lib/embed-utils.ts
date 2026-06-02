/** Permissions Policy for embed iframes — explicitly blocks media autoplay. */
export const EMBED_ALLOW_NO_AUTOPLAY =
  "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay 'none'";

export const REDDIT_EMBED_ALLOW = "clipboard-read; clipboard-write; autoplay 'none'";

export function withoutVideoAutoplay(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("autoplay", "0");

    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      parsed.searchParams.set("mute", "0");
    }

    return parsed.toString();
  } catch {
    return url;
  }
}
