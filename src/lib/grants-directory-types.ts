export const GRANT_STATUSES = [
  { slug: "active", label: "Active" },
  { slug: "upcoming", label: "Upcoming" },
] as const;

export type GrantStatus = (typeof GRANT_STATUSES)[number]["slug"];

export const FUNDING_TYPES = [
  { slug: "grant", label: "Grant" },
  { slug: "hackathon", label: "Hackathon" },
  { slug: "accelerator", label: "Accelerator" },
  { slug: "incubator", label: "Incubator" },
  { slug: "venture-program", label: "Venture Program" },
  { slug: "bounty", label: "Bounty" },
  { slug: "startup-program", label: "Startup Program" },
  { slug: "ecosystem-fund", label: "Ecosystem Fund" },
] as const;

export type FundingType = (typeof FUNDING_TYPES)[number]["slug"];

export const FUNDING_STAGES = [
  { slug: "idea", label: "Idea Stage" },
  { slug: "prototype", label: "Prototype" },
  { slug: "mvp", label: "MVP" },
  { slug: "pre-seed", label: "Pre-Seed" },
  { slug: "seed", label: "Seed" },
  { slug: "series-a-plus", label: "Series A+" },
  { slug: "open-to-all", label: "Open to All" },
] as const;

export type FundingStage = (typeof FUNDING_STAGES)[number]["slug"];

export const BUILDER_TYPES = [
  { slug: "solo-builder", label: "Solo Builder" },
  { slug: "student", label: "Student" },
  { slug: "open-source", label: "Open Source" },
  { slug: "startup", label: "Startup" },
  { slug: "team", label: "Team" },
  { slug: "enterprise", label: "Enterprise" },
] as const;

export type BuilderType = (typeof BUILDER_TYPES)[number]["slug"];

export const GRANT_SORT_OPTIONS = [
  { slug: "deadline-soonest", label: "Deadline Soonest" },
  { slug: "newest", label: "Newest" },
  { slug: "highest-funding", label: "Highest Funding" },
  { slug: "most-beginner-friendly", label: "Most Beginner Friendly" },
] as const;

export type GrantSort = (typeof GRANT_SORT_OPTIONS)[number]["slug"];

export type GrantImportantDate = {
  label: string;
  value: string;
};

export type GrantOfficialLink = {
  label: string;
  url: string;
};

export type GrantEntry = {
  slug: string;
  name: string;
  org: string;
  description: string;
  overview: string;
  eligibility: string[];
  fundingDetails: string[];
  applicationSteps: string[];
  importantDates: GrantImportantDate[];
  officialLinks: GrantOfficialLink[];
  relatedApiSlugs: string[];
  relatedRecipeSlugs: string[];
  ecosystemSlug: string;
  ecosystemSlugs: string[];
  fundingRange: string;
  fundingAmountMax: number;
  deadline: string;
  deadlineSortOrder: number;
  status: GrantStatus;
  fundingType: FundingType;
  fundingTypeLabel?: string;
  fundingStages: FundingStage[];
  builderTypes: BuilderType[];
  location: string;
  remoteFriendly: boolean;
  applyUrl?: string;
  websiteUrl: string;
  learnMoreUrl: string;
  addedAt: string;
  beginnerFriendlyScore: number;
};

export type GrantFilters = {
  q?: string;
  status?: GrantStatus;
  ecosystem?: string;
  fundingType?: FundingType;
  fundingStage?: FundingStage;
  builderType?: BuilderType;
  sort?: GrantSort;
};

const FUNDING_STAGE_ORDER = FUNDING_STAGES.map((stage) => stage.slug);

export function getGrantStatusLabel(status: GrantStatus) {
  return GRANT_STATUSES.find((item) => item.slug === status)?.label ?? status;
}

export function getFundingTypeLabel(type: FundingType, override?: string) {
  if (override) return override;
  return FUNDING_TYPES.find((item) => item.slug === type)?.label ?? type;
}

export function getFundingStageLabel(stage: FundingStage) {
  return FUNDING_STAGES.find((item) => item.slug === stage)?.label ?? stage;
}

export function getBuilderTypeLabel(type: BuilderType) {
  return BUILDER_TYPES.find((item) => item.slug === type)?.label ?? type;
}

export function formatFundingStages(stages: FundingStage[]) {
  if (stages.includes("open-to-all")) {
    return "Open to All";
  }

  const sorted = [...stages].sort(
    (a, b) => FUNDING_STAGE_ORDER.indexOf(a) - FUNDING_STAGE_ORDER.indexOf(b),
  );

  if (sorted.length === 0) return "Open to All";
  if (sorted.length === 1) return getFundingStageLabel(sorted[0]!);

  return `${getFundingStageLabel(sorted[0]!)} → ${getFundingStageLabel(sorted[sorted.length - 1]!)}`;
}

export function isGrantSort(value: string): value is GrantSort {
  return GRANT_SORT_OPTIONS.some((option) => option.slug === value);
}

export function isFundingType(value: string): value is FundingType {
  return FUNDING_TYPES.some((item) => item.slug === value);
}

export function isFundingStage(value: string): value is FundingStage {
  return FUNDING_STAGES.some((item) => item.slug === value);
}

export function isBuilderType(value: string): value is BuilderType {
  return BUILDER_TYPES.some((item) => item.slug === value);
}

/** @deprecated Use FUNDING_TYPES */
export const GRANT_TYPES = FUNDING_TYPES;
/** @deprecated Use FundingType */
export type GrantType = FundingType;
/** @deprecated Use getFundingTypeLabel */
export function getGrantTypeLabel(type: FundingType, override?: string) {
  return getFundingTypeLabel(type, override);
}
