"use client";

type FarcasterEmbedProps = {
  url: string;
  compact?: boolean;
};

function toFarcasterEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.includes("/~/embed")) return url;

    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      const hash = parts[parts.length - 1];
      if (hash.startsWith("0x")) {
        return `https://warpcast.com/~/embed?type=cast&hash=${hash}`;
      }
    }
  } catch {
    return url;
  }

  return url;
}

export function FarcasterEmbed({ url, compact = false }: FarcasterEmbedProps) {
  const embedUrl = toFarcasterEmbedUrl(url);

  return (
    <div className="w-full overflow-hidden rounded-md border border-neutral-100 dark:border-neutral-900">
      <iframe
        src={embedUrl}
        title="Farcaster cast embed"
        className={
          compact
            ? "h-[220px] w-full border-0 bg-white"
            : "min-h-[420px] w-full border-0 bg-white"
        }
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}
