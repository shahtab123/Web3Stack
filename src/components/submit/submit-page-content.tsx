"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  ExternalLink,
  FileText,
  Github,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ContributorBenefits } from "@/components/submit/contributor-benefits";
import { SITE } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const PAGE_OPTIONS = [
  "APIs",
  "Recipes",
  "Ideas",
  "Ecosystems",
  "Grants",
  "Builder Intel",
  "Crypto Stocks",
  "Other",
] as const;

const CATEGORY_EXAMPLES = [
  "Trading",
  "Payments",
  "Cards",
  "Wallets",
  "AI",
  "Infrastructure",
  "Security",
  "Analytics",
  "Gaming",
] as const;

const REVIEW_STEPS = [
  "Submit Resource",
  "Manual Review",
  "Approval",
  "Published",
] as const;

const ACCEPTED_GUIDELINES = [
  "Open Source Projects",
  "Free APIs",
  "Freemium APIs",
  "Official Documentation",
  "Templates",
  "Starter Kits",
  "Demo Apps",
  "Builder Resources",
  "Grants",
  "Accelerators",
  "Hackathons",
] as const;

const REJECTED_GUIDELINES = [
  "Spam",
  "Referral Links",
  "Duplicate Entries",
  "Pure Marketing Content",
  "Low Quality Submissions",
] as const;

const fieldClassName =
  "flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-ring";

function FormLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
      {children}
      {optional && (
        <span className="ml-1 font-normal text-muted">(optional)</span>
      )}
    </label>
  );
}

