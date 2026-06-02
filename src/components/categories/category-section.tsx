import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CategorySectionProps = {
  title: string;
  href?: string;
  linkLabel?: string;
  id?: string;
  children: React.ReactNode;
};

export function CategorySection({
  title,
  href,
  linkLabel = "View all",
  id,
  children,
}: CategorySectionProps) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-950 dark:text-neutral-50">
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
          >
            {linkLabel}
            <ArrowRight className="size-3" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
