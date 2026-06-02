import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CryptoStockDeveloperResource } from "@/lib/crypto-stocks-directory-types";

const RESOURCE_TYPE_LABELS: Record<
  CryptoStockDeveloperResource["type"],
  string
> = {
  api: "API",
  sdk: "SDK",
  docs: "Documentation",
};

export function DeveloperResourceList({
  resources,
}: {
  resources: CryptoStockDeveloperResource[];
}) {
  const grouped = {
    api: resources.filter((item) => item.type === "api"),
    sdk: resources.filter((item) => item.type === "sdk"),
    docs: resources.filter((item) => item.type === "docs"),
  };

  return (
    <div className="space-y-6">
      {(["api", "sdk", "docs"] as const).map((type) => {
        const items = grouped[type];
        if (items.length === 0) return null;

        return (
          <div key={type} className="space-y-2">
            <h3 className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {RESOURCE_TYPE_LABELS[type]}s
            </h3>
            <div className="space-y-2">
              {items.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
                >
                  <span className="font-medium group-hover:underline">
                    {resource.label}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function IntelLinkList({
  posts,
}: {
  posts: { postUrl: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <a
          key={post.postUrl}
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <div>
            <Badge variant="outline" className="mb-2 text-[10px]">
              {post.label}
            </Badge>
            <p className="line-clamp-1 text-neutral-600 group-hover:underline dark:text-neutral-400">
              {post.postUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
        </a>
      ))}
    </div>
  );
}

export function EcosystemLinkCard({
  slug,
  name,
  description,
}: {
  slug: string;
  name: string;
  description: string;
}) {
  return (
    <Link
      href={`/ecosystems/${slug}`}
      className="group block rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium group-hover:underline">{name}</p>
        <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
      </div>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </Link>
  );
}
