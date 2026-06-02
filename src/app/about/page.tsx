import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "About Web3Stack — criteria, scope, and how to contribute.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="About"
        subtitle="Web3Stack is a curated directory of APIs, tools, recipes, grants, and ecosystems for Web3 builders."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            What we list
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            <li>Free tools with no paywall for core functionality</li>
            <li>Freemium products with a usable free tier</li>
            <li>Open-source projects with public repositories</li>
            <li>Web3, fintech, AI, and general developer tooling</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            What we exclude
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            <li>Paid-only products without a free tier</li>
            <li>User accounts or authentication requirements</li>
            <li>Enterprise-only platforms with no self-serve access</li>
            <li>Affiliate or sponsored placements</li>
          </ul>
        </section>
      </div>

      <section className="space-y-3 rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Tech stack
        </h2>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          Built with Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui,
          Neon PostgreSQL, and Drizzle ORM. The app works offline with seed data when
          no database is configured, and connects to Neon when{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-900">
            DATABASE_URL
          </code>{" "}
          is set.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Getting started
        </h2>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-xs leading-relaxed dark:border-neutral-800 dark:bg-neutral-900">
          <p>cp .env.example .env.local</p>
          <p>npm install</p>
          <p>npm run db:push</p>
          <p>npm run db:seed</p>
          <p>npm run dev</p>
        </div>
      </section>
    </div>
  );
}
