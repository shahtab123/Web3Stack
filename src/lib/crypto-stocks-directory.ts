import { getApiBySlug } from "./api-directory";
import { getBrowseEcosystemBySlug } from "./browse-ecosystems";
import { cryptoStocksDirectory } from "./crypto-stocks-directory-data";
import type {
  CryptoStockCategory,
  CryptoStockEntry,
  CryptoStockFilters,
  CryptoStockSort,
} from "./crypto-stocks-directory-types";
import {
  CRYPTO_STOCK_CATEGORIES,
  CRYPTO_STOCK_FILTER_CHIPS,
  CRYPTO_STOCK_SORT_OPTIONS,
  getCryptoStockCategoryLabel,
  getCryptoStockCategoryOrder,
  isCryptoStockCategory,
  isCryptoStockSort,
} from "./crypto-stocks-directory-types";
import type { StockMarketDataMap } from "./stock-market/types";
import { intelPostsCatalog } from "./intel-posts-data";
import { getPlatformLabel } from "./intel-posts-types";
import { dedupeRecipesBySlug, getRecipeBySlug } from "./recipe-directory";
export function getCryptoStocks(
  filters: CryptoStockFilters = {},
  marketData: StockMarketDataMap = {},
): CryptoStockEntry[] {
  let results = [...cryptoStocksDirectory];

  if (filters.category) {
    results = results.filter((stock) => stock.category === filters.category);
  }

  if (filters.q) {
    const query = filters.q.toLowerCase().trim();
    results = results.filter(
      (stock) =>
        stock.name.toLowerCase().includes(query) ||
        stock.displayTicker.toLowerCase().includes(query) ||
        stock.description.toLowerCase().includes(query) ||
        stock.exposureSummary.toLowerCase().includes(query) ||
        getCryptoStockCategoryLabel(stock.category).toLowerCase().includes(query),
    );
  }

  const sort = filters.sort ?? "market-cap";

  return results.sort((a, b) => {
    if (sort === "alphabetical") {
      return a.name.localeCompare(b.name);
    }

    const aData = marketData[a.ticker];
    const bData = marketData[b.ticker];

    if (sort === "daily-change") {
      const aChange = aData?.quote?.changePercent ?? Number.NEGATIVE_INFINITY;
      const bChange = bData?.quote?.changePercent ?? Number.NEGATIVE_INFINITY;
      return bChange - aChange;
    }

    const aCap = aData?.profile?.marketCap ?? 0;
    const bCap = bData?.profile?.marketCap ?? 0;
    if (aCap !== bCap) return bCap - aCap;
    const categoryOrder =
      getCryptoStockCategoryOrder(a.category) -
      getCryptoStockCategoryOrder(b.category);
    if (categoryOrder !== 0) return categoryOrder;
    return a.name.localeCompare(b.name);
  });
}

const TICKER_ALIASES: Record<string, string> = {
  mstr: "strategy",
  xyz: "block",
};

export function getCryptoStockByTicker(ticker: string): CryptoStockEntry | null {
  const normalized = ticker.toLowerCase();
  const resolved = TICKER_ALIASES[normalized] ?? normalized;
  return (
    cryptoStocksDirectory.find((stock) => stock.ticker === resolved) ?? null
  );
}

export function getRelatedCryptoStocks(stock: CryptoStockEntry) {
  return stock.relatedTickers
    .map((ticker) => getCryptoStockByTicker(ticker))
    .filter((related): related is CryptoStockEntry => related !== null);
}

export function getRelatedApisForCryptoStock(stock: CryptoStockEntry) {
  return stock.relatedApiSlugs
    .map((slug) => getApiBySlug(slug))
    .filter((api): api is NonNullable<typeof api> => api !== null);
}

export function getRelatedEcosystemsForCryptoStock(stock: CryptoStockEntry) {
  return stock.relatedEcosystemSlugs
    .map((slug) => getBrowseEcosystemBySlug(slug))
    .filter((eco): eco is NonNullable<typeof eco> => eco !== null);
}

export function getRelatedRecipesForCryptoStock(stock: CryptoStockEntry) {
  return dedupeRecipesBySlug(
    stock.relatedRecipeSlugs
      .map((slug) => getRecipeBySlug(slug))
      .filter((recipe): recipe is NonNullable<typeof recipe> => recipe !== null),
  );
}

export function getRelatedIntelForCryptoStock(stock: CryptoStockEntry) {
  const slugs = new Set(stock.relatedEcosystemSlugs);

  return intelPostsCatalog
    .filter((post) =>
      post.ecosystemSlugs?.some((eco) => slugs.has(eco)),
    )
    .slice(0, 4)
    .map((post, index) => ({
      id: index + 1,
      platform: post.platform,
      postUrl: post.postUrl,
      label: getPlatformLabel(post.platform),
    }));
}
export {
  cryptoStocksDirectory,
  CRYPTO_STOCK_CATEGORIES,
  CRYPTO_STOCK_FILTER_CHIPS,
  CRYPTO_STOCK_SORT_OPTIONS,
  getCryptoStockCategoryLabel,
  getCryptoStockCategoryOrder,
  isCryptoStockCategory,
  isCryptoStockSort,
};

export type {
  CryptoStockEntry,
  CryptoStockCategory,
  CryptoStockFilters,
  CryptoStockSort,
};
