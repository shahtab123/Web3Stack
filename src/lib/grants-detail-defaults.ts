import { apiDirectory } from "./api-directory-data";
import type { ApiEcosystem } from "./api-directory-types";
import { getResourcesForEcosystem } from "./ecosystem-portal-data";
import type {
  BuilderType,
  FundingStage,
  FundingType,
  GrantEntry,
  GrantImportantDate,
  GrantOfficialLink,
  GrantStatus,
} from "./grants-directory-types";
import {
  getFundingTypeLabel,
  getGrantStatusLabel,
} from "./grants-directory-types";
import { recipeDirectory } from "./recipe-directory-data";

type GrantInput = {
  slug: string;
  name: string;
  org: string;
  description: string;
  overview: string;
  ecosystemSlug: string;
  ecosystemSlugs: string[];
  fundingRange: string;
  deadline: string;
  status: GrantStatus;
  fundingType: FundingType;
  fundingTypeLabel?: string;
  fundingStages?: FundingStage[];
  builderTypes?: BuilderType[];
  location?: string;
  remoteFriendly?: boolean;
  applyUrl: string;
  websiteUrl?: string;
  learnMoreUrl?: string;
  addedAt?: string;
  deadlineSortOrder?: number;
  eligibility?: string[];
  fundingDetails?: string[];
  applicationSteps?: string[];
  importantDates?: GrantImportantDate[];
  officialLinks?: GrantOfficialLink[];
  relatedApiSlugs?: string[];
  relatedRecipeSlugs?: string[];
};

const ECOSYSTEM_NAMES: Record<string, string> = {
  base: "Base",
  ethereum: "Ethereum",
  solana: "Solana",
  hyperliquid: "Hyperliquid",
  arbitrum: "Arbitrum",
  optimism: "Optimism",
  avalanche: "Avalanche",
  sui: "Sui",
  aptos: "Aptos",
  polygon: "Polygon",
  berachain: "Berachain",
  monad: "Monad",
};

const ECOSYSTEM_API_TAGS: Record<string, ApiEcosystem> = {
  base: "Base",
  ethereum: "Ethereum",
  solana: "Solana",
  hyperliquid: "Hyperliquid",
  arbitrum: "Arbitrum",
  optimism: "Optimism",
  avalanche: "Avalanche",
  sui: "Sui",
  aptos: "Aptos",
  polygon: "Polygon",
  berachain: "Berachain",
  monad: "Monad",
};

const STAGE_ORDER: FundingStage[] = [
  "idea",
  "prototype",
  "mvp",
  "pre-seed",
  "seed",
  "series-a-plus",
  "open-to-all",
];

function getEcosystemName(slug: string) {
  return ECOSYSTEM_NAMES[slug] ?? slug;
}

function parseFundingAmountMax(range: string) {
  const amounts = [...range.matchAll(/\$([\d.]+)\s*([KMB])?/gi)].map((match) => {
    const value = Number.parseFloat(match[1] ?? "0");
    const unit = (match[2] ?? "").toUpperCase();

    if (unit === "K") return value * 1_000;
    if (unit === "M") return value * 1_000_000;
    if (unit === "B") return value * 1_000_000_000;
    return value;
  });

  return amounts.length > 0 ? Math.max(...amounts) : 0;
}

function parseDeadlineSortOrder(deadline: string, override?: number) {
  if (override != null) return override;
  if (/rolling|open/i.test(deadline)) return 99_999;

  const monthMatch = deadline.match(
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})/i,
  );

  if (monthMatch) {
    const monthIndex = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ].indexOf(monthMatch[1]!.slice(0, 3).toLowerCase());
    const year = Number.parseInt(monthMatch[2]!, 10);

    if (monthIndex >= 0) {
      return year * 12 + monthIndex;
    }
  }

  if (/q[1-4]\s+(\d{4})/i.test(deadline)) {
    const [, quarter, year] = deadline.match(/q([1-4])\s+(\d{4})/i) ?? [];
    if (quarter && year) {
      return Number.parseInt(year, 10) * 12 + (Number.parseInt(quarter, 10) - 1) * 3;
    }
  }

  return 50_000;
}

