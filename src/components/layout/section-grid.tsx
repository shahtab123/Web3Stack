import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionCard = {
  title: string;
  description: string;
  href?: string;
  meta?: string;
};

type SectionGridProps = {
  items: SectionCard[];
  className?: string;
};

export function SectionGrid({ items, className }: SectionGridProps) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {items.map((item) => {
        const content = (
          <>
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">{item.title}</p>
              {item.href && (
                <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
              )}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {item.description}
            </p>
            {item.meta && (
              <p className="mt-3 text-xs text-neutral-400">{item.meta}</p>
            )}
          </>
        );

        if (item.href) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            >
              {content}
            </Link>
          );
        }

        return (
          <div
            key={item.title}
            className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
