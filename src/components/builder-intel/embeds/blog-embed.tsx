"use client";

type BlogEmbedProps = {
  url: string;
  compact?: boolean;
};

export function BlogEmbed({ url, compact = false }: BlogEmbedProps) {
  return (
    <div className="w-full overflow-hidden rounded-md border border-neutral-100 dark:border-neutral-900">
      <iframe
        src={url}
        title="Blog post embed"
        className={
          compact
            ? "h-[220px] w-full border-0 bg-white"
            : "min-h-[520px] w-full border-0 bg-white"
        }
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
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
