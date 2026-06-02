import { cn } from "@/lib/utils";

export type PageStat = {
  label: string;
  value: string | number;
};

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  stats?: PageStat[];
  className?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  stats,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-6 pb-8", className)}>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {stats && stats.length > 0 && (
        <div className="flex flex-wrap gap-6 border-y border-neutral-200 py-4 dark:border-neutral-800">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-[80px]">
              <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-neutral-950 dark:text-neutral-50">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
