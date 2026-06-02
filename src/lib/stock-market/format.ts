export function formatUsdPrice(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value >= 100 ? 2 : value >= 1 ? 2 : 4,
    maximumFractionDigits: value >= 100 ? 2 : value >= 1 ? 2 : 4,
  }).format(value);
}

export function formatMarketCap(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "—";

  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  return formatUsdPrice(value);
}

export function formatChangePercent(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "—";

  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function logoFromWebsite(website: string) {
  try {
    const hostname = new URL(website).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return null;
  }
}
