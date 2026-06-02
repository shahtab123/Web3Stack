import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { CryptoStockEntry } from "@/lib/crypto-stocks-directory";
import { getCryptoStockCategoryLabel } from "@/lib/crypto-stocks-directory";
import {
  formatChangePercent,
  formatMarketCap,
  formatUsdPrice,
} from "@/lib/stock-market/format";
import type { StockMarketSnapshot } from "@/lib/stock-market/types";
import { cn } from "@/lib/utils";
import { StockLogo } from "./stock-logo";
import { StockSparkline } from "./stock-sparkline";

type CryptoStockCardProps = {
  stock: CryptoStockEntry;
  market?: StockMarketSnapshot | null;
};

function ChangeBadge({ value }: { value: number | null | undefined }) {
  if (value == null || Number.isNaN(value)) {
    return (
      <span className="font-mono text-xs text-neutral-400">—</span>
    );
  }

  const positive = value >= 0;

  return (
    <span
      className={cn(
        "font-mono text-xs font-medium tabular-nums",
        positive
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-red-600 dark:text-red-400",
      )}
    >
      {formatChangePercent(value)}
    </span>
  );
}

export function CryptoStockCard({ stock, market }: CryptoStockCardProps) {
  const quote = market?.quote;
  const positive = (quote?.changePercent ?? 0) >= 0;

  return (
    <Link
      href={`/crypto-stocks/${stock.ticker}`}
      className="group block rounded-lg border border-neutral-200 bg-white transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
    >
      <div className="flex items-center gap-3 border-b border-neutral-100 px-3 py-2.5 dark:border-neutral-900">
        <StockLogo
          name={stock.name}
          website={stock.website}
          logoUrl={market?.profile?.logo}
          className="size-8"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h2 className="truncate text-sm font-semibold group-hover:underline">
              {stock.name}
            </h2>
            <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
              {stock.displayTicker}
            </span>
          </div>
          <Badge variant="outline" className="mt-1 text-[10px]">
            {getCryptoStockCategoryLabel(stock.category)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-3 py-2.5 text-xs">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-neutral-400">
            Price
          </p>
          <p className="mt-0.5 font-mono text-sm font-medium tabular-nums">
            {stock.isPrivate
              ? "Private"
              : stock.listingStatus === "delisted"
                ? "Delisted"
                : formatUsdPrice(quote?.price)}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-neutral-400">
            24h
          </p>
          <div className="mt-0.5">
            {stock.isPrivate || stock.listingStatus === "delisted" ? (
              <span className="text-neutral-400">—</span>
            ) : (
              <ChangeBadge value={quote?.changePercent} />
            )}
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-neutral-400">
            Mkt Cap
          </p>
          <p className="mt-0.5 font-mono text-sm tabular-nums text-neutral-700 dark:text-neutral-300">
            {stock.isPrivate || stock.listingStatus === "delisted"
              ? "—"
              : formatMarketCap(
                  market?.profile?.marketCap ?? market?.quote?.marketCap,
                )}
          </p>
        </div>
      </div>

      {!stock.isPrivate && stock.listingStatus !== "delisted" && (
        <div className="border-t border-neutral-100 px-3 py-2 dark:border-neutral-900">
          <StockSparkline
            data={market?.sparkline ?? []}
            positive={positive}
            className="h-8 w-full"
            width={120}
            height={32}
          />
        </div>
      )}
    </Link>
  );
}

export function CryptoStockCompactCard({
  stock,
  market,
}: CryptoStockCardProps) {
  const quote = market?.quote;
  const positive = (quote?.changePercent ?? 0) >= 0;

  return (
    <Link
      href={`/crypto-stocks/${stock.ticker}`}
      className="group flex items-center gap-3 rounded-lg border border-neutral-200 p-3 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <StockLogo
        name={stock.name}
        website={stock.website}
        logoUrl={market?.profile?.logo}
        className="size-7"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium group-hover:underline">
            {stock.name}
          </p>
          <span className="font-mono text-[11px] text-neutral-500">
            {stock.displayTicker}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="font-mono text-xs tabular-nums">
            {stock.isPrivate
              ? "Private"
              : stock.listingStatus === "delisted"
                ? "Delisted"
                : formatUsdPrice(quote?.price)}
          </span>
          {!stock.isPrivate && stock.listingStatus !== "delisted" && (
            <ChangeBadge value={quote?.changePercent} />
          )}
        </div>
      </div>
      <StockSparkline
        data={market?.sparkline ?? []}
        positive={positive}
        width={56}
        height={24}
      />
    </Link>
  );
}
