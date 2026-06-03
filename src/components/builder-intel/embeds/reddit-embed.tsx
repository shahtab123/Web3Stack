"use client";

import { REDDIT_EMBED_ALLOW } from "@/lib/embed-utils";
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

function getEmbedTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function RedditEmbed({ url, compact = false }: RedditEmbedProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const embedUrl = toRedditEmbedUrl(url, theme);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(compact ? 220 : 480);

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
  }, [compact]);

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

  return (
    <div className="w-full overflow-hidden rounded-md border border-neutral-100 dark:border-neutral-900">
      <iframe
        key={embedUrl}
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
