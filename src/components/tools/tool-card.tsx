import Link from "next/link";
import { ArrowUpRight, Github, Star } from "lucide-react";
import type { Tool } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCategory, formatPricing } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ToolCardProps = {
  tool: Tool;
  className?: string;
};

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className={cn("group block", className)}>
      <Card className="h-full transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-base group-hover:underline">
                {tool.name}
              </CardTitle>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {tool.tagline}
              </p>
            </div>
            {tool.featured && (
              <Star className="size-4 shrink-0 fill-neutral-950 text-neutral-950 dark:fill-neutral-50 dark:text-neutral-50" />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{formatCategory(tool.category)}</Badge>
            <Badge variant="muted">{formatPricing(tool.pricing)}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {tool.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs text-neutral-500 dark:text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function ToolListItem({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-start justify-between gap-4 border-b border-neutral-200 py-4 transition-colors last:border-0 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/50"
    >
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium group-hover:underline">{tool.name}</span>
          {tool.featured && (
            <Star className="size-3 fill-neutral-950 dark:fill-neutral-50" />
          )}
          <Badge variant="outline" className="text-[10px]">
            {formatCategory(tool.category)}
          </Badge>
          <Badge variant="muted" className="text-[10px]">
            {formatPricing(tool.pricing)}
          </Badge>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {tool.tagline}
        </p>
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function ToolMeta({ tool }: ToolCardProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <Badge variant="outline">{formatCategory(tool.category)}</Badge>
      <Badge variant="muted">{formatPricing(tool.pricing)}</Badge>
      {tool.githubUrl && (
        <a
          href={tool.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
        >
          <Github className="size-3.5" />
          GitHub
        </a>
      )}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
      >
        Website
        <ArrowUpRight className="size-3.5" />
      </a>
    </div>
  );
}
