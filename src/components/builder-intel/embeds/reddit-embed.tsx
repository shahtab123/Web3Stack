"use client";

import { REDDIT_EMBED_ALLOW } from "@/lib/embed-utils";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type RedditEmbedProps = {
  url: string;
  compact?: boolean;
};

function toRedditEmbedUrl(url: string, theme: "light" | "dark" = "light"): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host !== "reddit.com" && !host.endsWith(".reddit.com")) {
      return null;
    }

    const path = parsed.pathname
      .replace(/\/embed\/?$/, "")
      .replace(/^\//, "")
      .replace(/\/?$/, "");

    const params = new URLSearchParams({
      embed: "true",
      ref_source: "embed",
      ref: "share",
      theme,
    });

    return `https://embed.reddit.com/${path}?${params.toString()}`;
  } catch {
    return null;
  }
}

function getRedditPostLabel(url: string): string {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    const slug = parts.at(-1);
    if (!slug || slug.length < 4) return "Reddit post";

    return slug
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } catch {
    return "Reddit post";
  }
}

function getEmbedTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function RedditEmbed({ url, compact = false }: RedditEmbedProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);
  const embedUrl = toRedditEmbedUrl(url, theme);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(compact ? 220 : 480);
  const postLabel = getRedditPostLabel(url);

  useEffect(() => {
    setTheme(getEmbedTheme());

    const observer = new MutationObserver(() => {
      setTheme(getEmbedTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    function onMessage(event: MessageEvent) {
      if (
        !iframeRef.current ||
        event.source !== iframeRef.current.contentWindow ||
        typeof event.data !== "string" ||
        !event.data
      ) {
        return;
      }

      try {
        const payload = JSON.parse(event.data) as {
          type?: string;
          data?: number;
        };

        if (payload.type === "resize.embed" && typeof payload.data === "number") {
          const maxHeight = compact ? 220 : 700;
          setHeight(Math.min(Math.ceil(payload.data), maxHeight));
        }
      } catch {
        // Ignore non-JSON postMessage payloads.
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [compact, isLoaded]);

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-neutral-600 underline dark:text-neutral-400"
      >
        View on Reddit
      </a>
    );
  }

  if (!isLoaded) {
    return (
      <button
        type="button"
        onClick={() => setIsLoaded(true)}
        className="group flex w-full flex-col items-center justify-center gap-2 rounded-md border border-neutral-100 bg-neutral-50 px-4 py-6 text-center transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-900 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
        style={{ minHeight: compact ? 120 : 200 }}
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm ring-1 ring-neutral-200 transition group-hover:scale-105 dark:bg-neutral-950 dark:text-neutral-200 dark:ring-neutral-700">
          <Play className="size-4 fill-current" aria-hidden />
        </span>
        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
          Load Reddit embed
        </span>
        {!compact && (
          <span className="line-clamp-2 max-w-full text-[11px] text-neutral-500 dark:text-neutral-400">
            {postLabel}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-md border border-neutral-100 dark:border-neutral-900">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title="Reddit post embed"
        className="block w-full overflow-hidden border-0 bg-white dark:bg-neutral-950"
        height={height}
        scrolling="no"
        style={{ height: `${height}px` }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
        allow={REDDIT_EMBED_ALLOW}
      />
    </div>
  );
}
