import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type EcosystemCardProps = {
  name: string;
  description: string;
  href: string;
};

export function EcosystemCard({ name, description, href }: EcosystemCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium group-hover:underline">{name}</p>
        <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
      </div>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </Link>
  );
}
