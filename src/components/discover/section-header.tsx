import Link from "next/link";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
};

export function SectionHeader({
  id,
  title,
  subtitle,
  href,
  linkLabel = "View all",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-6 border-b border-border pb-4",
        className,
      )}
    >
      <div className="space-y-1">
        <h2
          id={id}
          className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm text-muted">{subtitle}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="shrink-0 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
