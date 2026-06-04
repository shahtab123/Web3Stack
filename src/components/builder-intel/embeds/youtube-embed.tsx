"use client";

type YouTubeEmbedProps = {
  url: string;
  compact?: boolean;
  eager?: boolean;
  onReady?: () => void;
};

function parseYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery) return fromQuery;

      const pathMatch = parsed.pathname.match(
        /^\/(?:embed|shorts|live)\/([^/?]+)/,
      );
      if (pathMatch?.[1]) return pathMatch[1];
    }

    if (host === "youtube-nocookie.com") {
      const pathMatch = parsed.pathname.match(/^\/embed\/([^/?]+)/);
      if (pathMatch?.[1]) return pathMatch[1];
    }
  } catch {
    return null;
  }

  return null;
}

export function YouTubeEmbed({
  url,
  compact = false,
  eager = false,
  onReady,
}: YouTubeEmbedProps) {
  const videoId = parseYouTubeVideoId(url);

  if (!videoId) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-neutral-600 underline dark:text-neutral-400"
      >
        Watch on YouTube
      </a>
    );
  }

  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className="w-full overflow-hidden rounded-md border border-neutral-100 dark:border-neutral-900">
      <div
        className={
          compact ? "aspect-video w-full" : "aspect-video w-full sm:aspect-video"
        }
      >
        <iframe
          src={embedSrc}
          title="YouTube video embed"
          className="h-full w-full border-0 bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading={eager ? "eager" : "lazy"}
          onLoad={() => onReady?.()}
        />
      </div>
      {!compact && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block truncate px-1 text-xs text-neutral-500 underline dark:text-neutral-400"
        >
          {url}
        </a>
      )}
    </div>
  );
}
