import Link from "next/link";
import {
  ExternalLink,
  GitPullRequest,
  Link2,
  Sparkles,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CONTRIBUTOR_PERKS } from "@/lib/contributors-data";

const perkIcons = [GitPullRequest, UserRound, Trophy, Sparkles, Users, Link2] as const;

export function ContributorBenefits() {
  return (
    <section aria-labelledby="contributor-benefits-heading" className="space-y-5">
      <div className="space-y-2">
        <h2
          id="contributor-benefits-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Why contribute?
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Accepted submissions are credited with your name and social profile link on
          our Contributors page and beside the resources you add.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CONTRIBUTOR_PERKS.map((perk, index) => {
          const Icon = perkIcons[index] ?? Sparkles;

          return (
            <Card key={perk.title} className="border-border/80">
              <CardContent className="space-y-3 pt-5">
                <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface-hover">
                  <Icon className="size-4 text-foreground" aria-hidden />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-medium text-foreground">{perk.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{perk.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-dashed border-border bg-surface/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          We add contributors manually after review — your name, social link, and
          credited resources appear on the public list.
        </p>
        <Button asChild variant="outline">
          <Link href="/contributors">View Contributors</Link>
        </Button>
      </div>
    </section>
  );
}
