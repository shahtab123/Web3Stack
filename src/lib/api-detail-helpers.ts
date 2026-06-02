import type { ApiEntry } from "@/lib/api-directory-types";
import { getApiCategoryLabel } from "@/lib/api-directory-types";

export function getApiPricingLabel(api: ApiEntry) {
  if (api.isFree && api.isFreemium) return "Free / Freemium";
  if (api.isFree) return "Free";
  if (api.isFreemium) return "Freemium";
  return "Paid";
}

export function formatRelativeUpdated(isoDate: string) {
  const updated = new Date(isoDate);
  const now = new Date("2026-06-02T00:00:00Z");
  const diffMs = now.getTime() - updated.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return "Updated today";
  if (diffDays === 1) return "Updated 1 day ago";
  return `Updated ${diffDays} days ago`;
}

export function getApiQuickFacts(api: ApiEntry) {
  return [
    {
      label: "Category",
      value: api.categories.map(getApiCategoryLabel).join(", "),
    },
    { label: "Pricing", value: getApiPricingLabel(api) },
    { label: "Open Source", value: api.isOpenSource ? "Yes" : "No" },
    { label: "API Available", value: api.hasApiAvailable ? "Yes" : "No" },
    { label: "SDK Available", value: api.hasSdkAvailable ? "Yes" : "No" },
    { label: "Grant Program", value: api.hasGrantProgram ? "Yes" : "No" },
    {
      label: "Hackathon Friendly",
      value: api.isHackathonFriendly ? "Yes" : "No",
    },
  ];
}

const RESOURCE_LABELS = [
  "documentation",
  "github",
  "examples",
  "sdk",
  "tutorials",
  "discord",
  "api docs",
  "bot api",
  "developer",
];

export function getApiResourceLinks(api: ApiEntry) {
  return api.links.filter((link) => {
    const label = link.label.toLowerCase();
    if (label === "website") return false;
    return RESOURCE_LABELS.some((resource) => label.includes(resource));
  });
}

export function getApiTopActions(api: ApiEntry) {
  const actions: { label: string; url: string }[] = [
    { label: "Website", url: api.url },
  ];

  if (api.docsUrl) {
    actions.push({ label: "Documentation", url: api.docsUrl });
  }

  if (api.githubUrl) {
    actions.push({ label: "GitHub", url: api.githubUrl });
  }

  return actions;
}
