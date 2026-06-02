import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ApiGridCard } from "@/components/categories/api-grid-card";
import { CategorySection } from "@/components/categories/category-section";
import { CryptoStockCompactCard } from "@/components/crypto-stocks/crypto-stock-card";
import {
  DeveloperResourceList,
  EcosystemLinkCard,
  IntelLinkList,
} from "@/components/crypto-stocks/crypto-stock-detail-sections";
import { StockLogo } from "@/components/crypto-stocks/stock-logo";
import { StockPriceChart } from "@/components/crypto-stocks/stock-price-chart";
import { PageHeader } from "@/components/layout/page-header";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { Badge } from "@/components/ui/badge";
import {
  cryptoStocksDirectory,
  getCryptoStockByTicker,
  getCryptoStockCategoryLabel,
  getRelatedApisForCryptoStock,
  getRelatedCryptoStocks,
  getRelatedEcosystemsForCryptoStock,
  getRelatedIntelForCryptoStock,
  getRelatedRecipesForCryptoStock,
} from "@/lib/crypto-stocks-directory";
import {
  getStockMarketDataForEntries,
  getStockMarketDataForEntry,
} from "@/lib/stock-market/get-quotes";
import {
  formatChangePercent,
  formatMarketCap,
  formatUsdPrice,
} from "@/lib/stock-market/format";
import {
  GrantBulletList,
  GrantSectionCard,
} from "@/components/grants/grant-detail-sections";
import { cn } from "@/lib/utils";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ ticker: string }>;
};

export async function generateStaticParams() {
  return cryptoStocksDirectory.map((stock) => ({ ticker: stock.ticker }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ticker } = await params;
  const stock = getCryptoStockByTicker(ticker);

  if (!stock) return { title: "Company not found" };

  return {
    title: stock.name,
    description: stock.exposureSummary,
  };
}

export default async function CryptoStockDetailPage({ params }: PageProps) {
  const { ticker } = await params;
  const stock = getCryptoStockByTicker(ticker);

  if (!stock) notFound();

  const market = await getStockMarketDataForEntry(stock);
  const relatedApis = getRelatedApisForCryptoStock(stock);
  const relatedEcosystems = getRelatedEcosystemsForCryptoStock(stock);
  const relatedRecipes = getRelatedRecipesForCryptoStock(stock);
  const relatedIntel = getRelatedIntelForCryptoStock(stock);
  const relatedStocks = getRelatedCryptoStocks(stock);
  const relatedMarketData = await getStockMarketDataForEntries(relatedStocks);

  const quote = market?.quote;
  const positive = (quote?.changePercent ?? 0) >= 0;

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-10">
      <Link
        href="/crypto-stocks"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
      >
        <ArrowLeft className="size-4" />
        Watchlist
      </Link>

      <section className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <StockLogo
              name={stock.name}
              website={stock.website}
              logoUrl={market?.profile?.logo}
              className="size-12"
            />
            <div className="space-y-2">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {stock.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {stock.displayTicker}
                  </Badge>
                  <Badge variant="outline">
                    {getCryptoStockCategoryLabel(stock.category)}
                  </Badge>
                  {stock.isPrivate && <Badge variant="muted">Private</Badge>}
                  {stock.listingStatus === "delisted" && (
                    <Badge variant="muted">Delisted</Badge>
                  )}
                </div>
              </div>
              <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                {stock.exposureSummary}
              </p>
              {stock.listingNote && (
                <p className="max-w-2xl text-xs text-neutral-500 dark:text-neutral-400">
                  {stock.listingNote}
                </p>
              )}
              <a
                href={stock.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-neutral-500 underline hover:text-neutral-950 dark:hover:text-neutral-50"
              >
                Official website
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          {!stock.isPrivate && stock.listingStatus !== "delisted" && (
            <div className="grid min-w-[220px] grid-cols-2 gap-4 rounded-lg border border-neutral-100 bg-neutral-50/80 p-4 dark:border-neutral-900 dark:bg-neutral-900/40">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-neutral-400">
                  Price
                </p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums">
                  {formatUsdPrice(quote?.price)}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-neutral-400">
                  24h Change
                </p>
                <p
                  className={cn(
                    "mt-1 font-mono text-xl font-semibold tabular-nums",
                    positive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400",
                  )}
                >
                  {formatChangePercent(quote?.changePercent)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-wide text-neutral-400">
                  Market Cap
                </p>
                <p className="mt-1 font-mono text-sm tabular-nums text-neutral-700 dark:text-neutral-300">
                  {formatMarketCap(
                    market?.profile?.marketCap ?? market?.quote?.marketCap,
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {!stock.isPrivate && stock.listingStatus !== "delisted" && (
          <div className="mt-6">
            <StockPriceChart
              data={market?.chart ?? []}
              positive={positive}
            />
          </div>
        )}
      </section>

      <p className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
        Builder-focused research context only — not investment advice or a
        trading platform.
      </p>

      <CategorySection title="Overview">
        <GrantSectionCard>
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {stock.overview}
          </p>
        </GrantSectionCard>
      </CategorySection>

      <CategorySection title="Crypto Exposure">
        <GrantSectionCard>
          <GrantBulletList items={stock.cryptoActivities} />
        </GrantSectionCard>
      </CategorySection>

      <CategorySection title="Developer Products">
        <GrantSectionCard>
          <GrantBulletList items={stock.cryptoProducts} />
          {stock.developerResources.length > 0 && (
            <div className="mt-5 border-t border-neutral-100 pt-5 dark:border-neutral-900">
              <DeveloperResourceList resources={stock.developerResources} />
            </div>
          )}
        </GrantSectionCard>
      </CategorySection>

      <CategorySection title="Related Ecosystems">
        {relatedEcosystems.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No related ecosystems listed.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEcosystems.map((ecosystem) => (
              <EcosystemLinkCard
                key={ecosystem.slug}
                slug={ecosystem.slug}
                name={ecosystem.name}
                description={ecosystem.description}
              />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection title="Related APIs">
        {relatedApis.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No related APIs listed.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedApis.map((api) => (
              <ApiGridCard key={api.slug} api={api} />
            ))}
          </div>
        )}
      </CategorySection>

      <CategorySection title="Related Builder Intel">
        {relatedIntel.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No related intel posts tagged yet.
          </p>
        ) : (
          <IntelLinkList posts={relatedIntel} />
        )}
      </CategorySection>

      {relatedRecipes.length > 0 && (
        <CategorySection title="Related Recipes">
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </CategorySection>
      )}

      {relatedStocks.length > 0 && (
        <CategorySection title="Related Companies">
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedStocks.map((related) => (
              <CryptoStockCompactCard
                key={related.ticker}
                stock={related}
                market={relatedMarketData[related.ticker]}
              />
            ))}
          </div>
        </CategorySection>
      )}
    </div>
  );
}
