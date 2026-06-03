import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ContributorsList } from "@/components/contributors/contributors-list";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { contributors, getContributorStats } from "@/lib/contributors-data";
import { SITE } from "@/lib/navigation";
import { buildPageMetadata } from "@/lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contributors",
  description:
    "People who help improve Web3Scout by submitting APIs, recipes, grants, and builder resources.",
  path: "/contributors",
});

export default function ContributorsPage() {
  const stats = getContributorStats();

  return (
    <div className="space-y-10">
      <PageHeader
        title="Contributors"
        subtitle="Contributors are added manually after accepted submissions. Each listing shows their name, social profile links, and contribution count."
        stats={[
          { label: "Contributors", value: stats.totalContributors },
          { label: "Contributions", value: stats.totalContributions },
        ]}
      />

      <section className="rounded-lg border border-border bg-surface/40 p-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Get listed here
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Submit through GitHub or the form on our Submit page. After review, we
              add your name, social profile link, and credited resources to this list.
              No automated badges — just your name and links.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg">
              <Link href={SITE.submitUrl}>Submit a Resource</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
                Contribute on GitHub
                <ExternalLink aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="contributors-list-heading" className="space-y-4">
        <h2
          id="contributors-list-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          All contributors
        </h2>

        {contributors.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted">
              No contributors yet. Be the first to submit a resource.
            </p>
            <Button asChild className="mt-4">
              <Link href={SITE.submitUrl}>Submit a Resource</Link>
            </Button>
          </div>
        ) : (
          <ContributorsList contributors={contributors} />
        )}
      </section>
    </div>
  );
}
