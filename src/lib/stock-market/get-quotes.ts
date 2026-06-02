import { unstable_cache } from "next/cache";
import type { CryptoStockEntry } from "@/lib/crypto-stocks-directory-types";
import {
  fetchCandles,
  fetchProfile,
  fetchQuotesBatch,
} from "./yahoo-finance-client";
import type { StockMarketDataMap, StockMarketSnapshot, StockCandlePoint, StockQuote } from "./types";

function marketSymbol(stock: CryptoStockEntry) {
  if (stock.isPrivate) return null;
  return stock.marketSymbol ?? stock.displayTicker;
}

type QuoteLookup = Record<string, StockQuote>;

function toQuoteLookup(
  quotes: Map<string, StockQuote> | QuoteLookup | null | undefined,
): QuoteLookup {
  if (!quotes) return {};
  if (quotes instanceof Map) return Object.fromEntries(quotes);
  return quotes;
}

function resolveQuote(
  quotes: Map<string, StockQuote> | QuoteLookup,
  symbol: string,
): StockQuote | undefined {
  const lookup = toQuoteLookup(quotes);
  return lookup[symbol] ?? lookup[symbol.toUpperCase()];
}

function getCachedSparkline(symbol: string) {
  return unstable_cache(
    () => fetchCandles(symbol, "1mo"),
    ["stock-sparkline", symbol],
    { revalidate: 300 },
  )();
}

function getCachedChart(symbol: string) {
  return unstable_cache(
    () => fetchCandles(symbol, "6mo"),
    ["stock-chart", symbol],
    { revalidate: 300 },
  )();
}

function buildSnapshot(
  stock: CryptoStockEntry,
  symbol: string,
  quote: StockQuote | null | undefined,
  sparkline: StockCandlePoint[],
  chart: StockCandlePoint[],
): StockMarketSnapshot | null {
  if (stock.listingStatus === "delisted") {
    return {
      symbol,
      quote: null,
      profile: {
        symbol,
        name: stock.name,
        logo: null,
        marketCap: null,
        exchange: null,
        weburl: stock.website,
      },
      sparkline: [],
      chart: [],
    };
  }

  if (!quote && sparkline.length === 0) return null;

  return {
    symbol,
    quote: quote ?? null,
    profile: {
      symbol,
      name: stock.name,
      logo: null,
      marketCap: quote?.marketCap ?? null,
      exchange: null,
      weburl: stock.website,
    },
    sparkline,
    chart,
  };
}

export async function getStockMarketDataForEntries(
  stocks: CryptoStockEntry[],
): Promise<StockMarketDataMap> {
  const publicStocks = stocks.filter(
    (stock) => !stock.isPrivate && stock.listingStatus !== "delisted",
  );
  const symbols = publicStocks
    .map((stock) => marketSymbol(stock))
    .filter((symbol): symbol is string => symbol !== null);

  const quotes = toQuoteLookup(
    await unstable_cache(
      async () =>
        Object.fromEntries((await fetchQuotesBatch(symbols)).entries()),
      ["stock-quotes-batch-v2", ...symbols.sort()],
      { revalidate: 300 },
    )(),
  );

  const entries = await Promise.all(
    stocks.map(async (stock) => {
      if (stock.isPrivate) return [stock.ticker, null] as const;

      const symbol = marketSymbol(stock);
      if (!symbol) return [stock.ticker, null] as const;

      if (stock.listingStatus === "delisted") {
        return [
          stock.ticker,
          buildSnapshot(stock, symbol, null, [], []),
        ] as const;
      }

      const quote = resolveQuote(quotes, symbol);
      const sparkline = await getCachedSparkline(symbol);
      const snapshot = buildSnapshot(stock, symbol, quote, sparkline, []);

      return [stock.ticker, snapshot] as const;
    }),
  );

  return Object.fromEntries(
    entries.filter(([, snapshot]) => snapshot !== null),
  ) as StockMarketDataMap;
}

export async function getStockMarketDataForEntry(
  stock: CryptoStockEntry,
): Promise<StockMarketSnapshot | null> {
  if (stock.isPrivate) return null;

  if (stock.listingStatus === "delisted") {
    const symbol = marketSymbol(stock);
    if (!symbol) return null;
    return buildSnapshot(stock, symbol, null, [], []);
  }

  return unstable_cache(
    async () => {
      const symbol = marketSymbol(stock);
      if (!symbol) return null;

      const [quotes, sparkline, chart, profile] = await Promise.all([
        fetchQuotesBatch([symbol]),
        getCachedSparkline(symbol),
        getCachedChart(symbol),
        fetchProfile(symbol, stock.name),
      ]);

      const snapshot = buildSnapshot(
        stock,
        symbol,
        resolveQuote(quotes, symbol),
        sparkline,
        chart,
      );

      if (snapshot && profile) {
        snapshot.profile = {
          ...snapshot.profile!,
          name: profile.name,
          marketCap:
            profile.marketCap ??
            snapshot.profile!.marketCap ??
            snapshot.quote?.marketCap ??
            null,
        };
      }

      return snapshot;
    },
    ["stock-market-detail", stock.ticker],
    { revalidate: 300 },
  )();
}

export { marketSymbol };
