import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function GrantSectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-neutral-200 p-5 dark:border-neutral-800 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function GrantBulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-neutral-400">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function GrantStepsList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
      {steps.map((step, index) => (
        <li key={step} className="flex gap-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-xs font-medium tabular-nums dark:border-neutral-800">
            {index + 1}
          </span>
          <span className="pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function GrantDatesList({
  dates,
}: {
  dates: { label: string; value: string }[];
}) {
  return (
    <dl className="space-y-3 text-sm">
      {dates.map((date) => (
        <div
          key={date.label}
          className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-3 last:border-0 last:pb-0 dark:border-neutral-900"
        >
          <dt className="text-neutral-500 dark:text-neutral-400">{date.label}</dt>
          <dd className="text-right font-medium">{date.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function GrantLinkList({
  links,
}: {
  links: { label: string; url: string }[];
}) {
  return (
    <div className="space-y-2">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-md border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <span className="font-medium group-hover:underline">{link.label}</span>
          <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
        </a>
      ))}
    </div>
  );
}

export function GrantRelatedEcosystem({
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
      className="group block rounded-lg border border-neutral-200 p-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium group-hover:underline">{name}</p>
        <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
      </div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </Link>
  );
}
