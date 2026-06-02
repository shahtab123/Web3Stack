export const CATEGORIES = [
  { value: "web3", label: "Web3", description: "Blockchain, DeFi, and decentralized tools" },
  { value: "fintech", label: "Fintech", description: "Payments, banking, and financial infrastructure" },
  { value: "ai", label: "AI", description: "LLMs, ML frameworks, and AI infrastructure" },
  { value: "developer", label: "Developer", description: "APIs, databases, and dev tooling" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

export const PRICING_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "open-source", label: "Open Source" },
] as const;

export type Pricing = (typeof PRICING_OPTIONS)[number]["value"];

export function formatCategory(category: Category) {
  return CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export function formatPricing(pricing: Pricing) {
  return PRICING_OPTIONS.find((p) => p.value === pricing)?.label ?? pricing;
}

export function formatCount(count: number, singular: string, plural?: string) {
  return `${count.toLocaleString()} ${count === 1 ? singular : plural ?? `${singular}s`}`;
}