function defaultFundingStages(fundingType: FundingType): FundingStage[] {
  switch (fundingType) {
    case "hackathon":
    case "bounty":
      return ["open-to-all"];
    case "accelerator":
    case "incubator":
      return ["pre-seed"];
    case "venture-program":
      return ["seed", "series-a-plus"];
    case "startup-program":
      return ["idea", "prototype"];
    default:
      return ["prototype", "mvp"];
  }
}

function defaultBuilderTypes(fundingType: FundingType): BuilderType[] {
  switch (fundingType) {
    case "hackathon":
      return ["solo-builder", "student", "team", "open-source"];
    case "bounty":
      return ["solo-builder", "open-source", "team"];
    case "venture-program":
      return ["startup", "team"];
    default:
      return ["solo-builder", "startup", "open-source", "team"];
  }
}

function computeBeginnerFriendlyScore(
  fundingType: FundingType,
  fundingStages: FundingStage[],
  builderTypes: BuilderType[],
) {
  let score = 0;

  if (fundingStages.includes("open-to-all")) score += 4;
  if (fundingStages.includes("idea")) score += 3;
  if (fundingStages.includes("prototype")) score += 2;
  if (builderTypes.includes("solo-builder")) score += 2;
  if (builderTypes.includes("student")) score += 2;
  if (builderTypes.includes("open-source")) score += 1;
  if (fundingType === "hackathon") score += 2;
  if (fundingType === "bounty") score += 1;

  return score;
}

function defaultEligibility(
  fundingType: FundingType,
  ecosystemName: string,
  builderTypes: BuilderType[],
) {
  const base = [`Projects building on or for ${ecosystemName}`];
  const builderLabels = builderTypes.map((type) => {
    switch (type) {
      case "solo-builder":
        return "Solo builders and indie hackers";
      case "student":
        return "Students and university teams";
      case "open-source":
        return "Open-source contributors and maintainers";
      case "startup":
        return "Early-stage startups";
      case "team":
        return "Small teams with a shipped prototype";
      case "enterprise":
        return "Enterprise teams expanding onchain";
      default:
        return "";
    }
  });

  switch (fundingType) {
    case "hackathon":
      return [
        "Teams or individuals participating in the active hackathon season",
        ...builderLabels.filter(Boolean),
        "Projects aligned with the sponsor ecosystem",
      ];
    case "accelerator":
    case "incubator":
      return [
        ...base,
        "Founding teams ready for mentorship and cohort programming",
        "Clear product thesis with early user or technical validation",
      ];
    case "venture-program":
      return [
        ...base,
        "Startups raising or preparing for institutional capital",
        "Teams with traction, distribution, or strong technical moats",
      ];
    case "bounty":
      return [
        "Developers completing scoped tasks or security reviews",
        "Open-source contributors with relevant expertise",
      ];
    case "startup-program":
      return [
        ...base,
        "Founders at idea or prototype stage",
        ...builderLabels.filter(Boolean),
      ];
    default:
      return [
        ...base,
        ...builderLabels.filter(Boolean),
        "Clear roadmap with measurable milestones",
      ];
  }
}

function defaultFundingDetails(input: GrantInput) {
  return [
    `Typical award range: ${input.fundingRange}`,
    input.fundingType === "accelerator" || input.fundingType === "venture-program"
      ? "May include capital, mentorship, and ecosystem intros"
      : "Milestone-based disbursements after review",
    input.fundingType === "hackathon"
      ? "Prizes awarded to winning teams after demo day"
      : "Funding may cover development, audits, and go-to-market",
    input.fundingType === "bounty"
      ? "Paid on completion of approved scope"
      : "Most programs are non-dilutive unless noted otherwise",
  ];
}