function GuidelineList({
  title,
  items,
  variant,
}: {
  title: string;
  items: readonly string[];
  variant: "accepted" | "rejected";
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted">
            {variant === "accepted" ? (
              <Check
                className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden
              />
            ) : (
              <X
                className="mt-0.5 size-4 shrink-0 text-red-500 dark:text-red-400"
                aria-hidden
              />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewTimeline() {
  return (
    <ol className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {REVIEW_STEPS.map((step, index) => (
        <li
          key={step}
          className="relative flex flex-1 items-center gap-3 sm:flex-col sm:gap-2 sm:text-center"
        >
          {index < REVIEW_STEPS.length - 1 && (
            <span
              className="absolute left-4 top-8 hidden h-px w-[calc(100%-2rem)] bg-border sm:left-[calc(50%+1rem)] sm:top-4 sm:block sm:w-[calc(100%-1rem)]"
              aria-hidden
            />
          )}
          <div className="relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-foreground">
            {index + 1}
          </div>
          <p className="text-sm font-medium text-foreground">{step}</p>
        </li>
      ))}
    </ol>
  );
}

function SubmissionSuccess() {
  return (
    <div className="space-y-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-6 dark:border-emerald-900 dark:bg-emerald-950/20">
      <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
        <Check className="size-5 text-emerald-700 dark:text-emerald-300" aria-hidden />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-foreground">
          Thank you for your submission.
        </p>
        <p className="text-sm leading-relaxed text-muted">
          Our team will review it and publish it if it meets the directory guidelines.
          Accepted contributors are added manually with their name and social profile on
          the{" "}
          <Link href="/contributors" className="underline underline-offset-4">
            Contributors page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function SubmissionForm({ onSuccess }: { onSuccess: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          socialProfileUrl: data.get("socialProfileUrl"),
          page: data.get("page"),
          category: data.get("category"),
          title: data.get("title"),
          resourceUrl: data.get("resourceUrl"),
          githubUrl: data.get("githubUrl"),
          documentationUrl: data.get("documentationUrl"),
          description: data.get("description"),
          why: data.get("why"),
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        setError(result.error ?? "Submission failed. Please try again.");
        return;
      }

      form.reset();
      onSuccess();
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FormLabel htmlFor="submit-name">Name</FormLabel>
          <Input id="submit-name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="submit-email">Email</FormLabel>
          <Input
            id="submit-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="submit-social-url">Social profile link</FormLabel>
        <Input
          id="submit-social-url"
          name="socialProfileUrl"
          type="url"
          placeholder="https://x.com/username or GitHub profile"
          required
        />
        <p className="text-xs text-muted">
          Used for contributor credit on the Contributors page if your submission is accepted.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FormLabel htmlFor="submit-page">Page</FormLabel>
          <select
            id="submit-page"
            name="page"
            required
            className={cn(fieldClassName, "min-h-9")}
            defaultValue=""
          >
            <option value="" disabled>
              Select a page
            </option>
            {PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="submit-category">Category</FormLabel>
          <Input
            id="submit-category"
            name="category"
            list="submit-category-examples"
            placeholder="e.g. Trading, Payments, Wallets"
            required
          />
          <datalist id="submit-category-examples">
            {CATEGORY_EXAMPLES.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="submit-title">Title</FormLabel>
        <Input id="submit-title" name="title" required />
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="submit-resource-url">Resource URL</FormLabel>
        <Input
          id="submit-resource-url"
          name="resourceUrl"
          type="url"
          required
          placeholder="https://"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FormLabel htmlFor="submit-github-url" optional>
            GitHub URL
          </FormLabel>
          <Input
            id="submit-github-url"
            name="githubUrl"
            type="url"
            placeholder="https://github.com/..."
          />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="submit-docs-url" optional>
            Documentation URL
          </FormLabel>
          <Input
            id="submit-docs-url"
            name="documentationUrl"
            type="url"
            placeholder="https://docs.example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="submit-description">Description</FormLabel>
        <textarea
          id="submit-description"
          name="description"
          required
          rows={4}
          className={fieldClassName}
        />
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="submit-why">Why should this be added?</FormLabel>
        <textarea
          id="submit-why"
          name="why"
          required
          rows={4}
          className={fieldClassName}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Submit Resource"}
      </Button>
    </form>
  );
}

export function SubmitPageContent() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleOpenChange(open: boolean) {
    setFormOpen(open);
    if (!open) {
      setSubmitted(false);
    }
  }

  return (
    <div className="space-y-12">
      <PageHeader
        title="Submit a Resource"
        subtitle="Help improve the directory by contributing APIs, recipes, ecosystems, grants, builder intel and other resources."
      />

      <section aria-labelledby="submission-methods-heading" className="space-y-4">
        <h2 id="submission-methods-heading" className="sr-only">
          Submission Methods
        </h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="flex h-full flex-col border-foreground/15 shadow-sm">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-hover">
                  <Github className="size-5 text-foreground" aria-hidden />
                </div>
                <Badge variant="outline">Recommended</Badge>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl">GitHub Contribution</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Recommended for developers and open source contributors.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-5">
              <p className="text-sm leading-relaxed text-muted">
                Submit changes through GitHub using pull requests.
              </p>
              <ul className="space-y-2">
                {[
                  "Fastest review process",
                  "Merged PR on your GitHub profile",
                  "Name and social link credit",
                  "Listed on our Contributors page",
                ].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check className="size-4 shrink-0 text-muted" aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-auto w-full sm:w-auto">
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribute on GitHub
                  <ExternalLink aria-hidden />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex h-full flex-col">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-hover">
                  <FileText className="size-5 text-foreground" aria-hidden />
                </div>
                <Badge variant="muted">No GitHub needed</Badge>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl">Submit via Form</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  For users who do not use GitHub.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-5">
              <p className="text-sm leading-relaxed text-muted">
                Submit resources through a simple form and we will review them manually
                before publication.
              </p>
              <ul className="space-y-2">
                {[
                  "Simple form — no technical setup",
                  "Include your name and social profile link",
                  "Same contributor credit if accepted",
                  "Listed on our Contributors page",
                ].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check className="size-4 shrink-0 text-muted" aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="mt-auto w-full sm:w-auto"
                onClick={() => setFormOpen(true)}
              >
                Open Submission Form
                <ArrowRight aria-hidden />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <ContributorBenefits />

      <Dialog open={formOpen} onOpenChange={handleOpenChange}>
        <DialogContent aria-describedby="submission-form-description">
          <DialogHeader>
            <DialogTitle>Submission Form</DialogTitle>
            <DialogDescription id="submission-form-description">
              All submissions are reviewed manually before publication.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            {submitted ? (
              <SubmissionSuccess />
            ) : (
              <SubmissionForm onSuccess={() => setSubmitted(true)} />
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>

      <section aria-labelledby="guidelines-heading" className="space-y-4">
        <h2
          id="guidelines-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Submission Guidelines
        </h2>

        <div className="grid gap-8 rounded-lg border border-border p-6 md:grid-cols-2">
          <GuidelineList
            title="Accepted"
            items={ACCEPTED_GUIDELINES}
            variant="accepted"
          />
          <GuidelineList
            title="Not Accepted"
            items={REJECTED_GUIDELINES}
            variant="rejected"
          />
        </div>
      </section>

      <section aria-labelledby="review-process-heading" className="space-y-4">
        <h2
          id="review-process-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Review Process
        </h2>
        <ReviewTimeline />
      </section>
    </div>
  );
}
