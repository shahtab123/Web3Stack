type ApiBuildPreviewProps = {
  items: string[];
  max?: number;
};

export function ApiBuildPreview({ items, max = 2 }: ApiBuildPreviewProps) {
  if (items.length === 0) return null;

  const visible = items.slice(0, max);
  const hasMore = items.length > max;

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
        What can you build?
      </p>
      <ul className="space-y-0.5 text-xs text-neutral-500 dark:text-neutral-400">
        {visible.map((item) => (
          <li key={item} className="flex gap-1.5">
            <span aria-hidden>·</span>
            <span>{item}</span>
          </li>
        ))}
        {hasMore ? (
          <li
            className="pl-3.5 text-neutral-400 dark:text-neutral-500"
            aria-hidden
          >
          </li>
        ) : null}
      </ul>
    </div>
  );
}