function defaultApplicationSteps(input: GrantInput) {
  switch (input.fundingType) {
    case "hackathon":
      return [
        "Register for the active hackathon season",
        "Form a team and pick a track aligned with the ecosystem",
        "Build and submit your project before the deadline",
        "Present during demo day for prize consideration",
      ];
    case "accelerator":
    case "incubator":
      return [
        "Review cohort criteria and past portfolio companies",
        "Submit the application with team, product, and traction details",
        "Complete interviews with the program team",
        "Join the cohort and align on milestones if accepted",
      ];
    case "bounty":
      return [
        "Browse open bounties and confirm scope fit",
        "Apply or claim the bounty with your approach",
        "Deliver the work and submit for review",
        "Receive payout after approval",
      ];
    default:
      return [
        "Review eligibility and prepare a short project proposal",
        "Submit the application through the official portal",
        "Complete any follow-up questions from the review team",
        "Receive decision and align on milestone deliverables",
      ];
  }
}

function defaultImportantDates(input: GrantInput): GrantImportantDate[] {
  return [
    { label: "Deadline", value: input.deadline },
    { label: "Program status", value: getGrantStatusLabel(input.status) },
    {
      label: "Funding type",
      value: getFundingTypeLabel(input.fundingType, input.fundingTypeLabel),
    },
    {
      label: "Location",
      value: input.location ?? "Global",
    },
  ];
}

function defaultOfficialLinks(input: GrantInput): GrantOfficialLink[] {
  const websiteUrl = input.websiteUrl ?? input.applyUrl;
  const links: GrantOfficialLink[] = [
    { label: "Official website", url: websiteUrl },
    { label: "Apply", url: input.applyUrl },
  ];

  getResourcesForEcosystem(input.ecosystemSlug)
    .slice(0, 1)
    .forEach((resource) => {
      links.push({ label: resource.label, url: resource.url });
    });

  return links;
}

function defaultRelatedApiSlugs(ecosystemSlug: string) {
  const tag = ECOSYSTEM_API_TAGS[ecosystemSlug];
  if (!tag) return [];

  return apiDirectory
    .filter((api) => api.ecosystems.includes(tag))
    .slice(0, 3)
    .map((api) => api.slug);
}

function defaultRelatedRecipeSlugs(ecosystemSlug: string) {
  const apiSlugs = new Set(defaultRelatedApiSlugs(ecosystemSlug));

  return recipeDirectory
    .filter((recipe) =>
      recipe.apis.some((api) => api.slug && apiSlugs.has(api.slug)),
    )
    .slice(0, 2)
    .map((recipe) => recipe.slug);
}

export function defineGrant(input: GrantInput): GrantEntry {
  const ecosystemName = getEcosystemName(input.ecosystemSlug);
  const fundingStages = input.fundingStages ?? defaultFundingStages(input.fundingType);
  const builderTypes = input.builderTypes ?? defaultBuilderTypes(input.fundingType);
  const fundingAmountMax = parseFundingAmountMax(input.fundingRange);
  const deadlineSortOrder = parseDeadlineSortOrder(
    input.deadline,
    input.deadlineSortOrder,
  );

  return {
    ...input,
    fundingStages,
    builderTypes,
    location: input.location ?? "Global",
    remoteFriendly: input.remoteFriendly ?? true,
    websiteUrl: input.websiteUrl ?? input.applyUrl,
    learnMoreUrl: input.learnMoreUrl ?? `/grants/${input.slug}`,
    addedAt: input.addedAt ?? "2026-01-01",
    fundingAmountMax,
    deadlineSortOrder,
    beginnerFriendlyScore: computeBeginnerFriendlyScore(
      input.fundingType,
      fundingStages,
      builderTypes,
    ),
    eligibility:
      input.eligibility ??
      defaultEligibility(input.fundingType, ecosystemName, builderTypes),
    fundingDetails: input.fundingDetails ?? defaultFundingDetails(input),
    applicationSteps:
      input.applicationSteps ?? defaultApplicationSteps(input),
    importantDates: input.importantDates ?? defaultImportantDates(input),
    officialLinks: input.officialLinks ?? defaultOfficialLinks(input),
    relatedApiSlugs:
      input.relatedApiSlugs ?? defaultRelatedApiSlugs(input.ecosystemSlug),
    relatedRecipeSlugs:
      input.relatedRecipeSlugs ?? defaultRelatedRecipeSlugs(input.ecosystemSlug),
  };
}

export { STAGE_ORDER };
