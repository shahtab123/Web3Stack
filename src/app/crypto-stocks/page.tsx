import { Suspense } from "react";
import type { Metadata } from "next";
import { CryptoStockCard } from "@/components/crypto-stocks/crypto-stock-card";
import { CryptoStockFilters } from "@/components/crypto-stocks/crypto-stock-filters";
import { PageHeader } from "@/components/layout/page-header";
import {
  getCryptoStocks,
  isCryptoStockCategory,
  isCryptoStockSort,
  type CryptoStockCategory,
  type CryptoStockSort,
} from "@/lib/crypto-stocks-directory";
import {
  getStockMarketDataForEntries,
} from "@/lib/stock-market/get-quotes";

export const metadata: Metadata = {
  title: "Crypto Stocks",
  description:
    "Publicly traded companies with significant exposure to crypto — live prices, performance, and builder context.",
};

export const revalidate = 300;

type PageProps = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
};

export default async function CryptoStocksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category;
  const sortParam = params.sort;

  const sort: CryptoStockSort =
    sortParam && isCryptoStockSort(sortParam) ? sortParam : "market-cap";

  const baseStocks = getCryptoStocks({
    category: isCryptoStockCategory(category ?? "")
      ? (category as CryptoStockCategory)
      : undefined,
    sort: "alphabetical",
  });

  const marketData = await getStockMarketDataForEntries(baseStocks);
  const stocks = getCryptoStocks(
    {
      category: isCryptoStockCategory(category ?? "")
        ? (category as CryptoStockCategory)
        : undefined,
      sort,
    },
    marketData,
  );

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8">
      <PageHeader
        title={`Crypto Stocks (${stocks.length})`}
        subtitle="Watchlist-style view of public companies with crypto exposure — prices refresh automatically."
      />

      <Suspense
        fallback={
          <div className="h-24 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />
        }
      >
        <CryptoStockFilters />
      </Suspense>

      {stocks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No companies match this category.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stocks.map((stock) => (
              <CryptoStockCard
                key={stock.ticker}
                stock={stock}
                market={marketData[stock.ticker]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
