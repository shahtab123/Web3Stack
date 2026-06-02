import type {
  CryptoStockCategory,
  CryptoStockDeveloperResource,
  CryptoStockEntry,
} from "./crypto-stocks-directory-types";

type CryptoStockInput = {
  ticker: string;
  name: string;
  displayTicker: string;
  category: CryptoStockCategory;
  description: string;
  exposureSummary: string;
  overview: string;
  cryptoActivities: string[];
  relatedTickers: string[];
  website: string;
  isPrivate?: boolean;
  listingStatus?: "delisted";
  listingNote?: string;
  marketSymbol?: string;
  cryptoProducts?: string[];
  developerResources?: CryptoStockDeveloperResource[];
  buildIdeas?: string[];
  relatedApiSlugs?: string[];
  relatedEcosystemSlugs?: string[];
  relatedRecipeSlugs?: string[];
};

function defaultBuildIdeas(category: CryptoStockCategory) {
  switch (category) {
    case "mining":
      return [
        "Mining operations dashboards",
        "Hash rate analytics tools",
        "Energy monitoring apps",
      ];
    case "exchanges":
      return [
        "Trading frontends",
        "Wallet onboarding flows",
        "Portfolio trackers",
      ];
    case "stablecoins-payments":
      return ["Payment apps", "Checkout flows", "Treasury management tools"];
    case "bitcoin-treasury":
      return ["Treasury dashboards", "BTC analytics tools", "Reporting apps"];
    case "crypto-financial-services":
      return [
        "Institutional dashboards",
        "Asset management tools",
        "Research platforms",
      ];
    case "infrastructure-blockchain":
      return [
        "Infrastructure monitoring",
        "Validator dashboards",
        "Data center analytics",
      ];
    case "etfs":
      return [
        "ETF comparison tools",
        "Portfolio allocators",
        "Bitcoin exposure trackers",
      ];
    default:
      return ["Developer tools", "Analytics dashboards", "Consumer crypto apps"];
  }
}

function defaultRelatedApis(category: CryptoStockCategory) {
  switch (category) {
    case "mining":
    case "bitcoin-treasury":
      return ["pyth", "dune", "alchemy"];
    case "exchanges":
      return ["privy", "alchemy", "walletconnect"];
    case "stablecoins-payments":
      return ["stripe", "circle", "plaid"];
    case "crypto-financial-services":
      return ["chainalysis", "dune", "alchemy"];
    case "infrastructure-blockchain":
      return ["alchemy", "pyth", "dune"];
    case "etfs":
      return ["pyth", "dune", "alchemy"];
    default:
      return ["alchemy", "privy", "dune"];
  }
}

function defaultEcosystems(category: CryptoStockCategory) {
  switch (category) {
    case "mining":
    case "bitcoin-treasury":
      return ["ethereum"];
    case "stablecoins-payments":
      return ["base", "ethereum"];
    case "exchanges":
      return ["base", "ethereum", "solana"];
    case "crypto-financial-services":
      return ["ethereum", "hyperliquid", "base"];
    case "infrastructure-blockchain":
      return ["ethereum", "base"];
    case "etfs":
      return ["ethereum", "base"];
    default:
      return ["ethereum", "base"];
  }
}

function defaultRecipes(category: CryptoStockCategory) {
  switch (category) {
    case "mining":
    case "bitcoin-treasury":
      return ["defi-dashboard"];
    case "exchanges":
      return ["wallet-login-system", "trading-platform"];
    case "stablecoins-payments":
      return ["crypto-neobank", "payroll-app"];
    case "crypto-financial-services":
      return ["defi-dashboard", "trading-platform"];
    case "infrastructure-blockchain":
      return ["defi-dashboard"];
    case "etfs":
      return ["defi-dashboard", "portfolio-tracker"];
    default:
      return ["wallet-login-system", "defi-dashboard"];
  }
}

function defaultDeveloperResources(
  input: CryptoStockInput,
): CryptoStockDeveloperResource[] {
  return [{ label: "Company website", url: input.website, type: "docs" }];
}

export function defineCryptoStock(input: CryptoStockInput): CryptoStockEntry {
  return {
    ...input,
    cryptoProducts: input.cryptoProducts ?? input.cryptoActivities,
    developerResources:
      input.developerResources ?? defaultDeveloperResources(input),
    buildIdeas: input.buildIdeas ?? defaultBuildIdeas(input.category),
    relatedApiSlugs:
      input.relatedApiSlugs ?? defaultRelatedApis(input.category),
    relatedEcosystemSlugs:
      input.relatedEcosystemSlugs ?? defaultEcosystems(input.category),
    relatedRecipeSlugs:
      input.relatedRecipeSlugs ?? defaultRecipes(input.category),
  };
}
