import { cn } from "@/lib/utils";

type IntelSectionLoaderProps = {
  label?: string;
  className?: string;
};

export function IntelSectionLoader({
  label = "Loading…",
  className,
}: IntelSectionLoaderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] w-full flex-col items-center justify-center gap-3",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="size-9 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950 dark:border-neutral-800 dark:border-t-neutral-50"
        aria-hidden
      />
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
    </div>
  );
}
