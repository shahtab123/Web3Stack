import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EcosystemGrantEntry } from "@/lib/ecosystem-grants-data";

export function GrantGridCard({ grant }: { grant: EcosystemGrantEntry }) {
  return (
    <Link
      href={grant.href}
      className="group block rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium group-hover:underline">{grant.title}</p>
        <ArrowUpRight className="size-4 shrink-0 text-neutral-400" />
      </div>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        {grant.org}
      </p>
      <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
        {grant.description}
      </p>
    </Link>
  );
}
