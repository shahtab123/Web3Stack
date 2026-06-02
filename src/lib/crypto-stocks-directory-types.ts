export const CRYPTO_STOCK_CATEGORIES = [
  { slug: "exchanges", label: "Exchanges" },
  { slug: "bitcoin-treasury", label: "Bitcoin Treasury" },
  { slug: "mining", label: "Mining" },
  { slug: "stablecoins-payments", label: "Stablecoins & Payments" },
  { slug: "crypto-financial-services", label: "Crypto Financial Services" },
  { slug: "infrastructure-blockchain", label: "Infrastructure & Blockchain" },
  { slug: "etfs", label: "ETFs" },
] as const;

export type CryptoStockCategory =
  (typeof CRYPTO_STOCK_CATEGORIES)[number]["slug"];

export const CRYPTO_STOCK_SORT_OPTIONS = [
  { slug: "market-cap", label: "Market Cap" },
  { slug: "daily-change", label: "Daily Change" },
  { slug: "alphabetical", label: "Alphabetical" },
] as const;

export type CryptoStockSort =
  (typeof CRYPTO_STOCK_SORT_OPTIONS)[number]["slug"];

export type CryptoStockDeveloperResource = {
  label: string;
  url: string;
  type: "api" | "sdk" | "docs";
};

export type CryptoStockEntry = {
  ticker: string;
  name: string;
  displayTicker: string;
  marketSymbol?: string;
  category: CryptoStockCategory;
  description: string;
  exposureSummary: string;
  overview: string;
  cryptoActivities: string[];
  cryptoProducts: string[];
  developerResources: CryptoStockDeveloperResource[];
  buildIdeas: string[];
  relatedApiSlugs: string[];
  relatedEcosystemSlugs: string[];
  relatedRecipeSlugs: string[];
  relatedTickers: string[];
  website: string;
  isPrivate?: boolean;
  /** No active market symbol — show status instead of live quotes. */
  listingStatus?: "delisted";
  listingNote?: string;
};

export type CryptoStockFilters = {
  category?: CryptoStockCategory;
  q?: string;
  sort?: CryptoStockSort;
};

export const CRYPTO_STOCK_FILTER_CHIPS = [
  { slug: "all", label: "All" },
  ...CRYPTO_STOCK_CATEGORIES.map((category) => ({
    slug: category.slug,
    label: category.label,
  })),
] as const;

export function getCryptoStockCategoryLabel(category: CryptoStockCategory) {
  return (
    CRYPTO_STOCK_CATEGORIES.find((item) => item.slug === category)?.label ??
    category
  );
}

export function isCryptoStockCategory(
  value: string,
): value is CryptoStockCategory {
  return CRYPTO_STOCK_CATEGORIES.some((item) => item.slug === value);
}

export function isCryptoStockSort(value: string): value is CryptoStockSort {
  return CRYPTO_STOCK_SORT_OPTIONS.some((item) => item.slug === value);
}

export function getCryptoStockCategoryOrder(category: CryptoStockCategory) {
  return CRYPTO_STOCK_CATEGORIES.findIndex((item) => item.slug === category);
}
