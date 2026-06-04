"use client";

import Script from "next/script";
import { useEffect, useMemo } from "react";

type GitHubEmbedProps = {
  url: string;
  compact?: boolean;
  eager?: boolean;
  onReady?: () => void;
};

function parseGistUrl(url: string) {
  const match = url.match(/gist\.github\.com\/([^/]+)\/([a-f0-9]+)/i);
  if (!match) return null;
  return `${match[1]}/${match[2]}`;
}

export function GitHubEmbed({
  url,
  compact = false,
  eager = false,
  onReady,
}: GitHubEmbedProps) {
  const gist = useMemo(() => parseGistUrl(url), [url]);
  const isDiscussion = url.includes("/discussions/");

  if (gist) {
    return (
      <div
        className={
          compact
            ? "gist-embed max-h-[200px] w-full overflow-hidden"
            : "gist-embed w-full overflow-auto"
        }
      >
        <Script
          src={`https://gist.github.com/${gist}.js`}
          strategy={eager ? "afterInteractive" : "lazyOnload"}
          onLoad={() => onReady?.()}
        />
      </div>
    );
  }

  if (isDiscussion) {
    return (
      <div className="w-full overflow-hidden rounded-md border border-neutral-100 dark:border-neutral-900">
        <iframe
          src={url}
          title="GitHub discussion embed"
          className={
            compact
              ? "h-[220px] w-full border-0 bg-white"
              : "min-h-[480px] w-full border-0 bg-white"
          }
          loading={eager ? "eager" : "lazy"}
          onLoad={() => onReady?.()}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    );
  }

  return <GitHubLinkFallback url={url} onReady={onReady} />;
}

function GitHubLinkFallback({
  url,
  onReady,
}: {
  url: string;
  onReady?: () => void;
}) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <div className="w-full overflow-hidden rounded-md border border-neutral-100 p-4 dark:border-neutral-900">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-sm text-neutral-800 underline dark:text-neutral-200"
      >
        {url}
      </a>
    </div>
  );
}
