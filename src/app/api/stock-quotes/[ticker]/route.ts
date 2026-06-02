import { NextResponse } from "next/server";
import { getCryptoStockByTicker } from "@/lib/crypto-stocks-directory";
import { getStockMarketDataForEntry } from "@/lib/stock-market/get-quotes";

export const revalidate = 300;

type RouteContext = {
  params: Promise<{ ticker: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { ticker } = await context.params;
  const stock = getCryptoStockByTicker(ticker);

  if (!stock) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const market = await getStockMarketDataForEntry(stock);

  return NextResponse.json({
    ticker: stock.ticker,
    market,
    updatedAt: new Date().toISOString(),
  });
}
