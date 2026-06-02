import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  title: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({ title, href, linkLabel = "View all" }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-neutral-800">
      <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-950 dark:text-neutral-50">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-xs text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
        >
          {linkLabel}
          <ArrowRight className="size-3" />
        </Link>
      )}
    </div>
  );
}
