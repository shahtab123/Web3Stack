const LOGO_OVERRIDES: Record<string, string> = {
  privy: "privy.io",
  hyperliquid: "hyperliquid.xyz",
  rain: "rain.xyz",
  circle: "circle.com",
  alchemy: "alchemy.com",
  immunefi: "immunefi.com",
  pyth: "pyth.network",
  stripe: "stripe.com",
  plaid: "plaid.com",
  telegram: "telegram.org",
  ollama: "ollama.com",
  walletconnect: "walletconnect.com",
  "the-graph": "thegraph.com",
  dune: "dune.com",
  rainbowkit: "rainbowkit.com",
  coinbase: "coinbase.com",
  aave: "aave.com",
  huggingface: "huggingface.co",
  base: "base.org",
  ethereum: "ethereum.org",
  solana: "solana.com",
  arbitrum: "arbitrum.io",
  sui: "sui.io",
  xmtp: "xmtp.org",
  optimism: "optimism.io",
  avalanche: "avax.network",
  thirdweb: "thirdweb.com",
  uniswap: "uniswap.org",
  ens: "ens.domains",
  farcaster: "farcaster.xyz",
  lens: "lens.xyz",
  safe: "safe.global",
  moralis: "moralis.io",
  polygon: "polygon.technology",
  aptos: "aptoslabs.com",
  starknet: "starknet.io",
  eigenlayer: "eigenlayer.xyz",
};

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function getBrandLogoUrl(slug: string, websiteUrl?: string | null) {
  const domain =
    LOGO_OVERRIDES[slug] ?? (websiteUrl ? domainFromUrl(websiteUrl) : null);

  if (!domain) return null;

  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

export function getBrandInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
