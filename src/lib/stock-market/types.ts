export type StockQuote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  high: number;
  low: number;
  open: number;
  marketCap: number | null;
  updatedAt: number;
};

export type StockProfile = {
  symbol: string;
  name: string;
  logo: string | null;
  marketCap: number | null;
  exchange: string | null;
  weburl: string | null;
};

export type StockCandlePoint = {
  time: number;
  close: number;
};

export type StockMarketSnapshot = {
  symbol: string;
  quote: StockQuote | null;
  profile: StockProfile | null;
  sparkline: StockCandlePoint[];
  chart: StockCandlePoint[];
};

export type StockMarketDataMap = Record<string, StockMarketSnapshot>;
