"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getContributorContributionCount,
  type ContributorEntry,
} from "@/lib/contributors-data";

function ContributorInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-hover text-xs font-semibold text-foreground">
      {initials}
    </div>
  );
}

function ContributionsDialog({
  contributor,
  open,
  onOpenChange,
}: {
  contributor: ContributorEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!contributor) return null;

  const count = getContributorContributionCount(contributor);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{contributor.name}</DialogTitle>
          <DialogDescription>
            {count} contribution{count === 1 ? "" : "s"} to Web3Stack
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="max-h-[min(50vh,420px)]">
          <ul className="space-y-2">
            {contributor.items.map((item) => (
              <li
                key={item.id}
                className="rounded-md border border-border px-3 py-2.5"
              >
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted">{item.page}</p>
              </li>
            ))}
          </ul>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

type ContributorsListProps = {
  contributors: ContributorEntry[];
};

export function ContributorsList({ contributors }: ContributorsListProps) {
  const [selectedContributor, setSelectedContributor] =
    useState<ContributorEntry | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="hidden border-b border-border bg-surface/50 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted sm:grid sm:grid-cols-[minmax(0,1fr)_auto]">
          <span>Contributor</span>
          <span className="text-right">Contributions</span>
        </div>

        <ul className="divide-y divide-border">
          {contributors.map((contributor) => {
            const count = getContributorContributionCount(contributor);

            return (
              <li key={contributor.id} className="px-4 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <ContributorInitials name={contributor.name} />
                    <div className="min-w-0 space-y-2">
                      <button
                        type="button"
                        onClick={() => setSelectedContributor(contributor)}
                        className="truncate text-left text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline"
                      >
                        {contributor.name}
                      </button>
                      <div className="flex flex-wrap gap-2">
                        {contributor.socialLinks.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted transition-colors hover:text-foreground"
                          >
                            {link.label}
                            <ExternalLink className="size-3" aria-hidden />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedContributor(contributor)}
                    className="self-start rounded-md border border-border px-3 py-1.5 text-sm font-medium tabular-nums text-foreground transition-colors hover:bg-surface-hover sm:self-center"
                    aria-label={`View ${count} contributions by ${contributor.name}`}
                  >
                    {count} contribution{count === 1 ? "" : "s"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <ContributionsDialog
        contributor={selectedContributor}
        open={selectedContributor !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedContributor(null);
        }}
      />
    </>
  );
}

type ContributorCreditProps = {
  contributorId: string;
  name: string;
  className?: string;
};

export function ContributorCredit({
  contributorId,
  name,
  className,
}: ContributorCreditProps) {
  return (
    <Link href={`/contributors#${contributorId}`} className={className}>
      Added by {name}
    </Link>
  );
}
