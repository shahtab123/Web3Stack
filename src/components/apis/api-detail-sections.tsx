"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ProjectLogo } from "@/components/discover/project-logo";
import { Badge } from "@/components/ui/badge";
import type { ApiEntry } from "@/lib/api-directory";
import { getApiCategoryLabel } from "@/lib/api-directory";
import {
  formatRelativeUpdated,
  getApiQuickFacts,
  getApiResourceLinks,
  getApiTopActions,
} from "@/lib/api-detail-helpers";
import { getEcosystemHrefFromApiTag } from "@/lib/browse-ecosystems";
import { cn } from "@/lib/utils";

function subscribeToDesktop(callback: () => void) {
  const media = window.matchMedia("(min-width: 768px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getDesktopServerSnapshot() {
  return true;
}

type ApiDetailHeaderProps = {
  api: ApiEntry;
};

export function ApiDetailHeader({ api }: ApiDetailHeaderProps) {
  return (
    <header className="space-y-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <ProjectLogo
              slug={api.slug}
              name={api.name}
              websiteUrl={api.url}
              size={28}
              className="shrink-0"
            />
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {api.name}
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {api.description}
          </p>
        </div>
        <Badge variant="muted" className="shrink-0 text-[11px]">
          {formatRelativeUpdated(api.updatedAt)}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {api.isOpenSource && <Badge variant="outline">Open Source</Badge>}
        {api.isFree && <Badge variant="muted">Free</Badge>}
        {api.isFreemium && <Badge variant="muted">Freemium</Badge>}
      </div>
    </header>
  );
}

export function ApiTopActions({ api }: { api: ApiEntry }) {
  const actions = getApiTopActions(api);

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
        >
          {action.label}
          <ArrowUpRight className="size-3.5 text-neutral-400" />
        </a>
      ))}
    </div>
  );
}

type DetailSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
};

export function DetailSection({
  title,
  children,
  className,
  defaultOpen = true,
}: DetailSectionProps) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  );

  if (isDesktop) {
    return (
      <section className={className}>
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {title}
        </h2>
        <div className="mt-3">{children}</div>
      </section>
    );
  }

  return (
    <section className={className}>
      <details open={defaultOpen} className="group">
        <summary
          className={cn(
            "flex cursor-pointer list-none items-center justify-between gap-3",
            "text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400",
            "[&::-webkit-details-marker]:hidden",
          )}
        >
          {title}
          <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3">{children}</div>
      </details>
    </section>
  );
}

export function DetailCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 p-4 dark:border-neutral-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function QuickFacts({ api }: { api: ApiEntry }) {
  const facts = getApiQuickFacts(api);

  return (
    <DetailCard>
      <dl className="grid gap-3 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label} className="flex gap-3 text-sm">
            <dt className="w-36 shrink-0 text-neutral-500 dark:text-neutral-400">
              {fact.label}
            </dt>
            <dd className="text-neutral-950 dark:text-neutral-50">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </DetailCard>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="text-neutral-400">
            ·
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ItemGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm dark:border-neutral-800"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export function SimilarToolsGrid({
  items,
}: {
  items: { name: string; href: string | null; external: boolean }[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {items.map((item) =>
        item.href ? (
          <Link
            key={item.name}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2.5 text-sm dark:border-neutral-800"
          >
            {item.name}
            <ArrowUpRight className="size-3.5 text-neutral-400" />
          </Link>
        ) : (
          <div
            key={item.name}
            className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm dark:border-neutral-800"
          >
            {item.name}
          </div>
        ),
      )}
    </div>
  );
}

export function EcosystemLogoChips({
  ecosystems,
}: {
  ecosystems: ApiEntry["ecosystems"];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {ecosystems.map((ecosystem) => {
        const slug = ecosystem.toLowerCase().replace(/\s+/g, "-");

        return (
          <Link
            key={ecosystem}
            href={getEcosystemHrefFromApiTag(ecosystem)}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800"
          >
            <ProjectLogo slug={slug} name={ecosystem} size={24} />
            {ecosystem}
          </Link>
        );
      })}
    </div>
  );
}

export function ResourceLinks({ api }: { api: ApiEntry }) {
  const links = getApiResourceLinks(api);

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800"
        >
          {link.label}
          <ArrowUpRight className="size-3.5 text-neutral-400" />
        </a>
      ))}
    </div>
  );
}

export function CapabilityTags({ tags }: { tags: ApiEntry["tags"] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/apis?tag=${encodeURIComponent(tag)}`}
          className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

export function CategoryTags({ categories }: { categories: ApiEntry["categories"] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/apis?category=${category}`}
          className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
        >
          {getApiCategoryLabel(category)}
        </Link>
      ))}
    </div>
  );
}
