import YahooFinance from "yahoo-finance2";
import type {
  StockCandlePoint,
  StockProfile,
  StockQuote,
} from "./types";

const YAHOO_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

type YahooChartResponse = {
  chart?: {
    result?: Array<YahooChartResult>;
    error?: { description?: string };
  };
};

type YahooChartResult = {
  meta?: {
    symbol?: string;
    regularMarketPrice?: number;
    chartPreviousClose?: number;
    previousClose?: number;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    regularMarketTime?: number;
    longName?: string;
    shortName?: string;
  };
  timestamp?: number[];
  indicators?: {
    quote?: Array<{
      close?: Array<number | null>;
    }>;
  };
};

function mapYahooQuote(row: Record<string, unknown>): StockQuote | null {
  const symbol = row.symbol as string | undefined;
  const price = row.regularMarketPrice as number | undefined;
  if (!symbol || !price) return null;

  const marketTime = row.regularMarketTime as Date | number | undefined;
  const updatedAt =
    marketTime instanceof Date
      ? Math.floor(marketTime.getTime() / 1000)
      : (marketTime ?? Math.floor(Date.now() / 1000));

  return {
    symbol,
    price,
    change: (row.regularMarketChange as number | undefined) ?? 0,
    changePercent: (row.regularMarketChangePercent as number | undefined) ?? 0,
    previousClose: (row.regularMarketPreviousClose as number | undefined) ?? 0,
    high: (row.regularMarketDayHigh as number | undefined) ?? price,
    low: (row.regularMarketDayLow as number | undefined) ?? price,
    open: (row.regularMarketOpen as number | undefined) ?? price,
    marketCap: (row.marketCap as number | undefined) ?? null,
    updatedAt,
  };
}

let yahooFinanceClient: InstanceType<typeof YahooFinance> | null = null;

function getYahooFinanceClient() {
  if (!yahooFinanceClient) {
    yahooFinanceClient = new YahooFinance({
      suppressNotices: ["yahooSurvey"],
    });
  }
  return yahooFinanceClient;
}

function storeQuote(
  map: Map<string, StockQuote>,
  symbol: string,
  quote: StockQuote,
) {
  map.set(symbol, quote);
  map.set(symbol.toUpperCase(), quote);
}

async function enrichEtfAssets(
  map: Map<string, StockQuote>,
  symbols: string[],
) {
  const yahooFinance = getYahooFinanceClient();
  const missing = symbols.filter((symbol) => {
    const quote = map.get(symbol) ?? map.get(symbol.toUpperCase());
    return quote && !quote.marketCap;
  });

  await Promise.all(
    missing.map(async (symbol) => {
      try {
        const summary = await yahooFinance.quoteSummary(symbol, {
          modules: ["summaryDetail"],
        });
        const assets = summary.summaryDetail?.totalAssets as
          | number
          | { raw?: number }
          | undefined;
        const value =
          typeof assets === "number" ? assets : assets?.raw ?? null;
        if (!value) return;

        const quote = map.get(symbol) ?? map.get(symbol.toUpperCase());
        if (quote) quote.marketCap = value;
      } catch {
        // Ignore ETF enrichment failures.
      }
    }),
  );
}

async function fetchChart(
  symbol: string,
  range: "1d" | "1mo" | "3mo" | "6mo",
): Promise<YahooChartResult | null> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`,
      {
        headers: YAHOO_HEADERS,
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as YahooChartResponse;
    return data?.chart?.result?.[0] ?? null;
  } catch {
    return null;
  }
}

function chartToCandles(result: YahooChartResult | null | undefined) {
  if (!result) return [];

  const timestamps = result.timestamp ?? [];
  const closes = result.indicators?.quote?.[0]?.close ?? [];
  const candles: StockCandlePoint[] = [];

  timestamps.forEach((time, index) => {
    const close = closes[index];
    if (close == null) return;
    candles.push({ time, close });
  });

  return candles;
}

function quoteFromChart(result: YahooChartResult | null, symbol: string) {
  const meta = result?.meta;
  const price = meta?.regularMarketPrice;
  if (!price) return null;

  const candles = chartToCandles(result);
  const previousClose =
    meta?.chartPreviousClose ??
    meta?.previousClose ??
    candles[candles.length - 2]?.close ??
    price;

  const change = price - previousClose;
  const changePercent =
    previousClose !== 0 ? (change / previousClose) * 100 : 0;

  return {
    symbol: meta?.symbol ?? symbol,
    price,
    change,
    changePercent,
    previousClose,
    high: meta?.regularMarketDayHigh ?? price,
    low: meta?.regularMarketDayLow ?? price,
    open: candles[candles.length - 1]?.close ?? price,
    marketCap: null,
    updatedAt: meta?.regularMarketTime ?? Math.floor(Date.now() / 1000),
  } satisfies StockQuote;
}

export async function fetchQuote(symbol: string): Promise<StockQuote | null> {
  const map = await fetchQuotesBatch([symbol]);
  return map.get(symbol) ?? map.get(symbol.toUpperCase()) ?? null;
}

export async function fetchQuotesBatch(
  symbols: string[],
): Promise<Map<string, StockQuote>> {
  const map = new Map<string, StockQuote>();
  if (symbols.length === 0) return map;

  const unique = [...new Set(symbols)];
  const yahooFinance = getYahooFinanceClient();

  try {
    const rows = await yahooFinance.quote(unique);
    const list = Array.isArray(rows) ? rows : rows ? [rows] : [];

    for (const row of list) {
      const quote = mapYahooQuote(row as Record<string, unknown>);
      if (quote && typeof row.symbol === "string") {
        storeQuote(map, row.symbol, quote);
      }
    }
  } catch {
    // Fall through to chart-based quotes below.
  }

  const missing = unique.filter(
    (symbol) => !map.has(symbol) && !map.has(symbol.toUpperCase()),
  );

  await Promise.all(
    missing.map(async (symbol) => {
      const quote = quoteFromChart(await fetchChart(symbol, "1d"), symbol);
      if (quote) storeQuote(map, symbol, quote);
    }),
  );

  await enrichEtfAssets(map, unique);
  return map;
}

export async function fetchProfile(
  symbol: string,
  name?: string,
): Promise<StockProfile | null> {
  const quote = await fetchQuote(symbol);
  if (!quote) return null;

  return {
    symbol,
    name: quote.symbol === symbol ? (name ?? symbol) : symbol,
    logo: null,
    marketCap: quote.marketCap,
    exchange: null,
    weburl: null,
  };
}

export async function fetchCandles(
  symbol: string,
  range: "1mo" | "3mo" | "6mo",
): Promise<StockCandlePoint[]> {
  const result = await fetchChart(symbol, range);
  return chartToCandles(result);
}

export async function fetchQuoteAndSparkline(symbol: string) {
  const [quotes, result] = await Promise.all([
    fetchQuotesBatch([symbol]),
    fetchChart(symbol, "1mo"),
  ]);

  const quote =
    quotes.get(symbol) ??
    quotes.get(symbol.toUpperCase()) ??
    quoteFromChart(result, symbol);

  return {
    quote,
    sparkline: chartToCandles(result),
  };
}
